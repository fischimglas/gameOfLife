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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var M = require('./matrix');

var clickHandler = null;

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
            if (_.isFunction(this.readDataFnc)) {
                _.each(this.readDataFnc(), function (p) {
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

module.exports = canvas;

});

require.register("gameOfLife/gameoflife.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var MATRIX = require('./matrix');
var CANVAS = require('./canvas');

/**
 * Game Of Life, by John Conway
 */

var gameOfLifeCore = function () {
    /**
     *
     * @param cf {width,height,cellsize,speed}
     */
    function gameOfLifeCore(cf) {
        _classCallCheck(this, gameOfLifeCore);

        this.isRunning = false;
        this.tickIndex = 0;
        this.tickTime = 10;
        this.tickTimeout = null;
        this.liveActivity = null;
        this.subscribers = [];

        // Initiate Matrix
        var dim = gameOfLife.amountOfCells(cf);
        this.matrix = MATRIX.init(dim.w, dim.h, function (cell) {
            cell.a = false;
            return cell;
        });

        this.setSpeed(cf.speed);
    }

    _createClass(gameOfLifeCore, [{
        key: 'start',
        value: function start() {
            console.log('Start');
            if (!this.tickTimeout) {
                // console.warn('Start Game of Life');
                this.isRunning = true;
                this.tick();
                this.eventCalls('start');
            }
        }
    }, {
        key: 'activity',
        value: function activity() {
            return this.liveActivity;
        }
    }, {
        key: 'awakeRandomCells',
        value: function awakeRandomCells() {
            var update = [];
            this.matrix.get().forEach(function (cell) {
                cell.a = Boolean(_.random(0, 1));
                update.push(cell);
            });
            this.matrix.update(update);
        }

        /**
         * Call Subscriber handler for an event
         *
         * @param event
         * @param payLoad
         * @return {any[]}
         */

    }, {
        key: 'eventCalls',
        value: function eventCalls(event, payLoad) {
            return this.subscribers.filter(function (s) {
                return s.event === event;
            }).map(function (s) {
                return s.handler(payLoad);
            });
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(event, handler) {
            console.log('addEventListener', event);
            return this.subscribers.push({ event: event, handler: handler });
        }

        /**
         * Add on tick handler
         * @param handler
         */

    }, {
        key: 'onTick',
        value: function onTick(handler) {
            this.addEventListener('tick', handler);
        }
    }, {
        key: 'stop',
        value: function stop() {
            console.log('Stop');
            this.isRunning = false;
            clearTimeout(this.tickTimeout);
            this.tickTimeout = null;
            // console.warn('Stop Game of Life');
            this.eventCalls('stop');
        }
    }, {
        key: 'setSpeed',
        value: function setSpeed(speed) {
            console.log('setSpeed', speed);
            this.tickTime = 1200 / 10 * speed;

            this.eventCalls('setSpeed', speed);
        }
    }, {
        key: 'addForm',
        value: function addForm(positions) {
            var _this = this;

            console.log('addForm', positions);
            _.each(positions, function (pos) {
                var cell = _this.matrix.cellByPos(pos);
                if (cell) {
                    _this.matrix.cellByPos(pos).a = true;
                } else {
                    console.log('cell not found');
                }
            });
            this.eventCalls('addForm', positions);
        }
    }, {
        key: 'tick',
        value: function tick() {
            var _this2 = this;

            this.tickIndex += 1;
            var update = gameOfLife.calculateCells(this.matrix);
            this.liveActivity = _.size(_.values(update));

            // console.warn('Tick Game of Life', this.activity());
            this.matrix.update(update);

            this.eventCalls('tick', this.tickIndex);

            this.tickTimeout = setTimeout(function () {
                if (_this2.isRunning) {
                    _this2.tick();
                }
            }, this.tickTime);
        }
    }, {
        key: 'setReadDataHandler',
        value: function setReadDataHandler(readDataFnc) {
            this.readDataFnc = readDataFnc;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.stop();
            this.matrix.get().map(function (it) {
                return it.a = false;
            });
            this.start();
        }
    }, {
        key: 'cells',
        value: function cells() {
            return this.matrix.get();
        }
    }]);

    return gameOfLifeCore;
}();

var gameOfLife = {
    init: function init(cf) {
        cf = _.defaults(cf || {}, {
            autostart: false,
            visual: false,

            // If with visual
            elementId: null,
            width: 10,
            height: 10,
            speed: 1,
            cellsize: 1
        });

        var Game = new gameOfLifeCore(cf);

        // Visual
        if (cf.visual === true) {
            var can = CANVAS.init(cf);
            can.setReadDataHandler(function () {
                return Game.matrix.get();
            });
        }

        if (cf.autostart) {
            Game.start();
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
        _.each(cells, function (cell) {
            if (cell && MATRIX.key(cell)) {
                var nCells = matrix.getSurroundingCells(cell);

                // How Many Cells are alive ?
                var cellsAlive = _.sum(_.map(nCells, function (it) {
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
                    update[MATRIX.key(cell)] = newState;
                }
            }
        });
        return update;
    }
};
module.exports = gameOfLife;

});

require.register("gameOfLife/matrix.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var Matrix = function () {
    function Matrix(data) {
        var _this = this;

        _classCallCheck(this, Matrix);

        this.matrixData = {};
        _.each(data, function (it) {
            return _this.matrixData[M.key(it)] = it;
        });
    }

    _createClass(Matrix, [{
        key: 'get',
        value: function get() {
            return _.values(this.matrixData);
        }
    }, {
        key: 'cellByPos',
        value: function cellByPos(_ref) {
            var x = _ref.x,
                y = _ref.y;

            if (x >= 0 && y >= 0) {
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

            if (!_.isArray(_update) || _.size(_.values(_update)) <= 0) {
                return false;
            }
            var keys = _.keys(_update);
            var values = _.values(_update);
            _.each(keys, function (key, ix) {
                if (_.isObject(_this2.matrixData[key])) {
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
            _.each(update, function (up, idx) {
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

            if (x <= 0 || y <= 0) {
                return false;
            }
            var cells = [];

            for (var x2 = -1; x2 <= 1; x2 += 1) {
                for (var y2 = -1; y2 <= 1; y2 += 1) {
                    if (!(x2 === 0 && y2 === 0)) {
                        cells.push(this.cellByPos({ x: x + x2, y: y + y2 }));
                    }
                }
            }
            return cells.filter(function (it) {
                return _.isObject(it);
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

        if (x >= 0 && y >= 0) {
            return x + 'X' + y;
        }
    },

    /**
     * Create new Matrix
     *
     * @param cellsHorizontal
     * @param cellsVertical
     * @param cellHandler function
     */
    init: function init(cellsHorizontal, cellsVertical, cellHandler) {
        var cells = this.createCells(cellsHorizontal, cellsVertical, cellHandler);
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
     * @param cellHandler
     * @return {Array}
     */
    createCells: function createCells(w, h, cellHandler) {
        var m = [];
        _.times(w, function (x) {
            _.times(h, function (y) {
                var cell = { x: x, y: y };
                if (cellHandler) {
                    cell = cellHandler(cell);
                }
                m.push(cell);
            });
        });
        return m;
    }
};

module.exports = M;

});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

