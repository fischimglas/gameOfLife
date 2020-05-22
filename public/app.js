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
require.register("App.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("html{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif;font-size:16px;font-weight:400;line-height:1.5;-webkit-text-size-adjust:100%;background:#fff;color:#666}body{margin:0}a:active,a:hover{outline:none}.uk-link,a{color:#1e87f0;text-decoration:none;cursor:pointer}.uk-link-toggle:focus .uk-link,.uk-link-toggle:hover .uk-link,.uk-link:hover,a:hover{color:#0f6ecd;text-decoration:underline}abbr[title]{text-decoration:underline dotted;-webkit-text-decoration-style:dotted}b,strong{font-weight:bolder}:not(pre)>code,:not(pre)>kbd,:not(pre)>samp{font-family:Consolas,monaco,monospace;font-size:.875rem;color:#f0506e;white-space:nowrap}em{color:#f0506e}ins{text-decoration:none}ins,mark{background:#ffd;color:#666}q{font-style:italic}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}audio,canvas,iframe,img,svg,video{vertical-align:middle}canvas,img,video{max-width:100%;height:auto;box-sizing:border-box}@supports (display:block){svg{max-width:100%;height:auto;box-sizing:border-box}}svg:not(:root){overflow:hidden}img:not([src]){min-width:1px;visibility:hidden}iframe{border:0}address,dl,fieldset,figure,ol,p,pre,ul{margin:0 0 20px}*+address,*+dl,*+fieldset,*+figure,*+ol,*+p,*+pre,*+ul{margin-top:20px}.uk-h1,.uk-h2,.uk-h3,.uk-h4,.uk-h5,.uk-h6,.uk-heading-2xlarge,.uk-heading-large,.uk-heading-medium,.uk-heading-small,.uk-heading-xlarge,h1,h2,h3,h4,h5,h6{margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif;font-weight:400;color:#333;text-transform:none}*+.uk-h1,*+.uk-h2,*+.uk-h3,*+.uk-h4,*+.uk-h5,*+.uk-h6,*+.uk-heading-2xlarge,*+.uk-heading-large,*+.uk-heading-medium,*+.uk-heading-small,*+.uk-heading-xlarge,*+h1,*+h2,*+h3,*+h4,*+h5,*+h6{margin-top:40px}.uk-h1,h1{font-size:2.23125rem;line-height:1.2}.uk-h2,h2{font-size:1.7rem;line-height:1.3}.uk-h3,h3{font-size:1.5rem;line-height:1.4}.uk-h4,h4{font-size:1.25rem;line-height:1.4}.uk-h5,h5{font-size:16px;line-height:1.4}.uk-h6,h6{font-size:.875rem;line-height:1.4}@media (min-width:960px){.uk-h1,h1{font-size:2.625rem}.uk-h2,h2{font-size:2rem}}ol,ul{padding-left:30px}ol>li>ol,ol>li>ul,ul>li>ol,ul>li>ul{margin:0}dt{font-weight:700}dd{margin-left:0}.uk-hr,hr{overflow:visible;text-align:inherit;margin:0 0 20px;border:0;border-top:1px solid #e5e5e5}*+.uk-hr,*+hr{margin-top:20px}address{font-style:normal}blockquote{margin:0 0 20px;font-size:1.25rem;line-height:1.5;font-style:italic}*+blockquote{margin-top:20px}blockquote p:last-of-type{margin-bottom:0}blockquote footer{margin-top:10px;font-size:.875rem;line-height:1.5}pre{font:.875rem/1.5 Consolas,monaco,monospace;color:#666;-moz-tab-size:4;tab-size:4;overflow:auto}pre code{font-family:Consolas,monaco,monospace}::selection{background:#39f;color:#fff;text-shadow:none}details,main{display:block}summary{display:list-item}template{display:none}.uk-breakpoint-s:before{content:\"640px\"}.uk-breakpoint-m:before{content:\"960px\"}.uk-breakpoint-l:before{content:\"1200px\"}.uk-breakpoint-xl:before{content:\"1600px\"}:root{--uk-breakpoint-s:640px;--uk-breakpoint-m:960px;--uk-breakpoint-l:1200px;--uk-breakpoint-xl:1600px}.uk-link-muted a,a.uk-link-muted{color:#999}.uk-link-muted a:hover,.uk-link-toggle:focus .uk-link-muted,.uk-link-toggle:hover .uk-link-muted,a.uk-link-muted:hover{color:#666}.uk-link-text a,a.uk-link-text{color:inherit}.uk-link-text a:hover,.uk-link-toggle:focus .uk-link-text,.uk-link-toggle:hover .uk-link-text,a.uk-link-text:hover{color:#999}.uk-link-heading a,a.uk-link-heading{color:inherit}.uk-link-heading a:hover,.uk-link-toggle:focus .uk-link-heading,.uk-link-toggle:hover .uk-link-heading,a.uk-link-heading:hover{color:#1e87f0;text-decoration:none}.uk-link-reset a,.uk-link-toggle,a.uk-link-reset{color:inherit!important;text-decoration:none!important}.uk-link-toggle:focus{outline:none}.uk-heading-small{font-size:2.6rem;line-height:1.2}.uk-heading-medium{font-size:2.8875rem;line-height:1.1}.uk-heading-large{font-size:3.4rem;line-height:1.1}.uk-heading-xlarge{font-size:4rem;line-height:1}.uk-heading-2xlarge{font-size:6rem;line-height:1}@media (min-width:960px){.uk-heading-small{font-size:3.25rem}.uk-heading-medium{font-size:3.5rem}.uk-heading-large{font-size:4rem}.uk-heading-xlarge{font-size:6rem}.uk-heading-2xlarge{font-size:8rem}}@media (min-width:1200px){.uk-heading-medium{font-size:4rem}.uk-heading-large{font-size:6rem}.uk-heading-xlarge{font-size:8rem}.uk-heading-2xlarge{font-size:11rem}}.uk-heading-divider{padding-bottom:calc(5px + .1em);border-bottom:calc(.2px + .05em) solid #e5e5e5}.uk-heading-bullet{position:relative}.uk-heading-bullet:before{content:\"\";display:inline-block;position:relative;top:-0.1em;vertical-align:middle;height:calc(4px + .7em);margin-right:calc(5px + .2em);border-left:calc(5px + .1em) solid #e5e5e5}.uk-heading-line{overflow:hidden}.uk-heading-line>*{display:inline-block;position:relative}.uk-heading-line>:after,.uk-heading-line>:before{content:\"\";position:absolute;top:calc(50% - ((.2px + .05em) / 2));width:2000px;border-bottom:calc(.2px + .05em) solid #e5e5e5}.uk-heading-line>:before{right:100%;margin-right:calc(5px + .3em)}.uk-heading-line>:after{left:100%;margin-left:calc(5px + .3em)}[class*=uk-divider]{border:none;margin-bottom:20px}*+[class*=uk-divider]{margin-top:20px}.uk-divider-icon{position:relative;height:20px;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22none%22%20stroke%3D%22%23e5e5e5%22%20stroke-width%3D%222%22%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%227%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\");background-repeat:no-repeat;background-position:50% 50%}.uk-divider-icon:after,.uk-divider-icon:before{content:\"\";position:absolute;top:50%;max-width:calc(50% - 25px);border-bottom:1px solid #e5e5e5}.uk-divider-icon:before{right:calc(50% + 25px);width:100%}.uk-divider-icon:after{left:calc(50% + 25px);width:100%}.uk-divider-small{line-height:0}.uk-divider-small:after{content:\"\";display:inline-block;width:100px;max-width:100%;border-top:1px solid #e5e5e5;vertical-align:top}.uk-divider-vertical{width:1px;height:100px;margin-left:auto;margin-right:auto;border-left:1px solid #e5e5e5}.uk-list{padding:0;list-style:none}.uk-list>li:after,.uk-list>li:before{content:\"\";display:table}.uk-list>li:after{clear:both}.uk-list>li>:last-child{margin-bottom:0}.uk-list ul{margin:0;padding-left:30px;list-style:none}.uk-list>li:nth-child(n+2),.uk-list>li>ul{margin-top:10px}.uk-list-divider>li:nth-child(n+2){margin-top:10px;padding-top:10px;border-top:1px solid #e5e5e5}.uk-list-striped>li{padding:10px}.uk-list-striped>li:nth-of-type(odd){background:#f8f8f8}.uk-list-striped>li:nth-child(n+2){margin-top:0}.uk-list-bullet>li{position:relative;padding-left:calc(1.5em + 10px)}.uk-list-bullet>li:before{content:\"\";position:absolute;top:0;left:0;width:1.5em;height:1.5em;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23666%22%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%20%2F%3E%0A%3C%2Fsvg%3E\");background-repeat:no-repeat;background-position:50% 50%;display:block}.uk-list-large>li:nth-child(n+2),.uk-list-large>li>ul{margin-top:20px}.uk-list-collapse>li:nth-child(n+2),.uk-list-collapse>li>ul{margin-top:0}.uk-list-large.uk-list-divider>li:nth-child(n+2){margin-top:20px;padding-top:20px}.uk-list-collapse.uk-list-divider>li:nth-child(n+2){margin-top:0;padding-top:0}.uk-list-large.uk-list-striped>li{padding:20px 10px}.uk-list-collapse.uk-list-striped>li{padding-top:0;padding-bottom:0}.uk-list-collapse.uk-list-striped>li:nth-child(n+2),.uk-list-large.uk-list-striped>li:nth-child(n+2){margin-top:0}.uk-description-list>dt{color:#333}.uk-description-list>dt:nth-child(n+2){margin-top:20px}.uk-description-list-divider>dt:nth-child(n+2){margin-top:20px;padding-top:20px;border-top:1px solid #e5e5e5}.uk-table{border-collapse:collapse;border-spacing:0;width:100%;margin-bottom:20px}*+.uk-table{margin-top:20px}.uk-table th{padding:16px 12px;text-align:left;vertical-align:bottom;font-size:16px;font-weight:700;color:#666}.uk-table td{padding:16px 12px;vertical-align:top}.uk-table td>:last-child{margin-bottom:0}.uk-table tfoot{font-size:.875rem}.uk-table caption{font-size:.875rem;text-align:left;color:#999}.uk-table-middle,.uk-table-middle td{vertical-align:middle!important}.uk-table-divider>:first-child>tr:not(:first-child),.uk-table-divider>:not(:first-child)>tr,.uk-table-divider>tr:not(:first-child){border-top:1px solid #e5e5e5}.uk-table-striped>tr:nth-of-type(odd),.uk-table-striped tbody tr:nth-of-type(odd){background:#f8f8f8}.uk-table-hover>tr:hover,.uk-table-hover tbody tr:hover,.uk-table>tr.uk-active,.uk-table tbody tr.uk-active{background:#ffd}.uk-table-small td,.uk-table-small th{padding:10px 12px}.uk-table-large td,.uk-table-large th{padding:22px 12px}.uk-table-justify td:first-child,.uk-table-justify th:first-child{padding-left:0}.uk-table-justify td:last-child,.uk-table-justify th:last-child{padding-right:0}.uk-table-shrink{width:1px}.uk-table-expand{min-width:150px}.uk-table-link{padding:0!important}.uk-table-link>a{display:block;padding:16px 12px}.uk-table-small .uk-table-link>a{padding:10px 12px}@media (max-width:959px){.uk-table-responsive,.uk-table-responsive tbody,.uk-table-responsive td,.uk-table-responsive th,.uk-table-responsive tr{display:block}.uk-table-responsive thead{display:none}.uk-table-responsive td,.uk-table-responsive th{width:auto!important;max-width:none!important;min-width:0!important;overflow:visible!important;white-space:normal!important}.uk-table-responsive .uk-table-link:not(:first-child)>a,.uk-table-responsive td:not(:first-child):not(.uk-table-link),.uk-table-responsive th:not(:first-child):not(.uk-table-link){padding-top:5px!important}.uk-table-responsive .uk-table-link:not(:last-child)>a,.uk-table-responsive td:not(:last-child):not(.uk-table-link),.uk-table-responsive th:not(:last-child):not(.uk-table-link){padding-bottom:5px!important}.uk-table-justify.uk-table-responsive td,.uk-table-justify.uk-table-responsive th{padding-left:0;padding-right:0}}.uk-icon{margin:0;border:none;border-radius:0;overflow:visible;font:inherit;color:inherit;text-transform:none;padding:0;background-color:transparent;display:inline-block;fill:currentcolor;line-height:0}button.uk-icon:not(:disabled){cursor:pointer}.uk-icon::-moz-focus-inner{border:0;padding:0}.uk-icon:not(.uk-preserve) [fill*=\"#\"]:not(.uk-preserve){fill:currentcolor}.uk-icon:not(.uk-preserve) [stroke*=\"#\"]:not(.uk-preserve){stroke:currentcolor}.uk-icon>*{transform:translate(0)}.uk-icon-image{width:20px;height:20px;background-position:50% 50%;background-repeat:no-repeat;background-size:contain;vertical-align:middle}.uk-icon-link{color:#999}.uk-icon-link:focus,.uk-icon-link:hover{color:#666;outline:none}.uk-active>.uk-icon-link,.uk-icon-link:active{color:#595959}.uk-icon-button{box-sizing:border-box;width:36px;height:36px;border-radius:500px;background:#f8f8f8;color:#999;vertical-align:middle;display:inline-flex;justify-content:center;align-items:center}.uk-icon-button:focus,.uk-icon-button:hover{background-color:#ebebeb;color:#666;outline:none}.uk-active>.uk-icon-button,.uk-icon-button:active{background-color:#dfdfdf;color:#666}.uk-range{box-sizing:border-box;margin:0;vertical-align:middle;max-width:100%;width:100%;-webkit-appearance:none;background:transparent;padding:0}.uk-range:focus{outline:none}.uk-range::-moz-focus-outer{border:none}.uk-range::-ms-track{height:15px;background:transparent;border-color:transparent;color:transparent}.uk-range:not(:disabled)::-webkit-slider-thumb{cursor:pointer}.uk-range:not(:disabled)::-moz-range-thumb{cursor:pointer}.uk-range:not(:disabled)::-ms-thumb{cursor:pointer}.uk-range::-webkit-slider-thumb{-webkit-appearance:none;margin-top:-7px;height:15px;width:15px;border-radius:500px;background:#666}.uk-range::-moz-range-thumb{border:none;height:15px;width:15px;border-radius:500px;background:#666}.uk-range::-ms-thumb{margin-top:0;border:none;height:15px;width:15px;border-radius:500px;background:#666}.uk-range::-ms-tooltip{display:none}.uk-range::-webkit-slider-runnable-track{height:3px;background:#ebebeb}.uk-range:active::-webkit-slider-runnable-track,.uk-range:focus::-webkit-slider-runnable-track{background:#d2d2d2}.uk-range::-moz-range-track{height:3px;background:#ebebeb}.uk-range:focus::-moz-range-track{background:#d2d2d2}.uk-range::-ms-fill-lower,.uk-range::-ms-fill-upper{height:3px;background:#ebebeb}.uk-range:focus::-ms-fill-lower,.uk-range:focus::-ms-fill-upper{background:#d2d2d2}.uk-checkbox,.uk-input,.uk-radio,.uk-select,.uk-textarea{box-sizing:border-box;margin:0;border-radius:0;font:inherit}.uk-input{overflow:visible}.uk-select{text-transform:none}.uk-select optgroup{font:inherit;font-weight:700}.uk-textarea{overflow:auto}.uk-input[type=search]::-webkit-search-cancel-button,.uk-input[type=search]::-webkit-search-decoration{-webkit-appearance:none}.uk-input[type=number]::-webkit-inner-spin-button,.uk-input[type=number]::-webkit-outer-spin-button{height:auto}.uk-input::-moz-placeholder,.uk-textarea::-moz-placeholder{opacity:1}.uk-checkbox:not(:disabled),.uk-radio:not(:disabled){cursor:pointer}.uk-fieldset{border:none;margin:0;padding:0}.uk-input,.uk-textarea{-webkit-appearance:none}.uk-input,.uk-select,.uk-textarea{max-width:100%;width:100%;border:0 none;padding:0 10px;background:#f8f8f8;color:#666}.uk-input,.uk-select:not([multiple]):not([size]){height:40px;vertical-align:middle;display:inline-block}.uk-input:not(input),.uk-select:not(select){line-height:40px}.uk-select[multiple],.uk-select[size],.uk-textarea{padding-top:4px;padding-bottom:4px;vertical-align:top}.uk-input:focus,.uk-select:focus,.uk-textarea:focus{outline:none;background-color:#f8f8f8;color:#666}.uk-input:disabled,.uk-select:disabled,.uk-textarea:disabled{background-color:#f8f8f8;color:#999}.uk-input::-ms-input-placeholder{color:#999!important}.uk-input::placeholder{color:#999}.uk-textarea::-ms-input-placeholder{color:#999!important}.uk-textarea::placeholder{color:#999}.uk-form-small{font-size:.875rem}.uk-form-small:not(textarea):not([multiple]):not([size]){height:30px;padding-left:8px;padding-right:8px}.uk-form-small:not(select):not(input):not(textarea){line-height:30px}.uk-form-large{font-size:1.25rem}.uk-form-large:not(textarea):not([multiple]):not([size]){height:55px;padding-left:12px;padding-right:12px}.uk-form-large:not(select):not(input):not(textarea){line-height:55px}.uk-form-danger,.uk-form-danger:focus{color:#f0506e}.uk-form-success,.uk-form-success:focus{color:#32d296}.uk-form-blank{background:none}input.uk-form-width-xsmall{width:50px}select.uk-form-width-xsmall{width:75px}.uk-form-width-small{width:130px}.uk-form-width-medium{width:200px}.uk-form-width-large{width:500px}.uk-select:not([multiple]):not([size]){-webkit-appearance:none;-moz-appearance:none;padding-right:20px;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%201%209%206%2015%206%22%20%2F%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%2013%209%208%2015%208%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\");background-repeat:no-repeat;background-position:100% 50%}.uk-select:not([multiple]):not([size])::-ms-expand{display:none}.uk-select:not([multiple]):not([size]) option{color:#444}.uk-select:not([multiple]):not([size]):disabled{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23999%22%20points%3D%2212%201%209%206%2015%206%22%20%2F%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23999%22%20points%3D%2212%2013%209%208%2015%208%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\")}.uk-input[list]{padding-right:20px;background-repeat:no-repeat;background-position:100% 50%}.uk-input[list]:focus,.uk-input[list]:hover{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%2012%208%206%2016%206%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\")}.uk-input[list]::-webkit-calendar-picker-indicator{display:none}.uk-checkbox,.uk-radio{display:inline-block;height:16px;width:16px;overflow:hidden;margin-top:-4px;vertical-align:middle;-webkit-appearance:none;-moz-appearance:none;background-color:#ebebeb;background-repeat:no-repeat;background-position:50% 50%}.uk-radio{border-radius:50%}.uk-checkbox:focus,.uk-radio:focus{outline:none}.uk-checkbox:checked,.uk-checkbox:indeterminate,.uk-radio:checked{background-color:#1e87f0}.uk-checkbox:checked:focus,.uk-checkbox:indeterminate:focus,.uk-radio:checked:focus{background-color:#0e6ecd}.uk-radio:checked{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23fff%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-checkbox:checked{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23fff%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\")}.uk-checkbox:indeterminate{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23fff%22%20x%3D%223%22%20y%3D%228%22%20width%3D%2210%22%20height%3D%221%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-checkbox:disabled,.uk-radio:disabled{background-color:#f8f8f8}.uk-radio:disabled:checked{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23999%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-checkbox:disabled:checked{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23999%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\")}.uk-checkbox:disabled:indeterminate{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23999%22%20x%3D%223%22%20y%3D%228%22%20width%3D%2210%22%20height%3D%221%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-legend{width:100%;color:inherit;padding:0;font-size:1.5rem;line-height:1.4}.uk-form-custom{display:inline-block;position:relative;max-width:100%;vertical-align:middle}.uk-form-custom input[type=file],.uk-form-custom select{position:absolute;top:0;z-index:1;width:100%;height:100%;left:0;-webkit-appearance:none;opacity:0;cursor:pointer}.uk-form-custom input[type=file]{font-size:500px;overflow:hidden}.uk-form-stacked .uk-form-label{display:block;margin-bottom:10px}@media (max-width:959px){.uk-form-horizontal .uk-form-label{display:block;margin-bottom:10px}}@media (min-width:960px){.uk-form-horizontal .uk-form-label{width:200px;margin-top:7px;float:left}.uk-form-horizontal .uk-form-controls{margin-left:215px}.uk-form-horizontal .uk-form-controls-text{padding-top:7px}}.uk-form-icon{position:absolute;top:0;bottom:0;left:0;width:40px;display:inline-flex;justify-content:center;align-items:center;color:#999}.uk-form-icon:hover{color:#666}.uk-form-icon:not(a):not(button):not(input){pointer-events:none}.uk-form-icon:not(.uk-form-icon-flip)~.uk-input{padding-left:40px!important}.uk-form-icon-flip{right:0;left:auto}.uk-form-icon-flip~.uk-input{padding-right:40px!important}.uk-button{margin:0;border:none;overflow:visible;font:inherit;color:inherit;text-transform:none;-webkit-appearance:none;border-radius:0;display:inline-block;box-sizing:border-box;padding:0 30px;vertical-align:middle;font-size:16px;line-height:40px;text-align:center;text-decoration:none}.uk-button:not(:disabled){cursor:pointer}.uk-button::-moz-focus-inner{border:0;padding:0}.uk-button:hover{text-decoration:none}.uk-button:focus{outline:none}.uk-button-default{background-color:#f8f8f8;color:#333}.uk-button-default:focus,.uk-button-default:hover{background-color:#ebebeb;color:#333}.uk-button-default.uk-active,.uk-button-default:active{background-color:#dfdfdf;color:#333}.uk-button-primary{background-color:#1e87f0;color:#fff}.uk-button-primary:focus,.uk-button-primary:hover{background-color:#0f7ae5;color:#fff}.uk-button-primary.uk-active,.uk-button-primary:active{background-color:#0e6ecd;color:#fff}.uk-button-secondary{background-color:#222;color:#fff}.uk-button-secondary:focus,.uk-button-secondary:hover{background-color:#151515;color:#fff}.uk-button-secondary.uk-active,.uk-button-secondary:active{background-color:#090909;color:#fff}.uk-button-danger{background-color:#f0506e;color:#fff}.uk-button-danger:focus,.uk-button-danger:hover{background-color:#ee395b;color:#fff}.uk-button-danger.uk-active,.uk-button-danger:active{background-color:#ec2147;color:#fff}.uk-button-danger:disabled,.uk-button-default:disabled,.uk-button-primary:disabled,.uk-button-secondary:disabled{background-color:#f8f8f8;color:#999}.uk-button-small{padding:0 15px;line-height:30px;font-size:.875rem}.uk-button-large{padding:0 40px;line-height:55px;font-size:1.25rem}.uk-button-text{padding:0;line-height:1.5;background:none;color:#999}.uk-button-text:focus,.uk-button-text:hover{color:#666}.uk-button-text:disabled{color:#999}.uk-button-link{padding:0;line-height:1.5;background:none;color:#1e87f0}.uk-button-link:focus,.uk-button-link:hover{color:#0f6ecd;text-decoration:underline}.uk-button-link:disabled{color:#999;text-decoration:none}.uk-button-group{display:inline-flex;vertical-align:middle;position:relative}.uk-section{box-sizing:border-box;padding-top:40px;padding-bottom:40px}@media (min-width:960px){.uk-section{padding-top:70px;padding-bottom:70px}}.uk-section:after,.uk-section:before{content:\"\";display:table}.uk-section:after{clear:both}.uk-section>:last-child{margin-bottom:0}.uk-section-xsmall{padding-top:20px;padding-bottom:20px}.uk-section-small{padding-top:40px;padding-bottom:40px}.uk-section-large{padding-top:70px;padding-bottom:70px}@media (min-width:960px){.uk-section-large{padding-top:140px;padding-bottom:140px}}.uk-section-xlarge{padding-top:140px;padding-bottom:140px}@media (min-width:960px){.uk-section-xlarge{padding-top:210px;padding-bottom:210px}}.uk-section-default{background:#fff}.uk-section-muted{background:#f8f8f8}.uk-section-primary{background:#1e87f0}.uk-section-secondary{background:#222}.uk-container{box-sizing:content-box;max-width:1200px;margin-left:auto;margin-right:auto;padding-left:15px;padding-right:15px}@media (min-width:640px){.uk-container{padding-left:30px;padding-right:30px}}@media (min-width:960px){.uk-container{padding-left:40px;padding-right:40px}}.uk-container:after,.uk-container:before{content:\"\";display:table}.uk-container:after{clear:both}.uk-container>:last-child{margin-bottom:0}.uk-container .uk-container{padding-left:0;padding-right:0}.uk-container-xsmall{max-width:750px}.uk-container-small{max-width:900px}.uk-container-large{max-width:1400px}.uk-container-xlarge{max-width:1600px}.uk-container-expand{max-width:none}.uk-container-expand-left{margin-left:0}.uk-container-expand-right{margin-right:0}@media (min-width:640px){.uk-container-expand-left.uk-container-xsmall,.uk-container-expand-right.uk-container-xsmall{max-width:calc(50% + 375px - 30px)}.uk-container-expand-left.uk-container-small,.uk-container-expand-right.uk-container-small{max-width:calc(50% + 450px - 30px)}}@media (min-width:960px){.uk-container-expand-left,.uk-container-expand-right{max-width:calc(50% + 600px - 40px)}.uk-container-expand-left.uk-container-xsmall,.uk-container-expand-right.uk-container-xsmall{max-width:calc(50% + 375px - 40px)}.uk-container-expand-left.uk-container-small,.uk-container-expand-right.uk-container-small{max-width:calc(50% + 450px - 40px)}.uk-container-expand-left.uk-container-large,.uk-container-expand-right.uk-container-large{max-width:calc(50% + 700px - 40px)}.uk-container-expand-left.uk-container-xlarge,.uk-container-expand-right.uk-container-xlarge{max-width:calc(50% + 800px - 40px)}}.uk-container-item-padding-remove-left,.uk-container-item-padding-remove-right{width:calc(100% + 15px)}.uk-container-item-padding-remove-left{margin-left:-15px}.uk-container-item-padding-remove-right{margin-right:-15px}@media (min-width:640px){.uk-container-item-padding-remove-left,.uk-container-item-padding-remove-right{width:calc(100% + 30px)}.uk-container-item-padding-remove-left{margin-left:-30px}.uk-container-item-padding-remove-right{margin-right:-30px}}@media (min-width:960px){.uk-container-item-padding-remove-left,.uk-container-item-padding-remove-right{width:calc(100% + 40px)}.uk-container-item-padding-remove-left{margin-left:-40px}.uk-container-item-padding-remove-right{margin-right:-40px}}.uk-grid{display:flex;flex-wrap:wrap;margin:0;padding:0;list-style:none}.uk-grid>*{margin:0}.uk-grid>*>:last-child{margin-bottom:0}.uk-grid{margin-left:-30px}.uk-grid>*{padding-left:30px}*+.uk-grid-margin,.uk-grid+.uk-grid,.uk-grid>.uk-grid-margin{margin-top:30px}@media (min-width:1200px){.uk-grid{margin-left:-40px}.uk-grid>*{padding-left:40px}*+.uk-grid-margin,.uk-grid+.uk-grid,.uk-grid>.uk-grid-margin{margin-top:40px}}.uk-grid-column-small,.uk-grid-small{margin-left:-15px}.uk-grid-column-small>*,.uk-grid-small>*{padding-left:15px}*+.uk-grid-margin-small,.uk-grid+.uk-grid-row-small,.uk-grid+.uk-grid-small,.uk-grid-row-small>.uk-grid-margin,.uk-grid-small>.uk-grid-margin{margin-top:15px}.uk-grid-column-medium,.uk-grid-medium{margin-left:-30px}.uk-grid-column-medium>*,.uk-grid-medium>*{padding-left:30px}*+.uk-grid-margin-medium,.uk-grid+.uk-grid-medium,.uk-grid+.uk-grid-row-medium,.uk-grid-medium>.uk-grid-margin,.uk-grid-row-medium>.uk-grid-margin{margin-top:30px}.uk-grid-column-large,.uk-grid-large{margin-left:-40px}.uk-grid-column-large>*,.uk-grid-large>*{padding-left:40px}*+.uk-grid-margin-large,.uk-grid+.uk-grid-large,.uk-grid+.uk-grid-row-large,.uk-grid-large>.uk-grid-margin,.uk-grid-row-large>.uk-grid-margin{margin-top:40px}@media (min-width:1200px){.uk-grid-column-large,.uk-grid-large{margin-left:-70px}.uk-grid-column-large>*,.uk-grid-large>*{padding-left:70px}*+.uk-grid-margin-large,.uk-grid+.uk-grid-large,.uk-grid+.uk-grid-row-large,.uk-grid-large>.uk-grid-margin,.uk-grid-row-large>.uk-grid-margin{margin-top:70px}}.uk-grid-collapse,.uk-grid-column-collapse{margin-left:0}.uk-grid-collapse>*,.uk-grid-column-collapse>*{padding-left:0}.uk-grid+.uk-grid-collapse,.uk-grid+.uk-grid-row-collapse,.uk-grid-collapse>.uk-grid-margin,.uk-grid-row-collapse>.uk-grid-margin{margin-top:0}.uk-grid-divider>*{position:relative}.uk-grid-divider>:not(.uk-first-column):before{content:\"\";position:absolute;top:0;bottom:0;border-left:1px solid #e5e5e5}.uk-grid-divider.uk-grid-stack>.uk-grid-margin:before{content:\"\";position:absolute;left:0;right:0;border-top:1px solid #e5e5e5}.uk-grid-divider{margin-left:-60px}.uk-grid-divider>*{padding-left:60px}.uk-grid-divider>:not(.uk-first-column):before{left:30px}.uk-grid-divider.uk-grid-stack>.uk-grid-margin{margin-top:60px}.uk-grid-divider.uk-grid-stack>.uk-grid-margin:before{top:-30px;left:60px}@media (min-width:1200px){.uk-grid-divider{margin-left:-80px}.uk-grid-divider>*{padding-left:80px}.uk-grid-divider>:not(.uk-first-column):before{left:40px}.uk-grid-divider.uk-grid-stack>.uk-grid-margin{margin-top:80px}.uk-grid-divider.uk-grid-stack>.uk-grid-margin:before{top:-40px;left:80px}}.uk-grid-divider.uk-grid-column-small,.uk-grid-divider.uk-grid-small{margin-left:-30px}.uk-grid-divider.uk-grid-column-small>*,.uk-grid-divider.uk-grid-small>*{padding-left:30px}.uk-grid-divider.uk-grid-column-small>:not(.uk-first-column):before,.uk-grid-divider.uk-grid-small>:not(.uk-first-column):before{left:15px}.uk-grid-divider.uk-grid-row-small.uk-grid-stack>.uk-grid-margin,.uk-grid-divider.uk-grid-small.uk-grid-stack>.uk-grid-margin{margin-top:30px}.uk-grid-divider.uk-grid-small.uk-grid-stack>.uk-grid-margin:before{top:-15px;left:30px}.uk-grid-divider.uk-grid-row-small.uk-grid-stack>.uk-grid-margin:before{top:-15px}.uk-grid-divider.uk-grid-column-small.uk-grid-stack>.uk-grid-margin:before{left:30px}.uk-grid-divider.uk-grid-column-medium,.uk-grid-divider.uk-grid-medium{margin-left:-60px}.uk-grid-divider.uk-grid-column-medium>*,.uk-grid-divider.uk-grid-medium>*{padding-left:60px}.uk-grid-divider.uk-grid-column-medium>:not(.uk-first-column):before,.uk-grid-divider.uk-grid-medium>:not(.uk-first-column):before{left:30px}.uk-grid-divider.uk-grid-medium.uk-grid-stack>.uk-grid-margin,.uk-grid-divider.uk-grid-row-medium.uk-grid-stack>.uk-grid-margin{margin-top:60px}.uk-grid-divider.uk-grid-medium.uk-grid-stack>.uk-grid-margin:before{top:-30px;left:60px}.uk-grid-divider.uk-grid-row-medium.uk-grid-stack>.uk-grid-margin:before{top:-30px}.uk-grid-divider.uk-grid-column-medium.uk-grid-stack>.uk-grid-margin:before{left:60px}.uk-grid-divider.uk-grid-column-large,.uk-grid-divider.uk-grid-large{margin-left:-80px}.uk-grid-divider.uk-grid-column-large>*,.uk-grid-divider.uk-grid-large>*{padding-left:80px}.uk-grid-divider.uk-grid-column-large>:not(.uk-first-column):before,.uk-grid-divider.uk-grid-large>:not(.uk-first-column):before{left:40px}.uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin,.uk-grid-divider.uk-grid-row-large.uk-grid-stack>.uk-grid-margin{margin-top:80px}.uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin:before{top:-40px;left:80px}.uk-grid-divider.uk-grid-row-large.uk-grid-stack>.uk-grid-margin:before{top:-40px}.uk-grid-divider.uk-grid-column-large.uk-grid-stack>.uk-grid-margin:before{left:80px}@media (min-width:1200px){.uk-grid-divider.uk-grid-column-large,.uk-grid-divider.uk-grid-large{margin-left:-140px}.uk-grid-divider.uk-grid-column-large>*,.uk-grid-divider.uk-grid-large>*{padding-left:140px}.uk-grid-divider.uk-grid-column-large>:not(.uk-first-column):before,.uk-grid-divider.uk-grid-large>:not(.uk-first-column):before{left:70px}.uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin,.uk-grid-divider.uk-grid-row-large.uk-grid-stack>.uk-grid-margin{margin-top:140px}.uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin:before{top:-70px;left:140px}.uk-grid-divider.uk-grid-row-large.uk-grid-stack>.uk-grid-margin:before{top:-70px}.uk-grid-divider.uk-grid-column-large.uk-grid-stack>.uk-grid-margin:before{left:140px}}.uk-grid-item-match,.uk-grid-match>*{display:flex;flex-wrap:wrap}.uk-grid-item-match>:not([class*=uk-width]),.uk-grid-match>*>:not([class*=uk-width]){box-sizing:border-box;width:100%;flex:auto}.uk-tile{position:relative;box-sizing:border-box;padding:40px 15px}@media (min-width:640px){.uk-tile{padding-left:30px;padding-right:30px}}@media (min-width:960px){.uk-tile{padding:70px 40px}}.uk-tile:after,.uk-tile:before{content:\"\";display:table}.uk-tile:after{clear:both}.uk-tile>:last-child{margin-bottom:0}.uk-tile-xsmall{padding-top:20px;padding-bottom:20px}.uk-tile-small{padding-top:40px;padding-bottom:40px}.uk-tile-large{padding-top:70px;padding-bottom:70px}@media (min-width:960px){.uk-tile-large{padding-top:140px;padding-bottom:140px}}.uk-tile-xlarge{padding-top:140px;padding-bottom:140px}@media (min-width:960px){.uk-tile-xlarge{padding-top:210px;padding-bottom:210px}}.uk-tile-default{background:#fff}.uk-tile-muted{background:#f8f8f8}.uk-tile-primary{background:#1e87f0}.uk-tile-secondary{background:#222}.uk-card{position:relative;box-sizing:border-box}.uk-card-body{padding:30px}.uk-card-footer,.uk-card-header{padding:15px 30px}@media (min-width:1200px){.uk-card-body{padding:40px}.uk-card-footer,.uk-card-header{padding:20px 40px}}.uk-card-body:after,.uk-card-body:before,.uk-card-footer:after,.uk-card-footer:before,.uk-card-header:after,.uk-card-header:before{content:\"\";display:table}.uk-card-body:after,.uk-card-footer:after,.uk-card-header:after{clear:both}.uk-card-body>:last-child,.uk-card-footer>:last-child,.uk-card-header>:last-child{margin-bottom:0}.uk-card-title{font-size:1.5rem;line-height:1.4}.uk-card-badge{position:absolute;top:30px;right:30px;z-index:1}.uk-card-badge:first-child+*{margin-top:0}.uk-card-default,.uk-card-hover:not(.uk-card-default):not(.uk-card-primary):not(.uk-card-secondary):hover{background:#f8f8f8}.uk-card-default{color:#666}.uk-card-default .uk-card-title{color:#333}.uk-card-default.uk-card-hover:hover{background-color:#ebebeb}.uk-card-primary{background:#1e87f0;color:#fff}.uk-card-primary .uk-card-title{color:#fff}.uk-card-primary.uk-card-hover:hover{background-color:#0f7ae5}.uk-card-secondary{background:#222;color:#fff}.uk-card-secondary .uk-card-title{color:#fff}.uk-card-secondary.uk-card-hover:hover{background-color:#151515}.uk-card-small.uk-card-body,.uk-card-small .uk-card-body{padding:20px}.uk-card-small .uk-card-footer,.uk-card-small .uk-card-header{padding:13px 20px}@media (min-width:1200px){.uk-card-large.uk-card-body,.uk-card-large .uk-card-body{padding:70px}.uk-card-large .uk-card-footer,.uk-card-large .uk-card-header{padding:35px 70px}}.uk-close{color:#999}.uk-close:focus,.uk-close:hover{color:#666;outline:none}.uk-spinner>*{animation:uk-spinner-rotate 1.4s linear infinite}@keyframes uk-spinner-rotate{0%{transform:rotate(0deg)}to{transform:rotate(270deg)}}.uk-spinner>*>*{stroke-dasharray:88px;stroke-dashoffset:0;transform-origin:center;animation:uk-spinner-dash 1.4s ease-in-out infinite;stroke-width:1;stroke-linecap:round}@keyframes uk-spinner-dash{0%{stroke-dashoffset:88px}50%{stroke-dashoffset:22px;transform:rotate(135deg)}to{stroke-dashoffset:88px;transform:rotate(450deg)}}.uk-totop{padding:5px;color:#999}.uk-totop:focus,.uk-totop:hover{color:#666;outline:none}.uk-totop:active{color:#333}.uk-marker{padding:5px;background:#222;color:#fff}.uk-marker:focus,.uk-marker:hover{color:#fff;outline:none}.uk-alert{position:relative;margin-bottom:20px;padding:15px 29px 15px 15px;background:#f8f8f8;color:#666}*+.uk-alert{margin-top:20px}.uk-alert>:last-child{margin-bottom:0}.uk-alert-close{position:absolute;top:20px;right:15px}.uk-alert-close:first-child+*{margin-top:0}.uk-alert-primary{background:#d8eafc;color:#1e87f0}.uk-alert-success{background:#edfbf6;color:#32d296}.uk-alert-warning{background:#fef5ee;color:#faa05a}.uk-alert-danger{background:#fef4f6;color:#f0506e}.uk-badge{box-sizing:border-box;min-width:22px;height:22px;padding:0 5px;border-radius:500px;vertical-align:middle;background:#1e87f0;color:#fff;font-size:.875rem;display:inline-flex;justify-content:center;align-items:center}.uk-badge:focus,.uk-badge:hover{color:#fff;text-decoration:none;outline:none}.uk-label{display:inline-block;padding:0 10px;background:#1e87f0;line-height:1.5;font-size:.875rem;color:#fff;vertical-align:middle;white-space:nowrap}.uk-label-success{background-color:#32d296;color:#fff}.uk-label-warning{background-color:#faa05a;color:#fff}.uk-label-danger{background-color:#f0506e;color:#fff}.uk-overlay{padding:30px}.uk-overlay>:last-child{margin-bottom:0}.uk-overlay-default{background:hsla(0,0%,100%,.8)}.uk-overlay-primary{background:rgba(34,34,34,.8)}.uk-article:after,.uk-article:before{content:\"\";display:table}.uk-article:after{clear:both}.uk-article>:last-child{margin-bottom:0}.uk-article+.uk-article{margin-top:70px}.uk-article-title{font-size:2.23125rem;line-height:1.2}@media (min-width:960px){.uk-article-title{font-size:2.625rem}}.uk-article-meta{font-size:.875rem;line-height:1.4;color:#999}.uk-comment-body{overflow-wrap:break-word;word-wrap:break-word}.uk-comment-header{margin-bottom:20px}.uk-comment-body:after,.uk-comment-body:before,.uk-comment-header:after,.uk-comment-header:before{content:\"\";display:table}.uk-comment-body:after,.uk-comment-header:after{clear:both}.uk-comment-body>:last-child,.uk-comment-header>:last-child{margin-bottom:0}.uk-comment-title{font-size:1.25rem;line-height:1.4}.uk-comment-meta{font-size:.875rem;line-height:1.4;color:#999}.uk-comment-list{padding:0;list-style:none}.uk-comment-list>:nth-child(n+2){margin-top:70px}.uk-comment-list .uk-comment~ul{margin:70px 0 0;padding-left:30px;list-style:none}@media (min-width:960px){.uk-comment-list .uk-comment~ul{padding-left:100px}}.uk-comment-list .uk-comment~ul>:nth-child(n+2){margin-top:70px}.uk-search{display:inline-block;position:relative;max-width:100%;margin:0}.uk-search-input::-webkit-search-cancel-button,.uk-search-input::-webkit-search-decoration{-webkit-appearance:none}.uk-search-input::-moz-placeholder{opacity:1}.uk-search-input{box-sizing:border-box;margin:0;border-radius:0;font:inherit;overflow:visible;-webkit-appearance:none;vertical-align:middle;width:100%;border:none;color:#666}.uk-search-input:focus{outline:none}.uk-search-input:-ms-input-placeholder{color:#999!important}.uk-search-input::placeholder{color:#999}.uk-search-icon:focus{outline:none}.uk-search .uk-search-icon{position:absolute;top:0;bottom:0;left:0;display:inline-flex;justify-content:center;align-items:center;color:#999}.uk-search .uk-search-icon:hover{color:#999}.uk-search .uk-search-icon:not(a):not(button):not(input){pointer-events:none}.uk-search .uk-search-icon-flip{right:0;left:auto}.uk-search-default{width:180px}.uk-search-default .uk-search-input{height:40px;padding-left:6px;padding-right:6px;background:#f8f8f8}.uk-search-default .uk-search-input:focus{background-color:#f8f8f8}.uk-search-default .uk-search-icon{width:40px}.uk-search-default .uk-search-icon:not(.uk-search-icon-flip)~.uk-search-input{padding-left:40px}.uk-search-default .uk-search-icon-flip~.uk-search-input{padding-right:40px}.uk-search-navbar{width:400px}.uk-search-navbar .uk-search-input{height:40px;background:transparent;font-size:1.5rem}.uk-search-navbar .uk-search-icon{width:40px}.uk-search-navbar .uk-search-icon:not(.uk-search-icon-flip)~.uk-search-input{padding-left:40px}.uk-search-navbar .uk-search-icon-flip~.uk-search-input{padding-right:40px}.uk-search-large{width:500px}.uk-search-large .uk-search-input{height:80px;background:transparent;font-size:2.625rem}.uk-search-large .uk-search-icon{width:80px}.uk-search-large .uk-search-icon:not(.uk-search-icon-flip)~.uk-search-input{padding-left:80px}.uk-search-large .uk-search-icon-flip~.uk-search-input{padding-right:80px}.uk-search-toggle{color:#999}.uk-search-toggle:focus,.uk-search-toggle:hover{color:#666}.uk-nav,.uk-nav ul{margin:0;padding:0;list-style:none}.uk-nav li>a{display:block;text-decoration:none}.uk-nav li>a:focus{outline:none}.uk-nav>li>a{padding:5px 0}ul.uk-nav-sub{padding:5px 0 5px 15px}.uk-nav-sub ul{padding-left:15px}.uk-nav-sub a{padding:2px 0}.uk-nav-parent-icon>.uk-parent>a:after{content:\"\";width:1.5em;height:1.5em;float:right;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%221.1%22%20points%3D%2210%201%204%207%2010%2013%22%20%2F%3E%0A%3C%2Fsvg%3E\");background-repeat:no-repeat;background-position:50% 50%}.uk-nav-parent-icon>.uk-parent.uk-open>a:after{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%221.1%22%20points%3D%221%204%207%2010%2013%204%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-nav-header{padding:5px 0;text-transform:uppercase;font-size:.875rem}.uk-nav-header:not(:first-child){margin-top:20px}.uk-nav-divider{margin:5px 0}.uk-nav-default>li>a{color:#999}.uk-nav-default>li>a:focus,.uk-nav-default>li>a:hover{color:#666}.uk-nav-default .uk-nav-header,.uk-nav-default>li.uk-active>a{color:#333}.uk-nav-default .uk-nav-divider{border-top:1px solid #e5e5e5}.uk-nav-default .uk-nav-sub a{color:#999}.uk-nav-default .uk-nav-sub a:focus,.uk-nav-default .uk-nav-sub a:hover{color:#666}.uk-nav-default .uk-nav-sub li.uk-active>a{color:#333}.uk-nav-primary>li>a{font-size:1.5rem;line-height:1.5;color:#999}.uk-nav-primary>li>a:focus,.uk-nav-primary>li>a:hover{color:#666}.uk-nav-primary .uk-nav-header,.uk-nav-primary>li.uk-active>a{color:#333}.uk-nav-primary .uk-nav-divider{border-top:1px solid #e5e5e5}.uk-nav-primary .uk-nav-sub a{color:#999}.uk-nav-primary .uk-nav-sub a:focus,.uk-nav-primary .uk-nav-sub a:hover{color:#666}.uk-nav-primary .uk-nav-sub li.uk-active>a{color:#333}.uk-nav-center{text-align:center}.uk-nav-center .uk-nav-sub,.uk-nav-center .uk-nav-sub ul{padding-left:0}.uk-nav-center.uk-nav-parent-icon>.uk-parent>a:after{position:absolute}.uk-navbar{display:flex;position:relative}.uk-navbar-container:not(.uk-navbar-transparent){background:#f8f8f8}.uk-navbar-container>:after,.uk-navbar-container>:before{display:none!important}.uk-navbar-center,.uk-navbar-center-left>*,.uk-navbar-center-right>*,.uk-navbar-left,.uk-navbar-right{display:flex;align-items:center}.uk-navbar-right{margin-left:auto}.uk-navbar-center:only-child{margin-left:auto;margin-right:auto;position:relative}.uk-navbar-center:not(:only-child){position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:max-content;box-sizing:border-box;z-index:990}.uk-navbar-center-left,.uk-navbar-center-right{position:absolute;top:0}.uk-navbar-center-left{right:100%}.uk-navbar-center-right{left:100%}[class*=uk-navbar-center-]{width:max-content;box-sizing:border-box}.uk-navbar-nav{display:flex;margin:0;padding:0;list-style:none}.uk-navbar-center:only-child,.uk-navbar-left,.uk-navbar-right{flex-wrap:wrap}.uk-navbar-item,.uk-navbar-nav>li>a,.uk-navbar-toggle{display:flex;justify-content:center;align-items:center;box-sizing:border-box;min-height:80px;padding:0 15px;font-size:16px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif;text-decoration:none}.uk-navbar-nav>li>a{color:#999}.uk-navbar-nav>li:hover>a,.uk-navbar-nav>li>a.uk-open,.uk-navbar-nav>li>a:focus{color:#666;outline:none}.uk-navbar-nav>li.uk-active>a,.uk-navbar-nav>li>a:active{color:#333}.uk-navbar-item{color:#666}.uk-navbar-toggle{color:#999}.uk-navbar-toggle.uk-open,.uk-navbar-toggle:focus,.uk-navbar-toggle:hover{color:#666;outline:none;text-decoration:none}.uk-navbar-subtitle{font-size:.875rem}.uk-navbar-dropdown{display:none;position:absolute;z-index:1020;box-sizing:border-box;width:200px;padding:15px;background:#f8f8f8;color:#666}.uk-navbar-dropdown.uk-open{display:block}[class*=uk-navbar-dropdown-bottom],[class*=uk-navbar-dropdown-top]{margin-top:0}[class*=uk-navbar-dropdown-left],[class*=uk-navbar-dropdown-right]{margin-left:0}.uk-navbar-dropdown-grid{margin-left:-30px}.uk-navbar-dropdown-grid>*{padding-left:30px}.uk-navbar-dropdown-grid>.uk-grid-margin{margin-top:30px}.uk-navbar-dropdown-stack .uk-navbar-dropdown-grid>*{width:100%!important}.uk-navbar-dropdown-width-2:not(.uk-navbar-dropdown-stack){width:400px}.uk-navbar-dropdown-width-3:not(.uk-navbar-dropdown-stack){width:600px}.uk-navbar-dropdown-width-4:not(.uk-navbar-dropdown-stack){width:800px}.uk-navbar-dropdown-width-5:not(.uk-navbar-dropdown-stack){width:1000px}.uk-navbar-dropdown-dropbar{margin-top:0;margin-bottom:0}.uk-navbar-dropdown-nav>li>a{color:#999}.uk-navbar-dropdown-nav>li>a:focus,.uk-navbar-dropdown-nav>li>a:hover{color:#666}.uk-navbar-dropdown-nav .uk-nav-header,.uk-navbar-dropdown-nav>li.uk-active>a{color:#333}.uk-navbar-dropdown-nav .uk-nav-divider{border-top:1px solid #e5e5e5}.uk-navbar-dropdown-nav .uk-nav-sub a{color:#999}.uk-navbar-dropdown-nav .uk-nav-sub a:focus,.uk-navbar-dropdown-nav .uk-nav-sub a:hover{color:#666}.uk-navbar-dropdown-nav .uk-nav-sub li.uk-active>a{color:#333}.uk-navbar-dropbar{background:#f8f8f8}.uk-navbar-dropbar-slide{position:absolute;z-index:980;left:0;right:0}.uk-subnav{display:flex;flex-wrap:wrap;margin-left:-20px;padding:0;list-style:none}.uk-subnav>*{flex:none;padding-left:20px;position:relative}.uk-subnav>*>:first-child{display:block;color:#999}.uk-subnav>*>a:focus,.uk-subnav>*>a:hover{color:#666;text-decoration:none;outline:none}.uk-subnav>.uk-active>a{color:#333}.uk-subnav-divider{margin-left:-41px}.uk-subnav-divider>*{display:flex;align-items:center}.uk-subnav-divider>:before{content:\"\";height:1.5em;margin-left:0;margin-right:20px;border-left:1px solid transparent}.uk-subnav-divider>:nth-child(n+2):not(.uk-first-column):before{border-left-color:#e5e5e5}.uk-subnav-pill>*>:first-child{padding:5px 10px;background:transparent;color:#999}.uk-subnav-pill>*>a:active,.uk-subnav-pill>*>a:focus,.uk-subnav-pill>*>a:hover{background-color:#f8f8f8;color:#666}.uk-subnav-pill>.uk-active>a{background-color:#1e87f0;color:#fff}.uk-subnav>.uk-disabled>a{color:#999}.uk-breadcrumb{display:flex;flex-wrap:wrap;padding:0;list-style:none}.uk-breadcrumb>*{flex:none}.uk-breadcrumb>*>*{display:inline-block;font-size:.875rem;color:#999}.uk-breadcrumb>*>:focus,.uk-breadcrumb>*>:hover{color:#666;text-decoration:none}.uk-breadcrumb>:last-child>a:not([href]),.uk-breadcrumb>:last-child>span{color:#666}.uk-breadcrumb>:nth-child(n+2):not(.uk-first-column):before{content:\"/\";display:inline-block;margin:0 20px;font-size:.875rem;color:#999}.uk-pagination{display:flex;flex-wrap:wrap;margin-left:-20px;padding:0;list-style:none}.uk-pagination>*{flex:none;padding-left:20px;position:relative}.uk-pagination>*>*{display:block;color:#999}.uk-pagination>*>:focus,.uk-pagination>*>:hover{color:#666;text-decoration:none}.uk-pagination>.uk-active>*{color:#666}.uk-pagination>.uk-disabled>*{color:#999}.uk-tab{display:flex;flex-wrap:wrap;margin-left:-20px;padding:0;list-style:none}.uk-tab>*{flex:none;padding-left:20px;position:relative}.uk-tab>*>a{display:block;text-align:center;padding:5px 10px;color:#999}.uk-tab>*>a:focus,.uk-tab>*>a:hover{color:#666;text-decoration:none}.uk-tab>.uk-active>a{color:#333}.uk-tab>.uk-disabled>a{color:#999}.uk-tab-left,.uk-tab-right{flex-direction:column;margin-left:0}.uk-tab-left>*,.uk-tab-right>*{padding-left:0}.uk-tab-left>*>a,.uk-tab-right>*>a{text-align:left}.uk-slidenav{padding:5px 10px;color:hsla(0,0%,40%,.5)}.uk-slidenav:focus,.uk-slidenav:hover{color:hsla(0,0%,40%,.9);outline:none}.uk-slidenav:active{color:hsla(0,0%,40%,.5)}.uk-slidenav-large{padding:10px}.uk-dotnav,.uk-slidenav-container{display:flex}.uk-dotnav{flex-wrap:wrap;margin:0;padding:0;list-style:none;margin-left:-12px}.uk-dotnav>*{flex:none;padding-left:12px}.uk-dotnav>*>*{display:block;box-sizing:border-box;width:10px;height:10px;border-radius:50%;background:hsla(0,0%,40%,.2);text-indent:100%;overflow:hidden;white-space:nowrap}.uk-dotnav>*>:focus,.uk-dotnav>*>:hover{background-color:hsla(0,0%,40%,.6);outline:none}.uk-dotnav>*>:active{background-color:hsla(0,0%,40%,.2)}.uk-dotnav>.uk-active>*{background-color:hsla(0,0%,40%,.6)}.uk-dotnav-vertical{flex-direction:column;margin-left:0;margin-top:-12px}.uk-dotnav-vertical>*{padding-left:0;padding-top:12px}.uk-thumbnav{display:flex;flex-wrap:wrap;margin:0;padding:0;list-style:none;margin-left:-15px}.uk-thumbnav>*{padding-left:15px}.uk-thumbnav>*>*{display:inline-block}.uk-thumbnav>*>:focus,.uk-thumbnav>*>:hover{outline:none}.uk-thumbnav-vertical{flex-direction:column;margin-left:0;margin-top:-15px}.uk-thumbnav-vertical>*{padding-left:0;padding-top:15px}.uk-accordion{padding:0;list-style:none}.uk-accordion>:nth-child(n+2){margin-top:20px}.uk-accordion-title{display:block;font-size:1.25rem;line-height:1.4;color:#333}.uk-accordion-title:focus,.uk-accordion-title:hover{color:#666;text-decoration:none;outline:none}.uk-accordion-content{margin-top:20px}.uk-accordion-content:after,.uk-accordion-content:before{content:\"\";display:table}.uk-accordion-content:after{clear:both}.uk-accordion-content>:last-child{margin-bottom:0}.uk-drop{display:none;position:absolute;z-index:1020;box-sizing:border-box;width:300px}.uk-drop.uk-open{display:block}[class*=uk-drop-top]{margin-top:-20px}[class*=uk-drop-bottom]{margin-top:20px}[class*=uk-drop-left]{margin-left:-20px}[class*=uk-drop-right]{margin-left:20px}.uk-drop-stack .uk-drop-grid>*{width:100%!important}.uk-dropdown{display:none;position:absolute;z-index:1020;box-sizing:border-box;min-width:200px;padding:15px;background:#f8f8f8;color:#666}.uk-dropdown.uk-open{display:block}.uk-dropdown-nav{white-space:nowrap}.uk-dropdown-nav>li>a{color:#999}.uk-dropdown-nav>li.uk-active>a,.uk-dropdown-nav>li>a:focus,.uk-dropdown-nav>li>a:hover{color:#666}.uk-dropdown-nav .uk-nav-header{color:#333}.uk-dropdown-nav .uk-nav-divider{border-top:1px solid #e5e5e5}.uk-dropdown-nav .uk-nav-sub a{color:#999}.uk-dropdown-nav .uk-nav-sub a:focus,.uk-dropdown-nav .uk-nav-sub a:hover,.uk-dropdown-nav .uk-nav-sub li.uk-active>a{color:#666}[class*=uk-dropdown-top]{margin-top:-10px}[class*=uk-dropdown-bottom]{margin-top:10px}[class*=uk-dropdown-left]{margin-left:-10px}[class*=uk-dropdown-right]{margin-left:10px}.uk-dropdown-stack .uk-dropdown-grid>*{width:100%!important}.uk-modal{display:none;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1010;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:15px;background:rgba(0,0,0,.6);opacity:0;transition:opacity .15s linear}@media (min-width:640px){.uk-modal{padding:50px 30px}}@media (min-width:960px){.uk-modal{padding-left:40px;padding-right:40px}}.uk-modal.uk-open{opacity:1}.uk-modal-page{overflow:hidden}.uk-modal-dialog{position:relative;box-sizing:border-box;margin:0 auto;width:600px;max-width:calc(100% - .01px)!important;background:#fff;opacity:0;transform:translateY(-100px);transition:.3s linear;transition-property:opacity,transform}.uk-open>.uk-modal-dialog{opacity:1;transform:translateY(0)}.uk-modal-container .uk-modal-dialog{width:1200px}.uk-modal-full{padding:0;background:none}.uk-modal-full .uk-modal-dialog{margin:0;width:100%;max-width:100%;transform:translateY(0)}.uk-modal-body{padding:30px}.uk-modal-footer,.uk-modal-header{padding:15px 30px;background:#f8f8f8}.uk-modal-body:after,.uk-modal-body:before,.uk-modal-footer:after,.uk-modal-footer:before,.uk-modal-header:after,.uk-modal-header:before{content:\"\";display:table}.uk-modal-body:after,.uk-modal-footer:after,.uk-modal-header:after{clear:both}.uk-modal-body>:last-child,.uk-modal-footer>:last-child,.uk-modal-header>:last-child{margin-bottom:0}.uk-modal-title{font-size:2rem;line-height:1.3}[class*=uk-modal-close-]{position:absolute;z-index:1010;top:10px;right:10px;padding:5px}[class*=uk-modal-close-]:first-child+*{margin-top:0}.uk-modal-close-outside{top:0;right:-5px;transform:translateY(-100%);color:#fff}.uk-modal-close-outside:hover{color:#fff}@media (min-width:960px){.uk-modal-close-outside{right:0;transform:translate(100%,-100%)}}.uk-lightbox{display:none;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1010;background:#000;opacity:0;transition:opacity .15s linear;touch-action:pinch-zoom}.uk-lightbox.uk-open{display:block;opacity:1}.uk-lightbox-page{overflow:hidden}.uk-lightbox-items>*{position:absolute;top:0;right:0;bottom:0;left:0;display:none;justify-content:center;align-items:center;color:hsla(0,0%,100%,.7);will-change:transform,opacity}.uk-lightbox-items>*>*{max-width:100vw;max-height:100vh}.uk-lightbox-items>:focus{outline:none}.uk-lightbox-items>*>:not(iframe){width:auto;height:auto}.uk-lightbox-items>.uk-active{display:flex}.uk-lightbox-toolbar{padding:10px;background:rgba(0,0,0,.3)}.uk-lightbox-toolbar,.uk-lightbox-toolbar>*{color:hsla(0,0%,100%,.7)}.uk-lightbox-toolbar-icon{padding:5px;color:hsla(0,0%,100%,.7)}.uk-lightbox-toolbar-icon:hover{color:#fff}.uk-lightbox-button{box-sizing:border-box;width:50px;height:50px;background:rgba(0,0,0,.3);color:hsla(0,0%,100%,.7);display:inline-flex;justify-content:center;align-items:center}.uk-lightbox-button:hover{color:#fff}.uk-lightbox-caption:empty{display:none}.uk-lightbox-iframe{width:80%;height:80%}.uk-slideshow{-webkit-tap-highlight-color:transparent}.uk-slideshow-items{position:relative;z-index:0;margin:0;padding:0;list-style:none;overflow:hidden;-webkit-touch-callout:none}.uk-slideshow-items>*{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;will-change:transform,opacity;touch-action:pan-y}.uk-slideshow-items>:focus{outline:none}.uk-slideshow-items>:not(.uk-active){display:none}.uk-slider{-webkit-tap-highlight-color:transparent}.uk-slider-container{overflow:hidden}.uk-slider-items{will-change:transform;position:relative}.uk-slider-items:not(.uk-grid){display:flex;margin:0;padding:0;list-style:none;-webkit-touch-callout:none}.uk-slider-items.uk-grid{flex-wrap:nowrap}.uk-slider-items>*{flex:none;position:relative;touch-action:pan-y}.uk-slider-items>:focus{outline:none}.uk-sticky-fixed{z-index:980;box-sizing:border-box;margin:0!important;-webkit-backface-visibility:hidden;backface-visibility:hidden}.uk-sticky.uk-animation-reverse,.uk-sticky[class*=uk-animation-]{animation-duration:.2s}.uk-offcanvas{display:none;position:fixed;top:0;bottom:0;left:0;z-index:1000}.uk-offcanvas-flip .uk-offcanvas{right:0;left:auto}.uk-offcanvas-bar{position:absolute;top:0;bottom:0;left:-270px;box-sizing:border-box;width:270px;padding:20px;background:#222;overflow-y:auto;-webkit-overflow-scrolling:touch}@media (min-width:960px){.uk-offcanvas-bar{left:-350px;width:350px;padding:40px}}.uk-offcanvas-flip .uk-offcanvas-bar{left:auto;right:-270px}@media (min-width:960px){.uk-offcanvas-flip .uk-offcanvas-bar{right:-350px}}.uk-open>.uk-offcanvas-bar{left:0}.uk-offcanvas-flip .uk-open>.uk-offcanvas-bar{left:auto;right:0}.uk-offcanvas-bar-animation{transition:left .3s ease-out}.uk-offcanvas-flip .uk-offcanvas-bar-animation{transition-property:right}.uk-offcanvas-reveal{position:absolute;top:0;bottom:0;left:0;width:0;overflow:hidden;transition:width .3s ease-out}.uk-offcanvas-reveal .uk-offcanvas-bar{left:0}.uk-offcanvas-flip .uk-offcanvas-reveal .uk-offcanvas-bar{left:auto;right:0}.uk-open>.uk-offcanvas-reveal{width:270px}@media (min-width:960px){.uk-open>.uk-offcanvas-reveal{width:350px}}.uk-offcanvas-flip .uk-offcanvas-reveal{right:0;left:auto}.uk-offcanvas-close{position:absolute;z-index:1000;top:20px;right:20px;padding:5px}.uk-offcanvas-overlay{width:100vw;touch-action:none}.uk-offcanvas-overlay:before{content:\"\";position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.1);opacity:0;transition:opacity .15s linear}.uk-offcanvas-overlay.uk-open:before{opacity:1}.uk-offcanvas-container,.uk-offcanvas-page{overflow-x:hidden}.uk-offcanvas-container{position:relative;left:0;transition:left .3s ease-out;box-sizing:border-box;width:100%}:not(.uk-offcanvas-flip).uk-offcanvas-container-animation{left:270px}.uk-offcanvas-flip.uk-offcanvas-container-animation{left:-270px}@media (min-width:960px){:not(.uk-offcanvas-flip).uk-offcanvas-container-animation{left:350px}.uk-offcanvas-flip.uk-offcanvas-container-animation{left:-350px}}.uk-switcher{margin:0;padding:0;list-style:none}.uk-switcher>:not(.uk-active){display:none}.uk-switcher>*>:last-child{margin-bottom:0}.uk-leader{overflow:hidden}.uk-leader-fill:after{display:inline-block;margin-left:15px;width:0;content:attr(data-fill);white-space:nowrap}.uk-leader-fill.uk-leader-hide:after{display:none}.uk-leader-fill-content:before{content:\".\"}:root{--uk-leader-fill-content:.}.uk-iconnav{display:flex;flex-wrap:wrap;margin:0;padding:0;list-style:none;margin-left:-10px}.uk-iconnav>*{padding-left:10px}.uk-iconnav>*>a{display:block;color:#999}.uk-iconnav>*>a:focus,.uk-iconnav>*>a:hover{color:#666;outline:none}.uk-iconnav>.uk-active>a{color:#666}.uk-iconnav-vertical{flex-direction:column;margin-left:0;margin-top:-10px}.uk-iconnav-vertical>*{padding-left:0;padding-top:10px}.uk-notification{position:fixed;top:10px;left:10px;z-index:1040;box-sizing:border-box;width:350px}.uk-notification-bottom-right,.uk-notification-top-right{left:auto;right:10px}.uk-notification-bottom-center,.uk-notification-top-center{left:50%;margin-left:-175px}.uk-notification-bottom-center,.uk-notification-bottom-left,.uk-notification-bottom-right{top:auto;bottom:10px}@media (max-width:639px){.uk-notification{left:10px;right:10px;width:auto;margin:0}}.uk-notification-message{position:relative;padding:15px;background:#f8f8f8;color:#666;font-size:1.25rem;line-height:1.4;cursor:pointer}*+.uk-notification-message{margin-top:10px}.uk-notification-close{display:none;position:absolute;top:20px;right:15px}.uk-notification-message:hover .uk-notification-close{display:block}.uk-notification-message-primary{color:#1e87f0}.uk-notification-message-success{color:#32d296}.uk-notification-message-warning{color:#faa05a}.uk-notification-message-danger{color:#f0506e}.uk-tooltip{display:none;position:absolute;z-index:1030;top:0;box-sizing:border-box;max-width:200px;padding:3px 6px;background:#666;border-radius:2px;color:#fff;font-size:12px}.uk-tooltip.uk-active{display:block}[class*=uk-tooltip-top]{margin-top:-10px}[class*=uk-tooltip-bottom]{margin-top:10px}[class*=uk-tooltip-left]{margin-left:-10px}[class*=uk-tooltip-right]{margin-left:10px}.uk-placeholder{margin-bottom:20px;padding:30px;background:#f8f8f8}*+.uk-placeholder{margin-top:20px}.uk-placeholder>:last-child{margin-bottom:0}.uk-progress{vertical-align:baseline;-webkit-appearance:none;-moz-appearance:none;display:block;width:100%;border:0;background-color:#f8f8f8;margin-bottom:20px;height:15px}*+.uk-progress{margin-top:20px}.uk-progress:indeterminate{color:transparent}.uk-progress::-webkit-progress-bar{background-color:#f8f8f8}.uk-progress:indeterminate::-moz-progress-bar{width:0}.uk-progress::-webkit-progress-value{background-color:#1e87f0;transition:width .6s ease}.uk-progress::-moz-progress-bar{background-color:#1e87f0}.uk-progress::-ms-fill{background-color:#1e87f0;transition:width .6s ease;border:0}.uk-sortable{position:relative}.uk-sortable svg{pointer-events:none}.uk-sortable>:last-child{margin-bottom:0}.uk-sortable-drag{position:fixed!important;z-index:1050!important;pointer-events:none}.uk-sortable-placeholder{opacity:0;pointer-events:none}.uk-sortable-empty{min-height:50px}.uk-sortable-handle:hover{cursor:move}.uk-countdown-number{font-variant-numeric:tabular-nums;font-size:2rem;line-height:.8}@media (min-width:640px){.uk-countdown-number{font-size:4rem}}@media (min-width:960px){.uk-countdown-number{font-size:6rem}}.uk-countdown-separator{font-size:1rem;line-height:1.6}@media (min-width:640px){.uk-countdown-separator{font-size:2rem}}@media (min-width:960px){.uk-countdown-separator{font-size:3rem}}[class*=uk-animation-]{animation-duration:.5s;animation-timing-function:ease-out;animation-fill-mode:both}.uk-animation-fade{animation-name:uk-fade;animation-duration:.8s;animation-timing-function:linear}.uk-animation-scale-up{animation-name:uk-fade-scale-02}.uk-animation-scale-down{animation-name:uk-fade-scale-18}.uk-animation-slide-top{animation-name:uk-fade-top}.uk-animation-slide-bottom{animation-name:uk-fade-bottom}.uk-animation-slide-left{animation-name:uk-fade-left}.uk-animation-slide-right{animation-name:uk-fade-right}.uk-animation-slide-top-small{animation-name:uk-fade-top-small}.uk-animation-slide-bottom-small{animation-name:uk-fade-bottom-small}.uk-animation-slide-left-small{animation-name:uk-fade-left-small}.uk-animation-slide-right-small{animation-name:uk-fade-right-small}.uk-animation-slide-top-medium{animation-name:uk-fade-top-medium}.uk-animation-slide-bottom-medium{animation-name:uk-fade-bottom-medium}.uk-animation-slide-left-medium{animation-name:uk-fade-left-medium}.uk-animation-slide-right-medium{animation-name:uk-fade-right-medium}.uk-animation-kenburns{animation-name:uk-scale-kenburns;animation-duration:15s}.uk-animation-shake{animation-name:uk-shake}.uk-animation-stroke{animation-name:uk-stroke;stroke-dasharray:var(--uk-animation-stroke);animation-duration:2s}.uk-animation-reverse{animation-direction:reverse;animation-timing-function:ease-in}.uk-animation-fast{animation-duration:.1s}.uk-animation-toggle:not(:hover):not(:focus) [class*=uk-animation-]{animation-name:none}.uk-animation-toggle{-webkit-tap-highlight-color:transparent}.uk-animation-toggle:focus{outline:none}@keyframes uk-fade{0%{opacity:0}to{opacity:1}}@keyframes uk-fade-top{0%{opacity:0;transform:translateY(-100%)}to{opacity:1;transform:translateY(0)}}@keyframes uk-fade-bottom{0%{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}@keyframes uk-fade-left{0%{opacity:0;transform:translateX(-100%)}to{opacity:1;transform:translateX(0)}}@keyframes uk-fade-right{0%{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}@keyframes uk-fade-top-small{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@keyframes uk-fade-bottom-small{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes uk-fade-left-small{0%{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}@keyframes uk-fade-right-small{0%{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}@keyframes uk-fade-top-medium{0%{opacity:0;transform:translateY(-50px)}to{opacity:1;transform:translateY(0)}}@keyframes uk-fade-bottom-medium{0%{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}@keyframes uk-fade-left-medium{0%{opacity:0;transform:translateX(-50px)}to{opacity:1;transform:translateX(0)}}@keyframes uk-fade-right-medium{0%{opacity:0;transform:translateX(50px)}to{opacity:1;transform:translateX(0)}}@keyframes uk-fade-scale-02{0%{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}@keyframes uk-fade-scale-18{0%{opacity:0;transform:scale(1.8)}to{opacity:1;transform:scale(1)}}@keyframes uk-scale-kenburns{0%{transform:scale(1)}to{transform:scale(1.2)}}@keyframes uk-shake{0%,to{transform:translateX(0)}10%{transform:translateX(-9px)}20%{transform:translateX(8px)}30%{transform:translateX(-7px)}40%{transform:translateX(6px)}50%{transform:translateX(-5px)}60%{transform:translateX(4px)}70%{transform:translateX(-3px)}80%{transform:translateX(2px)}90%{transform:translateX(-1px)}}@keyframes uk-stroke{0%{stroke-dashoffset:var(--uk-animation-stroke)}to{stroke-dashoffset:0}}[class*=uk-child-width]>*{box-sizing:border-box;width:100%}.uk-child-width-1-2>*{width:50%}.uk-child-width-1-3>*{width:33.32223%}.uk-child-width-1-4>*{width:25%}.uk-child-width-1-5>*{width:20%}.uk-child-width-1-6>*{width:16.66389%}.uk-child-width-auto>*{width:auto}.uk-child-width-expand>:not([class*=uk-width]){flex:1;min-width:1px}@media (min-width:640px){.uk-child-width-1-1\\@s>*{width:100%}.uk-child-width-1-2\\@s>*{width:50%}.uk-child-width-1-3\\@s>*{width:33.32223%}.uk-child-width-1-4\\@s>*{width:25%}.uk-child-width-1-5\\@s>*{width:20%}.uk-child-width-1-6\\@s>*{width:16.66389%}.uk-child-width-auto\\@s>*{width:auto}.uk-child-width-expand\\@s>:not([class*=uk-width]){flex:1;min-width:1px}}@media (min-width:960px){.uk-child-width-1-1\\@m>*{width:100%}.uk-child-width-1-2\\@m>*{width:50%}.uk-child-width-1-3\\@m>*{width:33.32223%}.uk-child-width-1-4\\@m>*{width:25%}.uk-child-width-1-5\\@m>*{width:20%}.uk-child-width-1-6\\@m>*{width:16.66389%}.uk-child-width-auto\\@m>*{width:auto}.uk-child-width-expand\\@m>:not([class*=uk-width]){flex:1;min-width:1px}}@media (min-width:1200px){.uk-child-width-1-1\\@l>*{width:100%}.uk-child-width-1-2\\@l>*{width:50%}.uk-child-width-1-3\\@l>*{width:33.32223%}.uk-child-width-1-4\\@l>*{width:25%}.uk-child-width-1-5\\@l>*{width:20%}.uk-child-width-1-6\\@l>*{width:16.66389%}.uk-child-width-auto\\@l>*{width:auto}.uk-child-width-expand\\@l>:not([class*=uk-width]){flex:1;min-width:1px}}@media (min-width:1600px){.uk-child-width-1-1\\@xl>*{width:100%}.uk-child-width-1-2\\@xl>*{width:50%}.uk-child-width-1-3\\@xl>*{width:33.32223%}.uk-child-width-1-4\\@xl>*{width:25%}.uk-child-width-1-5\\@xl>*{width:20%}.uk-child-width-1-6\\@xl>*{width:16.66389%}.uk-child-width-auto\\@xl>*{width:auto}.uk-child-width-expand\\@xl>:not([class*=uk-width]){flex:1;min-width:1px}}[class*=uk-width]{box-sizing:border-box;width:100%;max-width:100%}.uk-width-1-2{width:50%}.uk-width-1-3{width:33.32223%}.uk-width-2-3{width:66.64445%}.uk-width-1-4{width:25%}.uk-width-3-4{width:75%}.uk-width-1-5{width:20%}.uk-width-2-5{width:40%}.uk-width-3-5{width:60%}.uk-width-4-5{width:80%}.uk-width-1-6{width:16.66389%}.uk-width-5-6{width:83.31945%}.uk-width-small{width:150px}.uk-width-medium{width:300px}.uk-width-large{width:450px}.uk-width-xlarge{width:600px}.uk-width-xxlarge{width:750px}.uk-width-auto{width:auto}.uk-width-expand{flex:1;min-width:1px}@media (min-width:640px){.uk-width-1-1\\@s{width:100%}.uk-width-1-2\\@s{width:50%}.uk-width-1-3\\@s{width:33.32223%}.uk-width-2-3\\@s{width:66.64445%}.uk-width-1-4\\@s{width:25%}.uk-width-3-4\\@s{width:75%}.uk-width-1-5\\@s{width:20%}.uk-width-2-5\\@s{width:40%}.uk-width-3-5\\@s{width:60%}.uk-width-4-5\\@s{width:80%}.uk-width-1-6\\@s{width:16.66389%}.uk-width-5-6\\@s{width:83.31945%}.uk-width-small\\@s{width:150px}.uk-width-medium\\@s{width:300px}.uk-width-large\\@s{width:450px}.uk-width-xlarge\\@s{width:600px}.uk-width-xxlarge\\@s{width:750px}.uk-width-auto\\@s{width:auto}.uk-width-expand\\@s{flex:1;min-width:1px}}@media (min-width:960px){.uk-width-1-1\\@m{width:100%}.uk-width-1-2\\@m{width:50%}.uk-width-1-3\\@m{width:33.32223%}.uk-width-2-3\\@m{width:66.64445%}.uk-width-1-4\\@m{width:25%}.uk-width-3-4\\@m{width:75%}.uk-width-1-5\\@m{width:20%}.uk-width-2-5\\@m{width:40%}.uk-width-3-5\\@m{width:60%}.uk-width-4-5\\@m{width:80%}.uk-width-1-6\\@m{width:16.66389%}.uk-width-5-6\\@m{width:83.31945%}.uk-width-small\\@m{width:150px}.uk-width-medium\\@m{width:300px}.uk-width-large\\@m{width:450px}.uk-width-xlarge\\@m{width:600px}.uk-width-xxlarge\\@m{width:750px}.uk-width-auto\\@m{width:auto}.uk-width-expand\\@m{flex:1;min-width:1px}}@media (min-width:1200px){.uk-width-1-1\\@l{width:100%}.uk-width-1-2\\@l{width:50%}.uk-width-1-3\\@l{width:33.32223%}.uk-width-2-3\\@l{width:66.64445%}.uk-width-1-4\\@l{width:25%}.uk-width-3-4\\@l{width:75%}.uk-width-1-5\\@l{width:20%}.uk-width-2-5\\@l{width:40%}.uk-width-3-5\\@l{width:60%}.uk-width-4-5\\@l{width:80%}.uk-width-1-6\\@l{width:16.66389%}.uk-width-5-6\\@l{width:83.31945%}.uk-width-small\\@l{width:150px}.uk-width-medium\\@l{width:300px}.uk-width-large\\@l{width:450px}.uk-width-xlarge\\@l{width:600px}.uk-width-xxlarge\\@l{width:750px}.uk-width-auto\\@l{width:auto}.uk-width-expand\\@l{flex:1;min-width:1px}}@media (min-width:1600px){.uk-width-1-1\\@xl{width:100%}.uk-width-1-2\\@xl{width:50%}.uk-width-1-3\\@xl{width:33.32223%}.uk-width-2-3\\@xl{width:66.64445%}.uk-width-1-4\\@xl{width:25%}.uk-width-3-4\\@xl{width:75%}.uk-width-1-5\\@xl{width:20%}.uk-width-2-5\\@xl{width:40%}.uk-width-3-5\\@xl{width:60%}.uk-width-4-5\\@xl{width:80%}.uk-width-1-6\\@xl{width:16.66389%}.uk-width-5-6\\@xl{width:83.31945%}.uk-width-small\\@xl{width:150px}.uk-width-medium\\@xl{width:300px}.uk-width-large\\@xl{width:450px}.uk-width-xlarge\\@xl{width:600px}.uk-width-xxlarge\\@xl{width:750px}.uk-width-auto\\@xl{width:auto}.uk-width-expand\\@xl{flex:1;min-width:1px}}[class*=uk-height]{box-sizing:border-box}.uk-height-1-1{height:100%}.uk-height-viewport{min-height:100vh}.uk-height-small{height:150px}.uk-height-medium{height:300px}.uk-height-large{height:450px}.uk-height-max-small{max-height:150px}.uk-height-max-medium{max-height:300px}.uk-height-max-large{max-height:450px}.uk-text-lead{font-size:1.5rem;line-height:1.5;color:#333}.uk-text-meta{font-size:.875rem;line-height:1.4;color:#999}.uk-text-small{font-size:.875rem;line-height:1.5}.uk-text-large{font-size:1.5rem;line-height:1.5}.uk-text-light{font-weight:300}.uk-text-normal{font-weight:400}.uk-text-bold{font-weight:700}.uk-text-lighter{font-weight:lighter}.uk-text-bolder{font-weight:bolder}.uk-text-italic{font-style:italic}.uk-text-capitalize{text-transform:capitalize!important}.uk-text-uppercase{text-transform:uppercase!important}.uk-text-lowercase{text-transform:lowercase!important}.uk-text-muted{color:#999!important}.uk-text-emphasis{color:#333!important}.uk-text-primary{color:#1e87f0!important}.uk-text-secondary{color:#222!important}.uk-text-success{color:#32d296!important}.uk-text-warning{color:#faa05a!important}.uk-text-danger{color:#f0506e!important}.uk-text-background{-webkit-background-clip:text;display:inline-block;color:#1e87f0!important}@supports (-webkit-background-clip:text){.uk-text-background{background-color:#1e87f0;color:transparent!important}}.uk-text-left{text-align:left!important}.uk-text-right{text-align:right!important}.uk-text-center{text-align:center!important}.uk-text-justify{text-align:justify!important}@media (min-width:640px){.uk-text-left\\@s{text-align:left!important}.uk-text-right\\@s{text-align:right!important}.uk-text-center\\@s{text-align:center!important}}@media (min-width:960px){.uk-text-left\\@m{text-align:left!important}.uk-text-right\\@m{text-align:right!important}.uk-text-center\\@m{text-align:center!important}}@media (min-width:1200px){.uk-text-left\\@l{text-align:left!important}.uk-text-right\\@l{text-align:right!important}.uk-text-center\\@l{text-align:center!important}}@media (min-width:1600px){.uk-text-left\\@xl{text-align:left!important}.uk-text-right\\@xl{text-align:right!important}.uk-text-center\\@xl{text-align:center!important}}.uk-text-top{vertical-align:top!important}.uk-text-middle{vertical-align:middle!important}.uk-text-bottom{vertical-align:bottom!important}.uk-text-baseline{vertical-align:baseline!important}.uk-text-nowrap,.uk-text-truncate{white-space:nowrap}.uk-text-truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis}td.uk-text-truncate,th.uk-text-truncate{max-width:0}.uk-text-break{overflow-wrap:break-word;word-wrap:break-word}td.uk-text-break,th.uk-text-break{word-break:break-all}[class*=uk-column-]{column-gap:30px}@media (min-width:1200px){[class*=uk-column-]{column-gap:40px}}[class*=uk-column-] img{transform:translateZ(0)}.uk-column-divider{column-rule:1px solid #e5e5e5;column-gap:60px}@media (min-width:1200px){.uk-column-divider{column-gap:80px}}.uk-column-1-2{column-count:2}.uk-column-1-3{column-count:3}.uk-column-1-4{column-count:4}.uk-column-1-5{column-count:5}.uk-column-1-6{column-count:6}@media (min-width:640px){.uk-column-1-2\\@s{column-count:2}.uk-column-1-3\\@s{column-count:3}.uk-column-1-4\\@s{column-count:4}.uk-column-1-5\\@s{column-count:5}.uk-column-1-6\\@s{column-count:6}}@media (min-width:960px){.uk-column-1-2\\@m{column-count:2}.uk-column-1-3\\@m{column-count:3}.uk-column-1-4\\@m{column-count:4}.uk-column-1-5\\@m{column-count:5}.uk-column-1-6\\@m{column-count:6}}@media (min-width:1200px){.uk-column-1-2\\@l{column-count:2}.uk-column-1-3\\@l{column-count:3}.uk-column-1-4\\@l{column-count:4}.uk-column-1-5\\@l{column-count:5}.uk-column-1-6\\@l{column-count:6}}@media (min-width:1600px){.uk-column-1-2\\@xl{column-count:2}.uk-column-1-3\\@xl{column-count:3}.uk-column-1-4\\@xl{column-count:4}.uk-column-1-5\\@xl{column-count:5}.uk-column-1-6\\@xl{column-count:6}}.uk-column-span{column-span:all}.uk-cover{max-width:none;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}iframe.uk-cover{pointer-events:none}.uk-cover-container{overflow:hidden;position:relative}.uk-background-default{background-color:#fff}.uk-background-muted{background-color:#f8f8f8}.uk-background-primary{background-color:#1e87f0}.uk-background-secondary{background-color:#222}.uk-background-contain,.uk-background-cover{background-position:50% 50%;background-repeat:no-repeat}.uk-background-cover{background-size:cover}.uk-background-contain{background-size:contain}.uk-background-top-left{background-position:0 0}.uk-background-top-center{background-position:50% 0}.uk-background-top-right{background-position:100% 0}.uk-background-center-left{background-position:0 50%}.uk-background-center-center{background-position:50% 50%}.uk-background-center-right{background-position:100% 50%}.uk-background-bottom-left{background-position:0 100%}.uk-background-bottom-center{background-position:50% 100%}.uk-background-bottom-right{background-position:100% 100%}.uk-background-norepeat{background-repeat:no-repeat}.uk-background-fixed{background-attachment:fixed;backface-visibility:hidden}@media (pointer:coarse){.uk-background-fixed{background-attachment:scroll}}@media (max-width:639px){.uk-background-image\\@s{background-image:none!important}}@media (max-width:959px){.uk-background-image\\@m{background-image:none!important}}@media (max-width:1199px){.uk-background-image\\@l{background-image:none!important}}@media (max-width:1599px){.uk-background-image\\@xl{background-image:none!important}}.uk-background-blend-multiply{background-blend-mode:multiply}.uk-background-blend-screen{background-blend-mode:screen}.uk-background-blend-overlay{background-blend-mode:overlay}.uk-background-blend-darken{background-blend-mode:darken}.uk-background-blend-lighten{background-blend-mode:lighten}.uk-background-blend-color-dodge{background-blend-mode:color-dodge}.uk-background-blend-color-burn{background-blend-mode:color-burn}.uk-background-blend-hard-light{background-blend-mode:hard-light}.uk-background-blend-soft-light{background-blend-mode:soft-light}.uk-background-blend-difference{background-blend-mode:difference}.uk-background-blend-exclusion{background-blend-mode:exclusion}.uk-background-blend-hue{background-blend-mode:hue}.uk-background-blend-saturation{background-blend-mode:saturation}.uk-background-blend-color{background-blend-mode:color}.uk-background-blend-luminosity{background-blend-mode:luminosity}[class*=uk-align]{display:block;margin-bottom:30px}*+[class*=uk-align]{margin-top:30px}.uk-align-center{margin-left:auto;margin-right:auto}.uk-align-left{margin-top:0;margin-right:30px;float:left}.uk-align-right{margin-top:0;margin-left:30px;float:right}@media (min-width:640px){.uk-align-left\\@s{margin-top:0;margin-right:30px;float:left}.uk-align-right\\@s{margin-top:0;margin-left:30px;float:right}}@media (min-width:960px){.uk-align-left\\@m{margin-top:0;margin-right:30px;float:left}.uk-align-right\\@m{margin-top:0;margin-left:30px;float:right}}@media (min-width:1200px){.uk-align-left\\@l{margin-top:0;float:left}.uk-align-right\\@l{margin-top:0;float:right}.uk-align-left,.uk-align-left\\@l,.uk-align-left\\@m,.uk-align-left\\@s{margin-right:40px}.uk-align-right,.uk-align-right\\@l,.uk-align-right\\@m,.uk-align-right\\@s{margin-left:40px}}@media (min-width:1600px){.uk-align-left\\@xl{margin-top:0;margin-right:40px;float:left}.uk-align-right\\@xl{margin-top:0;margin-left:40px;float:right}}.uk-svg,.uk-svg:not(.uk-preserve) [fill*=\"#\"]:not(.uk-preserve){fill:currentcolor}.uk-svg:not(.uk-preserve) [stroke*=\"#\"]:not(.uk-preserve){stroke:currentcolor}.uk-svg{transform:translate(0)}.uk-panel{position:relative;box-sizing:border-box}.uk-panel:after,.uk-panel:before{content:\"\";display:table}.uk-panel:after{clear:both}.uk-panel>:last-child{margin-bottom:0}.uk-panel-scrollable{height:170px;padding:10px;border:1px solid #e5e5e5;overflow:auto;-webkit-overflow-scrolling:touch;resize:both}.uk-clearfix:before{content:\"\";display:table-cell}.uk-clearfix:after{content:\"\";display:table;clear:both}.uk-float-left{float:left}.uk-float-right{float:right}[class*=uk-float-]{max-width:100%}.uk-overflow-hidden{overflow:hidden}.uk-overflow-auto{overflow:auto;-webkit-overflow-scrolling:touch}.uk-overflow-auto>:last-child{margin-bottom:0}.uk-resize{resize:both}.uk-resize-vertical{resize:vertical}.uk-display-block{display:block!important}.uk-display-inline{display:inline!important}.uk-display-inline-block{display:inline-block!important}[class*=uk-inline]{display:inline-block;position:relative;max-width:100%;vertical-align:middle;-webkit-backface-visibility:hidden}.uk-inline-clip{overflow:hidden}.uk-preserve-width,.uk-preserve-width canvas,.uk-preserve-width img,.uk-preserve-width svg,.uk-preserve-width video{max-width:none}.uk-responsive-height,.uk-responsive-width{box-sizing:border-box}.uk-responsive-width{max-width:100%!important;height:auto}.uk-responsive-height{max-height:100%;width:auto;max-width:none}.uk-border-circle{border-radius:50%}.uk-border-pill{border-radius:500px}.uk-border-rounded{border-radius:5px}.uk-inline-clip[class*=uk-border-]{-webkit-transform:translateZ(0)}.uk-box-shadow-small{box-shadow:0 2px 8px rgba(0,0,0,.08)}.uk-box-shadow-medium{box-shadow:0 5px 15px rgba(0,0,0,.08)}.uk-box-shadow-large{box-shadow:0 14px 25px rgba(0,0,0,.16)}.uk-box-shadow-xlarge{box-shadow:0 28px 50px rgba(0,0,0,.16)}[class*=uk-box-shadow-hover]{transition:box-shadow .1s ease-in-out}.uk-box-shadow-hover-small:hover{box-shadow:0 2px 8px rgba(0,0,0,.08)}.uk-box-shadow-hover-medium:hover{box-shadow:0 5px 15px rgba(0,0,0,.08)}.uk-box-shadow-hover-large:hover{box-shadow:0 14px 25px rgba(0,0,0,.16)}.uk-box-shadow-hover-xlarge:hover{box-shadow:0 28px 50px rgba(0,0,0,.16)}@supports (filter:blur(0)){.uk-box-shadow-bottom{display:inline-block;position:relative;max-width:100%;vertical-align:middle}.uk-box-shadow-bottom:before{content:\"\";position:absolute;bottom:-30px;left:0;right:0;height:30px;border-radius:100%;background:#444;filter:blur(20px)}.uk-box-shadow-bottom>*{position:relative}}.uk-dropcap:first-letter,.uk-dropcap>p:first-of-type:first-letter{display:block;margin-right:10px;float:left;font-size:4.5em;line-height:1}@-moz-document url-prefix(){.uk-dropcap:first-letter,.uk-dropcap>p:first-of-type:first-letter{margin-top:1.1%}}@supports (-ms-ime-align:auto){.uk-dropcap>p:first-of-type:first-letter{font-size:1em}}.uk-logo{font-size:1.5rem;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif;color:#666;text-decoration:none}.uk-logo:focus,.uk-logo:hover{color:#666;outline:none;text-decoration:none}.uk-logo-inverse{display:none}.uk-disabled{pointer-events:none}.uk-drag,.uk-drag *{cursor:move}.uk-drag iframe{pointer-events:none}.uk-dragover{box-shadow:0 0 20px hsla(0,0%,39%,.3)}.uk-blend-multiply{mix-blend-mode:multiply}.uk-blend-screen{mix-blend-mode:screen}.uk-blend-overlay{mix-blend-mode:overlay}.uk-blend-darken{mix-blend-mode:darken}.uk-blend-lighten{mix-blend-mode:lighten}.uk-blend-color-dodge{mix-blend-mode:color-dodge}.uk-blend-color-burn{mix-blend-mode:color-burn}.uk-blend-hard-light{mix-blend-mode:hard-light}.uk-blend-soft-light{mix-blend-mode:soft-light}.uk-blend-difference{mix-blend-mode:difference}.uk-blend-exclusion{mix-blend-mode:exclusion}.uk-blend-hue{mix-blend-mode:hue}.uk-blend-saturation{mix-blend-mode:saturation}.uk-blend-color{mix-blend-mode:color}.uk-blend-luminosity{mix-blend-mode:luminosity}.uk-transform-center{transform:translate(-50%,-50%)}.uk-transform-origin-top-left{transform-origin:0 0}.uk-transform-origin-top-center{transform-origin:50% 0}.uk-transform-origin-top-right{transform-origin:100% 0}.uk-transform-origin-center-left{transform-origin:0 50%}.uk-transform-origin-center-right{transform-origin:100% 50%}.uk-transform-origin-bottom-left{transform-origin:0 100%}.uk-transform-origin-bottom-center{transform-origin:50% 100%}.uk-transform-origin-bottom-right{transform-origin:100% 100%}.uk-flex{display:flex}.uk-flex-inline{display:inline-flex}.uk-flex-inline:after,.uk-flex-inline:before,.uk-flex:after,.uk-flex:before{display:none}.uk-flex-left{justify-content:flex-start}.uk-flex-center{justify-content:center}.uk-flex-right{justify-content:flex-end}.uk-flex-between{justify-content:space-between}.uk-flex-around{justify-content:space-around}@media (min-width:640px){.uk-flex-left\\@s{justify-content:flex-start}.uk-flex-center\\@s{justify-content:center}.uk-flex-right\\@s{justify-content:flex-end}.uk-flex-between\\@s{justify-content:space-between}.uk-flex-around\\@s{justify-content:space-around}}@media (min-width:960px){.uk-flex-left\\@m{justify-content:flex-start}.uk-flex-center\\@m{justify-content:center}.uk-flex-right\\@m{justify-content:flex-end}.uk-flex-between\\@m{justify-content:space-between}.uk-flex-around\\@m{justify-content:space-around}}@media (min-width:1200px){.uk-flex-left\\@l{justify-content:flex-start}.uk-flex-center\\@l{justify-content:center}.uk-flex-right\\@l{justify-content:flex-end}.uk-flex-between\\@l{justify-content:space-between}.uk-flex-around\\@l{justify-content:space-around}}@media (min-width:1600px){.uk-flex-left\\@xl{justify-content:flex-start}.uk-flex-center\\@xl{justify-content:center}.uk-flex-right\\@xl{justify-content:flex-end}.uk-flex-between\\@xl{justify-content:space-between}.uk-flex-around\\@xl{justify-content:space-around}}.uk-flex-stretch{align-items:stretch}.uk-flex-top{align-items:flex-start}.uk-flex-middle{align-items:center}.uk-flex-bottom{align-items:flex-end}.uk-flex-row{flex-direction:row}.uk-flex-row-reverse{flex-direction:row-reverse}.uk-flex-column{flex-direction:column}.uk-flex-column-reverse{flex-direction:column-reverse}.uk-flex-nowrap{flex-wrap:nowrap}.uk-flex-wrap{flex-wrap:wrap}.uk-flex-wrap-reverse{flex-wrap:wrap-reverse}.uk-flex-wrap-stretch{align-content:stretch}.uk-flex-wrap-top{align-content:flex-start}.uk-flex-wrap-middle{align-content:center}.uk-flex-wrap-bottom{align-content:flex-end}.uk-flex-wrap-between{align-content:space-between}.uk-flex-wrap-around{align-content:space-around}.uk-flex-first{order:-1}.uk-flex-last{order:99}@media (min-width:640px){.uk-flex-first\\@s{order:-1}.uk-flex-last\\@s{order:99}}@media (min-width:960px){.uk-flex-first\\@m{order:-1}.uk-flex-last\\@m{order:99}}@media (min-width:1200px){.uk-flex-first\\@l{order:-1}.uk-flex-last\\@l{order:99}}@media (min-width:1600px){.uk-flex-first\\@xl{order:-1}.uk-flex-last\\@xl{order:99}}.uk-flex-none{flex:none}.uk-flex-auto{flex:auto}.uk-flex-1{flex:1}.uk-margin{margin-bottom:20px}*+.uk-margin,.uk-margin-top{margin-top:20px!important}.uk-margin-bottom{margin-bottom:20px!important}.uk-margin-left{margin-left:20px!important}.uk-margin-right{margin-right:20px!important}.uk-margin-small{margin-bottom:10px}*+.uk-margin-small,.uk-margin-small-top{margin-top:10px!important}.uk-margin-small-bottom{margin-bottom:10px!important}.uk-margin-small-left{margin-left:10px!important}.uk-margin-small-right{margin-right:10px!important}.uk-margin-medium{margin-bottom:40px}*+.uk-margin-medium,.uk-margin-medium-top{margin-top:40px!important}.uk-margin-medium-bottom{margin-bottom:40px!important}.uk-margin-medium-left{margin-left:40px!important}.uk-margin-medium-right{margin-right:40px!important}.uk-margin-large{margin-bottom:40px}*+.uk-margin-large,.uk-margin-large-top{margin-top:40px!important}.uk-margin-large-bottom{margin-bottom:40px!important}.uk-margin-large-left{margin-left:40px!important}.uk-margin-large-right{margin-right:40px!important}@media (min-width:1200px){.uk-margin-large{margin-bottom:70px}*+.uk-margin-large,.uk-margin-large-top{margin-top:70px!important}.uk-margin-large-bottom{margin-bottom:70px!important}.uk-margin-large-left{margin-left:70px!important}.uk-margin-large-right{margin-right:70px!important}}.uk-margin-xlarge{margin-bottom:70px}*+.uk-margin-xlarge,.uk-margin-xlarge-top{margin-top:70px!important}.uk-margin-xlarge-bottom{margin-bottom:70px!important}.uk-margin-xlarge-left{margin-left:70px!important}.uk-margin-xlarge-right{margin-right:70px!important}@media (min-width:1200px){.uk-margin-xlarge{margin-bottom:140px}*+.uk-margin-xlarge,.uk-margin-xlarge-top{margin-top:140px!important}.uk-margin-xlarge-bottom{margin-bottom:140px!important}.uk-margin-xlarge-left{margin-left:140px!important}.uk-margin-xlarge-right{margin-right:140px!important}}.uk-margin-auto{margin-left:auto!important;margin-right:auto!important}.uk-margin-auto-top{margin-top:auto!important}.uk-margin-auto-bottom{margin-bottom:auto!important}.uk-margin-auto-left{margin-left:auto!important}.uk-margin-auto-right{margin-right:auto!important}.uk-margin-auto-vertical{margin-top:auto!important;margin-bottom:auto!important}@media (min-width:640px){.uk-margin-auto\\@s{margin-right:auto!important}.uk-margin-auto-left\\@s,.uk-margin-auto\\@s{margin-left:auto!important}.uk-margin-auto-right\\@s{margin-right:auto!important}}@media (min-width:960px){.uk-margin-auto\\@m{margin-right:auto!important}.uk-margin-auto-left\\@m,.uk-margin-auto\\@m{margin-left:auto!important}.uk-margin-auto-right\\@m{margin-right:auto!important}}@media (min-width:1200px){.uk-margin-auto\\@l{margin-right:auto!important}.uk-margin-auto-left\\@l,.uk-margin-auto\\@l{margin-left:auto!important}.uk-margin-auto-right\\@l{margin-right:auto!important}}@media (min-width:1600px){.uk-margin-auto\\@xl{margin-right:auto!important}.uk-margin-auto-left\\@xl,.uk-margin-auto\\@xl{margin-left:auto!important}.uk-margin-auto-right\\@xl{margin-right:auto!important}}.uk-margin-remove{margin:0!important}.uk-margin-remove-top{margin-top:0!important}.uk-margin-remove-bottom{margin-bottom:0!important}.uk-margin-remove-left{margin-left:0!important}.uk-margin-remove-right{margin-right:0!important}.uk-margin-remove-vertical{margin-top:0!important;margin-bottom:0!important}.uk-margin-remove-adjacent+*,.uk-margin-remove-first-child>:first-child{margin-top:0!important}.uk-margin-remove-last-child>:last-child{margin-bottom:0!important}@media (min-width:640px){.uk-margin-remove-left\\@s{margin-left:0!important}.uk-margin-remove-right\\@s{margin-right:0!important}}@media (min-width:960px){.uk-margin-remove-left\\@m{margin-left:0!important}.uk-margin-remove-right\\@m{margin-right:0!important}}@media (min-width:1200px){.uk-margin-remove-left\\@l{margin-left:0!important}.uk-margin-remove-right\\@l{margin-right:0!important}}@media (min-width:1600px){.uk-margin-remove-left\\@xl{margin-left:0!important}.uk-margin-remove-right\\@xl{margin-right:0!important}}.uk-padding{padding:30px}@media (min-width:1200px){.uk-padding{padding:40px}}.uk-padding-small{padding:15px}.uk-padding-large{padding:30px}@media (min-width:1200px){.uk-padding-large{padding:70px}}.uk-padding-remove{padding:0!important}.uk-padding-remove-top{padding-top:0!important}.uk-padding-remove-bottom{padding-bottom:0!important}.uk-padding-remove-left{padding-left:0!important}.uk-padding-remove-right{padding-right:0!important}.uk-padding-remove-vertical{padding-top:0!important;padding-bottom:0!important}.uk-padding-remove-horizontal{padding-left:0!important;padding-right:0!important}[class*=uk-position-bottom],[class*=uk-position-center],[class*=uk-position-left],[class*=uk-position-right],[class*=uk-position-top]{position:absolute!important;max-width:100%}.uk-position-top{top:0;left:0;right:0}.uk-position-bottom{bottom:0;left:0;right:0}.uk-position-left{top:0;bottom:0;left:0}.uk-position-right{top:0;bottom:0;right:0}.uk-position-top-left{top:0;left:0}.uk-position-top-right{top:0;right:0}.uk-position-bottom-left{bottom:0;left:0}.uk-position-bottom-right{bottom:0;right:0}.uk-position-center{top:50%;left:50%;transform:translate(-50%,-50%);width:max-content;max-width:100%;box-sizing:border-box}[class*=uk-position-center-left],[class*=uk-position-center-right]{top:50%;transform:translateY(-50%)}.uk-position-center-left{left:0}.uk-position-center-right{right:0}.uk-position-center-left-out{right:100%;width:max-content}.uk-position-center-right-out{left:100%;width:max-content}.uk-position-bottom-center,.uk-position-top-center{left:50%;transform:translateX(-50%);width:max-content;max-width:100%;box-sizing:border-box}.uk-position-top-center{top:0}.uk-position-bottom-center{bottom:0}.uk-position-cover{position:absolute;top:0;bottom:0;left:0;right:0}.uk-position-relative{position:relative!important}.uk-position-absolute{position:absolute!important}.uk-position-fixed{position:fixed!important}.uk-position-z-index{z-index:1}.uk-position-small{max-width:calc(100% - 30px);margin:15px}.uk-position-small.uk-position-center{transform:translate(-50%,-50%) translate(-15px,-15px)}.uk-position-small[class*=uk-position-center-left],.uk-position-small[class*=uk-position-center-right]{transform:translateY(-50%) translateY(-15px)}.uk-position-small.uk-position-bottom-center,.uk-position-small.uk-position-top-center{transform:translateX(-50%) translateX(-15px)}.uk-position-medium{max-width:calc(100% - 60px);margin:30px}.uk-position-medium.uk-position-center{transform:translate(-50%,-50%) translate(-30px,-30px)}.uk-position-medium[class*=uk-position-center-left],.uk-position-medium[class*=uk-position-center-right]{transform:translateY(-50%) translateY(-30px)}.uk-position-medium.uk-position-bottom-center,.uk-position-medium.uk-position-top-center{transform:translateX(-50%) translateX(-30px)}.uk-position-large{max-width:calc(100% - 60px);margin:30px}.uk-position-large.uk-position-center{transform:translate(-50%,-50%) translate(-30px,-30px)}.uk-position-large[class*=uk-position-center-left],.uk-position-large[class*=uk-position-center-right]{transform:translateY(-50%) translateY(-30px)}.uk-position-large.uk-position-bottom-center,.uk-position-large.uk-position-top-center{transform:translateX(-50%) translateX(-30px)}@media (min-width:1200px){.uk-position-large{max-width:calc(100% - 100px);margin:50px}.uk-position-large.uk-position-center{transform:translate(-50%,-50%) translate(-50px,-50px)}.uk-position-large[class*=uk-position-center-left],.uk-position-large[class*=uk-position-center-right]{transform:translateY(-50%) translateY(-50px)}.uk-position-large.uk-position-bottom-center,.uk-position-large.uk-position-top-center{transform:translateX(-50%) translateX(-50px)}}.uk-transition-toggle{-webkit-tap-highlight-color:transparent}.uk-transition-toggle:focus{outline:none}.uk-transition-fade,[class*=uk-transition-scale],[class*=uk-transition-slide]{transition:.3s ease-out;transition-property:opacity,transform,filter;opacity:0}.uk-transition-active.uk-active .uk-transition-fade,.uk-transition-toggle:focus .uk-transition-fade,.uk-transition-toggle:hover .uk-transition-fade{opacity:1}.uk-transition-scale-up{transform:scale(1)}.uk-transition-scale-down{transform:scale(1.1)}.uk-transition-active.uk-active .uk-transition-scale-up,.uk-transition-toggle:focus .uk-transition-scale-up,.uk-transition-toggle:hover .uk-transition-scale-up{opacity:1;transform:scale(1.1)}.uk-transition-active.uk-active .uk-transition-scale-down,.uk-transition-toggle:focus .uk-transition-scale-down,.uk-transition-toggle:hover .uk-transition-scale-down{opacity:1;transform:scale(1)}.uk-transition-slide-top{transform:translateY(-100%)}.uk-transition-slide-bottom{transform:translateY(100%)}.uk-transition-slide-left{transform:translateX(-100%)}.uk-transition-slide-right{transform:translateX(100%)}.uk-transition-slide-top-small{transform:translateY(-10px)}.uk-transition-slide-bottom-small{transform:translateY(10px)}.uk-transition-slide-left-small{transform:translateX(-10px)}.uk-transition-slide-right-small{transform:translateX(10px)}.uk-transition-slide-top-medium{transform:translateY(-50px)}.uk-transition-slide-bottom-medium{transform:translateY(50px)}.uk-transition-slide-left-medium{transform:translateX(-50px)}.uk-transition-slide-right-medium{transform:translateX(50px)}.uk-transition-active.uk-active [class*=uk-transition-slide],.uk-transition-toggle:focus [class*=uk-transition-slide],.uk-transition-toggle:hover [class*=uk-transition-slide]{opacity:1;transform:translate(0)}.uk-transition-opaque{opacity:1}.uk-transition-slow{transition-duration:.7s}.uk-hidden,[hidden]{display:none!important}@media (min-width:640px){.uk-hidden\\@s{display:none!important}}@media (min-width:960px){.uk-hidden\\@m{display:none!important}}@media (min-width:1200px){.uk-hidden\\@l{display:none!important}}@media (min-width:1600px){.uk-hidden\\@xl{display:none!important}}@media (max-width:639px){.uk-visible\\@s{display:none!important}}@media (max-width:959px){.uk-visible\\@m{display:none!important}}@media (max-width:1199px){.uk-visible\\@l{display:none!important}}@media (max-width:1599px){.uk-visible\\@xl{display:none!important}}.uk-invisible{visibility:hidden!important}.uk-visible-toggle:not(:hover):not(:focus) .uk-hidden-hover:not(:focus-within){position:absolute!important;width:0!important;height:0!important;padding:0!important;margin:0!important;overflow:hidden!important}.uk-visible-toggle:not(:hover):not(:focus) .uk-invisible-hover:not(:focus-within){opacity:0!important}.uk-visible-toggle{-webkit-tap-highlight-color:transparent}.uk-visible-toggle:focus{outline:none}@media (pointer:coarse){.uk-hidden-touch{display:none!important}}.uk-hidden-notouch{display:none!important}@media (pointer:coarse){.uk-hidden-notouch{display:block!important}}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}@page{margin:.5cm}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: 'app',
    components: {},
    mounted: function mounted() {}
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('nav',{staticClass:"uk-navbar-container",attrs:{"uk-navbar":""}},[_c('div',{staticClass:"uk-navbar-left"},[_c('ul',{staticClass:"uk-navbar-nav"},[_c('li',{staticClass:"uk-active"},[_c('router-link',{attrs:{"to":{name:'home'},"href":"#"}},[_vm._v("Home")])],1),_vm._v(" "),_c('li',{staticClass:"uk-active"},[_c('router-link',{attrs:{"to":{name:'fullscreen'},"href":"#"}},[_vm._v("FullScreen")])],1)])]),_vm._v(" "),_c('div',{staticClass:"uk-navbar-right"})]),_vm._v(" "),_c('router-view')],1)}
__vue__options__.staticRenderFns = []

});

