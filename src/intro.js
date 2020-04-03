/**
 * @name JSON Editor
 * @description JSON Schema Based Editor
 * Deprecation notice
 * This repo is no longer maintained (see also https://github.com/jdorn/json-editor/issues/800)
 * Development is continued at https://github.com/json-editor/json-editor
 * For details please visit https://github.com/json-editor/json-editor/issues/5
 * @version {{ VERSION }}
 * @author Jeremy Dorn
 * @see https://github.com/jdorn/json-editor/
 * @see https://github.com/json-editor/json-editor
 * @license MIT
 * @example see README.md and docs/ for requirements, examples and usage info
 */

// (function() {
// 2020/4/2 添加 ↓
;(function(global,factory){
  "use strict";
  if (typeof module === "object" && module != null && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    global.JSONEditor=factory(global.jQuery);
  }
}(this,function(jQuery) {
// 2020/4/2 添加  ↑
// intro.js ↑
