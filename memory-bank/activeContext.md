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

Post lists now use compact entries: a subtly underlined title link, description,
then a small date/tag line. The separate “Read post” row is removed, and homepage
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

Project previews now use compact thumbnails (at most 288 × 192 CSS pixels on
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