;require.register("components/matrix.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".matrix.fullscreen,.matrix.fullscreen canvas{width:100vw;height:100vh}")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uikit = require('uikit');

var _uikit2 = _interopRequireDefault(_uikit);

var _gameoflife = require('../../gameOfLife/gameoflife');

var _gameoflife2 = _interopRequireDefault(_gameoflife);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'matrix',
    props: {
        fullscreen: { type: Boolean, required: false, default: false },
        showControls: { type: Boolean, required: false, default: false },
        autostart: { type: Boolean, required: false, default: false },
        visual: { type: Boolean, required: false, default: true }
    },
    components: {},
    computed: {
        style: function style() {
            return {
                width: this.width + 'px',
                height: this.height + 'px'
            };
        }
    },
    watch: {
        'speed': function speed() {
            this.GOL.setSpeed(this.speed);
        }
    },
    data: function data() {
        return {
            id: null,
            cellsize: 10,
            width: 300,
            height: 300,
            speed: 10,
            GOL: null
        };
    },

    methods: {
        start: function start() {
            this.GOL.start();
        },
        stop: function stop() {
            this.GOL.stop();
        },
        initView: function initView() {
            var cf = {
                elementId: this.id,
                visual: this.visual,
                autostart: this.autostart,
                width: this.width,
                height: this.height,
                cellsize: this.cellsize
            };

            this.GOL = _gameoflife2.default.init(cf);
            this.GOL.awakeRandomCells();
            this.GOL.onTick(function (tick) {
                console.log('TICK', tick);
            });
            this.GOL.start();

            window.GOL = this.GOL;
        }
    },
    mounted: function mounted() {
        this.id = _lodash2.default.uniqueId('can');

        if (this.fullscreen) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }
        this.initView();
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"matrix",class:{'fullscreen':_vm.fullscreen}},[_c('canvas',{style:(_vm.style),attrs:{"id":_vm.id,"width":_vm.width,"height":_vm.height}}),_vm._v(" "),(_vm.showControls)?[_c('ul',{staticClass:"uk-list"},[(_vm.matrix)?_c('li',[_c('label',[_vm._v("Cells Alive "+_vm._s(_vm.matrix.alive()))]),_vm._v(" "),_c('label',[_vm._v("Cells Dead "+_vm._s(_vm.matrix.dead()))]),_vm._v(" "),_c('label',[_vm._v("Activity "+_vm._s(_vm.GOL.activity()))])]):_vm._e(),_vm._v(" "),_c('li',[_c('label',[_vm._v("Speed "+_vm._s(_vm.speed))]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.speed),expression:"speed"}],attrs:{"type":"range","min":"1","max":"100"},domProps:{"value":(_vm.speed)},on:{"__r":function($event){_vm.speed=$event.target.value}}})]),_vm._v(" "),_c('li',[_c('label',[_vm._v("Width "),_c('span',[_vm._v(_vm._s(_vm.width))])]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.width),expression:"width"}],attrs:{"type":"range","min":"30","max":"500"},domProps:{"value":(_vm.width)},on:{"__r":function($event){_vm.width=$event.target.value}}})]),_vm._v(" "),_c('li',[_c('label',[_vm._v("Height "),_c('span',[_vm._v(_vm._s(_vm.height))])]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.height),expression:"height"}],attrs:{"type":"range","min":"30","max":"500"},domProps:{"value":(_vm.height)},on:{"__r":function($event){_vm.height=$event.target.value}}})])]),_vm._v(" "),_c('vk-button',{on:{"click":_vm.initView}},[_vm._v("initView")]),_vm._v(" "),_c('vk-button',{on:{"click":_vm.start}},[_vm._v("Start")]),_vm._v(" "),_c('vk-button',{on:{"click":_vm.stop}},[_vm._v("Stop")])]:_vm._e()],2)}
__vue__options__.staticRenderFns = []

});

