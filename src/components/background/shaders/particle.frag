#version 300 es
precision highp float;
precision highp int;

// Input from vertex shader
in float v_opacity;
in vec2 v_position;
in float v_particleIndex;
in float v_mouseProximity;

// Uniforms
uniform vec2 u_resolution;
uniform sampler2D u_positions;
uniform int u_particleCount;

// Output color
out vec4 fragColor;

void main() {
    // Calculate distance from center of point
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    // Create soft circle
    float alpha = smoothstep(0.5, 0.35, dist) * v_opacity * 1.5;
    
    // Monochromatic blue with subtle variation based on position
    vec2 normalizedPos = v_position / u_resolution;
    // Deep navy blue base (approximately oklch(0.30 0.08 240) in RGB)
    vec3 baseColor = vec3(0.15, 0.25, 0.45) + vec3(0.02 * sin(normalizedPos.x * 3.14), 0.02 * cos(normalizedPos.y * 3.14), 0.01);
    vec3 color = baseColor;
    
    // Get current particle position from texture using its index
    vec2 myPos = texelFetch(u_positions, ivec2(int(v_particleIndex), 0), 0).xy;
    
    // Check for nearby particles with increased distance
    float minDist = 1000000.0;
    float checkDist = 100.0;  // Increased from 30.0 to 100.0
    float proximitySum = 0.0;
    
    // Compare with all other particles
    for(int i = 0; i < u_particleCount; i++) {
        if(i == int(v_particleIndex)) continue;
        
        vec2 otherPos = texelFetch(u_positions, ivec2(i, 0), 0).xy;
        float d = distance(myPos, otherPos);
        
        if(d < checkDist) {
            float influence = smoothstep(checkDist, 0.0, d);
            proximitySum += influence;
            minDist = min(minDist, d);
        }
    }
    
    // Smooth color transition based on proximity - lighter blue for connections
    if(minDist < checkDist) {
        float t = smoothstep(checkDist, checkDist * 0.3, minDist); // More gradual transition
        // Lighter blue for connections (approximately oklch(0.50 0.08 240))
        vec3 targetColor = vec3(0.25, 0.35, 0.55);
        color = mix(baseColor, targetColor, t * 0.6);
        
        // Subtle glow effect for very close particles
        if(minDist < checkDist * 0.2) {  // Adjusted threshold for glow
            float glow = smoothstep(checkDist * 0.2, 0.0, minDist);
            color += vec3(0.05, 0.05, 0.1) * glow;
            alpha *= 1.0 + (glow * 0.2);
        }
    }
    
    // Add mouse proximity effect - lighter blue glow
    if(v_mouseProximity > 0.0) {
        // Add lighter blue glow based on mouse proximity (approximately oklch(0.60 0.10 240))
        color = mix(color, vec3(0.35, 0.45, 0.65), v_mouseProximity * 0.6);
        // More dramatic brightness increase near mouse
        alpha *= 1.0 + (v_mouseProximity * 0.8);
        
        // Add subtle pulsing effect near mouse
        float pulse = sin(normalizedPos.x * 10.0 + normalizedPos.y * 10.0) * 0.5 + 0.5;
        color += vec3(0.05, 0.05, 0.1) * v_mouseProximity * pulse;
    }
    
    fragColor = vec4(color, alpha);
} 