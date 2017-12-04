var AppId = "";

var url_api = "";
(function(window, document, Math) {
	var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60)
	};
	var utils = (function() {
		var me = {};
		var _elementStyle = document.createElement('div').style;
		var _vendor = (function() {
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform, i = 0,
				l = vendors.length;
			for (; i < l; i++) {
				transform = vendors[i] + 'ransform';
				if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1)
			}
			return false
		})();

		function _prefixStyle(style) {
			if (_vendor === false) return false;
			if (_vendor === '') return style;
			return _vendor + style.charAt(0).toUpperCase() + style.substr(1)
		}
		me.getTime = Date.now ||
		function getTime() {
			return new Date().getTime()
		};
		me.extend = function(target, obj) {
			for (var i in obj) {
				target[i] = obj[i]
			}
		};
		me.addEvent = function(el, type, fn, capture) {
			el.addEventListener(type, fn, !! capture)
		};
		me.removeEvent = function(el, type, fn, capture) {
			el.removeEventListener(type, fn, !! capture)
		};
		me.prefixPointerEvent = function(pointerEvent) {
			return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8) : pointerEvent
		};
		me.momentum = function(current, start, time, lowerMargin, wrapperSize, deceleration) {
			var distance = current - start,
				speed = Math.abs(distance) / time,
				destination, duration;
			deceleration = deceleration === undefined ? 0.0006 : deceleration;
			destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
			duration = speed / deceleration;
			if (destination < lowerMargin) {
				destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed
			} else if (destination > 0) {
				destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed
			}
			return {
				destination: Math.round(destination),
				duration: duration
			}
		};
		var _transform = _prefixStyle('transform');
		me.extend(me, {
			hasTransform: _transform !== false,
			hasPerspective: _prefixStyle('perspective') in _elementStyle,
			hasTouch: 'ontouchstart' in window,
			hasPointer: !! (window.PointerEvent || window.MSPointerEvent),
			hasTransition: _prefixStyle('transition') in _elementStyle
		});
		me.isBadAndroid = (function() {
			var appVersion = window.navigator.appVersion;
			if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
				var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
				if (safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
					return parseFloat(safariVersion[1]) < 535.19
				} else {
					return true
				}
			} else {
				return false
			}
		})();
		me.extend(me.style = {}, {
			transform: _transform,
			transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
			transitionDuration: _prefixStyle('transitionDuration'),
			transitionDelay: _prefixStyle('transitionDelay'),
			transformOrigin: _prefixStyle('transformOrigin'),
			touchAction: _prefixStyle('touchAction')
		});
		me.hasClass = function(e, c) {
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
			return re.test(e.className)
		};
		me.addClass = function(e, c) {
			if (me.hasClass(e, c)) {
				return
			}
			var newclass = e.className.split(' ');
			newclass.push(c);
			e.className = newclass.join(' ')
		};
		me.removeClass = function(e, c) {
			if (!me.hasClass(e, c)) {
				return
			}
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
			e.className = e.className.replace(re, ' ')
		};
		me.offset = function(el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;
			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop
			}
			return {
				left: left,
				top: top
			}
		};
		me.preventDefaultException = function(el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true
				}
			}
			return false
		};
		me.extend(me.eventType = {}, {
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
		me.extend(me.ease = {}, {
			quadratic: {
				style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				fn: function(k) {
					return k * (2 - k)
				}
			},
			circular: {
				style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
				fn: function(k) {
					return Math.sqrt(1 - (--k * k))
				}
			},
			back: {
				style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				fn: function(k) {
					var b = 4;
					return (k = k - 1) * k * ((b + 1) * k + b) + 1
				}
			},
			bounce: {
				style: '',
				fn: function(k) {
					if ((k /= 1) < (1 / 2.75)) {
						return 7.5625 * k * k
					} else if (k < (2 / 2.75)) {
						return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75
					} else if (k < (2.5 / 2.75)) {
						return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375
					} else {
						return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375
					}
				}
			},
			elastic: {
				style: '',
				fn: function(k) {
					var f = 0.22,
						e = 0.4;
					if (k === 0) {
						return 0
					}
					if (k == 1) {
						return 1
					}
					return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1)
				}
			}
		});
		me.tap = function(e, eventName) {
			var ev = document.createEvent('Event');
			ev.initEvent(eventName, true, true);
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
			e.target.dispatchEvent(ev)
		};
		me.click = function(e) {
			var target = e.target,
				ev;
			if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
				ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
				ev.initEvent('click', true, true);
				ev.view = e.view || window;
				ev.detail = 1;
				ev.screenX = target.screenX || 0;
				ev.screenY = target.screenY || 0;
				ev.clientX = target.clientX || 0;
				ev.clientY = target.clientY || 0;
				ev.ctrlKey = !! e.ctrlKey;
				ev.altKey = !! e.altKey;
				ev.shiftKey = !! e.shiftKey;
				ev.metaKey = !! e.metaKey;
				ev.button = 0;
				ev.relatedTarget = null;
				ev._constructed = true;
				target.dispatchEvent(ev)
			}
		};
		me.getTouchAction = function(eventPassthrough, addPinch) {
			var touchAction = 'none';
			if (eventPassthrough === 'vertical') {
				touchAction = 'pan-y'
			} else if (eventPassthrough === 'horizontal') {
				touchAction = 'pan-x'
			}
			if (addPinch && touchAction != 'none') {
				touchAction += ' pinch-zoom'
			}
			return touchAction
		};
		me.getRect = function(el) {
			if (el instanceof SVGElement) {
				var rect = el.getBoundingClientRect();
				return {
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height
				}
			} else {
				return {
					top: el.offsetTop,
					left: el.offsetLeft,
					width: el.offsetWidth,
					height: el.offsetHeight
				}
			}
		};
		return me
	})();

	function IScroll(el, options) {
		this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
		this.scroller = this.wrapper.children[0];
		this.scrollerStyle = this.scroller.style;
		this.options = {
			resizeScrollbars: true,
			mouseWheelSpeed: 20,
			snapThreshold: 0.334,
			disablePointer: !utils.hasPointer,
			disableTouch: utils.hasPointer || !utils.hasTouch,
			disableMouse: utils.hasPointer || utils.hasTouch,
			startX: 0,
			startY: 0,
			scrollY: true,
			directionLockThreshold: 5,
			momentum: true,
			bounce: true,
			bounceTime: 600,
			bounceEasing: '',
			preventDefault: true,
			preventDefaultException: {
				tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
			},
			HWCompositing: true,
			useTransition: true,
			useTransform: true,
			bindToWrapper: typeof window.onmousedown === "undefined"
		};
		for (var i in options) {
			this.options[i] = options[i]
		}
		this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';
		this.options.useTransition = utils.hasTransition && this.options.useTransition;
		this.options.useTransform = utils.hasTransform && this.options.useTransform;
		this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
		this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
		this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
		this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;
		this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
		this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
		this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;
		this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
		if (this.options.tap === true) {
			this.options.tap = 'tap'
		}
		if (!this.options.useTransition && !this.options.useTransform) {
			if (!(/relative|absolute/i).test(this.scrollerStyle.position)) {
				this.scrollerStyle.position = "relative"
			}
		}
		if (this.options.shrinkScrollbars == 'scale') {
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
	IScroll.prototype = {
		version: '5.2.0-snapshot',
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
			this._execEvent('destroy')
		},
		_transitionEnd: function(e) {
			if (e.target != this.scroller || !this.isInTransition) {
				return
			}
			this._transitionTime();
			if (!this.resetPosition(this.options.bounceTime)) {
				this.isInTransition = false;
				this._execEvent('scrollEnd')
			}
		},
		_start: function(e) {
			if (utils.eventType[e.type] != 1) {
				var button;
				if (!e.which) {
					button = (e.button < 2) ? 0 : ((e.button == 4) ? 1 : 2)
				} else {
					button = e.button
				}
				if (button !== 0) {
					return
				}
			}
			if (!this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated)) {
				return
			}
			if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
				e.preventDefault()
			}
			var point = e.touches ? e.touches[0] : e,
				pos;
			this.initiated = utils.eventType[e.type];
			this.moved = false;
			this.distX = 0;
			this.distY = 0;
			this.directionX = 0;
			this.directionY = 0;
			this.directionLocked = 0;
			this.startTime = utils.getTime();
			if (this.options.useTransition && this.isInTransition) {
				this._transitionTime();
				this.isInTransition = false;
				pos = this.getComputedPosition();
				this._translate(Math.round(pos.x), Math.round(pos.y));
				this._execEvent('scrollEnd')
			} else if (!this.options.useTransition && this.isAnimating) {
				this.isAnimating = false;
				this._execEvent('scrollEnd')
			}
			this.startX = this.x;
			this.startY = this.y;
			this.absStartX = this.x;
			this.absStartY = this.y;
			this.pointX = point.pageX;
			this.pointY = point.pageY;
			this._execEvent('beforeScrollStart')
		},
		_move: function(e) {
			if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
				return
			}
			if (this.options.preventDefault) {
				e.preventDefault()
			}
			var point = e.touches ? e.touches[0] : e,
				deltaX = point.pageX - this.pointX,
				deltaY = point.pageY - this.pointY,
				timestamp = utils.getTime(),
				newX, newY, absDistX, absDistY;
			this.pointX = point.pageX;
			this.pointY = point.pageY;
			this.distX += deltaX;
			this.distY += deltaY;
			absDistX = Math.abs(this.distX);
			absDistY = Math.abs(this.distY);
			if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
				return
			}
			if (!this.directionLocked && !this.options.freeScroll) {
				if (absDistX > absDistY + this.options.directionLockThreshold) {
					this.directionLocked = 'h'
				} else if (absDistY >= absDistX + this.options.directionLockThreshold) {
					this.directionLocked = 'v'
				} else {
					this.directionLocked = 'n'
				}
			}
			if (this.directionLocked == 'h') {
				if (this.options.eventPassthrough == 'vertical') {
					e.preventDefault()
				} else if (this.options.eventPassthrough == 'horizontal') {
					this.initiated = false;
					return
				}
				deltaY = 0
			} else if (this.directionLocked == 'v') {
				if (this.options.eventPassthrough == 'horizontal') {
					e.preventDefault()
				} else if (this.options.eventPassthrough == 'vertical') {
					this.initiated = false;
					return
				}
				deltaX = 0
			}
			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;
			newX = this.x + deltaX;
			newY = this.y + deltaY;
			if (newX > 0 || newX < this.maxScrollX) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX
			}
			if (newY > 0 || newY < this.maxScrollY) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY
			}
			this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
			this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
			if (!this.moved) {
				this._execEvent('scrollStart')
			}
			this.moved = true;
			this._translate(newX, newY);
			if (timestamp - this.startTime > 300) {
				this.startTime = timestamp;
				this.startX = this.x;
				this.startY = this.y;
				if (this.options.probeType == 1) {
					this._execEvent('scroll')
				}
			}
			if (this.options.probeType > 1) {
				this._execEvent('scroll')
			}
		},
		_end: function(e) {
			if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
				return
			}
			if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
				e.preventDefault()
			}
			var point = e.changedTouches ? e.changedTouches[0] : e,
				momentumX, momentumY, duration = utils.getTime() - this.startTime,
				newX = Math.round(this.x),
				newY = Math.round(this.y),
				distanceX = Math.abs(newX - this.startX),
				distanceY = Math.abs(newY - this.startY),
				time = 0,
				easing = '';
			this.isInTransition = 0;
			this.initiated = 0;
			this.endTime = utils.getTime();
			if (this.resetPosition(this.options.bounceTime)) {
				return
			}
			this.scrollTo(newX, newY);
			if (!this.moved) {
				if (this.options.tap) {
					utils.tap(e, this.options.tap)
				}
				if (this.options.click) {
					utils.click(e)
				}
				this._execEvent('scrollCancel');
				return
			}
			if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
				this._execEvent('flick');
				return
			}
			if (this.options.momentum && duration < 300) {
				momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
					destination: newX,
					duration: 0
				};
				momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
					destination: newY,
					duration: 0
				};
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = 1
			}
			if (this.options.snap) {
				var snap = this._nearestSnap(newX, newY);
				this.currentPage = snap;
				time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
				newX = snap.x;
				newY = snap.y;
				this.directionX = 0;
				this.directionY = 0;
				easing = this.options.bounceEasing
			}
			if (newX != this.x || newY != this.y) {
				if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
					easing = utils.ease.quadratic
				}
				this.scrollTo(newX, newY, time, easing);
				return
			}
			this._execEvent('scrollEnd')
		},
		_resize: function() {
			var that = this;
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = setTimeout(function() {
				that.refresh()
			}, this.options.resizePolling)
		},
		resetPosition: function(time) {
			var x = this.x,
				y = this.y;
			time = time || 0;
			if (!this.hasHorizontalScroll || this.x > 0) {
				x = 0
			} else if (this.x < this.maxScrollX) {
				x = this.maxScrollX
			}
			if (!this.hasVerticalScroll || this.y > 0) {
				y = 0
			} else if (this.y < this.maxScrollY) {
				y = this.maxScrollY
			}
			if (x == this.x && y == this.y) {
				return false
			}
			this.scrollTo(x, y, time, this.options.bounceEasing);
			return true
		},
		disable: function() {
			this.enabled = false
		},
		enable: function() {
			this.enabled = true
		},
		refresh: function() {
			utils.getRect(this.wrapper);
			this.wrapperWidth = this.wrapper.clientWidth;
			this.wrapperHeight = this.wrapper.clientHeight;
			var rect = utils.getRect(this.scroller);
			this.scrollerWidth = rect.width;
			this.scrollerHeight = rect.height;
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
			if (utils.hasPointer && !this.options.disablePointer) {
				this.wrapper.style[utils.style.touchAction] = utils.getTouchAction(this.options.eventPassthrough, true);
				if (!this.wrapper.style[utils.style.touchAction]) {
					this.wrapper.style[utils.style.touchAction] = utils.getTouchAction(this.options.eventPassthrough, false)
				}
			}
			this.wrapperOffset = utils.offset(this.wrapper);
			this._execEvent('refresh');
			this.resetPosition()
		},
		on: function(type, fn) {
			if (!this._events[type]) {
				this._events[type] = []
			}
			this._events[type].push(fn)
		},
		off: function(type, fn) {
			if (!this._events[type]) {
				return
			}
			var index = this._events[type].indexOf(fn);
			if (index > -1) {
				this._events[type].splice(index, 1)
			}
		},
		_execEvent: function(type) {
			if (!this._events[type]) {
				return
			}
			var i = 0,
				l = this._events[type].length;
			if (!l) {
				return
			}
			for (; i < l; i++) {
				this._events[type][i].apply(this, [].slice.call(arguments, 1))
			}
		},
		scrollBy: function(x, y, time, easing) {
			x = this.x + x;
			y = this.y + y;
			time = time || 0;
			this.scrollTo(x, y, time, easing)
		},
		scrollTo: function(x, y, time, easing) {
			easing = easing || utils.ease.circular;
			this.isInTransition = this.options.useTransition && time > 0;
			var transitionType = this.options.useTransition && easing.style;
			if (!time || transitionType) {
				if (transitionType) {
					this._transitionTimingFunction(easing.style);
					this._transitionTime(time)
				}
				this._translate(x, y)
			} else {
				this._animate(x, y, time, easing.fn)
			}
		},
		scrollToElement: function(el, time, offsetX, offsetY, easing) {
			el = el.nodeType ? el : this.scroller.querySelector(el);
			if (!el) {
				return
			}
			var pos = utils.offset(el);
			pos.left -= this.wrapperOffset.left;
			pos.top -= this.wrapperOffset.top;
			var elRect = utils.getRect(el);
			var wrapperRect = utils.getRect(this.wrapper);
			if (offsetX === true) {
				offsetX = Math.round(elRect.width / 2 - wrapperRect.width / 2)
			}
			if (offsetY === true) {
				offsetY = Math.round(elRect.height / 2 - wrapperRect.height / 2)
			}
			pos.left -= offsetX || 0;
			pos.top -= offsetY || 0;
			pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
			pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;
			time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;
			this.scrollTo(pos.left, pos.top, time, easing)
		},
		_transitionTime: function(time) {
			if (!this.options.useTransition) {
				return
			}
			time = time || 0;
			var durationProp = utils.style.transitionDuration;
			if (!durationProp) {
				return
			}
			this.scrollerStyle[durationProp] = time + 'ms';
			if (!time && utils.isBadAndroid) {
				this.scrollerStyle[durationProp] = '0.0001ms';
				var self = this;
				rAF(function() {
					if (self.scrollerStyle[durationProp] === '0.0001ms') {
						self.scrollerStyle[durationProp] = '0s'
					}
				})
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTime(time)
				}
			}
		},
		_transitionTimingFunction: function(easing) {
			this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTimingFunction(easing)
				}
			}
		},
		_translate: function(x, y) {
			if (this.options.useTransform) {
				this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ
			} else {
				x = Math.round(x);
				y = Math.round(y);
				this.scrollerStyle.left = x + 'px';
				this.scrollerStyle.top = y + 'px'
			}
			this.x = x;
			this.y = y;
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].updatePosition()
				}
			}
		},
		_initEvents: function(remove) {
			var eventType = remove ? utils.removeEvent : utils.addEvent,
				target = this.options.bindToWrapper ? this.wrapper : window;
			eventType(window, 'orientationchange', this);
			eventType(window, 'resize', this);
			if (this.options.click) {
				eventType(this.wrapper, 'click', this, true)
			}
			if (!this.options.disableMouse) {
				eventType(this.wrapper, 'mousedown', this);
				eventType(target, 'mousemove', this);
				eventType(target, 'mousecancel', this);
				eventType(target, 'mouseup', this)
			}
			if (utils.hasPointer && !this.options.disablePointer) {
				eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
				eventType(target, utils.prefixPointerEvent('pointermove'), this);
				eventType(target, utils.prefixPointerEvent('pointercancel'), this);
				eventType(target, utils.prefixPointerEvent('pointerup'), this)
			}
			if (utils.hasTouch && !this.options.disableTouch) {
				eventType(this.wrapper, 'touchstart', this);
				eventType(target, 'touchmove', this);
				eventType(target, 'touchcancel', this);
				eventType(target, 'touchend', this)
			}
			eventType(this.scroller, 'transitionend', this);
			eventType(this.scroller, 'webkitTransitionEnd', this);
			eventType(this.scroller, 'oTransitionEnd', this);
			eventType(this.scroller, 'MSTransitionEnd', this)
		},
		getComputedPosition: function() {
			var matrix = window.getComputedStyle(this.scroller, null),
				x, y;
			if (this.options.useTransform) {
				matrix = matrix[utils.style.transform].split(')')[0].split(', ');
				x = +(matrix[12] || matrix[4]);
				y = +(matrix[13] || matrix[5])
			} else {
				x = +matrix.left.replace(/[^-\d.]/g, '');
				y = +matrix.top.replace(/[^-\d.]/g, '')
			}
			return {
				x: x,
				y: y
			}
		},
		_initIndicators: function() {
			var interactive = this.options.interactiveScrollbars,
				customStyle = typeof this.options.scrollbars != 'string',
				indicators = [],
				indicator;
			var that = this;
			this.indicators = [];
			if (this.options.scrollbars) {
				if (this.options.scrollY) {
					indicator = {
						el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenX: false
					};
					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator)
				}
				if (this.options.scrollX) {
					indicator = {
						el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenY: false
					};
					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator)
				}
			}
			if (this.options.indicators) {
				indicators = indicators.concat(this.options.indicators)
			}
			for (var i = indicators.length; i--;) {
				this.indicators.push(new Indicator(this, indicators[i]))
			}
			function _indicatorsMap(fn) {
				if (that.indicators) {
					for (var i = that.indicators.length; i--;) {
						fn.call(that.indicators[i])
					}
				}
			}
			if (this.options.fadeScrollbars) {
				this.on('scrollEnd', function() {
					_indicatorsMap(function() {
						this.fade()
					})
				});
				this.on('scrollCancel', function() {
					_indicatorsMap(function() {
						this.fade()
					})
				});
				this.on('scrollStart', function() {
					_indicatorsMap(function() {
						this.fade(1)
					})
				});
				this.on('beforeScrollStart', function() {
					_indicatorsMap(function() {
						this.fade(1, true)
					})
				})
			}
			this.on('refresh', function() {
				_indicatorsMap(function() {
					this.refresh()
				})
			});
			this.on('destroy', function() {
				_indicatorsMap(function() {
					this.destroy()
				});
				delete this.indicators
			})
		},
		_initWheel: function() {
			utils.addEvent(this.wrapper, 'wheel', this);
			utils.addEvent(this.wrapper, 'mousewheel', this);
			utils.addEvent(this.wrapper, 'DOMMouseScroll', this);
			this.on('destroy', function() {
				clearTimeout(this.wheelTimeout);
				this.wheelTimeout = null;
				utils.removeEvent(this.wrapper, 'wheel', this);
				utils.removeEvent(this.wrapper, 'mousewheel', this);
				utils.removeEvent(this.wrapper, 'DOMMouseScroll', this)
			})
		},
		_wheel: function(e) {
			if (!this.enabled) {
				return
			}
			e.preventDefault();
			var wheelDeltaX, wheelDeltaY, newX, newY, that = this;
			if (this.wheelTimeout === undefined) {
				that._execEvent('scrollStart')
			}
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = setTimeout(function() {
				if (!that.options.snap) {
					that._execEvent('scrollEnd')
				}
				that.wheelTimeout = undefined
			}, 400);
			if ('deltaX' in e) {
				if (e.deltaMode === 1) {
					wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
					wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed
				} else {
					wheelDeltaX = -e.deltaX;
					wheelDeltaY = -e.deltaY
				}
			} else if ('wheelDeltaX' in e) {
				wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
				wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed
			} else if ('wheelDelta' in e) {
				wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed
			} else if ('detail' in e) {
				wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed
			} else {
				return
			}
			wheelDeltaX *= this.options.invertWheelDirection;
			wheelDeltaY *= this.options.invertWheelDirection;
			if (!this.hasVerticalScroll) {
				wheelDeltaX = wheelDeltaY;
				wheelDeltaY = 0
			}
			if (this.options.snap) {
				newX = this.currentPage.pageX;
				newY = this.currentPage.pageY;
				if (wheelDeltaX > 0) {
					newX--
				} else if (wheelDeltaX < 0) {
					newX++
				}
				if (wheelDeltaY > 0) {
					newY--
				} else if (wheelDeltaY < 0) {
					newY++
				}
				this.goToPage(newX, newY);
				return
			}
			newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
			newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);
			this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
			this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;
			if (newX > 0) {
				newX = 0
			} else if (newX < this.maxScrollX) {
				newX = this.maxScrollX
			}
			if (newY > 0) {
				newY = 0
			} else if (newY < this.maxScrollY) {
				newY = this.maxScrollY
			}
			this.scrollTo(newX, newY, 0);
			if (this.options.probeType > 1) {
				this._execEvent('scroll')
			}
		},
		_initSnap: function() {
			this.currentPage = {};
			if (typeof this.options.snap == 'string') {
				this.options.snap = this.scroller.querySelectorAll(this.options.snap)
			}
			this.on('refresh', function() {
				var i = 0,
					l, m = 0,
					n, cx, cy, x = 0,
					y, stepX = this.options.snapStepX || this.wrapperWidth,
					stepY = this.options.snapStepY || this.wrapperHeight,
					el, rect;
				this.pages = [];
				if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
					return
				}
				if (this.options.snap === true) {
					cx = Math.round(stepX / 2);
					cy = Math.round(stepY / 2);
					while (x > -this.scrollerWidth) {
						this.pages[i] = [];
						l = 0;
						y = 0;
						while (y > -this.scrollerHeight) {
							this.pages[i][l] = {
								x: Math.max(x, this.maxScrollX),
								y: Math.max(y, this.maxScrollY),
								width: stepX,
								height: stepY,
								cx: x - cx,
								cy: y - cy
							};
							y -= stepY;
							l++
						}
						x -= stepX;
						i++
					}
				} else {
					el = this.options.snap;
					l = el.length;
					n = -1;
					for (; i < l; i++) {
						rect = utils.getRect(el[i]);
						if (i === 0 || rect.left <= utils.getRect(el[i - 1]).left) {
							m = 0;
							n++
						}
						if (!this.pages[m]) {
							this.pages[m] = []
						}
						x = Math.max(-rect.left, this.maxScrollX);
						y = Math.max(-rect.top, this.maxScrollY);
						cx = x - Math.round(rect.width / 2);
						cy = y - Math.round(rect.height / 2);
						this.pages[m][n] = {
							x: x,
							y: y,
							width: rect.width,
							height: rect.height,
							cx: cx,
							cy: cy
						};
						if (x > this.maxScrollX) {
							m++
						}
					}
				}
				this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
				if (this.options.snapThreshold % 1 === 0) {
					this.snapThresholdX = this.options.snapThreshold;
					this.snapThresholdY = this.options.snapThreshold
				} else {
					this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
					this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold)
				}
			});
			this.on('flick', function() {
				var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);
				this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time)
			})
		},
		_nearestSnap: function(x, y) {
			if (!this.pages.length) {
				return {
					x: 0,
					y: 0,
					pageX: 0,
					pageY: 0
				}
			}
			var i = 0,
				l = this.pages.length,
				m = 0;
			if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
				return this.currentPage
			}
			if (x > 0) {
				x = 0
			} else if (x < this.maxScrollX) {
				x = this.maxScrollX
			}
			if (y > 0) {
				y = 0
			} else if (y < this.maxScrollY) {
				y = this.maxScrollY
			}
			for (; i < l; i++) {
				if (x >= this.pages[i][0].cx) {
					x = this.pages[i][0].x;
					break
				}
			}
			l = this.pages[i].length;
			for (; m < l; m++) {
				if (y >= this.pages[0][m].cy) {
					y = this.pages[0][m].y;
					break
				}
			}
			if (i == this.currentPage.pageX) {
				i += this.directionX;
				if (i < 0) {
					i = 0
				} else if (i >= this.pages.length) {
					i = this.pages.length - 1
				}
				x = this.pages[i][0].x
			}
			if (m == this.currentPage.pageY) {
				m += this.directionY;
				if (m < 0) {
					m = 0
				} else if (m >= this.pages[0].length) {
					m = this.pages[0].length - 1
				}
				y = this.pages[0][m].y
			}
			return {
				x: x,
				y: y,
				pageX: i,
				pageY: m
			}
		},
		goToPage: function(x, y, time, easing) {
			easing = easing || this.options.bounceEasing;
			if (x >= this.pages.length) {
				x = this.pages.length - 1
			} else if (x < 0) {
				x = 0
			}
			if (y >= this.pages[x].length) {
				y = this.pages[x].length - 1
			} else if (y < 0) {
				y = 0
			}
			var posX = this.pages[x][y].x,
				posY = this.pages[x][y].y;
			time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;
			this.currentPage = {
				x: posX,
				y: posY,
				pageX: x,
				pageY: y
			};
			this.scrollTo(posX, posY, time, easing)
		},
		next: function(time, easing) {
			var x = this.currentPage.pageX,
				y = this.currentPage.pageY;
			x++;
			if (x >= this.pages.length && this.hasVerticalScroll) {
				x = 0;
				y++
			}
			this.goToPage(x, y, time, easing)
		},
		prev: function(time, easing) {
			var x = this.currentPage.pageX,
				y = this.currentPage.pageY;
			x--;
			if (x < 0 && this.hasVerticalScroll) {
				x = 0;
				y--
			}
			this.goToPage(x, y, time, easing)
		},
		_initKeys: function(e) {
			var keys = {
				pageUp: 33,
				pageDown: 34,
				end: 35,
				home: 36,
				left: 37,
				up: 38,
				right: 39,
				down: 40
			};
			var i;
			if (typeof this.options.keyBindings == 'object') {
				for (i in this.options.keyBindings) {
					if (typeof this.options.keyBindings[i] == 'string') {
						this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0)
					}
				}
			} else {
				this.options.keyBindings = {}
			}
			for (i in keys) {
				this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i]
			}
			utils.addEvent(window, 'keydown', this);
			this.on('destroy', function() {
				utils.removeEvent(window, 'keydown', this)
			})
		},
		_key: function(e) {
			if (!this.enabled) {
				return
			}
			var snap = this.options.snap,
				newX = snap ? this.currentPage.pageX : this.x,
				newY = snap ? this.currentPage.pageY : this.y,
				now = utils.getTime(),
				prevTime = this.keyTime || 0,
				acceleration = 0.250,
				pos;
			if (this.options.useTransition && this.isInTransition) {
				pos = this.getComputedPosition();
				this._translate(Math.round(pos.x), Math.round(pos.y));
				this.isInTransition = false
			}
			this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;
			switch (e.keyCode) {
			case this.options.keyBindings.pageUp:
				if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
					newX += snap ? 1 : this.wrapperWidth
				} else {
					newY += snap ? 1 : this.wrapperHeight
				}
				break;
			case this.options.keyBindings.pageDown:
				if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
					newX -= snap ? 1 : this.wrapperWidth
				} else {
					newY -= snap ? 1 : this.wrapperHeight
				}
				break;
			case this.options.keyBindings.end:
				newX = snap ? this.pages.length - 1 : this.maxScrollX;
				newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
				break;
			case this.options.keyBindings.home:
				newX = 0;
				newY = 0;
				break;
			case this.options.keyBindings.left:
				newX += snap ? -1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.up:
				newY += snap ? 1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.right:
				newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.down:
				newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;
				break;
			default:
				return
			}
			if (snap) {
				this.goToPage(newX, newY);
				return
			}
			if (newX > 0) {
				newX = 0;
				this.keyAcceleration = 0
			} else if (newX < this.maxScrollX) {
				newX = this.maxScrollX;
				this.keyAcceleration = 0
			}
			if (newY > 0) {
				newY = 0;
				this.keyAcceleration = 0
			} else if (newY < this.maxScrollY) {
				newY = this.maxScrollY;
				this.keyAcceleration = 0
			}
			this.scrollTo(newX, newY, 0);
			this.keyTime = now
		},
		_animate: function(destX, destY, duration, easingFn) {
			var that = this,
				startX = this.x,
				startY = this.y,
				startTime = utils.getTime(),
				destTime = startTime + duration;

			function step() {
				var now = utils.getTime(),
					newX, newY, easing;
				if (now >= destTime) {
					that.isAnimating = false;
					that._translate(destX, destY);
					if (!that.resetPosition(that.options.bounceTime)) {
						that._execEvent('scrollEnd')
					}
					return
				}
				now = (now - startTime) / duration;
				easing = easingFn(now);
				newX = (destX - startX) * easing + startX;
				newY = (destY - startY) * easing + startY;
				that._translate(newX, newY);
				if (that.isAnimating) {
					rAF(step)
				}
				if (that.options.probeType == 3) {
					that._execEvent('scroll')
				}
			}
			this.isAnimating = true;
			step()
		},
		handleEvent: function(e) {
			switch (e.type) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
			case 'click':
				if (this.enabled && !e._constructed) {
					e.preventDefault();
					e.stopPropagation()
				}
				break
			}
		}
	};

	function createDefaultScrollbar(direction, interactive, type) {
		var scrollbar = document.createElement('div'),
			indicator = document.createElement('div');
		if (type === true) {
			scrollbar.style.cssText = 'position:absolute;z-index:9999';
			indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px'
		}
		indicator.className = 'iScrollIndicator';
		if (direction == 'h') {
			if (type === true) {
				scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
				indicator.style.height = '100%'
			}
			scrollbar.className = 'iScrollHorizontalScrollbar'
		} else {
			if (type === true) {
				scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
				indicator.style.width = '100%'
			}
			scrollbar.className = 'iScrollVerticalScrollbar'
		}
		scrollbar.style.cssText += ';overflow:hidden';
		if (!interactive) {
			scrollbar.style.pointerEvents = 'none'
		}
		scrollbar.appendChild(indicator);
		return scrollbar
	}
	function Indicator(scroller, options) {
		this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;
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
		for (var i in options) {
			this.options[i] = options[i]
		}
		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;
		if (this.options.interactive) {
			if (!this.options.disableTouch) {
				utils.addEvent(this.indicator, 'touchstart', this);
				utils.addEvent(window, 'touchend', this)
			}
			if (!this.options.disablePointer) {
				utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this)
			}
			if (!this.options.disableMouse) {
				utils.addEvent(this.indicator, 'mousedown', this);
				utils.addEvent(window, 'mouseup', this)
			}
		}
		if (this.options.fade) {
			this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
			var durationProp = utils.style.transitionDuration;
			if (!durationProp) {
				return
			}
			this.wrapperStyle[durationProp] = utils.isBadAndroid ? '0.0001ms' : '0ms';
			var self = this;
			if (utils.isBadAndroid) {
				rAF(function() {
					if (self.wrapperStyle[durationProp] === '0.0001ms') {
						self.wrapperStyle[durationProp] = '0s'
					}
				})
			}
			this.wrapperStyle.opacity = '0'
		}
	}
	Indicator.prototype = {
		handleEvent: function(e) {
			switch (e.type) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break
			}
		},
		destroy: function() {
			if (this.options.fadeScrollbars) {
				clearTimeout(this.fadeTimeout);
				this.fadeTimeout = null
			}
			if (this.options.interactive) {
				utils.removeEvent(this.indicator, 'touchstart', this);
				utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.removeEvent(this.indicator, 'mousedown', this);
				utils.removeEvent(window, 'touchmove', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
				utils.removeEvent(window, 'mousemove', this);
				utils.removeEvent(window, 'touchend', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
				utils.removeEvent(window, 'mouseup', this)
			}
			if (this.options.defaultScrollbars && this.wrapper.parentNode) {
				this.wrapper.parentNode.removeChild(this.wrapper)
			}
		},
		_start: function(e) {
			var point = e.touches ? e.touches[0] : e;
			e.preventDefault();
			e.stopPropagation();
			this.transitionTime();
			this.initiated = true;
			this.moved = false;
			this.lastPointX = point.pageX;
			this.lastPointY = point.pageY;
			this.startTime = utils.getTime();
			if (!this.options.disableTouch) {
				utils.addEvent(window, 'touchmove', this)
			}
			if (!this.options.disablePointer) {
				utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this)
			}
			if (!this.options.disableMouse) {
				utils.addEvent(window, 'mousemove', this)
			}
			this.scroller._execEvent('beforeScrollStart')
		},
		_move: function(e) {
			var point = e.touches ? e.touches[0] : e,
				deltaX, deltaY, newX, newY, timestamp = utils.getTime();
			if (!this.moved) {
				this.scroller._execEvent('scrollStart')
			}
			this.moved = true;
			deltaX = point.pageX - this.lastPointX;
			this.lastPointX = point.pageX;
			deltaY = point.pageY - this.lastPointY;
			this.lastPointY = point.pageY;
			newX = this.x + deltaX;
			newY = this.y + deltaY;
			this._pos(newX, newY);
			if (this.scroller.options.probeType == 1 && timestamp - this.startTime > 300) {
				this.startTime = timestamp;
				this.scroller._execEvent('scroll')
			} else if (this.scroller.options.probeType > 1) {
				this.scroller._execEvent('scroll')
			}
			e.preventDefault();
			e.stopPropagation()
		},
		_end: function(e) {
			if (!this.initiated) {
				return
			}
			this.initiated = false;
			e.preventDefault();
			e.stopPropagation();
			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
			utils.removeEvent(window, 'mousemove', this);
			if (this.scroller.options.snap) {
				var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);
				var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);
				if (this.scroller.x != snap.x || this.scroller.y != snap.y) {
					this.scroller.directionX = 0;
					this.scroller.directionY = 0;
					this.scroller.currentPage = snap;
					this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing)
				}
			}
			if (this.moved) {
				this.scroller._execEvent('scrollEnd')
			}
		},
		transitionTime: function(time) {
			time = time || 0;
			var durationProp = utils.style.transitionDuration;
			if (!durationProp) {
				return
			}
			this.indicatorStyle[durationProp] = time + 'ms';
			if (!time && utils.isBadAndroid) {
				this.indicatorStyle[durationProp] = '0.0001ms';
				var self = this;
				rAF(function() {
					if (self.indicatorStyle[durationProp] === '0.0001ms') {
						self.indicatorStyle[durationProp] = '0s'
					}
				})
			}
		},
		transitionTimingFunction: function(easing) {
			this.indicatorStyle[utils.style.transitionTimingFunction] = easing
		},
		refresh: function() {
			this.transitionTime();
			if (this.options.listenX && !this.options.listenY) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none'
			} else if (this.options.listenY && !this.options.listenX) {
				this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none'
			} else {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none'
			}
			if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
				utils.addClass(this.wrapper, 'iScrollBothScrollbars');
				utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');
				if (this.options.defaultScrollbars && this.options.customStyle) {
					if (this.options.listenX) {
						this.wrapper.style.right = '8px'
					} else {
						this.wrapper.style.bottom = '8px'
					}
				}
			} else {
				utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
				utils.addClass(this.wrapper, 'iScrollLoneScrollbar');
				if (this.options.defaultScrollbars && this.options.customStyle) {
					if (this.options.listenX) {
						this.wrapper.style.right = '2px'
					} else {
						this.wrapper.style.bottom = '2px'
					}
				}
			}
			utils.getRect(this.wrapper);
			if (this.options.listenX) {
				this.wrapperWidth = this.wrapper.clientWidth;
				if (this.options.resize) {
					this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
					this.indicatorStyle.width = this.indicatorWidth + 'px'
				} else {
					this.indicatorWidth = this.indicator.clientWidth
				}
				this.maxPosX = this.wrapperWidth - this.indicatorWidth;
				if (this.options.shrink == 'clip') {
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
					this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
					this.indicatorStyle.height = this.indicatorHeight + 'px'
				} else {
					this.indicatorHeight = this.indicator.clientHeight
				}
				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				if (this.options.shrink == 'clip') {
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
			var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
			if (!this.options.ignoreBoundaries) {
				if (x < this.minBoundaryX) {
					if (this.options.shrink == 'scale') {
						this.width = Math.max(this.indicatorWidth + x, 8);
						this.indicatorStyle.width = this.width + 'px'
					}
					x = this.minBoundaryX
				} else if (x > this.maxBoundaryX) {
					if (this.options.shrink == 'scale') {
						this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
						this.indicatorStyle.width = this.width + 'px';
						x = this.maxPosX + this.indicatorWidth - this.width
					} else {
						x = this.maxBoundaryX
					}
				} else if (this.options.shrink == 'scale' && this.width != this.indicatorWidth) {
					this.width = this.indicatorWidth;
					this.indicatorStyle.width = this.width + 'px'
				}
				if (y < this.minBoundaryY) {
					if (this.options.shrink == 'scale') {
						this.height = Math.max(this.indicatorHeight + y * 3, 8);
						this.indicatorStyle.height = this.height + 'px'
					}
					y = this.minBoundaryY
				} else if (y > this.maxBoundaryY) {
					if (this.options.shrink == 'scale') {
						this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
						y = this.maxPosY + this.indicatorHeight - this.height
					} else {
						y = this.maxBoundaryY
					}
				} else if (this.options.shrink == 'scale' && this.height != this.indicatorHeight) {
					this.height = this.indicatorHeight;
					this.indicatorStyle.height = this.height + 'px'
				}
			}
			this.x = x;
			this.y = y;
			if (this.scroller.options.useTransform) {
				this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ
			} else {
				this.indicatorStyle.left = x + 'px';
				this.indicatorStyle.top = y + 'px'
			}
		},
		_pos: function(x, y) {
			if (x < 0) {
				x = 0
			} else if (x > this.maxPosX) {
				x = this.maxPosX
			}
			if (y < 0) {
				y = 0
			} else if (y > this.maxPosY) {
				y = this.maxPosY
			}
			x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
			y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;
			this.scroller.scrollTo(x, y)
		},
		fade: function(val, hold) {
			if (hold && !this.visible) {
				return
			}
			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;
			var time = val ? 250 : 500,
				delay = val ? 0 : 300;
			val = val ? '1' : '0';
			this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';
			this.fadeTimeout = setTimeout((function(val) {
				this.wrapperStyle.opacity = val;
				this.visible = +val
			}).bind(this, val), delay)
		}
	};
	IScroll.utils = utils;
	if (typeof module != 'undefined' && module.exports) {
		module.exports = IScroll
	} else if (typeof define == 'function' && define.amd) {
		define(function() {
			return IScroll
		})
	} else {
		window.IScroll = IScroll
	}
})(window, document, Math);
(function() {
	window.$clamp = function(c, d) {
		function s(a, b) {
			n.getComputedStyle || (n.getComputedStyle = function(a, b) {
				this.el = a;
				this.getPropertyValue = function(b) {
					var c = /(\-([a-z]){1})/g;
					"float" == b && (b = "styleFloat");
					c.test(b) && (b = b.replace(c, function(a, b, c) {
						return c.toUpperCase()
					}));
					return a.currentStyle && a.currentStyle[b] ? a.currentStyle[b] : null
				};
				return this
			});
			return n.getComputedStyle(a, null).getPropertyValue(b)
		}
		function t(a) {
			a = a || c.clientHeight;
			var b = u(c);
			return Math.max(Math.floor(a / b), 0)
		}
		function x(a) {
			return u(c) * a
		}
		function u(a) {
			var b = s(a, "line-height");
			"normal" == b && (b = 1.2 * parseInt(s(a, "font-size")));
			return parseInt(b)
		}
		function l(a) {
			if (a.lastChild.children && 0 < a.lastChild.children.length) return l(Array.prototype.slice.call(a.children).pop());
			if (a.lastChild && a.lastChild.nodeValue && "" != a.lastChild.nodeValue && a.lastChild.nodeValue != b.truncationChar) return a.lastChild;
			a.lastChild.parentNode.removeChild(a.lastChild);
			return l(c)
		}
		function p(a, d) {
			if (d) {
				var e = a.nodeValue.replace(b.truncationChar, "");
				f || (h = 0 < k.length ? k.shift() : "", f = e.split(h));
				1 < f.length ? (q = f.pop(), r(a, f.join(h))) : f = null;
				m && (a.nodeValue = a.nodeValue.replace(b.truncationChar, ""), c.innerHTML = a.nodeValue + " " + m.innerHTML + b.truncationChar);
				if (f) {
					if (c.clientHeight <= d) if (0 <= k.length && "" != h) r(a, f.join(h) + h + q), f = null;
					else return c.innerHTML
				} else "" == h && (r(a, ""), a = l(c), k = b.splitOnChars.slice(0), h = k[0], q = f = null);
				if (b.animate) setTimeout(function() {
					p(a, d)
				}, !0 === b.animate ? 10 : b.animate);
				else return p(a, d)
			}
		}
		function r(a, c) {
			a.nodeValue = c + b.truncationChar
		}
		d = d || {};
		var n = window,
			b = {
				clamp: d.clamp || 2,
				useNativeClamp: "undefined" != typeof d.useNativeClamp ? d.useNativeClamp : !0,
				splitOnChars: d.splitOnChars || [".", "-", "\u2013", "\u2014", " "],
				animate: d.animate || !1,
				truncationChar: d.truncationChar || "\u2026",
				truncationHTML: d.truncationHTML
			},
			e = c.style,
			y = c.innerHTML,
			z = "undefined" != typeof c.style.webkitLineClamp,
			g = b.clamp,
			v = g.indexOf && (-1 < g.indexOf("px") || -1 < g.indexOf("em")),
			m;
		b.truncationHTML && (m = document.createElement("span"), m.innerHTML = b.truncationHTML);
		var k = b.splitOnChars.slice(0),
			h = k[0],
			f, q;
		"auto" == g ? g = t() : v && (g = t(parseInt(g)));
		var w;
		z && b.useNativeClamp ? (e.overflow = "hidden", e.textOverflow = "ellipsis", e.webkitBoxOrient = "vertical", e.display = "-webkit-box", e.webkitLineClamp = g, v && (e.height = b.clamp + "px")) : (e = x(g), e <= c.clientHeight && (w = p(l(c), e)));
		return {
			original: y,
			clamped: w
		}
	}
})();

