function() {
    "undefined" != typeof window.CKEDITOR_BASEPATH && null !== window.CKEDITOR_BASEPATH || (window.CKEDITOR_BASEPATH = "/ckeditor/")
}.call(this),
    function() {
        window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function() {
            var e = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,
                t = {
                    timestamp: "M675",
                    version: "4.5.3 DEV",
                    revision: "70e499277",
                    rnd: Math.floor(900 * Math.random()) + 100,
                    _: {
                        pending: [],
                        basePathSrcPattern: e
                    },
                    status: "unloaded",
                    basePath: function() {
                        var t = window.CKEDITOR_BASEPATH || "";
                        if (!t)
                            for (var n = document.getElementsByTagName("script"), i = 0; i < n.length; i++) {
                                var o = n[i].src.match(e);
                                if (o) {
                                    t = o[1];
                                    break
                                }
                            }
                        if (-1 == t.indexOf(":/") && "//" != t.slice(0, 2) && (t = 0 === t.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + t : location.href.match(/^[^\?]*\/(?:)/)[0] + t), !t) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                        return t
                    }(),
                    getUrl: function(e) {
                        return -1 == e.indexOf(":/") && 0 !== e.indexOf("/") && (e = this.basePath + e), this.timestamp && "/" != e.charAt(e.length - 1) && !/[&?]t=/.test(e) && (e += (0 <= e.indexOf("?") ? "&" : "?") + "t=" + this.timestamp), e
                    },
                    domReady: function() {
                        function e() {
                            try {
                                document.addEventListener ? (document.removeEventListener("DOMContentLoaded", e, !1), t()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", e), t())
                            } catch (e) {}
                        }

                        function t() {
                            for (var e; e = n.shift();) e()
                        }
                        var n = [];
                        return function(t) {
                            function i() {
                                try {
                                    document.documentElement.doScroll("left")
                                } catch (e) {
                                    return void setTimeout(i, 1)
                                }
                                e()
                            }
                            if (n.push(t), "complete" === document.readyState && setTimeout(e, 1), 1 == n.length)
                                if (document.addEventListener) document.addEventListener("DOMContentLoaded", e, !1), window.addEventListener("load", e, !1);
                                else if (document.attachEvent) {
                                document.attachEvent("onreadystatechange", e), window.attachEvent("onload", e), t = !1;
                                try {
                                    t = !window.frameElement
                                } catch (e) {}
                                document.documentElement.doScroll && t && i()
                            }
                        }
                    }()
                },
                n = window.CKEDITOR_GETURL;
            if (n) {
                var i = t.getUrl;
                t.getUrl = function(e) {
                    return n.call(t, e) || i.call(t, e)
                }
            }
            return t
        }()), CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(e) {
            var t, n = CKEDITOR.event.prototype;
            for (t in n) null == e[t] && (e[t] = n[t])
        }, CKEDITOR.event.prototype = function() {
            function e(e) {
                var i = t(this);
                return i[e] || (i[e] = new n(e))
            }
            var t = function(e) {
                    return e = e.getPrivate && e.getPrivate() || e._ || (e._ = {}), e.events || (e.events = {})
                },
                n = function(e) {
                    this.name = e, this.listeners = []
                };
            return n.prototype = {
                getListenerIndex: function(e) {
                    for (var t = 0, n = this.listeners; t < n.length; t++)
                        if (n[t].fn == e) return t;
                    return -1
                }
            }, {
                define: function(t, n) {
                    var i = e.call(this, t);
                    CKEDITOR.tools.extend(i, n, !0)
                },
                on: function(t, n, i, o, a) {
                    function r(e, a, r, l) {
                        return e = {
                            name: t,
                            sender: this,
                            editor: e,
                            data: a,
                            listenerData: o,
                            stop: r,
                            cancel: l,
                            removeListener: s
                        }, n.call(i, e) !== !1 && e.data
                    }

                    function s() {
                        c.removeListener(t, n)
                    }
                    var l = e.call(this, t);
                    if (l.getListenerIndex(n) < 0) {
                        l = l.listeners, i || (i = this), isNaN(a) && (a = 10);
                        var c = this;
                        r.fn = n, r.priority = a;
                        for (var u = l.length - 1; u >= 0; u--)
                            if (l[u].priority <= a) return l.splice(u + 1, 0, r), {
                                removeListener: s
                            };
                        l.unshift(r)
                    }
                    return {
                        removeListener: s
                    }
                },
                once: function() {
                    var e = Array.prototype.slice.call(arguments),
                        t = e[1];
                    return e[1] = function(e) {
                        return e.removeListener(), t.apply(this, arguments)
                    }, this.on.apply(this, e)
                },
                capture: function() {
                    CKEDITOR.event.useCapture = 1;
                    var e = this.on.apply(this, arguments);
                    return CKEDITOR.event.useCapture = 0, e
                },
                fire: function() {
                    var e = 0,
                        n = function() {
                            e = 1
                        },
                        i = 0,
                        o = function() {
                            i = 1
                        };
                    return function(a, r, s) {
                        var l = t(this)[a],
                            a = e,
                            c = i;
                        if (e = i = 0, l) {
                            var u = l.listeners;
                            if (u.length)
                                for (var d, u = u.slice(0), h = 0; h < u.length; h++) {
                                    if (l.errorProof) try {
                                        d = u[h].call(this, s, r, n, o)
                                    } catch (e) {} else d = u[h].call(this, s, r, n, o);
                                    if (d === !1 ? i = 1 : "undefined" != typeof d && (r = d), e || i) break
                                }
                        }
                        return r = !i && ("undefined" == typeof r || r), e = a, i = c, r
                    }
                }(),
                fireOnce: function(e, n, i) {
                    return n = this.fire(e, n, i), delete t(this)[e], n
                },
                removeListener: function(e, n) {
                    var i = t(this)[e];
                    if (i) {
                        var o = i.getListenerIndex(n);
                        o >= 0 && i.listeners.splice(o, 1)
                    }
                },
                removeAllListeners: function() {
                    var e, n = t(this);
                    for (e in n) delete n[e]
                },
                hasListeners: function(e) {
                    return (e = t(this)[e]) && e.listeners.length > 0
                }
            }
        }()), CKEDITOR.editor || (CKEDITOR.editor = function() {
            CKEDITOR._.pending.push([this, arguments]), CKEDITOR.event.call(this)
        }, CKEDITOR.editor.prototype.fire = function(e, t) {
            return e in {
                instanceReady: 1,
                loaded: 1
            } && (this[e] = !0), CKEDITOR.event.prototype.fire.call(this, e, t, this)
        }, CKEDITOR.editor.prototype.fireOnce = function(e, t) {
            return e in {
                instanceReady: 1,
                loaded: 1
            } && (this[e] = !0), CKEDITOR.event.prototype.fireOnce.call(this, e, t, this)
        }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function() {
            var e = navigator.userAgent.toLowerCase(),
                t = e.match(/edge[ \/](\d+.?\d*)/),
                n = e.indexOf("trident/") > -1,
                n = !(!t && !n),
                n = {
                    ie: n,
                    edge: !!t,
                    webkit: !n && e.indexOf(" applewebkit/") > -1,
                    air: e.indexOf(" adobeair/") > -1,
                    mac: e.indexOf("macintosh") > -1,
                    quirks: "BackCompat" == document.compatMode && (!document.documentMode || document.documentMode < 10),
                    mobile: e.indexOf("mobile") > -1,
                    iOS: /(ipad|iphone|ipod)/.test(e),
                    isCustomDomain: function() {
                        if (!this.ie) return !1;
                        var e = document.domain,
                            t = window.location.hostname;
                        return e != t && e != "[" + t + "]"
                    },
                    secure: "https:" == location.protocol
                };
            n.gecko = "Gecko" == navigator.product && !n.webkit && !n.ie, n.webkit && (e.indexOf("chrome") > -1 ? n.chrome = !0 : n.safari = !0);
            var i = 0;
            return n.ie && (i = t ? parseFloat(t[1]) : n.quirks || !document.documentMode ? parseFloat(e.match(/msie (\d+)/)[1]) : document.documentMode, n.ie9Compat = 9 == i, n.ie8Compat = 8 == i, n.ie7Compat = 7 == i, n.ie6Compat = i < 7 || n.quirks), n.gecko && (t = e.match(/rv:([\d\.]+)/)) && (t = t[1].split("."), i = 1e4 * t[0] + 100 * (t[1] || 0) + 1 * (t[2] || 0)), n.air && (i = parseFloat(e.match(/ adobeair\/(\d+)/)[1])), n.webkit && (i = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])), n.version = i, n.isCompatible = !(n.ie && i < 7 || n.gecko && i < 4e4 || n.webkit && i < 534), n.hidpi = window.devicePixelRatio >= 2, n.needsBrFiller = n.gecko || n.webkit || n.ie && i > 10, n.needsNbspFiller = n.ie && i < 11, n.cssClass = "cke_browser_" + (n.ie ? "ie" : n.gecko ? "gecko" : n.webkit ? "webkit" : "unknown"), n.quirks && (n.cssClass = n.cssClass + " cke_browser_quirks"), n.ie && (n.cssClass = n.cssClass + (" cke_browser_ie" + (n.quirks ? "6 cke_browser_iequirks" : n.version))), n.air && (n.cssClass = n.cssClass + " cke_browser_air"), n.iOS && (n.cssClass = n.cssClass + " cke_browser_ios"), n.hidpi && (n.cssClass = n.cssClass + " cke_hidpi"), n
        }()), "unloaded" == CKEDITOR.status && function() {
            CKEDITOR.event.implementOn(CKEDITOR), CKEDITOR.loadFullCore = function() {
                    if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1;
                    else {
                        delete CKEDITOR.loadFullCore;
                        var e = document.createElement("script");
                        e.type = "text/javascript", e.src = CKEDITOR.basePath + "ckeditor.js", document.getElementsByTagName("head")[0].appendChild(e)
                    }
                }, CKEDITOR.loadFullCoreTimeout = 0, CKEDITOR.add = function(e) {
                    (this._.pending || (this._.pending = [])).push(e)
                },
                function() {
                    CKEDITOR.domReady(function() {
                        var e = CKEDITOR.loadFullCore,
                            t = CKEDITOR.loadFullCoreTimeout;
                        e && (CKEDITOR.status = "basic_ready", e && e._load ? e() : t && setTimeout(function() {
                            CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
                        }, 1e3 * t))
                    })
                }(), CKEDITOR.status = "basic_loaded"
        }(), CKEDITOR.dom = {}, function() {
            var e = [],
                t = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "",
                n = /&/g,
                i = />/g,
                o = /</g,
                a = /"/g,
                r = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,
                s = {
                    lt: "<",
                    gt: ">",
                    amp: "&",
                    quot: '"',
                    nbsp: " ",
                    shy: "­"
                },
                l = function(e, t) {
                    return "#" == t[0] ? String.fromCharCode(parseInt(t.slice(1), 10)) : s[t]
                };
            CKEDITOR.on("reset", function() {
                e = []
            }), CKEDITOR.tools = {
                arrayCompare: function(e, t) {
                    if (!e && !t) return !0;
                    if (!e || !t || e.length != t.length) return !1;
                    for (var n = 0; n < e.length; n++)
                        if (e[n] != t[n]) return !1;
                    return !0
                },
                getIndex: function(e, t) {
                    for (var n = 0; n < e.length; ++n)
                        if (t(e[n])) return n;
                    return -1
                },
                clone: function(e) {
                    var t;
                    if (e && e instanceof Array) {
                        t = [];
                        for (var n = 0; n < e.length; n++) t[n] = CKEDITOR.tools.clone(e[n]);
                        return t
                    }
                    if (null === e || "object" != typeof e || e instanceof String || e instanceof Number || e instanceof Boolean || e instanceof Date || e instanceof RegExp || e.nodeType || e.window === e) return e;
                    t = new e.constructor;
                    for (n in e) t[n] = CKEDITOR.tools.clone(e[n]);
                    return t
                },
                capitalize: function(e, t) {
                    return e.charAt(0).toUpperCase() + (t ? e.slice(1) : e.slice(1).toLowerCase())
                },
                extend: function(e) {
                    var t, n, i = arguments.length;
                    "boolean" == typeof(t = arguments[i - 1]) ? i-- : "boolean" == typeof(t = arguments[i - 2]) && (n = arguments[i - 1], i -= 2);
                    for (var o = 1; o < i; o++) {
                        var a, r = arguments[o];
                        for (a in r) t !== !0 && null != e[a] || (!n || a in n) && (e[a] = r[a])
                    }
                    return e
                },
                prototypedCopy: function(e) {
                    var t = function() {};
                    return t.prototype = e, new t
                },
                copy: function(e) {
                    var t, n = {};
                    for (t in e) n[t] = e[t];
                    return n
                },
                isArray: function(e) {
                    return "[object Array]" == Object.prototype.toString.call(e)
                },
                isEmpty: function(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t)) return !1;
                    return !0
                },
                cssVendorPrefix: function(e, n, i) {
                    return i ? t + e + ":" + n + ";" + e + ":" + n : (i = {}, i[e] = n, i[t + e] = n, i)
                },
                cssStyleToDomStyle: function() {
                    var e = document.createElement("div").style,
                        t = "undefined" != typeof e.cssFloat ? "cssFloat" : "undefined" != typeof e.styleFloat ? "styleFloat" : "float";
                    return function(e) {
                        return "float" == e ? t : e.replace(/-./g, function(e) {
                            return e.substr(1).toUpperCase()
                        })
                    }
                }(),
                buildStyleHtml: function(e) {
                    for (var t, e = [].concat(e), n = [], i = 0; i < e.length; i++)(t = e[i]) && (/@import|[{}]/.test(t) ? n.push("<style>" + t + "</style>") : n.push('<link type="text/css" rel=stylesheet href="' + t + '">'));
                    return n.join("")
                },
                htmlEncode: function(e) {
                    return void 0 === e || null === e ? "" : ("" + e).replace(n, "&amp;").replace(i, "&gt;").replace(o, "&lt;")
                },
                htmlDecode: function(e) {
                    return e.replace(r, l)
                },
                htmlEncodeAttr: function(e) {
                    return CKEDITOR.tools.htmlEncode(e).replace(a, "&quot;")
                },
                htmlDecodeAttr: function(e) {
                    return CKEDITOR.tools.htmlDecode(e)
                },
                transformPlainTextToHtml: function(e, t) {
                    var n = t == CKEDITOR.ENTER_BR,
                        i = this.htmlEncode(e.replace(/\r\n/g, "\n")),
                        i = i.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"),
                        o = t == CKEDITOR.ENTER_P ? "p" : "div";
                    if (!n) {
                        var a = /\n{2}/g;
                        if (a.test(i)) var r = "<" + o + ">",
                            s = "</" + o + ">",
                            i = r + i.replace(a, function() {
                                return s + r
                            }) + s
                    }
                    return i = i.replace(/\n/g, "<br>"), n || (i = i.replace(RegExp("<br>(?=</" + o + ">)"), function(e) {
                        return CKEDITOR.tools.repeat(e, 2)
                    })), i = i.replace(/^ | $/g, "&nbsp;"), i = i.replace(/(>|\s) /g, function(e, t) {
                        return t + "&nbsp;"
                    }).replace(/ (?=<)/g, "&nbsp;")
                },
                getNextNumber: function() {
                    var e = 0;
                    return function() {
                        return ++e
                    }
                }(),
                getNextId: function() {
                    return "cke_" + this.getNextNumber()
                },
                getUniqueId: function() {
                    for (var e = "e", t = 0; t < 8; t++) e += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                    return e
                },
                override: function(e, t) {
                    var n = t(e);
                    return n.prototype = e.prototype, n
                },
                setTimeout: function(e, t, n, i, o) {
                    return o || (o = window), n || (n = o), o.setTimeout(function() {
                        i ? e.apply(n, [].concat(i)) : e.apply(n)
                    }, t || 0)
                },
                trim: function() {
                    var e = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                    return function(t) {
                        return t.replace(e, "")
                    }
                }(),
                ltrim: function() {
                    var e = /^[ \t\n\r]+/g;
                    return function(t) {
                        return t.replace(e, "")
                    }
                }(),
                rtrim: function() {
                    var e = /[ \t\n\r]+$/g;
                    return function(t) {
                        return t.replace(e, "")
                    }
                }(),
                indexOf: function(e, t) {
                    if ("function" == typeof t) {
                        for (var n = 0, i = e.length; n < i; n++)
                            if (t(e[n])) return n
                    } else {
                        if (e.indexOf) return e.indexOf(t);
                        for (n = 0, i = e.length; n < i; n++)
                            if (e[n] === t) return n
                    }
                    return -1
                },
                search: function(e, t) {
                    var n = CKEDITOR.tools.indexOf(e, t);
                    return n >= 0 ? e[n] : null
                },
                bind: function(e, t) {
                    return function() {
                        return e.apply(t, arguments)
                    }
                },
                createClass: function(e) {
                    var t = e.$,
                        n = e.base,
                        i = e.privates || e._,
                        o = e.proto,
                        e = e.statics;
                    if (!t && (t = function() {
                            n && this.base.apply(this, arguments)
                        }), i) var a = t,
                        t = function() {
                            var e, t = this._ || (this._ = {});
                            for (e in i) {
                                var n = i[e];
                                t[e] = "function" == typeof n ? CKEDITOR.tools.bind(n, this) : n
                            }
                            a.apply(this, arguments)
                        };
                    return n && (t.prototype = this.prototypedCopy(n.prototype), t.prototype.constructor = t, t.base = n, t.baseProto = n.prototype, t.prototype.base = function() {
                        this.base = n.prototype.base, n.apply(this, arguments), this.base = arguments.callee
                    }), o && this.extend(t.prototype, o, !0), e && this.extend(t, e, !0), t
                },
                addFunction: function(t, n) {
                    return e.push(function() {
                        return t.apply(n || this, arguments)
                    }) - 1
                },
                removeFunction: function(t) {
                    e[t] = null
                },
                callFunction: function(t) {
                    var n = e[t];
                    return n && n.apply(window, Array.prototype.slice.call(arguments, 1))
                },
                cssLength: function() {
                    var e, t = /^-?\d+\.?\d*px$/;
                    return function(n) {
                        return e = CKEDITOR.tools.trim(n + "") + "px", t.test(e) ? e : n || ""
                    }
                }(),
                convertToPx: function() {
                    var e;
                    return function(t) {
                        return e || (e = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document), CKEDITOR.document.getBody().append(e)), /%$/.test(t) ? t : (e.setStyle("width", t), e.$.clientWidth)
                    }
                }(),
                repeat: function(e, t) {
                    return Array(t + 1).join(e)
                },
                tryThese: function() {
                    for (var e, t = 0, n = arguments.length; t < n; t++) {
                        var i = arguments[t];
                        try {
                            e = i();
                            break
                        } catch (e) {}
                    }
                    return e
                },
                genKey: function() {
                    return Array.prototype.slice.call(arguments).join("-")
                },
                defer: function(e) {
                    return function() {
                        var t = arguments,
                            n = this;
                        window.setTimeout(function() {
                            e.apply(n, t)
                        }, 0)
                    }
                },
                normalizeCssText: function(e, t) {
                    var n, i = [],
                        o = CKEDITOR.tools.parseCssText(e, !0, t);
                    for (n in o) i.push(n + ":" + o[n]);
                    return i.sort(), i.length ? i.join(";") + ";" : ""
                },
                convertRgbToHex: function(e) {
                    return e.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(e, t, n, i) {
                        for (e = [t, n, i], t = 0; t < 3; t++) e[t] = ("0" + parseInt(e[t], 10).toString(16)).slice(-2);
                        return "#" + e.join("")
                    })
                },
                parseCssText: function(e, t, n) {
                    var i = {};
                    return n && (n = new CKEDITOR.dom.element("span"), n.setAttribute("style", e), e = CKEDITOR.tools.convertRgbToHex(n.getAttribute("style") || "")), e && ";" != e ? (e.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(e, n, o) {
                        t && (n = n.toLowerCase(), "font-family" == n && (o = o.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ",")), o = CKEDITOR.tools.trim(o)), i[n] = o
                    }), i) : i
                },
                writeCssText: function(e, t) {
                    var n, i = [];
                    for (n in e) i.push(n + ":" + e[n]);
                    return t && i.sort(), i.join("; ")
                },
                objectCompare: function(e, t, n) {
                    var i;
                    if (!e && !t) return !0;
                    if (!e || !t) return !1;
                    for (i in e)
                        if (e[i] != t[i]) return !1;
                    if (!n)
                        for (i in t)
                            if (e[i] != t[i]) return !1;
                    return !0
                },
                objectKeys: function(e) {
                    var t, n = [];
                    for (t in e) n.push(t);
                    return n
                },
                convertArrayToObject: function(e, t) {
                    var n = {};
                    1 == arguments.length && (t = !0);
                    for (var i = 0, o = e.length; i < o; ++i) n[e[i]] = t;
                    return n
                },
                fixDomain: function() {
                    for (var e;;) try {
                        e = window.parent.document.domain;
                        break
                    } catch (t) {
                        if (e = e ? e.replace(/.+?(?:\.|$)/, "") : document.domain, !e) break;
                        document.domain = e
                    }
                    return !!e
                },
                eventsBuffer: function(e, t, n) {
                    function i() {
                        a = (new Date).getTime(), o = !1, n ? t.call(n) : t()
                    }
                    var o, a = 0;
                    return {
                        input: function() {
                            if (!o) {
                                var t = (new Date).getTime() - a;
                                t < e ? o = setTimeout(i, e - t) : i()
                            }
                        },
                        reset: function() {
                            o && clearTimeout(o), o = a = 0
                        }
                    }
                },
                enableHtml5Elements: function(e, t) {
                    for (var n, i = ["abbr", "article", "aside", "audio", "bdi", "canvas", "data", "datalist", "details", "figcaption", "figure", "footer", "header", "hgroup", "main", "mark", "meter", "nav", "output", "progress", "section", "summary", "time", "video"], o = i.length; o--;) n = e.createElement(i[o]), t && e.appendChild(n)
                },
                checkIfAnyArrayItemMatches: function(e, t) {
                    for (var n = 0, i = e.length; n < i; ++n)
                        if (e[n].match(t)) return !0;
                    return !1
                },
                checkIfAnyObjectPropertyMatches: function(e, t) {
                    for (var n in e)
                        if (n.match(t)) return !0;
                    return !1
                },
                transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw=="
            }
        }(), CKEDITOR.dtd = function() {
            var e = CKEDITOR.tools.extend,
                t = function(e, t) {
                    for (var n = CKEDITOR.tools.clone(e), i = 1; i < arguments.length; i++) {
                        var o, t = arguments[i];
                        for (o in t) delete n[o]
                    }
                    return n
                },
                n = {},
                i = {},
                o = {
                    address: 1,
                    article: 1,
                    aside: 1,
                    blockquote: 1,
                    details: 1,
                    div: 1,
                    dl: 1,
                    fieldset: 1,
                    figure: 1,
                    footer: 1,
                    form: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    header: 1,
                    hgroup: 1,
                    hr: 1,
                    main: 1,
                    menu: 1,
                    nav: 1,
                    ol: 1,
                    p: 1,
                    pre: 1,
                    section: 1,
                    table: 1,
                    ul: 1
                },
                a = {
                    command: 1,
                    link: 1,
                    meta: 1,
                    noscript: 1,
                    script: 1,
                    style: 1
                },
                r = {},
                s = {
                    "#": 1
                },
                l = {
                    center: 1,
                    dir: 1,
                    noframes: 1
                };
            return e(n, {
                a: 1,
                abbr: 1,
                area: 1,
                audio: 1,
                b: 1,
                bdi: 1,
                bdo: 1,
                br: 1,
                button: 1,
                canvas: 1,
                cite: 1,
                code: 1,
                command: 1,
                datalist: 1,
                del: 1,
                dfn: 1,
                em: 1,
                embed: 1,
                i: 1,
                iframe: 1,
                img: 1,
                input: 1,
                ins: 1,
                kbd: 1,
                keygen: 1,
                label: 1,
                map: 1,
                mark: 1,
                meter: 1,
                noscript: 1,
                object: 1,
                output: 1,
                progress: 1,
                q: 1,
                ruby: 1,
                s: 1,
                samp: 1,
                script: 1,
                select: 1,
                small: 1,
                span: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                textarea: 1,
                time: 1,
                u: 1,
                var: 1,
                video: 1,
                wbr: 1
            }, s, {
                acronym: 1,
                applet: 1,
                basefont: 1,
                big: 1,
                font: 1,
                isindex: 1,
                strike: 1,
                style: 1,
                tt: 1
            }), e(i, o, n, l), t = {
                a: t(n, {
                    a: 1,
                    button: 1
                }),
                abbr: n,
                address: i,
                area: r,
                article: i,
                aside: i,
                audio: e({
                    source: 1,
                    track: 1
                }, i),
                b: n,
                base: r,
                bdi: n,
                bdo: n,
                blockquote: i,
                body: i,
                br: r,
                button: t(n, {
                    a: 1,
                    button: 1
                }),
                canvas: n,
                caption: i,
                cite: n,
                code: n,
                col: r,
                colgroup: {
                    col: 1
                },
                command: r,
                datalist: e({
                    option: 1
                }, n),
                dd: i,
                del: n,
                details: e({
                    summary: 1
                }, i),
                dfn: n,
                div: i,
                dl: {
                    dt: 1,
                    dd: 1
                },
                dt: i,
                em: n,
                embed: r,
                fieldset: e({
                    legend: 1
                }, i),
                figcaption: i,
                figure: e({
                    figcaption: 1
                }, i),
                footer: i,
                form: i,
                h1: n,
                h2: n,
                h3: n,
                h4: n,
                h5: n,
                h6: n,
                head: e({
                    title: 1,
                    base: 1
                }, a),
                header: i,
                hgroup: {
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1
                },
                hr: r,
                html: e({
                    head: 1,
                    body: 1
                }, i, a),
                i: n,
                iframe: s,
                img: r,
                input: r,
                ins: n,
                kbd: n,
                keygen: r,
                label: n,
                legend: n,
                li: i,
                link: r,
                main: i,
                map: i,
                mark: n,
                menu: e({
                    li: 1
                }, i),
                meta: r,
                meter: t(n, {
                    meter: 1
                }),
                nav: i,
                noscript: e({
                    link: 1,
                    meta: 1,
                    style: 1
                }, n),
                object: e({
                    param: 1
                }, n),
                ol: {
                    li: 1
                },
                optgroup: {
                    option: 1
                },
                option: s,
                output: n,
                p: n,
                param: r,
                pre: n,
                progress: t(n, {
                    progress: 1
                }),
                q: n,
                rp: n,
                rt: n,
                ruby: e({
                    rp: 1,
                    rt: 1
                }, n),
                s: n,
                samp: n,
                script: s,
                section: i,
                select: {
                    optgroup: 1,
                    option: 1
                },
                small: n,
                source: r,
                span: n,
                strong: n,
                style: s,
                sub: n,
                summary: n,
                sup: n,
                table: {
                    caption: 1,
                    colgroup: 1,
                    thead: 1,
                    tfoot: 1,
                    tbody: 1,
                    tr: 1
                },
                tbody: {
                    tr: 1
                },
                td: i,
                textarea: s,
                tfoot: {
                    tr: 1
                },
                th: i,
                thead: {
                    tr: 1
                },
                time: t(n, {
                    time: 1
                }),
                title: s,
                tr: {
                    th: 1,
                    td: 1
                },
                track: r,
                u: n,
                ul: {
                    li: 1
                },
                var: n,
                video: e({
                    source: 1,
                    track: 1
                }, i),
                wbr: r,
                acronym: n,
                applet: e({
                    param: 1
                }, i),
                basefont: r,
                big: n,
                center: i,
                dialog: r,
                dir: {
                    li: 1
                },
                font: n,
                isindex: r,
                noframes: i,
                strike: n,
                tt: n
            }, e(t, {
                $block: e({
                    audio: 1,
                    dd: 1,
                    dt: 1,
                    figcaption: 1,
                    li: 1,
                    video: 1
                }, o, l),
                $blockLimit: {
                    article: 1,
                    aside: 1,
                    audio: 1,
                    body: 1,
                    caption: 1,
                    details: 1,
                    dir: 1,
                    div: 1,
                    dl: 1,
                    fieldset: 1,
                    figcaption: 1,
                    figure: 1,
                    footer: 1,
                    form: 1,
                    header: 1,
                    hgroup: 1,
                    main: 1,
                    menu: 1,
                    nav: 1,
                    ol: 1,
                    section: 1,
                    table: 1,
                    td: 1,
                    th: 1,
                    tr: 1,
                    ul: 1,
                    video: 1
                },
                $cdata: {
                    script: 1,
                    style: 1
                },
                $editable: {
                    address: 1,
                    article: 1,
                    aside: 1,
                    blockquote: 1,
                    body: 1,
                    details: 1,
                    div: 1,
                    fieldset: 1,
                    figcaption: 1,
                    footer: 1,
                    form: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    header: 1,
                    hgroup: 1,
                    main: 1,
                    nav: 1,
                    p: 1,
                    pre: 1,
                    section: 1
                },
                $empty: {
                    area: 1,
                    base: 1,
                    basefont: 1,
                    br: 1,
                    col: 1,
                    command: 1,
                    dialog: 1,
                    embed: 1,
                    hr: 1,
                    img: 1,
                    input: 1,
                    isindex: 1,
                    keygen: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    source: 1,
                    track: 1,
                    wbr: 1
                },
                $inline: n,
                $list: {
                    dl: 1,
                    ol: 1,
                    ul: 1
                },
                $listItem: {
                    dd: 1,
                    dt: 1,
                    li: 1
                },
                $nonBodyContent: e({
                    body: 1,
                    head: 1,
                    html: 1
                }, t.head),
                $nonEditable: {
                    applet: 1,
                    audio: 1,
                    button: 1,
                    embed: 1,
                    iframe: 1,
                    map: 1,
                    object: 1,
                    option: 1,
                    param: 1,
                    script: 1,
                    textarea: 1,
                    video: 1
                },
                $object: {
                    applet: 1,
                    audio: 1,
                    button: 1,
                    hr: 1,
                    iframe: 1,
                    img: 1,
                    input: 1,
                    object: 1,
                    select: 1,
                    table: 1,
                    textarea: 1,
                    video: 1
                },
                $removeEmpty: {
                    abbr: 1,
                    acronym: 1,
                    b: 1,
                    bdi: 1,
                    bdo: 1,
                    big: 1,
                    cite: 1,
                    code: 1,
                    del: 1,
                    dfn: 1,
                    em: 1,
                    font: 1,
                    i: 1,
                    ins: 1,
                    label: 1,
                    kbd: 1,
                    mark: 1,
                    meter: 1,
                    output: 1,
                    q: 1,
                    ruby: 1,
                    s: 1,
                    samp: 1,
                    small: 1,
                    span: 1,
                    strike: 1,
                    strong: 1,
                    sub: 1,
                    sup: 1,
                    time: 1,
                    tt: 1,
                    u: 1,
                    var: 1
                },
                $tabIndex: {
                    a: 1,
                    area: 1,
                    button: 1,
                    input: 1,
                    object: 1,
                    select: 1,
                    textarea: 1
                },
                $tableContent: {
                    caption: 1,
                    col: 1,
                    colgroup: 1,
                    tbody: 1,
                    td: 1,
                    tfoot: 1,
                    th: 1,
                    thead: 1,
                    tr: 1
                },
                $transparent: {
                    a: 1,
                    audio: 1,
                    canvas: 1,
                    del: 1,
                    ins: 1,
                    map: 1,
                    noscript: 1,
                    object: 1,
                    video: 1
                },
                $intermediate: {
                    caption: 1,
                    colgroup: 1,
                    dd: 1,
                    dt: 1,
                    figcaption: 1,
                    legend: 1,
                    li: 1,
                    optgroup: 1,
                    option: 1,
                    rp: 1,
                    rt: 1,
                    summary: 1,
                    tbody: 1,
                    td: 1,
                    tfoot: 1,
                    th: 1,
                    thead: 1,
                    tr: 1
                }
            }), t
        }(), CKEDITOR.dom.event = function(e) {
            this.$ = e
        }, CKEDITOR.dom.event.prototype = {
            getKey: function() {
                return this.$.keyCode || this.$.which
            },
            getKeystroke: function() {
                var e = this.getKey();
                return (this.$.ctrlKey || this.$.metaKey) && (e += CKEDITOR.CTRL), this.$.shiftKey && (e += CKEDITOR.SHIFT), this.$.altKey && (e += CKEDITOR.ALT), e
            },
            preventDefault: function(e) {
                var t = this.$;
                t.preventDefault ? t.preventDefault() : t.returnValue = !1, e && this.stopPropagation()
            },
            stopPropagation: function() {
                var e = this.$;
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            },
            getTarget: function() {
                var e = this.$.target || this.$.srcElement;
                return e ? new CKEDITOR.dom.node(e) : null
            },
            getPhase: function() {
                return this.$.eventPhase || 2
            },
            getPageOffset: function() {
                var e = this.getTarget().getDocument().$;
                return {
                    x: this.$.pageX || this.$.clientX + (e.documentElement.scrollLeft || e.body.scrollLeft),
                    y: this.$.pageY || this.$.clientY + (e.documentElement.scrollTop || e.body.scrollTop)
                }
            }
        }, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function(e) {
            e && (this.$ = e)
        }, CKEDITOR.dom.domObject.prototype = function() {
            var e = function(e, t) {
                return function(n) {
                    "undefined" != typeof CKEDITOR && e.fire(t, new CKEDITOR.dom.event(n))
                }
            };
            return {
                getPrivate: function() {
                    var e;
                    return (e = this.getCustomData("_")) || this.setCustomData("_", e = {}), e
                },
                on: function(t) {
                    var n = this.getCustomData("_cke_nativeListeners");
                    return n || (n = {}, this.setCustomData("_cke_nativeListeners", n)), n[t] || (n = n[t] = e(this, t), this.$.addEventListener ? this.$.addEventListener(t, n, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + t, n)), CKEDITOR.event.prototype.on.apply(this, arguments)
                },
                removeListener: function(e) {
                    if (CKEDITOR.event.prototype.removeListener.apply(this, arguments), !this.hasListeners(e)) {
                        var t = this.getCustomData("_cke_nativeListeners"),
                            n = t && t[e];
                        n && (this.$.removeEventListener ? this.$.removeEventListener(e, n, !1) : this.$.detachEvent && this.$.detachEvent("on" + e, n), delete t[e])
                    }
                },
                removeAllListeners: function() {
                    var e, t = this.getCustomData("_cke_nativeListeners");
                    for (e in t) {
                        var n = t[e];
                        this.$.detachEvent ? this.$.detachEvent("on" + e, n) : this.$.removeEventListener && this.$.removeEventListener(e, n, !1), delete t[e]
                    }
                    CKEDITOR.event.prototype.removeAllListeners.call(this)
                }
            }
        }(), function(e) {
            var t = {};
            CKEDITOR.on("reset", function() {
                t = {}
            }), e.equals = function(e) {
                try {
                    return e && e.$ === this.$
                } catch (e) {
                    return !1
                }
            }, e.setCustomData = function(e, n) {
                var i = this.getUniqueId();
                return (t[i] || (t[i] = {}))[e] = n, this
            }, e.getCustomData = function(e) {
                var n = this.$["data-cke-expando"];
                return (n = n && t[n]) && e in n ? n[e] : null
            }, e.removeCustomData = function(e) {
                var n, i, o = this.$["data-cke-expando"],
                    o = o && t[o];
                return o && (n = o[e], i = e in o, delete o[e]), i ? n : null
            }, e.clearCustomData = function() {
                this.removeAllListeners();
                var e = this.$["data-cke-expando"];
                e && delete t[e]
            }, e.getUniqueId = function() {
                return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
            }, CKEDITOR.event.implementOn(e)
        }(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function(e) {
            return e ? new CKEDITOR.dom[e.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : e.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : e.nodeType == CKEDITOR.NODE_TEXT ? "text" : e.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : e.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](e) : this
        }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
            appendTo: function(e, t) {
                return e.append(this, t), e
            },
            clone: function(e, t) {
                function n(i) {
                    if (i["data-cke-expando"] && (i["data-cke-expando"] = !1), (i.nodeType == CKEDITOR.NODE_ELEMENT || i.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && (!t && i.nodeType == CKEDITOR.NODE_ELEMENT && i.removeAttribute("id", !1), e))
                        for (var i = i.childNodes, o = 0; o < i.length; o++) n(i[o])
                }

                function i(t) {
                    if (t.type == CKEDITOR.NODE_ELEMENT || t.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        if (t.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var n = t.getName();
                            ":" == n[0] && t.renameNode(n.substring(1))
                        }
                        if (e)
                            for (n = 0; n < t.getChildCount(); n++) i(t.getChild(n))
                    }
                }
                var o = this.$.cloneNode(e);
                return n(o), o = new CKEDITOR.dom.node(o), CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && i(o), o
            },
            hasPrevious: function() {
                return !!this.$.previousSibling
            },
            hasNext: function() {
                return !!this.$.nextSibling
            },
            insertAfter: function(e) {
                return e.$.parentNode.insertBefore(this.$, e.$.nextSibling), e
            },
            insertBefore: function(e) {
                return e.$.parentNode.insertBefore(this.$, e.$), e
            },
            insertBeforeMe: function(e) {
                return this.$.parentNode.insertBefore(e.$, this.$), e
            },
            getAddress: function(e) {
                for (var t = [], n = this.getDocument().$.documentElement, i = this.$; i && i != n;) {
                    var o = i.parentNode;
                    o && t.unshift(this.getIndex.call({
                        $: i
                    }, e)), i = o
                }
                return t
            },
            getDocument: function() {
                return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
            },
            getIndex: function(e) {
                function t(e, n) {
                    var i = n ? e.nextSibling : e.previousSibling;
                    return i && i.nodeType == CKEDITOR.NODE_TEXT ? i.nodeValue ? i : t(i, n) : null
                }
                var n, i = this.$,
                    o = -1;
                if (!this.$.parentNode || e && i.nodeType == CKEDITOR.NODE_TEXT && !i.nodeValue && !t(i) && !t(i, !0)) return -1;
                do(!e || i == this.$ || i.nodeType != CKEDITOR.NODE_TEXT || !n && i.nodeValue) && (o++, n = i.nodeType == CKEDITOR.NODE_TEXT); while (i = i.previousSibling);
                return o
            },
            getNextSourceNode: function(e, t, n) {
                if (n && !n.call) var i = n,
                    n = function(e) {
                        return !e.equals(i)
                    };
                var o, e = !e && this.getFirst && this.getFirst();
                if (!e) {
                    if (this.type == CKEDITOR.NODE_ELEMENT && n && n(this, !0) === !1) return null;
                    e = this.getNext()
                }
                for (; !e && (o = (o || this).getParent());) {
                    if (n && n(o, !0) === !1) return null;
                    e = o.getNext()
                }
                return !e || n && n(e) === !1 ? null : t && t != e.type ? e.getNextSourceNode(!1, t, n) : e
            },
            getPreviousSourceNode: function(e, t, n) {
                if (n && !n.call) var i = n,
                    n = function(e) {
                        return !e.equals(i)
                    };
                var o, e = !e && this.getLast && this.getLast();
                if (!e) {
                    if (this.type == CKEDITOR.NODE_ELEMENT && n && n(this, !0) === !1) return null;
                    e = this.getPrevious()
                }
                for (; !e && (o = (o || this).getParent());) {
                    if (n && n(o, !0) === !1) return null;
                    e = o.getPrevious()
                }
                return !e || n && n(e) === !1 ? null : t && e.type != t ? e.getPreviousSourceNode(!1, t, n) : e
            },
            getPrevious: function(e) {
                var t, n = this.$;
                do t = (n = n.previousSibling) && 10 != n.nodeType && new CKEDITOR.dom.node(n); while (t && e && !e(t));
                return t
            },
            getNext: function(e) {
                var t, n = this.$;
                do t = (n = n.nextSibling) && new CKEDITOR.dom.node(n); while (t && e && !e(t));
                return t
            },
            getParent: function(e) {
                var t = this.$.parentNode;
                return t && (t.nodeType == CKEDITOR.NODE_ELEMENT || e && t.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(t) : null
            },
            getParents: function(e) {
                var t = this,
                    n = [];
                do n[e ? "push" : "unshift"](t); while (t = t.getParent());
                return n
            },
            getCommonAncestor: function(e) {
                if (e.equals(this)) return this;
                if (e.contains && e.contains(this)) return e;
                var t = this.contains ? this : this.getParent();
                do
                    if (t.contains(e)) return t; while (t = t.getParent());
                return null
            },
            getPosition: function(e) {
                var t = this.$,
                    n = e.$;
                if (t.compareDocumentPosition) return t.compareDocumentPosition(n);
                if (t == n) return CKEDITOR.POSITION_IDENTICAL;
                if (this.type == CKEDITOR.NODE_ELEMENT && e.type == CKEDITOR.NODE_ELEMENT) {
                    if (t.contains) {
                        if (t.contains(n)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
                        if (n.contains(t)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                    }
                    if ("sourceIndex" in t) return t.sourceIndex < 0 || n.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED : t.sourceIndex < n.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
                }
                for (var t = this.getAddress(), e = e.getAddress(), n = Math.min(t.length, e.length), i = 0; i < n; i++)
                    if (t[i] != e[i]) return t[i] < e[i] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
                return t.length < e.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
            },
            getAscendant: function(e, t) {
                var n, i, o = this.$;
                t || (o = o.parentNode), "function" == typeof e ? (i = !0, n = e) : (i = !1, n = function(t) {
                    return t = "string" == typeof t.nodeName ? t.nodeName.toLowerCase() : "", "string" == typeof e ? t == e : t in e
                });
                for (; o;) {
                    if (n(i ? new CKEDITOR.dom.node(o) : o)) return new CKEDITOR.dom.node(o);
                    try {
                        o = o.parentNode
                    } catch (e) {
                        o = null
                    }
                }
                return null
            },
            hasAscendant: function(e, t) {
                var n = this.$;
                for (t || (n = n.parentNode); n;) {
                    if (n.nodeName && n.nodeName.toLowerCase() == e) return !0;
                    n = n.parentNode
                }
                return !1
            },
            move: function(e, t) {
                e.append(this.remove(), t)
            },
            remove: function(e) {
                var t = this.$,
                    n = t.parentNode;
                if (n) {
                    if (e)
                        for (; e = t.firstChild;) n.insertBefore(t.removeChild(e), t);
                    n.removeChild(t)
                }
                return this
            },
            replace: function(e) {
                this.insertBefore(e), e.remove()
            },
            trim: function() {
                this.ltrim(), this.rtrim()
            },
            ltrim: function() {
                for (var e; this.getFirst && (e = this.getFirst());) {
                    if (e.type == CKEDITOR.NODE_TEXT) {
                        var t = CKEDITOR.tools.ltrim(e.getText()),
                            n = e.getLength();
                        if (!t) {
                            e.remove();
                            continue
                        }
                        t.length < n && (e.split(n - t.length), this.$.removeChild(this.$.firstChild))
                    }
                    break
                }
            },
            rtrim: function() {
                for (var e; this.getLast && (e = this.getLast());) {
                    if (e.type == CKEDITOR.NODE_TEXT) {
                        var t = CKEDITOR.tools.rtrim(e.getText()),
                            n = e.getLength();
                        if (!t) {
                            e.remove();
                            continue
                        }
                        t.length < n && (e.split(t.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild))
                    }
                    break
                }
                CKEDITOR.env.needsBrFiller && (e = this.$.lastChild) && 1 == e.type && "br" == e.nodeName.toLowerCase() && e.parentNode.removeChild(e)
            },
            isReadOnly: function(e) {
                var t = this;
                if (this.type != CKEDITOR.NODE_ELEMENT && (t = this.getParent()), CKEDITOR.env.edge && t && t.is("textarea") && (e = !0), !e && t && "undefined" != typeof t.$.isContentEditable) return !(t.$.isContentEditable || t.data("cke-editable"));
                for (; t;) {
                    if (t.data("cke-editable")) return !1;
                    if (t.hasAttribute("contenteditable")) return "false" == t.getAttribute("contenteditable");
                    t = t.getParent()
                }
                return !0
            }
        }), CKEDITOR.dom.window = function(e) {
            CKEDITOR.dom.domObject.call(this, e)
        }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
            focus: function() {
                this.$.focus()
            },
            getViewPaneSize: function() {
                var e = this.$.document,
                    t = "CSS1Compat" == e.compatMode;
                return {
                    width: (t ? e.documentElement.clientWidth : e.body.clientWidth) || 0,
                    height: (t ? e.documentElement.clientHeight : e.body.clientHeight) || 0
                }
            },
            getScrollPosition: function() {
                var e = this.$;
                return "pageXOffset" in e ? {
                    x: e.pageXOffset || 0,
                    y: e.pageYOffset || 0
                } : (e = e.document, {
                    x: e.documentElement.scrollLeft || e.body.scrollLeft || 0,
                    y: e.documentElement.scrollTop || e.body.scrollTop || 0
                })
            },
            getFrame: function() {
                var e = this.$.frameElement;
                return e ? new CKEDITOR.dom.element.get(e) : null
            }
        }), CKEDITOR.dom.document = function(e) {
            CKEDITOR.dom.domObject.call(this, e)
        }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
            type: CKEDITOR.NODE_DOCUMENT,
            appendStyleSheet: function(e) {
                if (this.$.createStyleSheet) this.$.createStyleSheet(e);
                else {
                    var t = new CKEDITOR.dom.element("link");
                    t.setAttributes({
                        rel: "stylesheet",
                        type: "text/css",
                        href: e
                    }), this.getHead().append(t)
                }
            },
            appendStyleText: function(e) {
                if (this.$.createStyleSheet) {
                    var t = this.$.createStyleSheet("");
                    t.cssText = e
                } else {
                    var n = new CKEDITOR.dom.element("style", this);
                    n.append(new CKEDITOR.dom.text(e, this)), this.getHead().append(n)
                }
                return t || n.$.sheet
            },
            createElement: function(e, t) {
                var n = new CKEDITOR.dom.element(e, this);
                return t && (t.attributes && n.setAttributes(t.attributes), t.styles && n.setStyles(t.styles)), n
            },
            createText: function(e) {
                return new CKEDITOR.dom.text(e, this)
            },
            focus: function() {
                this.getWindow().focus()
            },
            getActive: function() {
                var e;
                try {
                    e = this.$.activeElement
                } catch (e) {
                    return null
                }
                return new CKEDITOR.dom.element(e)
            },
            getById: function(e) {
                return (e = this.$.getElementById(e)) ? new CKEDITOR.dom.element(e) : null
            },
            getByAddress: function(e, t) {
                for (var n = this.$.documentElement, i = 0; n && i < e.length; i++) {
                    var o = e[i];
                    if (t)
                        for (var a = -1, r = 0; r < n.childNodes.length; r++) {
                            var s = n.childNodes[r];
                            if ((t !== !0 || 3 != s.nodeType || !s.previousSibling || 3 != s.previousSibling.nodeType) && (a++, a == o)) {
                                n = s;
                                break
                            }
                        } else n = n.childNodes[o]
                }
                return n ? new CKEDITOR.dom.node(n) : null
            },
            getElementsByTag: function(e, t) {
                return !(CKEDITOR.env.ie && document.documentMode <= 8) && t && (e = t + ":" + e), new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(e))
            },
            getHead: function() {
                var e = this.$.getElementsByTagName("head")[0];
                return e = e ? new CKEDITOR.dom.element(e) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
            },
            getBody: function() {
                return new CKEDITOR.dom.element(this.$.body)
            },
            getDocumentElement: function() {
                return new CKEDITOR.dom.element(this.$.documentElement)
            },
            getWindow: function() {
                return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView)
            },
            write: function(e) {
                this.$.open("text/html", "replace"), CKEDITOR.env.ie && (e = e.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$&\n<script data-cke-temp="1">(' + CKEDITOR.tools.fixDomain + ")();</script>")), this.$.write(e), this.$.close()
            },
            find: function(e) {
                return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(e))
            },
            findOne: function(e) {
                return (e = this.$.querySelector(e)) ? new CKEDITOR.dom.element(e) : null
            },
            _getHtml5ShivFrag: function() {
                var e = this.getCustomData("html5ShivFrag");
                return e || (e = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(e, !0), this.setCustomData("html5ShivFrag", e)), e
            }
        }), CKEDITOR.dom.nodeList = function(e) {
            this.$ = e
        }, CKEDITOR.dom.nodeList.prototype = {
            count: function() {
                return this.$.length
            },
            getItem: function(e) {
                return e < 0 || e >= this.$.length ? null : (e = this.$[e]) ? new CKEDITOR.dom.node(e) : null
            }
        }, CKEDITOR.dom.element = function(e, t) {
            "string" == typeof e && (e = (t ? t.$ : document).createElement(e)), CKEDITOR.dom.domObject.call(this, e)
        }, CKEDITOR.dom.element.get = function(e) {
            return (e = "string" == typeof e ? document.getElementById(e) || document.getElementsByName(e)[0] : e) && (e.$ ? e : new CKEDITOR.dom.element(e))
        }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function(e, t) {
            var n = new CKEDITOR.dom.element("div", t);
            return n.setHtml(e), n.getFirst().remove()
        }, CKEDITOR.dom.element.setMarker = function(e, t, n, i) {
            var o = t.getCustomData("list_marker_id") || t.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
                a = t.getCustomData("list_marker_names") || t.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
            return e[o] = t, a[n] = 1, t.setCustomData(n, i)
        }, CKEDITOR.dom.element.clearAllMarkers = function(e) {
            for (var t in e) CKEDITOR.dom.element.clearMarkers(e, e[t], 1)
        }, CKEDITOR.dom.element.clearMarkers = function(e, t, n) {
            var i, o = t.getCustomData("list_marker_names"),
                a = t.getCustomData("list_marker_id");
            for (i in o) t.removeCustomData(i);
            t.removeCustomData("list_marker_names"), n && (t.removeCustomData("list_marker_id"), delete e[a])
        }, function() {
            function e(e, t) {
                return (" " + e + " ").replace(a, " ").indexOf(" " + t + " ") > -1
            }

            function t(e) {
                var t = !0;
                return e.$.id || (e.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), t = !1),
                    function() {
                        t || e.removeAttribute("id")
                    }
            }

            function n(e, t) {
                return "#" + e.$.id + " " + t.split(/,\s*/).join(", #" + e.$.id + " ")
            }

            function i(e) {
                for (var t = 0, n = 0, i = r[e].length; n < i; n++) t += parseInt(this.getComputedStyle(r[e][n]) || 0, 10) || 0;
                return t
            }
            var o = !!document.createElement("span").classList,
                a = /[\n\t\r]/g;
            CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
                type: CKEDITOR.NODE_ELEMENT,
                addClass: o ? function(e) {
                    return this.$.classList.add(e), this
                } : function(t) {
                    var n = this.$.className;
                    return n && (e(n, t) || (n += " " + t)), this.$.className = n || t, this
                },
                removeClass: o ? function(e) {
                    var t = this.$;
                    return t.classList.remove(e), t.className || t.removeAttribute("class"), this
                } : function(t) {
                    var n = this.getAttribute("class");
                    return n && e(n, t) && ((n = n.replace(RegExp("(?:^|\\s+)" + t + "(?=\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", n) : this.removeAttribute("class")), this
                },
                hasClass: function(t) {
                    return e(this.$.className, t)
                },
                append: function(e, t) {
                    return "string" == typeof e && (e = this.getDocument().createElement(e)), t ? this.$.insertBefore(e.$, this.$.firstChild) : this.$.appendChild(e.$), e
                },
                appendHtml: function(e) {
                    if (this.$.childNodes.length) {
                        var t = new CKEDITOR.dom.element("div", this.getDocument());
                        t.setHtml(e), t.moveChildren(this)
                    } else this.setHtml(e)
                },
                appendText: function(e) {
                    null != this.$.text && CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? this.$.text = this.$.text + e : this.append(new CKEDITOR.dom.text(e))
                },
                appendBogus: function(e) {
                    if (e || CKEDITOR.env.needsBrFiller) {
                        for (e = this.getLast(); e && e.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(e.getText());) e = e.getPrevious();
                        e && e.is && e.is("br") || (e = this.getDocument().createElement("br"), CKEDITOR.env.gecko && e.setAttribute("type", "_moz"), this.append(e))
                    }
                },
                breakParent: function(e, t) {
                    var n = new CKEDITOR.dom.range(this.getDocument());
                    n.setStartAfter(this), n.setEndAfter(e);
                    var i = n.extractContents(!1, t || !1);
                    n.insertNode(this.remove()), i.insertAfterNode(this)
                },
                contains: document.compareDocumentPosition ? function(e) {
                    return !!(16 & this.$.compareDocumentPosition(e.$))
                } : function(e) {
                    var t = this.$;
                    return e.type != CKEDITOR.NODE_ELEMENT ? t.contains(e.getParent().$) : t != e.$ && t.contains(e.$)
                },
                focus: function() {
                    function e() {
                        try {
                            this.$.focus()
                        } catch (e) {}
                    }
                    return function(t) {
                        t ? CKEDITOR.tools.setTimeout(e, 100, this) : e.call(this)
                    }
                }(),
                getHtml: function() {
                    var e = this.$.innerHTML;
                    return CKEDITOR.env.ie ? e.replace(/<\?[^>]*>/g, "") : e
                },
                getOuterHtml: function() {
                    if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                    var e = this.$.ownerDocument.createElement("div");
                    return e.appendChild(this.$.cloneNode(!0)), e.innerHTML
                },
                getClientRect: function() {
                    var e = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                    return !e.width && (e.width = e.right - e.left), !e.height && (e.height = e.bottom - e.top), e
                },
                setHtml: CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function(e) {
                    try {
                        var t = this.$;
                        if (this.getParent()) return t.innerHTML = e;
                        var n = this.getDocument()._getHtml5ShivFrag();
                        return n.appendChild(t), t.innerHTML = e, n.removeChild(t), e
                    } catch (n) {
                        for (this.$.innerHTML = "", t = new CKEDITOR.dom.element("body", this.getDocument()), t.$.innerHTML = e, t = t.getChildren(); t.count();) this.append(t.getItem(0));
                        return e
                    }
                } : function(e) {
                    return this.$.innerHTML = e
                },
                setText: function() {
                    var e = document.createElement("p");
                    return e.innerHTML = "x", e = e.textContent,
                        function(t) {
                            this.$[e ? "textContent" : "innerText"] = t
                        }
                }(),
                getAttribute: function() {
                    var e = function(e) {
                        return this.$.getAttribute(e, 2)
                    };
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(e) {
                        switch (e) {
                            case "class":
                                e = "className";
                                break;
                            case "http-equiv":
                                e = "httpEquiv";
                                break;
                            case "name":
                                return this.$.name;
                            case "tabindex":
                                return e = this.$.getAttribute(e, 2), 0 !== e && 0 === this.$.tabIndex && (e = null), e;
                            case "checked":
                                return e = this.$.attributes.getNamedItem(e), (e.specified ? e.nodeValue : this.$.checked) ? "checked" : null;
                            case "hspace":
                            case "value":
                                return this.$[e];
                            case "style":
                                return this.$.style.cssText;
                            case "contenteditable":
                            case "contentEditable":
                                return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                        }
                        return this.$.getAttribute(e, 2)
                    } : e
                }(),
                getChildren: function() {
                    return new CKEDITOR.dom.nodeList(this.$.childNodes)
                },
                getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function(e) {
                    var t = this.getWindow().$.getComputedStyle(this.$, null);
                    return t ? t.getPropertyValue(e) : ""
                } : function(e) {
                    return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(e)]
                },
                getDtd: function() {
                    var e = CKEDITOR.dtd[this.getName()];
                    return this.getDtd = function() {
                        return e
                    }, e
                },
                getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
                getTabIndex: function() {
                    var e = this.$.tabIndex;
                    return 0 !== e || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? e : -1
                },
                getText: function() {
                    return this.$.textContent || this.$.innerText || ""
                },
                getWindow: function() {
                    return this.getDocument().getWindow()
                },
                getId: function() {
                    return this.$.id || null
                },
                getNameAtt: function() {
                    return this.$.name || null
                },
                getName: function() {
                    var e = this.$.nodeName.toLowerCase();
                    if (CKEDITOR.env.ie && document.documentMode <= 8) {
                        var t = this.$.scopeName;
                        "HTML" != t && (e = t.toLowerCase() + ":" + e)
                    }
                    return this.getName = function() {
                        return e
                    }, this.getName()
                },
                getValue: function() {
                    return this.$.value
                },
                getFirst: function(e) {
                    var t = this.$.firstChild;
                    return (t = t && new CKEDITOR.dom.node(t)) && e && !e(t) && (t = t.getNext(e)), t
                },
                getLast: function(e) {
                    var t = this.$.lastChild;
                    return (t = t && new CKEDITOR.dom.node(t)) && e && !e(t) && (t = t.getPrevious(e)), t
                },
                getStyle: function(e) {
                    return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(e)]
                },
                is: function() {
                    var e = this.getName();
                    if ("object" == typeof arguments[0]) return !!arguments[0][e];
                    for (var t = 0; t < arguments.length; t++)
                        if (arguments[t] == e) return !0;
                    return !1
                },
                isEditable: function(e) {
                    var t = this.getName();
                    return !(this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[t] || CKEDITOR.dtd.$empty[t] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount()) && (e === !1 || (e = CKEDITOR.dtd[t] || CKEDITOR.dtd.span, !(!e || !e["#"])))
                },
                isIdentical: function(e) {
                    var t = this.clone(0, 1),
                        e = e.clone(0, 1);
                    if (t.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]), e.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]), t.$.isEqualNode) return t.$.style.cssText = CKEDITOR.tools.normalizeCssText(t.$.style.cssText), e.$.style.cssText = CKEDITOR.tools.normalizeCssText(e.$.style.cssText), t.$.isEqualNode(e.$);
                    if (t = t.getOuterHtml(), e = e.getOuterHtml(), CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
                        var n = this.getParent();
                        n.type == CKEDITOR.NODE_ELEMENT && (n = n.clone(), n.setHtml(t), t = n.getHtml(), n.setHtml(e), e = n.getHtml())
                    }
                    return t == e
                },
                isVisible: function() {
                    var e, t, n = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility");
                    return n && CKEDITOR.env.webkit && (e = this.getWindow(), !e.equals(CKEDITOR.document.getWindow()) && (t = e.$.frameElement) && (n = new CKEDITOR.dom.element(t).isVisible())), !!n
                },
                isEmptyInlineRemoveable: function() {
                    if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
                    for (var e = this.getChildren(), t = 0, n = e.count(); t < n; t++) {
                        var i = e.getItem(t);
                        if ((i.type != CKEDITOR.NODE_ELEMENT || !i.data("cke-bookmark")) && (i.type == CKEDITOR.NODE_ELEMENT && !i.isEmptyInlineRemoveable() || i.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(i.getText()))) return !1
                    }
                    return !0
                },
                hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function() {
                    for (var e = this.$.attributes, t = 0; t < e.length; t++) {
                        var n = e[t];
                        switch (n.nodeName) {
                            case "class":
                                if (this.getAttribute("class")) return !0;
                            case "data-cke-expando":
                                continue;
                            default:
                                if (n.specified) return !0
                        }
                    }
                    return !1
                } : function() {
                    var e = this.$.attributes,
                        t = e.length,
                        n = {
                            "data-cke-expando": 1,
                            _moz_dirty: 1
                        };
                    return t > 0 && (t > 2 || !n[e[0].nodeName] || 2 == t && !n[e[1].nodeName])
                },
                hasAttribute: function() {
                    function e(e) {
                        var t = this.$.attributes.getNamedItem(e);
                        if ("input" == this.getName()) switch (e) {
                            case "class":
                                return this.$.className.length > 0;
                            case "checked":
                                return !!this.$.checked;
                            case "value":
                                return e = this.getAttribute("type"), "checkbox" == e || "radio" == e ? "on" != this.$.value : !!this.$.value
                        }
                        return !!t && t.specified
                    }
                    return CKEDITOR.env.ie ? CKEDITOR.env.version < 8 ? function(t) {
                        return "name" == t ? !!this.$.name : e.call(this, t)
                    } : e : function(e) {
                        return !!this.$.attributes.getNamedItem(e)
                    }
                }(),
                hide: function() {
                    this.setStyle("display", "none")
                },
                moveChildren: function(e, t) {
                    var n = this.$,
                        e = e.$;
                    if (n != e) {
                        var i;
                        if (t)
                            for (; i = n.lastChild;) e.insertBefore(n.removeChild(i), e.firstChild);
                        else
                            for (; i = n.firstChild;) e.appendChild(n.removeChild(i))
                    }
                },
                mergeSiblings: function() {
                    function e(e, t, n) {
                        if (t && t.type == CKEDITOR.NODE_ELEMENT) {
                            for (var i = []; t.data("cke-bookmark") || t.isEmptyInlineRemoveable();)
                                if (i.push(t), t = n ? t.getNext() : t.getPrevious(), !t || t.type != CKEDITOR.NODE_ELEMENT) return;
                            if (e.isIdentical(t)) {
                                for (var o = n ? e.getLast() : e.getFirst(); i.length;) i.shift().move(e, !n);
                                t.moveChildren(e, !n), t.remove(), o && o.type == CKEDITOR.NODE_ELEMENT && o.mergeSiblings()
                            }
                        }
                    }
                    return function(t) {
                        (t === !1 || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) && (e(this, this.getNext(), !0), e(this, this.getPrevious()))
                    }
                }(),
                show: function() {
                    this.setStyles({
                        display: "",
                        visibility: ""
                    })
                },
                setAttribute: function() {
                    var e = function(e, t) {
                        return this.$.setAttribute(e, t), this
                    };
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(t, n) {
                        return "class" == t ? this.$.className = n : "style" == t ? this.$.style.cssText = n : "tabindex" == t ? this.$.tabIndex = n : "checked" == t ? this.$.checked = n : "contenteditable" == t ? e.call(this, "contentEditable", n) : e.apply(this, arguments), this
                    } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(t, n) {
                        if ("src" == t && n.match(/^http:\/\//)) try {
                            e.apply(this, arguments)
                        } catch (e) {} else e.apply(this, arguments);
                        return this
                    } : e
                }(),
                setAttributes: function(e) {
                    for (var t in e) this.setAttribute(t, e[t]);
                    return this
                },
                setValue: function(e) {
                    return this.$.value = e, this
                },
                removeAttribute: function() {
                    var e = function(e) {
                        this.$.removeAttribute(e)
                    };
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(e) {
                        "class" == e ? e = "className" : "tabindex" == e ? e = "tabIndex" : "contenteditable" == e && (e = "contentEditable"), this.$.removeAttribute(e)
                    } : e
                }(),
                removeAttributes: function(e) {
                    if (CKEDITOR.tools.isArray(e))
                        for (var t = 0; t < e.length; t++) this.removeAttribute(e[t]);
                    else
                        for (t in e) e.hasOwnProperty(t) && this.removeAttribute(t)
                },
                removeStyle: function(e) {
                    var t = this.$.style;
                    if (t.removeProperty || "border" != e && "margin" != e && "padding" != e) t.removeProperty ? t.removeProperty(e) : t.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(e)), this.$.style.cssText || this.removeAttribute("style");
                    else {
                        var n, i = ["top", "left", "right", "bottom"];
                        "border" == e && (n = ["color", "style", "width"]);
                        for (var t = [], o = 0; o < i.length; o++)
                            if (n)
                                for (var a = 0; a < n.length; a++) t.push([e, i[o], n[a]].join("-"));
                            else t.push([e, i[o]].join("-"));
                        for (e = 0; e < t.length; e++) this.removeStyle(t[e])
                    }
                },
                setStyle: function(e, t) {
                    return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(e)] = t, this
                },
                setStyles: function(e) {
                    for (var t in e) this.setStyle(t, e[t]);
                    return this
                },
                setOpacity: function(e) {
                    CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? (e = Math.round(100 * e), this.setStyle("filter", e >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + e + ")")) : this.setStyle("opacity", e)
                },
                unselectable: function() {
                    if (this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none")), CKEDITOR.env.ie) {
                        this.setAttribute("unselectable", "on");
                        for (var e, t = this.getElementsByTag("*"), n = 0, i = t.count(); n < i; n++) e = t.getItem(n), e.setAttribute("unselectable", "on")
                    }
                },
                getPositionedAncestor: function() {
                    for (var e = this;
                        "html" != e.getName();) {
                        if ("static" != e.getComputedStyle("position")) return e;
                        e = e.getParent()
                    }
                    return null
                },
                getDocumentPosition: function(e) {
                    var t = 0,
                        n = 0,
                        i = this.getDocument(),
                        o = i.getBody(),
                        a = "BackCompat" == i.$.compatMode;
                    if (document.documentElement.getBoundingClientRect) {
                        var r = this.$.getBoundingClientRect(),
                            s = i.$.documentElement,
                            l = s.clientTop || o.$.clientTop || 0,
                            c = s.clientLeft || o.$.clientLeft || 0,
                            u = !0;
                        CKEDITOR.env.ie && (u = i.getDocumentElement().contains(this), i = i.getBody().contains(this), u = a && i || !a && u), u && (CKEDITOR.env.webkit || CKEDITOR.env.ie && CKEDITOR.env.version >= 12 ? (t = o.$.scrollLeft || s.scrollLeft, n = o.$.scrollTop || s.scrollTop) : (n = a ? o.$ : s, t = n.scrollLeft, n = n.scrollTop), t = r.left + t - c, n = r.top + n - l)
                    } else
                        for (l = this, c = null; l && "body" != l.getName() && "html" != l.getName();) {
                            for (t += l.$.offsetLeft - l.$.scrollLeft, n += l.$.offsetTop - l.$.scrollTop, l.equals(this) || (t += l.$.clientLeft || 0, n += l.$.clientTop || 0); c && !c.equals(l);) t -= c.$.scrollLeft, n -= c.$.scrollTop, c = c.getParent();
                            c = l, l = (r = l.$.offsetParent) ? new CKEDITOR.dom.element(r) : null
                        }
                    return e && (r = this.getWindow(), l = e.getWindow(), !r.equals(l) && r.$.frameElement && (e = new CKEDITOR.dom.element(r.$.frameElement).getDocumentPosition(e), t += e.x, n += e.y)), document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko || a || (t += this.$.clientLeft ? 1 : 0, n += this.$.clientTop ? 1 : 0), {
                        x: t,
                        y: n
                    }
                },
                scrollIntoView: function(e) {
                    var t = this.getParent();
                    if (t)
                        do
                            if ((t.$.clientWidth && t.$.clientWidth < t.$.scrollWidth || t.$.clientHeight && t.$.clientHeight < t.$.scrollHeight) && !t.is("body") && this.scrollIntoParent(t, e, 1), t.is("html")) {
                                var n = t.getWindow();
                                try {
                                    var i = n.$.frameElement;
                                    i && (t = new CKEDITOR.dom.element(i))
                                } catch (e) {}
                            } while (t = t.getParent())
                },
                scrollIntoParent: function(e, t, n) {
                    function i(t, n) {
                        /body|html/.test(e.getName()) ? e.getWindow().$.scrollBy(t, n) : (e.$.scrollLeft = e.$.scrollLeft + t, e.$.scrollTop = e.$.scrollTop + n)
                    }

                    function o(e, t) {
                        var n = {
                            x: 0,
                            y: 0
                        };
                        if (!e.is(u ? "body" : "html")) {
                            var i = e.$.getBoundingClientRect();
                            n.x = i.left, n.y = i.top
                        }
                        return i = e.getWindow(), i.equals(t) || (i = o(CKEDITOR.dom.element.get(i.$.frameElement), t), n.x = n.x + i.x, n.y = n.y + i.y), n
                    }

                    function a(e, t) {
                        return parseInt(e.getComputedStyle("margin-" + t) || 0, 10) || 0
                    }
                    var r, s, l, c;
                    !e && (e = this.getWindow()), l = e.getDocument();
                    var u = "BackCompat" == l.$.compatMode;
                    e instanceof CKEDITOR.dom.window && (e = u ? l.getBody() : l.getDocumentElement()), l = e.getWindow(), s = o(this, l);
                    var d = o(e, l),
                        h = this.$.offsetHeight;
                    r = this.$.offsetWidth;
                    var f = e.$.clientHeight,
                        E = e.$.clientWidth;
                    l = s.x - a(this, "left") - d.x || 0, c = s.y - a(this, "top") - d.y || 0, r = s.x + r + a(this, "right") - (d.x + E) || 0, s = s.y + h + a(this, "bottom") - (d.y + f) || 0, (c < 0 || s > 0) && i(0, t === !0 ? c : t === !1 ? s : c < 0 ? c : s), n && (l < 0 || r > 0) && i(l < 0 ? l : r, 0)
                },
                setState: function(e, t, n) {
                    switch (t = t || "cke", e) {
                        case CKEDITOR.TRISTATE_ON:
                            this.addClass(t + "_on"), this.removeClass(t + "_off"), this.removeClass(t + "_disabled"), n && this.setAttribute("aria-pressed", !0), n && this.removeAttribute("aria-disabled");
                            break;
                        case CKEDITOR.TRISTATE_DISABLED:
                            this.addClass(t + "_disabled"), this.removeClass(t + "_off"), this.removeClass(t + "_on"), n && this.setAttribute("aria-disabled", !0), n && this.removeAttribute("aria-pressed");
                            break;
                        default:
                            this.addClass(t + "_off"), this.removeClass(t + "_on"), this.removeClass(t + "_disabled"), n && this.removeAttribute("aria-pressed"), n && this.removeAttribute("aria-disabled")
                    }
                },
                getFrameDocument: function() {
                    var e = this.$;
                    try {
                        e.contentWindow.document
                    } catch (t) {
                        e.src = e.src
                    }
                    return e && new CKEDITOR.dom.document(e.contentWindow.document)
                },
                copyAttributes: function(e, t) {
                    for (var n = this.$.attributes, t = t || {}, i = 0; i < n.length; i++) {
                        var o, a = n[i],
                            r = a.nodeName.toLowerCase();
                        r in t || ("checked" == r && (o = this.getAttribute(r)) ? e.setAttribute(r, o) : CKEDITOR.env.ie && !this.hasAttribute(r) || (o = this.getAttribute(r), null === o && (o = a.nodeValue), e.setAttribute(r, o)))
                    }
                    "" !== this.$.style.cssText && (e.$.style.cssText = this.$.style.cssText)
                },
                renameNode: function(e) {
                    if (this.getName() != e) {
                        var t = this.getDocument(),
                            e = new CKEDITOR.dom.element(e, t);
                        this.copyAttributes(e), this.moveChildren(e), this.getParent(!0) && this.$.parentNode.replaceChild(e.$, this.$), e.$["data-cke-expando"] = this.$["data-cke-expando"], this.$ = e.$, delete this.getName
                    }
                },
                getChild: function() {
                    function e(e, t) {
                        var n = e.childNodes;
                        if (t >= 0 && t < n.length) return n[t]
                    }
                    return function(t) {
                        var n = this.$;
                        if (t.slice)
                            for (t = t.slice(); t.length > 0 && n;) n = e(n, t.shift());
                        else n = e(n, t);
                        return n ? new CKEDITOR.dom.node(n) : null
                    }
                }(),
                getChildCount: function() {
                    return this.$.childNodes.length
                },
                disableContextMenu: function() {
                    this.on("contextmenu", function(e) {
                        e.data.getTarget().hasClass("cke_enable_context_menu") || e.data.preventDefault()
                    })
                },
                getDirection: function(e) {
                    return e ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir")
                },
                data: function(e, t) {
                    return e = "data-" + e, void 0 === t ? this.getAttribute(e) : (t === !1 ? this.removeAttribute(e) : this.setAttribute(e, t), null)
                },
                getEditor: function() {
                    var e, t, n = CKEDITOR.instances;
                    for (e in n)
                        if (t = n[e], t.element.equals(this) && t.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) return t;
                    return null
                },
                find: function(e) {
                    var i = t(this),
                        e = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(n(this, e)));
                    return i(), e
                },
                findOne: function(e) {
                    var i = t(this),
                        e = this.$.querySelector(n(this, e));
                    return i(), e ? new CKEDITOR.dom.element(e) : null
                },
                forEach: function(e, t, n) {
                    if (!(n || t && this.type != t)) var i = e(this);
                    if (i !== !1)
                        for (var n = this.getChildren(), o = 0; o < n.count(); o++) i = n.getItem(o), i.type == CKEDITOR.NODE_ELEMENT ? i.forEach(e, t) : (!t || i.type == t) && e(i)
                }
            });
            var r = {
                width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
                height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
            };
            CKEDITOR.dom.element.prototype.setSize = function(e, t, n) {
                "number" == typeof t && (!n || CKEDITOR.env.ie && CKEDITOR.env.quirks || (t -= i.call(this, e)), this.setStyle(e, t + "px"))
            }, CKEDITOR.dom.element.prototype.getSize = function(e, t) {
                var n = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(e)], this.$["client" + CKEDITOR.tools.capitalize(e)]) || 0;
                return t && (n -= i.call(this, e)), n
            }
        }(), CKEDITOR.dom.documentFragment = function(e) {
            e = e || CKEDITOR.document, this.$ = e.type == CKEDITOR.NODE_DOCUMENT ? e.$.createDocumentFragment() : e
        }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
            insertAfterNode: function(e) {
                e = e.$, e.parentNode.insertBefore(this.$, e.nextSibling)
            },
            getHtml: function() {
                var e = new CKEDITOR.dom.element("div");
                return this.clone(1, 1).appendTo(e), e.getHtml().replace(/\s*data-cke-expando=".*?"/g, "")
            }
        }, !0, {
            append: 1,
            appendBogus: 1,
            clone: 1,
            getFirst: 1,
            getHtml: 1,
            getLast: 1,
            getParent: 1,
            getNext: 1,
            getPrevious: 1,
            appendTo: 1,
            moveChildren: 1,
            insertBefore: 1,
            insertAfterNode: 1,
            replace: 1,
            trim: 1,
            type: 1,
            ltrim: 1,
            rtrim: 1,
            getDocument: 1,
            getChildCount: 1,
            getChild: 1,
            getChildren: 1
        }), function() {
            function e(e, t) {
                var n = this.range;
                if (this._.end) return null;
                if (!this._.start) {
                    if (this._.start = 1, n.collapsed) return this.end(), null;
                    n.optimize()
                }
                var i, o = n.startContainer;
                i = n.endContainer;
                var a, r = n.startOffset,
                    s = n.endOffset,
                    l = this.guard,
                    c = this.type,
                    u = e ? "getPreviousSourceNode" : "getNextSourceNode";
                if (!e && !this._.guardLTR) {
                    var d = i.type == CKEDITOR.NODE_ELEMENT ? i : i.getParent(),
                        h = i.type == CKEDITOR.NODE_ELEMENT ? i.getChild(s) : i.getNext();
                    this._.guardLTR = function(e, t) {
                        return !(t && d.equals(e) || h && e.equals(h) || e.type == CKEDITOR.NODE_ELEMENT && t && e.equals(n.root))
                    }
                }
                if (e && !this._.guardRTL) {
                    var f = o.type == CKEDITOR.NODE_ELEMENT ? o : o.getParent(),
                        E = o.type == CKEDITOR.NODE_ELEMENT ? r ? o.getChild(r - 1) : null : o.getPrevious();
                    this._.guardRTL = function(e, t) {
                        return !(t && f.equals(e) || E && e.equals(E) || e.type == CKEDITOR.NODE_ELEMENT && t && e.equals(n.root))
                    }
                }
                var m = e ? this._.guardRTL : this._.guardLTR;
                for (a = l ? function(e, t) {
                        return m(e, t) !== !1 && l(e, t)
                    } : m, this.current ? i = this.current[u](!1, c, a) : (e ? i.type == CKEDITOR.NODE_ELEMENT && (i = s > 0 ? i.getChild(s - 1) : a(i, !0) === !1 ? null : i.getPreviousSourceNode(!0, c, a)) : (i = o, i.type != CKEDITOR.NODE_ELEMENT || (i = i.getChild(r)) || (i = a(o, !0) === !1 ? null : o.getNextSourceNode(!0, c, a))), i && a(i) === !1 && (i = null)); i && !this._.end;) {
                    if (this.current = i, this.evaluator && this.evaluator(i) === !1) {
                        if (t && this.evaluator) return !1
                    } else if (!t) return i;
                    i = i[u](!1, c, a)
                }
                return this.end(), this.current = null
            }

            function t(t) {
                for (var n, i = null; n = e.call(this, t);) i = n;
                return i
            }
            CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
                $: function(e) {
                    this.range = e, this._ = {}
                },
                proto: {
                    end: function() {
                        this._.end = 1
                    },
                    next: function() {
                        return e.call(this)
                    },
                    previous: function() {
                        return e.call(this, 1)
                    },
                    checkForward: function() {
                        return e.call(this, 0, 1) !== !1
                    },
                    checkBackward: function() {
                        return e.call(this, 1, 1) !== !1
                    },
                    lastForward: function() {
                        return t.call(this)
                    },
                    lastBackward: function() {
                        return t.call(this, 1)
                    },
                    reset: function() {
                        delete this.current, this._ = {}
                    }
                }
            });
            var n = {
                    block: 1,
                    "list-item": 1,
                    table: 1,
                    "table-row-group": 1,
                    "table-header-group": 1,
                    "table-footer-group": 1,
                    "table-row": 1,
                    "table-column-group": 1,
                    "table-column": 1,
                    "table-cell": 1,
                    "table-caption": 1
                },
                i = {
                    absolute: 1,
                    fixed: 1
                };
            CKEDITOR.dom.element.prototype.isBlockBoundary = function(e) {
                return !("none" != this.getComputedStyle("float") || this.getComputedStyle("position") in i || !n[this.getComputedStyle("display")]) || !!(this.is(CKEDITOR.dtd.$block) || e && this.is(e))
            }, CKEDITOR.dom.walker.blockBoundary = function(e) {
                return function(t) {
                    return !(t.type == CKEDITOR.NODE_ELEMENT && t.isBlockBoundary(e))
                }
            }, CKEDITOR.dom.walker.listItemBoundary = function() {
                return this.blockBoundary({
                    br: 1
                })
            }, CKEDITOR.dom.walker.bookmark = function(e, t) {
                function n(e) {
                    return e && e.getName && "span" == e.getName() && e.data("cke-bookmark")
                }
                return function(i) {
                    var o, a;
                    return o = i && i.type != CKEDITOR.NODE_ELEMENT && (a = i.getParent()) && n(a), o = e ? o : o || n(i), !!(t ^ o)
                }
            }, CKEDITOR.dom.walker.whitespaces = function(e) {
                return function(t) {
                    var n;
                    return t && t.type == CKEDITOR.NODE_TEXT && (n = !CKEDITOR.tools.trim(t.getText()) || CKEDITOR.env.webkit && "​" == t.getText()), !!(e ^ n)
                }
            }, CKEDITOR.dom.walker.invisible = function(e) {
                var t = CKEDITOR.dom.walker.whitespaces(),
                    n = CKEDITOR.env.webkit ? 1 : 0;
                return function(i) {
                    return t(i) ? i = 1 : (i.type == CKEDITOR.NODE_TEXT && (i = i.getParent()), i = i.$.offsetWidth <= n), !!(e ^ i)
                }
            }, CKEDITOR.dom.walker.nodeType = function(e, t) {
                return function(n) {
                    return !!(t ^ n.type == e)
                }
            }, CKEDITOR.dom.walker.bogus = function(e) {
                function t(e) {
                    return !a(e) && !r(e)
                }
                return function(n) {
                    var i = CKEDITOR.env.needsBrFiller ? n.is && n.is("br") : n.getText && o.test(n.getText());
                    return i && (i = n.getParent(), n = n.getNext(t), i = i.isBlockBoundary() && (!n || n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary())), !!(e ^ i)
                }
            }, CKEDITOR.dom.walker.temp = function(e) {
                return function(t) {
                    return t.type != CKEDITOR.NODE_ELEMENT && (t = t.getParent()), t = t && t.hasAttribute("data-cke-temp"), !!(e ^ t)
                }
            };
            var o = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
                a = CKEDITOR.dom.walker.whitespaces(),
                r = CKEDITOR.dom.walker.bookmark(),
                s = CKEDITOR.dom.walker.temp();
            CKEDITOR.dom.walker.ignored = function(e) {
                return function(t) {
                    return t = a(t) || r(t) || s(t), !!(e ^ t)
                }
            };
            var l = CKEDITOR.dom.walker.ignored();
            CKEDITOR.dom.walker.empty = function(e) {
                return function(t) {
                    for (var n = 0, i = t.getChildCount(); n < i; ++n)
                        if (!l(t.getChild(n))) return !!e;
                    return !e
                }
            };
            var c = CKEDITOR.dom.walker.empty(),
                u = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function(e) {
                    var t, n = {};
                    for (t in e) CKEDITOR.dtd[t]["#"] && (n[t] = 1);
                    return n
                }(CKEDITOR.dtd.$block), {
                    caption: 1,
                    td: 1,
                    th: 1
                });
            CKEDITOR.dom.walker.editable = function(e) {
                return function(t) {
                    return !!(e ^ (l(t) ? 0 : t.type == CKEDITOR.NODE_TEXT || t.type == CKEDITOR.NODE_ELEMENT && (t.is(CKEDITOR.dtd.$inline) || t.is("hr") || "false" == t.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && t.is(u) && c(t)) ? 1 : 0))
                }
            }, CKEDITOR.dom.element.prototype.getBogus = function() {
                var e = this;
                do e = e.getPreviousSourceNode(); while (r(e) || a(e) || e.type == CKEDITOR.NODE_ELEMENT && e.is(CKEDITOR.dtd.$inline) && !e.is(CKEDITOR.dtd.$empty));
                return !(!e || !(CKEDITOR.env.needsBrFiller ? e.is && e.is("br") : e.getText && o.test(e.getText()))) && e
            }
        }(), CKEDITOR.dom.range = function(e) {
            this.endOffset = this.endContainer = this.startOffset = this.startContainer = null, this.collapsed = !0;
            var t = e instanceof CKEDITOR.dom.document;
            this.document = t ? e : e.getDocument(), this.root = t ? e.getBody() : e
        }, function() {
            function e(e) {
                e.collapsed = e.startContainer && e.endContainer && e.startContainer.equals(e.endContainer) && e.startOffset == e.endOffset
            }

            function t(e, t, n, i, o) {
                function a(e, t, n, i) {
                    var a = n ? e.getPrevious() : e.getNext();
                    return i && E ? a : (g || i ? t.append(e.clone(!0, o), n) : (e.remove(), m && t.append(e)), a)
                }

                function r() {
                    var e, t, n, i = Math.min(v.length, b.length);
                    for (e = 0; e < i; e++)
                        if (t = v[e], n = b[e], !t.equals(n)) return e;
                    return e - 1
                }

                function s() {
                    var t = K - 1,
                        n = u && d && !p.equals(T);
                    t < _ - 1 || t < y - 1 || n ? (n ? e.moveToPosition(T, CKEDITOR.POSITION_BEFORE_START) : y == t + 1 && c ? e.moveToPosition(b[t], CKEDITOR.POSITION_BEFORE_END) : e.moveToPosition(b[t + 1], CKEDITOR.POSITION_BEFORE_START), i && (t = v[t + 1]) && t.type == CKEDITOR.NODE_ELEMENT && (n = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', e.document), n.insertAfter(t), t.mergeSiblings(!1), e.moveToBookmark({
                        startNode: n
                    }))) : e.collapse(!0)
                }
                e.optimizeBookmark();
                var l, c, u, d, h, f, E = 0 === t,
                    m = 1 == t,
                    g = 2 == t,
                    t = g || m,
                    p = e.startContainer,
                    T = e.endContainer,
                    C = e.startOffset,
                    I = e.endOffset;
                if (g && T.type == CKEDITOR.NODE_TEXT && p.equals(T)) p = e.document.createText(p.substring(C, I)), n.append(p);
                else {
                    T.type == CKEDITOR.NODE_TEXT ? g ? f = !0 : T = T.split(I) : T.getChildCount() > 0 ? I >= T.getChildCount() ? (T = T.getChild(I - 1), c = !0) : T = T.getChild(I) : d = c = !0, p.type == CKEDITOR.NODE_TEXT ? g ? h = !0 : p.split(C) : p.getChildCount() > 0 ? 0 === C ? (p = p.getChild(C), l = !0) : p = p.getChild(C - 1) : u = l = !0;
                    for (var O, D, R, v = p.getParents(), b = T.getParents(), K = r(), _ = v.length - 1, y = b.length - 1, k = n, N = -1, S = K; S <= _; S++) {
                        for (D = v[S], R = D.getNext(), S != _ || D.equals(b[S]) && _ < y ? t && (O = k.append(D.clone(0, o))) : l ? a(D, k, !1, u) : h && k.append(e.document.createText(D.substring(C))); R;) {
                            if (R.equals(b[S])) {
                                N = S;
                                break
                            }
                            R = a(R, k)
                        }
                        k = O
                    }
                    for (k = n, S = K; S <= y; S++)
                        if (n = b[S], R = n.getPrevious(), n.equals(v[S])) t && (k = k.getChild(0));
                        else {
                            if (S != y || n.equals(v[S]) && y < _ ? t && (O = k.append(n.clone(0, o))) : c ? a(n, k, !1, d) : f && k.append(e.document.createText(n.substring(0, I))), S > N)
                                for (; R;) R = a(R, k, !0);
                            k = O
                        } g || s()
                }
            }

            function n() {
                var e = !1,
                    t = CKEDITOR.dom.walker.whitespaces(),
                    n = CKEDITOR.dom.walker.bookmark(!0),
                    i = CKEDITOR.dom.walker.bogus();
                return function(o) {
                    return !(!n(o) && !t(o)) || (i(o) && !e ? e = !0 : !(o.type == CKEDITOR.NODE_TEXT && (o.hasAscendant("pre") || CKEDITOR.tools.trim(o.getText()).length) || o.type == CKEDITOR.NODE_ELEMENT && !o.is(a)))
                }
            }

            function i(e) {
                var t = CKEDITOR.dom.walker.whitespaces(),
                    n = CKEDITOR.dom.walker.bookmark(1);
                return function(i) {
                    return !(!n(i) && !t(i)) || (!e && r(i) || i.type == CKEDITOR.NODE_ELEMENT && i.is(CKEDITOR.dtd.$removeEmpty))
                }
            }

            function o(e) {
                return function() {
                    var t;
                    return this[e ? "getPreviousNode" : "getNextNode"](function(e) {
                        return !t && c(e) && (t = e), l(e) && !(r(e) && e.equals(t))
                    })
                }
            }
            var a = {
                    abbr: 1,
                    acronym: 1,
                    b: 1,
                    bdo: 1,
                    big: 1,
                    cite: 1,
                    code: 1,
                    del: 1,
                    dfn: 1,
                    em: 1,
                    font: 1,
                    i: 1,
                    ins: 1,
                    label: 1,
                    kbd: 1,
                    q: 1,
                    samp: 1,
                    small: 1,
                    span: 1,
                    strike: 1,
                    strong: 1,
                    sub: 1,
                    sup: 1,
                    tt: 1,
                    u: 1,
                    var: 1
                },
                r = CKEDITOR.dom.walker.bogus(),
                s = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
                l = CKEDITOR.dom.walker.editable(),
                c = CKEDITOR.dom.walker.ignored(!0);
            CKEDITOR.dom.range.prototype = {
                clone: function() {
                    var e = new CKEDITOR.dom.range(this.root);
                    return e._setStartContainer(this.startContainer), e.startOffset = this.startOffset, e._setEndContainer(this.endContainer), e.endOffset = this.endOffset, e.collapsed = this.collapsed, e
                },
                collapse: function(e) {
                    e ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset), this.collapsed = !0
                },
                cloneContents: function(e) {
                    var n = new CKEDITOR.dom.documentFragment(this.document);
                    return this.collapsed || t(this, 2, n, !1, "undefined" == typeof e || e), n
                },
                deleteContents: function(e) {
                    this.collapsed || t(this, 0, null, e)
                },
                extractContents: function(e, n) {
                    var i = new CKEDITOR.dom.documentFragment(this.document);
                    return this.collapsed || t(this, 1, i, e, "undefined" == typeof n || n), i
                },
                createBookmark: function(e) {
                    var t, n, i, o, a = this.collapsed;
                    return t = this.document.createElement("span"), t.data("cke-bookmark", 1), t.setStyle("display", "none"), t.setHtml("&nbsp;"), e && (i = "cke_bm_" + CKEDITOR.tools.getNextNumber(), t.setAttribute("id", i + (a ? "C" : "S"))), a || (n = t.clone(), n.setHtml("&nbsp;"), e && n.setAttribute("id", i + "E"), o = this.clone(), o.collapse(), o.insertNode(n)), o = this.clone(), o.collapse(!0), o.insertNode(t), n ? (this.setStartAfter(t), this.setEndBefore(n)) : this.moveToPosition(t, CKEDITOR.POSITION_AFTER_END), {
                        startNode: e ? i + (a ? "C" : "S") : t,
                        endNode: e ? i + "E" : n,
                        serializable: e,
                        collapsed: a
                    }
                },
                createBookmark2: function() {
                    function e(e) {
                        var n, i = e.container,
                            o = e.offset;
                        n = i;
                        var a = o;
                        if (n = n.type != CKEDITOR.NODE_ELEMENT || 0 === a || a == n.getChildCount() ? 0 : n.getChild(a - 1).type == CKEDITOR.NODE_TEXT && n.getChild(a).type == CKEDITOR.NODE_TEXT, n && (i = i.getChild(o - 1), o = i.getLength()), i.type == CKEDITOR.NODE_ELEMENT && o > 1 && (o = i.getChild(o - 1).getIndex(!0) + 1), i.type == CKEDITOR.NODE_TEXT) {
                            for (n = i, a = 0;
                                (n = n.getPrevious()) && n.type == CKEDITOR.NODE_TEXT;) a += n.getLength();
                            n = a, i.getText() ? o += n : (a = i.getPrevious(t), n ? (o = n, i = a ? a.getNext() : i.getParent().getFirst()) : (i = i.getParent(), o = a ? a.getIndex(!0) + 1 : 0))
                        }
                        e.container = i, e.offset = o
                    }
                    var t = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0);
                    return function(t) {
                        var n = this.collapsed,
                            i = {
                                container: this.startContainer,
                                offset: this.startOffset
                            },
                            o = {
                                container: this.endContainer,
                                offset: this.endOffset
                            };
                        return t && (e(i), n || e(o)), {
                            start: i.container.getAddress(t),
                            end: n ? null : o.container.getAddress(t),
                            startOffset: i.offset,
                            endOffset: o.offset,
                            normalized: t,
                            collapsed: n,
                            is2: !0
                        }
                    }
                }(),
                moveToBookmark: function(e) {
                    if (e.is2) {
                        var t = this.document.getByAddress(e.start, e.normalized),
                            n = e.startOffset,
                            i = e.end && this.document.getByAddress(e.end, e.normalized),
                            e = e.endOffset;
                        this.setStart(t, n), i ? this.setEnd(i, e) : this.collapse(!0)
                    } else t = (n = e.serializable) ? this.document.getById(e.startNode) : e.startNode, e = n ? this.document.getById(e.endNode) : e.endNode, this.setStartBefore(t), t.remove(), e ? (this.setEndBefore(e), e.remove()) : this.collapse(!0)
                },
                getBoundaryNodes: function() {
                    var e, t = this.startContainer,
                        n = this.endContainer,
                        i = this.startOffset,
                        o = this.endOffset;
                    if (t.type == CKEDITOR.NODE_ELEMENT)
                        if (e = t.getChildCount(), e > i) t = t.getChild(i);
                        else if (e < 1) t = t.getPreviousSourceNode();
                    else {
                        for (t = t.$; t.lastChild;) t = t.lastChild;
                        t = new CKEDITOR.dom.node(t), t = t.getNextSourceNode() || t
                    }
                    if (n.type == CKEDITOR.NODE_ELEMENT)
                        if (e = n.getChildCount(), e > o) n = n.getChild(o).getPreviousSourceNode(!0);
                        else if (e < 1) n = n.getPreviousSourceNode();
                    else {
                        for (n = n.$; n.lastChild;) n = n.lastChild;
                        n = new CKEDITOR.dom.node(n)
                    }
                    return t.getPosition(n) & CKEDITOR.POSITION_FOLLOWING && (t = n), {
                        startNode: t,
                        endNode: n
                    }
                },
                getCommonAncestor: function(e, t) {
                    var n = this.startContainer,
                        i = this.endContainer,
                        n = n.equals(i) ? e && n.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? n.getChild(this.startOffset) : n : n.getCommonAncestor(i);
                    return t && !n.is ? n.getParent() : n
                },
                optimize: function() {
                    var e = this.startContainer,
                        t = this.startOffset;
                    e.type != CKEDITOR.NODE_ELEMENT && (t ? t >= e.getLength() && this.setStartAfter(e) : this.setStartBefore(e)), e = this.endContainer, t = this.endOffset, e.type != CKEDITOR.NODE_ELEMENT && (t ? t >= e.getLength() && this.setEndAfter(e) : this.setEndBefore(e))
                },
                optimizeBookmark: function() {
                    var e = this.startContainer,
                        t = this.endContainer;
                    e.is && e.is("span") && e.data("cke-bookmark") && this.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), t && t.is && t.is("span") && t.data("cke-bookmark") && this.setEndAt(t, CKEDITOR.POSITION_AFTER_END)
                },
                trim: function(e, t) {
                    var n = this.startContainer,
                        i = this.startOffset,
                        o = this.collapsed;
                    if ((!e || o) && n && n.type == CKEDITOR.NODE_TEXT) {
                        if (i)
                            if (i >= n.getLength()) i = n.getIndex() + 1, n = n.getParent();
                            else {
                                var a = n.split(i),
                                    i = n.getIndex() + 1,
                                    n = n.getParent();
                                this.startContainer.equals(this.endContainer) ? this.setEnd(a, this.endOffset - this.startOffset) : n.equals(this.endContainer) && (this.endOffset = this.endOffset + 1)
                            }
                        else i = n.getIndex(), n = n.getParent();
                        if (this.setStart(n, i), o) return void this.collapse(!0)
                    }
                    n = this.endContainer, i = this.endOffset, t || o || !n || n.type != CKEDITOR.NODE_TEXT || (i ? (i >= n.getLength() || n.split(i), i = n.getIndex() + 1) : i = n.getIndex(), n = n.getParent(), this.setEnd(n, i))
                },
                enlarge: function(e, t) {
                    function n(e) {
                        return e && e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("contenteditable") ? null : e
                    }
                    var i = RegExp(/[^\s\ufeff]/);
                    switch (e) {
                        case CKEDITOR.ENLARGE_INLINE:
                            var o = 1;
                        case CKEDITOR.ENLARGE_ELEMENT:
                            if (this.collapsed) break;
                            var a, r, s, l, c, u, d, h = this.getCommonAncestor(),
                                f = this.root,
                                E = !1;
                            u = this.startContainer;
                            var m = this.startOffset;
                            for (u.type == CKEDITOR.NODE_TEXT ? (m && (u = !CKEDITOR.tools.trim(u.substring(0, m)).length && u, E = !!u), u && !(l = u.getPrevious()) && (s = u.getParent())) : (m && (l = u.getChild(m - 1) || u.getLast()), l || (s = u)), s = n(s); s || l;) {
                                if (s && !l) {
                                    if (!c && s.equals(h) && (c = !0), o ? s.isBlockBoundary() : !f.contains(s)) break;
                                    E && "inline" == s.getComputedStyle("display") || (E = !1, c ? a = s : this.setStartBefore(s)), l = s.getPrevious()
                                }
                                for (; l;)
                                    if (u = !1, l.type == CKEDITOR.NODE_COMMENT) l = l.getPrevious();
                                    else {
                                        if (l.type == CKEDITOR.NODE_TEXT) d = l.getText(), i.test(d) && (l = null), u = /[\s\ufeff]$/.test(d);
                                        else if ((l.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || t && l.is("br")) && !l.data("cke-bookmark"))
                                            if (E && CKEDITOR.dtd.$removeEmpty[l.getName()]) {
                                                if (d = l.getText(), i.test(d)) l = null;
                                                else
                                                    for (var g, m = l.$.getElementsByTagName("*"), p = 0; g = m[p++];)
                                                        if (!CKEDITOR.dtd.$removeEmpty[g.nodeName.toLowerCase()]) {
                                                            l = null;
                                                            break
                                                        } l && (u = !!d.length)
                                            } else l = null;
                                        if (u && (E ? c ? a = s : s && this.setStartBefore(s) : E = !0), l) {
                                            if (u = l.getPrevious(), !s && !u) {
                                                s = l, l = null;
                                                break
                                            }
                                            l = u
                                        } else s = null
                                    } s && (s = n(s.getParent()))
                            }
                            u = this.endContainer, m = this.endOffset, s = l = null, c = E = !1;
                            var T = function(e, t) {
                                var n = new CKEDITOR.dom.range(f);
                                n.setStart(e, t), n.setEndAt(f, CKEDITOR.POSITION_BEFORE_END);
                                var o, n = new CKEDITOR.dom.walker(n);
                                for (n.guard = function(e) {
                                        return !(e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary())
                                    }; o = n.next();) {
                                    if (o.type != CKEDITOR.NODE_TEXT) return !1;
                                    if (d = o != e ? o.getText() : o.substring(t), i.test(d)) return !1
                                }
                                return !0
                            };
                            for (u.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(u.substring(m)).length ? E = !0 : (E = !u.getLength(), m == u.getLength() ? (l = u.getNext()) || (s = u.getParent()) : T(u, m) && (s = u.getParent())) : (l = u.getChild(m)) || (s = u); s || l;) {
                                if (s && !l) {
                                    if (!c && s.equals(h) && (c = !0), o ? s.isBlockBoundary() : !f.contains(s)) break;
                                    E && "inline" == s.getComputedStyle("display") || (E = !1, c ? r = s : s && this.setEndAfter(s)), l = s.getNext()
                                }
                                for (; l;) {
                                    if (u = !1, l.type == CKEDITOR.NODE_TEXT) d = l.getText(), T(l, 0) || (l = null), u = /^[\s\ufeff]/.test(d);
                                    else if (l.type == CKEDITOR.NODE_ELEMENT) {
                                        if ((l.$.offsetWidth > 0 || t && l.is("br")) && !l.data("cke-bookmark"))
                                            if (E && CKEDITOR.dtd.$removeEmpty[l.getName()]) {
                                                if (d = l.getText(), i.test(d)) l = null;
                                                else
                                                    for (m = l.$.getElementsByTagName("*"), p = 0; g = m[p++];)
                                                        if (!CKEDITOR.dtd.$removeEmpty[g.nodeName.toLowerCase()]) {
                                                            l = null;
                                                            break
                                                        } l && (u = !!d.length)
                                            } else l = null
                                    } else u = 1;
                                    if (u && E && (c ? r = s : this.setEndAfter(s)), l) {
                                        if (u = l.getNext(), !s && !u) {
                                            s = l, l = null;
                                            break
                                        }
                                        l = u
                                    } else s = null
                                }
                                s && (s = n(s.getParent()))
                            }
                            a && r && (h = a.contains(r) ? r : a, this.setStartBefore(h), this.setEndAfter(h));
                            break;
                        case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                        case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                            s = new CKEDITOR.dom.range(this.root), f = this.root, s.setStartAt(f, CKEDITOR.POSITION_AFTER_START), s.setEnd(this.startContainer, this.startOffset), s = new CKEDITOR.dom.walker(s);
                            var C, I, O = CKEDITOR.dom.walker.blockBoundary(e == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
                                    br: 1
                                } : null),
                                D = null,
                                R = function(e) {
                                    if (e.type == CKEDITOR.NODE_ELEMENT && "false" == e.getAttribute("contenteditable"))
                                        if (D) {
                                            if (D.equals(e)) return void(D = null)
                                        } else D = e;
                                    else if (D) return;
                                    var t = O(e);
                                    return t || (C = e), t
                                },
                                o = function(e) {
                                    var t = R(e);
                                    return !t && e.is && e.is("br") && (I = e), t
                                };
                            if (s.guard = R, s = s.lastBackward(), C = C || f, this.setStartAt(C, !C.is("br") && (!s && this.checkStartOfBlock() || s && C.contains(s)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END), e == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                                s = this.clone(), s = new CKEDITOR.dom.walker(s);
                                var v = CKEDITOR.dom.walker.whitespaces(),
                                    b = CKEDITOR.dom.walker.bookmark();
                                if (s.evaluator = function(e) {
                                        return !v(e) && !b(e)
                                    }, (s = s.previous()) && s.type == CKEDITOR.NODE_ELEMENT && s.is("br")) break
                            }
                            s = this.clone(), s.collapse(), s.setEndAt(f, CKEDITOR.POSITION_BEFORE_END), s = new CKEDITOR.dom.walker(s), s.guard = e == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? o : R, C = D = I = null, s = s.lastForward(), C = C || f, this.setEndAt(C, !s && this.checkEndOfBlock() || s && C.contains(s) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START), I && this.setEndAfter(I)
                    }
                },
                shrink: function(e, t, n) {
                    if (!this.collapsed) {
                        var e = e || CKEDITOR.SHRINK_TEXT,
                            i = this.clone(),
                            o = this.startContainer,
                            a = this.endContainer,
                            r = this.startOffset,
                            s = this.endOffset,
                            l = 1,
                            c = 1;
                        o && o.type == CKEDITOR.NODE_TEXT && (r ? r >= o.getLength() ? i.setStartAfter(o) : (i.setStartBefore(o), l = 0) : i.setStartBefore(o)), a && a.type == CKEDITOR.NODE_TEXT && (s ? s >= a.getLength() ? i.setEndAfter(a) : (i.setEndAfter(a), c = 0) : i.setEndBefore(a));
                        var i = new CKEDITOR.dom.walker(i),
                            u = CKEDITOR.dom.walker.bookmark();
                        i.evaluator = function(t) {
                            return t.type == (e == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
                        };
                        var d;
                        return i.guard = function(t, i) {
                            return !!u(t) || !(e == CKEDITOR.SHRINK_ELEMENT && t.type == CKEDITOR.NODE_TEXT || i && t.equals(d) || n === !1 && t.type == CKEDITOR.NODE_ELEMENT && t.isBlockBoundary() || t.type == CKEDITOR.NODE_ELEMENT && t.hasAttribute("contenteditable")) && (!i && t.type == CKEDITOR.NODE_ELEMENT && (d = t), !0)
                        }, l && (o = i[e == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(o, t ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START), c && (i.reset(), (i = i[e == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(i, t ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)), !(!l && !c)
                    }
                },
                insertNode: function(e) {
                    this.optimizeBookmark(), this.trim(!1, !0);
                    var t = this.startContainer,
                        n = t.getChild(this.startOffset);
                    n ? e.insertBefore(n) : t.append(e), e.getParent() && e.getParent().equals(this.endContainer) && this.endOffset++, this.setStartBefore(e)
                },
                moveToPosition: function(e, t) {
                    this.setStartAt(e, t), this.collapse(!0)
                },
                moveToRange: function(e) {
                    this.setStart(e.startContainer, e.startOffset), this.setEnd(e.endContainer, e.endOffset)
                },
                selectNodeContents: function(e) {
                    this.setStart(e, 0), this.setEnd(e, e.type == CKEDITOR.NODE_TEXT ? e.getLength() : e.getChildCount())
                },
                setStart: function(t, n) {
                    t.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[t.getName()] && (n = t.getIndex(), t = t.getParent()), this._setStartContainer(t), this.startOffset = n, this.endContainer || (this._setEndContainer(t), this.endOffset = n), e(this)
                },
                setEnd: function(t, n) {
                    t.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[t.getName()] && (n = t.getIndex() + 1, t = t.getParent()), this._setEndContainer(t), this.endOffset = n, this.startContainer || (this._setStartContainer(t), this.startOffset = n), e(this)
                },
                setStartAfter: function(e) {
                    this.setStart(e.getParent(), e.getIndex() + 1)
                },
                setStartBefore: function(e) {
                    this.setStart(e.getParent(), e.getIndex())
                },
                setEndAfter: function(e) {
                    this.setEnd(e.getParent(), e.getIndex() + 1)
                },
                setEndBefore: function(e) {
                    this.setEnd(e.getParent(), e.getIndex())
                },
                setStartAt: function(t, n) {
                    switch (n) {
                        case CKEDITOR.POSITION_AFTER_START:
                            this.setStart(t, 0);
                            break;
                        case CKEDITOR.POSITION_BEFORE_END:
                            t.type == CKEDITOR.NODE_TEXT ? this.setStart(t, t.getLength()) : this.setStart(t, t.getChildCount());
                            break;
                        case CKEDITOR.POSITION_BEFORE_START:
                            this.setStartBefore(t);
                            break;
                        case CKEDITOR.POSITION_AFTER_END:
                            this.setStartAfter(t)
                    }
                    e(this)
                },
                setEndAt: function(t, n) {
                    switch (n) {
                        case CKEDITOR.POSITION_AFTER_START:
                            this.setEnd(t, 0);
                            break;
                        case CKEDITOR.POSITION_BEFORE_END:
                            t.type == CKEDITOR.NODE_TEXT ? this.setEnd(t, t.getLength()) : this.setEnd(t, t.getChildCount());
                            break;
                        case CKEDITOR.POSITION_BEFORE_START:
                            this.setEndBefore(t);
                            break;
                        case CKEDITOR.POSITION_AFTER_END:
                            this.setEndAfter(t)
                    }
                    e(this)
                },
                fixBlock: function(e, t) {
                    var n = this.createBookmark(),
                        i = this.document.createElement(t);
                    this.collapse(e), this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), this.extractContents().appendTo(i), i.trim(), this.insertNode(i);
                    var o = i.getBogus();
                    return o && o.remove(), i.appendBogus(), this.moveToBookmark(n), i
                },
                splitBlock: function(e, t) {
                    var n = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                        i = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
                        o = n.block,
                        a = i.block,
                        r = null;
                    return n.blockLimit.equals(i.blockLimit) ? ("br" != e && (o || (o = this.fixBlock(!0, e), a = new CKEDITOR.dom.elementPath(this.endContainer, this.root).block), a || (a = this.fixBlock(!1, e))), n = o && this.checkStartOfBlock(), i = a && this.checkEndOfBlock(), this.deleteContents(), o && o.equals(a) && (i ? (r = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), a = null) : n ? (r = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(o, CKEDITOR.POSITION_BEFORE_START), o = null) : (a = this.splitElement(o, t || !1), o.is("ul", "ol") || o.appendBogus())), {
                        previousBlock: o,
                        nextBlock: a,
                        wasStartOfBlock: n,
                        wasEndOfBlock: i,
                        elementPath: r
                    }) : null
                },
                splitElement: function(e, t) {
                    if (!this.collapsed) return null;
                    this.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);
                    var n = this.extractContents(!1, t || !1),
                        i = e.clone(!1, t || !1);
                    return n.appendTo(i), i.insertAfter(e), this.moveToPosition(e, CKEDITOR.POSITION_AFTER_END), i
                },
                removeEmptyBlocksAtEnd: function() {
                    function e(e) {
                        return function(i) {
                            return !(t(i) || n(i) || i.type == CKEDITOR.NODE_ELEMENT && i.isEmptyInlineRemoveable() || e.is("table") && i.is("caption"))
                        }
                    }
                    var t = CKEDITOR.dom.walker.whitespaces(),
                        n = CKEDITOR.dom.walker.bookmark(!1);
                    return function(t) {
                        for (var n, i = this.createBookmark(), o = this[t ? "endPath" : "startPath"](), a = o.block || o.blockLimit; a && !a.equals(o.root) && !a.getFirst(e(a));) n = a.getParent(), this[t ? "setEndAt" : "setStartAt"](a, CKEDITOR.POSITION_AFTER_END), a.remove(1), a = n;
                        this.moveToBookmark(i)
                    }
                }(),
                startPath: function() {
                    return new CKEDITOR.dom.elementPath(this.startContainer, this.root)
                },
                endPath: function() {
                    return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
                },
                checkBoundaryOfElement: function(e, t) {
                    var n = t == CKEDITOR.START,
                        o = this.clone();
                    return o.collapse(n), o[n ? "setStartAt" : "setEndAt"](e, n ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), o = new CKEDITOR.dom.walker(o), o.evaluator = i(n), o[n ? "checkBackward" : "checkForward"]()
                },
                checkStartOfBlock: function() {
                    var e = this.startContainer,
                        t = this.startOffset;
                    return CKEDITOR.env.ie && t && e.type == CKEDITOR.NODE_TEXT && (e = CKEDITOR.tools.ltrim(e.substring(0, t)), s.test(e) && this.trim(0, 1)), this.trim(), e = new CKEDITOR.dom.elementPath(this.startContainer, this.root), t = this.clone(), t.collapse(!0), t.setStartAt(e.block || e.blockLimit, CKEDITOR.POSITION_AFTER_START), e = new CKEDITOR.dom.walker(t), e.evaluator = n(), e.checkBackward()
                },
                checkEndOfBlock: function() {
                    var e = this.endContainer,
                        t = this.endOffset;
                    return CKEDITOR.env.ie && e.type == CKEDITOR.NODE_TEXT && (e = CKEDITOR.tools.rtrim(e.substring(t)), s.test(e) && this.trim(1, 0)), this.trim(), e = new CKEDITOR.dom.elementPath(this.endContainer, this.root), t = this.clone(), t.collapse(!1), t.setEndAt(e.block || e.blockLimit, CKEDITOR.POSITION_BEFORE_END), e = new CKEDITOR.dom.walker(t), e.evaluator = n(), e.checkForward()
                },
                getPreviousNode: function(e, t, n) {
                    var i = this.clone();
                    return i.collapse(1), i.setStartAt(n || this.root, CKEDITOR.POSITION_AFTER_START), n = new CKEDITOR.dom.walker(i), n.evaluator = e, n.guard = t, n.previous()
                },
                getNextNode: function(e, t, n) {
                    var i = this.clone();
                    return i.collapse(), i.setEndAt(n || this.root, CKEDITOR.POSITION_BEFORE_END), n = new CKEDITOR.dom.walker(i), n.evaluator = e, n.guard = t, n.next()
                },
                checkReadOnly: function() {
                    function e(e, t) {
                        for (; e;) {
                            if (e.type == CKEDITOR.NODE_ELEMENT) {
                                if ("false" == e.getAttribute("contentEditable") && !e.data("cke-editable")) return 0;
                                if (e.is("html") || "true" == e.getAttribute("contentEditable") && (e.contains(t) || e.equals(t))) break
                            }
                            e = e.getParent()
                        }
                        return 1
                    }
                    return function() {
                        var t = this.startContainer,
                            n = this.endContainer;
                        return !(e(t, n) && e(n, t))
                    }
                }(),
                moveToElementEditablePosition: function(e, t) {
                    if (e.type == CKEDITOR.NODE_ELEMENT && !e.isEditable(!1)) return this.moveToPosition(e, t ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0;
                    for (var n = 0; e;) {
                        if (e.type == CKEDITOR.NODE_TEXT) {
                            t && this.endContainer && this.checkEndOfBlock() && s.test(e.getText()) ? this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(e, t ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), n = 1;
                            break
                        }
                        if (e.type == CKEDITOR.NODE_ELEMENT)
                            if (e.isEditable()) this.moveToPosition(e, t ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), n = 1;
                            else if (t && e.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START);
                        else if ("false" == e.getAttribute("contenteditable") && e.is(CKEDITOR.dtd.$block)) return this.setStartBefore(e), this.setEndAfter(e), !0;
                        var i = e,
                            o = n,
                            a = void 0;
                        i.type == CKEDITOR.NODE_ELEMENT && i.isEditable(!1) && (a = i[t ? "getLast" : "getFirst"](c)), !o && !a && (a = i[t ? "getPrevious" : "getNext"](c)), e = a
                    }
                    return !!n
                },
                moveToClosestEditablePosition: function(e, t) {
                    var n, i, o, a = 0,
                        r = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
                    return e ? (n = new CKEDITOR.dom.range(this.root), n.moveToPosition(e, r[t ? 0 : 1])) : n = this.clone(), e && !e.is(CKEDITOR.dtd.$block) ? a = 1 : (i = n[t ? "getNextEditableNode" : "getPreviousEditableNode"]()) && (a = 1, (o = i.type == CKEDITOR.NODE_ELEMENT) && i.is(CKEDITOR.dtd.$block) && "false" == i.getAttribute("contenteditable") ? (n.setStartAt(i, CKEDITOR.POSITION_BEFORE_START), n.setEndAt(i, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && o && i.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (n.setEnd(i, 0), n.collapse()) : n.moveToPosition(i, r[t ? 1 : 0])), a && this.moveToRange(n), !!a
                },
                moveToElementEditStart: function(e) {
                    return this.moveToElementEditablePosition(e)
                },
                moveToElementEditEnd: function(e) {
                    return this.moveToElementEditablePosition(e, !0)
                },
                getEnclosedNode: function() {
                    var e = this.clone();
                    if (e.optimize(), e.startContainer.type != CKEDITOR.NODE_ELEMENT || e.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
                    var e = new CKEDITOR.dom.walker(e),
                        t = CKEDITOR.dom.walker.bookmark(!1, !0),
                        n = CKEDITOR.dom.walker.whitespaces(!0);
                    e.evaluator = function(e) {
                        return n(e) && t(e)
                    };
                    var i = e.next();
                    return e.reset(), i && i.equals(e.previous()) ? i : null
                },
                getTouchedStartNode: function() {
                    var e = this.startContainer;
                    return this.collapsed || e.type != CKEDITOR.NODE_ELEMENT ? e : e.getChild(this.startOffset) || e
                },
                getTouchedEndNode: function() {
                    var e = this.endContainer;
                    return this.collapsed || e.type != CKEDITOR.NODE_ELEMENT ? e : e.getChild(this.endOffset - 1) || e
                },
                getNextEditableNode: o(),
                getPreviousEditableNode: o(1),
                scrollIntoView: function() {
                    var e, t, n, i = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document),
                        o = this.clone();
                    o.optimize(), (n = o.startContainer.type == CKEDITOR.NODE_TEXT) ? (t = o.startContainer.getText(), e = o.startContainer.split(o.startOffset), i.insertAfter(o.startContainer)) : o.insertNode(i), i.scrollIntoView(), n && (o.startContainer.setText(t), e.remove()), i.remove()
                },
                _setStartContainer: function(e) {
                    this.startContainer = e
                },
                _setEndContainer: function(e) {
                    this.endContainer = e
                }
            }
        }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, function() {
            function e(e) {
                arguments.length < 1 || (this.range = e, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {}))
            }

            function t(e) {
                var t = [];
                return e.forEach(function(e) {
                    if ("true" == e.getAttribute("contenteditable")) return t.push(e), !1
                }, CKEDITOR.NODE_ELEMENT, !0), t
            }

            function n(e, i, o, a) {
                e: {
                    null == a && (a = t(o));
                    for (var r; r = a.shift();)
                        if (r.getDtd().p) {
                            a = {
                                element: r,
                                remaining: a
                            };
                            break e
                        } a = null
                }
                return a ? (r = CKEDITOR.filter.instances[a.element.data("cke-filter")]) && !r.check(i) ? n(e, i, o, a.remaining) : (i = new CKEDITOR.dom.range(a.element), i.selectNodeContents(a.element), i = i.createIterator(), i.enlargeBr = e.enlargeBr, i.enforceRealBlocks = e.enforceRealBlocks, i.activeFilter = i.filter = r, e._.nestedEditable = {
                    element: a.element,
                    container: o,
                    remaining: a.remaining,
                    iterator: i
                }, 1) : 0
            }

            function i(e, t, n) {
                return !!t && (e = e.clone(), e.collapse(!n), e.checkBoundaryOfElement(t, n ? CKEDITOR.START : CKEDITOR.END))
            }
            var o = /^[\r\n\t ]+$/,
                a = CKEDITOR.dom.walker.bookmark(!1, !0),
                r = CKEDITOR.dom.walker.whitespaces(!0),
                s = function(e) {
                    return a(e) && r(e)
                },
                l = {
                    dd: 1,
                    dt: 1,
                    li: 1
                };
            e.prototype = {
                getNextParagraph: function(e) {
                    var t, r, c, u, d, e = e || "p";
                    if (this._.nestedEditable) {
                        if (t = this._.nestedEditable.iterator.getNextParagraph(e)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, t;
                        if (this.activeFilter = this.filter, n(this, e, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(e);
                        this._.nestedEditable = null
                    }
                    if (!this.range.root.getDtd()[e]) return null;
                    if (!this._.started) {
                        var h = this.range.clone();
                        r = h.startPath();
                        var f = h.endPath(),
                            E = !h.collapsed && i(h, r.block),
                            m = !h.collapsed && i(h, f.block, 1);
                        h.shrink(CKEDITOR.SHRINK_ELEMENT, !0), E && h.setStartAt(r.block, CKEDITOR.POSITION_BEFORE_END), m && h.setEndAt(f.block, CKEDITOR.POSITION_AFTER_START), r = h.endContainer.hasAscendant("pre", !0) || h.startContainer.hasAscendant("pre", !0), h.enlarge(this.forceBrBreak && !r || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS), h.collapsed || (r = new CKEDITOR.dom.walker(h.clone()), f = CKEDITOR.dom.walker.bookmark(!0, !0), r.evaluator = f, this._.nextNode = r.next(), r = new CKEDITOR.dom.walker(h.clone()), r.evaluator = f, r = r.previous(), this._.lastNode = r.getNextSourceNode(!0, null, h.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (f = this.range.clone(), f.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), f.checkEndOfBlock() && (f = new CKEDITOR.dom.elementPath(f.endContainer, f.root), this._.lastNode = (f.block || f.blockLimit).getNextSourceNode(!0))), this._.lastNode && h.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = h.document.createText(""), this._.lastNode.insertAfter(r)), h = null), this._.started = 1, r = h
                    }
                    for (f = this._.nextNode, h = this._.lastNode, this._.nextNode = null; f;) {
                        var E = 0,
                            m = f.hasAscendant("pre"),
                            g = f.type != CKEDITOR.NODE_ELEMENT,
                            p = 0;
                        if (g) f.type == CKEDITOR.NODE_TEXT && o.test(f.getText()) && (g = 0);
                        else {
                            var T = f.getName();
                            if (CKEDITOR.dtd.$block[T] && "false" == f.getAttribute("contenteditable")) {
                                t = f, n(this, e, t);
                                break
                            }
                            if (f.isBlockBoundary(this.forceBrBreak && !m && {
                                    br: 1
                                })) {
                                if ("br" == T) g = 1;
                                else if (!r && !f.getChildCount() && "hr" != T) {
                                    t = f, c = f.equals(h);
                                    break
                                }
                                r && (r.setEndAt(f, CKEDITOR.POSITION_BEFORE_START), "br" != T && (this._.nextNode = f)), E = 1
                            } else {
                                if (f.getFirst()) {
                                    r || (r = this.range.clone(), r.setStartAt(f, CKEDITOR.POSITION_BEFORE_START)), f = f.getFirst();
                                    continue
                                }
                                g = 1
                            }
                        }
                        if (g && !r && (r = this.range.clone(), r.setStartAt(f, CKEDITOR.POSITION_BEFORE_START)), c = (!E || g) && f.equals(h), r && !E)
                            for (; !f.getNext(s) && !c;) {
                                if (T = f.getParent(), T.isBlockBoundary(this.forceBrBreak && !m && {
                                        br: 1
                                    })) {
                                    E = 1, g = 0, c || T.equals(h), r.setEndAt(T, CKEDITOR.POSITION_BEFORE_END);
                                    break
                                }
                                f = T, g = 1, c = f.equals(h), p = 1
                            }
                        if (g && r.setEndAt(f, CKEDITOR.POSITION_AFTER_END), f = this._getNextSourceNode(f, p, h), (c = !f) || E && r) break
                    }
                    if (!t) {
                        if (!r) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
                        t = new CKEDITOR.dom.elementPath(r.startContainer, r.root), f = t.blockLimit, E = {
                            div: 1,
                            th: 1,
                            td: 1
                        }, t = t.block, !t && f && !this.enforceRealBlocks && E[f.getName()] && r.checkStartOfBlock() && r.checkEndOfBlock() && !f.equals(r.root) ? t = f : !t || this.enforceRealBlocks && t.is(l) ? (t = this.range.document.createElement(e), r.extractContents().appendTo(t), t.trim(), r.insertNode(t), u = d = !0) : "li" != t.getName() ? r.checkStartOfBlock() && r.checkEndOfBlock() || (t = t.clone(!1), r.extractContents().appendTo(t), t.trim(), d = r.splitBlock(), u = !d.wasStartOfBlock, d = !d.wasEndOfBlock, r.insertNode(t)) : c || (this._.nextNode = t.equals(h) ? null : this._getNextSourceNode(r.getBoundaryNodes().endNode, 1, h))
                    }
                    return u && (u = t.getPrevious()) && u.type == CKEDITOR.NODE_ELEMENT && ("br" == u.getName() ? u.remove() : u.getLast() && "br" == u.getLast().$.nodeName.toLowerCase() && u.getLast().remove()), d && (u = t.getLast()) && u.type == CKEDITOR.NODE_ELEMENT && "br" == u.getName() && (!CKEDITOR.env.needsBrFiller || u.getPrevious(a) || u.getNext(a)) && u.remove(), this._.nextNode || (this._.nextNode = c || t.equals(h) || !h ? null : this._getNextSourceNode(t, 1, h)), t
                },
                _getNextSourceNode: function(e, t, n) {
                    function i(e) {
                        return !(e.equals(n) || e.equals(o))
                    }
                    for (var o = this.range.root, e = e.getNextSourceNode(t, null, i); !a(e);) e = e.getNextSourceNode(t, null, i);
                    return e
                }
            }, CKEDITOR.dom.range.prototype.createIterator = function() {
                return new e(this)
            }
        }(), CKEDITOR.command = function(e, t) {
            this.uiItems = [], this.exec = function(n) {
                return !(this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) && (this.editorFocus && e.focus(), this.fire("exec") === !1 || t.exec.call(this, e, n) !== !1)
            }, this.refresh = function(e, n) {
                return !(this.readOnly || !e.readOnly) || (this.context && !n.isContextFor(this.context) ? (this.disable(), !0) : this.checkAllowed(!0) ? (this.startDisabled || this.enable(), this.modes && !this.modes[e.mode] && this.disable(), this.fire("refresh", {
                    editor: e,
                    path: n
                }) === !1 || t.refresh && t.refresh.apply(this, arguments) !== !1) : (this.disable(), !0))
            };
            var n;
            this.checkAllowed = function(t) {
                return t || "boolean" != typeof n ? n = e.activeFilter.checkFeature(this) : n
            }, CKEDITOR.tools.extend(this, t, {
                modes: {
                    wysiwyg: 1
                },
                editorFocus: 1,
                contextSensitive: !!t.context,
                state: CKEDITOR.TRISTATE_DISABLED
            }), CKEDITOR.event.call(this)
        }, CKEDITOR.command.prototype = {
            enable: function() {
                this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF)
            },
            disable: function() {
                this.setState(CKEDITOR.TRISTATE_DISABLED)
            },
            setState: function(e) {
                return !(this.state == e || e != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) && (this.previousState = this.state, this.state = e, this.fire("state"), !0)
            },
            toggleState: function() {
                this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
            }
        }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
            customConfig: "config.js",
            autoUpdateElement: !0,
            language: "",
            defaultLanguage: "en",
            contentsLangDirection: "",
            enterMode: CKEDITOR.ENTER_P,
            forceEnterMode: !1,
            shiftEnterMode: CKEDITOR.ENTER_BR,
            docType: "<!DOCTYPE html>",
            bodyId: "",
            bodyClass: "",
            fullPage: !1,
            height: 200,
            extraPlugins: "",
            removePlugins: "",
            protectedSource: [],
            tabIndex: 0,
            width: "",
            baseFloatZIndex: 1e4,
            dialogZIndex: 10010,
            blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
        }, function() {
            function e(e, t, n, i, o) {
                var a, s, e = [];
                for (a in t) {
                    s = t[a], s = "boolean" == typeof s ? {} : "function" == typeof s ? {
                        match: s
                    } : y(s), "$" != a.charAt(0) && (s.elements = a), n && (s.featureName = n.toLowerCase());
                    var l = s;
                    l.elements = r(l.elements, /\s+/) || null, l.propertiesOnly = l.propertiesOnly || l.elements === !0;
                    var c = /\s*,\s*/,
                        u = void 0;
                    for (u in x) {
                        l[u] = r(l[u], c) || null;
                        var d = l,
                            h = w[u],
                            f = r(l[w[u]], c),
                            E = l[u],
                            m = [],
                            g = !0,
                            T = void 0;
                        f ? g = !1 : f = {};
                        for (T in E) "!" == T.charAt(0) && (T = T.slice(1), m.push(T), f[T] = !0, g = !1);
                        for (; T = m.pop();) E[T] = E["!" + T], delete E["!" + T];
                        d[h] = !g && f || null
                    }
                    l.match = l.match || null, i.push(s), e.push(s)
                }
                for (var C, t = o.elements, o = o.generic, n = 0, i = e.length; n < i; ++n) {
                    a = y(e[n]), s = a.classes === !0 || a.styles === !0 || a.attributes === !0, l = a, u = h = c = void 0;
                    for (c in x) l[c] = p(l[c]);
                    d = !0;
                    for (u in w) {
                        c = w[u], h = l[c], f = [], E = void 0;
                        for (E in h) E.indexOf("*") > -1 ? f.push(RegExp("^" + E.replace(/\*/g, ".*") + "$")) : f.push(E);
                        h = f, h.length && (l[c] = h, d = !1)
                    }
                    if (l.nothingRequired = d, l.noProperties = !(l.attributes || l.classes || l.styles), a.elements === !0 || null === a.elements) o[s ? "unshift" : "push"](a);
                    else {
                        l = a.elements, delete a.elements;
                        for (C in l) t[C] ? t[C][s ? "unshift" : "push"](a) : t[C] = [a]
                    }
                }
            }

            function t(e, t, i, o) {
                if ((!e.match || e.match(t)) && (o || s(e, t)) && (e.propertiesOnly || (i.valid = !0), i.allAttributes || (i.allAttributes = n(e.attributes, t.attributes, i.validAttributes)), i.allStyles || (i.allStyles = n(e.styles, t.styles, i.validStyles)), !i.allClasses)) {
                    if (e = e.classes, t = t.classes, o = i.validClasses, e)
                        if (e === !0) e = !0;
                        else {
                            for (var a, r = 0, l = t.length; r < l; ++r) a = t[r], o[a] || (o[a] = e(a));
                            e = !1
                        }
                    else e = !1;
                    i.allClasses = e
                }
            }

            function n(e, t, n) {
                if (!e) return !1;
                if (e === !0) return !0;
                for (var i in t) n[i] || (n[i] = e(i));
                return !1
            }

            function i(e, t, n) {
                if (!e.match || e.match(t)) {
                    if (e.noProperties) return !1;
                    if (n.hadInvalidAttribute = o(e.attributes, t.attributes) || n.hadInvalidAttribute, n.hadInvalidStyle = o(e.styles, t.styles) || n.hadInvalidStyle, e = e.classes, t = t.classes, e) {
                        for (var i = !1, a = e === !0, r = t.length; r--;)(a || e(t[r])) && (t.splice(r, 1), i = !0);
                        e = i
                    } else e = !1;
                    n.hadInvalidClass = e || n.hadInvalidClass
                }
            }

            function o(e, t) {
                if (!e) return !1;
                var n, i = !1,
                    o = e === !0;
                for (n in t)(o || e(n)) && (delete t[n], i = !0);
                return i
            }

            function a(e, t, n) {
                return !(e.disabled || e.customConfig && !n || !t) && (e._.cachedChecks = {}, !0)
            }

            function r(e, t) {
                if (!e) return !1;
                if (e === !0) return e;
                if ("string" == typeof e) return e = k(e), "*" == e || CKEDITOR.tools.convertArrayToObject(e.split(t));
                if (CKEDITOR.tools.isArray(e)) return !!e.length && CKEDITOR.tools.convertArrayToObject(e);
                var n, i = {},
                    o = 0;
                for (n in e) i[n] = e[n], o++;
                return !!o && i
            }

            function s(e, t) {
                if (e.nothingRequired) return !0;
                var n, i, o, a;
                if (o = e.requiredClasses)
                    for (a = t.classes, n = 0; n < o.length; ++n)
                        if (i = o[n], "string" == typeof i) {
                            if (CKEDITOR.tools.indexOf(a, i) == -1) return !1
                        } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(a, i)) return !1;
                return l(t.styles, e.requiredStyles) && l(t.attributes, e.requiredAttributes)
            }

            function l(e, t) {
                if (!t) return !0;
                for (var n, i = 0; i < t.length; ++i)
                    if (n = t[i], "string" == typeof n) {
                        if (!(n in e)) return !1
                    } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(e, n)) return !1;
                return !0
            }

            function c(e) {
                if (!e) return {};
                for (var e = e.split(/\s*,\s*/).sort(), t = {}; e.length;) t[e.shift()] = N;
                return t
            }

            function u(e) {
                for (var t, n, i, o, a = {}, r = 1, e = k(e); t = e.match(A);)(n = t[2]) ? (i = d(n, "styles"), o = d(n, "attrs"), n = d(n, "classes")) : i = o = n = null, a["$" + r++] = {
                    elements: t[1],
                    classes: n,
                    styles: i,
                    attributes: o
                }, e = e.slice(t[0].length);
                return a
            }

            function d(e, t) {
                var n = e.match(L[t]);
                return n ? k(n[1]) : null
            }

            function h(e) {
                var t = e.styleBackup = e.attributes.style,
                    n = e.classBackup = e.attributes.class;
                e.styles || (e.styles = CKEDITOR.tools.parseCssText(t || "", 1)), e.classes || (e.classes = n ? n.split(/\s+/) : [])
            }

            function f(e, n, o, a) {
                var r, s = 0;
                if (a.toHtml && (n.name = n.name.replace(P, "$1")), a.doCallbacks && e.elementCallbacks) {
                    e: for (var l, c = e.elementCallbacks, u = 0, d = c.length; u < d; ++u)
                        if (l = c[u](n)) {
                            r = l;
                            break e
                        }if (r) return r
                }
                if (a.doTransform && (r = e._.transformations[n.name])) {
                    for (h(n), c = 0; c < r.length; ++c) O(e, n, r[c]);
                    m(n)
                }
                if (a.doFilter) {
                    e: {
                        c = n.name,
                        u = e._,
                        e = u.allowedRules.elements[c],
                        r = u.allowedRules.generic,
                        c = u.disallowedRules.elements[c],
                        u = u.disallowedRules.generic,
                        d = a.skipRequired,
                        l = {
                            valid: !1,
                            validAttributes: {},
                            validClasses: {},
                            validStyles: {},
                            allAttributes: !1,
                            allClasses: !1,
                            allStyles: !1,
                            hadInvalidAttribute: !1,
                            hadInvalidClass: !1,
                            hadInvalidStyle: !1
                        };
                        var f, E;
                        if (e || r) {
                            if (h(n), c)
                                for (f = 0, E = c.length; f < E; ++f)
                                    if (i(c[f], n, l) === !1) {
                                        e = null;
                                        break e
                                    } if (u)
                                for (f = 0, E = u.length; f < E; ++f) i(u[f], n, l);
                            if (e)
                                for (f = 0, E = e.length; f < E; ++f) t(e[f], n, l, d);
                            if (r)
                                for (f = 0, E = r.length; f < E; ++f) t(r[f], n, l, d);
                            e = l
                        } else e = null
                    }
                    if (!e) return o.push(n),
                    _;
                    if (!e.valid) return o.push(n),
                    _;E = e.validAttributes;
                    var p = e.validStyles;r = e.validClasses;
                    var T, C, c = n.attributes,
                        I = n.styles,
                        u = n.classes,
                        d = n.classBackup,
                        D = n.styleBackup,
                        R = [];l = [];
                    var v = /^data-cke-/;
                    if (f = !1, delete c.style, delete c.class, delete n.classBackup, delete n.styleBackup, !e.allAttributes)
                        for (T in c) E[T] || (v.test(T) ? T == (C = T.replace(/^data-cke-saved-/, "")) || E[C] || (delete c[T], f = !0) : (delete c[T], f = !0));
                    if (!e.allStyles || e.hadInvalidStyle) {
                        for (T in I) e.allStyles || p[T] ? R.push(T + ":" + I[T]) : f = !0;
                        R.length && (c.style = R.sort().join("; "))
                    } else D && (c.style = D);
                    if (!e.allClasses || e.hadInvalidClass) {
                        for (T = 0; T < u.length; ++T)(e.allClasses || r[u[T]]) && l.push(u[T]);
                        l.length && (c.class = l.sort().join(" ")), d && l.length < d.split(/\s+/).length && (f = !0)
                    } else d && (c.class = d);
                    if (f && (s = _), !a.skipFinalValidation && !g(n)) return o.push(n),
                    _
                }
                return a.toHtml && (n.name = n.name.replace(B, "cke:$1")), s
            }

            function E(e) {
                var t, n = [];
                for (t in e) t.indexOf("*") > -1 && n.push(t.replace(/\*/g, ".*"));
                return n.length ? RegExp("^(?:" + n.join("|") + ")$") : null
            }

            function m(e) {
                var t, n = e.attributes;
                delete n.style, delete n.class, (t = CKEDITOR.tools.writeCssText(e.styles, !0)) && (n.style = t), e.classes.length && (n.class = e.classes.sort().join(" "))
            }

            function g(e) {
                switch (e.name) {
                    case "a":
                        if (!e.children.length && !e.attributes.name) return !1;
                        break;
                    case "img":
                        if (!e.attributes.src) return !1
                }
                return !0
            }

            function p(e) {
                if (!e) return !1;
                if (e === !0) return !0;
                var t = E(e);
                return function(n) {
                    return n in e || t && n.match(t)
                }
            }

            function T() {
                return new CKEDITOR.htmlParser.element("br")
            }

            function C(e) {
                return e.type == CKEDITOR.NODE_ELEMENT && ("br" == e.name || K.$block[e.name])
            }

            function I(e, t, n) {
                var i = e.name;
                if (K.$empty[i] || !e.children.length) "hr" == i && "br" == t ? e.replaceWith(T()) : (e.parent && n.push({
                    check: "it",
                    el: e.parent
                }), e.remove());
                else if (K.$block[i] || "tr" == i)
                    if ("br" == t) e.previous && !C(e.previous) && (t = T(), t.insertBefore(e)), e.next && !C(e.next) && (t = T(), t.insertAfter(e)), e.replaceWithChildren();
                    else {
                        var o, i = e.children;
                        e: {
                            o = K[t];
                            for (var a, r = 0, s = i.length; r < s; ++r)
                                if (a = i[r], a.type == CKEDITOR.NODE_ELEMENT && !o[a.name]) {
                                    o = !1;
                                    break e
                                } o = !0
                        }
                        if (o) e.name = t, e.attributes = {}, n.push({
                            check: "parent-down",
                            el: e
                        });
                        else {
                            o = e.parent;
                            for (var l, c, r = o.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == o.name, s = i.length; s > 0;) a = i[--s], r && (a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && K.$inline[a.name]) ? (l || (l = new CKEDITOR.htmlParser.element(t), l.insertAfter(e), n.push({
                                check: "parent-down",
                                el: l
                            })), l.add(a, 0)) : (l = null, c = K[o.name] || K.span, a.insertAfter(e), o.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && a.type == CKEDITOR.NODE_ELEMENT && !c[a.name] && n.push({
                                check: "el-up",
                                el: a
                            }));
                            e.remove()
                        }
                    }
                else i in {
                    style: 1,
                    script: 1
                } ? e.remove() : (e.parent && n.push({
                    check: "it",
                    el: e.parent
                }), e.replaceWithChildren())
            }

            function O(e, t, n) {
                var i, o;
                for (i = 0; i < n.length; ++i)
                    if (o = n[i], (!o.check || e.check(o.check, !1)) && (!o.left || o.left(t))) {
                        o.right(t, F);
                        break
                    }
            }

            function D(e, t) {
                var n, i, o, a, r = t.getDefinition(),
                    s = r.attributes,
                    l = r.styles;
                if (e.name != r.element) return !1;
                for (n in s)
                    if ("class" == n) {
                        for (r = s[n].split(/\s+/), o = e.classes.join("|"); a = r.pop();)
                            if (o.indexOf(a) == -1) return !1
                    } else if (e.attributes[n] != s[n]) return !1;
                for (i in l)
                    if (e.styles[i] != l[i]) return !1;
                return !0
            }

            function R(e, t) {
                var n, i;
                return "string" == typeof e ? n = e : e instanceof CKEDITOR.style ? i = e : (n = e[0], i = e[1]), [{
                    element: n,
                    left: i,
                    right: function(e, n) {
                        n.transform(e, t)
                    }
                }]
            }

            function v(e) {
                return function(t) {
                    return D(t, e)
                }
            }

            function b(e) {
                return function(t, n) {
                    n[e](t)
                }
            }
            var K = CKEDITOR.dtd,
                _ = 1,
                y = CKEDITOR.tools.copy,
                k = CKEDITOR.tools.trim,
                N = "cke-test",
                S = ["", "p", "br", "div"];
            CKEDITOR.FILTER_SKIP_TREE = 2, CKEDITOR.filter = function(e) {
                if (this.allowedContent = [], this.disallowedContent = [], this.elementCallbacks = null, this.disabled = !1, this.editor = null, this.id = CKEDITOR.tools.getNextNumber(), this._ = {
                        allowedRules: {
                            elements: {},
                            generic: []
                        },
                        disallowedRules: {
                            elements: {},
                            generic: []
                        },
                        transformations: {},
                        cachedTests: {}
                    }, CKEDITOR.filter.instances[this.id] = this, e instanceof CKEDITOR.editor) {
                    e = this.editor = e, this.customConfig = !0;
                    var t = e.config.allowedContent;
                    t === !0 ? this.disabled = !0 : (t || (this.customConfig = !1), this.allow(t, "config", 1), this.allow(e.config.extraAllowedContent, "extra", 1), this.allow(S[e.enterMode] + " " + S[e.shiftEnterMode], "default", 1), this.disallow(e.config.disallowedContent))
                } else this.customConfig = !1, this.allow(e, "default", 1)
            }, CKEDITOR.filter.instances = {}, CKEDITOR.filter.prototype = {
                allow: function(t, n, i) {
                    if (!a(this, t, i)) return !1;
                    var o, r;
                    if ("string" == typeof t) t = u(t);
                    else if (t instanceof CKEDITOR.style) {
                        if (t.toAllowedContentRules) return this.allow(t.toAllowedContentRules(this.editor), n, i);
                        o = t.getDefinition(), t = {}, i = o.attributes, t[o.element] = o = {
                            styles: o.styles,
                            requiredStyles: o.styles && CKEDITOR.tools.objectKeys(o.styles)
                        }, i && (i = y(i), o.classes = i.class ? i.class.split(/\s+/) : null,
                            o.requiredClasses = o.classes, delete i.class, o.attributes = i, o.requiredAttributes = i && CKEDITOR.tools.objectKeys(i))
                    } else if (CKEDITOR.tools.isArray(t)) {
                        for (o = 0; o < t.length; ++o) r = this.allow(t[o], n, i);
                        return r
                    }
                    return e(this, t, n, this.allowedContent, this._.allowedRules), !0
                },
                applyTo: function(e, t, n, i) {
                    if (this.disabled) return !1;
                    var o, a = this,
                        r = [],
                        s = this.editor && this.editor.config.protectedSource,
                        l = !1,
                        c = {
                            doFilter: !n,
                            doTransform: !0,
                            doCallbacks: !0,
                            toHtml: t
                        };
                    e.forEach(function(e) {
                        if (e.type == CKEDITOR.NODE_ELEMENT) {
                            if ("off" == e.attributes["data-cke-filter"]) return !1;
                            if (!t || "span" != e.name || !~CKEDITOR.tools.objectKeys(e.attributes).join("|").indexOf("data-cke-"))
                                if (o = f(a, e, r, c), o & _) l = !0;
                                else if (2 & o) return !1
                        } else if (e.type == CKEDITOR.NODE_COMMENT && e.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                            var n;
                            e: {
                                var i = decodeURIComponent(e.value.replace(/^\{cke_protected\}/, ""));n = [];
                                var u, d, h;
                                if (s)
                                    for (d = 0; d < s.length; ++d)
                                        if ((h = i.match(s[d])) && h[0].length == i.length) {
                                            n = !0;
                                            break e
                                        } i = CKEDITOR.htmlParser.fragment.fromHtml(i),
                                1 == i.children.length && (u = i.children[0]).type == CKEDITOR.NODE_ELEMENT && f(a, u, n, c),
                                n = !n.length
                            }
                            n || r.push(e)
                        }
                    }, null, !0), r.length && (l = !0);
                    for (var u, d, e = [], i = S[i || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; n = r.pop();) n.type == CKEDITOR.NODE_ELEMENT ? I(n, i, e) : n.remove();
                    for (; u = e.pop();)
                        if (n = u.el, n.parent) switch (d = K[n.parent.name] || K.span, u.check) {
                            case "it":
                                K.$removeEmpty[n.name] && !n.children.length ? I(n, i, e) : g(n) || I(n, i, e);
                                break;
                            case "el-up":
                                n.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !d[n.name] && I(n, i, e);
                                break;
                            case "parent-down":
                                n.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !d[n.name] && I(n.parent, i, e)
                        }
                    return l
                },
                checkFeature: function(e) {
                    return !(!this.disabled && e) || (e.toFeature && (e = e.toFeature(this.editor)), !e.requiredContent || this.check(e.requiredContent))
                },
                disable: function() {
                    this.disabled = !0
                },
                disallow: function(t) {
                    return !!a(this, t, !0) && ("string" == typeof t && (t = u(t)), e(this, t, null, this.disallowedContent, this._.disallowedRules), !0)
                },
                addContentForms: function(e) {
                    if (!this.disabled && e) {
                        var t, n, i, o = [];
                        for (t = 0; t < e.length && !i; ++t) n = e[t], ("string" == typeof n || n instanceof CKEDITOR.style) && this.check(n) && (i = n);
                        if (i) {
                            for (t = 0; t < e.length; ++t) o.push(R(e[t], i));
                            this.addTransformations(o)
                        }
                    }
                },
                addElementCallback: function(e) {
                    this.elementCallbacks || (this.elementCallbacks = []), this.elementCallbacks.push(e)
                },
                addFeature: function(e) {
                    return !(!this.disabled && e) || (e.toFeature && (e = e.toFeature(this.editor)), this.allow(e.allowedContent, e.name), this.addTransformations(e.contentTransformations), this.addContentForms(e.contentForms), !e.requiredContent || !this.customConfig && !this.disallowedContent.length || this.check(e.requiredContent))
                },
                addTransformations: function(e) {
                    var t, n;
                    if (!this.disabled && e) {
                        var i, o = this._.transformations;
                        for (i = 0; i < e.length; ++i) {
                            t = e[i];
                            var a = void 0,
                                r = void 0,
                                s = void 0,
                                l = void 0,
                                c = void 0,
                                u = void 0;
                            for (n = [], r = 0; r < t.length; ++r) s = t[r], "string" == typeof s ? (s = s.split(/\s*:\s*/), l = s[0], c = null, u = s[1]) : (l = s.check, c = s.left, u = s.right), a || (a = s, a = a.element ? a.element : l ? l.match(/^([a-z0-9]+)/i)[0] : a.left.getDefinition().element), c instanceof CKEDITOR.style && (c = v(c)), n.push({
                                check: l == a ? null : l,
                                left: c,
                                right: "string" == typeof u ? b(u) : u
                            });
                            t = a, o[t] || (o[t] = []), o[t].push(n)
                        }
                    }
                },
                check: function(e, t, n) {
                    if (this.disabled) return !0;
                    if (CKEDITOR.tools.isArray(e)) {
                        for (var i = e.length; i--;)
                            if (this.check(e[i], t, n)) return !0;
                        return !1
                    }
                    var o, a;
                    if ("string" == typeof e) {
                        if (a = e + "<" + (t === !1 ? "0" : "1") + (n ? "1" : "0") + ">", a in this._.cachedChecks) return this._.cachedChecks[a];
                        i = u(e).$1, o = i.styles;
                        var r = i.classes;
                        i.name = i.elements, i.classes = r = r ? r.split(/\s*,\s*/) : [], i.styles = c(o), i.attributes = c(i.attributes), i.children = [], r.length && (i.attributes.class = r.join(" ")), o && (i.attributes.style = CKEDITOR.tools.writeCssText(i.styles)), o = i
                    } else i = e.getDefinition(), o = i.styles, r = i.attributes || {}, o ? (o = y(o), r.style = CKEDITOR.tools.writeCssText(o, !0)) : o = {}, o = {
                        name: i.element,
                        attributes: r,
                        classes: r.class ? r.class.split(/\s+/) : [],
                        styles: o,
                        children: []
                    };
                    var s, r = CKEDITOR.tools.clone(o),
                        l = [];
                    if (t !== !1 && (s = this._.transformations[o.name])) {
                        for (i = 0; i < s.length; ++i) O(this, o, s[i]);
                        m(o)
                    }
                    return f(this, r, l, {
                        doFilter: !0,
                        doTransform: t !== !1,
                        skipRequired: !n,
                        skipFinalValidation: !n
                    }), t = !(l.length > 0) && !!CKEDITOR.tools.objectCompare(o.attributes, r.attributes, !0), "string" == typeof e && (this._.cachedChecks[a] = t), t
                },
                getAllowedEnterMode: function() {
                    var e = ["p", "div", "br"],
                        t = {
                            p: CKEDITOR.ENTER_P,
                            div: CKEDITOR.ENTER_DIV,
                            br: CKEDITOR.ENTER_BR
                        };
                    return function(n, i) {
                        var o, a = e.slice();
                        if (this.check(S[n])) return n;
                        for (i || (a = a.reverse()); o = a.pop();)
                            if (this.check(o)) return t[o];
                        return CKEDITOR.ENTER_BR
                    }
                }(),
                destroy: function() {
                    delete CKEDITOR.filter.instances[this.id], delete this._, delete this.allowedContent, delete this.disallowedContent
                }
            };
            var x = {
                    styles: 1,
                    attributes: 1,
                    classes: 1
                },
                w = {
                    styles: "requiredStyles",
                    attributes: "requiredAttributes",
                    classes: "requiredClasses"
                },
                A = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
                L = {
                    styles: /{([^}]+)}/,
                    attrs: /\[([^\]]+)\]/,
                    classes: /\(([^\)]+)\)/
                },
                P = /^cke:(object|embed|param)$/,
                B = /^(object|embed|param)$/,
                F = CKEDITOR.filter.transformationsTools = {
                    sizeToStyle: function(e) {
                        this.lengthToStyle(e, "width"), this.lengthToStyle(e, "height")
                    },
                    sizeToAttribute: function(e) {
                        this.lengthToAttribute(e, "width"), this.lengthToAttribute(e, "height")
                    },
                    lengthToStyle: function(e, t, n) {
                        if (n = n || t, !(n in e.styles)) {
                            var i = e.attributes[t];
                            i && (/^\d+$/.test(i) && (i += "px"), e.styles[n] = i)
                        }
                        delete e.attributes[t]
                    },
                    lengthToAttribute: function(e, t, n) {
                        if (n = n || t, !(n in e.attributes)) {
                            var i = e.styles[t],
                                o = i && i.match(/^(\d+)(?:\.\d*)?px$/);
                            o ? e.attributes[n] = o[1] : i == N && (e.attributes[n] = N)
                        }
                        delete e.styles[t]
                    },
                    alignmentToStyle: function(e) {
                        if (!("float" in e.styles)) {
                            var t = e.attributes.align;
                            "left" != t && "right" != t || (e.styles.float = t)
                        }
                        delete e.attributes.align
                    },
                    alignmentToAttribute: function(e) {
                        if (!("align" in e.attributes)) {
                            var t = e.styles.float;
                            "left" != t && "right" != t || (e.attributes.align = t)
                        }
                        delete e.styles.float
                    },
                    matchesStyle: D,
                    transform: function(e, t) {
                        if ("string" == typeof t) e.name = t;
                        else {
                            var n, i, o, a, r = t.getDefinition(),
                                s = r.styles,
                                l = r.attributes;
                            e.name = r.element;
                            for (n in l)
                                if ("class" == n)
                                    for (r = e.classes.join("|"), o = l[n].split(/\s+/); a = o.pop();) r.indexOf(a) == -1 && e.classes.push(a);
                                else e.attributes[n] = l[n];
                            for (i in s) e.styles[i] = s[i]
                        }
                    }
                }
        }(), function() {
            CKEDITOR.focusManager = function(e) {
                return e.focusManager ? e.focusManager : (this.hasFocus = !1, this.currentActive = null, this._ = {
                    editor: e
                }, this)
            }, CKEDITOR.focusManager._ = {
                blurDelay: 200
            }, CKEDITOR.focusManager.prototype = {
                focus: function(e) {
                    this._.timer && clearTimeout(this._.timer), e && (this.currentActive = e), this.hasFocus || this._.locked || ((e = CKEDITOR.currentInstance) && e.focusManager.blur(1), this.hasFocus = !0, (e = this._.editor.container) && e.addClass("cke_focus"), this._.editor.fire("focus"))
                },
                lock: function() {
                    this._.locked = 1
                },
                unlock: function() {
                    delete this._.locked
                },
                blur: function(e) {
                    function t() {
                        if (this.hasFocus) {
                            this.hasFocus = !1;
                            var e = this._.editor.container;
                            e && e.removeClass("cke_focus"), this._.editor.fire("blur")
                        }
                    }
                    if (!this._.locked) {
                        this._.timer && clearTimeout(this._.timer);
                        var n = CKEDITOR.focusManager._.blurDelay;
                        e || !n ? t.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
                            delete this._.timer, t.call(this)
                        }, n, this)
                    }
                },
                add: function(e, t) {
                    var n = e.getCustomData("focusmanager");
                    if (!n || n != this) {
                        n && n.remove(e);
                        var n = "focus",
                            i = "blur";
                        t && (CKEDITOR.env.ie ? (n = "focusin", i = "focusout") : CKEDITOR.event.useCapture = 1);
                        var o = {
                            blur: function() {
                                e.equals(this.currentActive) && this.blur()
                            },
                            focus: function() {
                                this.focus(e)
                            }
                        };
                        e.on(n, o.focus, this), e.on(i, o.blur, this), t && (CKEDITOR.event.useCapture = 0), e.setCustomData("focusmanager", this), e.setCustomData("focusmanager_handlers", o)
                    }
                },
                remove: function(e) {
                    e.removeCustomData("focusmanager");
                    var t = e.removeCustomData("focusmanager_handlers");
                    e.removeListener("blur", t.blur), e.removeListener("focus", t.focus)
                }
            }
        }(), CKEDITOR.keystrokeHandler = function(e) {
            return e.keystrokeHandler ? e.keystrokeHandler : (this.keystrokes = {}, this.blockedKeystrokes = {}, this._ = {
                editor: e
            }, this)
        }, function() {
            var e, t = function(t) {
                    var t = t.data,
                        n = t.getKeystroke(),
                        i = this.keystrokes[n],
                        o = this._.editor;
                    return e = o.fire("key", {
                        keyCode: n,
                        domEvent: t
                    }) === !1, e || (i && (e = o.execCommand(i, {
                        from: "keystrokeHandler"
                    }) !== !1), e || (e = !!this.blockedKeystrokes[n])), e && t.preventDefault(!0), !e
                },
                n = function(t) {
                    e && (e = !1, t.data.preventDefault(!0))
                };
            CKEDITOR.keystrokeHandler.prototype = {
                attach: function(e) {
                    e.on("keydown", t, this), CKEDITOR.env.gecko && CKEDITOR.env.mac && e.on("keypress", n, this)
                }
            }
        }(), function() {
            CKEDITOR.lang = {
                languages: {
                    af: 1,
                    ar: 1,
                    bg: 1,
                    bn: 1,
                    bs: 1,
                    ca: 1,
                    cs: 1,
                    cy: 1,
                    da: 1,
                    de: 1,
                    el: 1,
                    "en-au": 1,
                    "en-ca": 1,
                    "en-gb": 1,
                    en: 1,
                    eo: 1,
                    es: 1,
                    et: 1,
                    eu: 1,
                    fa: 1,
                    fi: 1,
                    fo: 1,
                    "fr-ca": 1,
                    fr: 1,
                    gl: 1,
                    gu: 1,
                    he: 1,
                    hi: 1,
                    hr: 1,
                    hu: 1,
                    id: 1,
                    is: 1,
                    it: 1,
                    ja: 1,
                    ka: 1,
                    km: 1,
                    ko: 1,
                    ku: 1,
                    lt: 1,
                    lv: 1,
                    mk: 1,
                    mn: 1,
                    ms: 1,
                    nb: 1,
                    nl: 1,
                    no: 1,
                    pl: 1,
                    "pt-br": 1,
                    pt: 1,
                    ro: 1,
                    ru: 1,
                    si: 1,
                    sk: 1,
                    sl: 1,
                    sq: 1,
                    "sr-latn": 1,
                    sr: 1,
                    sv: 1,
                    th: 1,
                    tr: 1,
                    tt: 1,
                    ug: 1,
                    uk: 1,
                    vi: 1,
                    "zh-cn": 1,
                    zh: 1
                },
                rtl: {
                    ar: 1,
                    fa: 1,
                    he: 1,
                    ku: 1,
                    ug: 1
                },
                load: function(e, t, n) {
                    e && CKEDITOR.lang.languages[e] || (e = this.detect(t, e));
                    var i = this,
                        t = function() {
                            i[e].dir = i.rtl[e] ? "rtl" : "ltr", n(e, i[e])
                        };
                    this[e] ? t() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + e + ".js"), t, this)
                },
                detect: function(e, t) {
                    var n = this.languages,
                        t = t || navigator.userLanguage || navigator.language || e,
                        i = t.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                        o = i[1],
                        i = i[2];
                    return n[o + "-" + i] ? o = o + "-" + i : n[o] || (o = null), CKEDITOR.lang.detect = o ? function() {
                        return o
                    } : function(e) {
                        return e
                    }, o || e
                }
            }
        }(), CKEDITOR.scriptLoader = function() {
            var e = {},
                t = {};
            return {
                load: function(n, i, o, a) {
                    var r = "string" == typeof n;
                    r && (n = [n]), o || (o = CKEDITOR);
                    var s = n.length,
                        l = [],
                        c = [],
                        u = function(e) {
                            i && (r ? i.call(o, e) : i.call(o, l, c))
                        };
                    if (0 === s) u(!0);
                    else {
                        var d = function(e, t) {
                                (t ? l : c).push(e), --s <= 0 && (a && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), u(t))
                            },
                            h = function(n, i) {
                                e[n] = 1;
                                var o = t[n];
                                delete t[n];
                                for (var a = 0; a < o.length; a++) o[a](n, i)
                            },
                            f = function(n) {
                                if (e[n]) d(n, !0);
                                else {
                                    var o = t[n] || (t[n] = []);
                                    if (o.push(d), !(o.length > 1)) {
                                        var a = new CKEDITOR.dom.element("script");
                                        a.setAttributes({
                                            type: "text/javascript",
                                            src: n
                                        }), i && (CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? a.$.onreadystatechange = function() {
                                            "loaded" != a.$.readyState && "complete" != a.$.readyState || (a.$.onreadystatechange = null, h(n, !0))
                                        } : (a.$.onload = function() {
                                            setTimeout(function() {
                                                h(n, !0)
                                            }, 0)
                                        }, a.$.onerror = function() {
                                            h(n, !1)
                                        })), a.appendTo(CKEDITOR.document.getHead())
                                    }
                                }
                            };
                        a && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                        for (var E = 0; E < s; E++) f(n[E])
                    }
                },
                queue: function() {
                    function e() {
                        var e;
                        (e = t[0]) && this.load(e.scriptUrl, e.callback, CKEDITOR, 0)
                    }
                    var t = [];
                    return function(n, i) {
                        var o = this;
                        t.push({
                            scriptUrl: n,
                            callback: function() {
                                i && i.apply(this, arguments), t.shift(), e.call(o)
                            }
                        }), 1 == t.length && e.call(this)
                    }
                }()
            }
        }(), CKEDITOR.resourceManager = function(e, t) {
            this.basePath = e, this.fileName = t, this.registered = {}, this.loaded = {}, this.externals = {}, this._ = {
                waitingList: {}
            }
        }, CKEDITOR.resourceManager.prototype = {
            add: function(e, t) {
                if (this.registered[e]) throw '[CKEDITOR.resourceManager.add] The resource name "' + e + '" is already registered.';
                var n = this.registered[e] = t || {};
                return n.name = e, n.path = this.getPath(e), CKEDITOR.fire(e + CKEDITOR.tools.capitalize(this.fileName) + "Ready", n), this.get(e)
            },
            get: function(e) {
                return this.registered[e] || null
            },
            getPath: function(e) {
                var t = this.externals[e];
                return CKEDITOR.getUrl(t && t.dir || this.basePath + e + "/")
            },
            getFilePath: function(e) {
                var t = this.externals[e];
                return CKEDITOR.getUrl(this.getPath(e) + (t ? t.file : this.fileName + ".js"))
            },
            addExternal: function(e, t, n) {
                for (var e = e.split(","), i = 0; i < e.length; i++) {
                    var o = e[i];
                    n || (t = t.replace(/[^\/]+$/, function(e) {
                        return n = e, ""
                    })), this.externals[o] = {
                        dir: t,
                        file: n || this.fileName + ".js"
                    }
                }
            },
            load: function(e, t, n) {
                CKEDITOR.tools.isArray(e) || (e = e ? [e] : []);
                for (var i = this.loaded, o = this.registered, a = [], r = {}, s = {}, l = 0; l < e.length; l++) {
                    var c = e[l];
                    if (c)
                        if (i[c] || o[c]) s[c] = this.get(c);
                        else {
                            var u = this.getFilePath(c);
                            a.push(u), u in r || (r[u] = []), r[u].push(c)
                        }
                }
                CKEDITOR.scriptLoader.load(a, function(e, o) {
                    if (o.length) throw '[CKEDITOR.resourceManager.load] Resource name "' + r[o[0]].join(",") + '" was not found at "' + o[0] + '".';
                    for (var a = 0; a < e.length; a++)
                        for (var l = r[e[a]], c = 0; c < l.length; c++) {
                            var u = l[c];
                            s[u] = this.get(u), i[u] = 1
                        }
                    t.call(n, s)
                }, this)
            }
        }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(e) {
            var t = {};
            return function(n, i, o) {
                var a = {},
                    r = function(n) {
                        e.call(this, n, function(e) {
                            CKEDITOR.tools.extend(a, e);
                            var n, s = [];
                            for (n in e) {
                                var l = e[n],
                                    c = l && l.requires;
                                if (!t[n]) {
                                    if (l.icons)
                                        for (var u = l.icons.split(","), d = u.length; d--;) CKEDITOR.skin.addIcon(u[d], l.path + "icons/" + (CKEDITOR.env.hidpi && l.hidpi ? "hidpi/" : "") + u[d] + ".png");
                                    t[n] = 1
                                }
                                if (c)
                                    for (c.split && (c = c.split(",")), l = 0; l < c.length; l++) a[c[l]] || s.push(c[l])
                            }
                            if (s.length) r.call(this, s);
                            else {
                                for (n in a) l = a[n], l.onLoad && !l.onLoad._called && (l.onLoad() === !1 && delete a[n], l.onLoad._called = 1);
                                i && i.call(o || window, a)
                            }
                        }, this)
                    };
                r.call(this, n)
            }
        }), CKEDITOR.plugins.setLang = function(e, t, n) {
            var i = this.get(e),
                e = i.langEntries || (i.langEntries = {}),
                i = i.lang || (i.lang = []);
            i.split && (i = i.split(",")), CKEDITOR.tools.indexOf(i, t) == -1 && i.push(t), e[t] = n
        }, CKEDITOR.ui = function(e) {
            return e.ui ? e.ui : (this.items = {}, this.instances = {}, this.editor = e, this._ = {
                handlers: {}
            }, this)
        }, CKEDITOR.ui.prototype = {
            add: function(e, t, n) {
                n.name = e.toLowerCase();
                var i = this.items[e] = {
                    type: t,
                    command: n.command || null,
                    args: Array.prototype.slice.call(arguments, 2)
                };
                CKEDITOR.tools.extend(i, n)
            },
            get: function(e) {
                return this.instances[e]
            },
            create: function(e) {
                var t = this.items[e],
                    n = t && this._.handlers[t.type],
                    i = t && t.command && this.editor.getCommand(t.command),
                    n = n && n.create.apply(this, t.args);
                return this.instances[e] = n, i && i.uiItems.push(n), n && !n.type && (n.type = t.type), n
            },
            addHandler: function(e, t) {
                this._.handlers[e] = t
            },
            space: function(e) {
                return CKEDITOR.document.getById(this.spaceId(e))
            },
            spaceId: function(e) {
                return this.editor.id + "_" + e
            }
        }, CKEDITOR.event.implementOn(CKEDITOR.ui), function() {
            function e(e, i, a) {
                if (CKEDITOR.event.call(this), e = e && CKEDITOR.tools.clone(e), void 0 !== i) {
                    if (!(i instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
                    if (!a) throw Error("One of the element modes must be specified.");
                    if (CKEDITOR.env.ie && CKEDITOR.env.quirks && a == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
                    if (!(a == CKEDITOR.ELEMENT_MODE_INLINE ? i.is(CKEDITOR.dtd.$editable) || i.is("textarea") : a == CKEDITOR.ELEMENT_MODE_REPLACE ? !i.is(CKEDITOR.dtd.$nonBodyContent) : 1)) throw Error('The specified element mode is not supported on element: "' + i.getName() + '".');
                    this.element = i, this.elementMode = a, this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (i.getId() || i.getNameAtt())
                } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
                this._ = {}, this.commands = {}, this.templates = {}, this.name = this.name || t(), this.id = CKEDITOR.tools.getNextId(), this.status = "unloaded", this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config), this.ui = new CKEDITOR.ui(this), this.focusManager = new CKEDITOR.focusManager(this), this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this), this.on("readOnly", n), this.on("selectionChange", function(e) {
                    o(this, e.data.path)
                }), this.on("activeFilterChange", function() {
                    o(this, this.elementPath(), !0)
                }), this.on("mode", n), this.on("instanceReady", function() {
                    this.config.startupFocus && this.focus()
                }), CKEDITOR.fire("instanceCreated", null, this), CKEDITOR.add(this), CKEDITOR.tools.setTimeout(function() {
                    r(this, e)
                }, 0, this)
            }

            function t() {
                do var e = "editor" + ++h; while (CKEDITOR.instances[e]);
                return e
            }

            function n() {
                var e, t = this.commands;
                for (e in t) i(this, t[e])
            }

            function i(e, t) {
                t[t.startDisabled ? "disable" : e.readOnly && !t.readOnly ? "disable" : t.modes[e.mode] ? "enable" : "disable"]()
            }

            function o(e, t, n) {
                if (t) {
                    var i, o, a = e.commands;
                    for (o in a) i = a[o], (n || i.contextSensitive) && i.refresh(e, t)
                }
            }

            function a(e) {
                var t = e.config.customConfig;
                if (!t) return !1;
                var t = CKEDITOR.getUrl(t),
                    n = f[t] || (f[t] = {});
                return n.fn ? (n.fn.call(e, e.config), (CKEDITOR.getUrl(e.config.customConfig) == t || !a(e)) && e.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(t, function() {
                    n.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {}, a(e)
                }), !0
            }

            function r(e, t) {
                e.on("customConfigLoaded", function() {
                    if (t) {
                        if (t.on)
                            for (var n in t.on) e.on(n, t.on[n]);
                        CKEDITOR.tools.extend(e.config, t, !0), delete e.config.on
                    }
                    n = e.config, e.readOnly = !!n.readOnly || (e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? e.element.is("textarea") ? e.element.hasAttribute("disabled") || e.element.hasAttribute("readonly") : e.element.isReadOnly() : e.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (e.element.hasAttribute("disabled") || e.element.hasAttribute("readonly"))), e.blockless = e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !(e.element.is("textarea") || CKEDITOR.dtd[e.element.getName()].p), e.tabIndex = n.tabIndex || e.element && e.element.getAttribute("tabindex") || 0, e.activeEnterMode = e.enterMode = e.blockless ? CKEDITOR.ENTER_BR : n.enterMode, e.activeShiftEnterMode = e.shiftEnterMode = e.blockless ? CKEDITOR.ENTER_BR : n.shiftEnterMode, n.skin && (CKEDITOR.skinName = n.skin), e.fireOnce("configLoaded"), e.dataProcessor = new CKEDITOR.htmlDataProcessor(e), e.filter = e.activeFilter = new CKEDITOR.filter(e), s(e)
                }), t && null != t.customConfig && (e.config.customConfig = t.customConfig), a(e) || e.fireOnce("customConfigLoaded")
            }

            function s(e) {
                CKEDITOR.skin.loadPart("editor", function() {
                    l(e)
                })
            }

            function l(e) {
                CKEDITOR.lang.load(e.config.language, e.config.defaultLanguage, function(t, n) {
                    var i = e.config.title;
                    e.langCode = t, e.lang = CKEDITOR.tools.prototypedCopy(n), e.title = "string" == typeof i || i === !1 ? i : [e.lang.editor, e.name].join(", "), e.config.contentsLangDirection || (e.config.contentsLangDirection = e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? e.element.getDirection(1) : e.lang.dir), e.fire("langLoaded"), c(e)
                })
            }

            function c(e) {
                e.getStylesSet(function(t) {
                    e.once("loaded", function() {
                        e.fire("stylesSet", {
                            styles: t
                        })
                    }, null, null, 1), u(e)
                })
            }

            function u(e) {
                var t = e.config,
                    n = t.plugins,
                    i = t.extraPlugins,
                    o = t.removePlugins;
                if (i) var a = RegExp("(?:^|,)(?:" + i.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"),
                    n = n.replace(a, ""),
                    n = n + ("," + i);
                if (o) var r = RegExp("(?:^|,)(?:" + o.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"),
                    n = n.replace(r, "");
                CKEDITOR.env.air && (n += ",adobeair"), CKEDITOR.plugins.load(n.split(","), function(n) {
                    var i = [],
                        o = [],
                        a = [];
                    e.plugins = n;
                    for (var s in n) {
                        var l, c = n[s],
                            u = c.lang,
                            d = null,
                            h = c.requires;
                        if (CKEDITOR.tools.isArray(h) && (h = h.join(",")), h && (l = h.match(r)))
                            for (; h = l.pop();) CKEDITOR.tools.setTimeout(function(e, t) {
                                throw Error('Plugin "' + e.replace(",", "") + '" cannot be removed from the plugins list, because it\'s required by "' + t + '" plugin.')
                            }, 0, null, [h, s]);
                        u && !e.lang[s] && (u.split && (u = u.split(",")), CKEDITOR.tools.indexOf(u, e.langCode) >= 0 ? d = e.langCode : (d = e.langCode.replace(/-.*/, ""), d = d != e.langCode && CKEDITOR.tools.indexOf(u, d) >= 0 ? d : CKEDITOR.tools.indexOf(u, "en") >= 0 ? "en" : u[0]), c.langEntries && c.langEntries[d] ? (e.lang[s] = c.langEntries[d], d = null) : a.push(CKEDITOR.getUrl(c.path + "lang/" + d + ".js"))), o.push(d), i.push(c)
                    }
                    CKEDITOR.scriptLoader.load(a, function() {
                        for (var n = ["beforeInit", "init", "afterInit"], a = 0; a < n.length; a++)
                            for (var r = 0; r < i.length; r++) {
                                var s = i[r];
                                0 === a && o[r] && s.lang && s.langEntries && (e.lang[s.name] = s.langEntries[o[r]]), s[n[a]] && s[n[a]](e)
                            }
                        for (e.fireOnce("pluginsLoaded"), t.keystrokes && e.setKeystroke(e.config.keystrokes), r = 0; r < e.config.blockedKeystrokes.length; r++) e.keystrokeHandler.blockedKeystrokes[e.config.blockedKeystrokes[r]] = 1;
                        e.status = "loaded", e.fireOnce("loaded"), CKEDITOR.fire("instanceLoaded", null, e)
                    })
                })
            }

            function d() {
                var e = this.element;
                if (e && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                    var t = this.getData();
                    return this.config.htmlEncodeOutput && (t = CKEDITOR.tools.htmlEncode(t)), e.is("textarea") ? e.setValue(t) : e.setHtml(t), !0
                }
                return !1
            }
            e.prototype = CKEDITOR.editor.prototype, CKEDITOR.editor = e;
            var h = 0,
                f = {};
            CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                addCommand: function(e, t) {
                    t.name = e.toLowerCase();
                    var n = new CKEDITOR.command(this, t);
                    return this.mode && i(this, n), this.commands[e] = n
                },
                _attachToForm: function() {
                    function e(e) {
                        t.updateElement(), t._.required && !n.getValue() && t.fire("required") === !1 && e.data.preventDefault()
                    }
                    var t = this,
                        n = t.element,
                        i = new CKEDITOR.dom.element(n.$.form);
                    n.is("textarea") && i && (i.on("submit", e), i.$.submit && i.$.submit.call && i.$.submit.apply && (i.$.submit = CKEDITOR.tools.override(i.$.submit, function(t) {
                        return function() {
                            e(), t.apply ? t.apply(this) : t()
                        }
                    })), t.on("destroy", function() {
                        i.removeListener("submit", e)
                    }))
                },
                destroy: function(e) {
                    this.fire("beforeDestroy"), !e && d.call(this), this.editable(null), this.filter.destroy(), delete this.filter, delete this.activeFilter, this.status = "destroyed", this.fire("destroy"), this.removeAllListeners(), CKEDITOR.remove(this), CKEDITOR.fire("instanceDestroyed", null, this)
                },
                elementPath: function(e) {
                    if (!e) {
                        if (e = this.getSelection(), !e) return null;
                        e = e.getStartElement()
                    }
                    return e ? new CKEDITOR.dom.elementPath(e, this.editable()) : null
                },
                createRange: function() {
                    var e = this.editable();
                    return e ? new CKEDITOR.dom.range(e) : null
                },
                execCommand: function(e, t) {
                    var n = this.getCommand(e),
                        i = {
                            name: e,
                            commandData: t,
                            command: n
                        };
                    return !(!n || n.state == CKEDITOR.TRISTATE_DISABLED || this.fire("beforeCommandExec", i) === !1 || (i.returnValue = n.exec(i.commandData), n.async || this.fire("afterCommandExec", i) === !1)) && i.returnValue
                },
                getCommand: function(e) {
                    return this.commands[e]
                },
                getData: function(e) {
                    !e && this.fire("beforeGetData");
                    var t = this._.data;
                    return "string" != typeof t && (t = (t = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? t.is("textarea") ? t.getValue() : t.getHtml() : ""), t = {
                        dataValue: t
                    }, !e && this.fire("getData", t), t.dataValue
                },
                getSnapshot: function() {
                    var e = this.fire("getSnapshot");
                    return "string" != typeof e && (e = (e = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? e.is("textarea") ? e.getValue() : e.getHtml() : ""), e
                },
                loadSnapshot: function(e) {
                    this.fire("loadSnapshot", e)
                },
                setData: function(e, t, n) {
                    var i = !0,
                        o = t;
                    t && "object" == typeof t && (n = t.internal, o = t.callback, i = !t.noSnapshot), !n && i && this.fire("saveSnapshot"), !o && n || this.once("dataReady", function(e) {
                        !n && i && this.fire("saveSnapshot"), o && o.call(e.editor)
                    }), e = {
                        dataValue: e
                    }, !n && this.fire("setData", e), this._.data = e.dataValue, !n && this.fire("afterSetData", e)
                },
                setReadOnly: function(e) {
                    e = null == e || e, this.readOnly != e && (this.readOnly = e, this.keystrokeHandler.blockedKeystrokes[8] = +e, this.editable().setReadOnly(e), this.fire("readOnly"))
                },
                insertHtml: function(e, t, n) {
                    this.fire("insertHtml", {
                        dataValue: e,
                        mode: t,
                        range: n
                    })
                },
                insertText: function(e) {
                    this.fire("insertText", e)
                },
                insertElement: function(e) {
                    this.fire("insertElement", e)
                },
                getSelectedHtml: function(e) {
                    var t = this.editable(),
                        n = this.getSelection(),
                        n = n && n.getRanges();
                    return t && n && 0 !== n.length ? (t = t.getHtmlFromRange(n[0]), e ? t.getHtml() : t) : null
                },
                extractSelectedHtml: function(e, t) {
                    var n = this.editable(),
                        i = this.getSelection().getRanges();
                    return n && 0 !== i.length ? (i = i[0], n = n.extractHtmlFromRange(i, t), t || this.getSelection().selectRanges([i]), e ? n.getHtml() : n) : null
                },
                focus: function() {
                    this.fire("beforeFocus")
                },
                checkDirty: function() {
                    return "ready" == this.status && this._.previousValue !== this.getSnapshot()
                },
                resetDirty: function() {
                    this._.previousValue = this.getSnapshot()
                },
                updateElement: function() {
                    return d.call(this)
                },
                setKeystroke: function() {
                    for (var e, t, n = this.keystrokeHandler.keystrokes, i = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
                            [].slice.call(arguments, 0)
                        ], o = i.length; o--;) e = i[o], t = 0, CKEDITOR.tools.isArray(e) && (t = e[1], e = e[0]), t ? n[e] = t : delete n[e]
                },
                addFeature: function(e) {
                    return this.filter.addFeature(e)
                },
                setActiveFilter: function(e) {
                    e || (e = this.filter), this.activeFilter !== e && (this.activeFilter = e, this.fire("activeFilterChange"), e === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(e.getAllowedEnterMode(this.enterMode), e.getAllowedEnterMode(this.shiftEnterMode, !0)))
                },
                setActiveEnterMode: function(e, t) {
                    e = e ? this.blockless ? CKEDITOR.ENTER_BR : e : this.enterMode, t = t ? this.blockless ? CKEDITOR.ENTER_BR : t : this.shiftEnterMode, this.activeEnterMode == e && this.activeShiftEnterMode == t || (this.activeEnterMode = e, this.activeShiftEnterMode = t, this.fire("activeEnterModeChange"))
                },
                showNotification: function(e) {
                    alert(e)
                }
            })
        }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function() {
            this._ = {
                htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\>)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g
            }
        }, function() {
            var e = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
                t = {
                    checked: 1,
                    compact: 1,
                    declare: 1,
                    defer: 1,
                    disabled: 1,
                    ismap: 1,
                    multiple: 1,
                    nohref: 1,
                    noresize: 1,
                    noshade: 1,
                    nowrap: 1,
                    readonly: 1,
                    selected: 1
                };
            CKEDITOR.htmlParser.prototype = {
                onTagOpen: function() {},
                onTagClose: function() {},
                onText: function() {},
                onCDATA: function() {},
                onComment: function() {},
                parse: function(n) {
                    for (var i, o, a, r = 0; i = this._.htmlPartsRegex.exec(n);)
                        if (o = i.index, o > r && (r = n.substring(r, o), a ? a.push(r) : this.onText(r)), r = this._.htmlPartsRegex.lastIndex, !(o = i[1]) || (o = o.toLowerCase(), a && CKEDITOR.dtd.$cdata[o] && (this.onCDATA(a.join("")), a = null), a))
                            if (a) a.push(i[0]);
                            else if (o = i[3]) {
                        if (o = o.toLowerCase(), !/="/.test(o)) {
                            var s, l = {},
                                c = i[4];
                            if (i = !!i[5], c)
                                for (; s = e.exec(c);) {
                                    var u = s[1].toLowerCase();
                                    s = s[2] || s[3] || s[4] || "", l[u] = !s && t[u] ? u : CKEDITOR.tools.htmlDecodeAttr(s)
                                }
                            this.onTagOpen(o, l, i), !a && CKEDITOR.dtd.$cdata[o] && (a = [])
                        }
                    } else(o = i[2]) && this.onComment(o);
                    else this.onTagClose(o);
                    n.length > r && this.onText(n.substring(r, n.length))
                }
            }
        }(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
            $: function() {
                this._ = {
                    output: []
                }
            },
            proto: {
                openTag: function(e) {
                    this._.output.push("<", e)
                },
                openTagClose: function(e, t) {
                    t ? this._.output.push(" />") : this._.output.push(">")
                },
                attribute: function(e, t) {
                    "string" == typeof t && (t = CKEDITOR.tools.htmlEncodeAttr(t)), this._.output.push(" ", e, '="', t, '"')
                },
                closeTag: function(e) {
                    this._.output.push("</", e, ">")
                },
                text: function(e) {
                    this._.output.push(e)
                },
                comment: function(e) {
                    this._.output.push("<!--", e, "-->")
                },
                write: function(e) {
                    this._.output.push(e)
                },
                reset: function() {
                    this._.output = [], this._.indent = !1
                },
                getHtml: function(e) {
                    var t = this._.output.join("");
                    return e && this.reset(), t
                }
            }
        }), function() {
            CKEDITOR.htmlParser.node = function() {}, CKEDITOR.htmlParser.node.prototype = {
                remove: function() {
                    var e = this.parent.children,
                        t = CKEDITOR.tools.indexOf(e, this),
                        n = this.previous,
                        i = this.next;
                    n && (n.next = i), i && (i.previous = n), e.splice(t, 1), this.parent = null
                },
                replaceWith: function(e) {
                    var t = this.parent.children,
                        n = CKEDITOR.tools.indexOf(t, this),
                        i = e.previous = this.previous,
                        o = e.next = this.next;
                    i && (i.next = e), o && (o.previous = e), t[n] = e, e.parent = this.parent, this.parent = null
                },
                insertAfter: function(e) {
                    var t = e.parent.children,
                        n = CKEDITOR.tools.indexOf(t, e),
                        i = e.next;
                    t.splice(n + 1, 0, this), this.next = e.next, this.previous = e, e.next = this, i && (i.previous = this), this.parent = e.parent
                },
                insertBefore: function(e) {
                    var t = e.parent.children,
                        n = CKEDITOR.tools.indexOf(t, e);
                    t.splice(n, 0, this), this.next = e, (this.previous = e.previous) && (e.previous.next = this), e.previous = this, this.parent = e.parent
                },
                getAscendant: function(e) {
                    for (var t = ("function" == typeof e ? e : "string" == typeof e ? function(t) {
                            return t.name == e
                        } : function(t) {
                            return t.name in e
                        }), n = this.parent; n && n.type == CKEDITOR.NODE_ELEMENT;) {
                        if (t(n)) return n;
                        n = n.parent
                    }
                    return null
                },
                wrapWith: function(e) {
                    return this.replaceWith(e), e.add(this), e
                },
                getIndex: function() {
                    return CKEDITOR.tools.indexOf(this.parent.children, this)
                },
                getFilterContext: function(e) {
                    return e || {}
                }
            }
        }(), CKEDITOR.htmlParser.comment = function(e) {
            this.value = e, this._ = {
                isBlockLike: !1
            }
        }, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_COMMENT,
            filter: function(e, t) {
                var n = this.value;
                return (n = e.onComment(t, n, this)) ? "string" != typeof n ? (this.replaceWith(n), !1) : (this.value = n, !0) : (this.remove(), !1)
            },
            writeHtml: function(e, t) {
                t && this.filter(t), e.comment(this.value)
            }
        }), function() {
            CKEDITOR.htmlParser.text = function(e) {
                this.value = e, this._ = {
                    isBlockLike: !1
                }
            }, CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                type: CKEDITOR.NODE_TEXT,
                filter: function(e, t) {
                    if (!(this.value = e.onText(t, this.value, this))) return this.remove(), !1
                },
                writeHtml: function(e, t) {
                    t && this.filter(t), e.text(this.value)
                }
            })
        }(), function() {
            CKEDITOR.htmlParser.cdata = function(e) {
                this.value = e
            }, CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                type: CKEDITOR.NODE_TEXT,
                filter: function() {},
                writeHtml: function(e) {
                    e.write(this.value)
                }
            })
        }(), CKEDITOR.htmlParser.fragment = function() {
            this.children = [], this.parent = null, this._ = {
                isBlockLike: !0,
                hasInlineStarted: !1
            }
        }, function() {
            function e(e) {
                return !e.attributes["data-cke-survive"] && ("a" == e.name && e.attributes.href || CKEDITOR.dtd.$removeEmpty[e.name])
            }
            var t = CKEDITOR.tools.extend({
                    table: 1,
                    ul: 1,
                    ol: 1,
                    dl: 1
                }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
                n = {
                    ol: 1,
                    ul: 1
                },
                i = CKEDITOR.tools.extend({}, {
                    html: 1
                }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
                    style: 1,
                    script: 1
                }),
                o = {
                    ul: "li",
                    ol: "li",
                    dl: "dd",
                    table: "tbody",
                    tbody: "tr",
                    thead: "tr",
                    tfoot: "tr",
                    tr: "td"
                };
            CKEDITOR.htmlParser.fragment.fromHtml = function(a, r, s) {
                function l(e) {
                    var t;
                    if (g.length > 0)
                        for (var n = 0; n < g.length; n++) {
                            var i = g[n],
                                o = i.name,
                                a = CKEDITOR.dtd[o],
                                r = T.name && CKEDITOR.dtd[T.name];
                            r && !r[o] || e && a && !a[e] && CKEDITOR.dtd[e] ? o == T.name && (d(T, T.parent, 1), n--) : (t || (c(), t = 1), i = i.clone(), i.parent = T, T = i, g.splice(n, 1), n--)
                        }
                }

                function c() {
                    for (; p.length;) d(p.shift(), T)
                }

                function u(e) {
                    if (e._.isBlockLike && "pre" != e.name && "textarea" != e.name) {
                        var t, n = e.children.length,
                            i = e.children[n - 1];
                        i && i.type == CKEDITOR.NODE_TEXT && ((t = CKEDITOR.tools.rtrim(i.value)) ? i.value = t : e.children.length = n - 1)
                    }
                }

                function d(t, n, i) {
                    var n = n || T || m,
                        o = T;
                    void 0 === t.previous && (h(n, t) && (T = n, E.onTagOpen(s, {}), t.returnPoint = n = T), u(t), (!e(t) || t.children.length) && n.add(t), "pre" == t.name && (I = !1), "textarea" == t.name && (C = !1)), t.returnPoint ? (T = t.returnPoint, delete t.returnPoint) : T = i ? n : o
                }

                function h(e, t) {
                    if ((e == m || "body" == e.name) && s && (!e.name || CKEDITOR.dtd[e.name][s])) {
                        var n, i;
                        return (n = t.attributes && (i = t.attributes["data-cke-real-element-type"]) ? i : t.name) && n in CKEDITOR.dtd.$inline && !(n in CKEDITOR.dtd.head) && !t.isOrphan || t.type == CKEDITOR.NODE_TEXT
                    }
                }

                function f(e, t) {
                    return (e in CKEDITOR.dtd.$listItem || e in CKEDITOR.dtd.$tableContent) && (e == t || "dt" == e && "dd" == t || "dd" == e && "dt" == t)
                }
                var E = new CKEDITOR.htmlParser,
                    m = r instanceof CKEDITOR.htmlParser.element ? r : "string" == typeof r ? new CKEDITOR.htmlParser.element(r) : new CKEDITOR.htmlParser.fragment,
                    g = [],
                    p = [],
                    T = m,
                    C = "textarea" == m.name,
                    I = "pre" == m.name;
                E.onTagOpen = function(o, a, r, s) {
                    if (a = new CKEDITOR.htmlParser.element(o, a), a.isUnknown && r && (a.isEmpty = !0), a.isOptionalClose = s, e(a)) g.push(a);
                    else {
                        if ("pre" == o) I = !0;
                        else {
                            if ("br" == o && I) return void T.add(new CKEDITOR.htmlParser.text("\n"));
                            "textarea" == o && (C = !0)
                        }
                        if ("br" == o) p.push(a);
                        else {
                            for (; s = (r = T.name) ? CKEDITOR.dtd[r] || (T._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : i, !(a.isUnknown || T.isUnknown || s[o]);)
                                if (T.isOptionalClose) E.onTagClose(r);
                                else if (o in n && r in n) r = T.children, (r = r[r.length - 1]) && "li" == r.name || d(r = new CKEDITOR.htmlParser.element("li"), T), !a.returnPoint && (a.returnPoint = T), T = r;
                            else if (o in CKEDITOR.dtd.$listItem && !f(o, r)) E.onTagOpen("li" == o ? "ul" : "dl", {}, 0, 1);
                            else if (r in t && !f(o, r)) !a.returnPoint && (a.returnPoint = T), T = T.parent;
                            else {
                                if (r in CKEDITOR.dtd.$inline && g.unshift(T), !T.parent) {
                                    a.isOrphan = 1;
                                    break
                                }
                                d(T, T.parent, 1)
                            }
                            l(o), c(), a.parent = T, a.isEmpty ? d(a) : T = a
                        }
                    }
                }, E.onTagClose = function(e) {
                    for (var t = g.length - 1; t >= 0; t--)
                        if (e == g[t].name) return void g.splice(t, 1);
                    for (var n = [], i = [], o = T; o != m && o.name != e;) o._.isBlockLike || i.unshift(o), n.push(o), o = o.returnPoint || o.parent;
                    if (o != m) {
                        for (t = 0; t < n.length; t++) {
                            var a = n[t];
                            d(a, a.parent)
                        }
                        T = o, o._.isBlockLike && c(), d(o, o.parent), o == T && (T = T.parent), g = g.concat(i)
                    }
                    "body" == e && (s = !1)
                }, E.onText = function(e) {
                    if (T._.hasInlineStarted && !p.length || I || C || (e = CKEDITOR.tools.ltrim(e), 0 !== e.length)) {
                        var n = T.name,
                            a = n ? CKEDITOR.dtd[n] || (T._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : i;
                        !C && !a["#"] && n in t ? (E.onTagOpen(o[n] || ""), E.onText(e)) : (c(), l(), !I && !C && (e = e.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")), e = new CKEDITOR.htmlParser.text(e), h(T, e) && this.onTagOpen(s, {}, 0, 1), T.add(e))
                    }
                }, E.onCDATA = function(e) {
                    T.add(new CKEDITOR.htmlParser.cdata(e))
                }, E.onComment = function(e) {
                    c(), l(), T.add(new CKEDITOR.htmlParser.comment(e))
                }, E.parse(a);
                for (c(); T != m;) d(T, T.parent, 1);
                return u(m), m
            }, CKEDITOR.htmlParser.fragment.prototype = {
                type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
                add: function(e, t) {
                    isNaN(t) && (t = this.children.length);
                    var n = t > 0 ? this.children[t - 1] : null;
                    if (n) {
                        if (e._.isBlockLike && n.type == CKEDITOR.NODE_TEXT && (n.value = CKEDITOR.tools.rtrim(n.value), 0 === n.value.length)) return this.children.pop(), void this.add(e);
                        n.next = e
                    }
                    e.previous = n, e.parent = this, this.children.splice(t, 0, e), this._.hasInlineStarted || (this._.hasInlineStarted = e.type == CKEDITOR.NODE_TEXT || e.type == CKEDITOR.NODE_ELEMENT && !e._.isBlockLike)
                },
                filter: function(e, t) {
                    t = this.getFilterContext(t), e.onRoot(t, this), this.filterChildren(e, !1, t)
                },
                filterChildren: function(e, t, n) {
                    if (this.childrenFilteredBy != e.id)
                        for (n = this.getFilterContext(n), t && !this.parent && e.onRoot(n, this), this.childrenFilteredBy = e.id, t = 0; t < this.children.length; t++) this.children[t].filter(e, n) === !1 && t--
                },
                writeHtml: function(e, t) {
                    t && this.filter(t), this.writeChildrenHtml(e)
                },
                writeChildrenHtml: function(e, t, n) {
                    var i = this.getFilterContext();
                    for (n && !this.parent && t && t.onRoot(i, this), t && this.filterChildren(t, !1, i), t = 0, n = this.children, i = n.length; t < i; t++) n[t].writeHtml(e)
                },
                forEach: function(e, t, n) {
                    if (!(n || t && this.type != t)) var i = e(this);
                    if (i !== !1)
                        for (var n = this.children, o = 0; o < n.length; o++) i = n[o], i.type == CKEDITOR.NODE_ELEMENT ? i.forEach(e, t) : (!t || i.type == t) && e(i)
                },
                getFilterContext: function(e) {
                    return e || {}
                }
            }
        }(), function() {
            function e() {
                this.rules = []
            }

            function t(t, n, i, o) {
                var a, r;
                for (a in n)(r = t[a]) || (r = t[a] = new e), r.add(n[a], i, o)
            }
            CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
                $: function(t) {
                    this.id = CKEDITOR.tools.getNextNumber(), this.elementNameRules = new e, this.attributeNameRules = new e, this.elementsRules = {}, this.attributesRules = {}, this.textRules = new e, this.commentRules = new e, this.rootRules = new e, t && this.addRules(t, 10)
                },
                proto: {
                    addRules: function(e, n) {
                        var i;
                        "number" == typeof n ? i = n : n && "priority" in n && (i = n.priority), "number" != typeof i && (i = 10), "object" != typeof n && (n = {}), e.elementNames && this.elementNameRules.addMany(e.elementNames, i, n), e.attributeNames && this.attributeNameRules.addMany(e.attributeNames, i, n), e.elements && t(this.elementsRules, e.elements, i, n), e.attributes && t(this.attributesRules, e.attributes, i, n), e.text && this.textRules.add(e.text, i, n), e.comment && this.commentRules.add(e.comment, i, n), e.root && this.rootRules.add(e.root, i, n)
                    },
                    applyTo: function(e) {
                        e.filter(this)
                    },
                    onElementName: function(e, t) {
                        return this.elementNameRules.execOnName(e, t)
                    },
                    onAttributeName: function(e, t) {
                        return this.attributeNameRules.execOnName(e, t)
                    },
                    onText: function(e, t, n) {
                        return this.textRules.exec(e, t, n)
                    },
                    onComment: function(e, t, n) {
                        return this.commentRules.exec(e, t, n)
                    },
                    onRoot: function(e, t) {
                        return this.rootRules.exec(e, t)
                    },
                    onElement: function(e, t) {
                        for (var n, i = [this.elementsRules["^"], this.elementsRules[t.name], this.elementsRules.$], o = 0; o < 3; o++)
                            if (n = i[o]) {
                                if (n = n.exec(e, t, this), n === !1) return null;
                                if (n && n != t) return this.onNode(e, n);
                                if (t.parent && !t.name) break
                            } return t
                    },
                    onNode: function(e, t) {
                        var n = t.type;
                        return n == CKEDITOR.NODE_ELEMENT ? this.onElement(e, t) : n == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(e, t.value)) : n == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(e, t.value)) : null
                    },
                    onAttribute: function(e, t, n, i) {
                        return (n = this.attributesRules[n]) ? n.exec(e, i, t, this) : i
                    }
                }
            }), CKEDITOR.htmlParser.filterRulesGroup = e, e.prototype = {
                add: function(e, t, n) {
                    this.rules.splice(this.findIndex(t), 0, {
                        value: e,
                        priority: t,
                        options: n
                    })
                },
                addMany: function(e, t, n) {
                    for (var i = [this.findIndex(t), 0], o = 0, a = e.length; o < a; o++) i.push({
                        value: e[o],
                        priority: t,
                        options: n
                    });
                    this.rules.splice.apply(this.rules, i)
                },
                findIndex: function(e) {
                    for (var t = this.rules, n = t.length - 1; n >= 0 && e < t[n].priority;) n--;
                    return n + 1
                },
                exec: function(e, t) {
                    var n, i, o, a, r = t instanceof CKEDITOR.htmlParser.node || t instanceof CKEDITOR.htmlParser.fragment,
                        s = Array.prototype.slice.call(arguments, 1),
                        l = this.rules,
                        c = l.length;
                    for (a = 0; a < c; a++)
                        if (r && (n = t.type, i = t.name), o = l[a], !(e.nonEditable && !o.options.applyToAll || e.nestedEditable && o.options.excludeNestedEditable)) {
                            if (o = o.value.apply(null, s), o === !1 || r && o && (o.name != i || o.type != n)) return o;
                            null != o && (s[0] = t = o)
                        } return t
                },
                execOnName: function(e, t) {
                    for (var n, i = 0, o = this.rules, a = o.length; t && i < a; i++) n = o[i], !(e.nonEditable && !n.options.applyToAll || e.nestedEditable && n.options.excludeNestedEditable) && (t = t.replace(n.value[0], n.value[1]));
                    return t
                }
            }
        }(), function() {
            function e(e, t) {
                function s(e) {
                    return e || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {
                        "data-cke-bogus": 1
                    })
                }

                function l(e, t) {
                    return function(o) {
                        if (o.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var r, l, u = [],
                                d = n(o);
                            if (d)
                                for (c(d, 1) && u.push(d); d;) a(d) && (r = i(d)) && c(r) && ((l = i(r)) && !a(l) ? u.push(r) : (s(h).insertAfter(r), r.remove())), d = d.previous;
                            for (d = 0; d < u.length; d++) u[d].remove();
                            (u = !e || ("function" == typeof t ? t(o) : t) !== !1) && ((h || CKEDITOR.env.needsBrFiller || o.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) && (h || CKEDITOR.env.needsBrFiller || !(document.documentMode > 7 || o.name in CKEDITOR.dtd.tr || o.name in CKEDITOR.dtd.$listItem)) ? (u = n(o), u = !u || "form" == o.name && "input" == u.name) : u = !1), u && o.add(s(e))
                        }
                    }
                }

                function c(e, t) {
                    if ((!h || CKEDITOR.env.needsBrFiller) && e.type == CKEDITOR.NODE_ELEMENT && "br" == e.name && !e.attributes["data-cke-eol"]) return !0;
                    var n;
                    if (e.type == CKEDITOR.NODE_TEXT && (n = e.value.match(g))) {
                        if (n.index && (new CKEDITOR.htmlParser.text(e.value.substring(0, n.index)).insertBefore(e), e.value = n[0]), !CKEDITOR.env.needsBrFiller && h && (!t || e.parent.name in f)) return !0;
                        if (!h && ((n = e.previous) && "br" == n.name || !n || a(n))) return !0
                    }
                    return !1
                }
                var u, d = {
                        elements: {}
                    },
                    h = "html" == t,
                    f = CKEDITOR.tools.extend({}, I);
                for (u in f) "#" in T[u] || delete f[u];
                for (u in f) d.elements[u] = l(h, e.config.fillEmptyBlocks);
                return d.root = l(h, !1), d.elements.br = function(e) {
                    return function(t) {
                        if (t.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var n = t.attributes;
                            if ("data-cke-bogus" in n || "data-cke-eol" in n) delete n["data-cke-bogus"];
                            else {
                                for (n = t.next; n && o(n);) n = n.next;
                                var l = i(t);
                                !n && a(t.parent) ? r(t.parent, s(e)) : a(n) && l && !a(l) && s(e).insertBefore(n)
                            }
                        }
                    }
                }(h), d
            }

            function t(e, t) {
                return e != CKEDITOR.ENTER_BR && t !== !1 && (e == CKEDITOR.ENTER_DIV ? "div" : "p")
            }

            function n(e) {
                for (e = e.children[e.children.length - 1]; e && o(e);) e = e.previous;
                return e
            }

            function i(e) {
                for (e = e.previous; e && o(e);) e = e.previous;
                return e
            }

            function o(e) {
                return e.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(e.value) || e.type == CKEDITOR.NODE_ELEMENT && e.attributes["data-cke-bookmark"]
            }

            function a(e) {
                return e && (e.type == CKEDITOR.NODE_ELEMENT && e.name in I || e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
            }

            function r(e, t) {
                var n = e.children[e.children.length - 1];
                e.children.push(t), t.parent = e, n && (n.next = t, t.previous = n)
            }

            function s(e) {
                e = e.attributes, "false" != e.contenteditable && (e["data-cke-editable"] = e.contenteditable ? "true" : 1), e.contenteditable = "false"
            }

            function l(e) {
                switch (e = e.attributes, e["data-cke-editable"]) {
                    case "true":
                        e.contenteditable = "true";
                        break;
                    case "1":
                        delete e.contenteditable
                }
            }

            function c(e) {
                return e.replace(b, function(e, t, n) {
                    return "<" + t + n.replace(K, function(e, t) {
                        return _.test(t) && n.indexOf("data-cke-saved-" + t) == -1 ? " data-cke-saved-" + e + " data-cke-" + CKEDITOR.rnd + "-" + e : e
                    }) + ">"
                })
            }

            function u(e, t) {
                return e.replace(t, function(e, t, n) {
                    return 0 === e.indexOf("<textarea") && (e = t + f(n).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</textarea>"), "<cke:encoded>" + encodeURIComponent(e) + "</cke:encoded>"
                })
            }

            function d(e) {
                return e.replace(N, function(e, t) {
                    return decodeURIComponent(t)
                })
            }

            function h(e) {
                return e.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function(e) {
                    return "<!--" + p + "{C}" + encodeURIComponent(e).replace(/--/g, "%2D%2D") + "-->"
                })
            }

            function f(e) {
                return e.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function(e, t) {
                    return decodeURIComponent(t)
                })
            }

            function E(e, t) {
                var n = t._.dataStore;
                return e.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(e, t) {
                    return decodeURIComponent(t)
                }).replace(/\{cke_protected_(\d+)\}/g, function(e, t) {
                    return n && n[t] || ""
                })
            }

            function m(e, t) {
                for (var n = [], i = t.config.protectedSource, o = t._.dataStore || (t._.dataStore = {
                        id: 1
                    }), a = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, i = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(i), e = e.replace(/<\!--[\s\S]*?--\>/g, function(e) {
                        return "<!--{cke_tempcomment}" + (n.push(e) - 1) + "-->"
                    }), r = 0; r < i.length; r++) e = e.replace(i[r], function(e) {
                    return e = e.replace(a, function(e, t, i) {
                        return n[i]
                    }), /cke_temp(comment)?/.test(e) ? e : "<!--{cke_temp}" + (n.push(e) - 1) + "-->"
                });
                return e = e.replace(a, function(e, t, i) {
                    return "<!--" + p + (t ? "{C}" : "") + encodeURIComponent(n[i]).replace(/--/g, "%2D%2D") + "-->"
                }), e = e.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function(e) {
                    return e.replace(/<\!--\{cke_protected\}([^>]*)--\>/g, function(e, t) {
                        return o[o.id] = decodeURIComponent(t), "{cke_protected_" + o.id++ + "}"
                    })
                }), e = e.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function(e, n, i, o) {
                    return "<" + n + i + ">" + E(f(o), t) + "</" + n + ">"
                })
            }
            CKEDITOR.htmlDataProcessor = function(n) {
                var i, o, a = this;
                this.editor = n, this.dataFilter = i = new CKEDITOR.htmlParser.filter, this.htmlFilter = o = new CKEDITOR.htmlParser.filter, this.writer = new CKEDITOR.htmlParser.basicWriter, i.addRules(O), i.addRules(D, {
                    applyToAll: !0
                }), i.addRules(e(n, "data"), {
                    applyToAll: !0
                }), o.addRules(R), o.addRules(v, {
                    applyToAll: !0
                }), o.addRules(e(n, "html"), {
                    applyToAll: !0
                }), n.on("toHtml", function(e) {
                    var i, e = e.data,
                        o = e.dataValue,
                        o = m(o, n),
                        o = u(o, k),
                        o = c(o),
                        o = u(o, y),
                        o = o.replace(S, "$1cke:$2"),
                        o = o.replace(w, "<cke:$1$2></cke:$1>"),
                        o = o.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
                        o = o.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
                    i = e.context || n.editable().getName();
                    var a;
                    CKEDITOR.env.ie && CKEDITOR.env.version < 9 && "pre" == i && (i = "div", o = "<pre>" + o + "</pre>", a = 1), i = n.document.createElement(i), i.setHtml("a" + o), o = i.getHtml().substr(1), o = o.replace(RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), ""), a && (o = o.replace(/^<pre>|<\/pre>$/gi, "")), o = o.replace(x, "$1$2"), o = d(o), o = f(o), i = e.fixForBody !== !1 && t(e.enterMode, n.config.autoParagraph), o = CKEDITOR.htmlParser.fragment.fromHtml(o, e.context, i), i && (a = o, !a.children.length && CKEDITOR.dtd[a.name][i] && (i = new CKEDITOR.htmlParser.element(i), a.add(i))), e.dataValue = o
                }, null, null, 5), n.on("toHtml", function(e) {
                    e.data.filter.applyTo(e.data.dataValue, !0, e.data.dontFilter, e.data.enterMode) && n.fire("dataFiltered")
                }, null, null, 6), n.on("toHtml", function(e) {
                    e.data.dataValue.filterChildren(a.dataFilter, !0)
                }, null, null, 10), n.on("toHtml", function(e) {
                    var e = e.data,
                        t = e.dataValue,
                        n = new CKEDITOR.htmlParser.basicWriter;
                    t.writeChildrenHtml(n), t = n.getHtml(!0), e.dataValue = h(t)
                }, null, null, 15), n.on("toDataFormat", function(e) {
                    var i = e.data.dataValue;
                    e.data.enterMode != CKEDITOR.ENTER_BR && (i = i.replace(/^<br *\/?>/i, "")), e.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(i, e.data.context, t(e.data.enterMode, n.config.autoParagraph))
                }, null, null, 5), n.on("toDataFormat", function(e) {
                    e.data.dataValue.filterChildren(a.htmlFilter, !0)
                }, null, null, 10), n.on("toDataFormat", function(e) {
                    e.data.filter.applyTo(e.data.dataValue, !1, !0)
                }, null, null, 11), n.on("toDataFormat", function(e) {
                    var t = e.data.dataValue,
                        i = a.writer;
                    i.reset(), t.writeChildrenHtml(i), t = i.getHtml(!0), t = f(t), t = E(t, n), e.data.dataValue = t
                }, null, null, 15)
            }, CKEDITOR.htmlDataProcessor.prototype = {
                toHtml: function(e, t, n, i) {
                    var o, a, r, s, l = this.editor;
                    return t && "object" == typeof t ? (o = t.context, n = t.fixForBody, i = t.dontFilter, a = t.filter, r = t.enterMode, s = t.protectedWhitespaces) : o = t, !o && null !== o && (o = l.editable().getName()), l.fire("toHtml", {
                        dataValue: e,
                        context: o,
                        fixForBody: n,
                        dontFilter: i,
                        filter: a || l.filter,
                        enterMode: r || l.enterMode,
                        protectedWhitespaces: s
                    }).dataValue
                },
                toDataFormat: function(e, t) {
                    var n, i, o;
                    return t && (n = t.context, i = t.filter, o = t.enterMode), !n && null !== n && (n = this.editor.editable().getName()), this.editor.fire("toDataFormat", {
                        dataValue: e,
                        filter: i || this.editor.filter,
                        context: n,
                        enterMode: o || this.editor.enterMode
                    }).dataValue
                }
            };
            var g = /(?:&nbsp;|\xa0)$/,
                p = "{cke_protected}",
                T = CKEDITOR.dtd,
                C = ["caption", "colgroup", "col", "thead", "tfoot", "tbody"],
                I = CKEDITOR.tools.extend({}, T.$blockLimit, T.$block),
                O = {
                    elements: {
                        input: s,
                        textarea: s
                    }
                },
                D = {
                    attributeNames: [
                        [/^on/, "data-cke-pa-on"],
                        [/^data-cke-expando$/, ""]
                    ]
                },
                R = {
                    elements: {
                        embed: function(e) {
                            var t = e.parent;
                            if (t && "object" == t.name) {
                                var n = t.attributes.width,
                                    t = t.attributes.height;
                                n && (e.attributes.width = n), t && (e.attributes.height = t)
                            }
                        },
                        a: function(e) {
                            if (!e.children.length && !e.attributes.name && !e.attributes["data-cke-saved-name"]) return !1
                        }
                    }
                },
                v = {
                    elementNames: [
                        [/^cke:/, ""],
                        [/^\?xml:namespace$/, ""]
                    ],
                    attributeNames: [
                        [/^data-cke-(saved|pa)-/, ""],
                        [/^data-cke-.*/, ""],
                        ["hidefocus", ""]
                    ],
                    elements: {
                        $: function(e) {
                            var t = e.attributes;
                            if (t) {
                                if (t["data-cke-temp"]) return !1;
                                for (var n, i = ["name", "href", "src"], o = 0; o < i.length; o++) n = "data-cke-saved-" + i[o], n in t && delete t[i[o]]
                            }
                            return e
                        },
                        table: function(e) {
                            e.children.slice(0).sort(function(e, t) {
                                var n, i;
                                return e.type == CKEDITOR.NODE_ELEMENT && t.type == e.type && (n = CKEDITOR.tools.indexOf(C, e.name), i = CKEDITOR.tools.indexOf(C, t.name)), n > -1 && i > -1 && n != i || (n = e.parent ? e.getIndex() : -1, i = t.parent ? t.getIndex() : -1), n > i ? 1 : -1
                            })
                        },
                        param: function(e) {
                            return e.children = [], e.isEmpty = !0, e
                        },
                        span: function(e) {
                            "Apple-style-span" == e.attributes.class && delete e.name
                        },
                        html: function(e) {
                            delete e.attributes.contenteditable, delete e.attributes.class
                        },
                        body: function(e) {
                            delete e.attributes.spellcheck, delete e.attributes.contenteditable
                        },
                        style: function(e) {
                            var t = e.children[0];
                            t && t.value && (t.value = CKEDITOR.tools.trim(t.value)), e.attributes.type || (e.attributes.type = "text/css")
                        },
                        title: function(e) {
                            var t = e.children[0];
                            !t && r(e, t = new CKEDITOR.htmlParser.text), t.value = e.attributes["data-cke-title"] || ""
                        },
                        input: l,
                        textarea: l
                    },
                    attributes: {
                        class: function(e) {
                            return CKEDITOR.tools.ltrim(e.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1
                        }
                    }
                };
            CKEDITOR.env.ie && (v.attributes.style = function(e) {
                return e.replace(/(^|;)([^\:]+)/g, function(e) {
                    return e.toLowerCase()
                })
            });
            var b = /<(a|area|img|input|source)\b([^>]*)>/gi,
                K = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
                _ = /^(href|src|name)$/i,
                y = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
                k = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,
                N = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
                S = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
                x = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
                w = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
        }(), CKEDITOR.htmlParser.element = function(e, t) {
            this.name = e, this.attributes = t || {}, this.children = [];
            var n = e || "",
                i = n.match(/^cke:(.*)/);
            i && (n = i[1]), n = !!(CKEDITOR.dtd.$nonBodyContent[n] || CKEDITOR.dtd.$block[n] || CKEDITOR.dtd.$listItem[n] || CKEDITOR.dtd.$tableContent[n] || CKEDITOR.dtd.$nonEditable[n] || "br" == n), this.isEmpty = !!CKEDITOR.dtd.$empty[e], this.isUnknown = !CKEDITOR.dtd[e], this._ = {
                isBlockLike: n,
                hasInlineStarted: this.isEmpty || !n
            }
        }, CKEDITOR.htmlParser.cssStyle = function(e) {
            var t = {};
            return ((e instanceof CKEDITOR.htmlParser.element ? e.attributes.style : e) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(e, n, i) {
                "font-family" == n && (i = i.replace(/["']/g, "")), t[n.toLowerCase()] = i
            }), {
                rules: t,
                populate: function(e) {
                    var t = this.toString();
                    t && (e instanceof CKEDITOR.dom.element ? e.setAttribute("style", t) : e instanceof CKEDITOR.htmlParser.element ? e.attributes.style = t : e.style = t)
                },
                toString: function() {
                    var e, n = [];
                    for (e in t) t[e] && n.push(e, ":", t[e], ";");
                    return n.join("")
                }
            }
        }, function() {
            function e(e) {
                return function(t) {
                    return t.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof e ? t.name == e : t.name in e)
                }
            }
            var t = function(e, t) {
                    return e = e[0], t = t[0], e < t ? -1 : e > t ? 1 : 0
                },
                n = CKEDITOR.htmlParser.fragment.prototype;
            CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                type: CKEDITOR.NODE_ELEMENT,
                add: n.add,
                clone: function() {
                    return new CKEDITOR.htmlParser.element(this.name, this.attributes)
                },
                filter: function(e, t) {
                    var n, i, o = this,
                        t = o.getFilterContext(t);
                    if (t.off) return !0;
                    for (o.parent || e.onRoot(t, o);;) {
                        if (n = o.name, !(i = e.onElementName(t, n))) return this.remove(), !1;
                        if (o.name = i, !(o = e.onElement(t, o))) return this.remove(), !1;
                        if (o !== this) return this.replaceWith(o), !1;
                        if (o.name == n) break;
                        if (o.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(o), !1;
                        if (!o.name) return this.replaceWithChildren(), !1
                    }
                    n = o.attributes;
                    var a, r;
                    for (a in n) {
                        for (r = a, i = n[a];;) {
                            if (!(r = e.onAttributeName(t, a))) {
                                delete n[a];
                                break
                            }
                            if (r == a) break;
                            delete n[a], a = r
                        }
                        r && ((i = e.onAttribute(t, o, r, i)) === !1 ? delete n[r] : n[r] = i)
                    }
                    return o.isEmpty || this.filterChildren(e, !1, t), !0
                },
                filterChildren: n.filterChildren,
                writeHtml: function(e, n) {
                    n && this.filter(n);
                    var i, o, a = this.name,
                        r = [],
                        s = this.attributes;
                    e.openTag(a, s);
                    for (i in s) r.push([i, s[i]]);
                    for (e.sortAttributes && r.sort(t), i = 0, o = r.length; i < o; i++) s = r[i], e.attribute(s[0], s[1]);
                    e.openTagClose(a, this.isEmpty), this.writeChildrenHtml(e), this.isEmpty || e.closeTag(a)
                },
                writeChildrenHtml: n.writeChildrenHtml,
                replaceWithChildren: function() {
                    for (var e = this.children, t = e.length; t;) e[--t].insertAfter(this);
                    this.remove()
                },
                forEach: n.forEach,
                getFirst: function(t) {
                    if (!t) return this.children.length ? this.children[0] : null;
                    "function" != typeof t && (t = e(t));
                    for (var n = 0, i = this.children.length; n < i; ++n)
                        if (t(this.children[n])) return this.children[n];
                    return null
                },
                getHtml: function() {
                    var e = new CKEDITOR.htmlParser.basicWriter;
                    return this.writeChildrenHtml(e), e.getHtml()
                },
                setHtml: function(e) {
                    for (var e = this.children = CKEDITOR.htmlParser.fragment.fromHtml(e).children, t = 0, n = e.length; t < n; ++t) e[t].parent = this
                },
                getOuterHtml: function() {
                    var e = new CKEDITOR.htmlParser.basicWriter;
                    return this.writeHtml(e), e.getHtml()
                },
                split: function(e) {
                    for (var t = this.children.splice(e, this.children.length - e), n = this.clone(), i = 0; i < t.length; ++i) t[i].parent = n;
                    return n.children = t, t[0] && (t[0].previous = null), e > 0 && (this.children[e - 1].next = null), this.parent.add(n, this.getIndex() + 1), n
                },
                addClass: function(e) {
                    if (!this.hasClass(e)) {
                        var t = this.attributes.class || "";
                        this.attributes.class = t + (t ? " " : "") + e
                    }
                },
                removeClass: function(e) {
                    var t = this.attributes.class;
                    t && ((t = CKEDITOR.tools.trim(t.replace(RegExp("(?:\\s+|^)" + e + "(?:\\s+|$)"), " "))) ? this.attributes.class = t : delete this.attributes.class)
                },
                hasClass: function(e) {
                    var t = this.attributes.class;
                    return !!t && RegExp("(?:^|\\s)" + e + "(?=\\s|$)").test(t)
                },
                getFilterContext: function(e) {
                    var t = [];
                    if (e || (e = {
                            off: !1,
                            nonEditable: !1,
                            nestedEditable: !1
                        }), !e.off && "off" == this.attributes["data-cke-processor"] && t.push("off", !0), e.nonEditable || "false" != this.attributes.contenteditable ? e.nonEditable && !e.nestedEditable && "true" == this.attributes.contenteditable && t.push("nestedEditable", !0) : t.push("nonEditable", !0), t.length)
                        for (var e = CKEDITOR.tools.copy(e), n = 0; n < t.length; n += 2) e[t[n]] = t[n + 1];
                    return e
                }
            }, !0)
        }(), function() {
            var e = {},
                t = /{([^}]+)}/g,
                n = /([\\'])/g,
                i = /\n/g,
                o = /\r/g;
            CKEDITOR.template = function(a) {
                if (e[a]) this.output = e[a];
                else {
                    var r = a.replace(n, "\\$1").replace(i, "\\n").replace(o, "\\r").replace(t, function(e, t) {
                        return "',data['" + t + "']==undefined?'{" + t + "}':data['" + t + "'],'"
                    });
                    this.output = e[a] = Function("data", "buffer", "return buffer?buffer.push('" + r + "'):['" + r + "'].join('');")
                }
            }
        }(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document), CKEDITOR.add = function(e) {
            CKEDITOR.instances[e.name] = e, e.on("focus", function() {
                CKEDITOR.currentInstance != e && (CKEDITOR.currentInstance = e, CKEDITOR.fire("currentInstance"))
            }), e.on("blur", function() {
                CKEDITOR.currentInstance == e && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance"))
            }), CKEDITOR.fire("instance", null, e)
        }, CKEDITOR.remove = function(e) {
            delete CKEDITOR.instances[e.name]
        }, function() {
            var e = {};
            CKEDITOR.addTemplate = function(t, n) {
                var i = e[t];
                return i ? i : (i = {
                    name: t,
                    source: n
                }, CKEDITOR.fire("template", i), e[t] = new CKEDITOR.template(i.source))
            }, CKEDITOR.getTemplate = function(t) {
                return e[t]
            }
        }(), function() {
            var e = [];
            CKEDITOR.addCss = function(t) {
                e.push(t)
            }, CKEDITOR.getCss = function() {
                return e.join("\n")
            }
        }(), CKEDITOR.on("instanceDestroyed", function() {
            CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
        }), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0, function() {
            CKEDITOR.inline = function(e, t) {
                if (!CKEDITOR.env.isCompatible) return null;
                if (e = CKEDITOR.dom.element.get(e), e.getEditor()) throw 'The editor instance "' + e.getEditor().name + '" is already attached to the provided element.';
                var n = new CKEDITOR.editor(t, e, CKEDITOR.ELEMENT_MODE_INLINE),
                    i = e.is("textarea") ? e : null;
                return i ? (n.setData(i.getValue(), null, !0), e = CKEDITOR.dom.element.createFromHtml('<div contenteditable="' + !!n.readOnly + '" class="cke_textarea_inline">' + i.getValue() + "</div>", CKEDITOR.document), e.insertAfter(i), i.hide(), i.$.form && n._attachToForm()) : n.setData(e.getHtml(), null, !0), n.on("loaded", function() {
                    n.fire("uiReady"), n.editable(e), n.container = e, n.ui.contentsElement = e, n.setData(n.getData(1)), n.resetDirty(), n.fire("contentDom"), n.mode = "wysiwyg", n.fire("mode"), n.status = "ready", n.fireOnce("instanceReady"), CKEDITOR.fire("instanceReady", null, n)
                }, null, null, 1e4), n.on("destroy", function() {
                    i && (n.container.clearCustomData(), n.container.remove(), i.show()), n.element.clearCustomData(), delete n.element
                }), n
            }, CKEDITOR.inlineAll = function() {
                var e, t, n;
                for (n in CKEDITOR.dtd.$editable)
                    for (var i = CKEDITOR.document.getElementsByTag(n), o = 0, a = i.count(); o < a; o++) e = i.getItem(o), "true" == e.getAttribute("contenteditable") && (t = {
                        element: e,
                        config: {}
                    }, CKEDITOR.fire("inline", t) !== !1 && CKEDITOR.inline(e, t.config))
            }, CKEDITOR.domReady(function() {
                !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
            })
        }(), CKEDITOR.replaceClass = "ckeditor", function() {
            function e(e, i, o, a) {
                if (!CKEDITOR.env.isCompatible) return null;
                if (e = CKEDITOR.dom.element.get(e), e.getEditor()) throw 'The editor instance "' + e.getEditor().name + '" is already attached to the provided element.';
                var r = new CKEDITOR.editor(i, e, a);
                return a == CKEDITOR.ELEMENT_MODE_REPLACE && (e.setStyle("visibility", "hidden"), r._.required = e.hasAttribute("required"), e.removeAttribute("required")), o && r.setData(o, null, !0), r.on("loaded", function() {
                    n(r), a == CKEDITOR.ELEMENT_MODE_REPLACE && r.config.autoUpdateElement && e.$.form && r._attachToForm(), r.setMode(r.config.startupMode, function() {
                        r.resetDirty(), r.status = "ready", r.fireOnce("instanceReady"), CKEDITOR.fire("instanceReady", null, r)
                    })
                }), r.on("destroy", t), r
            }

            function t() {
                var e = this.container,
                    t = this.element;
                e && (e.clearCustomData(), e.remove()), t && (t.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (t.show(), this._.required && t.setAttribute("required", "required")), delete this.element)
            }

            function n(e) {
                var t = e.name,
                    n = e.element,
                    i = e.elementMode,
                    o = e.fire("uiSpace", {
                        space: "top",
                        html: ""
                    }).html,
                    a = e.fire("uiSpace", {
                        space: "bottom",
                        html: ""
                    }).html,
                    r = new CKEDITOR.template('<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application"' + (e.title ? ' aria-labelledby="cke_{name}_arialbl"' : "") + ">" + (e.title ? '<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>' : "") + '<{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>'),
                    t = CKEDITOR.dom.element.createFromHtml(r.output({
                        id: e.id,
                        name: t,
                        langDir: e.lang.dir,
                        langCode: e.langCode,
                        voiceLabel: e.title,
                        topHtml: o ? '<span id="' + e.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + o + "</span>" : "",
                        contentId: e.ui.spaceId("contents"),
                        bottomHtml: a ? '<span id="' + e.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + a + "</span>" : "",
                        outerEl: CKEDITOR.env.ie ? "span" : "div"
                    }));
                i == CKEDITOR.ELEMENT_MODE_REPLACE ? (n.hide(), t.insertAfter(n)) : n.append(t), e.container = t, e.ui.contentsElement = e.ui.space("contents"), o && e.ui.space("top").unselectable(), a && e.ui.space("bottom").unselectable(), n = e.config.width, i = e.config.height, n && t.setStyle("width", CKEDITOR.tools.cssLength(n)), i && e.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(i)), t.disableContextMenu(), CKEDITOR.env.webkit && t.on("focus", function() {
                    e.focus()
                }), e.fireOnce("uiReady")
            }
            CKEDITOR.replace = function(t, n) {
                return e(t, n, null, CKEDITOR.ELEMENT_MODE_REPLACE)
            }, CKEDITOR.appendTo = function(t, n, i) {
                return e(t, n, i, CKEDITOR.ELEMENT_MODE_APPENDTO)
            }, CKEDITOR.replaceAll = function() {
                for (var e = document.getElementsByTagName("textarea"), t = 0; t < e.length; t++) {
                    var n = null,
                        i = e[t];
                    if (i.name || i.id) {
                        if ("string" == typeof arguments[0]) {
                            if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(i.className)) continue
                        } else if ("function" == typeof arguments[0] && (n = {}, arguments[0](i, n) === !1)) continue;
                        this.replace(i, n)
                    }
                }
            }, CKEDITOR.editor.prototype.addMode = function(e, t) {
                (this._.modes || (this._.modes = {}))[e] = t
            }, CKEDITOR.editor.prototype.setMode = function(e, t) {
                var n = this,
                    i = this._.modes;
                if (e != n.mode && i && i[e]) {
                    if (n.fire("beforeSetMode", e), n.mode) {
                        var o, a = n.checkDirty(),
                            i = n._.previousModeData,
                            r = 0;
                        n.fire("beforeModeUnload"), n.editable(0), n._.previousMode = n.mode, n._.previousModeData = o = n.getData(1), "source" == n.mode && i == o && (n.fire("lockSnapshot", {
                            forceUpdate: !0
                        }), r = 1), n.ui.space("contents").setHtml(""), n.mode = ""
                    } else n._.previousModeData = n.getData(1);
                    this._.modes[e](function() {
                        n.mode = e, void 0 !== a && !a && n.resetDirty(), r ? n.fire("unlockSnapshot") : "wysiwyg" == e && n.fire("saveSnapshot"), setTimeout(function() {
                            n.fire("mode"), t && t.call(n)
                        }, 0)
                    })
                }
            }, CKEDITOR.editor.prototype.resize = function(e, t, n, i) {
                var o = this.container,
                    a = this.ui.space("contents"),
                    r = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement,
                    i = i ? this.container.getFirst(function(e) {
                        return e.type == CKEDITOR.NODE_ELEMENT && e.hasClass("cke_inner")
                    }) : o;
                i.setSize("width", e, !0), r && (r.style.width = "1%");
                var s = (i.$.offsetHeight || 0) - (a.$.clientHeight || 0),
                    o = Math.max(t - (n ? 0 : s), 0),
                    t = n ? t + s : t;
                a.setStyle("height", o + "px"), r && (r.style.width = "100%"), this.fire("resize", {
                    outerHeight: t,
                    contentsHeight: o,
                    outerWidth: e || i.getSize("width")
                })
            }, CKEDITOR.editor.prototype.getResizable = function(e) {
                return e ? this.ui.space("contents") : this.container
            }, CKEDITOR.domReady(function() {
                CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
            })
        }(), CKEDITOR.config.startupMode = "wysiwyg", function() {
            function e(e) {
                var n, o = e.editor,
                    a = e.data.path,
                    s = a.blockLimit,
                    l = e.data.selection,
                    c = l.getRanges()[0];
                (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) && (l = t(l, a)) && (l.appendBogus(), n = CKEDITOR.env.ie), r(o, a.block, s) && c.collapsed && !c.getCommonAncestor().isReadOnly() && (a = c.clone(), a.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), s = new CKEDITOR.dom.walker(a), s.guard = function(e) {
                    return !i(e) || e.type == CKEDITOR.NODE_COMMENT || e.isReadOnly()
                }, (!s.checkForward() || a.checkStartOfBlock() && a.checkEndOfBlock()) && (o = c.fixBlock(!0, o.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (o = o.getFirst(i)) && o.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(o.getText()).match(/^(?:&nbsp;|\xa0)$/) && o.remove(), n = 1, e.cancel())), n && c.select()
            }

            function t(e, t) {
                if (e.isFake) return 0;
                var n = t.block || t.blockLimit,
                    o = n && n.getLast(i);
                return !n || !n.isBlockBoundary() || o && o.type == CKEDITOR.NODE_ELEMENT && o.isBlockBoundary() || n.is("pre") || n.getBogus() ? void 0 : n
            }

            function n(e) {
                var t = e.data.getTarget();
                t.is("input") && (t = t.getAttribute("type"), ("submit" == t || "reset" == t) && e.data.preventDefault())
            }

            function i(e) {
                return E(e) && m(e)
            }

            function o(e, t) {
                return function(n) {
                    var i = n.data.$.toElement || n.data.$.fromElement || n.data.$.relatedTarget,
                        i = i && i.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(i) : null;
                    (!i || !t.equals(i) && !t.contains(i)) && e.call(this, n)
                }
            }

            function a(e) {
                function t(e) {
                    return function(t, o) {
                        if (o && t.type == CKEDITOR.NODE_ELEMENT && t.is(a) && (n = t), !o && i(t) && (!e || !p(t))) return !1
                    }
                }
                var n, o = e.getRanges()[0],
                    e = e.root,
                    a = {
                        table: 1,
                        ul: 1,
                        ol: 1,
                        dl: 1
                    };
                if (o.startPath().contains(a)) {
                    var r = o.clone();
                    if (r.collapse(1), r.setStartAt(e, CKEDITOR.POSITION_AFTER_START), e = new CKEDITOR.dom.walker(r), e.guard = t(), e.checkBackward(), n) return r = o.clone(), r.collapse(), r.setEndAt(n, CKEDITOR.POSITION_AFTER_END), e = new CKEDITOR.dom.walker(r), e.guard = t(!0), n = !1, e.checkForward(), n
                }
                return null
            }

            function r(e, t, n) {
                return e.config.autoParagraph !== !1 && e.activeEnterMode != CKEDITOR.ENTER_BR && (e.editable().equals(n) && !t || t && "true" == t.getAttribute("contenteditable"))
            }

            function s(e) {
                return e.activeEnterMode != CKEDITOR.ENTER_BR && e.config.autoParagraph !== !1 && (e.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p")
            }

            function l(e) {
                var t = e.editor;
                t.getSelection().scrollIntoView(), setTimeout(function() {
                    t.fire("saveSnapshot")
                }, 0)
            }

            function c(e, t, n) {
                for (var i = e.getCommonAncestor(t), t = e = n ? t : e;
                    (e = e.getParent()) && !i.equals(e) && 1 == e.getChildCount();) t = e;
                t.remove()
            }
            var u, d, h, f;
            CKEDITOR.editable = CKEDITOR.tools.createClass({
                base: CKEDITOR.dom.element,
                $: function(e, t) {
                    this.base(t.$ || t), this.editor = e, this.status = "unloaded", this.hasFocus = !1, this.setup()
                },
                proto: {
                    focus: function() {
                        var e;
                        if (CKEDITOR.env.webkit && !this.hasFocus && (e = this.editor._.previousActive || this.getDocument().getActive(), this.contains(e))) return void e.focus();
                        try {
                            this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]()
                        } catch (e) {
                            if (!CKEDITOR.env.ie) throw e
                        }
                        CKEDITOR.env.safari && !this.isInline() && (e = CKEDITOR.document.getActive(), e.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                    },
                    on: function(e, t) {
                        var n = Array.prototype.slice.call(arguments, 0);
                        return CKEDITOR.env.ie && /^focus|blur$/.exec(e) && (e = "focus" == e ? "focusin" : "focusout", t = o(t, this), n[0] = e, n[1] = t), CKEDITOR.dom.element.prototype.on.apply(this, n)
                    },
                    attachListener: function(e) {
                        !this._.listeners && (this._.listeners = []);
                        var t = Array.prototype.slice.call(arguments, 1),
                            t = e.on.apply(e, t);
                        return this._.listeners.push(t), t
                    },
                    clearListeners: function() {
                        var e = this._.listeners;
                        try {
                            for (; e.length;) e.pop().removeListener()
                        } catch (e) {}
                    },
                    restoreAttrs: function() {
                        var e, t, n = this._.attrChanges;
                        for (t in n) n.hasOwnProperty(t) && (e = n[t], null !== e ? this.setAttribute(t, e) : this.removeAttribute(t))
                    },
                    attachClass: function(e) {
                        var t = this.getCustomData("classes");
                        this.hasClass(e) || (!t && (t = []), t.push(e), this.setCustomData("classes", t), this.addClass(e))
                    },
                    changeAttr: function(e, t) {
                        var n = this.getAttribute(e);
                        t !== n && (!this._.attrChanges && (this._.attrChanges = {}), e in this._.attrChanges || (this._.attrChanges[e] = n), this.setAttribute(e, t))
                    },
                    insertText: function(e) {
                        this.editor.focus(), this.insertHtml(this.transformPlainTextToHtml(e), "text")
                    },
                    transformPlainTextToHtml: function(e) {
                        var t = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode;
                        return CKEDITOR.tools.transformPlainTextToHtml(e, t)
                    },
                    insertHtml: function(e, t, n) {
                        var i = this.editor;
                        i.focus(), i.fire("saveSnapshot"), n || (n = i.getSelection().getRanges()[0]), C(this, t || "html", e, n), n.select(), l(this), this.editor.fire("afterInsertHtml", {})
                    },
                    insertHtmlIntoRange: function(e, t, n) {
                        C(this, n || "html", e, t), this.editor.fire("afterInsertHtml", {
                            intoRange: t
                        })
                    },
                    insertElement: function(e, t) {
                        var n = this.editor;
                        n.focus(), n.fire("saveSnapshot");
                        var o = n.activeEnterMode,
                            n = n.getSelection(),
                            a = e.getName(),
                            a = CKEDITOR.dtd.$block[a];
                        t || (t = n.getRanges()[0]), this.insertElementIntoRange(e, t) && (t.moveToPosition(e, CKEDITOR.POSITION_AFTER_END), a && ((a = e.getNext(function(e) {
                            return i(e) && !p(e)
                        })) && a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$block) ? a.getDtd()["#"] ? t.moveToElementEditStart(a) : t.moveToElementEditEnd(e) : a || o == CKEDITOR.ENTER_BR || (a = t.fixBlock(!0, o == CKEDITOR.ENTER_DIV ? "div" : "p"), t.moveToElementEditStart(a)))), n.selectRanges([t]), l(this)
                    },
                    insertElementIntoSelection: function(e) {
                        this.insertElement(e)
                    },
                    insertElementIntoRange: function(e, t) {
                        var n = this.editor,
                            i = n.config.enterMode,
                            o = e.getName(),
                            a = CKEDITOR.dtd.$block[o];
                        if (t.checkReadOnly()) return !1;
                        t.deleteContents(1), t.startContainer.type == CKEDITOR.NODE_ELEMENT && t.startContainer.is({
                            tr: 1,
                            table: 1,
                            tbody: 1,
                            thead: 1,
                            tfoot: 1
                        }) && I(t);
                        var r, s;
                        if (a)
                            for (;
                                (r = t.getCommonAncestor(0, 1)) && (s = CKEDITOR.dtd[r.getName()]) && (!s || !s[o]);) r.getName() in CKEDITOR.dtd.span ? t.splitElement(r) : t.checkStartOfBlock() && t.checkEndOfBlock() ? (t.setStartBefore(r), t.collapse(!0), r.remove()) : t.splitBlock(i == CKEDITOR.ENTER_DIV ? "div" : "p", n.editable());
                        return t.insertNode(e), !0
                    },
                    setData: function(e, t) {
                        t || (e = this.editor.dataProcessor.toHtml(e)), this.setHtml(e), this.fixInitialSelection(), "unloaded" == this.status && (this.status = "ready"), this.editor.fire("dataReady")
                    },
                    getData: function(e) {
                        var t = this.getHtml();
                        return e || (t = this.editor.dataProcessor.toDataFormat(t)), t
                    },
                    setReadOnly: function(e) {
                        this.setAttribute("contenteditable", !e)
                    },
                    detach: function() {
                        this.removeClass("cke_editable"), this.status = "detached";
                        var e = this.editor;
                        this._.detach(), delete e.document,
                            delete e.window
                    },
                    isInline: function() {
                        return this.getDocument().equals(CKEDITOR.document)
                    },
                    fixInitialSelection: function() {
                        function e() {
                            var e, t = n.getDocument().$,
                                i = t.getSelection();
                            if (i.anchorNode && i.anchorNode == n.$) e = !0;
                            else if (CKEDITOR.env.webkit) {
                                var o = n.getDocument().getActive();
                                o && o.equals(n) && !i.anchorNode && (e = !0)
                            }
                            e && (e = new CKEDITOR.dom.range(n), e.moveToElementEditStart(n), t = t.createRange(), t.setStart(e.startContainer.$, e.startOffset), t.collapse(!0), i.removeAllRanges(), i.addRange(t))
                        }

                        function t() {
                            var e = n.getDocument().$,
                                t = e.selection,
                                i = n.getDocument().getActive();
                            "None" == t.type && i.equals(n) && (t = new CKEDITOR.dom.range(n), e = e.body.createTextRange(), t.moveToElementEditStart(n), t = t.startContainer, t.type != CKEDITOR.NODE_ELEMENT && (t = t.getParent()), e.moveToElementText(t.$), e.collapse(!0), e.select())
                        }
                        var n = this;
                        CKEDITOR.env.ie && (CKEDITOR.env.version < 9 || CKEDITOR.env.quirks) ? this.hasFocus && (this.focus(), t()) : this.hasFocus ? (this.focus(), e()) : this.once("focus", function() {
                            e()
                        }, null, null, -999)
                    },
                    getHtmlFromRange: function(e) {
                        return e.collapsed ? new CKEDITOR.dom.documentFragment(e.document) : (e = {
                            doc: this.getDocument(),
                            range: e.clone()
                        }, u.detect(e, this), d.exclude(e), h.shrink(e), e.fragment = e.range.cloneContents(), f.rebuild(e, this), u.fix(e, this), new CKEDITOR.dom.documentFragment(e.fragment.$))
                    },
                    extractHtmlFromRange: function(e, t) {
                        var n = O,
                            i = {
                                range: e,
                                doc: e.document
                            },
                            o = this.getHtmlFromRange(e);
                        if (e.collapsed) return e.optimize(), o;
                        e.enlarge(CKEDITOR.ENLARGE_INLINE, 1), n.table.detectPurge(i), i.bookmark = e.createBookmark(), delete i.range;
                        var a = this.editor.createRange();
                        if (a.moveToPosition(i.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START), i.targetBookmark = a.createBookmark(), n.list.detectMerge(i, this), n.table.detectRanges(i, this), n.block.detectMerge(i, this), i.tableContentsRanges ? (n.table.deleteRanges(i), e.moveToBookmark(i.bookmark), i.range = e) : (e.moveToBookmark(i.bookmark), i.range = e, e.extractContents(n.detectExtractMerge(i))), e.moveToBookmark(i.targetBookmark), e.optimize(), n.fixUneditableRangePosition(e), n.list.merge(i, this), n.table.purge(i, this), n.block.merge(i, this), t) {
                            if (n = e.startPath(), (i = e.checkStartOfBlock()) && (i = e.checkEndOfBlock()) && (i = n.block) && (i = !e.root.equals(n.block))) {
                                e: {
                                    var r, i = n.block.getElementsByTag("span"),
                                        a = 0;
                                    if (i)
                                        for (; r = i.getItem(a++);)
                                            if (!m(r)) {
                                                i = !0;
                                                break e
                                            } i = !1
                                }
                                i = !i
                            }
                            i && (e.moveToPosition(n.block, CKEDITOR.POSITION_BEFORE_START), n.block.remove())
                        } else n.autoParagraph(this.editor, e), g(e.startContainer) && e.startContainer.appendBogus();
                        return e.startContainer.mergeSiblings(), o
                    },
                    setup: function() {
                        var e = this.editor;
                        if (this.attachListener(e, "beforeGetData", function() {
                                var t = this.getData();
                                this.is("textarea") || e.config.ignoreEmptyParagraph !== !1 && (t = t.replace(T, function(e, t) {
                                    return t
                                })), e.setData(t, null, 1)
                            }, this), this.attachListener(e, "getSnapshot", function(e) {
                                e.data = this.getData(1)
                            }, this), this.attachListener(e, "afterSetData", function() {
                                this.setData(e.getData(1))
                            }, this), this.attachListener(e, "loadSnapshot", function(e) {
                                this.setData(e.data, 1)
                            }, this), this.attachListener(e, "beforeFocus", function() {
                                var t = e.getSelection();
                                (t = t && t.getNative()) && "Control" == t.type || this.focus()
                            }, this), this.attachListener(e, "insertHtml", function(e) {
                                this.insertHtml(e.data.dataValue, e.data.mode, e.data.range)
                            }, this), this.attachListener(e, "insertElement", function(e) {
                                this.insertElement(e.data)
                            }, this), this.attachListener(e, "insertText", function(e) {
                                this.insertText(e.data)
                            }, this), this.setReadOnly(e.readOnly), this.attachClass("cke_editable"), e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : (e.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || e.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO) && this.attachClass("cke_editable_themed"), this.attachClass("cke_contents_" + e.config.contentsLangDirection), e.keystrokeHandler.blockedKeystrokes[8] = +e.readOnly, e.keystrokeHandler.attach(this), this.on("blur", function() {
                                this.hasFocus = !1
                            }, null, null, -1), this.on("focus", function() {
                                this.hasFocus = !0
                            }, null, null, -1), e.focusManager.add(this), this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, e.once("contentDom", function() {
                                e.focusManager.focus(this)
                            }, this)), this.isInline() && this.changeAttr("tabindex", e.tabIndex), !this.is("textarea")) {
                            e.document = this.getDocument(), e.window = this.getWindow();
                            var t = e.document;
                            this.changeAttr("spellcheck", !e.config.disableNativeSpellChecker);
                            var o = e.config.contentsLangDirection;
                            this.getDirection(1) != o && this.changeAttr("dir", o);
                            var r = CKEDITOR.getCss();
                            r && (o = t.getHead(), o.getCustomData("stylesheet") || (r = t.appendStyleText(r), r = new CKEDITOR.dom.element(r.ownerNode || r.owningElement), o.setCustomData("stylesheet", r), r.data("cke-temp", 1))), o = t.getCustomData("stylesheet_ref") || 0, t.setCustomData("stylesheet_ref", o + 1), this.setCustomData("cke_includeReadonly", !e.config.disableReadonlyStyling), this.attachListener(this, "click", function(e) {
                                var e = e.data,
                                    t = new CKEDITOR.dom.elementPath(e.getTarget(), this).contains("a");
                                t && 2 != e.$.button && t.isReadOnly() && e.preventDefault()
                            });
                            var s = {
                                8: 1,
                                46: 1
                            };
                            this.attachListener(e, "key", function(t) {
                                if (e.readOnly) return !0;
                                var n, i = t.data.domEvent.getKey();
                                if (i in s) {
                                    var o, r, l, c, t = e.getSelection(),
                                        u = t.getRanges()[0],
                                        d = u.startPath(),
                                        i = 8 == i;
                                    CKEDITOR.env.ie && CKEDITOR.env.version < 11 && (o = t.getSelectedElement()) || (o = a(t)) ? (e.fire("saveSnapshot"), u.moveToPosition(o, CKEDITOR.POSITION_BEFORE_START), o.remove(), u.select(), e.fire("saveSnapshot"), n = 1) : u.collapsed && ((r = d.block) && (c = r[i ? "getPrevious" : "getNext"](E)) && c.type == CKEDITOR.NODE_ELEMENT && c.is("table") && u[i ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (e.fire("saveSnapshot"), u[i ? "checkEndOfBlock" : "checkStartOfBlock"]() && r.remove(), u["moveToElementEdit" + (i ? "End" : "Start")](c), u.select(), e.fire("saveSnapshot"), n = 1) : d.blockLimit && d.blockLimit.is("td") && (l = d.blockLimit.getAscendant("table")) && u.checkBoundaryOfElement(l, i ? CKEDITOR.START : CKEDITOR.END) && (c = l[i ? "getPrevious" : "getNext"](E)) ? (e.fire("saveSnapshot"), u["moveToElementEdit" + (i ? "End" : "Start")](c), u.checkStartOfBlock() && u.checkEndOfBlock() ? c.remove() : u.select(), e.fire("saveSnapshot"), n = 1) : (l = d.contains(["td", "th", "caption"])) && u.checkBoundaryOfElement(l, i ? CKEDITOR.START : CKEDITOR.END) && (n = 1))
                                }
                                return !n
                            }), e.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function(t) {
                                t.data.getKeystroke() in s && !this.getFirst(i) && (this.appendBogus(), t = e.createRange(), t.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), t.select())
                            }), this.attachListener(this, "dblclick", function(t) {
                                return !e.readOnly && (t = {
                                    element: t.data.getTarget()
                                }, void e.fire("doubleclick", t))
                            }), CKEDITOR.env.ie && this.attachListener(this, "click", n), (!CKEDITOR.env.ie || CKEDITOR.env.edge) && this.attachListener(this, "mousedown", function(t) {
                                var n = t.data.getTarget();
                                n.is("img", "hr", "input", "textarea", "select") && !n.isReadOnly() && (e.getSelection().selectElement(n), n.is("input", "textarea", "select") && t.data.preventDefault())
                            }), CKEDITOR.env.edge && this.attachListener(this, "mouseup", function(t) {
                                (t = t.data.getTarget()) && t.is("img") && e.getSelection().selectElement(t)
                            }), CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(t) {
                                if (2 == t.data.$.button && (t = t.data.getTarget(), !t.getOuterHtml().replace(T, ""))) {
                                    var n = e.createRange();
                                    n.moveToElementEditStart(t), n.select(!0)
                                }
                            }), CKEDITOR.env.webkit && (this.attachListener(this, "click", function(e) {
                                e.data.getTarget().is("input", "select") && e.data.preventDefault()
                            }), this.attachListener(this, "mouseup", function(e) {
                                e.data.getTarget().is("input", "textarea") && e.data.preventDefault()
                            })), CKEDITOR.env.webkit && this.attachListener(e, "key", function(t) {
                                if (e.readOnly) return !0;
                                if (t = t.data.domEvent.getKey(), t in s) {
                                    var n = 8 == t,
                                        i = e.getSelection().getRanges()[0],
                                        t = i.startPath();
                                    if (i.collapsed) {
                                        var o;
                                        e: {
                                            var a = t.block;
                                            if (a)
                                                if (i[n ? "checkStartOfBlock" : "checkEndOfBlock"]())
                                                    if (i.moveToClosestEditablePosition(a, !n) && i.collapsed) {
                                                        if (i.startContainer.type == CKEDITOR.NODE_ELEMENT) {
                                                            var r = i.startContainer.getChild(i.startOffset - (n ? 1 : 0));
                                                            if (r && r.type == CKEDITOR.NODE_ELEMENT && r.is("hr")) {
                                                                e.fire("saveSnapshot"), r.remove(), o = !0;
                                                                break e
                                                            }
                                                        }
                                                        if ((i = i.startPath().block) && (!i || !i.contains(a))) {
                                                            e.fire("saveSnapshot");
                                                            var l;
                                                            (l = (n ? i : a).getBogus()) && l.remove(), o = e.getSelection(), l = o.createBookmarks(), (n ? a : i).moveChildren(n ? i : a, !1), t.lastElement.mergeSiblings(), c(a, i, !n), o.selectBookmarks(l), o = !0
                                                        }
                                                    } else o = !1;
                                            else o = !1;
                                            else o = !1
                                        }
                                        if (!o) return
                                    } else if (n = i, o = t.block, l = n.endPath().block, o && l && !o.equals(l) ? (e.fire("saveSnapshot"), (a = o.getBogus()) && a.remove(), n.enlarge(CKEDITOR.ENLARGE_INLINE), n.deleteContents(), l.getParent() && (l.moveChildren(o, !1), t.lastElement.mergeSiblings(), c(o, l, !0)), n = e.getSelection().getRanges()[0], n.collapse(1), n.optimize(), "" === n.startContainer.getHtml() && n.startContainer.appendBogus(), n.select(), t = !0) : t = !1, !t) return;
                                    return e.getSelection().scrollIntoView(), e.fire("saveSnapshot"), !1
                                }
                            }, this, null, 100)
                        }
                    }
                },
                _: {
                    detach: function() {
                        this.editor.setData(this.editor.getData(), 0, 1), this.clearListeners(), this.restoreAttrs();
                        var e;
                        if (e = this.removeCustomData("classes"))
                            for (; e.length;) this.removeClass(e.pop());
                        if (!this.is("textarea")) {
                            e = this.getDocument();
                            var t = e.getHead();
                            if (t.getCustomData("stylesheet")) {
                                var n = e.getCustomData("stylesheet_ref");
                                --n ? e.setCustomData("stylesheet_ref", n) : (e.removeCustomData("stylesheet_ref"), t.removeCustomData("stylesheet").remove())
                            }
                        }
                        this.editor.fire("contentDomUnload"), delete this.editor
                    }
                }
            }), CKEDITOR.editor.prototype.editable = function(e) {
                var t = this._.editable;
                return t && e ? 0 : (arguments.length && (t = this._.editable = e ? e instanceof CKEDITOR.editable ? e : new CKEDITOR.editable(this, e) : (t && t.detach(), null)), t)
            }, CKEDITOR.on("instanceLoaded", function(t) {
                var n = t.editor;
                n.on("insertElement", function(e) {
                    e = e.data, e.type == CKEDITOR.NODE_ELEMENT && (e.is("input") || e.is("textarea")) && ("false" != e.getAttribute("contentEditable") && e.data("cke-editable", e.hasAttribute("contenteditable") ? "true" : "1"), e.setAttribute("contentEditable", !1))
                }), n.on("selectionChange", function(t) {
                    if (!n.readOnly) {
                        var i = n.getSelection();
                        i && !i.isLocked && (i = n.checkDirty(), n.fire("lockSnapshot"), e(t), n.fire("unlockSnapshot"), !i && n.resetDirty())
                    }
                })
            }), CKEDITOR.on("instanceCreated", function(e) {
                var t = e.editor;
                t.on("mode", function() {
                    var e = t.editable();
                    if (e && e.isInline()) {
                        var n = t.title;
                        e.changeAttr("role", "textbox"), e.changeAttr("aria-label", n), n && e.changeAttr("title", n);
                        var i = t.fire("ariaEditorHelpLabel", {}).label;
                        if (i && (n = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
                            var o = CKEDITOR.tools.getNextId(),
                                i = CKEDITOR.dom.element.createFromHtml('<span id="' + o + '" class="cke_voice_label">' + i + "</span>");
                            n.append(i), e.changeAttr("aria-describedby", o)
                        }
                    }
                })
            }), CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
            var E = CKEDITOR.dom.walker.whitespaces(!0),
                m = CKEDITOR.dom.walker.bookmark(!1, !0),
                g = CKEDITOR.dom.walker.empty(),
                p = CKEDITOR.dom.walker.bogus(),
                T = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
                C = function() {
                    function e(e) {
                        return e.type == CKEDITOR.NODE_ELEMENT
                    }

                    function t(n, i) {
                        var o, a, r, s, l = [],
                            u = i.range.startContainer;
                        o = i.range.startPath();
                        for (var u = c[u.getName()], d = 0, h = n.getChildren(), f = h.count(), E = -1, m = -1, g = 0, p = o.contains(c.$list); d < f; ++d) o = h.getItem(d), e(o) ? (r = o.getName(), p && r in CKEDITOR.dtd.$list ? l = l.concat(t(o, i)) : (s = !!u[r], "br" != r || !o.data("cke-eol") || d && d != f - 1 || (g = (a = d ? l[d - 1].node : h.getItem(d + 1)) && (!e(a) || !a.is("br")), a = a && e(a) && c.$block[a.getName()]), E == -1 && !s && (E = d), s || (m = d), l.push({
                            isElement: 1,
                            isLineBreak: g,
                            isBlock: o.isBlockBoundary(),
                            hasBlockSibling: a,
                            node: o,
                            name: r,
                            allowed: s
                        }), a = g = 0)) : l.push({
                            isElement: 0,
                            node: o,
                            allowed: 1
                        });
                        return E > -1 && (l[E].firstNotAllowed = 1), m > -1 && (l[m].lastNotAllowed = 1), l
                    }

                    function n(t, i) {
                        var o, a = [],
                            r = t.getChildren(),
                            s = r.count(),
                            l = 0,
                            u = c[i],
                            d = !t.is(c.$inline) || t.is("br");
                        for (d && a.push(" "); l < s; l++) o = r.getItem(l), e(o) && !o.is(u) ? a = a.concat(n(o, i)) : a.push(o);
                        return d && a.push(" "), a
                    }

                    function o(t) {
                        return t && e(t) && (t.is(c.$removeEmpty) || t.is("a") && !t.isBlockBoundary())
                    }

                    function a(t, n, i, o) {
                        var r, s, l = t.clone();
                        l.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), (r = new CKEDITOR.dom.walker(l).next()) && e(r) && u[r.getName()] && (s = r.getPrevious()) && e(s) && !s.getParent().equals(t.startContainer) && i.contains(s) && o.contains(r) && r.isIdentical(s) && (r.moveChildren(s), r.remove(), a(t, n, i, o))
                    }

                    function l(t, n) {
                        function i(t, n) {
                            if (n.isBlock && n.isElement && !n.node.is("br") && e(t) && t.is("br")) return t.remove(), 1
                        }
                        var o = n.endContainer.getChild(n.endOffset),
                            a = n.endContainer.getChild(n.endOffset - 1);
                        o && i(o, t[t.length - 1]), a && i(a, t[0]) && (n.setEnd(n.endContainer, n.endOffset - 1), n.collapse())
                    }
                    var c = CKEDITOR.dtd,
                        u = {
                            p: 1,
                            div: 1,
                            h1: 1,
                            h2: 1,
                            h3: 1,
                            h4: 1,
                            h5: 1,
                            h6: 1,
                            ul: 1,
                            ol: 1,
                            li: 1,
                            pre: 1,
                            dl: 1,
                            blockquote: 1
                        },
                        d = {
                            p: 1,
                            div: 1,
                            h1: 1,
                            h2: 1,
                            h3: 1,
                            h4: 1,
                            h5: 1,
                            h6: 1
                        },
                        h = CKEDITOR.tools.extend({}, c.$inline);
                    return delete h.br,
                        function(u, f, E, m) {
                            var g = u.editor,
                                p = !1;
                            if ("unfiltered_html" == f && (f = "html", p = !0), !m.checkReadOnly()) {
                                var T, C, I = new CKEDITOR.dom.elementPath(m.startContainer, m.root).blockLimit || m.root,
                                    u = {
                                        type: f,
                                        dontFilter: p,
                                        editable: u,
                                        editor: g,
                                        range: m,
                                        blockLimit: I,
                                        mergeCandidates: [],
                                        zombies: []
                                    },
                                    f = u.range,
                                    m = u.mergeCandidates;
                                if ("text" == u.type && f.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (T = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", f.document), f.insertNode(T), f.setStartAfter(T)), p = new CKEDITOR.dom.elementPath(f.startContainer), u.endPath = I = new CKEDITOR.dom.elementPath(f.endContainer), !f.collapsed) {
                                    var g = I.block || I.blockLimit,
                                        O = f.getCommonAncestor();
                                    g && !g.equals(O) && !g.contains(O) && f.checkEndOfBlock() && u.zombies.push(g), f.deleteContents()
                                }
                                for (;
                                    (C = e(f.startContainer) && f.startContainer.getChild(f.startOffset - 1)) && e(C) && C.isBlockBoundary() && p.contains(C);) f.moveToPosition(C, CKEDITOR.POSITION_BEFORE_END);
                                for (a(f, u.blockLimit, p, I), T && (f.setEndBefore(T), f.collapse(), T.remove()), T = f.startPath(), (g = T.contains(o, !1, 1)) && (f.splitElement(g), u.inlineStylesRoot = g, u.inlineStylesPeak = T.lastElement), T = f.createBookmark(), (g = T.startNode.getPrevious(i)) && e(g) && o(g) && m.push(g), (g = T.startNode.getNext(i)) && e(g) && o(g) && m.push(g), g = T.startNode;
                                    (g = g.getParent()) && o(g);) m.push(g);
                                if (f.moveToBookmark(T), T = E) {
                                    if (T = u.range, "text" == u.type && u.inlineStylesRoot) {
                                        for (C = u.inlineStylesPeak, f = C.getDocument().createText("{cke-peak}"), m = u.inlineStylesRoot.getParent(); !C.equals(m);) f = f.appendTo(C.clone()), C = C.getParent();
                                        E = f.getOuterHtml().split("{cke-peak}").join(E)
                                    }
                                    if (C = u.blockLimit.getName(), /^\s+|\s+$/.test(E) && "span" in CKEDITOR.dtd[C]) var D = '<span data-cke-marker="1">&nbsp;</span>',
                                        E = D + E + D;
                                    if (E = u.editor.dataProcessor.toHtml(E, {
                                            context: null,
                                            fixForBody: !1,
                                            protectedWhitespaces: !!D,
                                            dontFilter: u.dontFilter,
                                            filter: u.editor.activeFilter,
                                            enterMode: u.editor.activeEnterMode
                                        }), C = T.document.createElement("body"), C.setHtml(E), D && (C.getFirst().remove(), C.getLast().remove()), (D = T.startPath().block) && (1 != D.getChildCount() || !D.getBogus())) e: {
                                        var R;
                                        if (1 == C.getChildCount() && e(R = C.getFirst()) && R.is(d) && !R.hasAttribute("contenteditable")) {
                                            for (D = R.getElementsByTag("*"), T = 0, m = D.count(); T < m; T++)
                                                if (f = D.getItem(T), !f.is(h)) break e;
                                            R.moveChildren(R.getParent(1)), R.remove()
                                        }
                                    }
                                    u.dataWrapper = C, T = E
                                }
                                if (T) {
                                    R = u.range, T = R.document;
                                    var v;
                                    C = u.blockLimit;
                                    var b, K, _, y, k, N, m = 0,
                                        D = [],
                                        E = g = 0,
                                        f = R.startContainer,
                                        p = u.endPath.elements[0],
                                        I = p.getPosition(f),
                                        O = !(!p.getCommonAncestor(f) || I == CKEDITOR.POSITION_IDENTICAL || I & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED),
                                        f = t(u.dataWrapper, u);
                                    for (l(f, R); m < f.length; m++) {
                                        if (I = f[m], v = I.isLineBreak) {
                                            v = R, y = C;
                                            var S = void 0,
                                                x = void 0;
                                            I.hasBlockSibling ? v = 1 : (S = v.startContainer.getAscendant(c.$block, 1), S && S.is({
                                                div: 1,
                                                p: 1
                                            }) ? (x = S.getPosition(y), x == CKEDITOR.POSITION_IDENTICAL || x == CKEDITOR.POSITION_CONTAINS ? v = 0 : (y = v.splitElement(S), v.moveToPosition(y, CKEDITOR.POSITION_AFTER_START), v = 1)) : v = 0)
                                        }
                                        if (v) E = m > 0;
                                        else {
                                            if (v = R.startPath(), !I.isBlock && r(u.editor, v.block, v.blockLimit) && (_ = s(u.editor)) && (_ = T.createElement(_), _.appendBogus(), R.insertNode(_), CKEDITOR.env.needsBrFiller && (b = _.getBogus()) && b.remove(), R.moveToPosition(_, CKEDITOR.POSITION_BEFORE_END)), (v = R.startPath().block) && !v.equals(K) && ((b = v.getBogus()) && (b.remove(), D.push(v)), K = v), I.firstNotAllowed && (g = 1), g && I.isElement) {
                                                for (v = R.startContainer, y = null; v && !c[v.getName()][I.name];) {
                                                    if (v.equals(C)) {
                                                        v = null;
                                                        break
                                                    }
                                                    y = v, v = v.getParent()
                                                }
                                                if (v) y && (k = R.splitElement(y), u.zombies.push(k), u.zombies.push(y));
                                                else {
                                                    y = C.getName(), N = !m, v = m == f.length - 1, y = n(I.node, y);
                                                    for (var S = [], x = y.length, w = 0, A = void 0, L = 0, P = -1; w < x; w++) A = y[w], " " == A ? (L || N && !w || (S.push(new CKEDITOR.dom.text(" ")), P = S.length), L = 1) : (S.push(A), L = 0);
                                                    v && P == S.length && S.pop(), N = S
                                                }
                                            }
                                            if (N) {
                                                for (; v = N.pop();) R.insertNode(v);
                                                N = 0
                                            } else R.insertNode(I.node);
                                            I.lastNotAllowed && m < f.length - 1 && ((k = O ? p : k) && R.setEndAt(k, CKEDITOR.POSITION_AFTER_START), g = 0), R.collapse()
                                        }
                                    }
                                    1 != f.length ? b = !1 : (b = f[0], b = b.isElement && "false" == b.node.getAttribute("contenteditable")), b && (E = !0, v = f[0].node, R.setStartAt(v, CKEDITOR.POSITION_BEFORE_START), R.setEndAt(v, CKEDITOR.POSITION_AFTER_END)), u.dontMoveCaret = E, u.bogusNeededBlocks = D
                                }
                                b = u.range;
                                var B;
                                for (k = u.bogusNeededBlocks, N = b.createBookmark(); K = u.zombies.pop();) K.getParent() && (_ = b.clone(), _.moveToElementEditStart(K), _.removeEmptyBlocksAtEnd());
                                if (k)
                                    for (; K = k.pop();) CKEDITOR.env.needsBrFiller ? K.appendBogus() : K.append(b.document.createText(" "));
                                for (; K = u.mergeCandidates.pop();) K.mergeSiblings();
                                if (b.moveToBookmark(N), !u.dontMoveCaret) {
                                    for (K = e(b.startContainer) && b.startContainer.getChild(b.startOffset - 1); K && e(K) && !K.is(c.$empty);) {
                                        if (K.isBlockBoundary()) b.moveToPosition(K, CKEDITOR.POSITION_BEFORE_END);
                                        else {
                                            if (o(K) && K.getHtml().match(/(\s|&nbsp;)$/g)) {
                                                B = null;
                                                break
                                            }
                                            B = b.clone(), B.moveToPosition(K, CKEDITOR.POSITION_BEFORE_END)
                                        }
                                        K = K.getLast(i)
                                    }
                                    B && b.moveToRange(B)
                                }
                            }
                        }
                }(),
                I = function() {
                    function e(e) {
                        return e = new CKEDITOR.dom.walker(e), e.guard = function(e, t) {
                            return !t && (e.type == CKEDITOR.NODE_ELEMENT ? e.is(CKEDITOR.dtd.$tableContent) : void 0)
                        }, e.evaluator = function(e) {
                            return e.type == CKEDITOR.NODE_ELEMENT
                        }, e
                    }

                    function t(e, t, n) {
                        return t = e.getDocument().createElement(t), e.append(t, n), t
                    }

                    function n(e) {
                        var t, n = e.count();
                        for (n; n-- > 0;) t = e.getItem(n), CKEDITOR.tools.trim(t.getHtml()) || (t.appendBogus(), CKEDITOR.env.ie && CKEDITOR.env.version < 9 && t.getChildCount() && t.getFirst().remove())
                    }
                    return function(i) {
                        var o = i.startContainer,
                            a = o.getAscendant("table", 1),
                            r = !1;
                        n(a.getElementsByTag("td")), n(a.getElementsByTag("th")), a = i.clone(), a.setStart(o, 0), a = e(a).lastBackward(), a || (a = i.clone(), a.setEndAt(o, CKEDITOR.POSITION_BEFORE_END), a = e(a).lastForward(), r = !0), a || (a = o), a.is("table") ? (i.setStartAt(a, CKEDITOR.POSITION_BEFORE_START), i.collapse(!0), a.remove()) : (a.is({
                            tbody: 1,
                            thead: 1,
                            tfoot: 1
                        }) && (a = t(a, "tr", r)), a.is("tr") && (a = t(a, a.getParent().is("thead") ? "th" : "td", r)), (o = a.getBogus()) && o.remove(), i.moveToPosition(a, r ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
                    }
                }();
            u = {
                detect: function(e, t) {
                    var n = e.range,
                        i = n.clone(),
                        o = n.clone(),
                        a = new CKEDITOR.dom.elementPath(n.startContainer, t),
                        r = new CKEDITOR.dom.elementPath(n.endContainer, t);
                    i.collapse(1), o.collapse(), a.block && i.checkBoundaryOfElement(a.block, CKEDITOR.END) && (n.setStartAfter(a.block), e.prependEolBr = 1), r.block && o.checkBoundaryOfElement(r.block, CKEDITOR.START) && (n.setEndBefore(r.block), e.appendEolBr = 1)
                },
                fix: function(e, t) {
                    var n, i = t.getDocument();
                    e.appendEolBr && (n = this.createEolBr(i), e.fragment.append(n)), e.prependEolBr && (!n || n.getPrevious()) && e.fragment.append(this.createEolBr(i), 1)
                },
                createEolBr: function(e) {
                    return e.createElement("br", {
                        attributes: {
                            "data-cke-eol": 1
                        }
                    })
                }
            }, d = {
                exclude: function(e) {
                    var t = e.range.getBoundaryNodes(),
                        n = t.startNode;
                    (t = t.endNode) && p(t) && (!n || !n.equals(t)) && e.range.setEndBefore(t)
                }
            }, f = {
                rebuild: function(e, t) {
                    var n, i = e.range,
                        o = i.getCommonAncestor(),
                        a = new CKEDITOR.dom.elementPath(o, t),
                        r = new CKEDITOR.dom.elementPath(i.startContainer, t),
                        i = new CKEDITOR.dom.elementPath(i.endContainer, t);
                    if (o.type == CKEDITOR.NODE_TEXT && (o = o.getParent()), a.blockLimit.is({
                            tr: 1,
                            table: 1
                        })) {
                        var s = a.contains("table").getParent();
                        n = function(e) {
                            return !e.equals(s)
                        }
                    } else if (a.block && a.block.is(CKEDITOR.dtd.$listItem) && (r = r.contains(CKEDITOR.dtd.$list), i = i.contains(CKEDITOR.dtd.$list), !r.equals(i))) {
                        var l = a.contains(CKEDITOR.dtd.$list).getParent();
                        n = function(e) {
                            return !e.equals(l)
                        }
                    }
                    n || (n = function(e) {
                        return !e.equals(a.block) && !e.equals(a.blockLimit)
                    }), this.rebuildFragment(e, t, o, n)
                },
                rebuildFragment: function(e, t, n, i) {
                    for (var o; n && !n.equals(t) && i(n);) o = n.clone(0, 1), e.fragment.appendTo(o), e.fragment = o, n = n.getParent()
                }
            }, h = {
                shrink: function(e) {
                    var e = e.range,
                        t = e.startContainer,
                        n = e.endContainer,
                        i = e.startOffset,
                        o = e.endOffset;
                    t.type == CKEDITOR.NODE_ELEMENT && t.equals(n) && t.is("tr") && ++i == o && e.shrink(CKEDITOR.SHRINK_TEXT)
                }
            };
            var O = function() {
                function e(e, t) {
                    var n = e.getParent();
                    n.is(CKEDITOR.dtd.$inline) && e[t ? "insertBefore" : "insertAfter"](n)
                }

                function t(t, n, i) {
                    e(n), e(i, 1);
                    for (var o; o = i.getNext();) o.insertAfter(n), n = o;
                    g(t) && t.remove()
                }

                function n(e, t) {
                    var n = new CKEDITOR.dom.range(e);
                    return n.setStartAfter(t.startNode), n.setEndBefore(t.endNode), n
                }
                return {
                    list: {
                        detectMerge: function(e, t) {
                            var i = n(t, e.bookmark),
                                o = i.startPath(),
                                a = i.endPath(),
                                r = o.contains(CKEDITOR.dtd.$list),
                                s = a.contains(CKEDITOR.dtd.$list);
                            e.mergeList = r && s && r.getParent().equals(s.getParent()) && !r.equals(s), e.mergeListItems = o.block && a.block && o.block.is(CKEDITOR.dtd.$listItem) && a.block.is(CKEDITOR.dtd.$listItem), (e.mergeList || e.mergeListItems) && (i = i.clone(), i.setStartBefore(e.bookmark.startNode), i.setEndAfter(e.bookmark.endNode), e.mergeListBookmark = i.createBookmark())
                        },
                        merge: function(e, n) {
                            if (e.mergeListBookmark) {
                                var i = e.mergeListBookmark.startNode,
                                    o = e.mergeListBookmark.endNode,
                                    a = new CKEDITOR.dom.elementPath(i, n),
                                    r = new CKEDITOR.dom.elementPath(o, n);
                                if (e.mergeList) {
                                    var s = a.contains(CKEDITOR.dtd.$list),
                                        l = r.contains(CKEDITOR.dtd.$list);
                                    s.equals(l) || (l.moveChildren(s), l.remove())
                                }
                                e.mergeListItems && (a = a.contains(CKEDITOR.dtd.$listItem), r = r.contains(CKEDITOR.dtd.$listItem), a.equals(r) || t(r, i, o)), i.remove(), o.remove()
                            }
                        }
                    },
                    block: {
                        detectMerge: function(e, t) {
                            if (!e.tableContentsRanges && !e.mergeListBookmark) {
                                var n = new CKEDITOR.dom.range(t);
                                n.setStartBefore(e.bookmark.startNode), n.setEndAfter(e.bookmark.endNode), e.mergeBlockBookmark = n.createBookmark()
                            }
                        },
                        merge: function(e, n) {
                            if (e.mergeBlockBookmark && !e.purgeTableBookmark) {
                                var i = e.mergeBlockBookmark.startNode,
                                    o = e.mergeBlockBookmark.endNode,
                                    a = new CKEDITOR.dom.elementPath(i, n),
                                    r = new CKEDITOR.dom.elementPath(o, n),
                                    a = a.block,
                                    r = r.block;
                                a && r && !a.equals(r) && t(r, i, o), i.remove(), o.remove()
                            }
                        }
                    },
                    table: function() {
                        function e(e) {
                            var n, o = [],
                                a = new CKEDITOR.dom.walker(e),
                                r = e.startPath().contains(i),
                                s = e.endPath().contains(i),
                                l = {};
                            return a.guard = function(a, c) {
                                if (a.type == CKEDITOR.NODE_ELEMENT) {
                                    var u = "visited_" + (c ? "out" : "in");
                                    if (a.getCustomData(u)) return;
                                    CKEDITOR.dom.element.setMarker(l, a, u, 1)
                                }
                                c && r && a.equals(r) ? (n = e.clone(), n.setEndAt(r, CKEDITOR.POSITION_BEFORE_END), o.push(n)) : !c && s && a.equals(s) ? (n = e.clone(), n.setStartAt(s, CKEDITOR.POSITION_AFTER_START), o.push(n)) : c || a.type != CKEDITOR.NODE_ELEMENT || !a.is(i) || r && !t(a, r) || s && !t(a, s) || (n = e.clone(), n.selectNodeContents(a), o.push(n))
                            }, a.lastForward(), CKEDITOR.dom.element.clearAllMarkers(l), o
                        }

                        function t(e, t) {
                            var n = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED,
                                i = e.getPosition(t);
                            return i !== CKEDITOR.POSITION_IDENTICAL && 0 === (i & n)
                        }
                        var i = {
                            td: 1,
                            th: 1,
                            caption: 1
                        };
                        return {
                            detectPurge: function(e) {
                                var t = e.range,
                                    n = t.clone();
                                n.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                                var n = new CKEDITOR.dom.walker(n),
                                    o = 0;
                                if (n.evaluator = function(e) {
                                        e.type == CKEDITOR.NODE_ELEMENT && e.is(i) && ++o
                                    }, n.checkForward(), o > 1) {
                                    var n = t.startPath().contains("table"),
                                        a = t.endPath().contains("table");
                                    n && a && t.checkBoundaryOfElement(n, CKEDITOR.START) && t.checkBoundaryOfElement(a, CKEDITOR.END) && (t = e.range.clone(), t.setStartBefore(n), t.setEndAfter(a), e.purgeTableBookmark = t.createBookmark())
                                }
                            },
                            detectRanges: function(o, a) {
                                var r, s, l = n(a, o.bookmark),
                                    c = l.clone(),
                                    u = l.getCommonAncestor();
                                u.is(CKEDITOR.dtd.$tableContent) && !u.is(i) && (u = u.getAscendant("table", !0)), s = u, u = new CKEDITOR.dom.elementPath(l.startContainer, s), s = new CKEDITOR.dom.elementPath(l.endContainer, s), u = u.contains("table"), s = s.contains("table"), (u || s) && (u && s && t(u, s) ? (o.tableSurroundingRange = c, c.setStartAt(u, CKEDITOR.POSITION_AFTER_END), c.setEndAt(s, CKEDITOR.POSITION_BEFORE_START), c = l.clone(), c.setEndAt(u, CKEDITOR.POSITION_AFTER_END), r = l.clone(), r.setStartAt(s, CKEDITOR.POSITION_BEFORE_START), r = e(c).concat(e(r))) : u ? s || (o.tableSurroundingRange = c, c.setStartAt(u, CKEDITOR.POSITION_AFTER_END), l.setEndAt(u, CKEDITOR.POSITION_AFTER_END)) : (o.tableSurroundingRange = c, c.setEndAt(s, CKEDITOR.POSITION_BEFORE_START), l.setStartAt(s, CKEDITOR.POSITION_AFTER_START)), o.tableContentsRanges = r ? r : e(l))
                            },
                            deleteRanges: function(e) {
                                for (var t; t = e.tableContentsRanges.pop();) t.extractContents(), g(t.startContainer) && t.startContainer.appendBogus();
                                e.tableSurroundingRange && e.tableSurroundingRange.extractContents()
                            },
                            purge: function(e) {
                                if (e.purgeTableBookmark) {
                                    var t = e.doc,
                                        n = e.range.clone(),
                                        t = t.createElement("p");
                                    t.insertBefore(e.purgeTableBookmark.startNode), n.moveToBookmark(e.purgeTableBookmark), n.deleteContents(), e.range.moveToPosition(t, CKEDITOR.POSITION_AFTER_START)
                                }
                            }
                        }
                    }(),
                    detectExtractMerge: function(e) {
                        return !(e.range.startPath().contains(CKEDITOR.dtd.$listItem) && e.range.endPath().contains(CKEDITOR.dtd.$listItem))
                    },
                    fixUneditableRangePosition: function(e) {
                        e.startContainer.getDtd()["#"] || e.moveToClosestEditablePosition(null, !0)
                    },
                    autoParagraph: function(e, t) {
                        var n, i = t.startPath();
                        r(e, i.block, i.blockLimit) && (n = s(e)) && (n = t.document.createElement(n), n.appendBogus(), t.insertNode(n), t.moveToPosition(n, CKEDITOR.POSITION_AFTER_START))
                    }
                }
            }()
        }(), function() {
            function e() {
                var e, t = this._.fakeSelection;
                t && (e = this.getSelection(1), e && e.isHidden() || (t.reset(), t = 0)), (t || (t = e || this.getSelection(1), t && t.getType() != CKEDITOR.SELECTION_NONE)) && (this.fire("selectionCheck", t), e = this.elementPath(), e.compare(this._.selectionPreviousPath) || (CKEDITOR.env.webkit && (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = e, this.fire("selectionChange", {
                    selection: t,
                    path: e
                })))
            }

            function t() {
                E = !0, f || (n.call(this), f = CKEDITOR.tools.setTimeout(n, 200, this))
            }

            function n() {
                f = null, E && (CKEDITOR.tools.setTimeout(e, 0, this), E = !1)
            }

            function i(e) {
                return !(!m(e) && (e.type != CKEDITOR.NODE_ELEMENT || e.is(CKEDITOR.dtd.$empty)))
            }

            function o(e) {
                function t(t, n) {
                    return !(!t || t.type == CKEDITOR.NODE_TEXT) && e.clone()["moveToElementEdit" + (n ? "End" : "Start")](t)
                }
                if (!(e.root instanceof CKEDITOR.editable)) return !1;
                var n = e.startContainer,
                    o = e.getPreviousNode(i, null, n),
                    a = e.getNextNode(i, null, n);
                return !(!t(o) && !t(a, 1) && (o || a || n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary() && n.getBogus()))
            }

            function a(e) {
                return e.getCustomData("cke-fillingChar")
            }

            function r(e, t) {
                var n = e && e.removeCustomData("cke-fillingChar");
                if (n) {
                    if (t !== !1) {
                        var i, o = e.getDocument().getSelection().getNative(),
                            a = o && "None" != o.type && o.getRangeAt(0);
                        n.getLength() > 1 && a && a.intersectsNode(n.$) && (i = l(o), a = o.focusNode == n.$ && o.focusOffset > 0, o.anchorNode == n.$ && o.anchorOffset > 0 && i[0].offset--, a && i[1].offset--)
                    }
                    n.setText(s(n.getText())), i && c(e.getDocument().$, i)
                }
            }

            function s(e) {
                return e.replace(/\u200B( )?/g, function(e) {
                    return e[1] ? " " : ""
                })
            }

            function l(e) {
                return [{
                    node: e.anchorNode,
                    offset: e.anchorOffset
                }, {
                    node: e.focusNode,
                    offset: e.focusOffset
                }]
            }

            function c(e, t) {
                var n = e.getSelection(),
                    i = e.createRange();
                i.setStart(t[0].node, t[0].offset), i.collapse(!0), n.removeAllRanges(), n.addRange(i), n.extend(t[1].node, t[1].offset)
            }

            function u(e) {
                var t = CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="' + (CKEDITOR.env.ie ? "display:none" : "position:fixed;top:0;left:-1000px") + '">&nbsp;</div>', e.document);
                e.fire("lockSnapshot"), e.editable().append(t);
                var n = e.getSelection(1),
                    i = e.createRange(),
                    o = n.root.on("selectionchange", function(e) {
                        e.cancel()
                    }, null, null, 0);
                i.setStartAt(t, CKEDITOR.POSITION_AFTER_START), i.setEndAt(t, CKEDITOR.POSITION_BEFORE_END), n.selectRanges([i]), o.removeListener(), e.fire("unlockSnapshot"), e._.hiddenSelectionContainer = t
            }

            function d(e) {
                var t = {
                    37: 1,
                    39: 1,
                    8: 1,
                    46: 1
                };
                return function(n) {
                    var i = n.data.getKeystroke();
                    if (t[i]) {
                        var o = e.getSelection().getRanges(),
                            a = o[0];
                        1 == o.length && a.collapsed && (i = a[i < 38 ? "getPreviousEditableNode" : "getNextEditableNode"]()) && i.type == CKEDITOR.NODE_ELEMENT && "false" == i.getAttribute("contenteditable") && (e.getSelection().fake(i), n.data.preventDefault(), n.cancel())
                    }
                }
            }

            function h(e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    if (n.getCommonAncestor().isReadOnly() && e.splice(t, 1), !n.collapsed) {
                        if (n.startContainer.isReadOnly())
                            for (var i, o = n.startContainer; o && !((i = o.type == CKEDITOR.NODE_ELEMENT) && o.is("body") || !o.isReadOnly());) i && "false" == o.getAttribute("contentEditable") && n.setStartAfter(o), o = o.getParent();
                        o = n.startContainer, i = n.endContainer;
                        var a = n.startOffset,
                            r = n.endOffset,
                            s = n.clone();
                        o && o.type == CKEDITOR.NODE_TEXT && (a >= o.getLength() ? s.setStartAfter(o) : s.setStartBefore(o)), i && i.type == CKEDITOR.NODE_TEXT && (r ? s.setEndAfter(i) : s.setEndBefore(i)), o = new CKEDITOR.dom.walker(s), o.evaluator = function(i) {
                            if (i.type == CKEDITOR.NODE_ELEMENT && i.isReadOnly()) {
                                var o = n.clone();
                                return n.setEndBefore(i), n.collapsed && e.splice(t--, 1), i.getPosition(s.endContainer) & CKEDITOR.POSITION_CONTAINS || (o.setStartAfter(i), o.collapsed || e.splice(t + 1, 0, o)), !0
                            }
                            return !1
                        }, o.next()
                    }
                }
                return e
            }
            var f, E, m = CKEDITOR.dom.walker.invisible(1),
                g = function() {
                    function e(e) {
                        return function(t) {
                            var n = t.editor.createRange();
                            return n.moveToClosestEditablePosition(t.selected, e) && t.editor.getSelection().selectRanges([n]), !1
                        }
                    }

                    function t(e) {
                        return function(t) {
                            var n, i = t.editor,
                                o = i.createRange();
                            return (n = o.moveToClosestEditablePosition(t.selected, e)) || (n = o.moveToClosestEditablePosition(t.selected, !e)), n && i.getSelection().selectRanges([o]), i.fire("saveSnapshot"), t.selected.remove(), n || (o.moveToElementEditablePosition(i.editable()), i.getSelection().selectRanges([o])), i.fire("saveSnapshot"), !1
                        }
                    }
                    var n = e(),
                        i = e(1);
                    return {
                        37: n,
                        38: n,
                        39: i,
                        40: i,
                        8: t(),
                        46: t(1)
                    }
                }();
            CKEDITOR.on("instanceCreated", function(n) {
                function i() {
                    var e = o.getSelection();
                    e && e.removeAllRanges()
                }
                var o = n.editor;
                o.on("contentDom", function() {
                    function n() {
                        s = new CKEDITOR.dom.selection(o.getSelection()), s.lock()
                    }

                    function i() {
                        c.removeListener("mouseup", i), f.removeListener("mouseup", i);
                        var e = CKEDITOR.document.$.selection,
                            t = e.createRange();
                        "None" != e.type && t.parentElement().ownerDocument == l.$ && t.select()
                    }
                    var a, s, l = o.document,
                        c = CKEDITOR.document,
                        u = o.editable(),
                        h = l.getBody(),
                        f = l.getDocumentElement(),
                        E = u.isInline();
                    if (CKEDITOR.env.gecko && u.attachListener(u, "focus", function(e) {
                            e.removeListener(), 0 !== a && (e = o.getSelection().getNative()) && e.isCollapsed && e.anchorNode == u.$ && (e = o.createRange(), e.moveToElementEditStart(u), e.select())
                        }, null, null, -2), u.attachListener(u, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                            a && CKEDITOR.env.webkit && (a = o._.previousActive && o._.previousActive.equals(l.getActive())), o.unlockSelection(a), a = 0
                        }, null, null, -1), u.attachListener(u, "mousedown", function() {
                            a = 0
                        }), (CKEDITOR.env.ie || E) && (p ? u.attachListener(u, "beforedeactivate", n, null, null, -1) : u.attachListener(o, "selectionCheck", n, null, null, -1), u.attachListener(u, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function() {
                            o.lockSelection(s), a = 1
                        }, null, null, -1), u.attachListener(u, "mousedown", function() {
                            a = 0
                        })), CKEDITOR.env.ie && !E) {
                        var m;
                        u.attachListener(u, "mousedown", function(e) {
                            2 == e.data.$.button && (e = o.document.getSelection(), e && e.getType() != CKEDITOR.SELECTION_NONE || (m = o.window.getScrollPosition()))
                        }), u.attachListener(u, "mouseup", function(e) {
                            2 == e.data.$.button && m && (o.document.$.documentElement.scrollLeft = m.x, o.document.$.documentElement.scrollTop = m.y), m = null
                        }), "BackCompat" != l.$.compatMode && ((CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && f.on("mousedown", function(e) {
                            function t(e) {
                                if (e = e.data.$, i) {
                                    var t = h.$.createTextRange();
                                    try {
                                        t.moveToPoint(e.clientX, e.clientY)
                                    } catch (e) {}
                                    i.setEndPoint(o.compareEndPoints("StartToStart", t) < 0 ? "EndToEnd" : "StartToStart", t), i.select()
                                }
                            }

                            function n() {
                                f.removeListener("mousemove", t), c.removeListener("mouseup", n), f.removeListener("mouseup", n), i.select()
                            }
                            if (e = e.data, e.getTarget().is("html") && e.$.y < f.$.clientHeight && e.$.x < f.$.clientWidth) {
                                var i = h.$.createTextRange();
                                try {
                                    i.moveToPoint(e.$.clientX, e.$.clientY)
                                } catch (e) {}
                                var o = i.duplicate();
                                f.on("mousemove", t), c.on("mouseup", n), f.on("mouseup", n)
                            }
                        }), CKEDITOR.env.version > 7 && CKEDITOR.env.version < 11 && f.on("mousedown", function(e) {
                            e.data.getTarget().is("html") && (c.on("mouseup", i), f.on("mouseup", i))
                        }))
                    }
                    if (u.attachListener(u, "selectionchange", e, o),
                        u.attachListener(l, "selectionchange", function() {
                            document.activeElement === u.$ && e.apply(this, arguments)
                        }, o), u.attachListener(u, "keyup", t, o), u.attachListener(u, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                            o.forceNextSelectionCheck(), o.selectionChange(1)
                        }), E && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
                        var g;
                        u.attachListener(u, "mousedown", function() {
                            g = 1
                        }), u.attachListener(l.getDocumentElement(), "mouseup", function() {
                            g && t.call(o), g = 0
                        })
                    } else u.attachListener(CKEDITOR.env.ie ? u : l.getDocumentElement(), "mouseup", t, o);
                    CKEDITOR.env.webkit && u.attachListener(l, "keydown", function(e) {
                        switch (e.data.getKey()) {
                            case 13:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 39:
                            case 8:
                            case 45:
                            case 46:
                                r(u)
                        }
                    }, null, null, -1), u.attachListener(u, "keydown", d(o), null, null, -1)
                }), o.on("setData", function() {
                    o.unlockSelection(), CKEDITOR.env.webkit && i()
                }), o.on("contentDomUnload", function() {
                    o.unlockSelection()
                }), CKEDITOR.env.ie9Compat && o.on("beforeDestroy", i, null, null, 9), o.on("dataReady", function() {
                    delete o._.fakeSelection, delete o._.hiddenSelectionContainer, o.selectionChange(1)
                }), o.on("loadSnapshot", function() {
                    var e = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),
                        t = o.editable().getLast(e);
                    t && t.hasAttribute("data-cke-hidden-sel") && (t.remove(), CKEDITOR.env.gecko && (e = o.editable().getFirst(e)) && e.is("br") && e.getAttribute("_moz_editor_bogus_node") && e.remove())
                }, null, null, 100), o.on("key", function(e) {
                    if ("wysiwyg" == o.mode) {
                        var t = o.getSelection();
                        if (t.isFake) {
                            var n = g[e.data.keyCode];
                            if (n) return n({
                                editor: o,
                                selected: t.getSelectedElement(),
                                selection: t,
                                keyEvent: e
                            })
                        }
                    }
                })
            }), CKEDITOR.on("instanceReady", function(e) {
                function t() {
                    var e = u.editable();
                    if (e && (e = a(e))) {
                        var t = u.document.$.getSelection();
                        "None" == t.type || t.anchorNode != e.$ && t.focusNode != e.$ || (o = l(t)), i = e.getText(), e.setText(s(i))
                    }
                }

                function n() {
                    var e = u.editable();
                    e && (e = a(e)) && (e.setText(i), o && (c(u.document.$, o), o = null))
                }
                var i, o, u = e.editor;
                CKEDITOR.env.webkit && (u.on("selectionChange", function() {
                    var e = u.editable(),
                        t = a(e);
                    t && (t.getCustomData("ready") ? r(e) : t.setCustomData("ready", 1))
                }, null, null, -1), u.on("beforeSetMode", function() {
                    r(u.editable())
                }, null, null, -1), u.on("beforeUndoImage", t), u.on("afterUndoImage", n), u.on("beforeGetData", t, null, null, 0), u.on("getData", n))
            }), CKEDITOR.editor.prototype.selectionChange = function(n) {
                (n ? e : t).call(this)
            }, CKEDITOR.editor.prototype.getSelection = function(e) {
                return !this._.savedSelection && !this._.fakeSelection || e ? (e = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(e) : null : this._.savedSelection || this._.fakeSelection
            }, CKEDITOR.editor.prototype.lockSelection = function(e) {
                return e = e || this.getSelection(1), e.getType() != CKEDITOR.SELECTION_NONE && (!e.isLocked && e.lock(), this._.savedSelection = e, !0)
            }, CKEDITOR.editor.prototype.unlockSelection = function(e) {
                var t = this._.savedSelection;
                return !!t && (t.unlock(e), delete this._.savedSelection, !0)
            }, CKEDITOR.editor.prototype.forceNextSelectionCheck = function() {
                delete this._.selectionPreviousPath
            }, CKEDITOR.dom.document.prototype.getSelection = function() {
                return new CKEDITOR.dom.selection(this)
            }, CKEDITOR.dom.range.prototype.select = function() {
                var e = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
                return e.selectRanges([this]), e
            }, CKEDITOR.SELECTION_NONE = 1, CKEDITOR.SELECTION_TEXT = 2, CKEDITOR.SELECTION_ELEMENT = 3;
            var p = "function" != typeof window.getSelection,
                T = 1;
            CKEDITOR.dom.selection = function(e) {
                if (e instanceof CKEDITOR.dom.selection) var t = e,
                    e = e.root;
                var n = e instanceof CKEDITOR.dom.element;
                if (this.rev = t ? t.rev : T++, this.document = e instanceof CKEDITOR.dom.document ? e : e.getDocument(), this.root = n ? e : this.document.getBody(), this.isLocked = 0, this._ = {
                        cache: {}
                    }, t) return CKEDITOR.tools.extend(this._.cache, t._.cache), this.isFake = t.isFake, this.isLocked = t.isLocked, this;
                var i, o, e = this.getNative();
                if (e)
                    if (e.getRangeAt) i = (o = e.rangeCount && e.getRangeAt(0)) && new CKEDITOR.dom.node(o.commonAncestorContainer);
                    else {
                        try {
                            o = e.createRange()
                        } catch (e) {}
                        i = o && CKEDITOR.dom.element.get(o.item && o.item(0) || o.parentElement())
                    } return (!i || i.type != CKEDITOR.NODE_ELEMENT && i.type != CKEDITOR.NODE_TEXT || !this.root.equals(i) && !this.root.contains(i)) && (this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList), this
            };
            var C = {
                img: 1,
                hr: 1,
                li: 1,
                table: 1,
                tr: 1,
                td: 1,
                th: 1,
                embed: 1,
                object: 1,
                ol: 1,
                ul: 1,
                a: 1,
                input: 1,
                form: 1,
                select: 1,
                textarea: 1,
                button: 1,
                fieldset: 1,
                thead: 1,
                tfoot: 1
            };
            CKEDITOR.dom.selection.prototype = {
                getNative: function() {
                    return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = p ? this.document.$.selection : this.document.getWindow().$.getSelection()
                },
                getType: p ? function() {
                    var e = this._.cache;
                    if (e.type) return e.type;
                    var t = CKEDITOR.SELECTION_NONE;
                    try {
                        var n = this.getNative(),
                            i = n.type;
                        "Text" == i && (t = CKEDITOR.SELECTION_TEXT), "Control" == i && (t = CKEDITOR.SELECTION_ELEMENT), n.createRange().parentElement() && (t = CKEDITOR.SELECTION_TEXT)
                    } catch (e) {}
                    return e.type = t
                } : function() {
                    var e = this._.cache;
                    if (e.type) return e.type;
                    var t = CKEDITOR.SELECTION_TEXT,
                        n = this.getNative();
                    if (n && n.rangeCount) {
                        if (1 == n.rangeCount) {
                            var n = n.getRangeAt(0),
                                i = n.startContainer;
                            i == n.endContainer && 1 == i.nodeType && n.endOffset - n.startOffset == 1 && C[i.childNodes[n.startOffset].nodeName.toLowerCase()] && (t = CKEDITOR.SELECTION_ELEMENT)
                        }
                    } else t = CKEDITOR.SELECTION_NONE;
                    return e.type = t
                },
                getRanges: function() {
                    var e = p ? function() {
                        function e(e) {
                            return new CKEDITOR.dom.node(e).getIndex()
                        }
                        var t = function(t, n) {
                            t = t.duplicate(), t.collapse(n);
                            var i = t.parentElement();
                            if (!i.hasChildNodes()) return {
                                container: i,
                                offset: 0
                            };
                            for (var o, a, r, s, l = i.children, c = t.duplicate(), u = 0, d = l.length - 1, h = -1; u <= d;)
                                if (h = Math.floor((u + d) / 2), o = l[h], c.moveToElementText(o), r = c.compareEndPoints("StartToStart", t), r > 0) d = h - 1;
                                else {
                                    if (!(r < 0)) return {
                                        container: i,
                                        offset: e(o)
                                    };
                                    u = h + 1
                                } if (h == -1 || h == l.length - 1 && r < 0) {
                                if (c.moveToElementText(i), c.setEndPoint("StartToStart", t), c = c.text.replace(/(\r\n|\r)/g, "\n").length, l = i.childNodes, !c) return o = l[l.length - 1], o.nodeType != CKEDITOR.NODE_TEXT ? {
                                    container: i,
                                    offset: l.length
                                } : {
                                    container: o,
                                    offset: o.nodeValue.length
                                };
                                for (i = l.length; c > 0 && i > 0;) a = l[--i], a.nodeType == CKEDITOR.NODE_TEXT && (s = a, c -= a.nodeValue.length);
                                return {
                                    container: s,
                                    offset: -c
                                }
                            }
                            if (c.collapse(r > 0), c.setEndPoint(r > 0 ? "StartToStart" : "EndToStart", t), c = c.text.replace(/(\r\n|\r)/g, "\n").length, !c) return {
                                container: i,
                                offset: e(o) + (r > 0 ? 0 : 1)
                            };
                            for (; c > 0;) try {
                                a = o[r > 0 ? "previousSibling" : "nextSibling"], a.nodeType == CKEDITOR.NODE_TEXT && (c -= a.nodeValue.length, s = a), o = a
                            } catch (t) {
                                return {
                                    container: i,
                                    offset: e(o)
                                }
                            }
                            return {
                                container: s,
                                offset: r > 0 ? -c : s.nodeValue.length + c
                            }
                        };
                        return function() {
                            var e = this.getNative(),
                                n = e && e.createRange(),
                                i = this.getType();
                            if (!e) return [];
                            if (i == CKEDITOR.SELECTION_TEXT) return e = new CKEDITOR.dom.range(this.root), i = t(n, !0), e.setStart(new CKEDITOR.dom.node(i.container), i.offset), i = t(n), e.setEnd(new CKEDITOR.dom.node(i.container), i.offset), e.endContainer.getPosition(e.startContainer) & CKEDITOR.POSITION_PRECEDING && e.endOffset <= e.startContainer.getIndex() && e.collapse(), [e];
                            if (i == CKEDITOR.SELECTION_ELEMENT) {
                                for (var i = [], o = 0; o < n.length; o++) {
                                    for (var a = n.item(o), r = a.parentNode, s = 0, e = new CKEDITOR.dom.range(this.root); s < r.childNodes.length && r.childNodes[s] != a; s++);
                                    e.setStart(new CKEDITOR.dom.node(r), s), e.setEnd(new CKEDITOR.dom.node(r), s + 1), i.push(e)
                                }
                                return i
                            }
                            return []
                        }
                    }() : function() {
                        var e, t = [],
                            n = this.getNative();
                        if (!n) return t;
                        for (var i = 0; i < n.rangeCount; i++) {
                            var o = n.getRangeAt(i);
                            e = new CKEDITOR.dom.range(this.root), e.setStart(new CKEDITOR.dom.node(o.startContainer), o.startOffset), e.setEnd(new CKEDITOR.dom.node(o.endContainer), o.endOffset), t.push(e)
                        }
                        return t
                    };
                    return function(t) {
                        var n = this._.cache,
                            i = n.ranges;
                        return i || (n.ranges = i = new CKEDITOR.dom.rangeList(e.call(this))), t ? h(new CKEDITOR.dom.rangeList(i.slice())) : i
                    }
                }(),
                getStartElement: function() {
                    var e = this._.cache;
                    if (void 0 !== e.startElement) return e.startElement;
                    var t;
                    switch (this.getType()) {
                        case CKEDITOR.SELECTION_ELEMENT:
                            return this.getSelectedElement();
                        case CKEDITOR.SELECTION_TEXT:
                            var n = this.getRanges()[0];
                            if (n) {
                                if (n.collapsed) t = n.startContainer, t.type != CKEDITOR.NODE_ELEMENT && (t = t.getParent());
                                else {
                                    for (n.optimize(); t = n.startContainer, n.startOffset == (t.getChildCount ? t.getChildCount() : t.getLength()) && !t.isBlockBoundary();) n.setStartAfter(t);
                                    if (t = n.startContainer, t.type != CKEDITOR.NODE_ELEMENT) return t.getParent();
                                    if (t = t.getChild(n.startOffset), t && t.type == CKEDITOR.NODE_ELEMENT)
                                        for (n = t.getFirst(); n && n.type == CKEDITOR.NODE_ELEMENT;) t = n, n = n.getFirst();
                                    else t = n.startContainer
                                }
                                t = t.$
                            }
                    }
                    return e.startElement = t ? new CKEDITOR.dom.element(t) : null
                },
                getSelectedElement: function() {
                    var e = this._.cache;
                    if (void 0 !== e.selectedElement) return e.selectedElement;
                    var t = this,
                        n = CKEDITOR.tools.tryThese(function() {
                            return t.getNative().createRange().item(0)
                        }, function() {
                            for (var e, n, i = t.getRanges()[0].clone(), o = 2; o && (!(e = i.getEnclosedNode()) || e.type != CKEDITOR.NODE_ELEMENT || !C[e.getName()] || !(n = e)); o--) i.shrink(CKEDITOR.SHRINK_ELEMENT);
                            return n && n.$
                        });
                    return e.selectedElement = n ? new CKEDITOR.dom.element(n) : null
                },
                getSelectedText: function() {
                    var e = this._.cache;
                    if (void 0 !== e.selectedText) return e.selectedText;
                    var t = this.getNative(),
                        t = p ? "Control" == t.type ? "" : t.createRange().text : t.toString();
                    return e.selectedText = t
                },
                lock: function() {
                    this.getRanges(), this.getStartElement(), this.getSelectedElement(), this.getSelectedText(), this._.cache.nativeSel = null, this.isLocked = 1
                },
                unlock: function(e) {
                    if (this.isLocked) {
                        if (e) var t = this.getSelectedElement(),
                            n = !t && this.getRanges(),
                            i = this.isFake;
                        this.isLocked = 0, this.reset(), e && (e = t || n[0] && n[0].getCommonAncestor()) && e.getAscendant("body", 1) && (i ? this.fake(t) : t ? this.selectElement(t) : this.selectRanges(n))
                    }
                },
                reset: function() {
                    this._.cache = {}, this.isFake = 0;
                    var e = this.root.editor;
                    if (e && e._.fakeSelection && this.rev == e._.fakeSelection.rev) {
                        delete e._.fakeSelection;
                        var t = e._.hiddenSelectionContainer;
                        if (t) {
                            var n = e.checkDirty();
                            e.fire("lockSnapshot"), t.remove(), e.fire("unlockSnapshot"), !n && e.resetDirty()
                        }
                        delete e._.hiddenSelectionContainer
                    }
                    this.rev = T++
                },
                selectElement: function(e) {
                    var t = new CKEDITOR.dom.range(this.root);
                    t.setStartBefore(e), t.setEndAfter(e), this.selectRanges([t])
                },
                selectRanges: function(e) {
                    var t = this.root.editor,
                        t = t && t._.hiddenSelectionContainer;
                    if (this.reset(), t)
                        for (var n, t = this.root, i = 0; i < e.length; ++i) n = e[i], n.endContainer.equals(t) && (n.endOffset = Math.min(n.endOffset, t.getChildCount()));
                    if (e.length)
                        if (this.isLocked) CKEDITOR.document.getActive(), this.unlock(), this.selectRanges(e), this.lock();
                        else {
                            var a, s, l;
                            if (1 == e.length && !(l = e[0]).collapsed && (a = l.getEnclosedNode()) && a.type == CKEDITOR.NODE_ELEMENT && (l = l.clone(), l.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (s = l.getEnclosedNode()) && s.type == CKEDITOR.NODE_ELEMENT && (a = s), "false" == a.getAttribute("contenteditable")) || (a = void 0), a) this.fake(a);
                            else {
                                if (p) {
                                    l = CKEDITOR.dom.walker.whitespaces(!0), s = /\ufeff|\u00a0/, t = {
                                        table: 1,
                                        tbody: 1,
                                        tr: 1
                                    }, e.length > 1 && (a = e[e.length - 1], e[0].setEnd(a.endContainer, a.endOffset)), a = e[0];
                                    var c, u, d, e = a.collapsed;
                                    if ((n = a.getEnclosedNode()) && n.type == CKEDITOR.NODE_ELEMENT && n.getName() in C && (!n.is("a") || !n.getText())) try {
                                        return d = n.$.createControlRange(), d.addElement(n.$), void d.select()
                                    } catch (e) {}(a.startContainer.type == CKEDITOR.NODE_ELEMENT && a.startContainer.getName() in t || a.endContainer.type == CKEDITOR.NODE_ELEMENT && a.endContainer.getName() in t) && (a.shrink(CKEDITOR.NODE_ELEMENT, !0), e = a.collapsed), d = a.createBookmark();
                                    var h, t = d.startNode;
                                    e || (h = d.endNode), d = a.document.$.body.createTextRange(), d.moveToElementText(t.$), d.moveStart("character", 1), h ? (s = a.document.$.body.createTextRange(), s.moveToElementText(h.$), d.setEndPoint("EndToEnd", s), d.moveEnd("character", -1)) : (c = t.getNext(l), u = t.hasAscendant("pre"), c = !(c && c.getText && c.getText().match(s)) && (u || !t.hasPrevious() || t.getPrevious().is && t.getPrevious().is("br")), u = a.document.createElement("span"), u.setHtml("&#65279;"), u.insertBefore(t), c && a.document.createText("\ufeff").insertBefore(t)), a.setStartBefore(t), t.remove(), e ? (c ? (d.moveStart("character", -1), d.select(), a.document.$.selection.clear()) : d.select(), a.moveToPosition(u, CKEDITOR.POSITION_BEFORE_START), u.remove()) : (a.setEndBefore(h), h.remove(), d.select())
                                } else {
                                    if (h = this.getNative(), !h) return;
                                    for (this.removeAllRanges(), d = 0; d < e.length; d++)
                                        if (d < e.length - 1 && (c = e[d], u = e[d + 1], s = c.clone(), s.setStart(c.endContainer, c.endOffset), s.setEnd(u.startContainer, u.startOffset), !s.collapsed && (s.shrink(CKEDITOR.NODE_ELEMENT, !0), a = s.getCommonAncestor(), s = s.getEnclosedNode(), a.isReadOnly() || s && s.isReadOnly()))) u.setStart(c.startContainer, c.startOffset), e.splice(d--, 1);
                                        else {
                                            a = e[d], u = this.document.$.createRange(), a.collapsed && CKEDITOR.env.webkit && o(a) && (c = this.root, r(c, !1), s = c.getDocument().createText("​"), c.setCustomData("cke-fillingChar", s), a.insertNode(s), (c = s.getNext()) && !s.getPrevious() && c.type == CKEDITOR.NODE_ELEMENT && "br" == c.getName() ? (r(this.root), a.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START)) : a.moveToPosition(s, CKEDITOR.POSITION_AFTER_END)), u.setStart(a.startContainer.$, a.startOffset);
                                            try {
                                                u.setEnd(a.endContainer.$, a.endOffset)
                                            } catch (e) {
                                                if (!(e.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0)) throw e;
                                                a.collapse(1), u.setEnd(a.endContainer.$, a.endOffset)
                                            }
                                            h.addRange(u)
                                        }
                                }
                                this.reset(), this.root.fire("selectionchange")
                            }
                        }
                },
                fake: function(e) {
                    var t = this.root.editor;
                    this.reset(), u(t);
                    var n = this._.cache,
                        i = new CKEDITOR.dom.range(this.root);
                    i.setStartBefore(e), i.setEndAfter(e), n.ranges = new CKEDITOR.dom.rangeList(i), n.selectedElement = n.startElement = e, n.type = CKEDITOR.SELECTION_ELEMENT, n.selectedText = n.nativeSel = null, this.isFake = 1, this.rev = T++, t._.fakeSelection = this, this.root.fire("selectionchange")
                },
                isHidden: function() {
                    var e = this.getCommonAncestor();
                    return e && e.type == CKEDITOR.NODE_TEXT && (e = e.getParent()), !(!e || !e.data("cke-hidden-sel"))
                },
                createBookmarks: function(e) {
                    return e = this.getRanges().createBookmarks(e), this.isFake && (e.isFake = 1), e
                },
                createBookmarks2: function(e) {
                    return e = this.getRanges().createBookmarks2(e), this.isFake && (e.isFake = 1), e
                },
                selectBookmarks: function(e) {
                    for (var t, n = [], i = 0; i < e.length; i++) {
                        var o = new CKEDITOR.dom.range(this.root);
                        o.moveToBookmark(e[i]), n.push(o)
                    }
                    return e.isFake && (t = n[0].getEnclosedNode(), t && t.type == CKEDITOR.NODE_ELEMENT || (e.isFake = 0)), e.isFake ? this.fake(t) : this.selectRanges(n), this
                },
                getCommonAncestor: function() {
                    var e = this.getRanges();
                    return e.length ? e[0].startContainer.getCommonAncestor(e[e.length - 1].endContainer) : null
                },
                scrollIntoView: function() {
                    this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
                },
                removeAllRanges: function() {
                    if (this.getType() != CKEDITOR.SELECTION_NONE) {
                        var e = this.getNative();
                        try {
                            e && e[p ? "empty" : "removeAllRanges"]()
                        } catch (e) {}
                        this.reset()
                    }
                }
            }
        }(), CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3, function() {
            function e(e, t) {
                for (var n, i;
                    (e = e.getParent()) && !e.equals(t);)
                    if (e.getAttribute("data-nostyle")) n = e;
                    else if (!i) {
                    var o = e.getAttribute("contentEditable");
                    "false" == o ? n = e : "true" == o && (i = 1)
                }
                return n
            }

            function t(n) {
                var o = n.document;
                if (n.collapsed) o = g(this, o), n.insertNode(o), n.moveToPosition(o, CKEDITOR.POSITION_BEFORE_END);
                else {
                    var a, r = this.element,
                        s = this._.definition,
                        l = s.ignoreReadonly,
                        c = l || s.includeReadonly;
                    null == c && (c = n.root.getCustomData("cke_includeReadonly"));
                    var u = CKEDITOR.dtd[r];
                    u || (a = !0, u = CKEDITOR.dtd.span), n.enlarge(CKEDITOR.ENLARGE_INLINE, 1), n.trim();
                    var d, h = n.createBookmark(),
                        E = h.startNode,
                        m = h.endNode,
                        p = E;
                    if (!l) {
                        var T = n.getCommonAncestor(),
                            l = e(E, T),
                            T = e(m, T);
                        l && (p = l.getNextSourceNode(!0)), T && (m = T)
                    }
                    for (p.getPosition(m) == CKEDITOR.POSITION_FOLLOWING && (p = 0); p;) {
                        if (l = !1, p.equals(m)) p = null, l = !0;
                        else {
                            var C = p.type == CKEDITOR.NODE_ELEMENT ? p.getName() : null,
                                T = C && "false" == p.getAttribute("contentEditable"),
                                I = C && p.getAttribute("data-nostyle");
                            if (C && p.data("cke-bookmark")) {
                                p = p.getNextSourceNode(!0);
                                continue
                            }
                            if (T && c && CKEDITOR.dtd.$block[C])
                                for (var O = p, D = i(O), R = void 0, v = D.length, b = 0, O = v && new CKEDITOR.dom.range(O.getDocument()); b < v; ++b) {
                                    var R = D[b],
                                        _ = CKEDITOR.filter.instances[R.data("cke-filter")];
                                    (_ ? _.check(this) : 1) && (O.selectNodeContents(R), t.call(this, O))
                                }
                            if (D = C ? !u[C] || I ? 0 : T && !c ? 0 : (p.getPosition(m) | y) == y && (!s.childRule || s.childRule(p)) : 1) {
                                if (!(D = p.getParent()) || !(D.getDtd() || CKEDITOR.dtd.span)[r] && !a || s.parentRule && !s.parentRule(D)) l = !0;
                                else if (d || C && CKEDITOR.dtd.$removeEmpty[C] && (p.getPosition(m) | y) != y || (d = n.clone(), d.setStartBefore(p)), C = p.type, C == CKEDITOR.NODE_TEXT || T || C == CKEDITOR.NODE_ELEMENT && !p.getChildCount()) {
                                    for (var N, C = p;
                                        (l = !C.getNext(K)) && (N = C.getParent(), u[N.getName()]) && (N.getPosition(E) | k) == k && (!s.childRule || s.childRule(N));) C = N;
                                    d.setEndAfter(C)
                                }
                            } else l = !0;
                            p = p.getNextSourceNode(I || T)
                        }
                        if (l && d && !d.collapsed) {
                            for (var S, x, w, l = g(this, o), T = l.hasAttributes(), I = d.getCommonAncestor(), C = {}, D = {}, R = {}, v = {}; l && I;) {
                                if (I.getName() == r) {
                                    for (S in s.attributes) !v[S] && (w = I.getAttribute(x)) && (l.getAttribute(S) == w ? D[S] = 1 : v[S] = 1);
                                    for (x in s.styles) !R[x] && (w = I.getStyle(x)) && (l.getStyle(x) == w ? C[x] = 1 : R[x] = 1)
                                }
                                I = I.getParent()
                            }
                            for (S in D) l.removeAttribute(S);
                            for (x in C) l.removeStyle(x);
                            T && !l.hasAttributes() && (l = null), l ? (d.extractContents().appendTo(l), d.insertNode(l), f.call(this, l), l.mergeSiblings(), CKEDITOR.env.ie || l.$.normalize()) : (l = new CKEDITOR.dom.element("span"), d.extractContents().appendTo(l), d.insertNode(l), f.call(this, l), l.remove(!0)), d = null
                        }
                    }
                    n.moveToBookmark(h), n.shrink(CKEDITOR.SHRINK_TEXT), n.shrink(CKEDITOR.NODE_ELEMENT, !0)
                }
            }

            function n(e) {
                function t() {
                    for (var e = new CKEDITOR.dom.elementPath(i.getParent()), t = new CKEDITOR.dom.elementPath(c.getParent()), n = null, o = null, a = 0; a < e.elements.length; a++) {
                        var r = e.elements[a];
                        if (r == e.block || r == e.blockLimit) break;
                        u.checkElementRemovable(r, !0) && (n = r)
                    }
                    for (a = 0; a < t.elements.length && (r = t.elements[a], r != t.block && r != t.blockLimit); a++) u.checkElementRemovable(r, !0) && (o = r);
                    o && c.breakParent(o), n && i.breakParent(n)
                }
                e.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                var n = e.createBookmark(),
                    i = n.startNode;
                if (e.collapsed) {
                    for (var o, a, r = new CKEDITOR.dom.elementPath(i.getParent(), e.root), s = 0; s < r.elements.length && (a = r.elements[s]) && (a != r.block && a != r.blockLimit); s++)
                        if (this.checkElementRemovable(a)) {
                            var l;
                            e.collapsed && (e.checkBoundaryOfElement(a, CKEDITOR.END) || (l = e.checkBoundaryOfElement(a, CKEDITOR.START))) ? (o = a, o.match = l ? "start" : "end") : (a.mergeSiblings(), a.is(this.element) ? h.call(this, a) : E(a, C(this)[a.getName()]))
                        } if (o) {
                        for (a = i, s = 0; l = r.elements[s], !l.equals(o); s++) l.match || (l = l.clone(), l.append(a), a = l);
                        a["start" == o.match ? "insertBefore" : "insertAfter"](o)
                    }
                } else {
                    var c = n.endNode,
                        u = this;
                    for (t(), r = i; !r.equals(c);) o = r.getNextSourceNode(), r.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(r) && (r.getName() == this.element ? h.call(this, r) : E(r, C(this)[r.getName()]), o.type == CKEDITOR.NODE_ELEMENT && o.contains(i) && (t(), o = i.getNext())), r = o
                }
                e.moveToBookmark(n), e.shrink(CKEDITOR.NODE_ELEMENT, !0)
            }

            function i(e) {
                var t = [];
                return e.forEach(function(e) {
                    if ("true" == e.getAttribute("contenteditable")) return t.push(e), !1
                }, CKEDITOR.NODE_ELEMENT, !0), t
            }

            function o(e) {
                var t = e.getEnclosedNode() || e.getCommonAncestor(!1, !0);
                (e = new CKEDITOR.dom.elementPath(t, e.root).contains(this.element, 1)) && !e.isReadOnly() && p(e, this)
            }

            function a(e) {
                var t = e.getCommonAncestor(!0, !0);
                if (e = new CKEDITOR.dom.elementPath(t, e.root).contains(this.element, 1)) {
                    var t = this._.definition,
                        n = t.attributes;
                    if (n)
                        for (var i in n) e.removeAttribute(i, n[i]);
                    if (t.styles)
                        for (var o in t.styles) t.styles.hasOwnProperty(o) && e.removeStyle(o)
                }
            }

            function r(e) {
                var t = e.createBookmark(!0),
                    n = e.createIterator();
                n.enforceRealBlocks = !0, this._.enterMode && (n.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
                for (var i, o, a = e.document; i = n.getNextParagraph();) !i.isReadOnly() && (n.activeFilter ? n.activeFilter.check(this) : 1) && (o = g(this, a, i), l(i, o));
                e.moveToBookmark(t)
            }

            function s(e) {
                var t = e.createBookmark(1),
                    n = e.createIterator();
                n.enforceRealBlocks = !0, n.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
                for (var i, o; i = n.getNextParagraph();) this.checkElementRemovable(i) && (i.is("pre") ? ((o = this._.enterMode == CKEDITOR.ENTER_BR ? null : e.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && i.copyAttributes(o), l(i, o)) : h.call(this, i));
                e.moveToBookmark(t)
            }

            function l(e, t) {
                var n = !t;
                n && (t = e.getDocument().createElement("div"), e.copyAttributes(t));
                var i = t && t.is("pre"),
                    o = e.is("pre"),
                    a = !i && o;
                if (i && !o) {
                    if (o = t, (a = e.getBogus()) && a.remove(), a = e.getHtml(), a = u(a, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""), a = a.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"), a = a.replace(/([ \t\n\r]+|&nbsp;)/g, " "), a = a.replace(/<br\b[^>]*>/gi, "\n"), CKEDITOR.env.ie) {
                        var r = e.getDocument().createElement("div");
                        r.append(o), o.$.outerHTML = "<pre>" + a + "</pre>", o.copyAttributes(r.getFirst()), o = r.getFirst().remove()
                    } else o.setHtml(a);
                    t = o
                } else a ? t = d(n ? [e.getHtml()] : c(e), t) : e.moveChildren(t);
                if (t.replace(e), i) {
                    var s, n = t;
                    (s = n.getPrevious(_)) && s.type == CKEDITOR.NODE_ELEMENT && s.is("pre") && (i = u(s.getHtml(), /\n$/, "") + "\n\n" + u(n.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? n.$.outerHTML = "<pre>" + i + "</pre>" : n.setHtml(i), s.remove())
                } else n && m(t)
            }

            function c(e) {
                var t = [];
                return u(e.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(e, t, n) {
                    return t + "</pre>" + n + "<pre>"
                }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(e, n) {
                    t.push(n)
                }), t
            }

            function u(e, t, n) {
                var i = "",
                    o = "",
                    e = e.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(e, t, n) {
                        return t && (i = t), n && (o = n), ""
                    });
                return i + e.replace(t, n) + o
            }

            function d(e, t) {
                var n;
                e.length > 1 && (n = new CKEDITOR.dom.documentFragment(t.getDocument()));
                for (var i = 0; i < e.length; i++) {
                    var o = e[i],
                        o = o.replace(/(\r\n|\r)/g, "\n"),
                        o = u(o, /^[ \t]*\n/, ""),
                        o = u(o, /\n$/, ""),
                        o = u(o, /^[ \t]+|[ \t]+$/g, function(e, t) {
                            return 1 == e.length ? "&nbsp;" : t ? " " + CKEDITOR.tools.repeat("&nbsp;", e.length - 1) : CKEDITOR.tools.repeat("&nbsp;", e.length - 1) + " "
                        }),
                        o = o.replace(/\n/g, "<br>"),
                        o = o.replace(/[ \t]{2,}/g, function(e) {
                            return CKEDITOR.tools.repeat("&nbsp;", e.length - 1) + " "
                        });
                    if (n) {
                        var a = t.clone();
                        a.setHtml(o), n.append(a)
                    } else t.setHtml(o)
                }
                return n || t
            }

            function h(e, t) {
                var n, i = this._.definition,
                    o = i.attributes,
                    i = i.styles,
                    a = C(this)[e.getName()],
                    r = CKEDITOR.tools.isEmpty(o) && CKEDITOR.tools.isEmpty(i);
                for (n in o)("class" == n || this._.definition.fullMatch) && e.getAttribute(n) != I(n, o[n]) || t && "data-" == n.slice(0, 5) || (r = e.hasAttribute(n), e.removeAttribute(n));
                for (var s in i) this._.definition.fullMatch && e.getStyle(s) != I(s, i[s], !0) || (r = r || !!e.getStyle(s), e.removeStyle(s));
                E(e, a, D[e.getName()]), r && (this._.definition.alwaysRemoveElement ? m(e, 1) : !CKEDITOR.dtd.$block[e.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !e.hasAttributes() ? m(e) : e.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
            }

            function f(e) {
                for (var t, n = C(this), i = e.getElementsByTag(this.element), o = i.count(); --o >= 0;) t = i.getItem(o), t.isReadOnly() || h.call(this, t, !0);
                for (var a in n)
                    if (a != this.element)
                        for (i = e.getElementsByTag(a), o = i.count() - 1; o >= 0; o--) t = i.getItem(o), t.isReadOnly() || E(t, n[a])
            }

            function E(e, t, n) {
                if (t = t && t.attributes)
                    for (var i = 0; i < t.length; i++) {
                        var o, a = t[i][0];
                        if (o = e.getAttribute(a)) {
                            var r = t[i][1];
                            (null === r || r.test && r.test(o) || "string" == typeof r && o == r) && e.removeAttribute(a)
                        }
                    }
                n || m(e)
            }

            function m(e, t) {
                if (!e.hasAttributes() || t)
                    if (CKEDITOR.dtd.$block[e.getName()]) {
                        var n = e.getPrevious(_),
                            i = e.getNext(_);
                        n && (n.type == CKEDITOR.NODE_TEXT || !n.isBlockBoundary({
                            br: 1
                        })) && e.append("br", 1), i && (i.type == CKEDITOR.NODE_TEXT || !i.isBlockBoundary({
                            br: 1
                        })) && e.append("br"), e.remove(!0)
                    } else n = e.getFirst(), i = e.getLast(), e.remove(!0), n && (n.type == CKEDITOR.NODE_ELEMENT && n.mergeSiblings(), i && !n.equals(i) && i.type == CKEDITOR.NODE_ELEMENT && i.mergeSiblings())
            }

            function g(e, t, n) {
                var i;
                return i = e.element, "*" == i && (i = "span"), i = new CKEDITOR.dom.element(i, t), n && n.copyAttributes(i), i = p(i, e), t.getCustomData("doc_processing_style") && i.hasAttribute("id") ? i.removeAttribute("id") : t.setCustomData("doc_processing_style", 1), i
            }

            function p(e, t) {
                var n = t._.definition,
                    i = n.attributes,
                    n = CKEDITOR.style.getStyleText(n);
                if (i)
                    for (var o in i) e.setAttribute(o, i[o]);
                return n && e.setAttribute("style", n), e
            }

            function T(e, t) {
                for (var n in e) e[n] = e[n].replace(b, function(e, n) {
                    return t[n]
                })
            }

            function C(e) {
                if (e._.overrides) return e._.overrides;
                var t = e._.overrides = {},
                    n = e._.definition.overrides;
                if (n) {
                    CKEDITOR.tools.isArray(n) || (n = [n]);
                    for (var i = 0; i < n.length; i++) {
                        var o, a, r = n[i];
                        if ("string" == typeof r ? o = r.toLowerCase() : (o = r.element ? r.element.toLowerCase() : e.element, a = r.attributes), r = t[o] || (t[o] = {}), a) {
                            var s, r = r.attributes = r.attributes || [];
                            for (s in a) r.push([s.toLowerCase(), a[s]])
                        }
                    }
                }
                return t
            }

            function I(e, t, n) {
                var i = new CKEDITOR.dom.element("span");
                return i[n ? "setStyle" : "setAttribute"](e, t), i[n ? "getStyle" : "getAttribute"](e)
            }

            function O(e, t, n) {
                for (var i, o = e.document, a = e.getRanges(), t = t ? this.removeFromRange : this.applyToRange, r = a.createIterator(); i = r.getNextRange();) t.call(this, i, n);
                e.selectRanges(a), o.removeCustomData("doc_processing_style")
            }
            var D = {
                    address: 1,
                    div: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    p: 1,
                    pre: 1,
                    section: 1,
                    header: 1,
                    footer: 1,
                    nav: 1,
                    article: 1,
                    aside: 1,
                    figure: 1,
                    dialog: 1,
                    hgroup: 1,
                    time: 1,
                    meter: 1,
                    menu: 1,
                    command: 1,
                    keygen: 1,
                    output: 1,
                    progress: 1,
                    details: 1,
                    datagrid: 1,
                    datalist: 1
                },
                R = {
                    a: 1,
                    blockquote: 1,
                    embed: 1,
                    hr: 1,
                    img: 1,
                    li: 1,
                    object: 1,
                    ol: 1,
                    table: 1,
                    td: 1,
                    tr: 1,
                    th: 1,
                    ul: 1,
                    dl: 1,
                    dt: 1,
                    dd: 1,
                    form: 1,
                    audio: 1,
                    video: 1
                },
                v = /\s*(?:;\s*|$)/,
                b = /#\((.+?)\)/g,
                K = CKEDITOR.dom.walker.bookmark(0, 1),
                _ = CKEDITOR.dom.walker.whitespaces(1);
            CKEDITOR.style = function(e, t) {
                if ("string" == typeof e.type) return new CKEDITOR.style.customHandlers[e.type](e);
                var n = e.attributes;
                n && n.style && (e.styles = CKEDITOR.tools.extend({}, e.styles, CKEDITOR.tools.parseCssText(n.style)), delete n.style), t && (e = CKEDITOR.tools.clone(e), T(e.attributes, t), T(e.styles, t)), n = this.element = e.element ? "string" == typeof e.element ? e.element.toLowerCase() : e.element : "*", this.type = e.type || (D[n] ? CKEDITOR.STYLE_BLOCK : R[n] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE), "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT), this._ = {
                    definition: e
                }
            }, CKEDITOR.style.prototype = {
                apply: function(e) {
                    if (e instanceof CKEDITOR.dom.document) return O.call(this, e.getSelection());
                    if (this.checkApplicable(e.elementPath(), e)) {
                        var t = this._.enterMode;
                        t || (this._.enterMode = e.activeEnterMode), O.call(this, e.getSelection(), 0, e), this._.enterMode = t
                    }
                },
                remove: function(e) {
                    if (e instanceof CKEDITOR.dom.document) return O.call(this, e.getSelection(), 1);
                    if (this.checkApplicable(e.elementPath(), e)) {
                        var t = this._.enterMode;
                        t || (this._.enterMode = e.activeEnterMode), O.call(this, e.getSelection(), 1, e), this._.enterMode = t
                    }
                },
                applyToRange: function(e) {
                    return this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? t : this.type == CKEDITOR.STYLE_BLOCK ? r : this.type == CKEDITOR.STYLE_OBJECT ? o : null, this.applyToRange(e)
                },
                removeFromRange: function(e) {
                    return this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? n : this.type == CKEDITOR.STYLE_BLOCK ? s : this.type == CKEDITOR.STYLE_OBJECT ? a : null, this.removeFromRange(e)
                },
                applyToObject: function(e) {
                    p(e, this)
                },
                checkActive: function(e, t) {
                    switch (this.type) {
                        case CKEDITOR.STYLE_BLOCK:
                            return this.checkElementRemovable(e.block || e.blockLimit, !0, t);
                        case CKEDITOR.STYLE_OBJECT:
                        case CKEDITOR.STYLE_INLINE:
                            for (var n, i = e.elements, o = 0; o < i.length; o++)
                                if (n = i[o], this.type != CKEDITOR.STYLE_INLINE || n != e.block && n != e.blockLimit) {
                                    if (this.type == CKEDITOR.STYLE_OBJECT) {
                                        var a = n.getName();
                                        if (!("string" == typeof this.element ? a == this.element : a in this.element)) continue
                                    }
                                    if (this.checkElementRemovable(n, !0, t)) return !0
                                }
                    }
                    return !1
                },
                checkApplicable: function(e, t, n) {
                    if (t && t instanceof CKEDITOR.filter && (n = t), n && !n.check(this)) return !1;
                    switch (this.type) {
                        case CKEDITOR.STYLE_OBJECT:
                            return !!e.contains(this.element);
                        case CKEDITOR.STYLE_BLOCK:
                            return !!e.blockLimit.getDtd()[this.element]
                    }
                    return !0
                },
                checkElementMatch: function(e, t) {
                    var n = this._.definition;
                    if (!e || !n.ignoreReadonly && e.isReadOnly()) return !1;
                    var i = e.getName();
                    if ("string" == typeof this.element ? i == this.element : i in this.element) {
                        if (!t && !e.hasAttributes()) return !0;
                        if (i = n._AC) n = i;
                        else {
                            var i = {},
                                o = 0,
                                a = n.attributes;
                            if (a)
                                for (var r in a) o++, i[r] = a[r];
                            (r = CKEDITOR.style.getStyleText(n)) && (i.style || o++, i.style = r), i._length = o, n = n._AC = i
                        }
                        if (!n._length) return !0;
                        for (var s in n)
                            if ("_length" != s) {
                                if (o = e.getAttribute(s) || "", "style" == s) e: {
                                    i = n[s],
                                    "string" == typeof i && (i = CKEDITOR.tools.parseCssText(i)),
                                    "string" == typeof o && (o = CKEDITOR.tools.parseCssText(o, !0)),
                                    r = void 0;
                                    for (r in i)
                                        if (!(r in o) || o[r] != i[r] && "inherit" != i[r] && "inherit" != o[r]) {
                                            i = !1;
                                            break e
                                        } i = !0
                                }
                                else i = n[s] == o;
                                if (i) {
                                    if (!t) return !0
                                } else if (t) return !1
                            } if (t) return !0
                    }
                    return !1
                },
                checkElementRemovable: function(e, t, n) {
                    if (this.checkElementMatch(e, t, n)) return !0;
                    if (t = C(this)[e.getName()]) {
                        var i;
                        if (!(t = t.attributes)) return !0;
                        for (n = 0; n < t.length; n++)
                            if (i = t[n][0], i = e.getAttribute(i)) {
                                var o = t[n][1];
                                if (null === o) return !0;
                                if ("string" == typeof o) {
                                    if (i == o) return !0
                                } else if (o.test(i)) return !0
                            }
                    }
                    return !1
                },
                buildPreview: function(e) {
                    var t = this._.definition,
                        n = [],
                        i = t.element;
                    "bdo" == i && (i = "span");
                    var n = ["<", i],
                        o = t.attributes;
                    if (o)
                        for (var a in o) n.push(" ", a, '="', o[a], '"');
                    return (o = CKEDITOR.style.getStyleText(t)) && n.push(' style="', o, '"'), n.push(">", e || t.name, "</", i, ">"), n.join("")
                },
                getDefinition: function() {
                    return this._.definition
                }
            }, CKEDITOR.style.getStyleText = function(e) {
                var t = e._ST;
                if (t) return t;
                var t = e.styles,
                    n = e.attributes && e.attributes.style || "",
                    i = "";
                n.length && (n = n.replace(v, ";"));
                for (var o in t) {
                    var a = t[o],
                        r = (o + ":" + a).replace(v, ";");
                    "inherit" == a ? i += r : n += r
                }
                return n.length && (n = CKEDITOR.tools.normalizeCssText(n, !0)), e._ST = n + i
            }, CKEDITOR.style.customHandlers = {}, CKEDITOR.style.addCustomHandler = function(e) {
                var t = function(e) {
                    this._ = {
                        definition: e
                    }, this.setup && this.setup(e)
                };
                return t.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), {
                    assignedTo: CKEDITOR.STYLE_OBJECT
                }, e, !0), this.customHandlers[e.type] = t
            };
            var y = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED,
                k = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
        }(), CKEDITOR.styleCommand = function(e, t) {
            this.requiredContent = this.allowedContent = this.style = e, CKEDITOR.tools.extend(this, t, !0)
        }, CKEDITOR.styleCommand.prototype.exec = function(e) {
            e.focus(), this.state == CKEDITOR.TRISTATE_OFF ? e.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && e.removeStyle(this.style)
        }, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet = function(e, t, n) {
            CKEDITOR.stylesSet.addExternal(e, t, ""), CKEDITOR.stylesSet.load(e, n)
        }, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            attachStyleStateChange: function(e, t) {
                var n = this._.styleStateChangeCallbacks;
                n || (n = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function(e) {
                    for (var t = 0; t < n.length; t++) {
                        var i = n[t],
                            o = i.style.checkActive(e.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                        i.fn.call(this, o)
                    }
                })), n.push({
                    style: e,
                    fn: t
                })
            },
            applyStyle: function(e) {
                e.apply(this)
            },
            removeStyle: function(e) {
                e.remove(this)
            },
            getStylesSet: function(e) {
                if (this._.stylesDefinitions) e(this._.stylesDefinitions);
                else {
                    var t = this,
                        n = t.config.stylesCombo_stylesSet || t.config.stylesSet;
                    if (n === !1) e(null);
                    else if (n instanceof Array) t._.stylesDefinitions = n, e(n);
                    else {
                        n || (n = "default");
                        var n = n.split(":"),
                            i = n[0];
                        CKEDITOR.stylesSet.addExternal(i, n[1] ? n.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""), CKEDITOR.stylesSet.load(i, function(n) {
                            t._.stylesDefinitions = n[i], e(t._.stylesDefinitions)
                        })
                    }
                }
            }
        }), CKEDITOR.dom.comment = function(e, t) {
            "string" == typeof e && (e = (t ? t.$ : document).createComment(e)), CKEDITOR.dom.domObject.call(this, e)
        }, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
            type: CKEDITOR.NODE_COMMENT,
            getOuterHtml: function() {
                return "<!--" + this.$.nodeValue + "-->"
            }
        }), function() {
            var e, t = {},
                n = {};
            for (e in CKEDITOR.dtd.$blockLimit) e in CKEDITOR.dtd.$list || (t[e] = 1);
            for (e in CKEDITOR.dtd.$block) e in CKEDITOR.dtd.$blockLimit || e in CKEDITOR.dtd.$empty || (n[e] = 1);
            CKEDITOR.dom.elementPath = function(e, i) {
                var o, a = null,
                    r = null,
                    s = [],
                    l = e,
                    i = i || e.getDocument().getBody();
                do
                    if (l.type == CKEDITOR.NODE_ELEMENT) {
                        if (s.push(l), !this.lastElement && (this.lastElement = l, l.is(CKEDITOR.dtd.$object) || "false" == l.getAttribute("contenteditable"))) continue;
                        if (l.equals(i)) break;
                        if (!r && (o = l.getName(), "true" == l.getAttribute("contenteditable") ? r = l : !a && n[o] && (a = l), t[o])) {
                            var c;
                            if (c = !a) {
                                if (o = "div" == o) {
                                    e: {
                                        o = l.getChildren(),
                                        c = 0;
                                        for (var u = o.count(); c < u; c++) {
                                            var d = o.getItem(c);
                                            if (d.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[d.getName()]) {
                                                o = !0;
                                                break e
                                            }
                                        }
                                        o = !1
                                    }
                                    o = !o
                                }
                                c = o;
                            }
                            c ? a = l : r = l
                        }
                    } while (l = l.getParent());
                r || (r = i), this.block = a, this.blockLimit = r, this.root = i, this.elements = s
            }
        }(), CKEDITOR.dom.elementPath.prototype = {
            compare: function(e) {
                var t = this.elements,
                    e = e && e.elements;
                if (!e || t.length != e.length) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!t[n].equals(e[n])) return !1;
                return !0
            },
            contains: function(e, t, n) {
                var i;
                "string" == typeof e && (i = function(t) {
                    return t.getName() == e
                }), e instanceof CKEDITOR.dom.element ? i = function(t) {
                    return t.equals(e)
                } : CKEDITOR.tools.isArray(e) ? i = function(t) {
                    return CKEDITOR.tools.indexOf(e, t.getName()) > -1
                } : "function" == typeof e ? i = e : "object" == typeof e && (i = function(t) {
                    return t.getName() in e
                });
                var o = this.elements,
                    a = o.length;
                for (t && a--, n && (o = Array.prototype.slice.call(o, 0), o.reverse()), t = 0; t < a; t++)
                    if (i(o[t])) return o[t];
                return null
            },
            isContextFor: function(e) {
                var t;
                return !(e in CKEDITOR.dtd.$block) || (t = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!t.getDtd()[e])
            },
            direction: function() {
                return (this.block || this.blockLimit || this.root).getDirection(1)
            }
        }, CKEDITOR.dom.text = function(e, t) {
            "string" == typeof e && (e = (t ? t.$ : document).createTextNode(e)), this.$ = e
        }, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
            type: CKEDITOR.NODE_TEXT,
            getLength: function() {
                return this.$.nodeValue.length
            },
            getText: function() {
                return this.$.nodeValue
            },
            setText: function(e) {
                this.$.nodeValue = e
            },
            split: function(e) {
                var t = this.$.parentNode,
                    n = t.childNodes.length,
                    i = this.getLength(),
                    o = this.getDocument(),
                    a = new CKEDITOR.dom.text(this.$.splitText(e), o);
                return t.childNodes.length == n && (e >= i ? (a = o.createText(""), a.insertAfter(this)) : (e = o.createText(""), e.insertAfter(a), e.remove())), a
            },
            substring: function(e, t) {
                return "number" != typeof t ? this.$.nodeValue.substr(e) : this.$.nodeValue.substring(e, t)
            }
        }), function() {
            function e(e, t, n) {
                var i = e.serializable,
                    o = t[n ? "endContainer" : "startContainer"],
                    a = n ? "endOffset" : "startOffset",
                    r = i ? t.document.getById(e.startNode) : e.startNode,
                    e = i ? t.document.getById(e.endNode) : e.endNode;
                return o.equals(r.getPrevious()) ? (t.startOffset = t.startOffset - o.getLength() - e.getPrevious().getLength(), o = e.getNext()) : o.equals(e.getPrevious()) && (t.startOffset = t.startOffset - o.getLength(), o = e.getNext()), o.equals(r.getParent()) && t[a]++, o.equals(e.getParent()) && t[a]++, t[n ? "endContainer" : "startContainer"] = o, t
            }
            CKEDITOR.dom.rangeList = function(e) {
                return e instanceof CKEDITOR.dom.rangeList ? e : (e ? e instanceof CKEDITOR.dom.range && (e = [e]) : e = [], CKEDITOR.tools.extend(e, t))
            };
            var t = {
                createIterator: function() {
                    var e, t = this,
                        n = CKEDITOR.dom.walker.bookmark(),
                        i = [];
                    return {
                        getNextRange: function(o) {
                            e = void 0 === e ? 0 : e + 1;
                            var a = t[e];
                            if (a && t.length > 1) {
                                if (!e)
                                    for (var r = t.length - 1; r >= 0; r--) i.unshift(t[r].createBookmark(!0));
                                if (o)
                                    for (var s = 0; t[e + s + 1];) {
                                        for (var l = a.document, o = 0, r = l.getById(i[s].endNode), l = l.getById(i[s + 1].startNode);;) {
                                            if (r = r.getNextSourceNode(!1), l.equals(r)) o = 1;
                                            else if (n(r) || r.type == CKEDITOR.NODE_ELEMENT && r.isBlockBoundary()) continue;
                                            break
                                        }
                                        if (!o) break;
                                        s++
                                    }
                                for (a.moveToBookmark(i.shift()); s--;) r = t[++e], r.moveToBookmark(i.shift()), a.setEnd(r.endContainer, r.endOffset)
                            }
                            return a
                        }
                    }
                },
                createBookmarks: function(t) {
                    for (var n, i = [], o = 0; o < this.length; o++) {
                        i.push(n = this[o].createBookmark(t, !0));
                        for (var a = o + 1; a < this.length; a++) this[a] = e(n, this[a]), this[a] = e(n, this[a], !0)
                    }
                    return i
                },
                createBookmarks2: function(e) {
                    for (var t = [], n = 0; n < this.length; n++) t.push(this[n].createBookmark2(e));
                    return t
                },
                moveToBookmarks: function(e) {
                    for (var t = 0; t < this.length; t++) this[t].moveToBookmark(e[t])
                }
            }
        }(), function() {
            function e() {
                return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
            }

            function t(t) {
                var n = CKEDITOR.skin["ua_" + t],
                    i = CKEDITOR.env;
                if (n)
                    for (var o, n = n.split(",").sort(function(e, t) {
                            return e > t ? -1 : 1
                        }), a = 0; a < n.length; a++)
                        if (o = n[a], i.ie && (o.replace(/^ie/, "") == i.version || i.quirks && "iequirks" == o) && (o = "ie"), i[o]) {
                            t += "_" + n[a];
                            break
                        } return CKEDITOR.getUrl(e() + t + ".css")
            }

            function n(e, n) {
                a[e] || (CKEDITOR.document.appendStyleSheet(t(e)), a[e] = 1), n && n()
            }

            function i(e) {
                var t = e.getById(r);
                return t || (t = e.getHead().append("style"), t.setAttribute("id", r), t.setAttribute("type", "text/css")), t
            }

            function o(e, t, n) {
                var i, o, a;
                if (CKEDITOR.env.webkit)
                    for (t = t.split("}").slice(0, -1), o = 0; o < t.length; o++) t[o] = t[o].split("{");
                for (var r = 0; r < e.length; r++)
                    if (CKEDITOR.env.webkit)
                        for (o = 0; o < t.length; o++) {
                            for (a = t[o][1], i = 0; i < n.length; i++) a = a.replace(n[i][0], n[i][1]);
                            e[r].$.sheet.addRule(t[o][0], a)
                        } else {
                            for (a = t, i = 0; i < n.length; i++) a = a.replace(n[i][0], n[i][1]);
                            CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? e[r].$.styleSheet.cssText = e[r].$.styleSheet.cssText + a : e[r].$.innerHTML = e[r].$.innerHTML + a
                        }
            }
            var a = {};
            CKEDITOR.skin = {
                path: e,
                loadPart: function(t, i) {
                    CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e() + "skin.js"), function() {
                        n(t, i)
                    }) : n(t, i)
                },
                getPath: function(e) {
                    return CKEDITOR.getUrl(t(e))
                },
                icons: {},
                addIcon: function(e, t, n, i) {
                    e = e.toLowerCase(), this.icons[e] || (this.icons[e] = {
                        path: t,
                        offset: n || 0,
                        bgsize: i || "16px"
                    })
                },
                getIconStyle: function(e, t, n, i, o) {
                    var a;
                    return e && (e = e.toLowerCase(), t && (a = this.icons[e + "-rtl"]), a || (a = this.icons[e])), e = n || a && a.path || "", i = i || a && a.offset, o = o || a && a.bgsize || "16px", e && "background-image:url(" + CKEDITOR.getUrl(e) + ");background-position:0 " + i + "px;background-size:" + o + ";"
                }
            }, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                getUiColor: function() {
                    return this.uiColor
                },
                setUiColor: function(e) {
                    var t = i(CKEDITOR.document);
                    return (this.setUiColor = function(e) {
                        this.uiColor = e;
                        var n = CKEDITOR.skin.chameleon,
                            i = "",
                            a = "";
                        "function" == typeof n && (i = n(this, "editor"), a = n(this, "panel")), e = [
                            [l, e]
                        ], o([t], i, e), o(s, a, e)
                    }).call(this, e)
                }
            });
            var r = "cke_ui_color",
                s = [],
                l = /\$color/g;
            CKEDITOR.on("instanceLoaded", function(e) {
                if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                    var t = e.editor,
                        e = function(e) {
                            if (e = (e.data[0] || e.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument(), !e.getById("cke_ui_color")) {
                                e = i(e), s.push(e);
                                var n = t.getUiColor();
                                n && o([e], CKEDITOR.skin.chameleon(t, "panel"), [
                                    [l, n]
                                ])
                            }
                        };
                    t.on("panelShow", e), t.on("menuShow", e), t.config.uiColor && t.setUiColor(t.config.uiColor)
                }
            })
        }(), function() {
            if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1;
            else {
                var e = CKEDITOR.dom.element.createFromHtml('<div style="width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"></div>', CKEDITOR.document);
                e.appendTo(CKEDITOR.document.getHead());
                try {
                    var t = e.getComputedStyle("border-top-color"),
                        n = e.getComputedStyle("border-right-color");
                    CKEDITOR.env.hc = !(!t || t != n)
                } catch (e) {
                    CKEDITOR.env.hc = !1
                }
                e.remove()
            }
            if (CKEDITOR.env.hc && (CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc"), CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"), CKEDITOR.status = "loaded", CKEDITOR.fireOnce("loaded"), e = CKEDITOR._.pending)
                for (delete CKEDITOR._.pending, t = 0; t < e.length; t++) CKEDITOR.editor.prototype.constructor.apply(e[t][0], e[t][1]), CKEDITOR.add(e[t][0])
        }(), CKEDITOR.skin.name = "clean", CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko", CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8", CKEDITOR.skin.chameleon = function() {
            var e = function() {
                    return function(e, t) {
                        for (var n = e.match(/[^#]./g), i = 0; i < 3; i++) {
                            var o, a = n,
                                r = i;
                            o = parseInt(n[i], 16), o = ("0" + (t < 0 ? 0 | o * (1 + t) : 0 | o + (255 - o) * t).toString(16)).slice(-2), a[r] = o
                        }
                        return "#" + n.join("")
                    }
                }(),
                t = function() {
                    var e = new CKEDITOR.template("background:#{to};background-image:linear-gradient(to bottom,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');");
                    return function(t, n) {
                        return e.output({
                            from: t,
                            to: n
                        })
                    }
                }(),
                n = {
                    editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
                    panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
                };
            return function(i, o) {
                var a = i.uiColor,
                    a = {
                        id: "." + i.id,
                        defaultBorder: e(a, -.1),
                        defaultGradient: t(e(a, .9), a),
                        lightGradient: t(e(a, 1), e(a, .7)),
                        mediumGradient: t(e(a, .8), e(a, .5)),
                        ckeButtonOn: t(e(a, .6), e(a, .7)),
                        ckeResizer: e(a, -.4),
                        ckeToolbarSeparator: e(a, .5),
                        ckeColorauto: e(a, .8),
                        dialogBody: e(a, .7),
                        dialogTabSelected: t("#FFFFFF", "#FFFFFF"),
                        dialogTabSelectedBorder: "#FFF",
                        elementsPathColor: e(a, -.6),
                        elementsPathBg: a,
                        menubuttonIcon: e(a, .5),
                        menubuttonIconHover: e(a, .3)
                    };
                return n[o].output(a).replace(/\[/g, "{").replace(/\]/g, "}")
            }
        }(), CKEDITOR.plugins.add("basicstyles", {
            init: function(e) {
                function t() {
                    var e = this,
                        t = "",
                        n = CKEDITOR.tools.addFunction(function(t) {
                            switch (t) {
                                case "sub":
                                    e.execCommand("subscript");
                                    break;
                                case "sup":
                                    e.execCommand("superscript")
                            }
                        }),
                        i = CKEDITOR.skin.getIconStyle("subscript", !1),
                        o = CKEDITOR.skin.getIconStyle("superscript", !1);
                    return t + ('<a class="cke_button ck_btn_with_gray_border_top" onclick="CKEDITOR.tools.callFunction(' + n + ', \'sub\')" data-type="sub" style="float: left;outline: none;"><span class="cke_button_icon cke_button__subscript_icon" style="' + i + '"></span></a>') + ('<a class="cke_button ck_btn_with_gray_border_top" onclick="CKEDITOR.tools.callFunction(' + n + ', \'sup\')" data-type="sup" style="float: left;outline: none;"><span class="cke_button_icon cke_button__superscript_icon" style="' + o + '"></span></a>')
                }

                function n(e, t) {
                    var n = this.getSelection().getStartElement(),
                        i = this.ui.get(l);
                    if (i) {
                        var o = CKEDITOR.document.getById(i._.id),
                            i = o.find(".cke_button_icon").getItem(0),
                            o = o.find(".cke_button_arrow").getItem(0);
                        if (i.setText("..."), i.setStyles({
                                color: "white",
                                "text-align": "center",
                                "font-size": "18px",
                                position: "relative",
                                top: "-6px"
                            }), o && o.remove(), n = n.getName(), t.el) {
                            for (var i = t.el.find("a.cke_button"), o = 0, a = i.count(); o < a; o++) i.getItem(o).removeClass("cke_button_on").addClass("cke_button_off");
                            ("sub" === n || "sup" === n) && t.el.findOne("a[data-type=" + n + "]").addClass("cke_button_on")
                        }
                    }
                }
                var i = 0,
                    o = function(t, n, o, r) {
                        if (r) {
                            var r = new CKEDITOR.style(r),
                                s = a[o];
                            s.unshift(r), e.attachStyleStateChange(r, function(t) {
                                !e.readOnly && e.getCommand(o).setState(t)
                            }), e.addCommand(o, new CKEDITOR.styleCommand(r, {
                                contentForms: s
                            })), e.ui.addButton && e.ui.addButton(t, {
                                label: n,
                                command: o,
                                toolbar: "basicstyles," + (i += 10)
                            })
                        }
                    },
                    a = {
                        bold: ["strong", "b", ["span", function(e) {
                            return e = e.styles["font-weight"], "bold" == e || +e >= 700
                        }]],
                        italic: ["em", "i", ["span", function(e) {
                            return "italic" == e.styles["font-style"]
                        }]],
                        underline: ["u", ["span", function(e) {
                            return "underline" == e.styles["text-decoration"]
                        }]],
                        strike: ["s", "strike", ["span", function(e) {
                            return "line-through" == e.styles["text-decoration"]
                        }]],
                        subscript: ["sub"],
                        superscript: ["sup"]
                    },
                    r = e.config,
                    s = e.lang.basicstyles;
                o("Bold", s.bold, "bold", r.coreStyles_bold), o("Italic", s.italic, "italic", r.coreStyles_italic), o("Underline", s.underline, "underline", r.coreStyles_underline), o("Strike", s.strike, "strike", r.coreStyles_strike), o("Subscript", s.subscript, "subscript", r.coreStyles_subscript), o("Superscript", s.superscript, "superscript", r.coreStyles_superscript), e.setKeystroke([
                    [CKEDITOR.CTRL + 66, "bold"],
                    [CKEDITOR.CTRL + 73, "italic"],
                    [CKEDITOR.CTRL + 85, "underline"]
                ]);
                var l = "ScriptGroup",
                    c = {};
                e.on("selectionChange", n.bind(e, l, c)), e.ui.add(l, CKEDITOR.UI_PANELBUTTON, {
                    label: "",
                    modes: {
                        wysiwyg: 1
                    },
                    toolbar: "script,60",
                    editorFocus: 0,
                    panel: {
                        css: CKEDITOR.skin.getPath("editor"),
                        attributes: {
                            role: "scriptbox",
                            "aria-label": ""
                        }
                    },
                    onBlock: function(i, o) {
                        c.el = o.element, o.autoSize = !0, o.element.addClass("cke_scriptgroupblock"), o.element.setStyles({
                            width: "56px",
                            overflow: "hidden",
                            "white-space": "nowrap",
                            outline: "none"
                        }), o.element.setHtml(t.call(e)), o.element.getDocument().getBody().setStyle("overflow", "hidden"), CKEDITOR.ui.fire("ready", this), n.call(e, l, c)
                    }
                })
            }
        }), CKEDITOR.config.coreStyles_bold = {
            element: "strong",
            overrides: "b"
        }, CKEDITOR.config.coreStyles_italic = {
            element: "em",
            overrides: "i"
        }, CKEDITOR.config.coreStyles_underline = {
            element: "u"
        }, CKEDITOR.config.coreStyles_strike = {
            element: "s",
            overrides: "strike"
        }, CKEDITOR.config.coreStyles_subscript = {
            element: "sub"
        }, CKEDITOR.config.coreStyles_superscript = {
            element: "sup"
        }, CKEDITOR.plugins.add("dialogui", {
            onLoad: function() {
                var e = function(e) {
                        this._ || (this._ = {}), this._.default = this._.initValue = e.default || "", this._.required = e.required || !1;
                        for (var t = [this._], n = 1; n < arguments.length; n++) t.push(arguments[n]);
                        return t.push(!0), CKEDITOR.tools.extend.apply(CKEDITOR.tools, t), this._
                    },
                    t = {
                        build: function(e, t, n) {
                            return new CKEDITOR.ui.dialog.textInput(e, t, n)
                        }
                    },
                    n = {
                        build: function(e, t, n) {
                            return new CKEDITOR.ui.dialog[t.type](e, t, n)
                        }
                    },
                    i = {
                        isChanged: function() {
                            return this.getValue() != this.getInitValue()
                        },
                        reset: function(e) {
                            this.setValue(this.getInitValue(), e)
                        },
                        setInitValue: function() {
                            this._.initValue = this.getValue()
                        },
                        resetInitValue: function() {
                            this._.initValue = this._.default
                        },
                        getInitValue: function() {
                            return this._.initValue
                        }
                    },
                    o = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                        onChange: function(e, t) {
                            this._.domOnChangeRegistered || (e.on("load", function() {
                                this.getInputElement().on("change", function() {
                                    e.parts.dialog.isVisible() && this.fire("change", {
                                        value: this.getValue()
                                    })
                                }, this)
                            }, this), this._.domOnChangeRegistered = !0), this.on("change", t)
                        }
                    }, !0),
                    a = /^on([A-Z]\w+)/,
                    r = function(e) {
                        for (var t in e)(a.test(t) || "title" == t || "type" == t) && delete e[t];
                        return e
                    },
                    s = function(e) {
                        e = e.data.getKeystroke(), e == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : e == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl")
                    };
                CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                    labeledElement: function(t, n, i, o) {
                        if (!(arguments.length < 4)) {
                            var a = o;
                            if (n.label) {
                                var r = e.call(this, n);
                                r.labelId = CKEDITOR.tools.getNextId() + "_label", this._.children = [];
                                var a = function() {
                                        var e = [],
                                            i = n.required ? " cke_required" : "";
                                        return "horizontal" != n.labelLayout ? e.push('<label class="cke_dialog_ui_labeled_label' + i + '" ', ' id="' + r.labelId + '"', r.inputId ? ' for="' + r.inputId + '"' : "", (n.labelStyle ? ' style="' + n.labelStyle + '"' : "") + ">", n.label, "</label>", '<div class="cke_dialog_ui_labeled_content"', n.controlStyle ? ' style="' + n.controlStyle + '"' : "", ' role="presentation">', o.call(this, t, n), "</div>") : (i = {
                                            type: "hbox",
                                            widths: n.widths,
                                            padding: 0,
                                            children: [{
                                                type: "html",
                                                html: '<label class="cke_dialog_ui_labeled_label' + i + '" id="' + r.labelId + '" for="' + r.inputId + '"' + (n.labelStyle ? ' style="' + n.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(n.label) + "</label>"
                                            }, {
                                                type: "html",
                                                html: '<span class="cke_dialog_ui_labeled_content"' + (n.controlStyle ? ' style="' + n.controlStyle + '"' : "") + ">" + o.call(this, t, n) + "</span>"
                                            }]
                                        }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(t, i, e)), e.join("")
                                    },
                                    s = {
                                        role: n.role || "presentation"
                                    };
                                n.includeLabel && (s["aria-labelledby"] = r.labelId)
                            }
                            CKEDITOR.ui.dialog.uiElement.call(this, t, n, i, "div", null, s, a)
                        }
                    },
                    textInput: function(t, n, i) {
                        if (!(arguments.length < 3)) {
                            e.call(this, n);
                            var o = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                                a = {
                                    class: "cke_dialog_ui_input_" + n.type,
                                    id: o,
                                    type: n.type
                                };
                            n.validate && (this.validate = n.validate), n.maxLength && (a.maxlength = n.maxLength), n.size && (a.size = n.size), n.inputStyle && (a.style = n.inputStyle);
                            var r = this,
                                l = !1;
                            t.on("load", function() {
                                r.getInputElement().on("keydown", function(e) {
                                    13 == e.data.getKeystroke() && (l = !0)
                                }), r.getInputElement().on("keyup", function(e) {
                                    13 == e.data.getKeystroke() && l && (t.getButton("ok") && setTimeout(function() {
                                        t.getButton("ok").click()
                                    }, 0), l = !1), r.bidi && s.call(r, e)
                                }, null, null, 1e3)
                            }), CKEDITOR.ui.dialog.labeledElement.call(this, t, n, i, function() {
                                var e = ['<div class="cke_dialog_ui_input_', n.type, '" role="presentation"'];
                                n.width && e.push('style="width:' + n.width + '" '), e.push("><input "), a["aria-labelledby"] = this._.labelId, this._.required && (a["aria-required"] = this._.required);
                                for (var t in a) e.push(t + '="' + a[t] + '" ');
                                return e.push(" /></div>"), e.join("")
                            })
                        }
                    },
                    textarea: function(t, n, i) {
                        if (!(arguments.length < 3)) {
                            e.call(this, n);
                            var o = this,
                                a = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
                                r = {};
                            n.validate && (this.validate = n.validate), r.rows = n.rows || 5, r.cols = n.cols || 20, r.class = "cke_dialog_ui_input_textarea " + (n.class || ""), "undefined" != typeof n.inputStyle && (r.style = n.inputStyle), n.dir && (r.dir = n.dir), o.bidi && t.on("load", function() {
                                o.getInputElement().on("keyup", s)
                            }, o), CKEDITOR.ui.dialog.labeledElement.call(this, t, n, i, function() {
                                r["aria-labelledby"] = this._.labelId, this._.required && (r["aria-required"] = this._.required);
                                var e, t = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', a, '" '];
                                for (e in r) t.push(e + '="' + CKEDITOR.tools.htmlEncode(r[e]) + '" ');
                                return t.push(">", CKEDITOR.tools.htmlEncode(o._.default), "</textarea></div>"), t.join("")
                            })
                        }
                    },
                    checkbox: function(t, n, i) {
                        if (!(arguments.length < 3)) {
                            var o = e.call(this, n, {
                                default: !!n.default
                            });
                            n.validate && (this.validate = n.validate), CKEDITOR.ui.dialog.uiElement.call(this, t, n, i, "span", null, null, function() {
                                var e = CKEDITOR.tools.extend({}, n, {
                                        id: n.id ? n.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"
                                    }, !0),
                                    i = [],
                                    a = CKEDITOR.tools.getNextId() + "_label",
                                    s = {
                                        class: "cke_dialog_ui_checkbox_input",
                                        type: "checkbox",
                                        "aria-labelledby": a
                                    };
                                return r(e), n.default && (s.checked = "checked"), "undefined" != typeof e.inputStyle && (e.style = e.inputStyle), o.checkbox = new CKEDITOR.ui.dialog.uiElement(t, e, i, "input", null, s), i.push(' <label id="', a, '" for="', s.id, '"' + (n.labelStyle ? ' style="' + n.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(n.label), "</label>"), i.join("")
                            })
                        }
                    },
                    radio: function(t, n, i) {
                        if (!(arguments.length < 3)) {
                            e.call(this, n), this._.default || (this._.default = this._.initValue = n.items[0][1]), n.validate && (this.validate = n.validate);
                            var o = [],
                                a = this;
                            n.role = "radiogroup", n.includeLabel = !0, CKEDITOR.ui.dialog.labeledElement.call(this, t, n, i, function() {
                                for (var e = [], i = [], s = (n.id ? n.id : CKEDITOR.tools.getNextId()) + "_radio", l = 0; l < n.items.length; l++) {
                                    var c = n.items[l],
                                        u = void 0 !== c[2] ? c[2] : c[0],
                                        d = void 0 !== c[1] ? c[1] : c[0],
                                        h = CKEDITOR.tools.getNextId() + "_radio_input",
                                        f = h + "_label",
                                        h = CKEDITOR.tools.extend({}, n, {
                                            id: h,
                                            title: null,
                                            type: null
                                        }, !0),
                                        u = CKEDITOR.tools.extend({}, h, {
                                            title: u
                                        }, !0),
                                        E = {
                                            type: "radio",
                                            class: "cke_dialog_ui_radio_input",
                                            name: s,
                                            value: d,
                                            "aria-labelledby": f
                                        },
                                        m = [];
                                    a._.default == d && (E.checked = "checked"), r(h), r(u), "undefined" != typeof h.inputStyle && (h.style = h.inputStyle), h.keyboardFocusable = !0, o.push(new CKEDITOR.ui.dialog.uiElement(t, h, m, "input", null, E)), m.push(" "), new CKEDITOR.ui.dialog.uiElement(t, u, m, "label", null, {
                                        id: f,
                                        for: E.id
                                    }, c[0]), e.push(m.join(""))
                                }
                                return new CKEDITOR.ui.dialog.hbox(t, o, e, i), i.join("")
                            }), this._.children = o
                        }
                    },
                    button: function(t, n, i) {
                        if (arguments.length) {
                            "function" == typeof n && (n = n(t.getParentEditor())), e.call(this, n, {
                                disabled: n.disabled || !1
                            }), CKEDITOR.event.implementOn(this);
                            var o = this;
                            t.on("load", function() {
                                var e = this.getElement();
                                ! function() {
                                    e.on("click", function(e) {
                                        o.click(), e.data.preventDefault()
                                    }), e.on("keydown", function(e) {
                                        e.data.getKeystroke() in {
                                            32: 1
                                        } && (o.click(), e.data.preventDefault())
                                    })
                                }(), e.unselectable()
                            }, this);
                            var a = CKEDITOR.tools.extend({}, n);
                            delete a.style;
                            var r = CKEDITOR.tools.getNextId() + "_label";
                            CKEDITOR.ui.dialog.uiElement.call(this, t, a, i, "a", null, {
                                style: n.style,
                                href: "javascript:void(0)",
                                title: n.label,
                                hidefocus: "true",
                                class: n.class,
                                role: "button",
                                "aria-labelledby": r
                            }, '<span id="' + r + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(n.label) + "</span>")
                        }
                    },
                    select: function(t, n, i) {
                        if (!(arguments.length < 3)) {
                            var o = e.call(this, n);
                            n.validate && (this.validate = n.validate), o.inputId = CKEDITOR.tools.getNextId() + "_select", CKEDITOR.ui.dialog.labeledElement.call(this, t, n, i, function() {
                                var e = CKEDITOR.tools.extend({}, n, {
                                        id: n.id ? n.id + "_select" : CKEDITOR.tools.getNextId() + "_select"
                                    }, !0),
                                    i = [],
                                    a = [],
                                    s = {
                                        id: o.inputId,
                                        class: "cke_dialog_ui_input_select",
                                        "aria-labelledby": this._.labelId
                                    };
                                i.push('<div class="cke_dialog_ui_input_', n.type, '" role="presentation"'), n.width && i.push('style="width:' + n.width + '" '), i.push(">"), void 0 !== n.size && (s.size = n.size), void 0 !== n.multiple && (s.multiple = n.multiple), r(e);
                                for (var l, c = 0; c < n.items.length && (l = n.items[c]); c++) a.push('<option value="', CKEDITOR.tools.htmlEncode(void 0 !== l[1] ? l[1] : l[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(l[0]));
                                return "undefined" != typeof e.inputStyle && (e.style = e.inputStyle), o.select = new CKEDITOR.ui.dialog.uiElement(t, e, i, "select", null, s, a.join("")), i.push("</div>"), i.join("")
                            })
                        }
                    },
                    file: function(t, n, i) {
                        if (!(arguments.length < 3)) {
                            void 0 === n.default && (n.default = "");
                            var o = CKEDITOR.tools.extend(e.call(this, n), {
                                definition: n,
                                buttons: []
                            });
                            n.validate && (this.validate = n.validate), t.on("load", function() {
                                CKEDITOR.document.getById(o.frameId).getParent().addClass("cke_dialog_ui_input_file")
                            }), CKEDITOR.ui.dialog.labeledElement.call(this, t, n, i, function() {
                                o.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                                var e = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', o.frameId, '" title="', n.label, '" src="javascript:void('];
                                return e.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"), e.push(')"></iframe>'), e.join("")
                            })
                        }
                    },
                    fileButton: function(t, n, i) {
                        var o = this;
                        if (!(arguments.length < 3)) {
                            e.call(this, n), n.validate && (this.validate = n.validate);
                            var a = CKEDITOR.tools.extend({}, n),
                                r = a.onClick;
                            a.className = (a.className ? a.className + " " : "") + "cke_dialog_ui_button", a.onClick = function(e) {
                                var i = n.for;
                                r && r.call(this, e) === !1 || (t.getContentElement(i[0], i[1]).submit(), this.disable())
                            }, t.on("load", function() {
                                t.getContentElement(n.for[0], n.for[1])._.buttons.push(o)
                            }), CKEDITOR.ui.dialog.button.call(this, t, a, i)
                        }
                    },
                    html: function() {
                        var e = /^\s*<[\w:]+\s+([^>]*)?>/,
                            t = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                            n = /\/$/;
                        return function(i, o, a) {
                            if (!(arguments.length < 3)) {
                                var r = [],
                                    s = o.html;
                                "<" != s.charAt(0) && (s = "<span>" + s + "</span>");
                                var l = o.focus;
                                if (l) {
                                    var c = this.focus;
                                    this.focus = function() {
                                        ("function" == typeof l ? l : c).call(this), this.fire("focus")
                                    }, o.isFocusable && (this.isFocusable = this.isFocusable), this.keyboardFocusable = !0
                                }
                                CKEDITOR.ui.dialog.uiElement.call(this, i, o, r, "span", null, null, ""), r = r.join("").match(e), s = s.match(t) || ["", "", ""], n.test(s[1]) && (s[1] = s[1].slice(0, -1), s[2] = "/" + s[2]), a.push([s[1], " ", r[1] || "", s[2]].join(""))
                            }
                        }
                    }(),
                    fieldset: function(e, t, n, i, o) {
                        var a = o.label;
                        this._ = {
                            children: t
                        }, CKEDITOR.ui.dialog.uiElement.call(this, e, o, i, "fieldset", null, null, function() {
                            var e = [];
                            a && e.push("<legend" + (o.labelStyle ? ' style="' + o.labelStyle + '"' : "") + ">" + a + "</legend>");
                            for (var t = 0; t < n.length; t++) e.push(n[t]);
                            return e.join("")
                        })
                    }
                }, !0), CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement, CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    setLabel: function(e) {
                        var t = CKEDITOR.document.getById(this._.labelId);
                        return t.getChildCount() < 1 ? new CKEDITOR.dom.text(e, CKEDITOR.document).appendTo(t) : t.getChild(0).$.nodeValue = e, this
                    },
                    getLabel: function() {
                        var e = CKEDITOR.document.getById(this._.labelId);
                        return !e || e.getChildCount() < 1 ? "" : e.getChild(0).getText()
                    },
                    eventProcessors: o
                }, !0), CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    click: function() {
                        return !this._.disabled && this.fire("click", {
                            dialog: this._.dialog
                        })
                    },
                    enable: function() {
                        this._.disabled = !1;
                        var e = this.getElement();
                        e && e.removeClass("cke_disabled")
                    },
                    disable: function() {
                        this._.disabled = !0, this.getElement().addClass("cke_disabled")
                    },
                    isVisible: function() {
                        return this.getElement().getFirst().isVisible()
                    },
                    isEnabled: function() {
                        return !this._.disabled
                    },
                    eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                        onClick: function(e, t) {
                            this.on("click", function() {
                                t.apply(this, arguments)
                            })
                        }
                    }, !0),
                    accessKeyUp: function() {
                        this.click()
                    },
                    accessKeyDown: function() {
                        this.focus()
                    },
                    keyboardFocusable: !0
                }, !0), CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                    getInputElement: function() {
                        return CKEDITOR.document.getById(this._.inputId)
                    },
                    focus: function() {
                        var e = this.selectParentTab();
                        setTimeout(function() {
                            var t = e.getInputElement();
                            t && t.$.focus()
                        }, 0)
                    },
                    select: function() {
                        var e = this.selectParentTab();
                        setTimeout(function() {
                            var t = e.getInputElement();
                            t && (t.$.focus(), t.$.select())
                        }, 0)
                    },
                    accessKeyUp: function() {
                        this.select()
                    },
                    setValue: function(e) {
                        if (this.bidi) {
                            var t = e && e.charAt(0);
                            (t = "‪" == t ? "ltr" : "‫" == t ? "rtl" : null) && (e = e.slice(1)), this.setDirectionMarker(t)
                        }
                        return e || (e = ""), CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
                    },
                    getValue: function() {
                        var e = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
                        if (this.bidi && e) {
                            var t = this.getDirectionMarker();
                            t && (e = ("ltr" == t ? "‪" : "‫") + e)
                        }
                        return e
                    },
                    setDirectionMarker: function(e) {
                        var t = this.getInputElement();
                        e ? t.setAttributes({
                            dir: e,
                            "data-cke-dir-marker": e
                        }) : this.getDirectionMarker() && t.removeAttributes(["dir", "data-cke-dir-marker"])
                    },
                    getDirectionMarker: function() {
                        return this.getInputElement().data("cke-dir-marker")
                    },
                    keyboardFocusable: !0
                }, i, !0), CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput, CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                    getInputElement: function() {
                        return this._.select.getElement()
                    },
                    add: function(e, t, n) {
                        var i = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
                            o = this.getInputElement().$;
                        return i.$.text = e, i.$.value = void 0 === t || null === t ? e : t, void 0 === n || null === n ? CKEDITOR.env.ie ? o.add(i.$) : o.add(i.$, null) : o.add(i.$, n), this
                    },
                    remove: function(e) {
                        return this.getInputElement().$.remove(e), this
                    },
                    clear: function() {
                        for (var e = this.getInputElement().$; e.length > 0;) e.remove(0);
                        return this
                    },
                    keyboardFocusable: !0
                }, i, !0), CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    getInputElement: function() {
                        return this._.checkbox.getElement()
                    },
                    setValue: function(e, t) {
                        this.getInputElement().$.checked = e, !t && this.fire("change", {
                            value: e
                        })
                    },
                    getValue: function() {
                        return this.getInputElement().$.checked
                    },
                    accessKeyUp: function() {
                        this.setValue(!this.getValue())
                    },
                    eventProcessors: {
                        onChange: function(e, t) {
                            return !CKEDITOR.env.ie || CKEDITOR.env.version > 8 ? o.onChange.apply(this, arguments) : (e.on("load", function() {
                                var e = this._.checkbox.getElement();
                                e.on("propertychange", function(t) {
                                    t = t.data.$, "checked" == t.propertyName && this.fire("change", {
                                        value: e.$.checked
                                    })
                                }, this)
                            }, this), this.on("change", t), null)
                        }
                    },
                    keyboardFocusable: !0
                }, i, !0), CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    setValue: function(e, t) {
                        for (var n, i = this._.children, o = 0; o < i.length && (n = i[o]); o++) n.getElement().$.checked = n.getValue() == e;
                        !t && this.fire("change", {
                            value: e
                        })
                    },
                    getValue: function() {
                        for (var e = this._.children, t = 0; t < e.length; t++)
                            if (e[t].getElement().$.checked) return e[t].getValue();
                        return null
                    },
                    accessKeyUp: function() {
                        var e, t = this._.children;
                        for (e = 0; e < t.length; e++)
                            if (t[e].getElement().$.checked) return void t[e].getElement().focus();
                        t[0].getElement().focus()
                    },
                    eventProcessors: {
                        onChange: function(e, t) {
                            return !CKEDITOR.env.ie || CKEDITOR.env.version > 8 ? o.onChange.apply(this, arguments) : (e.on("load", function() {
                                for (var e = this._.children, t = this, n = 0; n < e.length; n++) e[n].getElement().on("propertychange", function(e) {
                                    e = e.data.$, "checked" == e.propertyName && this.$.checked && t.fire("change", {
                                        value: this.getAttribute("value")
                                    })
                                })
                            }, this), this.on("change", t), null)
                        }
                    }
                }, i, !0), CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, i, {
                    getInputElement: function() {
                        var e = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                        return e.$.forms.length > 0 ? new CKEDITOR.dom.element(e.$.forms[0].elements[0]) : this.getElement()
                    },
                    submit: function() {
                        return this.getInputElement().getParent().$.submit(), this
                    },
                    getAction: function() {
                        return this.getInputElement().getParent().$.action
                    },
                    registerEvents: function(e) {
                        var t, n, i = /^on([A-Z]\w+)/,
                            o = function(e, t, n, i) {
                                e.on("formLoaded", function() {
                                    e.getInputElement().on(n, i, e)
                                })
                            };
                        for (n in e)(t = n.match(i)) && (this.eventProcessors[n] ? this.eventProcessors[n].call(this, this._.dialog, e[n]) : o(this, this._.dialog, t[1].toLowerCase(), e[n]));
                        return this
                    },
                    reset: function() {
                        function e() {
                            n.$.open();
                            var e = "";
                            i.size && (e = i.size - (CKEDITOR.env.ie ? 7 : 0));
                            var c = t.frameId + "_input";
                            for (n.$.write(['<html dir="' + s + '" lang="' + l + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + s + '" lang="' + l + '" action="', CKEDITOR.tools.htmlEncode(i.action), '"><label id="', t.labelId, '" for="', c, '" style="display:none">', CKEDITOR.tools.htmlEncode(i.label), '</label><input style="width:100%" id="', c, '" aria-labelledby="', t.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(i.id || "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(e > 0 ? e : ""), '" /></form></body></html><script>', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + a + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + r + ")}", "</script>"].join("")), n.$.close(), e = 0; e < o.length; e++) o[e].enable()
                        }
                        var t = this._,
                            n = CKEDITOR.document.getById(t.frameId).getFrameDocument(),
                            i = t.definition,
                            o = t.buttons,
                            a = this.formLoadedNumber,
                            r = this.formUnloadNumber,
                            s = t.dialog._.editor.lang.dir,
                            l = t.dialog._.editor.langCode;
                        a || (a = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() {
                            this.fire("formLoaded")
                        }, this), r = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() {
                            this.getInputElement().clearCustomData()
                        }, this), this.getDialog()._.editor.on("destroy", function() {
                            CKEDITOR.tools.removeFunction(a), CKEDITOR.tools.removeFunction(r)
                        })), CKEDITOR.env.gecko ? setTimeout(e, 500) : e()
                    },
                    getValue: function() {
                        return this.getInputElement().$.value || ""
                    },
                    setInitValue: function() {
                        this._.initValue = ""
                    },
                    eventProcessors: {
                        onChange: function(e, t) {
                            this._.domOnChangeRegistered || (this.on("formLoaded", function() {
                                this.getInputElement().on("change", function() {
                                    this.fire("change", {
                                        value: this.getValue()
                                    })
                                }, this)
                            }, this), this._.domOnChangeRegistered = !0), this.on("change", t)
                        }
                    },
                    keyboardFocusable: !0
                }, !0), CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button, CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype), CKEDITOR.dialog.addUIElement("text", t), CKEDITOR.dialog.addUIElement("password", t), CKEDITOR.dialog.addUIElement("textarea", n), CKEDITOR.dialog.addUIElement("checkbox", n), CKEDITOR.dialog.addUIElement("radio", n), CKEDITOR.dialog.addUIElement("button", n), CKEDITOR.dialog.addUIElement("select", n), CKEDITOR.dialog.addUIElement("file", n), CKEDITOR.dialog.addUIElement("fileButton", n), CKEDITOR.dialog.addUIElement("html", n), CKEDITOR.dialog.addUIElement("fieldset", {
                    build: function(e, t, n) {
                        for (var i, o = t.children, a = [], r = [], s = 0; s < o.length && (i = o[s]); s++) {
                            var l = [];
                            a.push(l), r.push(CKEDITOR.dialog._.uiElementBuilders[i.type].build(e, i, l))
                        }
                        return new CKEDITOR.ui.dialog[t.type](e, r, a, n, t)
                    }
                })
            }
        }), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, CKEDITOR.DIALOG_RESIZE_BOTH = 3, CKEDITOR.DIALOG_STATE_IDLE = 1, CKEDITOR.DIALOG_STATE_BUSY = 2, function() {
            function e() {
                for (var e = this._.tabIdList.length, t = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + e, n = t - 1; n > t - e; n--)
                    if (this._.tabs[this._.tabIdList[n % e]][0].$.offsetHeight) return this._.tabIdList[n % e];
                return null
            }

            function t() {
                for (var e = this._.tabIdList.length, t = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), n = t + 1; n < t + e; n++)
                    if (this._.tabs[this._.tabIdList[n % e]][0].$.offsetHeight) return this._.tabIdList[n % e];
                return null
            }

            function n(e, t) {
                for (var n = e.$.getElementsByTagName("input"), i = 0, o = n.length; i < o; i++) {
                    var a = new CKEDITOR.dom.element(n[i]);
                    "text" == a.getAttribute("type").toLowerCase() && (t ? (a.setAttribute("value", a.getCustomData("fake_value") || ""), a.removeCustomData("fake_value")) : (a.setCustomData("fake_value", a.getAttribute("value")), a.setAttribute("value", "")))
                }
            }

            function i(e, t) {
                var n = this.getInputElement();
                n && (e ? n.removeAttribute("aria-invalid") : n.setAttribute("aria-invalid", !0)), e || (this.select ? this.select() : this.focus()), t && alert(t), this.fire("validated", {
                    valid: e,
                    msg: t
                })
            }

            function o() {
                var e = this.getInputElement();
                e && e.removeAttribute("aria-invalid")
            }

            function a(e) {
                var t = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", m).output({
                        id: CKEDITOR.tools.getNextNumber(),
                        editorId: e.id,
                        langDir: e.lang.dir,
                        langCode: e.langCode,
                        editorDialogClass: "cke_editor_" + e.name.replace(/\./g, "\\.") + "_dialog",
                        closeTitle: e.lang.common.close,
                        hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
                    })),
                    n = t.getChild([0, 0, 0, 0, 0]),
                    i = n.getChild(0),
                    o = n.getChild(1);
                return e.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(n), !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (e = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + e + '" tabIndex="-1"></iframe>').appendTo(n.getParent())), i.unselectable(), o.unselectable(), {
                    element: t,
                    parts: {
                        dialog: t.getChild(0),
                        title: i,
                        close: o,
                        tabs: n.getChild(2),
                        contents: n.getChild([3, 0, 0, 0]),
                        footer: n.getChild([3, 0, 1, 0])
                    }
                }
            }

            function r(e, t, n) {
                this.element = t, this.focusIndex = n, this.tabIndex = 0, this.isFocusable = function() {
                    return !t.getAttribute("disabled") && t.isVisible()
                }, this.focus = function() {
                    e._.currentFocusIndex = this.focusIndex, this.element.focus()
                }, t.on("keydown", function(e) {
                    e.data.getKeystroke() in {
                        32: 1,
                        13: 1
                    } && this.fire("click")
                }), t.on("focus", function() {
                    this.fire("mouseover")
                }), t.on("blur", function() {
                    this.fire("mouseout")
                })
            }

            function s(e) {
                function t() {
                    e.layout()
                }
                var n = CKEDITOR.document.getWindow();
                n.on("resize", t), e.on("hide", function() {
                    n.removeListener("resize", t)
                })
            }

            function l(e, t) {
                this._ = {
                    dialog: e
                }, CKEDITOR.tools.extend(this, t)
            }

            function c(e) {
                function t(t) {
                    var n = e.getSize(),
                        l = CKEDITOR.document.getWindow().getViewPaneSize(),
                        c = t.data.$.screenX,
                        u = t.data.$.screenY,
                        d = c - i.x,
                        h = u - i.y;
                    i = {
                        x: c,
                        y: u
                    }, o.x = o.x + d, o.y = o.y + h, e.move(o.x + s[3] < r ? -s[3] : o.x - s[1] > l.width - n.width - r ? l.width - n.width + ("rtl" == a.lang.dir ? 0 : s[1]) : o.x, o.y + s[0] < r ? -s[0] : o.y - s[2] > l.height - n.height - r ? l.height - n.height + s[2] : o.y, 1), t.data.preventDefault()
                }

                function n() {
                    if (CKEDITOR.document.removeListener("mousemove", t), CKEDITOR.document.removeListener("mouseup", n), CKEDITOR.env.ie6Compat) {
                        var e = D.getChild(0).getFrameDocument();
                        e.removeListener("mousemove", t), e.removeListener("mouseup", n)
                    }
                }
                var i = null,
                    o = null,
                    a = e.getParentEditor(),
                    r = a.config.dialog_magnetDistance,
                    s = CKEDITOR.skin.margins || [0, 0, 0, 0];
                "undefined" == typeof r && (r = 20), e.parts.title.on("mousedown", function(a) {
                    if (i = {
                            x: a.data.$.screenX,
                            y: a.data.$.screenY
                        }, CKEDITOR.document.on("mousemove", t), CKEDITOR.document.on("mouseup", n), o = e.getPosition(), CKEDITOR.env.ie6Compat) {
                        var r = D.getChild(0).getFrameDocument();
                        r.on("mousemove", t), r.on("mouseup", n)
                    }
                    a.data.preventDefault()
                }, e)
            }

            function u(e) {
                function t(t) {
                    var n = "rtl" == h.lang.dir,
                        d = u.width,
                        f = u.height,
                        E = d + (t.data.$.screenX - i) * (n ? -1 : 1) * (e._.moved ? 1 : 2),
                        m = f + (t.data.$.screenY - o) * (e._.moved ? 1 : 2),
                        g = e._.element.getFirst(),
                        g = n && g.getComputedStyle("right"),
                        p = e.getPosition();
                    p.y + m > c.height && (m = c.height - p.y), (n ? g : p.x) + E > c.width && (E = c.width - (n ? g : p.x)), r != CKEDITOR.DIALOG_RESIZE_WIDTH && r != CKEDITOR.DIALOG_RESIZE_BOTH || (d = Math.max(a.minWidth || 0, E - s)), r != CKEDITOR.DIALOG_RESIZE_HEIGHT && r != CKEDITOR.DIALOG_RESIZE_BOTH || (f = Math.max(a.minHeight || 0, m - l)), e.resize(d, f), e._.moved || e.layout(), t.data.preventDefault()
                }

                function n() {
                    if (CKEDITOR.document.removeListener("mouseup", n), CKEDITOR.document.removeListener("mousemove", t), d && (d.remove(), d = null), CKEDITOR.env.ie6Compat) {
                        var e = D.getChild(0).getFrameDocument();
                        e.removeListener("mouseup", n), e.removeListener("mousemove", t)
                    }
                }
                var i, o, a = e.definition,
                    r = a.resizable;
                if (r != CKEDITOR.DIALOG_RESIZE_NONE) {
                    var s, l, c, u, d, h = e.getParentEditor(),
                        f = CKEDITOR.tools.addFunction(function(a) {
                            u = e.getSize();
                            var r = e.parts.contents;
                            r.$.getElementsByTagName("iframe").length && (d = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>'), r.append(d)), l = u.height - e.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks)), s = u.width - e.parts.contents.getSize("width", 1), i = a.screenX, o = a.screenY, c = CKEDITOR.document.getWindow().getViewPaneSize(), CKEDITOR.document.on("mousemove", t), CKEDITOR.document.on("mouseup", n), CKEDITOR.env.ie6Compat && (r = D.getChild(0).getFrameDocument(), r.on("mousemove", t), r.on("mouseup", n)), a.preventDefault && a.preventDefault()
                        });
                    e.on("load", function() {
                        var t = "";
                        r == CKEDITOR.DIALOG_RESIZE_WIDTH ? t = " cke_resizer_horizontal" : r == CKEDITOR.DIALOG_RESIZE_HEIGHT && (t = " cke_resizer_vertical"), t = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + t + " cke_resizer_" + h.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(h.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + f + ', event )">' + ("ltr" == h.lang.dir ? "◢" : "◣") + "</div>"), e.parts.footer.append(t, 1)
                    }), h.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(f)
                    })
                }
            }

            function d(e) {
                e.data.preventDefault(1)
            }

            function h(e) {
                var t = CKEDITOR.document.getWindow(),
                    n = e.config,
                    i = n.dialog_backgroundCoverColor || "white",
                    o = n.dialog_backgroundCoverOpacity,
                    a = n.dialogZIndex,
                    n = CKEDITOR.tools.genKey(i, o, a),
                    r = R[n];
                r ? r.show() : (a = ['<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", a, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + i, '" class="cke_dialog_background_cover">'], CKEDITOR.env.ie6Compat && (i = "<html><body style=\\'background-color:" + i + ";\\'></body></html>", a.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:'), a.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + i + "' );document.close();") + "})())"), a.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')), a.push("</div>"), r = CKEDITOR.dom.element.createFromHtml(a.join("")), r.setOpacity(void 0 !== o ? o : .5), r.on("keydown", d), r.on("keypress", d), r.on("keyup", d), r.appendTo(CKEDITOR.document.getBody()), R[n] = r), e.focusManager.add(r), D = r;
                var e = function() {
                        var e = t.getViewPaneSize();
                        r.setStyles({
                            width: e.width + "px",
                            height: e.height + "px"
                        })
                    },
                    s = function() {
                        var e = t.getScrollPosition(),
                            n = CKEDITOR.dialog._.currentTop;
                        if (r.setStyles({
                                left: e.x + "px",
                                top: e.y + "px"
                            }), n)
                            do e = n.getPosition(), n.move(e.x, e.y); while (n = n._.parentDialog)
                    };
                if (O = e, t.on("resize", e), e(), (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && r.focus(), CKEDITOR.env.ie6Compat) {
                    var l = function() {
                        s(), arguments.callee.prevScrollHandler.apply(this, arguments)
                    };
                    t.$.setTimeout(function() {
                        l.prevScrollHandler = window.onscroll || function() {}, window.onscroll = l
                    }, 0), s()
                }
            }

            function f(e) {
                D && (e.focusManager.remove(D), e = CKEDITOR.document.getWindow(), D.hide(), e.removeListener("resize", O), CKEDITOR.env.ie6Compat && e.$.setTimeout(function() {
                    window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
                }, 0), O = null)
            }
            var E = CKEDITOR.tools.cssLength,
                m = '<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
            CKEDITOR.dialog = function(n, r) {
                function s() {
                    var e = R._.focusList;
                    e.sort(function(e, t) {
                        return e.tabIndex != t.tabIndex ? t.tabIndex - e.tabIndex : e.focusIndex - t.focusIndex
                    });
                    for (var t = e.length, n = 0; n < t; n++) e[n].focusIndex = n
                }

                function l(e) {
                    var t = R._.focusList,
                        e = e || 0;
                    if (!(t.length < 1)) {
                        var n = R._.currentFocusIndex;
                        R._.tabBarMode && e < 0 && (n = 0);
                        try {
                            t[n].getInputElement().$.blur()
                        } catch (e) {}
                        var i = n,
                            o = R._.pageCount > 1;
                        do {
                            if (i += e, o && !R._.tabBarMode && (i == t.length || i == -1)) return R._.tabBarMode = !0, R._.tabs[R._.currentTabId][0].focus(), void(R._.currentFocusIndex = -1);
                            if (i = (i + t.length) % t.length, i == n) break
                        } while (e && !t[i].isFocusable());
                        t[i].focus(), "text" == t[i].type && t[i].select()
                    }
                }

                function d(i) {
                    if (R == CKEDITOR.dialog._.currentTop) {
                        var o = i.data.getKeystroke(),
                            a = "rtl" == n.lang.dir,
                            r = [37, 38, 39, 40];
                        if (f = E = 0, 9 == o || o == CKEDITOR.SHIFT + 9) l(o == CKEDITOR.SHIFT + 9 ? -1 : 1), f = 1;
                        else if (o == CKEDITOR.ALT + 121 && !R._.tabBarMode && R.getPageCount() > 1) R._.tabBarMode = !0, R._.tabs[R._.currentTabId][0].focus(), R._.currentFocusIndex = -1, f = 1;
                        else if (CKEDITOR.tools.indexOf(r, o) != -1 && R._.tabBarMode) o = CKEDITOR.tools.indexOf([a ? 39 : 37, 38], o) != -1 ? e.call(R) : t.call(R), R.selectPage(o), R._.tabs[o][0].focus(), f = 1;
                        else if (13 != o && 32 != o || !R._.tabBarMode)
                            if (13 == o) o = i.data.getTarget(), o.is("a", "button", "select", "textarea") || o.is("input") && "button" == o.$.type || ((o = this.getButton("ok")) && CKEDITOR.tools.setTimeout(o.click, 0, o), f = 1), E = 1;
                            else {
                                if (27 != o) return;
                                (o = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(o.click, 0, o): this.fire("cancel", {
                                    hide: !0
                                }).hide !== !1 && this.hide(), E = 1
                            }
                        else this.selectPage(this._.currentTabId), this._.tabBarMode = !1, this._.currentFocusIndex = -1, l(1), f = 1;
                        h(i)
                    }
                }

                function h(e) {
                    f ? e.data.preventDefault(1) : E && e.data.stopPropagation()
                }
                var f, E, m = CKEDITOR.dialog._.dialogDefinitions[r],
                    p = CKEDITOR.tools.clone(g),
                    T = n.config.dialog_buttonsOrder || "OS",
                    C = n.lang.dir,
                    O = {};
                if (("OS" == T && CKEDITOR.env.mac || "rtl" == T && "ltr" == C || "ltr" == T && "rtl" == C) && p.buttons.reverse(), m = CKEDITOR.tools.extend(m(n), p), m = CKEDITOR.tools.clone(m), m = new I(this, m), p = a(n), this._ = {
                        editor: n,
                        element: p.element,
                        name: r,
                        contentSize: {
                            width: 0,
                            height: 0
                        },
                        size: {
                            width: 0,
                            height: 0
                        },
                        contents: {},
                        buttons: {},
                        accessKeyMap: {},
                        tabs: {},
                        tabIdList: [],
                        currentTabId: null,
                        currentTabIndex: null,
                        pageCount: 0,
                        lastTab: null,
                        tabBarMode: !1,
                        focusList: [],
                        currentFocusIndex: 0,
                        hasFocus: !1
                    }, this.parts = p.parts, CKEDITOR.tools.setTimeout(function() {
                        n.fire("ariaWidget", this.parts.contents)
                    }, 0, this), p = {
                        position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
                        top: 0,
                        visibility: "hidden"
                    }, p["rtl" == C ? "right" : "left"] = 0, this.parts.dialog.setStyles(p), CKEDITOR.event.call(this), this.definition = m = CKEDITOR.fire("dialogDefinition", {
                        name: r,
                        definition: m
                    }, n).definition, !("removeDialogTabs" in n._) && n.config.removeDialogTabs) {
                    for (p = n.config.removeDialogTabs.split(";"), C = 0; C < p.length; C++)
                        if (T = p[C].split(":"), 2 == T.length) {
                            var D = T[0];
                            O[D] || (O[D] = []), O[D].push(T[1])
                        } n._.removeDialogTabs = O
                }
                if (n._.removeDialogTabs && (O = n._.removeDialogTabs[r]))
                    for (C = 0; C < O.length; C++) m.removeContents(O[C]);
                m.onLoad && this.on("load", m.onLoad), m.onShow && this.on("show", m.onShow), m.onHide && this.on("hide", m.onHide), m.onOk && this.on("ok", function(e) {
                    n.fire("saveSnapshot"), setTimeout(function() {
                        n.fire("saveSnapshot")
                    }, 0), m.onOk.call(this, e) === !1 && (e.data.hide = !1)
                }), this.state = CKEDITOR.DIALOG_STATE_IDLE, m.onCancel && this.on("cancel", function(e) {
                    m.onCancel.call(this, e) === !1 && (e.data.hide = !1)
                }), m.onRemove && this.on("remove", function(e) {
                    m.onRemove.call(this, e) === !1 && (e.data.hide = !1)
                });
                var R = this,
                    v = function(e) {
                        var t, n = R._.contents,
                            i = !1;
                        for (t in n)
                            for (var o in n[t])
                                if (i = e.call(this, n[t][o])) return
                    };
                this.on("ok", function(e) {
                    v(function(t) {
                        if (t.validate) {
                            var n = t.validate(this),
                                o = "string" == typeof n || n === !1;
                            return o && (e.data.hide = !1, e.stop()), i.call(t, !o, "string" == typeof n ? n : void 0), o
                        }
                    })
                }, this, null, 0), this.on("cancel", function(e) {
                    v(function(t) {
                        if (t.isChanged()) return n.config.dialog_noConfirmCancel || confirm(n.lang.common.confirmCancel) || (e.data.hide = !1), !0
                    })
                }, this, null, 0), this.parts.close.on("click", function(e) {
                    this.fire("cancel", {
                        hide: !0
                    }).hide !== !1 && this.hide(), e.data.preventDefault()
                }, this), this.changeFocus = l;
                var b = this._.element;
                for (n.focusManager.add(b, 1), this.on("show", function() {
                        b.on("keydown", d, this), CKEDITOR.env.gecko && b.on("keypress", h, this)
                    }), this.on("hide", function() {
                        b.removeListener("keydown", d), CKEDITOR.env.gecko && b.removeListener("keypress", h), v(function(e) {
                            o.apply(e)
                        })
                    }), this.on("iframeAdded", function(e) {
                        new CKEDITOR.dom.document(e.data.iframe.$.contentWindow.document).on("keydown", d, this, null, 0)
                    }), this.on("show", function() {
                        s();
                        var e = R._.pageCount > 1;
                        n.config.dialog_startupFocusTab && e ? (R._.tabBarMode = !0, R._.tabs[R._.currentTabId][0].focus(), R._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = e ? -1 : this._.focusList.length - 1, m.onFocus ? (e = m.onFocus.call(this)) && e.focus() : l(1))
                    }, this, null, 4294967295), CKEDITOR.env.ie6Compat && this.on("load", function() {
                        var e = this.getElement(),
                            t = e.getFirst();
                        t.remove(), t.appendTo(e)
                    }, this), c(this), u(this), new CKEDITOR.dom.text(m.title, CKEDITOR.document).appendTo(this.parts.title), C = 0; C < m.contents.length; C++)(O = m.contents[C]) && this.addPage(O);
                for (this.parts.tabs.on("click", function(e) {
                        var t = e.data.getTarget();
                        t.hasClass("cke_dialog_tab") && (t = t.$.id, this.selectPage(t.substring(4, t.lastIndexOf("_"))), this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, l(1)), e.data.preventDefault())
                    }, this), C = [], O = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
                        type: "hbox",
                        className: "cke_dialog_footer_buttons",
                        widths: [],
                        children: m.buttons
                    }, C).getChild(), this.parts.footer.setHtml(C.join("")), C = 0; C < O.length; C++) this._.buttons[O[C].id] = O[C]
            }, CKEDITOR.dialog.prototype = {
                destroy: function() {
                    this.hide(), this._.element.remove()
                },
                resize: function() {
                    return function(e, t) {
                        this._.contentSize && this._.contentSize.width == e && this._.contentSize.height == t || (CKEDITOR.dialog.fire("resize", {
                            dialog: this,
                            width: e,
                            height: t
                        }, this._.editor), this.fire("resize", {
                            width: e,
                            height: t
                        }, this._.editor), this.parts.contents.setStyles({
                            width: e + "px",
                            height: t + "px"
                        }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = {
                            width: e,
                            height: t
                        })
                    }
                }(),
                getSize: function() {
                    var e = this._.element.getFirst();
                    return {
                        width: e.$.offsetWidth || 0,
                        height: e.$.offsetHeight || 0
                    }
                },
                move: function(e, t, n) {
                    var i = this._.element.getFirst(),
                        o = "rtl" == this._.editor.lang.dir,
                        a = "fixed" == i.getComputedStyle("position");
                    CKEDITOR.env.ie && i.setStyle("zoom", "100%"), a && this._.position && this._.position.x == e && this._.position.y == t || (this._.position = {
                        x: e,
                        y: t
                    }, a || (a = CKEDITOR.document.getWindow().getScrollPosition(), e += a.x, t += a.y), o && (a = this.getSize(), e = CKEDITOR.document.getWindow().getViewPaneSize().width - a.width - e), t = {
                        top: (t > 0 ? t : 0) + "px"
                    }, t[o ? "right" : "left"] = (e > 0 ? e : 0) + "px", i.setStyles(t), n && (this._.moved = 1))
                },
                getPosition: function() {
                    return CKEDITOR.tools.extend({}, this._.position)
                },
                show: function() {
                    var e = this._.element,
                        t = this.definition;
                    e.getParent() && e.getParent().equals(CKEDITOR.document.getBody()) ? e.setStyle("display", "block") : e.appendTo(CKEDITOR.document.getBody()), this.resize(this._.contentSize && this._.contentSize.width || t.width || t.minWidth, this._.contentSize && this._.contentSize.height || t.height || t.minHeight), this.reset(), this.selectPage(this.definition.contents[0].id), null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.dialogZIndex), this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex + 10), null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, h(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.dialogZIndex / 2), CKEDITOR.dialog._.currentTop = this), e.on("keydown", b), e.on("keyup", K), this._.hasFocus = !1;
                    for (var n in t.contents)
                        if (t.contents[n]) {
                            var e = t.contents[n],
                                i = this._.tabs[e.id],
                                o = e.requiredContent,
                                a = 0;
                            if (i) {
                                for (var r in this._.contents[e.id]) {
                                    var l = this._.contents[e.id][r];
                                    "hbox" != l.type && "vbox" != l.type && l.getInputElement() && (l.requiredContent && !this._.editor.activeFilter.check(l.requiredContent) ? l.disable() : (l.enable(), a++))
                                }!a || o && !this._.editor.activeFilter.check(o) ? i[0].addClass("cke_dialog_tab_disabled") : i[0].removeClass("cke_dialog_tab_disabled")
                            }
                        } CKEDITOR.tools.setTimeout(function() {
                        this.layout(), s(this), this.parts.dialog.setStyle("visibility", ""), this.fireOnce("load", {}), CKEDITOR.ui.fire("ready", this), this.fire("show", {}), this._.editor.fire("dialogShow", this), this._.parentDialog || this._.editor.focusManager.lock(), this.foreach(function(e) {
                            e.setInitValue && e.setInitValue()
                        })
                    }, 100, this)
                },
                layout: function() {
                    var e = this.parts.dialog,
                        t = this.getSize(),
                        n = CKEDITOR.document.getWindow().getViewPaneSize(),
                        i = (n.width - t.width) / 2,
                        o = (n.height - t.height) / 2;
                    CKEDITOR.env.ie6Compat || (t.height + (o > 0 ? o : 0) > n.height || t.width + (i > 0 ? i : 0) > n.width ? e.setStyle("position", "absolute") : e.setStyle("position", "fixed")), this.move(this._.moved ? this._.position.x : i, this._.moved ? this._.position.y : o)
                },
                foreach: function(e) {
                    for (var t in this._.contents)
                        for (var n in this._.contents[t]) e.call(this, this._.contents[t][n]);
                    return this
                },
                reset: function() {
                    var e = function(e) {
                        e.reset && e.reset(1)
                    };
                    return function() {
                        return this.foreach(e), this
                    }
                }(),
                setupContent: function() {
                    var e = arguments;
                    this.foreach(function(t) {
                        t.setup && t.setup.apply(t, e)
                    })
                },
                commitContent: function() {
                    var e = arguments;
                    this.foreach(function(t) {
                        CKEDITOR.env.ie && this._.currentFocusIndex == t.focusIndex && t.getInputElement().$.blur(), t.commit && t.commit.apply(t, e)
                    })
                },
                hide: function() {
                    if (this.parts.dialog.isVisible()) {
                        this.fire("hide", {}), this._.editor.fire("dialogHide", this), this.selectPage(this._.tabIdList[0]);
                        var e = this._.element;
                        for (e.setStyle("display", "none"), this.parts.dialog.setStyle("visibility", "hidden"), y(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
                        if (this._.parentDialog) {
                            var t = this._.parentDialog.getElement().getFirst();
                            t.setStyle("z-index", parseInt(t.$.style.zIndex, 10) + Math.floor(this._.editor.config.dialogZIndex / 2))
                        } else f(this._.editor);
                        if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex - 10;
                        else {
                            CKEDITOR.dialog._.currentZIndex = null, e.removeListener("keydown", b), e.removeListener("keyup", K);
                            var n = this._.editor;
                            n.focus(), setTimeout(function() {
                                n.focusManager.unlock(), CKEDITOR.env.iOS && n.window.focus()
                            }, 0)
                        }
                        delete this._.parentDialog, this.foreach(function(e) {
                            e.resetInitValue && e.resetInitValue()
                        }), this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                    }
                },
                addPage: function(e) {
                    if (!e.requiredContent || this._.editor.filter.check(e.requiredContent)) {
                        for (var t = [], n = e.label ? ' title="' + CKEDITOR.tools.htmlEncode(e.label) + '"' : "", i = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                                type: "vbox",
                                className: "cke_dialog_page_contents",
                                children: e.elements,
                                expand: !!e.expand,
                                padding: e.padding,
                                style: e.style || "width: 100%;"
                            }, t), o = this._.contents[e.id] = {}, a = i.getChild(), r = 0; i = a.shift();) !i.notAllowed && "hbox" != i.type && "vbox" != i.type && r++, o[i.id] = i, "function" == typeof i.getChild && a.push.apply(a, i.getChild());
                        r || (e.hidden = !0), t = CKEDITOR.dom.element.createFromHtml(t.join("")), t.setAttribute("role", "tabpanel"), i = CKEDITOR.env, o = "cke_" + e.id + "_" + CKEDITOR.tools.getNextNumber(), n = CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"', this._.pageCount > 0 ? " cke_last" : "cke_first", n, e.hidden ? ' style="display:none"' : "", ' id="', o, '"', i.gecko && !i.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', e.label, "</a>"].join("")), t.setAttribute("aria-labelledby", o), this._.tabs[e.id] = [n, t], this._.tabIdList.push(e.id), !e.hidden && this._.pageCount++, this._.lastTab = n, this.updateStyle(), t.setAttribute("name", e.id), t.appendTo(this.parts.contents), n.unselectable(), this.parts.tabs.append(n), e.accessKey && (_(this, this, "CTRL+" + e.accessKey, N, k), this._.accessKeyMap["CTRL+" + e.accessKey] = e.id)
                    }
                },
                selectPage: function(e) {
                    if (this._.currentTabId != e && !this._.tabs[e][0].hasClass("cke_dialog_tab_disabled") && this.fire("selectPage", {
                            page: e,
                            currentPage: this._.currentTabId
                        }) !== !1) {
                        for (var t in this._.tabs) {
                            var i = this._.tabs[t][0],
                                o = this._.tabs[t][1];
                            t != e && (i.removeClass("cke_dialog_tab_selected"), o.hide()), o.setAttribute("aria-hidden", t != e)
                        }
                        var a = this._.tabs[e];
                        a[0].addClass("cke_dialog_tab_selected"), CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (n(a[1]), a[1].show(), setTimeout(function() {
                            n(a[1], 1)
                        }, 0)) : a[1].show(), this._.currentTabId = e, this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, e)
                    }
                },
                updateStyle: function() {
                    this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page")
                },
                hidePage: function(t) {
                    var n = this._.tabs[t] && this._.tabs[t][0];
                    n && 1 != this._.pageCount && n.isVisible() && (t == this._.currentTabId && this.selectPage(e.call(this)), n.hide(), this._.pageCount--, this.updateStyle())
                },
                showPage: function(e) {
                    (e = this._.tabs[e] && this._.tabs[e][0]) && (e.show(), this._.pageCount++, this.updateStyle())
                },
                getElement: function() {
                    return this._.element
                },
                getName: function() {
                    return this._.name
                },
                getContentElement: function(e, t) {
                    var n = this._.contents[e];
                    return n && n[t]
                },
                getValueOf: function(e, t) {
                    return this.getContentElement(e, t).getValue()
                },
                setValueOf: function(e, t, n) {
                    return this.getContentElement(e, t).setValue(n)
                },
                getButton: function(e) {
                    return this._.buttons[e]
                },
                click: function(e) {
                    return this._.buttons[e].click()
                },
                disableButton: function(e) {
                    return this._.buttons[e].disable()
                },
                enableButton: function(e) {
                    return this._.buttons[e].enable()
                },
                getPageCount: function() {
                    return this._.pageCount
                },
                getParentEditor: function() {
                    return this._.editor
                },
                getSelectedElement: function() {
                    return this.getParentEditor().getSelection().getSelectedElement()
                },
                addFocusable: function(e, t) {
                    if ("undefined" == typeof t) t = this._.focusList.length, this._.focusList.push(new r(this, e, t));
                    else {
                        this._.focusList.splice(t, 0, new r(this, e, t));
                        for (var n = t + 1; n < this._.focusList.length; n++) this._.focusList[n].focusIndex++
                    }
                },
                setState: function(e) {
                    if (this.state != e) {
                        if (this.state = e, e == CKEDITOR.DIALOG_STATE_BUSY) {
                            if (!this.parts.spinner) {
                                var t = this.getParentEditor().lang.dir,
                                    n = {
                                        attributes: {
                                            class: "cke_dialog_spinner"
                                        },
                                        styles: {
                                            float: "rtl" == t ? "right" : "left"
                                        }
                                    };
                                n.styles["margin-" + ("rtl" == t ? "left" : "right")] = "8px", this.parts.spinner = CKEDITOR.document.createElement("div", n), this.parts.spinner.setHtml("&#8987;"), this.parts.spinner.appendTo(this.parts.title, 1)
                            }
                            this.parts.spinner.show(), this.getButton("ok").disable()
                        } else e == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable());
                        this.fire("state", e)
                    }
                }
            }, CKEDITOR.tools.extend(CKEDITOR.dialog, {
                add: function(e, t) {
                    this._.dialogDefinitions[e] && "function" != typeof t || (this._.dialogDefinitions[e] = t)
                },
                exists: function(e) {
                    return !!this._.dialogDefinitions[e]
                },
                getCurrent: function() {
                    return CKEDITOR.dialog._.currentTop
                },
                isTabEnabled: function(e, t, n) {
                    return e = e.config.removeDialogTabs, !(e && e.match(RegExp("(?:^|;)" + t + ":" + n + "(?:$|;)", "i")))
                },
                okButton: function() {
                    var e = function(e, t) {
                        return t = t || {}, CKEDITOR.tools.extend({
                            id: "ok",
                            type: "button",
                            label: e.lang.common.ok,
                            class: "cke_dialog_ui_button_ok",
                            onClick: function(e) {
                                e = e.data.dialog, e.fire("ok", {
                                    hide: !0
                                }).hide !== !1 && e.hide()
                            }
                        }, t, !0)
                    };
                    return e.type = "button", e.override = function(t) {
                        return CKEDITOR.tools.extend(function(n) {
                            return e(n, t)
                        }, {
                            type: "button"
                        }, !0)
                    }, e
                }(),
                cancelButton: function() {
                    var e = function(e, t) {
                        return t = t || {}, CKEDITOR.tools.extend({
                            id: "cancel",
                            type: "button",
                            label: e.lang.common.cancel,
                            class: "cke_dialog_ui_button_cancel",
                            onClick: function(e) {
                                e = e.data.dialog, e.fire("cancel", {
                                    hide: !0
                                }).hide !== !1 && e.hide()
                            }
                        }, t, !0)
                    };
                    return e.type = "button", e.override = function(t) {
                        return CKEDITOR.tools.extend(function(n) {
                            return e(n, t)
                        }, {
                            type: "button"
                        }, !0)
                    }, e
                }(),
                removeButton: function() {
                    var e = function(e, t) {
                        return t = t || {}, CKEDITOR.tools.extend({
                            id: "remove",
                            type: "button",
                            label: "Remove Link",
                            class: "cke_dialog_ui_button_remove",
                            onClick: function(e) {
                                e = e.data.dialog, e.fire("remove", {
                                    hide: !0
                                }).hide !== !1 && e.hide()
                            }
                        }, t, !0)
                    };
                    return e.type = "button", e.override = function(t) {
                        return CKEDITOR.tools.extend(function(n) {
                            return e(n, t)
                        }, {
                            type: "button"
                        }, !0)
                    }, e
                }(),
                addUIElement: function(e, t) {
                    this._.uiElementBuilders[e] = t
                }
            }), CKEDITOR.dialog._ = {
                uiElementBuilders: {},
                dialogDefinitions: {},
                currentTop: null,
                currentZIndex: null
            }, CKEDITOR.event.implementOn(CKEDITOR.dialog), CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
            var g = {
                    resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
                    minWidth: 600,
                    minHeight: 400,
                    buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
                },
                p = function(e, t, n) {
                    for (var i, o = 0; i = e[o]; o++) {
                        if (i.id == t) return i;
                        if (n && i[n] && (i = p(i[n], t, n))) return i
                    }
                    return null
                },
                T = function(e, t, n, i, o) {
                    if (n) {
                        for (var a, r = 0; a = e[r]; r++) {
                            if (a.id == n) return e.splice(r, 0, t), t;
                            if (i && a[i] && (a = T(a[i], t, n, i, !0))) return a
                        }
                        if (o) return null
                    }
                    return e.push(t), t
                },
                C = function(e, t, n) {
                    for (var i, o = 0; i = e[o]; o++) {
                        if (i.id == t) return e.splice(o, 1);
                        if (n && i[n] && (i = C(i[n], t, n))) return i
                    }
                    return null
                },
                I = function(e, t) {
                    this.dialog = e;
                    for (var n, i = t.contents, o = 0; n = i[o]; o++) i[o] = n && new l(e, n);
                    CKEDITOR.tools.extend(this, t)
                };
            I.prototype = {
                getContents: function(e) {
                    return p(this.contents, e)
                },
                getButton: function(e) {
                    return p(this.buttons, e)
                },
                addContents: function(e, t) {
                    return T(this.contents, e, t)
                },
                addButton: function(e, t) {
                    return T(this.buttons, e, t)
                },
                removeContents: function(e) {
                    C(this.contents, e)
                },
                removeButton: function(e) {
                    C(this.buttons, e)
                }
            }, l.prototype = {
                get: function(e) {
                    return p(this.elements, e, "children")
                },
                add: function(e, t) {
                    return T(this.elements, e, t, "children")
                },
                remove: function(e) {
                    C(this.elements, e, "children")
                }
            };
            var O, D, R = {},
                v = {},
                b = function(e) {
                    var t = e.data.$.ctrlKey || e.data.$.metaKey,
                        n = e.data.$.altKey,
                        i = e.data.$.shiftKey,
                        o = String.fromCharCode(e.data.$.keyCode);
                    (t = v[(t ? "CTRL+" : "") + (n ? "ALT+" : "") + (i ? "SHIFT+" : "") + o]) && t.length && (t = t[t.length - 1], t.keydown && t.keydown.call(t.uiElement, t.dialog, t.key), e.data.preventDefault())
                },
                K = function(e) {
                    var t = e.data.$.ctrlKey || e.data.$.metaKey,
                        n = e.data.$.altKey,
                        i = e.data.$.shiftKey,
                        o = String.fromCharCode(e.data.$.keyCode);
                    (t = v[(t ? "CTRL+" : "") + (n ? "ALT+" : "") + (i ? "SHIFT+" : "") + o]) && t.length && (t = t[t.length - 1], t.keyup && (t.keyup.call(t.uiElement, t.dialog, t.key), e.data.preventDefault()))
                },
                _ = function(e, t, n, i, o) {
                    (v[n] || (v[n] = [])).push({
                        uiElement: e,
                        dialog: t,
                        key: n,
                        keyup: o || e.accessKeyUp,
                        keydown: i || e.accessKeyDown
                    })
                },
                y = function(e) {
                    for (var t in v) {
                        for (var n = v[t], i = n.length - 1; i >= 0; i--)(n[i].dialog == e || n[i].uiElement == e) && n.splice(i, 1);
                        0 === n.length && delete v[t]
                    }
                },
                k = function(e, t) {
                    e._.accessKeyMap[t] && e.selectPage(e._.accessKeyMap[t])
                },
                N = function() {};
            ! function() {
                CKEDITOR.ui.dialog = {
                    uiElement: function(e, t, n, i, o, a, r) {
                        if (!(arguments.length < 4)) {
                            var s = (i.call ? i(t) : i) || "div",
                                l = ["<", s, " "],
                                c = (o && o.call ? o(t) : o) || {},
                                u = (a && a.call ? a(t) : a) || {},
                                d = (r && r.call ? r.call(this, e, t) : r) || "",
                                h = this.domId = u.id || CKEDITOR.tools.getNextId() + "_uiElement";
                            t.requiredContent && !e.getParentEditor().filter.check(t.requiredContent) && (c.display = "none", this.notAllowed = !0), u.id = h;
                            var f = {};
                            t.type && (f["cke_dialog_ui_" + t.type] = 1), t.className && (f[t.className] = 1), t.disabled && (f.cke_disabled = 1);
                            for (var E = u.class && u.class.split ? u.class.split(" ") : [], h = 0; h < E.length; h++) E[h] && (f[E[h]] = 1);
                            E = [];
                            for (h in f) E.push(h);
                            u.class = E.join(" "), t.title && (u.title = t.title), f = (t.style || "").split(";"), t.align && (E = t.align, c["margin-left"] = "left" == E ? 0 : "auto", c["margin-right"] = "right" == E ? 0 : "auto");
                            for (h in c) f.push(h + ":" + c[h]);
                            for (t.hidden && f.push("display:none"), h = f.length - 1; h >= 0; h--) "" === f[h] && f.splice(h, 1);
                            f.length > 0 && (u.style = (u.style ? u.style + "; " : "") + f.join("; "));
                            for (h in u) l.push(h + '="' + CKEDITOR.tools.htmlEncode(u[h]) + '" ');
                            l.push(">", d, "</", s, ">"), n.push(l.join("")), (this._ || (this._ = {})).dialog = e, "boolean" == typeof t.isChanged && (this.isChanged = function() {
                                return t.isChanged
                            }), "function" == typeof t.isChanged && (this.isChanged = t.isChanged), "function" == typeof t.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function(e) {
                                return function(n) {
                                    e.call(this, t.setValue.call(this, n))
                                }
                            })), "function" == typeof t.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function(e) {
                                return function() {
                                    return t.getValue.call(this, e.call(this))
                                }
                            })), CKEDITOR.event.implementOn(this), this.registerEvents(t), this.accessKeyUp && this.accessKeyDown && t.accessKey && _(this, e, "CTRL+" + t.accessKey);
                            var m = this;
                            e.on("load", function() {
                                var t = m.getInputElement();
                                if (t) {
                                    var n = m.type in {
                                        checkbox: 1,
                                        ratio: 1
                                    } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : "";
                                    t.on("focus", function() {
                                        e._.tabBarMode = !1, e._.hasFocus = !0, m.fire("focus"), n && this.addClass(n)
                                    }), t.on("blur", function() {
                                        m.fire("blur"), n && this.removeClass(n)
                                    })
                                }
                            }), CKEDITOR.tools.extend(this, t), this.keyboardFocusable && (this.tabIndex = t.tabIndex || 0, this.focusIndex = e._.focusList.push(this) - 1, this.on("focus", function() {
                                e._.currentFocusIndex = m.focusIndex
                            }))
                        }
                    },
                    hbox: function(e, t, n, i, o) {
                        if (!(arguments.length < 4)) {
                            this._ || (this._ = {});
                            var a, r = this._.children = t,
                                s = o && o.widths || null,
                                l = o && o.height || null,
                                c = {
                                    role: "presentation"
                                };
                            o && o.align && (c.align = o.align), CKEDITOR.ui.dialog.uiElement.call(this, e, o || {
                                type: "hbox"
                            }, i, "table", {}, c, function() {
                                var e = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                                for (a = 0; a < n.length; a++) {
                                    var t = "cke_dialog_ui_hbox_child",
                                        i = [];
                                    0 === a && (t = "cke_dialog_ui_hbox_first"), a == n.length - 1 && (t = "cke_dialog_ui_hbox_last"), e.push('<td class="', t, '" role="presentation" '), s ? s[a] && i.push("width:" + E(s[a])) : i.push("width:" + Math.floor(100 / n.length) + "%"), l && i.push("height:" + E(l)), o && void 0 !== o.padding && i.push("padding:" + E(o.padding)), CKEDITOR.env.ie && CKEDITOR.env.quirks && r[a].align && i.push("text-align:" + r[a].align), i.length > 0 && e.push('style="' + i.join("; ") + '" '), e.push(">", n[a], "</td>")
                                }
                                return e.push("</tr></tbody>"), e.join("")
                            })
                        }
                    },
                    vbox: function(e, t, n, i, o) {
                        if (!(arguments.length < 3)) {
                            this._ || (this._ = {});
                            var a = this._.children = t,
                                r = o && o.width || null,
                                s = o && o.heights || null;
                            CKEDITOR.ui.dialog.uiElement.call(this, e, o || {
                                type: "vbox"
                            }, i, "div", null, {
                                role: "presentation"
                            }, function() {
                                var t = ['<table role="presentation" cellspacing="0" border="0" '];
                                t.push('style="'), o && o.expand && t.push("height:100%;"), t.push("width:" + E(r || "100%"), ";"), CKEDITOR.env.webkit && t.push("float:none;"), t.push('"'), t.push('align="', CKEDITOR.tools.htmlEncode(o && o.align || ("ltr" == e.getParentEditor().lang.dir ? "left" : "right")), '" '), t.push("><tbody>");
                                for (var i = 0; i < n.length; i++) {
                                    var l = [];
                                    t.push('<tr><td role="presentation" '), r && l.push("width:" + E(r || "100%")), s ? l.push("height:" + E(s[i])) : o && o.expand && l.push("height:" + Math.floor(100 / n.length) + "%"), o && void 0 !== o.padding && l.push("padding:" + E(o.padding)), CKEDITOR.env.ie && CKEDITOR.env.quirks && a[i].align && l.push("text-align:" + a[i].align), l.length > 0 && t.push('style="', l.join("; "), '" '), t.push(' class="cke_dialog_ui_vbox_child">', n[i], "</td></tr>")
                                }
                                return t.push("</tbody></table>"), t.join("")
                            })
                        }
                    }
                }
            }(), CKEDITOR.ui.dialog.uiElement.prototype = {
                    getElement: function() {
                        return CKEDITOR.document.getById(this.domId);
                    },
                    getInputElement: function() {
                        return this.getElement()
                    },
                    getDialog: function() {
                        return this._.dialog
                    },
                    setValue: function(e, t) {
                        return this.getInputElement().setValue(e), !t && this.fire("change", {
                            value: e
                        }), this
                    },
                    getValue: function() {
                        return this.getInputElement().getValue()
                    },
                    isChanged: function() {
                        return !1
                    },
                    selectParentTab: function() {
                        for (var e = this.getInputElement();
                            (e = e.getParent()) && e.$.className.search("cke_dialog_page_contents") == -1;);
                        return e ? (e = e.getAttribute("name"), this._.dialog._.currentTabId != e && this._.dialog.selectPage(e), this) : this
                    },
                    focus: function() {
                        return this.selectParentTab().getInputElement().focus(), this
                    },
                    registerEvents: function(e) {
                        var t, n, i = /^on([A-Z]\w+)/,
                            o = function(e, t, n, i) {
                                t.on("load", function() {
                                    e.getInputElement().on(n, i, e)
                                })
                            };
                        for (n in e)(t = n.match(i)) && (this.eventProcessors[n] ? this.eventProcessors[n].call(this, this._.dialog, e[n]) : o(this, this._.dialog, t[1].toLowerCase(), e[n]));
                        return this
                    },
                    eventProcessors: {
                        onLoad: function(e, t) {
                            e.on("load", t, this)
                        },
                        onShow: function(e, t) {
                            e.on("show", t, this)
                        },
                        onHide: function(e, t) {
                            e.on("hide", t, this)
                        }
                    },
                    accessKeyDown: function() {
                        this.focus()
                    },
                    accessKeyUp: function() {},
                    disable: function() {
                        var e = this.getElement();
                        this.getInputElement().setAttribute("disabled", "true"), e.addClass("cke_disabled")
                    },
                    enable: function() {
                        var e = this.getElement();
                        this.getInputElement().removeAttribute("disabled"), e.removeClass("cke_disabled")
                    },
                    isEnabled: function() {
                        return !this.getElement().hasClass("cke_disabled")
                    },
                    isVisible: function() {
                        return this.getInputElement().isVisible()
                    },
                    isFocusable: function() {
                        return !(!this.isEnabled() || !this.isVisible())
                    }
                }, CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    getChild: function(e) {
                        return arguments.length < 1 ? this._.children.concat() : (e.splice || (e = [e]), e.length < 2 ? this._.children[e[0]] : this._.children[e[0]] && this._.children[e[0]].getChild ? this._.children[e[0]].getChild(e.slice(1, e.length)) : null)
                    }
                }, !0), CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox,
                function() {
                    var e = {
                        build: function(e, t, n) {
                            for (var i, o = t.children, a = [], r = [], s = 0; s < o.length && (i = o[s]); s++) {
                                var l = [];
                                a.push(l), r.push(CKEDITOR.dialog._.uiElementBuilders[i.type].build(e, i, l))
                            }
                            return new CKEDITOR.ui.dialog[t.type](e, r, a, n, t)
                        }
                    };
                    CKEDITOR.dialog.addUIElement("hbox", e), CKEDITOR.dialog.addUIElement("vbox", e)
                }(), CKEDITOR.dialogCommand = function(e, t) {
                    this.dialogName = e, CKEDITOR.tools.extend(this, t, !0)
                }, CKEDITOR.dialogCommand.prototype = {
                    exec: function(e) {
                        e.openDialog(this.dialogName)
                    },
                    canUndo: !1,
                    editorFocus: 1
                },
                function() {
                    var e = /^([a]|[^a])+$/,
                        t = /^\d*$/,
                        n = /^\d*(?:\.\d+)?$/,
                        i = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
                        o = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                        a = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
                    CKEDITOR.VALIDATE_OR = 1, CKEDITOR.VALIDATE_AND = 2, CKEDITOR.dialog.validate = {
                        functions: function() {
                            var e = arguments;
                            return function() {
                                var t, n, i = this && this.getValue ? this.getValue() : e[0],
                                    o = CKEDITOR.VALIDATE_AND,
                                    a = [];
                                for (n = 0; n < e.length && "function" == typeof e[n]; n++) a.push(e[n]);
                                n < e.length && "string" == typeof e[n] && (t = e[n], n++), n < e.length && "number" == typeof e[n] && (o = e[n]);
                                var r = o == CKEDITOR.VALIDATE_AND;
                                for (n = 0; n < a.length; n++) r = o == CKEDITOR.VALIDATE_AND ? r && a[n](i) : r || a[n](i);
                                return !!r || t
                            }
                        },
                        regex: function(e, t) {
                            return function(n) {
                                return n = this && this.getValue ? this.getValue() : n, !!e.test(n) || t
                            }
                        },
                        notEmpty: function(t) {
                            return this.regex(e, t)
                        },
                        integer: function(e) {
                            return this.regex(t, e)
                        },
                        number: function(e) {
                            return this.regex(n, e)
                        },
                        cssLength: function(e) {
                            return this.functions(function(e) {
                                return o.test(CKEDITOR.tools.trim(e))
                            }, e)
                        },
                        htmlLength: function(e) {
                            return this.functions(function(e) {
                                return i.test(CKEDITOR.tools.trim(e))
                            }, e)
                        },
                        inlineStyle: function(e) {
                            return this.functions(function(e) {
                                return a.test(CKEDITOR.tools.trim(e))
                            }, e)
                        },
                        equals: function(e, t) {
                            return this.functions(function(t) {
                                return t == e
                            }, t)
                        },
                        notEqual: function(e, t) {
                            return this.functions(function(t) {
                                return t != e
                            }, t)
                        }
                    }, CKEDITOR.on("instanceDestroyed", function(e) {
                        if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                            for (var t; t = CKEDITOR.dialog._.currentTop;) t.hide();
                            for (var n in R) R[n].remove();
                            R = {}
                        }
                        var i, e = e.editor._.storedDialogs;
                        for (i in e) e[i].destroy()
                    })
                }(), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    openDialog: function(e, t) {
                        var n = null,
                            i = CKEDITOR.dialog._.dialogDefinitions[e];
                        if (null === CKEDITOR.dialog._.currentTop && h(this), "function" == typeof i) n = this._.storedDialogs || (this._.storedDialogs = {}), n = n[e] || (n[e] = new CKEDITOR.dialog(this, e)), t && t.call(n, n), n.show();
                        else {
                            if ("failed" == i) throw f(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + e + '" failed when loading definition.');
                            "string" == typeof i && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(i), function() {
                                "function" != typeof CKEDITOR.dialog._.dialogDefinitions[e] && (CKEDITOR.dialog._.dialogDefinitions[e] = "failed"), this.openDialog(e, t)
                            }, this, 0, 1)
                        }
                        return CKEDITOR.skin.loadPart("dialog"), n
                    }
                })
        }(), CKEDITOR.plugins.add("dialog", {
            requires: "dialogui",
            init: function(e) {
                e.on("doubleclick", function(t) {
                    t.data.dialog && e.openDialog(t.data.dialog)
                }, null, null, 999)
            }
        }), function() {
            function e(e, t, n) {
                return t.type || (t.type = "auto"), !(n && e.fire("beforePaste", t) === !1 || !t.dataValue && t.dataTransfer.isEmpty()) && (t.dataValue || (t.dataValue = ""), CKEDITOR.env.gecko && "drop" == t.method && e.toolbox && e.once("afterPaste", function() {
                    e.toolbox.focus()
                }), e.fire("paste", t))
            }

            function t(t) {
                function n() {
                    var e = t.editable();
                    if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
                        var n = function(e) {
                            m.initPasteDataTransfer(e, t), e.data.preventDefault()
                        };
                        e.on("copy", n), e.on("cut", n), e.on("cut", function() {
                            t.extractSelectedHtml()
                        }, null, null, 999)
                    }
                    e.on(m.mainPasteEvent, function(e) {
                        "beforepaste" == m.mainPasteEvent && g || h(e)
                    }), "beforepaste" == m.mainPasteEvent && (e.on("paste", function(e) {
                        p || (a(), e.data.preventDefault(), h(e), s("paste") || t.openDialog("paste"))
                    }), e.on("contextmenu", r, null, null, 0), e.on("beforepaste", function(e) {
                        e.data && !e.data.$.ctrlKey && !e.data.$.shiftKey && r()
                    }, null, null, 0)), e.on("beforecut", function() {
                        !g && l(t)
                    });
                    var i;
                    e.attachListener(CKEDITOR.env.ie ? e : t.document.getDocumentElement(), "mouseup", function() {
                        i = setTimeout(function() {
                            f()
                        }, 0)
                    }), t.on("destroy", function() {
                        clearTimeout(i)
                    }), e.on("keyup", f)
                }

                function i(e) {
                    return {
                        type: e,
                        canUndo: "cut" == e,
                        startDisabled: !0,
                        exec: function() {
                            "cut" == this.type && l();
                            var e, n = this.type;
                            if (CKEDITOR.env.ie) e = s(n);
                            else try {
                                e = t.document.$.execCommand(n, !1, null)
                            } catch (t) {
                                e = !1
                            }
                            return e || t.showNotification(t.lang.clipboard[this.type + "Error"]), e
                        }
                    }
                }

                function o() {
                    return {
                        canUndo: !1,
                        async: !0,
                        exec: function(t, n) {
                            var i = function(n, i) {
                                    n && e(t, n, !!i), t.fire("afterCommandExec", {
                                        name: "paste",
                                        command: o,
                                        returnValue: !!n
                                    })
                                },
                                o = this;
                            "string" == typeof n ? i({
                                dataValue: n,
                                method: "paste",
                                dataTransfer: m.initPasteDataTransfer()
                            }, 1) : t.getClipboardData(i)
                        }
                    }
                }

                function a() {
                    p = 1, setTimeout(function() {
                        p = 0
                    }, 100)
                }

                function r() {
                    g = 1, setTimeout(function() {
                        g = 0
                    }, 10)
                }

                function s(e) {
                    var n = t.document,
                        i = n.getBody(),
                        o = !1,
                        a = function() {
                            o = !0
                        };
                    return i.on(e, a), CKEDITOR.env.version > 7 ? n.$.execCommand(e) : n.$.selection.createRange().execCommand(e), i.removeListener(e, a), o
                }

                function l() {
                    if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                        var e, n, i, o = t.getSelection();
                        o.getType() == CKEDITOR.SELECTION_ELEMENT && (e = o.getSelectedElement()) && (n = o.getRanges()[0], i = t.document.createText(""), i.insertBefore(e), n.setStartBefore(i), n.setEndAfter(e), o.selectRanges([n]), setTimeout(function() {
                            e.getParent() && (i.remove(), o.selectElement(e))
                        }, 0))
                    }
                }

                function c(e, n) {
                    var i, o = t.document,
                        a = t.editable(),
                        r = function(e) {
                            e.cancel()
                        };
                    if (!o.getById("cke_pastebin")) {
                        var s = t.getSelection(),
                            l = s.createBookmarks();
                        CKEDITOR.env.ie && s.root.fire("selectionchange");
                        var c = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !a.is("body") || CKEDITOR.env.ie ? "div" : "body", o);
                        c.setAttributes({
                            id: "cke_pastebin",
                            "data-cke-temp": "1"
                        });
                        var u = 0,
                            o = o.getWindow();
                        CKEDITOR.env.webkit ? (a.append(c), c.addClass("cke_editable"), a.is("body") || (u = "static" != a.getComputedStyle("position") ? a : CKEDITOR.dom.element.get(a.$.offsetParent), u = u.getDocumentPosition().y)) : a.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(c), c.setStyles({
                            position: "absolute",
                            top: o.getScrollPosition().y - u + 10 + "px",
                            width: "1px",
                            height: Math.max(1, o.getViewPaneSize().height - 20) + "px",
                            overflow: "hidden",
                            margin: 0,
                            padding: 0
                        }), CKEDITOR.env.safari && c.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text")), (u = c.getParent().isReadOnly()) ? (c.setOpacity(0), c.setAttribute("contenteditable", !0)) : c.setStyle("ltr" == t.config.contentsLangDirection ? "left" : "right", "-1000px"), t.on("selectionChange", r, null, null, 0), (CKEDITOR.env.webkit || CKEDITOR.env.gecko) && (i = a.once("blur", r, null, null, -100)), u && c.focus(), u = new CKEDITOR.dom.range(c), u.selectNodeContents(c);
                        var d = u.select();
                        CKEDITOR.env.ie && (i = a.once("blur", function() {
                            t.lockSelection(d)
                        }));
                        var h = CKEDITOR.document.getWindow().getScrollPosition().y;
                        setTimeout(function() {
                            CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = h), i && i.removeListener(), CKEDITOR.env.ie && a.focus(), s.selectBookmarks(l), c.remove();
                            var e;
                            CKEDITOR.env.webkit && (e = c.getFirst()) && e.is && e.hasClass("Apple-style-span") && (c = e), t.removeListener("selectionChange", r), n(c.getHtml())
                        }, 0)
                    }
                }

                function u() {
                    if ("paste" == m.mainPasteEvent) return t.fire("beforePaste", {
                        type: "auto",
                        method: "paste"
                    }), !1;
                    t.focus(), a();
                    var e = t.focusManager;
                    return e.lock(), t.editable().fire(m.mainPasteEvent) && !s("paste") ? (e.unlock(), !1) : (e.unlock(), !0)
                }

                function d(e) {
                    if ("wysiwyg" == t.mode) switch (e.data.keyCode) {
                        case CKEDITOR.CTRL + 86:
                        case CKEDITOR.SHIFT + 45:
                            e = t.editable(), a(), "paste" == m.mainPasteEvent && e.fire("beforepaste");
                            break;
                        case CKEDITOR.CTRL + 88:
                        case CKEDITOR.SHIFT + 46:
                            t.fire("saveSnapshot"), setTimeout(function() {
                                t.fire("saveSnapshot")
                            }, 50)
                    }
                }

                function h(n) {
                    var i = {
                        type: "auto",
                        method: "paste",
                        dataTransfer: m.initPasteDataTransfer(n)
                    };
                    i.dataTransfer.cacheData();
                    var o = t.fire("beforePaste", i) !== !1;
                    o && m.canClipboardApiBeTrusted(i.dataTransfer, t) ? (n.data.preventDefault(), setTimeout(function() {
                        e(t, i)
                    }, 0)) : c(n, function(n) {
                        i.dataValue = n.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/gi, ""), o && e(t, i)
                    })
                }

                function f() {
                    if ("wysiwyg" == t.mode) {
                        var e = E("paste");
                        t.getCommand("cut").setState(E("cut")), t.getCommand("copy").setState(E("copy")), t.getCommand("paste").setState(e), t.fire("pasteState", e)
                    }
                }

                function E(e) {
                    if (T && e in {
                            paste: 1,
                            cut: 1
                        }) return CKEDITOR.TRISTATE_DISABLED;
                    if ("paste" == e) return CKEDITOR.TRISTATE_OFF;
                    var e = t.getSelection(),
                        n = e.getRanges();
                    return e.getType() == CKEDITOR.SELECTION_NONE || 1 == n.length && n[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
                }
                var m = CKEDITOR.plugins.clipboard,
                    g = 0,
                    p = 0,
                    T = 0;
                ! function() {
                    t.on("key", d), t.on("contentDom", n), t.on("selectionChange", function(e) {
                        T = e.data.selection.getRanges()[0].checkReadOnly(), f()
                    }), t.contextMenu && t.contextMenu.addListener(function(e, t) {
                        return T = t.getRanges()[0].checkReadOnly(), {
                            cut: E("cut"),
                            copy: E("copy"),
                            paste: E("paste")
                        }
                    })
                }(),
                function() {
                    function e(e, n, i, o, a) {
                        var r = t.lang.clipboard[n];
                        t.addCommand(n, i), t.ui.addButton && t.ui.addButton(e, {
                            label: r,
                            command: n,
                            toolbar: "clipboard," + o
                        }), t.addMenuItems && t.addMenuItem(n, {
                            label: r,
                            command: n,
                            group: "clipboard",
                            order: a
                        })
                    }
                    e("Cut", "cut", i("cut"), 10, 1), e("Copy", "copy", i("copy"), 20, 4), e("Paste", "paste", o(), 30, 8)
                }(), t.getClipboardData = function(e, n) {
                    function i(e) {
                        e.removeListener(), e.cancel(), n(e.data)
                    }

                    function o(e) {
                        e.removeListener(), e.cancel(), l = !0, n({
                            type: s,
                            dataValue: e.data,
                            method: "paste"
                        })
                    }

                    function a() {
                        this.customTitle = e && e.title
                    }
                    var r = !1,
                        s = "auto",
                        l = !1;
                    n || (n = e, e = null), t.on("paste", i, null, null, 0), t.on("beforePaste", function(e) {
                        e.removeListener(), r = !0, s = e.data.type
                    }, null, null, 1e3), u() === !1 && (t.removeListener("paste", i), r && t.fire("pasteDialog", a) ? (t.on("pasteDialogCommit", o), t.on("dialogHide", function(e) {
                        e.removeListener(), e.data.removeListener("pasteDialogCommit", o), setTimeout(function() {
                            l || n(null)
                        }, 10)
                    })) : n(null))
                }
            }

            function n(e) {
                if (CKEDITOR.env.webkit) {
                    if (!e.match(/^[^<]*$/g) && !e.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html"
                } else if (CKEDITOR.env.ie) {
                    if (!e.match(/^([^<]|<br( ?\/)?>)*$/gi) && !e.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html"
                } else {
                    if (!CKEDITOR.env.gecko) return "html";
                    if (!e.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html"
                }
                return "htmlifiedtext"
            }

            function i(e, t) {
                function n(e) {
                    return CKEDITOR.tools.repeat("</p><p>", ~~(e / 2)) + (e % 2 == 1 ? "<br>" : "")
                }
                return t = t.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>"), t = t.replace(/<\/?[A-Z]+>/g, function(e) {
                    return e.toLowerCase()
                }), t.match(/^[^<]$/) ? t : (CKEDITOR.env.webkit && t.indexOf("<div>") > -1 && (t = t.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>"), t.match(/<div>(<br>|)<\/div>/) && (t = "<p>" + t.replace(/(<div>(<br>|)<\/div>)+/g, function(e) {
                    return n(e.split("</div><div>").length + 1)
                }) + "</p>"), t = t.replace(/<\/div><div>/g, "<br>"), t = t.replace(/<\/?div>/g, "")), CKEDITOR.env.gecko && e.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (t = t.replace(/^<br><br>$/, "<br>")), t.indexOf("<br><br>") > -1 && (t = "<p>" + t.replace(/(<br>){2,}/g, function(e) {
                    return n(e.length / 4)
                }) + "</p>")), r(e, t))
            }

            function o() {
                function e() {
                    var e, t = {};
                    for (e in CKEDITOR.dtd) "$" != e.charAt(0) && "div" != e && "span" != e && (t[e] = 1);
                    return t
                }
                var t, n;
                return {
                    get: function(i) {
                        return "plain-text" == i ? t || (t = new CKEDITOR.filter("br")) : "semantic-content" == i ? ((i = n) || (i = new CKEDITOR.filter, i.allow({
                            $1: {
                                elements: e(),
                                attributes: !0,
                                styles: !1,
                                classes: !1
                            }
                        }), i = n = i), i) : i ? new CKEDITOR.filter(i) : null
                    }
                }
            }

            function a(e, t, n) {
                var t = CKEDITOR.htmlParser.fragment.fromHtml(t),
                    i = new CKEDITOR.htmlParser.basicWriter;
                return n.applyTo(t, !0, !1, e.activeEnterMode), t.writeHtml(i), i.getHtml()
            }

            function r(e, t) {
                return e.enterMode == CKEDITOR.ENTER_BR ? t = t.replace(/(<\/p><p>)+/g, function(e) {
                    return CKEDITOR.tools.repeat("<br>", e.length / 7 * 2)
                }).replace(/<\/?p>/g, "") : e.enterMode == CKEDITOR.ENTER_DIV && (t = t.replace(/<(\/)?p>/g, "<$1div>")), t
            }

            function s(e) {
                e.data.preventDefault(), e.data.$.dataTransfer.dropEffect = "none"
            }

            function l(t) {
                var n = CKEDITOR.plugins.clipboard;
                t.on("contentDom", function() {
                    function i(n, i, o) {
                        i.select(), e(t, {
                            dataTransfer: o,
                            method: "drop"
                        }, 1), o.sourceEditor.fire("saveSnapshot"), o.sourceEditor.editable().extractHtmlFromRange(n), o.sourceEditor.getSelection().selectRanges([n]), o.sourceEditor.fire("saveSnapshot")
                    }

                    function o(i, o) {
                        i.select(), e(t, {
                            dataTransfer: o,
                            method: "drop"
                        }, 1), n.resetDragDataTransfer()
                    }

                    function a(e, n, i) {
                        var o = {
                            $: e.data.$,
                            target: e.data.getTarget()
                        };
                        n && (o.dragRange = n), i && (o.dropRange = i), t.fire(e.name, o) === !1 && e.data.preventDefault()
                    }

                    function r(e) {
                        return e.type != CKEDITOR.NODE_ELEMENT && (e = e.getParent()), e.getChildCount()
                    }
                    var s = t.editable(),
                        l = CKEDITOR.plugins.clipboard.getDropTarget(t),
                        c = t.ui.space("top"),
                        u = t.ui.space("bottom");
                    n.preventDefaultDropOnElement(c), n.preventDefaultDropOnElement(u), s.attachListener(l, "dragstart", a), s.attachListener(t, "dragstart", n.resetDragDataTransfer, n, null, 1), s.attachListener(t, "dragstart", function(e) {
                        n.initDragDataTransfer(e, t), e = n.dragRange = t.getSelection().getRanges()[0], CKEDITOR.env.ie && CKEDITOR.env.version < 10 && (n.dragStartContainerChildCount = e ? r(e.startContainer) : null, n.dragEndContainerChildCount = e ? r(e.endContainer) : null)
                    }, null, null, 2), s.attachListener(l, "dragend", a), s.attachListener(t, "dragend", n.initDragDataTransfer, n, null, 1), s.attachListener(t, "dragend", n.resetDragDataTransfer, n, null, 100), s.attachListener(l, "dragover", function(e) {
                        var t = e.data.getTarget();
                        t && t.is && t.is("html") ? e.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && e.data.$.dataTransfer.types.contains("Files") && e.data.preventDefault()
                    }), s.attachListener(l, "drop", function(e) {
                        e.data.preventDefault();
                        var i = e.data.getTarget();
                        if (!i.isReadOnly() || i.type == CKEDITOR.NODE_ELEMENT && i.is("html")) {
                            var i = n.getRangeAtDropPosition(e, t),
                                o = n.dragRange;
                            i && a(e, o, i)
                        }
                    }), s.attachListener(t, "drop", n.initDragDataTransfer, n, null, 1), s.attachListener(t, "drop", function(e) {
                        if (e = e.data) {
                            var a = e.dropRange,
                                r = e.dragRange,
                                s = e.dataTransfer;
                            s.getTransferType(t) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function() {
                                n.internalDrop(r, a, s, t)
                            }, 0) : s.getTransferType(t) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? i(r, a, s) : o(a, s)
                        }
                    }, null, null, 9999)
                })
            }
            CKEDITOR.plugins.add("clipboard", {
                requires: "dialog",
                init: function(e) {
                    var r, s = o();
                    e.config.forcePasteAsPlainText ? r = "plain-text" : e.config.pasteFilter ? r = e.config.pasteFilter : CKEDITOR.env.webkit && !("pasteFilter" in e.config) && (r = "semantic-content"), e.pasteFilter = s.get(r), t(e), l(e), CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")), e.on("paste", function(t) {
                        if (t.data.dataTransfer || (t.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer), !t.data.dataValue) {
                            var n = t.data.dataTransfer,
                                i = n.getData("text/html");
                            i ? (t.data.dataValue = i, t.data.type = "html") : (i = n.getData("text/plain")) && (t.data.dataValue = e.editable().transformPlainTextToHtml(i), t.data.type = "text")
                        }
                    }, null, null, 1), e.on("paste", function(e) {
                        var t = e.data.dataValue,
                            n = CKEDITOR.dtd.$block;
                        if (t.indexOf("Apple-") > -1 && (t = t.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != e.data.type && (t = t.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(e, t) {
                                return t.replace(/\t/g, "&nbsp;&nbsp; &nbsp;")
                            })), t.indexOf('<br class="Apple-interchange-newline">') > -1 && (e.data.startsWithEOL = 1, e.data.preSniffing = "html", t = t.replace(/<br class="Apple-interchange-newline">/, "")), t = t.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")), t.match(/^<[^<]+cke_(editable|contents)/i)) {
                            var i, o, a = new CKEDITOR.dom.element("div");
                            for (a.setHtml(t); 1 == a.getChildCount() && (i = a.getFirst()) && i.type == CKEDITOR.NODE_ELEMENT && (i.hasClass("cke_editable") || i.hasClass("cke_contents"));) a = o = i;
                            o && (t = o.getHtml().replace(/<br>$/i, ""))
                        }
                        CKEDITOR.env.ie ? t = t.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(t, i) {
                            return i.toLowerCase() in n ? (e.data.preSniffing = "html", "<" + i) : t
                        }) : CKEDITOR.env.webkit ? t = t.replace(/<\/(\w+)><div><br><\/div>$/, function(t, i) {
                            return i in n ? (e.data.endsWithEOL = 1, "</" + i + ">") : t
                        }) : CKEDITOR.env.gecko && (t = t.replace(/(\s)<br>$/, "$1")), e.data.dataValue = t
                    }, null, null, 3), e.on("paste", function(t) {
                        var o, t = t.data,
                            r = t.type,
                            l = t.dataValue,
                            c = e.config.clipboard_defaultContentType || "html",
                            u = t.dataTransfer.getTransferType(e);
                        o = "html" == r || "html" == t.preSniffing ? "html" : n(l), "htmlifiedtext" == o && (l = i(e.config, l)), "text" == r && "html" == o ? l = a(e, l, s.get("plain-text")) : u == CKEDITOR.DATA_TRANSFER_EXTERNAL && e.pasteFilter && !t.dontFilter && (l = a(e, l, e.pasteFilter)), t.startsWithEOL && (l = '<br data-cke-eol="1">' + l), t.endsWithEOL && (l += '<br data-cke-eol="1">'), "auto" == r && (r = "html" == o || "html" == c ? "html" : "text"), t.type = r, t.dataValue = l, delete t.preSniffing, delete t.startsWithEOL, delete t.endsWithEOL
                    }, null, null, 6), e.on("paste", function(t) {
                        t = t.data, t.dataValue && (e.insertHtml(t.dataValue, t.type, t.range), setTimeout(function() {
                            e.fire("afterPaste")
                        }, 0))
                    }, null, null, 1e3), e.on("pasteDialog", function(t) {
                        setTimeout(function() {
                            e.openDialog("paste", t.data)
                        }, 0)
                    })
                }
            }), CKEDITOR.plugins.clipboard = {
                isCustomCopyCutSupported: !CKEDITOR.env.ie && !CKEDITOR.env.iOS,
                isCustomDataTypesSupported: !CKEDITOR.env.ie,
                isFileApiSupported: !CKEDITOR.env.ie || CKEDITOR.env.version > 9,
                mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste",
                canClipboardApiBeTrusted: function(e, t) {
                    return !!(e.getTransferType(t) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !e.isEmpty() || CKEDITOR.env.gecko && (e.getData("text/html") || e.getFilesCount()))
                },
                getDropTarget: function(e) {
                    var t = e.editable();
                    return CKEDITOR.env.ie && CKEDITOR.env.version < 9 || t.isInline() ? t : e.document
                },
                fixSplitNodesAfterDrop: function(e, t, n, i) {
                    function o(e, n, i) {
                        var o = e;
                        if (o.type == CKEDITOR.NODE_TEXT && (o = e.getParent()), o.equals(n) && i != n.getChildCount()) return e = t, n = e.startContainer.getChild(e.startOffset - 1), i = e.startContainer.getChild(e.startOffset), n && n.type == CKEDITOR.NODE_TEXT && i && i.type == CKEDITOR.NODE_TEXT && (o = n.getLength(), n.setText(n.getText() + i.getText()), i.remove(), e.setStart(n, o), e.collapse(!0)), !0
                    }
                    var a = t.startContainer;
                    !("number" != typeof i || "number" != typeof n) && a.type == CKEDITOR.NODE_ELEMENT && !o(e.startContainer, a, n) && o(e.endContainer, a, i)
                },
                isDropRangeAffectedByDragRange: function(e, t) {
                    var n = t.startContainer,
                        i = t.endOffset;
                    return !!(e.endContainer.equals(n) && e.endOffset <= i || e.startContainer.getParent().equals(n) && e.startContainer.getIndex() < i || e.endContainer.getParent().equals(n) && e.endContainer.getIndex() < i)
                },
                internalDrop: function(t, n, i, o) {
                    var a, r, s = CKEDITOR.plugins.clipboard,
                        l = o.editable();
                    o.fire("saveSnapshot"), o.fire("lockSnapshot", {
                        dontUpdate: 1
                    }), CKEDITOR.env.ie && CKEDITOR.env.version < 10 && this.fixSplitNodesAfterDrop(t, n, s.dragStartContainerChildCount, s.dragEndContainerChildCount), (r = this.isDropRangeAffectedByDragRange(t, n)) || (a = t.createBookmark(!1)), s = n.clone().createBookmark(!1), r && (a = t.createBookmark(!1)), t = a.startNode, r = a.endNode;
                    var c = s.startNode;
                    r && t.getPosition(c) == CKEDITOR.POSITION_PRECEDING && r.getPosition(c) == CKEDITOR.POSITION_FOLLOWING ? (o.getSelection().selectRanges([n]), t.remove(), r.remove(), c.remove()) : (t = o.createRange(), t.moveToBookmark(a), l.extractHtmlFromRange(t, 1), n = o.createRange(), n.moveToBookmark(s), e(o, {
                        dataTransfer: i,
                        method: "drop",
                        range: n
                    }, 1)), o.fire("unlockSnapshot")
                },
                getRangeAtDropPosition: function(e, t) {
                    var n = e.data.$,
                        i = n.clientX,
                        o = n.clientY,
                        a = t.getSelection(!0).getRanges()[0],
                        r = t.createRange();
                    if (e.data.testRange) return e.data.testRange;
                    if (document.caretRangeFromPoint) n = t.document.$.caretRangeFromPoint(i, o), r.setStart(CKEDITOR.dom.node(n.startContainer), n.startOffset), r.collapse(!0);
                    else if (n.rangeParent) r.setStart(CKEDITOR.dom.node(n.rangeParent), n.rangeOffset), r.collapse(!0);
                    else {
                        if (CKEDITOR.env.ie && CKEDITOR.env.version > 8 && a && t.editable().hasFocus) return a;
                        if (!document.body.createTextRange) return null;
                        t.focus(), n = t.document.getBody().$.createTextRange();
                        try {
                            for (var s = !1, l = 0; l < 20 && !s; l++) {
                                if (!s) try {
                                    n.moveToPoint(i, o - l), s = !0
                                } catch (e) {}
                                if (!s) try {
                                    n.moveToPoint(i, o + l), s = !0
                                } catch (e) {}
                            }
                            if (s) {
                                var c = "cke-temp-" + (new Date).getTime();
                                n.pasteHTML('<span id="' + c + '">​</span>');
                                var u = t.document.getById(c);
                                r.moveToPosition(u, CKEDITOR.POSITION_BEFORE_START), u.remove()
                            } else {
                                var d, h = t.document.$.elementFromPoint(i, o),
                                    f = new CKEDITOR.dom.element(h);
                                if (f.equals(t.editable()) || "html" == f.getName()) return a && a.startContainer && !a.startContainer.equals(t.editable()) ? a : null;
                                d = f.getClientRect(), i < d.left ? r.setStartAt(f, CKEDITOR.POSITION_AFTER_START) : r.setStartAt(f, CKEDITOR.POSITION_BEFORE_END), r.collapse(!0)
                            }
                        } catch (e) {
                            return null
                        }
                    }
                    return r
                },
                initDragDataTransfer: function(e, t) {
                    var n = e.data.$ ? e.data.$.dataTransfer : null,
                        i = new this.dataTransfer(n, t);
                    n ? this.dragData && i.id == this.dragData.id ? i = this.dragData : this.dragData = i : this.dragData ? i = this.dragData : this.dragData = i, e.data.dataTransfer = i
                },
                resetDragDataTransfer: function() {
                    this.dragData = null
                },
                initPasteDataTransfer: function(e, t) {
                    if (this.isCustomCopyCutSupported && e && e.data && e.data.$) {
                        var n = new this.dataTransfer(e.data.$.clipboardData, t);
                        return this.copyCutData && n.id == this.copyCutData.id ? (n = this.copyCutData, n.$ = e.data.$.clipboardData) : this.copyCutData = n, n
                    }
                    return new this.dataTransfer(null, t)
                },
                preventDefaultDropOnElement: function(e) {
                    e && e.on("dragover", s)
                }
            };
            var c = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text";
            CKEDITOR.plugins.clipboard.dataTransfer = function(e, t) {
                if (e && (this.$ = e), this._ = {
                        metaRegExp: /^<meta.*?>/,
                        bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/,
                        fragmentRegExp: /<\!--(?:Start|End)Fragment--\>/g,
                        data: {},
                        files: [],
                        normalizeType: function(e) {
                            return e = e.toLowerCase(), "text" == e || "text/plain" == e ? "Text" : "url" == e ? "URL" : e
                        }
                    }, this.id = this.getData(c), this.id || (this.id = "Text" == c ? "" : "cke-" + CKEDITOR.tools.getUniqueId()), "Text" != c) try {
                    this.$.setData(c, this.id)
                } catch (e) {}
                t && (this.sourceEditor = t, this.setData("text/html", t.getSelectedHtml(1)), "Text" != c && !this.getData("text/plain") && this.setData("text/plain", t.getSelection().getSelectedText()))
            }, CKEDITOR.DATA_TRANSFER_INTERNAL = 1, CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2, CKEDITOR.DATA_TRANSFER_EXTERNAL = 3, CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
                getData: function(e) {
                    var e = this._.normalizeType(e),
                        t = this._.data[e];
                    if (void 0 === t || null === t || "" === t) try {
                        t = this.$.getData(e)
                    } catch (e) {}
                    return void 0 !== t && null !== t && "" !== t || (t = ""), "text/html" == e ? (t = t.replace(this._.metaRegExp, ""), (e = this._.bodyRegExp.exec(t)) && e.length && (t = e[1], t = t.replace(this._.fragmentRegExp, ""))) : "Text" == e && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == t.substring(0, 7) && (t = ""), t
                },
                setData: function(e, t) {
                    if (e = this._.normalizeType(e), this._.data[e] = t, CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == e || "Text" == e) {
                        "Text" == c && "Text" == e && (this.id = t);
                        try {
                            this.$.setData(e, t)
                        } catch (e) {}
                    }
                },
                getTransferType: function(e) {
                    return this.sourceEditor ? this.sourceEditor == e ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL
                },
                cacheData: function() {
                    function e(e) {
                        var e = i._.normalizeType(e),
                            t = i.getData(e);
                        t && (i._.data[e] = t)
                    }
                    if (this.$) {
                        var t, n, i = this;
                        if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                            if (this.$.types)
                                for (t = 0; t < this.$.types.length; t++) e(this.$.types[t])
                        } else e("Text"), e("URL");
                        if (n = this._getImageFromClipboard(), this.$ && this.$.files || n) {
                            for (this._.files = [], t = 0; t < this.$.files.length; t++) this._.files.push(this.$.files[t]);
                            0 === this._.files.length && n && this._.files.push(n)
                        }
                    }
                },
                getFilesCount: function() {
                    return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0
                },
                getFile: function(e) {
                    return this._.files.length ? this._.files[e] : this.$ && this.$.files && this.$.files.length ? this.$.files[e] : 0 === e ? this._getImageFromClipboard() : void 0
                },
                isEmpty: function() {
                    var e, t = {};
                    if (this.getFilesCount()) return !1;
                    for (e in this._.data) t[e] = 1;
                    if (this.$)
                        if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                            if (this.$.types)
                                for (var n = 0; n < this.$.types.length; n++) t[this.$.types[n]] = 1
                        } else t.Text = 1, t.URL = 1;
                    "Text" != c && (t[c] = 0);
                    for (e in t)
                        if (t[e] && "" !== this.getData(e)) return !1;
                    return !0
                },
                _getImageFromClipboard: function() {
                    var e;
                    if (this.$ && this.$.items && this.$.items[0]) try {
                        if ((e = this.$.items[0].getAsFile()) && e.type) return e
                    } catch (e) {}
                }
            }
        }(), function() {
            var e = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}" title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}" aria-disabled="{ariaDisabled}"';
            CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress="return false;"'), CKEDITOR.env.gecko && (e += ' onblur="this.style.cssText = this.style.cssText;"');
            var e = e + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'),
                e = e + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span>{arrowHtml}</a>',
                t = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"),
                n = CKEDITOR.addTemplate("button", e);
            CKEDITOR.plugins.add("button", {
                beforeInit: function(e) {
                    e.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
                }
            }), CKEDITOR.UI_BUTTON = "button", CKEDITOR.ui.button = function(e) {
                CKEDITOR.tools.extend(this, e, {
                    title: e.label,
                    click: e.click || function(t) {
                        t.execCommand(e.command)
                    }
                }), this._ = {}
            }, CKEDITOR.ui.button.handler = {
                create: function(e) {
                    return new CKEDITOR.ui.button(e)
                }
            }, CKEDITOR.ui.button.prototype = {
                render: function(e, i) {
                    function o() {
                        var t = e.mode;
                        t && (t = this.modes[t] ? void 0 !== E[t] ? E[t] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, t = e.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : t, this.setState(t), this.refresh && this.refresh())
                    }
                    var a, r = CKEDITOR.env,
                        s = this._.id = CKEDITOR.tools.getNextId(),
                        l = "",
                        c = this.command;
                    this._.editor = e;
                    var u = {
                            id: s,
                            button: this,
                            editor: e,
                            focus: function() {
                                CKEDITOR.document.getById(s).focus()
                            },
                            execute: function() {
                                this.button.click(e)
                            },
                            attach: function(e) {
                                this.button.attach(e)
                            }
                        },
                        d = CKEDITOR.tools.addFunction(function(e) {
                            if (u.onkey) return e = new CKEDITOR.dom.event(e), u.onkey(u, e.getKeystroke()) !== !1
                        }),
                        h = CKEDITOR.tools.addFunction(function(e) {
                            var t;
                            return u.onfocus && (t = u.onfocus(u, new CKEDITOR.dom.event(e)) !== !1), t
                        }),
                        f = 0;
                    if (u.clickFn = a = CKEDITOR.tools.addFunction(function() {
                            f && (e.unlockSelection(1), f = 0), u.execute(), r.iOS && e.focus()
                        }), this.modes) {
                        var E = {};
                        e.on("beforeModeUnload", function() {
                            e.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (E[e.mode] = this._.state)
                        }, this), e.on("activeFilterChange", o, this), e.on("mode", o, this), !this.readOnly && e.on("readOnly", o, this)
                    } else c && (c = e.getCommand(c)) && (c.on("state", function() {
                        this.setState(c.state)
                    }, this), l += c.state == CKEDITOR.TRISTATE_ON ? "on" : c.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
                    this.directional && e.on("contentDirChanged", function(t) {
                        var n = CKEDITOR.document.getById(this._.id),
                            i = n.getFirst(),
                            t = t.data;
                        t != e.lang.dir ? n.addClass("cke_" + t) : n.removeClass("cke_ltr").removeClass("cke_rtl"), i.setAttribute("style", CKEDITOR.skin.getIconStyle(g, "rtl" == t, this.icon, this.iconOffset))
                    }, this), c || (l += "off");
                    var m = this.name || this.command,
                        g = m;
                    return this.icon && !/\./.test(this.icon) && (g = this.icon, this.icon = null), l = {
                        id: s,
                        name: m,
                        iconName: g,
                        label: this.label,
                        cls: this.className || "",
                        state: l,
                        ariaDisabled: "disabled" == l ? "true" : "false",
                        title: this.title,
                        titleJs: r.gecko && !r.hc ? "" : (this.title || "").replace("'", ""),
                        hasArrow: this.hasArrow ? "true" : "false",
                        keydownFn: d,
                        focusFn: h,
                        clickFn: a,
                        style: CKEDITOR.skin.getIconStyle(g, "rtl" == e.lang.dir, this.icon, this.iconOffset),
                        arrowHtml: this.hasArrow ? t.output() : ""
                    }, n.output(l, i), this.onRender && this.onRender(), u
                },
                setState: function(e) {
                    if (this._.state == e) return !1;
                    this._.state = e;
                    var t = CKEDITOR.document.getById(this._.id);
                    return !!t && (t.setState(e, "cke_button"), e == CKEDITOR.TRISTATE_DISABLED ? t.setAttribute("aria-disabled", !0) : t.removeAttribute("aria-disabled"), this.hasArrow ? (e = e == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + "_label").setText(e)) : e == CKEDITOR.TRISTATE_ON ? t.setAttribute("aria-pressed", !0) : t.removeAttribute("aria-pressed"), !0)
                },
                getState: function() {
                    return this._.state
                },
                toFeature: function(e) {
                    if (this._.feature) return this._.feature;
                    var t = this;
                    return !this.allowedContent && !this.requiredContent && this.command && (t = e.getCommand(this.command) || t), this._.feature = t
                }
            }, CKEDITOR.ui.prototype.addButton = function(e, t) {
                this.add(e, CKEDITOR.UI_BUTTON, t)
            }
        }(), CKEDITOR.plugins.add("panelbutton", {
            requires: "button",
            onLoad: function() {
                function e(e) {
                    var t = this._;
                    t.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(e), t.on ? t.panel.hide() : t.panel.showBlock(this._.id, this.document.getById(this._.id), 4))
                }
                CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.button,
                    $: function(t) {
                        var n = t.panel || {};
                        delete t.panel, this.base(t), this.document = n.parent && n.parent.getDocument() || CKEDITOR.document, n.block = {
                            attributes: n.attributes
                        }, this.hasArrow = n.toolbarRelated = !0, this.click = e, this._ = {
                            panelDefinition: n
                        }
                    },
                    statics: {
                        handler: {
                            create: function(e) {
                                return new CKEDITOR.ui.panelButton(e)
                            }
                        }
                    },
                    proto: {
                        createPanel: function(e) {
                            var t = this._;
                            if (!t.panel) {
                                var n = this._.panelDefinition,
                                    i = this._.panelDefinition.block,
                                    o = n.parent || CKEDITOR.document.getBody(),
                                    a = this._.panel = new CKEDITOR.ui.floatPanel(e, o, n),
                                    n = a.addBlock(t.id, i),
                                    r = this;
                                a.onShow = function() {
                                    r.className && this.element.addClass(r.className + "_panel"), r.setState(CKEDITOR.TRISTATE_ON), t.on = 1, r.editorFocus && e.focus(), r.onOpen && r.onOpen()
                                }, a.onHide = function(n) {
                                    r.className && this.element.getFirst().removeClass(r.className + "_panel"), r.setState(r.modes && r.modes[e.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), t.on = 0, !n && r.onClose && r.onClose()
                                }, a.onEscape = function() {
                                    a.hide(1), r.document.getById(t.id).focus()
                                }, this.onBlock && this.onBlock(a, n), n.onHide = function() {
                                    t.on = 0, r.setState(CKEDITOR.TRISTATE_OFF)
                                }
                            }
                        }
                    }
                })
            },
            beforeInit: function(e) {
                e.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler)
            }
        }), CKEDITOR.UI_PANELBUTTON = "panelbutton", function() {
            CKEDITOR.plugins.add("panel", {
                beforeInit: function(e) {
                    e.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler)
                }
            }), CKEDITOR.UI_PANEL = "panel", CKEDITOR.ui.panel = function(e, t) {
                t && CKEDITOR.tools.extend(this, t), CKEDITOR.tools.extend(this, {
                        className: "",
                        css: []
                    }), this.id = CKEDITOR.tools.getNextId(), this.document = e, this.isFramed = this.forceIFrame || this.css.length,
                    this._ = {
                        blocks: {}
                    }
            }, CKEDITOR.ui.panel.handler = {
                create: function(e) {
                    return new CKEDITOR.ui.panel(e)
                }
            };
            var e = CKEDITOR.addTemplate("panel", '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'),
                t = CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="presentation" name="cke_panel_frame" frameborder="0" src="{src}"></iframe>'),
                n = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
            CKEDITOR.ui.panel.prototype = {
                render: function(i, o) {
                    this.getHolderElement = function() {
                        var e = this._.holder;
                        if (!e) {
                            if (this.isFramed) {
                                var e = this.document.getById(this.id + "_frame"),
                                    t = e.getParent(),
                                    e = e.getFrameDocument();
                                CKEDITOR.env.iOS && t.setStyles({
                                    overflow: "scroll",
                                    "-webkit-overflow-scrolling": "touch"
                                }), t = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() {
                                    this.isLoaded = !0, this.onLoad && this.onLoad()
                                }, this)), e.write(n.output(CKEDITOR.tools.extend({
                                    css: CKEDITOR.tools.buildStyleHtml(this.css),
                                    onload: "window.parent.CKEDITOR.tools.callFunction(" + t + ");"
                                }, a))), e.getWindow().$.CKEDITOR = CKEDITOR, e.on("keydown", function(e) {
                                    var t = e.data.getKeystroke(),
                                        n = this.document.getById(this.id).getAttribute("dir");
                                    this._.onKeyDown && this._.onKeyDown(t) === !1 ? e.data.preventDefault() : (27 == t || t == ("rtl" == n ? 39 : 37)) && this.onEscape && this.onEscape(t) === !1 && e.data.preventDefault()
                                }, this), e = e.getBody(), e.unselectable(), CKEDITOR.env.air && CKEDITOR.tools.callFunction(t)
                            } else e = this.document.getById(this.id);
                            this._.holder = e
                        }
                        return e
                    };
                    var a = {
                        editorId: i.id,
                        id: this.id,
                        langCode: i.langCode,
                        dir: i.lang.dir,
                        cls: this.className,
                        frame: "",
                        env: CKEDITOR.env.cssClass,
                        "z-index": i.config.baseFloatZIndex + 1
                    };
                    if (this.isFramed) {
                        var r = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
                        a.frame = t.output({
                            id: this.id + "_frame",
                            src: r
                        })
                    }
                    return r = e.output(a), o && o.push(r), r
                },
                addBlock: function(e, t) {
                    return t = this._.blocks[e] = t instanceof CKEDITOR.ui.panel.block ? t : new CKEDITOR.ui.panel.block(this.getHolderElement(), t), this._.currentBlock || this.showBlock(e), t
                },
                getBlock: function(e) {
                    return this._.blocks[e]
                },
                showBlock: function(e) {
                    var e = this._.blocks[e],
                        t = this._.currentBlock,
                        n = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                    return t && t.hide(), this._.currentBlock = e, CKEDITOR.fire("ariaWidget", n), e._.focusIndex = -1, this._.onKeyDown = e.onKeyDown && CKEDITOR.tools.bind(e.onKeyDown, e), e.show(), e
                },
                destroy: function() {
                    this.element && this.element.remove()
                }
            }, CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
                $: function(e, t) {
                    this.element = e.append(e.getDocument().createElement("div", {
                        attributes: {
                            tabindex: -1,
                            class: "cke_panel_block"
                        },
                        styles: {
                            display: "none"
                        }
                    })), t && CKEDITOR.tools.extend(this, t), this.element.setAttributes({
                        role: this.attributes.role || "presentation",
                        "aria-label": this.attributes["aria-label"],
                        title: this.attributes.title || this.attributes["aria-label"]
                    }), this.keys = {}, this._.focusIndex = -1, this.element.disableContextMenu()
                },
                _: {
                    markItem: function(e) {
                        e != -1 && (e = this.element.getElementsByTag("a").getItem(this._.focusIndex = e), CKEDITOR.env.webkit && e.getDocument().getWindow().focus(), e.focus(), this.onMark && this.onMark(e))
                    }
                },
                proto: {
                    show: function() {
                        this.element.setStyle("display", "")
                    },
                    hide: function() {
                        (!this.onHide || this.onHide.call(this) !== !0) && this.element.setStyle("display", "none")
                    },
                    onKeyDown: function(e, t) {
                        var n = this.keys[e];
                        switch (n) {
                            case "next":
                                for (var i, o = this._.focusIndex, n = this.element.getElementsByTag("a"); i = n.getItem(++o);)
                                    if (i.getAttribute("_cke_focus") && i.$.offsetWidth) {
                                        this._.focusIndex = o, i.focus();
                                        break
                                    } return !i && !t && (this._.focusIndex = -1, this.onKeyDown(e, 1));
                            case "prev":
                                for (o = this._.focusIndex, n = this.element.getElementsByTag("a"); o > 0 && (i = n.getItem(--o));) {
                                    if (i.getAttribute("_cke_focus") && i.$.offsetWidth) {
                                        this._.focusIndex = o, i.focus();
                                        break
                                    }
                                    i = null
                                }
                                return !i && !t && (this._.focusIndex = n.count(), this.onKeyDown(e, 1));
                            case "click":
                            case "mouseup":
                                return o = this._.focusIndex, (i = o >= 0 && this.element.getElementsByTag("a").getItem(o)) && (i.$[n] ? i.$[n]() : i.$["on" + n]()), !1
                        }
                        return !0
                    }
                }
            })
        }(), CKEDITOR.plugins.add("floatpanel", {
            requires: "panel"
        }), function() {
            function e(e, n, i, o, a) {
                var a = CKEDITOR.tools.genKey(n.getUniqueId(), i.getUniqueId(), e.lang.dir, e.uiColor || "", o.css || "", a || ""),
                    r = t[a];
                return r || (r = t[a] = new CKEDITOR.ui.panel(n, o), r.element = i.append(CKEDITOR.dom.element.createFromHtml(r.render(e), n)), r.element.setStyles({
                    display: "none",
                    position: "absolute"
                })), r
            }
            var t = {};
            CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
                $: function(t, n, i, o) {
                    function a() {
                        c.hide()
                    }
                    i.forceIFrame = 1, i.toolbarRelated && t.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (n = CKEDITOR.document.getById("cke_" + t.name));
                    var r = n.getDocument(),
                        o = e(t, r, n, i, o || 0),
                        s = o.element,
                        l = s.getFirst(),
                        c = this;
                    s.disableContextMenu(), this.element = s, this._ = {
                        editor: t,
                        panel: o,
                        parentElement: n,
                        definition: i,
                        document: r,
                        iframe: l,
                        children: [],
                        dir: t.lang.dir
                    }, t.on("mode", a), t.on("resize", a), CKEDITOR.env.iOS || r.getWindow().on("resize", a)
                },
                proto: {
                    addBlock: function(e, t) {
                        return this._.panel.addBlock(e, t)
                    },
                    addListBlock: function(e, t) {
                        return this._.panel.addListBlock(e, t)
                    },
                    getBlock: function(e) {
                        return this._.panel.getBlock(e)
                    },
                    showBlock: function(e, t, n, i, o, a) {
                        var r = this._.panel,
                            s = r.showBlock(e);
                        this.allowBlur(!1), e = this._.editor.editable(), this._.returnFocus = e.hasFocus ? e : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement), this._.hideTimeout = 0;
                        var l = this.element,
                            e = this._.iframe,
                            e = CKEDITOR.env.ie && !CKEDITOR.env.edge ? e : new CKEDITOR.dom.window(e.$.contentWindow),
                            c = l.getDocument(),
                            u = this._.parentElement.getPositionedAncestor(),
                            d = t.getDocumentPosition(c),
                            c = u ? u.getDocumentPosition(c) : {
                                x: 0,
                                y: 0
                            },
                            h = "rtl" == this._.dir,
                            f = d.x + (i || 0) - c.x,
                            E = d.y + (o || 0) - c.y;
                        !h || 1 != n && 4 != n ? h || 2 != n && 3 != n || (f += t.$.offsetWidth - 1) : f += t.$.offsetWidth, 3 != n && 4 != n || (E += t.$.offsetHeight - 1), this._.panel._.offsetParentId = t.getId(), l.setStyles({
                            top: E + "px",
                            left: 0,
                            display: ""
                        }), l.setOpacity(0), l.getFirst().removeStyle("width"), this._.editor.focusManager.add(e), this._.blurSet || (CKEDITOR.event.useCapture = !0, e.on("blur", function(e) {
                            function t() {
                                delete this._.returnFocus, this.hide()
                            }
                            this.allowBlur() && e.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(t, 0, this)) : t.call(this))
                        }, this), e.on("focus", function() {
                            this._.focused = !0, this.hideChild(), this.allowBlur(!0)
                        }, this), CKEDITOR.env.iOS && (e.on("touchstart", function() {
                            clearTimeout(this._.hideTimeout)
                        }, this), e.on("touchend", function() {
                            this._.hideTimeout = 0, this.focus()
                        }, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1), r.onEscape = CKEDITOR.tools.bind(function(e) {
                            if (this.onEscape && this.onEscape(e) === !1) return !1
                        }, this), CKEDITOR.tools.setTimeout(function() {
                            var e = CKEDITOR.tools.bind(function() {
                                if (l.removeStyle("width"), s.autoSize) {
                                    var e = s.element.getDocument(),
                                        e = (CKEDITOR.env.webkit ? s.element : e.getBody()).$.scrollWidth;
                                    CKEDITOR.env.ie && CKEDITOR.env.quirks && e > 0 && (e += (l.$.offsetWidth || 0) - (l.$.clientWidth || 0) + 3), l.setStyle("width", e + "px"), e = s.element.$.scrollHeight, CKEDITOR.env.ie && CKEDITOR.env.quirks && e > 0 && (e += (l.$.offsetHeight || 0) - (l.$.clientHeight || 0) + 3), l.setStyle("height", e + "px"), r._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                } else l.removeStyle("height");
                                h && (f -= l.$.offsetWidth), l.setStyle("left", f + "px");
                                var n = r.element.getWindow(),
                                    e = l.$.getBoundingClientRect(),
                                    n = n.getViewPaneSize(),
                                    i = e.width || e.right - e.left,
                                    o = e.height || e.bottom - e.top,
                                    c = h ? e.right : n.width - e.left,
                                    u = h ? n.width - e.right : e.left;
                                h ? c < i && (f = u > i ? f + i : n.width > i ? f - e.left : f - e.right + n.width) : c < i && (f = u > i ? f - i + t.$.offsetWidth : n.width > i ? f - e.right + n.width : f - e.left), i = e.top, n.height - e.top < o && (E = i > o ? E - o - t.$.offsetHeight + 1 : n.height > o ? E - e.bottom + n.height : E - e.top), CKEDITOR.env.ie && (n = e = new CKEDITOR.dom.element(l.$.offsetParent), "html" == n.getName() && (n = n.getDocument().getBody()), "rtl" == n.getComputedStyle("direction") && (f = CKEDITOR.env.ie8Compat ? f - 2 * l.getDocument().getDocumentElement().$.scrollLeft : f - (e.$.scrollWidth - e.$.clientWidth)));
                                var d, e = l.getFirst();
                                (d = e.getCustomData("activePanel")) && d.onHide && d.onHide.call(this, 1), e.setCustomData("activePanel", this), l.setStyles({
                                    top: E + "px",
                                    left: f + "px"
                                }), l.setOpacity(1), a && a()
                            }, this);
                            r.isLoaded ? e() : r.onLoad = e, CKEDITOR.tools.setTimeout(function() {
                                var e = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
                                this.focus(), s.element.focus(), CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = e), this.allowBlur(!0), this._.editor.fire("panelShow", this)
                            }, 0, this)
                        }, CKEDITOR.env.air ? 200 : 0, this), this.visible = 1, this.onShow && this.onShow.call(this)
                    },
                    focus: function() {
                        if (CKEDITOR.env.webkit) {
                            var e = CKEDITOR.document.getActive();
                            e && !e.equals(this._.iframe) && e.$.blur()
                        }(this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
                    },
                    blur: function() {
                        var e = this._.iframe.getFrameDocument().getActive();
                        e && e.is("a") && (this._.lastFocused = e)
                    },
                    hide: function(e) {
                        !this.visible || this.onHide && this.onHide.call(this) === !0 || (this.hideChild(), CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(), this.element.setStyle("display", "none"), this.visible = 0, this.element.getFirst().removeCustomData("activePanel"), (e = e && this._.returnFocus) && (CKEDITOR.env.webkit && e.type && e.getWindow().$.focus(), e.focus()), delete this._.lastFocused, this._.editor.fire("panelHide", this))
                    },
                    allowBlur: function(e) {
                        var t = this._.panel;
                        return void 0 !== e && (t.allowBlur = e), t.allowBlur
                    },
                    showAsChild: function(e, t, n, i, o, a) {
                        this._.activeChild == e && e._.panel._.offsetParentId == n.getId() || (this.hideChild(), e.onHide = CKEDITOR.tools.bind(function() {
                            CKEDITOR.tools.setTimeout(function() {
                                this._.focused || this.hide()
                            }, 0, this)
                        }, this), this._.activeChild = e, this._.focused = !1, e.showBlock(t, n, i, o, a), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() {
                            e.element.getChild(0).$.style.cssText += ""
                        }, 100))
                    },
                    hideChild: function(e) {
                        var t = this._.activeChild;
                        t && (delete t.onHide, delete this._.activeChild, t.hide(), e && this.focus())
                    }
                }
            }), CKEDITOR.on("instanceDestroyed", function() {
                var e, n = CKEDITOR.tools.isEmpty(CKEDITOR.instances);
                for (e in t) {
                    var i = t[e];
                    n ? i.destroy() : i.element.hide()
                }
                n && (t = {})
            })
        }(), CKEDITOR.plugins.add("colorbutton", {
            requires: "panelbutton,floatpanel",
            init: function(e) {
                function t(t, o, r, s) {
                    var r = "fore" === o ? {
                            "caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
                                propertiesOnly: !0,
                                classes: c.join(",")
                            }
                        } : new CKEDITOR.style(a["colorButton_" + o + "Style"]),
                        l = CKEDITOR.tools.getNextId() + "_colorBox";
                    e.on("selectionChange", function(i) {
                        var o = e.ui.get(t);
                        if (o) {
                            var r = CKEDITOR.document.getById(o._.id).find(".cke_button_icon").getItem(0);
                            e.config.advancedEditor ? i = i.data.selection.getStartElement().getComputedStyle("color") : (i = e.elementPath(), i = (i.block || i.blockLimit).getComputedStyle("color"));
                            var s = a.colorButton_iconStyles(i);
                            r.setStyles(s), r.setAttribute("title", e.lang.colorbutton.textColorTitle || ""), e.config.customColorPlate && e.config.customColorPlate.init(o._.id, n, i)
                        }
                    }), e.ui.add(t, CKEDITOR.UI_PANELBUTTON, {
                        modes: {
                            wysiwyg: 1
                        },
                        editorFocus: 0,
                        toolbar: "colors," + s,
                        allowedContent: r,
                        requiredContent: r,
                        panel: {
                            css: CKEDITOR.skin.getPath("editor"),
                            attributes: {
                                role: "listbox",
                                "aria-label": ""
                            }
                        },
                        onBlock: function(t, a) {
                            a.autoSize = !0, a.element.addClass("cke_colorblock"), a.element.setStyle("width", "94px"), a.element.setStyle("outline", "none"), a.element.setHtml(i(t, o, l)), a.element.getDocument().getBody().setStyle("overflow", "hidden"), e.config.customColorPlate && (t.element.setStyle("overflow", "inherit"), t.element.appendHtml('<div id="' + this._.id + '_color_plate"  style="position: absolute; top: 0; background: rgb(51, 51, 51); border-radius: 4px; padding: 2px;"/>'), e.config.customColorPlate.init(this._.id, n, "#fff")), CKEDITOR.ui.fire("ready", this);
                            var r = a.keys,
                                s = "rtl" == e.lang.dir;
                            r[s ? 37 : 39] = "next", r[40] = "next", r[9] = "next", r[s ? 39 : 37] = "prev", r[38] = "prev", r[CKEDITOR.SHIFT + 9] = "prev", r[32] = "click"
                        },
                        onOpen: function() {
                            var t = this._.panel._.iframe.getFrameDocument();
                            if (!e.config.customColorPlate) {
                                if (e.config.advancedEditor) {
                                    var n = t.find(".cke_coloricon_active").getItem(0);
                                    n && n.removeClass("cke_coloricon_active")
                                } else {
                                    var n = e.elementPath(),
                                        i = n.block || n.blockLimit;
                                    (n = t.find(".cke_coloricon_active").getItem(0)) && n.removeClass("cke_coloricon_active");
                                    var o = t.getById("cke_coloricon_default");
                                    o.hide(), n = a.colorButton_colors.map(function(e) {
                                        return e[0]
                                    }), n.push("custom1", "custom2"), n.some(function(e) {
                                        var n = a.colorButton_colorClassNamePattern.replace("%s", e);
                                        if (i.hasClass(n)) return o.show(), t.find(".cke_coloricon_" + e).getItem(0).addClass("cke_coloricon_active"), !0
                                    })
                                }
                                var n = a.colorButton_getCustomColors(),
                                    r = t.getById(u);
                                n ? (r.show(), t.getById(d.custom1).find(".cke_colorbox").getItem(0).setStyle("background-color", n[0]), r = t.getById(d.custom2), n[1] ? (r.show(), r.find(".cke_colorbox").getItem(0).setStyle("background-color", n[1])) : r.hide()) : r.hide()
                            }
                        }
                    })
                }

                function n(t) {
                    var n = CKEDITOR.tools.addFunction(function(n) {
                        a.colorButton_clickCustomColorCallback && a.colorButton_clickCustomColorCallback(n);
                        var i = e.getSelection();
                        if (i) {
                            if (e.focus(), e.fire("saveSnapshot"), e.config.advancedEditor) {
                                e.createRange();
                                var i = e.getSelection(),
                                    r = a.colorButton_foreStyle;
                                "default" !== n && n ? (c.map(function(t) {
                                    e.removeStyle(new CKEDITOR.style(r, {
                                        className: t
                                    }))
                                }), n && (r.childRule = function(e) {
                                    return !(e.is("a") || e.getElementsByTag("a").count()) && !(e.is("font") || e.getElementsByTag("font").count()) || o(e)
                                }, e.applyStyle(new CKEDITOR.style(Object.assign({}, r, {
                                    styles: {
                                        color: t
                                    }
                                }))))) : (e.document.$.execCommand("SelectAll", !1, null), c.map(function(t) {
                                    e.removeStyle(new CKEDITOR.style(r, {
                                        className: t
                                    }))
                                }), e.removeStyle(new CKEDITOR.style(r, {
                                    className: "#(className)"
                                })), e.applyStyle(new CKEDITOR.style(Object.assign({}, r, {
                                    styles: {
                                        color: "unset"
                                    }
                                }))), i.removeAllRanges())
                            }
                            e.focus(), e.fire("saveSnapshot")
                        }
                    });
                    CKEDITOR.tools.callFunction(n, t)
                }

                function i(t, n) {
                    var i = [],
                        r = a.colorButton_colorClassNamePattern,
                        h = s.length + (e.plugins.colordialog && a.colorButton_enableMore !== !1 ? 2 : 1),
                        f = CKEDITOR.tools.addFunction(function(n, i, r) {
                            function s(e) {
                                this.removeListener("ok", s), this.removeListener("cancel", s), "ok" == e.name && l(this.getContentElement("picker", "selectedColor").getValue(), r)
                            }
                            a.colorButton_clickCustomColorCallback && a.colorButton_clickCustomColorCallback(n);
                            var l = arguments.callee;
                            if ("?" == n) e.openDialog("colordialog", function() {
                                this.on("ok", s), this.on("cancel", s)
                            });
                            else {
                                e.focus(), t.hide();
                                var u = e.getSelection();
                                if (u) {
                                    if (e.fire("saveSnapshot"), e.config.advancedEditor) {
                                        var u = e.createRange(),
                                            u = e.getSelection(),
                                            d = a["colorButton_" + r + "Style"];
                                        "default" === n ? (e.document.$.execCommand("SelectAll", !1, null), c.map(function(t) {
                                            e.removeStyle(new CKEDITOR.style(d, {
                                                className: t
                                            }))
                                        }), u.removeAllRanges()) : (c.map(function(t) {
                                            e.removeStyle(new CKEDITOR.style(d, {
                                                className: t
                                            }))
                                        }), n && (u = a.colorButton_colorClassNamePattern.replace("%s", n), d.childRule = function(e) {
                                            return !(e.is("a") || e.getElementsByTag("a").count()) || o(e)
                                        }, e.applyStyle(new CKEDITOR.style(d, {
                                            className: u
                                        }))))
                                    } else {
                                        for (u = e.createRange(), u.selectNodeContents(e.editable()), u = u.createIterator(), u.enlargeBr = !0; block = u.getNextParagraph("p");) block.isReadOnly() || (c.forEach(function(e) {
                                            block.removeClass(e)
                                        }), "default" !== n && block.addClass(i));
                                        e.forceNextSelectionCheck()
                                    }
                                    e.focus(), e.fire("saveSnapshot")
                                }
                            }
                        });
                    i.push('<table class="ck_btn_with_gray_border_top" style="table-layout: fixed; padding: 3px;" role="presentation" cellspacing=0 cellpadding=0>');
                    for (var E = 0, m = s.length; E < m; E++) {
                        var g = s[E],
                            p = r.replace("%s", g),
                            T = "cke_coloricon_" + g;
                        "default" === g ? i.push('</tr><tr id="cke_coloricon_default">') : "custom1" === g ? i.push('</tr><tr id="' + u + '">') : "custom2" !== g && E > 0 && (E - 1) % 4 === 0 && i.push("</tr><tr>");
                        var C = "",
                            I = "",
                            O = "<td>",
                            D = "";
                        switch (g) {
                            case "default":
                                O = '<td colspan="4">', D = '<span class="cke_coloricon_label">USE DEFAULT</span>';
                                break;
                            case "custom1":
                                O = '<td class="cke_customcolor_label" onclick="CKEDITOR.tools.callFunction(' + CKEDITOR.tools.addFunction(function() {
                                    a.colorButton_clickCustomColorLabelCallback && a.colorButton_clickCustomColorLabelCallback()
                                }) + ');" colspan="2">' + e.lang.colorbutton.custom + "</td><td>";
                            case "custom2":
                                I = ' id="' + d[g] + '"';
                                break;
                            default:
                                C = ' style="background: ' + l[E] + ';"'
                        }
                        i.push(O + '<a class="cke_colorbox" _cke_focus=1 hidefocus=true' + I + ' onclick="CKEDITOR.tools.callFunction(', f, ",'", g, "','", p, "','", n, '\');" role="option" aria-posinset="', E + 2, '" aria-setsize="', h, '"><span class="cke_colorbox ', T, '"', C, "></span>" + D + "</a></td>")
                    }
                    return i.push("</tr></table>"), i.join("")
                }

                function o(e) {
                    return "false" == e.getAttribute("contentEditable") || e.getAttribute("data-nostyle")
                }
                var a = e.config,
                    r = e.lang.colorbutton,
                    s = a.colorButton_colors.map(function(e) {
                        return e[0]
                    });
                s.push("custom1", "custom2"), s.unshift("default");
                var l = a.colorButton_colors.map(function(e) {
                    return e[1]
                });
                l.unshift(null);
                var c = s.map(function(e) {
                    return a.colorButton_colorClassNamePattern.replace("%s", e)
                });
                CKEDITOR.env.hc || t("TextColor", "fore", r.textColorTitle, 10);
                var u = CKEDITOR.tools.getNextId() + "_customColor",
                    d = {
                        custom1: CKEDITOR.tools.getNextId() + "_customColor",
                        custom2: CKEDITOR.tools.getNextId() + "_customColor"
                    }
            }
        }), CKEDITOR.config.colorButton_colors = [
            ["white", "#fff"],
            ["black", "#000"]
        ], CKEDITOR.config.colorButton_colorClassNamePattern = "%s", CKEDITOR.config.colorButton_foreStyle = {
            element: "span",
            attributes: {
                class: "#(className)"
            },
            overrides: [{
                element: "font",
                attributes: {
                    class: null
                }
            }]
        }, CKEDITOR.config.colorButton_backStyle = {
            element: "span",
            styles: {
                "background-color": "#(color)"
            }
        }, CKEDITOR.plugins.add("defaultstyle", {
            init: function(e) {
                if (e.config.defaultStyle) {
                    var t = e.config.defaultStyle,
                        n = new CKEDITOR.style({
                            element: "bold" === t ? "strong" : "em"
                        }),
                        i = !1;
                    e.on("beforeCommandExec", function(e) {
                        e.data.name === t && (i = !0)
                    }), e.on("afterCommandExec", function(e) {
                        e.data.name === t && (i = !1)
                    }), e.on("change", function() {
                        !i && !e.editable().getText().trim() && e.applyStyle(n)
                    }), e.on("focus", function() {
                        e.editable().getText().trim() || setTimeout(function() {
                            e.applyStyle(n)
                        }, 0)
                    })
                }
            }
        }), function() {
            function e(e, t) {
                var n = {},
                    i = [],
                    o = {
                        nbsp: " ",
                        shy: "­",
                        gt: ">",
                        lt: "<",
                        amp: "&",
                        apos: "'",
                        quot: '"'
                    },
                    e = e.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(e, a) {
                        var r = t ? "&" + a + ";" : o[a];
                        return n[r] = t ? o[a] : "&" + a + ";", i.push(r), ""
                    });
                if (!t && e) {
                    var a, e = e.split(","),
                        r = document.createElement("div");
                    for (r.innerHTML = "&" + e.join(";&") + ";", a = r.innerHTML, r = null, r = 0; r < a.length; r++) {
                        var s = a.charAt(r);
                        n[s] = "&" + e[r] + ";", i.push(s)
                    }
                }
                return n.regex = i.join(t ? "|" : ""), n
            }
            CKEDITOR.plugins.add("entities", {
                afterInit: function(t) {
                    function n(e) {
                        return l[e]
                    }

                    function i(e) {
                        return "force" != o.entities_processNumerical && r[e] ? r[e] : "&#" + e.charCodeAt(0) + ";"
                    }
                    var o = t.config;
                    if (t = (t = t.dataProcessor) && t.htmlFilter) {
                        var a = [];
                        o.basicEntities !== !1 && a.push("nbsp,gt,lt,amp"), o.entities && (a.length && a.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"), o.entities_latin && a.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), o.entities_greek && a.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"), o.entities_additional && a.push(o.entities_additional));
                        var r = e(a.join(",")),
                            s = r.regex ? "[" + r.regex + "]" : "a^";
                        delete r.regex, o.entities && o.entities_processNumerical && (s = "[^ -~]|" + s);
                        var s = RegExp(s, "g"),
                            l = e("nbsp,gt,lt,amp,shy", !0),
                            c = RegExp(l.regex, "g");
                        t.addRules({
                            text: function(e) {
                                return e.replace(c, n).replace(s, i)
                            }
                        }, {
                            applyToAll: !0,
                            excludeNestedEditable: !0
                        })
                    }
                }
            })
        }(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, CKEDITOR.config.entities_greek = !0, CKEDITOR.config.entities_additional = "#39", function() {
            function e(e) {
                var i = e.config,
                    o = e.fire("uiSpace", {
                        space: "top",
                        html: ""
                    }).html,
                    a = function() {
                        function o(e, t, i) {
                            s.setStyle(t, n(i)), s.setStyle("position", e)
                        }

                        function r(e) {
                            var t = c.getDocumentPosition();
                            switch (e) {
                                case "top":
                                    o("absolute", "top", t.y - f - g);
                                    break;
                                case "pin":
                                    o("fixed", "top", T + pushedOffsetY);
                                    break;
                                case "bottom":
                                    o("absolute", "top", t.y + (d.height || d.bottom - d.top) + g)
                            }
                            l = e
                        }
                        var l, c, u, d, h, f, E, m = i.floatSpaceDockedOffsetX || 0,
                            g = i.floatSpaceDockedOffsetY || 0,
                            p = i.floatSpacePinnedOffsetX || 0,
                            T = i.floatSpacePinnedOffsetY || 0;
                        return function(o) {
                            if (c = e.editable()) {
                                var T = o && "focus" == o.name;
                                T && s.show(), e.fire("floatingSpaceLayout", {
                                    show: T
                                }), s.removeStyle("left"), s.removeStyle("right"), u = s.getClientRect(), d = c.getClientRect(), h = t.getViewPaneSize(), f = u.height, E = "pageXOffset" in t.$ ? t.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft, pushedOffsetY = i.floatSpacePushedOffsetY ? i.floatSpacePushedOffsetY() : 0, l ? (r(f + g + pushedOffsetY <= d.top ? "top" : f + g + pushedOffsetY > h.height - d.bottom ? "pin" : "bottom"), o = i.floatSpacePreferRight ? "right" : d.left > 0 && d.right < h.width && d.width > u.width ? "rtl" == i.contentsLangDirection ? "right" : "left" : h.width > u.width && d.left + u.width > h.width ? "right" : "left", u.width > h.width ? (o = "left", T = 0) : (T = "left" == o ? d.left > 0 ? d.left : 0 : d.right < h.width ? h.width - d.right : 0, T + u.width > h.width && (o = "left" == o ? "right" : "left", T = 0)), s.setStyle(o, n(("pin" == l ? p : m) + T + ("pin" == l ? 0 : "left" == o ? E : -E)))) : (l = "pin", r("pin"), a(o))
                            }
                        }
                    }();
                if (o) {
                    var r = new CKEDITOR.template('<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}"' + (e.title ? ' aria-labelledby="cke_{name}_arialbl"' : " ") + ">" + (e.title ? '<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>' : " ") + '<div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>'),
                        s = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(r.output({
                            content: o,
                            id: e.id,
                            langDir: e.lang.dir,
                            langCode: e.langCode,
                            name: e.name,
                            style: "display:none;z-index:" + (i.baseFloatZIndex - 1),
                            topId: e.ui.spaceId("top"),
                            voiceLabel: e.title
                        }))),
                        l = CKEDITOR.tools.eventsBuffer(500, a),
                        c = CKEDITOR.tools.eventsBuffer(100, a);
                    s.unselectable(), s.on("mousedown", function(e) {
                        e = e.data, e.getTarget().hasAscendant("a", 1) || e.preventDefault()
                    }), e.on("focus", function(n) {
                        a(n), e.on("change", l.input), t.on("scroll", c.input), t.on("resize", c.input)
                    }), e.on("blur", function() {
                        s.hide(), e.removeListener("change", l.input), t.removeListener("scroll", c.input), t.removeListener("resize", c.input)
                    }), e.on("destroy", function() {
                        t.removeListener("scroll", c.input), t.removeListener("resize", c.input), s.clearCustomData(), s.remove()
                    }), e.focusManager.hasFocus && s.show(), e.focusManager.add(s, 1)
                }
            }
            var t = CKEDITOR.document.getWindow(),
                n = CKEDITOR.tools.cssLength;
            CKEDITOR.plugins.add("floatingspace", {
                init: function(t) {
                    t.on("loaded", function() {
                        e(this)
                    }, null, null, 20)
                }
            })
        }(), CKEDITOR.plugins.add("fontfamily", {
            init: function(e) {
                var t = new CKEDITOR.command(e, {
                    exec: function(e) {
                        e.config.fontfamilyCallback()
                    }
                });
                e.addCommand("fontfamily", t), e.ui.addButton("FontFamily", {
                    label: e.lang.fontfamily.label,
                    command: "fontfamily",
                    toolbar: "basicstyles"
                })
            }
        }), CKEDITOR.plugins.add("menu", {
            requires: "floatpanel",
            beforeInit: function(e) {
                for (var t = e.config.menu_groups.split(","), n = e._.menuGroups = {}, i = e._.menuItems = {}, o = 0; o < t.length; o++) n[t[o]] = o + 1;
                e.addMenuGroup = function(e, t) {
                    n[e] = t || 100
                }, e.addMenuItem = function(e, t) {
                    n[t.group] && (i[e] = new CKEDITOR.menuItem(this, e, t))
                }, e.addMenuItems = function(e) {
                    for (var t in e) this.addMenuItem(t, e[t])
                }, e.getMenuItem = function(e) {
                    return i[e]
                }, e.removeMenuItem = function(e) {
                    delete i[e]
                }
            }
        }), function() {
            function e(e) {
                e.sort(function(e, t) {
                    return e.group < t.group ? -1 : e.group > t.group ? 1 : e.order < t.order ? -1 : e.order > t.order ? 1 : 0
                })
            }
            var t = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="{role}" aria-haspopup="{hasPopup}" aria-disabled="{disabled}" {ariaChecked}';
            CKEDITOR.env.gecko && CKEDITOR.env.mac && (t += ' onkeypress="return false;"'), CKEDITOR.env.gecko && (t += ' onblur="this.style.cssText = this.style.cssText;"');
            var t = t + (' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">'),
                n = CKEDITOR.addTemplate("menuItem", t + '<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{arrowHtml}</span></a></span>'),
                i = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>');
            CKEDITOR.menu = CKEDITOR.tools.createClass({
                $: function(e, t) {
                    t = this._.definition = t || {}, this.id = CKEDITOR.tools.getNextId(), this.editor = e, this.items = [], this._.listeners = [], this._.level = t.level || 1;
                    var n = CKEDITOR.tools.extend({}, t.panel, {
                            css: [CKEDITOR.skin.getPath("editor")],
                            level: this._.level - 1,
                            block: {}
                        }),
                        i = n.block.attributes = n.attributes || {};
                    !i.role && (i.role = "menu"), this._.panelDefinition = n
                },
                _: {
                    onShow: function() {
                        var e = this.editor.getSelection(),
                            t = e && e.getStartElement(),
                            n = this.editor.elementPath(),
                            i = this._.listeners;
                        this.removeAll();
                        for (var o = 0; o < i.length; o++) {
                            var a = i[o](t, e, n);
                            if (a)
                                for (var r in a) {
                                    var s = this.editor.getMenuItem(r);
                                    !s || s.command && !this.editor.getCommand(s.command).state || (s.state = a[r], this.add(s))
                                }
                        }
                    },
                    onClick: function(e) {
                        this.hide(), e.onClick ? e.onClick() : e.command && this.editor.execCommand(e.command)
                    },
                    onEscape: function(e) {
                        var t = this.parent;
                        return t ? t._.panel.hideChild(1) : 27 == e && this.hide(1), !1
                    },
                    onHide: function() {
                        this.onHide && this.onHide()
                    },
                    showSubMenu: function(e) {
                        var t = this._.subMenu,
                            n = this.items[e];
                        if (n = n.getItems && n.getItems()) {
                            t ? t.removeAll() : (t = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {
                                level: this._.level + 1
                            }, !0)), t.parent = this, t._.onClick = CKEDITOR.tools.bind(this._.onClick, this));
                            for (var i in n) {
                                var o = this.editor.getMenuItem(i);
                                o && (o.state = n[i], t.add(o))
                            }
                            var a = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + ("" + e));
                            setTimeout(function() {
                                t.show(a, 2)
                            }, 0)
                        } else this._.panel.hideChild(1)
                    }
                },
                proto: {
                    add: function(e) {
                        e.order || (e.order = this.items.length), this.items.push(e)
                    },
                    removeAll: function() {
                        this.items = []
                    },
                    show: function(t, n, i, o) {
                        if (this.parent || (this._.onShow(), this.items.length)) {
                            var n = n || ("rtl" == this.editor.lang.dir ? 2 : 1),
                                a = this.items,
                                r = this.editor,
                                s = this._.panel,
                                l = this._.element;
                            if (!s) {
                                s = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level), s.onEscape = CKEDITOR.tools.bind(function(e) {
                                    if (this._.onEscape(e) === !1) return !1
                                }, this), s.onShow = function() {
                                    s._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all")
                                }, s.onHide = CKEDITOR.tools.bind(function() {
                                    this._.onHide && this._.onHide()
                                }, this), l = s.addBlock(this.id, this._.panelDefinition.block), l.autoSize = !0;
                                var c = l.keys;
                                c[40] = "next", c[9] = "next", c[38] = "prev", c[CKEDITOR.SHIFT + 9] = "prev", c["rtl" == r.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click", c[32] = CKEDITOR.env.ie ? "mouseup" : "click", CKEDITOR.env.ie && (c[13] = "mouseup"), l = this._.element = l.element, c = l.getDocument(), c.getBody().setStyle("overflow", "hidden"), c.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"), this._.itemOverFn = CKEDITOR.tools.addFunction(function(e) {
                                    clearTimeout(this._.showSubTimeout), this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, r.config.menu_subMenuDelay || 400, this, [e])
                                }, this), this._.itemOutFn = CKEDITOR.tools.addFunction(function() {
                                    clearTimeout(this._.showSubTimeout)
                                }, this), this._.itemClickFn = CKEDITOR.tools.addFunction(function(e) {
                                    var t = this.items[e];
                                    t.state == CKEDITOR.TRISTATE_DISABLED ? this.hide(1) : t.getItems ? this._.showSubMenu(e) : this._.onClick(t)
                                }, this)
                            }
                            e(a);
                            for (var c = r.elementPath(), c = ['<div class="cke_menu' + (c && c.direction() != r.lang.dir ? " cke_mixed_dir_content" : "") + '" role="presentation">'], u = a.length, d = u && a[0].group, h = 0; h < u; h++) {
                                var f = a[h];
                                d != f.group && (c.push('<div class="cke_menuseparator" role="separator"></div>'), d = f.group), f.render(this, h, c)
                            }
                            c.push("</div>"), l.setHtml(c.join("")), CKEDITOR.ui.fire("ready", this), this.parent ? this.parent._.panel.showAsChild(s, this.id, t, n, i, o) : s.showBlock(this.id, t, n, i, o), r.fire("menuShow", [s])
                        }
                    },
                    addListener: function(e) {
                        this._.listeners.push(e)
                    },
                    hide: function(e) {
                        this._.onHide && this._.onHide(), this._.panel && this._.panel.hide(e)
                    }
                }
            }), CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                $: function(e, t, n) {
                    CKEDITOR.tools.extend(this, n, {
                        order: 0,
                        className: "cke_menubutton__" + t
                    }), this.group = e._.menuGroups[this.group], this.editor = e, this.name = t
                },
                proto: {
                    render: function(e, t, o) {
                        var a = e.id + ("" + t),
                            r = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state,
                            s = "",
                            l = r == CKEDITOR.TRISTATE_ON ? "on" : r == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
                        this.role in {
                            menuitemcheckbox: 1,
                            menuitemradio: 1
                        } && (s = ' aria-checked="' + (r == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
                        var c = this.getItems,
                            u = "&#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";",
                            d = this.name;
                        this.icon && !/\./.test(this.icon) && (d = this.icon), e = {
                            id: a,
                            name: this.name,
                            iconName: d,
                            label: this.label,
                            cls: this.className || "",
                            state: l,
                            hasPopup: c ? "true" : "false",
                            disabled: r == CKEDITOR.TRISTATE_DISABLED,
                            title: this.label,
                            hoverFn: e._.itemOverFn,
                            moveOutFn: e._.itemOutFn,
                            clickFn: e._.itemClickFn,
                            index: t,
                            iconStyle: CKEDITOR.skin.getIconStyle(d, "rtl" == this.editor.lang.dir, d == this.icon ? null : this.icon, this.iconOffset),
                            arrowHtml: c ? i.output({
                                label: u
                            }) : "",
                            role: this.role ? this.role : "menuitem",
                            ariaChecked: s
                        }, n.output(e, o)
                    }
                }
            })
        }(), CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div", CKEDITOR.plugins.add("menubutton", {
            requires: "button,menu",
            onLoad: function() {
                var e = function(e) {
                    var t = this._,
                        n = t.menu;
                    t.state !== CKEDITOR.TRISTATE_DISABLED && (t.on && n ? n.hide() : (t.previousState = t.state, n || (n = t.menu = new CKEDITOR.menu(e, {
                        panel: {
                            className: "cke_menu_panel",
                            attributes: {
                                "aria-label": e.lang.common.options
                            }
                        }
                    }), n.onHide = CKEDITOR.tools.bind(function() {
                        var n = this.command ? e.getCommand(this.command).modes : this.modes;
                        this.setState(!n || n[e.mode] ? t.previousState : CKEDITOR.TRISTATE_DISABLED), t.on = 0
                    }, this), this.onMenu && n.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), t.on = 1, setTimeout(function() {
                        n.show(CKEDITOR.document.getById(t.id), 4)
                    }, 0)))
                };
                CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.button,
                    $: function(t) {
                        delete t.panel, this.base(t), this.hasArrow = !0, this.click = e
                    },
                    statics: {
                        handler: {
                            create: function(e) {
                                return new CKEDITOR.ui.menuButton(e)
                            }
                        }
                    }
                })
            },
            beforeInit: function(e) {
                e.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler)
            }
        }), CKEDITOR.UI_MENUBUTTON = "menubutton", CKEDITOR.plugins.add("fontsize", {
            requires: "menubutton",
            init: function(e) {
                function t(e, t, n) {
                    this.editor = e, this.name = t, this.value = n, this.context = "p"
                }
                t.prototype.exec = function(e) {
                    var t = e.getSelection();
                    if (t) {
                        var n = t.createBookmarks();
                        if (this.editor.config.advancedEditor) {
                            var i = this,
                                o = function(e) {
                                    var t = e.getName(),
                                        n = e.getParent(),
                                        i = n.getName(),
                                        i = n.getAttribute("contenteditable") && "div" === i && "ul" !== t && "ol" !== t;
                                    return "p" === t || "li" === t || i ? e : o(n)
                                };
                            (t.getRanges() || []).map(function(e) {
                                for (var t = new CKEDITOR.dom.walker(e), e = t.next() || e.endPath().elements[0]; e;) e.type === CKEDITOR.NODE_TEXT && (e = e.getParent()), e = o(e), i.value && e.setStyle("font-size", i.value + "%"), e = t.next()
                            })
                        } else {
                            var a = e.createRange();
                            for (a.selectNodeContents(e.editable()), a = a.createIterator(), a.enlargeBr = !0; block = a.getNextParagraph("p");) block.isReadOnly() || (block.removeStyle("font-size"), 100 !== this.value && block.setStyle("font-size", this.value + "%"))
                        }
                        e.focus(), e.forceNextSelectionCheck(), t.selectBookmarks(n)
                    }
                };
                for (var n = [{
                        label: e.lang.fontsize.smaller,
                        name: "fontsizeSmaller",
                        size: 60
                    }, {
                        label: e.lang.fontsize.small,
                        name: "fontsizeSmall",
                        size: 80
                    }, {
                        label: e.lang.fontsize.normal,
                        name: "fontsizeNormal",
                        size: 100
                    }, {
                        label: e.lang.fontsize.large,
                        name: "fontsizeLarge",
                        size: 130
                    }, {
                        label: e.lang.fontsize.larger,
                        name: "fontsizeLarger",
                        size: 160
                    }], i = 0; i < n.length; i++) {
                    var o = n[i],
                        a = new t(e, o.name.toLowerCase(), o.size);
                    e.addCommand(o.name.toLowerCase(), a)
                }
                var r = e.config.minFontSize;
                for (e.ui.add("FontSize", CKEDITOR.UI_MENUBUTTON, {
                        label: e.lang.fontsize.label,
                        onMenu: function() {
                            var t;
                            (t = e.getSelection()) ? (t = t.getRanges()[0].createIterator(), t.enlargeBr = !0, block = t.getNextParagraph("p"), t = block.getStyle("font-size"), t = "%" === t.slice(-1) ? parseInt(t, 10) : 100) : t = 100;
                            for (var i = parseInt(e.element.getComputedStyle("font-size"), 10), i = r / i * 100, o = {}, a = 0; a < n.length; a++) {
                                var s = n[a];
                                (!r || s.size >= i) && (o[s.name] = t === s.size ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                            }
                            return o
                        }
                    }), e.addMenuGroup("fontsizeButton"), a = {}, i = 0; i < n.length; i++) o = n[i], a[o.name] = {
                    label: o.label,
                    group: "fontsizeButton",
                    command: o.name.toLowerCase()
                };
                e.addMenuItems(a)
            }
        }), CKEDITOR.plugins.add("listblock", {
            requires: "panel",
            onLoad: function() {
                var e = CKEDITOR.addTemplate("panel-list", '<ul role="presentation" class="cke_panel_list">{items}</ul>'),
                    t = CKEDITOR.addTemplate("panel-list-item", '<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\', \'oBlur\', event); return false;" role="option">{text}</a></li>'),
                    n = CKEDITOR.addTemplate("panel-list-group", '<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>'),
                    i = /\'/g,
                    o = CKEDITOR.addTemplate("panel-bottom-bar", '<div class="panel-bottom-bar"><div class="input-wrapper {lightClass}" title=""><div class="tooltip"><div class="arrow"></div>{title}</div><input type="text" value="{value}" onfocus="CKEDITOR.tools.callFunction({onfocusEvent}, event)" onblur="CKEDITOR.tools.callFunction({onblurEvent}, event)" maxLength="3" /><div class="unit">px</div></div><div class="control-wrapper" title=""> <div class="save-btn" onclick="CKEDITOR.tools.callFunction({onSaveFont}, event)">{saveText}</div> <div class="reset-btn" onclick="CKEDITOR.tools.callFunction({onResetFont}, event)">{resetText}</div></div></div>');
                CKEDITOR.ui.panel.prototype.addListBlock = function(e, t) {
                    return this.addBlock(e, new CKEDITOR.ui.listBlock(this.getHolderElement(), t))
                }, CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.panel.block,
                    $: function(e, t) {
                        var t = t || {},
                            n = t.attributes || (t.attributes = {});
                        (this.multiSelect = !!t.multiSelect) && (n["aria-multiselectable"] = !0), !n.role && (n.role = "listbox"), this.base.apply(this, arguments), this.element.setAttribute("role", n.role), n = this.keys, n[40] = "next", n[9] = "next", n[38] = "prev", n[CKEDITOR.SHIFT + 9] = "prev", n[32] = CKEDITOR.env.ie ? "mouseup" : "click", CKEDITOR.env.ie && (n[13] = "mouseup"), this._.pendingHtml = [], this._.pendingList = [], this._.items = {}, this._.groups = {}, this._.barParams = {
                            typeTooltip: ""
                        }
                    },
                    _: {
                        close: function() {
                            if (this._.started) {
                                var t = e.output({
                                    items: this._.pendingList.join("")
                                });
                                this._.pendingList = [], this._.pendingHtml.push(t), this._.pendingHtml.push(o.output(this._.barParams)), delete this._.started
                            }
                        },
                        getClick: function() {
                            return this._.click || (this._.click = CKEDITOR.tools.addFunction(function(e, t, n) {
                                var i = this.toggle(e);
                                this.onClick && this.onClick(e, i, t, n)
                            }, this)), this._.click
                        }
                    },
                    proto: {
                        add: function(e, n, o) {
                            var a = CKEDITOR.tools.getNextId();
                            this._.started || (this._.started = 1, this._.size = this._.size || 0), this._.items[e] = a;
                            var r;
                            r = CKEDITOR.tools.htmlEncodeAttr(e).replace(i, "\\'"), e = {
                                id: a,
                                val: r,
                                onclick: CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick",
                                clickFn: this._.getClick(),
                                title: CKEDITOR.tools.htmlEncodeAttr(o || e),
                                text: n || e
                            }, this._.pendingList.push(t.output(e))
                        },
                        initPixelSize: function(e) {
                            var t = CKEDITOR.tools.addFunction(function(t) {
                                    e.onfocusEvent && e.onfocusEvent(t)
                                }),
                                n = CKEDITOR.tools.addFunction(function(t) {
                                    e.onblurEvent && e.onblurEvent(t)
                                }),
                                i = CKEDITOR.tools.addFunction(function(t) {
                                    e.onResetFont && e.onResetFont(t)
                                }),
                                o = CKEDITOR.tools.addFunction(function(t) {
                                    e.onSaveFont && e.onSaveFont(t)
                                });
                            this._.barParams = {
                                title: e.title,
                                saveText: e.saveText,
                                resetText: e.resetText,
                                onclick: CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick",
                                clickFn: this._.getClick(),
                                onfocusEvent: t,
                                onblurEvent: n,
                                onResetFont: i,
                                onSaveFont: o,
                                value: e.value,
                                lightClass: e.lightClass
                            }
                        },
                        startGroup: function(e) {
                            this._.close();
                            var t = CKEDITOR.tools.getNextId();
                            this._.groups[e] = t, this._.pendingHtml.push(n.output({
                                id: t,
                                label: e
                            }))
                        },
                        commit: function() {
                            this._.close(), this.element.appendHtml(this._.pendingHtml.join("")), delete this._.size, this._.pendingHtml = []
                        },
                        toggle: function(e) {
                            var t = this.isMarked(e);
                            return t ? this.unmark(e) : this.mark(e), !t
                        },
                        hideGroup: function(e) {
                            var t = (e = this.element.getDocument().getById(this._.groups[e])) && e.getNext();
                            e && (e.setStyle("display", "none"), t && "ul" == t.getName() && t.setStyle("display", "none"))
                        },
                        hideItem: function(e) {
                            this.element.getDocument().getById(this._.items[e]).setStyle("display", "none")
                        },
                        showAll: function() {
                            var e, t = this._.items,
                                n = this._.groups,
                                i = this.element.getDocument();
                            for (e in t) i.getById(t[e]).setStyle("display", "");
                            for (var o in n) t = i.getById(n[o]), e = t.getNext(), t.setStyle("display", ""), e && "ul" == e.getName() && e.setStyle("display", "")
                        },
                        mark: function(e) {
                            this.multiSelect || this.unmarkAll();
                            var e = this._.items[e],
                                t = this.element.getDocument().getById(e);
                            t.addClass("cke_selected"), this.element.getDocument().getById(e + "_option").setAttribute("aria-selected", !0), this.onMark && this.onMark(t)
                        },
                        unmark: function(e) {
                            var t = this.element.getDocument(),
                                e = this._.items[e],
                                n = t.getById(e);
                            n.removeClass("cke_selected"), t.getById(e + "_option").removeAttribute("aria-selected"), this.onUnmark && this.onUnmark(n)
                        },
                        unmarkAll: function() {
                            var e, t = this._.items,
                                n = this.element.getDocument();
                            for (e in t) {
                                var i = t[e];
                                n.getById(i).removeClass("cke_selected"), n.getById(i + "_option").removeAttribute("aria-selected")
                            }
                            this.onUnmark && this.onUnmark()
                        },
                        isMarked: function(e) {
                            return this.element.getDocument().getById(this._.items[e]).hasClass("cke_selected")
                        },
                        focus: function(e) {
                            this._.focusIndex = -1;
                            var t, n = this.element.getElementsByTag("a"),
                                i = -1;
                            if (e) {
                                for (t = this.element.getDocument().getById(this._.items[e]).getFirst(); e = n.getItem(++i);)
                                    if (e.equals(t)) {
                                        this._.focusIndex = i;
                                        break
                                    }
                            } else this.element.focus();
                            t && setTimeout(function() {
                                t.focus()
                            }, 0)
                        }
                    }
                })
            }
        }), CKEDITOR.plugins.add("richcombo", {
            requires: "floatpanel,listblock,button",
            beforeInit: function(e) {
                e.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler)
            }
        }), function() {
            var e = '<span id="{id}" class="cke_combo cke_combo__{name} {cls}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" title="{title}" tabindex="-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href=\"javascript:void('{titleJs}')\"") + ' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"';
            CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress="return false;"'), CKEDITOR.env.gecko && (e += ' onblur="this.style.cssText = this.style.cssText;"');
            var e = e + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : CKEDITOR.env.air ? "&nbsp;" : "") + "</span></span></a></span>"),
                t = CKEDITOR.addTemplate("combo", e);
            CKEDITOR.UI_RICHCOMBO = "richcombo", CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                $: function(e) {
                    CKEDITOR.tools.extend(this, e, {
                        canGroup: !1,
                        title: e.label,
                        modes: {
                            wysiwyg: 1
                        },
                        editorFocus: 1
                    }), e = this.panel || {}, delete this.panel, this.id = CKEDITOR.tools.getNextNumber(), this.document = e.parent && e.parent.getDocument() || CKEDITOR.document, e.className = "cke_combopanel", e.block = {
                        multiSelect: e.multiSelect,
                        attributes: e.attributes
                    }, e.toolbarRelated = !0, this._ = {
                        panelDefinition: e,
                        items: {}
                    }
                },
                proto: {
                    renderHtml: function(e) {
                        var t = [];
                        return this.render(e, t), t.join("")
                    },
                    render: function(e, n) {
                        function i() {
                            if (this.getState() != CKEDITOR.TRISTATE_ON) {
                                var t = this.modes[e.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                                e.readOnly && !this.readOnly && (t = CKEDITOR.TRISTATE_DISABLED), this.setState(t), this.setValue(""), t != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh()
                            }
                        }
                        var o = CKEDITOR.env,
                            a = "cke_" + this.id,
                            r = CKEDITOR.tools.addFunction(function(t) {
                                d && (e.unlockSelection(1), d = 0), l.execute(t)
                            }, this),
                            s = this,
                            l = {
                                id: a,
                                combo: this,
                                focus: function() {
                                    CKEDITOR.document.getById(a).getChild(1).focus()
                                },
                                execute: function(t) {
                                    var n = s._;
                                    if (n.state != CKEDITOR.TRISTATE_DISABLED)
                                        if (s.createPanel(e), n.on) n.panel.hide();
                                        else {
                                            s.commit();
                                            var i = s.getValue();
                                            i ? n.list.mark(i) : n.list.unmarkAll(), n.panel.showBlock(s.id, new CKEDITOR.dom.element(t), 4)
                                        }
                                },
                                clickFn: r
                            };
                        e.on("activeFilterChange", i, this), e.on("mode", i, this), e.on("selectionChange", i, this), !this.readOnly && e.on("readOnly", i, this);
                        var c = CKEDITOR.tools.addFunction(function(t, n) {
                                var t = new CKEDITOR.dom.event(t),
                                    i = t.getKeystroke();
                                switch (40 == i && e.once("panelShow", function(e) {
                                        e.data._.panel._.currentBlock.onKeyDown(40)
                                    }), i) {
                                    case 13:
                                    case 32:
                                    case 40:
                                        CKEDITOR.tools.callFunction(r, n);
                                        break;
                                    default:
                                        l.onkey(l, i)
                                }
                                t.preventDefault()
                            }),
                            u = CKEDITOR.tools.addFunction(function() {
                                l.onfocus && l.onfocus()
                            }),
                            d = 0;
                        return l.keyDownFn = c, o = {
                            id: a,
                            name: this.name || this.command,
                            label: this.label,
                            title: this.title,
                            cls: this.className || "",
                            titleJs: o.gecko && !o.hc ? "" : (this.title || "").replace("'", ""),
                            keydownFn: c,
                            focusFn: u,
                            clickFn: r
                        }, t.output(o, n), this.onRender && this.onRender(), l
                    },
                    createPanel: function(e) {
                        if (!this._.panel) {
                            var t = this._.panelDefinition,
                                n = this._.panelDefinition.block,
                                i = t.parent || CKEDITOR.document.getBody(),
                                o = "cke_combopanel__" + this.name,
                                a = new CKEDITOR.ui.floatPanel(e, i, t),
                                r = a.addListBlock(this.id, n),
                                s = this;
                            a.onShow = function() {
                                this.element.addClass(o), s.setState(CKEDITOR.TRISTATE_ON), s._.on = 1, s.editorFocus && !e.focusManager.hasFocus && e.focus(), s.onOpen && s.onOpen(), e.once("panelShow", function() {
                                    r.focus(!r.multiSelect && s.getValue())
                                })
                            }, a.onHide = function(t) {
                                this.element.removeClass(o), s.setState(s.modes && s.modes[e.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), s._.on = 0, !t && s.onClose && s.onClose()
                            }, a.onEscape = function() {
                                a.hide(1)
                            }, r.onClick = function(e, t, n, i) {
                                s.onClick && s.onClick.call(s, e, t, i), n || a.hide()
                            }, this._.panel = a, this._.list = r, a.getBlock(this.id).onHide = function() {
                                s._.on = 0, s.setState(CKEDITOR.TRISTATE_OFF)
                            }, this.init && this.init()
                        }
                    },
                    setValue: function(e, t) {
                        this._.value = e;
                        var n = this.document.getById("cke_" + this.id + "_text");
                        n && (e || t ? n.removeClass("cke_combo_inlinelabel") : (t = this.label, n.addClass("cke_combo_inlinelabel")), n.setText("undefined" != typeof t ? t : e))
                    },
                    getValue: function() {
                        return this._.value || ""
                    },
                    unmarkAll: function() {
                        this._.list.unmarkAll()
                    },
                    mark: function(e) {
                        this._.list.mark(e)
                    },
                    hideItem: function(e) {
                        this._.list.hideItem(e)
                    },
                    hideGroup: function(e) {
                        this._.list.hideGroup(e)
                    },
                    showAll: function() {
                        this._.list.showAll()
                    },
                    add: function(e, t, n) {
                        this._.items[e] = n || e, this._.list.add(e, t, n)
                    },
                    initPixelSize: function(e) {
                        this._.list.initPixelSize(e)
                    },
                    startGroup: function(e) {
                        this._.list.startGroup(e)
                    },
                    commit: function() {
                        this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this)), this._.committed = 1
                    },
                    setState: function(e) {
                        if (this._.state != e) {
                            var t = this.document.getById("cke_" + this.id);
                            t.setState(e, "cke_combo"), e == CKEDITOR.TRISTATE_DISABLED ? t.setAttribute("aria-disabled", !0) : t.removeAttribute("aria-disabled"), this._.state = e
                        }
                    },
                    getState: function() {
                        return this._.state
                    },
                    enable: function() {
                        this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState)
                    },
                    disable: function() {
                        this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED))
                    }
                },
                statics: {
                    handler: {
                        create: function(e) {
                            return new CKEDITOR.ui.richCombo(e)
                        }
                    }
                }
            }), CKEDITOR.ui.prototype.addRichCombo = function(e, t) {
                this.add(e, CKEDITOR.UI_RICHCOMBO, t)
            }
        }(), CKEDITOR.plugins.add("format", {
            requires: "richcombo",
            init: function(e) {
                if (!e.blockless) {
                    for (var t = e.config, n = t.format_tags.split(";"), i = {}, o = 0, a = [], r = 0; r < n.length; r++) {
                        var s = n[r],
                            l = new CKEDITOR.style(t["format_" + s]);
                        e.filter.customConfig && !e.filter.check(l) || (o++, i[s] = l, i[s]._.enterMode = e.config.enterMode, a.push(l))
                    }
                    0 !== o && e.ui.addRichCombo("Format", {
                        label: "",
                        toolbar: "styles,20",
                        allowedContent: a,
                        panel: {
                            css: [CKEDITOR.skin.getPath("editor")].concat(t.contentsCss),
                            multiSelect: !1
                        },
                        init: function() {
                            var t, n = function() {
                                    this.unmarkAll.call(this)
                                },
                                n = n.bind(this);
                            for (t in i) this.add(t, e.lang.format[t], "content-" + t);
                            t = e.config.getFontInputPhase() || {};
                            var o = e.elementPath().block.$,
                                a = o.style.fontSize || "",
                                r = "";
                            a && !o.className && (r = "highlight"), a = a.replace("px", ""), o = a.split("%"), o.length > 1 && (a = parseInt(Number(o[0]) / 100 * e.config.getTextFontSize())), this.initPixelSize({
                                value: a || e.config.getTextFontSize(),
                                title: t.inputTooltip,
                                saveText: t.save,
                                resetText: t.reset,
                                onfocusEvent: function(e) {
                                    e = $(e.target).parents(".panel-bottom-bar"), e.find(".save-btn").show(), e.find(".reset-btn").hide()
                                },
                                onblurEvent: function(e) {
                                    var t = $(e.target).parents(".panel-bottom-bar");
                                    setTimeout(function() {
                                        t.find(".save-btn").hide(), t.find(".reset-btn").show()
                                    }, 300)
                                },
                                onSaveFont: function(t) {
                                    var i = $(t.target).parents(".panel-bottom-bar"),
                                        t = i.find("input");
                                    t.focus();
                                    var o = t.val(),
                                        a = e.elementPath().block.$,
                                        o = Number(o);
                                    Number.isNaN(o) ? (o = a.style.fontSize.replace("px", "") || e.config.getTextFontSize(), o = Number(o)) : o > 120 ? o = 120 : o < 6 && (o = 6), o = parseInt(o), t.val(o), e.fire("saveSnapshot"), i.find(".input-wrapper").addClass("highlight");
                                    var i = "",
                                        r = {
                                            element: "p",
                                            attributes: {}
                                        };
                                    a.className && (r.attributes.class = ""), o && (i += "font-size:" + o + "px;"), i && (r.attributes.style = i), o = new CKEDITOR.style(r), e.applyStyle(o), setTimeout(function() {
                                        e.fire("saveSnapshot")
                                    }, 0), n(), t.blur()
                                },
                                onResetFont: function(t) {
                                    e.fire("saveSnapshot");
                                    var t = $(t.target).parents(".panel-bottom-bar"),
                                        i = t.find("input"),
                                        o = e.elementPath().block.$,
                                        a = o.localName,
                                        r = o.className,
                                        s = o.style.fontSize,
                                        o = "",
                                        l = {
                                            attributes: {}
                                        };
                                    a && (l.element = a), r && (l.attributes.class = r), s && (o += "font-size:" + s + ";", a = e.config.getTextFontSize(), i.val(a)), o && (l.attributes.style = o), i = new CKEDITOR.style(l), e.removeStyle(i), t.find(".input-wrapper").removeClass("highlight"), setTimeout(function() {
                                        e.fire("saveSnapshot")
                                    }, 0), n()
                                },
                                lightClass: r
                            })
                        },
                        onClick: function(t, n, i) {
                            e.fire("saveSnapshot");
                            var n = $(i.target).parents(".cke_panel_block"),
                                i = n.find(".panel-bottom-bar input"),
                                o = e.elementPath().block.$.style.textAlign,
                                a = "",
                                r = CKEDITOR.config["format_" + t],
                                s = {
                                    element: r.element,
                                    attributes: r.attributes
                                },
                                t = r.fontSize || "";
                            r.fontSize && ("p" != r.element && "h5" != r.element || (t = e.config.getTextFontSize() + "px"), "div" == r.element && (t = parseInt(.83 * e.config.getTextFontSize()) + "px"), a += "font-size:" + t + ";"), o && (a += "text-align:" + o + ";"), a && (s.attributes.style = a), o = new CKEDITOR.style(s), a = o.checkActive(e.elementPath(), e) ? "removeStyle" : "applyStyle", e[a](o), "applyStyle" === a ? i.val(t.replace("px", "")) : i.val(e.config.getTextFontSize()), n.find(".input-wrapper").removeClass("highlight"), setTimeout(function() {
                                e.fire("saveSnapshot")
                            }, 0)
                        },
                        onRender: function() {
                            e.on("selectionChange", function(t) {
                                var n = this.getValue(),
                                    t = t.data.path;
                                this.refresh();
                                for (var o in i)
                                    if (i[o].checkActive(t, e)) return void(o != n && this.setValue(o, e.lang.format[o]));
                                this.setValue("")
                            }, this)
                        },
                        onOpen: function() {
                            this.showAll();
                            for (var t in i) e.activeFilter.check(i[t]) || this.hideItem(t)
                        },
                        refresh: function() {
                            var t = e.elementPath();
                            if (t) {
                                if (t.isContextFor("p"))
                                    for (var n in i)
                                        if (e.activeFilter.check(i[n])) return;
                                this.setState(CKEDITOR.TRISTATE_DISABLED)
                            }
                        }
                    })
                }
            }
        }), CKEDITOR.config.format_tags = "h1;h2;h3;h4;h5;p;div", CKEDITOR.config.format_p = {
            element: "p",
            attributes: {
                class: "normalPara"
            },
            fontSize: "100%"
        }, CKEDITOR.config.format_div = {
            element: "div",
            attributes: {
                class: "normalDiv"
            },
            fontSize: "83%"
        }, CKEDITOR.config.format_pre = {
            element: "pre"
        }, CKEDITOR.config.format_address = {
            element: "address"
        }, CKEDITOR.config.format_h1 = {
            element: "h1",
            attributes: {
                class: "h1Tag"
            },
            fontSize: "48px"
        }, CKEDITOR.config.format_h2 = {
            element: "h2",
            attributes: {
                class: "h2Tag"
            },
            fontSize: "28px"
        }, CKEDITOR.config.format_h3 = {
            element: "h3",
            attributes: {
                class: "h3Tag"
            },
            fontSize: "24px"
        }, CKEDITOR.config.format_h4 = {
            element: "h4",
            attributes: {
                class: "h4Tag"
            },
            fontSize: "20px"
        }, CKEDITOR.config.format_h5 = {
            element: "h5",
            attributes: {
                class: "h5Tag"
            },
            fontSize: "100%"
        }, CKEDITOR.config.format_h6 = {
            element: "h6"
        }, function() {
            function e(e, i) {
                var o, a;
                i.on("refresh", function(e) {
                    var i, o = [t];
                    for (i in e.data.states) o.push(e.data.states[i]);
                    this.setState(CKEDITOR.tools.search(o, n) ? n : t)
                }, i, null, 100), i.on("exec", function(t) {
                    o = e.getSelection(), a = o.createBookmarks(1), t.data || (t.data = {}), t.data.done = !1
                }, i, null, 0), i.on("exec", function() {
                    e.forceNextSelectionCheck(), o.selectBookmarks(a)
                }, i, null, 100)
            }
            var t = CKEDITOR.TRISTATE_DISABLED,
                n = CKEDITOR.TRISTATE_OFF;
            CKEDITOR.plugins.add("indent", {
                init: function(t) {
                    var n = CKEDITOR.plugins.indent.genericDefinition;
                    e(t, t.addCommand("indent", new n(!0))), e(t, t.addCommand("outdent", new n)), t.ui.addButton && (t.ui.addButton("Indent", {
                        label: t.lang.indent.indent,
                        command: "indent",
                        directional: !0,
                        toolbar: "indent,20"
                    }), t.ui.addButton("Outdent", {
                        label: t.lang.indent.outdent,
                        command: "outdent",
                        directional: !0,
                        toolbar: "indent,10"
                    })), t.on("dirChanged", function(e) {
                        var n = t.createRange(),
                            i = e.data.node;
                        n.setStartBefore(i), n.setEndAfter(i);
                        for (var o, a = new CKEDITOR.dom.walker(n); o = a.next();)
                            if (o.type == CKEDITOR.NODE_ELEMENT)
                                if (!o.equals(i) && o.getDirection()) n.setStartAfter(o), a = new CKEDITOR.dom.walker(n);
                                else {
                                    var r = t.config.indentClasses;
                                    if (r)
                                        for (var s = "ltr" == e.data.dir ? ["_rtl", ""] : ["", "_rtl"], l = 0; l < r.length; l++) o.hasClass(r[l] + s[0]) && (o.removeClass(r[l] + s[0]), o.addClass(r[l] + s[1]));
                                    r = o.getStyle("margin-right"), s = o.getStyle("margin-left"), r ? o.setStyle("margin-left", r) : o.removeStyle("margin-left"), s ? o.setStyle("margin-right", s) : o.removeStyle("margin-right")
                                }
                    })
                }
            }), CKEDITOR.plugins.indent = {
                genericDefinition: function(e) {
                    this.isIndent = !!e, this.startDisabled = !this.isIndent
                },
                specificDefinition: function(e, t, n) {
                    this.name = t, this.editor = e, this.jobs = {}, this.enterBr = e.config.enterMode == CKEDITOR.ENTER_BR, this.isIndent = !!n, this.relatedGlobal = n ? "indent" : "outdent", this.indentKey = n ? 9 : CKEDITOR.SHIFT + 9, this.database = {}
                },
                registerCommands: function(e, t) {
                    e.on("pluginsLoaded", function() {
                        for (var e in t)(function(e, t) {
                            var n, i = e.getCommand(t.relatedGlobal);
                            for (n in t.jobs) i.on("exec", function(i) {
                                i.data.done || (e.fire("lockSnapshot"), t.execJob(e, n) && (i.data.done = !0), e.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(t.database))
                            }, this, null, n), i.on("refresh", function(i) {
                                i.data.states || (i.data.states = {}), i.data.states[t.name + "@" + n] = t.refreshJob(e, n, i.data.path)
                            }, this, null, n);
                            e.addFeature(t)
                        })(this, t[e])
                    })
                }
            }, CKEDITOR.plugins.indent.genericDefinition.prototype = {
                context: "p",
                exec: function() {}
            }, CKEDITOR.plugins.indent.specificDefinition.prototype = {
                execJob: function(e, n) {
                    var i = this.jobs[n];
                    if (i.state != t) return i.exec.call(this, e)
                },
                refreshJob: function(e, n, i) {
                    return n = this.jobs[n], n.state = e.activeFilter.checkFeature(this) ? n.refresh.call(this, e, i) : t, n.state
                },
                getContext: function(e) {
                    return e.contains(this.context)
                }
            }
        }(), function() {
            function e(e) {
                function i(t) {
                    for (var i = o.startContainer, l = o.endContainer; i && !i.getParent().equals(t);) i = i.getParent();
                    for (; l && !l.getParent().equals(t);) l = l.getParent();
                    if (!i || !l) return !1;
                    for (var c = i, i = [], u = !1; !u;) c.equals(l) && (u = !0), i.push(c), c = c.getNext();
                    if (i.length < 1) return !1;
                    for (c = t.getParents(!0), l = 0; l < c.length; l++)
                        if (c[l].getName && s[c[l].getName()]) {
                            t = c[l];
                            break
                        } for (var c = a.isIndent ? 1 : -1, l = i[0], i = i[i.length - 1], u = CKEDITOR.plugins.list.listToArray(t, r), d = u[i.getCustomData("listarray_index")].indent, l = l.getCustomData("listarray_index"); l <= i.getCustomData("listarray_index"); l++)
                        if (u[l].indent = u[l].indent + c, c > 0) {
                            var h = u[l].parent;
                            u[l].parent = new CKEDITOR.dom.element(h.getName(), h.getDocument())
                        } for (l = i.getCustomData("listarray_index") + 1; l < u.length && u[l].indent > d; l++) u[l].indent = u[l].indent + c;
                    if (i = CKEDITOR.plugins.list.arrayToList(u, r, null, e.config.enterMode, t.getDirection()), !a.isIndent) {
                        var f;
                        if ((f = t.getParent()) && f.is("li"))
                            for (var E, c = i.listNode.getChildren(), m = [], l = c.count() - 1; l >= 0; l--)(E = c.getItem(l)) && E.is && E.is("li") && m.push(E)
                    }
                    if (i && i.listNode.replace(t), m && m.length)
                        for (l = 0; l < m.length; l++) {
                            for (E = t = m[l];
                                (E = E.getNext()) && E.is && E.getName() in s;) CKEDITOR.env.needsNbspFiller && !t.getFirst(n) && t.append(o.document.createText(" ")), t.append(E);
                            t.insertAfter(f)
                        }
                    return i && e.fire("contentDomInvalidated"), !0
                }
                for (var o, a = this, r = this.database, s = this.context, l = e.getSelection(), l = (l && l.getRanges()).createIterator(); o = l.getNextRange();) {
                    for (var c = o.getCommonAncestor(); c && (c.type != CKEDITOR.NODE_ELEMENT || !s[c.getName()]);) {
                        if (e.editable().equals(c)) {
                            c = !1;
                            break
                        }
                        c = c.getParent()
                    }
                    if (c || (c = o.startPath().contains(s)) && o.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), !c) {
                        var u = o.getEnclosedNode();
                        u && u.type == CKEDITOR.NODE_ELEMENT && u.getName() in s && (o.setStartAt(u, CKEDITOR.POSITION_AFTER_START), o.setEndAt(u, CKEDITOR.POSITION_BEFORE_END), c = u)
                    }
                    if (c && o.startContainer.type == CKEDITOR.NODE_ELEMENT && o.startContainer.getName() in s && (u = new CKEDITOR.dom.walker(o), u.evaluator = t, o.startContainer = u.next()), c && o.endContainer.type == CKEDITOR.NODE_ELEMENT && o.endContainer.getName() in s && (u = new CKEDITOR.dom.walker(o), u.evaluator = t, o.endContainer = u.previous()), c) return i(c)
                }
                return 0
            }

            function t(e) {
                return e.type == CKEDITOR.NODE_ELEMENT && e.is("li")
            }

            function n(e) {
                return i(e) && o(e)
            }
            var i = CKEDITOR.dom.walker.whitespaces(!0),
                o = CKEDITOR.dom.walker.bookmark(!1, !0),
                a = CKEDITOR.TRISTATE_DISABLED,
                r = CKEDITOR.TRISTATE_OFF;
            CKEDITOR.plugins.add("indentlist", {
                requires: "indent",
                init: function(t) {
                    function n(t) {
                        i.specificDefinition.apply(this, arguments), this.requiredContent = ["ul", "ol"], t.on("key", function(e) {
                            if ("wysiwyg" == t.mode && e.data.keyCode == this.indentKey) {
                                var n = this.getContext(t.elementPath());
                                !n || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, t.elementPath(), n) || (t.execCommand(this.relatedGlobal), e.cancel())
                            }
                        }, this), this.jobs[this.isIndent ? 10 : 30] = {
                            refresh: this.isIndent ? function(e, t) {
                                var n = this.getContext(t),
                                    i = CKEDITOR.plugins.indentList.firstItemInPath(this.context, t, n);
                                return n && this.isIndent && !i ? r : a
                            } : function(e, t) {
                                return !this.getContext(t) || this.isIndent ? a : r
                            },
                            exec: CKEDITOR.tools.bind(e, this)
                        }
                    }
                    var i = CKEDITOR.plugins.indent;
                    i.registerCommands(t, {
                        indentlist: new n(t, "indentlist", !0),
                        outdentlist: new n(t, "outdentlist")
                    }), CKEDITOR.tools.extend(n.prototype, i.specificDefinition.prototype, {
                        context: {
                            ol: 1,
                            ul: 1
                        }
                    })
                }
            }), CKEDITOR.plugins.indentList = {}, CKEDITOR.plugins.indentList.firstItemInPath = function(e, n, i) {
                var o = n.contains(t);
                return i || (i = n.contains(e)), i && o && o.equals(i.getFirst(t))
            }
        }(), function() {
            function e(e, t) {
                var n, t = void 0 === t || t;
                if (t) n = e.getComputedStyle("text-align");
                else {
                    for (;
                        (!e.hasAttribute || !e.hasAttribute("align") && !e.getStyle("text-align")) && (n = e.getParent(), n);) e = n;
                    n = e.getStyle("text-align") || e.getAttribute("align") || ""
                }
                return n && (n = n.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, "")), !n && t && (n = "rtl" == e.getComputedStyle("direction") ? "right" : "left"), n
            }

            function t(e, t, n) {
                this.editor = e, this.name = t, this.value = n, this.context = "p";
                var t = e.config.justifyClasses,
                    i = e.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div";
                if (t) {
                    switch (n) {
                        case "left":
                            this.cssClassName = t[0];
                            break;
                        case "center":
                            this.cssClassName = t[1];
                            break;
                        case "right":
                            this.cssClassName = t[2];
                            break;
                        case "justify":
                            this.cssClassName = t[3]
                    }
                    this.cssClassRegex = RegExp("(?:^|\\s+)(?:" + t.join("|") + ")(?=$|\\s)"), this.requiredContent = i + "(" + this.cssClassName + ")"
                } else this.requiredContent = i + "{text-align}";
                this.allowedContent = {
                    "caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
                        propertiesOnly: !0,
                        styles: this.cssClassName ? null : "text-align",
                        classes: this.cssClassName || null
                    }
                }, e.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
            }

            function n(e) {
                var t = e.editor,
                    n = t.createRange();
                n.setStartBefore(e.data.node), n.setEndAfter(e.data.node);
                for (var i, o = new CKEDITOR.dom.walker(n); i = o.next();)
                    if (i.type == CKEDITOR.NODE_ELEMENT)
                        if (!i.equals(e.data.node) && i.getDirection()) n.setStartAfter(i), o = new CKEDITOR.dom.walker(n);
                        else {
                            var a = t.config.justifyClasses;
                            a && (i.hasClass(a[0]) ? (i.removeClass(a[0]), i.addClass(a[2])) : i.hasClass(a[2]) && (i.removeClass(a[2]), i.addClass(a[0]))), a = i.getStyle("text-align"), "left" == a ? i.setStyle("text-align", "right") : "right" == a && i.setStyle("text-align", "left")
                        }
            }

            function i() {
                var e = this,
                    t = "",
                    n = CKEDITOR.tools.addFunction(function(t) {
                        if (a === t) e.focus(), e.forceNextSelectionCheck();
                        else switch (t) {
                            case "left":
                                e.execCommand("justifyleft");
                                break;
                            case "center":
                                e.execCommand("justifycenter");
                                break;
                            case "right":
                                e.execCommand("justifyright");
                                break;
                            case "justify":
                                e.execCommand("justifyblock")
                        }
                    }),
                    i = CKEDITOR.skin.getIconStyle("justifyleft", !1),
                    o = CKEDITOR.skin.getIconStyle("justifyright", !1),
                    r = CKEDITOR.skin.getIconStyle("justifycenter", !1),
                    s = CKEDITOR.skin.getIconStyle("justifyblock", !1),
                    t = t + ('<a class="cke_button ck_btn_with_gray_border_top" onclick="CKEDITOR.tools.callFunction(' + n + ', \'left\')" data-align="left" style="float: left;outline: none;" title="' + e.lang.justify.left + '"><span class="cke_button_icon cke_button__justifyleft_icon" style="' + i + '"></span></a>'),
                    t = t + ('<a class="cke_button ck_btn_with_gray_border_top" onclick="CKEDITOR.tools.callFunction(' + n + ', \'center\')" data-align="center" style="float: left;outline: none;" title="' + e.lang.justify.center + '"><span class="cke_button_icon cke_button__justifycenter_icon" style="' + r + '"></span></a>'),
                    t = t + ('<a class="cke_button ck_btn_with_gray_border_top" onclick="CKEDITOR.tools.callFunction(' + n + ', \'right\')" data-align="right" style="float: left;outline: none;" title="' + e.lang.justify.right + '"><span class="cke_button_icon cke_button__justifyright_icon" style="' + o + '"></span></a>');
                return t += '<a class="cke_button ck_btn_with_gray_border_top" onclick="CKEDITOR.tools.callFunction(' + n + ', \'justify\')" data-align="justify" style="float: left;outline: none;" title="' + e.lang.justify.block + '"><span class="cke_button_icon cke_button__justifyblock_icon" style="' + s + '"></span></a>'
            }

            function o(e, t) {
                var n;
                n = this.getSelection().getStartElement().getComputedStyle("text-align"), n = "justify" === n ? "block" : n;
                var i = this.ui.get(e),
                    i = CKEDITOR.document.getById(i._.id).find(".cke_button_icon").getItem(0),
                    o = "justify" + n,
                    r = CKEDITOR.skin.getIconStyle("justify" + n, !1);
                if (i.setAttributes({
                        style: r,
                        class: "cke_button_icon cke_button__" + o + "_icon"
                    }), a = "block" === n ? "justify" : n, t.el) {
                    for (i = t.el.find("a.cke_button"), o = 0, r = i.count(); o < r; o++) i.getItem(o).removeClass("cke_button_on").addClass("cke_button_off");
                    t.el.findOne("a[data-align=" + ("block" === n ? "justify" : n) + "]").addClass("cke_button_on")
                }
            }
            var a;
            t.prototype = {
                exec: function(t) {
                    var n = t.getSelection(),
                        i = t.config.enterMode;
                    if (n) {
                        for (var o, a, r = n.createBookmarks(), s = n.getRanges(), l = this.cssClassName, c = t.config.useComputedState, c = void 0 === c || c, u = s.length - 1; u >= 0; u--)
                            for (o = s[u].createIterator(), o.enlargeBr = i != CKEDITOR.ENTER_BR; a = o.getNextParagraph(i == CKEDITOR.ENTER_P ? "p" : "div");)
                                if (!a.isReadOnly()) {
                                    a.removeAttribute("align"), a.removeStyle("text-align");
                                    var d = l && (a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(this.cssClassRegex, ""))),
                                        h = this.state == CKEDITOR.TRISTATE_OFF && (!c || e(a, !0) != this.value);
                                    l ? h ? a.addClass(l) : d || a.removeAttribute("class") : h && a.setStyle("text-align", this.value)
                                } t.focus(), t.forceNextSelectionCheck(), n.selectBookmarks(r)
                    }
                },
                refresh: function(t, n) {
                    var i = n.block || n.blockLimit;
                    this.setState("body" != i.getName() && e(i, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                }
            }, a = "", CKEDITOR.plugins.add("justify", {
                init: function(e) {
                    if (!e.blockless) {
                        var a = {},
                            r = new t(e, "justifyleft", "left"),
                            s = new t(e, "justifycenter", "center"),
                            l = new t(e, "justifyright", "right"),
                            c = new t(e, "justifyblock", "justify");
                        e.addCommand("justifyleft", r), e.addCommand("justifycenter", s), e.addCommand("justifyright", l), e.addCommand("justifyblock", c), e.config.alignmentDropdown && e.on("selectionChange", o.bind(e, "JustifyGroup", a)), e.ui.addButton && (e.config.alignmentDropdown && e.ui.add("JustifyGroup", CKEDITOR.UI_PANELBUTTON, {
                            label: e.lang.justify.label,
                            modes: {
                                wysiwyg: 1
                            },
                            toolbar: "justify,50",
                            editorFocus: 0,
                            panel: {
                                css: CKEDITOR.skin.getPath("editor"),
                                attributes: {
                                    role: "justifybox",
                                    "aria-label": ""
                                }
                            },
                            onBlock: function(t, n) {
                                a.el = n.element, n.autoSize = !0, n.element.addClass("cke_justifygroupblock"), n.element.setStyles({
                                    width: "112px",
                                    overflow: "hidden",
                                    "white-space": "nowrap",
                                    outline: "none"
                                }), n.element.setHtml(i.call(e)), n.element.getDocument().getBody().setStyle("overflow", "hidden"), CKEDITOR.ui.fire("ready", this), o.call(e, "JustifyGroup", a)
                            }
                        }), e.ui.addButton("JustifyLeft", {
                            label: e.lang.justify.left,
                            command: "justifyleft",
                            toolbar: "align,10"
                        }), e.ui.addButton("JustifyCenter", {
                            label: e.lang.justify.center,
                            command: "justifycenter",
                            toolbar: "align,20"
                        }), e.ui.addButton("JustifyRight", {
                            label: e.lang.justify.right,
                            command: "justifyright",
                            toolbar: "align,30"
                        }), e.ui.addButton("JustifyBlock", {
                            label: e.lang.justify.block,
                            command: "justifyblock",
                            toolbar: "align,40"
                        })), e.on("dirChanged", n)
                    }
                }
            })
        }(), function() {
            function e(e, t) {
                var n = i.exec(e),
                    o = i.exec(t);
                if (n) {
                    if (!n[2] && "px" == o[2]) return o[1];
                    if ("px" == n[2] && !o[2]) return o[1] + "px"
                }
                return t
            }
            var t = CKEDITOR.htmlParser.cssStyle,
                n = CKEDITOR.tools.cssLength,
                i = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
                o = {
                    elements: {
                        $: function(n) {
                            var i = n.attributes;
                            if ((i = (i = (i = i && i["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(i))) && i.children[0]) && n.attributes["data-cke-resizable"]) {
                                var o = new t(n).rules,
                                    n = i.attributes,
                                    a = o.width,
                                    o = o.height;
                                a && (n.width = e(n.width, a)), o && (n.height = e(n.height, o))
                            }
                            return i
                        }
                    }
                };
            CKEDITOR.plugins.add("fakeobjects", {
                init: function(e) {
                    e.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects")
                },
                afterInit: function(e) {
                    (e = (e = e.dataProcessor) && e.htmlFilter) && e.addRules(o, {
                        applyToAll: !0
                    })
                }
            }), CKEDITOR.editor.prototype.createFakeElement = function(e, i, o, a) {
                var r = this.lang.fakeobjects,
                    r = r[o] || r.unknown,
                    i = {
                        class: i,
                        "data-cke-realelement": encodeURIComponent(e.getOuterHtml()),
                        "data-cke-real-node-type": e.type,
                        alt: r,
                        title: r,
                        align: e.getAttribute("align") || ""
                    };
                return CKEDITOR.env.hc || (i.src = CKEDITOR.tools.transparentImageData), o && (i["data-cke-real-element-type"] = o), a && (i["data-cke-resizable"] = a, o = new t, a = e.getAttribute("width"), e = e.getAttribute("height"), a && (o.rules.width = n(a)), e && (o.rules.height = n(e)), o.populate(i)), this.document.createElement("img", {
                    attributes: i
                })
            }, CKEDITOR.editor.prototype.createFakeParserElement = function(e, i, o, a) {
                var r, s = this.lang.fakeobjects,
                    s = s[o] || s.unknown;
                return r = new CKEDITOR.htmlParser.basicWriter, e.writeHtml(r), r = r.getHtml(), i = {
                    class: i,
                    "data-cke-realelement": encodeURIComponent(r),
                    "data-cke-real-node-type": e.type,
                    alt: s,
                    title: s,
                    align: e.attributes.align || ""
                }, CKEDITOR.env.hc || (i.src = CKEDITOR.tools.transparentImageData), o && (i["data-cke-real-element-type"] = o), a && (i["data-cke-resizable"] = a, a = e.attributes, e = new t, o = a.width, a = a.height, void 0 !== o && (e.rules.width = n(o)), void 0 !== a && (e.rules.height = n(a)), e.populate(i)), new CKEDITOR.htmlParser.element("img", i)
            }, CKEDITOR.editor.prototype.restoreRealElement = function(t) {
                if (t.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
                var n = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(t.data("cke-realelement")), this.document);
                if (t.data("cke-resizable")) {
                    var i = t.getStyle("width"),
                        t = t.getStyle("height");
                    i && n.setAttribute("width", e(n.getAttribute("width"), i)),
                        t && n.setAttribute("height", e(n.getAttribute("height"), t))
                }
                return n
            }
        }(), function() {
            function e(e) {
                return e.replace(/'/g, "\\$&")
            }

            function t(e) {
                var t, e = e.config.emailProtection || "";
                return e && "encode" != e && (t = {}, e.replace(/^([^(]+)\(([^)]+)\)$/, function(e, n, i) {
                    t.name = n, t.params = [], i.replace(/[^,\s]+/g, function(e) {
                        t.params.push(e)
                    })
                })), t
            }
            CKEDITOR.plugins.add("link", {
                requires: "dialog,fakeobjects",
                onLoad: function() {
                    function e(e) {
                        return n.replace(/%1/g, "rtl" == e ? "right" : "left").replace(/%2/g, "cke_contents_" + e)
                    }
                    var t = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
                        n = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + t + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + t + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
                    CKEDITOR.addCss(e("ltr") + e("rtl"))
                },
                init: function(e) {
                    var n = "a[!href]";
                    CKEDITOR.dialog.isTabEnabled(e, "link", "advanced") && (n = n.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)")), CKEDITOR.dialog.isTabEnabled(e, "link", "target") && (n = n.replace("]", ",target,onclick]")), e.addCommand("link", new CKEDITOR.dialogCommand("link", {
                        allowedContent: n,
                        requiredContent: "a[href]",
                        contextSensitive: !0,
                        refresh: function(e, t) {
                            return this.setState(t.contains("a") ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), !0
                        }
                    })), e.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
                        allowedContent: "a[!name,id]",
                        requiredContent: "a[name]"
                    })), e.addCommand("unlink", new CKEDITOR.unlinkCommand), e.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand), e.setKeystroke(CKEDITOR.CTRL + 76, "link"), e.ui.addButton && (e.ui.addButton("Link", {
                        label: e.lang.link.toolbar,
                        command: "link",
                        toolbar: "links,10"
                    }), e.ui.addButton("Unlink", {
                        label: e.lang.link.unlink,
                        command: "unlink",
                        toolbar: "links,20"
                    }), e.ui.addButton("Anchor", {
                        label: e.lang.link.anchor.toolbar,
                        command: "anchor",
                        toolbar: "links,30"
                    })), CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"), CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"), e.on("doubleclick", function(t) {
                        var n = CKEDITOR.plugins.link.getSelectedLink(e) || t.data.element;
                        n.isReadOnly() || (n.is("a") ? (t.data.dialog = !n.getAttribute("name") || n.getAttribute("href") && n.getChildCount() ? "link" : "anchor", t.data.link = n) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(e, n) && (t.data.dialog = "anchor"))
                    }, null, null, 0), e.on("doubleclick", function(t) {
                        t.data.dialog in {
                            link: 1,
                            anchor: 1
                        } && t.data.link && e.getSelection().selectElement(t.data.link)
                    }, null, null, 20), e.addMenuItems && e.addMenuItems({
                        anchor: {
                            label: e.lang.link.anchor.menu,
                            command: "anchor",
                            group: "anchor",
                            order: 1
                        },
                        removeAnchor: {
                            label: e.lang.link.anchor.remove,
                            command: "removeAnchor",
                            group: "anchor",
                            order: 5
                        },
                        link: {
                            label: e.lang.link.menu,
                            command: "link",
                            group: "link",
                            order: 1
                        },
                        unlink: {
                            label: e.lang.link.unlink,
                            command: "unlink",
                            group: "link",
                            order: 5
                        }
                    }), e.contextMenu && e.contextMenu.addListener(function(t) {
                        if (!t || t.isReadOnly()) return null;
                        if (t = CKEDITOR.plugins.link.tryRestoreFakeAnchor(e, t), !t && !(t = CKEDITOR.plugins.link.getSelectedLink(e))) return null;
                        var n = {};
                        return t.getAttribute("href") && t.getChildCount() && (n = {
                            link: CKEDITOR.TRISTATE_OFF,
                            unlink: CKEDITOR.TRISTATE_OFF
                        }), t && t.hasAttribute("name") && (n.anchor = n.removeAnchor = CKEDITOR.TRISTATE_OFF), n
                    }), this.compiledProtectionFunction = t(e)
                },
                afterInit: function(e) {
                    e.dataProcessor.dataFilter.addRules({
                        elements: {
                            a: function(t) {
                                return t.attributes.name ? t.children.length ? null : e.createFakeParserElement(t, "cke_anchor", "anchor") : null
                            }
                        }
                    });
                    var t = e._.elementsPath && e._.elementsPath.filters;
                    t && t.push(function(t, n) {
                        if ("a" == n && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(e, t) || t.getAttribute("name") && (!t.getAttribute("href") || !t.getChildCount()))) return "anchor"
                    })
                }
            });
            var n = /^javascript:/,
                i = /^mailto:([^?]+)(?:\?(.+))?$/,
                o = /subject=([^;?:@&=$,\/]*)/,
                a = /body=([^;?:@&=$,\/]*)/,
                r = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
                s = /^javascript:([^(]+)\(([^)]+)\)$/;
            CKEDITOR.plugins.link = {
                getSelectedLink: function(e) {
                    var t = e.getSelection(),
                        n = t.getSelectedElement();
                    return n && n.is("a") ? n : (t = t.getRanges()[0]) ? (t.shrink(CKEDITOR.SHRINK_TEXT), e.elementPath(t.getCommonAncestor()).contains("a", 1)) : null
                },
                getEditorAnchors: function(e) {
                    for (var t, n = e.editable(), i = n.isInline() && !e.plugins.divarea ? e.document : n, n = i.getElementsByTag("a"), i = i.getElementsByTag("img"), o = [], a = 0; t = n.getItem(a++);)(t.data("cke-saved-name") || t.hasAttribute("name")) && o.push({
                        name: t.data("cke-saved-name") || t.getAttribute("name"),
                        id: t.getAttribute("id")
                    });
                    for (a = 0; t = i.getItem(a++);)(t = this.tryRestoreFakeAnchor(e, t)) && o.push({
                        name: t.getAttribute("name"),
                        id: t.getAttribute("id")
                    });
                    return o
                },
                fakeAnchor: !0,
                tryRestoreFakeAnchor: function(e, t) {
                    if (t && t.data("cke-real-element-type") && "anchor" == t.data("cke-real-element-type")) {
                        var n = e.restoreRealElement(t);
                        if (n.data("cke-saved-name")) return n
                    }
                },
                parseLinkAttributes: function(e, t) {
                    var l = t && (t.data("cke-saved-href") || t.getAttribute("href")) || "",
                        c = e.plugins.link.compiledProtectionFunction,
                        u = e.config.emailProtection,
                        d = {};
                    l.match(n) && ("encode" == u ? l = l.replace(r, function(e, t, n) {
                        return "mailto:" + String.fromCharCode.apply(String, t.split(",")) + (n && n.replace(/\\'/g, "'"))
                    }) : u && l.replace(s, function(e, t, n) {
                        if (t == c.name) {
                            d.type = "email";
                            for (var i, o, e = d.email = {}, t = /(^')|('$)/g, n = n.match(/[^,\s]+/g), a = n.length, r = 0; r < a; r++) i = decodeURIComponent, o = n[r].replace(t, "").replace(/\\'/g, "'"), o = i(o), i = c.params[r].toLowerCase(), e[i] = o;
                            e.address = [e.name, e.domain].join("@")
                        }
                    }));
                    var h = !1;
                    if (t && (h = "_blank" === t.getAttribute("target")), !d.type)
                        if (u = l.match(i)) {
                            h = l.match(o), l = l.match(a), d.type = "email";
                            var f = d.email = {};
                            f.address = u[1], h && (f.subject = decodeURIComponent(h[1])), l && (f.body = decodeURIComponent(l[1]))
                        } else l && (/^https?:\/\/[^.]+\.strikinglycdn\.com/.test(l) ? (d.type = "document", d.document = {}, d.document.url = l, d.document.openInNewTab = h) : (d.type = "url", d.web = {}, d.web.url = l, d.web.openInNewTab = h));
                    return d
                },
                getLinkAttributes: function(t, n) {
                    var i = t.config.emailProtection || "",
                        o = {};
                    switch (n.type) {
                        case "url":
                            var a = n.web && CKEDITOR.tools.trim(n.web.url) || "",
                                r = /^\//;
                            !/^#|^(http|https|ftp|mailto|tel|fb|skype|itms-services|javascript|sms|irc):/i.test(a) && !r.test(a) && (a = "https://" + a), o["data-cke-saved-href"] = a;
                            break;
                        case "anchor":
                            a = n.anchor && n.anchor.id, o["data-cke-saved-href"] = "#" + (n.anchor && n.anchor.name || a || "");
                            break;
                        case "document":
                            a = n.document && CKEDITOR.tools.trim(n.document.url) || "", o["data-cke-saved-href"] = a;
                            break;
                        case "email":
                            switch (a = n.email, r = a.address, i) {
                                case "":
                                case "encode":
                                    var s = encodeURIComponent(a.subject || ""),
                                        l = encodeURIComponent(a.body || ""),
                                        a = [];
                                    if (s && a.push("subject=" + s), l && a.push("body=" + l), a = a.length ? "?" + a.join("&") : "", "encode" == i) {
                                        for (var s = r.length, l = [], c = 0; c < s; c++) i = r.charCodeAt(c), l.push(i);
                                        r = ["javascript:void(location.href='mailto:'+", "String.fromCharCode(" + l.join(",") + ")"], a && r.push("+'", e(a), "'"), r.push(")")
                                    } else r = ["mailto:", r, a];
                                    break;
                                default:
                                    for (r = r.split("@", 2), a.name = r[0], a.domain = r[1], i = t.plugins.link, r = i.compiledProtectionFunction.params, l = [i.compiledProtectionFunction.name, "("], c = 0; c < r.length; c++) i = r[c].toLowerCase(), s = a[i], c > 0 && l.push(","), l.push("'", s ? e(encodeURIComponent(a[i])) : "", "'");
                                    l.push(")"), r = ["javascript:", l.join("")]
                            }
                            o["data-cke-saved-href"] = r.join("")
                    }(n.web.openInNewTab || n.document.openInNewTab) && (o.target = "_blank"), o["data-cke-saved-href"] && (o.href = o["data-cke-saved-href"]);
                    var u, a = {
                        target: 1,
                        onclick: 1,
                        "data-cke-pa-onclick": 1,
                        "data-cke-saved-name": 1
                    };
                    for (u in o) delete a[u];
                    return {
                        set: o,
                        removed: CKEDITOR.tools.objectKeys(a)
                    }
                }
            }, CKEDITOR.unlinkCommand = function() {}, CKEDITOR.unlinkCommand.prototype = {
                exec: function(e) {
                    var t = new CKEDITOR.style({
                        element: "a",
                        type: CKEDITOR.STYLE_INLINE,
                        alwaysRemoveElement: 1
                    });
                    e.removeStyle(t)
                },
                refresh: function(e, t) {
                    var n = t.lastElement && t.lastElement.getAscendant("a", !0);
                    n && "a" == n.getName() && n.getAttribute("href") && n.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
                },
                contextSensitive: 1,
                startDisabled: 1,
                requiredContent: "a[href]"
            }, CKEDITOR.removeAnchorCommand = function() {}, CKEDITOR.removeAnchorCommand.prototype = {
                exec: function(e) {
                    var t, n = e.getSelection(),
                        i = n.createBookmarks();
                    n && (t = n.getSelectedElement()) && (t.getChildCount() ? t.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(e, t)) ? t.remove(1) : (t = CKEDITOR.plugins.link.getSelectedLink(e)) && (t.hasAttribute("href") ? (t.removeAttributes({
                        name: 1,
                        "data-cke-saved-name": 1
                    }), t.removeClass("cke_anchor")) : t.remove(1)), n.selectBookmarks(i)
                },
                requiredContent: "a[name]"
            }, CKEDITOR.tools.extend(CKEDITOR.config, {
                linkShowAdvancedTab: !0,
                linkShowTargetTab: !0
            })
        }(), function() {
            function e(e, t, n) {
                function i(n) {
                    !(l = u[n ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() || !(c = t.root[n ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || c.is && c.isBlockBoundary({
                        br: 1
                    }) || e.document.createElement("br")[n ? "insertBefore" : "insertAfter"](l)
                }
                for (var o = CKEDITOR.plugins.list.listToArray(t.root, n), a = [], r = 0; r < t.contents.length; r++) {
                    var s = t.contents[r];
                    (s = s.getAscendant("li", !0)) && !s.getCustomData("list_item_processed") && (a.push(s), CKEDITOR.dom.element.setMarker(n, s, "list_item_processed", !0))
                }
                for (s = null, r = 0; r < a.length; r++) s = a[r].getCustomData("listarray_index"), o[s].indent = -1;
                for (r = s + 1; r < o.length; r++)
                    if (o[r].indent > o[r - 1].indent + 1) {
                        for (a = o[r - 1].indent + 1 - o[r].indent, s = o[r].indent; o[r] && o[r].indent >= s;) o[r].indent = o[r].indent + a, r++;
                        r--
                    } var l, c, u = CKEDITOR.plugins.list.arrayToList(o, n, null, e.config.enterMode, t.root.getAttribute("dir")).listNode;
                i(!0), i(), u.replace(t.root), e.fire("contentDomInvalidated")
            }

            function t(e, t) {
                this.name = e, this.context = this.type = t, this.allowedContent = t + " li", this.requiredContent = t
            }

            function n(e, t, n, i) {
                for (var o, a; o = e[i ? "getLast" : "getFirst"](g);)(a = o.getDirection(1)) !== t.getDirection(1) && o.setAttribute("dir", a), o.remove(), n ? o[i ? "insertBefore" : "insertAfter"](n) : t.append(o, i)
            }

            function i(e) {
                function t(t) {
                    var i = e[t ? "getPrevious" : "getNext"](f);
                    i && i.type == CKEDITOR.NODE_ELEMENT && i.is(e.getName()) && (n(e, i, null, !t), e.remove(), e = i)
                }
                t(), t(1)
            }

            function o(e) {
                return e.type == CKEDITOR.NODE_ELEMENT && (e.getName() in CKEDITOR.dtd.$block || e.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[e.getName()]["#"]
            }

            function a(e, t, o) {
                e.fire("saveSnapshot"), o.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
                var a = o.extractContents();
                t.trim(!1, !0);
                var s = t.createBookmark(),
                    l = new CKEDITOR.dom.elementPath(t.startContainer),
                    c = l.block,
                    l = l.lastElement.getAscendant("li", 1) || c,
                    u = new CKEDITOR.dom.elementPath(o.startContainer),
                    d = u.contains(CKEDITOR.dtd.$listItem),
                    u = u.contains(CKEDITOR.dtd.$list);
                for (c ? (c = c.getBogus()) && c.remove() : u && (c = u.getPrevious(f)) && E(c) && c.remove(), (c = a.getLast()) && c.type == CKEDITOR.NODE_ELEMENT && c.is("br") && c.remove(), (c = t.startContainer.getChild(t.startOffset)) ? a.insertBefore(c) : t.startContainer.append(a), d && (a = r(d)) && (l.contains(d) ? (n(a, d.getParent(), d), a.remove()) : l.append(a)); o.checkStartOfBlock() && o.checkEndOfBlock() && (u = o.startPath(), a = u.block, a);) a.is("li") && (l = a.getParent(), a.equals(l.getLast(f)) && a.equals(l.getFirst(f)) && (a = l)), o.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START), a.remove();
                o = o.clone(), a = e.editable(), o.setEndAt(a, CKEDITOR.POSITION_BEFORE_END), o = new CKEDITOR.dom.walker(o), o.evaluator = function(e) {
                    return f(e) && !E(e)
                }, (o = o.next()) && o.type == CKEDITOR.NODE_ELEMENT && o.getName() in CKEDITOR.dtd.$list && i(o), t.moveToBookmark(s), t.select(), e.fire("saveSnapshot")
            }

            function r(e) {
                return (e = e.getLast(f)) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in u ? e : null
            }

            function s() {
                var e = this,
                    t = CKEDITOR.skin.getIconStyle("bulletedlist", !1),
                    n = CKEDITOR.skin.getIconStyle("numberedlist", !1),
                    i = CKEDITOR.tools.addFunction(function(t) {
                        switch (t) {
                            case "ul":
                                e.execCommand("bulletedlist");
                                break;
                            case "ol":
                                e.execCommand("numberedlist")
                        }
                    });
                return reHtml = '<a class="cke_button ck_btn_with_gray_border_top" onclick="CKEDITOR.tools.callFunction(' + i + ', \'ul\')" hidefocus=true data-l="ul" style="float: left;outline: none;" title="' + e.lang.list.bulletedlist + '"><span class="cke_button_icon cke_button__bulletedlist_icon" style="' + t + '"></span></a>', reHtml += '<a class="cke_button ck_btn_with_gray_border_top" onclick="CKEDITOR.tools.callFunction(' + i + ', \'ol\')" hidefocus=true data-l="ol" style="float: left;outline: none;" title="' + e.lang.list.numberedlist + '"><span class="cke_button_icon cke_button__numberedlist_icon" style="' + n + '"></span></a>'
            }

            function l(e) {
                var t = e.getName();
                return /^(div|p|ol|ul)$/gi.test(t) ? t : l(e.getParent())
            }

            function c(e, t) {
                var n, i, o = this.getSelection().getStartElement(),
                    o = l(o),
                    a = this.ui.get(e),
                    a = CKEDITOR.document.getById(a._.id),
                    r = a.find(".cke_button_icon").getItem(0),
                    c = !0;
                switch (o) {
                    case "ul":
                        i = "bulletedlist", n = CKEDITOR.skin.getIconStyle("bulletedlist", !1);
                        break;
                    case "ol":
                        i = "numberedlist", n = CKEDITOR.skin.getIconStyle("numberedlist", !1);
                        break;
                    default:
                        i = "bulletedlist", n = CKEDITOR.skin.getIconStyle("bulletedlist", !1), c = !1
                }
                if (r.setAttributes({
                        style: n,
                        class: "cke_button_icon cke_button__" + i + "_icon"
                    }), c ? a.removeClass("cke_button_off").addClass("cke_button_on") : a.removeClass("cke_button_on").addClass("cke_button_off"), t.el) {
                    for (t.el.setStyle("width", "56px"), t.el.setHtml(s.call(this)), a = t.el.find("a.cke_button"), r = 0, n = a.count(); r < n; r++) a.getItem(r).removeClass("cke_button_on").addClass("cke_button_off");
                    ("ul" === o || "ol" === o) && t.el.findOne("a[data-l=" + o + "]").addClass("cke_button_on")
                }
            }
            var u = {
                    ol: 1,
                    ul: 1
                },
                d = CKEDITOR.dom.walker.whitespaces(),
                h = CKEDITOR.dom.walker.bookmark(),
                f = function(e) {
                    return !(d(e) || h(e))
                },
                E = CKEDITOR.dom.walker.bogus();
            CKEDITOR.plugins.list = {
                listToArray: function(e, t, n, i, o) {
                    if (!u[e.getName()]) return [];
                    i || (i = 0), n || (n = []);
                    for (var a = 0, r = e.getChildCount(); a < r; a++) {
                        var s = e.getChild(a);
                        if (s.type == CKEDITOR.NODE_ELEMENT && s.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(s, t, n, i + 1), "li" == s.$.nodeName.toLowerCase()) {
                            var l = {
                                parent: e,
                                indent: i,
                                element: s,
                                contents: []
                            };
                            o ? l.grandparent = o : (l.grandparent = e.getParent(), l.grandparent && "li" == l.grandparent.$.nodeName.toLowerCase() && (l.grandparent = l.grandparent.getParent())), t && CKEDITOR.dom.element.setMarker(t, s, "listarray_index", n.length), n.push(l);
                            for (var c, d = 0, h = s.getChildCount(); d < h; d++) c = s.getChild(d), c.type == CKEDITOR.NODE_ELEMENT && u[c.getName()] ? CKEDITOR.plugins.list.listToArray(c, t, n, i + 1, l.grandparent) : l.contents.push(c)
                        }
                    }
                    return n
                },
                arrayToList: function(e, t, n, i, o) {
                    if (n || (n = 0), !e || e.length < n + 1) return null;
                    for (var a, r, s, l = e[n].parent.getDocument(), c = new CKEDITOR.dom.documentFragment(l), d = null, E = n, m = Math.max(e[n].indent, 0), g = null, p = i == CKEDITOR.ENTER_P ? "p" : "div";;) {
                        var T = e[E];
                        if (a = T.grandparent, r = T.element.getDirection(1), T.indent == m) {
                            for (d && e[E].parent.getName() == d.getName() || (d = e[E].parent.clone(!1, 1), o && d.setAttribute("dir", o), c.append(d)), g = d.append(T.element.clone(0, 1)), r != d.getDirection(1) && g.setAttribute("dir", r), a = 0; a < T.contents.length; a++) g.append(T.contents[a].clone(1, 1));
                            E++
                        } else if (T.indent == Math.max(m, 0) + 1) T = e[E - 1].element.getDirection(1), E = CKEDITOR.plugins.list.arrayToList(e, null, E, i, T != r ? r : null), !g.getChildCount() && CKEDITOR.env.needsNbspFiller && l.$.documentMode <= 7 && g.append(l.createText(" ")), g.append(E.listNode), E = E.nextIndex;
                        else {
                            if (T.indent != -1 || n || !a) return null;
                            u[a.getName()] ? (g = T.element.clone(!1, !0), r != a.getDirection(1) && g.setAttribute("dir", r)) : g = new CKEDITOR.dom.documentFragment(l);
                            var C, I, d = a.getDirection(1) != r,
                                O = T.element,
                                D = O.getAttribute("class"),
                                R = O.getAttribute("style"),
                                v = g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (i != CKEDITOR.ENTER_BR || d || R || D),
                                b = T.contents.length;
                            for (a = 0; a < b; a++)
                                if (C = T.contents[a], h(C) && b > 1) v ? I = C.clone(1, 1) : g.append(C.clone(1, 1));
                                else if (C.type == CKEDITOR.NODE_ELEMENT && C.isBlockBoundary()) {
                                d && !C.getDirection() && C.setAttribute("dir", r), s = C;
                                var K = O.getAttribute("style");
                                K && s.setAttribute("style", K.replace(/([^;])$/, "$1;") + (s.getAttribute("style") || "")), D && C.addClass(D), s = null, I && (g.append(I), I = null), g.append(C.clone(1, 1))
                            } else v ? (s || (s = l.createElement(p), g.append(s), d && s.setAttribute("dir", r)), R && s.setAttribute("style", R), D && s.setAttribute("class", D), I && (s.append(I), I = null), s.append(C.clone(1, 1))) : g.append(C.clone(1, 1));
                            I && ((s || g).append(I), I = null), g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && E != e.length - 1 && (CKEDITOR.env.needsBrFiller && (r = g.getLast()) && r.type == CKEDITOR.NODE_ELEMENT && r.is("br") && r.remove(), r = g.getLast(f), (!r || !(r.type == CKEDITOR.NODE_ELEMENT && r.is(CKEDITOR.dtd.$block))) && g.append(l.createElement("br"))), r = g.$.nodeName.toLowerCase(), ("div" == r || "p" == r) && g.appendBogus(), c.append(g), d = null, E++
                        }
                        if (s = null, e.length <= E || Math.max(e[E].indent, 0) < m) break
                    }
                    if (t)
                        for (e = c.getFirst(); e;) {
                            if (e.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(t, e), e.getName() in CKEDITOR.dtd.$listItem && (n = e, l = o = i = void 0, i = n.getDirection()))) {
                                for (o = n.getParent(); o && !(l = o.getDirection());) o = o.getParent();
                                i == l && n.removeAttribute("dir")
                            }
                            e = e.getNextSourceNode()
                        }
                    return {
                        listNode: c,
                        nextIndex: E
                    }
                }
            };
            var m = /^h[1-6]$/,
                g = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
            t.prototype = {
                exec: function(t) {
                    this.refresh(t, t.elementPath());
                    var n = t.config,
                        o = t.getSelection(),
                        a = o && o.getRanges();
                    if (this.state == CKEDITOR.TRISTATE_OFF) {
                        var r = t.editable();
                        if (r.getFirst(f)) {
                            var s = 1 == a.length && a[0];
                            (n = s && s.getEnclosedNode()) && n.is && this.type == n.getName() && this.setState(CKEDITOR.TRISTATE_ON)
                        } else n.enterMode == CKEDITOR.ENTER_BR ? r.appendBogus() : a[0].fixBlock(1, n.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), o.selectRanges(a)
                    }
                    for (var n = o.createBookmarks(!0), r = [], l = {}, a = a.createIterator(), c = 0;
                        (s = a.getNextRange()) && ++c;) {
                        var d = s.getBoundaryNodes(),
                            h = d.startNode,
                            E = d.endNode;
                        for (h.type == CKEDITOR.NODE_ELEMENT && "td" == h.getName() && s.setStartAt(d.startNode, CKEDITOR.POSITION_AFTER_START), E.type == CKEDITOR.NODE_ELEMENT && "td" == E.getName() && s.setEndAt(d.endNode, CKEDITOR.POSITION_BEFORE_END), s = s.createIterator(), s.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; d = s.getNextParagraph();)
                            if (!d.getCustomData("list_block")) {
                                CKEDITOR.dom.element.setMarker(l, d, "list_block", 1);
                                for (var g, p = t.elementPath(d), h = p.elements, E = 0, p = p.blockLimit, T = h.length - 1; T >= 0 && (g = h[T]); T--)
                                    if (u[g.getName()] && p.contains(g)) {
                                        p.removeCustomData("list_group_object_" + c), (h = g.getCustomData("list_group_object")) ? h.contents.push(d) : (h = {
                                            root: g,
                                            contents: [d]
                                        }, r.push(h), CKEDITOR.dom.element.setMarker(l, g, "list_group_object", h)), E = 1;
                                        break
                                    } E || (E = p, E.getCustomData("list_group_object_" + c) ? E.getCustomData("list_group_object_" + c).contents.push(d) : (h = {
                                    root: E,
                                    contents: [d]
                                }, CKEDITOR.dom.element.setMarker(l, E, "list_group_object_" + c, h), r.push(h)))
                            }
                    }
                    for (g = []; r.length > 0;)
                        if (h = r.shift(), this.state == CKEDITOR.TRISTATE_OFF)
                            if (u[h.root.getName()]) {
                                for (a = t, c = h, h = l, s = g, E = CKEDITOR.plugins.list.listToArray(c.root, h), p = [], d = 0; d < c.contents.length; d++) T = c.contents[d], (T = T.getAscendant("li", !0)) && !T.getCustomData("list_item_processed") && (p.push(T), CKEDITOR.dom.element.setMarker(h, T, "list_item_processed", !0));
                                for (var T = c.root.getDocument(), C = void 0, I = void 0, d = 0; d < p.length; d++) {
                                    var O = p[d].getCustomData("listarray_index"),
                                        C = E[O].parent;
                                    C.is(this.type) || (I = T.createElement(this.type), C.copyAttributes(I, {
                                        start: 1,
                                        type: 1
                                    }), I.removeStyle("list-style-type"), E[O].parent = I)
                                }
                                for (h = CKEDITOR.plugins.list.arrayToList(E, h, null, a.config.enterMode), E = void 0, p = h.listNode.getChildCount(), d = 0; d < p && (E = h.listNode.getChild(d)); d++) E.getName() == this.type && s.push(E);
                                h.listNode.replace(c.root), a.fire("contentDomInvalidated")
                            } else {
                                for (E = t, d = h, s = g, p = d.contents, a = d.root.getDocument(), c = [], 1 == p.length && p[0].equals(d.root) && (h = a.createElement("div"), p[0].moveChildren && p[0].moveChildren(h), p[0].append(h), p[0] = h), d = d.contents[0].getParent(), T = 0; T < p.length; T++) d = d.getCommonAncestor(p[T].getParent());
                                for (C = E.config.useComputedState, E = h = void 0, C = void 0 === C || C, T = 0; T < p.length; T++)
                                    for (I = p[T]; O = I.getParent();) {
                                        if (O.equals(d)) {
                                            c.push(I), !E && I.getDirection() && (E = 1), I = I.getDirection(C), null !== h && (h = h && h != I ? null : I);
                                            break
                                        }
                                        I = O
                                    }
                                if (!(c.length < 1)) {
                                    for (p = c[c.length - 1].getNext(), T = a.createElement(this.type), s.push(T), C = s = void 0; c.length;) s = c.shift(), C = a.createElement("li"), s.is("pre") || m.test(s.getName()) || "false" == s.getAttribute("contenteditable") ? s.appendTo(C) : (s.copyAttributes(C), h && s.getDirection() && (C.removeStyle("direction"), C.removeAttribute("dir")), s.moveChildren(C), s.remove()), C.appendTo(T);
                                    h && E && T.setAttribute("dir", h), p ? T.insertBefore(p) : T.appendTo(d)
                                }
                            }
                    else this.state == CKEDITOR.TRISTATE_ON && u[h.root.getName()] && e.call(this, t, h, l);
                    for (T = 0; T < g.length; T++) i(g[T]);
                    CKEDITOR.dom.element.clearAllMarkers(l), o.selectBookmarks(n), t.focus()
                },
                refresh: function(e, t) {
                    var n = t.contains(u, 1),
                        i = t.blockLimit || t.root;
                    n && i.contains(n) ? this.setState(n.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
                }
            }, CKEDITOR.plugins.add("list", {
                requires: "indentlist",
                init: function(e) {
                    if (!e.blockless) {
                        var n = {};
                        e.addCommand("numberedlist", new t("numberedlist", "ol")), e.addCommand("bulletedlist", new t("bulletedlist", "ul")), e.on("selectionChange", c.bind(e, "LineGroup", n)), e.ui.addButton && (e.ui.add("LineGroup", CKEDITOR.UI_PANELBUTTON, {
                            label: e.lang.list.label,
                            modes: {
                                wysiwyg: 1
                            },
                            toolbar: "list,30",
                            editorFocus: 0,
                            panel: {
                                css: CKEDITOR.skin.getPath("editor"),
                                attributes: {
                                    role: "listbox",
                                    "aria-label": ""
                                }
                            },
                            onBlock: function(t, i) {
                                n.el = i.element, i.autoSize = !0, i.element.addClass("cke_linegroupblock"), i.element.setStyles({
                                    width: "84px",
                                    overflow: "hidden",
                                    "white-space": "nowrap",
                                    outline: "none"
                                }), i.element.setHtml(s.apply(e)), i.element.getDocument().getBody().setStyle("overflow", "hidden"), CKEDITOR.ui.fire("ready", this), c.call(e, "LineGroup", n)
                            }
                        }), e.ui.addButton("NumberedList", {
                            label: e.lang.list.numberedlist,
                            command: "numberedlist",
                            directional: !0,
                            toolbar: "list,10"
                        }), e.ui.addButton("BulletedList", {
                            label: e.lang.list.bulletedlist,
                            command: "bulletedlist",
                            directional: !0,
                            toolbar: "list,20"
                        })), e.on("key", function(t) {
                            var n, i = t.data.domEvent.getKey();
                            if ("wysiwyg" == e.mode && i in {
                                    8: 1,
                                    46: 1
                                }) {
                                var s = e.getSelection().getRanges()[0],
                                    l = s && s.startPath();
                                if (s && s.collapsed) {
                                    var c = 8 == i,
                                        d = e.editable(),
                                        h = new CKEDITOR.dom.walker(s.clone());
                                    if (h.evaluator = function(e) {
                                            return f(e) && !E(e)
                                        }, h.guard = function(e, t) {
                                            return !(t && e.type == CKEDITOR.NODE_ELEMENT && e.is("table"))
                                        }, i = s.clone(), c) {
                                        var m;
                                        if ((m = l.contains(u)) && s.checkBoundaryOfElement(m, CKEDITOR.START) && (m = m.getParent()) && m.is("li") && (m = r(m)) ? (n = m, m = m.getPrevious(f), i.moveToPosition(m && E(m) ? m : n, CKEDITOR.POSITION_BEFORE_START)) : (h.range.setStartAt(d, CKEDITOR.POSITION_AFTER_START), h.range.setEnd(s.startContainer, s.startOffset), (m = h.previous()) && m.type == CKEDITOR.NODE_ELEMENT && (m.getName() in u || m.is("li")) && (m.is("li") || (h.range.selectNodeContents(m), h.reset(), h.evaluator = o, m = h.previous()), n = m, i.moveToElementEditEnd(n), i.moveToPosition(i.endPath().block, CKEDITOR.POSITION_BEFORE_END))), n) a(e, i, s), t.cancel();
                                        else {
                                            var g = l.contains(u);
                                            g && s.checkBoundaryOfElement(g, CKEDITOR.START) && (n = g.getFirst(f), s.checkBoundaryOfElement(n, CKEDITOR.START) && (m = g.getPrevious(f), r(n) ? m && (s.moveToElementEditEnd(m), s.select()) : e.execCommand("outdent"), t.cancel()))
                                        }
                                    } else if (n = l.contains("li")) {
                                        if (h.range.setEndAt(d, CKEDITOR.POSITION_BEFORE_END), c = (d = n.getLast(f)) && o(d) ? d : n, l = 0, (m = h.next()) && m.type == CKEDITOR.NODE_ELEMENT && m.getName() in u && m.equals(d) ? (l = 1, m = h.next()) : s.checkBoundaryOfElement(c, CKEDITOR.END) && (l = 2), l && m) {
                                            if (s = s.clone(), s.moveToElementEditStart(m), 1 == l && (i.optimize(), !i.startContainer.equals(n))) {
                                                for (n = i.startContainer; n.is(CKEDITOR.dtd.$inline);) g = n, n = n.getParent();
                                                g && i.moveToPosition(g, CKEDITOR.POSITION_AFTER_END)
                                            }
                                            2 == l && (i.moveToPosition(i.endPath().block, CKEDITOR.POSITION_BEFORE_END), s.endPath().block && s.moveToPosition(s.endPath().block, CKEDITOR.POSITION_AFTER_START)), a(e, i, s), t.cancel()
                                        }
                                    } else h.range.setEndAt(d, CKEDITOR.POSITION_BEFORE_END), (m = h.next()) && m.type == CKEDITOR.NODE_ELEMENT && m.is(u) && (m = m.getFirst(f), l.block && s.checkStartOfBlock() && s.checkEndOfBlock() ? (l.block.remove(), s.moveToElementEditStart(m), s.select()) : r(m) ? (s.moveToElementEditStart(m), s.select()) : (s = s.clone(), s.moveToElementEditStart(m), a(e, i, s)), t.cancel());
                                    setTimeout(function() {
                                        e.selectionChange(1)
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }(), function() {
            function e(e, t, n) {
                var i = CKEDITOR.cleanWord;
                return i ? n() : (e = CKEDITOR.getUrl(e.config.pasteFromWordCleanupFile || t + "filter/default.js"), CKEDITOR.scriptLoader.load(e, n, null, !0)), !i
            }

            function t(e) {
                e.data.type = "html"
            }
            CKEDITOR.plugins.add("pastefromword", {
                requires: "clipboard",
                init: function(n) {
                    var i = 0,
                        o = this.path;
                    n.addCommand("pastefromword", {
                        canUndo: !1,
                        async: !0,
                        exec: function(e) {
                            var n = this;
                            i = 1, e.once("beforePaste", t), e.getClipboardData({
                                title: e.lang.pastefromword.title
                            }, function(t) {
                                t && e.fire("paste", {
                                    type: "html",
                                    dataValue: t.dataValue,
                                    method: "paste",
                                    dataTransfer: CKEDITOR.plugins.clipboard.initPasteDataTransfer()
                                }), e.fire("afterCommandExec", {
                                    name: "pastefromword",
                                    command: n,
                                    returnValue: !!t
                                })
                            })
                        }
                    }), n.ui.addButton && n.ui.addButton("PasteFromWord", {
                        label: n.lang.pastefromword.toolbar,
                        command: "pastefromword",
                        toolbar: "clipboard,50"
                    }), n.on("pasteState", function(e) {
                        n.getCommand("pastefromword").setState(e.data)
                    }), n.on("paste", function(t) {
                        var a = t.data,
                            r = a.dataValue;
                        if (r && (i || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(r))) {
                            a.dontFilter = !0;
                            var s = e(n, o, function() {
                                s ? n.fire("paste", a) : (!n.config.pasteFromWordPromptCleanup || i || confirm(n.lang.pastefromword.confirmCleanup)) && (a.dataValue = CKEDITOR.cleanWord(r, n)), i = 0
                            });
                            s && t.cancel()
                        }
                    }, null, null, 3)
                }
            })
        }(), function() {
            function e(e) {
                function n() {
                    for (var n = i(), a = CKEDITOR.tools.clone(e.config.toolbarGroups) || t(e), r = 0; r < a.length; r++) {
                        var s = a[r];
                        if ("/" != s) {
                            "string" == typeof s && (s = a[r] = {
                                name: s
                            });
                            var l, c = s.groups;
                            if (c)
                                for (var u = 0; u < c.length; u++) l = c[u], (l = n[l]) && o(s, l);
                            (l = n[s.name]) && o(s, l)
                        }
                    }
                    return a
                }

                function i() {
                    var t, n, i, o = {};
                    for (t in e.ui.items) n = e.ui.items[t], i = n.toolbar || "others", i = i.split(","), n = i[0], i = parseInt(i[1] || -1, 10), o[n] || (o[n] = []), o[n].push({
                        name: t,
                        order: i
                    });
                    for (n in o) o[n] = o[n].sort(function(e, t) {
                        return e.order == t.order ? 0 : t.order < 0 ? -1 : e.order < 0 ? 1 : e.order < t.order ? -1 : 1
                    });
                    return o
                }

                function o(t, n) {
                    if (n.length) {
                        t.items ? t.items.push(e.ui.create("-")) : t.items = [];
                        for (var i; i = n.shift();) i = "string" == typeof i ? i : i.name, r && CKEDITOR.tools.indexOf(r, i) != -1 || (i = e.ui.create(i)) && e.addFeature(i) && t.items.push(i)
                    }
                }

                function a(e) {
                    var t, n, i, a = [];
                    for (t = 0; t < e.length; ++t) n = e[t], i = {}, "/" == n ? a.push(n) : CKEDITOR.tools.isArray(n) ? (o(i, CKEDITOR.tools.clone(n)), a.push(i)) : n.items && (o(i, CKEDITOR.tools.clone(n.items)), i.name = n.name, a.push(i));
                    return a
                }
                var r = e.config.removeButtons,
                    r = r && r.split(","),
                    s = e.config.toolbar;
                return "string" == typeof s && (s = e.config["toolbar_" + s]), e.toolbar = s ? a(s) : n()
            }

            function t(e) {
                return e._.toolbarGroups || (e._.toolbarGroups = [{
                    name: "document",
                    groups: ["mode", "document", "doctools"]
                }, {
                    name: "clipboard",
                    groups: ["clipboard", "undo"]
                }, {
                    name: "editing",
                    groups: ["find", "selection", "spellchecker"]
                }, {
                    name: "forms"
                }, "/", {
                    name: "basicstyles",
                    groups: ["basicstyles", "cleanup"]
                }, {
                    name: "paragraph",
                    groups: ["list", "indent", "blocks", "align", "bidi"]
                }, {
                    name: "links"
                }, {
                    name: "insert"
                }, "/", {
                    name: "styles"
                }, {
                    name: "colors"
                }, {
                    name: "tools"
                }, {
                    name: "others"
                }, {
                    name: "about"
                }])
            }
            var n = function() {
                this.toolbars = [], this.focusCommandExecuted = !1
            };
            n.prototype.focus = function() {
                for (var e, t = 0; e = this.toolbars[t++];)
                    for (var n, i = 0; n = e.items[i++];)
                        if (n.focus) return void n.focus()
            };
            var i = {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                readOnly: 1,
                exec: function(e) {
                    e.toolbox && (e.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() {
                        e.toolbox.focus()
                    }, 100) : e.toolbox.focus())
                }
            };
            CKEDITOR.plugins.add("toolbar", {
                requires: "button",
                init: function(t) {
                    var o, a = function(e, n) {
                        var i, r = "rtl" == t.lang.dir,
                            s = t.config.toolbarGroupCycling,
                            l = r ? 37 : 39,
                            r = r ? 39 : 37,
                            s = void 0 === s || s;
                        switch (n) {
                            case 9:
                            case CKEDITOR.SHIFT + 9:
                                for (; !i || !i.items.length;)
                                    if (i = 9 == n ? (i ? i.next : e.toolbar.next) || t.toolbox.toolbars[0] : (i ? i.previous : e.toolbar.previous) || t.toolbox.toolbars[t.toolbox.toolbars.length - 1], i.items.length)
                                        for (e = i.items[o ? i.items.length - 1 : 0]; e && !e.focus;)(e = o ? e.previous : e.next) || (i = 0);
                                return e && e.focus(), !1;
                            case l:
                                i = e;
                                do i = i.next, !i && s && (i = e.toolbar.items[0]); while (i && !i.focus);
                                return i ? i.focus() : a(e, 9), !1;
                            case 40:
                                return e.button && e.button.hasArrow ? (t.once("panelShow", function(e) {
                                    e.data._.panel._.currentBlock.onKeyDown(40)
                                }), e.execute()) : a(e, 40 == n ? l : r), !1;
                            case r:
                            case 38:
                                i = e;
                                do i = i.previous, !i && s && (i = e.toolbar.items[e.toolbar.items.length - 1]); while (i && !i.focus);
                                return i ? i.focus() : (o = 1, a(e, CKEDITOR.SHIFT + 9), o = 0), !1;
                            case 27:
                                return t.focus(), !1;
                            case 13:
                            case 32:
                                return e.execute(), !1
                        }
                        return !0
                    };
                    t.on("uiSpace", function(i) {
                        if (i.data.space == t.config.toolbarLocation) {
                            i.removeListener(), t.toolbox = new n;
                            var o, r, s = CKEDITOR.tools.getNextId(),
                                l = ['<span id="', s, '" class="cke_voice_label">', t.lang.toolbar.toolbars, "</span>", '<span id="' + t.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', s, '" onmousedown="return false;">'],
                                s = t.config.toolbarStartupExpanded !== !1;
                            t.config.toolbarCanCollapse && t.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && l.push('<span class="cke_toolbox_main"' + (s ? ">" : ' style="display:none">'));
                            for (var c = t.toolbox.toolbars, u = e(t), d = 0; d < u.length; d++) {
                                var h, f, E, m = 0,
                                    g = u[d];
                                if (g)
                                    if (o && (l.push("</span>"), r = o = 0), "/" === g) l.push('<span class="cke_toolbar_break"></span>');
                                    else {
                                        E = g.items || g;
                                        for (var p = 0; p < E.length; p++) {
                                            var T, C = E[p];
                                            if (C)
                                                if (C.type == CKEDITOR.UI_SEPARATOR) r = o && C;
                                                else {
                                                    if (T = C.canGroup !== !1, !m) {
                                                        h = CKEDITOR.tools.getNextId(), m = {
                                                            id: h,
                                                            items: []
                                                        }, f = g.name && (t.lang.toolbar.toolbarGroups[g.name] || g.name), l.push('<span id="', h, '" class="cke_toolbar"', f ? ' aria-labelledby="' + h + '_label"' : "", ' role="toolbar">'), f && l.push('<span id="', h, '_label" class="cke_voice_label">', f, "</span>"), l.push('<span class="cke_toolbar_start"></span>');
                                                        var I = c.push(m) - 1;
                                                        I > 0 && (m.previous = c[I - 1], m.previous.next = m)
                                                    }
                                                    T ? o || (l.push('<span class="cke_toolgroup" role="presentation">'), o = 1) : o && (l.push("</span>"), o = 0), h = function(e) {
                                                        e = e.render(t, l), I = m.items.push(e) - 1, I > 0 && (e.previous = m.items[I - 1], e.previous.next = e), e.toolbar = m, e.onkey = a, e.onfocus = function() {
                                                            t.toolbox.focusCommandExecuted || t.focus()
                                                        }
                                                    }, r && (h(r), r = 0), h(C)
                                                }
                                        }
                                        o && (l.push("</span>"), r = o = 0), m && l.push('<span class="cke_toolbar_end"></span></span>')
                                    }
                            }
                            if (t.config.toolbarCanCollapse && l.push("</span>"), t.config.toolbarCanCollapse && t.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                var O = CKEDITOR.tools.addFunction(function() {
                                    t.execCommand("toolbarCollapse")
                                });
                                t.on("destroy", function() {
                                    CKEDITOR.tools.removeFunction(O)
                                }), t.addCommand("toolbarCollapse", {
                                    readOnly: 1,
                                    exec: function(e) {
                                        var t = e.ui.space("toolbar_collapser"),
                                            n = t.getPrevious(),
                                            i = e.ui.space("contents"),
                                            o = n.getParent(),
                                            a = parseInt(i.$.style.height, 10),
                                            r = o.$.offsetHeight,
                                            s = t.hasClass("cke_toolbox_collapser_min");
                                        s ? (n.show(), t.removeClass("cke_toolbox_collapser_min"), t.setAttribute("title", e.lang.toolbar.toolbarCollapse)) : (n.hide(), t.addClass("cke_toolbox_collapser_min"), t.setAttribute("title", e.lang.toolbar.toolbarExpand)), t.getFirst().setText(s ? "▲" : "◀"), i.setStyle("height", a - (o.$.offsetHeight - r) + "px"), e.fire("resize", {
                                            outerHeight: e.container.$.offsetHeight,
                                            contentsHeight: i.$.offsetHeight,
                                            outerWidth: e.container.$.offsetWidth
                                        })
                                    },
                                    modes: {
                                        wysiwyg: 1,
                                        source: 1
                                    }
                                }), t.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"), l.push('<a title="' + (s ? t.lang.toolbar.toolbarCollapse : t.lang.toolbar.toolbarExpand) + '" id="' + t.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser'), s || l.push(" cke_toolbox_collapser_min"), l.push('" onclick="CKEDITOR.tools.callFunction(' + O + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>")
                            }
                            l.push("</span>"), i.data.html = i.data.html + l.join("")
                        }
                    }), t.on("destroy", function() {
                        if (this.toolbox) {
                            var e, t, n, i, o = 0;
                            for (e = this.toolbox.toolbars; o < e.length; o++)
                                for (n = e[o].items, t = 0; t < n.length; t++) i = n[t], i.clickFn && CKEDITOR.tools.removeFunction(i.clickFn), i.keyDownFn && CKEDITOR.tools.removeFunction(i.keyDownFn)
                        }
                    }), t.on("uiReady", function() {
                        var e = t.ui.space("toolbox");
                        e && t.focusManager.add(e, 1)
                    }), t.addCommand("toolbarFocus", i), t.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"), t.ui.add("-", CKEDITOR.UI_SEPARATOR, {}), t.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
                        create: function() {
                            return {
                                render: function(e, t) {
                                    return t.push('<span class="cke_toolbar_separator" role="separator"></span>'), {}
                                }
                            }
                        }
                    })
                }
            }), CKEDITOR.ui.prototype.addToolbarGroup = function(e, n, i) {
                var o = t(this.editor),
                    a = 0 === n,
                    r = {
                        name: e
                    };
                if (i) {
                    if (i = CKEDITOR.tools.search(o, function(e) {
                            return e.name == i
                        })) return !i.groups && (i.groups = []), n && (n = CKEDITOR.tools.indexOf(i.groups, n),
                        n >= 0) ? void i.groups.splice(n + 1, 0, e) : void(a ? i.groups.splice(0, 0, e) : i.groups.push(e));
                    n = null
                }
                n && (n = CKEDITOR.tools.indexOf(o, function(e) {
                    return e.name == n
                })), a ? o.splice(0, 0, e) : "number" == typeof n ? o.splice(n + 1, 0, r) : o.push(e)
            }
        }(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top", function() {
            var e = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90],
                t = {
                    8: 1,
                    46: 1
                };
            CKEDITOR.plugins.add("undo", {
                init: function(t) {
                    function i(e) {
                        r.enabled && e.data.command.canUndo !== !1 && r.save()
                    }

                    function o() {
                        r.enabled = !t.readOnly && "wysiwyg" == t.mode, r.onChange()
                    }
                    var r = t.undoManager = new n(t),
                        s = r.editingHandler = new a(r),
                        l = t.addCommand("undo", {
                            exec: function() {
                                r.undo() && (t.selectionChange(), this.fire("afterUndo"))
                            },
                            startDisabled: !0,
                            canUndo: !1
                        }),
                        c = t.addCommand("redo", {
                            exec: function() {
                                r.redo() && (t.selectionChange(), this.fire("afterRedo"))
                            },
                            startDisabled: !0,
                            canUndo: !1
                        });
                    t.setKeystroke([
                        [e[0], "undo"],
                        [e[1], "redo"],
                        [e[2], "redo"]
                    ]), r.onChange = function() {
                        l.setState(r.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), c.setState(r.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                    }, t.on("beforeCommandExec", i), t.on("afterCommandExec", i), t.on("saveSnapshot", function(e) {
                        r.save(e.data && e.data.contentOnly)
                    }), t.on("contentDom", s.attachListeners, s), t.on("instanceReady", function() {
                        t.fire("saveSnapshot")
                    }), t.on("beforeModeUnload", function() {
                        "wysiwyg" == t.mode && r.save(!0)
                    }), t.on("mode", o), t.on("readOnly", o), t.ui.addButton && (t.ui.addButton("Undo", {
                        label: t.lang.undo.undo,
                        command: "undo",
                        toolbar: "undo,10"
                    }), t.ui.addButton("Redo", {
                        label: t.lang.undo.redo,
                        command: "redo",
                        toolbar: "undo,20"
                    })), t.resetUndo = function() {
                        r.reset(), t.fire("saveSnapshot")
                    }, t.on("updateSnapshot", function() {
                        r.currentImage && r.update()
                    }), t.on("lockSnapshot", function(e) {
                        e = e.data, r.lock(e && e.dontUpdate, e && e.forceUpdate)
                    }), t.on("unlockSnapshot", r.unlock, r)
                }
            }), CKEDITOR.plugins.undo = {};
            var n = CKEDITOR.plugins.undo.UndoManager = function(e) {
                this.strokesRecorded = [0, 0], this.locked = null, this.previousKeyGroup = -1, this.limit = e.config.undoStackSize || 20, this.strokesLimit = 25, this.editor = e, this.reset()
            };
            n.prototype = {
                type: function(e, t) {
                    var i = n.getKeyGroup(e),
                        o = this.strokesRecorded[i] + 1,
                        t = t || o >= this.strokesLimit;
                    this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange()), t ? (o = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change"), this.strokesRecorded[i] = o, this.previousKeyGroup = i
                },
                keyGroupChanged: function(e) {
                    return n.getKeyGroup(e) != this.previousKeyGroup
                },
                reset: function() {
                    this.snapshots = [], this.index = -1, this.currentImage = null, this.hasRedo = this.hasUndo = !1, this.locked = null, this.resetType()
                },
                resetType: function() {
                    this.strokesRecorded = [0, 0], this.typing = !1, this.previousKeyGroup = -1
                },
                refreshState: function() {
                    this.hasUndo = !!this.getNextImage(!0), this.hasRedo = !!this.getNextImage(!1), this.resetType(), this.onChange()
                },
                save: function(e, t, n) {
                    var o = this.editor;
                    if (this.locked || "ready" != o.status || "wysiwyg" != o.mode) return !1;
                    var a = o.editable();
                    if (!a || "ready" != a.status) return !1;
                    if (a = this.snapshots, t || (t = new i(o)), t.contents === !1) return !1;
                    if (this.currentImage)
                        if (t.equalsContent(this.currentImage)) {
                            if (e || t.equalsSelection(this.currentImage)) return !1
                        } else n !== !1 && o.fire("change");
                    return a.splice(this.index + 1, a.length - this.index - 1), a.length == this.limit && a.shift(), this.index = a.push(t) - 1, this.currentImage = t, n !== !1 && this.refreshState(), !0
                },
                restoreImage: function(e) {
                    var t, n = this.editor;
                    e.bookmarks && (n.focus(), t = n.getSelection()), this.locked = {
                        level: 999
                    }, this.editor.loadSnapshot(e.contents), e.bookmarks ? t.selectBookmarks(e.bookmarks) : CKEDITOR.env.ie && (t = this.editor.document.getBody().$.createTextRange(), t.collapse(!0), t.select()), this.locked = null, this.index = e.index, this.currentImage = this.snapshots[this.index], this.update(), this.refreshState(), n.fire("change")
                },
                getNextImage: function(e) {
                    var t, n = this.snapshots,
                        i = this.currentImage;
                    if (i)
                        if (e) {
                            for (t = this.index - 1; t >= 0; t--)
                                if (e = n[t], !i.equalsContent(e)) return e.index = t, e
                        } else
                            for (t = this.index + 1; t < n.length; t++)
                                if (e = n[t], !i.equalsContent(e)) return e.index = t, e;
                    return null
                },
                redoable: function() {
                    return this.enabled && this.hasRedo
                },
                undoable: function() {
                    return this.enabled && this.hasUndo
                },
                undo: function() {
                    if (this.undoable()) {
                        this.save(!0);
                        var e = this.getNextImage(!0);
                        if (e) return this.restoreImage(e), !0
                    }
                    return !1
                },
                redo: function() {
                    if (this.redoable() && (this.save(!0), this.redoable())) {
                        var e = this.getNextImage(!1);
                        if (e) return this.restoreImage(e), !0
                    }
                    return !1
                },
                update: function(e) {
                    if (!this.locked) {
                        e || (e = new i(this.editor));
                        for (var t = this.index, n = this.snapshots; t > 0 && this.currentImage.equalsContent(n[t - 1]);) t -= 1;
                        n.splice(t, this.index - t + 1, e), this.index = t, this.currentImage = e
                    }
                },
                updateSelection: function(e) {
                    if (!this.snapshots.length) return !1;
                    var t = this.snapshots,
                        n = t[t.length - 1];
                    return !(!n.equalsContent(e) || n.equalsSelection(e)) && (this.currentImage = t[t.length - 1] = e, !0)
                },
                lock: function(e, t) {
                    if (this.locked) this.locked.level++;
                    else if (e) this.locked = {
                        level: 1
                    };
                    else {
                        var n = null;
                        if (t) n = !0;
                        else {
                            var o = new i(this.editor, !0);
                            this.currentImage && this.currentImage.equalsContent(o) && (n = o)
                        }
                        this.locked = {
                            update: n,
                            level: 1
                        }
                    }
                },
                unlock: function() {
                    if (this.locked && !--this.locked.level) {
                        var e = this.locked.update;
                        if (this.locked = null, e === !0) this.update();
                        else if (e) {
                            var t = new i(this.editor, !0);
                            e.equalsContent(t) || this.update()
                        }
                    }
                }
            }, n.navigationKeyCodes = {
                37: 1,
                38: 1,
                39: 1,
                40: 1,
                36: 1,
                35: 1,
                33: 1,
                34: 1
            }, n.keyGroups = {
                PRINTABLE: 0,
                FUNCTIONAL: 1
            }, n.isNavigationKey = function(e) {
                return !!n.navigationKeyCodes[e]
            }, n.getKeyGroup = function(e) {
                var i = n.keyGroups;
                return t[e] ? i.FUNCTIONAL : i.PRINTABLE
            }, n.getOppositeKeyGroup = function(e) {
                var t = n.keyGroups;
                return e == t.FUNCTIONAL ? t.PRINTABLE : t.FUNCTIONAL
            }, n.ieFunctionalKeysBug = function(e) {
                return CKEDITOR.env.ie && n.getKeyGroup(e) == n.keyGroups.FUNCTIONAL
            };
            var i = CKEDITOR.plugins.undo.Image = function(e, t) {
                    this.editor = e, e.fire("beforeUndoImage");
                    var n = e.getSnapshot();
                    CKEDITOR.env.ie && n && (n = n.replace(/\s+data-cke-expando=".*?"/g, "")), this.contents = n, t || (this.bookmarks = (n = n && e.getSelection()) && n.createBookmarks2(!0)), e.fire("afterUndoImage")
                },
                o = /\b(?:href|src|name)="[^"]*?"/gi;
            i.prototype = {
                equalsContent: function(e) {
                    var t = this.contents,
                        e = e.contents;
                    return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (t = t.replace(o, ""), e = e.replace(o, "")), t == e
                },
                equalsSelection: function(e) {
                    var t = this.bookmarks,
                        e = e.bookmarks;
                    if (t || e) {
                        if (!t || !e || t.length != e.length) return !1;
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n],
                                o = e[n];
                            if (i.startOffset != o.startOffset || i.endOffset != o.endOffset || !CKEDITOR.tools.arrayCompare(i.start, o.start) || !CKEDITOR.tools.arrayCompare(i.end, o.end)) return !1
                        }
                    }
                    return !0
                }
            };
            var a = CKEDITOR.plugins.undo.NativeEditingHandler = function(e) {
                this.undoManager = e, this.ignoreInputEvent = !1, this.keyEventsStack = new r, this.lastKeydownImage = null
            };
            a.prototype = {
                onKeydown: function(t) {
                    var o = t.data.getKey();
                    229 !== o && (CKEDITOR.tools.indexOf(e, t.data.getKeystroke()) > -1 ? t.data.preventDefault() : (this.keyEventsStack.cleanUp(t), t = this.undoManager, this.keyEventsStack.getLast(o) || this.keyEventsStack.push(o), this.lastKeydownImage = new i(t.editor), (n.isNavigationKey(o) || this.undoManager.keyGroupChanged(o)) && (t.strokesRecorded[0] || t.strokesRecorded[1]) && (t.save(!1, this.lastKeydownImage, !1), t.resetType())))
                },
                onInput: function() {
                    if (this.ignoreInputEvent) this.ignoreInputEvent = !1;
                    else {
                        var e = this.keyEventsStack.getLast();
                        e || (e = this.keyEventsStack.push(0)), this.keyEventsStack.increment(e.keyCode), this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(e.keyCode, !0), this.keyEventsStack.resetInputs())
                    }
                },
                onKeyup: function(e) {
                    var t = this.undoManager,
                        e = e.data.getKey(),
                        o = this.keyEventsStack.getTotalInputs();
                    this.keyEventsStack.remove(e), n.ieFunctionalKeysBug(e) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new i(t.editor, !0)) || (o > 0 ? t.type(e) : n.isNavigationKey(e) && this.onNavigationKey(!0))
                },
                onNavigationKey: function(e) {
                    var t = this.undoManager;
                    (e || !t.save(!0, null, !1)) && t.updateSelection(new i(t.editor)), t.resetType()
                },
                ignoreInputEventListener: function() {
                    this.ignoreInputEvent = !0
                },
                attachListeners: function() {
                    var e = this.undoManager.editor,
                        t = e.editable(),
                        i = this;
                    t.attachListener(t, "keydown", function(e) {
                        i.onKeydown(e), n.ieFunctionalKeysBug(e.data.getKey()) && i.onInput()
                    }, null, null, 999), t.attachListener(t, CKEDITOR.env.ie ? "keypress" : "input", i.onInput, i, null, 999), t.attachListener(t, "keyup", i.onKeyup, i, null, 999), t.attachListener(t, "paste", i.ignoreInputEventListener, i, null, 999), t.attachListener(t, "drop", i.ignoreInputEventListener, i, null, 999), t.attachListener(t.isInline() ? t : e.document.getDocumentElement(), "click", function() {
                        i.onNavigationKey()
                    }, null, null, 999), t.attachListener(this.undoManager.editor, "blur", function() {
                        i.keyEventsStack.remove(9)
                    }, null, null, 999)
                }
            };
            var r = CKEDITOR.plugins.undo.KeyEventsStack = function() {
                this.stack = []
            };
            r.prototype = {
                push: function(e) {
                    return this.stack[this.stack.push({
                        keyCode: e,
                        inputs: 0
                    }) - 1]
                },
                getLastIndex: function(e) {
                    if ("number" != typeof e) return this.stack.length - 1;
                    for (var t = this.stack.length; t--;)
                        if (this.stack[t].keyCode == e) return t;
                    return -1
                },
                getLast: function(e) {
                    return e = this.getLastIndex(e), e != -1 ? this.stack[e] : null
                },
                increment: function(e) {
                    this.getLast(e).inputs++
                },
                remove: function(e) {
                    e = this.getLastIndex(e), e != -1 && this.stack.splice(e, 1)
                },
                resetInputs: function(e) {
                    if ("number" == typeof e) this.getLast(e).inputs = 0;
                    else
                        for (e = this.stack.length; e--;) this.stack[e].inputs = 0
                },
                getTotalInputs: function() {
                    for (var e = this.stack.length, t = 0; e--;) t += this.stack[e].inputs;
                    return t
                },
                cleanUp: function(e) {
                    e = e.data.$, !e.ctrlKey && !e.metaKey && this.remove(17), e.shiftKey || this.remove(16), e.altKey || this.remove(18)
                }
            }
        }(), CKEDITOR.config.plugins = "basicstyles,dialogui,dialog,clipboard,button,panelbutton,panel,floatpanel,colorbutton,defaultstyle,entities,floatingspace,fontfamily,menu,menubutton,fontsize,listblock,richcombo,format,indent,indentlist,justify,fakeobjects,link,list,pastefromword,toolbar,undo", CKEDITOR.config.skin = "clean", function() {
            var e = function(e, t) {
                for (var n = CKEDITOR.getUrl("plugins/" + t), e = e.split(","), i = 0; i < e.length; i++) CKEDITOR.skin.icons[e[i]] = {
                    path: n,
                    offset: -e[++i],
                    bgsize: e[++i]
                }
            };
            CKEDITOR.env.hidpi ? e("bold,0,,italic,24,,strike,48,,subscript,72,,superscript,96,,underline,120,,copy-rtl,144,,copy,168,,cut-rtl,192,,cut,216,,paste-rtl,240,,paste,264,,indent-rtl,288,,indent,312,,outdent-rtl,336,,outdent,360,,justifyblock,384,,justifycenter,408,,justifyleft,432,,justifyright,456,,anchor-rtl,480,,anchor,504,,link,528,,unlink,552,,bulletedlist-rtl,576,,bulletedlist,600,,numberedlist-rtl,624,,numberedlist,648,,pastefromword-rtl,672,,pastefromword,696,,redo-rtl,720,,redo,744,,undo-rtl,768,,undo,792,", "icons_hidpi.png") : e("bold,0,auto,italic,24,auto,strike,48,auto,subscript,72,auto,superscript,96,auto,underline,120,auto,copy-rtl,144,auto,copy,168,auto,cut-rtl,192,auto,cut,216,auto,paste-rtl,240,auto,paste,264,auto,indent-rtl,288,auto,indent,312,auto,outdent-rtl,336,auto,outdent,360,auto,justifyblock,384,auto,justifycenter,408,auto,justifyleft,432,auto,justifyright,456,auto,anchor-rtl,480,auto,anchor,504,auto,link,528,auto,unlink,552,auto,bulletedlist-rtl,576,auto,bulletedlist,600,auto,numberedlist-rtl,624,auto,numberedlist,648,auto,pastefromword-rtl,672,auto,pastefromword,696,auto,redo-rtl,720,auto,redo,744,auto,undo-rtl,768,auto,undo,792,auto", "icons.png")
        }())
    }(), CKEDITOR.lang.en = {
        undo: {
            redo: "Redo",
            undo: "Undo"
        },
        toolbar: {
            toolbarCollapse: "Collapse Toolbar",
            toolbarExpand: "Expand Toolbar",
            toolbarGroups: {
                document: "Document",
                clipboard: "Clipboard/Undo",
                editing: "Editing",
                forms: "Forms",
                basicstyles: "Basic Styles",
                paragraph: "Paragraph",
                links: "Links",
                insert: "Insert",
                styles: "Styles",
                colors: "Colors",
                tools: "Tools"
            },
            toolbars: "Editor toolbars"
        },
        pastefromword: {
            confirmCleanup: "The text you want to paste seems to be copied from Word. Do you want to clean it before pasting?",
            error: "It was not possible to clean up the pasted data due to an internal error",
            title: "Paste from Word",
            toolbar: "Paste from Word"
        },
        list: {
            label: I18n.t("js.pages.edit.rich_text.list"),
            bulletedlist: I18n.t("js.pages.edit.rich_text.bulleted_list"),
            numberedlist: I18n.t("js.pages.edit.rich_text.numbered_list"),
            removeformat: I18n.t("js.pages.edit.rich_text.remove_format")
        },
        link: {
            acccessKey: "Access Key",
            advanced: "Advanced",
            advisoryContentType: "Advisory Content Type",
            advisoryTitle: "Advisory Title",
            anchor: {
                toolbar: "Anchor",
                menu: "Edit Anchor",
                title: "Anchor Properties",
                name: "Anchor Name",
                errorName: "Please type the anchor name",
                remove: "Remove Anchor"
            },
            anchorId: "By Element Id",
            anchorName: "By Anchor Name",
            charset: "Linked Resource Charset",
            cssClasses: "Stylesheet Classes",
            emailAddress: I18n.t("js.pages.edit.rich_text.link_dialog_email_address"),
            emailBody: "Message Body",
            emailSubject: "Message Subject",
            id: "Id",
            info: "Link Info",
            langCode: "Language Code",
            langDir: "Language Direction",
            langDirLTR: "Left to Right (LTR)",
            langDirRTL: "Right to Left (RTL)",
            menu: "Edit Link",
            name: "Name",
            noAnchors: "(No anchors available in the document)",
            noEmail: "Please type the e-mail address",
            invalidEmail: I18n.t("js.pages.edit.rich_text.link_dialog_invalid_email"),
            uploadDocument: "Upload document",
            openInNewTab: I18n.t("js.pages.edit.rich_text.link_dialog_open_in_new_tab"),
            noUrl: "Please type the link URL",
            other: "<other>",
            popupDependent: "Dependent (Netscape)",
            popupFeatures: "Popup Window Features",
            popupFullScreen: "Full Screen (IE)",
            popupLeft: "Left Position",
            popupLocationBar: "Location Bar",
            popupMenuBar: "Menu Bar",
            popupResizable: "Resizable",
            popupScrollBars: "Scroll Bars",
            popupStatusBar: "Status Bar",
            popupToolbar: "Toolbar",
            popupTop: "Top Position",
            rel: "Relationship",
            selectAnchor: "Select an Anchor",
            styles: "Style",
            tabIndex: "Tab Index",
            target: "Target",
            targetFrame: "<frame>",
            targetFrameName: "Target Frame Name",
            targetPopup: "<popup window>",
            targetPopupName: "Popup Window Name",
            title: I18n.t("js.pages.edit.rich_text.link_dialog_title"),
            toAnchor: "Link to anchor in the text",
            toEmail: I18n.t("js.pages.edit.rich_text.link_dialog_email"),
            toWeb: I18n.t("js.pages.edit.rich_text.link_dialog_web"),
            toDocument: I18n.t("js.pages.edit.rich_text.link_dialog_document"),
            toolbar: I18n.t("js.pages.edit.rich_text.link"),
            type: "Link Type",
            unlink: "Unlink",
            upload: I18n.t("js.pages.edit.rich_text.link_dialog_upload_file"),
            url: I18n.t("js.pages.edit.rich_text.link_dialog_url"),
            urlPlaceholder: I18n.t("js.pages.edit.rich_text.link_dialog_url_placeholder"),
            emailPlaceholder: I18n.t("js.pages.edit.rich_text.link_dialog_email_placeholder"),
            removeLink: I18n.t("js.pages.edit.rich_text.link_dialog_remove_link"),
            removeEmail: I18n.t("js.pages.edit.rich_text.link_dialog_remove_email"),
            removeDocument: I18n.t("js.pages.edit.rich_text.link_dialog_remove_document")
        },
        justify: {
            label: I18n.t("js.pages.edit.rich_text.alignment"),
            block: I18n.t("js.pages.edit.rich_text.align_justify"),
            center: I18n.t("js.pages.edit.rich_text.align_center"),
            left: I18n.t("js.pages.edit.rich_text.align_left"),
            right: I18n.t("js.pages.edit.rich_text.align_right")
        },
        indent: {
            indent: "Increase Indent",
            outdent: "Decrease Indent"
        },
        fontsize: {
            label: I18n.t("js.pages.edit.rich_text.font_size"),
            smaller: I18n.t("js.pages.edit.rich_text.font_size_smaller"),
            small: I18n.t("js.pages.edit.rich_text.font_size_small"),
            normal: I18n.t("js.pages.edit.rich_text.font_size_normal"),
            large: I18n.t("js.pages.edit.rich_text.font_size_large"),
            larger: I18n.t("js.pages.edit.rich_text.font_size_larger"),
            largest: I18n.t("js.pages.edit.rich_text.font_size_largest")
        },
        format: {
            label: I18n.t("js.pages.edit.rich_text.format"),
            h1: I18n.t("js.pages.edit.rich_text.format_h1"),
            h2: I18n.t("js.pages.edit.rich_text.format_h2"),
            h3: I18n.t("js.pages.edit.rich_text.format_h3"),
            h4: I18n.t("js.pages.edit.rich_text.format_h4"),
            h5: I18n.t("js.pages.edit.rich_text.format_h5"),
            p: I18n.t("js.pages.edit.rich_text.format_p"),
            div: I18n.t("js.pages.edit.rich_text.format_small")
        },
        fontfamily: {
            label: I18n.t("js.pages.edit.rich_text.font_family")
        },
        fakeobjects: {
            anchor: "Anchor",
            flash: "Flash Animation",
            hiddenfield: "Hidden Field",
            iframe: "IFrame",
            unknown: "Unknown Object"
        },
        clipboard: {
            copy: "Copy",
            copyError: "Your browser security settings don't permit the editor to automatically execute copying operations. Please use the keyboard for that (Ctrl/Cmd+C).",
            cut: "Cut",
            cutError: "Your browser security settings don't permit the editor to automatically execute cutting operations. Please use the keyboard for that (Ctrl/Cmd+X).",
            paste: "Paste",
            pasteArea: "Paste Area",
            pasteMsg: "Please paste inside the following box using the keyboard (<strong>Ctrl/Cmd+V</strong>) and hit OK",
            securityMsg: "Because of your browser security settings, the editor is not able to access your clipboard data directly. You are required to paste it again in this window.",
            title: "Paste"
        },
        button: {
            selectedLabel: "%1 (Selected)"
        },
        basicstyles: {
            bold: I18n.t("js.pages.edit.rich_text.bold"),
            italic: I18n.t("js.pages.edit.rich_text.italic"),
            strike: "Strikethrough",
            subscript: "Subscript",
            superscript: "Superscript",
            underline: I18n.t("js.pages.edit.rich_text.underline")
        },
        editor: "Rich Text Editor",
        editorPanel: "Rich Text Editor panel",
        common: {
            editorHelp: "Press ALT 0 for help",
            browseServer: "Browse Server",
            url: "URL",
            protocol: "Protocol",
            upload: "Upload",
            uploadSubmit: "Send it to the Server",
            image: "Image",
            flash: "Flash",
            form: "Form",
            checkbox: "Checkbox",
            radio: "Radio Button",
            textField: "Text Field",
            textarea: "Textarea",
            hiddenField: "Hidden Field",
            button: "Button",
            select: "Selection Field",
            imageButton: "Image Button",
            notSet: "<not set>",
            id: "Id",
            name: "Name",
            langDir: "Language Direction",
            langDirLtr: "Left to Right (LTR)",
            langDirRtl: "Right to Left (RTL)",
            langCode: "Language Code",
            longDescr: "Long Description URL",
            cssClass: "Stylesheet Classes",
            advisoryTitle: "Advisory Title",
            cssStyle: "Style",
            ok: I18n.t("js.pages.edit.rich_text.save"),
            cancel: "Cancel",
            close: "Close",
            preview: "Preview",
            resize: "Resize",
            generalTab: "General",
            advancedTab: "Advanced",
            validateNumberFailed: "This value is not a number.",
            confirmNewPage: "Any unsaved changes to this content will be lost. Are you sure you want to load new page?",
            confirmCancel: I18n.t("js.pages.edit.rich_text.confirm_cancel"),
            options: "Options",
            target: "Target",
            targetNew: "New Window (_blank)",
            targetTop: "Topmost Window (_top)",
            targetSelf: "Same Window (_self)",
            targetParent: "Parent Window (_parent)",
            langDirLTR: "Left to Right (LTR)",
            langDirRTL: "Right to Left (RTL)",
            styles: "Style",
            cssClasses: "Stylesheet Classes",
            width: "Width",
            height: "Height",
            align: "Alignment",
            alignLeft: "Left",
            alignRight: "Right",
            alignCenter: "Center",
            alignJustify: "Justify",
            alignTop: "Top",
            alignMiddle: "Middle",
            alignBottom: "Bottom",
            alignNone: "None",
            invalidValue: "Invalid value.",
            invalidHeight: "Height must be a number.",
            invalidWidth: "Width must be a number.",
            invalidCssLength: 'Value specified for the "%1" field must be a positive number with or without a valid CSS measurement unit (px, %, in, cm, mm, em, ex, pt, or pc).',
            invalidHtmlLength: 'Value specified for the "%1" field must be a positive number with or without a valid HTML measurement unit (px or %).',
            invalidInlineStyle: 'Value specified for the inline style must consist of one or more tuples with the format of "name : value", separated by semi-colons.',
            cssLengthTooltip: "Enter a number for a value in pixels or a number with a valid CSS unit (px, %, in, cm, mm, em, ex, pt, or pc).",
            unavailable: '%1<span class="cke_accessibility">, unavailable</span>'
        },
        colorbutton: {
            custom: I18n.t("js.pages.edit.rich_text.custom"),
            useDefault: I18n.t("js.pages.edit.rich_text.use_default")
        }
    };
