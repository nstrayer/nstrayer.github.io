#version 300 es
precision highp float;

// Input vertex position (x, y) for each endpoint of a line
in vec2 a_linePosition;

// Uniform for converting to clip space
uniform vec2 u_resolution;

void main() {
    // Convert pixel coordinates to clip space (-1 to 1)
    vec2 clipSpace = (a_linePosition / u_resolution) * 2.0 - 1.0;
    // WebGL flips the Y axis in clip space
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}