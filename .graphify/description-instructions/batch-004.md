# Node Description Batch 5 of 10

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/Diberto/el-camino-del-samurai@5cec31a68f6197daddbd54b047f7b51f9ab55d64": "5cec31a docs: update walkthrough for exclusive PocketBase provider and public A…" | kind=Commit | source=git | neighbors=[master, 0da1f79 refactor: remove unused local S…, 8656858 feat: make PocketBase exclusive…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@5d50db607e4f0ac9cd37bc870aca8404c5328bfa": "5d50db6 docs: update design spec for Blog catalog and reader views" | kind=Commit | source=git | neighbors=[master, 73225bf docs: update plan for Blog cata…, dcd0258 docs: update walkthrough for pu…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@603d5fe531667b664d0c9faab80b190b4d1ae954": "603d5fe fix(navbar): keep sticky menu styling identical and unified in all modes" | kind=Commit | source=git | neighbors=[master, 1dae309 fix(menu): lock all menu text l…, 90fc3cd feat(theme): extend Day/Night m…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@6114a72782c51df36fdc07f7168fdbb8cd114351": "6114a72 fix(navbar): lock desktop menu text link color to bright white (#f8f9fa…" | kind=Commit | source=git | neighbors=[111a100 fix(3d-book): repair 3d box geo…, master, cc310b4 feat(theme): implement interact…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@61d9e5483e9ad7a86a84e695dbd92b521dd81274": "61d9e54 docs: update design spec for Unified Node App server" | kind=Commit | source=git | neighbors=[4cfca8e docs: update walkthrough for Po…, master, 21e2a6e docs: update plan for Unified N…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@6cb0334d31de0c1de4f27a143e4338742849fdab": "6cb0334 docs: update walkthrough documentation for unified samurai admin and re…" | kind=Commit | source=git | neighbors=[48d0413 feat: align admin shell with sa…, master, 2fcb02d fix: map admin section toggles …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@7179ed10f6596ce90f8ab7c0608a7696f2c96002": "7179ed1 feat(css): add styles for Day/Night skies, clouds drifting, and theme t…" | kind=Commit | source=git | neighbors=[master, e123a8e feat(js): add Day/Night theme m…, c8d7182 feat(html): add sky container m…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@73225bf46de61d298aae6f4d4826ccdf6cd7aad6": "73225bf docs: update plan for Blog catalog and reader views" | kind=Commit | source=git | neighbors=[5d50db6 docs: update design spec for Bl…, master, 102b502 feat: add dynamic top 3 posts w…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@7710994b45eb195575451aa3efd49a96105e3434": "7710994 docs: update plan for Strapi Headless CMS integration" | kind=Commit | source=git | neighbors=[master, 7af96be feat: integrate Strapi Headless…, e4a2547 docs: update design spec for St…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@7a6f4db3564b7a9e04bbbeed0d5c1a9a3a5fdd04": "7a6f4db docs: update walkthrough for final 400 Bad Request resolution" | kind=Commit | source=git | neighbors=[40ba44b fix: eliminate POST auto-seedin…, master, 8a1ce7e fix: sanitize savePost payloads…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@7e6eae11b0815b2656b033f4fdfea482b1f98946": "7e6eae1 assets: add Logo.webp" | kind=Commit | source=git | neighbors=[master, c642b72 fix(clouds): restore missing cl…, e46bc8f fix(layout): wrap hero parallax…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@7e7ab65a86ce20af655e96ff470b96da802520ce": "7e7ab65 docs: update design spec for unified samurai admin and real-time synchr…" | kind=Commit | source=git | neighbors=[084f7f6 docs: add walkthrough documenta…, master, 1549879 docs: update implementation pla…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@7f08f5336aec766d8ca88f6299d4eec5b8a83273": "7f08f53 fix(fuji): resolve fuji snow cap transparency by selectively filling pe…" | kind=Commit | source=git | neighbors=[514414b fix(sakura): restore original s…, master, 5ea7b41 feat(clouds): integrate WebGPU …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@8161ee0de3a95cc5e13b2a750cfcd9d732ecee63": "8161ee0 docs: update walkthrough for cleanup of Strapi and Local SQLite adapters" | kind=Commit | source=git | neighbors=[0da1f79 refactor: remove unused local S…, master, 469316f fix: resolve PocketBase 400 Bad…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@8ba7e5f8edf92936a009b432ae947f2de33358f2": "8ba7e5f docs: add implementation plan for architecture and performance optimiza…" | kind=Commit | source=git | neighbors=[3bf6a3a docs: add design specification …, master, ee4947c perf(architecture & memory): im…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@8c1eec24b27c986e4da4c8923ab14eb17dfe0d85": "8c1eec2 docs: update walkthrough for 404 and AudioContext bug fixes" | kind=Commit | source=git | neighbors=[14d3d80 fix: resolve PocketBase collect…, master, cd5a935 fix: resolve static hosting Hos…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@8cd8d9184eebcd35d7b9acad58bf00b0c8f3008d": "8cd8d91 docs: update walkthrough for blog post navigation fix" | kind=Commit | source=git | neighbors=[165b44d fix: make entire blog catalog c…, master, 9cb9cbc fix: resolve navigation conflic…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@90fc3cde536a89b147bbd72c0bc988c7a72f82c9": "90fc3cd feat(theme): extend Day/Night mode transition to 100% of website backgr…" | kind=Commit | source=git | neighbors=[52462a2 style(navbar): transition stick…, master, 603d5fe fix(navbar): keep sticky menu s…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@992fa5d1e9ade07e118e9c3bd85219bac6534509": "992fa5d chore: update graphify manifest and sync repository" | kind=Commit | source=git | neighbors=[6d400fe fix: update server.listen for U…, master, 6fcf262 feat: add 1700000001_unlock_col…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@9a29bbf128f401b783984ea4bb2e6c6a196909cc": "9a29bbf fix: update Hero section action button from Oráculo Zen to Comprar (#co…" | kind=Commit | source=git | neighbors=[master, c36d469 docs: update design spec for Po…, e8e6597 fix: remove admin panel link fr…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@9c66d683e34c32e315a2801be2dfc1cd6b6018a5": "9c66d68 fix(mobile): enlarge and center Enso artwork, fix unrendered left edge …" | kind=Commit | source=git | neighbors=[2228b27 feat(mobile): align Enso artwor…, master, b6fbf32 feat(logo): restore original bl…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@9c9ebe0ab221fbbc1036b916b262ac57231eea75": "9c9ebe0 fix(fuji): resolve transparent holes in fuji snow peak by preserving hi…" | kind=Commit | source=git | neighbors=[5b9e949 fix(fuji): reconstruct Mount Fu…, master, 6d2db3a feat(sakura): implement high-pe…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@9db1bb9dc0ff1667294ed633537fe3f482018fe0": "9db1bb9 docs: update walkthrough for 2-stage blog catalog and reader router" | kind=Commit | source=git | neighbors=[102b502 feat: add dynamic top 3 posts w…, master, e8e6597 fix: remove admin panel link fr…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@a11a5b71e24648be926e92375c631f1abbcc1a50": "a11a5b7 fix(navbar): remove GPU option from public header menu" | kind=Commit | source=git | neighbors=[28ed22a feat(gpu): add /gpu configurati…, master, cc9752f fix(gpu): connect site script t…] | lang=pt
- "commit:repo:github.com/Diberto/el-camino-del-samurai@a6e93803a003fac9954c9280aae071a8fbeab289": "a6e9380 Initial commit" | kind=Commit | source=git | neighbors=[master, eaa4638 fix: samurai detras del texto h…, script.js] | lang=pt
- "commit:repo:github.com/Diberto/el-camino-del-samurai@a9f92539b8d19368c3908861c4a3a26dc35ace12": "a9f9253 feat(branding): crop exact circular red kanji seal stamp directly from …" | kind=Commit | source=git | neighbors=[master, 2a3315c fix(performance): cap canvas re…, d85fa73 feat(branding): replace text ka…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@ac827a25accfdf07ca8c348267784488d0ae63cc": "ac827a2 docs: update walkthrough for server.js Node app implementation" | kind=Commit | source=git | neighbors=[28b5340 feat: add server.js single-entr…, master, 14d3d80 fix: resolve PocketBase collect…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@ad996eb11ad5bb5c3776e5bc466b75e4ae5c9907": "ad996eb docs(spec): add backup system design specification" | kind=Commit | source=git | neighbors=[master, 16ee04a docs(plan): add implementation …, cb439bf feat(seo & security): add SEO m…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@b3dc1fb6a79924e99be73d162359aaf5d8582519": "b3dc1fb docs: update walkthrough for audio removal" | kind=Commit | source=git | neighbors=[master, c266afd feat: verify PocketBase as defa…, cb7e83e refactor: remove audio engine, …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@b552139f98b9688bba9584ce66f967e912863a96": "b552139 docs: update walkthrough for final 400 Bad Request resolution" | kind=Commit | source=git | neighbors=[196097e fix: resolve PocketBase 400 Bad…, master, 40ba44b fix: eliminate POST auto-seedin…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@bafccaf54bcd110e9af5e36780062147c3c85102": "bafccaf docs: update walkthrough for PocketBase 400 Bad Request fix" | kind=Commit | source=git | neighbors=[469316f fix: resolve PocketBase 400 Bad…, master, 84bc08e fix: make admin login and modul…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@bc1adc8d1ce24dbf4b320f01511e7642bedb3573": "bc1adc8 docs: update walkthrough documentation for exact section mapping" | kind=Commit | source=git | neighbors=[2fcb02d fix: map admin section toggles …, master, 94208da fix: auto-sync section toggles …] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c266afd81d6f75c235a83cb66f90ca7766c56d49": "c266afd feat: verify PocketBase as default backend provider and add Linux syste…" | kind=Commit | source=git | neighbors=[b3dc1fb docs: update walkthrough for au…, master, 4cfca8e docs: update walkthrough for Po…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c2e6c56dcb786118f62492c837e0467119340f51": "c2e6c56 docs: update plan for PocketBase Linux and cross-platform service integ…" | kind=Commit | source=git | neighbors=[master, 1d552ed feat: integrate PocketBase as d…, c36d469 docs: update design spec for Po…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c36d469d9f42b8a5dfc8b281e4185926406b2d89": "c36d469 docs: update design spec for PocketBase Linux/cross-platform runner" | kind=Commit | source=git | neighbors=[9a29bbf fix: update Hero section action…, master, c2e6c56 docs: update plan for PocketBas…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c4adbee4b411f79f82150dc96cf30fb7ccce57db": "c4adbee fix(header): preserve translateY(-50%) transform on theme-toggle-btn ho…" | kind=Commit | source=git | neighbors=[2e00a3f fix(theme): eliminate duplicate…, master, 785f410 fix(logo): maintain white typog…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c4fc262b2584b2a80f8dbebe91857889f8251465": "c4fc262 fix(fuji): resolve fuji snow transparency using precise scanline fill b…" | kind=Commit | source=git | neighbors=[5ea7b41 feat(clouds): integrate WebGPU …, master, 0065d03 chore(cleanup): remove 97 unuse…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c8d71822b8acf9308f72f0e77b7ffc6b00c2b68c": "c8d7182 feat(html): add sky container markup and theme toggle button" | kind=Commit | source=git | neighbors=[3e1faf4 add implementation plan for ani…, master, 7179ed1 feat(css): add styles for Day/N…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@c9842faa45f5ab5cd3d8df179549566473365e8b": "c9842fa docs: update walkthrough for final PocketBase exclusivity verification" | kind=Commit | source=git | neighbors=[4a8d488 fix: HTML structure in admin.ht…, master, 196097e fix: resolve PocketBase 400 Bad…] | lang=en
- "commit:repo:github.com/Diberto/el-camino-del-samurai@cbacb099be765c50f4aa2c3aa2441f35841c48a8": "cbacb09 fix(hero): contain hero logo and artwork within 1200px max-width center…" | kind=Commit | source=git | neighbors=[master, 443707e feat(parallax): restrict deskto…, e0b581f feat(parallax): restrict parall…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Documentos\Work\hummus\samurai\el-camino-del-samurai\.graphify\description-instructions\batch-004.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
