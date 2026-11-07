import test from 'node:test';
import assert from 'node:assert/strict';
import * as g from '../src/game.mjs';

function legend() {
  const state = g.createGame();
  for (let i = 0; i < 9; i++) g.takeDie(state);
  return state;
}
test('Fibonacci identity, progression and strictly increasing prototype risk', () => {
  const s = g.createGame();
  const dice = [];
  let previous = 0;
  for (let i = 0; i < 9; i++) {
    dice.push(g.takeDie(s));
    assert.ok(g.robberyRisk(s) > previous);
    previous = g.robberyRisk(s);
  }
  assert.deepEqual(dice.map(d => d.rank), g.RANKS);
  assert.notEqual(dice[0].id, dice[1].id);
  assert.equal(s.mastery, true);
  assert.throws(() => g.takeDie(s));
});
test('W34 always π; unlimited guesses neither pay rewards nor increase risk', () => {
  const s = legend();
  const risk = g.robberyRisk(s);
  for (let i = 0; i < 10000; i++) {
    assert.equal(g.roll(s), 'π');
    assert.deepEqual(g.guess(s, 'lantern distraction'), { status: 'unconfirmed', cost: 0 });
  }
  assert.equal(s.loot, 3);
  assert.equal(g.robberyRisk(s), risk);
  assert.equal(s.guesses, 10000);
});
test('notes preserve hypothesis and self-report status across save/load', () => {
  const s = g.createGame();
  g.addNote(s, { text: 'The lanterns may distract.', cell: 0 });
  g.addNote(s, { text: 'I feel overloaded.', status: 'self_report', attribution: 'user', cell: 1 });
  g.moveNote(s, 1, 8);
  assert.deepEqual(g.restore(JSON.stringify(s)), s);
  assert.equal(s.notes[1].status, 'self_report');
  assert.throws(() => g.addNote(s, { text: 'occupied', cell: 8 }));
});
test('Mastery warning does not itself stop theft; explicit defense works', () => {
  const s = legend();
  g.advance(s, () => 0);
  assert.equal(s.warning, true);
  assert.equal(s.loot, 3);
  g.advance(s);
  assert.equal(s.loot, 2);
  g.advance(s, () => 0);
  g.defend(s);
  g.advance(s);
  assert.equal(s.loot, 2);
});
test('crossing rewards once, not once per guess', () => {
  const s = legend();
  assert.throws(() => g.claimCrossing(s));
  g.observeHand(s);
  g.claimCrossing(s);
  assert.equal(s.loot, 4);
  assert.throws(() => g.claimCrossing(s));
});
test('invalid saves, samples and unavailable earlier rolls rejected', () => {
  assert.throws(() => g.restore('{}'));
  const s = g.createGame();
  assert.throws(() => g.roll(s));
  assert.throws(() => g.advance(s, () => 1));
  s.mastery = true;
  assert.throws(() => g.restore(JSON.stringify(s)));
});