function getQueryString(name) {
	console.log("getQueryString window.location:", window.location);
	name = name.toLowerCase();
	var search = window.location.search.toLowerCase();
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i');
	var result = search.substr(1).match(reg);
	console.log("====> getQueryString name:", name, "result:", result);
	if (result != null) {
		return unescape(result[2])
	}
	return null
}

AppId = getQueryString("maxleap_appid");
if(!AppId || AppId == ""){
	var message = "Error: AppId is invalid!";
	if(AppId){
		message += "AppId:"+AppId;
	}
	alert(message)
	throw new Error(message)
}

$(document).ready(function() {
	var platform = getQueryString("platform");
	var isNative = platform == "ios" || platform == "android";
	if (isNative) {
		url_api = "https://www.maxwon.cn/"
	} else {
		url_api = "/maxh5/";
		var objImg = new Object();
		objImg.img0 = "data:image/png;base64,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";
		objImg.img1 = "data:image/png;base64,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";
		objImg.img2 = "data:image/png;base64,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";
		objImg.img3 = "data:image/png;base64,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";
		objImg.img4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsSAAALEgHS3X78AAALAElEQVR42u3d/VEbSQLG4bevLgFdCDgEbQg4BDkECAGHACGgECAEFIIVAgrhFELfH2odg6xPGIEQz1Ol2i2v1gwy83P3TM9MqbUG4Cv4l48AECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAAEC0CwAMECECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAAEC0CwAMECECwAwQIEC0CwAMECECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAABAsQLADBAhCsb6eUMiil3JRSnksptfO6L6WMbMPHbQM9/VnWWn0K5xmrUZKHHW+bJLmutc5sw/G2ASMstu+kN3vspElymeRPKWVoG46zDQgWu0cUt51fmrXRQ6m1liQ/ktx1/vsgyUMpZWAb+t0GjqDW6nUmr7bT/TdJba8/SQYb3jtcee+9behvG7yO8zLCOi9XbWdNknmSX7XW+Ya/qKZJrju/NOppdGEbMCVkL91jMHe7DiLXWh+TTDtTokvb0Ns2IFgcsKNO9vx/uu+7sA29bQOCxQ4XK1Odfcx63lFtA4LFYTvdAafoBxt2WtuAYHFU3dHEvsdhLnveUW0DgsXBO+pNKWXr1KatVeruqBPb0Ns2IFjsMM7iNP5yirNxIWSbKt13/99Np/5tAyfDYrSzWzw6yssiyJrFosibzn+/yGIFePc9z9mwsNI2eJ3Sy8XPZ6hdQ3e759vnSX4ecDbNNmBKSK+j5ru8Xr297VjPP8fYSW0DR/nL2AjrrEdagywuU7nK67VFj0kmtdaxbfiYbUCwAFNCAMECECxAsAAEC0CwAMECECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAAEC0CwAMECECwAwQIEC0CwAMECECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAAEC0CwAMECECwAwYIkpZRhKeWhlHLp0ziDP89aq0+Bs41Vkqckg/ZLk1rrT5/M1/VvH8FJ7WAXSS7O5NuZ1Vpnn/hZXiZ56MQqSR79lAkW/RkluT2T7+V3krtPitXNms/xutY69iMmWHAqI9RBkvsWfrESLI5snmRyxN+/O+WcJ5ke+Xv5yFiNWqwGa0Z6s/cedK+1Tvx4nsBfSg66f6sRSHeqdBYHoNtxv/skRz0LWGstfoI+n2UNfNlQlVLukzwfO1aYEsJbQ3WZ5Cp/H6dKm+L2NRXtRnDmkxcsOGTaN2qhWrfsY5bkrq8D6+14WDdY1/4UBAu2RWPYojFKMtzwtl5D1YnjfeeXHh1wFyz234EGW3bYQ3VHJ4MeL1d59yLRTqCW/xxsefs0ybjvpQrts+4uNp0ZXZ3Y/uAs4ckH6zKLy0tO2e9a6907vsfbJDc73jZPMm4jnumRPuunlangP8f6Whhh8XXdtanfxZop32OSaa31qJfVtDOOr45biZVg8X7vOZ7S58LR4Y5p295qrfNSynUWx44my1Btm2a2Y003bTt+1lrfdHZww+r4sZXxgkU/O/ebF3uuLBydvvP3Wp0+vff7miT5sefXXr0Lw1Mp5eBotVg95fUxwnGt1XGrE2XhKF8x2tMkP/Oy5mrYorX3iK8dG3wWK8GCk41WKWXQDvI/rUxpf4uVYMHJRKstCP2T12ck50l+vecsJ4IFh0TrV+eXhnm98DOllMt2zO0hr89ETrJYuuDGfl+Eg+6cQ7QmnbOMSTJq075ZFmf/Vk8OzLNYIW9UJVjwKdEad5Y6JJsXoo6zOF4196kJFkdWSunr0oTLHn+vz/w8Bnm5pGe05a3jNqratrZrIGSCBX0G6jIvC2CXodpknsUq+sdd1zq2le6jUspdFssbhEuw6MHZrXRfCcdF+70vVr7Ovl9vnsXlPJN9DqavWel+277Obz9qgsU7netK9xUPB77/Tdcctjg+5O/Fo2IlWLBXkGellHEWN+vbNIKa5uWaw8lbpm8bHlrx25lDwYJD3bWQTDsjqHkfN9JrU8Cb/L149LcLngWL0zJY2UlPdpSV14tBe1FKucrLMaqladxK5suw0v17Ga7sqN9CKWVUSnnO+ucWDpP8KaXUd7ye/GgZYUEfI6qbrH9wBYIFnx6pYV4eAzb4oC9rzZZgsWGH7Gt1+m273u4spnx5Wem+bjQ1yWLxaF+PAXvIyh1K/WQKFqyLxfJSnOVK98sto57HLNZVTXv8+jcrsbrzGDDBQpiWIequdN9ntftjZ0Q173mbhnlZeJssTlxYt/WRPxce8/VtAjDKywryea31Pye+vfs8+itpi0eXr2NdA9hGds+dYM6zePiF5RBGWBzBV1vSsO3RX5P2PUze+wDXA2K17pbKYiVY7Nh5rpJcvOF6t+6xnpM/5tJ59NeoRWqaxbWC8z0+o8t933tArLrBv7Mq3pSQ3TtO964C0+z5PL52ke9z55fO8onGLVQ3Lc57fz4HxsqTdT6Rle5fRNvx5itTvOfOweltume15mc8lbnojCQPfvTXSqyGWTywQqwEizdG6zqv79M0aDvl7Y4ds3vng8cz/nzGSa5Xon7wZTNt2v2U18fPxEqweMNOeZfXj7ZKmwb9WTfaWh7z6u54Z/75jFeiPmx3E91rCtjeu+62M2IlWLxxp1w+1v1xZTr0VEp5aMesujFbmnyHM1st6t0wX7UFn9titXxmYXc0Os/iTg7WWp0IB92/+h/g+hvRLe9lPlgJ1s/vtCp7zV1Rf63ekbTF/T5/r5h32xnB4kg75iCLFdhXW972WGv99Q0/l+5ZvnkWZ0hnnUeCrfvM7rJYuuCiZlNCjjAFmrdjLD+zZY1VO/P1rT6XLA7CL8MzSPLQLl5+XhOraQua5xYKFh9gms2r2EdZHJj/U0q5eevp/i8YrdXr/dY9v3DWpn//mAKaEvIx0591N6tbrt3adAO7o10ofAKfx0UL0yibn104i1XrgsWnh2o52rqutU7bcoerbH8y8jQvj8qafMHPYXk3h2Febj+z7XsdC5Vg8TE756jtlOvuqjlvo4a7LaOOq+y+bfDyDgizFrHZiXzvqw9WXQZql3kWSx0eTfsEi+PtoIOVkcO2nXPcYjXbc8dfTpku9tzhl8fIlv/ey2U+W9ZIde9/9ZaHtv7/1jOHPGAVwWL3TnvZds6LHHbDulkL1fitx6FavC73COKuEdm6f5/tisWaWw6/1awT1YmRlGBxvGAd8uj35ZOPjzK9afHsjurec0bxetexovb1Dr3mb7Iy6pudyrQVwfouI6ynLTvncsf88ONJK9PSi/baZ/SXJD/2nKI+rPx+s/bqRjrp6T5XCBbvD8P9ys46O/VpTecg+HI6uzTM4hiXi4YRLOD7sdIdECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAvgL/8DyY+d5ecjBDsAAAAASUVORK5CYII=";
		var stringMenuBot = "home,pcategory,member,forum,more";
		var menuDIvBot = document.getElementById("divBottom");
		var strBotHtml = "<table width='100%' height='45' border='0' cellspacing='0' cellpadding='0'><tbody><tr>";
		var splBot = stringMenuBot.split(",");
		for (var i = 0; i < splBot.length; i++) {
			strBotHtml += "<td align='center'><a href='" + (i == 0 ? "" : url_api + splBot[i]) + "'><img src='" + objImg["img" + i] + "' height='40' width='40' alt='' style='padding-top:1px'/></a></td>"
		}
		strBotHtml += "</tr></tbody></table>";
		menuDIvBot.innerHTML = strBotHtml;
		menuDIvBot.style.display = "";
		$("#wrapper").css("bottom", "45px")
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
	var s_t = "<div id='scrollerPullDown' style='background-color:#fff; display:none'>松开后刷新</div>";
	var s_banner = "<div id='wrapper_b'><div><table border='0' cellpadding='0' cellspacing='0' style='line-height:0'><tr></tr></table></div></div><div id='indicator'><div id='dotty'></div></div>";
	var s_service = "<table cellspacing='0' cellpadding='0' width='100%' height='40' style='line-height:0'><tr><td id='tdService' align='center' style='font-size: 12px; border-bottom: 6px solid #f7f7f7'></td></tr></table>";
	var s_class = "<table class ='responsive-table' width='100%' height='80px' border='0' cellspacing='0' cellpadding='0' align='left' style='padding-top:20px; margin: 0px 0px 0px 0px; background-color:#fff'><tbody><tr><td id='smlBtn' style='padding-bottom:0px; padding-left:10px; padding-right:10px'></td></tr></tbody></table>";
	var s_information = "<table width=100% height='50' border='0' cellspacing='0' cellpadding='0'><tr><td bgcolor='#f7f7f7' align='center'><table width=95% height='32' border='0' cellspacing='0' cellpadding='0' style='padding-top:8;border-radius:20px;background-color:#fff;font-size:13px;color:#000'><tr><td><table width=100% height='32' border='0' cellspacing='0' cellpadding='0'><tr><td width='45px' style='padding-left:5px'><a href='" + url_api + "article_m1'><img width='30px' height='30px' style='padding-left:10px;padding-top:3px' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAACXBIWXMAAAsSAAALEgHS3X78AAAIaklEQVRo3u1aTWgbSRZ+r6vVMkZGIsN4WDIgg/cch5l7bBJyijSSlWuwWOeSk7R2cjMIVuBbtF7plMsYbHJNS4qdU7BZ+z6L7fMG1DBmZ5xhRsKydy2p+81B3XF1qVvd+skwG6bAYHdJ1f2q3vve931tBAAGn+iQ4BMen3Rw8qgL7BRT/0KEW0RwCEBH8Wx59bcM4NXzxJwsSwsSYuL07Dz1ZP1t3ZrDUWru5fqDmchU8N/8tauW/vXDZ9XjjxHIy/UHM5MTcjQgS/MAeBsR5gEgbM0TUYnf3JGC2yku5hAxd704HMaz6t1h1qpsJBNMkrJOc4hwx+869fOrPz9ae1PzTMuX6w9mwqHgpts8IswJf0d3iql970foTd/mZfs4MhW8M+rphkNKBgBWPYObnJCjg+waAEQRIeoZGmHPtUdrb2q7pZQG4P19ANCIQAOgf/IXdYOOdZ1qvgCFMen2x4EB+0NZo6MbeSZhVDdIM4zrhwzI0jyf/h3dWE2uVKojoeX5Ras6OSEfidcDspRGxCW+kNsdo+o3tMv/dTSn68mVypZLbSdsJ8SdTr8xMKCYCPkdh1JaLKPOmm1hn0vjRiyjfjaOcxbWhVhG9dXC5EHRzKypD/DbauvLPKBwyKmNK4l54CKCk7E3cSbhnAguRFRKPa0e8IDiVVf8UAuJ+W7P8gZBLtDwTnEx5/WFeLacH4Ch4II9MDg5PWvmeaYgthyvFcXa9Y/ImPPxubyvmqtsJNMyk77lLjX43fQ7Wm39Hn/SYi2NDYsJTuJZ9StpiMCAiIrD3FREyY8RmDlqnmjpFJgZXN5natiGX5QbB1K6AsqLtfuRm9NTm4jwjdP86VmzNH1jkgcSUAJs0wIUIjhpd/QVIVXqwxyBgMAng3zXMbgvv5j6rg8NapiywhbcbinFI+WRgKKjjKiYbiOJ1Y5urPK7xe8YERw7aSqnnB91qIXEvEi4Rw4uuVKp6gY9JaLteFb9CpFHxt4bMIYz/N/tjjGWU5Mk+7q6QdrIaQkAkPhrueiSGhFxR5mECfGh1EKiZ82zny+PeaXsgzjYSoMn02NhKGLKIeKSEmB9G6/MpG+dMHj6xuQ9sVYHIQ6D1rFnnxNTbpRx9vPloPZDhNdwY3e/mIRzY4qtMUhKmm3g1ihE3EdDxNvj8EiGcbX8CNyRgtMNo8okPLJk/G9l2f33qtNQAlJ+FAQeyf36vQ/JS3W7CVe1kJh3aN5DjZfrD2ZerN2PjDs4x5PjuaUoU16s3Y98+cXUO0vyWPJimJub6j6NCN+Ihuo4huxUyEGF7VsPbxLiWWv+T5+H0nYtR5VemtQrdSyjlDN9bIYuIiYAYFUtJOaVANvzqdv6ApzsJesBILpTXMzFs+X8i7X7ESbZpQ4i5pQA86JRD0W+2Wi2tiNTQX6t6KvnibnB7MT+jKWn5h4+qx4T0baQvUkAgJvTodwwCvyHny56kO7R2puaKGGUgJSW0Jcp64ugOwJKo9nKm1YCEMFho3mVUguJeUTMcIJ1W3w4IsqLG0MEr92bN1X42xoEWjxbXo1lVJmI8vxcLKPKolD1ak2Oaflo7U2t+o/FPBHVDYNq4VBwU7DXXjearbzpX9rUAGNSg6GtT265eypGVQmw27phVHsNWRt5OHZq7F7mrGsTP79oVcMhJWfZDN33b1BHhLlG82o1HAqqYooqAaZ2dGO5o9PjLm3DhX62t/mqK+UyPSPKLJHner0qk516Tjik5Bwst3o8q6YqG8m04DjzTlhYZtIrItputY3iw2fV1X4I2Q/1eF5p2YQ8z/VjOch2g5RlHXyTBhEcGEQHu6XUO0HbNa5a+l0lIGX5zUDEpaDClnZLqQYRHLTa+t/MXXZRGF3eaLUUUaQaBI3unE0C1XwH1zVI7YERwet2Ry8qAbbHEMW5k0bzKmX2r+Wd4iI4nHYYAGbe/3JpMnpn+aQbpL16nphz629MwgKTxHbjbTnI3A2qMnN+c0MEh7y9RkTb7Y6xNTkhR9VCImqCyVZAZhFxg1pt/S8WWlqpJ75uNgyqDaob/ZB4ifdNoPtS75CISoiYUQJsTwmwPdE8NdX4nvhjBWbCuEZEeaein5yQo6LCHlQ3+nmNZetz3/94/nV3d4dX312uWc7HMupsPFvOO31GePmhdU+1nLd6mYnMH7IkllFl3aCngyBlD1pyzXaGrzuv/EbENAc0fkwcfn3NJOr7Vg0LmVIDABCYiy9VLnnJ+3ZHL8az5bxukNaFcVwAwAXdIC2eLefN04kM5i2irYfdnJ7aR4Rb4ZCSE2XWtUi1NfXhghNZgGXqMElKm4HfQYQ7ls1m6rDwIIXOnwwiZqzNRMSl0GRgTlQUDsl/NFRwAmo1nqy/rXd5JY+WcGJpvOkbkwNRon6itKMbj0VgEaWSdfKVjWTaS2rJ/dwuIjg2+48qpu1uKfWOiKoulMp1mHqwh6t3dGM5uVKp7hQXN3nm4mb5yUzKAYPobiml1c+v7jltgtzP7UKEKC9chRHlVYKFbF6OFpOwIAZ21dLvXm+KLXPqTr8LgBNtXrbqridn/U9VVyhSjQhPzDoQtZVmgkfYBTXnd4qLudOzZslJ5gQVewb0BiY++HVtGUQHIkuySsRNUkkAAOFQUFUCbI9JWOAL3M4vKR/LqLOxjPpZRzceu8BxFBFzN6dDf3fugXTQLzARKXlw+s/75palMQXrsdgXUPp8QNMNevr9j+e2hpxcqWzFMuqsU5BElI9ny8tOi52eNVfNB+wJzIm58OD0ZP1tvaMby8L9tB9+uqj2db8sR8vsHzWD6OD8olV1RionpyyUQcRcRzceu/0XEF9373+51JxSqQte0ofXQ24Mp7KRTDNJSnBq4w9T9o/g/l/GrwyKT8y4ji4hAAAAAElFTkSuQmCC'></a></td><td style='padding-right:10px'><div id='divInformation'><div></div></div></td></tr></table></td></tr></table></td></tr></table>";
	var s_hb = "<table width=100% border='0' cellspacing='0' cellpadding='0'><tr><td id='banner_center' align='center' style='padding-bottom:8px'></td></tr></table>";
	var s_prd = "<table id='listPrd' width='100%' border='0' cellspacing='0' cellpadding='0' style='padding-bottom:2px'><tbody><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr></tbody></table>";
	var s_rmPrd = "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td id='listCont' style='padding-bottom:6px'></td></tr></tbody></table>";
	var s_b = "<div id='scrollerPullUp' style='background-color:#fff; display:none'></div>";
	document.getElementById("scroller").innerHTML = s_t + s_banner + s_service + s_class + s_information + s_hb + s_prd + s_rmPrd + s_b;
	var pullDownFlag, pullUpFlag;
	var bStartPos = false;
	var pullDown = document.getElementById('scrollerPullDown');
	var pullUp = document.getElementById('scrollerPullUp');
	var myScrollHome = new IScroll('#wrapper', {
		momentum: true,
		bounceTime: 300,
		deceleration: 0.0008,
		probeType: 2,
		scrollbars: true,
		click: true,
		shrinkScrollbars: 'clip',
		fadeScrollbars: true
	});
	myScrollHome.on('scroll', updatePosition);
	myScrollHome.on('scrollEnd', endPosition);
	myScrollHome.on('scrollStart', startPosition);

	function startPosition() {
		bStartPos = true
	}
	function updatePosition() {
		if ((this.y >> 0) > 80) {
			pullDown.style.display = "";
			pullDownFlag = 1
		}
		if ((this.y >> 0) < (this.maxScrollY - 60)) {
			pullUpFlag = 1
		}
		if (this.y < -800) {
			$("#gotop").show()
		}
		if (this.y > -800) {
			$("#gotop").hide()
		}
		if (this.y > 0 && (this.pointY > window.innerHeight - 1) && bStartPos) {
			bStartPos = false;
			this.scrollTo(0, 0, 300)
		}
	}
	function endPosition() {
		if (pullDownFlag == 1) {
			pullDownFlag = 0;
			pullDown.style.display = "none";
			toContent(myScrollHome)
		}
		if (pullUpFlag == 1) {
			pullUpFlag = 0
		}
	}
	$("#gotop").click(function() {
		myScrollHome.scrollTo(0, 0, 400)
	});
	$("#wrapper_b").css({
		"width": winw + "px",
		"height": winw / 2 + "px",
		"background-color": "#fff"
	});

	function isPassive() {
		var supportsPassiveOption = false;
		try {
			addEventListener("test", null, Object.defineProperty({}, 'passive', {
				get: function() {
					supportsPassiveOption = true
				}
			}))
		} catch (e) {}
		return supportsPassiveOption
	}
	document.addEventListener('touchmove', function(e) {
		e.preventDefault()
	}, isPassive() ? {
		capture: false,
		passive: false
	} : false);
	toContent(myScrollHome)
});
var tTimeB, tSS, tRef;

function toContent(obj) {
	console.log("==========begin");
	$.ajax({
		type: 'get',
		url: "https://wonapi.maxleap.cn/1.0/banner/getBanner?where=%7B%22status%22%3A1%2C%22type%22%3A1%7D",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var strGD = "";
			var counter = 0;
			var strUrl = "";
			var parsedJson = eval(data);
			var cssImg = "";
			var cssJJ = "";
			var numJJ = (parseInt($("#indicator").css("width")) - parseInt($("#indicator").css("height"))) / (parsedJson.sort().length - 1);
			$.each(parsedJson.sort(), function(index, item) {
				switch (item.bannerTypes) {
				case 1:
					strUrl = url_api + "product/category/" + item.category.id;
					break;
				case 2:
					strUrl = url_api + "product/" + item.product.id;
					break;
				case 3:
					strUrl = item.custom.urlStr;
					break;
				default:
					break
				}
				strGD += "<td width='" + winw + "px'><a href='" + strUrl + "'><img width='100%' src='" + item.bannerImageUrl + "'></a></td>";
				cssJJ += (cssJJ === "" ? "" : ",") + numJJ * counter + "px 0px"
				cssImg += (cssImg === "" ? "" : ",") + "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAq0lEQVQ4y9WVIRLCMBBFX1chI5E9RmUlx+jRegwkMseoXFlZF8ymw5QApdlhhmczeZP5yf40KSUKBKADWuC8WVNgAiIwbzc2BeHFZHuIwPWV8AQMhRN9QoERWACkUobtGcyxCvuDskdpn4Xhi8ze0QFBnGSrVOxpeNFKZXZPWQrO/IdQHX0qNuheTGID7kUUqyAPaQTmfCm3yiw111gWLlZBelA2/qRgXb6AO9gbMRUJ8W1MAAAAAElFTkSuQmCC)";
				counter++
			});
			$("#indicator").css({
				"background-image": cssImg,
				"background-position": cssJJ,
				"left": (winw - parseInt($("#indicator").css("width"))) / 2 + "px",
				"top": (winw / 2 - 20) + "px"
			});
			document.getElementById("wrapper_b").getElementsByTagName("tr")[0].innerHTML = strGD;
			$("#wrapper_b").children().css("width", parseInt(counter * winw) + "px");
			var pageB = 0;
			var myScrollBanner = new IScroll('#wrapper_b', {
				scrollX: true,
				scrollY: false,
				momentum: false,
				click: false,
				snap: true,
				snapSpeed: 400,
				keyBindings: true,
				indicators: {
					el: document.getElementById('indicator'),
					resize: false
				}
			});
			myScrollBanner.on("scrollEnd", msBEnd);
			myScrollBanner.on("beforeScrollStart", msBStart);
			msBGo();

			function msBGo() {
				if (pageB >= (counter - 1)) {
					myScrollBanner.goToPage(0, 0, 300)
				} else {
					myScrollBanner.next()
				}
			}
			function msBEnd() {
				pageB = myScrollBanner.currentPage.pageX;
				clearTimeout(tTimeB);
				tTimeB = setTimeout(msBGo, 5000)
			}
			function msBStart() {}
		}
	});
	$.ajax({
		type: 'get',
		url: "https://wonapi.maxleap.cn/1.0/cms/59967e2414f6450007c4a0d1",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var parsedJson = eval(data);
			var str = parsedJson.content.toString();
			var arrStr = str.split("<p>")[1].split("</p>")[0];
			document.getElementById("tdService").innerHTML = arrStr
		}
	});
	$.ajax({
		type: 'get',
		url: "https://wonapi.maxleap.cn/1.0/quick/getQuick?where=%7B%22status%22%3A1%7D&skip=0&limit=5&order=+seq",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var strSml = "";
			var counter = 0;
			var strUrl = "";
			var parsedJson = eval(data);
			$.each(parsedJson.sort(), function(index, item) {
				switch (item.quickTypes) {
				case 1:
					strUrl = url_api + "product/category/" + item.category.id;
					break;
				case 2:
					strUrl = item.custom.urlStr;
					break;
				default:
					break
				}
				strSml += "<table class='tabImg' width='66%' border='0' cellspacing='0' cellpadding='0' align='left'><tbody><tr><td align='center'><a href='" + strUrl + "'><img src='" + item.quickImageUrl + "' width='70%' alt='sample'></a></td></tr><tr><td style='font-size:14px; text-align:center; height:30px; padding-bottom:10px'>" + item.quickName + "</td></tr></tbody></table>";
				counter++
			});
			document.getElementById("smlBtn").innerHTML = strSml
		}
	});
	$.ajax({
		type: 'get',
		url: "https://wonapi.maxleap.cn/1.0/cms?where=%7B%22cms_type%22:%7B%22$in%22:%5B%225951db5275c3080007bf2ad6%22%5D%7D,%22valid%22:true%7D&order=-createdAt&skip=0&limit=100",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var parsedJson = eval(data);
			var nums = parsedJson.results.length;
			var strInfor = "<table width='100%' border='0' cellspacing='0' cellpadding='0' bgcolor='#fff'><tbody>";
			$.each(parsedJson.results, function(index, item) {
				strInfor += "<tr><td height='32'><a href='" + url_api + "article_m1/" + item.objectId + "'><span>" + item.title + "</span></a></td></tr>"
			});
			strInfor += "</tbody></table>";
			document.getElementById("divInformation").getElementsByTagName("div")[0].innerHTML = strInfor;
			var myInformation = new IScroll('#divInformation', {
				click: false,
				bounce: false,
				disableMouse: true,
				disablePointer: true,
				disableTouch: true,
				momentum: false,
				fadeScrollbars: false
			});
			myInformation.tig = 0;

			function showInformation() {
				myInformation.tig++;
				if (myInformation.tig == nums) {
					myInformation.tig = 0;
					myInformation.scrollTo(0, -32 * myInformation.tig, 0)
				} else {
					myInformation.scrollTo(0, -32 * myInformation.tig, 400)
				}
				clearTimeout(tSS);
				tSS = setTimeout(showInformation, 5000)
			}
			showInformation();
			for (var i = 0; i < nums; i++) {
				var module = document.getElementById("divInformation").getElementsByTagName("span")[i];
				$clamp(module, {
					clamp: 1
				})
			}
		}
	});
	$.ajax({
		type: 'get',
		url: "https://wonapi.maxleap.cn/1.0/banner/getBanner?where=%7B%22status%22%3A1%2C%22type%22%3A2%7D",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var strGD = "";
			var strUrl = "";
			var parsedJson = eval(data);
			$.each(parsedJson.sort(), function(index, item) {
				switch (item.bannerTypes) {
				case 1:
					strUrl = url_api + "product/category/" + item.category.id;
					break;
				case 2:
					strUrl = url_api + "product/" + item.product.id;
					break;
				case 3:
					strUrl = item.custom.urlStr;
					break;
				default:
					break
				}
				strGD = "<a href='" + strUrl + "'><img width='96%' src='" + item.bannerImageUrl + "'></a>"
			});
			document.getElementById("banner_center").innerHTML = strGD
		}
	});
	$.ajax({
		type: 'get',
		url: "https://wonapi.maxleap.cn/1.0/category?where=%7B%22valid%22%3Atrue%7D&skip=0&limit=6&order=+seq",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var parsedJson = eval(data);
			console.log("商品分类数==" + parsedJson.count + "---" + parsedJson.results.length);
			console.log(parsedJson);
			var ttColor = new Object();
			ttColor.c0 = "#f46464";
			ttColor.c1 = "#d35ed2";
			ttColor.c2 = "#5ba6e9";
			ttColor.c3 = "#57bcd3";
			ttColor.c4 = "#e29854";
			$.each(parsedJson.results, function(index, item) {
				var sUrl = "";
				if (item.secondary.length !== 0) {
					var ids = "";
					for (var i = 0; i < item.secondary.length; i++) {
						ids += (ids == "" ? "" : ",") + item.secondary[i].id
					}
					sUrl = "https://wonapi.maxleap.cn/1.0/category/getSimpleProductsByCategoryIds/client?where=%7B%22valid%22%3Atrue,%22obvious%22%3Atrue%7D&categoryIds=" + ids + "&skip=0&limit=3&order=+obviousSeq"
				} else {
					sUrl = "https://wonapi.maxleap.cn/1.0/category/" + item.id + "/simpleProducts/client?where=%7B%22valid%22%3Atrue,%22obvious%22%3Atrue%7D&skip=0&limit=3&order=+obviousSeq"
				}
				var strPrd = "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='tdkj1' id='prd_" + index + "'><tbody>";
				strPrd += "<tr align='center' style='line-height: 0px'><td class='tdkj2' width='33%'>&nbsp;</td><td class='tdkj2' width='33%'>&nbsp;</td><td class='tdkj2' width='33%'>&nbsp;</td></tr>";
				strPrd += "<tr align='center' height='20px' bgcolor='#fff' style='font-size: 11px; color: #000'><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td></tr>";
				strPrd += "<tr align='center' height='20px' style='font-size: 10px; color: #000; line-height:15px'><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td></tr>";
				strPrd += "</tbody></table>";
				$("#listPrd").find("td.1").eq(index * 2 + 1).html(strPrd);
				toShowPrd(sUrl, index)
			});

			function toShowPrd(url, num) {
				$.ajax({
					type: 'get',
					url: url,
					dataType: "json",
					headers: {
						'X-ML-AppId': AppId
					},
					success: function(data) {
						var parJS = eval(data);
						$.each(parJS.results, function(index, item) {
							var priceOld = (item.originalPrice * 0.01).toFixed(0);
							var priceNow = (item.price * 0.01).toFixed(0);
							$("#prd_" + num).find("tr").eq(0).children("td").eq(index).html("<a href='" + url_api + "product/" + item.id + "'><img src='" + item.coverIcon + "' width='100%'></a>");
							$("#prd_" + num).find("tr").eq(1).children("td").eq(index).html("<span id='prdTit_" + num + "_" + index + "'>" + item.title + "</span>");
							var module = document.getElementById("prdTit_" + num + "_" + index);
							$clamp(module, {
								clamp: 2
							});
							var strPrice;
							if (item.panicSwitch === true) {
								if (item.promotionType === 0) {
									var priceQG = (item.panicPrice * 0.01).toFixed(0);
									strPrice = "<span style='color: #ff3300'>抢购价:￥</span><span style='font-size: 15px; color: #ff3300'>" + priceQG + "</span><br><span style='font-size: 10px'><s>原价:￥" + priceNow + "</s></span>"
								} else if (item.promotionType === 1) {
									var pricePT = (item.groupPrice * 0.01).toFixed(0);
									var numPT = item.groupPerson;
									strPrice = "<span style='color: #ff3300'>团价:￥</span><span style='font-size: 12px; color: #ff3300'>" + pricePT + "</span>&nbsp;&nbsp;<b>" + numPT + "人团</b><br><span style='font-size: 10px'><s>单价:￥" + priceNow + "</s></span>"
								}
							} else {
								if (priceOld !== priceNow) {
									strPrice = "<span style='font-size: 10px; color: #000'>￥</span><span style='font-size: 15px; color: #000'>" + priceNow + "</span>&nbsp;<span style='font-size: 10px; color: #999'><s>￥" + priceOld + "</s></span>"
								} else {
									strPrice = "<span style='font-size: 10px; color: #000'>￥</span><span style='font-size: 15px; color: #000'>" + priceNow + "</span>"
								}
							}
							$("#prd_" + num).find("tr").eq(2).children("td").eq(index).html(strPrice)
						})
					}
				})
			}
		}
	});
	$.ajax({
		type: 'get',
		url: "https://wonapi.maxleap.cn/1.0/banner/getBanner?where=%7B%22status%22%3A2%2C%22type%22%3A1%7D&skip=0&limit=6&order=+sort",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var parsedJson = eval(data);
			$.each(parsedJson.sort(), function(index, item) {
				switch (item.bannerTypes) {
				case 1:
					strUrl = url_api + "product/category/" + item.category.id;
					break;
				case 2:
					strUrl = url_api + "product/" + item.product.id;
					break;
				case 3:
					strUrl = item.custom.urlStr;
					break;
				default:
					break
				}
				$("#listPrd").find("td.1").eq(index * 2).css("line-height", 0);
				$("#listPrd").find("td.1").eq(index * 2).html("<a href='" + strUrl + "'><img width='96%' src='" + item.bannerImageUrl + "'></a>")
			})
		}
	});
	$.ajax({
		type: 'get',
		url: "https://wonapi.maxleap.cn/1.0/recommendArea/findRecommendAreaAndProductByRecommendArea/client/home_bottom?where=%7B%22enable%22%3Atrue%7D&productLimit=100",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var strList = "";
			var parsedJson = eval(data);
			$.each(parsedJson.products, function(index, item) {
				var priceOld = (item.originalPrice * 0.01).toFixed(2);
				var priceNow = (item.price * 0.01).toFixed(2);
				var imgPrd = (item.widePic == "" ? item.coverIcon : item.widePic);
				var wid = (item.widePic == "" ? "52%" : "100%");
				strList += "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td colspan='2' align='center' bgcolor='#FFFFFF'><a href='" + url_api + "product/" + item.id + "'><img src='" + imgPrd + "' width='" + wid + "'></a></td></tr><tr><td width='68%' align='left' style='font-size:14px;padding:5px 10px'><b>" + item.title + "</b></td><td align='right' style='font-size:13px;padding-right:10px;text-decoration:line-through'>" + (priceOld == priceNow ? "" : "￥：" + priceOld) + "</td></tr><tr><td id='prd" + item.id + "' align='right' style='font-size:14px;color:#CC0003;padding-right:10px;padding-top:5px' colspan='2'><b>￥：" + priceNow + "</b></td></tr></tbody></table>"
			});
			document.getElementById("listCont").innerHTML = strList
		}
	});
	toRefresh();

	function toRefresh() {
		if (contentH !== parseInt($("#scroller").css("height"))) {
			contentH = parseInt($("#scroller").css("height"));
			obj.refresh();
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
};

function showObj(obj) {
	var s;
	for (var i in obj) {
		if (typeof(obj[i]) == "function") {} else {
			s += i + "=" + obj[i] + ";  "
		}
	}
	alert(s)
};