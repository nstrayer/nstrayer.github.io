# Technical Context: Nick Strayer's Personal Website

## Technologies Used

### Core Technologies

1. **Astro (v5.7.12)**
   - Static site generator framework
   - Component-based architecture
   - Zero JavaScript by default (client-side JS only where necessary)
   - File-based routing

2. **TypeScript**
   - Type-safe JavaScript
   - Interface and type definitions for data structures
   - Enhanced developer experience and error prevention

3. **WebGL2**
   - GPU-accelerated graphics rendering
   - GLSL shader programming
   - Canvas-based particle animation

4. **CSV Data**
   - Simple, maintainable format for project data
   - Processed at build time to generate static content

### Supporting Libraries

1. **csv-parse (v5.6.0)**
   - CSV parsing functionality
   - Used for loading and processing project data

2. **gl-matrix (v3.4.3)**
   - Matrix and vector operations for WebGL
   - Simplifies mathematical calculations for 3D graphics

3. **Astro Icon (v1.1.4)** & IconJSON Packages
   - Icon management and usage
   - SVG icon components for UI elements

## Development Setup

### Local Development Environment

```
npm run dev
```

Starts a local development server at `localhost:4321` with:
- Hot module reloading
- Error reporting and debugging
- Live preview of changes

### Build Process

```
npm run build
```

Generates production-ready static site to `./dist/` with:
- Optimized assets
- Minified HTML, CSS, and JavaScript
- Properly bundled dependencies
- Static pre-rendered pages

### Preview

```
npm run preview
```

Runs a local server to preview the production build before deployment.

## Technical Constraints

1. **Browser Compatibility**
   - Modern browsers with WebGL2 support for full experience
   - Fallback handling for browsers without WebGL2 support
   - Responsive design for all screen sizes

2. **Performance Considerations**
   - Optimizing the WebGL animation for smooth performance
   - Balancing particle count with rendering performance
   - Handling high-DPI displays with proper pixel ratio scaling

3. **Accessibility Requirements**
   - Respecting user preferences for reduced motion
   - Proper semantic HTML for screen readers
   - Sufficient color contrast and text sizing

4. **Build-time vs. Runtime**
   - Data processing happens at build time
   - WebGL animation runs in the client browser
   - Static content generation for fast initial load

## Dependencies

From `package.json`:

```json
"dependencies": {
  "@iconify-json/mdi": "^1.2.2",
  "@iconify-json/ri": "^1.2.5",
  "astro": "^5.7.12",
  "astro-icon": "^1.1.4",
  "csv-parse": "^5.6.0",
  "gl-matrix": "^3.4.3"
}
```

## Project Structure

```
/
├── public/              # Static assets
│   ├── projectPics/     # Project images
│   └── ...              # Other images and resources
├── src/
│   ├── components/      # UI components
│   │   ├── background/  # WebGL background implementation
│   │   │   ├── shaders/ # GLSL shader code
│   │   │   └── ...      # Particle system logic
│   │   └── ...          # Section components
│   ├── data/            # Data sources and processing
│   │   ├── constants.ts # Site-wide configuration
│   │   ├── projects.csv # Raw project data
│   │   └── projects.ts  # Data processing logic
│   ├── layouts/         # Page templates
│   ├── pages/           # Route definitions
│   └── types/           # TypeScript type definitions
└── package.json         # Project metadata and dependencies
```

## Tool Usage Patterns

1. **Astro Components**
   - Each `.astro` file contains component template, script, and styles
   - Component styles are scoped by default
   - Props are passed through the frontmatter section

   ```astro
   ---
   // Script/props (runs at build time)
   import { SITE_CONFIG } from '../data/constants';
   ---

   <!-- Template (HTML with component interpolation) -->
   <h1>{SITE_CONFIG.name}</h1>

   <style>
     /* Scoped CSS */
     h1 {
       color: var(--primary);
     }
   </style>
   ```

2. **WebGL Implementation**
   - Canvas initialization in component
   - Particle system implementation in TypeScript classes
   - Multiple shader programs for different visual elements (particles and lines)
   - Dynamic rendering of connections between nearby particles
   - SVG-based grain texture overlay for enhanced aesthetics
   - Backdrop filters for improved text readability
   - Animation loop with requestAnimationFrame

3. **Data Processing**
   - CSV loading and parsing at build time
   - Data transformation and normalization
   - Type-safe data structures with interfaces

4. **Responsive Design**
   - Media queries for different viewport sizes
   - Pixel ratio handling for high-DPI displays
   - Canvas resizing for full-window background