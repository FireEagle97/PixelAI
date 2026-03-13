# Reusable Prompt Templates — pixelAI

Copy and paste these into Cursor Chat. Replace `[bracketed]` values with specifics.

---

## New transformation type

```
Add a new AI transformation type to pixelAI.

Name: [name, e.g. "enhance"]
Cloudinary effect: [e.g. "enhance"]
Label: [e.g. "Image Enhance"]
Description: [e.g. "Automatically enhance image quality"]
Credit cost: 1 (use the existing creditFee constant)

Steps to follow:
1. Add the new type to `constants/index.ts` → `transformationTypes` object, following the existing shape (key, type, title, subTitle, config, icon)
2. The dynamic route `app/(protected)/transformations/add/[type]/page.tsx` already handles all types — verify the new key is recognized
3. If the transformation requires a prompt input (like remove/recolor), set `config.prompt` accordingly
4. Add any new Server Action logic to `lib/actions/image.actions.ts`, following the existing `addImage` / `updateImage` pattern
5. Credits are deducted in `TransformationForm.tsx` via `updateCredits()` — confirm the flow still applies
6. Test the full flow: upload → transform → save → appears in gallery

Do not modify `middleware.ts`, `routes.ts`, or `auth.ts`.
```

---

## Bug fix (test-first)

```
Fix a bug in pixelAI using a test-first approach.

Bug description: [describe the bug and how to reproduce it]
Affected file(s): [e.g. lib/utils.ts, lib/actions/image.actions.ts]

Steps:
1. Read the affected file(s) first
2. Write a failing test in `[affected-module].test.ts` that reproduces the bug
3. Run the test and confirm it fails
4. Fix the minimal amount of code needed to make the test pass
5. Confirm the test passes and no other tests regress
6. Return the diff — one concern only

Do not refactor unrelated code. Do not add features. Keep the diff minimal.
```

---

## New Server Action

```
Add a new Server Action to pixelAI.

Action name: [e.g. archiveImage]
Location: lib/actions/image.actions.ts (or create lib/actions/[name].actions.ts if unrelated to images)
Purpose: [describe what it does]
Input: [describe the expected input shape]
Output: { success?: string; error?: string }

Requirements:
1. Validate input with a Zod schema — add to `schemas/index.ts` if a new schema is needed
2. Check authentication with `currentUser()` from `@/lib/auth.ts`
3. Access the DB only via `db` from `@/lib/db.ts`
4. Wrap all logic in try/catch — use `handleError()` in the catch block
5. Call `revalidatePath()` after any mutation
6. Return `{ success: "..." }` on success, `{ error: "..." }` on failure
7. Never throw raw errors to the caller

Follow the pattern in `lib/actions/image.actions.ts` → `addImage` as reference.
```

---

## Write tests for a module

```
Write Vitest unit tests for the following module in pixelAI.

Module: [e.g. lib/utils.ts]

Requirements:
- Co-locate the test file: [e.g. lib/utils.test.ts]
- Use `describe` + `it('returns X when Y')` naming
- Cover: happy path, edge cases (empty/null/zero inputs), and error cases
- If the module uses Prisma (`@/lib/db.ts`), mock it with `vi.mock("@/lib/db", ...)`
- If the module uses Cloudinary or Stripe, mock those SDKs too
- Do NOT test shadcn/ui internals or NextAuth internals

Focus on: [list the specific functions or behaviors to test]
```

---

## Code review

```
Review the following code in pixelAI for correctness, type safety, security, and performance.

File(s): [e.g. lib/actions/image.actions.ts]

Checklist:
- [ ] No `any` types — uses `unknown` with narrowing where needed
- [ ] All async functions have try/catch with `handleError()`
- [ ] Auth check present before any DB access (uses `currentUser()` or `currentRole()`)
- [ ] No direct `PrismaClient` instantiation — uses `db` from `@/lib/db.ts`
- [ ] No direct `creditBalance` mutation — uses `updateCredits()` from `@/data/user.ts`
- [ ] Input validated with Zod before DB writes
- [ ] No `console.log` statements
- [ ] No hardcoded secrets or API keys
- [ ] Returns `{ success }` or `{ error }` shapes (no raw throws to client)
- [ ] `revalidatePath()` called after mutations

Flag issues with severity: critical / warning / suggestion.
```

---

## Refactor (behavior-preserving)

```
Refactor the following code in pixelAI. The behavior must not change.

File: [e.g. components/shared/TransformationForm.tsx]
Goal: [e.g. extract the credit-deduction logic into a separate hook, reduce component size]

Constraints:
- All existing tests must continue to pass
- Do not change function signatures or exported interfaces
- Do not add new features
- Keep the diff minimal — one concern per change
- Add a comment only if the intent is non-obvious

After refactoring, confirm:
1. The component still renders the same UI
2. The form submission flow is identical
3. No TypeScript errors introduced
```

---

## Explain unfamiliar code

```
Explain the following file or function in pixelAI as if I'm new to this codebase.

File / function: [e.g. lib/actions/transaction.action.ts → createTransaction]

I need to understand:
1. What this code does (purpose, not line-by-line summary)
2. What inputs it expects and what it returns
3. What side effects it has (DB writes, cache revalidation, emails, webhooks)
4. How it connects to other parts of the app
5. Any non-obvious decisions or gotchas

Keep the explanation concise and practical.
```
