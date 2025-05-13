# System Patterns: Nick Strayer's Personal Website

## System Architecture

The website follows a component-based architecture using Astro's framework, with a clear separation of concerns between UI components, data, and interactive elements.

### Key Architectural Components

1. **Page Structure**
   - `Layout.astro`: Base template providing consistent structure across the site
   - `index.astro`: Main entry point assembling all components in sequence
   - Section components (Hero, About, Projects, Skills, Contact): Modular content sections

2. **WebGL Background System**
   - `Background.astro`: Component wrapper for the particle system
   - `WebGLParticleSystem.ts`: Core implementation handling particle animation
   - `Particle.ts`: Basic particle entity model
   - GLSL Shaders:
     - `particle.vert` and `particle.frag` for GPU-accelerated particle rendering
     - `line.vert` and `line.frag` for rendering connections between particles

3. **Data Management**
   - CSV data store for projects
   - TypeScript data processing and transformation
   - Constants file for site-wide configuration

## Design Patterns

### Component Pattern
- Each UI section is encapsulated in its own Astro component
- Components include both markup and scoped CSS
- Components follow a declarative pattern where possible

### Factory Pattern (Projects)
- Projects are loaded from CSV and transformed into structured objects
- The `projects.ts` module acts as a factory, processing raw data into usable entities

### Adapter Pattern (Image Paths)
- The `fixImagePath` function serves as an adapter, converting between storage paths and public URLs

### Observer Pattern (WebGL Background)
- The particle system observes both window events (resize) and user interaction (mouse movement)
- Particles respond dynamically to environmental changes

### Strategy Pattern (Motion Preferences)
- Different animation strategies based on user preferences (full animation vs. reduced motion)
- Conditional execution based on device capability (WebGL2 support)

## Component Relationships

```
Layout.astro
└── index.astro
    ├── Background.astro
    │   └── WebGLParticleSystem.ts
    │       ├── Particle.ts (conceptual)
    │       └── Shaders (particle.vert, particle.frag)
    ├── Hero.astro
    ├── About.astro
    ├── Projects.astro
    │   ├── ProjectCard.astro (for each project)
    │   └── projects.ts (data)
    ├── Skills.astro
    └── Contact.astro
```

## Critical Implementation Paths

### Rendering Pipeline
1. Astro builds static HTML from component templates
2. Client-side JavaScript initializes the WebGL background
3. Core content is immediately visible while interactive elements initialize

### Data Flow
1. Projects data is loaded from CSV during build time
2. Data is processed and transformed into structured objects
3. Astro components consume the data to render UI elements

### WebGL Particle System
1. Canvas element is created and WebGL2 context is initialized
2. Multiple shader programs are compiled and linked (for particles and connecting lines)
3. Particle data is generated and loaded into GPU buffers
4. Animation loop updates particle positions based on velocity and interactions
5. Dynamic line connections are calculated between nearby particles
6. Particles respond to mouse movements and proximity to other particles
7. Line rendering creates a network effect between related particles

### Responsive Behavior
1. Media queries adjust layout and sizing based on viewport dimensions
2. WebGL canvas resizes to match the viewport with proper pixel ratio handling
3. Touch events are translated to mouse events for mobile interaction
4. Reduced motion preferences disable animations when requested by user

## Key Technical Decisions

1. **Astro Framework**
   - Static site generation for fast initial loading
   - Component-based architecture for maintainability
   - Minimal client-side JavaScript for performance

2. **WebGL for Animation**
   - GPU-accelerated rendering for smooth particle animation
   - Shader-based effects for visual richness
   - Fallback handling for unsupported browsers

3. **CSV for Project Data**
   - Simple, maintainable format for project information
   - Clear separation of content from presentation
   - Easy to update without changing application code

4. **TypeScript for Type Safety**
   - Strong typing for component props and data structures
   - Enhanced developer experience and error prevention
   - Clear interface definitions for data models