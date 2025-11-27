var snowStorm = function(a, b) {
	function w() {
		a.setTimeout(function() {
			c.start(true)
		}, 20);
		c.events.remove(a, "load", w)
	}
	function v(a) {
		return parseInt(u(2), 10) === 1 ? a * -1 : a
	}
	function u(a, b) {
		if (isNaN(b)) {
			b = 0
		}
		return Math.random() * a + b
	}
	this.flakesMax = 100;
	this.flakesMaxActive = 60;
	this.animationInterval = 103;
	this.flakeBottom = null;
	this.followMouse = false;
	this.snowColor = "#fff";
	this.snowCharacter = "";
	this.snowStick = true;
	this.targetElement = null;
	this.useMeltEffect = true;
	this.freezeOnBlur = true;
	this.flakeLeftOffset = 0;
	this.flakeRightOffset = 0;
	this.flakeWidth = 16;
	this.flakeHeight = 18;
	this.vMaxX = 6;
	this.vMaxY = 6;
	this.zIndex = 10;
	var c = this,
		d = this,
		e, f = navigator.userAgent.match(/msie/i),
		g = f && b.compatMode === "BackCompat",
		h = null,
		i = null,
		j = null,
		k = null,
		l = null,
		m = null,
		n = 1,
		o = 2,
		p = 6,
		q = false,
		r = function() {
			try {
				b.createElement("div").style.opacity = "0.5"
			} catch (a) {
				return false
			}
			return true
		}(),
		s = false,
		t = b.createDocumentFragment();
	this.timers = [];
	this.flakes = [];
	this.disabled = false;
	this.active = false;
	this.meltFrameCount = 20;
	this.meltFrames = [];
	this.events = function() {
		function h() {
			f(e(arguments), "remove")
		}
		function g() {
			f(e(arguments), "add")
		}
		function f(a, c) {
			var e = a.shift()[d[c]];
			if (b) {
				e(a[0], a[1])
			} else {
				e.apply(this, a)
			}
		}
		function e(a) {
			var d = c.call(a),
				e = d.length;
			if (b) {
				d[1] = "on" + d[1];
				if (e > 3) {
					d.pop()
				}
			} else if (e === 3) {
				d.push(false)
			}
			return d
		}
		var b = a.attachEvent,
			c = Array.prototype.slice,
			d = {
				add: b ? "attachEvent" : "addEventListener",
				remove: b ? "detachEvent" : "removeEventListener"
			};
		return {
			add: g,
			remove: h
		}
	}();
	this.randomizeWind = function() {
		l = v(u(c.vMaxX, .2));
		m = u(c.vMaxY, .2);
		if (this.flakes) {
			for (var a = 0; a < this.flakes.length; a++) {
				if (this.flakes[a].active) {
					this.flakes[a].setVelocities()
				}
			}
		}
	};
	this.scrollHandler = function() {
		k = c.flakeBottom ? 0 : parseInt(a.scrollY || b.documentElement.scrollTop || b.body.scrollTop, 10);
		if (isNaN(k)) {
			k = 0
		}
	};
	this.resizeHandler = function() {
		if (a.innerWidth || a.innerHeight) {
			h = a.innerWidth - (!f ? 16 : 2) - c.flakeRightOffset;
			j = c.flakeBottom ? c.flakeBottom : a.innerHeight
		} else {
			h = (b.documentElement.clientWidth || b.body.clientWidth || b.body.scrollWidth) - (!f ? 8 : 0) - c.flakeRightOffset;
			j = c.flakeBottom ? c.flakeBottom : b.documentElement.clientHeight || b.body.clientHeight || b.body.scrollHeight
		}
		i = parseInt(h / 2, 10)
	};
	this.resizeHandlerAlt = function() {
		h = c.targetElement.offsetLeft + c.targetElement.offsetWidth - c.flakeRightOffset;
		j = c.flakeBottom ? c.flakeBottom : c.targetElement.offsetTop + c.targetElement.offsetHeight;
		i = parseInt(h / 2, 10)
	};
	this.freeze = function() {
		if (!c.disabled) {
			c.disabled = 1
		} else {
			return false
		}
		for (var a = c.timers.length; a--;) {
			clearInterval(c.timers[a])
		}
	};
	this.resume = function() {
		if (c.disabled) {
			c.disabled = 0
		} else {
			return false
		}
		c.timerInit()
	};
	this.SnowFlake = function(a, c, d, e) {
		var f = this,
			g = a;
		this.type = c;
		this.x = d || parseInt(u(h - 20), 10);
		this.y = !isNaN(e) ? e : -u(j) - 12;
		this.vX = null;
		this.vY = null;
		this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8];
		this.vAmp = this.vAmpTypes[this.type];
		this.melting = false;
		this.meltFrameCount = g.meltFrameCount;
		this.meltFrames = g.meltFrames;
		this.meltFrame = 0;
		this.twinkleFrame = 0;
		this.active = 1;
		this.o = b.createElement("img");
		this.o.style.color = g.snowColor;
		this.o.style.position = q ? "fixed" : "absolute";
		var i = Math.floor(Math.random() * 9) + 7;
		this.o.style.width = i;
		this.width = i;
		this.o.style.overflow = "hidden";
		this.o.style.zIndex = g.zIndex;
		this.o.src = "http://ctsv.ispace.edu.vn/themes/noel/images/snow_flake.png";
		t.appendChild(this.o);
		this.refresh = function() {
			if (isNaN(f.x) || isNaN(f.y)) {
				return false
			}
			f.o.style.left = f.x + "px";
			f.o.style.top = f.y + "px"
		};
		this.vCheck = function() {
			if (f.vX >= 0 && f.vX < .2) {
				f.vX = .2
			} else if (f.vX < 0 && f.vX > -.2) {
				f.vX = -.2
			}
			if (f.vY >= 0 && f.vY < .2) {
				f.vY = .2
			}
		};
		this.move = function() {
			var a = f.vX * n,
				b;
			f.x += a;
			f.y += f.vY * f.vAmp;
			if (f.x >= h || h - f.x < g.flakeWidth) {
				f.x = 0
			} else if (a < 0 && f.x - g.flakeLeftOffset < 0 - g.flakeWidth) {
				f.x = h - g.flakeWidth - 1
			}
			f.refresh();
			b = j + k - f.y;
			if (b < g.flakeWidth) {
				f.active = 0;
				if (!g.snowStick) {
					f.recycle()
				}
			} else {
				if (g.useMeltEffect && f.active && f.type < 3 && !f.melting && Math.random() > .998) {
					f.melting = true;
					f.melt()
				}
			}
		};
		this.setVelocities = function() {
			f.vX = l + u(g.vMaxX * .12, .1);
			f.vY = m + u(g.vMaxY * .12, .1)
		};
		this.setOpacity = function(a, b) {
			if (!r) {
				return false
			}
			a.style.opacity = b
		};
		this.melt = function() {
			if (!g.useMeltEffect || !f.melting) {
				f.recycle()
			} else {
				if (f.meltFrame < f.meltFrameCount) {
					f.meltFrame++;
					f.setOpacity(f.o, f.meltFrames[f.meltFrame])
				} else {
					f.recycle()
				}
			}
		};
		this.recycle = function() {
			f.o.style.display = "none";
			f.o.style.position = q ? "fixed" : "absolute";
			f.o.style.bottom = "auto";
			f.setVelocities();
			f.vCheck();
			f.meltFrame = 0;
			f.melting = false;
			f.setOpacity(f.o, 1);
			f.o.style.padding = "10px";
			f.o.style.margin = "0px";
			var a = Math.floor(Math.random() * 9) + 7;
			f.o.style.width = a;
			f.o.style.textAlign = "center";
			f.o.style.verticalAlign = "baseline";
			f.x = parseInt(u(h - g.flakeWidth - 20), 10);
			f.y = parseInt(u(j) * -1, 10) - a;
			f.refresh();
			f.o.style.display = "block";
			f.active = 1
		};
		this.recycle();
		this.refresh()
	};
	this.snow = function() {
		var a = 0,
			b = 0,
			d = 0,
			e = null,
			f;
		for (f = c.flakes.length; f--;) {
			if (c.flakes[f].active === 1) {
				c.flakes[f].move();
				a++
			} else if (c.flakes[f].active === 0) {
				b++
			} else {
				d++
			}
			if (c.flakes[f].melting) {
				c.flakes[f].melt()
			}
		}
		if (a < c.flakesMaxActive) {
			e = c.flakes[parseInt(u(c.flakes.length), 10)];
			if (e.active === 0) {
				e.melting = true
			}
		}
	};
	this.mouseMove = function(a) {
		if (!c.followMouse) {
			return true
		}
		var b = parseInt(a.clientX, 10);
		if (b < i) {
			n = -o + b / i * o
		} else {
			b -= i;
			n = b / i * o
		}
	};
	this.createSnow = function(a, b) {
		for (var e = 0; e < a; e++) {
			c.flakes[c.flakes.length] = new c.SnowFlake(c, parseInt(u(p), 10));
			if (b || e > c.flakesMaxActive) {
				c.flakes[c.flakes.length - 1].active = -1
			}
		}
		d.targetElement.appendChild(t)
	};
	this.timerInit = function() {
		c.timers = setInterval(c.snow, c.animationInterval)
	};
	this.init = function() {
		for (var d = 0; d < c.meltFrameCount; d++) {
			c.meltFrames.push(1 - d / c.meltFrameCount)
		}
		c.randomizeWind();
		c.createSnow(c.flakesMax);
		c.events.add(a, "resize", c.resizeHandler);
		c.events.add(a, "scroll", c.scrollHandler);
		if (c.freezeOnBlur) {
			if (f) {
				c.events.add(b, "focusout", c.freeze);
				c.events.add(b, "focusin", c.resume)
			} else {
				c.events.add(a, "blur", c.freeze);
				c.events.add(a, "focus", c.resume)
			}
		}
		c.resizeHandler();
		c.scrollHandler();
		if (c.followMouse) {
			c.events.add(f ? b : a, "mousemove", c.mouseMove)
		}
		c.animationInterval = Math.max(20, c.animationInterval);
		c.timerInit()
	};
	this.start = function(a) {
		if (!s) {
			s = true
		} else if (a) {
			return true
		}
		if (typeof c.targetElement === "string") {
			var d = c.targetElement;
			c.targetElement = b.getElementById(d);
			if (!c.targetElement) {
				throw new Error('Snowstorm: Unable to get targetElement "' + d + '"')
			}
		}
		if (!c.targetElement) {
			c.targetElement = !f ? b.documentElement ? b.documentElement : b.body : b.body
		}
		if (c.targetElement !== b.documentElement && c.targetElement !== b.body) {
			c.resizeHandler = c.resizeHandlerAlt
		}
		c.resizeHandler();
		if (h && j && !c.disabled) {
			c.init();
			c.active = true
		}
	};
	c.events.add(a, "load", w, false);
	return this
}(window, document);
var animateXmas = function(a, b) {
	function i() {
		var j = b.createElement("div");
		j.style.background = "url(" + c + ")";
		j.style.height = e + "px";
		j.style.width = d + "px";
		j.style.position = "fixed";
		j.style.bottom = "0px";
		j.style.zIndex = 10;
		b.body.appendChild(j);
		var k = 0;
		var l = 0;
		var m = 0;
		var n = g;
		var o = 0;
		setInterval(function() {
			m++;
			if (m == 2) {
				m = 0;
				k = k == f ? 0 : k + 1;
				j.style.backgroundPosition = o + "px " + -(e * k) + "px"
			}
			l = l + n;
			j.style.left = l + n;
			if (l + n > b.documentElement.offsetWidth) {
				o = d;
				n = -g
			}
			if (l + n < 0 - d) {
				o = 0;
				n = g
			}
		}, 50);
		h.events.remove(a, "load", i)
	}
	var c = "http://ctsv.ispace.edu.vn/themes/noel/images/Santa_text.png";
	var d = 620;
	var e = 100;
	var f = 6;
	var g = 4;
	var h = this;
	this.events = function() {
		function h() {
			f(e(arguments), "remove")
		}
		function g() {
			f(e(arguments), "add")
		}
		function f(a, c) {
			var e = a.shift()[d[c]];
			if (b) {
				e(a[0], a[1])
			} else {
				e.apply(this, a)
			}
		}
		function e(a) {
			var d = c.call(a),
				e = d.length;
			if (b) {
				d[1] = "on" + d[1];
				if (e > 3) {
					d.pop()
				}
			} else if (e === 3) {
				d.push(false)
			}
			return d
		}
		var b = a.attachEvent,
			c = Array.prototype.slice,
			d = {
				add: b ? "attachEvent" : "addEventListener",
				remove: b ? "detachEvent" : "removeEventListener"
			};
		return {
			add: g,
			remove: h
		}
	}();
	h.events.add(a, "load", i, false);
	return this
}(window, document)