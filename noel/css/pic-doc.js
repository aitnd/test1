/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if (typeof deconcept == "undefined") {
	var deconcept = new Object();
}
if (typeof deconcept.util == "undefined") {
	deconcept.util = new Object();
}
if (typeof deconcept.SWFObjectUtil == "undefined") {
	deconcept.SWFObjectUtil = new Object();
}
deconcept.SWFObject = function(_1, id, w, h, _5, c, _7, _8, _9, _a) {
	if (!document.getElementById) {
		return;
	}
	this.DETECT_KEY = _a ? _a : "detectflash";
	this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
	this.params = new Object();
	this.variables = new Object();
	this.attributes = new Array();
	if (_1) {
		this.setAttribute("swf", _1);
	}
	if (id) {
		this.setAttribute("id", id);
	}
	if (w) {
		this.setAttribute("width", w);
	}
	if (h) {
		this.setAttribute("height", h);
	}
	if (_5) {
		this.setAttribute("version", new deconcept.PlayerVersion(_5.toString().split(".")));
	}
	this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
	if (!window.opera && document.all && this.installedVer.major > 7) {
		deconcept.SWFObject.doPrepUnload = true;
	}
	if (c) {
		this.addParam("bgcolor", c);
	}
	var q = _7 ? _7 : "high";
	this.addParam("quality", q);
	this.setAttribute("useExpressInstall", false);
	this.setAttribute("doExpressInstall", false);
	var _c = (_8) ? _8 : window.location;
	this.setAttribute("xiRedirectUrl", _c);
	this.setAttribute("redirectUrl", "");
	if (_9) {
		this.setAttribute("redirectUrl", _9);
	}
};
deconcept.SWFObject.prototype = {
	useExpressInstall: function(_d) {
		this.xiSWFPath = !_d ? "expressinstall.swf" : _d;
		this.setAttribute("useExpressInstall", true);
	},
	setAttribute: function(_e, _f) {
		this.attributes[_e] = _f;
	},
	getAttribute: function(_10) {
		return this.attributes[_10];
	},
	addParam: function(_11, _12) {
		this.params[_11] = _12;
	},
	getParams: function() {
		return this.params;
	},
	addVariable: function(_13, _14) {
		this.variables[_13] = _14;
	},
	getVariable: function(_15) {
		return this.variables[_15];
	},
	getVariables: function() {
		return this.variables;
	},
	getVariablePairs: function() {
		var _16 = new Array();
		var key;
		var _18 = this.getVariables();
		for (key in _18) {
			_16[_16.length] = key + "=" + _18[key];
		}
		return _16;
	},
	getSWFHTML: function() {
		var _19 = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "PlugIn");
				this.setAttribute("swf", this.xiSWFPath);
			}
			_19 = "<embed type=\"application/x-shockwave-flash\" src=\"" + this.getAttribute("swf") + "\" width=\"" + this.getAttribute("width") + "\" height=\"" + this.getAttribute("height") + "\" style=\"" + this.getAttribute("style") + "\"";
			_19 += " id=\"" + this.getAttribute("id") + "\" name=\"" + this.getAttribute("id") + "\" ";
			var _1a = this.getParams();
			for (var key in _1a) {
				_19 += [key] + "=\"" + _1a[key] + "\" ";
			}
			var _1c = this.getVariablePairs().join("&");
			if (_1c.length > 0) {
				_19 += "flashvars=\"" + _1c + "\"";
			}
			_19 += "/>";
		} else {
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "ActiveX");
				this.setAttribute("swf", this.xiSWFPath);
			}
			_19 = "<object id=\"" + this.getAttribute("id") + "\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\"" + this.getAttribute("width") + "\" height=\"" + this.getAttribute("height") + "\" style=\"" + this.getAttribute("style") + "\">";
			_19 += "<param name=\"movie\" value=\"" + this.getAttribute("swf") + "\" />";
			var _1d = this.getParams();
			for (var key in _1d) {
				_19 += "<param name=\"" + key + "\" value=\"" + _1d[key] + "\" />";
			}
			var _1f = this.getVariablePairs().join("&");
			if (_1f.length > 0) {
				_19 += "<param name=\"flashvars\" value=\"" + _1f + "\" />";
			}
			_19 += "</object>";
		}
		return _19;
	},
	write: function(_20) {
		if (this.getAttribute("useExpressInstall")) {
			var _21 = new deconcept.PlayerVersion([6, 0, 65]);
			if (this.installedVer.versionIsValid(_21) && !this.installedVer.versionIsValid(this.getAttribute("version"))) {
				this.setAttribute("doExpressInstall", true);
				this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl")));
				document.title = document.title.slice(0, 47) + " - Flash Player Installation";
				this.addVariable("MMdoctitle", document.title);
			}
		}
		if (this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version"))) {
			var n = (typeof _20 == "string") ? document.getElementById(_20) : _20;
			n.innerHTML = this.getSWFHTML();
			return true;
		} else {
			if (this.getAttribute("redirectUrl") != "") {
				document.location.replace(this.getAttribute("redirectUrl"));
			}
		}
		return false;
	}
};
deconcept.SWFObjectUtil.getPlayerVersion = function() {
	var _23 = new deconcept.PlayerVersion([0, 0, 0]);
	if (navigator.plugins && navigator.mimeTypes.length) {
		var x = navigator.plugins["Shockwave Flash"];
		if (x && x.description) {
			_23 = new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
		}
	} else {
		if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) {
			var axo = 1;
			var _26 = 3;
			while (axo) {
				try {
					_26++;
					axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + _26);
					_23 = new deconcept.PlayerVersion([_26, 0, 0]);
				} catch (e) {
					axo = null;
				}
			}
		} else {
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			} catch (e) {
				try {
					var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
					_23 = new deconcept.PlayerVersion([6, 0, 21]);
					axo.AllowScriptAccess = "always";
				} catch (e) {
					if (_23.major == 6) {
						return _23;
					}
				}
				try {
					axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				} catch (e) {}
			}
			if (axo != null) {
				_23 = new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
			}
		}
	}
	return _23;
};
deconcept.PlayerVersion = function(_29) {
	this.major = _29[0] != null ? parseInt(_29[0]) : 0;
	this.minor = _29[1] != null ? parseInt(_29[1]) : 0;
	this.rev = _29[2] != null ? parseInt(_29[2]) : 0;
};
deconcept.PlayerVersion.prototype.versionIsValid = function(fv) {
	if (this.major < fv.major) {
		return false;
	}
	if (this.major > fv.major) {
		return true;
	}
	if (this.minor < fv.minor) {
		return false;
	}
	if (this.minor > fv.minor) {
		return true;
	}
	if (this.rev < fv.rev) {
		return false;
	}
	return true;
};
deconcept.util = {
	getRequestParameter: function(_2b) {
		var q = document.location.search || document.location.hash;
		if (_2b == null) {
			return q;
		}
		if (q) {
			var _2d = q.substring(1).split("&");
			for (var i = 0; i < _2d.length; i++) {
				if (_2d[i].substring(0, _2d[i].indexOf("=")) == _2b) {
					return _2d[i].substring((_2d[i].indexOf("=") + 1));
				}
			}
		}
		return "";
	}
};
deconcept.SWFObjectUtil.cleanupSWFs = function() {
	var _2f = document.getElementsByTagName("OBJECT");
	for (var i = _2f.length - 1; i >= 0; i--) {
		_2f[i].style.display = "none";
		for (var x in _2f[i]) {
			if (typeof _2f[i][x] == "function") {
				_2f[i][x] = function() {};
			}
		}
	}
};
if (deconcept.SWFObject.doPrepUnload) {
	if (!deconcept.unloadSet) {
		deconcept.SWFObjectUtil.prepUnload = function() {
			__flash_unloadHandler = function() {};
			__flash_savedUnloadHandler = function() {};
			window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs);
		};
		window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload);
		deconcept.unloadSet = true;
	}
}
if (!document.getElementById && document.all) {
	document.getElementById = function(id) {
		return document.all[id];
	};
}
var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject;
var SWFObject = deconcept.SWFObject;
/*  Prototype JavaScript framework, version 1.5.1
 *  (c) 2005-2007 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
/*--------------------------------------------------------------------------*/
var Prototype = {
	Version: '1.5.1',
	Browser: {
		IE: !! (window.attachEvent && !window.opera),
		Opera: !! window.opera,
		WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
		Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1
	},
	BrowserFeatures: {
		XPath: !! document.evaluate,
		ElementExtensions: !! window.HTMLElement,
		SpecificElementExtensions: (document.createElement('div').__proto__ !== document.createElement('form').__proto__)
	},
	ScriptFragment: '<script[^>]*>([\u0001-\uFFFF]*?)</script>',
	JSONFilter: /^\/\*-secure-\s*(.*)\s*\*\/\s*$/,
	emptyFunction: function() {},
	K: function(x) {
		return x
	}
}
var Class = {
	create: function() {
		return function() {
			this.initialize.apply(this, arguments);
		}
	}
}
var Abstract = new Object();
Object.extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
	return destination;
}
Object.extend(Object, {
	inspect: function(object) {
		try {
			if (object === undefined) return 'undefined';
			if (object === null) return 'null';
			return object.inspect ? object.inspect() : object.toString();
		} catch (e) {
			if (e instanceof RangeError) return '...';
			throw e;
		}
	},
	toJSON: function(object) {
		var type = typeof object;
		switch (type) {
		case 'undefined':
		case 'function':
		case 'unknown':
			return;
		case 'boolean':
			return object.toString();
		}
		if (object === null) return 'null';
		if (object.toJSON) return object.toJSON();
		if (object.ownerDocument === document) return;
		var results = [];
		for (var property in object) {
			var value = Object.toJSON(object[property]);
			if (value !== undefined) results.push(property.toJSON() + ': ' + value);
		}
		return '{' + results.join(', ') + '}';
	},
	keys: function(object) {
		var keys = [];
		for (var property in object)
		keys.push(property);
		return keys;
	},
	values: function(object) {
		var values = [];
		for (var property in object)
		values.push(object[property]);
		return values;
	},
	clone: function(object) {
		return Object.extend({}, object);
	}
});
Function.prototype.bind = function() {
	var __method = this,
		args = $A(arguments),
		object = args.shift();
	return function() {
		return __method.apply(object, args.concat($A(arguments)));
	}
}
Function.prototype.bindAsEventListener = function(object) {
	var __method = this,
		args = $A(arguments),
		object = args.shift();
	return function(event) {
		return __method.apply(object, [event || window.event].concat(args));
	}
}
Object.extend(Number.prototype, {
	toColorPart: function() {
		return this.toPaddedString(2, 16);
	},
	succ: function() {
		return this + 1;
	},
	times: function(iterator) {
		$R(0, this, true).each(iterator);
		return this;
	},
	toPaddedString: function(length, radix) {
		var string = this.toString(radix || 10);
		return '0'.times(length - string.length) + string;
	},
	toJSON: function() {
		return isFinite(this) ? this.toString() : 'null';
	}
});
Date.prototype.toJSON = function() {
	return '"' + this.getFullYear() + '-' + (this.getMonth() + 1).toPaddedString(2) + '-' + this.getDate().toPaddedString(2) + 'T' + this.getHours().toPaddedString(2) + ':' + this.getMinutes().toPaddedString(2) + ':' + this.getSeconds().toPaddedString(2) + '"';
};
var Try = {
	these: function() {
		var returnValue;
		for (var i = 0, length = arguments.length; i < length; i++) {
			var lambda = arguments[i];
			try {
				returnValue = lambda();
				break;
			} catch (e) {}
		}
		return returnValue;
	}
} /*--------------------------------------------------------------------------*/
var PeriodicalExecuter = Class.create();
PeriodicalExecuter.prototype = {
	initialize: function(callback, frequency) {
		this.callback = callback;
		this.frequency = frequency;
		this.currentlyExecuting = false;
		this.registerCallback();
	},
	registerCallback: function() {
		this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
	},
	stop: function() {
		if (!this.timer) return;
		clearInterval(this.timer);
		this.timer = null;
	},
	onTimerEvent: function() {
		if (!this.currentlyExecuting) {
			try {
				this.currentlyExecuting = true;
				this.callback(this);
			} finally {
				this.currentlyExecuting = false;
			}
		}
	}
}
Object.extend(String, {
	interpret: function(value) {
		return value == null ? '' : String(value);
	},
	specialChar: {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'\\': '\\\\'
	}
});
Object.extend(String.prototype, {
	gsub: function(pattern, replacement) {
		var result = '',
			source = this,
			match;
		replacement = arguments.callee.prepareReplacement(replacement);
		while (source.length > 0) {
			if (match = source.match(pattern)) {
				result += source.slice(0, match.index);
				result += String.interpret(replacement(match));
				source = source.slice(match.index + match[0].length);
			} else {
				result += source, source = '';
			}
		}
		return result;
	},
	sub: function(pattern, replacement, count) {
		replacement = this.gsub.prepareReplacement(replacement);
		count = count === undefined ? 1 : count;
		return this.gsub(pattern, function(match) {
			if (--count < 0) return match[0];
			return replacement(match);
		});
	},
	scan: function(pattern, iterator) {
		this.gsub(pattern, iterator);
		return this;
	},
	truncate: function(length, truncation) {
		length = length || 30;
		truncation = truncation === undefined ? '...' : truncation;
		return this.length > length ? this.slice(0, length - truncation.length) + truncation : this;
	},
	strip: function() {
		return this.replace(/^\s+/, '').replace(/\s+$/, '');
	},
	stripTags: function() {
		return this.replace(/<\/?[^>]+>/gi, '');
	},
	stripScripts: function() {
		return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
	},
	extractScripts: function() {
		var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
		var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
		return (this.match(matchAll) || []).map(function(scriptTag) {
			return (scriptTag.match(matchOne) || ['', ''])[1];
		});
	},
	evalScripts: function() {
		return this.extractScripts().map(function(script) {
			return eval(script)
		});
	},
	escapeHTML: function() {
		var self = arguments.callee;
		self.text.data = this;
		return self.div.innerHTML;
	},
	unescapeHTML: function() {
		var div = document.createElement('div');
		div.innerHTML = this.stripTags();
		return div.childNodes[0] ? (div.childNodes.length > 1 ? $A(div.childNodes).inject('', function(memo, node) {
			return memo + node.nodeValue
		}) : div.childNodes[0].nodeValue) : '';
	},
	toQueryParams: function(separator) {
		var match = this.strip().match(/([^?#]*)(#.*)?$/);
		if (!match) return {};
		return match[1].split(separator || '&').inject({}, function(hash, pair) {
			if ((pair = pair.split('='))[0]) {
				var key = decodeURIComponent(pair.shift());
				var value = pair.length > 1 ? pair.join('=') : pair[0];
				if (value != undefined) value = decodeURIComponent(value);
				if (key in hash) {
					if (hash[key].constructor != Array) hash[key] = [hash[key]];
					hash[key].push(value);
				} else hash[key] = value;
			}
			return hash;
		});
	},
	toArray: function() {
		return this.split('');
	},
	succ: function() {
		return this.slice(0, this.length - 1) + String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
	},
	times: function(count) {
		var result = '';
		for (var i = 0; i < count; i++) result += this;
		return result;
	},
	camelize: function() {
		var parts = this.split('-'),
			len = parts.length;
		if (len == 1) return parts[0];
		var camelized = this.charAt(0) == '-' ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1) : parts[0];
		for (var i = 1; i < len; i++)
		camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
		return camelized;
	},
	capitalize: function() {
		return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
	},
	underscore: function() {
		return this.gsub(/::/, '/').gsub(/([A-Z]+)([A-Z][a-z])/, '#{1}_#{2}').gsub(/([a-z\d])([A-Z])/, '#{1}_#{2}').gsub(/-/, '_').toLowerCase();
	},
	dasherize: function() {
		return this.gsub(/_/, '-');
	},
	inspect: function(useDoubleQuotes) {
		var escapedString = this.gsub(/[\x00-\x1f\\]/, function(match) {
			var character = String.specialChar[match[0]];
			return character ? character : '\\u00' + match[0].charCodeAt().toPaddedString(2, 16);
		});
		if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
		return "'" + escapedString.replace(/'/g, '\\\'') + "'";
	},
	toJSON: function() {
		return this.inspect(true);
	},
	unfilterJSON: function(filter) {
		return this.sub(filter || Prototype.JSONFilter, '#{1}');
	},
	evalJSON: function(sanitize) {
		var json = this.unfilterJSON();
		try {
			if (!sanitize || (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(json))) return eval('(' + json + ')');
		} catch (e) {}
		throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
	},
	include: function(pattern) {
		return this.indexOf(pattern) > -1;
	},
	startsWith: function(pattern) {
		return this.indexOf(pattern) === 0;
	},
	endsWith: function(pattern) {
		var d = this.length - pattern.length;
		return d >= 0 && this.lastIndexOf(pattern) === d;
	},
	empty: function() {
		return this == '';
	},
	blank: function() {
		return /^\s*$/.test(this);
	}
});
if (Prototype.Browser.WebKit || Prototype.Browser.IE) Object.extend(String.prototype, {
	escapeHTML: function() {
		return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	},
	unescapeHTML: function() {
		return this.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
	}
});
String.prototype.gsub.prepareReplacement = function(replacement) {
	if (typeof replacement == 'function') return replacement;
	var template = new Template(replacement);
	return function(match) {
		return template.evaluate(match)
	};
}
String.prototype.parseQuery = String.prototype.toQueryParams;
Object.extend(String.prototype.escapeHTML, {
	div: document.createElement('div'),
	text: document.createTextNode('')
});
with(String.prototype.escapeHTML) div.appendChild(text);
var Template = Class.create();
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
Template.prototype = {
	initialize: function(template, pattern) {
		this.template = template.toString();
		this.pattern = pattern || Template.Pattern;
	},
	evaluate: function(object) {
		return this.template.gsub(this.pattern, function(match) {
			var before = match[1];
			if (before == '\\') return match[2];
			return before + String.interpret(object[match[3]]);
		});
	}
}
var $break = {},
	$continue = new Error('"throw $continue" is deprecated, use "return" instead');
var Enumerable = {
	each: function(iterator) {
		var index = 0;
		try {
			this._each(function(value) {
				iterator(value, index++);
			});
		} catch (e) {
			if (e != $break) throw e;
		}
		return this;
	},
	eachSlice: function(number, iterator) {
		var index = -number,
			slices = [],
			array = this.toArray();
		while ((index += number) < array.length)
		slices.push(array.slice(index, index + number));
		return slices.map(iterator);
	},
	all: function(iterator) {
		var result = true;
		this.each(function(value, index) {
			result = result && !! (iterator || Prototype.K)(value, index);
			if (!result) throw $break;
		});
		return result;
	},
	any: function(iterator) {
		var result = false;
		this.each(function(value, index) {
			if (result = !! (iterator || Prototype.K)(value, index)) throw $break;
		});
		return result;
	},
	collect: function(iterator) {
		var results = [];
		this.each(function(value, index) {
			results.push((iterator || Prototype.K)(value, index));
		});
		return results;
	},
	detect: function(iterator) {
		var result;
		this.each(function(value, index) {
			if (iterator(value, index)) {
				result = value;
				throw $break;
			}
		});
		return result;
	},
	findAll: function(iterator) {
		var results = [];
		this.each(function(value, index) {
			if (iterator(value, index)) results.push(value);
		});
		return results;
	},
	grep: function(pattern, iterator) {
		var results = [];
		this.each(function(value, index) {
			var stringValue = value.toString();
			if (stringValue.match(pattern)) results.push((iterator || Prototype.K)(value, index));
		})
		return results;
	},
	include: function(object) {
		var found = false;
		this.each(function(value) {
			if (value == object) {
				found = true;
				throw $break;
			}
		});
		return found;
	},
	inGroupsOf: function(number, fillWith) {
		fillWith = fillWith === undefined ? null : fillWith;
		return this.eachSlice(number, function(slice) {
			while (slice.length < number) slice.push(fillWith);
			return slice;
		});
	},
	inject: function(memo, iterator) {
		this.each(function(value, index) {
			memo = iterator(memo, value, index);
		});
		return memo;
	},
	invoke: function(method) {
		var args = $A(arguments).slice(1);
		return this.map(function(value) {
			return value[method].apply(value, args);
		});
	},
	max: function(iterator) {
		var result;
		this.each(function(value, index) {
			value = (iterator || Prototype.K)(value, index);
			if (result == undefined || value >= result) result = value;
		});
		return result;
	},
	min: function(iterator) {
		var result;
		this.each(function(value, index) {
			value = (iterator || Prototype.K)(value, index);
			if (result == undefined || value < result) result = value;
		});
		return result;
	},
	partition: function(iterator) {
		var trues = [],
			falses = [];
		this.each(function(value, index) {
			((iterator || Prototype.K)(value, index) ? trues : falses).push(value);
		});
		return [trues, falses];
	},
	pluck: function(property) {
		var results = [];
		this.each(function(value, index) {
			results.push(value[property]);
		});
		return results;
	},
	reject: function(iterator) {
		var results = [];
		this.each(function(value, index) {
			if (!iterator(value, index)) results.push(value);
		});
		return results;
	},
	sortBy: function(iterator) {
		return this.map(function(value, index) {
			return {
				value: value,
				criteria: iterator(value, index)
			};
		}).sort(function(left, right) {
			var a = left.criteria,
				b = right.criteria;
			return a < b ? -1 : a > b ? 1 : 0;
		}).pluck('value');
	},
	toArray: function() {
		return this.map();
	},
	zip: function() {
		var iterator = Prototype.K,
			args = $A(arguments);
		if (typeof args.last() == 'function') iterator = args.pop();
		var collections = [this].concat(args).map($A);
		return this.map(function(value, index) {
			return iterator(collections.pluck(index));
		});
	},
	size: function() {
		return this.toArray().length;
	},
	inspect: function() {
		return '#<Enumerable:' + this.toArray().inspect() + '>';
	}
}
Object.extend(Enumerable, {
	map: Enumerable.collect,
	find: Enumerable.detect,
	select: Enumerable.findAll,
	member: Enumerable.include,
	entries: Enumerable.toArray
});
var $A = Array.from = function(iterable) {
	if (!iterable) return [];
	if (iterable.toArray) {
		return iterable.toArray();
	} else {
		var results = [];
		for (var i = 0, length = iterable.length; i < length; i++)
		results.push(iterable[i]);
		return results;
	}
}
if (Prototype.Browser.WebKit) {
	$A = Array.from = function(iterable) {
		if (!iterable) return [];
		if (!(typeof iterable == 'function' && iterable == '[object NodeList]') && iterable.toArray) {
			return iterable.toArray();
		} else {
			var results = [];
			for (var i = 0, length = iterable.length; i < length; i++)
			results.push(iterable[i]);
			return results;
		}
	}
}
Object.extend(Array.prototype, Enumerable);
if (!Array.prototype._reverse) Array.prototype._reverse = Array.prototype.reverse;
Object.extend(Array.prototype, {
	_each: function(iterator) {
		for (var i = 0, length = this.length; i < length; i++)
		iterator(this[i]);
	},
	clear: function() {
		this.length = 0;
		return this;
	},
	first: function() {
		return this[0];
	},
	last: function() {
		return this[this.length - 1];
	},
	compact: function() {
		return this.select(function(value) {
			return value != null;
		});
	},
	flatten: function() {
		return this.inject([], function(array, value) {
			return array.concat(value && value.constructor == Array ? value.flatten() : [value]);
		});
	},
	without: function() {
		var values = $A(arguments);
		return this.select(function(value) {
			return !values.include(value);
		});
	},
	indexOf: function(object) {
		for (var i = 0, length = this.length; i < length; i++)
		if (this[i] == object) return i;
		return -1;
	},
	reverse: function(inline) {
		return (inline !== false ? this : this.toArray())._reverse();
	},
	reduce: function() {
		return this.length > 1 ? this : this[0];
	},
	uniq: function(sorted) {
		return this.inject([], function(array, value, index) {
			if (0 == index || (sorted ? array.last() != value : !array.include(value))) array.push(value);
			return array;
		});
	},
	clone: function() {
		return [].concat(this);
	},
	size: function() {
		return this.length;
	},
	inspect: function() {
		return '[' + this.map(Object.inspect).join(', ') + ']';
	},
	toJSON: function() {
		var results = [];
		this.each(function(object) {
			var value = Object.toJSON(object);
			if (value !== undefined) results.push(value);
		});
		return '[' + results.join(', ') + ']';
	}
});
Array.prototype.toArray = Array.prototype.clone;

function $w(string) {
	string = string.strip();
	return string ? string.split(/\s+/) : [];
}
if (Prototype.Browser.Opera) {
	Array.prototype.concat = function() {
		var array = [];
		for (var i = 0, length = this.length; i < length; i++) array.push(this[i]);
		for (var i = 0, length = arguments.length; i < length; i++) {
			if (arguments[i].constructor == Array) {
				for (var j = 0, arrayLength = arguments[i].length; j < arrayLength; j++)
				array.push(arguments[i][j]);
			} else {
				array.push(arguments[i]);
			}
		}
		return array;
	}
}
var Hash = function(object) {
	if (object instanceof Hash) this.merge(object);
	else Object.extend(this, object || {});
};
Object.extend(Hash, {
	toQueryString: function(obj) {
		var parts = [];
		parts.add = arguments.callee.addPair;
		this.prototype._each.call(obj, function(pair) {
			if (!pair.key) return;
			var value = pair.value;
			if (value && typeof value == 'object') {
				if (value.constructor == Array) value.each(function(value) {
					parts.add(pair.key, value);
				});
				return;
			}
			parts.add(pair.key, value);
		});
		return parts.join('&');
	},
	toJSON: function(object) {
		var results = [];
		this.prototype._each.call(object, function(pair) {
			var value = Object.toJSON(pair.value);
			if (value !== undefined) results.push(pair.key.toJSON() + ': ' + value);
		});
		return '{' + results.join(', ') + '}';
	}
});
Hash.toQueryString.addPair = function(key, value, prefix) {
	key = encodeURIComponent(key);
	if (value === undefined) this.push(key);
	else this.push(key + '=' + (value == null ? '' : encodeURIComponent(value)));
}
Object.extend(Hash.prototype, Enumerable);
Object.extend(Hash.prototype, {
	_each: function(iterator) {
		for (var key in this) {
			var value = this[key];
			if (value && value == Hash.prototype[key]) continue;
			var pair = [key, value];
			pair.key = key;
			pair.value = value;
			iterator(pair);
		}
	},
	keys: function() {
		return this.pluck('key');
	},
	values: function() {
		return this.pluck('value');
	},
	merge: function(hash) {
		return $H(hash).inject(this, function(mergedHash, pair) {
			mergedHash[pair.key] = pair.value;
			return mergedHash;
		});
	},
	remove: function() {
		var result;
		for (var i = 0, length = arguments.length; i < length; i++) {
			var value = this[arguments[i]];
			if (value !== undefined) {
				if (result === undefined) result = value;
				else {
					if (result.constructor != Array) result = [result];
					result.push(value)
				}
			}
			delete this[arguments[i]];
		}
		return result;
	},
	toQueryString: function() {
		return Hash.toQueryString(this);
	},
	inspect: function() {
		return '#<Hash:{' + this.map(function(pair) {
			return pair.map(Object.inspect).join(': ');
		}).join(', ') + '}>';
	},
	toJSON: function() {
		return Hash.toJSON(this);
	}
});

function $H(object) {
	if (object instanceof Hash) return object;
	return new Hash(object);
};
// Safari iterates over shadowed properties
if (function() {
	var i = 0,
		Test = function(value) {
			this.key = value
		};
	Test.prototype.key = 'foo';
	for (var property in new Test('bar')) i++;
	return i > 1;
}()) Hash.prototype._each = function(iterator) {
	var cache = [];
	for (var key in this) {
		var value = this[key];
		if ((value && value == Hash.prototype[key]) || cache.include(key)) continue;
		cache.push(key);
		var pair = [key, value];
		pair.key = key;
		pair.value = value;
		iterator(pair);
	}
};
ObjectRange = Class.create();
Object.extend(ObjectRange.prototype, Enumerable);
Object.extend(ObjectRange.prototype, {
	initialize: function(start, end, exclusive) {
		this.start = start;
		this.end = end;
		this.exclusive = exclusive;
	},
	_each: function(iterator) {
		var value = this.start;
		while (this.include(value)) {
			iterator(value);
			value = value.succ();
		}
	},
	include: function(value) {
		if (value < this.start) return false;
		if (this.exclusive) return value < this.end;
		return value <= this.end;
	}
});
var $R = function(start, end, exclusive) {
	return new ObjectRange(start, end, exclusive);
}
var Ajax = {
	getTransport: function() {
		return Try.these(

		function() {
			return new XMLHttpRequest()
		}, function() {
			return new ActiveXObject('Msxml2.XMLHTTP')
		}, function() {
			return new ActiveXObject('Microsoft.XMLHTTP')
		}) || false;
	},
	activeRequestCount: 0
}
Ajax.Responders = {
	responders: [],
	_each: function(iterator) {
		this.responders._each(iterator);
	},
	register: function(responder) {
		if (!this.include(responder)) this.responders.push(responder);
	},
	unregister: function(responder) {
		this.responders = this.responders.without(responder);
	},
	dispatch: function(callback, request, transport, json) {
		this.each(function(responder) {
			if (typeof responder[callback] == 'function') {
				try {
					responder[callback].apply(responder, [request, transport, json]);
				} catch (e) {}
			}
		});
	}
};
Object.extend(Ajax.Responders, Enumerable);
Ajax.Responders.register({
	onCreate: function() {
		Ajax.activeRequestCount++;
	},
	onComplete: function() {
		Ajax.activeRequestCount--;
	}
});
Ajax.Base = function() {};
Ajax.Base.prototype = {
	setOptions: function(options) {
		this.options = {
			method: 'post',
			asynchronous: true,
			contentType: 'application/x-www-form-urlencoded',
			encoding: 'UTF-8',
			parameters: ''
		}
		Object.extend(this.options, options || {});
		this.options.method = this.options.method.toLowerCase();
		if (typeof this.options.parameters == 'string') this.options.parameters = this.options.parameters.toQueryParams();
	}
}
Ajax.Request = Class.create();
Ajax.Request.Events = ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];
Ajax.Request.prototype = Object.extend(new Ajax.Base(), {
	_complete: false,
	initialize: function(url, options) {
		this.transport = Ajax.getTransport();
		this.setOptions(options);
		this.request(url);
	},
	request: function(url) {
		this.url = url;
		this.method = this.options.method;
		var params = Object.clone(this.options.parameters);
		if (!['get', 'post'].include(this.method)) {
			// simulate other verbs over post
			params['_method'] = this.method;
			this.method = 'post';
		}
		this.parameters = params;
		if (params = Hash.toQueryString(params)) {
			// when GET, append parameters to URL
			if (this.method == 'get') this.url += (this.url.include('?') ? '&' : '?') + params;
			else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) params += '&_=';
		}
		try {
			if (this.options.onCreate) this.options.onCreate(this.transport);
			Ajax.Responders.dispatch('onCreate', this, this.transport);
			this.transport.open(this.method.toUpperCase(), this.url, this.options.asynchronous);
			if (this.options.asynchronous) setTimeout(function() {
				this.respondToReadyState(1)
			}.bind(this), 10);
			this.transport.onreadystatechange = this.onStateChange.bind(this);
			this.setRequestHeaders();
			this.body = this.method == 'post' ? (this.options.postBody || params) : null;
			this.transport.send(this.body); /* Force Firefox to handle ready state 4 for synchronous requests */
			if (!this.options.asynchronous && this.transport.overrideMimeType) this.onStateChange();
		} catch (e) {
			this.dispatchException(e);
		}
	},
	onStateChange: function() {
		var readyState = this.transport.readyState;
		if (readyState > 1 && !((readyState == 4) && this._complete)) this.respondToReadyState(this.transport.readyState);
	},
	setRequestHeaders: function() {
		var headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'X-Prototype-Version': Prototype.Version,
			'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
		};
		if (this.method == 'post') {
			headers['Content-type'] = this.options.contentType + (this.options.encoding ? '; charset=' + this.options.encoding : '');
/* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
			if (this.transport.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0, 2005])[1] < 2005) headers['Connection'] = 'close';
		}
		// user-defined headers
		if (typeof this.options.requestHeaders == 'object') {
			var extras = this.options.requestHeaders;
			if (typeof extras.push == 'function') for (var i = 0, length = extras.length; i < length; i += 2)
			headers[extras[i]] = extras[i + 1];
			else
			$H(extras).each(function(pair) {
				headers[pair.key] = pair.value
			});
		}
		for (var name in headers)
		this.transport.setRequestHeader(name, headers[name]);
	},
	success: function() {
		return !this.transport.status || (this.transport.status >= 200 && this.transport.status < 300);
	},
	respondToReadyState: function(readyState) {
		var state = Ajax.Request.Events[readyState];
		var transport = this.transport,
			json = this.evalJSON();
		if (state == 'Complete') {
			try {
				this._complete = true;
				(this.options['on' + this.transport.status] || this.options['on' + (this.success() ? 'Success' : 'Failure')] || Prototype.emptyFunction)(transport, json);
			} catch (e) {
				this.dispatchException(e);
			}
			var contentType = this.getHeader('Content-type');
			if (contentType && contentType.strip().
			match(/^(text|application)\/(x-)?(java|ecma)script(;.*)?$/i)) this.evalResponse();
		}
		try {
			(this.options['on' + state] || Prototype.emptyFunction)(transport, json);
			Ajax.Responders.dispatch('on' + state, this, transport, json);
		} catch (e) {
			this.dispatchException(e);
		}
		if (state == 'Complete') {
			// avoid memory leak in MSIE: clean up
			this.transport.onreadystatechange = Prototype.emptyFunction;
		}
	},
	getHeader: function(name) {
		try {
			return this.transport.getResponseHeader(name);
		} catch (e) {
			return null
		}
	},
	evalJSON: function() {
		try {
			var json = this.getHeader('X-JSON');
			return json ? json.evalJSON() : null;
		} catch (e) {
			return null
		}
	},
	evalResponse: function() {
		try {
			return eval((this.transport.responseText || '').unfilterJSON());
		} catch (e) {
			this.dispatchException(e);
		}
	},
	dispatchException: function(exception) {
		(this.options.onException || Prototype.emptyFunction)(this, exception);
		Ajax.Responders.dispatch('onException', this, exception);
	}
});
Ajax.Updater = Class.create();
Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
	initialize: function(container, url, options) {
		this.container = {
			success: (container.success || container),
			failure: (container.failure || (container.success ? null : container))
		}
		this.transport = Ajax.getTransport();
		this.setOptions(options);
		var onComplete = this.options.onComplete || Prototype.emptyFunction;
		this.options.onComplete = (function(transport, param) {
			this.updateContent();
			onComplete(transport, param);
		}).bind(this);
		this.request(url);
	},
	updateContent: function() {
		var receiver = this.container[this.success() ? 'success' : 'failure'];
		var response = this.transport.responseText;
		if (!this.options.evalScripts) response = response.stripScripts();
		if (receiver = call(receiver)) {
			if (this.options.insertion) new this.options.insertion(receiver, response);
			else
			receiver.update(response);
		}
		if (this.success()) {
			if (this.onComplete) setTimeout(this.onComplete.bind(this), 10);
		}
	}
});
Ajax.PeriodicalUpdater = Class.create();
Ajax.PeriodicalUpdater.prototype = Object.extend(new Ajax.Base(), {
	initialize: function(container, url, options) {
		this.setOptions(options);
		this.onComplete = this.options.onComplete;
		this.frequency = (this.options.frequency || 2);
		this.decay = (this.options.decay || 1);
		this.updater = {};
		this.container = container;
		this.url = url;
		this.start();
	},
	start: function() {
		this.options.onComplete = this.updateComplete.bind(this);
		this.onTimerEvent();
	},
	stop: function() {
		this.updater.options.onComplete = undefined;
		clearTimeout(this.timer);
		(this.onComplete || Prototype.emptyFunction).apply(this, arguments);
	},
	updateComplete: function(request) {
		if (this.options.decay) {
			this.decay = (request.responseText == this.lastText ? this.decay * this.options.decay : 1);
			this.lastText = request.responseText;
		}
		this.timer = setTimeout(this.onTimerEvent.bind(this), this.decay * this.frequency * 1000);
	},
	onTimerEvent: function() {
		this.updater = new Ajax.Updater(this.container, this.url, this.options);
	}
});

function call(element) {
	if (arguments.length > 1) {
		for (var i = 0, elements = [], length = arguments.length; i < length; i++)
		elements.push(call(arguments[i]));
		return elements;
	}
	if (typeof element == 'string') element = document.getElementById(element);
	return Element.extend(element);
}
if (Prototype.BrowserFeatures.XPath) {
	document._getElementsByXPath = function(expression, parentElement) {
		var results = [];
		var query = document.evaluate(expression, call(parentElement) || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0, length = query.snapshotLength; i < length; i++)
		results.push(query.snapshotItem(i));
		return results;
	};
	document.getElementsByClassName = function(className, parentElement) {
		var q = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
		return document._getElementsByXPath(q, parentElement);
	}
} else document.getElementsByClassName = function(className, parentElement) {
	var children = (call(parentElement) || document.body).getElementsByTagName('*');
	var elements = [],
		child;
	for (var i = 0, length = children.length; i < length; i++) {
		child = children[i];
		if (Element.hasClassName(child, className)) elements.push(Element.extend(child));
	}
	return elements;
}; /*--------------------------------------------------------------------------*/
if (!window.Element) var Element = {};
Element.extend = function(element) {
	var F = Prototype.BrowserFeatures;
	if (!element || !element.tagName || element.nodeType == 3 || element._extended || F.SpecificElementExtensions || element == window) return element;
	var methods = {},
		tagName = element.tagName,
		cache = Element.extend.cache,
		T = Element.Methods.ByTag;
	// extend methods for all tags (Safari doesn't need this)
	if (!F.ElementExtensions) {
		Object.extend(methods, Element.Methods), Object.extend(methods, Element.Methods.Simulated);
	}
	// extend methods for specific tags
	if (T[tagName]) Object.extend(methods, T[tagName]);
	for (var property in methods) {
		var value = methods[property];
		if (typeof value == 'function' && !(property in element)) element[property] = cache.findOrStore(value);
	}
	element._extended = Prototype.emptyFunction;
	return element;
};
Element.extend.cache = {
	findOrStore: function(value) {
		return this[value] = this[value] ||
		function() {
			return value.apply(null, [this].concat($A(arguments)));
		}
	}
};
Element.Methods = {
	visible: function(element) {
		return call(element).style.display != 'none';
	},
	toggle: function(element) {
		element = call(element);
		Element[Element.visible(element) ? 'hide' : 'show'](element);
		return element;
	},
	hide: function(element) {
		call(element).style.display = 'none';
		return element;
	},
	show: function(element) {
		call(element).style.display = '';
		return element;
	},
	remove: function(element) {
		element = call(element);
		element.parentNode.removeChild(element);
		return element;
	},
	update: function(element, html) {
		html = typeof html == 'undefined' ? '' : html.toString();
		call(element).innerHTML = html.stripScripts();
		setTimeout(function() {
			html.evalScripts()
		}, 10);
		return element;
	},
	replace: function(element, html) {
		element = call(element);
		html = typeof html == 'undefined' ? '' : html.toString();
		if (element.outerHTML) {
			element.outerHTML = html.stripScripts();
		} else {
			var range = element.ownerDocument.createRange();
			range.selectNodeContents(element);
			element.parentNode.replaceChild(
			range.createContextualFragment(html.stripScripts()), element);
		}
		setTimeout(function() {
			html.evalScripts()
		}, 10);
		return element;
	},
	inspect: function(element) {
		element = call(element);
		var result = '<' + element.tagName.toLowerCase();
		$H({
			'id': 'id',
			'className': 'class'
		}).each(function(pair) {
			var property = pair.first(),
				attribute = pair.last();
			var value = (element[property] || '').toString();
			if (value) result += ' ' + attribute + '=' + value.inspect(true);
		});
		return result + '>';
	},
	recursivelyCollect: function(element, property) {
		element = call(element);
		var elements = [];
		while (element = element[property])
		if (element.nodeType == 1) elements.push(Element.extend(element));
		return elements;
	},
	ancestors: function(element) {
		return call(element).recursivelyCollect('parentNode');
	},
	descendants: function(element) {
		return $A(call(element).getElementsByTagName('*')).each(Element.extend);
	},
	firstDescendant: function(element) {
		element = call(element).firstChild;
		while (element && element.nodeType != 1) element = element.nextSibling;
		return call(element);
	},
	immediateDescendants: function(element) {
		if (!(element = call(element).firstChild)) return [];
		while (element && element.nodeType != 1) element = element.nextSibling;
		if (element) return [element].concat(call(element).nextSiblings());
		return [];
	},
	previousSiblings: function(element) {
		return call(element).recursivelyCollect('previousSibling');
	},
	nextSiblings: function(element) {
		return call(element).recursivelyCollect('nextSibling');
	},
	siblings: function(element) {
		element = call(element);
		return element.previousSiblings().reverse().concat(element.nextSiblings());
	},
	match: function(element, selector) {
		if (typeof selector == 'string') selector = new Selector(selector);
		return selector.match(call(element));
	},
	up: function(element, expression, index) {
		element = call(element);
		if (arguments.length == 1) return call(element.parentNode);
		var ancestors = element.ancestors();
		return expression ? Selector.findElement(ancestors, expression, index) : ancestors[index || 0];
	},
	down: function(element, expression, index) {
		element = call(element);
		if (arguments.length == 1) return element.firstDescendant();
		var descendants = element.descendants();
		return expression ? Selector.findElement(descendants, expression, index) : descendants[index || 0];
	},
	previous: function(element, expression, index) {
		element = call(element);
		if (arguments.length == 1) return call(Selector.handlers.previousElementSibling(element));
		var previousSiblings = element.previousSiblings();
		return expression ? Selector.findElement(previousSiblings, expression, index) : previousSiblings[index || 0];
	},
	next: function(element, expression, index) {
		element = call(element);
		if (arguments.length == 1) return call(Selector.handlers.nextElementSibling(element));
		var nextSiblings = element.nextSiblings();
		return expression ? Selector.findElement(nextSiblings, expression, index) : nextSiblings[index || 0];
	},
	getElementsBySelector: function() {
		var args = $A(arguments),
			element = call(args.shift());
		return Selector.findChildElements(element, args);
	},
	getElementsByClassName: function(element, className) {
		return document.getElementsByClassName(className, element);
	},
	readAttribute: function(element, name) {
		element = call(element);
		if (Prototype.Browser.IE) {
			if (!element.attributes) return null;
			var t = Element._attributeTranslations;
			if (t.values[name]) return t.values[name](element, name);
			if (t.names[name]) name = t.names[name];
			var attribute = element.attributes[name];
			return attribute ? attribute.nodeValue : null;
		}
		return element.getAttribute(name);
	},
	getHeight: function(element) {
		return call(element).getDimensions().height;
	},
	getWidth: function(element) {
		return call(element).getDimensions().width;
	},
	classNames: function(element) {
		return new Element.ClassNames(element);
	},
	hasClassName: function(element, className) {
		if (!(element = call(element))) return;
		var elementClassName = element.className;
		if (elementClassName.length == 0) return false;
		if (elementClassName == className || elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) return true;
		return false;
	},
	addClassName: function(element, className) {
		if (!(element = call(element))) return;
		Element.classNames(element).add(className);
		return element;
	},
	removeClassName: function(element, className) {
		if (!(element = call(element))) return;
		Element.classNames(element).remove(className);
		return element;
	},
	toggleClassName: function(element, className) {
		if (!(element = call(element))) return;
		Element.classNames(element)[element.hasClassName(className) ? 'remove' : 'add'](className);
		return element;
	},
	observe: function() {
		Event.observe.apply(Event, arguments);
		return $A(arguments).first();
	},
	stopObserving: function() {
		Event.stopObserving.apply(Event, arguments);
		return $A(arguments).first();
	},
	// removes whitespace-only text node children
	cleanWhitespace: function(element) {
		element = call(element);
		var node = element.firstChild;
		while (node) {
			var nextNode = node.nextSibling;
			if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) element.removeChild(node);
			node = nextNode;
		}
		return element;
	},
	empty: function(element) {
		return call(element).innerHTML.blank();
	},
	descendantOf: function(element, ancestor) {
		element = call(element), ancestor = call(ancestor);
		while (element = element.parentNode)
		if (element == ancestor) return true;
		return false;
	},
	scrollTo: function(element) {
		element = call(element);
		var pos = Position.cumulativeOffset(element);
		window.scrollTo(pos[0], pos[1]);
		return element;
	},
	getStyle: function(element, style) {
		element = call(element);
		style = style == 'float' ? 'cssFloat' : style.camelize();
		var value = element.style[style];
		if (!value) {
			var css = document.defaultView.getComputedStyle(element, null);
			value = css ? css[style] : null;
		}
		if (style == 'opacity') return value ? parseFloat(value) : 1.0;
		return value == 'auto' ? null : value;
	},
	getOpacity: function(element) {
		return call(element).getStyle('opacity');
	},
	setStyle: function(element, styles, camelized) {
		element = call(element);
		var elementStyle = element.style;
		for (var property in styles)
		if (property == 'opacity') element.setOpacity(styles[property])
		else
		elementStyle[(property == 'float' || property == 'cssFloat') ? (elementStyle.styleFloat === undefined ? 'cssFloat' : 'styleFloat') : (camelized ? property : property.camelize())] = styles[property];
		return element;
	},
	setOpacity: function(element, value) {
		element = call(element);
		element.style.opacity = (value == 1 || value === '') ? '' : (value < 0.00001) ? 0 : value;
		return element;
	},
	getDimensions: function(element) {
		element = call(element);
		var display = call(element).getStyle('display');
		if (display != 'none' && display != null) // Safari bug
		return {
			width: element.offsetWidth,
			height: element.offsetHeight
		};
		// All *Width and *Height properties give 0 on elements with display none,
		// so enable the element temporarily
		var els = element.style;
		var originalVisibility = els.visibility;
		var originalPosition = els.position;
		var originalDisplay = els.display;
		els.visibility = 'hidden';
		els.position = 'absolute';
		els.display = 'block';
		var originalWidth = element.clientWidth;
		var originalHeight = element.clientHeight;
		els.display = originalDisplay;
		els.position = originalPosition;
		els.visibility = originalVisibility;
		return {
			width: originalWidth,
			height: originalHeight
		};
	},
	makePositioned: function(element) {
		element = call(element);
		var pos = Element.getStyle(element, 'position');
		if (pos == 'static' || !pos) {
			element._madePositioned = true;
			element.style.position = 'relative';
			// Opera returns the offset relative to the positioning context, when an
			// element is position relative but top and left have not been defined
			if (window.opera) {
				element.style.top = 0;
				element.style.left = 0;
			}
		}
		return element;
	},
	undoPositioned: function(element) {
		element = call(element);
		if (element._madePositioned) {
			element._madePositioned = undefined;
			element.style.position =
			element.style.top =
			element.style.left =
			element.style.bottom =
			element.style.right = '';
		}
		return element;
	},
	makeClipping: function(element) {
		element = call(element);
		if (element._overflow) return element;
		element._overflow = element.style.overflow || 'auto';
		if ((Element.getStyle(element, 'overflow') || 'visible') != 'hidden') element.style.overflow = 'hidden';
		return element;
	},
	undoClipping: function(element) {
		element = call(element);
		if (!element._overflow) return element;
		element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;
		element._overflow = null;
		return element;
	}
};
Object.extend(Element.Methods, {
	childOf: Element.Methods.descendantOf,
	childElements: Element.Methods.immediateDescendants
});
if (Prototype.Browser.Opera) {
	Element.Methods._getStyle = Element.Methods.getStyle;
	Element.Methods.getStyle = function(element, style) {
		switch (style) {
		case 'left':
		case 'top':
		case 'right':
		case 'bottom':
			if (Element._getStyle(element, 'position') == 'static') return null;
		default:
			return Element._getStyle(element, style);
		}
	};
} else if (Prototype.Browser.IE) {
	Element.Methods.getStyle = function(element, style) {
		element = call(element);
		style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style.camelize();
		var value = element.style[style];
		if (!value && element.currentStyle) value = element.currentStyle[style];
		if (style == 'opacity') {
			if (value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/)) if (value[1]) return parseFloat(value[1]) / 100;
			return 1.0;
		}
		if (value == 'auto') {
			if ((style == 'width' || style == 'height') && (element.getStyle('display') != 'none')) return element['offset' + style.capitalize()] + 'px';
			return null;
		}
		return value;
	};
	Element.Methods.setOpacity = function(element, value) {
		element = call(element);
		var filter = element.getStyle('filter'),
			style = element.style;
		if (value == 1 || value === '') {
			style.filter = filter.replace(/alpha\([^\)]*\)/gi, '');
			return element;
		} else if (value < 0.00001) value = 0;
		style.filter = filter.replace(/alpha\([^\)]*\)/gi, '') + 'alpha(opacity=' + (value * 100) + ')';
		return element;
	};
	// IE is missing .innerHTML support for TABLE-related elements
	Element.Methods.update = function(element, html) {
		element = call(element);
		html = typeof html == 'undefined' ? '' : html.toString();
		var tagName = element.tagName.toUpperCase();
		if (['THEAD', 'TBODY', 'TR', 'TD'].include(tagName)) {
			var div = document.createElement('div');
			switch (tagName) {
			case 'THEAD':
			case 'TBODY':
				div.innerHTML = '<table><tbody>' + html.stripScripts() + '</tbody></table>';
				depth = 2;
				break;
			case 'TR':
				div.innerHTML = '<table><tbody><tr>' + html.stripScripts() + '</tr></tbody></table>';
				depth = 3;
				break;
			case 'TD':
				div.innerHTML = '<table><tbody><tr><td>' + html.stripScripts() + '</td></tr></tbody></table>';
				depth = 4;
			}
			$A(element.childNodes).each(function(node) {
				element.removeChild(node)
			});
			depth.times(function() {
				div = div.firstChild
			});
			$A(div.childNodes).each(function(node) {
				element.appendChild(node)
			});
		} else {
			element.innerHTML = html.stripScripts();
		}
		setTimeout(function() {
			html.evalScripts()
		}, 10);
		return element;
	}
} else if (Prototype.Browser.Gecko) {
	Element.Methods.setOpacity = function(element, value) {
		element = call(element);
		element.style.opacity = (value == 1) ? 0.999999 : (value === '') ? '' : (value < 0.00001) ? 0 : value;
		return element;
	};
}
Element._attributeTranslations = {
	names: {
		colspan: "colSpan",
		rowspan: "rowSpan",
		valign: "vAlign",
		datetime: "dateTime",
		accesskey: "accessKey",
		tabindex: "tabIndex",
		enctype: "encType",
		maxlength: "maxLength",
		readonly: "readOnly",
		longdesc: "longDesc"
	},
	values: {
		_getAttr: function(element, attribute) {
			return element.getAttribute(attribute, 2);
		},
		_flag: function(element, attribute) {
			return call(element).hasAttribute(attribute) ? attribute : null;
		},
		style: function(element) {
			return element.style.cssText.toLowerCase();
		},
		title: function(element) {
			var node = element.getAttributeNode('title');
			return node.specified ? node.nodeValue : null;
		}
	}
};
(function() {
	Object.extend(this, {
		href: this._getAttr,
		src: this._getAttr,
		type: this._getAttr,
		disabled: this._flag,
		checked: this._flag,
		readonly: this._flag,
		multiple: this._flag
	});
}).call(Element._attributeTranslations.values);
Element.Methods.Simulated = {
	hasAttribute: function(element, attribute) {
		var t = Element._attributeTranslations,
			node;
		attribute = t.names[attribute] || attribute;
		node = call(element).getAttributeNode(attribute);
		return node && node.specified;
	}
};
Element.Methods.ByTag = {};
Object.extend(Element, Element.Methods);
if (!Prototype.BrowserFeatures.ElementExtensions && document.createElement('div').__proto__) {
	window.HTMLElement = {};
	window.HTMLElement.prototype = document.createElement('div').__proto__;
	Prototype.BrowserFeatures.ElementExtensions = true;
}
Element.hasAttribute = function(element, attribute) {
	if (element.hasAttribute) return element.hasAttribute(attribute);
	return Element.Methods.Simulated.hasAttribute(element, attribute);
};
Element.addMethods = function(methods) {
	var F = Prototype.BrowserFeatures,
		T = Element.Methods.ByTag;
	if (!methods) {
		Object.extend(Form, Form.Methods);
		Object.extend(Form.Element, Form.Element.Methods);
		Object.extend(Element.Methods.ByTag, {
			"FORM": Object.clone(Form.Methods),
			"INPUT": Object.clone(Form.Element.Methods),
			"SELECT": Object.clone(Form.Element.Methods),
			"TEXTAREA": Object.clone(Form.Element.Methods)
		});
	}
	if (arguments.length == 2) {
		var tagName = methods;
		methods = arguments[1];
	}
	if (!tagName) Object.extend(Element.Methods, methods || {});
	else {
		if (tagName.constructor == Array) tagName.each(extend);
		else extend(tagName);
	}

	function extend(tagName) {
		tagName = tagName.toUpperCase();
		if (!Element.Methods.ByTag[tagName]) Element.Methods.ByTag[tagName] = {};
		Object.extend(Element.Methods.ByTag[tagName], methods);
	}

	function copy(methods, destination, onlyIfAbsent) {
		onlyIfAbsent = onlyIfAbsent || false;
		var cache = Element.extend.cache;
		for (var property in methods) {
			var value = methods[property];
			if (!onlyIfAbsent || !(property in destination)) destination[property] = cache.findOrStore(value);
		}
	}

	function findDOMClass(tagName) {
		var klass;
		var trans = {
			"OPTGROUP": "OptGroup",
			"TEXTAREA": "TextArea",
			"P": "Paragraph",
			"FIELDSET": "FieldSet",
			"UL": "UList",
			"OL": "OList",
			"DL": "DList",
			"DIR": "Directory",
			"H1": "Heading",
			"H2": "Heading",
			"H3": "Heading",
			"H4": "Heading",
			"H5": "Heading",
			"H6": "Heading",
			"Q": "Quote",
			"INS": "Mod",
			"DEL": "Mod",
			"A": "Anchor",
			"IMG": "Image",
			"CAPTION": "TableCaption",
			"COL": "TableCol",
			"COLGROUP": "TableCol",
			"THEAD": "TableSection",
			"TFOOT": "TableSection",
			"TBODY": "TableSection",
			"TR": "TableRow",
			"TH": "TableCell",
			"TD": "TableCell",
			"FRAMESET": "FrameSet",
			"IFRAME": "IFrame"
		};
		if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
		if (window[klass]) return window[klass];
		klass = 'HTML' + tagName + 'Element';
		if (window[klass]) return window[klass];
		klass = 'HTML' + tagName.capitalize() + 'Element';
		if (window[klass]) return window[klass];
		window[klass] = {};
		window[klass].prototype = document.createElement(tagName).__proto__;
		return window[klass];
	}
	if (F.ElementExtensions) {
		copy(Element.Methods, HTMLElement.prototype);
		copy(Element.Methods.Simulated, HTMLElement.prototype, true);
	}
	if (F.SpecificElementExtensions) {
		for (var tag in Element.Methods.ByTag) {
			var klass = findDOMClass(tag);
			if (typeof klass == "undefined") continue;
			copy(T[tag], klass.prototype);
		}
	}
	Object.extend(Element, Element.Methods);
	delete Element.ByTag;
};
var Toggle = {
	display: Element.toggle
}; /*--------------------------------------------------------------------------*/
Abstract.Insertion = function(adjacency) {
	this.adjacency = adjacency;
}
Abstract.Insertion.prototype = {
	initialize: function(element, content) {
		this.element = call(element);
		this.content = content.stripScripts();
		if (this.adjacency && this.element.insertAdjacentHTML) {
			try {
				this.element.insertAdjacentHTML(this.adjacency, this.content);
			} catch (e) {
				var tagName = this.element.tagName.toUpperCase();
				if (['TBODY', 'TR'].include(tagName)) {
					this.insertContent(this.contentFromAnonymousTable());
				} else {
					throw e;
				}
			}
		} else {
			this.range = this.element.ownerDocument.createRange();
			if (this.initializeRange) this.initializeRange();
			this.insertContent([this.range.createContextualFragment(this.content)]);
		}
		setTimeout(function() {
			content.evalScripts()
		}, 10);
	},
	contentFromAnonymousTable: function() {
		var div = document.createElement('div');
		div.innerHTML = '<table><tbody>' + this.content + '</tbody></table>';
		return $A(div.childNodes[0].childNodes[0].childNodes);
	}
}
var Insertion = new Object();
Insertion.Before = Class.create();
Insertion.Before.prototype = Object.extend(new Abstract.Insertion('beforeBegin'), {
	initializeRange: function() {
		this.range.setStartBefore(this.element);
	},
	insertContent: function(fragments) {
		fragments.each((function(fragment) {
			this.element.parentNode.insertBefore(fragment, this.element);
		}).bind(this));
	}
});
Insertion.Top = Class.create();
Insertion.Top.prototype = Object.extend(new Abstract.Insertion('afterBegin'), {
	initializeRange: function() {
		this.range.selectNodeContents(this.element);
		this.range.collapse(true);
	},
	insertContent: function(fragments) {
		fragments.reverse(false).each((function(fragment) {
			this.element.insertBefore(fragment, this.element.firstChild);
		}).bind(this));
	}
});
Insertion.Bottom = Class.create();
Insertion.Bottom.prototype = Object.extend(new Abstract.Insertion('beforeEnd'), {
	initializeRange: function() {
		this.range.selectNodeContents(this.element);
		this.range.collapse(this.element);
	},
	insertContent: function(fragments) {
		fragments.each((function(fragment) {
			this.element.appendChild(fragment);
		}).bind(this));
	}
});
Insertion.After = Class.create();
Insertion.After.prototype = Object.extend(new Abstract.Insertion('afterEnd'), {
	initializeRange: function() {
		this.range.setStartAfter(this.element);
	},
	insertContent: function(fragments) {
		fragments.each((function(fragment) {
			this.element.parentNode.insertBefore(fragment, this.element.nextSibling);
		}).bind(this));
	}
}); /*--------------------------------------------------------------------------*/
Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
	initialize: function(element) {
		this.element = call(element);
	},
	_each: function(iterator) {
		this.element.className.split(/\s+/).select(function(name) {
			return name.length > 0;
		})._each(iterator);
	},
	set: function(className) {
		this.element.className = className;
	},
	add: function(classNameToAdd) {
		if (this.include(classNameToAdd)) return;
		this.set($A(this).concat(classNameToAdd).join(' '));
	},
	remove: function(classNameToRemove) {
		if (!this.include(classNameToRemove)) return;
		this.set($A(this).without(classNameToRemove).join(' '));
	},
	toString: function() {
		return $A(this).join(' ');
	}
};
Object.extend(Element.ClassNames.prototype, Enumerable);
/* Portions of the Selector class are derived from Jack Slocum’s DomQuery,
 * part of YUI-Ext version 0.40, distributed under the terms of an MIT-style
 * license.  Please see http://www.yui-ext.com/ for more information. */
