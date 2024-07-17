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
require.register("Factory.ts", function(exports, require, module) {
"use strict";
var Helper_1 = require("./Helper");
var colors = [
    '#440154',
    '#404688',
    '#39558c',
    '#33638d',
    '#2d718e',
    '#287d8e',
    '#238a8d',
    '#1f968b',
    '#1f968b',
    '#20a386',
    '#29af7f',
    '#3dbc74',
    '#56c667',
    '#75d054',
    '#95d840',
    '#bade28',
    '#dde318',
    '#fde725',
    '#ffc168',
    '#ff8b68',
    '#e45f5e',
    '#dc4c59',
    '#d33b67',
    '#c72e79',
    '#b9207f',
    '#a91484',
    '#960578',
    '#840271',
];
function colorFactory(cycle) {
    if (cycle === void 0) { cycle = 0; }
    var colorIndex = Math.floor(cycle / 30) % colors.length;
    return colors[colorIndex];
}
var defaultGameCf = {
    speed: 50,
    radius: 15,
    gutter: 5,
    container: 'new-game-of-life',
    color: null,
    colorCellDead: '#eeeeee',
    colorFactory: colorFactory
};
exports.Factory = {
    color: function (cycle) {
        if (cycle === void 0) { cycle = 0; }
        return colorFactory(cycle);
    },
    createMatrix: function (cf) {
        var _this = this;
        var elementWidth = cf.radius * 2 + cf.gutter;
        var w = Math.ceil(cf.width / elementWidth);
        var h = Math.ceil(cf.height / elementWidth);
        return Helper_1.Helper.range(0, w).map(function (x) { return Helper_1.Helper.range(0, h).map(function (y) { return (_this.cell(x, y, cf.color)); }); }).flat();
    },
    cell: function (x, y, color, alive) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (color === void 0) { color = null; }
        if (alive === void 0) { alive = false; }
        return { x: x, y: y, alive: alive, color: color ? color : exports.Factory.color(), };
    },
    coordinate: function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return { x: x, y: y };
    },
    gameCf: function (cf) {
        var container = document.getElementById(cf.container);
        if (!cf.width || cf.width === 'auto') {
            cf.width = container.clientWidth;
        }
        if (!cf.height || cf.height === 'auto') {
            cf.height = container.clientHeight;
        }
        // @ts-ignore
        return Object.assign({}, defaultGameCf, cf);
    },
    callback: function (name, callback) {
        return { name: name, callback: callback };
    }
};


});

