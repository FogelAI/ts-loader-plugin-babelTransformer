"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.babelTransformer = babelTransformer;
var ts = require("typescript");
var babel = require("@babel/core");
function babelTransformer(options) {
    return function (context) {
        return function (sourceFile) {
            var tsCode = sourceFile.getFullText();
            var result = babel.transformSync(tsCode, __assign({ filename: sourceFile.fileName, plugins: options.babelPlugins }, options.babelOptions));
            if (result && result.code) {
                var newSourceFile = ts.createSourceFile(sourceFile.fileName, result.code, sourceFile.languageVersion, true, ts.ScriptKind.JS);
                return newSourceFile;
            }
            return sourceFile;
        };
    };
}
exports.default = babelTransformer;
