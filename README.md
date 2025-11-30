# Advent of Code 🎄

A TypeScript-based Advent of Code boilerplate built with [Bun](https://bun.sh/).

## Prerequisites

- [Bun](https://bun.sh/) (v1.3+)
- An Advent of Code session cookie (see [Setup](#setup))

## Installation

```bash
# Install dependencies
bun install
```

## Setup

To automatically fetch puzzle inputs, you need to set your Advent of Code session cookie:

1. Log in to [Advent of Code](https://adventofcode.com/)
2. Open your browser's developer tools (F12)
3. Go to Application/Storage → Cookies → `https://adventofcode.com`
4. Copy the value of the `session` cookie
5. Create a `.env` file in the project root:

```bash
SESSION=your_session_cookie_here
```

## Usage

### Scaffolding a New Solution

Create the folder structure, solution template, test file, and fetch the puzzle input:

```bash
bun run scaffold <year> <day>
```

**Example:**

```bash
bun run scaffold 2024 1
```

This will create:

- `src/solutions/<year>/<day>/solution.ts` - Your solution code
- `src/solutions/<year>/<day>/solution.test.ts` - Test file with example cases
- `.cache/inputs/<year>/<day>/input` - Puzzle input (auto-fetched)

### Running a Solution

Run your solution against the actual puzzle input:

```bash
bun run solve <year> <day>
```

**Example:**

```bash
bun run solve 2024 1
```

This will:

1. Scaffold the solution if it doesn't exist
2. Load the puzzle input
3. Run all solutions and display results with execution time

### Running Tests

Run all tests:

```bash
bun test
```

Run tests for a specific day:

```bash
bun test src/solutions/<year>/<day>/solution.test.ts
```

**Example:**

```bash
bun test src/solutions/2024/01/solution.test.ts
```

## Solution Structure

Each solution file exports an array of functions (one for each part of the puzzle):

```typescript
function solution(input: string) {
  // Your solution logic here
  return result;
}

export const solutions = [solution];
```

For puzzles with two parts, add a second solution:

```typescript
function part1(input: string) {
  // Part 1 logic
  return result;
}

function part2(input: string) {
  // Part 2 logic
  return result;
}

export const solutions = [part1, part2];
```

## Testing

The scaffolded test file includes a template for testing with example inputs:

```typescript
const examples = [
  {
    input: 'example input here',
    result: 'expected result',
  },
];
```

Add example cases from the puzzle description to verify your solution works correctly before running against the full input.

## Project Structure

```
advent24/
├── bin/                    # CLI utilities
│   ├── index.ts           # Main entry point
│   ├── scaffold.ts        # Scaffolding logic
│   ├── solve.ts           # Solution runner
│   └── utils.ts           # Shared utilities
├── src/
│   ├── solutions/         # Your solutions organized by year/day
│   │   └── YYYY/DD/
│   │       ├── solution.ts
│   │       └── solution.test.ts
│   └── templates/         # Templates for new solutions
├── .cache/                # Auto-generated puzzle inputs (gitignored)
└── package.json
```

## Development Scripts

- `bun run scaffold` - Scaffold a new solution
- `bun run solve` - Run a solution
- `bun test` - Run all tests
- `bun run format` - Format code with Prettier
- `bun run lint` - Lint and fix code with ESLint
- `bun run typecheck` - Type-check with TypeScript