var Selector = Class.create();
Selector.prototype = {
	initialize: function(expression) {
		this.expression = expression.strip();
		this.compileMatcher();
	},
	compileMatcher: function() {
		// Selectors with namespaced attributes can't use the XPath version
		if (Prototype.BrowserFeatures.XPath && !(/\[[\w-]*?:/).test(this.expression)) return this.compileXPathMatcher();
		var e = this.expression,
			ps = Selector.patterns,
			h = Selector.handlers,
			c = Selector.criteria,
			le, p, m;
		if (Selector._cache[e]) {
			this.matcher = Selector._cache[e];
			return;
		}
		this.matcher = ["this.matcher = function(root) {", "var r = root, h = Selector.handlers, c = false, n;"];
		while (e && le != e && (/\S/).test(e)) {
			le = e;
			for (var i in ps) {
				p = ps[i];
				if (m = e.match(p)) {
					this.matcher.push(typeof c[i] == 'function' ? c[i](m) : new Template(c[i]).evaluate(m));
					e = e.replace(m[0], '');
					break;
				}
			}
		}
		this.matcher.push("return h.unique(n);\n}");
		eval(this.matcher.join('\n'));
		Selector._cache[this.expression] = this.matcher;
	},
	compileXPathMatcher: function() {
		var e = this.expression,
			ps = Selector.patterns,
			x = Selector.xpath,
			le, m;
		if (Selector._cache[e]) {
			this.xpath = Selector._cache[e];
			return;
		}
		this.matcher = ['.//*'];
		while (e && le != e && (/\S/).test(e)) {
			le = e;
			for (var i in ps) {
				if (m = e.match(ps[i])) {
					this.matcher.push(typeof x[i] == 'function' ? x[i](m) : new Template(x[i]).evaluate(m));
					e = e.replace(m[0], '');
					break;
				}
			}
		}
		this.xpath = this.matcher.join('');
		Selector._cache[this.expression] = this.xpath;
	},
	findElements: function(root) {
		root = root || document;
		if (this.xpath) return document._getElementsByXPath(this.xpath, root);
		return this.matcher(root);
	},
	match: function(element) {
		return this.findElements(document).include(element);
	},
	toString: function() {
		return this.expression;
	},
	inspect: function() {
		return "#<Selector:" + this.expression.inspect() + ">";
	}
};
Object.extend(Selector, {
	_cache: {},
	xpath: {
		descendant: "//*",
		child: "/*",
		adjacent: "/following-sibling::*[1]",
		laterSibling: '/following-sibling::*',
		tagName: function(m) {
			if (m[1] == '*') return '';
			return "[local-name()='" + m[1].toLowerCase() + "' or local-name()='" + m[1].toUpperCase() + "']";
		},
		className: "[contains(concat(' ', @class, ' '), ' #{1} ')]",
		id: "[@id='#{1}']",
		attrPresence: "[@#{1}]",
		attr: function(m) {
			m[3] = m[5] || m[6];
			return new Template(Selector.xpath.operators[m[2]]).evaluate(m);
		},
		pseudo: function(m) {
			var h = Selector.xpath.pseudos[m[1]];
			if (!h) return '';
			if (typeof h === 'function') return h(m);
			return new Template(Selector.xpath.pseudos[m[1]]).evaluate(m);
		},
		operators: {
			'=': "[@#{1}='#{3}']",
			'!=': "[@#{1}!='#{3}']",
			'^=': "[starts-with(@#{1}, '#{3}')]",
			'$=': "[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']",
			'*=': "[contains(@#{1}, '#{3}')]",
			'~=': "[contains(concat(' ', @#{1}, ' '), ' #{3} ')]",
			'|=': "[contains(concat('-', @#{1}, '-'), '-#{3}-')]"
		},
		pseudos: {
			'first-child': '[not(preceding-sibling::*)]',
			'last-child': '[not(following-sibling::*)]',
			'only-child': '[not(preceding-sibling::* or following-sibling::*)]',
			'empty': "[count(*) = 0 and (count(text()) = 0 or translate(text(), ' \t\r\n', '') = '')]",
			'checked': "[@checked]",
			'disabled': "[@disabled]",
			'enabled': "[not(@disabled)]",
			'not': function(m) {
				var e = m[6],
					p = Selector.patterns,
					x = Selector.xpath,
					le, m, v;
				var exclusion = [];
				while (e && le != e && (/\S/).test(e)) {
					le = e;
					for (var i in p) {
						if (m = e.match(p[i])) {
							v = typeof x[i] == 'function' ? x[i](m) : new Template(x[i]).evaluate(m);
							exclusion.push("(" + v.substring(1, v.length - 1) + ")");
							e = e.replace(m[0], '');
							break;
						}
					}
				}
				return "[not(" + exclusion.join(" and ") + ")]";
			},
			'nth-child': function(m) {
				return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ", m);
			},
			'nth-last-child': function(m) {
				return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ", m);
			},
			'nth-of-type': function(m) {
				return Selector.xpath.pseudos.nth("position() ", m);
			},
			'nth-last-of-type': function(m) {
				return Selector.xpath.pseudos.nth("(last() + 1 - position()) ", m);
			},
			'first-of-type': function(m) {
				m[6] = "1";
				return Selector.xpath.pseudos['nth-of-type'](m);
			},
			'last-of-type': function(m) {
				m[6] = "1";
				return Selector.xpath.pseudos['nth-last-of-type'](m);
			},
			'only-of-type': function(m) {
				var p = Selector.xpath.pseudos;
				return p['first-of-type'](m) + p['last-of-type'](m);
			},
			nth: function(fragment, m) {
				var mm, formula = m[6],
					predicate;
				if (formula == 'even') formula = '2n+0';
				if (formula == 'odd') formula = '2n+1';
				if (mm = formula.match(/^(\d+)$/)) // digit only
				return '[' + fragment + "= " + mm[1] + ']';
				if (mm = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
					if (mm[1] == "-") mm[1] = -1;
					var a = mm[1] ? Number(mm[1]) : 1;
					var b = mm[2] ? Number(mm[2]) : 0;
					predicate = "[((#{fragment} - #{b}) mod #{a} = 0) and " + "((#{fragment} - #{b}) div #{a} >= 0)]";
					return new Template(predicate).evaluate({
						fragment: fragment,
						a: a,
						b: b
					});
				}
			}
		}
	},
	criteria: {
		tagName: 'n = h.tagName(n, r, "#{1}", c);   c = false;',
		className: 'n = h.className(n, r, "#{1}", c); c = false;',
		id: 'n = h.id(n, r, "#{1}", c);        c = false;',
		attrPresence: 'n = h.attrPresence(n, r, "#{1}"); c = false;',
		attr: function(m) {
			m[3] = (m[5] || m[6]);
			return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}"); c = false;').evaluate(m);
		},
		pseudo: function(m) {
			if (m[6]) m[6] = m[6].replace(/"/g, '\\"');
			return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(m);
		},
		descendant: 'c = "descendant";',
		child: 'c = "child";',
		adjacent: 'c = "adjacent";',
		laterSibling: 'c = "laterSibling";'
	},
	patterns: {
		// combinators must be listed first
		// (and descendant needs to be last combinator)
		laterSibling: /^\s*~\s*/,
		child: /^\s*>\s*/,
		adjacent: /^\s*\+\s*/,
		descendant: /^\s/,
		// selectors follow
		tagName: /^\s*(\*|[\w\-]+)(\b|$)?/,
		id: /^#([\w\-\*]+)(\b|$)/,
		className: /^\.([\w\-\*]+)(\b|$)/,
		pseudo: /^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|\s|(?=:))/,
		attrPresence: /^\[([\w]+)\]/,
		attr: /\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\]]*?)\4|([^'"][^\]]*?)))?\]/
	},
	handlers: {
		// UTILITY FUNCTIONS
		// joins two collections
		concat: function(a, b) {
			for (var i = 0, node; node = b[i]; i++)
			a.push(node);
			return a;
		},
		// marks an array of nodes for counting
		mark: function(nodes) {
			for (var i = 0, node; node = nodes[i]; i++)
			node._counted = true;
			return nodes;
		},
		unmark: function(nodes) {
			for (var i = 0, node; node = nodes[i]; i++)
			node._counted = undefined;
			return nodes;
		},
		// mark each child node with its position (for nth calls)
		// "ofType" flag indicates whether we're indexing for nth-of-type
		// rather than nth-child
		index: function(parentNode, reverse, ofType) {
			parentNode._counted = true;
			if (reverse) {
				for (var nodes = parentNode.childNodes, i = nodes.length - 1, j = 1; i >= 0; i--) {
					node = nodes[i];
					if (node.nodeType == 1 && (!ofType || node._counted)) node.nodeIndex = j++;
				}
			} else {
				for (var i = 0, j = 1, nodes = parentNode.childNodes; node = nodes[i]; i++)
				if (node.nodeType == 1 && (!ofType || node._counted)) node.nodeIndex = j++;
			}
		},
		// filters out duplicates and extends all nodes
		unique: function(nodes) {
			if (nodes.length == 0) return nodes;
			var results = [],
				n;
			for (var i = 0, l = nodes.length; i < l; i++)
			if (!(n = nodes[i])._counted) {
				n._counted = true;
				results.push(Element.extend(n));
			}
			return Selector.handlers.unmark(results);
		},
		// COMBINATOR FUNCTIONS
		descendant: function(nodes) {
			var h = Selector.handlers;
			for (var i = 0, results = [], node; node = nodes[i]; i++)
			h.concat(results, node.getElementsByTagName('*'));
			return results;
		},
		child: function(nodes) {
			var h = Selector.handlers;
			for (var i = 0, results = [], node; node = nodes[i]; i++) {
				for (var j = 0, children = [], child; child = node.childNodes[j]; j++)
				if (child.nodeType == 1 && child.tagName != '!') results.push(child);
			}
			return results;
		},
		adjacent: function(nodes) {
			for (var i = 0, results = [], node; node = nodes[i]; i++) {
				var next = this.nextElementSibling(node);
				if (next) results.push(next);
			}
			return results;
		},
		laterSibling: function(nodes) {
			var h = Selector.handlers;
			for (var i = 0, results = [], node; node = nodes[i]; i++)
			h.concat(results, Element.nextSiblings(node));
			return results;
		},
		nextElementSibling: function(node) {
			while (node = node.nextSibling)
			if (node.nodeType == 1) return node;
			return null;
		},
		previousElementSibling: function(node) {
			while (node = node.previousSibling)
			if (node.nodeType == 1) return node;
			return null;
		},
		// TOKEN FUNCTIONS
		tagName: function(nodes, root, tagName, combinator) {
			tagName = tagName.toUpperCase();
			var results = [],
				h = Selector.handlers;
			if (nodes) {
				if (combinator) {
					// fastlane for ordinary descendant combinators
					if (combinator == "descendant") {
						for (var i = 0, node; node = nodes[i]; i++)
						h.concat(results, node.getElementsByTagName(tagName));
						return results;
					} else nodes = this[combinator](nodes);
					if (tagName == "*") return nodes;
				}
				for (var i = 0, node; node = nodes[i]; i++)
				if (node.tagName.toUpperCase() == tagName) results.push(node);
				return results;
			} else
			return root.getElementsByTagName(tagName);
		},
		id: function(nodes, root, id, combinator) {
			var targetNode = call(id),
				h = Selector.handlers;
			if (!nodes && root == document) return targetNode ? [targetNode] : [];
			if (nodes) {
				if (combinator) {
					if (combinator == 'child') {
						for (var i = 0, node; node = nodes[i]; i++)
						if (targetNode.parentNode == node) return [targetNode];
					} else if (combinator == 'descendant') {
						for (var i = 0, node; node = nodes[i]; i++)
						if (Element.descendantOf(targetNode, node)) return [targetNode];
					} else if (combinator == 'adjacent') {
						for (var i = 0, node; node = nodes[i]; i++)
						if (Selector.handlers.previousElementSibling(targetNode) == node) return [targetNode];
					} else nodes = h[combinator](nodes);
				}
				for (var i = 0, node; node = nodes[i]; i++)
				if (node == targetNode) return [targetNode];
				return [];
			}
			return (targetNode && Element.descendantOf(targetNode, root)) ? [targetNode] : [];
		},
		className: function(nodes, root, className, combinator) {
			if (nodes && combinator) nodes = this[combinator](nodes);
			return Selector.handlers.byClassName(nodes, root, className);
		},
		byClassName: function(nodes, root, className) {
			if (!nodes) nodes = Selector.handlers.descendant([root]);
			var needle = ' ' + className + ' ';
			for (var i = 0, results = [], node, nodeClassName; node = nodes[i]; i++) {
				nodeClassName = node.className;
				if (nodeClassName.length == 0) continue;
				if (nodeClassName == className || (' ' + nodeClassName + ' ').include(needle)) results.push(node);
			}
			return results;
		},
		attrPresence: function(nodes, root, attr) {
			var results = [];
			for (var i = 0, node; node = nodes[i]; i++)
			if (Element.hasAttribute(node, attr)) results.push(node);
			return results;
		},
		attr: function(nodes, root, attr, value, operator) {
			if (!nodes) nodes = root.getElementsByTagName("*");
			var handler = Selector.operators[operator],
				results = [];
			for (var i = 0, node; node = nodes[i]; i++) {
				var nodeValue = Element.readAttribute(node, attr);
				if (nodeValue === null) continue;
				if (handler(nodeValue, value)) results.push(node);
			}
			return results;
		},
		pseudo: function(nodes, name, value, root, combinator) {
			if (nodes && combinator) nodes = this[combinator](nodes);
			if (!nodes) nodes = root.getElementsByTagName("*");
			return Selector.pseudos[name](nodes, value, root);
		}
	},
	pseudos: {
		'first-child': function(nodes, value, root) {
			for (var i = 0, results = [], node; node = nodes[i]; i++) {
				if (Selector.handlers.previousElementSibling(node)) continue;
				results.push(node);
			}
			return results;
		},
		'last-child': function(nodes, value, root) {
			for (var i = 0, results = [], node; node = nodes[i]; i++) {
				if (Selector.handlers.nextElementSibling(node)) continue;
				results.push(node);
			}
			return results;
		},
		'only-child': function(nodes, value, root) {
			var h = Selector.handlers;
			for (var i = 0, results = [], node; node = nodes[i]; i++)
			if (!h.previousElementSibling(node) && !h.nextElementSibling(node)) results.push(node);
			return results;
		},
		'nth-child': function(nodes, formula, root) {
			return Selector.pseudos.nth(nodes, formula, root);
		},
		'nth-last-child': function(nodes, formula, root) {
			return Selector.pseudos.nth(nodes, formula, root, true);
		},
		'nth-of-type': function(nodes, formula, root) {
			return Selector.pseudos.nth(nodes, formula, root, false, true);
		},
		'nth-last-of-type': function(nodes, formula, root) {
			return Selector.pseudos.nth(nodes, formula, root, true, true);
		},
		'first-of-type': function(nodes, formula, root) {
			return Selector.pseudos.nth(nodes, "1", root, false, true);
		},
		'last-of-type': function(nodes, formula, root) {
			return Selector.pseudos.nth(nodes, "1", root, true, true);
		},
		'only-of-type': function(nodes, formula, root) {
			var p = Selector.pseudos;
			return p['last-of-type'](p['first-of-type'](nodes, formula, root), formula, root);
		},
		// handles the an+b logic
		getIndices: function(a, b, total) {
			if (a == 0) return b > 0 ? [b] : [];
			return $R(1, total).inject([], function(memo, i) {
				if (0 == (i - b) % a && (i - b) / a >= 0) memo.push(i);
				return memo;
			});
		},
		// handles nth(-last)-child, nth(-last)-of-type, and (first|last)-of-type
		nth: function(nodes, formula, root, reverse, ofType) {
			if (nodes.length == 0) return [];
			if (formula == 'even') formula = '2n+0';
			if (formula == 'odd') formula = '2n+1';
			var h = Selector.handlers,
				results = [],
				indexed = [],
				m;
			h.mark(nodes);
			for (var i = 0, node; node = nodes[i]; i++) {
				if (!node.parentNode._counted) {
					h.index(node.parentNode, reverse, ofType);
					indexed.push(node.parentNode);
				}
			}
			if (formula.match(/^\d+$/)) { // just a number
				formula = Number(formula);
				for (var i = 0, node; node = nodes[i]; i++)
				if (node.nodeIndex == formula) results.push(node);
			} else if (m = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
				if (m[1] == "-") m[1] = -1;
				var a = m[1] ? Number(m[1]) : 1;
				var b = m[2] ? Number(m[2]) : 0;
				var indices = Selector.pseudos.getIndices(a, b, nodes.length);
				for (var i = 0, node, l = indices.length; node = nodes[i]; i++) {
					for (var j = 0; j < l; j++)
					if (node.nodeIndex == indices[j]) results.push(node);
				}
			}
			h.unmark(nodes);
			h.unmark(indexed);
			return results;
		},
		'empty': function(nodes, value, root) {
			for (var i = 0, results = [], node; node = nodes[i]; i++) {
				// IE treats comments as element nodes
				if (node.tagName == '!' || (node.firstChild && !node.innerHTML.match(/^\s*$/))) continue;
				results.push(node);
			}
			return results;
		},
		'not': function(nodes, selector, root) {
			var h = Selector.handlers,
				selectorType, m;
			var exclusions = new Selector(selector).findElements(root);
			h.mark(exclusions);
			for (var i = 0, results = [], node; node = nodes[i]; i++)
			if (!node._counted) results.push(node);
			h.unmark(exclusions);
			return results;
		},
		'enabled': function(nodes, value, root) {
			for (var i = 0, results = [], node; node = nodes[i]; i++)
			if (!node.disabled) results.push(node);
			return results;
		},
		'disabled': function(nodes, value, root) {
			for (var i = 0, results = [], node; node = nodes[i]; i++)
			if (node.disabled) results.push(node);
			return results;
		},
		'checked': function(nodes, value, root) {
			for (var i = 0, results = [], node; node = nodes[i]; i++)
			if (node.checked) results.push(node);
			return results;
		}
	},
	operators: {
		'=': function(nv, v) {
			return nv == v;
		},
		'!=': function(nv, v) {
			return nv != v;
		},
		'^=': function(nv, v) {
			return nv.startsWith(v);
		},
		'$=': function(nv, v) {
			return nv.endsWith(v);
		},
		'*=': function(nv, v) {
			return nv.include(v);
		},
		'~=': function(nv, v) {
			return (' ' + nv + ' ').include(' ' + v + ' ');
		},
		'|=': function(nv, v) {
			return ('-' + nv.toUpperCase() + '-').include('-' + v.toUpperCase() + '-');
		}
	},
	matchElements: function(elements, expression) {
		var matches = new Selector(expression).findElements(),
			h = Selector.handlers;
		h.mark(matches);
		for (var i = 0, results = [], element; element = elements[i]; i++)
		if (element._counted) results.push(element);
		h.unmark(matches);
		return results;
	},
	findElement: function(elements, expression, index) {
		if (typeof expression == 'number') {
			index = expression;
			expression = false;
		}
		return Selector.matchElements(elements, expression || '*')[index || 0];
	},
	findChildElements: function(element, expressions) {
		var exprs = expressions.join(','),
			expressions = [];
		exprs.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/, function(m) {
			expressions.push(m[1].strip());
		});
		var results = [],
			h = Selector.handlers;
		for (var i = 0, l = expressions.length, selector; i < l; i++) {
			selector = new Selector(expressions[i].strip());
			h.concat(results, selector.findElements(element));
		}
		return (l > 1) ? h.unique(results) : results;
	}
});

