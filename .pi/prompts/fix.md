Fix only the BLOCKERS and MAJOR findings from the latest ORBIT review.

1. Read `AGENTS.md`, `docs/brief.md` and the latest review in the conversation. If the review is unavailable or the findings are ambiguous, ask the user to provide or clarify it before editing.
2. Inspect the affected code and confirm each finding against the current project state. Briefly explain the fix plan in Ukrainian.
3. Apply the smallest coherent fixes. Preserve the design, English page copy and product scope unless a specific finding requires a targeted change. Do not address MINOR findings, implement deferred features or add unrelated dependencies.
4. Preserve unrelated user changes. Before a large change, establish a recoverable Git checkpoint for relevant files as described in the project workflow.
5. Do not modify the Blender source or replace the GLB unless an asset-specific finding requires it. Keep `assets/ai-core.glb` and `public/models/ai-core.glb` synchronized when changing the model.
6. Run `npm run lint` and `npm run build` from the project root, verify that the web GLB is below 5 MB and repeat the checks needed to demonstrate that the reported issues are resolved.
7. Reassess the result using `.pi/prompts/review.md`. For a verification gap, perform the missing check if tools are available; do not change code merely because evidence was unavailable. If a check remains unavailable, report it explicitly.

Keep project documentation and page copy in English. Communicate with the user in Ukrainian.

Return these sections:

CHANGES: changed files and the finding addressed by each change
VERDICT: PASS or FAIL
BLOCKERS: remaining findings or "None"
MAJOR: remaining findings or "None"
MINOR: previously reported minor findings, with any that no longer apply identified; do not fix them as part of this request
EVIDENCE: commands and results, model size, verification observations and any unverified checks

Use the PASS criteria from the review prompt. Do not claim that an issue is resolved without supporting evidence. After the report, stop and wait for the user's next instruction.
