# Active Context: Nick Strayer's Personal Website

## Current Work Focus

The project is currently in a redevelopment phase, with a focus on modernizing the personal website using Astro. The site structure is established with core sections implemented (Hero, About, Projects, Skills, Contact), and the WebGL particle background continues to evolve with visual enhancements.

### Recent Changes

Based on the git commits and file structure, the following recent changes have been made:

1. Added lines between particles that are close to each other, creating a connected network effect in the background
2. Reduced particle count from 250 to 150 for better performance while maintaining visual appeal
3. Added a subtle grain texture to the background for improved aesthetics
4. Improved text readability by adding a backdrop blur filter to content containers
5. Fixed text contrast issues when particles appear behind text

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

2. **Data Management**:
   - Project data stored in CSV for ease of updates
   - Consider future needs for more complex content management
   - Evaluate if structured data (JSON-LD) should be added for SEO

3. **Build Performance**:
   - Static site generation for optimal performance
   - Monitoring build times as content grows
   - Consider asset optimization strategies for images

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