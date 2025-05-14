import vertexShaderSource from './shaders/particle.vert';
import fragmentShaderSource from './shaders/particle.frag';
import lineVertexShaderSource from './shaders/line.vert';
import lineFragmentShaderSource from './shaders/line.frag';

interface Particle {
    position: Float32Array;
    velocity: Float32Array;
    radius: number;
    opacity: number;
}

export class WebGLParticleSystem {
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram;
    // Shader program for drawing lines between particles
    private lineProgram: WebGLProgram; 
    private particles: Particle[];
    private positionBuffer: WebGLBuffer;
    // Buffer to hold vertex data for the lines
    private lineBuffer: WebGLBuffer; 
    private velocityBuffer: WebGLBuffer;
    private radiusBuffer: WebGLBuffer;
    private opacityBuffer: WebGLBuffer;
    private startTime: number;
    private animationFrame: number;
    private mousePosition: Float32Array;
    private pixelRatio: number;
    private positionTexture: WebGLTexture;
    // Distance threshold for drawing lines between particles, scaled by pixel ratio for consistency across displays
    private readonly connectionThreshold: number; 

    constructor(canvas: HTMLCanvasElement, particleCount: number = 150) {  
        // Initialize WebGL context
        const gl = canvas.getContext('webgl2');
        if (!gl) throw new Error('WebGL2 not supported');
        this.gl = gl;

        // Enable blending for transparency
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        // Create shader program for particles
        this.program = this.createShaderProgram(vertexShaderSource, fragmentShaderSource);
        
        // Create shader program for drawing lines, using the new line shaders
        this.lineProgram = this.createShaderProgram(lineVertexShaderSource, lineFragmentShaderSource);
        
        // Initialize time and mouse tracking
        this.startTime = Date.now();
        this.mousePosition = new Float32Array([0, 0]);
        this.pixelRatio = window.devicePixelRatio || 1;
        // Define the threshold for connecting particles, considering device pixel ratio
        this.connectionThreshold = 50 * this.pixelRatio; 

        // Set initial canvas size
        this.resize(canvas);
        
        // Create particles with correct dimensions
        this.particles = this.createParticles(particleCount, window.innerWidth, window.innerHeight);
        
        // Create position texture
        const positionData = this.getParticleData('position');
        this.positionTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.positionTexture);
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RG32F,
            particleCount,
            1,
            0,
            this.gl.RG,
            this.gl.FLOAT,
            positionData
        );
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        
        // Create and initialize buffers
        this.positionBuffer = this.createBuffer(positionData);
        this.velocityBuffer = this.createBuffer(this.getParticleData('velocity'));
        this.radiusBuffer = this.createBuffer(this.getParticleData('radius'));
        this.opacityBuffer = this.createBuffer(this.getParticleData('opacity'));
        
        // Initialize an empty buffer for line vertices; it will be populated dynamically
        this.lineBuffer = this.createBuffer(new Float32Array([]));

        // Set up document-level mouse tracking
        document.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            
            // Check if mouse is within window bounds
            if (x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight) {
                // Scale mouse position by pixel ratio
                this.mousePosition[0] = x * this.pixelRatio;
                this.mousePosition[1] = y * this.pixelRatio;
            }
        });

        // Handle mouse leaving the window
        document.addEventListener('mouseleave', () => {
            this.mousePosition[0] = -1000;
            this.mousePosition[1] = -1000;
        });

        // Handle window resize
        let resizeTimeout: number | null = null;
        window.addEventListener('resize', () => {
            // Clear previous timeout to debounce resize events
            if (resizeTimeout) {
                window.clearTimeout(resizeTimeout);
            }
            
            // Debounce resize to avoid frequent redraws during scroll on mobile
            resizeTimeout = window.setTimeout(() => {
                // Only update canvas dimensions without recreating particles
                this.resize(canvas);
            }, 300);
        });
    }

    private createShaderProgram(vertexSource: string, fragmentSource: string): WebGLProgram {
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);
        
        const program = this.gl.createProgram();
        if (!program) throw new Error('Failed to create shader program');
        
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            throw new Error('Failed to link shader program: ' + this.gl.getProgramInfoLog(program));
        }
        
        return program;
    }

    private createShader(type: number, source: string): WebGLShader {
        const shader = this.gl.createShader(type);
        if (!shader) throw new Error('Failed to create shader');
        
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw new Error('Failed to compile shader: ' + this.gl.getShaderInfoLog(shader));
        }
        
        return shader;
    }

    private createParticles(count: number, width: number, height: number): Particle[] {
        // Account for DPI in initial positions
        width *= this.pixelRatio;
        height *= this.pixelRatio;
        
        return Array.from({ length: count }, () => ({
            position: new Float32Array([
                Math.random() * width,
                Math.random() * height
            ]),
            velocity: new Float32Array([
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5
            ]),
            radius: Math.random() * 4 + 3,
            opacity: Math.random() * 0.3 + 0.5
        }));
    }

    private createBuffer(data: Float32Array): WebGLBuffer {
        const buffer = this.gl.createBuffer();
        if (!buffer) throw new Error('Failed to create buffer');
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
        
        return buffer;
    }

    private getParticleData(attribute: keyof Particle): Float32Array {
        const data = this.particles.map(p => {
            const value = p[attribute];
            return value instanceof Float32Array ? Array.from(value) : [value];
        }).flat();
        return new Float32Array(data);
    }

    private resize(canvas: HTMLCanvasElement) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Update canvas size with pixel ratio
        canvas.width = width * this.pixelRatio;
        canvas.height = height * this.pixelRatio;
        
        // Update CSS size
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        
        // Update WebGL viewport
        this.gl.viewport(0, 0, canvas.width, canvas.height);
        
        // Adapt particle positions to new dimensions to prevent them all from moving off-screen
        // This keeps existing particles visible while maintaining their relative positions
        for (let i = 0; i < this.particles.length; i++) {
            // Make sure particles stay within the new canvas bounds
            this.particles[i].position[0] = Math.min(this.particles[i].position[0], canvas.width);
            this.particles[i].position[1] = Math.min(this.particles[i].position[1], canvas.height);
        }
    }

    start() {
        const draw = () => {
            // Clear canvas
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            
            // Use shader program
            this.gl.useProgram(this.program);
            
            // Update particle positions based on velocity
            const currentTime = Date.now();
            const deltaTime = (currentTime - this.startTime) * 0.001; // Convert to seconds
            
            // Update positions
            const positionData = new Float32Array(this.particles.length * 2);
            for(let i = 0; i < this.particles.length; i++) {
                const particle = this.particles[i];
                
                // Update position with scaled velocity
                particle.position[0] += particle.velocity[0] * 1.5;
                particle.position[1] += particle.velocity[1] * 1.5;
                
                // Bounce off edges with some dampening
                if (particle.position[0] < 0 || particle.position[0] > this.gl.canvas.width) {
                    particle.velocity[0] *= -0.9;
                    particle.position[0] = Math.max(0, Math.min(particle.position[0], this.gl.canvas.width));
                }
                if (particle.position[1] < 0 || particle.position[1] > this.gl.canvas.height) {
                    particle.velocity[1] *= -0.9;
                    particle.position[1] = Math.max(0, Math.min(particle.position[1], this.gl.canvas.height));
                }
                
                // Store updated position in the array
                positionData[i * 2] = particle.position[0];
                positionData[i * 2 + 1] = particle.position[1];
            }
            
            // Update position buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, positionData, this.gl.DYNAMIC_DRAW);
            
            // --- CPU-side logic for line connections ---
            const lineVertices: number[] = [];
            // Iterate through all unique pairs of particles to check for proximity.
            // We use positionData which contains the most up-to-date positions.
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const x1 = positionData[i * 2];
                    const y1 = positionData[i * 2 + 1];
                    const x2 = positionData[j * 2];
                    const y2 = positionData[j * 2 + 1];

                    const dx = x1 - x2;
                    const dy = y1 - y2;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // If particles are close enough, add their positions to the lineVertices array.
                    // Each line requires two points (start and end).
                    if (distance < this.connectionThreshold) {
                        lineVertices.push(x1, y1, x2, y2);
                    }
                }
            }

            // Update the lineBuffer with the new set of lines to be drawn.
            // This buffer will be used by the line drawing shader program.
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lineBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(lineVertices), this.gl.DYNAMIC_DRAW);

            // --- End of CPU-side logic for line connections ---
            
            // Update position texture with explicit parameters
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.positionTexture);
            
            // Set texture parameters
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            
            // Update texture data
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RG32F,
                this.particles.length,
                1,
                0,
                this.gl.RG,
                this.gl.FLOAT,
                positionData
            );
            
            // Set uniforms
            const uniforms = {
                u_time: deltaTime,
                u_resolution: [this.gl.canvas.width, this.gl.canvas.height],
                u_mouse: this.mousePosition,
                u_pixelRatio: this.pixelRatio,
                u_particleCount: this.particles.length
            };
            
            Object.entries(uniforms).forEach(([name, value]) => {
                const location = this.gl.getUniformLocation(this.program, name);
                if (location) {
                    if (value instanceof Float32Array || Array.isArray(value)) {
                        this.gl.uniform2fv(location, value);
                    } else if (typeof value === 'number') {
                        if (name === 'u_particleCount') {
                            this.gl.uniform1i(location, value);
                        } else {
                            this.gl.uniform1f(location, value);
                        }
                    }
                }
            });
            
            // Set the texture uniform
            const texLocation = this.gl.getUniformLocation(this.program, 'u_positions');
            if (texLocation) {
                this.gl.uniform1i(texLocation, 0);
            }
            
            // Bind attributes
            const attributes = [
                { name: 'a_position', buffer: this.positionBuffer, size: 2 },
                { name: 'a_velocity', buffer: this.velocityBuffer, size: 2 },
                { name: 'a_radius', buffer: this.radiusBuffer, size: 1 },
                { name: 'a_opacity', buffer: this.opacityBuffer, size: 1 }
            ];
            
            attributes.forEach(({ name, buffer, size }) => {
                const location = this.gl.getAttribLocation(this.program, name);
                this.gl.enableVertexAttribArray(location);
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
                this.gl.vertexAttribPointer(location, size, this.gl.FLOAT, false, 0, 0);
            });
            
            // Draw particles
            this.gl.drawArrays(this.gl.POINTS, 0, this.particles.length);
            
            // --- Draw lines between connected particles ---
            if (lineVertices.length > 0) {
                // Switch to the shader program specifically for drawing lines.
                this.gl.useProgram(this.lineProgram);

                // Set the resolution uniform for the line shader, necessary for coordinate conversion.
                const resolutionLocation = this.gl.getUniformLocation(this.lineProgram, 'u_resolution');
                this.gl.uniform2fv(resolutionLocation, [this.gl.canvas.width, this.gl.canvas.height]);

                // Set the color uniform for the lines (e.g., a semi-transparent white).
                const lineColorLocation = this.gl.getUniformLocation(this.lineProgram, 'u_lineColor');
                this.gl.uniform4fv(lineColorLocation, [0.3, 0.3, 1.0, 0.5]); // Light blue-ish, 25% opacity

                // Enable the vertex attribute for line positions.
                const linePositionLocation = this.gl.getAttribLocation(this.lineProgram, 'a_linePosition');
                this.gl.enableVertexAttribArray(linePositionLocation);
                
                // Bind the buffer containing the line vertex data.
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lineBuffer);
                // Point the attribute to the currently bound lineBuffer.
                this.gl.vertexAttribPointer(linePositionLocation, 2, this.gl.FLOAT, false, 0, 0);

                // Draw the lines. Each line consists of 2 vertices.
                this.gl.drawArrays(this.gl.LINES, 0, lineVertices.length / 2);
            }

            // Request next frame
            this.animationFrame = requestAnimationFrame(draw);
        };
        
        draw();
    }

    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}