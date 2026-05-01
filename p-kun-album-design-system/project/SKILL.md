---
name: p-kun-album-design
description: Use this skill to generate well-branded interfaces and assets for ぴーくんアルバム (P-kun Album) — a Japanese photo album web app for parents to share kids' photos with grandparents. Contains design tokens, the P-kun mascot, type, colors, and a web UI kit. Tone is gentle, warm, kid-friendly Japanese (です/ます), with a muted yellow-green brand and tangerine accents.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key things to remember:
- Always import `colors_and_type.css` for design tokens.
- Use the **muted yellow-green** brand (`--brand` = `#97a05c`) — never bright/saturated.
- Photos are the hero; chrome recedes (warm cream backgrounds, soft shadows, generous radii).
- Japanese-first copy in です／ます; the P-kun mascot speaks 〜だよ／〜ね.
- No comments, no likes — this is a calm, quiet product. No social pressure.
- Iconography uses Phosphor Duotone via CDN (`@phosphor-icons/web@2.1.1`).
- The P-kun mascot is a cute Asian boy with bowl-cut black hair and yellow-green overalls. Use the SVGs in `assets/p-kun/`.
- Avoid: bright gradients, emoji in UI chrome, hand-drawn SVG approximations of icons.
