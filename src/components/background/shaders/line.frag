#version 300 es
precision highp float;

// Uniform for line color (e.g., RGBA)
uniform vec4 u_lineColor;

// Output color for the fragment
out vec4 fragColor;

void main() {
    fragColor = u_lineColor;
}