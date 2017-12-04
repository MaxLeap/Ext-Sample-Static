var AppId = "5927d848ea8ac20007fac97d";
var APIKey = "Ni1qREJzeUdUaG5XZVFfWG5SWVhaZw";
var MasterKey = "Z3pJMFVnUmdYWDN0MmhRQ1ptVUxsUQ";
var url_api = "";
(function(f, a, e) {
	var h = f.requestAnimationFrame || f.webkitRequestAnimationFrame || f.mozRequestAnimationFrame || f.oRequestAnimationFrame || f.msRequestAnimationFrame ||
	function(i) {
		f.setTimeout(i, 1000 / 60)
	};
	var c = (function() {
		var m = {};
		var n = a.createElement("div").style;
		var k = (function() {
			var r = ["t", "webkitT", "MozT", "msT", "OT"],
				p, q = 0,
				o = r.length;
			for (; q < o; q++) {
				p = r[q] + "ransform";
				if (p in n) {
					return r[q].substr(0, r[q].length - 1)
				}
			}
			return false
		})();

		function l(o) {
			if (k === false) {
				return false
			}
			if (k === "") {
				return o
			}
			return k + o.charAt(0).toUpperCase() + o.substr(1)
		}
		m.getTime = Date.now ||
		function i() {
			return new Date().getTime()
		};
		m.extend = function(q, p) {
			for (var o in p) {
				q[o] = p[o]
			}
		};
		m.addEvent = function(r, q, p, o) {
			r.addEventListener(q, p, !! o)
		};
		m.removeEvent = function(r, q, p, o) {
			r.removeEventListener(q, p, !! o)
		};
		m.prefixPointerEvent = function(o) {
			return f.MSPointerEvent ? "MSPointer" + o.charAt(7).toUpperCase() + o.substr(8) : o
		};
		m.momentum = function(u, q, r, o, v, w) {
			var p = u - q,
				s = e.abs(p) / r,
				x, t;
			w = w === undefined ? 0.0006 : w;
			x = u + (s * s) / (2 * w) * (p < 0 ? -1 : 1);
			t = s / w;
			if (x < o) {
				x = v ? o - (v / 2.5 * (s / 8)) : o;
				p = e.abs(x - u);
				t = p / s
			} else {
				if (x > 0) {
					x = v ? v / 2.5 * (s / 8) : 0;
					p = e.abs(u) + x;
					t = p / s
				}
			}
			return {
				destination: e.round(x),
				duration: t
			}
		};
		var j = l("transform");
		m.extend(m, {
			hasTransform: j !== false,
			hasPerspective: l("perspective") in n,
			hasTouch: "ontouchstart" in f,
			hasPointer: !! (f.PointerEvent || f.MSPointerEvent),
			hasTransition: l("transition") in n
		});
		m.isBadAndroid = (function() {
			var o = f.navigator.appVersion;
			if (/Android/.test(o) && !(/Chrome\/\d/.test(o))) {
				var p = o.match(/Safari\/(\d+.\d)/);
				if (p && typeof p === "object" && p.length >= 2) {
					return parseFloat(p[1]) < 535.19
				} else {
					return true
				}
			} else {
				return false
			}
		})();
		m.extend(m.style = {}, {
			transform: j,
			transitionTimingFunction: l("transitionTimingFunction"),
			transitionDuration: l("transitionDuration"),
			transitionDelay: l("transitionDelay"),
			transformOrigin: l("transformOrigin"),
			touchAction: l("touchAction")
		});
		m.hasClass = function(p, q) {
			var o = new RegExp("(^|\\s)" + q + "(\\s|$)");
			return o.test(p.className)
		};
		m.addClass = function(p, q) {
			if (m.hasClass(p, q)) {
				return
			}
			var o = p.className.split(" ");
			o.push(q);
			p.className = o.join(" ")
		};
		m.removeClass = function(p, q) {
			if (!m.hasClass(p, q)) {
				return
			}
			var o = new RegExp("(^|\\s)" + q + "(\\s|$)", "g");
			p.className = p.className.replace(o, " ")
		};
		m.offset = function(o) {
			var q = -o.offsetLeft,
				p = -o.offsetTop;
			while (o = o.offsetParent) {
				q -= o.offsetLeft;
				p -= o.offsetTop
			}
			return {
				left: q,
				top: p
			}
		};
		m.preventDefaultException = function(q, p) {
			for (var o in p) {
				if (p[o].test(q[o])) {
					return true
				}
			}
			return false
		};
		m.extend(m.eventType = {}, {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,
			mousedown: 2,
			mousemove: 2,
			mouseup: 2,
			pointerdown: 3,
			pointermove: 3,
			pointerup: 3,
			MSPointerDown: 3,
			MSPointerMove: 3,
			MSPointerUp: 3
		});
		m.extend(m.ease = {}, {
			quadratic: {
				style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				fn: function(o) {
					return o * (2 - o)
				}
			},
			circular: {
				style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
				fn: function(o) {
					return e.sqrt(1 - (--o * o))
				}
			},
			back: {
				style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
				fn: function(p) {
					var o = 4;
					return (p = p - 1) * p * ((o + 1) * p + o) + 1
				}
			},
			bounce: {
				style: "",
				fn: function(o) {
					if ((o /= 1) < (1 / 2.75)) {
						return 7.5625 * o * o
					} else {
						if (o < (2 / 2.75)) {
							return 7.5625 * (o -= (1.5 / 2.75)) * o + 0.75
						} else {
							if (o < (2.5 / 2.75)) {
								return 7.5625 * (o -= (2.25 / 2.75)) * o + 0.9375
							} else {
								return 7.5625 * (o -= (2.625 / 2.75)) * o + 0.984375
							}
						}
					}
				}
			},
			elastic: {
				style: "",
				fn: function(o) {
					var p = 0.22,
						q = 0.4;
					if (o === 0) {
						return 0
					}
					if (o == 1) {
						return 1
					}
					return (q * e.pow(2, -10 * o) * e.sin((o - p / 4) * (2 * e.PI) / p) + 1)
				}
			}
		});
		m.tap = function(q, o) {
			var p = a.createEvent("Event");
			p.initEvent(o, true, true);
			p.pageX = q.pageX;
			p.pageY = q.pageY;
			q.target.dispatchEvent(p)
		};
		m.click = function(q) {
			var p = q.target,
				o;
			if (!(/(SELECT|INPUT|TEXTAREA)/i).test(p.tagName)) {
				o = a.createEvent(f.MouseEvent ? "MouseEvents" : "Event");
				o.initEvent("click", true, true);
				o.view = q.view || f;
				o.detail = 1;
				o.screenX = p.screenX || 0;
				o.screenY = p.screenY || 0;
				o.clientX = p.clientX || 0;
				o.clientY = p.clientY || 0;
				o.ctrlKey = !! q.ctrlKey;
				o.altKey = !! q.altKey;
				o.shiftKey = !! q.shiftKey;
				o.metaKey = !! q.metaKey;
				o.button = 0;
				o.relatedTarget = null;
				o._constructed = true;
				p.dispatchEvent(o)
			}
		};
		m.getTouchAction = function(o, q) {
			var p = "none";
			if (o === "vertical") {
				p = "pan-y"
			} else {
				if (o === "horizontal") {
					p = "pan-x"
				}
			}
			if (q && p != "none") {
				p += " pinch-zoom"
			}
			return p
		};
		m.getRect = function(o) {
			if (o instanceof SVGElement) {
				var p = o.getBoundingClientRect();
				return {
					top: p.top,
					left: p.left,
					width: p.width,
					height: p.height
				}
			} else {
				return {
					top: o.offsetTop,
					left: o.offsetLeft,
					width: o.offsetWidth,
					height: o.offsetHeight
				}
			}
		};
		return m
	})();

	function g(l, j) {
		this.wrapper = typeof l == "string" ? a.querySelector(l) : l;
		this.scroller = this.wrapper.children[0];
		this.scrollerStyle = this.scroller.style;
		this.options = {
			resizeScrollbars: true,
			mouseWheelSpeed: 20,
			snapThreshold: 0.334,
			disablePointer: !c.hasPointer,
			disableTouch: c.hasPointer || !c.hasTouch,
			disableMouse: c.hasPointer || c.hasTouch,
			startX: 0,
			startY: 0,
			scrollY: true,
			directionLockThreshold: 5,
			momentum: true,
			bounce: true,
			bounceTime: 600,
			bounceEasing: "",
			preventDefault: true,
			preventDefaultException: {
				tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
			},
			HWCompositing: true,
			useTransition: true,
			useTransform: true,
			bindToWrapper: typeof f.onmousedown === "undefined"
		};
		for (var k in j) {
			this.options[k] = j[k]
		}
		this.translateZ = this.options.HWCompositing && c.hasPerspective ? " translateZ(0)" : "";
		this.options.useTransition = c.hasTransition && this.options.useTransition;
		this.options.useTransform = c.hasTransform && this.options.useTransform;
		this.options.eventPassthrough = this.options.eventPassthrough === true ? "vertical" : this.options.eventPassthrough;
		this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
		this.options.scrollY = this.options.eventPassthrough == "vertical" ? false : this.options.scrollY;
		this.options.scrollX = this.options.eventPassthrough == "horizontal" ? false : this.options.scrollX;
		this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
		this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
		this.options.bounceEasing = typeof this.options.bounceEasing == "string" ? c.ease[this.options.bounceEasing] || c.ease.circular : this.options.bounceEasing;
		this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
		if (this.options.tap === true) {
			this.options.tap = "tap"
		}
		if (!this.options.useTransition && !this.options.useTransform) {
			if (!(/relative|absolute/i).test(this.scrollerStyle.position)) {
				this.scrollerStyle.position = "relative"
			}
		}
		if (this.options.shrinkScrollbars == "scale") {
			this.options.useTransition = false
		}
		this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
		if (this.options.probeType == 3) {
			this.options.useTransition = false
		}
		this.x = 0;
		this.y = 0;
		this.directionX = 0;
		this.directionY = 0;
		this._events = {};
		this._init();
		this.refresh();
		this.scrollTo(this.options.startX, this.options.startY);
		this.enable()
	}
	g.prototype = {
		version: "5.2.0-snapshot",
		_init: function() {
			this._initEvents();
			if (this.options.scrollbars || this.options.indicators) {
				this._initIndicators()
			}
			if (this.options.mouseWheel) {
				this._initWheel()
			}
			if (this.options.snap) {
				this._initSnap()
			}
			if (this.options.keyBindings) {
				this._initKeys()
			}
		},
		destroy: function() {
			this._initEvents(true);
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = null;
			this._execEvent("destroy")
		},
		_transitionEnd: function(i) {
			if (i.target != this.scroller || !this.isInTransition) {
				return
			}
			this._transitionTime();
			if (!this.resetPosition(this.options.bounceTime)) {
				this.isInTransition = false;
				this._execEvent("scrollEnd")
			}
		},
		_start: function(k) {
			if (c.eventType[k.type] != 1) {
				var j;
				if (!k.which) {
					j = (k.button < 2) ? 0 : ((k.button == 4) ? 1 : 2)
				} else {
					j = k.button
				}
				if (j !== 0) {
					return
				}
			}
			if (!this.enabled || (this.initiated && c.eventType[k.type] !== this.initiated)) {
				return
			}
			if (this.options.preventDefault && !c.isBadAndroid && !c.preventDefaultException(k.target, this.options.preventDefaultException)) {
				k.preventDefault()
			}
			var i = k.touches ? k.touches[0] : k,
				l;
			this.initiated = c.eventType[k.type];
			this.moved = false;
			this.distX = 0;
			this.distY = 0;
			this.directionX = 0;
			this.directionY = 0;
			this.directionLocked = 0;
			this.startTime = c.getTime();
			if (this.options.useTransition && this.isInTransition) {
				this._transitionTime();
				this.isInTransition = false;
				l = this.getComputedPosition();
				this._translate(e.round(l.x), e.round(l.y));
				this._execEvent("scrollEnd")
			} else {
				if (!this.options.useTransition && this.isAnimating) {
					this.isAnimating = false;
					this._execEvent("scrollEnd")
				}
			}
			this.startX = this.x;
			this.startY = this.y;
			this.absStartX = this.x;
			this.absStartY = this.y;
			this.pointX = i.pageX;
			this.pointY = i.pageY;
			this._execEvent("beforeScrollStart")
		},
		_move: function(n) {
			if (!this.enabled || c.eventType[n.type] !== this.initiated) {
				return
			}
			if (this.options.preventDefault) {
				n.preventDefault()
			}
			var p = n.touches ? n.touches[0] : n,
				k = p.pageX - this.pointX,
				j = p.pageY - this.pointY,
				o = c.getTime(),
				i, q, m, l;
			this.pointX = p.pageX;
			this.pointY = p.pageY;
			this.distX += k;
			this.distY += j;
			m = e.abs(this.distX);
			l = e.abs(this.distY);
			if (o - this.endTime > 300 && (m < 10 && l < 10)) {
				return
			}
			if (!this.directionLocked && !this.options.freeScroll) {
				if (m > l + this.options.directionLockThreshold) {
					this.directionLocked = "h"
				} else {
					if (l >= m + this.options.directionLockThreshold) {
						this.directionLocked = "v"
					} else {
						this.directionLocked = "n"
					}
				}
			}
			if (this.directionLocked == "h") {
				if (this.options.eventPassthrough == "vertical") {
					n.preventDefault()
				} else {
					if (this.options.eventPassthrough == "horizontal") {
						this.initiated = false;
						return
					}
				}
				j = 0
			} else {
				if (this.directionLocked == "v") {
					if (this.options.eventPassthrough == "horizontal") {
						n.preventDefault()
					} else {
						if (this.options.eventPassthrough == "vertical") {
							this.initiated = false;
							return
						}
					}
					k = 0
				}
			}
			k = this.hasHorizontalScroll ? k : 0;
			j = this.hasVerticalScroll ? j : 0;
			i = this.x + k;
			q = this.y + j;
			if (i > 0 || i < this.maxScrollX) {
				i = this.options.bounce ? this.x + k / 3 : i > 0 ? 0 : this.maxScrollX
			}
			if (q > 0 || q < this.maxScrollY) {
				q = this.options.bounce ? this.y + j / 3 : q > 0 ? 0 : this.maxScrollY
			}
			this.directionX = k > 0 ? -1 : k < 0 ? 1 : 0;
			this.directionY = j > 0 ? -1 : j < 0 ? 1 : 0;
			if (!this.moved) {
				this._execEvent("scrollStart")
			}
			this.moved = true;
			this._translate(i, q);
			if (o - this.startTime > 300) {
				this.startTime = o;
				this.startX = this.x;
				this.startY = this.y;
				if (this.options.probeType == 1) {
					this._execEvent("scroll")
				}
			}
			if (this.options.probeType > 1) {
				this._execEvent("scroll")
			}
		},
		_end: function(o) {
			if (!this.enabled || c.eventType[o.type] !== this.initiated) {
				return
			}
			if (this.options.preventDefault && !c.preventDefaultException(o.target, this.options.preventDefaultException)) {
				o.preventDefault()
			}
			var q = o.changedTouches ? o.changedTouches[0] : o,
				k, j, n = c.getTime() - this.startTime,
				i = e.round(this.x),
				t = e.round(this.y),
				s = e.abs(i - this.startX),
				r = e.abs(t - this.startY),
				l = 0,
				p = "";
			this.isInTransition = 0;
			this.initiated = 0;
			this.endTime = c.getTime();
			if (this.resetPosition(this.options.bounceTime)) {
				return
			}
			this.scrollTo(i, t);
			if (!this.moved) {
				if (this.options.tap) {
					c.tap(o, this.options.tap)
				}
				if (this.options.click) {
					c.click(o)
				}
				this._execEvent("scrollCancel");
				return
			}
			if (this._events.flick && n < 200 && s < 100 && r < 100) {
				this._execEvent("flick");
				return
			}
			if (this.options.momentum && n < 300) {
				k = this.hasHorizontalScroll ? c.momentum(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
					destination: i,
					duration: 0
				};
				j = this.hasVerticalScroll ? c.momentum(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
					destination: t,
					duration: 0
				};
				i = k.destination;
				t = j.destination;
				l = e.max(k.duration, j.duration);
				this.isInTransition = 1
			}
			if (this.options.snap) {
				var m = this._nearestSnap(i, t);
				this.currentPage = m;
				l = this.options.snapSpeed || e.max(e.max(e.min(e.abs(i - m.x), 1000), e.min(e.abs(t - m.y), 1000)), 300);
				i = m.x;
				t = m.y;
				this.directionX = 0;
				this.directionY = 0;
				p = this.options.bounceEasing
			}
			if (i != this.x || t != this.y) {
				if (i > 0 || i < this.maxScrollX || t > 0 || t < this.maxScrollY) {
					p = c.ease.quadratic
				}
				this.scrollTo(i, t, l, p);
				return
			}
			this._execEvent("scrollEnd")
		},
		_resize: function() {
			var i = this;
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = setTimeout(function() {
				i.refresh()
			}, this.options.resizePolling)
		},
		resetPosition: function(j) {
			var i = this.x,
				k = this.y;
			j = j || 0;
			if (!this.hasHorizontalScroll || this.x > 0) {
				i = 0
			} else {
				if (this.x < this.maxScrollX) {
					i = this.maxScrollX
				}
			}
			if (!this.hasVerticalScroll || this.y > 0) {
				k = 0
			} else {
				if (this.y < this.maxScrollY) {
					k = this.maxScrollY
				}
			}
			if (i == this.x && k == this.y) {
				return false
			}
			this.scrollTo(i, k, j, this.options.bounceEasing);
			return true
		},
		disable: function() {
			this.enabled = false
		},
		enable: function() {
			this.enabled = true
		},
		refresh: function() {
			c.getRect(this.wrapper);
			this.wrapperWidth = this.wrapper.clientWidth;
			this.wrapperHeight = this.wrapper.clientHeight;
			var i = c.getRect(this.scroller);
			this.scrollerWidth = i.width;
			this.scrollerHeight = i.height;
			this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
			this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
			this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
			if (!this.hasHorizontalScroll) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth
			}
			if (!this.hasVerticalScroll) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight
			}
			this.endTime = 0;
			this.directionX = 0;
			this.directionY = 0;
			if (c.hasPointer && !this.options.disablePointer) {
				this.wrapper.style[c.style.touchAction] = c.getTouchAction(this.options.eventPassthrough, true);
				if (!this.wrapper.style[c.style.touchAction]) {
					this.wrapper.style[c.style.touchAction] = c.getTouchAction(this.options.eventPassthrough, false)
				}
			}
			this.wrapperOffset = c.offset(this.wrapper);
			this._execEvent("refresh");
			this.resetPosition()
		},
		on: function(j, i) {
			if (!this._events[j]) {
				this._events[j] = []
			}
			this._events[j].push(i)
		},
		off: function(k, j) {
			if (!this._events[k]) {
				return
			}
			var i = this._events[k].indexOf(j);
			if (i > -1) {
				this._events[k].splice(i, 1)
			}
		},
		_execEvent: function(m) {
			if (!this._events[m]) {
				return
			}
			var k = 0,
				j = this._events[m].length;
			if (!j) {
				return
			}
			for (; k < j; k++) {
				this._events[m][k].apply(this, [].slice.call(arguments, 1))
			}
		},
		scrollBy: function(i, l, j, k) {
			i = this.x + i;
			l = this.y + l;
			j = j || 0;
			this.scrollTo(i, l, j, k)
		},
		scrollTo: function(i, m, k, l) {
			l = l || c.ease.circular;
			this.isInTransition = this.options.useTransition && k > 0;
			var j = this.options.useTransition && l.style;
			if (!k || j) {
				if (j) {
					this._transitionTimingFunction(l.style);
					this._transitionTime(k)
				}
				this._translate(i, m)
			} else {
				this._animate(i, m, k, l.fn)
			}
		},
		scrollToElement: function(k, m, i, p, o) {
			k = k.nodeType ? k : this.scroller.querySelector(k);
			if (!k) {
				return
			}
			var n = c.offset(k);
			n.left -= this.wrapperOffset.left;
			n.top -= this.wrapperOffset.top;
			var j = c.getRect(k);
			var l = c.getRect(this.wrapper);
			if (i === true) {
				i = e.round(j.width / 2 - l.width / 2)
			}
			if (p === true) {
				p = e.round(j.height / 2 - l.height / 2)
			}
			n.left -= i || 0;
			n.top -= p || 0;
			n.left = n.left > 0 ? 0 : n.left < this.maxScrollX ? this.maxScrollX : n.left;
			n.top = n.top > 0 ? 0 : n.top < this.maxScrollY ? this.maxScrollY : n.top;
			m = m === undefined || m === null || m === "auto" ? e.max(e.abs(this.x - n.left), e.abs(this.y - n.top)) : m;
			this.scrollTo(n.left, n.top, m, o)
		},
		_transitionTime: function(m) {
			if (!this.options.useTransition) {
				return
			}
			m = m || 0;
			var j = c.style.transitionDuration;
			if (!j) {
				return
			}
			this.scrollerStyle[j] = m + "ms";
			if (!m && c.isBadAndroid) {
				this.scrollerStyle[j] = "0.0001ms";
				var k = this;
				h(function() {
					if (k.scrollerStyle[j] === "0.0001ms") {
						k.scrollerStyle[j] = "0s"
					}
				})
			}
			if (this.indicators) {
				for (var l = this.indicators.length; l--;) {
					this.indicators[l].transitionTime(m)
				}
			}
		},
		_transitionTimingFunction: function(k) {
			this.scrollerStyle[c.style.transitionTimingFunction] = k;
			if (this.indicators) {
				for (var j = this.indicators.length; j--;) {
					this.indicators[j].transitionTimingFunction(k)
				}
			}
		},
		_translate: function(j, l) {
			if (this.options.useTransform) {
				this.scrollerStyle[c.style.transform] = "translate(" + j + "px," + l + "px)" + this.translateZ
			} else {
				j = e.round(j);
				l = e.round(l);
				this.scrollerStyle.left = j + "px";
				this.scrollerStyle.top = l + "px"
			}
			this.x = j;
			this.y = l;
			if (this.indicators) {
				for (var k = this.indicators.length; k--;) {
					this.indicators[k].updatePosition()
				}
			}
		},
		_initEvents: function(i) {
			var j = i ? c.removeEvent : c.addEvent,
				k = this.options.bindToWrapper ? this.wrapper : f;
			j(f, "orientationchange", this);
			j(f, "resize", this);
			if (this.options.click) {
				j(this.wrapper, "click", this, true)
			}
			if (!this.options.disableMouse) {
				j(this.wrapper, "mousedown", this);
				j(k, "mousemove", this);
				j(k, "mousecancel", this);
				j(k, "mouseup", this)
			}
			if (c.hasPointer && !this.options.disablePointer) {
				j(this.wrapper, c.prefixPointerEvent("pointerdown"), this);
				j(k, c.prefixPointerEvent("pointermove"), this);
				j(k, c.prefixPointerEvent("pointercancel"), this);
				j(k, c.prefixPointerEvent("pointerup"), this)
			}
			if (c.hasTouch && !this.options.disableTouch) {
				j(this.wrapper, "touchstart", this);
				j(k, "touchmove", this);
				j(k, "touchcancel", this);
				j(k, "touchend", this)
			}
			j(this.scroller, "transitionend", this);
			j(this.scroller, "webkitTransitionEnd", this);
			j(this.scroller, "oTransitionEnd", this);
			j(this.scroller, "MSTransitionEnd", this)
		},
		getComputedPosition: function() {
			var j = f.getComputedStyle(this.scroller, null),
				i, k;
			if (this.options.useTransform) {
				j = j[c.style.transform].split(")")[0].split(", ");
				i = +(j[12] || j[4]);
				k = +(j[13] || j[5])
			} else {
				i = +j.left.replace(/[^-\d.]/g, "");
				k = +j.top.replace(/[^-\d.]/g, "")
			}
			return {
				x: i,
				y: k
			}
		},
		_initIndicators: function() {
			var l = this.options.interactiveScrollbars,
				n = typeof this.options.scrollbars != "string",
				p = [],
				k;
			var o = this;
			this.indicators = [];
			if (this.options.scrollbars) {
				if (this.options.scrollY) {
					k = {
						el: d("v", l, this.options.scrollbars),
						interactive: l,
						defaultScrollbars: true,
						customStyle: n,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenX: false
					};
					this.wrapper.appendChild(k.el);
					p.push(k)
				}
				if (this.options.scrollX) {
					k = {
						el: d("h", l, this.options.scrollbars),
						interactive: l,
						defaultScrollbars: true,
						customStyle: n,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenY: false
					};
					this.wrapper.appendChild(k.el);
					p.push(k)
				}
			}
			if (this.options.indicators) {
				p = p.concat(this.options.indicators)
			}
			for (var m = p.length; m--;) {
				this.indicators.push(new b(this, p[m]))
			}
			function j(r) {
				if (o.indicators) {
					for (var q = o.indicators.length; q--;) {
						r.call(o.indicators[q])
					}
				}
			}
			if (this.options.fadeScrollbars) {
				this.on("scrollEnd", function() {
					j(function() {
						this.fade()
					})
				});
				this.on("scrollCancel", function() {
					j(function() {
						this.fade()
					})
				});
				this.on("scrollStart", function() {
					j(function() {
						this.fade(1)
					})
				});
				this.on("beforeScrollStart", function() {
					j(function() {
						this.fade(1, true)
					})
				})
			}
			this.on("refresh", function() {
				j(function() {
					this.refresh()
				})
			});
			this.on("destroy", function() {
				j(function() {
					this.destroy()
				});
				delete this.indicators
			})
		},
		_initWheel: function() {
			c.addEvent(this.wrapper, "wheel", this);
			c.addEvent(this.wrapper, "mousewheel", this);
			c.addEvent(this.wrapper, "DOMMouseScroll", this);
			this.on("destroy", function() {
				clearTimeout(this.wheelTimeout);
				this.wheelTimeout = null;
				c.removeEvent(this.wrapper, "wheel", this);
				c.removeEvent(this.wrapper, "mousewheel", this);
				c.removeEvent(this.wrapper, "DOMMouseScroll", this)
			})
		},
		_wheel: function(m) {
			if (!this.enabled) {
				return
			}
			m.preventDefault();
			var k, j, n, l, i = this;
			if (this.wheelTimeout === undefined) {
				i._execEvent("scrollStart")
			}
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = setTimeout(function() {
				if (!i.options.snap) {
					i._execEvent("scrollEnd")
				}
				i.wheelTimeout = undefined
			}, 400);
			if ("deltaX" in m) {
				if (m.deltaMode === 1) {
					k = -m.deltaX * this.options.mouseWheelSpeed;
					j = -m.deltaY * this.options.mouseWheelSpeed
				} else {
					k = -m.deltaX;
					j = -m.deltaY
				}
			} else {
				if ("wheelDeltaX" in m) {
					k = m.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
					j = m.wheelDeltaY / 120 * this.options.mouseWheelSpeed
				} else {
					if ("wheelDelta" in m) {
						k = j = m.wheelDelta / 120 * this.options.mouseWheelSpeed
					} else {
						if ("detail" in m) {
							k = j = -m.detail / 3 * this.options.mouseWheelSpeed
						} else {
							return
						}
					}
				}
			}
			k *= this.options.invertWheelDirection;
			j *= this.options.invertWheelDirection;
			if (!this.hasVerticalScroll) {
				k = j;
				j = 0
			}
			if (this.options.snap) {
				n = this.currentPage.pageX;
				l = this.currentPage.pageY;
				if (k > 0) {
					n--
				} else {
					if (k < 0) {
						n++
					}
				}
				if (j > 0) {
					l--
				} else {
					if (j < 0) {
						l++
					}
				}
				this.goToPage(n, l);
				return
			}
			n = this.x + e.round(this.hasHorizontalScroll ? k : 0);
			l = this.y + e.round(this.hasVerticalScroll ? j : 0);
			this.directionX = k > 0 ? -1 : k < 0 ? 1 : 0;
			this.directionY = j > 0 ? -1 : j < 0 ? 1 : 0;
			if (n > 0) {
				n = 0
			} else {
				if (n < this.maxScrollX) {
					n = this.maxScrollX
				}
			}
			if (l > 0) {
				l = 0
			} else {
				if (l < this.maxScrollY) {
					l = this.maxScrollY
				}
			}
			this.scrollTo(n, l, 0);
			if (this.options.probeType > 1) {
				this._execEvent("scroll")
			}
		},
		_initSnap: function() {
			this.currentPage = {};
			if (typeof this.options.snap == "string") {
				this.options.snap = this.scroller.querySelectorAll(this.options.snap)
			}
			this.on("refresh", function() {
				var s = 0,
					q, o = 0,
					k, r, p, v = 0,
					u, z = this.options.snapStepX || this.wrapperWidth,
					w = this.options.snapStepY || this.wrapperHeight,
					j, t;
				this.pages = [];
				if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
					return
				}
				if (this.options.snap === true) {
					r = e.round(z / 2);
					p = e.round(w / 2);
					while (v > -this.scrollerWidth) {
						this.pages[s] = [];
						q = 0;
						u = 0;
						while (u > -this.scrollerHeight) {
							this.pages[s][q] = {
								x: e.max(v, this.maxScrollX),
								y: e.max(u, this.maxScrollY),
								width: z,
								height: w,
								cx: v - r,
								cy: u - p
							};
							u -= w;
							q++
						}
						v -= z;
						s++
					}
				} else {
					j = this.options.snap;
					q = j.length;
					k = -1;
					for (; s < q; s++) {
						t = c.getRect(j[s]);
						if (s === 0 || t.left <= c.getRect(j[s - 1]).left) {
							o = 0;
							k++
						}
						if (!this.pages[o]) {
							this.pages[o] = []
						}
						v = e.max(-t.left, this.maxScrollX);
						u = e.max(-t.top, this.maxScrollY);
						r = v - e.round(t.width / 2);
						p = u - e.round(t.height / 2);
						this.pages[o][k] = {
							x: v,
							y: u,
							width: t.width,
							height: t.height,
							cx: r,
							cy: p
						};
						if (v > this.maxScrollX) {
							o++
						}
					}
				}
				this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
				if (this.options.snapThreshold % 1 === 0) {
					this.snapThresholdX = this.options.snapThreshold;
					this.snapThresholdY = this.options.snapThreshold
				} else {
					this.snapThresholdX = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
					this.snapThresholdY = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold)
				}
			});
			this.on("flick", function() {
				var i = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.x - this.startX), 1000), e.min(e.abs(this.y - this.startY), 1000)), 300);
				this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, i)
			})
		},
		_nearestSnap: function(k, p) {
			if (!this.pages.length) {
				return {
					x: 0,
					y: 0,
					pageX: 0,
					pageY: 0
				}
			}
			var o = 0,
				n = this.pages.length,
				j = 0;
			if (e.abs(k - this.absStartX) < this.snapThresholdX && e.abs(p - this.absStartY) < this.snapThresholdY) {
				return this.currentPage
			}
			if (k > 0) {
				k = 0
			} else {
				if (k < this.maxScrollX) {
					k = this.maxScrollX
				}
			}
			if (p > 0) {
				p = 0
			} else {
				if (p < this.maxScrollY) {
					p = this.maxScrollY
				}
			}
			for (; o < n; o++) {
				if (k >= this.pages[o][0].cx) {
					k = this.pages[o][0].x;
					break
				}
			}
			n = this.pages[o].length;
			for (; j < n; j++) {
				if (p >= this.pages[0][j].cy) {
					p = this.pages[0][j].y;
					break
				}
			}
			if (o == this.currentPage.pageX) {
				o += this.directionX;
				if (o < 0) {
					o = 0
				} else {
					if (o >= this.pages.length) {
						o = this.pages.length - 1
					}
				}
				k = this.pages[o][0].x
			}
			if (j == this.currentPage.pageY) {
				j += this.directionY;
				if (j < 0) {
					j = 0
				} else {
					if (j >= this.pages[0].length) {
						j = this.pages[0].length - 1
					}
				}
				p = this.pages[0][j].y
			}
			return {
				x: k,
				y: p,
				pageX: o,
				pageY: j
			}
		},
		goToPage: function(i, n, j, m) {
			m = m || this.options.bounceEasing;
			if (i >= this.pages.length) {
				i = this.pages.length - 1
			} else {
				if (i < 0) {
					i = 0
				}
			}
			if (n >= this.pages[i].length) {
				n = this.pages[i].length - 1
			} else {
				if (n < 0) {
					n = 0
				}
			}
			var l = this.pages[i][n].x,
				k = this.pages[i][n].y;
			j = j === undefined ? this.options.snapSpeed || e.max(e.max(e.min(e.abs(l - this.x), 1000), e.min(e.abs(k - this.y), 1000)), 300) : j;
			this.currentPage = {
				x: l,
				y: k,
				pageX: i,
				pageY: n
			};
			this.scrollTo(l, k, j, m)
		},
		next: function(j, l) {
			var i = this.currentPage.pageX,
				k = this.currentPage.pageY;
			i++;
			if (i >= this.pages.length && this.hasVerticalScroll) {
				i = 0;
				k++
			}
			this.goToPage(i, k, j, l)
		},
		prev: function(j, l) {
			var i = this.currentPage.pageX,
				k = this.currentPage.pageY;
			i--;
			if (i < 0 && this.hasVerticalScroll) {
				i = 0;
				k--
			}
			this.goToPage(i, k, j, l)
		},
		_initKeys: function(l) {
			var k = {
				pageUp: 33,
				pageDown: 34,
				end: 35,
				home: 36,
				left: 37,
				up: 38,
				right: 39,
				down: 40
			};
			var j;
			if (typeof this.options.keyBindings == "object") {
				for (j in this.options.keyBindings) {
					if (typeof this.options.keyBindings[j] == "string") {
						this.options.keyBindings[j] = this.options.keyBindings[j].toUpperCase().charCodeAt(0)
					}
				}
			} else {
				this.options.keyBindings = {}
			}
			for (j in k) {
				this.options.keyBindings[j] = this.options.keyBindings[j] || k[j]
			}
			c.addEvent(f, "keydown", this);
			this.on("destroy", function() {
				c.removeEvent(f, "keydown", this)
			})
		},
		_key: function(n) {
			if (!this.enabled) {
				return
			}
			var i = this.options.snap,
				o = i ? this.currentPage.pageX : this.x,
				m = i ? this.currentPage.pageY : this.y,
				k = c.getTime(),
				j = this.keyTime || 0,
				l = 0.25,
				p;
			if (this.options.useTransition && this.isInTransition) {
				p = this.getComputedPosition();
				this._translate(e.round(p.x), e.round(p.y));
				this.isInTransition = false
			}
			this.keyAcceleration = k - j < 200 ? e.min(this.keyAcceleration + l, 50) : 0;
			switch (n.keyCode) {
			case this.options.keyBindings.pageUp:
				if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
					o += i ? 1 : this.wrapperWidth
				} else {
					m += i ? 1 : this.wrapperHeight
				}
				break;
			case this.options.keyBindings.pageDown:
				if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
					o -= i ? 1 : this.wrapperWidth
				} else {
					m -= i ? 1 : this.wrapperHeight
				}
				break;
			case this.options.keyBindings.end:
				o = i ? this.pages.length - 1 : this.maxScrollX;
				m = i ? this.pages[0].length - 1 : this.maxScrollY;
				break;
			case this.options.keyBindings.home:
				o = 0;
				m = 0;
				break;
			case this.options.keyBindings.left:
				o += i ? -1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.up:
				m += i ? 1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.right:
				o -= i ? -1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.down:
				m -= i ? 1 : 5 + this.keyAcceleration >> 0;
				break;
			default:
				return
			}
			if (i) {
				this.goToPage(o, m);
				return
			}
			if (o > 0) {
				o = 0;
				this.keyAcceleration = 0
			} else {
				if (o < this.maxScrollX) {
					o = this.maxScrollX;
					this.keyAcceleration = 0
				}
			}
			if (m > 0) {
				m = 0;
				this.keyAcceleration = 0
			} else {
				if (m < this.maxScrollY) {
					m = this.maxScrollY;
					this.keyAcceleration = 0
				}
			}
			this.scrollTo(o, m, 0);
			this.keyTime = k
		},
		_animate: function(r, q, l, i) {
			var o = this,
				n = this.x,
				m = this.y,
				j = c.getTime(),
				p = j + l;

			function k() {
				var s = c.getTime(),
					u, t, v;
				if (s >= p) {
					o.isAnimating = false;
					o._translate(r, q);
					if (!o.resetPosition(o.options.bounceTime)) {
						o._execEvent("scrollEnd")
					}
					return
				}
				s = (s - j) / l;
				v = i(s);
				u = (r - n) * v + n;
				t = (q - m) * v + m;
				o._translate(u, t);
				if (o.isAnimating) {
					h(k)
				}
				if (o.options.probeType == 3) {
					o._execEvent("scroll")
				}
			}
			this.isAnimating = true;
			k()
		},
		handleEvent: function(i) {
			switch (i.type) {
			case "touchstart":
			case "pointerdown":
			case "MSPointerDown":
			case "mousedown":
				this._start(i);
				break;
			case "touchmove":
			case "pointermove":
			case "MSPointerMove":
			case "mousemove":
				this._move(i);
				break;
			case "touchend":
			case "pointerup":
			case "MSPointerUp":
			case "mouseup":
			case "touchcancel":
			case "pointercancel":
			case "MSPointerCancel":
			case "mousecancel":
				this._end(i);
				break;
			case "orientationchange":
			case "resize":
				this._resize();
				break;
			case "transitionend":
			case "webkitTransitionEnd":
			case "oTransitionEnd":
			case "MSTransitionEnd":
				this._transitionEnd(i);
				break;
			case "wheel":
			case "DOMMouseScroll":
			case "mousewheel":
				this._wheel(i);
				break;
			case "keydown":
				this._key(i);
				break;
			case "click":
				if (this.enabled && !i._constructed) {
					i.preventDefault();
					i.stopPropagation()
				}
				break
			}
		}
	};

	function d(l, j, k) {
		var m = a.createElement("div"),
			i = a.createElement("div");
		if (k === true) {
			m.style.cssText = "position:absolute;z-index:9999";
			i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"
		}
		i.className = "iScrollIndicator";
		if (l == "h") {
			if (k === true) {
				m.style.cssText += ";height:7px;left:2px;right:2px;bottom:0";
				i.style.height = "100%"
			}
			m.className = "iScrollHorizontalScrollbar"
		} else {
			if (k === true) {
				m.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px";
				i.style.width = "100%"
			}
			m.className = "iScrollVerticalScrollbar"
		}
		m.style.cssText += ";overflow:hidden";
		if (!j) {
			m.style.pointerEvents = "none"
		}
		m.appendChild(i);
		return m
	}
	function b(j, m) {
		this.wrapper = typeof m.el == "string" ? a.querySelector(m.el) : m.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = j;
		this.options = {
			listenX: true,
			listenY: true,
			interactive: false,
			resize: true,
			defaultScrollbars: false,
			shrink: false,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		};
		for (var n in m) {
			this.options[n] = m[n]
		}
		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;
		if (this.options.interactive) {
			if (!this.options.disableTouch) {
				c.addEvent(this.indicator, "touchstart", this);
				c.addEvent(f, "touchend", this)
			}
			if (!this.options.disablePointer) {
				c.addEvent(this.indicator, c.prefixPointerEvent("pointerdown"), this);
				c.addEvent(f, c.prefixPointerEvent("pointerup"), this)
			}
			if (!this.options.disableMouse) {
				c.addEvent(this.indicator, "mousedown", this);
				c.addEvent(f, "mouseup", this)
			}
		}
		if (this.options.fade) {
			this.wrapperStyle[c.style.transform] = this.scroller.translateZ;
			var k = c.style.transitionDuration;
			if (!k) {
				return
			}
			this.wrapperStyle[k] = c.isBadAndroid ? "0.0001ms" : "0ms";
			var l = this;
			if (c.isBadAndroid) {
				h(function() {
					if (l.wrapperStyle[k] === "0.0001ms") {
						l.wrapperStyle[k] = "0s"
					}
				})
			}
			this.wrapperStyle.opacity = "0"
		}
	}
	b.prototype = {
		handleEvent: function(i) {
			switch (i.type) {
			case "touchstart":
			case "pointerdown":
			case "MSPointerDown":
			case "mousedown":
				this._start(i);
				break;
			case "touchmove":
			case "pointermove":
			case "MSPointerMove":
			case "mousemove":
				this._move(i);
				break;
			case "touchend":
			case "pointerup":
			case "MSPointerUp":
			case "mouseup":
			case "touchcancel":
			case "pointercancel":
			case "MSPointerCancel":
			case "mousecancel":
				this._end(i);
				break
			}
		},
		destroy: function() {
			if (this.options.fadeScrollbars) {
				clearTimeout(this.fadeTimeout);
				this.fadeTimeout = null
			}
			if (this.options.interactive) {
				c.removeEvent(this.indicator, "touchstart", this);
				c.removeEvent(this.indicator, c.prefixPointerEvent("pointerdown"), this);
				c.removeEvent(this.indicator, "mousedown", this);
				c.removeEvent(f, "touchmove", this);
				c.removeEvent(f, c.prefixPointerEvent("pointermove"), this);
				c.removeEvent(f, "mousemove", this);
				c.removeEvent(f, "touchend", this);
				c.removeEvent(f, c.prefixPointerEvent("pointerup"), this);
				c.removeEvent(f, "mouseup", this)
			}
			if (this.options.defaultScrollbars && this.wrapper.parentNode) {
				this.wrapper.parentNode.removeChild(this.wrapper)
			}
		},
		_start: function(j) {
			var i = j.touches ? j.touches[0] : j;
			j.preventDefault();
			j.stopPropagation();
			this.transitionTime();
			this.initiated = true;
			this.moved = false;
			this.lastPointX = i.pageX;
			this.lastPointY = i.pageY;
			this.startTime = c.getTime();
			if (!this.options.disableTouch) {
				c.addEvent(f, "touchmove", this)
			}
			if (!this.options.disablePointer) {
				c.addEvent(f, c.prefixPointerEvent("pointermove"), this)
			}
			if (!this.options.disableMouse) {
				c.addEvent(f, "mousemove", this)
			}
			this.scroller._execEvent("beforeScrollStart")
		},
		_move: function(n) {
			var j = n.touches ? n.touches[0] : n,
				k, i, o, m, l = c.getTime();
			if (!this.moved) {
				this.scroller._execEvent("scrollStart")
			}
			this.moved = true;
			k = j.pageX - this.lastPointX;
			this.lastPointX = j.pageX;
			i = j.pageY - this.lastPointY;
			this.lastPointY = j.pageY;
			o = this.x + k;
			m = this.y + i;
			this._pos(o, m);
			if (this.scroller.options.probeType == 1 && l - this.startTime > 300) {
				this.startTime = l;
				this.scroller._execEvent("scroll")
			} else {
				if (this.scroller.options.probeType > 1) {
					this.scroller._execEvent("scroll")
				}
			}
			n.preventDefault();
			n.stopPropagation()
		},
		_end: function(k) {
			if (!this.initiated) {
				return
			}
			this.initiated = false;
			k.preventDefault();
			k.stopPropagation();
			c.removeEvent(f, "touchmove", this);
			c.removeEvent(f, c.prefixPointerEvent("pointermove"), this);
			c.removeEvent(f, "mousemove", this);
			if (this.scroller.options.snap) {
				var i = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);
				var j = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.scroller.x - i.x), 1000), e.min(e.abs(this.scroller.y - i.y), 1000)), 300);
				if (this.scroller.x != i.x || this.scroller.y != i.y) {
					this.scroller.directionX = 0;
					this.scroller.directionY = 0;
					this.scroller.currentPage = i;
					this.scroller.scrollTo(i.x, i.y, j, this.scroller.options.bounceEasing)
				}
			}
			if (this.moved) {
				this.scroller._execEvent("scrollEnd")
			}
		},
		transitionTime: function(k) {
			k = k || 0;
			var i = c.style.transitionDuration;
			if (!i) {
				return
			}
			this.indicatorStyle[i] = k + "ms";
			if (!k && c.isBadAndroid) {
				this.indicatorStyle[i] = "0.0001ms";
				var j = this;
				h(function() {
					if (j.indicatorStyle[i] === "0.0001ms") {
						j.indicatorStyle[i] = "0s"
					}
				})
			}
		},
		transitionTimingFunction: function(i) {
			this.indicatorStyle[c.style.transitionTimingFunction] = i
		},
		refresh: function() {
			this.transitionTime();
			if (this.options.listenX && !this.options.listenY) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none"
			} else {
				if (this.options.listenY && !this.options.listenX) {
					this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none"
				} else {
					this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none"
				}
			}
			if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
				c.addClass(this.wrapper, "iScrollBothScrollbars");
				c.removeClass(this.wrapper, "iScrollLoneScrollbar");
				if (this.options.defaultScrollbars && this.options.customStyle) {
					if (this.options.listenX) {
						this.wrapper.style.right = "8px"
					} else {
						this.wrapper.style.bottom = "8px"
					}
				}
			} else {
				c.removeClass(this.wrapper, "iScrollBothScrollbars");
				c.addClass(this.wrapper, "iScrollLoneScrollbar");
				if (this.options.defaultScrollbars && this.options.customStyle) {
					if (this.options.listenX) {
						this.wrapper.style.right = "2px"
					} else {
						this.wrapper.style.bottom = "2px"
					}
				}
			}
			c.getRect(this.wrapper);
			if (this.options.listenX) {
				this.wrapperWidth = this.wrapper.clientWidth;
				if (this.options.resize) {
					this.indicatorWidth = e.max(e.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
					this.indicatorStyle.width = this.indicatorWidth + "px"
				} else {
					this.indicatorWidth = this.indicator.clientWidth
				}
				this.maxPosX = this.wrapperWidth - this.indicatorWidth;
				if (this.options.shrink == "clip") {
					this.minBoundaryX = -this.indicatorWidth + 8;
					this.maxBoundaryX = this.wrapperWidth - 8
				} else {
					this.minBoundaryX = 0;
					this.maxBoundaryX = this.maxPosX
				}
				this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX))
			}
			if (this.options.listenY) {
				this.wrapperHeight = this.wrapper.clientHeight;
				if (this.options.resize) {
					this.indicatorHeight = e.max(e.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
					this.indicatorStyle.height = this.indicatorHeight + "px"
				} else {
					this.indicatorHeight = this.indicator.clientHeight
				}
				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				if (this.options.shrink == "clip") {
					this.minBoundaryY = -this.indicatorHeight + 8;
					this.maxBoundaryY = this.wrapperHeight - 8
				} else {
					this.minBoundaryY = 0;
					this.maxBoundaryY = this.maxPosY
				}
				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY))
			}
			this.updatePosition()
		},
		updatePosition: function() {
			var i = this.options.listenX && e.round(this.sizeRatioX * this.scroller.x) || 0,
				j = this.options.listenY && e.round(this.sizeRatioY * this.scroller.y) || 0;
			if (!this.options.ignoreBoundaries) {
				if (i < this.minBoundaryX) {
					if (this.options.shrink == "scale") {
						this.width = e.max(this.indicatorWidth + i, 8);
						this.indicatorStyle.width = this.width + "px"
					}
					i = this.minBoundaryX
				} else {
					if (i > this.maxBoundaryX) {
						if (this.options.shrink == "scale") {
							this.width = e.max(this.indicatorWidth - (i - this.maxPosX), 8);
							this.indicatorStyle.width = this.width + "px";
							i = this.maxPosX + this.indicatorWidth - this.width
						} else {
							i = this.maxBoundaryX
						}
					} else {
						if (this.options.shrink == "scale" && this.width != this.indicatorWidth) {
							this.width = this.indicatorWidth;
							this.indicatorStyle.width = this.width + "px"
						}
					}
				}
				if (j < this.minBoundaryY) {
					if (this.options.shrink == "scale") {
						this.height = e.max(this.indicatorHeight + j * 3, 8);
						this.indicatorStyle.height = this.height + "px"
					}
					j = this.minBoundaryY
				} else {
					if (j > this.maxBoundaryY) {
						if (this.options.shrink == "scale") {
							this.height = e.max(this.indicatorHeight - (j - this.maxPosY) * 3, 8);
							this.indicatorStyle.height = this.height + "px";
							j = this.maxPosY + this.indicatorHeight - this.height
						} else {
							j = this.maxBoundaryY
						}
					} else {
						if (this.options.shrink == "scale" && this.height != this.indicatorHeight) {
							this.height = this.indicatorHeight;
							this.indicatorStyle.height = this.height + "px"
						}
					}
				}
			}
			this.x = i;
			this.y = j;
			if (this.scroller.options.useTransform) {
				this.indicatorStyle[c.style.transform] = "translate(" + i + "px," + j + "px)" + this.scroller.translateZ
			} else {
				this.indicatorStyle.left = i + "px";
				this.indicatorStyle.top = j + "px"
			}
		},
		_pos: function(i, j) {
			if (i < 0) {
				i = 0
			} else {
				if (i > this.maxPosX) {
					i = this.maxPosX
				}
			}
			if (j < 0) {
				j = 0
			} else {
				if (j > this.maxPosY) {
					j = this.maxPosY
				}
			}
			i = this.options.listenX ? e.round(i / this.sizeRatioX) : this.scroller.x;
			j = this.options.listenY ? e.round(j / this.sizeRatioY) : this.scroller.y;
			this.scroller.scrollTo(i, j)
		},
		fade: function(l, k) {
			if (k && !this.visible) {
				return
			}
			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;
			var j = l ? 250 : 500,
				i = l ? 0 : 300;
			l = l ? "1" : "0";
			this.wrapperStyle[c.style.transitionDuration] = j + "ms";
			this.fadeTimeout = setTimeout((function(m) {
				this.wrapperStyle.opacity = m;
				this.visible = +m
			}).bind(this, l), i)
		}
	};
	g.utils = c;
	if (typeof module != "undefined" && module.exports) {
		module.exports = g
	} else {
		if (typeof define == "function" && define.amd) {
			define(function() {
				return g
			})
		} else {
			f.IScroll = g
		}
	}
})(window, document, Math);
(function() {
	window.$clamp = function(Q, P) {
		function D(d, c) {
			H.getComputedStyle || (H.getComputedStyle = function(f, e) {
				this.el = f;
				this.getPropertyValue = function(g) {
					var h = /(\-([a-z]){1})/g;
					"float" == g && (g = "styleFloat");
					h.test(g) && (g = g.replace(h, function(l, k, m) {
						return m.toUpperCase()
					}));
					return f.currentStyle && f.currentStyle[g] ? f.currentStyle[g] : null
				};
				return this
			});
			return H.getComputedStyle(d, null).getPropertyValue(c)
		}
		function C(d) {
			d = d || Q.clientHeight;
			var c = B(Q);
			return Math.max(Math.floor(d / c), 0)
		}
		function j(b) {
			return B(Q) * b
		}
		function B(d) {
			var c = D(d, "line-height");
			"normal" == c && (c = 1.2 * parseInt(D(d, "font-size")));
			return parseInt(c)
		}
		function J(b) {
			if (b.lastChild.children && 0 < b.lastChild.children.length) {
				return J(Array.prototype.slice.call(b.children).pop())
			}
			if (b.lastChild && b.lastChild.nodeValue && "" != b.lastChild.nodeValue && b.lastChild.nodeValue != R.truncationChar) {
				return b.lastChild
			}
			b.lastChild.parentNode.removeChild(b.lastChild);
			return J(Q)
		}
		function G(b, f) {
			if (f) {
				var c = b.nodeValue.replace(R.truncationChar, "");
				N || (L = 0 < K.length ? K.shift() : "", N = c.split(L));
				1 < N.length ? (F = N.pop(), E(b, N.join(L))) : N = null;
				I && (b.nodeValue = b.nodeValue.replace(R.truncationChar, ""), Q.innerHTML = b.nodeValue + " " + I.innerHTML + R.truncationChar);
				if (N) {
					if (Q.clientHeight <= f) {
						if (0 <= K.length && "" != L) {
							E(b, N.join(L) + L + F), N = null
						} else {
							return Q.innerHTML
						}
					}
				} else {
					"" == L && (E(b, ""), b = J(Q), K = R.splitOnChars.slice(0), L = K[0], F = N = null)
				}
				if (R.animate) {
					setTimeout(function() {
						G(b, f)
					}, !0 === R.animate ? 10 : R.animate)
				} else {
					return G(b, f)
				}
			}
		}
		function E(b, d) {
			b.nodeValue = d + R.truncationChar
		}
		P = P || {};
		var H = window,
			R = {
				clamp: P.clamp || 2,
				useNativeClamp: "undefined" != typeof P.useNativeClamp ? P.useNativeClamp : !0,
				splitOnChars: P.splitOnChars || [".", "-", "–", "—", " "],
				animate: P.animate || !1,
				truncationChar: P.truncationChar || "…",
				truncationHTML: P.truncationHTML
			},
			O = Q.style,
			i = Q.innerHTML,
			a = "undefined" != typeof Q.style.webkitLineClamp,
			M = R.clamp,
			A = M.indexOf && (-1 < M.indexOf("px") || -1 < M.indexOf("em")),
			I;
		R.truncationHTML && (I = document.createElement("span"), I.innerHTML = R.truncationHTML);
		var K = R.splitOnChars.slice(0),
			L = K[0],
			N, F;
		"auto" == M ? M = C() : A && (M = C(parseInt(M)));
		var o;
		a && R.useNativeClamp ? (O.overflow = "hidden", O.textOverflow = "ellipsis", O.webkitBoxOrient = "vertical", O.display = "-webkit-box", O.webkitLineClamp = M, A && (O.height = R.clamp + "px")) : (O = j(M), O <= Q.clientHeight && (o = G(J(Q), O)));
		return {
			original: i,
			clamped: o
		}
	}
})();
$(document).ready(function() {
	var B = l("platform");
	var h = B == "ios" || B == "android";
	if (h) {
		url_api = "https://www.maxwon.cn/"
	} else {
		url_api = "https://m.inthousand.com/maxh5/";
		var f = new Object();
		f.img0 = "data:image/png;base64,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";
		f.img1 = "data:image/png;base64,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";
		f.img2 = "data:image/png;base64,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";
		f.img3 = "data:image/png;base64,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";
		f.img4 = "data:image/png;base64,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";
		var o = "home,pcategory,member,forum,more";
		var v = document.getElementById("divBottom");
		var n = "<table width='100%' height='45' border='0' cellspacing='0' cellpadding='0'><tbody><tr>";
		var e = o.split(",");
		for (var x = 0; x < e.length; x++) {
			n += "<td align='center'><a href='" + (x == 0 ? "" : url_api + e[x]) + "'><img src='" + f["img" + x] + "' height='40' width='40' alt='' style='padding-top:1px'/></a></td>"
		}
		n += "</tr></tbody></table>";
		v.innerHTML = n;
		v.style.display = "";
		$("#wrapper").css("bottom", "45px")
	}
	function l(D) {
		console.log("getQueryString window.location:", window.location);
		D = D.toLowerCase();
		var E = window.location.search.toLowerCase();
		var F = new RegExp("(^|&)" + D + "=([^&]*)(&|$)", "i");
		var i = E.substr(1).match(F);
		console.log("====> getQueryString name:", D, "result:", i);
		if (i != null) {
			return unescape(i[2])
		}
		return null
	}
	winw = $(window).width();
	document.getElementById("header").getElementsByTagName("td")[0].width = "40";
	document.getElementById("header").getElementsByTagName("td")[0].align = "right";
	document.getElementById("header").getElementsByTagName("td")[1].width = "";
	document.getElementById("header").getElementsByTagName("td")[1].align = "center";
	document.getElementById("header").getElementsByTagName("td")[2].align = "left";
	document.getElementById("header").getElementsByTagName("td")[0].innerHTML = "<a href='" + url_api + "product/search'><img height='30' width='30' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsSAAALEgHS3X78AAABTUlEQVRYw+2Y0W2DMBCGP6K8xxu0IzACI3SDMArdIBNUZIOMwAjpY9/oBu5jn64vh2QhVY3POKTIJ1kC5LN/f4a7w5WI8Mi248GtCCwCi8D/LnCf6O+ABqhnz6/AAPhkhSJiaU5EOhHx8rt57eOMcyAiVIZMUgMX4An4AvoZrYlqCxyAT+BFqWYnWAfU+j/oOO0z0awtBGO3ddQJ2wi/Vn1Gy3bHdO4CcrEkJpJdrnfQAaNePxu+TrP/rXGw0Re+N4YOr74HHWvxQD3FuSEhog2zsRYV6AISVvObTHW7yNW7xLSYTeA1+Fis1szGusk2E2Y8cNIwcTLQC33jFrelVJdSLHyLyIdF4L3KrTfgFXiPDdT3LFh7S7FRJR59xJb8PXAEzko4G8GUFkVyv0L2msgdZ/dZ/uqyi1xLYCjKLZHqyslCEVgEFoFF4Er2AwIFMj+cPNaZAAAAAElFTkSuQmCC'></a>";
	document.getElementById("header").getElementsByTagName("td")[1].innerHTML = "<span style='font-size:14px;color:#fff'>在千商城</span>";
	document.getElementById("header").getElementsByTagName("td")[2].innerHTML = "<a href='" + url_api + "pcart'><img height='30' width='30' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsSAAALEgHS3X78AAABZ0lEQVRYw+1YwW2EMBAcovyhBDo4dxBKoIM4HVwJV8KVQDpIOrjrgHRACXSweWQtIRSdd/FaoJNXskAImWE84x2oiAhHrhccvArAArAAjNTrP9euANzqWndUBhsAbwDa3Sgkokejo7/qI/dlGzEGb3x0exFYCVrdCGDmYy6gHsC01cU5gTke01YNgojOrMPWWF8NzzukaDAwmEOHYev6St2ocxmlX82f1El+MmzWPYBvNmAyQGujOAB1jD0twNqwo3iJ/rQALXXYsWwmK4CWRmkBnCTLq41bVkYJ7h2sWh0WE/accLZWw8s6S/WsYTDVKC0va70wyabAKjHKxA/0CnDvfP4h1Z+0Fy8HEdF1lRUlNXPPddqeXSn/LNyYwW7B6O55cN0Bgo7uRhjOj15W+1UXWt7nkRJ1jFHPLEjb26B6QmLgnNkEF2HoJa1RUlOxJ6KRwcZeZoylZwsXl18fBWABWAA+G8BfdDKxo5QJVD4AAAAASUVORK5CYII='></a>";
	var s = "<div id='scrollerPullDown' style='background-color:#fff; display:none'>松开后刷新</div>";
	var z = "<div id='wrapper_b'><div><table border='0' cellpadding='0' cellspacing='0' style='line-height:0'><tr></tr></table></div></div><div id='indicator'><div id='dotty'></div></div>";
	var k = "<table cellspacing='0' cellpadding='0' width='100%' height='40' style='line-height:0'><tr><td id='tdService' align='center' style='font-size: 12px; border-bottom: 6px solid #f7f7f7'></td></tr></table>";
	var j = "<table class ='responsive-table' width='100%' height='80px' border='0' cellspacing='0' cellpadding='0' align='left' style='padding-top:20px; margin: 0px 0px 0px 0px; background-color:#fff'><tbody><tr><td id='smlBtn' style='padding-bottom:0px; padding-left:10px; padding-right:10px'></td></tr></tbody></table>";
	var d = "<table width=100% height='50' border='0' cellspacing='0' cellpadding='0'><tr><td bgcolor='#f7f7f7' align='center'><table width=95% height='32' border='0' cellspacing='0' cellpadding='0' style='padding-top:8;border-radius:20px;background-color:#fff;font-size:13px;color:#000'><tr><td><table width=100% height='32' border='0' cellspacing='0' cellpadding='0'><tr><td width='45px' style='padding-left:5px'><a href='" + url_api + "article_m1'><img width='30px' height='30px' style='padding-left:10px;padding-top:3px' src='data:image/png;base64,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'></a></td><td style='padding-right:10px'><div id='divInformation'><div></div></div></td></tr></table></td></tr></table></td></tr></table>";
	var C = "<table width=100% border='0' cellspacing='0' cellpadding='0'><tr><td id='banner_center' align='center' style='padding-bottom:8px'></td></tr></table>";
	var w = "<table id='listPrd' width='100%' border='0' cellspacing='0' cellpadding='0' style='padding-bottom:2px'><tbody><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr></tbody></table>";
	var g = "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td id='listCont' style='padding-bottom:6px'></td></tr></tbody></table>";
	var A = "<div id='scrollerPullUp' style='background-color:#fff; display:none'></div>";
	document.getElementById("scroller").innerHTML = s + z + k + j + d + C + w + g + A;
	var t, r;
	var c = false;
	var q = document.getElementById("scrollerPullDown");
	var m = document.getElementById("scrollerPullUp");
	var b = new IScroll("#wrapper", {
		momentum: true,
		bounceTime: 300,
		deceleration: 0.0008,
		probeType: 2,
		scrollbars: true,
		click: true,
		shrinkScrollbars: "clip",
		fadeScrollbars: true
	});
	b.on("scroll", a);
	b.on("scrollEnd", u);
	b.on("scrollStart", p);

	function p() {
		c = true
	}
	function a() {
		if ((this.y >> 0) > 80) {
			q.style.display = "";
			t = 1
		}
		if ((this.y >> 0) < (this.maxScrollY - 60)) {
			r = 1
		}
		if (this.y < -800) {
			$("#gotop").show()
		}
		if (this.y > -800) {
			$("#gotop").hide()
		}
		if (this.y > 0 && (this.pointY > window.innerHeight - 1) && c) {
			c = false;
			this.scrollTo(0, 0, 300)
		}
	}
	function u() {
		if (t == 1) {
			t = 0;
			q.style.display = "none";
			toContent(b)
		}
		if (r == 1) {
			r = 0
		}
	}
	$("#gotop").click(function() {
		b.scrollTo(0, 0, 400)
	});
	$("#wrapper_b").css({
		"width": winw + "px",
		"height": winw / 2 + "px",
		"background-color": "#fff"
	});

	function y() {
		var i = false;
		try {
			addEventListener("test", null, Object.defineProperty({}, "passive", {
				get: function() {
					i = true
				}
			}))
		} catch (D) {}
		return i
	}
	document.addEventListener("touchmove", function(i) {
		i.preventDefault()
	}, y() ? {
		capture: false,
		passive: false
	} : false);
	toContent(b)
});
var tTimeB, tSS, tRef;

