#!/usr/bin/env node
"use strict";
/**
 * @fileoverview A meta-TS generation tool which can replace a haphazard and
 * hardcoded code-generation process. 🎩
 * @version 1.0.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// This is meant to be executed on the command line.
// $ ./node_modules/.bin/tsc gents.ts
// $ node gents.js /path/to/folder # Compile to JS first!
var child_process_1 = require("child_process");
var fs = require("fs");
var path = require("path");
function getAllFilesWithExtension(dir, extension, files, curr) {
    if (dir === void 0) { dir = '.'; }
    if (fs.lstatSync(dir).isFile()) {
        return [dir];
    }
    var fileList = files || fs.readdirSync(dir); // Read from workspace
    var result = curr || [];
    for (var _i = 0, fileList_1 = fileList; _i < fileList_1.length; _i++) {
        var f = fileList_1[_i];
        var filepath = path.join(dir, f);
        try {
            if (fs.statSync(filepath).isDirectory()) {
                result = getAllFilesWithExtension(dir, extension, fs.readdirSync(filepath), result);
            }
            else if (f.endsWith(extension)) {
                result.push(filepath);
            }
        }
        catch (e) { /* Cannot handle file */ }
    }
    return result;
}
function cmd(command) {
    return new Promise(function (res, rej) {
        (0, child_process_1.exec)(command, function (err, stdout, stderr) {
            if (stdout) {
                console.info('    OK');
                res(1);
                return;
            }
            if (err) {
                console.log("error: ".concat(err.message));
                rej(stderr);
                return;
            }
            if (stderr) {
                console.log("stderr: ".concat(stderr));
                rej(stderr);
                return;
            }
            console.info('    OK');
            res(2);
        });
    });
}
// Main
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var gentsFiles, _i, gentsFiles_1, gents, newFile, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gentsFiles = getAllFilesWithExtension(process.argv[2], '.gents');
                _i = 0, gentsFiles_1 = gentsFiles;
                _a.label = 1;
            case 1:
                if (!(_i < gentsFiles_1.length)) return [3 /*break*/, 6];
                gents = gentsFiles_1[_i];
                newFile = gents.replace('.gents', '.ts');
                console.log('Generate', gents, 'as', newFile);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, cmd("node ".concat(gents, " > ").concat(newFile))];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); })();
