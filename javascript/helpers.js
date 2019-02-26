/**
 * Given a set of points, lay them out in a phyllotaxis layout.
 * Mutates the `points` passed in by updating the x and y values.
 *
 * @param {Object[]} points The array of points to update. Will get `x` and `y` set.
 * @param {Number} pointWidth The size in pixels of the point's width. Should also include margin.
 * @param {Number} xOffset The x offset to apply to all points
 * @param {Number} yOffset The y offset to apply to all points
 *
 * @return {Object[]} points with modified x and y
 */
function phyllotaxisLayout(points, pointWidth, xOffset = 0, yOffset = 0, iOffset = 0) {
  // theta determines the spiral of the layout
  const theta = Math.PI * (3 - Math.sqrt(5));

  const pointRadius = pointWidth / 2;

  points.forEach((point, i) => {
    const index = (i + iOffset) % points.length;
    const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta);
    const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta);

    point.x = xOffset + phylloX - pointRadius;
    point.y = yOffset + phylloY - pointRadius;
  });

  return points;
}

/**
 * Given a set of points, lay them out in a grid.
 * Mutates the `points` passed in by updating the x and y values.
 *
 * @param {Object[]} points The array of points to update. Will get `x` and `y` set.
 * @param {Number} pointWidth The size in pixels of the point's width. Should also include margin.
 * @param {Number} gridWidth The width of the grid of points
 *
 * @return {Object[]} points with modified x and y
 */
function gridLayout(points, pointWidth, gridWidth) {
  const pointHeight = pointWidth;
  const pointsPerRow = Math.floor(gridWidth / pointWidth);
  const numRows = points.length / pointsPerRow;

  points.forEach((point, i) => {
    point.x = pointWidth * (i % pointsPerRow);
    point.y = pointHeight * Math.floor(i / pointsPerRow);
  });

  return points;
}

/**
 * Given a set of points, lay them out randomly.
 * Mutates the `points` passed in by updating the x and y values.
 *
 * @param {Object[]} points The array of points to update. Will get `x` and `y` set.
 * @param {Number} pointWidth The size in pixels of the point's width. Should also include margin.
 * @param {Number} width The width of the area to place them in
 * @param {Number} height The height of the area to place them in
 *
 * @return {Object[]} points with modified x and y
 */
function randomLayout(points, pointWidth, width, height) {
  const rnorm = d3.randomNormal(0,0.15);
    
  points.forEach(d => {    
    d.x = rnorm() * width + width/2;
    d.y = rnorm() * height + height/2;
  });

  return points;
}

/**
 * Given a set of points, lay them out in a sine wave.
 * Mutates the `points` passed in by updating the x and y values.
 *
 * @param {Object[]} points The array of points to update. Will get `x` and `y` set.
 * @param {Number} pointWidth The size in pixels of the point's width. Should also include margin.
 * @param {Number} width The width of the area to place them in
 * @param {Number} height The height of the area to place them in
 *
 * @return {Object[]} points with modified x and y
 */
function sineLayout(points, pointWidth, width, height) {
  const amplitude = (0.1 + Math.random()) * (height / 2);
  const yOffset = height / 2;
  const periods = 3;
  const yScale = d3.scaleLinear()
    .domain([0, points.length - 1])
    .range([0, periods * 2 * Math.PI]);

  points.forEach((point, i) => {
    point.x = (i / points.length) * (width - pointWidth);
    point.y = amplitude * Math.sin(yScale(i)) + yOffset;
  });

  return points;
}

/**
 * Given a set of points, lay them out in a spiral.
 * Mutates the `points` passed in by updating the x and y values.
 *
 * @param {Object[]} points The array of points to update. Will get `x` and `y` set.
 * @param {Number} pointWidth The size in pixels of the point's width. Should also include margin.
 * @param {Number} width The width of the area to place them in
 * @param {Number} height The height of the area to place them in
 *
 * @return {Object[]} points with modified x and y
 */
function spiralLayout(points, pointWidth, width, height) {
  const amplitude = 0.3 * (height / 2);
  const xOffset = width / 2;
  const yOffset = height / 2;
  const periods = 20;

  const rScale = d3.scaleLinear()
    .domain([0, points.length -1])
    .range([0, Math.min(width / 2, height / 2) - pointWidth]);

  const thetaScale = d3.scaleLinear()
    .domain([0, points.length - 1])
    .range([0, periods * 2 * Math.PI]);

  points.forEach((point, i) => {
    point.x = rScale(i) * Math.cos(thetaScale(i)) + xOffset;
    point.y = rScale(i) * Math.sin(thetaScale(i)) + yOffset;
  });

  return points;
}

function colorToVec3(color){
  const rgb = d3.rgb(color);
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
}

// wrap d3 color scales so they produce vec3s with values 0-1
function wrapColorScale(scale) {
  return t => {
    const rgb = d3.rgb(scale(1 - t));
    return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  };
}

// Simple function to get the unique values in an array
function unique(data, key){ 
  return d3.set(data.map(d => d[key])).values();
};

function initializePoints(data, width, height) {
  
  const unique_classes = unique(data, 'class');
  const color_index = unique_classes.reduce((class_obj, cur_class, i) => {
    class_obj[cur_class] = i;
    return class_obj;
  }, {});
  
  const colorScale = d3.scaleSequential(d3.interpolateViridis)
    .domain([0,unique_classes.length]);

  data.forEach((d,i) => {
    d.x = d.x*width;
    d.y = d.y*height;
    d.id = i;
    d.color = colorScale(color_index[d['class']]);
    d.colorEnd =  colorToVec3(d.color);
  })

  return data
}

/**
 * Generate an object array of `numPoints` length with unique IDs
 * and assigned colors
 */
function createPoints(numPoints, pointWidth, width, height) {
  const colorScale = d3.scaleSequential(d3.interpolateViridis)
    .domain([numPoints - 1, 0]);

  const points = d3.range(numPoints).map(id => ({
    id,
    color: colorScale(id),
    // points start in the middle of the screen
    x: width / 2,
    y: height / 2,
    colorEnd: [0, 0, 0],
  }));
  return points
}

function setupNewTransition(points, layout, colorScale){
  // make previous end the new beginning
  points.forEach((d,i) => {
    d.sx = d.x;
    d.sy = d.y;
    d.colorStart = d.colorEnd;
    d.colorEnd = colorScale(i / points.length);
  });
 
  // layout points
  layout(points);
}