# Task Management App

## Project Description

SPA for task management built as a test assignment.

The project includes:
- tasks list page
- task details page
- create task page
- edit task page
- form validation
- filtering, sorting and pagination groundwork

Main focus during development:
- simple and maintainable architecture
- working CRUD flow
- clear separation between page logic, form logic and API layer
- minimal overengineering

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Redux Toolkit + RTK Query
- React Hook Form
- Zod
- MUI
- dayjs
- json-server

## Run Instructions

Install dependencies:

```bash
npm install
```

Run frontend and mock server together:

```bash
npm run start
```

Available scripts:

```bash
npm run dev
npm run server
npm run build
npm run lint
npm run test:run
npm run e2e
```

Default local URLs:
- frontend: `http://localhost:5173`
- mock API: `http://localhost:3001`

## Architecture

The project follows an FSD-lite structure:

```text
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/
```

Architecture principles:
- page components orchestrate screen-level behavior
- reusable business UI is placed in `entities` and `features`
- server state is handled with RTK Query
- local UI state is handled inside components and page hooks
- forms are isolated in `features/task-form`
- shared low-level UI and helpers are placed in `shared`

Examples:
- `entities/task` contains task-specific UI and model helpers
- `features/task-form` contains reusable form logic for create/edit flows
- `pages/create-task` and `pages/edit-task` own mutation and navigation logic
- `entities/api` contains RTK Query endpoints

## Development Timeline

Development period:
- start: April 11, 2026
- current implementation stage: April 15, 2026

## Notes on Technology Choices

The project is implemented with the stack required in the assignment.  
At the same time, for a production-oriented version I would consider:

- `TanStack Query`
  for more flexible server state handling and cache control
- `TanStack Router` or `React Router v7`
  for stronger route typing and more modern routing ergonomics
- `DummyJSON` or another hosted mock API
  if the task required faster prototyping without local mock server limitations

These are not mandatory improvements for the test assignment, but they could simplify some parts of the implementation depending on product requirements.

## json-server Limitation and Chosen Solution

During development an issue was found with `json-server` filtering behavior.

Current task contract requires:

```ts
interface Task {
  tags: string[];
}
```

However, `json-server@1.0.0-beta.15` does not provide reliable server-side filtering for array fields like:

```ts
tags: ['ui', 'frontend', 'react']
```

This becomes a problem for filtering tasks by tag.

### Problem

When the filtered field is an array, built-in query operators are not sufficient for the expected behavior of exact tag filtering on the mock backend.

### Chosen Solution

On the mock server level, store tags as a string:

```ts
tags: 'ui,frontend,react'
```

Then, inside the API layer:
- transform server response into `string[]`
- transform outgoing payload from `string[]` back into a string

This keeps the frontend contract aligned with the required `Task` model while allowing predictable filtering behavior on the mock backend.

In other words:
- server DTO can differ from UI/domain model
- frontend still works with `Task.tags: string[]`
- mapping is isolated inside the API layer

## Current Status

Implemented:
- tasks list
- task details
- create task flow
- edit task flow foundation
- reusable task form
- async tags autocomplete
- loading, error and empty states

Still open for further polishing:
- final tag filtering/storage refinement on mock backend
- additional tests for full CRUD flow
- final UX cleanup for create/edit flows
