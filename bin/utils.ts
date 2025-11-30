import { argv } from 'bun';

const ADVENT_OF_CODE_BASE_URL = 'https://adventofcode.com';

export function getProblemUrl(year: number, day: number) {
  return `${ADVENT_OF_CODE_BASE_URL}/${year}/day/${day}`;
}

export function getInputUrl(year: number, day: number) {
  return `${getProblemUrl(year, day)}/input`;
}

export function getInputPath(year: number, day: number) {
  return `../.cache/inputs/${year}/${day.toString().padStart(2, '0')}/`;
}

export function getSolutionPath(year: number, day: number) {
  return `../src/solutions/${year}/${day.toString().padStart(2, '0')}/`;
}

export function validateArgs() {
  const [command, year, day] = argv.slice(2, 5);
  const yearValid = validateYear(year);

  return {
    command: validateCommand(command),
    year: yearValid,
    day: validateDay(day, yearValid),
  };
}

export function validateCommand(candidate: string | undefined) {
  if (!candidate) {
    console.log(`Command is required.`);
    process.exit(1);
  }

  if (!['scaffold', 'solve'].includes(candidate)) {
    console.log(
      `Invalid command. Try: scaffold <year> <day> or solve <year> <day>`,
    );
    process.exit(1);
  }

  return candidate;
}

export function validateYear(candidate: string | undefined) {
  if (!candidate) {
    console.log(`Year is required.`);
    process.exit(1);
  }

  const parsedCandidate = parseInt(candidate);

  if (candidate !== parsedCandidate.toString()) {
    console.log(`Year must be an integer.`);
    process.exit(1);
  } else if (!(parsedCandidate >= 2015 && parsedCandidate <= 2025)) {
    console.log(`Pick a year between 2015 and 2025.`);
    process.exit(1);
  }

  return parsedCandidate;
}

export function validateDay(candidate: string | undefined, year: number) {
  if (!candidate) {
    console.log(`Day is required.`);
    process.exit(1);
  }

  const parsedCandidate = parseInt(candidate);

  if (candidate !== parsedCandidate.toString()) {
    console.log(`Day must be an integer.`);
    process.exit(1);
  } else if (year <= 2024 && !(parsedCandidate >= 1 && parsedCandidate <= 25)) {
    console.log(`For a year before 2025 pick a day between 1 and 25.`);
    process.exit(1);
  } else if (year >= 2025 && !(parsedCandidate >= 1 && parsedCandidate <= 12)) {
    console.log(`For a year after 2024 pick a day between 1 and 12.`);
    process.exit(1);
  }

  return parsedCandidate;
}