require.register("GameOfLife.ts", function(exports, require, module) {
"use strict";
var Inerface_1 = require("./Inerface");
var Factory_1 = require("./Factory");
var Helper_1 = require("./Helper");
var Ui_1 = require("./Ui");
var timeout = null;
function tick(game) {
    var color = game.cf.colorFactory(game.cycle);
    var changes = Helper_1.Helper.calcChanges(game.matrix);
    changes.forEach(function (it) {
        var name = Helper_1.Helper.name(it);
        if (game.matrix[name].alive !== true && it.alive === true) {
            game.matrix[name].color = color;
        }
        game.matrix[name].alive = it.alive === true;
    });
    Ui_1.Ui.draw(game.cf, game.matrix);
    Helper_1.Helper.triggerCallbacks(Inerface_1.CallbackEvent.tick, game);
    if (changes.length === 0) {
        Helper_1.Helper.triggerCallbacks(Inerface_1.CallbackEvent.stalled, game);
    }
    if (game.population() === 0) {
        Helper_1.Helper.triggerCallbacks(Inerface_1.CallbackEvent.extinct, game);
    }
    game.cycle += 1;
}
function runLoop(game) {
    tick(game);
    timeout = setTimeout(function () {
        if (game.isRunning !== true) {
            return;
        }
        runLoop(game);
    }, game.cf.speed);
}
var gameOfLife = (function () {
    function gameOfLife(cf) {
        this.cf = null;
        this.matrix = {};
        this.cycle = 0;
        this.isRunning = false;
        this.pop = 0;
        this.callbacks = [];
        this.cf = Factory_1.Factory.gameCf(cf);
        Ui_1.Ui.init(this);
    }
    gameOfLife.prototype.population = function () {
        return Object.values(this.matrix).filter(function (it) { return it.alive === true; }).length;
    };
    gameOfLife.prototype.setCell = function (cell) {
        this.matrix[Helper_1.Helper.name(cell)] = cell;
        return this;
    };
    gameOfLife.prototype.setColorFactory = function (colorFactory) {
        this.cf.colorFactory = colorFactory;
        return this;
    };
    gameOfLife.prototype.apply = function (cells) {
        var _this = this;
        cells.forEach(function (cell) {
            var item = _this.matrix[Helper_1.Helper.name(cell)];
            if (!item) {
                console.warn('item does not exist', cell);
                return;
            }
            item.alive = cell.alive === true;
            if (cell.color) {
                item.color = cell.color;
            }
        });
        return this;
    };
    gameOfLife.prototype.start = function () {
        this.isRunning = true;
        runLoop(this);
        return this;
    };
    gameOfLife.prototype.stop = function () {
        this.isRunning = false;
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        return this;
    };
    gameOfLife.prototype.tick = function () {
        tick(this);
        return this;
    };
    gameOfLife.prototype.reset = function () {
        var _this = this;
        this.cycle = 0;
        Object.values(this.matrix).forEach(function (it) {
            it.alive = false;
            it.color = _this.cf.colorCellDead;
        });
        Ui_1.Ui.draw(this.cf, this.matrix);
        return this;
    };
    gameOfLife.prototype.setSpeed = function (speed) {
        var isRunning = this.isRunning;
        if (isRunning) {
            this.stop();
        }
        var parsedSpeed = Math.max(1, parseInt(speed + ''));
        this.cf.speed = Math.round(10000 / parsedSpeed);
        if (isRunning) {
            this.start();
        }
        return this;
    };
    gameOfLife.prototype.on = function (name, callback) {
        this.callbacks.push(Factory_1.Factory.callback(name, callback));
        return this;
    };
    return gameOfLife;
}());
exports.gameOfLife = gameOfLife;


});

