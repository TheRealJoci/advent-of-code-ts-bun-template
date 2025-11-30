import { scaffold } from './scaffold.ts';
import { solve } from './solve.ts';
import { validateArgs } from './utils.ts';

const { command, year, day } = validateArgs();

if (command === 'scaffold') {
  await scaffold({ year, day });
} else if (command === 'solve') {
  await solve({ year, day });
}
