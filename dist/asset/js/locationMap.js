/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileOverview 配置
 * @author 吴钦飞（wuqinfei@qq.com）
 */

var jQuery = __webpack_require__(0);

var Config = {

    isInit: true,

    /** 人员信息列表 - URL */
    personInfoListUrl: "",
    /** 人员信息列表 - 集合 */
    _personInfoDic: {
        // "56789": { "id": "56789", "name": "吴钦飞", "type": "ordinary_man" },
    },
    /** 人员信息列表 - 处理服务器响应，将其处理成上述格式 */
    handlePersonInfoResponse: null, // 见底部代码

    typeColor: {
        police_man: { text: 0xffffff, background: 0x45a9db, border: 0x1d98d7 },
        police_woman: { text: 0xffffff, background: 0x45a9db, border: 0x1d98d7 },
        suspect_man: { text: 0xffffff, background: 0xea9439, border: 0xe97e0f },
        suspect_woman: { text: 0xffffff, background: 0xea9439, border: 0xe97e0f },
        ordinary_man: { text: 0xffffff, background: 0x999491, border: 0x827d7b },
        ordinary_woman: { text: 0xffffff, background: 0x999491, border: 0x827d7b }
    },

    /** 颜色列表 */
    _colorList: ["#7eb8f2", "#98689a", "#0099cb", "#ff6764", "#ff9a66", "#cd9967", "#666666", "#99ce66", "#cc3431", "#013565", "#993331", "#653567", "#0067cc", "#cc032f", "#346633", "#993331", "#013300", "#323499", "#003499", "#029b63", "#fe9b00"]
};

/**
 * @description 获取人员信息列表
 * @param doneCallback {Function?}
 * @param failCallback {Function?}
 * @public
 * @deprecated
 */
Config.getPersonInfoList = function (doneCallback, failCallback) {
    var _this = this;
    jQuery.ajax({
        url: this.personInfoListUrl,
        method: "GET",
        cache: false,
        dataType: "json"
    }).done(function (responseData) {
        var data;
        if (responseData && responseData.success === true) {
            data = responseData.data;
            if (jQuery.isFunction(Config.handlePersonInfoResponse)) {
                data = Config.handlePersonInfoResponse(data);
            }
            _this._personInfoDic = data;
            doneCallback && doneCallback();
        } else {
            throw "获取人员信息列表 失败！";
        }
    }).fail(function () {
        console.error("获取人员信息列表 失败！");
        failCallback && failCallback();
    });
};

/**
 * @description 获取人员信息列表
 * @param callback {Function}
 * @param isSync {Boolean?} 是否同步
 * @public
 */
Config.requestPersonInfoList = Config.getPersonInfoList;

/**
 * @description 根据id获取人员名称
 * @param id {String}
 * @return {String}
 * @public
 */
Config.getNameById = function (id) {
    var name = this.getPersonInfoById(id).name;

    if (name === undefined) {
        console.warn("未获取到【" + id + "】对应的名称..");
        name = id;
    }

    return name;
};

/**
 * @description 根据id获取人员信息
 * @param id {String}
 * @return { {id:String, name: String, type: String} }
 * @public
 */
Config.getPersonInfoById = function (id) {
    return this._personInfoDic[id] || {
        id: id,
        name: id,
        type: "ordinary_man"
    };
};

/**
 * @description 获取颜色
 * @param type { string? }
 * @return {{ text: number, background: number, border: number }}
 * @public
 */
Config.getColor = function (type) {
    type = type || "ordinary_man";
    return this.typeColor[type];
};

/**
 * @description 对CAD坐标进行转换
 *      x = ( x_cad - 31743.286666666667 ) / 5.055851851851852
 *      y = -( y_cad - ( -30955.181818181816 ) ) / 5.033884297520661
 * @param pos { {x: number, y: number} }
 */
Config.convertPosition = function (pos) {
    var cad_x = pos.x,
        cad_y = pos.y;

    return {
        x: (cad_x - 31743.286666666667) / 5.055851851851852,
        y: -(cad_y - -30955.181818181816) / 5.033884297520661
    };
};

/**
 * @description 将服务器返回的数据转换成需要的数据
 * @example
 *      将 “data/personInfoListData.json” 转换成 “data/personInfoListData_fmt.json”
 * @param personInfoDic
 */
Config.handlePersonInfoResponse = function (personInfoDic) {
    var i,
        len,
        tagId,
        personInfo,
        personInfoDicTemp,
        fmtPersonInfo,
        type,
        objtype,
        peopleSex,
        fmtPersonInfoDic = {};

    // 如果是数组，则将其进行转换
    if (jQuery.isArray(personInfoDic)) {
        personInfoDicTemp = {};
        for (i = 0, len = personInfoDic.length; i < len; i++) {
            personInfo = personInfoDic[i];
            tagId = personInfo.tagId;
            personInfoDicTemp[tagId] = personInfo;
        }
        personInfoDic = personInfoDicTemp;
    }

    for (tagId in personInfoDic) {
        if (!personInfoDic.hasOwnProperty(tagId)) {
            continue;
        }
        personInfo = personInfoDic[tagId];

        objtype = personInfo.objtype || "unknown";
        peopleSex = personInfo.peopleSex;

        // 1010：办案民警，1020：办案协警
        // 2010：嫌疑人
        // 2020：律师，2030：监护人，9000：其他人员
        if (objtype.indexOf("1010") !== -1) {
            type = "police_";
        } else if (objtype.indexOf("1020") !== -1) {
            type = "police_";
        } else if (objtype.indexOf("2010") !== -1) {
            type = "suspect_";
        } else if (objtype.indexOf("2020") !== -1) {
            type = "ordinary_";
        } else if (objtype.indexOf("2030") !== -1) {
            type = "ordinary_";
        } else if (objtype.indexOf("9000") !== -1) {
            type = "ordinary_";
        } else {
            type = "ordinary_";
            console.warn(JSON.stringify(personInfo) + " unknown type.");
        }

        if (peopleSex === "2" || peopleSex === 2) {
            type += "woman";
        } else {
            type += "man";
        }

        fmtPersonInfo = {
            id: tagId,
            name: personInfo.peopleName || tagId,
            type: type
        };

        fmtPersonInfoDic[tagId] = fmtPersonInfo;
    }

    return fmtPersonInfoDic;
};

module.exports = Config;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (a) {
  if ("object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = a();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
    var b;b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.PIXI = a();
  }
}(function () {
  var a;return function a(b, c, d) {
    function e(g, h) {
      if (!c[g]) {
        if (!b[g]) {
          var i = "function" == typeof require && require;if (!h && i) return require(g, !0);if (f) return f(g, !0);var j = new Error("Cannot find module '" + g + "'");throw j.code = "MODULE_NOT_FOUND", j;
        }var k = c[g] = { exports: {} };b[g][0].call(k.exports, function (a) {
          var c = b[g][1][a];return e(c ? c : a);
        }, k, k.exports, a, b, c, d);
      }return c[g].exports;
    }for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) {
      e(d[g]);
    }return e;
  }({ 1: [function (a, b, c) {
      "use strict";"use restrict";
      function d(a) {
        var b = 32;return a &= -a, a && b--, 65535 & a && (b -= 16), 16711935 & a && (b -= 8), 252645135 & a && (b -= 4), 858993459 & a && (b -= 2), 1431655765 & a && (b -= 1), b;
      }var e = 32;c.INT_BITS = e, c.INT_MAX = 2147483647, c.INT_MIN = -1 << e - 1, c.sign = function (a) {
        return (a > 0) - (a < 0);
      }, c.abs = function (a) {
        var b = a >> e - 1;return (a ^ b) - b;
      }, c.min = function (a, b) {
        return b ^ (a ^ b) & -(a < b);
      }, c.max = function (a, b) {
        return a ^ (a ^ b) & -(a < b);
      }, c.isPow2 = function (a) {
        return !(a & a - 1 || !a);
      }, c.log2 = function (a) {
        var b, c;return b = (a > 65535) << 4, a >>>= b, c = (a > 255) << 3, a >>>= c, b |= c, c = (a > 15) << 2, a >>>= c, b |= c, c = (a > 3) << 1, a >>>= c, b |= c, b | a >> 1;
      }, c.log10 = function (a) {
        return a >= 1e9 ? 9 : a >= 1e8 ? 8 : a >= 1e7 ? 7 : a >= 1e6 ? 6 : a >= 1e5 ? 5 : a >= 1e4 ? 4 : a >= 1e3 ? 3 : a >= 100 ? 2 : a >= 10 ? 1 : 0;
      }, c.popCount = function (a) {
        return a -= a >>> 1 & 1431655765, a = (858993459 & a) + (a >>> 2 & 858993459), 16843009 * (a + (a >>> 4) & 252645135) >>> 24;
      }, c.countTrailingZeros = d, c.nextPow2 = function (a) {
        return a += 0 === a, --a, a |= a >>> 1, a |= a >>> 2, a |= a >>> 4, a |= a >>> 8, a |= a >>> 16, a + 1;
      }, c.prevPow2 = function (a) {
        return a |= a >>> 1, a |= a >>> 2, a |= a >>> 4, a |= a >>> 8, a |= a >>> 16, a - (a >>> 1);
      }, c.parity = function (a) {
        return a ^= a >>> 16, a ^= a >>> 8, a ^= a >>> 4, a &= 15, 27030 >>> a & 1;
      };var f = new Array(256);!function (a) {
        for (var b = 0; b < 256; ++b) {
          var c = b,
              d = b,
              e = 7;for (c >>>= 1; c; c >>>= 1) {
            d <<= 1, d |= 1 & c, --e;
          }a[b] = d << e & 255;
        }
      }(f), c.reverse = function (a) {
        return f[255 & a] << 24 | f[a >>> 8 & 255] << 16 | f[a >>> 16 & 255] << 8 | f[a >>> 24 & 255];
      }, c.interleave2 = function (a, b) {
        return a &= 65535, a = 16711935 & (a | a << 8), a = 252645135 & (a | a << 4), a = 858993459 & (a | a << 2), a = 1431655765 & (a | a << 1), b &= 65535, b = 16711935 & (b | b << 8), b = 252645135 & (b | b << 4), b = 858993459 & (b | b << 2), b = 1431655765 & (b | b << 1), a | b << 1;
      }, c.deinterleave2 = function (a, b) {
        return a = a >>> b & 1431655765, a = 858993459 & (a | a >>> 1), a = 252645135 & (a | a >>> 2), a = 16711935 & (a | a >>> 4), a = 65535 & (a | a >>> 16), a << 16 >> 16;
      }, c.interleave3 = function (a, b, c) {
        return a &= 1023, a = 4278190335 & (a | a << 16), a = 251719695 & (a | a << 8), a = 3272356035 & (a | a << 4), a = 1227133513 & (a | a << 2), b &= 1023, b = 4278190335 & (b | b << 16), b = 251719695 & (b | b << 8), b = 3272356035 & (b | b << 4), b = 1227133513 & (b | b << 2), a |= b << 1, c &= 1023, c = 4278190335 & (c | c << 16), c = 251719695 & (c | c << 8), c = 3272356035 & (c | c << 4), c = 1227133513 & (c | c << 2), a | c << 2;
      }, c.deinterleave3 = function (a, b) {
        return a = a >>> b & 1227133513, a = 3272356035 & (a | a >>> 2), a = 251719695 & (a | a >>> 4), a = 4278190335 & (a | a >>> 8), a = 1023 & (a | a >>> 16), a << 22 >> 22;
      }, c.nextCombination = function (a) {
        var b = a | a - 1;return b + 1 | (~b & -~b) - 1 >>> d(a) + 1;
      };
    }, {}], 2: [function (a, b, c) {
      "use strict";
      function d(a, b, c) {
        c = c || 2;var d = b && b.length,
            f = d ? b[0] * c : a.length,
            h = e(a, 0, f, c, !0),
            i = [];if (!h) return i;var j, k, m, n, o, p, q;if (d && (h = l(a, b, h, c)), a.length > 80 * c) {
          j = m = a[0], k = n = a[1];for (var r = c; r < f; r += c) {
            o = a[r], p = a[r + 1], o < j && (j = o), p < k && (k = p), o > m && (m = o), p > n && (n = p);
          }q = Math.max(m - j, n - k), q = 0 !== q ? 1 / q : 0;
        }return g(h, i, c, j, k, q), i;
      }function e(a, b, c, d, e) {
        var f, g;if (e === F(a, b, c, d) > 0) for (f = b; f < c; f += d) {
          g = C(f, a[f], a[f + 1], g);
        } else for (f = c - d; f >= b; f -= d) {
          g = C(f, a[f], a[f + 1], g);
        }return g && w(g, g.next) && (D(g), g = g.next), g;
      }function f(a, b) {
        if (!a) return a;b || (b = a);var c,
            d = a;do {
          if (c = !1, d.steiner || !w(d, d.next) && 0 !== v(d.prev, d, d.next)) d = d.next;else {
            if (D(d), d = b = d.prev, d === d.next) break;c = !0;
          }
        } while (c || d !== b);return b;
      }function g(a, b, c, d, e, l, m) {
        if (a) {
          !m && l && p(a, d, e, l);for (var n, o, q = a; a.prev !== a.next;) {
            if (n = a.prev, o = a.next, l ? i(a, d, e, l) : h(a)) b.push(n.i / c), b.push(a.i / c), b.push(o.i / c), D(a), a = o.next, q = o.next;else if (a = o, a === q) {
              m ? 1 === m ? (a = j(a, b, c), g(a, b, c, d, e, l, 2)) : 2 === m && k(a, b, c, d, e, l) : g(f(a), b, c, d, e, l, 1);break;
            }
          }
        }
      }function h(a) {
        var b = a.prev,
            c = a,
            d = a.next;if (v(b, c, d) >= 0) return !1;for (var e = a.next.next; e !== a.prev;) {
          if (t(b.x, b.y, c.x, c.y, d.x, d.y, e.x, e.y) && v(e.prev, e, e.next) >= 0) return !1;e = e.next;
        }return !0;
      }function i(a, b, c, d) {
        var e = a.prev,
            f = a,
            g = a.next;if (v(e, f, g) >= 0) return !1;for (var h = e.x < f.x ? e.x < g.x ? e.x : g.x : f.x < g.x ? f.x : g.x, i = e.y < f.y ? e.y < g.y ? e.y : g.y : f.y < g.y ? f.y : g.y, j = e.x > f.x ? e.x > g.x ? e.x : g.x : f.x > g.x ? f.x : g.x, k = e.y > f.y ? e.y > g.y ? e.y : g.y : f.y > g.y ? f.y : g.y, l = r(h, i, b, c, d), m = r(j, k, b, c, d), n = a.nextZ; n && n.z <= m;) {
          if (n !== a.prev && n !== a.next && t(e.x, e.y, f.x, f.y, g.x, g.y, n.x, n.y) && v(n.prev, n, n.next) >= 0) return !1;n = n.nextZ;
        }for (n = a.prevZ; n && n.z >= l;) {
          if (n !== a.prev && n !== a.next && t(e.x, e.y, f.x, f.y, g.x, g.y, n.x, n.y) && v(n.prev, n, n.next) >= 0) return !1;n = n.prevZ;
        }return !0;
      }function j(a, b, c) {
        var d = a;do {
          var e = d.prev,
              f = d.next.next;!w(e, f) && x(e, d, d.next, f) && z(e, f) && z(f, e) && (b.push(e.i / c), b.push(d.i / c), b.push(f.i / c), D(d), D(d.next), d = a = f), d = d.next;
        } while (d !== a);return d;
      }function k(a, b, c, d, e, h) {
        var i = a;do {
          for (var j = i.next.next; j !== i.prev;) {
            if (i.i !== j.i && u(i, j)) {
              var k = B(i, j);return i = f(i, i.next), k = f(k, k.next), g(i, b, c, d, e, h), void g(k, b, c, d, e, h);
            }j = j.next;
          }i = i.next;
        } while (i !== a);
      }function l(a, b, c, d) {
        var g,
            h,
            i,
            j,
            k,
            l = [];for (g = 0, h = b.length; g < h; g++) {
          i = b[g] * d, j = g < h - 1 ? b[g + 1] * d : a.length, k = e(a, i, j, d, !1), k === k.next && (k.steiner = !0), l.push(s(k));
        }for (l.sort(m), g = 0; g < l.length; g++) {
          n(l[g], c), c = f(c, c.next);
        }return c;
      }function m(a, b) {
        return a.x - b.x;
      }function n(a, b) {
        if (b = o(a, b)) {
          var c = B(b, a);f(c, c.next);
        }
      }function o(a, b) {
        var c,
            d = b,
            e = a.x,
            f = a.y,
            g = -(1 / 0);do {
          if (f <= d.y && f >= d.next.y && d.next.y !== d.y) {
            var h = d.x + (f - d.y) * (d.next.x - d.x) / (d.next.y - d.y);if (h <= e && h > g) {
              if (g = h, h === e) {
                if (f === d.y) return d;if (f === d.next.y) return d.next;
              }c = d.x < d.next.x ? d : d.next;
            }
          }d = d.next;
        } while (d !== b);if (!c) return null;if (e === g) return c.prev;var i,
            j = c,
            k = c.x,
            l = c.y,
            m = 1 / 0;for (d = c.next; d !== j;) {
          e >= d.x && d.x >= k && e !== d.x && t(f < l ? e : g, f, k, l, f < l ? g : e, f, d.x, d.y) && (i = Math.abs(f - d.y) / (e - d.x), (i < m || i === m && d.x > c.x) && z(d, a) && (c = d, m = i)), d = d.next;
        }return c;
      }function p(a, b, c, d) {
        var e = a;do {
          null === e.z && (e.z = r(e.x, e.y, b, c, d)), e.prevZ = e.prev, e.nextZ = e.next, e = e.next;
        } while (e !== a);e.prevZ.nextZ = null, e.prevZ = null, q(e);
      }function q(a) {
        var b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j = 1;do {
          for (c = a, a = null, f = null, g = 0; c;) {
            for (g++, d = c, h = 0, b = 0; b < j && (h++, d = d.nextZ, d); b++) {}for (i = j; h > 0 || i > 0 && d;) {
              0 !== h && (0 === i || !d || c.z <= d.z) ? (e = c, c = c.nextZ, h--) : (e = d, d = d.nextZ, i--), f ? f.nextZ = e : a = e, e.prevZ = f, f = e;
            }c = d;
          }f.nextZ = null, j *= 2;
        } while (g > 1);return a;
      }function r(a, b, c, d, e) {
        return a = 32767 * (a - c) * e, b = 32767 * (b - d) * e, a = 16711935 & (a | a << 8), a = 252645135 & (a | a << 4), a = 858993459 & (a | a << 2), a = 1431655765 & (a | a << 1), b = 16711935 & (b | b << 8), b = 252645135 & (b | b << 4), b = 858993459 & (b | b << 2), b = 1431655765 & (b | b << 1), a | b << 1;
      }function s(a) {
        var b = a,
            c = a;do {
          b.x < c.x && (c = b), b = b.next;
        } while (b !== a);return c;
      }function t(a, b, c, d, e, f, g, h) {
        return (e - g) * (b - h) - (a - g) * (f - h) >= 0 && (a - g) * (d - h) - (c - g) * (b - h) >= 0 && (c - g) * (f - h) - (e - g) * (d - h) >= 0;
      }function u(a, b) {
        return a.next.i !== b.i && a.prev.i !== b.i && !y(a, b) && z(a, b) && z(b, a) && A(a, b);
      }function v(a, b, c) {
        return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
      }function w(a, b) {
        return a.x === b.x && a.y === b.y;
      }function x(a, b, c, d) {
        return !!(w(a, b) && w(c, d) || w(a, d) && w(c, b)) || v(a, b, c) > 0 != v(a, b, d) > 0 && v(c, d, a) > 0 != v(c, d, b) > 0;
      }function y(a, b) {
        var c = a;do {
          if (c.i !== a.i && c.next.i !== a.i && c.i !== b.i && c.next.i !== b.i && x(c, c.next, a, b)) return !0;c = c.next;
        } while (c !== a);return !1;
      }function z(a, b) {
        return v(a.prev, a, a.next) < 0 ? v(a, b, a.next) >= 0 && v(a, a.prev, b) >= 0 : v(a, b, a.prev) < 0 || v(a, a.next, b) < 0;
      }function A(a, b) {
        var c = a,
            d = !1,
            e = (a.x + b.x) / 2,
            f = (a.y + b.y) / 2;do {
          c.y > f != c.next.y > f && c.next.y !== c.y && e < (c.next.x - c.x) * (f - c.y) / (c.next.y - c.y) + c.x && (d = !d), c = c.next;
        } while (c !== a);return d;
      }function B(a, b) {
        var c = new E(a.i, a.x, a.y),
            d = new E(b.i, b.x, b.y),
            e = a.next,
            f = b.prev;return a.next = b, b.prev = a, c.next = e, e.prev = c, d.next = c, c.prev = d, f.next = d, d.prev = f, d;
      }function C(a, b, c, d) {
        var e = new E(a, b, c);return d ? (e.next = d.next, e.prev = d, d.next.prev = e, d.next = e) : (e.prev = e, e.next = e), e;
      }function D(a) {
        a.next.prev = a.prev, a.prev.next = a.next, a.prevZ && (a.prevZ.nextZ = a.nextZ), a.nextZ && (a.nextZ.prevZ = a.prevZ);
      }function E(a, b, c) {
        this.i = a, this.x = b, this.y = c, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1;
      }function F(a, b, c, d) {
        for (var e = 0, f = b, g = c - d; f < c; f += d) {
          e += (a[g] - a[f]) * (a[f + 1] + a[g + 1]), g = f;
        }return e;
      }b.exports = d, b.exports.default = d, d.deviation = function (a, b, c, d) {
        var e = b && b.length,
            f = e ? b[0] * c : a.length,
            g = Math.abs(F(a, 0, f, c));if (e) for (var h = 0, i = b.length; h < i; h++) {
          var j = b[h] * c,
              k = h < i - 1 ? b[h + 1] * c : a.length;g -= Math.abs(F(a, j, k, c));
        }var l = 0;for (h = 0; h < d.length; h += 3) {
          var m = d[h] * c,
              n = d[h + 1] * c,
              o = d[h + 2] * c;l += Math.abs((a[m] - a[o]) * (a[n + 1] - a[m + 1]) - (a[m] - a[n]) * (a[o + 1] - a[m + 1]));
        }return 0 === g && 0 === l ? 0 : Math.abs((l - g) / g);
      }, d.flatten = function (a) {
        for (var b = a[0][0].length, c = { vertices: [], holes: [], dimensions: b }, d = 0, e = 0; e < a.length; e++) {
          for (var f = 0; f < a[e].length; f++) {
            for (var g = 0; g < b; g++) {
              c.vertices.push(a[e][f][g]);
            }
          }e > 0 && (d += a[e - 1].length, c.holes.push(d));
        }return c;
      };
    }, {}], 3: [function (a, b, c) {
      "use strict";
      function d() {}function e(a, b, c) {
        this.fn = a, this.context = b, this.once = c || !1;
      }function f() {
        this._events = new d(), this._eventsCount = 0;
      }var g = Object.prototype.hasOwnProperty,
          h = "~";Object.create && (d.prototype = Object.create(null), new d().__proto__ || (h = !1)), f.prototype.eventNames = function () {
        var a,
            b,
            c = [];if (0 === this._eventsCount) return c;for (b in a = this._events) {
          g.call(a, b) && c.push(h ? b.slice(1) : b);
        }return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(a)) : c;
      }, f.prototype.listeners = function (a, b) {
        var c = h ? h + a : a,
            d = this._events[c];if (b) return !!d;if (!d) return [];if (d.fn) return [d.fn];for (var e = 0, f = d.length, g = new Array(f); e < f; e++) {
          g[e] = d[e].fn;
        }return g;
      }, f.prototype.emit = function (a, b, c, d, e, f) {
        var g = h ? h + a : a;if (!this._events[g]) return !1;var i,
            j,
            k = this._events[g],
            l = arguments.length;if (k.fn) {
          switch (k.once && this.removeListener(a, k.fn, void 0, !0), l) {case 1:
              return k.fn.call(k.context), !0;case 2:
              return k.fn.call(k.context, b), !0;case 3:
              return k.fn.call(k.context, b, c), !0;case 4:
              return k.fn.call(k.context, b, c, d), !0;case 5:
              return k.fn.call(k.context, b, c, d, e), !0;case 6:
              return k.fn.call(k.context, b, c, d, e, f), !0;}for (j = 1, i = new Array(l - 1); j < l; j++) {
            i[j - 1] = arguments[j];
          }k.fn.apply(k.context, i);
        } else {
          var m,
              n = k.length;for (j = 0; j < n; j++) {
            switch (k[j].once && this.removeListener(a, k[j].fn, void 0, !0), l) {case 1:
                k[j].fn.call(k[j].context);break;case 2:
                k[j].fn.call(k[j].context, b);break;case 3:
                k[j].fn.call(k[j].context, b, c);break;case 4:
                k[j].fn.call(k[j].context, b, c, d);break;default:
                if (!i) for (m = 1, i = new Array(l - 1); m < l; m++) {
                  i[m - 1] = arguments[m];
                }k[j].fn.apply(k[j].context, i);}
          }
        }return !0;
      }, f.prototype.on = function (a, b, c) {
        var d = new e(b, c || this),
            f = h ? h + a : a;return this._events[f] ? this._events[f].fn ? this._events[f] = [this._events[f], d] : this._events[f].push(d) : (this._events[f] = d, this._eventsCount++), this;
      }, f.prototype.once = function (a, b, c) {
        var d = new e(b, c || this, !0),
            f = h ? h + a : a;return this._events[f] ? this._events[f].fn ? this._events[f] = [this._events[f], d] : this._events[f].push(d) : (this._events[f] = d, this._eventsCount++), this;
      }, f.prototype.removeListener = function (a, b, c, e) {
        var f = h ? h + a : a;if (!this._events[f]) return this;if (!b) return 0 === --this._eventsCount ? this._events = new d() : delete this._events[f], this;var g = this._events[f];if (g.fn) g.fn !== b || e && !g.once || c && g.context !== c || (0 === --this._eventsCount ? this._events = new d() : delete this._events[f]);else {
          for (var i = 0, j = [], k = g.length; i < k; i++) {
            (g[i].fn !== b || e && !g[i].once || c && g[i].context !== c) && j.push(g[i]);
          }j.length ? this._events[f] = 1 === j.length ? j[0] : j : 0 === --this._eventsCount ? this._events = new d() : delete this._events[f];
        }return this;
      }, f.prototype.removeAllListeners = function (a) {
        var b;return a ? (b = h ? h + a : a, this._events[b] && (0 === --this._eventsCount ? this._events = new d() : delete this._events[b])) : (this._events = new d(), this._eventsCount = 0), this;
      }, f.prototype.off = f.prototype.removeListener, f.prototype.addListener = f.prototype.on, f.prototype.setMaxListeners = function () {
        return this;
      }, f.prefixed = h, f.EventEmitter = f, "undefined" != typeof b && (b.exports = f);
    }, {}], 4: [function (b, c, d) {
      !function (b) {
        var d = /iPhone/i,
            e = /iPod/i,
            f = /iPad/i,
            g = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
            h = /Android/i,
            i = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
            j = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
            k = /Windows Phone/i,
            l = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
            m = /BlackBerry/i,
            n = /BB10/i,
            o = /Opera Mini/i,
            p = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
            q = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
            r = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
            s = function s(a, b) {
          return a.test(b);
        },
            t = function t(a) {
          var b = a || navigator.userAgent,
              c = b.split("[FBAN");if ("undefined" != typeof c[1] && (b = c[0]), c = b.split("Twitter"), "undefined" != typeof c[1] && (b = c[0]), this.apple = { phone: s(d, b), ipod: s(e, b), tablet: !s(d, b) && s(f, b), device: s(d, b) || s(e, b) || s(f, b) }, this.amazon = { phone: s(i, b), tablet: !s(i, b) && s(j, b), device: s(i, b) || s(j, b) }, this.android = { phone: s(i, b) || s(g, b), tablet: !s(i, b) && !s(g, b) && (s(j, b) || s(h, b)), device: s(i, b) || s(j, b) || s(g, b) || s(h, b) }, this.windows = { phone: s(k, b), tablet: s(l, b), device: s(k, b) || s(l, b) }, this.other = { blackberry: s(m, b), blackberry10: s(n, b), opera: s(o, b), firefox: s(q, b), chrome: s(p, b), device: s(m, b) || s(n, b) || s(o, b) || s(q, b) || s(p, b) }, this.seven_inch = s(r, b), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window) return this;
        },
            u = function u() {
          var a = new t();return a.Class = t, a;
        };"undefined" != typeof c && c.exports && "undefined" == typeof window ? c.exports = t : "undefined" != typeof c && c.exports && "undefined" != typeof window ? c.exports = u() : "function" == typeof a && a.amd ? a("isMobile", [], b.isMobile = u()) : b.isMobile = u();
      }(this);
    }, {}], 5: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (null === a || void 0 === a) throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a);
      }function e() {
        try {
          if (!Object.assign) return !1;var a = new String("abc");if (a[5] = "de", "5" === Object.getOwnPropertyNames(a)[0]) return !1;for (var b = {}, c = 0; c < 10; c++) {
            b["_" + String.fromCharCode(c)] = c;
          }var d = Object.getOwnPropertyNames(b).map(function (a) {
            return b[a];
          });if ("0123456789" !== d.join("")) return !1;var e = {};return "abcdefghijklmnopqrst".split("").forEach(function (a) {
            e[a] = a;
          }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, e)).join("");
        } catch (a) {
          return !1;
        }
      }var f = Object.getOwnPropertySymbols,
          g = Object.prototype.hasOwnProperty,
          h = Object.prototype.propertyIsEnumerable;b.exports = e() ? Object.assign : function (a, b) {
        for (var c, e, i = d(a), j = 1; j < arguments.length; j++) {
          c = Object(arguments[j]);for (var k in c) {
            g.call(c, k) && (i[k] = c[k]);
          }if (f) {
            e = f(c);for (var l = 0; l < e.length; l++) {
              h.call(c, e[l]) && (i[e[l]] = c[e[l]]);
            }
          }
        }return i;
      };
    }, {}], 6: [function (a, b, c) {
      var d = new ArrayBuffer(0),
          e = function e(a, b, c, _e) {
        this.gl = a, this.buffer = a.createBuffer(), this.type = b || a.ARRAY_BUFFER, this.drawType = _e || a.STATIC_DRAW, this.data = d, c && this.upload(c), this._updateID = 0;
      };e.prototype.upload = function (a, b, c) {
        c || this.bind();var d = this.gl;a = a || this.data, b = b || 0, this.data.byteLength >= a.byteLength ? d.bufferSubData(this.type, b, a) : d.bufferData(this.type, a, this.drawType), this.data = a;
      }, e.prototype.bind = function () {
        var a = this.gl;a.bindBuffer(this.type, this.buffer);
      }, e.createVertexBuffer = function (a, b, c) {
        return new e(a, a.ARRAY_BUFFER, b, c);
      }, e.createIndexBuffer = function (a, b, c) {
        return new e(a, a.ELEMENT_ARRAY_BUFFER, b, c);
      }, e.create = function (a, b, c, d) {
        return new e(a, b, c, d);
      }, e.prototype.destroy = function () {
        this.gl.deleteBuffer(this.buffer);
      }, b.exports = e;
    }, {}], 7: [function (a, b, c) {
      var d = a("./GLTexture"),
          e = function e(a, b, c) {
        this.gl = a, this.framebuffer = a.createFramebuffer(), this.stencil = null, this.texture = null, this.width = b || 100, this.height = c || 100;
      };e.prototype.enableTexture = function (a) {
        var b = this.gl;this.texture = a || new d(b), this.texture.bind(), this.bind(), b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, this.texture.texture, 0);
      }, e.prototype.enableStencil = function () {
        if (!this.stencil) {
          var a = this.gl;this.stencil = a.createRenderbuffer(), a.bindRenderbuffer(a.RENDERBUFFER, this.stencil), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT, a.RENDERBUFFER, this.stencil), a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_STENCIL, this.width, this.height);
        }
      }, e.prototype.clear = function (a, b, c, d) {
        this.bind();var e = this.gl;e.clearColor(a, b, c, d), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT);
      }, e.prototype.bind = function () {
        var a = this.gl;a.bindFramebuffer(a.FRAMEBUFFER, this.framebuffer);
      }, e.prototype.unbind = function () {
        var a = this.gl;a.bindFramebuffer(a.FRAMEBUFFER, null);
      }, e.prototype.resize = function (a, b) {
        var c = this.gl;this.width = a, this.height = b, this.texture && this.texture.uploadData(null, a, b), this.stencil && (c.bindRenderbuffer(c.RENDERBUFFER, this.stencil), c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_STENCIL, a, b));
      }, e.prototype.destroy = function () {
        var a = this.gl;this.texture && this.texture.destroy(), a.deleteFramebuffer(this.framebuffer), this.gl = null, this.stencil = null, this.texture = null;
      }, e.createRGBA = function (a, b, c, f) {
        var g = d.fromData(a, null, b, c);g.enableNearestScaling(), g.enableWrapClamp();var h = new e(a, b, c);return h.enableTexture(g), h.unbind(), h;
      }, e.createFloat32 = function (a, b, c, f) {
        var g = new d.fromData(a, f, b, c);g.enableNearestScaling(), g.enableWrapClamp();var h = new e(a, b, c);return h.enableTexture(g), h.unbind(), h;
      }, b.exports = e;
    }, { "./GLTexture": 9 }], 8: [function (a, b, c) {
      var d = a("./shader/compileProgram"),
          e = a("./shader/extractAttributes"),
          f = a("./shader/extractUniforms"),
          g = a("./shader/setPrecision"),
          h = a("./shader/generateUniformAccessObject"),
          i = function i(a, b, c, _i, j) {
        this.gl = a, _i && (b = g(b, _i), c = g(c, _i)), this.program = d(a, b, c, j), this.attributes = e(a, this.program), this.uniformData = f(a, this.program), this.uniforms = h(a, this.uniformData);
      };i.prototype.bind = function () {
        return this.gl.useProgram(this.program), this;
      }, i.prototype.destroy = function () {
        this.attributes = null, this.uniformData = null, this.uniforms = null;var a = this.gl;a.deleteProgram(this.program);
      }, b.exports = i;
    }, { "./shader/compileProgram": 14, "./shader/extractAttributes": 16, "./shader/extractUniforms": 17, "./shader/generateUniformAccessObject": 18, "./shader/setPrecision": 22 }], 9: [function (a, b, c) {
      var d = function d(a, b, c, _d, e) {
        this.gl = a, this.texture = a.createTexture(), this.mipmap = !1, this.premultiplyAlpha = !1, this.width = b || -1, this.height = c || -1, this.format = _d || a.RGBA, this.type = e || a.UNSIGNED_BYTE;
      };d.prototype.upload = function (a) {
        this.bind();var b = this.gl;b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);var c = a.videoWidth || a.width,
            d = a.videoHeight || a.height;d !== this.height || c !== this.width ? b.texImage2D(b.TEXTURE_2D, 0, this.format, this.format, this.type, a) : b.texSubImage2D(b.TEXTURE_2D, 0, 0, 0, this.format, this.type, a), this.width = c, this.height = d;
      };var e = !1;d.prototype.uploadData = function (a, b, c) {
        this.bind();var d = this.gl;if (a instanceof Float32Array) {
          if (!e) {
            var f = d.getExtension("OES_texture_float");if (!f) throw new Error("floating point textures not available");e = !0;
          }this.type = d.FLOAT;
        } else this.type = this.type || d.UNSIGNED_BYTE;d.pixelStorei(d.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha), b !== this.width || c !== this.height ? d.texImage2D(d.TEXTURE_2D, 0, this.format, b, c, 0, this.format, this.type, a || null) : d.texSubImage2D(d.TEXTURE_2D, 0, 0, 0, b, c, this.format, this.type, a || null), this.width = b, this.height = c;
      }, d.prototype.bind = function (a) {
        var b = this.gl;void 0 !== a && b.activeTexture(b.TEXTURE0 + a), b.bindTexture(b.TEXTURE_2D, this.texture);
      }, d.prototype.unbind = function () {
        var a = this.gl;a.bindTexture(a.TEXTURE_2D, null);
      }, d.prototype.minFilter = function (a) {
        var b = this.gl;this.bind(), this.mipmap ? b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a ? b.LINEAR_MIPMAP_LINEAR : b.NEAREST_MIPMAP_NEAREST) : b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a ? b.LINEAR : b.NEAREST);
      }, d.prototype.magFilter = function (a) {
        var b = this.gl;this.bind(), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, a ? b.LINEAR : b.NEAREST);
      }, d.prototype.enableMipmap = function () {
        var a = this.gl;this.bind(), this.mipmap = !0, a.generateMipmap(a.TEXTURE_2D);
      }, d.prototype.enableLinearScaling = function () {
        this.minFilter(!0), this.magFilter(!0);
      }, d.prototype.enableNearestScaling = function () {
        this.minFilter(!1), this.magFilter(!1);
      }, d.prototype.enableWrapClamp = function () {
        var a = this.gl;this.bind(), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
      }, d.prototype.enableWrapRepeat = function () {
        var a = this.gl;this.bind(), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.REPEAT), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.REPEAT);
      }, d.prototype.enableWrapMirrorRepeat = function () {
        var a = this.gl;this.bind(), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.MIRRORED_REPEAT), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.MIRRORED_REPEAT);
      }, d.prototype.destroy = function () {
        var a = this.gl;a.deleteTexture(this.texture);
      }, d.fromSource = function (a, b, c) {
        var e = new d(a);return e.premultiplyAlpha = c || !1, e.upload(b), e;
      }, d.fromData = function (a, b, c, e) {
        var f = new d(a);return f.uploadData(b, c, e), f;
      }, b.exports = d;
    }, {}], 10: [function (a, b, c) {
      function d(a, b) {
        if (this.nativeVaoExtension = null, d.FORCE_NATIVE || (this.nativeVaoExtension = a.getExtension("OES_vertex_array_object") || a.getExtension("MOZ_OES_vertex_array_object") || a.getExtension("WEBKIT_OES_vertex_array_object")), this.nativeState = b, this.nativeVaoExtension) {
          this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();var c = a.getParameter(a.MAX_VERTEX_ATTRIBS);this.nativeState = { tempAttribState: new Array(c), attribState: new Array(c) };
        }this.gl = a, this.attributes = [], this.indexBuffer = null, this.dirty = !1;
      }var e = a("./setVertexAttribArrays");d.prototype.constructor = d, b.exports = d, d.FORCE_NATIVE = !1, d.prototype.bind = function () {
        return this.nativeVao ? (this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), this.dirty && (this.dirty = !1, this.activate())) : this.activate(), this;
      }, d.prototype.unbind = function () {
        return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(null), this;
      }, d.prototype.activate = function () {
        for (var a = this.gl, b = null, c = 0; c < this.attributes.length; c++) {
          var d = this.attributes[c];b !== d.buffer && (d.buffer.bind(), b = d.buffer), a.vertexAttribPointer(d.attribute.location, d.attribute.size, d.type || a.FLOAT, d.normalized || !1, d.stride || 0, d.start || 0);
        }return e(a, this.attributes, this.nativeState), this.indexBuffer && this.indexBuffer.bind(), this;
      }, d.prototype.addAttribute = function (a, b, c, d, e, f) {
        return this.attributes.push({ buffer: a, attribute: b, location: b.location, type: c || this.gl.FLOAT, normalized: d || !1, stride: e || 0, start: f || 0 }), this.dirty = !0, this;
      }, d.prototype.addIndex = function (a) {
        return this.indexBuffer = a, this.dirty = !0, this;
      }, d.prototype.clear = function () {
        return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), this.attributes.length = 0, this.indexBuffer = null, this;
      }, d.prototype.draw = function (a, b, c) {
        var d = this.gl;return this.indexBuffer ? d.drawElements(a, b || this.indexBuffer.data.length, d.UNSIGNED_SHORT, 2 * (c || 0)) : d.drawArrays(a, c, b || this.getSize()), this;
      }, d.prototype.destroy = function () {
        this.gl = null, this.indexBuffer = null, this.attributes = null, this.nativeState = null, this.nativeVao && this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao), this.nativeVaoExtension = null, this.nativeVao = null;
      }, d.prototype.getSize = function () {
        var a = this.attributes[0];return a.buffer.data.length / (a.stride / 4 || a.attribute.size);
      };
    }, { "./setVertexAttribArrays": 13 }], 11: [function (a, b, c) {
      var d = function d(a, b) {
        var c = a.getContext("webgl", b) || a.getContext("experimental-webgl", b);if (!c) throw new Error("This browser does not support webGL. Try using the canvas renderer");return c;
      };b.exports = d;
    }, {}], 12: [function (a, b, c) {
      var d = { createContext: a("./createContext"), setVertexAttribArrays: a("./setVertexAttribArrays"), GLBuffer: a("./GLBuffer"), GLFramebuffer: a("./GLFramebuffer"), GLShader: a("./GLShader"), GLTexture: a("./GLTexture"), VertexArrayObject: a("./VertexArrayObject"), shader: a("./shader") };"undefined" != typeof b && b.exports && (b.exports = d), "undefined" != typeof window && (window.PIXI = window.PIXI || {}, window.PIXI.glCore = d);
    }, { "./GLBuffer": 6, "./GLFramebuffer": 7, "./GLShader": 8, "./GLTexture": 9, "./VertexArrayObject": 10, "./createContext": 11, "./setVertexAttribArrays": 13, "./shader": 19 }], 13: [function (a, b, c) {
      var d = function d(a, b, c) {
        var d;if (c) {
          var e = c.tempAttribState,
              f = c.attribState;for (d = 0; d < e.length; d++) {
            e[d] = !1;
          }for (d = 0; d < b.length; d++) {
            e[b[d].attribute.location] = !0;
          }for (d = 0; d < f.length; d++) {
            f[d] !== e[d] && (f[d] = e[d], c.attribState[d] ? a.enableVertexAttribArray(d) : a.disableVertexAttribArray(d));
          }
        } else for (d = 0; d < b.length; d++) {
          var g = b[d];a.enableVertexAttribArray(g.attribute.location);
        }
      };b.exports = d;
    }, {}], 14: [function (a, b, c) {
      var d = function d(a, b, c, _d2) {
        var f = e(a, a.VERTEX_SHADER, b),
            g = e(a, a.FRAGMENT_SHADER, c),
            h = a.createProgram();if (a.attachShader(h, f), a.attachShader(h, g), _d2) for (var i in _d2) {
          a.bindAttribLocation(h, _d2[i], i);
        }return a.linkProgram(h), a.getProgramParameter(h, a.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."), console.error("gl.VALIDATE_STATUS", a.getProgramParameter(h, a.VALIDATE_STATUS)), console.error("gl.getError()", a.getError()), "" !== a.getProgramInfoLog(h) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", a.getProgramInfoLog(h)), a.deleteProgram(h), h = null), a.deleteShader(f), a.deleteShader(g), h;
      },
          e = function e(a, b, c) {
        var d = a.createShader(b);return a.shaderSource(d, c), a.compileShader(d), a.getShaderParameter(d, a.COMPILE_STATUS) ? d : (console.log(a.getShaderInfoLog(d)), null);
      };b.exports = d;
    }, {}], 15: [function (a, b, c) {
      var d = function d(a, b) {
        switch (a) {case "float":
            return 0;case "vec2":
            return new Float32Array(2 * b);case "vec3":
            return new Float32Array(3 * b);case "vec4":
            return new Float32Array(4 * b);case "int":case "sampler2D":
            return 0;case "ivec2":
            return new Int32Array(2 * b);case "ivec3":
            return new Int32Array(3 * b);case "ivec4":
            return new Int32Array(4 * b);case "bool":
            return !1;case "bvec2":
            return e(2 * b);case "bvec3":
            return e(3 * b);case "bvec4":
            return e(4 * b);case "mat2":
            return new Float32Array([1, 0, 0, 1]);case "mat3":
            return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);case "mat4":
            return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);}
      },
          e = function e(a) {
        for (var b = new Array(a), c = 0; c < b.length; c++) {
          b[c] = !1;
        }return b;
      };b.exports = d;
    }, {}], 16: [function (a, b, c) {
      var d = a("./mapType"),
          e = a("./mapSize"),
          f = function f(a, b) {
        for (var c = {}, f = a.getProgramParameter(b, a.ACTIVE_ATTRIBUTES), h = 0; h < f; h++) {
          var i = a.getActiveAttrib(b, h),
              j = d(a, i.type);c[i.name] = { type: j, size: e(j), location: a.getAttribLocation(b, i.name), pointer: g };
        }return c;
      },
          g = function g(a, b, c, d) {
        gl.vertexAttribPointer(this.location, this.size, a || gl.FLOAT, b || !1, c || 0, d || 0);
      };b.exports = f;
    }, { "./mapSize": 20, "./mapType": 21 }], 17: [function (a, b, c) {
      var d = a("./mapType"),
          e = a("./defaultValue"),
          f = function f(a, b) {
        for (var c = {}, f = a.getProgramParameter(b, a.ACTIVE_UNIFORMS), g = 0; g < f; g++) {
          var h = a.getActiveUniform(b, g),
              i = h.name.replace(/\[.*?\]/, ""),
              j = d(a, h.type);c[i] = { type: j, size: h.size, location: a.getUniformLocation(b, i), value: e(j, h.size) };
        }return c;
      };b.exports = f;
    }, { "./defaultValue": 15, "./mapType": 21 }], 18: [function (a, b, c) {
      var d = function d(a, b) {
        var c = { data: {} };c.gl = a;for (var d = Object.keys(b), h = 0; h < d.length; h++) {
          var i = d[h],
              j = i.split("."),
              k = j[j.length - 1],
              l = g(j, c),
              m = b[i];l.data[k] = m, l.gl = a, Object.defineProperty(l, k, { get: e(k), set: f(k, m) });
        }return c;
      },
          e = function e(a) {
        var b = h.replace("%%", a);return new Function(b);
      },
          f = function f(a, b) {
        var c,
            d = i.replace(/%%/g, a);return c = 1 === b.size ? j[b.type] : k[b.type], c && (d += "\nthis.gl." + c + ";"), new Function("value", d);
      },
          g = function g(a, b) {
        for (var c = b, d = 0; d < a.length - 1; d++) {
          var e = c[a[d]] || { data: {} };c[a[d]] = e, c = e;
        }return c;
      },
          h = ["return this.data.%%.value;"].join("\n"),
          i = ["this.data.%%.value = value;", "var location = this.data.%%.location;"].join("\n"),
          j = { float: "uniform1f(location, value)", vec2: "uniform2f(location, value[0], value[1])", vec3: "uniform3f(location, value[0], value[1], value[2])", vec4: "uniform4f(location, value[0], value[1], value[2], value[3])", int: "uniform1i(location, value)", ivec2: "uniform2i(location, value[0], value[1])", ivec3: "uniform3i(location, value[0], value[1], value[2])", ivec4: "uniform4i(location, value[0], value[1], value[2], value[3])", bool: "uniform1i(location, value)", bvec2: "uniform2i(location, value[0], value[1])", bvec3: "uniform3i(location, value[0], value[1], value[2])", bvec4: "uniform4i(location, value[0], value[1], value[2], value[3])", mat2: "uniformMatrix2fv(location, false, value)", mat3: "uniformMatrix3fv(location, false, value)", mat4: "uniformMatrix4fv(location, false, value)", sampler2D: "uniform1i(location, value)" },
          k = { float: "uniform1fv(location, value)", vec2: "uniform2fv(location, value)", vec3: "uniform3fv(location, value)", vec4: "uniform4fv(location, value)", int: "uniform1iv(location, value)", ivec2: "uniform2iv(location, value)", ivec3: "uniform3iv(location, value)", ivec4: "uniform4iv(location, value)", bool: "uniform1iv(location, value)", bvec2: "uniform2iv(location, value)", bvec3: "uniform3iv(location, value)", bvec4: "uniform4iv(location, value)", sampler2D: "uniform1iv(location, value)" };b.exports = d;
    }, {}], 19: [function (a, b, c) {
      b.exports = { compileProgram: a("./compileProgram"), defaultValue: a("./defaultValue"), extractAttributes: a("./extractAttributes"), extractUniforms: a("./extractUniforms"), generateUniformAccessObject: a("./generateUniformAccessObject"), setPrecision: a("./setPrecision"), mapSize: a("./mapSize"), mapType: a("./mapType") };
    }, { "./compileProgram": 14, "./defaultValue": 15, "./extractAttributes": 16, "./extractUniforms": 17, "./generateUniformAccessObject": 18, "./mapSize": 20, "./mapType": 21, "./setPrecision": 22 }], 20: [function (a, b, c) {
      var d = function d(a) {
        return e[a];
      },
          e = { float: 1, vec2: 2, vec3: 3, vec4: 4, int: 1, ivec2: 2, ivec3: 3, ivec4: 4, bool: 1, bvec2: 2, bvec3: 3, bvec4: 4, mat2: 4, mat3: 9, mat4: 16, sampler2D: 1 };b.exports = d;
    }, {}], 21: [function (a, b, c) {
      var d = function d(a, b) {
        if (!e) {
          var c = Object.keys(f);e = {};for (var d = 0; d < c.length; ++d) {
            var g = c[d];e[a[g]] = f[g];
          }
        }return e[b];
      },
          e = null,
          f = { FLOAT: "float", FLOAT_VEC2: "vec2", FLOAT_VEC3: "vec3", FLOAT_VEC4: "vec4", INT: "int", INT_VEC2: "ivec2", INT_VEC3: "ivec3", INT_VEC4: "ivec4", BOOL: "bool", BOOL_VEC2: "bvec2", BOOL_VEC3: "bvec3", BOOL_VEC4: "bvec4", FLOAT_MAT2: "mat2", FLOAT_MAT3: "mat3", FLOAT_MAT4: "mat4", SAMPLER_2D: "sampler2D" };b.exports = d;
    }, {}], 22: [function (a, b, c) {
      var d = function d(a, b) {
        return "precision" !== a.substring(0, 9) ? "precision " + b + " float;\n" + a : a;
      };b.exports = d;
    }, {}], 23: [function (a, b, c) {
      (function (a) {
        function b(a, b) {
          for (var c = 0, d = a.length - 1; d >= 0; d--) {
            var e = a[d];"." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
          }if (b) for (; c--; c) {
            a.unshift("..");
          }return a;
        }function d(a, b) {
          if (a.filter) return a.filter(b);for (var c = [], d = 0; d < a.length; d++) {
            b(a[d], d, a) && c.push(a[d]);
          }return c;
        }var e = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
            f = function f(a) {
          return e.exec(a).slice(1);
        };c.resolve = function () {
          for (var c = "", e = !1, f = arguments.length - 1; f >= -1 && !e; f--) {
            var g = f >= 0 ? arguments[f] : a.cwd();if ("string" != typeof g) throw new TypeError("Arguments to path.resolve must be strings");g && (c = g + "/" + c, e = "/" === g.charAt(0));
          }return c = b(d(c.split("/"), function (a) {
            return !!a;
          }), !e).join("/"), (e ? "/" : "") + c || ".";
        }, c.normalize = function (a) {
          var e = c.isAbsolute(a),
              f = "/" === g(a, -1);return a = b(d(a.split("/"), function (a) {
            return !!a;
          }), !e).join("/"), a || e || (a = "."), a && f && (a += "/"), (e ? "/" : "") + a;
        }, c.isAbsolute = function (a) {
          return "/" === a.charAt(0);
        }, c.join = function () {
          var a = Array.prototype.slice.call(arguments, 0);return c.normalize(d(a, function (a, b) {
            if ("string" != typeof a) throw new TypeError("Arguments to path.join must be strings");return a;
          }).join("/"));
        }, c.relative = function (a, b) {
          function d(a) {
            for (var b = 0; b < a.length && "" === a[b]; b++) {}for (var c = a.length - 1; c >= 0 && "" === a[c]; c--) {}return b > c ? [] : a.slice(b, c - b + 1);
          }a = c.resolve(a).substr(1), b = c.resolve(b).substr(1);for (var e = d(a.split("/")), f = d(b.split("/")), g = Math.min(e.length, f.length), h = g, i = 0; i < g; i++) {
            if (e[i] !== f[i]) {
              h = i;break;
            }
          }for (var j = [], i = h; i < e.length; i++) {
            j.push("..");
          }return j = j.concat(f.slice(h)), j.join("/");
        }, c.sep = "/", c.delimiter = ":", c.dirname = function (a) {
          var b = f(a),
              c = b[0],
              d = b[1];return c || d ? (d && (d = d.substr(0, d.length - 1)), c + d) : ".";
        }, c.basename = function (a, b) {
          var c = f(a)[2];return b && c.substr(-1 * b.length) === b && (c = c.substr(0, c.length - b.length)), c;
        }, c.extname = function (a) {
          return f(a)[3];
        };var g = "b" === "ab".substr(-1) ? function (a, b, c) {
          return a.substr(b, c);
        } : function (a, b, c) {
          return b < 0 && (b = a.length + b), a.substr(b, c);
        };
      }).call(this, a("_process"));
    }, { _process: 24 }], 24: [function (a, b, c) {
      function d() {
        throw new Error("setTimeout has not been defined");
      }function e() {
        throw new Error("clearTimeout has not been defined");
      }function f(a) {
        if (l === setTimeout) return setTimeout(a, 0);
        if ((l === d || !l) && setTimeout) return l = setTimeout, setTimeout(a, 0);try {
          return l(a, 0);
        } catch (b) {
          try {
            return l.call(null, a, 0);
          } catch (b) {
            return l.call(this, a, 0);
          }
        }
      }function g(a) {
        if (m === clearTimeout) return clearTimeout(a);if ((m === e || !m) && clearTimeout) return m = clearTimeout, clearTimeout(a);try {
          return m(a);
        } catch (b) {
          try {
            return m.call(null, a);
          } catch (b) {
            return m.call(this, a);
          }
        }
      }function h() {
        q && o && (q = !1, o.length ? p = o.concat(p) : r = -1, p.length && i());
      }function i() {
        if (!q) {
          var a = f(h);q = !0;for (var b = p.length; b;) {
            for (o = p, p = []; ++r < b;) {
              o && o[r].run();
            }r = -1, b = p.length;
          }o = null, q = !1, g(a);
        }
      }function j(a, b) {
        this.fun = a, this.array = b;
      }function k() {}var l,
          m,
          n = b.exports = {};!function () {
        try {
          l = "function" == typeof setTimeout ? setTimeout : d;
        } catch (a) {
          l = d;
        }try {
          m = "function" == typeof clearTimeout ? clearTimeout : e;
        } catch (a) {
          m = e;
        }
      }();var o,
          p = [],
          q = !1,
          r = -1;n.nextTick = function (a) {
        var b = new Array(arguments.length - 1);if (arguments.length > 1) for (var c = 1; c < arguments.length; c++) {
          b[c - 1] = arguments[c];
        }p.push(new j(a, b)), 1 !== p.length || q || f(i);
      }, j.prototype.run = function () {
        this.fun.apply(null, this.array);
      }, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = k, n.addListener = k, n.once = k, n.off = k, n.removeListener = k, n.removeAllListeners = k, n.emit = k, n.prependListener = k, n.prependOnceListener = k, n.listeners = function (a) {
        return [];
      }, n.binding = function (a) {
        throw new Error("process.binding is not supported");
      }, n.cwd = function () {
        return "/";
      }, n.chdir = function (a) {
        throw new Error("process.chdir is not supported");
      }, n.umask = function () {
        return 0;
      };
    }, {}], 25: [function (b, c, d) {
      (function (b) {
        !function (e) {
          function f(a) {
            throw new RangeError(I[a]);
          }function g(a, b) {
            for (var c = a.length, d = []; c--;) {
              d[c] = b(a[c]);
            }return d;
          }function h(a, b) {
            var c = a.split("@"),
                d = "";c.length > 1 && (d = c[0] + "@", a = c[1]), a = a.replace(H, ".");var e = a.split("."),
                f = g(e, b).join(".");return d + f;
          }function i(a) {
            for (var b, c, d = [], e = 0, f = a.length; e < f;) {
              b = a.charCodeAt(e++), b >= 55296 && b <= 56319 && e < f ? (c = a.charCodeAt(e++), 56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b), e--)) : d.push(b);
            }return d;
          }function j(a) {
            return g(a, function (a) {
              var b = "";return a > 65535 && (a -= 65536, b += L(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), b += L(a);
            }).join("");
          }function k(a) {
            return a - 48 < 10 ? a - 22 : a - 65 < 26 ? a - 65 : a - 97 < 26 ? a - 97 : x;
          }function l(a, b) {
            return a + 22 + 75 * (a < 26) - ((0 != b) << 5);
          }function m(a, b, c) {
            var d = 0;for (a = c ? K(a / B) : a >> 1, a += K(a / b); a > J * z >> 1; d += x) {
              a = K(a / J);
            }return K(d + (J + 1) * a / (a + A));
          }function n(a) {
            var b,
                c,
                d,
                e,
                g,
                h,
                i,
                l,
                n,
                o,
                p = [],
                q = a.length,
                r = 0,
                s = D,
                t = C;for (c = a.lastIndexOf(E), c < 0 && (c = 0), d = 0; d < c; ++d) {
              a.charCodeAt(d) >= 128 && f("not-basic"), p.push(a.charCodeAt(d));
            }for (e = c > 0 ? c + 1 : 0; e < q;) {
              for (g = r, h = 1, i = x; e >= q && f("invalid-input"), l = k(a.charCodeAt(e++)), (l >= x || l > K((w - r) / h)) && f("overflow"), r += l * h, n = i <= t ? y : i >= t + z ? z : i - t, !(l < n); i += x) {
                o = x - n, h > K(w / o) && f("overflow"), h *= o;
              }b = p.length + 1, t = m(r - g, b, 0 == g), K(r / b) > w - s && f("overflow"), s += K(r / b), r %= b, p.splice(r++, 0, s);
            }return j(p);
          }function o(a) {
            var b,
                c,
                d,
                e,
                g,
                h,
                j,
                k,
                n,
                o,
                p,
                q,
                r,
                s,
                t,
                u = [];for (a = i(a), q = a.length, b = D, c = 0, g = C, h = 0; h < q; ++h) {
              p = a[h], p < 128 && u.push(L(p));
            }for (d = e = u.length, e && u.push(E); d < q;) {
              for (j = w, h = 0; h < q; ++h) {
                p = a[h], p >= b && p < j && (j = p);
              }for (r = d + 1, j - b > K((w - c) / r) && f("overflow"), c += (j - b) * r, b = j, h = 0; h < q; ++h) {
                if (p = a[h], p < b && ++c > w && f("overflow"), p == b) {
                  for (k = c, n = x; o = n <= g ? y : n >= g + z ? z : n - g, !(k < o); n += x) {
                    t = k - o, s = x - o, u.push(L(l(o + t % s, 0))), k = K(t / s);
                  }u.push(L(l(k, 0))), g = m(c, r, d == e), c = 0, ++d;
                }
              }++c, ++b;
            }return u.join("");
          }function p(a) {
            return h(a, function (a) {
              return F.test(a) ? n(a.slice(4).toLowerCase()) : a;
            });
          }function q(a) {
            return h(a, function (a) {
              return G.test(a) ? "xn--" + o(a) : a;
            });
          }var r = "object" == (typeof d === "undefined" ? "undefined" : _typeof(d)) && d && !d.nodeType && d,
              s = "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && c && !c.nodeType && c,
              t = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;t.global !== t && t.window !== t && t.self !== t || (e = t);var u,
              v,
              w = 2147483647,
              x = 36,
              y = 1,
              z = 26,
              A = 38,
              B = 700,
              C = 72,
              D = 128,
              E = "-",
              F = /^xn--/,
              G = /[^\x20-\x7E]/,
              H = /[\x2E\u3002\uFF0E\uFF61]/g,
              I = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },
              J = x - y,
              K = Math.floor,
              L = String.fromCharCode;if (u = { version: "1.4.1", ucs2: { decode: i, encode: j }, decode: n, encode: o, toASCII: q, toUnicode: p }, "function" == typeof a && "object" == _typeof(a.amd) && a.amd) a("punycode", function () {
            return u;
          });else if (r && s) {
            if (c.exports == r) s.exports = u;else for (v in u) {
              u.hasOwnProperty(v) && (r[v] = u[v]);
            }
          } else e.punycode = u;
        }(this);
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}], 26: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      }b.exports = function (a, b, c, f) {
        b = b || "&", c = c || "=";var g = {};if ("string" != typeof a || 0 === a.length) return g;var h = /\+/g;a = a.split(b);var i = 1e3;f && "number" == typeof f.maxKeys && (i = f.maxKeys);var j = a.length;i > 0 && j > i && (j = i);for (var k = 0; k < j; ++k) {
          var l,
              m,
              n,
              o,
              p = a[k].replace(h, "%20"),
              q = p.indexOf(c);q >= 0 ? (l = p.substr(0, q), m = p.substr(q + 1)) : (l = p, m = ""), n = decodeURIComponent(l), o = decodeURIComponent(m), d(g, n) ? e(g[n]) ? g[n].push(o) : g[n] = [g[n], o] : g[n] = o;
        }return g;
      };var e = Array.isArray || function (a) {
        return "[object Array]" === Object.prototype.toString.call(a);
      };
    }, {}], 27: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (a.map) return a.map(b);for (var c = [], d = 0; d < a.length; d++) {
          c.push(b(a[d], d));
        }return c;
      }var e = function e(a) {
        switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "string":
            return a;case "boolean":
            return a ? "true" : "false";case "number":
            return isFinite(a) ? a : "";default:
            return "";}
      };b.exports = function (a, b, c, h) {
        return b = b || "&", c = c || "=", null === a && (a = void 0), "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? d(g(a), function (g) {
          var h = encodeURIComponent(e(g)) + c;return f(a[g]) ? d(a[g], function (a) {
            return h + encodeURIComponent(e(a));
          }).join(b) : h + encodeURIComponent(e(a[g]));
        }).join(b) : h ? encodeURIComponent(e(h)) + c + encodeURIComponent(e(a)) : "";
      };var f = Array.isArray || function (a) {
        return "[object Array]" === Object.prototype.toString.call(a);
      },
          g = Object.keys || function (a) {
        var b = [];for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
        }return b;
      };
    }, {}], 28: [function (a, b, c) {
      "use strict";
      c.decode = c.parse = a("./decode"), c.encode = c.stringify = a("./encode");
    }, { "./decode": 26, "./encode": 27 }], 29: [function (a, b, c) {
      "use strict";
      function d() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
      }function e(a, b, c) {
        if (a && j.isObject(a) && a instanceof d) return a;var e = new d();return e.parse(a, b, c), e;
      }function f(a) {
        return j.isString(a) && (a = e(a)), a instanceof d ? a.format() : d.prototype.format.call(a);
      }function g(a, b) {
        return e(a, !1, !0).resolve(b);
      }function h(a, b) {
        return a ? e(a, !1, !0).resolveObject(b) : b;
      }var i = a("punycode"),
          j = a("./util");c.parse = e, c.resolve = g, c.resolveObject = h, c.format = f, c.Url = d;var k = /^([a-z0-9.+-]+:)/i,
          l = /:[0-9]*$/,
          m = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
          n = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
          o = ["{", "}", "|", "\\", "^", "`"].concat(n),
          p = ["'"].concat(o),
          q = ["%", "/", "?", ";", "#"].concat(p),
          r = ["/", "?", "#"],
          s = 255,
          t = /^[+a-z0-9A-Z_-]{0,63}$/,
          u = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          v = { javascript: !0, "javascript:": !0 },
          w = { javascript: !0, "javascript:": !0 },
          x = { http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0 },
          y = a("querystring");d.prototype.parse = function (a, b, c) {
        if (!j.isString(a)) throw new TypeError("Parameter 'url' must be a string, not " + (typeof a === "undefined" ? "undefined" : _typeof(a)));var d = a.indexOf("?"),
            e = d !== -1 && d < a.indexOf("#") ? "?" : "#",
            f = a.split(e),
            g = /\\/g;f[0] = f[0].replace(g, "/"), a = f.join(e);var h = a;if (h = h.trim(), !c && 1 === a.split("#").length) {
          var l = m.exec(h);if (l) return this.path = h, this.href = h, this.pathname = l[1], l[2] ? (this.search = l[2], b ? this.query = y.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : b && (this.search = "", this.query = {}), this;
        }var n = k.exec(h);if (n) {
          n = n[0];var o = n.toLowerCase();this.protocol = o, h = h.substr(n.length);
        }if (c || n || h.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var z = "//" === h.substr(0, 2);!z || n && w[n] || (h = h.substr(2), this.slashes = !0);
        }if (!w[n] && (z || n && !x[n])) {
          for (var A = -1, B = 0; B < r.length; B++) {
            var C = h.indexOf(r[B]);C !== -1 && (A === -1 || C < A) && (A = C);
          }var D, E;E = A === -1 ? h.lastIndexOf("@") : h.lastIndexOf("@", A), E !== -1 && (D = h.slice(0, E), h = h.slice(E + 1), this.auth = decodeURIComponent(D)), A = -1;for (var B = 0; B < q.length; B++) {
            var C = h.indexOf(q[B]);C !== -1 && (A === -1 || C < A) && (A = C);
          }A === -1 && (A = h.length), this.host = h.slice(0, A), h = h.slice(A), this.parseHost(), this.hostname = this.hostname || "";var F = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];if (!F) for (var G = this.hostname.split(/\./), B = 0, H = G.length; B < H; B++) {
            var I = G[B];if (I && !I.match(t)) {
              for (var J = "", K = 0, L = I.length; K < L; K++) {
                J += I.charCodeAt(K) > 127 ? "x" : I[K];
              }if (!J.match(t)) {
                var M = G.slice(0, B),
                    N = G.slice(B + 1),
                    O = I.match(u);O && (M.push(O[1]), N.unshift(O[2])), N.length && (h = "/" + N.join(".") + h), this.hostname = M.join(".");break;
              }
            }
          }this.hostname.length > s ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), F || (this.hostname = i.toASCII(this.hostname));var P = this.port ? ":" + this.port : "",
              Q = this.hostname || "";this.host = Q + P, this.href += this.host, F && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== h[0] && (h = "/" + h));
        }if (!v[o]) for (var B = 0, H = p.length; B < H; B++) {
          var R = p[B];if (h.indexOf(R) !== -1) {
            var S = encodeURIComponent(R);S === R && (S = escape(R)), h = h.split(R).join(S);
          }
        }var T = h.indexOf("#");T !== -1 && (this.hash = h.substr(T), h = h.slice(0, T));var U = h.indexOf("?");if (U !== -1 ? (this.search = h.substr(U), this.query = h.substr(U + 1), b && (this.query = y.parse(this.query)), h = h.slice(0, U)) : b && (this.search = "", this.query = {}), h && (this.pathname = h), x[o] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
          var P = this.pathname || "",
              V = this.search || "";this.path = P + V;
        }return this.href = this.format(), this;
      }, d.prototype.format = function () {
        var a = this.auth || "";a && (a = encodeURIComponent(a), a = a.replace(/%3A/i, ":"), a += "@");var b = this.protocol || "",
            c = this.pathname || "",
            d = this.hash || "",
            e = !1,
            f = "";this.host ? e = a + this.host : this.hostname && (e = a + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (e += ":" + this.port)), this.query && j.isObject(this.query) && Object.keys(this.query).length && (f = y.stringify(this.query));var g = this.search || f && "?" + f || "";return b && ":" !== b.substr(-1) && (b += ":"), this.slashes || (!b || x[b]) && e !== !1 ? (e = "//" + (e || ""), c && "/" !== c.charAt(0) && (c = "/" + c)) : e || (e = ""), d && "#" !== d.charAt(0) && (d = "#" + d), g && "?" !== g.charAt(0) && (g = "?" + g), c = c.replace(/[?#]/g, function (a) {
          return encodeURIComponent(a);
        }), g = g.replace("#", "%23"), b + e + c + g + d;
      }, d.prototype.resolve = function (a) {
        return this.resolveObject(e(a, !1, !0)).format();
      }, d.prototype.resolveObject = function (a) {
        if (j.isString(a)) {
          var b = new d();b.parse(a, !1, !0), a = b;
        }for (var c = new d(), e = Object.keys(this), f = 0; f < e.length; f++) {
          var g = e[f];c[g] = this[g];
        }if (c.hash = a.hash, "" === a.href) return c.href = c.format(), c;if (a.slashes && !a.protocol) {
          for (var h = Object.keys(a), i = 0; i < h.length; i++) {
            var k = h[i];"protocol" !== k && (c[k] = a[k]);
          }return x[c.protocol] && c.hostname && !c.pathname && (c.path = c.pathname = "/"), c.href = c.format(), c;
        }if (a.protocol && a.protocol !== c.protocol) {
          if (!x[a.protocol]) {
            for (var l = Object.keys(a), m = 0; m < l.length; m++) {
              var n = l[m];c[n] = a[n];
            }return c.href = c.format(), c;
          }if (c.protocol = a.protocol, a.host || w[a.protocol]) c.pathname = a.pathname;else {
            for (var o = (a.pathname || "").split("/"); o.length && !(a.host = o.shift());) {}a.host || (a.host = ""), a.hostname || (a.hostname = ""), "" !== o[0] && o.unshift(""), o.length < 2 && o.unshift(""), c.pathname = o.join("/");
          }if (c.search = a.search, c.query = a.query, c.host = a.host || "", c.auth = a.auth, c.hostname = a.hostname || a.host, c.port = a.port, c.pathname || c.search) {
            var p = c.pathname || "",
                q = c.search || "";c.path = p + q;
          }return c.slashes = c.slashes || a.slashes, c.href = c.format(), c;
        }var r = c.pathname && "/" === c.pathname.charAt(0),
            s = a.host || a.pathname && "/" === a.pathname.charAt(0),
            t = s || r || c.host && a.pathname,
            u = t,
            v = c.pathname && c.pathname.split("/") || [],
            o = a.pathname && a.pathname.split("/") || [],
            y = c.protocol && !x[c.protocol];if (y && (c.hostname = "", c.port = null, c.host && ("" === v[0] ? v[0] = c.host : v.unshift(c.host)), c.host = "", a.protocol && (a.hostname = null, a.port = null, a.host && ("" === o[0] ? o[0] = a.host : o.unshift(a.host)), a.host = null), t = t && ("" === o[0] || "" === v[0])), s) c.host = a.host || "" === a.host ? a.host : c.host, c.hostname = a.hostname || "" === a.hostname ? a.hostname : c.hostname, c.search = a.search, c.query = a.query, v = o;else if (o.length) v || (v = []), v.pop(), v = v.concat(o), c.search = a.search, c.query = a.query;else if (!j.isNullOrUndefined(a.search)) {
          if (y) {
            c.hostname = c.host = v.shift();var z = !!(c.host && c.host.indexOf("@") > 0) && c.host.split("@");z && (c.auth = z.shift(), c.host = c.hostname = z.shift());
          }return c.search = a.search, c.query = a.query, j.isNull(c.pathname) && j.isNull(c.search) || (c.path = (c.pathname ? c.pathname : "") + (c.search ? c.search : "")), c.href = c.format(), c;
        }if (!v.length) return c.pathname = null, c.search ? c.path = "/" + c.search : c.path = null, c.href = c.format(), c;for (var A = v.slice(-1)[0], B = (c.host || a.host || v.length > 1) && ("." === A || ".." === A) || "" === A, C = 0, D = v.length; D >= 0; D--) {
          A = v[D], "." === A ? v.splice(D, 1) : ".." === A ? (v.splice(D, 1), C++) : C && (v.splice(D, 1), C--);
        }if (!t && !u) for (; C--; C) {
          v.unshift("..");
        }!t || "" === v[0] || v[0] && "/" === v[0].charAt(0) || v.unshift(""), B && "/" !== v.join("/").substr(-1) && v.push("");var E = "" === v[0] || v[0] && "/" === v[0].charAt(0);if (y) {
          c.hostname = c.host = E ? "" : v.length ? v.shift() : "";var z = !!(c.host && c.host.indexOf("@") > 0) && c.host.split("@");z && (c.auth = z.shift(), c.host = c.hostname = z.shift());
        }return t = t || c.host && v.length, t && !E && v.unshift(""), v.length ? c.pathname = v.join("/") : (c.pathname = null, c.path = null), j.isNull(c.pathname) && j.isNull(c.search) || (c.path = (c.pathname ? c.pathname : "") + (c.search ? c.search : "")), c.auth = a.auth || c.auth, c.slashes = c.slashes || a.slashes, c.href = c.format(), c;
      }, d.prototype.parseHost = function () {
        var a = this.host,
            b = l.exec(a);b && (b = b[0], ":" !== b && (this.port = b.substr(1)), a = a.substr(0, a.length - b.length)), a && (this.hostname = a);
      };
    }, { "./util": 30, punycode: 25, querystring: 28 }], 30: [function (a, b, c) {
      "use strict";
      b.exports = { isString: function isString(a) {
          return "string" == typeof a;
        }, isObject: function isObject(a) {
          return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a;
        }, isNull: function isNull(a) {
          return null === a;
        }, isNullOrUndefined: function isNullOrUndefined(a) {
          return null == a;
        } };
    }, {}], 31: [function (a, b, c) {
      "use strict";
      b.exports = function (a, b, c) {
        var d,
            e = a.length;if (!(b >= e || 0 === c)) {
          c = b + c > e ? e - b : c;var f = e - c;for (d = b; d < f; ++d) {
            a[d] = a[d + c];
          }a.length = f;
        }
      };
    }, {}], 32: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a) {
        return a && a.__esModule ? a : { default: a };
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var g = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (a) {
        return typeof a === "undefined" ? "undefined" : _typeof(a);
      } : function (a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a === "undefined" ? "undefined" : _typeof(a);
      },
          h = a("mini-signals"),
          i = e(h),
          j = a("parse-uri"),
          k = e(j),
          l = a("./async"),
          m = d(l),
          n = a("./Resource"),
          o = e(n),
          p = 100,
          q = /(#[\w-]+)?$/,
          r = function () {
        function a() {
          var b = this,
              c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;f(this, a), this.baseUrl = c, this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function (a, c) {
            return b._loadResource(a, c);
          }, this._queue = m.queue(this._boundLoadResource, d), this._queue.pause(), this.resources = {}, this.onProgress = new i.default(), this.onError = new i.default(), this.onLoad = new i.default(), this.onStart = new i.default(), this.onComplete = new i.default();
        }return a.prototype.add = function (a, b, c, d) {
          if (Array.isArray(a)) {
            for (var e = 0; e < a.length; ++e) {
              this.add(a[e]);
            }return this;
          }if ("object" === ("undefined" == typeof a ? "undefined" : g(a)) && (d = b || a.callback || a.onComplete, c = a, b = a.url, a = a.name || a.key || a.url), "string" != typeof b && (d = c, c = b, b = a), "string" != typeof b) throw new Error("No url passed to add resource to loader.");if ("function" == typeof c && (d = c, c = null), this.loading && (!c || !c.parentResource)) throw new Error("Cannot add resources while the loader is running.");if (this.resources[a]) throw new Error('Resource named "' + a + '" already exists.');if (b = this._prepareUrl(b), this.resources[a] = new o.default(a, b, c), "function" == typeof d && this.resources[a].onAfterMiddleware.once(d), this.loading) {
            for (var f = c.parentResource, h = [], i = 0; i < f.children.length; ++i) {
              f.children[i].isComplete || h.push(f.children[i]);
            }var j = f.progressChunk * (h.length + 1),
                k = j / (h.length + 2);f.children.push(this.resources[a]), f.progressChunk = k;for (var l = 0; l < h.length; ++l) {
              h[l].progressChunk = k;
            }this.resources[a].progressChunk = k;
          }return this._queue.push(this.resources[a]), this;
        }, a.prototype.pre = function (a) {
          return this._beforeMiddleware.push(a), this;
        }, a.prototype.use = function (a) {
          return this._afterMiddleware.push(a), this;
        }, a.prototype.reset = function () {
          this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause();for (var a in this.resources) {
            var b = this.resources[a];b._onLoadBinding && b._onLoadBinding.detach(), b.isLoading && b.abort();
          }return this.resources = {}, this;
        }, a.prototype.load = function (a) {
          if ("function" == typeof a && this.onComplete.once(a), this.loading) return this;for (var b = 100 / this._queue._tasks.length, c = 0; c < this._queue._tasks.length; ++c) {
            this._queue._tasks[c].data.progressChunk = b;
          }return this.loading = !0, this.onStart.dispatch(this), this._queue.resume(), this;
        }, a.prototype._prepareUrl = function (a) {
          var b = (0, k.default)(a, { strictMode: !0 }),
              c = void 0;if (c = b.protocol || !b.path || 0 === a.indexOf("//") ? a : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== a.charAt(0) ? this.baseUrl + "/" + a : this.baseUrl + a, this.defaultQueryString) {
            var d = q.exec(c)[0];c = c.substr(0, c.length - d.length), c += c.indexOf("?") !== -1 ? "&" + this.defaultQueryString : "?" + this.defaultQueryString, c += d;
          }return c;
        }, a.prototype._loadResource = function (a, b) {
          var c = this;a._dequeue = b, m.eachSeries(this._beforeMiddleware, function (b, d) {
            b.call(c, a, function () {
              d(a.isComplete ? {} : null);
            });
          }, function () {
            a.isComplete ? c._onLoad(a) : (a._onLoadBinding = a.onComplete.once(c._onLoad, c), a.load());
          }, !0);
        }, a.prototype._onComplete = function () {
          this.loading = !1, this.onComplete.dispatch(this, this.resources);
        }, a.prototype._onLoad = function (a) {
          var b = this;a._onLoadBinding = null, this._resourcesParsing.push(a), a._dequeue(), m.eachSeries(this._afterMiddleware, function (c, d) {
            c.call(b, a, d);
          }, function () {
            a.onAfterMiddleware.dispatch(a), b.progress += a.progressChunk, b.onProgress.dispatch(b, a), a.error ? b.onError.dispatch(a.error, b, a) : b.onLoad.dispatch(b, a), b._resourcesParsing.splice(b._resourcesParsing.indexOf(a), 1), b._queue.idle() && 0 === b._resourcesParsing.length && (b.progress = p, b._onComplete());
          }, !0);
        }, a;
      }();c.default = r;
    }, { "./Resource": 33, "./async": 34, "mini-signals": 38, "parse-uri": 39 }], 33: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f() {}function g(a, b, c) {
        b && 0 === b.indexOf(".") && (b = b.substring(1)), b && (a[b] = c);
      }function h(a) {
        return a.toString().replace("object ", "");
      }c.__esModule = !0;var i = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          j = a("parse-uri"),
          k = d(j),
          l = a("mini-signals"),
          m = d(l),
          n = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest()),
          o = null,
          p = 0,
          q = 200,
          r = 204,
          s = 1223,
          t = 2,
          u = function () {
        function a(b, c, d) {
          if (e(this, a), "string" != typeof b || "string" != typeof c) throw new Error("Both name and url are required for constructing a resource.");d = d || {}, this._flags = 0, this._setFlag(a.STATUS_FLAGS.DATA_URL, 0 === c.indexOf("data:")), this.name = b, this.url = c, this.extension = this._getExtension(), this.data = null, this.crossOrigin = d.crossOrigin === !0 ? "anonymous" : d.crossOrigin, this.loadType = d.loadType || this._determineLoadType(), this.xhrType = d.xhrType, this.metadata = d.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = a.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = f, this._onLoadBinding = null, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this), this.onStart = new m.default(), this.onProgress = new m.default(), this.onComplete = new m.default(), this.onAfterMiddleware = new m.default();
        }return a.setExtensionLoadType = function (b, c) {
          g(a._loadTypeMap, b, c);
        }, a.setExtensionXhrType = function (b, c) {
          g(a._xhrTypeMap, b, c);
        }, a.prototype.complete = function () {
          if (this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null)), this.isComplete) throw new Error("Complete called again for an already completed resource.");this._setFlag(a.STATUS_FLAGS.COMPLETE, !0), this._setFlag(a.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this);
        }, a.prototype.abort = function (b) {
          if (!this.error) {
            if (this.error = new Error(b), this.xhr) this.xhr.abort();else if (this.xdr) this.xdr.abort();else if (this.data) if (this.data.src) this.data.src = a.EMPTY_GIF;else for (; this.data.firstChild;) {
              this.data.removeChild(this.data.firstChild);
            }this.complete();
          }
        }, a.prototype.load = function (b) {
          var c = this;if (!this.isLoading) {
            if (this.isComplete) return void (b && setTimeout(function () {
              return b(c);
            }, 1));switch (b && this.onComplete.once(b), this._setFlag(a.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), this.crossOrigin !== !1 && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {case a.LOAD_TYPE.IMAGE:
                this.type = a.TYPE.IMAGE, this._loadElement("image");break;case a.LOAD_TYPE.AUDIO:
                this.type = a.TYPE.AUDIO, this._loadSourceElement("audio");break;case a.LOAD_TYPE.VIDEO:
                this.type = a.TYPE.VIDEO, this._loadSourceElement("video");break;case a.LOAD_TYPE.XHR:default:
                n && this.crossOrigin ? this._loadXdr() : this._loadXhr();}
          }
        }, a.prototype._hasFlag = function (a) {
          return !!(this._flags & a);
        }, a.prototype._setFlag = function (a, b) {
          this._flags = b ? this._flags | a : this._flags & ~a;
        }, a.prototype._loadElement = function (a) {
          this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === a && "undefined" != typeof window.Image ? this.data = new Image() : this.data = document.createElement(a), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1);
        }, a.prototype._loadSourceElement = function (a) {
          if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === a && "undefined" != typeof window.Audio ? this.data = new Audio() : this.data = document.createElement(a), null === this.data) return void this.abort("Unsupported element: " + a);if (!this.metadata.skipSource) if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;else if (Array.isArray(this.url)) for (var b = this.metadata.mimeType, c = 0; c < this.url.length; ++c) {
            this.data.appendChild(this._createSource(a, this.url[c], Array.isArray(b) ? b[c] : b));
          } else {
            var d = this.metadata.mimeType;this.data.appendChild(this._createSource(a, this.url, Array.isArray(d) ? d[0] : d));
          }this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load();
        }, a.prototype._loadXhr = function () {
          "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());var b = this.xhr = new XMLHttpRequest();b.open("GET", this.url, !0), this.xhrType === a.XHR_RESPONSE_TYPE.JSON || this.xhrType === a.XHR_RESPONSE_TYPE.DOCUMENT ? b.responseType = a.XHR_RESPONSE_TYPE.TEXT : b.responseType = this.xhrType, b.addEventListener("error", this._boundXhrOnError, !1), b.addEventListener("abort", this._boundXhrOnAbort, !1), b.addEventListener("progress", this._boundOnProgress, !1), b.addEventListener("load", this._boundXhrOnLoad, !1), b.send();
        }, a.prototype._loadXdr = function () {
          "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());var a = this.xhr = new XDomainRequest();a.timeout = 5e3, a.onerror = this._boundXhrOnError, a.ontimeout = this._boundXdrOnTimeout, a.onprogress = this._boundOnProgress, a.onload = this._boundXhrOnLoad, a.open("GET", this.url, !0), setTimeout(function () {
            return a.send();
          }, 1);
        }, a.prototype._createSource = function (a, b, c) {
          c || (c = a + "/" + this._getExtension(b));var d = document.createElement("source");return d.src = b, d.type = c, d;
        }, a.prototype._onError = function (a) {
          this.abort("Failed to load element using: " + a.target.nodeName);
        }, a.prototype._onProgress = function (a) {
          a && a.lengthComputable && this.onProgress.dispatch(this, a.loaded / a.total);
        }, a.prototype._xhrOnError = function () {
          var a = this.xhr;this.abort(h(a) + " Request failed. Status: " + a.status + ', text: "' + a.statusText + '"');
        }, a.prototype._xhrOnAbort = function () {
          this.abort(h(this.xhr) + " Request was aborted by the user.");
        }, a.prototype._xdrOnTimeout = function () {
          this.abort(h(this.xhr) + " Request timed out.");
        }, a.prototype._xhrOnLoad = function () {
          var b = this.xhr,
              c = "",
              d = "undefined" == typeof b.status ? q : b.status;"" !== b.responseType && "text" !== b.responseType && "undefined" != typeof b.responseType || (c = b.responseText), d === p && c.length > 0 ? d = q : d === s && (d = r);var e = d / 100 | 0;if (e !== t) return void this.abort("[" + b.status + "] " + b.statusText + ": " + b.responseURL);if (this.xhrType === a.XHR_RESPONSE_TYPE.TEXT) this.data = c, this.type = a.TYPE.TEXT;else if (this.xhrType === a.XHR_RESPONSE_TYPE.JSON) try {
            this.data = JSON.parse(c), this.type = a.TYPE.JSON;
          } catch (a) {
            return void this.abort("Error trying to parse loaded json: " + a);
          } else if (this.xhrType === a.XHR_RESPONSE_TYPE.DOCUMENT) try {
            if (window.DOMParser) {
              var f = new DOMParser();this.data = f.parseFromString(c, "text/xml");
            } else {
              var g = document.createElement("div");g.innerHTML = c, this.data = g;
            }this.type = a.TYPE.XML;
          } catch (a) {
            return void this.abort("Error trying to parse loaded xml: " + a);
          } else this.data = b.response || c;this.complete();
        }, a.prototype._determineCrossOrigin = function (a, b) {
          if (0 === a.indexOf("data:")) return "";b = b || window.location, o || (o = document.createElement("a")), o.href = a, a = (0, k.default)(o.href, { strictMode: !0 });var c = !a.port && "" === b.port || a.port === b.port,
              d = a.protocol ? a.protocol + ":" : "";return a.host === b.hostname && c && d === b.protocol ? "" : "anonymous";
        }, a.prototype._determineXhrType = function () {
          return a._xhrTypeMap[this.extension] || a.XHR_RESPONSE_TYPE.TEXT;
        }, a.prototype._determineLoadType = function () {
          return a._loadTypeMap[this.extension] || a.LOAD_TYPE.XHR;
        }, a.prototype._getExtension = function () {
          var a = this.url,
              b = "";if (this.isDataUrl) {
            var c = a.indexOf("/");b = a.substring(c + 1, a.indexOf(";", c));
          } else {
            var d = a.indexOf("?"),
                e = a.indexOf("#"),
                f = Math.min(d > -1 ? d : a.length, e > -1 ? e : a.length);a = a.substring(0, f), b = a.substring(a.lastIndexOf(".") + 1);
          }return b.toLowerCase();
        }, a.prototype._getMimeFromXhrType = function (b) {
          switch (b) {case a.XHR_RESPONSE_TYPE.BUFFER:
              return "application/octet-binary";case a.XHR_RESPONSE_TYPE.BLOB:
              return "application/blob";case a.XHR_RESPONSE_TYPE.DOCUMENT:
              return "application/xml";case a.XHR_RESPONSE_TYPE.JSON:
              return "application/json";case a.XHR_RESPONSE_TYPE.DEFAULT:case a.XHR_RESPONSE_TYPE.TEXT:default:
              return "text/plain";}
        }, i(a, [{ key: "isDataUrl", get: function get() {
            return this._hasFlag(a.STATUS_FLAGS.DATA_URL);
          } }, { key: "isComplete", get: function get() {
            return this._hasFlag(a.STATUS_FLAGS.COMPLETE);
          } }, { key: "isLoading", get: function get() {
            return this._hasFlag(a.STATUS_FLAGS.LOADING);
          } }]), a;
      }();c.default = u, u.STATUS_FLAGS = { NONE: 0, DATA_URL: 1, COMPLETE: 2, LOADING: 4 }, u.TYPE = { UNKNOWN: 0, JSON: 1, XML: 2, IMAGE: 3, AUDIO: 4, VIDEO: 5, TEXT: 6 }, u.LOAD_TYPE = { XHR: 1, IMAGE: 2, AUDIO: 3, VIDEO: 4 }, u.XHR_RESPONSE_TYPE = { DEFAULT: "text", BUFFER: "arraybuffer", BLOB: "blob", DOCUMENT: "document", JSON: "json", TEXT: "text" }, u._loadTypeMap = { gif: u.LOAD_TYPE.IMAGE, png: u.LOAD_TYPE.IMAGE, bmp: u.LOAD_TYPE.IMAGE, jpg: u.LOAD_TYPE.IMAGE, jpeg: u.LOAD_TYPE.IMAGE, tif: u.LOAD_TYPE.IMAGE, tiff: u.LOAD_TYPE.IMAGE, webp: u.LOAD_TYPE.IMAGE, tga: u.LOAD_TYPE.IMAGE, svg: u.LOAD_TYPE.IMAGE, "svg+xml": u.LOAD_TYPE.IMAGE, mp3: u.LOAD_TYPE.AUDIO, ogg: u.LOAD_TYPE.AUDIO, wav: u.LOAD_TYPE.AUDIO, mp4: u.LOAD_TYPE.VIDEO, webm: u.LOAD_TYPE.VIDEO }, u._xhrTypeMap = { xhtml: u.XHR_RESPONSE_TYPE.DOCUMENT, html: u.XHR_RESPONSE_TYPE.DOCUMENT, htm: u.XHR_RESPONSE_TYPE.DOCUMENT, xml: u.XHR_RESPONSE_TYPE.DOCUMENT, tmx: u.XHR_RESPONSE_TYPE.DOCUMENT, svg: u.XHR_RESPONSE_TYPE.DOCUMENT, tsx: u.XHR_RESPONSE_TYPE.DOCUMENT, gif: u.XHR_RESPONSE_TYPE.BLOB, png: u.XHR_RESPONSE_TYPE.BLOB, bmp: u.XHR_RESPONSE_TYPE.BLOB, jpg: u.XHR_RESPONSE_TYPE.BLOB, jpeg: u.XHR_RESPONSE_TYPE.BLOB, tif: u.XHR_RESPONSE_TYPE.BLOB, tiff: u.XHR_RESPONSE_TYPE.BLOB, webp: u.XHR_RESPONSE_TYPE.BLOB, tga: u.XHR_RESPONSE_TYPE.BLOB, json: u.XHR_RESPONSE_TYPE.JSON, text: u.XHR_RESPONSE_TYPE.TEXT, txt: u.XHR_RESPONSE_TYPE.TEXT, ttf: u.XHR_RESPONSE_TYPE.BUFFER, otf: u.XHR_RESPONSE_TYPE.BUFFER }, u.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    }, { "mini-signals": 38, "parse-uri": 39 }], 34: [function (a, b, c) {
      "use strict";
      function d() {}function e(a, b, c, d) {
        var e = 0,
            f = a.length;!function g(h) {
          return h || e === f ? void (c && c(h)) : void (d ? setTimeout(function () {
            b(a[e++], g);
          }, 1) : b(a[e++], g));
        }();
      }function f(a) {
        return function () {
          if (null === a) throw new Error("Callback was already called.");var b = a;a = null, b.apply(this, arguments);
        };
      }function g(a, b) {
        function c(a, b, c) {
          if (null != c && "function" != typeof c) throw new Error("task callback must be a function");if (h.started = !0, null == a && h.idle()) return void setTimeout(function () {
            return h.drain();
          }, 1);var e = { data: a, callback: "function" == typeof c ? c : d };b ? h._tasks.unshift(e) : h._tasks.push(e), setTimeout(function () {
            return h.process();
          }, 1);
        }function e(a) {
          return function () {
            g -= 1, a.callback.apply(a, arguments), null != arguments[0] && h.error(arguments[0], a.data), g <= h.concurrency - h.buffer && h.unsaturated(), h.idle() && h.drain(), h.process();
          };
        }if (null == b) b = 1;else if (0 === b) throw new Error("Concurrency must not be zero");var g = 0,
            h = { _tasks: [], concurrency: b, saturated: d, unsaturated: d, buffer: b / 4, empty: d, drain: d, error: d, started: !1, paused: !1, push: function push(a, b) {
            c(a, !1, b);
          }, kill: function kill() {
            g = 0, h.drain = d, h.started = !1, h._tasks = [];
          }, unshift: function unshift(a, b) {
            c(a, !0, b);
          }, process: function process() {
            for (; !h.paused && g < h.concurrency && h._tasks.length;) {
              var b = h._tasks.shift();0 === h._tasks.length && h.empty(), g += 1, g === h.concurrency && h.saturated(), a(b.data, f(e(b)));
            }
          }, length: function length() {
            return h._tasks.length;
          }, running: function running() {
            return g;
          }, idle: function idle() {
            return h._tasks.length + g === 0;
          }, pause: function pause() {
            h.paused !== !0 && (h.paused = !0);
          }, resume: function resume() {
            if (h.paused !== !1) {
              h.paused = !1;for (var a = 1; a <= h.concurrency; a++) {
                h.process();
              }
            }
          } };return h;
      }c.__esModule = !0, c.eachSeries = e, c.queue = g;
    }, {}], 35: [function (a, b, c) {
      "use strict";
      function d(a) {
        for (var b = "", c = 0; c < a.length;) {
          for (var d = [0, 0, 0], f = [0, 0, 0, 0], g = 0; g < d.length; ++g) {
            c < a.length ? d[g] = 255 & a.charCodeAt(c++) : d[g] = 0;
          }f[0] = d[0] >> 2, f[1] = (3 & d[0]) << 4 | d[1] >> 4, f[2] = (15 & d[1]) << 2 | d[2] >> 6, f[3] = 63 & d[2];var h = c - (a.length - 1);switch (h) {case 2:
              f[3] = 64, f[2] = 64;break;case 1:
              f[3] = 64;}for (var i = 0; i < f.length; ++i) {
            b += e.charAt(f[i]);
          }
        }return b;
      }c.__esModule = !0, c.encodeBinary = d;var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    }, {}], 36: [function (a, b, c) {
      "use strict";
      var d = a("./Loader").default,
          e = a("./Resource").default,
          f = a("./async"),
          g = a("./b64");d.Resource = e, d.async = f, d.base64 = g, b.exports = d, b.exports.default = d;
    }, { "./Loader": 32, "./Resource": 33, "./async": 34, "./b64": 35 }], 37: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e() {
        return function (a, b) {
          if (!a.data) return void b();if (a.xhr && a.xhrType === h.default.XHR_RESPONSE_TYPE.BLOB) if (window.Blob && "string" != typeof a.data) {
            if (0 === a.data.type.indexOf("image")) {
              var c = function () {
                var c = k.createObjectURL(a.data);return a.blob = a.data, a.data = new Image(), a.data.src = c, a.type = h.default.TYPE.IMAGE, a.data.onload = function () {
                  k.revokeObjectURL(c), a.data.onload = null, b();
                }, { v: void 0
                };
              }();if ("object" === ("undefined" == typeof c ? "undefined" : f(c))) return c.v;
            }
          } else {
            var d = a.xhr.getResponseHeader("content-type");if (d && 0 === d.indexOf("image")) return a.data = new Image(), a.data.src = "data:" + d + ";base64," + j.default.encodeBinary(a.xhr.responseText), a.type = h.default.TYPE.IMAGE, void (a.data.onload = function () {
              a.data.onload = null, b();
            });
          }b();
        };
      }c.__esModule = !0;var f = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (a) {
        return typeof a === "undefined" ? "undefined" : _typeof(a);
      } : function (a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a === "undefined" ? "undefined" : _typeof(a);
      };c.blobMiddlewareFactory = e;var g = a("../../Resource"),
          h = d(g),
          i = a("../../b64"),
          j = d(i),
          k = window.URL || window.webkitURL;
    }, { "../../Resource": 33, "../../b64": 35 }], 38: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function e(a, b) {
        return a._head ? (a._tail._next = b, b._prev = a._tail, a._tail = b) : (a._head = b, a._tail = b), b._owner = a, b;
      }Object.defineProperty(c, "__esModule", { value: !0 });var f = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          g = function () {
        function a(b, c, e) {
          void 0 === c && (c = !1), d(this, a), this._fn = b, this._once = c, this._thisArg = e, this._next = this._prev = this._owner = null;
        }return f(a, [{ key: "detach", value: function value() {
            return null !== this._owner && (this._owner.detach(this), !0);
          } }]), a;
      }(),
          h = function () {
        function a() {
          d(this, a), this._head = this._tail = void 0;
        }return f(a, [{ key: "handlers", value: function value() {
            var a = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0],
                b = this._head;if (a) return !!b;for (var c = []; b;) {
              c.push(b), b = b._next;
            }return c;
          } }, { key: "has", value: function value(a) {
            if (!(a instanceof g)) throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");return a._owner === this;
          } }, { key: "dispatch", value: function value() {
            var a = this._head;if (!a) return !1;for (; a;) {
              a._once && this.detach(a), a._fn.apply(a._thisArg, arguments), a = a._next;
            }return !0;
          } }, { key: "add", value: function value(a) {
            var b = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];if ("function" != typeof a) throw new Error("MiniSignal#add(): First arg must be a Function.");return e(this, new g(a, !1, b));
          } }, { key: "once", value: function value(a) {
            var b = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];if ("function" != typeof a) throw new Error("MiniSignal#once(): First arg must be a Function.");return e(this, new g(a, !0, b));
          } }, { key: "detach", value: function value(a) {
            if (!(a instanceof g)) throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");return a._owner !== this ? this : (a._prev && (a._prev._next = a._next), a._next && (a._next._prev = a._prev), a === this._head ? (this._head = a._next, null === a._next && (this._tail = null)) : a === this._tail && (this._tail = a._prev, this._tail._next = null), a._owner = null, this);
          } }, { key: "detachAll", value: function value() {
            var a = this._head;if (!a) return this;for (this._head = this._tail = null; a;) {
              a._owner = null, a = a._next;
            }return this;
          } }]), a;
      }();h.MiniSignalBinding = g, c.default = h, b.exports = c.default;
    }, {}], 39: [function (a, b, c) {
      "use strict";
      b.exports = function (a, b) {
        b = b || {};for (var c = { key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], q: { name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g }, parser: { strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/, loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ } }, d = c.parser[b.strictMode ? "strict" : "loose"].exec(a), e = {}, f = 14; f--;) {
          e[c.key[f]] = d[f] || "";
        }return e[c.q.name] = {}, e[c.key[12]].replace(c.q.parser, function (a, b, d) {
          b && (e[c.q.name][b] = d);
        }), e;
      };
    }, {}], 40: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var g = a("../core"),
          h = e(g),
          i = a("ismobilejs"),
          j = d(i),
          k = a("./accessibleTarget"),
          l = d(k);h.utils.mixins.delayMixin(h.DisplayObject.prototype, l.default);var m = 9,
          n = 100,
          o = 0,
          p = 0,
          q = 2,
          r = 1,
          s = -1e3,
          t = -1e3,
          u = 2,
          v = function () {
        function a(b) {
          f(this, a), !j.default.tablet && !j.default.phone || navigator.isCocoonJS || this.createTouchHook();var c = document.createElement("div");c.style.width = n + "px", c.style.height = n + "px", c.style.position = "absolute", c.style.top = o + "px", c.style.left = p + "px", c.style.zIndex = q, this.div = c, this.pool = [], this.renderId = 0, this.debug = !1, this.renderer = b, this.children = [], this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this.isActive = !1, this.isMobileAccessabillity = !1, window.addEventListener("keydown", this._onKeyDown, !1);
        }return a.prototype.createTouchHook = function () {
          var a = this,
              b = document.createElement("button");b.style.width = r + "px", b.style.height = r + "px", b.style.position = "absolute", b.style.top = s + "px", b.style.left = t + "px", b.style.zIndex = u, b.style.backgroundColor = "#FF0000", b.title = "HOOK DIV", b.addEventListener("focus", function () {
            a.isMobileAccessabillity = !0, a.activate(), document.body.removeChild(b);
          }), document.body.appendChild(b);
        }, a.prototype.activate = function () {
          this.isActive || (this.isActive = !0, window.document.addEventListener("mousemove", this._onMouseMove, !0), window.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), this.renderer.view.parentNode && this.renderer.view.parentNode.appendChild(this.div));
        }, a.prototype.deactivate = function () {
          this.isActive && !this.isMobileAccessabillity && (this.isActive = !1, window.document.removeEventListener("mousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), this.div.parentNode && this.div.parentNode.removeChild(this.div));
        }, a.prototype.updateAccessibleObjects = function (a) {
          if (a.visible) {
            a.accessible && a.interactive && (a._accessibleActive || this.addChild(a), a.renderId = this.renderId);for (var b = a.children, c = b.length - 1; c >= 0; c--) {
              this.updateAccessibleObjects(b[c]);
            }
          }
        }, a.prototype.update = function () {
          if (this.renderer.renderingToScreen) {
            this.updateAccessibleObjects(this.renderer._lastObjectRendered);var a = this.renderer.view.getBoundingClientRect(),
                b = a.width / this.renderer.width,
                c = a.height / this.renderer.height,
                d = this.div;d.style.left = a.left + "px", d.style.top = a.top + "px", d.style.width = this.renderer.width + "px", d.style.height = this.renderer.height + "px";for (var e = 0; e < this.children.length; e++) {
              var f = this.children[e];if (f.renderId !== this.renderId) f._accessibleActive = !1, h.utils.removeItems(this.children, e, 1), this.div.removeChild(f._accessibleDiv), this.pool.push(f._accessibleDiv), f._accessibleDiv = null, e--, 0 === this.children.length && this.deactivate();else {
                d = f._accessibleDiv;var g = f.hitArea,
                    i = f.worldTransform;f.hitArea ? (d.style.left = (i.tx + g.x * i.a) * b + "px", d.style.top = (i.ty + g.y * i.d) * c + "px", d.style.width = g.width * i.a * b + "px", d.style.height = g.height * i.d * c + "px") : (g = f.getBounds(), this.capHitArea(g), d.style.left = g.x * b + "px", d.style.top = g.y * c + "px", d.style.width = g.width * b + "px", d.style.height = g.height * c + "px");
              }
            }this.renderId++;
          }
        }, a.prototype.capHitArea = function (a) {
          a.x < 0 && (a.width += a.x, a.x = 0), a.y < 0 && (a.height += a.y, a.y = 0), a.x + a.width > this.renderer.width && (a.width = this.renderer.width - a.x), a.y + a.height > this.renderer.height && (a.height = this.renderer.height - a.y);
        }, a.prototype.addChild = function (a) {
          var b = this.pool.pop();b || (b = document.createElement("button"), b.style.width = n + "px", b.style.height = n + "px", b.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent", b.style.position = "absolute", b.style.zIndex = q, b.style.borderStyle = "none", b.addEventListener("click", this._onClick.bind(this)), b.addEventListener("focus", this._onFocus.bind(this)), b.addEventListener("focusout", this._onFocusOut.bind(this))), a.accessibleTitle ? b.title = a.accessibleTitle : a.accessibleTitle || a.accessibleHint || (b.title = "displayObject " + this.tabIndex), a.accessibleHint && b.setAttribute("aria-label", a.accessibleHint), a._accessibleActive = !0, a._accessibleDiv = b, b.displayObject = a, this.children.push(a), this.div.appendChild(a._accessibleDiv), a._accessibleDiv.tabIndex = a.tabIndex;
        }, a.prototype._onClick = function (a) {
          var b = this.renderer.plugins.interaction;b.dispatchEvent(a.target.displayObject, "click", b.eventData);
        }, a.prototype._onFocus = function (a) {
          var b = this.renderer.plugins.interaction;b.dispatchEvent(a.target.displayObject, "mouseover", b.eventData);
        }, a.prototype._onFocusOut = function (a) {
          var b = this.renderer.plugins.interaction;b.dispatchEvent(a.target.displayObject, "mouseout", b.eventData);
        }, a.prototype._onKeyDown = function (a) {
          a.keyCode === m && this.activate();
        }, a.prototype._onMouseMove = function () {
          this.deactivate();
        }, a.prototype.destroy = function () {
          this.div = null;for (var a = 0; a < this.children.length; a++) {
            this.children[a].div = null;
          }window.document.removeEventListener("mousemove", this._onMouseMove), window.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null;
        }, a;
      }();c.default = v, h.WebGLRenderer.registerPlugin("accessibility", v), h.CanvasRenderer.registerPlugin("accessibility", v);
    }, { "../core": 65, "./accessibleTarget": 41, ismobilejs: 4 }], 41: [function (a, b, c) {
      "use strict";
      c.__esModule = !0, c.default = { accessible: !1, accessibleTitle: null, accessibleHint: null, tabIndex: 0, _accessibleActive: !1, _accessibleDiv: !1 };
    }, {}], 42: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0;var e = a("./accessibleTarget");Object.defineProperty(c, "accessibleTarget", { enumerable: !0, get: function get() {
          return d(e).default;
        } });var f = a("./AccessibilityManager");Object.defineProperty(c, "AccessibilityManager", { enumerable: !0, get: function get() {
          return d(f).default;
        } });
    }, { "./AccessibilityManager": 40, "./accessibleTarget": 41 }], 43: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          g = a("./autoDetectRenderer"),
          h = a("./display/Container"),
          i = d(h),
          j = a("./ticker"),
          k = a("./settings"),
          l = d(k),
          m = a("./const"),
          n = function () {
        function a(b, c, d, f, h) {
          e(this, a), "number" == typeof b && (b = Object.assign({ width: b, height: c || l.default.RENDER_OPTIONS.height, forceCanvas: !!f, sharedTicker: !!h }, d)), this._options = b = Object.assign({ autoStart: !0, sharedTicker: !1, forceCanvas: !1, sharedLoader: !1 }, b), this.renderer = (0, g.autoDetectRenderer)(b), this.stage = new i.default(), this._ticker = null, this.ticker = b.sharedTicker ? j.shared : new j.Ticker(), b.autoStart && this.start();
        }return a.prototype.render = function () {
          this.renderer.render(this.stage);
        }, a.prototype.stop = function () {
          this._ticker.stop();
        }, a.prototype.start = function () {
          this._ticker.start();
        }, a.prototype.destroy = function (a) {
          var b = this._ticker;this.ticker = null, b.destroy(), this.stage.destroy(), this.stage = null, this.renderer.destroy(a), this.renderer = null, this._options = null;
        }, f(a, [{ key: "ticker", set: function set(a) {
            this._ticker && this._ticker.remove(this.render, this), this._ticker = a, a && a.add(this.render, this, m.UPDATE_PRIORITY.LOW);
          }, get: function get() {
            return this._ticker;
          } }, { key: "view", get: function get() {
            return this.renderer.view;
          } }, { key: "screen", get: function get() {
            return this.renderer.screen;
          } }]), a;
      }();c.default = n;
    }, { "./autoDetectRenderer": 45, "./const": 46, "./display/Container": 48, "./settings": 101, "./ticker": 121 }], 44: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }function h(a, b) {
        if (a instanceof Array) {
          if ("precision" !== a[0].substring(0, 9)) {
            var c = a.slice(0);return c.unshift("precision " + b + " float;"), c;
          }
        } else if ("precision" !== a.substring(0, 9)) return "precision " + b + " float;\n" + a;return a;
      }c.__esModule = !0;var i = a("pixi-gl-core"),
          j = a("./settings"),
          k = d(j),
          l = function (a) {
        function b(c, d, g) {
          return e(this, b), f(this, a.call(this, c, h(d, k.default.PRECISION_VERTEX), h(g, k.default.PRECISION_FRAGMENT)));
        }return g(b, a), b;
      }(i.GLShader);c.default = l;
    }, { "./settings": 101, "pixi-gl-core": 12 }], 45: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b, c, d) {
        var e = a && a.forceCanvas;return void 0 !== d && (e = d), !e && h.isWebGLSupported() ? new l.default(a, b, c) : new j.default(a, b, c);
      }c.__esModule = !0, c.autoDetectRenderer = f;var g = a("./utils"),
          h = e(g),
          i = a("./renderers/canvas/CanvasRenderer"),
          j = d(i),
          k = a("./renderers/webgl/WebGLRenderer"),
          l = d(k);
    }, { "./renderers/canvas/CanvasRenderer": 77, "./renderers/webgl/WebGLRenderer": 84, "./utils": 125 }], 46: [function (a, b, c) {
      "use strict";
      c.__esModule = !0;c.VERSION = "4.6.1", c.PI_2 = 2 * Math.PI, c.RAD_TO_DEG = 180 / Math.PI, c.DEG_TO_RAD = Math.PI / 180, c.RENDERER_TYPE = { UNKNOWN: 0, WEBGL: 1, CANVAS: 2 }, c.BLEND_MODES = { NORMAL: 0, ADD: 1, MULTIPLY: 2, SCREEN: 3, OVERLAY: 4, DARKEN: 5, LIGHTEN: 6, COLOR_DODGE: 7, COLOR_BURN: 8, HARD_LIGHT: 9, SOFT_LIGHT: 10, DIFFERENCE: 11, EXCLUSION: 12, HUE: 13, SATURATION: 14, COLOR: 15, LUMINOSITY: 16, NORMAL_NPM: 17, ADD_NPM: 18, SCREEN_NPM: 19 }, c.DRAW_MODES = { POINTS: 0, LINES: 1, LINE_LOOP: 2, LINE_STRIP: 3, TRIANGLES: 4, TRIANGLE_STRIP: 5, TRIANGLE_FAN: 6 }, c.SCALE_MODES = { LINEAR: 0, NEAREST: 1 }, c.WRAP_MODES = { CLAMP: 0, REPEAT: 1, MIRRORED_REPEAT: 2 }, c.GC_MODES = { AUTO: 0, MANUAL: 1 }, c.URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i, c.DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;(charset=[\w-]+|base64))?,(.*)/i, c.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, c.SHAPES = { POLY: 0, RECT: 1, CIRC: 2, ELIP: 3, RREC: 4 }, c.PRECISION = { LOW: "lowp", MEDIUM: "mediump", HIGH: "highp" }, c.TRANSFORM_MODE = { STATIC: 0, DYNAMIC: 1 }, c.TEXT_GRADIENT = { LINEAR_VERTICAL: 0, LINEAR_HORIZONTAL: 1 }, c.UPDATE_PRIORITY = { INTERACTION: 50, HIGH: 25, NORMAL: 0, LOW: -25, UTILITY: -50 };
    }, {}], 47: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = a("../math"),
          f = function () {
        function a() {
          d(this, a), this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0), this.rect = null;
        }return a.prototype.isEmpty = function () {
          return this.minX > this.maxX || this.minY > this.maxY;
        }, a.prototype.clear = function () {
          this.updateID++, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0);
        }, a.prototype.getRectangle = function (a) {
          return this.minX > this.maxX || this.minY > this.maxY ? e.Rectangle.EMPTY : (a = a || new e.Rectangle(0, 0, 1, 1), a.x = this.minX, a.y = this.minY, a.width = this.maxX - this.minX, a.height = this.maxY - this.minY, a);
        }, a.prototype.addPoint = function (a) {
          this.minX = Math.min(this.minX, a.x), this.maxX = Math.max(this.maxX, a.x), this.minY = Math.min(this.minY, a.y), this.maxY = Math.max(this.maxY, a.y);
        }, a.prototype.addQuad = function (a) {
          var b = this.minX,
              c = this.minY,
              d = this.maxX,
              e = this.maxY,
              f = a[0],
              g = a[1];b = f < b ? f : b, c = g < c ? g : c, d = f > d ? f : d, e = g > e ? g : e, f = a[2], g = a[3], b = f < b ? f : b, c = g < c ? g : c, d = f > d ? f : d, e = g > e ? g : e, f = a[4], g = a[5], b = f < b ? f : b, c = g < c ? g : c, d = f > d ? f : d, e = g > e ? g : e, f = a[6], g = a[7], b = f < b ? f : b, c = g < c ? g : c, d = f > d ? f : d, e = g > e ? g : e, this.minX = b, this.minY = c, this.maxX = d, this.maxY = e;
        }, a.prototype.addFrame = function (a, b, c, d, e) {
          var f = a.worldTransform,
              g = f.a,
              h = f.b,
              i = f.c,
              j = f.d,
              k = f.tx,
              l = f.ty,
              m = this.minX,
              n = this.minY,
              o = this.maxX,
              p = this.maxY,
              q = g * b + i * c + k,
              r = h * b + j * c + l;m = q < m ? q : m, n = r < n ? r : n, o = q > o ? q : o, p = r > p ? r : p, q = g * d + i * c + k, r = h * d + j * c + l, m = q < m ? q : m, n = r < n ? r : n, o = q > o ? q : o, p = r > p ? r : p, q = g * b + i * e + k, r = h * b + j * e + l, m = q < m ? q : m, n = r < n ? r : n, o = q > o ? q : o, p = r > p ? r : p, q = g * d + i * e + k, r = h * d + j * e + l, m = q < m ? q : m, n = r < n ? r : n, o = q > o ? q : o, p = r > p ? r : p, this.minX = m, this.minY = n, this.maxX = o, this.maxY = p;
        }, a.prototype.addVertices = function (a, b, c, d) {
          for (var e = a.worldTransform, f = e.a, g = e.b, h = e.c, i = e.d, j = e.tx, k = e.ty, l = this.minX, m = this.minY, n = this.maxX, o = this.maxY, p = c; p < d; p += 2) {
            var q = b[p],
                r = b[p + 1],
                s = f * q + h * r + j,
                t = i * r + g * q + k;l = s < l ? s : l, m = t < m ? t : m, n = s > n ? s : n, o = t > o ? t : o;
          }this.minX = l, this.minY = m, this.maxX = n, this.maxY = o;
        }, a.prototype.addBounds = function (a) {
          var b = this.minX,
              c = this.minY,
              d = this.maxX,
              e = this.maxY;this.minX = a.minX < b ? a.minX : b, this.minY = a.minY < c ? a.minY : c, this.maxX = a.maxX > d ? a.maxX : d, this.maxY = a.maxY > e ? a.maxY : e;
        }, a.prototype.addBoundsMask = function (a, b) {
          var c = a.minX > b.minX ? a.minX : b.minX,
              d = a.minY > b.minY ? a.minY : b.minY,
              e = a.maxX < b.maxX ? a.maxX : b.maxX,
              f = a.maxY < b.maxY ? a.maxY : b.maxY;if (c <= e && d <= f) {
            var g = this.minX,
                h = this.minY,
                i = this.maxX,
                j = this.maxY;this.minX = c < g ? c : g, this.minY = d < h ? d : h, this.maxX = e > i ? e : i, this.maxY = f > j ? f : j;
          }
        }, a.prototype.addBoundsArea = function (a, b) {
          var c = a.minX > b.x ? a.minX : b.x,
              d = a.minY > b.y ? a.minY : b.y,
              e = a.maxX < b.x + b.width ? a.maxX : b.x + b.width,
              f = a.maxY < b.y + b.height ? a.maxY : b.y + b.height;if (c <= e && d <= f) {
            var g = this.minX,
                h = this.minY,
                i = this.maxX,
                j = this.maxY;this.minX = c < g ? c : g, this.minY = d < h ? d : h, this.maxX = e > i ? e : i, this.maxY = f > j ? f : j;
          }
        }, a;
      }();c.default = f;
    }, { "../math": 70 }], 48: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../utils"),
          j = a("./DisplayObject"),
          k = d(j),
          l = function (a) {
        function b() {
          e(this, b);var c = f(this, a.call(this));return c.children = [], c;
        }return g(b, a), b.prototype.onChildrenChange = function () {}, b.prototype.addChild = function (a) {
          var b = arguments.length;if (b > 1) for (var c = 0; c < b; c++) {
            this.addChild(arguments[c]);
          } else a.parent && a.parent.removeChild(a), a.parent = this, a.transform._parentID = -1, this.children.push(a), this._boundsID++, this.onChildrenChange(this.children.length - 1), a.emit("added", this);return a;
        }, b.prototype.addChildAt = function (a, b) {
          if (b < 0 || b > this.children.length) throw new Error(a + "addChildAt: The index " + b + " supplied is out of bounds " + this.children.length);return a.parent && a.parent.removeChild(a), a.parent = this, a.transform._parentID = -1, this.children.splice(b, 0, a), this._boundsID++, this.onChildrenChange(b), a.emit("added", this), a;
        }, b.prototype.swapChildren = function (a, b) {
          if (a !== b) {
            var c = this.getChildIndex(a),
                d = this.getChildIndex(b);this.children[c] = b, this.children[d] = a, this.onChildrenChange(c < d ? c : d);
          }
        }, b.prototype.getChildIndex = function (a) {
          var b = this.children.indexOf(a);if (b === -1) throw new Error("The supplied DisplayObject must be a child of the caller");return b;
        }, b.prototype.setChildIndex = function (a, b) {
          if (b < 0 || b >= this.children.length) throw new Error("The supplied index is out of bounds");var c = this.getChildIndex(a);(0, i.removeItems)(this.children, c, 1), this.children.splice(b, 0, a), this.onChildrenChange(b);
        }, b.prototype.getChildAt = function (a) {
          if (a < 0 || a >= this.children.length) throw new Error("getChildAt: Index (" + a + ") does not exist.");return this.children[a];
        }, b.prototype.removeChild = function (a) {
          var b = arguments.length;if (b > 1) for (var c = 0; c < b; c++) {
            this.removeChild(arguments[c]);
          } else {
            var d = this.children.indexOf(a);if (d === -1) return null;a.parent = null, a.transform._parentID = -1, (0, i.removeItems)(this.children, d, 1), this._boundsID++, this.onChildrenChange(d), a.emit("removed", this);
          }return a;
        }, b.prototype.removeChildAt = function (a) {
          var b = this.getChildAt(a);return b.parent = null, b.transform._parentID = -1, (0, i.removeItems)(this.children, a, 1), this._boundsID++, this.onChildrenChange(a), b.emit("removed", this), b;
        }, b.prototype.removeChildren = function () {
          var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              b = arguments[1],
              c = a,
              d = "number" == typeof b ? b : this.children.length,
              e = d - c,
              f = void 0;if (e > 0 && e <= d) {
            f = this.children.splice(c, e);for (var g = 0; g < f.length; ++g) {
              f[g].parent = null, f[g].transform && (f[g].transform._parentID = -1);
            }this._boundsID++, this.onChildrenChange(a);for (var h = 0; h < f.length; ++h) {
              f[h].emit("removed", this);
            }return f;
          }if (0 === e && 0 === this.children.length) return [];throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
        }, b.prototype.updateTransform = function () {
          this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;for (var a = 0, b = this.children.length; a < b; ++a) {
            var c = this.children[a];c.visible && c.updateTransform();
          }
        }, b.prototype.calculateBounds = function () {
          this._bounds.clear(), this._calculateBounds();for (var a = 0; a < this.children.length; a++) {
            var b = this.children[a];b.visible && b.renderable && (b.calculateBounds(), b._mask ? (b._mask.calculateBounds(), this._bounds.addBoundsMask(b._bounds, b._mask._bounds)) : b.filterArea ? this._bounds.addBoundsArea(b._bounds, b.filterArea) : this._bounds.addBounds(b._bounds));
          }this._lastBoundsID = this._boundsID;
        }, b.prototype._calculateBounds = function () {}, b.prototype.renderWebGL = function (a) {
          if (this.visible && !(this.worldAlpha <= 0) && this.renderable) if (this._mask || this._filters) this.renderAdvancedWebGL(a);else {
            this._renderWebGL(a);for (var b = 0, c = this.children.length; b < c; ++b) {
              this.children[b].renderWebGL(a);
            }
          }
        }, b.prototype.renderAdvancedWebGL = function (a) {
          a.flush();var b = this._filters,
              c = this._mask;if (b) {
            this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;for (var d = 0; d < b.length; d++) {
              b[d].enabled && this._enabledFilters.push(b[d]);
            }this._enabledFilters.length && a.filterManager.pushFilter(this, this._enabledFilters);
          }c && a.maskManager.pushMask(this, this._mask), this._renderWebGL(a);for (var e = 0, f = this.children.length; e < f; e++) {
            this.children[e].renderWebGL(a);
          }a.flush(), c && a.maskManager.popMask(this, this._mask), b && this._enabledFilters && this._enabledFilters.length && a.filterManager.popFilter();
        }, b.prototype._renderWebGL = function (a) {}, b.prototype._renderCanvas = function (a) {}, b.prototype.renderCanvas = function (a) {
          if (this.visible && !(this.worldAlpha <= 0) && this.renderable) {
            this._mask && a.maskManager.pushMask(this._mask), this._renderCanvas(a);for (var b = 0, c = this.children.length; b < c; ++b) {
              this.children[b].renderCanvas(a);
            }this._mask && a.maskManager.popMask(a);
          }
        }, b.prototype.destroy = function (b) {
          a.prototype.destroy.call(this);var c = "boolean" == typeof b ? b : b && b.children,
              d = this.removeChildren(0, this.children.length);if (c) for (var e = 0; e < d.length; ++e) {
            d[e].destroy(b);
          }
        }, h(b, [{ key: "width", get: function get() {
            return this.scale.x * this.getLocalBounds().width;
          }, set: function set(a) {
            var b = this.getLocalBounds().width;0 !== b ? this.scale.x = a / b : this.scale.x = 1, this._width = a;
          } }, { key: "height", get: function get() {
            return this.scale.y * this.getLocalBounds().height;
          }, set: function set(a) {
            var b = this.getLocalBounds().height;0 !== b ? this.scale.y = a / b : this.scale.y = 1, this._height = a;
          } }]), b;
      }(k.default);c.default = l, l.prototype.containerUpdateTransform = l.prototype.updateTransform;
    }, { "../utils": 125, "./DisplayObject": 49 }], 49: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("eventemitter3"),
          j = d(i),
          k = a("../const"),
          l = a("../settings"),
          m = d(l),
          n = a("./TransformStatic"),
          o = d(n),
          p = a("./Transform"),
          q = d(p),
          r = a("./Bounds"),
          s = d(r),
          t = a("../math"),
          u = function (a) {
        function b() {
          e(this, b);var c = f(this, a.call(this)),
              d = m.default.TRANSFORM_MODE === k.TRANSFORM_MODE.STATIC ? o.default : q.default;return c.tempDisplayObjectParent = null, c.transform = new d(), c.alpha = 1, c.visible = !0, c.renderable = !0, c.parent = null, c.worldAlpha = 1, c.filterArea = null, c._filters = null, c._enabledFilters = null, c._bounds = new s.default(), c._boundsID = 0, c._lastBoundsID = -1, c._boundsRect = null, c._localBoundsRect = null, c._mask = null, c._destroyed = !1, c;
        }return g(b, a), b.prototype.updateTransform = function () {
          this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha, this._bounds.updateID++;
        }, b.prototype._recursivePostUpdateTransform = function () {
          this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
        }, b.prototype.getBounds = function (a, b) {
          return a || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._boundsID !== this._lastBoundsID && this.calculateBounds(), b || (this._boundsRect || (this._boundsRect = new t.Rectangle()), b = this._boundsRect), this._bounds.getRectangle(b);
        }, b.prototype.getLocalBounds = function (a) {
          var b = this.transform,
              c = this.parent;this.parent = null, this.transform = this._tempDisplayObjectParent.transform, a || (this._localBoundsRect || (this._localBoundsRect = new t.Rectangle()), a = this._localBoundsRect);var d = this.getBounds(!1, a);return this.parent = c, this.transform = b, d;
        }, b.prototype.toGlobal = function (a, b) {
          var c = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];return c || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(a, b);
        }, b.prototype.toLocal = function (a, b, c, d) {
          return b && (a = b.toGlobal(a, c, d)), d || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(a, c);
        }, b.prototype.renderWebGL = function (a) {}, b.prototype.renderCanvas = function (a) {}, b.prototype.setParent = function (a) {
          if (!a || !a.addChild) throw new Error("setParent: Argument must be a Container");return a.addChild(this), a;
        }, b.prototype.setTransform = function () {
          var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
              d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
              e = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
              f = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
              g = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
              h = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0,
              i = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0;return this.position.x = a, this.position.y = b, this.scale.x = c ? c : 1, this.scale.y = d ? d : 1, this.rotation = e, this.skew.x = f, this.skew.y = g, this.pivot.x = h, this.pivot.y = i, this;
        }, b.prototype.destroy = function () {
          this.removeAllListeners(), this.parent && this.parent.removeChild(this), this.transform = null, this.parent = null, this._bounds = null, this._currentBounds = null, this._mask = null, this.filterArea = null, this.interactive = !1, this.interactiveChildren = !1, this._destroyed = !0;
        }, h(b, [{ key: "_tempDisplayObjectParent", get: function get() {
            return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new b()), this.tempDisplayObjectParent;
          } }, { key: "x", get: function get() {
            return this.position.x;
          }, set: function set(a) {
            this.transform.position.x = a;
          } }, { key: "y", get: function get() {
            return this.position.y;
          }, set: function set(a) {
            this.transform.position.y = a;
          } }, { key: "worldTransform", get: function get() {
            return this.transform.worldTransform;
          } }, { key: "localTransform", get: function get() {
            return this.transform.localTransform;
          } }, { key: "position", get: function get() {
            return this.transform.position;
          }, set: function set(a) {
            this.transform.position.copy(a);
          } }, { key: "scale", get: function get() {
            return this.transform.scale;
          }, set: function set(a) {
            this.transform.scale.copy(a);
          } }, { key: "pivot", get: function get() {
            return this.transform.pivot;
          }, set: function set(a) {
            this.transform.pivot.copy(a);
          } }, { key: "skew", get: function get() {
            return this.transform.skew;
          }, set: function set(a) {
            this.transform.skew.copy(a);
          } }, { key: "rotation", get: function get() {
            return this.transform.rotation;
          }, set: function set(a) {
            this.transform.rotation = a;
          } }, { key: "worldVisible", get: function get() {
            var a = this;do {
              if (!a.visible) return !1;a = a.parent;
            } while (a);return !0;
          } }, { key: "mask", get: function get() {
            return this._mask;
          }, set: function set(a) {
            this._mask && (this._mask.renderable = !0), this._mask = a, this._mask && (this._mask.renderable = !1);
          } }, { key: "filters", get: function get() {
            return this._filters && this._filters.slice();
          }, set: function set(a) {
            this._filters = a && a.slice();
          } }]), b;
      }(j.default);c.default = u, u.prototype.displayObjectUpdateTransform = u.prototype.updateTransform;
    }, { "../const": 46, "../math": 70, "../settings": 101, "./Bounds": 47, "./Transform": 50, "./TransformStatic": 52, eventemitter3: 3 }], 50: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../math"),
          j = a("./TransformBase"),
          k = d(j),
          l = function (a) {
        function b() {
          e(this, b);var c = f(this, a.call(this));return c.position = new i.Point(0, 0), c.scale = new i.Point(1, 1), c.skew = new i.ObservablePoint(c.updateSkew, c, 0, 0), c.pivot = new i.Point(0, 0), c._rotation = 0, c._cx = 1, c._sx = 0, c._cy = 0, c._sy = 1, c;
        }return g(b, a), b.prototype.updateSkew = function () {
          this._cx = Math.cos(this._rotation + this.skew._y), this._sx = Math.sin(this._rotation + this.skew._y), this._cy = -Math.sin(this._rotation - this.skew._x), this._sy = Math.cos(this._rotation - this.skew._x);
        }, b.prototype.updateLocalTransform = function () {
          var a = this.localTransform;a.a = this._cx * this.scale.x, a.b = this._sx * this.scale.x, a.c = this._cy * this.scale.y, a.d = this._sy * this.scale.y, a.tx = this.position.x - (this.pivot.x * a.a + this.pivot.y * a.c), a.ty = this.position.y - (this.pivot.x * a.b + this.pivot.y * a.d);
        }, b.prototype.updateTransform = function (a) {
          var b = this.localTransform;b.a = this._cx * this.scale.x, b.b = this._sx * this.scale.x, b.c = this._cy * this.scale.y, b.d = this._sy * this.scale.y, b.tx = this.position.x - (this.pivot.x * b.a + this.pivot.y * b.c), b.ty = this.position.y - (this.pivot.x * b.b + this.pivot.y * b.d);var c = a.worldTransform,
              d = this.worldTransform;d.a = b.a * c.a + b.b * c.c, d.b = b.a * c.b + b.b * c.d, d.c = b.c * c.a + b.d * c.c, d.d = b.c * c.b + b.d * c.d, d.tx = b.tx * c.a + b.ty * c.c + c.tx, d.ty = b.tx * c.b + b.ty * c.d + c.ty, this._worldID++;
        }, b.prototype.setFromMatrix = function (a) {
          a.decompose(this);
        }, h(b, [{ key: "rotation", get: function get() {
            return this._rotation;
          }, set: function set(a) {
            this._rotation = a, this.updateSkew();
          } }]), b;
      }(k.default);c.default = l;
    }, { "../math": 70, "./TransformBase": 51 }], 51: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = a("../math"),
          f = function () {
        function a() {
          d(this, a), this.worldTransform = new e.Matrix(), this.localTransform = new e.Matrix(), this._worldID = 0, this._parentID = 0;
        }return a.prototype.updateLocalTransform = function () {}, a.prototype.updateTransform = function (a) {
          var b = a.worldTransform,
              c = this.worldTransform,
              d = this.localTransform;c.a = d.a * b.a + d.b * b.c, c.b = d.a * b.b + d.b * b.d, c.c = d.c * b.a + d.d * b.c, c.d = d.c * b.b + d.d * b.d, c.tx = d.tx * b.a + d.ty * b.c + b.tx, c.ty = d.tx * b.b + d.ty * b.d + b.ty, this._worldID++;
        }, a;
      }();c.default = f, f.prototype.updateWorldTransform = f.prototype.updateTransform, f.IDENTITY = new f();
    }, { "../math": 70 }], 52: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../math"),
          j = a("./TransformBase"),
          k = d(j),
          l = function (a) {
        function b() {
          e(this, b);var c = f(this, a.call(this));return c.position = new i.ObservablePoint(c.onChange, c, 0, 0), c.scale = new i.ObservablePoint(c.onChange, c, 1, 1), c.pivot = new i.ObservablePoint(c.onChange, c, 0, 0), c.skew = new i.ObservablePoint(c.updateSkew, c, 0, 0), c._rotation = 0, c._cx = 1, c._sx = 0, c._cy = 0, c._sy = 1, c._localID = 0, c._currentLocalID = 0, c;
        }return g(b, a), b.prototype.onChange = function () {
          this._localID++;
        }, b.prototype.updateSkew = function () {
          this._cx = Math.cos(this._rotation + this.skew._y), this._sx = Math.sin(this._rotation + this.skew._y), this._cy = -Math.sin(this._rotation - this.skew._x), this._sy = Math.cos(this._rotation - this.skew._x), this._localID++;
        }, b.prototype.updateLocalTransform = function () {
          var a = this.localTransform;this._localID !== this._currentLocalID && (a.a = this._cx * this.scale._x, a.b = this._sx * this.scale._x, a.c = this._cy * this.scale._y, a.d = this._sy * this.scale._y, a.tx = this.position._x - (this.pivot._x * a.a + this.pivot._y * a.c), a.ty = this.position._y - (this.pivot._x * a.b + this.pivot._y * a.d), this._currentLocalID = this._localID, this._parentID = -1);
        }, b.prototype.updateTransform = function (a) {
          var b = this.localTransform;if (this._localID !== this._currentLocalID && (b.a = this._cx * this.scale._x, b.b = this._sx * this.scale._x, b.c = this._cy * this.scale._y, b.d = this._sy * this.scale._y, b.tx = this.position._x - (this.pivot._x * b.a + this.pivot._y * b.c), b.ty = this.position._y - (this.pivot._x * b.b + this.pivot._y * b.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== a._worldID) {
            var c = a.worldTransform,
                d = this.worldTransform;d.a = b.a * c.a + b.b * c.c, d.b = b.a * c.b + b.b * c.d, d.c = b.c * c.a + b.d * c.c, d.d = b.c * c.b + b.d * c.d, d.tx = b.tx * c.a + b.ty * c.c + c.tx, d.ty = b.tx * c.b + b.ty * c.d + c.ty, this._parentID = a._worldID, this._worldID++;
          }
        }, b.prototype.setFromMatrix = function (a) {
          a.decompose(this), this._localID++;
        }, h(b, [{ key: "rotation", get: function get() {
            return this._rotation;
          }, set: function set(a) {
            this._rotation = a, this.updateSkew();
          } }]), b;
      }(k.default);c.default = l;
    }, { "../math": 70, "./TransformBase": 51 }], 53: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../display/Container"),
          i = d(h),
          j = a("../textures/RenderTexture"),
          k = d(j),
          l = a("../textures/Texture"),
          m = d(l),
          n = a("./GraphicsData"),
          o = d(n),
          p = a("../sprites/Sprite"),
          q = d(p),
          r = a("../math"),
          s = a("../utils"),
          t = a("../const"),
          u = a("../display/Bounds"),
          v = d(u),
          w = a("./utils/bezierCurveTo"),
          x = d(w),
          y = a("../renderers/canvas/CanvasRenderer"),
          z = d(y),
          A = void 0,
          B = new r.Matrix(),
          C = new r.Point(),
          D = new Float32Array(4),
          E = new Float32Array(4),
          F = function (a) {
        function b() {
          var c = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];e(this, b);var d = f(this, a.call(this));return d.fillAlpha = 1, d.lineWidth = 0, d.nativeLines = c, d.lineColor = 0, d.graphicsData = [], d.tint = 16777215, d._prevTint = 16777215, d.blendMode = t.BLEND_MODES.NORMAL, d.currentPath = null, d._webGL = {}, d.isMask = !1, d.boundsPadding = 0, d._localBounds = new v.default(), d.dirty = 0, d.fastRectDirty = -1, d.clearDirty = 0, d.boundsDirty = -1, d.cachedSpriteDirty = !1, d._spriteRect = null, d._fastRect = !1, d;
        }return g(b, a), b.prototype.clone = function a() {
          var a = new b();a.renderable = this.renderable, a.fillAlpha = this.fillAlpha, a.lineWidth = this.lineWidth, a.lineColor = this.lineColor, a.tint = this.tint, a.blendMode = this.blendMode, a.isMask = this.isMask, a.boundsPadding = this.boundsPadding, a.dirty = 0, a.cachedSpriteDirty = this.cachedSpriteDirty;for (var c = 0; c < this.graphicsData.length; ++c) {
            a.graphicsData.push(this.graphicsData[c].clone());
          }return a.currentPath = a.graphicsData[a.graphicsData.length - 1], a.updateLocalBounds(), a;
        }, b.prototype.lineStyle = function () {
          var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;if (this.lineWidth = a, this.lineColor = b, this.lineAlpha = c, this.currentPath) if (this.currentPath.shape.points.length) {
            var d = new r.Polygon(this.currentPath.shape.points.slice(-2));d.closed = !1, this.drawShape(d);
          } else this.currentPath.lineWidth = this.lineWidth, this.currentPath.lineColor = this.lineColor, this.currentPath.lineAlpha = this.lineAlpha;return this;
        }, b.prototype.moveTo = function (a, b) {
          var c = new r.Polygon([a, b]);return c.closed = !1, this.drawShape(c), this;
        }, b.prototype.lineTo = function (a, b) {
          return this.currentPath.shape.points.push(a, b), this.dirty++, this;
        }, b.prototype.quadraticCurveTo = function (a, b, c, d) {
          this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);var e = 20,
              f = this.currentPath.shape.points,
              g = 0,
              h = 0;0 === f.length && this.moveTo(0, 0);for (var i = f[f.length - 2], j = f[f.length - 1], k = 1; k <= e; ++k) {
            var l = k / e;g = i + (a - i) * l, h = j + (b - j) * l, f.push(g + (a + (c - a) * l - g) * l, h + (b + (d - b) * l - h) * l);
          }return this.dirty++, this;
        }, b.prototype.bezierCurveTo = function (a, b, c, d, e, f) {
          this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);var g = this.currentPath.shape.points,
              h = g[g.length - 2],
              i = g[g.length - 1];return g.length -= 2, (0, x.default)(h, i, a, b, c, d, e, f, g), this.dirty++, this;
        }, b.prototype.arcTo = function (a, b, c, d, e) {
          this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(a, b) : this.moveTo(a, b);var f = this.currentPath.shape.points,
              g = f[f.length - 2],
              h = f[f.length - 1],
              i = h - b,
              j = g - a,
              k = d - b,
              l = c - a,
              m = Math.abs(i * l - j * k);if (m < 1e-8 || 0 === e) f[f.length - 2] === a && f[f.length - 1] === b || f.push(a, b);else {
            var n = i * i + j * j,
                o = k * k + l * l,
                p = i * k + j * l,
                q = e * Math.sqrt(n) / m,
                r = e * Math.sqrt(o) / m,
                s = q * p / n,
                t = r * p / o,
                u = q * l + r * j,
                v = q * k + r * i,
                w = j * (r + s),
                x = i * (r + s),
                y = l * (q + t),
                z = k * (q + t),
                A = Math.atan2(x - v, w - u),
                B = Math.atan2(z - v, y - u);this.arc(u + a, v + b, e, A, B, j * k > l * i);
          }return this.dirty++, this;
        }, b.prototype.arc = function (a, b, c, d, e) {
          var f = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];if (d === e) return this;!f && e <= d ? e += 2 * Math.PI : f && d <= e && (d += 2 * Math.PI);var g = e - d,
              h = 40 * Math.ceil(Math.abs(g) / (2 * Math.PI));if (0 === g) return this;var i = a + Math.cos(d) * c,
              j = b + Math.sin(d) * c,
              k = this.currentPath ? this.currentPath.shape.points : null;k ? k[k.length - 2] === i && k[k.length - 1] === j || k.push(i, j) : (this.moveTo(i, j), k = this.currentPath.shape.points);for (var l = g / (2 * h), m = 2 * l, n = Math.cos(l), o = Math.sin(l), p = h - 1, q = p % 1 / p, r = 0; r <= p; ++r) {
            var s = r + q * r,
                t = l + d + m * s,
                u = Math.cos(t),
                v = -Math.sin(t);k.push((n * u + o * v) * c + a, (n * -v + o * u) * c + b);
          }return this.dirty++, this;
        }, b.prototype.beginFill = function () {
          var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;return this.filling = !0, this.fillColor = a, this.fillAlpha = b, this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha), this;
        }, b.prototype.endFill = function () {
          return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this;
        }, b.prototype.drawRect = function (a, b, c, d) {
          return this.drawShape(new r.Rectangle(a, b, c, d)), this;
        }, b.prototype.drawRoundedRect = function (a, b, c, d, e) {
          return this.drawShape(new r.RoundedRectangle(a, b, c, d, e)), this;
        }, b.prototype.drawCircle = function (a, b, c) {
          return this.drawShape(new r.Circle(a, b, c)), this;
        }, b.prototype.drawEllipse = function (a, b, c, d) {
          return this.drawShape(new r.Ellipse(a, b, c, d)), this;
        }, b.prototype.drawPolygon = function (a) {
          var b = a,
              c = !0;if (b instanceof r.Polygon && (c = b.closed, b = b.points), !Array.isArray(b)) {
            b = new Array(arguments.length);for (var d = 0; d < b.length; ++d) {
              b[d] = arguments[d];
            }
          }var e = new r.Polygon(b);return e.closed = c, this.drawShape(e), this;
        }, b.prototype.clear = function () {
          return (this.lineWidth || this.filling || this.graphicsData.length > 0) && (this.lineWidth = 0, this.filling = !1, this.boundsDirty = -1, this.dirty++, this.clearDirty++, this.graphicsData.length = 0), this.currentPath = null, this._spriteRect = null, this;
        }, b.prototype.isFastRect = function () {
          return 1 === this.graphicsData.length && this.graphicsData[0].shape.type === t.SHAPES.RECT && !this.graphicsData[0].lineWidth;
        }, b.prototype._renderWebGL = function (a) {
          this.dirty !== this.fastRectDirty && (this.fastRectDirty = this.dirty, this._fastRect = this.isFastRect()), this._fastRect ? this._renderSpriteRect(a) : (a.setObjectRenderer(a.plugins.graphics), a.plugins.graphics.render(this));
        }, b.prototype._renderSpriteRect = function (a) {
          var b = this.graphicsData[0].shape;this._spriteRect || (this._spriteRect = new q.default(new m.default(m.default.WHITE)));var c = this._spriteRect;if (16777215 === this.tint) c.tint = this.graphicsData[0].fillColor;else {
            var d = D,
                e = E;(0, s.hex2rgb)(this.graphicsData[0].fillColor, d), (0, s.hex2rgb)(this.tint, e), d[0] *= e[0], d[1] *= e[1], d[2] *= e[2], c.tint = (0, s.rgb2hex)(d);
          }c.alpha = this.graphicsData[0].fillAlpha, c.worldAlpha = this.worldAlpha * c.alpha, c.blendMode = this.blendMode, c._texture._frame.width = b.width, c._texture._frame.height = b.height, c.transform.worldTransform = this.transform.worldTransform, c.anchor.set(-b.x / b.width, -b.y / b.height), c._onAnchorUpdate(), c._renderWebGL(a);
        }, b.prototype._renderCanvas = function (a) {
          this.isMask !== !0 && a.plugins.graphics.render(this);
        }, b.prototype._calculateBounds = function () {
          this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.updateLocalBounds(), this.cachedSpriteDirty = !0);var a = this._localBounds;this._bounds.addFrame(this.transform, a.minX, a.minY, a.maxX, a.maxY);
        }, b.prototype.containsPoint = function (a) {
          this.worldTransform.applyInverse(a, C);for (var b = this.graphicsData, c = 0; c < b.length; ++c) {
            var d = b[c];if (d.fill && d.shape && d.shape.contains(C.x, C.y)) {
              if (d.holes) for (var e = 0; e < d.holes.length; e++) {
                var f = d.holes[e];if (f.contains(C.x, C.y)) return !1;
              }return !0;
            }
          }return !1;
        }, b.prototype.updateLocalBounds = function () {
          var a = 1 / 0,
              b = -(1 / 0),
              c = 1 / 0,
              d = -(1 / 0);if (this.graphicsData.length) for (var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0; j < this.graphicsData.length; j++) {
            var k = this.graphicsData[j],
                l = k.type,
                m = k.lineWidth;if (e = k.shape, l === t.SHAPES.RECT || l === t.SHAPES.RREC) f = e.x - m / 2, g = e.y - m / 2, h = e.width + m, i = e.height + m, a = f < a ? f : a, b = f + h > b ? f + h : b, c = g < c ? g : c, d = g + i > d ? g + i : d;else if (l === t.SHAPES.CIRC) f = e.x, g = e.y, h = e.radius + m / 2, i = e.radius + m / 2, a = f - h < a ? f - h : a, b = f + h > b ? f + h : b, c = g - i < c ? g - i : c, d = g + i > d ? g + i : d;else if (l === t.SHAPES.ELIP) f = e.x, g = e.y, h = e.width + m / 2, i = e.height + m / 2, a = f - h < a ? f - h : a, b = f + h > b ? f + h : b, c = g - i < c ? g - i : c, d = g + i > d ? g + i : d;else for (var n = e.points, o = 0, p = 0, q = 0, r = 0, s = 0, u = 0, v = 0, w = 0, x = 0; x + 2 < n.length; x += 2) {
              f = n[x], g = n[x + 1], o = n[x + 2], p = n[x + 3], q = Math.abs(o - f), r = Math.abs(p - g), i = m, h = Math.sqrt(q * q + r * r), h < 1e-9 || (s = (i / h * r + q) / 2, u = (i / h * q + r) / 2, v = (o + f) / 2, w = (p + g) / 2, a = v - s < a ? v - s : a, b = v + s > b ? v + s : b, c = w - u < c ? w - u : c, d = w + u > d ? w + u : d);
            }
          } else a = 0, b = 0, c = 0, d = 0;var y = this.boundsPadding;this._localBounds.minX = a - y, this._localBounds.maxX = b + y, this._localBounds.minY = c - y, this._localBounds.maxY = d + y;
        }, b.prototype.drawShape = function (a) {
          this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(), this.currentPath = null;var b = new o.default(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, this.nativeLines, a);return this.graphicsData.push(b), b.type === t.SHAPES.POLY && (b.shape.closed = b.shape.closed || this.filling, this.currentPath = b), this.dirty++, b;
        }, b.prototype.generateCanvasTexture = function (a) {
          var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
              c = this.getLocalBounds(),
              d = k.default.create(c.width, c.height, a, b);A || (A = new z.default()), this.transform.updateLocalTransform(), this.transform.localTransform.copy(B), B.invert(), B.tx -= c.x, B.ty -= c.y, A.render(this, d, !0, B);var e = m.default.fromCanvas(d.baseTexture._canvasRenderTarget.canvas, a, "graphics");return e.baseTexture.resolution = b, e.baseTexture.update(), e;
        }, b.prototype.closePath = function () {
          var a = this.currentPath;return a && a.shape && a.shape.close(), this;
        }, b.prototype.addHole = function () {
          var a = this.graphicsData.pop();return this.currentPath = this.graphicsData[this.graphicsData.length - 1], this.currentPath.addHole(a.shape), this.currentPath = null, this;
        }, b.prototype.destroy = function (b) {
          a.prototype.destroy.call(this, b);for (var c = 0; c < this.graphicsData.length; ++c) {
            this.graphicsData[c].destroy();
          }for (var d in this._webgl) {
            for (var e = 0; e < this._webgl[d].data.length; ++e) {
              this._webgl[d].data[e].destroy();
            }
          }this._spriteRect && this._spriteRect.destroy(), this.graphicsData = null, this.currentPath = null, this._webgl = null, this._localBounds = null;
        }, b;
      }(i.default);c.default = F, F._SPRITE_TEXTURE = null;
    }, { "../const": 46, "../display/Bounds": 47, "../display/Container": 48, "../math": 70, "../renderers/canvas/CanvasRenderer": 77, "../sprites/Sprite": 102, "../textures/RenderTexture": 113, "../textures/Texture": 115, "../utils": 125, "./GraphicsData": 54, "./utils/bezierCurveTo": 56 }], 54: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(b, c, e, f, g, h, i, j) {
          d(this, a), this.lineWidth = b, this.nativeLines = i, this.lineColor = c, this.lineAlpha = e, this._lineTint = c, this.fillColor = f, this.fillAlpha = g, this._fillTint = f, this.fill = h, this.holes = [], this.shape = j, this.type = j.type;
        }return a.prototype.clone = function () {
          return new a(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.nativeLines, this.shape);
        }, a.prototype.addHole = function (a) {
          this.holes.push(a);
        }, a.prototype.destroy = function () {
          this.shape = null, this.holes = null;
        }, a;
      }();c.default = e;
    }, {}], 55: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("../../renderers/canvas/CanvasRenderer"),
          g = d(f),
          h = a("../../const"),
          i = function () {
        function a(b) {
          e(this, a), this.renderer = b;
        }return a.prototype.render = function (a) {
          var b = this.renderer,
              c = b.context,
              d = a.worldAlpha,
              e = a.transform.worldTransform,
              f = b.resolution;this._prevTint !== this.tint && (this.dirty = !0), c.setTransform(e.a * f, e.b * f, e.c * f, e.d * f, e.tx * f, e.ty * f), a.dirty && (this.updateGraphicsTint(a), a.dirty = !1), b.setBlendMode(a.blendMode);for (var g = 0; g < a.graphicsData.length; g++) {
            var i = a.graphicsData[g],
                j = i.shape,
                k = i._fillTint,
                l = i._lineTint;if (c.lineWidth = i.lineWidth, i.type === h.SHAPES.POLY) {
              c.beginPath(), this.renderPolygon(j.points, j.closed, c);for (var m = 0; m < i.holes.length; m++) {
                this.renderPolygon(i.holes[m].points, !0, c);
              }i.fill && (c.globalAlpha = i.fillAlpha * d, c.fillStyle = "#" + ("00000" + (0 | k).toString(16)).substr(-6), c.fill()), i.lineWidth && (c.globalAlpha = i.lineAlpha * d, c.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), c.stroke());
            } else if (i.type === h.SHAPES.RECT) (i.fillColor || 0 === i.fillColor) && (c.globalAlpha = i.fillAlpha * d, c.fillStyle = "#" + ("00000" + (0 | k).toString(16)).substr(-6), c.fillRect(j.x, j.y, j.width, j.height)), i.lineWidth && (c.globalAlpha = i.lineAlpha * d, c.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), c.strokeRect(j.x, j.y, j.width, j.height));else if (i.type === h.SHAPES.CIRC) c.beginPath(), c.arc(j.x, j.y, j.radius, 0, 2 * Math.PI), c.closePath(), i.fill && (c.globalAlpha = i.fillAlpha * d, c.fillStyle = "#" + ("00000" + (0 | k).toString(16)).substr(-6), c.fill()), i.lineWidth && (c.globalAlpha = i.lineAlpha * d, c.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), c.stroke());else if (i.type === h.SHAPES.ELIP) {
              var n = 2 * j.width,
                  o = 2 * j.height,
                  p = j.x - n / 2,
                  q = j.y - o / 2;c.beginPath();var r = .5522848,
                  s = n / 2 * r,
                  t = o / 2 * r,
                  u = p + n,
                  v = q + o,
                  w = p + n / 2,
                  x = q + o / 2;c.moveTo(p, x), c.bezierCurveTo(p, x - t, w - s, q, w, q), c.bezierCurveTo(w + s, q, u, x - t, u, x), c.bezierCurveTo(u, x + t, w + s, v, w, v), c.bezierCurveTo(w - s, v, p, x + t, p, x), c.closePath(), i.fill && (c.globalAlpha = i.fillAlpha * d, c.fillStyle = "#" + ("00000" + (0 | k).toString(16)).substr(-6), c.fill()), i.lineWidth && (c.globalAlpha = i.lineAlpha * d, c.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), c.stroke());
            } else if (i.type === h.SHAPES.RREC) {
              var y = j.x,
                  z = j.y,
                  A = j.width,
                  B = j.height,
                  C = j.radius,
                  D = Math.min(A, B) / 2 | 0;C = C > D ? D : C, c.beginPath(), c.moveTo(y, z + C), c.lineTo(y, z + B - C), c.quadraticCurveTo(y, z + B, y + C, z + B), c.lineTo(y + A - C, z + B), c.quadraticCurveTo(y + A, z + B, y + A, z + B - C), c.lineTo(y + A, z + C), c.quadraticCurveTo(y + A, z, y + A - C, z), c.lineTo(y + C, z), c.quadraticCurveTo(y, z, y, z + C), c.closePath(), (i.fillColor || 0 === i.fillColor) && (c.globalAlpha = i.fillAlpha * d, c.fillStyle = "#" + ("00000" + (0 | k).toString(16)).substr(-6), c.fill()), i.lineWidth && (c.globalAlpha = i.lineAlpha * d, c.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), c.stroke());
            }
          }
        }, a.prototype.updateGraphicsTint = function (a) {
          a._prevTint = a.tint;for (var b = (a.tint >> 16 & 255) / 255, c = (a.tint >> 8 & 255) / 255, d = (255 & a.tint) / 255, e = 0; e < a.graphicsData.length; ++e) {
            var f = a.graphicsData[e],
                g = 0 | f.fillColor,
                h = 0 | f.lineColor;f._fillTint = ((g >> 16 & 255) / 255 * b * 255 << 16) + ((g >> 8 & 255) / 255 * c * 255 << 8) + (255 & g) / 255 * d * 255, f._lineTint = ((h >> 16 & 255) / 255 * b * 255 << 16) + ((h >> 8 & 255) / 255 * c * 255 << 8) + (255 & h) / 255 * d * 255;
          }
        }, a.prototype.renderPolygon = function (a, b, c) {
          c.moveTo(a[0], a[1]);for (var d = 1; d < a.length / 2; ++d) {
            c.lineTo(a[2 * d], a[2 * d + 1]);
          }b && c.closePath();
        }, a.prototype.destroy = function () {
          this.renderer = null;
        }, a;
      }();c.default = i, g.default.registerPlugin("graphics", i);
    }, { "../../const": 46, "../../renderers/canvas/CanvasRenderer": 77 }], 56: [function (a, b, c) {
      "use strict";
      function d(a, b, c, d, e, f, g, h) {
        var i = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : [],
            j = 20,
            k = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0;i.push(a, b);for (var p = 1, q = 0; p <= j; ++p) {
          q = p / j, k = 1 - q, l = k * k, m = l * k, n = q * q, o = n * q, i.push(m * a + 3 * l * q * c + 3 * k * n * e + o * g, m * b + 3 * l * q * d + 3 * k * n * f + o * h);
        }return i;
      }c.__esModule = !0, c.default = d;
    }, {}], 57: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../../utils"),
          i = a("../../const"),
          j = a("../../renderers/webgl/utils/ObjectRenderer"),
          k = d(j),
          l = a("../../renderers/webgl/WebGLRenderer"),
          m = d(l),
          n = a("./WebGLGraphicsData"),
          o = d(n),
          p = a("./shaders/PrimitiveShader"),
          q = d(p),
          r = a("./utils/buildPoly"),
          s = d(r),
          t = a("./utils/buildRectangle"),
          u = d(t),
          v = a("./utils/buildRoundedRectangle"),
          w = d(v),
          x = a("./utils/buildCircle"),
          y = d(x),
          z = function (a) {
        function b(c) {
          e(this, b);var d = f(this, a.call(this, c));return d.graphicsDataPool = [], d.primitiveShader = null, d.gl = c.gl, d.CONTEXT_UID = 0, d;
        }return g(b, a), b.prototype.onContextChange = function () {
          this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.primitiveShader = new q.default(this.gl);
        }, b.prototype.destroy = function () {
          k.default.prototype.destroy.call(this);for (var a = 0; a < this.graphicsDataPool.length; ++a) {
            this.graphicsDataPool[a].destroy();
          }this.graphicsDataPool = null;
        }, b.prototype.render = function (a) {
          var b = this.renderer,
              c = b.gl,
              d = void 0,
              e = a._webGL[this.CONTEXT_UID];e && a.dirty === e.dirty || (this.updateGraphics(a), e = a._webGL[this.CONTEXT_UID]);var f = this.primitiveShader;b.bindShader(f), b.state.setBlendMode(a.blendMode);for (var g = 0, i = e.data.length; g < i; g++) {
            d = e.data[g];var j = d.shader;b.bindShader(j), j.uniforms.translationMatrix = a.transform.worldTransform.toArray(!0), j.uniforms.tint = (0, h.hex2rgb)(a.tint), j.uniforms.alpha = a.worldAlpha, b.bindVao(d.vao), d.nativeLines ? c.drawArrays(c.LINES, 0, d.points.length / 6) : d.vao.draw(c.TRIANGLE_STRIP, d.indices.length);
          }
        }, b.prototype.updateGraphics = function (a) {
          var b = this.renderer.gl,
              c = a._webGL[this.CONTEXT_UID];if (c || (c = a._webGL[this.CONTEXT_UID] = { lastIndex: 0, data: [], gl: b, clearDirty: -1, dirty: -1 }), c.dirty = a.dirty, a.clearDirty !== c.clearDirty) {
            c.clearDirty = a.clearDirty;for (var d = 0; d < c.data.length; d++) {
              this.graphicsDataPool.push(c.data[d]);
            }c.data.length = 0, c.lastIndex = 0;
          }for (var e = void 0, f = void 0, g = c.lastIndex; g < a.graphicsData.length; g++) {
            var h = a.graphicsData[g];e = this.getWebGLData(c, 0), h.nativeLines && h.lineWidth && (f = this.getWebGLData(c, 0, !0), c.lastIndex++), h.type === i.SHAPES.POLY && (0, s.default)(h, e, f), h.type === i.SHAPES.RECT ? (0, u.default)(h, e, f) : h.type === i.SHAPES.CIRC || h.type === i.SHAPES.ELIP ? (0, y.default)(h, e, f) : h.type === i.SHAPES.RREC && (0, w.default)(h, e, f), c.lastIndex++;
          }this.renderer.bindVao(null);for (var j = 0; j < c.data.length; j++) {
            e = c.data[j], e.dirty && e.upload();
          }
        }, b.prototype.getWebGLData = function (a, b, c) {
          var d = a.data[a.data.length - 1];return (!d || d.nativeLines !== c || d.points.length > 32e4) && (d = this.graphicsDataPool.pop() || new o.default(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState), d.nativeLines = c, d.reset(b), a.data.push(d)), d.dirty = !0, d;
        }, b;
      }(k.default);c.default = z, m.default.registerPlugin("graphics", z);
    }, { "../../const": 46, "../../renderers/webgl/WebGLRenderer": 84, "../../renderers/webgl/utils/ObjectRenderer": 94, "../../utils": 125, "./WebGLGraphicsData": 58, "./shaders/PrimitiveShader": 59, "./utils/buildCircle": 60, "./utils/buildPoly": 62, "./utils/buildRectangle": 63, "./utils/buildRoundedRectangle": 64 }], 58: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("pixi-gl-core"),
          g = d(f),
          h = function () {
        function a(b, c, d) {
          e(this, a), this.gl = b, this.color = [0, 0, 0], this.points = [], this.indices = [], this.buffer = g.default.GLBuffer.createVertexBuffer(b), this.indexBuffer = g.default.GLBuffer.createIndexBuffer(b), this.dirty = !0, this.nativeLines = !1, this.glPoints = null, this.glIndices = null, this.shader = c, this.vao = new g.default.VertexArrayObject(b, d).addIndex(this.indexBuffer).addAttribute(this.buffer, c.attributes.aVertexPosition, b.FLOAT, !1, 24, 0).addAttribute(this.buffer, c.attributes.aColor, b.FLOAT, !1, 24, 8);
        }return a.prototype.reset = function () {
          this.points.length = 0, this.indices.length = 0;
        }, a.prototype.upload = function () {
          this.glPoints = new Float32Array(this.points), this.buffer.upload(this.glPoints), this.glIndices = new Uint16Array(this.indices), this.indexBuffer.upload(this.glIndices), this.dirty = !1;
        }, a.prototype.destroy = function () {
          this.color = null, this.points = null, this.indices = null, this.vao.destroy(), this.buffer.destroy(), this.indexBuffer.destroy(), this.gl = null, this.buffer = null, this.indexBuffer = null, this.glPoints = null, this.glIndices = null;
        }, a;
      }();c.default = h;
    }, { "pixi-gl-core": 12 }], 59: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../../../Shader"),
          i = d(h),
          j = function (a) {
        function b(c) {
          return e(this, b), f(this, a.call(this, c, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n")));
        }return g(b, a), b;
      }(i.default);c.default = j;
    }, { "../../../Shader": 44 }], 60: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b, c) {
        var d = a.shape,
            e = d.x,
            f = d.y,
            j = void 0,
            k = void 0;if (a.type === h.SHAPES.CIRC ? (j = d.radius, k = d.radius) : (j = d.width, k = d.height), 0 !== j && 0 !== k) {
          var l = Math.floor(30 * Math.sqrt(d.radius)) || Math.floor(15 * Math.sqrt(d.width + d.height)),
              m = 2 * Math.PI / l;if (a.fill) {
            var n = (0, i.hex2rgb)(a.fillColor),
                o = a.fillAlpha,
                p = n[0] * o,
                q = n[1] * o,
                r = n[2] * o,
                s = b.points,
                t = b.indices,
                u = s.length / 6;t.push(u);for (var v = 0; v < l + 1; v++) {
              s.push(e, f, p, q, r, o), s.push(e + Math.sin(m * v) * j, f + Math.cos(m * v) * k, p, q, r, o), t.push(u++, u++);
            }t.push(u - 1);
          }if (a.lineWidth) {
            var w = a.points;a.points = [];for (var x = 0; x < l + 1; x++) {
              a.points.push(e + Math.sin(m * x) * j, f + Math.cos(m * x) * k);
            }(0, g.default)(a, b, c), a.points = w;
          }
        }
      }c.__esModule = !0, c.default = e;var f = a("./buildLine"),
          g = d(f),
          h = a("../../../const"),
          i = a("../../../utils");
    }, { "../../../const": 46, "../../../utils": 125, "./buildLine": 61 }], 61: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        var c = a.points;if (0 !== c.length) {
          var d = new f.Point(c[0], c[1]),
              e = new f.Point(c[c.length - 2], c[c.length - 1]);if (d.x === e.x && d.y === e.y) {
            c = c.slice(), c.pop(), c.pop(), e = new f.Point(c[c.length - 2], c[c.length - 1]);var h = e.x + .5 * (d.x - e.x),
                i = e.y + .5 * (d.y - e.y);c.unshift(h, i), c.push(h, i);
          }var j = b.points,
              k = b.indices,
              l = c.length / 2,
              m = c.length,
              n = j.length / 6,
              o = a.lineWidth / 2,
              p = (0, g.hex2rgb)(a.lineColor),
              q = a.lineAlpha,
              r = p[0] * q,
              s = p[1] * q,
              t = p[2] * q,
              u = c[0],
              v = c[1],
              w = c[2],
              x = c[3],
              y = 0,
              z = 0,
              A = -(v - x),
              B = u - w,
              C = 0,
              D = 0,
              E = 0,
              F = 0,
              G = Math.sqrt(A * A + B * B);A /= G, B /= G, A *= o, B *= o, j.push(u - A, v - B, r, s, t, q), j.push(u + A, v + B, r, s, t, q);for (var H = 1; H < l - 1; ++H) {
            u = c[2 * (H - 1)], v = c[2 * (H - 1) + 1], w = c[2 * H], x = c[2 * H + 1], y = c[2 * (H + 1)], z = c[2 * (H + 1) + 1], A = -(v - x), B = u - w, G = Math.sqrt(A * A + B * B), A /= G, B /= G, A *= o, B *= o, C = -(x - z), D = w - y, G = Math.sqrt(C * C + D * D), C /= G, D /= G, C *= o, D *= o;var I = -B + v - (-B + x),
                J = -A + w - (-A + u),
                K = (-A + u) * (-B + x) - (-A + w) * (-B + v),
                L = -D + z - (-D + x),
                M = -C + w - (-C + y),
                N = (-C + y) * (-D + x) - (-C + w) * (-D + z),
                O = I * M - L * J;if (Math.abs(O) < .1) O += 10.1, j.push(w - A, x - B, r, s, t, q), j.push(w + A, x + B, r, s, t, q);else {
              var P = (J * N - M * K) / O,
                  Q = (L * K - I * N) / O,
                  R = (P - w) * (P - w) + (Q - x) * (Q - x);R > 196 * o * o ? (E = A - C, F = B - D, G = Math.sqrt(E * E + F * F), E /= G, F /= G, E *= o, F *= o, j.push(w - E, x - F), j.push(r, s, t, q), j.push(w + E, x + F), j.push(r, s, t, q), j.push(w - E, x - F), j.push(r, s, t, q), m++) : (j.push(P, Q), j.push(r, s, t, q), j.push(w - (P - w), x - (Q - x)), j.push(r, s, t, q));
            }
          }u = c[2 * (l - 2)], v = c[2 * (l - 2) + 1], w = c[2 * (l - 1)], x = c[2 * (l - 1) + 1], A = -(v - x), B = u - w, G = Math.sqrt(A * A + B * B), A /= G, B /= G, A *= o, B *= o, j.push(w - A, x - B), j.push(r, s, t, q), j.push(w + A, x + B), j.push(r, s, t, q), k.push(n);for (var S = 0; S < m; ++S) {
            k.push(n++);
          }k.push(n - 1);
        }
      }function e(a, b) {
        var c = 0,
            d = a.points;if (0 !== d.length) {
          var e = b.points,
              f = d.length / 2,
              h = (0, g.hex2rgb)(a.lineColor),
              i = a.lineAlpha,
              j = h[0] * i,
              k = h[1] * i,
              l = h[2] * i;for (c = 1; c < f; c++) {
            var m = d[2 * (c - 1)],
                n = d[2 * (c - 1) + 1],
                o = d[2 * c],
                p = d[2 * c + 1];e.push(m, n), e.push(j, k, l, i), e.push(o, p), e.push(j, k, l, i);
          }
        }
      }c.__esModule = !0, c.default = function (a, b, c) {
        a.nativeLines ? e(a, c) : d(a, b);
      };var f = a("../../../math"),
          g = a("../../../utils");
    }, { "../../../math": 70, "../../../utils": 125 }], 62: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b, c) {
        a.points = a.shape.points.slice();var d = a.points;if (a.fill && d.length >= 6) {
          for (var e = [], f = a.holes, i = 0; i < f.length; i++) {
            var k = f[i];e.push(d.length / 2), d = d.concat(k.points);
          }var l = b.points,
              m = b.indices,
              n = d.length / 2,
              o = (0, h.hex2rgb)(a.fillColor),
              p = a.fillAlpha,
              q = o[0] * p,
              r = o[1] * p,
              s = o[2] * p,
              t = (0, j.default)(d, e, 2);if (!t) return;for (var u = l.length / 6, v = 0; v < t.length; v += 3) {
            m.push(t[v] + u), m.push(t[v] + u), m.push(t[v + 1] + u), m.push(t[v + 2] + u), m.push(t[v + 2] + u);
          }for (var w = 0; w < n; w++) {
            l.push(d[2 * w], d[2 * w + 1], q, r, s, p);
          }
        }a.lineWidth > 0 && (0, g.default)(a, b, c);
      }c.__esModule = !0, c.default = e;var f = a("./buildLine"),
          g = d(f),
          h = a("../../../utils"),
          i = a("earcut"),
          j = d(i);
    }, { "../../../utils": 125, "./buildLine": 61, earcut: 2 }], 63: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b, c) {
        var d = a.shape,
            e = d.x,
            f = d.y,
            i = d.width,
            j = d.height;if (a.fill) {
          var k = (0, h.hex2rgb)(a.fillColor),
              l = a.fillAlpha,
              m = k[0] * l,
              n = k[1] * l,
              o = k[2] * l,
              p = b.points,
              q = b.indices,
              r = p.length / 6;p.push(e, f), p.push(m, n, o, l), p.push(e + i, f), p.push(m, n, o, l), p.push(e, f + j), p.push(m, n, o, l), p.push(e + i, f + j), p.push(m, n, o, l), q.push(r, r, r + 1, r + 2, r + 3, r + 3);
        }if (a.lineWidth) {
          var s = a.points;a.points = [e, f, e + i, f, e + i, f + j, e, f + j, e, f], (0, g.default)(a, b, c), a.points = s;
        }
      }c.__esModule = !0, c.default = e;var f = a("./buildLine"),
          g = d(f),
          h = a("../../../utils");
    }, { "../../../utils": 125, "./buildLine": 61 }], 64: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b, c) {
        var d = a.shape,
            e = d.x,
            f = d.y,
            h = d.width,
            j = d.height,
            m = d.radius,
            n = [];if (n.push(e, f + m), g(e, f + j - m, e, f + j, e + m, f + j, n), g(e + h - m, f + j, e + h, f + j, e + h, f + j - m, n), g(e + h, f + m, e + h, f, e + h - m, f, n), g(e + m, f, e, f, e, f + m + 1e-10, n), a.fill) {
          for (var o = (0, l.hex2rgb)(a.fillColor), p = a.fillAlpha, q = o[0] * p, r = o[1] * p, s = o[2] * p, t = b.points, u = b.indices, v = t.length / 6, w = (0, i.default)(n, null, 2), x = 0, y = w.length; x < y; x += 3) {
            u.push(w[x] + v), u.push(w[x] + v), u.push(w[x + 1] + v), u.push(w[x + 2] + v), u.push(w[x + 2] + v);
          }for (var z = 0, A = n.length; z < A; z++) {
            t.push(n[z], n[++z], q, r, s, p);
          }
        }if (a.lineWidth) {
          var B = a.points;a.points = n, (0, k.default)(a, b, c), a.points = B;
        }
      }function f(a, b, c) {
        var d = b - a;return a + d * c;
      }function g(a, b, c, d, e, g) {
        for (var h = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [], i = 20, j = h, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0; q <= i; ++q) {
          r = q / i, k = f(a, c, r), l = f(b, d, r), m = f(c, e, r), n = f(d, g, r), o = f(k, m, r), p = f(l, n, r), j.push(o, p);
        }return j;
      }c.__esModule = !0, c.default = e;var h = a("earcut"),
          i = d(h),
          j = a("./buildLine"),
          k = d(j),
          l = a("../../../utils");
    }, { "../../../utils": 125, "./buildLine": 61, earcut: 2 }], 65: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0, c.autoDetectRenderer = c.Application = c.Filter = c.SpriteMaskFilter = c.Quad = c.RenderTarget = c.ObjectRenderer = c.WebGLManager = c.Shader = c.CanvasRenderTarget = c.TextureUvs = c.VideoBaseTexture = c.BaseRenderTexture = c.RenderTexture = c.BaseTexture = c.TextureMatrix = c.Texture = c.Spritesheet = c.CanvasGraphicsRenderer = c.GraphicsRenderer = c.GraphicsData = c.Graphics = c.TextMetrics = c.TextStyle = c.Text = c.SpriteRenderer = c.CanvasTinter = c.CanvasSpriteRenderer = c.Sprite = c.TransformBase = c.TransformStatic = c.Transform = c.Container = c.DisplayObject = c.Bounds = c.glCore = c.WebGLRenderer = c.CanvasRenderer = c.ticker = c.utils = c.settings = void 0;var f = a("./const");Object.keys(f).forEach(function (a) {
        "default" !== a && "__esModule" !== a && Object.defineProperty(c, a, { enumerable: !0, get: function get() {
            return f[a];
          } });
      });var g = a("./math");Object.keys(g).forEach(function (a) {
        "default" !== a && "__esModule" !== a && Object.defineProperty(c, a, { enumerable: !0, get: function get() {
            return g[a];
          } });
      });var h = a("pixi-gl-core");Object.defineProperty(c, "glCore", { enumerable: !0, get: function get() {
          return e(h).default;
        } });var i = a("./display/Bounds");Object.defineProperty(c, "Bounds", { enumerable: !0, get: function get() {
          return e(i).default;
        } });var j = a("./display/DisplayObject");Object.defineProperty(c, "DisplayObject", { enumerable: !0, get: function get() {
          return e(j).default;
        } });var k = a("./display/Container");Object.defineProperty(c, "Container", { enumerable: !0, get: function get() {
          return e(k).default;
        } });var l = a("./display/Transform");Object.defineProperty(c, "Transform", { enumerable: !0, get: function get() {
          return e(l).default;
        } });var m = a("./display/TransformStatic");Object.defineProperty(c, "TransformStatic", { enumerable: !0, get: function get() {
          return e(m).default;
        } });var n = a("./display/TransformBase");Object.defineProperty(c, "TransformBase", { enumerable: !0, get: function get() {
          return e(n).default;
        } });var o = a("./sprites/Sprite");Object.defineProperty(c, "Sprite", { enumerable: !0, get: function get() {
          return e(o).default;
        } });var p = a("./sprites/canvas/CanvasSpriteRenderer");Object.defineProperty(c, "CanvasSpriteRenderer", { enumerable: !0, get: function get() {
          return e(p).default;
        } });var q = a("./sprites/canvas/CanvasTinter");Object.defineProperty(c, "CanvasTinter", { enumerable: !0, get: function get() {
          return e(q).default;
        } });var r = a("./sprites/webgl/SpriteRenderer");Object.defineProperty(c, "SpriteRenderer", { enumerable: !0, get: function get() {
          return e(r).default;
        } });var s = a("./text/Text");Object.defineProperty(c, "Text", { enumerable: !0, get: function get() {
          return e(s).default;
        } });var t = a("./text/TextStyle");Object.defineProperty(c, "TextStyle", { enumerable: !0, get: function get() {
          return e(t).default;
        } });var u = a("./text/TextMetrics");Object.defineProperty(c, "TextMetrics", { enumerable: !0, get: function get() {
          return e(u).default;
        } });var v = a("./graphics/Graphics");Object.defineProperty(c, "Graphics", { enumerable: !0, get: function get() {
          return e(v).default;
        } });var w = a("./graphics/GraphicsData");Object.defineProperty(c, "GraphicsData", { enumerable: !0, get: function get() {
          return e(w).default;
        } });var x = a("./graphics/webgl/GraphicsRenderer");Object.defineProperty(c, "GraphicsRenderer", { enumerable: !0, get: function get() {
          return e(x).default;
        } });var y = a("./graphics/canvas/CanvasGraphicsRenderer");Object.defineProperty(c, "CanvasGraphicsRenderer", { enumerable: !0, get: function get() {
          return e(y).default;
        } });var z = a("./textures/Spritesheet");Object.defineProperty(c, "Spritesheet", { enumerable: !0, get: function get() {
          return e(z).default;
        } });var A = a("./textures/Texture");Object.defineProperty(c, "Texture", { enumerable: !0, get: function get() {
          return e(A).default;
        } });var B = a("./textures/TextureMatrix");Object.defineProperty(c, "TextureMatrix", { enumerable: !0, get: function get() {
          return e(B).default;
        } });var C = a("./textures/BaseTexture");Object.defineProperty(c, "BaseTexture", { enumerable: !0, get: function get() {
          return e(C).default;
        } });var D = a("./textures/RenderTexture");Object.defineProperty(c, "RenderTexture", { enumerable: !0, get: function get() {
          return e(D).default;
        } });var E = a("./textures/BaseRenderTexture");Object.defineProperty(c, "BaseRenderTexture", { enumerable: !0, get: function get() {
          return e(E).default;
        } });var F = a("./textures/VideoBaseTexture");Object.defineProperty(c, "VideoBaseTexture", { enumerable: !0, get: function get() {
          return e(F).default;
        } });var G = a("./textures/TextureUvs");Object.defineProperty(c, "TextureUvs", { enumerable: !0, get: function get() {
          return e(G).default;
        } });var H = a("./renderers/canvas/utils/CanvasRenderTarget");Object.defineProperty(c, "CanvasRenderTarget", { enumerable: !0, get: function get() {
          return e(H).default;
        } });var I = a("./Shader");Object.defineProperty(c, "Shader", { enumerable: !0, get: function get() {
          return e(I).default;
        } });var J = a("./renderers/webgl/managers/WebGLManager");Object.defineProperty(c, "WebGLManager", { enumerable: !0, get: function get() {
          return e(J).default;
        } });var K = a("./renderers/webgl/utils/ObjectRenderer");Object.defineProperty(c, "ObjectRenderer", { enumerable: !0, get: function get() {
          return e(K).default;
        } });var L = a("./renderers/webgl/utils/RenderTarget");Object.defineProperty(c, "RenderTarget", { enumerable: !0, get: function get() {
          return e(L).default;
        } });var M = a("./renderers/webgl/utils/Quad");Object.defineProperty(c, "Quad", { enumerable: !0, get: function get() {
          return e(M).default;
        } });var N = a("./renderers/webgl/filters/spriteMask/SpriteMaskFilter");Object.defineProperty(c, "SpriteMaskFilter", { enumerable: !0, get: function get() {
          return e(N).default;
        } });var O = a("./renderers/webgl/filters/Filter");Object.defineProperty(c, "Filter", { enumerable: !0, get: function get() {
          return e(O).default;
        } });var P = a("./Application");Object.defineProperty(c, "Application", { enumerable: !0, get: function get() {
          return e(P).default;
        } });var Q = a("./autoDetectRenderer");Object.defineProperty(c, "autoDetectRenderer", { enumerable: !0, get: function get() {
          return Q.autoDetectRenderer;
        } });var R = a("./utils"),
          S = d(R),
          T = a("./ticker"),
          U = d(T),
          V = a("./settings"),
          W = e(V),
          X = a("./renderers/canvas/CanvasRenderer"),
          Y = e(X),
          Z = a("./renderers/webgl/WebGLRenderer"),
          $ = e(Z);c.settings = W.default, c.utils = S, c.ticker = U, c.CanvasRenderer = Y.default, c.WebGLRenderer = $.default;
    }, { "./Application": 43, "./Shader": 44, "./autoDetectRenderer": 45, "./const": 46, "./display/Bounds": 47, "./display/Container": 48, "./display/DisplayObject": 49, "./display/Transform": 50, "./display/TransformBase": 51, "./display/TransformStatic": 52, "./graphics/Graphics": 53, "./graphics/GraphicsData": 54, "./graphics/canvas/CanvasGraphicsRenderer": 55, "./graphics/webgl/GraphicsRenderer": 57, "./math": 70, "./renderers/canvas/CanvasRenderer": 77, "./renderers/canvas/utils/CanvasRenderTarget": 79, "./renderers/webgl/WebGLRenderer": 84, "./renderers/webgl/filters/Filter": 86, "./renderers/webgl/filters/spriteMask/SpriteMaskFilter": 89, "./renderers/webgl/managers/WebGLManager": 93, "./renderers/webgl/utils/ObjectRenderer": 94, "./renderers/webgl/utils/Quad": 95, "./renderers/webgl/utils/RenderTarget": 96, "./settings": 101, "./sprites/Sprite": 102, "./sprites/canvas/CanvasSpriteRenderer": 103, "./sprites/canvas/CanvasTinter": 104, "./sprites/webgl/SpriteRenderer": 106, "./text/Text": 108, "./text/TextMetrics": 109, "./text/TextStyle": 110, "./textures/BaseRenderTexture": 111, "./textures/BaseTexture": 112, "./textures/RenderTexture": 113, "./textures/Spritesheet": 114, "./textures/Texture": 115, "./textures/TextureMatrix": 116, "./textures/TextureUvs": 117, "./textures/VideoBaseTexture": 118, "./ticker": 121, "./utils": 125, "pixi-gl-core": 12 }], 66: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        return a < 0 ? -1 : a > 0 ? 1 : 0;
      }function f() {
        for (var a = 0; a < 16; a++) {
          var b = [];n.push(b);for (var c = 0; c < 16; c++) {
            for (var d = e(i[a] * i[c] + k[a] * j[c]), f = e(j[a] * i[c] + l[a] * j[c]), g = e(i[a] * k[c] + k[a] * l[c]), o = e(j[a] * k[c] + l[a] * l[c]), p = 0; p < 16; p++) {
              if (i[p] === d && j[p] === f && k[p] === g && l[p] === o) {
                b.push(p);break;
              }
            }
          }
        }for (var q = 0; q < 16; q++) {
          var r = new h.default();r.set(i[q], j[q], k[q], l[q], 0, 0), m.push(r);
        }
      }c.__esModule = !0;var g = a("./Matrix"),
          h = d(g),
          i = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
          j = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
          k = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
          l = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
          m = [],
          n = [];f();var o = { E: 0, SE: 1, S: 2, SW: 3, W: 4, NW: 5, N: 6, NE: 7, MIRROR_VERTICAL: 8, MIRROR_HORIZONTAL: 12, uX: function uX(a) {
          return i[a];
        }, uY: function uY(a) {
          return j[a];
        }, vX: function vX(a) {
          return k[a];
        }, vY: function vY(a) {
          return l[a];
        }, inv: function inv(a) {
          return 8 & a ? 15 & a : 7 & -a;
        }, add: function add(a, b) {
          return n[a][b];
        }, sub: function sub(a, b) {
          return n[a][o.inv(b)];
        }, rotate180: function rotate180(a) {
          return 4 ^ a;
        }, isVertical: function isVertical(a) {
          return 2 === (3 & a);
        }, byDirection: function byDirection(a, b) {
          return 2 * Math.abs(a) <= Math.abs(b) ? b >= 0 ? o.S : o.N : 2 * Math.abs(b) <= Math.abs(a) ? a > 0 ? o.E : o.W : b > 0 ? a > 0 ? o.SE : o.SW : a > 0 ? o.NE : o.NW;
        }, matrixAppendRotationInv: function matrixAppendRotationInv(a, b) {
          var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
              e = m[o.inv(b)];e.tx = c, e.ty = d, a.append(e);
        } };c.default = o;
    }, { "./Matrix": 67 }], 67: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          g = a("./Point"),
          h = d(g),
          i = function () {
        function a() {
          var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              f = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
              g = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
              h = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;e(this, a), this.a = b, this.b = c, this.c = d, this.d = f, this.tx = g, this.ty = h, this.array = null;
        }return a.prototype.fromArray = function (a) {
          this.a = a[0], this.b = a[1], this.c = a[3], this.d = a[4], this.tx = a[2], this.ty = a[5];
        }, a.prototype.set = function (a, b, c, d, e, f) {
          return this.a = a, this.b = b, this.c = c, this.d = d, this.tx = e, this.ty = f, this;
        }, a.prototype.toArray = function (a, b) {
          this.array || (this.array = new Float32Array(9));var c = b || this.array;return a ? (c[0] = this.a, c[1] = this.b, c[2] = 0, c[3] = this.c, c[4] = this.d, c[5] = 0, c[6] = this.tx, c[7] = this.ty, c[8] = 1) : (c[0] = this.a, c[1] = this.c, c[2] = this.tx, c[3] = this.b, c[4] = this.d, c[5] = this.ty, c[6] = 0, c[7] = 0, c[8] = 1), c;
        }, a.prototype.apply = function (a, b) {
          b = b || new h.default();var c = a.x,
              d = a.y;return b.x = this.a * c + this.c * d + this.tx, b.y = this.b * c + this.d * d + this.ty, b;
        }, a.prototype.applyInverse = function (a, b) {
          b = b || new h.default();var c = 1 / (this.a * this.d + this.c * -this.b),
              d = a.x,
              e = a.y;return b.x = this.d * c * d + -this.c * c * e + (this.ty * this.c - this.tx * this.d) * c, b.y = this.a * c * e + -this.b * c * d + (-this.ty * this.a + this.tx * this.b) * c, b;
        }, a.prototype.translate = function (a, b) {
          return this.tx += a, this.ty += b, this;
        }, a.prototype.scale = function (a, b) {
          return this.a *= a, this.d *= b, this.c *= a, this.b *= b, this.tx *= a, this.ty *= b, this;
        }, a.prototype.rotate = function (a) {
          var b = Math.cos(a),
              c = Math.sin(a),
              d = this.a,
              e = this.c,
              f = this.tx;return this.a = d * b - this.b * c, this.b = d * c + this.b * b, this.c = e * b - this.d * c, this.d = e * c + this.d * b, this.tx = f * b - this.ty * c, this.ty = f * c + this.ty * b, this;
        }, a.prototype.append = function (a) {
          var b = this.a,
              c = this.b,
              d = this.c,
              e = this.d;return this.a = a.a * b + a.b * d, this.b = a.a * c + a.b * e, this.c = a.c * b + a.d * d, this.d = a.c * c + a.d * e, this.tx = a.tx * b + a.ty * d + this.tx, this.ty = a.tx * c + a.ty * e + this.ty, this;
        }, a.prototype.setTransform = function (a, b, c, d, e, f, g, h, i) {
          var j = Math.sin(g),
              k = Math.cos(g),
              l = Math.cos(i),
              m = Math.sin(i),
              n = -Math.sin(h),
              o = Math.cos(h),
              p = k * e,
              q = j * e,
              r = -j * f,
              s = k * f;return this.a = l * p + m * r, this.b = l * q + m * s, this.c = n * p + o * r, this.d = n * q + o * s, this.tx = a + (c * p + d * r), this.ty = b + (c * q + d * s), this;
        }, a.prototype.prepend = function (a) {
          var b = this.tx;if (1 !== a.a || 0 !== a.b || 0 !== a.c || 1 !== a.d) {
            var c = this.a,
                d = this.c;this.a = c * a.a + this.b * a.c, this.b = c * a.b + this.b * a.d, this.c = d * a.a + this.d * a.c, this.d = d * a.b + this.d * a.d;
          }return this.tx = b * a.a + this.ty * a.c + a.tx, this.ty = b * a.b + this.ty * a.d + a.ty, this;
        }, a.prototype.decompose = function (a) {
          var b = this.a,
              c = this.b,
              d = this.c,
              e = this.d,
              f = -Math.atan2(-d, e),
              g = Math.atan2(c, b),
              h = Math.abs(f + g);return h < 1e-5 ? (a.rotation = g, b < 0 && e >= 0 && (a.rotation += a.rotation <= 0 ? Math.PI : -Math.PI), a.skew.x = a.skew.y = 0) : (a.skew.x = f, a.skew.y = g), a.scale.x = Math.sqrt(b * b + c * c), a.scale.y = Math.sqrt(d * d + e * e), a.position.x = this.tx, a.position.y = this.ty, a;
        }, a.prototype.invert = function () {
          var a = this.a,
              b = this.b,
              c = this.c,
              d = this.d,
              e = this.tx,
              f = a * d - b * c;return this.a = d / f, this.b = -b / f, this.c = -c / f, this.d = a / f, this.tx = (c * this.ty - d * e) / f, this.ty = -(a * this.ty - b * e) / f, this;
        }, a.prototype.identity = function () {
          return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
        }, a.prototype.clone = function () {
          var b = new a();return b.a = this.a, b.b = this.b, b.c = this.c, b.d = this.d, b.tx = this.tx, b.ty = this.ty, b;
        }, a.prototype.copy = function (a) {
          return a.a = this.a, a.b = this.b, a.c = this.c, a.d = this.d, a.tx = this.tx, a.ty = this.ty, a;
        }, f(a, null, [{ key: "IDENTITY", get: function get() {
            return new a();
          } }, { key: "TEMP_MATRIX", get: function get() {
            return new a();
          } }]), a;
      }();c.default = i;
    }, { "./Point": 69 }], 68: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          f = function () {
        function a(b, c) {
          var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              f = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;d(this, a), this._x = e, this._y = f, this.cb = b, this.scope = c;
        }return a.prototype.set = function (a, b) {
          var c = a || 0,
              d = b || (0 !== b ? c : 0);this._x === c && this._y === d || (this._x = c, this._y = d, this.cb.call(this.scope));
        }, a.prototype.copy = function (a) {
          this._x === a.x && this._y === a.y || (this._x = a.x, this._y = a.y, this.cb.call(this.scope));
        }, e(a, [{ key: "x", get: function get() {
            return this._x;
          }, set: function set(a) {
            this._x !== a && (this._x = a, this.cb.call(this.scope));
          } }, { key: "y", get: function get() {
            return this._y;
          }, set: function set(a) {
            this._y !== a && (this._y = a, this.cb.call(this.scope));
          } }]), a;
      }();c.default = f;
    }, {}], 69: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a() {
          var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;d(this, a), this.x = b, this.y = c;
        }return a.prototype.clone = function () {
          return new a(this.x, this.y);
        }, a.prototype.copy = function (a) {
          this.set(a.x, a.y);
        }, a.prototype.equals = function (a) {
          return a.x === this.x && a.y === this.y;
        }, a.prototype.set = function (a, b) {
          this.x = a || 0, this.y = b || (0 !== b ? this.x : 0);
        }, a;
      }();c.default = e;
    }, {}], 70: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0;var e = a("./Point");Object.defineProperty(c, "Point", { enumerable: !0, get: function get() {
          return d(e).default;
        } });var f = a("./ObservablePoint");Object.defineProperty(c, "ObservablePoint", { enumerable: !0, get: function get() {
          return d(f).default;
        } });var g = a("./Matrix");Object.defineProperty(c, "Matrix", { enumerable: !0, get: function get() {
          return d(g).default;
        } });var h = a("./GroupD8");Object.defineProperty(c, "GroupD8", { enumerable: !0, get: function get() {
          return d(h).default;
        } });var i = a("./shapes/Circle");Object.defineProperty(c, "Circle", { enumerable: !0, get: function get() {
          return d(i).default;
        } });var j = a("./shapes/Ellipse");Object.defineProperty(c, "Ellipse", { enumerable: !0, get: function get() {
          return d(j).default;
        } });var k = a("./shapes/Polygon");Object.defineProperty(c, "Polygon", { enumerable: !0, get: function get() {
          return d(k).default;
        } });var l = a("./shapes/Rectangle");Object.defineProperty(c, "Rectangle", { enumerable: !0, get: function get() {
          return d(l).default;
        } });var m = a("./shapes/RoundedRectangle");Object.defineProperty(c, "RoundedRectangle", { enumerable: !0, get: function get() {
          return d(m).default;
        } });
    }, { "./GroupD8": 66, "./Matrix": 67, "./ObservablePoint": 68, "./Point": 69, "./shapes/Circle": 71, "./shapes/Ellipse": 72, "./shapes/Polygon": 73, "./shapes/Rectangle": 74, "./shapes/RoundedRectangle": 75 }], 71: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("./Rectangle"),
          g = d(f),
          h = a("../../const"),
          i = function () {
        function a() {
          var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;e(this, a), this.x = b, this.y = c, this.radius = d, this.type = h.SHAPES.CIRC;
        }return a.prototype.clone = function () {
          return new a(this.x, this.y, this.radius);
        }, a.prototype.contains = function (a, b) {
          if (this.radius <= 0) return !1;var c = this.radius * this.radius,
              d = this.x - a,
              e = this.y - b;return d *= d, e *= e, d + e <= c;
        }, a.prototype.getBounds = function () {
          return new g.default(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
        }, a;
      }();c.default = i;
    }, { "../../const": 46, "./Rectangle": 74 }], 72: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("./Rectangle"),
          g = d(f),
          h = a("../../const"),
          i = function () {
        function a() {
          var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              f = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;e(this, a), this.x = b, this.y = c, this.width = d, this.height = f, this.type = h.SHAPES.ELIP;
        }return a.prototype.clone = function () {
          return new a(this.x, this.y, this.width, this.height);
        }, a.prototype.contains = function (a, b) {
          if (this.width <= 0 || this.height <= 0) return !1;var c = (a - this.x) / this.width,
              d = (b - this.y) / this.height;return c *= c, d *= d, c + d <= 1;
        }, a.prototype.getBounds = function () {
          return new g.default(this.x - this.width, this.y - this.height, this.width, this.height);
        }, a;
      }();c.default = i;
    }, { "../../const": 46, "./Rectangle": 74 }], 73: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("../Point"),
          g = d(f),
          h = a("../../const"),
          i = function () {
        function a() {
          for (var b = arguments.length, c = Array(b), d = 0; d < b; d++) {
            c[d] = arguments[d];
          }if (e(this, a), Array.isArray(c[0]) && (c = c[0]), c[0] instanceof g.default) {
            for (var f = [], i = 0, j = c.length; i < j; i++) {
              f.push(c[i].x, c[i].y);
            }c = f;
          }this.closed = !0, this.points = c, this.type = h.SHAPES.POLY;
        }return a.prototype.clone = function () {
          return new a(this.points.slice());
        }, a.prototype.close = function () {
          var a = this.points;a[0] === a[a.length - 2] && a[1] === a[a.length - 1] || a.push(a[0], a[1]);
        }, a.prototype.contains = function (a, b) {
          for (var c = !1, d = this.points.length / 2, e = 0, f = d - 1; e < d; f = e++) {
            var g = this.points[2 * e],
                h = this.points[2 * e + 1],
                i = this.points[2 * f],
                j = this.points[2 * f + 1],
                k = h > b != j > b && a < (i - g) * ((b - h) / (j - h)) + g;k && (c = !c);
          }return c;
        }, a;
      }();c.default = i;
    }, { "../../const": 46, "../Point": 69 }], 74: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          f = a("../../const"),
          g = function () {
        function a() {
          var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              g = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;d(this, a), this.x = Number(b), this.y = Number(c), this.width = Number(e), this.height = Number(g), this.type = f.SHAPES.RECT;
        }return a.prototype.clone = function () {
          return new a(this.x, this.y, this.width, this.height);
        }, a.prototype.copy = function (a) {
          return this.x = a.x, this.y = a.y, this.width = a.width, this.height = a.height, this;
        }, a.prototype.contains = function (a, b) {
          return !(this.width <= 0 || this.height <= 0) && a >= this.x && a < this.x + this.width && b >= this.y && b < this.y + this.height;
        }, a.prototype.pad = function (a, b) {
          a = a || 0, b = b || (0 !== b ? a : 0), this.x -= a, this.y -= b, this.width += 2 * a, this.height += 2 * b;
        }, a.prototype.fit = function (a) {
          this.x < a.x && (this.width += this.x, this.width < 0 && (this.width = 0), this.x = a.x), this.y < a.y && (this.height += this.y, this.height < 0 && (this.height = 0), this.y = a.y), this.x + this.width > a.x + a.width && (this.width = a.width - this.x, this.width < 0 && (this.width = 0)), this.y + this.height > a.y + a.height && (this.height = a.height - this.y, this.height < 0 && (this.height = 0));
        }, a.prototype.enlarge = function (a) {
          var b = Math.min(this.x, a.x),
              c = Math.max(this.x + this.width, a.x + a.width),
              d = Math.min(this.y, a.y),
              e = Math.max(this.y + this.height, a.y + a.height);this.x = b, this.width = c - b, this.y = d, this.height = e - d;
        }, e(a, [{ key: "left", get: function get() {
            return this.x;
          } }, { key: "right", get: function get() {
            return this.x + this.width;
          } }, { key: "top", get: function get() {
            return this.y;
          } }, { key: "bottom", get: function get() {
            return this.y + this.height;
          } }], [{ key: "EMPTY", get: function get() {
            return new a(0, 0, 0, 0);
          } }]), a;
      }();c.default = g;
    }, { "../../const": 46 }], 75: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = a("../../const"),
          f = function () {
        function a() {
          var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              f = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              g = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
              h = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 20;d(this, a), this.x = b, this.y = c, this.width = f, this.height = g, this.radius = h, this.type = e.SHAPES.RREC;
        }return a.prototype.clone = function () {
          return new a(this.x, this.y, this.width, this.height, this.radius);
        }, a.prototype.contains = function (a, b) {
          if (this.width <= 0 || this.height <= 0) return !1;if (a >= this.x && a <= this.x + this.width && b >= this.y && b <= this.y + this.height) {
            if (b >= this.y + this.radius && b <= this.y + this.height - this.radius || a >= this.x + this.radius && a <= this.x + this.width - this.radius) return !0;var c = a - (this.x + this.radius),
                d = b - (this.y + this.radius),
                e = this.radius * this.radius;if (c * c + d * d <= e) return !0;if (c = a - (this.x + this.width - this.radius), c * c + d * d <= e) return !0;if (d = b - (this.y + this.height - this.radius), c * c + d * d <= e) return !0;if (c = a - (this.x + this.radius), c * c + d * d <= e) return !0;
          }return !1;
        }, a;
      }();c.default = f;
    }, { "../../const": 46 }], 76: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../utils"),
          j = a("../math"),
          k = a("../const"),
          l = a("../settings"),
          m = d(l),
          n = a("../display/Container"),
          o = d(n),
          p = a("../textures/RenderTexture"),
          q = d(p),
          r = a("eventemitter3"),
          s = d(r),
          t = new j.Matrix(),
          u = function (a) {
        function b(c, d, g, h) {
          e(this, b);var l = f(this, a.call(this));return (0, i.sayHello)(c), "number" == typeof d && (d = Object.assign({ width: d, height: g || m.default.RENDER_OPTIONS.height }, h)), d = Object.assign({}, m.default.RENDER_OPTIONS, d), l.options = d, l.type = k.RENDERER_TYPE.UNKNOWN, l.screen = new j.Rectangle(0, 0, d.width, d.height), l.view = d.view || document.createElement("canvas"), l.resolution = d.resolution || m.default.RESOLUTION, l.transparent = d.transparent, l.autoResize = d.autoResize || !1, l.blendModes = null, l.preserveDrawingBuffer = d.preserveDrawingBuffer, l.clearBeforeRender = d.clearBeforeRender, l.roundPixels = d.roundPixels, l._backgroundColor = 0, l._backgroundColorRgba = [0, 0, 0, 0], l._backgroundColorString = "#000000", l.backgroundColor = d.backgroundColor || l._backgroundColor, l._tempDisplayObjectParent = new o.default(), l._lastObjectRendered = l._tempDisplayObjectParent, l;
        }return g(b, a), b.prototype.resize = function (a, b) {
          this.screen.width = a, this.screen.height = b, this.view.width = a * this.resolution, this.view.height = b * this.resolution, this.autoResize && (this.view.style.width = a + "px", this.view.style.height = b + "px");
        }, b.prototype.generateTexture = function (a, b, c) {
          var d = a.getLocalBounds(),
              e = q.default.create(0 | d.width, 0 | d.height, b, c);return t.tx = -d.x, t.ty = -d.y, this.render(a, e, !1, t, !0), e;
        }, b.prototype.destroy = function (a) {
          a && this.view.parentNode && this.view.parentNode.removeChild(this.view), this.type = k.RENDERER_TYPE.UNKNOWN, this.view = null, this.screen = null, this.resolution = 0, this.transparent = !1, this.autoResize = !1, this.blendModes = null, this.options = null, this.preserveDrawingBuffer = !1, this.clearBeforeRender = !1, this.roundPixels = !1, this._backgroundColor = 0, this._backgroundColorRgba = null, this._backgroundColorString = null, this._tempDisplayObjectParent = null, this._lastObjectRendered = null;
        }, h(b, [{ key: "width", get: function get() {
            return this.view.width;
          } }, { key: "height", get: function get() {
            return this.view.height;
          } }, { key: "backgroundColor", get: function get() {
            return this._backgroundColor;
          }, set: function set(a) {
            this._backgroundColor = a, this._backgroundColorString = (0, i.hex2string)(a), (0, i.hex2rgb)(a, this._backgroundColorRgba);
          } }]), b;
      }(s.default);c.default = u;
    }, { "../const": 46, "../display/Container": 48, "../math": 70, "../settings": 101, "../textures/RenderTexture": 113, "../utils": 125, eventemitter3: 3 }], 77: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../SystemRenderer"),
          i = d(h),
          j = a("./utils/CanvasMaskManager"),
          k = d(j),
          l = a("./utils/CanvasRenderTarget"),
          m = d(l),
          n = a("./utils/mapCanvasBlendModesToPixi"),
          o = d(n),
          p = a("../../utils"),
          q = a("../../const"),
          r = a("../../settings"),
          s = d(r),
          t = function (a) {
        function b(c, d, g) {
          e(this, b);var h = f(this, a.call(this, "Canvas", c, d, g));return h.type = q.RENDERER_TYPE.CANVAS, h.rootContext = h.view.getContext("2d", { alpha: h.transparent }), h.context = h.rootContext, h.refresh = !0, h.maskManager = new k.default(h), h.smoothProperty = "imageSmoothingEnabled", h.rootContext.imageSmoothingEnabled || (h.rootContext.webkitImageSmoothingEnabled ? h.smoothProperty = "webkitImageSmoothingEnabled" : h.rootContext.mozImageSmoothingEnabled ? h.smoothProperty = "mozImageSmoothingEnabled" : h.rootContext.oImageSmoothingEnabled ? h.smoothProperty = "oImageSmoothingEnabled" : h.rootContext.msImageSmoothingEnabled && (h.smoothProperty = "msImageSmoothingEnabled")), h.initPlugins(), h.blendModes = (0, o.default)(), h._activeBlendMode = null, h.renderingToScreen = !1, h.resize(h.options.width, h.options.height), h;
        }return g(b, a), b.prototype.render = function (a, b, c, d, e) {
          if (this.view) {
            this.renderingToScreen = !b, this.emit("prerender");var f = this.resolution;b ? (b = b.baseTexture || b, b._canvasRenderTarget || (b._canvasRenderTarget = new m.default(b.width, b.height, b.resolution), b.source = b._canvasRenderTarget.canvas, b.valid = !0), this.context = b._canvasRenderTarget.context, this.resolution = b._canvasRenderTarget.resolution) : this.context = this.rootContext;var g = this.context;if (b || (this._lastObjectRendered = a), !e) {
              var h = a.parent,
                  i = this._tempDisplayObjectParent.transform.worldTransform;d ? (d.copy(i), this._tempDisplayObjectParent.transform._worldID = -1) : i.identity(), a.parent = this._tempDisplayObjectParent, a.updateTransform(), a.parent = h;
            }g.save(), g.setTransform(1, 0, 0, 1, 0, 0), g.globalAlpha = 1, this._activeBlendMode = q.BLEND_MODES.NORMAL, g.globalCompositeOperation = this.blendModes[q.BLEND_MODES.NORMAL], navigator.isCocoonJS && this.view.screencanvas && (g.fillStyle = "black", g.clear()), (void 0 !== c ? c : this.clearBeforeRender) && this.renderingToScreen && (this.transparent ? g.clearRect(0, 0, this.width, this.height) : (g.fillStyle = this._backgroundColorString, g.fillRect(0, 0, this.width, this.height)));var j = this.context;this.context = g, a.renderCanvas(this), this.context = j, g.restore(), this.resolution = f, this.emit("postrender");
          }
        }, b.prototype.clear = function (a) {
          var b = this.context;a = a || this._backgroundColorString, !this.transparent && a ? (b.fillStyle = a, b.fillRect(0, 0, this.width, this.height)) : b.clearRect(0, 0, this.width, this.height);
        }, b.prototype.setBlendMode = function (a) {
          this._activeBlendMode !== a && (this._activeBlendMode = a, this.context.globalCompositeOperation = this.blendModes[a]);
        }, b.prototype.destroy = function (b) {
          this.destroyPlugins(), a.prototype.destroy.call(this, b), this.context = null, this.refresh = !0, this.maskManager.destroy(), this.maskManager = null, this.smoothProperty = null;
        }, b.prototype.resize = function (b, c) {
          a.prototype.resize.call(this, b, c), this.smoothProperty && (this.rootContext[this.smoothProperty] = s.default.SCALE_MODE === q.SCALE_MODES.LINEAR);
        }, b.prototype.invalidateBlendMode = function () {
          this._activeBlendMode = this.blendModes.indexOf(this.context.globalCompositeOperation);
        }, b;
      }(i.default);c.default = t, p.pluginTarget.mixin(t);
    }, { "../../const": 46, "../../settings": 101, "../../utils": 125, "../SystemRenderer": 76, "./utils/CanvasMaskManager": 78, "./utils/CanvasRenderTarget": 79, "./utils/mapCanvasBlendModesToPixi": 81 }], 78: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = a("../../../const"),
          f = function () {
        function a(b) {
          d(this, a), this.renderer = b;
        }return a.prototype.pushMask = function (a) {
          var b = this.renderer;b.context.save();var c = a.alpha,
              d = a.transform.worldTransform,
              e = b.resolution;b.context.setTransform(d.a * e, d.b * e, d.c * e, d.d * e, d.tx * e, d.ty * e), a._texture || (this.renderGraphicsShape(a), b.context.clip()), a.worldAlpha = c;
        }, a.prototype.renderGraphicsShape = function (a) {
          var b = this.renderer.context,
              c = a.graphicsData.length;if (0 !== c) {
            b.beginPath();for (var d = 0; d < c; d++) {
              var f = a.graphicsData[d],
                  g = f.shape;if (f.type === e.SHAPES.POLY) {
                var h = g.points;b.moveTo(h[0], h[1]);for (var i = 1; i < h.length / 2; i++) {
                  b.lineTo(h[2 * i], h[2 * i + 1]);
                }h[0] === h[h.length - 2] && h[1] === h[h.length - 1] && b.closePath();
              } else if (f.type === e.SHAPES.RECT) b.rect(g.x, g.y, g.width, g.height), b.closePath();else if (f.type === e.SHAPES.CIRC) b.arc(g.x, g.y, g.radius, 0, 2 * Math.PI), b.closePath();else if (f.type === e.SHAPES.ELIP) {
                var j = 2 * g.width,
                    k = 2 * g.height,
                    l = g.x - j / 2,
                    m = g.y - k / 2,
                    n = .5522848,
                    o = j / 2 * n,
                    p = k / 2 * n,
                    q = l + j,
                    r = m + k,
                    s = l + j / 2,
                    t = m + k / 2;b.moveTo(l, t), b.bezierCurveTo(l, t - p, s - o, m, s, m), b.bezierCurveTo(s + o, m, q, t - p, q, t), b.bezierCurveTo(q, t + p, s + o, r, s, r), b.bezierCurveTo(s - o, r, l, t + p, l, t), b.closePath();
              } else if (f.type === e.SHAPES.RREC) {
                var u = g.x,
                    v = g.y,
                    w = g.width,
                    x = g.height,
                    y = g.radius,
                    z = Math.min(w, x) / 2 | 0;y = y > z ? z : y, b.moveTo(u, v + y), b.lineTo(u, v + x - y), b.quadraticCurveTo(u, v + x, u + y, v + x), b.lineTo(u + w - y, v + x), b.quadraticCurveTo(u + w, v + x, u + w, v + x - y), b.lineTo(u + w, v + y), b.quadraticCurveTo(u + w, v, u + w - y, v), b.lineTo(u + y, v), b.quadraticCurveTo(u, v, u, v + y), b.closePath();
              }
            }
          }
        }, a.prototype.popMask = function (a) {
          a.context.restore(), a.invalidateBlendMode();
        }, a.prototype.destroy = function () {}, a;
      }();c.default = f;
    }, { "../../../const": 46 }], 79: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          g = a("../../../settings"),
          h = d(g),
          i = function () {
        function a(b, c, d) {
          e(this, a), this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = d || h.default.RESOLUTION, this.resize(b, c);
        }return a.prototype.clear = function () {
          this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }, a.prototype.resize = function (a, b) {
          this.canvas.width = a * this.resolution, this.canvas.height = b * this.resolution;
        }, a.prototype.destroy = function () {
          this.context = null, this.canvas = null;
        }, f(a, [{ key: "width", get: function get() {
            return this.canvas.width;
          }, set: function set(a) {
            this.canvas.width = a;
          } }, { key: "height", get: function get() {
            return this.canvas.height;
          }, set: function set(a) {
            this.canvas.height = a;
          } }]), a;
      }();c.default = i;
    }, { "../../../settings": 101 }], 80: [function (a, b, c) {
      "use strict";
      function d(a) {
        var b = document.createElement("canvas");b.width = 6, b.height = 1;var c = b.getContext("2d");return c.fillStyle = a, c.fillRect(0, 0, 6, 1), b;
      }function e() {
        if ("undefined" == typeof document) return !1;var a = d("#ff00ff"),
            b = d("#ffff00"),
            c = document.createElement("canvas");c.width = 6, c.height = 1;var e = c.getContext("2d");e.globalCompositeOperation = "multiply", e.drawImage(a, 0, 0), e.drawImage(b, 2, 0);var f = e.getImageData(2, 0, 1, 1);if (!f) return !1;var g = f.data;return 255 === g[0] && 0 === g[1] && 0 === g[2];
      }c.__esModule = !0, c.default = e;
    }, {}], 81: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];return (0, h.default)() ? (a[f.BLEND_MODES.NORMAL] = "source-over", a[f.BLEND_MODES.ADD] = "lighter", a[f.BLEND_MODES.MULTIPLY] = "multiply", a[f.BLEND_MODES.SCREEN] = "screen", a[f.BLEND_MODES.OVERLAY] = "overlay", a[f.BLEND_MODES.DARKEN] = "darken", a[f.BLEND_MODES.LIGHTEN] = "lighten", a[f.BLEND_MODES.COLOR_DODGE] = "color-dodge", a[f.BLEND_MODES.COLOR_BURN] = "color-burn", a[f.BLEND_MODES.HARD_LIGHT] = "hard-light", a[f.BLEND_MODES.SOFT_LIGHT] = "soft-light", a[f.BLEND_MODES.DIFFERENCE] = "difference", a[f.BLEND_MODES.EXCLUSION] = "exclusion", a[f.BLEND_MODES.HUE] = "hue", a[f.BLEND_MODES.SATURATION] = "saturate", a[f.BLEND_MODES.COLOR] = "color", a[f.BLEND_MODES.LUMINOSITY] = "luminosity") : (a[f.BLEND_MODES.NORMAL] = "source-over", a[f.BLEND_MODES.ADD] = "lighter", a[f.BLEND_MODES.MULTIPLY] = "source-over", a[f.BLEND_MODES.SCREEN] = "source-over", a[f.BLEND_MODES.OVERLAY] = "source-over", a[f.BLEND_MODES.DARKEN] = "source-over", a[f.BLEND_MODES.LIGHTEN] = "source-over", a[f.BLEND_MODES.COLOR_DODGE] = "source-over", a[f.BLEND_MODES.COLOR_BURN] = "source-over", a[f.BLEND_MODES.HARD_LIGHT] = "source-over", a[f.BLEND_MODES.SOFT_LIGHT] = "source-over", a[f.BLEND_MODES.DIFFERENCE] = "source-over", a[f.BLEND_MODES.EXCLUSION] = "source-over", a[f.BLEND_MODES.HUE] = "source-over", a[f.BLEND_MODES.SATURATION] = "source-over", a[f.BLEND_MODES.COLOR] = "source-over", a[f.BLEND_MODES.LUMINOSITY] = "source-over"), a[f.BLEND_MODES.NORMAL_NPM] = a[f.BLEND_MODES.NORMAL], a[f.BLEND_MODES.ADD_NPM] = a[f.BLEND_MODES.ADD], a[f.BLEND_MODES.SCREEN_NPM] = a[f.BLEND_MODES.SCREEN], a;
      }c.__esModule = !0, c.default = e;var f = a("../../../const"),
          g = a("./canUseNewCanvasBlendModes"),
          h = d(g);
    }, { "../../../const": 46, "./canUseNewCanvasBlendModes": 80 }], 82: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("../../const"),
          g = a("../../settings"),
          h = d(g),
          i = function () {
        function a(b) {
          e(this, a), this.renderer = b, this.count = 0, this.checkCount = 0, this.maxIdle = h.default.GC_MAX_IDLE, this.checkCountMax = h.default.GC_MAX_CHECK_COUNT, this.mode = h.default.GC_MODE;
        }return a.prototype.update = function () {
          this.count++, this.mode !== f.GC_MODES.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run()));
        }, a.prototype.run = function () {
          for (var a = this.renderer.textureManager, b = a._managedTextures, c = !1, d = 0; d < b.length; d++) {
            var e = b[d];!e._glRenderTargets && this.count - e.touched > this.maxIdle && (a.destroyTexture(e, !0), b[d] = null, c = !0);
          }if (c) {
            for (var f = 0, g = 0; g < b.length; g++) {
              null !== b[g] && (b[f++] = b[g]);
            }b.length = f;
          }
        }, a.prototype.unload = function (a) {
          var b = this.renderer.textureManager;a._texture && a._texture._glRenderTargets && b.destroyTexture(a._texture, !0);for (var c = a.children.length - 1; c >= 0; c--) {
            this.unload(a.children[c]);
          }
        }, a;
      }();c.default = i;
    }, { "../../const": 46, "../../settings": 101 }], 83: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("pixi-gl-core"),
          g = a("../../const"),
          h = a("./utils/RenderTarget"),
          i = d(h),
          j = a("../../utils"),
          k = function () {
        function a(b) {
          e(this, a), this.renderer = b, this.gl = b.gl, this._managedTextures = [];
        }return a.prototype.bindTexture = function () {}, a.prototype.getTexture = function () {}, a.prototype.updateTexture = function (a, b) {
          var c = this.gl,
              d = !!a._glRenderTargets;if (!a.hasLoaded) return null;var e = this.renderer.boundTextures;if (void 0 === b) {
            b = 0;for (var h = 0; h < e.length; ++h) {
              if (e[h] === a) {
                b = h;break;
              }
            }
          }e[b] = a, c.activeTexture(c.TEXTURE0 + b);var j = a._glTextures[this.renderer.CONTEXT_UID];if (j) d ? a._glRenderTargets[this.renderer.CONTEXT_UID].resize(a.width, a.height) : j.upload(a.source);else {
            if (d) {
              var k = new i.default(this.gl, a.width, a.height, a.scaleMode, a.resolution);k.resize(a.width, a.height), a._glRenderTargets[this.renderer.CONTEXT_UID] = k, j = k.texture;
            } else j = new f.GLTexture(this.gl, null, null, null, null), j.bind(b), j.premultiplyAlpha = !0, j.upload(a.source);a._glTextures[this.renderer.CONTEXT_UID] = j, a.on("update", this.updateTexture, this), a.on("dispose", this.destroyTexture, this), this._managedTextures.push(a), a.isPowerOfTwo ? (a.mipmap && j.enableMipmap(), a.wrapMode === g.WRAP_MODES.CLAMP ? j.enableWrapClamp() : a.wrapMode === g.WRAP_MODES.REPEAT ? j.enableWrapRepeat() : j.enableWrapMirrorRepeat()) : j.enableWrapClamp(), a.scaleMode === g.SCALE_MODES.NEAREST ? j.enableNearestScaling() : j.enableLinearScaling();
          }return j;
        }, a.prototype.destroyTexture = function (a, b) {
          if (a = a.baseTexture || a, a.hasLoaded) {
            var c = this.renderer.CONTEXT_UID,
                d = a._glTextures,
                e = a._glRenderTargets;if (d[c] && (this.renderer.unbindTexture(a), d[c].destroy(), a.off("update", this.updateTexture, this), a.off("dispose", this.destroyTexture, this), delete d[c], !b)) {
              var f = this._managedTextures.indexOf(a);f !== -1 && (0, j.removeItems)(this._managedTextures, f, 1);
            }e && e[c] && (e[c].destroy(), delete e[c]);
          }
        }, a.prototype.removeAll = function () {
          for (var a = 0; a < this._managedTextures.length; ++a) {
            var b = this._managedTextures[a];b._glTextures[this.renderer.CONTEXT_UID] && delete b._glTextures[this.renderer.CONTEXT_UID];
          }
        }, a.prototype.destroy = function () {
          for (var a = 0; a < this._managedTextures.length; ++a) {
            var b = this._managedTextures[a];this.destroyTexture(b, !0), b.off("update", this.updateTexture, this), b.off("dispose", this.destroyTexture, this);
          }this._managedTextures = null;
        }, a;
      }();c.default = k;
    }, { "../../const": 46, "../../utils": 125, "./utils/RenderTarget": 96, "pixi-gl-core": 12 }], 84: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../SystemRenderer"),
          i = d(h),
          j = a("./managers/MaskManager"),
          k = d(j),
          l = a("./managers/StencilManager"),
          m = d(l),
          n = a("./managers/FilterManager"),
          o = d(n),
          p = a("./utils/RenderTarget"),
          q = d(p),
          r = a("./utils/ObjectRenderer"),
          s = d(r),
          t = a("./TextureManager"),
          u = d(t),
          v = a("../../textures/BaseTexture"),
          w = d(v),
          x = a("./TextureGarbageCollector"),
          y = d(x),
          z = a("./WebGLState"),
          A = d(z),
          B = a("./utils/mapWebGLDrawModesToPixi"),
          C = d(B),
          D = a("./utils/validateContext"),
          E = d(D),
          F = a("../../utils"),
          G = a("pixi-gl-core"),
          H = d(G),
          I = a("../../const"),
          J = 0,
          K = function (a) {
        function b(c, d, g) {
          e(this, b);var h = f(this, a.call(this, "WebGL", c, d, g));return h.legacy = h.options.legacy, h.legacy && (H.default.VertexArrayObject.FORCE_NATIVE = !0), h.type = I.RENDERER_TYPE.WEBGL, h.handleContextLost = h.handleContextLost.bind(h), h.handleContextRestored = h.handleContextRestored.bind(h), h.view.addEventListener("webglcontextlost", h.handleContextLost, !1), h.view.addEventListener("webglcontextrestored", h.handleContextRestored, !1), h._contextOptions = { alpha: h.transparent, antialias: h.options.antialias, premultipliedAlpha: h.transparent && "notMultiplied" !== h.transparent, stencil: !0, preserveDrawingBuffer: h.options.preserveDrawingBuffer, powerPreference: h.options.powerPreference }, h._backgroundColorRgba[3] = h.transparent ? 0 : 1, h.maskManager = new k.default(h), h.stencilManager = new m.default(h), h.emptyRenderer = new s.default(h), h.currentRenderer = h.emptyRenderer, h.textureManager = null, h.filterManager = null, h.initPlugins(), h.options.context && (0, E.default)(h.options.context), h.gl = h.options.context || H.default.createContext(h.view, h._contextOptions), h.CONTEXT_UID = J++, h.state = new A.default(h.gl), h.renderingToScreen = !0, h.boundTextures = null, h._activeShader = null, h._activeVao = null, h._activeRenderTarget = null, h._initContext(), h.drawModes = (0, C.default)(h.gl), h._nextTextureLocation = 0, h.setBlendMode(0), h;
        }return g(b, a), b.prototype._initContext = function () {
          var a = this.gl;a.isContextLost() && a.getExtension("WEBGL_lose_context") && a.getExtension("WEBGL_lose_context").restoreContext();var b = a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS);this._activeShader = null, this._activeVao = null, this.boundTextures = new Array(b), this.emptyTextures = new Array(b), this.textureManager = new u.default(this), this.filterManager = new o.default(this), this.textureGC = new y.default(this), this.state.resetToDefault(), this.rootRenderTarget = new q.default(a, this.width, this.height, null, this.resolution, !0), this.rootRenderTarget.clearColor = this._backgroundColorRgba, this.bindRenderTarget(this.rootRenderTarget);var c = new H.default.GLTexture.fromData(a, null, 1, 1),
              d = { _glTextures: {} };d._glTextures[this.CONTEXT_UID] = {};for (var e = 0; e < b; e++) {
            var f = new w.default();f._glTextures[this.CONTEXT_UID] = c, this.boundTextures[e] = d, this.emptyTextures[e] = f, this.bindTexture(null, e);
          }this.emit("context", a), this.resize(this.screen.width, this.screen.height);
        }, b.prototype.render = function (a, b, c, d, e) {
          if (this.renderingToScreen = !b, this.emit("prerender"), this.gl && !this.gl.isContextLost()) {
            if (this._nextTextureLocation = 0, b || (this._lastObjectRendered = a), !e) {
              var f = a.parent;a.parent = this._tempDisplayObjectParent, a.updateTransform(), a.parent = f;
            }this.bindRenderTexture(b, d), this.currentRenderer.start(), (void 0 !== c ? c : this.clearBeforeRender) && this._activeRenderTarget.clear(), a.renderWebGL(this), this.currentRenderer.flush(), this.textureGC.update(), this.emit("postrender");
          }
        }, b.prototype.setObjectRenderer = function (a) {
          this.currentRenderer !== a && (this.currentRenderer.stop(), this.currentRenderer = a, this.currentRenderer.start());
        }, b.prototype.flush = function () {
          this.setObjectRenderer(this.emptyRenderer);
        }, b.prototype.resize = function (a, b) {
          i.default.prototype.resize.call(this, a, b), this.rootRenderTarget.resize(a, b), this._activeRenderTarget === this.rootRenderTarget && (this.rootRenderTarget.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(!0)));
        }, b.prototype.setBlendMode = function (a) {
          this.state.setBlendMode(a);
        }, b.prototype.clear = function (a) {
          this._activeRenderTarget.clear(a);
        }, b.prototype.setTransform = function (a) {
          this._activeRenderTarget.transform = a;
        }, b.prototype.clearRenderTexture = function (a, b) {
          var c = a.baseTexture,
              d = c._glRenderTargets[this.CONTEXT_UID];return d && d.clear(b), this;
        }, b.prototype.bindRenderTexture = function (a, b) {
          var c = void 0;if (a) {
            var d = a.baseTexture;d._glRenderTargets[this.CONTEXT_UID] || this.textureManager.updateTexture(d, 0), this.unbindTexture(d), c = d._glRenderTargets[this.CONTEXT_UID], c.setFrame(a.frame);
          } else c = this.rootRenderTarget;return c.transform = b, this.bindRenderTarget(c), this;
        }, b.prototype.bindRenderTarget = function (a) {
          return a !== this._activeRenderTarget && (this._activeRenderTarget = a, a.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = a.projectionMatrix.toArray(!0)), this.stencilManager.setMaskStack(a.stencilMaskStack)), this;
        }, b.prototype.bindShader = function (a, b) {
          return this._activeShader !== a && (this._activeShader = a, a.bind(), b !== !1 && (a.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(!0))), this;
        }, b.prototype.bindTexture = function (a, b, c) {
          if (a = a || this.emptyTextures[b], a = a.baseTexture || a, a.touched = this.textureGC.count, c) b = b || 0;else {
            for (var d = 0; d < this.boundTextures.length; d++) {
              if (this.boundTextures[d] === a) return d;
            }void 0 === b && (this._nextTextureLocation++, this._nextTextureLocation %= this.boundTextures.length, b = this.boundTextures.length - this._nextTextureLocation - 1);
          }var e = this.gl,
              f = a._glTextures[this.CONTEXT_UID];return f ? (this.boundTextures[b] = a, e.activeTexture(e.TEXTURE0 + b), e.bindTexture(e.TEXTURE_2D, f.texture)) : this.textureManager.updateTexture(a, b), b;
        }, b.prototype.unbindTexture = function (a) {
          var b = this.gl;a = a.baseTexture || a;for (var c = 0; c < this.boundTextures.length; c++) {
            this.boundTextures[c] === a && (this.boundTextures[c] = this.emptyTextures[c], b.activeTexture(b.TEXTURE0 + c), b.bindTexture(b.TEXTURE_2D, this.emptyTextures[c]._glTextures[this.CONTEXT_UID].texture));
          }return this;
        }, b.prototype.createVao = function () {
          return new H.default.VertexArrayObject(this.gl, this.state.attribState);
        }, b.prototype.bindVao = function (a) {
          return this._activeVao === a ? this : (a ? a.bind() : this._activeVao && this._activeVao.unbind(), this._activeVao = a, this);
        }, b.prototype.reset = function () {
          this.setObjectRenderer(this.emptyRenderer), this._activeShader = null, this._activeVao = null, this._activeRenderTarget = this.rootRenderTarget;for (var a = 0; a < this.boundTextures.length; a++) {
            this.boundTextures[a] = this.emptyTextures[a];
          }return this.rootRenderTarget.activate(), this.state.resetToDefault(), this;
        }, b.prototype.handleContextLost = function (a) {
          a.preventDefault();
        }, b.prototype.handleContextRestored = function () {
          this.textureManager.removeAll(), this.filterManager.destroy(!0), this._initContext();
        }, b.prototype.destroy = function (b) {
          this.destroyPlugins(), this.view.removeEventListener("webglcontextlost", this.handleContextLost), this.view.removeEventListener("webglcontextrestored", this.handleContextRestored), this.textureManager.destroy(), a.prototype.destroy.call(this, b), this.uid = 0, this.maskManager.destroy(), this.stencilManager.destroy(), this.filterManager.destroy(), this.maskManager = null, this.filterManager = null, this.textureManager = null, this.currentRenderer = null, this.handleContextLost = null, this.handleContextRestored = null, this._contextOptions = null, this.gl.useProgram(null), this.gl.getExtension("WEBGL_lose_context") && this.gl.getExtension("WEBGL_lose_context").loseContext(), this.gl = null;
        }, b;
      }(i.default);c.default = K, F.pluginTarget.mixin(K);
    }, { "../../const": 46, "../../textures/BaseTexture": 112, "../../utils": 125, "../SystemRenderer": 76, "./TextureGarbageCollector": 82, "./TextureManager": 83, "./WebGLState": 85, "./managers/FilterManager": 90, "./managers/MaskManager": 91, "./managers/StencilManager": 92, "./utils/ObjectRenderer": 94, "./utils/RenderTarget": 96, "./utils/mapWebGLDrawModesToPixi": 99, "./utils/validateContext": 100, "pixi-gl-core": 12 }], 85: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("./utils/mapWebGLBlendModesToPixi"),
          g = d(f),
          h = 0,
          i = 1,
          j = 2,
          k = 3,
          l = 4,
          m = function () {
        function a(b) {
          e(this, a), this.activeState = new Uint8Array(16), this.defaultState = new Uint8Array(16), this.defaultState[0] = 1, this.stackIndex = 0, this.stack = [], this.gl = b, this.maxAttribs = b.getParameter(b.MAX_VERTEX_ATTRIBS), this.attribState = { tempAttribState: new Array(this.maxAttribs), attribState: new Array(this.maxAttribs) }, this.blendModes = (0, g.default)(b), this.nativeVaoExtension = b.getExtension("OES_vertex_array_object") || b.getExtension("MOZ_OES_vertex_array_object") || b.getExtension("WEBKIT_OES_vertex_array_object");
        }return a.prototype.push = function () {
          var a = this.stack[this.stackIndex];a || (a = this.stack[this.stackIndex] = new Uint8Array(16)), ++this.stackIndex;for (var b = 0; b < this.activeState.length; b++) {
            a[b] = this.activeState[b];
          }
        }, a.prototype.pop = function () {
          var a = this.stack[--this.stackIndex];this.setState(a);
        }, a.prototype.setState = function (a) {
          this.setBlend(a[h]), this.setDepthTest(a[i]), this.setFrontFace(a[j]), this.setCullFace(a[k]), this.setBlendMode(a[l]);
        }, a.prototype.setBlend = function (a) {
          a = a ? 1 : 0, this.activeState[h] !== a && (this.activeState[h] = a, this.gl[a ? "enable" : "disable"](this.gl.BLEND));
        }, a.prototype.setBlendMode = function (a) {
          if (a !== this.activeState[l]) {
            this.activeState[l] = a;var b = this.blendModes[a];2 === b.length ? this.gl.blendFunc(b[0], b[1]) : this.gl.blendFuncSeparate(b[0], b[1], b[2], b[3]);
          }
        }, a.prototype.setDepthTest = function (a) {
          a = a ? 1 : 0, this.activeState[i] !== a && (this.activeState[i] = a, this.gl[a ? "enable" : "disable"](this.gl.DEPTH_TEST));
        }, a.prototype.setCullFace = function (a) {
          a = a ? 1 : 0, this.activeState[k] !== a && (this.activeState[k] = a, this.gl[a ? "enable" : "disable"](this.gl.CULL_FACE));
        }, a.prototype.setFrontFace = function (a) {
          a = a ? 1 : 0, this.activeState[j] !== a && (this.activeState[j] = a, this.gl.frontFace(this.gl[a ? "CW" : "CCW"]));
        }, a.prototype.resetAttributes = function () {
          for (var a = 0; a < this.attribState.tempAttribState.length; a++) {
            this.attribState.tempAttribState[a] = 0;
          }for (var b = 0; b < this.attribState.attribState.length; b++) {
            this.attribState.attribState[b] = 0;
          }for (var c = 1; c < this.maxAttribs; c++) {
            this.gl.disableVertexAttribArray(c);
          }
        }, a.prototype.resetToDefault = function () {
          this.nativeVaoExtension && this.nativeVaoExtension.bindVertexArrayOES(null), this.resetAttributes();for (var a = 0; a < this.activeState.length; ++a) {
            this.activeState[a] = 32;
          }this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.setState(this.defaultState);
        }, a;
      }();c.default = m;
    }, { "./utils/mapWebGLBlendModesToPixi": 98 }], 86: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          g = a("./extractUniformsFromSrc"),
          h = d(g),
          i = a("../../../utils"),
          j = a("../../../const"),
          k = a("../../../settings"),
          l = d(k),
          m = {},
          n = function () {
        function a(b, c, d) {
          e(this, a), this.vertexSrc = b || a.defaultVertexSrc, this.fragmentSrc = c || a.defaultFragmentSrc, this._blendMode = j.BLEND_MODES.NORMAL, this.uniformData = d || (0, h.default)(this.vertexSrc, this.fragmentSrc, "projectionMatrix|uSampler"), this.uniforms = {};for (var f in this.uniformData) {
            this.uniforms[f] = this.uniformData[f].value, this.uniformData[f].type && (this.uniformData[f].type = this.uniformData[f].type.toLowerCase());
          }this.glShaders = {}, m[this.vertexSrc + this.fragmentSrc] || (m[this.vertexSrc + this.fragmentSrc] = (0, i.uid)()), this.glShaderKey = m[this.vertexSrc + this.fragmentSrc], this.padding = 4, this.resolution = l.default.RESOLUTION, this.enabled = !0, this.autoFit = !0;
        }return a.prototype.apply = function (a, b, c, d, e) {
          a.applyFilter(this, b, c, d);
        }, f(a, [{ key: "blendMode", get: function get() {
            return this._blendMode;
          }, set: function set(a) {
            this._blendMode = a;
          } }], [{ key: "defaultVertexSrc", get: function get() {
            return ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 projectionMatrix;", "uniform mat3 filterMatrix;", "varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;", "   vTextureCoord = aTextureCoord ;", "}"].join("\n");
          } }, { key: "defaultFragmentSrc", get: function get() {
            return ["varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "uniform sampler2D uSampler;", "uniform sampler2D filterSampler;", "void main(void){", "   vec4 masky = texture2D(filterSampler, vFilterCoord);", "   vec4 sample = texture2D(uSampler, vTextureCoord);", "   vec4 color;", "   if(mod(vFilterCoord.x, 1.0) > 0.5)", "   {", "     color = vec4(1.0, 0.0, 0.0, 1.0);", "   }", "   else", "   {", "     color = vec4(0.0, 1.0, 0.0, 1.0);", "   }", "   gl_FragColor = mix(sample, masky, 0.5);", "   gl_FragColor *= sample.a;", "}"].join("\n");
          } }]), a;
      }();c.default = n;
    }, { "../../../const": 46, "../../../settings": 101, "../../../utils": 125, "./extractUniformsFromSrc": 87 }], 87: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b, c) {
        var d = f(a, c),
            e = f(b, c);return Object.assign(d, e);
      }function f(a) {
        for (var b = new RegExp("^(projectionMatrix|uSampler|filterArea|filterClamp)$"), c = {}, d = void 0, e = a.replace(/\s+/g, " ").split(/\s*;\s*/), f = 0; f < e.length; f++) {
          var g = e[f].trim();if (g.indexOf("uniform") > -1) {
            var h = g.split(" "),
                j = h[1],
                k = h[2],
                l = 1;k.indexOf("[") > -1 && (d = k.split(/\[|]/), k = d[0], l *= Number(d[1])), k.match(b) || (c[k] = { value: i(j, l), name: k, type: j });
          }
        }return c;
      }c.__esModule = !0, c.default = e;var g = a("pixi-gl-core"),
          h = d(g),
          i = h.default.shader.defaultValue;
    }, { "pixi-gl-core": 12 }], 88: [function (a, b, c) {
      "use strict";
      function d(a, b, c) {
        var d = a.identity();return d.translate(b.x / c.width, b.y / c.height), d.scale(c.width, c.height), d;
      }function e(a, b, c) {
        var d = a.identity();d.translate(b.x / c.width, b.y / c.height);var e = c.width / b.width,
            f = c.height / b.height;return d.scale(e, f), d;
      }function f(a, b, c, d) {
        var e = d._texture.orig,
            f = a.set(c.width, 0, 0, c.height, b.x, b.y),
            h = d.worldTransform.copy(g.Matrix.TEMP_MATRIX);return h.invert(), f.prepend(h), f.scale(1 / e.width, 1 / e.height), f.translate(d.anchor.x, d.anchor.y), f;
      }c.__esModule = !0, c.calculateScreenSpaceMatrix = d, c.calculateNormalizedScreenSpaceMatrix = e, c.calculateSpriteMatrix = f;var g = a("../../../math");
    }, { "../../../math": 70 }], 89: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../Filter"),
          i = d(h),
          j = a("../../../../math"),
          k = (a("path"), a("../../../../textures/TextureMatrix")),
          l = d(k),
          m = function (a) {
        function b(c) {
          e(this, b);var d = new j.Matrix(),
              g = f(this, a.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n\n    original *= (masky.r * masky.a * alpha * clip);\n\n    gl_FragColor = original;\n}\n"));return c.renderable = !1, g.maskSprite = c, g.maskMatrix = d, g;
        }return g(b, a), b.prototype.apply = function (a, b, c) {
          var d = this.maskSprite,
              e = this.maskSprite.texture;e.valid && (e.transform || (e.transform = new l.default(e, 0)), e.transform.update(), this.uniforms.mask = e, this.uniforms.otherMatrix = a.calculateSpriteMatrix(this.maskMatrix, d).prepend(e.transform.mapCoord), this.uniforms.alpha = d.worldAlpha, this.uniforms.maskClamp = e.transform.uClampFrame, a.applyFilter(this, b, c));
        }, b;
      }(i.default);c.default = m;
    }, { "../../../../math": 70, "../../../../textures/TextureMatrix": 116, "../Filter": 86, path: 23 }], 90: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a) {
        return a && a.__esModule ? a : { default: a };
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }function h(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var i = a("./WebGLManager"),
          j = e(i),
          k = a("../utils/RenderTarget"),
          l = e(k),
          m = a("../utils/Quad"),
          n = e(m),
          o = a("../../../math"),
          p = a("../../../Shader"),
          q = e(p),
          r = a("../filters/filterTransforms"),
          s = d(r),
          t = a("bit-twiddle"),
          u = e(t),
          v = function a() {
        h(this, a), this.renderTarget = null, this.sourceFrame = new o.Rectangle(), this.destinationFrame = new o.Rectangle(), this.filters = [], this.target = null, this.resolution = 1;
      },
          w = function (a) {
        function b(c) {
          h(this, b);var d = f(this, a.call(this, c));return d.gl = d.renderer.gl, d.quad = new n.default(d.gl, c.state.attribState), d.shaderCache = {}, d.pool = {}, d.filterData = null, d.managedFilters = [], d;
        }return g(b, a), b.prototype.pushFilter = function (a, b) {
          var c = this.renderer,
              d = this.filterData;if (!d) {
            d = this.renderer._activeRenderTarget.filterStack;var e = new v();e.sourceFrame = e.destinationFrame = this.renderer._activeRenderTarget.size, e.renderTarget = c._activeRenderTarget, this.renderer._activeRenderTarget.filterData = d = { index: 0, stack: [e] }, this.filterData = d;
          }var f = d.stack[++d.index];f || (f = d.stack[d.index] = new v());var g = b[0].resolution,
              h = 0 | b[0].padding,
              i = a.filterArea || a.getBounds(!0),
              j = f.sourceFrame,
              k = f.destinationFrame;j.x = (i.x * g | 0) / g, j.y = (i.y * g | 0) / g, j.width = (i.width * g | 0) / g, j.height = (i.height * g | 0) / g, d.stack[0].renderTarget.transform || b[0].autoFit && j.fit(d.stack[0].destinationFrame), j.pad(h), k.width = j.width, k.height = j.height;var l = this.getPotRenderTarget(c.gl, j.width, j.height, g);f.target = a, f.filters = b, f.resolution = g, f.renderTarget = l, l.setFrame(k, j), c.bindRenderTarget(l), l.clear();
        }, b.prototype.popFilter = function () {
          var a = this.filterData,
              b = a.stack[a.index - 1],
              c = a.stack[a.index];this.quad.map(c.renderTarget.size, c.sourceFrame).upload();var d = c.filters;if (1 === d.length) d[0].apply(this, c.renderTarget, b.renderTarget, !1, c), this.freePotRenderTarget(c.renderTarget);else {
            var e = c.renderTarget,
                f = this.getPotRenderTarget(this.renderer.gl, c.sourceFrame.width, c.sourceFrame.height, c.resolution);f.setFrame(c.destinationFrame, c.sourceFrame), f.clear();var g = 0;for (g = 0; g < d.length - 1; ++g) {
              d[g].apply(this, e, f, !0, c);var h = e;e = f, f = h;
            }d[g].apply(this, e, b.renderTarget, !1, c), this.freePotRenderTarget(e), this.freePotRenderTarget(f);
          }a.index--, 0 === a.index && (this.filterData = null);
        }, b.prototype.applyFilter = function (a, b, c, d) {
          var e = this.renderer,
              f = e.gl,
              g = a.glShaders[e.CONTEXT_UID];g || (a.glShaderKey ? (g = this.shaderCache[a.glShaderKey], g || (g = new q.default(this.gl, a.vertexSrc, a.fragmentSrc), a.glShaders[e.CONTEXT_UID] = this.shaderCache[a.glShaderKey] = g, this.managedFilters.push(a))) : (g = a.glShaders[e.CONTEXT_UID] = new q.default(this.gl, a.vertexSrc, a.fragmentSrc), this.managedFilters.push(a)), e.bindVao(null), this.quad.initVao(g)), e.bindVao(this.quad.vao), e.bindRenderTarget(c), d && (f.disable(f.SCISSOR_TEST), e.clear(), f.enable(f.SCISSOR_TEST)), c === e.maskManager.scissorRenderTarget && e.maskManager.pushScissorMask(null, e.maskManager.scissorData), e.bindShader(g);var h = this.renderer.emptyTextures[0];this.renderer.boundTextures[0] = h, this.syncUniforms(g, a), e.state.setBlendMode(a.blendMode), f.activeTexture(f.TEXTURE0), f.bindTexture(f.TEXTURE_2D, b.texture.texture), this.quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0), f.bindTexture(f.TEXTURE_2D, h._glTextures[this.renderer.CONTEXT_UID].texture);
        }, b.prototype.syncUniforms = function (a, b) {
          var c = b.uniformData,
              d = b.uniforms,
              e = 1,
              f = void 0;if (a.uniforms.filterArea) {
            f = this.filterData.stack[this.filterData.index];var g = a.uniforms.filterArea;g[0] = f.renderTarget.size.width, g[1] = f.renderTarget.size.height, g[2] = f.sourceFrame.x, g[3] = f.sourceFrame.y, a.uniforms.filterArea = g;
          }if (a.uniforms.filterClamp) {
            f = f || this.filterData.stack[this.filterData.index];var h = a.uniforms.filterClamp;h[0] = 0, h[1] = 0, h[2] = (f.sourceFrame.width - 1) / f.renderTarget.size.width, h[3] = (f.sourceFrame.height - 1) / f.renderTarget.size.height, a.uniforms.filterClamp = h;
          }for (var i in c) {
            var j = c[i].type;if ("sampler2d" === j && 0 !== d[i]) {
              if (d[i].baseTexture) a.uniforms[i] = this.renderer.bindTexture(d[i].baseTexture, e);else {
                a.uniforms[i] = e;var k = this.renderer.gl;this.renderer.boundTextures[e] = this.renderer.emptyTextures[e], k.activeTexture(k.TEXTURE0 + e), d[i].texture.bind();
              }e++;
            } else if ("mat3" === j) void 0 !== d[i].a ? a.uniforms[i] = d[i].toArray(!0) : a.uniforms[i] = d[i];else if ("vec2" === j) {
              if (void 0 !== d[i].x) {
                var l = a.uniforms[i] || new Float32Array(2);l[0] = d[i].x, l[1] = d[i].y, a.uniforms[i] = l;
              } else a.uniforms[i] = d[i];
            } else "float" === j ? a.uniforms.data[i].value !== c[i] && (a.uniforms[i] = d[i]) : a.uniforms[i] = d[i];
          }
        }, b.prototype.getRenderTarget = function (a, b) {
          var c = this.filterData.stack[this.filterData.index],
              d = this.getPotRenderTarget(this.renderer.gl, c.sourceFrame.width, c.sourceFrame.height, b || c.resolution);return d.setFrame(c.destinationFrame, c.sourceFrame), d;
        }, b.prototype.returnRenderTarget = function (a) {
          this.freePotRenderTarget(a);
        }, b.prototype.calculateScreenSpaceMatrix = function (a) {
          var b = this.filterData.stack[this.filterData.index];return s.calculateScreenSpaceMatrix(a, b.sourceFrame, b.renderTarget.size);
        }, b.prototype.calculateNormalizedScreenSpaceMatrix = function (a) {
          var b = this.filterData.stack[this.filterData.index];return s.calculateNormalizedScreenSpaceMatrix(a, b.sourceFrame, b.renderTarget.size, b.destinationFrame);
        }, b.prototype.calculateSpriteMatrix = function (a, b) {
          var c = this.filterData.stack[this.filterData.index];return s.calculateSpriteMatrix(a, c.sourceFrame, c.renderTarget.size, b);
        }, b.prototype.destroy = function () {
          for (var a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], b = this.renderer, c = this.managedFilters, d = 0; d < c.length; d++) {
            a || c[d].glShaders[b.CONTEXT_UID].destroy(), delete c[d].glShaders[b.CONTEXT_UID];
          }this.shaderCache = {}, a ? this.pool = {} : this.emptyPool();
        }, b.prototype.getPotRenderTarget = function (a, b, c, d) {
          b = u.default.nextPow2(b * d), c = u.default.nextPow2(c * d);var e = (65535 & b) << 16 | 65535 & c;this.pool[e] || (this.pool[e] = []);var f = this.pool[e].pop();if (!f) {
            var g = this.renderer.boundTextures[0];a.activeTexture(a.TEXTURE0), f = new l.default(a, b, c, null, 1), a.bindTexture(a.TEXTURE_2D, g._glTextures[this.renderer.CONTEXT_UID].texture);
          }return f.resolution = d, f.defaultFrame.width = f.size.width = b / d, f.defaultFrame.height = f.size.height = c / d, f;
        }, b.prototype.emptyPool = function () {
          for (var a in this.pool) {
            var b = this.pool[a];if (b) for (var c = 0; c < b.length; c++) {
              b[c].destroy(!0);
            }
          }this.pool = {};
        }, b.prototype.freePotRenderTarget = function (a) {
          var b = a.size.width * a.resolution,
              c = a.size.height * a.resolution,
              d = (65535 & b) << 16 | 65535 & c;this.pool[d].push(a);
        }, b;
      }(j.default);c.default = w;
    }, { "../../../Shader": 44, "../../../math": 70, "../filters/filterTransforms": 88, "../utils/Quad": 95, "../utils/RenderTarget": 96, "./WebGLManager": 93, "bit-twiddle": 1 }], 91: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("./WebGLManager"),
          i = d(h),
          j = a("../filters/spriteMask/SpriteMaskFilter"),
          k = d(j),
          l = function (a) {
        function b(c) {
          e(this, b);var d = f(this, a.call(this, c));return d.scissor = !1, d.scissorData = null, d.scissorRenderTarget = null, d.enableScissor = !0, d.alphaMaskPool = [], d.alphaMaskIndex = 0, d;
        }return g(b, a), b.prototype.pushMask = function (a, b) {
          if (b.texture) this.pushSpriteMask(a, b);else if (this.enableScissor && !this.scissor && this.renderer._activeRenderTarget.root && !this.renderer.stencilManager.stencilMaskStack.length && b.isFastRect()) {
            var c = b.worldTransform,
                d = Math.atan2(c.b, c.a);d = Math.round(d * (180 / Math.PI)), d % 90 ? this.pushStencilMask(b) : this.pushScissorMask(a, b);
          } else this.pushStencilMask(b);
        }, b.prototype.popMask = function (a, b) {
          b.texture ? this.popSpriteMask(a, b) : this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length ? this.popScissorMask(a, b) : this.popStencilMask(a, b);
        }, b.prototype.pushSpriteMask = function (a, b) {
          var c = this.alphaMaskPool[this.alphaMaskIndex];c || (c = this.alphaMaskPool[this.alphaMaskIndex] = [new k.default(b)]), c[0].resolution = this.renderer.resolution, c[0].maskSprite = b, a.filterArea = b.getBounds(!0), this.renderer.filterManager.pushFilter(a, c), this.alphaMaskIndex++;
        }, b.prototype.popSpriteMask = function () {
          this.renderer.filterManager.popFilter(), this.alphaMaskIndex--;
        }, b.prototype.pushStencilMask = function (a) {
          this.renderer.currentRenderer.stop(), this.renderer.stencilManager.pushStencil(a);
        }, b.prototype.popStencilMask = function () {
          this.renderer.currentRenderer.stop(), this.renderer.stencilManager.popStencil();
        }, b.prototype.pushScissorMask = function (a, b) {
          b.renderable = !0;var c = this.renderer._activeRenderTarget,
              d = b.getBounds();d.fit(c.size), b.renderable = !1, this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);var e = this.renderer.resolution;this.renderer.gl.scissor(d.x * e, (c.root ? c.size.height - d.y - d.height : d.y) * e, d.width * e, d.height * e), this.scissorRenderTarget = c, this.scissorData = b, this.scissor = !0;
        }, b.prototype.popScissorMask = function () {
          this.scissorRenderTarget = null, this.scissorData = null, this.scissor = !1;var a = this.renderer.gl;a.disable(a.SCISSOR_TEST);
        }, b;
      }(i.default);c.default = l;
    }, { "../filters/spriteMask/SpriteMaskFilter": 89, "./WebGLManager": 93 }], 92: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("./WebGLManager"),
          i = d(h),
          j = function (a) {
        function b(c) {
          e(this, b);var d = f(this, a.call(this, c));return d.stencilMaskStack = null, d;
        }return g(b, a), b.prototype.setMaskStack = function (a) {
          this.stencilMaskStack = a;var b = this.renderer.gl;0 === a.length ? b.disable(b.STENCIL_TEST) : b.enable(b.STENCIL_TEST);
        }, b.prototype.pushStencil = function (a) {
          this.renderer.setObjectRenderer(this.renderer.plugins.graphics), this.renderer._activeRenderTarget.attachStencilBuffer();var b = this.renderer.gl,
              c = this.stencilMaskStack.length;0 === c && b.enable(b.STENCIL_TEST), this.stencilMaskStack.push(a), b.colorMask(!1, !1, !1, !1), b.stencilFunc(b.EQUAL, c, this._getBitwiseMask()), b.stencilOp(b.KEEP, b.KEEP, b.INCR), this.renderer.plugins.graphics.render(a), this._useCurrent();
        }, b.prototype.popStencil = function () {
          this.renderer.setObjectRenderer(this.renderer.plugins.graphics);var a = this.renderer.gl,
              b = this.stencilMaskStack.pop();0 === this.stencilMaskStack.length ? (a.disable(a.STENCIL_TEST), a.clear(a.STENCIL_BUFFER_BIT), a.clearStencil(0)) : (a.colorMask(!1, !1, !1, !1), a.stencilOp(a.KEEP, a.KEEP, a.DECR), this.renderer.plugins.graphics.render(b), this._useCurrent());
        }, b.prototype._useCurrent = function () {
          var a = this.renderer.gl;a.colorMask(!0, !0, !0, !0), a.stencilFunc(a.EQUAL, this.stencilMaskStack.length, this._getBitwiseMask()), a.stencilOp(a.KEEP, a.KEEP, a.KEEP);
        }, b.prototype._getBitwiseMask = function () {
          return (1 << this.stencilMaskStack.length) - 1;
        }, b.prototype.destroy = function () {
          i.default.prototype.destroy.call(this), this.stencilMaskStack.stencilStack = null;
        }, b;
      }(i.default);c.default = j;
    }, { "./WebGLManager": 93 }], 93: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(b) {
          d(this, a), this.renderer = b, this.renderer.on("context", this.onContextChange, this);
        }return a.prototype.onContextChange = function () {}, a.prototype.destroy = function () {
          this.renderer.off("context", this.onContextChange, this), this.renderer = null;
        }, a;
      }();c.default = e;
    }, {}], 94: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../managers/WebGLManager"),
          i = d(h),
          j = function (a) {
        function b() {
          return e(this, b), f(this, a.apply(this, arguments));
        }return g(b, a), b.prototype.start = function () {}, b.prototype.stop = function () {
          this.flush();
        }, b.prototype.flush = function () {}, b.prototype.render = function (a) {}, b;
      }(i.default);c.default = j;
    }, { "../managers/WebGLManager": 93 }], 95: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("pixi-gl-core"),
          g = d(f),
          h = a("../../../utils/createIndicesForQuads"),
          i = d(h),
          j = function () {
        function a(b, c) {
          e(this, a), this.gl = b, this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.interleaved = new Float32Array(16);for (var d = 0; d < 4; d++) {
            this.interleaved[4 * d] = this.vertices[2 * d], this.interleaved[4 * d + 1] = this.vertices[2 * d + 1], this.interleaved[4 * d + 2] = this.uvs[2 * d], this.interleaved[4 * d + 3] = this.uvs[2 * d + 1];
          }this.indices = (0, i.default)(1), this.vertexBuffer = g.default.GLBuffer.createVertexBuffer(b, this.interleaved, b.STATIC_DRAW), this.indexBuffer = g.default.GLBuffer.createIndexBuffer(b, this.indices, b.STATIC_DRAW), this.vao = new g.default.VertexArrayObject(b, c);
        }return a.prototype.initVao = function (a) {
          this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer, a.attributes.aVertexPosition, this.gl.FLOAT, !1, 16, 0).addAttribute(this.vertexBuffer, a.attributes.aTextureCoord, this.gl.FLOAT, !1, 16, 8);
        }, a.prototype.map = function (a, b) {
          var c = 0,
              d = 0;return this.uvs[0] = c, this.uvs[1] = d, this.uvs[2] = c + b.width / a.width, this.uvs[3] = d, this.uvs[4] = c + b.width / a.width, this.uvs[5] = d + b.height / a.height, this.uvs[6] = c, this.uvs[7] = d + b.height / a.height, c = b.x, d = b.y, this.vertices[0] = c, this.vertices[1] = d, this.vertices[2] = c + b.width, this.vertices[3] = d, this.vertices[4] = c + b.width, this.vertices[5] = d + b.height, this.vertices[6] = c, this.vertices[7] = d + b.height, this;
        }, a.prototype.upload = function () {
          for (var a = 0; a < 4; a++) {
            this.interleaved[4 * a] = this.vertices[2 * a], this.interleaved[4 * a + 1] = this.vertices[2 * a + 1], this.interleaved[4 * a + 2] = this.uvs[2 * a], this.interleaved[4 * a + 3] = this.uvs[2 * a + 1];
          }return this.vertexBuffer.upload(this.interleaved), this;
        }, a.prototype.destroy = function () {
          var a = this.gl;a.deleteBuffer(this.vertexBuffer), a.deleteBuffer(this.indexBuffer);
        }, a;
      }();c.default = j;
    }, { "../../../utils/createIndicesForQuads": 123, "pixi-gl-core": 12 }], 96: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("../../../math"),
          g = a("../../../const"),
          h = a("../../../settings"),
          i = d(h),
          j = a("pixi-gl-core"),
          k = function () {
        function a(b, c, d, h, k, l) {
          e(this, a), this.gl = b, this.frameBuffer = null, this.texture = null, this.clearColor = [0, 0, 0, 0], this.size = new f.Rectangle(0, 0, 1, 1), this.resolution = k || i.default.RESOLUTION, this.projectionMatrix = new f.Matrix(), this.transform = null, this.frame = null, this.defaultFrame = new f.Rectangle(), this.destinationFrame = null, this.sourceFrame = null, this.stencilBuffer = null, this.stencilMaskStack = [], this.filterData = null, this.scaleMode = void 0 !== h ? h : i.default.SCALE_MODE, this.root = l, this.root ? (this.frameBuffer = new j.GLFramebuffer(b, 100, 100), this.frameBuffer.framebuffer = null) : (this.frameBuffer = j.GLFramebuffer.createRGBA(b, 100, 100), this.scaleMode === g.SCALE_MODES.NEAREST ? this.frameBuffer.texture.enableNearestScaling() : this.frameBuffer.texture.enableLinearScaling(), this.texture = this.frameBuffer.texture), this.setFrame(), this.resize(c, d);
        }return a.prototype.clear = function (a) {
          var b = a || this.clearColor;this.frameBuffer.clear(b[0], b[1], b[2], b[3]);
        }, a.prototype.attachStencilBuffer = function () {
          this.root || this.frameBuffer.enableStencil();
        }, a.prototype.setFrame = function (a, b) {
          this.destinationFrame = a || this.destinationFrame || this.defaultFrame, this.sourceFrame = b || this.sourceFrame || this.destinationFrame;
        }, a.prototype.activate = function () {
          var a = this.gl;this.frameBuffer.bind(), this.calculateProjection(this.destinationFrame, this.sourceFrame), this.transform && this.projectionMatrix.append(this.transform), this.destinationFrame !== this.sourceFrame ? (a.enable(a.SCISSOR_TEST), a.scissor(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)) : a.disable(a.SCISSOR_TEST), a.viewport(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0);
        }, a.prototype.calculateProjection = function (a, b) {
          var c = this.projectionMatrix;b = b || a, c.identity(), this.root ? (c.a = 1 / a.width * 2, c.d = -1 / a.height * 2, c.tx = -1 - b.x * c.a, c.ty = 1 - b.y * c.d) : (c.a = 1 / a.width * 2, c.d = 1 / a.height * 2, c.tx = -1 - b.x * c.a, c.ty = -1 - b.y * c.d);
        }, a.prototype.resize = function (a, b) {
          if (a = 0 | a, b = 0 | b, this.size.width !== a || this.size.height !== b) {
            this.size.width = a, this.size.height = b, this.defaultFrame.width = a, this.defaultFrame.height = b, this.frameBuffer.resize(a * this.resolution, b * this.resolution);var c = this.frame || this.size;this.calculateProjection(c);
          }
        }, a.prototype.destroy = function () {
          this.frameBuffer.destroy(), this.frameBuffer = null, this.texture = null;
        }, a;
      }();c.default = k;
    }, { "../../../const": 46, "../../../math": 70, "../../../settings": 101, "pixi-gl-core": 12 }], 97: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        var c = !b;if (0 === a) throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");if (c) {
          var d = document.createElement("canvas");d.width = 1, d.height = 1, b = h.default.createContext(d);
        }for (var e = b.createShader(b.FRAGMENT_SHADER);;) {
          var g = i.replace(/%forloop%/gi, f(a));if (b.shaderSource(e, g), b.compileShader(e), b.getShaderParameter(e, b.COMPILE_STATUS)) break;a = a / 2 | 0;
        }return c && b.getExtension("WEBGL_lose_context") && b.getExtension("WEBGL_lose_context").loseContext(), a;
      }function f(a) {
        for (var b = "", c = 0; c < a; ++c) {
          c > 0 && (b += "\nelse "), c < a - 1 && (b += "if(test == " + c + ".0){}");
        }return b;
      }c.__esModule = !0, c.default = e;var g = a("pixi-gl-core"),
          h = d(g),
          i = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n");
    }, { "pixi-gl-core": 12 }], 98: [function (a, b, c) {
      "use strict";
      function d(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];return b[e.BLEND_MODES.NORMAL] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.ADD] = [a.ONE, a.DST_ALPHA], b[e.BLEND_MODES.MULTIPLY] = [a.DST_COLOR, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.SCREEN] = [a.ONE, a.ONE_MINUS_SRC_COLOR], b[e.BLEND_MODES.OVERLAY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.DARKEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.LIGHTEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.COLOR_DODGE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.COLOR_BURN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.HARD_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.SOFT_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.DIFFERENCE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.EXCLUSION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.HUE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.SATURATION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.COLOR] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.LUMINOSITY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.NORMAL_NPM] = [a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA], b[e.BLEND_MODES.ADD_NPM] = [a.SRC_ALPHA, a.DST_ALPHA, a.ONE, a.DST_ALPHA], b[e.BLEND_MODES.SCREEN_NPM] = [a.SRC_ALPHA, a.ONE_MINUS_SRC_COLOR, a.ONE, a.ONE_MINUS_SRC_COLOR], b;
      }c.__esModule = !0, c.default = d;var e = a("../../../const");
    }, { "../../../const": 46 }], 99: [function (a, b, c) {
      "use strict";
      function d(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};return b[e.DRAW_MODES.POINTS] = a.POINTS, b[e.DRAW_MODES.LINES] = a.LINES, b[e.DRAW_MODES.LINE_LOOP] = a.LINE_LOOP, b[e.DRAW_MODES.LINE_STRIP] = a.LINE_STRIP, b[e.DRAW_MODES.TRIANGLES] = a.TRIANGLES, b[e.DRAW_MODES.TRIANGLE_STRIP] = a.TRIANGLE_STRIP, b[e.DRAW_MODES.TRIANGLE_FAN] = a.TRIANGLE_FAN, b;
      }c.__esModule = !0, c.default = d;var e = a("../../../const");
    }, { "../../../const": 46 }], 100: [function (a, b, c) {
      "use strict";
      function d(a) {
        var b = a.getContextAttributes();b.stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
      }c.__esModule = !0, c.default = d;
    }, {}], 101: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0;var e = a("./utils/maxRecommendedTextures"),
          f = d(e),
          g = a("./utils/canUploadSameBuffer"),
          h = d(g);c.default = { TARGET_FPMS: .06, MIPMAP_TEXTURES: !0, RESOLUTION: 1, FILTER_RESOLUTION: 1, SPRITE_MAX_TEXTURES: (0, f.default)(32), SPRITE_BATCH_SIZE: 4096, RETINA_PREFIX: /@([0-9\.]+)x/, RENDER_OPTIONS: { view: null, antialias: !1, forceFXAA: !1, autoResize: !1, transparent: !1, backgroundColor: 0, clearBeforeRender: !0, preserveDrawingBuffer: !1, roundPixels: !1, width: 800, height: 600, legacy: !1 }, TRANSFORM_MODE: 0, GC_MODE: 0, GC_MAX_IDLE: 3600, GC_MAX_CHECK_COUNT: 600, WRAP_MODE: 0, SCALE_MODE: 0, PRECISION_VERTEX: "highp", PRECISION_FRAGMENT: "mediump", CAN_UPLOAD_SAME_BUFFER: (0, h.default)() };
    }, { "./utils/canUploadSameBuffer": 122, "./utils/maxRecommendedTextures": 127 }], 102: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../math"),
          j = a("../utils"),
          k = a("../const"),
          l = a("../textures/Texture"),
          m = d(l),
          n = a("../display/Container"),
          o = d(n),
          p = new i.Point(),
          q = function (a) {
        function b(c) {
          e(this, b);var d = f(this, a.call(this));return d._anchor = new i.ObservablePoint(d._onAnchorUpdate, d), d._texture = null, d._width = 0, d._height = 0, d._tint = null, d._tintRGB = null, d.tint = 16777215, d.blendMode = k.BLEND_MODES.NORMAL, d.shader = null, d.cachedTint = 16777215, d.texture = c || m.default.EMPTY, d.vertexData = new Float32Array(8), d.vertexTrimmedData = null, d._transformID = -1, d._textureID = -1, d._transformTrimmedID = -1, d._textureTrimmedID = -1, d.pluginName = "sprite", d;
        }return g(b, a), b.prototype._onTextureUpdate = function () {
          this._textureID = -1, this._textureTrimmedID = -1, this.cachedTint = 16777215, this._width && (this.scale.x = (0, j.sign)(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = (0, j.sign)(this.scale.y) * this._height / this._texture.orig.height);
        }, b.prototype._onAnchorUpdate = function () {
          this._transformID = -1, this._transformTrimmedID = -1;
        }, b.prototype.calculateVertices = function () {
          if (this._transformID !== this.transform._worldID || this._textureID !== this._texture._updateID) {
            this._transformID = this.transform._worldID, this._textureID = this._texture._updateID;var a = this._texture,
                b = this.transform.worldTransform,
                c = b.a,
                d = b.b,
                e = b.c,
                f = b.d,
                g = b.tx,
                h = b.ty,
                i = this.vertexData,
                j = a.trim,
                k = a.orig,
                l = this._anchor,
                m = 0,
                n = 0,
                o = 0,
                p = 0;j ? (n = j.x - l._x * k.width, m = n + j.width, p = j.y - l._y * k.height, o = p + j.height) : (n = -l._x * k.width, m = n + k.width, p = -l._y * k.height, o = p + k.height), i[0] = c * n + e * p + g, i[1] = f * p + d * n + h, i[2] = c * m + e * p + g, i[3] = f * p + d * m + h, i[4] = c * m + e * o + g, i[5] = f * o + d * m + h, i[6] = c * n + e * o + g, i[7] = f * o + d * n + h;
          }
        }, b.prototype.calculateTrimmedVertices = function () {
          if (this.vertexTrimmedData) {
            if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) return;
          } else this.vertexTrimmedData = new Float32Array(8);this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;var a = this._texture,
              b = this.vertexTrimmedData,
              c = a.orig,
              d = this._anchor,
              e = this.transform.worldTransform,
              f = e.a,
              g = e.b,
              h = e.c,
              i = e.d,
              j = e.tx,
              k = e.ty,
              l = -d._x * c.width,
              m = l + c.width,
              n = -d._y * c.height,
              o = n + c.height;b[0] = f * l + h * n + j, b[1] = i * n + g * l + k, b[2] = f * m + h * n + j, b[3] = i * n + g * m + k, b[4] = f * m + h * o + j, b[5] = i * o + g * m + k, b[6] = f * l + h * o + j, b[7] = i * o + g * l + k;
        }, b.prototype._renderWebGL = function (a) {
          this.calculateVertices(), a.setObjectRenderer(a.plugins[this.pluginName]), a.plugins[this.pluginName].render(this);
        }, b.prototype._renderCanvas = function (a) {
          a.plugins[this.pluginName].render(this);
        }, b.prototype._calculateBounds = function () {
          var a = this._texture.trim,
              b = this._texture.orig;!a || a.width === b.width && a.height === b.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
        }, b.prototype.getLocalBounds = function (b) {
          return 0 === this.children.length ? (this._bounds.minX = this._texture.orig.width * -this._anchor._x, this._bounds.minY = this._texture.orig.height * -this._anchor._y, this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._y), b || (this._localBoundsRect || (this._localBoundsRect = new i.Rectangle()), b = this._localBoundsRect), this._bounds.getRectangle(b)) : a.prototype.getLocalBounds.call(this, b);
        }, b.prototype.containsPoint = function (a) {
          this.worldTransform.applyInverse(a, p);var b = this._texture.orig.width,
              c = this._texture.orig.height,
              d = -b * this.anchor.x,
              e = 0;return p.x >= d && p.x < d + b && (e = -c * this.anchor.y, p.y >= e && p.y < e + c);
        }, b.prototype.destroy = function (b) {
          a.prototype.destroy.call(this, b), this._anchor = null;var c = "boolean" == typeof b ? b : b && b.texture;if (c) {
            var d = "boolean" == typeof b ? b : b && b.baseTexture;this._texture.destroy(!!d);
          }this._texture = null, this.shader = null;
        }, b.from = function (a) {
          return new b(m.default.from(a));
        }, b.fromFrame = function (a) {
          var c = j.TextureCache[a];if (!c) throw new Error('The frameId "' + a + '" does not exist in the texture cache');return new b(c);
        }, b.fromImage = function (a, c, d) {
          return new b(m.default.fromImage(a, c, d));
        }, h(b, [{ key: "width", get: function get() {
            return Math.abs(this.scale.x) * this._texture.orig.width;
          }, set: function set(a) {
            var b = (0, j.sign)(this.scale.x) || 1;this.scale.x = b * a / this._texture.orig.width, this._width = a;
          } }, { key: "height", get: function get() {
            return Math.abs(this.scale.y) * this._texture.orig.height;
          }, set: function set(a) {
            var b = (0, j.sign)(this.scale.y) || 1;this.scale.y = b * a / this._texture.orig.height, this._height = a;
          } }, { key: "anchor", get: function get() {
            return this._anchor;
          }, set: function set(a) {
            this._anchor.copy(a);
          } }, { key: "tint", get: function get() {
            return this._tint;
          }, set: function set(a) {
            this._tint = a, this._tintRGB = (a >> 16) + (65280 & a) + ((255 & a) << 16);
          } }, { key: "texture", get: function get() {
            return this._texture;
          }, set: function set(a) {
            this._texture !== a && (this._texture = a, this.cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, a && (a.baseTexture.hasLoaded ? this._onTextureUpdate() : a.once("update", this._onTextureUpdate, this)));
          } }]), b;
      }(o.default);c.default = q;
    }, { "../const": 46, "../display/Container": 48, "../math": 70, "../textures/Texture": 115, "../utils": 125 }], 103: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("../../renderers/canvas/CanvasRenderer"),
          g = d(f),
          h = a("../../const"),
          i = a("../../math"),
          j = a("./CanvasTinter"),
          k = d(j),
          l = new i.Matrix(),
          m = function () {
        function a(b) {
          e(this, a), this.renderer = b;
        }return a.prototype.render = function (a) {
          var b = a._texture,
              c = this.renderer,
              d = b._frame.width,
              e = b._frame.height,
              f = a.transform.worldTransform,
              g = 0,
              j = 0;if (!(b.orig.width <= 0 || b.orig.height <= 0) && b.baseTexture.source && (c.setBlendMode(a.blendMode), b.valid)) {
            c.context.globalAlpha = a.worldAlpha;var m = b.baseTexture.scaleMode === h.SCALE_MODES.LINEAR;c.smoothProperty && c.context[c.smoothProperty] !== m && (c.context[c.smoothProperty] = m), b.trim ? (g = b.trim.width / 2 + b.trim.x - a.anchor.x * b.orig.width, j = b.trim.height / 2 + b.trim.y - a.anchor.y * b.orig.height) : (g = (.5 - a.anchor.x) * b.orig.width, j = (.5 - a.anchor.y) * b.orig.height), b.rotate && (f.copy(l), f = l, i.GroupD8.matrixAppendRotationInv(f, b.rotate, g, j), g = 0, j = 0), g -= d / 2, j -= e / 2, c.roundPixels ? (c.context.setTransform(f.a, f.b, f.c, f.d, f.tx * c.resolution | 0, f.ty * c.resolution | 0), g = 0 | g, j = 0 | j) : c.context.setTransform(f.a, f.b, f.c, f.d, f.tx * c.resolution, f.ty * c.resolution);var n = b.baseTexture.resolution;16777215 !== a.tint ? (a.cachedTint === a.tint && a.tintedTexture.tintId === a._texture._updateID || (a.cachedTint = a.tint, a.tintedTexture = k.default.getTintedTexture(a, a.tint)), c.context.drawImage(a.tintedTexture, 0, 0, d * n, e * n, g * c.resolution, j * c.resolution, d * c.resolution, e * c.resolution)) : c.context.drawImage(b.baseTexture.source, b._frame.x * n, b._frame.y * n, d * n, e * n, g * c.resolution, j * c.resolution, d * c.resolution, e * c.resolution);
          }
        }, a.prototype.destroy = function () {
          this.renderer = null;
        }, a;
      }();c.default = m, g.default.registerPlugin("sprite", m);
    }, { "../../const": 46, "../../math": 70, "../../renderers/canvas/CanvasRenderer": 77, "./CanvasTinter": 104 }], 104: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0;var e = a("../../utils"),
          f = a("../../renderers/canvas/utils/canUseNewCanvasBlendModes"),
          g = d(f),
          h = { getTintedTexture: function getTintedTexture(a, b) {
          var c = a._texture;b = h.roundColor(b);var d = "#" + ("00000" + (0 | b).toString(16)).substr(-6);c.tintCache = c.tintCache || {};var e = c.tintCache[d],
              f = void 0;if (e) {
            if (e.tintId === c._updateID) return c.tintCache[d];f = c.tintCache[d];
          } else f = h.canvas || document.createElement("canvas");if (h.tintMethod(c, b, f), f.tintId = c._updateID, h.convertTintToImage) {
            var g = new Image();g.src = f.toDataURL(), c.tintCache[d] = g;
          } else c.tintCache[d] = f, h.canvas = null;return f;
        }, tintWithMultiply: function tintWithMultiply(a, b, c) {
          var d = c.getContext("2d"),
              e = a._frame.clone(),
              f = a.baseTexture.resolution;e.x *= f, e.y *= f, e.width *= f, e.height *= f, c.width = Math.ceil(e.width), c.height = Math.ceil(e.height), d.save(), d.fillStyle = "#" + ("00000" + (0 | b).toString(16)).substr(-6), d.fillRect(0, 0, e.width, e.height), d.globalCompositeOperation = "multiply", d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height), d.globalCompositeOperation = "destination-atop", d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height), d.restore();
        }, tintWithOverlay: function tintWithOverlay(a, b, c) {
          var d = c.getContext("2d"),
              e = a._frame.clone(),
              f = a.baseTexture.resolution;e.x *= f, e.y *= f, e.width *= f, e.height *= f, c.width = Math.ceil(e.width), c.height = Math.ceil(e.height), d.save(), d.globalCompositeOperation = "copy", d.fillStyle = "#" + ("00000" + (0 | b).toString(16)).substr(-6), d.fillRect(0, 0, e.width, e.height), d.globalCompositeOperation = "destination-atop", d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height), d.restore();
        }, tintWithPerPixel: function tintWithPerPixel(a, b, c) {
          var d = c.getContext("2d"),
              f = a._frame.clone(),
              g = a.baseTexture.resolution;f.x *= g, f.y *= g, f.width *= g, f.height *= g, c.width = Math.ceil(f.width), c.height = Math.ceil(f.height), d.save(), d.globalCompositeOperation = "copy", d.drawImage(a.baseTexture.source, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height), d.restore();for (var h = (0, e.hex2rgb)(b), i = h[0], j = h[1], k = h[2], l = d.getImageData(0, 0, f.width, f.height), m = l.data, n = 0; n < m.length; n += 4) {
            m[n + 0] *= i, m[n + 1] *= j, m[n + 2] *= k;
          }d.putImageData(l, 0, 0);
        }, roundColor: function roundColor(a) {
          var b = h.cacheStepsPerColorChannel,
              c = (0, e.hex2rgb)(a);return c[0] = Math.min(255, c[0] / b * b), c[1] = Math.min(255, c[1] / b * b), c[2] = Math.min(255, c[2] / b * b), (0, e.rgb2hex)(c);
        }, cacheStepsPerColorChannel: 8, convertTintToImage: !1, canUseMultiply: (0, g.default)(), tintMethod: 0 };h.tintMethod = h.canUseMultiply ? h.tintWithMultiply : h.tintWithPerPixel, c.default = h;
    }, { "../../renderers/canvas/utils/canUseNewCanvasBlendModes": 80, "../../utils": 125 }], 105: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(b) {
          d(this, a), this.vertices = new ArrayBuffer(b), this.float32View = new Float32Array(this.vertices), this.uint32View = new Uint32Array(this.vertices);
        }return a.prototype.destroy = function () {
          this.vertices = null, this.positions = null, this.uvs = null, this.colors = null;
        }, a;
      }();c.default = e;
    }, {}], 106: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../../renderers/webgl/utils/ObjectRenderer"),
          i = d(h),
          j = a("../../renderers/webgl/WebGLRenderer"),
          k = d(j),
          l = a("../../utils/createIndicesForQuads"),
          m = d(l),
          n = a("./generateMultiTextureShader"),
          o = d(n),
          p = a("../../renderers/webgl/utils/checkMaxIfStatmentsInShader"),
          q = d(p),
          r = a("./BatchBuffer"),
          s = d(r),
          t = a("../../settings"),
          u = d(t),
          v = a("../../utils"),
          w = a("pixi-gl-core"),
          x = d(w),
          y = a("bit-twiddle"),
          z = d(y),
          A = 0,
          B = 0,
          C = function (a) {
        function b(c) {
          e(this, b);var d = f(this, a.call(this, c));d.vertSize = 5, d.vertByteSize = 4 * d.vertSize, d.size = u.default.SPRITE_BATCH_SIZE, d.buffers = [];for (var g = 1; g <= z.default.nextPow2(d.size); g *= 2) {
            d.buffers.push(new s.default(4 * g * d.vertByteSize));
          }d.indices = (0, m.default)(d.size), d.shader = null, d.currentIndex = 0, d.groups = [];for (var h = 0; h < d.size; h++) {
            d.groups[h] = { textures: [], textureCount: 0, ids: [], size: 0, start: 0, blend: 0 };
          }return d.sprites = [], d.vertexBuffers = [], d.vaos = [], d.vaoMax = 2, d.vertexCount = 0, d.renderer.on("prerender", d.onPrerender, d), d;
        }return g(b, a), b.prototype.onContextChange = function () {
          var a = this.renderer.gl;this.renderer.legacy ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS), u.default.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = (0, q.default)(this.MAX_TEXTURES, a)), this.shader = (0, o.default)(a, this.MAX_TEXTURES), this.indexBuffer = x.default.GLBuffer.createIndexBuffer(a, this.indices, a.STATIC_DRAW), this.renderer.bindVao(null);for (var b = this.shader.attributes, c = 0; c < this.vaoMax; c++) {
            var d = this.vertexBuffers[c] = x.default.GLBuffer.createVertexBuffer(a, null, a.STREAM_DRAW),
                e = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(d, b.aVertexPosition, a.FLOAT, !1, this.vertByteSize, 0).addAttribute(d, b.aTextureCoord, a.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(d, b.aColor, a.UNSIGNED_BYTE, !0, this.vertByteSize, 12);b.aTextureId && e.addAttribute(d, b.aTextureId, a.FLOAT, !1, this.vertByteSize, 16), this.vaos[c] = e;
          }this.vao = this.vaos[0], this.currentBlendMode = 99999, this.boundTextures = new Array(this.MAX_TEXTURES);
        }, b.prototype.onPrerender = function () {
          this.vertexCount = 0;
        }, b.prototype.render = function (a) {
          this.currentIndex >= this.size && this.flush(), a._texture._uvs && (this.sprites[this.currentIndex++] = a);
        }, b.prototype.flush = function () {
          if (0 !== this.currentIndex) {
            var a = this.renderer.gl,
                b = this.MAX_TEXTURES,
                c = z.default.nextPow2(this.currentIndex),
                d = z.default.log2(c),
                e = this.buffers[d],
                f = this.sprites,
                g = this.groups,
                h = e.float32View,
                i = e.uint32View,
                j = this.boundTextures,
                k = this.renderer.boundTextures,
                l = this.renderer.textureGC.count,
                m = 0,
                n = void 0,
                o = void 0,
                p = 1,
                q = 0,
                r = g[0],
                s = void 0,
                t = void 0,
                w = v.premultiplyBlendMode[f[0]._texture.baseTexture.premultipliedAlpha ? 1 : 0][f[0].blendMode];r.textureCount = 0, r.start = 0, r.blend = w, A++;var y = void 0;for (y = 0; y < b; ++y) {
              var C = k[y];C._enabled !== A ? (j[y] = C, C._virtalBoundId = y, C._enabled = A) : j[y] = this.renderer.emptyTextures[y];
            }for (A++, y = 0; y < this.currentIndex; ++y) {
              var D = f[y];n = D._texture.baseTexture;var E = v.premultiplyBlendMode[Number(n.premultipliedAlpha)][D.blendMode];if (w !== E && (w = E, o = null, q = b, A++), o !== n && (o = n, n._enabled !== A)) {
                if (q === b && (A++, r.size = y - r.start, q = 0, r = g[p++], r.blend = w, r.textureCount = 0, r.start = y), n.touched = l, n._virtalBoundId === -1) for (var F = 0; F < b; ++F) {
                  var G = (F + B) % b,
                      H = j[G];if (H._enabled !== A) {
                    B++, H._virtalBoundId = -1, n._virtalBoundId = G, j[G] = n;break;
                  }
                }n._enabled = A, r.textureCount++, r.ids[q] = n._virtalBoundId, r.textures[q++] = n;
              }if (s = D.vertexData, t = D._texture._uvs.uvsUint32, this.renderer.roundPixels) {
                var I = this.renderer.resolution;h[m] = (s[0] * I | 0) / I, h[m + 1] = (s[1] * I | 0) / I, h[m + 5] = (s[2] * I | 0) / I, h[m + 6] = (s[3] * I | 0) / I, h[m + 10] = (s[4] * I | 0) / I, h[m + 11] = (s[5] * I | 0) / I, h[m + 15] = (s[6] * I | 0) / I, h[m + 16] = (s[7] * I | 0) / I;
              } else h[m] = s[0], h[m + 1] = s[1], h[m + 5] = s[2], h[m + 6] = s[3], h[m + 10] = s[4], h[m + 11] = s[5], h[m + 15] = s[6], h[m + 16] = s[7];i[m + 2] = t[0], i[m + 7] = t[1], i[m + 12] = t[2], i[m + 17] = t[3];var J = Math.min(D.worldAlpha, 1),
                  K = J < 1 && n.premultipliedAlpha ? (0, v.premultiplyTint)(D._tintRGB, J) : D._tintRGB + (255 * J << 24);i[m + 3] = i[m + 8] = i[m + 13] = i[m + 18] = K, h[m + 4] = h[m + 9] = h[m + 14] = h[m + 19] = n._virtalBoundId, m += 20;
            }if (r.size = y - r.start, u.default.CAN_UPLOAD_SAME_BUFFER) this.vertexBuffers[this.vertexCount].upload(e.vertices, 0, !0);else {
              if (this.vaoMax <= this.vertexCount) {
                this.vaoMax++;var L = this.shader.attributes,
                    M = this.vertexBuffers[this.vertexCount] = x.default.GLBuffer.createVertexBuffer(a, null, a.STREAM_DRAW),
                    N = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(M, L.aVertexPosition, a.FLOAT, !1, this.vertByteSize, 0).addAttribute(M, L.aTextureCoord, a.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(M, L.aColor, a.UNSIGNED_BYTE, !0, this.vertByteSize, 12);L.aTextureId && N.addAttribute(M, L.aTextureId, a.FLOAT, !1, this.vertByteSize, 16), this.vaos[this.vertexCount] = N;
              }this.renderer.bindVao(this.vaos[this.vertexCount]), this.vertexBuffers[this.vertexCount].upload(e.vertices, 0, !1), this.vertexCount++;
            }for (y = 0; y < b; ++y) {
              k[y]._virtalBoundId = -1;
            }for (y = 0; y < p; ++y) {
              for (var O = g[y], P = O.textureCount, Q = 0; Q < P; Q++) {
                o = O.textures[Q], k[O.ids[Q]] !== o && this.renderer.bindTexture(o, O.ids[Q], !0), o._virtalBoundId = -1;
              }this.renderer.state.setBlendMode(O.blend), a.drawElements(a.TRIANGLES, 6 * O.size, a.UNSIGNED_SHORT, 6 * O.start * 2);
            }this.currentIndex = 0;
          }
        }, b.prototype.start = function () {
          this.renderer.bindShader(this.shader), u.default.CAN_UPLOAD_SAME_BUFFER && (this.renderer.bindVao(this.vaos[this.vertexCount]), this.vertexBuffers[this.vertexCount].bind());
        }, b.prototype.stop = function () {
          this.flush();
        }, b.prototype.destroy = function () {
          for (var b = 0; b < this.vaoMax; b++) {
            this.vertexBuffers[b] && this.vertexBuffers[b].destroy(), this.vaos[b] && this.vaos[b].destroy();
          }this.indexBuffer && this.indexBuffer.destroy(), this.renderer.off("prerender", this.onPrerender, this), a.prototype.destroy.call(this), this.shader && (this.shader.destroy(), this.shader = null), this.vertexBuffers = null, this.vaos = null, this.indexBuffer = null, this.indices = null, this.sprites = null;for (var c = 0; c < this.buffers.length; ++c) {
            this.buffers[c].destroy();
          }
        }, b;
      }(i.default);c.default = C, k.default.registerPlugin("sprite", C);
    }, { "../../renderers/webgl/WebGLRenderer": 84, "../../renderers/webgl/utils/ObjectRenderer": 94, "../../renderers/webgl/utils/checkMaxIfStatmentsInShader": 97, "../../settings": 101, "../../utils": 125, "../../utils/createIndicesForQuads": 123, "./BatchBuffer": 105, "./generateMultiTextureShader": 107, "bit-twiddle": 1, "pixi-gl-core": 12 }], 107: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        var c = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor;\n}\n",
            d = i;d = d.replace(/%count%/gi, b), d = d.replace(/%forloop%/gi, f(b));for (var e = new h.default(a, c, d), g = [], j = 0; j < b; j++) {
          g[j] = j;
        }return e.bind(), e.uniforms.uSamplers = g, e;
      }function f(a) {
        var b = "";b += "\n", b += "\n";for (var c = 0; c < a; c++) {
          c > 0 && (b += "\nelse "), c < a - 1 && (b += "if(textureId == " + c + ".0)"), b += "\n{", b += "\n\tcolor = texture2D(uSamplers[" + c + "], vTextureCoord);", b += "\n}";
        }return b += "\n", b += "\n";
      }c.__esModule = !0, c.default = e;var g = a("../../Shader"),
          h = d(g),
          i = (a("path"), ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "varying float vTextureId;", "uniform sampler2D uSamplers[%count%];", "void main(void){", "vec4 color;", "float textureId = floor(vTextureId+0.5);", "%forloop%", "gl_FragColor = color * vColor;", "}"].join("\n"));
    }, { "../../Shader": 44, path: 23 }], 108: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../sprites/Sprite"),
          j = d(i),
          k = a("../textures/Texture"),
          l = d(k),
          m = a("../math"),
          n = a("../utils"),
          o = a("../const"),
          p = a("../settings"),
          q = d(p),
          r = a("./TextStyle"),
          s = d(r),
          t = a("./TextMetrics"),
          u = d(t),
          v = a("../utils/trimCanvas"),
          w = d(v),
          x = { texture: !0, children: !1, baseTexture: !0 },
          y = function (a) {
        function b(c, d, g) {
          e(this, b), g = g || document.createElement("canvas"), g.width = 3, g.height = 3;var h = l.default.fromCanvas(g, q.default.SCALE_MODE, "text");h.orig = new m.Rectangle(), h.trim = new m.Rectangle();var i = f(this, a.call(this, h));return l.default.addToCache(i._texture, i._texture.baseTexture.textureCacheIds[0]), i.canvas = g, i.context = i.canvas.getContext("2d"), i.resolution = q.default.RESOLUTION, i._text = null, i._style = null, i._styleListener = null, i._font = "", i.text = c, i.style = d, i.localStyleID = -1, i;
        }return g(b, a), b.prototype.updateText = function (a) {
          var b = this._style;if (this.localStyleID !== b.styleID && (this.dirty = !0, this.localStyleID = b.styleID), this.dirty || !a) {
            this._font = this._style.toFontString();var c = this.context,
                d = u.default.measureText(this._text, this._style, this._style.wordWrap, this.canvas),
                e = d.width,
                f = d.height,
                g = d.lines,
                h = d.lineHeight,
                i = d.lineWidths,
                j = d.maxLineWidth,
                k = d.fontProperties;this.canvas.width = Math.ceil((e + 2 * b.padding) * this.resolution), this.canvas.height = Math.ceil((f + 2 * b.padding) * this.resolution), c.scale(this.resolution, this.resolution), c.clearRect(0, 0, this.canvas.width, this.canvas.height), c.font = this._font, c.strokeStyle = b.stroke, c.lineWidth = b.strokeThickness, c.textBaseline = b.textBaseline, c.lineJoin = b.lineJoin, c.miterLimit = b.miterLimit;var l = void 0,
                m = void 0;if (b.dropShadow) {
              c.fillStyle = b.dropShadowColor, c.globalAlpha = b.dropShadowAlpha, c.shadowBlur = b.dropShadowBlur, b.dropShadowBlur > 0 && (c.shadowColor = b.dropShadowColor);for (var n = Math.cos(b.dropShadowAngle) * b.dropShadowDistance, o = Math.sin(b.dropShadowAngle) * b.dropShadowDistance, p = 0; p < g.length; p++) {
                l = b.strokeThickness / 2, m = b.strokeThickness / 2 + p * h + k.ascent, "right" === b.align ? l += j - i[p] : "center" === b.align && (l += (j - i[p]) / 2), b.fill && (this.drawLetterSpacing(g[p], l + n + b.padding, m + o + b.padding), b.stroke && b.strokeThickness && (c.strokeStyle = b.dropShadowColor, this.drawLetterSpacing(g[p], l + n + b.padding, m + o + b.padding, !0), c.strokeStyle = b.stroke));
              }
            }c.shadowBlur = 0, c.globalAlpha = 1, c.fillStyle = this._generateFillStyle(b, g);for (var q = 0; q < g.length; q++) {
              l = b.strokeThickness / 2, m = b.strokeThickness / 2 + q * h + k.ascent, "right" === b.align ? l += j - i[q] : "center" === b.align && (l += (j - i[q]) / 2), b.stroke && b.strokeThickness && this.drawLetterSpacing(g[q], l + b.padding, m + b.padding, !0), b.fill && this.drawLetterSpacing(g[q], l + b.padding, m + b.padding);
            }this.updateTexture();
          }
        }, b.prototype.drawLetterSpacing = function (a, b, c) {
          var d = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
              e = this._style,
              f = e.letterSpacing;if (0 === f) return void (d ? this.context.strokeText(a, b, c) : this.context.fillText(a, b, c));for (var g = String.prototype.split.call(a, ""), h = b, i = 0, j = ""; i < a.length;) {
            j = g[i++], d ? this.context.strokeText(j, h, c) : this.context.fillText(j, h, c), h += this.context.measureText(j).width + f;
          }
        }, b.prototype.updateTexture = function () {
          var a = this.canvas;if (this._style.trim) {
            var b = (0, w.default)(a);a.width = b.width, a.height = b.height, this.context.putImageData(b.data, 0, 0);
          }var c = this._texture,
              d = this._style,
              e = d.trim ? 0 : d.padding,
              f = c.baseTexture;f.hasLoaded = !0, f.resolution = this.resolution, f.realWidth = a.width, f.realHeight = a.height, f.width = a.width / this.resolution, f.height = a.height / this.resolution, c.trim.width = c._frame.width = a.width / this.resolution, c.trim.height = c._frame.height = a.height / this.resolution, c.trim.x = -e, c.trim.y = -e, c.orig.width = c._frame.width - 2 * e, c.orig.height = c._frame.height - 2 * e, this._onTextureUpdate(), f.emit("update", f), this.dirty = !1;
        }, b.prototype.renderWebGL = function (b) {
          this.resolution !== b.resolution && (this.resolution = b.resolution, this.dirty = !0), this.updateText(!0), a.prototype.renderWebGL.call(this, b);
        }, b.prototype._renderCanvas = function (b) {
          this.resolution !== b.resolution && (this.resolution = b.resolution, this.dirty = !0), this.updateText(!0), a.prototype._renderCanvas.call(this, b);
        }, b.prototype.getLocalBounds = function (b) {
          return this.updateText(!0), a.prototype.getLocalBounds.call(this, b);
        }, b.prototype._calculateBounds = function () {
          this.updateText(!0), this.calculateVertices(), this._bounds.addQuad(this.vertexData);
        }, b.prototype._onStyleChange = function () {
          this.dirty = !0;
        }, b.prototype._generateFillStyle = function (a, b) {
          if (!Array.isArray(a.fill)) return a.fill;if (navigator.isCocoonJS) return a.fill[0];var c = void 0,
              d = void 0,
              e = void 0,
              f = void 0,
              g = this.canvas.width / this.resolution,
              h = this.canvas.height / this.resolution,
              i = a.fill.slice(),
              j = a.fillGradientStops.slice();if (!j.length) for (var k = i.length + 1, l = 1; l < k; ++l) {
            j.push(l / k);
          }if (i.unshift(a.fill[0]), j.unshift(0), i.push(a.fill[a.fill.length - 1]), j.push(1), a.fillGradientType === o.TEXT_GRADIENT.LINEAR_VERTICAL) {
            c = this.context.createLinearGradient(g / 2, 0, g / 2, h), d = (i.length + 1) * b.length, e = 0;for (var m = 0; m < b.length; m++) {
              e += 1;for (var n = 0; n < i.length; n++) {
                f = "number" == typeof j[n] ? j[n] / b.length + m / b.length : e / d, c.addColorStop(f, i[n]), e++;
              }
            }
          } else {
            c = this.context.createLinearGradient(0, h / 2, g, h / 2), d = i.length + 1, e = 1;for (var p = 0; p < i.length; p++) {
              f = "number" == typeof j[p] ? j[p] : e / d, c.addColorStop(f, i[p]), e++;
            }
          }return c;
        }, b.prototype.destroy = function (b) {
          "boolean" == typeof b && (b = { children: b }), b = Object.assign({}, x, b), a.prototype.destroy.call(this, b), this.context = null, this.canvas = null, this._style = null;
        }, h(b, [{ key: "width", get: function get() {
            return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width;
          }, set: function set(a) {
            this.updateText(!0);var b = (0, n.sign)(this.scale.x) || 1;this.scale.x = b * a / this._texture.orig.width, this._width = a;
          } }, { key: "height", get: function get() {
            return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height;
          }, set: function set(a) {
            this.updateText(!0);var b = (0, n.sign)(this.scale.y) || 1;this.scale.y = b * a / this._texture.orig.height, this._height = a;
          } }, { key: "style", get: function get() {
            return this._style;
          }, set: function set(a) {
            a = a || {}, a instanceof s.default ? this._style = a : this._style = new s.default(a), this.localStyleID = -1, this.dirty = !0;
          } }, { key: "text", get: function get() {
            return this._text;
          }, set: function set(a) {
            a = String("" === a || null === a || void 0 === a ? " " : a), this._text !== a && (this._text = a, this.dirty = !0);
          } }]), b;
      }(j.default);c.default = y;
    }, { "../const": 46, "../math": 70, "../settings": 101, "../sprites/Sprite": 102, "../textures/Texture": 115, "../utils": 125, "../utils/trimCanvas": 130, "./TextMetrics": 109, "./TextStyle": 110 }], 109: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(b, c, e, f, g, h, i, j, k) {
          d(this, a), this.text = b, this.style = c, this.width = e, this.height = f, this.lines = g, this.lineWidths = h, this.lineHeight = i, this.maxLineWidth = j, this.fontProperties = k;
        }return a.measureText = function (b, c, d) {
          var e = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : a._canvas;d = d || c.wordWrap;var f = c.toFontString(),
              g = a.measureFont(f),
              h = e.getContext("2d");h.font = f;for (var i = d ? a.wordWrap(b, c, e) : b, j = i.split(/(?:\r\n|\r|\n)/), k = new Array(j.length), l = 0, m = 0; m < j.length; m++) {
            var n = h.measureText(j[m]).width + (j[m].length - 1) * c.letterSpacing;k[m] = n, l = Math.max(l, n);
          }var o = l + c.strokeThickness;c.dropShadow && (o += c.dropShadowDistance);var p = c.lineHeight || g.fontSize + c.strokeThickness,
              q = Math.max(p, g.fontSize + c.strokeThickness) + (j.length - 1) * (p + c.leading);return c.dropShadow && (q += c.dropShadowDistance), new a(b, c, o, q, j, k, p + c.leading, l, g);
        }, a.wordWrap = function (b, c) {
          for (var d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : a._canvas, e = d.getContext("2d"), f = "", g = b.charAt(0), h = b.split("\n"), i = c.wordWrapWidth, j = {}, k = 0; k < h.length; k++) {
            for (var l = i, m = h[k].split(" "), n = 0; n < m.length; n++) {
              var o = e.measureText(m[n]).width;if (c.breakWords && o > i) for (var p = m[n].split(""), q = 0; q < p.length; q++) {
                var r = p[q],
                    s = j[r];void 0 === s && (s = e.measureText(r).width, j[r] = s), s > l ? (f += "\n" + r, l = i - s) : (0 === q && (n > 0 || " " === g) && (f += " "), f += r, l -= s);
              } else {
                var t = o + e.measureText(" ").width;0 === n || t > l ? (n > 0 && (f += "\n"), f += m[n], l = i - o) : (l -= t, f += " " + m[n]);
              }
            }k < h.length - 1 && (f += "\n");
          }return f;
        }, a.measureFont = function (b) {
          if (a._fonts[b]) return a._fonts[b];var c = {},
              d = a._canvas,
              e = a._context;e.font = b;var f = Math.ceil(e.measureText("|MÉq").width),
              g = Math.ceil(e.measureText("M").width),
              h = 2 * g;g = 1.4 * g | 0, d.width = f, d.height = h, e.fillStyle = "#f00", e.fillRect(0, 0, f, h), e.font = b, e.textBaseline = "alphabetic", e.fillStyle = "#000", e.fillText("|MÉq", 0, g);var i = e.getImageData(0, 0, f, h).data,
              j = i.length,
              k = 4 * f,
              l = 0,
              m = 0,
              n = !1;for (l = 0; l < g; ++l) {
            for (var o = 0; o < k; o += 4) {
              if (255 !== i[m + o]) {
                n = !0;break;
              }
            }if (n) break;m += k;
          }for (c.ascent = g - l, m = j - k, n = !1, l = h; l > g; --l) {
            for (var p = 0; p < k; p += 4) {
              if (255 !== i[m + p]) {
                n = !0;break;
              }
            }if (n) break;m -= k;
          }return c.descent = l - g, c.fontSize = c.ascent + c.descent, a._fonts[b] = c, c;
        }, a;
      }();c.default = e;var f = document.createElement("canvas");f.width = f.height = 10, e._canvas = f, e._context = f.getContext("2d"), e._fonts = {};
    }, {}], 110: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function e(a) {
        return "number" == typeof a ? (0, k.hex2string)(a) : ("string" == typeof a && 0 === a.indexOf("0x") && (a = a.replace("0x", "#")), a);
      }function f(a) {
        if (Array.isArray(a)) {
          for (var b = 0; b < a.length; ++b) {
            a[b] = e(a[b]);
          }return a;
        }return e(a);
      }function g(a, b) {
        if (!Array.isArray(a) || !Array.isArray(b)) return !1;if (a.length !== b.length) return !1;for (var c = 0; c < a.length; ++c) {
          if (a[c] !== b[c]) return !1;
        }return !0;
      }function h(a, b, c) {
        for (var d in c) {
          Array.isArray(b[d]) ? a[d] = b[d].slice() : a[d] = b[d];
        }
      }c.__esModule = !0;var i = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          j = a("../const"),
          k = a("../utils"),
          l = { align: "left", breakWords: !1, dropShadow: !1, dropShadowAlpha: 1, dropShadowAngle: Math.PI / 6, dropShadowBlur: 0, dropShadowColor: "black", dropShadowDistance: 5, fill: "black", fillGradientType: j.TEXT_GRADIENT.LINEAR_VERTICAL, fillGradientStops: [], fontFamily: "Arial", fontSize: 26, fontStyle: "normal", fontVariant: "normal", fontWeight: "normal", letterSpacing: 0, lineHeight: 0, lineJoin: "miter", miterLimit: 10, padding: 0, stroke: "black", strokeThickness: 0, textBaseline: "alphabetic", trim: !1, wordWrap: !1, wordWrapWidth: 100, leading: 0 },
          m = function () {
        function a(b) {
          d(this, a), this.styleID = 0, this.reset(), h(this, b, b);
        }return a.prototype.clone = function () {
          var b = {};return h(b, this, l), new a(b);
        }, a.prototype.reset = function () {
          h(this, l, l);
        }, a.prototype.toFontString = function () {
          var a = "number" == typeof this.fontSize ? this.fontSize + "px" : this.fontSize,
              b = this.fontFamily;Array.isArray(this.fontFamily) || (b = this.fontFamily.split(","));for (var c = b.length - 1; c >= 0; c--) {
            var d = b[c].trim();/([\"\'])[^\'\"]+\1/.test(d) || (d = '"' + d + '"'), b[c] = d;
          }return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + a + " " + b.join(",");
        }, i(a, [{ key: "align", get: function get() {
            return this._align;
          }, set: function set(a) {
            this._align !== a && (this._align = a, this.styleID++);
          } }, { key: "breakWords", get: function get() {
            return this._breakWords;
          }, set: function set(a) {
            this._breakWords !== a && (this._breakWords = a, this.styleID++);
          } }, { key: "dropShadow", get: function get() {
            return this._dropShadow;
          }, set: function set(a) {
            this._dropShadow !== a && (this._dropShadow = a, this.styleID++);
          } }, { key: "dropShadowAlpha", get: function get() {
            return this._dropShadowAlpha;
          }, set: function set(a) {
            this._dropShadowAlpha !== a && (this._dropShadowAlpha = a, this.styleID++);
          } }, { key: "dropShadowAngle", get: function get() {
            return this._dropShadowAngle;
          }, set: function set(a) {
            this._dropShadowAngle !== a && (this._dropShadowAngle = a, this.styleID++);
          } }, { key: "dropShadowBlur", get: function get() {
            return this._dropShadowBlur;
          }, set: function set(a) {
            this._dropShadowBlur !== a && (this._dropShadowBlur = a, this.styleID++);
          } }, { key: "dropShadowColor", get: function get() {
            return this._dropShadowColor;
          }, set: function set(a) {
            var b = f(a);this._dropShadowColor !== b && (this._dropShadowColor = b, this.styleID++);
          } }, { key: "dropShadowDistance", get: function get() {
            return this._dropShadowDistance;
          }, set: function set(a) {
            this._dropShadowDistance !== a && (this._dropShadowDistance = a, this.styleID++);
          } }, { key: "fill", get: function get() {
            return this._fill;
          }, set: function set(a) {
            var b = f(a);this._fill !== b && (this._fill = b, this.styleID++);
          } }, { key: "fillGradientType", get: function get() {
            return this._fillGradientType;
          }, set: function set(a) {
            this._fillGradientType !== a && (this._fillGradientType = a, this.styleID++);
          } }, { key: "fillGradientStops", get: function get() {
            return this._fillGradientStops;
          }, set: function set(a) {
            g(this._fillGradientStops, a) || (this._fillGradientStops = a, this.styleID++);
          } }, { key: "fontFamily", get: function get() {
            return this._fontFamily;
          }, set: function set(a) {
            this.fontFamily !== a && (this._fontFamily = a, this.styleID++);
          } }, { key: "fontSize", get: function get() {
            return this._fontSize;
          }, set: function set(a) {
            this._fontSize !== a && (this._fontSize = a, this.styleID++);
          } }, { key: "fontStyle", get: function get() {
            return this._fontStyle;
          }, set: function set(a) {
            this._fontStyle !== a && (this._fontStyle = a, this.styleID++);
          } }, { key: "fontVariant", get: function get() {
            return this._fontVariant;
          }, set: function set(a) {
            this._fontVariant !== a && (this._fontVariant = a, this.styleID++);
          } }, { key: "fontWeight", get: function get() {
            return this._fontWeight;
          }, set: function set(a) {
            this._fontWeight !== a && (this._fontWeight = a, this.styleID++);
          } }, { key: "letterSpacing", get: function get() {
            return this._letterSpacing;
          }, set: function set(a) {
            this._letterSpacing !== a && (this._letterSpacing = a, this.styleID++);
          } }, { key: "lineHeight", get: function get() {
            return this._lineHeight;
          }, set: function set(a) {
            this._lineHeight !== a && (this._lineHeight = a, this.styleID++);
          } }, { key: "leading", get: function get() {
            return this._leading;
          }, set: function set(a) {
            this._leading !== a && (this._leading = a, this.styleID++);
          } }, { key: "lineJoin", get: function get() {
            return this._lineJoin;
          }, set: function set(a) {
            this._lineJoin !== a && (this._lineJoin = a, this.styleID++);
          } }, { key: "miterLimit", get: function get() {
            return this._miterLimit;
          }, set: function set(a) {
            this._miterLimit !== a && (this._miterLimit = a, this.styleID++);
          } }, { key: "padding", get: function get() {
            return this._padding;
          }, set: function set(a) {
            this._padding !== a && (this._padding = a, this.styleID++);
          } }, { key: "stroke", get: function get() {
            return this._stroke;
          }, set: function set(a) {
            var b = f(a);this._stroke !== b && (this._stroke = b, this.styleID++);
          } }, { key: "strokeThickness", get: function get() {
            return this._strokeThickness;
          }, set: function set(a) {
            this._strokeThickness !== a && (this._strokeThickness = a, this.styleID++);
          } }, { key: "textBaseline", get: function get() {
            return this._textBaseline;
          }, set: function set(a) {
            this._textBaseline !== a && (this._textBaseline = a, this.styleID++);
          } }, { key: "trim", get: function get() {
            return this._trim;
          }, set: function set(a) {
            this._trim !== a && (this._trim = a, this.styleID++);
          } }, { key: "wordWrap", get: function get() {
            return this._wordWrap;
          }, set: function set(a) {
            this._wordWrap !== a && (this._wordWrap = a, this.styleID++);
          } }, { key: "wordWrapWidth", get: function get() {
            return this._wordWrapWidth;
          }, set: function set(a) {
            this._wordWrapWidth !== a && (this._wordWrapWidth = a, this.styleID++);
          } }]), a;
      }();c.default = m;
    }, { "../const": 46, "../utils": 125 }], 111: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("./BaseTexture"),
          i = d(h),
          j = a("../settings"),
          k = d(j),
          l = function (a) {
        function b() {
          var c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100,
              d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
              g = arguments[2],
              h = arguments[3];e(this, b);var i = f(this, a.call(this, null, g));return i.resolution = h || k.default.RESOLUTION, i.width = Math.ceil(c), i.height = Math.ceil(d), i.realWidth = i.width * i.resolution, i.realHeight = i.height * i.resolution, i.scaleMode = void 0 !== g ? g : k.default.SCALE_MODE, i.hasLoaded = !0, i._glRenderTargets = {}, i._canvasRenderTarget = null, i.valid = !1, i;
        }return g(b, a), b.prototype.resize = function (a, b) {
          a = Math.ceil(a), b = Math.ceil(b), a === this.width && b === this.height || (this.valid = a > 0 && b > 0, this.width = a, this.height = b, this.realWidth = this.width * this.resolution, this.realHeight = this.height * this.resolution, this.valid && this.emit("update", this));
        }, b.prototype.destroy = function () {
          a.prototype.destroy.call(this, !0), this.renderer = null;
        }, b;
      }(i.default);c.default = l;
    }, { "../settings": 101, "./BaseTexture": 112 }], 112: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../utils"),
          i = a("../settings"),
          j = d(i),
          k = a("eventemitter3"),
          l = d(k),
          m = a("../utils/determineCrossOrigin"),
          n = d(m),
          o = a("bit-twiddle"),
          p = d(o),
          q = function (a) {
        function b(c, d, g) {
          e(this, b);var i = f(this, a.call(this));return i.uid = (0, h.uid)(), i.touched = 0, i.resolution = g || j.default.RESOLUTION, i.width = 100, i.height = 100, i.realWidth = 100, i.realHeight = 100, i.scaleMode = void 0 !== d ? d : j.default.SCALE_MODE, i.hasLoaded = !1, i.isLoading = !1, i.source = null, i.origSource = null, i.imageType = null, i.sourceScale = 1, i.premultipliedAlpha = !0, i.imageUrl = null, i.isPowerOfTwo = !1, i.mipmap = j.default.MIPMAP_TEXTURES, i.wrapMode = j.default.WRAP_MODE, i._glTextures = {}, i._enabled = 0, i._virtalBoundId = -1, i._destroyed = !1, i.textureCacheIds = [], c && i.loadSource(c), i;
        }return g(b, a), b.prototype.update = function () {
          "svg" !== this.imageType && (this.realWidth = this.source.naturalWidth || this.source.videoWidth || this.source.width, this.realHeight = this.source.naturalHeight || this.source.videoHeight || this.source.height, this._updateDimensions()), this.emit("update", this);
        }, b.prototype._updateDimensions = function () {
          this.width = this.realWidth / this.resolution, this.height = this.realHeight / this.resolution, this.isPowerOfTwo = p.default.isPow2(this.realWidth) && p.default.isPow2(this.realHeight);
        }, b.prototype.loadSource = function (a) {
          var b = this.isLoading;this.hasLoaded = !1, this.isLoading = !1, b && this.source && (this.source.onload = null, this.source.onerror = null);var c = !this.source;if (this.source = a, (a.src && a.complete || a.getContext) && a.width && a.height) this._updateImageType(), "svg" === this.imageType ? this._loadSvgSource() : this._sourceLoaded(), c && this.emit("loaded", this);else if (!a.getContext) {
            this.isLoading = !0;var d = this;if (a.onload = function () {
              if (d._updateImageType(), a.onload = null, a.onerror = null, d.isLoading) return d.isLoading = !1, d._sourceLoaded(), "svg" === d.imageType ? void d._loadSvgSource() : void d.emit("loaded", d);
            }, a.onerror = function () {
              a.onload = null, a.onerror = null, d.isLoading && (d.isLoading = !1, d.emit("error", d));
            }, a.complete && a.src) {
              if (a.onload = null, a.onerror = null, "svg" === d.imageType) return void d._loadSvgSource();this.isLoading = !1, a.width && a.height ? (this._sourceLoaded(), b && this.emit("loaded", this)) : b && this.emit("error", this);
            }
          }
        }, b.prototype._updateImageType = function () {
          if (this.imageUrl) {
            var a = (0, h.decomposeDataUri)(this.imageUrl),
                b = void 0;if (a && "image" === a.mediaType) {
              var c = a.subType.split("+")[0];if (b = (0, h.getUrlFileExtension)("." + c), !b) throw new Error("Invalid image type in data URI.");
            } else b = (0, h.getUrlFileExtension)(this.imageUrl), b || (b = "png");this.imageType = b;
          }
        }, b.prototype._loadSvgSource = function () {
          if ("svg" === this.imageType) {
            var a = (0, h.decomposeDataUri)(this.imageUrl);a ? this._loadSvgSourceUsingDataUri(a) : this._loadSvgSourceUsingXhr();
          }
        }, b.prototype._loadSvgSourceUsingDataUri = function (a) {
          var b = void 0;if ("base64" === a.encoding) {
            if (!atob) throw new Error("Your browser doesn't support base64 conversions.");b = atob(a.data);
          } else b = a.data;this._loadSvgSourceUsingString(b);
        }, b.prototype._loadSvgSourceUsingXhr = function () {
          var a = this,
              b = new XMLHttpRequest();b.onload = function () {
            if (b.readyState !== b.DONE || 200 !== b.status) throw new Error("Failed to load SVG using XHR.");a._loadSvgSourceUsingString(b.response);
          }, b.onerror = function () {
            return a.emit("error", a);
          }, b.open("GET", this.imageUrl, !0), b.send();
        }, b.prototype._loadSvgSourceUsingString = function (a) {
          var c = (0, h.getSvgSize)(a),
              d = c.width,
              e = c.height;if (!d || !e) throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");this.realWidth = Math.round(d * this.sourceScale), this.realHeight = Math.round(e * this.sourceScale), this._updateDimensions();var f = document.createElement("canvas");f.width = this.realWidth, f.height = this.realHeight, f._pixiId = "canvas_" + (0, h.uid)(), f.getContext("2d").drawImage(this.source, 0, 0, d, e, 0, 0, this.realWidth, this.realHeight), this.origSource = this.source, this.source = f, b.addToCache(this, f._pixiId), this.isLoading = !1, this._sourceLoaded(), this.emit("loaded", this);
        }, b.prototype._sourceLoaded = function () {
          this.hasLoaded = !0, this.update();
        }, b.prototype.destroy = function () {
          this.imageUrl && (delete h.TextureCache[this.imageUrl], this.imageUrl = null, navigator.isCocoonJS || (this.source.src = "")), this.source = null, this.dispose(), b.removeFromCache(this), this.textureCacheIds = null, this._destroyed = !0;
        }, b.prototype.dispose = function () {
          this.emit("dispose", this);
        }, b.prototype.updateSourceImage = function (a) {
          this.source.src = a, this.loadSource(this.source);
        }, b.fromImage = function (a, c, d, e) {
          var f = h.BaseTextureCache[a];if (!f) {
            var g = new Image();void 0 === c && 0 !== a.indexOf("data:") ? g.crossOrigin = (0, n.default)(a) : c && (g.crossOrigin = "string" == typeof c ? c : "anonymous"), f = new b(g, d), f.imageUrl = a, e && (f.sourceScale = e), f.resolution = (0, h.getResolutionOfUrl)(a), g.src = a, b.addToCache(f, a);
          }return f;
        }, b.fromCanvas = function (a, c) {
          var d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "canvas";a._pixiId || (a._pixiId = d + "_" + (0, h.uid)());var e = h.BaseTextureCache[a._pixiId];return e || (e = new b(a, c), b.addToCache(e, a._pixiId)), e;
        }, b.from = function (a, c, d) {
          if ("string" == typeof a) return b.fromImage(a, void 0, c, d);if (a instanceof HTMLImageElement) {
            var e = a.src,
                f = h.BaseTextureCache[e];return f || (f = new b(a, c), f.imageUrl = e, d && (f.sourceScale = d), f.resolution = (0, h.getResolutionOfUrl)(e), b.addToCache(f, e)), f;
          }return a instanceof HTMLCanvasElement ? b.fromCanvas(a, c) : a;
        }, b.addToCache = function (a, b) {
          b && (a.textureCacheIds.indexOf(b) === -1 && a.textureCacheIds.push(b), h.BaseTextureCache[b] && console.warn("BaseTexture added to the cache with an id [" + b + "] that already had an entry"), h.BaseTextureCache[b] = a);
        }, b.removeFromCache = function (a) {
          if ("string" == typeof a) {
            var b = h.BaseTextureCache[a];if (b) {
              var c = b.textureCacheIds.indexOf(a);return c > -1 && b.textureCacheIds.splice(c, 1), delete h.BaseTextureCache[a], b;
            }
          } else if (a && a.textureCacheIds) {
            for (var d = 0; d < a.textureCacheIds.length; ++d) {
              delete h.BaseTextureCache[a.textureCacheIds[d]];
            }return a.textureCacheIds.length = 0, a;
          }return null;
        }, b;
      }(l.default);c.default = q;
    }, { "../settings": 101, "../utils": 125, "../utils/determineCrossOrigin": 124, "bit-twiddle": 1, eventemitter3: 3 }], 113: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("./BaseRenderTexture"),
          i = d(h),
          j = a("./Texture"),
          k = d(j),
          l = function (a) {
        function b(c, d) {
          e(this, b);var g = null;if (!(c instanceof i.default)) {
            var h = arguments[1],
                j = arguments[2],
                k = arguments[3],
                l = arguments[4];console.warn("Please use RenderTexture.create(" + h + ", " + j + ") instead of the ctor directly."), g = arguments[0], d = null, c = new i.default(h, j, k, l);
          }var m = f(this, a.call(this, c, d));return m.legacyRenderer = g, m.valid = !0, m._updateUvs(), m;
        }return g(b, a), b.prototype.resize = function (a, b, c) {
          a = Math.ceil(a), b = Math.ceil(b), this.valid = a > 0 && b > 0, this._frame.width = this.orig.width = a, this._frame.height = this.orig.height = b, c || this.baseTexture.resize(a, b), this._updateUvs();
        }, b.create = function (a, c, d, e) {
          return new b(new i.default(a, c, d, e));
        }, b;
      }(k.default);c.default = l;
    }, { "./BaseRenderTexture": 111, "./Texture": 115 }], 114: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          f = a("../"),
          g = a("../utils"),
          h = function () {
        function a(b, c) {
          var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;d(this, a), this.baseTexture = b, this.textures = {}, this.data = c, this.resolution = this._updateResolution(e || this.baseTexture.imageUrl), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
        }return e(a, null, [{ key: "BATCH_SIZE", get: function get() {
            return 1e3;
          } }]), a.prototype._updateResolution = function (a) {
          var b = this.data.meta.scale,
              c = (0, g.getResolutionOfUrl)(a, null);return null === c && (c = void 0 !== b ? parseFloat(b) : 1), 1 !== c && (this.baseTexture.resolution = c, this.baseTexture.update()), c;
        }, a.prototype.parse = function (b) {
          this._batchIndex = 0, this._callback = b, this._frameKeys.length <= a.BATCH_SIZE ? (this._processFrames(0), this._parseComplete()) : this._nextBatch();
        }, a.prototype._processFrames = function (b) {
          for (var c = b, d = a.BATCH_SIZE, e = this.baseTexture.sourceScale; c - b < d && c < this._frameKeys.length;) {
            var g = this._frameKeys[c],
                h = this._frames[g].frame;if (h) {
              var i = null,
                  j = null,
                  k = new f.Rectangle(0, 0, Math.floor(this._frames[g].sourceSize.w * e) / this.resolution, Math.floor(this._frames[g].sourceSize.h * e) / this.resolution);i = this._frames[g].rotated ? new f.Rectangle(Math.floor(h.x * e) / this.resolution, Math.floor(h.y * e) / this.resolution, Math.floor(h.h * e) / this.resolution, Math.floor(h.w * e) / this.resolution) : new f.Rectangle(Math.floor(h.x * e) / this.resolution, Math.floor(h.y * e) / this.resolution, Math.floor(h.w * e) / this.resolution, Math.floor(h.h * e) / this.resolution), this._frames[g].trimmed && (j = new f.Rectangle(Math.floor(this._frames[g].spriteSourceSize.x * e) / this.resolution, Math.floor(this._frames[g].spriteSourceSize.y * e) / this.resolution, Math.floor(h.w * e) / this.resolution, Math.floor(h.h * e) / this.resolution)), this.textures[g] = new f.Texture(this.baseTexture, i, k, j, this._frames[g].rotated ? 2 : 0), f.Texture.addToCache(this.textures[g], g);
            }c++;
          }
        }, a.prototype._parseComplete = function () {
          var a = this._callback;this._callback = null, this._batchIndex = 0, a.call(this, this.textures);
        }, a.prototype._nextBatch = function () {
          var b = this;this._processFrames(this._batchIndex * a.BATCH_SIZE), this._batchIndex++, setTimeout(function () {
            b._batchIndex * a.BATCH_SIZE < b._frameKeys.length ? b._nextBatch() : b._parseComplete();
          }, 0);
        }, a.prototype.destroy = function () {
          var a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];for (var b in this.textures) {
            this.textures[b].destroy();
          }this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, a && this.baseTexture.destroy(), this.baseTexture = null;
        }, a;
      }();c.default = h;
    }, { "../": 65, "../utils": 125 }], 115: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }function h() {
        var a = document.createElement("canvas");a.width = 10, a.height = 10;var b = a.getContext("2d");return b.fillStyle = "white", b.fillRect(0, 0, 10, 10), new w(new l.default(a));
      }function i(a) {
        a.destroy = function () {}, a.on = function () {}, a.once = function () {}, a.emit = function () {};
      }c.__esModule = !0;var j = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          k = a("./BaseTexture"),
          l = d(k),
          m = a("./VideoBaseTexture"),
          n = d(m),
          o = a("./TextureUvs"),
          p = d(o),
          q = a("eventemitter3"),
          r = d(q),
          s = a("../math"),
          t = a("../utils"),
          u = a("../settings"),
          v = d(u),
          w = function (a) {
        function b(c, d, g, h, i) {
          e(this, b);var j = f(this, a.call(this));if (j.noFrame = !1, d || (j.noFrame = !0, d = new s.Rectangle(0, 0, 1, 1)), c instanceof b && (c = c.baseTexture), j.baseTexture = c, j._frame = d, j.trim = h, j.valid = !1, j.requiresUpdate = !1, j._uvs = null, j.orig = g || d, j._rotate = Number(i || 0), i === !0) j._rotate = 2;else if (j._rotate % 2 !== 0) throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");return c.hasLoaded ? (j.noFrame && (d = new s.Rectangle(0, 0, c.width, c.height), c.on("update", j.onBaseTextureUpdated, j)), j.frame = d) : c.once("loaded", j.onBaseTextureLoaded, j), j._updateID = 0, j.transform = null, j.textureCacheIds = [], j;
        }return g(b, a), b.prototype.update = function () {
          this.baseTexture.update();
        }, b.prototype.onBaseTextureLoaded = function (a) {
          this._updateID++, this.noFrame ? this.frame = new s.Rectangle(0, 0, a.width, a.height) : this.frame = this._frame, this.baseTexture.on("update", this.onBaseTextureUpdated, this), this.emit("update", this);
        }, b.prototype.onBaseTextureUpdated = function (a) {
          this._updateID++, this._frame.width = a.width, this._frame.height = a.height, this.emit("update", this);
        }, b.prototype.destroy = function (a) {
          this.baseTexture && (a && (t.TextureCache[this.baseTexture.imageUrl] && b.removeFromCache(this.baseTexture.imageUrl), this.baseTexture.destroy()), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture.off("loaded", this.onBaseTextureLoaded, this), this.baseTexture = null), this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, b.removeFromCache(this), this.textureCacheIds = null;
        }, b.prototype.clone = function () {
          return new b(this.baseTexture, this.frame, this.orig, this.trim, this.rotate);
        }, b.prototype._updateUvs = function () {
          this._uvs || (this._uvs = new p.default()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
        }, b.fromImage = function (a, c, d, e) {
          var f = t.TextureCache[a];return f || (f = new b(l.default.fromImage(a, c, d, e)), b.addToCache(f, a)), f;
        }, b.fromFrame = function (a) {
          var b = t.TextureCache[a];if (!b) throw new Error('The frameId "' + a + '" does not exist in the texture cache');return b;
        }, b.fromCanvas = function (a, c) {
          var d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "canvas";
          return new b(l.default.fromCanvas(a, c, d));
        }, b.fromVideo = function (a, c) {
          return "string" == typeof a ? b.fromVideoUrl(a, c) : new b(n.default.fromVideo(a, c));
        }, b.fromVideoUrl = function (a, c) {
          return new b(n.default.fromUrl(a, c));
        }, b.from = function (a) {
          if ("string" == typeof a) {
            var c = t.TextureCache[a];if (!c) {
              var d = null !== a.match(/\.(mp4|webm|ogg|h264|avi|mov)$/);return d ? b.fromVideoUrl(a) : b.fromImage(a);
            }return c;
          }return a instanceof HTMLImageElement ? new b(l.default.from(a)) : a instanceof HTMLCanvasElement ? b.fromCanvas(a, v.default.SCALE_MODE, "HTMLCanvasElement") : a instanceof HTMLVideoElement ? b.fromVideo(a) : a instanceof l.default ? new b(a) : a;
        }, b.fromLoader = function (a, c, d) {
          var e = new l.default(a, void 0, (0, t.getResolutionOfUrl)(c)),
              f = new b(e);return e.imageUrl = c, d || (d = c), l.default.addToCache(f.baseTexture, d), b.addToCache(f, d), d !== c && (l.default.addToCache(f.baseTexture, c), b.addToCache(f, c)), f;
        }, b.addToCache = function (a, b) {
          b && (a.textureCacheIds.indexOf(b) === -1 && a.textureCacheIds.push(b), t.TextureCache[b] && console.warn("Texture added to the cache with an id [" + b + "] that already had an entry"), t.TextureCache[b] = a);
        }, b.removeFromCache = function (a) {
          if ("string" == typeof a) {
            var b = t.TextureCache[a];if (b) {
              var c = b.textureCacheIds.indexOf(a);return c > -1 && b.textureCacheIds.splice(c, 1), delete t.TextureCache[a], b;
            }
          } else if (a && a.textureCacheIds) {
            for (var d = 0; d < a.textureCacheIds.length; ++d) {
              t.TextureCache[a.textureCacheIds[d]] === a && delete t.TextureCache[a.textureCacheIds[d]];
            }return a.textureCacheIds.length = 0, a;
          }return null;
        }, j(b, [{ key: "frame", get: function get() {
            return this._frame;
          }, set: function set(a) {
            this._frame = a, this.noFrame = !1;var b = a.x,
                c = a.y,
                d = a.width,
                e = a.height,
                f = b + d > this.baseTexture.width,
                g = c + e > this.baseTexture.height;if (f || g) {
              var h = f && g ? "and" : "or",
                  i = "X: " + b + " + " + d + " = " + (b + d) + " > " + this.baseTexture.width,
                  j = "Y: " + c + " + " + e + " = " + (c + e) + " > " + this.baseTexture.height;throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + (i + " " + h + " " + j));
            }this.valid = d && e && this.baseTexture.hasLoaded, this.trim || this.rotate || (this.orig = a), this.valid && this._updateUvs();
          } }, { key: "rotate", get: function get() {
            return this._rotate;
          }, set: function set(a) {
            this._rotate = a, this.valid && this._updateUvs();
          } }, { key: "width", get: function get() {
            return this.orig.width;
          } }, { key: "height", get: function get() {
            return this.orig.height;
          } }]), b;
      }(r.default);c.default = w, w.EMPTY = new w(new l.default()), i(w.EMPTY), i(w.EMPTY.baseTexture), w.WHITE = h(), i(w.WHITE), i(w.WHITE.baseTexture);
    }, { "../math": 70, "../settings": 101, "../utils": 125, "./BaseTexture": 112, "./TextureUvs": 117, "./VideoBaseTexture": 118, eventemitter3: 3 }], 116: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          g = a("../math/Matrix"),
          h = d(g),
          i = new h.default(),
          j = function () {
        function a(b, c) {
          e(this, a), this._texture = b, this.mapCoord = new h.default(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._lastTextureID = -1, this.clampOffset = 0, this.clampMargin = "undefined" == typeof c ? .5 : c;
        }return a.prototype.multiplyUvs = function (a, b) {
          void 0 === b && (b = a);for (var c = this.mapCoord, d = 0; d < a.length; d += 2) {
            var e = a[d],
                f = a[d + 1];b[d] = e * c.a + f * c.c + c.tx, b[d + 1] = e * c.b + f * c.d + c.ty;
          }return b;
        }, a.prototype.update = function (a) {
          var b = this._texture;if (!b || !b.valid) return !1;if (!a && this._lastTextureID === b._updateID) return !1;this._lastTextureID = b._updateID;var c = b._uvs;this.mapCoord.set(c.x1 - c.x0, c.y1 - c.y0, c.x3 - c.x0, c.y3 - c.y0, c.x0, c.y0);var d = b.orig,
              e = b.trim;e && (i.set(d.width / e.width, 0, 0, d.height / e.height, -e.x / e.width, -e.y / e.height), this.mapCoord.append(i));var f = b.baseTexture,
              g = this.uClampFrame,
              h = this.clampMargin / f.resolution,
              j = this.clampOffset;return g[0] = (b._frame.x + h + j) / f.width, g[1] = (b._frame.y + h + j) / f.height, g[2] = (b._frame.x + b._frame.width - h + j) / f.width, g[3] = (b._frame.y + b._frame.height - h + j) / f.height, this.uClampOffset[0] = j / f.realWidth, this.uClampOffset[1] = j / f.realHeight, !0;
        }, f(a, [{ key: "texture", get: function get() {
            return this._texture;
          }, set: function set(a) {
            this._texture = a, this._lastTextureID = -1;
          } }]), a;
      }();c.default = j;
    }, { "../math/Matrix": 67 }], 117: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("../math/GroupD8"),
          g = d(f),
          h = function () {
        function a() {
          e(this, a), this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsUint32 = new Uint32Array(4);
        }return a.prototype.set = function (a, b, c) {
          var d = b.width,
              e = b.height;if (c) {
            var f = a.width / 2 / d,
                h = a.height / 2 / e,
                i = a.x / d + f,
                j = a.y / e + h;c = g.default.add(c, g.default.NW), this.x0 = i + f * g.default.uX(c), this.y0 = j + h * g.default.uY(c), c = g.default.add(c, 2), this.x1 = i + f * g.default.uX(c), this.y1 = j + h * g.default.uY(c), c = g.default.add(c, 2), this.x2 = i + f * g.default.uX(c), this.y2 = j + h * g.default.uY(c), c = g.default.add(c, 2), this.x3 = i + f * g.default.uX(c), this.y3 = j + h * g.default.uY(c);
          } else this.x0 = a.x / d, this.y0 = a.y / e, this.x1 = (a.x + a.width) / d, this.y1 = a.y / e, this.x2 = (a.x + a.width) / d, this.y2 = (a.y + a.height) / e, this.x3 = a.x / d, this.y3 = (a.y + a.height) / e;this.uvsUint32[0] = (65535 * this.y0 & 65535) << 16 | 65535 * this.x0 & 65535, this.uvsUint32[1] = (65535 * this.y1 & 65535) << 16 | 65535 * this.x1 & 65535, this.uvsUint32[2] = (65535 * this.y2 & 65535) << 16 | 65535 * this.x2 & 65535, this.uvsUint32[3] = (65535 * this.y3 & 65535) << 16 | 65535 * this.x3 & 65535;
        }, a;
      }();c.default = h;
    }, { "../math/GroupD8": 66 }], 118: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }function h(a, b) {
        b || (b = "video/" + a.substr(a.lastIndexOf(".") + 1));var c = document.createElement("source");return c.src = a, c.type = b, c;
      }c.__esModule = !0;var i = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          j = a("./BaseTexture"),
          k = d(j),
          l = a("../utils"),
          m = a("../ticker"),
          n = a("../const"),
          o = a("../utils/determineCrossOrigin"),
          p = d(o),
          q = function (a) {
        function b(c, d) {
          if (e(this, b), !c) throw new Error("No video source element specified.");(c.readyState === c.HAVE_ENOUGH_DATA || c.readyState === c.HAVE_FUTURE_DATA) && c.width && c.height && (c.complete = !0);var g = f(this, a.call(this, c, d));return g.width = c.videoWidth, g.height = c.videoHeight, g._autoUpdate = !0, g._isAutoUpdating = !1, g.autoPlay = !0, g.update = g.update.bind(g), g._onCanPlay = g._onCanPlay.bind(g), c.addEventListener("play", g._onPlayStart.bind(g)), c.addEventListener("pause", g._onPlayStop.bind(g)), g.hasLoaded = !1, g.__loaded = !1, g._isSourceReady() ? g._onCanPlay() : (c.addEventListener("canplay", g._onCanPlay), c.addEventListener("canplaythrough", g._onCanPlay)), g;
        }return g(b, a), b.prototype._isSourcePlaying = function () {
          var a = this.source;return a.currentTime > 0 && a.paused === !1 && a.ended === !1 && a.readyState > 2;
        }, b.prototype._isSourceReady = function () {
          return 3 === this.source.readyState || 4 === this.source.readyState;
        }, b.prototype._onPlayStart = function () {
          this.hasLoaded || this._onCanPlay(), !this._isAutoUpdating && this.autoUpdate && (m.shared.add(this.update, this, n.UPDATE_PRIORITY.HIGH), this._isAutoUpdating = !0);
        }, b.prototype._onPlayStop = function () {
          this._isAutoUpdating && (m.shared.remove(this.update, this), this._isAutoUpdating = !1);
        }, b.prototype._onCanPlay = function () {
          this.hasLoaded = !0, this.source && (this.source.removeEventListener("canplay", this._onCanPlay), this.source.removeEventListener("canplaythrough", this._onCanPlay), this.width = this.source.videoWidth, this.height = this.source.videoHeight, this.__loaded || (this.__loaded = !0, this.emit("loaded", this)), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.source.play());
        }, b.prototype.destroy = function () {
          this._isAutoUpdating && m.shared.remove(this.update, this), this.source && this.source._pixiId && (k.default.removeFromCache(this.source._pixiId), delete this.source._pixiId, this.source.pause(), this.source.src = "", this.source.load()), a.prototype.destroy.call(this);
        }, b.fromVideo = function (a, c) {
          a._pixiId || (a._pixiId = "video_" + (0, l.uid)());var d = l.BaseTextureCache[a._pixiId];return d || (d = new b(a, c), k.default.addToCache(d, a._pixiId)), d;
        }, b.fromUrl = function (a, c, d) {
          var e = document.createElement("video");e.setAttribute("webkit-playsinline", ""), e.setAttribute("playsinline", "");var f = Array.isArray(a) ? a[0].src || a[0] : a.src || a;if (void 0 === d && 0 !== f.indexOf("data:") ? e.crossOrigin = (0, p.default)(f) : d && (e.crossOrigin = "string" == typeof d ? d : "anonymous"), Array.isArray(a)) for (var g = 0; g < a.length; ++g) {
            e.appendChild(h(a[g].src || a[g], a[g].mime));
          } else e.appendChild(h(f, a.mime));return e.load(), b.fromVideo(e, c);
        }, i(b, [{ key: "autoUpdate", get: function get() {
            return this._autoUpdate;
          }, set: function set(a) {
            a !== this._autoUpdate && (this._autoUpdate = a, !this._autoUpdate && this._isAutoUpdating ? (m.shared.remove(this.update, this), this._isAutoUpdating = !1) : this._autoUpdate && !this._isAutoUpdating && (m.shared.add(this.update, this, n.UPDATE_PRIORITY.HIGH), this._isAutoUpdating = !0));
          } }]), b;
      }(k.default);c.default = q, q.fromUrls = q.fromUrl;
    }, { "../const": 46, "../ticker": 121, "../utils": 125, "../utils/determineCrossOrigin": 124, "./BaseTexture": 112 }], 119: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          g = a("../settings"),
          h = d(g),
          i = a("../const"),
          j = a("./TickerListener"),
          k = d(j),
          l = function () {
        function a() {
          var b = this;e(this, a), this._head = new k.default(null, null, 1 / 0), this._requestId = null, this._maxElapsedMS = 100, this.autoStart = !1, this.deltaTime = 1, this.elapsedMS = 1 / h.default.TARGET_FPMS, this.lastTime = -1, this.speed = 1, this.started = !1, this._tick = function (a) {
            b._requestId = null, b.started && (b.update(a), b.started && null === b._requestId && b._head.next && (b._requestId = requestAnimationFrame(b._tick)));
          };
        }return a.prototype._requestIfNeeded = function () {
          null === this._requestId && this._head.next && (this.lastTime = performance.now(), this._requestId = requestAnimationFrame(this._tick));
        }, a.prototype._cancelIfNeeded = function () {
          null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null);
        }, a.prototype._startIfPossible = function () {
          this.started ? this._requestIfNeeded() : this.autoStart && this.start();
        }, a.prototype.add = function (a, b) {
          var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i.UPDATE_PRIORITY.NORMAL;return this._addListener(new k.default(a, b, c));
        }, a.prototype.addOnce = function (a, b) {
          var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i.UPDATE_PRIORITY.NORMAL;return this._addListener(new k.default(a, b, c, !0));
        }, a.prototype._addListener = function (a) {
          var b = this._head.next,
              c = this._head;if (b) {
            for (; b;) {
              if (a.priority > b.priority) {
                a.connect(c);break;
              }c = b, b = b.next;
            }a.previous || a.connect(c);
          } else a.connect(c);return this._startIfPossible(), this;
        }, a.prototype.remove = function (a, b) {
          for (var c = this._head.next; c;) {
            c = c.match(a, b) ? c.destroy() : c.next;
          }return this._head.next || this._cancelIfNeeded(), this;
        }, a.prototype.start = function () {
          this.started || (this.started = !0, this._requestIfNeeded());
        }, a.prototype.stop = function () {
          this.started && (this.started = !1, this._cancelIfNeeded());
        }, a.prototype.destroy = function () {
          this.stop();for (var a = this._head.next; a;) {
            a = a.destroy(!0);
          }this._head.destroy(), this._head = null;
        }, a.prototype.update = function () {
          var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : performance.now(),
              b = void 0;if (a > this.lastTime) {
            b = this.elapsedMS = a - this.lastTime, b > this._maxElapsedMS && (b = this._maxElapsedMS), this.deltaTime = b * h.default.TARGET_FPMS * this.speed;for (var c = this._head, d = c.next; d;) {
              d = d.emit(this.deltaTime);
            }c.next || this._cancelIfNeeded();
          } else this.deltaTime = this.elapsedMS = 0;this.lastTime = a;
        }, f(a, [{ key: "FPS", get: function get() {
            return 1e3 / this.elapsedMS;
          } }, { key: "minFPS", get: function get() {
            return 1e3 / this._maxElapsedMS;
          }, set: function set(a) {
            var b = Math.min(Math.max(0, a) / 1e3, h.default.TARGET_FPMS);this._maxElapsedMS = 1 / b;
          } }]), a;
      }();c.default = l;
    }, { "../const": 46, "../settings": 101, "./TickerListener": 120 }], 120: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(b) {
          var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
              e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              f = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];d(this, a), this.fn = b, this.context = c, this.priority = e, this.once = f, this.next = null, this.previous = null, this._destroyed = !1;
        }return a.prototype.match = function (a, b) {
          return b = b || null, this.fn === a && this.context === b;
        }, a.prototype.emit = function (a) {
          this.fn && (this.context ? this.fn.call(this.context, a) : this.fn(a));var b = this.next;return this.once && this.destroy(!0), this._destroyed && (this.next = null), b;
        }, a.prototype.connect = function (a) {
          this.previous = a, a.next && (a.next.previous = this), this.next = a.next, a.next = this;
        }, a.prototype.destroy = function () {
          var a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);var b = this.previous;return this.next = a ? null : b, this.previous = null, b;
        }, a;
      }();c.default = e;
    }, {}], 121: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0, c.Ticker = c.shared = void 0;var e = a("./Ticker"),
          f = d(e),
          g = new f.default();g.autoStart = !0, g.destroy = function () {}, c.shared = g, c.Ticker = f.default;
    }, { "./Ticker": 119 }], 122: [function (a, b, c) {
      "use strict";
      function d() {
        var a = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);return !a;
      }c.__esModule = !0, c.default = d;
    }, {}], 123: [function (a, b, c) {
      "use strict";
      function d(a) {
        for (var b = 6 * a, c = new Uint16Array(b), d = 0, e = 0; d < b; d += 6, e += 4) {
          c[d + 0] = e + 0, c[d + 1] = e + 1, c[d + 2] = e + 2, c[d + 3] = e + 0, c[d + 4] = e + 2, c[d + 5] = e + 3;
        }return c;
      }c.__esModule = !0, c.default = d;
    }, {}], 124: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location;if (0 === a.indexOf("data:")) return "";b = b || window.location, h || (h = document.createElement("a")), h.href = a, a = g.default.parse(h.href);var c = !a.port && "" === b.port || a.port === b.port;return a.hostname === b.hostname && c && a.protocol === b.protocol ? "" : "anonymous";
      }c.__esModule = !0, c.default = e;var f = a("url"),
          g = d(f),
          h = void 0;
    }, { url: 29 }], 125: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a) {
        return a && a.__esModule ? a : { default: a };
      }function f() {
        return ++M;
      }function g(a, b) {
        return b = b || [], b[0] = (a >> 16 & 255) / 255, b[1] = (a >> 8 & 255) / 255, b[2] = (255 & a) / 255, b;
      }function h(a) {
        return a = a.toString(16), a = "000000".substr(0, 6 - a.length) + a, "#" + a;
      }function i(a) {
        return (255 * a[0] << 16) + (255 * a[1] << 8) + (255 * a[2] | 0);
      }function j(a, b) {
        var c = z.default.RETINA_PREFIX.exec(a);return c ? parseFloat(c[1]) : void 0 !== b ? b : 1;
      }function k(a) {
        var b = x.DATA_URI.exec(a);if (b) return { mediaType: b[1] ? b[1].toLowerCase() : void 0, subType: b[2] ? b[2].toLowerCase() : void 0, encoding: b[3] ? b[3].toLowerCase() : void 0, data: b[4] };
      }function l(a) {
        var b = x.URL_FILE_EXTENSION.exec(a);if (b) return b[1].toLowerCase();
      }function m(a) {
        var b = x.SVG_SIZE.exec(a),
            c = {};return b && (c[b[1]] = Math.round(parseFloat(b[3])), c[b[5]] = Math.round(parseFloat(b[7]))), c;
      }function n() {
        N = !0;
      }function o(a) {
        if (!N) {
          if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
            var b = ["\n %c %c %c PixiJS " + x.VERSION + " - ✰ " + a + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];window.console.log.apply(console, b);
          } else window.console && window.console.log("PixiJS " + x.VERSION + " - " + a + " - http://www.pixijs.com/");N = !0;
        }
      }function p() {
        var a = { stencil: !0, failIfMajorPerformanceCaveat: !0 };try {
          if (!window.WebGLRenderingContext) return !1;var b = document.createElement("canvas"),
              c = b.getContext("webgl", a) || b.getContext("experimental-webgl", a),
              d = !(!c || !c.getContextAttributes().stencil);if (c) {
            var e = c.getExtension("WEBGL_lose_context");e && e.loseContext();
          }return c = null, d;
        } catch (a) {
          return !1;
        }
      }function q(a) {
        return 0 === a ? 0 : a < 0 ? -1 : 1;
      }function r() {
        var a = void 0;for (a in O) {
          O[a].destroy();
        }for (a in P) {
          P[a].destroy();
        }
      }function s() {
        var a = void 0;for (a in O) {
          delete O[a];
        }for (a in P) {
          delete P[a];
        }
      }function t(a, b) {
        return Q[b ? 1 : 0][a];
      }function u(a, b) {
        if (1 === b) return (255 * b << 24) + a;if (0 === b) return 0;var c = a >> 16 & 255,
            d = a >> 8 & 255,
            e = 255 & a;return c = c * b + .5 | 0, d = d * b + .5 | 0, e = e * b + .5 | 0, (255 * b << 24) + (c << 16) + (d << 8) + e;
      }function v(a, b, c, d) {
        return c = c || new Float32Array(4), d || void 0 === d ? (c[0] = a[0] * b, c[1] = a[1] * b, c[2] = a[2] * b) : (c[0] = a[0], c[1] = a[1], c[2] = a[2]), c[3] = b, c;
      }function w(a, b, c, d) {
        return c = c || new Float32Array(4), c[0] = (a >> 16 & 255) / 255, c[1] = (a >> 8 & 255) / 255, c[2] = (255 & a) / 255, (d || void 0 === d) && (c[0] *= b, c[1] *= b, c[2] *= b), c[3] = b, c;
      }c.__esModule = !0, c.premultiplyBlendMode = c.BaseTextureCache = c.TextureCache = c.mixins = c.pluginTarget = c.EventEmitter = c.removeItems = c.isMobile = void 0, c.uid = f, c.hex2rgb = g, c.hex2string = h, c.rgb2hex = i, c.getResolutionOfUrl = j, c.decomposeDataUri = k, c.getUrlFileExtension = l, c.getSvgSize = m, c.skipHello = n, c.sayHello = o, c.isWebGLSupported = p, c.sign = q, c.destroyTextureCache = r, c.clearTextureCache = s, c.correctBlendMode = t, c.premultiplyTint = u, c.premultiplyRgba = v, c.premultiplyTintToRgba = w;var x = a("../const"),
          y = a("../settings"),
          z = e(y),
          A = a("eventemitter3"),
          B = e(A),
          C = a("./pluginTarget"),
          D = e(C),
          E = a("./mixin"),
          F = d(E),
          G = a("ismobilejs"),
          H = d(G),
          I = a("remove-array-items"),
          J = e(I),
          K = a("./mapPremultipliedBlendModes"),
          L = e(K),
          M = 0,
          N = !1;c.isMobile = H, c.removeItems = J.default, c.EventEmitter = B.default, c.pluginTarget = D.default, c.mixins = F;var O = c.TextureCache = Object.create(null),
          P = c.BaseTextureCache = Object.create(null),
          Q = c.premultiplyBlendMode = (0, L.default)();
    }, { "../const": 46, "../settings": 101, "./mapPremultipliedBlendModes": 126, "./mixin": 128, "./pluginTarget": 129, eventemitter3: 3, ismobilejs: 4, "remove-array-items": 31 }], 126: [function (a, b, c) {
      "use strict";
      function d() {
        for (var a = [], b = [], c = 0; c < 32; c++) {
          a[c] = c, b[c] = c;
        }a[e.BLEND_MODES.NORMAL_NPM] = e.BLEND_MODES.NORMAL, a[e.BLEND_MODES.ADD_NPM] = e.BLEND_MODES.ADD, a[e.BLEND_MODES.SCREEN_NPM] = e.BLEND_MODES.SCREEN, b[e.BLEND_MODES.NORMAL] = e.BLEND_MODES.NORMAL_NPM, b[e.BLEND_MODES.ADD] = e.BLEND_MODES.ADD_NPM, b[e.BLEND_MODES.SCREEN] = e.BLEND_MODES.SCREEN_NPM;var d = [];return d.push(b), d.push(a), d;
      }c.__esModule = !0, c.default = d;var e = a("../const");
    }, { "../const": 46 }], 127: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        return g.default.tablet || g.default.phone ? 4 : a;
      }c.__esModule = !0, c.default = e;var f = a("ismobilejs"),
          g = d(f);
    }, { ismobilejs: 4 }], 128: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (a && b) for (var c = Object.keys(b), d = 0; d < c.length; ++d) {
          var e = c[d];Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(b, e));
        }
      }function e(a, b) {
        g.push(a, b);
      }function f() {
        for (var a = 0; a < g.length; a += 2) {
          d(g[a], g[a + 1]);
        }g.length = 0;
      }c.__esModule = !0, c.mixin = d, c.delayMixin = e, c.performMixins = f;var g = [];
    }, {}], 129: [function (a, b, c) {
      "use strict";
      function d(a) {
        a.__plugins = {}, a.registerPlugin = function (b, c) {
          a.__plugins[b] = c;
        }, a.prototype.initPlugins = function () {
          this.plugins = this.plugins || {};for (var b in a.__plugins) {
            this.plugins[b] = new a.__plugins[b](this);
          }
        }, a.prototype.destroyPlugins = function () {
          for (var a in this.plugins) {
            this.plugins[a].destroy(), this.plugins[a] = null;
          }this.plugins = null;
        };
      }c.__esModule = !0, c.default = { mixin: function mixin(a) {
          d(a);
        } };
    }, {}], 130: [function (a, b, c) {
      "use strict";
      function d(a) {
        var b = a.width,
            c = a.height,
            d = a.getContext("2d"),
            e = d.getImageData(0, 0, b, c),
            f = e.data,
            g = f.length,
            h = { top: null, left: null, right: null, bottom: null },
            i = void 0,
            j = void 0,
            k = void 0;for (i = 0; i < g; i += 4) {
          0 !== f[i + 3] && (j = i / 4 % b, k = ~~(i / 4 / b), null === h.top && (h.top = k), null === h.left ? h.left = j : j < h.left && (h.left = j), null === h.right ? h.right = j + 1 : h.right < j && (h.right = j + 1), null === h.bottom ? h.bottom = k : h.bottom < k && (h.bottom = k));
        }b = h.right - h.left, c = h.bottom - h.top + 1;var l = d.getImageData(h.left, h.top, b, c);return { height: c, width: b, data: l };
      }c.__esModule = !0, c.default = d;
    }, {}], 131: [function (a, b, c) {
      "use strict";
      function d(a) {
        var b = new Error().stack;"undefined" == typeof b ? console.warn("Deprecation Warning: ", a) : (b = b.split("\n").splice(3).join("\n"), console.groupCollapsed ? (console.groupCollapsed("%cDeprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", a), console.warn(b), console.groupEnd()) : (console.warn("Deprecation Warning: ", a), console.warn(b)));
      }function e(a) {
        var b = a.mesh,
            c = a.particles,
            e = a.extras,
            f = a.filters,
            g = a.prepare,
            h = a.loaders,
            i = a.interaction;Object.defineProperties(a, { SpriteBatch: { get: function get() {
              throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.");
            } }, AssetLoader: { get: function get() {
              throw new ReferenceError("The loader system was overhauled in PixiJS v3, please see the new PIXI.loaders.Loader class.");
            } }, Stage: { get: function get() {
              return d("You do not need to use a PIXI Stage any more, you can simply render any container."), a.Container;
            } }, DisplayObjectContainer: { get: function get() {
              return d("DisplayObjectContainer has been shortened to Container, please use Container from now on."), a.Container;
            } }, Strip: { get: function get() {
              return d("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."), b.Mesh;
            } }, Rope: { get: function get() {
              return d("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."), b.Rope;
            } }, ParticleContainer: { get: function get() {
              return d("The ParticleContainer class has been moved to particles.ParticleContainer, please use particles.ParticleContainer from now on."), c.ParticleContainer;
            } }, MovieClip: { get: function get() {
              return d("The MovieClip class has been moved to extras.AnimatedSprite, please use extras.AnimatedSprite."), e.AnimatedSprite;
            } }, TilingSprite: { get: function get() {
              return d("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."), e.TilingSprite;
            } }, BitmapText: { get: function get() {
              return d("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."), e.BitmapText;
            } }, blendModes: { get: function get() {
              return d("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."), a.BLEND_MODES;
            } }, scaleModes: { get: function get() {
              return d("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."), a.SCALE_MODES;
            } }, BaseTextureCache: { get: function get() {
              return d("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."), a.utils.BaseTextureCache;
            } }, TextureCache: { get: function get() {
              return d("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."), a.utils.TextureCache;
            } }, math: { get: function get() {
              return d("The math namespace is deprecated, please access members already accessible on PIXI."), a;
            } }, AbstractFilter: { get: function get() {
              return d("AstractFilter has been renamed to Filter, please use PIXI.Filter"), a.Filter;
            } }, TransformManual: { get: function get() {
              return d("TransformManual has been renamed to TransformBase, please update your pixi-spine"), a.TransformBase;
            } }, TARGET_FPMS: { get: function get() {
              return d("PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS"), a.settings.TARGET_FPMS;
            }, set: function set(b) {
              d("PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS"), a.settings.TARGET_FPMS = b;
            } }, FILTER_RESOLUTION: { get: function get() {
              return d("PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION"), a.settings.FILTER_RESOLUTION;
            }, set: function set(b) {
              d("PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION"), a.settings.FILTER_RESOLUTION = b;
            } }, RESOLUTION: { get: function get() {
              return d("PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION"), a.settings.RESOLUTION;
            }, set: function set(b) {
              d("PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION"), a.settings.RESOLUTION = b;
            } }, MIPMAP_TEXTURES: { get: function get() {
              return d("PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES"), a.settings.MIPMAP_TEXTURES;
            }, set: function set(b) {
              d("PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES"), a.settings.MIPMAP_TEXTURES = b;
            } }, SPRITE_BATCH_SIZE: { get: function get() {
              return d("PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE"), a.settings.SPRITE_BATCH_SIZE;
            }, set: function set(b) {
              d("PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE"), a.settings.SPRITE_BATCH_SIZE = b;
            } }, SPRITE_MAX_TEXTURES: { get: function get() {
              return d("PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES"), a.settings.SPRITE_MAX_TEXTURES;
            }, set: function set(b) {
              d("PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES"), a.settings.SPRITE_MAX_TEXTURES = b;
            } }, RETINA_PREFIX: { get: function get() {
              return d("PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX"), a.settings.RETINA_PREFIX;
            }, set: function set(b) {
              d("PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX"), a.settings.RETINA_PREFIX = b;
            } }, DEFAULT_RENDER_OPTIONS: { get: function get() {
              return d("PIXI.DEFAULT_RENDER_OPTIONS has been deprecated, please use PIXI.settings.DEFAULT_RENDER_OPTIONS"), a.settings.RENDER_OPTIONS;
            } } });for (var j = [{ parent: "TRANSFORM_MODE", target: "TRANSFORM_MODE" }, { parent: "GC_MODES", target: "GC_MODE" }, { parent: "WRAP_MODES", target: "WRAP_MODE" }, { parent: "SCALE_MODES", target: "SCALE_MODE" }, { parent: "PRECISION", target: "PRECISION_FRAGMENT" }], k = function k(b) {
          var c = j[b];Object.defineProperty(a[c.parent], "DEFAULT", { get: function get() {
              return d("PIXI." + c.parent + ".DEFAULT has been deprecated, please use PIXI.settings." + c.target), a.settings[c.target];
            }, set: function set(b) {
              d("PIXI." + c.parent + ".DEFAULT has been deprecated, please use PIXI.settings." + c.target), a.settings[c.target] = b;
            } });
        }, l = 0; l < j.length; l++) {
          k(l);
        }Object.defineProperties(a.settings, { PRECISION: { get: function get() {
              return d("PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT"), a.settings.PRECISION_FRAGMENT;
            }, set: function set(b) {
              d("PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT"), a.settings.PRECISION_FRAGMENT = b;
            } } }), e.AnimatedSprite && Object.defineProperties(e, { MovieClip: { get: function get() {
              return d("The MovieClip class has been renamed to AnimatedSprite, please use AnimatedSprite from now on."), e.AnimatedSprite;
            } } }), e && Object.defineProperties(e, { TextureTransform: { get: function get() {
              return d("The TextureTransform class has been renamed to TextureMatrix, please use PIXI.TextureMatrix from now on."), a.TextureMatrix;
            } } }), a.DisplayObject.prototype.generateTexture = function (a, b, c) {
          return d("generateTexture has moved to the renderer, please use renderer.generateTexture(displayObject)"), a.generateTexture(this, b, c);
        }, a.Graphics.prototype.generateTexture = function (a, b) {
          return d("graphics generate texture has moved to the renderer. Or to render a graphics to a texture using canvas please use generateCanvasTexture"), this.generateCanvasTexture(a, b);
        }, a.GroupD8.isSwapWidthHeight = function (b) {
          return d("GroupD8.isSwapWidthHeight was renamed to GroupD8.isVertical"), a.GroupD8.isVertical(b);
        }, a.RenderTexture.prototype.render = function (a, b, c, e) {
          this.legacyRenderer.render(a, this, c, b, !e), d("RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)");
        }, a.RenderTexture.prototype.getImage = function (a) {
          return d("RenderTexture.getImage is now deprecated, please use renderer.extract.image(target)"), this.legacyRenderer.extract.image(a);
        }, a.RenderTexture.prototype.getBase64 = function (a) {
          return d("RenderTexture.getBase64 is now deprecated, please use renderer.extract.base64(target)"), this.legacyRenderer.extract.base64(a);
        }, a.RenderTexture.prototype.getCanvas = function (a) {
          return d("RenderTexture.getCanvas is now deprecated, please use renderer.extract.canvas(target)"), this.legacyRenderer.extract.canvas(a);
        }, a.RenderTexture.prototype.getPixels = function (a) {
          return d("RenderTexture.getPixels is now deprecated, please use renderer.extract.pixels(target)"), this.legacyRenderer.pixels(a);
        }, a.Sprite.prototype.setTexture = function (a) {
          this.texture = a, d("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;");
        }, e.BitmapText && (e.BitmapText.prototype.setText = function (a) {
          this.text = a, d("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';");
        }), a.Text.prototype.setText = function (a) {
          this.text = a, d("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';");
        }, a.Text.calculateFontProperties = function (b) {
          return d("Text.calculateFontProperties is now deprecated, please use the TextMetrics.measureFont"), a.TextMetrics.measureFont(b);
        }, Object.defineProperties(a.Text, { fontPropertiesCache: { get: function get() {
              return d("Text.fontPropertiesCache is deprecated"), a.TextMetrics._fonts;
            } }, fontPropertiesCanvas: { get: function get() {
              return d("Text.fontPropertiesCanvas is deprecated"), a.TextMetrics._canvas;
            } }, fontPropertiesContext: { get: function get() {
              return d("Text.fontPropertiesContext is deprecated"), a.TextMetrics._context;
            } } }), a.Text.prototype.setStyle = function (a) {
          this.style = a, d("setStyle is now deprecated, please use the style property, e.g : myText.style = style;");
        }, a.Text.prototype.determineFontProperties = function (b) {
          return d("determineFontProperties is now deprecated, please use TextMetrics.measureFont method"), a.TextMetrics.measureFont(b);
        }, a.Text.getFontStyle = function (b) {
          return d("getFontStyle is now deprecated, please use TextStyle.toFontString() instead"), b = b || {}, b instanceof a.TextStyle || (b = new a.TextStyle(b)), b.toFontString();
        }, Object.defineProperties(a.TextStyle.prototype, { font: { get: function get() {
              d("text style property 'font' is now deprecated, please use the 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant' and 'fontWeight' properties from now on");var a = "number" == typeof this._fontSize ? this._fontSize + "px" : this._fontSize;return this._fontStyle + " " + this._fontVariant + " " + this._fontWeight + " " + a + " " + this._fontFamily;
            }, set: function set(a) {
              d("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on"), a.indexOf("italic") > 1 ? this._fontStyle = "italic" : a.indexOf("oblique") > -1 ? this._fontStyle = "oblique" : this._fontStyle = "normal", a.indexOf("small-caps") > -1 ? this._fontVariant = "small-caps" : this._fontVariant = "normal";var b = a.split(" "),
                  c = -1;this._fontSize = 26;for (var e = 0; e < b.length; ++e) {
                if (b[e].match(/(px|pt|em|%)/)) {
                  c = e, this._fontSize = b[e];break;
                }
              }this._fontWeight = "normal";for (var f = 0; f < c; ++f) {
                if (b[f].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)) {
                  this._fontWeight = b[f];break;
                }
              }if (c > -1 && c < b.length - 1) {
                this._fontFamily = "";for (var g = c + 1; g < b.length; ++g) {
                  this._fontFamily += b[g] + " ";
                }this._fontFamily = this._fontFamily.slice(0, -1);
              } else this._fontFamily = "Arial";this.styleID++;
            } } }), a.Texture.prototype.setFrame = function (a) {
          this.frame = a, d("setFrame is now deprecated, please use the frame property, e.g: myTexture.frame = frame;");
        }, a.Texture.addTextureToCache = function (b, c) {
          a.Texture.addToCache(b, c), d("Texture.addTextureToCache is deprecated, please use Texture.addToCache from now on.");
        }, a.Texture.removeTextureFromCache = function (b) {
          return d("Texture.removeTextureFromCache is deprecated, please use Texture.removeFromCache from now on. Be aware that Texture.removeFromCache does not automatically its BaseTexture from the BaseTextureCache. For that, use BaseTexture.removeFromCache"), a.BaseTexture.removeFromCache(b), a.Texture.removeFromCache(b);
        }, Object.defineProperties(f, { AbstractFilter: { get: function get() {
              return d("AstractFilter has been renamed to Filter, please use PIXI.Filter"), a.AbstractFilter;
            } }, SpriteMaskFilter: { get: function get() {
              return d("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."), a.SpriteMaskFilter;
            } }, VoidFilter: { get: function get() {
              return d("VoidFilter has been renamed to AlphaFilter, please use PIXI.filters.AlphaFilter"), f.AlphaFilter;
            } } }), a.utils.uuid = function () {
          return d("utils.uuid() is deprecated, please use utils.uid() from now on."), a.utils.uid();
        }, a.utils.canUseNewCanvasBlendModes = function () {
          return d("utils.canUseNewCanvasBlendModes() is deprecated, please use CanvasTinter.canUseMultiply from now on"), a.CanvasTinter.canUseMultiply;
        };var m = !0;if (Object.defineProperty(a.utils, "_saidHello", { set: function set(a) {
            a && (d("PIXI.utils._saidHello is deprecated, please use PIXI.utils.skipHello()"), this.skipHello()), m = a;
          }, get: function get() {
            return m;
          } }), g.BasePrepare && (g.BasePrepare.prototype.register = function (a, b) {
          return d("renderer.plugins.prepare.register is now deprecated, please use renderer.plugins.prepare.registerFindHook & renderer.plugins.prepare.registerUploadHook"), a && this.registerFindHook(a), b && this.registerUploadHook(b), this;
        }), g.canvas && Object.defineProperty(g.canvas, "UPLOADS_PER_FRAME", { set: function set() {
            d("PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please set renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer");
          }, get: function get() {
            return d("PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please use renderer.plugins.prepare.limiter"), NaN;
          } }), g.webgl && Object.defineProperty(g.webgl, "UPLOADS_PER_FRAME", { set: function set() {
            d("PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please set renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer");
          }, get: function get() {
            return d("PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please use renderer.plugins.prepare.limiter"), NaN;
          } }), h.Loader) {
          var n = h.Resource,
              o = h.Loader;Object.defineProperties(n.prototype, { isJson: { get: function get() {
                return d("The isJson property is deprecated, please use `resource.type === Resource.TYPE.JSON`."), this.type === n.TYPE.JSON;
              } }, isXml: { get: function get() {
                return d("The isXml property is deprecated, please use `resource.type === Resource.TYPE.XML`."), this.type === n.TYPE.XML;
              } }, isImage: { get: function get() {
                return d("The isImage property is deprecated, please use `resource.type === Resource.TYPE.IMAGE`."), this.type === n.TYPE.IMAGE;
              } }, isAudio: { get: function get() {
                return d("The isAudio property is deprecated, please use `resource.type === Resource.TYPE.AUDIO`."), this.type === n.TYPE.AUDIO;
              } }, isVideo: { get: function get() {
                return d("The isVideo property is deprecated, please use `resource.type === Resource.TYPE.VIDEO`."), this.type === n.TYPE.VIDEO;
              } } }), Object.defineProperties(o.prototype, { before: { get: function get() {
                return d("The before() method is deprecated, please use pre()."), this.pre;
              } }, after: { get: function get() {
                return d("The after() method is deprecated, please use use()."), this.use;
              } } });
        }i.interactiveTarget && Object.defineProperty(i.interactiveTarget, "defaultCursor", { set: function set(a) {
            d("Property defaultCursor has been replaced with 'cursor'. "), this.cursor = a;
          }, get: function get() {
            return d("Property defaultCursor has been replaced with 'cursor'. "), this.cursor;
          } }), i.InteractionManager && (Object.defineProperty(i.InteractionManager, "defaultCursorStyle", { set: function set(a) {
            d("Property defaultCursorStyle has been replaced with 'cursorStyles.default'. "), this.cursorStyles.default = a;
          }, get: function get() {
            return d("Property defaultCursorStyle has been replaced with 'cursorStyles.default'. "), this.cursorStyles.default;
          } }), Object.defineProperty(i.InteractionManager, "currentCursorStyle", { set: function set(a) {
            d("Property currentCursorStyle has been removed.See the currentCursorMode property, which works differently."), this.currentCursorMode = a;
          }, get: function get() {
            return d("Property currentCursorStyle has been removed.See the currentCursorMode property, which works differently."), this.currentCursorMode;
          } }));
      }c.__esModule = !0, c.default = e;
    }, {}], 132: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("../../core"),
          g = d(f),
          h = new g.Rectangle(),
          i = function () {
        function a(b) {
          e(this, a), this.renderer = b, b.extract = this;
        }return a.prototype.image = function a(b) {
          var a = new Image();return a.src = this.base64(b), a;
        }, a.prototype.base64 = function (a) {
          return this.canvas(a).toDataURL();
        }, a.prototype.canvas = function (a) {
          var b = this.renderer,
              c = void 0,
              d = void 0,
              e = void 0,
              f = void 0;a && (f = a instanceof g.RenderTexture ? a : b.generateTexture(a)), f ? (c = f.baseTexture._canvasRenderTarget.context, d = f.baseTexture._canvasRenderTarget.resolution, e = f.frame) : (c = b.rootContext, e = h, e.width = this.renderer.width, e.height = this.renderer.height);var i = e.width * d,
              j = e.height * d,
              k = new g.CanvasRenderTarget(i, j),
              l = c.getImageData(e.x * d, e.y * d, i, j);return k.context.putImageData(l, 0, 0), k.canvas;
        }, a.prototype.pixels = function (a) {
          var b = this.renderer,
              c = void 0,
              d = void 0,
              e = void 0,
              f = void 0;return a && (f = a instanceof g.RenderTexture ? a : b.generateTexture(a)), f ? (c = f.baseTexture._canvasRenderTarget.context, d = f.baseTexture._canvasRenderTarget.resolution, e = f.frame) : (c = b.rootContext, e = h, e.width = b.width, e.height = b.height), c.getImageData(0, 0, e.width * d, e.height * d).data;
        }, a.prototype.destroy = function () {
          this.renderer.extract = null, this.renderer = null;
        }, a;
      }();c.default = i, g.CanvasRenderer.registerPlugin("extract", i);
    }, { "../../core": 65 }], 133: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0;var e = a("./webgl/WebGLExtract");Object.defineProperty(c, "webgl", { enumerable: !0, get: function get() {
          return d(e).default;
        } });var f = a("./canvas/CanvasExtract");Object.defineProperty(c, "canvas", { enumerable: !0, get: function get() {
          return d(f).default;
        } });
    }, { "./canvas/CanvasExtract": 132, "./webgl/WebGLExtract": 134 }], 134: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("../../core"),
          g = d(f),
          h = new g.Rectangle(),
          i = 4,
          j = function () {
        function a(b) {
          e(this, a), this.renderer = b, b.extract = this;
        }return a.prototype.image = function a(b) {
          var a = new Image();return a.src = this.base64(b), a;
        }, a.prototype.base64 = function (a) {
          return this.canvas(a).toDataURL();
        }, a.prototype.canvas = function (a) {
          var b = this.renderer,
              c = void 0,
              d = void 0,
              e = void 0,
              f = !1,
              j = void 0;a && (j = a instanceof g.RenderTexture ? a : this.renderer.generateTexture(a)), j ? (c = j.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID], d = c.resolution, e = j.frame, f = !1) : (c = this.renderer.rootRenderTarget, d = c.resolution, f = !0, e = h, e.width = c.size.width, e.height = c.size.height);var k = e.width * d,
              l = e.height * d,
              m = new g.CanvasRenderTarget(k, l);if (c) {
            b.bindRenderTarget(c);var n = new Uint8Array(i * k * l),
                o = b.gl;o.readPixels(e.x * d, e.y * d, k, l, o.RGBA, o.UNSIGNED_BYTE, n);var p = m.context.getImageData(0, 0, k, l);p.data.set(n), m.context.putImageData(p, 0, 0), f && (m.context.scale(1, -1), m.context.drawImage(m.canvas, 0, -l));
          }return m.canvas;
        }, a.prototype.pixels = function (a) {
          var b = this.renderer,
              c = void 0,
              d = void 0,
              e = void 0,
              f = void 0;a && (f = a instanceof g.RenderTexture ? a : this.renderer.generateTexture(a)), f ? (c = f.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID], d = c.resolution, e = f.frame) : (c = this.renderer.rootRenderTarget, d = c.resolution, e = h, e.width = c.size.width, e.height = c.size.height);var j = e.width * d,
              k = e.height * d,
              l = new Uint8Array(i * j * k);if (c) {
            b.bindRenderTarget(c);var m = b.gl;m.readPixels(e.x * d, e.y * d, j, k, m.RGBA, m.UNSIGNED_BYTE, l);
          }return l;
        }, a.prototype.destroy = function () {
          this.renderer.extract = null, this.renderer = null;
        }, a;
      }();c.default = j, g.WebGLRenderer.registerPlugin("extract", j);
    }, { "../../core": 65 }], 135: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../core"),
          j = d(i),
          k = function (a) {
        function b(c, d) {
          e(this, b);var g = f(this, a.call(this, c[0] instanceof j.Texture ? c[0] : c[0].texture));return g._textures = null, g._durations = null, g.textures = c, g._autoUpdate = d !== !1, g.animationSpeed = 1, g.loop = !0, g.onComplete = null, g.onFrameChange = null, g.onLoop = null, g._currentTime = 0, g.playing = !1, g;
        }return g(b, a), b.prototype.stop = function () {
          this.playing && (this.playing = !1, this._autoUpdate && j.ticker.shared.remove(this.update, this));
        }, b.prototype.play = function () {
          this.playing || (this.playing = !0, this._autoUpdate && j.ticker.shared.add(this.update, this, j.UPDATE_PRIORITY.HIGH));
        }, b.prototype.gotoAndStop = function (a) {
          this.stop();var b = this.currentFrame;this._currentTime = a, b !== this.currentFrame && this.updateTexture();
        }, b.prototype.gotoAndPlay = function (a) {
          var b = this.currentFrame;this._currentTime = a, b !== this.currentFrame && this.updateTexture(), this.play();
        }, b.prototype.update = function (a) {
          var b = this.animationSpeed * a,
              c = this.currentFrame;if (null !== this._durations) {
            var d = this._currentTime % 1 * this._durations[this.currentFrame];for (d += b / 60 * 1e3; d < 0;) {
              this._currentTime--, d += this._durations[this.currentFrame];
            }var e = Math.sign(this.animationSpeed * a);for (this._currentTime = Math.floor(this._currentTime); d >= this._durations[this.currentFrame];) {
              d -= this._durations[this.currentFrame] * e, this._currentTime += e;
            }this._currentTime += d / this._durations[this.currentFrame];
          } else this._currentTime += b;this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : c !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < c ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > c && this.onLoop()), this.updateTexture());
        }, b.prototype.updateTexture = function () {
          this._texture = this._textures[this.currentFrame], this._textureID = -1, this.cachedTint = 16777215, this.onFrameChange && this.onFrameChange(this.currentFrame);
        }, b.prototype.destroy = function (b) {
          this.stop(), a.prototype.destroy.call(this, b);
        }, b.fromFrames = function (a) {
          for (var c = [], d = 0; d < a.length; ++d) {
            c.push(j.Texture.fromFrame(a[d]));
          }return new b(c);
        }, b.fromImages = function (a) {
          for (var c = [], d = 0; d < a.length; ++d) {
            c.push(j.Texture.fromImage(a[d]));
          }return new b(c);
        }, h(b, [{ key: "totalFrames", get: function get() {
            return this._textures.length;
          } }, { key: "textures", get: function get() {
            return this._textures;
          }, set: function set(a) {
            if (a[0] instanceof j.Texture) this._textures = a, this._durations = null;else {
              this._textures = [], this._durations = [];for (var b = 0; b < a.length; b++) {
                this._textures.push(a[b].texture), this._durations.push(a[b].time);
              }
            }this.gotoAndStop(0), this.updateTexture();
          } }, { key: "currentFrame", get: function get() {
            var a = Math.floor(this._currentTime) % this._textures.length;return a < 0 && (a += this._textures.length), a;
          } }]), b;
      }(j.Sprite);c.default = k;
    }, { "../core": 65 }], 136: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var i = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          j = a("../core"),
          k = e(j),
          l = a("../core/math/ObservablePoint"),
          m = d(l),
          n = a("../core/utils"),
          o = a("../core/settings"),
          p = d(o),
          q = function (a) {
        function b(c) {
          var d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};f(this, b);var e = g(this, a.call(this));return e._textWidth = 0, e._textHeight = 0, e._glyphs = [], e._font = { tint: void 0 !== d.tint ? d.tint : 16777215, align: d.align || "left", name: null, size: 0 }, e.font = d.font, e._text = c, e._maxWidth = 0, e._maxLineHeight = 0, e._anchor = new m.default(function () {
            e.dirty = !0;
          }, e, 0, 0), e.dirty = !1, e.updateText(), e;
        }return h(b, a), b.prototype.updateText = function () {
          for (var a = b.fonts[this._font.name], c = this._font.size / a.size, d = new k.Point(), e = [], f = [], g = null, h = 0, i = 0, j = 0, l = -1, m = 0, n = 0, o = 0, p = 0; p < this.text.length; p++) {
            var q = this.text.charCodeAt(p);if (/(\s)/.test(this.text.charAt(p)) && (l = p, m = h), /(?:\r\n|\r|\n)/.test(this.text.charAt(p))) f.push(h), i = Math.max(i, h), j++, d.x = 0, d.y += a.lineHeight, g = null;else if (l !== -1 && this._maxWidth > 0 && d.x * c > this._maxWidth) k.utils.removeItems(e, l - n, p - l), p = l, l = -1, ++n, f.push(m), i = Math.max(i, m), j++, d.x = 0, d.y += a.lineHeight, g = null;else {
              var r = a.chars[q];r && (g && r.kerning[g] && (d.x += r.kerning[g]), e.push({ texture: r.texture, line: j, charCode: q, position: new k.Point(d.x + r.xOffset, d.y + r.yOffset) }), h = d.x + (r.texture.width + r.xOffset), d.x += r.xAdvance, o = Math.max(o, r.yOffset + r.texture.height), g = q);
            }
          }f.push(h), i = Math.max(i, h);for (var s = [], t = 0; t <= j; t++) {
            var u = 0;"right" === this._font.align ? u = i - f[t] : "center" === this._font.align && (u = (i - f[t]) / 2), s.push(u);
          }for (var v = e.length, w = this.tint, x = 0; x < v; x++) {
            var y = this._glyphs[x];y ? y.texture = e[x].texture : (y = new k.Sprite(e[x].texture), this._glyphs.push(y)), y.position.x = (e[x].position.x + s[e[x].line]) * c, y.position.y = e[x].position.y * c, y.scale.x = y.scale.y = c, y.tint = w, y.parent || this.addChild(y);
          }for (var z = v; z < this._glyphs.length; ++z) {
            this.removeChild(this._glyphs[z]);
          }if (this._textWidth = i * c, this._textHeight = (d.y + a.lineHeight) * c, 0 !== this.anchor.x || 0 !== this.anchor.y) for (var A = 0; A < v; A++) {
            this._glyphs[A].x -= this._textWidth * this.anchor.x, this._glyphs[A].y -= this._textHeight * this.anchor.y;
          }this._maxLineHeight = o * c;
        }, b.prototype.updateTransform = function () {
          this.validate(), this.containerUpdateTransform();
        }, b.prototype.getLocalBounds = function () {
          return this.validate(), a.prototype.getLocalBounds.call(this);
        }, b.prototype.validate = function () {
          this.dirty && (this.updateText(), this.dirty = !1);
        }, b.registerFont = function (a, c) {
          var d = {},
              e = a.getElementsByTagName("info")[0],
              f = a.getElementsByTagName("common")[0],
              g = a.getElementsByTagName("page")[0].getAttribute("file"),
              h = (0, n.getResolutionOfUrl)(g, p.default.RESOLUTION);d.font = e.getAttribute("face"), d.size = parseInt(e.getAttribute("size"), 10), d.lineHeight = parseInt(f.getAttribute("lineHeight"), 10) / h, d.chars = {};for (var i = a.getElementsByTagName("char"), j = 0; j < i.length; j++) {
            var l = i[j],
                m = parseInt(l.getAttribute("id"), 10),
                o = new k.Rectangle(parseInt(l.getAttribute("x"), 10) / h + c.frame.x / h, parseInt(l.getAttribute("y"), 10) / h + c.frame.y / h, parseInt(l.getAttribute("width"), 10) / h, parseInt(l.getAttribute("height"), 10) / h);d.chars[m] = { xOffset: parseInt(l.getAttribute("xoffset"), 10) / h, yOffset: parseInt(l.getAttribute("yoffset"), 10) / h, xAdvance: parseInt(l.getAttribute("xadvance"), 10) / h, kerning: {}, texture: new k.Texture(c.baseTexture, o) };
          }for (var q = a.getElementsByTagName("kerning"), r = 0; r < q.length; r++) {
            var s = q[r],
                t = parseInt(s.getAttribute("first"), 10) / h,
                u = parseInt(s.getAttribute("second"), 10) / h,
                v = parseInt(s.getAttribute("amount"), 10) / h;d.chars[u] && (d.chars[u].kerning[t] = v);
          }return b.fonts[d.font] = d, d;
        }, i(b, [{ key: "tint", get: function get() {
            return this._font.tint;
          }, set: function set(a) {
            this._font.tint = "number" == typeof a && a >= 0 ? a : 16777215, this.dirty = !0;
          } }, { key: "align", get: function get() {
            return this._font.align;
          }, set: function set(a) {
            this._font.align = a || "left", this.dirty = !0;
          } }, { key: "anchor", get: function get() {
            return this._anchor;
          }, set: function set(a) {
            "number" == typeof a ? this._anchor.set(a) : this._anchor.copy(a);
          } }, { key: "font", get: function get() {
            return this._font;
          }, set: function set(a) {
            a && ("string" == typeof a ? (a = a.split(" "), this._font.name = 1 === a.length ? a[0] : a.slice(1).join(" "), this._font.size = a.length >= 2 ? parseInt(a[0], 10) : b.fonts[this._font.name].size) : (this._font.name = a.name, this._font.size = "number" == typeof a.size ? a.size : parseInt(a.size, 10)), this.dirty = !0);
          } }, { key: "text", get: function get() {
            return this._text;
          }, set: function set(a) {
            a = a.toString() || " ", this._text !== a && (this._text = a, this.dirty = !0);
          } }, { key: "maxWidth", get: function get() {
            return this._maxWidth;
          }, set: function set(a) {
            this._maxWidth !== a && (this._maxWidth = a, this.dirty = !0);
          } }, { key: "maxLineHeight", get: function get() {
            return this.validate(), this._maxLineHeight;
          } }, { key: "textWidth", get: function get() {
            return this.validate(), this._textWidth;
          } }, { key: "textHeight", get: function get() {
            return this.validate(), this._textHeight;
          } }]), b;
      }(k.Container);c.default = q, q.fonts = {};
    }, { "../core": 65, "../core/math/ObservablePoint": 68, "../core/settings": 101, "../core/utils": 125 }], 137: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var i = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          j = a("../core"),
          k = e(j),
          l = a("../core/sprites/canvas/CanvasTinter"),
          m = d(l),
          n = new k.Point(),
          o = function (a) {
        function b(c) {
          var d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
              e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;f(this, b);var h = g(this, a.call(this, c));return h.tileTransform = new k.TransformStatic(), h._width = d, h._height = e, h._canvasPattern = null, h.uvTransform = c.transform || new k.TextureMatrix(c), h.pluginName = "tilingSprite", h.uvRespectAnchor = !1, h;
        }return h(b, a), b.prototype._onTextureUpdate = function () {
          this.uvTransform && (this.uvTransform.texture = this._texture), this.cachedTint = 16777215;
        }, b.prototype._renderWebGL = function (a) {
          var b = this._texture;b && b.valid && (this.tileTransform.updateLocalTransform(), this.uvTransform.update(), a.setObjectRenderer(a.plugins[this.pluginName]), a.plugins[this.pluginName].render(this));
        }, b.prototype._renderCanvas = function (a) {
          var b = this._texture;if (b.baseTexture.hasLoaded) {
            var c = a.context,
                d = this.worldTransform,
                e = a.resolution,
                f = b.baseTexture,
                g = f.resolution,
                h = this.tilePosition.x / this.tileScale.x % b._frame.width * g,
                i = this.tilePosition.y / this.tileScale.y % b._frame.height * g;if (this._textureID !== this._texture._updateID || this.cachedTint !== this.tint) {
              this._textureID = this._texture._updateID;var j = new k.CanvasRenderTarget(b._frame.width, b._frame.height, g);16777215 !== this.tint ? (this.tintedTexture = m.default.getTintedTexture(this, this.tint), j.context.drawImage(this.tintedTexture, 0, 0)) : j.context.drawImage(f.source, -b._frame.x * g, -b._frame.y * g), this.cachedTint = this.tint, this._canvasPattern = j.context.createPattern(j.canvas, "repeat");
            }c.globalAlpha = this.worldAlpha, c.setTransform(d.a * e, d.b * e, d.c * e, d.d * e, d.tx * e, d.ty * e), a.setBlendMode(this.blendMode), c.fillStyle = this._canvasPattern, c.scale(this.tileScale.x / g, this.tileScale.y / g);var l = this.anchor.x * -this._width,
                n = this.anchor.y * -this._height;this.uvRespectAnchor ? (c.translate(h, i), c.fillRect(-h + l, -i + n, this._width / this.tileScale.x * g, this._height / this.tileScale.y * g)) : (c.translate(h + l, i + n), c.fillRect(-h, -i, this._width / this.tileScale.x * g, this._height / this.tileScale.y * g));
          }
        }, b.prototype._calculateBounds = function () {
          var a = this._width * -this._anchor._x,
              b = this._height * -this._anchor._y,
              c = this._width * (1 - this._anchor._x),
              d = this._height * (1 - this._anchor._y);this._bounds.addFrame(this.transform, a, b, c, d);
        }, b.prototype.getLocalBounds = function (b) {
          return 0 === this.children.length ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._x), b || (this._localBoundsRect || (this._localBoundsRect = new k.Rectangle()), b = this._localBoundsRect), this._bounds.getRectangle(b)) : a.prototype.getLocalBounds.call(this, b);
        }, b.prototype.containsPoint = function (a) {
          this.worldTransform.applyInverse(a, n);var b = this._width,
              c = this._height,
              d = -b * this.anchor._x;if (n.x >= d && n.x < d + b) {
            var e = -c * this.anchor._y;if (n.y >= e && n.y < e + c) return !0;
          }return !1;
        }, b.prototype.destroy = function (b) {
          a.prototype.destroy.call(this, b), this.tileTransform = null, this.uvTransform = null;
        }, b.from = function (a, c, d) {
          return new b(k.Texture.from(a), c, d);
        }, b.fromFrame = function (a, c, d) {
          var e = k.utils.TextureCache[a];if (!e) throw new Error('The frameId "' + a + '" does not exist in the texture cache ' + this);return new b(e, c, d);
        }, b.fromImage = function (a, c, d, e, f) {
          return new b(k.Texture.fromImage(a, e, f), c, d);
        }, i(b, [{ key: "clampMargin", get: function get() {
            return this.uvTransform.clampMargin;
          }, set: function set(a) {
            this.uvTransform.clampMargin = a, this.uvTransform.update(!0);
          } }, { key: "tileScale", get: function get() {
            return this.tileTransform.scale;
          }, set: function set(a) {
            this.tileTransform.scale.copy(a);
          } }, { key: "tilePosition", get: function get() {
            return this.tileTransform.position;
          }, set: function set(a) {
            this.tileTransform.position.copy(a);
          } }, { key: "width", get: function get() {
            return this._width;
          }, set: function set(a) {
            this._width = a;
          } }, { key: "height", get: function get() {
            return this._height;
          }, set: function set(a) {
            this._height = a;
          } }]), b;
      }(k.Sprite);c.default = o;
    }, { "../core": 65, "../core/sprites/canvas/CanvasTinter": 104 }], 138: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }var g = a("../core"),
          h = e(g),
          i = a("../core/textures/Texture"),
          j = d(i),
          k = a("../core/textures/BaseTexture"),
          l = d(k),
          m = a("../core/utils"),
          n = h.DisplayObject,
          o = new h.Matrix();n.prototype._cacheAsBitmap = !1, n.prototype._cacheData = !1;var p = function a() {
        f(this, a), this.textureCacheId = null, this.originalRenderWebGL = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalHitTest = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.sprite = null;
      };Object.defineProperties(n.prototype, { cacheAsBitmap: { get: function get() {
            return this._cacheAsBitmap;
          }, set: function set(a) {
            if (this._cacheAsBitmap !== a) {
              this._cacheAsBitmap = a;var b = void 0;a ? (this._cacheData || (this._cacheData = new p()), b = this._cacheData, b.originalRenderWebGL = this.renderWebGL, b.originalRenderCanvas = this.renderCanvas, b.originalUpdateTransform = this.updateTransform, b.originalCalculateBounds = this._calculateBounds, b.originalGetLocalBounds = this.getLocalBounds, b.originalDestroy = this.destroy, b.originalContainsPoint = this.containsPoint, b.originalMask = this._mask, b.originalFilterArea = this.filterArea, this.renderWebGL = this._renderCachedWebGL, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (b = this._cacheData, b.sprite && this._destroyCachedDisplayObject(), this.renderWebGL = b.originalRenderWebGL, this.renderCanvas = b.originalRenderCanvas, this._calculateBounds = b.originalCalculateBounds, this.getLocalBounds = b.originalGetLocalBounds, this.destroy = b.originalDestroy, this.updateTransform = b.originalUpdateTransform, this.containsPoint = b.originalContainsPoint, this._mask = b.originalMask, this.filterArea = b.originalFilterArea);
            }
          } } }), n.prototype._renderCachedWebGL = function (a) {
        !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(a), this._cacheData.sprite._transformID = -1, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderWebGL(a));
      }, n.prototype._initCachedDisplayObject = function (a) {
        if (!this._cacheData || !this._cacheData.sprite) {
          var b = this.alpha;this.alpha = 1, a.currentRenderer.flush();var c = this.getLocalBounds().clone();if (this._filters) {
            var d = this._filters[0].padding;c.pad(d);
          }var e = a._activeRenderTarget,
              f = a.filterManager.filterStack,
              g = h.RenderTexture.create(0 | c.width, 0 | c.height),
              i = "cacheAsBitmap_" + (0, m.uid)();this._cacheData.textureCacheId = i, l.default.addToCache(g.baseTexture, i), j.default.addToCache(g, i);var k = o;k.tx = -c.x, k.ty = -c.y, this.transform.worldTransform.identity(), this.renderWebGL = this._cacheData.originalRenderWebGL, a.render(this, g, !0, k, !0), a.bindRenderTarget(e), a.filterManager.filterStack = f, this.renderWebGL = this._renderCachedWebGL, this.updateTransform = this.displayObjectUpdateTransform, this._mask = null, this.filterArea = null;var n = new h.Sprite(g);n.transform.worldTransform = this.transform.worldTransform, n.anchor.x = -(c.x / c.width), n.anchor.y = -(c.y / c.height), n.alpha = b, n._bounds = this._bounds, this._calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._cacheData.sprite = n, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = a._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = n.containsPoint.bind(n);
        }
      }, n.prototype._renderCachedCanvas = function (a) {
        !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(a), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite.renderCanvas(a));
      }, n.prototype._initCachedDisplayObjectCanvas = function (a) {
        if (!this._cacheData || !this._cacheData.sprite) {
          var b = this.getLocalBounds(),
              c = this.alpha;this.alpha = 1;var d = a.context,
              e = h.RenderTexture.create(0 | b.width, 0 | b.height),
              f = "cacheAsBitmap_" + (0, m.uid)();this._cacheData.textureCacheId = f, l.default.addToCache(e.baseTexture, f), j.default.addToCache(e, f);var g = o;this.transform.localTransform.copy(g), g.invert(), g.tx -= b.x, g.ty -= b.y, this.renderCanvas = this._cacheData.originalRenderCanvas, a.render(this, e, !0, g, !1), a.context = d, this.renderCanvas = this._renderCachedCanvas, this._calculateBounds = this._calculateCachedBounds, this._mask = null, this.filterArea = null;var i = new h.Sprite(e);i.transform.worldTransform = this.transform.worldTransform, i.anchor.x = -(b.x / b.width), i.anchor.y = -(b.y / b.height), i._bounds = this._bounds, i.alpha = c, this.parent ? this.updateTransform() : (this.parent = a._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.updateTransform = this.displayObjectUpdateTransform, this._cacheData.sprite = i, this.containsPoint = i.containsPoint.bind(i);
        }
      }, n.prototype._calculateCachedBounds = function () {
        this._cacheData.sprite._calculateBounds();
      }, n.prototype._getCachedLocalBounds = function () {
        return this._cacheData.sprite.getLocalBounds();
      }, n.prototype._destroyCachedDisplayObject = function () {
        this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, l.default.removeFromCache(this._cacheData.textureCacheId), j.default.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null;
      }, n.prototype._cacheAsBitmapDestroy = function (a) {
        this.cacheAsBitmap = !1, this.destroy(a);
      };
    }, { "../core": 65, "../core/textures/BaseTexture": 112, "../core/textures/Texture": 115, "../core/utils": 125 }], 139: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }var e = a("../core"),
          f = d(e);f.DisplayObject.prototype.name = null, f.Container.prototype.getChildByName = function (a) {
        for (var b = 0; b < this.children.length; b++) {
          if (this.children[b].name === a) return this.children[b];
        }return null;
      };
    }, { "../core": 65 }], 140: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }var e = a("../core"),
          f = d(e);f.DisplayObject.prototype.getGlobalPosition = function () {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new f.Point(),
            b = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];return this.parent ? this.parent.toGlobal(this.position, a, b) : (a.x = this.position.x, a.y = this.position.y), a;
      };
    }, { "../core": 65 }], 141: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0, c.BitmapText = c.TilingSpriteRenderer = c.TilingSprite = c.AnimatedSprite = void 0;var e = a("./AnimatedSprite");Object.defineProperty(c, "AnimatedSprite", { enumerable: !0, get: function get() {
          return d(e).default;
        } });var f = a("./TilingSprite");Object.defineProperty(c, "TilingSprite", { enumerable: !0, get: function get() {
          return d(f).default;
        } });var g = a("./webgl/TilingSpriteRenderer");Object.defineProperty(c, "TilingSpriteRenderer", { enumerable: !0, get: function get() {
          return d(g).default;
        } });var h = a("./BitmapText");Object.defineProperty(c, "BitmapText", { enumerable: !0, get: function get() {
          return d(h).default;
        } }), a("./cacheAsBitmap"), a("./getChildByName"), a("./getGlobalPosition");
    }, { "./AnimatedSprite": 135, "./BitmapText": 136, "./TilingSprite": 137, "./cacheAsBitmap": 138, "./getChildByName": 139, "./getGlobalPosition": 140, "./webgl/TilingSpriteRenderer": 142 }], 142: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../../core"),
          i = d(h),
          j = a("../../core/const"),
          k = (a("path"), new i.Matrix()),
          l = function (a) {
        function b(c) {
          e(this, b);var d = f(this, a.call(this, c));return d.shader = null, d.simpleShader = null, d.quad = null, d;
        }return g(b, a), b.prototype.onContextChange = function () {
          var a = this.renderer.gl;this.shader = new i.Shader(a, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = mod(vTextureCoord - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 sample = texture2D(uSampler, coord);\n    gl_FragColor = sample * uColor;\n}\n"), this.simpleShader = new i.Shader(a, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = sample * uColor;\n}\n"), this.renderer.bindVao(null), this.quad = new i.Quad(a, this.renderer.state.attribState), this.quad.initVao(this.shader);
        }, b.prototype.render = function (a) {
          var b = this.renderer,
              c = this.quad;b.bindVao(c.vao);var d = c.vertices;d[0] = d[6] = a._width * -a.anchor.x, d[1] = d[3] = a._height * -a.anchor.y, d[2] = d[4] = a._width * (1 - a.anchor.x), d[5] = d[7] = a._height * (1 - a.anchor.y), a.uvRespectAnchor && (d = c.uvs, d[0] = d[6] = -a.anchor.x, d[1] = d[3] = -a.anchor.y, d[2] = d[4] = 1 - a.anchor.x, d[5] = d[7] = 1 - a.anchor.y), c.upload();var e = a._texture,
              f = e.baseTexture,
              g = a.tileTransform.localTransform,
              h = a.uvTransform,
              l = f.isPowerOfTwo && e.frame.width === f.width && e.frame.height === f.height;l && (f._glTextures[b.CONTEXT_UID] ? l = f.wrapMode !== j.WRAP_MODES.CLAMP : f.wrapMode === j.WRAP_MODES.CLAMP && (f.wrapMode = j.WRAP_MODES.REPEAT));var m = l ? this.simpleShader : this.shader;b.bindShader(m);var n = e.width,
              o = e.height,
              p = a._width,
              q = a._height;k.set(g.a * n / p, g.b * n / q, g.c * o / p, g.d * o / q, g.tx / p, g.ty / q), k.invert(), l ? k.prepend(h.mapCoord) : (m.uniforms.uMapCoord = h.mapCoord.toArray(!0), m.uniforms.uClampFrame = h.uClampFrame, m.uniforms.uClampOffset = h.uClampOffset), m.uniforms.uTransform = k.toArray(!0), m.uniforms.uColor = i.utils.premultiplyTintToRgba(a.tint, a.worldAlpha, m.uniforms.uColor, f.premultipliedAlpha), m.uniforms.translationMatrix = a.transform.worldTransform.toArray(!0), m.uniforms.uSampler = b.bindTexture(e), b.setBlendMode(i.utils.correctBlendMode(a.blendMode, f.premultipliedAlpha)), c.vao.draw(this.renderer.gl.TRIANGLES, 6, 0);
        }, b;
      }(i.ObjectRenderer);c.default = l, i.WebGLRenderer.registerPlugin("tilingSprite", l);
    }, { "../../core": 65, "../../core/const": 46, path: 23 }], 143: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../../core"),
          j = d(i),
          k = (a("path"), function (a) {
        function b() {
          var c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;e(this, b);var d = f(this, a.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n"));return d.alpha = c, d.glShaderKey = "alpha", d;
        }return g(b, a), h(b, [{ key: "alpha", get: function get() {
            return this.uniforms.uAlpha;
          }, set: function set(a) {
            this.uniforms.uAlpha = a;
          } }]), b;
      }(j.Filter));c.default = k;
    }, { "../../core": 65, path: 23 }], 144: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var i = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          j = a("../../core"),
          k = e(j),
          l = a("./BlurXFilter"),
          m = d(l),
          n = a("./BlurYFilter"),
          o = d(n),
          p = function (a) {
        function b(c, d, e, h) {
          f(this, b);var i = g(this, a.call(this));return i.blurXFilter = new m.default(c, d, e, h), i.blurYFilter = new o.default(c, d, e, h), i.padding = 0, i.resolution = e || k.settings.RESOLUTION, i.quality = d || 4, i.blur = c || 8, i;
        }return h(b, a), b.prototype.apply = function (a, b, c) {
          var d = a.getRenderTarget(!0);this.blurXFilter.apply(a, b, d, !0), this.blurYFilter.apply(a, d, c, !1), a.returnRenderTarget(d);
        }, i(b, [{ key: "blur", get: function get() {
            return this.blurXFilter.blur;
          }, set: function set(a) {
            this.blurXFilter.blur = this.blurYFilter.blur = a, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength));
          } }, { key: "quality", get: function get() {
            return this.blurXFilter.quality;
          }, set: function set(a) {
            this.blurXFilter.quality = this.blurYFilter.quality = a;
          } }, { key: "blurX", get: function get() {
            return this.blurXFilter.blur;
          }, set: function set(a) {
            this.blurXFilter.blur = a, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength));
          } }, { key: "blurY", get: function get() {
            return this.blurYFilter.blur;
          }, set: function set(a) {
            this.blurYFilter.blur = a, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength));
          } }, { key: "blendMode", get: function get() {
            return this.blurYFilter._blendMode;
          }, set: function set(a) {
            this.blurYFilter._blendMode = a;
          } }]), b;
      }(k.Filter);c.default = p;
    }, { "../../core": 65, "./BlurXFilter": 145, "./BlurYFilter": 146 }], 145: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var i = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          j = a("../../core"),
          k = e(j),
          l = a("./generateBlurVertSource"),
          m = d(l),
          n = a("./generateBlurFragSource"),
          o = d(n),
          p = a("./getMaxBlurKernelSize"),
          q = d(p),
          r = function (a) {
        function b(c, d, e, h) {
          f(this, b), h = h || 5;var i = (0, m.default)(h, !0),
              j = (0, o.default)(h),
              l = g(this, a.call(this, i, j));return l.resolution = e || k.settings.RESOLUTION, l._quality = 0, l.quality = d || 4, l.strength = c || 8, l.firstRun = !0, l;
        }return h(b, a), b.prototype.apply = function (a, b, c, d) {
          if (this.firstRun) {
            var e = a.renderer.gl,
                f = (0, q.default)(e);this.vertexSrc = (0, m.default)(f, !0), this.fragmentSrc = (0, o.default)(f), this.firstRun = !1;
          }if (this.uniforms.strength = 1 / c.size.width * (c.size.width / b.size.width), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes) a.applyFilter(this, b, c, d);else {
            for (var g = a.getRenderTarget(!0), h = b, i = g, j = 0; j < this.passes - 1; j++) {
              a.applyFilter(this, h, i, !0);var k = i;i = h, h = k;
            }a.applyFilter(this, h, c, d), a.returnRenderTarget(g);
          }
        }, i(b, [{ key: "blur", get: function get() {
            return this.strength;
          }, set: function set(a) {
            this.padding = 2 * Math.abs(a), this.strength = a;
          } }, { key: "quality", get: function get() {
            return this._quality;
          }, set: function set(a) {
            this._quality = a, this.passes = a;
          } }]), b;
      }(k.Filter);c.default = r;
    }, { "../../core": 65, "./generateBlurFragSource": 147, "./generateBlurVertSource": 148, "./getMaxBlurKernelSize": 149 }], 146: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var i = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          j = a("../../core"),
          k = e(j),
          l = a("./generateBlurVertSource"),
          m = d(l),
          n = a("./generateBlurFragSource"),
          o = d(n),
          p = a("./getMaxBlurKernelSize"),
          q = d(p),
          r = function (a) {
        function b(c, d, e, h) {
          f(this, b), h = h || 5;var i = (0, m.default)(h, !1),
              j = (0, o.default)(h),
              l = g(this, a.call(this, i, j));return l.resolution = e || k.settings.RESOLUTION, l._quality = 0, l.quality = d || 4, l.strength = c || 8, l.firstRun = !0, l;
        }return h(b, a), b.prototype.apply = function (a, b, c, d) {
          if (this.firstRun) {
            var e = a.renderer.gl,
                f = (0, q.default)(e);this.vertexSrc = (0, m.default)(f, !1), this.fragmentSrc = (0, o.default)(f), this.firstRun = !1;
          }if (this.uniforms.strength = 1 / c.size.height * (c.size.height / b.size.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes) a.applyFilter(this, b, c, d);else {
            for (var g = a.getRenderTarget(!0), h = b, i = g, j = 0; j < this.passes - 1; j++) {
              a.applyFilter(this, h, i, !0);var k = i;i = h, h = k;
            }a.applyFilter(this, h, c, d), a.returnRenderTarget(g);
          }
        }, i(b, [{ key: "blur", get: function get() {
            return this.strength;
          }, set: function set(a) {
            this.padding = 2 * Math.abs(a), this.strength = a;
          } }, { key: "quality", get: function get() {
            return this._quality;
          }, set: function set(a) {
            this._quality = a, this.passes = a;
          } }]), b;
      }(k.Filter);c.default = r;
    }, { "../../core": 65, "./generateBlurFragSource": 147, "./generateBlurVertSource": 148, "./getMaxBlurKernelSize": 149 }], 147: [function (a, b, c) {
      "use strict";
      function d(a) {
        for (var b = e[a], c = b.length, d = f, g = "", h = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", i = void 0, j = 0; j < a; j++) {
          var k = h.replace("%index%", j);i = j, j >= c && (i = a - j - 1), k = k.replace("%value%", b[i]), g += k, g += "\n";
        }return d = d.replace("%blur%", g), d = d.replace("%size%", a);
      }c.__esModule = !0, c.default = d;var e = { 5: [.153388, .221461, .250301], 7: [.071303, .131514, .189879, .214607], 9: [.028532, .067234, .124009, .179044, .20236], 11: [.0093, .028002, .065984, .121703, .175713, .198596], 13: [.002406, .009255, .027867, .065666, .121117, .174868, .197641], 15: [489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448] },
          f = ["varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "    gl_FragColor = vec4(0.0);", "    %blur%", "}"].join("\n");
    }, {}], 148: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        var c = Math.ceil(a / 2),
            d = e,
            f = "",
            g = void 0;g = b ? "vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);";for (var h = 0; h < a; h++) {
          var i = g.replace("%index%", h);i = i.replace("%sampleIndex%", h - (c - 1) + ".0"), f += i, f += "\n";
        }return d = d.replace("%blur%", f), d = d.replace("%size%", a);
      }c.__esModule = !0, c.default = d;var e = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform float strength;", "uniform mat3 projectionMatrix;", "varying vec2 vBlurTexCoords[%size%];", "void main(void)", "{", "gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);", "%blur%", "}"].join("\n");
    }, {}], 149: [function (a, b, c) {
      "use strict";
      function d(a) {
        for (var b = a.getParameter(a.MAX_VARYING_VECTORS), c = 15; c > b;) {
          c -= 2;
        }return c;
      }c.__esModule = !0, c.default = d;
    }, {}], 150: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../../core"),
          j = d(i),
          k = (a("path"), function (a) {
        function b() {
          e(this, b);var c = f(this, a.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n"));return c.uniforms.m = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], c.alpha = 1, c;
        }return g(b, a), b.prototype._loadMatrix = function (a) {
          var b = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              c = a;b && (this._multiply(c, this.uniforms.m, a), c = this._colorMatrix(c)), this.uniforms.m = c;
        }, b.prototype._multiply = function (a, b, c) {
          return a[0] = b[0] * c[0] + b[1] * c[5] + b[2] * c[10] + b[3] * c[15], a[1] = b[0] * c[1] + b[1] * c[6] + b[2] * c[11] + b[3] * c[16], a[2] = b[0] * c[2] + b[1] * c[7] + b[2] * c[12] + b[3] * c[17], a[3] = b[0] * c[3] + b[1] * c[8] + b[2] * c[13] + b[3] * c[18], a[4] = b[0] * c[4] + b[1] * c[9] + b[2] * c[14] + b[3] * c[19] + b[4], a[5] = b[5] * c[0] + b[6] * c[5] + b[7] * c[10] + b[8] * c[15], a[6] = b[5] * c[1] + b[6] * c[6] + b[7] * c[11] + b[8] * c[16], a[7] = b[5] * c[2] + b[6] * c[7] + b[7] * c[12] + b[8] * c[17], a[8] = b[5] * c[3] + b[6] * c[8] + b[7] * c[13] + b[8] * c[18], a[9] = b[5] * c[4] + b[6] * c[9] + b[7] * c[14] + b[8] * c[19] + b[9], a[10] = b[10] * c[0] + b[11] * c[5] + b[12] * c[10] + b[13] * c[15], a[11] = b[10] * c[1] + b[11] * c[6] + b[12] * c[11] + b[13] * c[16], a[12] = b[10] * c[2] + b[11] * c[7] + b[12] * c[12] + b[13] * c[17], a[13] = b[10] * c[3] + b[11] * c[8] + b[12] * c[13] + b[13] * c[18], a[14] = b[10] * c[4] + b[11] * c[9] + b[12] * c[14] + b[13] * c[19] + b[14], a[15] = b[15] * c[0] + b[16] * c[5] + b[17] * c[10] + b[18] * c[15], a[16] = b[15] * c[1] + b[16] * c[6] + b[17] * c[11] + b[18] * c[16], a[17] = b[15] * c[2] + b[16] * c[7] + b[17] * c[12] + b[18] * c[17], a[18] = b[15] * c[3] + b[16] * c[8] + b[17] * c[13] + b[18] * c[18], a[19] = b[15] * c[4] + b[16] * c[9] + b[17] * c[14] + b[18] * c[19] + b[19], a;
        }, b.prototype._colorMatrix = function (a) {
          var b = new Float32Array(a);return b[4] /= 255, b[9] /= 255, b[14] /= 255, b[19] /= 255, b;
        }, b.prototype.brightness = function (a, b) {
          var c = [a, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(c, b);
        }, b.prototype.greyscale = function (a, b) {
          var c = [a, a, a, 0, 0, a, a, a, 0, 0, a, a, a, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(c, b);
        }, b.prototype.blackAndWhite = function (a) {
          var b = [.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(b, a);
        }, b.prototype.hue = function (a, b) {
          a = (a || 0) / 180 * Math.PI;var c = Math.cos(a),
              d = Math.sin(a),
              e = Math.sqrt,
              f = 1 / 3,
              g = e(f),
              h = c + (1 - c) * f,
              i = f * (1 - c) - g * d,
              j = f * (1 - c) + g * d,
              k = f * (1 - c) + g * d,
              l = c + f * (1 - c),
              m = f * (1 - c) - g * d,
              n = f * (1 - c) - g * d,
              o = f * (1 - c) + g * d,
              p = c + f * (1 - c),
              q = [h, i, j, 0, 0, k, l, m, 0, 0, n, o, p, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(q, b);
        }, b.prototype.contrast = function (a, b) {
          var c = (a || 0) + 1,
              d = -.5 * (c - 1),
              e = [c, 0, 0, 0, d, 0, c, 0, 0, d, 0, 0, c, 0, d, 0, 0, 0, 1, 0];this._loadMatrix(e, b);
        }, b.prototype.saturate = function () {
          var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              b = arguments[1],
              c = 2 * a / 3 + 1,
              d = (c - 1) * -.5,
              e = [c, d, d, 0, 0, d, c, d, 0, 0, d, d, c, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(e, b);
        }, b.prototype.desaturate = function () {
          this.saturate(-1);
        }, b.prototype.negative = function (a) {
          var b = [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(b, a);
        }, b.prototype.sepia = function (a) {
          var b = [.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(b, a);
        }, b.prototype.technicolor = function (a) {
          var b = [1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0];this._loadMatrix(b, a);
        }, b.prototype.polaroid = function (a) {
          var b = [1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(b, a);
        }, b.prototype.toBGR = function (a) {
          var b = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(b, a);
        }, b.prototype.kodachrome = function (a) {
          var b = [1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0];this._loadMatrix(b, a);
        }, b.prototype.browni = function (a) {
          var b = [.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0];this._loadMatrix(b, a);
        }, b.prototype.vintage = function (a) {
          var b = [.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0];this._loadMatrix(b, a);
        }, b.prototype.colorTone = function (a, b, c, d, e) {
          a = a || .2, b = b || .15, c = c || 16770432, d = d || 3375104;var f = (c >> 16 & 255) / 255,
              g = (c >> 8 & 255) / 255,
              h = (255 & c) / 255,
              i = (d >> 16 & 255) / 255,
              j = (d >> 8 & 255) / 255,
              k = (255 & d) / 255,
              l = [.3, .59, .11, 0, 0, f, g, h, a, 0, i, j, k, b, 0, f - i, g - j, h - k, 0, 0];this._loadMatrix(l, e);
        }, b.prototype.night = function (a, b) {
          a = a || .1;var c = [a * -2, -a, 0, 0, 0, -a, 0, a, 0, 0, 0, a, 2 * a, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(c, b);
        }, b.prototype.predator = function (a, b) {
          var c = [11.224130630493164 * a, -4.794486999511719 * a, -2.8746118545532227 * a, 0 * a, .40342438220977783 * a, -3.6330697536468506 * a, 9.193157196044922 * a, -2.951810836791992 * a, 0 * a, -1.316135048866272 * a, -3.2184197902679443 * a, -4.2375030517578125 * a, 7.476448059082031 * a, 0 * a, .8044459223747253 * a, 0, 0, 0, 1, 0];this._loadMatrix(c, b);
        }, b.prototype.lsd = function (a) {
          var b = [2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(b, a);
        }, b.prototype.reset = function () {
          var a = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];this._loadMatrix(a, !1);
        }, h(b, [{ key: "matrix", get: function get() {
            return this.uniforms.m;
          }, set: function set(a) {
            this.uniforms.m = a;
          } }, { key: "alpha", get: function get() {
            return this.uniforms.uAlpha;
          }, set: function set(a) {
            this.uniforms.uAlpha = a;
          } }]), b;
      }(j.Filter));c.default = k, k.prototype.grayscale = k.prototype.greyscale;
    }, { "../../core": 65, path: 23 }], 151: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../../core"),
          j = d(i),
          k = (a("path"), function (a) {
        function b(c, d) {
          e(this, b);var g = new j.Matrix();c.renderable = !1;var h = f(this, a.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}", "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n"));return h.maskSprite = c, h.maskMatrix = g, h.uniforms.mapSampler = c._texture, h.uniforms.filterMatrix = g, h.uniforms.scale = { x: 1, y: 1 }, null !== d && void 0 !== d || (d = 20), h.scale = new j.Point(d, d), h;
        }return g(b, a), b.prototype.apply = function (a, b, c) {
          var d = 1 / c.destinationFrame.width * (c.size.width / b.size.width);this.uniforms.filterMatrix = a.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x * d, this.uniforms.scale.y = this.scale.y * d, a.applyFilter(this, b, c);
        }, h(b, [{ key: "map", get: function get() {
            return this.uniforms.mapSampler;
          }, set: function set(a) {
            this.uniforms.mapSampler = a;
          } }]), b;
      }(j.Filter));c.default = k;
    }, { "../../core": 65, path: 23 }], 152: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../../core"),
          i = d(h),
          j = (a("path"), function (a) {
        function b() {
          return e(this, b), f(this, a.call(this, "\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}", 'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n      vec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n'));
        }return g(b, a), b;
      }(i.Filter));c.default = j;
    }, { "../../core": 65, path: 23 }], 153: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0;var e = a("./fxaa/FXAAFilter");Object.defineProperty(c, "FXAAFilter", { enumerable: !0, get: function get() {
          return d(e).default;
        } });var f = a("./noise/NoiseFilter");Object.defineProperty(c, "NoiseFilter", { enumerable: !0, get: function get() {
          return d(f).default;
        } });var g = a("./displacement/DisplacementFilter");Object.defineProperty(c, "DisplacementFilter", { enumerable: !0, get: function get() {
          return d(g).default;
        } });var h = a("./blur/BlurFilter");Object.defineProperty(c, "BlurFilter", { enumerable: !0, get: function get() {
          return d(h).default;
        } });var i = a("./blur/BlurXFilter");Object.defineProperty(c, "BlurXFilter", { enumerable: !0, get: function get() {
          return d(i).default;
        } });var j = a("./blur/BlurYFilter");Object.defineProperty(c, "BlurYFilter", { enumerable: !0, get: function get() {
          return d(j).default;
        } });var k = a("./colormatrix/ColorMatrixFilter");Object.defineProperty(c, "ColorMatrixFilter", { enumerable: !0, get: function get() {
          return d(k).default;
        } });var l = a("./alpha/AlphaFilter");Object.defineProperty(c, "AlphaFilter", { enumerable: !0, get: function get() {
          return d(l).default;
        } });
    }, { "./alpha/AlphaFilter": 143, "./blur/BlurFilter": 144, "./blur/BlurXFilter": 145, "./blur/BlurYFilter": 146, "./colormatrix/ColorMatrixFilter": 150, "./displacement/DisplacementFilter": 151, "./fxaa/FXAAFilter": 152, "./noise/NoiseFilter": 154 }], 154: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../../core"),
          j = d(i),
          k = (a("path"), function (a) {
        function b() {
          var c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .5,
              d = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Math.random();e(this, b);var g = f(this, a.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n"));return g.noise = c, g.seed = d, g;
        }return g(b, a), h(b, [{ key: "noise", get: function get() {
            return this.uniforms.uNoise;
          }, set: function set(a) {
            this.uniforms.uNoise = a;
          } }, { key: "seed", get: function get() {
            return this.uniforms.uSeed;
          }, set: function set(a) {
            this.uniforms.uSeed = a;
          } }]), b;
      }(j.Filter));c.default = k;
    }, { "../../core": 65, path: 23 }], 155: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          g = a("../core"),
          h = d(g),
          i = function () {
        function a() {
          e(this, a), this.global = new h.Point(), this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0;
        }return a.prototype.getLocalPosition = function (a, b, c) {
          return a.worldTransform.applyInverse(c || this.global, b);
        }, a.prototype._copyEvent = function (a) {
          a.isPrimary && (this.isPrimary = !0), this.button = a.button, this.buttons = a.buttons, this.width = a.width, this.height = a.height, this.tiltX = a.tiltX, this.tiltY = a.tiltY, this.pointerType = a.pointerType, this.pressure = a.pressure, this.rotationAngle = a.rotationAngle, this.twist = a.twist || 0, this.tangentialPressure = a.tangentialPressure || 0;
        }, a.prototype._reset = function () {
          this.isPrimary = !1;
        }, f(a, [{ key: "pointerId", get: function get() {
            return this.identifier;
          } }]), a;
      }();c.default = i;
    }, { "../core": 65 }], 156: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a() {
          d(this, a), this.stopped = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null;
        }return a.prototype.stopPropagation = function () {
          this.stopped = !0;
        }, a.prototype._reset = function () {
          this.stopped = !1, this.currentTarget = null, this.target = null;
        }, a;
      }();c.default = e;
    }, {}], 157: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (a) {
        return typeof a === "undefined" ? "undefined" : _typeof(a);
      } : function (a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a === "undefined" ? "undefined" : _typeof(a);
      },
          j = a("../core"),
          k = e(j),
          l = a("./InteractionData"),
          m = d(l),
          n = a("./InteractionEvent"),
          o = d(n),
          p = a("./InteractionTrackingData"),
          q = d(p),
          r = a("eventemitter3"),
          s = d(r),
          t = a("./interactiveTarget"),
          u = d(t);k.utils.mixins.delayMixin(k.DisplayObject.prototype, u.default);var v = "MOUSE",
          w = { target: null, data: { global: null } },
          x = function (a) {
        function b(c, d) {
          f(this, b);var e = g(this, a.call(this));return d = d || {}, e.renderer = c, e.autoPreventDefault = void 0 === d.autoPreventDefault || d.autoPreventDefault, e.interactionFrequency = d.interactionFrequency || 10, e.mouse = new m.default(), e.mouse.identifier = v, e.mouse.global.set(-999999), e.activeInteractionData = {}, e.activeInteractionData[v] = e.mouse, e.interactionDataPool = [], e.eventData = new o.default(), e.interactionDOMElement = null, e.moveWhenInside = !1, e.eventsAdded = !1, e.mouseOverRenderer = !1, e.supportsTouchEvents = "ontouchstart" in window, e.supportsPointerEvents = !!window.PointerEvent, e.onPointerUp = e.onPointerUp.bind(e), e.processPointerUp = e.processPointerUp.bind(e), e.onPointerCancel = e.onPointerCancel.bind(e), e.processPointerCancel = e.processPointerCancel.bind(e), e.onPointerDown = e.onPointerDown.bind(e), e.processPointerDown = e.processPointerDown.bind(e), e.onPointerMove = e.onPointerMove.bind(e), e.processPointerMove = e.processPointerMove.bind(e), e.onPointerOut = e.onPointerOut.bind(e), e.processPointerOverOut = e.processPointerOverOut.bind(e), e.onPointerOver = e.onPointerOver.bind(e), e.cursorStyles = { default: "inherit", pointer: "pointer" }, e.currentCursorMode = null, e.cursor = null, e._tempPoint = new k.Point(), e.resolution = 1, e.setTargetElement(e.renderer.view, e.renderer.resolution), e;
        }return h(b, a), b.prototype.hitTest = function (a, b) {
          return w.target = null, w.data.global = a, b || (b = this.renderer._lastObjectRendered), this.processInteractive(w, b, null, !0), w.target;
        }, b.prototype.setTargetElement = function (a) {
          var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;this.removeEvents(), this.interactionDOMElement = a, this.resolution = b, this.addEvents();
        }, b.prototype.addEvents = function () {
          this.interactionDOMElement && (k.ticker.shared.add(this.update, this, k.UPDATE_PRIORITY.INTERACTION), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "none", this.interactionDOMElement.style["-ms-touch-action"] = "none") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = "none"), this.supportsPointerEvents ? (window.document.addEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, !0), window.addEventListener("pointercancel", this.onPointerCancel, !0), window.addEventListener("pointerup", this.onPointerUp, !0)) : (window.document.addEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, !0), window.addEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, !0), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, !0)), this.eventsAdded = !0);
        }, b.prototype.removeEvents = function () {
          this.interactionDOMElement && (k.ticker.shared.remove(this.update, this), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = "") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = ""), this.supportsPointerEvents ? (window.document.removeEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, !0), window.removeEventListener("pointercancel", this.onPointerCancel, !0), window.removeEventListener("pointerup", this.onPointerUp, !0)) : (window.document.removeEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, !0), window.removeEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, !0), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, !0)), this.interactionDOMElement = null, this.eventsAdded = !1);
        }, b.prototype.update = function (a) {
          if (this._deltaTime += a, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.interactionDOMElement)) {
            if (this.didMove) return void (this.didMove = !1);this.cursor = null;for (var b in this.activeInteractionData) {
              if (this.activeInteractionData.hasOwnProperty(b)) {
                var c = this.activeInteractionData[b];if (c.originalEvent && "touch" !== c.pointerType) {
                  var d = this.configureInteractionEventForDOMEvent(this.eventData, c.originalEvent, c);this.processInteractive(d, this.renderer._lastObjectRendered, this.processPointerOverOut, !0);
                }
              }
            }this.setCursorMode(this.cursor);
          }
        }, b.prototype.setCursorMode = function (a) {
          if (a = a || "default", this.currentCursorMode !== a) {
            this.currentCursorMode = a;var b = this.cursorStyles[a];if (b) switch ("undefined" == typeof b ? "undefined" : i(b)) {case "string":
                this.interactionDOMElement.style.cursor = b;break;case "function":
                b(a);break;case "object":
                Object.assign(this.interactionDOMElement.style, b);} else "string" != typeof a || Object.prototype.hasOwnProperty.call(this.cursorStyles, a) || (this.interactionDOMElement.style.cursor = a);
          }
        }, b.prototype.dispatchEvent = function (a, b, c) {
          c.stopped || (c.currentTarget = a, c.type = b, a.emit(b, c), a[b] && a[b](c));
        }, b.prototype.mapPositionToPoint = function (a, b, c) {
          var d = void 0;d = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : { x: 0, y: 0, width: 0, height: 0 };var e = navigator.isCocoonJS ? this.resolution : 1 / this.resolution;a.x = (b - d.left) * (this.interactionDOMElement.width / d.width) * e, a.y = (c - d.top) * (this.interactionDOMElement.height / d.height) * e;
        }, b.prototype.processInteractive = function (a, b, c, d, e) {
          if (!b || !b.visible) return !1;var f = a.data.global;e = b.interactive || e;var g = !1,
              h = e;if (b.hitArea ? h = !1 : d && b._mask && (b._mask.containsPoint(f) || (d = !1)), b.interactiveChildren && b.children) for (var i = b.children, j = i.length - 1; j >= 0; j--) {
            var k = i[j],
                l = this.processInteractive(a, k, c, d, h);if (l) {
              if (!k.parent) continue;h = !1, l && (a.target && (d = !1), g = !0);
            }
          }return e && (d && !a.target && (b.hitArea ? (b.worldTransform.applyInverse(f, this._tempPoint), b.hitArea.contains(this._tempPoint.x, this._tempPoint.y) && (g = !0)) : b.containsPoint && b.containsPoint(f) && (g = !0)), b.interactive && (g && !a.target && (a.target = b), c && c(a, b, !!g))), g;
        }, b.prototype.onPointerDown = function (a) {
          if (!this.supportsTouchEvents || "touch" !== a.pointerType) {
            var b = this.normalizeToPointerData(a);this.autoPreventDefault && b[0].isNormalized && a.preventDefault();for (var c = b.length, d = 0; d < c; d++) {
              var e = b[d],
                  f = this.getInteractionDataForPointerId(e),
                  g = this.configureInteractionEventForDOMEvent(this.eventData, e, f);if (g.data.originalEvent = a, this.processInteractive(g, this.renderer._lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", g), "touch" === e.pointerType) this.emit("touchstart", g);else if ("mouse" === e.pointerType || "pen" === e.pointerType) {
                var h = 2 === e.button;this.emit(h ? "rightdown" : "mousedown", this.eventData);
              }
            }
          }
        }, b.prototype.processPointerDown = function (a, b, c) {
          var d = a.data,
              e = a.data.identifier;if (c) if (b.trackedPointers[e] || (b.trackedPointers[e] = new q.default(e)), this.dispatchEvent(b, "pointerdown", a), "touch" === d.pointerType) this.dispatchEvent(b, "touchstart", a);else if ("mouse" === d.pointerType || "pen" === d.pointerType) {
            var f = 2 === d.button;f ? b.trackedPointers[e].rightDown = !0 : b.trackedPointers[e].leftDown = !0, this.dispatchEvent(b, f ? "rightdown" : "mousedown", a);
          }
        }, b.prototype.onPointerComplete = function (a, b, c) {
          for (var d = this.normalizeToPointerData(a), e = d.length, f = a.target !== this.interactionDOMElement ? "outside" : "", g = 0; g < e; g++) {
            var h = d[g],
                i = this.getInteractionDataForPointerId(h),
                j = this.configureInteractionEventForDOMEvent(this.eventData, h, i);if (j.data.originalEvent = a, this.processInteractive(j, this.renderer._lastObjectRendered, c, b || !f), this.emit(b ? "pointercancel" : "pointerup" + f, j), "mouse" === h.pointerType || "pen" === h.pointerType) {
              var k = 2 === h.button;this.emit(k ? "rightup" + f : "mouseup" + f, j);
            } else "touch" === h.pointerType && (this.emit(b ? "touchcancel" : "touchend" + f, j), this.releaseInteractionDataForPointerId(h.pointerId, i));
          }
        }, b.prototype.onPointerCancel = function (a) {
          this.supportsTouchEvents && "touch" === a.pointerType || this.onPointerComplete(a, !0, this.processPointerCancel);
        }, b.prototype.processPointerCancel = function (a, b) {
          var c = a.data,
              d = a.data.identifier;void 0 !== b.trackedPointers[d] && (delete b.trackedPointers[d], this.dispatchEvent(b, "pointercancel", a), "touch" === c.pointerType && this.dispatchEvent(b, "touchcancel", a));
        }, b.prototype.onPointerUp = function (a) {
          this.supportsTouchEvents && "touch" === a.pointerType || this.onPointerComplete(a, !1, this.processPointerUp);
        }, b.prototype.processPointerUp = function (a, b, c) {
          var d = a.data,
              e = a.data.identifier,
              f = b.trackedPointers[e],
              g = "touch" === d.pointerType,
              h = "mouse" === d.pointerType || "pen" === d.pointerType;if (h) {
            var i = 2 === d.button,
                j = q.default.FLAGS,
                k = i ? j.RIGHT_DOWN : j.LEFT_DOWN,
                l = void 0 !== f && f.flags & k;c ? (this.dispatchEvent(b, i ? "rightup" : "mouseup", a), l && this.dispatchEvent(b, i ? "rightclick" : "click", a)) : l && this.dispatchEvent(b, i ? "rightupoutside" : "mouseupoutside", a), f && (i ? f.rightDown = !1 : f.leftDown = !1);
          }c ? (this.dispatchEvent(b, "pointerup", a), g && this.dispatchEvent(b, "touchend", a), f && (this.dispatchEvent(b, "pointertap", a), g && (this.dispatchEvent(b, "tap", a), f.over = !1))) : f && (this.dispatchEvent(b, "pointerupoutside", a), g && this.dispatchEvent(b, "touchendoutside", a)), f && f.none && delete b.trackedPointers[e];
        }, b.prototype.onPointerMove = function (a) {
          if (!this.supportsTouchEvents || "touch" !== a.pointerType) {
            var b = this.normalizeToPointerData(a);"mouse" === b[0].pointerType && (this.didMove = !0, this.cursor = null);for (var c = b.length, d = 0; d < c; d++) {
              var e = b[d],
                  f = this.getInteractionDataForPointerId(e),
                  g = this.configureInteractionEventForDOMEvent(this.eventData, e, f);g.data.originalEvent = a;var h = "touch" !== e.pointerType || this.moveWhenInside;this.processInteractive(g, this.renderer._lastObjectRendered, this.processPointerMove, h), this.emit("pointermove", g), "touch" === e.pointerType && this.emit("touchmove", g), "mouse" !== e.pointerType && "pen" !== e.pointerType || this.emit("mousemove", g);
            }"mouse" === b[0].pointerType && this.setCursorMode(this.cursor);
          }
        }, b.prototype.processPointerMove = function (a, b, c) {
          var d = a.data,
              e = "touch" === d.pointerType,
              f = "mouse" === d.pointerType || "pen" === d.pointerType;f && this.processPointerOverOut(a, b, c), this.moveWhenInside && !c || (this.dispatchEvent(b, "pointermove", a), e && this.dispatchEvent(b, "touchmove", a), f && this.dispatchEvent(b, "mousemove", a));
        }, b.prototype.onPointerOut = function (a) {
          if (!this.supportsTouchEvents || "touch" !== a.pointerType) {
            var b = this.normalizeToPointerData(a),
                c = b[0];"mouse" === c.pointerType && (this.mouseOverRenderer = !1, this.setCursorMode(null));var d = this.getInteractionDataForPointerId(c),
                e = this.configureInteractionEventForDOMEvent(this.eventData, c, d);e.data.originalEvent = c, this.processInteractive(e, this.renderer._lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", e), "mouse" === c.pointerType || "pen" === c.pointerType ? this.emit("mouseout", e) : this.releaseInteractionDataForPointerId(d.identifier);
          }
        }, b.prototype.processPointerOverOut = function (a, b, c) {
          var d = a.data,
              e = a.data.identifier,
              f = "mouse" === d.pointerType || "pen" === d.pointerType,
              g = b.trackedPointers[e];c && !g && (g = b.trackedPointers[e] = new q.default(e)), void 0 !== g && (c && this.mouseOverRenderer ? (g.over || (g.over = !0, this.dispatchEvent(b, "pointerover", a), f && this.dispatchEvent(b, "mouseover", a)), f && null === this.cursor && (this.cursor = b.cursor)) : g.over && (g.over = !1, this.dispatchEvent(b, "pointerout", this.eventData), f && this.dispatchEvent(b, "mouseout", a), g.none && delete b.trackedPointers[e]));
        }, b.prototype.onPointerOver = function (a) {
          var b = this.normalizeToPointerData(a),
              c = b[0],
              d = this.getInteractionDataForPointerId(c),
              e = this.configureInteractionEventForDOMEvent(this.eventData, c, d);e.data.originalEvent = c, "mouse" === c.pointerType && (this.mouseOverRenderer = !0), this.emit("pointerover", e), "mouse" !== c.pointerType && "pen" !== c.pointerType || this.emit("mouseover", e);
        }, b.prototype.getInteractionDataForPointerId = function (a) {
          var b = a.pointerId,
              c = void 0;return b === v || "mouse" === a.pointerType ? c = this.mouse : this.activeInteractionData[b] ? c = this.activeInteractionData[b] : (c = this.interactionDataPool.pop() || new m.default(), c.identifier = b, this.activeInteractionData[b] = c), c._copyEvent(a), c;
        }, b.prototype.releaseInteractionDataForPointerId = function (a) {
          var b = this.activeInteractionData[a];b && (delete this.activeInteractionData[a], b._reset(), this.interactionDataPool.push(b));
        }, b.prototype.configureInteractionEventForDOMEvent = function (a, b, c) {
          return a.data = c, this.mapPositionToPoint(c.global, b.clientX, b.clientY), navigator.isCocoonJS && "touch" === b.pointerType && (c.global.x = c.global.x / this.resolution, c.global.y = c.global.y / this.resolution), "touch" === b.pointerType && (b.globalX = c.global.x, b.globalY = c.global.y), c.originalEvent = b, a._reset(), a;
        }, b.prototype.normalizeToPointerData = function (a) {
          var b = [];if (this.supportsTouchEvents && a instanceof TouchEvent) for (var c = 0, d = a.changedTouches.length; c < d; c++) {
            var e = a.changedTouches[c];"undefined" == typeof e.button && (e.button = a.touches.length ? 1 : 0), "undefined" == typeof e.buttons && (e.buttons = a.touches.length ? 1 : 0), "undefined" == typeof e.isPrimary && (e.isPrimary = 1 === a.touches.length && "touchstart" === a.type), "undefined" == typeof e.width && (e.width = e.radiusX || 1), "undefined" == typeof e.height && (e.height = e.radiusY || 1), "undefined" == typeof e.tiltX && (e.tiltX = 0), "undefined" == typeof e.tiltY && (e.tiltY = 0), "undefined" == typeof e.pointerType && (e.pointerType = "touch"), "undefined" == typeof e.pointerId && (e.pointerId = e.identifier || 0), "undefined" == typeof e.pressure && (e.pressure = e.force || .5), e.twist = 0, e.tangentialPressure = 0, "undefined" == typeof e.layerX && (e.layerX = e.offsetX = e.clientX), "undefined" == typeof e.layerY && (e.layerY = e.offsetY = e.clientY), e.isNormalized = !0, b.push(e);
          } else !(a instanceof MouseEvent) || this.supportsPointerEvents && a instanceof window.PointerEvent ? b.push(a) : ("undefined" == typeof a.isPrimary && (a.isPrimary = !0), "undefined" == typeof a.width && (a.width = 1), "undefined" == typeof a.height && (a.height = 1), "undefined" == typeof a.tiltX && (a.tiltX = 0), "undefined" == typeof a.tiltY && (a.tiltY = 0), "undefined" == typeof a.pointerType && (a.pointerType = "mouse"), "undefined" == typeof a.pointerId && (a.pointerId = v), "undefined" == typeof a.pressure && (a.pressure = .5), a.twist = 0, a.tangentialPressure = 0, a.isNormalized = !0, b.push(a));return b;
        }, b.prototype.destroy = function () {
          this.removeEvents(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this._tempPoint = null;
        }, b;
      }(s.default);c.default = x, k.WebGLRenderer.registerPlugin("interaction", x), k.CanvasRenderer.registerPlugin("interaction", x);
    }, { "../core": 65, "./InteractionData": 155, "./InteractionEvent": 156, "./InteractionTrackingData": 158, "./interactiveTarget": 160, eventemitter3: 3 }], 158: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          f = function () {
        function a(b) {
          d(this, a), this._pointerId = b, this._flags = a.FLAGS.NONE;
        }return a.prototype._doSet = function (a, b) {
          b ? this._flags = this._flags | a : this._flags = this._flags & ~a;
        }, e(a, [{ key: "pointerId", get: function get() {
            return this._pointerId;
          } }, { key: "flags", get: function get() {
            return this._flags;
          }, set: function set(a) {
            this._flags = a;
          } }, { key: "none", get: function get() {
            return this._flags === this.constructor.FLAGS.NONE;
          } }, { key: "over", get: function get() {
            return 0 !== (this._flags & this.constructor.FLAGS.OVER);
          }, set: function set(a) {
            this._doSet(this.constructor.FLAGS.OVER, a);
          } }, { key: "rightDown", get: function get() {
            return 0 !== (this._flags & this.constructor.FLAGS.RIGHT_DOWN);
          }, set: function set(a) {
            this._doSet(this.constructor.FLAGS.RIGHT_DOWN, a);
          } }, { key: "leftDown", get: function get() {
            return 0 !== (this._flags & this.constructor.FLAGS.LEFT_DOWN);
          }, set: function set(a) {
            this._doSet(this.constructor.FLAGS.LEFT_DOWN, a);
          } }]), a;
      }();c.default = f, f.FLAGS = Object.freeze({ NONE: 0, OVER: 1, LEFT_DOWN: 2, RIGHT_DOWN: 4 });
    }, {}], 159: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0;var e = a("./InteractionData");Object.defineProperty(c, "InteractionData", { enumerable: !0, get: function get() {
          return d(e).default;
        } });var f = a("./InteractionManager");Object.defineProperty(c, "InteractionManager", { enumerable: !0, get: function get() {
          return d(f).default;
        } });var g = a("./interactiveTarget");Object.defineProperty(c, "interactiveTarget", { enumerable: !0, get: function get() {
          return d(g).default;
        } });var h = a("./InteractionTrackingData");Object.defineProperty(c, "InteractionTrackingData", { enumerable: !0, get: function get() {
          return d(h).default;
        } });var i = a("./InteractionEvent");Object.defineProperty(c, "InteractionEvent", { enumerable: !0, get: function get() {
          return d(i).default;
        } });
    }, { "./InteractionData": 155, "./InteractionEvent": 156, "./InteractionManager": 157, "./InteractionTrackingData": 158, "./interactiveTarget": 160 }], 160: [function (a, b, c) {
      "use strict";
      c.__esModule = !0, c.default = { interactive: !1, interactiveChildren: !0, hitArea: null, get buttonMode() {
          return "pointer" === this.cursor;
        }, set buttonMode(a) {
          a ? this.cursor = "pointer" : "pointer" === this.cursor && (this.cursor = null);
        }, cursor: null, get trackedPointers() {
          return void 0 === this._trackedPointers && (this._trackedPointers = {}), this._trackedPointers;
        }, _trackedPointers: void 0 };
    }, {}], 161: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        a.bitmapFont = j.BitmapText.registerFont(a.data, b);
      }c.__esModule = !0, c.parse = e, c.default = function () {
        return function (a, b) {
          if (!a.data || a.type !== i.Resource.TYPE.XML) return void b();if (0 === a.data.getElementsByTagName("page").length || 0 === a.data.getElementsByTagName("info").length || null === a.data.getElementsByTagName("info")[0].getAttribute("face")) return void b();var c = a.isDataUrl ? "" : g.dirname(a.url);a.isDataUrl && ("." === c && (c = ""), this.baseUrl && c && "/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (c += "/")), c = c.replace(this.baseUrl, ""), c && "/" !== c.charAt(c.length - 1) && (c += "/");var d = c + a.data.getElementsByTagName("page")[0].getAttribute("file");if (h.utils.TextureCache[d]) e(a, h.utils.TextureCache[d]), b();else {
            var f = { crossOrigin: a.crossOrigin, loadType: i.Resource.LOAD_TYPE.IMAGE, metadata: a.metadata.imageMetadata, parentResource: a };this.add(a.name + "_image", d, f, function (c) {
              e(a, c.texture), b();
            });
          }
        };
      };var f = a("path"),
          g = d(f),
          h = a("../core"),
          i = a("resource-loader"),
          j = a("../extras");
    }, { "../core": 65, "../extras": 141, path: 23, "resource-loader": 36 }], 162: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0, c.shared = c.Resource = c.textureParser = c.getResourcePath = c.spritesheetParser = c.parseBitmapFontData = c.bitmapFontParser = c.Loader = void 0;var e = a("./bitmapFontParser");Object.defineProperty(c, "bitmapFontParser", { enumerable: !0, get: function get() {
          return d(e).default;
        } }), Object.defineProperty(c, "parseBitmapFontData", { enumerable: !0, get: function get() {
          return e.parse;
        } });var f = a("./spritesheetParser");Object.defineProperty(c, "spritesheetParser", { enumerable: !0, get: function get() {
          return d(f).default;
        } }), Object.defineProperty(c, "getResourcePath", { enumerable: !0, get: function get() {
          return f.getResourcePath;
        } });var g = a("./textureParser");Object.defineProperty(c, "textureParser", { enumerable: !0, get: function get() {
          return d(g).default;
        } });var h = a("resource-loader");Object.defineProperty(c, "Resource", { enumerable: !0, get: function get() {
          return h.Resource;
        } });var i = a("../core/Application"),
          j = d(i),
          k = a("./loader"),
          l = d(k);c.Loader = l.default;var m = new l.default();m.destroy = function () {}, c.shared = m;var n = j.default.prototype;n._loader = null, Object.defineProperty(n, "loader", { get: function get() {
          if (!this._loader) {
            var a = this._options.sharedLoader;this._loader = a ? m : new l.default();
          }return this._loader;
        } }), n._parentDestroy = n.destroy, n.destroy = function (a) {
        this._loader && (this._loader.destroy(), this._loader = null), this._parentDestroy(a);
      };
    }, { "../core/Application": 43, "./bitmapFontParser": 161, "./loader": 163, "./spritesheetParser": 164, "./textureParser": 165, "resource-loader": 36 }], 163: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("resource-loader"),
          i = d(h),
          j = a("resource-loader/lib/middlewares/parsing/blob"),
          k = a("eventemitter3"),
          l = d(k),
          m = a("./textureParser"),
          n = d(m),
          o = a("./spritesheetParser"),
          p = d(o),
          q = a("./bitmapFontParser"),
          r = d(q),
          s = function (a) {
        function b(c, d) {
          e(this, b);var g = f(this, a.call(this, c, d));l.default.call(g);for (var h = 0; h < b._pixiMiddleware.length; ++h) {
            g.use(b._pixiMiddleware[h]());
          }return g.onStart.add(function (a) {
            return g.emit("start", a);
          }), g.onProgress.add(function (a, b) {
            return g.emit("progress", a, b);
          }), g.onError.add(function (a, b, c) {
            return g.emit("error", a, b, c);
          }), g.onLoad.add(function (a, b) {
            return g.emit("load", a, b);
          }), g.onComplete.add(function (a, b) {
            return g.emit("complete", a, b);
          }), g;
        }return g(b, a), b.addPixiMiddleware = function (a) {
          b._pixiMiddleware.push(a);
        }, b.prototype.destroy = function () {
          this.removeAllListeners(), this.reset();
        }, b;
      }(i.default);c.default = s;for (var t in l.default.prototype) {
        s.prototype[t] = l.default.prototype[t];
      }s._pixiMiddleware = [j.blobMiddlewareFactory, n.default, p.default, r.default];var u = i.default.Resource;u.setExtensionXhrType("fnt", u.XHR_RESPONSE_TYPE.DOCUMENT);
    }, { "./bitmapFontParser": 161, "./spritesheetParser": 164, "./textureParser": 165, eventemitter3: 3, "resource-loader": 36, "resource-loader/lib/middlewares/parsing/blob": 37 }], 164: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        return a.isDataUrl ? a.data.meta.image : h.default.resolve(a.url.replace(b, ""), a.data.meta.image);
      }c.__esModule = !0, c.default = function () {
        return function (a, b) {
          var c = a.name + "_image";if (!a.data || a.type !== f.Resource.TYPE.JSON || !a.data.frames || this.resources[c]) return void b();var d = { crossOrigin: a.crossOrigin, loadType: f.Resource.LOAD_TYPE.IMAGE, metadata: a.metadata.imageMetadata, parentResource: a },
              g = e(a, this.baseUrl);this.add(c, g, d, function (c) {
            var d = new i.Spritesheet(c.texture.baseTexture, a.data, a.url);d.parse(function () {
              a.spritesheet = d, a.textures = d.textures, b();
            });
          });
        };
      }, c.getResourcePath = e;var f = a("resource-loader"),
          g = a("url"),
          h = d(g),
          i = a("../core");
    }, { "../core": 65, "resource-loader": 36, url: 29 }], 165: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0, c.default = function () {
        return function (a, b) {
          a.data && a.type === e.Resource.TYPE.IMAGE && (a.texture = g.default.fromLoader(a.data, a.url, a.name)), b();
        };
      };var e = a("resource-loader"),
          f = a("../core/textures/Texture"),
          g = d(f);
    }, { "../core/textures/Texture": 115, "resource-loader": 36 }], 166: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var i = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          j = a("../core"),
          k = e(j),
          l = a("../core/textures/Texture"),
          m = d(l),
          n = new k.Point(),
          o = new k.Polygon(),
          p = function (a) {
        function b(c, d, e, h, i) {
          f(this, b);var j = g(this, a.call(this));return j._texture = c || m.default.EMPTY, j.uvs = e || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), j.vertices = d || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]), j.indices = h || new Uint16Array([0, 1, 3, 2]), j.dirty = 0, j.indexDirty = 0, j.blendMode = k.BLEND_MODES.NORMAL, j.canvasPadding = 0, j.drawMode = i || b.DRAW_MODES.TRIANGLE_MESH, j.shader = null, j.tintRgb = new Float32Array([1, 1, 1]), j._glDatas = {}, j._uvTransform = new k.TextureMatrix(j._texture), j.uploadUvTransform = !1, j.pluginName = "mesh", j;
        }return h(b, a), b.prototype._renderWebGL = function (a) {
          this.refresh(), a.setObjectRenderer(a.plugins[this.pluginName]), a.plugins[this.pluginName].render(this);
        }, b.prototype._renderCanvas = function (a) {
          this.refresh(), a.plugins[this.pluginName].render(this);
        }, b.prototype._onTextureUpdate = function () {
          this._uvTransform.texture = this._texture, this.refresh();
        }, b.prototype.multiplyUvs = function () {
          this.uploadUvTransform || this._uvTransform.multiplyUvs(this.uvs);
        }, b.prototype.refresh = function (a) {
          this._uvTransform.update(a) && this._refresh();
        }, b.prototype._refresh = function () {}, b.prototype._calculateBounds = function () {
          this._bounds.addVertices(this.transform, this.vertices, 0, this.vertices.length);
        }, b.prototype.containsPoint = function (a) {
          if (!this.getBounds().contains(a.x, a.y)) return !1;this.worldTransform.applyInverse(a, n);for (var c = this.vertices, d = o.points, e = this.indices, f = this.indices.length, g = this.drawMode === b.DRAW_MODES.TRIANGLES ? 3 : 1, h = 0; h + 2 < f; h += g) {
            var i = 2 * e[h],
                j = 2 * e[h + 1],
                k = 2 * e[h + 2];if (d[0] = c[i], d[1] = c[i + 1], d[2] = c[j], d[3] = c[j + 1], d[4] = c[k], d[5] = c[k + 1], o.contains(n.x, n.y)) return !0;
          }return !1;
        }, i(b, [{ key: "texture", get: function get() {
            return this._texture;
          }, set: function set(a) {
            this._texture !== a && (this._texture = a, a && (a.baseTexture.hasLoaded ? this._onTextureUpdate() : a.once("update", this._onTextureUpdate, this)));
          } }, { key: "tint", get: function get() {
            return k.utils.rgb2hex(this.tintRgb);
          }, set: function set(a) {
            this.tintRgb = k.utils.hex2rgb(a, this.tintRgb);
          } }]), b;
      }(k.Container);c.default = p, p.DRAW_MODES = { TRIANGLE_MESH: 0, TRIANGLES: 1 };
    }, { "../core": 65, "../core/textures/Texture": 115 }], 167: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("./Plane"),
          j = d(i),
          k = 10,
          l = function (a) {
        function b(c, d, g, h, i) {
          e(this, b);var j = f(this, a.call(this, c, 4, 4));return j._origWidth = c.orig.width, j._origHeight = c.orig.height, j._width = j._origWidth, j._height = j._origHeight, j.leftWidth = "undefined" != typeof d ? d : k, j.rightWidth = "undefined" != typeof h ? h : k, j.topHeight = "undefined" != typeof g ? g : k, j.bottomHeight = "undefined" != typeof i ? i : k, j.refresh(!0), j;
        }return g(b, a), b.prototype.updateHorizontalVertices = function () {
          var a = this.vertices;a[9] = a[11] = a[13] = a[15] = this._topHeight, a[17] = a[19] = a[21] = a[23] = this._height - this._bottomHeight, a[25] = a[27] = a[29] = a[31] = this._height;
        }, b.prototype.updateVerticalVertices = function () {
          var a = this.vertices;a[2] = a[10] = a[18] = a[26] = this._leftWidth, a[4] = a[12] = a[20] = a[28] = this._width - this._rightWidth, a[6] = a[14] = a[22] = a[30] = this._width;
        }, b.prototype._renderCanvas = function (a) {
          var b = a.context;b.globalAlpha = this.worldAlpha;var c = this.worldTransform,
              d = a.resolution;a.roundPixels ? b.setTransform(c.a * d, c.b * d, c.c * d, c.d * d, c.tx * d | 0, c.ty * d | 0) : b.setTransform(c.a * d, c.b * d, c.c * d, c.d * d, c.tx * d, c.ty * d);var e = this._texture.baseTexture,
              f = e.source,
              g = e.width * e.resolution,
              h = e.height * e.resolution;this.drawSegment(b, f, g, h, 0, 1, 10, 11), this.drawSegment(b, f, g, h, 2, 3, 12, 13), this.drawSegment(b, f, g, h, 4, 5, 14, 15), this.drawSegment(b, f, g, h, 8, 9, 18, 19), this.drawSegment(b, f, g, h, 10, 11, 20, 21), this.drawSegment(b, f, g, h, 12, 13, 22, 23), this.drawSegment(b, f, g, h, 16, 17, 26, 27), this.drawSegment(b, f, g, h, 18, 19, 28, 29), this.drawSegment(b, f, g, h, 20, 21, 30, 31);
        }, b.prototype.drawSegment = function (a, b, c, d, e, f, g, h) {
          var i = this.uvs,
              j = this.vertices,
              k = (i[g] - i[e]) * c,
              l = (i[h] - i[f]) * d,
              m = j[g] - j[e],
              n = j[h] - j[f];k < 1 && (k = 1), l < 1 && (l = 1), m < 1 && (m = 1), n < 1 && (n = 1), a.drawImage(b, i[e] * c, i[f] * d, k, l, j[e], j[f], m, n);
        }, b.prototype._refresh = function () {
          a.prototype._refresh.call(this);var b = this.uvs,
              c = this._texture;this._origWidth = c.orig.width, this._origHeight = c.orig.height;var d = 1 / this._origWidth,
              e = 1 / this._origHeight;b[0] = b[8] = b[16] = b[24] = 0, b[1] = b[3] = b[5] = b[7] = 0, b[6] = b[14] = b[22] = b[30] = 1, b[25] = b[27] = b[29] = b[31] = 1, b[2] = b[10] = b[18] = b[26] = d * this._leftWidth, b[4] = b[12] = b[20] = b[28] = 1 - d * this._rightWidth, b[9] = b[11] = b[13] = b[15] = e * this._topHeight, b[17] = b[19] = b[21] = b[23] = 1 - e * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.dirty++, this.multiplyUvs();
        }, h(b, [{ key: "width", get: function get() {
            return this._width;
          }, set: function set(a) {
            this._width = a, this._refresh();
          } }, { key: "height", get: function get() {
            return this._height;
          }, set: function set(a) {
            this._height = a, this._refresh();
          } }, { key: "leftWidth", get: function get() {
            return this._leftWidth;
          }, set: function set(a) {
            this._leftWidth = a, this._refresh();
          } }, { key: "rightWidth", get: function get() {
            return this._rightWidth;
          }, set: function set(a) {
            this._rightWidth = a, this._refresh();
          } }, { key: "topHeight", get: function get() {
            return this._topHeight;
          }, set: function set(a) {
            this._topHeight = a, this._refresh();
          } }, { key: "bottomHeight", get: function get() {
            return this._bottomHeight;
          }, set: function set(a) {
            this._bottomHeight = a, this._refresh();
          } }]), b;
      }(j.default);c.default = l;
    }, { "./Plane": 168 }], 168: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("./Mesh"),
          i = d(h),
          j = function (a) {
        function b(c, d, g) {
          e(this, b);var h = f(this, a.call(this, c));return h._ready = !0, h.verticesX = d || 10, h.verticesY = g || 10, h.drawMode = i.default.DRAW_MODES.TRIANGLES, h.refresh(), h;
        }return g(b, a), b.prototype._refresh = function () {
          for (var a = this._texture, b = this.verticesX * this.verticesY, c = [], d = [], e = [], f = [], g = this.verticesX - 1, h = this.verticesY - 1, i = a.width / g, j = a.height / h, k = 0; k < b; k++) {
            var l = k % this.verticesX,
                m = k / this.verticesX | 0;c.push(l * i, m * j), e.push(l / g, m / h);
          }for (var n = g * h, o = 0; o < n; o++) {
            var p = o % g,
                q = o / g | 0,
                r = q * this.verticesX + p,
                s = q * this.verticesX + p + 1,
                t = (q + 1) * this.verticesX + p,
                u = (q + 1) * this.verticesX + p + 1;f.push(r, s, t), f.push(s, u, t);
          }this.vertices = new Float32Array(c), this.uvs = new Float32Array(e), this.colors = new Float32Array(d), this.indices = new Uint16Array(f), this.dirty++, this.indexDirty++, this.multiplyUvs();
        }, b.prototype._onTextureUpdate = function () {
          i.default.prototype._onTextureUpdate.call(this), this._ready && this.refresh();
        }, b;
      }(i.default);c.default = j;
    }, { "./Mesh": 166 }], 169: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("./Mesh"),
          i = d(h),
          j = function (a) {
        function b(c, d) {
          e(this, b);var g = f(this, a.call(this, c));return g.points = d, g.vertices = new Float32Array(4 * d.length), g.uvs = new Float32Array(4 * d.length), g.colors = new Float32Array(2 * d.length), g.indices = new Uint16Array(2 * d.length), g.autoUpdate = !0, g.refresh(), g;
        }return g(b, a), b.prototype._refresh = function () {
          var a = this.points;if (!(a.length < 1) && this._texture._uvs) {
            this.vertices.length / 4 !== a.length && (this.vertices = new Float32Array(4 * a.length), this.uvs = new Float32Array(4 * a.length), this.colors = new Float32Array(2 * a.length), this.indices = new Uint16Array(2 * a.length));var b = this.uvs,
                c = this.indices,
                d = this.colors;b[0] = 0, b[1] = 0, b[2] = 0, b[3] = 1, d[0] = 1, d[1] = 1, c[0] = 0, c[1] = 1;for (var e = a.length, f = 1; f < e; f++) {
              var g = 4 * f,
                  h = f / (e - 1);b[g] = h, b[g + 1] = 0, b[g + 2] = h, b[g + 3] = 1, g = 2 * f, d[g] = 1, d[g + 1] = 1, g = 2 * f, c[g] = g, c[g + 1] = g + 1;
            }this.dirty++, this.indexDirty++, this.multiplyUvs(), this.refreshVertices();
          }
        }, b.prototype.refreshVertices = function () {
          var a = this.points;if (!(a.length < 1)) for (var b = a[0], c = void 0, d = 0, e = 0, f = this.vertices, g = a.length, h = 0; h < g; h++) {
            var i = a[h],
                j = 4 * h;c = h < a.length - 1 ? a[h + 1] : i, e = -(c.x - b.x), d = c.y - b.y;var k = 10 * (1 - h / (g - 1));k > 1 && (k = 1);var l = Math.sqrt(d * d + e * e),
                m = this._texture.height / 2;d /= l, e /= l, d *= m, e *= m, f[j] = i.x + d, f[j + 1] = i.y + e, f[j + 2] = i.x - d, f[j + 3] = i.y - e, b = i;
          }
        }, b.prototype.updateTransform = function () {
          this.autoUpdate && this.refreshVertices(), this.containerUpdateTransform();
        }, b;
      }(i.default);c.default = j;
    }, { "./Mesh": 166 }], 170: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var g = a("../../core"),
          h = e(g),
          i = a("../Mesh"),
          j = d(i),
          k = function () {
        function a(b) {
          f(this, a), this.renderer = b;
        }return a.prototype.render = function (a) {
          var b = this.renderer,
              c = b.context,
              d = a.worldTransform,
              e = b.resolution;b.roundPixels ? c.setTransform(d.a * e, d.b * e, d.c * e, d.d * e, d.tx * e | 0, d.ty * e | 0) : c.setTransform(d.a * e, d.b * e, d.c * e, d.d * e, d.tx * e, d.ty * e), b.setBlendMode(a.blendMode), a.drawMode === j.default.DRAW_MODES.TRIANGLE_MESH ? this._renderTriangleMesh(a) : this._renderTriangles(a);
        }, a.prototype._renderTriangleMesh = function (a) {
          for (var b = a.vertices.length / 2, c = 0; c < b - 2; c++) {
            var d = 2 * c;this._renderDrawTriangle(a, d, d + 2, d + 4);
          }
        }, a.prototype._renderTriangles = function (a) {
          for (var b = a.indices, c = b.length, d = 0; d < c; d += 3) {
            var e = 2 * b[d],
                f = 2 * b[d + 1],
                g = 2 * b[d + 2];this._renderDrawTriangle(a, e, f, g);
          }
        }, a.prototype._renderDrawTriangle = function (a, b, c, d) {
          var e = this.renderer.context,
              f = a.uvs,
              g = a.vertices,
              h = a._texture;if (h.valid) {
            var i = h.baseTexture,
                j = i.source,
                k = i.width,
                l = i.height,
                m = void 0,
                n = void 0,
                o = void 0,
                p = void 0,
                q = void 0,
                r = void 0;if (a.uploadUvTransform) {
              var s = a._uvTransform.mapCoord;m = (f[b] * s.a + f[b + 1] * s.c + s.tx) * i.width, n = (f[c] * s.a + f[c + 1] * s.c + s.tx) * i.width, o = (f[d] * s.a + f[d + 1] * s.c + s.tx) * i.width, p = (f[b] * s.b + f[b + 1] * s.d + s.ty) * i.height, q = (f[c] * s.b + f[c + 1] * s.d + s.ty) * i.height, r = (f[d] * s.b + f[d + 1] * s.d + s.ty) * i.height;
            } else m = f[b] * i.width, n = f[c] * i.width, o = f[d] * i.width, p = f[b + 1] * i.height, q = f[c + 1] * i.height, r = f[d + 1] * i.height;var t = g[b],
                u = g[c],
                v = g[d],
                w = g[b + 1],
                x = g[c + 1],
                y = g[d + 1];if (a.canvasPadding > 0) {
              var z = a.canvasPadding / a.worldTransform.a,
                  A = a.canvasPadding / a.worldTransform.d,
                  B = (t + u + v) / 3,
                  C = (w + x + y) / 3,
                  D = t - B,
                  E = w - C,
                  F = Math.sqrt(D * D + E * E);t = B + D / F * (F + z), w = C + E / F * (F + A), D = u - B, E = x - C, F = Math.sqrt(D * D + E * E), u = B + D / F * (F + z), x = C + E / F * (F + A), D = v - B, E = y - C, F = Math.sqrt(D * D + E * E), v = B + D / F * (F + z), y = C + E / F * (F + A);
            }e.save(), e.beginPath(), e.moveTo(t, w), e.lineTo(u, x), e.lineTo(v, y), e.closePath(), e.clip();var G = m * q + p * o + n * r - q * o - p * n - m * r,
                H = t * q + p * v + u * r - q * v - p * u - t * r,
                I = m * u + t * o + n * v - u * o - t * n - m * v,
                J = m * q * v + p * u * o + t * n * r - t * q * o - p * n * v - m * u * r,
                K = w * q + p * y + x * r - q * y - p * x - w * r,
                L = m * x + w * o + n * y - x * o - w * n - m * y,
                M = m * q * y + p * x * o + w * n * r - w * q * o - p * n * y - m * x * r;e.transform(H / G, K / G, I / G, L / G, J / G, M / G), e.drawImage(j, 0, 0, k * i.resolution, l * i.resolution, 0, 0, k, l), e.restore(), this.renderer.invalidateBlendMode();
          }
        }, a.prototype.renderMeshFlat = function (a) {
          var b = this.renderer.context,
              c = a.vertices,
              d = c.length / 2;b.beginPath();for (var e = 1; e < d - 2; ++e) {
            var f = 2 * e,
                g = c[f],
                h = c[f + 1],
                i = c[f + 2],
                j = c[f + 3],
                k = c[f + 4],
                l = c[f + 5];b.moveTo(g, h), b.lineTo(i, j), b.lineTo(k, l);
          }b.fillStyle = "#FF0000", b.fill(), b.closePath();
        }, a.prototype.destroy = function () {
          this.renderer = null;
        }, a;
      }();c.default = k, h.CanvasRenderer.registerPlugin("mesh", k);
    }, { "../../core": 65, "../Mesh": 166 }], 171: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0;var e = a("./Mesh");Object.defineProperty(c, "Mesh", { enumerable: !0, get: function get() {
          return d(e).default;
        } });var f = a("./webgl/MeshRenderer");Object.defineProperty(c, "MeshRenderer", { enumerable: !0, get: function get() {
          return d(f).default;
        } });var g = a("./canvas/CanvasMeshRenderer");Object.defineProperty(c, "CanvasMeshRenderer", { enumerable: !0, get: function get() {
          return d(g).default;
        } });var h = a("./Plane");Object.defineProperty(c, "Plane", { enumerable: !0, get: function get() {
          return d(h).default;
        } });var i = a("./NineSlicePlane");Object.defineProperty(c, "NineSlicePlane", { enumerable: !0, get: function get() {
          return d(i).default;
        } });var j = a("./Rope");Object.defineProperty(c, "Rope", { enumerable: !0, get: function get() {
          return d(j).default;
        } });
    }, { "./Mesh": 166, "./NineSlicePlane": 167, "./Plane": 168, "./Rope": 169, "./canvas/CanvasMeshRenderer": 170, "./webgl/MeshRenderer": 172 }], 172: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var i = a("../../core"),
          j = e(i),
          k = a("pixi-gl-core"),
          l = d(k),
          m = a("../Mesh"),
          n = d(m),
          o = (a("path"), j.Matrix.IDENTITY),
          p = function (a) {
        function b(c) {
          f(this, b);var d = g(this, a.call(this, c));return d.shader = null, d;
        }return h(b, a), b.prototype.onContextChange = function () {
          var a = this.renderer.gl;this.shader = new j.Shader(a, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n");
        }, b.prototype.render = function (a) {
          var b = this.renderer,
              c = b.gl,
              d = a._texture;if (d.valid) {
            var e = a._glDatas[b.CONTEXT_UID];e || (b.bindVao(null), e = { shader: this.shader, vertexBuffer: l.default.GLBuffer.createVertexBuffer(c, a.vertices, c.STREAM_DRAW), uvBuffer: l.default.GLBuffer.createVertexBuffer(c, a.uvs, c.STREAM_DRAW), indexBuffer: l.default.GLBuffer.createIndexBuffer(c, a.indices, c.STATIC_DRAW), vao: null, dirty: a.dirty, indexDirty: a.indexDirty }, e.vao = new l.default.VertexArrayObject(c).addIndex(e.indexBuffer).addAttribute(e.vertexBuffer, e.shader.attributes.aVertexPosition, c.FLOAT, !1, 8, 0).addAttribute(e.uvBuffer, e.shader.attributes.aTextureCoord, c.FLOAT, !1, 8, 0), a._glDatas[b.CONTEXT_UID] = e), b.bindVao(e.vao), a.dirty !== e.dirty && (e.dirty = a.dirty, e.uvBuffer.upload(a.uvs)), a.indexDirty !== e.indexDirty && (e.indexDirty = a.indexDirty, e.indexBuffer.upload(a.indices)), e.vertexBuffer.upload(a.vertices), b.bindShader(e.shader), e.shader.uniforms.uSampler = b.bindTexture(d), b.state.setBlendMode(j.utils.correctBlendMode(a.blendMode, d.baseTexture.premultipliedAlpha)), e.shader.uniforms.uTransform && (a.uploadUvTransform ? e.shader.uniforms.uTransform = a._uvTransform.mapCoord.toArray(!0) : e.shader.uniforms.uTransform = o.toArray(!0)), e.shader.uniforms.translationMatrix = a.worldTransform.toArray(!0), e.shader.uniforms.uColor = j.utils.premultiplyRgba(a.tintRgb, a.worldAlpha, e.shader.uniforms.uColor, d.baseTexture.premultipliedAlpha);var f = a.drawMode === n.default.DRAW_MODES.TRIANGLE_MESH ? c.TRIANGLE_STRIP : c.TRIANGLES;e.vao.draw(f, a.indices.length, 0);
          }
        }, b;
      }(j.ObjectRenderer);c.default = p, j.WebGLRenderer.registerPlugin("mesh", p);
    }, { "../../core": 65, "../Mesh": 166, path: 23, "pixi-gl-core": 12 }], 173: [function (a, b, c) {
      "use strict";
      function d(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = function () {
        function a(a, b) {
          for (var c = 0; c < b.length; c++) {
            var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
          }
        }return function (b, c, d) {
          return c && a(b.prototype, c), d && a(b, d), b;
        };
      }(),
          i = a("../core"),
          j = d(i),
          k = a("../core/utils"),
          l = function (a) {
        function b() {
          var c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1500,
              d = arguments[1],
              g = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 16384,
              h = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];e(this, b);var i = f(this, a.call(this)),
              k = 16384;return g > k && (g = k), g > c && (g = c), i._properties = [!1, !0, !1, !1, !1], i._maxSize = c, i._batchSize = g, i._glBuffers = {}, i._bufferToUpdate = 0, i.interactiveChildren = !1, i.blendMode = j.BLEND_MODES.NORMAL, i.autoResize = h, i.roundPixels = !0, i.baseTexture = null, i.setProperties(d), i._tint = 0, i.tintRgb = new Float32Array(4), i.tint = 16777215, i;
        }return g(b, a), b.prototype.setProperties = function (a) {
          a && (this._properties[0] = "scale" in a ? !!a.scale : this._properties[0], this._properties[1] = "position" in a ? !!a.position : this._properties[1], this._properties[2] = "rotation" in a ? !!a.rotation : this._properties[2], this._properties[3] = "uvs" in a ? !!a.uvs : this._properties[3], this._properties[4] = "alpha" in a || "tint" in a ? !!a.alpha || !!a.tint : this._properties[4]);
        }, b.prototype.updateTransform = function () {
          this.displayObjectUpdateTransform();
        }, b.prototype.renderWebGL = function (a) {
          var b = this;this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.hasLoaded || this.baseTexture.once("update", function () {
            return b.onChildrenChange(0);
          })), a.setObjectRenderer(a.plugins.particle), a.plugins.particle.render(this));
        }, b.prototype.onChildrenChange = function (a) {
          var b = Math.floor(a / this._batchSize);b < this._bufferToUpdate && (this._bufferToUpdate = b);
        }, b.prototype.renderCanvas = function (a) {
          if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
            var b = a.context,
                c = this.worldTransform,
                d = !0,
                e = 0,
                f = 0,
                g = 0,
                h = 0;a.setBlendMode(this.blendMode), b.globalAlpha = this.worldAlpha, this.displayObjectUpdateTransform();for (var i = 0; i < this.children.length; ++i) {
              var j = this.children[i];if (j.visible) {
                var k = j._texture.frame;if (b.globalAlpha = this.worldAlpha * j.alpha, j.rotation % (2 * Math.PI) === 0) d && (b.setTransform(c.a, c.b, c.c, c.d, c.tx * a.resolution, c.ty * a.resolution), d = !1), e = j.anchor.x * (-k.width * j.scale.x) + j.position.x + .5, f = j.anchor.y * (-k.height * j.scale.y) + j.position.y + .5, g = k.width * j.scale.x, h = k.height * j.scale.y;else {
                  d || (d = !0), j.displayObjectUpdateTransform();var l = j.worldTransform;a.roundPixels ? b.setTransform(l.a, l.b, l.c, l.d, l.tx * a.resolution | 0, l.ty * a.resolution | 0) : b.setTransform(l.a, l.b, l.c, l.d, l.tx * a.resolution, l.ty * a.resolution), e = j.anchor.x * -k.width + .5, f = j.anchor.y * -k.height + .5, g = k.width, h = k.height;
                }var m = j._texture.baseTexture.resolution;b.drawImage(j._texture.baseTexture.source, k.x * m, k.y * m, k.width * m, k.height * m, e * a.resolution, f * a.resolution, g * a.resolution, h * a.resolution);
              }
            }
          }
        }, b.prototype.destroy = function (b) {
          if (a.prototype.destroy.call(this, b), this._buffers) for (var c = 0; c < this._buffers.length; ++c) {
            this._buffers[c].destroy();
          }this._properties = null, this._buffers = null;
        }, h(b, [{ key: "tint", get: function get() {
            return this._tint;
          }, set: function set(a) {
            this._tint = a, (0, k.hex2rgb)(a, this.tintRgb);
          } }]), b;
      }(j.Container);c.default = l;
    }, { "../core": 65, "../core/utils": 125 }], 174: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0;var e = a("./ParticleContainer");Object.defineProperty(c, "ParticleContainer", { enumerable: !0, get: function get() {
          return d(e).default;
        } });var f = a("./webgl/ParticleRenderer");Object.defineProperty(c, "ParticleRenderer", { enumerable: !0, get: function get() {
          return d(f).default;
        } });
    }, { "./ParticleContainer": 173, "./webgl/ParticleRenderer": 176 }], 175: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var f = a("pixi-gl-core"),
          g = d(f),
          h = a("../../core/utils/createIndicesForQuads"),
          i = d(h),
          j = function () {
        function a(b, c, d, f) {
          e(this, a), this.gl = b, this.size = f, this.dynamicProperties = [], this.staticProperties = [];for (var g = 0; g < c.length; ++g) {
            var h = c[g];h = { attribute: h.attribute, size: h.size, uploadFunction: h.uploadFunction, unsignedByte: h.unsignedByte, offset: h.offset }, d[g] ? this.dynamicProperties.push(h) : this.staticProperties.push(h);
          }this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.initBuffers();
        }return a.prototype.initBuffers = function () {
          var a = this.gl,
              b = 0;this.indices = (0, i.default)(this.size), this.indexBuffer = g.default.GLBuffer.createIndexBuffer(a, this.indices, a.STATIC_DRAW), this.dynamicStride = 0;for (var c = 0; c < this.dynamicProperties.length; ++c) {
            var d = this.dynamicProperties[c];d.offset = b, b += d.size, this.dynamicStride += d.size;
          }var e = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);this.dynamicData = new Float32Array(e), this.dynamicDataUint32 = new Uint32Array(e), this.dynamicBuffer = g.default.GLBuffer.createVertexBuffer(a, e, a.STREAM_DRAW);var f = 0;this.staticStride = 0;for (var h = 0; h < this.staticProperties.length; ++h) {
            var j = this.staticProperties[h];j.offset = f, f += j.size, this.staticStride += j.size;
          }var k = new ArrayBuffer(this.size * this.staticStride * 4 * 4);this.staticData = new Float32Array(k), this.staticDataUint32 = new Uint32Array(k), this.staticBuffer = g.default.GLBuffer.createVertexBuffer(a, k, a.STATIC_DRAW), this.vao = new g.default.VertexArrayObject(a).addIndex(this.indexBuffer);for (var l = 0; l < this.dynamicProperties.length; ++l) {
            var m = this.dynamicProperties[l];m.unsignedByte ? this.vao.addAttribute(this.dynamicBuffer, m.attribute, a.UNSIGNED_BYTE, !0, 4 * this.dynamicStride, 4 * m.offset) : this.vao.addAttribute(this.dynamicBuffer, m.attribute, a.FLOAT, !1, 4 * this.dynamicStride, 4 * m.offset);
          }for (var n = 0; n < this.staticProperties.length; ++n) {
            var o = this.staticProperties[n];o.unsignedByte ? this.vao.addAttribute(this.staticBuffer, o.attribute, a.UNSIGNED_BYTE, !0, 4 * this.staticStride, 4 * o.offset) : this.vao.addAttribute(this.staticBuffer, o.attribute, a.FLOAT, !1, 4 * this.staticStride, 4 * o.offset);
          }
        }, a.prototype.uploadDynamic = function (a, b, c) {
          for (var d = 0; d < this.dynamicProperties.length; d++) {
            var e = this.dynamicProperties[d];e.uploadFunction(a, b, c, e.unsignedByte ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, e.offset);
          }this.dynamicBuffer.upload();
        }, a.prototype.uploadStatic = function (a, b, c) {
          for (var d = 0; d < this.staticProperties.length; d++) {
            var e = this.staticProperties[d];e.uploadFunction(a, b, c, e.unsignedByte ? this.staticDataUint32 : this.staticData, this.staticStride, e.offset);
          }this.staticBuffer.upload();
        }, a.prototype.destroy = function () {
          this.dynamicProperties = null, this.dynamicBuffer.destroy(), this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer.destroy(), this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null;
        }, a;
      }();c.default = j;
    }, { "../../core/utils/createIndicesForQuads": 123, "pixi-gl-core": 12 }], 176: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var i = a("../../core"),
          j = e(i),
          k = a("./ParticleShader"),
          l = d(k),
          m = a("./ParticleBuffer"),
          n = d(m),
          o = a("../../core/utils"),
          p = function (a) {
        function b(c) {
          f(this, b);var d = g(this, a.call(this, c));return d.shader = null, d.indexBuffer = null, d.properties = null, d.tempMatrix = new j.Matrix(), d.CONTEXT_UID = 0, d;
        }return h(b, a), b.prototype.onContextChange = function () {
          var a = this.renderer.gl;this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.shader = new l.default(a), this.properties = [{ attribute: this.shader.attributes.aVertexPosition, size: 2, uploadFunction: this.uploadVertices, offset: 0 }, { attribute: this.shader.attributes.aPositionCoord, size: 2, uploadFunction: this.uploadPosition, offset: 0 }, { attribute: this.shader.attributes.aRotation, size: 1, uploadFunction: this.uploadRotation, offset: 0 }, { attribute: this.shader.attributes.aTextureCoord, size: 2, uploadFunction: this.uploadUvs, offset: 0 }, { attribute: this.shader.attributes.aColor, size: 1, unsignedByte: !0, uploadFunction: this.uploadTint, offset: 0 }];
        }, b.prototype.start = function () {
          this.renderer.bindShader(this.shader);
        }, b.prototype.render = function (a) {
          var b = a.children,
              c = a._maxSize,
              d = a._batchSize,
              e = this.renderer,
              f = b.length;if (0 !== f) {
            f > c && (f = c);var g = a._glBuffers[e.CONTEXT_UID];g || (g = a._glBuffers[e.CONTEXT_UID] = this.generateBuffers(a));var h = b[0]._texture.baseTexture;this.renderer.setBlendMode(j.utils.correctBlendMode(a.blendMode, h.premultipliedAlpha));var i = e.gl,
                k = a.worldTransform.copy(this.tempMatrix);k.prepend(e._activeRenderTarget.projectionMatrix), this.shader.uniforms.projectionMatrix = k.toArray(!0), this.shader.uniforms.uColor = j.utils.premultiplyRgba(a.tintRgb, a.worldAlpha, this.shader.uniforms.uColor, h.premultipliedAlpha), this.shader.uniforms.uSampler = e.bindTexture(h);for (var l = 0, m = 0; l < f; l += d, m += 1) {
              var n = f - l;if (n > d && (n = d), m >= g.length) {
                if (!a.autoResize) break;g.push(this._generateOneMoreBuffer(a));
              }var o = g[m];o.uploadDynamic(b, l, n), a._bufferToUpdate === m && (o.uploadStatic(b, l, n), a._bufferToUpdate = m + 1), e.bindVao(o.vao), o.vao.draw(i.TRIANGLES, 6 * n);
            }
          }
        }, b.prototype.generateBuffers = function (a) {
          for (var b = this.renderer.gl, c = [], d = a._maxSize, e = a._batchSize, f = a._properties, g = 0; g < d; g += e) {
            c.push(new n.default(b, this.properties, f, e));
          }return c;
        }, b.prototype._generateOneMoreBuffer = function (a) {
          var b = this.renderer.gl,
              c = a._batchSize,
              d = a._properties;return new n.default(b, this.properties, d, c);
        }, b.prototype.uploadVertices = function (a, b, c, d, e, f) {
          for (var g = 0, h = 0, i = 0, j = 0, k = 0; k < c; ++k) {
            var l = a[b + k],
                m = l._texture,
                n = l.scale.x,
                o = l.scale.y,
                p = m.trim,
                q = m.orig;p ? (h = p.x - l.anchor.x * q.width, g = h + p.width, j = p.y - l.anchor.y * q.height, i = j + p.height) : (g = q.width * (1 - l.anchor.x), h = q.width * -l.anchor.x, i = q.height * (1 - l.anchor.y), j = q.height * -l.anchor.y), d[f] = h * n, d[f + 1] = j * o, d[f + e] = g * n, d[f + e + 1] = j * o, d[f + 2 * e] = g * n, d[f + 2 * e + 1] = i * o, d[f + 3 * e] = h * n, d[f + 3 * e + 1] = i * o, f += 4 * e;
          }
        }, b.prototype.uploadPosition = function (a, b, c, d, e, f) {
          for (var g = 0; g < c; g++) {
            var h = a[b + g].position;d[f] = h.x, d[f + 1] = h.y, d[f + e] = h.x, d[f + e + 1] = h.y, d[f + 2 * e] = h.x, d[f + 2 * e + 1] = h.y, d[f + 3 * e] = h.x, d[f + 3 * e + 1] = h.y, f += 4 * e;
          }
        }, b.prototype.uploadRotation = function (a, b, c, d, e, f) {
          for (var g = 0; g < c; g++) {
            var h = a[b + g].rotation;d[f] = h, d[f + e] = h, d[f + 2 * e] = h, d[f + 3 * e] = h, f += 4 * e;
          }
        }, b.prototype.uploadUvs = function (a, b, c, d, e, f) {
          for (var g = 0; g < c; ++g) {
            var h = a[b + g]._texture._uvs;h ? (d[f] = h.x0, d[f + 1] = h.y0, d[f + e] = h.x1, d[f + e + 1] = h.y1, d[f + 2 * e] = h.x2, d[f + 2 * e + 1] = h.y2, d[f + 3 * e] = h.x3, d[f + 3 * e + 1] = h.y3, f += 4 * e) : (d[f] = 0, d[f + 1] = 0, d[f + e] = 0, d[f + e + 1] = 0, d[f + 2 * e] = 0, d[f + 2 * e + 1] = 0, d[f + 3 * e] = 0, d[f + 3 * e + 1] = 0, f += 4 * e);
          }
        }, b.prototype.uploadTint = function (a, b, c, d, e, f) {
          for (var g = 0; g < c; ++g) {
            var h = a[b + g],
                i = h._texture.baseTexture.premultipliedAlpha,
                j = h.alpha,
                k = j < 1 && i ? (0, o.premultiplyTint)(h._tintRGB, j) : h._tintRGB + (255 * j << 24);d[f] = k, d[f + e] = k, d[f + 2 * e] = k, d[f + 3 * e] = k, f += 4 * e;
          }
        }, b.prototype.destroy = function () {
          this.renderer.gl && this.renderer.gl.deleteBuffer(this.indexBuffer), a.prototype.destroy.call(this), this.shader.destroy(), this.indices = null, this.tempMatrix = null;
        }, b;
      }(j.ObjectRenderer);c.default = p, j.WebGLRenderer.registerPlugin("particle", p);
    }, { "../../core": 65, "../../core/utils": 125, "./ParticleBuffer": 175, "./ParticleShader": 177 }], 177: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function f(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function g(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }c.__esModule = !0;var h = a("../../core/Shader"),
          i = d(h),
          j = function (a) {
        function b(c) {
          return e(this, b), f(this, a.call(this, c, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "uniform vec4 uColor;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   vec2 v = vec2(x, y);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor * uColor;", "}"].join("\n"), ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void){", "  vec4 color = texture2D(uSampler, vTextureCoord) * vColor;", "  gl_FragColor = color;", "}"].join("\n")));
        }return g(b, a), b;
      }(i.default);c.default = j;
    }, { "../../core/Shader": 44 }], 178: [function (a, b, c) {
      "use strict";
      Math.sign || (Math.sign = function (a) {
        return a = Number(a), 0 === a || isNaN(a) ? a : a > 0 ? 1 : -1;
      });
    }, {}], 179: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }var e = a("object-assign"),
          f = d(e);Object.assign || (Object.assign = f.default);
    }, { "object-assign": 5 }], 180: [function (a, b, c) {
      "use strict";
      a("./Object.assign"), a("./requestAnimationFrame"), a("./Math.sign"), window.ArrayBuffer || (window.ArrayBuffer = Array), window.Float32Array || (window.Float32Array = Array), window.Uint32Array || (window.Uint32Array = Array), window.Uint16Array || (window.Uint16Array = Array);
    }, { "./Math.sign": 178, "./Object.assign": 179, "./requestAnimationFrame": 181 }], 181: [function (a, b, c) {
      (function (a) {
        "use strict";
        var b = 16;if (Date.now && Date.prototype.getTime || (Date.now = function () {
          return new Date().getTime();
        }), !a.performance || !a.performance.now) {
          var c = Date.now();a.performance || (a.performance = {}), a.performance.now = function () {
            return Date.now() - c;
          };
        }for (var d = Date.now(), e = ["ms", "moz", "webkit", "o"], f = 0; f < e.length && !a.requestAnimationFrame; ++f) {
          var g = e[f];a.requestAnimationFrame = a[g + "RequestAnimationFrame"], a.cancelAnimationFrame = a[g + "CancelAnimationFrame"] || a[g + "CancelRequestAnimationFrame"];
        }a.requestAnimationFrame || (a.requestAnimationFrame = function (a) {
          if ("function" != typeof a) throw new TypeError(a + "is not a function");var c = Date.now(),
              e = b + d - c;return e < 0 && (e = 0), d = c, setTimeout(function () {
            d = Date.now(), a(performance.now());
          }, e);
        }), a.cancelAnimationFrame || (a.cancelAnimationFrame = function (a) {
          return clearTimeout(a);
        });
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}], 182: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        var c = !1;if (a && a._textures && a._textures.length) for (var d = 0; d < a._textures.length; d++) {
          if (a._textures[d] instanceof o.Texture) {
            var e = a._textures[d].baseTexture;b.indexOf(e) === -1 && (b.push(e), c = !0);
          }
        }return c;
      }function h(a, b) {
        return a instanceof o.BaseTexture && (b.indexOf(a) === -1 && b.push(a), !0);
      }function i(a, b) {
        if (a._texture && a._texture instanceof o.Texture) {
          var c = a._texture.baseTexture;return b.indexOf(c) === -1 && b.push(c), !0;
        }return !1;
      }function j(a, b) {
        return b instanceof o.Text && (b.updateText(!0), !0);
      }function k(a, b) {
        if (b instanceof o.TextStyle) {
          var c = b.toFontString();return o.TextMetrics.measureFont(c), !0;
        }return !1;
      }function l(a, b) {
        if (a instanceof o.Text) {
          b.indexOf(a.style) === -1 && b.push(a.style), b.indexOf(a) === -1 && b.push(a);var c = a._texture.baseTexture;return b.indexOf(c) === -1 && b.push(c), !0;
        }return !1;
      }function m(a, b) {
        return a instanceof o.TextStyle && (b.indexOf(a) === -1 && b.push(a), !0);
      }c.__esModule = !0;var n = a("../core"),
          o = e(n),
          p = a("./limiters/CountLimiter"),
          q = d(p),
          r = o.ticker.shared;o.settings.UPLOADS_PER_FRAME = 4;var s = function () {
        function a(b) {
          var c = this;f(this, a), this.limiter = new q.default(o.settings.UPLOADS_PER_FRAME), this.renderer = b, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function () {
            c.queue && c.prepareItems();
          }, this.registerFindHook(l), this.registerFindHook(m), this.registerFindHook(g), this.registerFindHook(h), this.registerFindHook(i), this.registerUploadHook(j), this.registerUploadHook(k);
        }return a.prototype.upload = function (a, b) {
          "function" == typeof a && (b = a, a = null), a && this.add(a), this.queue.length ? (b && this.completes.push(b), this.ticking || (this.ticking = !0, r.addOnce(this.tick, this, o.UPDATE_PRIORITY.UTILITY))) : b && b();
        }, a.prototype.tick = function () {
          setTimeout(this.delayedTick, 0);
        }, a.prototype.prepareItems = function () {
          for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload();) {
            var a = this.queue[0],
                b = !1;if (a && !a._destroyed) for (var c = 0, d = this.uploadHooks.length; c < d; c++) {
              if (this.uploadHooks[c](this.uploadHookHelper, a)) {
                this.queue.shift(), b = !0;break;
              }
            }b || this.queue.shift();
          }if (this.queue.length) r.addOnce(this.tick, this, o.UPDATE_PRIORITY.UTILITY);else {
            this.ticking = !1;var e = this.completes.slice(0);this.completes.length = 0;for (var f = 0, g = e.length; f < g; f++) {
              e[f]();
            }
          }
        }, a.prototype.registerFindHook = function (a) {
          return a && this.addHooks.push(a), this;
        }, a.prototype.registerUploadHook = function (a) {
          return a && this.uploadHooks.push(a), this;
        }, a.prototype.add = function (a) {
          for (var b = 0, c = this.addHooks.length; b < c && !this.addHooks[b](a, this.queue); b++) {}if (a instanceof o.Container) for (var d = a.children.length - 1; d >= 0; d--) {
            this.add(a.children[d]);
          }return this;
        }, a.prototype.destroy = function () {
          this.ticking && r.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null;
        }, a;
      }();c.default = s;
    }, { "../core": 65, "./limiters/CountLimiter": 185 }], 183: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }function i(a, b) {
        if (b instanceof k.BaseTexture) {
          var c = b.source,
              d = 0 === c.width ? a.canvas.width : Math.min(a.canvas.width, c.width),
              e = 0 === c.height ? a.canvas.height : Math.min(a.canvas.height, c.height);return a.ctx.drawImage(c, 0, 0, d, e, 0, 0, a.canvas.width, a.canvas.height), !0;
        }return !1;
      }c.__esModule = !0;var j = a("../../core"),
          k = e(j),
          l = a("../BasePrepare"),
          m = d(l),
          n = 16,
          o = function (a) {
        function b(c) {
          f(this, b);var d = g(this, a.call(this, c));return d.uploadHookHelper = d, d.canvas = document.createElement("canvas"), d.canvas.width = n, d.canvas.height = n, d.ctx = d.canvas.getContext("2d"), d.registerUploadHook(i), d;
        }return h(b, a), b.prototype.destroy = function () {
          a.prototype.destroy.call(this), this.ctx = null, this.canvas = null;
        }, b;
      }(m.default);c.default = o, k.CanvasRenderer.registerPlugin("prepare", o);
    }, { "../../core": 65, "../BasePrepare": 182 }], 184: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }c.__esModule = !0;var e = a("./webgl/WebGLPrepare");Object.defineProperty(c, "webgl", { enumerable: !0, get: function get() {
          return d(e).default;
        } });var f = a("./canvas/CanvasPrepare");Object.defineProperty(c, "canvas", { enumerable: !0, get: function get() {
          return d(f).default;
        } });var g = a("./BasePrepare");Object.defineProperty(c, "BasePrepare", { enumerable: !0, get: function get() {
          return d(g).default;
        } });var h = a("./limiters/CountLimiter");Object.defineProperty(c, "CountLimiter", { enumerable: !0, get: function get() {
          return d(h).default;
        } });var i = a("./limiters/TimeLimiter");Object.defineProperty(c, "TimeLimiter", { enumerable: !0, get: function get() {
          return d(i).default;
        } });
    }, { "./BasePrepare": 182, "./canvas/CanvasPrepare": 183, "./limiters/CountLimiter": 185, "./limiters/TimeLimiter": 186, "./webgl/WebGLPrepare": 187 }], 185: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(b) {
          d(this, a), this.maxItemsPerFrame = b, this.itemsLeft = 0;
        }return a.prototype.beginFrame = function () {
          this.itemsLeft = this.maxItemsPerFrame;
        }, a.prototype.allowedToUpload = function () {
          return this.itemsLeft-- > 0;
        }, a;
      }();c.default = e;
    }, {}], 186: [function (a, b, c) {
      "use strict";
      function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }c.__esModule = !0;var e = function () {
        function a(b) {
          d(this, a), this.maxMilliseconds = b, this.frameStart = 0;
        }return a.prototype.beginFrame = function () {
          this.frameStart = Date.now();
        }, a.prototype.allowedToUpload = function () {
          return Date.now() - this.frameStart < this.maxMilliseconds;
        }, a;
      }();c.default = e;
    }, {}], 187: [function (a, b, c) {
      "use strict";
      function d(a) {
        return a && a.__esModule ? a : { default: a };
      }function e(a) {
        if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
          Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
        }return b.default = a, b;
      }function f(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
      }function g(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !b || "object" != (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" != typeof b ? a : b;
      }function h(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + (typeof b === "undefined" ? "undefined" : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
      }function i(a, b) {
        return b instanceof m.BaseTexture && (b._glTextures[a.CONTEXT_UID] || a.textureManager.updateTexture(b), !0);
      }function j(a, b) {
        return b instanceof m.Graphics && ((b.dirty || b.clearDirty || !b._webGL[a.plugins.graphics.CONTEXT_UID]) && a.plugins.graphics.updateGraphics(b), !0);
      }function k(a, b) {
        return a instanceof m.Graphics && (b.push(a), !0);
      }c.__esModule = !0;var l = a("../../core"),
          m = e(l),
          n = a("../BasePrepare"),
          o = d(n),
          p = function (a) {
        function b(c) {
          f(this, b);var d = g(this, a.call(this, c));return d.uploadHookHelper = d.renderer, d.registerFindHook(k), d.registerUploadHook(i), d.registerUploadHook(j), d;
        }return h(b, a), b;
      }(o.default);c.default = p, m.WebGLRenderer.registerPlugin("prepare", p);
    }, { "../../core": 65, "../BasePrepare": 182 }], 188: [function (a, b, c) {
      (function (b) {
        "use strict";
        function d(a) {
          if (a && a.__esModule) return a;var b = {};if (null != a) for (var c in a) {
            Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
          }return b.default = a, b;
        }function e(a) {
          return a && a.__esModule ? a : { default: a };
        }c.__esModule = !0, c.loader = c.prepare = c.particles = c.mesh = c.loaders = c.interaction = c.filters = c.extras = c.extract = c.accessibility = void 0;var f = a("./polyfill");Object.keys(f).forEach(function (a) {
          "default" !== a && "__esModule" !== a && Object.defineProperty(c, a, { enumerable: !0, get: function get() {
              return f[a];
            } });
        });var g = a("./core");Object.keys(g).forEach(function (a) {
          "default" !== a && "__esModule" !== a && Object.defineProperty(c, a, { enumerable: !0, get: function get() {
              return g[a];
            } });
        });var h = a("./deprecation"),
            i = e(h),
            j = a("./accessibility"),
            k = d(j),
            l = a("./extract"),
            m = d(l),
            n = a("./extras"),
            o = d(n),
            p = a("./filters"),
            q = d(p),
            r = a("./interaction"),
            s = d(r),
            t = a("./loaders"),
            u = d(t),
            v = a("./mesh"),
            w = d(v),
            x = a("./particles"),
            y = d(x),
            z = a("./prepare"),
            A = d(z);g.utils.mixins.performMixins();var B = u.shared || null;c.accessibility = k, c.extract = m, c.extras = o, c.filters = q, c.interaction = s, c.loaders = u, c.mesh = w, c.particles = y, c.prepare = A, c.loader = B, "function" == typeof i.default && (0, i.default)(c), b.PIXI = c;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, { "./accessibility": 42, "./core": 65, "./deprecation": 131, "./extract": 133, "./extras": 141, "./filters": 153, "./interaction": 159, "./loaders": 162, "./mesh": 171, "./particles": 174, "./polyfill": 180, "./prepare": 184 }] }, {}, [188])(188);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var jQuery = __webpack_require__(0);
var Config = __webpack_require__(1);
var Scene = __webpack_require__(5);

var LocationMap = {};
/**
 * @description 默认参数
 */
LocationMap.defaults = {
    /** web socket */
    "webSocket_url": "ws://localhost:8080/pkui/noauth/websocket/getPosition",
    "webSocket_onOpen": "establishSocketCallback",
    "webSocket_onMessage": "receivedMessageCallback",
    "webSocket_onClose": "closeSocketCallback",
    "webSocket_onError": "socketErrorCallback",
    /** 请求 人员信息列表 的URL */
    "personInfoListUrl": "../test/personInfoListData.json",
    /** 点击定位标签后的回调（函数名） */
    "onClickPerson": "clickPersonCallback",
    /** 资源目录 */
    "resourcesDir": "./asset/",
    /** 坐标转换器（函数名） */
    "positionConverter": "positionConverter"
};

/**
 * @description 初始化
 */
LocationMap.init = function () {
    this.declare();
    this.start();
};

/**
 * @description 声明
 */
LocationMap.declare = function () {

    this.$target = jQuery("[data-toggle=\"LocationMap\"]");

    this.options = jQuery.extend(true, {}, this.defaults, this.$target.data("options"));
};

/**
 * @description 设置 Config 的参数
 */
LocationMap.setConfigOptions = function () {

    Config.personInfoListUrl = this.options.personInfoListUrl;

    if (this.options.positionConverter) {
        Config.convertPosition = window[this.options.positionConverter];
    }
};

/**
 * @description 开始
 */
LocationMap.start = function () {
    var _this = this;

    this.setConfigOptions();

    this.requestPersonInfoList(function () {
        _this.createScene(function () {
            _this.createWebSocket();
        });
    });
};

/**
 * @description 请求人员信息列表
 * @param callback
 */
LocationMap.requestPersonInfoList = function (callback) {
    console.info("1/3：【请求人员信息列表】...");

    Config.requestPersonInfoList(function () {
        console.info("1/3：【请求人员信息列表】成功！");
        callback && callback();
    }, function () {
        console.error("1/3：【请求人员信息列表】失败！");
    });
};

/**
 * @description 创建场景
 * @param callback
 */
LocationMap.createScene = function (callback) {
    console.info("2/3：【创建场景】...");
    this.scene = new Scene(this.$target.get(0), {
        resourcesDir: this.options.resourcesDir,
        onClickPerson: window[this.options.onClickPerson]
    });

    this.scene.init(function () {
        console.info("2/3：【创建场景】成功！");
        callback && callback();
    });
};

/**
 * @description 创建 web socket 连接
 */
LocationMap.createWebSocket = function () {
    var options = this.options,
        onOpenCallback = window[options.webSocket_onOpen],
        onMessageCallback = window[options.webSocket_onMessage],
        onCloseCallback = window[options.webSocket_onClose],
        onErrorCallback = window[options.webSocket_onError],
        webSocket;

    onOpenCallback = onOpenCallback || function () {
        console.info("【web socket】连接创建成功！");
    };
    onCloseCallback = onCloseCallback || function () {
        console.info("【web socket】连接关闭！");
    };
    onErrorCallback = onErrorCallback || function () {
        console.info("【web socket】连接出错！");
    };

    console.info("3/3：【创建 WebSocket 连接】...");

    webSocket = new WebSocket(options.webSocket_url);

    webSocket.onmessage = onMessageCallback;

    webSocket.onopen = onOpenCallback;

    webSocket.onerror = onErrorCallback;

    webSocket.onclose = onCloseCallback;
};

/**
 * @description DOM书构建完毕后初始化
 */
jQuery(document).ready(function () {
    LocationMap.init();
});

/**
 * @description 在地图上标记位置
 * @param position {{cmd: number, id: string, x: number, y: number}}
 */
LocationMap.markPosition = function (position) {
    LocationMap.scene.setCharacter(position);
};

/**
 * @description 暴露出去
 * @type {{markPosition: LocationMap.markPosition|*, getPersonInfoById: *}}
 */
window.LocationMap = {
    markPosition: LocationMap.markPosition,
    getPersonInfoById: Config.getPersonInfoById
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var $ = window.jQuery;

var document = window.document;
var datakey = '__pz__';
var slice = Array.prototype.slice;
var rIE11 = /trident\/7./i;
var supportsInputEvent = function () {
    // IE11 returns a false positive
    if (rIE11.test(navigator.userAgent)) {
        return false;
    }
    var input = document.createElement('input');
    input.setAttribute('oninput', 'return');
    return typeof input.oninput === 'function';
}();

// Regex
var rupper = /([A-Z])/g;
var rsvg = /^http:[\w\.\/]+svg$/;

var floating = '(\\-?\\d[\\d\\.e-]*)';
var commaSpace = '\\,?\\s*';
var rmatrix = new RegExp('^matrix\\(' + floating + commaSpace + floating + commaSpace + floating + commaSpace + floating + commaSpace + floating + commaSpace + floating + '\\)$');

/**
 * Utility for determining transform matrix equality
 * Checks backwards to test translation first
 * @param {Array} first
 * @param {Array} second
 */
function matrixEquals(first, second) {
    var i = first.length;
    while (--i) {
        if (Math.round(+first[i]) !== Math.round(+second[i])) {
            return false;
        }
    }
    return true;
}

/**
 * Creates the options object for reset functions
 * @param {Boolean|Object} opts See reset methods
 * @returns {Object} Returns the newly-created options object
 */
function createResetOptions(opts) {
    var options = { range: true, animate: true };
    if (typeof opts === 'boolean') {
        options.animate = opts;
    } else {
        $.extend(options, opts);
    }
    return options;
}

/**
 * Represent a transformation matrix with a 3x3 matrix for calculations
 * Matrix functions adapted from Louis Remi's jQuery.transform (https://github.com/louisremi/jquery.transform.js)
 * @param {Array|Number} a An array of six values representing a 2d transformation matrix
 */
function Matrix(a, b, c, d, e, f, g, h, i) {
    if ($.type(a) === 'array') {
        this.elements = [+a[0], +a[2], +a[4], +a[1], +a[3], +a[5], 0, 0, 1];
    } else {
        this.elements = [a, b, c, d, e, f, g || 0, h || 0, i || 1];
    }
}

Matrix.prototype = {
    /**
     * Multiply a 3x3 matrix by a similar matrix or a vector
     * @param {Matrix|Vector} matrix
     * @return {Matrix|Vector} Returns a vector if multiplying by a vector
     */
    x: function x(matrix) {
        var isVector = matrix instanceof Vector;

        var a = this.elements,
            b = matrix.elements;

        if (isVector && b.length === 3) {
            // b is actually a vector
            return new Vector(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], a[3] * b[0] + a[4] * b[1] + a[5] * b[2], a[6] * b[0] + a[7] * b[1] + a[8] * b[2]);
        } else if (b.length === a.length) {
            // b is a 3x3 matrix
            return new Matrix(a[0] * b[0] + a[1] * b[3] + a[2] * b[6], a[0] * b[1] + a[1] * b[4] + a[2] * b[7], a[0] * b[2] + a[1] * b[5] + a[2] * b[8], a[3] * b[0] + a[4] * b[3] + a[5] * b[6], a[3] * b[1] + a[4] * b[4] + a[5] * b[7], a[3] * b[2] + a[4] * b[5] + a[5] * b[8], a[6] * b[0] + a[7] * b[3] + a[8] * b[6], a[6] * b[1] + a[7] * b[4] + a[8] * b[7], a[6] * b[2] + a[7] * b[5] + a[8] * b[8]);
        }
        return false; // fail
    },
    /**
     * Generates an inverse of the current matrix
     * @returns {Matrix}
     */
    inverse: function inverse() {
        var d = 1 / this.determinant(),
            a = this.elements;
        return new Matrix(d * (a[8] * a[4] - a[7] * a[5]), d * -(a[8] * a[1] - a[7] * a[2]), d * (a[5] * a[1] - a[4] * a[2]), d * -(a[8] * a[3] - a[6] * a[5]), d * (a[8] * a[0] - a[6] * a[2]), d * -(a[5] * a[0] - a[3] * a[2]), d * (a[7] * a[3] - a[6] * a[4]), d * -(a[7] * a[0] - a[6] * a[1]), d * (a[4] * a[0] - a[3] * a[1]));
    },
    /**
     * Calculates the determinant of the current matrix
     * @returns {Number}
     */
    determinant: function determinant() {
        var a = this.elements;
        return a[0] * (a[8] * a[4] - a[7] * a[5]) - a[3] * (a[8] * a[1] - a[7] * a[2]) + a[6] * (a[5] * a[1] - a[4] * a[2]);
    }
};

/**
 * Create a vector containing three values
 */
function Vector(x, y, z) {
    this.elements = [x, y, z];
}

/**
 * Get the element at zero-indexed index i
 * @param {Number} i
 */
Vector.prototype.e = Matrix.prototype.e = function (i) {
    return this.elements[i];
};

/**
 * Create a Panzoom object for a given element
 * @constructor
 * @param {Element} elem - Element to use pan and zoom
 * @param {Object} [options] - An object literal containing options to override default options
 *  (See Panzoom.defaults for ones not listed below)
 * @param {jQuery} [options.$zoomIn] - zoom in buttons/links collection (you can also bind these yourself
 *  e.g. $button.on('click', function(e) { e.preventDefault(); $elem.panzoom('zoomIn'); });)
 * @param {jQuery} [options.$zoomOut] - zoom out buttons/links collection on which to bind zoomOut
 * @param {jQuery} [options.$zoomRange] - zoom in/out with this range control
 * @param {jQuery} [options.$reset] - Reset buttons/links collection on which to bind the reset method
 * @param {Function} [options.on[Start|Change|Zoom|Pan|End|Reset] - Optional callbacks for panzoom events
 */
function Panzoom(elem, options) {

    // Allow instantiation without `new` keyword
    if (!(this instanceof Panzoom)) {
        return new Panzoom(elem, options);
    }

    // Sanity checks
    if (elem.nodeType !== 1) {
        $.error('Panzoom called on non-Element node');
    }
    if (!$.contains(document, elem)) {
        $.error('Panzoom element must be attached to the document');
    }

    // Don't remake
    var d = $.data(elem, datakey);
    if (d) {
        return d;
    }

    // Extend default with given object literal
    // Each instance gets its own options
    this.options = options = $.extend({}, Panzoom.defaults, options);
    this.elem = elem;
    var $elem = this.$elem = $(elem);
    this.$set = options.$set && options.$set.length ? options.$set : $elem;
    this.$doc = $(elem.ownerDocument || document);
    this.$parent = $elem.parent();
    this.parent = this.$parent[0];

    // This is SVG if the namespace is SVG
    // However, while <svg> elements are SVG, we want to treat those like other elements
    this.isSVG = rsvg.test(elem.namespaceURI) && elem.nodeName.toLowerCase() !== 'svg';

    this.panning = false;

    // Save the original transform value
    // Save the prefixed transform style key
    // Set the starting transform
    this._buildTransform();

    // Build the appropriately-prefixed transform style property name
    // De-camelcase
    this._transform = $.cssProps.transform.replace(rupper, '-$1').toLowerCase();

    // Build the transition value
    this._buildTransition();

    // Build containment dimensions
    this.resetDimensions();

    // Add zoom and reset buttons to `this`
    var $empty = $();
    var self = this;
    $.each(['$zoomIn', '$zoomOut', '$zoomRange', '$reset'], function (i, name) {
        self[name] = options[name] || $empty;
    });

    this.enable();

    this.scale = this.getMatrix()[0];
    this._checkPanWhenZoomed();

    // Save the instance
    $.data(elem, datakey, this);
}

// Attach regex for possible use (immutable)
Panzoom.rmatrix = rmatrix;

Panzoom.defaults = {
    // Should always be non-empty
    // Used to bind jQuery events without collisions
    // A guid is not added here as different instantiations/versions of panzoom
    // on the same element is not supported, so don't do it.
    eventNamespace: '.panzoom',

    // Whether or not to transition the scale
    transition: true,

    // Default cursor style for the element
    cursor: 'move',

    // There may be some use cases for zooming without panning or vice versa
    disablePan: false,
    disableZoom: false,

    // Pan only on the X or Y axes
    disableXAxis: false,
    disableYAxis: false,

    // Set whether you'd like to pan on left (1), middle (2), or right click (3)
    which: 1,

    // The increment at which to zoom
    // Should be a number greater than 0
    increment: 0.3,

    // When no scale is passed, this option tells
    // the `zoom` method to increment
    // the scale *linearly* based on the increment option.
    // This often ends up looking like very little happened at larger zoom levels.
    // The default is to multiply/divide the scale based on the increment.
    linearZoom: false,

    // Pan only when the scale is greater than minScale
    panOnlyWhenZoomed: false,

    // min and max zoom scales
    minScale: 0.3,
    maxScale: 6,

    // The default step for the range input
    // Precendence: default < HTML attribute < option setting
    rangeStep: 0.05,

    // Animation duration (ms)
    duration: 200,
    // CSS easing used for scale transition
    easing: 'ease-in-out',

    // Indicate that the element should be contained within it's parent when panning
    // Note: this does not affect zooming outside of the parent
    // Set this value to 'invert' to only allow panning outside of the parent element (basically the opposite of the normal use of contain)
    // 'invert' is useful for a large panzoom element where you don't want to show anything behind it
    contain: false
};

Panzoom.prototype = {
    constructor: Panzoom,

    /**
     * @returns {Panzoom} Returns the instance
     */
    instance: function instance() {
        return this;
    },

    /**
     * Enable or re-enable the panzoom instance
     */
    enable: function enable() {
        // Unbind first
        this._initStyle();
        this._bind();
        this.disabled = false;
    },

    /**
     * Disable panzoom
     */
    disable: function disable() {
        this.disabled = true;
        this._resetStyle();
        this._unbind();
    },

    /**
     * @returns {Boolean} Returns whether the current panzoom instance is disabled
     */
    isDisabled: function isDisabled() {
        return this.disabled;
    },

    /**
     * Destroy the panzoom instance
     */
    destroy: function destroy() {
        this.disable();
        $.removeData(this.elem, datakey);
    },

    /**
     * Builds the restricing dimensions from the containment element
     * Also used with focal points
     * Call this method whenever the dimensions of the element or parent are changed
     */
    resetDimensions: function resetDimensions() {
        // Reset container properties
        this.container = this.parent.getBoundingClientRect();

        // Set element properties
        var elem = this.elem;
        // getBoundingClientRect() works with SVG, offsetWidth does not
        var dims = elem.getBoundingClientRect();
        var absScale = Math.abs(this.scale);
        this.dimensions = {
            width: dims.width,
            height: dims.height,
            left: $.css(elem, 'left', true) || 0,
            top: $.css(elem, 'top', true) || 0,
            // Borders and margins are scaled
            border: {
                top: $.css(elem, 'borderTopWidth', true) * absScale || 0,
                bottom: $.css(elem, 'borderBottomWidth', true) * absScale || 0,
                left: $.css(elem, 'borderLeftWidth', true) * absScale || 0,
                right: $.css(elem, 'borderRightWidth', true) * absScale || 0
            },
            margin: {
                top: $.css(elem, 'marginTop', true) * absScale || 0,
                left: $.css(elem, 'marginLeft', true) * absScale || 0
            }
        };
    },

    /**
     * Return the element to it's original transform matrix
     * @param {Boolean} [options] If a boolean is passed, animate the reset (default: true). If an options object is passed, simply pass that along to setMatrix.
     * @param {Boolean} [options.silent] Silence the reset event
     */
    reset: function reset(options) {
        options = createResetOptions(options);
        // Reset the transform to its original value
        var matrix = this.setMatrix(this._origTransform, options);
        if (!options.silent) {
            this._trigger('reset', matrix);
        }
    },

    /**
     * Only resets zoom level
     * @param {Boolean|Object} [options] Whether to animate the reset (default: true) or an object of options to pass to zoom()
     */
    resetZoom: function resetZoom(options) {
        options = createResetOptions(options);
        var origMatrix = this.getMatrix(this._origTransform);
        options.dValue = origMatrix[3];
        this.zoom(origMatrix[0], options);
    },

    /**
     * Only reset panning
     * @param {Boolean|Object} [options] Whether to animate the reset (default: true) or an object of options to pass to pan()
     */
    resetPan: function resetPan(options) {
        var origMatrix = this.getMatrix(this._origTransform);
        this.pan(origMatrix[4], origMatrix[5], createResetOptions(options));
    },

    /**
     * Sets a transform on the $set
     * For SVG, the style attribute takes precedence
     * and allows us to animate
     * @param {String} transform
     */
    setTransform: function setTransform(transform) {
        var $set = this.$set;
        var i = $set.length;
        while (i--) {
            $.style($set[i], 'transform', transform);

            // Support IE9-11, Edge 13-14+
            // Set attribute alongside style attribute
            // since IE and Edge do not respect style settings on SVG
            // See https://css-tricks.com/transforms-on-svg-elements/
            if (this.isSVG) {
                $set[i].setAttribute('transform', transform);
            }
        }
    },

    /**
     * Retrieving the transform is different for SVG
     *  (unless a style transform is already present)
     * Uses the $set collection for retrieving the transform
     * @param {String} [transform] Pass in an transform value (like 'scale(1.1)')
     *  to have it formatted into matrix format for use by Panzoom
     * @returns {String} Returns the current transform value of the element
     */
    getTransform: function getTransform(transform) {
        var $set = this.$set;
        var transformElem = $set[0];
        if (transform) {
            this.setTransform(transform);
        } else {

            // IE and Edge still set the transform style properly
            // They just don't render it on SVG
            // So we get a correct value here
            transform = $.style(transformElem, 'transform');

            if (this.isSVG && (!transform || transform === 'none')) {
                transform = $.attr(transformElem, 'transform') || 'none';
            }
        }

        // Convert any transforms set by the user to matrix format
        // by setting to computed
        if (transform !== 'none' && !rmatrix.test(transform)) {

            // Get computed and set for next time
            this.setTransform(transform = $.css(transformElem, 'transform'));
        }

        return transform || 'none';
    },

    /**
     * Retrieve the current transform matrix for $elem (or turn a transform into it's array values)
     * @param {String} [transform] matrix-formatted transform value
     * @returns {Array} Returns the current transform matrix split up into it's parts, or a default matrix
     */
    getMatrix: function getMatrix(transform) {
        var matrix = rmatrix.exec(transform || this.getTransform());
        if (matrix) {
            matrix.shift();
        }
        return matrix || [1, 0, 0, 1, 0, 0];
    },

    /**
     * Get the current scale.
     * @param {String} [transform] matrix-formatted transform value
     * @returns {Number} Current scale relative to the initial scale (height / width = 1)
     */
    getScale: function getScale(matrix) {
        return Math.sqrt(Math.pow(matrix[0], 2) + Math.pow(matrix[1], 2));
    },

    /**
     * Given a matrix object, quickly set the current matrix of the element
     * @param {Array|String} matrix
     * @param {Object} [options]
     * @param {Boolean|String} [options.animate] Whether to animate the transform change, or 'skip' indicating that it is unnecessary to set
     * @param {Boolean} [options.contain] Override the global contain option
     * @param {Boolean} [options.range] If true, $zoomRange's value will be updated.
     * @param {Boolean} [options.silent] If true, the change event will not be triggered
     * @returns {Array} Returns the newly-set matrix
     */
    setMatrix: function setMatrix(matrix, options) {
        if (this.disabled) {
            return;
        }
        if (!options) {
            options = {};
        }
        // Convert to array
        if (typeof matrix === 'string') {
            matrix = this.getMatrix(matrix);
        }
        var scale = this.getScale(matrix);
        var contain = typeof options.contain !== 'undefined' ? options.contain : this.options.contain;

        // Apply containment
        if (contain) {
            var dims = options.dims;
            if (!dims) {
                this.resetDimensions();
                dims = this.dimensions;
            }
            var spaceWLeft, spaceWRight, scaleDiff;
            var container = this.container;
            var width = dims.width;
            var height = dims.height;
            var conWidth = container.width;
            var conHeight = container.height;
            var zoomAspectW = conWidth / width;
            var zoomAspectH = conHeight / height;

            // If the element is not naturally centered,
            // assume full space right
            if (this.$parent.css('textAlign') !== 'center' || $.css(this.elem, 'display') !== 'inline') {
                // offsetWidth gets us the width without the transform
                scaleDiff = (width - this.elem.offsetWidth) / 2;
                spaceWLeft = scaleDiff - dims.border.left;
                spaceWRight = width - conWidth - scaleDiff + dims.border.right;
            } else {
                spaceWLeft = spaceWRight = (width - conWidth) / 2;
            }
            var spaceHTop = (height - conHeight) / 2 + dims.border.top;
            var spaceHBottom = (height - conHeight) / 2 - dims.border.top - dims.border.bottom;

            if (contain === 'invert' || contain === 'automatic' && zoomAspectW < 1.01) {
                matrix[4] = Math.max(Math.min(matrix[4], spaceWLeft - dims.border.left), -spaceWRight);
            } else {
                matrix[4] = Math.min(Math.max(matrix[4], spaceWLeft), -spaceWRight);
            }

            if (contain === 'invert' || contain === 'automatic' && zoomAspectH < 1.01) {
                matrix[5] = Math.max(Math.min(matrix[5], spaceHTop - dims.border.top), -spaceHBottom);
            } else {
                matrix[5] = Math.min(Math.max(matrix[5], spaceHTop), -spaceHBottom);
            }
        }

        // Animate
        if (options.animate !== 'skip') {
            // Set transition
            this.transition(!options.animate);
        }

        // Update range element
        if (options.range) {
            this.$zoomRange.val(scale);
        }

        // Set the matrix on this.$set
        if (this.options.disableXAxis || this.options.disableYAxis) {
            var originalMatrix = this.getMatrix();
            if (this.options.disableXAxis) {
                matrix[4] = originalMatrix[4];
            }
            if (this.options.disableYAxis) {
                matrix[5] = originalMatrix[5];
            }
        }
        this.setTransform('matrix(' + matrix.join(',') + ')');

        this.scale = scale;

        // Disable/enable panning if zooming is at minimum and panOnlyWhenZoomed is true
        this._checkPanWhenZoomed(scale);

        if (!options.silent) {
            this._trigger('change', matrix);
        }

        return matrix;
    },

    /**
     * @returns {Boolean} Returns whether the panzoom element is currently being dragged
     */
    isPanning: function isPanning() {
        return this.panning;
    },

    /**
     * Apply the current transition to the element, if allowed
     * @param {Boolean} [off] Indicates that the transition should be turned off
     */
    transition: function transition(off) {
        if (!this._transition) {
            return;
        }
        var transition = off || !this.options.transition ? 'none' : this._transition;
        var $set = this.$set;
        var i = $set.length;
        while (i--) {
            // Avoid reflows when zooming
            if ($.style($set[i], 'transition') !== transition) {
                $.style($set[i], 'transition', transition);
            }
        }
    },

    /**
     * Pan the element to the specified translation X and Y
     * Note: this is not the same as setting jQuery#offset() or jQuery#position()
     * @param {Number} x
     * @param {Number} y
     * @param {Object} [options] These options are passed along to setMatrix
     * @param {Array} [options.matrix] The matrix being manipulated (if already known so it doesn't have to be retrieved again)
     * @param {Boolean} [options.silent] Silence the pan event. Note that this will also silence the setMatrix change event.
     * @param {Boolean} [options.relative] Make the x and y values relative to the existing matrix
     */
    pan: function pan(x, y, options) {
        if (this.options.disablePan) {
            return;
        }
        if (!options) {
            options = {};
        }
        var matrix = options.matrix;
        if (!matrix) {
            matrix = this.getMatrix();
        }
        // Cast existing matrix values to numbers
        if (options.relative) {
            x += +matrix[4];
            y += +matrix[5];
        }
        matrix[4] = x;
        matrix[5] = y;
        this.setMatrix(matrix, options);
        if (!options.silent) {
            this._trigger('pan', matrix[4], matrix[5]);
        }
    },

    /**
     * Zoom in/out the element using the scale properties of a transform matrix
     * @param {Number|Boolean} [scale] The scale to which to zoom or a boolean indicating to transition a zoom out
     * @param {Object} [opts] All global options can be overwritten by this options object. For example, override the default increment.
     * @param {Boolean} [opts.noSetRange] Specify that the method should not set the $zoomRange value (as is the case when $zoomRange is calling zoom on change)
     * @param {jQuery.Event|Object} [opts.focal] A focal point on the panzoom element on which to zoom.
     *  If an object, set the clientX and clientY properties to the position relative to the parent
     * @param {Boolean} [opts.animate] Whether to animate the zoom (defaults to true if scale is not a number, false otherwise)
     * @param {Boolean} [opts.silent] Silence the zoom event
     * @param {Array} [opts.matrix] Optionally pass the current matrix so it doesn't need to be retrieved
     * @param {Number} [opts.dValue] Think of a transform matrix as four values a, b, c, d
     *  where a/d are the horizontal/vertical scale values and b/c are the skew values
     *  (5 and 6 of matrix array are the tx/ty transform values).
     *  Normally, the scale is set to both the a and d values of the matrix.
     *  This option allows you to specify a different d value for the zoom.
     *  For instance, to flip vertically, you could set -1 as the dValue.
     */
    zoom: function zoom(scale, opts) {
        // Shuffle arguments
        if ((typeof scale === 'undefined' ? 'undefined' : _typeof(scale)) === 'object') {
            opts = scale;
            scale = null;
        } else if (!opts) {
            opts = {};
        }
        var options = $.extend({}, this.options, opts);
        // Check if disabled
        if (options.disableZoom) {
            return;
        }
        var animate = false;
        var matrix = options.matrix || this.getMatrix();
        var surfaceM = new Matrix(matrix);
        var startScale = this.getScale(matrix);

        // Calculate zoom based on increment
        if (typeof scale !== 'number') {
            if (options.linearZoom) {
                scale = 1 + options.increment * (scale ? -1 : 1) / startScale;
            } else {
                scale = scale ? 1 / (1 + options.increment) : 1 + options.increment;
            }
            animate = true;
        } else {
            scale = 1 / startScale;
        }

        // Constrain scale
        scale = Math.max(Math.min(scale, options.maxScale / startScale), options.minScale / startScale);
        var m = surfaceM.x(new Matrix(scale, 0, 0, 0, typeof options.dValue === 'number' ? options.dValue / startScale : scale, 0));

        // Calculate focal point based on scale
        var focal = options.focal;
        if (focal && !options.disablePan) {
            // Adapted from code by Florian Günther
            // https://github.com/florianguenther/zui53
            this.resetDimensions();
            var dims = options.dims = this.dimensions;
            var clientX = focal.clientX;
            var clientY = focal.clientY;

            // Adjust the focal point for transform-origin 50% 50%
            // SVG elements have a transform origin of 0 0
            if (!this.isSVG) {
                clientX -= dims.width / startScale / 2;
                clientY -= dims.height / startScale / 2;
            }

            var clientV = new Vector(clientX, clientY, 1);
            // Supply an offset manually if necessary
            var o = this.parentOffset || this.$parent.offset();
            var offsetM = new Matrix(1, 0, o.left - this.$doc.scrollLeft(), 0, 1, o.top - this.$doc.scrollTop());
            var surfaceV = surfaceM.inverse().x(offsetM.inverse().x(clientV));
            surfaceM = surfaceM.x(new Matrix([scale, 0, 0, scale, 0, 0]));
            clientV = offsetM.x(surfaceM.x(surfaceV));
            matrix[4] = +matrix[4] + (clientX - clientV.e(0));
            matrix[5] = +matrix[5] + (clientY - clientV.e(1));
        }

        // Set the scale
        matrix[0] = m.e(0);
        matrix[1] = m.e(3);
        matrix[2] = m.e(1);
        matrix[3] = m.e(4);

        // Calling zoom may still pan the element
        this.setMatrix(matrix, {
            animate: typeof options.animate !== 'undefined' ? options.animate : animate,
            // Set the zoomRange value
            range: !options.noSetRange
        });

        // Trigger zoom event
        if (!options.silent) {
            this._trigger('zoom', scale, options);
        }
    },

    /**
     * Get/set option on an existing instance
     * @returns {Array|undefined} If getting, returns an array of all values
     *   on each instance for a given key. If setting, continue chaining by returning undefined.
     */
    option: function option(key, value) {
        var options;
        if (!key) {
            // Avoids returning direct reference
            return $.extend({}, this.options);
        }

        if (typeof key === 'string') {
            if (arguments.length === 1) {
                return this.options[key] !== undefined ? this.options[key] : null;
            }
            options = {};
            options[key] = value;
        } else {
            options = key;
        }

        this._setOptions(options);
    },

    /**
     * Internally sets options
     * @param {Object} options - An object literal of options to set
     * @private
     */
    _setOptions: function _setOptions(options) {
        $.each(options, $.proxy(function (key, value) {
            switch (key) {
                case 'disablePan':
                    this._resetStyle();
                /* falls through */
                case '$zoomIn':
                case '$zoomOut':
                case '$zoomRange':
                case '$reset':
                case 'disableZoom':
                case 'onStart':
                case 'onChange':
                case 'onZoom':
                case 'onPan':
                case 'onEnd':
                case 'onReset':
                case 'eventNamespace':
                    this._unbind();
            }
            this.options[key] = value;
            switch (key) {
                case 'disablePan':
                    this._initStyle();
                /* falls through */
                case '$zoomIn':
                case '$zoomOut':
                case '$zoomRange':
                case '$reset':
                    // Set these on the instance
                    this[key] = value;
                /* falls through */
                case 'disableZoom':
                case 'onStart':
                case 'onChange':
                case 'onZoom':
                case 'onPan':
                case 'onEnd':
                case 'onReset':
                case 'eventNamespace':
                    this._bind();
                    break;
                case 'cursor':
                    $.style(this.elem, 'cursor', value);
                    break;
                case 'minScale':
                    this.$zoomRange.attr('min', value);
                    break;
                case 'maxScale':
                    this.$zoomRange.attr('max', value);
                    break;
                case 'rangeStep':
                    this.$zoomRange.attr('step', value);
                    break;
                case 'startTransform':
                    this._buildTransform();
                    break;
                case 'duration':
                case 'easing':
                    this._buildTransition();
                /* falls through */
                case 'transition':
                    this.transition();
                    break;
                case 'panOnlyWhenZoomed':
                    this._checkPanWhenZoomed();
                    break;
                case '$set':
                    if (value instanceof $ && value.length) {
                        this.$set = value;
                        // Reset styles
                        this._initStyle();
                        this._buildTransform();
                    }
            }
        }, this));
    },

    /**
     * Disable/enable panning depending on whether the current scale
     * matches the minimum
     * @param {Number} [scale]
     * @private
     */
    _checkPanWhenZoomed: function _checkPanWhenZoomed(scale) {
        var options = this.options;
        if (options.panOnlyWhenZoomed) {
            if (!scale) {
                scale = this.getMatrix()[0];
            }
            var toDisable = scale <= options.minScale;
            if (options.disablePan !== toDisable) {
                this.option('disablePan', toDisable);
            }
        }
    },

    /**
     * Initialize base styles for the element and its parent
     * @private
     */
    _initStyle: function _initStyle() {
        var styles = {
            // Set the same default whether SVG or HTML
            // transform-origin cannot be changed to 50% 50% in IE9-11 or Edge 13-14+
            'transform-origin': this.isSVG ? '0 0' : '50% 50%'
        };
        // Set elem styles
        if (!this.options.disablePan) {
            styles.cursor = this.options.cursor;
        }
        this.$set.css(styles);

        // Set parent to relative if set to static
        var $parent = this.$parent;
        // No need to add styles to the body
        if ($parent.length && !$.nodeName(this.parent, 'body')) {
            styles = {
                overflow: 'hidden'
            };
            if ($parent.css('position') === 'static') {
                styles.position = 'relative';
            }
            $parent.css(styles);
        }
    },

    /**
     * Undo any styles attached in this plugin
     * @private
     */
    _resetStyle: function _resetStyle() {
        this.$elem.css({
            'cursor': '',
            'transition': ''
        });
        this.$parent.css({
            'overflow': '',
            'position': ''
        });
    },

    /**
     * Binds all necessary events
     * @private
     */
    _bind: function _bind() {
        var self = this;
        var options = this.options;
        var ns = options.eventNamespace;
        var str_down = 'mousedown' + ns + ' pointerdown' + ns + ' MSPointerDown' + ns;
        var str_start = 'touchstart' + ns + ' ' + str_down;
        var str_click = 'touchend' + ns + ' click' + ns + ' pointerup' + ns + ' MSPointerUp' + ns;
        var events = {};
        var $reset = this.$reset;
        var $zoomRange = this.$zoomRange;

        // Bind panzoom events from options
        $.each(['Start', 'Change', 'Zoom', 'Pan', 'End', 'Reset'], function () {
            var m = options['on' + this];
            if ($.isFunction(m)) {
                events['panzoom' + this.toLowerCase() + ns] = m;
            }
        });

        // Bind $elem drag and click/touchdown events
        // Bind touchstart if either panning or zooming is enabled
        if (!options.disablePan || !options.disableZoom) {
            events[str_start] = function (e) {
                var touches;
                if (e.type === 'touchstart' ?
                // Touch
                (touches = e.touches || e.originalEvent.touches) && (touches.length === 1 && !options.disablePan || touches.length === 2) :
                // Mouse/Pointer: Ignore unexpected click types
                // Support: IE10 only
                // IE10 does not support e.button for MSPointerDown, but does have e.which
                !options.disablePan && (e.which || e.originalEvent.which) === options.which) {

                    e.preventDefault();
                    e.stopPropagation();
                    self._startMove(e, touches);
                }
            };
            // Prevent the contextmenu event
            // if we're binding to right-click
            if (options.which === 3) {
                events.contextmenu = false;
            }
        }
        this.$elem.on(events);

        // Bind reset
        if ($reset.length) {
            $reset.on(str_click, function (e) {
                e.preventDefault();
                self.reset();
            });
        }

        // Set default attributes for the range input
        if ($zoomRange.length) {
            $zoomRange.attr({
                // Only set the range step if explicit or
                // set the default if there is no attribute present
                step: options.rangeStep === Panzoom.defaults.rangeStep && $zoomRange.attr('step') || options.rangeStep,
                min: options.minScale,
                max: options.maxScale
            }).prop({
                value: this.getMatrix()[0]
            });
        }

        // No bindings if zooming is disabled
        if (options.disableZoom) {
            return;
        }

        var $zoomIn = this.$zoomIn;
        var $zoomOut = this.$zoomOut;

        // Bind zoom in/out
        // Don't bind one without the other
        if ($zoomIn.length && $zoomOut.length) {
            // preventDefault cancels future mouse events on touch events
            $zoomIn.on(str_click, function (e) {
                e.preventDefault();
                self.zoom();
            });
            $zoomOut.on(str_click, function (e) {
                e.preventDefault();
                self.zoom(true);
            });
        }

        if ($zoomRange.length) {
            events = {};
            // Cannot prevent default action here
            events[str_down] = function () {
                self.transition(true);
            };
            // Zoom on input events if available and change events
            // See https://github.com/timmywil/jquery.panzoom/issues/90
            events[(supportsInputEvent ? 'input' : 'change') + ns] = function () {
                self.zoom(+this.value, { noSetRange: true });
            };
            $zoomRange.on(events);
        }
    },

    /**
     * Unbind all events
     * @private
     */
    _unbind: function _unbind() {
        this.$elem.add(this.$zoomIn).add(this.$zoomOut).add(this.$reset).off(this.options.eventNamespace);
    },

    /**
     * Builds the original transform value
     * @private
     */
    _buildTransform: function _buildTransform() {
        // Save the original transform
        // Retrieving this also adds the correct prefixed style name
        // to jQuery's internal $.cssProps
        return this._origTransform = this.getTransform(this.options.startTransform);
    },

    /**
     * Set transition property for later use when zooming
     * @private
     */
    _buildTransition: function _buildTransition() {
        if (this._transform) {
            var options = this.options;
            this._transition = this._transform + ' ' + options.duration + 'ms ' + options.easing;
        }
    },

    /**
     * Calculates the distance between two touch points
     * Remember pythagorean?
     * @param {Array} touches
     * @returns {Number} Returns the distance
     * @private
     */
    _getDistance: function _getDistance(touches) {
        var touch1 = touches[0];
        var touch2 = touches[1];
        return Math.sqrt(Math.pow(Math.abs(touch2.clientX - touch1.clientX), 2) + Math.pow(Math.abs(touch2.clientY - touch1.clientY), 2));
    },

    /**
     * Constructs an approximated point in the middle of two touch points
     * @returns {Object} Returns an object containing pageX and pageY
     * @private
     */
    _getMiddle: function _getMiddle(touches) {
        var touch1 = touches[0];
        var touch2 = touches[1];
        return {
            clientX: (touch2.clientX - touch1.clientX) / 2 + touch1.clientX,
            clientY: (touch2.clientY - touch1.clientY) / 2 + touch1.clientY
        };
    },

    /**
     * Trigger a panzoom event on our element
     * The event is passed the Panzoom instance
     * @param {String|jQuery.Event} event
     * @param {Mixed} arg1[, arg2, arg3, ...] Arguments to append to the trigger
     * @private
     */
    _trigger: function _trigger(event) {
        if (typeof event === 'string') {
            event = 'panzoom' + event;
        }
        this.$elem.triggerHandler(event, [this].concat(slice.call(arguments, 1)));
    },

    /**
     * Starts the pan
     * This is bound to mouse/touchmove on the element
     * @param {jQuery.Event} event An event with pageX, pageY, and possibly the touches list
     * @param {TouchList} [touches] The touches list if present
     * @private
     */
    _startMove: function _startMove(event, touches) {
        if (this.panning) {
            return;
        }
        var moveEvent, endEvent, startDistance, startScale, startMiddle, startPageX, startPageY, touch;
        var self = this;
        var options = this.options;
        var ns = options.eventNamespace;
        var matrix = this.getMatrix();
        var original = matrix.slice(0);
        var origPageX = +original[4];
        var origPageY = +original[5];
        var panOptions = { matrix: matrix, animate: 'skip' };
        var type = event.type;

        // Use proper events
        if (type === 'pointerdown') {
            moveEvent = 'pointermove';
            endEvent = 'pointerup';
        } else if (type === 'touchstart') {
            moveEvent = 'touchmove';
            endEvent = 'touchend';
        } else if (type === 'MSPointerDown') {
            moveEvent = 'MSPointerMove';
            endEvent = 'MSPointerUp';
        } else {
            moveEvent = 'mousemove';
            endEvent = 'mouseup';
        }

        // Add namespace
        moveEvent += ns;
        endEvent += ns;

        // Remove any transitions happening
        this.transition(true);

        // Indicate that we are currently panning
        this.panning = true;

        // Trigger start event
        this._trigger('start', event, touches);

        var setStart = function setStart(event, touches) {
            if (touches) {
                if (touches.length === 2) {
                    if (startDistance != null) {
                        return;
                    }
                    startDistance = self._getDistance(touches);
                    startScale = self.getScale(matrix);
                    startMiddle = self._getMiddle(touches);
                    return;
                }
                if (startPageX != null) {
                    return;
                }
                if (touch = touches[0]) {
                    startPageX = touch.pageX;
                    startPageY = touch.pageY;
                }
            }
            if (startPageX != null) {
                return;
            }
            startPageX = event.pageX;
            startPageY = event.pageY;
        };

        setStart(event, touches);

        var move = function move(e) {
            var coords;
            e.preventDefault();
            touches = e.touches || e.originalEvent.touches;
            setStart(e, touches);

            if (touches) {
                if (touches.length === 2) {

                    // Calculate move on middle point
                    var middle = self._getMiddle(touches);
                    var diff = self._getDistance(touches) - startDistance;

                    // Set zoom
                    self.zoom(diff * (options.increment / 100) + startScale, {
                        focal: middle,
                        matrix: matrix,
                        animate: 'skip'
                    });

                    // Set pan
                    self.pan(+matrix[4] + middle.clientX - startMiddle.clientX, +matrix[5] + middle.clientY - startMiddle.clientY, panOptions);
                    startMiddle = middle;
                    return;
                }
                coords = touches[0] || { pageX: 0, pageY: 0 };
            }

            if (!coords) {
                coords = e;
            }

            self.pan(origPageX + coords.pageX - startPageX, origPageY + coords.pageY - startPageY, panOptions);
        };

        // Bind the handlers
        $(document).off(ns).on(moveEvent, move).on(endEvent, function (e) {
            e.preventDefault();
            // Unbind all document events
            $(this).off(ns);
            self.panning = false;
            // Trigger our end event
            // Simply set the type to "panzoomend" to pass through all end properties
            // jQuery's `not` is used here to compare Array equality
            e.type = 'panzoomend';
            self._trigger(e, matrix, !matrixEquals(matrix, original));
        });
    }
};

// Add Panzoom as a static property
$.Panzoom = Panzoom;

/**
 * Extend jQuery
 * @param {Object|String} options - The name of a method to call on the prototype
 *  or an object literal of options
 * @returns {jQuery|Mixed} jQuery instance for regular chaining or the return value(s) of a panzoom method call
 */
$.fn.panzoom = function (options) {
    var instance, args, m, ret;

    // Call methods widget-style
    if (typeof options === 'string') {
        ret = [];
        args = slice.call(arguments, 1);
        this.each(function () {
            instance = $.data(this, datakey);

            if (!instance) {
                ret.push(undefined);

                // Ignore methods beginning with `_`
            } else if (options.charAt(0) !== '_' && typeof (m = instance[options]) === 'function' &&
            // If nothing is returned, do not add to return values
            (m = m.apply(instance, args)) !== undefined) {

                ret.push(m);
            }
        });

        // Return an array of values for the jQuery instances
        // Or the value itself if there is only one
        // Or keep chaining
        return ret.length ? ret.length === 1 ? ret[0] : ret : this;
    }

    return this.each(function () {
        new Panzoom(this, options);
    });
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileOverview 舞台/场景
 */

var PIXI = __webpack_require__(2);

var jQuery = __webpack_require__(0);

var Config = __webpack_require__(1);
var Character = __webpack_require__(7);

/**
 * @description 构造函数
 * @constructor
 * @param target {HTMLElement}
 * @param options { {resourcesDir: String}? }
 */
function Scene(target, options) {
    this.target = target;
    this.getOptions(options);
    this._declare();
}

/**
 * @description 默认参数
 */
Scene.prototype.defaults = {
    /** 资源目录 */
    resourcesDir: "./",
    /** 点击人员标签时执行的全局函数 */
    onClickPerson: function onClickPerson(position) {
        console.info("【标签被点击】" + JSON.stringify(position));
    },
    /** 资源 */
    resources: [
    // 地面
    { name: "ground", url: "images/scene/ground.png" },
    // 一般人 - 男
    { name: "ordinary_man", url: "images/character/ordinary_man.png" },
    // 一般人 - 女
    { name: "ordinary_woman", url: "images/character/ordinary_woman.png" },
    // 民警 - 男
    { name: "police_man", url: "images/character/police_man.png" },
    // 民警 - 女
    { name: "police_woman", url: "images/character/police_woman.png" },
    // 嫌疑人 - 男
    { name: "suspect_man", url: "images/character/suspect_man.png" },
    // 嫌疑人 - 女
    { name: "suspect_woman", url: "images/character/suspect_woman.png" }]
};

/**
 * @description 缓存
 */
Scene.prototype.CharacterCache = {
    /**
     * @description 保存 Character
     * @type { {id: Character} }
     */
    cache: {},

    /**
     * @description 将 character 添加到缓存
     * @param id {String}
     * @param character {Character}
     * @return {Character}
     */
    set: function set(id, character) {
        this.cache[id] = character;
        return this.cache[id];
    },
    /**
     * @description 根据指定ID获取 character
     * @param id {String}
     * @return {Character}
     */
    get: function get(id) {
        return this.cache[id];
    },
    /**
     * @description 从缓存中删除指定ID的character
     * @param id {String}
     */
    remove: function remove(id) {
        delete this.cache[id];
    }
};

/**
 * @description 声明
 * @private
 */
Scene.prototype._declare = function () {

    /**
     * @description 容器
     * @type {HTMLElement | null}
     * @private
     */
    this._container = this.target;

    /**
     * @description 根容器
     * @type {PIXI.Container}
     * @private
     */
    this._stage = null;

    /**
     * @description 角色容器
     * @type {PIXI.Container}
     * @private
     */
    this._charactersContainer = null;

    /**
     * @description 渲染器
     * @type {PIXI.autoDetectRenderer}
     * @private
     */
    this._renderer = null;

    /**
     * @description 加载器
     * @type {PIXI.loader}
     * @private
     */
    this._loader = PIXI.loader;

    /**
     * @description 进度条容器
     * @type {PIXI.Container}
     * @private
     */
    this._progress = null;

    /**
     * @description 进度条
     * @type {PIXI.Graphics}
     * @private
     */
    this._progressbar = null;

    /**
     * @description 进度条信息
     * @type {PIXI.Text}
     * @private
     */
    this._progressMsg = null;
};

/**
 * @description 初始化
 * @public
 */
Scene.prototype.init = function (initializedCallback) {

    this.initializedCallback = initializedCallback;

    // 创建进度条
    this._createProgressbar();

    // 载入资源
    this._loadResources();

    // 创建场景（ _createProgressbar() 执行完毕后创建 ）
    // this._createScene();
    // _createScene()执行完毕后执行initializedCallback

    // 动画
    this._animate();
};

/**
 * @description 设置定位标签
 * @param data {{ id: String, x: Number, y: Number, cmd: Number}}
 */
Scene.prototype.setCharacter = function (data) {

    switch (data.cmd) {
        // 离开
        case 0:
        case 4:
            {
                this.destroyCharacter(data);
                break;
            }
        // 创建（第一次出现）
        case 1:
            {
                this.createCharacter(data);
                break;
            }
        // 更新（移动）
        case 2:
            {
                this.updateCharacter(data);
                break;
            }
    }
};

/**
 * @description 创建 定位标签
 * @param options {{ id: String, x: Number, y: Number}}
 */
Scene.prototype.createCharacter = function (options) {
    var _this = this,
        character;

    if (this.CharacterCache.get(options.id)) {
        this.updateCharacter(options);
        return;
    }

    character = new Character(this._charactersContainer, jQuery.extend(options, {
        onClick: this.options.onClickPerson
    }));

    character.create();

    character.updateCADPosition(options);

    this.CharacterCache.set(options.id, character);

    Config.getPersonInfoList(function () {
        _this.renameCharacter();
    });
};

/**
 * @description 更新 定位标签
 * @param options {{ id: String, x: Number, y: Number}}
 */
Scene.prototype.updateCharacter = function (options) {
    var character = this.CharacterCache.get(options.id);
    if (!character) {
        this.createCharacter(options);
        return;
    }

    character.updateCADPosition(options);
};

/**
 * @description 销毁
 * @param options {{ id: String, x: Number, y: Number }}
 */
Scene.prototype.destroyCharacter = function (options) {
    var character = this.CharacterCache.get(options.id),
        _this = this;
    if (!character) {
        console.warn("【" + options.id + "】不存在！");
        return;
    }

    character.destroy();

    this.CharacterCache.remove(options.id);

    Config.getPersonInfoList(function () {
        _this.renameCharacter();
    });
};

/**
 * @description 重命名所有 name的值为id 的角色
 */
Scene.prototype.renameCharacter = function () {
    var cache = this.CharacterCache.cache,
        id,
        character;
    // 遍历缓存，渲染所有角色
    for (id in cache) {
        if (cache.hasOwnProperty(id)) {
            character = cache[id];
            character.updateCharacterName();
        }
    }
};

/**
 * @description 获取参数
 * @param options {{}?}
 * @public
 */
Scene.prototype.getOptions = function (options) {
    var propName;
    if (options) {
        this.options = this.options || {};
        for (propName in this.defaults) {
            if (!this.defaults.hasOwnProperty(propName)) {
                continue;
            }
            this.options[propName] = this.defaults[propName];
        }

        for (propName in options) {
            if (!options.hasOwnProperty(propName)) {
                continue;
            }
            this.options[propName] = options[propName];
        }
    }
    return this.options;
};

/**
 * @description 获取根容器
 * @return {PIXI.Container}
 */
Scene.prototype.getStage = function () {
    if (!this._stage) {
        this._stage = new PIXI.Container();
    }
    return this._stage;
};

/**
 * @description 获取渲染器
 * @return {PIXI.autoDetectRenderer}
 */
Scene.prototype.getRenderer = function () {
    if (!this._renderer) {
        this._renderer = new PIXI.autoDetectRenderer(this._container.offsetWidth, this._container.offsetHeight);
        this._container.appendChild(this._renderer.view);
        this._addPanzoom();
    }
    return this._renderer;
};

/**
 * @description 刷新
 * @public
 */
Scene.prototype.update = function () {
    var cache = this.CharacterCache.cache,
        id,
        character;
    // 遍历缓存，渲染所有角色
    for (id in cache) {
        if (cache.hasOwnProperty(id)) {
            character = cache[id];
            character.update();
        }
    }
    this.getRenderer().render(this.getStage());
};

/**
 * @description 载入资源
 * @private
 */
Scene.prototype._loadResources = function () {
    var _this = this,
        resourcesDir = this.options.resourcesDir,
        count = 0;

    if (/\/$/.test(resourcesDir)) {
        resourcesDir += "/";
    }

    this.getOptions().resources.forEach(function (item) {
        item.url = resourcesDir + item.url;
    });

    this._loader.add(this.getOptions().resources).on("progress", function loadProgressHandler(loader, resource) {
        +function (progress, name) {
            setTimeout(function () {
                _this._setProgress(progress / 100, "加载：" + name);
            }, count++ * 60);
        }(loader.progress, resource.name);
    }).load();
};

/**
 * @description 创建资源加载进度条
 * @private
 */
Scene.prototype._createProgressbar = function () {
    var progressContainer, progress, progressbar, renderer, stage;

    if (!this._progressbar) {
        renderer = this.getRenderer();
        stage = this.getStage();

        // 背景色
        renderer.backgroundColor = 0x7698d5;

        progressContainer = new PIXI.Container();
        progressContainer.position.set(300, 300);
        stage.addChild(progressContainer);

        progress = new PIXI.Graphics();
        progress.beginFill(0xfffdff);
        progress.drawRect(0, 0, 204, 20);
        progress.endFill();
        progressContainer.addChild(progress);

        progressbar = new PIXI.Graphics();
        // progressbar.beginFill( 0xaccd94 );
        // progressbar.drawRect(2, 2, 0, 16);
        // progressbar.endFill();
        progressContainer.addChild(progressbar);

        this._progress = progressContainer;

        this._progressbar = progressbar;

        this._progressMsg = new PIXI.Text("加载...", {
            fontFamily: "Microsoft Yahei",
            fontSize: "16px",
            fill: "#ffffff"
        });
        this._progressMsg.position.set(0, 24);
        progressContainer.addChild(this._progressMsg);
    }

    return this._progressbar;
};

/**
 * @description 设置进度条长度
 * @param percentage {Number}
 * @param msg {String}
 * @private
 */
Scene.prototype._setProgress = function (percentage, msg) {
    var width,
        progressbar,
        _this = this;
    if (percentage > 0.98) {
        percentage = 1;
        msg = "加载完毕！";
        setTimeout(function () {
            _this._progress.visible = false;
            _this._createScene();
        }, 100);
    }
    progressbar = this._progressbar;
    width = 200 * percentage;

    progressbar.beginFill(0xaccd94);
    progressbar.drawRect(2, 2, width, 16);
    progressbar.endFill();

    this._progressMsg.text = msg || "加载...";
};

/**
 * @description 创建场景
 * @private
 */
Scene.prototype._createScene = function () {
    var stage = this.getStage(),
        resources = PIXI.loader.resources,
        ground,
        charactersContainer;
    ground = new PIXI.Sprite(resources["ground"].texture);

    stage.addChild(ground);

    charactersContainer = new PIXI.Container();
    stage.addChild(charactersContainer);

    this._charactersContainer = charactersContainer;

    this.initializedCallback && this.initializedCallback();
};

/**
 * @description 动画，每秒刷新60次
 * @private
 */
Scene.prototype._animate = function () {
    var _this = this;

    loop();

    function loop() {

        requestAnimationFrame(loop);

        // setTimeout( loop, 160 );

        _this.update();
    }
};

/**
 * 注册 panzoom 功能
 * @private
 */
Scene.prototype._addPanzoom = function () {
    var $container = jQuery(this._container);

    $container.panzoom();

    $container.parent().on('mousewheel', function (e) {
        var delta, zoomOut;
        e.preventDefault();
        delta = e.delta || e.originalEvent.wheelDelta;
        zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        $container.panzoom('zoom', zoomOut, {
            increment: 0.1,
            animate: false,
            focal: e
        });
    });
};

module.exports = Scene;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileOverview 角色
 * @author 吴钦飞（wuqinfei@qq.com）
 */

var PIXI = __webpack_require__(2);

var jQuery = __webpack_require__(0);

var Config = __webpack_require__(1);

/**
 * @description 构造函数
 * @constructor
 */
function Character(charactersContainer, options) {
    this.charactersContainer = charactersContainer;
    this._declare(options);
}

/**
 * @description 默认参数
 * @type {{}}
 */
Character.prototype.defaults = {
    onClick: function onClick() {
        console.info("被点击了");
    }
};

/**
 * @description 声明
 * @param options
 * @private
 */
Character.prototype._declare = function (options) {

    /**
     * @description 传入的参数
     * @type {{}}
     */
    this.options = this.getOptions(options);

    /**
     * @description sprite
     * @type {PIXI.Container}
     */
    this.characterContainer = null;

    /**
     * @description 人员信息
     * @type {{id: string, name: string, type: string}}
     */
    this.personInfo = null;

    /**
     * @description 记录 options 里的x坐标
     * @type {number}
     */
    this.x = 0;

    /**
     * @description 记录 options 里的y坐标
     * @type {number}
     */
    this.y = 0;

    /**
     * @description 对应的名称
     * @type {string}
     */
    this.name = "";

    /**
     * @description CAD图上对应的坐标
     * @type {{x: number, y: number}}
     */
    this.position_CAD = {
        // x: 0,
        // y: 0
    };

    /**
     * @description 2D图上的位置
     * @type {{x: number, y: number}}
     */
    this.position_2D = {
        // x: 0,
        // y: 0
    };
};

/**
 * @description 创建
 */
Character.prototype.create = function () {
    var _this = this,
        pixiSprite,
        pixiText,
        personInfo = this.personInfo = Config.getPersonInfoById(this.getOptions().id),
        color = Config.getColor(personInfo.type),
        graphics = new PIXI.Graphics(),
        characterContainer = new PIXI.Container();

    this.name = personInfo.name;

    // 图片
    pixiSprite = new PIXI.Sprite(PIXI.loader.resources[personInfo.type].texture);

    // 文字
    pixiText = new PIXI.Text(personInfo.name, {
        // fontFamily: "Microsoft Yahei",
        fontSize: 14,
        fill: color.text
    });
    pixiText.position.set(0, pixiSprite.height);

    pixiSprite.position.set((pixiText.width - pixiSprite.width) / 2, 0);

    // 文字框
    graphics.lineStyle(1, color.border, 1);
    graphics.beginFill(color.background, 1);
    graphics.drawRect(pixiText.position.x - 1, pixiText.position.y - 1, pixiText.width + 2, pixiText.height + 2);

    characterContainer.addChild(pixiSprite);
    characterContainer.addChild(graphics);
    characterContainer.addChild(pixiText);

    characterContainer._pku_pixiSprite = pixiSprite;
    characterContainer._pku_graphics = graphics;
    characterContainer._pku_pixiText = pixiText;

    // Opt-in to interactivity
    characterContainer.interactive = true;
    // Shows hand cursor
    characterContainer.buttonMode = true;

    characterContainer.on("pointerdown", function () {
        _this.options.onClick(jQuery.extend(true, {}, _this.options, personInfo));
    });

    this.charactersContainer.addChild(characterContainer);

    this.characterContainer = characterContainer;
};

Character.prototype.update = function () {
    var position_CAD = this.position_CAD;

    // 位置改变了，才计算并更新
    if (this.x !== position_CAD.x || this.y !== position_CAD.y) {

        position_CAD.x = this.x;
        position_CAD.y = this.y;

        this.updatePixiPosition();
    }
};

/**
 * @description 更新，仅记录，而不改属性
 *
 * @param options { { id: String, x: Number, y: Number} }
 */
Character.prototype.updateCADPosition = function (options) {

    this.x = options.x;
    this.y = options.y;

    // 便于垃圾回收
    options = null;
};

/**
 * @description 更新PIXI上的位置
 */
Character.prototype.updatePixiPosition = function () {

    // 计算 2D 坐标
    this.position_2D = Config.convertPosition(this.position_CAD);

    // 设置位置
    this.characterContainer.position.set(this.position_2D.x - this.characterContainer.width / 2, this.position_2D.y - this.characterContainer.height / 2);
};

/**
 * @description 更新角色的name
 */
Character.prototype.updateCharacterName = function () {
    var characterContainer, color, pixiSprite, graphics, pixiText, personInfo;

    // 如果 name 不是 数字字符串，则不更新。
    if (!jQuery.isNumeric(this.name)) {
        return;
    }

    personInfo = Config.getPersonInfoById(this.getOptions().id);

    if (jQuery.isNumeric(personInfo.name)) {
        return;
    }

    this.name = personInfo.name;
    color = Config.getColor(personInfo.type);

    characterContainer = this.characterContainer;
    pixiSprite = characterContainer._pku_pixiSprite;
    graphics = characterContainer._pku_graphics;
    pixiText = characterContainer._pku_pixiText;

    // 重设置 name
    pixiText.text = this.name;

    // 擦除图形（文字框），并重绘制
    graphics.clear();
    graphics.lineStyle(1, color.border, 1);
    graphics.beginFill(color.background, 1);
    graphics.drawRect(pixiText.position.x - 1, pixiText.position.y - 1, pixiText.width + 2, pixiText.height + 2);

    // 重新设置图像的位置，使其居中
    pixiSprite.position.set((pixiText.width - pixiSprite.width) / 2, 0);
};

/**
 * @description 销毁
 */
Character.prototype.destroy = function () {
    this.charactersContainer.removeChild(this.characterContainer);
};

/**
 * @description 隐藏
 */
Character.prototype.hide = function () {
    this.characterContainer.visible = false;
};

/**
 * @description 显示
 */
Character.prototype.show = function () {
    this.characterContainer.visible = true;
};

/**
 * @description 获取参数
 * @param options
 * @return {{}}
 */
Character.prototype.getOptions = function (options) {
    var propName;
    if (options) {
        this.options = this.options || {};
        for (propName in this.defaults) {
            if (!this.defaults.hasOwnProperty(propName)) {
                continue;
            }
            this.options[propName] = this.defaults[propName];
        }

        for (propName in options) {
            if (!options.hasOwnProperty(propName)) {
                continue;
            }
            this.options[propName] = options[propName];
        }
    }
    return this.options;
};

module.exports = Character;

/***/ })
/******/ ]);
//# sourceMappingURL=locationMap.js.map