function $call() {
	return Selector.findChildElements(document, $A(arguments));
}
var Form = {
	reset: function(form) {
		call(form).reset();
		return form;
	},
	serializeElements: function(elements, getHash) {
		var data = elements.inject({}, function(result, element) {
			if (!element.disabled && element.name) {
				var key = element.name,
					value = call(element).getValue();
				if (value != null) {
					if (key in result) {
						if (result[key].constructor != Array) result[key] = [result[key]];
						result[key].push(value);
					} else result[key] = value;
				}
			}
			return result;
		});
		return getHash ? data : Hash.toQueryString(data);
	}
};
Form.Methods = {
	serialize: function(form, getHash) {
		return Form.serializeElements(Form.getElements(form), getHash);
	},
	getElements: function(form) {
		return $A(call(form).getElementsByTagName('*')).inject([], function(elements, child) {
			if (Form.Element.Serializers[child.tagName.toLowerCase()]) elements.push(Element.extend(child));
			return elements;
		});
	},
	getInputs: function(form, typeName, name) {
		form = call(form);
		var inputs = form.getElementsByTagName('input');
		if (!typeName && !name) return $A(inputs).map(Element.extend);
		for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
			var input = inputs[i];
			if ((typeName && input.type != typeName) || (name && input.name != name)) continue;
			matchingInputs.push(Element.extend(input));
		}
		return matchingInputs;
	},
	disable: function(form) {
		form = call(form);
		Form.getElements(form).invoke('disable');
		return form;
	},
	enable: function(form) {
		form = call(form);
		Form.getElements(form).invoke('enable');
		return form;
	},
	findFirstElement: function(form) {
		return call(form).getElements().find(function(element) {
			return element.type != 'hidden' && !element.disabled && ['input', 'select', 'textarea'].include(element.tagName.toLowerCase());
		});
	},
	focusFirstElement: function(form) {
		form = call(form);
		form.findFirstElement().activate();
		return form;
	},
	request: function(form, options) {
		form = call(form), options = Object.clone(options || {});
		var params = options.parameters;
		options.parameters = form.serialize(true);
		if (params) {
			if (typeof params == 'string') params = params.toQueryParams();
			Object.extend(options.parameters, params);
		}
		if (form.hasAttribute('method') && !options.method) options.method = form.method;
		return new Ajax.Request(form.readAttribute('action'), options);
	}
} /*--------------------------------------------------------------------------*/
Form.Element = {
	focus: function(element) {
		call(element).focus();
		return element;
	},
	select: function(element) {
		call(element).select();
		return element;
	}
}
Form.Element.Methods = {
	serialize: function(element) {
		element = call(element);
		if (!element.disabled && element.name) {
			var value = element.getValue();
			if (value != undefined) {
				var pair = {};
				pair[element.name] = value;
				return Hash.toQueryString(pair);
			}
		}
		return '';
	},
	getValue: function(element) {
		element = call(element);
		var method = element.tagName.toLowerCase();
		return Form.Element.Serializers[method](element);
	},
	clear: function(element) {
		call(element).value = '';
		return element;
	},
	present: function(element) {
		return call(element).value != '';
	},
	activate: function(element) {
		element = call(element);
		try {
			element.focus();
			if (element.select && (element.tagName.toLowerCase() != 'input' || !['button', 'reset', 'submit'].include(element.type))) element.select();
		} catch (e) {}
		return element;
	},
	disable: function(element) {
		element = call(element);
		element.blur();
		element.disabled = true;
		return element;
	},
	enable: function(element) {
		element = call(element);
		element.disabled = false;
		return element;
	}
} /*--------------------------------------------------------------------------*/
var Field = Form.Element;
var $F = Form.Element.Methods.getValue; /*--------------------------------------------------------------------------*/
Form.Element.Serializers = {
	input: function(element) {
		switch (element.type.toLowerCase()) {
		case 'checkbox':
		case 'radio':
			return Form.Element.Serializers.inputSelector(element);
		default:
			return Form.Element.Serializers.textarea(element);
		}
	},
	inputSelector: function(element) {
		return element.checked ? element.value : null;
	},
	textarea: function(element) {
		return element.value;
	},
	select: function(element) {
		return this[element.type == 'select-one' ? 'selectOne' : 'selectMany'](element);
	},
	selectOne: function(element) {
		var index = element.selectedIndex;
		return index >= 0 ? this.optionValue(element.options[index]) : null;
	},
	selectMany: function(element) {
		var values, length = element.length;
		if (!length) return null;
		for (var i = 0, values = []; i < length; i++) {
			var opt = element.options[i];
			if (opt.selected) values.push(this.optionValue(opt));
		}
		return values;
	},
	optionValue: function(opt) {
		// extend element because hasAttribute may not be native
		return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;
	}
} /*--------------------------------------------------------------------------*/
Abstract.TimedObserver = function() {}
Abstract.TimedObserver.prototype = {
	initialize: function(element, frequency, callback) {
		this.frequency = frequency;
		this.element = call(element);
		this.callback = callback;
		this.lastValue = this.getValue();
		this.registerCallback();
	},
	registerCallback: function() {
		setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
	},
	onTimerEvent: function() {
		var value = this.getValue();
		var changed = ('string' == typeof this.lastValue && 'string' == typeof value ? this.lastValue != value : String(this.lastValue) != String(value));
		if (changed) {
			this.callback(this.element, value);
			this.lastValue = value;
		}
	}
}
Form.Element.Observer = Class.create();
Form.Element.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
	getValue: function() {
		return Form.Element.getValue(this.element);
	}
});
Form.Observer = Class.create();
Form.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
	getValue: function() {
		return Form.serialize(this.element);
	}
}); /*--------------------------------------------------------------------------*/
Abstract.EventObserver = function() {}
Abstract.EventObserver.prototype = {
	initialize: function(element, callback) {
		this.element = call(element);
		this.callback = callback;
		this.lastValue = this.getValue();
		if (this.element.tagName.toLowerCase() == 'form') this.registerFormCallbacks();
		else
		this.registerCallback(this.element);
	},
	onElementEvent: function() {
		var value = this.getValue();
		if (this.lastValue != value) {
			this.callback(this.element, value);
			this.lastValue = value;
		}
	},
	registerFormCallbacks: function() {
		Form.getElements(this.element).each(this.registerCallback.bind(this));
	},
	registerCallback: function(element) {
		if (element.type) {
			switch (element.type.toLowerCase()) {
			case 'checkbox':
			case 'radio':
				Event.observe(element, 'click', this.onElementEvent.bind(this));
				break;
			default:
				Event.observe(element, 'change', this.onElementEvent.bind(this));
				break;
			}
		}
	}
}
Form.Element.EventObserver = Class.create();
Form.Element.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
	getValue: function() {
		return Form.Element.getValue(this.element);
	}
});
Form.EventObserver = Class.create();
Form.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
	getValue: function() {
		return Form.serialize(this.element);
	}
});
if (!window.Event) {
	var Event = new Object();
}
Object.extend(Event, {
	KEY_BACKSPACE: 8,
	KEY_TAB: 9,
	KEY_RETURN: 13,
	KEY_ESC: 27,
	KEY_LEFT: 37,
	KEY_UP: 38,
	KEY_RIGHT: 39,
	KEY_DOWN: 40,
	KEY_DELETE: 46,
	KEY_HOME: 36,
	KEY_END: 35,
	KEY_PAGEUP: 33,
	KEY_PAGEDOWN: 34,
	element: function(event) {
		return call(event.target || event.srcElement);
	},
	isLeftClick: function(event) {
		return (((event.which) && (event.which == 1)) || ((event.button) && (event.button == 1)));
	},
	pointerX: function(event) {
		return event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
	},
	pointerY: function(event) {
		return event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	},
	stop: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.returnValue = false;
			event.cancelBubble = true;
		}
	},
	// find the first node with the given tagName, starting from the
	// node the event was triggered on; traverses the DOM upwards
	findElement: function(event, tagName) {
		var element = Event.element(event);
		while (element.parentNode && (!element.tagName || (element.tagName.toUpperCase() != tagName.toUpperCase())))
		element = element.parentNode;
		return element;
	},
	observers: false,
	_observeAndCache: function(element, name, observer, useCapture) {
		if (!this.observers) this.observers = [];
		if (element.addEventListener) {
			this.observers.push([element, name, observer, useCapture]);
			element.addEventListener(name, observer, useCapture);
		} else if (element.attachEvent) {
			this.observers.push([element, name, observer, useCapture]);
			element.attachEvent('on' + name, observer);
		}
	},
	unloadCache: function() {
		if (!Event.observers) return;
		for (var i = 0, length = Event.observers.length; i < length; i++) {
			Event.stopObserving.apply(this, Event.observers[i]);
			Event.observers[i][0] = null;
		}
		Event.observers = false;
	},
	observe: function(element, name, observer, useCapture) {
		element = call(element);
		useCapture = useCapture || false;
		if (name == 'keypress' && (Prototype.Browser.WebKit || element.attachEvent)) name = 'keydown';
		Event._observeAndCache(element, name, observer, useCapture);
	},
	stopObserving: function(element, name, observer, useCapture) {
		element = call(element);
		useCapture = useCapture || false;
		if (name == 'keypress' && (Prototype.Browser.WebKit || element.attachEvent)) name = 'keydown';
		if (element.removeEventListener) {
			element.removeEventListener(name, observer, useCapture);
		} else if (element.detachEvent) {
			try {
				element.detachEvent('on' + name, observer);
			} catch (e) {}
		}
	}
}); /* prevent memory leaks in IE */
if (Prototype.Browser.IE) Event.observe(window, 'unload', Event.unloadCache, false);
var Position = {
	// set to true if needed, warning: firefox performance problems
	// NOT neeeded for page scrolling, only if draggable contained in
	// scrollable elements
	includeScrollOffsets: false,
	// must be called before calling withinIncludingScrolloffset, every time the
	// page is scrolled
	prepare: function() {
		this.deltaX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
		this.deltaY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	},
	realOffset: function(element) {
		var valueT = 0,
			valueL = 0;
		do {
			valueT += element.scrollTop || 0;
			valueL += element.scrollLeft || 0;
			element = element.parentNode;
		} while (element);
		return [valueL, valueT];
	},
	cumulativeOffset: function(element) {
		var valueT = 0,
			valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	},
	positionedOffset: function(element) {
		var valueT = 0,
			valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
			if (element) {
				if (element.tagName == 'BODY') break;
				var p = Element.getStyle(element, 'position');
				if (p == 'relative' || p == 'absolute') break;
			}
		} while (element);
		return [valueL, valueT];
	},
	offsetParent: function(element) {
		if (element.offsetParent) return element.offsetParent;
		if (element == document.body) return element;
		while ((element = element.parentNode) && element != document.body)
		if (Element.getStyle(element, 'position') != 'static') return element;
		return document.body;
	},
	// caches x/y coordinate pair to use with overlap
	within: function(element, x, y) {
		if (this.includeScrollOffsets) return this.withinIncludingScrolloffsets(element, x, y);
		this.xcomp = x;
		this.ycomp = y;
		this.offset = this.cumulativeOffset(element);
		return (y >= this.offset[1] && y < this.offset[1] + element.offsetHeight && x >= this.offset[0] && x < this.offset[0] + element.offsetWidth);
	},
	withinIncludingScrolloffsets: function(element, x, y) {
		var offsetcache = this.realOffset(element);
		this.xcomp = x + offsetcache[0] - this.deltaX;
		this.ycomp = y + offsetcache[1] - this.deltaY;
		this.offset = this.cumulativeOffset(element);
		return (this.ycomp >= this.offset[1] && this.ycomp < this.offset[1] + element.offsetHeight && this.xcomp >= this.offset[0] && this.xcomp < this.offset[0] + element.offsetWidth);
	},
	// within must be called directly before
	overlap: function(mode, element) {
		if (!mode) return 0;
		if (mode == 'vertical') return ((this.offset[1] + element.offsetHeight) - this.ycomp) / element.offsetHeight;
		if (mode == 'horizontal') return ((this.offset[0] + element.offsetWidth) - this.xcomp) / element.offsetWidth;
	},
	page: function(forElement) {
		var valueT = 0,
			valueL = 0;
		var element = forElement;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			// Safari fix
			if (element.offsetParent == document.body) if (Element.getStyle(element, 'position') == 'absolute') break;
		} while (element = element.offsetParent);
		element = forElement;
		do {
			if (!window.opera || element.tagName == 'BODY') {
				valueT -= element.scrollTop || 0;
				valueL -= element.scrollLeft || 0;
			}
		} while (element = element.parentNode);
		return [valueL, valueT];
	},
	clone: function(source, target) {
		var options = Object.extend({
			setLeft: true,
			setTop: true,
			setWidth: true,
			setHeight: true,
			offsetTop: 0,
			offsetLeft: 0
		}, arguments[2] || {})
		// find page position of source
		source = call(source);
		var p = Position.page(source);
		// find coordinate system to use
		target = call(target);
		var delta = [0, 0];
		var parent = null;
		// delta [0,0] will do fine with position: fixed elements,
		// position:absolute needs offsetParent deltas
		if (Element.getStyle(target, 'position') == 'absolute') {
			parent = Position.offsetParent(target);
			delta = Position.page(parent);
		}
		// correct by body offsets (fixes Safari)
		if (parent == document.body) {
			delta[0] -= document.body.offsetLeft;
			delta[1] -= document.body.offsetTop;
		}
		// set position
		if (options.setLeft) target.style.left = (p[0] - delta[0] + options.offsetLeft) + 'px';
		if (options.setTop) target.style.top = (p[1] - delta[1] + options.offsetTop) + 'px';
		if (options.setWidth) target.style.width = source.offsetWidth + 'px';
		if (options.setHeight) target.style.height = source.offsetHeight + 'px';
	},
	absolutize: function(element) {
		element = call(element);
		if (element.style.position == 'absolute') return;
		Position.prepare();
		var offsets = Position.positionedOffset(element);
		var top = offsets[1];
		var left = offsets[0];
		var width = element.clientWidth;
		var height = element.clientHeight;
		element._originalLeft = left - parseFloat(element.style.left || 0);
		element._originalTop = top - parseFloat(element.style.top || 0);
		element._originalWidth = element.style.width;
		element._originalHeight = element.style.height;
		element.style.position = 'absolute';
		element.style.top = top + 'px';
		element.style.left = left + 'px';
		element.style.width = width + 'px';
		element.style.height = height + 'px';
	},
	relativize: function(element) {
		element = call(element);
		if (element.style.position == 'relative') return;
		Position.prepare();
		element.style.position = 'relative';
		var top = parseFloat(element.style.top || 0) - (element._originalTop || 0);
		var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);
		element.style.top = top + 'px';
		element.style.left = left + 'px';
		element.style.height = element._originalHeight;
		element.style.width = element._originalWidth;
	}
}
// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (Prototype.Browser.WebKit) {
	Position.cumulativeOffset = function(element) {
		var valueT = 0,
			valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			if (element.offsetParent == document.body) if (Element.getStyle(element, 'position') == 'absolute') break;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
}
Element.addMethods();
// JScript File

function bindiframe(src) {
	document.getElementById("iframevidRefer").src = src;
}

function displaytabFunction(id) {
	if (id == "1") {
		document.getElementById("lightsoff").className = 'FunctionTabNotActive';
		//document.getElementById("TabDownload").className = 'FunctionTabDownloadActive';
		document.getElementById("TabInfo").className = 'FunctionTabNotActive';
		document.getElementById("TabEmbed").className = 'FunctionTabNotActive';
		//        document.getElementById("TabLove").className='FunctionTabNotActive'; 
		//        document.getElementById("TabWarning").className='FunctionTabNotActive'; 
		document.getElementById("TabHelp").className = 'FunctionTabNotActive';
	} else if (id == "2") {
		document.getElementById("lightsoff").className = 'FunctionTabNotActive';
		//document.getElementById("TabDownload").className = 'FunctionTabNotActive';
		document.getElementById("TabInfo").className = 'FunctionTabInfoActive';
		document.getElementById("TabEmbed").className = 'FunctionTabNotActive';
		//        document.getElementById("TabLove").className='FunctionTabNotActive'; 
		//        document.getElementById("TabWarning").className='FunctionTabNotActive'; 
		document.getElementById("TabHelp").className = 'FunctionTabNotActive';
	} else if (id == "3") {
		document.getElementById("lightsoff").className = 'FunctionTabLightOffActive';
		//document.getElementById("TabDownload").className = 'FunctionTabNotActive';
		document.getElementById("TabInfo").className = 'FunctionTabNotActive';
		document.getElementById("TabEmbed").className = 'FunctionTabNotActive';
		//        document.getElementById("TabLove").className='FunctionTabNotActive'; 
		//        document.getElementById("TabWarning").className='FunctionTabNotActive';
		document.getElementById("TabHelp").className = 'FunctionTabNotActive';
	} else if (id == "4") {
		document.getElementById("lightsoff").className = 'FunctionTabNotActive';
		//document.getElementById("TabDownload").className = 'FunctionTabNotActive';
		document.getElementById("TabInfo").className = 'FunctionTabNotActive';
		document.getElementById("TabEmbed").className = 'FunctionTabNotActive';
		//        document.getElementById("TabLove").className='FunctionTabNotActive'; 
		//        document.getElementById("TabWarning").className='FunctionTabNotActive';
		document.getElementById("TabHelp").className = 'FunctionTabHelpActive';
	} else if (id == "5") {
		document.getElementById("lightsoff").className = 'FunctionTabNotActive';
		//document.getElementById("TabDownload").className = 'FunctionTabNotActive';
		document.getElementById("TabInfo").className = 'FunctionTabNotActive';
		document.getElementById("TabEmbed").className = 'FunctionTabEmbedActive';
		//        document.getElementById("TabLove").className = 'FunctionTabNotActive'; 
		//        document.getElementById("TabWarning").className='FunctionTabNotActive'; 
		document.getElementById("TabHelp").className = 'FunctionTabNotActive';
	}
	//    else if ( id =="6") {
	//        document.getElementById("lightsoff").className='FunctionTabNotActive';
	//        document.getElementById("TabDownload").className = 'FunctionTabNotActive';
	//        document.getElementById("TabInfo").className = 'FunctionTabNotActive';
	//        document.getElementById("TabEmbed").className='FunctionTabNotActive'; 
	//        document.getElementById("TabLove").className='FunctionTabNotActive'; 
	//        document.getElementById("TabWarning").className='FunctionTabWarningActive'; 
	//        document.getElementById("TabHelp").className='FunctionTabNotActive';   
	//    }
	//    else if ( id =="7")
	//    {
	//        document.getElementById("lightsoff").className = 'FunctionTabNotActive';
	//        document.getElementById("TabDownload").className = 'FunctionTabNotActive';
	//        document.getElementById("TabInfo").className = 'FunctionTabNotActive';
	//        document.getElementById("TabEmbed").className = 'FunctionTabNotActive';
	//        document.getElementById("TabLove").className = 'FunctionTabLoveActive';
	//        document.getElementById("TabWarning").className = 'FunctionTabNotActive';
	//        document.getElementById("TabHelp").className = 'FunctionTabNotActive'; 
	//    }
	else if (id == "0") {
		document.getElementById("lightsoff").className = 'FunctionTabNotActive';
		//document.getElementById("TabDownload").className='FunctionTabNotActive';
		document.getElementById("TabEmbed").className = 'FunctionTabNotActive';
		document.getElementById("TabLove").className = 'FunctionTabNotActive';
		document.getElementById("TabWarning").className = 'FunctionTabNotActive';
		document.getElementById("TabHelp").className = 'FunctionTabNotActive';
	}
}

function displaytab(id) {
	if (id == "1") {
		document.getElementById("authorRef").className = 'RelateTabActive';
		document.getElementById("contentRef").className = 'RelateTabNotActive';
		document.getElementById("filmRef").className = 'RelateTabNotActive';
	} else if (id == "2") {
		document.getElementById("authorRef").className = 'RelateTabNotActive';
		document.getElementById("contentRef").className = 'RelateTabActive';
		document.getElementById("filmRef").className = 'RelateTabNotActive';
	} else if (id == "3") {
		document.getElementById("authorRef").className = 'RelateTabNotActive';
		document.getElementById("contentRef").className = 'RelateTabNotActive';
		document.getElementById("filmRef").className = 'RelateTabActive';
	}
}

function displaytabFilmEmbed(id) {
	if (id == "1") {
		document.getElementById("root").className = 'RelateTabActive';
		document.getElementById("cache").className = 'RelateTabNotActive';
	} else if (id == "2") {
		document.getElementById("root").className = 'RelateTabNotActive';
		document.getElementById("cache").className = 'RelateTabActive';
	}
}
// JScript File

function clickButton(e, buttonid) {
	var evt = e ? e : window.event;
	var bt = document.getElementById(buttonid);
	if (bt) {
		if (evt.keyCode == 13) {
			bt.click();
			return false;
		}
	}
}

function fnTrapKD(btn, event) {
	if (document.all) {
		if (event.keyCode == 13) {
			event.returnValue = false;
			event.cancel = true;
			btn.click();
		}
	} else if (document.getElementById) {
		if (event.which == 13) {
			event.returnValue = false;
			event.cancel = true;
			btn.click();
		}
	} else if (document.layers) {
		if (event.which == 13) {
			event.returnValue = false;
			event.cancel = true;
			btn.click();
		}
	}
}

function bb_bookmarksite(title, url) {
	if (document.all) window.external.AddFavorite(url, title);
	else if (window.sidebar) window.sidebar.addPanel(title, url, "")
}

function bb_setHomepage(obj) {
	obj.style.behavior = 'url(#default#homepage)';
	if (document.all) {
		obj.setHomePage('http://BaamBoo.com');
	} else {
		alert("Kéo Logo Baamboo vào nút Home để đặt baamboo làm trang chủ");
	}
}

function PNGNotOk() {
	var arVersion = navigator.appVersion.split("MSIE")
	var version = parseFloat(arVersion[1])
	return ((version >= 5.5) && (document.body.filters) && (version < 7));
}

function btnVietkey_onclick(imgID1, imgID2) {
	var temp = document.getElementById(imgID1).src;
	if (temp.substr(temp.lastIndexOf("/") + 1, temp.length) == 'V.gif') {
		setMethod(-1);
		document.getElementById(imgID1).src = '/images/E.gif';
		document.getElementById(imgID2).src = '/images/E.gif';
	} else {
		setMethod(0);
		document.getElementById(imgID1).src = '/images/V.gif';
		document.getElementById(imgID2).src = '/images/V.gif';
	}
	return true;
}

function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6.
{
	var arVersion = navigator.appVersion.split("MSIE")
	var version = parseFloat(arVersion[1])
	if ((version >= 5.5) && (document.body.filters)) {
		for (var i = 0; i < document.images.length; i++) {
			var img = document.images[i]
			var imgName = img.src.toUpperCase()
			if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
				var imgID = (img.id) ? "id='" + img.id + "' " : ""
				var imgClass = (img.className) ? "class='" + img.className + "' " : ""
				var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
				var imgStyle = "display:inline-block;" + img.style.cssText
				if (img.align == "left") imgStyle = "float:left;" + imgStyle
				if (img.align == "right") imgStyle = "float:right;" + imgStyle
				if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
				var strNewHTML = "<span " + imgID + imgClass + imgTitle + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
				img.outerHTML = strNewHTML
				i = i - 1
			}
		}
	}
}

function PNGNotOk() {
	var arVersion = navigator.appVersion.split("MSIE")
	var version = parseFloat(arVersion[1])
	return ((version >= 5.5) && (document.body.filters) && (version < 7));
}

function builtEx(tab, choice) {
	if (tab == "mp3") {
		document.getElementById("divEx1").style.display = "none";
		document.getElementById("divEx2").style.display = "none";
		document.getElementById("divEx3").style.display = "none";
		document.getElementById("divEx4").style.display = "none";
		document.getElementById("divEx" + choice).style.display = "block";
	} else if (tab == "video") {
		document.getElementById("divEx1").style.display = "none";
		document.getElementById("divEx2").style.display = "none";
		document.getElementById("divEx3").style.display = "none";
		document.getElementById("divEx4").style.display = "none";
		if (choice == "1") document.getElementById("divEx1").style.display = "block";
		else if (choice == "2") document.getElementById("divEx4").style.display = "block";
		else if (choice == "5") document.getElementById("divEx2").style.display = "block";
		else if (choice == "3") document.getElementById("divEx3").style.display = "block";
	} else if (tab == "vietdic") {
		document.getElementById("divEx2").style.display = "none";
		document.getElementById("divEx3").style.display = "none";
		document.getElementById("divEx4").style.display = "none";
		document.getElementById("divEx1").style.display = "block";
	} else if (tab == "tratu") {
		document.getElementById("divEx2").style.display = "none";
		document.getElementById("divEx3").style.display = "none";
		document.getElementById("divEx4").style.display = "none";
		document.getElementById("divEx1").style.display = "block";
	}
	if (tab == "blog") {
		document.getElementById("divEx1").style.display = "none";
		document.getElementById("divEx2").style.display = "none";
		document.getElementById("divEx3").style.display = "none";
		document.getElementById("divEx4").style.display = "none";
		document.getElementById("divEx" + choice).style.display = "block";
	}
	makePOSTRequest("/setCookie.aspx?tab=" + tab + "&choice=" + choice, "")
}
var http_request = false;

