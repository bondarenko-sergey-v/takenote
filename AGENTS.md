# Repository Guidelines

## Project Structure & Module Organization
- `src/client/` contains the React + Redux app: `components/`, `containers/`, `slices/`, `sagas/`, `router/`, `styles/`, `utils/`, and `types/`.
- `src/server/` contains the Express API, middleware, route handlers, and utilities.
- `src/resources/` holds shared constants, labels, and assets.
- `tests/unit/` contains Jest and React Testing Library tests; `tests/e2e/` contains Cypress specs and helpers.
- `config/` stores build, Jest, Cypress, Webpack, and Nodemon config.

## Build, Test, and Development Commands
- `npm run dev` runs the client and server together for local development.
- `npm run client` starts the frontend dev server.
- `npm run server` starts the backend with Nodemon.
- `npm run build` creates the production bundle.
- `npm run prod` runs the server entry with `ts-node`.
- `npm run test` runs the unit/component suite; `npm run test:coverage` adds coverage.
- `npm run test:e2e` and `npm run test:e2e:open` run Cypress headless or in browser.
- `npm run format` and `npm run eslint` format and lint.

## Coding Style & Naming Conventions
- Use TypeScript, functional React components, hooks, single quotes, no semicolons, and two-space indentation.
- Prefer named exports for components and keep imports grouped as builtin, external, internal, then styles/assets.
- Use `PascalCase.tsx` for components and `*.test.ts` or `*.test.tsx` for tests.
- ESLint and Prettier enforce the style; lint-staged runs `eslint --fix` and `prettier --write` on staged files.

## Testing Guidelines
- Add or update tests for behavior changes, especially in `tests/unit/client/` and `tests/unit/server/`.
- Keep Jest tests colocated by feature area with descriptive `*.test.tsx` names.
- Cypress specs live in `tests/e2e/integration/`; use helpers in `tests/e2e/utils/` instead of duplicating setup.

## Commit & Pull Request Guidelines
- Commit messages are short, imperative, and sometimes prefixed, e.g. `fix:` or `docs:`.
- PRs should describe the change, link the related issue when one exists, and include screenshots or screen recordings for UI work.
- Mention any test commands you ran and call out configuration or environment changes.

## Completion Commands
- Before marking work complete, always the most relevant checks for the change: `npm run test`, `npm run test:coverage`, `npm run test:e2e`, or `npm run build`.
- Before marking work complete, always run `npm run eslint`.
- If a change affects both client and server behavior, run at least one unit test and one build or lint command before handing off.
