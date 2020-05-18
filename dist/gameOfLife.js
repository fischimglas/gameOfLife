(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("gameOfLife/canvas.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _matrix = require('./matrix');

var _matrix2 = _interopRequireDefault(_matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clickHandler = null;

// function getCursorPosition(can, event) {
//     var rect = can.getBoundingClientRect();
//     var x = event.clientX - rect.left;
//     var y = event.clientY - rect.top;
//     return {x: x, y: y};
// }

// function getElementPosition(can, event) {
//     let pos = getCursorPosition(can, event);
//
//     let x = Math.round(pos.x / 10);
//     let y = Math.round(pos.y / 10);
//     return {x: x, y: y};
// }

var Canvas = function () {

    /**
     *
     * @param width
     * @param height
     * @param elementId
     * @param cellsize
     */
    function Canvas(_ref) {
        var _this = this;

        var width = _ref.width,
            height = _ref.height,
            elementId = _ref.elementId,
            cellsize = _ref.cellsize;

        _classCallCheck(this, Canvas);

        this.width = width;
        this.height = height;
        this.cellsize = cellsize;
        this.elementId = elementId;

        window.requestAnimationFrame(function () {
            _this.ctx = document.getElementById(_this.elementId).getContext('2d');
            _this.draw();
        });
    }

    _createClass(Canvas, [{
        key: 'setReadDataHandler',
        value: function setReadDataHandler(readDataFnc) {
            this.readDataFnc = readDataFnc;
        }
    }, {
        key: 'draw',
        value: function draw() {
            var _this2 = this;

            if (!document.getElementById(this.elementId)) {
                return false;
            }
            var ctx = this.ctx;

            // Need to set dimension!!
            // TODO
            ctx.canvas.width = this.width;
            ctx.canvas.height = this.height;
            ctx.globalCompositeOperation = 'destination-over';
            // TODO
            ctx.clearRect(0, 0, this.width, this.height); // clear canvas

            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            // ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
            ctx.save();
            // ctx.translate(this.cellsize / 2, this.cellsize / 2);

            // TODO
            var distance = this.cellsize * 1.5;

            // TODO
            if (_lodash2.default.isFunction(this.readDataFnc)) {
                _lodash2.default.each(this.readDataFnc(), function (p) {
                    ctx.beginPath();
                    // context.arc(x,y,r,sAngle,eAngle,counterclockwise);
                    ctx.arc(p.x * distance, p.y * distance, _this2.cellsize / 2, 0, 2 * Math.PI);
                    ctx.fillStyle = p.a ? 'black' : 'white';
                    if (p.a === 2) {
                        ctx.fillStyle = 'red';
                    }
                    ctx.fill();
                });
            }
            ctx.restore();

            window.requestAnimationFrame(function () {
                _this2.draw();
            });
        }
    }]);

    return Canvas;
}();

/**
 *
 * @type {}
 */


var canvas = {
    getCursorPosition: function getCursorPosition(can, event) {
        var rect = can.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return { x: x, y: y };
    },

    /**
     *
     * @param initCf
     * @return {Canvas}
     */
    init: function init(initCf) {
        return new Canvas(initCf);
    },

    /**
     *
     * @param x
     * @param y
     * @return {{x: number, y: number}}
     */
    calcCellIdByPos: function calcCellIdByPos(_ref2) {
        var x = _ref2.x,
            y = _ref2.y;

        var newX = Math.round(x / 10);
        var newY = Math.round(y / 10);
        return { 'x': newX, 'y': newY };
    }
};

exports.default = canvas;
});

require.register("gameOfLife/gameoflife.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _matrix = require('./matrix');

var _matrix2 = _interopRequireDefault(_matrix);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Game Of Life, by John Conway
 */
var gameOfLifeCore = function () {
    /**
     *
     * @param cf {width,height,cellsize}
     */
    function gameOfLifeCore(cf) {
        _classCallCheck(this, gameOfLifeCore);

        this.isRunning = false;
        this.tickTime = 10;
        this.tickTimeout = null;
        this.liveActivity = null;

        // Initiate Matrix
        var dim = gameOfLife.amountOfCells(cf);
        this.matrix = _matrix2.default.init(dim.w, dim.h);

        console.log(cf);
    }

    _createClass(gameOfLifeCore, [{
        key: 'start',
        value: function start() {
            if (!this.tickTimeout) {
                // console.warn('Start Game of Life');
                this.isRunning = true;
                this.tick();
            }
        }
    }, {
        key: 'activity',
        value: function activity() {
            return this.liveActivity;
        }
    }, {
        key: 'stop',
        value: function stop() {
            clearTimeout(this.tickTimeout);
            this.tickTimeout = null;
            // console.warn('Stop Game of Life');
            this.isRunning = false;
        }
    }, {
        key: 'setSpeed',
        value: function setSpeed(speed) {
            this.tickTime = 1200 / 10 * speed;
        }
    }, {
        key: 'tick',
        value: function tick() {
            var _this = this;

            var update = gameOfLife.calculateCells(this.matrix);
            this.liveActivity = _lodash2.default.size(_lodash2.default.values(update));

            // console.warn('Tick Game of Life', this.activity());
            this.matrix.update(update);
            this.tickTimeout = setTimeout(function () {
                if (_this.isRunning) {
                    _this.tick();
                }
            }, this.tickTime);
        }
    }, {
        key: 'setReadDataHandler',
        value: function setReadDataHandler(readDataFnc) {
            this.readDataFnc = readDataFnc;
        }
    }]);

    return gameOfLifeCore;
}();

var gameOfLife = {
    init: function init(cf) {
        cf = _lodash2.default.defaults(cf || {}, {
            autostart: false,
            visual: false,

            // If with visual
            elementId: null,
            width: 100,
            height: 100,
            cellsize: 10
        });
        console.log('gameOfLife:init', cf);

        var Game = new gameOfLifeCore(cf);

        // Visual
        if (cf.visual === true) {
            var can = _canvas2.default.init(cf);
            can.setReadDataHandler(function () {
                return Game.matrix.get();
            });
        }

        return Game;
    },
    amountOfCells: function amountOfCells(_ref) {
        var width = _ref.width,
            height = _ref.height,
            cellsize = _ref.cellsize;


        // Amount of Cells
        var w = Math.ceil(width / cellsize);
        var h = Math.ceil(height / cellsize);
        return { w: w, h: h };
    },


    /**
     * Game Of Life, by John Conway
     *
     * Update Matrix State according to Game of Life Rules
     *
     * - Any live cell with fewer than two live neighbours dies, as if by underpopulation.
     * - Any live cell with two or three live neighbours lives on to the next generation.
     * - Any live cell with more than three live neighbours dies, as if by overpopulation.
     * - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     *
     * - Any live cell with two or three live neighbours survives.
     * - Any dead cell with three live neighbours becomes a live cell.
     * - All other live cells die in the next generation. Similarly, all other dead cells stay dead.
     */
    calculateCells: function calculateCells(matrix) {

        var cells = matrix.get();
        // console.log('Before Update', cells.filter(it => it.a === true).length);
        var update = [];
        _lodash2.default.each(cells, function (cell) {
            if (cell && _matrix2.default.key(cell)) {
                var nCells = matrix.getSurroundingCells(cell);

                // How Many Cells are alive ?
                var cellsAlive = _lodash2.default.sum(_lodash2.default.map(nCells, function (it) {
                    return it.a === true ? 1 : 0;
                }));
                // console.log(cell.x, cell.y, cellsAlive);
                var newState = cell.a;

                // Currently Alive
                if (cell.a === true) {
                    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                    if (cellsAlive < 2) newState = false;
                    // Any live cell with two or three live neighbours lives on to the next generation.
                    else if (cellsAlive === 2 || cellsAlive === 3) newState = true;
                        // Any live cell with more than three live neighbours dies, as if by overpopulation.
                        else if (cellsAlive > 3) newState = false;
                    // Cell is currently dead
                } else if (cell.a === false) {
                    if (cellsAlive === 3) newState = true;
                }

                if (cell.a !== newState) {
                    update[_matrix2.default.key(cell)] = newState;
                }
            }
        });
        return update;
    }
};

exports.default = gameOfLife;
});