function toContent(q) {
	console.log("==========begin");
	$.ajax({
		type: "get",
		url: "https://wonapi.maxleap.cn/1.0/banner/getBanner?where=%7B%22status%22%3A1%2C%22type%22%3A1%7D",
		dataType: "json",
		headers: {
			"X-ML-AppId": AppId,
			"X-ML-APIKey": APIKey
		},
		success: function(c) {
			var d = "";
			var e = 0;
			var f = "";
			var g = eval(c);
			var h = "";
			var i = "";
			var j = (parseInt($("#indicator").css("width")) - parseInt($("#indicator").css("height"))) / (g.sort().length - 1);
			$.each(g.sort(), function(a, b) {
				switch (b.bannerTypes) {
				case 1:
					f = url_api + "product/category/" + b.category.id;
					break;
				case 2:
					f = url_api + "product/" + b.product.id;
					break;
				case 3:
					f = b.custom.urlStr;
					break;
				default:
					break
				}
				d += "<td width='" + winw + "px'><a href='" + f + "'><img width='100%' src='" + b.bannerImageUrl + "'></a></td>";
				i += (i === "" ? "" : ",") + j * e + "px 0px";
				h += (h === "" ? "" : ",") + "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAq0lEQVQ4y9WVIRLCMBBFX1chI5E9RmUlx+jRegwkMseoXFlZF8ymw5QApdlhhmczeZP5yf40KSUKBKADWuC8WVNgAiIwbzc2BeHFZHuIwPWV8AQMhRN9QoERWACkUobtGcyxCvuDskdpn4Xhi8ze0QFBnGSrVOxpeNFKZXZPWQrO/IdQHX0qNuheTGID7kUUqyAPaQTmfCm3yiw111gWLlZBelA2/qRgXb6AO9gbMRUJ8W1MAAAAAElFTkSuQmCC)";
				e++
			});
			$("#indicator").css({
				"background-image": h,
				"background-position": i,
				"left": (winw - parseInt($("#indicator").css("width"))) / 2 + "px",
				"top": (winw / 2 - 20) + "px"
			});
			document.getElementById("wrapper_b").getElementsByTagName("tr")[0].innerHTML = d;
			$("#wrapper_b").children().css("width", parseInt(e * winw) + "px");
			var k = 0;
			var l = new IScroll("#wrapper_b", {
				scrollX: true,
				scrollY: false,
				momentum: false,
				click: false,
				snap: true,
				snapSpeed: 400,
				keyBindings: true,
				indicators: {
					el: document.getElementById("indicator"),
					resize: false
				}
			});
			l.on("scrollEnd", msBEnd);
			l.on("beforeScrollStart", msBStart);
			msBGo();

			function msBGo() {
				if (k >= (e - 1)) {
					l.goToPage(0, 0, 300)
				} else {
					l.next()
				}
			}
			function msBEnd() {
				k = l.currentPage.pageX;
				clearTimeout(tTimeB);
				tTimeB = setTimeout(msBGo, 5000)
			}
			function msBStart() {}
		}
	});
	$.ajax({
		type: "get",
		url: "https://wonapi.maxleap.cn/1.0/cms/59967e2414f6450007c4a0d1",
		dataType: "json",
		headers: {
			"X-ML-AppId": AppId,
			"X-ML-APIKey": APIKey
		},
		success: function(a) {
			var b = eval(a);
			var c = b.content.toString();
			var d = c.split("<p>")[1].split("</p>")[0];
			document.getElementById("tdService").innerHTML = d
		}
	});
	$.ajax({
		type: "get",
		url: "https://wonapi.maxleap.cn/1.0/quick/getQuick?where=%7B%22status%22%3A1%7D&skip=0&limit=5&order=+seq",
		dataType: "json",
		headers: {
			"X-ML-AppId": AppId,
			"X-ML-APIKey": APIKey
		},
		success: function(c) {
			var d = "";
			var e = 0;
			var f = "";
			var g = eval(c);
			$.each(g.sort(), function(a, b) {
				switch (b.quickTypes) {
				case 1:
					f = url_api + "product/category/" + b.category.id;
					break;
				case 2:
					f = b.custom.urlStr;
					break;
				default:
					break
				}
				d += "<table class='tabImg' width='66%' border='0' cellspacing='0' cellpadding='0' align='left'><tbody><tr><td align='center'><a href='" + f + "'><img src='" + b.quickImageUrl + "' width='70%' alt='sample'></a></td></tr><tr><td style='font-size:14px; text-align:center; height:30px; padding-bottom:10px'>" + b.quickName + "</td></tr></tbody></table>";
				e++
			});
			document.getElementById("smlBtn").innerHTML = d
		}
	});
	$.ajax({
		type: "get",
		url: "https://wonapi.maxleap.cn/1.0/cms?where=%7B%22cms_type%22:%7B%22$in%22:%5B%225951db5275c3080007bf2ad6%22%5D%7D,%22valid%22:true%7D&order=-createdAt&skip=0&limit=100",
		dataType: "json",
		headers: {
			"X-ML-AppId": AppId,
			"X-ML-APIKey": APIKey
		},
		success: function(c) {
			var d = eval(c);
			var e = d.results.length;
			var f = "<table width='100%' border='0' cellspacing='0' cellpadding='0' bgcolor='#fff'><tbody>";
			$.each(d.results, function(a, b) {
				f += "<tr><td height='32'><a href='" + url_api + "article_m1/" + b.objectId + "'><span>" + b.title + "</span></a></td></tr>"
			});
			f += "</tbody></table>";
			document.getElementById("divInformation").getElementsByTagName("div")[0].innerHTML = f;
			var g = new IScroll("#divInformation", {
				click: false,
				bounce: false,
				disableMouse: true,
				disablePointer: true,
				disableTouch: true,
				momentum: false,
				fadeScrollbars: false
			});
			g.tig = 0;

			function showInformation() {
				g.tig++;
				if (g.tig == e) {
					g.tig = 0;
					g.scrollTo(0, -32 * g.tig, 0)
				} else {
					g.scrollTo(0, -32 * g.tig, 400)
				}
				clearTimeout(tSS);
				tSS = setTimeout(showInformation, 5000)
			}
			showInformation();
			for (var i = 0; i < e; i++) {
				var h = document.getElementById("divInformation").getElementsByTagName("span")[i];
				$clamp(h, {
					clamp: 1
				})
			}
		}
	});
	$.ajax({
		type: "get",
		url: "https://wonapi.maxleap.cn/1.0/banner/getBanner?where=%7B%22status%22%3A1%2C%22type%22%3A2%7D",
		dataType: "json",
		headers: {
			"X-ML-AppId": AppId,
			"X-ML-APIKey": APIKey
		},
		success: function(c) {
			var d = "";
			var e = "";
			var f = eval(c);
			$.each(f.sort(), function(a, b) {
				switch (b.bannerTypes) {
				case 1:
					e = url_api + "product/category/" + b.category.id;
					break;
				case 2:
					e = url_api + "product/" + b.product.id;
					break;
				case 3:
					e = b.custom.urlStr;
					break;
				default:
					break
				}
				d = "<a href='" + e + "'><img width='96%' src='" + b.bannerImageUrl + "'></a>"
			});
			document.getElementById("banner_center").innerHTML = d
		}
	});
	$.ajax({
		type: "get",
		url: "https://wonapi.maxleap.cn/1.0/category?where=%7B%22valid%22%3Atrue%7D&skip=0&limit=6&order=+seq",
		dataType: "json",
		headers: {
			"X-ML-AppId": AppId,
			"X-ML-APIKey": APIKey
		},
		success: function(n) {
			var o = eval(n);
			console.log("商品分类数==" + o.count + "---" + o.results.length);
			console.log(o);
			var p = new Object();
			p.c0 = "#f46464";
			p.c1 = "#d35ed2";
			p.c2 = "#5ba6e9";
			p.c3 = "#57bcd3";
			p.c4 = "#e29854";
			$.each(o.results, function(a, b) {
				var c = "";
				if (b.secondary.length !== 0) {
					var d = "";
					for (var i = 0; i < b.secondary.length; i++) {
						d += (d == "" ? "" : ",") + b.secondary[i].id
					}
					c = "https://wonapi.maxleap.cn/1.0/category/getSimpleProductsByCategoryIds/client?where=%7B%22valid%22%3Atrue,%22obvious%22%3Atrue%7D&categoryIds=" + d + "&skip=0&limit=3&order=+obviousSeq"
				} else {
					c = "https://wonapi.maxleap.cn/1.0/category/" + b.id + "/simpleProducts/client?where=%7B%22valid%22%3Atrue,%22obvious%22%3Atrue%7D&skip=0&limit=3&order=+obviousSeq"
				}
				var e = "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='tdkj1' id='prd_" + a + "'><tbody>";
				e += "<tr align='center' style='line-height: 0px'><td class='tdkj2' width='33%'>&nbsp;</td><td class='tdkj2' width='33%'>&nbsp;</td><td class='tdkj2' width='33%'>&nbsp;</td></tr>";
				e += "<tr align='center' height='20px' bgcolor='#fff' style='font-size: 11px; color: #000'><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td></tr>";
				e += "<tr align='center' height='20px' style='font-size: 10px; color: #000; line-height:15px'><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td></tr>";
				e += "</tbody></table>";
				$("#listPrd").find("td.1").eq(a * 2 + 1).html(e);
				toShowPrd(c, a)
			});

			function toShowPrd(l, m) {
				$.ajax({
					type: "get",
					url: l,
					dataType: "json",
					headers: {
						"X-ML-AppId": AppId,
						"X-ML-APIKey": APIKey
					},
					success: function(j) {
						var k = eval(j);
						$.each(k.results, function(a, b) {
							var c = (b.originalPrice * 0.01).toFixed(0);
							var d = (b.price * 0.01).toFixed(0);
							$("#prd_" + m).find("tr").eq(0).children("td").eq(a).html("<a href='" + url_api + "product/" + b.id + "'><img src='" + b.coverIcon + "' width='100%'></a>");
							$("#prd_" + m).find("tr").eq(1).children("td").eq(a).html("<span id='prdTit_" + m + "_" + a + "'>" + b.title + "</span>");
							var e = document.getElementById("prdTit_" + m + "_" + a);
							$clamp(e, {
								clamp: 2
							});
							var f;
							if (b.panicSwitch === true) {
								if (b.promotionType === 0) {
									var g = (b.panicPrice * 0.01).toFixed(0);
									f = "<span style='color: #ff3300'>抢购价:￥</span><span style='font-size: 15px; color: #ff3300'>" + g + "</span><br><span style='font-size: 10px'><s>原价:￥" + d + "</s></span>"
								} else {
									if (b.promotionType === 1) {
										var h = (b.groupPrice * 0.01).toFixed(0);
										var i = b.groupPerson;
										f = "<span style='color: #ff3300'>团价:￥</span><span style='font-size: 12px; color: #ff3300'>" + h + "</span>&nbsp;&nbsp;<b>" + i + "人团</b><br><span style='font-size: 10px'><s>单价:￥" + d + "</s></span>"
									}
								}
							} else {
								if (c !== d) {
									f = "<span style='font-size: 10px; color: #000'>￥</span><span style='font-size: 15px; color: #000'>" + d + "</span>&nbsp;<span style='font-size: 10px; color: #999'><s>￥" + c + "</s></span>"
								} else {
									f = "<span style='font-size: 10px; color: #000'>￥</span><span style='font-size: 15px; color: #000'>" + d + "</span>"
								}
							}
							$("#prd_" + m).find("tr").eq(2).children("td").eq(a).html(f)
						})
					}
				})
			}
		}
	});
	$.ajax({
		type: "get",
		url: "https://wonapi.maxleap.cn/1.0/banner?where=%7B%22status%22%3A2%2C%22type%22%3A1%7D&skip=0&limit=6&order=+sort",
		dataType: "json",
		headers: {
			"X-ML-AppId": AppId,
			"X-ML-APIKey": APIKey,
			"X-ML-MasterKey": MasterKey
		},
		success: function(c) {
			var d = eval(c);
			$.each(d.results, function(a, b) {
				switch (b.bannerTypes) {
				case 1:
					strUrl = url_api + "product/category/" + b.category.id;
					break;
				case 2:
					strUrl = url_api + "product/" + b.product.id;
					break;
				case 3:
					strUrl = b.custom.urlStr;
					break;
				default:
					break
				}
				$("#listPrd").find("td.1").eq(a * 2).css("line-height", 0);
				$("#listPrd").find("td.1").eq(a * 2).html("<a href='" + strUrl + "'><img width='96%' src='" + b.bannerImageUrl + "'></a>")
			})
		}
	});
	$.ajax({
		type: "get",
		url: "https://wonapi.maxleap.cn/1.0/recommendArea/findRecommendAreaAndProductByRecommendArea/client/home_bottom?where=%7B%22enable%22%3Atrue%7D&productLimit=100",
		dataType: "json",
		headers: {
			"X-ML-AppId": AppId,
			"X-ML-APIKey": APIKey
		},
		success: function(g) {
			var h = "";
			var i = eval(g);
			$.each(i.products, function(a, b) {
				var c = (b.originalPrice * 0.01).toFixed(2);
				var d = (b.price * 0.01).toFixed(2);
				var e = (b.widePic == "" ? b.coverIcon : b.widePic);
				var f = (b.widePic == "" ? "52%" : "100%");
				h += "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td colspan='2' align='center' bgcolor='#FFFFFF'><a href='" + url_api + "product/" + b.id + "'><img src='" + e + "' width='" + f + "'></a></td></tr><tr><td width='68%' align='left' style='font-size:14px;padding:5px 10px'><b>" + b.title + "</b></td><td align='right' style='font-size:13px;padding-right:10px;text-decoration:line-through'>" + (c == d ? "" : "￥：" + c) + "</td></tr><tr><td id='prd" + b.id + "' align='right' style='font-size:14px;color:#CC0003;padding-right:10px;padding-top:5px' colspan='2'><b>￥：" + d + "</b></td></tr></tbody></table>"
			});
			document.getElementById("listCont").innerHTML = h
		}
	});
	toRefresh();

	function toRefresh() {
		if (contentH !== parseInt($("#scroller").css("height"))) {
			contentH = parseInt($("#scroller").css("height"));
			q.refresh();
			clearTimeout(tRef);
			tRef = setTimeout(function() {
				toRefresh()
			}, 1000)
		} else {
			numRefresh++;
			if (numRefresh < 3) {
				clearTimeout(tRef);
				tRef = setTimeout(function() {
					toRefresh()
				}, 5000)
			} else {}
		}
	}
}
function showObj(c) {
	var b;
	for (var a in c) {
		if (typeof(c[a]) == "function") {} else {
			b += a + "=" + c[a] + ";  "
		}
	}
	alert(b)
};