function makePOSTRequest(url, parameters) {
	http_request = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			// set type accordingly to anticipated content type
			//http_request.overrideMimeType('text/xml');
			http_request.overrideMimeType('text/html');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) {
		alert('Cannot create XMLHTTP instance');
		return false;
	}
	//http_request.onreadystatechange = alertContents;
	http_request.open('POST', url, true);
	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http_request.setRequestHeader("Content-length", parameters.length);
	http_request.setRequestHeader("Connection", "close");
	http_request.send(parameters);
}
/*!
 * jQuery JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function(E, B) {
	function ka(a, b, d) {
		if (d === B && a.nodeType === 1) {
			d = a.getAttribute("data-" + b);
			if (typeof d === "string") {
				try {
					d = d === "true" ? true : d === "false" ? false : d === "null" ? null : !c.isNaN(d) ? parseFloat(d) : Ja.test(d) ? c.parseJSON(d) : d
				} catch (e) {}
				c.data(a, b, d)
			} else d = B
		}
		return d
	}
	function U() {
		return false
	}
	function ca() {
		return true
	}
	function la(a, b, d) {
		d[0].type = a;
		return c.event.handle.apply(b, d)
	}
	function Ka(a) {
		var b, d, e, f, h, l, k, o, x, r, A, C = [];
		f = [];
		h = c.data(this, this.nodeType ? "events" : "__events__");
		if (typeof h === "function") h =
		h.events;
		if (!(a.liveFired === this || !h || !h.live || a.button && a.type === "click")) {
			if (a.namespace) A = RegExp("(^|\\.)" + a.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
			a.liveFired = this;
			var J = h.live.slice(0);
			for (k = 0; k < J.length; k++) {
				h = J[k];
				h.origType.replace(X, "") === a.type ? f.push(h.selector) : J.splice(k--, 1)
			}
			f = c(a.target).closest(f, a.currentTarget);
			o = 0;
			for (x = f.length; o < x; o++) {
				r = f[o];
				for (k = 0; k < J.length; k++) {
					h = J[k];
					if (r.selector === h.selector && (!A || A.test(h.namespace))) {
						l = r.elem;
						e = null;
						if (h.preType === "mouseenter" || h.preType === "mouseleave") {
							a.type = h.preType;
							e = c(a.relatedTarget).closest(h.selector)[0]
						}
						if (!e || e !== l) C.push({
							elem: l,
							handleObj: h,
							level: r.level
						})
					}
				}
			}
			o = 0;
			for (x = C.length; o < x; o++) {
				f = C[o];
				if (d && f.level > d) break;
				a.currentTarget = f.elem;
				a.data = f.handleObj.data;
				a.handleObj = f.handleObj;
				A = f.handleObj.origHandler.apply(f.elem, arguments);
				if (A === false || a.isPropagationStopped()) {
					d = f.level;
					if (A === false) b = false;
					if (a.isImmediatePropagationStopped()) break
				}
			}
			return b
		}
	}
	function Y(a, b) {
		return (a && a !== "*" ? a + "." : "") + b.replace(La, "`").replace(Ma, "&")
	}
	function ma(a, b, d) {
		if (c.isFunction(b)) return c.grep(a, function(f, h) {
			return !!b.call(f, h, f) === d
		});
		else if (b.nodeType) return c.grep(a, function(f) {
			return f === b === d
		});
		else if (typeof b === "string") {
			var e = c.grep(a, function(f) {
				return f.nodeType === 1
			});
			if (Na.test(b)) return c.filter(b, e, !d);
			else b = c.filter(b, e)
		}
		return c.grep(a, function(f) {
			return c.inArray(f, b) >= 0 === d
		})
	}
	function na(a, b) {
		var d = 0;
		b.each(function() {
			if (this.nodeName === (a[d] && a[d].nodeName)) {
				var e = c.data(a[d++]),
					f = c.data(this, e);
				if (e = e && e.events) {
					delete f.handle;
					f.events = {};
					for (var h in e) for (var l in e[h]) c.event.add(this, h, e[h][l], e[h][l].data)
				}
			}
		})
	}
	function Oa(a, b) {
		b.src ? c.ajax({
			url: b.src,
			async: false,
			dataType: "script"
		}) : c.globalEval(b.text || b.textContent || b.innerHTML || "");
		b.parentNode && b.parentNode.removeChild(b)
	}
	function oa(a, b, d) {
		var e = b === "width" ? a.offsetWidth : a.offsetHeight;
		if (d === "border") return e;
		c.each(b === "width" ? Pa : Qa, function() {
			d || (e -= parseFloat(c.css(a, "padding" + this)) || 0);
			if (d === "margin") e += parseFloat(c.css(a, "margin" + this)) || 0;
			else e -= parseFloat(c.css(a, "border" + this + "Width")) || 0
		});
		return e
	}
	function da(a, b, d, e) {
		if (c.isArray(b) && b.length) c.each(b, function(f, h) {
			d || Ra.test(a) ? e(a, h) : da(a + "[" + (typeof h === "object" || c.isArray(h) ? f : "") + "]", h, d, e)
		});
		else if (!d && b != null && typeof b === "object") c.isEmptyObject(b) ? e(a, "") : c.each(b, function(f, h) {
			da(a + "[" + f + "]", h, d, e)
		});
		else e(a, b)
	}
	function S(a, b) {
		var d = {};
		c.each(pa.concat.apply([], pa.slice(0, b)), function() {
			d[this] = a
		});
		return d
	}
	function qa(a) {
		if (!ea[a]) {
			var b = c("<" + a + ">").appendTo("body"),
				d = b.css("display");
			b.remove();
			if (d === "none" || d === "") d = "block";
			ea[a] = d
		}
		return ea[a]
	}
	function fa(a) {
		return c.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
	}
	var t = E.document,
		c = function() {
			function a() {
				if (!b.isReady) {
					try {
						t.documentElement.doScroll("left")
					} catch (j) {
						setTimeout(a, 1);
						return
					}
					b.ready()
				}
			}
			var b = function(j, s) {
				return new b.fn.init(j, s)
			},
				d = E.jQuery,
				e = E.$,
				f, h = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
				l = /\S/,
				k = /^\s+/,
				o = /\s+$/,
				x = /\W/,
				r = /\d/,
				A = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
				C = /^[\],:{}\s]*$/,
				J = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
				w = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				I = /(?:^|:|,)(?:\s*\[)+/g,
				L = /(webkit)[ \/]([\w.]+)/,
				g = /(opera)(?:.*version)?[ \/]([\w.]+)/,
				i = /(msie) ([\w.]+)/,
				n = /(mozilla)(?:.*? rv:([\w.]+))?/,
				m = navigator.userAgent,
				p = false,
				q = [],
				u, y = Object.prototype.toString,
				F = Object.prototype.hasOwnProperty,
				M = Array.prototype.push,
				N = Array.prototype.slice,
				O = String.prototype.trim,
				D = Array.prototype.indexOf,
				R = {};
			b.fn = b.prototype = {
				init: function(j, s) {
					var v, z, H;
					if (!j) return this;
					if (j.nodeType) {
						this.context = this[0] = j;
						this.length = 1;
						return this
					}
					if (j === "body" && !s && t.body) {
						this.context = t;
						this[0] = t.body;
						this.selector = "body";
						this.length = 1;
						return this
					}
					if (typeof j === "string") if ((v = h.exec(j)) && (v[1] || !s)) if (v[1]) {
						H = s ? s.ownerDocument || s : t;
						if (z = A.exec(j)) if (b.isPlainObject(s)) {
							j = [t.createElement(z[1])];
							b.fn.attr.call(j, s, true)
						} else j = [H.createElement(z[1])];
						else {
							z = b.buildFragment([v[1]], [H]);
							j = (z.cacheable ? z.fragment.cloneNode(true) : z.fragment).childNodes
						}
						return b.merge(this, j)
					} else {
						if ((z = t.getElementById(v[2])) && z.parentNode) {
							if (z.id !== v[2]) return f.find(j);
							this.length = 1;
							this[0] = z
						}
						this.context = t;
						this.selector = j;
						return this
					} else if (!s && !x.test(j)) {
						this.selector = j;
						this.context = t;
						j = t.getElementsByTagName(j);
						return b.merge(this, j)
					} else
					return !s || s.jquery ? (s || f).find(j) : b(s).find(j);
					else if (b.isFunction(j)) return f.ready(j);
					if (j.selector !== B) {
						this.selector = j.selector;
						this.context = j.context
					}
					return b.makeArray(j, this)
				},
				selector: "",
				jquery: "1.4.4",
				length: 0,
				size: function() {
					return this.length
				},
				toArray: function() {
					return N.call(this, 0)
				},
				get: function(j) {
					return j == null ? this.toArray() : j < 0 ? this.slice(j)[0] : this[j]
				},
				pushStack: function(j, s, v) {
					var z = b();
					b.isArray(j) ? M.apply(z, j) : b.merge(z, j);
					z.prevObject = this;
					z.context = this.context;
					if (s === "find") z.selector = this.selector + (this.selector ? " " : "") + v;
					else if (s) z.selector = this.selector + "." + s + "(" + v + ")";
					return z
				},
				each: function(j, s) {
					return b.each(this, j, s)
				},
				ready: function(j) {
					b.bindReady();
					if (b.isReady) j.call(t, b);
					else q && q.push(j);
					return this
				},
				eq: function(j) {
					return j === -1 ? this.slice(j) : this.slice(j, +j + 1)
				},
				first: function() {
					return this.eq(0)
				},
				last: function() {
					return this.eq(-1)
				},
				slice: function() {
					return this.pushStack(N.apply(this, arguments), "slice", N.call(arguments).join(","))
				},
				map: function(j) {
					return this.pushStack(b.map(this, function(s, v) {
						return j.call(s, v, s)
					}))
				},
				end: function() {
					return this.prevObject || b(null)
				},
				push: M,
				sort: [].sort,
				splice: [].splice
			};
			b.fn.init.prototype = b.fn;
			b.extend = b.fn.extend = function() {
				var j, s, v, z, H, G = arguments[0] || {},
					K = 1,
					Q = arguments.length,
					ga = false;
				if (typeof G === "boolean") {
					ga = G;
					G = arguments[1] || {};
					K = 2
				}
				if (typeof G !== "object" && !b.isFunction(G)) G = {};
				if (Q === K) {
					G = this;
					--K
				}
				for (; K < Q; K++) if ((j = arguments[K]) != null) for (s in j) {
					v = G[s];
					z = j[s];
					if (G !== z) if (ga && z && (b.isPlainObject(z) || (H = b.isArray(z)))) {
						if (H) {
							H = false;
							v = v && b.isArray(v) ? v : []
						} else v = v && b.isPlainObject(v) ? v : {};
						G[s] = b.extend(ga, v, z)
					} else if (z !== B) G[s] = z
				}
				return G
			};
			b.extend({
				noConflict: function(j) {
					E.$ = e;
					if (j) E.jQuery = d;
					return b
				},
				isReady: false,
				readyWait: 1,
				ready: function(j) {
					j === true && b.readyWait--;
					if (!b.readyWait || j !== true && !b.isReady) {
						if (!t.body) return setTimeout(b.ready, 1);
						b.isReady = true;
						if (!(j !== true && --b.readyWait > 0)) if (q) {
							var s = 0,
								v = q;
							for (q = null; j = v[s++];) j.call(t, b);
							b.fn.trigger && b(t).trigger("ready").unbind("ready")
						}
					}
				},
				bindReady: function() {
					if (!p) {
						p = true;
						if (t.readyState === "complete") return setTimeout(b.ready, 1);
						if (t.addEventListener) {
							t.addEventListener("DOMContentLoaded", u, false);
							E.addEventListener("load", b.ready, false)
						} else if (t.attachEvent) {
							t.attachEvent("onreadystatechange", u);
							E.attachEvent("onload", b.ready);
							var j = false;
							try {
								j = E.frameElement == null
							} catch (s) {}
							t.documentElement.doScroll && j && a()
						}
					}
				},
				isFunction: function(j) {
					return b.type(j) === "function"
				},
				isArray: Array.isArray ||
				function(j) {
					return b.type(j) === "array"
				},
				isWindow: function(j) {
					return j && typeof j === "object" && "setInterval" in j
				},
				isNaN: function(j) {
					return j == null || !r.test(j) || isNaN(j)
				},
				type: function(j) {
					return j == null ? String(j) : R[y.call(j)] || "object"
				},
				isPlainObject: function(j) {
					if (!j || b.type(j) !== "object" || j.nodeType || b.isWindow(j)) return false;
					if (j.constructor && !F.call(j, "constructor") && !F.call(j.constructor.prototype, "isPrototypeOf")) return false;
					for (var s in j);
					return s === B || F.call(j, s)
				},
				isEmptyObject: function(j) {
					for (var s in j) return false;
					return true
				},
				error: function(j) {
					throw j;
				},
				parseJSON: function(j) {
					if (typeof j !== "string" || !j) return null;
					j = b.trim(j);
					if (C.test(j.replace(J, "@").replace(w, "]").replace(I, ""))) return E.JSON && E.JSON.parse ? E.JSON.parse(j) : (new Function("return " + j))();
					else b.error("Invalid JSON: " + j)
				},
				noop: function() {},
				globalEval: function(j) {
					if (j && l.test(j)) {
						var s = t.getElementsByTagName("head")[0] || t.documentElement,
							v = t.createElement("script");
						v.type = "text/javascript";
						if (b.support.scriptEval) v.appendChild(t.createTextNode(j));
						else v.text = j;
						s.insertBefore(v, s.firstChild);
						s.removeChild(v)
					}
				},
				nodeName: function(j, s) {
					return j.nodeName && j.nodeName.toUpperCase() === s.toUpperCase()
				},
				each: function(j, s, v) {
					var z, H = 0,
						G = j.length,
						K = G === B || b.isFunction(j);
					if (v) if (K) for (z in j) {
						if (s.apply(j[z], v) === false) break
					} else
					for (; H < G;) {
						if (s.apply(j[H++], v) === false) break
					} else if (K) for (z in j) {
						if (s.call(j[z], z, j[z]) === false) break
					} else
					for (v = j[0]; H < G && s.call(v, H, v) !== false; v = j[++H]);
					return j
				},
				trim: O ?
				function(j) {
					return j == null ? "" : O.call(j)
				} : function(j) {
					return j == null ? "" : j.toString().replace(k, "").replace(o, "")
				},
				makeArray: function(j, s) {
					var v = s || [];
					if (j != null) {
						var z = b.type(j);
						j.length == null || z === "string" || z === "function" || z === "regexp" || b.isWindow(j) ? M.call(v, j) : b.merge(v, j)
					}
					return v
				},
				inArray: function(j, s) {
					if (s.indexOf) return s.indexOf(j);
					for (var v = 0, z = s.length; v < z; v++) if (s[v] === j) return v;
					return -1
				},
				merge: function(j, s) {
					var v = j.length,
						z = 0;
					if (typeof s.length === "number") for (var H = s.length; z < H; z++) j[v++] = s[z];
					else
					for (; s[z] !== B;) j[v++] = s[z++];
					j.length = v;
					return j
				},
				grep: function(j, s, v) {
					var z = [],
						H;
					v = !! v;
					for (var G = 0, K = j.length; G < K; G++) {
						H = !! s(j[G], G);
						v !== H && z.push(j[G])
					}
					return z
				},
				map: function(j, s, v) {
					for (var z = [], H, G = 0, K = j.length; G < K; G++) {
						H = s(j[G], G, v);
						if (H != null) z[z.length] = H
					}
					return z.concat.apply([], z)
				},
				guid: 1,
				proxy: function(j, s, v) {
					if (arguments.length === 2) if (typeof s === "string") {
						v = j;
						j = v[s];
						s = B
					} else if (s && !b.isFunction(s)) {
						v =
						s;
						s = B
					}
					if (!s && j) s = function() {
						return j.apply(v || this, arguments)
					};
					if (j) s.guid = j.guid = j.guid || s.guid || b.guid++;
					return s
				},
				access: function(j, s, v, z, H, G) {
					var K = j.length;
					if (typeof s === "object") {
						for (var Q in s) b.access(j, Q, s[Q], z, H, v);
						return j
					}
					if (v !== B) {
						z = !G && z && b.isFunction(v);
						for (Q = 0; Q < K; Q++) H(j[Q], s, z ? v.call(j[Q], Q, H(j[Q], s)) : v, G);
						return j
					}
					return K ? H(j[0], s) : B
				},
				now: function() {
					return (new Date).getTime()
				},
				uaMatch: function(j) {
					j = j.toLowerCase();
					j = L.exec(j) || g.exec(j) || i.exec(j) || j.indexOf("compatible") < 0 && n.exec(j) || [];
					return {
						browser: j[1] || "",
						version: j[2] || "0"
					}
				},
				browser: {}
			});
			b.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(j, s) {
				R["[object " + s + "]"] = s.toLowerCase()
			});
			m = b.uaMatch(m);
			if (m.browser) {
				b.browser[m.browser] = true;
				b.browser.version = m.version
			}
			if (b.browser.webkit) b.browser.safari = true;
			if (D) b.inArray = function(j, s) {
				return D.call(s, j)
			};
			if (!/\s/.test("\u00a0")) {
				k = /^[\s\xA0]+/;
				o = /[\s\xA0]+$/
			}
			f = b(t);
			if (t.addEventListener) u = function() {
				t.removeEventListener("DOMContentLoaded", u, false);
				b.ready()
			};
			else if (t.attachEvent) u = function() {
				if (t.readyState === "complete") {
					t.detachEvent("onreadystatechange", u);
					b.ready()
				}
			};
			return E.jQuery = E.$ = b
		}();
	(function() {
		c.support = {};
		var a = t.documentElement,
			b = t.createElement("script"),
			d = t.createElement("div"),
			e = "script" + c.now();
		d.style.display = "none";
		d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
		var f = d.getElementsByTagName("*"),
			h = d.getElementsByTagName("a")[0],
			l = t.createElement("select"),
			k = l.appendChild(t.createElement("option"));
		if (!(!f || !f.length || !h)) {
			c.support = {
				leadingWhitespace: d.firstChild.nodeType === 3,
				tbody: !d.getElementsByTagName("tbody").length,
				htmlSerialize: !! d.getElementsByTagName("link").length,
				style: /red/.test(h.getAttribute("style")),
				hrefNormalized: h.getAttribute("href") === "/a",
				opacity: /^0.55$/.test(h.style.opacity),
				cssFloat: !! h.style.cssFloat,
				checkOn: d.getElementsByTagName("input")[0].value === "on",
				optSelected: k.selected,
				deleteExpando: true,
				optDisabled: false,
				checkClone: false,
				scriptEval: false,
				noCloneEvent: true,
				boxModel: null,
				inlineBlockNeedsLayout: false,
				shrinkWrapBlocks: false,
				reliableHiddenOffsets: true
			};
			l.disabled = true;
			c.support.optDisabled = !k.disabled;
			b.type = "text/javascript";
			try {
				b.appendChild(t.createTextNode("window." + e + "=1;"))
			} catch (o) {}
			a.insertBefore(b, a.firstChild);
			if (E[e]) {
				c.support.scriptEval = true;
				delete E[e]
			}
			try {
				delete b.test
			} catch (x) {
				c.support.deleteExpando = false
			}
			a.removeChild(b);
			if (d.attachEvent && d.fireEvent) {
				d.attachEvent("onclick", function r() {
					c.support.noCloneEvent =
					false;
					d.detachEvent("onclick", r)
				});
				d.cloneNode(true).fireEvent("onclick")
			}
			d = t.createElement("div");
			d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
			a = t.createDocumentFragment();
			a.appendChild(d.firstChild);
			c.support.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked;
			c(function() {
				var r = t.createElement("div");
				r.style.width = r.style.paddingLeft = "1px";
				t.body.appendChild(r);
				c.boxModel = c.support.boxModel = r.offsetWidth === 2;
				if ("zoom" in r.style) {
					r.style.display = "inline";
					r.style.zoom =
					1;
					c.support.inlineBlockNeedsLayout = r.offsetWidth === 2;
					r.style.display = "";
					r.innerHTML = "<div style='width:4px;'></div>";
					c.support.shrinkWrapBlocks = r.offsetWidth !== 2
				}
				r.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
				var A = r.getElementsByTagName("td");
				c.support.reliableHiddenOffsets = A[0].offsetHeight === 0;
				A[0].style.display = "";
				A[1].style.display = "none";
				c.support.reliableHiddenOffsets = c.support.reliableHiddenOffsets && A[0].offsetHeight === 0;
				r.innerHTML = "";
				t.body.removeChild(r).style.display = "none"
			});
			a = function(r) {
				var A = t.createElement("div");
				r = "on" + r;
				var C = r in A;
				if (!C) {
					A.setAttribute(r, "return;");
					C = typeof A[r] === "function"
				}
				return C
			};
			c.support.submitBubbles = a("submit");
			c.support.changeBubbles = a("change");
			a = b = d = f = h = null
		}
	})();
	var ra = {},
		Ja = /^(?:\{.*\}|\[.*\])$/;
	c.extend({
		cache: {},
		uuid: 0,
		expando: "jQuery" + c.now(),
		noData: {
			embed: true,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: true
		},
		data: function(a, b, d) {
			if (c.acceptData(a)) {
				a = a == E ? ra : a;
				var e = a.nodeType,
					f = e ? a[c.expando] : null,
					h =
					c.cache;
				if (!(e && !f && typeof b === "string" && d === B)) {
					if (e) f || (a[c.expando] = f = ++c.uuid);
					else h = a;
					if (typeof b === "object") if (e) h[f] = c.extend(h[f], b);
					else c.extend(h, b);
					else if (e && !h[f]) h[f] = {};
					a = e ? h[f] : h;
					if (d !== B) a[b] = d;
					return typeof b === "string" ? a[b] : a
				}
			}
		},
		removeData: function(a, b) {
			if (c.acceptData(a)) {
				a = a == E ? ra : a;
				var d = a.nodeType,
					e = d ? a[c.expando] : a,
					f = c.cache,
					h = d ? f[e] : e;
				if (b) {
					if (h) {
						delete h[b];
						d && c.isEmptyObject(h) && c.removeData(a)
					}
				} else if (d && c.support.deleteExpando) delete a[c.expando];
				else if (a.removeAttribute) a.removeAttribute(c.expando);
				else if (d) delete f[e];
				else
				for (var l in a) delete a[l]
			}
		},
		acceptData: function(a) {
			if (a.nodeName) {
				var b = c.noData[a.nodeName.toLowerCase()];
				if (b) return !(b === true || a.getAttribute("classid") !== b)
			}
			return true
		}
	});
	c.fn.extend({
		data: function(a, b) {
			var d = null;
			if (typeof a === "undefined") {
				if (this.length) {
					var e = this[0].attributes,
						f;
					d = c.data(this[0]);
					for (var h = 0, l = e.length; h < l; h++) {
						f = e[h].name;
						if (f.indexOf("data-") === 0) {
							f = f.substr(5);
							ka(this[0], f, d[f])
						}
					}
				}
				return d
			} else if (typeof a === "object") return this.each(function() {
				c.data(this, a)
			});
			var k = a.split(".");
			k[1] = k[1] ? "." + k[1] : "";
			if (b === B) {
				d = this.triggerHandler("getData" + k[1] + "!", [k[0]]);
				if (d === B && this.length) {
					d = c.data(this[0], a);
					d = ka(this[0], a, d)
				}
				return d === B && k[1] ? this.data(k[0]) : d
			} else
			return this.each(function() {
				var o = c(this),
					x = [k[0], b];
				o.triggerHandler("setData" + k[1] + "!", x);
				c.data(this, a, b);
				o.triggerHandler("changeData" + k[1] + "!", x)
			})
		},
		removeData: function(a) {
			return this.each(function() {
				c.removeData(this, a)
			})
		}
	});
	c.extend({
		queue: function(a, b, d) {
			if (a) {
				b = (b || "fx") + "queue";
				var e =
				c.data(a, b);
				if (!d) return e || [];
				if (!e || c.isArray(d)) e = c.data(a, b, c.makeArray(d));
				else e.push(d);
				return e
			}
		},
		dequeue: function(a, b) {
			b = b || "fx";
			var d = c.queue(a, b),
				e = d.shift();
			if (e === "inprogress") e = d.shift();
			if (e) {
				b === "fx" && d.unshift("inprogress");
				e.call(a, function() {
					c.dequeue(a, b)
				})
			}
		}
	});
	c.fn.extend({
		queue: function(a, b) {
			if (typeof a !== "string") {
				b = a;
				a = "fx"
			}
			if (b === B) return c.queue(this[0], a);
			return this.each(function() {
				var d = c.queue(this, a, b);
				a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
			})
		},
		dequeue: function(a) {
			return this.each(function() {
				c.dequeue(this, a)
			})
		},
		delay: function(a, b) {
			a = c.fx ? c.fx.speeds[a] || a : a;
			b = b || "fx";
			return this.queue(b, function() {
				var d = this;
				setTimeout(function() {
					c.dequeue(d, b)
				}, a)
			})
		},
		clearQueue: function(a) {
			return this.queue(a || "fx", [])
		}
	});
	var sa = /[\n\t]/g,
		ha = /\s+/,
		Sa = /\r/g,
		Ta = /^(?:href|src|style)$/,
		Ua = /^(?:button|input)$/i,
		Va = /^(?:button|input|object|select|textarea)$/i,
		Wa = /^a(?:rea)?$/i,
		ta = /^(?:radio|checkbox)$/i;
	c.props = {
		"for": "htmlFor",
		"class": "className",
		readonly: "readOnly",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		rowspan: "rowSpan",
		colspan: "colSpan",
		tabindex: "tabIndex",
		usemap: "useMap",
		frameborder: "frameBorder"
	};
	c.fn.extend({
		attr: function(a, b) {
			return c.access(this, a, b, true, c.attr)
		},
		removeAttr: function(a) {
			return this.each(function() {
				c.attr(this, a, "");
				this.nodeType === 1 && this.removeAttribute(a)
			})
		},
		addClass: function(a) {
			if (c.isFunction(a)) return this.each(function(x) {
				var r = c(this);
				r.addClass(a.call(this, x, r.attr("class")))
			});
			if (a && typeof a === "string") for (var b = (a || "").split(ha), d = 0, e = this.length; d < e; d++) {
				var f = this[d];
				if (f.nodeType === 1) if (f.className) {
					for (var h = " " + f.className + " ", l = f.className, k = 0, o = b.length; k < o; k++) if (h.indexOf(" " + b[k] + " ") < 0) l += " " + b[k];
					f.className = c.trim(l)
				} else f.className = a
			}
			return this
		},
		removeClass: function(a) {
			if (c.isFunction(a)) return this.each(function(o) {
				var x = c(this);
				x.removeClass(a.call(this, o, x.attr("class")))
			});
			if (a && typeof a === "string" || a === B) for (var b = (a || "").split(ha), d = 0, e = this.length; d < e; d++) {
				var f = this[d];
				if (f.nodeType === 1 && f.className) if (a) {
					for (var h = (" " + f.className + " ").replace(sa, " "), l = 0, k = b.length; l < k; l++) h = h.replace(" " + b[l] + " ", " ");
					f.className = c.trim(h)
				} else f.className = ""
			}
			return this
		},
		toggleClass: function(a, b) {
			var d = typeof a,
				e = typeof b === "boolean";
			if (c.isFunction(a)) return this.each(function(f) {
				var h = c(this);
				h.toggleClass(a.call(this, f, h.attr("class"), b), b)
			});
			return this.each(function() {
				if (d === "string") for (var f, h = 0, l = c(this), k = b, o = a.split(ha); f = o[h++];) {
					k = e ? k : !l.hasClass(f);
					l[k ? "addClass" : "removeClass"](f)
				} else if (d === "undefined" || d === "boolean") {
					this.className && c.data(this, "__className__", this.className);
					this.className = this.className || a === false ? "" : c.data(this, "__className__") || ""
				}
			})
		},
		hasClass: function(a) {
			a = " " + a + " ";
			for (var b = 0, d = this.length; b < d; b++) if ((" " + this[b].className + " ").replace(sa, " ").indexOf(a) > -1) return true;
			return false
		},
		val: function(a) {
			if (!arguments.length) {
				var b = this[0];
				if (b) {
					if (c.nodeName(b, "option")) {
						var d = b.attributes.value;
						return !d || d.specified ? b.value : b.text
					}
					if (c.nodeName(b, "select")) {
						var e = b.selectedIndex;
						d = [];
						var f = b.options;
						b = b.type === "select-one";
						if (e < 0) return null;
						var h = b ? e : 0;
						for (e = b ? e + 1 : f.length; h < e; h++) {
							var l = f[h];
							if (l.selected && (c.support.optDisabled ? !l.disabled : l.getAttribute("disabled") === null) && (!l.parentNode.disabled || !c.nodeName(l.parentNode, "optgroup"))) {
								a = c(l).val();
								if (b) return a;
								d.push(a)
							}
						}
						return d
					}
					if (ta.test(b.type) && !c.support.checkOn) return b.getAttribute("value") === null ? "on" : b.value;
					return (b.value || "").replace(Sa, "")
				}
				return B
			}
			var k = c.isFunction(a);
			return this.each(function(o) {
				var x = c(this),
					r = a;
				if (this.nodeType === 1) {
					if (k) r =
					a.call(this, o, x.val());
					if (r == null) r = "";
					else if (typeof r === "number") r += "";
					else if (c.isArray(r)) r = c.map(r, function(C) {
						return C == null ? "" : C + ""
					});
					if (c.isArray(r) && ta.test(this.type)) this.checked = c.inArray(x.val(), r) >= 0;
					else if (c.nodeName(this, "select")) {
						var A = c.makeArray(r);
						c("option", this).each(function() {
							this.selected = c.inArray(c(this).val(), A) >= 0
						});
						if (!A.length) this.selectedIndex = -1
					} else this.value = r
				}
			})
		}
	});
	c.extend({
		attrFn: {
			val: true,
			css: true,
			html: true,
			text: true,
			data: true,
			width: true,
			height: true,
			offset: true
		},
		attr: function(a, b, d, e) {
			if (!a || a.nodeType === 3 || a.nodeType === 8) return B;
			if (e && b in c.attrFn) return c(a)[b](d);
			e = a.nodeType !== 1 || !c.isXMLDoc(a);
			var f = d !== B;
			b = e && c.props[b] || b;
			var h = Ta.test(b);
			if ((b in a || a[b] !== B) && e && !h) {
				if (f) {
					b === "type" && Ua.test(a.nodeName) && a.parentNode && c.error("type property can't be changed");
					if (d === null) a.nodeType === 1 && a.removeAttribute(b);
					else a[b] = d
				}
				if (c.nodeName(a, "form") && a.getAttributeNode(b)) return a.getAttributeNode(b).nodeValue;
				if (b === "tabIndex") return (b = a.getAttributeNode("tabIndex")) && b.specified ? b.value : Va.test(a.nodeName) || Wa.test(a.nodeName) && a.href ? 0 : B;
				return a[b]
			}
			if (!c.support.style && e && b === "style") {
				if (f) a.style.cssText = "" + d;
				return a.style.cssText
			}
			f && a.setAttribute(b, "" + d);
			if (!a.attributes[b] && a.hasAttribute && !a.hasAttribute(b)) return B;
			a = !c.support.hrefNormalized && e && h ? a.getAttribute(b, 2) : a.getAttribute(b);
			return a === null ? B : a
		}
	});
	var X = /\.(.*)$/,
		ia = /^(?:textarea|input|select)$/i,
		La = /\./g,
		Ma = / /g,
		Xa = /[^\w\s.|`]/g,
		Ya = function(a) {
			return a.replace(Xa, "\\$&")
		},
		ua = {
			focusin: 0,
			focusout: 0
		};
	c.event = {
		add: function(a, b, d, e) {
			if (!(a.nodeType === 3 || a.nodeType === 8)) {
				if (c.isWindow(a) && a !== E && !a.frameElement) a = E;
				if (d === false) d = U;
				else if (!d) return;
				var f, h;
				if (d.handler) {
					f = d;
					d = f.handler
				}
				if (!d.guid) d.guid = c.guid++;
				if (h = c.data(a)) {
					var l = a.nodeType ? "events" : "__events__",
						k = h[l],
						o = h.handle;
					if (typeof k === "function") {
						o = k.handle;
						k = k.events
					} else if (!k) {
						a.nodeType || (h[l] = h = function() {});
						h.events = k = {}
					}
					if (!o) h.handle = o = function() {
						return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(o.elem, arguments) : B
					};
					o.elem = a;
					b = b.split(" ");
					for (var x = 0, r; l = b[x++];) {
						h = f ? c.extend({}, f) : {
							handler: d,
							data: e
						};
						if (l.indexOf(".") > -1) {
							r = l.split(".");
							l = r.shift();
							h.namespace = r.slice(0).sort().join(".")
						} else {
							r = [];
							h.namespace = ""
						}
						h.type = l;
						if (!h.guid) h.guid = d.guid;
						var A = k[l],
							C = c.event.special[l] || {};
						if (!A) {
							A = k[l] = [];
							if (!C.setup || C.setup.call(a, e, r, o) === false) if (a.addEventListener) a.addEventListener(l, o, false);
							else a.attachEvent && a.attachEvent("on" + l, o)
						}
						if (C.add) {
							C.add.call(a, h);
							if (!h.handler.guid) h.handler.guid =
							d.guid
						}
						A.push(h);
						c.event.global[l] = true
					}
					a = null
				}
			}
		},
		global: {},
		remove: function(a, b, d, e) {
			if (!(a.nodeType === 3 || a.nodeType === 8)) {
				if (d === false) d = U;
				var f, h, l = 0,
					k, o, x, r, A, C, J = a.nodeType ? "events" : "__events__",
					w = c.data(a),
					I = w && w[J];
				if (w && I) {
					if (typeof I === "function") {
						w = I;
						I = I.events
					}
					if (b && b.type) {
						d = b.handler;
						b = b.type
					}
					if (!b || typeof b === "string" && b.charAt(0) === ".") {
						b = b || "";
						for (f in I) c.event.remove(a, f + b)
					} else {
						for (b = b.split(" "); f = b[l++];) {
							r = f;
							k = f.indexOf(".") < 0;
							o = [];
							if (!k) {
								o = f.split(".");
								f = o.shift();
								x = RegExp("(^|\\.)" + c.map(o.slice(0).sort(), Ya).join("\\.(?:.*\\.)?") + "(\\.|$)")
							}
							if (A = I[f]) if (d) {
								r = c.event.special[f] || {};
								for (h = e || 0; h < A.length; h++) {
									C = A[h];
									if (d.guid === C.guid) {
										if (k || x.test(C.namespace)) {
											e == null && A.splice(h--, 1);
											r.remove && r.remove.call(a, C)
										}
										if (e != null) break
									}
								}
								if (A.length === 0 || e != null && A.length === 1) {
									if (!r.teardown || r.teardown.call(a, o) === false) c.removeEvent(a, f, w.handle);
									delete I[f]
								}
							} else
							for (h = 0; h < A.length; h++) {
								C = A[h];
								if (k || x.test(C.namespace)) {
									c.event.remove(a, r, C.handler, h);
									A.splice(h--, 1)
								}
							}
						}
						if (c.isEmptyObject(I)) {
							if (b =
							w.handle) b.elem = null;
							delete w.events;
							delete w.handle;
							if (typeof w === "function") c.removeData(a, J);
							else c.isEmptyObject(w) && c.removeData(a)
						}
					}
				}
			}
		},
		trigger: function(a, b, d, e) {
			var f = a.type || a;
			if (!e) {
				a = typeof a === "object" ? a[c.expando] ? a : c.extend(c.Event(f), a) : c.Event(f);
				if (f.indexOf("!") >= 0) {
					a.type = f = f.slice(0, -1);
					a.exclusive = true
				}
				if (!d) {
					a.stopPropagation();
					c.event.global[f] && c.each(c.cache, function() {
						this.events && this.events[f] && c.event.trigger(a, b, this.handle.elem)
					})
				}
				if (!d || d.nodeType === 3 || d.nodeType === 8) return B;
				a.result = B;
				a.target = d;
				b = c.makeArray(b);
				b.unshift(a)
			}
			a.currentTarget = d;
			(e = d.nodeType ? c.data(d, "handle") : (c.data(d, "__events__") || {}).handle) && e.apply(d, b);
			e = d.parentNode || d.ownerDocument;
			try {
				if (!(d && d.nodeName && c.noData[d.nodeName.toLowerCase()])) if (d["on" + f] && d["on" + f].apply(d, b) === false) {
					a.result = false;
					a.preventDefault()
				}
			} catch (h) {}
			if (!a.isPropagationStopped() && e) c.event.trigger(a, b, e, true);
			else if (!a.isDefaultPrevented()) {
				var l;
				e = a.target;
				var k = f.replace(X, ""),
					o = c.nodeName(e, "a") && k === "click",
					x = c.event.special[k] || {};
				if ((!x._default || x._default.call(d, a) === false) && !o && !(e && e.nodeName && c.noData[e.nodeName.toLowerCase()])) {
					try {
						if (e[k]) {
							if (l = e["on" + k]) e["on" + k] = null;
							c.event.triggered = true;
							e[k]()
						}
					} catch (r) {}
					if (l) e["on" + k] = l;
					c.event.triggered = false
				}
			}
		},
		handle: function(a) {
			var b, d, e, f;
			d = [];
			var h = c.makeArray(arguments);
			a = h[0] = c.event.fix(a || E.event);
			a.currentTarget = this;
			b = a.type.indexOf(".") < 0 && !a.exclusive;
			if (!b) {
				e = a.type.split(".");
				a.type = e.shift();
				d = e.slice(0).sort();
				e = RegExp("(^|\\.)" + d.join("\\.(?:.*\\.)?") + "(\\.|$)")
			}
			a.namespace = a.namespace || d.join(".");
			f = c.data(this, this.nodeType ? "events" : "__events__");
			if (typeof f === "function") f = f.events;
			d = (f || {})[a.type];
			if (f && d) {
				d = d.slice(0);
				f = 0;
				for (var l = d.length; f < l; f++) {
					var k = d[f];
					if (b || e.test(k.namespace)) {
						a.handler = k.handler;
						a.data = k.data;
						a.handleObj = k;
						k = k.handler.apply(this, h);
						if (k !== B) {
							a.result = k;
							if (k === false) {
								a.preventDefault();
								a.stopPropagation()
							}
						}
						if (a.isImmediatePropagationStopped()) break
					}
				}
			}
			return a.result
		},
		props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
		fix: function(a) {
			if (a[c.expando]) return a;
			var b = a;
			a = c.Event(b);
			for (var d = this.props.length, e; d;) {
				e = this.props[--d];
				a[e] = b[e]
			}
			if (!a.target) a.target = a.srcElement || t;
			if (a.target.nodeType === 3) a.target = a.target.parentNode;
			if (!a.relatedTarget && a.fromElement) a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
			if (a.pageX == null && a.clientX != null) {
				b = t.documentElement;
				d = t.body;
				a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0);
				a.pageY = a.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)
			}
			if (a.which == null && (a.charCode != null || a.keyCode != null)) a.which = a.charCode != null ? a.charCode : a.keyCode;
			if (!a.metaKey && a.ctrlKey) a.metaKey = a.ctrlKey;
			if (!a.which && a.button !== B) a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
			return a
		},
		guid: 1E8,
		proxy: c.proxy,
		special: {
			ready: {
				setup: c.bindReady,
				teardown: c.noop
			},
			live: {
				add: function(a) {
					c.event.add(this, Y(a.origType, a.selector), c.extend({}, a, {
						handler: Ka,
						guid: a.handler.guid
					}))
				},
				remove: function(a) {
					c.event.remove(this, Y(a.origType, a.selector), a)
				}
			},
			beforeunload: {
				setup: function(a, b, d) {
					if (c.isWindow(this)) this.onbeforeunload = d
				},
				teardown: function(a, b) {
					if (this.onbeforeunload === b) this.onbeforeunload = null
				}
			}
		}
	};
	c.removeEvent = t.removeEventListener ?
	function(a, b, d) {
		a.removeEventListener && a.removeEventListener(b, d, false)
	} : function(a, b, d) {
		a.detachEvent && a.detachEvent("on" + b, d)
	};
	c.Event = function(a) {
		if (!this.preventDefault) return new c.Event(a);
		if (a && a.type) {
			this.originalEvent = a;
			this.type = a.type
		} else this.type = a;
		this.timeStamp =
		c.now();
		this[c.expando] = true
	};
	c.Event.prototype = {
		preventDefault: function() {
			this.isDefaultPrevented = ca;
			var a = this.originalEvent;
			if (a) if (a.preventDefault) a.preventDefault();
			else a.returnValue = false
		},
		stopPropagation: function() {
			this.isPropagationStopped = ca;
			var a = this.originalEvent;
			if (a) {
				a.stopPropagation && a.stopPropagation();
				a.cancelBubble = true
			}
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = ca;
			this.stopPropagation()
		},
		isDefaultPrevented: U,
		isPropagationStopped: U,
		isImmediatePropagationStopped: U
	};
	var va = function(a) {
		var b = a.relatedTarget;
		try {
			for (; b && b !== this;) b = b.parentNode;
			if (b !== this) {
				a.type = a.data;
				c.event.handle.apply(this, arguments)
			}
		} catch (d) {}
	},
		wa = function(a) {
			a.type = a.data;
			c.event.handle.apply(this, arguments)
		};
	c.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(a, b) {
		c.event.special[a] = {
			setup: function(d) {
				c.event.add(this, b, d && d.selector ? wa : va, a)
			},
			teardown: function(d) {
				c.event.remove(this, b, d && d.selector ? wa : va)
			}
		}
	});
	if (!c.support.submitBubbles) c.event.special.submit = {
		setup: function() {
			if (this.nodeName.toLowerCase() !== "form") {
				c.event.add(this, "click.specialSubmit", function(a) {
					var b = a.target,
						d = b.type;
					if ((d === "submit" || d === "image") && c(b).closest("form").length) {
						a.liveFired = B;
						return la("submit", this, arguments)
					}
				});
				c.event.add(this, "keypress.specialSubmit", function(a) {
					var b = a.target,
						d = b.type;
					if ((d === "text" || d === "password") && c(b).closest("form").length && a.keyCode === 13) {
						a.liveFired = B;
						return la("submit", this, arguments)
					}
				})
			} else
			return false
		},
		teardown: function() {
			c.event.remove(this, ".specialSubmit")
		}
	};
	if (!c.support.changeBubbles) {
		var V, xa = function(a) {
			var b = a.type,
				d = a.value;
			if (b === "radio" || b === "checkbox") d = a.checked;
			else if (b === "select-multiple") d = a.selectedIndex > -1 ? c.map(a.options, function(e) {
				return e.selected
			}).join("-") : "";
			else if (a.nodeName.toLowerCase() === "select") d = a.selectedIndex;
			return d
		},
			Z = function(a, b) {
				var d = a.target,
					e, f;
				if (!(!ia.test(d.nodeName) || d.readOnly)) {
					e = c.data(d, "_change_data");
					f = xa(d);
					if (a.type !== "focusout" || d.type !== "radio") c.data(d, "_change_data", f);
					if (!(e === B || f === e)) if (e != null || f) {
						a.type = "change";
						a.liveFired =
						B;
						return c.event.trigger(a, b, d)
					}
				}
			};
		c.event.special.change = {
			filters: {
				focusout: Z,
				beforedeactivate: Z,
				click: function(a) {
					var b = a.target,
						d = b.type;
					if (d === "radio" || d === "checkbox" || b.nodeName.toLowerCase() === "select") return Z.call(this, a)
				},
				keydown: function(a) {
					var b = a.target,
						d = b.type;
					if (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple") return Z.call(this, a)
				},
				beforeactivate: function(a) {
					a = a.target;
					c.data(a, "_change_data", xa(a))
				}
			},
			setup: function() {
				if (this.type === "file") return false;
				for (var a in V) c.event.add(this, a + ".specialChange", V[a]);
				return ia.test(this.nodeName)
			},
			teardown: function() {
				c.event.remove(this, ".specialChange");
				return ia.test(this.nodeName)
			}
		};
		V = c.event.special.change.filters;
		V.focus = V.beforeactivate
	}
	t.addEventListener && c.each({
		focus: "focusin",
		blur: "focusout"
	}, function(a, b) {
		function d(e) {
			e = c.event.fix(e);
			e.type = b;
			return c.event.trigger(e, null, e.target)
		}
		c.event.special[b] = {
			setup: function() {
				ua[b]++ === 0 && t.addEventListener(a, d, true)
			},
			teardown: function() {
				--ua[b] === 0 && t.removeEventListener(a, d, true)
			}
		}
	});
	c.each(["bind", "one"], function(a, b) {
		c.fn[b] = function(d, e, f) {
			if (typeof d === "object") {
				for (var h in d) this[b](h, e, d[h], f);
				return this
			}
			if (c.isFunction(e) || e === false) {
				f = e;
				e = B
			}
			var l = b === "one" ? c.proxy(f, function(o) {
				c(this).unbind(o, l);
				return f.apply(this, arguments)
			}) : f;
			if (d === "unload" && b !== "one") this.one(d, e, f);
			else {
				h = 0;
				for (var k = this.length; h < k; h++) c.event.add(this[h], d, l, e)
			}
			return this
		}
	});
	c.fn.extend({
		unbind: function(a, b) {
			if (typeof a === "object" && !a.preventDefault) for (var d in a) this.unbind(d, a[d]);
			else {
				d = 0;
				for (var e = this.length; d < e; d++) c.event.remove(this[d], a, b)
			}
			return this
		},
		delegate: function(a, b, d, e) {
			return this.live(b, d, e, a)
		},
		undelegate: function(a, b, d) {
			return arguments.length === 0 ? this.unbind("live") : this.die(b, null, d, a)
		},
		trigger: function(a, b) {
			return this.each(function() {
				c.event.trigger(a, b, this)
			})
		},
		triggerHandler: function(a, b) {
			if (this[0]) {
				var d = c.Event(a);
				d.preventDefault();
				d.stopPropagation();
				c.event.trigger(d, b, this[0]);
				return d.result
			}
		},
		toggle: function(a) {
			for (var b = arguments, d =
			1; d < b.length;) c.proxy(a, b[d++]);
			return this.click(c.proxy(a, function(e) {
				var f = (c.data(this, "lastToggle" + a.guid) || 0) % d;
				c.data(this, "lastToggle" + a.guid, f + 1);
				e.preventDefault();
				return b[f].apply(this, arguments) || false
			}))
		},
		hover: function(a, b) {
			return this.mouseenter(a).mouseleave(b || a)
		}
	});
	var ya = {
		focus: "focusin",
		blur: "focusout",
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	};
	c.each(["live", "die"], function(a, b) {
		c.fn[b] = function(d, e, f, h) {
			var l, k = 0,
				o, x, r = h || this.selector;
			h = h ? this : c(this.context);
			if (typeof d === "object" && !d.preventDefault) {
				for (l in d) h[b](l, e, d[l], r);
				return this
			}
			if (c.isFunction(e)) {
				f = e;
				e = B
			}
			for (d = (d || "").split(" ");
			(l = d[k++]) != null;) {
				o = X.exec(l);
				x = "";
				if (o) {
					x = o[0];
					l = l.replace(X, "")
				}
				if (l === "hover") d.push("mouseenter" + x, "mouseleave" + x);
				else {
					o = l;
					if (l === "focus" || l === "blur") {
						d.push(ya[l] + x);
						l += x
					} else l = (ya[l] || l) + x;
					if (b === "live") {
						x = 0;
						for (var A = h.length; x < A; x++) c.event.add(h[x], "live." + Y(l, r), {
							data: e,
							selector: r,
							handler: f,
							origType: l,
							origHandler: f,
							preType: o
						})
					} else h.unbind("live." + Y(l, r), f)
				}
			}
			return this
		}
	});
	c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(a, b) {
		c.fn[b] = function(d, e) {
			if (e == null) {
				e = d;
				d = null
			}
			return arguments.length > 0 ? this.bind(b, d, e) : this.trigger(b)
		};
		if (c.attrFn) c.attrFn[b] = true
	});
	E.attachEvent && !E.addEventListener && c(E).bind("unload", function() {
		for (var a in c.cache) if (c.cache[a].handle) try {
			c.event.remove(c.cache[a].handle.elem)
		} catch (b) {}
	});
	(function() {
		function a(g, i, n, m, p, q) {
			p = 0;
			for (var u = m.length; p < u; p++) {
				var y = m[p];
				if (y) {
					var F = false;
					for (y = y[g]; y;) {
						if (y.sizcache === n) {
							F = m[y.sizset];
							break
						}
						if (y.nodeType === 1 && !q) {
							y.sizcache = n;
							y.sizset = p
						}
						if (y.nodeName.toLowerCase() === i) {
							F = y;
							break
						}
						y = y[g]
					}
					m[p] = F
				}
			}
		}
		function b(g, i, n, m, p, q) {
			p = 0;
			for (var u = m.length; p < u; p++) {
				var y = m[p];
				if (y) {
					var F = false;
					for (y = y[g]; y;) {
						if (y.sizcache === n) {
							F = m[y.sizset];
							break
						}
						if (y.nodeType === 1) {
							if (!q) {
								y.sizcache = n;
								y.sizset = p
							}
							if (typeof i !== "string") {
								if (y === i) {
									F = true;
									break
								}
							} else if (k.filter(i, [y]).length > 0) {
								F = y;
								break
							}
						}
						y = y[g]
					}
					m[p] = F
				}
			}
		}
		var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
			e = 0,
			f = Object.prototype.toString,
			h = false,
			l = true;
		[0, 0].sort(function() {
			l = false;
			return 0
		});
		var k = function(g, i, n, m) {
			n = n || [];
			var p = i = i || t;
			if (i.nodeType !== 1 && i.nodeType !== 9) return [];
			if (!g || typeof g !== "string") return n;
			var q, u, y, F, M, N = true,
				O = k.isXML(i),
				D = [],
				R = g;
			do {
				d.exec("");
				if (q = d.exec(R)) {
					R = q[3];
					D.push(q[1]);
					if (q[2]) {
						F = q[3];
						break
					}
				}
			} while (q);
			if (D.length > 1 && x.exec(g)) if (D.length === 2 && o.relative[D[0]]) u = L(D[0] + D[1], i);
			else
			for (u = o.relative[D[0]] ? [i] : k(D.shift(), i); D.length;) {
				g = D.shift();
				if (o.relative[g]) g += D.shift();
				u = L(g, u)
			} else {
				if (!m && D.length > 1 && i.nodeType === 9 && !O && o.match.ID.test(D[0]) && !o.match.ID.test(D[D.length - 1])) {
					q = k.find(D.shift(), i, O);
					i = q.expr ? k.filter(q.expr, q.set)[0] : q.set[0]
				}
				if (i) {
					q = m ? {
						expr: D.pop(),
						set: C(m)
					} : k.find(D.pop(), D.length === 1 && (D[0] === "~" || D[0] === "+") && i.parentNode ? i.parentNode : i, O);
					u = q.expr ? k.filter(q.expr, q.set) : q.set;
					if (D.length > 0) y = C(u);
					else N = false;
					for (; D.length;) {
						q = M = D.pop();
						if (o.relative[M]) q = D.pop();
						else M = "";
						if (q == null) q = i;
						o.relative[M](y, q, O)
					}
				} else y = []
			}
			y || (y = u);
			y || k.error(M || g);
			if (f.call(y) === "[object Array]") if (N) if (i && i.nodeType === 1) for (g = 0; y[g] != null; g++) {
				if (y[g] && (y[g] === true || y[g].nodeType === 1 && k.contains(i, y[g]))) n.push(u[g])
			} else
			for (g = 0; y[g] != null; g++) y[g] && y[g].nodeType === 1 && n.push(u[g]);
			else n.push.apply(n, y);
			else C(y, n);
			if (F) {
				k(F, p, n, m);
				k.uniqueSort(n)
			}
			return n
		};
		k.uniqueSort = function(g) {
			if (w) {
				h =
				l;
				g.sort(w);
				if (h) for (var i = 1; i < g.length; i++) g[i] === g[i - 1] && g.splice(i--, 1)
			}
			return g
		};
		k.matches = function(g, i) {
			return k(g, null, null, i)
		};
		k.matchesSelector = function(g, i) {
			return k(i, null, null, [g]).length > 0
		};
		k.find = function(g, i, n) {
			var m;
			if (!g) return [];
			for (var p = 0, q = o.order.length; p < q; p++) {
				var u, y = o.order[p];
				if (u = o.leftMatch[y].exec(g)) {
					var F = u[1];
					u.splice(1, 1);
					if (F.substr(F.length - 1) !== "\\") {
						u[1] = (u[1] || "").replace(/\\/g, "");
						m = o.find[y](u, i, n);
						if (m != null) {
							g = g.replace(o.match[y], "");
							break
						}
					}
				}
			}
			m || (m = i.getElementsByTagName("*"));
			return {
				set: m,
				expr: g
			}
		};
		k.filter = function(g, i, n, m) {
			for (var p, q, u = g, y = [], F = i, M = i && i[0] && k.isXML(i[0]); g && i.length;) {
				for (var N in o.filter) if ((p = o.leftMatch[N].exec(g)) != null && p[2]) {
					var O, D, R = o.filter[N];
					D = p[1];
					q = false;
					p.splice(1, 1);
					if (D.substr(D.length - 1) !== "\\") {
						if (F === y) y = [];
						if (o.preFilter[N]) if (p = o.preFilter[N](p, F, n, y, m, M)) {
							if (p === true) continue
						} else q = O = true;
						if (p) for (var j = 0;
						(D = F[j]) != null; j++) if (D) {
							O = R(D, p, j, F);
							var s = m ^ !! O;
							if (n && O != null) if (s) q = true;
							else F[j] = false;
							else if (s) {
								y.push(D);
								q = true
							}
						}
						if (O !== B) {
							n || (F = y);
							g = g.replace(o.match[N], "");
							if (!q) return [];
							break
						}
					}
				}
				if (g === u) if (q == null) k.error(g);
				else
				break;
				u = g
			}
			return F
		};
		k.error = function(g) {
			throw "Syntax error, unrecognized expression: " + g;
		};
		var o = k.selectors = {
			order: ["ID", "NAME", "TAG"],
			match: {
				ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
				CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
				NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
				ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
				TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
				CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
				POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
				PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
			},
			leftMatch: {},
			attrMap: {
				"class": "className",
				"for": "htmlFor"
			},
			attrHandle: {
				href: function(g) {
					return g.getAttribute("href")
				}
			},
			relative: {
				"+": function(g, i) {
					var n = typeof i === "string",
						m = n && !/\W/.test(i);
					n = n && !m;
					if (m) i = i.toLowerCase();
					m = 0;
					for (var p = g.length, q; m < p; m++) if (q = g[m]) {
						for (;
						(q = q.previousSibling) && q.nodeType !== 1;);
						g[m] = n || q && q.nodeName.toLowerCase() === i ? q || false : q === i
					}
					n && k.filter(i, g, true)
				},
				">": function(g, i) {
					var n, m = typeof i === "string",
						p = 0,
						q = g.length;
					if (m && !/\W/.test(i)) for (i = i.toLowerCase(); p < q; p++) {
						if (n = g[p]) {
							n = n.parentNode;
							g[p] = n.nodeName.toLowerCase() === i ? n : false
						}
					} else {
						for (; p < q; p++) if (n = g[p]) g[p] = m ? n.parentNode : n.parentNode === i;
						m && k.filter(i, g, true)
					}
				},
				"": function(g, i, n) {
					var m, p = e++,
						q = b;
					if (typeof i === "string" && !/\W/.test(i)) {
						m = i = i.toLowerCase();
						q = a
					}
					q("parentNode", i, p, g, m, n)
				},
				"~": function(g, i, n) {
					var m, p = e++,
						q = b;
					if (typeof i === "string" && !/\W/.test(i)) {
						m =
						i = i.toLowerCase();
						q = a
					}
					q("previousSibling", i, p, g, m, n)
				}
			},
			find: {
				ID: function(g, i, n) {
					if (typeof i.getElementById !== "undefined" && !n) return (g = i.getElementById(g[1])) && g.parentNode ? [g] : []
				},
				NAME: function(g, i) {
					if (typeof i.getElementsByName !== "undefined") {
						for (var n = [], m = i.getElementsByName(g[1]), p = 0, q = m.length; p < q; p++) m[p].getAttribute("name") === g[1] && n.push(m[p]);
						return n.length === 0 ? null : n
					}
				},
				TAG: function(g, i) {
					return i.getElementsByTagName(g[1])
				}
			},
			preFilter: {
				CLASS: function(g, i, n, m, p, q) {
					g = " " + g[1].replace(/\\/g, "") + " ";
					if (q) return g;
					q = 0;
					for (var u;
					(u = i[q]) != null; q++) if (u) if (p ^ (u.className && (" " + u.className + " ").replace(/[\t\n]/g, " ").indexOf(g) >= 0)) n || m.push(u);
					else if (n) i[q] = false;
					return false
				},
				ID: function(g) {
					return g[1].replace(/\\/g, "")
				},
				TAG: function(g) {
					return g[1].toLowerCase()
				},
				CHILD: function(g) {
					if (g[1] === "nth") {
						var i = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2] === "even" && "2n" || g[2] === "odd" && "2n+1" || !/\D/.test(g[2]) && "0n+" + g[2] || g[2]);
						g[2] = i[1] + (i[2] || 1) - 0;
						g[3] = i[3] - 0
					}
					g[0] = e++;
					return g
				},
				ATTR: function(g, i, n, m, p, q) {
					i = g[1].replace(/\\/g, "");
					if (!q && o.attrMap[i]) g[1] = o.attrMap[i];
					if (g[2] === "~=") g[4] = " " + g[4] + " ";
					return g
				},
				PSEUDO: function(g, i, n, m, p) {
					if (g[1] === "not") if ((d.exec(g[3]) || "").length > 1 || /^\w/.test(g[3])) g[3] = k(g[3], null, null, i);
					else {
						g = k.filter(g[3], i, n, true ^ p);
						n || m.push.apply(m, g);
						return false
					} else if (o.match.POS.test(g[0]) || o.match.CHILD.test(g[0])) return true;
					return g
				},
				POS: function(g) {
					g.unshift(true);
					return g
				}
			},
			filters: {
				enabled: function(g) {
					return g.disabled === false && g.type !== "hidden"
				},
				disabled: function(g) {
					return g.disabled === true
				},
				checked: function(g) {
					return g.checked === true
				},
				selected: function(g) {
					return g.selected === true
				},
				parent: function(g) {
					return !!g.firstChild
				},
				empty: function(g) {
					return !g.firstChild
				},
				has: function(g, i, n) {
					return !!k(n[3], g).length
				},
				header: function(g) {
					return /h\d/i.test(g.nodeName)
				},
				text: function(g) {
					return "text" === g.type
				},
				radio: function(g) {
					return "radio" === g.type
				},
				checkbox: function(g) {
					return "checkbox" === g.type
				},
				file: function(g) {
					return "file" === g.type
				},
				password: function(g) {
					return "password" === g.type
				},
				submit: function(g) {
					return "submit" === g.type
				},
				image: function(g) {
					return "image" === g.type
				},
				reset: function(g) {
					return "reset" === g.type
				},
				button: function(g) {
					return "button" === g.type || g.nodeName.toLowerCase() === "button"
				},
				input: function(g) {
					return /input|select|textarea|button/i.test(g.nodeName)
				}
			},
			setFilters: {
				first: function(g, i) {
					return i === 0
				},
				last: function(g, i, n, m) {
					return i === m.length - 1
				},
				even: function(g, i) {
					return i % 2 === 0
				},
				odd: function(g, i) {
					return i % 2 === 1
				},
				lt: function(g, i, n) {
					return i < n[3] - 0
				},
				gt: function(g, i, n) {
					return i > n[3] - 0
				},
				nth: function(g, i, n) {
					return n[3] - 0 === i
				},
				eq: function(g, i, n) {
					return n[3] - 0 === i
				}
			},
			filter: {
				PSEUDO: function(g, i, n, m) {
					var p = i[1],
						q = o.filters[p];
					if (q) return q(g, n, i, m);
					else if (p === "contains") return (g.textContent || g.innerText || k.getText([g]) || "").indexOf(i[3]) >= 0;
					else if (p === "not") {
						i = i[3];
						n = 0;
						for (m = i.length; n < m; n++) if (i[n] === g) return false;
						return true
					} else k.error("Syntax error, unrecognized expression: " + p)
				},
				CHILD: function(g, i) {
					var n = i[1],
						m = g;
					switch (n) {
					case "only":
					case "first":
						for (; m = m.previousSibling;) if (m.nodeType === 1) return false;
						if (n === "first") return true;
						m = g;
					case "last":
						for (; m = m.nextSibling;) if (m.nodeType === 1) return false;
						return true;
					case "nth":
						n = i[2];
						var p = i[3];
						if (n === 1 && p === 0) return true;
						var q = i[0],
							u = g.parentNode;
						if (u && (u.sizcache !== q || !g.nodeIndex)) {
							var y = 0;
							for (m = u.firstChild; m; m = m.nextSibling) if (m.nodeType === 1) m.nodeIndex = ++y;
							u.sizcache = q
						}
						m = g.nodeIndex - p;
						return n === 0 ? m === 0 : m % n === 0 && m / n >= 0
					}
				},
				ID: function(g, i) {
					return g.nodeType === 1 && g.getAttribute("id") === i
				},
				TAG: function(g, i) {
					return i === "*" && g.nodeType === 1 || g.nodeName.toLowerCase() === i
				},
				CLASS: function(g, i) {
					return (" " + (g.className || g.getAttribute("class")) + " ").indexOf(i) > -1
				},
				ATTR: function(g, i) {
					var n = i[1];
					n = o.attrHandle[n] ? o.attrHandle[n](g) : g[n] != null ? g[n] : g.getAttribute(n);
					var m = n + "",
						p = i[2],
						q = i[4];
					return n == null ? p === "!=" : p === "=" ? m === q : p === "*=" ? m.indexOf(q) >= 0 : p === "~=" ? (" " + m + " ").indexOf(q) >= 0 : !q ? m && n !== false : p === "!=" ? m !== q : p === "^=" ? m.indexOf(q) === 0 : p === "$=" ? m.substr(m.length - q.length) === q : p === "|=" ? m === q || m.substr(0, q.length + 1) === q + "-" : false
				},
				POS: function(g, i, n, m) {
					var p = o.setFilters[i[2]];
					if (p) return p(g, n, i, m)
				}
			}
		},
			x = o.match.POS,
			r = function(g, i) {
				return "\\" + (i - 0 + 1)
			},
			A;
		for (A in o.match) {
			o.match[A] = RegExp(o.match[A].source + /(?![^\[]*\])(?![^\(]*\))/.source);
			o.leftMatch[A] = RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[A].source.replace(/\\(\d+)/g, r))
		}
		var C = function(g, i) {
			g = Array.prototype.slice.call(g, 0);
			if (i) {
				i.push.apply(i, g);
				return i
			}
			return g
		};
		try {
			Array.prototype.slice.call(t.documentElement.childNodes, 0)
		} catch (J) {
			C = function(g, i) {
				var n = 0,
					m = i || [];
				if (f.call(g) === "[object Array]") Array.prototype.push.apply(m, g);
				else if (typeof g.length === "number") for (var p = g.length; n < p; n++) m.push(g[n]);
				else
				for (; g[n]; n++) m.push(g[n]);
				return m
			}
		}
		var w, I;
		if (t.documentElement.compareDocumentPosition) w = function(g, i) {
			if (g === i) {
				h = true;
				return 0
			}
			if (!g.compareDocumentPosition || !i.compareDocumentPosition) return g.compareDocumentPosition ? -1 : 1;
			return g.compareDocumentPosition(i) & 4 ? -1 : 1
		};
		else {
			w = function(g, i) {
				var n, m, p = [],
					q = [];
				n = g.parentNode;
				m = i.parentNode;
				var u = n;
				if (g === i) {
					h = true;
					return 0
				} else if (n === m) return I(g, i);
				else if (n) {
					if (!m) return 1
				} else
				return -1;
				for (; u;) {
					p.unshift(u);
					u = u.parentNode
				}
				for (u = m; u;) {
					q.unshift(u);
					u = u.parentNode
				}
				n = p.length;
				m = q.length;
				for (u = 0; u < n && u < m; u++) if (p[u] !== q[u]) return I(p[u], q[u]);
				return u === n ? I(g, q[u], -1) : I(p[u], i, 1)
			};
			I = function(g, i, n) {
				if (g === i) return n;
				for (g = g.nextSibling; g;) {
					if (g === i) return -1;
					g = g.nextSibling
				}
				return 1
			}
		}
		k.getText = function(g) {
			for (var i = "", n, m = 0; g[m]; m++) {
				n = g[m];
				if (n.nodeType === 3 || n.nodeType === 4) i += n.nodeValue;
				else if (n.nodeType !== 8) i += k.getText(n.childNodes)
			}
			return i
		};
		(function() {
			var g = t.createElement("div"),
				i = "script" + (new Date).getTime(),
				n = t.documentElement;
			g.innerHTML = "<a name='" + i + "'/>";
			n.insertBefore(g, n.firstChild);
			if (t.getElementById(i)) {
				o.find.ID = function(m, p, q) {
					if (typeof p.getElementById !== "undefined" && !q) return (p = p.getElementById(m[1])) ? p.id === m[1] || typeof p.getAttributeNode !== "undefined" && p.getAttributeNode("id").nodeValue === m[1] ? [p] : B : []
				};
				o.filter.ID = function(m, p) {
					var q = typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id");
					return m.nodeType === 1 && q && q.nodeValue === p
				}
			}
			n.removeChild(g);
			n = g = null
		})();
		(function() {
			var g = t.createElement("div");
			g.appendChild(t.createComment(""));
			if (g.getElementsByTagName("*").length > 0) o.find.TAG = function(i, n) {
				var m = n.getElementsByTagName(i[1]);
				if (i[1] === "*") {
					for (var p = [], q = 0; m[q]; q++) m[q].nodeType === 1 && p.push(m[q]);
					m = p
				}
				return m
			};
			g.innerHTML = "<a href='#'></a>";
			if (g.firstChild && typeof g.firstChild.getAttribute !== "undefined" && g.firstChild.getAttribute("href") !== "#") o.attrHandle.href = function(i) {
				return i.getAttribute("href", 2)
			};
			g = null
		})();
		t.querySelectorAll &&
		function() {
			var g = k,
				i = t.createElement("div");
			i.innerHTML = "<p class='TEST'></p>";
			if (!(i.querySelectorAll && i.querySelectorAll(".TEST").length === 0)) {
				k = function(m, p, q, u) {
					p = p || t;
					m = m.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
					if (!u && !k.isXML(p)) if (p.nodeType === 9) try {
						return C(p.querySelectorAll(m), q)
					} catch (y) {} else if (p.nodeType === 1 && p.nodeName.toLowerCase() !== "object") {
						var F = p.getAttribute("id"),
							M = F || "__sizzle__";
						F || p.setAttribute("id", M);
						try {
							return C(p.querySelectorAll("#" + M + " " + m), q)
						} catch (N) {} finally {
							F || p.removeAttribute("id")
						}
					}
					return g(m, p, q, u)
				};
				for (var n in g) k[n] = g[n];
				i = null
			}
		}();
		(function() {
			var g = t.documentElement,
				i = g.matchesSelector || g.mozMatchesSelector || g.webkitMatchesSelector || g.msMatchesSelector,
				n = false;
			try {
				i.call(t.documentElement, "[test!='']:sizzle")
			} catch (m) {
				n = true
			}
			if (i) k.matchesSelector = function(p, q) {
				q = q.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
				if (!k.isXML(p)) try {
					if (n || !o.match.PSEUDO.test(q) && !/!=/.test(q)) return i.call(p, q)
				} catch (u) {}
				return k(q, null, null, [p]).length > 0
			}
		})();
		(function() {
			var g =
			t.createElement("div");
			g.innerHTML = "<div class='test e'></div><div class='test'></div>";
			if (!(!g.getElementsByClassName || g.getElementsByClassName("e").length === 0)) {
				g.lastChild.className = "e";
				if (g.getElementsByClassName("e").length !== 1) {
					o.order.splice(1, 0, "CLASS");
					o.find.CLASS = function(i, n, m) {
						if (typeof n.getElementsByClassName !== "undefined" && !m) return n.getElementsByClassName(i[1])
					};
					g = null
				}
			}
		})();
		k.contains = t.documentElement.contains ?
		function(g, i) {
			return g !== i && (g.contains ? g.contains(i) : true)
		} : t.documentElement.compareDocumentPosition ?
		function(g, i) {
			return !!(g.compareDocumentPosition(i) & 16)
		} : function() {
			return false
		};
		k.isXML = function(g) {
			return (g = (g ? g.ownerDocument || g : 0).documentElement) ? g.nodeName !== "HTML" : false
		};
		var L = function(g, i) {
			for (var n, m = [], p = "", q = i.nodeType ? [i] : i; n = o.match.PSEUDO.exec(g);) {
				p += n[0];
				g = g.replace(o.match.PSEUDO, "")
			}
			g = o.relative[g] ? g + "*" : g;
			n = 0;
			for (var u = q.length; n < u; n++) k(g, q[n], m);
			return k.filter(p, m)
		};
		c.find = k;
		c.expr = k.selectors;
		c.expr[":"] = c.expr.filters;
		c.unique = k.uniqueSort;
		c.text = k.getText;
		c.isXMLDoc = k.isXML;
		c.contains = k.contains
	})();
	var Za = /Until$/,
		$a = /^(?:parents|prevUntil|prevAll)/,
		ab = /,/,
		Na = /^.[^:#\[\.,]*$/,
		bb = Array.prototype.slice,
		cb = c.expr.match.POS;
	c.fn.extend({
		find: function(a) {
			for (var b = this.pushStack("", "find", a), d = 0, e = 0, f = this.length; e < f; e++) {
				d = b.length;
				c.find(a, this[e], b);
				if (e > 0) for (var h = d; h < b.length; h++) for (var l = 0; l < d; l++) if (b[l] === b[h]) {
					b.splice(h--, 1);
					break
				}
			}
			return b
		},
		has: function(a) {
			var b = c(a);
			return this.filter(function() {
				for (var d = 0, e = b.length; d < e; d++) if (c.contains(this, b[d])) return true
			})
		},
		not: function(a) {
			return this.pushStack(ma(this, a, false), "not", a)
		},
		filter: function(a) {
			return this.pushStack(ma(this, a, true), "filter", a)
		},
		is: function(a) {
			return !!a && c.filter(a, this).length > 0
		},
		closest: function(a, b) {
			var d = [],
				e, f, h = this[0];
			if (c.isArray(a)) {
				var l, k = {},
					o = 1;
				if (h && a.length) {
					e = 0;
					for (f = a.length; e < f; e++) {
						l = a[e];
						k[l] || (k[l] = c.expr.match.POS.test(l) ? c(l, b || this.context) : l)
					}
					for (; h && h.ownerDocument && h !== b;) {
						for (l in k) {
							e = k[l];
							if (e.jquery ? e.index(h) > -1 : c(h).is(e)) d.push({
								selector: l,
								elem: h,
								level: o
							})
						}
						h =
						h.parentNode;
						o++
					}
				}
				return d
			}
			l = cb.test(a) ? c(a, b || this.context) : null;
			e = 0;
			for (f = this.length; e < f; e++) for (h = this[e]; h;) if (l ? l.index(h) > -1 : c.find.matchesSelector(h, a)) {
				d.push(h);
				break
			} else {
				h = h.parentNode;
				if (!h || !h.ownerDocument || h === b) break
			}
			d = d.length > 1 ? c.unique(d) : d;
			return this.pushStack(d, "closest", a)
		},
		index: function(a) {
			if (!a || typeof a === "string") return c.inArray(this[0], a ? c(a) : this.parent().children());
			return c.inArray(a.jquery ? a[0] : a, this)
		},
		add: function(a, b) {
			var d = typeof a === "string" ? c(a, b || this.context) : c.makeArray(a),
				e = c.merge(this.get(), d);
			return this.pushStack(!d[0] || !d[0].parentNode || d[0].parentNode.nodeType === 11 || !e[0] || !e[0].parentNode || e[0].parentNode.nodeType === 11 ? e : c.unique(e))
		},
		andSelf: function() {
			return this.add(this.prevObject)
		}
	});
	c.each({
		parent: function(a) {
			return (a = a.parentNode) && a.nodeType !== 11 ? a : null
		},
		parents: function(a) {
			return c.dir(a, "parentNode")
		},
		parentsUntil: function(a, b, d) {
			return c.dir(a, "parentNode", d)
		},
		next: function(a) {
			return c.nth(a, 2, "nextSibling")
		},
		prev: function(a) {
			return c.nth(a, 2, "previousSibling")
		},
		nextAll: function(a) {
			return c.dir(a, "nextSibling")
		},
		prevAll: function(a) {
			return c.dir(a, "previousSibling")
		},
		nextUntil: function(a, b, d) {
			return c.dir(a, "nextSibling", d)
		},
		prevUntil: function(a, b, d) {
			return c.dir(a, "previousSibling", d)
		},
		siblings: function(a) {
			return c.sibling(a.parentNode.firstChild, a)
		},
		children: function(a) {
			return c.sibling(a.firstChild)
		},
		contents: function(a) {
			return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
		}
	}, function(a, b) {
		c.fn[a] = function(d, e) {
			var f = c.map(this, b, d);
			Za.test(a) || (e = d);
			if (e && typeof e === "string") f = c.filter(e, f);
			f = this.length > 1 ? c.unique(f) : f;
			if ((this.length > 1 || ab.test(e)) && $a.test(a)) f = f.reverse();
			return this.pushStack(f, a, bb.call(arguments).join(","))
		}
	});
	c.extend({
		filter: function(a, b, d) {
			if (d) a = ":not(" + a + ")";
			return b.length === 1 ? c.find.matchesSelector(b[0], a) ? [b[0]] : [] : c.find.matches(a, b)
		},
		dir: function(a, b, d) {
			var e = [];
			for (a = a[b]; a && a.nodeType !== 9 && (d === B || a.nodeType !== 1 || !c(a).is(d));) {
				a.nodeType === 1 && e.push(a);
				a = a[b]
			}
			return e
		},
		nth: function(a, b, d) {
			b = b || 1;
			for (var e = 0; a; a = a[d]) if (a.nodeType === 1 && ++e === b) break;
			return a
		},
		sibling: function(a, b) {
			for (var d = []; a; a = a.nextSibling) a.nodeType === 1 && a !== b && d.push(a);
			return d
		}
	});
	var za = / jQuery\d+="(?:\d+|null)"/g,
		$ = /^\s+/,
		Aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		Ba = /<([\w:]+)/,
		db = /<tbody/i,
		eb = /<|&#?\w+;/,
		Ca = /<(?:script|object|embed|option|style)/i,
		Da = /checked\s*(?:[^=]|=\s*.checked.)/i,
		fb = /\=([^="'>\s]+\/)>/g,
		P = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_default: [0, "", ""]
		};
	P.optgroup = P.option;
	P.tbody = P.tfoot = P.colgroup = P.caption = P.thead;
	P.th = P.td;
	if (!c.support.htmlSerialize) P._default = [1, "div<div>", "</div>"];
	c.fn.extend({
		text: function(a) {
			if (c.isFunction(a)) return this.each(function(b) {
				var d =
				c(this);
				d.text(a.call(this, b, d.text()))
			});
			if (typeof a !== "object" && a !== B) return this.empty().append((this[0] && this[0].ownerDocument || t).createTextNode(a));
			return c.text(this)
		},
		wrapAll: function(a) {
			if (c.isFunction(a)) return this.each(function(d) {
				c(this).wrapAll(a.call(this, d))
			});
			if (this[0]) {
				var b = c(a, this[0].ownerDocument).eq(0).clone(true);
				this[0].parentNode && b.insertBefore(this[0]);
				b.map(function() {
					for (var d = this; d.firstChild && d.firstChild.nodeType === 1;) d = d.firstChild;
					return d
				}).append(this)
			}
			return this
		},
		wrapInner: function(a) {
			if (c.isFunction(a)) return this.each(function(b) {
				c(this).wrapInner(a.call(this, b))
			});
			return this.each(function() {
				var b = c(this),
					d = b.contents();
				d.length ? d.wrapAll(a) : b.append(a)
			})
		},
		wrap: function(a) {
			return this.each(function() {
				c(this).wrapAll(a)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function() {
			return this.domManip(arguments, true, function(a) {
				this.nodeType === 1 && this.appendChild(a)
			})
		},
		prepend: function() {
			return this.domManip(arguments, true, function(a) {
				this.nodeType === 1 && this.insertBefore(a, this.firstChild)
			})
		},
		before: function() {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function(b) {
				this.parentNode.insertBefore(b, this)
			});
			else if (arguments.length) {
				var a = c(arguments[0]);
				a.push.apply(a, this.toArray());
				return this.pushStack(a, "before", arguments)
			}
		},
		after: function() {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function(b) {
				this.parentNode.insertBefore(b, this.nextSibling)
			});
			else if (arguments.length) {
				var a = this.pushStack(this, "after", arguments);
				a.push.apply(a, c(arguments[0]).toArray());
				return a
			}
		},
		remove: function(a, b) {
			for (var d = 0, e;
			(e = this[d]) != null; d++) if (!a || c.filter(a, [e]).length) {
				if (!b && e.nodeType === 1) {
					c.cleanData(e.getElementsByTagName("*"));
					c.cleanData([e])
				}
				e.parentNode && e.parentNode.removeChild(e)
			}
			return this
		},
		empty: function() {
			for (var a = 0, b;
			(b = this[a]) != null; a++) for (b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
			return this
		},
		clone: function(a) {
			var b = this.map(function() {
				if (!c.support.noCloneEvent && !c.isXMLDoc(this)) {
					var d = this.outerHTML,
						e = this.ownerDocument;
					if (!d) {
						d = e.createElement("div");
						d.appendChild(this.cloneNode(true));
						d = d.innerHTML
					}
					return c.clean([d.replace(za, "").replace(fb, '="$1">').replace($, "")], e)[0]
				} else
				return this.cloneNode(true)
			});
			if (a === true) {
				na(this, b);
				na(this.find("*"), b.find("*"))
			}
			return b
		},
		html: function(a) {
			if (a === B) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(za, "") : null;
			else if (typeof a === "string" && !Ca.test(a) && (c.support.leadingWhitespace || !$.test(a)) && !P[(Ba.exec(a) || ["", ""])[1].toLowerCase()]) {
				a = a.replace(Aa, "<$1></$2>");
				try {
					for (var b = 0, d = this.length; b < d; b++) if (this[b].nodeType === 1) {
						c.cleanData(this[b].getElementsByTagName("*"));
						this[b].innerHTML = a
					}
				} catch (e) {
					this.empty().append(a)
				}
			} else c.isFunction(a) ? this.each(function(f) {
				var h = c(this);
				h.html(a.call(this, f, h.html()))
			}) : this.empty().append(a);
			return this
		},
		replaceWith: function(a) {
			if (this[0] && this[0].parentNode) {
				if (c.isFunction(a)) return this.each(function(b) {
					var d =
					c(this),
						e = d.html();
					d.replaceWith(a.call(this, b, e))
				});
				if (typeof a !== "string") a = c(a).detach();
				return this.each(function() {
					var b = this.nextSibling,
						d = this.parentNode;
					c(this).remove();
					b ? c(b).before(a) : c(d).append(a)
				})
			} else
			return this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a)
		},
		detach: function(a) {
			return this.remove(a, true)
		},
		domManip: function(a, b, d) {
			var e, f, h, l = a[0],
				k = [];
			if (!c.support.checkClone && arguments.length === 3 && typeof l === "string" && Da.test(l)) return this.each(function() {
				c(this).domManip(a, b, d, true)
			});
			if (c.isFunction(l)) return this.each(function(x) {
				var r = c(this);
				a[0] = l.call(this, x, b ? r.html() : B);
				r.domManip(a, b, d)
			});
			if (this[0]) {
				e = l && l.parentNode;
				e = c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length ? {
					fragment: e
				} : c.buildFragment(a, this, k);
				h = e.fragment;
				if (f = h.childNodes.length === 1 ? h = h.firstChild : h.firstChild) {
					b = b && c.nodeName(f, "tr");
					f = 0;
					for (var o = this.length; f < o; f++) d.call(b ? c.nodeName(this[f], "table") ? this[f].getElementsByTagName("tbody")[0] || this[f].appendChild(this[f].ownerDocument.createElement("tbody")) : this[f] : this[f], f > 0 || e.cacheable || this.length > 1 ? h.cloneNode(true) : h)
				}
				k.length && c.each(k, Oa)
			}
			return this
		}
	});
	c.buildFragment = function(a, b, d) {
		var e, f, h;
		b = b && b[0] ? b[0].ownerDocument || b[0] : t;
		if (a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && b === t && !Ca.test(a[0]) && (c.support.checkClone || !Da.test(a[0]))) {
			f = true;
			if (h = c.fragments[a[0]]) if (h !== 1) e = h
		}
		if (!e) {
			e = b.createDocumentFragment();
			c.clean(a, b, e, d)
		}
		if (f) c.fragments[a[0]] = h ? e : 1;
		return {
			fragment: e,
			cacheable: f
		}
	};
	c.fragments = {};
	c.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(a, b) {
		c.fn[a] = function(d) {
			var e = [];
			d = c(d);
			var f = this.length === 1 && this[0].parentNode;
			if (f && f.nodeType === 11 && f.childNodes.length === 1 && d.length === 1) {
				d[b](this[0]);
				return this
			} else {
				f = 0;
				for (var h = d.length; f < h; f++) {
					var l = (f > 0 ? this.clone(true) : this).get();
					c(d[f])[b](l);
					e = e.concat(l)
				}
				return this.pushStack(e, a, d.selector)
			}
		}
	});
	c.extend({
		clean: function(a, b, d, e) {
			b = b || t;
			if (typeof b.createElement === "undefined") b = b.ownerDocument || b[0] && b[0].ownerDocument || t;
			for (var f = [], h = 0, l;
			(l = a[h]) != null; h++) {
				if (typeof l === "number") l += "";
				if (l) {
					if (typeof l === "string" && !eb.test(l)) l = b.createTextNode(l);
					else if (typeof l === "string") {
						l = l.replace(Aa, "<$1></$2>");
						var k = (Ba.exec(l) || ["", ""])[1].toLowerCase(),
							o = P[k] || P._default,
							x = o[0],
							r = b.createElement("div");
						for (r.innerHTML = o[1] + l + o[2]; x--;) r = r.lastChild;
						if (!c.support.tbody) {
							x = db.test(l);
							k = k === "table" && !x ? r.firstChild && r.firstChild.childNodes : o[1] === "<table>" && !x ? r.childNodes : [];
							for (o = k.length - 1; o >= 0; --o) c.nodeName(k[o], "tbody") && !k[o].childNodes.length && k[o].parentNode.removeChild(k[o])
						}!c.support.leadingWhitespace && $.test(l) && r.insertBefore(b.createTextNode($.exec(l)[0]), r.firstChild);
						l = r.childNodes
					}
					if (l.nodeType) f.push(l);
					else f = c.merge(f, l)
				}
			}
			if (d) for (h = 0; f[h]; h++) if (e && c.nodeName(f[h], "script") && (!f[h].type || f[h].type.toLowerCase() === "text/javascript")) e.push(f[h].parentNode ? f[h].parentNode.removeChild(f[h]) : f[h]);
			else {
				f[h].nodeType === 1 && f.splice.apply(f, [h + 1, 0].concat(c.makeArray(f[h].getElementsByTagName("script"))));
				d.appendChild(f[h])
			}
			return f
		},
		cleanData: function(a) {
			for (var b, d, e = c.cache, f = c.event.special, h = c.support.deleteExpando, l = 0, k;
			(k = a[l]) != null; l++) if (!(k.nodeName && c.noData[k.nodeName.toLowerCase()])) if (d = k[c.expando]) {
				if ((b = e[d]) && b.events) for (var o in b.events) f[o] ? c.event.remove(k, o) : c.removeEvent(k, o, b.handle);
				if (h) delete k[c.expando];
				else k.removeAttribute && k.removeAttribute(c.expando);
				delete e[d]
			}
		}
	});
	var Ea = /alpha\([^)]*\)/i,
		gb = /opacity=([^)]*)/,
		hb = /-([a-z])/ig,
		ib = /([A-Z])/g,
		Fa = /^-?\d+(?:px)?$/i,
		jb = /^-?\d/,
		kb = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		Pa = ["Left", "Right"],
		Qa = ["Top", "Bottom"],
		W, Ga, aa, lb = function(a, b) {
			return b.toUpperCase()
		};
	c.fn.css = function(a, b) {
		if (arguments.length === 2 && b === B) return this;
		return c.access(this, a, b, true, function(d, e, f) {
			return f !== B ? c.style(d, e, f) : c.css(d, e)
		})
	};
	c.extend({
		cssHooks: {
			opacity: {
				get: function(a, b) {
					if (b) {
						var d = W(a, "opacity", "opacity");
						return d === "" ? "1" : d
					} else
					return a.style.opacity
				}
			}
		},
		cssNumber: {
			zIndex: true,
			fontWeight: true,
			opacity: true,
			zoom: true,
			lineHeight: true
		},
		cssProps: {
			"float": c.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(a, b, d, e) {
			if (!(!a || a.nodeType === 3 || a.nodeType === 8 || !a.style)) {
				var f, h = c.camelCase(b),
					l = a.style,
					k = c.cssHooks[h];
				b = c.cssProps[h] || h;
				if (d !== B) {
					if (!(typeof d === "number" && isNaN(d) || d == null)) {
						if (typeof d === "number" && !c.cssNumber[h]) d += "px";
						if (!k || !("set" in k) || (d = k.set(a, d)) !== B) try {
							l[b] = d
						} catch (o) {}
					}
				} else {
					if (k && "get" in k && (f = k.get(a, false, e)) !== B) return f;
					return l[b]
				}
			}
		},
		css: function(a, b, d) {
			var e, f = c.camelCase(b),
				h = c.cssHooks[f];
			b = c.cssProps[f] || f;
			if (h && "get" in h && (e = h.get(a, true, d)) !== B) return e;
			else if (W) return W(a, b, f)
		},
		swap: function(a, b, d) {
			var e = {},
				f;
			for (f in b) {
				e[f] = a.style[f];
				a.style[f] = b[f]
			}
			d.call(a);
			for (f in b) a.style[f] = e[f]
		},
		camelCase: function(a) {
			return a.replace(hb, lb)
		}
	});
	c.curCSS = c.css;
	c.each(["height", "width"], function(a, b) {
		c.cssHooks[b] = {
			get: function(d, e, f) {
				var h;
				if (e) {
					if (d.offsetWidth !== 0) h = oa(d, b, f);
					else c.swap(d, kb, function() {
						h = oa(d, b, f)
					});
					if (h <= 0) {
						h = W(d, b, b);
						if (h === "0px" && aa) h = aa(d, b, b);
						if (h != null) return h === "" || h === "auto" ? "0px" : h
					}
					if (h < 0 || h == null) {
						h = d.style[b];
						return h === "" || h === "auto" ? "0px" : h
					}
					return typeof h === "string" ? h : h + "px"
				}
			},
			set: function(d, e) {
				if (Fa.test(e)) {
					e = parseFloat(e);
					if (e >= 0) return e + "px"
				} else
				return e
			}
		}
	});
	if (!c.support.opacity) c.cssHooks.opacity = {
		get: function(a, b) {
			return gb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
		},
		set: function(a, b) {
			var d = a.style;
			d.zoom = 1;
			var e = c.isNaN(b) ? "" : "alpha(opacity=" + b * 100 + ")",
				f =
				d.filter || "";
			d.filter = Ea.test(f) ? f.replace(Ea, e) : d.filter + " " + e
		}
	};
	if (t.defaultView && t.defaultView.getComputedStyle) Ga = function(a, b, d) {
		var e;
		d = d.replace(ib, "-$1").toLowerCase();
		if (!(b = a.ownerDocument.defaultView)) return B;
		if (b = b.getComputedStyle(a, null)) {
			e = b.getPropertyValue(d);
			if (e === "" && !c.contains(a.ownerDocument.documentElement, a)) e = c.style(a, d)
		}
		return e
	};
	if (t.documentElement.currentStyle) aa = function(a, b) {
		var d, e, f = a.currentStyle && a.currentStyle[b],
			h = a.style;
		if (!Fa.test(f) && jb.test(f)) {
			d = h.left;
			e = a.runtimeStyle.left;
			a.runtimeStyle.left = a.currentStyle.left;
			h.left = b === "fontSize" ? "1em" : f || 0;
			f = h.pixelLeft + "px";
			h.left = d;
			a.runtimeStyle.left = e
		}
		return f === "" ? "auto" : f
	};
	W = Ga || aa;
	if (c.expr && c.expr.filters) {
		c.expr.filters.hidden = function(a) {
			var b = a.offsetHeight;
			return a.offsetWidth === 0 && b === 0 || !c.support.reliableHiddenOffsets && (a.style.display || c.css(a, "display")) === "none"
		};
		c.expr.filters.visible = function(a) {
			return !c.expr.filters.hidden(a)
		}
	}
	var mb = c.now(),
		nb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		ob = /^(?:select|textarea)/i,
		pb = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		qb = /^(?:GET|HEAD)$/,
		Ra = /\[\]$/,
		T = /\=\?(&|$)/,
		ja = /\?/,
		rb = /([?&])_=[^&]*/,
		sb = /^(\w+:)?\/\/([^\/?#]+)/,
		tb = /%20/g,
		ub = /#.*$/,
		Ha = c.fn.load;
	c.fn.extend({
		load: function(a, b, d) {
			if (typeof a !== "string" && Ha) return Ha.apply(this, arguments);
			else if (!this.length) return this;
			var e = a.indexOf(" ");
			if (e >= 0) {
				var f = a.slice(e, a.length);
				a = a.slice(0, e)
			}
			e = "GET";
			if (b) if (c.isFunction(b)) {
				d = b;
				b = null
			} else if (typeof b === "object") {
				b = c.param(b, c.ajaxSettings.traditional);
				e = "POST"
			}
			var h = this;
			c.ajax({
				url: a,
				type: e,
				dataType: "html",
				data: b,
				complete: function(l, k) {
					if (k === "success" || k === "notmodified") h.html(f ? c("<div>").append(l.responseText.replace(nb, "")).find(f) : l.responseText);
					d && h.each(d, [l.responseText, k, l])
				}
			});
			return this
		},
		serialize: function() {
			return c.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				return this.elements ? c.makeArray(this.elements) : this
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || ob.test(this.nodeName) || pb.test(this.type))
			}).map(function(a, b) {
				var d = c(this).val();
				return d == null ? null : c.isArray(d) ? c.map(d, function(e) {
					return {
						name: b.name,
						value: e
					}
				}) : {
					name: b.name,
					value: d
				}
			}).get()
		}
	});
	c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
		c.fn[b] = function(d) {
			return this.bind(b, d)
		}
	});
	c.extend({
		get: function(a, b, d, e) {
			if (c.isFunction(b)) {
				e = e || d;
				d = b;
				b = null
			}
			return c.ajax({
				type: "GET",
				url: a,
				data: b,
				success: d,
				dataType: e
			})
		},
		getScript: function(a, b) {
			return c.get(a, null, b, "script")
		},
		getJSON: function(a, b, d) {
			return c.get(a, b, d, "json")
		},
		post: function(a, b, d, e) {
			if (c.isFunction(b)) {
				e = e || d;
				d = b;
				b = {}
			}
			return c.ajax({
				type: "POST",
				url: a,
				data: b,
				success: d,
				dataType: e
			})
		},
		ajaxSetup: function(a) {
			c.extend(c.ajaxSettings, a)
		},
		ajaxSettings: {
			url: location.href,
			global: true,
			type: "GET",
			contentType: "application/x-www-form-urlencoded",
			processData: true,
			async: true,
			xhr: function() {
				return new E.XMLHttpRequest
			},
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				script: "text/javascript, application/javascript",
				json: "application/json, text/javascript",
				text: "text/plain",
				_default: "*/*"
			}
		},
		ajax: function(a) {
			var b = c.extend(true, {}, c.ajaxSettings, a),
				d, e, f, h = b.type.toUpperCase(),
				l = qb.test(h);
			b.url = b.url.replace(ub, "");
			b.context = a && a.context != null ? a.context : b;
			if (b.data && b.processData && typeof b.data !== "string") b.data = c.param(b.data, b.traditional);
			if (b.dataType === "jsonp") {
				if (h === "GET") T.test(b.url) || (b.url += (ja.test(b.url) ? "&" : "?") + (b.jsonp || "callback") + "=?");
				else if (!b.data || !T.test(b.data)) b.data = (b.data ? b.data + "&" : "") + (b.jsonp || "callback") + "=?";
				b.dataType = "json"
			}
			if (b.dataType === "json" && (b.data && T.test(b.data) || T.test(b.url))) {
				d = b.jsonpCallback || "jsonp" + mb++;
				if (b.data) b.data = (b.data + "").replace(T, "=" + d + "$1");
				b.url = b.url.replace(T, "=" + d + "$1");
				b.dataType = "script";
				var k = E[d];
				E[d] = function(m) {
					if (c.isFunction(k)) k(m);
					else {
						E[d] = B;
						try {
							delete E[d]
						} catch (p) {}
					}
					f = m;
					c.handleSuccess(b, w, e, f);
					c.handleComplete(b, w, e, f);
					r && r.removeChild(A)
				}
			}
			if (b.dataType === "script" && b.cache === null) b.cache =
			false;
			if (b.cache === false && l) {
				var o = c.now(),
					x = b.url.replace(rb, "$1_=" + o);
				b.url = x + (x === b.url ? (ja.test(b.url) ? "&" : "?") + "_=" + o : "")
			}
			if (b.data && l) b.url += (ja.test(b.url) ? "&" : "?") + b.data;
			b.global && c.active++ === 0 && c.event.trigger("ajaxStart");
			o = (o = sb.exec(b.url)) && (o[1] && o[1].toLowerCase() !== location.protocol || o[2].toLowerCase() !== location.host);
			if (b.dataType === "script" && h === "GET" && o) {
				var r = t.getElementsByTagName("head")[0] || t.documentElement,
					A = t.createElement("script");
				if (b.scriptCharset) A.charset = b.scriptCharset;
				A.src = b.url;
				if (!d) {
					var C = false;
					A.onload = A.onreadystatechange = function() {
						if (!C && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
							C = true;
							c.handleSuccess(b, w, e, f);
							c.handleComplete(b, w, e, f);
							A.onload = A.onreadystatechange = null;
							r && A.parentNode && r.removeChild(A)
						}
					}
				}
				r.insertBefore(A, r.firstChild);
				return B
			}
			var J = false,
				w = b.xhr();
			if (w) {
				b.username ? w.open(h, b.url, b.async, b.username, b.password) : w.open(h, b.url, b.async);
				try {
					if (b.data != null && !l || a && a.contentType) w.setRequestHeader("Content-Type", b.contentType);
					if (b.ifModified) {
						c.lastModified[b.url] && w.setRequestHeader("If-Modified-Since", c.lastModified[b.url]);
						c.etag[b.url] && w.setRequestHeader("If-None-Match", c.etag[b.url])
					}
					o || w.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					w.setRequestHeader("Accept", b.dataType && b.accepts[b.dataType] ? b.accepts[b.dataType] + ", */*; q=0.01" : b.accepts._default)
				} catch (I) {}
				if (b.beforeSend && b.beforeSend.call(b.context, w, b) === false) {
					b.global && c.active-- === 1 && c.event.trigger("ajaxStop");
					w.abort();
					return false
				}
				b.global && c.triggerGlobal(b, "ajaxSend", [w, b]);
				var L = w.onreadystatechange = function(m) {
					if (!w || w.readyState === 0 || m === "abort") {
						J || c.handleComplete(b, w, e, f);
						J = true;
						if (w) w.onreadystatechange = c.noop
					} else if (!J && w && (w.readyState === 4 || m === "timeout")) {
						J = true;
						w.onreadystatechange = c.noop;
						e = m === "timeout" ? "timeout" : !c.httpSuccess(w) ? "error" : b.ifModified && c.httpNotModified(w, b.url) ? "notmodified" : "success";
						var p;
						if (e === "success") try {
							f = c.httpData(w, b.dataType, b)
						} catch (q) {
							e = "parsererror";
							p = q
						}
						if (e === "success" || e === "notmodified") d || c.handleSuccess(b, w, e, f);
						else c.handleError(b, w, e, p);
						d || c.handleComplete(b, w, e, f);
						m === "timeout" && w.abort();
						if (b.async) w = null
					}
				};
				try {
					var g = w.abort;
					w.abort = function() {
						w && Function.prototype.call.call(g, w);
						L("abort")
					}
				} catch (i) {}
				b.async && b.timeout > 0 && setTimeout(function() {
					w && !J && L("timeout")
				}, b.timeout);
				try {
					w.send(l || b.data == null ? null : b.data)
				} catch (n) {
					c.handleError(b, w, null, n);
					c.handleComplete(b, w, e, f)
				}
				b.async || L();
				return w
			}
		},
		param: function(a, b) {
			var d = [],
				e = function(h, l) {
					l = c.isFunction(l) ? l() : l;
					d[d.length] =
					encodeURIComponent(h) + "=" + encodeURIComponent(l)
				};
			if (b === B) b = c.ajaxSettings.traditional;
			if (c.isArray(a) || a.jquery) c.each(a, function() {
				e(this.name, this.value)
			});
			else
			for (var f in a) da(f, a[f], b, e);
			return d.join("&").replace(tb, "+")
		}
	});
	c.extend({
		active: 0,
		lastModified: {},
		etag: {},
		handleError: function(a, b, d, e) {
			a.error && a.error.call(a.context, b, d, e);
			a.global && c.triggerGlobal(a, "ajaxError", [b, a, e])
		},
		handleSuccess: function(a, b, d, e) {
			a.success && a.success.call(a.context, e, d, b);
			a.global && c.triggerGlobal(a, "ajaxSuccess", [b, a])
		},
		handleComplete: function(a, b, d) {
			a.complete && a.complete.call(a.context, b, d);
			a.global && c.triggerGlobal(a, "ajaxComplete", [b, a]);
			a.global && c.active-- === 1 && c.event.trigger("ajaxStop")
		},
		triggerGlobal: function(a, b, d) {
			(a.context && a.context.url == null ? c(a.context) : c.event).trigger(b, d)
		},
		httpSuccess: function(a) {
			try {
				return !a.status && location.protocol === "file:" || a.status >= 200 && a.status < 300 || a.status === 304 || a.status === 1223
			} catch (b) {}
			return false
		},
		httpNotModified: function(a, b) {
			var d = a.getResponseHeader("Last-Modified"),
				e = a.getResponseHeader("Etag");
			if (d) c.lastModified[b] = d;
			if (e) c.etag[b] = e;
			return a.status === 304
		},
		httpData: function(a, b, d) {
			var e = a.getResponseHeader("content-type") || "",
				f = b === "xml" || !b && e.indexOf("xml") >= 0;
			a = f ? a.responseXML : a.responseText;
			f && a.documentElement.nodeName === "parsererror" && c.error("parsererror");
			if (d && d.dataFilter) a = d.dataFilter(a, b);
			if (typeof a === "string") if (b === "json" || !b && e.indexOf("json") >= 0) a = c.parseJSON(a);
			else if (b === "script" || !b && e.indexOf("javascript") >= 0) c.globalEval(a);
			return a
		}
	});
	if (E.ActiveXObject) c.ajaxSettings.xhr = function() {
		if (E.location.protocol !== "file:") try {
			return new E.XMLHttpRequest
		} catch (a) {}
		try {
			return new E.ActiveXObject("Microsoft.XMLHTTP")
		} catch (b) {}
	};
	c.support.ajax = !! c.ajaxSettings.xhr();
	var ea = {},
		vb = /^(?:toggle|show|hide)$/,
		wb = /^([+\-]=)?([\d+.\-]+)(.*)$/,
		ba, pa = [
			["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
			["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
			["opacity"]
		];
	c.fn.extend({
		show: function(a, b, d) {
			if (a || a === 0) return this.animate(S("show", 3), a, b, d);
			else {
				d = 0;
				for (var e = this.length; d < e; d++) {
					a = this[d];
					b = a.style.display;
					if (!c.data(a, "olddisplay") && b === "none") b = a.style.display = "";
					b === "" && c.css(a, "display") === "none" && c.data(a, "olddisplay", qa(a.nodeName))
				}
				for (d = 0; d < e; d++) {
					a = this[d];
					b = a.style.display;
					if (b === "" || b === "none") a.style.display = c.data(a, "olddisplay") || ""
				}
				return this
			}
		},
		hide: function(a, b, d) {
			if (a || a === 0) return this.animate(S("hide", 3), a, b, d);
			else {
				a = 0;
				for (b = this.length; a < b; a++) {
					d = c.css(this[a], "display");
					d !== "none" && c.data(this[a], "olddisplay", d)
				}
				for (a = 0; a < b; a++) this[a].style.display = "none";
				return this
			}
		},
		_toggle: c.fn.toggle,
		toggle: function(a, b, d) {
			var e = typeof a === "boolean";
			if (c.isFunction(a) && c.isFunction(b)) this._toggle.apply(this, arguments);
			else a == null || e ? this.each(function() {
				var f = e ? a : c(this).is(":hidden");
				c(this)[f ? "show" : "hide"]()
			}) : this.animate(S("toggle", 3), a, b, d);
			return this
		},
		fadeTo: function(a, b, d, e) {
			return this.filter(":hidden").css("opacity", 0).show().end().animate({
				opacity: b
			}, a, d, e)
		},
		animate: function(a, b, d, e) {
			var f = c.speed(b, d, e);
			if (c.isEmptyObject(a)) return this.each(f.complete);
			return this[f.queue === false ? "each" : "queue"](function() {
				var h = c.extend({}, f),
					l, k = this.nodeType === 1,
					o = k && c(this).is(":hidden"),
					x = this;
				for (l in a) {
					var r = c.camelCase(l);
					if (l !== r) {
						a[r] = a[l];
						delete a[l];
						l = r
					}
					if (a[l] === "hide" && o || a[l] === "show" && !o) return h.complete.call(this);
					if (k && (l === "height" || l === "width")) {
						h.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
						if (c.css(this, "display") === "inline" && c.css(this, "float") === "none") if (c.support.inlineBlockNeedsLayout) if (qa(this.nodeName) === "inline") this.style.display = "inline-block";
						else {
							this.style.display = "inline";
							this.style.zoom = 1
						} else this.style.display = "inline-block"
					}
					if (c.isArray(a[l])) {
						(h.specialEasing = h.specialEasing || {})[l] = a[l][1];
						a[l] = a[l][0]
					}
				}
				if (h.overflow != null) this.style.overflow = "hidden";
				h.curAnim = c.extend({}, a);
				c.each(a, function(A, C) {
					var J = new c.fx(x, h, A);
					if (vb.test(C)) J[C === "toggle" ? o ? "show" : "hide" : C](a);
					else {
						var w = wb.exec(C),
							I = J.cur() || 0;
						if (w) {
							var L = parseFloat(w[2]),
								g = w[3] || "px";
							if (g !== "px") {
								c.style(x, A, (L || 1) + g);
								I = (L || 1) / J.cur() * I;
								c.style(x, A, I + g)
							}
							if (w[1]) L = (w[1] === "-=" ? -1 : 1) * L + I;
							J.custom(I, L, g)
						} else J.custom(I, C, "")
					}
				});
				return true
			})
		},
		stop: function(a, b) {
			var d = c.timers;
			a && this.queue([]);
			this.each(function() {
				for (var e = d.length - 1; e >= 0; e--) if (d[e].elem === this) {
					b && d[e](true);
					d.splice(e, 1)
				}
			});
			b || this.dequeue();
			return this
		}
	});
	c.each({
		slideDown: S("show", 1),
		slideUp: S("hide", 1),
		slideToggle: S("toggle", 1),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(a, b) {
		c.fn[a] = function(d, e, f) {
			return this.animate(b, d, e, f)
		}
	});
	c.extend({
		speed: function(a, b, d) {
			var e = a && typeof a === "object" ? c.extend({}, a) : {
				complete: d || !d && b || c.isFunction(a) && a,
				duration: a,
				easing: d && b || b && !c.isFunction(b) && b
			};
			e.duration = c.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in c.fx.speeds ? c.fx.speeds[e.duration] : c.fx.speeds._default;
			e.old = e.complete;
			e.complete = function() {
				e.queue !== false && c(this).dequeue();
				c.isFunction(e.old) && e.old.call(this)
			};
			return e
		},
		easing: {
			linear: function(a, b, d, e) {
				return d + e * a
			},
			swing: function(a, b, d, e) {
				return (-Math.cos(a * Math.PI) / 2 + 0.5) * e + d
			}
		},
		timers: [],
		fx: function(a, b, d) {
			this.options = b;
			this.elem = a;
			this.prop = d;
			if (!b.orig) b.orig = {}
		}
	});
	c.fx.prototype = {
		update: function() {
			this.options.step && this.options.step.call(this.elem, this.now, this);
			(c.fx.step[this.prop] || c.fx.step._default)(this)
		},
		cur: function() {
			if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
			var a = parseFloat(c.css(this.elem, this.prop));
			return a && a > -1E4 ? a : 0
		},
		custom: function(a, b, d) {
			function e(l) {
				return f.step(l)
			}
			var f = this,
				h = c.fx;
			this.startTime = c.now();
			this.start = a;
			this.end = b;
			this.unit = d || this.unit || "px";
			this.now = this.start;
			this.pos = this.state = 0;
			e.elem = this.elem;
			if (e() && c.timers.push(e) && !ba) ba = setInterval(h.tick, h.interval)
		},
		show: function() {
			this.options.orig[this.prop] = c.style(this.elem, this.prop);
			this.options.show = true;
			this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
			c(this.elem).show()
		},
		hide: function() {
			this.options.orig[this.prop] = c.style(this.elem, this.prop);
			this.options.hide = true;
			this.custom(this.cur(), 0)
		},
		step: function(a) {
			var b = c.now(),
				d = true;
			if (a || b >= this.options.duration + this.startTime) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();
				this.options.curAnim[this.prop] = true;
				for (var e in this.options.curAnim) if (this.options.curAnim[e] !== true) d = false;
				if (d) {
					if (this.options.overflow != null && !c.support.shrinkWrapBlocks) {
						var f = this.elem,
							h = this.options;
						c.each(["", "X", "Y"], function(k, o) {
							f.style["overflow" + o] = h.overflow[k]
						})
					}
					this.options.hide && c(this.elem).hide();
					if (this.options.hide || this.options.show) for (var l in this.options.curAnim) c.style(this.elem, l, this.options.orig[l]);
					this.options.complete.call(this.elem)
				}
				return false
			} else {
				a = b - this.startTime;
				this.state = a / this.options.duration;
				b = this.options.easing || (c.easing.swing ? "swing" : "linear");
				this.pos = c.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || b](this.state, a, 0, 1, this.options.duration);
				this.now = this.start + (this.end - this.start) * this.pos;
				this.update()
			}
			return true
		}
	};
	c.extend(c.fx, {
		tick: function() {
			for (var a =
			c.timers, b = 0; b < a.length; b++) a[b]() || a.splice(b--, 1);
			a.length || c.fx.stop()
		},
		interval: 13,
		stop: function() {
			clearInterval(ba);
			ba = null
		},
		speeds: {
			slow: 600,
			fast: 200,
			_default: 400
		},
		step: {
			opacity: function(a) {
				c.style(a.elem, "opacity", a.now)
			},
			_default: function(a) {
				if (a.elem.style && a.elem.style[a.prop] != null) a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit;
				else a.elem[a.prop] = a.now
			}
		}
	});
	if (c.expr && c.expr.filters) c.expr.filters.animated = function(a) {
		return c.grep(c.timers, function(b) {
			return a === b.elem
		}).length
	};
	var xb = /^t(?:able|d|h)$/i,
		Ia = /^(?:body|html)$/i;
	c.fn.offset = "getBoundingClientRect" in t.documentElement ?
	function(a) {
		var b = this[0],
			d;
		if (a) return this.each(function(l) {
			c.offset.setOffset(this, a, l)
		});
		if (!b || !b.ownerDocument) return null;
		if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
		try {
			d = b.getBoundingClientRect()
		} catch (e) {}
		var f = b.ownerDocument,
			h = f.documentElement;
		if (!d || !c.contains(h, b)) return d || {
			top: 0,
			left: 0
		};
		b = f.body;
		f = fa(f);
		return {
			top: d.top + (f.pageYOffset || c.support.boxModel && h.scrollTop || b.scrollTop) - (h.clientTop || b.clientTop || 0),
			left: d.left + (f.pageXOffset || c.support.boxModel && h.scrollLeft || b.scrollLeft) - (h.clientLeft || b.clientLeft || 0)
		}
	} : function(a) {
		var b = this[0];
		if (a) return this.each(function(x) {
			c.offset.setOffset(this, a, x)
		});
		if (!b || !b.ownerDocument) return null;
		if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
		c.offset.initialize();
		var d, e = b.offsetParent,
			f = b.ownerDocument,
			h = f.documentElement,
			l = f.body;
		d = (f = f.defaultView) ? f.getComputedStyle(b, null) : b.currentStyle;
		for (var k = b.offsetTop, o = b.offsetLeft;
		(b = b.parentNode) && b !== l && b !== h;) {
			if (c.offset.supportsFixedPosition && d.position === "fixed") break;
			d = f ? f.getComputedStyle(b, null) : b.currentStyle;
			k -= b.scrollTop;
			o -= b.scrollLeft;
			if (b === e) {
				k += b.offsetTop;
				o += b.offsetLeft;
				if (c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && xb.test(b.nodeName))) {
					k += parseFloat(d.borderTopWidth) || 0;
					o += parseFloat(d.borderLeftWidth) || 0
				}
				e = b.offsetParent
			}
			if (c.offset.subtractsBorderForOverflowNotVisible && d.overflow !== "visible") {
				k += parseFloat(d.borderTopWidth) || 0;
				o += parseFloat(d.borderLeftWidth) || 0
			}
			d = d
		}
		if (d.position === "relative" || d.position === "static") {
			k += l.offsetTop;
			o += l.offsetLeft
		}
		if (c.offset.supportsFixedPosition && d.position === "fixed") {
			k += Math.max(h.scrollTop, l.scrollTop);
			o += Math.max(h.scrollLeft, l.scrollLeft)
		}
		return {
			top: k,
			left: o
		}
	};
	c.offset = {
		initialize: function() {
			var a = t.body,
				b = t.createElement("div"),
				d, e, f, h = parseFloat(c.css(a, "marginTop")) || 0;
			c.extend(b.style, {
				position: "absolute",
				top: 0,
				left: 0,
				margin: 0,
				border: 0,
				width: "1px",
				height: "1px",
				visibility: "hidden"
			});
			b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
			a.insertBefore(b, a.firstChild);
			d = b.firstChild;
			e = d.firstChild;
			f = d.nextSibling.firstChild.firstChild;
			this.doesNotAddBorder = e.offsetTop !== 5;
			this.doesAddBorderForTableAndCells =
			f.offsetTop === 5;
			e.style.position = "fixed";
			e.style.top = "20px";
			this.supportsFixedPosition = e.offsetTop === 20 || e.offsetTop === 15;
			e.style.position = e.style.top = "";
			d.style.overflow = "hidden";
			d.style.position = "relative";
			this.subtractsBorderForOverflowNotVisible = e.offsetTop === -5;
			this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== h;
			a.removeChild(b);
			c.offset.initialize = c.noop
		},
		bodyOffset: function(a) {
			var b = a.offsetTop,
				d = a.offsetLeft;
			c.offset.initialize();
			if (c.offset.doesNotIncludeMarginInBodyOffset) {
				b += parseFloat(c.css(a, "marginTop")) || 0;
				d += parseFloat(c.css(a, "marginLeft")) || 0
			}
			return {
				top: b,
				left: d
			}
		},
		setOffset: function(a, b, d) {
			var e = c.css(a, "position");
			if (e === "static") a.style.position = "relative";
			var f = c(a),
				h = f.offset(),
				l = c.css(a, "top"),
				k = c.css(a, "left"),
				o = e === "absolute" && c.inArray("auto", [l, k]) > -1;
			e = {};
			var x = {};
			if (o) x = f.position();
			l = o ? x.top : parseInt(l, 10) || 0;
			k = o ? x.left : parseInt(k, 10) || 0;
			if (c.isFunction(b)) b = b.call(a, d, h);
			if (b.top != null) e.top = b.top - h.top + l;
			if (b.left != null) e.left = b.left - h.left + k;
			"using" in b ? b.using.call(a, e) : f.css(e)
		}
	};
	c.fn.extend({
		position: function() {
			if (!this[0]) return null;
			var a = this[0],
				b = this.offsetParent(),
				d = this.offset(),
				e = Ia.test(b[0].nodeName) ? {
					top: 0,
					left: 0
				} : b.offset();
			d.top -= parseFloat(c.css(a, "marginTop")) || 0;
			d.left -= parseFloat(c.css(a, "marginLeft")) || 0;
			e.top += parseFloat(c.css(b[0], "borderTopWidth")) || 0;
			e.left += parseFloat(c.css(b[0], "borderLeftWidth")) || 0;
			return {
				top: d.top - e.top,
				left: d.left - e.left
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var a = this.offsetParent || t.body; a && !Ia.test(a.nodeName) && c.css(a, "position") === "static";) a = a.offsetParent;
				return a
			})
		}
	});
	c.each(["Left", "Top"], function(a, b) {
		var d = "scroll" + b;
		c.fn[d] = function(e) {
			var f = this[0],
				h;
			if (!f) return null;
			if (e !== B) return this.each(function() {
				if (h = fa(this)) h.scrollTo(!a ? e : c(h).scrollLeft(), a ? e : c(h).scrollTop());
				else this[d] = e
			});
			else
			return (h = fa(f)) ? "pageXOffset" in h ? h[a ? "pageYOffset" : "pageXOffset"] : c.support.boxModel && h.document.documentElement[d] || h.document.body[d] : f[d]
		}
	});
	c.each(["Height", "Width"], function(a, b) {
		var d = b.toLowerCase();
		c.fn["inner" + b] = function() {
			return this[0] ? parseFloat(c.css(this[0], d, "padding")) : null
		};
		c.fn["outer" + b] = function(e) {
			return this[0] ? parseFloat(c.css(this[0], d, e ? "margin" : "border")) : null
		};
		c.fn[d] = function(e) {
			var f = this[0];
			if (!f) return e == null ? null : this;
			if (c.isFunction(e)) return this.each(function(l) {
				var k = c(this);
				k[d](e.call(this, l, k[d]()))
			});
			if (c.isWindow(f)) return f.document.compatMode === "CSS1Compat" && f.document.documentElement["client" + b] || f.document.body["client" + b];
			else if (f.nodeType === 9) return Math.max(f.documentElement["client" + b], f.body["scroll" + b], f.documentElement["scroll" + b], f.body["offset" + b], f.documentElement["offset" + b]);
			else if (e === B) {
				f = c.css(f, d);
				var h = parseFloat(f);
				return c.isNaN(h) ? f : h
			} else
			return this.css(d, typeof e === "string" ? e : e + "px")
		}
	})
})(window);

