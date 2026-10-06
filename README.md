# ORBIT

A presentation-only 3D landing project for a fictional workspace where small teams organize, run, and review AI workflows.

Built as a hands-on experiment with Pi and Blender MCP, ORBIT explores AI-assisted development with repository instructions, reusable skills, and review/fix prompts. The 3D asset was created in Blender and integrated into a Next.js application using React Three Fiber.

## Current state

A minimal, complete one-page landing is implemented at the project root with Next.js App Router. It includes the hero, three capabilities, workflow, final CTA, and the interactive AI Core. All primary CTAs lead to the on-page `#demo` region. There is no working AI backend or account system.

## Run locally

Use Node.js 22 or newer and npm 10.5.1 or newer:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To check and run a production build:

```bash
npm run lint
npm run build
npm start
```

The application lives at the repository root; `app/` is the App Router directory. `next/font/google` downloads Unbounded, Onest, and JetBrains Mono during development/build and serves them locally to visitors. The initial font download requires network access.

## Project highlights

ORBIT includes:

- An original fictional product concept centered on shared context, connected tools, and review checkpoints.
- English product copy and a dark graphite palette with cold teal and restrained violet accents.
- A custom AI Core built from a low-poly icosphere and three open orbital bands with different inclinations and gap positions.
- A compact, texture-free GLB export with applied transforms and a centered origin.

## Model assets

| File | Purpose |
| --- | --- |
| `assets/ai-core.blend` | Editable source with Blender-only preview lights, camera, and world |
| `assets/ai-core.glb` | One exportable mesh, four materials, and 8,204 triangles; 255,832 bytes |
| `public/models/ai-core.glb` | Identical web copy loaded at `/models/ai-core.glb` |
| `assets/ai-core-viewport.png` | Rendered Blender viewport screenshot |

The GLB passed Khronos glTF Validator with zero errors and warnings, as well as a Blender import round-trip. See [model notes](docs/ai-core.md) for checks and limitations.

![AI Core in the Blender viewport](assets/ai-core-viewport.png)

## Blender MCP

The project-level Pi configuration is in `.pi/mcp.json`. It launches the official [Blender MCP](https://projects.blender.org/lab/blender_mcp) through `uvx`.

Install `uv` and Pi, then install and enable the Blender MCP add-on in Blender through the Blender Lab extensions repository at `https://lab.blender.org/`. Start the add-on's local bridge and run `pi mcp list` from the project root to check the MCP server. A successful scene query confirms the Blender bridge connection.

## Web implementation

TypeScript, Next.js 16, React 19, Tailwind CSS 4, Three.js, React Three Fiber, and Drei. Static page sections are Server Components; the Canvas is isolated in a dynamically loaded Client Component.

- `components/ai-core-demo.tsx`: accessible demo region, loading status, motion preference, WebGL detection, and an error boundary.
- `components/ai-core-scene.tsx`: Canvas, `useGLTF`, soft lighting, subtle pointer tilt, and gentle idle rotation.
- `components/core-fallback.tsx`: local, static DOM/SVG illustration for unavailable 3D.

The model uses a camera at `[0, 0, 4.5]`. The presentation orientation is applied in React, without modifying the Blender source or GLB. Reduced motion disables idle rotation, pointer tilt, smooth scrolling, and the loading pulse; Canvas switches to demand rendering. The preference is also respected when changed while the page is open.

## Verification

- `npm run lint` and `npm run build`: passed.
- Web GLB: 255,832 bytes, below 5 MB, and byte-identical to the source export.
- Chromium at 1440 × 900 and 390 × 844: model loading, all sections, mobile text-before-model order, and no horizontal overflow verified.
- Keyboard navigation, skip link, visible focus, and CTA navigation/focus to `#demo`: verified.
- Initial and live reduced-motion preferences: verified using WebGL draw-call counts; continuous rendering stops.
- Loading status, unavailable WebGL, malformed GLB, and lost WebGL context: verified; static fallback appears.
- Normal desktop/mobile sessions: no console errors, page errors, or failed requests.
- A deliberately malformed GLB produces an expected caught React diagnostic; it does not generate an uncaught page error or break the page.
- Automated axe-core WCAG 2 A/AA and 2.1 A/AA checks: no violations on desktop or mobile. This is not a full accessibility certification.
- JavaScript disabled: page content, static preview, and anchor navigation remain available.

Browser checks used Chromium with software WebGL. Safari, Firefox, real-device GPU performance, and screen-reader behavior remain unverified. Test tooling was installed outside this repository, not as an application dependency.

## Current limitations

No postprocessing, bloom, pause/resume button, backend, auth, remote images, or remote models are included. Further effects and rotation controls are intentionally deferred.

`npm audit --omit=dev` reports no runtime vulnerabilities. The full audit reports five high-severity development-tooling entries stemming from the transitive `braces` dependency used by `eslint-config-next`; these are not part of the browser bundle.

The [product brief](docs/brief.md) defines the landing's scope and copy. See [model notes](docs/ai-core.md) for asset details.
