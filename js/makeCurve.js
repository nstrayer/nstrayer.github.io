import * as d3 from 'd3';

// Takes our math function and returns an array of objects with x,y for it.
function makeCurve({n, min, max, yFun}) {
  const stepSize = (max - min) / n;
  let x;

  return d3.range(n).map((d, i) => {
    x = min + (i + 1) * stepSize;
    return {
      x: x,
      y: yFun(x),
    };
  });
}

module.exports = makeCurve;