function helpIntro() {
	var html;
	html = '<div style="width:470px;margin:0 auto;border:solid 1px #bbe4ff;padding:10px 10px 5px 10px;">';
	html += '<div style="width:460px;background-color:#bbe4ff;padding:5px 5px 5px 5px"><b>Hướng dẫn cắt video tải về điện thoại di động</b></div><br/>';
	html += '   1. Xem thử video muốn cắt (tốt nhất là xem hết từ đầu đến cuối).<br/>';
	html += '   2. Click vào nút Tự tạo video mobie <img src="/images/hdcatmb.gif" align="absmiddle" />để các thanh cắt hiện ra (3 thanh).<br/>';
	html += '   3. Kéo thanh cắt đến các điểm cần cắt: thanh đầu điểm đầu, thanh cuối điểm cuối.<img src="/images/hdcopy.gif" width="70px" align="absmiddle"/><br/>';
	html += '   4. Chọn xong các điểm cần cắt, click nút Cắt (màu xanh).<img src="/images/hdcat.gif" align="absmiddle"/><br/>';
	html += '   5. Một thông báo hiển thị với định dạng .3gp và .mp4 (dòng iphone dùng .mp4), chọn định dạng xong click vào nút Cập nhật (màu vàng) <img src="/images/hdcapnhat.gif" align="absmiddle"/> trên thông báo này).<br/>';
	html += '   6. Thông báo cuối cùng hiển thị hướng dẫn thao tác trên điện thoại di động. Bạn chỉ cần làm đúng theo hướng dẫn là xong.<br/>';
	html += ' </div>';
	document.getElementById("displayHelpIntro").innerHTML = html;
}

