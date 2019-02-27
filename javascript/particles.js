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
  
beta_points = HTMLWidgets.dataframeToD3(data.beta);
text_points = HTMLWidgets.dataframeToD3(data.text);

const numPoints = beta_points.length;
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
const toBeta  = setupPassedDataLayout(beta_points, width, height);
toRandom(points);
const toText = setupPassedDataLayout(text_points, width, height);

function main(err, regl) {

  // set the order of the layouts and some initial animation state
  const layouts = [toPhyllotaxis, toText, toBeta];
  let currentLayout = 0;
  let startTime = null; // in seconds

  const createDrawPoints = setupPointDrawer(regl);

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