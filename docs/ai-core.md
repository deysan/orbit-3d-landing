# ORBIT AI Core

## Scope

A standalone model created through the official Blender MCP in Blender 5.2.2 LTS. The landing now loads an unchanged copy of this export through React Three Fiber and Drei. Web presentation transforms and animation do not modify the Blender source or exported geometry.

## Deliverables

- `assets/ai-core.blend`: editable Blender source, model, preview lighting, camera, and dark world.
- `assets/ai-core.glb`: self-contained glTF 2.0 binary containing only the model and its materials.
- `public/models/ai-core.glb`: byte-identical web copy, served at `/models/ai-core.glb`.
- `assets/ai-core-viewport.png`: screenshot of the rendered Blender viewport.

All paths were resolved from the project root and passed to Blender as absolute paths.

## Model

`AI_Core` is one mesh with four disconnected, closed components. Named vertex groups retain access to each part:

- `Core_Icosphere`: a flat-shaded, 80-triangle low-poly icosphere.
- `Orbit_Outer_Teal`: open graphite band with cold teal inlays; 48-degree gap.
- `Orbit_Middle_Teal`: open graphite band with cold teal inlays; 54-degree gap.
- `Orbit_Inner_Violet`: smaller open graphite band with restrained violet inlays; 44-degree gap.

The bands have different inclinations, radii, and gap positions. Their bevelled cross-sections are closed at both ends. End caps use explicit nondegenerate faces, and the final mesh is fully triangulated for stable export.

The bounding box is approximately **1.994525 × 1.995946 × 2.000000 meters** in Blender coordinates. A rigid rotation and uniform scaling balanced the overall dimensions without stretching the core. The bounding-box center and object origin are `(0, 0, 0)`. Location and rotation are zero, scale is one, and no modifiers remain.

Materials use Principled BSDF with constant PBR values: `Graphite Metal`, `Graphite Edge`, `Cold Teal`, and `Muted Violet`. No image textures, external assets, linked libraries, simulations, or text geometry are used. Accent emission is subtle; no bloom or postprocessing is configured.

## Blender-only studio

The `Studio - Not Exported` collection contains:

- `Key_Softbox`: broad, soft main light.
- `Rim_Cold_Teal`: cool rim light.
- `Fill_Soft`: soft fill light.
- `Rim_Violet_Subtle`: restrained violet rim light.
- `Preview_Camera`: orthographic presentation camera.

The world is `Dark Graphite Environment`.

## Export and verification

The GLB uses meters and glTF's +Y-up convention. Only the selected `AI_Core` mesh was exported, with materials and normals. Cameras, lights, animation, UVs, textures, and compression extensions are excluded.

| Check | Result |
| --- | --- |
| Final exported triangles | 8,204 / 40,000 maximum |
| GLB size | 255,832 bytes; approximately 249.84 KiB / 5,000,000 bytes maximum |
| Mesh nodes | 1 |
| Material primitives / expected draw calls | 4 |
| Exported vertices including normal/material splits | 8,455 |
| Non-manifold source edges | 0 |
| Degenerate exported triangles | 0 |
| Loose source vertices | 0 |
| Khronos glTF Validator 2.0.0-dev.3.10 | 0 errors, 0 warnings, 0 infos, 0 hints |
| Independent binary/accessor/index/normal checks | Passed |
| Blender GLB round-trip | One mesh, four materials, 8,204 triangles, matching dimensions and identity transform |
| Missing external files | None |
| Viewport review | Core, three open bands, teal/violet accents, and dark background are visible |

Round-trip validation used a temporary Blender scene, which was removed afterward. The original scene was restored and saved. The validator package and recovery checkpoints are outside the repository; no application dependencies were added.

## Web integration

The Canvas lives in `components/ai-core-scene.tsx`, a Client Component loaded dynamically by `components/ai-core-demo.tsx`. `useGLTF` loads `/models/ai-core.glb`; the shared cache is resolved before mounting the renderer so asset errors reach the DOM error boundary. A cloned scene receives presentation transforms in React; the source assets remain unchanged.

The camera is at `[0, 0, 4.5]` with a 38-degree field of view. Ambient, hemisphere, and directional lights keep the setup lightweight; there is no postprocessing or external environment image. The model scales to fit narrow viewports.

Idle rotation is 0.08 radians per second. Pointer tilt is limited to 0.16 radians horizontally (about 9.2 degrees) and 0.12 radians vertically (about 6.9 degrees). Exponential damping uses a rate of 8 per second for a responsive but smooth reaction and return when the pointer leaves the stage. Touch does not trigger pointer tilt. Reduced motion disables both, switches Canvas to demand rendering, and responds to live preference changes.

The focusable `#demo` region includes an announced loading status. Unavailable WebGL, an asset error, or context loss switches it to an accessible static DOM/SVG illustration. The initial HTML also contains a static preview.

Web verification covered Chromium at 1440 × 900 and 390 × 844, model loading, CTA/keyboard focus, loading state, initial/live reduced motion, unsupported WebGL, malformed GLB, and context loss. Normal sessions have no console errors or failed requests. The deliberately malformed GLB test generates an expected caught React diagnostic, not an uncaught page error. Application lint/build and automated axe-core checks passed. See the [README](../README.md) for the complete verification summary.

## Limitations and next-stage work

- Preview area lights, camera, world, and AgX color management are not embedded in the GLB. The web uses its own simple lighting and tone mapping, so it is not an exact match to the Blender screenshot.
- The rings are mesh islands inside one object, not independently animated objects. They remain selectable through vertex groups in the Blender source.
- Additional effects and an accessible pause/resume control are intentionally deferred.
- Browser tests used software WebGL. Safari, Firefox, real-device GPU performance, and screen-reader behavior remain unverified.