function GetPlayerFilm(filmid, episode) {
	$.post("/watch/controls/playerFilm.aspx", {
		filmid: filmid,
		episode: episode
	}, function(retval) {
		$("#displayPlayer").html(retval);
	});
}

function getMessageNotify() {
	$.post("/Members/services/notifyMessage.aspx", function(retval) {
		$("#notify-message").html(retval);
	});
}

function getNewUsers() {
	$.post("/Members/newUsers.aspx", function(retval) {
		$("#new-users").html(retval);
	});
}

function getHotUsers() {
	$.post("/Members/TopUserPageViews.aspx", function(retval) {
		$("#user_hot").html(retval);
	});
}

function getTopPokeUsers() {
	$.post("/Members/games/TopPokemon.aspx", function(retval) {
		$("#poke-user-top").html(retval);
	});
}

function getRickUsers() {
	$.post("/Members/RickUsers.aspx", function(retval) {
		$("#rick-users").html(retval);
	});
}

function off_mp3_bg(type) {
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/music/OffMp3.aspx", {
		type: type
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		if (retval == "1") {
			if (type == 1) {
				alert("Bạn đã bật nhạc nền thành công.");
				window.location.reload();
			} else {
				alert("Bạn đã tắt nhạc nền thành công.");
				window.location.reload();
			}
		} else {
			alert("Bạn chưa tắt/bật được nhạc nền.");
			return false;
		}
	});
}

function off_theme_bg(type) {
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/themes/OffTheme.aspx", {
		type: type
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		if (retval == "1") {
			if (type == 1) {
				alert("Bạn bỏ hình nền thành công.");
				window.location.reload();
			} else {
				alert("Bạn đã tắt hình nền thành công.");
				window.location.reload();
			}
		} else {
			alert("Bạn chưa tắt/bật được hình nền.");
			return false;
		}
	});
}

function add_mp3_bg(key) {
	var r = confirm("Cài nhạc nền mất 200 coins/1 bài , bạn có đồng ý ko?");
	if (r == true) {
		document.getElementById("divSystemWorking").style.display = "block";
		$.post("/Members/music/AddMp3Bg.aspx", {
			key: key
		}, function(retval) {
			document.getElementById("divSystemWorking").style.display = "none";
			if (retval == "0") {
				alert("Bạn hãy đăng nhập để sở hữu phim này");
				return false;
			} else if (retval == "2") {
				alert("Bạn chưa có đủ coins để cài nhạc nền.");
				return false;
			} else if (retval == "1") {
				alert("Bạn đã cài nhạc nền thành công.");
				window.location.reload();
			}
		});
	} else {
		return false;
	}
}

function load_gg_keyword() {
	$.post("/Modules/keywordGG.aspx", function(retval) {
		$("#gg-keyword").html(retval);
	});
}

function load_mp3_bg(key) {
	$.post("/Members/music/PlayMp3.aspx", {
		key: key
	}, function(retval) {
		$("#mp3-back").html(retval);
	});
}

function getVipSession() {
	$.post("/Members/VipSession.aspx", function(retval) {
		$("#vip-session").html(retval);
	});
}

function getVipUsers() {
	$.post("/Members/TopUserVips.aspx", function(retval) {
		$("#vip-users").html(retval);
	});
}

function load_all_gifts(user_accept, page) {
	$.post("/Members/UserAllGift.aspx", {
		nick: user_accept,
		page: page
	}, function(retval) {
		$("#ds-p-info-acc").html(retval);
	});
}

function search_Mp3() {
	var keysearch = document.getElementById("txtSearchMp3").value;
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/music/search_music.aspx", {
		keyword: keysearch
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		$("#result-s-mp3").html(retval);
	});
}

function view_mp3_bg() {
	$.post("/Members/music/loadSearchMp3.aspx", function(retval) {
		$("#ds-p-info-acc").html(retval);
	});
}

function load_all_vips(user_accept, page) {
	$.post("/Members/ListAllItemVips.aspx", {
		nick: user_accept,
		page: page
	}, function(retval) {
		$("#ds-p-info-acc").html(retval);
	});
}

function tranh_ghe() {
	var r = confirm("Bạn muốn tranh ghế VIP này?");
	if (r == true) {
		$("#btnTranhGhe").html('<input type="button" value="Tranh chỗ" class="Button-disable" style="width:150px"  />');
		document.getElementById("divSystemWorking").style.display = "block";
		$.post("/Members/Tranhghe.aspx", function(retval) {
			document.getElementById("divSystemWorking").style.display = "none";
			if (retval == "0") {
				alert("Bạn hãy đăng nhập để tranh ghế vip");
				return false;
			} else if (retval == "1") {
				alert("Bạn chưa đủ coins để tranh ghế vip");
				return false;
			} else if (retval == "3") {
				alert("Có người đang tranh ghế. Bạn hãy chờ chút xíu");
				return false;
			} else if (retval == "2") {
				alert("Chúc mừng bạn đã giành được ghế vip");
				window.location.reload();
			}
		});
	}
}

function buy_film(id) {
	$("#btnBuyFilm").html('<input type="button" value="Sở hữu phim" class="Button-disable"  />');
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/BuyFilm.aspx", {
		id: id
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		if (retval == "0") {
			alert("Bạn hãy đăng nhập để sở hữu phim này");
			window.location.reload();
		} else if (retval == "1") {
			alert("Bạn chưa đủ vàng để sở hữu phim này");
			window.location.reload();
		} else if (retval == "3") {
			alert("Phim này đã bị khóa");
			window.location.reload();
		} else if (retval == "4") {
			alert("Phim này ko mua được");
			window.location.reload();
		} else if (retval == "5") {
			alert("Phim này đang được giao dịch");
			window.location.reload();
		} else if (retval == "2") {
			alert("Chúc mừng bạn đã sở hữu phim này");
			window.location.reload();
		}
	});
}

function updateViewsHD(id) {
	$.post("/watch/viewFilmHD.aspx", {
		id: id
	}, function(retval) {});
}

function time_user_watch(id) {
	$.post("/Members/timeUserWatch.aspx", {
		id: id
	}, function(retval) {});
}

function time_user_online() {
	$.post("/Members/CheckUserOnline.aspx", function(retval) {});
}

function loadTrailer() {
	$.post("/Modules/loadTrailer.aspx", function(retval) {
		$("#dis-trailer").html(retval);
	});
}

function notify_check(user) {
	$.post("/Members/CheckNotify.aspx", {
		user: user
	}, function(retval) {
		if (retval != "0") {
			$("#notity").html(retval);
			document.getElementById("notity").style.display = "block";
		}
	});
}
//------------ dung chung -----------------------//

function openWindow(url, width, height) {
	var newwindow = window.open(url, 'name', 'width=' + width + ',height=' + height + ',scrollbars=1');
	if (window.focus) {
		newwindow.focus()
	}
	newwindow.moveTo(200, 150);
}

function open_logout_window() {
	var _width = 300;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 50;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('http://my.soha.vn/api/logout', '', 'width=1,height=1,toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
	//    //window.open('/Members/LogoutMing.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
	$.post("/Members/Logout.aspx", function(e) {
		//window.open("/Members/LogoutMing.aspx", 'name', 'width=1,height=1,scrollbars=1');
		window.location.href = window.location.href;
	});
}

function openFeatures() {
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/NewFeatures.aspx", function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		$("#f-waiting").html(retval);
		$("#f-waiting").css("display", "block");
	});
	//    window.open('/Members/NewFeatures.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function openhelp() {
	var _width = 550;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 450;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/help.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function openUpdateVip() {
	var _width = 750;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 650;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/noteVip.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function reg_hd() {
	var _width = 620;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 320;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/RegAccHd.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=yes,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function lock_phim(id) {
	var _width = 650;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 500;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/lockedFilm.aspx?id=' + id, '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=yes,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function send_gift(nick) {
	var _width = 650;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 500;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/Gift.aspx?nick=' + nick, '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=yes,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function show100Pokemon() {
	var _width = 350;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 500;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/games/Top100Pokemon.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=yes,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function show100TopUserHot() {
	var _width = 350;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 500;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/TopAllUserHot.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=yes,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function show100TopUserVip() {
	var _width = 350;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 500;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/TopAllVipUsers.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=yes,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function show100TopUserGold() {
	var _width = 350;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 500;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/TopUserGold.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=yes,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function openRegisWindow() {
	var _width = 550;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 500;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('http://id.ming.vn/big4/register?site_key=223f8755dd66c09440d610ef3311dd70&site_callback=http://phim.soha.vn/Members/CallbackRg.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function openLoginWindow() {
	var _width = 550;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 500;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Login.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function search_film() {
	var keysearch = document.getElementById("txtKeyword").value;
	$.post("/search/SearchRedirect.aspx", {
		keyword: keysearch
	}, function(e) {
		window.location = e;
	});
}

function search_filmF() {
	var keysearch = document.getElementById("txtKeywordF").value;
	$.post("/search/SearchRedirect.aspx", {
		keyword: keysearch
	}, function(e) {
		window.location = e;
	});
}

function search_U() {
	var keysearch = document.getElementById("txtSearchUser").value;
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/SearchUsers.aspx", {
		user: keysearch
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		$("#result-s").html(retval);
		$("#result-s").css("display", "block");
	});
}
//-------- USER  --------------//

function editUserBlast() {
	document.getElementById("txtEditBlastHide").style.display = "block";
	document.getElementById("lblEditBlast").style.display = "none";
	document.getElementById("lblBlast").style.display = "none";
}

function CancelUserBlast() {
	document.getElementById("lblEditBlast").style.display = "inline";
	document.getElementById("txtEditBlastHide").style.display = "none";
	document.getElementById("lblBlast").style.display = "inline";
	document.getElementById("loading").style.display = "none";
}

function makeFriends2(id) {
	$("#p-make-friends2").html('');
	$.post("/Members/RqAddFriends2.aspx", {
		id: id
	}, function(retval) {
		$("#p-make-friends2").html('<div class="p-friend-waiting">Chờ đồng ý</div>');
	});
}

function makeFriends(id) {
	var r = confirm("Bạn sẽ mất 100 coins để trở thành Fans, bạn có đồng ý ko?");
	if (r == true) {
		$("#p-make-friends").html('');
		new Ajax.Updater("p-make-friends", "/Members/RqAddFriends.aspx", {
			method: 'post',
			parameters: 'id=' + id,
			evalScripts: true,
			asynchronous: true
		});
	} else {
		return false;
	}
}

function lockCmFan(nick, type) {
	$.post("/Members/OpitionFanCm.aspx", {
		nick: nick,
		type: type
	}, function(retval) {
		alert("thay đổi thành công");
		window.location.reload();
	});
}

function CancelConfirmFriends(id1, id2) {
	document.getElementById("notice").style.display = "none";
	$.post("/Members/CancelFriends.aspx", {
		id1: id1,
		id2: id2
	}, function(retval) {
		GetWaitingFriends(id1);
	});
}

function lock_film(id) {
	var _width = 500;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 270;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/lockedFilm.aspx?id=' + id, '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=yes,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function unlock_film(id) {
	var r = confirm("Bạn chắc chắn muốn mở khóa?");
	if (r == true) {
		document.getElementById("divSystemWorking").style.display = "block";
		$.post("/Members/unlockFilm.aspx", {
			id: id
		}, function(retval) {
			document.getElementById("divSystemWorking").style.display = "none";
			if (retval == "0") {
				alert("Bạn chưa đăng nhập");
				return false;
			} else if (retval == "1") {
				alert("Bạn đã mở khóa thành công");
				window.location.href = window.location.href;
			}
		});
	} else {
		return false;
	}
}

function sell_film(id) {
	var r = confirm("Bạn sẽ thu lại được 10% giá trị phim hiện tại , bạn có đồng ý ko?");
	if (r == true) {
		$("#sell_film_" + id).html('');
		document.getElementById("divSystemWorking").style.display = "block";
		$.post("/Members/SellFilm.aspx", {
			id: id
		}, function(retval) {
			document.getElementById("divSystemWorking").style.display = "none";
			if (retval == "0") alert("Bạn đã thanh lý phim này rồi");
			else if (retval == "2") alert("Phim này đang được khóa. Bạn hãy mở khóa trước khi thanh lý.");
			else if (retval == "1") {
				alert("Bạn đã thanh lý phim thành công");
				window.location.href = window.location.href;
			}
		});
	} else {
		return false;
	}
}

function load_recomment_films(coins, userid) {
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/listFilmRecomment.aspx", {
		coins: coins,
		id: userid
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		$("#list-recomment-film").html(retval);
	});
}

function sendFilm(id) {
	var _width = 380;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 250;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/Members/SendFilm.aspx?id=' + id, '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function cormfim_sendFilm(id) {
	var check = 0;
	if (document.getElementById("fnick").value.length > 150 || document.getElementById("fnick").value == "") {
		check = 1;
		alert("Bạn chưa nhập người nhận hoặc tên người nhận quá dài!");
	}
	if (document.getElementById("fmessage").value == "" && check == 0) {
		check = 1;
		alert("Bạn chưa nhập lời nhắn");
	}
	if (document.getElementById("fmessage").value.length > 350 && check == 0) {
		check = 1;
		alert("Lời nhắn của bạn quá dài");
	}
	if (check == 0) {
		document.getElementById("divSystemWorking").style.display = "block";
		$.post("/Members/cormfimSendFilm.aspx", {
			id_film: id,
			user_accept: document.getElementById("fnick").value,
			message: document.getElementById("fmessage").value
		}, function(retval) {
			document.getElementById("divSystemWorking").style.display = "none";
			if (retval == "0") alert("Bạn đã tặng phim này rồi");
			else if (retval == "1") alert("Tên người nhận không đúng");
			else if (retval == "2") alert("Bạn không thể gửi cho chính mình");
			else if (retval == "3") alert("Phim gửi có giá trị phải lớn hơn 500 coins");
			else if (retval == "4") alert("Bạn phải nâng cấp vip ít nhất 1 lần để thực hiện tính năng này");
			else if (retval == "6") alert("Bạn đã tặng phim này rồi");
			else if (retval == "7") alert("Phim này đang được khóa. Bạn hãy mở khóa trước khi tặng phim.");
			else if (retval == "5") {
				alert("Bạn đã tặng phim thành công");
				window.opener.location.href = window.opener.location.href;
				window.close();
			}
		});
	}
}

function deleteFans(user_rq, user_accept) {
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/CancelFans.aspx", {
		user_rq: user_rq,
		user_accept: user_accept
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		$("#p-make-friends").html('');
	});
}

function CancelFriends(id1, id2, status, page) {
	$.post("/Members/CancelFriends.aspx", {
		id1: id1,
		id2: id2,
		status: status
	}, function(retval) {
		load_p_Friends2(id2);
		load_p_edit_Friends(id2, page);
	});
}

function ConfirmFriendRq(id1, id2, status) {
	document.getElementById("divSystemWorking").style.display = "block";
	document.getElementById("notice").style.display = "none";
	$.post("/Members/ConfirmFriendRq.aspx", {
		id1: id1,
		id2: id2,
		status: status
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		$("#f-waiting").html(retval);
		$("#f-waiting").css("display", "block");
	});
}

function ConfirmFilmGift(user_accept, id, status, type) {
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/ConfirmFilmGift.aspx", {
		type: type,
		status: status,
		id: id
	}, function(retval) {
		GetFilmGift(user_accept);
	});
}

function GetFilmGift(user_accept) {
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/listFilmGift.aspx", {
		user_accept: user_accept
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		$("#f-waiting").html(retval);
		$("#f-waiting").css("display", "block");
	});
}

function GetWaitingFriends(id) {
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/Members/UserRqFriends.aspx", {
		id: id
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		$("#f-waiting").html(retval);
		$("#f-waiting").css("display", "block");
	});
}

