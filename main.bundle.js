/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(6);

	var _jquery2 = _interopRequireDefault(_jquery);

	__webpack_require__(8);

	__webpack_require__(9);

	var _drawProjects = __webpack_require__(4);

	var _drawProjects2 = _interopRequireDefault(_drawProjects);

	var _particleViz = __webpack_require__(5);

	var _particleViz2 = _interopRequireDefault(_particleViz);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// add jquery to the window for bootstrap.
	window.$ = _jquery2.default;

	var introViz = (0, _particleViz2.default)('#randomWalkCanvas');
	introViz.startScene();
	(0, _drawProjects2.default)(proj_data);

	(0, _jquery2.default)('#resume').scrollTo();
	(0, _jquery2.default)('#resumeButton').click(function () {
	  // var link = $(this);
	  var link = (0, _jquery2.default)('#buttonText');
	  (0, _jquery2.default)('#resumeDiv').slideToggle('slow', function () {
	    if ((0, _jquery2.default)(this).is(':visible')) {
	      link.text('Close');
	    } else {
	      link.text('Expand C.V.');
	    }
	  });
	});

	(0, _jquery2.default)(document).ready(function () {
	  (0, _jquery2.default)('.navbar').localScroll({
	    duration: 800,
	    offset: -60,
	    axis: 'y'
	  });
	});

	var isMobile = /iphone|ipod|ipad|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase());

	if (isMobile) {
	  (0, _jquery2.default)(document).on('click', '.navbar-brand', function () {
	    (0, _jquery2.default)('.navbar-collapse').collapse('hide');
	  });

	  (0, _jquery2.default)(document).on('click', '.navbar-collapse.in', function (e) {
	    if ((0, _jquery2.default)(e.target).is('a')) {
	      (0, _jquery2.default)('.navbar-collapse').collapse('hide');
	    }
	  });
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// https://d3js.org Version 4.10.0. Copyright 2017 Mike Bostock.
	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.d3 = global.d3 || {});
	})(undefined, function (exports) {
	  'use strict';

	  var version = "4.10.0";

	  var ascending = function ascending(a, b) {
	    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	  };

	  var bisector = function bisector(compare) {
	    if (compare.length === 1) compare = ascendingComparator(compare);
	    return {
	      left: function left(a, x, lo, hi) {
	        if (lo == null) lo = 0;
	        if (hi == null) hi = a.length;
	        while (lo < hi) {
	          var mid = lo + hi >>> 1;
	          if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
	        }
	        return lo;
	      },
	      right: function right(a, x, lo, hi) {
	        if (lo == null) lo = 0;
	        if (hi == null) hi = a.length;
	        while (lo < hi) {
	          var mid = lo + hi >>> 1;
	          if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
	        }
	        return lo;
	      }
	    };
	  };

	  function ascendingComparator(f) {
	    return function (d, x) {
	      return ascending(f(d), x);
	    };
	  }

	  var ascendingBisect = bisector(ascending);
	  var bisectRight = ascendingBisect.right;
	  var bisectLeft = ascendingBisect.left;

	  var pairs = function pairs(array, f) {
	    if (f == null) f = pair;
	    var i = 0,
	        n = array.length - 1,
	        p = array[0],
	        pairs = new Array(n < 0 ? 0 : n);
	    while (i < n) {
	      pairs[i] = f(p, p = array[++i]);
	    }return pairs;
	  };

	  function pair(a, b) {
	    return [a, b];
	  }

	  var cross = function cross(values0, values1, reduce) {
	    var n0 = values0.length,
	        n1 = values1.length,
	        values = new Array(n0 * n1),
	        i0,
	        i1,
	        i,
	        value0;

	    if (reduce == null) reduce = pair;

	    for (i0 = i = 0; i0 < n0; ++i0) {
	      for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
	        values[i] = reduce(value0, values1[i1]);
	      }
	    }

	    return values;
	  };

	  var descending = function descending(a, b) {
	    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	  };

	  var number = function number(x) {
	    return x === null ? NaN : +x;
	  };

	  var variance = function variance(values, valueof) {
	    var n = values.length,
	        m = 0,
	        i = -1,
	        mean = 0,
	        value,
	        delta,
	        sum = 0;

	    if (valueof == null) {
	      while (++i < n) {
	        if (!isNaN(value = number(values[i]))) {
	          delta = value - mean;
	          mean += delta / ++m;
	          sum += delta * (value - mean);
	        }
	      }
	    } else {
	      while (++i < n) {
	        if (!isNaN(value = number(valueof(values[i], i, values)))) {
	          delta = value - mean;
	          mean += delta / ++m;
	          sum += delta * (value - mean);
	        }
	      }
	    }

	    if (m > 1) return sum / (m - 1);
	  };

	  var deviation = function deviation(array, f) {
	    var v = variance(array, f);
	    return v ? Math.sqrt(v) : v;
	  };

	  var extent = function extent(values, valueof) {
	    var n = values.length,
	        i = -1,
	        value,
	        min,
	        max;

	    if (valueof == null) {
	      while (++i < n) {
	        // Find the first comparable value.
	        if ((value = values[i]) != null && value >= value) {
	          min = max = value;
	          while (++i < n) {
	            // Compare the remaining values.
	            if ((value = values[i]) != null) {
	              if (min > value) min = value;
	              if (max < value) max = value;
	            }
	          }
	        }
	      }
	    } else {
	      while (++i < n) {
	        // Find the first comparable value.
	        if ((value = valueof(values[i], i, values)) != null && value >= value) {
	          min = max = value;
	          while (++i < n) {
	            // Compare the remaining values.
	            if ((value = valueof(values[i], i, values)) != null) {
	              if (min > value) min = value;
	              if (max < value) max = value;
	            }
	          }
	        }
	      }
	    }

	    return [min, max];
	  };

	  var array = Array.prototype;

	  var slice = array.slice;
	  var map = array.map;

	  var constant = function constant(x) {
	    return function () {
	      return x;
	    };
	  };

	  var identity = function identity(x) {
	    return x;
	  };

	  var sequence = function sequence(start, stop, step) {
	    start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

	    var i = -1,
	        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
	        range = new Array(n);

	    while (++i < n) {
	      range[i] = start + i * step;
	    }

	    return range;
	  };

	  var e10 = Math.sqrt(50);
	  var e5 = Math.sqrt(10);
	  var e2 = Math.sqrt(2);

	  var ticks = function ticks(start, stop, count) {
	    var reverse = stop < start,
	        i = -1,
	        n,
	        ticks,
	        step;

	    if (reverse) n = start, start = stop, stop = n;

	    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

	    if (step > 0) {
	      start = Math.ceil(start / step);
	      stop = Math.floor(stop / step);
	      ticks = new Array(n = Math.ceil(stop - start + 1));
	      while (++i < n) {
	        ticks[i] = (start + i) * step;
	      }
	    } else {
	      start = Math.floor(start * step);
	      stop = Math.ceil(stop * step);
	      ticks = new Array(n = Math.ceil(start - stop + 1));
	      while (++i < n) {
	        ticks[i] = (start - i) / step;
	      }
	    }

	    if (reverse) ticks.reverse();

	    return ticks;
	  };

	  function tickIncrement(start, stop, count) {
	    var step = (stop - start) / Math.max(0, count),
	        power = Math.floor(Math.log(step) / Math.LN10),
	        error = step / Math.pow(10, power);
	    return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
	  }

	  function tickStep(start, stop, count) {
	    var step0 = Math.abs(stop - start) / Math.max(0, count),
	        step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
	        error = step0 / step1;
	    if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
	    return stop < start ? -step1 : step1;
	  }

	  var sturges = function sturges(values) {
	    return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
	  };

	  var histogram = function histogram() {
	    var value = identity,
	        domain = extent,
	        threshold = sturges;

	    function histogram(data) {
	      var i,
	          n = data.length,
	          x,
	          values = new Array(n);

	      for (i = 0; i < n; ++i) {
	        values[i] = value(data[i], i, data);
	      }

	      var xz = domain(values),
	          x0 = xz[0],
	          x1 = xz[1],
	          tz = threshold(values, x0, x1);

	      // Convert number of thresholds into uniform thresholds.
	      if (!Array.isArray(tz)) {
	        tz = tickStep(x0, x1, tz);
	        tz = sequence(Math.ceil(x0 / tz) * tz, Math.floor(x1 / tz) * tz, tz); // exclusive
	      }

	      // Remove any thresholds outside the domain.
	      var m = tz.length;
	      while (tz[0] <= x0) {
	        tz.shift(), --m;
	      }while (tz[m - 1] > x1) {
	        tz.pop(), --m;
	      }var bins = new Array(m + 1),
	          bin;

	      // Initialize bins.
	      for (i = 0; i <= m; ++i) {
	        bin = bins[i] = [];
	        bin.x0 = i > 0 ? tz[i - 1] : x0;
	        bin.x1 = i < m ? tz[i] : x1;
	      }

	      // Assign data to bins by value, ignoring any outside the domain.
	      for (i = 0; i < n; ++i) {
	        x = values[i];
	        if (x0 <= x && x <= x1) {
	          bins[bisectRight(tz, x, 0, m)].push(data[i]);
	        }
	      }

	      return bins;
	    }

	    histogram.value = function (_) {
	      return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
	    };

	    histogram.domain = function (_) {
	      return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
	    };

	    histogram.thresholds = function (_) {
	      return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
	    };

	    return histogram;
	  };

	  var threshold = function threshold(values, p, valueof) {
	    if (valueof == null) valueof = number;
	    if (!(n = values.length)) return;
	    if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
	    if (p >= 1) return +valueof(values[n - 1], n - 1, values);
	    var n,
	        i = (n - 1) * p,
	        i0 = Math.floor(i),
	        value0 = +valueof(values[i0], i0, values),
	        value1 = +valueof(values[i0 + 1], i0 + 1, values);
	    return value0 + (value1 - value0) * (i - i0);
	  };

	  var freedmanDiaconis = function freedmanDiaconis(values, min, max) {
	    values = map.call(values, number).sort(ascending);
	    return Math.ceil((max - min) / (2 * (threshold(values, 0.75) - threshold(values, 0.25)) * Math.pow(values.length, -1 / 3)));
	  };

	  var scott = function scott(values, min, max) {
	    return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
	  };

	  var max = function max(values, valueof) {
	    var n = values.length,
	        i = -1,
	        value,
	        max;

	    if (valueof == null) {
	      while (++i < n) {
	        // Find the first comparable value.
	        if ((value = values[i]) != null && value >= value) {
	          max = value;
	          while (++i < n) {
	            // Compare the remaining values.
	            if ((value = values[i]) != null && value > max) {
	              max = value;
	            }
	          }
	        }
	      }
	    } else {
	      while (++i < n) {
	        // Find the first comparable value.
	        if ((value = valueof(values[i], i, values)) != null && value >= value) {
	          max = value;
	          while (++i < n) {
	            // Compare the remaining values.
	            if ((value = valueof(values[i], i, values)) != null && value > max) {
	              max = value;
	            }
	          }
	        }
	      }
	    }

	    return max;
	  };

	  var mean = function mean(values, valueof) {
	    var n = values.length,
	        m = n,
	        i = -1,
	        value,
	        sum = 0;

	    if (valueof == null) {
	      while (++i < n) {
	        if (!isNaN(value = number(values[i]))) sum += value;else --m;
	      }
	    } else {
	      while (++i < n) {
	        if (!isNaN(value = number(valueof(values[i], i, values)))) sum += value;else --m;
	      }
	    }

	    if (m) return sum / m;
	  };

	  var median = function median(values, valueof) {
	    var n = values.length,
	        i = -1,
	        value,
	        numbers = [];

	    if (valueof == null) {
	      while (++i < n) {
	        if (!isNaN(value = number(values[i]))) {
	          numbers.push(value);
	        }
	      }
	    } else {
	      while (++i < n) {
	        if (!isNaN(value = number(valueof(values[i], i, values)))) {
	          numbers.push(value);
	        }
	      }
	    }

	    return threshold(numbers.sort(ascending), 0.5);
	  };

	  var merge = function merge(arrays) {
	    var n = arrays.length,
	        m,
	        i = -1,
	        j = 0,
	        merged,
	        array;

	    while (++i < n) {
	      j += arrays[i].length;
	    }merged = new Array(j);

	    while (--n >= 0) {
	      array = arrays[n];
	      m = array.length;
	      while (--m >= 0) {
	        merged[--j] = array[m];
	      }
	    }

	    return merged;
	  };

	  var min = function min(values, valueof) {
	    var n = values.length,
	        i = -1,
	        value,
	        min;

	    if (valueof == null) {
	      while (++i < n) {
	        // Find the first comparable value.
	        if ((value = values[i]) != null && value >= value) {
	          min = value;
	          while (++i < n) {
	            // Compare the remaining values.
	            if ((value = values[i]) != null && min > value) {
	              min = value;
	            }
	          }
	        }
	      }
	    } else {
	      while (++i < n) {
	        // Find the first comparable value.
	        if ((value = valueof(values[i], i, values)) != null && value >= value) {
	          min = value;
	          while (++i < n) {
	            // Compare the remaining values.
	            if ((value = valueof(values[i], i, values)) != null && min > value) {
	              min = value;
	            }
	          }
	        }
	      }
	    }

	    return min;
	  };

	  var permute = function permute(array, indexes) {
	    var i = indexes.length,
	        permutes = new Array(i);
	    while (i--) {
	      permutes[i] = array[indexes[i]];
	    }return permutes;
	  };

	  var scan = function scan(values, compare) {
	    if (!(n = values.length)) return;
	    var n,
	        i = 0,
	        j = 0,
	        xi,
	        xj = values[j];

	    if (compare == null) compare = ascending;

	    while (++i < n) {
	      if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
	        xj = xi, j = i;
	      }
	    }

	    if (compare(xj, xj) === 0) return j;
	  };

	  var shuffle = function shuffle(array, i0, i1) {
	    var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
	        t,
	        i;

	    while (m) {
	      i = Math.random() * m-- | 0;
	      t = array[m + i0];
	      array[m + i0] = array[i + i0];
	      array[i + i0] = t;
	    }

	    return array;
	  };

	  var sum = function sum(values, valueof) {
	    var n = values.length,
	        i = -1,
	        value,
	        sum = 0;

	    if (valueof == null) {
	      while (++i < n) {
	        if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
	      }
	    } else {
	      while (++i < n) {
	        if (value = +valueof(values[i], i, values)) sum += value;
	      }
	    }

	    return sum;
	  };

	  var transpose = function transpose(matrix) {
	    if (!(n = matrix.length)) return [];
	    for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
	      for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
	        row[j] = matrix[j][i];
	      }
	    }
	    return transpose;
	  };

	  function length(d) {
	    return d.length;
	  }

	  var zip = function zip() {
	    return transpose(arguments);
	  };

	  var slice$1 = Array.prototype.slice;

	  var identity$1 = function identity$1(x) {
	    return x;
	  };

	  var top = 1;
	  var right = 2;
	  var bottom = 3;
	  var left = 4;
	  var epsilon = 1e-6;

	  function translateX(x) {
	    return "translate(" + (x + 0.5) + ",0)";
	  }

	  function translateY(y) {
	    return "translate(0," + (y + 0.5) + ")";
	  }

	  function number$1(scale) {
	    return function (d) {
	      return +scale(d);
	    };
	  }

	  function center(scale) {
	    var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
	    if (scale.round()) offset = Math.round(offset);
	    return function (d) {
	      return +scale(d) + offset;
	    };
	  }

	  function entering() {
	    return !this.__axis;
	  }

	  function axis(orient, scale) {
	    var tickArguments = [],
	        tickValues = null,
	        tickFormat = null,
	        tickSizeInner = 6,
	        tickSizeOuter = 6,
	        tickPadding = 3,
	        k = orient === top || orient === left ? -1 : 1,
	        x = orient === left || orient === right ? "x" : "y",
	        transform = orient === top || orient === bottom ? translateX : translateY;

	    function axis(context) {
	      var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues,
	          format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$1 : tickFormat,
	          spacing = Math.max(tickSizeInner, 0) + tickPadding,
	          range = scale.range(),
	          range0 = +range[0] + 0.5,
	          range1 = +range[range.length - 1] + 0.5,
	          position = (scale.bandwidth ? center : number$1)(scale.copy()),
	          selection = context.selection ? context.selection() : context,
	          path = selection.selectAll(".domain").data([null]),
	          tick = selection.selectAll(".tick").data(values, scale).order(),
	          tickExit = tick.exit(),
	          tickEnter = tick.enter().append("g").attr("class", "tick"),
	          line = tick.select("line"),
	          text = tick.select("text");

	      path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "#000"));

	      tick = tick.merge(tickEnter);

	      line = line.merge(tickEnter.append("line").attr("stroke", "#000").attr(x + "2", k * tickSizeInner));

	      text = text.merge(tickEnter.append("text").attr("fill", "#000").attr(x, k * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

	      if (context !== selection) {
	        path = path.transition(context);
	        tick = tick.transition(context);
	        line = line.transition(context);
	        text = text.transition(context);

	        tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function (d) {
	          return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform");
	        });

	        tickEnter.attr("opacity", epsilon).attr("transform", function (d) {
	          var p = this.parentNode.__axis;return transform(p && isFinite(p = p(d)) ? p : position(d));
	        });
	      }

	      tickExit.remove();

	      path.attr("d", orient === left || orient == right ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter : "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter);

	      tick.attr("opacity", 1).attr("transform", function (d) {
	        return transform(position(d));
	      });

	      line.attr(x + "2", k * tickSizeInner);

	      text.attr(x, k * spacing).text(format);

	      selection.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

	      selection.each(function () {
	        this.__axis = position;
	      });
	    }

	    axis.scale = function (_) {
	      return arguments.length ? (scale = _, axis) : scale;
	    };

	    axis.ticks = function () {
	      return tickArguments = slice$1.call(arguments), axis;
	    };

	    axis.tickArguments = function (_) {
	      return arguments.length ? (tickArguments = _ == null ? [] : slice$1.call(_), axis) : tickArguments.slice();
	    };

	    axis.tickValues = function (_) {
	      return arguments.length ? (tickValues = _ == null ? null : slice$1.call(_), axis) : tickValues && tickValues.slice();
	    };

	    axis.tickFormat = function (_) {
	      return arguments.length ? (tickFormat = _, axis) : tickFormat;
	    };

	    axis.tickSize = function (_) {
	      return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
	    };

	    axis.tickSizeInner = function (_) {
	      return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
	    };

	    axis.tickSizeOuter = function (_) {
	      return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
	    };

	    axis.tickPadding = function (_) {
	      return arguments.length ? (tickPadding = +_, axis) : tickPadding;
	    };

	    return axis;
	  }

	  function axisTop(scale) {
	    return axis(top, scale);
	  }

	  function axisRight(scale) {
	    return axis(right, scale);
	  }

	  function axisBottom(scale) {
	    return axis(bottom, scale);
	  }

	  function axisLeft(scale) {
	    return axis(left, scale);
	  }

	  var noop = { value: function value() {} };

	  function dispatch() {
	    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	      if (!(t = arguments[i] + "") || t in _) throw new Error("illegal type: " + t);
	      _[t] = [];
	    }
	    return new Dispatch(_);
	  }

	  function Dispatch(_) {
	    this._ = _;
	  }

	  function parseTypenames(typenames, types) {
	    return typenames.trim().split(/^|\s+/).map(function (t) {
	      var name = "",
	          i = t.indexOf(".");
	      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	      return { type: t, name: name };
	    });
	  }

	  Dispatch.prototype = dispatch.prototype = {
	    constructor: Dispatch,
	    on: function on(typename, callback) {
	      var _ = this._,
	          T = parseTypenames(typename + "", _),
	          t,
	          i = -1,
	          n = T.length;

	      // If no callback was specified, return the callback of the given type and name.
	      if (arguments.length < 2) {
	        while (++i < n) {
	          if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	        }return;
	      }

	      // If a type was specified, set the callback for the given type and name.
	      // Otherwise, if a null callback was specified, remove callbacks of the given name.
	      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	      while (++i < n) {
	        if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);else if (callback == null) for (t in _) {
	          _[t] = set(_[t], typename.name, null);
	        }
	      }

	      return this;
	    },
	    copy: function copy() {
	      var copy = {},
	          _ = this._;
	      for (var t in _) {
	        copy[t] = _[t].slice();
	      }return new Dispatch(copy);
	    },
	    call: function call(type, that) {
	      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) {
	        args[i] = arguments[i + 2];
	      }if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	      for (t = this._[type], i = 0, n = t.length; i < n; ++i) {
	        t[i].value.apply(that, args);
	      }
	    },
	    apply: function apply(type, that, args) {
	      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) {
	        t[i].value.apply(that, args);
	      }
	    }
	  };

	  function get(type, name) {
	    for (var i = 0, n = type.length, c; i < n; ++i) {
	      if ((c = type[i]).name === name) {
	        return c.value;
	      }
	    }
	  }

	  function set(type, name, callback) {
	    for (var i = 0, n = type.length; i < n; ++i) {
	      if (type[i].name === name) {
	        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	        break;
	      }
	    }
	    if (callback != null) type.push({ name: name, value: callback });
	    return type;
	  }

	  var xhtml = "http://www.w3.org/1999/xhtml";

	  var namespaces = {
	    svg: "http://www.w3.org/2000/svg",
	    xhtml: xhtml,
	    xlink: "http://www.w3.org/1999/xlink",
	    xml: "http://www.w3.org/XML/1998/namespace",
	    xmlns: "http://www.w3.org/2000/xmlns/"
	  };

	  var namespace = function namespace(name) {
	    var prefix = name += "",
	        i = prefix.indexOf(":");
	    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	    return namespaces.hasOwnProperty(prefix) ? { space: namespaces[prefix], local: name } : name;
	  };

	  function creatorInherit(name) {
	    return function () {
	      var document = this.ownerDocument,
	          uri = this.namespaceURI;
	      return uri === xhtml && document.documentElement.namespaceURI === xhtml ? document.createElement(name) : document.createElementNS(uri, name);
	    };
	  }

	  function creatorFixed(fullname) {
	    return function () {
	      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	    };
	  }

	  var creator = function creator(name) {
	    var fullname = namespace(name);
	    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
	  };

	  var nextId = 0;

	  function local$1() {
	    return new Local();
	  }

	  function Local() {
	    this._ = "@" + (++nextId).toString(36);
	  }

	  Local.prototype = local$1.prototype = {
	    constructor: Local,
	    get: function get(node) {
	      var id = this._;
	      while (!(id in node)) {
	        if (!(node = node.parentNode)) return;
	      }return node[id];
	    },
	    set: function set(node, value) {
	      return node[this._] = value;
	    },
	    remove: function remove(node) {
	      return this._ in node && delete node[this._];
	    },
	    toString: function toString() {
	      return this._;
	    }
	  };

	  var matcher = function matcher(selector) {
	    return function () {
	      return this.matches(selector);
	    };
	  };

	  if (typeof document !== "undefined") {
	    var element = document.documentElement;
	    if (!element.matches) {
	      var vendorMatches = element.webkitMatchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector;
	      matcher = function matcher(selector) {
	        return function () {
	          return vendorMatches.call(this, selector);
	        };
	      };
	    }
	  }

	  var matcher$1 = matcher;

	  var filterEvents = {};

	  exports.event = null;

	  if (typeof document !== "undefined") {
	    var element$1 = document.documentElement;
	    if (!("onmouseenter" in element$1)) {
	      filterEvents = { mouseenter: "mouseover", mouseleave: "mouseout" };
	    }
	  }

	  function filterContextListener(listener, index, group) {
	    listener = contextListener(listener, index, group);
	    return function (event) {
	      var related = event.relatedTarget;
	      if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
	        listener.call(this, event);
	      }
	    };
	  }

	  function contextListener(listener, index, group) {
	    return function (event1) {
	      var event0 = exports.event; // Events can be reentrant (e.g., focus).
	      exports.event = event1;
	      try {
	        listener.call(this, this.__data__, index, group);
	      } finally {
	        exports.event = event0;
	      }
	    };
	  }

	  function parseTypenames$1(typenames) {
	    return typenames.trim().split(/^|\s+/).map(function (t) {
	      var name = "",
	          i = t.indexOf(".");
	      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	      return { type: t, name: name };
	    });
	  }

	  function onRemove(typename) {
	    return function () {
	      var on = this.__on;
	      if (!on) return;
	      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	          this.removeEventListener(o.type, o.listener, o.capture);
	        } else {
	          on[++i] = o;
	        }
	      }
	      if (++i) on.length = i;else delete this.__on;
	    };
	  }

	  function onAdd(typename, value, capture) {
	    var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	    return function (d, i, group) {
	      var on = this.__on,
	          o,
	          listener = wrap(value, i, group);
	      if (on) for (var j = 0, m = on.length; j < m; ++j) {
	        if ((o = on[j]).type === typename.type && o.name === typename.name) {
	          this.removeEventListener(o.type, o.listener, o.capture);
	          this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	          o.value = value;
	          return;
	        }
	      }
	      this.addEventListener(typename.type, listener, capture);
	      o = { type: typename.type, name: typename.name, value: value, listener: listener, capture: capture };
	      if (!on) this.__on = [o];else on.push(o);
	    };
	  }

	  var selection_on = function selection_on(typename, value, capture) {
	    var typenames = parseTypenames$1(typename + ""),
	        i,
	        n = typenames.length,
	        t;

	    if (arguments.length < 2) {
	      var on = this.node().__on;
	      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	        for (i = 0, o = on[j]; i < n; ++i) {
	          if ((t = typenames[i]).type === o.type && t.name === o.name) {
	            return o.value;
	          }
	        }
	      }
	      return;
	    }

	    on = value ? onAdd : onRemove;
	    if (capture == null) capture = false;
	    for (i = 0; i < n; ++i) {
	      this.each(on(typenames[i], value, capture));
	    }return this;
	  };

	  function customEvent(event1, listener, that, args) {
	    var event0 = exports.event;
	    event1.sourceEvent = exports.event;
	    exports.event = event1;
	    try {
	      return listener.apply(that, args);
	    } finally {
	      exports.event = event0;
	    }
	  }

	  var sourceEvent = function sourceEvent() {
	    var current = exports.event,
	        source;
	    while (source = current.sourceEvent) {
	      current = source;
	    }return current;
	  };

	  var point = function point(node, event) {
	    var svg = node.ownerSVGElement || node;

	    if (svg.createSVGPoint) {
	      var point = svg.createSVGPoint();
	      point.x = event.clientX, point.y = event.clientY;
	      point = point.matrixTransform(node.getScreenCTM().inverse());
	      return [point.x, point.y];
	    }

	    var rect = node.getBoundingClientRect();
	    return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
	  };

	  var mouse = function mouse(node) {
	    var event = sourceEvent();
	    if (event.changedTouches) event = event.changedTouches[0];
	    return point(node, event);
	  };

	  function none() {}

	  var selector = function selector(_selector) {
	    return _selector == null ? none : function () {
	      return this.querySelector(_selector);
	    };
	  };

	  var selection_select = function selection_select(select) {
	    if (typeof select !== "function") select = selector(select);

	    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	          if ("__data__" in node) subnode.__data__ = node.__data__;
	          subgroup[i] = subnode;
	        }
	      }
	    }

	    return new Selection(subgroups, this._parents);
	  };

	  function empty$1() {
	    return [];
	  }

	  var selectorAll = function selectorAll(selector) {
	    return selector == null ? empty$1 : function () {
	      return this.querySelectorAll(selector);
	    };
	  };

	  var selection_selectAll = function selection_selectAll(select) {
	    if (typeof select !== "function") select = selectorAll(select);

	    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	        if (node = group[i]) {
	          subgroups.push(select.call(node, node.__data__, i, group));
	          parents.push(node);
	        }
	      }
	    }

	    return new Selection(subgroups, parents);
	  };

	  var selection_filter = function selection_filter(match) {
	    if (typeof match !== "function") match = matcher$1(match);

	    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	          subgroup.push(node);
	        }
	      }
	    }

	    return new Selection(subgroups, this._parents);
	  };

	  var sparse = function sparse(update) {
	    return new Array(update.length);
	  };

	  var selection_enter = function selection_enter() {
	    return new Selection(this._enter || this._groups.map(sparse), this._parents);
	  };

	  function EnterNode(parent, datum) {
	    this.ownerDocument = parent.ownerDocument;
	    this.namespaceURI = parent.namespaceURI;
	    this._next = null;
	    this._parent = parent;
	    this.__data__ = datum;
	  }

	  EnterNode.prototype = {
	    constructor: EnterNode,
	    appendChild: function appendChild(child) {
	      return this._parent.insertBefore(child, this._next);
	    },
	    insertBefore: function insertBefore(child, next) {
	      return this._parent.insertBefore(child, next);
	    },
	    querySelector: function querySelector(selector) {
	      return this._parent.querySelector(selector);
	    },
	    querySelectorAll: function querySelectorAll(selector) {
	      return this._parent.querySelectorAll(selector);
	    }
	  };

	  var constant$1 = function constant$1(x) {
	    return function () {
	      return x;
	    };
	  };

	  var keyPrefix = "$"; // Protect against keys like “__proto__”.

	  function bindIndex(parent, group, enter, update, exit, data) {
	    var i = 0,
	        node,
	        groupLength = group.length,
	        dataLength = data.length;

	    // Put any non-null nodes that fit into update.
	    // Put any null nodes into enter.
	    // Put any remaining data into enter.
	    for (; i < dataLength; ++i) {
	      if (node = group[i]) {
	        node.__data__ = data[i];
	        update[i] = node;
	      } else {
	        enter[i] = new EnterNode(parent, data[i]);
	      }
	    }

	    // Put any non-null nodes that don’t fit into exit.
	    for (; i < groupLength; ++i) {
	      if (node = group[i]) {
	        exit[i] = node;
	      }
	    }
	  }

	  function bindKey(parent, group, enter, update, exit, data, key) {
	    var i,
	        node,
	        nodeByKeyValue = {},
	        groupLength = group.length,
	        dataLength = data.length,
	        keyValues = new Array(groupLength),
	        keyValue;

	    // Compute the key for each node.
	    // If multiple nodes have the same key, the duplicates are added to exit.
	    for (i = 0; i < groupLength; ++i) {
	      if (node = group[i]) {
	        keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	        if (keyValue in nodeByKeyValue) {
	          exit[i] = node;
	        } else {
	          nodeByKeyValue[keyValue] = node;
	        }
	      }
	    }

	    // Compute the key for each datum.
	    // If there a node associated with this key, join and add it to update.
	    // If there is not (or the key is a duplicate), add it to enter.
	    for (i = 0; i < dataLength; ++i) {
	      keyValue = keyPrefix + key.call(parent, data[i], i, data);
	      if (node = nodeByKeyValue[keyValue]) {
	        update[i] = node;
	        node.__data__ = data[i];
	        nodeByKeyValue[keyValue] = null;
	      } else {
	        enter[i] = new EnterNode(parent, data[i]);
	      }
	    }

	    // Add any remaining nodes that were not bound to data to exit.
	    for (i = 0; i < groupLength; ++i) {
	      if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
	        exit[i] = node;
	      }
	    }
	  }

	  var selection_data = function selection_data(value, key) {
	    if (!value) {
	      data = new Array(this.size()), j = -1;
	      this.each(function (d) {
	        data[++j] = d;
	      });
	      return data;
	    }

	    var bind = key ? bindKey : bindIndex,
	        parents = this._parents,
	        groups = this._groups;

	    if (typeof value !== "function") value = constant$1(value);

	    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	      var parent = parents[j],
	          group = groups[j],
	          groupLength = group.length,
	          data = value.call(parent, parent && parent.__data__, j, parents),
	          dataLength = data.length,
	          enterGroup = enter[j] = new Array(dataLength),
	          updateGroup = update[j] = new Array(dataLength),
	          exitGroup = exit[j] = new Array(groupLength);

	      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

	      // Now connect the enter nodes to their following update node, such that
	      // appendChild can insert the materialized enter node before this node,
	      // rather than at the end of the parent node.
	      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	        if (previous = enterGroup[i0]) {
	          if (i0 >= i1) i1 = i0 + 1;
	          while (!(next = updateGroup[i1]) && ++i1 < dataLength) {}
	          previous._next = next || null;
	        }
	      }
	    }

	    update = new Selection(update, parents);
	    update._enter = enter;
	    update._exit = exit;
	    return update;
	  };

	  var selection_exit = function selection_exit() {
	    return new Selection(this._exit || this._groups.map(sparse), this._parents);
	  };

	  var selection_merge = function selection_merge(selection$$1) {

	    for (var groups0 = this._groups, groups1 = selection$$1._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	        if (node = group0[i] || group1[i]) {
	          merge[i] = node;
	        }
	      }
	    }

	    for (; j < m0; ++j) {
	      merges[j] = groups0[j];
	    }

	    return new Selection(merges, this._parents);
	  };

	  var selection_order = function selection_order() {

	    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	        if (node = group[i]) {
	          if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	          next = node;
	        }
	      }
	    }

	    return this;
	  };

	  var selection_sort = function selection_sort(compare) {
	    if (!compare) compare = ascending$1;

	    function compareNode(a, b) {
	      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	    }

	    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	        if (node = group[i]) {
	          sortgroup[i] = node;
	        }
	      }
	      sortgroup.sort(compareNode);
	    }

	    return new Selection(sortgroups, this._parents).order();
	  };

	  function ascending$1(a, b) {
	    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	  }

	  var selection_call = function selection_call() {
	    var callback = arguments[0];
	    arguments[0] = this;
	    callback.apply(null, arguments);
	    return this;
	  };

	  var selection_nodes = function selection_nodes() {
	    var nodes = new Array(this.size()),
	        i = -1;
	    this.each(function () {
	      nodes[++i] = this;
	    });
	    return nodes;
	  };

	  var selection_node = function selection_node() {

	    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	        var node = group[i];
	        if (node) return node;
	      }
	    }

	    return null;
	  };

	  var selection_size = function selection_size() {
	    var size = 0;
	    this.each(function () {
	      ++size;
	    });
	    return size;
	  };

	  var selection_empty = function selection_empty() {
	    return !this.node();
	  };

	  var selection_each = function selection_each(callback) {

	    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	        if (node = group[i]) callback.call(node, node.__data__, i, group);
	      }
	    }

	    return this;
	  };

	  function attrRemove(name) {
	    return function () {
	      this.removeAttribute(name);
	    };
	  }

	  function attrRemoveNS(fullname) {
	    return function () {
	      this.removeAttributeNS(fullname.space, fullname.local);
	    };
	  }

	  function attrConstant(name, value) {
	    return function () {
	      this.setAttribute(name, value);
	    };
	  }

	  function attrConstantNS(fullname, value) {
	    return function () {
	      this.setAttributeNS(fullname.space, fullname.local, value);
	    };
	  }

	  function attrFunction(name, value) {
	    return function () {
	      var v = value.apply(this, arguments);
	      if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
	    };
	  }

	  function attrFunctionNS(fullname, value) {
	    return function () {
	      var v = value.apply(this, arguments);
	      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
	    };
	  }

	  var selection_attr = function selection_attr(name, value) {
	    var fullname = namespace(name);

	    if (arguments.length < 2) {
	      var node = this.node();
	      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
	    }

	    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
	  };

	  var defaultView = function defaultView(node) {
	    return node.ownerDocument && node.ownerDocument.defaultView || // node is a Node
	    node.document && node // node is a Window
	    || node.defaultView; // node is a Document
	  };

	  function styleRemove(name) {
	    return function () {
	      this.style.removeProperty(name);
	    };
	  }

	  function styleConstant(name, value, priority) {
	    return function () {
	      this.style.setProperty(name, value, priority);
	    };
	  }

	  function styleFunction(name, value, priority) {
	    return function () {
	      var v = value.apply(this, arguments);
	      if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
	    };
	  }

	  var selection_style = function selection_style(name, value, priority) {
	    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
	  };

	  function styleValue(node, name) {
	    return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
	  }

	  function propertyRemove(name) {
	    return function () {
	      delete this[name];
	    };
	  }

	  function propertyConstant(name, value) {
	    return function () {
	      this[name] = value;
	    };
	  }

	  function propertyFunction(name, value) {
	    return function () {
	      var v = value.apply(this, arguments);
	      if (v == null) delete this[name];else this[name] = v;
	    };
	  }

	  var selection_property = function selection_property(name, value) {
	    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
	  };

	  function classArray(string) {
	    return string.trim().split(/^|\s+/);
	  }

	  function classList(node) {
	    return node.classList || new ClassList(node);
	  }

	  function ClassList(node) {
	    this._node = node;
	    this._names = classArray(node.getAttribute("class") || "");
	  }

	  ClassList.prototype = {
	    add: function add(name) {
	      var i = this._names.indexOf(name);
	      if (i < 0) {
	        this._names.push(name);
	        this._node.setAttribute("class", this._names.join(" "));
	      }
	    },
	    remove: function remove(name) {
	      var i = this._names.indexOf(name);
	      if (i >= 0) {
	        this._names.splice(i, 1);
	        this._node.setAttribute("class", this._names.join(" "));
	      }
	    },
	    contains: function contains(name) {
	      return this._names.indexOf(name) >= 0;
	    }
	  };

	  function classedAdd(node, names) {
	    var list = classList(node),
	        i = -1,
	        n = names.length;
	    while (++i < n) {
	      list.add(names[i]);
	    }
	  }

	  function classedRemove(node, names) {
	    var list = classList(node),
	        i = -1,
	        n = names.length;
	    while (++i < n) {
	      list.remove(names[i]);
	    }
	  }

	  function classedTrue(names) {
	    return function () {
	      classedAdd(this, names);
	    };
	  }

	  function classedFalse(names) {
	    return function () {
	      classedRemove(this, names);
	    };
	  }

	  function classedFunction(names, value) {
	    return function () {
	      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	    };
	  }

	  var selection_classed = function selection_classed(name, value) {
	    var names = classArray(name + "");

	    if (arguments.length < 2) {
	      var list = classList(this.node()),
	          i = -1,
	          n = names.length;
	      while (++i < n) {
	        if (!list.contains(names[i])) return false;
	      }return true;
	    }

	    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
	  };

	  function textRemove() {
	    this.textContent = "";
	  }

	  function textConstant(value) {
	    return function () {
	      this.textContent = value;
	    };
	  }

	  function textFunction(value) {
	    return function () {
	      var v = value.apply(this, arguments);
	      this.textContent = v == null ? "" : v;
	    };
	  }

	  var selection_text = function selection_text(value) {
	    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
	  };

	  function htmlRemove() {
	    this.innerHTML = "";
	  }

	  function htmlConstant(value) {
	    return function () {
	      this.innerHTML = value;
	    };
	  }

	  function htmlFunction(value) {
	    return function () {
	      var v = value.apply(this, arguments);
	      this.innerHTML = v == null ? "" : v;
	    };
	  }

	  var selection_html = function selection_html(value) {
	    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
	  };

	  function raise() {
	    if (this.nextSibling) this.parentNode.appendChild(this);
	  }

	  var selection_raise = function selection_raise() {
	    return this.each(raise);
	  };

	  function lower() {
	    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	  }

	  var selection_lower = function selection_lower() {
	    return this.each(lower);
	  };

	  var selection_append = function selection_append(name) {
	    var create = typeof name === "function" ? name : creator(name);
	    return this.select(function () {
	      return this.appendChild(create.apply(this, arguments));
	    });
	  };

	  function constantNull() {
	    return null;
	  }

	  var selection_insert = function selection_insert(name, before) {
	    var create = typeof name === "function" ? name : creator(name),
	        select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	    return this.select(function () {
	      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	    });
	  };

	  function remove() {
	    var parent = this.parentNode;
	    if (parent) parent.removeChild(this);
	  }

	  var selection_remove = function selection_remove() {
	    return this.each(remove);
	  };

	  var selection_datum = function selection_datum(value) {
	    return arguments.length ? this.property("__data__", value) : this.node().__data__;
	  };

	  function dispatchEvent(node, type, params) {
	    var window = defaultView(node),
	        event = window.CustomEvent;

	    if (typeof event === "function") {
	      event = new event(type, params);
	    } else {
	      event = window.document.createEvent("Event");
	      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
	    }

	    node.dispatchEvent(event);
	  }

	  function dispatchConstant(type, params) {
	    return function () {
	      return dispatchEvent(this, type, params);
	    };
	  }

	  function dispatchFunction(type, params) {
	    return function () {
	      return dispatchEvent(this, type, params.apply(this, arguments));
	    };
	  }

	  var selection_dispatch = function selection_dispatch(type, params) {
	    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
	  };

	  var root = [null];

	  function Selection(groups, parents) {
	    this._groups = groups;
	    this._parents = parents;
	  }

	  function selection() {
	    return new Selection([[document.documentElement]], root);
	  }

	  Selection.prototype = selection.prototype = {
	    constructor: Selection,
	    select: selection_select,
	    selectAll: selection_selectAll,
	    filter: selection_filter,
	    data: selection_data,
	    enter: selection_enter,
	    exit: selection_exit,
	    merge: selection_merge,
	    order: selection_order,
	    sort: selection_sort,
	    call: selection_call,
	    nodes: selection_nodes,
	    node: selection_node,
	    size: selection_size,
	    empty: selection_empty,
	    each: selection_each,
	    attr: selection_attr,
	    style: selection_style,
	    property: selection_property,
	    classed: selection_classed,
	    text: selection_text,
	    html: selection_html,
	    raise: selection_raise,
	    lower: selection_lower,
	    append: selection_append,
	    insert: selection_insert,
	    remove: selection_remove,
	    datum: selection_datum,
	    on: selection_on,
	    dispatch: selection_dispatch
	  };

	  var select = function select(selector) {
	    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
	  };

	  var selectAll = function selectAll(selector) {
	    return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([selector == null ? [] : selector], root);
	  };

	  var touch = function touch(node, touches, identifier) {
	    if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;

	    for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
	      if ((touch = touches[i]).identifier === identifier) {
	        return point(node, touch);
	      }
	    }

	    return null;
	  };

	  var touches = function touches(node, _touches) {
	    if (_touches == null) _touches = sourceEvent().touches;

	    for (var i = 0, n = _touches ? _touches.length : 0, points = new Array(n); i < n; ++i) {
	      points[i] = point(node, _touches[i]);
	    }

	    return points;
	  };

	  function nopropagation() {
	    exports.event.stopImmediatePropagation();
	  }

	  var noevent = function noevent() {
	    exports.event.preventDefault();
	    exports.event.stopImmediatePropagation();
	  };

	  var dragDisable = function dragDisable(view) {
	    var root = view.document.documentElement,
	        selection$$1 = select(view).on("dragstart.drag", noevent, true);
	    if ("onselectstart" in root) {
	      selection$$1.on("selectstart.drag", noevent, true);
	    } else {
	      root.__noselect = root.style.MozUserSelect;
	      root.style.MozUserSelect = "none";
	    }
	  };

	  function yesdrag(view, noclick) {
	    var root = view.document.documentElement,
	        selection$$1 = select(view).on("dragstart.drag", null);
	    if (noclick) {
	      selection$$1.on("click.drag", noevent, true);
	      setTimeout(function () {
	        selection$$1.on("click.drag", null);
	      }, 0);
	    }
	    if ("onselectstart" in root) {
	      selection$$1.on("selectstart.drag", null);
	    } else {
	      root.style.MozUserSelect = root.__noselect;
	      delete root.__noselect;
	    }
	  }

	  var constant$2 = function constant$2(x) {
	    return function () {
	      return x;
	    };
	  };

	  function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch) {
	    this.target = target;
	    this.type = type;
	    this.subject = subject;
	    this.identifier = id;
	    this.active = active;
	    this.x = x;
	    this.y = y;
	    this.dx = dx;
	    this.dy = dy;
	    this._ = dispatch;
	  }

	  DragEvent.prototype.on = function () {
	    var value = this._.on.apply(this._, arguments);
	    return value === this._ ? this : value;
	  };

	  // Ignore right-click, since that should open the context menu.
	  function defaultFilter$1() {
	    return !exports.event.button;
	  }

	  function defaultContainer() {
	    return this.parentNode;
	  }

	  function defaultSubject(d) {
	    return d == null ? { x: exports.event.x, y: exports.event.y } : d;
	  }

	  function touchable() {
	    return "ontouchstart" in this;
	  }

	  var drag = function drag() {
	    var filter = defaultFilter$1,
	        container = defaultContainer,
	        subject = defaultSubject,
	        gestures = {},
	        listeners = dispatch("start", "drag", "end"),
	        active = 0,
	        mousedownx,
	        mousedowny,
	        mousemoving,
	        touchending,
	        clickDistance2 = 0;

	    function drag(selection) {
	      selection.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	    }

	    function mousedowned() {
	      if (touchending || !filter.apply(this, arguments)) return;
	      var gesture = beforestart("mouse", container.apply(this, arguments), mouse, this, arguments);
	      if (!gesture) return;
	      select(exports.event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
	      dragDisable(exports.event.view);
	      nopropagation();
	      mousemoving = false;
	      mousedownx = exports.event.clientX;
	      mousedowny = exports.event.clientY;
	      gesture("start");
	    }

	    function mousemoved() {
	      noevent();
	      if (!mousemoving) {
	        var dx = exports.event.clientX - mousedownx,
	            dy = exports.event.clientY - mousedowny;
	        mousemoving = dx * dx + dy * dy > clickDistance2;
	      }
	      gestures.mouse("drag");
	    }

	    function mouseupped() {
	      select(exports.event.view).on("mousemove.drag mouseup.drag", null);
	      yesdrag(exports.event.view, mousemoving);
	      noevent();
	      gestures.mouse("end");
	    }

	    function touchstarted() {
	      if (!filter.apply(this, arguments)) return;
	      var touches$$1 = exports.event.changedTouches,
	          c = container.apply(this, arguments),
	          n = touches$$1.length,
	          i,
	          gesture;

	      for (i = 0; i < n; ++i) {
	        if (gesture = beforestart(touches$$1[i].identifier, c, touch, this, arguments)) {
	          nopropagation();
	          gesture("start");
	        }
	      }
	    }

	    function touchmoved() {
	      var touches$$1 = exports.event.changedTouches,
	          n = touches$$1.length,
	          i,
	          gesture;

	      for (i = 0; i < n; ++i) {
	        if (gesture = gestures[touches$$1[i].identifier]) {
	          noevent();
	          gesture("drag");
	        }
	      }
	    }

	    function touchended() {
	      var touches$$1 = exports.event.changedTouches,
	          n = touches$$1.length,
	          i,
	          gesture;

	      if (touchending) clearTimeout(touchending);
	      touchending = setTimeout(function () {
	        touchending = null;
	      }, 500); // Ghost clicks are delayed!
	      for (i = 0; i < n; ++i) {
	        if (gesture = gestures[touches$$1[i].identifier]) {
	          nopropagation();
	          gesture("end");
	        }
	      }
	    }

	    function beforestart(id, container, point, that, args) {
	      var p = point(container, id),
	          s,
	          dx,
	          dy,
	          sublisteners = listeners.copy();

	      if (!customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function () {
	        if ((exports.event.subject = s = subject.apply(that, args)) == null) return false;
	        dx = s.x - p[0] || 0;
	        dy = s.y - p[1] || 0;
	        return true;
	      })) return;

	      return function gesture(type) {
	        var p0 = p,
	            n;
	        switch (type) {
	          case "start":
	            gestures[id] = gesture, n = active++;break;
	          case "end":
	            delete gestures[id], --active; // nobreak
	          case "drag":
	            p = point(container, id), n = active;break;
	        }
	        customEvent(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
	      };
	    }

	    drag.filter = function (_) {
	      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$2(!!_), drag) : filter;
	    };

	    drag.container = function (_) {
	      return arguments.length ? (container = typeof _ === "function" ? _ : constant$2(_), drag) : container;
	    };

	    drag.subject = function (_) {
	      return arguments.length ? (subject = typeof _ === "function" ? _ : constant$2(_), drag) : subject;
	    };

	    drag.on = function () {
	      var value = listeners.on.apply(listeners, arguments);
	      return value === listeners ? drag : value;
	    };

	    drag.clickDistance = function (_) {
	      return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
	    };

	    return drag;
	  };

	  var define = function define(constructor, factory, prototype) {
	    constructor.prototype = factory.prototype = prototype;
	    prototype.constructor = constructor;
	  };

	  function extend(parent, definition) {
	    var prototype = Object.create(parent.prototype);
	    for (var key in definition) {
	      prototype[key] = definition[key];
	    }return prototype;
	  }

	  function Color() {}

	  var _darker = 0.7;
	  var _brighter = 1 / _darker;

	  var reI = "\\s*([+-]?\\d+)\\s*";
	  var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
	  var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
	  var reHex3 = /^#([0-9a-f]{3})$/;
	  var reHex6 = /^#([0-9a-f]{6})$/;
	  var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
	  var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
	  var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
	  var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
	  var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
	  var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

	  var named = {
	    aliceblue: 0xf0f8ff,
	    antiquewhite: 0xfaebd7,
	    aqua: 0x00ffff,
	    aquamarine: 0x7fffd4,
	    azure: 0xf0ffff,
	    beige: 0xf5f5dc,
	    bisque: 0xffe4c4,
	    black: 0x000000,
	    blanchedalmond: 0xffebcd,
	    blue: 0x0000ff,
	    blueviolet: 0x8a2be2,
	    brown: 0xa52a2a,
	    burlywood: 0xdeb887,
	    cadetblue: 0x5f9ea0,
	    chartreuse: 0x7fff00,
	    chocolate: 0xd2691e,
	    coral: 0xff7f50,
	    cornflowerblue: 0x6495ed,
	    cornsilk: 0xfff8dc,
	    crimson: 0xdc143c,
	    cyan: 0x00ffff,
	    darkblue: 0x00008b,
	    darkcyan: 0x008b8b,
	    darkgoldenrod: 0xb8860b,
	    darkgray: 0xa9a9a9,
	    darkgreen: 0x006400,
	    darkgrey: 0xa9a9a9,
	    darkkhaki: 0xbdb76b,
	    darkmagenta: 0x8b008b,
	    darkolivegreen: 0x556b2f,
	    darkorange: 0xff8c00,
	    darkorchid: 0x9932cc,
	    darkred: 0x8b0000,
	    darksalmon: 0xe9967a,
	    darkseagreen: 0x8fbc8f,
	    darkslateblue: 0x483d8b,
	    darkslategray: 0x2f4f4f,
	    darkslategrey: 0x2f4f4f,
	    darkturquoise: 0x00ced1,
	    darkviolet: 0x9400d3,
	    deeppink: 0xff1493,
	    deepskyblue: 0x00bfff,
	    dimgray: 0x696969,
	    dimgrey: 0x696969,
	    dodgerblue: 0x1e90ff,
	    firebrick: 0xb22222,
	    floralwhite: 0xfffaf0,
	    forestgreen: 0x228b22,
	    fuchsia: 0xff00ff,
	    gainsboro: 0xdcdcdc,
	    ghostwhite: 0xf8f8ff,
	    gold: 0xffd700,
	    goldenrod: 0xdaa520,
	    gray: 0x808080,
	    green: 0x008000,
	    greenyellow: 0xadff2f,
	    grey: 0x808080,
	    honeydew: 0xf0fff0,
	    hotpink: 0xff69b4,
	    indianred: 0xcd5c5c,
	    indigo: 0x4b0082,
	    ivory: 0xfffff0,
	    khaki: 0xf0e68c,
	    lavender: 0xe6e6fa,
	    lavenderblush: 0xfff0f5,
	    lawngreen: 0x7cfc00,
	    lemonchiffon: 0xfffacd,
	    lightblue: 0xadd8e6,
	    lightcoral: 0xf08080,
	    lightcyan: 0xe0ffff,
	    lightgoldenrodyellow: 0xfafad2,
	    lightgray: 0xd3d3d3,
	    lightgreen: 0x90ee90,
	    lightgrey: 0xd3d3d3,
	    lightpink: 0xffb6c1,
	    lightsalmon: 0xffa07a,
	    lightseagreen: 0x20b2aa,
	    lightskyblue: 0x87cefa,
	    lightslategray: 0x778899,
	    lightslategrey: 0x778899,
	    lightsteelblue: 0xb0c4de,
	    lightyellow: 0xffffe0,
	    lime: 0x00ff00,
	    limegreen: 0x32cd32,
	    linen: 0xfaf0e6,
	    magenta: 0xff00ff,
	    maroon: 0x800000,
	    mediumaquamarine: 0x66cdaa,
	    mediumblue: 0x0000cd,
	    mediumorchid: 0xba55d3,
	    mediumpurple: 0x9370db,
	    mediumseagreen: 0x3cb371,
	    mediumslateblue: 0x7b68ee,
	    mediumspringgreen: 0x00fa9a,
	    mediumturquoise: 0x48d1cc,
	    mediumvioletred: 0xc71585,
	    midnightblue: 0x191970,
	    mintcream: 0xf5fffa,
	    mistyrose: 0xffe4e1,
	    moccasin: 0xffe4b5,
	    navajowhite: 0xffdead,
	    navy: 0x000080,
	    oldlace: 0xfdf5e6,
	    olive: 0x808000,
	    olivedrab: 0x6b8e23,
	    orange: 0xffa500,
	    orangered: 0xff4500,
	    orchid: 0xda70d6,
	    palegoldenrod: 0xeee8aa,
	    palegreen: 0x98fb98,
	    paleturquoise: 0xafeeee,
	    palevioletred: 0xdb7093,
	    papayawhip: 0xffefd5,
	    peachpuff: 0xffdab9,
	    peru: 0xcd853f,
	    pink: 0xffc0cb,
	    plum: 0xdda0dd,
	    powderblue: 0xb0e0e6,
	    purple: 0x800080,
	    rebeccapurple: 0x663399,
	    red: 0xff0000,
	    rosybrown: 0xbc8f8f,
	    royalblue: 0x4169e1,
	    saddlebrown: 0x8b4513,
	    salmon: 0xfa8072,
	    sandybrown: 0xf4a460,
	    seagreen: 0x2e8b57,
	    seashell: 0xfff5ee,
	    sienna: 0xa0522d,
	    silver: 0xc0c0c0,
	    skyblue: 0x87ceeb,
	    slateblue: 0x6a5acd,
	    slategray: 0x708090,
	    slategrey: 0x708090,
	    snow: 0xfffafa,
	    springgreen: 0x00ff7f,
	    steelblue: 0x4682b4,
	    tan: 0xd2b48c,
	    teal: 0x008080,
	    thistle: 0xd8bfd8,
	    tomato: 0xff6347,
	    turquoise: 0x40e0d0,
	    violet: 0xee82ee,
	    wheat: 0xf5deb3,
	    white: 0xffffff,
	    whitesmoke: 0xf5f5f5,
	    yellow: 0xffff00,
	    yellowgreen: 0x9acd32
	  };

	  define(Color, color, {
	    displayable: function displayable() {
	      return this.rgb().displayable();
	    },
	    toString: function toString() {
	      return this.rgb() + "";
	    }
	  });

	  function color(format) {
	    var m;
	    format = (format + "").trim().toLowerCase();
	    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb(m >> 8 & 0xf | m >> 4 & 0x0f0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
	    ) : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	    : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	    : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	    : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	    : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	    : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	    : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	    : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
	  }

	  function rgbn(n) {
	    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	  }

	  function rgba(r, g, b, a) {
	    if (a <= 0) r = g = b = NaN;
	    return new Rgb(r, g, b, a);
	  }

	  function rgbConvert(o) {
	    if (!(o instanceof Color)) o = color(o);
	    if (!o) return new Rgb();
	    o = o.rgb();
	    return new Rgb(o.r, o.g, o.b, o.opacity);
	  }

	  function rgb(r, g, b, opacity) {
	    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	  }

	  function Rgb(r, g, b, opacity) {
	    this.r = +r;
	    this.g = +g;
	    this.b = +b;
	    this.opacity = +opacity;
	  }

	  define(Rgb, rgb, extend(Color, {
	    brighter: function brighter(k) {
	      k = k == null ? _brighter : Math.pow(_brighter, k);
	      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	    },
	    darker: function darker(k) {
	      k = k == null ? _darker : Math.pow(_darker, k);
	      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	    },
	    rgb: function rgb() {
	      return this;
	    },
	    displayable: function displayable() {
	      return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1;
	    },
	    toString: function toString() {
	      var a = this.opacity;a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	      return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
	    }
	  }));

	  function hsla(h, s, l, a) {
	    if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
	    return new Hsl(h, s, l, a);
	  }

	  function hslConvert(o) {
	    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	    if (!(o instanceof Color)) o = color(o);
	    if (!o) return new Hsl();
	    if (o instanceof Hsl) return o;
	    o = o.rgb();
	    var r = o.r / 255,
	        g = o.g / 255,
	        b = o.b / 255,
	        min = Math.min(r, g, b),
	        max = Math.max(r, g, b),
	        h = NaN,
	        s = max - min,
	        l = (max + min) / 2;
	    if (s) {
	      if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
	      s /= l < 0.5 ? max + min : 2 - max - min;
	      h *= 60;
	    } else {
	      s = l > 0 && l < 1 ? 0 : h;
	    }
	    return new Hsl(h, s, l, o.opacity);
	  }

	  function hsl(h, s, l, opacity) {
	    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	  }

	  function Hsl(h, s, l, opacity) {
	    this.h = +h;
	    this.s = +s;
	    this.l = +l;
	    this.opacity = +opacity;
	  }

	  define(Hsl, hsl, extend(Color, {
	    brighter: function brighter(k) {
	      k = k == null ? _brighter : Math.pow(_brighter, k);
	      return new Hsl(this.h, this.s, this.l * k, this.opacity);
	    },
	    darker: function darker(k) {
	      k = k == null ? _darker : Math.pow(_darker, k);
	      return new Hsl(this.h, this.s, this.l * k, this.opacity);
	    },
	    rgb: function rgb() {
	      var h = this.h % 360 + (this.h < 0) * 360,
	          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	          l = this.l,
	          m2 = l + (l < 0.5 ? l : 1 - l) * s,
	          m1 = 2 * l - m2;
	      return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
	    },
	    displayable: function displayable() {
	      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	    }
	  }));

	  /* From FvD 13.37, CSS Color Module Level 3 */
	  function hsl2rgb(h, m1, m2) {
	    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
	  }

	  var deg2rad = Math.PI / 180;
	  var rad2deg = 180 / Math.PI;

	  var Kn = 18;
	  var Xn = 0.950470;
	  var Yn = 1;
	  var Zn = 1.088830;
	  var t0 = 4 / 29;
	  var t1 = 6 / 29;
	  var t2 = 3 * t1 * t1;
	  var t3 = t1 * t1 * t1;

	  function labConvert(o) {
	    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	    if (o instanceof Hcl) {
	      var h = o.h * deg2rad;
	      return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	    }
	    if (!(o instanceof Rgb)) o = rgbConvert(o);
	    var b = rgb2xyz(o.r),
	        a = rgb2xyz(o.g),
	        l = rgb2xyz(o.b),
	        x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	        y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	        z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	  }

	  function lab(l, a, b, opacity) {
	    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	  }

	  function Lab(l, a, b, opacity) {
	    this.l = +l;
	    this.a = +a;
	    this.b = +b;
	    this.opacity = +opacity;
	  }

	  define(Lab, lab, extend(Color, {
	    brighter: function brighter(k) {
	      return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	    },
	    darker: function darker(k) {
	      return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	    },
	    rgb: function rgb() {
	      var y = (this.l + 16) / 116,
	          x = isNaN(this.a) ? y : y + this.a / 500,
	          z = isNaN(this.b) ? y : y - this.b / 200;
	      y = Yn * lab2xyz(y);
	      x = Xn * lab2xyz(x);
	      z = Zn * lab2xyz(z);
	      return new Rgb(xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z), xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z), this.opacity);
	    }
	  }));

	  function xyz2lab(t) {
	    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	  }

	  function lab2xyz(t) {
	    return t > t1 ? t * t * t : t2 * (t - t0);
	  }

	  function xyz2rgb(x) {
	    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	  }

	  function rgb2xyz(x) {
	    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	  }

	  function hclConvert(o) {
	    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	    if (!(o instanceof Lab)) o = labConvert(o);
	    var h = Math.atan2(o.b, o.a) * rad2deg;
	    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	  }

	  function hcl(h, c, l, opacity) {
	    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	  }

	  function Hcl(h, c, l, opacity) {
	    this.h = +h;
	    this.c = +c;
	    this.l = +l;
	    this.opacity = +opacity;
	  }

	  define(Hcl, hcl, extend(Color, {
	    brighter: function brighter(k) {
	      return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
	    },
	    darker: function darker(k) {
	      return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
	    },
	    rgb: function rgb() {
	      return labConvert(this).rgb();
	    }
	  }));

	  var A = -0.14861;
	  var B = +1.78277;
	  var C = -0.29227;
	  var D = -0.90649;
	  var E = +1.97294;
	  var ED = E * D;
	  var EB = E * B;
	  var BC_DA = B * C - D * A;

	  function cubehelixConvert(o) {
	    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	    if (!(o instanceof Rgb)) o = rgbConvert(o);
	    var r = o.r / 255,
	        g = o.g / 255,
	        b = o.b / 255,
	        l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	        bl = b - l,
	        k = (E * (g - l) - C * bl) / D,
	        s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
	        // NaN if l=0 or l=1
	    h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	  }

	  function cubehelix(h, s, l, opacity) {
	    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	  }

	  function Cubehelix(h, s, l, opacity) {
	    this.h = +h;
	    this.s = +s;
	    this.l = +l;
	    this.opacity = +opacity;
	  }

	  define(Cubehelix, cubehelix, extend(Color, {
	    brighter: function brighter(k) {
	      k = k == null ? _brighter : Math.pow(_brighter, k);
	      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	    },
	    darker: function darker(k) {
	      k = k == null ? _darker : Math.pow(_darker, k);
	      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	    },
	    rgb: function rgb() {
	      var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	          l = +this.l,
	          a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	          cosh = Math.cos(h),
	          sinh = Math.sin(h);
	      return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
	    }
	  }));

	  function basis(t1, v0, v1, v2, v3) {
	    var t2 = t1 * t1,
	        t3 = t2 * t1;
	    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
	  }

	  var basis$1 = function basis$1(values) {
	    var n = values.length - 1;
	    return function (t) {
	      var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
	          v1 = values[i],
	          v2 = values[i + 1],
	          v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
	          v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
	      return basis((t - i / n) * n, v0, v1, v2, v3);
	    };
	  };

	  var basisClosed = function basisClosed(values) {
	    var n = values.length;
	    return function (t) {
	      var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
	          v0 = values[(i + n - 1) % n],
	          v1 = values[i % n],
	          v2 = values[(i + 1) % n],
	          v3 = values[(i + 2) % n];
	      return basis((t - i / n) * n, v0, v1, v2, v3);
	    };
	  };

	  var constant$3 = function constant$3(x) {
	    return function () {
	      return x;
	    };
	  };

	  function linear(a, d) {
	    return function (t) {
	      return a + t * d;
	    };
	  }

	  function exponential(a, b, y) {
	    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
	      return Math.pow(a + t * b, y);
	    };
	  }

	  function hue(a, b) {
	    var d = b - a;
	    return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$3(isNaN(a) ? b : a);
	  }

	  function gamma(y) {
	    return (y = +y) === 1 ? nogamma : function (a, b) {
	      return b - a ? exponential(a, b, y) : constant$3(isNaN(a) ? b : a);
	    };
	  }

	  function nogamma(a, b) {
	    var d = b - a;
	    return d ? linear(a, d) : constant$3(isNaN(a) ? b : a);
	  }

	  var interpolateRgb = function rgbGamma(y) {
	    var color$$1 = gamma(y);

	    function rgb$$1(start, end) {
	      var r = color$$1((start = rgb(start)).r, (end = rgb(end)).r),
	          g = color$$1(start.g, end.g),
	          b = color$$1(start.b, end.b),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function (t) {
	        start.r = r(t);
	        start.g = g(t);
	        start.b = b(t);
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }

	    rgb$$1.gamma = rgbGamma;

	    return rgb$$1;
	  }(1);

	  function rgbSpline(spline) {
	    return function (colors) {
	      var n = colors.length,
	          r = new Array(n),
	          g = new Array(n),
	          b = new Array(n),
	          i,
	          color$$1;
	      for (i = 0; i < n; ++i) {
	        color$$1 = rgb(colors[i]);
	        r[i] = color$$1.r || 0;
	        g[i] = color$$1.g || 0;
	        b[i] = color$$1.b || 0;
	      }
	      r = spline(r);
	      g = spline(g);
	      b = spline(b);
	      color$$1.opacity = 1;
	      return function (t) {
	        color$$1.r = r(t);
	        color$$1.g = g(t);
	        color$$1.b = b(t);
	        return color$$1 + "";
	      };
	    };
	  }

	  var rgbBasis = rgbSpline(basis$1);
	  var rgbBasisClosed = rgbSpline(basisClosed);

	  var array$1 = function array$1(a, b) {
	    var nb = b ? b.length : 0,
	        na = a ? Math.min(nb, a.length) : 0,
	        x = new Array(nb),
	        c = new Array(nb),
	        i;

	    for (i = 0; i < na; ++i) {
	      x[i] = interpolateValue(a[i], b[i]);
	    }for (; i < nb; ++i) {
	      c[i] = b[i];
	    }return function (t) {
	      for (i = 0; i < na; ++i) {
	        c[i] = x[i](t);
	      }return c;
	    };
	  };

	  var date = function date(a, b) {
	    var d = new Date();
	    return a = +a, b -= a, function (t) {
	      return d.setTime(a + b * t), d;
	    };
	  };

	  var reinterpolate = function reinterpolate(a, b) {
	    return a = +a, b -= a, function (t) {
	      return a + b * t;
	    };
	  };

	  var object = function object(a, b) {
	    var i = {},
	        c = {},
	        k;

	    if (a === null || (typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== "object") a = {};
	    if (b === null || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== "object") b = {};

	    for (k in b) {
	      if (k in a) {
	        i[k] = interpolateValue(a[k], b[k]);
	      } else {
	        c[k] = b[k];
	      }
	    }

	    return function (t) {
	      for (k in i) {
	        c[k] = i[k](t);
	      }return c;
	    };
	  };

	  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	  var reB = new RegExp(reA.source, "g");

	  function zero(b) {
	    return function () {
	      return b;
	    };
	  }

	  function one(b) {
	    return function (t) {
	      return b(t) + "";
	    };
	  }

	  var interpolateString = function interpolateString(a, b) {
	    var bi = reA.lastIndex = reB.lastIndex = 0,
	        // scan index for next number in b
	    am,
	        // current match in a
	    bm,
	        // current match in b
	    bs,
	        // string preceding current number in b, if any
	    i = -1,
	        // index in s
	    s = [],
	        // string constants and placeholders
	    q = []; // number interpolators

	    // Coerce inputs to strings.
	    a = a + "", b = b + "";

	    // Interpolate pairs of numbers in a & b.
	    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
	      if ((bs = bm.index) > bi) {
	        // a string precedes the next number in b
	        bs = b.slice(bi, bs);
	        if (s[i]) s[i] += bs; // coalesce with previous string
	        else s[++i] = bs;
	      }
	      if ((am = am[0]) === (bm = bm[0])) {
	        // numbers in a & b match
	        if (s[i]) s[i] += bm; // coalesce with previous string
	        else s[++i] = bm;
	      } else {
	        // interpolate non-matching numbers
	        s[++i] = null;
	        q.push({ i: i, x: reinterpolate(am, bm) });
	      }
	      bi = reB.lastIndex;
	    }

	    // Add remains of b.
	    if (bi < b.length) {
	      bs = b.slice(bi);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }

	    // Special optimization for only a single match.
	    // Otherwise, interpolate each of the numbers and rejoin the string.
	    return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
	      for (var i = 0, o; i < b; ++i) {
	        s[(o = q[i]).i] = o.x(t);
	      }return s.join("");
	    });
	  };

	  var interpolateValue = function interpolateValue(a, b) {
	    var t = typeof b === 'undefined' ? 'undefined' : _typeof(b),
	        c;
	    return b == null || t === "boolean" ? constant$3(b) : (t === "number" ? reinterpolate : t === "string" ? (c = color(b)) ? (b = c, interpolateRgb) : interpolateString : b instanceof color ? interpolateRgb : b instanceof Date ? date : Array.isArray(b) ? array$1 : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : reinterpolate)(a, b);
	  };

	  var interpolateRound = function interpolateRound(a, b) {
	    return a = +a, b -= a, function (t) {
	      return Math.round(a + b * t);
	    };
	  };

	  var degrees = 180 / Math.PI;

	  var identity$2 = {
	    translateX: 0,
	    translateY: 0,
	    rotate: 0,
	    skewX: 0,
	    scaleX: 1,
	    scaleY: 1
	  };

	  var decompose = function decompose(a, b, c, d, e, f) {
	    var scaleX, scaleY, skewX;
	    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	    return {
	      translateX: e,
	      translateY: f,
	      rotate: Math.atan2(b, a) * degrees,
	      skewX: Math.atan(skewX) * degrees,
	      scaleX: scaleX,
	      scaleY: scaleY
	    };
	  };

	  var cssNode;
	  var cssRoot;
	  var cssView;
	  var svgNode;

	  function parseCss(value) {
	    if (value === "none") return identity$2;
	    if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	    cssNode.style.transform = value;
	    value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
	    cssRoot.removeChild(cssNode);
	    value = value.slice(7, -1).split(",");
	    return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
	  }

	  function parseSvg(value) {
	    if (value == null) return identity$2;
	    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	    svgNode.setAttribute("transform", value);
	    if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
	    value = value.matrix;
	    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
	  }

	  function interpolateTransform(parse, pxComma, pxParen, degParen) {

	    function pop(s) {
	      return s.length ? s.pop() + " " : "";
	    }

	    function translate(xa, ya, xb, yb, s, q) {
	      if (xa !== xb || ya !== yb) {
	        var i = s.push("translate(", null, pxComma, null, pxParen);
	        q.push({ i: i - 4, x: reinterpolate(xa, xb) }, { i: i - 2, x: reinterpolate(ya, yb) });
	      } else if (xb || yb) {
	        s.push("translate(" + xb + pxComma + yb + pxParen);
	      }
	    }

	    function rotate(a, b, s, q) {
	      if (a !== b) {
	        if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path
	        q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: reinterpolate(a, b) });
	      } else if (b) {
	        s.push(pop(s) + "rotate(" + b + degParen);
	      }
	    }

	    function skewX(a, b, s, q) {
	      if (a !== b) {
	        q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: reinterpolate(a, b) });
	      } else if (b) {
	        s.push(pop(s) + "skewX(" + b + degParen);
	      }
	    }

	    function scale(xa, ya, xb, yb, s, q) {
	      if (xa !== xb || ya !== yb) {
	        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	        q.push({ i: i - 4, x: reinterpolate(xa, xb) }, { i: i - 2, x: reinterpolate(ya, yb) });
	      } else if (xb !== 1 || yb !== 1) {
	        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	      }
	    }

	    return function (a, b) {
	      var s = [],
	          // string constants and placeholders
	      q = []; // number interpolators
	      a = parse(a), b = parse(b);
	      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	      rotate(a.rotate, b.rotate, s, q);
	      skewX(a.skewX, b.skewX, s, q);
	      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	      a = b = null; // gc
	      return function (t) {
	        var i = -1,
	            n = q.length,
	            o;
	        while (++i < n) {
	          s[(o = q[i]).i] = o.x(t);
	        }return s.join("");
	      };
	    };
	  }

	  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

	  var rho = Math.SQRT2;
	  var rho2 = 2;
	  var rho4 = 4;
	  var epsilon2 = 1e-12;

	  function cosh(x) {
	    return ((x = Math.exp(x)) + 1 / x) / 2;
	  }

	  function sinh(x) {
	    return ((x = Math.exp(x)) - 1 / x) / 2;
	  }

	  function tanh(x) {
	    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	  }

	  // p0 = [ux0, uy0, w0]
	  // p1 = [ux1, uy1, w1]
	  var interpolateZoom = function interpolateZoom(p0, p1) {
	    var ux0 = p0[0],
	        uy0 = p0[1],
	        w0 = p0[2],
	        ux1 = p1[0],
	        uy1 = p1[1],
	        w1 = p1[2],
	        dx = ux1 - ux0,
	        dy = uy1 - uy0,
	        d2 = dx * dx + dy * dy,
	        i,
	        S;

	    // Special case for u0 ≅ u1.
	    if (d2 < epsilon2) {
	      S = Math.log(w1 / w0) / rho;
	      i = function i(t) {
	        return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
	      };
	    }

	    // General case.
	    else {
	        var d1 = Math.sqrt(d2),
	            b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	            b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	            r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	            r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	        S = (r1 - r0) / rho;
	        i = function i(t) {
	          var s = t * S,
	              coshr0 = cosh(r0),
	              u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	          return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
	        };
	      }

	    i.duration = S * 1000;

	    return i;
	  };

	  function hsl$1(hue$$1) {
	    return function (start, end) {
	      var h = hue$$1((start = hsl(start)).h, (end = hsl(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function (t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(t);
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    };
	  }

	  var hsl$2 = hsl$1(hue);
	  var hslLong = hsl$1(nogamma);

	  function lab$1(start, end) {
	    var l = nogamma((start = lab(start)).l, (end = lab(end)).l),
	        a = nogamma(start.a, end.a),
	        b = nogamma(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function (t) {
	      start.l = l(t);
	      start.a = a(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  function hcl$1(hue$$1) {
	    return function (start, end) {
	      var h = hue$$1((start = hcl(start)).h, (end = hcl(end)).h),
	          c = nogamma(start.c, end.c),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function (t) {
	        start.h = h(t);
	        start.c = c(t);
	        start.l = l(t);
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    };
	  }

	  var hcl$2 = hcl$1(hue);
	  var hclLong = hcl$1(nogamma);

	  function cubehelix$1(hue$$1) {
	    return function cubehelixGamma(y) {
	      y = +y;

	      function cubehelix$$1(start, end) {
	        var h = hue$$1((start = cubehelix(start)).h, (end = cubehelix(end)).h),
	            s = nogamma(start.s, end.s),
	            l = nogamma(start.l, end.l),
	            opacity = nogamma(start.opacity, end.opacity);
	        return function (t) {
	          start.h = h(t);
	          start.s = s(t);
	          start.l = l(Math.pow(t, y));
	          start.opacity = opacity(t);
	          return start + "";
	        };
	      }

	      cubehelix$$1.gamma = cubehelixGamma;

	      return cubehelix$$1;
	    }(1);
	  }

	  var cubehelix$2 = cubehelix$1(hue);
	  var cubehelixLong = cubehelix$1(nogamma);

	  var quantize = function quantize(interpolator, n) {
	    var samples = new Array(n);
	    for (var i = 0; i < n; ++i) {
	      samples[i] = interpolator(i / (n - 1));
	    }return samples;
	  };

	  var frame = 0;
	  var timeout = 0;
	  var interval = 0;
	  var pokeDelay = 1000;
	  var taskHead;
	  var taskTail;
	  var clockLast = 0;
	  var clockNow = 0;
	  var clockSkew = 0;
	  var clock = (typeof performance === 'undefined' ? 'undefined' : _typeof(performance)) === "object" && performance.now ? performance : Date;
	  var setFrame = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (f) {
	    setTimeout(f, 17);
	  };

	  function now() {
	    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
	  }

	  function clearNow() {
	    clockNow = 0;
	  }

	  function Timer() {
	    this._call = this._time = this._next = null;
	  }

	  Timer.prototype = timer.prototype = {
	    constructor: Timer,
	    restart: function restart(callback, delay, time) {
	      if (typeof callback !== "function") throw new TypeError("callback is not a function");
	      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
	      if (!this._next && taskTail !== this) {
	        if (taskTail) taskTail._next = this;else taskHead = this;
	        taskTail = this;
	      }
	      this._call = callback;
	      this._time = time;
	      sleep();
	    },
	    stop: function stop() {
	      if (this._call) {
	        this._call = null;
	        this._time = Infinity;
	        sleep();
	      }
	    }
	  };

	  function timer(callback, delay, time) {
	    var t = new Timer();
	    t.restart(callback, delay, time);
	    return t;
	  }

	  function timerFlush() {
	    now(); // Get the current time, if not already set.
	    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	    var t = taskHead,
	        e;
	    while (t) {
	      if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
	      t = t._next;
	    }
	    --frame;
	  }

	  function wake() {
	    clockNow = (clockLast = clock.now()) + clockSkew;
	    frame = timeout = 0;
	    try {
	      timerFlush();
	    } finally {
	      frame = 0;
	      nap();
	      clockNow = 0;
	    }
	  }

	  function poke() {
	    var now = clock.now(),
	        delay = now - clockLast;
	    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	  }

	  function nap() {
	    var t0,
	        t1 = taskHead,
	        t2,
	        time = Infinity;
	    while (t1) {
	      if (t1._call) {
	        if (time > t1._time) time = t1._time;
	        t0 = t1, t1 = t1._next;
	      } else {
	        t2 = t1._next, t1._next = null;
	        t1 = t0 ? t0._next = t2 : taskHead = t2;
	      }
	    }
	    taskTail = t0;
	    sleep(time);
	  }

	  function sleep(time) {
	    if (frame) return; // Soonest alarm already set, or will be.
	    if (timeout) timeout = clearTimeout(timeout);
	    var delay = time - clockNow;
	    if (delay > 24) {
	      if (time < Infinity) timeout = setTimeout(wake, delay);
	      if (interval) interval = clearInterval(interval);
	    } else {
	      if (!interval) clockLast = clockNow, interval = setInterval(poke, pokeDelay);
	      frame = 1, setFrame(wake);
	    }
	  }

	  var timeout$1 = function timeout$1(callback, delay, time) {
	    var t = new Timer();
	    delay = delay == null ? 0 : +delay;
	    t.restart(function (elapsed) {
	      t.stop();
	      callback(elapsed + delay);
	    }, delay, time);
	    return t;
	  };

	  var interval$1 = function interval$1(callback, delay, time) {
	    var t = new Timer(),
	        total = delay;
	    if (delay == null) return t.restart(callback, delay, time), t;
	    delay = +delay, time = time == null ? now() : +time;
	    t.restart(function tick(elapsed) {
	      elapsed += total;
	      t.restart(tick, total += delay, time);
	      callback(elapsed);
	    }, delay, time);
	    return t;
	  };

	  var emptyOn = dispatch("start", "end", "interrupt");
	  var emptyTween = [];

	  var CREATED = 0;
	  var SCHEDULED = 1;
	  var STARTING = 2;
	  var STARTED = 3;
	  var RUNNING = 4;
	  var ENDING = 5;
	  var ENDED = 6;

	  var schedule = function schedule(node, name, id, index, group, timing) {
	    var schedules = node.__transition;
	    if (!schedules) node.__transition = {};else if (id in schedules) return;
	    create(node, id, {
	      name: name,
	      index: index, // For context during callback.
	      group: group, // For context during callback.
	      on: emptyOn,
	      tween: emptyTween,
	      time: timing.time,
	      delay: timing.delay,
	      duration: timing.duration,
	      ease: timing.ease,
	      timer: null,
	      state: CREATED
	    });
	  };

	  function init(node, id) {
	    var schedule = node.__transition;
	    if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) throw new Error("too late");
	    return schedule;
	  }

	  function set$1(node, id) {
	    var schedule = node.__transition;
	    if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) throw new Error("too late");
	    return schedule;
	  }

	  function get$1(node, id) {
	    var schedule = node.__transition;
	    if (!schedule || !(schedule = schedule[id])) throw new Error("too late");
	    return schedule;
	  }

	  function create(node, id, self) {
	    var schedules = node.__transition,
	        tween;

	    // Initialize the self timer when the transition is created.
	    // Note the actual delay is not known until the first callback!
	    schedules[id] = self;
	    self.timer = timer(schedule, 0, self.time);

	    function schedule(elapsed) {
	      self.state = SCHEDULED;
	      self.timer.restart(start, self.delay, self.time);

	      // If the elapsed delay is less than our first sleep, start immediately.
	      if (self.delay <= elapsed) start(elapsed - self.delay);
	    }

	    function start(elapsed) {
	      var i, j, n, o;

	      // If the state is not SCHEDULED, then we previously errored on start.
	      if (self.state !== SCHEDULED) return stop();

	      for (i in schedules) {
	        o = schedules[i];
	        if (o.name !== self.name) continue;

	        // While this element already has a starting transition during this frame,
	        // defer starting an interrupting transition until that transition has a
	        // chance to tick (and possibly end); see d3/d3-transition#54!
	        if (o.state === STARTED) return timeout$1(start);

	        // Interrupt the active transition, if any.
	        // Dispatch the interrupt event.
	        if (o.state === RUNNING) {
	          o.state = ENDED;
	          o.timer.stop();
	          o.on.call("interrupt", node, node.__data__, o.index, o.group);
	          delete schedules[i];
	        }

	        // Cancel any pre-empted transitions. No interrupt event is dispatched
	        // because the cancelled transitions never started. Note that this also
	        // removes this transition from the pending list!
	        else if (+i < id) {
	            o.state = ENDED;
	            o.timer.stop();
	            delete schedules[i];
	          }
	      }

	      // Defer the first tick to end of the current frame; see d3/d3#1576.
	      // Note the transition may be canceled after start and before the first tick!
	      // Note this must be scheduled before the start event; see d3/d3-transition#16!
	      // Assuming this is successful, subsequent callbacks go straight to tick.
	      timeout$1(function () {
	        if (self.state === STARTED) {
	          self.state = RUNNING;
	          self.timer.restart(tick, self.delay, self.time);
	          tick(elapsed);
	        }
	      });

	      // Dispatch the start event.
	      // Note this must be done before the tween are initialized.
	      self.state = STARTING;
	      self.on.call("start", node, node.__data__, self.index, self.group);
	      if (self.state !== STARTING) return; // interrupted
	      self.state = STARTED;

	      // Initialize the tween, deleting null tween.
	      tween = new Array(n = self.tween.length);
	      for (i = 0, j = -1; i < n; ++i) {
	        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
	          tween[++j] = o;
	        }
	      }
	      tween.length = j + 1;
	    }

	    function tick(elapsed) {
	      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
	          i = -1,
	          n = tween.length;

	      while (++i < n) {
	        tween[i].call(null, t);
	      }

	      // Dispatch the end event.
	      if (self.state === ENDING) {
	        self.on.call("end", node, node.__data__, self.index, self.group);
	        stop();
	      }
	    }

	    function stop() {
	      self.state = ENDED;
	      self.timer.stop();
	      delete schedules[id];
	      for (var i in schedules) {
	        return;
	      } // eslint-disable-line no-unused-vars
	      delete node.__transition;
	    }
	  }

	  var interrupt = function interrupt(node, name) {
	    var schedules = node.__transition,
	        schedule$$1,
	        active,
	        empty = true,
	        i;

	    if (!schedules) return;

	    name = name == null ? null : name + "";

	    for (i in schedules) {
	      if ((schedule$$1 = schedules[i]).name !== name) {
	        empty = false;continue;
	      }
	      active = schedule$$1.state > STARTING && schedule$$1.state < ENDING;
	      schedule$$1.state = ENDED;
	      schedule$$1.timer.stop();
	      if (active) schedule$$1.on.call("interrupt", node, node.__data__, schedule$$1.index, schedule$$1.group);
	      delete schedules[i];
	    }

	    if (empty) delete node.__transition;
	  };

	  var selection_interrupt = function selection_interrupt(name) {
	    return this.each(function () {
	      interrupt(this, name);
	    });
	  };

	  function tweenRemove(id, name) {
	    var tween0, tween1;
	    return function () {
	      var schedule$$1 = set$1(this, id),
	          tween = schedule$$1.tween;

	      // If this node shared tween with the previous node,
	      // just assign the updated shared tween and we’re done!
	      // Otherwise, copy-on-write.
	      if (tween !== tween0) {
	        tween1 = tween0 = tween;
	        for (var i = 0, n = tween1.length; i < n; ++i) {
	          if (tween1[i].name === name) {
	            tween1 = tween1.slice();
	            tween1.splice(i, 1);
	            break;
	          }
	        }
	      }

	      schedule$$1.tween = tween1;
	    };
	  }

	  function tweenFunction(id, name, value) {
	    var tween0, tween1;
	    if (typeof value !== "function") throw new Error();
	    return function () {
	      var schedule$$1 = set$1(this, id),
	          tween = schedule$$1.tween;

	      // If this node shared tween with the previous node,
	      // just assign the updated shared tween and we’re done!
	      // Otherwise, copy-on-write.
	      if (tween !== tween0) {
	        tween1 = (tween0 = tween).slice();
	        for (var t = { name: name, value: value }, i = 0, n = tween1.length; i < n; ++i) {
	          if (tween1[i].name === name) {
	            tween1[i] = t;
	            break;
	          }
	        }
	        if (i === n) tween1.push(t);
	      }

	      schedule$$1.tween = tween1;
	    };
	  }

	  var transition_tween = function transition_tween(name, value) {
	    var id = this._id;

	    name += "";

	    if (arguments.length < 2) {
	      var tween = get$1(this.node(), id).tween;
	      for (var i = 0, n = tween.length, t; i < n; ++i) {
	        if ((t = tween[i]).name === name) {
	          return t.value;
	        }
	      }
	      return null;
	    }

	    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
	  };

	  function tweenValue(transition, name, value) {
	    var id = transition._id;

	    transition.each(function () {
	      var schedule$$1 = set$1(this, id);
	      (schedule$$1.value || (schedule$$1.value = {}))[name] = value.apply(this, arguments);
	    });

	    return function (node) {
	      return get$1(node, id).value[name];
	    };
	  }

	  var interpolate = function interpolate(a, b) {
	    var c;
	    return (typeof b === "number" ? reinterpolate : b instanceof color ? interpolateRgb : (c = color(b)) ? (b = c, interpolateRgb) : interpolateString)(a, b);
	  };

	  function attrRemove$1(name) {
	    return function () {
	      this.removeAttribute(name);
	    };
	  }

	  function attrRemoveNS$1(fullname) {
	    return function () {
	      this.removeAttributeNS(fullname.space, fullname.local);
	    };
	  }

	  function attrConstant$1(name, interpolate$$1, value1) {
	    var value00, interpolate0;
	    return function () {
	      var value0 = this.getAttribute(name);
	      return value0 === value1 ? null : value0 === value00 ? interpolate0 : interpolate0 = interpolate$$1(value00 = value0, value1);
	    };
	  }

	  function attrConstantNS$1(fullname, interpolate$$1, value1) {
	    var value00, interpolate0;
	    return function () {
	      var value0 = this.getAttributeNS(fullname.space, fullname.local);
	      return value0 === value1 ? null : value0 === value00 ? interpolate0 : interpolate0 = interpolate$$1(value00 = value0, value1);
	    };
	  }

	  function attrFunction$1(name, interpolate$$1, value) {
	    var value00, value10, interpolate0;
	    return function () {
	      var value0,
	          value1 = value(this);
	      if (value1 == null) return void this.removeAttribute(name);
	      value0 = this.getAttribute(name);
	      return value0 === value1 ? null : value0 === value00 && value1 === value10 ? interpolate0 : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	    };
	  }

	  function attrFunctionNS$1(fullname, interpolate$$1, value) {
	    var value00, value10, interpolate0;
	    return function () {
	      var value0,
	          value1 = value(this);
	      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
	      value0 = this.getAttributeNS(fullname.space, fullname.local);
	      return value0 === value1 ? null : value0 === value00 && value1 === value10 ? interpolate0 : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	    };
	  }

	  var transition_attr = function transition_attr(name, value) {
	    var fullname = namespace(name),
	        i = fullname === "transform" ? interpolateTransformSvg : interpolate;
	    return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS$1 : attrRemove$1)(fullname) : (fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, i, value + ""));
	  };

	  function attrTweenNS(fullname, value) {
	    function tween() {
	      var node = this,
	          i = value.apply(node, arguments);
	      return i && function (t) {
	        node.setAttributeNS(fullname.space, fullname.local, i(t));
	      };
	    }
	    tween._value = value;
	    return tween;
	  }

	  function attrTween(name, value) {
	    function tween() {
	      var node = this,
	          i = value.apply(node, arguments);
	      return i && function (t) {
	        node.setAttribute(name, i(t));
	      };
	    }
	    tween._value = value;
	    return tween;
	  }

	  var transition_attrTween = function transition_attrTween(name, value) {
	    var key = "attr." + name;
	    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	    if (value == null) return this.tween(key, null);
	    if (typeof value !== "function") throw new Error();
	    var fullname = namespace(name);
	    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
	  };

	  function delayFunction(id, value) {
	    return function () {
	      init(this, id).delay = +value.apply(this, arguments);
	    };
	  }

	  function delayConstant(id, value) {
	    return value = +value, function () {
	      init(this, id).delay = value;
	    };
	  }

	  var transition_delay = function transition_delay(value) {
	    var id = this._id;

	    return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : get$1(this.node(), id).delay;
	  };

	  function durationFunction(id, value) {
	    return function () {
	      set$1(this, id).duration = +value.apply(this, arguments);
	    };
	  }

	  function durationConstant(id, value) {
	    return value = +value, function () {
	      set$1(this, id).duration = value;
	    };
	  }

	  var transition_duration = function transition_duration(value) {
	    var id = this._id;

	    return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : get$1(this.node(), id).duration;
	  };

	  function easeConstant(id, value) {
	    if (typeof value !== "function") throw new Error();
	    return function () {
	      set$1(this, id).ease = value;
	    };
	  }

	  var transition_ease = function transition_ease(value) {
	    var id = this._id;

	    return arguments.length ? this.each(easeConstant(id, value)) : get$1(this.node(), id).ease;
	  };

	  var transition_filter = function transition_filter(match) {
	    if (typeof match !== "function") match = matcher$1(match);

	    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	          subgroup.push(node);
	        }
	      }
	    }

	    return new Transition(subgroups, this._parents, this._name, this._id);
	  };

	  var transition_merge = function transition_merge(transition$$1) {
	    if (transition$$1._id !== this._id) throw new Error();

	    for (var groups0 = this._groups, groups1 = transition$$1._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	        if (node = group0[i] || group1[i]) {
	          merge[i] = node;
	        }
	      }
	    }

	    for (; j < m0; ++j) {
	      merges[j] = groups0[j];
	    }

	    return new Transition(merges, this._parents, this._name, this._id);
	  };

	  function start(name) {
	    return (name + "").trim().split(/^|\s+/).every(function (t) {
	      var i = t.indexOf(".");
	      if (i >= 0) t = t.slice(0, i);
	      return !t || t === "start";
	    });
	  }

	  function onFunction(id, name, listener) {
	    var on0,
	        on1,
	        sit = start(name) ? init : set$1;
	    return function () {
	      var schedule$$1 = sit(this, id),
	          on = schedule$$1.on;

	      // If this node shared a dispatch with the previous node,
	      // just assign the updated shared dispatch and we’re done!
	      // Otherwise, copy-on-write.
	      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

	      schedule$$1.on = on1;
	    };
	  }

	  var transition_on = function transition_on(name, listener) {
	    var id = this._id;

	    return arguments.length < 2 ? get$1(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
	  };

	  function removeFunction(id) {
	    return function () {
	      var parent = this.parentNode;
	      for (var i in this.__transition) {
	        if (+i !== id) return;
	      }if (parent) parent.removeChild(this);
	    };
	  }

	  var transition_remove = function transition_remove() {
	    return this.on("end.remove", removeFunction(this._id));
	  };

	  var transition_select = function transition_select(select$$1) {
	    var name = this._name,
	        id = this._id;

	    if (typeof select$$1 !== "function") select$$1 = selector(select$$1);

	    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	        if ((node = group[i]) && (subnode = select$$1.call(node, node.__data__, i, group))) {
	          if ("__data__" in node) subnode.__data__ = node.__data__;
	          subgroup[i] = subnode;
	          schedule(subgroup[i], name, id, i, subgroup, get$1(node, id));
	        }
	      }
	    }

	    return new Transition(subgroups, this._parents, name, id);
	  };

	  var transition_selectAll = function transition_selectAll(select$$1) {
	    var name = this._name,
	        id = this._id;

	    if (typeof select$$1 !== "function") select$$1 = selectorAll(select$$1);

	    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	        if (node = group[i]) {
	          for (var children = select$$1.call(node, node.__data__, i, group), child, inherit = get$1(node, id), k = 0, l = children.length; k < l; ++k) {
	            if (child = children[k]) {
	              schedule(child, name, id, k, children, inherit);
	            }
	          }
	          subgroups.push(children);
	          parents.push(node);
	        }
	      }
	    }

	    return new Transition(subgroups, parents, name, id);
	  };

	  var Selection$1 = selection.prototype.constructor;

	  var transition_selection = function transition_selection() {
	    return new Selection$1(this._groups, this._parents);
	  };

	  function styleRemove$1(name, interpolate$$1) {
	    var value00, value10, interpolate0;
	    return function () {
	      var value0 = styleValue(this, name),
	          value1 = (this.style.removeProperty(name), styleValue(this, name));
	      return value0 === value1 ? null : value0 === value00 && value1 === value10 ? interpolate0 : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	    };
	  }

	  function styleRemoveEnd(name) {
	    return function () {
	      this.style.removeProperty(name);
	    };
	  }

	  function styleConstant$1(name, interpolate$$1, value1) {
	    var value00, interpolate0;
	    return function () {
	      var value0 = styleValue(this, name);
	      return value0 === value1 ? null : value0 === value00 ? interpolate0 : interpolate0 = interpolate$$1(value00 = value0, value1);
	    };
	  }

	  function styleFunction$1(name, interpolate$$1, value) {
	    var value00, value10, interpolate0;
	    return function () {
	      var value0 = styleValue(this, name),
	          value1 = value(this);
	      if (value1 == null) value1 = (this.style.removeProperty(name), styleValue(this, name));
	      return value0 === value1 ? null : value0 === value00 && value1 === value10 ? interpolate0 : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
	    };
	  }

	  var transition_style = function transition_style(name, value, priority) {
	    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
	    return value == null ? this.styleTween(name, styleRemove$1(name, i)).on("end.style." + name, styleRemoveEnd(name)) : this.styleTween(name, typeof value === "function" ? styleFunction$1(name, i, tweenValue(this, "style." + name, value)) : styleConstant$1(name, i, value + ""), priority);
	  };

	  function styleTween(name, value, priority) {
	    function tween() {
	      var node = this,
	          i = value.apply(node, arguments);
	      return i && function (t) {
	        node.style.setProperty(name, i(t), priority);
	      };
	    }
	    tween._value = value;
	    return tween;
	  }

	  var transition_styleTween = function transition_styleTween(name, value, priority) {
	    var key = "style." + (name += "");
	    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	    if (value == null) return this.tween(key, null);
	    if (typeof value !== "function") throw new Error();
	    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
	  };

	  function textConstant$1(value) {
	    return function () {
	      this.textContent = value;
	    };
	  }

	  function textFunction$1(value) {
	    return function () {
	      var value1 = value(this);
	      this.textContent = value1 == null ? "" : value1;
	    };
	  }

	  var transition_text = function transition_text(value) {
	    return this.tween("text", typeof value === "function" ? textFunction$1(tweenValue(this, "text", value)) : textConstant$1(value == null ? "" : value + ""));
	  };

	  var transition_transition = function transition_transition() {
	    var name = this._name,
	        id0 = this._id,
	        id1 = newId();

	    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	        if (node = group[i]) {
	          var inherit = get$1(node, id0);
	          schedule(node, name, id1, i, group, {
	            time: inherit.time + inherit.delay + inherit.duration,
	            delay: 0,
	            duration: inherit.duration,
	            ease: inherit.ease
	          });
	        }
	      }
	    }

	    return new Transition(groups, this._parents, name, id1);
	  };

	  var id = 0;

	  function Transition(groups, parents, name, id) {
	    this._groups = groups;
	    this._parents = parents;
	    this._name = name;
	    this._id = id;
	  }

	  function transition(name) {
	    return selection().transition(name);
	  }

	  function newId() {
	    return ++id;
	  }

	  var selection_prototype = selection.prototype;

	  Transition.prototype = transition.prototype = {
	    constructor: Transition,
	    select: transition_select,
	    selectAll: transition_selectAll,
	    filter: transition_filter,
	    merge: transition_merge,
	    selection: transition_selection,
	    transition: transition_transition,
	    call: selection_prototype.call,
	    nodes: selection_prototype.nodes,
	    node: selection_prototype.node,
	    size: selection_prototype.size,
	    empty: selection_prototype.empty,
	    each: selection_prototype.each,
	    on: transition_on,
	    attr: transition_attr,
	    attrTween: transition_attrTween,
	    style: transition_style,
	    styleTween: transition_styleTween,
	    text: transition_text,
	    remove: transition_remove,
	    tween: transition_tween,
	    delay: transition_delay,
	    duration: transition_duration,
	    ease: transition_ease
	  };

	  function linear$1(t) {
	    return +t;
	  }

	  function quadIn(t) {
	    return t * t;
	  }

	  function quadOut(t) {
	    return t * (2 - t);
	  }

	  function quadInOut(t) {
	    return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
	  }

	  function cubicIn(t) {
	    return t * t * t;
	  }

	  function cubicOut(t) {
	    return --t * t * t + 1;
	  }

	  function cubicInOut(t) {
	    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	  }

	  var exponent = 3;

	  var polyIn = function custom(e) {
	    e = +e;

	    function polyIn(t) {
	      return Math.pow(t, e);
	    }

	    polyIn.exponent = custom;

	    return polyIn;
	  }(exponent);

	  var polyOut = function custom(e) {
	    e = +e;

	    function polyOut(t) {
	      return 1 - Math.pow(1 - t, e);
	    }

	    polyOut.exponent = custom;

	    return polyOut;
	  }(exponent);

	  var polyInOut = function custom(e) {
	    e = +e;

	    function polyInOut(t) {
	      return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
	    }

	    polyInOut.exponent = custom;

	    return polyInOut;
	  }(exponent);

	  var pi = Math.PI;
	  var halfPi = pi / 2;

	  function sinIn(t) {
	    return 1 - Math.cos(t * halfPi);
	  }

	  function sinOut(t) {
	    return Math.sin(t * halfPi);
	  }

	  function sinInOut(t) {
	    return (1 - Math.cos(pi * t)) / 2;
	  }

	  function expIn(t) {
	    return Math.pow(2, 10 * t - 10);
	  }

	  function expOut(t) {
	    return 1 - Math.pow(2, -10 * t);
	  }

	  function expInOut(t) {
	    return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
	  }

	  function circleIn(t) {
	    return 1 - Math.sqrt(1 - t * t);
	  }

	  function circleOut(t) {
	    return Math.sqrt(1 - --t * t);
	  }

	  function circleInOut(t) {
	    return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
	  }

	  var b1 = 4 / 11;
	  var b2 = 6 / 11;
	  var b3 = 8 / 11;
	  var b4 = 3 / 4;
	  var b5 = 9 / 11;
	  var b6 = 10 / 11;
	  var b7 = 15 / 16;
	  var b8 = 21 / 22;
	  var b9 = 63 / 64;
	  var b0 = 1 / b1 / b1;

	  function bounceIn(t) {
	    return 1 - bounceOut(1 - t);
	  }

	  function bounceOut(t) {
	    return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
	  }

	  function bounceInOut(t) {
	    return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
	  }

	  var overshoot = 1.70158;

	  var backIn = function custom(s) {
	    s = +s;

	    function backIn(t) {
	      return t * t * ((s + 1) * t - s);
	    }

	    backIn.overshoot = custom;

	    return backIn;
	  }(overshoot);

	  var backOut = function custom(s) {
	    s = +s;

	    function backOut(t) {
	      return --t * t * ((s + 1) * t + s) + 1;
	    }

	    backOut.overshoot = custom;

	    return backOut;
	  }(overshoot);

	  var backInOut = function custom(s) {
	    s = +s;

	    function backInOut(t) {
	      return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
	    }

	    backInOut.overshoot = custom;

	    return backInOut;
	  }(overshoot);

	  var tau = 2 * Math.PI;
	  var amplitude = 1;
	  var period = 0.3;

	  var elasticIn = function custom(a, p) {
	    var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	    function elasticIn(t) {
	      return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
	    }

	    elasticIn.amplitude = function (a) {
	      return custom(a, p * tau);
	    };
	    elasticIn.period = function (p) {
	      return custom(a, p);
	    };

	    return elasticIn;
	  }(amplitude, period);

	  var elasticOut = function custom(a, p) {
	    var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	    function elasticOut(t) {
	      return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
	    }

	    elasticOut.amplitude = function (a) {
	      return custom(a, p * tau);
	    };
	    elasticOut.period = function (p) {
	      return custom(a, p);
	    };

	    return elasticOut;
	  }(amplitude, period);

	  var elasticInOut = function custom(a, p) {
	    var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	    function elasticInOut(t) {
	      return ((t = t * 2 - 1) < 0 ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p) : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
	    }

	    elasticInOut.amplitude = function (a) {
	      return custom(a, p * tau);
	    };
	    elasticInOut.period = function (p) {
	      return custom(a, p);
	    };

	    return elasticInOut;
	  }(amplitude, period);

	  var defaultTiming = {
	    time: null, // Set on use.
	    delay: 0,
	    duration: 250,
	    ease: cubicInOut
	  };

	  function inherit(node, id) {
	    var timing;
	    while (!(timing = node.__transition) || !(timing = timing[id])) {
	      if (!(node = node.parentNode)) {
	        return defaultTiming.time = now(), defaultTiming;
	      }
	    }
	    return timing;
	  }

	  var selection_transition = function selection_transition(name) {
	    var id, timing;

	    if (name instanceof Transition) {
	      id = name._id, name = name._name;
	    } else {
	      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
	    }

	    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	        if (node = group[i]) {
	          schedule(node, name, id, i, group, timing || inherit(node, id));
	        }
	      }
	    }

	    return new Transition(groups, this._parents, name, id);
	  };

	  selection.prototype.interrupt = selection_interrupt;
	  selection.prototype.transition = selection_transition;

	  var root$1 = [null];

	  var active = function active(node, name) {
	    var schedules = node.__transition,
	        schedule$$1,
	        i;

	    if (schedules) {
	      name = name == null ? null : name + "";
	      for (i in schedules) {
	        if ((schedule$$1 = schedules[i]).state > SCHEDULED && schedule$$1.name === name) {
	          return new Transition([[node]], root$1, name, +i);
	        }
	      }
	    }

	    return null;
	  };

	  var constant$4 = function constant$4(x) {
	    return function () {
	      return x;
	    };
	  };

	  var BrushEvent = function BrushEvent(target, type, selection) {
	    this.target = target;
	    this.type = type;
	    this.selection = selection;
	  };

	  function nopropagation$1() {
	    exports.event.stopImmediatePropagation();
	  }

	  var noevent$1 = function noevent$1() {
	    exports.event.preventDefault();
	    exports.event.stopImmediatePropagation();
	  };

	  var MODE_DRAG = { name: "drag" };
	  var MODE_SPACE = { name: "space" };
	  var MODE_HANDLE = { name: "handle" };
	  var MODE_CENTER = { name: "center" };

	  var X = {
	    name: "x",
	    handles: ["e", "w"].map(type),
	    input: function input(x, e) {
	      return x && [[x[0], e[0][1]], [x[1], e[1][1]]];
	    },
	    output: function output(xy) {
	      return xy && [xy[0][0], xy[1][0]];
	    }
	  };

	  var Y = {
	    name: "y",
	    handles: ["n", "s"].map(type),
	    input: function input(y, e) {
	      return y && [[e[0][0], y[0]], [e[1][0], y[1]]];
	    },
	    output: function output(xy) {
	      return xy && [xy[0][1], xy[1][1]];
	    }
	  };

	  var XY = {
	    name: "xy",
	    handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(type),
	    input: function input(xy) {
	      return xy;
	    },
	    output: function output(xy) {
	      return xy;
	    }
	  };

	  var cursors = {
	    overlay: "crosshair",
	    selection: "move",
	    n: "ns-resize",
	    e: "ew-resize",
	    s: "ns-resize",
	    w: "ew-resize",
	    nw: "nwse-resize",
	    ne: "nesw-resize",
	    se: "nwse-resize",
	    sw: "nesw-resize"
	  };

	  var flipX = {
	    e: "w",
	    w: "e",
	    nw: "ne",
	    ne: "nw",
	    se: "sw",
	    sw: "se"
	  };

	  var flipY = {
	    n: "s",
	    s: "n",
	    nw: "sw",
	    ne: "se",
	    se: "ne",
	    sw: "nw"
	  };

	  var signsX = {
	    overlay: +1,
	    selection: +1,
	    n: null,
	    e: +1,
	    s: null,
	    w: -1,
	    nw: -1,
	    ne: +1,
	    se: +1,
	    sw: -1
	  };

	  var signsY = {
	    overlay: +1,
	    selection: +1,
	    n: -1,
	    e: null,
	    s: +1,
	    w: null,
	    nw: -1,
	    ne: -1,
	    se: +1,
	    sw: +1
	  };

	  function type(t) {
	    return { type: t };
	  }

	  // Ignore right-click, since that should open the context menu.
	  function defaultFilter() {
	    return !exports.event.button;
	  }

	  function defaultExtent() {
	    var svg = this.ownerSVGElement || this;
	    return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
	  }

	  // Like d3.local, but with the name “__brush” rather than auto-generated.
	  function local$$1(node) {
	    while (!node.__brush) {
	      if (!(node = node.parentNode)) return;
	    }return node.__brush;
	  }

	  function empty(extent) {
	    return extent[0][0] === extent[1][0] || extent[0][1] === extent[1][1];
	  }

	  function brushSelection(node) {
	    var state = node.__brush;
	    return state ? state.dim.output(state.selection) : null;
	  }

	  function brushX() {
	    return brush$1(X);
	  }

	  function brushY() {
	    return brush$1(Y);
	  }

	  var brush = function brush() {
	    return brush$1(XY);
	  };

	  function brush$1(dim) {
	    var extent = defaultExtent,
	        filter = defaultFilter,
	        listeners = dispatch(brush, "start", "brush", "end"),
	        handleSize = 6,
	        touchending;

	    function brush(group) {
	      var overlay = group.property("__brush", initialize).selectAll(".overlay").data([type("overlay")]);

	      overlay.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", cursors.overlay).merge(overlay).each(function () {
	        var extent = local$$1(this).extent;
	        select(this).attr("x", extent[0][0]).attr("y", extent[0][1]).attr("width", extent[1][0] - extent[0][0]).attr("height", extent[1][1] - extent[0][1]);
	      });

	      group.selectAll(".selection").data([type("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", cursors.selection).attr("fill", "#777").attr("fill-opacity", 0.3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");

	      var handle = group.selectAll(".handle").data(dim.handles, function (d) {
	        return d.type;
	      });

	      handle.exit().remove();

	      handle.enter().append("rect").attr("class", function (d) {
	        return "handle handle--" + d.type;
	      }).attr("cursor", function (d) {
	        return cursors[d.type];
	      });

	      group.each(redraw).attr("fill", "none").attr("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush touchstart.brush", started);
	    }

	    brush.move = function (group, selection) {
	      if (group.selection) {
	        group.on("start.brush", function () {
	          emitter(this, arguments).beforestart().start();
	        }).on("interrupt.brush end.brush", function () {
	          emitter(this, arguments).end();
	        }).tween("brush", function () {
	          var that = this,
	              state = that.__brush,
	              emit = emitter(that, arguments),
	              selection0 = state.selection,
	              selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent),
	              i = interpolateValue(selection0, selection1);

	          function tween(t) {
	            state.selection = t === 1 && empty(selection1) ? null : i(t);
	            redraw.call(that);
	            emit.brush();
	          }

	          return selection0 && selection1 ? tween : tween(1);
	        });
	      } else {
	        group.each(function () {
	          var that = this,
	              args = arguments,
	              state = that.__brush,
	              selection1 = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent),
	              emit = emitter(that, args).beforestart();

	          interrupt(that);
	          state.selection = selection1 == null || empty(selection1) ? null : selection1;
	          redraw.call(that);
	          emit.start().brush().end();
	        });
	      }
	    };

	    function redraw() {
	      var group = select(this),
	          selection = local$$1(this).selection;

	      if (selection) {
	        group.selectAll(".selection").style("display", null).attr("x", selection[0][0]).attr("y", selection[0][1]).attr("width", selection[1][0] - selection[0][0]).attr("height", selection[1][1] - selection[0][1]);

	        group.selectAll(".handle").style("display", null).attr("x", function (d) {
	          return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2;
	        }).attr("y", function (d) {
	          return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2;
	        }).attr("width", function (d) {
	          return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize;
	        }).attr("height", function (d) {
	          return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize;
	        });
	      } else {
	        group.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
	      }
	    }

	    function emitter(that, args) {
	      return that.__brush.emitter || new Emitter(that, args);
	    }

	    function Emitter(that, args) {
	      this.that = that;
	      this.args = args;
	      this.state = that.__brush;
	      this.active = 0;
	    }

	    Emitter.prototype = {
	      beforestart: function beforestart() {
	        if (++this.active === 1) this.state.emitter = this, this.starting = true;
	        return this;
	      },
	      start: function start() {
	        if (this.starting) this.starting = false, this.emit("start");
	        return this;
	      },
	      brush: function brush() {
	        this.emit("brush");
	        return this;
	      },
	      end: function end() {
	        if (--this.active === 0) delete this.state.emitter, this.emit("end");
	        return this;
	      },
	      emit: function emit(type) {
	        customEvent(new BrushEvent(brush, type, dim.output(this.state.selection)), listeners.apply, listeners, [type, this.that, this.args]);
	      }
	    };

	    function started() {
	      if (exports.event.touches) {
	        if (exports.event.changedTouches.length < exports.event.touches.length) return noevent$1();
	      } else if (touchending) return;
	      if (!filter.apply(this, arguments)) return;

	      var that = this,
	          type = exports.event.target.__data__.type,
	          mode = (exports.event.metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : exports.event.altKey ? MODE_CENTER : MODE_HANDLE,
	          signX = dim === Y ? null : signsX[type],
	          signY = dim === X ? null : signsY[type],
	          state = local$$1(that),
	          extent = state.extent,
	          selection = state.selection,
	          W = extent[0][0],
	          w0,
	          w1,
	          N = extent[0][1],
	          n0,
	          n1,
	          E = extent[1][0],
	          e0,
	          e1,
	          S = extent[1][1],
	          s0,
	          s1,
	          dx,
	          dy,
	          moving,
	          shifting = signX && signY && exports.event.shiftKey,
	          lockX,
	          lockY,
	          point0 = mouse(that),
	          point = point0,
	          emit = emitter(that, arguments).beforestart();

	      if (type === "overlay") {
	        state.selection = selection = [[w0 = dim === Y ? W : point0[0], n0 = dim === X ? N : point0[1]], [e0 = dim === Y ? E : w0, s0 = dim === X ? S : n0]];
	      } else {
	        w0 = selection[0][0];
	        n0 = selection[0][1];
	        e0 = selection[1][0];
	        s0 = selection[1][1];
	      }

	      w1 = w0;
	      n1 = n0;
	      e1 = e0;
	      s1 = s0;

	      var group = select(that).attr("pointer-events", "none");

	      var overlay = group.selectAll(".overlay").attr("cursor", cursors[type]);

	      if (exports.event.touches) {
	        group.on("touchmove.brush", moved, true).on("touchend.brush touchcancel.brush", ended, true);
	      } else {
	        var view = select(exports.event.view).on("keydown.brush", keydowned, true).on("keyup.brush", keyupped, true).on("mousemove.brush", moved, true).on("mouseup.brush", ended, true);

	        dragDisable(exports.event.view);
	      }

	      nopropagation$1();
	      interrupt(that);
	      redraw.call(that);
	      emit.start();

	      function moved() {
	        var point1 = mouse(that);
	        if (shifting && !lockX && !lockY) {
	          if (Math.abs(point1[0] - point[0]) > Math.abs(point1[1] - point[1])) lockY = true;else lockX = true;
	        }
	        point = point1;
	        moving = true;
	        noevent$1();
	        move();
	      }

	      function move() {
	        var t;

	        dx = point[0] - point0[0];
	        dy = point[1] - point0[1];

	        switch (mode) {
	          case MODE_SPACE:
	          case MODE_DRAG:
	            {
	              if (signX) dx = Math.max(W - w0, Math.min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
	              if (signY) dy = Math.max(N - n0, Math.min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
	              break;
	            }
	          case MODE_HANDLE:
	            {
	              if (signX < 0) dx = Math.max(W - w0, Math.min(E - w0, dx)), w1 = w0 + dx, e1 = e0;else if (signX > 0) dx = Math.max(W - e0, Math.min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
	              if (signY < 0) dy = Math.max(N - n0, Math.min(S - n0, dy)), n1 = n0 + dy, s1 = s0;else if (signY > 0) dy = Math.max(N - s0, Math.min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
	              break;
	            }
	          case MODE_CENTER:
	            {
	              if (signX) w1 = Math.max(W, Math.min(E, w0 - dx * signX)), e1 = Math.max(W, Math.min(E, e0 + dx * signX));
	              if (signY) n1 = Math.max(N, Math.min(S, n0 - dy * signY)), s1 = Math.max(N, Math.min(S, s0 + dy * signY));
	              break;
	            }
	        }

	        if (e1 < w1) {
	          signX *= -1;
	          t = w0, w0 = e0, e0 = t;
	          t = w1, w1 = e1, e1 = t;
	          if (type in flipX) overlay.attr("cursor", cursors[type = flipX[type]]);
	        }

	        if (s1 < n1) {
	          signY *= -1;
	          t = n0, n0 = s0, s0 = t;
	          t = n1, n1 = s1, s1 = t;
	          if (type in flipY) overlay.attr("cursor", cursors[type = flipY[type]]);
	        }

	        if (state.selection) selection = state.selection; // May be set by brush.move!
	        if (lockX) w1 = selection[0][0], e1 = selection[1][0];
	        if (lockY) n1 = selection[0][1], s1 = selection[1][1];

	        if (selection[0][0] !== w1 || selection[0][1] !== n1 || selection[1][0] !== e1 || selection[1][1] !== s1) {
	          state.selection = [[w1, n1], [e1, s1]];
	          redraw.call(that);
	          emit.brush();
	        }
	      }

	      function ended() {
	        nopropagation$1();
	        if (exports.event.touches) {
	          if (exports.event.touches.length) return;
	          if (touchending) clearTimeout(touchending);
	          touchending = setTimeout(function () {
	            touchending = null;
	          }, 500); // Ghost clicks are delayed!
	          group.on("touchmove.brush touchend.brush touchcancel.brush", null);
	        } else {
	          yesdrag(exports.event.view, moving);
	          view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
	        }
	        group.attr("pointer-events", "all");
	        overlay.attr("cursor", cursors.overlay);
	        if (state.selection) selection = state.selection; // May be set by brush.move (on start)!
	        if (empty(selection)) state.selection = null, redraw.call(that);
	        emit.end();
	      }

	      function keydowned() {
	        switch (exports.event.keyCode) {
	          case 16:
	            {
	              // SHIFT
	              shifting = signX && signY;
	              break;
	            }
	          case 18:
	            {
	              // ALT
	              if (mode === MODE_HANDLE) {
	                if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
	                if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
	                mode = MODE_CENTER;
	                move();
	              }
	              break;
	            }
	          case 32:
	            {
	              // SPACE; takes priority over ALT
	              if (mode === MODE_HANDLE || mode === MODE_CENTER) {
	                if (signX < 0) e0 = e1 - dx;else if (signX > 0) w0 = w1 - dx;
	                if (signY < 0) s0 = s1 - dy;else if (signY > 0) n0 = n1 - dy;
	                mode = MODE_SPACE;
	                overlay.attr("cursor", cursors.selection);
	                move();
	              }
	              break;
	            }
	          default:
	            return;
	        }
	        noevent$1();
	      }

	      function keyupped() {
	        switch (exports.event.keyCode) {
	          case 16:
	            {
	              // SHIFT
	              if (shifting) {
	                lockX = lockY = shifting = false;
	                move();
	              }
	              break;
	            }
	          case 18:
	            {
	              // ALT
	              if (mode === MODE_CENTER) {
	                if (signX < 0) e0 = e1;else if (signX > 0) w0 = w1;
	                if (signY < 0) s0 = s1;else if (signY > 0) n0 = n1;
	                mode = MODE_HANDLE;
	                move();
	              }
	              break;
	            }
	          case 32:
	            {
	              // SPACE
	              if (mode === MODE_SPACE) {
	                if (exports.event.altKey) {
	                  if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
	                  if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
	                  mode = MODE_CENTER;
	                } else {
	                  if (signX < 0) e0 = e1;else if (signX > 0) w0 = w1;
	                  if (signY < 0) s0 = s1;else if (signY > 0) n0 = n1;
	                  mode = MODE_HANDLE;
	                }
	                overlay.attr("cursor", cursors[type]);
	                move();
	              }
	              break;
	            }
	          default:
	            return;
	        }
	        noevent$1();
	      }
	    }

	    function initialize() {
	      var state = this.__brush || { selection: null };
	      state.extent = extent.apply(this, arguments);
	      state.dim = dim;
	      return state;
	    }

	    brush.extent = function (_) {
	      return arguments.length ? (extent = typeof _ === "function" ? _ : constant$4([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), brush) : extent;
	    };

	    brush.filter = function (_) {
	      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$4(!!_), brush) : filter;
	    };

	    brush.handleSize = function (_) {
	      return arguments.length ? (handleSize = +_, brush) : handleSize;
	    };

	    brush.on = function () {
	      var value = listeners.on.apply(listeners, arguments);
	      return value === listeners ? brush : value;
	    };

	    return brush;
	  }

	  var cos = Math.cos;
	  var sin = Math.sin;
	  var pi$1 = Math.PI;
	  var halfPi$1 = pi$1 / 2;
	  var tau$1 = pi$1 * 2;
	  var max$1 = Math.max;

	  function compareValue(compare) {
	    return function (a, b) {
	      return compare(a.source.value + a.target.value, b.source.value + b.target.value);
	    };
	  }

	  var chord = function chord() {
	    var padAngle = 0,
	        sortGroups = null,
	        sortSubgroups = null,
	        sortChords = null;

	    function chord(matrix) {
	      var n = matrix.length,
	          groupSums = [],
	          groupIndex = sequence(n),
	          subgroupIndex = [],
	          chords = [],
	          groups = chords.groups = new Array(n),
	          subgroups = new Array(n * n),
	          k,
	          x,
	          x0,
	          dx,
	          i,
	          j;

	      // Compute the sum.
	      k = 0, i = -1;while (++i < n) {
	        x = 0, j = -1;while (++j < n) {
	          x += matrix[i][j];
	        }
	        groupSums.push(x);
	        subgroupIndex.push(sequence(n));
	        k += x;
	      }

	      // Sort groups…
	      if (sortGroups) groupIndex.sort(function (a, b) {
	        return sortGroups(groupSums[a], groupSums[b]);
	      });

	      // Sort subgroups…
	      if (sortSubgroups) subgroupIndex.forEach(function (d, i) {
	        d.sort(function (a, b) {
	          return sortSubgroups(matrix[i][a], matrix[i][b]);
	        });
	      });

	      // Convert the sum to scaling factor for [0, 2pi].
	      // TODO Allow start and end angle to be specified?
	      // TODO Allow padding to be specified as percentage?
	      k = max$1(0, tau$1 - padAngle * n) / k;
	      dx = k ? padAngle : tau$1 / n;

	      // Compute the start and end angle for each group and subgroup.
	      // Note: Opera has a bug reordering object literal properties!
	      x = 0, i = -1;while (++i < n) {
	        x0 = x, j = -1;while (++j < n) {
	          var di = groupIndex[i],
	              dj = subgroupIndex[di][j],
	              v = matrix[di][dj],
	              a0 = x,
	              a1 = x += v * k;
	          subgroups[dj * n + di] = {
	            index: di,
	            subindex: dj,
	            startAngle: a0,
	            endAngle: a1,
	            value: v
	          };
	        }
	        groups[di] = {
	          index: di,
	          startAngle: x0,
	          endAngle: x,
	          value: groupSums[di]
	        };
	        x += dx;
	      }

	      // Generate chords for each (non-empty) subgroup-subgroup link.
	      i = -1;while (++i < n) {
	        j = i - 1;while (++j < n) {
	          var source = subgroups[j * n + i],
	              target = subgroups[i * n + j];
	          if (source.value || target.value) {
	            chords.push(source.value < target.value ? { source: target, target: source } : { source: source, target: target });
	          }
	        }
	      }

	      return sortChords ? chords.sort(sortChords) : chords;
	    }

	    chord.padAngle = function (_) {
	      return arguments.length ? (padAngle = max$1(0, _), chord) : padAngle;
	    };

	    chord.sortGroups = function (_) {
	      return arguments.length ? (sortGroups = _, chord) : sortGroups;
	    };

	    chord.sortSubgroups = function (_) {
	      return arguments.length ? (sortSubgroups = _, chord) : sortSubgroups;
	    };

	    chord.sortChords = function (_) {
	      return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord) : sortChords && sortChords._;
	    };

	    return chord;
	  };

	  var slice$2 = Array.prototype.slice;

	  var constant$5 = function constant$5(x) {
	    return function () {
	      return x;
	    };
	  };

	  var pi$2 = Math.PI;
	  var tau$2 = 2 * pi$2;
	  var epsilon$1 = 1e-6;
	  var tauEpsilon = tau$2 - epsilon$1;

	  function Path() {
	    this._x0 = this._y0 = // start of current subpath
	    this._x1 = this._y1 = null; // end of current subpath
	    this._ = "";
	  }

	  function path() {
	    return new Path();
	  }

	  Path.prototype = path.prototype = {
	    constructor: Path,
	    moveTo: function moveTo(x, y) {
	      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
	    },
	    closePath: function closePath() {
	      if (this._x1 !== null) {
	        this._x1 = this._x0, this._y1 = this._y0;
	        this._ += "Z";
	      }
	    },
	    lineTo: function lineTo(x, y) {
	      this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
	    },
	    quadraticCurveTo: function quadraticCurveTo(x1, y1, x, y) {
	      this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	    },
	    bezierCurveTo: function bezierCurveTo(x1, y1, x2, y2, x, y) {
	      this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	    },
	    arcTo: function arcTo(x1, y1, x2, y2, r) {
	      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
	      var x0 = this._x1,
	          y0 = this._y1,
	          x21 = x2 - x1,
	          y21 = y2 - y1,
	          x01 = x0 - x1,
	          y01 = y0 - y1,
	          l01_2 = x01 * x01 + y01 * y01;

	      // Is the radius negative? Error.
	      if (r < 0) throw new Error("negative radius: " + r);

	      // Is this path empty? Move to (x1,y1).
	      if (this._x1 === null) {
	        this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
	      }

	      // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
	      else if (!(l01_2 > epsilon$1)) {}

	        // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
	        // Equivalently, is (x1,y1) coincident with (x2,y2)?
	        // Or, is the radius zero? Line to (x1,y1).
	        else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
	            this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
	          }

	          // Otherwise, draw an arc!
	          else {
	              var x20 = x2 - x0,
	                  y20 = y2 - y0,
	                  l21_2 = x21 * x21 + y21 * y21,
	                  l20_2 = x20 * x20 + y20 * y20,
	                  l21 = Math.sqrt(l21_2),
	                  l01 = Math.sqrt(l01_2),
	                  l = r * Math.tan((pi$2 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
	                  t01 = l / l01,
	                  t21 = l / l21;

	              // If the start tangent is not coincident with (x0,y0), line to.
	              if (Math.abs(t01 - 1) > epsilon$1) {
	                this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
	              }

	              this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
	            }
	    },
	    arc: function arc(x, y, r, a0, a1, ccw) {
	      x = +x, y = +y, r = +r;
	      var dx = r * Math.cos(a0),
	          dy = r * Math.sin(a0),
	          x0 = x + dx,
	          y0 = y + dy,
	          cw = 1 ^ ccw,
	          da = ccw ? a0 - a1 : a1 - a0;

	      // Is the radius negative? Error.
	      if (r < 0) throw new Error("negative radius: " + r);

	      // Is this path empty? Move to (x0,y0).
	      if (this._x1 === null) {
	        this._ += "M" + x0 + "," + y0;
	      }

	      // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
	      else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
	          this._ += "L" + x0 + "," + y0;
	        }

	      // Is this arc empty? We’re done.
	      if (!r) return;

	      // Does the angle go the wrong way? Flip the direction.
	      if (da < 0) da = da % tau$2 + tau$2;

	      // Is this a complete circle? Draw two arcs to complete the circle.
	      if (da > tauEpsilon) {
	        this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
	      }

	      // Is this arc non-empty? Draw an arc!
	      else if (da > epsilon$1) {
	          this._ += "A" + r + "," + r + ",0," + +(da >= pi$2) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
	        }
	    },
	    rect: function rect(x, y, w, h) {
	      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
	    },
	    toString: function toString() {
	      return this._;
	    }
	  };

	  function defaultSource(d) {
	    return d.source;
	  }

	  function defaultTarget(d) {
	    return d.target;
	  }

	  function defaultRadius(d) {
	    return d.radius;
	  }

	  function defaultStartAngle(d) {
	    return d.startAngle;
	  }

	  function defaultEndAngle(d) {
	    return d.endAngle;
	  }

	  var ribbon = function ribbon() {
	    var source = defaultSource,
	        target = defaultTarget,
	        radius = defaultRadius,
	        startAngle = defaultStartAngle,
	        endAngle = defaultEndAngle,
	        context = null;

	    function ribbon() {
	      var buffer,
	          argv = slice$2.call(arguments),
	          s = source.apply(this, argv),
	          t = target.apply(this, argv),
	          sr = +radius.apply(this, (argv[0] = s, argv)),
	          sa0 = startAngle.apply(this, argv) - halfPi$1,
	          sa1 = endAngle.apply(this, argv) - halfPi$1,
	          sx0 = sr * cos(sa0),
	          sy0 = sr * sin(sa0),
	          tr = +radius.apply(this, (argv[0] = t, argv)),
	          ta0 = startAngle.apply(this, argv) - halfPi$1,
	          ta1 = endAngle.apply(this, argv) - halfPi$1;

	      if (!context) context = buffer = path();

	      context.moveTo(sx0, sy0);
	      context.arc(0, 0, sr, sa0, sa1);
	      if (sa0 !== ta0 || sa1 !== ta1) {
	        // TODO sr !== tr?
	        context.quadraticCurveTo(0, 0, tr * cos(ta0), tr * sin(ta0));
	        context.arc(0, 0, tr, ta0, ta1);
	      }
	      context.quadraticCurveTo(0, 0, sx0, sy0);
	      context.closePath();

	      if (buffer) return context = null, buffer + "" || null;
	    }

	    ribbon.radius = function (_) {
	      return arguments.length ? (radius = typeof _ === "function" ? _ : constant$5(+_), ribbon) : radius;
	    };

	    ribbon.startAngle = function (_) {
	      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$5(+_), ribbon) : startAngle;
	    };

	    ribbon.endAngle = function (_) {
	      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$5(+_), ribbon) : endAngle;
	    };

	    ribbon.source = function (_) {
	      return arguments.length ? (source = _, ribbon) : source;
	    };

	    ribbon.target = function (_) {
	      return arguments.length ? (target = _, ribbon) : target;
	    };

	    ribbon.context = function (_) {
	      return arguments.length ? (context = _ == null ? null : _, ribbon) : context;
	    };

	    return ribbon;
	  };

	  var prefix = "$";

	  function Map() {}

	  Map.prototype = map$1.prototype = {
	    constructor: Map,
	    has: function has(key) {
	      return prefix + key in this;
	    },
	    get: function get(key) {
	      return this[prefix + key];
	    },
	    set: function set(key, value) {
	      this[prefix + key] = value;
	      return this;
	    },
	    remove: function remove(key) {
	      var property = prefix + key;
	      return property in this && delete this[property];
	    },
	    clear: function clear() {
	      for (var property in this) {
	        if (property[0] === prefix) delete this[property];
	      }
	    },
	    keys: function keys() {
	      var keys = [];
	      for (var property in this) {
	        if (property[0] === prefix) keys.push(property.slice(1));
	      }return keys;
	    },
	    values: function values() {
	      var values = [];
	      for (var property in this) {
	        if (property[0] === prefix) values.push(this[property]);
	      }return values;
	    },
	    entries: function entries() {
	      var entries = [];
	      for (var property in this) {
	        if (property[0] === prefix) entries.push({ key: property.slice(1), value: this[property] });
	      }return entries;
	    },
	    size: function size() {
	      var size = 0;
	      for (var property in this) {
	        if (property[0] === prefix) ++size;
	      }return size;
	    },
	    empty: function empty() {
	      for (var property in this) {
	        if (property[0] === prefix) return false;
	      }return true;
	    },
	    each: function each(f) {
	      for (var property in this) {
	        if (property[0] === prefix) f(this[property], property.slice(1), this);
	      }
	    }
	  };

	  function map$1(object, f) {
	    var map = new Map();

	    // Copy constructor.
	    if (object instanceof Map) object.each(function (value, key) {
	      map.set(key, value);
	    });

	    // Index array by numeric index or specified key function.
	    else if (Array.isArray(object)) {
	        var i = -1,
	            n = object.length,
	            o;

	        if (f == null) while (++i < n) {
	          map.set(i, object[i]);
	        } else while (++i < n) {
	          map.set(f(o = object[i], i, object), o);
	        }
	      }

	      // Convert object to map.
	      else if (object) for (var key in object) {
	          map.set(key, object[key]);
	        }return map;
	  }

	  var nest = function nest() {
	    var keys = [],
	        _sortKeys = [],
	        _sortValues,
	        _rollup,
	        nest;

	    function apply(array, depth, createResult, setResult) {
	      if (depth >= keys.length) {
	        if (_sortValues != null) array.sort(_sortValues);
	        return _rollup != null ? _rollup(array) : array;
	      }

	      var i = -1,
	          n = array.length,
	          key = keys[depth++],
	          keyValue,
	          value,
	          valuesByKey = map$1(),
	          values,
	          result = createResult();

	      while (++i < n) {
	        if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
	          values.push(value);
	        } else {
	          valuesByKey.set(keyValue, [value]);
	        }
	      }

	      valuesByKey.each(function (values, key) {
	        setResult(result, key, apply(values, depth, createResult, setResult));
	      });

	      return result;
	    }

	    function _entries(map, depth) {
	      if (++depth > keys.length) return map;
	      var array,
	          sortKey = _sortKeys[depth - 1];
	      if (_rollup != null && depth >= keys.length) array = map.entries();else array = [], map.each(function (v, k) {
	        array.push({ key: k, values: _entries(v, depth) });
	      });
	      return sortKey != null ? array.sort(function (a, b) {
	        return sortKey(a.key, b.key);
	      }) : array;
	    }

	    return nest = {
	      object: function object(array) {
	        return apply(array, 0, createObject, setObject);
	      },
	      map: function map(array) {
	        return apply(array, 0, createMap, setMap);
	      },
	      entries: function entries(array) {
	        return _entries(apply(array, 0, createMap, setMap), 0);
	      },
	      key: function key(d) {
	        keys.push(d);return nest;
	      },
	      sortKeys: function sortKeys(order) {
	        _sortKeys[keys.length - 1] = order;return nest;
	      },
	      sortValues: function sortValues(order) {
	        _sortValues = order;return nest;
	      },
	      rollup: function rollup(f) {
	        _rollup = f;return nest;
	      }
	    };
	  };

	  function createObject() {
	    return {};
	  }

	  function setObject(object, key, value) {
	    object[key] = value;
	  }

	  function createMap() {
	    return map$1();
	  }

	  function setMap(map, key, value) {
	    map.set(key, value);
	  }

	  function Set() {}

	  var proto = map$1.prototype;

	  Set.prototype = set$2.prototype = {
	    constructor: Set,
	    has: proto.has,
	    add: function add(value) {
	      value += "";
	      this[prefix + value] = value;
	      return this;
	    },
	    remove: proto.remove,
	    clear: proto.clear,
	    values: proto.keys,
	    size: proto.size,
	    empty: proto.empty,
	    each: proto.each
	  };

	  function set$2(object, f) {
	    var set = new Set();

	    // Copy constructor.
	    if (object instanceof Set) object.each(function (value) {
	      set.add(value);
	    });

	    // Otherwise, assume it’s an array.
	    else if (object) {
	        var i = -1,
	            n = object.length;
	        if (f == null) while (++i < n) {
	          set.add(object[i]);
	        } else while (++i < n) {
	          set.add(f(object[i], i, object));
	        }
	      }

	    return set;
	  }

	  var keys = function keys(map) {
	    var keys = [];
	    for (var key in map) {
	      keys.push(key);
	    }return keys;
	  };

	  var values = function values(map) {
	    var values = [];
	    for (var key in map) {
	      values.push(map[key]);
	    }return values;
	  };

	  var entries = function entries(map) {
	    var entries = [];
	    for (var key in map) {
	      entries.push({ key: key, value: map[key] });
	    }return entries;
	  };

	  function objectConverter(columns) {
	    return new Function("d", "return {" + columns.map(function (name, i) {
	      return JSON.stringify(name) + ": d[" + i + "]";
	    }).join(",") + "}");
	  }

	  function customConverter(columns, f) {
	    var object = objectConverter(columns);
	    return function (row, i) {
	      return f(object(row), i, columns);
	    };
	  }

	  // Compute unique columns in order of discovery.
	  function inferColumns(rows) {
	    var columnSet = Object.create(null),
	        columns = [];

	    rows.forEach(function (row) {
	      for (var column in row) {
	        if (!(column in columnSet)) {
	          columns.push(columnSet[column] = column);
	        }
	      }
	    });

	    return columns;
	  }

	  var dsv = function dsv(delimiter) {
	    var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
	        delimiterCode = delimiter.charCodeAt(0);

	    function parse(text, f) {
	      var convert,
	          columns,
	          rows = parseRows(text, function (row, i) {
	        if (convert) return convert(row, i - 1);
	        columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
	      });
	      rows.columns = columns;
	      return rows;
	    }

	    function parseRows(text, f) {
	      var EOL = {},
	          // sentinel value for end-of-line
	      EOF = {},
	          // sentinel value for end-of-file
	      rows = [],
	          // output rows
	      N = text.length,
	          I = 0,
	          // current character index
	      n = 0,
	          // the current line number
	      t,
	          // the current token
	      eol; // is the current token followed by EOL?

	      function token() {
	        if (I >= N) return EOF; // special case: end of file
	        if (eol) return eol = false, EOL; // special case: end of line

	        // special case: quotes
	        var j = I,
	            c;
	        if (text.charCodeAt(j) === 34) {
	          var i = j;
	          while (i++ < N) {
	            if (text.charCodeAt(i) === 34) {
	              if (text.charCodeAt(i + 1) !== 34) break;
	              ++i;
	            }
	          }
	          I = i + 2;
	          c = text.charCodeAt(i + 1);
	          if (c === 13) {
	            eol = true;
	            if (text.charCodeAt(i + 2) === 10) ++I;
	          } else if (c === 10) {
	            eol = true;
	          }
	          return text.slice(j + 1, i).replace(/""/g, "\"");
	        }

	        // common case: find next delimiter or newline
	        while (I < N) {
	          var k = 1;
	          c = text.charCodeAt(I++);
	          if (c === 10) eol = true; // \n
	          else if (c === 13) {
	              eol = true;if (text.charCodeAt(I) === 10) ++I, ++k;
	            } // \r|\r\n
	            else if (c !== delimiterCode) continue;
	          return text.slice(j, I - k);
	        }

	        // special case: last token before EOF
	        return text.slice(j);
	      }

	      while ((t = token()) !== EOF) {
	        var a = [];
	        while (t !== EOL && t !== EOF) {
	          a.push(t);
	          t = token();
	        }
	        if (f && (a = f(a, n++)) == null) continue;
	        rows.push(a);
	      }

	      return rows;
	    }

	    function format(rows, columns) {
	      if (columns == null) columns = inferColumns(rows);
	      return [columns.map(formatValue).join(delimiter)].concat(rows.map(function (row) {
	        return columns.map(function (column) {
	          return formatValue(row[column]);
	        }).join(delimiter);
	      })).join("\n");
	    }

	    function formatRows(rows) {
	      return rows.map(formatRow).join("\n");
	    }

	    function formatRow(row) {
	      return row.map(formatValue).join(delimiter);
	    }

	    function formatValue(text) {
	      return text == null ? "" : reFormat.test(text += "") ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
	    }

	    return {
	      parse: parse,
	      parseRows: parseRows,
	      format: format,
	      formatRows: formatRows
	    };
	  };

	  var csv = dsv(",");

	  var csvParse = csv.parse;
	  var csvParseRows = csv.parseRows;
	  var csvFormat = csv.format;
	  var csvFormatRows = csv.formatRows;

	  var tsv = dsv("\t");

	  var tsvParse = tsv.parse;
	  var tsvParseRows = tsv.parseRows;
	  var tsvFormat = tsv.format;
	  var tsvFormatRows = tsv.formatRows;

	  var center$1 = function center$1(x, y) {
	    var nodes;

	    if (x == null) x = 0;
	    if (y == null) y = 0;

	    function force() {
	      var i,
	          n = nodes.length,
	          node,
	          sx = 0,
	          sy = 0;

	      for (i = 0; i < n; ++i) {
	        node = nodes[i], sx += node.x, sy += node.y;
	      }

	      for (sx = sx / n - x, sy = sy / n - y, i = 0; i < n; ++i) {
	        node = nodes[i], node.x -= sx, node.y -= sy;
	      }
	    }

	    force.initialize = function (_) {
	      nodes = _;
	    };

	    force.x = function (_) {
	      return arguments.length ? (x = +_, force) : x;
	    };

	    force.y = function (_) {
	      return arguments.length ? (y = +_, force) : y;
	    };

	    return force;
	  };

	  var constant$6 = function constant$6(x) {
	    return function () {
	      return x;
	    };
	  };

	  var jiggle = function jiggle() {
	    return (Math.random() - 0.5) * 1e-6;
	  };

	  var tree_add = function tree_add(d) {
	    var x = +this._x.call(null, d),
	        y = +this._y.call(null, d);
	    return add(this.cover(x, y), x, y, d);
	  };

	  function add(tree, x, y, d) {
	    if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

	    var parent,
	        node = tree._root,
	        leaf = { data: d },
	        x0 = tree._x0,
	        y0 = tree._y0,
	        x1 = tree._x1,
	        y1 = tree._y1,
	        xm,
	        ym,
	        xp,
	        yp,
	        right,
	        bottom,
	        i,
	        j;

	    // If the tree is empty, initialize the root as a leaf.
	    if (!node) return tree._root = leaf, tree;

	    // Find the existing leaf for the new point, or add it.
	    while (node.length) {
	      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
	      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
	      if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
	    }

	    // Is the new point is exactly coincident with the existing point?
	    xp = +tree._x.call(null, node.data);
	    yp = +tree._y.call(null, node.data);
	    if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

	    // Otherwise, split the leaf node until the old and new point are separated.
	    do {
	      parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
	      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
	      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
	    } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
	    return parent[j] = node, parent[i] = leaf, tree;
	  }

	  function addAll(data) {
	    var d,
	        i,
	        n = data.length,
	        x,
	        y,
	        xz = new Array(n),
	        yz = new Array(n),
	        x0 = Infinity,
	        y0 = Infinity,
	        x1 = -Infinity,
	        y1 = -Infinity;

	    // Compute the points and their extent.
	    for (i = 0; i < n; ++i) {
	      if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
	      xz[i] = x;
	      yz[i] = y;
	      if (x < x0) x0 = x;
	      if (x > x1) x1 = x;
	      if (y < y0) y0 = y;
	      if (y > y1) y1 = y;
	    }

	    // If there were no (valid) points, inherit the existing extent.
	    if (x1 < x0) x0 = this._x0, x1 = this._x1;
	    if (y1 < y0) y0 = this._y0, y1 = this._y1;

	    // Expand the tree to cover the new points.
	    this.cover(x0, y0).cover(x1, y1);

	    // Add the new points.
	    for (i = 0; i < n; ++i) {
	      add(this, xz[i], yz[i], data[i]);
	    }

	    return this;
	  }

	  var tree_cover = function tree_cover(x, y) {
	    if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

	    var x0 = this._x0,
	        y0 = this._y0,
	        x1 = this._x1,
	        y1 = this._y1;

	    // If the quadtree has no extent, initialize them.
	    // Integer extent are necessary so that if we later double the extent,
	    // the existing quadrant boundaries don’t change due to floating point error!
	    if (isNaN(x0)) {
	      x1 = (x0 = Math.floor(x)) + 1;
	      y1 = (y0 = Math.floor(y)) + 1;
	    }

	    // Otherwise, double repeatedly to cover.
	    else if (x0 > x || x > x1 || y0 > y || y > y1) {
	        var z = x1 - x0,
	            node = this._root,
	            parent,
	            i;

	        switch (i = (y < (y0 + y1) / 2) << 1 | x < (x0 + x1) / 2) {
	          case 0:
	            {
	              do {
	                parent = new Array(4), parent[i] = node, node = parent;
	              } while ((z *= 2, x1 = x0 + z, y1 = y0 + z, x > x1 || y > y1));
	              break;
	            }
	          case 1:
	            {
	              do {
	                parent = new Array(4), parent[i] = node, node = parent;
	              } while ((z *= 2, x0 = x1 - z, y1 = y0 + z, x0 > x || y > y1));
	              break;
	            }
	          case 2:
	            {
	              do {
	                parent = new Array(4), parent[i] = node, node = parent;
	              } while ((z *= 2, x1 = x0 + z, y0 = y1 - z, x > x1 || y0 > y));
	              break;
	            }
	          case 3:
	            {
	              do {
	                parent = new Array(4), parent[i] = node, node = parent;
	              } while ((z *= 2, x0 = x1 - z, y0 = y1 - z, x0 > x || y0 > y));
	              break;
	            }
	        }

	        if (this._root && this._root.length) this._root = node;
	      }

	      // If the quadtree covers the point already, just return.
	      else return this;

	    this._x0 = x0;
	    this._y0 = y0;
	    this._x1 = x1;
	    this._y1 = y1;
	    return this;
	  };

	  var tree_data = function tree_data() {
	    var data = [];
	    this.visit(function (node) {
	      if (!node.length) do {
	        data.push(node.data);
	      } while (node = node.next);
	    });
	    return data;
	  };

	  var tree_extent = function tree_extent(_) {
	    return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
	  };

	  var Quad = function Quad(node, x0, y0, x1, y1) {
	    this.node = node;
	    this.x0 = x0;
	    this.y0 = y0;
	    this.x1 = x1;
	    this.y1 = y1;
	  };

	  var tree_find = function tree_find(x, y, radius) {
	    var data,
	        x0 = this._x0,
	        y0 = this._y0,
	        x1,
	        y1,
	        x2,
	        y2,
	        x3 = this._x1,
	        y3 = this._y1,
	        quads = [],
	        node = this._root,
	        q,
	        i;

	    if (node) quads.push(new Quad(node, x0, y0, x3, y3));
	    if (radius == null) radius = Infinity;else {
	      x0 = x - radius, y0 = y - radius;
	      x3 = x + radius, y3 = y + radius;
	      radius *= radius;
	    }

	    while (q = quads.pop()) {

	      // Stop searching if this quadrant can’t contain a closer node.
	      if (!(node = q.node) || (x1 = q.x0) > x3 || (y1 = q.y0) > y3 || (x2 = q.x1) < x0 || (y2 = q.y1) < y0) continue;

	      // Bisect the current quadrant.
	      if (node.length) {
	        var xm = (x1 + x2) / 2,
	            ym = (y1 + y2) / 2;

	        quads.push(new Quad(node[3], xm, ym, x2, y2), new Quad(node[2], x1, ym, xm, y2), new Quad(node[1], xm, y1, x2, ym), new Quad(node[0], x1, y1, xm, ym));

	        // Visit the closest quadrant first.
	        if (i = (y >= ym) << 1 | x >= xm) {
	          q = quads[quads.length - 1];
	          quads[quads.length - 1] = quads[quads.length - 1 - i];
	          quads[quads.length - 1 - i] = q;
	        }
	      }

	      // Visit this point. (Visiting coincident points isn’t necessary!)
	      else {
	          var dx = x - +this._x.call(null, node.data),
	              dy = y - +this._y.call(null, node.data),
	              d2 = dx * dx + dy * dy;
	          if (d2 < radius) {
	            var d = Math.sqrt(radius = d2);
	            x0 = x - d, y0 = y - d;
	            x3 = x + d, y3 = y + d;
	            data = node.data;
	          }
	        }
	    }

	    return data;
	  };

	  var tree_remove = function tree_remove(d) {
	    if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

	    var parent,
	        node = this._root,
	        retainer,
	        previous,
	        next,
	        x0 = this._x0,
	        y0 = this._y0,
	        x1 = this._x1,
	        y1 = this._y1,
	        x,
	        y,
	        xm,
	        ym,
	        right,
	        bottom,
	        i,
	        j;

	    // If the tree is empty, initialize the root as a leaf.
	    if (!node) return this;

	    // Find the leaf node for the point.
	    // While descending, also retain the deepest parent with a non-removed sibling.
	    if (node.length) while (true) {
	      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
	      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
	      if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
	      if (!node.length) break;
	      if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) retainer = parent, j = i;
	    }

	    // Find the point to remove.
	    while (node.data !== d) {
	      if (!(previous = node, node = node.next)) return this;
	    }if (next = node.next) delete node.next;

	    // If there are multiple coincident points, remove just the point.
	    if (previous) return next ? previous.next = next : delete previous.next, this;

	    // If this is the root point, remove it.
	    if (!parent) return this._root = next, this;

	    // Remove this leaf.
	    next ? parent[i] = next : delete parent[i];

	    // If the parent now contains exactly one leaf, collapse superfluous parents.
	    if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
	      if (retainer) retainer[j] = node;else this._root = node;
	    }

	    return this;
	  };

	  function removeAll(data) {
	    for (var i = 0, n = data.length; i < n; ++i) {
	      this.remove(data[i]);
	    }return this;
	  }

	  var tree_root = function tree_root() {
	    return this._root;
	  };

	  var tree_size = function tree_size() {
	    var size = 0;
	    this.visit(function (node) {
	      if (!node.length) do {
	        ++size;
	      } while (node = node.next);
	    });
	    return size;
	  };

	  var tree_visit = function tree_visit(callback) {
	    var quads = [],
	        q,
	        node = this._root,
	        child,
	        x0,
	        y0,
	        x1,
	        y1;
	    if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
	    while (q = quads.pop()) {
	      if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
	        var xm = (x0 + x1) / 2,
	            ym = (y0 + y1) / 2;
	        if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
	        if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
	        if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
	        if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
	      }
	    }
	    return this;
	  };

	  var tree_visitAfter = function tree_visitAfter(callback) {
	    var quads = [],
	        next = [],
	        q;
	    if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
	    while (q = quads.pop()) {
	      var node = q.node;
	      if (node.length) {
	        var child,
	            x0 = q.x0,
	            y0 = q.y0,
	            x1 = q.x1,
	            y1 = q.y1,
	            xm = (x0 + x1) / 2,
	            ym = (y0 + y1) / 2;
	        if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
	        if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
	        if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
	        if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
	      }
	      next.push(q);
	    }
	    while (q = next.pop()) {
	      callback(q.node, q.x0, q.y0, q.x1, q.y1);
	    }
	    return this;
	  };

	  function defaultX(d) {
	    return d[0];
	  }

	  var tree_x = function tree_x(_) {
	    return arguments.length ? (this._x = _, this) : this._x;
	  };

	  function defaultY(d) {
	    return d[1];
	  }

	  var tree_y = function tree_y(_) {
	    return arguments.length ? (this._y = _, this) : this._y;
	  };

	  function quadtree(nodes, x, y) {
	    var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
	    return nodes == null ? tree : tree.addAll(nodes);
	  }

	  function Quadtree(x, y, x0, y0, x1, y1) {
	    this._x = x;
	    this._y = y;
	    this._x0 = x0;
	    this._y0 = y0;
	    this._x1 = x1;
	    this._y1 = y1;
	    this._root = undefined;
	  }

	  function leaf_copy(leaf) {
	    var copy = { data: leaf.data },
	        next = copy;
	    while (leaf = leaf.next) {
	      next = next.next = { data: leaf.data };
	    }return copy;
	  }

	  var treeProto = quadtree.prototype = Quadtree.prototype;

	  treeProto.copy = function () {
	    var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
	        node = this._root,
	        nodes,
	        child;

	    if (!node) return copy;

	    if (!node.length) return copy._root = leaf_copy(node), copy;

	    nodes = [{ source: node, target: copy._root = new Array(4) }];
	    while (node = nodes.pop()) {
	      for (var i = 0; i < 4; ++i) {
	        if (child = node.source[i]) {
	          if (child.length) nodes.push({ source: child, target: node.target[i] = new Array(4) });else node.target[i] = leaf_copy(child);
	        }
	      }
	    }

	    return copy;
	  };

	  treeProto.add = tree_add;
	  treeProto.addAll = addAll;
	  treeProto.cover = tree_cover;
	  treeProto.data = tree_data;
	  treeProto.extent = tree_extent;
	  treeProto.find = tree_find;
	  treeProto.remove = tree_remove;
	  treeProto.removeAll = removeAll;
	  treeProto.root = tree_root;
	  treeProto.size = tree_size;
	  treeProto.visit = tree_visit;
	  treeProto.visitAfter = tree_visitAfter;
	  treeProto.x = tree_x;
	  treeProto.y = tree_y;

	  function x(d) {
	    return d.x + d.vx;
	  }

	  function y(d) {
	    return d.y + d.vy;
	  }

	  var collide = function collide(radius) {
	    var nodes,
	        radii,
	        strength = 1,
	        iterations = 1;

	    if (typeof radius !== "function") radius = constant$6(radius == null ? 1 : +radius);

	    function force() {
	      var i,
	          n = nodes.length,
	          tree,
	          node,
	          xi,
	          yi,
	          ri,
	          ri2;

	      for (var k = 0; k < iterations; ++k) {
	        tree = quadtree(nodes, x, y).visitAfter(prepare);
	        for (i = 0; i < n; ++i) {
	          node = nodes[i];
	          ri = radii[node.index], ri2 = ri * ri;
	          xi = node.x + node.vx;
	          yi = node.y + node.vy;
	          tree.visit(apply);
	        }
	      }

	      function apply(quad, x0, y0, x1, y1) {
	        var data = quad.data,
	            rj = quad.r,
	            r = ri + rj;
	        if (data) {
	          if (data.index > node.index) {
	            var x = xi - data.x - data.vx,
	                y = yi - data.y - data.vy,
	                l = x * x + y * y;
	            if (l < r * r) {
	              if (x === 0) x = jiggle(), l += x * x;
	              if (y === 0) y = jiggle(), l += y * y;
	              l = (r - (l = Math.sqrt(l))) / l * strength;
	              node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
	              node.vy += (y *= l) * r;
	              data.vx -= x * (r = 1 - r);
	              data.vy -= y * r;
	            }
	          }
	          return;
	        }
	        return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
	      }
	    }

	    function prepare(quad) {
	      if (quad.data) return quad.r = radii[quad.data.index];
	      for (var i = quad.r = 0; i < 4; ++i) {
	        if (quad[i] && quad[i].r > quad.r) {
	          quad.r = quad[i].r;
	        }
	      }
	    }

	    function initialize() {
	      if (!nodes) return;
	      var i,
	          n = nodes.length,
	          node;
	      radii = new Array(n);
	      for (i = 0; i < n; ++i) {
	        node = nodes[i], radii[node.index] = +radius(node, i, nodes);
	      }
	    }

	    force.initialize = function (_) {
	      nodes = _;
	      initialize();
	    };

	    force.iterations = function (_) {
	      return arguments.length ? (iterations = +_, force) : iterations;
	    };

	    force.strength = function (_) {
	      return arguments.length ? (strength = +_, force) : strength;
	    };

	    force.radius = function (_) {
	      return arguments.length ? (radius = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : radius;
	    };

	    return force;
	  };

	  function index(d) {
	    return d.index;
	  }

	  function find(nodeById, nodeId) {
	    var node = nodeById.get(nodeId);
	    if (!node) throw new Error("missing: " + nodeId);
	    return node;
	  }

	  var link = function link(links) {
	    var id = index,
	        strength = defaultStrength,
	        strengths,
	        distance = constant$6(30),
	        distances,
	        nodes,
	        count,
	        bias,
	        iterations = 1;

	    if (links == null) links = [];

	    function defaultStrength(link) {
	      return 1 / Math.min(count[link.source.index], count[link.target.index]);
	    }

	    function force(alpha) {
	      for (var k = 0, n = links.length; k < iterations; ++k) {
	        for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
	          link = links[i], source = link.source, target = link.target;
	          x = target.x + target.vx - source.x - source.vx || jiggle();
	          y = target.y + target.vy - source.y - source.vy || jiggle();
	          l = Math.sqrt(x * x + y * y);
	          l = (l - distances[i]) / l * alpha * strengths[i];
	          x *= l, y *= l;
	          target.vx -= x * (b = bias[i]);
	          target.vy -= y * b;
	          source.vx += x * (b = 1 - b);
	          source.vy += y * b;
	        }
	      }
	    }

	    function initialize() {
	      if (!nodes) return;

	      var i,
	          n = nodes.length,
	          m = links.length,
	          nodeById = map$1(nodes, id),
	          link;

	      for (i = 0, count = new Array(n); i < m; ++i) {
	        link = links[i], link.index = i;
	        if (_typeof(link.source) !== "object") link.source = find(nodeById, link.source);
	        if (_typeof(link.target) !== "object") link.target = find(nodeById, link.target);
	        count[link.source.index] = (count[link.source.index] || 0) + 1;
	        count[link.target.index] = (count[link.target.index] || 0) + 1;
	      }

	      for (i = 0, bias = new Array(m); i < m; ++i) {
	        link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
	      }

	      strengths = new Array(m), initializeStrength();
	      distances = new Array(m), initializeDistance();
	    }

	    function initializeStrength() {
	      if (!nodes) return;

	      for (var i = 0, n = links.length; i < n; ++i) {
	        strengths[i] = +strength(links[i], i, links);
	      }
	    }

	    function initializeDistance() {
	      if (!nodes) return;

	      for (var i = 0, n = links.length; i < n; ++i) {
	        distances[i] = +distance(links[i], i, links);
	      }
	    }

	    force.initialize = function (_) {
	      nodes = _;
	      initialize();
	    };

	    force.links = function (_) {
	      return arguments.length ? (links = _, initialize(), force) : links;
	    };

	    force.id = function (_) {
	      return arguments.length ? (id = _, force) : id;
	    };

	    force.iterations = function (_) {
	      return arguments.length ? (iterations = +_, force) : iterations;
	    };

	    force.strength = function (_) {
	      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$6(+_), initializeStrength(), force) : strength;
	    };

	    force.distance = function (_) {
	      return arguments.length ? (distance = typeof _ === "function" ? _ : constant$6(+_), initializeDistance(), force) : distance;
	    };

	    return force;
	  };

	  function x$1(d) {
	    return d.x;
	  }

	  function y$1(d) {
	    return d.y;
	  }

	  var initialRadius = 10;
	  var initialAngle = Math.PI * (3 - Math.sqrt(5));

	  var simulation = function simulation(_nodes) {
	    var simulation,
	        _alpha = 1,
	        _alphaMin = 0.001,
	        _alphaDecay = 1 - Math.pow(_alphaMin, 1 / 300),
	        _alphaTarget = 0,
	        _velocityDecay = 0.6,
	        forces = map$1(),
	        stepper = timer(step),
	        event = dispatch("tick", "end");

	    if (_nodes == null) _nodes = [];

	    function step() {
	      tick();
	      event.call("tick", simulation);
	      if (_alpha < _alphaMin) {
	        stepper.stop();
	        event.call("end", simulation);
	      }
	    }

	    function tick() {
	      var i,
	          n = _nodes.length,
	          node;

	      _alpha += (_alphaTarget - _alpha) * _alphaDecay;

	      forces.each(function (force) {
	        force(_alpha);
	      });

	      for (i = 0; i < n; ++i) {
	        node = _nodes[i];
	        if (node.fx == null) node.x += node.vx *= _velocityDecay;else node.x = node.fx, node.vx = 0;
	        if (node.fy == null) node.y += node.vy *= _velocityDecay;else node.y = node.fy, node.vy = 0;
	      }
	    }

	    function initializeNodes() {
	      for (var i = 0, n = _nodes.length, node; i < n; ++i) {
	        node = _nodes[i], node.index = i;
	        if (isNaN(node.x) || isNaN(node.y)) {
	          var radius = initialRadius * Math.sqrt(i),
	              angle = i * initialAngle;
	          node.x = radius * Math.cos(angle);
	          node.y = radius * Math.sin(angle);
	        }
	        if (isNaN(node.vx) || isNaN(node.vy)) {
	          node.vx = node.vy = 0;
	        }
	      }
	    }

	    function initializeForce(force) {
	      if (force.initialize) force.initialize(_nodes);
	      return force;
	    }

	    initializeNodes();

	    return simulation = {
	      tick: tick,

	      restart: function restart() {
	        return stepper.restart(step), simulation;
	      },

	      stop: function stop() {
	        return stepper.stop(), simulation;
	      },

	      nodes: function nodes(_) {
	        return arguments.length ? (_nodes = _, initializeNodes(), forces.each(initializeForce), simulation) : _nodes;
	      },

	      alpha: function alpha(_) {
	        return arguments.length ? (_alpha = +_, simulation) : _alpha;
	      },

	      alphaMin: function alphaMin(_) {
	        return arguments.length ? (_alphaMin = +_, simulation) : _alphaMin;
	      },

	      alphaDecay: function alphaDecay(_) {
	        return arguments.length ? (_alphaDecay = +_, simulation) : +_alphaDecay;
	      },

	      alphaTarget: function alphaTarget(_) {
	        return arguments.length ? (_alphaTarget = +_, simulation) : _alphaTarget;
	      },

	      velocityDecay: function velocityDecay(_) {
	        return arguments.length ? (_velocityDecay = 1 - _, simulation) : 1 - _velocityDecay;
	      },

	      force: function force(name, _) {
	        return arguments.length > 1 ? (_ == null ? forces.remove(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
	      },

	      find: function find(x, y, radius) {
	        var i = 0,
	            n = _nodes.length,
	            dx,
	            dy,
	            d2,
	            node,
	            closest;

	        if (radius == null) radius = Infinity;else radius *= radius;

	        for (i = 0; i < n; ++i) {
	          node = _nodes[i];
	          dx = x - node.x;
	          dy = y - node.y;
	          d2 = dx * dx + dy * dy;
	          if (d2 < radius) closest = node, radius = d2;
	        }

	        return closest;
	      },

	      on: function on(name, _) {
	        return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
	      }
	    };
	  };

	  var manyBody = function manyBody() {
	    var nodes,
	        node,
	        alpha,
	        strength = constant$6(-30),
	        strengths,
	        distanceMin2 = 1,
	        distanceMax2 = Infinity,
	        theta2 = 0.81;

	    function force(_) {
	      var i,
	          n = nodes.length,
	          tree = quadtree(nodes, x$1, y$1).visitAfter(accumulate);
	      for (alpha = _, i = 0; i < n; ++i) {
	        node = nodes[i], tree.visit(apply);
	      }
	    }

	    function initialize() {
	      if (!nodes) return;
	      var i,
	          n = nodes.length,
	          node;
	      strengths = new Array(n);
	      for (i = 0; i < n; ++i) {
	        node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
	      }
	    }

	    function accumulate(quad) {
	      var strength = 0,
	          q,
	          c,
	          x,
	          y,
	          i;

	      // For internal nodes, accumulate forces from child quadrants.
	      if (quad.length) {
	        for (x = y = i = 0; i < 4; ++i) {
	          if ((q = quad[i]) && (c = q.value)) {
	            strength += c, x += c * q.x, y += c * q.y;
	          }
	        }
	        quad.x = x / strength;
	        quad.y = y / strength;
	      }

	      // For leaf nodes, accumulate forces from coincident quadrants.
	      else {
	          q = quad;
	          q.x = q.data.x;
	          q.y = q.data.y;
	          do {
	            strength += strengths[q.data.index];
	          } while (q = q.next);
	        }

	      quad.value = strength;
	    }

	    function apply(quad, x1, _, x2) {
	      if (!quad.value) return true;

	      var x = quad.x - node.x,
	          y = quad.y - node.y,
	          w = x2 - x1,
	          l = x * x + y * y;

	      // Apply the Barnes-Hut approximation if possible.
	      // Limit forces for very close nodes; randomize direction if coincident.
	      if (w * w / theta2 < l) {
	        if (l < distanceMax2) {
	          if (x === 0) x = jiggle(), l += x * x;
	          if (y === 0) y = jiggle(), l += y * y;
	          if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
	          node.vx += x * quad.value * alpha / l;
	          node.vy += y * quad.value * alpha / l;
	        }
	        return true;
	      }

	      // Otherwise, process points directly.
	      else if (quad.length || l >= distanceMax2) return;

	      // Limit forces for very close nodes; randomize direction if coincident.
	      if (quad.data !== node || quad.next) {
	        if (x === 0) x = jiggle(), l += x * x;
	        if (y === 0) y = jiggle(), l += y * y;
	        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
	      }

	      do {
	        if (quad.data !== node) {
	          w = strengths[quad.data.index] * alpha / l;
	          node.vx += x * w;
	          node.vy += y * w;
	        }
	      } while (quad = quad.next);
	    }

	    force.initialize = function (_) {
	      nodes = _;
	      initialize();
	    };

	    force.strength = function (_) {
	      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : strength;
	    };

	    force.distanceMin = function (_) {
	      return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
	    };

	    force.distanceMax = function (_) {
	      return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
	    };

	    force.theta = function (_) {
	      return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
	    };

	    return force;
	  };

	  var x$2 = function x$2(x) {
	    var strength = constant$6(0.1),
	        nodes,
	        strengths,
	        xz;

	    if (typeof x !== "function") x = constant$6(x == null ? 0 : +x);

	    function force(alpha) {
	      for (var i = 0, n = nodes.length, node; i < n; ++i) {
	        node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
	      }
	    }

	    function initialize() {
	      if (!nodes) return;
	      var i,
	          n = nodes.length;
	      strengths = new Array(n);
	      xz = new Array(n);
	      for (i = 0; i < n; ++i) {
	        strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
	      }
	    }

	    force.initialize = function (_) {
	      nodes = _;
	      initialize();
	    };

	    force.strength = function (_) {
	      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : strength;
	    };

	    force.x = function (_) {
	      return arguments.length ? (x = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : x;
	    };

	    return force;
	  };

	  var y$2 = function y$2(y) {
	    var strength = constant$6(0.1),
	        nodes,
	        strengths,
	        yz;

	    if (typeof y !== "function") y = constant$6(y == null ? 0 : +y);

	    function force(alpha) {
	      for (var i = 0, n = nodes.length, node; i < n; ++i) {
	        node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
	      }
	    }

	    function initialize() {
	      if (!nodes) return;
	      var i,
	          n = nodes.length;
	      strengths = new Array(n);
	      yz = new Array(n);
	      for (i = 0; i < n; ++i) {
	        strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
	      }
	    }

	    force.initialize = function (_) {
	      nodes = _;
	      initialize();
	    };

	    force.strength = function (_) {
	      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : strength;
	    };

	    force.y = function (_) {
	      return arguments.length ? (y = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : y;
	    };

	    return force;
	  };

	  // Computes the decimal coefficient and exponent of the specified number x with
	  // significant digits p, where x is positive and p is in [1, 21] or undefined.
	  // For example, formatDecimal(1.23) returns ["123", 0].
	  var formatDecimal = function formatDecimal(x, p) {
	    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
	    var i,
	        coefficient = x.slice(0, i);

	    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
	    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
	    return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
	  };

	  var exponent$1 = function exponent$1(x) {
	    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
	  };

	  var formatGroup = function formatGroup(grouping, thousands) {
	    return function (value, width) {
	      var i = value.length,
	          t = [],
	          j = 0,
	          g = grouping[0],
	          length = 0;

	      while (i > 0 && g > 0) {
	        if (length + g + 1 > width) g = Math.max(1, width - length);
	        t.push(value.substring(i -= g, i + g));
	        if ((length += g + 1) > width) break;
	        g = grouping[j = (j + 1) % grouping.length];
	      }

	      return t.reverse().join(thousands);
	    };
	  };

	  var formatNumerals = function formatNumerals(numerals) {
	    return function (value) {
	      return value.replace(/[0-9]/g, function (i) {
	        return numerals[+i];
	      });
	    };
	  };

	  var formatDefault = function formatDefault(x, p) {
	    x = x.toPrecision(p);

	    out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
	      switch (x[i]) {
	        case ".":
	          i0 = i1 = i;break;
	        case "0":
	          if (i0 === 0) i0 = i;i1 = i;break;
	        case "e":
	          break out;
	        default:
	          if (i0 > 0) i0 = 0;break;
	      }
	    }

	    return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
	  };

	  var prefixExponent;

	  var formatPrefixAuto = function formatPrefixAuto(x, p) {
	    var d = formatDecimal(x, p);
	    if (!d) return x + "";
	    var coefficient = d[0],
	        exponent = d[1],
	        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
	        n = coefficient.length;
	    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
	  };

	  var formatRounded = function formatRounded(x, p) {
	    var d = formatDecimal(x, p);
	    if (!d) return x + "";
	    var coefficient = d[0],
	        exponent = d[1];
	    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
	  };

	  var formatTypes = {
	    "": formatDefault,
	    "%": function _(x, p) {
	      return (x * 100).toFixed(p);
	    },
	    "b": function b(x) {
	      return Math.round(x).toString(2);
	    },
	    "c": function c(x) {
	      return x + "";
	    },
	    "d": function d(x) {
	      return Math.round(x).toString(10);
	    },
	    "e": function e(x, p) {
	      return x.toExponential(p);
	    },
	    "f": function f(x, p) {
	      return x.toFixed(p);
	    },
	    "g": function g(x, p) {
	      return x.toPrecision(p);
	    },
	    "o": function o(x) {
	      return Math.round(x).toString(8);
	    },
	    "p": function p(x, _p) {
	      return formatRounded(x * 100, _p);
	    },
	    "r": formatRounded,
	    "s": formatPrefixAuto,
	    "X": function X(x) {
	      return Math.round(x).toString(16).toUpperCase();
	    },
	    "x": function x(_x) {
	      return Math.round(_x).toString(16);
	    }
	  };

	  // [[fill]align][sign][symbol][0][width][,][.precision][type]
	  var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

	  function formatSpecifier(specifier) {
	    return new FormatSpecifier(specifier);
	  }

	  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

	  function FormatSpecifier(specifier) {
	    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);

	    var match,
	        fill = match[1] || " ",
	        align = match[2] || ">",
	        sign = match[3] || "-",
	        symbol = match[4] || "",
	        zero = !!match[5],
	        width = match[6] && +match[6],
	        comma = !!match[7],
	        precision = match[8] && +match[8].slice(1),
	        type = match[9] || "";

	    // The "n" type is an alias for ",g".
	    if (type === "n") comma = true, type = "g";

	    // Map invalid types to the default format.
	    else if (!formatTypes[type]) type = "";

	    // If zero fill is specified, padding goes after sign and before digits.
	    if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";

	    this.fill = fill;
	    this.align = align;
	    this.sign = sign;
	    this.symbol = symbol;
	    this.zero = zero;
	    this.width = width;
	    this.comma = comma;
	    this.precision = precision;
	    this.type = type;
	  }

	  FormatSpecifier.prototype.toString = function () {
	    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width == null ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0)) + this.type;
	  };

	  var identity$3 = function identity$3(x) {
	    return x;
	  };

	  var prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

	  var formatLocale = function formatLocale(locale) {
	    var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity$3,
	        currency = locale.currency,
	        decimal = locale.decimal,
	        numerals = locale.numerals ? formatNumerals(locale.numerals) : identity$3,
	        percent = locale.percent || "%";

	    function newFormat(specifier) {
	      specifier = formatSpecifier(specifier);

	      var fill = specifier.fill,
	          align = specifier.align,
	          sign = specifier.sign,
	          symbol = specifier.symbol,
	          zero = specifier.zero,
	          width = specifier.width,
	          comma = specifier.comma,
	          precision = specifier.precision,
	          type = specifier.type;

	      // Compute the prefix and suffix.
	      // For SI-prefix, the suffix is lazily computed.
	      var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
	          suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";

	      // What format function should we use?
	      // Is this an integer type?
	      // Can this type generate exponential notation?
	      var formatType = formatTypes[type],
	          maybeSuffix = !type || /[defgprs%]/.test(type);

	      // Set the default precision if not specified,
	      // or clamp the specified precision to the supported range.
	      // For significant precision, it must be in [1, 21].
	      // For fixed precision, it must be in [0, 20].
	      precision = precision == null ? type ? 6 : 12 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

	      function format(value) {
	        var valuePrefix = prefix,
	            valueSuffix = suffix,
	            i,
	            n,
	            c;

	        if (type === "c") {
	          valueSuffix = formatType(value) + valueSuffix;
	          value = "";
	        } else {
	          value = +value;

	          // Perform the initial formatting.
	          var valueNegative = value < 0;
	          value = formatType(Math.abs(value), precision);

	          // If a negative value rounds to zero during formatting, treat as positive.
	          if (valueNegative && +value === 0) valueNegative = false;

	          // Compute the prefix and suffix.
	          valuePrefix = (valueNegative ? sign === "(" ? sign : "-" : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
	          valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");

	          // Break the formatted value into the integer “value” part that can be
	          // grouped, and fractional or exponential “suffix” part that is not.
	          if (maybeSuffix) {
	            i = -1, n = value.length;
	            while (++i < n) {
	              if (c = value.charCodeAt(i), 48 > c || c > 57) {
	                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
	                value = value.slice(0, i);
	                break;
	              }
	            }
	          }
	        }

	        // If the fill character is not "0", grouping is applied before padding.
	        if (comma && !zero) value = group(value, Infinity);

	        // Compute the padding.
	        var length = valuePrefix.length + value.length + valueSuffix.length,
	            padding = length < width ? new Array(width - length + 1).join(fill) : "";

	        // If the fill character is "0", grouping is applied after padding.
	        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

	        // Reconstruct the final output based on the desired alignment.
	        switch (align) {
	          case "<":
	            value = valuePrefix + value + valueSuffix + padding;break;
	          case "=":
	            value = valuePrefix + padding + value + valueSuffix;break;
	          case "^":
	            value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);break;
	          default:
	            value = padding + valuePrefix + value + valueSuffix;break;
	        }

	        return numerals(value);
	      }

	      format.toString = function () {
	        return specifier + "";
	      };

	      return format;
	    }

	    function formatPrefix(specifier, value) {
	      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
	          e = Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3,
	          k = Math.pow(10, -e),
	          prefix = prefixes[8 + e / 3];
	      return function (value) {
	        return f(k * value) + prefix;
	      };
	    }

	    return {
	      format: newFormat,
	      formatPrefix: formatPrefix
	    };
	  };

	  var locale$1;

	  defaultLocale({
	    decimal: ".",
	    thousands: ",",
	    grouping: [3],
	    currency: ["$", ""]
	  });

	  function defaultLocale(definition) {
	    locale$1 = formatLocale(definition);
	    exports.format = locale$1.format;
	    exports.formatPrefix = locale$1.formatPrefix;
	    return locale$1;
	  }

	  var precisionFixed = function precisionFixed(step) {
	    return Math.max(0, -exponent$1(Math.abs(step)));
	  };

	  var precisionPrefix = function precisionPrefix(step, value) {
	    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3 - exponent$1(Math.abs(step)));
	  };

	  var precisionRound = function precisionRound(step, max) {
	    step = Math.abs(step), max = Math.abs(max) - step;
	    return Math.max(0, exponent$1(max) - exponent$1(step)) + 1;
	  };

	  // Adds floating point numbers with twice the normal precision.
	  // Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
	  // Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
	  // 305–363 (1997).
	  // Code adapted from GeographicLib by Charles F. F. Karney,
	  // http://geographiclib.sourceforge.net/

	  var adder = function adder() {
	    return new Adder();
	  };

	  function Adder() {
	    this.reset();
	  }

	  Adder.prototype = {
	    constructor: Adder,
	    reset: function reset() {
	      this.s = // rounded value
	      this.t = 0; // exact error
	    },
	    add: function add(y) {
	      add$1(temp, y, this.t);
	      add$1(this, temp.s, this.s);
	      if (this.s) this.t += temp.t;else this.s = temp.t;
	    },
	    valueOf: function valueOf() {
	      return this.s;
	    }
	  };

	  var temp = new Adder();

	  function add$1(adder, a, b) {
	    var x = adder.s = a + b,
	        bv = x - a,
	        av = x - bv;
	    adder.t = a - av + (b - bv);
	  }

	  var epsilon$2 = 1e-6;
	  var epsilon2$1 = 1e-12;
	  var pi$3 = Math.PI;
	  var halfPi$2 = pi$3 / 2;
	  var quarterPi = pi$3 / 4;
	  var tau$3 = pi$3 * 2;

	  var degrees$1 = 180 / pi$3;
	  var radians = pi$3 / 180;

	  var abs = Math.abs;
	  var atan = Math.atan;
	  var atan2 = Math.atan2;
	  var cos$1 = Math.cos;
	  var ceil = Math.ceil;
	  var exp = Math.exp;

	  var log = Math.log;
	  var pow = Math.pow;
	  var sin$1 = Math.sin;
	  var sign = Math.sign || function (x) {
	    return x > 0 ? 1 : x < 0 ? -1 : 0;
	  };
	  var sqrt = Math.sqrt;
	  var tan = Math.tan;

	  function acos(x) {
	    return x > 1 ? 0 : x < -1 ? pi$3 : Math.acos(x);
	  }

	  function asin(x) {
	    return x > 1 ? halfPi$2 : x < -1 ? -halfPi$2 : Math.asin(x);
	  }

	  function haversin(x) {
	    return (x = sin$1(x / 2)) * x;
	  }

	  function noop$1() {}

	  function streamGeometry(geometry, stream) {
	    if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
	      streamGeometryType[geometry.type](geometry, stream);
	    }
	  }

	  var streamObjectType = {
	    Feature: function Feature(object, stream) {
	      streamGeometry(object.geometry, stream);
	    },
	    FeatureCollection: function FeatureCollection(object, stream) {
	      var features = object.features,
	          i = -1,
	          n = features.length;
	      while (++i < n) {
	        streamGeometry(features[i].geometry, stream);
	      }
	    }
	  };

	  var streamGeometryType = {
	    Sphere: function Sphere(object, stream) {
	      stream.sphere();
	    },
	    Point: function Point(object, stream) {
	      object = object.coordinates;
	      stream.point(object[0], object[1], object[2]);
	    },
	    MultiPoint: function MultiPoint(object, stream) {
	      var coordinates = object.coordinates,
	          i = -1,
	          n = coordinates.length;
	      while (++i < n) {
	        object = coordinates[i], stream.point(object[0], object[1], object[2]);
	      }
	    },
	    LineString: function LineString(object, stream) {
	      streamLine(object.coordinates, stream, 0);
	    },
	    MultiLineString: function MultiLineString(object, stream) {
	      var coordinates = object.coordinates,
	          i = -1,
	          n = coordinates.length;
	      while (++i < n) {
	        streamLine(coordinates[i], stream, 0);
	      }
	    },
	    Polygon: function Polygon(object, stream) {
	      streamPolygon(object.coordinates, stream);
	    },
	    MultiPolygon: function MultiPolygon(object, stream) {
	      var coordinates = object.coordinates,
	          i = -1,
	          n = coordinates.length;
	      while (++i < n) {
	        streamPolygon(coordinates[i], stream);
	      }
	    },
	    GeometryCollection: function GeometryCollection(object, stream) {
	      var geometries = object.geometries,
	          i = -1,
	          n = geometries.length;
	      while (++i < n) {
	        streamGeometry(geometries[i], stream);
	      }
	    }
	  };

	  function streamLine(coordinates, stream, closed) {
	    var i = -1,
	        n = coordinates.length - closed,
	        coordinate;
	    stream.lineStart();
	    while (++i < n) {
	      coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
	    }stream.lineEnd();
	  }

	  function streamPolygon(coordinates, stream) {
	    var i = -1,
	        n = coordinates.length;
	    stream.polygonStart();
	    while (++i < n) {
	      streamLine(coordinates[i], stream, 1);
	    }stream.polygonEnd();
	  }

	  var geoStream = function geoStream(object, stream) {
	    if (object && streamObjectType.hasOwnProperty(object.type)) {
	      streamObjectType[object.type](object, stream);
	    } else {
	      streamGeometry(object, stream);
	    }
	  };

	  var areaRingSum = adder();

	  var areaSum = adder();
	  var lambda00;
	  var phi00;
	  var lambda0;
	  var cosPhi0;
	  var sinPhi0;

	  var areaStream = {
	    point: noop$1,
	    lineStart: noop$1,
	    lineEnd: noop$1,
	    polygonStart: function polygonStart() {
	      areaRingSum.reset();
	      areaStream.lineStart = areaRingStart;
	      areaStream.lineEnd = areaRingEnd;
	    },
	    polygonEnd: function polygonEnd() {
	      var areaRing = +areaRingSum;
	      areaSum.add(areaRing < 0 ? tau$3 + areaRing : areaRing);
	      this.lineStart = this.lineEnd = this.point = noop$1;
	    },
	    sphere: function sphere() {
	      areaSum.add(tau$3);
	    }
	  };

	  function areaRingStart() {
	    areaStream.point = areaPointFirst;
	  }

	  function areaRingEnd() {
	    areaPoint(lambda00, phi00);
	  }

	  function areaPointFirst(lambda, phi) {
	    areaStream.point = areaPoint;
	    lambda00 = lambda, phi00 = phi;
	    lambda *= radians, phi *= radians;
	    lambda0 = lambda, cosPhi0 = cos$1(phi = phi / 2 + quarterPi), sinPhi0 = sin$1(phi);
	  }

	  function areaPoint(lambda, phi) {
	    lambda *= radians, phi *= radians;
	    phi = phi / 2 + quarterPi; // half the angular distance from south pole

	    // Spherical excess E for a spherical triangle with vertices: south pole,
	    // previous point, current point.  Uses a formula derived from Cagnoli’s
	    // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
	    var dLambda = lambda - lambda0,
	        sdLambda = dLambda >= 0 ? 1 : -1,
	        adLambda = sdLambda * dLambda,
	        cosPhi = cos$1(phi),
	        sinPhi = sin$1(phi),
	        k = sinPhi0 * sinPhi,
	        u = cosPhi0 * cosPhi + k * cos$1(adLambda),
	        v = k * sdLambda * sin$1(adLambda);
	    areaRingSum.add(atan2(v, u));

	    // Advance the previous points.
	    lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
	  }

	  var area = function area(object) {
	    areaSum.reset();
	    geoStream(object, areaStream);
	    return areaSum * 2;
	  };

	  function spherical(cartesian) {
	    return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
	  }

	  function cartesian(spherical) {
	    var lambda = spherical[0],
	        phi = spherical[1],
	        cosPhi = cos$1(phi);
	    return [cosPhi * cos$1(lambda), cosPhi * sin$1(lambda), sin$1(phi)];
	  }

	  function cartesianDot(a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	  }

	  function cartesianCross(a, b) {
	    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
	  }

	  // TODO return a
	  function cartesianAddInPlace(a, b) {
	    a[0] += b[0], a[1] += b[1], a[2] += b[2];
	  }

	  function cartesianScale(vector, k) {
	    return [vector[0] * k, vector[1] * k, vector[2] * k];
	  }

	  // TODO return d
	  function cartesianNormalizeInPlace(d) {
	    var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
	    d[0] /= l, d[1] /= l, d[2] /= l;
	  }

	  var lambda0$1;
	  var phi0;
	  var lambda1;
	  var phi1;
	  var lambda2;
	  var lambda00$1;
	  var phi00$1;
	  var p0;
	  var deltaSum = adder();
	  var ranges;
	  var range;

	  var boundsStream = {
	    point: boundsPoint,
	    lineStart: boundsLineStart,
	    lineEnd: boundsLineEnd,
	    polygonStart: function polygonStart() {
	      boundsStream.point = boundsRingPoint;
	      boundsStream.lineStart = boundsRingStart;
	      boundsStream.lineEnd = boundsRingEnd;
	      deltaSum.reset();
	      areaStream.polygonStart();
	    },
	    polygonEnd: function polygonEnd() {
	      areaStream.polygonEnd();
	      boundsStream.point = boundsPoint;
	      boundsStream.lineStart = boundsLineStart;
	      boundsStream.lineEnd = boundsLineEnd;
	      if (areaRingSum < 0) lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);else if (deltaSum > epsilon$2) phi1 = 90;else if (deltaSum < -epsilon$2) phi0 = -90;
	      range[0] = lambda0$1, range[1] = lambda1;
	    }
	  };

	  function boundsPoint(lambda, phi) {
	    ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
	    if (phi < phi0) phi0 = phi;
	    if (phi > phi1) phi1 = phi;
	  }

	  function linePoint(lambda, phi) {
	    var p = cartesian([lambda * radians, phi * radians]);
	    if (p0) {
	      var normal = cartesianCross(p0, p),
	          equatorial = [normal[1], -normal[0], 0],
	          inflection = cartesianCross(equatorial, normal);
	      cartesianNormalizeInPlace(inflection);
	      inflection = spherical(inflection);
	      var delta = lambda - lambda2,
	          sign$$1 = delta > 0 ? 1 : -1,
	          lambdai = inflection[0] * degrees$1 * sign$$1,
	          phii,
	          antimeridian = abs(delta) > 180;
	      if (antimeridian ^ (sign$$1 * lambda2 < lambdai && lambdai < sign$$1 * lambda)) {
	        phii = inflection[1] * degrees$1;
	        if (phii > phi1) phi1 = phii;
	      } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign$$1 * lambda2 < lambdai && lambdai < sign$$1 * lambda)) {
	        phii = -inflection[1] * degrees$1;
	        if (phii < phi0) phi0 = phii;
	      } else {
	        if (phi < phi0) phi0 = phi;
	        if (phi > phi1) phi1 = phi;
	      }
	      if (antimeridian) {
	        if (lambda < lambda2) {
	          if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
	        } else {
	          if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
	        }
	      } else {
	        if (lambda1 >= lambda0$1) {
	          if (lambda < lambda0$1) lambda0$1 = lambda;
	          if (lambda > lambda1) lambda1 = lambda;
	        } else {
	          if (lambda > lambda2) {
	            if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
	          } else {
	            if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
	          }
	        }
	      }
	    } else {
	      ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
	    }
	    if (phi < phi0) phi0 = phi;
	    if (phi > phi1) phi1 = phi;
	    p0 = p, lambda2 = lambda;
	  }

	  function boundsLineStart() {
	    boundsStream.point = linePoint;
	  }

	  function boundsLineEnd() {
	    range[0] = lambda0$1, range[1] = lambda1;
	    boundsStream.point = boundsPoint;
	    p0 = null;
	  }

	  function boundsRingPoint(lambda, phi) {
	    if (p0) {
	      var delta = lambda - lambda2;
	      deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
	    } else {
	      lambda00$1 = lambda, phi00$1 = phi;
	    }
	    areaStream.point(lambda, phi);
	    linePoint(lambda, phi);
	  }

	  function boundsRingStart() {
	    areaStream.lineStart();
	  }

	  function boundsRingEnd() {
	    boundsRingPoint(lambda00$1, phi00$1);
	    areaStream.lineEnd();
	    if (abs(deltaSum) > epsilon$2) lambda0$1 = -(lambda1 = 180);
	    range[0] = lambda0$1, range[1] = lambda1;
	    p0 = null;
	  }

	  // Finds the left-right distance between two longitudes.
	  // This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
	  // the distance between ±180° to be 360°.
	  function angle(lambda0, lambda1) {
	    return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
	  }

	  function rangeCompare(a, b) {
	    return a[0] - b[0];
	  }

	  function rangeContains(range, x) {
	    return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
	  }

	  var bounds = function bounds(feature) {
	    var i, n, a, b, merged, deltaMax, delta;

	    phi1 = lambda1 = -(lambda0$1 = phi0 = Infinity);
	    ranges = [];
	    geoStream(feature, boundsStream);

	    // First, sort ranges by their minimum longitudes.
	    if (n = ranges.length) {
	      ranges.sort(rangeCompare);

	      // Then, merge any ranges that overlap.
	      for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
	        b = ranges[i];
	        if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
	          if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
	          if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
	        } else {
	          merged.push(a = b);
	        }
	      }

	      // Finally, find the largest gap between the merged ranges.
	      // The final bounding box will be the inverse of this gap.
	      for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
	        b = merged[i];
	        if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0$1 = b[0], lambda1 = a[1];
	      }
	    }

	    ranges = range = null;

	    return lambda0$1 === Infinity || phi0 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[lambda0$1, phi0], [lambda1, phi1]];
	  };

	  var W0;
	  var W1;
	  var X0;
	  var Y0;
	  var Z0;
	  var X1;
	  var Y1;
	  var Z1;
	  var X2;
	  var Y2;
	  var Z2;
	  var lambda00$2;
	  var phi00$2;
	  var x0;
	  var y0;
	  var z0; // previous point

	  var centroidStream = {
	    sphere: noop$1,
	    point: centroidPoint,
	    lineStart: centroidLineStart,
	    lineEnd: centroidLineEnd,
	    polygonStart: function polygonStart() {
	      centroidStream.lineStart = centroidRingStart;
	      centroidStream.lineEnd = centroidRingEnd;
	    },
	    polygonEnd: function polygonEnd() {
	      centroidStream.lineStart = centroidLineStart;
	      centroidStream.lineEnd = centroidLineEnd;
	    }
	  };

	  // Arithmetic mean of Cartesian vectors.
	  function centroidPoint(lambda, phi) {
	    lambda *= radians, phi *= radians;
	    var cosPhi = cos$1(phi);
	    centroidPointCartesian(cosPhi * cos$1(lambda), cosPhi * sin$1(lambda), sin$1(phi));
	  }

	  function centroidPointCartesian(x, y, z) {
	    ++W0;
	    X0 += (x - X0) / W0;
	    Y0 += (y - Y0) / W0;
	    Z0 += (z - Z0) / W0;
	  }

	  function centroidLineStart() {
	    centroidStream.point = centroidLinePointFirst;
	  }

	  function centroidLinePointFirst(lambda, phi) {
	    lambda *= radians, phi *= radians;
	    var cosPhi = cos$1(phi);
	    x0 = cosPhi * cos$1(lambda);
	    y0 = cosPhi * sin$1(lambda);
	    z0 = sin$1(phi);
	    centroidStream.point = centroidLinePoint;
	    centroidPointCartesian(x0, y0, z0);
	  }

	  function centroidLinePoint(lambda, phi) {
	    lambda *= radians, phi *= radians;
	    var cosPhi = cos$1(phi),
	        x = cosPhi * cos$1(lambda),
	        y = cosPhi * sin$1(lambda),
	        z = sin$1(phi),
	        w = atan2(sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
	    W1 += w;
	    X1 += w * (x0 + (x0 = x));
	    Y1 += w * (y0 + (y0 = y));
	    Z1 += w * (z0 + (z0 = z));
	    centroidPointCartesian(x0, y0, z0);
	  }

	  function centroidLineEnd() {
	    centroidStream.point = centroidPoint;
	  }

	  // See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
	  // J. Applied Mechanics 42, 239 (1975).
	  function centroidRingStart() {
	    centroidStream.point = centroidRingPointFirst;
	  }

	  function centroidRingEnd() {
	    centroidRingPoint(lambda00$2, phi00$2);
	    centroidStream.point = centroidPoint;
	  }

	  function centroidRingPointFirst(lambda, phi) {
	    lambda00$2 = lambda, phi00$2 = phi;
	    lambda *= radians, phi *= radians;
	    centroidStream.point = centroidRingPoint;
	    var cosPhi = cos$1(phi);
	    x0 = cosPhi * cos$1(lambda);
	    y0 = cosPhi * sin$1(lambda);
	    z0 = sin$1(phi);
	    centroidPointCartesian(x0, y0, z0);
	  }

	  function centroidRingPoint(lambda, phi) {
	    lambda *= radians, phi *= radians;
	    var cosPhi = cos$1(phi),
	        x = cosPhi * cos$1(lambda),
	        y = cosPhi * sin$1(lambda),
	        z = sin$1(phi),
	        cx = y0 * z - z0 * y,
	        cy = z0 * x - x0 * z,
	        cz = x0 * y - y0 * x,
	        m = sqrt(cx * cx + cy * cy + cz * cz),
	        w = asin(m),
	        // line weight = angle
	    v = m && -w / m; // area weight multiplier
	    X2 += v * cx;
	    Y2 += v * cy;
	    Z2 += v * cz;
	    W1 += w;
	    X1 += w * (x0 + (x0 = x));
	    Y1 += w * (y0 + (y0 = y));
	    Z1 += w * (z0 + (z0 = z));
	    centroidPointCartesian(x0, y0, z0);
	  }

	  var centroid = function centroid(object) {
	    W0 = W1 = X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
	    geoStream(object, centroidStream);

	    var x = X2,
	        y = Y2,
	        z = Z2,
	        m = x * x + y * y + z * z;

	    // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.
	    if (m < epsilon2$1) {
	      x = X1, y = Y1, z = Z1;
	      // If the feature has zero length, fall back to arithmetic mean of point vectors.
	      if (W1 < epsilon$2) x = X0, y = Y0, z = Z0;
	      m = x * x + y * y + z * z;
	      // If the feature still has an undefined ccentroid, then return.
	      if (m < epsilon2$1) return [NaN, NaN];
	    }

	    return [atan2(y, x) * degrees$1, asin(z / sqrt(m)) * degrees$1];
	  };

	  var constant$7 = function constant$7(x) {
	    return function () {
	      return x;
	    };
	  };

	  var compose = function compose(a, b) {

	    function compose(x, y) {
	      return x = a(x, y), b(x[0], x[1]);
	    }

	    if (a.invert && b.invert) compose.invert = function (x, y) {
	      return x = b.invert(x, y), x && a.invert(x[0], x[1]);
	    };

	    return compose;
	  };

	  function rotationIdentity(lambda, phi) {
	    return [lambda > pi$3 ? lambda - tau$3 : lambda < -pi$3 ? lambda + tau$3 : lambda, phi];
	  }

	  rotationIdentity.invert = rotationIdentity;

	  function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
	    return (deltaLambda %= tau$3) ? deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
	  }

	  function forwardRotationLambda(deltaLambda) {
	    return function (lambda, phi) {
	      return lambda += deltaLambda, [lambda > pi$3 ? lambda - tau$3 : lambda < -pi$3 ? lambda + tau$3 : lambda, phi];
	    };
	  }

	  function rotationLambda(deltaLambda) {
	    var rotation = forwardRotationLambda(deltaLambda);
	    rotation.invert = forwardRotationLambda(-deltaLambda);
	    return rotation;
	  }

	  function rotationPhiGamma(deltaPhi, deltaGamma) {
	    var cosDeltaPhi = cos$1(deltaPhi),
	        sinDeltaPhi = sin$1(deltaPhi),
	        cosDeltaGamma = cos$1(deltaGamma),
	        sinDeltaGamma = sin$1(deltaGamma);

	    function rotation(lambda, phi) {
	      var cosPhi = cos$1(phi),
	          x = cos$1(lambda) * cosPhi,
	          y = sin$1(lambda) * cosPhi,
	          z = sin$1(phi),
	          k = z * cosDeltaPhi + x * sinDeltaPhi;
	      return [atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi), asin(k * cosDeltaGamma + y * sinDeltaGamma)];
	    }

	    rotation.invert = function (lambda, phi) {
	      var cosPhi = cos$1(phi),
	          x = cos$1(lambda) * cosPhi,
	          y = sin$1(lambda) * cosPhi,
	          z = sin$1(phi),
	          k = z * cosDeltaGamma - y * sinDeltaGamma;
	      return [atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi), asin(k * cosDeltaPhi - x * sinDeltaPhi)];
	    };

	    return rotation;
	  }

	  var rotation = function rotation(rotate) {
	    rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);

	    function forward(coordinates) {
	      coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
	      return coordinates[0] *= degrees$1, coordinates[1] *= degrees$1, coordinates;
	    }

	    forward.invert = function (coordinates) {
	      coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
	      return coordinates[0] *= degrees$1, coordinates[1] *= degrees$1, coordinates;
	    };

	    return forward;
	  };

	  // Generates a circle centered at [0°, 0°], with a given radius and precision.
	  function circleStream(stream, radius, delta, direction, t0, t1) {
	    if (!delta) return;
	    var cosRadius = cos$1(radius),
	        sinRadius = sin$1(radius),
	        step = direction * delta;
	    if (t0 == null) {
	      t0 = radius + direction * tau$3;
	      t1 = radius - step / 2;
	    } else {
	      t0 = circleRadius(cosRadius, t0);
	      t1 = circleRadius(cosRadius, t1);
	      if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau$3;
	    }
	    for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
	      point = spherical([cosRadius, -sinRadius * cos$1(t), -sinRadius * sin$1(t)]);
	      stream.point(point[0], point[1]);
	    }
	  }

	  // Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
	  function circleRadius(cosRadius, point) {
	    point = cartesian(point), point[0] -= cosRadius;
	    cartesianNormalizeInPlace(point);
	    var radius = acos(-point[1]);
	    return ((-point[2] < 0 ? -radius : radius) + tau$3 - epsilon$2) % tau$3;
	  }

	  var circle = function circle() {
	    var center = constant$7([0, 0]),
	        radius = constant$7(90),
	        precision = constant$7(6),
	        ring,
	        rotate,
	        stream = { point: point };

	    function point(x, y) {
	      ring.push(x = rotate(x, y));
	      x[0] *= degrees$1, x[1] *= degrees$1;
	    }

	    function circle() {
	      var c = center.apply(this, arguments),
	          r = radius.apply(this, arguments) * radians,
	          p = precision.apply(this, arguments) * radians;
	      ring = [];
	      rotate = rotateRadians(-c[0] * radians, -c[1] * radians, 0).invert;
	      circleStream(stream, r, p, 1);
	      c = { type: "Polygon", coordinates: [ring] };
	      ring = rotate = null;
	      return c;
	    }

	    circle.center = function (_) {
	      return arguments.length ? (center = typeof _ === "function" ? _ : constant$7([+_[0], +_[1]]), circle) : center;
	    };

	    circle.radius = function (_) {
	      return arguments.length ? (radius = typeof _ === "function" ? _ : constant$7(+_), circle) : radius;
	    };

	    circle.precision = function (_) {
	      return arguments.length ? (precision = typeof _ === "function" ? _ : constant$7(+_), circle) : precision;
	    };

	    return circle;
	  };

	  var clipBuffer = function clipBuffer() {
	    var lines = [],
	        line;
	    return {
	      point: function point(x, y) {
	        line.push([x, y]);
	      },
	      lineStart: function lineStart() {
	        lines.push(line = []);
	      },
	      lineEnd: noop$1,
	      rejoin: function rejoin() {
	        if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
	      },
	      result: function result() {
	        var result = lines;
	        lines = [];
	        line = null;
	        return result;
	      }
	    };
	  };

	  var clipLine = function clipLine(a, b, x0, y0, x1, y1) {
	    var ax = a[0],
	        ay = a[1],
	        bx = b[0],
	        by = b[1],
	        t0 = 0,
	        t1 = 1,
	        dx = bx - ax,
	        dy = by - ay,
	        r;

	    r = x0 - ax;
	    if (!dx && r > 0) return;
	    r /= dx;
	    if (dx < 0) {
	      if (r < t0) return;
	      if (r < t1) t1 = r;
	    } else if (dx > 0) {
	      if (r > t1) return;
	      if (r > t0) t0 = r;
	    }

	    r = x1 - ax;
	    if (!dx && r < 0) return;
	    r /= dx;
	    if (dx < 0) {
	      if (r > t1) return;
	      if (r > t0) t0 = r;
	    } else if (dx > 0) {
	      if (r < t0) return;
	      if (r < t1) t1 = r;
	    }

	    r = y0 - ay;
	    if (!dy && r > 0) return;
	    r /= dy;
	    if (dy < 0) {
	      if (r < t0) return;
	      if (r < t1) t1 = r;
	    } else if (dy > 0) {
	      if (r > t1) return;
	      if (r > t0) t0 = r;
	    }

	    r = y1 - ay;
	    if (!dy && r < 0) return;
	    r /= dy;
	    if (dy < 0) {
	      if (r > t1) return;
	      if (r > t0) t0 = r;
	    } else if (dy > 0) {
	      if (r < t0) return;
	      if (r < t1) t1 = r;
	    }

	    if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
	    if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
	    return true;
	  };

	  var pointEqual = function pointEqual(a, b) {
	    return abs(a[0] - b[0]) < epsilon$2 && abs(a[1] - b[1]) < epsilon$2;
	  };

	  function Intersection(point, points, other, entry) {
	    this.x = point;
	    this.z = points;
	    this.o = other; // another intersection
	    this.e = entry; // is an entry?
	    this.v = false; // visited
	    this.n = this.p = null; // next & previous
	  }

	  // A generalized polygon clipping algorithm: given a polygon that has been cut
	  // into its visible line segments, and rejoins the segments by interpolating
	  // along the clip edge.
	  var clipPolygon = function clipPolygon(segments, compareIntersection, startInside, interpolate, stream) {
	    var subject = [],
	        clip = [],
	        i,
	        n;

	    segments.forEach(function (segment) {
	      if ((n = segment.length - 1) <= 0) return;
	      var n,
	          p0 = segment[0],
	          p1 = segment[n],
	          x;

	      // If the first and last points of a segment are coincident, then treat as a
	      // closed ring. TODO if all rings are closed, then the winding order of the
	      // exterior ring should be checked.
	      if (pointEqual(p0, p1)) {
	        stream.lineStart();
	        for (i = 0; i < n; ++i) {
	          stream.point((p0 = segment[i])[0], p0[1]);
	        }stream.lineEnd();
	        return;
	      }

	      subject.push(x = new Intersection(p0, segment, null, true));
	      clip.push(x.o = new Intersection(p0, null, x, false));
	      subject.push(x = new Intersection(p1, segment, null, false));
	      clip.push(x.o = new Intersection(p1, null, x, true));
	    });

	    if (!subject.length) return;

	    clip.sort(compareIntersection);
	    link$1(subject);
	    link$1(clip);

	    for (i = 0, n = clip.length; i < n; ++i) {
	      clip[i].e = startInside = !startInside;
	    }

	    var start = subject[0],
	        points,
	        point;

	    while (1) {
	      // Find first unvisited intersection.
	      var current = start,
	          isSubject = true;
	      while (current.v) {
	        if ((current = current.n) === start) return;
	      }points = current.z;
	      stream.lineStart();
	      do {
	        current.v = current.o.v = true;
	        if (current.e) {
	          if (isSubject) {
	            for (i = 0, n = points.length; i < n; ++i) {
	              stream.point((point = points[i])[0], point[1]);
	            }
	          } else {
	            interpolate(current.x, current.n.x, 1, stream);
	          }
	          current = current.n;
	        } else {
	          if (isSubject) {
	            points = current.p.z;
	            for (i = points.length - 1; i >= 0; --i) {
	              stream.point((point = points[i])[0], point[1]);
	            }
	          } else {
	            interpolate(current.x, current.p.x, -1, stream);
	          }
	          current = current.p;
	        }
	        current = current.o;
	        points = current.z;
	        isSubject = !isSubject;
	      } while (!current.v);
	      stream.lineEnd();
	    }
	  };

	  function link$1(array) {
	    if (!(n = array.length)) return;
	    var n,
	        i = 0,
	        a = array[0],
	        b;
	    while (++i < n) {
	      a.n = b = array[i];
	      b.p = a;
	      a = b;
	    }
	    a.n = b = array[0];
	    b.p = a;
	  }

	  var clipMax = 1e9;
	  var clipMin = -clipMax;

	  // TODO Use d3-polygon’s polygonContains here for the ring check?
	  // TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

	  function _clipExtent(x0, y0, x1, y1) {

	    function visible(x, y) {
	      return x0 <= x && x <= x1 && y0 <= y && y <= y1;
	    }

	    function interpolate(from, to, direction, stream) {
	      var a = 0,
	          a1 = 0;
	      if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
	        do {
	          stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
	        } while ((a = (a + direction + 4) % 4) !== a1);
	      } else {
	        stream.point(to[0], to[1]);
	      }
	    }

	    function corner(p, direction) {
	      return abs(p[0] - x0) < epsilon$2 ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < epsilon$2 ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < epsilon$2 ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
	    }

	    function compareIntersection(a, b) {
	      return comparePoint(a.x, b.x);
	    }

	    function comparePoint(a, b) {
	      var ca = corner(a, 1),
	          cb = corner(b, 1);
	      return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
	    }

	    return function (stream) {
	      var activeStream = stream,
	          bufferStream = clipBuffer(),
	          segments,
	          polygon,
	          ring,
	          x__,
	          y__,
	          v__,
	          // first point
	      x_,
	          y_,
	          v_,
	          // previous point
	      first,
	          clean;

	      var clipStream = {
	        point: point,
	        lineStart: lineStart,
	        lineEnd: lineEnd,
	        polygonStart: polygonStart,
	        polygonEnd: polygonEnd
	      };

	      function point(x, y) {
	        if (visible(x, y)) activeStream.point(x, y);
	      }

	      function polygonInside() {
	        var winding = 0;

	        for (var i = 0, n = polygon.length; i < n; ++i) {
	          for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
	            a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
	            if (a1 <= y1) {
	              if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding;
	            } else {
	              if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding;
	            }
	          }
	        }

	        return winding;
	      }

	      // Buffer geometry within a polygon and then clip it en masse.
	      function polygonStart() {
	        activeStream = bufferStream, segments = [], polygon = [], clean = true;
	      }

	      function polygonEnd() {
	        var startInside = polygonInside(),
	            cleanInside = clean && startInside,
	            visible = (segments = merge(segments)).length;
	        if (cleanInside || visible) {
	          stream.polygonStart();
	          if (cleanInside) {
	            stream.lineStart();
	            interpolate(null, null, 1, stream);
	            stream.lineEnd();
	          }
	          if (visible) {
	            clipPolygon(segments, compareIntersection, startInside, interpolate, stream);
	          }
	          stream.polygonEnd();
	        }
	        activeStream = stream, segments = polygon = ring = null;
	      }

	      function lineStart() {
	        clipStream.point = linePoint;
	        if (polygon) polygon.push(ring = []);
	        first = true;
	        v_ = false;
	        x_ = y_ = NaN;
	      }

	      // TODO rather than special-case polygons, simply handle them separately.
	      // Ideally, coincident intersection points should be jittered to avoid
	      // clipping issues.
	      function lineEnd() {
	        if (segments) {
	          linePoint(x__, y__);
	          if (v__ && v_) bufferStream.rejoin();
	          segments.push(bufferStream.result());
	        }
	        clipStream.point = point;
	        if (v_) activeStream.lineEnd();
	      }

	      function linePoint(x, y) {
	        var v = visible(x, y);
	        if (polygon) ring.push([x, y]);
	        if (first) {
	          x__ = x, y__ = y, v__ = v;
	          first = false;
	          if (v) {
	            activeStream.lineStart();
	            activeStream.point(x, y);
	          }
	        } else {
	          if (v && v_) activeStream.point(x, y);else {
	            var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
	                b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
	            if (clipLine(a, b, x0, y0, x1, y1)) {
	              if (!v_) {
	                activeStream.lineStart();
	                activeStream.point(a[0], a[1]);
	              }
	              activeStream.point(b[0], b[1]);
	              if (!v) activeStream.lineEnd();
	              clean = false;
	            } else if (v) {
	              activeStream.lineStart();
	              activeStream.point(x, y);
	              clean = false;
	            }
	          }
	        }
	        x_ = x, y_ = y, v_ = v;
	      }

	      return clipStream;
	    };
	  }

	  var extent$1 = function extent$1() {
	    var x0 = 0,
	        y0 = 0,
	        x1 = 960,
	        y1 = 500,
	        cache,
	        cacheStream,
	        clip;

	    return clip = {
	      stream: function stream(_stream) {
	        return cache && cacheStream === _stream ? cache : cache = _clipExtent(x0, y0, x1, y1)(cacheStream = _stream);
	      },
	      extent: function extent(_) {
	        return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
	      }
	    };
	  };

	  var sum$1 = adder();

	  var polygonContains = function polygonContains(polygon, point) {
	    var lambda = point[0],
	        phi = point[1],
	        normal = [sin$1(lambda), -cos$1(lambda), 0],
	        angle = 0,
	        winding = 0;

	    sum$1.reset();

	    for (var i = 0, n = polygon.length; i < n; ++i) {
	      if (!(m = (ring = polygon[i]).length)) continue;
	      var ring,
	          m,
	          point0 = ring[m - 1],
	          lambda0 = point0[0],
	          phi0 = point0[1] / 2 + quarterPi,
	          sinPhi0 = sin$1(phi0),
	          cosPhi0 = cos$1(phi0);

	      for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
	        var point1 = ring[j],
	            lambda1 = point1[0],
	            phi1 = point1[1] / 2 + quarterPi,
	            sinPhi1 = sin$1(phi1),
	            cosPhi1 = cos$1(phi1),
	            delta = lambda1 - lambda0,
	            sign$$1 = delta >= 0 ? 1 : -1,
	            absDelta = sign$$1 * delta,
	            antimeridian = absDelta > pi$3,
	            k = sinPhi0 * sinPhi1;

	        sum$1.add(atan2(k * sign$$1 * sin$1(absDelta), cosPhi0 * cosPhi1 + k * cos$1(absDelta)));
	        angle += antimeridian ? delta + sign$$1 * tau$3 : delta;

	        // Are the longitudes either side of the point’s meridian (lambda),
	        // and are the latitudes smaller than the parallel (phi)?
	        if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
	          var arc = cartesianCross(cartesian(point0), cartesian(point1));
	          cartesianNormalizeInPlace(arc);
	          var intersection = cartesianCross(normal, arc);
	          cartesianNormalizeInPlace(intersection);
	          var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
	          if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
	            winding += antimeridian ^ delta >= 0 ? 1 : -1;
	          }
	        }
	      }
	    }

	    // First, determine whether the South pole is inside or outside:
	    //
	    // It is inside if:
	    // * the polygon winds around it in a clockwise direction.
	    // * the polygon does not (cumulatively) wind around it, but has a negative
	    //   (counter-clockwise) area.
	    //
	    // Second, count the (signed) number of times a segment crosses a lambda
	    // from the point to the South pole.  If it is zero, then the point is the
	    // same side as the South pole.

	    return (angle < -epsilon$2 || angle < epsilon$2 && sum$1 < -epsilon$2) ^ winding & 1;
	  };

	  var lengthSum = adder();
	  var lambda0$2;
	  var sinPhi0$1;
	  var cosPhi0$1;

	  var lengthStream = {
	    sphere: noop$1,
	    point: noop$1,
	    lineStart: lengthLineStart,
	    lineEnd: noop$1,
	    polygonStart: noop$1,
	    polygonEnd: noop$1
	  };

	  function lengthLineStart() {
	    lengthStream.point = lengthPointFirst;
	    lengthStream.lineEnd = lengthLineEnd;
	  }

	  function lengthLineEnd() {
	    lengthStream.point = lengthStream.lineEnd = noop$1;
	  }

	  function lengthPointFirst(lambda, phi) {
	    lambda *= radians, phi *= radians;
	    lambda0$2 = lambda, sinPhi0$1 = sin$1(phi), cosPhi0$1 = cos$1(phi);
	    lengthStream.point = lengthPoint;
	  }

	  function lengthPoint(lambda, phi) {
	    lambda *= radians, phi *= radians;
	    var sinPhi = sin$1(phi),
	        cosPhi = cos$1(phi),
	        delta = abs(lambda - lambda0$2),
	        cosDelta = cos$1(delta),
	        sinDelta = sin$1(delta),
	        x = cosPhi * sinDelta,
	        y = cosPhi0$1 * sinPhi - sinPhi0$1 * cosPhi * cosDelta,
	        z = sinPhi0$1 * sinPhi + cosPhi0$1 * cosPhi * cosDelta;
	    lengthSum.add(atan2(sqrt(x * x + y * y), z));
	    lambda0$2 = lambda, sinPhi0$1 = sinPhi, cosPhi0$1 = cosPhi;
	  }

	  var length$1 = function length$1(object) {
	    lengthSum.reset();
	    geoStream(object, lengthStream);
	    return +lengthSum;
	  };

	  var coordinates = [null, null];
	  var object$1 = { type: "LineString", coordinates: coordinates };

	  var distance = function distance(a, b) {
	    coordinates[0] = a;
	    coordinates[1] = b;
	    return length$1(object$1);
	  };

	  var containsObjectType = {
	    Feature: function Feature(object, point) {
	      return containsGeometry(object.geometry, point);
	    },
	    FeatureCollection: function FeatureCollection(object, point) {
	      var features = object.features,
	          i = -1,
	          n = features.length;
	      while (++i < n) {
	        if (containsGeometry(features[i].geometry, point)) return true;
	      }return false;
	    }
	  };

	  var containsGeometryType = {
	    Sphere: function Sphere() {
	      return true;
	    },
	    Point: function Point(object, point) {
	      return containsPoint(object.coordinates, point);
	    },
	    MultiPoint: function MultiPoint(object, point) {
	      var coordinates = object.coordinates,
	          i = -1,
	          n = coordinates.length;
	      while (++i < n) {
	        if (containsPoint(coordinates[i], point)) return true;
	      }return false;
	    },
	    LineString: function LineString(object, point) {
	      return containsLine(object.coordinates, point);
	    },
	    MultiLineString: function MultiLineString(object, point) {
	      var coordinates = object.coordinates,
	          i = -1,
	          n = coordinates.length;
	      while (++i < n) {
	        if (containsLine(coordinates[i], point)) return true;
	      }return false;
	    },
	    Polygon: function Polygon(object, point) {
	      return containsPolygon(object.coordinates, point);
	    },
	    MultiPolygon: function MultiPolygon(object, point) {
	      var coordinates = object.coordinates,
	          i = -1,
	          n = coordinates.length;
	      while (++i < n) {
	        if (containsPolygon(coordinates[i], point)) return true;
	      }return false;
	    },
	    GeometryCollection: function GeometryCollection(object, point) {
	      var geometries = object.geometries,
	          i = -1,
	          n = geometries.length;
	      while (++i < n) {
	        if (containsGeometry(geometries[i], point)) return true;
	      }return false;
	    }
	  };

	  function containsGeometry(geometry, point) {
	    return geometry && containsGeometryType.hasOwnProperty(geometry.type) ? containsGeometryType[geometry.type](geometry, point) : false;
	  }

	  function containsPoint(coordinates, point) {
	    return distance(coordinates, point) === 0;
	  }

	  function containsLine(coordinates, point) {
	    var ab = distance(coordinates[0], coordinates[1]),
	        ao = distance(coordinates[0], point),
	        ob = distance(point, coordinates[1]);
	    return ao + ob <= ab + epsilon$2;
	  }

	  function containsPolygon(coordinates, point) {
	    return !!polygonContains(coordinates.map(ringRadians), pointRadians(point));
	  }

	  function ringRadians(ring) {
	    return ring = ring.map(pointRadians), ring.pop(), ring;
	  }

	  function pointRadians(point) {
	    return [point[0] * radians, point[1] * radians];
	  }

	  var contains = function contains(object, point) {
	    return (object && containsObjectType.hasOwnProperty(object.type) ? containsObjectType[object.type] : containsGeometry)(object, point);
	  };

	  function graticuleX(y0, y1, dy) {
	    var y = sequence(y0, y1 - epsilon$2, dy).concat(y1);
	    return function (x) {
	      return y.map(function (y) {
	        return [x, y];
	      });
	    };
	  }

	  function graticuleY(x0, x1, dx) {
	    var x = sequence(x0, x1 - epsilon$2, dx).concat(x1);
	    return function (y) {
	      return x.map(function (x) {
	        return [x, y];
	      });
	    };
	  }

	  function graticule() {
	    var x1,
	        x0,
	        X1,
	        X0,
	        y1,
	        y0,
	        Y1,
	        Y0,
	        dx = 10,
	        dy = dx,
	        DX = 90,
	        DY = 360,
	        x,
	        y,
	        X,
	        Y,
	        precision = 2.5;

	    function graticule() {
	      return { type: "MultiLineString", coordinates: lines() };
	    }

	    function lines() {
	      return sequence(ceil(X0 / DX) * DX, X1, DX).map(X).concat(sequence(ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(sequence(ceil(x0 / dx) * dx, x1, dx).filter(function (x) {
	        return abs(x % DX) > epsilon$2;
	      }).map(x)).concat(sequence(ceil(y0 / dy) * dy, y1, dy).filter(function (y) {
	        return abs(y % DY) > epsilon$2;
	      }).map(y));
	    }

	    graticule.lines = function () {
	      return lines().map(function (coordinates) {
	        return { type: "LineString", coordinates: coordinates };
	      });
	    };

	    graticule.outline = function () {
	      return {
	        type: "Polygon",
	        coordinates: [X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1))]
	      };
	    };

	    graticule.extent = function (_) {
	      if (!arguments.length) return graticule.extentMinor();
	      return graticule.extentMajor(_).extentMinor(_);
	    };

	    graticule.extentMajor = function (_) {
	      if (!arguments.length) return [[X0, Y0], [X1, Y1]];
	      X0 = +_[0][0], X1 = +_[1][0];
	      Y0 = +_[0][1], Y1 = +_[1][1];
	      if (X0 > X1) _ = X0, X0 = X1, X1 = _;
	      if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
	      return graticule.precision(precision);
	    };

	    graticule.extentMinor = function (_) {
	      if (!arguments.length) return [[x0, y0], [x1, y1]];
	      x0 = +_[0][0], x1 = +_[1][0];
	      y0 = +_[0][1], y1 = +_[1][1];
	      if (x0 > x1) _ = x0, x0 = x1, x1 = _;
	      if (y0 > y1) _ = y0, y0 = y1, y1 = _;
	      return graticule.precision(precision);
	    };

	    graticule.step = function (_) {
	      if (!arguments.length) return graticule.stepMinor();
	      return graticule.stepMajor(_).stepMinor(_);
	    };

	    graticule.stepMajor = function (_) {
	      if (!arguments.length) return [DX, DY];
	      DX = +_[0], DY = +_[1];
	      return graticule;
	    };

	    graticule.stepMinor = function (_) {
	      if (!arguments.length) return [dx, dy];
	      dx = +_[0], dy = +_[1];
	      return graticule;
	    };

	    graticule.precision = function (_) {
	      if (!arguments.length) return precision;
	      precision = +_;
	      x = graticuleX(y0, y1, 90);
	      y = graticuleY(x0, x1, precision);
	      X = graticuleX(Y0, Y1, 90);
	      Y = graticuleY(X0, X1, precision);
	      return graticule;
	    };

	    return graticule.extentMajor([[-180, -90 + epsilon$2], [180, 90 - epsilon$2]]).extentMinor([[-180, -80 - epsilon$2], [180, 80 + epsilon$2]]);
	  }

	  function graticule10() {
	    return graticule()();
	  }

	  var interpolate$1 = function interpolate$1(a, b) {
	    var x0 = a[0] * radians,
	        y0 = a[1] * radians,
	        x1 = b[0] * radians,
	        y1 = b[1] * radians,
	        cy0 = cos$1(y0),
	        sy0 = sin$1(y0),
	        cy1 = cos$1(y1),
	        sy1 = sin$1(y1),
	        kx0 = cy0 * cos$1(x0),
	        ky0 = cy0 * sin$1(x0),
	        kx1 = cy1 * cos$1(x1),
	        ky1 = cy1 * sin$1(x1),
	        d = 2 * asin(sqrt(haversin(y1 - y0) + cy0 * cy1 * haversin(x1 - x0))),
	        k = sin$1(d);

	    var interpolate = d ? function (t) {
	      var B = sin$1(t *= d) / k,
	          A = sin$1(d - t) / k,
	          x = A * kx0 + B * kx1,
	          y = A * ky0 + B * ky1,
	          z = A * sy0 + B * sy1;
	      return [atan2(y, x) * degrees$1, atan2(z, sqrt(x * x + y * y)) * degrees$1];
	    } : function () {
	      return [x0 * degrees$1, y0 * degrees$1];
	    };

	    interpolate.distance = d;

	    return interpolate;
	  };

	  var identity$4 = function identity$4(x) {
	    return x;
	  };

	  var areaSum$1 = adder();
	  var areaRingSum$1 = adder();
	  var x00;
	  var y00;
	  var x0$1;
	  var y0$1;

	  var areaStream$1 = {
	    point: noop$1,
	    lineStart: noop$1,
	    lineEnd: noop$1,
	    polygonStart: function polygonStart() {
	      areaStream$1.lineStart = areaRingStart$1;
	      areaStream$1.lineEnd = areaRingEnd$1;
	    },
	    polygonEnd: function polygonEnd() {
	      areaStream$1.lineStart = areaStream$1.lineEnd = areaStream$1.point = noop$1;
	      areaSum$1.add(abs(areaRingSum$1));
	      areaRingSum$1.reset();
	    },
	    result: function result() {
	      var area = areaSum$1 / 2;
	      areaSum$1.reset();
	      return area;
	    }
	  };

	  function areaRingStart$1() {
	    areaStream$1.point = areaPointFirst$1;
	  }

	  function areaPointFirst$1(x, y) {
	    areaStream$1.point = areaPoint$1;
	    x00 = x0$1 = x, y00 = y0$1 = y;
	  }

	  function areaPoint$1(x, y) {
	    areaRingSum$1.add(y0$1 * x - x0$1 * y);
	    x0$1 = x, y0$1 = y;
	  }

	  function areaRingEnd$1() {
	    areaPoint$1(x00, y00);
	  }

	  var x0$2 = Infinity;
	  var y0$2 = x0$2;
	  var x1 = -x0$2;
	  var y1 = x1;

	  var boundsStream$1 = {
	    point: boundsPoint$1,
	    lineStart: noop$1,
	    lineEnd: noop$1,
	    polygonStart: noop$1,
	    polygonEnd: noop$1,
	    result: function result() {
	      var bounds = [[x0$2, y0$2], [x1, y1]];
	      x1 = y1 = -(y0$2 = x0$2 = Infinity);
	      return bounds;
	    }
	  };

	  function boundsPoint$1(x, y) {
	    if (x < x0$2) x0$2 = x;
	    if (x > x1) x1 = x;
	    if (y < y0$2) y0$2 = y;
	    if (y > y1) y1 = y;
	  }

	  // TODO Enforce positive area for exterior, negative area for interior?

	  var X0$1 = 0;
	  var Y0$1 = 0;
	  var Z0$1 = 0;
	  var X1$1 = 0;
	  var Y1$1 = 0;
	  var Z1$1 = 0;
	  var X2$1 = 0;
	  var Y2$1 = 0;
	  var Z2$1 = 0;
	  var x00$1;
	  var y00$1;
	  var x0$3;
	  var y0$3;

	  var centroidStream$1 = {
	    point: centroidPoint$1,
	    lineStart: centroidLineStart$1,
	    lineEnd: centroidLineEnd$1,
	    polygonStart: function polygonStart() {
	      centroidStream$1.lineStart = centroidRingStart$1;
	      centroidStream$1.lineEnd = centroidRingEnd$1;
	    },
	    polygonEnd: function polygonEnd() {
	      centroidStream$1.point = centroidPoint$1;
	      centroidStream$1.lineStart = centroidLineStart$1;
	      centroidStream$1.lineEnd = centroidLineEnd$1;
	    },
	    result: function result() {
	      var centroid = Z2$1 ? [X2$1 / Z2$1, Y2$1 / Z2$1] : Z1$1 ? [X1$1 / Z1$1, Y1$1 / Z1$1] : Z0$1 ? [X0$1 / Z0$1, Y0$1 / Z0$1] : [NaN, NaN];
	      X0$1 = Y0$1 = Z0$1 = X1$1 = Y1$1 = Z1$1 = X2$1 = Y2$1 = Z2$1 = 0;
	      return centroid;
	    }
	  };

	  function centroidPoint$1(x, y) {
	    X0$1 += x;
	    Y0$1 += y;
	    ++Z0$1;
	  }

	  function centroidLineStart$1() {
	    centroidStream$1.point = centroidPointFirstLine;
	  }

	  function centroidPointFirstLine(x, y) {
	    centroidStream$1.point = centroidPointLine;
	    centroidPoint$1(x0$3 = x, y0$3 = y);
	  }

	  function centroidPointLine(x, y) {
	    var dx = x - x0$3,
	        dy = y - y0$3,
	        z = sqrt(dx * dx + dy * dy);
	    X1$1 += z * (x0$3 + x) / 2;
	    Y1$1 += z * (y0$3 + y) / 2;
	    Z1$1 += z;
	    centroidPoint$1(x0$3 = x, y0$3 = y);
	  }

	  function centroidLineEnd$1() {
	    centroidStream$1.point = centroidPoint$1;
	  }

	  function centroidRingStart$1() {
	    centroidStream$1.point = centroidPointFirstRing;
	  }

	  function centroidRingEnd$1() {
	    centroidPointRing(x00$1, y00$1);
	  }

	  function centroidPointFirstRing(x, y) {
	    centroidStream$1.point = centroidPointRing;
	    centroidPoint$1(x00$1 = x0$3 = x, y00$1 = y0$3 = y);
	  }

	  function centroidPointRing(x, y) {
	    var dx = x - x0$3,
	        dy = y - y0$3,
	        z = sqrt(dx * dx + dy * dy);

	    X1$1 += z * (x0$3 + x) / 2;
	    Y1$1 += z * (y0$3 + y) / 2;
	    Z1$1 += z;

	    z = y0$3 * x - x0$3 * y;
	    X2$1 += z * (x0$3 + x);
	    Y2$1 += z * (y0$3 + y);
	    Z2$1 += z * 3;
	    centroidPoint$1(x0$3 = x, y0$3 = y);
	  }

	  function PathContext(context) {
	    this._context = context;
	  }

	  PathContext.prototype = {
	    _radius: 4.5,
	    pointRadius: function pointRadius(_) {
	      return this._radius = _, this;
	    },
	    polygonStart: function polygonStart() {
	      this._line = 0;
	    },
	    polygonEnd: function polygonEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      if (this._line === 0) this._context.closePath();
	      this._point = NaN;
	    },
	    point: function point(x, y) {
	      switch (this._point) {
	        case 0:
	          {
	            this._context.moveTo(x, y);
	            this._point = 1;
	            break;
	          }
	        case 1:
	          {
	            this._context.lineTo(x, y);
	            break;
	          }
	        default:
	          {
	            this._context.moveTo(x + this._radius, y);
	            this._context.arc(x, y, this._radius, 0, tau$3);
	            break;
	          }
	      }
	    },
	    result: noop$1
	  };

	  var lengthSum$1 = adder();
	  var lengthRing;
	  var x00$2;
	  var y00$2;
	  var x0$4;
	  var y0$4;

	  var lengthStream$1 = {
	    point: noop$1,
	    lineStart: function lineStart() {
	      lengthStream$1.point = lengthPointFirst$1;
	    },
	    lineEnd: function lineEnd() {
	      if (lengthRing) lengthPoint$1(x00$2, y00$2);
	      lengthStream$1.point = noop$1;
	    },
	    polygonStart: function polygonStart() {
	      lengthRing = true;
	    },
	    polygonEnd: function polygonEnd() {
	      lengthRing = null;
	    },
	    result: function result() {
	      var length = +lengthSum$1;
	      lengthSum$1.reset();
	      return length;
	    }
	  };

	  function lengthPointFirst$1(x, y) {
	    lengthStream$1.point = lengthPoint$1;
	    x00$2 = x0$4 = x, y00$2 = y0$4 = y;
	  }

	  function lengthPoint$1(x, y) {
	    x0$4 -= x, y0$4 -= y;
	    lengthSum$1.add(sqrt(x0$4 * x0$4 + y0$4 * y0$4));
	    x0$4 = x, y0$4 = y;
	  }

	  function PathString() {
	    this._string = [];
	  }

	  PathString.prototype = {
	    _radius: 4.5,
	    _circle: circle$1(4.5),
	    pointRadius: function pointRadius(_) {
	      if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
	      return this;
	    },
	    polygonStart: function polygonStart() {
	      this._line = 0;
	    },
	    polygonEnd: function polygonEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      if (this._line === 0) this._string.push("Z");
	      this._point = NaN;
	    },
	    point: function point(x, y) {
	      switch (this._point) {
	        case 0:
	          {
	            this._string.push("M", x, ",", y);
	            this._point = 1;
	            break;
	          }
	        case 1:
	          {
	            this._string.push("L", x, ",", y);
	            break;
	          }
	        default:
	          {
	            if (this._circle == null) this._circle = circle$1(this._radius);
	            this._string.push("M", x, ",", y, this._circle);
	            break;
	          }
	      }
	    },
	    result: function result() {
	      if (this._string.length) {
	        var result = this._string.join("");
	        this._string = [];
	        return result;
	      } else {
	        return null;
	      }
	    }
	  };

	  function circle$1(radius) {
	    return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
	  }

	  var index$1 = function index$1(projection, context) {
	    var pointRadius = 4.5,
	        projectionStream,
	        contextStream;

	    function path(object) {
	      if (object) {
	        if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
	        geoStream(object, projectionStream(contextStream));
	      }
	      return contextStream.result();
	    }

	    path.area = function (object) {
	      geoStream(object, projectionStream(areaStream$1));
	      return areaStream$1.result();
	    };

	    path.measure = function (object) {
	      geoStream(object, projectionStream(lengthStream$1));
	      return lengthStream$1.result();
	    };

	    path.bounds = function (object) {
	      geoStream(object, projectionStream(boundsStream$1));
	      return boundsStream$1.result();
	    };

	    path.centroid = function (object) {
	      geoStream(object, projectionStream(centroidStream$1));
	      return centroidStream$1.result();
	    };

	    path.projection = function (_) {
	      return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$4) : (projection = _).stream, path) : projection;
	    };

	    path.context = function (_) {
	      if (!arguments.length) return context;
	      contextStream = _ == null ? (context = null, new PathString()) : new PathContext(context = _);
	      if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
	      return path;
	    };

	    path.pointRadius = function (_) {
	      if (!arguments.length) return pointRadius;
	      pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
	      return path;
	    };

	    return path.projection(projection).context(context);
	  };

	  var clip = function clip(pointVisible, clipLine, interpolate, start) {
	    return function (rotate, sink) {
	      var line = clipLine(sink),
	          rotatedStart = rotate.invert(start[0], start[1]),
	          ringBuffer = clipBuffer(),
	          ringSink = clipLine(ringBuffer),
	          polygonStarted = false,
	          polygon,
	          segments,
	          ring;

	      var clip = {
	        point: point,
	        lineStart: lineStart,
	        lineEnd: lineEnd,
	        polygonStart: function polygonStart() {
	          clip.point = pointRing;
	          clip.lineStart = ringStart;
	          clip.lineEnd = ringEnd;
	          segments = [];
	          polygon = [];
	        },
	        polygonEnd: function polygonEnd() {
	          clip.point = point;
	          clip.lineStart = lineStart;
	          clip.lineEnd = lineEnd;
	          segments = merge(segments);
	          var startInside = polygonContains(polygon, rotatedStart);
	          if (segments.length) {
	            if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
	            clipPolygon(segments, compareIntersection, startInside, interpolate, sink);
	          } else if (startInside) {
	            if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
	            sink.lineStart();
	            interpolate(null, null, 1, sink);
	            sink.lineEnd();
	          }
	          if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
	          segments = polygon = null;
	        },
	        sphere: function sphere() {
	          sink.polygonStart();
	          sink.lineStart();
	          interpolate(null, null, 1, sink);
	          sink.lineEnd();
	          sink.polygonEnd();
	        }
	      };

	      function point(lambda, phi) {
	        var point = rotate(lambda, phi);
	        if (pointVisible(lambda = point[0], phi = point[1])) sink.point(lambda, phi);
	      }

	      function pointLine(lambda, phi) {
	        var point = rotate(lambda, phi);
	        line.point(point[0], point[1]);
	      }

	      function lineStart() {
	        clip.point = pointLine;
	        line.lineStart();
	      }

	      function lineEnd() {
	        clip.point = point;
	        line.lineEnd();
	      }

	      function pointRing(lambda, phi) {
	        ring.push([lambda, phi]);
	        var point = rotate(lambda, phi);
	        ringSink.point(point[0], point[1]);
	      }

	      function ringStart() {
	        ringSink.lineStart();
	        ring = [];
	      }

	      function ringEnd() {
	        pointRing(ring[0][0], ring[0][1]);
	        ringSink.lineEnd();

	        var clean = ringSink.clean(),
	            ringSegments = ringBuffer.result(),
	            i,
	            n = ringSegments.length,
	            m,
	            segment,
	            point;

	        ring.pop();
	        polygon.push(ring);
	        ring = null;

	        if (!n) return;

	        // No intersections.
	        if (clean & 1) {
	          segment = ringSegments[0];
	          if ((m = segment.length - 1) > 0) {
	            if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
	            sink.lineStart();
	            for (i = 0; i < m; ++i) {
	              sink.point((point = segment[i])[0], point[1]);
	            }sink.lineEnd();
	          }
	          return;
	        }

	        // Rejoin connected segments.
	        // TODO reuse ringBuffer.rejoin()?
	        if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

	        segments.push(ringSegments.filter(validSegment));
	      }

	      return clip;
	    };
	  };

	  function validSegment(segment) {
	    return segment.length > 1;
	  }

	  // Intersections are sorted along the clip edge. For both antimeridian cutting
	  // and circle clipping, the same comparison is used.
	  function compareIntersection(a, b) {
	    return ((a = a.x)[0] < 0 ? a[1] - halfPi$2 - epsilon$2 : halfPi$2 - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfPi$2 - epsilon$2 : halfPi$2 - b[1]);
	  }

	  var clipAntimeridian = clip(function () {
	    return true;
	  }, clipAntimeridianLine, clipAntimeridianInterpolate, [-pi$3, -halfPi$2]);

	  // Takes a line and cuts into visible segments. Return values: 0 - there were
	  // intersections or the line was empty; 1 - no intersections; 2 - there were
	  // intersections, and the first and last segments should be rejoined.
	  function clipAntimeridianLine(stream) {
	    var lambda0 = NaN,
	        phi0 = NaN,
	        sign0 = NaN,
	        _clean; // no intersections

	    return {
	      lineStart: function lineStart() {
	        stream.lineStart();
	        _clean = 1;
	      },
	      point: function point(lambda1, phi1) {
	        var sign1 = lambda1 > 0 ? pi$3 : -pi$3,
	            delta = abs(lambda1 - lambda0);
	        if (abs(delta - pi$3) < epsilon$2) {
	          // line crosses a pole
	          stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi$2 : -halfPi$2);
	          stream.point(sign0, phi0);
	          stream.lineEnd();
	          stream.lineStart();
	          stream.point(sign1, phi0);
	          stream.point(lambda1, phi0);
	          _clean = 0;
	        } else if (sign0 !== sign1 && delta >= pi$3) {
	          // line crosses antimeridian
	          if (abs(lambda0 - sign0) < epsilon$2) lambda0 -= sign0 * epsilon$2; // handle degeneracies
	          if (abs(lambda1 - sign1) < epsilon$2) lambda1 -= sign1 * epsilon$2;
	          phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
	          stream.point(sign0, phi0);
	          stream.lineEnd();
	          stream.lineStart();
	          stream.point(sign1, phi0);
	          _clean = 0;
	        }
	        stream.point(lambda0 = lambda1, phi0 = phi1);
	        sign0 = sign1;
	      },
	      lineEnd: function lineEnd() {
	        stream.lineEnd();
	        lambda0 = phi0 = NaN;
	      },
	      clean: function clean() {
	        return 2 - _clean; // if intersections, rejoin first and last segments
	      }
	    };
	  }

	  function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
	    var cosPhi0,
	        cosPhi1,
	        sinLambda0Lambda1 = sin$1(lambda0 - lambda1);
	    return abs(sinLambda0Lambda1) > epsilon$2 ? atan((sin$1(phi0) * (cosPhi1 = cos$1(phi1)) * sin$1(lambda1) - sin$1(phi1) * (cosPhi0 = cos$1(phi0)) * sin$1(lambda0)) / (cosPhi0 * cosPhi1 * sinLambda0Lambda1)) : (phi0 + phi1) / 2;
	  }

	  function clipAntimeridianInterpolate(from, to, direction, stream) {
	    var phi;
	    if (from == null) {
	      phi = direction * halfPi$2;
	      stream.point(-pi$3, phi);
	      stream.point(0, phi);
	      stream.point(pi$3, phi);
	      stream.point(pi$3, 0);
	      stream.point(pi$3, -phi);
	      stream.point(0, -phi);
	      stream.point(-pi$3, -phi);
	      stream.point(-pi$3, 0);
	      stream.point(-pi$3, phi);
	    } else if (abs(from[0] - to[0]) > epsilon$2) {
	      var lambda = from[0] < to[0] ? pi$3 : -pi$3;
	      phi = direction * lambda / 2;
	      stream.point(-lambda, phi);
	      stream.point(0, phi);
	      stream.point(lambda, phi);
	    } else {
	      stream.point(to[0], to[1]);
	    }
	  }

	  var clipCircle = function clipCircle(radius, delta) {
	    var cr = cos$1(radius),
	        smallRadius = cr > 0,
	        notHemisphere = abs(cr) > epsilon$2; // TODO optimise for this common case

	    function interpolate(from, to, direction, stream) {
	      circleStream(stream, radius, delta, direction, from, to);
	    }

	    function visible(lambda, phi) {
	      return cos$1(lambda) * cos$1(phi) > cr;
	    }

	    // Takes a line and cuts into visible segments. Return values used for polygon
	    // clipping: 0 - there were intersections or the line was empty; 1 - no
	    // intersections 2 - there were intersections, and the first and last segments
	    // should be rejoined.
	    function clipLine(stream) {
	      var point0, // previous point
	      c0, // code for previous point
	      v0, // visibility of previous point
	      v00, // visibility of first point
	      _clean2; // no intersections
	      return {
	        lineStart: function lineStart() {
	          v00 = v0 = false;
	          _clean2 = 1;
	        },
	        point: function point(lambda, phi) {
	          var point1 = [lambda, phi],
	              point2,
	              v = visible(lambda, phi),
	              c = smallRadius ? v ? 0 : code(lambda, phi) : v ? code(lambda + (lambda < 0 ? pi$3 : -pi$3), phi) : 0;
	          if (!point0 && (v00 = v0 = v)) stream.lineStart();
	          // Handle degeneracies.
	          // TODO ignore if not clipping polygons.
	          if (v !== v0) {
	            point2 = intersect(point0, point1);
	            if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2)) {
	              point1[0] += epsilon$2;
	              point1[1] += epsilon$2;
	              v = visible(point1[0], point1[1]);
	            }
	          }
	          if (v !== v0) {
	            _clean2 = 0;
	            if (v) {
	              // outside going in
	              stream.lineStart();
	              point2 = intersect(point1, point0);
	              stream.point(point2[0], point2[1]);
	            } else {
	              // inside going out
	              point2 = intersect(point0, point1);
	              stream.point(point2[0], point2[1]);
	              stream.lineEnd();
	            }
	            point0 = point2;
	          } else if (notHemisphere && point0 && smallRadius ^ v) {
	            var t;
	            // If the codes for two points are different, or are both zero,
	            // and there this segment intersects with the small circle.
	            if (!(c & c0) && (t = intersect(point1, point0, true))) {
	              _clean2 = 0;
	              if (smallRadius) {
	                stream.lineStart();
	                stream.point(t[0][0], t[0][1]);
	                stream.point(t[1][0], t[1][1]);
	                stream.lineEnd();
	              } else {
	                stream.point(t[1][0], t[1][1]);
	                stream.lineEnd();
	                stream.lineStart();
	                stream.point(t[0][0], t[0][1]);
	              }
	            }
	          }
	          if (v && (!point0 || !pointEqual(point0, point1))) {
	            stream.point(point1[0], point1[1]);
	          }
	          point0 = point1, v0 = v, c0 = c;
	        },
	        lineEnd: function lineEnd() {
	          if (v0) stream.lineEnd();
	          point0 = null;
	        },
	        // Rejoin first and last segments if there were intersections and the first
	        // and last points were visible.
	        clean: function clean() {
	          return _clean2 | (v00 && v0) << 1;
	        }
	      };
	    }

	    // Intersects the great circle between a and b with the clip circle.
	    function intersect(a, b, two) {
	      var pa = cartesian(a),
	          pb = cartesian(b);

	      // We have two planes, n1.p = d1 and n2.p = d2.
	      // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
	      var n1 = [1, 0, 0],
	          // normal
	      n2 = cartesianCross(pa, pb),
	          n2n2 = cartesianDot(n2, n2),
	          n1n2 = n2[0],
	          // cartesianDot(n1, n2),
	      determinant = n2n2 - n1n2 * n1n2;

	      // Two polar points.
	      if (!determinant) return !two && a;

	      var c1 = cr * n2n2 / determinant,
	          c2 = -cr * n1n2 / determinant,
	          n1xn2 = cartesianCross(n1, n2),
	          A = cartesianScale(n1, c1),
	          B = cartesianScale(n2, c2);
	      cartesianAddInPlace(A, B);

	      // Solve |p(t)|^2 = 1.
	      var u = n1xn2,
	          w = cartesianDot(A, u),
	          uu = cartesianDot(u, u),
	          t2 = w * w - uu * (cartesianDot(A, A) - 1);

	      if (t2 < 0) return;

	      var t = sqrt(t2),
	          q = cartesianScale(u, (-w - t) / uu);
	      cartesianAddInPlace(q, A);
	      q = spherical(q);

	      if (!two) return q;

	      // Two intersection points.
	      var lambda0 = a[0],
	          lambda1 = b[0],
	          phi0 = a[1],
	          phi1 = b[1],
	          z;

	      if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

	      var delta = lambda1 - lambda0,
	          polar = abs(delta - pi$3) < epsilon$2,
	          meridian = polar || delta < epsilon$2;

	      if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

	      // Check that the first point is between a and b.
	      if (meridian ? polar ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon$2 ? phi0 : phi1) : phi0 <= q[1] && q[1] <= phi1 : delta > pi$3 ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
	        var q1 = cartesianScale(u, (-w + t) / uu);
	        cartesianAddInPlace(q1, A);
	        return [q, spherical(q1)];
	      }
	    }

	    // Generates a 4-bit vector representing the location of a point relative to
	    // the small circle's bounding box.
	    function code(lambda, phi) {
	      var r = smallRadius ? radius : pi$3 - radius,
	          code = 0;
	      if (lambda < -r) code |= 1; // left
	      else if (lambda > r) code |= 2; // right
	      if (phi < -r) code |= 4; // below
	      else if (phi > r) code |= 8; // above
	      return code;
	    }

	    return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi$3, radius - pi$3]);
	  };

	  var transform = function transform(methods) {
	    return {
	      stream: transformer(methods)
	    };
	  };

	  function transformer(methods) {
	    return function (stream) {
	      var s = new TransformStream();
	      for (var key in methods) {
	        s[key] = methods[key];
	      }s.stream = stream;
	      return s;
	    };
	  }

	  function TransformStream() {}

	  TransformStream.prototype = {
	    constructor: TransformStream,
	    point: function point(x, y) {
	      this.stream.point(x, y);
	    },
	    sphere: function sphere() {
	      this.stream.sphere();
	    },
	    lineStart: function lineStart() {
	      this.stream.lineStart();
	    },
	    lineEnd: function lineEnd() {
	      this.stream.lineEnd();
	    },
	    polygonStart: function polygonStart() {
	      this.stream.polygonStart();
	    },
	    polygonEnd: function polygonEnd() {
	      this.stream.polygonEnd();
	    }
	  };

	  function _fitExtent(projection, extent, object) {
	    var w = extent[1][0] - extent[0][0],
	        h = extent[1][1] - extent[0][1],
	        clip = projection.clipExtent && projection.clipExtent();

	    projection.scale(150).translate([0, 0]);

	    if (clip != null) projection.clipExtent(null);

	    geoStream(object, projection.stream(boundsStream$1));

	    var b = boundsStream$1.result(),
	        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
	        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
	        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;

	    if (clip != null) projection.clipExtent(clip);

	    return projection.scale(k * 150).translate([x, y]);
	  }

	  function _fitSize(projection, size, object) {
	    return _fitExtent(projection, [[0, 0], size], object);
	  }

	  var maxDepth = 16;
	  var cosMinDistance = cos$1(30 * radians); // cos(minimum angular distance)

	  var resample = function resample(project, delta2) {
	    return +delta2 ? resample$1(project, delta2) : resampleNone(project);
	  };

	  function resampleNone(project) {
	    return transformer({
	      point: function point(x, y) {
	        x = project(x, y);
	        this.stream.point(x[0], x[1]);
	      }
	    });
	  }

	  function resample$1(project, delta2) {

	    function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
	      var dx = x1 - x0,
	          dy = y1 - y0,
	          d2 = dx * dx + dy * dy;
	      if (d2 > 4 * delta2 && depth--) {
	        var a = a0 + a1,
	            b = b0 + b1,
	            c = c0 + c1,
	            m = sqrt(a * a + b * b + c * c),
	            phi2 = asin(c /= m),
	            lambda2 = abs(abs(c) - 1) < epsilon$2 || abs(lambda0 - lambda1) < epsilon$2 ? (lambda0 + lambda1) / 2 : atan2(b, a),
	            p = project(lambda2, phi2),
	            x2 = p[0],
	            y2 = p[1],
	            dx2 = x2 - x0,
	            dy2 = y2 - y0,
	            dz = dy * dx2 - dx * dy2;
	        if (dz * dz / d2 > delta2 // perpendicular projected distance
	        || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
	        || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
	          // angular distance
	          resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
	          stream.point(x2, y2);
	          resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
	        }
	      }
	    }
	    return function (stream) {
	      var lambda00, x00, y00, a00, b00, c00, // first point
	      lambda0, x0, y0, a0, b0, c0; // previous point

	      var resampleStream = {
	        point: point,
	        lineStart: lineStart,
	        lineEnd: lineEnd,
	        polygonStart: function polygonStart() {
	          stream.polygonStart();resampleStream.lineStart = ringStart;
	        },
	        polygonEnd: function polygonEnd() {
	          stream.polygonEnd();resampleStream.lineStart = lineStart;
	        }
	      };

	      function point(x, y) {
	        x = project(x, y);
	        stream.point(x[0], x[1]);
	      }

	      function lineStart() {
	        x0 = NaN;
	        resampleStream.point = linePoint;
	        stream.lineStart();
	      }

	      function linePoint(lambda, phi) {
	        var c = cartesian([lambda, phi]),
	            p = project(lambda, phi);
	        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
	        stream.point(x0, y0);
	      }

	      function lineEnd() {
	        resampleStream.point = point;
	        stream.lineEnd();
	      }

	      function ringStart() {
	        lineStart();
	        resampleStream.point = ringPoint;
	        resampleStream.lineEnd = ringEnd;
	      }

	      function ringPoint(lambda, phi) {
	        linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
	        resampleStream.point = linePoint;
	      }

	      function ringEnd() {
	        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
	        resampleStream.lineEnd = lineEnd;
	        lineEnd();
	      }

	      return resampleStream;
	    };
	  }

	  var transformRadians = transformer({
	    point: function point(x, y) {
	      this.stream.point(x * radians, y * radians);
	    }
	  });

	  function projection(project) {
	    return projectionMutator(function () {
	      return project;
	    })();
	  }

	  function projectionMutator(projectAt) {
	    var project,
	        k = 150,
	        // scale
	    x = 480,
	        y = 250,
	        // translate
	    dx,
	        dy,
	        lambda = 0,
	        phi = 0,
	        // center
	    deltaLambda = 0,
	        deltaPhi = 0,
	        deltaGamma = 0,
	        rotate,
	        projectRotate,
	        // rotate
	    theta = null,
	        preclip = clipAntimeridian,
	        // clip angle
	    x0 = null,
	        y0,
	        x1,
	        y1,
	        postclip = identity$4,
	        // clip extent
	    delta2 = 0.5,
	        projectResample = resample(projectTransform, delta2),
	        // precision
	    cache,
	        cacheStream;

	    function projection(point) {
	      point = projectRotate(point[0] * radians, point[1] * radians);
	      return [point[0] * k + dx, dy - point[1] * k];
	    }

	    function invert(point) {
	      point = projectRotate.invert((point[0] - dx) / k, (dy - point[1]) / k);
	      return point && [point[0] * degrees$1, point[1] * degrees$1];
	    }

	    function projectTransform(x, y) {
	      return x = project(x, y), [x[0] * k + dx, dy - x[1] * k];
	    }

	    projection.stream = function (stream) {
	      return cache && cacheStream === stream ? cache : cache = transformRadians(preclip(rotate, projectResample(postclip(cacheStream = stream))));
	    };

	    projection.clipAngle = function (_) {
	      return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians, 6 * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees$1;
	    };

	    projection.clipExtent = function (_) {
	      return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$4) : _clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
	    };

	    projection.scale = function (_) {
	      return arguments.length ? (k = +_, recenter()) : k;
	    };

	    projection.translate = function (_) {
	      return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
	    };

	    projection.center = function (_) {
	      return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees$1, phi * degrees$1];
	    };

	    projection.rotate = function (_) {
	      return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees$1, deltaPhi * degrees$1, deltaGamma * degrees$1];
	    };

	    projection.precision = function (_) {
	      return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
	    };

	    projection.fitExtent = function (extent, object) {
	      return _fitExtent(projection, extent, object);
	    };

	    projection.fitSize = function (size, object) {
	      return _fitSize(projection, size, object);
	    };

	    function recenter() {
	      projectRotate = compose(rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma), project);
	      var center = project(lambda, phi);
	      dx = x - center[0] * k;
	      dy = y + center[1] * k;
	      return reset();
	    }

	    function reset() {
	      cache = cacheStream = null;
	      return projection;
	    }

	    return function () {
	      project = projectAt.apply(this, arguments);
	      projection.invert = project.invert && invert;
	      return recenter();
	    };
	  }

	  function conicProjection(projectAt) {
	    var phi0 = 0,
	        phi1 = pi$3 / 3,
	        m = projectionMutator(projectAt),
	        p = m(phi0, phi1);

	    p.parallels = function (_) {
	      return arguments.length ? m(phi0 = _[0] * radians, phi1 = _[1] * radians) : [phi0 * degrees$1, phi1 * degrees$1];
	    };

	    return p;
	  }

	  function cylindricalEqualAreaRaw(phi0) {
	    var cosPhi0 = cos$1(phi0);

	    function forward(lambda, phi) {
	      return [lambda * cosPhi0, sin$1(phi) / cosPhi0];
	    }

	    forward.invert = function (x, y) {
	      return [x / cosPhi0, asin(y * cosPhi0)];
	    };

	    return forward;
	  }

	  function conicEqualAreaRaw(y0, y1) {
	    var sy0 = sin$1(y0),
	        n = (sy0 + sin$1(y1)) / 2;

	    // Are the parallels symmetrical around the Equator?
	    if (abs(n) < epsilon$2) return cylindricalEqualAreaRaw(y0);

	    var c = 1 + sy0 * (2 * n - sy0),
	        r0 = sqrt(c) / n;

	    function project(x, y) {
	      var r = sqrt(c - 2 * n * sin$1(y)) / n;
	      return [r * sin$1(x *= n), r0 - r * cos$1(x)];
	    }

	    project.invert = function (x, y) {
	      var r0y = r0 - y;
	      return [atan2(x, abs(r0y)) / n * sign(r0y), asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
	    };

	    return project;
	  }

	  var conicEqualArea = function conicEqualArea() {
	    return conicProjection(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
	  };

	  var albers = function albers() {
	    return conicEqualArea().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-0.6, 38.7]);
	  };

	  // The projections must have mutually exclusive clip regions on the sphere,
	  // as this will avoid emitting interleaving lines and polygons.
	  function multiplex(streams) {
	    var n = streams.length;
	    return {
	      point: function point(x, y) {
	        var i = -1;while (++i < n) {
	          streams[i].point(x, y);
	        }
	      },
	      sphere: function sphere() {
	        var i = -1;while (++i < n) {
	          streams[i].sphere();
	        }
	      },
	      lineStart: function lineStart() {
	        var i = -1;while (++i < n) {
	          streams[i].lineStart();
	        }
	      },
	      lineEnd: function lineEnd() {
	        var i = -1;while (++i < n) {
	          streams[i].lineEnd();
	        }
	      },
	      polygonStart: function polygonStart() {
	        var i = -1;while (++i < n) {
	          streams[i].polygonStart();
	        }
	      },
	      polygonEnd: function polygonEnd() {
	        var i = -1;while (++i < n) {
	          streams[i].polygonEnd();
	        }
	      }
	    };
	  }

	  // A composite projection for the United States, configured by default for
	  // 960×500. The projection also works quite well at 960×600 if you change the
	  // scale to 1285 and adjust the translate accordingly. The set of standard
	  // parallels for each region comes from USGS, which is published here:
	  // http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
	  var albersUsa = function albersUsa() {
	    var cache,
	        cacheStream,
	        lower48 = albers(),
	        lower48Point,
	        alaska = conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
	        alaskaPoint,
	        // EPSG:3338
	    hawaii = conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
	        hawaiiPoint,
	        // ESRI:102007
	    _point,
	        pointStream = { point: function point(x, y) {
	        _point = [x, y];
	      } };

	    function albersUsa(coordinates) {
	      var x = coordinates[0],
	          y = coordinates[1];
	      return _point = null, (lower48Point.point(x, y), _point) || (alaskaPoint.point(x, y), _point) || (hawaiiPoint.point(x, y), _point);
	    }

	    albersUsa.invert = function (coordinates) {
	      var k = lower48.scale(),
	          t = lower48.translate(),
	          x = (coordinates[0] - t[0]) / k,
	          y = (coordinates[1] - t[1]) / k;
	      return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii : lower48).invert(coordinates);
	    };

	    albersUsa.stream = function (stream) {
	      return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
	    };

	    albersUsa.precision = function (_) {
	      if (!arguments.length) return lower48.precision();
	      lower48.precision(_), alaska.precision(_), hawaii.precision(_);
	      return reset();
	    };

	    albersUsa.scale = function (_) {
	      if (!arguments.length) return lower48.scale();
	      lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
	      return albersUsa.translate(lower48.translate());
	    };

	    albersUsa.translate = function (_) {
	      if (!arguments.length) return lower48.translate();
	      var k = lower48.scale(),
	          x = +_[0],
	          y = +_[1];

	      lower48Point = lower48.translate(_).clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]]).stream(pointStream);

	      alaskaPoint = alaska.translate([x - 0.307 * k, y + 0.201 * k]).clipExtent([[x - 0.425 * k + epsilon$2, y + 0.120 * k + epsilon$2], [x - 0.214 * k - epsilon$2, y + 0.234 * k - epsilon$2]]).stream(pointStream);

	      hawaiiPoint = hawaii.translate([x - 0.205 * k, y + 0.212 * k]).clipExtent([[x - 0.214 * k + epsilon$2, y + 0.166 * k + epsilon$2], [x - 0.115 * k - epsilon$2, y + 0.234 * k - epsilon$2]]).stream(pointStream);

	      return reset();
	    };

	    albersUsa.fitExtent = function (extent, object) {
	      return _fitExtent(albersUsa, extent, object);
	    };

	    albersUsa.fitSize = function (size, object) {
	      return _fitSize(albersUsa, size, object);
	    };

	    function reset() {
	      cache = cacheStream = null;
	      return albersUsa;
	    }

	    return albersUsa.scale(1070);
	  };

	  function azimuthalRaw(scale) {
	    return function (x, y) {
	      var cx = cos$1(x),
	          cy = cos$1(y),
	          k = scale(cx * cy);
	      return [k * cy * sin$1(x), k * sin$1(y)];
	    };
	  }

	  function azimuthalInvert(angle) {
	    return function (x, y) {
	      var z = sqrt(x * x + y * y),
	          c = angle(z),
	          sc = sin$1(c),
	          cc = cos$1(c);
	      return [atan2(x * sc, z * cc), asin(z && y * sc / z)];
	    };
	  }

	  var azimuthalEqualAreaRaw = azimuthalRaw(function (cxcy) {
	    return sqrt(2 / (1 + cxcy));
	  });

	  azimuthalEqualAreaRaw.invert = azimuthalInvert(function (z) {
	    return 2 * asin(z / 2);
	  });

	  var azimuthalEqualArea = function azimuthalEqualArea() {
	    return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
	  };

	  var azimuthalEquidistantRaw = azimuthalRaw(function (c) {
	    return (c = acos(c)) && c / sin$1(c);
	  });

	  azimuthalEquidistantRaw.invert = azimuthalInvert(function (z) {
	    return z;
	  });

	  var azimuthalEquidistant = function azimuthalEquidistant() {
	    return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
	  };

	  function mercatorRaw(lambda, phi) {
	    return [lambda, log(tan((halfPi$2 + phi) / 2))];
	  }

	  mercatorRaw.invert = function (x, y) {
	    return [x, 2 * atan(exp(y)) - halfPi$2];
	  };

	  var mercator = function mercator() {
	    return mercatorProjection(mercatorRaw).scale(961 / tau$3);
	  };

	  function mercatorProjection(project) {
	    var m = projection(project),
	        center = m.center,
	        scale = m.scale,
	        translate = m.translate,
	        clipExtent = m.clipExtent,
	        x0 = null,
	        y0,
	        x1,
	        y1; // clip extent

	    m.scale = function (_) {
	      return arguments.length ? (scale(_), reclip()) : scale();
	    };

	    m.translate = function (_) {
	      return arguments.length ? (translate(_), reclip()) : translate();
	    };

	    m.center = function (_) {
	      return arguments.length ? (center(_), reclip()) : center();
	    };

	    m.clipExtent = function (_) {
	      return arguments.length ? (_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
	    };

	    function reclip() {
	      var k = pi$3 * scale(),
	          t = m(rotation(m.rotate()).invert([0, 0]));
	      return clipExtent(x0 == null ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]] : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
	    }

	    return reclip();
	  }

	  function tany(y) {
	    return tan((halfPi$2 + y) / 2);
	  }

	  function conicConformalRaw(y0, y1) {
	    var cy0 = cos$1(y0),
	        n = y0 === y1 ? sin$1(y0) : log(cy0 / cos$1(y1)) / log(tany(y1) / tany(y0)),
	        f = cy0 * pow(tany(y0), n) / n;

	    if (!n) return mercatorRaw;

	    function project(x, y) {
	      if (f > 0) {
	        if (y < -halfPi$2 + epsilon$2) y = -halfPi$2 + epsilon$2;
	      } else {
	        if (y > halfPi$2 - epsilon$2) y = halfPi$2 - epsilon$2;
	      }
	      var r = f / pow(tany(y), n);
	      return [r * sin$1(n * x), f - r * cos$1(n * x)];
	    }

	    project.invert = function (x, y) {
	      var fy = f - y,
	          r = sign(n) * sqrt(x * x + fy * fy);
	      return [atan2(x, abs(fy)) / n * sign(fy), 2 * atan(pow(f / r, 1 / n)) - halfPi$2];
	    };

	    return project;
	  }

	  var conicConformal = function conicConformal() {
	    return conicProjection(conicConformalRaw).scale(109.5).parallels([30, 30]);
	  };

	  function equirectangularRaw(lambda, phi) {
	    return [lambda, phi];
	  }

	  equirectangularRaw.invert = equirectangularRaw;

	  var equirectangular = function equirectangular() {
	    return projection(equirectangularRaw).scale(152.63);
	  };

	  function conicEquidistantRaw(y0, y1) {
	    var cy0 = cos$1(y0),
	        n = y0 === y1 ? sin$1(y0) : (cy0 - cos$1(y1)) / (y1 - y0),
	        g = cy0 / n + y0;

	    if (abs(n) < epsilon$2) return equirectangularRaw;

	    function project(x, y) {
	      var gy = g - y,
	          nx = n * x;
	      return [gy * sin$1(nx), g - gy * cos$1(nx)];
	    }

	    project.invert = function (x, y) {
	      var gy = g - y;
	      return [atan2(x, abs(gy)) / n * sign(gy), g - sign(n) * sqrt(x * x + gy * gy)];
	    };

	    return project;
	  }

	  var conicEquidistant = function conicEquidistant() {
	    return conicProjection(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
	  };

	  function gnomonicRaw(x, y) {
	    var cy = cos$1(y),
	        k = cos$1(x) * cy;
	    return [cy * sin$1(x) / k, sin$1(y) / k];
	  }

	  gnomonicRaw.invert = azimuthalInvert(atan);

	  var gnomonic = function gnomonic() {
	    return projection(gnomonicRaw).scale(144.049).clipAngle(60);
	  };

	  function scaleTranslate(kx, ky, tx, ty) {
	    return kx === 1 && ky === 1 && tx === 0 && ty === 0 ? identity$4 : transformer({
	      point: function point(x, y) {
	        this.stream.point(x * kx + tx, y * ky + ty);
	      }
	    });
	  }

	  var identity$5 = function identity$5() {
	    var k = 1,
	        tx = 0,
	        ty = 0,
	        sx = 1,
	        sy = 1,
	        transform$$1 = identity$4,
	        // scale, translate and reflect
	    x0 = null,
	        y0,
	        x1,
	        y1,
	        clip = identity$4,
	        // clip extent
	    cache,
	        cacheStream,
	        projection;

	    function reset() {
	      cache = cacheStream = null;
	      return projection;
	    }

	    return projection = {
	      stream: function stream(_stream2) {
	        return cache && cacheStream === _stream2 ? cache : cache = transform$$1(clip(cacheStream = _stream2));
	      },
	      clipExtent: function clipExtent(_) {
	        return arguments.length ? (clip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$4) : _clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
	      },
	      scale: function scale(_) {
	        return arguments.length ? (transform$$1 = scaleTranslate((k = +_) * sx, k * sy, tx, ty), reset()) : k;
	      },
	      translate: function translate(_) {
	        return arguments.length ? (transform$$1 = scaleTranslate(k * sx, k * sy, tx = +_[0], ty = +_[1]), reset()) : [tx, ty];
	      },
	      reflectX: function reflectX(_) {
	        return arguments.length ? (transform$$1 = scaleTranslate(k * (sx = _ ? -1 : 1), k * sy, tx, ty), reset()) : sx < 0;
	      },
	      reflectY: function reflectY(_) {
	        return arguments.length ? (transform$$1 = scaleTranslate(k * sx, k * (sy = _ ? -1 : 1), tx, ty), reset()) : sy < 0;
	      },
	      fitExtent: function fitExtent(extent, object) {
	        return _fitExtent(projection, extent, object);
	      },
	      fitSize: function fitSize(size, object) {
	        return _fitSize(projection, size, object);
	      }
	    };
	  };

	  function orthographicRaw(x, y) {
	    return [cos$1(y) * sin$1(x), sin$1(y)];
	  }

	  orthographicRaw.invert = azimuthalInvert(asin);

	  var orthographic = function orthographic() {
	    return projection(orthographicRaw).scale(249.5).clipAngle(90 + epsilon$2);
	  };

	  function stereographicRaw(x, y) {
	    var cy = cos$1(y),
	        k = 1 + cos$1(x) * cy;
	    return [cy * sin$1(x) / k, sin$1(y) / k];
	  }

	  stereographicRaw.invert = azimuthalInvert(function (z) {
	    return 2 * atan(z);
	  });

	  var stereographic = function stereographic() {
	    return projection(stereographicRaw).scale(250).clipAngle(142);
	  };

	  function transverseMercatorRaw(lambda, phi) {
	    return [log(tan((halfPi$2 + phi) / 2)), -lambda];
	  }

	  transverseMercatorRaw.invert = function (x, y) {
	    return [-y, 2 * atan(exp(x)) - halfPi$2];
	  };

	  var transverseMercator = function transverseMercator() {
	    var m = mercatorProjection(transverseMercatorRaw),
	        center = m.center,
	        rotate = m.rotate;

	    m.center = function (_) {
	      return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
	    };

	    m.rotate = function (_) {
	      return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
	    };

	    return rotate([0, 0, 90]).scale(159.155);
	  };

	  function defaultSeparation(a, b) {
	    return a.parent === b.parent ? 1 : 2;
	  }

	  function meanX(children) {
	    return children.reduce(meanXReduce, 0) / children.length;
	  }

	  function meanXReduce(x, c) {
	    return x + c.x;
	  }

	  function maxY(children) {
	    return 1 + children.reduce(maxYReduce, 0);
	  }

	  function maxYReduce(y, c) {
	    return Math.max(y, c.y);
	  }

	  function leafLeft(node) {
	    var children;
	    while (children = node.children) {
	      node = children[0];
	    }return node;
	  }

	  function leafRight(node) {
	    var children;
	    while (children = node.children) {
	      node = children[children.length - 1];
	    }return node;
	  }

	  var cluster = function cluster() {
	    var separation = defaultSeparation,
	        dx = 1,
	        dy = 1,
	        nodeSize = false;

	    function cluster(root) {
	      var previousNode,
	          x = 0;

	      // First walk, computing the initial x & y values.
	      root.eachAfter(function (node) {
	        var children = node.children;
	        if (children) {
	          node.x = meanX(children);
	          node.y = maxY(children);
	        } else {
	          node.x = previousNode ? x += separation(node, previousNode) : 0;
	          node.y = 0;
	          previousNode = node;
	        }
	      });

	      var left = leafLeft(root),
	          right = leafRight(root),
	          x0 = left.x - separation(left, right) / 2,
	          x1 = right.x + separation(right, left) / 2;

	      // Second walk, normalizing x & y to the desired size.
	      return root.eachAfter(nodeSize ? function (node) {
	        node.x = (node.x - root.x) * dx;
	        node.y = (root.y - node.y) * dy;
	      } : function (node) {
	        node.x = (node.x - x0) / (x1 - x0) * dx;
	        node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
	      });
	    }

	    cluster.separation = function (x) {
	      return arguments.length ? (separation = x, cluster) : separation;
	    };

	    cluster.size = function (x) {
	      return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster) : nodeSize ? null : [dx, dy];
	    };

	    cluster.nodeSize = function (x) {
	      return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster) : nodeSize ? [dx, dy] : null;
	    };

	    return cluster;
	  };

	  function count(node) {
	    var sum = 0,
	        children = node.children,
	        i = children && children.length;
	    if (!i) sum = 1;else while (--i >= 0) {
	      sum += children[i].value;
	    }node.value = sum;
	  }

	  var node_count = function node_count() {
	    return this.eachAfter(count);
	  };

	  var node_each = function node_each(callback) {
	    var node = this,
	        current,
	        next = [node],
	        children,
	        i,
	        n;
	    do {
	      current = next.reverse(), next = [];
	      while (node = current.pop()) {
	        callback(node), children = node.children;
	        if (children) for (i = 0, n = children.length; i < n; ++i) {
	          next.push(children[i]);
	        }
	      }
	    } while (next.length);
	    return this;
	  };

	  var node_eachBefore = function node_eachBefore(callback) {
	    var node = this,
	        nodes = [node],
	        children,
	        i;
	    while (node = nodes.pop()) {
	      callback(node), children = node.children;
	      if (children) for (i = children.length - 1; i >= 0; --i) {
	        nodes.push(children[i]);
	      }
	    }
	    return this;
	  };

	  var node_eachAfter = function node_eachAfter(callback) {
	    var node = this,
	        nodes = [node],
	        next = [],
	        children,
	        i,
	        n;
	    while (node = nodes.pop()) {
	      next.push(node), children = node.children;
	      if (children) for (i = 0, n = children.length; i < n; ++i) {
	        nodes.push(children[i]);
	      }
	    }
	    while (node = next.pop()) {
	      callback(node);
	    }
	    return this;
	  };

	  var node_sum = function node_sum(value) {
	    return this.eachAfter(function (node) {
	      var sum = +value(node.data) || 0,
	          children = node.children,
	          i = children && children.length;
	      while (--i >= 0) {
	        sum += children[i].value;
	      }node.value = sum;
	    });
	  };

	  var node_sort = function node_sort(compare) {
	    return this.eachBefore(function (node) {
	      if (node.children) {
	        node.children.sort(compare);
	      }
	    });
	  };

	  var node_path = function node_path(end) {
	    var start = this,
	        ancestor = leastCommonAncestor(start, end),
	        nodes = [start];
	    while (start !== ancestor) {
	      start = start.parent;
	      nodes.push(start);
	    }
	    var k = nodes.length;
	    while (end !== ancestor) {
	      nodes.splice(k, 0, end);
	      end = end.parent;
	    }
	    return nodes;
	  };

	  function leastCommonAncestor(a, b) {
	    if (a === b) return a;
	    var aNodes = a.ancestors(),
	        bNodes = b.ancestors(),
	        c = null;
	    a = aNodes.pop();
	    b = bNodes.pop();
	    while (a === b) {
	      c = a;
	      a = aNodes.pop();
	      b = bNodes.pop();
	    }
	    return c;
	  }

	  var node_ancestors = function node_ancestors() {
	    var node = this,
	        nodes = [node];
	    while (node = node.parent) {
	      nodes.push(node);
	    }
	    return nodes;
	  };

	  var node_descendants = function node_descendants() {
	    var nodes = [];
	    this.each(function (node) {
	      nodes.push(node);
	    });
	    return nodes;
	  };

	  var node_leaves = function node_leaves() {
	    var leaves = [];
	    this.eachBefore(function (node) {
	      if (!node.children) {
	        leaves.push(node);
	      }
	    });
	    return leaves;
	  };

	  var node_links = function node_links() {
	    var root = this,
	        links = [];
	    root.each(function (node) {
	      if (node !== root) {
	        // Don’t include the root’s parent, if any.
	        links.push({ source: node.parent, target: node });
	      }
	    });
	    return links;
	  };

	  function hierarchy(data, children) {
	    var root = new Node(data),
	        valued = +data.value && (root.value = data.value),
	        node,
	        nodes = [root],
	        child,
	        childs,
	        i,
	        n;

	    if (children == null) children = defaultChildren;

	    while (node = nodes.pop()) {
	      if (valued) node.value = +node.data.value;
	      if ((childs = children(node.data)) && (n = childs.length)) {
	        node.children = new Array(n);
	        for (i = n - 1; i >= 0; --i) {
	          nodes.push(child = node.children[i] = new Node(childs[i]));
	          child.parent = node;
	          child.depth = node.depth + 1;
	        }
	      }
	    }

	    return root.eachBefore(computeHeight);
	  }

	  function node_copy() {
	    return hierarchy(this).eachBefore(copyData);
	  }

	  function defaultChildren(d) {
	    return d.children;
	  }

	  function copyData(node) {
	    node.data = node.data.data;
	  }

	  function computeHeight(node) {
	    var height = 0;
	    do {
	      node.height = height;
	    } while ((node = node.parent) && node.height < ++height);
	  }

	  function Node(data) {
	    this.data = data;
	    this.depth = this.height = 0;
	    this.parent = null;
	  }

	  Node.prototype = hierarchy.prototype = {
	    constructor: Node,
	    count: node_count,
	    each: node_each,
	    eachAfter: node_eachAfter,
	    eachBefore: node_eachBefore,
	    sum: node_sum,
	    sort: node_sort,
	    path: node_path,
	    ancestors: node_ancestors,
	    descendants: node_descendants,
	    leaves: node_leaves,
	    links: node_links,
	    copy: node_copy
	  };

	  var slice$3 = Array.prototype.slice;

	  function shuffle$1(array) {
	    var m = array.length,
	        t,
	        i;

	    while (m) {
	      i = Math.random() * m-- | 0;
	      t = array[m];
	      array[m] = array[i];
	      array[i] = t;
	    }

	    return array;
	  }

	  var enclose = function enclose(circles) {
	    var i = 0,
	        n = (circles = shuffle$1(slice$3.call(circles))).length,
	        B = [],
	        p,
	        e;

	    while (i < n) {
	      p = circles[i];
	      if (e && enclosesWeak(e, p)) ++i;else e = encloseBasis(B = extendBasis(B, p)), i = 0;
	    }

	    return e;
	  };

	  function extendBasis(B, p) {
	    var i, j;

	    if (enclosesWeakAll(p, B)) return [p];

	    // If we get here then B must have at least one element.
	    for (i = 0; i < B.length; ++i) {
	      if (enclosesNot(p, B[i]) && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
	        return [B[i], p];
	      }
	    }

	    // If we get here then B must have at least two elements.
	    for (i = 0; i < B.length - 1; ++i) {
	      for (j = i + 1; j < B.length; ++j) {
	        if (enclosesNot(encloseBasis2(B[i], B[j]), p) && enclosesNot(encloseBasis2(B[i], p), B[j]) && enclosesNot(encloseBasis2(B[j], p), B[i]) && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
	          return [B[i], B[j], p];
	        }
	      }
	    }

	    // If we get here then something is very wrong.
	    throw new Error();
	  }

	  function enclosesNot(a, b) {
	    var dr = a.r - b.r,
	        dx = b.x - a.x,
	        dy = b.y - a.y;
	    return dr < 0 || dr * dr < dx * dx + dy * dy;
	  }

	  function enclosesWeak(a, b) {
	    var dr = a.r - b.r + 1e-6,
	        dx = b.x - a.x,
	        dy = b.y - a.y;
	    return dr > 0 && dr * dr > dx * dx + dy * dy;
	  }

	  function enclosesWeakAll(a, B) {
	    for (var i = 0; i < B.length; ++i) {
	      if (!enclosesWeak(a, B[i])) {
	        return false;
	      }
	    }
	    return true;
	  }

	  function encloseBasis(B) {
	    switch (B.length) {
	      case 1:
	        return encloseBasis1(B[0]);
	      case 2:
	        return encloseBasis2(B[0], B[1]);
	      case 3:
	        return encloseBasis3(B[0], B[1], B[2]);
	    }
	  }

	  function encloseBasis1(a) {
	    return {
	      x: a.x,
	      y: a.y,
	      r: a.r
	    };
	  }

	  function encloseBasis2(a, b) {
	    var x1 = a.x,
	        y1 = a.y,
	        r1 = a.r,
	        x2 = b.x,
	        y2 = b.y,
	        r2 = b.r,
	        x21 = x2 - x1,
	        y21 = y2 - y1,
	        r21 = r2 - r1,
	        l = Math.sqrt(x21 * x21 + y21 * y21);
	    return {
	      x: (x1 + x2 + x21 / l * r21) / 2,
	      y: (y1 + y2 + y21 / l * r21) / 2,
	      r: (l + r1 + r2) / 2
	    };
	  }

	  function encloseBasis3(a, b, c) {
	    var x1 = a.x,
	        y1 = a.y,
	        r1 = a.r,
	        x2 = b.x,
	        y2 = b.y,
	        r2 = b.r,
	        x3 = c.x,
	        y3 = c.y,
	        r3 = c.r,
	        a2 = x1 - x2,
	        a3 = x1 - x3,
	        b2 = y1 - y2,
	        b3 = y1 - y3,
	        c2 = r2 - r1,
	        c3 = r3 - r1,
	        d1 = x1 * x1 + y1 * y1 - r1 * r1,
	        d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2,
	        d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3,
	        ab = a3 * b2 - a2 * b3,
	        xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1,
	        xb = (b3 * c2 - b2 * c3) / ab,
	        ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1,
	        yb = (a2 * c3 - a3 * c2) / ab,
	        A = xb * xb + yb * yb - 1,
	        B = 2 * (r1 + xa * xb + ya * yb),
	        C = xa * xa + ya * ya - r1 * r1,
	        r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
	    return {
	      x: x1 + xa + xb * r,
	      y: y1 + ya + yb * r,
	      r: r
	    };
	  }

	  function place(a, b, c) {
	    var ax = a.x,
	        ay = a.y,
	        da = b.r + c.r,
	        db = a.r + c.r,
	        dx = b.x - ax,
	        dy = b.y - ay,
	        dc = dx * dx + dy * dy;
	    if (dc) {
	      var x = 0.5 + ((db *= db) - (da *= da)) / (2 * dc),
	          y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
	      c.x = ax + x * dx + y * dy;
	      c.y = ay + x * dy - y * dx;
	    } else {
	      c.x = ax + db;
	      c.y = ay;
	    }
	  }

	  function intersects(a, b) {
	    var dx = b.x - a.x,
	        dy = b.y - a.y,
	        dr = a.r + b.r;
	    return dr * dr - 1e-6 > dx * dx + dy * dy;
	  }

	  function score(node) {
	    var a = node._,
	        b = node.next._,
	        ab = a.r + b.r,
	        dx = (a.x * b.r + b.x * a.r) / ab,
	        dy = (a.y * b.r + b.y * a.r) / ab;
	    return dx * dx + dy * dy;
	  }

	  function Node$1(circle) {
	    this._ = circle;
	    this.next = null;
	    this.previous = null;
	  }

	  function packEnclose(circles) {
	    if (!(n = circles.length)) return 0;

	    var a, b, c, n, aa, ca, i, j, k, sj, sk;

	    // Place the first circle.
	    a = circles[0], a.x = 0, a.y = 0;
	    if (!(n > 1)) return a.r;

	    // Place the second circle.
	    b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
	    if (!(n > 2)) return a.r + b.r;

	    // Place the third circle.
	    place(b, a, c = circles[2]);

	    // Initialize the front-chain using the first three circles a, b and c.
	    a = new Node$1(a), b = new Node$1(b), c = new Node$1(c);
	    a.next = c.previous = b;
	    b.next = a.previous = c;
	    c.next = b.previous = a;

	    // Attempt to place each remaining circle…
	    pack: for (i = 3; i < n; ++i) {
	      place(a._, b._, c = circles[i]), c = new Node$1(c);

	      // Find the closest intersecting circle on the front-chain, if any.
	      // “Closeness” is determined by linear distance along the front-chain.
	      // “Ahead” or “behind” is likewise determined by linear distance.
	      j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
	      do {
	        if (sj <= sk) {
	          if (intersects(j._, c._)) {
	            b = j, a.next = b, b.previous = a, --i;
	            continue pack;
	          }
	          sj += j._.r, j = j.next;
	        } else {
	          if (intersects(k._, c._)) {
	            a = k, a.next = b, b.previous = a, --i;
	            continue pack;
	          }
	          sk += k._.r, k = k.previous;
	        }
	      } while (j !== k.next);

	      // Success! Insert the new circle c between a and b.
	      c.previous = a, c.next = b, a.next = b.previous = b = c;

	      // Compute the new closest circle pair to the centroid.
	      aa = score(a);
	      while ((c = c.next) !== b) {
	        if ((ca = score(c)) < aa) {
	          a = c, aa = ca;
	        }
	      }
	      b = a.next;
	    }

	    // Compute the enclosing circle of the front chain.
	    a = [b._], c = b;while ((c = c.next) !== b) {
	      a.push(c._);
	    }c = enclose(a);

	    // Translate the circles to put the enclosing circle around the origin.
	    for (i = 0; i < n; ++i) {
	      a = circles[i], a.x -= c.x, a.y -= c.y;
	    }return c.r;
	  }

	  var siblings = function siblings(circles) {
	    packEnclose(circles);
	    return circles;
	  };

	  function optional(f) {
	    return f == null ? null : required(f);
	  }

	  function required(f) {
	    if (typeof f !== "function") throw new Error();
	    return f;
	  }

	  function constantZero() {
	    return 0;
	  }

	  var constant$8 = function constant$8(x) {
	    return function () {
	      return x;
	    };
	  };

	  function defaultRadius$1(d) {
	    return Math.sqrt(d.value);
	  }

	  var index$2 = function index$2() {
	    var radius = null,
	        dx = 1,
	        dy = 1,
	        padding = constantZero;

	    function pack(root) {
	      root.x = dx / 2, root.y = dy / 2;
	      if (radius) {
	        root.eachBefore(radiusLeaf(radius)).eachAfter(packChildren(padding, 0.5)).eachBefore(translateChild(1));
	      } else {
	        root.eachBefore(radiusLeaf(defaultRadius$1)).eachAfter(packChildren(constantZero, 1)).eachAfter(packChildren(padding, root.r / Math.min(dx, dy))).eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
	      }
	      return root;
	    }

	    pack.radius = function (x) {
	      return arguments.length ? (radius = optional(x), pack) : radius;
	    };

	    pack.size = function (x) {
	      return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
	    };

	    pack.padding = function (x) {
	      return arguments.length ? (padding = typeof x === "function" ? x : constant$8(+x), pack) : padding;
	    };

	    return pack;
	  };

	  function radiusLeaf(radius) {
	    return function (node) {
	      if (!node.children) {
	        node.r = Math.max(0, +radius(node) || 0);
	      }
	    };
	  }

	  function packChildren(padding, k) {
	    return function (node) {
	      if (children = node.children) {
	        var children,
	            i,
	            n = children.length,
	            r = padding(node) * k || 0,
	            e;

	        if (r) for (i = 0; i < n; ++i) {
	          children[i].r += r;
	        }e = packEnclose(children);
	        if (r) for (i = 0; i < n; ++i) {
	          children[i].r -= r;
	        }node.r = e + r;
	      }
	    };
	  }

	  function translateChild(k) {
	    return function (node) {
	      var parent = node.parent;
	      node.r *= k;
	      if (parent) {
	        node.x = parent.x + k * node.x;
	        node.y = parent.y + k * node.y;
	      }
	    };
	  }

	  var roundNode = function roundNode(node) {
	    node.x0 = Math.round(node.x0);
	    node.y0 = Math.round(node.y0);
	    node.x1 = Math.round(node.x1);
	    node.y1 = Math.round(node.y1);
	  };

	  var treemapDice = function treemapDice(parent, x0, y0, x1, y1) {
	    var nodes = parent.children,
	        node,
	        i = -1,
	        n = nodes.length,
	        k = parent.value && (x1 - x0) / parent.value;

	    while (++i < n) {
	      node = nodes[i], node.y0 = y0, node.y1 = y1;
	      node.x0 = x0, node.x1 = x0 += node.value * k;
	    }
	  };

	  var partition = function partition() {
	    var dx = 1,
	        dy = 1,
	        padding = 0,
	        round = false;

	    function partition(root) {
	      var n = root.height + 1;
	      root.x0 = root.y0 = padding;
	      root.x1 = dx;
	      root.y1 = dy / n;
	      root.eachBefore(positionNode(dy, n));
	      if (round) root.eachBefore(roundNode);
	      return root;
	    }

	    function positionNode(dy, n) {
	      return function (node) {
	        if (node.children) {
	          treemapDice(node, node.x0, dy * (node.depth + 1) / n, node.x1, dy * (node.depth + 2) / n);
	        }
	        var x0 = node.x0,
	            y0 = node.y0,
	            x1 = node.x1 - padding,
	            y1 = node.y1 - padding;
	        if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
	        if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
	        node.x0 = x0;
	        node.y0 = y0;
	        node.x1 = x1;
	        node.y1 = y1;
	      };
	    }

	    partition.round = function (x) {
	      return arguments.length ? (round = !!x, partition) : round;
	    };

	    partition.size = function (x) {
	      return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
	    };

	    partition.padding = function (x) {
	      return arguments.length ? (padding = +x, partition) : padding;
	    };

	    return partition;
	  };

	  var keyPrefix$1 = "$";
	  var preroot = { depth: -1 };
	  var ambiguous = {};

	  function defaultId(d) {
	    return d.id;
	  }

	  function defaultParentId(d) {
	    return d.parentId;
	  }

	  var stratify = function stratify() {
	    var id = defaultId,
	        parentId = defaultParentId;

	    function stratify(data) {
	      var d,
	          i,
	          n = data.length,
	          root,
	          parent,
	          node,
	          nodes = new Array(n),
	          nodeId,
	          nodeKey,
	          nodeByKey = {};

	      for (i = 0; i < n; ++i) {
	        d = data[i], node = nodes[i] = new Node(d);
	        if ((nodeId = id(d, i, data)) != null && (nodeId += "")) {
	          nodeKey = keyPrefix$1 + (node.id = nodeId);
	          nodeByKey[nodeKey] = nodeKey in nodeByKey ? ambiguous : node;
	        }
	      }

	      for (i = 0; i < n; ++i) {
	        node = nodes[i], nodeId = parentId(data[i], i, data);
	        if (nodeId == null || !(nodeId += "")) {
	          if (root) throw new Error("multiple roots");
	          root = node;
	        } else {
	          parent = nodeByKey[keyPrefix$1 + nodeId];
	          if (!parent) throw new Error("missing: " + nodeId);
	          if (parent === ambiguous) throw new Error("ambiguous: " + nodeId);
	          if (parent.children) parent.children.push(node);else parent.children = [node];
	          node.parent = parent;
	        }
	      }

	      if (!root) throw new Error("no root");
	      root.parent = preroot;
	      root.eachBefore(function (node) {
	        node.depth = node.parent.depth + 1;--n;
	      }).eachBefore(computeHeight);
	      root.parent = null;
	      if (n > 0) throw new Error("cycle");

	      return root;
	    }

	    stratify.id = function (x) {
	      return arguments.length ? (id = required(x), stratify) : id;
	    };

	    stratify.parentId = function (x) {
	      return arguments.length ? (parentId = required(x), stratify) : parentId;
	    };

	    return stratify;
	  };

	  function defaultSeparation$1(a, b) {
	    return a.parent === b.parent ? 1 : 2;
	  }

	  // function radialSeparation(a, b) {
	  //   return (a.parent === b.parent ? 1 : 2) / a.depth;
	  // }

	  // This function is used to traverse the left contour of a subtree (or
	  // subforest). It returns the successor of v on this contour. This successor is
	  // either given by the leftmost child of v or by the thread of v. The function
	  // returns null if and only if v is on the highest level of its subtree.
	  function nextLeft(v) {
	    var children = v.children;
	    return children ? children[0] : v.t;
	  }

	  // This function works analogously to nextLeft.
	  function nextRight(v) {
	    var children = v.children;
	    return children ? children[children.length - 1] : v.t;
	  }

	  // Shifts the current subtree rooted at w+. This is done by increasing
	  // prelim(w+) and mod(w+) by shift.
	  function moveSubtree(wm, wp, shift) {
	    var change = shift / (wp.i - wm.i);
	    wp.c -= change;
	    wp.s += shift;
	    wm.c += change;
	    wp.z += shift;
	    wp.m += shift;
	  }

	  // All other shifts, applied to the smaller subtrees between w- and w+, are
	  // performed by this function. To prepare the shifts, we have to adjust
	  // change(w+), shift(w+), and change(w-).
	  function executeShifts(v) {
	    var shift = 0,
	        change = 0,
	        children = v.children,
	        i = children.length,
	        w;
	    while (--i >= 0) {
	      w = children[i];
	      w.z += shift;
	      w.m += shift;
	      shift += w.s + (change += w.c);
	    }
	  }

	  // If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
	  // returns the specified (default) ancestor.
	  function nextAncestor(vim, v, ancestor) {
	    return vim.a.parent === v.parent ? vim.a : ancestor;
	  }

	  function TreeNode(node, i) {
	    this._ = node;
	    this.parent = null;
	    this.children = null;
	    this.A = null; // default ancestor
	    this.a = this; // ancestor
	    this.z = 0; // prelim
	    this.m = 0; // mod
	    this.c = 0; // change
	    this.s = 0; // shift
	    this.t = null; // thread
	    this.i = i; // number
	  }

	  TreeNode.prototype = Object.create(Node.prototype);

	  function treeRoot(root) {
	    var tree = new TreeNode(root, 0),
	        node,
	        nodes = [tree],
	        child,
	        children,
	        i,
	        n;

	    while (node = nodes.pop()) {
	      if (children = node._.children) {
	        node.children = new Array(n = children.length);
	        for (i = n - 1; i >= 0; --i) {
	          nodes.push(child = node.children[i] = new TreeNode(children[i], i));
	          child.parent = node;
	        }
	      }
	    }

	    (tree.parent = new TreeNode(null, 0)).children = [tree];
	    return tree;
	  }

	  // Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
	  var tree = function tree() {
	    var separation = defaultSeparation$1,
	        dx = 1,
	        dy = 1,
	        nodeSize = null;

	    function tree(root) {
	      var t = treeRoot(root);

	      // Compute the layout using Buchheim et al.’s algorithm.
	      t.eachAfter(firstWalk), t.parent.m = -t.z;
	      t.eachBefore(secondWalk);

	      // If a fixed node size is specified, scale x and y.
	      if (nodeSize) root.eachBefore(sizeNode);

	      // If a fixed tree size is specified, scale x and y based on the extent.
	      // Compute the left-most, right-most, and depth-most nodes for extents.
	      else {
	          var left = root,
	              right = root,
	              bottom = root;
	          root.eachBefore(function (node) {
	            if (node.x < left.x) left = node;
	            if (node.x > right.x) right = node;
	            if (node.depth > bottom.depth) bottom = node;
	          });
	          var s = left === right ? 1 : separation(left, right) / 2,
	              tx = s - left.x,
	              kx = dx / (right.x + s + tx),
	              ky = dy / (bottom.depth || 1);
	          root.eachBefore(function (node) {
	            node.x = (node.x + tx) * kx;
	            node.y = node.depth * ky;
	          });
	        }

	      return root;
	    }

	    // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
	    // applied recursively to the children of v, as well as the function
	    // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
	    // node v is placed to the midpoint of its outermost children.
	    function firstWalk(v) {
	      var children = v.children,
	          siblings = v.parent.children,
	          w = v.i ? siblings[v.i - 1] : null;
	      if (children) {
	        executeShifts(v);
	        var midpoint = (children[0].z + children[children.length - 1].z) / 2;
	        if (w) {
	          v.z = w.z + separation(v._, w._);
	          v.m = v.z - midpoint;
	        } else {
	          v.z = midpoint;
	        }
	      } else if (w) {
	        v.z = w.z + separation(v._, w._);
	      }
	      v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
	    }

	    // Computes all real x-coordinates by summing up the modifiers recursively.
	    function secondWalk(v) {
	      v._.x = v.z + v.parent.m;
	      v.m += v.parent.m;
	    }

	    // The core of the algorithm. Here, a new subtree is combined with the
	    // previous subtrees. Threads are used to traverse the inside and outside
	    // contours of the left and right subtree up to the highest common level. The
	    // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
	    // superscript o means outside and i means inside, the subscript - means left
	    // subtree and + means right subtree. For summing up the modifiers along the
	    // contour, we use respective variables si+, si-, so-, and so+. Whenever two
	    // nodes of the inside contours conflict, we compute the left one of the
	    // greatest uncommon ancestors using the function ANCESTOR and call MOVE
	    // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
	    // Finally, we add a new thread (if necessary).
	    function apportion(v, w, ancestor) {
	      if (w) {
	        var vip = v,
	            vop = v,
	            vim = w,
	            vom = vip.parent.children[0],
	            sip = vip.m,
	            sop = vop.m,
	            sim = vim.m,
	            som = vom.m,
	            shift;
	        while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
	          vom = nextLeft(vom);
	          vop = nextRight(vop);
	          vop.a = v;
	          shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
	          if (shift > 0) {
	            moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
	            sip += shift;
	            sop += shift;
	          }
	          sim += vim.m;
	          sip += vip.m;
	          som += vom.m;
	          sop += vop.m;
	        }
	        if (vim && !nextRight(vop)) {
	          vop.t = vim;
	          vop.m += sim - sop;
	        }
	        if (vip && !nextLeft(vom)) {
	          vom.t = vip;
	          vom.m += sip - som;
	          ancestor = v;
	        }
	      }
	      return ancestor;
	    }

	    function sizeNode(node) {
	      node.x *= dx;
	      node.y = node.depth * dy;
	    }

	    tree.separation = function (x) {
	      return arguments.length ? (separation = x, tree) : separation;
	    };

	    tree.size = function (x) {
	      return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree) : nodeSize ? null : [dx, dy];
	    };

	    tree.nodeSize = function (x) {
	      return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree) : nodeSize ? [dx, dy] : null;
	    };

	    return tree;
	  };

	  var treemapSlice = function treemapSlice(parent, x0, y0, x1, y1) {
	    var nodes = parent.children,
	        node,
	        i = -1,
	        n = nodes.length,
	        k = parent.value && (y1 - y0) / parent.value;

	    while (++i < n) {
	      node = nodes[i], node.x0 = x0, node.x1 = x1;
	      node.y0 = y0, node.y1 = y0 += node.value * k;
	    }
	  };

	  var phi = (1 + Math.sqrt(5)) / 2;

	  function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
	    var rows = [],
	        nodes = parent.children,
	        row,
	        nodeValue,
	        i0 = 0,
	        i1 = 0,
	        n = nodes.length,
	        dx,
	        dy,
	        value = parent.value,
	        sumValue,
	        minValue,
	        maxValue,
	        newRatio,
	        minRatio,
	        alpha,
	        beta;

	    while (i0 < n) {
	      dx = x1 - x0, dy = y1 - y0;

	      // Find the next non-empty node.
	      do {
	        sumValue = nodes[i1++].value;
	      } while (!sumValue && i1 < n);
	      minValue = maxValue = sumValue;
	      alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
	      beta = sumValue * sumValue * alpha;
	      minRatio = Math.max(maxValue / beta, beta / minValue);

	      // Keep adding nodes while the aspect ratio maintains or improves.
	      for (; i1 < n; ++i1) {
	        sumValue += nodeValue = nodes[i1].value;
	        if (nodeValue < minValue) minValue = nodeValue;
	        if (nodeValue > maxValue) maxValue = nodeValue;
	        beta = sumValue * sumValue * alpha;
	        newRatio = Math.max(maxValue / beta, beta / minValue);
	        if (newRatio > minRatio) {
	          sumValue -= nodeValue;break;
	        }
	        minRatio = newRatio;
	      }

	      // Position and record the row orientation.
	      rows.push(row = { value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1) });
	      if (row.dice) treemapDice(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);else treemapSlice(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
	      value -= sumValue, i0 = i1;
	    }

	    return rows;
	  }

	  var squarify = function custom(ratio) {

	    function squarify(parent, x0, y0, x1, y1) {
	      squarifyRatio(ratio, parent, x0, y0, x1, y1);
	    }

	    squarify.ratio = function (x) {
	      return custom((x = +x) > 1 ? x : 1);
	    };

	    return squarify;
	  }(phi);

	  var index$3 = function index$3() {
	    var tile = squarify,
	        round = false,
	        dx = 1,
	        dy = 1,
	        paddingStack = [0],
	        paddingInner = constantZero,
	        paddingTop = constantZero,
	        paddingRight = constantZero,
	        paddingBottom = constantZero,
	        paddingLeft = constantZero;

	    function treemap(root) {
	      root.x0 = root.y0 = 0;
	      root.x1 = dx;
	      root.y1 = dy;
	      root.eachBefore(positionNode);
	      paddingStack = [0];
	      if (round) root.eachBefore(roundNode);
	      return root;
	    }

	    function positionNode(node) {
	      var p = paddingStack[node.depth],
	          x0 = node.x0 + p,
	          y0 = node.y0 + p,
	          x1 = node.x1 - p,
	          y1 = node.y1 - p;
	      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
	      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
	      node.x0 = x0;
	      node.y0 = y0;
	      node.x1 = x1;
	      node.y1 = y1;
	      if (node.children) {
	        p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
	        x0 += paddingLeft(node) - p;
	        y0 += paddingTop(node) - p;
	        x1 -= paddingRight(node) - p;
	        y1 -= paddingBottom(node) - p;
	        if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
	        if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
	        tile(node, x0, y0, x1, y1);
	      }
	    }

	    treemap.round = function (x) {
	      return arguments.length ? (round = !!x, treemap) : round;
	    };

	    treemap.size = function (x) {
	      return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
	    };

	    treemap.tile = function (x) {
	      return arguments.length ? (tile = required(x), treemap) : tile;
	    };

	    treemap.padding = function (x) {
	      return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
	    };

	    treemap.paddingInner = function (x) {
	      return arguments.length ? (paddingInner = typeof x === "function" ? x : constant$8(+x), treemap) : paddingInner;
	    };

	    treemap.paddingOuter = function (x) {
	      return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
	    };

	    treemap.paddingTop = function (x) {
	      return arguments.length ? (paddingTop = typeof x === "function" ? x : constant$8(+x), treemap) : paddingTop;
	    };

	    treemap.paddingRight = function (x) {
	      return arguments.length ? (paddingRight = typeof x === "function" ? x : constant$8(+x), treemap) : paddingRight;
	    };

	    treemap.paddingBottom = function (x) {
	      return arguments.length ? (paddingBottom = typeof x === "function" ? x : constant$8(+x), treemap) : paddingBottom;
	    };

	    treemap.paddingLeft = function (x) {
	      return arguments.length ? (paddingLeft = typeof x === "function" ? x : constant$8(+x), treemap) : paddingLeft;
	    };

	    return treemap;
	  };

	  var binary = function binary(parent, x0, y0, x1, y1) {
	    var nodes = parent.children,
	        i,
	        n = nodes.length,
	        sum,
	        sums = new Array(n + 1);

	    for (sums[0] = sum = i = 0; i < n; ++i) {
	      sums[i + 1] = sum += nodes[i].value;
	    }

	    partition(0, n, parent.value, x0, y0, x1, y1);

	    function partition(i, j, value, x0, y0, x1, y1) {
	      if (i >= j - 1) {
	        var node = nodes[i];
	        node.x0 = x0, node.y0 = y0;
	        node.x1 = x1, node.y1 = y1;
	        return;
	      }

	      var valueOffset = sums[i],
	          valueTarget = value / 2 + valueOffset,
	          k = i + 1,
	          hi = j - 1;

	      while (k < hi) {
	        var mid = k + hi >>> 1;
	        if (sums[mid] < valueTarget) k = mid + 1;else hi = mid;
	      }

	      if (valueTarget - sums[k - 1] < sums[k] - valueTarget && i + 1 < k) --k;

	      var valueLeft = sums[k] - valueOffset,
	          valueRight = value - valueLeft;

	      if (x1 - x0 > y1 - y0) {
	        var xk = (x0 * valueRight + x1 * valueLeft) / value;
	        partition(i, k, valueLeft, x0, y0, xk, y1);
	        partition(k, j, valueRight, xk, y0, x1, y1);
	      } else {
	        var yk = (y0 * valueRight + y1 * valueLeft) / value;
	        partition(i, k, valueLeft, x0, y0, x1, yk);
	        partition(k, j, valueRight, x0, yk, x1, y1);
	      }
	    }
	  };

	  var sliceDice = function sliceDice(parent, x0, y0, x1, y1) {
	    (parent.depth & 1 ? treemapSlice : treemapDice)(parent, x0, y0, x1, y1);
	  };

	  var resquarify = function custom(ratio) {

	    function resquarify(parent, x0, y0, x1, y1) {
	      if ((rows = parent._squarify) && rows.ratio === ratio) {
	        var rows,
	            row,
	            nodes,
	            i,
	            j = -1,
	            n,
	            m = rows.length,
	            value = parent.value;

	        while (++j < m) {
	          row = rows[j], nodes = row.children;
	          for (i = row.value = 0, n = nodes.length; i < n; ++i) {
	            row.value += nodes[i].value;
	          }if (row.dice) treemapDice(row, x0, y0, x1, y0 += (y1 - y0) * row.value / value);else treemapSlice(row, x0, y0, x0 += (x1 - x0) * row.value / value, y1);
	          value -= row.value;
	        }
	      } else {
	        parent._squarify = rows = squarifyRatio(ratio, parent, x0, y0, x1, y1);
	        rows.ratio = ratio;
	      }
	    }

	    resquarify.ratio = function (x) {
	      return custom((x = +x) > 1 ? x : 1);
	    };

	    return resquarify;
	  }(phi);

	  var area$1 = function area$1(polygon) {
	    var i = -1,
	        n = polygon.length,
	        a,
	        b = polygon[n - 1],
	        area = 0;

	    while (++i < n) {
	      a = b;
	      b = polygon[i];
	      area += a[1] * b[0] - a[0] * b[1];
	    }

	    return area / 2;
	  };

	  var centroid$1 = function centroid$1(polygon) {
	    var i = -1,
	        n = polygon.length,
	        x = 0,
	        y = 0,
	        a,
	        b = polygon[n - 1],
	        c,
	        k = 0;

	    while (++i < n) {
	      a = b;
	      b = polygon[i];
	      k += c = a[0] * b[1] - b[0] * a[1];
	      x += (a[0] + b[0]) * c;
	      y += (a[1] + b[1]) * c;
	    }

	    return k *= 3, [x / k, y / k];
	  };

	  // Returns the 2D cross product of AB and AC vectors, i.e., the z-component of
	  // the 3D cross product in a quadrant I Cartesian coordinate system (+x is
	  // right, +y is up). Returns a positive value if ABC is counter-clockwise,
	  // negative if clockwise, and zero if the points are collinear.
	  var cross$1 = function cross$1(a, b, c) {
	    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
	  };

	  function lexicographicOrder(a, b) {
	    return a[0] - b[0] || a[1] - b[1];
	  }

	  // Computes the upper convex hull per the monotone chain algorithm.
	  // Assumes points.length >= 3, is sorted by x, unique in y.
	  // Returns an array of indices into points in left-to-right order.
	  function computeUpperHullIndexes(points) {
	    var n = points.length,
	        indexes = [0, 1],
	        size = 2;

	    for (var i = 2; i < n; ++i) {
	      while (size > 1 && cross$1(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) {
	        --size;
	      }indexes[size++] = i;
	    }

	    return indexes.slice(0, size); // remove popped points
	  }

	  var hull = function hull(points) {
	    if ((n = points.length) < 3) return null;

	    var i,
	        n,
	        sortedPoints = new Array(n),
	        flippedPoints = new Array(n);

	    for (i = 0; i < n; ++i) {
	      sortedPoints[i] = [+points[i][0], +points[i][1], i];
	    }sortedPoints.sort(lexicographicOrder);
	    for (i = 0; i < n; ++i) {
	      flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];
	    }var upperIndexes = computeUpperHullIndexes(sortedPoints),
	        lowerIndexes = computeUpperHullIndexes(flippedPoints);

	    // Construct the hull polygon, removing possible duplicate endpoints.
	    var skipLeft = lowerIndexes[0] === upperIndexes[0],
	        skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1],
	        hull = [];

	    // Add upper hull in right-to-l order.
	    // Then add lower hull in left-to-right order.
	    for (i = upperIndexes.length - 1; i >= 0; --i) {
	      hull.push(points[sortedPoints[upperIndexes[i]][2]]);
	    }for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) {
	      hull.push(points[sortedPoints[lowerIndexes[i]][2]]);
	    }return hull;
	  };

	  var contains$1 = function contains$1(polygon, point) {
	    var n = polygon.length,
	        p = polygon[n - 1],
	        x = point[0],
	        y = point[1],
	        x0 = p[0],
	        y0 = p[1],
	        x1,
	        y1,
	        inside = false;

	    for (var i = 0; i < n; ++i) {
	      p = polygon[i], x1 = p[0], y1 = p[1];
	      if (y1 > y !== y0 > y && x < (x0 - x1) * (y - y1) / (y0 - y1) + x1) inside = !inside;
	      x0 = x1, y0 = y1;
	    }

	    return inside;
	  };

	  var length$2 = function length$2(polygon) {
	    var i = -1,
	        n = polygon.length,
	        b = polygon[n - 1],
	        xa,
	        ya,
	        xb = b[0],
	        yb = b[1],
	        perimeter = 0;

	    while (++i < n) {
	      xa = xb;
	      ya = yb;
	      b = polygon[i];
	      xb = b[0];
	      yb = b[1];
	      xa -= xb;
	      ya -= yb;
	      perimeter += Math.sqrt(xa * xa + ya * ya);
	    }

	    return perimeter;
	  };

	  var slice$4 = [].slice;

	  var noabort = {};

	  function Queue(size) {
	    this._size = size;
	    this._call = this._error = null;
	    this._tasks = [];
	    this._data = [];
	    this._waiting = this._active = this._ended = this._start = 0; // inside a synchronous task callback?
	  }

	  Queue.prototype = queue.prototype = {
	    constructor: Queue,
	    defer: function defer(callback) {
	      if (typeof callback !== "function") throw new Error("invalid callback");
	      if (this._call) throw new Error("defer after await");
	      if (this._error != null) return this;
	      var t = slice$4.call(arguments, 1);
	      t.push(callback);
	      ++this._waiting, this._tasks.push(t);
	      poke$1(this);
	      return this;
	    },
	    abort: function abort() {
	      if (this._error == null) _abort(this, new Error("abort"));
	      return this;
	    },
	    await: function _await(callback) {
	      if (typeof callback !== "function") throw new Error("invalid callback");
	      if (this._call) throw new Error("multiple await");
	      this._call = function (error, results) {
	        callback.apply(null, [error].concat(results));
	      };
	      maybeNotify(this);
	      return this;
	    },
	    awaitAll: function awaitAll(callback) {
	      if (typeof callback !== "function") throw new Error("invalid callback");
	      if (this._call) throw new Error("multiple await");
	      this._call = callback;
	      maybeNotify(this);
	      return this;
	    }
	  };

	  function poke$1(q) {
	    if (!q._start) {
	      try {
	        start$1(q);
	      } // let the current task complete
	      catch (e) {
	        if (q._tasks[q._ended + q._active - 1]) _abort(q, e); // task errored synchronously
	        else if (!q._data) throw e; // await callback errored synchronously
	      }
	    }
	  }

	  function start$1(q) {
	    while (q._start = q._waiting && q._active < q._size) {
	      var i = q._ended + q._active,
	          t = q._tasks[i],
	          j = t.length - 1,
	          c = t[j];
	      t[j] = end(q, i);
	      --q._waiting, ++q._active;
	      t = c.apply(null, t);
	      if (!q._tasks[i]) continue; // task finished synchronously
	      q._tasks[i] = t || noabort;
	    }
	  }

	  function end(q, i) {
	    return function (e, r) {
	      if (!q._tasks[i]) return; // ignore multiple callbacks
	      --q._active, ++q._ended;
	      q._tasks[i] = null;
	      if (q._error != null) return; // ignore secondary errors
	      if (e != null) {
	        _abort(q, e);
	      } else {
	        q._data[i] = r;
	        if (q._waiting) poke$1(q);else maybeNotify(q);
	      }
	    };
	  }

	  function _abort(q, e) {
	    var i = q._tasks.length,
	        t;
	    q._error = e; // ignore active callbacks
	    q._data = undefined; // allow gc
	    q._waiting = NaN; // prevent starting

	    while (--i >= 0) {
	      if (t = q._tasks[i]) {
	        q._tasks[i] = null;
	        if (t.abort) {
	          try {
	            t.abort();
	          } catch (e) {/* ignore */}
	        }
	      }
	    }

	    q._active = NaN; // allow notification
	    maybeNotify(q);
	  }

	  function maybeNotify(q) {
	    if (!q._active && q._call) {
	      var d = q._data;
	      q._data = undefined; // allow gc
	      q._call(q._error, d);
	    }
	  }

	  function queue(concurrency) {
	    if (concurrency == null) concurrency = Infinity;else if (!((concurrency = +concurrency) >= 1)) throw new Error("invalid concurrency");
	    return new Queue(concurrency);
	  }

	  var defaultSource$1 = function defaultSource$1() {
	    return Math.random();
	  };

	  var uniform = function sourceRandomUniform(source) {
	    function randomUniform(min, max) {
	      min = min == null ? 0 : +min;
	      max = max == null ? 1 : +max;
	      if (arguments.length === 1) max = min, min = 0;else max -= min;
	      return function () {
	        return source() * max + min;
	      };
	    }

	    randomUniform.source = sourceRandomUniform;

	    return randomUniform;
	  }(defaultSource$1);

	  var normal = function sourceRandomNormal(source) {
	    function randomNormal(mu, sigma) {
	      var x, r;
	      mu = mu == null ? 0 : +mu;
	      sigma = sigma == null ? 1 : +sigma;
	      return function () {
	        var y;

	        // If available, use the second previously-generated uniform random.
	        if (x != null) y = x, x = null;

	        // Otherwise, generate a new x and y.
	        else do {
	            x = source() * 2 - 1;
	            y = source() * 2 - 1;
	            r = x * x + y * y;
	          } while (!r || r > 1);

	        return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
	      };
	    }

	    randomNormal.source = sourceRandomNormal;

	    return randomNormal;
	  }(defaultSource$1);

	  var logNormal = function sourceRandomLogNormal(source) {
	    function randomLogNormal() {
	      var randomNormal = normal.source(source).apply(this, arguments);
	      return function () {
	        return Math.exp(randomNormal());
	      };
	    }

	    randomLogNormal.source = sourceRandomLogNormal;

	    return randomLogNormal;
	  }(defaultSource$1);

	  var irwinHall = function sourceRandomIrwinHall(source) {
	    function randomIrwinHall(n) {
	      return function () {
	        for (var sum = 0, i = 0; i < n; ++i) {
	          sum += source();
	        }return sum;
	      };
	    }

	    randomIrwinHall.source = sourceRandomIrwinHall;

	    return randomIrwinHall;
	  }(defaultSource$1);

	  var bates = function sourceRandomBates(source) {
	    function randomBates(n) {
	      var randomIrwinHall = irwinHall.source(source)(n);
	      return function () {
	        return randomIrwinHall() / n;
	      };
	    }

	    randomBates.source = sourceRandomBates;

	    return randomBates;
	  }(defaultSource$1);

	  var exponential$1 = function sourceRandomExponential(source) {
	    function randomExponential(lambda) {
	      return function () {
	        return -Math.log(1 - source()) / lambda;
	      };
	    }

	    randomExponential.source = sourceRandomExponential;

	    return randomExponential;
	  }(defaultSource$1);

	  var request = function request(url, callback) {
	    var request,
	        event = dispatch("beforesend", "progress", "load", "error"),
	        _mimeType,
	        headers = map$1(),
	        xhr = new XMLHttpRequest(),
	        _user = null,
	        _password = null,
	        _response,
	        _responseType,
	        _timeout = 0;

	    // If IE does not support CORS, use XDomainRequest.
	    if (typeof XDomainRequest !== "undefined" && !("withCredentials" in xhr) && /^(http(s)?:)?\/\//.test(url)) xhr = new XDomainRequest();

	    "onload" in xhr ? xhr.onload = xhr.onerror = xhr.ontimeout = respond : xhr.onreadystatechange = function (o) {
	      xhr.readyState > 3 && respond(o);
	    };

	    function respond(o) {
	      var status = xhr.status,
	          result;
	      if (!status && hasResponse(xhr) || status >= 200 && status < 300 || status === 304) {
	        if (_response) {
	          try {
	            result = _response.call(request, xhr);
	          } catch (e) {
	            event.call("error", request, e);
	            return;
	          }
	        } else {
	          result = xhr;
	        }
	        event.call("load", request, result);
	      } else {
	        event.call("error", request, o);
	      }
	    }

	    xhr.onprogress = function (e) {
	      event.call("progress", request, e);
	    };

	    request = {
	      header: function header(name, value) {
	        name = (name + "").toLowerCase();
	        if (arguments.length < 2) return headers.get(name);
	        if (value == null) headers.remove(name);else headers.set(name, value + "");
	        return request;
	      },

	      // If mimeType is non-null and no Accept header is set, a default is used.
	      mimeType: function mimeType(value) {
	        if (!arguments.length) return _mimeType;
	        _mimeType = value == null ? null : value + "";
	        return request;
	      },

	      // Specifies what type the response value should take;
	      // for instance, arraybuffer, blob, document, or text.
	      responseType: function responseType(value) {
	        if (!arguments.length) return _responseType;
	        _responseType = value;
	        return request;
	      },

	      timeout: function timeout(value) {
	        if (!arguments.length) return _timeout;
	        _timeout = +value;
	        return request;
	      },

	      user: function user(value) {
	        return arguments.length < 1 ? _user : (_user = value == null ? null : value + "", request);
	      },

	      password: function password(value) {
	        return arguments.length < 1 ? _password : (_password = value == null ? null : value + "", request);
	      },

	      // Specify how to convert the response content to a specific type;
	      // changes the callback value on "load" events.
	      response: function response(value) {
	        _response = value;
	        return request;
	      },

	      // Alias for send("GET", …).
	      get: function get(data, callback) {
	        return request.send("GET", data, callback);
	      },

	      // Alias for send("POST", …).
	      post: function post(data, callback) {
	        return request.send("POST", data, callback);
	      },

	      // If callback is non-null, it will be used for error and load events.
	      send: function send(method, data, callback) {
	        xhr.open(method, url, true, _user, _password);
	        if (_mimeType != null && !headers.has("accept")) headers.set("accept", _mimeType + ",*/*");
	        if (xhr.setRequestHeader) headers.each(function (value, name) {
	          xhr.setRequestHeader(name, value);
	        });
	        if (_mimeType != null && xhr.overrideMimeType) xhr.overrideMimeType(_mimeType);
	        if (_responseType != null) xhr.responseType = _responseType;
	        if (_timeout > 0) xhr.timeout = _timeout;
	        if (callback == null && typeof data === "function") callback = data, data = null;
	        if (callback != null && callback.length === 1) callback = fixCallback(callback);
	        if (callback != null) request.on("error", callback).on("load", function (xhr) {
	          callback(null, xhr);
	        });
	        event.call("beforesend", request, xhr);
	        xhr.send(data == null ? null : data);
	        return request;
	      },

	      abort: function abort() {
	        xhr.abort();
	        return request;
	      },

	      on: function on() {
	        var value = event.on.apply(event, arguments);
	        return value === event ? request : value;
	      }
	    };

	    if (callback != null) {
	      if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
	      return request.get(callback);
	    }

	    return request;
	  };

	  function fixCallback(callback) {
	    return function (error, xhr) {
	      callback(error == null ? xhr : null);
	    };
	  }

	  function hasResponse(xhr) {
	    var type = xhr.responseType;
	    return type && type !== "text" ? xhr.response // null on error
	    : xhr.responseText; // "" on error
	  }

	  var type$1 = function type$1(defaultMimeType, response) {
	    return function (url, callback) {
	      var r = request(url).mimeType(defaultMimeType).response(response);
	      if (callback != null) {
	        if (typeof callback !== "function") throw new Error("invalid callback: " + callback);
	        return r.get(callback);
	      }
	      return r;
	    };
	  };

	  var html = type$1("text/html", function (xhr) {
	    return document.createRange().createContextualFragment(xhr.responseText);
	  });

	  var json = type$1("application/json", function (xhr) {
	    return JSON.parse(xhr.responseText);
	  });

	  var text = type$1("text/plain", function (xhr) {
	    return xhr.responseText;
	  });

	  var xml = type$1("application/xml", function (xhr) {
	    var xml = xhr.responseXML;
	    if (!xml) throw new Error("parse error");
	    return xml;
	  });

	  var dsv$1 = function dsv$1(defaultMimeType, parse) {
	    return function (url, row, callback) {
	      if (arguments.length < 3) callback = row, row = null;
	      var r = request(url).mimeType(defaultMimeType);
	      r.row = function (_) {
	        return arguments.length ? r.response(responseOf(parse, row = _)) : row;
	      };
	      r.row(row);
	      return callback ? r.get(callback) : r;
	    };
	  };

	  function responseOf(parse, row) {
	    return function (request$$1) {
	      return parse(request$$1.responseText, row);
	    };
	  }

	  var csv$1 = dsv$1("text/csv", csvParse);

	  var tsv$1 = dsv$1("text/tab-separated-values", tsvParse);

	  var array$2 = Array.prototype;

	  var map$3 = array$2.map;
	  var slice$5 = array$2.slice;

	  var implicit = { name: "implicit" };

	  function ordinal(range) {
	    var index = map$1(),
	        domain = [],
	        unknown = implicit;

	    range = range == null ? [] : slice$5.call(range);

	    function scale(d) {
	      var key = d + "",
	          i = index.get(key);
	      if (!i) {
	        if (unknown !== implicit) return unknown;
	        index.set(key, i = domain.push(d));
	      }
	      return range[(i - 1) % range.length];
	    }

	    scale.domain = function (_) {
	      if (!arguments.length) return domain.slice();
	      domain = [], index = map$1();
	      var i = -1,
	          n = _.length,
	          d,
	          key;
	      while (++i < n) {
	        if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
	      }return scale;
	    };

	    scale.range = function (_) {
	      return arguments.length ? (range = slice$5.call(_), scale) : range.slice();
	    };

	    scale.unknown = function (_) {
	      return arguments.length ? (unknown = _, scale) : unknown;
	    };

	    scale.copy = function () {
	      return ordinal().domain(domain).range(range).unknown(unknown);
	    };

	    return scale;
	  }

	  function band() {
	    var scale = ordinal().unknown(undefined),
	        domain = scale.domain,
	        ordinalRange = scale.range,
	        range = [0, 1],
	        step,
	        bandwidth,
	        round = false,
	        paddingInner = 0,
	        paddingOuter = 0,
	        align = 0.5;

	    delete scale.unknown;

	    function rescale() {
	      var n = domain().length,
	          reverse = range[1] < range[0],
	          start = range[reverse - 0],
	          stop = range[1 - reverse];
	      step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
	      if (round) step = Math.floor(step);
	      start += (stop - start - step * (n - paddingInner)) * align;
	      bandwidth = step * (1 - paddingInner);
	      if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
	      var values = sequence(n).map(function (i) {
	        return start + step * i;
	      });
	      return ordinalRange(reverse ? values.reverse() : values);
	    }

	    scale.domain = function (_) {
	      return arguments.length ? (domain(_), rescale()) : domain();
	    };

	    scale.range = function (_) {
	      return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
	    };

	    scale.rangeRound = function (_) {
	      return range = [+_[0], +_[1]], round = true, rescale();
	    };

	    scale.bandwidth = function () {
	      return bandwidth;
	    };

	    scale.step = function () {
	      return step;
	    };

	    scale.round = function (_) {
	      return arguments.length ? (round = !!_, rescale()) : round;
	    };

	    scale.padding = function (_) {
	      return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
	    };

	    scale.paddingInner = function (_) {
	      return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
	    };

	    scale.paddingOuter = function (_) {
	      return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
	    };

	    scale.align = function (_) {
	      return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
	    };

	    scale.copy = function () {
	      return band().domain(domain()).range(range).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
	    };

	    return rescale();
	  }

	  function pointish(scale) {
	    var copy = scale.copy;

	    scale.padding = scale.paddingOuter;
	    delete scale.paddingInner;
	    delete scale.paddingOuter;

	    scale.copy = function () {
	      return pointish(copy());
	    };

	    return scale;
	  }

	  function point$1() {
	    return pointish(band().paddingInner(1));
	  }

	  var constant$9 = function constant$9(x) {
	    return function () {
	      return x;
	    };
	  };

	  var number$2 = function number$2(x) {
	    return +x;
	  };

	  var unit = [0, 1];

	  function deinterpolateLinear(a, b) {
	    return (b -= a = +a) ? function (x) {
	      return (x - a) / b;
	    } : constant$9(b);
	  }

	  function deinterpolateClamp(deinterpolate) {
	    return function (a, b) {
	      var d = deinterpolate(a = +a, b = +b);
	      return function (x) {
	        return x <= a ? 0 : x >= b ? 1 : d(x);
	      };
	    };
	  }

	  function reinterpolateClamp(reinterpolate$$1) {
	    return function (a, b) {
	      var r = reinterpolate$$1(a = +a, b = +b);
	      return function (t) {
	        return t <= 0 ? a : t >= 1 ? b : r(t);
	      };
	    };
	  }

	  function bimap(domain, range, deinterpolate, reinterpolate$$1) {
	    var d0 = domain[0],
	        d1 = domain[1],
	        r0 = range[0],
	        r1 = range[1];
	    if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate$$1(r1, r0);else d0 = deinterpolate(d0, d1), r0 = reinterpolate$$1(r0, r1);
	    return function (x) {
	      return r0(d0(x));
	    };
	  }

	  function polymap(domain, range, deinterpolate, reinterpolate$$1) {
	    var j = Math.min(domain.length, range.length) - 1,
	        d = new Array(j),
	        r = new Array(j),
	        i = -1;

	    // Reverse descending domains.
	    if (domain[j] < domain[0]) {
	      domain = domain.slice().reverse();
	      range = range.slice().reverse();
	    }

	    while (++i < j) {
	      d[i] = deinterpolate(domain[i], domain[i + 1]);
	      r[i] = reinterpolate$$1(range[i], range[i + 1]);
	    }

	    return function (x) {
	      var i = bisectRight(domain, x, 1, j) - 1;
	      return r[i](d[i](x));
	    };
	  }

	  function copy(source, target) {
	    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp());
	  }

	  // deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
	  // reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
	  function continuous(deinterpolate, reinterpolate$$1) {
	    var domain = unit,
	        range = unit,
	        interpolate = interpolateValue,
	        clamp = false,
	        piecewise,
	        output,
	        input;

	    function rescale() {
	      piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
	      output = input = null;
	      return scale;
	    }

	    function scale(x) {
	      return (output || (output = piecewise(domain, range, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate)))(+x);
	    }

	    scale.invert = function (y) {
	      return (input || (input = piecewise(range, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate$$1) : reinterpolate$$1)))(+y);
	    };

	    scale.domain = function (_) {
	      return arguments.length ? (domain = map$3.call(_, number$2), rescale()) : domain.slice();
	    };

	    scale.range = function (_) {
	      return arguments.length ? (range = slice$5.call(_), rescale()) : range.slice();
	    };

	    scale.rangeRound = function (_) {
	      return range = slice$5.call(_), interpolate = interpolateRound, rescale();
	    };

	    scale.clamp = function (_) {
	      return arguments.length ? (clamp = !!_, rescale()) : clamp;
	    };

	    scale.interpolate = function (_) {
	      return arguments.length ? (interpolate = _, rescale()) : interpolate;
	    };

	    return rescale();
	  }

	  var tickFormat = function tickFormat(domain, count, specifier) {
	    var start = domain[0],
	        stop = domain[domain.length - 1],
	        step = tickStep(start, stop, count == null ? 10 : count),
	        precision;
	    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
	    switch (specifier.type) {
	      case "s":
	        {
	          var value = Math.max(Math.abs(start), Math.abs(stop));
	          if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
	          return exports.formatPrefix(specifier, value);
	        }
	      case "":
	      case "e":
	      case "g":
	      case "p":
	      case "r":
	        {
	          if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
	          break;
	        }
	      case "f":
	      case "%":
	        {
	          if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
	          break;
	        }
	    }
	    return exports.format(specifier);
	  };

	  function linearish(scale) {
	    var domain = scale.domain;

	    scale.ticks = function (count) {
	      var d = domain();
	      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
	    };

	    scale.tickFormat = function (count, specifier) {
	      return tickFormat(domain(), count, specifier);
	    };

	    scale.nice = function (count) {
	      if (count == null) count = 10;

	      var d = domain(),
	          i0 = 0,
	          i1 = d.length - 1,
	          start = d[i0],
	          stop = d[i1],
	          step;

	      if (stop < start) {
	        step = start, start = stop, stop = step;
	        step = i0, i0 = i1, i1 = step;
	      }

	      step = tickIncrement(start, stop, count);

	      if (step > 0) {
	        start = Math.floor(start / step) * step;
	        stop = Math.ceil(stop / step) * step;
	        step = tickIncrement(start, stop, count);
	      } else if (step < 0) {
	        start = Math.ceil(start * step) / step;
	        stop = Math.floor(stop * step) / step;
	        step = tickIncrement(start, stop, count);
	      }

	      if (step > 0) {
	        d[i0] = Math.floor(start / step) * step;
	        d[i1] = Math.ceil(stop / step) * step;
	        domain(d);
	      } else if (step < 0) {
	        d[i0] = Math.ceil(start * step) / step;
	        d[i1] = Math.floor(stop * step) / step;
	        domain(d);
	      }

	      return scale;
	    };

	    return scale;
	  }

	  function linear$2() {
	    var scale = continuous(deinterpolateLinear, reinterpolate);

	    scale.copy = function () {
	      return copy(scale, linear$2());
	    };

	    return linearish(scale);
	  }

	  function identity$6() {
	    var domain = [0, 1];

	    function scale(x) {
	      return +x;
	    }

	    scale.invert = scale;

	    scale.domain = scale.range = function (_) {
	      return arguments.length ? (domain = map$3.call(_, number$2), scale) : domain.slice();
	    };

	    scale.copy = function () {
	      return identity$6().domain(domain);
	    };

	    return linearish(scale);
	  }

	  var nice = function nice(domain, interval) {
	    domain = domain.slice();

	    var i0 = 0,
	        i1 = domain.length - 1,
	        x0 = domain[i0],
	        x1 = domain[i1],
	        t;

	    if (x1 < x0) {
	      t = i0, i0 = i1, i1 = t;
	      t = x0, x0 = x1, x1 = t;
	    }

	    domain[i0] = interval.floor(x0);
	    domain[i1] = interval.ceil(x1);
	    return domain;
	  };

	  function deinterpolate(a, b) {
	    return (b = Math.log(b / a)) ? function (x) {
	      return Math.log(x / a) / b;
	    } : constant$9(b);
	  }

	  function reinterpolate$1(a, b) {
	    return a < 0 ? function (t) {
	      return -Math.pow(-b, t) * Math.pow(-a, 1 - t);
	    } : function (t) {
	      return Math.pow(b, t) * Math.pow(a, 1 - t);
	    };
	  }

	  function pow10(x) {
	    return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
	  }

	  function powp(base) {
	    return base === 10 ? pow10 : base === Math.E ? Math.exp : function (x) {
	      return Math.pow(base, x);
	    };
	  }

	  function logp(base) {
	    return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function (x) {
	      return Math.log(x) / base;
	    });
	  }

	  function reflect(f) {
	    return function (x) {
	      return -f(-x);
	    };
	  }

	  function log$1() {
	    var scale = continuous(deinterpolate, reinterpolate$1).domain([1, 10]),
	        domain = scale.domain,
	        base = 10,
	        logs = logp(10),
	        pows = powp(10);

	    function rescale() {
	      logs = logp(base), pows = powp(base);
	      if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
	      return scale;
	    }

	    scale.base = function (_) {
	      return arguments.length ? (base = +_, rescale()) : base;
	    };

	    scale.domain = function (_) {
	      return arguments.length ? (domain(_), rescale()) : domain();
	    };

	    scale.ticks = function (count) {
	      var d = domain(),
	          u = d[0],
	          v = d[d.length - 1],
	          r;

	      if (r = v < u) i = u, u = v, v = i;

	      var i = logs(u),
	          j = logs(v),
	          p,
	          k,
	          t,
	          n = count == null ? 10 : +count,
	          z = [];

	      if (!(base % 1) && j - i < n) {
	        i = Math.round(i) - 1, j = Math.round(j) + 1;
	        if (u > 0) for (; i < j; ++i) {
	          for (k = 1, p = pows(i); k < base; ++k) {
	            t = p * k;
	            if (t < u) continue;
	            if (t > v) break;
	            z.push(t);
	          }
	        } else for (; i < j; ++i) {
	          for (k = base - 1, p = pows(i); k >= 1; --k) {
	            t = p * k;
	            if (t < u) continue;
	            if (t > v) break;
	            z.push(t);
	          }
	        }
	      } else {
	        z = ticks(i, j, Math.min(j - i, n)).map(pows);
	      }

	      return r ? z.reverse() : z;
	    };

	    scale.tickFormat = function (count, specifier) {
	      if (specifier == null) specifier = base === 10 ? ".0e" : ",";
	      if (typeof specifier !== "function") specifier = exports.format(specifier);
	      if (count === Infinity) return specifier;
	      if (count == null) count = 10;
	      var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
	      return function (d) {
	        var i = d / pows(Math.round(logs(d)));
	        if (i * base < base - 0.5) i *= base;
	        return i <= k ? specifier(d) : "";
	      };
	    };

	    scale.nice = function () {
	      return domain(nice(domain(), {
	        floor: function floor(x) {
	          return pows(Math.floor(logs(x)));
	        },
	        ceil: function ceil(x) {
	          return pows(Math.ceil(logs(x)));
	        }
	      }));
	    };

	    scale.copy = function () {
	      return copy(scale, log$1().base(base));
	    };

	    return scale;
	  }

	  function raise$1(x, exponent) {
	    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	  }

	  function pow$1() {
	    var exponent = 1,
	        scale = continuous(deinterpolate, reinterpolate),
	        domain = scale.domain;

	    function deinterpolate(a, b) {
	      return (b = raise$1(b, exponent) - (a = raise$1(a, exponent))) ? function (x) {
	        return (raise$1(x, exponent) - a) / b;
	      } : constant$9(b);
	    }

	    function reinterpolate(a, b) {
	      b = raise$1(b, exponent) - (a = raise$1(a, exponent));
	      return function (t) {
	        return raise$1(a + b * t, 1 / exponent);
	      };
	    }

	    scale.exponent = function (_) {
	      return arguments.length ? (exponent = +_, domain(domain())) : exponent;
	    };

	    scale.copy = function () {
	      return copy(scale, pow$1().exponent(exponent));
	    };

	    return linearish(scale);
	  }

	  function sqrt$1() {
	    return pow$1().exponent(0.5);
	  }

	  function quantile() {
	    var domain = [],
	        range = [],
	        thresholds = [];

	    function rescale() {
	      var i = 0,
	          n = Math.max(1, range.length);
	      thresholds = new Array(n - 1);
	      while (++i < n) {
	        thresholds[i - 1] = threshold(domain, i / n);
	      }return scale;
	    }

	    function scale(x) {
	      if (!isNaN(x = +x)) return range[bisectRight(thresholds, x)];
	    }

	    scale.invertExtent = function (y) {
	      var i = range.indexOf(y);
	      return i < 0 ? [NaN, NaN] : [i > 0 ? thresholds[i - 1] : domain[0], i < thresholds.length ? thresholds[i] : domain[domain.length - 1]];
	    };

	    scale.domain = function (_) {
	      if (!arguments.length) return domain.slice();
	      domain = [];
	      for (var i = 0, n = _.length, d; i < n; ++i) {
	        if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
	      }domain.sort(ascending);
	      return rescale();
	    };

	    scale.range = function (_) {
	      return arguments.length ? (range = slice$5.call(_), rescale()) : range.slice();
	    };

	    scale.quantiles = function () {
	      return thresholds.slice();
	    };

	    scale.copy = function () {
	      return quantile().domain(domain).range(range);
	    };

	    return scale;
	  }

	  function quantize$1() {
	    var x0 = 0,
	        x1 = 1,
	        n = 1,
	        domain = [0.5],
	        range = [0, 1];

	    function scale(x) {
	      if (x <= x) return range[bisectRight(domain, x, 0, n)];
	    }

	    function rescale() {
	      var i = -1;
	      domain = new Array(n);
	      while (++i < n) {
	        domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
	      }return scale;
	    }

	    scale.domain = function (_) {
	      return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
	    };

	    scale.range = function (_) {
	      return arguments.length ? (n = (range = slice$5.call(_)).length - 1, rescale()) : range.slice();
	    };

	    scale.invertExtent = function (y) {
	      var i = range.indexOf(y);
	      return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
	    };

	    scale.copy = function () {
	      return quantize$1().domain([x0, x1]).range(range);
	    };

	    return linearish(scale);
	  }

	  function threshold$1() {
	    var domain = [0.5],
	        range = [0, 1],
	        n = 1;

	    function scale(x) {
	      if (x <= x) return range[bisectRight(domain, x, 0, n)];
	    }

	    scale.domain = function (_) {
	      return arguments.length ? (domain = slice$5.call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
	    };

	    scale.range = function (_) {
	      return arguments.length ? (range = slice$5.call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
	    };

	    scale.invertExtent = function (y) {
	      var i = range.indexOf(y);
	      return [domain[i - 1], domain[i]];
	    };

	    scale.copy = function () {
	      return threshold$1().domain(domain).range(range);
	    };

	    return scale;
	  }

	  var t0$1 = new Date();
	  var t1$1 = new Date();

	  function newInterval(floori, offseti, count, field) {

	    function interval(date) {
	      return floori(date = new Date(+date)), date;
	    }

	    interval.floor = interval;

	    interval.ceil = function (date) {
	      return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
	    };

	    interval.round = function (date) {
	      var d0 = interval(date),
	          d1 = interval.ceil(date);
	      return date - d0 < d1 - date ? d0 : d1;
	    };

	    interval.offset = function (date, step) {
	      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
	    };

	    interval.range = function (start, stop, step) {
	      var range = [];
	      start = interval.ceil(start);
	      step = step == null ? 1 : Math.floor(step);
	      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
	      do {
	        range.push(new Date(+start));
	      } while ((offseti(start, step), floori(start), start < stop));
	      return range;
	    };

	    interval.filter = function (test) {
	      return newInterval(function (date) {
	        if (date >= date) while (floori(date), !test(date)) {
	          date.setTime(date - 1);
	        }
	      }, function (date, step) {
	        if (date >= date) {
	          if (step < 0) while (++step <= 0) {
	            while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
	          } else while (--step >= 0) {
	            while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
	          }
	        }
	      });
	    };

	    if (count) {
	      interval.count = function (start, end) {
	        t0$1.setTime(+start), t1$1.setTime(+end);
	        floori(t0$1), floori(t1$1);
	        return Math.floor(count(t0$1, t1$1));
	      };

	      interval.every = function (step) {
	        step = Math.floor(step);
	        return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function (d) {
	          return field(d) % step === 0;
	        } : function (d) {
	          return interval.count(0, d) % step === 0;
	        });
	      };
	    }

	    return interval;
	  }

	  var millisecond = newInterval(function () {
	    // noop
	  }, function (date, step) {
	    date.setTime(+date + step);
	  }, function (start, end) {
	    return end - start;
	  });

	  // An optimized implementation for this simple case.
	  millisecond.every = function (k) {
	    k = Math.floor(k);
	    if (!isFinite(k) || !(k > 0)) return null;
	    if (!(k > 1)) return millisecond;
	    return newInterval(function (date) {
	      date.setTime(Math.floor(date / k) * k);
	    }, function (date, step) {
	      date.setTime(+date + step * k);
	    }, function (start, end) {
	      return (end - start) / k;
	    });
	  };

	  var milliseconds = millisecond.range;

	  var durationSecond$1 = 1e3;
	  var durationMinute$1 = 6e4;
	  var durationHour$1 = 36e5;
	  var durationDay$1 = 864e5;
	  var durationWeek$1 = 6048e5;

	  var second = newInterval(function (date) {
	    date.setTime(Math.floor(date / durationSecond$1) * durationSecond$1);
	  }, function (date, step) {
	    date.setTime(+date + step * durationSecond$1);
	  }, function (start, end) {
	    return (end - start) / durationSecond$1;
	  }, function (date) {
	    return date.getUTCSeconds();
	  });

	  var seconds = second.range;

	  var minute = newInterval(function (date) {
	    date.setTime(Math.floor(date / durationMinute$1) * durationMinute$1);
	  }, function (date, step) {
	    date.setTime(+date + step * durationMinute$1);
	  }, function (start, end) {
	    return (end - start) / durationMinute$1;
	  }, function (date) {
	    return date.getMinutes();
	  });

	  var minutes = minute.range;

	  var hour = newInterval(function (date) {
	    var offset = date.getTimezoneOffset() * durationMinute$1 % durationHour$1;
	    if (offset < 0) offset += durationHour$1;
	    date.setTime(Math.floor((+date - offset) / durationHour$1) * durationHour$1 + offset);
	  }, function (date, step) {
	    date.setTime(+date + step * durationHour$1);
	  }, function (start, end) {
	    return (end - start) / durationHour$1;
	  }, function (date) {
	    return date.getHours();
	  });

	  var hours = hour.range;

	  var day = newInterval(function (date) {
	    date.setHours(0, 0, 0, 0);
	  }, function (date, step) {
	    date.setDate(date.getDate() + step);
	  }, function (start, end) {
	    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute$1) / durationDay$1;
	  }, function (date) {
	    return date.getDate() - 1;
	  });

	  var days = day.range;

	  function weekday(i) {
	    return newInterval(function (date) {
	      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
	      date.setHours(0, 0, 0, 0);
	    }, function (date, step) {
	      date.setDate(date.getDate() + step * 7);
	    }, function (start, end) {
	      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute$1) / durationWeek$1;
	    });
	  }

	  var sunday = weekday(0);
	  var monday = weekday(1);
	  var tuesday = weekday(2);
	  var wednesday = weekday(3);
	  var thursday = weekday(4);
	  var friday = weekday(5);
	  var saturday = weekday(6);

	  var sundays = sunday.range;
	  var mondays = monday.range;
	  var tuesdays = tuesday.range;
	  var wednesdays = wednesday.range;
	  var thursdays = thursday.range;
	  var fridays = friday.range;
	  var saturdays = saturday.range;

	  var month = newInterval(function (date) {
	    date.setDate(1);
	    date.setHours(0, 0, 0, 0);
	  }, function (date, step) {
	    date.setMonth(date.getMonth() + step);
	  }, function (start, end) {
	    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
	  }, function (date) {
	    return date.getMonth();
	  });

	  var months = month.range;

	  var year = newInterval(function (date) {
	    date.setMonth(0, 1);
	    date.setHours(0, 0, 0, 0);
	  }, function (date, step) {
	    date.setFullYear(date.getFullYear() + step);
	  }, function (start, end) {
	    return end.getFullYear() - start.getFullYear();
	  }, function (date) {
	    return date.getFullYear();
	  });

	  // An optimized implementation for this simple case.
	  year.every = function (k) {
	    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function (date) {
	      date.setFullYear(Math.floor(date.getFullYear() / k) * k);
	      date.setMonth(0, 1);
	      date.setHours(0, 0, 0, 0);
	    }, function (date, step) {
	      date.setFullYear(date.getFullYear() + step * k);
	    });
	  };

	  var years = year.range;

	  var utcMinute = newInterval(function (date) {
	    date.setUTCSeconds(0, 0);
	  }, function (date, step) {
	    date.setTime(+date + step * durationMinute$1);
	  }, function (start, end) {
	    return (end - start) / durationMinute$1;
	  }, function (date) {
	    return date.getUTCMinutes();
	  });

	  var utcMinutes = utcMinute.range;

	  var utcHour = newInterval(function (date) {
	    date.setUTCMinutes(0, 0, 0);
	  }, function (date, step) {
	    date.setTime(+date + step * durationHour$1);
	  }, function (start, end) {
	    return (end - start) / durationHour$1;
	  }, function (date) {
	    return date.getUTCHours();
	  });

	  var utcHours = utcHour.range;

	  var utcDay = newInterval(function (date) {
	    date.setUTCHours(0, 0, 0, 0);
	  }, function (date, step) {
	    date.setUTCDate(date.getUTCDate() + step);
	  }, function (start, end) {
	    return (end - start) / durationDay$1;
	  }, function (date) {
	    return date.getUTCDate() - 1;
	  });

	  var utcDays = utcDay.range;

	  function utcWeekday(i) {
	    return newInterval(function (date) {
	      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
	      date.setUTCHours(0, 0, 0, 0);
	    }, function (date, step) {
	      date.setUTCDate(date.getUTCDate() + step * 7);
	    }, function (start, end) {
	      return (end - start) / durationWeek$1;
	    });
	  }

	  var utcSunday = utcWeekday(0);
	  var utcMonday = utcWeekday(1);
	  var utcTuesday = utcWeekday(2);
	  var utcWednesday = utcWeekday(3);
	  var utcThursday = utcWeekday(4);
	  var utcFriday = utcWeekday(5);
	  var utcSaturday = utcWeekday(6);

	  var utcSundays = utcSunday.range;
	  var utcMondays = utcMonday.range;
	  var utcTuesdays = utcTuesday.range;
	  var utcWednesdays = utcWednesday.range;
	  var utcThursdays = utcThursday.range;
	  var utcFridays = utcFriday.range;
	  var utcSaturdays = utcSaturday.range;

	  var utcMonth = newInterval(function (date) {
	    date.setUTCDate(1);
	    date.setUTCHours(0, 0, 0, 0);
	  }, function (date, step) {
	    date.setUTCMonth(date.getUTCMonth() + step);
	  }, function (start, end) {
	    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
	  }, function (date) {
	    return date.getUTCMonth();
	  });

	  var utcMonths = utcMonth.range;

	  var utcYear = newInterval(function (date) {
	    date.setUTCMonth(0, 1);
	    date.setUTCHours(0, 0, 0, 0);
	  }, function (date, step) {
	    date.setUTCFullYear(date.getUTCFullYear() + step);
	  }, function (start, end) {
	    return end.getUTCFullYear() - start.getUTCFullYear();
	  }, function (date) {
	    return date.getUTCFullYear();
	  });

	  // An optimized implementation for this simple case.
	  utcYear.every = function (k) {
	    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function (date) {
	      date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
	      date.setUTCMonth(0, 1);
	      date.setUTCHours(0, 0, 0, 0);
	    }, function (date, step) {
	      date.setUTCFullYear(date.getUTCFullYear() + step * k);
	    });
	  };

	  var utcYears = utcYear.range;

	  function localDate(d) {
	    if (0 <= d.y && d.y < 100) {
	      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
	      date.setFullYear(d.y);
	      return date;
	    }
	    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
	  }

	  function utcDate(d) {
	    if (0 <= d.y && d.y < 100) {
	      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
	      date.setUTCFullYear(d.y);
	      return date;
	    }
	    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
	  }

	  function newYear(y) {
	    return { y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 };
	  }

	  function formatLocale$1(locale) {
	    var locale_dateTime = locale.dateTime,
	        locale_date = locale.date,
	        locale_time = locale.time,
	        locale_periods = locale.periods,
	        locale_weekdays = locale.days,
	        locale_shortWeekdays = locale.shortDays,
	        locale_months = locale.months,
	        locale_shortMonths = locale.shortMonths;

	    var periodRe = formatRe(locale_periods),
	        periodLookup = formatLookup(locale_periods),
	        weekdayRe = formatRe(locale_weekdays),
	        weekdayLookup = formatLookup(locale_weekdays),
	        shortWeekdayRe = formatRe(locale_shortWeekdays),
	        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
	        monthRe = formatRe(locale_months),
	        monthLookup = formatLookup(locale_months),
	        shortMonthRe = formatRe(locale_shortMonths),
	        shortMonthLookup = formatLookup(locale_shortMonths);

	    var formats = {
	      "a": formatShortWeekday,
	      "A": formatWeekday,
	      "b": formatShortMonth,
	      "B": formatMonth,
	      "c": null,
	      "d": formatDayOfMonth,
	      "e": formatDayOfMonth,
	      "H": formatHour24,
	      "I": formatHour12,
	      "j": formatDayOfYear,
	      "L": formatMilliseconds,
	      "m": formatMonthNumber,
	      "M": formatMinutes,
	      "p": formatPeriod,
	      "S": formatSeconds,
	      "U": formatWeekNumberSunday,
	      "w": formatWeekdayNumber,
	      "W": formatWeekNumberMonday,
	      "x": null,
	      "X": null,
	      "y": formatYear,
	      "Y": formatFullYear,
	      "Z": formatZone,
	      "%": formatLiteralPercent
	    };

	    var utcFormats = {
	      "a": formatUTCShortWeekday,
	      "A": formatUTCWeekday,
	      "b": formatUTCShortMonth,
	      "B": formatUTCMonth,
	      "c": null,
	      "d": formatUTCDayOfMonth,
	      "e": formatUTCDayOfMonth,
	      "H": formatUTCHour24,
	      "I": formatUTCHour12,
	      "j": formatUTCDayOfYear,
	      "L": formatUTCMilliseconds,
	      "m": formatUTCMonthNumber,
	      "M": formatUTCMinutes,
	      "p": formatUTCPeriod,
	      "S": formatUTCSeconds,
	      "U": formatUTCWeekNumberSunday,
	      "w": formatUTCWeekdayNumber,
	      "W": formatUTCWeekNumberMonday,
	      "x": null,
	      "X": null,
	      "y": formatUTCYear,
	      "Y": formatUTCFullYear,
	      "Z": formatUTCZone,
	      "%": formatLiteralPercent
	    };

	    var parses = {
	      "a": parseShortWeekday,
	      "A": parseWeekday,
	      "b": parseShortMonth,
	      "B": parseMonth,
	      "c": parseLocaleDateTime,
	      "d": parseDayOfMonth,
	      "e": parseDayOfMonth,
	      "H": parseHour24,
	      "I": parseHour24,
	      "j": parseDayOfYear,
	      "L": parseMilliseconds,
	      "m": parseMonthNumber,
	      "M": parseMinutes,
	      "p": parsePeriod,
	      "S": parseSeconds,
	      "U": parseWeekNumberSunday,
	      "w": parseWeekdayNumber,
	      "W": parseWeekNumberMonday,
	      "x": parseLocaleDate,
	      "X": parseLocaleTime,
	      "y": parseYear,
	      "Y": parseFullYear,
	      "Z": parseZone,
	      "%": parseLiteralPercent
	    };

	    // These recursive directive definitions must be deferred.
	    formats.x = newFormat(locale_date, formats);
	    formats.X = newFormat(locale_time, formats);
	    formats.c = newFormat(locale_dateTime, formats);
	    utcFormats.x = newFormat(locale_date, utcFormats);
	    utcFormats.X = newFormat(locale_time, utcFormats);
	    utcFormats.c = newFormat(locale_dateTime, utcFormats);

	    function newFormat(specifier, formats) {
	      return function (date) {
	        var string = [],
	            i = -1,
	            j = 0,
	            n = specifier.length,
	            c,
	            pad,
	            format;

	        if (!(date instanceof Date)) date = new Date(+date);

	        while (++i < n) {
	          if (specifier.charCodeAt(i) === 37) {
	            string.push(specifier.slice(j, i));
	            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);else pad = c === "e" ? " " : "0";
	            if (format = formats[c]) c = format(date, pad);
	            string.push(c);
	            j = i + 1;
	          }
	        }

	        string.push(specifier.slice(j, i));
	        return string.join("");
	      };
	    }

	    function newParse(specifier, newDate) {
	      return function (string) {
	        var d = newYear(1900),
	            i = parseSpecifier(d, specifier, string += "", 0);
	        if (i != string.length) return null;

	        // The am-pm flag is 0 for AM, and 1 for PM.
	        if ("p" in d) d.H = d.H % 12 + d.p * 12;

	        // Convert day-of-week and week-of-year to day-of-year.
	        if ("W" in d || "U" in d) {
	          if (!("w" in d)) d.w = "W" in d ? 1 : 0;
	          var day$$1 = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
	          d.m = 0;
	          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$$1 + 5) % 7 : d.w + d.U * 7 - (day$$1 + 6) % 7;
	        }

	        // If a time zone is specified, all fields are interpreted as UTC and then
	        // offset according to the specified time zone.
	        if ("Z" in d) {
	          d.H += d.Z / 100 | 0;
	          d.M += d.Z % 100;
	          return utcDate(d);
	        }

	        // Otherwise, all fields are in local time.
	        return newDate(d);
	      };
	    }

	    function parseSpecifier(d, specifier, string, j) {
	      var i = 0,
	          n = specifier.length,
	          m = string.length,
	          c,
	          parse;

	      while (i < n) {
	        if (j >= m) return -1;
	        c = specifier.charCodeAt(i++);
	        if (c === 37) {
	          c = specifier.charAt(i++);
	          parse = parses[c in pads ? specifier.charAt(i++) : c];
	          if (!parse || (j = parse(d, string, j)) < 0) return -1;
	        } else if (c != string.charCodeAt(j++)) {
	          return -1;
	        }
	      }

	      return j;
	    }

	    function parsePeriod(d, string, i) {
	      var n = periodRe.exec(string.slice(i));
	      return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }

	    function parseShortWeekday(d, string, i) {
	      var n = shortWeekdayRe.exec(string.slice(i));
	      return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }

	    function parseWeekday(d, string, i) {
	      var n = weekdayRe.exec(string.slice(i));
	      return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }

	    function parseShortMonth(d, string, i) {
	      var n = shortMonthRe.exec(string.slice(i));
	      return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }

	    function parseMonth(d, string, i) {
	      var n = monthRe.exec(string.slice(i));
	      return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	    }

	    function parseLocaleDateTime(d, string, i) {
	      return parseSpecifier(d, locale_dateTime, string, i);
	    }

	    function parseLocaleDate(d, string, i) {
	      return parseSpecifier(d, locale_date, string, i);
	    }

	    function parseLocaleTime(d, string, i) {
	      return parseSpecifier(d, locale_time, string, i);
	    }

	    function formatShortWeekday(d) {
	      return locale_shortWeekdays[d.getDay()];
	    }

	    function formatWeekday(d) {
	      return locale_weekdays[d.getDay()];
	    }

	    function formatShortMonth(d) {
	      return locale_shortMonths[d.getMonth()];
	    }

	    function formatMonth(d) {
	      return locale_months[d.getMonth()];
	    }

	    function formatPeriod(d) {
	      return locale_periods[+(d.getHours() >= 12)];
	    }

	    function formatUTCShortWeekday(d) {
	      return locale_shortWeekdays[d.getUTCDay()];
	    }

	    function formatUTCWeekday(d) {
	      return locale_weekdays[d.getUTCDay()];
	    }

	    function formatUTCShortMonth(d) {
	      return locale_shortMonths[d.getUTCMonth()];
	    }

	    function formatUTCMonth(d) {
	      return locale_months[d.getUTCMonth()];
	    }

	    function formatUTCPeriod(d) {
	      return locale_periods[+(d.getUTCHours() >= 12)];
	    }

	    return {
	      format: function format(specifier) {
	        var f = newFormat(specifier += "", formats);
	        f.toString = function () {
	          return specifier;
	        };
	        return f;
	      },
	      parse: function parse(specifier) {
	        var p = newParse(specifier += "", localDate);
	        p.toString = function () {
	          return specifier;
	        };
	        return p;
	      },
	      utcFormat: function utcFormat(specifier) {
	        var f = newFormat(specifier += "", utcFormats);
	        f.toString = function () {
	          return specifier;
	        };
	        return f;
	      },
	      utcParse: function utcParse(specifier) {
	        var p = newParse(specifier, utcDate);
	        p.toString = function () {
	          return specifier;
	        };
	        return p;
	      }
	    };
	  }

	  var pads = { "-": "", "_": " ", "0": "0" };
	  var numberRe = /^\s*\d+/;
	  var percentRe = /^%/;
	  var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

	  function pad(value, fill, width) {
	    var sign = value < 0 ? "-" : "",
	        string = (sign ? -value : value) + "",
	        length = string.length;
	    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
	  }

	  function requote(s) {
	    return s.replace(requoteRe, "\\$&");
	  }

	  function formatRe(names) {
	    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
	  }

	  function formatLookup(names) {
	    var map = {},
	        i = -1,
	        n = names.length;
	    while (++i < n) {
	      map[names[i].toLowerCase()] = i;
	    }return map;
	  }

	  function parseWeekdayNumber(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 1));
	    return n ? (d.w = +n[0], i + n[0].length) : -1;
	  }

	  function parseWeekNumberSunday(d, string, i) {
	    var n = numberRe.exec(string.slice(i));
	    return n ? (d.U = +n[0], i + n[0].length) : -1;
	  }

	  function parseWeekNumberMonday(d, string, i) {
	    var n = numberRe.exec(string.slice(i));
	    return n ? (d.W = +n[0], i + n[0].length) : -1;
	  }

	  function parseFullYear(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 4));
	    return n ? (d.y = +n[0], i + n[0].length) : -1;
	  }

	  function parseYear(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
	  }

	  function parseZone(d, string, i) {
	    var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
	    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
	  }

	  function parseMonthNumber(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
	  }

	  function parseDayOfMonth(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.d = +n[0], i + n[0].length) : -1;
	  }

	  function parseDayOfYear(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 3));
	    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
	  }

	  function parseHour24(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.H = +n[0], i + n[0].length) : -1;
	  }

	  function parseMinutes(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.M = +n[0], i + n[0].length) : -1;
	  }

	  function parseSeconds(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 2));
	    return n ? (d.S = +n[0], i + n[0].length) : -1;
	  }

	  function parseMilliseconds(d, string, i) {
	    var n = numberRe.exec(string.slice(i, i + 3));
	    return n ? (d.L = +n[0], i + n[0].length) : -1;
	  }

	  function parseLiteralPercent(d, string, i) {
	    var n = percentRe.exec(string.slice(i, i + 1));
	    return n ? i + n[0].length : -1;
	  }

	  function formatDayOfMonth(d, p) {
	    return pad(d.getDate(), p, 2);
	  }

	  function formatHour24(d, p) {
	    return pad(d.getHours(), p, 2);
	  }

	  function formatHour12(d, p) {
	    return pad(d.getHours() % 12 || 12, p, 2);
	  }

	  function formatDayOfYear(d, p) {
	    return pad(1 + day.count(year(d), d), p, 3);
	  }

	  function formatMilliseconds(d, p) {
	    return pad(d.getMilliseconds(), p, 3);
	  }

	  function formatMonthNumber(d, p) {
	    return pad(d.getMonth() + 1, p, 2);
	  }

	  function formatMinutes(d, p) {
	    return pad(d.getMinutes(), p, 2);
	  }

	  function formatSeconds(d, p) {
	    return pad(d.getSeconds(), p, 2);
	  }

	  function formatWeekNumberSunday(d, p) {
	    return pad(sunday.count(year(d), d), p, 2);
	  }

	  function formatWeekdayNumber(d) {
	    return d.getDay();
	  }

	  function formatWeekNumberMonday(d, p) {
	    return pad(monday.count(year(d), d), p, 2);
	  }

	  function formatYear(d, p) {
	    return pad(d.getFullYear() % 100, p, 2);
	  }

	  function formatFullYear(d, p) {
	    return pad(d.getFullYear() % 10000, p, 4);
	  }

	  function formatZone(d) {
	    var z = d.getTimezoneOffset();
	    return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
	  }

	  function formatUTCDayOfMonth(d, p) {
	    return pad(d.getUTCDate(), p, 2);
	  }

	  function formatUTCHour24(d, p) {
	    return pad(d.getUTCHours(), p, 2);
	  }

	  function formatUTCHour12(d, p) {
	    return pad(d.getUTCHours() % 12 || 12, p, 2);
	  }

	  function formatUTCDayOfYear(d, p) {
	    return pad(1 + utcDay.count(utcYear(d), d), p, 3);
	  }

	  function formatUTCMilliseconds(d, p) {
	    return pad(d.getUTCMilliseconds(), p, 3);
	  }

	  function formatUTCMonthNumber(d, p) {
	    return pad(d.getUTCMonth() + 1, p, 2);
	  }

	  function formatUTCMinutes(d, p) {
	    return pad(d.getUTCMinutes(), p, 2);
	  }

	  function formatUTCSeconds(d, p) {
	    return pad(d.getUTCSeconds(), p, 2);
	  }

	  function formatUTCWeekNumberSunday(d, p) {
	    return pad(utcSunday.count(utcYear(d), d), p, 2);
	  }

	  function formatUTCWeekdayNumber(d) {
	    return d.getUTCDay();
	  }

	  function formatUTCWeekNumberMonday(d, p) {
	    return pad(utcMonday.count(utcYear(d), d), p, 2);
	  }

	  function formatUTCYear(d, p) {
	    return pad(d.getUTCFullYear() % 100, p, 2);
	  }

	  function formatUTCFullYear(d, p) {
	    return pad(d.getUTCFullYear() % 10000, p, 4);
	  }

	  function formatUTCZone() {
	    return "+0000";
	  }

	  function formatLiteralPercent() {
	    return "%";
	  }

	  var locale$2;

	  defaultLocale$1({
	    dateTime: "%x, %X",
	    date: "%-m/%-d/%Y",
	    time: "%-I:%M:%S %p",
	    periods: ["AM", "PM"],
	    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	  });

	  function defaultLocale$1(definition) {
	    locale$2 = formatLocale$1(definition);
	    exports.timeFormat = locale$2.format;
	    exports.timeParse = locale$2.parse;
	    exports.utcFormat = locale$2.utcFormat;
	    exports.utcParse = locale$2.utcParse;
	    return locale$2;
	  }

	  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

	  function formatIsoNative(date) {
	    return date.toISOString();
	  }

	  var formatIso = Date.prototype.toISOString ? formatIsoNative : exports.utcFormat(isoSpecifier);

	  function parseIsoNative(string) {
	    var date = new Date(string);
	    return isNaN(date) ? null : date;
	  }

	  var parseIso = +new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : exports.utcParse(isoSpecifier);

	  var durationSecond = 1000;
	  var durationMinute = durationSecond * 60;
	  var durationHour = durationMinute * 60;
	  var durationDay = durationHour * 24;
	  var durationWeek = durationDay * 7;
	  var durationMonth = durationDay * 30;
	  var durationYear = durationDay * 365;

	  function date$1(t) {
	    return new Date(t);
	  }

	  function number$3(t) {
	    return t instanceof Date ? +t : +new Date(+t);
	  }

	  function calendar(year$$1, month$$1, week, day$$1, hour$$1, minute$$1, second$$1, millisecond$$1, format) {
	    var scale = continuous(deinterpolateLinear, reinterpolate),
	        invert = scale.invert,
	        domain = scale.domain;

	    var formatMillisecond = format(".%L"),
	        formatSecond = format(":%S"),
	        formatMinute = format("%I:%M"),
	        formatHour = format("%I %p"),
	        formatDay = format("%a %d"),
	        formatWeek = format("%b %d"),
	        formatMonth = format("%B"),
	        formatYear = format("%Y");

	    var tickIntervals = [[second$$1, 1, durationSecond], [second$$1, 5, 5 * durationSecond], [second$$1, 15, 15 * durationSecond], [second$$1, 30, 30 * durationSecond], [minute$$1, 1, durationMinute], [minute$$1, 5, 5 * durationMinute], [minute$$1, 15, 15 * durationMinute], [minute$$1, 30, 30 * durationMinute], [hour$$1, 1, durationHour], [hour$$1, 3, 3 * durationHour], [hour$$1, 6, 6 * durationHour], [hour$$1, 12, 12 * durationHour], [day$$1, 1, durationDay], [day$$1, 2, 2 * durationDay], [week, 1, durationWeek], [month$$1, 1, durationMonth], [month$$1, 3, 3 * durationMonth], [year$$1, 1, durationYear]];

	    function tickFormat(date$$1) {
	      return (second$$1(date$$1) < date$$1 ? formatMillisecond : minute$$1(date$$1) < date$$1 ? formatSecond : hour$$1(date$$1) < date$$1 ? formatMinute : day$$1(date$$1) < date$$1 ? formatHour : month$$1(date$$1) < date$$1 ? week(date$$1) < date$$1 ? formatDay : formatWeek : year$$1(date$$1) < date$$1 ? formatMonth : formatYear)(date$$1);
	    }

	    function tickInterval(interval$$1, start, stop, step) {
	      if (interval$$1 == null) interval$$1 = 10;

	      // If a desired tick count is specified, pick a reasonable tick interval
	      // based on the extent of the domain and a rough estimate of tick size.
	      // Otherwise, assume interval is already a time interval and use it.
	      if (typeof interval$$1 === "number") {
	        var target = Math.abs(stop - start) / interval$$1,
	            i = bisector(function (i) {
	          return i[2];
	        }).right(tickIntervals, target);
	        if (i === tickIntervals.length) {
	          step = tickStep(start / durationYear, stop / durationYear, interval$$1);
	          interval$$1 = year$$1;
	        } else if (i) {
	          i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
	          step = i[1];
	          interval$$1 = i[0];
	        } else {
	          step = tickStep(start, stop, interval$$1);
	          interval$$1 = millisecond$$1;
	        }
	      }

	      return step == null ? interval$$1 : interval$$1.every(step);
	    }

	    scale.invert = function (y) {
	      return new Date(invert(y));
	    };

	    scale.domain = function (_) {
	      return arguments.length ? domain(map$3.call(_, number$3)) : domain().map(date$1);
	    };

	    scale.ticks = function (interval$$1, step) {
	      var d = domain(),
	          t0 = d[0],
	          t1 = d[d.length - 1],
	          r = t1 < t0,
	          t;
	      if (r) t = t0, t0 = t1, t1 = t;
	      t = tickInterval(interval$$1, t0, t1, step);
	      t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
	      return r ? t.reverse() : t;
	    };

	    scale.tickFormat = function (count, specifier) {
	      return specifier == null ? tickFormat : format(specifier);
	    };

	    scale.nice = function (interval$$1, step) {
	      var d = domain();
	      return (interval$$1 = tickInterval(interval$$1, d[0], d[d.length - 1], step)) ? domain(nice(d, interval$$1)) : scale;
	    };

	    scale.copy = function () {
	      return copy(scale, calendar(year$$1, month$$1, week, day$$1, hour$$1, minute$$1, second$$1, millisecond$$1, format));
	    };

	    return scale;
	  }

	  var time = function time() {
	    return calendar(year, month, sunday, day, hour, minute, second, millisecond, exports.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
	  };

	  var utcTime = function utcTime() {
	    return calendar(utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, millisecond, exports.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
	  };

	  var colors = function colors(s) {
	    return s.match(/.{6}/g).map(function (x) {
	      return "#" + x;
	    });
	  };

	  var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

	  var category20b = colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");

	  var category20c = colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");

	  var category20 = colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");

	  var cubehelix$3 = cubehelixLong(cubehelix(300, 0.5, 0.0), cubehelix(-240, 0.5, 1.0));

	  var warm = cubehelixLong(cubehelix(-100, 0.75, 0.35), cubehelix(80, 1.50, 0.8));

	  var cool = cubehelixLong(cubehelix(260, 0.75, 0.35), cubehelix(80, 1.50, 0.8));

	  var rainbow = cubehelix();

	  var rainbow$1 = function rainbow$1(t) {
	    if (t < 0 || t > 1) t -= Math.floor(t);
	    var ts = Math.abs(t - 0.5);
	    rainbow.h = 360 * t - 100;
	    rainbow.s = 1.5 - 1.5 * ts;
	    rainbow.l = 0.8 - 0.9 * ts;
	    return rainbow + "";
	  };

	  function ramp(range) {
	    var n = range.length;
	    return function (t) {
	      return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
	    };
	  }

	  var viridis = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));

	  var magma = ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));

	  var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));

	  var plasma = ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

	  function sequential(interpolator) {
	    var x0 = 0,
	        x1 = 1,
	        clamp = false;

	    function scale(x) {
	      var t = (x - x0) / (x1 - x0);
	      return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
	    }

	    scale.domain = function (_) {
	      return arguments.length ? (x0 = +_[0], x1 = +_[1], scale) : [x0, x1];
	    };

	    scale.clamp = function (_) {
	      return arguments.length ? (clamp = !!_, scale) : clamp;
	    };

	    scale.interpolator = function (_) {
	      return arguments.length ? (interpolator = _, scale) : interpolator;
	    };

	    scale.copy = function () {
	      return sequential(interpolator).domain([x0, x1]).clamp(clamp);
	    };

	    return linearish(scale);
	  }

	  var constant$10 = function constant$10(x) {
	    return function constant() {
	      return x;
	    };
	  };

	  var abs$1 = Math.abs;
	  var atan2$1 = Math.atan2;
	  var cos$2 = Math.cos;
	  var max$2 = Math.max;
	  var min$1 = Math.min;
	  var sin$2 = Math.sin;
	  var sqrt$2 = Math.sqrt;

	  var epsilon$3 = 1e-12;
	  var pi$4 = Math.PI;
	  var halfPi$3 = pi$4 / 2;
	  var tau$4 = 2 * pi$4;

	  function acos$1(x) {
	    return x > 1 ? 0 : x < -1 ? pi$4 : Math.acos(x);
	  }

	  function asin$1(x) {
	    return x >= 1 ? halfPi$3 : x <= -1 ? -halfPi$3 : Math.asin(x);
	  }

	  function arcInnerRadius(d) {
	    return d.innerRadius;
	  }

	  function arcOuterRadius(d) {
	    return d.outerRadius;
	  }

	  function arcStartAngle(d) {
	    return d.startAngle;
	  }

	  function arcEndAngle(d) {
	    return d.endAngle;
	  }

	  function arcPadAngle(d) {
	    return d && d.padAngle; // Note: optional!
	  }

	  function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	    var x10 = x1 - x0,
	        y10 = y1 - y0,
	        x32 = x3 - x2,
	        y32 = y3 - y2,
	        t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
	    return [x0 + t * x10, y0 + t * y10];
	  }

	  // Compute perpendicular offset line of length rc.
	  // http://mathworld.wolfram.com/Circle-LineIntersection.html
	  function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	    var x01 = x0 - x1,
	        y01 = y0 - y1,
	        lo = (cw ? rc : -rc) / sqrt$2(x01 * x01 + y01 * y01),
	        ox = lo * y01,
	        oy = -lo * x01,
	        x11 = x0 + ox,
	        y11 = y0 + oy,
	        x10 = x1 + ox,
	        y10 = y1 + oy,
	        x00 = (x11 + x10) / 2,
	        y00 = (y11 + y10) / 2,
	        dx = x10 - x11,
	        dy = y10 - y11,
	        d2 = dx * dx + dy * dy,
	        r = r1 - rc,
	        D = x11 * y10 - x10 * y11,
	        d = (dy < 0 ? -1 : 1) * sqrt$2(max$2(0, r * r * d2 - D * D)),
	        cx0 = (D * dy - dx * d) / d2,
	        cy0 = (-D * dx - dy * d) / d2,
	        cx1 = (D * dy + dx * d) / d2,
	        cy1 = (-D * dx + dy * d) / d2,
	        dx0 = cx0 - x00,
	        dy0 = cy0 - y00,
	        dx1 = cx1 - x00,
	        dy1 = cy1 - y00;

	    // Pick the closer of the two intersection points.
	    // TODO Is there a faster way to determine which intersection to use?
	    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

	    return {
	      cx: cx0,
	      cy: cy0,
	      x01: -ox,
	      y01: -oy,
	      x11: cx0 * (r1 / r - 1),
	      y11: cy0 * (r1 / r - 1)
	    };
	  }

	  var arc = function arc() {
	    var innerRadius = arcInnerRadius,
	        outerRadius = arcOuterRadius,
	        cornerRadius = constant$10(0),
	        padRadius = null,
	        startAngle = arcStartAngle,
	        endAngle = arcEndAngle,
	        padAngle = arcPadAngle,
	        context = null;

	    function arc() {
	      var buffer,
	          r,
	          r0 = +innerRadius.apply(this, arguments),
	          r1 = +outerRadius.apply(this, arguments),
	          a0 = startAngle.apply(this, arguments) - halfPi$3,
	          a1 = endAngle.apply(this, arguments) - halfPi$3,
	          da = abs$1(a1 - a0),
	          cw = a1 > a0;

	      if (!context) context = buffer = path();

	      // Ensure that the outer radius is always larger than the inner radius.
	      if (r1 < r0) r = r1, r1 = r0, r0 = r;

	      // Is it a point?
	      if (!(r1 > epsilon$3)) context.moveTo(0, 0);

	      // Or is it a circle or annulus?
	      else if (da > tau$4 - epsilon$3) {
	          context.moveTo(r1 * cos$2(a0), r1 * sin$2(a0));
	          context.arc(0, 0, r1, a0, a1, !cw);
	          if (r0 > epsilon$3) {
	            context.moveTo(r0 * cos$2(a1), r0 * sin$2(a1));
	            context.arc(0, 0, r0, a1, a0, cw);
	          }
	        }

	        // Or is it a circular or annular sector?
	        else {
	            var a01 = a0,
	                a11 = a1,
	                a00 = a0,
	                a10 = a1,
	                da0 = da,
	                da1 = da,
	                ap = padAngle.apply(this, arguments) / 2,
	                rp = ap > epsilon$3 && (padRadius ? +padRadius.apply(this, arguments) : sqrt$2(r0 * r0 + r1 * r1)),
	                rc = min$1(abs$1(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
	                rc0 = rc,
	                rc1 = rc,
	                t0,
	                t1;

	            // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
	            if (rp > epsilon$3) {
	              var p0 = asin$1(rp / r0 * sin$2(ap)),
	                  p1 = asin$1(rp / r1 * sin$2(ap));
	              if ((da0 -= p0 * 2) > epsilon$3) p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;else da0 = 0, a00 = a10 = (a0 + a1) / 2;
	              if ((da1 -= p1 * 2) > epsilon$3) p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;else da1 = 0, a01 = a11 = (a0 + a1) / 2;
	            }

	            var x01 = r1 * cos$2(a01),
	                y01 = r1 * sin$2(a01),
	                x10 = r0 * cos$2(a10),
	                y10 = r0 * sin$2(a10);

	            // Apply rounded corners?
	            if (rc > epsilon$3) {
	              var x11 = r1 * cos$2(a11),
	                  y11 = r1 * sin$2(a11),
	                  x00 = r0 * cos$2(a00),
	                  y00 = r0 * sin$2(a00);

	              // Restrict the corner radius according to the sector angle.
	              if (da < pi$4) {
	                var oc = da0 > epsilon$3 ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
	                    ax = x01 - oc[0],
	                    ay = y01 - oc[1],
	                    bx = x11 - oc[0],
	                    by = y11 - oc[1],
	                    kc = 1 / sin$2(acos$1((ax * bx + ay * by) / (sqrt$2(ax * ax + ay * ay) * sqrt$2(bx * bx + by * by))) / 2),
	                    lc = sqrt$2(oc[0] * oc[0] + oc[1] * oc[1]);
	                rc0 = min$1(rc, (r0 - lc) / (kc - 1));
	                rc1 = min$1(rc, (r1 - lc) / (kc + 1));
	              }
	            }

	            // Is the sector collapsed to a line?
	            if (!(da1 > epsilon$3)) context.moveTo(x01, y01);

	            // Does the sector’s outer ring have rounded corners?
	            else if (rc1 > epsilon$3) {
	                t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
	                t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

	                context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

	                // Have the corners merged?
	                if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2$1(t0.y01, t0.x01), atan2$1(t1.y01, t1.x01), !cw);

	                // Otherwise, draw the two corners and the ring.
	                else {
	                    context.arc(t0.cx, t0.cy, rc1, atan2$1(t0.y01, t0.x01), atan2$1(t0.y11, t0.x11), !cw);
	                    context.arc(0, 0, r1, atan2$1(t0.cy + t0.y11, t0.cx + t0.x11), atan2$1(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
	                    context.arc(t1.cx, t1.cy, rc1, atan2$1(t1.y11, t1.x11), atan2$1(t1.y01, t1.x01), !cw);
	                  }
	              }

	              // Or is the outer ring just a circular arc?
	              else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

	            // Is there no inner ring, and it’s a circular sector?
	            // Or perhaps it’s an annular sector collapsed due to padding?
	            if (!(r0 > epsilon$3) || !(da0 > epsilon$3)) context.lineTo(x10, y10);

	            // Does the sector’s inner ring (or point) have rounded corners?
	            else if (rc0 > epsilon$3) {
	                t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
	                t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

	                context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

	                // Have the corners merged?
	                if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2$1(t0.y01, t0.x01), atan2$1(t1.y01, t1.x01), !cw);

	                // Otherwise, draw the two corners and the ring.
	                else {
	                    context.arc(t0.cx, t0.cy, rc0, atan2$1(t0.y01, t0.x01), atan2$1(t0.y11, t0.x11), !cw);
	                    context.arc(0, 0, r0, atan2$1(t0.cy + t0.y11, t0.cx + t0.x11), atan2$1(t1.cy + t1.y11, t1.cx + t1.x11), cw);
	                    context.arc(t1.cx, t1.cy, rc0, atan2$1(t1.y11, t1.x11), atan2$1(t1.y01, t1.x01), !cw);
	                  }
	              }

	              // Or is the inner ring just a circular arc?
	              else context.arc(0, 0, r0, a10, a00, cw);
	          }

	      context.closePath();

	      if (buffer) return context = null, buffer + "" || null;
	    }

	    arc.centroid = function () {
	      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
	          a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$4 / 2;
	      return [cos$2(a) * r, sin$2(a) * r];
	    };

	    arc.innerRadius = function (_) {
	      return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$10(+_), arc) : innerRadius;
	    };

	    arc.outerRadius = function (_) {
	      return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$10(+_), arc) : outerRadius;
	    };

	    arc.cornerRadius = function (_) {
	      return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$10(+_), arc) : cornerRadius;
	    };

	    arc.padRadius = function (_) {
	      return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$10(+_), arc) : padRadius;
	    };

	    arc.startAngle = function (_) {
	      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$10(+_), arc) : startAngle;
	    };

	    arc.endAngle = function (_) {
	      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$10(+_), arc) : endAngle;
	    };

	    arc.padAngle = function (_) {
	      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$10(+_), arc) : padAngle;
	    };

	    arc.context = function (_) {
	      return arguments.length ? (context = _ == null ? null : _, arc) : context;
	    };

	    return arc;
	  };

	  function Linear(context) {
	    this._context = context;
	  }

	  Linear.prototype = {
	    areaStart: function areaStart() {
	      this._line = 0;
	    },
	    areaEnd: function areaEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0:
	          this._point = 1;this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);break;
	        case 1:
	          this._point = 2; // proceed
	        default:
	          this._context.lineTo(x, y);break;
	      }
	    }
	  };

	  var curveLinear = function curveLinear(context) {
	    return new Linear(context);
	  };

	  function x$3(p) {
	    return p[0];
	  }

	  function y$3(p) {
	    return p[1];
	  }

	  var line = function line() {
	    var x = x$3,
	        y = y$3,
	        defined = constant$10(true),
	        context = null,
	        curve = curveLinear,
	        output = null;

	    function line(data) {
	      var i,
	          n = data.length,
	          d,
	          defined0 = false,
	          buffer;

	      if (context == null) output = curve(buffer = path());

	      for (i = 0; i <= n; ++i) {
	        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	          if (defined0 = !defined0) output.lineStart();else output.lineEnd();
	        }
	        if (defined0) output.point(+x(d, i, data), +y(d, i, data));
	      }

	      if (buffer) return output = null, buffer + "" || null;
	    }

	    line.x = function (_) {
	      return arguments.length ? (x = typeof _ === "function" ? _ : constant$10(+_), line) : x;
	    };

	    line.y = function (_) {
	      return arguments.length ? (y = typeof _ === "function" ? _ : constant$10(+_), line) : y;
	    };

	    line.defined = function (_) {
	      return arguments.length ? (defined = typeof _ === "function" ? _ : constant$10(!!_), line) : defined;
	    };

	    line.curve = function (_) {
	      return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
	    };

	    line.context = function (_) {
	      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	    };

	    return line;
	  };

	  var area$2 = function area$2() {
	    var x0 = x$3,
	        x1 = null,
	        y0 = constant$10(0),
	        y1 = y$3,
	        defined = constant$10(true),
	        context = null,
	        curve = curveLinear,
	        output = null;

	    function area(data) {
	      var i,
	          j,
	          k,
	          n = data.length,
	          d,
	          defined0 = false,
	          buffer,
	          x0z = new Array(n),
	          y0z = new Array(n);

	      if (context == null) output = curve(buffer = path());

	      for (i = 0; i <= n; ++i) {
	        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	          if (defined0 = !defined0) {
	            j = i;
	            output.areaStart();
	            output.lineStart();
	          } else {
	            output.lineEnd();
	            output.lineStart();
	            for (k = i - 1; k >= j; --k) {
	              output.point(x0z[k], y0z[k]);
	            }
	            output.lineEnd();
	            output.areaEnd();
	          }
	        }
	        if (defined0) {
	          x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
	          output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
	        }
	      }

	      if (buffer) return output = null, buffer + "" || null;
	    }

	    function arealine() {
	      return line().defined(defined).curve(curve).context(context);
	    }

	    area.x = function (_) {
	      return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$10(+_), x1 = null, area) : x0;
	    };

	    area.x0 = function (_) {
	      return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$10(+_), area) : x0;
	    };

	    area.x1 = function (_) {
	      return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$10(+_), area) : x1;
	    };

	    area.y = function (_) {
	      return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$10(+_), y1 = null, area) : y0;
	    };

	    area.y0 = function (_) {
	      return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$10(+_), area) : y0;
	    };

	    area.y1 = function (_) {
	      return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$10(+_), area) : y1;
	    };

	    area.lineX0 = area.lineY0 = function () {
	      return arealine().x(x0).y(y0);
	    };

	    area.lineY1 = function () {
	      return arealine().x(x0).y(y1);
	    };

	    area.lineX1 = function () {
	      return arealine().x(x1).y(y0);
	    };

	    area.defined = function (_) {
	      return arguments.length ? (defined = typeof _ === "function" ? _ : constant$10(!!_), area) : defined;
	    };

	    area.curve = function (_) {
	      return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
	    };

	    area.context = function (_) {
	      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
	    };

	    return area;
	  };

	  var descending$1 = function descending$1(a, b) {
	    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	  };

	  var identity$7 = function identity$7(d) {
	    return d;
	  };

	  var pie = function pie() {
	    var value = identity$7,
	        sortValues = descending$1,
	        sort = null,
	        startAngle = constant$10(0),
	        endAngle = constant$10(tau$4),
	        padAngle = constant$10(0);

	    function pie(data) {
	      var i,
	          n = data.length,
	          j,
	          k,
	          sum = 0,
	          index = new Array(n),
	          arcs = new Array(n),
	          a0 = +startAngle.apply(this, arguments),
	          da = Math.min(tau$4, Math.max(-tau$4, endAngle.apply(this, arguments) - a0)),
	          a1,
	          p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
	          pa = p * (da < 0 ? -1 : 1),
	          v;

	      for (i = 0; i < n; ++i) {
	        if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
	          sum += v;
	        }
	      }

	      // Optionally sort the arcs by previously-computed values or by data.
	      if (sortValues != null) index.sort(function (i, j) {
	        return sortValues(arcs[i], arcs[j]);
	      });else if (sort != null) index.sort(function (i, j) {
	        return sort(data[i], data[j]);
	      });

	      // Compute the arcs! They are stored in the original data's order.
	      for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
	        j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
	          data: data[j],
	          index: i,
	          value: v,
	          startAngle: a0,
	          endAngle: a1,
	          padAngle: p
	        };
	      }

	      return arcs;
	    }

	    pie.value = function (_) {
	      return arguments.length ? (value = typeof _ === "function" ? _ : constant$10(+_), pie) : value;
	    };

	    pie.sortValues = function (_) {
	      return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
	    };

	    pie.sort = function (_) {
	      return arguments.length ? (sort = _, sortValues = null, pie) : sort;
	    };

	    pie.startAngle = function (_) {
	      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$10(+_), pie) : startAngle;
	    };

	    pie.endAngle = function (_) {
	      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$10(+_), pie) : endAngle;
	    };

	    pie.padAngle = function (_) {
	      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$10(+_), pie) : padAngle;
	    };

	    return pie;
	  };

	  var curveRadialLinear = curveRadial(curveLinear);

	  function Radial(curve) {
	    this._curve = curve;
	  }

	  Radial.prototype = {
	    areaStart: function areaStart() {
	      this._curve.areaStart();
	    },
	    areaEnd: function areaEnd() {
	      this._curve.areaEnd();
	    },
	    lineStart: function lineStart() {
	      this._curve.lineStart();
	    },
	    lineEnd: function lineEnd() {
	      this._curve.lineEnd();
	    },
	    point: function point(a, r) {
	      this._curve.point(r * Math.sin(a), r * -Math.cos(a));
	    }
	  };

	  function curveRadial(curve) {

	    function radial(context) {
	      return new Radial(curve(context));
	    }

	    radial._curve = curve;

	    return radial;
	  }

	  function lineRadial(l) {
	    var c = l.curve;

	    l.angle = l.x, delete l.x;
	    l.radius = l.y, delete l.y;

	    l.curve = function (_) {
	      return arguments.length ? c(curveRadial(_)) : c()._curve;
	    };

	    return l;
	  }

	  var lineRadial$1 = function lineRadial$1() {
	    return lineRadial(line().curve(curveRadialLinear));
	  };

	  var areaRadial = function areaRadial() {
	    var a = area$2().curve(curveRadialLinear),
	        c = a.curve,
	        x0 = a.lineX0,
	        x1 = a.lineX1,
	        y0 = a.lineY0,
	        y1 = a.lineY1;

	    a.angle = a.x, delete a.x;
	    a.startAngle = a.x0, delete a.x0;
	    a.endAngle = a.x1, delete a.x1;
	    a.radius = a.y, delete a.y;
	    a.innerRadius = a.y0, delete a.y0;
	    a.outerRadius = a.y1, delete a.y1;
	    a.lineStartAngle = function () {
	      return lineRadial(x0());
	    }, delete a.lineX0;
	    a.lineEndAngle = function () {
	      return lineRadial(x1());
	    }, delete a.lineX1;
	    a.lineInnerRadius = function () {
	      return lineRadial(y0());
	    }, delete a.lineY0;
	    a.lineOuterRadius = function () {
	      return lineRadial(y1());
	    }, delete a.lineY1;

	    a.curve = function (_) {
	      return arguments.length ? c(curveRadial(_)) : c()._curve;
	    };

	    return a;
	  };

	  var pointRadial = function pointRadial(x, y) {
	    return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
	  };

	  var slice$6 = Array.prototype.slice;

	  function linkSource(d) {
	    return d.source;
	  }

	  function linkTarget(d) {
	    return d.target;
	  }

	  function link$2(curve) {
	    var source = linkSource,
	        target = linkTarget,
	        x = x$3,
	        y = y$3,
	        context = null;

	    function link() {
	      var buffer,
	          argv = slice$6.call(arguments),
	          s = source.apply(this, argv),
	          t = target.apply(this, argv);
	      if (!context) context = buffer = path();
	      curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
	      if (buffer) return context = null, buffer + "" || null;
	    }

	    link.source = function (_) {
	      return arguments.length ? (source = _, link) : source;
	    };

	    link.target = function (_) {
	      return arguments.length ? (target = _, link) : target;
	    };

	    link.x = function (_) {
	      return arguments.length ? (x = typeof _ === "function" ? _ : constant$10(+_), link) : x;
	    };

	    link.y = function (_) {
	      return arguments.length ? (y = typeof _ === "function" ? _ : constant$10(+_), link) : y;
	    };

	    link.context = function (_) {
	      return arguments.length ? (context = _ == null ? null : _, link) : context;
	    };

	    return link;
	  }

	  function curveHorizontal(context, x0, y0, x1, y1) {
	    context.moveTo(x0, y0);
	    context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
	  }

	  function curveVertical(context, x0, y0, x1, y1) {
	    context.moveTo(x0, y0);
	    context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
	  }

	  function curveRadial$1(context, x0, y0, x1, y1) {
	    var p0 = pointRadial(x0, y0),
	        p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
	        p2 = pointRadial(x1, y0),
	        p3 = pointRadial(x1, y1);
	    context.moveTo(p0[0], p0[1]);
	    context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
	  }

	  function linkHorizontal() {
	    return link$2(curveHorizontal);
	  }

	  function linkVertical() {
	    return link$2(curveVertical);
	  }

	  function linkRadial() {
	    var l = link$2(curveRadial$1);
	    l.angle = l.x, delete l.x;
	    l.radius = l.y, delete l.y;
	    return l;
	  }

	  var circle$2 = {
	    draw: function draw(context, size) {
	      var r = Math.sqrt(size / pi$4);
	      context.moveTo(r, 0);
	      context.arc(0, 0, r, 0, tau$4);
	    }
	  };

	  var cross$2 = {
	    draw: function draw(context, size) {
	      var r = Math.sqrt(size / 5) / 2;
	      context.moveTo(-3 * r, -r);
	      context.lineTo(-r, -r);
	      context.lineTo(-r, -3 * r);
	      context.lineTo(r, -3 * r);
	      context.lineTo(r, -r);
	      context.lineTo(3 * r, -r);
	      context.lineTo(3 * r, r);
	      context.lineTo(r, r);
	      context.lineTo(r, 3 * r);
	      context.lineTo(-r, 3 * r);
	      context.lineTo(-r, r);
	      context.lineTo(-3 * r, r);
	      context.closePath();
	    }
	  };

	  var tan30 = Math.sqrt(1 / 3);
	  var tan30_2 = tan30 * 2;

	  var diamond = {
	    draw: function draw(context, size) {
	      var y = Math.sqrt(size / tan30_2),
	          x = y * tan30;
	      context.moveTo(0, -y);
	      context.lineTo(x, 0);
	      context.lineTo(0, y);
	      context.lineTo(-x, 0);
	      context.closePath();
	    }
	  };

	  var ka = 0.89081309152928522810;
	  var kr = Math.sin(pi$4 / 10) / Math.sin(7 * pi$4 / 10);
	  var kx = Math.sin(tau$4 / 10) * kr;
	  var ky = -Math.cos(tau$4 / 10) * kr;

	  var star = {
	    draw: function draw(context, size) {
	      var r = Math.sqrt(size * ka),
	          x = kx * r,
	          y = ky * r;
	      context.moveTo(0, -r);
	      context.lineTo(x, y);
	      for (var i = 1; i < 5; ++i) {
	        var a = tau$4 * i / 5,
	            c = Math.cos(a),
	            s = Math.sin(a);
	        context.lineTo(s * r, -c * r);
	        context.lineTo(c * x - s * y, s * x + c * y);
	      }
	      context.closePath();
	    }
	  };

	  var square = {
	    draw: function draw(context, size) {
	      var w = Math.sqrt(size),
	          x = -w / 2;
	      context.rect(x, x, w, w);
	    }
	  };

	  var sqrt3 = Math.sqrt(3);

	  var triangle = {
	    draw: function draw(context, size) {
	      var y = -Math.sqrt(size / (sqrt3 * 3));
	      context.moveTo(0, y * 2);
	      context.lineTo(-sqrt3 * y, -y);
	      context.lineTo(sqrt3 * y, -y);
	      context.closePath();
	    }
	  };

	  var c = -0.5;
	  var s = Math.sqrt(3) / 2;
	  var k = 1 / Math.sqrt(12);
	  var a = (k / 2 + 1) * 3;

	  var wye = {
	    draw: function draw(context, size) {
	      var r = Math.sqrt(size / a),
	          x0 = r / 2,
	          y0 = r * k,
	          x1 = x0,
	          y1 = r * k + r,
	          x2 = -x1,
	          y2 = y1;
	      context.moveTo(x0, y0);
	      context.lineTo(x1, y1);
	      context.lineTo(x2, y2);
	      context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
	      context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
	      context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
	      context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
	      context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
	      context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
	      context.closePath();
	    }
	  };

	  var symbols = [circle$2, cross$2, diamond, square, star, triangle, wye];

	  var symbol = function symbol() {
	    var type = constant$10(circle$2),
	        size = constant$10(64),
	        context = null;

	    function symbol() {
	      var buffer;
	      if (!context) context = buffer = path();
	      type.apply(this, arguments).draw(context, +size.apply(this, arguments));
	      if (buffer) return context = null, buffer + "" || null;
	    }

	    symbol.type = function (_) {
	      return arguments.length ? (type = typeof _ === "function" ? _ : constant$10(_), symbol) : type;
	    };

	    symbol.size = function (_) {
	      return arguments.length ? (size = typeof _ === "function" ? _ : constant$10(+_), symbol) : size;
	    };

	    symbol.context = function (_) {
	      return arguments.length ? (context = _ == null ? null : _, symbol) : context;
	    };

	    return symbol;
	  };

	  var noop$2 = function noop$2() {};

	  function point$2(that, x, y) {
	    that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x) / 6, (that._y0 + 4 * that._y1 + y) / 6);
	  }

	  function Basis(context) {
	    this._context = context;
	  }

	  Basis.prototype = {
	    areaStart: function areaStart() {
	      this._line = 0;
	    },
	    areaEnd: function areaEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._x0 = this._x1 = this._y0 = this._y1 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      switch (this._point) {
	        case 3:
	          point$2(this, this._x1, this._y1); // proceed
	        case 2:
	          this._context.lineTo(this._x1, this._y1);break;
	      }
	      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0:
	          this._point = 1;this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);break;
	        case 1:
	          this._point = 2;break;
	        case 2:
	          this._point = 3;this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
	        default:
	          point$2(this, x, y);break;
	      }
	      this._x0 = this._x1, this._x1 = x;
	      this._y0 = this._y1, this._y1 = y;
	    }
	  };

	  var basis$2 = function basis$2(context) {
	    return new Basis(context);
	  };

	  function BasisClosed(context) {
	    this._context = context;
	  }

	  BasisClosed.prototype = {
	    areaStart: noop$2,
	    areaEnd: noop$2,
	    lineStart: function lineStart() {
	      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      switch (this._point) {
	        case 1:
	          {
	            this._context.moveTo(this._x2, this._y2);
	            this._context.closePath();
	            break;
	          }
	        case 2:
	          {
	            this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
	            this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
	            this._context.closePath();
	            break;
	          }
	        case 3:
	          {
	            this.point(this._x2, this._y2);
	            this.point(this._x3, this._y3);
	            this.point(this._x4, this._y4);
	            break;
	          }
	      }
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0:
	          this._point = 1;this._x2 = x, this._y2 = y;break;
	        case 1:
	          this._point = 2;this._x3 = x, this._y3 = y;break;
	        case 2:
	          this._point = 3;this._x4 = x, this._y4 = y;this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);break;
	        default:
	          point$2(this, x, y);break;
	      }
	      this._x0 = this._x1, this._x1 = x;
	      this._y0 = this._y1, this._y1 = y;
	    }
	  };

	  var basisClosed$1 = function basisClosed$1(context) {
	    return new BasisClosed(context);
	  };

	  function BasisOpen(context) {
	    this._context = context;
	  }

	  BasisOpen.prototype = {
	    areaStart: function areaStart() {
	      this._line = 0;
	    },
	    areaEnd: function areaEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._x0 = this._x1 = this._y0 = this._y1 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0:
	          this._point = 1;break;
	        case 1:
	          this._point = 2;break;
	        case 2:
	          this._point = 3;var x0 = (this._x0 + 4 * this._x1 + x) / 6,
	              y0 = (this._y0 + 4 * this._y1 + y) / 6;this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);break;
	        case 3:
	          this._point = 4; // proceed
	        default:
	          point$2(this, x, y);break;
	      }
	      this._x0 = this._x1, this._x1 = x;
	      this._y0 = this._y1, this._y1 = y;
	    }
	  };

	  var basisOpen = function basisOpen(context) {
	    return new BasisOpen(context);
	  };

	  function Bundle(context, beta) {
	    this._basis = new Basis(context);
	    this._beta = beta;
	  }

	  Bundle.prototype = {
	    lineStart: function lineStart() {
	      this._x = [];
	      this._y = [];
	      this._basis.lineStart();
	    },
	    lineEnd: function lineEnd() {
	      var x = this._x,
	          y = this._y,
	          j = x.length - 1;

	      if (j > 0) {
	        var x0 = x[0],
	            y0 = y[0],
	            dx = x[j] - x0,
	            dy = y[j] - y0,
	            i = -1,
	            t;

	        while (++i <= j) {
	          t = i / j;
	          this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
	        }
	      }

	      this._x = this._y = null;
	      this._basis.lineEnd();
	    },
	    point: function point(x, y) {
	      this._x.push(+x);
	      this._y.push(+y);
	    }
	  };

	  var bundle = function custom(beta) {

	    function bundle(context) {
	      return beta === 1 ? new Basis(context) : new Bundle(context, beta);
	    }

	    bundle.beta = function (beta) {
	      return custom(+beta);
	    };

	    return bundle;
	  }(0.85);

	  function point$3(that, x, y) {
	    that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x), that._y2 + that._k * (that._y1 - y), that._x2, that._y2);
	  }

	  function Cardinal(context, tension) {
	    this._context = context;
	    this._k = (1 - tension) / 6;
	  }

	  Cardinal.prototype = {
	    areaStart: function areaStart() {
	      this._line = 0;
	    },
	    areaEnd: function areaEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      switch (this._point) {
	        case 2:
	          this._context.lineTo(this._x2, this._y2);break;
	        case 3:
	          point$3(this, this._x1, this._y1);break;
	      }
	      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0:
	          this._point = 1;this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);break;
	        case 1:
	          this._point = 2;this._x1 = x, this._y1 = y;break;
	        case 2:
	          this._point = 3; // proceed
	        default:
	          point$3(this, x, y);break;
	      }
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };

	  var cardinal = function custom(tension) {

	    function cardinal(context) {
	      return new Cardinal(context, tension);
	    }

	    cardinal.tension = function (tension) {
	      return custom(+tension);
	    };

	    return cardinal;
	  }(0);

	  function CardinalClosed(context, tension) {
	    this._context = context;
	    this._k = (1 - tension) / 6;
	  }

	  CardinalClosed.prototype = {
	    areaStart: noop$2,
	    areaEnd: noop$2,
	    lineStart: function lineStart() {
	      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      switch (this._point) {
	        case 1:
	          {
	            this._context.moveTo(this._x3, this._y3);
	            this._context.closePath();
	            break;
	          }
	        case 2:
	          {
	            this._context.lineTo(this._x3, this._y3);
	            this._context.closePath();
	            break;
	          }
	        case 3:
	          {
	            this.point(this._x3, this._y3);
	            this.point(this._x4, this._y4);
	            this.point(this._x5, this._y5);
	            break;
	          }
	      }
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0:
	          this._point = 1;this._x3 = x, this._y3 = y;break;
	        case 1:
	          this._point = 2;this._context.moveTo(this._x4 = x, this._y4 = y);break;
	        case 2:
	          this._point = 3;this._x5 = x, this._y5 = y;break;
	        default:
	          point$3(this, x, y);break;
	      }
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };

	  var cardinalClosed = function custom(tension) {

	    function cardinal$$1(context) {
	      return new CardinalClosed(context, tension);
	    }

	    cardinal$$1.tension = function (tension) {
	      return custom(+tension);
	    };

	    return cardinal$$1;
	  }(0);

	  function CardinalOpen(context, tension) {
	    this._context = context;
	    this._k = (1 - tension) / 6;
	  }

	  CardinalOpen.prototype = {
	    areaStart: function areaStart() {
	      this._line = 0;
	    },
	    areaEnd: function areaEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0:
	          this._point = 1;break;
	        case 1:
	          this._point = 2;break;
	        case 2:
	          this._point = 3;this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);break;
	        case 3:
	          this._point = 4; // proceed
	        default:
	          point$3(this, x, y);break;
	      }
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };

	  var cardinalOpen = function custom(tension) {

	    function cardinal$$1(context) {
	      return new CardinalOpen(context, tension);
	    }

	    cardinal$$1.tension = function (tension) {
	      return custom(+tension);
	    };

	    return cardinal$$1;
	  }(0);

	  function point$4(that, x, y) {
	    var x1 = that._x1,
	        y1 = that._y1,
	        x2 = that._x2,
	        y2 = that._y2;

	    if (that._l01_a > epsilon$3) {
	      var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
	          n = 3 * that._l01_a * (that._l01_a + that._l12_a);
	      x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
	      y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
	    }

	    if (that._l23_a > epsilon$3) {
	      var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
	          m = 3 * that._l23_a * (that._l23_a + that._l12_a);
	      x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
	      y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
	    }

	    that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
	  }

	  function CatmullRom(context, alpha) {
	    this._context = context;
	    this._alpha = alpha;
	  }

	  CatmullRom.prototype = {
	    areaStart: function areaStart() {
	      this._line = 0;
	    },
	    areaEnd: function areaEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
	      this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      switch (this._point) {
	        case 2:
	          this._context.lineTo(this._x2, this._y2);break;
	        case 3:
	          this.point(this._x2, this._y2);break;
	      }
	      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;

	      if (this._point) {
	        var x23 = this._x2 - x,
	            y23 = this._y2 - y;
	        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	      }

	      switch (this._point) {
	        case 0:
	          this._point = 1;this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);break;
	        case 1:
	          this._point = 2;break;
	        case 2:
	          this._point = 3; // proceed
	        default:
	          point$4(this, x, y);break;
	      }

	      this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	      this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };

	  var catmullRom = function custom(alpha) {

	    function catmullRom(context) {
	      return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
	    }

	    catmullRom.alpha = function (alpha) {
	      return custom(+alpha);
	    };

	    return catmullRom;
	  }(0.5);

	  function CatmullRomClosed(context, alpha) {
	    this._context = context;
	    this._alpha = alpha;
	  }

	  CatmullRomClosed.prototype = {
	    areaStart: noop$2,
	    areaEnd: noop$2,
	    lineStart: function lineStart() {
	      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	      this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      switch (this._point) {
	        case 1:
	          {
	            this._context.moveTo(this._x3, this._y3);
	            this._context.closePath();
	            break;
	          }
	        case 2:
	          {
	            this._context.lineTo(this._x3, this._y3);
	            this._context.closePath();
	            break;
	          }
	        case 3:
	          {
	            this.point(this._x3, this._y3);
	            this.point(this._x4, this._y4);
	            this.point(this._x5, this._y5);
	            break;
	          }
	      }
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;

	      if (this._point) {
	        var x23 = this._x2 - x,
	            y23 = this._y2 - y;
	        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	      }

	      switch (this._point) {
	        case 0:
	          this._point = 1;this._x3 = x, this._y3 = y;break;
	        case 1:
	          this._point = 2;this._context.moveTo(this._x4 = x, this._y4 = y);break;
	        case 2:
	          this._point = 3;this._x5 = x, this._y5 = y;break;
	        default:
	          point$4(this, x, y);break;
	      }

	      this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	      this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };

	  var catmullRomClosed = function custom(alpha) {

	    function catmullRom$$1(context) {
	      return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
	    }

	    catmullRom$$1.alpha = function (alpha) {
	      return custom(+alpha);
	    };

	    return catmullRom$$1;
	  }(0.5);

	  function CatmullRomOpen(context, alpha) {
	    this._context = context;
	    this._alpha = alpha;
	  }

	  CatmullRomOpen.prototype = {
	    areaStart: function areaStart() {
	      this._line = 0;
	    },
	    areaEnd: function areaEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
	      this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;

	      if (this._point) {
	        var x23 = this._x2 - x,
	            y23 = this._y2 - y;
	        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	      }

	      switch (this._point) {
	        case 0:
	          this._point = 1;break;
	        case 1:
	          this._point = 2;break;
	        case 2:
	          this._point = 3;this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);break;
	        case 3:
	          this._point = 4; // proceed
	        default:
	          point$4(this, x, y);break;
	      }

	      this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	      this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	    }
	  };

	  var catmullRomOpen = function custom(alpha) {

	    function catmullRom$$1(context) {
	      return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
	    }

	    catmullRom$$1.alpha = function (alpha) {
	      return custom(+alpha);
	    };

	    return catmullRom$$1;
	  }(0.5);

	  function LinearClosed(context) {
	    this._context = context;
	  }

	  LinearClosed.prototype = {
	    areaStart: noop$2,
	    areaEnd: noop$2,
	    lineStart: function lineStart() {
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      if (this._point) this._context.closePath();
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;
	      if (this._point) this._context.lineTo(x, y);else this._point = 1, this._context.moveTo(x, y);
	    }
	  };

	  var linearClosed = function linearClosed(context) {
	    return new LinearClosed(context);
	  };

	  function sign$1(x) {
	    return x < 0 ? -1 : 1;
	  }

	  // Calculate the slopes of the tangents (Hermite-type interpolation) based on
	  // the following paper: Steffen, M. 1990. A Simple Method for Monotonic
	  // Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
	  // NOV(II), P. 443, 1990.
	  function slope3(that, x2, y2) {
	    var h0 = that._x1 - that._x0,
	        h1 = x2 - that._x1,
	        s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
	        s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
	        p = (s0 * h1 + s1 * h0) / (h0 + h1);
	    return (sign$1(s0) + sign$1(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
	  }

	  // Calculate a one-sided slope.
	  function slope2(that, t) {
	    var h = that._x1 - that._x0;
	    return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
	  }

	  // According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
	  // "you can express cubic Hermite interpolation in terms of cubic Bézier curves
	  // with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
	  function point$5(that, t0, t1) {
	    var x0 = that._x0,
	        y0 = that._y0,
	        x1 = that._x1,
	        y1 = that._y1,
	        dx = (x1 - x0) / 3;
	    that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
	  }

	  function MonotoneX(context) {
	    this._context = context;
	  }

	  MonotoneX.prototype = {
	    areaStart: function areaStart() {
	      this._line = 0;
	    },
	    areaEnd: function areaEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      switch (this._point) {
	        case 2:
	          this._context.lineTo(this._x1, this._y1);break;
	        case 3:
	          point$5(this, this._t0, slope2(this, this._t0));break;
	      }
	      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
	      this._line = 1 - this._line;
	    },
	    point: function point(x, y) {
	      var t1 = NaN;

	      x = +x, y = +y;
	      if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
	      switch (this._point) {
	        case 0:
	          this._point = 1;this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);break;
	        case 1:
	          this._point = 2;break;
	        case 2:
	          this._point = 3;point$5(this, slope2(this, t1 = slope3(this, x, y)), t1);break;
	        default:
	          point$5(this, this._t0, t1 = slope3(this, x, y));break;
	      }

	      this._x0 = this._x1, this._x1 = x;
	      this._y0 = this._y1, this._y1 = y;
	      this._t0 = t1;
	    }
	  };

	  function MonotoneY(context) {
	    this._context = new ReflectContext(context);
	  }

	  (MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function (x, y) {
	    MonotoneX.prototype.point.call(this, y, x);
	  };

	  function ReflectContext(context) {
	    this._context = context;
	  }

	  ReflectContext.prototype = {
	    moveTo: function moveTo(x, y) {
	      this._context.moveTo(y, x);
	    },
	    closePath: function closePath() {
	      this._context.closePath();
	    },
	    lineTo: function lineTo(x, y) {
	      this._context.lineTo(y, x);
	    },
	    bezierCurveTo: function bezierCurveTo(x1, y1, x2, y2, x, y) {
	      this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
	    }
	  };

	  function monotoneX(context) {
	    return new MonotoneX(context);
	  }

	  function monotoneY(context) {
	    return new MonotoneY(context);
	  }

	  function Natural(context) {
	    this._context = context;
	  }

	  Natural.prototype = {
	    areaStart: function areaStart() {
	      this._line = 0;
	    },
	    areaEnd: function areaEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._x = [];
	      this._y = [];
	    },
	    lineEnd: function lineEnd() {
	      var x = this._x,
	          y = this._y,
	          n = x.length;

	      if (n) {
	        this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
	        if (n === 2) {
	          this._context.lineTo(x[1], y[1]);
	        } else {
	          var px = controlPoints(x),
	              py = controlPoints(y);
	          for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
	            this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
	          }
	        }
	      }

	      if (this._line || this._line !== 0 && n === 1) this._context.closePath();
	      this._line = 1 - this._line;
	      this._x = this._y = null;
	    },
	    point: function point(x, y) {
	      this._x.push(+x);
	      this._y.push(+y);
	    }
	  };

	  // See https://www.particleincell.com/2012/bezier-splines/ for derivation.
	  function controlPoints(x) {
	    var i,
	        n = x.length - 1,
	        m,
	        a = new Array(n),
	        b = new Array(n),
	        r = new Array(n);
	    a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
	    for (i = 1; i < n - 1; ++i) {
	      a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
	    }a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
	    for (i = 1; i < n; ++i) {
	      m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
	    }a[n - 1] = r[n - 1] / b[n - 1];
	    for (i = n - 2; i >= 0; --i) {
	      a[i] = (r[i] - a[i + 1]) / b[i];
	    }b[n - 1] = (x[n] + a[n - 1]) / 2;
	    for (i = 0; i < n - 1; ++i) {
	      b[i] = 2 * x[i + 1] - a[i + 1];
	    }return [a, b];
	  }

	  var natural = function natural(context) {
	    return new Natural(context);
	  };

	  function Step(context, t) {
	    this._context = context;
	    this._t = t;
	  }

	  Step.prototype = {
	    areaStart: function areaStart() {
	      this._line = 0;
	    },
	    areaEnd: function areaEnd() {
	      this._line = NaN;
	    },
	    lineStart: function lineStart() {
	      this._x = this._y = NaN;
	      this._point = 0;
	    },
	    lineEnd: function lineEnd() {
	      if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
	      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
	      if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
	    },
	    point: function point(x, y) {
	      x = +x, y = +y;
	      switch (this._point) {
	        case 0:
	          this._point = 1;this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);break;
	        case 1:
	          this._point = 2; // proceed
	        default:
	          {
	            if (this._t <= 0) {
	              this._context.lineTo(this._x, y);
	              this._context.lineTo(x, y);
	            } else {
	              var x1 = this._x * (1 - this._t) + x * this._t;
	              this._context.lineTo(x1, this._y);
	              this._context.lineTo(x1, y);
	            }
	            break;
	          }
	      }
	      this._x = x, this._y = y;
	    }
	  };

	  var step = function step(context) {
	    return new Step(context, 0.5);
	  };

	  function stepBefore(context) {
	    return new Step(context, 0);
	  }

	  function stepAfter(context) {
	    return new Step(context, 1);
	  }

	  var none$1 = function none$1(series, order) {
	    if (!((n = series.length) > 1)) return;
	    for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
	      s0 = s1, s1 = series[order[i]];
	      for (j = 0; j < m; ++j) {
	        s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
	      }
	    }
	  };

	  var none$2 = function none$2(series) {
	    var n = series.length,
	        o = new Array(n);
	    while (--n >= 0) {
	      o[n] = n;
	    }return o;
	  };

	  function stackValue(d, key) {
	    return d[key];
	  }

	  var stack = function stack() {
	    var keys = constant$10([]),
	        order = none$2,
	        offset = none$1,
	        value = stackValue;

	    function stack(data) {
	      var kz = keys.apply(this, arguments),
	          i,
	          m = data.length,
	          n = kz.length,
	          sz = new Array(n),
	          oz;

	      for (i = 0; i < n; ++i) {
	        for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
	          si[j] = sij = [0, +value(data[j], ki, j, data)];
	          sij.data = data[j];
	        }
	        si.key = ki;
	      }

	      for (i = 0, oz = order(sz); i < n; ++i) {
	        sz[oz[i]].index = i;
	      }

	      offset(sz, oz);
	      return sz;
	    }

	    stack.keys = function (_) {
	      return arguments.length ? (keys = typeof _ === "function" ? _ : constant$10(slice$6.call(_)), stack) : keys;
	    };

	    stack.value = function (_) {
	      return arguments.length ? (value = typeof _ === "function" ? _ : constant$10(+_), stack) : value;
	    };

	    stack.order = function (_) {
	      return arguments.length ? (order = _ == null ? none$2 : typeof _ === "function" ? _ : constant$10(slice$6.call(_)), stack) : order;
	    };

	    stack.offset = function (_) {
	      return arguments.length ? (offset = _ == null ? none$1 : _, stack) : offset;
	    };

	    return stack;
	  };

	  var expand = function expand(series, order) {
	    if (!((n = series.length) > 0)) return;
	    for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
	      for (y = i = 0; i < n; ++i) {
	        y += series[i][j][1] || 0;
	      }if (y) for (i = 0; i < n; ++i) {
	        series[i][j][1] /= y;
	      }
	    }
	    none$1(series, order);
	  };

	  var diverging = function diverging(series, order) {
	    if (!((n = series.length) > 1)) return;
	    for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
	      for (yp = yn = 0, i = 0; i < n; ++i) {
	        if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
	          d[0] = yp, d[1] = yp += dy;
	        } else if (dy < 0) {
	          d[1] = yn, d[0] = yn += dy;
	        } else {
	          d[0] = yp;
	        }
	      }
	    }
	  };

	  var silhouette = function silhouette(series, order) {
	    if (!((n = series.length) > 0)) return;
	    for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
	      for (var i = 0, y = 0; i < n; ++i) {
	        y += series[i][j][1] || 0;
	      }s0[j][1] += s0[j][0] = -y / 2;
	    }
	    none$1(series, order);
	  };

	  var wiggle = function wiggle(series, order) {
	    if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
	    for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
	      for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
	        var si = series[order[i]],
	            sij0 = si[j][1] || 0,
	            sij1 = si[j - 1][1] || 0,
	            s3 = (sij0 - sij1) / 2;
	        for (var k = 0; k < i; ++k) {
	          var sk = series[order[k]],
	              skj0 = sk[j][1] || 0,
	              skj1 = sk[j - 1][1] || 0;
	          s3 += skj0 - skj1;
	        }
	        s1 += sij0, s2 += s3 * sij0;
	      }
	      s0[j - 1][1] += s0[j - 1][0] = y;
	      if (s1) y -= s2 / s1;
	    }
	    s0[j - 1][1] += s0[j - 1][0] = y;
	    none$1(series, order);
	  };

	  var ascending$2 = function ascending$2(series) {
	    var sums = series.map(sum$2);
	    return none$2(series).sort(function (a, b) {
	      return sums[a] - sums[b];
	    });
	  };

	  function sum$2(series) {
	    var s = 0,
	        i = -1,
	        n = series.length,
	        v;
	    while (++i < n) {
	      if (v = +series[i][1]) s += v;
	    }return s;
	  }

	  var descending$2 = function descending$2(series) {
	    return ascending$2(series).reverse();
	  };

	  var insideOut = function insideOut(series) {
	    var n = series.length,
	        i,
	        j,
	        sums = series.map(sum$2),
	        order = none$2(series).sort(function (a, b) {
	      return sums[b] - sums[a];
	    }),
	        top = 0,
	        bottom = 0,
	        tops = [],
	        bottoms = [];

	    for (i = 0; i < n; ++i) {
	      j = order[i];
	      if (top < bottom) {
	        top += sums[j];
	        tops.push(j);
	      } else {
	        bottom += sums[j];
	        bottoms.push(j);
	      }
	    }

	    return bottoms.reverse().concat(tops);
	  };

	  var reverse = function reverse(series) {
	    return none$2(series).reverse();
	  };

	  var constant$11 = function constant$11(x) {
	    return function () {
	      return x;
	    };
	  };

	  function x$4(d) {
	    return d[0];
	  }

	  function y$4(d) {
	    return d[1];
	  }

	  function RedBlackTree() {
	    this._ = null; // root node
	  }

	  function RedBlackNode(node) {
	    node.U = // parent node
	    node.C = // color - true for red, false for black
	    node.L = // left node
	    node.R = // right node
	    node.P = // previous node
	    node.N = null; // next node
	  }

	  RedBlackTree.prototype = {
	    constructor: RedBlackTree,

	    insert: function insert(after, node) {
	      var parent, grandpa, uncle;

	      if (after) {
	        node.P = after;
	        node.N = after.N;
	        if (after.N) after.N.P = node;
	        after.N = node;
	        if (after.R) {
	          after = after.R;
	          while (after.L) {
	            after = after.L;
	          }after.L = node;
	        } else {
	          after.R = node;
	        }
	        parent = after;
	      } else if (this._) {
	        after = RedBlackFirst(this._);
	        node.P = null;
	        node.N = after;
	        after.P = after.L = node;
	        parent = after;
	      } else {
	        node.P = node.N = null;
	        this._ = node;
	        parent = null;
	      }
	      node.L = node.R = null;
	      node.U = parent;
	      node.C = true;

	      after = node;
	      while (parent && parent.C) {
	        grandpa = parent.U;
	        if (parent === grandpa.L) {
	          uncle = grandpa.R;
	          if (uncle && uncle.C) {
	            parent.C = uncle.C = false;
	            grandpa.C = true;
	            after = grandpa;
	          } else {
	            if (after === parent.R) {
	              RedBlackRotateLeft(this, parent);
	              after = parent;
	              parent = after.U;
	            }
	            parent.C = false;
	            grandpa.C = true;
	            RedBlackRotateRight(this, grandpa);
	          }
	        } else {
	          uncle = grandpa.L;
	          if (uncle && uncle.C) {
	            parent.C = uncle.C = false;
	            grandpa.C = true;
	            after = grandpa;
	          } else {
	            if (after === parent.L) {
	              RedBlackRotateRight(this, parent);
	              after = parent;
	              parent = after.U;
	            }
	            parent.C = false;
	            grandpa.C = true;
	            RedBlackRotateLeft(this, grandpa);
	          }
	        }
	        parent = after.U;
	      }
	      this._.C = false;
	    },

	    remove: function remove(node) {
	      if (node.N) node.N.P = node.P;
	      if (node.P) node.P.N = node.N;
	      node.N = node.P = null;

	      var parent = node.U,
	          sibling,
	          left = node.L,
	          right = node.R,
	          next,
	          red;

	      if (!left) next = right;else if (!right) next = left;else next = RedBlackFirst(right);

	      if (parent) {
	        if (parent.L === node) parent.L = next;else parent.R = next;
	      } else {
	        this._ = next;
	      }

	      if (left && right) {
	        red = next.C;
	        next.C = node.C;
	        next.L = left;
	        left.U = next;
	        if (next !== right) {
	          parent = next.U;
	          next.U = node.U;
	          node = next.R;
	          parent.L = node;
	          next.R = right;
	          right.U = next;
	        } else {
	          next.U = parent;
	          parent = next;
	          node = next.R;
	        }
	      } else {
	        red = node.C;
	        node = next;
	      }

	      if (node) node.U = parent;
	      if (red) return;
	      if (node && node.C) {
	        node.C = false;return;
	      }

	      do {
	        if (node === this._) break;
	        if (node === parent.L) {
	          sibling = parent.R;
	          if (sibling.C) {
	            sibling.C = false;
	            parent.C = true;
	            RedBlackRotateLeft(this, parent);
	            sibling = parent.R;
	          }
	          if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
	            if (!sibling.R || !sibling.R.C) {
	              sibling.L.C = false;
	              sibling.C = true;
	              RedBlackRotateRight(this, sibling);
	              sibling = parent.R;
	            }
	            sibling.C = parent.C;
	            parent.C = sibling.R.C = false;
	            RedBlackRotateLeft(this, parent);
	            node = this._;
	            break;
	          }
	        } else {
	          sibling = parent.L;
	          if (sibling.C) {
	            sibling.C = false;
	            parent.C = true;
	            RedBlackRotateRight(this, parent);
	            sibling = parent.L;
	          }
	          if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
	            if (!sibling.L || !sibling.L.C) {
	              sibling.R.C = false;
	              sibling.C = true;
	              RedBlackRotateLeft(this, sibling);
	              sibling = parent.L;
	            }
	            sibling.C = parent.C;
	            parent.C = sibling.L.C = false;
	            RedBlackRotateRight(this, parent);
	            node = this._;
	            break;
	          }
	        }
	        sibling.C = true;
	        node = parent;
	        parent = parent.U;
	      } while (!node.C);

	      if (node) node.C = false;
	    }
	  };

	  function RedBlackRotateLeft(tree, node) {
	    var p = node,
	        q = node.R,
	        parent = p.U;

	    if (parent) {
	      if (parent.L === p) parent.L = q;else parent.R = q;
	    } else {
	      tree._ = q;
	    }

	    q.U = parent;
	    p.U = q;
	    p.R = q.L;
	    if (p.R) p.R.U = p;
	    q.L = p;
	  }

	  function RedBlackRotateRight(tree, node) {
	    var p = node,
	        q = node.L,
	        parent = p.U;

	    if (parent) {
	      if (parent.L === p) parent.L = q;else parent.R = q;
	    } else {
	      tree._ = q;
	    }

	    q.U = parent;
	    p.U = q;
	    p.L = q.R;
	    if (p.L) p.L.U = p;
	    q.R = p;
	  }

	  function RedBlackFirst(node) {
	    while (node.L) {
	      node = node.L;
	    }return node;
	  }

	  function createEdge(left, right, v0, v1) {
	    var edge = [null, null],
	        index = edges.push(edge) - 1;
	    edge.left = left;
	    edge.right = right;
	    if (v0) setEdgeEnd(edge, left, right, v0);
	    if (v1) setEdgeEnd(edge, right, left, v1);
	    cells[left.index].halfedges.push(index);
	    cells[right.index].halfedges.push(index);
	    return edge;
	  }

	  function createBorderEdge(left, v0, v1) {
	    var edge = [v0, v1];
	    edge.left = left;
	    return edge;
	  }

	  function setEdgeEnd(edge, left, right, vertex) {
	    if (!edge[0] && !edge[1]) {
	      edge[0] = vertex;
	      edge.left = left;
	      edge.right = right;
	    } else if (edge.left === right) {
	      edge[1] = vertex;
	    } else {
	      edge[0] = vertex;
	    }
	  }

	  // Liang–Barsky line clipping.
	  function clipEdge(edge, x0, y0, x1, y1) {
	    var a = edge[0],
	        b = edge[1],
	        ax = a[0],
	        ay = a[1],
	        bx = b[0],
	        by = b[1],
	        t0 = 0,
	        t1 = 1,
	        dx = bx - ax,
	        dy = by - ay,
	        r;

	    r = x0 - ax;
	    if (!dx && r > 0) return;
	    r /= dx;
	    if (dx < 0) {
	      if (r < t0) return;
	      if (r < t1) t1 = r;
	    } else if (dx > 0) {
	      if (r > t1) return;
	      if (r > t0) t0 = r;
	    }

	    r = x1 - ax;
	    if (!dx && r < 0) return;
	    r /= dx;
	    if (dx < 0) {
	      if (r > t1) return;
	      if (r > t0) t0 = r;
	    } else if (dx > 0) {
	      if (r < t0) return;
	      if (r < t1) t1 = r;
	    }

	    r = y0 - ay;
	    if (!dy && r > 0) return;
	    r /= dy;
	    if (dy < 0) {
	      if (r < t0) return;
	      if (r < t1) t1 = r;
	    } else if (dy > 0) {
	      if (r > t1) return;
	      if (r > t0) t0 = r;
	    }

	    r = y1 - ay;
	    if (!dy && r < 0) return;
	    r /= dy;
	    if (dy < 0) {
	      if (r > t1) return;
	      if (r > t0) t0 = r;
	    } else if (dy > 0) {
	      if (r < t0) return;
	      if (r < t1) t1 = r;
	    }

	    if (!(t0 > 0) && !(t1 < 1)) return true; // TODO Better check?

	    if (t0 > 0) edge[0] = [ax + t0 * dx, ay + t0 * dy];
	    if (t1 < 1) edge[1] = [ax + t1 * dx, ay + t1 * dy];
	    return true;
	  }

	  function connectEdge(edge, x0, y0, x1, y1) {
	    var v1 = edge[1];
	    if (v1) return true;

	    var v0 = edge[0],
	        left = edge.left,
	        right = edge.right,
	        lx = left[0],
	        ly = left[1],
	        rx = right[0],
	        ry = right[1],
	        fx = (lx + rx) / 2,
	        fy = (ly + ry) / 2,
	        fm,
	        fb;

	    if (ry === ly) {
	      if (fx < x0 || fx >= x1) return;
	      if (lx > rx) {
	        if (!v0) v0 = [fx, y0];else if (v0[1] >= y1) return;
	        v1 = [fx, y1];
	      } else {
	        if (!v0) v0 = [fx, y1];else if (v0[1] < y0) return;
	        v1 = [fx, y0];
	      }
	    } else {
	      fm = (lx - rx) / (ry - ly);
	      fb = fy - fm * fx;
	      if (fm < -1 || fm > 1) {
	        if (lx > rx) {
	          if (!v0) v0 = [(y0 - fb) / fm, y0];else if (v0[1] >= y1) return;
	          v1 = [(y1 - fb) / fm, y1];
	        } else {
	          if (!v0) v0 = [(y1 - fb) / fm, y1];else if (v0[1] < y0) return;
	          v1 = [(y0 - fb) / fm, y0];
	        }
	      } else {
	        if (ly < ry) {
	          if (!v0) v0 = [x0, fm * x0 + fb];else if (v0[0] >= x1) return;
	          v1 = [x1, fm * x1 + fb];
	        } else {
	          if (!v0) v0 = [x1, fm * x1 + fb];else if (v0[0] < x0) return;
	          v1 = [x0, fm * x0 + fb];
	        }
	      }
	    }

	    edge[0] = v0;
	    edge[1] = v1;
	    return true;
	  }

	  function clipEdges(x0, y0, x1, y1) {
	    var i = edges.length,
	        edge;

	    while (i--) {
	      if (!connectEdge(edge = edges[i], x0, y0, x1, y1) || !clipEdge(edge, x0, y0, x1, y1) || !(Math.abs(edge[0][0] - edge[1][0]) > epsilon$4 || Math.abs(edge[0][1] - edge[1][1]) > epsilon$4)) {
	        delete edges[i];
	      }
	    }
	  }

	  function createCell(site) {
	    return cells[site.index] = {
	      site: site,
	      halfedges: []
	    };
	  }

	  function cellHalfedgeAngle(cell, edge) {
	    var site = cell.site,
	        va = edge.left,
	        vb = edge.right;
	    if (site === vb) vb = va, va = site;
	    if (vb) return Math.atan2(vb[1] - va[1], vb[0] - va[0]);
	    if (site === va) va = edge[1], vb = edge[0];else va = edge[0], vb = edge[1];
	    return Math.atan2(va[0] - vb[0], vb[1] - va[1]);
	  }

	  function cellHalfedgeStart(cell, edge) {
	    return edge[+(edge.left !== cell.site)];
	  }

	  function cellHalfedgeEnd(cell, edge) {
	    return edge[+(edge.left === cell.site)];
	  }

	  function sortCellHalfedges() {
	    for (var i = 0, n = cells.length, cell, halfedges, j, m; i < n; ++i) {
	      if ((cell = cells[i]) && (m = (halfedges = cell.halfedges).length)) {
	        var index = new Array(m),
	            array = new Array(m);
	        for (j = 0; j < m; ++j) {
	          index[j] = j, array[j] = cellHalfedgeAngle(cell, edges[halfedges[j]]);
	        }index.sort(function (i, j) {
	          return array[j] - array[i];
	        });
	        for (j = 0; j < m; ++j) {
	          array[j] = halfedges[index[j]];
	        }for (j = 0; j < m; ++j) {
	          halfedges[j] = array[j];
	        }
	      }
	    }
	  }

	  function clipCells(x0, y0, x1, y1) {
	    var nCells = cells.length,
	        iCell,
	        cell,
	        site,
	        iHalfedge,
	        halfedges,
	        nHalfedges,
	        start,
	        startX,
	        startY,
	        end,
	        endX,
	        endY,
	        cover = true;

	    for (iCell = 0; iCell < nCells; ++iCell) {
	      if (cell = cells[iCell]) {
	        site = cell.site;
	        halfedges = cell.halfedges;
	        iHalfedge = halfedges.length;

	        // Remove any dangling clipped edges.
	        while (iHalfedge--) {
	          if (!edges[halfedges[iHalfedge]]) {
	            halfedges.splice(iHalfedge, 1);
	          }
	        }

	        // Insert any border edges as necessary.
	        iHalfedge = 0, nHalfedges = halfedges.length;
	        while (iHalfedge < nHalfedges) {
	          end = cellHalfedgeEnd(cell, edges[halfedges[iHalfedge]]), endX = end[0], endY = end[1];
	          start = cellHalfedgeStart(cell, edges[halfedges[++iHalfedge % nHalfedges]]), startX = start[0], startY = start[1];
	          if (Math.abs(endX - startX) > epsilon$4 || Math.abs(endY - startY) > epsilon$4) {
	            halfedges.splice(iHalfedge, 0, edges.push(createBorderEdge(site, end, Math.abs(endX - x0) < epsilon$4 && y1 - endY > epsilon$4 ? [x0, Math.abs(startX - x0) < epsilon$4 ? startY : y1] : Math.abs(endY - y1) < epsilon$4 && x1 - endX > epsilon$4 ? [Math.abs(startY - y1) < epsilon$4 ? startX : x1, y1] : Math.abs(endX - x1) < epsilon$4 && endY - y0 > epsilon$4 ? [x1, Math.abs(startX - x1) < epsilon$4 ? startY : y0] : Math.abs(endY - y0) < epsilon$4 && endX - x0 > epsilon$4 ? [Math.abs(startY - y0) < epsilon$4 ? startX : x0, y0] : null)) - 1);
	            ++nHalfedges;
	          }
	        }

	        if (nHalfedges) cover = false;
	      }
	    }

	    // If there weren’t any edges, have the closest site cover the extent.
	    // It doesn’t matter which corner of the extent we measure!
	    if (cover) {
	      var dx,
	          dy,
	          d2,
	          dc = Infinity;

	      for (iCell = 0, cover = null; iCell < nCells; ++iCell) {
	        if (cell = cells[iCell]) {
	          site = cell.site;
	          dx = site[0] - x0;
	          dy = site[1] - y0;
	          d2 = dx * dx + dy * dy;
	          if (d2 < dc) dc = d2, cover = cell;
	        }
	      }

	      if (cover) {
	        var v00 = [x0, y0],
	            v01 = [x0, y1],
	            v11 = [x1, y1],
	            v10 = [x1, y0];
	        cover.halfedges.push(edges.push(createBorderEdge(site = cover.site, v00, v01)) - 1, edges.push(createBorderEdge(site, v01, v11)) - 1, edges.push(createBorderEdge(site, v11, v10)) - 1, edges.push(createBorderEdge(site, v10, v00)) - 1);
	      }
	    }

	    // Lastly delete any cells with no edges; these were entirely clipped.
	    for (iCell = 0; iCell < nCells; ++iCell) {
	      if (cell = cells[iCell]) {
	        if (!cell.halfedges.length) {
	          delete cells[iCell];
	        }
	      }
	    }
	  }

	  var circlePool = [];

	  var firstCircle;

	  function Circle() {
	    RedBlackNode(this);
	    this.x = this.y = this.arc = this.site = this.cy = null;
	  }

	  function attachCircle(arc) {
	    var lArc = arc.P,
	        rArc = arc.N;

	    if (!lArc || !rArc) return;

	    var lSite = lArc.site,
	        cSite = arc.site,
	        rSite = rArc.site;

	    if (lSite === rSite) return;

	    var bx = cSite[0],
	        by = cSite[1],
	        ax = lSite[0] - bx,
	        ay = lSite[1] - by,
	        cx = rSite[0] - bx,
	        cy = rSite[1] - by;

	    var d = 2 * (ax * cy - ay * cx);
	    if (d >= -epsilon2$2) return;

	    var ha = ax * ax + ay * ay,
	        hc = cx * cx + cy * cy,
	        x = (cy * ha - ay * hc) / d,
	        y = (ax * hc - cx * ha) / d;

	    var circle = circlePool.pop() || new Circle();
	    circle.arc = arc;
	    circle.site = cSite;
	    circle.x = x + bx;
	    circle.y = (circle.cy = y + by) + Math.sqrt(x * x + y * y); // y bottom

	    arc.circle = circle;

	    var before = null,
	        node = circles._;

	    while (node) {
	      if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
	        if (node.L) node = node.L;else {
	          before = node.P;break;
	        }
	      } else {
	        if (node.R) node = node.R;else {
	          before = node;break;
	        }
	      }
	    }

	    circles.insert(before, circle);
	    if (!before) firstCircle = circle;
	  }

	  function detachCircle(arc) {
	    var circle = arc.circle;
	    if (circle) {
	      if (!circle.P) firstCircle = circle.N;
	      circles.remove(circle);
	      circlePool.push(circle);
	      RedBlackNode(circle);
	      arc.circle = null;
	    }
	  }

	  var beachPool = [];

	  function Beach() {
	    RedBlackNode(this);
	    this.edge = this.site = this.circle = null;
	  }

	  function createBeach(site) {
	    var beach = beachPool.pop() || new Beach();
	    beach.site = site;
	    return beach;
	  }

	  function detachBeach(beach) {
	    detachCircle(beach);
	    beaches.remove(beach);
	    beachPool.push(beach);
	    RedBlackNode(beach);
	  }

	  function removeBeach(beach) {
	    var circle = beach.circle,
	        x = circle.x,
	        y = circle.cy,
	        vertex = [x, y],
	        previous = beach.P,
	        next = beach.N,
	        disappearing = [beach];

	    detachBeach(beach);

	    var lArc = previous;
	    while (lArc.circle && Math.abs(x - lArc.circle.x) < epsilon$4 && Math.abs(y - lArc.circle.cy) < epsilon$4) {
	      previous = lArc.P;
	      disappearing.unshift(lArc);
	      detachBeach(lArc);
	      lArc = previous;
	    }

	    disappearing.unshift(lArc);
	    detachCircle(lArc);

	    var rArc = next;
	    while (rArc.circle && Math.abs(x - rArc.circle.x) < epsilon$4 && Math.abs(y - rArc.circle.cy) < epsilon$4) {
	      next = rArc.N;
	      disappearing.push(rArc);
	      detachBeach(rArc);
	      rArc = next;
	    }

	    disappearing.push(rArc);
	    detachCircle(rArc);

	    var nArcs = disappearing.length,
	        iArc;
	    for (iArc = 1; iArc < nArcs; ++iArc) {
	      rArc = disappearing[iArc];
	      lArc = disappearing[iArc - 1];
	      setEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
	    }

	    lArc = disappearing[0];
	    rArc = disappearing[nArcs - 1];
	    rArc.edge = createEdge(lArc.site, rArc.site, null, vertex);

	    attachCircle(lArc);
	    attachCircle(rArc);
	  }

	  function addBeach(site) {
	    var x = site[0],
	        directrix = site[1],
	        lArc,
	        rArc,
	        dxl,
	        dxr,
	        node = beaches._;

	    while (node) {
	      dxl = leftBreakPoint(node, directrix) - x;
	      if (dxl > epsilon$4) node = node.L;else {
	        dxr = x - rightBreakPoint(node, directrix);
	        if (dxr > epsilon$4) {
	          if (!node.R) {
	            lArc = node;
	            break;
	          }
	          node = node.R;
	        } else {
	          if (dxl > -epsilon$4) {
	            lArc = node.P;
	            rArc = node;
	          } else if (dxr > -epsilon$4) {
	            lArc = node;
	            rArc = node.N;
	          } else {
	            lArc = rArc = node;
	          }
	          break;
	        }
	      }
	    }

	    createCell(site);
	    var newArc = createBeach(site);
	    beaches.insert(lArc, newArc);

	    if (!lArc && !rArc) return;

	    if (lArc === rArc) {
	      detachCircle(lArc);
	      rArc = createBeach(lArc.site);
	      beaches.insert(newArc, rArc);
	      newArc.edge = rArc.edge = createEdge(lArc.site, newArc.site);
	      attachCircle(lArc);
	      attachCircle(rArc);
	      return;
	    }

	    if (!rArc) {
	      // && lArc
	      newArc.edge = createEdge(lArc.site, newArc.site);
	      return;
	    }

	    // else lArc !== rArc
	    detachCircle(lArc);
	    detachCircle(rArc);

	    var lSite = lArc.site,
	        ax = lSite[0],
	        ay = lSite[1],
	        bx = site[0] - ax,
	        by = site[1] - ay,
	        rSite = rArc.site,
	        cx = rSite[0] - ax,
	        cy = rSite[1] - ay,
	        d = 2 * (bx * cy - by * cx),
	        hb = bx * bx + by * by,
	        hc = cx * cx + cy * cy,
	        vertex = [(cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay];

	    setEdgeEnd(rArc.edge, lSite, rSite, vertex);
	    newArc.edge = createEdge(lSite, site, null, vertex);
	    rArc.edge = createEdge(site, rSite, null, vertex);
	    attachCircle(lArc);
	    attachCircle(rArc);
	  }

	  function leftBreakPoint(arc, directrix) {
	    var site = arc.site,
	        rfocx = site[0],
	        rfocy = site[1],
	        pby2 = rfocy - directrix;

	    if (!pby2) return rfocx;

	    var lArc = arc.P;
	    if (!lArc) return -Infinity;

	    site = lArc.site;
	    var lfocx = site[0],
	        lfocy = site[1],
	        plby2 = lfocy - directrix;

	    if (!plby2) return lfocx;

	    var hl = lfocx - rfocx,
	        aby2 = 1 / pby2 - 1 / plby2,
	        b = hl / plby2;

	    if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;

	    return (rfocx + lfocx) / 2;
	  }

	  function rightBreakPoint(arc, directrix) {
	    var rArc = arc.N;
	    if (rArc) return leftBreakPoint(rArc, directrix);
	    var site = arc.site;
	    return site[1] === directrix ? site[0] : Infinity;
	  }

	  var epsilon$4 = 1e-6;
	  var epsilon2$2 = 1e-12;
	  var beaches;
	  var cells;
	  var circles;
	  var edges;

	  function triangleArea(a, b, c) {
	    return (a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]);
	  }

	  function lexicographic(a, b) {
	    return b[1] - a[1] || b[0] - a[0];
	  }

	  function Diagram(sites, extent) {
	    var site = sites.sort(lexicographic).pop(),
	        x,
	        y,
	        circle;

	    edges = [];
	    cells = new Array(sites.length);
	    beaches = new RedBlackTree();
	    circles = new RedBlackTree();

	    while (true) {
	      circle = firstCircle;
	      if (site && (!circle || site[1] < circle.y || site[1] === circle.y && site[0] < circle.x)) {
	        if (site[0] !== x || site[1] !== y) {
	          addBeach(site);
	          x = site[0], y = site[1];
	        }
	        site = sites.pop();
	      } else if (circle) {
	        removeBeach(circle.arc);
	      } else {
	        break;
	      }
	    }

	    sortCellHalfedges();

	    if (extent) {
	      var x0 = +extent[0][0],
	          y0 = +extent[0][1],
	          x1 = +extent[1][0],
	          y1 = +extent[1][1];
	      clipEdges(x0, y0, x1, y1);
	      clipCells(x0, y0, x1, y1);
	    }

	    this.edges = edges;
	    this.cells = cells;

	    beaches = circles = edges = cells = null;
	  }

	  Diagram.prototype = {
	    constructor: Diagram,

	    polygons: function polygons() {
	      var edges = this.edges;

	      return this.cells.map(function (cell) {
	        var polygon = cell.halfedges.map(function (i) {
	          return cellHalfedgeStart(cell, edges[i]);
	        });
	        polygon.data = cell.site.data;
	        return polygon;
	      });
	    },

	    triangles: function triangles() {
	      var triangles = [],
	          edges = this.edges;

	      this.cells.forEach(function (cell, i) {
	        if (!(m = (halfedges = cell.halfedges).length)) return;
	        var site = cell.site,
	            halfedges,
	            j = -1,
	            m,
	            s0,
	            e1 = edges[halfedges[m - 1]],
	            s1 = e1.left === site ? e1.right : e1.left;

	        while (++j < m) {
	          s0 = s1;
	          e1 = edges[halfedges[j]];
	          s1 = e1.left === site ? e1.right : e1.left;
	          if (s0 && s1 && i < s0.index && i < s1.index && triangleArea(site, s0, s1) < 0) {
	            triangles.push([site.data, s0.data, s1.data]);
	          }
	        }
	      });

	      return triangles;
	    },

	    links: function links() {
	      return this.edges.filter(function (edge) {
	        return edge.right;
	      }).map(function (edge) {
	        return {
	          source: edge.left.data,
	          target: edge.right.data
	        };
	      });
	    },

	    find: function find(x, y, radius) {
	      var that = this,
	          i0,
	          i1 = that._found || 0,
	          n = that.cells.length,
	          cell;

	      // Use the previously-found cell, or start with an arbitrary one.
	      while (!(cell = that.cells[i1])) {
	        if (++i1 >= n) return null;
	      }var dx = x - cell.site[0],
	          dy = y - cell.site[1],
	          d2 = dx * dx + dy * dy;

	      // Traverse the half-edges to find a closer cell, if any.
	      do {
	        cell = that.cells[i0 = i1], i1 = null;
	        cell.halfedges.forEach(function (e) {
	          var edge = that.edges[e],
	              v = edge.left;
	          if ((v === cell.site || !v) && !(v = edge.right)) return;
	          var vx = x - v[0],
	              vy = y - v[1],
	              v2 = vx * vx + vy * vy;
	          if (v2 < d2) d2 = v2, i1 = v.index;
	        });
	      } while (i1 !== null);

	      that._found = i0;

	      return radius == null || d2 <= radius * radius ? cell.site : null;
	    }
	  };

	  var voronoi = function voronoi() {
	    var x = x$4,
	        y = y$4,
	        extent = null;

	    function voronoi(data) {
	      return new Diagram(data.map(function (d, i) {
	        var s = [Math.round(x(d, i, data) / epsilon$4) * epsilon$4, Math.round(y(d, i, data) / epsilon$4) * epsilon$4];
	        s.index = i;
	        s.data = d;
	        return s;
	      }), extent);
	    }

	    voronoi.polygons = function (data) {
	      return voronoi(data).polygons();
	    };

	    voronoi.links = function (data) {
	      return voronoi(data).links();
	    };

	    voronoi.triangles = function (data) {
	      return voronoi(data).triangles();
	    };

	    voronoi.x = function (_) {
	      return arguments.length ? (x = typeof _ === "function" ? _ : constant$11(+_), voronoi) : x;
	    };

	    voronoi.y = function (_) {
	      return arguments.length ? (y = typeof _ === "function" ? _ : constant$11(+_), voronoi) : y;
	    };

	    voronoi.extent = function (_) {
	      return arguments.length ? (extent = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi) : extent && [[extent[0][0], extent[0][1]], [extent[1][0], extent[1][1]]];
	    };

	    voronoi.size = function (_) {
	      return arguments.length ? (extent = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi) : extent && [extent[1][0] - extent[0][0], extent[1][1] - extent[0][1]];
	    };

	    return voronoi;
	  };

	  var constant$12 = function constant$12(x) {
	    return function () {
	      return x;
	    };
	  };

	  function ZoomEvent(target, type, transform) {
	    this.target = target;
	    this.type = type;
	    this.transform = transform;
	  }

	  function Transform(k, x, y) {
	    this.k = k;
	    this.x = x;
	    this.y = y;
	  }

	  Transform.prototype = {
	    constructor: Transform,
	    scale: function scale(k) {
	      return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
	    },
	    translate: function translate(x, y) {
	      return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
	    },
	    apply: function apply(point) {
	      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
	    },
	    applyX: function applyX(x) {
	      return x * this.k + this.x;
	    },
	    applyY: function applyY(y) {
	      return y * this.k + this.y;
	    },
	    invert: function invert(location) {
	      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
	    },
	    invertX: function invertX(x) {
	      return (x - this.x) / this.k;
	    },
	    invertY: function invertY(y) {
	      return (y - this.y) / this.k;
	    },
	    rescaleX: function rescaleX(x) {
	      return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
	    },
	    rescaleY: function rescaleY(y) {
	      return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
	    },
	    toString: function toString() {
	      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	    }
	  };

	  var identity$8 = new Transform(1, 0, 0);

	  transform$1.prototype = Transform.prototype;

	  function transform$1(node) {
	    return node.__zoom || identity$8;
	  }

	  function nopropagation$2() {
	    exports.event.stopImmediatePropagation();
	  }

	  var noevent$2 = function noevent$2() {
	    exports.event.preventDefault();
	    exports.event.stopImmediatePropagation();
	  };

	  // Ignore right-click, since that should open the context menu.
	  function defaultFilter$2() {
	    return !exports.event.button;
	  }

	  function defaultExtent$1() {
	    var e = this,
	        w,
	        h;
	    if (e instanceof SVGElement) {
	      e = e.ownerSVGElement || e;
	      w = e.width.baseVal.value;
	      h = e.height.baseVal.value;
	    } else {
	      w = e.clientWidth;
	      h = e.clientHeight;
	    }
	    return [[0, 0], [w, h]];
	  }

	  function defaultTransform() {
	    return this.__zoom || identity$8;
	  }

	  function defaultWheelDelta() {
	    return -exports.event.deltaY * (exports.event.deltaMode ? 120 : 1) / 500;
	  }

	  function touchable$1() {
	    return "ontouchstart" in this;
	  }

	  var zoom = function zoom() {
	    var filter = defaultFilter$2,
	        extent = defaultExtent$1,
	        wheelDelta = defaultWheelDelta,
	        k0 = 0,
	        k1 = Infinity,
	        x0 = -k1,
	        x1 = k1,
	        y0 = x0,
	        y1 = x1,
	        duration = 250,
	        interpolate = interpolateZoom,
	        gestures = [],
	        listeners = dispatch("start", "zoom", "end"),
	        touchstarting,
	        touchending,
	        touchDelay = 500,
	        wheelDelay = 150,
	        clickDistance2 = 0;

	    function zoom(selection$$1) {
	      selection$$1.property("__zoom", defaultTransform).on("wheel.zoom", wheeled).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable$1).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	    }

	    zoom.transform = function (collection, transform$$1) {
	      var selection$$1 = collection.selection ? collection.selection() : collection;
	      selection$$1.property("__zoom", defaultTransform);
	      if (collection !== selection$$1) {
	        schedule(collection, transform$$1);
	      } else {
	        selection$$1.interrupt().each(function () {
	          gesture(this, arguments).start().zoom(null, typeof transform$$1 === "function" ? transform$$1.apply(this, arguments) : transform$$1).end();
	        });
	      }
	    };

	    zoom.scaleBy = function (selection$$1, k) {
	      zoom.scaleTo(selection$$1, function () {
	        var k0 = this.__zoom.k,
	            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
	        return k0 * k1;
	      });
	    };

	    zoom.scaleTo = function (selection$$1, k) {
	      zoom.transform(selection$$1, function () {
	        var e = extent.apply(this, arguments),
	            t0 = this.__zoom,
	            p0 = centroid(e),
	            p1 = t0.invert(p0),
	            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
	        return constrain(translate(scale(t0, k1), p0, p1), e);
	      });
	    };

	    zoom.translateBy = function (selection$$1, x, y) {
	      zoom.transform(selection$$1, function () {
	        return constrain(this.__zoom.translate(typeof x === "function" ? x.apply(this, arguments) : x, typeof y === "function" ? y.apply(this, arguments) : y), extent.apply(this, arguments));
	      });
	    };

	    zoom.translateTo = function (selection$$1, x, y) {
	      zoom.transform(selection$$1, function () {
	        var e = extent.apply(this, arguments),
	            t = this.__zoom,
	            p = centroid(e);
	        return constrain(identity$8.translate(p[0], p[1]).scale(t.k).translate(typeof x === "function" ? -x.apply(this, arguments) : -x, typeof y === "function" ? -y.apply(this, arguments) : -y), e);
	      });
	    };

	    function scale(transform$$1, k) {
	      k = Math.max(k0, Math.min(k1, k));
	      return k === transform$$1.k ? transform$$1 : new Transform(k, transform$$1.x, transform$$1.y);
	    }

	    function translate(transform$$1, p0, p1) {
	      var x = p0[0] - p1[0] * transform$$1.k,
	          y = p0[1] - p1[1] * transform$$1.k;
	      return x === transform$$1.x && y === transform$$1.y ? transform$$1 : new Transform(transform$$1.k, x, y);
	    }

	    function constrain(transform$$1, extent) {
	      var dx0 = transform$$1.invertX(extent[0][0]) - x0,
	          dx1 = transform$$1.invertX(extent[1][0]) - x1,
	          dy0 = transform$$1.invertY(extent[0][1]) - y0,
	          dy1 = transform$$1.invertY(extent[1][1]) - y1;
	      return transform$$1.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
	    }

	    function centroid(extent) {
	      return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
	    }

	    function schedule(transition$$1, transform$$1, center) {
	      transition$$1.on("start.zoom", function () {
	        gesture(this, arguments).start();
	      }).on("interrupt.zoom end.zoom", function () {
	        gesture(this, arguments).end();
	      }).tween("zoom", function () {
	        var that = this,
	            args = arguments,
	            g = gesture(that, args),
	            e = extent.apply(that, args),
	            p = center || centroid(e),
	            w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
	            a = that.__zoom,
	            b = typeof transform$$1 === "function" ? transform$$1.apply(that, args) : transform$$1,
	            i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
	        return function (t) {
	          if (t === 1) t = b; // Avoid rounding error on end.
	          else {
	              var l = i(t),
	                  k = w / l[2];t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
	            }
	          g.zoom(null, t);
	        };
	      });
	    }

	    function gesture(that, args) {
	      for (var i = 0, n = gestures.length, g; i < n; ++i) {
	        if ((g = gestures[i]).that === that) {
	          return g;
	        }
	      }
	      return new Gesture(that, args);
	    }

	    function Gesture(that, args) {
	      this.that = that;
	      this.args = args;
	      this.index = -1;
	      this.active = 0;
	      this.extent = extent.apply(that, args);
	    }

	    Gesture.prototype = {
	      start: function start() {
	        if (++this.active === 1) {
	          this.index = gestures.push(this) - 1;
	          this.emit("start");
	        }
	        return this;
	      },
	      zoom: function zoom(key, transform$$1) {
	        if (this.mouse && key !== "mouse") this.mouse[1] = transform$$1.invert(this.mouse[0]);
	        if (this.touch0 && key !== "touch") this.touch0[1] = transform$$1.invert(this.touch0[0]);
	        if (this.touch1 && key !== "touch") this.touch1[1] = transform$$1.invert(this.touch1[0]);
	        this.that.__zoom = transform$$1;
	        this.emit("zoom");
	        return this;
	      },
	      end: function end() {
	        if (--this.active === 0) {
	          gestures.splice(this.index, 1);
	          this.index = -1;
	          this.emit("end");
	        }
	        return this;
	      },
	      emit: function emit(type) {
	        customEvent(new ZoomEvent(zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
	      }
	    };

	    function wheeled() {
	      if (!filter.apply(this, arguments)) return;
	      var g = gesture(this, arguments),
	          t = this.__zoom,
	          k = Math.max(k0, Math.min(k1, t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
	          p = mouse(this);

	      // If the mouse is in the same location as before, reuse it.
	      // If there were recent wheel events, reset the wheel idle timeout.
	      if (g.wheel) {
	        if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
	          g.mouse[1] = t.invert(g.mouse[0] = p);
	        }
	        clearTimeout(g.wheel);
	      }

	      // If this wheel event won’t trigger a transform change, ignore it.
	      else if (t.k === k) return;

	        // Otherwise, capture the mouse point and location at the start.
	        else {
	            g.mouse = [p, t.invert(p)];
	            interrupt(this);
	            g.start();
	          }

	      noevent$2();
	      g.wheel = setTimeout(wheelidled, wheelDelay);
	      g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent));

	      function wheelidled() {
	        g.wheel = null;
	        g.end();
	      }
	    }

	    function mousedowned() {
	      if (touchending || !filter.apply(this, arguments)) return;
	      var g = gesture(this, arguments),
	          v = select(exports.event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
	          p = mouse(this),
	          x0 = exports.event.clientX,
	          y0 = exports.event.clientY;

	      dragDisable(exports.event.view);
	      nopropagation$2();
	      g.mouse = [p, this.__zoom.invert(p)];
	      interrupt(this);
	      g.start();

	      function mousemoved() {
	        noevent$2();
	        if (!g.moved) {
	          var dx = exports.event.clientX - x0,
	              dy = exports.event.clientY - y0;
	          g.moved = dx * dx + dy * dy > clickDistance2;
	        }
	        g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = mouse(g.that), g.mouse[1]), g.extent));
	      }

	      function mouseupped() {
	        v.on("mousemove.zoom mouseup.zoom", null);
	        yesdrag(exports.event.view, g.moved);
	        noevent$2();
	        g.end();
	      }
	    }

	    function dblclicked() {
	      if (!filter.apply(this, arguments)) return;
	      var t0 = this.__zoom,
	          p0 = mouse(this),
	          p1 = t0.invert(p0),
	          k1 = t0.k * (exports.event.shiftKey ? 0.5 : 2),
	          t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments));

	      noevent$2();
	      if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0);else select(this).call(zoom.transform, t1);
	    }

	    function touchstarted() {
	      if (!filter.apply(this, arguments)) return;
	      var g = gesture(this, arguments),
	          touches$$1 = exports.event.changedTouches,
	          started,
	          n = touches$$1.length,
	          i,
	          t,
	          p;

	      nopropagation$2();
	      for (i = 0; i < n; ++i) {
	        t = touches$$1[i], p = touch(this, touches$$1, t.identifier);
	        p = [p, this.__zoom.invert(p), t.identifier];
	        if (!g.touch0) g.touch0 = p, started = true;else if (!g.touch1) g.touch1 = p;
	      }

	      // If this is a dbltap, reroute to the (optional) dblclick.zoom handler.
	      if (touchstarting) {
	        touchstarting = clearTimeout(touchstarting);
	        if (!g.touch1) {
	          g.end();
	          p = select(this).on("dblclick.zoom");
	          if (p) p.apply(this, arguments);
	          return;
	        }
	      }

	      if (started) {
	        touchstarting = setTimeout(function () {
	          touchstarting = null;
	        }, touchDelay);
	        interrupt(this);
	        g.start();
	      }
	    }

	    function touchmoved() {
	      var g = gesture(this, arguments),
	          touches$$1 = exports.event.changedTouches,
	          n = touches$$1.length,
	          i,
	          t,
	          p,
	          l;

	      noevent$2();
	      if (touchstarting) touchstarting = clearTimeout(touchstarting);
	      for (i = 0; i < n; ++i) {
	        t = touches$$1[i], p = touch(this, touches$$1, t.identifier);
	        if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
	      }
	      t = g.that.__zoom;
	      if (g.touch1) {
	        var p0 = g.touch0[0],
	            l0 = g.touch0[1],
	            p1 = g.touch1[0],
	            l1 = g.touch1[1],
	            dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
	            dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
	        t = scale(t, Math.sqrt(dp / dl));
	        p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
	        l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
	      } else if (g.touch0) p = g.touch0[0], l = g.touch0[1];else return;
	      g.zoom("touch", constrain(translate(t, p, l), g.extent));
	    }

	    function touchended() {
	      var g = gesture(this, arguments),
	          touches$$1 = exports.event.changedTouches,
	          n = touches$$1.length,
	          i,
	          t;

	      nopropagation$2();
	      if (touchending) clearTimeout(touchending);
	      touchending = setTimeout(function () {
	        touchending = null;
	      }, touchDelay);
	      for (i = 0; i < n; ++i) {
	        t = touches$$1[i];
	        if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
	      }
	      if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
	      if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);else g.end();
	    }

	    zoom.wheelDelta = function (_) {
	      return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant$12(+_), zoom) : wheelDelta;
	    };

	    zoom.filter = function (_) {
	      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$12(!!_), zoom) : filter;
	    };

	    zoom.extent = function (_) {
	      return arguments.length ? (extent = typeof _ === "function" ? _ : constant$12([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
	    };

	    zoom.scaleExtent = function (_) {
	      return arguments.length ? (k0 = +_[0], k1 = +_[1], zoom) : [k0, k1];
	    };

	    zoom.translateExtent = function (_) {
	      return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], zoom) : [[x0, y0], [x1, y1]];
	    };

	    zoom.duration = function (_) {
	      return arguments.length ? (duration = +_, zoom) : duration;
	    };

	    zoom.interpolate = function (_) {
	      return arguments.length ? (interpolate = _, zoom) : interpolate;
	    };

	    zoom.on = function () {
	      var value = listeners.on.apply(listeners, arguments);
	      return value === listeners ? zoom : value;
	    };

	    zoom.clickDistance = function (_) {
	      return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
	    };

	    return zoom;
	  };

	  exports.version = version;
	  exports.bisect = bisectRight;
	  exports.bisectRight = bisectRight;
	  exports.bisectLeft = bisectLeft;
	  exports.ascending = ascending;
	  exports.bisector = bisector;
	  exports.cross = cross;
	  exports.descending = descending;
	  exports.deviation = deviation;
	  exports.extent = extent;
	  exports.histogram = histogram;
	  exports.thresholdFreedmanDiaconis = freedmanDiaconis;
	  exports.thresholdScott = scott;
	  exports.thresholdSturges = sturges;
	  exports.max = max;
	  exports.mean = mean;
	  exports.median = median;
	  exports.merge = merge;
	  exports.min = min;
	  exports.pairs = pairs;
	  exports.permute = permute;
	  exports.quantile = threshold;
	  exports.range = sequence;
	  exports.scan = scan;
	  exports.shuffle = shuffle;
	  exports.sum = sum;
	  exports.ticks = ticks;
	  exports.tickIncrement = tickIncrement;
	  exports.tickStep = tickStep;
	  exports.transpose = transpose;
	  exports.variance = variance;
	  exports.zip = zip;
	  exports.axisTop = axisTop;
	  exports.axisRight = axisRight;
	  exports.axisBottom = axisBottom;
	  exports.axisLeft = axisLeft;
	  exports.brush = brush;
	  exports.brushX = brushX;
	  exports.brushY = brushY;
	  exports.brushSelection = brushSelection;
	  exports.chord = chord;
	  exports.ribbon = ribbon;
	  exports.nest = nest;
	  exports.set = set$2;
	  exports.map = map$1;
	  exports.keys = keys;
	  exports.values = values;
	  exports.entries = entries;
	  exports.color = color;
	  exports.rgb = rgb;
	  exports.hsl = hsl;
	  exports.lab = lab;
	  exports.hcl = hcl;
	  exports.cubehelix = cubehelix;
	  exports.dispatch = dispatch;
	  exports.drag = drag;
	  exports.dragDisable = dragDisable;
	  exports.dragEnable = yesdrag;
	  exports.dsvFormat = dsv;
	  exports.csvParse = csvParse;
	  exports.csvParseRows = csvParseRows;
	  exports.csvFormat = csvFormat;
	  exports.csvFormatRows = csvFormatRows;
	  exports.tsvParse = tsvParse;
	  exports.tsvParseRows = tsvParseRows;
	  exports.tsvFormat = tsvFormat;
	  exports.tsvFormatRows = tsvFormatRows;
	  exports.easeLinear = linear$1;
	  exports.easeQuad = quadInOut;
	  exports.easeQuadIn = quadIn;
	  exports.easeQuadOut = quadOut;
	  exports.easeQuadInOut = quadInOut;
	  exports.easeCubic = cubicInOut;
	  exports.easeCubicIn = cubicIn;
	  exports.easeCubicOut = cubicOut;
	  exports.easeCubicInOut = cubicInOut;
	  exports.easePoly = polyInOut;
	  exports.easePolyIn = polyIn;
	  exports.easePolyOut = polyOut;
	  exports.easePolyInOut = polyInOut;
	  exports.easeSin = sinInOut;
	  exports.easeSinIn = sinIn;
	  exports.easeSinOut = sinOut;
	  exports.easeSinInOut = sinInOut;
	  exports.easeExp = expInOut;
	  exports.easeExpIn = expIn;
	  exports.easeExpOut = expOut;
	  exports.easeExpInOut = expInOut;
	  exports.easeCircle = circleInOut;
	  exports.easeCircleIn = circleIn;
	  exports.easeCircleOut = circleOut;
	  exports.easeCircleInOut = circleInOut;
	  exports.easeBounce = bounceOut;
	  exports.easeBounceIn = bounceIn;
	  exports.easeBounceOut = bounceOut;
	  exports.easeBounceInOut = bounceInOut;
	  exports.easeBack = backInOut;
	  exports.easeBackIn = backIn;
	  exports.easeBackOut = backOut;
	  exports.easeBackInOut = backInOut;
	  exports.easeElastic = elasticOut;
	  exports.easeElasticIn = elasticIn;
	  exports.easeElasticOut = elasticOut;
	  exports.easeElasticInOut = elasticInOut;
	  exports.forceCenter = center$1;
	  exports.forceCollide = collide;
	  exports.forceLink = link;
	  exports.forceManyBody = manyBody;
	  exports.forceSimulation = simulation;
	  exports.forceX = x$2;
	  exports.forceY = y$2;
	  exports.formatDefaultLocale = defaultLocale;
	  exports.formatLocale = formatLocale;
	  exports.formatSpecifier = formatSpecifier;
	  exports.precisionFixed = precisionFixed;
	  exports.precisionPrefix = precisionPrefix;
	  exports.precisionRound = precisionRound;
	  exports.geoArea = area;
	  exports.geoBounds = bounds;
	  exports.geoCentroid = centroid;
	  exports.geoCircle = circle;
	  exports.geoClipExtent = extent$1;
	  exports.geoContains = contains;
	  exports.geoDistance = distance;
	  exports.geoGraticule = graticule;
	  exports.geoGraticule10 = graticule10;
	  exports.geoInterpolate = interpolate$1;
	  exports.geoLength = length$1;
	  exports.geoPath = index$1;
	  exports.geoAlbers = albers;
	  exports.geoAlbersUsa = albersUsa;
	  exports.geoAzimuthalEqualArea = azimuthalEqualArea;
	  exports.geoAzimuthalEqualAreaRaw = azimuthalEqualAreaRaw;
	  exports.geoAzimuthalEquidistant = azimuthalEquidistant;
	  exports.geoAzimuthalEquidistantRaw = azimuthalEquidistantRaw;
	  exports.geoConicConformal = conicConformal;
	  exports.geoConicConformalRaw = conicConformalRaw;
	  exports.geoConicEqualArea = conicEqualArea;
	  exports.geoConicEqualAreaRaw = conicEqualAreaRaw;
	  exports.geoConicEquidistant = conicEquidistant;
	  exports.geoConicEquidistantRaw = conicEquidistantRaw;
	  exports.geoEquirectangular = equirectangular;
	  exports.geoEquirectangularRaw = equirectangularRaw;
	  exports.geoGnomonic = gnomonic;
	  exports.geoGnomonicRaw = gnomonicRaw;
	  exports.geoIdentity = identity$5;
	  exports.geoProjection = projection;
	  exports.geoProjectionMutator = projectionMutator;
	  exports.geoMercator = mercator;
	  exports.geoMercatorRaw = mercatorRaw;
	  exports.geoOrthographic = orthographic;
	  exports.geoOrthographicRaw = orthographicRaw;
	  exports.geoStereographic = stereographic;
	  exports.geoStereographicRaw = stereographicRaw;
	  exports.geoTransverseMercator = transverseMercator;
	  exports.geoTransverseMercatorRaw = transverseMercatorRaw;
	  exports.geoRotation = rotation;
	  exports.geoStream = geoStream;
	  exports.geoTransform = transform;
	  exports.cluster = cluster;
	  exports.hierarchy = hierarchy;
	  exports.pack = index$2;
	  exports.packSiblings = siblings;
	  exports.packEnclose = enclose;
	  exports.partition = partition;
	  exports.stratify = stratify;
	  exports.tree = tree;
	  exports.treemap = index$3;
	  exports.treemapBinary = binary;
	  exports.treemapDice = treemapDice;
	  exports.treemapSlice = treemapSlice;
	  exports.treemapSliceDice = sliceDice;
	  exports.treemapSquarify = squarify;
	  exports.treemapResquarify = resquarify;
	  exports.interpolate = interpolateValue;
	  exports.interpolateArray = array$1;
	  exports.interpolateBasis = basis$1;
	  exports.interpolateBasisClosed = basisClosed;
	  exports.interpolateDate = date;
	  exports.interpolateNumber = reinterpolate;
	  exports.interpolateObject = object;
	  exports.interpolateRound = interpolateRound;
	  exports.interpolateString = interpolateString;
	  exports.interpolateTransformCss = interpolateTransformCss;
	  exports.interpolateTransformSvg = interpolateTransformSvg;
	  exports.interpolateZoom = interpolateZoom;
	  exports.interpolateRgb = interpolateRgb;
	  exports.interpolateRgbBasis = rgbBasis;
	  exports.interpolateRgbBasisClosed = rgbBasisClosed;
	  exports.interpolateHsl = hsl$2;
	  exports.interpolateHslLong = hslLong;
	  exports.interpolateLab = lab$1;
	  exports.interpolateHcl = hcl$2;
	  exports.interpolateHclLong = hclLong;
	  exports.interpolateCubehelix = cubehelix$2;
	  exports.interpolateCubehelixLong = cubehelixLong;
	  exports.quantize = quantize;
	  exports.path = path;
	  exports.polygonArea = area$1;
	  exports.polygonCentroid = centroid$1;
	  exports.polygonHull = hull;
	  exports.polygonContains = contains$1;
	  exports.polygonLength = length$2;
	  exports.quadtree = quadtree;
	  exports.queue = queue;
	  exports.randomUniform = uniform;
	  exports.randomNormal = normal;
	  exports.randomLogNormal = logNormal;
	  exports.randomBates = bates;
	  exports.randomIrwinHall = irwinHall;
	  exports.randomExponential = exponential$1;
	  exports.request = request;
	  exports.html = html;
	  exports.json = json;
	  exports.text = text;
	  exports.xml = xml;
	  exports.csv = csv$1;
	  exports.tsv = tsv$1;
	  exports.scaleBand = band;
	  exports.scalePoint = point$1;
	  exports.scaleIdentity = identity$6;
	  exports.scaleLinear = linear$2;
	  exports.scaleLog = log$1;
	  exports.scaleOrdinal = ordinal;
	  exports.scaleImplicit = implicit;
	  exports.scalePow = pow$1;
	  exports.scaleSqrt = sqrt$1;
	  exports.scaleQuantile = quantile;
	  exports.scaleQuantize = quantize$1;
	  exports.scaleThreshold = threshold$1;
	  exports.scaleTime = time;
	  exports.scaleUtc = utcTime;
	  exports.schemeCategory10 = category10;
	  exports.schemeCategory20b = category20b;
	  exports.schemeCategory20c = category20c;
	  exports.schemeCategory20 = category20;
	  exports.interpolateCubehelixDefault = cubehelix$3;
	  exports.interpolateRainbow = rainbow$1;
	  exports.interpolateWarm = warm;
	  exports.interpolateCool = cool;
	  exports.interpolateViridis = viridis;
	  exports.interpolateMagma = magma;
	  exports.interpolateInferno = inferno;
	  exports.interpolatePlasma = plasma;
	  exports.scaleSequential = sequential;
	  exports.creator = creator;
	  exports.local = local$1;
	  exports.matcher = matcher$1;
	  exports.mouse = mouse;
	  exports.namespace = namespace;
	  exports.namespaces = namespaces;
	  exports.select = select;
	  exports.selectAll = selectAll;
	  exports.selection = selection;
	  exports.selector = selector;
	  exports.selectorAll = selectorAll;
	  exports.style = styleValue;
	  exports.touch = touch;
	  exports.touches = touches;
	  exports.window = defaultView;
	  exports.customEvent = customEvent;
	  exports.arc = arc;
	  exports.area = area$2;
	  exports.line = line;
	  exports.pie = pie;
	  exports.areaRadial = areaRadial;
	  exports.radialArea = areaRadial;
	  exports.lineRadial = lineRadial$1;
	  exports.radialLine = lineRadial$1;
	  exports.pointRadial = pointRadial;
	  exports.linkHorizontal = linkHorizontal;
	  exports.linkVertical = linkVertical;
	  exports.linkRadial = linkRadial;
	  exports.symbol = symbol;
	  exports.symbols = symbols;
	  exports.symbolCircle = circle$2;
	  exports.symbolCross = cross$2;
	  exports.symbolDiamond = diamond;
	  exports.symbolSquare = square;
	  exports.symbolStar = star;
	  exports.symbolTriangle = triangle;
	  exports.symbolWye = wye;
	  exports.curveBasisClosed = basisClosed$1;
	  exports.curveBasisOpen = basisOpen;
	  exports.curveBasis = basis$2;
	  exports.curveBundle = bundle;
	  exports.curveCardinalClosed = cardinalClosed;
	  exports.curveCardinalOpen = cardinalOpen;
	  exports.curveCardinal = cardinal;
	  exports.curveCatmullRomClosed = catmullRomClosed;
	  exports.curveCatmullRomOpen = catmullRomOpen;
	  exports.curveCatmullRom = catmullRom;
	  exports.curveLinearClosed = linearClosed;
	  exports.curveLinear = curveLinear;
	  exports.curveMonotoneX = monotoneX;
	  exports.curveMonotoneY = monotoneY;
	  exports.curveNatural = natural;
	  exports.curveStep = step;
	  exports.curveStepAfter = stepAfter;
	  exports.curveStepBefore = stepBefore;
	  exports.stack = stack;
	  exports.stackOffsetExpand = expand;
	  exports.stackOffsetDiverging = diverging;
	  exports.stackOffsetNone = none$1;
	  exports.stackOffsetSilhouette = silhouette;
	  exports.stackOffsetWiggle = wiggle;
	  exports.stackOrderAscending = ascending$2;
	  exports.stackOrderDescending = descending$2;
	  exports.stackOrderInsideOut = insideOut;
	  exports.stackOrderNone = none$2;
	  exports.stackOrderReverse = reverse;
	  exports.timeInterval = newInterval;
	  exports.timeMillisecond = millisecond;
	  exports.timeMilliseconds = milliseconds;
	  exports.utcMillisecond = millisecond;
	  exports.utcMilliseconds = milliseconds;
	  exports.timeSecond = second;
	  exports.timeSeconds = seconds;
	  exports.utcSecond = second;
	  exports.utcSeconds = seconds;
	  exports.timeMinute = minute;
	  exports.timeMinutes = minutes;
	  exports.timeHour = hour;
	  exports.timeHours = hours;
	  exports.timeDay = day;
	  exports.timeDays = days;
	  exports.timeWeek = sunday;
	  exports.timeWeeks = sundays;
	  exports.timeSunday = sunday;
	  exports.timeSundays = sundays;
	  exports.timeMonday = monday;
	  exports.timeMondays = mondays;
	  exports.timeTuesday = tuesday;
	  exports.timeTuesdays = tuesdays;
	  exports.timeWednesday = wednesday;
	  exports.timeWednesdays = wednesdays;
	  exports.timeThursday = thursday;
	  exports.timeThursdays = thursdays;
	  exports.timeFriday = friday;
	  exports.timeFridays = fridays;
	  exports.timeSaturday = saturday;
	  exports.timeSaturdays = saturdays;
	  exports.timeMonth = month;
	  exports.timeMonths = months;
	  exports.timeYear = year;
	  exports.timeYears = years;
	  exports.utcMinute = utcMinute;
	  exports.utcMinutes = utcMinutes;
	  exports.utcHour = utcHour;
	  exports.utcHours = utcHours;
	  exports.utcDay = utcDay;
	  exports.utcDays = utcDays;
	  exports.utcWeek = utcSunday;
	  exports.utcWeeks = utcSundays;
	  exports.utcSunday = utcSunday;
	  exports.utcSundays = utcSundays;
	  exports.utcMonday = utcMonday;
	  exports.utcMondays = utcMondays;
	  exports.utcTuesday = utcTuesday;
	  exports.utcTuesdays = utcTuesdays;
	  exports.utcWednesday = utcWednesday;
	  exports.utcWednesdays = utcWednesdays;
	  exports.utcThursday = utcThursday;
	  exports.utcThursdays = utcThursdays;
	  exports.utcFriday = utcFriday;
	  exports.utcFridays = utcFridays;
	  exports.utcSaturday = utcSaturday;
	  exports.utcSaturdays = utcSaturdays;
	  exports.utcMonth = utcMonth;
	  exports.utcMonths = utcMonths;
	  exports.utcYear = utcYear;
	  exports.utcYears = utcYears;
	  exports.timeFormatDefaultLocale = defaultLocale$1;
	  exports.timeFormatLocale = formatLocale$1;
	  exports.isoFormat = formatIso;
	  exports.isoParse = parseIso;
	  exports.now = now;
	  exports.timer = timer;
	  exports.timerFlush = timerFlush;
	  exports.timeout = timeout$1;
	  exports.interval = interval$1;
	  exports.transition = transition;
	  exports.active = active;
	  exports.interrupt = interrupt;
	  exports.voronoi = voronoi;
	  exports.zoom = zoom;
	  exports.zoomTransform = transform$1;
	  exports.zoomIdentity = identity$8;

	  Object.defineProperty(exports, '__esModule', { value: true });
	});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf'];

	var Particle = function () {
	  function Particle(_ref) {
	    var x = _ref.x,
	        y = _ref.y,
	        pointRadius = _ref.pointRadius,
	        xScale = _ref.xScale,
	        yScale = _ref.yScale;

	    _classCallCheck(this, Particle);

	    // starting locations
	    var width = xScale.range()[1];
	    var height = yScale.range()[0];
	    this.x = Math.random() * width;
	    this.y = Math.random() * height;

	    this.data = {
	      x: x,
	      y: y
	    };

	    this.dest = {
	      x: xScale(x),
	      y: yScale(y)
	    };
	    this.r = (pointRadius + Math.random() * 3) * (width / 1700);
	    this.vx = (Math.random() - 0.5) * 20;
	    this.vy = (Math.random() - 0.5) * 20;
	    this.accX = 0;
	    this.accY = 0;
	    this.friction = Math.random() * 0.03 + 0.94;
	    this.color = colors[Math.floor(Math.random() * 6)];
	  }

	  _createClass(Particle, [{
	    key: 'resize',
	    value: function resize(_ref2) {
	      var xScale = _ref2.xScale,
	          yScale = _ref2.yScale;

	      this.dest = {
	        x: xScale(this.data.x),
	        y: yScale(this.data.y)
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref3) {
	      var context = _ref3.context,
	          width = _ref3.width,
	          height = _ref3.height,
	          mouse = _ref3.mouse;

	      this.accX = (this.dest.x - this.x) / 500;
	      this.accY = (this.dest.y - this.y) / 500;
	      this.vx += this.accX;
	      this.vy += this.accY;
	      this.vx *= this.friction;
	      this.vy *= this.friction;

	      this.x += this.vx;
	      this.y += this.vy;

	      context.fillStyle = this.color;
	      context.beginPath();
	      context.arc(this.x, this.y, this.r, Math.PI * 2, false);
	      context.fill();

	      var a = this.x - mouse.x;
	      var b = this.y - mouse.y;
	      var distance = Math.sqrt(a * a + b * b);

	      // if the point is within 70 radiuses of the mouse, send it flying.
	      if (distance < width * 0.1) {
	        this.accX = (this.x - mouse.x) / 100;
	        this.accY = (this.y - mouse.y) / 100;
	        this.vx += this.accX;
	        this.vy += this.accY;
	      }
	    }
	  }]);

	  return Particle;
	}();

	module.exports = Particle;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _d = __webpack_require__(1);

	var d3 = _interopRequireWildcard(_d);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// Takes our math function and returns an array of objects with x,y for it.
	function makeCurve(_ref) {
	  var n = _ref.n,
	      min = _ref.min,
	      max = _ref.max,
	      yFun = _ref.yFun;

	  var stepSize = (max - min) / n;
	  var x = void 0;

	  return d3.range(n).map(function (d, i) {
	    x = min + (i + 1) * stepSize;
	    return {
	      x: x,
	      y: yFun(x)
	    };
	  });
	}

	module.exports = makeCurve;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _d = __webpack_require__(1);

	var d3 = _interopRequireWildcard(_d);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// function to draw projects section.
	function drawProjects(projData) {
	  d3.select('#projectsDiv').selectAll('.project').data(projData).enter().append('div').attr('class', function (d, i) {
	    return i == 0 ? 'row' : 'row project';
	  }).each(function (proj) {
	    // draw picture
	    var pic = d3.select(this).append('div').attr('class', 'col-xs-12 col-sm-6 text-center');

	    pic.append('a').attr('href', proj.link).append('img').attr('class', 'projectPic').attr('src', proj.photo);

	    // generate the title and descriptions
	    var projDescrip = d3.select(this) // make the holder.
	    .append('div').attr('class', 'col-xs-12 col-sm-6');

	    projDescrip.append('strong') // append the title.
	    .attr('class', 'projectTitle').append('a').attr('href', proj.link).attr('target', '_blank').text(proj.title);

	    projDescrip.append('ul') // append the description bullet point list
	    .selectAll('li').data(proj.descriptions).enter().append('li').html(function (d) {
	      return d;
	    });

	    if (proj.github != null) {
	      projDescrip.select('ul') // append github repo to end of list
	      .append('li').append('a').attr('href', proj.github).text('Github repo.');
	    }
	  });
	}

	module.exports = drawProjects;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _d = __webpack_require__(1);

	var d3 = _interopRequireWildcard(_d);

	var _Particle = __webpack_require__(2);

	var _Particle2 = _interopRequireDefault(_Particle);

	var _makeCurve = __webpack_require__(3);

	var _makeCurve2 = _interopRequireDefault(_makeCurve);

	var _drawProjects = __webpack_require__(4);

	var _drawProjects2 = _interopRequireDefault(_drawProjects);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function particleViz(divId) {
	  // Constants.
	  var numParticles = 800;
	  var pointRadius = 5;
	  var margin = { top: 50, right: 50, bottom: 50, left: 50 };
	  var pixelRatio = window.devicePixelRatio;
	  var curveData = (0, _makeCurve2.default)({
	    n: numParticles,
	    min: 0,
	    max: 6 * Math.PI,
	    yFun: Math.cos
	  });

	  // Set up the canvas and grab the context.
	  var canvasSel = d3.select(divId).append('canvas').attr('id', 'particles');
	  var canvas = canvasSel.node();
	  var context = canvas.getContext('2d');

	  // Small helper functions
	  // We multiply by the pixel ratio because otherwise retina screens look blurry.
	  var getWw = function getWw() {
	    return canvas.width = window.innerWidth * pixelRatio;
	  };
	  var getWh = function getWh() {
	    return canvas.height = 0.9 * window.innerHeight * pixelRatio;
	  };
	  var width = getWw();
	  var height = getWh();

	  // Declare some variables we mutate later (I know I Know)
	  var particles = void 0;
	  var mouse = {
	    x: -9999,
	    y: -9999
	  };

	  // setup scales.
	  var xScale = d3.scaleLinear().domain(d3.extent(curveData, function (d) {
	    return d.x;
	  }));
	  var yScale = d3.scaleLinear().domain(d3.extent(curveData, function (d) {
	    return d.y;
	  }));

	  function setScalesRanges(xScale, yScale) {
	    xScale.range([margin.left, width - margin.right]);
	    yScale.range([height - margin.top, margin.bottom]);
	  }

	  function render() {
	    requestAnimationFrame(render);
	    context.clearRect(0, 0, width, height);
	    for (var i = 0; i < numParticles; i++) {
	      particles[i].render({ context: context, width: width, height: height, mouse: mouse });
	    }
	  }

	  var canvasDom = document.getElementById('particles');

	  function onMouseMove(e) {
	    var boundingBox = canvasDom.getBoundingClientRect();
	    mouse.x = (event.clientX - boundingBox.left) * pixelRatio;
	    mouse.y = (event.clientY - boundingBox.top) * pixelRatio;
	  }

	  function onTouchMove(e) {
	    if (e.touches.length > 0) {
	      mouse.x = e.touches[0].clientX * pixelRatio;
	      mouse.y = e.touches[0].clientY * pixelRatio;
	    }
	  }

	  function onTouchEnd(e) {
	    mouse.x = -9999;
	    mouse.y = -9999;
	  }

	  window.addEventListener('resize', pageResize);
	  window.addEventListener('mousemove', onMouseMove);
	  window.addEventListener('touchmove', onTouchMove);
	  window.addEventListener('touchend', onTouchEnd);

	  function pageResize() {
	    // grab new dimensions
	    width = getWw();
	    height = getWh();

	    // redo the canvas for new size.
	    canvasSel.style('width', width / pixelRatio + 'px').style('height', height / devicePixelRatio + 'px');

	    // redo scale ranges
	    setScalesRanges(xScale, yScale);

	    // assign the new destinations based upon the updated scales.
	    particles.forEach(function (particle) {
	      return particle.resize({ xScale: xScale, yScale: yScale });
	    });
	  }

	  function startScene() {
	    width = getWw();
	    height = getWh();

	    // Set up the canvas for retina.
	    canvasSel.style('width', width / pixelRatio + 'px').style('height', height / devicePixelRatio + 'px');

	    setScalesRanges(xScale, yScale);

	    particles = curveData.map(function (d) {
	      return new _Particle2.default({
	        x: d.x,
	        y: d.y,
	        xScale: xScale,
	        yScale: yScale,
	        pointRadius: pointRadius
	      });
	    });
	    render();
	  }

	  return { startScene: startScene };
	}
	module.exports = particleViz;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * jQuery JavaScript Library v3.2.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright JS Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2017-03-20T18:59Z
	 */
	(function (global, factory) {

		"use strict";

		if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ? factory(global, true) : function (w) {
				if (!w.document) {
					throw new Error("jQuery requires a window with a document");
				}
				return factory(w);
			};
		} else {
			factory(global);
		}

		// Pass this if window is not defined yet
	})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

		// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
		// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
		// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
		// enough that all such attempts are guarded in a try block.
		"use strict";

		var arr = [];

		var document = window.document;

		var getProto = Object.getPrototypeOf;

		var _slice = arr.slice;

		var concat = arr.concat;

		var push = arr.push;

		var indexOf = arr.indexOf;

		var class2type = {};

		var toString = class2type.toString;

		var hasOwn = class2type.hasOwnProperty;

		var fnToString = hasOwn.toString;

		var ObjectFunctionString = fnToString.call(Object);

		var support = {};

		function DOMEval(code, doc) {
			doc = doc || document;

			var script = doc.createElement("script");

			script.text = code;
			doc.head.appendChild(script).parentNode.removeChild(script);
		}
		/* global Symbol */
		// Defining this global in .eslintrc.json would create a danger of using the global
		// unguarded in another place, it seems safer to define global only for this module


		var version = "3.2.1",


		// Define a local copy of jQuery
		jQuery = function jQuery(selector, context) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init(selector, context);
		},


		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		    rdashAlpha = /-([a-z])/g,


		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function fcamelCase(all, letter) {
			return letter.toUpperCase();
		};

		jQuery.fn = jQuery.prototype = {

			// The current version of jQuery being used
			jquery: version,

			constructor: jQuery,

			// The default length of a jQuery object is 0
			length: 0,

			toArray: function toArray() {
				return _slice.call(this);
			},

			// Get the Nth element in the matched element set OR
			// Get the whole matched element set as a clean array
			get: function get(num) {

				// Return all the elements in a clean array
				if (num == null) {
					return _slice.call(this);
				}

				// Return just the one element from the set
				return num < 0 ? this[num + this.length] : this[num];
			},

			// Take an array of elements and push it onto the stack
			// (returning the new matched element set)
			pushStack: function pushStack(elems) {

				// Build a new jQuery matched element set
				var ret = jQuery.merge(this.constructor(), elems);

				// Add the old object onto the stack (as a reference)
				ret.prevObject = this;

				// Return the newly-formed element set
				return ret;
			},

			// Execute a callback for every element in the matched set.
			each: function each(callback) {
				return jQuery.each(this, callback);
			},

			map: function map(callback) {
				return this.pushStack(jQuery.map(this, function (elem, i) {
					return callback.call(elem, i, elem);
				}));
			},

			slice: function slice() {
				return this.pushStack(_slice.apply(this, arguments));
			},

			first: function first() {
				return this.eq(0);
			},

			last: function last() {
				return this.eq(-1);
			},

			eq: function eq(i) {
				var len = this.length,
				    j = +i + (i < 0 ? len : 0);
				return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
			},

			end: function end() {
				return this.prevObject || this.constructor();
			},

			// For internal use only.
			// Behaves like an Array's method, not like a jQuery method.
			push: push,
			sort: arr.sort,
			splice: arr.splice
		};

		jQuery.extend = jQuery.fn.extend = function () {
			var options,
			    name,
			    src,
			    copy,
			    copyIsArray,
			    clone,
			    target = arguments[0] || {},
			    i = 1,
			    length = arguments.length,
			    deep = false;

			// Handle a deep copy situation
			if (typeof target === "boolean") {
				deep = target;

				// Skip the boolean and the target
				target = arguments[i] || {};
				i++;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
				target = {};
			}

			// Extend jQuery itself if only one argument is passed
			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {

				// Only deal with non-null/undefined values
				if ((options = arguments[i]) != null) {

					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

							if (copyIsArray) {
								copyIsArray = false;
								clone = src && Array.isArray(src) ? src : [];
							} else {
								clone = src && jQuery.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = jQuery.extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		};

		jQuery.extend({

			// Unique for each copy of jQuery on the page
			expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

			// Assume jQuery is ready without the ready module
			isReady: true,

			error: function error(msg) {
				throw new Error(msg);
			},

			noop: function noop() {},

			isFunction: function isFunction(obj) {
				return jQuery.type(obj) === "function";
			},

			isWindow: function isWindow(obj) {
				return obj != null && obj === obj.window;
			},

			isNumeric: function isNumeric(obj) {

				// As of jQuery 3.0, isNumeric is limited to
				// strings and numbers (primitives or objects)
				// that can be coerced to finite numbers (gh-2662)
				var type = jQuery.type(obj);
				return (type === "number" || type === "string") &&

				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN(obj - parseFloat(obj));
			},

			isPlainObject: function isPlainObject(obj) {
				var proto, Ctor;

				// Detect obvious negatives
				// Use toString instead of jQuery.type to catch host objects
				if (!obj || toString.call(obj) !== "[object Object]") {
					return false;
				}

				proto = getProto(obj);

				// Objects with no prototype (e.g., `Object.create( null )`) are plain
				if (!proto) {
					return true;
				}

				// Objects with prototype are plain iff they were constructed by a global Object function
				Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
				return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
			},

			isEmptyObject: function isEmptyObject(obj) {

				/* eslint-disable no-unused-vars */
				// See https://github.com/eslint/eslint/issues/6125
				var name;

				for (name in obj) {
					return false;
				}
				return true;
			},

			type: function type(obj) {
				if (obj == null) {
					return obj + "";
				}

				// Support: Android <=2.3 only (functionish RegExp)
				return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
			},

			// Evaluates a script in a global context
			globalEval: function globalEval(code) {
				DOMEval(code);
			},

			// Convert dashed to camelCase; used by the css and data modules
			// Support: IE <=9 - 11, Edge 12 - 13
			// Microsoft forgot to hump their vendor prefix (#9572)
			camelCase: function camelCase(string) {
				return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
			},

			each: function each(obj, callback) {
				var length,
				    i = 0;

				if (isArrayLike(obj)) {
					length = obj.length;
					for (; i < length; i++) {
						if (callback.call(obj[i], i, obj[i]) === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						if (callback.call(obj[i], i, obj[i]) === false) {
							break;
						}
					}
				}

				return obj;
			},

			// Support: Android <=4.0 only
			trim: function trim(text) {
				return text == null ? "" : (text + "").replace(rtrim, "");
			},

			// results is for internal usage only
			makeArray: function makeArray(arr, results) {
				var ret = results || [];

				if (arr != null) {
					if (isArrayLike(Object(arr))) {
						jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
					} else {
						push.call(ret, arr);
					}
				}

				return ret;
			},

			inArray: function inArray(elem, arr, i) {
				return arr == null ? -1 : indexOf.call(arr, elem, i);
			},

			// Support: Android <=4.0 only, PhantomJS 1 only
			// push.apply(_, arraylike) throws on ancient WebKit
			merge: function merge(first, second) {
				var len = +second.length,
				    j = 0,
				    i = first.length;

				for (; j < len; j++) {
					first[i++] = second[j];
				}

				first.length = i;

				return first;
			},

			grep: function grep(elems, callback, invert) {
				var callbackInverse,
				    matches = [],
				    i = 0,
				    length = elems.length,
				    callbackExpect = !invert;

				// Go through the array, only saving the items
				// that pass the validator function
				for (; i < length; i++) {
					callbackInverse = !callback(elems[i], i);
					if (callbackInverse !== callbackExpect) {
						matches.push(elems[i]);
					}
				}

				return matches;
			},

			// arg is for internal usage only
			map: function map(elems, callback, arg) {
				var length,
				    value,
				    i = 0,
				    ret = [];

				// Go through the array, translating each of the items to their new values
				if (isArrayLike(elems)) {
					length = elems.length;
					for (; i < length; i++) {
						value = callback(elems[i], i, arg);

						if (value != null) {
							ret.push(value);
						}
					}

					// Go through every key on the object,
				} else {
					for (i in elems) {
						value = callback(elems[i], i, arg);

						if (value != null) {
							ret.push(value);
						}
					}
				}

				// Flatten any nested arrays
				return concat.apply([], ret);
			},

			// A global GUID counter for objects
			guid: 1,

			// Bind a function to a context, optionally partially applying any
			// arguments.
			proxy: function proxy(fn, context) {
				var tmp, args, proxy;

				if (typeof context === "string") {
					tmp = fn[context];
					context = fn;
					fn = tmp;
				}

				// Quick check to determine if target is callable, in the spec
				// this throws a TypeError, but we will just return undefined.
				if (!jQuery.isFunction(fn)) {
					return undefined;
				}

				// Simulated bind
				args = _slice.call(arguments, 2);
				proxy = function proxy() {
					return fn.apply(context || this, args.concat(_slice.call(arguments)));
				};

				// Set the guid of unique handler to the same of original handler, so it can be removed
				proxy.guid = fn.guid = fn.guid || jQuery.guid++;

				return proxy;
			},

			now: Date.now,

			// jQuery.support is not used in Core but other projects attach their
			// properties to it so it needs to exist.
			support: support
		});

		if (typeof Symbol === "function") {
			jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
		}

		// Populate the class2type map
		jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});

		function isArrayLike(obj) {

			// Support: real iOS 8.2 only (not reproducible in simulator)
			// `in` check used to prevent JIT error (gh-2145)
			// hasOwn isn't used here due to false negatives
			// regarding Nodelist length in IE
			var length = !!obj && "length" in obj && obj.length,
			    type = jQuery.type(obj);

			if (type === "function" || jQuery.isWindow(obj)) {
				return false;
			}

			return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
		}
		var Sizzle =
		/*!
	  * Sizzle CSS Selector Engine v2.3.3
	  * https://sizzlejs.com/
	  *
	  * Copyright jQuery Foundation and other contributors
	  * Released under the MIT license
	  * http://jquery.org/license
	  *
	  * Date: 2016-08-08
	  */
		function (window) {

			var i,
			    support,
			    Expr,
			    getText,
			    isXML,
			    tokenize,
			    compile,
			    select,
			    outermostContext,
			    sortInput,
			    hasDuplicate,


			// Local document vars
			setDocument,
			    document,
			    docElem,
			    documentIsHTML,
			    rbuggyQSA,
			    rbuggyMatches,
			    matches,
			    contains,


			// Instance-specific data
			expando = "sizzle" + 1 * new Date(),
			    preferredDoc = window.document,
			    dirruns = 0,
			    done = 0,
			    classCache = createCache(),
			    tokenCache = createCache(),
			    compilerCache = createCache(),
			    sortOrder = function sortOrder(a, b) {
				if (a === b) {
					hasDuplicate = true;
				}
				return 0;
			},


			// Instance methods
			hasOwn = {}.hasOwnProperty,
			    arr = [],
			    pop = arr.pop,
			    push_native = arr.push,
			    push = arr.push,
			    slice = arr.slice,

			// Use a stripped-down indexOf as it's faster than native
			// https://jsperf.com/thor-indexof-vs-for/5
			indexOf = function indexOf(list, elem) {
				var i = 0,
				    len = list.length;
				for (; i < len; i++) {
					if (list[i] === elem) {
						return i;
					}
				}
				return -1;
			},
			    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


			// Regular expressions

			// http://www.w3.org/TR/css3-selectors/#whitespace
			whitespace = "[\\x20\\t\\r\\n\\f]",


			// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
			identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",


			// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
			attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
			    pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" + ")\\)|)",


			// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
			rwhitespace = new RegExp(whitespace + "+", "g"),
			    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
			    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
			    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
			    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
			    rpseudo = new RegExp(pseudos),
			    ridentifier = new RegExp("^" + identifier + "$"),
			    matchExpr = {
				"ID": new RegExp("^#(" + identifier + ")"),
				"CLASS": new RegExp("^\\.(" + identifier + ")"),
				"TAG": new RegExp("^(" + identifier + "|[*])"),
				"ATTR": new RegExp("^" + attributes),
				"PSEUDO": new RegExp("^" + pseudos),
				"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
				"bool": new RegExp("^(?:" + booleans + ")$", "i"),
				// For use in libraries implementing .is()
				// We use this for POS matching in `select`
				"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
			},
			    rinputs = /^(?:input|select|textarea|button)$/i,
			    rheader = /^h\d$/i,
			    rnative = /^[^{]+\{\s*\[native \w/,


			// Easily-parseable/retrievable ID or TAG or CLASS selectors
			rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			    rsibling = /[+~]/,


			// CSS escapes
			// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
			runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
			    funescape = function funescape(_, escaped, escapedWhitespace) {
				var high = "0x" + escaped - 0x10000;
				// NaN means non-codepoint
				// Support: Firefox<24
				// Workaround erroneous numeric interpretation of +"0x"
				return high !== high || escapedWhitespace ? escaped : high < 0 ?
				// BMP codepoint
				String.fromCharCode(high + 0x10000) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
			},


			// CSS string/identifier serialization
			// https://drafts.csswg.org/cssom/#common-serializing-idioms
			rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
			    fcssescape = function fcssescape(ch, asCodePoint) {
				if (asCodePoint) {

					// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
					if (ch === "\0") {
						return "\uFFFD";
					}

					// Control characters and (dependent upon position) numbers get escaped as code points
					return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
				}

				// Other potentially-special ASCII characters get backslash-escaped
				return "\\" + ch;
			},


			// Used for iframes
			// See setDocument()
			// Removing the function wrapper causes a "Permission Denied"
			// error in IE
			unloadHandler = function unloadHandler() {
				setDocument();
			},
			    disabledAncestor = addCombinator(function (elem) {
				return elem.disabled === true && ("form" in elem || "label" in elem);
			}, { dir: "parentNode", next: "legend" });

			// Optimize for push.apply( _, NodeList )
			try {
				push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
				// Support: Android<4.0
				// Detect silently failing push.apply
				arr[preferredDoc.childNodes.length].nodeType;
			} catch (e) {
				push = { apply: arr.length ?

					// Leverage slice if possible
					function (target, els) {
						push_native.apply(target, slice.call(els));
					} :

					// Support: IE<9
					// Otherwise append directly
					function (target, els) {
						var j = target.length,
						    i = 0;
						// Can't trust NodeList.length
						while (target[j++] = els[i++]) {}
						target.length = j - 1;
					}
				};
			}

			function Sizzle(selector, context, results, seed) {
				var m,
				    i,
				    elem,
				    nid,
				    match,
				    groups,
				    newSelector,
				    newContext = context && context.ownerDocument,


				// nodeType defaults to 9, since context defaults to document
				nodeType = context ? context.nodeType : 9;

				results = results || [];

				// Return early from calls with invalid selector or context
				if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

					return results;
				}

				// Try to shortcut find operations (as opposed to filters) in HTML documents
				if (!seed) {

					if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
						setDocument(context);
					}
					context = context || document;

					if (documentIsHTML) {

						// If the selector is sufficiently simple, try using a "get*By*" DOM method
						// (excepting DocumentFragment context, where the methods don't exist)
						if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

							// ID selector
							if (m = match[1]) {

								// Document context
								if (nodeType === 9) {
									if (elem = context.getElementById(m)) {

										// Support: IE, Opera, Webkit
										// TODO: identify versions
										// getElementById can match elements by name instead of ID
										if (elem.id === m) {
											results.push(elem);
											return results;
										}
									} else {
										return results;
									}

									// Element context
								} else {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

										results.push(elem);
										return results;
									}
								}

								// Type selector
							} else if (match[2]) {
								push.apply(results, context.getElementsByTagName(selector));
								return results;

								// Class selector
							} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

								push.apply(results, context.getElementsByClassName(m));
								return results;
							}
						}

						// Take advantage of querySelectorAll
						if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

							if (nodeType !== 1) {
								newContext = context;
								newSelector = selector;

								// qSA looks outside Element context, which is not what we want
								// Thanks to Andrew Dupont for this workaround technique
								// Support: IE <=8
								// Exclude object elements
							} else if (context.nodeName.toLowerCase() !== "object") {

								// Capture the context ID, setting it first if necessary
								if (nid = context.getAttribute("id")) {
									nid = nid.replace(rcssescape, fcssescape);
								} else {
									context.setAttribute("id", nid = expando);
								}

								// Prefix every selector in the list
								groups = tokenize(selector);
								i = groups.length;
								while (i--) {
									groups[i] = "#" + nid + " " + toSelector(groups[i]);
								}
								newSelector = groups.join(",");

								// Expand context for sibling selectors
								newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
							}

							if (newSelector) {
								try {
									push.apply(results, newContext.querySelectorAll(newSelector));
									return results;
								} catch (qsaError) {} finally {
									if (nid === expando) {
										context.removeAttribute("id");
									}
								}
							}
						}
					}
				}

				// All others
				return select(selector.replace(rtrim, "$1"), context, results, seed);
			}

			/**
	   * Create key-value caches of limited size
	   * @returns {function(string, object)} Returns the Object data after storing it on itself with
	   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	   *	deleting the oldest entry
	   */
			function createCache() {
				var keys = [];

				function cache(key, value) {
					// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
					if (keys.push(key + " ") > Expr.cacheLength) {
						// Only keep the most recent entries
						delete cache[keys.shift()];
					}
					return cache[key + " "] = value;
				}
				return cache;
			}

			/**
	   * Mark a function for special use by Sizzle
	   * @param {Function} fn The function to mark
	   */
			function markFunction(fn) {
				fn[expando] = true;
				return fn;
			}

			/**
	   * Support testing using an element
	   * @param {Function} fn Passed the created element and returns a boolean result
	   */
			function assert(fn) {
				var el = document.createElement("fieldset");

				try {
					return !!fn(el);
				} catch (e) {
					return false;
				} finally {
					// Remove from its parent by default
					if (el.parentNode) {
						el.parentNode.removeChild(el);
					}
					// release memory in IE
					el = null;
				}
			}

			/**
	   * Adds the same handler for all of the specified attrs
	   * @param {String} attrs Pipe-separated list of attributes
	   * @param {Function} handler The method that will be applied
	   */
			function addHandle(attrs, handler) {
				var arr = attrs.split("|"),
				    i = arr.length;

				while (i--) {
					Expr.attrHandle[arr[i]] = handler;
				}
			}

			/**
	   * Checks document order of two siblings
	   * @param {Element} a
	   * @param {Element} b
	   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	   */
			function siblingCheck(a, b) {
				var cur = b && a,
				    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

				// Use IE sourceIndex if available on both nodes
				if (diff) {
					return diff;
				}

				// Check if b follows a
				if (cur) {
					while (cur = cur.nextSibling) {
						if (cur === b) {
							return -1;
						}
					}
				}

				return a ? 1 : -1;
			}

			/**
	   * Returns a function to use in pseudos for input types
	   * @param {String} type
	   */
			function createInputPseudo(type) {
				return function (elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === type;
				};
			}

			/**
	   * Returns a function to use in pseudos for buttons
	   * @param {String} type
	   */
			function createButtonPseudo(type) {
				return function (elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button") && elem.type === type;
				};
			}

			/**
	   * Returns a function to use in pseudos for :enabled/:disabled
	   * @param {Boolean} disabled true for :disabled; false for :enabled
	   */
			function createDisabledPseudo(disabled) {

				// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
				return function (elem) {

					// Only certain elements can match :enabled or :disabled
					// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
					// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
					if ("form" in elem) {

						// Check for inherited disabledness on relevant non-disabled elements:
						// * listed form-associated elements in a disabled fieldset
						//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
						//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
						// * option elements in a disabled optgroup
						//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
						// All such elements have a "form" property.
						if (elem.parentNode && elem.disabled === false) {

							// Option elements defer to a parent optgroup if present
							if ("label" in elem) {
								if ("label" in elem.parentNode) {
									return elem.parentNode.disabled === disabled;
								} else {
									return elem.disabled === disabled;
								}
							}

							// Support: IE 6 - 11
							// Use the isDisabled shortcut property to check for disabled fieldset ancestors
							return elem.isDisabled === disabled ||

							// Where there is no isDisabled, check manually
							/* jshint -W018 */
							elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
						}

						return elem.disabled === disabled;

						// Try to winnow out elements that can't be disabled before trusting the disabled property.
						// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
						// even exist on them, let alone have a boolean value.
					} else if ("label" in elem) {
						return elem.disabled === disabled;
					}

					// Remaining elements are neither :enabled nor :disabled
					return false;
				};
			}

			/**
	   * Returns a function to use in pseudos for positionals
	   * @param {Function} fn
	   */
			function createPositionalPseudo(fn) {
				return markFunction(function (argument) {
					argument = +argument;
					return markFunction(function (seed, matches) {
						var j,
						    matchIndexes = fn([], seed.length, argument),
						    i = matchIndexes.length;

						// Match elements found at the specified indexes
						while (i--) {
							if (seed[j = matchIndexes[i]]) {
								seed[j] = !(matches[j] = seed[j]);
							}
						}
					});
				});
			}

			/**
	   * Checks a node for validity as a Sizzle context
	   * @param {Element|Object=} context
	   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	   */
			function testContext(context) {
				return context && typeof context.getElementsByTagName !== "undefined" && context;
			}

			// Expose support vars for convenience
			support = Sizzle.support = {};

			/**
	   * Detects XML nodes
	   * @param {Element|Object} elem An element or a document
	   * @returns {Boolean} True iff elem is a non-HTML XML node
	   */
			isXML = Sizzle.isXML = function (elem) {
				// documentElement is verified for cases where it doesn't yet exist
				// (such as loading iframes in IE - #4833)
				var documentElement = elem && (elem.ownerDocument || elem).documentElement;
				return documentElement ? documentElement.nodeName !== "HTML" : false;
			};

			/**
	   * Sets document-related variables once based on the current document
	   * @param {Element|Object} [doc] An element or document object to use to set the document
	   * @returns {Object} Returns the current document
	   */
			setDocument = Sizzle.setDocument = function (node) {
				var hasCompare,
				    subWindow,
				    doc = node ? node.ownerDocument || node : preferredDoc;

				// Return early if doc is invalid or already selected
				if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
					return document;
				}

				// Update global variables
				document = doc;
				docElem = document.documentElement;
				documentIsHTML = !isXML(document);

				// Support: IE 9-11, Edge
				// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
				if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {

					// Support: IE 11, Edge
					if (subWindow.addEventListener) {
						subWindow.addEventListener("unload", unloadHandler, false);

						// Support: IE 9 - 10 only
					} else if (subWindow.attachEvent) {
						subWindow.attachEvent("onunload", unloadHandler);
					}
				}

				/* Attributes
	   ---------------------------------------------------------------------- */

				// Support: IE<8
				// Verify that getAttribute really returns attributes and not properties
				// (excepting IE8 booleans)
				support.attributes = assert(function (el) {
					el.className = "i";
					return !el.getAttribute("className");
				});

				/* getElement(s)By*
	   ---------------------------------------------------------------------- */

				// Check if getElementsByTagName("*") returns only elements
				support.getElementsByTagName = assert(function (el) {
					el.appendChild(document.createComment(""));
					return !el.getElementsByTagName("*").length;
				});

				// Support: IE<9
				support.getElementsByClassName = rnative.test(document.getElementsByClassName);

				// Support: IE<10
				// Check if getElementById returns elements by name
				// The broken getElementById methods don't pick up programmatically-set names,
				// so use a roundabout getElementsByName test
				support.getById = assert(function (el) {
					docElem.appendChild(el).id = expando;
					return !document.getElementsByName || !document.getElementsByName(expando).length;
				});

				// ID filter and find
				if (support.getById) {
					Expr.filter["ID"] = function (id) {
						var attrId = id.replace(runescape, funescape);
						return function (elem) {
							return elem.getAttribute("id") === attrId;
						};
					};
					Expr.find["ID"] = function (id, context) {
						if (typeof context.getElementById !== "undefined" && documentIsHTML) {
							var elem = context.getElementById(id);
							return elem ? [elem] : [];
						}
					};
				} else {
					Expr.filter["ID"] = function (id) {
						var attrId = id.replace(runescape, funescape);
						return function (elem) {
							var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
							return node && node.value === attrId;
						};
					};

					// Support: IE 6 - 7 only
					// getElementById is not reliable as a find shortcut
					Expr.find["ID"] = function (id, context) {
						if (typeof context.getElementById !== "undefined" && documentIsHTML) {
							var node,
							    i,
							    elems,
							    elem = context.getElementById(id);

							if (elem) {

								// Verify the id attribute
								node = elem.getAttributeNode("id");
								if (node && node.value === id) {
									return [elem];
								}

								// Fall back on getElementsByName
								elems = context.getElementsByName(id);
								i = 0;
								while (elem = elems[i++]) {
									node = elem.getAttributeNode("id");
									if (node && node.value === id) {
										return [elem];
									}
								}
							}

							return [];
						}
					};
				}

				// Tag
				Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
					if (typeof context.getElementsByTagName !== "undefined") {
						return context.getElementsByTagName(tag);

						// DocumentFragment nodes don't have gEBTN
					} else if (support.qsa) {
						return context.querySelectorAll(tag);
					}
				} : function (tag, context) {
					var elem,
					    tmp = [],
					    i = 0,

					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName(tag);

					// Filter out possible comments
					if (tag === "*") {
						while (elem = results[i++]) {
							if (elem.nodeType === 1) {
								tmp.push(elem);
							}
						}

						return tmp;
					}
					return results;
				};

				// Class
				Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
					if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
						return context.getElementsByClassName(className);
					}
				};

				/* QSA/matchesSelector
	   ---------------------------------------------------------------------- */

				// QSA and matchesSelector support

				// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
				rbuggyMatches = [];

				// qSa(:focus) reports false when true (Chrome 21)
				// We allow this because of a bug in IE8/9 that throws an error
				// whenever `document.activeElement` is accessed on an iframe
				// So, we allow :focus to pass through QSA all the time to avoid the IE error
				// See https://bugs.jquery.com/ticket/13378
				rbuggyQSA = [];

				if (support.qsa = rnative.test(document.querySelectorAll)) {
					// Build QSA regex
					// Regex strategy adopted from Diego Perini
					assert(function (el) {
						// Select is set to empty string on purpose
						// This is to test IE's treatment of not explicitly
						// setting a boolean content attribute,
						// since its presence should be enough
						// https://bugs.jquery.com/ticket/12359
						docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

						// Support: IE8, Opera 11-12.16
						// Nothing should be selected when empty strings follow ^= or $= or *=
						// The test attribute must be unknown in Opera but "safe" for WinRT
						// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
						if (el.querySelectorAll("[msallowcapture^='']").length) {
							rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
						}

						// Support: IE8
						// Boolean attributes and "value" are not treated correctly
						if (!el.querySelectorAll("[selected]").length) {
							rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
						}

						// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
						if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
							rbuggyQSA.push("~=");
						}

						// Webkit/Opera - :checked should return selected option elements
						// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						// IE8 throws error here and will not see later tests
						if (!el.querySelectorAll(":checked").length) {
							rbuggyQSA.push(":checked");
						}

						// Support: Safari 8+, iOS 8+
						// https://bugs.webkit.org/show_bug.cgi?id=136851
						// In-page `selector#id sibling-combinator selector` fails
						if (!el.querySelectorAll("a#" + expando + "+*").length) {
							rbuggyQSA.push(".#.+[+~]");
						}
					});

					assert(function (el) {
						el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

						// Support: Windows 8 Native Apps
						// The type and name attributes are restricted during .innerHTML assignment
						var input = document.createElement("input");
						input.setAttribute("type", "hidden");
						el.appendChild(input).setAttribute("name", "D");

						// Support: IE8
						// Enforce case-sensitivity of name attribute
						if (el.querySelectorAll("[name=d]").length) {
							rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
						}

						// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
						// IE8 throws error here and will not see later tests
						if (el.querySelectorAll(":enabled").length !== 2) {
							rbuggyQSA.push(":enabled", ":disabled");
						}

						// Support: IE9-11+
						// IE's :disabled selector does not pick up the children of disabled fieldsets
						docElem.appendChild(el).disabled = true;
						if (el.querySelectorAll(":disabled").length !== 2) {
							rbuggyQSA.push(":enabled", ":disabled");
						}

						// Opera 10-11 does not throw on post-comma invalid pseudos
						el.querySelectorAll("*,:x");
						rbuggyQSA.push(",.*:");
					});
				}

				if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

					assert(function (el) {
						// Check to see if it's possible to do matchesSelector
						// on a disconnected node (IE 9)
						support.disconnectedMatch = matches.call(el, "*");

						// This should fail with an exception
						// Gecko does not error, returns false instead
						matches.call(el, "[s!='']:x");
						rbuggyMatches.push("!=", pseudos);
					});
				}

				rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
				rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

				/* Contains
	   ---------------------------------------------------------------------- */
				hasCompare = rnative.test(docElem.compareDocumentPosition);

				// Element contains another
				// Purposefully self-exclusive
				// As in, an element does not contain itself
				contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
					var adown = a.nodeType === 9 ? a.documentElement : a,
					    bup = b && b.parentNode;
					return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
				} : function (a, b) {
					if (b) {
						while (b = b.parentNode) {
							if (b === a) {
								return true;
							}
						}
					}
					return false;
				};

				/* Sorting
	   ---------------------------------------------------------------------- */

				// Document order sorting
				sortOrder = hasCompare ? function (a, b) {

					// Flag for duplicate removal
					if (a === b) {
						hasDuplicate = true;
						return 0;
					}

					// Sort on method existence if only one input has compareDocumentPosition
					var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
					if (compare) {
						return compare;
					}

					// Calculate position if both inputs belong to the same document
					compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

					// Otherwise we know they are disconnected
					1;

					// Disconnected nodes
					if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

						// Choose the first element that is related to our preferred document
						if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
							return -1;
						}
						if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
							return 1;
						}

						// Maintain original order
						return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
					}

					return compare & 4 ? -1 : 1;
				} : function (a, b) {
					// Exit early if the nodes are identical
					if (a === b) {
						hasDuplicate = true;
						return 0;
					}

					var cur,
					    i = 0,
					    aup = a.parentNode,
					    bup = b.parentNode,
					    ap = [a],
					    bp = [b];

					// Parentless nodes are either documents or disconnected
					if (!aup || !bup) {
						return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

						// If the nodes are siblings, we can do a quick check
					} else if (aup === bup) {
						return siblingCheck(a, b);
					}

					// Otherwise we need full lists of their ancestors for comparison
					cur = a;
					while (cur = cur.parentNode) {
						ap.unshift(cur);
					}
					cur = b;
					while (cur = cur.parentNode) {
						bp.unshift(cur);
					}

					// Walk down the tree looking for a discrepancy
					while (ap[i] === bp[i]) {
						i++;
					}

					return i ?
					// Do a sibling check if the nodes have a common ancestor
					siblingCheck(ap[i], bp[i]) :

					// Otherwise nodes in our document sort first
					ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
				};

				return document;
			};

			Sizzle.matches = function (expr, elements) {
				return Sizzle(expr, null, null, elements);
			};

			Sizzle.matchesSelector = function (elem, expr) {
				// Set document vars if needed
				if ((elem.ownerDocument || elem) !== document) {
					setDocument(elem);
				}

				// Make sure that attribute selectors are quoted
				expr = expr.replace(rattributeQuotes, "='$1']");

				if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

					try {
						var ret = matches.call(elem, expr);

						// IE 9's matchesSelector returns false on disconnected nodes
						if (ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11) {
							return ret;
						}
					} catch (e) {}
				}

				return Sizzle(expr, document, null, [elem]).length > 0;
			};

			Sizzle.contains = function (context, elem) {
				// Set document vars if needed
				if ((context.ownerDocument || context) !== document) {
					setDocument(context);
				}
				return contains(context, elem);
			};

			Sizzle.attr = function (elem, name) {
				// Set document vars if needed
				if ((elem.ownerDocument || elem) !== document) {
					setDocument(elem);
				}

				var fn = Expr.attrHandle[name.toLowerCase()],

				// Don't get fooled by Object.prototype properties (jQuery #13807)
				val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

				return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
			};

			Sizzle.escape = function (sel) {
				return (sel + "").replace(rcssescape, fcssescape);
			};

			Sizzle.error = function (msg) {
				throw new Error("Syntax error, unrecognized expression: " + msg);
			};

			/**
	   * Document sorting and removing duplicates
	   * @param {ArrayLike} results
	   */
			Sizzle.uniqueSort = function (results) {
				var elem,
				    duplicates = [],
				    j = 0,
				    i = 0;

				// Unless we *know* we can detect duplicates, assume their presence
				hasDuplicate = !support.detectDuplicates;
				sortInput = !support.sortStable && results.slice(0);
				results.sort(sortOrder);

				if (hasDuplicate) {
					while (elem = results[i++]) {
						if (elem === results[i]) {
							j = duplicates.push(i);
						}
					}
					while (j--) {
						results.splice(duplicates[j], 1);
					}
				}

				// Clear input after sorting to release objects
				// See https://github.com/jquery/sizzle/pull/225
				sortInput = null;

				return results;
			};

			/**
	   * Utility function for retrieving the text value of an array of DOM nodes
	   * @param {Array|Element} elem
	   */
			getText = Sizzle.getText = function (elem) {
				var node,
				    ret = "",
				    i = 0,
				    nodeType = elem.nodeType;

				if (!nodeType) {
					// If no nodeType, this is expected to be an array
					while (node = elem[i++]) {
						// Do not traverse comment nodes
						ret += getText(node);
					}
				} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
					// Use textContent for elements
					// innerText usage removed for consistency of new lines (jQuery #11153)
					if (typeof elem.textContent === "string") {
						return elem.textContent;
					} else {
						// Traverse its children
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							ret += getText(elem);
						}
					}
				} else if (nodeType === 3 || nodeType === 4) {
					return elem.nodeValue;
				}
				// Do not include comment or processing instruction nodes

				return ret;
			};

			Expr = Sizzle.selectors = {

				// Can be adjusted by the user
				cacheLength: 50,

				createPseudo: markFunction,

				match: matchExpr,

				attrHandle: {},

				find: {},

				relative: {
					">": { dir: "parentNode", first: true },
					" ": { dir: "parentNode" },
					"+": { dir: "previousSibling", first: true },
					"~": { dir: "previousSibling" }
				},

				preFilter: {
					"ATTR": function ATTR(match) {
						match[1] = match[1].replace(runescape, funescape);

						// Move the given value to match[3] whether quoted or unquoted
						match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

						if (match[2] === "~=") {
							match[3] = " " + match[3] + " ";
						}

						return match.slice(0, 4);
					},

					"CHILD": function CHILD(match) {
						/* matches from matchExpr["CHILD"]
	     	1 type (only|nth|...)
	     	2 what (child|of-type)
	     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
	     	4 xn-component of xn+y argument ([+-]?\d*n|)
	     	5 sign of xn-component
	     	6 x of xn-component
	     	7 sign of y-component
	     	8 y of y-component
	     */
						match[1] = match[1].toLowerCase();

						if (match[1].slice(0, 3) === "nth") {
							// nth-* requires argument
							if (!match[3]) {
								Sizzle.error(match[0]);
							}

							// numeric x and y parameters for Expr.filter.CHILD
							// remember that false/true cast respectively to 0/1
							match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
							match[5] = +(match[7] + match[8] || match[3] === "odd");

							// other types prohibit arguments
						} else if (match[3]) {
							Sizzle.error(match[0]);
						}

						return match;
					},

					"PSEUDO": function PSEUDO(match) {
						var excess,
						    unquoted = !match[6] && match[2];

						if (matchExpr["CHILD"].test(match[0])) {
							return null;
						}

						// Accept quoted arguments as-is
						if (match[3]) {
							match[2] = match[4] || match[5] || "";

							// Strip excess characters from unquoted arguments
						} else if (unquoted && rpseudo.test(unquoted) && (
						// Get excess from tokenize (recursively)
						excess = tokenize(unquoted, true)) && (
						// advance to the next closing parenthesis
						excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

							// excess is a negative index
							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess);
						}

						// Return only captures needed by the pseudo filter method (type and argument)
						return match.slice(0, 3);
					}
				},

				filter: {

					"TAG": function TAG(nodeNameSelector) {
						var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
						return nodeNameSelector === "*" ? function () {
							return true;
						} : function (elem) {
							return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
						};
					},

					"CLASS": function CLASS(className) {
						var pattern = classCache[className + " "];

						return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
							return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
						});
					},

					"ATTR": function ATTR(name, operator, check) {
						return function (elem) {
							var result = Sizzle.attr(elem, name);

							if (result == null) {
								return operator === "!=";
							}
							if (!operator) {
								return true;
							}

							result += "";

							return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
						};
					},

					"CHILD": function CHILD(type, what, argument, first, last) {
						var simple = type.slice(0, 3) !== "nth",
						    forward = type.slice(-4) !== "last",
						    ofType = what === "of-type";

						return first === 1 && last === 0 ?

						// Shortcut for :nth-*(n)
						function (elem) {
							return !!elem.parentNode;
						} : function (elem, context, xml) {
							var cache,
							    uniqueCache,
							    outerCache,
							    node,
							    nodeIndex,
							    start,
							    dir = simple !== forward ? "nextSibling" : "previousSibling",
							    parent = elem.parentNode,
							    name = ofType && elem.nodeName.toLowerCase(),
							    useCache = !xml && !ofType,
							    diff = false;

							if (parent) {

								// :(first|last|only)-(child|of-type)
								if (simple) {
									while (dir) {
										node = elem;
										while (node = node[dir]) {
											if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

												return false;
											}
										}
										// Reverse direction for :only-* (if we haven't yet done so)
										start = dir = type === "only" && !start && "nextSibling";
									}
									return true;
								}

								start = [forward ? parent.firstChild : parent.lastChild];

								// non-xml :nth-child(...) stores cache data on `parent`
								if (forward && useCache) {

									// Seek `elem` from a previously-cached index

									// ...in a gzip-friendly way
									node = parent;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex && cache[2];
									node = nodeIndex && parent.childNodes[nodeIndex];

									while (node = ++nodeIndex && node && node[dir] || (

									// Fallback to seeking `elem` from the start
									diff = nodeIndex = 0) || start.pop()) {

										// When found, cache indexes on `parent` and break
										if (node.nodeType === 1 && ++diff && node === elem) {
											uniqueCache[type] = [dirruns, nodeIndex, diff];
											break;
										}
									}
								} else {
									// Use previously-cached element index if available
									if (useCache) {
										// ...in a gzip-friendly way
										node = elem;
										outerCache = node[expando] || (node[expando] = {});

										// Support: IE <9 only
										// Defend against cloned attroperties (jQuery gh-1709)
										uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

										cache = uniqueCache[type] || [];
										nodeIndex = cache[0] === dirruns && cache[1];
										diff = nodeIndex;
									}

									// xml :nth-child(...)
									// or :nth-last-child(...) or :nth(-last)?-of-type(...)
									if (diff === false) {
										// Use the same loop as above to seek `elem` from the start
										while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

											if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

												// Cache the index of each encountered element
												if (useCache) {
													outerCache = node[expando] || (node[expando] = {});

													// Support: IE <9 only
													// Defend against cloned attroperties (jQuery gh-1709)
													uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

													uniqueCache[type] = [dirruns, diff];
												}

												if (node === elem) {
													break;
												}
											}
										}
									}
								}

								// Incorporate the offset, then check against cycle size
								diff -= last;
								return diff === first || diff % first === 0 && diff / first >= 0;
							}
						};
					},

					"PSEUDO": function PSEUDO(pseudo, argument) {
						// pseudo-class names are case-insensitive
						// http://www.w3.org/TR/selectors/#pseudo-classes
						// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
						// Remember that setFilters inherits from pseudos
						var args,
						    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

						// The user may use createPseudo to indicate that
						// arguments are needed to create the filter function
						// just as Sizzle does
						if (fn[expando]) {
							return fn(argument);
						}

						// But maintain support for old signatures
						if (fn.length > 1) {
							args = [pseudo, pseudo, "", argument];
							return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
								var idx,
								    matched = fn(seed, argument),
								    i = matched.length;
								while (i--) {
									idx = indexOf(seed, matched[i]);
									seed[idx] = !(matches[idx] = matched[i]);
								}
							}) : function (elem) {
								return fn(elem, 0, args);
							};
						}

						return fn;
					}
				},

				pseudos: {
					// Potentially complex pseudos
					"not": markFunction(function (selector) {
						// Trim the selector passed to compile
						// to avoid treating leading and trailing
						// spaces as combinators
						var input = [],
						    results = [],
						    matcher = compile(selector.replace(rtrim, "$1"));

						return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
							var elem,
							    unmatched = matcher(seed, null, xml, []),
							    i = seed.length;

							// Match elements unmatched by `matcher`
							while (i--) {
								if (elem = unmatched[i]) {
									seed[i] = !(matches[i] = elem);
								}
							}
						}) : function (elem, context, xml) {
							input[0] = elem;
							matcher(input, null, xml, results);
							// Don't keep the element (issue #299)
							input[0] = null;
							return !results.pop();
						};
					}),

					"has": markFunction(function (selector) {
						return function (elem) {
							return Sizzle(selector, elem).length > 0;
						};
					}),

					"contains": markFunction(function (text) {
						text = text.replace(runescape, funescape);
						return function (elem) {
							return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
						};
					}),

					// "Whether an element is represented by a :lang() selector
					// is based solely on the element's language value
					// being equal to the identifier C,
					// or beginning with the identifier C immediately followed by "-".
					// The matching of C against the element's language value is performed case-insensitively.
					// The identifier C does not have to be a valid language name."
					// http://www.w3.org/TR/selectors/#lang-pseudo
					"lang": markFunction(function (lang) {
						// lang value must be a valid identifier
						if (!ridentifier.test(lang || "")) {
							Sizzle.error("unsupported lang: " + lang);
						}
						lang = lang.replace(runescape, funescape).toLowerCase();
						return function (elem) {
							var elemLang;
							do {
								if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

									elemLang = elemLang.toLowerCase();
									return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
								}
							} while ((elem = elem.parentNode) && elem.nodeType === 1);
							return false;
						};
					}),

					// Miscellaneous
					"target": function target(elem) {
						var hash = window.location && window.location.hash;
						return hash && hash.slice(1) === elem.id;
					},

					"root": function root(elem) {
						return elem === docElem;
					},

					"focus": function focus(elem) {
						return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
					},

					// Boolean properties
					"enabled": createDisabledPseudo(false),
					"disabled": createDisabledPseudo(true),

					"checked": function checked(elem) {
						// In CSS3, :checked should return both checked and selected elements
						// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						var nodeName = elem.nodeName.toLowerCase();
						return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
					},

					"selected": function selected(elem) {
						// Accessing this property makes selected-by-default
						// options in Safari work properly
						if (elem.parentNode) {
							elem.parentNode.selectedIndex;
						}

						return elem.selected === true;
					},

					// Contents
					"empty": function empty(elem) {
						// http://www.w3.org/TR/selectors/#empty-pseudo
						// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
						//   but not by others (comment: 8; processing instruction: 7; etc.)
						// nodeType < 6 works because attributes (2) do not appear as children
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							if (elem.nodeType < 6) {
								return false;
							}
						}
						return true;
					},

					"parent": function parent(elem) {
						return !Expr.pseudos["empty"](elem);
					},

					// Element/input types
					"header": function header(elem) {
						return rheader.test(elem.nodeName);
					},

					"input": function input(elem) {
						return rinputs.test(elem.nodeName);
					},

					"button": function button(elem) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === "button" || name === "button";
					},

					"text": function text(elem) {
						var attr;
						return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

						// Support: IE<8
						// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
						(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
					},

					// Position-in-collection
					"first": createPositionalPseudo(function () {
						return [0];
					}),

					"last": createPositionalPseudo(function (matchIndexes, length) {
						return [length - 1];
					}),

					"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
						return [argument < 0 ? argument + length : argument];
					}),

					"even": createPositionalPseudo(function (matchIndexes, length) {
						var i = 0;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"odd": createPositionalPseudo(function (matchIndexes, length) {
						var i = 1;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; --i >= 0;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; ++i < length;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					})
				}
			};

			Expr.pseudos["nth"] = Expr.pseudos["eq"];

			// Add button/input type pseudos
			for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
				Expr.pseudos[i] = createInputPseudo(i);
			}
			for (i in { submit: true, reset: true }) {
				Expr.pseudos[i] = createButtonPseudo(i);
			}

			// Easy API for creating new setFilters
			function setFilters() {}
			setFilters.prototype = Expr.filters = Expr.pseudos;
			Expr.setFilters = new setFilters();

			tokenize = Sizzle.tokenize = function (selector, parseOnly) {
				var matched,
				    match,
				    tokens,
				    type,
				    soFar,
				    groups,
				    preFilters,
				    cached = tokenCache[selector + " "];

				if (cached) {
					return parseOnly ? 0 : cached.slice(0);
				}

				soFar = selector;
				groups = [];
				preFilters = Expr.preFilter;

				while (soFar) {

					// Comma and first run
					if (!matched || (match = rcomma.exec(soFar))) {
						if (match) {
							// Don't consume trailing commas as valid
							soFar = soFar.slice(match[0].length) || soFar;
						}
						groups.push(tokens = []);
					}

					matched = false;

					// Combinators
					if (match = rcombinators.exec(soFar)) {
						matched = match.shift();
						tokens.push({
							value: matched,
							// Cast descendant combinators to space
							type: match[0].replace(rtrim, " ")
						});
						soFar = soFar.slice(matched.length);
					}

					// Filters
					for (type in Expr.filter) {
						if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
							matched = match.shift();
							tokens.push({
								value: matched,
								type: type,
								matches: match
							});
							soFar = soFar.slice(matched.length);
						}
					}

					if (!matched) {
						break;
					}
				}

				// Return the length of the invalid excess
				// if we're just parsing
				// Otherwise, throw an error or return tokens
				return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
				// Cache the tokens
				tokenCache(selector, groups).slice(0);
			};

			function toSelector(tokens) {
				var i = 0,
				    len = tokens.length,
				    selector = "";
				for (; i < len; i++) {
					selector += tokens[i].value;
				}
				return selector;
			}

			function addCombinator(matcher, combinator, base) {
				var dir = combinator.dir,
				    skip = combinator.next,
				    key = skip || dir,
				    checkNonElements = base && key === "parentNode",
				    doneName = done++;

				return combinator.first ?
				// Check against closest ancestor/preceding element
				function (elem, context, xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							return matcher(elem, context, xml);
						}
					}
					return false;
				} :

				// Check against all ancestor/preceding elements
				function (elem, context, xml) {
					var oldCache,
					    uniqueCache,
					    outerCache,
					    newCache = [dirruns, doneName];

					// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
					if (xml) {
						while (elem = elem[dir]) {
							if (elem.nodeType === 1 || checkNonElements) {
								if (matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					} else {
						while (elem = elem[dir]) {
							if (elem.nodeType === 1 || checkNonElements) {
								outerCache = elem[expando] || (elem[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

								if (skip && skip === elem.nodeName.toLowerCase()) {
									elem = elem[dir] || elem;
								} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

									// Assign to newCache so results back-propagate to previous elements
									return newCache[2] = oldCache[2];
								} else {
									// Reuse newcache so results back-propagate to previous elements
									uniqueCache[key] = newCache;

									// A match means we're done; a fail means we have to keep checking
									if (newCache[2] = matcher(elem, context, xml)) {
										return true;
									}
								}
							}
						}
					}
					return false;
				};
			}

			function elementMatcher(matchers) {
				return matchers.length > 1 ? function (elem, context, xml) {
					var i = matchers.length;
					while (i--) {
						if (!matchers[i](elem, context, xml)) {
							return false;
						}
					}
					return true;
				} : matchers[0];
			}

			function multipleContexts(selector, contexts, results) {
				var i = 0,
				    len = contexts.length;
				for (; i < len; i++) {
					Sizzle(selector, contexts[i], results);
				}
				return results;
			}

			function condense(unmatched, map, filter, context, xml) {
				var elem,
				    newUnmatched = [],
				    i = 0,
				    len = unmatched.length,
				    mapped = map != null;

				for (; i < len; i++) {
					if (elem = unmatched[i]) {
						if (!filter || filter(elem, context, xml)) {
							newUnmatched.push(elem);
							if (mapped) {
								map.push(i);
							}
						}
					}
				}

				return newUnmatched;
			}

			function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
				if (postFilter && !postFilter[expando]) {
					postFilter = setMatcher(postFilter);
				}
				if (postFinder && !postFinder[expando]) {
					postFinder = setMatcher(postFinder, postSelector);
				}
				return markFunction(function (seed, results, context, xml) {
					var temp,
					    i,
					    elem,
					    preMap = [],
					    postMap = [],
					    preexisting = results.length,


					// Get initial elements from seed or context
					elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


					// Prefilter to get matcher input, preserving a map for seed-results synchronization
					matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
					    matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || (seed ? preFilter : preexisting || postFilter) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results : matcherIn;

					// Find primary matches
					if (matcher) {
						matcher(matcherIn, matcherOut, context, xml);
					}

					// Apply postFilter
					if (postFilter) {
						temp = condense(matcherOut, postMap);
						postFilter(temp, [], context, xml);

						// Un-match failing elements by moving them back to matcherIn
						i = temp.length;
						while (i--) {
							if (elem = temp[i]) {
								matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
							}
						}
					}

					if (seed) {
						if (postFinder || preFilter) {
							if (postFinder) {
								// Get the final matcherOut by condensing this intermediate into postFinder contexts
								temp = [];
								i = matcherOut.length;
								while (i--) {
									if (elem = matcherOut[i]) {
										// Restore matcherIn since elem is not yet a final match
										temp.push(matcherIn[i] = elem);
									}
								}
								postFinder(null, matcherOut = [], temp, xml);
							}

							// Move matched elements from seed to results to keep them synchronized
							i = matcherOut.length;
							while (i--) {
								if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

									seed[temp] = !(results[temp] = elem);
								}
							}
						}

						// Add elements to results, through postFinder if defined
					} else {
						matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
						if (postFinder) {
							postFinder(null, results, matcherOut, xml);
						} else {
							push.apply(results, matcherOut);
						}
					}
				});
			}

			function matcherFromTokens(tokens) {
				var checkContext,
				    matcher,
				    j,
				    len = tokens.length,
				    leadingRelative = Expr.relative[tokens[0].type],
				    implicitRelative = leadingRelative || Expr.relative[" "],
				    i = leadingRelative ? 1 : 0,


				// The foundational matcher ensures that elements are reachable from top-level context(s)
				matchContext = addCombinator(function (elem) {
					return elem === checkContext;
				}, implicitRelative, true),
				    matchAnyContext = addCombinator(function (elem) {
					return indexOf(checkContext, elem) > -1;
				}, implicitRelative, true),
				    matchers = [function (elem, context, xml) {
					var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
					// Avoid hanging onto element (issue #299)
					checkContext = null;
					return ret;
				}];

				for (; i < len; i++) {
					if (matcher = Expr.relative[tokens[i].type]) {
						matchers = [addCombinator(elementMatcher(matchers), matcher)];
					} else {
						matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

						// Return special upon seeing a positional matcher
						if (matcher[expando]) {
							// Find the next relative operator (if any) for proper handling
							j = ++i;
							for (; j < len; j++) {
								if (Expr.relative[tokens[j].type]) {
									break;
								}
							}
							return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
						}
						matchers.push(matcher);
					}
				}

				return elementMatcher(matchers);
			}

			function matcherFromGroupMatchers(elementMatchers, setMatchers) {
				var bySet = setMatchers.length > 0,
				    byElement = elementMatchers.length > 0,
				    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
					var elem,
					    j,
					    matcher,
					    matchedCount = 0,
					    i = "0",
					    unmatched = seed && [],
					    setMatched = [],
					    contextBackup = outermostContext,

					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]("*", outermost),

					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
					    len = elems.length;

					if (outermost) {
						outermostContext = context === document || context || outermost;
					}

					// Add elements passing elementMatchers directly to results
					// Support: IE<9, Safari
					// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
					for (; i !== len && (elem = elems[i]) != null; i++) {
						if (byElement && elem) {
							j = 0;
							if (!context && elem.ownerDocument !== document) {
								setDocument(elem);
								xml = !documentIsHTML;
							}
							while (matcher = elementMatchers[j++]) {
								if (matcher(elem, context || document, xml)) {
									results.push(elem);
									break;
								}
							}
							if (outermost) {
								dirruns = dirrunsUnique;
							}
						}

						// Track unmatched elements for set filters
						if (bySet) {
							// They will have gone through all possible matchers
							if (elem = !matcher && elem) {
								matchedCount--;
							}

							// Lengthen the array for every element, matched or not
							if (seed) {
								unmatched.push(elem);
							}
						}
					}

					// `i` is now the count of elements visited above, and adding it to `matchedCount`
					// makes the latter nonnegative.
					matchedCount += i;

					// Apply set filters to unmatched elements
					// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
					// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
					// no element matchers and no seed.
					// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
					// case, which will result in a "00" `matchedCount` that differs from `i` but is also
					// numerically zero.
					if (bySet && i !== matchedCount) {
						j = 0;
						while (matcher = setMatchers[j++]) {
							matcher(unmatched, setMatched, context, xml);
						}

						if (seed) {
							// Reintegrate element matches to eliminate the need for sorting
							if (matchedCount > 0) {
								while (i--) {
									if (!(unmatched[i] || setMatched[i])) {
										setMatched[i] = pop.call(results);
									}
								}
							}

							// Discard index placeholder values to get only actual matches
							setMatched = condense(setMatched);
						}

						// Add matches to results
						push.apply(results, setMatched);

						// Seedless set matches succeeding multiple successful matchers stipulate sorting
						if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

							Sizzle.uniqueSort(results);
						}
					}

					// Override manipulation of globals by nested matchers
					if (outermost) {
						dirruns = dirrunsUnique;
						outermostContext = contextBackup;
					}

					return unmatched;
				};

				return bySet ? markFunction(superMatcher) : superMatcher;
			}

			compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
				var i,
				    setMatchers = [],
				    elementMatchers = [],
				    cached = compilerCache[selector + " "];

				if (!cached) {
					// Generate a function of recursive functions that can be used to check each element
					if (!match) {
						match = tokenize(selector);
					}
					i = match.length;
					while (i--) {
						cached = matcherFromTokens(match[i]);
						if (cached[expando]) {
							setMatchers.push(cached);
						} else {
							elementMatchers.push(cached);
						}
					}

					// Cache the compiled function
					cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

					// Save selector and tokenization
					cached.selector = selector;
				}
				return cached;
			};

			/**
	   * A low-level selection function that works with Sizzle's compiled
	   *  selector functions
	   * @param {String|Function} selector A selector or a pre-compiled
	   *  selector function built with Sizzle.compile
	   * @param {Element} context
	   * @param {Array} [results]
	   * @param {Array} [seed] A set of elements to match against
	   */
			select = Sizzle.select = function (selector, context, results, seed) {
				var i,
				    tokens,
				    token,
				    type,
				    find,
				    compiled = typeof selector === "function" && selector,
				    match = !seed && tokenize(selector = compiled.selector || selector);

				results = results || [];

				// Try to minimize operations if there is only one selector in the list and no seed
				// (the latter of which guarantees us context)
				if (match.length === 1) {

					// Reduce context if the leading compound selector is an ID
					tokens = match[0] = match[0].slice(0);
					if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

						context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
						if (!context) {
							return results;

							// Precompiled matchers will still verify ancestry, so step up a level
						} else if (compiled) {
							context = context.parentNode;
						}

						selector = selector.slice(tokens.shift().value.length);
					}

					// Fetch a seed set for right-to-left matching
					i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
					while (i--) {
						token = tokens[i];

						// Abort if we hit a combinator
						if (Expr.relative[type = token.type]) {
							break;
						}
						if (find = Expr.find[type]) {
							// Search, expanding context for leading sibling combinators
							if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

								// If seed is empty or no tokens remain, we can return early
								tokens.splice(i, 1);
								selector = seed.length && toSelector(tokens);
								if (!selector) {
									push.apply(results, seed);
									return results;
								}

								break;
							}
						}
					}
				}

				// Compile and execute a filtering function if one is not provided
				// Provide `match` to avoid retokenization if we modified the selector above
				(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
				return results;
			};

			// One-time assignments

			// Sort stability
			support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

			// Support: Chrome 14-35+
			// Always assume duplicates if they aren't passed to the comparison function
			support.detectDuplicates = !!hasDuplicate;

			// Initialize against the default document
			setDocument();

			// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
			// Detached nodes confoundingly follow *each other*
			support.sortDetached = assert(function (el) {
				// Should return 1, but returns 4 (following)
				return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
			});

			// Support: IE<8
			// Prevent attribute/property "interpolation"
			// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
			if (!assert(function (el) {
				el.innerHTML = "<a href='#'></a>";
				return el.firstChild.getAttribute("href") === "#";
			})) {
				addHandle("type|href|height|width", function (elem, name, isXML) {
					if (!isXML) {
						return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
					}
				});
			}

			// Support: IE<9
			// Use defaultValue in place of getAttribute("value")
			if (!support.attributes || !assert(function (el) {
				el.innerHTML = "<input/>";
				el.firstChild.setAttribute("value", "");
				return el.firstChild.getAttribute("value") === "";
			})) {
				addHandle("value", function (elem, name, isXML) {
					if (!isXML && elem.nodeName.toLowerCase() === "input") {
						return elem.defaultValue;
					}
				});
			}

			// Support: IE<9
			// Use getAttributeNode to fetch booleans when getAttribute lies
			if (!assert(function (el) {
				return el.getAttribute("disabled") == null;
			})) {
				addHandle(booleans, function (elem, name, isXML) {
					var val;
					if (!isXML) {
						return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
					}
				});
			}

			return Sizzle;
		}(window);

		jQuery.find = Sizzle;
		jQuery.expr = Sizzle.selectors;

		// Deprecated
		jQuery.expr[":"] = jQuery.expr.pseudos;
		jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
		jQuery.text = Sizzle.getText;
		jQuery.isXMLDoc = Sizzle.isXML;
		jQuery.contains = Sizzle.contains;
		jQuery.escapeSelector = Sizzle.escape;

		var dir = function dir(elem, _dir, until) {
			var matched = [],
			    truncate = until !== undefined;

			while ((elem = elem[_dir]) && elem.nodeType !== 9) {
				if (elem.nodeType === 1) {
					if (truncate && jQuery(elem).is(until)) {
						break;
					}
					matched.push(elem);
				}
			}
			return matched;
		};

		var _siblings = function _siblings(n, elem) {
			var matched = [];

			for (; n; n = n.nextSibling) {
				if (n.nodeType === 1 && n !== elem) {
					matched.push(n);
				}
			}

			return matched;
		};

		var rneedsContext = jQuery.expr.match.needsContext;

		function nodeName(elem, name) {

			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		};
		var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

		var risSimple = /^.[^:#\[\.,]*$/;

		// Implement the identical functionality for filter and not
		function winnow(elements, qualifier, not) {
			if (jQuery.isFunction(qualifier)) {
				return jQuery.grep(elements, function (elem, i) {
					return !!qualifier.call(elem, i, elem) !== not;
				});
			}

			// Single element
			if (qualifier.nodeType) {
				return jQuery.grep(elements, function (elem) {
					return elem === qualifier !== not;
				});
			}

			// Arraylike of elements (jQuery, arguments, Array)
			if (typeof qualifier !== "string") {
				return jQuery.grep(elements, function (elem) {
					return indexOf.call(qualifier, elem) > -1 !== not;
				});
			}

			// Simple selector that can be filtered directly, removing non-Elements
			if (risSimple.test(qualifier)) {
				return jQuery.filter(qualifier, elements, not);
			}

			// Complex selector, compare the two sets, removing non-Elements
			qualifier = jQuery.filter(qualifier, elements);
			return jQuery.grep(elements, function (elem) {
				return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
			});
		}

		jQuery.filter = function (expr, elems, not) {
			var elem = elems[0];

			if (not) {
				expr = ":not(" + expr + ")";
			}

			if (elems.length === 1 && elem.nodeType === 1) {
				return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
			}

			return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
				return elem.nodeType === 1;
			}));
		};

		jQuery.fn.extend({
			find: function find(selector) {
				var i,
				    ret,
				    len = this.length,
				    self = this;

				if (typeof selector !== "string") {
					return this.pushStack(jQuery(selector).filter(function () {
						for (i = 0; i < len; i++) {
							if (jQuery.contains(self[i], this)) {
								return true;
							}
						}
					}));
				}

				ret = this.pushStack([]);

				for (i = 0; i < len; i++) {
					jQuery.find(selector, self[i], ret);
				}

				return len > 1 ? jQuery.uniqueSort(ret) : ret;
			},
			filter: function filter(selector) {
				return this.pushStack(winnow(this, selector || [], false));
			},
			not: function not(selector) {
				return this.pushStack(winnow(this, selector || [], true));
			},
			is: function is(selector) {
				return !!winnow(this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
			}
		});

		// Initialize a jQuery object


		// A central reference to the root jQuery(document)
		var rootjQuery,


		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
		    init = jQuery.fn.init = function (selector, context, root) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if (!selector) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if (typeof selector === "string") {
				if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [null, selector, null];
				} else {
					match = rquickExpr.exec(selector);
				}

				// Match html or make sure no context is specified for #id
				if (match && (match[1] || !context)) {

					// HANDLE: $(html) -> $(array)
					if (match[1]) {
						context = context instanceof jQuery ? context[0] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

						// HANDLE: $(html, props)
						if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
							for (match in context) {

								// Properties of context are called as methods if possible
								if (jQuery.isFunction(this[match])) {
									this[match](context[match]);

									// ...and otherwise set as attributes
								} else {
									this.attr(match, context[match]);
								}
							}
						}

						return this;

						// HANDLE: $(#id)
					} else {
						elem = document.getElementById(match[2]);

						if (elem) {

							// Inject the element directly into the jQuery object
							this[0] = elem;
							this.length = 1;
						}
						return this;
					}

					// HANDLE: $(expr, $(...))
				} else if (!context || context.jquery) {
					return (context || root).find(selector);

					// HANDLE: $(expr, context)
					// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor(context).find(selector);
				}

				// HANDLE: $(DOMElement)
			} else if (selector.nodeType) {
				this[0] = selector;
				this.length = 1;
				return this;

				// HANDLE: $(function)
				// Shortcut for document ready
			} else if (jQuery.isFunction(selector)) {
				return root.ready !== undefined ? root.ready(selector) :

				// Execute immediately if ready is not present
				selector(jQuery);
			}

			return jQuery.makeArray(selector, this);
		};

		// Give the init function the jQuery prototype for later instantiation
		init.prototype = jQuery.fn;

		// Initialize central reference
		rootjQuery = jQuery(document);

		var rparentsprev = /^(?:parents|prev(?:Until|All))/,


		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

		jQuery.fn.extend({
			has: function has(target) {
				var targets = jQuery(target, this),
				    l = targets.length;

				return this.filter(function () {
					var i = 0;
					for (; i < l; i++) {
						if (jQuery.contains(this, targets[i])) {
							return true;
						}
					}
				});
			},

			closest: function closest(selectors, context) {
				var cur,
				    i = 0,
				    l = this.length,
				    matched = [],
				    targets = typeof selectors !== "string" && jQuery(selectors);

				// Positional selectors never match, since there's no _selection_ context
				if (!rneedsContext.test(selectors)) {
					for (; i < l; i++) {
						for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

							// Always skip document fragments
							if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :

							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

								matched.push(cur);
								break;
							}
						}
					}
				}

				return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
			},

			// Determine the position of an element within the set
			index: function index(elem) {

				// No argument, return index in parent
				if (!elem) {
					return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
				}

				// Index in selector
				if (typeof elem === "string") {
					return indexOf.call(jQuery(elem), this[0]);
				}

				// Locate the position of the desired element
				return indexOf.call(this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[0] : elem);
			},

			add: function add(selector, context) {
				return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
			},

			addBack: function addBack(selector) {
				return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
			}
		});

		function sibling(cur, dir) {
			while ((cur = cur[dir]) && cur.nodeType !== 1) {}
			return cur;
		}

		jQuery.each({
			parent: function parent(elem) {
				var parent = elem.parentNode;
				return parent && parent.nodeType !== 11 ? parent : null;
			},
			parents: function parents(elem) {
				return dir(elem, "parentNode");
			},
			parentsUntil: function parentsUntil(elem, i, until) {
				return dir(elem, "parentNode", until);
			},
			next: function next(elem) {
				return sibling(elem, "nextSibling");
			},
			prev: function prev(elem) {
				return sibling(elem, "previousSibling");
			},
			nextAll: function nextAll(elem) {
				return dir(elem, "nextSibling");
			},
			prevAll: function prevAll(elem) {
				return dir(elem, "previousSibling");
			},
			nextUntil: function nextUntil(elem, i, until) {
				return dir(elem, "nextSibling", until);
			},
			prevUntil: function prevUntil(elem, i, until) {
				return dir(elem, "previousSibling", until);
			},
			siblings: function siblings(elem) {
				return _siblings((elem.parentNode || {}).firstChild, elem);
			},
			children: function children(elem) {
				return _siblings(elem.firstChild);
			},
			contents: function contents(elem) {
				if (nodeName(elem, "iframe")) {
					return elem.contentDocument;
				}

				// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
				// Treat the template element as a regular one in browsers that
				// don't support it.
				if (nodeName(elem, "template")) {
					elem = elem.content || elem;
				}

				return jQuery.merge([], elem.childNodes);
			}
		}, function (name, fn) {
			jQuery.fn[name] = function (until, selector) {
				var matched = jQuery.map(this, fn, until);

				if (name.slice(-5) !== "Until") {
					selector = until;
				}

				if (selector && typeof selector === "string") {
					matched = jQuery.filter(selector, matched);
				}

				if (this.length > 1) {

					// Remove duplicates
					if (!guaranteedUnique[name]) {
						jQuery.uniqueSort(matched);
					}

					// Reverse order for parents* and prev-derivatives
					if (rparentsprev.test(name)) {
						matched.reverse();
					}
				}

				return this.pushStack(matched);
			};
		});
		var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

		// Convert String-formatted options into Object-formatted ones
		function createOptions(options) {
			var object = {};
			jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
				object[flag] = true;
			});
			return object;
		}

		/*
	  * Create a callback list using the following parameters:
	  *
	  *	options: an optional list of space-separated options that will change how
	  *			the callback list behaves or a more traditional option object
	  *
	  * By default a callback list will act like an event callback list and can be
	  * "fired" multiple times.
	  *
	  * Possible options:
	  *
	  *	once:			will ensure the callback list can only be fired once (like a Deferred)
	  *
	  *	memory:			will keep track of previous values and will call any callback added
	  *					after the list has been fired right away with the latest "memorized"
	  *					values (like a Deferred)
	  *
	  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	  *
	  *	stopOnFalse:	interrupt callings when a callback returns false
	  *
	  */
		jQuery.Callbacks = function (options) {

			// Convert options from String-formatted to Object-formatted if needed
			// (we check in cache first)
			options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

			var // Flag to know if list is currently firing
			firing,


			// Last fire value for non-forgettable lists
			memory,


			// Flag to know if list was already fired
			_fired,


			// Flag to prevent firing
			_locked,


			// Actual callback list
			list = [],


			// Queue of execution data for repeatable lists
			queue = [],


			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,


			// Fire callbacks
			fire = function fire() {

				// Enforce single-firing
				_locked = _locked || options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				_fired = firing = true;
				for (; queue.length; firingIndex = -1) {
					memory = queue.shift();
					while (++firingIndex < list.length) {

						// Run callback and check for early termination
						if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if (!options.memory) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if (_locked) {

					// Keep an empty list if we have data for future add calls
					if (memory) {
						list = [];

						// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},


			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function add() {
					if (list) {

						// If we have memory from a past run, we should fire after adding
						if (memory && !firing) {
							firingIndex = list.length - 1;
							queue.push(memory);
						}

						(function add(args) {
							jQuery.each(args, function (_, arg) {
								if (jQuery.isFunction(arg)) {
									if (!options.unique || !self.has(arg)) {
										list.push(arg);
									}
								} else if (arg && arg.length && jQuery.type(arg) !== "string") {

									// Inspect recursively
									add(arg);
								}
							});
						})(arguments);

						if (memory && !firing) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function remove() {
					jQuery.each(arguments, function (_, arg) {
						var index;
						while ((index = jQuery.inArray(arg, list, index)) > -1) {
							list.splice(index, 1);

							// Handle firing indexes
							if (index <= firingIndex) {
								firingIndex--;
							}
						}
					});
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function has(fn) {
					return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function empty() {
					if (list) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function disable() {
					_locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function disabled() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function lock() {
					_locked = queue = [];
					if (!memory && !firing) {
						list = memory = "";
					}
					return this;
				},
				locked: function locked() {
					return !!_locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function fireWith(context, args) {
					if (!_locked) {
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						queue.push(args);
						if (!firing) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function fire() {
					self.fireWith(this, arguments);
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function fired() {
					return !!_fired;
				}
			};

			return self;
		};

		function Identity(v) {
			return v;
		}
		function Thrower(ex) {
			throw ex;
		}

		function adoptValue(value, resolve, reject, noValue) {
			var method;

			try {

				// Check for promise aspect first to privilege synchronous behavior
				if (value && jQuery.isFunction(method = value.promise)) {
					method.call(value).done(resolve).fail(reject);

					// Other thenables
				} else if (value && jQuery.isFunction(method = value.then)) {
					method.call(value, resolve, reject);

					// Other non-thenables
				} else {

					// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
					// * false: [ value ].slice( 0 ) => resolve( value )
					// * true: [ value ].slice( 1 ) => resolve()
					resolve.apply(undefined, [value].slice(noValue));
				}

				// For Promises/A+, convert exceptions into rejections
				// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
				// Deferred#then to conditionally suppress rejection.
			} catch (value) {

				// Support: Android 4.0 only
				// Strict mode functions invoked without .call/.apply get global-object context
				reject.apply(undefined, [value]);
			}
		}

		jQuery.extend({

			Deferred: function Deferred(func) {
				var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
				    _state = "pending",
				    _promise = {
					state: function state() {
						return _state;
					},
					always: function always() {
						deferred.done(arguments).fail(arguments);
						return this;
					},
					"catch": function _catch(fn) {
						return _promise.then(null, fn);
					},

					// Keep pipe for back-compat
					pipe: function pipe() /* fnDone, fnFail, fnProgress */{
						var fns = arguments;

						return jQuery.Deferred(function (newDefer) {
							jQuery.each(tuples, function (i, tuple) {

								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[tuple[1]](function () {
									var returned = fn && fn.apply(this, arguments);
									if (returned && jQuery.isFunction(returned.promise)) {
										returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
									} else {
										newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
									}
								});
							});
							fns = null;
						}).promise();
					},
					then: function then(onFulfilled, onRejected, onProgress) {
						var maxDepth = 0;
						function resolve(depth, deferred, handler, special) {
							return function () {
								var that = this,
								    args = arguments,
								    mightThrow = function mightThrow() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if (depth < maxDepth) {
										return;
									}

									returned = handler.apply(that, args);

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if (returned === deferred.promise()) {
										throw new TypeError("Thenable self-resolution");
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned && (

									// Support: Promises/A+ section 2.3.4
									// https://promisesaplus.com/#point-64
									// Only check objects and functions for thenability
									(typeof returned === "undefined" ? "undefined" : _typeof(returned)) === "object" || typeof returned === "function") && returned.then;

									// Handle a returned thenable
									if (jQuery.isFunction(then)) {

										// Special processors (notify) just wait for resolution
										if (special) {
											then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

											// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
										}

										// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if (handler !== Identity) {
											that = undefined;
											args = [returned];
										}

										// Process the value(s)
										// Default process is resolve
										(special || deferred.resolveWith)(that, args);
									}
								},


								// Only normal processors (resolve) catch and reject exceptions
								process = special ? mightThrow : function () {
									try {
										mightThrow();
									} catch (e) {

										if (jQuery.Deferred.exceptionHook) {
											jQuery.Deferred.exceptionHook(e, process.stackTrace);
										}

										// Support: Promises/A+ section 2.3.3.3.4.1
										// https://promisesaplus.com/#point-61
										// Ignore post-resolution exceptions
										if (depth + 1 >= maxDepth) {

											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if (handler !== Thrower) {
												that = undefined;
												args = [e];
											}

											deferred.rejectWith(that, args);
										}
									}
								};

								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if (depth) {
									process();
								} else {

									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if (jQuery.Deferred.getStackHook) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout(process);
								}
							};
						}

						return jQuery.Deferred(function (newDefer) {

							// progress_handlers.add( ... )
							tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

							// fulfilled_handlers.add( ... )
							tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));

							// rejected_handlers.add( ... )
							tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
						}).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function promise(obj) {
						return obj != null ? jQuery.extend(obj, _promise) : _promise;
					}
				},
				    deferred = {};

				// Add list-specific methods
				jQuery.each(tuples, function (i, tuple) {
					var list = tuple[2],
					    stateString = tuple[5];

					// promise.progress = list.add
					// promise.done = list.add
					// promise.fail = list.add
					_promise[tuple[1]] = list.add;

					// Handle state
					if (stateString) {
						list.add(function () {

							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							_state = stateString;
						},

						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[3 - i][2].disable,

						// progress_callbacks.lock
						tuples[0][2].lock);
					}

					// progress_handlers.fire
					// fulfilled_handlers.fire
					// rejected_handlers.fire
					list.add(tuple[3].fire);

					// deferred.notify = function() { deferred.notifyWith(...) }
					// deferred.resolve = function() { deferred.resolveWith(...) }
					// deferred.reject = function() { deferred.rejectWith(...) }
					deferred[tuple[0]] = function () {
						deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
						return this;
					};

					// deferred.notifyWith = list.fireWith
					// deferred.resolveWith = list.fireWith
					// deferred.rejectWith = list.fireWith
					deferred[tuple[0] + "With"] = list.fireWith;
				});

				// Make the deferred a promise
				_promise.promise(deferred);

				// Call given func if any
				if (func) {
					func.call(deferred, deferred);
				}

				// All done!
				return deferred;
			},

			// Deferred helper
			when: function when(singleValue) {
				var

				// count of uncompleted subordinates
				remaining = arguments.length,


				// count of unprocessed arguments
				i = remaining,


				// subordinate fulfillment data
				resolveContexts = Array(i),
				    resolveValues = _slice.call(arguments),


				// the master Deferred
				master = jQuery.Deferred(),


				// subordinate callback factory
				updateFunc = function updateFunc(i) {
					return function (value) {
						resolveContexts[i] = this;
						resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;
						if (! --remaining) {
							master.resolveWith(resolveContexts, resolveValues);
						}
					};
				};

				// Single- and empty arguments are adopted like Promise.resolve
				if (remaining <= 1) {
					adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);

					// Use .then() to unwrap secondary thenables (cf. gh-3000)
					if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

						return master.then();
					}
				}

				// Multiple arguments are aggregated like Promise.all array elements
				while (i--) {
					adoptValue(resolveValues[i], updateFunc(i), master.reject);
				}

				return master.promise();
			}
		});

		// These usually indicate a programmer mistake during development,
		// warn about them ASAP rather than swallowing them by default.
		var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

		jQuery.Deferred.exceptionHook = function (error, stack) {

			// Support: IE 8 - 9 only
			// Console exists when dev tools are open, which can happen at any time
			if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
				window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
			}
		};

		jQuery.readyException = function (error) {
			window.setTimeout(function () {
				throw error;
			});
		};

		// The deferred used on DOM ready
		var readyList = jQuery.Deferred();

		jQuery.fn.ready = function (fn) {

			readyList.then(fn)

			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch(function (error) {
				jQuery.readyException(error);
			});

			return this;
		};

		jQuery.extend({

			// Is the DOM ready to be used? Set to true once it occurs.
			isReady: false,

			// A counter to track how many items to wait for before
			// the ready event fires. See #6781
			readyWait: 1,

			// Handle when the DOM is ready
			ready: function ready(wait) {

				// Abort if there are pending holds or we're already ready
				if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
					return;
				}

				// Remember that the DOM is ready
				jQuery.isReady = true;

				// If a normal DOM Ready event fired, decrement, and wait if need be
				if (wait !== true && --jQuery.readyWait > 0) {
					return;
				}

				// If there are functions bound, to execute
				readyList.resolveWith(document, [jQuery]);
			}
		});

		jQuery.ready.then = readyList.then;

		// The ready event handler and self cleanup method
		function completed() {
			document.removeEventListener("DOMContentLoaded", completed);
			window.removeEventListener("load", completed);
			jQuery.ready();
		}

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE <=9 - 10 only
		// Older IE sometimes signals "interactive" too soon
		if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout(jQuery.ready);
		} else {

			// Use the handy event callback
			document.addEventListener("DOMContentLoaded", completed);

			// A fallback to window.onload, that will always work
			window.addEventListener("load", completed);
		}

		// Multifunctional method to get and set values of a collection
		// The value/s can optionally be executed if it's a function
		var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
			var i = 0,
			    len = elems.length,
			    bulk = key == null;

			// Sets many values
			if (jQuery.type(key) === "object") {
				chainable = true;
				for (i in key) {
					access(elems, fn, i, key[i], true, emptyGet, raw);
				}

				// Sets one value
			} else if (value !== undefined) {
				chainable = true;

				if (!jQuery.isFunction(value)) {
					raw = true;
				}

				if (bulk) {

					// Bulk operations run against the entire set
					if (raw) {
						fn.call(elems, value);
						fn = null;

						// ...except when executing function values
					} else {
						bulk = fn;
						fn = function fn(elem, key, value) {
							return bulk.call(jQuery(elem), value);
						};
					}
				}

				if (fn) {
					for (; i < len; i++) {
						fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
					}
				}
			}

			if (chainable) {
				return elems;
			}

			// Gets
			if (bulk) {
				return fn.call(elems);
			}

			return len ? fn(elems[0], key) : emptyGet;
		};
		var acceptData = function acceptData(owner) {

			// Accepts only:
			//  - Node
			//    - Node.ELEMENT_NODE
			//    - Node.DOCUMENT_NODE
			//  - Object
			//    - Any
			return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
		};

		function Data() {
			this.expando = jQuery.expando + Data.uid++;
		}

		Data.uid = 1;

		Data.prototype = {

			cache: function cache(owner) {

				// Check if the owner object already has a cache
				var value = owner[this.expando];

				// If not, create one
				if (!value) {
					value = {};

					// We can accept data for non-element nodes in modern browsers,
					// but we should not, see #8335.
					// Always return an empty object.
					if (acceptData(owner)) {

						// If it is a node unlikely to be stringify-ed or looped over
						// use plain assignment
						if (owner.nodeType) {
							owner[this.expando] = value;

							// Otherwise secure it in a non-enumerable property
							// configurable must be true to allow the property to be
							// deleted when data is removed
						} else {
							Object.defineProperty(owner, this.expando, {
								value: value,
								configurable: true
							});
						}
					}
				}

				return value;
			},
			set: function set(owner, data, value) {
				var prop,
				    cache = this.cache(owner);

				// Handle: [ owner, key, value ] args
				// Always use camelCase key (gh-2257)
				if (typeof data === "string") {
					cache[jQuery.camelCase(data)] = value;

					// Handle: [ owner, { properties } ] args
				} else {

					// Copy the properties one-by-one to the cache object
					for (prop in data) {
						cache[jQuery.camelCase(prop)] = data[prop];
					}
				}
				return cache;
			},
			get: function get(owner, key) {
				return key === undefined ? this.cache(owner) :

				// Always use camelCase key (gh-2257)
				owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
			},
			access: function access(owner, key, value) {

				// In cases where either:
				//
				//   1. No key was specified
				//   2. A string key was specified, but no value provided
				//
				// Take the "read" path and allow the get method to determine
				// which value to return, respectively either:
				//
				//   1. The entire cache object
				//   2. The data stored at the key
				//
				if (key === undefined || key && typeof key === "string" && value === undefined) {

					return this.get(owner, key);
				}

				// When the key is not a string, or both a key and value
				// are specified, set or extend (existing objects) with either:
				//
				//   1. An object of properties
				//   2. A key and value
				//
				this.set(owner, key, value);

				// Since the "set" path can have two possible entry points
				// return the expected data based on which path was taken[*]
				return value !== undefined ? value : key;
			},
			remove: function remove(owner, key) {
				var i,
				    cache = owner[this.expando];

				if (cache === undefined) {
					return;
				}

				if (key !== undefined) {

					// Support array or space separated string of keys
					if (Array.isArray(key)) {

						// If key is an array of keys...
						// We always set camelCase keys, so remove that.
						key = key.map(jQuery.camelCase);
					} else {
						key = jQuery.camelCase(key);

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
					}

					i = key.length;

					while (i--) {
						delete cache[key[i]];
					}
				}

				// Remove the expando if there's no more data
				if (key === undefined || jQuery.isEmptyObject(cache)) {

					// Support: Chrome <=35 - 45
					// Webkit & Blink performance suffers when deleting properties
					// from DOM nodes, so set to undefined instead
					// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
					if (owner.nodeType) {
						owner[this.expando] = undefined;
					} else {
						delete owner[this.expando];
					}
				}
			},
			hasData: function hasData(owner) {
				var cache = owner[this.expando];
				return cache !== undefined && !jQuery.isEmptyObject(cache);
			}
		};
		var dataPriv = new Data();

		var dataUser = new Data();

		//	Implementation Summary
		//
		//	1. Enforce API surface and semantic compatibility with 1.9.x branch
		//	2. Improve the module's maintainability by reducing the storage
		//		paths to a single mechanism.
		//	3. Use the same single mechanism to support "private" and "user" data.
		//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
		//	5. Avoid exposing implementation details on user objects (eg. expando properties)
		//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

		var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		    rmultiDash = /[A-Z]/g;

		function getData(data) {
			if (data === "true") {
				return true;
			}

			if (data === "false") {
				return false;
			}

			if (data === "null") {
				return null;
			}

			// Only convert to a number if it doesn't change the string
			if (data === +data + "") {
				return +data;
			}

			if (rbrace.test(data)) {
				return JSON.parse(data);
			}

			return data;
		}

		function dataAttr(elem, key, data) {
			var name;

			// If nothing was found internally, try to fetch any
			// data from the HTML5 data-* attribute
			if (data === undefined && elem.nodeType === 1) {
				name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
				data = elem.getAttribute(name);

				if (typeof data === "string") {
					try {
						data = getData(data);
					} catch (e) {}

					// Make sure we set the data so it isn't changed later
					dataUser.set(elem, key, data);
				} else {
					data = undefined;
				}
			}
			return data;
		}

		jQuery.extend({
			hasData: function hasData(elem) {
				return dataUser.hasData(elem) || dataPriv.hasData(elem);
			},

			data: function data(elem, name, _data) {
				return dataUser.access(elem, name, _data);
			},

			removeData: function removeData(elem, name) {
				dataUser.remove(elem, name);
			},

			// TODO: Now that all calls to _data and _removeData have been replaced
			// with direct calls to dataPriv methods, these can be deprecated.
			_data: function _data(elem, name, data) {
				return dataPriv.access(elem, name, data);
			},

			_removeData: function _removeData(elem, name) {
				dataPriv.remove(elem, name);
			}
		});

		jQuery.fn.extend({
			data: function data(key, value) {
				var i,
				    name,
				    data,
				    elem = this[0],
				    attrs = elem && elem.attributes;

				// Gets all values
				if (key === undefined) {
					if (this.length) {
						data = dataUser.get(elem);

						if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
							i = attrs.length;
							while (i--) {

								// Support: IE 11 only
								// The attrs elements can be null (#14894)
								if (attrs[i]) {
									name = attrs[i].name;
									if (name.indexOf("data-") === 0) {
										name = jQuery.camelCase(name.slice(5));
										dataAttr(elem, name, data[name]);
									}
								}
							}
							dataPriv.set(elem, "hasDataAttrs", true);
						}
					}

					return data;
				}

				// Sets multiple values
				if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
					return this.each(function () {
						dataUser.set(this, key);
					});
				}

				return access(this, function (value) {
					var data;

					// The calling jQuery object (element matches) is not empty
					// (and therefore has an element appears at this[ 0 ]) and the
					// `value` parameter was not undefined. An empty jQuery object
					// will result in `undefined` for elem = this[ 0 ] which will
					// throw an exception if an attempt to read a data cache is made.
					if (elem && value === undefined) {

						// Attempt to get data from the cache
						// The key will always be camelCased in Data
						data = dataUser.get(elem, key);
						if (data !== undefined) {
							return data;
						}

						// Attempt to "discover" the data in
						// HTML5 custom data-* attrs
						data = dataAttr(elem, key);
						if (data !== undefined) {
							return data;
						}

						// We tried really hard, but the data doesn't exist.
						return;
					}

					// Set the data...
					this.each(function () {

						// We always store the camelCased key
						dataUser.set(this, key, value);
					});
				}, null, value, arguments.length > 1, null, true);
			},

			removeData: function removeData(key) {
				return this.each(function () {
					dataUser.remove(this, key);
				});
			}
		});

		jQuery.extend({
			queue: function queue(elem, type, data) {
				var queue;

				if (elem) {
					type = (type || "fx") + "queue";
					queue = dataPriv.get(elem, type);

					// Speed up dequeue by getting out quickly if this is just a lookup
					if (data) {
						if (!queue || Array.isArray(data)) {
							queue = dataPriv.access(elem, type, jQuery.makeArray(data));
						} else {
							queue.push(data);
						}
					}
					return queue || [];
				}
			},

			dequeue: function dequeue(elem, type) {
				type = type || "fx";

				var queue = jQuery.queue(elem, type),
				    startLength = queue.length,
				    fn = queue.shift(),
				    hooks = jQuery._queueHooks(elem, type),
				    next = function next() {
					jQuery.dequeue(elem, type);
				};

				// If the fx queue is dequeued, always remove the progress sentinel
				if (fn === "inprogress") {
					fn = queue.shift();
					startLength--;
				}

				if (fn) {

					// Add a progress sentinel to prevent the fx queue from being
					// automatically dequeued
					if (type === "fx") {
						queue.unshift("inprogress");
					}

					// Clear up the last queue stop function
					delete hooks.stop;
					fn.call(elem, next, hooks);
				}

				if (!startLength && hooks) {
					hooks.empty.fire();
				}
			},

			// Not public - generate a queueHooks object, or return the current one
			_queueHooks: function _queueHooks(elem, type) {
				var key = type + "queueHooks";
				return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
					empty: jQuery.Callbacks("once memory").add(function () {
						dataPriv.remove(elem, [type + "queue", key]);
					})
				});
			}
		});

		jQuery.fn.extend({
			queue: function queue(type, data) {
				var setter = 2;

				if (typeof type !== "string") {
					data = type;
					type = "fx";
					setter--;
				}

				if (arguments.length < setter) {
					return jQuery.queue(this[0], type);
				}

				return data === undefined ? this : this.each(function () {
					var queue = jQuery.queue(this, type, data);

					// Ensure a hooks for this queue
					jQuery._queueHooks(this, type);

					if (type === "fx" && queue[0] !== "inprogress") {
						jQuery.dequeue(this, type);
					}
				});
			},
			dequeue: function dequeue(type) {
				return this.each(function () {
					jQuery.dequeue(this, type);
				});
			},
			clearQueue: function clearQueue(type) {
				return this.queue(type || "fx", []);
			},

			// Get a promise resolved when queues of a certain type
			// are emptied (fx is the type by default)
			promise: function promise(type, obj) {
				var tmp,
				    count = 1,
				    defer = jQuery.Deferred(),
				    elements = this,
				    i = this.length,
				    resolve = function resolve() {
					if (! --count) {
						defer.resolveWith(elements, [elements]);
					}
				};

				if (typeof type !== "string") {
					obj = type;
					type = undefined;
				}
				type = type || "fx";

				while (i--) {
					tmp = dataPriv.get(elements[i], type + "queueHooks");
					if (tmp && tmp.empty) {
						count++;
						tmp.empty.add(resolve);
					}
				}
				resolve();
				return defer.promise(obj);
			}
		});
		var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

		var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

		var cssExpand = ["Top", "Right", "Bottom", "Left"];

		var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {

			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;

			// Inline style trumps all
			return elem.style.display === "none" || elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
		};

		var swap = function swap(elem, options, callback, args) {
			var ret,
			    name,
			    old = {};

			// Remember the old values, and insert the new ones
			for (name in options) {
				old[name] = elem.style[name];
				elem.style[name] = options[name];
			}

			ret = callback.apply(elem, args || []);

			// Revert the old values
			for (name in options) {
				elem.style[name] = old[name];
			}

			return ret;
		};

		function adjustCSS(elem, prop, valueParts, tween) {
			var adjusted,
			    scale = 1,
			    maxIterations = 20,
			    currentValue = tween ? function () {
				return tween.cur();
			} : function () {
				return jQuery.css(elem, prop, "");
			},
			    initial = currentValue(),
			    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


			// Starting value computation is required for potential unit mismatches
			initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

			if (initialInUnit && initialInUnit[3] !== unit) {

				// Trust units reported by jQuery.css
				unit = unit || initialInUnit[3];

				// Make sure we update the tween properties later on
				valueParts = valueParts || [];

				// Iteratively approximate from a nonzero starting point
				initialInUnit = +initial || 1;

				do {

					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					initialInUnit = initialInUnit / scale;
					jQuery.style(elem, prop, initialInUnit + unit);

					// Update scale, tolerating zero or NaN from tween.cur()
					// Break the loop if scale is unchanged or perfect, or if we've just had enough.
				} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
			}

			if (valueParts) {
				initialInUnit = +initialInUnit || +initial || 0;

				// Apply relative offset (+=/-=) if specified
				adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
				if (tween) {
					tween.unit = unit;
					tween.start = initialInUnit;
					tween.end = adjusted;
				}
			}
			return adjusted;
		}

		var defaultDisplayMap = {};

		function getDefaultDisplay(elem) {
			var temp,
			    doc = elem.ownerDocument,
			    nodeName = elem.nodeName,
			    display = defaultDisplayMap[nodeName];

			if (display) {
				return display;
			}

			temp = doc.body.appendChild(doc.createElement(nodeName));
			display = jQuery.css(temp, "display");

			temp.parentNode.removeChild(temp);

			if (display === "none") {
				display = "block";
			}
			defaultDisplayMap[nodeName] = display;

			return display;
		}

		function showHide(elements, show) {
			var display,
			    elem,
			    values = [],
			    index = 0,
			    length = elements.length;

			// Determine new display value for elements that need to change
			for (; index < length; index++) {
				elem = elements[index];
				if (!elem.style) {
					continue;
				}

				display = elem.style.display;
				if (show) {

					// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
					// check is required in this first loop unless we have a nonempty display value (either
					// inline or about-to-be-restored)
					if (display === "none") {
						values[index] = dataPriv.get(elem, "display") || null;
						if (!values[index]) {
							elem.style.display = "";
						}
					}
					if (elem.style.display === "" && isHiddenWithinTree(elem)) {
						values[index] = getDefaultDisplay(elem);
					}
				} else {
					if (display !== "none") {
						values[index] = "none";

						// Remember what we're overwriting
						dataPriv.set(elem, "display", display);
					}
				}
			}

			// Set the display of the elements in a second loop to avoid constant reflow
			for (index = 0; index < length; index++) {
				if (values[index] != null) {
					elements[index].style.display = values[index];
				}
			}

			return elements;
		}

		jQuery.fn.extend({
			show: function show() {
				return showHide(this, true);
			},
			hide: function hide() {
				return showHide(this);
			},
			toggle: function toggle(state) {
				if (typeof state === "boolean") {
					return state ? this.show() : this.hide();
				}

				return this.each(function () {
					if (isHiddenWithinTree(this)) {
						jQuery(this).show();
					} else {
						jQuery(this).hide();
					}
				});
			}
		});
		var rcheckableType = /^(?:checkbox|radio)$/i;

		var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

		var rscriptType = /^$|\/(?:java|ecma)script/i;

		// We have to close these tags to support XHTML (#13200)
		var wrapMap = {

			// Support: IE <=9 only
			option: [1, "<select multiple='multiple'>", "</select>"],

			// XHTML parsers do not magically insert elements in the
			// same way that tag soup parsers do. So we cannot shorten
			// this by omitting <tbody> or other required elements.
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

			_default: [0, "", ""]
		};

		// Support: IE <=9 only
		wrapMap.optgroup = wrapMap.option;

		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;

		function getAll(context, tag) {

			// Support: IE <=9 - 11 only
			// Use typeof to avoid zero-argument method invocation on host objects (#15151)
			var ret;

			if (typeof context.getElementsByTagName !== "undefined") {
				ret = context.getElementsByTagName(tag || "*");
			} else if (typeof context.querySelectorAll !== "undefined") {
				ret = context.querySelectorAll(tag || "*");
			} else {
				ret = [];
			}

			if (tag === undefined || tag && nodeName(context, tag)) {
				return jQuery.merge([context], ret);
			}

			return ret;
		}

		// Mark scripts as having already been evaluated
		function setGlobalEval(elems, refElements) {
			var i = 0,
			    l = elems.length;

			for (; i < l; i++) {
				dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
			}
		}

		var rhtml = /<|&#?\w+;/;

		function buildFragment(elems, context, scripts, selection, ignored) {
			var elem,
			    tmp,
			    tag,
			    wrap,
			    contains,
			    j,
			    fragment = context.createDocumentFragment(),
			    nodes = [],
			    i = 0,
			    l = elems.length;

			for (; i < l; i++) {
				elem = elems[i];

				if (elem || elem === 0) {

					// Add nodes directly
					if (jQuery.type(elem) === "object") {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

						// Convert non-html into a text node
					} else if (!rhtml.test(elem)) {
						nodes.push(context.createTextNode(elem));

						// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild(context.createElement("div"));

						// Deserialize a standard representation
						tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
						wrap = wrapMap[tag] || wrapMap._default;
						tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

						// Descend through wrappers to the right content
						j = wrap[0];
						while (j--) {
							tmp = tmp.lastChild;
						}

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge(nodes, tmp.childNodes);

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while (elem = nodes[i++]) {

				// Skip elements already in the context collection (trac-4087)
				if (selection && jQuery.inArray(elem, selection) > -1) {
					if (ignored) {
						ignored.push(elem);
					}
					continue;
				}

				contains = jQuery.contains(elem.ownerDocument, elem);

				// Append to fragment
				tmp = getAll(fragment.appendChild(elem), "script");

				// Preserve script evaluation history
				if (contains) {
					setGlobalEval(tmp);
				}

				// Capture executables
				if (scripts) {
					j = 0;
					while (elem = tmp[j++]) {
						if (rscriptType.test(elem.type || "")) {
							scripts.push(elem);
						}
					}
				}
			}

			return fragment;
		}

		(function () {
			var fragment = document.createDocumentFragment(),
			    div = fragment.appendChild(document.createElement("div")),
			    input = document.createElement("input");

			// Support: Android 4.0 - 4.3 only
			// Check state lost if the name is set (#11217)
			// Support: Windows Web Apps (WWA)
			// `name` and `type` must use .setAttribute for WWA (#14901)
			input.setAttribute("type", "radio");
			input.setAttribute("checked", "checked");
			input.setAttribute("name", "t");

			div.appendChild(input);

			// Support: Android <=4.1 only
			// Older WebKit doesn't clone checked state correctly in fragments
			support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

			// Support: IE <=11 only
			// Make sure textarea (and checkbox) defaultValue is properly cloned
			div.innerHTML = "<textarea>x</textarea>";
			support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
		})();
		var documentElement = document.documentElement;

		var rkeyEvent = /^key/,
		    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

		function returnTrue() {
			return true;
		}

		function returnFalse() {
			return false;
		}

		// Support: IE <=9 only
		// See #13393 for more info
		function safeActiveElement() {
			try {
				return document.activeElement;
			} catch (err) {}
		}

		function _on(elem, types, selector, data, fn, one) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-Object, selector, data )
				if (typeof selector !== "string") {

					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for (type in types) {
					_on(elem, type, selector, data, types[type], one);
				}
				return elem;
			}

			if (data == null && fn == null) {

				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if (fn == null) {
				if (typeof selector === "string") {

					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {

					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if (fn === false) {
				fn = returnFalse;
			} else if (!fn) {
				return elem;
			}

			if (one === 1) {
				origFn = fn;
				fn = function fn(event) {

					// Can use an empty set, since event contains the info
					jQuery().off(event);
					return origFn.apply(this, arguments);
				};

				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
			}
			return elem.each(function () {
				jQuery.event.add(this, types, fn, data, selector);
			});
		}

		/*
	  * Helper functions for managing events -- not part of the public interface.
	  * Props to Dean Edwards' addEvent library for many of the ideas.
	  */
		jQuery.event = {

			global: {},

			add: function add(elem, types, handler, data, selector) {

				var handleObjIn,
				    eventHandle,
				    tmp,
				    events,
				    t,
				    handleObj,
				    special,
				    handlers,
				    type,
				    namespaces,
				    origType,
				    elemData = dataPriv.get(elem);

				// Don't attach events to noData or text/comment nodes (but allow plain objects)
				if (!elemData) {
					return;
				}

				// Caller can pass in an object of custom data in lieu of the handler
				if (handler.handler) {
					handleObjIn = handler;
					handler = handleObjIn.handler;
					selector = handleObjIn.selector;
				}

				// Ensure that invalid selectors throw exceptions at attach time
				// Evaluate against documentElement in case elem is a non-element node (e.g., document)
				if (selector) {
					jQuery.find.matchesSelector(documentElement, selector);
				}

				// Make sure that the handler has a unique ID, used to find/remove it later
				if (!handler.guid) {
					handler.guid = jQuery.guid++;
				}

				// Init the element's event structure and main handler, if this is the first
				if (!(events = elemData.events)) {
					events = elemData.events = {};
				}
				if (!(eventHandle = elemData.handle)) {
					eventHandle = elemData.handle = function (e) {

						// Discard the second event of a jQuery.event.trigger() and
						// when an event is called after a page has unloaded
						return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
					};
				}

				// Handle multiple events separated by a space
				types = (types || "").match(rnothtmlwhite) || [""];
				t = types.length;
				while (t--) {
					tmp = rtypenamespace.exec(types[t]) || [];
					type = origType = tmp[1];
					namespaces = (tmp[2] || "").split(".").sort();

					// There *must* be a type, no attaching namespace-only handlers
					if (!type) {
						continue;
					}

					// If event changes its type, use the special event handlers for the changed type
					special = jQuery.event.special[type] || {};

					// If selector defined, determine special event api type, otherwise given type
					type = (selector ? special.delegateType : special.bindType) || type;

					// Update special based on newly reset type
					special = jQuery.event.special[type] || {};

					// handleObj is passed to all event handlers
					handleObj = jQuery.extend({
						type: type,
						origType: origType,
						data: data,
						handler: handler,
						guid: handler.guid,
						selector: selector,
						needsContext: selector && jQuery.expr.match.needsContext.test(selector),
						namespace: namespaces.join(".")
					}, handleObjIn);

					// Init the event handler queue if we're the first
					if (!(handlers = events[type])) {
						handlers = events[type] = [];
						handlers.delegateCount = 0;

						// Only use addEventListener if the special events handler returns false
						if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

							if (elem.addEventListener) {
								elem.addEventListener(type, eventHandle);
							}
						}
					}

					if (special.add) {
						special.add.call(elem, handleObj);

						if (!handleObj.handler.guid) {
							handleObj.handler.guid = handler.guid;
						}
					}

					// Add to the element's handler list, delegates in front
					if (selector) {
						handlers.splice(handlers.delegateCount++, 0, handleObj);
					} else {
						handlers.push(handleObj);
					}

					// Keep track of which events have ever been used, for event optimization
					jQuery.event.global[type] = true;
				}
			},

			// Detach an event or set of events from an element
			remove: function remove(elem, types, handler, selector, mappedTypes) {

				var j,
				    origCount,
				    tmp,
				    events,
				    t,
				    handleObj,
				    special,
				    handlers,
				    type,
				    namespaces,
				    origType,
				    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

				if (!elemData || !(events = elemData.events)) {
					return;
				}

				// Once for each type.namespace in types; type may be omitted
				types = (types || "").match(rnothtmlwhite) || [""];
				t = types.length;
				while (t--) {
					tmp = rtypenamespace.exec(types[t]) || [];
					type = origType = tmp[1];
					namespaces = (tmp[2] || "").split(".").sort();

					// Unbind all events (on this namespace, if provided) for the element
					if (!type) {
						for (type in events) {
							jQuery.event.remove(elem, type + types[t], handler, selector, true);
						}
						continue;
					}

					special = jQuery.event.special[type] || {};
					type = (selector ? special.delegateType : special.bindType) || type;
					handlers = events[type] || [];
					tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

					// Remove matching events
					origCount = j = handlers.length;
					while (j--) {
						handleObj = handlers[j];

						if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
							handlers.splice(j, 1);

							if (handleObj.selector) {
								handlers.delegateCount--;
							}
							if (special.remove) {
								special.remove.call(elem, handleObj);
							}
						}
					}

					// Remove generic event handler if we removed something and no more handlers exist
					// (avoids potential for endless recursion during removal of special event handlers)
					if (origCount && !handlers.length) {
						if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

							jQuery.removeEvent(elem, type, elemData.handle);
						}

						delete events[type];
					}
				}

				// Remove data and the expando if it's no longer used
				if (jQuery.isEmptyObject(events)) {
					dataPriv.remove(elem, "handle events");
				}
			},

			dispatch: function dispatch(nativeEvent) {

				// Make a writable jQuery.Event from the native event object
				var event = jQuery.event.fix(nativeEvent);

				var i,
				    j,
				    ret,
				    matched,
				    handleObj,
				    handlerQueue,
				    args = new Array(arguments.length),
				    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
				    special = jQuery.event.special[event.type] || {};

				// Use the fix-ed jQuery.Event rather than the (read-only) native event
				args[0] = event;

				for (i = 1; i < arguments.length; i++) {
					args[i] = arguments[i];
				}

				event.delegateTarget = this;

				// Call the preDispatch hook for the mapped type, and let it bail if desired
				if (special.preDispatch && special.preDispatch.call(this, event) === false) {
					return;
				}

				// Determine handlers
				handlerQueue = jQuery.event.handlers.call(this, event, handlers);

				// Run delegates first; they may want to stop propagation beneath us
				i = 0;
				while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
					event.currentTarget = matched.elem;

					j = 0;
					while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

						// Triggered event must either 1) have no namespace, or 2) have namespace(s)
						// a subset or equal to those in the bound event (both can have no namespace).
						if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

							event.handleObj = handleObj;
							event.data = handleObj.data;

							ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

							if (ret !== undefined) {
								if ((event.result = ret) === false) {
									event.preventDefault();
									event.stopPropagation();
								}
							}
						}
					}
				}

				// Call the postDispatch hook for the mapped type
				if (special.postDispatch) {
					special.postDispatch.call(this, event);
				}

				return event.result;
			},

			handlers: function handlers(event, _handlers) {
				var i,
				    handleObj,
				    sel,
				    matchedHandlers,
				    matchedSelectors,
				    handlerQueue = [],
				    delegateCount = _handlers.delegateCount,
				    cur = event.target;

				// Find delegate handlers
				if (delegateCount &&

				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&

				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!(event.type === "click" && event.button >= 1)) {

					for (; cur !== this; cur = cur.parentNode || this) {

						// Don't check non-elements (#13208)
						// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
						if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
							matchedHandlers = [];
							matchedSelectors = {};
							for (i = 0; i < delegateCount; i++) {
								handleObj = _handlers[i];

								// Don't conflict with Object.prototype properties (#13203)
								sel = handleObj.selector + " ";

								if (matchedSelectors[sel] === undefined) {
									matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
								}
								if (matchedSelectors[sel]) {
									matchedHandlers.push(handleObj);
								}
							}
							if (matchedHandlers.length) {
								handlerQueue.push({ elem: cur, handlers: matchedHandlers });
							}
						}
					}
				}

				// Add the remaining (directly-bound) handlers
				cur = this;
				if (delegateCount < _handlers.length) {
					handlerQueue.push({ elem: cur, handlers: _handlers.slice(delegateCount) });
				}

				return handlerQueue;
			},

			addProp: function addProp(name, hook) {
				Object.defineProperty(jQuery.Event.prototype, name, {
					enumerable: true,
					configurable: true,

					get: jQuery.isFunction(hook) ? function () {
						if (this.originalEvent) {
							return hook(this.originalEvent);
						}
					} : function () {
						if (this.originalEvent) {
							return this.originalEvent[name];
						}
					},

					set: function set(value) {
						Object.defineProperty(this, name, {
							enumerable: true,
							configurable: true,
							writable: true,
							value: value
						});
					}
				});
			},

			fix: function fix(originalEvent) {
				return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
			},

			special: {
				load: {

					// Prevent triggered image.load events from bubbling to window.load
					noBubble: true
				},
				focus: {

					// Fire native event if possible so blur/focus sequence is correct
					trigger: function trigger() {
						if (this !== safeActiveElement() && this.focus) {
							this.focus();
							return false;
						}
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function trigger() {
						if (this === safeActiveElement() && this.blur) {
							this.blur();
							return false;
						}
					},
					delegateType: "focusout"
				},
				click: {

					// For checkbox, fire native event so checked state will be right
					trigger: function trigger() {
						if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
							this.click();
							return false;
						}
					},

					// For cross-browser consistency, don't fire native .click() on links
					_default: function _default(event) {
						return nodeName(event.target, "a");
					}
				},

				beforeunload: {
					postDispatch: function postDispatch(event) {

						// Support: Firefox 20+
						// Firefox doesn't alert if the returnValue field is not set.
						if (event.result !== undefined && event.originalEvent) {
							event.originalEvent.returnValue = event.result;
						}
					}
				}
			}
		};

		jQuery.removeEvent = function (elem, type, handle) {

			// This "if" is needed for plain objects
			if (elem.removeEventListener) {
				elem.removeEventListener(type, handle);
			}
		};

		jQuery.Event = function (src, props) {

			// Allow instantiation without the 'new' keyword
			if (!(this instanceof jQuery.Event)) {
				return new jQuery.Event(src, props);
			}

			// Event object
			if (src && src.type) {
				this.originalEvent = src;
				this.type = src.type;

				// Events bubbling up the document may have been marked as prevented
				// by a handler lower down the tree; reflect the correct value.
				this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ? returnTrue : returnFalse;

				// Create target properties
				// Support: Safari <=6 - 7 only
				// Target should not be a text node (#504, #13143)
				this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

				this.currentTarget = src.currentTarget;
				this.relatedTarget = src.relatedTarget;

				// Event type
			} else {
				this.type = src;
			}

			// Put explicitly provided properties onto the event object
			if (props) {
				jQuery.extend(this, props);
			}

			// Create a timestamp if incoming event doesn't have one
			this.timeStamp = src && src.timeStamp || jQuery.now();

			// Mark it as fixed
			this[jQuery.expando] = true;
		};

		// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
		// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
		jQuery.Event.prototype = {
			constructor: jQuery.Event,
			isDefaultPrevented: returnFalse,
			isPropagationStopped: returnFalse,
			isImmediatePropagationStopped: returnFalse,
			isSimulated: false,

			preventDefault: function preventDefault() {
				var e = this.originalEvent;

				this.isDefaultPrevented = returnTrue;

				if (e && !this.isSimulated) {
					e.preventDefault();
				}
			},
			stopPropagation: function stopPropagation() {
				var e = this.originalEvent;

				this.isPropagationStopped = returnTrue;

				if (e && !this.isSimulated) {
					e.stopPropagation();
				}
			},
			stopImmediatePropagation: function stopImmediatePropagation() {
				var e = this.originalEvent;

				this.isImmediatePropagationStopped = returnTrue;

				if (e && !this.isSimulated) {
					e.stopImmediatePropagation();
				}

				this.stopPropagation();
			}
		};

		// Includes all common event props including KeyEvent and MouseEvent specific props
		jQuery.each({
			altKey: true,
			bubbles: true,
			cancelable: true,
			changedTouches: true,
			ctrlKey: true,
			detail: true,
			eventPhase: true,
			metaKey: true,
			pageX: true,
			pageY: true,
			shiftKey: true,
			view: true,
			"char": true,
			charCode: true,
			key: true,
			keyCode: true,
			button: true,
			buttons: true,
			clientX: true,
			clientY: true,
			offsetX: true,
			offsetY: true,
			pointerId: true,
			pointerType: true,
			screenX: true,
			screenY: true,
			targetTouches: true,
			toElement: true,
			touches: true,

			which: function which(event) {
				var button = event.button;

				// Add which for key events
				if (event.which == null && rkeyEvent.test(event.type)) {
					return event.charCode != null ? event.charCode : event.keyCode;
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
					if (button & 1) {
						return 1;
					}

					if (button & 2) {
						return 3;
					}

					if (button & 4) {
						return 2;
					}

					return 0;
				}

				return event.which;
			}
		}, jQuery.event.addProp);

		// Create mouseenter/leave events using mouseover/out and event-time checks
		// so that event delegation works in jQuery.
		// Do the same for pointerenter/pointerleave and pointerover/pointerout
		//
		// Support: Safari 7 only
		// Safari sends mouseenter too often; see:
		// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
		// for the description of the bug (it existed in older Chrome versions as well).
		jQuery.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			pointerenter: "pointerover",
			pointerleave: "pointerout"
		}, function (orig, fix) {
			jQuery.event.special[orig] = {
				delegateType: fix,
				bindType: fix,

				handle: function handle(event) {
					var ret,
					    target = this,
					    related = event.relatedTarget,
					    handleObj = event.handleObj;

					// For mouseenter/leave call the handler if related is outside the target.
					// NB: No relatedTarget if the mouse left/entered the browser window
					if (!related || related !== target && !jQuery.contains(target, related)) {
						event.type = handleObj.origType;
						ret = handleObj.handler.apply(this, arguments);
						event.type = fix;
					}
					return ret;
				}
			};
		});

		jQuery.fn.extend({

			on: function on(types, selector, data, fn) {
				return _on(this, types, selector, data, fn);
			},
			one: function one(types, selector, data, fn) {
				return _on(this, types, selector, data, fn, 1);
			},
			off: function off(types, selector, fn) {
				var handleObj, type;
				if (types && types.preventDefault && types.handleObj) {

					// ( event )  dispatched jQuery.Event
					handleObj = types.handleObj;
					jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
					return this;
				}
				if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

					// ( types-object [, selector] )
					for (type in types) {
						this.off(type, selector, types[type]);
					}
					return this;
				}
				if (selector === false || typeof selector === "function") {

					// ( types [, fn] )
					fn = selector;
					selector = undefined;
				}
				if (fn === false) {
					fn = returnFalse;
				}
				return this.each(function () {
					jQuery.event.remove(this, types, fn, selector);
				});
			}
		});

		var

		/* eslint-disable max-len */

		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,


		/* eslint-enable */

		// Support: IE <=10 - 11, Edge 12 - 13
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,


		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		    rscriptTypeMasked = /^true\/(.*)/,
		    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

		// Prefer a tbody over its parent table for containing new rows
		function manipulationTarget(elem, content) {
			if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

				return jQuery(">tbody", elem)[0] || elem;
			}

			return elem;
		}

		// Replace/restore the type attribute of script elements for safe DOM manipulation
		function disableScript(elem) {
			elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
			return elem;
		}
		function restoreScript(elem) {
			var match = rscriptTypeMasked.exec(elem.type);

			if (match) {
				elem.type = match[1];
			} else {
				elem.removeAttribute("type");
			}

			return elem;
		}

		function cloneCopyEvent(src, dest) {
			var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

			if (dest.nodeType !== 1) {
				return;
			}

			// 1. Copy private data: events, handlers, etc.
			if (dataPriv.hasData(src)) {
				pdataOld = dataPriv.access(src);
				pdataCur = dataPriv.set(dest, pdataOld);
				events = pdataOld.events;

				if (events) {
					delete pdataCur.handle;
					pdataCur.events = {};

					for (type in events) {
						for (i = 0, l = events[type].length; i < l; i++) {
							jQuery.event.add(dest, type, events[type][i]);
						}
					}
				}
			}

			// 2. Copy user data
			if (dataUser.hasData(src)) {
				udataOld = dataUser.access(src);
				udataCur = jQuery.extend({}, udataOld);

				dataUser.set(dest, udataCur);
			}
		}

		// Fix IE bugs, see support tests
		function fixInput(src, dest) {
			var nodeName = dest.nodeName.toLowerCase();

			// Fails to persist the checked state of a cloned checkbox or radio button.
			if (nodeName === "input" && rcheckableType.test(src.type)) {
				dest.checked = src.checked;

				// Fails to return the selected option to the default selected state when cloning options
			} else if (nodeName === "input" || nodeName === "textarea") {
				dest.defaultValue = src.defaultValue;
			}
		}

		function domManip(collection, args, callback, ignored) {

			// Flatten any nested arrays
			args = concat.apply([], args);

			var fragment,
			    first,
			    scripts,
			    hasScripts,
			    node,
			    doc,
			    i = 0,
			    l = collection.length,
			    iNoClone = l - 1,
			    value = args[0],
			    isFunction = jQuery.isFunction(value);

			// We can't cloneNode fragments that contain checked, in WebKit
			if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
				return collection.each(function (index) {
					var self = collection.eq(index);
					if (isFunction) {
						args[0] = value.call(this, index, self.html());
					}
					domManip(self, args, callback, ignored);
				});
			}

			if (l) {
				fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
				first = fragment.firstChild;

				if (fragment.childNodes.length === 1) {
					fragment = first;
				}

				// Require either new content or an interest in ignored elements to invoke the callback
				if (first || ignored) {
					scripts = jQuery.map(getAll(fragment, "script"), disableScript);
					hasScripts = scripts.length;

					// Use the original fragment for the last item
					// instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for (; i < l; i++) {
						node = fragment;

						if (i !== iNoClone) {
							node = jQuery.clone(node, true, true);

							// Keep references to cloned scripts for later restoration
							if (hasScripts) {

								// Support: Android <=4.0 only, PhantomJS 1 only
								// push.apply(_, arraylike) throws on ancient WebKit
								jQuery.merge(scripts, getAll(node, "script"));
							}
						}

						callback.call(collection[i], node, i);
					}

					if (hasScripts) {
						doc = scripts[scripts.length - 1].ownerDocument;

						// Reenable scripts
						jQuery.map(scripts, restoreScript);

						// Evaluate executable scripts on first document insertion
						for (i = 0; i < hasScripts; i++) {
							node = scripts[i];
							if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

								if (node.src) {

									// Optional AJAX dependency, but won't run scripts if not present
									if (jQuery._evalUrl) {
										jQuery._evalUrl(node.src);
									}
								} else {
									DOMEval(node.textContent.replace(rcleanScript, ""), doc);
								}
							}
						}
					}
				}
			}

			return collection;
		}

		function _remove(elem, selector, keepData) {
			var node,
			    nodes = selector ? jQuery.filter(selector, elem) : elem,
			    i = 0;

			for (; (node = nodes[i]) != null; i++) {
				if (!keepData && node.nodeType === 1) {
					jQuery.cleanData(getAll(node));
				}

				if (node.parentNode) {
					if (keepData && jQuery.contains(node.ownerDocument, node)) {
						setGlobalEval(getAll(node, "script"));
					}
					node.parentNode.removeChild(node);
				}
			}

			return elem;
		}

		jQuery.extend({
			htmlPrefilter: function htmlPrefilter(html) {
				return html.replace(rxhtmlTag, "<$1></$2>");
			},

			clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
				var i,
				    l,
				    srcElements,
				    destElements,
				    clone = elem.cloneNode(true),
				    inPage = jQuery.contains(elem.ownerDocument, elem);

				// Fix IE cloning issues
				if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

					// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
					destElements = getAll(clone);
					srcElements = getAll(elem);

					for (i = 0, l = srcElements.length; i < l; i++) {
						fixInput(srcElements[i], destElements[i]);
					}
				}

				// Copy the events from the original to the clone
				if (dataAndEvents) {
					if (deepDataAndEvents) {
						srcElements = srcElements || getAll(elem);
						destElements = destElements || getAll(clone);

						for (i = 0, l = srcElements.length; i < l; i++) {
							cloneCopyEvent(srcElements[i], destElements[i]);
						}
					} else {
						cloneCopyEvent(elem, clone);
					}
				}

				// Preserve script evaluation history
				destElements = getAll(clone, "script");
				if (destElements.length > 0) {
					setGlobalEval(destElements, !inPage && getAll(elem, "script"));
				}

				// Return the cloned set
				return clone;
			},

			cleanData: function cleanData(elems) {
				var data,
				    elem,
				    type,
				    special = jQuery.event.special,
				    i = 0;

				for (; (elem = elems[i]) !== undefined; i++) {
					if (acceptData(elem)) {
						if (data = elem[dataPriv.expando]) {
							if (data.events) {
								for (type in data.events) {
									if (special[type]) {
										jQuery.event.remove(elem, type);

										// This is a shortcut to avoid jQuery.event.remove's overhead
									} else {
										jQuery.removeEvent(elem, type, data.handle);
									}
								}
							}

							// Support: Chrome <=35 - 45+
							// Assign undefined instead of using delete, see Data#remove
							elem[dataPriv.expando] = undefined;
						}
						if (elem[dataUser.expando]) {

							// Support: Chrome <=35 - 45+
							// Assign undefined instead of using delete, see Data#remove
							elem[dataUser.expando] = undefined;
						}
					}
				}
			}
		});

		jQuery.fn.extend({
			detach: function detach(selector) {
				return _remove(this, selector, true);
			},

			remove: function remove(selector) {
				return _remove(this, selector);
			},

			text: function text(value) {
				return access(this, function (value) {
					return value === undefined ? jQuery.text(this) : this.empty().each(function () {
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
							this.textContent = value;
						}
					});
				}, null, value, arguments.length);
			},

			append: function append() {
				return domManip(this, arguments, function (elem) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						var target = manipulationTarget(this, elem);
						target.appendChild(elem);
					}
				});
			},

			prepend: function prepend() {
				return domManip(this, arguments, function (elem) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						var target = manipulationTarget(this, elem);
						target.insertBefore(elem, target.firstChild);
					}
				});
			},

			before: function before() {
				return domManip(this, arguments, function (elem) {
					if (this.parentNode) {
						this.parentNode.insertBefore(elem, this);
					}
				});
			},

			after: function after() {
				return domManip(this, arguments, function (elem) {
					if (this.parentNode) {
						this.parentNode.insertBefore(elem, this.nextSibling);
					}
				});
			},

			empty: function empty() {
				var elem,
				    i = 0;

				for (; (elem = this[i]) != null; i++) {
					if (elem.nodeType === 1) {

						// Prevent memory leaks
						jQuery.cleanData(getAll(elem, false));

						// Remove any remaining nodes
						elem.textContent = "";
					}
				}

				return this;
			},

			clone: function clone(dataAndEvents, deepDataAndEvents) {
				dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
				deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

				return this.map(function () {
					return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
				});
			},

			html: function html(value) {
				return access(this, function (value) {
					var elem = this[0] || {},
					    i = 0,
					    l = this.length;

					if (value === undefined && elem.nodeType === 1) {
						return elem.innerHTML;
					}

					// See if we can take a shortcut and just use innerHTML
					if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

						value = jQuery.htmlPrefilter(value);

						try {
							for (; i < l; i++) {
								elem = this[i] || {};

								// Remove element nodes and prevent memory leaks
								if (elem.nodeType === 1) {
									jQuery.cleanData(getAll(elem, false));
									elem.innerHTML = value;
								}
							}

							elem = 0;

							// If using innerHTML throws an exception, use the fallback method
						} catch (e) {}
					}

					if (elem) {
						this.empty().append(value);
					}
				}, null, value, arguments.length);
			},

			replaceWith: function replaceWith() {
				var ignored = [];

				// Make the changes, replacing each non-ignored context element with the new content
				return domManip(this, arguments, function (elem) {
					var parent = this.parentNode;

					if (jQuery.inArray(this, ignored) < 0) {
						jQuery.cleanData(getAll(this));
						if (parent) {
							parent.replaceChild(elem, this);
						}
					}

					// Force callback invocation
				}, ignored);
			}
		});

		jQuery.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function (name, original) {
			jQuery.fn[name] = function (selector) {
				var elems,
				    ret = [],
				    insert = jQuery(selector),
				    last = insert.length - 1,
				    i = 0;

				for (; i <= last; i++) {
					elems = i === last ? this : this.clone(true);
					jQuery(insert[i])[original](elems);

					// Support: Android <=4.0 only, PhantomJS 1 only
					// .get() because push.apply(_, arraylike) throws on ancient WebKit
					push.apply(ret, elems.get());
				}

				return this.pushStack(ret);
			};
		});
		var rmargin = /^margin/;

		var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

		var getStyles = function getStyles(elem) {

			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if (!view || !view.opener) {
				view = window;
			}

			return view.getComputedStyle(elem);
		};

		(function () {

			// Executing both pixelPosition & boxSizingReliable tests require only one layout
			// so they're executed at the same time to save the second computation.
			function computeStyleTests() {

				// This is a singleton, we need to execute it only once
				if (!div) {
					return;
				}

				div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
				div.innerHTML = "";
				documentElement.appendChild(container);

				var divStyle = window.getComputedStyle(div);
				pixelPositionVal = divStyle.top !== "1%";

				// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
				reliableMarginLeftVal = divStyle.marginLeft === "2px";
				boxSizingReliableVal = divStyle.width === "4px";

				// Support: Android 4.0 - 4.3 only
				// Some styles come back with percentage values, even though they shouldn't
				div.style.marginRight = "50%";
				pixelMarginRightVal = divStyle.marginRight === "4px";

				documentElement.removeChild(container);

				// Nullify the div so it wouldn't be stored in the memory and
				// it will also be a sign that checks already performed
				div = null;
			}

			var pixelPositionVal,
			    boxSizingReliableVal,
			    pixelMarginRightVal,
			    reliableMarginLeftVal,
			    container = document.createElement("div"),
			    div = document.createElement("div");

			// Finish early in limited (non-browser) environments
			if (!div.style) {
				return;
			}

			// Support: IE <=9 - 11 only
			// Style of cloned element affects source element cloned (#8908)
			div.style.backgroundClip = "content-box";
			div.cloneNode(true).style.backgroundClip = "";
			support.clearCloneStyle = div.style.backgroundClip === "content-box";

			container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
			container.appendChild(div);

			jQuery.extend(support, {
				pixelPosition: function pixelPosition() {
					computeStyleTests();
					return pixelPositionVal;
				},
				boxSizingReliable: function boxSizingReliable() {
					computeStyleTests();
					return boxSizingReliableVal;
				},
				pixelMarginRight: function pixelMarginRight() {
					computeStyleTests();
					return pixelMarginRightVal;
				},
				reliableMarginLeft: function reliableMarginLeft() {
					computeStyleTests();
					return reliableMarginLeftVal;
				}
			});
		})();

		function curCSS(elem, name, computed) {
			var width,
			    minWidth,
			    maxWidth,
			    ret,


			// Support: Firefox 51+
			// Retrieving style before computed somehow
			// fixes an issue with getting wrong values
			// on detached elements
			style = elem.style;

			computed = computed || getStyles(elem);

			// getPropertyValue is needed for:
			//   .css('filter') (IE 9 only, #12537)
			//   .css('--customProperty) (#3144)
			if (computed) {
				ret = computed.getPropertyValue(name) || computed[name];

				if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
					ret = jQuery.style(elem, name);
				}

				// A tribute to the "awesome hack by Dean Edwards"
				// Android Browser returns percentage for some values,
				// but width seems to be reliably pixels.
				// This is against the CSSOM draft spec:
				// https://drafts.csswg.org/cssom/#resolved-values
				if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

					// Remember the original values
					width = style.width;
					minWidth = style.minWidth;
					maxWidth = style.maxWidth;

					// Put in the new values to get a computed value out
					style.minWidth = style.maxWidth = style.width = ret;
					ret = computed.width;

					// Revert the changed values
					style.width = width;
					style.minWidth = minWidth;
					style.maxWidth = maxWidth;
				}
			}

			return ret !== undefined ?

			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" : ret;
		}

		function addGetHookIf(conditionFn, hookFn) {

			// Define the hook, we'll check on the first run if it's really needed.
			return {
				get: function get() {
					if (conditionFn()) {

						// Hook not needed (or it's not possible to use it due
						// to missing dependency), remove it.
						delete this.get;
						return;
					}

					// Hook needed; redefine it so that the support test is not executed again.
					return (this.get = hookFn).apply(this, arguments);
				}
			};
		}

		var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		    rcustomProp = /^--/,
		    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		    cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		    cssPrefixes = ["Webkit", "Moz", "ms"],
		    emptyStyle = document.createElement("div").style;

		// Return a css property mapped to a potentially vendor prefixed property
		function vendorPropName(name) {

			// Shortcut for names that are not vendor prefixed
			if (name in emptyStyle) {
				return name;
			}

			// Check for vendor prefixed names
			var capName = name[0].toUpperCase() + name.slice(1),
			    i = cssPrefixes.length;

			while (i--) {
				name = cssPrefixes[i] + capName;
				if (name in emptyStyle) {
					return name;
				}
			}
		}

		// Return a property mapped along what jQuery.cssProps suggests or to
		// a vendor prefixed property.
		function finalPropName(name) {
			var ret = jQuery.cssProps[name];
			if (!ret) {
				ret = jQuery.cssProps[name] = vendorPropName(name) || name;
			}
			return ret;
		}

		function setPositiveNumber(elem, value, subtract) {

			// Any relative (+/-) values have already been
			// normalized at this point
			var matches = rcssNum.exec(value);
			return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
		}

		function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
			var i,
			    val = 0;

			// If we already have the right measurement, avoid augmentation
			if (extra === (isBorderBox ? "border" : "content")) {
				i = 4;

				// Otherwise initialize for horizontal or vertical properties
			} else {
				i = name === "width" ? 1 : 0;
			}

			for (; i < 4; i += 2) {

				// Both box models exclude margin, so add it if we want it
				if (extra === "margin") {
					val += jQuery.css(elem, extra + cssExpand[i], true, styles);
				}

				if (isBorderBox) {

					// border-box includes padding, so remove it if we want content
					if (extra === "content") {
						val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
					}

					// At this point, extra isn't border nor margin, so remove border
					if (extra !== "margin") {
						val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
					}
				} else {

					// At this point, extra isn't content, so add padding
					val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

					// At this point, extra isn't content nor padding, so add border
					if (extra !== "padding") {
						val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
					}
				}
			}

			return val;
		}

		function getWidthOrHeight(elem, name, extra) {

			// Start with computed style
			var valueIsBorderBox,
			    styles = getStyles(elem),
			    val = curCSS(elem, name, styles),
			    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

			// Computed unit is not pixels. Stop here and return.
			if (rnumnonpx.test(val)) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

			// Fall back to offsetWidth/Height when value is "auto"
			// This happens for inline elements with no explicit setting (gh-3571)
			if (val === "auto") {
				val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
			}

			// Normalize "", auto, and prepare for extra
			val = parseFloat(val) || 0;

			// Use the active box-sizing model to add/subtract irrelevant styles
			return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
		}

		jQuery.extend({

			// Add in style property hooks for overriding the default
			// behavior of getting and setting a style property
			cssHooks: {
				opacity: {
					get: function get(elem, computed) {
						if (computed) {

							// We should always get a number back from opacity
							var ret = curCSS(elem, "opacity");
							return ret === "" ? "1" : ret;
						}
					}
				}
			},

			// Don't automatically add "px" to these possibly-unitless properties
			cssNumber: {
				"animationIterationCount": true,
				"columnCount": true,
				"fillOpacity": true,
				"flexGrow": true,
				"flexShrink": true,
				"fontWeight": true,
				"lineHeight": true,
				"opacity": true,
				"order": true,
				"orphans": true,
				"widows": true,
				"zIndex": true,
				"zoom": true
			},

			// Add in properties whose names you wish to fix before
			// setting or getting the value
			cssProps: {
				"float": "cssFloat"
			},

			// Get and set the style property on a DOM Node
			style: function style(elem, name, value, extra) {

				// Don't set styles on text and comment nodes
				if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
					return;
				}

				// Make sure that we're working with the right name
				var ret,
				    type,
				    hooks,
				    origName = jQuery.camelCase(name),
				    isCustomProp = rcustomProp.test(name),
				    style = elem.style;

				// Make sure that we're working with the right name. We don't
				// want to query the value if it is a CSS custom property
				// since they are user-defined.
				if (!isCustomProp) {
					name = finalPropName(origName);
				}

				// Gets hook for the prefixed version, then unprefixed version
				hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

				// Check if we're setting a value
				if (value !== undefined) {
					type = typeof value === "undefined" ? "undefined" : _typeof(value);

					// Convert "+=" or "-=" to relative numbers (#7345)
					if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
						value = adjustCSS(elem, name, ret);

						// Fixes bug #9237
						type = "number";
					}

					// Make sure that null and NaN values aren't set (#7116)
					if (value == null || value !== value) {
						return;
					}

					// If a number was passed in, add the unit (except for certain CSS properties)
					if (type === "number") {
						value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
					}

					// background-* props affect original clone's values
					if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
						style[name] = "inherit";
					}

					// If a hook was provided, use that value, otherwise just set the specified value
					if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

						if (isCustomProp) {
							style.setProperty(name, value);
						} else {
							style[name] = value;
						}
					}
				} else {

					// If a hook was provided get the non-computed value from there
					if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

						return ret;
					}

					// Otherwise just get the value from the style object
					return style[name];
				}
			},

			css: function css(elem, name, extra, styles) {
				var val,
				    num,
				    hooks,
				    origName = jQuery.camelCase(name),
				    isCustomProp = rcustomProp.test(name);

				// Make sure that we're working with the right name. We don't
				// want to modify the value if it is a CSS custom property
				// since they are user-defined.
				if (!isCustomProp) {
					name = finalPropName(origName);
				}

				// Try prefixed name followed by the unprefixed name
				hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

				// If a hook was provided get the computed value from there
				if (hooks && "get" in hooks) {
					val = hooks.get(elem, true, extra);
				}

				// Otherwise, if a way to get the computed value exists, use that
				if (val === undefined) {
					val = curCSS(elem, name, styles);
				}

				// Convert "normal" to computed value
				if (val === "normal" && name in cssNormalTransform) {
					val = cssNormalTransform[name];
				}

				// Make numeric if forced or a qualifier was provided and val looks numeric
				if (extra === "" || extra) {
					num = parseFloat(val);
					return extra === true || isFinite(num) ? num || 0 : val;
				}

				return val;
			}
		});

		jQuery.each(["height", "width"], function (i, name) {
			jQuery.cssHooks[name] = {
				get: function get(elem, computed, extra) {
					if (computed) {

						// Certain elements can have dimension info if we invisibly show them
						// but it must have a current display style that would benefit
						return rdisplayswap.test(jQuery.css(elem, "display")) && (

						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
							return getWidthOrHeight(elem, name, extra);
						}) : getWidthOrHeight(elem, name, extra);
					}
				},

				set: function set(elem, value, extra) {
					var matches,
					    styles = extra && getStyles(elem),
					    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

					// Convert to pixels if value adjustment is needed
					if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

						elem.style[name] = value;
						value = jQuery.css(elem, name);
					}

					return setPositiveNumber(elem, value, subtract);
				}
			};
		});

		jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
			if (computed) {
				return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
					return elem.getBoundingClientRect().left;
				})) + "px";
			}
		});

		// These hooks are used by animate to expand properties
		jQuery.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function (prefix, suffix) {
			jQuery.cssHooks[prefix + suffix] = {
				expand: function expand(value) {
					var i = 0,
					    expanded = {},


					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [value];

					for (; i < 4; i++) {
						expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
					}

					return expanded;
				}
			};

			if (!rmargin.test(prefix)) {
				jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
			}
		});

		jQuery.fn.extend({
			css: function css(name, value) {
				return access(this, function (elem, name, value) {
					var styles,
					    len,
					    map = {},
					    i = 0;

					if (Array.isArray(name)) {
						styles = getStyles(elem);
						len = name.length;

						for (; i < len; i++) {
							map[name[i]] = jQuery.css(elem, name[i], false, styles);
						}

						return map;
					}

					return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
				}, name, value, arguments.length > 1);
			}
		});

		function Tween(elem, options, prop, end, easing) {
			return new Tween.prototype.init(elem, options, prop, end, easing);
		}
		jQuery.Tween = Tween;

		Tween.prototype = {
			constructor: Tween,
			init: function init(elem, options, prop, end, easing, unit) {
				this.elem = elem;
				this.prop = prop;
				this.easing = easing || jQuery.easing._default;
				this.options = options;
				this.start = this.now = this.cur();
				this.end = end;
				this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
			},
			cur: function cur() {
				var hooks = Tween.propHooks[this.prop];

				return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
			},
			run: function run(percent) {
				var eased,
				    hooks = Tween.propHooks[this.prop];

				if (this.options.duration) {
					this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
				} else {
					this.pos = eased = percent;
				}
				this.now = (this.end - this.start) * eased + this.start;

				if (this.options.step) {
					this.options.step.call(this.elem, this.now, this);
				}

				if (hooks && hooks.set) {
					hooks.set(this);
				} else {
					Tween.propHooks._default.set(this);
				}
				return this;
			}
		};

		Tween.prototype.init.prototype = Tween.prototype;

		Tween.propHooks = {
			_default: {
				get: function get(tween) {
					var result;

					// Use a property on the element directly when it is not a DOM element,
					// or when there is no matching style property that exists.
					if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
						return tween.elem[tween.prop];
					}

					// Passing an empty string as a 3rd parameter to .css will automatically
					// attempt a parseFloat and fallback to a string if the parse fails.
					// Simple values such as "10px" are parsed to Float;
					// complex values such as "rotate(1rad)" are returned as-is.
					result = jQuery.css(tween.elem, tween.prop, "");

					// Empty strings, null, undefined and "auto" are converted to 0.
					return !result || result === "auto" ? 0 : result;
				},
				set: function set(tween) {

					// Use step hook for back compat.
					// Use cssHook if its there.
					// Use .style if available and use plain properties where available.
					if (jQuery.fx.step[tween.prop]) {
						jQuery.fx.step[tween.prop](tween);
					} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
						jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
					} else {
						tween.elem[tween.prop] = tween.now;
					}
				}
			}
		};

		// Support: IE <=9 only
		// Panic based approach to setting things on disconnected nodes
		Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
			set: function set(tween) {
				if (tween.elem.nodeType && tween.elem.parentNode) {
					tween.elem[tween.prop] = tween.now;
				}
			}
		};

		jQuery.easing = {
			linear: function linear(p) {
				return p;
			},
			swing: function swing(p) {
				return 0.5 - Math.cos(p * Math.PI) / 2;
			},
			_default: "swing"
		};

		jQuery.fx = Tween.prototype.init;

		// Back compat <1.8 extension point
		jQuery.fx.step = {};

		var fxNow,
		    inProgress,
		    rfxtypes = /^(?:toggle|show|hide)$/,
		    rrun = /queueHooks$/;

		function schedule() {
			if (inProgress) {
				if (document.hidden === false && window.requestAnimationFrame) {
					window.requestAnimationFrame(schedule);
				} else {
					window.setTimeout(schedule, jQuery.fx.interval);
				}

				jQuery.fx.tick();
			}
		}

		// Animations created synchronously will run synchronously
		function createFxNow() {
			window.setTimeout(function () {
				fxNow = undefined;
			});
			return fxNow = jQuery.now();
		}

		// Generate parameters to create a standard animation
		function genFx(type, includeWidth) {
			var which,
			    i = 0,
			    attrs = { height: type };

			// If we include width, step value is 1 to do all cssExpand values,
			// otherwise step value is 2 to skip over Left and Right
			includeWidth = includeWidth ? 1 : 0;
			for (; i < 4; i += 2 - includeWidth) {
				which = cssExpand[i];
				attrs["margin" + which] = attrs["padding" + which] = type;
			}

			if (includeWidth) {
				attrs.opacity = attrs.width = type;
			}

			return attrs;
		}

		function createTween(value, prop, animation) {
			var tween,
			    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
			    index = 0,
			    length = collection.length;
			for (; index < length; index++) {
				if (tween = collection[index].call(animation, prop, value)) {

					// We're done with this property
					return tween;
				}
			}
		}

		function defaultPrefilter(elem, props, opts) {
			var prop,
			    value,
			    toggle,
			    hooks,
			    oldfire,
			    propTween,
			    restoreDisplay,
			    display,
			    isBox = "width" in props || "height" in props,
			    anim = this,
			    orig = {},
			    style = elem.style,
			    hidden = elem.nodeType && isHiddenWithinTree(elem),
			    dataShow = dataPriv.get(elem, "fxshow");

			// Queue-skipping animations hijack the fx hooks
			if (!opts.queue) {
				hooks = jQuery._queueHooks(elem, "fx");
				if (hooks.unqueued == null) {
					hooks.unqueued = 0;
					oldfire = hooks.empty.fire;
					hooks.empty.fire = function () {
						if (!hooks.unqueued) {
							oldfire();
						}
					};
				}
				hooks.unqueued++;

				anim.always(function () {

					// Ensure the complete handler is called before this completes
					anim.always(function () {
						hooks.unqueued--;
						if (!jQuery.queue(elem, "fx").length) {
							hooks.empty.fire();
						}
					});
				});
			}

			// Detect show/hide animations
			for (prop in props) {
				value = props[prop];
				if (rfxtypes.test(value)) {
					delete props[prop];
					toggle = toggle || value === "toggle";
					if (value === (hidden ? "hide" : "show")) {

						// Pretend to be hidden if this is a "show" and
						// there is still data from a stopped show/hide
						if (value === "show" && dataShow && dataShow[prop] !== undefined) {
							hidden = true;

							// Ignore all other no-op show/hide data
						} else {
							continue;
						}
					}
					orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
				}
			}

			// Bail out if this is a no-op like .hide().hide()
			propTween = !jQuery.isEmptyObject(props);
			if (!propTween && jQuery.isEmptyObject(orig)) {
				return;
			}

			// Restrict "overflow" and "display" styles during box animations
			if (isBox && elem.nodeType === 1) {

				// Support: IE <=9 - 11, Edge 12 - 13
				// Record all 3 overflow attributes because IE does not infer the shorthand
				// from identically-valued overflowX and overflowY
				opts.overflow = [style.overflow, style.overflowX, style.overflowY];

				// Identify a display type, preferring old show/hide data over the CSS cascade
				restoreDisplay = dataShow && dataShow.display;
				if (restoreDisplay == null) {
					restoreDisplay = dataPriv.get(elem, "display");
				}
				display = jQuery.css(elem, "display");
				if (display === "none") {
					if (restoreDisplay) {
						display = restoreDisplay;
					} else {

						// Get nonempty value(s) by temporarily forcing visibility
						showHide([elem], true);
						restoreDisplay = elem.style.display || restoreDisplay;
						display = jQuery.css(elem, "display");
						showHide([elem]);
					}
				}

				// Animate inline elements as inline-block
				if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
					if (jQuery.css(elem, "float") === "none") {

						// Restore the original display value at the end of pure show/hide animations
						if (!propTween) {
							anim.done(function () {
								style.display = restoreDisplay;
							});
							if (restoreDisplay == null) {
								display = style.display;
								restoreDisplay = display === "none" ? "" : display;
							}
						}
						style.display = "inline-block";
					}
				}
			}

			if (opts.overflow) {
				style.overflow = "hidden";
				anim.always(function () {
					style.overflow = opts.overflow[0];
					style.overflowX = opts.overflow[1];
					style.overflowY = opts.overflow[2];
				});
			}

			// Implement show/hide animations
			propTween = false;
			for (prop in orig) {

				// General show/hide setup for this element animation
				if (!propTween) {
					if (dataShow) {
						if ("hidden" in dataShow) {
							hidden = dataShow.hidden;
						}
					} else {
						dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
					}

					// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
					if (toggle) {
						dataShow.hidden = !hidden;
					}

					// Show elements before animating them
					if (hidden) {
						showHide([elem], true);
					}

					/* eslint-disable no-loop-func */

					anim.done(function () {

						/* eslint-enable no-loop-func */

						// The final step of a "hide" animation is actually hiding the element
						if (!hidden) {
							showHide([elem]);
						}
						dataPriv.remove(elem, "fxshow");
						for (prop in orig) {
							jQuery.style(elem, prop, orig[prop]);
						}
					});
				}

				// Per-property setup
				propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
				if (!(prop in dataShow)) {
					dataShow[prop] = propTween.start;
					if (hidden) {
						propTween.end = propTween.start;
						propTween.start = 0;
					}
				}
			}
		}

		function propFilter(props, specialEasing) {
			var index, name, easing, value, hooks;

			// camelCase, specialEasing and expand cssHook pass
			for (index in props) {
				name = jQuery.camelCase(index);
				easing = specialEasing[name];
				value = props[index];
				if (Array.isArray(value)) {
					easing = value[1];
					value = props[index] = value[0];
				}

				if (index !== name) {
					props[name] = value;
					delete props[index];
				}

				hooks = jQuery.cssHooks[name];
				if (hooks && "expand" in hooks) {
					value = hooks.expand(value);
					delete props[name];

					// Not quite $.extend, this won't overwrite existing keys.
					// Reusing 'index' because we have the correct "name"
					for (index in value) {
						if (!(index in props)) {
							props[index] = value[index];
							specialEasing[index] = easing;
						}
					}
				} else {
					specialEasing[name] = easing;
				}
			}
		}

		function Animation(elem, properties, options) {
			var result,
			    stopped,
			    index = 0,
			    length = Animation.prefilters.length,
			    deferred = jQuery.Deferred().always(function () {

				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			    tick = function tick() {
				if (stopped) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
				    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				    percent = 1 - temp,
				    index = 0,
				    length = animation.tweens.length;

				for (; index < length; index++) {
					animation.tweens[index].run(percent);
				}

				deferred.notifyWith(elem, [animation, percent, remaining]);

				// If there's more to do, yield
				if (percent < 1 && length) {
					return remaining;
				}

				// If this was an empty animation, synthesize a final progress notification
				if (!length) {
					deferred.notifyWith(elem, [animation, 1, 0]);
				}

				// Resolve the animation and report its conclusion
				deferred.resolveWith(elem, [animation]);
				return false;
			},
			    animation = deferred.promise({
				elem: elem,
				props: jQuery.extend({}, properties),
				opts: jQuery.extend(true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function createTween(prop, end) {
					var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
					animation.tweens.push(tween);
					return tween;
				},
				stop: function stop(gotoEnd) {
					var index = 0,


					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
					if (stopped) {
						return this;
					}
					stopped = true;
					for (; index < length; index++) {
						animation.tweens[index].run(1);
					}

					// Resolve when we played the last frame; otherwise, reject
					if (gotoEnd) {
						deferred.notifyWith(elem, [animation, 1, 0]);
						deferred.resolveWith(elem, [animation, gotoEnd]);
					} else {
						deferred.rejectWith(elem, [animation, gotoEnd]);
					}
					return this;
				}
			}),
			    props = animation.props;

			propFilter(props, animation.opts.specialEasing);

			for (; index < length; index++) {
				result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
				if (result) {
					if (jQuery.isFunction(result.stop)) {
						jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
					}
					return result;
				}
			}

			jQuery.map(props, createTween, animation);

			if (jQuery.isFunction(animation.opts.start)) {
				animation.opts.start.call(elem, animation);
			}

			// Attach callbacks from options
			animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);

			jQuery.fx.timer(jQuery.extend(tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			}));

			return animation;
		}

		jQuery.Animation = jQuery.extend(Animation, {

			tweeners: {
				"*": [function (prop, value) {
					var tween = this.createTween(prop, value);
					adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
					return tween;
				}]
			},

			tweener: function tweener(props, callback) {
				if (jQuery.isFunction(props)) {
					callback = props;
					props = ["*"];
				} else {
					props = props.match(rnothtmlwhite);
				}

				var prop,
				    index = 0,
				    length = props.length;

				for (; index < length; index++) {
					prop = props[index];
					Animation.tweeners[prop] = Animation.tweeners[prop] || [];
					Animation.tweeners[prop].unshift(callback);
				}
			},

			prefilters: [defaultPrefilter],

			prefilter: function prefilter(callback, prepend) {
				if (prepend) {
					Animation.prefilters.unshift(callback);
				} else {
					Animation.prefilters.push(callback);
				}
			}
		});

		jQuery.speed = function (speed, easing, fn) {
			var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
				complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
				duration: speed,
				easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
			};

			// Go to the end state if fx are off
			if (jQuery.fx.off) {
				opt.duration = 0;
			} else {
				if (typeof opt.duration !== "number") {
					if (opt.duration in jQuery.fx.speeds) {
						opt.duration = jQuery.fx.speeds[opt.duration];
					} else {
						opt.duration = jQuery.fx.speeds._default;
					}
				}
			}

			// Normalize opt.queue - true/undefined/null -> "fx"
			if (opt.queue == null || opt.queue === true) {
				opt.queue = "fx";
			}

			// Queueing
			opt.old = opt.complete;

			opt.complete = function () {
				if (jQuery.isFunction(opt.old)) {
					opt.old.call(this);
				}

				if (opt.queue) {
					jQuery.dequeue(this, opt.queue);
				}
			};

			return opt;
		};

		jQuery.fn.extend({
			fadeTo: function fadeTo(speed, to, easing, callback) {

				// Show any hidden elements after setting opacity to 0
				return this.filter(isHiddenWithinTree).css("opacity", 0).show()

				// Animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback);
			},
			animate: function animate(prop, speed, easing, callback) {
				var empty = jQuery.isEmptyObject(prop),
				    optall = jQuery.speed(speed, easing, callback),
				    doAnimation = function doAnimation() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation(this, jQuery.extend({}, prop), optall);

					// Empty animations, or finishing resolves immediately
					if (empty || dataPriv.get(this, "finish")) {
						anim.stop(true);
					}
				};
				doAnimation.finish = doAnimation;

				return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
			},
			stop: function stop(type, clearQueue, gotoEnd) {
				var stopQueue = function stopQueue(hooks) {
					var stop = hooks.stop;
					delete hooks.stop;
					stop(gotoEnd);
				};

				if (typeof type !== "string") {
					gotoEnd = clearQueue;
					clearQueue = type;
					type = undefined;
				}
				if (clearQueue && type !== false) {
					this.queue(type || "fx", []);
				}

				return this.each(function () {
					var dequeue = true,
					    index = type != null && type + "queueHooks",
					    timers = jQuery.timers,
					    data = dataPriv.get(this);

					if (index) {
						if (data[index] && data[index].stop) {
							stopQueue(data[index]);
						}
					} else {
						for (index in data) {
							if (data[index] && data[index].stop && rrun.test(index)) {
								stopQueue(data[index]);
							}
						}
					}

					for (index = timers.length; index--;) {
						if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

							timers[index].anim.stop(gotoEnd);
							dequeue = false;
							timers.splice(index, 1);
						}
					}

					// Start the next in the queue if the last step wasn't forced.
					// Timers currently will call their complete callbacks, which
					// will dequeue but only if they were gotoEnd.
					if (dequeue || !gotoEnd) {
						jQuery.dequeue(this, type);
					}
				});
			},
			finish: function finish(type) {
				if (type !== false) {
					type = type || "fx";
				}
				return this.each(function () {
					var index,
					    data = dataPriv.get(this),
					    queue = data[type + "queue"],
					    hooks = data[type + "queueHooks"],
					    timers = jQuery.timers,
					    length = queue ? queue.length : 0;

					// Enable finishing flag on private data
					data.finish = true;

					// Empty the queue first
					jQuery.queue(this, type, []);

					if (hooks && hooks.stop) {
						hooks.stop.call(this, true);
					}

					// Look for any active animations, and finish them
					for (index = timers.length; index--;) {
						if (timers[index].elem === this && timers[index].queue === type) {
							timers[index].anim.stop(true);
							timers.splice(index, 1);
						}
					}

					// Look for any animations in the old queue and finish them
					for (index = 0; index < length; index++) {
						if (queue[index] && queue[index].finish) {
							queue[index].finish.call(this);
						}
					}

					// Turn off finishing flag
					delete data.finish;
				});
			}
		});

		jQuery.each(["toggle", "show", "hide"], function (i, name) {
			var cssFn = jQuery.fn[name];
			jQuery.fn[name] = function (speed, easing, callback) {
				return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
			};
		});

		// Generate shortcuts for custom animations
		jQuery.each({
			slideDown: genFx("show"),
			slideUp: genFx("hide"),
			slideToggle: genFx("toggle"),
			fadeIn: { opacity: "show" },
			fadeOut: { opacity: "hide" },
			fadeToggle: { opacity: "toggle" }
		}, function (name, props) {
			jQuery.fn[name] = function (speed, easing, callback) {
				return this.animate(props, speed, easing, callback);
			};
		});

		jQuery.timers = [];
		jQuery.fx.tick = function () {
			var timer,
			    i = 0,
			    timers = jQuery.timers;

			fxNow = jQuery.now();

			for (; i < timers.length; i++) {
				timer = timers[i];

				// Run the timer and safely remove it when done (allowing for external removal)
				if (!timer() && timers[i] === timer) {
					timers.splice(i--, 1);
				}
			}

			if (!timers.length) {
				jQuery.fx.stop();
			}
			fxNow = undefined;
		};

		jQuery.fx.timer = function (timer) {
			jQuery.timers.push(timer);
			jQuery.fx.start();
		};

		jQuery.fx.interval = 13;
		jQuery.fx.start = function () {
			if (inProgress) {
				return;
			}

			inProgress = true;
			schedule();
		};

		jQuery.fx.stop = function () {
			inProgress = null;
		};

		jQuery.fx.speeds = {
			slow: 600,
			fast: 200,

			// Default speed
			_default: 400
		};

		// Based off of the plugin by Clint Helfers, with permission.
		// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
		jQuery.fn.delay = function (time, type) {
			time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
			type = type || "fx";

			return this.queue(type, function (next, hooks) {
				var timeout = window.setTimeout(next, time);
				hooks.stop = function () {
					window.clearTimeout(timeout);
				};
			});
		};

		(function () {
			var input = document.createElement("input"),
			    select = document.createElement("select"),
			    opt = select.appendChild(document.createElement("option"));

			input.type = "checkbox";

			// Support: Android <=4.3 only
			// Default value for a checkbox should be "on"
			support.checkOn = input.value !== "";

			// Support: IE <=11 only
			// Must access selectedIndex to make default options select
			support.optSelected = opt.selected;

			// Support: IE <=11 only
			// An input loses its value after becoming a radio
			input = document.createElement("input");
			input.value = "t";
			input.type = "radio";
			support.radioValue = input.value === "t";
		})();

		var boolHook,
		    attrHandle = jQuery.expr.attrHandle;

		jQuery.fn.extend({
			attr: function attr(name, value) {
				return access(this, jQuery.attr, name, value, arguments.length > 1);
			},

			removeAttr: function removeAttr(name) {
				return this.each(function () {
					jQuery.removeAttr(this, name);
				});
			}
		});

		jQuery.extend({
			attr: function attr(elem, name, value) {
				var ret,
				    hooks,
				    nType = elem.nodeType;

				// Don't get/set attributes on text, comment and attribute nodes
				if (nType === 3 || nType === 8 || nType === 2) {
					return;
				}

				// Fallback to prop when attributes are not supported
				if (typeof elem.getAttribute === "undefined") {
					return jQuery.prop(elem, name, value);
				}

				// Attribute hooks are determined by the lowercase version
				// Grab necessary hook if one is defined
				if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
					hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
				}

				if (value !== undefined) {
					if (value === null) {
						jQuery.removeAttr(elem, name);
						return;
					}

					if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
						return ret;
					}

					elem.setAttribute(name, value + "");
					return value;
				}

				if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
					return ret;
				}

				ret = jQuery.find.attr(elem, name);

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ? undefined : ret;
			},

			attrHooks: {
				type: {
					set: function set(elem, value) {
						if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
							var val = elem.value;
							elem.setAttribute("type", value);
							if (val) {
								elem.value = val;
							}
							return value;
						}
					}
				}
			},

			removeAttr: function removeAttr(elem, value) {
				var name,
				    i = 0,


				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match(rnothtmlwhite);

				if (attrNames && elem.nodeType === 1) {
					while (name = attrNames[i++]) {
						elem.removeAttribute(name);
					}
				}
			}
		});

		// Hooks for boolean attributes
		boolHook = {
			set: function set(elem, value, name) {
				if (value === false) {

					// Remove boolean attributes when set to false
					jQuery.removeAttr(elem, name);
				} else {
					elem.setAttribute(name, name);
				}
				return name;
			}
		};

		jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
			var getter = attrHandle[name] || jQuery.find.attr;

			attrHandle[name] = function (elem, name, isXML) {
				var ret,
				    handle,
				    lowercaseName = name.toLowerCase();

				if (!isXML) {

					// Avoid an infinite loop by temporarily removing this function from the getter
					handle = attrHandle[lowercaseName];
					attrHandle[lowercaseName] = ret;
					ret = getter(elem, name, isXML) != null ? lowercaseName : null;
					attrHandle[lowercaseName] = handle;
				}
				return ret;
			};
		});

		var rfocusable = /^(?:input|select|textarea|button)$/i,
		    rclickable = /^(?:a|area)$/i;

		jQuery.fn.extend({
			prop: function prop(name, value) {
				return access(this, jQuery.prop, name, value, arguments.length > 1);
			},

			removeProp: function removeProp(name) {
				return this.each(function () {
					delete this[jQuery.propFix[name] || name];
				});
			}
		});

		jQuery.extend({
			prop: function prop(elem, name, value) {
				var ret,
				    hooks,
				    nType = elem.nodeType;

				// Don't get/set properties on text, comment and attribute nodes
				if (nType === 3 || nType === 8 || nType === 2) {
					return;
				}

				if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

					// Fix name and attach hooks
					name = jQuery.propFix[name] || name;
					hooks = jQuery.propHooks[name];
				}

				if (value !== undefined) {
					if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
						return ret;
					}

					return elem[name] = value;
				}

				if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
					return ret;
				}

				return elem[name];
			},

			propHooks: {
				tabIndex: {
					get: function get(elem) {

						// Support: IE <=9 - 11 only
						// elem.tabIndex doesn't always return the
						// correct value when it hasn't been explicitly set
						// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
						// Use proper attribute retrieval(#12072)
						var tabindex = jQuery.find.attr(elem, "tabindex");

						if (tabindex) {
							return parseInt(tabindex, 10);
						}

						if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
							return 0;
						}

						return -1;
					}
				}
			},

			propFix: {
				"for": "htmlFor",
				"class": "className"
			}
		});

		// Support: IE <=11 only
		// Accessing the selectedIndex property
		// forces the browser to respect setting selected
		// on the option
		// The getter ensures a default option is selected
		// when in an optgroup
		// eslint rule "no-unused-expressions" is disabled for this code
		// since it considers such accessions noop
		if (!support.optSelected) {
			jQuery.propHooks.selected = {
				get: function get(elem) {

					/* eslint no-unused-expressions: "off" */

					var parent = elem.parentNode;
					if (parent && parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
					return null;
				},
				set: function set(elem) {

					/* eslint no-unused-expressions: "off" */

					var parent = elem.parentNode;
					if (parent) {
						parent.selectedIndex;

						if (parent.parentNode) {
							parent.parentNode.selectedIndex;
						}
					}
				}
			};
		}

		jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
			jQuery.propFix[this.toLowerCase()] = this;
		});

		// Strip and collapse whitespace according to HTML spec
		// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
		function stripAndCollapse(value) {
			var tokens = value.match(rnothtmlwhite) || [];
			return tokens.join(" ");
		}

		function getClass(elem) {
			return elem.getAttribute && elem.getAttribute("class") || "";
		}

		jQuery.fn.extend({
			addClass: function addClass(value) {
				var classes,
				    elem,
				    cur,
				    curValue,
				    clazz,
				    j,
				    finalValue,
				    i = 0;

				if (jQuery.isFunction(value)) {
					return this.each(function (j) {
						jQuery(this).addClass(value.call(this, j, getClass(this)));
					});
				}

				if (typeof value === "string" && value) {
					classes = value.match(rnothtmlwhite) || [];

					while (elem = this[i++]) {
						curValue = getClass(elem);
						cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

						if (cur) {
							j = 0;
							while (clazz = classes[j++]) {
								if (cur.indexOf(" " + clazz + " ") < 0) {
									cur += clazz + " ";
								}
							}

							// Only assign if different to avoid unneeded rendering.
							finalValue = stripAndCollapse(cur);
							if (curValue !== finalValue) {
								elem.setAttribute("class", finalValue);
							}
						}
					}
				}

				return this;
			},

			removeClass: function removeClass(value) {
				var classes,
				    elem,
				    cur,
				    curValue,
				    clazz,
				    j,
				    finalValue,
				    i = 0;

				if (jQuery.isFunction(value)) {
					return this.each(function (j) {
						jQuery(this).removeClass(value.call(this, j, getClass(this)));
					});
				}

				if (!arguments.length) {
					return this.attr("class", "");
				}

				if (typeof value === "string" && value) {
					classes = value.match(rnothtmlwhite) || [];

					while (elem = this[i++]) {
						curValue = getClass(elem);

						// This expression is here for better compressibility (see addClass)
						cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

						if (cur) {
							j = 0;
							while (clazz = classes[j++]) {

								// Remove *all* instances
								while (cur.indexOf(" " + clazz + " ") > -1) {
									cur = cur.replace(" " + clazz + " ", " ");
								}
							}

							// Only assign if different to avoid unneeded rendering.
							finalValue = stripAndCollapse(cur);
							if (curValue !== finalValue) {
								elem.setAttribute("class", finalValue);
							}
						}
					}
				}

				return this;
			},

			toggleClass: function toggleClass(value, stateVal) {
				var type = typeof value === "undefined" ? "undefined" : _typeof(value);

				if (typeof stateVal === "boolean" && type === "string") {
					return stateVal ? this.addClass(value) : this.removeClass(value);
				}

				if (jQuery.isFunction(value)) {
					return this.each(function (i) {
						jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
					});
				}

				return this.each(function () {
					var className, i, self, classNames;

					if (type === "string") {

						// Toggle individual class names
						i = 0;
						self = jQuery(this);
						classNames = value.match(rnothtmlwhite) || [];

						while (className = classNames[i++]) {

							// Check each className given, space separated list
							if (self.hasClass(className)) {
								self.removeClass(className);
							} else {
								self.addClass(className);
							}
						}

						// Toggle whole class name
					} else if (value === undefined || type === "boolean") {
						className = getClass(this);
						if (className) {

							// Store className if set
							dataPriv.set(this, "__className__", className);
						}

						// If the element has a class name or if we're passed `false`,
						// then remove the whole classname (if there was one, the above saved it).
						// Otherwise bring back whatever was previously saved (if anything),
						// falling back to the empty string if nothing was stored.
						if (this.setAttribute) {
							this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
						}
					}
				});
			},

			hasClass: function hasClass(selector) {
				var className,
				    elem,
				    i = 0;

				className = " " + selector + " ";
				while (elem = this[i++]) {
					if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
						return true;
					}
				}

				return false;
			}
		});

		var rreturn = /\r/g;

		jQuery.fn.extend({
			val: function val(value) {
				var hooks,
				    ret,
				    isFunction,
				    elem = this[0];

				if (!arguments.length) {
					if (elem) {
						hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

						if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
							return ret;
						}

						ret = elem.value;

						// Handle most common string cases
						if (typeof ret === "string") {
							return ret.replace(rreturn, "");
						}

						// Handle cases where value is null/undef or number
						return ret == null ? "" : ret;
					}

					return;
				}

				isFunction = jQuery.isFunction(value);

				return this.each(function (i) {
					var val;

					if (this.nodeType !== 1) {
						return;
					}

					if (isFunction) {
						val = value.call(this, i, jQuery(this).val());
					} else {
						val = value;
					}

					// Treat null/undefined as ""; convert numbers to string
					if (val == null) {
						val = "";
					} else if (typeof val === "number") {
						val += "";
					} else if (Array.isArray(val)) {
						val = jQuery.map(val, function (value) {
							return value == null ? "" : value + "";
						});
					}

					hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

					// If set returns undefined, fall back to normal setting
					if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
						this.value = val;
					}
				});
			}
		});

		jQuery.extend({
			valHooks: {
				option: {
					get: function get(elem) {

						var val = jQuery.find.attr(elem, "value");
						return val != null ? val :

						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse(jQuery.text(elem));
					}
				},
				select: {
					get: function get(elem) {
						var value,
						    option,
						    i,
						    options = elem.options,
						    index = elem.selectedIndex,
						    one = elem.type === "select-one",
						    values = one ? null : [],
						    max = one ? index + 1 : options.length;

						if (index < 0) {
							i = max;
						} else {
							i = one ? index : 0;
						}

						// Loop through all the selected options
						for (; i < max; i++) {
							option = options[i];

							// Support: IE <=9 only
							// IE8-9 doesn't update selected after form reset (#2551)
							if ((option.selected || i === index) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {

								// Get the specific value for the option
								value = jQuery(option).val();

								// We don't need an array for one selects
								if (one) {
									return value;
								}

								// Multi-Selects return an array
								values.push(value);
							}
						}

						return values;
					},

					set: function set(elem, value) {
						var optionSet,
						    option,
						    options = elem.options,
						    values = jQuery.makeArray(value),
						    i = options.length;

						while (i--) {
							option = options[i];

							/* eslint-disable no-cond-assign */

							if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
								optionSet = true;
							}

							/* eslint-enable no-cond-assign */
						}

						// Force browsers to behave consistently when non-matching value is set
						if (!optionSet) {
							elem.selectedIndex = -1;
						}
						return values;
					}
				}
			}
		});

		// Radios and checkboxes getter/setter
		jQuery.each(["radio", "checkbox"], function () {
			jQuery.valHooks[this] = {
				set: function set(elem, value) {
					if (Array.isArray(value)) {
						return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
					}
				}
			};
			if (!support.checkOn) {
				jQuery.valHooks[this].get = function (elem) {
					return elem.getAttribute("value") === null ? "on" : elem.value;
				};
			}
		});

		// Return jQuery for attributes-only inclusion


		var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

		jQuery.extend(jQuery.event, {

			trigger: function trigger(event, data, elem, onlyHandlers) {

				var i,
				    cur,
				    tmp,
				    bubbleType,
				    ontype,
				    handle,
				    special,
				    eventPath = [elem || document],
				    type = hasOwn.call(event, "type") ? event.type : event,
				    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

				cur = tmp = elem = elem || document;

				// Don't do events on text and comment nodes
				if (elem.nodeType === 3 || elem.nodeType === 8) {
					return;
				}

				// focus/blur morphs to focusin/out; ensure we're not firing them right now
				if (rfocusMorph.test(type + jQuery.event.triggered)) {
					return;
				}

				if (type.indexOf(".") > -1) {

					// Namespaced trigger; create a regexp to match event type in handle()
					namespaces = type.split(".");
					type = namespaces.shift();
					namespaces.sort();
				}
				ontype = type.indexOf(":") < 0 && "on" + type;

				// Caller can pass in a jQuery.Event object, Object, or just an event type string
				event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

				// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
				event.isTrigger = onlyHandlers ? 2 : 3;
				event.namespace = namespaces.join(".");
				event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

				// Clean up the event in case it is being reused
				event.result = undefined;
				if (!event.target) {
					event.target = elem;
				}

				// Clone any incoming data and prepend the event, creating the handler arg list
				data = data == null ? [event] : jQuery.makeArray(data, [event]);

				// Allow special events to draw outside the lines
				special = jQuery.event.special[type] || {};
				if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
					return;
				}

				// Determine event propagation path in advance, per W3C events spec (#9951)
				// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
				if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

					bubbleType = special.delegateType || type;
					if (!rfocusMorph.test(bubbleType + type)) {
						cur = cur.parentNode;
					}
					for (; cur; cur = cur.parentNode) {
						eventPath.push(cur);
						tmp = cur;
					}

					// Only add window if we got to document (e.g., not plain obj or detached DOM)
					if (tmp === (elem.ownerDocument || document)) {
						eventPath.push(tmp.defaultView || tmp.parentWindow || window);
					}
				}

				// Fire handlers on the event path
				i = 0;
				while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

					event.type = i > 1 ? bubbleType : special.bindType || type;

					// jQuery handler
					handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
					if (handle) {
						handle.apply(cur, data);
					}

					// Native handler
					handle = ontype && cur[ontype];
					if (handle && handle.apply && acceptData(cur)) {
						event.result = handle.apply(cur, data);
						if (event.result === false) {
							event.preventDefault();
						}
					}
				}
				event.type = type;

				// If nobody prevented the default action, do it now
				if (!onlyHandlers && !event.isDefaultPrevented()) {

					if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

						// Call a native DOM method on the target with the same name as the event.
						// Don't do default actions on window, that's where global variables be (#6170)
						if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

							// Don't re-trigger an onFOO event when we call its FOO() method
							tmp = elem[ontype];

							if (tmp) {
								elem[ontype] = null;
							}

							// Prevent re-triggering of the same event, since we already bubbled it above
							jQuery.event.triggered = type;
							elem[type]();
							jQuery.event.triggered = undefined;

							if (tmp) {
								elem[ontype] = tmp;
							}
						}
					}
				}

				return event.result;
			},

			// Piggyback on a donor event to simulate a different one
			// Used only for `focus(in | out)` events
			simulate: function simulate(type, elem, event) {
				var e = jQuery.extend(new jQuery.Event(), event, {
					type: type,
					isSimulated: true
				});

				jQuery.event.trigger(e, null, elem);
			}

		});

		jQuery.fn.extend({

			trigger: function trigger(type, data) {
				return this.each(function () {
					jQuery.event.trigger(type, data, this);
				});
			},
			triggerHandler: function triggerHandler(type, data) {
				var elem = this[0];
				if (elem) {
					return jQuery.event.trigger(type, data, elem, true);
				}
			}
		});

		jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {

			// Handle event binding
			jQuery.fn[name] = function (data, fn) {
				return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
			};
		});

		jQuery.fn.extend({
			hover: function hover(fnOver, fnOut) {
				return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
			}
		});

		support.focusin = "onfocusin" in window;

		// Support: Firefox <=44
		// Firefox doesn't have focus(in | out) events
		// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
		//
		// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
		// focus(in | out) events fire after focus & blur events,
		// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
		// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
		if (!support.focusin) {
			jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

				// Attach a single capturing handler on the document while someone wants focusin/focusout
				var handler = function handler(event) {
					jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
				};

				jQuery.event.special[fix] = {
					setup: function setup() {
						var doc = this.ownerDocument || this,
						    attaches = dataPriv.access(doc, fix);

						if (!attaches) {
							doc.addEventListener(orig, handler, true);
						}
						dataPriv.access(doc, fix, (attaches || 0) + 1);
					},
					teardown: function teardown() {
						var doc = this.ownerDocument || this,
						    attaches = dataPriv.access(doc, fix) - 1;

						if (!attaches) {
							doc.removeEventListener(orig, handler, true);
							dataPriv.remove(doc, fix);
						} else {
							dataPriv.access(doc, fix, attaches);
						}
					}
				};
			});
		}
		var location = window.location;

		var nonce = jQuery.now();

		var rquery = /\?/;

		// Cross-browser xml parsing
		jQuery.parseXML = function (data) {
			var xml;
			if (!data || typeof data !== "string") {
				return null;
			}

			// Support: IE 9 - 11 only
			// IE throws on parseFromString with invalid input.
			try {
				xml = new window.DOMParser().parseFromString(data, "text/xml");
			} catch (e) {
				xml = undefined;
			}

			if (!xml || xml.getElementsByTagName("parsererror").length) {
				jQuery.error("Invalid XML: " + data);
			}
			return xml;
		};

		var rbracket = /\[\]$/,
		    rCRLF = /\r?\n/g,
		    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		    rsubmittable = /^(?:input|select|textarea|keygen)/i;

		function buildParams(prefix, obj, traditional, add) {
			var name;

			if (Array.isArray(obj)) {

				// Serialize array item.
				jQuery.each(obj, function (i, v) {
					if (traditional || rbracket.test(prefix)) {

						// Treat each array item as a scalar.
						add(prefix, v);
					} else {

						// Item is non-scalar (array or object), encode its numeric index.
						buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
					}
				});
			} else if (!traditional && jQuery.type(obj) === "object") {

				// Serialize object item.
				for (name in obj) {
					buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
				}
			} else {

				// Serialize scalar item.
				add(prefix, obj);
			}
		}

		// Serialize an array of form elements or a set of
		// key/values into a query string
		jQuery.param = function (a, traditional) {
			var prefix,
			    s = [],
			    add = function add(key, valueOrFunction) {

				// If value is a function, invoke it and use its return value
				var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
			};

			// If an array was passed in, assume that it is an array of form elements.
			if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

				// Serialize the form elements
				jQuery.each(a, function () {
					add(this.name, this.value);
				});
			} else {

				// If traditional, encode the "old" way (the way 1.3.2 or older
				// did it), otherwise encode params recursively.
				for (prefix in a) {
					buildParams(prefix, a[prefix], traditional, add);
				}
			}

			// Return the resulting serialization
			return s.join("&");
		};

		jQuery.fn.extend({
			serialize: function serialize() {
				return jQuery.param(this.serializeArray());
			},
			serializeArray: function serializeArray() {
				return this.map(function () {

					// Can add propHook for "elements" to filter or add form elements
					var elements = jQuery.prop(this, "elements");
					return elements ? jQuery.makeArray(elements) : this;
				}).filter(function () {
					var type = this.type;

					// Use .is( ":disabled" ) so that fieldset[disabled] works
					return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
				}).map(function (i, elem) {
					var val = jQuery(this).val();

					if (val == null) {
						return null;
					}

					if (Array.isArray(val)) {
						return jQuery.map(val, function (val) {
							return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
						});
					}

					return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
				}).get();
			}
		});

		var r20 = /%20/g,
		    rhash = /#.*$/,
		    rantiCache = /([?&])_=[^&]*/,
		    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		    rnoContent = /^(?:GET|HEAD)$/,
		    rprotocol = /^\/\//,


		/* Prefilters
	  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	  * 2) These are called:
	  *    - BEFORE asking for a transport
	  *    - AFTER param serialization (s.data is a string if s.processData is true)
	  * 3) key is the dataType
	  * 4) the catchall symbol "*" can be used
	  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	  */
		prefilters = {},


		/* Transports bindings
	  * 1) key is the dataType
	  * 2) the catchall symbol "*" can be used
	  * 3) selection will start with transport dataType and THEN go to "*" if needed
	  */
		transports = {},


		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat("*"),


		// Anchor tag for parsing the document origin
		originAnchor = document.createElement("a");
		originAnchor.href = location.href;

		// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
		function addToPrefiltersOrTransports(structure) {

			// dataTypeExpression is optional and defaults to "*"
			return function (dataTypeExpression, func) {

				if (typeof dataTypeExpression !== "string") {
					func = dataTypeExpression;
					dataTypeExpression = "*";
				}

				var dataType,
				    i = 0,
				    dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

				if (jQuery.isFunction(func)) {

					// For each dataType in the dataTypeExpression
					while (dataType = dataTypes[i++]) {

						// Prepend if requested
						if (dataType[0] === "+") {
							dataType = dataType.slice(1) || "*";
							(structure[dataType] = structure[dataType] || []).unshift(func);

							// Otherwise append
						} else {
							(structure[dataType] = structure[dataType] || []).push(func);
						}
					}
				}
			};
		}

		// Base inspection function for prefilters and transports
		function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

			var inspected = {},
			    seekingTransport = structure === transports;

			function inspect(dataType) {
				var selected;
				inspected[dataType] = true;
				jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
					var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
					if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

						options.dataTypes.unshift(dataTypeOrTransport);
						inspect(dataTypeOrTransport);
						return false;
					} else if (seekingTransport) {
						return !(selected = dataTypeOrTransport);
					}
				});
				return selected;
			}

			return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
		}

		// A special extend for ajax options
		// that takes "flat" options (not to be deep extended)
		// Fixes #9887
		function ajaxExtend(target, src) {
			var key,
			    deep,
			    flatOptions = jQuery.ajaxSettings.flatOptions || {};

			for (key in src) {
				if (src[key] !== undefined) {
					(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
				}
			}
			if (deep) {
				jQuery.extend(true, target, deep);
			}

			return target;
		}

		/* Handles responses to an ajax request:
	  * - finds the right dataType (mediates between content-type and expected dataType)
	  * - returns the corresponding response
	  */
		function ajaxHandleResponses(s, jqXHR, responses) {

			var ct,
			    type,
			    finalDataType,
			    firstDataType,
			    contents = s.contents,
			    dataTypes = s.dataTypes;

			// Remove auto dataType and get content-type in the process
			while (dataTypes[0] === "*") {
				dataTypes.shift();
				if (ct === undefined) {
					ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
				}
			}

			// Check if we're dealing with a known content-type
			if (ct) {
				for (type in contents) {
					if (contents[type] && contents[type].test(ct)) {
						dataTypes.unshift(type);
						break;
					}
				}
			}

			// Check to see if we have a response for the expected dataType
			if (dataTypes[0] in responses) {
				finalDataType = dataTypes[0];
			} else {

				// Try convertible dataTypes
				for (type in responses) {
					if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
						finalDataType = type;
						break;
					}
					if (!firstDataType) {
						firstDataType = type;
					}
				}

				// Or just use first one
				finalDataType = finalDataType || firstDataType;
			}

			// If we found a dataType
			// We add the dataType to the list if needed
			// and return the corresponding response
			if (finalDataType) {
				if (finalDataType !== dataTypes[0]) {
					dataTypes.unshift(finalDataType);
				}
				return responses[finalDataType];
			}
		}

		/* Chain conversions given the request and the original response
	  * Also sets the responseXXX fields on the jqXHR instance
	  */
		function ajaxConvert(s, response, jqXHR, isSuccess) {
			var conv2,
			    current,
			    conv,
			    tmp,
			    prev,
			    converters = {},


			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

			// Create converters map with lowercased keys
			if (dataTypes[1]) {
				for (conv in s.converters) {
					converters[conv.toLowerCase()] = s.converters[conv];
				}
			}

			current = dataTypes.shift();

			// Convert to each sequential dataType
			while (current) {

				if (s.responseFields[current]) {
					jqXHR[s.responseFields[current]] = response;
				}

				// Apply the dataFilter if provided
				if (!prev && isSuccess && s.dataFilter) {
					response = s.dataFilter(response, s.dataType);
				}

				prev = current;
				current = dataTypes.shift();

				if (current) {

					// There's only work to do if current dataType is non-auto
					if (current === "*") {

						current = prev;

						// Convert response if prev dataType is non-auto and differs from current
					} else if (prev !== "*" && prev !== current) {

						// Seek a direct converter
						conv = converters[prev + " " + current] || converters["* " + current];

						// If none found, seek a pair
						if (!conv) {
							for (conv2 in converters) {

								// If conv2 outputs current
								tmp = conv2.split(" ");
								if (tmp[1] === current) {

									// If prev can be converted to accepted input
									conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
									if (conv) {

										// Condense equivalence converters
										if (conv === true) {
											conv = converters[conv2];

											// Otherwise, insert the intermediate dataType
										} else if (converters[conv2] !== true) {
											current = tmp[0];
											dataTypes.unshift(tmp[1]);
										}
										break;
									}
								}
							}
						}

						// Apply converter (if not an equivalence)
						if (conv !== true) {

							// Unless errors are allowed to bubble, catch and return them
							if (conv && s.throws) {
								response = conv(response);
							} else {
								try {
									response = conv(response);
								} catch (e) {
									return {
										state: "parsererror",
										error: conv ? e : "No conversion from " + prev + " to " + current
									};
								}
							}
						}
					}
				}
			}

			return { state: "success", data: response };
		}

		jQuery.extend({

			// Counter for holding the number of active queries
			active: 0,

			// Last-Modified header cache for next request
			lastModified: {},
			etag: {},

			ajaxSettings: {
				url: location.href,
				type: "GET",
				isLocal: rlocalProtocol.test(location.protocol),
				global: true,
				processData: true,
				async: true,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",

				/*
	   timeout: 0,
	   data: null,
	   dataType: null,
	   username: null,
	   password: null,
	   cache: null,
	   throws: false,
	   traditional: false,
	   headers: {},
	   */

				accepts: {
					"*": allTypes,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},

				contents: {
					xml: /\bxml\b/,
					html: /\bhtml/,
					json: /\bjson\b/
				},

				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},

				// Data converters
				// Keys separate source (or catchall "*") and destination types with a single space
				converters: {

					// Convert anything to text
					"* text": String,

					// Text to html (true = no transformation)
					"text html": true,

					// Evaluate text as a json expression
					"text json": JSON.parse,

					// Parse text as xml
					"text xml": jQuery.parseXML
				},

				// For options that shouldn't be deep extended:
				// you can add your own custom options here if
				// and when you create one that shouldn't be
				// deep extended (see ajaxExtend)
				flatOptions: {
					url: true,
					context: true
				}
			},

			// Creates a full fledged settings object into target
			// with both ajaxSettings and settings fields.
			// If target is omitted, writes into ajaxSettings.
			ajaxSetup: function ajaxSetup(target, settings) {
				return settings ?

				// Building a settings object
				ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

				// Extending ajaxSettings
				ajaxExtend(jQuery.ajaxSettings, target);
			},

			ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
			ajaxTransport: addToPrefiltersOrTransports(transports),

			// Main method
			ajax: function ajax(url, options) {

				// If url is an object, simulate pre-1.5 signature
				if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
					options = url;
					url = undefined;
				}

				// Force options to be an object
				options = options || {};

				var transport,


				// URL without anti-cache param
				cacheURL,


				// Response headers
				responseHeadersString,
				    responseHeaders,


				// timeout handle
				timeoutTimer,


				// Url cleanup var
				urlAnchor,


				// Request state (becomes false upon send and true upon completion)
				completed,


				// To know if global events are to be dispatched
				fireGlobals,


				// Loop variable
				i,


				// uncached part of the url
				uncached,


				// Create the final options object
				s = jQuery.ajaxSetup({}, options),


				// Callbacks context
				callbackContext = s.context || s,


				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


				// Deferreds
				deferred = jQuery.Deferred(),
				    completeDeferred = jQuery.Callbacks("once memory"),


				// Status-dependent callbacks
				_statusCode = s.statusCode || {},


				// Headers (they are sent all at once)
				requestHeaders = {},
				    requestHeadersNames = {},


				// Default abort message
				strAbort = "canceled",


				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function getResponseHeader(key) {
						var match;
						if (completed) {
							if (!responseHeaders) {
								responseHeaders = {};
								while (match = rheaders.exec(responseHeadersString)) {
									responseHeaders[match[1].toLowerCase()] = match[2];
								}
							}
							match = responseHeaders[key.toLowerCase()];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function getAllResponseHeaders() {
						return completed ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function setRequestHeader(name, value) {
						if (completed == null) {
							name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
							requestHeaders[name] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function overrideMimeType(type) {
						if (completed == null) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function statusCode(map) {
						var code;
						if (map) {
							if (completed) {

								// Execute the appropriate callbacks
								jqXHR.always(map[jqXHR.status]);
							} else {

								// Lazy-add the new callbacks in a way that preserves old ones
								for (code in map) {
									_statusCode[code] = [_statusCode[code], map[code]];
								}
							}
						}
						return this;
					},

					// Cancel the request
					abort: function abort(statusText) {
						var finalText = statusText || strAbort;
						if (transport) {
							transport.abort(finalText);
						}
						done(0, finalText);
						return this;
					}
				};

				// Attach deferreds
				deferred.promise(jqXHR);

				// Add protocol if not provided (prefilters might expect it)
				// Handle falsy url in the settings object (#10093: consistency with old signature)
				// We also use the url parameter if available
				s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

				// Alias method option to type as per ticket #12004
				s.type = options.method || options.type || s.method || s.type;

				// Extract dataTypes list
				s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

				// A cross-domain request is in order when the origin doesn't match the current origin.
				if (s.crossDomain == null) {
					urlAnchor = document.createElement("a");

					// Support: IE <=8 - 11, Edge 12 - 13
					// IE throws exception on accessing the href property if url is malformed,
					// e.g. http://example.com:80x/
					try {
						urlAnchor.href = s.url;

						// Support: IE <=8 - 11 only
						// Anchor's host property isn't correctly set when s.url is relative
						urlAnchor.href = urlAnchor.href;
						s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
					} catch (e) {

						// If there is an error parsing the URL, assume it is crossDomain,
						// it can be rejected by the transport if it is invalid
						s.crossDomain = true;
					}
				}

				// Convert data if not already a string
				if (s.data && s.processData && typeof s.data !== "string") {
					s.data = jQuery.param(s.data, s.traditional);
				}

				// Apply prefilters
				inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

				// If request was aborted inside a prefilter, stop there
				if (completed) {
					return jqXHR;
				}

				// We can fire global events as of now if asked to
				// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
				fireGlobals = jQuery.event && s.global;

				// Watch for a new set of requests
				if (fireGlobals && jQuery.active++ === 0) {
					jQuery.event.trigger("ajaxStart");
				}

				// Uppercase the type
				s.type = s.type.toUpperCase();

				// Determine if request has content
				s.hasContent = !rnoContent.test(s.type);

				// Save the URL in case we're toying with the If-Modified-Since
				// and/or If-None-Match header later on
				// Remove hash to simplify url manipulation
				cacheURL = s.url.replace(rhash, "");

				// More options handling for requests with no content
				if (!s.hasContent) {

					// Remember the hash so we can put it back
					uncached = s.url.slice(cacheURL.length);

					// If data is available, append data to url
					if (s.data) {
						cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

						// #9682: remove data so that it's not used in an eventual retry
						delete s.data;
					}

					// Add or update anti-cache param if needed
					if (s.cache === false) {
						cacheURL = cacheURL.replace(rantiCache, "$1");
						uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
					}

					// Put hash and anti-cache on the URL that will be requested (gh-1732)
					s.url = cacheURL + uncached;

					// Change '%20' to '+' if this is encoded form body content (gh-2658)
				} else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
					s.data = s.data.replace(r20, "+");
				}

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if (s.ifModified) {
					if (jQuery.lastModified[cacheURL]) {
						jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
					}
					if (jQuery.etag[cacheURL]) {
						jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
					}
				}

				// Set the correct header, if data is being sent
				if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
					jqXHR.setRequestHeader("Content-Type", s.contentType);
				}

				// Set the Accepts header for the server, depending on the dataType
				jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

				// Check for headers option
				for (i in s.headers) {
					jqXHR.setRequestHeader(i, s.headers[i]);
				}

				// Allow custom headers/mimetypes and early abort
				if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

					// Abort if not done already and return
					return jqXHR.abort();
				}

				// Aborting is no longer a cancellation
				strAbort = "abort";

				// Install callbacks on deferreds
				completeDeferred.add(s.complete);
				jqXHR.done(s.success);
				jqXHR.fail(s.error);

				// Get transport
				transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

				// If no transport, we auto-abort
				if (!transport) {
					done(-1, "No Transport");
				} else {
					jqXHR.readyState = 1;

					// Send global event
					if (fireGlobals) {
						globalEventContext.trigger("ajaxSend", [jqXHR, s]);
					}

					// If request was aborted inside ajaxSend, stop there
					if (completed) {
						return jqXHR;
					}

					// Timeout
					if (s.async && s.timeout > 0) {
						timeoutTimer = window.setTimeout(function () {
							jqXHR.abort("timeout");
						}, s.timeout);
					}

					try {
						completed = false;
						transport.send(requestHeaders, done);
					} catch (e) {

						// Rethrow post-completion exceptions
						if (completed) {
							throw e;
						}

						// Propagate others as results
						done(-1, e);
					}
				}

				// Callback for when everything is done
				function done(status, nativeStatusText, responses, headers) {
					var isSuccess,
					    success,
					    error,
					    response,
					    modified,
					    statusText = nativeStatusText;

					// Ignore repeat invocations
					if (completed) {
						return;
					}

					completed = true;

					// Clear timeout if it exists
					if (timeoutTimer) {
						window.clearTimeout(timeoutTimer);
					}

					// Dereference transport for early garbage collection
					// (no matter how long the jqXHR object will be used)
					transport = undefined;

					// Cache response headers
					responseHeadersString = headers || "";

					// Set readyState
					jqXHR.readyState = status > 0 ? 4 : 0;

					// Determine if successful
					isSuccess = status >= 200 && status < 300 || status === 304;

					// Get response data
					if (responses) {
						response = ajaxHandleResponses(s, jqXHR, responses);
					}

					// Convert no matter what (that way responseXXX fields are always set)
					response = ajaxConvert(s, response, jqXHR, isSuccess);

					// If successful, handle type chaining
					if (isSuccess) {

						// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
						if (s.ifModified) {
							modified = jqXHR.getResponseHeader("Last-Modified");
							if (modified) {
								jQuery.lastModified[cacheURL] = modified;
							}
							modified = jqXHR.getResponseHeader("etag");
							if (modified) {
								jQuery.etag[cacheURL] = modified;
							}
						}

						// if no content
						if (status === 204 || s.type === "HEAD") {
							statusText = "nocontent";

							// if not modified
						} else if (status === 304) {
							statusText = "notmodified";

							// If we have data, let's convert it
						} else {
							statusText = response.state;
							success = response.data;
							error = response.error;
							isSuccess = !error;
						}
					} else {

						// Extract error from statusText and normalize for non-aborts
						error = statusText;
						if (status || !statusText) {
							statusText = "error";
							if (status < 0) {
								status = 0;
							}
						}
					}

					// Set data for the fake xhr object
					jqXHR.status = status;
					jqXHR.statusText = (nativeStatusText || statusText) + "";

					// Success/Error
					if (isSuccess) {
						deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
					} else {
						deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
					}

					// Status-dependent callbacks
					jqXHR.statusCode(_statusCode);
					_statusCode = undefined;

					if (fireGlobals) {
						globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
					}

					// Complete
					completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

					if (fireGlobals) {
						globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

						// Handle the global AJAX counter
						if (! --jQuery.active) {
							jQuery.event.trigger("ajaxStop");
						}
					}
				}

				return jqXHR;
			},

			getJSON: function getJSON(url, data, callback) {
				return jQuery.get(url, data, callback, "json");
			},

			getScript: function getScript(url, callback) {
				return jQuery.get(url, undefined, callback, "script");
			}
		});

		jQuery.each(["get", "post"], function (i, method) {
			jQuery[method] = function (url, data, callback, type) {

				// Shift arguments if data argument was omitted
				if (jQuery.isFunction(data)) {
					type = type || callback;
					callback = data;
					data = undefined;
				}

				// The url can be an options object (which then must have .url)
				return jQuery.ajax(jQuery.extend({
					url: url,
					type: method,
					dataType: type,
					data: data,
					success: callback
				}, jQuery.isPlainObject(url) && url));
			};
		});

		jQuery._evalUrl = function (url) {
			return jQuery.ajax({
				url: url,

				// Make this explicit, since user can override this through ajaxSetup (#11264)
				type: "GET",
				dataType: "script",
				cache: true,
				async: false,
				global: false,
				"throws": true
			});
		};

		jQuery.fn.extend({
			wrapAll: function wrapAll(html) {
				var wrap;

				if (this[0]) {
					if (jQuery.isFunction(html)) {
						html = html.call(this[0]);
					}

					// The elements to wrap the target around
					wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

					if (this[0].parentNode) {
						wrap.insertBefore(this[0]);
					}

					wrap.map(function () {
						var elem = this;

						while (elem.firstElementChild) {
							elem = elem.firstElementChild;
						}

						return elem;
					}).append(this);
				}

				return this;
			},

			wrapInner: function wrapInner(html) {
				if (jQuery.isFunction(html)) {
					return this.each(function (i) {
						jQuery(this).wrapInner(html.call(this, i));
					});
				}

				return this.each(function () {
					var self = jQuery(this),
					    contents = self.contents();

					if (contents.length) {
						contents.wrapAll(html);
					} else {
						self.append(html);
					}
				});
			},

			wrap: function wrap(html) {
				var isFunction = jQuery.isFunction(html);

				return this.each(function (i) {
					jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
				});
			},

			unwrap: function unwrap(selector) {
				this.parent(selector).not("body").each(function () {
					jQuery(this).replaceWith(this.childNodes);
				});
				return this;
			}
		});

		jQuery.expr.pseudos.hidden = function (elem) {
			return !jQuery.expr.pseudos.visible(elem);
		};
		jQuery.expr.pseudos.visible = function (elem) {
			return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
		};

		jQuery.ajaxSettings.xhr = function () {
			try {
				return new window.XMLHttpRequest();
			} catch (e) {}
		};

		var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		    xhrSupported = jQuery.ajaxSettings.xhr();

		support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
		support.ajax = xhrSupported = !!xhrSupported;

		jQuery.ajaxTransport(function (options) {
			var _callback, errorCallback;

			// Cross domain only allowed if supported through XMLHttpRequest
			if (support.cors || xhrSupported && !options.crossDomain) {
				return {
					send: function send(headers, complete) {
						var i,
						    xhr = options.xhr();

						xhr.open(options.type, options.url, options.async, options.username, options.password);

						// Apply custom fields if provided
						if (options.xhrFields) {
							for (i in options.xhrFields) {
								xhr[i] = options.xhrFields[i];
							}
						}

						// Override mime type if needed
						if (options.mimeType && xhr.overrideMimeType) {
							xhr.overrideMimeType(options.mimeType);
						}

						// X-Requested-With header
						// For cross-domain requests, seeing as conditions for a preflight are
						// akin to a jigsaw puzzle, we simply never set it to be sure.
						// (it can always be set on a per-request basis or even using ajaxSetup)
						// For same-domain requests, won't change header if already provided.
						if (!options.crossDomain && !headers["X-Requested-With"]) {
							headers["X-Requested-With"] = "XMLHttpRequest";
						}

						// Set headers
						for (i in headers) {
							xhr.setRequestHeader(i, headers[i]);
						}

						// Callback
						_callback = function callback(type) {
							return function () {
								if (_callback) {
									_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

									if (type === "abort") {
										xhr.abort();
									} else if (type === "error") {

										// Support: IE <=9 only
										// On a manual native abort, IE9 throws
										// errors on any property access that is not readyState
										if (typeof xhr.status !== "number") {
											complete(0, "error");
										} else {
											complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status, xhr.statusText);
										}
									} else {
										complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
									}
								}
							};
						};

						// Listen to events
						xhr.onload = _callback();
						errorCallback = xhr.onerror = _callback("error");

						// Support: IE 9 only
						// Use onreadystatechange to replace onabort
						// to handle uncaught aborts
						if (xhr.onabort !== undefined) {
							xhr.onabort = errorCallback;
						} else {
							xhr.onreadystatechange = function () {

								// Check readyState before timeout as it changes
								if (xhr.readyState === 4) {

									// Allow onerror to be called first,
									// but that will not handle a native abort
									// Also, save errorCallback to a variable
									// as xhr.onerror cannot be accessed
									window.setTimeout(function () {
										if (_callback) {
											errorCallback();
										}
									});
								}
							};
						}

						// Create the abort callback
						_callback = _callback("abort");

						try {

							// Do send the request (this may raise an exception)
							xhr.send(options.hasContent && options.data || null);
						} catch (e) {

							// #14683: Only rethrow if this hasn't been notified as an error yet
							if (_callback) {
								throw e;
							}
						}
					},

					abort: function abort() {
						if (_callback) {
							_callback();
						}
					}
				};
			}
		});

		// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
		jQuery.ajaxPrefilter(function (s) {
			if (s.crossDomain) {
				s.contents.script = false;
			}
		});

		// Install script dataType
		jQuery.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /\b(?:java|ecma)script\b/
			},
			converters: {
				"text script": function textScript(text) {
					jQuery.globalEval(text);
					return text;
				}
			}
		});

		// Handle cache's special case and crossDomain
		jQuery.ajaxPrefilter("script", function (s) {
			if (s.cache === undefined) {
				s.cache = false;
			}
			if (s.crossDomain) {
				s.type = "GET";
			}
		});

		// Bind script tag hack transport
		jQuery.ajaxTransport("script", function (s) {

			// This transport only deals with cross domain requests
			if (s.crossDomain) {
				var script, _callback2;
				return {
					send: function send(_, complete) {
						script = jQuery("<script>").prop({
							charset: s.scriptCharset,
							src: s.url
						}).on("load error", _callback2 = function callback(evt) {
							script.remove();
							_callback2 = null;
							if (evt) {
								complete(evt.type === "error" ? 404 : 200, evt.type);
							}
						});

						// Use native DOM manipulation to avoid our domManip AJAX trickery
						document.head.appendChild(script[0]);
					},
					abort: function abort() {
						if (_callback2) {
							_callback2();
						}
					}
				};
			}
		});

		var oldCallbacks = [],
		    rjsonp = /(=)\?(?=&|$)|\?\?/;

		// Default jsonp settings
		jQuery.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function jsonpCallback() {
				var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
				this[callback] = true;
				return callback;
			}
		});

		// Detect, normalize options and install callbacks for jsonp requests
		jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

			var callbackName,
			    overwritten,
			    responseContainer,
			    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

			// Handle iff the expected data type is "jsonp" or we have a parameter to set
			if (jsonProp || s.dataTypes[0] === "jsonp") {

				// Get callback name, remembering preexisting value associated with it
				callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

				// Insert callback into url or form data
				if (jsonProp) {
					s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
				} else if (s.jsonp !== false) {
					s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
				}

				// Use data converter to retrieve json after script execution
				s.converters["script json"] = function () {
					if (!responseContainer) {
						jQuery.error(callbackName + " was not called");
					}
					return responseContainer[0];
				};

				// Force json dataType
				s.dataTypes[0] = "json";

				// Install callback
				overwritten = window[callbackName];
				window[callbackName] = function () {
					responseContainer = arguments;
				};

				// Clean-up function (fires after converters)
				jqXHR.always(function () {

					// If previous value didn't exist - remove it
					if (overwritten === undefined) {
						jQuery(window).removeProp(callbackName);

						// Otherwise restore preexisting value
					} else {
						window[callbackName] = overwritten;
					}

					// Save back as free
					if (s[callbackName]) {

						// Make sure that re-using the options doesn't screw things around
						s.jsonpCallback = originalSettings.jsonpCallback;

						// Save the callback name for future use
						oldCallbacks.push(callbackName);
					}

					// Call if it was a function and we have a response
					if (responseContainer && jQuery.isFunction(overwritten)) {
						overwritten(responseContainer[0]);
					}

					responseContainer = overwritten = undefined;
				});

				// Delegate to script
				return "script";
			}
		});

		// Support: Safari 8 only
		// In Safari 8 documents created via document.implementation.createHTMLDocument
		// collapse sibling forms: the second one becomes a child of the first one.
		// Because of that, this security measure has to be disabled in Safari 8.
		// https://bugs.webkit.org/show_bug.cgi?id=137337
		support.createHTMLDocument = function () {
			var body = document.implementation.createHTMLDocument("").body;
			body.innerHTML = "<form></form><form></form>";
			return body.childNodes.length === 2;
		}();

		// Argument "data" should be string of html
		// context (optional): If specified, the fragment will be created in this context,
		// defaults to document
		// keepScripts (optional): If true, will include scripts passed in the html string
		jQuery.parseHTML = function (data, context, keepScripts) {
			if (typeof data !== "string") {
				return [];
			}
			if (typeof context === "boolean") {
				keepScripts = context;
				context = false;
			}

			var base, parsed, scripts;

			if (!context) {

				// Stop scripts or inline event handlers from being executed immediately
				// by using document.implementation
				if (support.createHTMLDocument) {
					context = document.implementation.createHTMLDocument("");

					// Set the base href for the created document
					// so any parsed elements with URLs
					// are based on the document's URL (gh-2965)
					base = context.createElement("base");
					base.href = document.location.href;
					context.head.appendChild(base);
				} else {
					context = document;
				}
			}

			parsed = rsingleTag.exec(data);
			scripts = !keepScripts && [];

			// Single tag
			if (parsed) {
				return [context.createElement(parsed[1])];
			}

			parsed = buildFragment([data], context, scripts);

			if (scripts && scripts.length) {
				jQuery(scripts).remove();
			}

			return jQuery.merge([], parsed.childNodes);
		};

		/**
	  * Load a url into a page
	  */
		jQuery.fn.load = function (url, params, callback) {
			var selector,
			    type,
			    response,
			    self = this,
			    off = url.indexOf(" ");

			if (off > -1) {
				selector = stripAndCollapse(url.slice(off));
				url = url.slice(0, off);
			}

			// If it's a function
			if (jQuery.isFunction(params)) {

				// We assume that it's the callback
				callback = params;
				params = undefined;

				// Otherwise, build a param string
			} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
				type = "POST";
			}

			// If we have elements to modify, make the request
			if (self.length > 0) {
				jQuery.ajax({
					url: url,

					// If "type" variable is undefined, then "GET" method will be used.
					// Make value of this field explicit since
					// user can override it through ajaxSetup method
					type: type || "GET",
					dataType: "html",
					data: params
				}).done(function (responseText) {

					// Save response for use in complete callback
					response = arguments;

					self.html(selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

					// Otherwise use the full result
					responseText);

					// If the request succeeds, this function gets "data", "status", "jqXHR"
					// but they are ignored because response was set above.
					// If it fails, this function gets "jqXHR", "status", "error"
				}).always(callback && function (jqXHR, status) {
					self.each(function () {
						callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
					});
				});
			}

			return this;
		};

		// Attach a bunch of functions for handling common AJAX events
		jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
			jQuery.fn[type] = function (fn) {
				return this.on(type, fn);
			};
		});

		jQuery.expr.pseudos.animated = function (elem) {
			return jQuery.grep(jQuery.timers, function (fn) {
				return elem === fn.elem;
			}).length;
		};

		jQuery.offset = {
			setOffset: function setOffset(elem, options, i) {
				var curPosition,
				    curLeft,
				    curCSSTop,
				    curTop,
				    curOffset,
				    curCSSLeft,
				    calculatePosition,
				    position = jQuery.css(elem, "position"),
				    curElem = jQuery(elem),
				    props = {};

				// Set position first, in-case top/left are set even on static elem
				if (position === "static") {
					elem.style.position = "relative";
				}

				curOffset = curElem.offset();
				curCSSTop = jQuery.css(elem, "top");
				curCSSLeft = jQuery.css(elem, "left");
				calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

				// Need to be able to calculate position if either
				// top or left is auto and position is either absolute or fixed
				if (calculatePosition) {
					curPosition = curElem.position();
					curTop = curPosition.top;
					curLeft = curPosition.left;
				} else {
					curTop = parseFloat(curCSSTop) || 0;
					curLeft = parseFloat(curCSSLeft) || 0;
				}

				if (jQuery.isFunction(options)) {

					// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
					options = options.call(elem, i, jQuery.extend({}, curOffset));
				}

				if (options.top != null) {
					props.top = options.top - curOffset.top + curTop;
				}
				if (options.left != null) {
					props.left = options.left - curOffset.left + curLeft;
				}

				if ("using" in options) {
					options.using.call(elem, props);
				} else {
					curElem.css(props);
				}
			}
		};

		jQuery.fn.extend({
			offset: function offset(options) {

				// Preserve chaining for setter
				if (arguments.length) {
					return options === undefined ? this : this.each(function (i) {
						jQuery.offset.setOffset(this, options, i);
					});
				}

				var doc,
				    docElem,
				    rect,
				    win,
				    elem = this[0];

				if (!elem) {
					return;
				}

				// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
				// Support: IE <=11 only
				// Running getBoundingClientRect on a
				// disconnected node in IE throws an error
				if (!elem.getClientRects().length) {
					return { top: 0, left: 0 };
				}

				rect = elem.getBoundingClientRect();

				doc = elem.ownerDocument;
				docElem = doc.documentElement;
				win = doc.defaultView;

				return {
					top: rect.top + win.pageYOffset - docElem.clientTop,
					left: rect.left + win.pageXOffset - docElem.clientLeft
				};
			},

			position: function position() {
				if (!this[0]) {
					return;
				}

				var offsetParent,
				    offset,
				    elem = this[0],
				    parentOffset = { top: 0, left: 0 };

				// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
				// because it is its only offset parent
				if (jQuery.css(elem, "position") === "fixed") {

					// Assume getBoundingClientRect is there when computed position is fixed
					offset = elem.getBoundingClientRect();
				} else {

					// Get *real* offsetParent
					offsetParent = this.offsetParent();

					// Get correct offsets
					offset = this.offset();
					if (!nodeName(offsetParent[0], "html")) {
						parentOffset = offsetParent.offset();
					}

					// Add offsetParent borders
					parentOffset = {
						top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
						left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
					};
				}

				// Subtract parent offsets and element margins
				return {
					top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
					left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
				};
			},

			// This method will return documentElement in the following cases:
			// 1) For the element inside the iframe without offsetParent, this method will return
			//    documentElement of the parent window
			// 2) For the hidden or detached element
			// 3) For body or html element, i.e. in case of the html node - it will return itself
			//
			// but those exceptions were never presented as a real life use-cases
			// and might be considered as more preferable results.
			//
			// This logic, however, is not guaranteed and can change at any point in the future
			offsetParent: function offsetParent() {
				return this.map(function () {
					var offsetParent = this.offsetParent;

					while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
						offsetParent = offsetParent.offsetParent;
					}

					return offsetParent || documentElement;
				});
			}
		});

		// Create scrollLeft and scrollTop methods
		jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
			var top = "pageYOffset" === prop;

			jQuery.fn[method] = function (val) {
				return access(this, function (elem, method, val) {

					// Coalesce documents and windows
					var win;
					if (jQuery.isWindow(elem)) {
						win = elem;
					} else if (elem.nodeType === 9) {
						win = elem.defaultView;
					}

					if (val === undefined) {
						return win ? win[prop] : elem[method];
					}

					if (win) {
						win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
					} else {
						elem[method] = val;
					}
				}, method, val, arguments.length);
			};
		});

		// Support: Safari <=7 - 9.1, Chrome <=37 - 49
		// Add the top/left cssHooks using jQuery.fn.position
		// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
		// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
		// getComputedStyle returns percent when specified for top/left/bottom/right;
		// rather than make the css module depend on the offset module, just check for it here
		jQuery.each(["top", "left"], function (i, prop) {
			jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
				if (computed) {
					computed = curCSS(elem, prop);

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
				}
			});
		});

		// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
		jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
			jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

				// Margin is only for outerHeight, outerWidth
				jQuery.fn[funcName] = function (margin, value) {
					var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
					    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

					return access(this, function (elem, type, value) {
						var doc;

						if (jQuery.isWindow(elem)) {

							// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
							return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
						}

						// Get document width or height
						if (elem.nodeType === 9) {
							doc = elem.documentElement;

							// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
							// whichever is greatest
							return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
						}

						return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css(elem, type, extra) :

						// Set width or height on the element
						jQuery.style(elem, type, value, extra);
					}, type, chainable ? margin : undefined, chainable);
				};
			});
		});

		jQuery.fn.extend({

			bind: function bind(types, data, fn) {
				return this.on(types, null, data, fn);
			},
			unbind: function unbind(types, fn) {
				return this.off(types, null, fn);
			},

			delegate: function delegate(selector, types, data, fn) {
				return this.on(types, selector, data, fn);
			},
			undelegate: function undelegate(selector, types, fn) {

				// ( namespace ) or ( selector, types [, fn] )
				return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
			}
		});

		jQuery.holdReady = function (hold) {
			if (hold) {
				jQuery.readyWait++;
			} else {
				jQuery.ready(true);
			}
		};
		jQuery.isArray = Array.isArray;
		jQuery.parseJSON = JSON.parse;
		jQuery.nodeName = nodeName;

		// Register as a named AMD module, since jQuery can be concatenated with other
		// files that may use define, but not via a proper concatenation script that
		// understands anonymous AMD modules. A named AMD is safest and most robust
		// way to register. Lowercase jquery is used because AMD module names are
		// derived from file names, and jQuery is normally delivered in a lowercase
		// file name. Do this after creating the global so that if an AMD module wants
		// to call noConflict to hide this version of jQuery, it will work.

		// Note that for maximum portability, libraries that are not jQuery should
		// declare themselves as anonymous modules, and avoid setting a global if an
		// AMD loader is present. jQuery is a special case. For more information, see
		// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return jQuery;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}

		var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,


		// Map over the $ in case of overwrite
		_$ = window.$;

		jQuery.noConflict = function (deep) {
			if (window.$ === jQuery) {
				window.$ = _$;
			}

			if (deep && window.jQuery === jQuery) {
				window.jQuery = _jQuery;
			}

			return jQuery;
		};

		// Expose jQuery and $ identifiers, even in AMD
		// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
		// and CommonJS for browser emulators (#13566)
		if (!noGlobal) {
			window.jQuery = window.$ = jQuery;
		}

		return jQuery;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	/*!
	 * jQuery.localScroll
	 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
	 * Licensed under MIT
	 * http://flesler.blogspot.com/2007/10/jquerylocalscroll-10.html
	 * @author Ariel Flesler
	 * @version 1.4.0
	 */
	;(function (plugin) {
		// AMD Support
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (plugin), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			plugin(jQuery);
		}
	})(function ($) {
		var URI = location.href.replace(/#.*/, ''); // local url without hash

		var $localScroll = $.localScroll = function (settings) {
			$('body').localScroll(settings);
		};

		// Many of these defaults, belong to jQuery.ScrollTo, check it's demo for an example of each option.
		// @see http://demos.flesler.com/jquery/scrollTo/
		// The defaults are public and can be overriden.
		$localScroll.defaults = {
			duration: 1000, // How long to animate.
			axis: 'y', // Which of top and left should be modified.
			event: 'click', // On which event to react.
			stop: true, // Avoid queuing animations 
			target: window // What to scroll (selector or element). The whole window by default.
			/*
	  lock: false, // ignore events if already animating
	  lazy: false, // if true, links can be added later, and will still work.
	  filter: null, // filter some anchors out of the matched elements.
	  hash: false // if true, the hash of the selected link, will appear on the address bar.
	  */
		};

		$.fn.localScroll = function (settings) {
			settings = $.extend({}, $localScroll.defaults, settings);

			if (settings.hash && location.hash) {
				if (settings.target) window.scrollTo(0, 0);
				scroll(0, location, settings);
			}

			return settings.lazy ?
			// use event delegation, more links can be added later.		
			this.on(settings.event, 'a,area', function (e) {
				if (filter.call(this)) {
					scroll(e, this, settings);
				}
			}) :
			// bind concretely, to each matching link
			this.find('a,area').filter(filter).bind(settings.event, function (e) {
				scroll(e, this, settings);
			}).end().end();

			function filter() {
				// is this a link that points to an anchor and passes a possible filter ? href is checked to avoid a bug in FF.
				return !!this.href && !!this.hash && this.href.replace(this.hash, '') === URI && (!settings.filter || $(this).is(settings.filter));
			}
		};

		// Not needed anymore, kept for backwards compatibility
		$localScroll.hash = function () {};

		function scroll(e, link, settings) {
			var id = link.hash.slice(1),
			    elem = document.getElementById(id) || document.getElementsByName(id)[0];

			if (!elem) return;

			if (e) e.preventDefault();

			var $target = $(settings.target);

			if (settings.lock && $target.is(':animated') || settings.onBefore && settings.onBefore(e, elem, $target) === false) return;

			if (settings.stop) {
				$target.stop(true); // remove all its animations
			}

			if (settings.hash) {
				var attr = elem.id === id ? 'id' : 'name',
				    $a = $('<a> </a>').attr(attr, id).css({
					position: 'absolute',
					top: $(window).scrollTop(),
					left: $(window).scrollLeft()
				});

				elem[attr] = '';
				$('body').prepend($a);
				location.hash = link.hash;
				$a.remove();
				elem[attr] = id;
			}

			$target.scrollTo(elem, settings) // do scroll
			.trigger('notify.serialScroll', [elem]); // notify serialScroll about this change
		}

		// AMD requirement
		return $localScroll;
	});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * jQuery.scrollTo
	 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
	 * Licensed under MIT
	 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
	 * @projectDescription Lightweight, cross-browser and highly customizable animated scrolling with jQuery
	 * @author Ariel Flesler
	 * @version 2.1.2
	 */
	;(function (factory) {
		'use strict';

		if (true) {
			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			// CommonJS
			module.exports = factory(require('jquery'));
		} else {
			// Global
			factory(jQuery);
		}
	})(function ($) {
		'use strict';

		var $scrollTo = $.scrollTo = function (target, duration, settings) {
			return $(window).scrollTo(target, duration, settings);
		};

		$scrollTo.defaults = {
			axis: 'xy',
			duration: 0,
			limit: true
		};

		function isWin(elem) {
			return !elem.nodeName || $.inArray(elem.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) !== -1;
		}

		$.fn.scrollTo = function (target, duration, settings) {
			if ((typeof duration === 'undefined' ? 'undefined' : _typeof(duration)) === 'object') {
				settings = duration;
				duration = 0;
			}
			if (typeof settings === 'function') {
				settings = { onAfter: settings };
			}
			if (target === 'max') {
				target = 9e9;
			}

			settings = $.extend({}, $scrollTo.defaults, settings);
			// Speed is still recognized for backwards compatibility
			duration = duration || settings.duration;
			// Make sure the settings are given right
			var queue = settings.queue && settings.axis.length > 1;
			if (queue) {
				// Let's keep the overall duration
				duration /= 2;
			}
			settings.offset = both(settings.offset);
			settings.over = both(settings.over);

			return this.each(function () {
				// Null target yields nothing, just like jQuery does
				if (target === null) return;

				var win = isWin(this),
				    elem = win ? this.contentWindow || window : this,
				    $elem = $(elem),
				    targ = target,
				    attr = {},
				    toff;

				switch (typeof targ === 'undefined' ? 'undefined' : _typeof(targ)) {
					// A number will pass the regex
					case 'number':
					case 'string':
						if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
							targ = both(targ);
							// We are done
							break;
						}
						// Relative/Absolute selector
						targ = win ? $(targ) : $(targ, elem);
					/* falls through */
					case 'object':
						if (targ.length === 0) return;
						// DOMElement / jQuery
						if (targ.is || targ.style) {
							// Get the real position of the target
							toff = (targ = $(targ)).offset();
						}
				}

				var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

				$.each(settings.axis.split(''), function (i, axis) {
					var Pos = axis === 'x' ? 'Left' : 'Top',
					    pos = Pos.toLowerCase(),
					    key = 'scroll' + Pos,
					    prev = $elem[key](),
					    max = $scrollTo.max(elem, axis);

					if (toff) {
						// jQuery / DOMElement
						attr[key] = toff[pos] + (win ? 0 : prev - $elem.offset()[pos]);

						// If it's a dom element, reduce the margin
						if (settings.margin) {
							attr[key] -= parseInt(targ.css('margin' + Pos), 10) || 0;
							attr[key] -= parseInt(targ.css('border' + Pos + 'Width'), 10) || 0;
						}

						attr[key] += offset[pos] || 0;

						if (settings.over[pos]) {
							// Scroll to a fraction of its width/height
							attr[key] += targ[axis === 'x' ? 'width' : 'height']() * settings.over[pos];
						}
					} else {
						var val = targ[pos];
						// Handle percentage values
						attr[key] = val.slice && val.slice(-1) === '%' ? parseFloat(val) / 100 * max : val;
					}

					// Number or 'number'
					if (settings.limit && /^\d+$/.test(attr[key])) {
						// Check the limits
						attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
					}

					// Don't waste time animating, if there's no need.
					if (!i && settings.axis.length > 1) {
						if (prev === attr[key]) {
							// No animation needed
							attr = {};
						} else if (queue) {
							// Intermediate animation
							animate(settings.onAfterFirst);
							// Don't animate this axis again in the next iteration.
							attr = {};
						}
					}
				});

				animate(settings.onAfter);

				function animate(callback) {
					var opts = $.extend({}, settings, {
						// The queue setting conflicts with animate()
						// Force it to always be true
						queue: true,
						duration: duration,
						complete: callback && function () {
							callback.call(elem, targ, settings);
						}
					});
					$elem.animate(attr, opts);
				}
			});
		};

		// Max scrolling position, works on quirks mode
		// It only fails (not too badly) on IE, quirks mode.
		$scrollTo.max = function (elem, axis) {
			var Dim = axis === 'x' ? 'Width' : 'Height',
			    scroll = 'scroll' + Dim;

			if (!isWin(elem)) return elem[scroll] - $(elem)[Dim.toLowerCase()]();

			var size = 'client' + Dim,
			    doc = elem.ownerDocument || elem.document,
			    html = doc.documentElement,
			    body = doc.body;

			return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);
		};

		function both(val) {
			return $.isFunction(val) || $.isPlainObject(val) ? val : { top: val, left: val };
		}

		// Add special hooks so that window scroll properties can be animated
		$.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = {
			get: function get(t) {
				return $(t.elem)[t.prop]();
			},
			set: function set(t) {
				var curr = this.get(t);
				// If interrupt is true and user scrolled, stop animating
				if (t.options.interrupt && t._last && t._last !== curr) {
					return $(t.elem).stop();
				}
				var next = Math.round(t.now);
				// Don't waste CPU
				// Browsers don't render floating point scroll
				if (curr !== next) {
					$(t.elem)[t.prop](next);
					t._last = this.get(t);
				}
			}
		};

		// AMD requirement
		return $scrollTo;
	});

/***/ })
/******/ ]);