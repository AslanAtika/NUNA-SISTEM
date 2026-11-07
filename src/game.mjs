import { randomInt } from 'node:crypto';

export const RANKS = [1, 1, 2, 3, 5, 8, 13, 21, 34];
const STATUSES = ['observation', 'self_report', 'interpretation', 'verified', 'open_question'];

export function createGame() {
  return {
    version: 1, nextNote: 1, notes: [], diceTaken: 0, guesses: 0,
    mastery: false, piRolls: 0, loot: 3, warning: false, thefts: 0,
    defended: false, phase: 'observe', rewardClaimed: false, events: []
  };
}

export function addNote(state, { text, status = 'interpretation', attribution = 'player', cell = 0 }) {
  if (typeof text !== 'string' || !text.trim() || text.length > 2000)
    throw new Error('Note must contain 1–2000 characters.');
  if (!STATUSES.includes(status)) throw new Error('Unknown evidence status.');
  if (!Number.isInteger(cell) || cell < 0 || cell > 8) throw new Error('Grid cell must be 0–8.');
  if (state.notes.some(n => n.cell === cell)) throw new Error('Grid cell occupied.');
  if (typeof attribution !== 'string' || !attribution.trim() || attribution.length > 100)
    throw new Error('Attribution must contain 1–100 characters.');
  const note = { id: state.nextNote++, text: text.trim(), status, attribution, cell };
  state.notes.push(note);
  return note;
}

export function moveNote(state, id, cell) {
  const note = state.notes.find(n => n.id === id);
  if (!note) throw new Error('Unknown note.');
  if (!Number.isInteger(cell) || cell < 0 || cell > 8) throw new Error('Grid cell must be 0–8.');
  if (state.notes.some(n => n.cell === cell && n.id !== id)) throw new Error('Grid cell occupied.');
  note.cell = cell;
}

// Prototype policy only: lifetime acquisitions; strict growth with a limit below 1.
export function robberyRisk(state) {
  return state.diceTaken / (state.diceTaken + 8);
}

export function takeDie(state) {
  if (state.diceTaken >= RANKS.length) throw new Error('All prototype dice already taken.');
  const index = state.diceTaken++;
  const die = { id: index === 0 ? 'w1_a' : index === 1 ? 'w1_b' : `w${RANKS[index]}`, rank: RANKS[index] };
  if (die.rank === 34) state.mastery = true;
  state.events.push({ type: 'die_taken', ...die });
  return die;
}

export function roll(state) {
  if (!state.mastery) throw new Error('Earlier-die outcomes are not designed. Take dice to reach W34.');
  state.piRolls++;
  state.events.push({ type: 'roll', result: 'pi' });
  return 'π';
}

export function guess(state, text) {
  if (!state.mastery) throw new Error('This prototype enables free guesses at W34.');
  if (typeof text !== 'string' || !text.trim() || text.length > 2000) throw new Error('Enter a bounded guess.');
  state.guesses++;
  // Never auto-verify an arbitrary interpretation or pay repeatable rewards.
  return { status: 'unconfirmed', cost: 0 };
}

// Only an explicitly supplied encounter predicate can confirm this fixture's test.
export function observeHand(state) {
  if (state.phase !== 'observe') return 'Observation already recorded.';
  state.phase = 'tested';
  state.events.push({ type: 'observation', text: 'The hand advances while the lanterns flash.' });
  return 'You observe the hand advancing while the lanterns flash. The lanterns’ full meaning remains unknown.';
}

export function advance(state, sample = () => randomInt(1_000_000) / 1_000_000) {
  if (state.warning) {
    state.warning = false;
    if (state.defended) {
      state.defended = false;
      return 'Your chosen defense protects the pouch this time.';
    }
    state.defended = false;
    const stolen = Math.min(1, state.loot);
    state.loot -= stolen;
    state.thefts++;
    state.events.push({ type: 'theft', stolen });
    return stolen ? 'A pirate steals one cargo token.' : 'The pirate finds no cargo token to steal.';
  }
  const value = sample();
  if (!(value >= 0 && value < 1)) throw new Error('Random sample must be in [0,1).');
  if (value < robberyRisk(state)) {
    if (state.mastery) {
      state.warning = true;
      return 'FORESIGHT: a hand approaches your pouch. Defend before the next tick.';
    }
    const stolen = Math.min(1, state.loot);
    state.loot -= stolen;
    state.thefts++;
    state.events.push({ type: 'theft', stolen });
    return 'A pirate reaches your cargo without a Mastery warning.';
  }
  return 'The crossing holds steady.';
}

export function defend(state) {
  if (!state.warning) throw new Error('No approaching theft is currently visible.');
  state.defended = true;
  return 'You guard the pouch. Advance time to resolve the attempt.';
}

export function claimCrossing(state) {
  if (state.phase !== 'tested') throw new Error('Observe the encounter before claiming the crossing.');
  if (state.rewardClaimed) throw new Error('Crossing reward already claimed.');
  state.rewardClaimed = true;
  state.loot++;
  state.phase = 'crossed';
  return 'AMZN crossing completed. One cargo token awarded once; the wider inscription remains unresolved.';
}

export function restore(raw) {
  const s = JSON.parse(raw);
  const keys = Object.keys(createGame());
  if (!s || typeof s !== 'object' || Object.keys(s).sort().join() !== keys.sort().join())
    throw new Error('Unsupported save structure.');
  if (s.version !== 1 || !Array.isArray(s.notes) || s.notes.length > 9 ||
      !Array.isArray(s.events) || s.events.length > 100000) throw new Error('Invalid save.');
  for (const key of ['nextNote', 'diceTaken', 'guesses', 'piRolls', 'loot', 'thefts'])
    if (!Number.isSafeInteger(s[key]) || s[key] < 0) throw new Error('Invalid save counter.');
  if (s.diceTaken > 9 || s.nextNote < 1) throw new Error('Invalid progression.');
  for (const key of ['mastery', 'warning', 'defended', 'rewardClaimed'])
    if (typeof s[key] !== 'boolean') throw new Error('Invalid flag.');
  if (s.mastery !== (s.diceTaken === 9) || (s.warning && !s.mastery) ||
      (s.defended && !s.warning) || !['observe', 'tested', 'crossed'].includes(s.phase) ||
      s.rewardClaimed !== (s.phase === 'crossed')) throw new Error('Inconsistent save.');
  const check = createGame();
  const ids = new Set();
  for (const note of s.notes) {
    if (!Number.isSafeInteger(note.id) || note.id < 1 || ids.has(note.id) || note.id >= s.nextNote)
      throw new Error('Invalid note identity.');
    ids.add(note.id);
    addNote(check, note);
  }
  return s;
}