require.register("gameOfLife/matrix.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matrix = function () {
    function Matrix(data) {
        var _this = this;

        _classCallCheck(this, Matrix);

        this.matrixData = {};
        _lodash2.default.each(data, function (it) {
            return _this.matrixData[M.key(it)] = it;
        });
    }

    _createClass(Matrix, [{
        key: 'get',
        value: function get() {
            return _lodash2.default.values(this.matrixData);
        }
    }, {
        key: 'cellByPos',
        value: function cellByPos(_ref) {
            var x = _ref.x,
                y = _ref.y;

            if (x && y) {
                return this.matrixData[M.key({ x: x, y: y })];
            }
        }
    }, {
        key: 'alive',
        value: function alive() {
            return this.get().filter(function (it) {
                return it.a === true;
            }).length;
        }
    }, {
        key: 'dead',
        value: function dead() {
            return this.get().filter(function (it) {
                return it.a === false;
            }).length;
        }
    }, {
        key: 'update',
        value: function update(_update) {
            var _this2 = this;

            if (!_lodash2.default.isArray(_update) || _lodash2.default.size(_lodash2.default.values(_update)) <= 0) {
                return false;
            }
            var keys = _lodash2.default.keys(_update);
            var values = _lodash2.default.values(_update);
            _lodash2.default.each(keys, function (key, ix) {
                if (_lodash2.default.isObject(_this2.matrixData[key])) {
                    _this2.matrixData[key].a = values[ix];
                }
            });
        }
    }, {
        key: 'updateCell',
        value: function updateCell(update) {
            if (!update || update.length <= 0) {
                return false;
            }
            var c = this.cellByPos(update);
            _lodash2.default.each(update, function (up, idx) {
                return c[idx] = up;
            });
        }

        /**
         * Get cells around one
         * @param cell
         * @return {Array}
         */

    }, {
        key: 'getSurroundingCells',
        value: function getSurroundingCells(_ref2) {
            var x = _ref2.x,
                y = _ref2.y;

            if (!x || !y) {
                return false;
            }
            var cells = [];
            cells.push(this.cellByPos({ x: x, y: y - 1 }));
            cells.push(this.cellByPos({ x: x - 1, y: y - 1 }));
            cells.push(this.cellByPos({ x: x - 1, y: y }));
            cells.push(this.cellByPos({ x: x, y: y + 1 }));
            cells.push(this.cellByPos({ x: x + 1, y: y + 1 }));
            cells.push(this.cellByPos({ x: x + 1, y: y }));
            return cells.filter(function (it) {
                return _lodash2.default.isObject(it);
            });
        }
    }]);

    return Matrix;
}();

var M = {
    /**
     * @param x
     * @param y
     * @return {string}
     */
    key: function key(_ref3) {
        var x = _ref3.x,
            y = _ref3.y;

        if (x && y) {
            return x + 'X' + y;
        }
    },

    /**
     * Create new Matrix
     *
     * @param cellsHorizontal
     * @param cellsVertical
     */
    init: function init(cellsHorizontal, cellsVertical) {
        var cells = this.createCells(cellsHorizontal, cellsVertical);
        return new Matrix(cells);
    },


    /**
     * Translate pos from a list of poisitions
     *
     * @param x
     * @param y
     * @param positions
     * @return {*}
     */
    translatePositions: function translatePositions(x, y, positions) {
        return positions.map(function (it) {
            return { x: x + it.x, y: x + it.y };
        });
    },


    /**
     * Create Cells
     *
     * @param w
     * @param h
     * @return {Array}
     */
    createCells: function createCells(w, h) {
        var m = [];
        _lodash2.default.times(w, function (x) {
            _lodash2.default.times(h, function (y) {
                m.push({ x: x, y: y, a: Boolean(_lodash2.default.random(0, 1)) });
            });
        });
        return m;
    }
};

exports.default = M;
});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=gameOfLife.js.map