function GetNotify(user) {
	document.getElementById("notity").style.display = "none";
	GetDataNotify(user);
}

function GetDataNotify(user) {
	$.post("/Members/Notify.aspx", {
		user: user
	}, function(retval) {
		$("#dis-noitice").html(retval);
		$("#dis-noitice").css("display", "block");
	});
}

function close_d_notice() {
	$("#f-waiting").html("");
	$("#dis-noitice").css("display", "none");
}

function close_f_rq() {
	$("#f-waiting").html("");
	$("#f-waiting").css("display", "none");
}

function close_s_u() {
	$("#result-s").html("");
	$("#result-s").css("display", "none");
}

function SaveBlast() {
	var check = 0;
	if (document.getElementById("txtBlast").value.length > 290 || document.getElementById("txtBlast").value == "") {
		check = 1;
		alert("Chưa có status hoặc status quá dài!");
	}
	if (check == 0) {
		document.getElementById("loading").style.display = "inline";
		$.post("/Members/saveBlast.aspx", {
			blast: document.getElementById("txtBlast").value
		}, function(retval) {
			document.getElementById("loading").style.display = "none";
			$("#lblBlast").html(retval);
			document.getElementById("lblEditBlast").style.display = "inline";
			document.getElementById("txtEditBlastHide").style.display = "none";
			document.getElementById("lblBlast").style.display = "inline";
		});
	}
}

function SaveInfo(nick) {
	var check = 0;
	if (document.getElementById("txtFullName").value.length > 190 || document.getElementById("txtFullName").value.length == 0) {
		check = 1;
		alert("Họ tên chưa chính xác!");
	} else if (document.getElementById("datepicker").value.length > 15 || document.getElementById("datepicker").value.length == 0) {
		check = 1;
		alert("Ngày sinh chưa chính xác!");
	}
	//    else if (document.getElementById("txtEmail").value != "") {
	//        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	//        var address = document.getElementById("txtEmail").value;
	//        if (reg.test(address) == false) {
	//            check = 1;
	//            alert('Email chưa chính xác!');
	//        }
	//    }
	if (check == 0) {
		document.getElementById("divSystemWorking").style.display = "block";
		$.post("/Members/saveInfo.aspx", {
			fullname: document.getElementById("txtFullName").value,
			datebirth: document.getElementById("datepicker").value,
			nick: nick,
			address: document.getElementById("scity").options[document.getElementById("scity").selectedIndex].value,
			sex: document.getElementById("slSex").options[document.getElementById("slSex").selectedIndex].value
		}, function(retval) {
			document.getElementById("divSystemWorking").style.display = "none";
			alert("Chúc mừng bạn đã đăng ký thành công.");
			window.opener.location.href = window.opener.location.href;
			window.close();
		});
	}
	//load_p_info(nick);
}

function change_gold() {
	$.post("/Members/changeGold.aspx", function(retval) {
		alert(retval);
		if (retval.match("Bạn đã đổi được")) window.location.reload();
		else
		return false;
	});
}

function load_property_film(userid) {
	$.post("/Members/listFilmProperty.aspx", {
		id: userid
	}, function(retval) {
		$("#list-property-film").html(retval);
	});
}

function load_user_film(userid) {
	$.post("/Members/ListFilmUser.aspx", {
		id: userid
	}, function(retval) {
		$("#p-user-list-film").html(retval);
	});
}

function load_user_all_film(userid) {
	$.post("/Members/ListFilmUserAll.aspx", {
		id: userid
	}, function(retval) {
		$("#ds-p-info-acc").html(retval);
	});
}

function load_user_all_property_film(userid) {
	$.post("/Members/ListAllPropertyFilm.aspx", {
		id: userid
	}, function(retval) {
		$("#ds-p-info-acc").html(retval);
	});
}

function load_action_user(user_name, pagesize, page) {
	$.post("/Members/ActionUsers.aspx", {
		user: user_name,
		pagesize: pagesize,
		page: page
	}, function(retval) {
		$("#action-users").html(retval);
	});
}

function load_items_vip(user_name) {
	$.post("/Members/ListItemVip.aspx", {
		nick: user_name
	}, function(retval) {
		$("#list-items-vip").html(retval);
	});
}

function load_user_gifts(user_name) {
	$.post("/Members/UserGift.aspx", {
		nick: user_name
	}, function(retval) {
		$("#user_gifts").html(retval);
	});
}

function update_vip_user(user_name) {
	document.getElementById("divSystemWorking").style.display = "block";
	$("#p-update-vip").html('');
	$.post("/Members/UpdateVip.aspx", {
		nick: user_name
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		if (retval == "0") alert("bạn chưa đủ coins để nâng cấp vip. Hãy đọc hướng dẫn kiếm coins nhé.");
		else if (retval == "1") {
			alert("Bạn đã nâng cấp vip thành công cho " + user_name);
			window.location.reload();
		}
	});
}

function update_vip(user_name) {
	var r = confirm("Bạn sẽ bị trừ 5000 coins nếu nâng cấp vip , bạn có muốn ko?");
	if (r == true) {
		update_vip_user(user_name);
	} else {
		return false;
	}
}

function load_edit_info(nick) {
	$.post("/Members/editInfo.aspx", function(retval) {
		//alert(retval);
		$("#ds-p-info-acc").html(retval);
	});
	//new Ajax.Updater("ds-p-info-acc", "/Members/editInfo.aspx", { method: 'get', parameters: 'nick=' + nick, evalScripts: true, asynchronous: true });
}

function load_p_info(nick) {
	document.getElementById("loading").style.display = "inline";
	$.post("/Members/info.aspx", {
		nick: nick
	}, function(retval) {
		document.getElementById("loading").style.display = "none";
		$("#ds-p-info-acc").html(retval);
	});
}

function load_p_Friends(id) {
	new Ajax.Updater("p-user-friends", "/Members/UserFriend.aspx", {
		method: 'post',
		parameters: 'id=' + id,
		evalScripts: true,
		asynchronous: true
	});
}

function load_p_Friends2(id) {
	new Ajax.Updater("p-user-friends2", "/Members/UserFriend2.aspx", {
		method: 'post',
		parameters: 'id=' + id,
		evalScripts: true,
		asynchronous: true
	});
}

function load_p_edit_Fans(user_accept, page) {
	document.getElementById("loading").style.display = "inline";
	$.post("/Members/AllFans.aspx", {
		user_accept: user_accept,
		page: page
	}, function(retval) {
		document.getElementById("loading").style.display = "none";
		$("#ds-p-info-acc").html(retval);
	});
}

function load_p_edit_Friends(id, page) {
	document.getElementById("loading").style.display = "inline";
	$.post("/Members/editFriends.aspx", {
		id: id,
		page: page
	}, function(retval) {
		document.getElementById("loading").style.display = "none";
		$("#ds-p-info-acc").html(retval);
	});
}
//------------------------------ END USER ---------------------------///

function loadPlayer(id, srcPlayer, flashvar) {
	var html;
	html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="680" height="385"><param name="wmode" value="transparent" /><param name="type" value="application/x-shockwave-flash"><param name="movie" value="' + srcPlayer + '"/><param name="flashvars" value="' + flashvar + '"/><param name="allowscriptaccess" value="always" /><param name="allowFullScreen" value="true"/><param name="autoStart" value="true"><param name="autoplay" value="true"><param name="quality" value="high" /><embed src="' + srcPlayer + '" flashvars="' + flashvar + '" autostart="true" autoplay="true" wmode="transparent" allowFullScreen="true" width="680" height="385" type="application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer" allowScriptAccess="always"></embed></object>';
	window.frames["frm" + id].document.body.innerHTML = html;
	window.frames["frm" + id].document.body.style.margin = "0";
}

