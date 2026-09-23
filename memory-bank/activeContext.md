# Active Context: Nick Strayer's Personal Website

## September 2026 Maintenance

- Cloned `nstrayer/nstrayer.github.io` into `/Users/nicholasstrayer/dev/nstrayer.github.io`.
- Updated to Astro 7.3.2, React 19.3, Tailwind CSS 4.3, and current stable dependencies.
- Added `npm run check`; TypeScript 6 is the newest version supported by Astro's checker.
- GitHub Pages workflow now uses Node 24 and checks source before building.
- Current project data is `src/data/projects.json`; the live background is a paper
  texture, not the retained WebGL experiments described in older notes below.
- See README for current setup and server start/stop commands.
- The maintenance and posts commits are now on `origin/master`. This checkout was
  fast-forwarded to `a06fc15` on September 17 before integrating the paper redesign.
- Added a Markdown-backed Posts section using Astro content collections. Posts are
  authored in `src/content/posts/`, listed on `/posts/`, previewed on the homepage,
  and can opt into a styled AI-assistance disclosure through frontmatter.

## Current Design Work

Post lists (September 22) are a dated list in `PostList.astro`, which replaced
`PostCard.astro`: a `<ul>` with hairlines above, between, and below the entries. A
6.5rem left column holds the short date ("Sep 16, 2026") on the title's baseline,
with the tags beneath it to save height. The title and description sit to the right.
On screens ≤600px the date and tags share one line ("Sep 16, 2026 · LLMs") above
the title. The user chose this "printed contents page" look over compact rows and
bullets. Title links have no underline at rest and gain one on hover. The homepage
“View all posts” sits beside the section heading. The homepage and posts archive
share this presentation. The homepage Posts section retains generous outer spacing
around its heading and list. Intro navigation uses small muted bullets and no longer
includes the “Previously…” note.

The homepage now opens with a full-screen header and vertically centered intro.
`Layout.astro` accepts an `intro` slot and uses a `100svh` minimum height for that
opening only; content can grow on short screens and print removes the minimum.
Posts comes before Selected work, and the intro action links and Tools & methods
section have been removed. Navigation follows the remaining section order.
Desktop, mobile, and short-screen checks pass, as do source checks and the build.

September 22, 2026: phone layout for Selected work (≤700px). The user chose the "plate" layout from three prototyped variants: category and title first, then the image across the column (max 13rem tall, uncropped) with its caption, then the description points with small muted dots. On desktop the image stays in an 18rem left column beside the title and text, at most 12rem tall, with no bullets. At every width, images narrower than their column are centered in it, and captions are centered. On desktop, image and text are also centered vertically against each other: the image beside longer text, or the text beside a taller image. This uses rows `1fr auto auto 1fr`, with flexible spacer rows around the header and body. `ProjectCard.astro` markup follows the phone reading order (header, figure, body), and grid areas rearrange it for desktop. All three variants (plate, index with thumbnail, summary with details on demand) are kept on the local branch `prototype/mobile-project-layouts` at commit `9c3f769`.

Earlier: project previews used compact thumbnails (at most 288 × 192 CSS pixels on
desktop and 256 × 160 on mobile), preserving the whole image without borders.
Descriptions get a wider column, row spacing is tighter, and responsive image
variants match the smaller display sizes. Desktop/mobile inspection and the
production build pass.

The redesign was initially implemented on an older local master that lacked the
four posts/maintenance commits. Those commits are now integrated, with the Posts
homepage section and navigation restored. The posts index, article, and AI note
use the same paper treatment and sentence-case styling. The Markdown content,
table captions, and latest attribution wording remain intact. `npm run check`
reports no diagnostics and `npm run build` generates all three pages. Desktop
navigation and mobile article overflow checks pass.

September 17, 2026: The active background is now a static Texturelabs Paper 373 photo, replacing the synthetic SVG grain. `Background.astro` uses `.paper-surface` in `global.css`: a pale, stationary sheet behind unfiltered text, with WebP variants for standard and high-density displays. `scripts/prepare-paper-texture.mjs` regenerates those assets from the root JPEG. Historical WebGL notes below refer to the earlier implementation.

