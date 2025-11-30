import { readFileSync } from 'node:fs';
import { getInputPath, getSolutionPath } from './utils';
import { scaffold } from './scaffold.ts';

export async function solve({ year, day }: { year: number; day: number }) {
  await scaffold({ year, day });

  const input = readFileSync(
    new URL(`${getInputPath(year, day)}/input`, import.meta.url).pathname,
    'utf8',
  ).trim();

  const { solutions } = (await import(
    new URL(`${getSolutionPath(year, day)}/solution.ts`, import.meta.url)
      .pathname
  )) as typeof import('../src/templates/solution.ts');

  solutions.forEach((solution, i) => {
    if (typeof solution !== 'function') {
      console.error(`Solution ${i + 1} is not a function`);
      process.exit(1);
    }

    const start = performance.now();
    const result = solution(input);
    const end = performance.now();

    console.log(`Solution ${i + 1} in ${end - start}ms:`);
    console.log(result);
  });
}