function DisplayPlayerVN(id, choice) {
	new Ajax.Updater("DisplayPlayerVN", "/Modules/player.aspx", {
		method: 'get',
		parameters: 'id=' + id + "&choice=" + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function loadImage(url, id, link, title) {
	var html;
	html = '<a href="' + link + '" target=_top><img src="' + url + '" width=104 height=78 title="' + title + '" alt="' + title + '" class="products"  border="0"></a>';
	window.frames["frm" + id].document.body.innerHTML = html;
	window.frames["frm" + id].document.body.style.margin = "0";
}

function loadImageTop(url, id, link, title) {
	var html;
	html = '<a href="' + link + '" target=_top><img src="' + url + '" width=\"104px\" height=\"78px\" title="' + title + '" alt="' + title + '" class="products"  border="0"></a>';
	var oIframe = document.getElementById("frmt" + id);
	var oDoc = oIframe.contentWindow || oIframe.contentDocument;
	if (oDoc.document) {
		oDoc = oDoc.document;
	}
	oDoc.body.innerHTML = html;
	oDoc.body.style.margin = "0";
	//window.frames["frmt"+id].document.body.innerHTML = html;
	//window.frames["frmt"+id].document.body.style.margin ="0";
}

function confirm_siteroot(url) {
	var r = confirm("Baamboo không có mối liên hệ nào đến các tác giả , cũng như không chịu trách nhiệm về nội dung của trang web này . Bạn có muốn tiếp tục ? ");
	if (r == true) {
		window.open(url);
	}
}

function closeBox() {
	displaytabFunction('0');
	document.getElementById("DisplayHideBox").innerHTML = '';
}

function displayMoreDesc(choice) {
	if (choice == 1) {
		document.getElementById("descShortV").style.display = "none";
		document.getElementById("descLongV").style.display = "block";
		//document.getElementById("iconDescMore").innerHTML = "<a href='javascript:displayMoreDesc(0);'>[-]</a>";
	} else {
		document.getElementById("descShortV").style.display = "block";
		document.getElementById("descLongV").style.display = "none";
		//document.getElementById("iconDescMore").innerHTML = "<a href='javascript:displayMoreDesc(1);'>[+]</a>";
	}
}

function DisplayCategory(choice) {
	new Ajax.Updater("DisplayCategory", "/Modules/Category.aspx", {
		method: 'get',
		parameters: 'choice=' + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayNewVideos(choice, page, pagesize) {
	new Ajax.Updater("DisplayNewVideos", "/Modules/NewVideo.aspx", {
		method: 'get',
		parameters: 'choice=' + choice + '&page=' + page + '&pagesize=' + pagesize,
		evalScripts: true,
		asynchronous: true
	});
}

function displayPlayerEvent(id) {
	new Ajax.Updater("displayPlayerEvent", "/Modules/playerEvent.aspx", {
		method: 'get',
		parameters: 'id=' + id,
		evalScripts: true,
		asynchronous: true
	});
}

function displayVideoCart(id, type) {
	new Ajax.Updater("displayVideoCart", "/controls/videoCart.aspx", {
		method: 'get',
		parameters: 'id=' + id + "&type=" + type,
		evalScripts: true,
		asynchronous: true
	});
}

function deleteVideoCart(id, type, choice) {
	if (type == 1) {
		var r = confirm("Bạn chắc chắn muốn xóa những video này khỏi Giỏ Video Ưa Thích?");
		if (r == true) {
			new Ajax.Updater("displayVideoCart", "/controls/deleteCartVideo.aspx", {
				method: 'get',
				parameters: 'id=' + id + "&type=" + type + "&choice=" + choice,
				evalScripts: true,
				asynchronous: true
			});
		}
	} else
	new Ajax.Updater("displayVideoCart", "/controls/deleteCartVideo.aspx", {
		method: 'get',
		parameters: 'id=' + id + "&type=" + type + "&choice=" + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function displayVideoEventBar() {
	new Ajax.Updater("displayVideoEventBar", "/Modules/VideoEventBar.aspx", {
		method: 'get',
		asynchronous: true
	});
}

function crackYume(linkDow) {
	new Ajax.Updater("displayVideoEventChannelMain", "/Modules/EventHot.aspx", {
		method: 'get',
		parameters: 'channel=' + channel,
		evalScripts: true,
		asynchronous: true
	});
}

function displayFilmNew() {
	new Ajax.Updater("displayFilmNew", "/watch/controls/FilmRelated.aspx", {
		method: 'get',
		parameters: 'newid=1',
		evalScripts: true,
		asynchronous: true
	});
}

function displayFilmRelatedContent(id) {
	new Ajax.Updater("displayFilmRelatedContent", "/watch/controls/FilmRelated.aspx", {
		method: 'get',
		parameters: 'id=' + id,
		evalScripts: true,
		asynchronous: true
	});
}

function displayFilmRelated(channel) {
	new Ajax.Updater("displayFilmRelated", "/watch/controls/FilmRelated.aspx", {
		method: 'get',
		parameters: 'channelid=' + channel,
		evalScripts: true,
		asynchronous: true
	});
}

function displayVideoEventChannelMain(channel) {
	new Ajax.Updater("displayVideoEventChannelMain", "/Modules/EventHot.aspx", {
		method: 'get',
		parameters: 'channel=' + channel,
		evalScripts: true,
		asynchronous: true
	});
}

function displayVideoEventChannelSub(id, channel, page) {
	new Ajax.Updater("displayVideoEventChannelSub" + id, "/Modules/EventSub.aspx", {
		method: 'get',
		parameters: 'channel=' + channel + "&page=" + page + "&num=" + id,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayKeyWordSugest(choice, catid) {
	new Ajax.Updater("DisplayKeyWordSugest", "/browse/TopKeyWordSugest.aspx", {
		method: 'get',
		parameters: 'choice=' + choice + "&catid=" + catid,
		evalScripts: true,
		asynchronous: true
	});
}

function displayImage(url, id, title, height, width) {
	new Ajax.Updater("displayImage" + id, "/loadImg.aspx", {
		method: 'get',
		parameters: 'url=' + url + "&id=" + id + "&title=" + title + "&height=" + height + "&width=" + width,
		evalScripts: true,
		asynchronous: true
	});
}

function catMobie(idmobie, idvideo, choice, start, end, duration, extension, catid) {
	new Ajax.Updater("display", "/player/vid_encode.aspx", {
		method: 'get',
		parameters: 'idmobie=' + idmobie + "&idvideo=" + idvideo + "&choice=" + choice + "&start=" + start + "&end=" + end + "&duration=" + duration + "&extension=" + extension + "&catid=" + catid,
		evalScripts: true,
		asynchronous: true
	});
	alert(document.getElementById("display").innerHTML);
}

function DisplayMp3Refer(strsearch) {
	new Ajax.Updater("displaymp3refer", "/Modules/Mp3Refer.aspx", {
		method: 'get',
		parameters: 'search=' + strsearch,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayMp3ReferC(strsearch) {
	new Ajax.Updater("displaymp3referC", "/Modules/Mp3ReferC.aspx", {
		method: 'get',
		parameters: 'search=' + strsearch,
		evalScripts: true,
		asynchronous: true
	});
}

function displaySearchRelated(strsearch, choice) {
	new Ajax.Updater("displaySearchRelated", "/watch/controls/moreSearch.aspx", {
		method: 'get',
		parameters: 'search=' + strsearch + "&choice=" + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function displaySearchFilmRelated(strsearch, choice) {
	new Ajax.Updater("displaySearchFilmRelated", "/watch/controls/moreSearch.aspx", {
		method: 'get',
		parameters: 'search=' + strsearch + "&choice=" + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayBlogNews() {
	new Ajax.Updater("DisplayBlogNews", "/Modules/BlogNews.aspx", {
		method: 'get',
		evalScripts: true,
		asynchronous: true
	});
}

function displayVideoWatchingBar(choice) {
	var randomnumber = Math.floor(Math.random() * 11)
	new Ajax.Updater("displayVideoWatchingBar", "/Modules/VideoWatchingBar.aspx", {
		method: 'get',
		parameters: 'r=' + randomnumber + '&choice=' + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayCartVideo() {
	var randomnumber = Math.floor(Math.random() * 11)
	new Ajax.Updater("displayVideoCart", "/watch/controls/videoCart.aspx", {
		method: 'get',
		parameters: 'r=' + randomnumber,
		evalScripts: true,
		asynchronous: true
	});
	//setTimeout("alert(document.getElementById('displayVideoCart').innerHTML)",5000);
}

function DisplayTopMp3Today() {
	new Ajax.Updater("displaytopmp3today", "/Modules/Topmp3.aspx", {
		method: 'get',
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayTop20view(page, choice) {
	new Ajax.Updater("DisplayTop20view", "/browse/top20videos.aspx", {
		method: 'get',
		parameters: 'page=' + page + "&choice=" + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayBoxDownload(vk) {
	document.getElementById("DisplayHideBox").innerHTML = '<div style="width:650px;padding-top:10px;padding-bottom:10px;margin:auto 0;text-align:center;"><img src="/images/ico_loading.gif" align="absmiddle"></div>';
	new Ajax.Updater("DisplayHideBox", "/watch/controls/download.aspx", {
		method: 'get',
		parameters: 'vk=' + vk,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayBoxHelp() {
	new Ajax.Updater("DisplayHideBox", "/watch/controls/boxHelp.aspx", {
		method: 'get',
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayBoxWarning(url) {
	new Ajax.Updater("DisplayHideBox", "/UserControl/fbFrame.aspx", {
		method: 'get',
		parameters: 'url=' + url,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayBoxHide(vk, eps, type, choice) {
	new Ajax.Updater("DisplayHideBox", "/watch/controls/boxVideoHide.aspx", {
		method: 'get',
		parameters: 'vk=' + vk + "&eps=" + eps + "&type=" + type + "&choice=" + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayYtRelated(vk, type, cat) {
	new Ajax.Updater("DisplayYtRelated" + type, "/watch/controls/content.aspx", {
		method: 'get',
		parameters: 'vk=' + vk + "&type=" + type + "&category=" + cat,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayTopKeyWords(type) {
	new Ajax.Updater("DisplayTopKeyWords", "/watch/controls/topkeywords.aspx", {
		method: 'get',
		parameters: 'choice=' + type,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayYtRelatedPage(vk, type, page, cat) {
	new Ajax.Updater("DisplayYtRelated" + type, "/watch/controls/content.aspx", {
		method: 'get',
		parameters: 'vk=' + vk + "&type=" + type + "&page=" + page + "&category=" + cat,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayNNRelated(vk, type, mode) {
	new Ajax.Updater("DisplayNNRelated" + type, "/watch/controls/content.aspx", {
		method: 'get',
		parameters: 'vk=' + vk + "&type=" + type + "&mode=" + mode,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayVNRelated(vk, type, mode, cat) {
	new Ajax.Updater("DisplayVNRelated" + type, "/watch/controls/content.aspx", {
		method: 'get',
		parameters: 'vk=' + vk + "&type=" + type + "&mode=" + mode + "&category=" + cat,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayVNRelatedPage(vk, type, mode, page, cat) {
	new Ajax.Updater("DisplayVNRelated" + type, "/watch/controls/content.aspx", {
		method: 'get',
		parameters: 'vk=' + vk + "&type=" + type + "&mode=" + mode + "&page=" + page + "&category=" + cat,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayNNRelatedPage(vk, type, mode, page, cat) {
	new Ajax.Updater("DisplayNNRelated" + type, "/watch/controls/content.aspx", {
		method: 'get',
		parameters: 'vk=' + vk + "&type=" + type + "&mode=" + mode + "&page=" + page + "&category=" + cat,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayTopKeywordMp3() {
	new Ajax.Updater("displaykeywordmp3", "/Modules/topKeywordMp3.aspx", {
		method: 'get',
		evalScripts: true,
		asynchronous: true
	});
}

function DisplaySanNhac() {
	new Ajax.Updater("displaysannhac", "/Modules/CodeEmbedSanNhac.aspx", {
		method: 'get',
		evalScripts: true,
		asynchronous: true
	});
}

function sayCheck(choice, id, ep, active) {
	closePlayer(choice, id, ep, active);
}

function closePlayer(choice, id, ep, active) {
	document.getElementById("displayPlayer").innerHTML = '';
	DisplayPlayerFilm(id, choice, ep, active);
}

function DisplayPlayerFilm(id, choice, episode, active) {
	new Ajax.Updater("displayPlayer", "/Modules/player.aspx", {
		method: 'get',
		parameters: 'id=' + id + "&choice=" + choice + "&episode=" + episode + "&active=" + active,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayKenh14(type) {
	new Ajax.Updater("displaykenh14", "/Modules/CodeEmbed.aspx", {
		method: 'get',
		parameters: 'type=' + type,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayLinkDownloadFilm(source) {
	new Ajax.Updater("download", "/watch/controls/downloadFilm.aspx", {
		method: 'post',
		parameters: 'urlSource=' + source,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayLinkDownload(vid_key) {
	new Ajax.Updater("download", "/watch/controls/download.aspx", {
		method: 'get',
		parameters: 'vk=' + vid_key,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayWatchingYT(choice) {
	new Ajax.Updater("displayYT", "/Modules/totalResult.aspx", {
		method: 'get',
		parameters: 'wt=' + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayWatchingVN(choice) {
	new Ajax.Updater("displayVN", "/Modules/totalResult.aspx", {
		method: 'get',
		parameters: 'wt=' + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayWatchingNN(choice) {
	new Ajax.Updater("displayNN", "/Modules/totalResult.aspx", {
		method: 'get',
		parameters: 'wt=' + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayWatchingFL(choice) {
	new Ajax.Updater("displayFL", "/Modules/totalResult.aspx", {
		method: 'get',
		parameters: 'wt=' + choice,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayTotalYT(keyword, cat, type) {
	new Ajax.Updater("displayYT", "/Modules/totalResult.aspx", {
		method: 'get',
		parameters: 'search=' + keyword + "&cat=" + cat + "&type=" + type,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayTotalVN(keyword, type) {
	new Ajax.Updater("displayVN", "/Modules/totalResult.aspx", {
		method: 'get',
		parameters: 'search=' + keyword + "&type=" + type,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayTotalNN(keyword, type) {
	new Ajax.Updater("displayNN", "/Modules/totalResult.aspx", {
		method: 'get',
		parameters: 'search=' + keyword + "&type=" + type,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayTotalFI(keyword, type) {
	new Ajax.Updater("displayFI", "/Modules/totalResult.aspx", {
		method: 'get',
		parameters: 'search=' + keyword + "&type=" + type,
		evalScripts: true,
		asynchronous: true
	});
}

function DisplayTotalMP3(keyword, type) {
	new Ajax.Updater("displayMP3", "/Modules/totalResult.aspx", {
		method: 'get',
		parameters: 'search=' + keyword + "&type=" + type,
		evalScripts: true,
		asynchronous: true
	});
}

function openAddWatchWindows(_filmtitle, _filmthumb, _filmid) {
	var _width = 550;
	var Xpos = ((screen.availWidth - _width) / 2);
	var _height = 500;
	var Ypos = ((screen.availHeight - _height) / 2);
	window.open('/watch/addwatch.aspx?t=' + encodeURIComponent(_filmtitle) + '+&i=' + _filmid + '&tb=' + encodeURIComponent(_filmthumb), '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,resizable=no,location=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}

function SaveOnly(_fid, _comm) {
	var _feed = 0;
	$.post("/watch/shareaction.aspx", {
		fid: _fid,
		comm: _comm,
		feed: _feed
	}, function(retval) {
		if (retval == "0") {
			alert("Bạn hãy đăng nhập để thực hiện chức năng này");
			return false;
		} else if (retval == "-1") {
			alert("Phim này đã có trong Watchlist của bạn");
			return false;
		} else {
			alert("Phim đã được thêm vào Watchlist của bạn.");
			return false;
		}
	});
}

function SaveAndFeed(_fid, _comm) {
	var _feed = 1;
	$.post("/watch/shareaction.aspx", {
		fid: _fid,
		comm: _comm,
		feed: _feed
	}, function(retval) {
		if (retval == "0") {
			alert("Bạn hãy đăng nhập để thực hiện chức năng này");
			return false;
		} else if (retval == "-1") {
			alert("Phim này đã có trong Watchlist của bạn");
			return false;
		} else {
			alert("Phim đã được thêm vào Watchlist của bạn.");
			return false;
		}
	});
}

function load_wall_films() {
	var _ownerid = $("#wallownerId").val();
	var _viewerid = $("#guestID").val();
	var _status;
	if (_ownerid == _viewerid) {
		_status = "live";
	} else {
		_status = "mini";
	}
	var page = parseInt($("#pageindex").val(), 10);
	//$("#loading-cm").html('<img height="15" width="40" alt="" src="/images/ico_loading.gif">');
	$("#imgLoadingNotify").show();
	$.ajax({
		type: "GET",
		url: "/Members/loadWall.aspx",
		contentType: "application/html; charset=utf-8",
		data: "ownerid=" + _ownerid + "&viewerid=" + _viewerid + "&status=" + _status + "&pi=" + page,
		dataType: "html",
		async: true,
		success: function(msg) {
			$("#imgLoadingNotify").hide();
			$("#cm_list").append(msg);
		},
		complete: function(x, y) {
			$("#pageindex").val(page + 1);
			inits();
		}
	});
}

function load_watchlist(_ownerid) {
	var _viewerid = $("#guestID").val();
	document.getElementById("loading").style.display = "inline";
	$.ajax({
		type: "GET",
		url: "/Members/loadwatchlist.aspx",
		contentType: "application/html; charset=utf-8",
		data: "ownerid=" + _ownerid + "&viewerid=" + _viewerid,
		dataType: "html",
		async: true,
		success: function(msg) {
			document.getElementById("loading").style.display = "none";
			$("#ds-p-info-acc").html(msg);
		},
		complete: function(x, y) {
			inits();
		}
	});
}

function fnLikeReview(postid, filmid, select, value) {
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/watch/votereview.aspx", {
		postid: postid,
		value: value
	}, function(retval) {
		document.getElementById("divSystemWorking").style.display = "none";
		if (retval == "0") {
			alert("Bạn hãy đăng nhập để gửi đánh giá");
			return false;
		} else {
			if (select == "all") {
				viewAllReview(filmid);
			} else {
				displayBestReview(filmid);
			}
		}
	});
}

function displayBestReview(filmid) {
	new Ajax.Updater("pnl_reviewpanel", "/watch/bestreview.aspx", {
		method: 'get',
		parameters: 'id=' + filmid,
		asynchronous: true
	});
}

function viewAllReview(filmid) {
	new Ajax.Updater("pnl_reviewpanel", "/watch/allreview.aspx", {
		method: 'get',
		parameters: 'id=' + filmid,
		asynchronous: true
	});
}

function Writetoggle() {
	$("#pnl_write_content").toggle();
}

function PostFilmReview(filmid) {
	var validated = Page_ClientValidate('UserReview');
	if (!validated) {
		return false;
	} else {
		document.getElementById("divSystemWorking").style.display = "block";
		var title = $("#ctl00_ContentPlaceHolder1_obj_review_title").val();
		var content = $("#ctl00_ContentPlaceHolder1_obj_review_content").val();
		var rate = $("#ctl00_ContentPlaceHolder1_hidRating").val();
		$.post("/watch/addReview.aspx", {
			content: content,
			title: title,
			filmid: filmid,
			rate: rate
		}, function(retval) {
			$("#ctl00_ContentPlaceHolder1_obj_review_title").val("");
			$("#ctl00_ContentPlaceHolder1_obj_review_content").val("");
			if (retval == "0") {
				alert("Bạn hãy đăng nhập để gửi đánh giá");
				return false;
			} else if (retval == "-1") {
				alert("Quá trình gửi đánh giá bị lỗi. Rất xin lỗi bạn! Chúng tôi sẽ khắc phục sớm.");
				Writetoggle();
			} else {
				var select = $("#review_select").val();
				if (select == "best") {
					displayBestReview(filmid);
				} else {
					viewAllReview(filmid);
				}
				document.getElementById("divSystemWorking").style.display = "none";
				Writetoggle();
			}
		});
	}
}

function doDeleteReviewtem(postid, select, filmid) {
	document.getElementById("divSystemWorking").style.display = "block";
	$.post("/watch/deleteReview.aspx", {
		postid: postid
	}, function(retval) {
		if (retval == "-1") {
			alert("Bạn không có quyền xóa đánh giá này");
			return false;
		} else if (retval == "0") {
			alert("Bạn chưa đăng nhập");
			return false;
		} else {
			if (select == "best") {
				displayBestReview(filmid);
			} else {
				viewAllReview(filmid);
			}
			document.getElementById("divSystemWorking").style.display = "none";
		}
	});
}

function getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) { // all except Explorer
		if (document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}
	// for small pages with total height less then height of the viewport
	if (yScroll < windowHeight) {
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if (xScroll < windowWidth) {
		pageWidth = xScroll;
	} else {
		pageWidth = windowWidth;
	}
	arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
	return arrayPageSize;
}

function lightsoff() {
	$("#lightsoff").click(

	function() {
		$('#Playerholder, #Player, embed, object').css({
			'visibility': 'visible'
		});
		$('body').append('<div id="lightsoff-background"></div>');
		var page_size = getPageSize();
		$('#lightsoff-background').css({
			backgroundColor: "#000",
			opacity: 0.9,
			width: page_size[2],
			height: page_size[1]
		}).show();
		$('#lightsoff-background').click(function() {
			$('#lightsoff-background').fadeOut(function() {
				$('#lightsoff-background').remove();
			});
			return false;
		});
		return false;
	});
}
jQuery(document).ready(function() {
	lightsoff();
});
/*
 *  AVIM JavaScript Vietnamese Input Method Source File dated 02-11-2007
 *
 *	Copyright (C) 2004-2007 Hieu Tran Dang <lt2hieu2004 (at) users (dot) sf (dot) net>
 *	Website:	http://hdang.co.uk
 *
 *	You are allowed to use this software in any way you want providing:
 *		1. You must retain this copyright notice at all time
 *		2. You must not claim that you or any other third party is the author
 *		   of this software in any way.
*/
va = "email".split(',') //Put the ID of the fields you DON'T want to let users type Vietnamese in, multiple fields allowed, separated by a comma (,)
method = 0 //Default input method, 0=AUTO, 1=TELEX, 2=VNI, 3=VIQR, 4=VIQR*
on_off = 1 //Start AVIM on
dockspell = 1 //Start AVIM with spell checking on
dauCu = 1 //Start AVIM with old way of marking accent (o`a, o`e, u`y)
useCookie = 1 //Set this to 0 to NOT use cookies
radioID = "him_auto,him_telex,him_vni,him_viqr,him_viqr2,him_off,him_ckspell,him_daucu".split(",")
var agt = navigator.userAgent.toLowerCase(),
	alphabet = "QWERTYUIOPASDFGHJKLZXCVBNM\ ",
	them, spellerr, setCookie, getCookie, attached = new Array()
	var is_ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1)),
	S, F, J, R, X, D, oc, sk, saveStr, wi, frame, is_opera = false,
	D2, isKHTML = false
	var ver = 0,
	support = true,
	changed = false,
	specialChange = false,
	uni, uni2, g, h, SFJRX, DAWEO, Z, AEO, moc, trang, kl = 0,
	tw5, range = null,
	fID = document.getElementsByTagName("iframe")
	skey = new Array(97, 226, 259, 101, 234, 105, 111, 244, 417, 117, 432, 121, 65, 194, 258, 69, 202, 73, 79, 212, 416, 85, 431, 89)
	var skey2 = "a,a,a,e,e,i,o,o,o,u,u,y,A,A,A,E,E,I,O,O,O,U,U,Y".split(','),
	A, E, O, whit = false,
	english = "ĐÂĂƠƯÊÔ",
	lowen = "đâăơưêô",
	ds1 = "d,D".split(","),
	db1 = new Array(273, 272)
	os1 = "o,O,ơ,Ơ,ó,Ó,ò,Ò,ọ,Ọ,ỏ,Ỏ,õ,Õ,ớ,Ớ,ờ,Ờ,ợ,Ợ,ở,Ở,ỡ,Ỡ".split(","),
	ob1 = "ô,Ô,ô,Ô,ố,Ố,ồ,Ồ,ộ,Ộ,ổ,Ổ,ỗ,Ỗ,ố,Ố,ồ,Ồ,ộ,Ộ,ổ,Ổ,ỗ,Ỗ".split(",")
	mocs1 = "o,O,ô,Ô,u,U,ó,Ó,ò,Ò,ọ,Ọ,ỏ,Ỏ,õ,Õ,ú,Ú,ù,Ù,ụ,Ụ,ủ,Ủ,ũ,Ũ,ố,Ố,ồ,Ồ,ộ,Ộ,ổ,Ổ,ỗ,Ỗ".split(",");
mocb1 = "ơ,Ơ,ơ,Ơ,ư,Ư,ớ,Ớ,ờ,Ờ,ợ,Ợ,ở,Ở,ỡ,Ỡ,ứ,Ứ,ừ,Ừ,ự,Ự,ử,Ử,ữ,Ữ,ớ,Ớ,ờ,Ờ,ợ,Ợ,ở,Ở,ỡ,Ỡ".split(",")
trangs1 = "a,A,â,Â,á,Á,à,À,ạ,Ạ,ả,Ả,ã,Ã,ấ,Ấ,ầ,Ầ,ậ,Ậ,ẩ,Ẩ,ẫ,Ẫ".split(",");
trangb1 = "ă,Ă,ă,Ă,ắ,Ắ,ằ,Ằ,ặ,Ặ,ẳ,Ẳ,ẵ,Ẵ,ắ,Ắ,ằ,Ằ,ặ,Ặ,ẳ,Ẳ,ẵ,Ẵ".split(",")
as1 = "a,A,ă,Ă,á,Á,à,À,ạ,Ạ,ả,Ả,ã,Ã,ắ,Ắ,ằ,Ằ,ặ,Ặ,ẳ,Ẳ,ẵ,Ẵ,ế,Ế,ề,Ề,ệ,Ệ,ể,Ể,ễ,Ễ".split(",");
ab1 = "â,Â,â,Â,ấ,Ấ,ầ,Ầ,ậ,Ậ,ẩ,Ẩ,ẫ,Ẫ,ấ,Ấ,ầ,Ầ,ậ,Ậ,ẩ,Ẩ,ẫ,Ẫ,é,É,è,È,ẹ,Ẹ,ẻ,Ẻ,ẽ,Ẽ".split(",")
es1 = "e,E,é,É,è,È,ẹ,Ẹ,ẻ,Ẻ,ẽ,Ẽ".split(",");
eb1 = "ê,Ê,ế,Ế,ề,Ề,ệ,Ệ,ể,Ể,ễ,Ễ".split(",")
arA = "á,à,ả,ã,ạ,a,Á,À,Ả,Ã,Ạ,A".split(',');
mocrA = "ó,ò,ỏ,õ,ọ,o,ú,ù,ủ,ũ,ụ,u,Ó,Ò,Ỏ,Õ,Ọ,O,Ú,Ù,Ủ,Ũ,Ụ,U".split(',');
erA = "é,è,ẻ,ẽ,ẹ,e,É,È,Ẻ,Ẽ,Ẹ,E".split(',');
orA = "ó,ò,ỏ,õ,ọ,o,Ó,Ò,Ỏ,Õ,Ọ,O".split(',')
aA = "ấ,ầ,ẩ,ẫ,ậ,â,Ấ,Ầ,Ẩ,Ẫ,Ậ,Â".split(',');
mocA = "ớ,ờ,ở,ỡ,ợ,ơ,ứ,ừ,ử,ữ,ự,ư,Ớ,Ờ,Ở,Ỡ,Ợ,Ơ,Ứ,Ừ,Ử,Ữ,Ự,Ư".split(',');
trangA = "ắ,ằ,ẳ,ẵ,ặ,ă,Ắ,Ằ,Ẳ,Ẵ,Ặ,Ă".split(',');
eA = "ế,ề,ể,ễ,ệ,ê,Ế,Ề,Ể,Ễ,Ệ,Ê".split(',');
oA = "ố,ồ,ổ,ỗ,ộ,ô,Ố,Ồ,Ổ,Ỗ,Ộ,Ô".split(',')

function notWord(w) {
	var str = "\ \r\n#,\\;.:-_()<>+-*/=?!\"$%{}[]\'~|^\@\&\t" + fcc(160)
	return (str.indexOf(w) >= 0)
}

function nan(w) {
	if ((isNaN(w)) || (w == 'e')) return true
	else
	return false
}

function mozGetText(obj) {
	var v, pos, w = "";
	g = 1
	v = (obj.data) ? obj.data : obj.value
	if (v.length <= 0) return false
	if (!obj.data) {
		if (!obj.setSelectionRange) return false
		pos = obj.selectionStart
	} else pos = obj.pos
	if (obj.selectionStart != obj.selectionEnd) return new Array("", pos)
	while (1) {
		if (pos - g < 0) break
		else if (notWord(v.substr(pos - g, 1))) {
			if (v.substr(pos - g, 1) == "\\") w = v.substr(pos - g, 1) + w;
			break
		} else w = v.substr(pos - g, 1) + w;
		g++
	}
	return new Array(w, pos)
}

function start(obj, key) {
	var w = "",
		nnc;
	oc = obj;
	uni2 = false
	if (method == 0) {
		uni = "D,A,E,O,W,W".split(',');
		uni2 = "9,6,6,6,7,8".split(',');
		D2 = "DAWEO6789"
	} else if (method == 1) {
		uni = "D,A,E,O,W,W".split(',');
		D2 = "DAWEO"
	} else if (method == 2) {
		uni = "9,6,6,6,7,8".split(',');
		D2 = "6789"
	} else if (method == 3) {
		uni = "D,^,^,^,+,(".split(',');
		D2 = "D^+("
	} else if (method == 4) {
		uni = "D,^,^,^,*,(".split(',');
		D2 = "D^*("
	}
	if (!is_ie) {
		key = fcc(key.which)
		w = mozGetText(obj)
		if (D2.indexOf(up(key)) >= 0) nnc = true
		else nnc = false
		if ((!w) || (obj.sel)) return
		main(w[0], key, w[1], uni, nnc)
		if (!dockspell) w = mozGetText(obj)
		if ((w) && (uni2) && (!changed)) main(w[0], key, w[1], uni2, nnc)
	} else {
		obj = ieGetText(obj)
		if (obj) {
			var sT = obj.cW.text
			w = main(obj.cW.text, key, 0, uni, false)
			if ((uni2) && ((w == sT) || (typeof(w) == 'undefined'))) w = main(obj.cW.text, key, 0, uni2, false)
			if (w) obj.cW.text = w
		}
	}
	if (D2.indexOf(up(key)) >= 0) {
		if (!is_ie) {
			w = mozGetText(obj)
			if (!w) return
			normC(w[0], key, w[1])
		} else if (typeof(obj) == "object") {
			obj = ieGetText(obj)
			if (obj) {
				w = obj.cW.text
				if (!changed) {
					w += key;
					changed = true
				}
				obj.cW.text = w
				w = normC(w, key, 0)
				if (w) {
					obj = ieGetText(obj);
					obj.cW.text = w
				}
			}
		}
	}
}

function ieGetText(obj) {
	var caret = obj.document.selection.createRange(),
		w = ""
		if (caret.text) caret.text = ""
		else {
			while (1) {
				caret.moveStart("character", -1)
				if (w.length == caret.text.length) break
				w = caret.text
				if (notWord(w.charAt(0))) {
					if (w.charCodeAt(0) == 13) w = w.substr(2)
					else if (w.charAt(0) != "\\") w = w.substr(1)
					break
				}
			}
		}
		if (w.length) {
			caret.collapse(false)
			caret.moveStart("character", -w.length)
			obj.cW = caret.duplicate()
			return obj
		} else
		return false
}

function ie_replaceChar(w, pos, c) {
	var r = "",
		uc = 0
		if (isNaN(c)) uc = up(c)
		if ((whit) && (up(w.substr(w.length - pos - 1, 1)) == 'U') && (pos != 1) && (up(w.substr(w.length - pos - 2, 1)) != 'Q')) {
			whit = false
			if ((up(unV(fcc(c))) == "Ơ") || (uc == "O")) {
				if (w.substr(w.length - pos - 1, 1) == 'u') r = fcc(432)
				else r = fcc(431)
			}
			if (uc == "O") {
				if (c == "o") c = 417
				else c = 416
			}
		}
		if (!isNaN(c)) {
			changed = true;
			r += fcc(c)
			return w.substr(0, w.length - pos - r.length + 1) + r + w.substr(w.length - pos + 1)
		} else
		return w.substr(0, w.length - pos) + c + w.substr(w.length - pos + 1)
}

function tr(k, w, by, sf, i) {
	var r, pos = findC(w, k, sf)
	if (pos) {
		if (pos[1]) {
			if (is_ie) return ie_replaceChar(w, pos[0], pos[1])
			else
			return replaceChar(oc, i - pos[0], pos[1])
		} else {
			var c, pC = w.substr(w.length - pos, 1),
				cmp;
			r = sf
			for (g = 0; g < r.length; g++) {
				if ((nan(r[g])) || (r[g] == "e")) cmp = pC
				else cmp = pC.charCodeAt(0)
				if (cmp == r[g]) {
					if (!nan(by[g])) c = by[g]
					else c = by[g].charCodeAt(0)
					if (is_ie) return ie_replaceChar(w, pos, c)
					else
					return replaceChar(oc, i - pos, c)
				}
			}
		}
	}
	return false
}

function main(w, k, i, a, nnc) {
	var uk = up(k),
		bya = new Array(db1, ab1, eb1, ob1, mocb1, trangb1),
		got = false,
		t = "d,D,a,A,a,A,o,O,u,U,e,E,o,O".split(",")
		var sfa = new Array(ds1, as1, es1, os1, mocs1, trangs1),
		by = new Array(),
		sf = new Array()
		if ((method == 2) || ((method == 0) && (a[0] == "9"))) {
			DAWEO = "6789";
			SFJRX = "12534";
			S = "1";
			F = "2";
			J = "5";
			R = "3";
			X = "4";
			Z = "0";
			D = "9";
			FRX = "234";
			AEO = "6";
			moc = "7";
			trang = "8";
			them = "678";
			A = "^";
			E = "^";
			O = "^"
		} else if (method == 3) {
			DAWEO = "^+(D";
			SFJRX = "'`.?~";
			S = "'";
			F = "`";
			J = ".";
			R = "?";
			X = "~";
			Z = "-";
			D = "D";
			FRX = "`?~";
			AEO = "^";
			moc = "+";
			trang = "(";
			them = "^+(";
			A = "^";
			E = "^";
			O = "^"
		} else if (method == 4) {
			DAWEO = "^*(D";
			SFJRX = "'`.?~";
			S = "'";
			F = "`";
			J = ".";
			R = "?";
			X = "~";
			Z = "-";
			D = "D";
			FRX = "`?~";
			AEO = "^";
			moc = "*";
			trang = "(";
			them = "^*(";
			A = "^";
			E = "^";
			O = "^"
		} else if ((method == 1) || ((method == 0) && (a[0] == "D"))) {
			SFJRX = "SFJRX";
			DAWEO = "DAWEO";
			D = 'D';
			S = 'S';
			F = 'F';
			J = 'J';
			R = 'R';
			X = 'X';
			Z = 'Z';
			FRX = "FRX";
			them = "AOEW";
			trang = "W";
			moc = "W";
			A = "A";
			E = "E";
			O = "O"
		}
		if (SFJRX.indexOf(uk) >= 0) {
			var ret = sr(w, k, i);
			got = true
			if (ret) return ret
		} else if (uk == Z) {
			sf = repSign(null)
			for (h = 0; h < english.length; h++) {
				sf[sf.length] = lowen.charCodeAt(h)
				sf[sf.length] = english.charCodeAt(h)
			}
			for (h = 0; h < 5; h++) for (g = 0; g < skey.length; g++) by[by.length] = skey[g]
			for (h = 0; h < t.length; h++) by[by.length] = t[h]
			got = true
		} else
		for (h = 0; h < a.length; h++) if (a[h] == uk) {
			got = true;
			by = by.concat(bya[h]);
			sf = sf.concat(sfa[h])
		}
		if (uk == moc) whit = true;
	if (!got) {
		if (nnc) return
		return normC(w, k, i)
	}
	return DAWEOZ(k, w, by, sf, i, uk)
}

function DAWEOZ(k, w, by, sf, i, uk) {
	if ((DAWEO.indexOf(uk) >= 0) || (Z.indexOf(uk) >= 0)) return tr(k, w, by, sf, i)
}

function normC(w, k, i) {
	var uk = up(k),
		u = repSign(null),
		fS, c, j, space = (k.charCodeAt(0) == 32) ? true : false
		if ((!is_ie) && (space)) return
		for (j = 1; j <= w.length; j++) {
			for (h = 0; h < u.length; h++) {
				if (u[h] == w.charCodeAt(w.length - j)) {
					if (h <= 23) fS = S
					else if (h <= 47) fS = F
					else if (h <= 71) fS = J
					else if (h <= 95) fS = R
					else fS = X
					c = skey[h % 24];
					if ((alphabet.indexOf(uk) < 0) && (D2.indexOf(uk) < 0)) return w;
					w = unV(w)
					if ((!space) && (!changed)) w += k
					if (!is_ie) {
						var sp = oc.selectionStart,
							pos = sp
							if (!changed) {
								var sst = oc.scrollTop;
								pos += k.length
								if (!oc.data) {
									oc.value = oc.value.substr(0, sp) + k + oc.value.substr(oc.selectionEnd);
									changed = true;
									oc.scrollTop = sst
								} else {
									oc.insertData(oc.pos, k);
									oc.pos++;
									range.setEnd(oc, oc.pos);
									specialChange = true
								}
							}
							if (!oc.data) oc.setSelectionRange(pos, pos)
							if (!ckspell(w, fS)) {
								replaceChar(oc, i - j, c)
								if (!oc.data) {
									var a = new Array(D)
									main(w, fS, pos, a, false)
								} else {
									var ww = mozGetText(oc)
									var a = new Array(D)
									main(ww[0], fS, ww[1], a, false)
								}
							}
					} else {
						var ret = sr(w, fS, 0)
						if ((space) && (ret)) ret += fcc(32)
						if (ret) return ret
					}
				}
			}
		}
}

function nospell(w, k) {
	return false
}

function ckspell(w, k) {
	w = unV(w);
	var exc = "UOU,IEU".split(','),
		z, next = true,
		noE = "UU,UOU,UOI,IEU,AO,IA,AI,AY,AU,AO".split(','),
		noBE = "YEU",
		test, a, b
		var check = true,
		noM = "UE,UYE,IU,EU,UY".split(','),
		noMT = "AY,AU".split(','),
		noT = "UA",
		t = -1,
		notV2 = "IAO"
		var uw = up(w),
		tw = uw,
		update = false,
		gi = "IO",
		noAOEW = "OE,OO,AO,EO,IA,AI".split(','),
		noAOE = "OA"
		var notViet = "AA,AE,EE,OU,YY,YI,IY,EY,EA,EI,II,IO,YO,YA,OOO".split(','),
		uk = up(k),
		twE, uw2 = unV2(uw)
		var vSConsonant = "B,C,D,G,H,K,L,M,N,P,Q,R,S,T,V,X".split(','),
		vDConsonant = "CH,GI,KH,NGH,GH,NG,NH,PH,QU,TH,TR".split(',')
		var vDConsonantE = "CH,NG,NH".split(','),
		sConsonant = "C,P,T,CH".split(','),
		vSConsonantE = "C,M,N,P,T".split(',')
		var noNHE = "O,U,IE,Ô,Ơ,Ư,IÊ,Ă,Â,UYE,UYÊ,UO,ƯƠ,ƯO,UƠ,UA,ƯA,OĂ,OE,OÊ".split(','),
		oMoc = "UU,UOU".split(',')
		if (FRX.indexOf(uk) >= 0) for (a = 0; a < sConsonant.length; a++) if (uw.substr(uw.length - sConsonant[a].length, sConsonant[a].length) == sConsonant[a]) return true
		for (a = 0; a < uw.length; a++) {
			if ("FJZW1234567890".indexOf(uw.substr(a, 1)) >= 0) return true
			for (b = 0; b < notViet.length; b++) {
				if (uw2.substr(a, notViet[b].length) == notViet[b]) {
					for (z = 0; z < exc.length; z++) if (uw2.indexOf(exc[z]) >= 0) next = false
					if ((next) && ((gi.indexOf(notViet[b]) < 0) || (a <= 0) || (uw2.substr(a - 1, 1) != 'G'))) return true
				}
			}
		}
		for (b = 0; b < vDConsonant.length; b++) if (tw.indexOf(vDConsonant[b]) == 0) {
			tw = tw.substr(vDConsonant[b].length);
			update = true;
			t = b;
			break
		}
		if (!update) for (b = 0; b < vSConsonant.length; b++) if (tw.indexOf(vSConsonant[b]) == 0) {
			tw = tw.substr(1);
			break
		}
		update = false;
	twE = tw
	for (b = 0; b < vDConsonantE.length; b++) {
		if (tw.substr(tw.length - vDConsonantE[b].length) == vDConsonantE[b]) {
			tw = tw.substr(0, tw.length - vDConsonantE[b].length)
			if (b == 2) {
				for (z = 0; z < noNHE.length; z++) if (tw == noNHE[z]) return true
				if ((uk == trang) && ((tw == "OA") || (tw == "A"))) return true
			}
			update = true;
			break
		}
	}
	if (!update) for (b = 0; b < vSConsonantE.length; b++) if (tw.substr(tw.length - 1) == vSConsonantE[b]) {
		tw = tw.substr(0, tw.length - 1);
		break
	}
	if (tw) {
		for (a = 0; a < vDConsonant.length; a++) {
			for (b = 0; b < tw.length; b++) {
				if (tw.substr(b, vDConsonant[a].length) == vDConsonant[a]) return true
			}
		}
		for (a = 0; a < vSConsonant.length; a++) {
			if (tw.indexOf(vSConsonant[a]) >= 0) return true
		}
	}
	test = tw.substr(0, 1)
	if ((t == 3) && ((test == "A") || (test == "O") || (test == "U") || (test == "Y"))) return true
	if ((t == 5) && ((test == "E") || (test == "I") || (test == "Y"))) return true
	uw2 = unV2(tw)
	if (uw2 == notV2) return true
	if (tw != twE) for (z = 0; z < noE.length; z++) if (uw2 == noE[z]) return true
	if ((tw != uw) && (uw2 == noBE)) return true
	if (uk != moc) for (z = 0; z < oMoc.length; z++) if (tw == oMoc[z]) return true
	if ((uw2.indexOf('UYE') > 0) && (uk == 'E')) check = false
	if ((them.indexOf(uk) >= 0) && (check)) {
		for (a = 0; a < noAOEW.length; a++) if (uw2.indexOf(noAOEW[a]) >= 0) return true
		if (uk != trang) if (uw2 == noAOE) return true
		if ((uk == trang) && (trang != 'W')) if (uw2 == noT) return true
		if (uk == moc) for (a = 0; a < noM.length; a++) if (uw2 == noM[a]) return true
		if ((uk == moc) || (uk == trang)) for (a = 0; a < noMT.length; a++) if (uw2 == noMT[a]) return true
	}
	tw5 = tw
	if ((uw2.charCodeAt(0) == 272) || (uw2.charCodeAt(0) == 273)) {
		if (uw2.length > 4) return true
	} else if (uw2.length > 3) return true
	return false
}

function DAWEOF(cc, k) {
	var ret = new Array(),
		kA = new Array(A, moc, trang, E, O),
		z, a;
	ret[0] = g
	var ccA = new Array(aA, mocA, trangA, eA, oA),
		ccrA = new Array(arA, mocrA, arA, erA, orA)
		for (a = 0; a < kA.length; a++) if (k == kA[a]) for (z = 0; z < ccA[a].length; z++) if (cc == ccA[a][z]) ret[1] = ccrA[a][z]
		if (ret[1]) return ret
		else
		return false
}

function findC(w, k, sf) {
	if (((method == 3) || (method == 4)) && (w.substr(w.length - 1, 1) == "\\")) return new Array(1, k.charCodeAt(0))
	var str = "",
		res, cc = "",
		pc = "",
		tE = "",
		vowA = new Array(),
		s = "ÂĂÊÔƠƯêâăơôư",
		c = 0,
		dn = false,
		uw = up(w),
		tv
		var DAWEOFA = aA.join() + eA.join() + mocA.join() + trangA.join() + oA.join() + english;
	DAWEOFA = up(DAWEOFA)
	for (g = 0; g < sf.length; g++) {
		if (nan(sf[g])) str += sf[g]
		else str += fcc(sf[g])
	}
	var uk = up(k),
		i = w.length,
		uni_array = repSign(k),
		w2 = up(unV2(unV(w))),
		dont = "ƯA,ƯU".split(',')
		if (DAWEO.indexOf(uk) >= 0) {
			if (uk == moc) {
				if ((w2.indexOf("UU") >= 0) && (tw5 != dont[1])) {
					if (w2.indexOf("UU") == (w.length - 2)) res = 2
					else
					return false
				} else if (w2.indexOf("UOU") >= 0) {
					if (w2.indexOf("UOU") == (w.length - 3)) res = 2
					else
					return false
				}
			}
			if (!res) {
				for (g = 1; g <= w.length; g++) {
					cc = w.substr(w.length - g, 1)
					pc = up(w.substr(w.length - g - 1, 1))
					uc = up(cc)
					for (h = 0; h < dont.length; h++) if ((tw5 == dont[h]) && (tw5 == unV(pc + uc))) dn = true
					if (dn) {
						dn = false;
						continue
					}
					if (str.indexOf(uc) >= 0) {
						if (((uk == moc) && (unV(uc) == "U") && (up(unV(w.substr(w.length - g + 1, 1))) == "A")) || ((uk == trang) && (unV(uc) == 'A') && (unV(pc) == 'U'))) {
							if (unV(uc) == "U") tv = 1
							else tv = 2
							ccc = up(w.substr(w.length - g - tv, 1))
							if (ccc != "Q") res = g + tv - 1
							else if (uk == trang) res = g
							else if (moc != trang) return false
						} else res = g
						if ((!whit) || (uw.indexOf("Ư") < 0) || (uw.indexOf("W") < 0)) break
					} else if (DAWEOFA.indexOf(uc) >= 0) {
						if (uk == D) {
							if (cc == "đ") res = new Array(g, 'd')
							else if (cc == "Đ") res = new Array(g, 'D')
						} else res = DAWEOF(cc, uk)
						if (res) break
					}
				}
			}
		}
		if ((uk != Z) && (DAWEO.indexOf(uk) < 0)) {
			var tEC = retKC(uk);
			for (g = 0; g < tEC.length; g++) tE += fcc(tEC[g])
		}
		for (g = 1; g <= w.length; g++) {
			if (DAWEO.indexOf(uk) < 0) {
				cc = up(w.substr(w.length - g, 1))
				pc = up(w.substr(w.length - g - 1, 1))
				if (str.indexOf(cc) >= 0) {
					if (cc == 'U') {
						if (pc != 'Q') {
							c++;
							vowA[vowA.length] = g
						}
					} else if (cc == 'I') {
						if ((pc != 'G') || (c <= 0)) {
							c++;
							vowA[vowA.length] = g
						}
					} else {
						c++;
						vowA[vowA.length] = g
					}
				} else if (uk != Z) {
					for (h = 0; h < uni_array.length; h++) if (uni_array[h] == w.charCodeAt(w.length - g)) {
						if (spellerr(w, k)) return false
						return new Array(g, tEC[h % 24])
					}
					for (h = 0; h < tEC.length; h++) if (tEC[h] == w.charCodeAt(w.length - g)) return new Array(g, fcc(skey[h]))
				}
			}
		}
		if ((uk != Z) && (typeof(res) != 'object')) if (spellerr(w, k)) return false
		if (DAWEO.indexOf(uk) < 0) {
			for (g = 1; g <= w.length; g++) {
				if ((uk != Z) && (s.indexOf(w.substr(w.length - g, 1)) >= 0)) return g
				else if (tE.indexOf(w.substr(w.length - g, 1)) >= 0) {
					for (h = 0; h < tEC.length; h++) {
						if (w.substr(w.length - g, 1).charCodeAt(0) == tEC[h]) return new Array(g, fcc(skey[h]))
					}
				}
			}
		}
		if (res) return res
		if ((c == 1) || (uk == Z)) return vowA[0]
		else if (c == 2) {
			var v = 2
			if (w.substr(w.length - 1) == " ") v = 3
			var ttt = up(w.substr(w.length - v, 2))
			if ((dauCu == 0) && ((ttt == "UY") || (ttt == "OA") || (ttt == "OE"))) return vowA[0]
			var c2 = 0,
				fdconsonant, sc = "BCD" + fcc(272) + "GHKLMNPQRSTVX",
				dc = "CH,GI,KH,NGH,GH,NG,NH,PH,QU,TH,TR".split(',')
				for (h = 1; h <= w.length; h++) {
					fdconsonant = false
					for (g = 0; g < dc.length; g++) {
						if (up(w.substr(w.length - h - dc[g].length + 1, dc[g].length)).indexOf(dc[g]) >= 0) {
							c2++;
							fdconsonant = true
							if (dc[g] != 'NGH') h++
							else h += 2
						}
					}
					if (!fdconsonant) {
						if (sc.indexOf(up(w.substr(w.length - h, 1))) >= 0) c2++
						else
						break
					}
				}
				if ((c2 == 1) || (c2 == 2)) return vowA[0]
				else
				return vowA[1]
		} else if (c == 3) return vowA[1]
		else
		return false
}

function unV(w) {
	var u = repSign(null),
		b, a
		for (a = 1; a <= w.length; a++) {
			for (b = 0; b < u.length; b++) {
				if (u[b] == w.charCodeAt(w.length - a)) {
					w = w.substr(0, w.length - a) + fcc(skey[b % 24]) + w.substr(w.length - a + 1)
				}
			}
		}
		return w
}

function unV2(w) {
	var a, b
	for (a = 1; a <= w.length; a++) {
		for (b = 0; b < skey.length; b++) {
			if (skey[b] == w.charCodeAt(w.length - a)) w = w.substr(0, w.length - a) + skey2[b] + w.substr(w.length - a + 1)
		}
	}
	return w
}

function repSign(k) {
	var t = new Array(),
		u = new Array(),
		a, b
		for (a = 0; a < 5; a++) {
			if ((k == null) || (SFJRX.substr(a, 1) != up(k))) {
				t = retKC(SFJRX.substr(a, 1))
				for (b = 0; b < t.length; b++) u[u.length] = t[b]
			}
		}
		return u
}

function sr(w, k, i) {
	var sf = getSF()
	pos = findC(w, k, sf)
	if (pos) {
		if (pos[1]) {
			if (!is_ie) replaceChar(oc, i - pos[0], pos[1])
			else
			return ie_replaceChar(w, pos[0], pos[1])
		} else {
			var c = retUni(w, k, pos)
			if (!is_ie) replaceChar(oc, i - pos, c)
			else
			return ie_replaceChar(w, pos, c)
		}
	}
	return false
}

function retUni(w, k, pos) {
	var u = retKC(up(k)),
		uC, lC, c = w.charCodeAt(w.length - pos),
		a
		for (a = 0; a < skey.length; a++) if (skey[a] == c) {
			if (a < 12) {
				lC = a;
				uC = a + 12
			} else {
				lC = a - 12;
				uC = a
			}
			t = fcc(c);
			if (t != up(t)) return u[lC]
			return u[uC]
		}
}

function replaceChar(o, pos, c) {
	var bb = false;
	if (!nan(c)) {
		var replaceBy = fcc(c),
			wfix = up(unV(fcc(c)));
		changed = true
	} else {
		var replaceBy = c;
		if ((up(c) == "O") && (whit)) bb = true
	}
	if (!o.data) {
		var savePos = o.selectionStart,
			sst = o.scrollTop
			if ((up(o.value.substr(pos - 1, 1)) == 'U') && (pos < savePos - 1) && (up(o.value.substr(pos - 2, 1)) != 'Q')) {
				if ((wfix == "Ơ") || (bb)) {
					if (o.value.substr(pos - 1, 1) == 'u') var r = fcc(432)
					else
					var r = fcc(431)
				}
				if (bb) {
					changed = true;
					if (c == "o") replaceBy = "ơ"
					else replaceBy = "Ơ"
				}
			}
			o.value = o.value.substr(0, pos) + replaceBy + o.value.substr(pos + 1)
			if (r) o.value = o.value.substr(0, pos - 1) + r + o.value.substr(pos)
			o.setSelectionRange(savePos, savePos);
		o.scrollTop = sst
	} else {
		if ((up(o.data.substr(pos - 1, 1)) == 'U') && (pos < o.pos - 1)) {
			if ((wfix == "Ơ") || (bb)) {
				if (o.data.substr(pos - 1, 1) == 'u') var r = fcc(432)
				else
				var r = fcc(431)
			}
			if (bb) {
				changed = true;
				if (c == "o") replaceBy = "ơ"
				else replaceBy = "Ơ"
			}
		}
		o.deleteData(pos, 1);
		o.insertData(pos, replaceBy)
		if (r) {
			o.deleteData(pos - 1, 1);
			o.insertData(pos - 1, r)
		}
	}
	if (whit) whit = false
}

function retKC(k) {
	if (k == S) return new Array(225, 7845, 7855, 233, 7871, 237, 243, 7889, 7899, 250, 7913, 253, 193, 7844, 7854, 201, 7870, 205, 211, 7888, 7898, 218, 7912, 221)
	if (k == F) return new Array(224, 7847, 7857, 232, 7873, 236, 242, 7891, 7901, 249, 7915, 7923, 192, 7846, 7856, 200, 7872, 204, 210, 7890, 7900, 217, 7914, 7922)
	if (k == J) return new Array(7841, 7853, 7863, 7865, 7879, 7883, 7885, 7897, 7907, 7909, 7921, 7925, 7840, 7852, 7862, 7864, 7878, 7882, 7884, 7896, 7906, 7908, 7920, 7924)
	if (k == R) return new Array(7843, 7849, 7859, 7867, 7875, 7881, 7887, 7893, 7903, 7911, 7917, 7927, 7842, 7848, 7858, 7866, 7874, 7880, 7886, 7892, 7902, 7910, 7916, 7926)
	if (k == X) return new Array(227, 7851, 7861, 7869, 7877, 297, 245, 7895, 7905, 361, 7919, 7929, 195, 7850, 7860, 7868, 7876, 296, 213, 7894, 7904, 360, 7918, 7928)
}

function getEL(id) {
	return document.getElementById(id)
}

function getSF() {
	var sf = new Array(),
		x;
	for (x = 0; x < skey.length; x++) sf[sf.length] = fcc(skey[x]);
	return sf
}

function statusMessage() {
	var str = 'Kiểu gõ: '
	if (on_off == 0) str += 'Tắt'
	else if (method == 1) str += 'TELEX'
	else if (method == 2) str += 'VNI'
	else if (method == 3) str += 'VIQR'
	else if (method == 4) str += 'VIQR*'
	else if (method == 0) str += 'Tự động'
	if (isKHTML) str += " [Alt-F9]"
	else str += " [F9]"
	str += " | Chính tả: "
	str += (dockspell == 0) ? "Tắt" : "Bật"
	if (isKHTML) str += " [Alt-F8]"
	else str += " [F8]"
	str += " | Bỏ dấu: "
	str += (dauCu == 1) ? "Cũ" : "Mới"
	if (isKHTML) str += " [Alt-F7]"
	else str += " [F7]"
	str += " | Bật/Tắt [F12] - AVIM 20071102"
	window.status = str
}

function updateInfo() {
	setCookie();
	if (support) statusMessage()
}

function setMethod(m) {
	if (m == -1) {
		on_off = 0;
		if (getEL(radioID[5])) getEL(radioID[5]).checked = true
	} else {
		on_off = 1;
		method = m;
		if (getEL(radioID[m])) getEL(radioID[m]).checked = true
	}
	setSpell(dockspell);
	setDauCu(dauCu);
	updateInfo()
}

function setDauCu(box) {
	if (typeof(box) == "number") {
		dauCu = box;
		if (getEL(radioID[7])) getEL(radioID[7]).checked = box
	} else dauCu = (box.checked) ? 1 : 0
	updateInfo()
}

function setSpell(box) {
	if (typeof(box) == "number") {
		spellerr = (box == 1) ? ckspell : nospell
		if (getEL(radioID[6])) getEL(radioID[6]).checked = box
	} else {
		if (box.checked) {
			spellerr = ckspell;
			dockspell = 1
		} else {
			spellerr = nospell;
			dockspell = 0
		}
	}
	updateInfo()
}

function onKeyDown(e) {
	if (e == 'iframe') {
		frame = findF();
		var key = frame.event.keyCode
	} else
	var key = (!is_ie) ? e.which : window.event.keyCode
	if ((key == 120) || (key == 123) || (key == 119) || (key == 118)) {
		if (key == 120) {
			on_off = 1;
			setMethod(((method == 4) ? 0 : ++method))
		} else if (key == 118) {
			setDauCu(((dauCu == 1) ? 0 : 1))
		} else if (key == 119) {
			dockspell = (dockspell == 0) ? 1 : 0;
			setSpell(dockspell)
		} else if (key == 123) {
			on_off = (on_off == 0) ? 1 : 0
			if (on_off == 0) setMethod(-1)
			else setMethod(method)
		}
		updateInfo()
	}
}

function ifInit(w) {
	var sel = w.getSelection()
	range = sel ? sel.getRangeAt(0) : document.createRange()
}

function ifMoz(e) {
	var code = e.which,
		cwi = e.target.parentNode.wi
		if (typeof(cwi) == "undefined") cwi = e.target.parentNode.parentNode.wi
		if ((e.ctrlKey) || ((e.altKey) && (code != 92) && (code != 126))) return;
	ifInit(cwi)
	var node = range.endContainer,
		newPos;
	sk = fcc(code);
	saveStr = ""
	if (checkCode(code) || (!range.startOffset) || (typeof(node.data) == 'undefined')) return;
	node.sel = false
	if (node.data) {
		saveStr = node.data.substr(range.endOffset)
		if (range.startOffset != range.endOffset) node.sel = true
		node.deleteData(range.startOffset, node.data.length)
	}
	range.setEnd(node, range.endOffset)
	range.setStart(node, 0)
	if (!node.data) return
	node.value = node.data;
	node.pos = node.data.length;
	node.which = code
	start(node, e)
	node.insertData(node.data.length, saveStr)
	newPos = node.data.length - saveStr.length + kl
	range.setEnd(node, newPos);
	range.setStart(node, newPos);
	kl = 0
	if (specialChange) {
		specialChange = false;
		changed = false;
		node.deleteData(node.pos - 1, 1)
	}
	if (changed) {
		changed = false;
		e.preventDefault()
	}
}

function FKeyPress() {
	var obj = findF()
	sk = fcc(obj.event.keyCode)
	if (checkCode(obj.event.keyCode) || ((obj.event.ctrlKey) && (obj.event.keyCode != 92) && (obj.event.keyCode != 126))) return
	start(obj, fcc(obj.event.keyCode))
	if (changed) {
		changed = false;
		return false
	}
}

function checkCode(code) {
	if (((on_off == 0) || ((code < 45) && (code != 42) && (code != 32) && (code != 39) && (code != 40) && (code != 43)) || (code == 145) || (code == 255))) return true;
	return false
}

function fcc(x) {
	return String.fromCharCode(x)
}
if (useCookie == 1) {
	setCookie = doSetCookie;
	getCookie = doGetCookie
} else {
	setCookie = noCookie;
	getCookie = noCookie
}

function noCookie() {}

function doSetCookie() {
	var exp = new Date(11245711156480).toGMTString(),
		end = ';expires=' + exp + ';path=/'
		document.cookie = 'AVIM_on_off=' + on_off + end
		document.cookie = 'AVIM_method=' + method + end
		document.cookie = 'AVIM_ckspell=' + dockspell + end
		document.cookie = 'AVIM_daucu=' + dauCu + end
}

function doGetCookie() {
	var ck = document.cookie,
		res = /AVIM_method/.test(ck)
		if ((!res) || (ck.indexOf('AVIM_ckspell') < 0)) {
			setCookie();
			return
		}
		var p, ckA = ck.split(';')
	for (var i = 0; i < ckA.length; i++) {
		p = ckA[i].split('=');
		p[0] = p[0].replace(/^\s+/g, "");
		p[1] = parseInt(p[1])
		if (p[0] == 'AVIM_on_off') on_off = p[1]
		else if (p[0] == 'AVIM_method') method = p[1]
		else if (p[0] == 'AVIM_ckspell') {
			if (p[1] == 0) {
				dockspell = 0;
				spellerr = nospell
			} else {
				dockspell = 1;
				spellerr = ckspell
			}
		} else if (p[0] == 'AVIM_daucu') dauCu = parseInt(p[1])
	}
}
if (!is_ie) {
	if (agt.indexOf("opera") >= 0) {
		operaV = agt.split(" ");
		operaVersion = parseInt(operaV[operaV.length - 1])
		if (operaVersion >= 8) is_opera = true
		else {
			operaV = operaV[0].split("/");
			operaVersion = parseInt(operaV[1])
			if (operaVersion >= 8) is_opera = true
		}
	} else if (agt.indexOf("khtml") >= 0) isKHTML = true
	else {
		ver = agt.substr(agt.indexOf("rv:") + 3)
		ver = parseFloat(ver.substr(0, ver.indexOf(" ")))
		if (agt.indexOf("mozilla") < 0) ver = 0
	}
}

function up(w) {
	w = w.toUpperCase()
	if (isKHTML) {
		str = "êôơâăưếốớấắứềồờầằừễỗỡẫẵữệộợậặự", rep = "ÊÔƠÂĂƯẾỐỚẤẮỨỀỒỜẦẰỪỄỖỠẪẴỮỆỘỢẶỰ"
		for (z = 0; z < w.length; z++) {
			io = str.indexOf(w.substr(z, 1))
			if (io >= 0) w = w.substr(0, z) + rep.substr(io, 1) + w.substr(z + 1)
		}
	}
	return w
}

function findIgnore(el) {
	for (i = 0; i < va.length; i++) if ((el.id == va[i]) && (va[i].length > 0)) return true
}
if ((is_ie) || (ver >= 1.3) || (is_opera) || (isKHTML)) {
	getCookie()
	if (on_off == 0) setMethod(-1)
	else setMethod(method)
	setSpell(dockspell);
	setDauCu(dauCu);
	statusMessage()
} else support = false

function onKeyPress(e) {
	if (!support) return
	if (!is_ie) {
		var el = e.target,
			code = e.which;
		if (e.ctrlKey) return;
		if ((e.altKey) && (code != 92) && (code != 126)) return
	} else {
		var el = window.event.srcElement,
			code = window.event.keyCode;
		if ((event.ctrlKey) && (code != 92) && (code != 126)) return
	}
	if (((el.type != 'textarea') && (el.type != 'text')) || checkCode(code)) return
	sk = fcc(code);
	if (findIgnore(el)) return
	if (!is_ie) start(el, e)
	else start(el, sk)
	if (changed) {
		changed = false
		if (!is_ie) e.preventDefault()
		else
		return false
	}
}

function attachEvt(obj, evt, handle, capture) {
	if (is_ie) {
		obj.attachEvent("on" + evt, handle);
		obj.attachEvent("on" + evt, getCookie)
	} else {
		obj.addEventListener(evt, handle, capture);
		obj.addEventListener(evt, getCookie, capture)
	}
}
attachEvt(document, "keydown", onKeyDown, false)
attachEvt(document, "keypress", onKeyPress, false)

function findF() {
	for (g = 0; g < fID.length; g++) {
		if (findIgnore(fID[g])) continue;
		frame = fID[g]
		if (typeof(frame) != "undefined") {
			try {
				if ((frame.contentWindow.document) && (frame.contentWindow.event) && (frame.contentWindow.document.designMode)) return frame.contentWindow
			} catch (e) {
				if ((frame.document) && (frame.event)) return frame
			}
		}
	}
}

function onKeyDownI() {
	onKeyDown("iframe")
}

function init() {
	var kkk = false
	if ((support) && (!isKHTML)) {
		if (is_opera) {
			if (operaVersion < 9) return
		}
		for (g = 0; g < fID.length; g++) {
			if (findIgnore(fID[g])) continue
			if (is_ie) {
				var doc
				try {
					frame = fID[g];
					if (typeof(frame) != "undefined") {
						if (frame.contentWindow.document) doc = frame.contentWindow.document
						else if (frame.document) doc = frame.document
					}
					if ((doc) && ((up(doc.designMode) == "ON") || (doc.body.contentEditable))) {
						for (l = 0; l < attached.length; l++) if (doc == attached[l]) {
							kkk = true;
							break
						}
						if (!kkk) {
							attached[attached.length] = doc
							attachEvt(doc, "keydown", onKeyDownI, false)
							attachEvt(doc, "keypress", FKeyPress, false)
						} else kkk = false
					}
				} catch (e) {}
			} else {
				var iframedit
				try {
					wi = fID[g].contentWindow;
					iframedit = wi.document;
					iframedit.wi = wi
					if ((iframedit) && (up(iframedit.designMode) == "ON")) {
						attachEvt(iframedit, "keypress", ifMoz, false)
						attachEvt(iframedit, "keydown", onKeyDown, true)
					}
				} catch (e) {}
			}
		}
	}
}

function uglyF() {
	ugly = 50;
	while (ugly < 5000) {
		setTimeout("init()", ugly);
		ugly += 50
	}
}
uglyF();
attachEvt(document, "mousedown", uglyF, false)