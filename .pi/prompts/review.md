Review the ORBIT 3D landing. Do not edit project files.

1. Read `AGENTS.md` and `docs/brief.md`. Identify the requested scope and any features explicitly deferred by the user. Do not treat deferred features as missing requirements for the current step.
2. From the project root, run `npm run lint` and `npm run build`. Report failures accurately.
3. Verify that `public/models/ai-core.glb` exists and is below 5 MB. When `assets/ai-core.glb` exists, compare it with the web model and report any unexplained difference.
4. Inspect the code for client/server boundaries, GLB loading, loading feedback, WebGL and model-error fallbacks, reduced motion, responsive layout, keyboard accessibility and unnecessary dependencies.
5. Compare the page with the brief: ORBIT branding, English copy, graphite/teal/violet palette, hero, three capabilities, workflow and final CTA. Verify that the primary CTA targets the interactive stage at `#demo` and does not imply a functional AI backend.
6. If browser tools are available, inspect the running page at desktop and 390 px mobile widths. Check model visibility, layout, CTA navigation, keyboard focus, reduced motion and console errors. Exercise fallback behavior where practical. If browser verification is unavailable, explicitly report which checks remain unverified; do not infer visual correctness from code inspection.

Classify findings:

- BLOCKERS: prevent the app from building, running or completing the primary interaction.
- MAJOR: materially violate an applicable requirement, including model loading, mobile usability, accessibility or reduced motion.
- MINOR: non-blocking polish or maintainability issues.

Return exactly these sections, using Ukrainian for explanations and findings:

VERDICT: PASS or FAIL
BLOCKERS: findings with file locations, impact and reproduction steps where applicable; otherwise "None"
MAJOR: findings with file locations, impact and reproduction steps where applicable; otherwise "None"
MINOR: findings or "None"
EVIDENCE: commands and results, model size, browser observations and any unverified checks

PASS is allowed only when BLOCKERS and MAJOR are empty, lint and build pass, the GLB size check passes and the applicable browser checks have been verified. If required evidence is unavailable, return FAIL and explain the verification gap in EVIDENCE without inventing a code defect.