require.register("Helper.ts", function(exports, require, module) {
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Factory_1 = require("./Factory");
function gameOfLifeRules(matrix, cell) {
    var isAlive = (cell.alive === true);
    var isAliveNow = isAlive;
    var neighbors = exports.Helper.getNeighbors(matrix, cell);
    var numAlive = neighbors.filter(function (it) { return it.alive === true; }).length;
    // #1 Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    if (2 > numAlive) {
        isAliveNow = false;
    }
    else if (isAlive === true && (numAlive === 2 || numAlive === 3)) {
        isAliveNow = true;
    }
    else if (3 < numAlive) {
        isAliveNow = false;
    }
    else if (false === isAlive && 3 === numAlive) {
        isAliveNow = true;
    }
    return isAlive !== isAliveNow ? Factory_1.Factory.cell(cell.x, cell.y, cell.color, isAliveNow) : null;
}
exports.Helper = {
    range: function (from, to) {
        return Array.from({ length: (to - from) }, function (x, i) { return i + from; });
    },
    name: function (cell) {
        return cell.x + "X" + cell.y;
    },
    getNeighbors: function (matrix, cell) {
        var _this = this;
        var directions = [-1, 0, 1];
        var neighbors = [];
        directions.forEach(function (dx) {
            directions.forEach(function (dy) {
                if (dx === 0 && dy === 0)
                    return;
                var neighbor = matrix[_this.name(Factory_1.Factory.coordinate(cell.x + dx, cell.y + dy))];
                if (neighbor)
                    neighbors.push(neighbor);
            });
        });
        return neighbors;
    },
    calcChanges: function (matrix) {
        return Object.values(matrix).map(function (cell) { return gameOfLifeRules(matrix, cell); }).filter(function (it) { return it !== null; });
    },
    getCellByCoord: function (game, coordinate) {
        return game.matrix[this.name(coordinate)];
    },
    cellByPos: function (game, clickPos) {
        var _a = game.cf, R = _a.radius, G = _a.gutter;
        var x = Math.round((clickPos.x - R) / (R * 2 + G));
        var y = Math.round((clickPos.y - R) / (R * 2 + G));
        return this.getCellByCoord(game, Factory_1.Factory.coordinate(x, y));
    },
    calcPosByCoord: function (cf, coordinate) {
        var R = cf.radius, G = cf.gutter;
        var x = coordinate.x * R * 2 + coordinate.x * G + R;
        var y = coordinate.y * R * 2 + coordinate.y * G + R;
        return Factory_1.Factory.coordinate(x, y);
    },
    triggerCallbacks: function (eventName, game, data) {
        if (data === void 0) { data = null; }
        game.callbacks.forEach(function (callbackObj) {
            if (eventName === callbackObj.name) {
                callbackObj.callback(game, data);
            }
        });
    },
    getMouseInContainerCoordinates: function (container, e) {
        var rect = container.getBoundingClientRect();
        return Factory_1.Factory.coordinate(e.clientX - rect.left, e.clientY - rect.top);
    },
    getCenter: function (cf) {
        var size = ((cf.radius * 2) + cf.gutter) * 2;
        return {
            x: Math.round(cf.width / size),
            y: Math.round(cf.height / size)
        };
    },
    translateCellPositions: function (cf, items) {
        var center = this.getCenter(cf);
        return items.map(function (it) { return (__assign({}, it, { x: it.x + center.x, y: it.y + center.y })); });
    }
};


});

require.register("Inerface.ts", function(exports, require, module) {
"use strict";
var CallbackEvent;
(function (CallbackEvent) {
    CallbackEvent[CallbackEvent["tick"] = 'tick'] = "tick";
    CallbackEvent[CallbackEvent["extinct"] = 'extinct'] = "extinct";
    CallbackEvent[CallbackEvent["stalled"] = 'stalled'] = "stalled";
    CallbackEvent[CallbackEvent["click"] = 'click'] = "click";
    CallbackEvent[CallbackEvent["hover"] = 'hover'] = "hover";
})(CallbackEvent = exports.CallbackEvent || (exports.CallbackEvent = {}));
var CfElement;
(function (CfElement) {
    CfElement[CfElement["width"] = 'width'] = "width";
    CfElement[CfElement["height"] = 'height'] = "height";
    CfElement[CfElement["color"] = 'color'] = "color";
    CfElement[CfElement["radius"] = 'radius'] = "radius";
    CfElement[CfElement["gutter"] = 'gutter'] = "gutter";
    CfElement[CfElement["speed"] = 'speed'] = "speed";
    CfElement[CfElement["container"] = 'container'] = "container";
    CfElement[CfElement["colorCellDead"] = 'colorCellDead'] = "colorCellDead";
    CfElement[CfElement["colorFactory"] = 'colorFactory'] = "colorFactory";
})(CfElement = exports.CfElement || (exports.CfElement = {}));


});

