// intro.js ↓
/*! JSON Editor v0.7.28 - JSON Schema -> HTML Editor
 * By Jeremy Dorn - https://github.com/jdorn/json-editor/
 * Released under the MIT license
 *
 * Date: 2016-08-07
 */

/**
 * See README.md for requirements and usage info
 */

// (function() {
// 2020/4/2 添加 ↓
(function(root,factory){
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        root.JSONEditor=factory(root.jQuery);
    }
}(this,function(jQuery) {
// 2020/4/2 添加  ↑
// intro.js ↑
