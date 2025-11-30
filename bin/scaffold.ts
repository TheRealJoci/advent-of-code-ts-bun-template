import { existsSync, mkdirSync, readFileSync, copyFileSync } from 'node:fs';
import {
  getInputPath,
  getInputUrl,
  getProblemUrl,
  getSolutionPath,
} from './utils';

export async function scaffold({ day, year }: { day: number; year: number }) {
  await scaffoldSolution({ day, year });
  await scaffoldSolutionTest({ day, year });
  await scaffoldInput({ day, year });
}

function scaffoldInput({ day, year }: { day: number; year: number }) {
  return scaffoldFile(
    getInputPath(year, day),
    'input',
    async (path: string) => {
      const input = await fetchInput({ day, year });
      await Bun.write(path, input);
    },
  );
}

function scaffoldSolution({ day, year }: { day: number; year: number }) {
  return scaffoldFile(
    getSolutionPath(year, day),
    'solution.ts',
    (path: string) => {
      copyFileSync(
        new URL(`../src/templates/solution.ts`, import.meta.url).pathname,
        path,
      );
    },
  );
}

function scaffoldSolutionTest({ day, year }: { day: number; year: number }) {
  return scaffoldFile(
    getSolutionPath(year, day),
    'solution.test.ts',
    async (path: string) => {
      const template = readFileSync(
        new URL(`../src/templates/solution.test.ts.template`, import.meta.url)
          .pathname,
        'utf8',
      );

      const content = template
        .replaceAll('{{YEAR}}', year.toString())
        .replaceAll('{{DAY}}', day.toString());

      await Bun.write(path, content);

      console.log(`Don't forget to add the examples to the test file!`);
      console.log(`Get them here: ${getProblemUrl(year, day)}`);
    },
  );
}

async function scaffoldFile(
  directoryPath: string,
  fileName: string,
  handler: (path: string) => Promise<void> | void,
) {
  const fileDirectory = new URL(directoryPath, import.meta.url);

  if (!existsSync(fileDirectory)) {
    mkdirSync(fileDirectory, { recursive: true });
  }

  const filePath = new URL(fileName, fileDirectory).pathname;
  if (existsSync(filePath) && readFileSync(filePath).length !== 0) {
    return;
  }

  await handler(filePath);
}

async function fetchInput({ day, year }: { day: number; year: number }) {
  console.log(`Fetching input for day ${day} of ${year}`);

  const session = process.env['SESSION'];

  if (!session) {
    console.error('SESSION is not found in the environment variables.');
    process.exit(1);
  }

  const response = await fetch(getInputUrl(year, day), {
    headers: {
      Cookie: `session=${session}`,
    },
  });

  if (!response.ok) {
    console.error(
      `Error fetching input: ${response.status} ${response.statusText}`,
    );
    process.exit(1);
  }

  return response.text();
}
