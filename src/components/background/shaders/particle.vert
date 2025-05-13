#version 300 es
precision highp float;
precision highp int;

// Position and velocity buffers
in vec2 a_position;
in vec2 a_velocity;
in float a_radius;
in float a_opacity;

// Uniforms for transformation and time
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_pixelRatio;
uniform sampler2D u_positions;
uniform int u_particleCount;

// Output to fragment shader
out float v_opacity;
out vec2 v_position;
out float v_particleIndex;
out float v_mouseProximity;

void main() {
    // Calculate base position
    vec2 position = a_position;
    vec2 velocity = a_velocity;
    
    // Get current particle position from texture
    vec2 myPos = texelFetch(u_positions, ivec2(gl_VertexID, 0), 0).xy;
    
    // Calculate mouse influence with much larger radius
    float mouseDistance = distance(myPos, u_mouse);
    float mouseInfluence = smoothstep(300.0, 0.0, mouseDistance);
    float mouseSpeedMultiplier = 1.0 + (mouseInfluence * 15.0); // Increased from 10.0 to 15.0
    
    // Add directional influence towards mouse
    if(mouseInfluence > 0.0) {
        vec2 toMouse = normalize(u_mouse - myPos);
        velocity = mix(velocity, toMouse * length(velocity) * 2.0, mouseInfluence * 0.3);
    }
    
    // Check for nearby particles to adjust velocity
    float particleSpeedMultiplier = 1.0;
    float checkDist = 40.0;
    
    // Check all other particles
    for(int i = 0; i < u_particleCount; i++) {
        if(i == gl_VertexID) continue;
        
        vec2 otherPos = texelFetch(u_positions, ivec2(i, 0), 0).xy;
        float d = distance(myPos, otherPos);
        
        if(d < checkDist) {
            float influence = 1.0 - (d / checkDist);
            particleSpeedMultiplier += influence * 0.5;
        }
    }
    
    // Combine mouse and particle proximity effects
    float finalSpeedMultiplier = max(mouseSpeedMultiplier, particleSpeedMultiplier);
    
    // Apply speed multiplier
    position += velocity * finalSpeedMultiplier;
    
    // Pass values to fragment shader
    v_particleIndex = float(gl_VertexID);
    v_position = position;
    v_mouseProximity = mouseInfluence;
    
    // Convert to clip space (-1 to 1)
    vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
    // Set point size with more subtle size increase near mouse
    gl_PointSize = a_radius * u_pixelRatio * (1.0 + mouseInfluence * 1.0); // Reduced from 4.0 to 1.0
    
    // Pass opacity to fragment shader
    v_opacity = a_opacity;
} 