;require.register("dev.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _matrix = require("../gameOfLife/matrix");

var _matrix2 = _interopRequireDefault(_matrix);

var _gameoflife = require("../gameOfLife/gameoflife");

var _gameoflife2 = _interopRequireDefault(_gameoflife);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEV = {
    init: function init() {}
};

DEV.init();
window.M = _matrix2.default;
window.DEV = DEV;
exports.default = DEV;

});

require.register("main.js", function(exports, require, module) {
'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _router = require('./service/router');

var _router2 = _interopRequireDefault(_router);

require('vueify/lib/insert-css');

var _store = require('./service/store');

var _store2 = _interopRequireDefault(_store);

var _vuikit = require('vuikit');

var _vuikit2 = _interopRequireDefault(_vuikit);

var _icons = require('@vuikit/icons');

var _icons2 = _interopRequireDefault(_icons);

var _dev = require('./dev');

var _dev2 = _interopRequireDefault(_dev);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import '@vuikit/theme'

// required for .vue file <style> tags
_vue2.default.use(_vuikit2.default);
_vue2.default.use(_icons2.default);

_vue2.default.config.productionTip = false;

/* eslint-disable no-new */
new _vue2.default({
    store: _store2.default,
    el: '#app',
    router: _router2.default,
    render: function render(h) {
        return h(_App2.default);
    }
});

});

