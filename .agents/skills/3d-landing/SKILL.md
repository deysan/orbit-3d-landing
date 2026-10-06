---
name: 3d-landing
description: Use when building, changing or reviewing the ORBIT 3D landing in this repository.
---

# 3D Landing Workflow

1. Read `AGENTS.md` and `docs/brief.md` from the project root. Keep documentation and page copy in English; communicate with the user in Ukrainian.
2. Inspect the current project state and identify the current lesson or requested step. Stay within that scope rather than implementing later stages.
3. Write a short plan before editing. For a planning-only request, return the plan without changing files.
4. Before a large change, inspect Git status and establish a recoverable checkpoint for the relevant project files. Preserve unrelated user changes; do not reset or overwrite them.
5. Build the smallest complete version for the current step first. Create the implementation from the project's requirements rather than copying the course's final code. Leave optional visual polish for later steps.
6. After application changes, run `npm run lint` and `npm run build` from the project root. When `public/models/ai-core.glb` exists, verify that it is below 5 MB. For Blender work, save `assets/ai-core.blend`, verify the GLB export and keep the web model synchronized when integrating it.
7. Review the result against the brief and the current step. For UI or 3D changes, inspect the browser at desktop and 390 px mobile widths; check model loading, keyboard interaction, reduced motion and the fallback where relevant. Fix blockers and major issues within the requested scope.
8. Report changed files, checks and remaining limitations in Ukrainian. Mark the current step complete only when its applicable checks pass. If a check is unavailable, state what remains unverified. Wait for the user's next instruction before starting another stage.
