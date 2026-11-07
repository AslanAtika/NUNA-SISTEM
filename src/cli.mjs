import readline from 'node:readline/promises';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import * as game from './game.mjs';

let state = game.createGame();
const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });
console.log('NUNA SISTEM // AMZN crossing // local prototype');
console.log('Three lanterns shimmer. Their reflections oppose the current. A pirate watches your pouch.');
const help = 'help | status | take | roll | guess TEXT | note STATUS CELL TEXT | grid | move ID CELL | observe | tick | defend | cross | save | load | quit';
console.log(help);
try {
  for await (const line of terminal) {
    const [command, ...args] = line.trim().split(/\s+/);
    try {
      switch (command) {
        case 'help': console.log(help, '\nStatuses: observation, self_report, interpretation, verified, open_question. Grid cells: 0–8.'); break;
        case 'status': console.log(JSON.stringify({ dice: state.diceTaken, mastery: state.mastery, robberyRisk: game.robberyRisk(state), cargo: state.loot, phase: state.phase, warning: state.warning }, null, 2)); break;
        case 'take': console.log(game.takeDie(state)); break;
        case 'roll': console.log(game.roll(state)); break;
        case 'guess': console.log(game.guess(state, args.join(' '))); break;
        case 'note': console.log(game.addNote(state, { status: args[0], cell: Number(args[1]), text: args.slice(2).join(' ') })); break;
        case 'grid': console.log(state.notes); break;
        case 'move': game.moveNote(state, Number(args[0]), Number(args[1])); console.log('Moved.'); break;
        case 'observe': console.log(game.observeHand(state)); break;
        case 'tick': console.log(game.advance(state)); break;
        case 'defend': console.log(game.defend(state)); break;
        case 'cross': console.log(game.claimCrossing(state)); break;
        case 'save':
          await mkdir('saves', { recursive: true });
          await writeFile('saves/local.json', JSON.stringify(state, null, 2), { mode: 0o600 });
          console.log('Saved locally. Notes may contain personal information; saves are excluded from Git.');
          break;
        case 'load': state = game.restore(await readFile('saves/local.json', 'utf8')); console.log('Loaded.'); break;
        case 'quit': terminal.close(); break;
        case '': break;
        default: console.log('Unknown command. Type help.');
      }
    } catch (error) { console.log(`Not applied: ${error.message}`); }
    if (command === 'quit') break;
  }
} finally { terminal.close(); }