require.register("pages/Fullscreen.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".bg-screen{position:absolute;z-index:-1;top:0;left:0;bottom:0;right:0}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require("../service/utils");

var _utils2 = _interopRequireDefault(_utils);

var _matrix = require("../components/matrix");

var _matrix2 = _interopRequireDefault(_matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'front',
    components: { Matrix: _matrix2.default }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"bg-screen"},[_c('matrix',{attrs:{"fullscreen":true,"autostart":true}})],1),_vm._v(" "),_c('div',[_vm._v("\n        Content\n    ")])])}
__vue__options__.staticRenderFns = []

});

;require.register("pages/Home.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uikit = require('uikit');

var _uikit2 = _interopRequireDefault(_uikit);

var _utils = require('../service/utils');

var _utils2 = _interopRequireDefault(_utils);

var _matrix = require('../../gameOfLife/matrix');

var _matrix2 = _interopRequireDefault(_matrix);

var _matrix3 = require('../components/matrix');

var _matrix4 = _interopRequireDefault(_matrix3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'home',
    components: { Matrix: _matrix4.default },
    mounted: function mounted() {
        var ma = _matrix2.default.init(5, 5);

        console.log(ma);
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-flex uk-flex-row"},[_c('matrix',{attrs:{"show-controls":true,"visual":true}})],1)}
__vue__options__.staticRenderFns = []

});

;require.register("pages/user/Detail.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uikit = require('uikit');

var _uikit2 = _interopRequireDefault(_uikit);

var _utils = require('../../service/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'user',
    components: {},
    computed: {
        user: function user() {
            var _this = this;

            return this.$store.state.users.find(function (it) {
                return it.id === _this.$route.params.id;
            });
        }
    },
    methods: {}
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h1',[_vm._v("User Detail")]),_vm._v("\n\n    "+_vm._s(_vm.user)+"\n")])}
__vue__options__.staticRenderFns = []

});

;require.register("pages/user/Overview.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uikit = require('uikit');

var _uikit2 = _interopRequireDefault(_uikit);

var _utils = require('../../service/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'user',
    components: {},
    computed: {},
    methods: {
        userDetail: function userDetail(id) {
            this.$router.push({ name: 'user-detail', params: { id: id } });
        }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h1',[_vm._v("User Overview")]),_vm._v(" "),_c('ul',{staticClass:"uk-list-divider uk-list"},_vm._l((_vm.$store.state.users),function(user){return _c('li',{on:{"click":function($event){return _vm.userDetail(user.id)}}},[_vm._v("\n            "+_vm._s(user.id)+" - "+_vm._s(user.name)+"\n        ")])}),0)])}
__vue__options__.staticRenderFns = []

});

;require.register("service/router.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Home = require('../pages/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Fullscreen = require('../pages/Fullscreen');

var _Fullscreen2 = _interopRequireDefault(_Fullscreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
    routes: [{ path: '/', name: 'home', component: _Home2.default }, { path: '/fullscreen', name: 'fullscreen', component: _Fullscreen2.default }]
});

});

require.register("service/store.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var store = new _vuex2.default.Store({
    state: {},
    mutations: {}
});

exports.default = store;

});

require.register("service/utils.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};

});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

