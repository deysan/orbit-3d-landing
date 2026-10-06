# ORBIT Mini Harness

## Mission
Build a one-page 3D landing for the fictional product ORBIT.
Read `docs/brief.md` before planning or editing.
Develop the project incrementally as the user follows the course.

## Stack
- TypeScript, Next.js 16 App Router, React 19, Tailwind CSS.
- Three.js through React Three Fiber and Drei. Add bloom through `@react-three/postprocessing` only during the visual polish stage if needed.
- Fonts are self-hosted through `next/font/google` (Unbounded, Onest, JetBrains Mono).
- All page copy and project documentation are in English.
- Communicate with the user in Ukrainian, including plans, questions, explanations and completion reports.
- The Next.js application lives at the project root; `app/` is its App Router directory.
- The web model lives at `public/models/ai-core.glb`. Keep the Blender source at `assets/ai-core.blend` and an exported copy at `assets/ai-core.glb`.

## Working rules
1. Plan before editing. Briefly explain meaningful implementation choices.
2. Make one coherent change at a time. Complete only the current step requested by the user; wait before moving to the next course stage.
3. Build from the user's requirements. Do not copy the course's final implementation into this project.
4. Do not add remote images or models, analytics, auth, a database or a CMS. Do not add dependencies without a concrete need.
5. Keep 3D code inside a client component.
6. Support 390 px mobile width, keyboard interaction and reduced motion.
7. Build the smallest complete version first. Add visual polish and extra interactions in later steps.
8. Before finishing an application change, run `npm run lint` and `npm run build` from the project root. Once the GLB exists, check its size. If checks are unavailable at the current stage, report that explicitly.
9. After each step, list changed files, verification results and any remaining limitations. Do not claim the full project is complete after an intermediate step.
10. When preparing the project for GitHub, document the course inspiration and the project's customizations in an English README.

## Definition of done
These criteria apply to the completed landing, not to early setup steps.

- No console errors.
- The GLB loads and remains readable on mobile.
- A static fallback appears if WebGL is unavailable or the model fails to load.
- The page works without mouse input.
- Continuous decorative animation stops when reduced motion is requested.
- Page copy and project documentation are in English.
- The primary CTA leads to the on-page interactive demo.
- `lint` and `build` pass.
- The GLB is below 5 MB.

## Framework guidance
Before using unfamiliar Next.js APIs, consult the documentation bundled with the installed version when available, or the official documentation for that version.