require.register("Ui.ts", function(exports, require, module) {
"use strict";
var Inerface_1 = require("./Inerface");
var Helper_1 = require("./Helper");
var Factory_1 = require("./Factory");
exports.Ui = {
    init: function (game) {
        var _this = this;
        Factory_1.Factory.createMatrix(game.cf)
            .forEach(function (cell) { return game.setCell(cell); });
        exports.Ui.draw(game.cf, game.matrix);
        Array.from(document.getElementsByClassName('action')).forEach(function (control) {
            control.addEventListener('click', function () { return _this.callAction(game, control.getAttribute('data-action')); });
        });
        Array.from(document.getElementsByClassName('control')).forEach(function (control) {
            control.addEventListener('change', function () { return _this.callAction(game, control.getAttribute('data-action'), control.value); });
        });
        var priv = {
            container: document.getElementById(game.cf.container),
            mouseDown: false,
        };
        priv.container.width = game.cf.width;
        priv.container.height = game.cf.height;
        priv.container.addEventListener('click', function (e) {
            var coordinate = Helper_1.Helper.getMouseInContainerCoordinates(priv.container, e);
            var cell = Helper_1.Helper.cellByPos(game, coordinate);
            if (typeof cell !== 'object') {
                return;
            }
            Helper_1.Helper.triggerCallbacks(Inerface_1.CallbackEvent.click, game, cell);
            _this.draw(game.cf, game.matrix);
        });
        priv.container.addEventListener('mousedown', function (e) {
            priv.mouseDown = true;
        });
        priv.container.addEventListener('mouseup', function (e) {
            priv.mouseDown = false;
        });
        priv.container.addEventListener('mousemove', function (e) {
            if (priv.mouseDown !== true) {
                return;
            }
            var coordinate = Helper_1.Helper.getMouseInContainerCoordinates(priv.container, e);
            var cell = Helper_1.Helper.cellByPos(game, coordinate);
            if (typeof cell !== 'object') {
                return;
            }
            Helper_1.Helper.triggerCallbacks(Inerface_1.CallbackEvent.hover, game, cell);
            _this.draw(game.cf, game.matrix);
        });
    },
    draw: function (cf, matrix) {
        window.requestAnimationFrame(function () {
            var elem = document.getElementById(cf.container);
            if (!elem) {
                return;
            }
            var context = elem.getContext('2d');
            var cells = Object.values(matrix);
            context.clearRect(0, 0, elem.width, elem.height);
            cells.forEach(function (cell) {
                context.fillStyle = cell.alive ? cell.color : cf.colorCellDead;
                context.beginPath();
                var pos = Helper_1.Helper.calcPosByCoord(cf, cell);
                context.arc(pos.x, pos.y, cf.radius, 0, 2 * Math.PI);
                context.fill();
            });
            context.save();
        });
    },
    callAction: function (game, actionName, value) {
        if (actionName in game && typeof game[actionName] === 'function') {
            game[actionName](value);
        }
    }
};


});

require.register("main.ts", function(exports, require, module) {
/**
 * Sample initialization of game-of-life
 */
'use strict';
var Inerface_1 = require("./Inerface");
var GameOfLife_1 = require("./GameOfLife");
var Factory_1 = require("./Factory");
var instance = new GameOfLife_1.gameOfLife({
    container: 'new-game-of-life',
    radius: 4,
    gutter: 2,
    speed: 200
});
instance
    .apply([
    { x: 21, y: 25, alive: true, color: '#A1A1A1' },
    { x: 21, y: 26, alive: true },
    { x: 21, y: 27, alive: true },
    { x: 22, y: 25, alive: true },
    { x: 20, y: 26, alive: true },
])
    .on(Inerface_1.CallbackEvent.tick, function (game) {
    document.getElementById('pop').innerHTML = game.population() + '';
    document.getElementById('cycle').innerHTML = game.cycle + '';
})
    .on(Inerface_1.CallbackEvent.extinct, function (game) {
    document.getElementById('status').innerHTML = 'Your population has died out';
    game.stop();
})
    .on(Inerface_1.CallbackEvent.stalled, function (game) {
    document.getElementById('status').innerHTML = 'Your population is in a deadlock';
    game.stop();
})
    .on(Inerface_1.CallbackEvent.click, function (game, cell) {
    cell.alive = true;
})
    .on(Inerface_1.CallbackEvent.hover, function (game, cell) {
    cell.alive = true;
    cell.color = Factory_1.Factory.color(0);
})
    .setColorFactory(function () {
    return instance.population() > 100 ? 'red' : 'green';
});
setTimeout(function () { return instance.start(); }, 1200);


});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