The user settled on 40% paper opacity, then requested text that looks printed onto the paper. Headings and paragraphs now use multiply blending, with the same paper image faintly visible inside large `.ink-heading` letterforms at 90% ink coverage. Section and hero-content wrappers use automatic z-indices so blending reaches the background; the body retains isolation. Dark mode and contrast/print preferences restore solid text.

September 22, 2026: Mobile (≤700px) homepage navigation now includes `ContentsRibbon.astro`, a pale, fixed bookmark ribbon at the top right that opens a full-screen paper contents page. It uses the native popover API, so it is hidden where `:popover-open` is unsupported and falls back to the existing hero index. A small script closes the sheet on link click or Escape and marks the section in view with `aria-current`, shown as an underline. The sheet renders the same `Navigation` component as the desktop hero aside: an "On this page" label and small muted bullets, in regular DM Sans. It's set larger (22px links, 16px label, 4px bullets) and has no left rule. This replaced its earlier bold serif list with hairlines at the user's request; they wanted bigger text in the same style as the desktop, not a different one. The sheet keeps its name header and its "Back to top" / "All posts" footer. The user chose this over running-head and bottom-sheet alternatives, and asked for a toned-down ribbon rather than a solid navy one.

September 22, 2026 design sweep (goal: warm printed page, elegant and crisp, not skeuomorphic). Implemented: the paper layer now uses `mix-blend-mode: multiply` at 0.55 opacity (brightness 1.6), which keeps the full warmth of `#f4f1e9`; the old gray overlay halved it. All `img` in `main`/`#hero` now multiply-blend like the ink, reversing the earlier "images keep original colors" choice. Headings share one weight (500, set in the base layer) and use `text-wrap: balance`; paragraphs use `pretty`. Post tables have heavier rules above and below, hairlines between rows, and no vertical lines. The fonts link now loads real Bitter and DM Sans italics. Second pass: the shadcn palette, the `@theme` mapping and the never-applied `.dark` block are gone. `:root` now has one navy (`--foreground`), plus `--muted-foreground`, `--rule` (40%), `--rule-faint` (15%) and `--paper-light` (code backgrounds). Type tokens: `--text-caption` .8125, `--text-small` .875, `--text-body` 1, `--text-large` 1.125 (hero intro, ledes, post body), `--text-h3` 1.375, `--text-h2` 1.75 (1.5 at ≤700px), and `--text-display` (every h1). Leading is `--leading-body` 1.7 and `--leading-small` 1.5; headings default to 1.3 and h1 uses 1.12. Links in running text inside `main` share one base rule: a hairline underline at 40% of the text color that darkens on hover. Footnote markers and `.text-link` are excluded.

Third pass: project titles are now sentence case with no trailing periods, and every description line ends in punctuation. Spelling is fixed, stray `</li>` and unclosed `<a>` tags are repaired, and "Phewas-ME" is now "PheWAS-ME". The Positron entry is still the only one with a category and caption. Separators are `·` everywhere, page titles use " — ", the CV and Resume link rows line up, and `global.css` defines `.sr-only` so the Markdown "Footnotes" label is hidden. Footnotes are small and muted below a short rule, and post lists have their markers back (Tailwind preflight removes them).

Still open from the sweep: quieter code styling, optical centering of the intro, ribbon overlap on phones, the favicon, social meta tags, post copy typos, and dead code (Skills, Card, SectionDivider, `ui/*`, WebGL; the Tailwind utilities are unused apart from preflight).

The user prefers sentence-case labels and understated print cues. They dislike all-caps text and literal publication conventions such as "Fig. 01"; favor typography, spacing, alignment, and fine rules over decorative numbering.

The approved layout is now implemented: static name header, an introduction with side navigation, left-aligned section titles and shared margins, selected-work rows with uncropped borderless images, simple CV/resume links, and a contact section. All 30 projects remain available, with six shown initially and the rest in a native disclosure. Local raster project images receive responsive WebP variants; the page no longer needs client-side React or animation scripts. The user explicitly requested no border around the selected-work screenshots. The previous stipple and bouncing hover effects are no longer used in the page.

## Historical context

