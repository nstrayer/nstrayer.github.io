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
    
    // Default to blue with slight variation based on position
    vec2 normalizedPos = v_position / u_resolution;
    vec3 baseColor = vec3(0.2, 0.4, 0.8) + vec3(0.05 * sin(normalizedPos.x * 3.14), 0.05 * cos(normalizedPos.y * 3.14), 0.0);
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
    
    // Smooth color transition based on proximity
    if(minDist < checkDist) {
        float t = smoothstep(checkDist, checkDist * 0.3, minDist); // More gradual transition
        vec3 targetColor = vec3(0.2, 0.9, 0.3);
        color = mix(baseColor, targetColor, t * 0.8);
        
        // Subtle glow effect for very close particles
        if(minDist < checkDist * 0.2) {  // Adjusted threshold for glow
            float glow = smoothstep(checkDist * 0.2, 0.0, minDist);
            color += vec3(0.1, 0.1, 0.0) * glow;
            alpha *= 1.0 + (glow * 0.2);
        }
    }
    
    // Add mouse proximity effect with more dramatic changes
    if(v_mouseProximity > 0.0) {
        // Add stronger white glow based on mouse proximity
        color = mix(color, vec3(1.0, 0.8, 0.4), v_mouseProximity * 0.7);
        // More dramatic brightness increase near mouse
        alpha *= 1.0 + (v_mouseProximity * 0.8);
        
        // Add pulsing effect near mouse
        float pulse = sin(normalizedPos.x * 10.0 + normalizedPos.y * 10.0) * 0.5 + 0.5;
        color += vec3(0.2, 0.1, 0.0) * v_mouseProximity * pulse;
    }
    
    fragColor = vec4(color, alpha);
} 