/**
 * @name JSON Editor
 * @description JSON Schema Based Editor
 * This library is the continuation of jdorn's great work (see also https://github.com/jdorn/json-editor/issues/800)
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