The project is currently in a redevelopment phase, with a focus on modernizing the personal website using Astro. The site structure is established with core sections implemented (Hero, About, Projects, Skills, Contact), and the WebGL particle background continues to evolve with visual enhancements.

### Recent Changes

Based on the git commits and file structure, the following recent changes have been made:

1. Consolidated CSS for better maintainability and performance
2. Fixed navigation bar color to match page top on mobile devices
3. Optimized WebGL particles to avoid re-rendering on every resize event
4. Fixed jumpy scrolling behavior on mobile devices
5. Reworded and highlighted hero section and description for improved clarity
6. Added lines between particles that are close to each other, creating a connected network effect in the background
7. Reduced particle count from 250 to 150 for better performance while maintaining visual appeal
8. Added a subtle grain texture to the background for improved aesthetics
9. Improved text readability by adding a backdrop blur filter to content containers
10. Fixed text contrast issues when particles appear behind text

### Next Steps

Priority tasks for continued development:

1. **Finalize responsive design** across all device sizes and screen resolutions
2. **Review and optimize WebGL performance** for mobile devices
3. **Complete any missing content sections** or project entries
4. **Implement SEO optimizations** including metadata and social sharing tags
5. **Set up deployment pipeline** for hosting the built site

## Active Decisions and Considerations

### Design Decisions

1. **Particle Background Complexity**: 
   - The current implementation uses 250 particles with physics-based interactions
   - Performance testing is needed for lower-powered devices
   - Consider reducing particle count or complexity based on device capability

2. **Project Presentation**:
   - Projects are displayed as cards with images and descriptions
   - Consider adding filtering/categorization for easier navigation
   - May need more consistent project imagery

3. **Typography and Color Scheme**:
   - Using a clean, modern typography with variable font weights
   - The color scheme centers around blue gradients with white/light backgrounds
   - Consider adding dark mode support in the future

### Technical Considerations

1. **WebGL Compatibility**:
   - Currently requires WebGL2 support
   - Need fallback rendering for browsers without WebGL2
   - Monitoring performance implications on various devices
   - Optimized to prevent re-rendering particles on window resize events

2. **Mobile Optimization**:
   - Fixed issues with jumpy scrolling behavior on mobile
   - Ensured consistent navigation bar color on mobile devices
   - Continuing to optimize responsive layout across device sizes

3. **Data Management**:
   - Project data stored in CSV for ease of updates
   - Consider future needs for more complex content management
   - Evaluate if structured data (JSON-LD) should be added for SEO

4. **Build Performance**:
   - Static site generation for optimal performance
   - Monitoring build times as content grows
   - Consider asset optimization strategies for images
   - CSS consolidation for better performance and maintainability

## Important Patterns and Preferences

### Code Style Preferences

1. **Component Structure**:
   - Self-contained components with scoped CSS
   - Clear separation of concerns between data, presentation, and logic
   - Minimal JavaScript in components

2. **TypeScript Usage**:
   - Strong typing for all data structures and interfaces
   - Clear type definitions for component props
   - Type safety for data processing functions

3. **CSS Approach**:
   - CSS variables for theming and consistency
   - Mobile-first responsive design
   - Modern CSS features (flexbox, grid, etc.)

### Performance Patterns

1. **Rendering Optimization**:
   - Minimize client-side JavaScript where possible
   - Utilize static pre-rendering through Astro
   - Defer non-critical resources loading

2. **Animation Performance**:
   - GPU-accelerated animations with WebGL
   - Respect reduced motion preferences
   - Frame rate monitoring and optimization

3. **Asset Loading**:
   - Optimize image sizes and formats
   - Consider lazy loading for project images
   - Minimize external dependencies

## Learnings and Project Insights

1. **WebGL Implementation**:
   - Particle systems benefit from shader-based rendering for performance
   - Handle device pixel ratio properly for crisp rendering on high-DPI displays
   - Mouse interaction adds significant engagement value to the background

2. **Data Management**:
   - CSV provides a simple, maintainable format for structured project data
   - Transforming data at build time reduces client-side processing needs
   - Path normalization is crucial for consistent asset references

3. **Astro Workflow**:
   - Component-based architecture speeds up development
   - Clear separation between build-time and run-time code improves performance
   - File-based routing simplifies navigation structure
