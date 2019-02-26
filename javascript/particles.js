// !preview r2d3 data = list(text = image_tidy,beta = beta_data), dependencies = c('javascript/regl.min.js', "javascript/helpers.js"), container = 'div'
const canvas = div
  .style('position', 'relative')
  .html('')
  .append('canvas')
  .attr('height', height)
  .attr('width', width);

const clickMeText = div.append('div')
  .html(`<span> Click Me! </span>`)
  .style('padding', '15px')
  .style('top', '0px')
  .style('right', '0px')
  .style('pointer-events', 'none')
  .style('font-family', 'PT Sans')
  .style('position', 'absolute')
  .style('display', 'none');
  
data.beta = HTMLWidgets.dataframeToD3(data.beta);
data.text = HTMLWidgets.dataframeToD3(data.text);

const numPoints = data.beta.length;
const pointWidth = 2;
const pointMargin = 1;
// duration of the animation ignoring delays
const duration = 2500;
// multiply this value by the index of a point to get its delay
const delayByIndex = 500 / numPoints;
// include max delay in here
const maxDuration = duration + delayByIndex * numPoints;

// Lets the interaction know if we're currently animating
let animating = true;
let firstRunThrough = true;

// create initial set of points
const points = createPoints(numPoints, pointWidth, width, height);

// create helpers that will layout the points in different ways (see helpers.js)
// Each to* function will give the each point an x, y, and color property.
const toPhyllotaxis = points => phyllotaxisLayout(points, pointWidth + pointMargin, width / 2, height / 2);
const toRandom      = points => randomLayout(points, pointWidth, width, height);
const toBeta  = setupPassedDataLayout(data.beta, width, height);
toRandom(points);
const toText = setupPassedDataLayout(data.text, width, height);

function main(err, regl) {

  // set the order of the layouts and some initial animation state
  const layouts = [toPhyllotaxis, toText, toBeta];
  let currentLayout = 0;
  let startTime = null; // in seconds

  // function to compile a draw points regl func
  function createDrawPoints(points) {
    const drawPoints = regl({
      frag: `
			// set the precision of floating point numbers
		  precision highp float;

		  // this value is populated by the vertex shader
			varying vec3 fragColor;

			void main() {
				// gl_FragColor is a special variable that holds the color of a pixel
				gl_FragColor = vec4(fragColor, 1);
			}
			`,

      vert: `
			// per vertex attributes
			attribute vec2 positionStart;
			attribute vec2 positionEnd;
			attribute float index;
			attribute vec3 colorStart;
			attribute vec3 color;

			// variables to send to the fragment shader
			varying vec3 fragColor;

			// values that are the same for all vertices
			uniform float pointWidth;
			uniform float stageWidth;
			uniform float stageHeight;
			uniform float elapsed;
			uniform float duration;
			uniform float delayByIndex;

			// helper function to transform from pixel space to normalized device coordinates (NDC)
			// in NDC (0,0) is the middle, (-1, 1) is the top left and (1, -1) is the bottom right.
			vec2 normalizeCoords(vec2 position) {
				// read in the positions into x and y vars
	      float x = position[0];
	      float y = position[1];

				return vec2(
		      2.0 * ((x / stageWidth) - 0.5),
		      // invert y since we think [0,0] is bottom left in pixel space
		      -(2.0 * ((y / stageHeight) - 0.5)));
			}

			// helper function to handle cubic easing (copied from d3 for consistency)
			// note there are pre-made easing functions available via glslify.
			float easeCubicInOut(float t) {
				t *= 2.0;
        t = (t <= 1.0 ? t * t * t : (t -= 2.0) * t * t + 2.0) / 2.0;

        if (t > 1.0) {
          t = 1.0;
        }

        return t;
			}

			void main() {
				// update the size of a point based on the prop pointWidth
				gl_PointSize = pointWidth;

				float delay = delayByIndex * index;

				// number between 0 and 1 indicating how far through the animation this
				// vertex is.
	      float t;

	      // drawing without animation, so show end state immediately
	      if (duration == 0.0) {
	        t = 1.0;

	      // still delaying before animating
	      } else if (elapsed < delay) {
	        t = 0.0;

	      // otherwise we are animating, so use cubic easing
	      } else {
	        t = easeCubicInOut((elapsed - delay) / duration);
	      }

				// interpolate position
	      vec2 position = mix(positionStart, positionEnd, t);

	      // interpolate and send color to the fragment shader
	      fragColor = mix(colorStart, color, t);

				// scale to normalized device coordinates
				// gl_Position is a special variable that holds the position of a vertex
	      gl_Position = vec4(normalizeCoords(position), 0.0, 1.0);
			}
			`,

      attributes: {
        positionStart: points.map(d => [d.sx, d.sy]),
        positionEnd: points.map(d => [d.x, d.y]),
        colorStart: points.map(d => d.colorStart),
        color: points.map(d => d.color),
        index: d3.range(points.length),
      },

      uniforms: {
        pointWidth: regl.prop('pointWidth'),
        stageWidth: regl.prop('stageWidth'),
        stageHeight: regl.prop('stageHeight'),
        delayByIndex: regl.prop('delayByIndex'),
        duration: regl.prop('duration'),

        // time in milliseconds since the prop startTime (i.e. time elapsed)
        elapsed: ({ time }, { startTime = 0 }) => (time - startTime) * 1000,
      },

      count: points.length,
      primitive: 'points',
    });

    return drawPoints;
  }

  canvas.on('click', () => {
    if(!animating){
       nextAnimation();
    }
  });
  
  function nextAnimation(){
    // Update to the next layout
    currentLayout = (currentLayout + 1) % layouts.length;
    // Reset start time
    startTime = null;
    // Kickoff the new animation
    animate(layouts[currentLayout], points);
    animating = true;
  }
  
  // start animation loop (note: time is in seconds)
  function animate(layout, points) {
    
    // Swap positions as neccesary 
    setupNewTransition(points, layout);
    // create the regl function with the new start and end points
    const drawPoints = createDrawPoints(points);

    const frameLoop = regl.frame(({ time }) => {
      if (startTime === null) {
        startTime = time;
      }

      // clear the buffer
      regl.clear({
        color: [1, 1, 1, 1],
        depth: 1,
      });

      // draw the points using our created regl func
      drawPoints({
        pointWidth,
        stageWidth: width,
        stageHeight: height,
        duration,
        delayByIndex,
        startTime,
      });

      if (time - startTime > maxDuration / 1000) {
        // Stop current animation loop
        frameLoop.cancel();
        
        if(firstRunThrough){
          nextAnimation()
          firstRunThrough = currentLayout < layouts.length - 1;
          if(!firstRunThrough){
            clickMeText.style('display', 'block')
          }
        }

        
        animating = false;
      }
    });
  }
  
  // Kick off animation
  animate(layouts[currentLayout], points);
}

// initialize regl
createREGL({
  canvas: canvas.node(),
  // callback when regl is initialized
  onDone: main,
});