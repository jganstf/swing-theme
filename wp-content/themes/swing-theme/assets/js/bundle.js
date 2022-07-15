(function () {
	'use strict';

	/* ========================================================================
	 * DOM-based Routing
	 * Based on http://goo.gl/EUTi53 by Paul Irish
	 *
	 * Only fires on body classes that match. If a body class contains a dash,
	 * replace the dash with an underscore when adding it to the object below.
	 * ======================================================================== */

	// import camelCase from './camelCase';

	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	class Router {
		constructor(routes) {
			this.routes = routes;
		}

		fire(route, fn = 'init', args) {
			const fire = route !== '' &&
	      this.routes[route] &&
	      typeof this.routes[route][fn] === 'function';
			if (fire) {
				this.routes[route][fn](args);
			}
		}

		loadEvents() {
			// Fire common init JS
			this.fire('common');

			// Fire page-specific init JS, and then finalize JS
			document.body.className
				.toLowerCase()
				.replace(/-/g, '_')
				.split(/\s+/)
				.map(str =>
					`${str
					.charAt(0)
					.toLowerCase()}${str
					.replace(/[\W_]/g, '|')
					.split('|')
					.map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
					.join('')
					.slice(1)}`)
				.forEach(className => {
					this.fire(className);
					this.fire(className, 'finalize');
				});

			// Fire common finalize JS
			this.fire('common', 'finalize');
		}
	}

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	/*!
	 * GSAP 3.10.4
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	/* eslint-disable */
	var _config = {
	  autoSleep: 120,
	  force3D: "auto",
	  nullTargetWarn: 1,
	  units: {
	    lineHeight: ""
	  }
	},
	    _defaults = {
	  duration: .5,
	  overwrite: false,
	  delay: 0
	},
	    _suppressOverwrites,
	    _bigNum = 1e8,
	    _tinyNum = 1 / _bigNum,
	    _2PI = Math.PI * 2,
	    _HALF_PI = _2PI / 4,
	    _gsID = 0,
	    _sqrt = Math.sqrt,
	    _cos = Math.cos,
	    _sin = Math.sin,
	    _isString = function _isString(value) {
	  return typeof value === "string";
	},
	    _isFunction = function _isFunction(value) {
	  return typeof value === "function";
	},
	    _isNumber = function _isNumber(value) {
	  return typeof value === "number";
	},
	    _isUndefined = function _isUndefined(value) {
	  return typeof value === "undefined";
	},
	    _isObject = function _isObject(value) {
	  return typeof value === "object";
	},
	    _isNotFalse = function _isNotFalse(value) {
	  return value !== false;
	},
	    _windowExists = function _windowExists() {
	  return typeof window !== "undefined";
	},
	    _isFuncOrString = function _isFuncOrString(value) {
	  return _isFunction(value) || _isString(value);
	},
	    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
	    // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
	_isArray = Array.isArray,
	    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
	    //only numbers (including negatives and decimals) but NOT relative values.
	_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
	    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
	_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
	    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
	    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
	_relExp = /[+-]=-?[.\d]+/,
	    _delimitedValueExp = /[^,'"\[\]\s]+/gi,
	    // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
	_unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
	    _globalTimeline,
	    _win,
	    _coreInitted,
	    _doc,
	    _globals = {},
	    _installScope = {},
	    _coreReady,
	    _install = function _install(scope) {
	  return (_installScope = _merge(scope, _globals)) && gsap;
	},
	    _missingPlugin = function _missingPlugin(property, value) {
	  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
	},
	    _warn = function _warn(message, suppress) {
	  return !suppress && console.warn(message);
	},
	    _addGlobal = function _addGlobal(name, obj) {
	  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
	},
	    _emptyFunc = function _emptyFunc() {
	  return 0;
	},
	    _reservedProps = {},
	    _lazyTweens = [],
	    _lazyLookup = {},
	    _lastRenderedFrame,
	    _plugins = {},
	    _effects = {},
	    _nextGCFrame = 30,
	    _harnessPlugins = [],
	    _callbackNames = "",
	    _harness = function _harness(targets) {
	  var target = targets[0],
	      harnessPlugin,
	      i;
	  _isObject(target) || _isFunction(target) || (targets = [targets]);

	  if (!(harnessPlugin = (target._gsap || {}).harness)) {
	    // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
	    i = _harnessPlugins.length;

	    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

	    harnessPlugin = _harnessPlugins[i];
	  }

	  i = targets.length;

	  while (i--) {
	    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
	  }

	  return targets;
	},
	    _getCache = function _getCache(target) {
	  return target._gsap || _harness(toArray(target))[0]._gsap;
	},
	    _getProperty = function _getProperty(target, property, v) {
	  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
	},
	    _forEachName = function _forEachName(names, func) {
	  return (names = names.split(",")).forEach(func) || names;
	},
	    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
	_round = function _round(value) {
	  return Math.round(value * 100000) / 100000 || 0;
	},
	    _roundPrecise = function _roundPrecise(value) {
	  return Math.round(value * 10000000) / 10000000 || 0;
	},
	    // increased precision mostly for timing values.
	_parseRelative = function _parseRelative(start, value) {
	  var operator = value.charAt(0),
	      end = parseFloat(value.substr(2));
	  start = parseFloat(start);
	  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
	},
	    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
	  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
	  var l = toFind.length,
	      i = 0;

	  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

	  return i < l;
	},
	    _lazyRender = function _lazyRender() {
	  var l = _lazyTweens.length,
	      a = _lazyTweens.slice(0),
	      i,
	      tween;

	  _lazyLookup = {};
	  _lazyTweens.length = 0;

	  for (i = 0; i < l; i++) {
	    tween = a[i];
	    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
	  }
	},
	    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
	  _lazyTweens.length && _lazyRender();
	  animation.render(time, suppressEvents, force);
	  _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
	},
	    _numericIfPossible = function _numericIfPossible(value) {
	  var n = parseFloat(value);
	  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
	},
	    _passThrough = function _passThrough(p) {
	  return p;
	},
	    _setDefaults = function _setDefaults(obj, defaults) {
	  for (var p in defaults) {
	    p in obj || (obj[p] = defaults[p]);
	  }

	  return obj;
	},
	    _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
	  return function (obj, defaults) {
	    for (var p in defaults) {
	      p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
	    }
	  };
	},
	    _merge = function _merge(base, toMerge) {
	  for (var p in toMerge) {
	    base[p] = toMerge[p];
	  }

	  return base;
	},
	    _mergeDeep = function _mergeDeep(base, toMerge) {
	  for (var p in toMerge) {
	    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
	  }

	  return base;
	},
	    _copyExcluding = function _copyExcluding(obj, excluding) {
	  var copy = {},
	      p;

	  for (p in obj) {
	    p in excluding || (copy[p] = obj[p]);
	  }

	  return copy;
	},
	    _inheritDefaults = function _inheritDefaults(vars) {
	  var parent = vars.parent || _globalTimeline,
	      func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;

	  if (_isNotFalse(vars.inherit)) {
	    while (parent) {
	      func(vars, parent.vars.defaults);
	      parent = parent.parent || parent._dp;
	    }
	  }

	  return vars;
	},
	    _arraysMatch = function _arraysMatch(a1, a2) {
	  var i = a1.length,
	      match = i === a2.length;

	  while (match && i-- && a1[i] === a2[i]) {}

	  return i < 0;
	},
	    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
	  if (firstProp === void 0) {
	    firstProp = "_first";
	  }

	  if (lastProp === void 0) {
	    lastProp = "_last";
	  }

	  var prev = parent[lastProp],
	      t;

	  if (sortBy) {
	    t = child[sortBy];

	    while (prev && prev[sortBy] > t) {
	      prev = prev._prev;
	    }
	  }

	  if (prev) {
	    child._next = prev._next;
	    prev._next = child;
	  } else {
	    child._next = parent[firstProp];
	    parent[firstProp] = child;
	  }

	  if (child._next) {
	    child._next._prev = child;
	  } else {
	    parent[lastProp] = child;
	  }

	  child._prev = prev;
	  child.parent = child._dp = parent;
	  return child;
	},
	    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
	  if (firstProp === void 0) {
	    firstProp = "_first";
	  }

	  if (lastProp === void 0) {
	    lastProp = "_last";
	  }

	  var prev = child._prev,
	      next = child._next;

	  if (prev) {
	    prev._next = next;
	  } else if (parent[firstProp] === child) {
	    parent[firstProp] = next;
	  }

	  if (next) {
	    next._prev = prev;
	  } else if (parent[lastProp] === child) {
	    parent[lastProp] = prev;
	  }

	  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
	},
	    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
	  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
	  child._act = 0;
	},
	    _uncache = function _uncache(animation, child) {
	  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
	    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
	    var a = animation;

	    while (a) {
	      a._dirty = 1;
	      a = a.parent;
	    }
	  }

	  return animation;
	},
	    _recacheAncestors = function _recacheAncestors(animation) {
	  var parent = animation.parent;

	  while (parent && parent.parent) {
	    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
	    parent._dirty = 1;
	    parent.totalDuration();
	    parent = parent.parent;
	  }

	  return animation;
	},
	    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
	  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
	},
	    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
	  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
	},
	    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
	_animationCycle = function _animationCycle(tTime, cycleDuration) {
	  var whole = Math.floor(tTime /= cycleDuration);
	  return tTime && whole === tTime ? whole - 1 : whole;
	},
	    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
	  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
	},
	    _setEnd = function _setEnd(animation) {
	  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
	},
	    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
	  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
	  var parent = animation._dp;

	  if (parent && parent.smoothChildTiming && animation._ts) {
	    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

	    _setEnd(animation);

	    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
	  }

	  return animation;
	},

	/*
	_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
		let cycleDuration = duration + repeatDelay,
			time = _round(clampedTotalTime % cycleDuration);
		if (time > duration) {
			time = duration;
		}
		return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
	},
	*/
	_postAddChecks = function _postAddChecks(timeline, child) {
	  var t;

	  if (child._time || child._initted && !child._dur) {
	    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
	    t = _parentToChildTotalTime(timeline.rawTime(), child);

	    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
	      child.render(t, true);
	    }
	  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


	  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
	    //in case any of the ancestors had completed but should now be enabled...
	    if (timeline._dur < timeline.duration()) {
	      t = timeline;

	      while (t._dp) {
	        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

	        t = t._dp;
	      }
	    }

	    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
	  }
	},
	    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
	  child.parent && _removeFromParent(child);
	  child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
	  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

	  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

	  _isFromOrFromStart(child) || (timeline._recent = child);
	  skipChecks || _postAddChecks(timeline, child);
	  return timeline;
	},
	    _scrollTrigger = function _scrollTrigger(animation, trigger) {
	  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
	},
	    _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
	  _initTween(tween, totalTime);

	  if (!tween._initted) {
	    return 1;
	  }

	  if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
	    _lazyTweens.push(tween);

	    tween._lazy = [totalTime, suppressEvents];
	    return 1;
	  }
	},
	    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
	  var parent = _ref.parent;
	  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
	},
	    // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
	_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
	  var data = _ref2.data;
	  return data === "isFromStart" || data === "isStart";
	},
	    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
	  var prevRatio = tween.ratio,
	      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
	      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
	  repeatDelay = tween._rDelay,
	      tTime = 0,
	      pt,
	      iteration,
	      prevIteration;

	  if (repeatDelay && tween._repeat) {
	    // in case there's a zero-duration tween that has a repeat with a repeatDelay
	    tTime = _clamp(0, tween._tDur, totalTime);
	    iteration = _animationCycle(tTime, repeatDelay);
	    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

	    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
	      // if iteration changed
	      prevRatio = 1 - ratio;
	      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
	    }
	  }

	  if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
	    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
	      // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
	      return;
	    }

	    prevIteration = tween._zTime;
	    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

	    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

	    tween.ratio = ratio;
	    tween._from && (ratio = 1 - ratio);
	    tween._time = 0;
	    tween._tTime = tTime;
	    pt = tween._pt;

	    while (pt) {
	      pt.r(ratio, pt.d);
	      pt = pt._next;
	    }

	    tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
	    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
	    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

	    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
	      ratio && _removeFromParent(tween, 1);

	      if (!suppressEvents) {
	        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

	        tween._prom && tween._prom();
	      }
	    }
	  } else if (!tween._zTime) {
	    tween._zTime = totalTime;
	  }
	},
	    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
	  var child;

	  if (time > prevTime) {
	    child = animation._first;

	    while (child && child._start <= time) {
	      if (child.data === "isPause" && child._start > prevTime) {
	        return child;
	      }

	      child = child._next;
	    }
	  } else {
	    child = animation._last;

	    while (child && child._start >= time) {
	      if (child.data === "isPause" && child._start < prevTime) {
	        return child;
	      }

	      child = child._prev;
	    }
	  }
	},
	    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
	  var repeat = animation._repeat,
	      dur = _roundPrecise(duration) || 0,
	      totalProgress = animation._tTime / animation._tDur;
	  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
	  animation._dur = dur;
	  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
	  totalProgress > 0 && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
	  skipUncache || _uncache(animation.parent, animation);
	  return animation;
	},
	    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
	  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
	},
	    _zeroPosition = {
	  _start: 0,
	  endTime: _emptyFunc,
	  totalDuration: _emptyFunc
	},
	    _parsePosition = function _parsePosition(animation, position, percentAnimation) {
	  var labels = animation.labels,
	      recent = animation._recent || _zeroPosition,
	      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
	      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
	  i,
	      offset,
	      isPercent;

	  if (_isString(position) && (isNaN(position) || position in labels)) {
	    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
	    offset = position.charAt(0);
	    isPercent = position.substr(-1) === "%";
	    i = position.indexOf("=");

	    if (offset === "<" || offset === ">") {
	      i >= 0 && (position = position.replace(/=/, ""));
	      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
	    }

	    if (i < 0) {
	      position in labels || (labels[position] = clippedDuration);
	      return labels[position];
	    }

	    offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));

	    if (isPercent && percentAnimation) {
	      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
	    }

	    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
	  }

	  return position == null ? clippedDuration : +position;
	},
	    _createTweenType = function _createTweenType(type, params, timeline) {
	  var isLegacy = _isNumber(params[1]),
	      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
	      vars = params[varsIndex],
	      irVars,
	      parent;

	  isLegacy && (vars.duration = params[1]);
	  vars.parent = timeline;

	  if (type) {
	    irVars = vars;
	    parent = timeline;

	    while (parent && !("immediateRender" in irVars)) {
	      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
	      irVars = parent.vars.defaults || {};
	      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
	    }

	    vars.immediateRender = _isNotFalse(irVars.immediateRender);
	    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
	  }

	  return new Tween(params[0], vars, params[varsIndex + 1]);
	},
	    _conditionalReturn = function _conditionalReturn(value, func) {
	  return value || value === 0 ? func(value) : func;
	},
	    _clamp = function _clamp(min, max, value) {
	  return value < min ? min : value > max ? max : value;
	},
	    getUnit = function getUnit(value, v) {
	  return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
	},
	    // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
	clamp = function clamp(min, max, value) {
	  return _conditionalReturn(value, function (v) {
	    return _clamp(min, max, v);
	  });
	},
	    _slice = [].slice,
	    _isArrayLike = function _isArrayLike(value, nonEmpty) {
	  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
	},
	    _flatten = function _flatten(ar, leaveStrings, accumulator) {
	  if (accumulator === void 0) {
	    accumulator = [];
	  }

	  return ar.forEach(function (value) {
	    var _accumulator;

	    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
	  }) || accumulator;
	},
	    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
	toArray = function toArray(value, scope, leaveStrings) {
	  return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
	},
	    selector = function selector(value) {
	  value = toArray(value)[0] || _warn("Invalid scope") || {};
	  return function (v) {
	    var el = value.current || value.nativeElement || value;
	    return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
	  };
	},
	    shuffle = function shuffle(a) {
	  return a.sort(function () {
	    return .5 - Math.random();
	  });
	},
	    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
	//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
	distribute = function distribute(v) {
	  if (_isFunction(v)) {
	    return v;
	  }

	  var vars = _isObject(v) ? v : {
	    each: v
	  },
	      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
	  ease = _parseEase(vars.ease),
	      from = vars.from || 0,
	      base = parseFloat(vars.base) || 0,
	      cache = {},
	      isDecimal = from > 0 && from < 1,
	      ratios = isNaN(from) || isDecimal,
	      axis = vars.axis,
	      ratioX = from,
	      ratioY = from;

	  if (_isString(from)) {
	    ratioX = ratioY = {
	      center: .5,
	      edges: .5,
	      end: 1
	    }[from] || 0;
	  } else if (!isDecimal && ratios) {
	    ratioX = from[0];
	    ratioY = from[1];
	  }

	  return function (i, target, a) {
	    var l = (a || vars).length,
	        distances = cache[l],
	        originX,
	        originY,
	        x,
	        y,
	        d,
	        j,
	        max,
	        min,
	        wrapAt;

	    if (!distances) {
	      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

	      if (!wrapAt) {
	        max = -_bigNum;

	        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

	        wrapAt--;
	      }

	      distances = cache[l] = [];
	      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
	      originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
	      max = 0;
	      min = _bigNum;

	      for (j = 0; j < l; j++) {
	        x = j % wrapAt - originX;
	        y = originY - (j / wrapAt | 0);
	        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
	        d > max && (max = d);
	        d < min && (min = d);
	      }

	      from === "random" && shuffle(distances);
	      distances.max = max - min;
	      distances.min = min;
	      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
	      distances.b = l < 0 ? base - l : base;
	      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

	      ease = ease && l < 0 ? _invertEase(ease) : ease;
	    }

	    l = (distances[i] - distances.min) / distances.max || 0;
	    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
	  };
	},
	    _roundModifier = function _roundModifier(v) {
	  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
	  var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

	  return function (raw) {
	    var n = Math.round(parseFloat(raw) / v) * v * p;
	    return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
	  };
	},
	    snap = function snap(snapTo, value) {
	  var isArray = _isArray(snapTo),
	      radius,
	      is2D;

	  if (!isArray && _isObject(snapTo)) {
	    radius = isArray = snapTo.radius || _bigNum;

	    if (snapTo.values) {
	      snapTo = toArray(snapTo.values);

	      if (is2D = !_isNumber(snapTo[0])) {
	        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
	      }
	    } else {
	      snapTo = _roundModifier(snapTo.increment);
	    }
	  }

	  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
	    is2D = snapTo(raw);
	    return Math.abs(is2D - raw) <= radius ? is2D : raw;
	  } : function (raw) {
	    var x = parseFloat(is2D ? raw.x : raw),
	        y = parseFloat(is2D ? raw.y : 0),
	        min = _bigNum,
	        closest = 0,
	        i = snapTo.length,
	        dx,
	        dy;

	    while (i--) {
	      if (is2D) {
	        dx = snapTo[i].x - x;
	        dy = snapTo[i].y - y;
	        dx = dx * dx + dy * dy;
	      } else {
	        dx = Math.abs(snapTo[i] - x);
	      }

	      if (dx < min) {
	        min = dx;
	        closest = i;
	      }
	    }

	    closest = !radius || min <= radius ? snapTo[closest] : raw;
	    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
	  });
	},
	    random = function random(min, max, roundingIncrement, returnFunction) {
	  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
	    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
	  });
	},
	    pipe = function pipe() {
	  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
	    functions[_key] = arguments[_key];
	  }

	  return function (value) {
	    return functions.reduce(function (v, f) {
	      return f(v);
	    }, value);
	  };
	},
	    unitize = function unitize(func, unit) {
	  return function (value) {
	    return func(parseFloat(value)) + (unit || getUnit(value));
	  };
	},
	    normalize = function normalize(min, max, value) {
	  return mapRange(min, max, 0, 1, value);
	},
	    _wrapArray = function _wrapArray(a, wrapper, value) {
	  return _conditionalReturn(value, function (index) {
	    return a[~~wrapper(index)];
	  });
	},
	    wrap = function wrap(min, max, value) {
	  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
	  var range = max - min;
	  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
	    return (range + (value - min) % range) % range + min;
	  });
	},
	    wrapYoyo = function wrapYoyo(min, max, value) {
	  var range = max - min,
	      total = range * 2;
	  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
	    value = (total + (value - min) % total) % total || 0;
	    return min + (value > range ? total - value : value);
	  });
	},
	    _replaceRandom = function _replaceRandom(value) {
	  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
	  var prev = 0,
	      s = "",
	      i,
	      nums,
	      end,
	      isArray;

	  while (~(i = value.indexOf("random(", prev))) {
	    end = value.indexOf(")", i);
	    isArray = value.charAt(i + 7) === "[";
	    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
	    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
	    prev = end + 1;
	  }

	  return s + value.substr(prev, value.length - prev);
	},
	    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
	  var inRange = inMax - inMin,
	      outRange = outMax - outMin;
	  return _conditionalReturn(value, function (value) {
	    return outMin + ((value - inMin) / inRange * outRange || 0);
	  });
	},
	    interpolate = function interpolate(start, end, progress, mutate) {
	  var func = isNaN(start + end) ? 0 : function (p) {
	    return (1 - p) * start + p * end;
	  };

	  if (!func) {
	    var isString = _isString(start),
	        master = {},
	        p,
	        i,
	        interpolators,
	        l,
	        il;

	    progress === true && (mutate = 1) && (progress = null);

	    if (isString) {
	      start = {
	        p: start
	      };
	      end = {
	        p: end
	      };
	    } else if (_isArray(start) && !_isArray(end)) {
	      interpolators = [];
	      l = start.length;
	      il = l - 2;

	      for (i = 1; i < l; i++) {
	        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
	      }

	      l--;

	      func = function func(p) {
	        p *= l;
	        var i = Math.min(il, ~~p);
	        return interpolators[i](p - i);
	      };

	      progress = end;
	    } else if (!mutate) {
	      start = _merge(_isArray(start) ? [] : {}, start);
	    }

	    if (!interpolators) {
	      for (p in end) {
	        _addPropTween.call(master, start, p, "get", end[p]);
	      }

	      func = function func(p) {
	        return _renderPropTweens(p, master) || (isString ? start.p : start);
	      };
	    }
	  }

	  return _conditionalReturn(progress, func);
	},
	    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
	  //used for nextLabel() and previousLabel()
	  var labels = timeline.labels,
	      min = _bigNum,
	      p,
	      distance,
	      label;

	  for (p in labels) {
	    distance = labels[p] - fromTime;

	    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
	      label = p;
	      min = distance;
	    }
	  }

	  return label;
	},
	    _callback = function _callback(animation, type, executeLazyFirst) {
	  var v = animation.vars,
	      callback = v[type],
	      params,
	      scope;

	  if (!callback) {
	    return;
	  }

	  params = v[type + "Params"];
	  scope = v.callbackScope || animation;
	  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

	  return params ? callback.apply(scope, params) : callback.call(scope);
	},
	    _interrupt = function _interrupt(animation) {
	  _removeFromParent(animation);

	  animation.scrollTrigger && animation.scrollTrigger.kill(false);
	  animation.progress() < 1 && _callback(animation, "onInterrupt");
	  return animation;
	},
	    _quickTween,
	    _createPlugin = function _createPlugin(config) {
	  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

	  var name = config.name,
	      isFunc = _isFunction(config),
	      Plugin = name && !isFunc && config.init ? function () {
	    this._props = [];
	  } : config,
	      //in case someone passes in an object that's not a plugin, like CustomEase
	  instanceDefaults = {
	    init: _emptyFunc,
	    render: _renderPropTweens,
	    add: _addPropTween,
	    kill: _killPropTweensOf,
	    modifier: _addPluginModifier,
	    rawVars: 0
	  },
	      statics = {
	    targetTest: 0,
	    get: 0,
	    getSetter: _getSetter,
	    aliases: {},
	    register: 0
	  };

	  _wake();

	  if (config !== Plugin) {
	    if (_plugins[name]) {
	      return;
	    }

	    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


	    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


	    _plugins[Plugin.prop = name] = Plugin;

	    if (config.targetTest) {
	      _harnessPlugins.push(Plugin);

	      _reservedProps[name] = 1;
	    }

	    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
	  }

	  _addGlobal(name, Plugin);

	  config.register && config.register(gsap, Plugin, PropTween);
	},

	/*
	 * --------------------------------------------------------------------------------------
	 * COLORS
	 * --------------------------------------------------------------------------------------
	 */
	_255 = 255,
	    _colorLookup = {
	  aqua: [0, _255, _255],
	  lime: [0, _255, 0],
	  silver: [192, 192, 192],
	  black: [0, 0, 0],
	  maroon: [128, 0, 0],
	  teal: [0, 128, 128],
	  blue: [0, 0, _255],
	  navy: [0, 0, 128],
	  white: [_255, _255, _255],
	  olive: [128, 128, 0],
	  yellow: [_255, _255, 0],
	  orange: [_255, 165, 0],
	  gray: [128, 128, 128],
	  purple: [128, 0, 128],
	  green: [0, 128, 0],
	  red: [_255, 0, 0],
	  pink: [_255, 192, 203],
	  cyan: [0, _255, _255],
	  transparent: [_255, _255, _255, 0]
	},
	    // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
	// let ctx = _doc.createElement("canvas").getContext("2d");
	// _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
	_hue = function _hue(h, m1, m2) {
	  h += h < 0 ? 1 : h > 1 ? -1 : 0;
	  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
	},
	    splitColor = function splitColor(v, toHSL, forceAlpha) {
	  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
	      r,
	      g,
	      b,
	      h,
	      s,
	      l,
	      max,
	      min,
	      d,
	      wasHSL;

	  if (!a) {
	    if (v.substr(-1) === ",") {
	      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
	      v = v.substr(0, v.length - 1);
	    }

	    if (_colorLookup[v]) {
	      a = _colorLookup[v];
	    } else if (v.charAt(0) === "#") {
	      if (v.length < 6) {
	        //for shorthand like #9F0 or #9F0F (could have alpha)
	        r = v.charAt(1);
	        g = v.charAt(2);
	        b = v.charAt(3);
	        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
	      }

	      if (v.length === 9) {
	        // hex with alpha, like #fd5e53ff
	        a = parseInt(v.substr(1, 6), 16);
	        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
	      }

	      v = parseInt(v.substr(1), 16);
	      a = [v >> 16, v >> 8 & _255, v & _255];
	    } else if (v.substr(0, 3) === "hsl") {
	      a = wasHSL = v.match(_strictNumExp);

	      if (!toHSL) {
	        h = +a[0] % 360 / 360;
	        s = +a[1] / 100;
	        l = +a[2] / 100;
	        g = l <= .5 ? l * (s + 1) : l + s - l * s;
	        r = l * 2 - g;
	        a.length > 3 && (a[3] *= 1); //cast as number

	        a[0] = _hue(h + 1 / 3, r, g);
	        a[1] = _hue(h, r, g);
	        a[2] = _hue(h - 1 / 3, r, g);
	      } else if (~v.indexOf("=")) {
	        //if relative values are found, just return the raw strings with the relative prefixes in place.
	        a = v.match(_numExp);
	        forceAlpha && a.length < 4 && (a[3] = 1);
	        return a;
	      }
	    } else {
	      a = v.match(_strictNumExp) || _colorLookup.transparent;
	    }

	    a = a.map(Number);
	  }

	  if (toHSL && !wasHSL) {
	    r = a[0] / _255;
	    g = a[1] / _255;
	    b = a[2] / _255;
	    max = Math.max(r, g, b);
	    min = Math.min(r, g, b);
	    l = (max + min) / 2;

	    if (max === min) {
	      h = s = 0;
	    } else {
	      d = max - min;
	      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
	      h *= 60;
	    }

	    a[0] = ~~(h + .5);
	    a[1] = ~~(s * 100 + .5);
	    a[2] = ~~(l * 100 + .5);
	  }

	  forceAlpha && a.length < 4 && (a[3] = 1);
	  return a;
	},
	    _colorOrderData = function _colorOrderData(v) {
	  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
	  var values = [],
	      c = [],
	      i = -1;
	  v.split(_colorExp).forEach(function (v) {
	    var a = v.match(_numWithUnitExp) || [];
	    values.push.apply(values, a);
	    c.push(i += a.length + 1);
	  });
	  values.c = c;
	  return values;
	},
	    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
	  var result = "",
	      colors = (s + result).match(_colorExp),
	      type = toHSL ? "hsla(" : "rgba(",
	      i = 0,
	      c,
	      shell,
	      d,
	      l;

	  if (!colors) {
	    return s;
	  }

	  colors = colors.map(function (color) {
	    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
	  });

	  if (orderMatchData) {
	    d = _colorOrderData(s);
	    c = orderMatchData.c;

	    if (c.join(result) !== d.c.join(result)) {
	      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
	      l = shell.length - 1;

	      for (; i < l; i++) {
	        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
	      }
	    }
	  }

	  if (!shell) {
	    shell = s.split(_colorExp);
	    l = shell.length - 1;

	    for (; i < l; i++) {
	      result += shell[i] + colors[i];
	    }
	  }

	  return result + shell[l];
	},
	    _colorExp = function () {
	  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
	      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
	  p;

	  for (p in _colorLookup) {
	    s += "|" + p + "\\b";
	  }

	  return new RegExp(s + ")", "gi");
	}(),
	    _hslExp = /hsl[a]?\(/,
	    _colorStringFilter = function _colorStringFilter(a) {
	  var combined = a.join(" "),
	      toHSL;
	  _colorExp.lastIndex = 0;

	  if (_colorExp.test(combined)) {
	    toHSL = _hslExp.test(combined);
	    a[1] = _formatColors(a[1], toHSL);
	    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

	    return true;
	  }
	},

	/*
	 * --------------------------------------------------------------------------------------
	 * TICKER
	 * --------------------------------------------------------------------------------------
	 */
	_tickerActive,
	    _ticker = function () {
	  var _getTime = Date.now,
	      _lagThreshold = 500,
	      _adjustedLag = 33,
	      _startTime = _getTime(),
	      _lastUpdate = _startTime,
	      _gap = 1000 / 240,
	      _nextTime = _gap,
	      _listeners = [],
	      _id,
	      _req,
	      _raf,
	      _self,
	      _delta,
	      _i,
	      _tick = function _tick(v) {
	    var elapsed = _getTime() - _lastUpdate,
	        manual = v === true,
	        overlap,
	        dispatch,
	        time,
	        frame;

	    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
	    _lastUpdate += elapsed;
	    time = _lastUpdate - _startTime;
	    overlap = time - _nextTime;

	    if (overlap > 0 || manual) {
	      frame = ++_self.frame;
	      _delta = time - _self.time * 1000;
	      _self.time = time = time / 1000;
	      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
	      dispatch = 1;
	    }

	    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

	    if (dispatch) {
	      for (_i = 0; _i < _listeners.length; _i++) {
	        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
	        _listeners[_i](time, _delta, frame, v);
	      }
	    }
	  };

	  _self = {
	    time: 0,
	    frame: 0,
	    tick: function tick() {
	      _tick(true);
	    },
	    deltaRatio: function deltaRatio(fps) {
	      return _delta / (1000 / (fps || 60));
	    },
	    wake: function wake() {
	      if (_coreReady) {
	        if (!_coreInitted && _windowExists()) {
	          _win = _coreInitted = window;
	          _doc = _win.document || {};
	          _globals.gsap = gsap;
	          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

	          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

	          _raf = _win.requestAnimationFrame;
	        }

	        _id && _self.sleep();

	        _req = _raf || function (f) {
	          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
	        };

	        _tickerActive = 1;

	        _tick(2);
	      }
	    },
	    sleep: function sleep() {
	      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
	      _tickerActive = 0;
	      _req = _emptyFunc;
	    },
	    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
	      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

	      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
	    },
	    fps: function fps(_fps) {
	      _gap = 1000 / (_fps || 240);
	      _nextTime = _self.time * 1000 + _gap;
	    },
	    add: function add(callback, once, prioritize) {
	      var func = once ? function (t, d, f, v) {
	        callback(t, d, f, v);

	        _self.remove(func);
	      } : callback;

	      _self.remove(callback);

	      _listeners[prioritize ? "unshift" : "push"](func);

	      _wake();

	      return func;
	    },
	    remove: function remove(callback, i) {
	      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
	    },
	    _listeners: _listeners
	  };
	  return _self;
	}(),
	    _wake = function _wake() {
	  return !_tickerActive && _ticker.wake();
	},
	    //also ensures the core classes are initialized.

	/*
	* -------------------------------------------------
	* EASING
	* -------------------------------------------------
	*/
	_easeMap = {},
	    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
	    _quotesExp = /["']/g,
	    _parseObjectInString = function _parseObjectInString(value) {
	  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
	  var obj = {},
	      split = value.substr(1, value.length - 3).split(":"),
	      key = split[0],
	      i = 1,
	      l = split.length,
	      index,
	      val,
	      parsedVal;

	  for (; i < l; i++) {
	    val = split[i];
	    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
	    parsedVal = val.substr(0, index);
	    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
	    key = val.substr(index + 1).trim();
	  }

	  return obj;
	},
	    _valueInParentheses = function _valueInParentheses(value) {
	  var open = value.indexOf("(") + 1,
	      close = value.indexOf(")"),
	      nested = value.indexOf("(", open);
	  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
	},
	    _configEaseFromString = function _configEaseFromString(name) {
	  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
	  var split = (name + "").split("("),
	      ease = _easeMap[split[0]];
	  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
	},
	    _invertEase = function _invertEase(ease) {
	  return function (p) {
	    return 1 - ease(1 - p);
	  };
	},
	    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
	_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
	  var child = timeline._first,
	      ease;

	  while (child) {
	    if (child instanceof Timeline) {
	      _propagateYoyoEase(child, isYoyo);
	    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
	      if (child.timeline) {
	        _propagateYoyoEase(child.timeline, isYoyo);
	      } else {
	        ease = child._ease;
	        child._ease = child._yEase;
	        child._yEase = ease;
	        child._yoyo = isYoyo;
	      }
	    }

	    child = child._next;
	  }
	},
	    _parseEase = function _parseEase(ease, defaultEase) {
	  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
	},
	    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
	  if (easeOut === void 0) {
	    easeOut = function easeOut(p) {
	      return 1 - easeIn(1 - p);
	    };
	  }

	  if (easeInOut === void 0) {
	    easeInOut = function easeInOut(p) {
	      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
	    };
	  }

	  var ease = {
	    easeIn: easeIn,
	    easeOut: easeOut,
	    easeInOut: easeInOut
	  },
	      lowercaseName;

	  _forEachName(names, function (name) {
	    _easeMap[name] = _globals[name] = ease;
	    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

	    for (var p in ease) {
	      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
	    }
	  });

	  return ease;
	},
	    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
	  return function (p) {
	    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
	  };
	},
	    _configElastic = function _configElastic(type, amplitude, period) {
	  var p1 = amplitude >= 1 ? amplitude : 1,
	      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
	  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
	      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
	      easeOut = function easeOut(p) {
	    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
	  },
	      ease = type === "out" ? easeOut : type === "in" ? function (p) {
	    return 1 - easeOut(1 - p);
	  } : _easeInOutFromOut(easeOut);

	  p2 = _2PI / p2; //precalculate to optimize

	  ease.config = function (amplitude, period) {
	    return _configElastic(type, amplitude, period);
	  };

	  return ease;
	},
	    _configBack = function _configBack(type, overshoot) {
	  if (overshoot === void 0) {
	    overshoot = 1.70158;
	  }

	  var easeOut = function easeOut(p) {
	    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
	  },
	      ease = type === "out" ? easeOut : type === "in" ? function (p) {
	    return 1 - easeOut(1 - p);
	  } : _easeInOutFromOut(easeOut);

	  ease.config = function (overshoot) {
	    return _configBack(type, overshoot);
	  };

	  return ease;
	}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
	// _weightedEase = ratio => {
	// 	let y = 0.5 + ratio / 2;
	// 	return p => (2 * (1 - p) * p * y + p * p);
	// },
	// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
	// _weightedEaseStrong = ratio => {
	// 	ratio = .5 + ratio / 2;
	// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
	// 		b = ratio - o,
	// 		c = ratio + o;
	// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
	// };


	_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
	  var power = i < 5 ? i + 1 : i;

	  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
	    return Math.pow(p, power);
	  } : function (p) {
	    return p;
	  }, function (p) {
	    return 1 - Math.pow(1 - p, power);
	  }, function (p) {
	    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
	  });
	});

	_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

	_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

	(function (n, c) {
	  var n1 = 1 / c,
	      n2 = 2 * n1,
	      n3 = 2.5 * n1,
	      easeOut = function easeOut(p) {
	    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
	  };

	  _insertEase("Bounce", function (p) {
	    return 1 - easeOut(1 - p);
	  }, easeOut);
	})(7.5625, 2.75);

	_insertEase("Expo", function (p) {
	  return p ? Math.pow(2, 10 * (p - 1)) : 0;
	});

	_insertEase("Circ", function (p) {
	  return -(_sqrt(1 - p * p) - 1);
	});

	_insertEase("Sine", function (p) {
	  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
	});

	_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

	_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
	  config: function config(steps, immediateStart) {
	    if (steps === void 0) {
	      steps = 1;
	    }

	    var p1 = 1 / steps,
	        p2 = steps + (immediateStart ? 0 : 1),
	        p3 = immediateStart ? 1 : 0,
	        max = 1 - _tinyNum;
	    return function (p) {
	      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
	    };
	  }
	};
	_defaults.ease = _easeMap["quad.out"];

	_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
	  return _callbackNames += name + "," + name + "Params,";
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * CACHE
	 * --------------------------------------------------------------------------------------
	 */


	var GSCache = function GSCache(target, harness) {
	  this.id = _gsID++;
	  target._gsap = this;
	  this.target = target;
	  this.harness = harness;
	  this.get = harness ? harness.get : _getProperty;
	  this.set = harness ? harness.getSetter : _getSetter;
	};
	/*
	 * --------------------------------------------------------------------------------------
	 * ANIMATION
	 * --------------------------------------------------------------------------------------
	 */

	var Animation = /*#__PURE__*/function () {
	  function Animation(vars) {
	    this.vars = vars;
	    this._delay = +vars.delay || 0;

	    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
	      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
	      this._rDelay = vars.repeatDelay || 0;
	      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
	    }

	    this._ts = 1;

	    _setDuration(this, +vars.duration, 1, 1);

	    this.data = vars.data;
	    _tickerActive || _ticker.wake();
	  }

	  var _proto = Animation.prototype;

	  _proto.delay = function delay(value) {
	    if (value || value === 0) {
	      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
	      this._delay = value;
	      return this;
	    }

	    return this._delay;
	  };

	  _proto.duration = function duration(value) {
	    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
	  };

	  _proto.totalDuration = function totalDuration(value) {
	    if (!arguments.length) {
	      return this._tDur;
	    }

	    this._dirty = 0;
	    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
	  };

	  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
	    _wake();

	    if (!arguments.length) {
	      return this._tTime;
	    }

	    var parent = this._dp;

	    if (parent && parent.smoothChildTiming && this._ts) {
	      _alignPlayhead(this, _totalTime);

	      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
	      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

	      while (parent && parent.parent) {
	        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
	          parent.totalTime(parent._tTime, true);
	        }

	        parent = parent.parent;
	      }

	      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
	        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
	        _addToTimeline(this._dp, this, this._start - this._delay);
	      }
	    }

	    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
	      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
	      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
	      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
	      //   this._lock = 1;

	      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
	      //}

	    }

	    return this;
	  };

	  _proto.time = function time(value, suppressEvents) {
	    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
	  };

	  _proto.totalProgress = function totalProgress(value, suppressEvents) {
	    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
	  };

	  _proto.progress = function progress(value, suppressEvents) {
	    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
	  };

	  _proto.iteration = function iteration(value, suppressEvents) {
	    var cycleDuration = this.duration() + this._rDelay;

	    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
	  } // potential future addition:
	  // isPlayingBackwards() {
	  // 	let animation = this,
	  // 		orientation = 1; // 1 = forward, -1 = backward
	  // 	while (animation) {
	  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
	  // 		animation = animation.parent;
	  // 	}
	  // 	return orientation < 0;
	  // }
	  ;

	  _proto.timeScale = function timeScale(value) {
	    if (!arguments.length) {
	      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
	    }

	    if (this._rts === value) {
	      return this;
	    }

	    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
	    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
	    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
	    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

	    this._rts = +value || 0;
	    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

	    this.totalTime(_clamp(-this._delay, this._tDur, tTime), true);

	    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.


	    return _recacheAncestors(this);
	  };

	  _proto.paused = function paused(value) {
	    if (!arguments.length) {
	      return this._ps;
	    }

	    if (this._ps !== value) {
	      this._ps = value;

	      if (value) {
	        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

	        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
	      } else {
	        _wake();

	        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

	        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
	      }
	    }

	    return this;
	  };

	  _proto.startTime = function startTime(value) {
	    if (arguments.length) {
	      this._start = value;
	      var parent = this.parent || this._dp;
	      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
	      return this;
	    }

	    return this._start;
	  };

	  _proto.endTime = function endTime(includeRepeats) {
	    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
	  };

	  _proto.rawTime = function rawTime(wrapRepeats) {
	    var parent = this.parent || this._dp; // _dp = detached parent

	    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
	  };

	  _proto.globalTime = function globalTime(rawTime) {
	    var animation = this,
	        time = arguments.length ? rawTime : animation.rawTime();

	    while (animation) {
	      time = animation._start + time / (animation._ts || 1);
	      animation = animation._dp;
	    }

	    return time;
	  };

	  _proto.repeat = function repeat(value) {
	    if (arguments.length) {
	      this._repeat = value === Infinity ? -2 : value;
	      return _onUpdateTotalDuration(this);
	    }

	    return this._repeat === -2 ? Infinity : this._repeat;
	  };

	  _proto.repeatDelay = function repeatDelay(value) {
	    if (arguments.length) {
	      var time = this._time;
	      this._rDelay = value;

	      _onUpdateTotalDuration(this);

	      return time ? this.time(time) : this;
	    }

	    return this._rDelay;
	  };

	  _proto.yoyo = function yoyo(value) {
	    if (arguments.length) {
	      this._yoyo = value;
	      return this;
	    }

	    return this._yoyo;
	  };

	  _proto.seek = function seek(position, suppressEvents) {
	    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
	  };

	  _proto.restart = function restart(includeDelay, suppressEvents) {
	    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
	  };

	  _proto.play = function play(from, suppressEvents) {
	    from != null && this.seek(from, suppressEvents);
	    return this.reversed(false).paused(false);
	  };

	  _proto.reverse = function reverse(from, suppressEvents) {
	    from != null && this.seek(from || this.totalDuration(), suppressEvents);
	    return this.reversed(true).paused(false);
	  };

	  _proto.pause = function pause(atTime, suppressEvents) {
	    atTime != null && this.seek(atTime, suppressEvents);
	    return this.paused(true);
	  };

	  _proto.resume = function resume() {
	    return this.paused(false);
	  };

	  _proto.reversed = function reversed(value) {
	    if (arguments.length) {
	      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

	      return this;
	    }

	    return this._rts < 0;
	  };

	  _proto.invalidate = function invalidate() {
	    this._initted = this._act = 0;
	    this._zTime = -_tinyNum;
	    return this;
	  };

	  _proto.isActive = function isActive() {
	    var parent = this.parent || this._dp,
	        start = this._start,
	        rawTime;
	    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
	  };

	  _proto.eventCallback = function eventCallback(type, callback, params) {
	    var vars = this.vars;

	    if (arguments.length > 1) {
	      if (!callback) {
	        delete vars[type];
	      } else {
	        vars[type] = callback;
	        params && (vars[type + "Params"] = params);
	        type === "onUpdate" && (this._onUpdate = callback);
	      }

	      return this;
	    }

	    return vars[type];
	  };

	  _proto.then = function then(onFulfilled) {
	    var self = this;
	    return new Promise(function (resolve) {
	      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
	          _resolve = function _resolve() {
	        var _then = self.then;
	        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

	        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
	        resolve(f);
	        self.then = _then;
	      };

	      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
	        _resolve();
	      } else {
	        self._prom = _resolve;
	      }
	    });
	  };

	  _proto.kill = function kill() {
	    _interrupt(this);
	  };

	  return Animation;
	}();

	_setDefaults(Animation.prototype, {
	  _time: 0,
	  _start: 0,
	  _end: 0,
	  _tTime: 0,
	  _tDur: 0,
	  _dirty: 0,
	  _repeat: 0,
	  _yoyo: false,
	  parent: null,
	  _initted: false,
	  _rDelay: 0,
	  _ts: 1,
	  _dp: 0,
	  ratio: 0,
	  _zTime: -_tinyNum,
	  _prom: 0,
	  _ps: false,
	  _rts: 1
	});
	/*
	 * -------------------------------------------------
	 * TIMELINE
	 * -------------------------------------------------
	 */


	var Timeline = /*#__PURE__*/function (_Animation) {
	  _inheritsLoose(Timeline, _Animation);

	  function Timeline(vars, position) {
	    var _this;

	    if (vars === void 0) {
	      vars = {};
	    }

	    _this = _Animation.call(this, vars) || this;
	    _this.labels = {};
	    _this.smoothChildTiming = !!vars.smoothChildTiming;
	    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
	    _this._sort = _isNotFalse(vars.sortChildren);
	    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
	    vars.reversed && _this.reverse();
	    vars.paused && _this.paused(true);
	    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
	    return _this;
	  }

	  var _proto2 = Timeline.prototype;

	  _proto2.to = function to(targets, vars, position) {
	    _createTweenType(0, arguments, this);

	    return this;
	  };

	  _proto2.from = function from(targets, vars, position) {
	    _createTweenType(1, arguments, this);

	    return this;
	  };

	  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
	    _createTweenType(2, arguments, this);

	    return this;
	  };

	  _proto2.set = function set(targets, vars, position) {
	    vars.duration = 0;
	    vars.parent = this;
	    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
	    vars.immediateRender = !!vars.immediateRender;
	    new Tween(targets, vars, _parsePosition(this, position), 1);
	    return this;
	  };

	  _proto2.call = function call(callback, params, position) {
	    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
	  } //ONLY for backward compatibility! Maybe delete?
	  ;

	  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    vars.duration = duration;
	    vars.stagger = vars.stagger || stagger;
	    vars.onComplete = onCompleteAll;
	    vars.onCompleteParams = onCompleteAllParams;
	    vars.parent = this;
	    new Tween(targets, vars, _parsePosition(this, position));
	    return this;
	  };

	  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    vars.runBackwards = 1;
	    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
	    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
	  };

	  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    toVars.startAt = fromVars;
	    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
	    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
	  };

	  _proto2.render = function render(totalTime, suppressEvents, force) {
	    var prevTime = this._time,
	        tDur = this._dirty ? this.totalDuration() : this._tDur,
	        dur = this._dur,
	        tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
	        // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
	    crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
	        time,
	        child,
	        next,
	        iteration,
	        cycleDuration,
	        prevPaused,
	        pauseTween,
	        timeScale,
	        prevStart,
	        prevIteration,
	        yoyo,
	        isYoyo;
	    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);

	    if (tTime !== this._tTime || force || crossingStart) {
	      if (prevTime !== this._time && dur) {
	        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
	        tTime += this._time - prevTime;
	        totalTime += this._time - prevTime;
	      }

	      time = tTime;
	      prevStart = this._start;
	      timeScale = this._ts;
	      prevPaused = !timeScale;

	      if (crossingStart) {
	        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

	        (totalTime || !suppressEvents) && (this._zTime = totalTime);
	      }

	      if (this._repeat) {
	        //adjust the time for repeats and yoyos
	        yoyo = this._yoyo;
	        cycleDuration = dur + this._rDelay;

	        if (this._repeat < -1 && totalTime < 0) {
	          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
	        }

	        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

	        if (tTime === tDur) {
	          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
	          iteration = this._repeat;
	          time = dur;
	        } else {
	          iteration = ~~(tTime / cycleDuration);

	          if (iteration && iteration === tTime / cycleDuration) {
	            time = dur;
	            iteration--;
	          }

	          time > dur && (time = dur);
	        }

	        prevIteration = _animationCycle(this._tTime, cycleDuration);
	        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

	        if (yoyo && iteration & 1) {
	          time = dur - time;
	          isYoyo = 1;
	        }
	        /*
	        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
	        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
	        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
	        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
	        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
	        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
	        */


	        if (iteration !== prevIteration && !this._lock) {
	          var rewinding = yoyo && prevIteration & 1,
	              doesWrap = rewinding === (yoyo && iteration & 1);
	          iteration < prevIteration && (rewinding = !rewinding);
	          prevTime = rewinding ? 0 : dur;
	          this._lock = 1;
	          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
	          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

	          !suppressEvents && this.parent && _callback(this, "onRepeat");
	          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

	          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
	            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
	            return this;
	          }

	          dur = this._dur; // in case the duration changed in the onRepeat

	          tDur = this._tDur;

	          if (doesWrap) {
	            this._lock = 2;
	            prevTime = rewinding ? dur : -0.0001;
	            this.render(prevTime, true);
	            this.vars.repeatRefresh && !isYoyo && this.invalidate();
	          }

	          this._lock = 0;

	          if (!this._ts && !prevPaused) {
	            return this;
	          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


	          _propagateYoyoEase(this, isYoyo);
	        }
	      }

	      if (this._hasPause && !this._forcing && this._lock < 2) {
	        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));

	        if (pauseTween) {
	          tTime -= time - (time = pauseTween._start);
	        }
	      }

	      this._tTime = tTime;
	      this._time = time;
	      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

	      if (!this._initted) {
	        this._onUpdate = this.vars.onUpdate;
	        this._initted = 1;
	        this._zTime = totalTime;
	        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
	      }

	      if (!prevTime && time && !suppressEvents) {
	        _callback(this, "onStart");

	        if (this._tTime !== tTime) {
	          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
	          return this;
	        }
	      }

	      if (time >= prevTime && totalTime >= 0) {
	        child = this._first;

	        while (child) {
	          next = child._next;

	          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
	            if (child.parent !== this) {
	              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
	              return this.render(totalTime, suppressEvents, force);
	            }

	            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

	            if (time !== this._time || !this._ts && !prevPaused) {
	              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
	              pauseTween = 0;
	              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

	              break;
	            }
	          }

	          child = next;
	        }
	      } else {
	        child = this._last;
	        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

	        while (child) {
	          next = child._prev;

	          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
	            if (child.parent !== this) {
	              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
	              return this.render(totalTime, suppressEvents, force);
	            }

	            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

	            if (time !== this._time || !this._ts && !prevPaused) {
	              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
	              pauseTween = 0;
	              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

	              break;
	            }
	          }

	          child = next;
	        }
	      }

	      if (pauseTween && !suppressEvents) {
	        this.pause();
	        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

	        if (this._ts) {
	          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
	          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

	          _setEnd(this);

	          return this.render(totalTime, suppressEvents, force);
	        }
	      }

	      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
	      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
	        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
	        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

	        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
	          _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);

	          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
	        }
	      }
	    }

	    return this;
	  };

	  _proto2.add = function add(child, position) {
	    var _this2 = this;

	    _isNumber(position) || (position = _parsePosition(this, position, child));

	    if (!(child instanceof Animation)) {
	      if (_isArray(child)) {
	        child.forEach(function (obj) {
	          return _this2.add(obj, position);
	        });
	        return this;
	      }

	      if (_isString(child)) {
	        return this.addLabel(child, position);
	      }

	      if (_isFunction(child)) {
	        child = Tween.delayedCall(0, child);
	      } else {
	        return this;
	      }
	    }

	    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
	  };

	  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
	    if (nested === void 0) {
	      nested = true;
	    }

	    if (tweens === void 0) {
	      tweens = true;
	    }

	    if (timelines === void 0) {
	      timelines = true;
	    }

	    if (ignoreBeforeTime === void 0) {
	      ignoreBeforeTime = -_bigNum;
	    }

	    var a = [],
	        child = this._first;

	    while (child) {
	      if (child._start >= ignoreBeforeTime) {
	        if (child instanceof Tween) {
	          tweens && a.push(child);
	        } else {
	          timelines && a.push(child);
	          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
	        }
	      }

	      child = child._next;
	    }

	    return a;
	  };

	  _proto2.getById = function getById(id) {
	    var animations = this.getChildren(1, 1, 1),
	        i = animations.length;

	    while (i--) {
	      if (animations[i].vars.id === id) {
	        return animations[i];
	      }
	    }
	  };

	  _proto2.remove = function remove(child) {
	    if (_isString(child)) {
	      return this.removeLabel(child);
	    }

	    if (_isFunction(child)) {
	      return this.killTweensOf(child);
	    }

	    _removeLinkedListItem(this, child);

	    if (child === this._recent) {
	      this._recent = this._last;
	    }

	    return _uncache(this);
	  };

	  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
	    if (!arguments.length) {
	      return this._tTime;
	    }

	    this._forcing = 1;

	    if (!this._dp && this._ts) {
	      //special case for the global timeline (or any other that has no parent or detached parent).
	      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
	    }

	    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

	    this._forcing = 0;
	    return this;
	  };

	  _proto2.addLabel = function addLabel(label, position) {
	    this.labels[label] = _parsePosition(this, position);
	    return this;
	  };

	  _proto2.removeLabel = function removeLabel(label) {
	    delete this.labels[label];
	    return this;
	  };

	  _proto2.addPause = function addPause(position, callback, params) {
	    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
	    t.data = "isPause";
	    this._hasPause = 1;
	    return _addToTimeline(this, t, _parsePosition(this, position));
	  };

	  _proto2.removePause = function removePause(position) {
	    var child = this._first;
	    position = _parsePosition(this, position);

	    while (child) {
	      if (child._start === position && child.data === "isPause") {
	        _removeFromParent(child);
	      }

	      child = child._next;
	    }
	  };

	  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
	    var tweens = this.getTweensOf(targets, onlyActive),
	        i = tweens.length;

	    while (i--) {
	      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
	    }

	    return this;
	  };

	  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
	    var a = [],
	        parsedTargets = toArray(targets),
	        child = this._first,
	        isGlobalTime = _isNumber(onlyActive),
	        // a number is interpreted as a global time. If the animation spans
	    children;

	    while (child) {
	      if (child instanceof Tween) {
	        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
	          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
	          a.push(child);
	        }
	      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
	        a.push.apply(a, children);
	      }

	      child = child._next;
	    }

	    return a;
	  } // potential future feature - targets() on timelines
	  // targets() {
	  // 	let result = [];
	  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
	  // 	return result.filter((v, i) => result.indexOf(v) === i);
	  // }
	  ;

	  _proto2.tweenTo = function tweenTo(position, vars) {
	    vars = vars || {};

	    var tl = this,
	        endTime = _parsePosition(tl, position),
	        _vars = vars,
	        startAt = _vars.startAt,
	        _onStart = _vars.onStart,
	        onStartParams = _vars.onStartParams,
	        immediateRender = _vars.immediateRender,
	        initted,
	        tween = Tween.to(tl, _setDefaults({
	      ease: vars.ease || "none",
	      lazy: false,
	      immediateRender: false,
	      time: endTime,
	      overwrite: "auto",
	      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
	      onStart: function onStart() {
	        tl.pause();

	        if (!initted) {
	          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
	          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
	          initted = 1;
	        }

	        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
	      }
	    }, vars));

	    return immediateRender ? tween.render(0) : tween;
	  };

	  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
	    return this.tweenTo(toPosition, _setDefaults({
	      startAt: {
	        time: _parsePosition(this, fromPosition)
	      }
	    }, vars));
	  };

	  _proto2.recent = function recent() {
	    return this._recent;
	  };

	  _proto2.nextLabel = function nextLabel(afterTime) {
	    if (afterTime === void 0) {
	      afterTime = this._time;
	    }

	    return _getLabelInDirection(this, _parsePosition(this, afterTime));
	  };

	  _proto2.previousLabel = function previousLabel(beforeTime) {
	    if (beforeTime === void 0) {
	      beforeTime = this._time;
	    }

	    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
	  };

	  _proto2.currentLabel = function currentLabel(value) {
	    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
	  };

	  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
	    if (ignoreBeforeTime === void 0) {
	      ignoreBeforeTime = 0;
	    }

	    var child = this._first,
	        labels = this.labels,
	        p;

	    while (child) {
	      if (child._start >= ignoreBeforeTime) {
	        child._start += amount;
	        child._end += amount;
	      }

	      child = child._next;
	    }

	    if (adjustLabels) {
	      for (p in labels) {
	        if (labels[p] >= ignoreBeforeTime) {
	          labels[p] += amount;
	        }
	      }
	    }

	    return _uncache(this);
	  };

	  _proto2.invalidate = function invalidate() {
	    var child = this._first;
	    this._lock = 0;

	    while (child) {
	      child.invalidate();
	      child = child._next;
	    }

	    return _Animation.prototype.invalidate.call(this);
	  };

	  _proto2.clear = function clear(includeLabels) {
	    if (includeLabels === void 0) {
	      includeLabels = true;
	    }

	    var child = this._first,
	        next;

	    while (child) {
	      next = child._next;
	      this.remove(child);
	      child = next;
	    }

	    this._dp && (this._time = this._tTime = this._pTime = 0);
	    includeLabels && (this.labels = {});
	    return _uncache(this);
	  };

	  _proto2.totalDuration = function totalDuration(value) {
	    var max = 0,
	        self = this,
	        child = self._last,
	        prevStart = _bigNum,
	        prev,
	        start,
	        parent;

	    if (arguments.length) {
	      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
	    }

	    if (self._dirty) {
	      parent = self.parent;

	      while (child) {
	        prev = child._prev; //record it here in case the tween changes position in the sequence...

	        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

	        start = child._start;

	        if (start > prevStart && self._sort && child._ts && !self._lock) {
	          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
	          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

	          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
	        } else {
	          prevStart = start;
	        }

	        if (start < 0 && child._ts) {
	          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
	          max -= start;

	          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
	            self._start += start / self._ts;
	            self._time -= start;
	            self._tTime -= start;
	          }

	          self.shiftChildren(-start, false, -1e999);
	          prevStart = 0;
	        }

	        child._end > max && child._ts && (max = child._end);
	        child = prev;
	      }

	      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

	      self._dirty = 0;
	    }

	    return self._tDur;
	  };

	  Timeline.updateRoot = function updateRoot(time) {
	    if (_globalTimeline._ts) {
	      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

	      _lastRenderedFrame = _ticker.frame;
	    }

	    if (_ticker.frame >= _nextGCFrame) {
	      _nextGCFrame += _config.autoSleep || 120;
	      var child = _globalTimeline._first;
	      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
	        while (child && !child._ts) {
	          child = child._next;
	        }

	        child || _ticker.sleep();
	      }
	    }
	  };

	  return Timeline;
	}(Animation);

	_setDefaults(Timeline.prototype, {
	  _lock: 0,
	  _hasPause: 0,
	  _forcing: 0
	});

	var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
	  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
	  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
	      index = 0,
	      matchIndex = 0,
	      result,
	      startNums,
	      color,
	      endNum,
	      chunk,
	      startNum,
	      hasRandom,
	      a;
	  pt.b = start;
	  pt.e = end;
	  start += ""; //ensure values are strings

	  end += "";

	  if (hasRandom = ~end.indexOf("random(")) {
	    end = _replaceRandom(end);
	  }

	  if (stringFilter) {
	    a = [start, end];
	    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

	    start = a[0];
	    end = a[1];
	  }

	  startNums = start.match(_complexStringNumExp) || [];

	  while (result = _complexStringNumExp.exec(end)) {
	    endNum = result[0];
	    chunk = end.substring(index, result.index);

	    if (color) {
	      color = (color + 1) % 5;
	    } else if (chunk.substr(-5) === "rgba(") {
	      color = 1;
	    }

	    if (endNum !== startNums[matchIndex++]) {
	      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

	      pt._pt = {
	        _next: pt._pt,
	        p: chunk || matchIndex === 1 ? chunk : ",",
	        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
	        s: startNum,
	        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
	        m: color && color < 4 ? Math.round : 0
	      };
	      index = _complexStringNumExp.lastIndex;
	    }
	  }

	  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

	  pt.fp = funcParam;

	  if (_relExp.test(end) || hasRandom) {
	    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
	  }

	  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

	  return pt;
	},
	    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
	  _isFunction(end) && (end = end(index || 0, target, targets));
	  var currentValue = target[prop],
	      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
	      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
	      pt;

	  if (_isString(end)) {
	    if (~end.indexOf("random(")) {
	      end = _replaceRandom(end);
	    }

	    if (end.charAt(1) === "=") {
	      pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);

	      if (pt || pt === 0) {
	        // to avoid isNaN, like if someone passes in a value like "!= whatever"
	        end = pt;
	      }
	    }
	  }

	  if (parsedStart !== end || _forceAllPropTweens) {
	    if (!isNaN(parsedStart * end) && end !== "") {
	      // fun fact: any number multiplied by "" is evaluated as the number 0!
	      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
	      funcParam && (pt.fp = funcParam);
	      modifier && pt.modifier(modifier, this, target);
	      return this._pt = pt;
	    }

	    !currentValue && !(prop in target) && _missingPlugin(prop, end);
	    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
	  }
	},
	    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
	_processVars = function _processVars(vars, index, target, targets, tween) {
	  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

	  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
	    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
	  }

	  var copy = {},
	      p;

	  for (p in vars) {
	    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
	  }

	  return copy;
	},
	    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
	  var plugin, pt, ptLookup, i;

	  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
	    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

	    if (tween !== _quickTween) {
	      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

	      i = plugin._props.length;

	      while (i--) {
	        ptLookup[plugin._props[i]] = pt;
	      }
	    }
	  }

	  return plugin;
	},
	    _overwritingTween,
	    //store a reference temporarily so we can avoid overwriting itself.
	_forceAllPropTweens,
	    _initTween = function _initTween(tween, time) {
	  var vars = tween.vars,
	      ease = vars.ease,
	      startAt = vars.startAt,
	      immediateRender = vars.immediateRender,
	      lazy = vars.lazy,
	      onUpdate = vars.onUpdate,
	      onUpdateParams = vars.onUpdateParams,
	      callbackScope = vars.callbackScope,
	      runBackwards = vars.runBackwards,
	      yoyoEase = vars.yoyoEase,
	      keyframes = vars.keyframes,
	      autoRevert = vars.autoRevert,
	      dur = tween._dur,
	      prevStartAt = tween._startAt,
	      targets = tween._targets,
	      parent = tween.parent,
	      fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
	      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
	      tl = tween.timeline,
	      cleanVars,
	      i,
	      p,
	      pt,
	      target,
	      hasPriority,
	      gsData,
	      harness,
	      plugin,
	      ptLookup,
	      index,
	      harnessVars,
	      overwritten;
	  tl && (!keyframes || !ease) && (ease = "none");
	  tween._ease = _parseEase(ease, _defaults.ease);
	  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

	  if (yoyoEase && tween._yoyo && !tween._repeat) {
	    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
	    yoyoEase = tween._yEase;
	    tween._yEase = tween._ease;
	    tween._ease = yoyoEase;
	  }

	  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

	  if (!tl || keyframes && !vars.stagger) {
	    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
	    harness = targets[0] ? _getCache(targets[0]).harness : 0;
	    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

	    cleanVars = _copyExcluding(vars, _reservedProps);

	    if (prevStartAt) {
	      _removeFromParent(prevStartAt.render(-1, true));

	      prevStartAt._lazy = 0;
	    }

	    if (startAt) {
	      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
	        data: "isStart",
	        overwrite: false,
	        parent: parent,
	        immediateRender: true,
	        lazy: _isNotFalse(lazy),
	        startAt: null,
	        delay: 0,
	        onUpdate: onUpdate,
	        onUpdateParams: onUpdateParams,
	        callbackScope: callbackScope,
	        stagger: 0
	      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


	      time < 0 && !immediateRender && !autoRevert && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

	      if (immediateRender) {
	        time > 0 && !autoRevert && (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.

	        if (dur && time <= 0) {
	          time && (tween._zTime = time);
	          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
	        } // if (time > 0) {
	        // 	autoRevert || (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
	        // } else if (dur && !(time < 0 && prevStartAt)) {
	        // 	time && (tween._zTime = time);
	        // 	return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
	        // }

	      } else if (autoRevert === false) {
	        tween._startAt = 0;
	      }
	    } else if (runBackwards && dur) {
	      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
	      if (prevStartAt) {
	        !autoRevert && (tween._startAt = 0);
	      } else {
	        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

	        p = _setDefaults({
	          overwrite: false,
	          data: "isFromStart",
	          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
	          lazy: immediateRender && _isNotFalse(lazy),
	          immediateRender: immediateRender,
	          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
	          stagger: 0,
	          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

	        }, cleanVars);
	        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

	        _removeFromParent(tween._startAt = Tween.set(targets, p));

	        time < 0 && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted from() tween.

	        tween._zTime = time;

	        if (!immediateRender) {
	          _initTween(tween._startAt, _tinyNum); //ensures that the initial values are recorded

	        } else if (!time) {
	          return;
	        }
	      }
	    }

	    tween._pt = tween._ptCache = 0;
	    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

	    for (i = 0; i < targets.length; i++) {
	      target = targets[i];
	      gsData = target._gsap || _harness(targets)[i]._gsap;
	      tween._ptLookup[i] = ptLookup = {};
	      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

	      index = fullTargets === targets ? i : fullTargets.indexOf(target);

	      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
	        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

	        plugin._props.forEach(function (name) {
	          ptLookup[name] = pt;
	        });

	        plugin.priority && (hasPriority = 1);
	      }

	      if (!harness || harnessVars) {
	        for (p in cleanVars) {
	          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
	            plugin.priority && (hasPriority = 1);
	          } else {
	            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
	          }
	        }
	      }

	      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

	      if (autoOverwrite && tween._pt) {
	        _overwritingTween = tween;

	        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!


	        overwritten = !tween.parent;
	        _overwritingTween = 0;
	      }

	      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
	    }

	    hasPriority && _sortPropTweensByPriority(tween);
	    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
	  }

	  tween._onUpdate = onUpdate;
	  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

	  keyframes && time <= 0 && tl.render(_bigNum, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
	},
	    _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
	  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
	      pt,
	      lookup,
	      i;

	  if (!ptCache) {
	    ptCache = tween._ptCache[property] = [];
	    lookup = tween._ptLookup;
	    i = tween._targets.length;

	    while (i--) {
	      pt = lookup[i][property];

	      if (pt && pt.d && pt.d._pt) {
	        // it's a plugin, so find the nested PropTween
	        pt = pt.d._pt;

	        while (pt && pt.p !== property) {
	          pt = pt._next;
	        }
	      }

	      if (!pt) {
	        // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
	        // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
	        _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

	        tween.vars[property] = "+=0";

	        _initTween(tween, time);

	        _forceAllPropTweens = 0;
	        return 1;
	      }

	      ptCache.push(pt);
	    }
	  }

	  i = ptCache.length;

	  while (i--) {
	    pt = ptCache[i];
	    pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
	    pt.c = value - pt.s;
	    pt.e && (pt.e = _round(value) + getUnit(pt.e)); // mainly for CSSPlugin (end value)

	    pt.b && (pt.b = pt.s + getUnit(pt.b)); // (beginning value)
	  }
	},
	    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
	  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
	      propertyAliases = harness && harness.aliases,
	      copy,
	      p,
	      i,
	      aliases;

	  if (!propertyAliases) {
	    return vars;
	  }

	  copy = _merge({}, vars);

	  for (p in propertyAliases) {
	    if (p in copy) {
	      aliases = propertyAliases[p].split(",");
	      i = aliases.length;

	      while (i--) {
	        copy[aliases[i]] = copy[p];
	      }
	    }
	  }

	  return copy;
	},
	    // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
	_parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
	  var ease = obj.ease || easeEach || "power1.inOut",
	      p,
	      a;

	  if (_isArray(obj)) {
	    a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

	    obj.forEach(function (value, i) {
	      return a.push({
	        t: i / (obj.length - 1) * 100,
	        v: value,
	        e: ease
	      });
	    });
	  } else {
	    for (p in obj) {
	      a = allProps[p] || (allProps[p] = []);
	      p === "ease" || a.push({
	        t: parseFloat(prop),
	        v: obj[p],
	        e: ease
	      });
	    }
	  }
	},
	    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
	  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
	},
	    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
	    _staggerPropsToSkip = {};

	_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
	  return _staggerPropsToSkip[name] = 1;
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * TWEEN
	 * --------------------------------------------------------------------------------------
	 */


	var Tween = /*#__PURE__*/function (_Animation2) {
	  _inheritsLoose(Tween, _Animation2);

	  function Tween(targets, vars, position, skipInherit) {
	    var _this3;

	    if (typeof vars === "number") {
	      position.duration = vars;
	      vars = position;
	      position = null;
	    }

	    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
	    var _this3$vars = _this3.vars,
	        duration = _this3$vars.duration,
	        delay = _this3$vars.delay,
	        immediateRender = _this3$vars.immediateRender,
	        stagger = _this3$vars.stagger,
	        overwrite = _this3$vars.overwrite,
	        keyframes = _this3$vars.keyframes,
	        defaults = _this3$vars.defaults,
	        scrollTrigger = _this3$vars.scrollTrigger,
	        yoyoEase = _this3$vars.yoyoEase,
	        parent = vars.parent || _globalTimeline,
	        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
	        tl,
	        i,
	        copy,
	        l,
	        p,
	        curTarget,
	        staggerFunc,
	        staggerVarsToMerge;
	    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
	    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

	    _this3._overwrite = overwrite;

	    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
	      vars = _this3.vars;
	      tl = _this3.timeline = new Timeline({
	        data: "nested",
	        defaults: defaults || {}
	      });
	      tl.kill();
	      tl.parent = tl._dp = _assertThisInitialized(_this3);
	      tl._start = 0;

	      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
	        l = parsedTargets.length;
	        staggerFunc = stagger && distribute(stagger);

	        if (_isObject(stagger)) {
	          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
	          for (p in stagger) {
	            if (~_staggerTweenProps.indexOf(p)) {
	              staggerVarsToMerge || (staggerVarsToMerge = {});
	              staggerVarsToMerge[p] = stagger[p];
	            }
	          }
	        }

	        for (i = 0; i < l; i++) {
	          copy = _copyExcluding(vars, _staggerPropsToSkip);
	          copy.stagger = 0;
	          yoyoEase && (copy.yoyoEase = yoyoEase);
	          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
	          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

	          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
	          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

	          if (!stagger && l === 1 && copy.delay) {
	            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
	            _this3._delay = delay = copy.delay;
	            _this3._start += delay;
	            copy.delay = 0;
	          }

	          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
	          tl._ease = _easeMap.none;
	        }

	        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
	      } else if (keyframes) {
	        _inheritDefaults(_setDefaults(tl.vars.defaults, {
	          ease: "none"
	        }));

	        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
	        var time = 0,
	            a,
	            kf,
	            v;

	        if (_isArray(keyframes)) {
	          keyframes.forEach(function (frame) {
	            return tl.to(parsedTargets, frame, ">");
	          });
	        } else {
	          copy = {};

	          for (p in keyframes) {
	            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
	          }

	          for (p in copy) {
	            a = copy[p].sort(function (a, b) {
	              return a.t - b.t;
	            });
	            time = 0;

	            for (i = 0; i < a.length; i++) {
	              kf = a[i];
	              v = {
	                ease: kf.e,
	                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
	              };
	              v[p] = kf.v;
	              tl.to(parsedTargets, v, time);
	              time += v.duration;
	            }
	          }

	          tl.duration() < duration && tl.to({}, {
	            duration: duration - tl.duration()
	          }); // in case keyframes didn't go to 100%
	        }
	      }

	      duration || _this3.duration(duration = tl.duration());
	    } else {
	      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
	    }

	    if (overwrite === true && !_suppressOverwrites) {
	      _overwritingTween = _assertThisInitialized(_this3);

	      _globalTimeline.killTweensOf(parsedTargets);

	      _overwritingTween = 0;
	    }

	    _addToTimeline(parent, _assertThisInitialized(_this3), position);

	    vars.reversed && _this3.reverse();
	    vars.paused && _this3.paused(true);

	    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
	      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

	      _this3.render(Math.max(0, -delay)); //in case delay is negative

	    }

	    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
	    return _this3;
	  }

	  var _proto3 = Tween.prototype;

	  _proto3.render = function render(totalTime, suppressEvents, force) {
	    var prevTime = this._time,
	        tDur = this._tDur,
	        dur = this._dur,
	        tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
	        time,
	        pt,
	        iteration,
	        cycleDuration,
	        prevIteration,
	        isYoyo,
	        ratio,
	        timeline,
	        yoyoEase;

	    if (!dur) {
	      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
	    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
	      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
	      time = tTime;
	      timeline = this.timeline;

	      if (this._repeat) {
	        //adjust the time for repeats and yoyos
	        cycleDuration = dur + this._rDelay;

	        if (this._repeat < -1 && totalTime < 0) {
	          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
	        }

	        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

	        if (tTime === tDur) {
	          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
	          iteration = this._repeat;
	          time = dur;
	        } else {
	          iteration = ~~(tTime / cycleDuration);

	          if (iteration && iteration === tTime / cycleDuration) {
	            time = dur;
	            iteration--;
	          }

	          time > dur && (time = dur);
	        }

	        isYoyo = this._yoyo && iteration & 1;

	        if (isYoyo) {
	          yoyoEase = this._yEase;
	          time = dur - time;
	        }

	        prevIteration = _animationCycle(this._tTime, cycleDuration);

	        if (time === prevTime && !force && this._initted) {
	          //could be during the repeatDelay part. No need to render and fire callbacks.
	          this._tTime = tTime;
	          return this;
	        }

	        if (iteration !== prevIteration) {
	          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

	          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
	            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

	            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
	          }
	        }
	      }

	      if (!this._initted) {
	        if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
	          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

	          return this;
	        }

	        if (prevTime !== this._time) {
	          // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
	          return this;
	        }

	        if (dur !== this._dur) {
	          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
	          return this.render(totalTime, suppressEvents, force);
	        }
	      }

	      this._tTime = tTime;
	      this._time = time;

	      if (!this._act && this._ts) {
	        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

	        this._lazy = 0;
	      }

	      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

	      if (this._from) {
	        this.ratio = ratio = 1 - ratio;
	      }

	      if (time && !prevTime && !suppressEvents) {
	        _callback(this, "onStart");

	        if (this._tTime !== tTime) {
	          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
	          return this;
	        }
	      }

	      pt = this._pt;

	      while (pt) {
	        pt.r(ratio, pt.d);
	        pt = pt._next;
	      }

	      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);

	      if (this._onUpdate && !suppressEvents) {
	        totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

	        _callback(this, "onUpdate");
	      }

	      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

	      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
	        totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
	        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

	        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
	          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
	          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

	          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
	        }
	      }
	    }

	    return this;
	  };

	  _proto3.targets = function targets() {
	    return this._targets;
	  };

	  _proto3.invalidate = function invalidate() {
	    this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
	    this._ptLookup = [];
	    this.timeline && this.timeline.invalidate();
	    return _Animation2.prototype.invalidate.call(this);
	  };

	  _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
	    _tickerActive || _ticker.wake();
	    this._ts || this.play();
	    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
	        ratio;
	    this._initted || _initTween(this, time);
	    ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
	    // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
	    // if (_isObject(property)) { // performance optimization
	    // 	for (p in property) {
	    // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
	    // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
	    // 		}
	    // 	}
	    // } else {

	    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
	      return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
	    } //}


	    _alignPlayhead(this, 0);

	    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
	    return this.render(0);
	  };

	  _proto3.kill = function kill(targets, vars) {
	    if (vars === void 0) {
	      vars = "all";
	    }

	    if (!targets && (!vars || vars === "all")) {
	      this._lazy = this._pt = 0;
	      return this.parent ? _interrupt(this) : this;
	    }

	    if (this.timeline) {
	      var tDur = this.timeline.totalDuration();
	      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

	      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

	      return this;
	    }

	    var parsedTargets = this._targets,
	        killingTargets = targets ? toArray(targets) : parsedTargets,
	        propTweenLookup = this._ptLookup,
	        firstPT = this._pt,
	        overwrittenProps,
	        curLookup,
	        curOverwriteProps,
	        props,
	        p,
	        pt,
	        i;

	    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
	      vars === "all" && (this._pt = 0);
	      return _interrupt(this);
	    }

	    overwrittenProps = this._op = this._op || [];

	    if (vars !== "all") {
	      //so people can pass in a comma-delimited list of property names
	      if (_isString(vars)) {
	        p = {};

	        _forEachName(vars, function (name) {
	          return p[name] = 1;
	        });

	        vars = p;
	      }

	      vars = _addAliasesToVars(parsedTargets, vars);
	    }

	    i = parsedTargets.length;

	    while (i--) {
	      if (~killingTargets.indexOf(parsedTargets[i])) {
	        curLookup = propTweenLookup[i];

	        if (vars === "all") {
	          overwrittenProps[i] = vars;
	          props = curLookup;
	          curOverwriteProps = {};
	        } else {
	          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
	          props = vars;
	        }

	        for (p in props) {
	          pt = curLookup && curLookup[p];

	          if (pt) {
	            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
	              _removeLinkedListItem(this, pt, "_pt");
	            }

	            delete curLookup[p];
	          }

	          if (curOverwriteProps !== "all") {
	            curOverwriteProps[p] = 1;
	          }
	        }
	      }
	    }

	    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

	    return this;
	  };

	  Tween.to = function to(targets, vars) {
	    return new Tween(targets, vars, arguments[2]);
	  };

	  Tween.from = function from(targets, vars) {
	    return _createTweenType(1, arguments);
	  };

	  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
	    return new Tween(callback, 0, {
	      immediateRender: false,
	      lazy: false,
	      overwrite: false,
	      delay: delay,
	      onComplete: callback,
	      onReverseComplete: callback,
	      onCompleteParams: params,
	      onReverseCompleteParams: params,
	      callbackScope: scope
	    });
	  };

	  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
	    return _createTweenType(2, arguments);
	  };

	  Tween.set = function set(targets, vars) {
	    vars.duration = 0;
	    vars.repeatDelay || (vars.repeat = 0);
	    return new Tween(targets, vars);
	  };

	  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
	    return _globalTimeline.killTweensOf(targets, props, onlyActive);
	  };

	  return Tween;
	}(Animation);

	_setDefaults(Tween.prototype, {
	  _targets: [],
	  _lazy: 0,
	  _startAt: 0,
	  _op: 0,
	  _onInit: 0
	}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
	// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
	// 	Tween.prototype[name] = function() {
	// 		let tl = new Timeline();
	// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
	// 	}
	// });
	//for backward compatibility. Leverage the timeline calls.


	_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
	  Tween[name] = function () {
	    var tl = new Timeline(),
	        params = _slice.call(arguments, 0);

	    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
	    return tl[name].apply(tl, params);
	  };
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * PROPTWEEN
	 * --------------------------------------------------------------------------------------
	 */


	var _setterPlain = function _setterPlain(target, property, value) {
	  return target[property] = value;
	},
	    _setterFunc = function _setterFunc(target, property, value) {
	  return target[property](value);
	},
	    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
	  return target[property](data.fp, value);
	},
	    _setterAttribute = function _setterAttribute(target, property, value) {
	  return target.setAttribute(property, value);
	},
	    _getSetter = function _getSetter(target, property) {
	  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
	},
	    _renderPlain = function _renderPlain(ratio, data) {
	  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
	},
	    _renderBoolean = function _renderBoolean(ratio, data) {
	  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
	},
	    _renderComplexString = function _renderComplexString(ratio, data) {
	  var pt = data._pt,
	      s = "";

	  if (!ratio && data.b) {
	    //b = beginning string
	    s = data.b;
	  } else if (ratio === 1 && data.e) {
	    //e = ending string
	    s = data.e;
	  } else {
	    while (pt) {
	      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

	      pt = pt._next;
	    }

	    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
	  }

	  data.set(data.t, data.p, s, data);
	},
	    _renderPropTweens = function _renderPropTweens(ratio, data) {
	  var pt = data._pt;

	  while (pt) {
	    pt.r(ratio, pt.d);
	    pt = pt._next;
	  }
	},
	    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
	  var pt = this._pt,
	      next;

	  while (pt) {
	    next = pt._next;
	    pt.p === property && pt.modifier(modifier, tween, target);
	    pt = next;
	  }
	},
	    _killPropTweensOf = function _killPropTweensOf(property) {
	  var pt = this._pt,
	      hasNonDependentRemaining,
	      next;

	  while (pt) {
	    next = pt._next;

	    if (pt.p === property && !pt.op || pt.op === property) {
	      _removeLinkedListItem(this, pt, "_pt");
	    } else if (!pt.dep) {
	      hasNonDependentRemaining = 1;
	    }

	    pt = next;
	  }

	  return !hasNonDependentRemaining;
	},
	    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
	  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
	},
	    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
	  var pt = parent._pt,
	      next,
	      pt2,
	      first,
	      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

	  while (pt) {
	    next = pt._next;
	    pt2 = first;

	    while (pt2 && pt2.pr > pt.pr) {
	      pt2 = pt2._next;
	    }

	    if (pt._prev = pt2 ? pt2._prev : last) {
	      pt._prev._next = pt;
	    } else {
	      first = pt;
	    }

	    if (pt._next = pt2) {
	      pt2._prev = pt;
	    } else {
	      last = pt;
	    }

	    pt = next;
	  }

	  parent._pt = first;
	}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


	var PropTween = /*#__PURE__*/function () {
	  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
	    this.t = target;
	    this.s = start;
	    this.c = change;
	    this.p = prop;
	    this.r = renderer || _renderPlain;
	    this.d = data || this;
	    this.set = setter || _setterPlain;
	    this.pr = priority || 0;
	    this._next = next;

	    if (next) {
	      next._prev = this;
	    }
	  }

	  var _proto4 = PropTween.prototype;

	  _proto4.modifier = function modifier(func, tween, target) {
	    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

	    this.set = _setterWithModifier;
	    this.m = func;
	    this.mt = target; //modifier target

	    this.tween = tween;
	  };

	  return PropTween;
	}(); //Initialization tasks

	_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
	  return _reservedProps[name] = 1;
	});

	_globals.TweenMax = _globals.TweenLite = Tween;
	_globals.TimelineLite = _globals.TimelineMax = Timeline;
	_globalTimeline = new Timeline({
	  sortChildren: false,
	  defaults: _defaults,
	  autoRemoveChildren: true,
	  id: "root",
	  smoothChildTiming: true
	});
	_config.stringFilter = _colorStringFilter;
	/*
	 * --------------------------------------------------------------------------------------
	 * GSAP
	 * --------------------------------------------------------------------------------------
	 */

	var _gsap = {
	  registerPlugin: function registerPlugin() {
	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    args.forEach(function (config) {
	      return _createPlugin(config);
	    });
	  },
	  timeline: function timeline(vars) {
	    return new Timeline(vars);
	  },
	  getTweensOf: function getTweensOf(targets, onlyActive) {
	    return _globalTimeline.getTweensOf(targets, onlyActive);
	  },
	  getProperty: function getProperty(target, property, unit, uncache) {
	    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

	    var getter = _getCache(target || {}).get,
	        format = unit ? _passThrough : _numericIfPossible;

	    unit === "native" && (unit = "");
	    return !target ? target : !property ? function (property, unit, uncache) {
	      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
	    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
	  },
	  quickSetter: function quickSetter(target, property, unit) {
	    target = toArray(target);

	    if (target.length > 1) {
	      var setters = target.map(function (t) {
	        return gsap.quickSetter(t, property, unit);
	      }),
	          l = setters.length;
	      return function (value) {
	        var i = l;

	        while (i--) {
	          setters[i](value);
	        }
	      };
	    }

	    target = target[0] || {};

	    var Plugin = _plugins[property],
	        cache = _getCache(target),
	        p = cache.harness && (cache.harness.aliases || {})[property] || property,
	        // in case it's an alias, like "rotate" for "rotation".
	    setter = Plugin ? function (value) {
	      var p = new Plugin();
	      _quickTween._pt = 0;
	      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
	      p.render(1, p);
	      _quickTween._pt && _renderPropTweens(1, _quickTween);
	    } : cache.set(target, p);

	    return Plugin ? setter : function (value) {
	      return setter(target, p, unit ? value + unit : value, cache, 1);
	    };
	  },
	  quickTo: function quickTo(target, property, vars) {
	    var _merge2;

	    var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
	        func = function func(value, start, startIsRelative) {
	      return tween.resetTo(property, value, start, startIsRelative);
	    };

	    func.tween = tween;
	    return func;
	  },
	  isTweening: function isTweening(targets) {
	    return _globalTimeline.getTweensOf(targets, true).length > 0;
	  },
	  defaults: function defaults(value) {
	    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
	    return _mergeDeep(_defaults, value || {});
	  },
	  config: function config(value) {
	    return _mergeDeep(_config, value || {});
	  },
	  registerEffect: function registerEffect(_ref3) {
	    var name = _ref3.name,
	        effect = _ref3.effect,
	        plugins = _ref3.plugins,
	        defaults = _ref3.defaults,
	        extendTimeline = _ref3.extendTimeline;
	    (plugins || "").split(",").forEach(function (pluginName) {
	      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
	    });

	    _effects[name] = function (targets, vars, tl) {
	      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
	    };

	    if (extendTimeline) {
	      Timeline.prototype[name] = function (targets, vars, position) {
	        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
	      };
	    }
	  },
	  registerEase: function registerEase(name, ease) {
	    _easeMap[name] = _parseEase(ease);
	  },
	  parseEase: function parseEase(ease, defaultEase) {
	    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
	  },
	  getById: function getById(id) {
	    return _globalTimeline.getById(id);
	  },
	  exportRoot: function exportRoot(vars, includeDelayedCalls) {
	    if (vars === void 0) {
	      vars = {};
	    }

	    var tl = new Timeline(vars),
	        child,
	        next;
	    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

	    _globalTimeline.remove(tl);

	    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

	    tl._time = tl._tTime = _globalTimeline._time;
	    child = _globalTimeline._first;

	    while (child) {
	      next = child._next;

	      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
	        _addToTimeline(tl, child, child._start - child._delay);
	      }

	      child = next;
	    }

	    _addToTimeline(_globalTimeline, tl, 0);

	    return tl;
	  },
	  utils: {
	    wrap: wrap,
	    wrapYoyo: wrapYoyo,
	    distribute: distribute,
	    random: random,
	    snap: snap,
	    normalize: normalize,
	    getUnit: getUnit,
	    clamp: clamp,
	    splitColor: splitColor,
	    toArray: toArray,
	    selector: selector,
	    mapRange: mapRange,
	    pipe: pipe,
	    unitize: unitize,
	    interpolate: interpolate,
	    shuffle: shuffle
	  },
	  install: _install,
	  effects: _effects,
	  ticker: _ticker,
	  updateRoot: Timeline.updateRoot,
	  plugins: _plugins,
	  globalTimeline: _globalTimeline,
	  core: {
	    PropTween: PropTween,
	    globals: _addGlobal,
	    Tween: Tween,
	    Timeline: Timeline,
	    Animation: Animation,
	    getCache: _getCache,
	    _removeLinkedListItem: _removeLinkedListItem,
	    suppressOverwrites: function suppressOverwrites(value) {
	      return _suppressOverwrites = value;
	    }
	  }
	};

	_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
	  return _gsap[name] = Tween[name];
	});

	_ticker.add(Timeline.updateRoot);

	_quickTween = _gsap.to({}, {
	  duration: 0
	}); // ---- EXTRA PLUGINS --------------------------------------------------------

	var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
	  var pt = plugin._pt;

	  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
	    pt = pt._next;
	  }

	  return pt;
	},
	    _addModifiers = function _addModifiers(tween, modifiers) {
	  var targets = tween._targets,
	      p,
	      i,
	      pt;

	  for (p in modifiers) {
	    i = targets.length;

	    while (i--) {
	      pt = tween._ptLookup[i][p];

	      if (pt && (pt = pt.d)) {
	        if (pt._pt) {
	          // is a plugin
	          pt = _getPluginPropTween(pt, p);
	        }

	        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
	      }
	    }
	  }
	},
	    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
	  return {
	    name: name,
	    rawVars: 1,
	    //don't pre-process function-based values or "random()" strings.
	    init: function init(target, vars, tween) {
	      tween._onInit = function (tween) {
	        var temp, p;

	        if (_isString(vars)) {
	          temp = {};

	          _forEachName(vars, function (name) {
	            return temp[name] = 1;
	          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


	          vars = temp;
	        }

	        if (modifier) {
	          temp = {};

	          for (p in vars) {
	            temp[p] = modifier(vars[p]);
	          }

	          vars = temp;
	        }

	        _addModifiers(tween, vars);
	      };
	    }
	  };
	}; //register core plugins


	var gsap = _gsap.registerPlugin({
	  name: "attr",
	  init: function init(target, vars, tween, index, targets) {
	    var p, pt;

	    for (p in vars) {
	      pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
	      pt && (pt.op = p);

	      this._props.push(p);
	    }
	  }
	}, {
	  name: "endArray",
	  init: function init(target, value) {
	    var i = value.length;

	    while (i--) {
	      this.add(target, i, target[i] || 0, value[i]);
	    }
	  }
	}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

	Tween.version = Timeline.version = gsap.version = "3.10.4";
	_coreReady = 1;
	_windowExists() && _wake();

	/*!
	 * CSSPlugin 3.10.4
	 * https://greensock.com
	 *
	 * Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	var _win$1,
	    _doc$1,
	    _docElement,
	    _pluginInitted,
	    _tempDiv,
	    _recentSetterPlugin,
	    _windowExists$1 = function _windowExists() {
	  return typeof window !== "undefined";
	},
	    _transformProps = {},
	    _RAD2DEG = 180 / Math.PI,
	    _DEG2RAD = Math.PI / 180,
	    _atan2 = Math.atan2,
	    _bigNum$1 = 1e8,
	    _capsExp = /([A-Z])/g,
	    _horizontalExp = /(left|right|width|margin|padding|x)/i,
	    _complexExp = /[\s,\(]\S/,
	    _propertyAliases = {
	  autoAlpha: "opacity,visibility",
	  scale: "scaleX,scaleY",
	  alpha: "opacity"
	},
	    _renderCSSProp = function _renderCSSProp(ratio, data) {
	  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
	},
	    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
	  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
	},
	    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
	  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
	},
	    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
	_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
	  var value = data.s + data.c * ratio;
	  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
	},
	    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
	  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
	},
	    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
	  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
	},
	    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
	  return target.style[property] = value;
	},
	    _setterCSSProp = function _setterCSSProp(target, property, value) {
	  return target.style.setProperty(property, value);
	},
	    _setterTransform = function _setterTransform(target, property, value) {
	  return target._gsap[property] = value;
	},
	    _setterScale = function _setterScale(target, property, value) {
	  return target._gsap.scaleX = target._gsap.scaleY = value;
	},
	    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
	  var cache = target._gsap;
	  cache.scaleX = cache.scaleY = value;
	  cache.renderTransform(ratio, cache);
	},
	    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
	  var cache = target._gsap;
	  cache[property] = value;
	  cache.renderTransform(ratio, cache);
	},
	    _transformProp = "transform",
	    _transformOriginProp = _transformProp + "Origin",
	    _supports3D,
	    _createElement = function _createElement(type, ns) {
	  var e = _doc$1.createElementNS ? _doc$1.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc$1.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

	  return e.style ? e : _doc$1.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
	},
	    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
	  var cs = getComputedStyle(target);
	  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
	},
	    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
	    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
	  var e = element || _tempDiv,
	      s = e.style,
	      i = 5;

	  if (property in s && !preferPrefix) {
	    return property;
	  }

	  property = property.charAt(0).toUpperCase() + property.substr(1);

	  while (i-- && !(_prefixes[i] + property in s)) {}

	  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
	},
	    _initCore = function _initCore() {
	  if (_windowExists$1() && window.document) {
	    _win$1 = window;
	    _doc$1 = _win$1.document;
	    _docElement = _doc$1.documentElement;
	    _tempDiv = _createElement("div") || {
	      style: {}
	    };
	    _createElement("div");
	    _transformProp = _checkPropPrefix(_transformProp);
	    _transformOriginProp = _transformProp + "Origin";
	    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

	    _supports3D = !!_checkPropPrefix("perspective");
	    _pluginInitted = 1;
	  }
	},
	    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
	  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
	  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
	      oldParent = this.parentNode,
	      oldSibling = this.nextSibling,
	      oldCSS = this.style.cssText,
	      bbox;

	  _docElement.appendChild(svg);

	  svg.appendChild(this);
	  this.style.display = "block";

	  if (swapIfPossible) {
	    try {
	      bbox = this.getBBox();
	      this._gsapBBox = this.getBBox; //store the original

	      this.getBBox = _getBBoxHack;
	    } catch (e) {}
	  } else if (this._gsapBBox) {
	    bbox = this._gsapBBox();
	  }

	  if (oldParent) {
	    if (oldSibling) {
	      oldParent.insertBefore(this, oldSibling);
	    } else {
	      oldParent.appendChild(this);
	    }
	  }

	  _docElement.removeChild(svg);

	  this.style.cssText = oldCSS;
	  return bbox;
	},
	    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
	  var i = attributesArray.length;

	  while (i--) {
	    if (target.hasAttribute(attributesArray[i])) {
	      return target.getAttribute(attributesArray[i]);
	    }
	  }
	},
	    _getBBox = function _getBBox(target) {
	  var bounds;

	  try {
	    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
	  } catch (error) {
	    bounds = _getBBoxHack.call(target, true);
	  }

	  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

	  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
	    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
	    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
	    width: 0,
	    height: 0
	  } : bounds;
	},
	    _isSVG = function _isSVG(e) {
	  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
	},
	    //reports if the element is an SVG on which getBBox() actually works
	_removeProperty = function _removeProperty(target, property) {
	  if (property) {
	    var style = target.style;

	    if (property in _transformProps && property !== _transformOriginProp) {
	      property = _transformProp;
	    }

	    if (style.removeProperty) {
	      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
	        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
	        property = "-" + property;
	      }

	      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
	    } else {
	      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
	      style.removeAttribute(property);
	    }
	  }
	},
	    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
	  var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
	  plugin._pt = pt;
	  pt.b = beginning;
	  pt.e = end;

	  plugin._props.push(property);

	  return pt;
	},
	    _nonConvertibleUnits = {
	  deg: 1,
	  rad: 1,
	  turn: 1
	},
	    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
	_convertToUnit = function _convertToUnit(target, property, value, unit) {
	  var curValue = parseFloat(value) || 0,
	      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
	      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
	  style = _tempDiv.style,
	      horizontal = _horizontalExp.test(property),
	      isRootSVG = target.tagName.toLowerCase() === "svg",
	      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
	      amount = 100,
	      toPixels = unit === "px",
	      toPercent = unit === "%",
	      px,
	      parent,
	      cache,
	      isSVG;

	  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
	    return curValue;
	  }

	  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
	  isSVG = target.getCTM && _isSVG(target);

	  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
	    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
	    return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
	  }

	  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
	  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

	  if (isSVG) {
	    parent = (target.ownerSVGElement || {}).parentNode;
	  }

	  if (!parent || parent === _doc$1 || !parent.appendChild) {
	    parent = _doc$1.body;
	  }

	  cache = parent._gsap;

	  if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time) {
	    return _round(curValue / cache.width * amount);
	  } else {
	    (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
	    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

	    parent.appendChild(_tempDiv);
	    px = _tempDiv[measureProperty];
	    parent.removeChild(_tempDiv);
	    style.position = "absolute";

	    if (horizontal && toPercent) {
	      cache = _getCache(parent);
	      cache.time = _ticker.time;
	      cache.width = parent[measureProperty];
	    }
	  }

	  return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
	},
	    _get = function _get(target, property, unit, uncache) {
	  var value;
	  _pluginInitted || _initCore();

	  if (property in _propertyAliases && property !== "transform") {
	    property = _propertyAliases[property];

	    if (~property.indexOf(",")) {
	      property = property.split(",")[0];
	    }
	  }

	  if (_transformProps[property] && property !== "transform") {
	    value = _parseTransform(target, uncache);
	    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
	  } else {
	    value = target.style[property];

	    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
	      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
	    }
	  }

	  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
	},
	    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
	  // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
	  if (!start || start === "none") {
	    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
	    var p = _checkPropPrefix(prop, target, 1),
	        s = p && _getComputedProperty(target, p, 1);

	    if (s && s !== start) {
	      prop = p;
	      start = s;
	    } else if (prop === "borderColor") {
	      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
	    }
	  }

	  var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
	      index = 0,
	      matchIndex = 0,
	      a,
	      result,
	      startValues,
	      startNum,
	      color,
	      startValue,
	      endValue,
	      endNum,
	      chunk,
	      endUnit,
	      startUnit,
	      endValues;
	  pt.b = start;
	  pt.e = end;
	  start += ""; // ensure values are strings

	  end += "";

	  if (end === "auto") {
	    target.style[prop] = end;
	    end = _getComputedProperty(target, prop) || end;
	    target.style[prop] = start;
	  }

	  a = [start, end];

	  _colorStringFilter(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().


	  start = a[0];
	  end = a[1];
	  startValues = start.match(_numWithUnitExp) || [];
	  endValues = end.match(_numWithUnitExp) || [];

	  if (endValues.length) {
	    while (result = _numWithUnitExp.exec(end)) {
	      endValue = result[0];
	      chunk = end.substring(index, result.index);

	      if (color) {
	        color = (color + 1) % 5;
	      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
	        color = 1;
	      }

	      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
	        startNum = parseFloat(startValue) || 0;
	        startUnit = startValue.substr((startNum + "").length);
	        endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
	        endNum = parseFloat(endValue);
	        endUnit = endValue.substr((endNum + "").length);
	        index = _numWithUnitExp.lastIndex - endUnit.length;

	        if (!endUnit) {
	          //if something like "perspective:300" is passed in and we must add a unit to the end
	          endUnit = endUnit || _config.units[prop] || startUnit;

	          if (index === end.length) {
	            end += endUnit;
	            pt.e += endUnit;
	          }
	        }

	        if (startUnit !== endUnit) {
	          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
	        } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


	        pt._pt = {
	          _next: pt._pt,
	          p: chunk || matchIndex === 1 ? chunk : ",",
	          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
	          s: startNum,
	          c: endNum - startNum,
	          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
	        };
	      }
	    }

	    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
	  } else {
	    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
	  }

	  _relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

	  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

	  return pt;
	},
	    _keywordToPercent = {
	  top: "0%",
	  bottom: "100%",
	  left: "0%",
	  right: "100%",
	  center: "50%"
	},
	    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
	  var split = value.split(" "),
	      x = split[0],
	      y = split[1] || "50%";

	  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
	    //the user provided them in the wrong order, so flip them
	    value = x;
	    x = y;
	    y = value;
	  }

	  split[0] = _keywordToPercent[x] || x;
	  split[1] = _keywordToPercent[y] || y;
	  return split.join(" ");
	},
	    _renderClearProps = function _renderClearProps(ratio, data) {
	  if (data.tween && data.tween._time === data.tween._dur) {
	    var target = data.t,
	        style = target.style,
	        props = data.u,
	        cache = target._gsap,
	        prop,
	        clearTransforms,
	        i;

	    if (props === "all" || props === true) {
	      style.cssText = "";
	      clearTransforms = 1;
	    } else {
	      props = props.split(",");
	      i = props.length;

	      while (--i > -1) {
	        prop = props[i];

	        if (_transformProps[prop]) {
	          clearTransforms = 1;
	          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
	        }

	        _removeProperty(target, prop);
	      }
	    }

	    if (clearTransforms) {
	      _removeProperty(target, _transformProp);

	      if (cache) {
	        cache.svg && target.removeAttribute("transform");

	        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


	        cache.uncache = 1;
	      }
	    }
	  }
	},
	    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
	_specialProps = {
	  clearProps: function clearProps(plugin, target, property, endValue, tween) {
	    if (tween.data !== "isFromStart") {
	      var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
	      pt.u = endValue;
	      pt.pr = -10;
	      pt.tween = tween;

	      plugin._props.push(property);

	      return 1;
	    }
	  }
	  /* className feature (about 0.4kb gzipped).
	  , className(plugin, target, property, endValue, tween) {
	  	let _renderClassName = (ratio, data) => {
	  			data.css.render(ratio, data.css);
	  			if (!ratio || ratio === 1) {
	  				let inline = data.rmv,
	  					target = data.t,
	  					p;
	  				target.setAttribute("class", ratio ? data.e : data.b);
	  				for (p in inline) {
	  					_removeProperty(target, p);
	  				}
	  			}
	  		},
	  		_getAllStyles = (target) => {
	  			let styles = {},
	  				computed = getComputedStyle(target),
	  				p;
	  			for (p in computed) {
	  				if (isNaN(p) && p !== "cssText" && p !== "length") {
	  					styles[p] = computed[p];
	  				}
	  			}
	  			_setDefaults(styles, _parseTransform(target, 1));
	  			return styles;
	  		},
	  		startClassList = target.getAttribute("class"),
	  		style = target.style,
	  		cssText = style.cssText,
	  		cache = target._gsap,
	  		classPT = cache.classPT,
	  		inlineToRemoveAtEnd = {},
	  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
	  		changingVars = {},
	  		startVars = _getAllStyles(target),
	  		transformRelated = /(transform|perspective)/i,
	  		endVars, p;
	  	if (classPT) {
	  		classPT.r(1, classPT.d);
	  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
	  	}
	  	target.setAttribute("class", data.e);
	  	endVars = _getAllStyles(target, true);
	  	target.setAttribute("class", startClassList);
	  	for (p in endVars) {
	  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
	  			changingVars[p] = endVars[p];
	  			if (!style[p] && style[p] !== "0") {
	  				inlineToRemoveAtEnd[p] = 1;
	  			}
	  		}
	  	}
	  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
	  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
	  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
	  	}
	  	_parseTransform(target, true); //to clear the caching of transforms
	  	data.css = new gsap.plugins.css();
	  	data.css.init(target, changingVars, tween);
	  	plugin._props.push(...data.css._props);
	  	return 1;
	  }
	  */

	},

	/*
	 * --------------------------------------------------------------------------------------
	 * TRANSFORMS
	 * --------------------------------------------------------------------------------------
	 */
	_identity2DMatrix = [1, 0, 0, 1, 0, 0],
	    _rotationalProperties = {},
	    _isNullTransform = function _isNullTransform(value) {
	  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
	},
	    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
	  var matrixString = _getComputedProperty(target, _transformProp);

	  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
	},
	    _getMatrix = function _getMatrix(target, force2D) {
	  var cache = target._gsap || _getCache(target),
	      style = target.style,
	      matrix = _getComputedTransformMatrixAsArray(target),
	      parent,
	      nextSibling,
	      temp,
	      addedToDOM;

	  if (cache.svg && target.getAttribute("transform")) {
	    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

	    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
	    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
	  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
	    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
	    temp = style.display;
	    style.display = "block";
	    parent = target.parentNode;

	    if (!parent || !target.offsetParent) {
	      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
	      addedToDOM = 1; //flag

	      nextSibling = target.nextSibling;

	      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

	    }

	    matrix = _getComputedTransformMatrixAsArray(target);
	    temp ? style.display = temp : _removeProperty(target, "display");

	    if (addedToDOM) {
	      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
	    }
	  }

	  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
	},
	    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
	  var cache = target._gsap,
	      matrix = matrixArray || _getMatrix(target, true),
	      xOriginOld = cache.xOrigin || 0,
	      yOriginOld = cache.yOrigin || 0,
	      xOffsetOld = cache.xOffset || 0,
	      yOffsetOld = cache.yOffset || 0,
	      a = matrix[0],
	      b = matrix[1],
	      c = matrix[2],
	      d = matrix[3],
	      tx = matrix[4],
	      ty = matrix[5],
	      originSplit = origin.split(" "),
	      xOrigin = parseFloat(originSplit[0]) || 0,
	      yOrigin = parseFloat(originSplit[1]) || 0,
	      bounds,
	      determinant,
	      x,
	      y;

	  if (!originIsAbsolute) {
	    bounds = _getBBox(target);
	    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
	    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
	  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
	    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
	    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
	    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
	    xOrigin = x;
	    yOrigin = y;
	  }

	  if (smooth || smooth !== false && cache.smooth) {
	    tx = xOrigin - xOriginOld;
	    ty = yOrigin - yOriginOld;
	    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
	    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
	  } else {
	    cache.xOffset = cache.yOffset = 0;
	  }

	  cache.xOrigin = xOrigin;
	  cache.yOrigin = yOrigin;
	  cache.smooth = !!smooth;
	  cache.origin = origin;
	  cache.originIsAbsolute = !!originIsAbsolute;
	  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

	  if (pluginToAddPropTweensTo) {
	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

	    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
	  }

	  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
	},
	    _parseTransform = function _parseTransform(target, uncache) {
	  var cache = target._gsap || new GSCache(target);

	  if ("x" in cache && !uncache && !cache.uncache) {
	    return cache;
	  }

	  var style = target.style,
	      invertedScaleX = cache.scaleX < 0,
	      px = "px",
	      deg = "deg",
	      origin = _getComputedProperty(target, _transformOriginProp) || "0",
	      x,
	      y,
	      z,
	      scaleX,
	      scaleY,
	      rotation,
	      rotationX,
	      rotationY,
	      skewX,
	      skewY,
	      perspective,
	      xOrigin,
	      yOrigin,
	      matrix,
	      angle,
	      cos,
	      sin,
	      a,
	      b,
	      c,
	      d,
	      a12,
	      a22,
	      t1,
	      t2,
	      t3,
	      a13,
	      a23,
	      a33,
	      a42,
	      a43,
	      a32;
	  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
	  scaleX = scaleY = 1;
	  cache.svg = !!(target.getCTM && _isSVG(target));
	  matrix = _getMatrix(target, cache.svg);

	  if (cache.svg) {
	    t1 = (!cache.uncache || origin === "0px 0px") && !uncache && target.getAttribute("data-svg-origin"); // if origin is 0,0 and cache.uncache is true, let the recorded data-svg-origin stay. Otherwise, whenever we set cache.uncache to true, we'd need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.

	    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
	  }

	  xOrigin = cache.xOrigin || 0;
	  yOrigin = cache.yOrigin || 0;

	  if (matrix !== _identity2DMatrix) {
	    a = matrix[0]; //a11

	    b = matrix[1]; //a21

	    c = matrix[2]; //a31

	    d = matrix[3]; //a41

	    x = a12 = matrix[4];
	    y = a22 = matrix[5]; //2D matrix

	    if (matrix.length === 6) {
	      scaleX = Math.sqrt(a * a + b * b);
	      scaleY = Math.sqrt(d * d + c * c);
	      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

	      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
	      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

	      if (cache.svg) {
	        x -= xOrigin - (xOrigin * a + yOrigin * c);
	        y -= yOrigin - (xOrigin * b + yOrigin * d);
	      } //3D matrix

	    } else {
	      a32 = matrix[6];
	      a42 = matrix[7];
	      a13 = matrix[8];
	      a23 = matrix[9];
	      a33 = matrix[10];
	      a43 = matrix[11];
	      x = matrix[12];
	      y = matrix[13];
	      z = matrix[14];
	      angle = _atan2(a32, a33);
	      rotationX = angle * _RAD2DEG; //rotationX

	      if (angle) {
	        cos = Math.cos(-angle);
	        sin = Math.sin(-angle);
	        t1 = a12 * cos + a13 * sin;
	        t2 = a22 * cos + a23 * sin;
	        t3 = a32 * cos + a33 * sin;
	        a13 = a12 * -sin + a13 * cos;
	        a23 = a22 * -sin + a23 * cos;
	        a33 = a32 * -sin + a33 * cos;
	        a43 = a42 * -sin + a43 * cos;
	        a12 = t1;
	        a22 = t2;
	        a32 = t3;
	      } //rotationY


	      angle = _atan2(-c, a33);
	      rotationY = angle * _RAD2DEG;

	      if (angle) {
	        cos = Math.cos(-angle);
	        sin = Math.sin(-angle);
	        t1 = a * cos - a13 * sin;
	        t2 = b * cos - a23 * sin;
	        t3 = c * cos - a33 * sin;
	        a43 = d * sin + a43 * cos;
	        a = t1;
	        b = t2;
	        c = t3;
	      } //rotationZ


	      angle = _atan2(b, a);
	      rotation = angle * _RAD2DEG;

	      if (angle) {
	        cos = Math.cos(angle);
	        sin = Math.sin(angle);
	        t1 = a * cos + b * sin;
	        t2 = a12 * cos + a22 * sin;
	        b = b * cos - a * sin;
	        a22 = a22 * cos - a12 * sin;
	        a = t1;
	        a12 = t2;
	      }

	      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
	        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
	        rotationX = rotation = 0;
	        rotationY = 180 - rotationY;
	      }

	      scaleX = _round(Math.sqrt(a * a + b * b + c * c));
	      scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
	      angle = _atan2(a12, a22);
	      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
	      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
	    }

	    if (cache.svg) {
	      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
	      t1 = target.getAttribute("transform");
	      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
	      t1 && target.setAttribute("transform", t1);
	    }
	  }

	  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
	    if (invertedScaleX) {
	      scaleX *= -1;
	      skewX += rotation <= 0 ? 180 : -180;
	      rotation += rotation <= 0 ? 180 : -180;
	    } else {
	      scaleY *= -1;
	      skewX += skewX <= 0 ? 180 : -180;
	    }
	  }

	  uncache = uncache || cache.uncache;
	  cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
	  cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
	  cache.z = z + px;
	  cache.scaleX = _round(scaleX);
	  cache.scaleY = _round(scaleY);
	  cache.rotation = _round(rotation) + deg;
	  cache.rotationX = _round(rotationX) + deg;
	  cache.rotationY = _round(rotationY) + deg;
	  cache.skewX = skewX + deg;
	  cache.skewY = skewY + deg;
	  cache.transformPerspective = perspective + px;

	  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
	    style[_transformOriginProp] = _firstTwoOnly(origin);
	  }

	  cache.xOffset = cache.yOffset = 0;
	  cache.force3D = _config.force3D;
	  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
	  cache.uncache = 0;
	  return cache;
	},
	    _firstTwoOnly = function _firstTwoOnly(value) {
	  return (value = value.split(" "))[0] + " " + value[1];
	},
	    //for handling transformOrigin values, stripping out the 3rd dimension
	_addPxTranslate = function _addPxTranslate(target, start, value) {
	  var unit = getUnit(start);
	  return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
	},
	    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
	  cache.z = "0px";
	  cache.rotationY = cache.rotationX = "0deg";
	  cache.force3D = 0;

	  _renderCSSTransforms(ratio, cache);
	},
	    _zeroDeg = "0deg",
	    _zeroPx = "0px",
	    _endParenthesis = ") ",
	    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
	  var _ref = cache || this,
	      xPercent = _ref.xPercent,
	      yPercent = _ref.yPercent,
	      x = _ref.x,
	      y = _ref.y,
	      z = _ref.z,
	      rotation = _ref.rotation,
	      rotationY = _ref.rotationY,
	      rotationX = _ref.rotationX,
	      skewX = _ref.skewX,
	      skewY = _ref.skewY,
	      scaleX = _ref.scaleX,
	      scaleY = _ref.scaleY,
	      transformPerspective = _ref.transformPerspective,
	      force3D = _ref.force3D,
	      target = _ref.target,
	      zOrigin = _ref.zOrigin,
	      transforms = "",
	      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


	  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
	    var angle = parseFloat(rotationY) * _DEG2RAD,
	        a13 = Math.sin(angle),
	        a33 = Math.cos(angle),
	        cos;

	    angle = parseFloat(rotationX) * _DEG2RAD;
	    cos = Math.cos(angle);
	    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
	    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
	    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
	  }

	  if (transformPerspective !== _zeroPx) {
	    transforms += "perspective(" + transformPerspective + _endParenthesis;
	  }

	  if (xPercent || yPercent) {
	    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
	  }

	  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
	    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
	  }

	  if (rotation !== _zeroDeg) {
	    transforms += "rotate(" + rotation + _endParenthesis;
	  }

	  if (rotationY !== _zeroDeg) {
	    transforms += "rotateY(" + rotationY + _endParenthesis;
	  }

	  if (rotationX !== _zeroDeg) {
	    transforms += "rotateX(" + rotationX + _endParenthesis;
	  }

	  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
	    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
	  }

	  if (scaleX !== 1 || scaleY !== 1) {
	    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
	  }

	  target.style[_transformProp] = transforms || "translate(0, 0)";
	},
	    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
	  var _ref2 = cache || this,
	      xPercent = _ref2.xPercent,
	      yPercent = _ref2.yPercent,
	      x = _ref2.x,
	      y = _ref2.y,
	      rotation = _ref2.rotation,
	      skewX = _ref2.skewX,
	      skewY = _ref2.skewY,
	      scaleX = _ref2.scaleX,
	      scaleY = _ref2.scaleY,
	      target = _ref2.target,
	      xOrigin = _ref2.xOrigin,
	      yOrigin = _ref2.yOrigin,
	      xOffset = _ref2.xOffset,
	      yOffset = _ref2.yOffset,
	      forceCSS = _ref2.forceCSS,
	      tx = parseFloat(x),
	      ty = parseFloat(y),
	      a11,
	      a21,
	      a12,
	      a22,
	      temp;

	  rotation = parseFloat(rotation);
	  skewX = parseFloat(skewX);
	  skewY = parseFloat(skewY);

	  if (skewY) {
	    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
	    skewY = parseFloat(skewY);
	    skewX += skewY;
	    rotation += skewY;
	  }

	  if (rotation || skewX) {
	    rotation *= _DEG2RAD;
	    skewX *= _DEG2RAD;
	    a11 = Math.cos(rotation) * scaleX;
	    a21 = Math.sin(rotation) * scaleX;
	    a12 = Math.sin(rotation - skewX) * -scaleY;
	    a22 = Math.cos(rotation - skewX) * scaleY;

	    if (skewX) {
	      skewY *= _DEG2RAD;
	      temp = Math.tan(skewX - skewY);
	      temp = Math.sqrt(1 + temp * temp);
	      a12 *= temp;
	      a22 *= temp;

	      if (skewY) {
	        temp = Math.tan(skewY);
	        temp = Math.sqrt(1 + temp * temp);
	        a11 *= temp;
	        a21 *= temp;
	      }
	    }

	    a11 = _round(a11);
	    a21 = _round(a21);
	    a12 = _round(a12);
	    a22 = _round(a22);
	  } else {
	    a11 = scaleX;
	    a22 = scaleY;
	    a21 = a12 = 0;
	  }

	  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
	    tx = _convertToUnit(target, "x", x, "px");
	    ty = _convertToUnit(target, "y", y, "px");
	  }

	  if (xOrigin || yOrigin || xOffset || yOffset) {
	    tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
	    ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
	  }

	  if (xPercent || yPercent) {
	    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
	    temp = target.getBBox();
	    tx = _round(tx + xPercent / 100 * temp.width);
	    ty = _round(ty + yPercent / 100 * temp.height);
	  }

	  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
	  target.setAttribute("transform", temp);
	  forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
	},
	    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
	  var cap = 360,
	      isString = _isString(endValue),
	      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
	      change = endNum - startNum,
	      finalValue = startNum + change + "deg",
	      direction,
	      pt;

	  if (isString) {
	    direction = endValue.split("_")[1];

	    if (direction === "short") {
	      change %= cap;

	      if (change !== change % (cap / 2)) {
	        change += change < 0 ? cap : -cap;
	      }
	    }

	    if (direction === "cw" && change < 0) {
	      change = (change + cap * _bigNum$1) % cap - ~~(change / cap) * cap;
	    } else if (direction === "ccw" && change > 0) {
	      change = (change - cap * _bigNum$1) % cap - ~~(change / cap) * cap;
	    }
	  }

	  plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
	  pt.e = finalValue;
	  pt.u = "deg";

	  plugin._props.push(property);

	  return pt;
	},
	    _assign = function _assign(target, source) {
	  // Internet Explorer doesn't have Object.assign(), so we recreate it here.
	  for (var p in source) {
	    target[p] = source[p];
	  }

	  return target;
	},
	    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
	  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
	  var startCache = _assign({}, target._gsap),
	      exclude = "perspective,force3D,transformOrigin,svgOrigin",
	      style = target.style,
	      endCache,
	      p,
	      startValue,
	      endValue,
	      startNum,
	      endNum,
	      startUnit,
	      endUnit;

	  if (startCache.svg) {
	    startValue = target.getAttribute("transform");
	    target.setAttribute("transform", "");
	    style[_transformProp] = transforms;
	    endCache = _parseTransform(target, 1);

	    _removeProperty(target, _transformProp);

	    target.setAttribute("transform", startValue);
	  } else {
	    startValue = getComputedStyle(target)[_transformProp];
	    style[_transformProp] = transforms;
	    endCache = _parseTransform(target, 1);
	    style[_transformProp] = startValue;
	  }

	  for (p in _transformProps) {
	    startValue = startCache[p];
	    endValue = endCache[p];

	    if (startValue !== endValue && exclude.indexOf(p) < 0) {
	      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
	      startUnit = getUnit(startValue);
	      endUnit = getUnit(endValue);
	      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
	      endNum = parseFloat(endValue);
	      plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
	      plugin._pt.u = endUnit || 0;

	      plugin._props.push(p);
	    }
	  }

	  _assign(endCache, startCache);
	}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


	_forEachName("padding,margin,Width,Radius", function (name, index) {
	  var t = "Top",
	      r = "Right",
	      b = "Bottom",
	      l = "Left",
	      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
	    return index < 2 ? name + side : "border" + side + name;
	  });

	  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
	    var a, vars;

	    if (arguments.length < 4) {
	      // getter, passed target, property, and unit (from _get())
	      a = props.map(function (prop) {
	        return _get(plugin, prop, property);
	      });
	      vars = a.join(" ");
	      return vars.split(a[0]).length === 5 ? a[0] : vars;
	    }

	    a = (endValue + "").split(" ");
	    vars = {};
	    props.forEach(function (prop, i) {
	      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
	    });
	    plugin.init(target, vars, tween);
	  };
	});

	var CSSPlugin = {
	  name: "css",
	  register: _initCore,
	  targetTest: function targetTest(target) {
	    return target.style && target.nodeType;
	  },
	  init: function init(target, vars, tween, index, targets) {
	    var props = this._props,
	        style = target.style,
	        startAt = tween.vars.startAt,
	        startValue,
	        endValue,
	        endNum,
	        startNum,
	        type,
	        specialProp,
	        p,
	        startUnit,
	        endUnit,
	        relative,
	        isTransformRelated,
	        transformPropTween,
	        cache,
	        smooth,
	        hasPriority;
	    _pluginInitted || _initCore();

	    for (p in vars) {
	      if (p === "autoRound") {
	        continue;
	      }

	      endValue = vars[p];

	      if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
	        // plugins
	        continue;
	      }

	      type = typeof endValue;
	      specialProp = _specialProps[p];

	      if (type === "function") {
	        endValue = endValue.call(tween, index, target, targets);
	        type = typeof endValue;
	      }

	      if (type === "string" && ~endValue.indexOf("random(")) {
	        endValue = _replaceRandom(endValue);
	      }

	      if (specialProp) {
	        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
	      } else if (p.substr(0, 2) === "--") {
	        //CSS variable
	        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
	        endValue += "";
	        _colorExp.lastIndex = 0;

	        if (!_colorExp.test(startValue)) {
	          // colors don't have units
	          startUnit = getUnit(startValue);
	          endUnit = getUnit(endValue);
	        }

	        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
	        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
	        props.push(p);
	      } else if (type !== "undefined") {
	        if (startAt && p in startAt) {
	          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
	          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
	          _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
	          getUnit(startValue + "") || (startValue += _config.units[p] || getUnit(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

	          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
	        } else {
	          startValue = _get(target, p);
	        }

	        startNum = parseFloat(startValue);
	        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
	        relative && (endValue = endValue.substr(2));
	        endNum = parseFloat(endValue);

	        if (p in _propertyAliases) {
	          if (p === "autoAlpha") {
	            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
	            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
	              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
	              startNum = 0;
	            }

	            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
	          }

	          if (p !== "scale" && p !== "transform") {
	            p = _propertyAliases[p];
	            ~p.indexOf(",") && (p = p.split(",")[0]);
	          }
	        }

	        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

	        if (isTransformRelated) {
	          if (!transformPropTween) {
	            cache = target._gsap;
	            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

	            smooth = vars.smoothOrigin !== false && cache.smooth;
	            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

	            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
	          }

	          if (p === "scale") {
	            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0);
	            props.push("scaleY", p);
	            p += "X";
	          } else if (p === "transformOrigin") {
	            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

	            if (cache.svg) {
	              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
	            } else {
	              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

	              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

	              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
	            }

	            continue;
	          } else if (p === "svgOrigin") {
	            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

	            continue;
	          } else if (p in _rotationalProperties) {
	            _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);

	            continue;
	          } else if (p === "smoothOrigin") {
	            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

	            continue;
	          } else if (p === "force3D") {
	            cache[p] = endValue;
	            continue;
	          } else if (p === "transform") {
	            _addRawTransformPTs(this, endValue, target);

	            continue;
	          }
	        } else if (!(p in style)) {
	          p = _checkPropPrefix(p) || p;
	        }

	        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
	          startUnit = (startValue + "").substr((startNum + "").length);
	          endNum || (endNum = 0); // protect against NaN

	          endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
	          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
	          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
	          this._pt.u = endUnit || 0;

	          if (startUnit !== endUnit && endUnit !== "%") {
	            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
	            this._pt.b = startValue;
	            this._pt.r = _renderCSSPropWithBeginning;
	          }
	        } else if (!(p in style)) {
	          if (p in target) {
	            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
	            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
	          } else {
	            _missingPlugin(p, endValue);

	            continue;
	          }
	        } else {
	          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
	        }

	        props.push(p);
	      }
	    }

	    hasPriority && _sortPropTweensByPriority(this);
	  },
	  get: _get,
	  aliases: _propertyAliases,
	  getSetter: function getSetter(target, property, plugin) {
	    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
	    var p = _propertyAliases[property];
	    p && p.indexOf(",") < 0 && (property = p);
	    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
	  },
	  core: {
	    _removeProperty: _removeProperty,
	    _getMatrix: _getMatrix
	  }
	};
	gsap.utils.checkPrefix = _checkPropPrefix;

	(function (positionAndScale, rotation, others, aliases) {
	  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
	    _transformProps[name] = 1;
	  });

	  _forEachName(rotation, function (name) {
	    _config.units[name] = "deg";
	    _rotationalProperties[name] = 1;
	  });

	  _propertyAliases[all[13]] = positionAndScale + "," + rotation;

	  _forEachName(aliases, function (name) {
	    var split = name.split(":");
	    _propertyAliases[split[1]] = all[split[0]];
	  });
	})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

	_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
	  _config.units[name] = "px";
	});

	gsap.registerPlugin(CSSPlugin);

	var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
	    // to protect from tree shaking
	gsapWithCSS.core.Tween;

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/*!
	 * Observer 3.10.4
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	/* eslint-disable */
	var gsap$1,
	    _coreInitted$1,
	    _win$2,
	    _doc$2,
	    _docEl,
	    _body,
	    _isTouch,
	    _pointerType,
	    ScrollTrigger,
	    _root,
	    _normalizer,
	    _eventTypes,
	    _getGSAP = function _getGSAP() {
	  return gsap$1 || typeof window !== "undefined" && (gsap$1 = window.gsap) && gsap$1.registerPlugin && gsap$1;
	},
	    _startup = 1,
	    _observers = [],
	    _scrollers = [],
	    _proxies = [],
	    _getTime = Date.now,
	    _bridge = function _bridge(name, value) {
	  return value;
	},
	    _integrate = function _integrate() {
	  var core = ScrollTrigger.core,
	      data = core.bridge || {},
	      scrollers = core._scrollers,
	      proxies = core._proxies;
	  scrollers.push.apply(scrollers, _scrollers);
	  proxies.push.apply(proxies, _proxies);
	  _scrollers = scrollers;
	  _proxies = proxies;

	  _bridge = function _bridge(name, value) {
	    return data[name](value);
	  };
	},
	    _getProxyProp = function _getProxyProp(element, property) {
	  return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
	},
	    _isViewport = function _isViewport(el) {
	  return !!~_root.indexOf(el);
	},
	    _addListener = function _addListener(element, type, func, nonPassive, capture) {
	  return element.addEventListener(type, func, {
	    passive: !nonPassive,
	    capture: !!capture
	  });
	},
	    _removeListener = function _removeListener(element, type, func, capture) {
	  return element.removeEventListener(type, func, !!capture);
	},
	    _scrollLeft = "scrollLeft",
	    _scrollTop = "scrollTop",
	    _onScroll = function _onScroll() {
	  return _normalizer && _normalizer.isPressed || _scrollers.cache++;
	},
	    _scrollCacheFunc = function _scrollCacheFunc(f, doNotCache) {
	  var cachingFunc = function cachingFunc(value) {
	    // since reading the scrollTop/scrollLeft/pageOffsetY/pageOffsetX can trigger a layout, this function allows us to cache the value so it only gets read fresh after a "scroll" event fires (or while we're refreshing because that can lengthen the page and alter the scroll position). when "soft" is true, that means don't actually set the scroll, but cache the new value instead (useful in ScrollSmoother)
	    if (value || value === 0) {
	      _startup && (_win$2.history.scrollRestoration = "manual"); // otherwise the new position will get overwritten by the browser onload.

	      var isNormalizing = _normalizer && _normalizer.isPressed;
	      value = cachingFunc.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0); //TODO: iOS Bug: if you allow it to go to 0, Safari can start to report super strange (wildly inaccurate) touch positions!

	      f(value);
	      cachingFunc.cacheID = _scrollers.cache;
	      isNormalizing && _bridge("ss", value); // set scroll (notify ScrollTrigger so it can dispatch a "scrollStart" event if necessary
	    } else if (doNotCache || _scrollers.cache !== cachingFunc.cacheID || _bridge("ref")) {
	      cachingFunc.cacheID = _scrollers.cache;
	      cachingFunc.v = f();
	    }

	    return cachingFunc.v + cachingFunc.offset;
	  };

	  cachingFunc.offset = 0;
	  return f && cachingFunc;
	},
	    _horizontal = {
	  s: _scrollLeft,
	  p: "left",
	  p2: "Left",
	  os: "right",
	  os2: "Right",
	  d: "width",
	  d2: "Width",
	  a: "x",
	  sc: _scrollCacheFunc(function (value) {
	    return arguments.length ? _win$2.scrollTo(value, _vertical.sc()) : _win$2.pageXOffset || _doc$2[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
	  })
	},
	    _vertical = {
	  s: _scrollTop,
	  p: "top",
	  p2: "Top",
	  os: "bottom",
	  os2: "Bottom",
	  d: "height",
	  d2: "Height",
	  a: "y",
	  op: _horizontal,
	  sc: _scrollCacheFunc(function (value) {
	    return arguments.length ? _win$2.scrollTo(_horizontal.sc(), value) : _win$2.pageYOffset || _doc$2[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
	  })
	},
	    _getTarget = function _getTarget(t) {
	  return gsap$1.utils.toArray(t)[0] || (typeof t === "string" && gsap$1.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
	},
	    _getScrollFunc = function _getScrollFunc(element, _ref) {
	  var s = _ref.s,
	      sc = _ref.sc;

	  // we store the scroller functions in a alternating sequenced Array like [element, verticalScrollFunc, horizontalScrollFunc, ...] so that we can minimize memory, maximize performance, and we also record the last position as a ".rec" property in order to revert to that after refreshing to ensure things don't shift around.
	  var i = _scrollers.indexOf(element),
	      offset = sc === _vertical.sc ? 1 : 2;

	  !~i && (i = _scrollers.push(element) - 1);
	  return _scrollers[i + offset] || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport(element) ? sc : _scrollCacheFunc(function (value) {
	    return arguments.length ? element[s] = value : element[s];
	  })));
	},
	    _getVelocityProp = function _getVelocityProp(value, minTimeRefresh, useDelta) {
	  var v1 = value,
	      v2 = value,
	      t1 = _getTime(),
	      t2 = t1,
	      min = minTimeRefresh || 50,
	      dropToZeroTime = Math.max(500, min * 3),
	      update = function update(value, force) {
	    var t = _getTime();

	    if (force || t - t1 > min) {
	      v2 = v1;
	      v1 = value;
	      t2 = t1;
	      t1 = t;
	    } else if (useDelta) {
	      v1 += value;
	    } else {
	      // not totally necessary, but makes it a bit more accurate by adjusting the v1 value according to the new slope. This way we're not just ignoring the incoming data. Removing for now because it doesn't seem to make much practical difference and it's probably not worth the kb.
	      v1 = v2 + (value - v2) / (t - t2) * (t1 - t2);
	    }
	  },
	      reset = function reset() {
	    v2 = v1 = useDelta ? 0 : v1;
	    t2 = t1 = 0;
	  },
	      getVelocity = function getVelocity(latestValue) {
	    var tOld = t2,
	        vOld = v2,
	        t = _getTime();

	    (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
	    return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1000;
	  };

	  return {
	    update: update,
	    reset: reset,
	    getVelocity: getVelocity
	  };
	},
	    _getEvent = function _getEvent(e, preventDefault) {
	  preventDefault && !e._gsapAllow && e.preventDefault();
	  return e.changedTouches ? e.changedTouches[0] : e;
	},
	    _getAbsoluteMax = function _getAbsoluteMax(a) {
	  var max = Math.max.apply(Math, a),
	      min = Math.min.apply(Math, a);
	  return Math.abs(max) >= Math.abs(min) ? max : min;
	},
	    _setScrollTrigger = function _setScrollTrigger() {
	  ScrollTrigger = gsap$1.core.globals().ScrollTrigger;
	  ScrollTrigger && ScrollTrigger.core && _integrate();
	},
	    _initCore$1 = function _initCore(core) {
	  gsap$1 = core || _getGSAP();

	  if (gsap$1 && typeof document !== "undefined" && document.body) {
	    _win$2 = window;
	    _doc$2 = document;
	    _docEl = _doc$2.documentElement;
	    _body = _doc$2.body;
	    _root = [_win$2, _doc$2, _docEl, _body];
	    gsap$1.utils.clamp;
	    _pointerType = "onpointerenter" in _body ? "pointer" : "mouse"; // isTouch is 0 if no touch, 1 if ONLY touch, and 2 if it can accommodate touch but also other types like mouse/pointer.

	    _isTouch = Observer.isTouch = _win$2.matchMedia && _win$2.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win$2 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
	    _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
	    setTimeout(function () {
	      return _startup = 0;
	    }, 500);

	    _setScrollTrigger();

	    _coreInitted$1 = 1;
	  }

	  return _coreInitted$1;
	};

	_horizontal.op = _vertical;
	_scrollers.cache = 0;
	var Observer = /*#__PURE__*/function () {
	  function Observer(vars) {
	    this.init(vars);
	  }

	  var _proto = Observer.prototype;

	  _proto.init = function init(vars) {
	    _coreInitted$1 || _initCore$1(gsap$1) || console.warn("Please gsap.registerPlugin(Observer)");
	    ScrollTrigger || _setScrollTrigger();
	    var tolerance = vars.tolerance,
	        dragMinimum = vars.dragMinimum,
	        type = vars.type,
	        target = vars.target,
	        lineHeight = vars.lineHeight,
	        debounce = vars.debounce,
	        preventDefault = vars.preventDefault,
	        onStop = vars.onStop,
	        onStopDelay = vars.onStopDelay,
	        ignore = vars.ignore,
	        wheelSpeed = vars.wheelSpeed,
	        event = vars.event,
	        onDragStart = vars.onDragStart,
	        onDragEnd = vars.onDragEnd,
	        onDrag = vars.onDrag,
	        onPress = vars.onPress,
	        onRelease = vars.onRelease,
	        onRight = vars.onRight,
	        onLeft = vars.onLeft,
	        onUp = vars.onUp,
	        onDown = vars.onDown,
	        onChangeX = vars.onChangeX,
	        onChangeY = vars.onChangeY,
	        onChange = vars.onChange,
	        onToggleX = vars.onToggleX,
	        onToggleY = vars.onToggleY,
	        onHover = vars.onHover,
	        onHoverEnd = vars.onHoverEnd,
	        onMove = vars.onMove,
	        ignoreCheck = vars.ignoreCheck,
	        isNormalizer = vars.isNormalizer,
	        onGestureStart = vars.onGestureStart,
	        onGestureEnd = vars.onGestureEnd,
	        onWheel = vars.onWheel,
	        onEnable = vars.onEnable,
	        onDisable = vars.onDisable,
	        onClick = vars.onClick,
	        scrollSpeed = vars.scrollSpeed,
	        capture = vars.capture,
	        allowClicks = vars.allowClicks,
	        lockAxis = vars.lockAxis,
	        onLockAxis = vars.onLockAxis;
	    this.target = target = _getTarget(target) || _docEl;
	    this.vars = vars;
	    ignore && (ignore = gsap$1.utils.toArray(ignore));
	    tolerance = tolerance || 0;
	    dragMinimum = dragMinimum || 0;
	    wheelSpeed = wheelSpeed || 1;
	    scrollSpeed = scrollSpeed || 1;
	    type = type || "wheel,touch,pointer";
	    debounce = debounce !== false;
	    lineHeight || (lineHeight = parseFloat(_win$2.getComputedStyle(_body).lineHeight) || 22); // note: browser may report "normal", so default to 22.

	    var id,
	        onStopDelayedCall,
	        dragged,
	        moved,
	        wheeled,
	        locked,
	        axis,
	        self = this,
	        prevDeltaX = 0,
	        prevDeltaY = 0,
	        scrollFuncX = _getScrollFunc(target, _horizontal),
	        scrollFuncY = _getScrollFunc(target, _vertical),
	        scrollX = scrollFuncX(),
	        scrollY = scrollFuncY(),
	        limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown",
	        // for devices that accommodate mouse events and touch events, we need to distinguish.
	    isViewport = _isViewport(target),
	        ownerDoc = target.ownerDocument || _doc$2,
	        deltaX = [0, 0, 0],
	        // wheel, scroll, pointer/touch
	    deltaY = [0, 0, 0],
	        onClickTime = 0,
	        clickCapture = function clickCapture() {
	      return onClickTime = _getTime();
	    },
	        _ignoreCheck = function _ignoreCheck(e, isPointerOrTouch) {
	      return (self.event = e) && ignore && ~ignore.indexOf(e.target) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
	    },
	        onStopFunc = function onStopFunc() {
	      self._vx.reset();

	      self._vy.reset();

	      onStopDelayedCall.pause();
	      onStop && onStop(self);
	    },
	        update = function update() {
	      var dx = self.deltaX = _getAbsoluteMax(deltaX),
	          dy = self.deltaY = _getAbsoluteMax(deltaY),
	          changedX = Math.abs(dx) >= tolerance,
	          changedY = Math.abs(dy) >= tolerance;

	      onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY); // in ScrollTrigger.normalizeScroll(), we need to know if it was touch/pointer so we need access to the deltaX/deltaY Arrays before we clear them out.

	      if (changedX) {
	        onRight && self.deltaX > 0 && onRight(self);
	        onLeft && self.deltaX < 0 && onLeft(self);
	        onChangeX && onChangeX(self);
	        onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
	        prevDeltaX = self.deltaX;
	        deltaX[0] = deltaX[1] = deltaX[2] = 0;
	      }

	      if (changedY) {
	        onDown && self.deltaY > 0 && onDown(self);
	        onUp && self.deltaY < 0 && onUp(self);
	        onChangeY && onChangeY(self);
	        onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
	        prevDeltaY = self.deltaY;
	        deltaY[0] = deltaY[1] = deltaY[2] = 0;
	      }

	      if (moved || dragged) {
	        onMove && onMove(self);
	        onLockAxis && locked && onLockAxis(self);

	        if (dragged) {
	          onDrag(self);
	          dragged = false;
	        }

	        moved = locked = false;
	      }

	      if (wheeled) {
	        onWheel(self);
	        wheeled = false;
	      }

	      id = 0;
	    },
	        onDelta = function onDelta(x, y, index) {
	      deltaX[index] += x;
	      deltaY[index] += y;

	      self._vx.update(x);

	      self._vy.update(y);

	      debounce ? id || (id = requestAnimationFrame(update)) : update();
	    },
	        onTouchOrPointerDelta = function onTouchOrPointerDelta(x, y) {
	      if (axis !== "y") {
	        deltaX[2] += x;

	        self._vx.update(x, true); // update the velocity as frequently as possible instead of in the debounced function so that very quick touch-scrolls (flicks) feel natural. If it's the mouse/touch/pointer, force it so that we get snappy/accurate momentum scroll.

	      }

	      if (axis !== "x") {
	        deltaY[2] += y;

	        self._vy.update(y, true);
	      }

	      if (lockAxis && !axis) {
	        self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
	        locked = true;
	      }

	      debounce ? id || (id = requestAnimationFrame(update)) : update();
	    },
	        _onDrag = function _onDrag(e) {
	      if (_ignoreCheck(e, 1)) {
	        return;
	      }

	      e = _getEvent(e, preventDefault);
	      var x = e.clientX,
	          y = e.clientY,
	          dx = x - self.x,
	          dy = y - self.y,
	          isDragging = self.isDragging;
	      self.x = x;
	      self.y = y;

	      if (isDragging || Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum) {
	        onDrag && (dragged = true);
	        isDragging || (self.isDragging = true);
	        onTouchOrPointerDelta(dx, dy);
	        isDragging || onDragStart && onDragStart(self);
	      }
	    },
	        _onPress = self.onPress = function (e) {
	      if (_ignoreCheck(e, 1)) {
	        return;
	      }

	      self.axis = axis = null;
	      onStopDelayedCall.pause();
	      self.isPressed = true;
	      e = _getEvent(e); // note: may need to preventDefault(?) Won't side-scroll on iOS Safari if we do, though.

	      prevDeltaX = prevDeltaY = 0;
	      self.startX = self.x = e.clientX;
	      self.startY = self.y = e.clientY;

	      self._vx.reset(); // otherwise the t2 may be stale if the user touches and flicks super fast and releases in less than 2 requestAnimationFrame ticks, causing velocity to be 0.


	      self._vy.reset();

	      _addListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, preventDefault, true);

	      self.deltaX = self.deltaY = 0;
	      onPress && onPress(self);
	    },
	        _onRelease = function _onRelease(e) {
	      if (_ignoreCheck(e, 1)) {
	        return;
	      }

	      _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);

	      var wasDragging = self.isDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3),
	          // some touch devices need some wiggle room in terms of sensing clicks - the finger may move a few pixels.
	      eventData = _getEvent(e);

	      if (!wasDragging) {
	        self._vx.reset();

	        self._vy.reset();

	        if (preventDefault && allowClicks) {
	          gsap$1.delayedCall(0.08, function () {
	            // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
	            if (_getTime() - onClickTime > 300 && !e.defaultPrevented) {
	              if (e.target.click) {
	                //some browsers (like mobile Safari) don't properly trigger the click event
	                e.target.click();
	              } else if (ownerDoc.createEvent) {
	                var syntheticEvent = ownerDoc.createEvent("MouseEvents");
	                syntheticEvent.initMouseEvent("click", true, true, _win$2, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
	                e.target.dispatchEvent(syntheticEvent);
	              }
	            }
	          });
	        }
	      }

	      self.isDragging = self.isGesturing = self.isPressed = false;
	      onStop && !isNormalizer && onStopDelayedCall.restart(true);
	      onDragEnd && wasDragging && onDragEnd(self);
	      onRelease && onRelease(self, wasDragging);
	    },
	        _onGestureStart = function _onGestureStart(e) {
	      return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
	    },
	        _onGestureEnd = function _onGestureEnd() {
	      return (self.isGesturing = false) || onGestureEnd(self);
	    },
	        onScroll = function onScroll(e) {
	      if (_ignoreCheck(e)) {
	        return;
	      }

	      var x = scrollFuncX(),
	          y = scrollFuncY();
	      onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
	      scrollX = x;
	      scrollY = y;
	      onStop && onStopDelayedCall.restart(true);
	    },
	        _onWheel = function _onWheel(e) {
	      if (_ignoreCheck(e)) {
	        return;
	      }

	      e = _getEvent(e, preventDefault);
	      onWheel && (wheeled = true);
	      var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win$2.innerHeight : 1) * wheelSpeed;
	      onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
	      onStop && !isNormalizer && onStopDelayedCall.restart(true);
	    },
	        _onMove = function _onMove(e) {
	      if (_ignoreCheck(e)) {
	        return;
	      }

	      var x = e.clientX,
	          y = e.clientY,
	          dx = x - self.x,
	          dy = y - self.y;
	      self.x = x;
	      self.y = y;
	      moved = true;
	      (dx || dy) && onTouchOrPointerDelta(dx, dy);
	    },
	        _onHover = function _onHover(e) {
	      self.event = e;
	      onHover(self);
	    },
	        _onHoverEnd = function _onHoverEnd(e) {
	      self.event = e;
	      onHoverEnd(self);
	    },
	        _onClick = function _onClick(e) {
	      return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
	    };

	    onStopDelayedCall = self._dc = gsap$1.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
	    self.deltaX = self.deltaY = 0;
	    self._vx = _getVelocityProp(0, 50, true);
	    self._vy = _getVelocityProp(0, 50, true);
	    self.scrollX = scrollFuncX;
	    self.scrollY = scrollFuncY;
	    self.isDragging = self.isGesturing = self.isPressed = false;

	    self.enable = function (e) {
	      if (!self.isEnabled) {
	        _addListener(isViewport ? ownerDoc : target, "scroll", _onScroll);

	        type.indexOf("scroll") >= 0 && _addListener(isViewport ? ownerDoc : target, "scroll", onScroll, preventDefault, capture);
	        type.indexOf("wheel") >= 0 && _addListener(target, "wheel", _onWheel, preventDefault, capture);

	        if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
	          _addListener(target, _eventTypes[0], _onPress, preventDefault, capture);

	          _addListener(ownerDoc, _eventTypes[2], _onRelease);

	          _addListener(ownerDoc, _eventTypes[3], _onRelease);

	          allowClicks && _addListener(target, "click", clickCapture, false, true);
	          onClick && _addListener(target, "click", _onClick);
	          onGestureStart && _addListener(ownerDoc, "gesturestart", _onGestureStart);
	          onGestureEnd && _addListener(ownerDoc, "gestureend", _onGestureEnd);
	          onHover && _addListener(target, _pointerType + "enter", _onHover);
	          onHoverEnd && _addListener(target, _pointerType + "leave", _onHoverEnd);
	          onMove && _addListener(target, _pointerType + "move", _onMove);
	        }

	        self.isEnabled = true;
	        e && e.type && _onPress(e);
	        onEnable && onEnable(self);
	      }

	      return self;
	    };

	    self.disable = function () {
	      if (self.isEnabled) {
	        // only remove the _onScroll listener if there aren't any others that rely on the functionality.
	        _observers.filter(function (o) {
	          return o !== self && _isViewport(o.target);
	        }).length || _removeListener(isViewport ? ownerDoc : target, "scroll", _onScroll);

	        if (self.isPressed) {
	          self._vx.reset();

	          self._vy.reset();

	          _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
	        }

	        _removeListener(isViewport ? ownerDoc : target, "scroll", onScroll, capture);

	        _removeListener(target, "wheel", _onWheel, capture);

	        _removeListener(target, _eventTypes[0], _onPress, capture);

	        _removeListener(ownerDoc, _eventTypes[2], _onRelease);

	        _removeListener(ownerDoc, _eventTypes[3], _onRelease);

	        _removeListener(target, "click", clickCapture, true);

	        _removeListener(target, "click", _onClick);

	        _removeListener(ownerDoc, "gesturestart", _onGestureStart);

	        _removeListener(ownerDoc, "gestureend", _onGestureEnd);

	        _removeListener(target, _pointerType + "enter", _onHover);

	        _removeListener(target, _pointerType + "leave", _onHoverEnd);

	        _removeListener(target, _pointerType + "move", _onMove);

	        self.isEnabled = self.isPressed = self.isDragging = false;
	        onDisable && onDisable(self);
	      }
	    };

	    self.kill = function () {
	      self.disable();

	      var i = _observers.indexOf(self);

	      i >= 0 && _observers.splice(i, 1);
	      _normalizer === self && (_normalizer = 0);
	    };

	    _observers.push(self);

	    isNormalizer && _isViewport(target) && (_normalizer = self);
	    self.enable(event);
	  };

	  _createClass(Observer, [{
	    key: "velocityX",
	    get: function get() {
	      return this._vx.getVelocity();
	    }
	  }, {
	    key: "velocityY",
	    get: function get() {
	      return this._vy.getVelocity();
	    }
	  }]);

	  return Observer;
	}();
	Observer.version = "3.10.4";

	Observer.create = function (vars) {
	  return new Observer(vars);
	};

	Observer.register = _initCore$1;

	Observer.getAll = function () {
	  return _observers.slice();
	};

	Observer.getById = function (id) {
	  return _observers.filter(function (o) {
	    return o.vars.id === id;
	  })[0];
	};

	_getGSAP() && gsap$1.registerPlugin(Observer);

	/*!
	 * ScrollTrigger 3.10.4
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	var gsap$2,
	    _coreInitted$2,
	    _win$3,
	    _doc$3,
	    _docEl$1,
	    _body$1,
	    _root$1,
	    _resizeDelay,
	    _toArray,
	    _clamp$1,
	    _time2,
	    _syncInterval,
	    _refreshing,
	    _pointerIsDown,
	    _transformProp$1,
	    _i,
	    _prevWidth,
	    _prevHeight,
	    _autoRefresh,
	    _sort,
	    _suppressOverwrites$1,
	    _ignoreResize,
	    _normalizer$1,
	    _ignoreMobileResize,
	    _baseScreenHeight,
	    _baseScreenWidth,
	    _fixIOSBug,
	    _limitCallbacks,
	    // if true, we'll only trigger callbacks if the active state toggles, so if you scroll immediately past both the start and end positions of a ScrollTrigger (thus inactive to inactive), neither its onEnter nor onLeave will be called. This is useful during startup.
	_startup$1 = 1,
	    _getTime$1 = Date.now,
	    _time1 = _getTime$1(),
	    _lastScrollTime = 0,
	    _enabled = 0,
	    _pointerDownHandler = function _pointerDownHandler() {
	  return _pointerIsDown = 1;
	},
	    _pointerUpHandler = function _pointerUpHandler() {
	  return _pointerIsDown = 0;
	},
	    _passThrough$1 = function _passThrough(v) {
	  return v;
	},
	    _round$1 = function _round(value) {
	  return Math.round(value * 100000) / 100000 || 0;
	},
	    _windowExists$2 = function _windowExists() {
	  return typeof window !== "undefined";
	},
	    _getGSAP$1 = function _getGSAP() {
	  return gsap$2 || _windowExists$2() && (gsap$2 = window.gsap) && gsap$2.registerPlugin && gsap$2;
	},
	    _isViewport$1 = function _isViewport(e) {
	  return !!~_root$1.indexOf(e);
	},
	    _getBoundsFunc = function _getBoundsFunc(element) {
	  return _getProxyProp(element, "getBoundingClientRect") || (_isViewport$1(element) ? function () {
	    _winOffsets.width = _win$3.innerWidth;
	    _winOffsets.height = _win$3.innerHeight;
	    return _winOffsets;
	  } : function () {
	    return _getBounds(element);
	  });
	},
	    _getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref) {
	  var d = _ref.d,
	      d2 = _ref.d2,
	      a = _ref.a;
	  return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function () {
	    return a()[d];
	  } : function () {
	    return (isViewport ? _win$3["inner" + d2] : scroller["client" + d2]) || 0;
	  };
	},
	    _getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
	  return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function () {
	    return _winOffsets;
	  };
	},
	    _maxScroll = function _maxScroll(element, _ref2) {
	  var s = _ref2.s,
	      d2 = _ref2.d2,
	      d = _ref2.d,
	      a = _ref2.a;
	  return (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport$1(element) ? (_docEl$1[s] || _body$1[s]) - (_win$3["inner" + d2] || _docEl$1["client" + d2] || _body$1["client" + d2]) : element[s] - element["offset" + d2];
	},
	    _iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
	  for (var i = 0; i < _autoRefresh.length; i += 3) {
	    (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
	  }
	},
	    _isString$1 = function _isString(value) {
	  return typeof value === "string";
	},
	    _isFunction$1 = function _isFunction(value) {
	  return typeof value === "function";
	},
	    _isNumber$1 = function _isNumber(value) {
	  return typeof value === "number";
	},
	    _isObject$1 = function _isObject(value) {
	  return typeof value === "object";
	},
	    _callIfFunc = function _callIfFunc(value) {
	  return _isFunction$1(value) && value();
	},
	    _combineFunc = function _combineFunc(f1, f2) {
	  return function () {
	    var result1 = _callIfFunc(f1),
	        result2 = _callIfFunc(f2);

	    return function () {
	      _callIfFunc(result1);

	      _callIfFunc(result2);
	    };
	  };
	},
	    _endAnimation = function _endAnimation(animation, reversed, pause) {
	  return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
	},
	    _callback$1 = function _callback(self, func) {
	  if (self.enabled) {
	    var result = func(self);
	    result && result.totalTime && (self.callbackAnimation = result);
	  }
	},
	    _abs = Math.abs,
	    _left = "left",
	    _top = "top",
	    _right = "right",
	    _bottom = "bottom",
	    _width = "width",
	    _height = "height",
	    _Right = "Right",
	    _Left = "Left",
	    _Top = "Top",
	    _Bottom = "Bottom",
	    _padding = "padding",
	    _margin = "margin",
	    _Width = "Width",
	    _Height = "Height",
	    _px = "px",
	    _getComputedStyle = function _getComputedStyle(element) {
	  return _win$3.getComputedStyle(element);
	},
	    _makePositionable = function _makePositionable(element) {
	  // if the element already has position: absolute or fixed, leave that, otherwise make it position: relative
	  var position = _getComputedStyle(element).position;

	  element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
	},
	    _setDefaults$1 = function _setDefaults(obj, defaults) {
	  for (var p in defaults) {
	    p in obj || (obj[p] = defaults[p]);
	  }

	  return obj;
	},
	    _getBounds = function _getBounds(element, withoutTransforms) {
	  var tween = withoutTransforms && _getComputedStyle(element)[_transformProp$1] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap$2.to(element, {
	    x: 0,
	    y: 0,
	    xPercent: 0,
	    yPercent: 0,
	    rotation: 0,
	    rotationX: 0,
	    rotationY: 0,
	    scale: 1,
	    skewX: 0,
	    skewY: 0
	  }).progress(1),
	      bounds = element.getBoundingClientRect();
	  tween && tween.progress(0).kill();
	  return bounds;
	},
	    _getSize = function _getSize(element, _ref3) {
	  var d2 = _ref3.d2;
	  return element["offset" + d2] || element["client" + d2] || 0;
	},
	    _getLabelRatioArray = function _getLabelRatioArray(timeline) {
	  var a = [],
	      labels = timeline.labels,
	      duration = timeline.duration(),
	      p;

	  for (p in labels) {
	    a.push(labels[p] / duration);
	  }

	  return a;
	},
	    _getClosestLabel = function _getClosestLabel(animation) {
	  return function (value) {
	    return gsap$2.utils.snap(_getLabelRatioArray(animation), value);
	  };
	},
	    _snapDirectional = function _snapDirectional(snapIncrementOrArray) {
	  var snap = gsap$2.utils.snap(snapIncrementOrArray),
	      a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function (a, b) {
	    return a - b;
	  });
	  return a ? function (value, direction, threshold) {
	    if (threshold === void 0) {
	      threshold = 1e-3;
	    }

	    var i;

	    if (!direction) {
	      return snap(value);
	    }

	    if (direction > 0) {
	      value -= threshold; // to avoid rounding errors. If we're too strict, it might snap forward, then immediately again, and again.

	      for (i = 0; i < a.length; i++) {
	        if (a[i] >= value) {
	          return a[i];
	        }
	      }

	      return a[i - 1];
	    } else {
	      i = a.length;
	      value += threshold;

	      while (i--) {
	        if (a[i] <= value) {
	          return a[i];
	        }
	      }
	    }

	    return a[0];
	  } : function (value, direction, threshold) {
	    if (threshold === void 0) {
	      threshold = 1e-3;
	    }

	    var snapped = snap(value);
	    return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
	  };
	},
	    _getLabelAtDirection = function _getLabelAtDirection(timeline) {
	  return function (value, st) {
	    return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
	  };
	},
	    _multiListener = function _multiListener(func, element, types, callback) {
	  return types.split(",").forEach(function (type) {
	    return func(element, type, callback);
	  });
	},
	    _addListener$1 = function _addListener(element, type, func, nonPassive, capture) {
	  return element.addEventListener(type, func, {
	    passive: !nonPassive,
	    capture: !!capture
	  });
	},
	    _removeListener$1 = function _removeListener(element, type, func, capture) {
	  return element.removeEventListener(type, func, !!capture);
	},
	    _wheelListener = function _wheelListener(func, el, scrollFunc) {
	  return scrollFunc && scrollFunc.wheelHandler && func(el, "wheel", scrollFunc);
	},
	    _markerDefaults = {
	  startColor: "green",
	  endColor: "red",
	  indent: 0,
	  fontSize: "16px",
	  fontWeight: "normal"
	},
	    _defaults$1 = {
	  toggleActions: "play",
	  anticipatePin: 0
	},
	    _keywords = {
	  top: 0,
	  left: 0,
	  center: 0.5,
	  bottom: 1,
	  right: 1
	},
	    _offsetToPx = function _offsetToPx(value, size) {
	  if (_isString$1(value)) {
	    var eqIndex = value.indexOf("="),
	        relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;

	    if (~eqIndex) {
	      value.indexOf("%") > eqIndex && (relative *= size / 100);
	      value = value.substr(0, eqIndex - 1);
	    }

	    value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
	  }

	  return value;
	},
	    _createMarker = function _createMarker(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
	  var startColor = _ref4.startColor,
	      endColor = _ref4.endColor,
	      fontSize = _ref4.fontSize,
	      indent = _ref4.indent,
	      fontWeight = _ref4.fontWeight;

	  var e = _doc$3.createElement("div"),
	      useFixedPosition = _isViewport$1(container) || _getProxyProp(container, "pinType") === "fixed",
	      isScroller = type.indexOf("scroller") !== -1,
	      parent = useFixedPosition ? _body$1 : container,
	      isStart = type.indexOf("start") !== -1,
	      color = isStart ? startColor : endColor,
	      css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";

	  css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
	  (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
	  matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
	  e._isStart = isStart;
	  e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
	  e.style.cssText = css;
	  e.innerText = name || name === 0 ? type + "-" + name : type;
	  parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
	  e._offset = e["offset" + direction.op.d2];

	  _positionMarker(e, 0, direction, isStart);

	  return e;
	},
	    _positionMarker = function _positionMarker(marker, start, direction, flipped) {
	  var vars = {
	    display: "block"
	  },
	      side = direction[flipped ? "os2" : "p2"],
	      oppositeSide = direction[flipped ? "p2" : "os2"];
	  marker._isFlipped = flipped;
	  vars[direction.a + "Percent"] = flipped ? -100 : 0;
	  vars[direction.a] = flipped ? "1px" : 0;
	  vars["border" + side + _Width] = 1;
	  vars["border" + oppositeSide + _Width] = 0;
	  vars[direction.p] = start + "px";
	  gsap$2.set(marker, vars);
	},
	    _triggers = [],
	    _ids = {},
	    _rafID,
	    _sync = function _sync() {
	  return _getTime$1() - _lastScrollTime > 34 && _updateAll();
	},
	    _onScroll$1 = function _onScroll() {
	  // previously, we tried to optimize performance by batching/deferring to the next requestAnimationFrame(), but discovered that Safari has a few bugs that make this unworkable (especially on iOS). See https://codepen.io/GreenSock/pen/16c435b12ef09c38125204818e7b45fc?editors=0010 and https://codepen.io/GreenSock/pen/JjOxYpQ/3dd65ccec5a60f1d862c355d84d14562?editors=0010 and https://codepen.io/GreenSock/pen/ExbrPNa/087cef197dc35445a0951e8935c41503?editors=0010
	  if (!_normalizer$1 || !_normalizer$1.isPressed || _normalizer$1.startX > _body$1.clientWidth) {
	    // if the user is dragging the scrollbar, allow it.
	    _scrollers.cache++;
	    _rafID || (_rafID = requestAnimationFrame(_updateAll));
	    _lastScrollTime || _dispatch("scrollStart");
	    _lastScrollTime = _getTime$1();
	  }
	},
	    _setBaseDimensions = function _setBaseDimensions() {
	  _baseScreenWidth = _win$3.innerWidth;
	  _baseScreenHeight = _win$3.innerHeight;
	},
	    _onResize = function _onResize() {
	  _scrollers.cache++;
	  !_refreshing && !_ignoreResize && !_doc$3.fullscreenElement && !_doc$3.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win$3.innerWidth || Math.abs(_win$3.innerHeight - _baseScreenHeight) > _win$3.innerHeight * 0.25) && _resizeDelay.restart(true);
	},
	    // ignore resizes triggered by refresh()
	_listeners = {},
	    _emptyArray = [],
	    _media = [],
	    _creatingMedia,
	    // when ScrollTrigger.matchMedia() is called, we record the current media key here (like "(min-width: 800px)") so that we can assign it to everything that's created during that call. Then we can revert just those when necessary. In the ScrollTrigger's init() call, the _creatingMedia is recorded as a "media" property on the instance.
	_lastMediaTick,
	    _onMediaChange = function _onMediaChange(e) {
	  var tick = gsap$2.ticker.frame,
	      matches = [],
	      i = 0,
	      index;

	  if (_lastMediaTick !== tick || _startup$1) {
	    _revertAll();

	    for (; i < _media.length; i += 4) {
	      index = _win$3.matchMedia(_media[i]).matches;

	      if (index !== _media[i + 3]) {
	        // note: some browsers fire the matchMedia event multiple times, like when going full screen, so we shouldn't call the function multiple times. Check to see if it's already matched.
	        _media[i + 3] = index;
	        index ? matches.push(i) : _revertAll(1, _media[i]) || _isFunction$1(_media[i + 2]) && _media[i + 2](); // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.
	      }
	    }

	    _revertRecorded(); // in case killing/reverting any of the animations actually added inline styles back.


	    for (i = 0; i < matches.length; i++) {
	      index = matches[i];
	      _creatingMedia = _media[index];
	      _media[index + 2] = _media[index + 1](e);
	    }

	    _creatingMedia = 0;
	    _coreInitted$2 && _refreshAll(0, 1);
	    _lastMediaTick = tick;

	    _dispatch("matchMedia");
	  }
	},
	    _softRefresh = function _softRefresh() {
	  return _removeListener$1(ScrollTrigger$1, "scrollEnd", _softRefresh) || _refreshAll(true);
	},
	    _dispatch = function _dispatch(type) {
	  return _listeners[type] && _listeners[type].map(function (f) {
	    return f();
	  }) || _emptyArray;
	},
	    _savedStyles = [],
	    // when ScrollTrigger.saveStyles() is called, the inline styles are recorded in this Array in a sequential format like [element, cssText, gsCache, media]. This keeps it very memory-efficient and fast to iterate through.
	_revertRecorded = function _revertRecorded(media) {
	  for (var i = 0; i < _savedStyles.length; i += 5) {
	    if (!media || _savedStyles[i + 4] === media) {
	      _savedStyles[i].style.cssText = _savedStyles[i + 1];
	      _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
	      _savedStyles[i + 3].uncache = 1;
	    }
	  }
	},
	    _revertAll = function _revertAll(kill, media) {
	  var trigger;

	  for (_i = 0; _i < _triggers.length; _i++) {
	    trigger = _triggers[_i];

	    if (!media || trigger.media === media) {
	      if (kill) {
	        trigger.kill(1);
	      } else {
	        trigger.revert();
	      }
	    }
	  }

	  media && _revertRecorded(media);
	  media || _dispatch("revert");
	},
	    _clearScrollMemory = function _clearScrollMemory() {
	  return _scrollers.cache++ && _scrollers.forEach(function (obj) {
	    return typeof obj === "function" && (obj.rec = 0);
	  });
	},
	    // zero-out all the recorded scroll positions. Don't use _triggers because if, for example, .matchMedia() is used to create some ScrollTriggers and then the user resizes and it removes ALL ScrollTriggers, and then go back to a size where there are ScrollTriggers, it would have kept the position(s) saved from the initial state.
	_refreshingAll,
	    _refreshID = 0,
	    _refreshAll = function _refreshAll(force, skipRevert) {
	  if (_lastScrollTime && !force) {
	    _addListener$1(ScrollTrigger$1, "scrollEnd", _softRefresh);

	    return;
	  }

	  _refreshingAll = true;

	  var refreshInits = _dispatch("refreshInit");

	  _sort && ScrollTrigger$1.sort();
	  skipRevert || _revertAll();

	  _triggers.slice(0).forEach(function (t) {
	    return t.refresh();
	  }); // don't loop with _i because during a refresh() someone could call ScrollTrigger.update() which would iterate through _i resulting in a skip.


	  _triggers.forEach(function (t) {
	    return t.vars.end === "max" && t.setPositions(t.start, _maxScroll(t.scroller, t._dir));
	  }); // the scroller's max scroll position may change after all the ScrollTriggers refreshed (like pinning could push it down), so we need to loop back and correct any with end: "max".


	  refreshInits.forEach(function (result) {
	    return result && result.render && result.render(-1);
	  }); // if the onRefreshInit() returns an animation (typically a gsap.set()), revert it. This makes it easy to put things in a certain spot before refreshing for measurement purposes, and then put things back.

	  _clearScrollMemory();

	  _resizeDelay.pause();

	  _refreshID++;
	  _refreshingAll = false;

	  _dispatch("refresh");
	},
	    _lastScroll = 0,
	    _direction = 1,
	    _primary,
	    _updateAll = function _updateAll() {
	  if (!_refreshingAll) {
	    ScrollTrigger$1.isUpdating = true;
	    _primary && _primary.update(0); // ScrollSmoother users refreshPriority -9999 to become the primary that gets updated before all others because it affects the scroll position.

	    var l = _triggers.length,
	        time = _getTime$1(),
	        recordVelocity = time - _time1 >= 50,
	        scroll = l && _triggers[0].scroll();

	    _direction = _lastScroll > scroll ? -1 : 1;
	    _lastScroll = scroll;

	    if (recordVelocity) {
	      if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
	        _lastScrollTime = 0;

	        _dispatch("scrollEnd");
	      }

	      _time2 = _time1;
	      _time1 = time;
	    }

	    if (_direction < 0) {
	      _i = l;

	      while (_i-- > 0) {
	        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
	      }

	      _direction = 1;
	    } else {
	      for (_i = 0; _i < l; _i++) {
	        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
	      }
	    }

	    ScrollTrigger$1.isUpdating = false;
	  }

	  _rafID = 0;
	},
	    _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
	    _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]),
	    _swapPinOut = function _swapPinOut(pin, spacer, state) {
	  _setState(state);

	  var cache = pin._gsap;

	  if (cache.spacerIsNative) {
	    _setState(cache.spacerState);
	  } else if (pin.parentNode === spacer) {
	    var parent = spacer.parentNode;

	    if (parent) {
	      parent.insertBefore(pin, spacer);
	      parent.removeChild(spacer);
	    }
	  }
	},
	    _swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
	  if (pin.parentNode !== spacer) {
	    var i = _propNamesToCopy.length,
	        spacerStyle = spacer.style,
	        pinStyle = pin.style,
	        p;

	    while (i--) {
	      p = _propNamesToCopy[i];
	      spacerStyle[p] = cs[p];
	    }

	    spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
	    cs.display === "inline" && (spacerStyle.display = "inline-block");
	    pinStyle[_bottom] = pinStyle[_right] = spacerStyle.flexBasis = "auto";
	    spacerStyle.overflow = "visible";
	    spacerStyle.boxSizing = "border-box";
	    spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
	    spacerStyle[_height] = _getSize(pin, _vertical) + _px;
	    spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";

	    _setState(spacerState);

	    pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
	    pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
	    pinStyle[_padding] = cs[_padding];
	    pin.parentNode.insertBefore(spacer, pin);
	    spacer.appendChild(pin);
	  }
	},
	    _capsExp$1 = /([A-Z])/g,
	    _setState = function _setState(state) {
	  if (state) {
	    var style = state.t.style,
	        l = state.length,
	        i = 0,
	        p,
	        value;
	    (state.t._gsap || gsap$2.core.getCache(state.t)).uncache = 1; // otherwise transforms may be off

	    for (; i < l; i += 2) {
	      value = state[i + 1];
	      p = state[i];

	      if (value) {
	        style[p] = value;
	      } else if (style[p]) {
	        style.removeProperty(p.replace(_capsExp$1, "-$1").toLowerCase());
	      }
	    }
	  }
	},
	    _getState = function _getState(element) {
	  // returns an Array with alternating values like [property, value, property, value] and a "t" property pointing to the target (element). Makes it fast and cheap.
	  var l = _stateProps.length,
	      style = element.style,
	      state = [],
	      i = 0;

	  for (; i < l; i++) {
	    state.push(_stateProps[i], style[_stateProps[i]]);
	  }

	  state.t = element;
	  return state;
	},
	    _copyState = function _copyState(state, override, omitOffsets) {
	  var result = [],
	      l = state.length,
	      i = omitOffsets ? 8 : 0,
	      // skip top, left, right, bottom if omitOffsets is true
	  p;

	  for (; i < l; i += 2) {
	    p = state[i];
	    result.push(p, p in override ? override[p] : state[i + 1]);
	  }

	  result.t = state.t;
	  return result;
	},
	    _winOffsets = {
	  left: 0,
	  top: 0
	},
	    // // potential future feature (?) Allow users to calculate where a trigger hits (scroll position) like getScrollPosition("#id", "top bottom")
	// _getScrollPosition = (trigger, position, {scroller, containerAnimation, horizontal}) => {
	// 	scroller = _getTarget(scroller || _win);
	// 	let direction = horizontal ? _horizontal : _vertical,
	// 		isViewport = _isViewport(scroller);
	// 	_getSizeFunc(scroller, isViewport, direction);
	// 	return _parsePosition(position, _getTarget(trigger), _getSizeFunc(scroller, isViewport, direction)(), direction, _getScrollFunc(scroller, direction)(), 0, 0, 0, _getOffsetsFunc(scroller, isViewport)(), isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, 0, containerAnimation ? containerAnimation.duration() : _maxScroll(scroller), containerAnimation);
	// },
	_parsePosition$1 = function _parsePosition(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation) {
	  _isFunction$1(value) && (value = value(self));

	  if (_isString$1(value) && value.substr(0, 3) === "max") {
	    value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
	  }

	  var time = containerAnimation ? containerAnimation.time() : 0,
	      p1,
	      p2,
	      element;
	  containerAnimation && containerAnimation.seek(0);

	  if (!_isNumber$1(value)) {
	    _isFunction$1(trigger) && (trigger = trigger(self));
	    var offsets = value.split(" "),
	        bounds,
	        localOffset,
	        globalOffset,
	        display;
	    element = _getTarget(trigger) || _body$1;
	    bounds = _getBounds(element) || {};

	    if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
	      // if display is "none", it won't report getBoundingClientRect() properly
	      display = element.style.display;
	      element.style.display = "block";
	      bounds = _getBounds(element);
	      display ? element.style.display = display : element.style.removeProperty("display");
	    }

	    localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
	    globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
	    value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
	    markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
	    scrollerSize -= scrollerSize - globalOffset; // adjust for the marker
	  } else if (markerScroller) {
	    _positionMarker(markerScroller, scrollerSize, direction, true);
	  }

	  if (marker) {
	    var position = value + scrollerSize,
	        isStart = marker._isStart;
	    p1 = "scroll" + direction.d2;

	    _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body$1[p1], _docEl$1[p1]) : marker.parentNode[p1]) <= position + 1);

	    if (useFixedPosition) {
	      scrollerBounds = _getBounds(markerScroller);
	      useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
	    }
	  }

	  if (containerAnimation && element) {
	    p1 = _getBounds(element);
	    containerAnimation.seek(scrollerMax);
	    p2 = _getBounds(element);
	    containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
	    value = value / containerAnimation._caScrollDist * scrollerMax;
	  }

	  containerAnimation && containerAnimation.seek(time);
	  return containerAnimation ? value : Math.round(value);
	},
	    _prefixExp = /(webkit|moz|length|cssText|inset)/i,
	    _reparent = function _reparent(element, parent, top, left) {
	  if (element.parentNode !== parent) {
	    var style = element.style,
	        p,
	        cs;

	    if (parent === _body$1) {
	      element._stOrig = style.cssText; // record original inline styles so we can revert them later

	      cs = _getComputedStyle(element);

	      for (p in cs) {
	        // must copy all relevant styles to ensure that nothing changes visually when we reparent to the <body>. Skip the vendor prefixed ones.
	        if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
	          style[p] = cs[p];
	        }
	      }

	      style.top = top;
	      style.left = left;
	    } else {
	      style.cssText = element._stOrig;
	    }

	    gsap$2.core.getCache(element).uncache = 1;
	    parent.appendChild(element);
	  }
	},
	    // _mergeAnimations = animations => {
	// 	let tl = gsap.timeline({smoothChildTiming: true}).startTime(Math.min(...animations.map(a => a.globalTime(0))));
	// 	animations.forEach(a => {let time = a.totalTime(); tl.add(a); a.totalTime(time); });
	// 	tl.smoothChildTiming = false;
	// 	return tl;
	// },
	// returns a function that can be used to tween the scroll position in the direction provided, and when doing so it'll add a .tween property to the FUNCTION itself, and remove it when the tween completes or gets killed. This gives us a way to have multiple ScrollTriggers use a central function for any given scroller and see if there's a scroll tween running (which would affect if/how things get updated)
	_getTweenCreator = function _getTweenCreator(scroller, direction) {
	  var getScroll = _getScrollFunc(scroller, direction),
	      prop = "_scroll" + direction.p2,
	      // add a tweenable property to the scroller that's a getter/setter function, like _scrollTop or _scrollLeft. This way, if someone does gsap.killTweensOf(scroller) it'll kill the scroll tween.
	  lastScroll1,
	      lastScroll2,
	      getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
	    var tween = getTween.tween,
	        onComplete = vars.onComplete,
	        modifiers = {};
	    initialValue = initialValue || getScroll();
	    change2 = change1 && change2 || 0; // if change1 is 0, we set that to the difference and ignore change2. Otherwise, there would be a compound effect.

	    change1 = change1 || scrollTo - initialValue;
	    tween && tween.kill();
	    lastScroll1 = Math.round(initialValue);
	    vars[prop] = scrollTo;
	    vars.modifiers = modifiers;

	    modifiers[prop] = function (value) {
	      value = _round$1(getScroll()); // round because in some [very uncommon] Windows environments, it can get reported with decimals even though it was set without.

	      if (value !== lastScroll1 && value !== lastScroll2 && Math.abs(value - lastScroll1) > 2 && Math.abs(value - lastScroll2) > 2) {
	        // if the user scrolls, kill the tween. iOS Safari intermittently misreports the scroll position, it may be the most recently-set one or the one before that! When Safari is zoomed (CMD-+), it often misreports as 1 pixel off too! So if we set the scroll position to 125, for example, it'll actually report it as 124.
	        tween.kill();
	        getTween.tween = 0;
	      } else {
	        value = initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio;
	      }

	      lastScroll2 = lastScroll1;
	      return lastScroll1 = _round$1(value);
	    };

	    vars.onComplete = function () {
	      getTween.tween = 0;
	      onComplete && onComplete.call(tween);
	    };

	    tween = getTween.tween = gsap$2.to(scroller, vars);
	    return tween;
	  };

	  scroller[prop] = getScroll;

	  getScroll.wheelHandler = function () {
	    return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
	  };

	  _addListener$1(scroller, "wheel", getScroll.wheelHandler); // Windows machines handle mousewheel scrolling in chunks (like "3 lines per scroll") meaning the typical strategy for cancelling the scroll isn't as sensitive. It's much more likely to match one of the previous 2 scroll event positions. So we kill any snapping as soon as there's a wheel event.


	  return getTween;
	};

	var ScrollTrigger$1 = /*#__PURE__*/function () {
	  function ScrollTrigger(vars, animation) {
	    _coreInitted$2 || ScrollTrigger.register(gsap$2) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
	    this.init(vars, animation);
	  }

	  var _proto = ScrollTrigger.prototype;

	  _proto.init = function init(vars, animation) {
	    this.progress = this.start = 0;
	    this.vars && this.kill(true, true); // in case it's being initted again

	    if (!_enabled) {
	      this.update = this.refresh = this.kill = _passThrough$1;
	      return;
	    }

	    vars = _setDefaults$1(_isString$1(vars) || _isNumber$1(vars) || vars.nodeType ? {
	      trigger: vars
	    } : vars, _defaults$1);

	    var _vars = vars,
	        onUpdate = _vars.onUpdate,
	        toggleClass = _vars.toggleClass,
	        id = _vars.id,
	        onToggle = _vars.onToggle,
	        onRefresh = _vars.onRefresh,
	        scrub = _vars.scrub,
	        trigger = _vars.trigger,
	        pin = _vars.pin,
	        pinSpacing = _vars.pinSpacing,
	        invalidateOnRefresh = _vars.invalidateOnRefresh,
	        anticipatePin = _vars.anticipatePin,
	        onScrubComplete = _vars.onScrubComplete,
	        onSnapComplete = _vars.onSnapComplete,
	        once = _vars.once,
	        snap = _vars.snap,
	        pinReparent = _vars.pinReparent,
	        pinSpacer = _vars.pinSpacer,
	        containerAnimation = _vars.containerAnimation,
	        fastScrollEnd = _vars.fastScrollEnd,
	        preventOverlaps = _vars.preventOverlaps,
	        direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical,
	        isToggle = !scrub && scrub !== 0,
	        scroller = _getTarget(vars.scroller || _win$3),
	        scrollerCache = gsap$2.core.getCache(scroller),
	        isViewport = _isViewport$1(scroller),
	        useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed",
	        callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack],
	        toggleActions = isToggle && vars.toggleActions.split(" "),
	        markers = "markers" in vars ? vars.markers : _defaults$1.markers,
	        borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0,
	        self = this,
	        onRefreshInit = vars.onRefreshInit && function () {
	      return vars.onRefreshInit(self);
	    },
	        getScrollerSize = _getSizeFunc(scroller, isViewport, direction),
	        getScrollerOffsets = _getOffsetsFunc(scroller, isViewport),
	        lastSnap = 0,
	        lastRefresh = 0,
	        scrollFunc = _getScrollFunc(scroller, direction),
	        tweenTo,
	        pinCache,
	        snapFunc,
	        scroll1,
	        scroll2,
	        start,
	        end,
	        markerStart,
	        markerEnd,
	        markerStartTrigger,
	        markerEndTrigger,
	        markerVars,
	        change,
	        pinOriginalState,
	        pinActiveState,
	        pinState,
	        spacer,
	        offset,
	        pinGetter,
	        pinSetter,
	        pinStart,
	        pinChange,
	        spacingStart,
	        spacerState,
	        markerStartSetter,
	        markerEndSetter,
	        cs,
	        snap1,
	        snap2,
	        scrubTween,
	        scrubSmooth,
	        snapDurClamp,
	        snapDelayedCall,
	        prevProgress,
	        prevScroll,
	        prevAnimProgress,
	        caMarkerSetter,
	        customRevertReturn;

	    self.media = _creatingMedia;
	    self._dir = direction;
	    anticipatePin *= 45;
	    self.scroller = scroller;
	    self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
	    scroll1 = scrollFunc();
	    self.vars = vars;
	    animation = animation || vars.animation;

	    if ("refreshPriority" in vars) {
	      _sort = 1;
	      vars.refreshPriority === -9999 && (_primary = self); // used by ScrollSmoother
	    }

	    scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
	      top: _getTweenCreator(scroller, _vertical),
	      left: _getTweenCreator(scroller, _horizontal)
	    };
	    self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];

	    self.scrubDuration = function (value) {
	      scrubSmooth = _isNumber$1(value) && value;

	      if (!scrubSmooth) {
	        scrubTween && scrubTween.progress(1).kill();
	        scrubTween = 0;
	      } else {
	        scrubTween ? scrubTween.duration(value) : scrubTween = gsap$2.to(animation, {
	          ease: "expo",
	          totalProgress: "+=0.001",
	          duration: scrubSmooth,
	          paused: true,
	          onComplete: function onComplete() {
	            return onScrubComplete && onScrubComplete(self);
	          }
	        });
	      }
	    };

	    if (animation) {
	      animation.vars.lazy = false;
	      animation._initted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.render(0, true, true);
	      self.animation = animation.pause();
	      animation.scrollTrigger = self;
	      self.scrubDuration(scrub);
	      snap1 = 0;
	      id || (id = animation.vars.id);
	    }

	    _triggers.push(self);

	    if (snap) {
	      if (!_isObject$1(snap) || snap.push) {
	        snap = {
	          snapTo: snap
	        };
	      }

	      "scrollBehavior" in _body$1.style && gsap$2.set(isViewport ? [_body$1, _docEl$1] : scroller, {
	        scrollBehavior: "auto"
	      }); // smooth scrolling doesn't work with snap.

	      snapFunc = _isFunction$1(snap.snapTo) ? snap.snapTo : snap.snapTo === "labels" ? _getClosestLabel(animation) : snap.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap.directional !== false ? function (value, st) {
	        return _snapDirectional(snap.snapTo)(value, _getTime$1() - lastRefresh < 500 ? 0 : st.direction);
	      } : gsap$2.utils.snap(snap.snapTo);
	      snapDurClamp = snap.duration || {
	        min: 0.1,
	        max: 2
	      };
	      snapDurClamp = _isObject$1(snapDurClamp) ? _clamp$1(snapDurClamp.min, snapDurClamp.max) : _clamp$1(snapDurClamp, snapDurClamp);
	      snapDelayedCall = gsap$2.delayedCall(snap.delay || scrubSmooth / 2 || 0.1, function () {
	        var scroll = scrollFunc(),
	            refreshedRecently = _getTime$1() - lastRefresh < 500,
	            tween = tweenTo.tween;

	        if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
	          var progress = (scroll - start) / change,
	              totalProgress = animation && !isToggle ? animation.totalProgress() : progress,
	              velocity = refreshedRecently ? 0 : (totalProgress - snap2) / (_getTime$1() - _time2) * 1000 || 0,
	              change1 = gsap$2.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185),
	              naturalEnd = progress + (snap.inertia === false ? 0 : change1),
	              endValue = _clamp$1(0, 1, snapFunc(naturalEnd, self)),
	              endScroll = Math.round(start + endValue * change),
	              _snap = snap,
	              onStart = _snap.onStart,
	              _onInterrupt = _snap.onInterrupt,
	              _onComplete = _snap.onComplete;

	          if (scroll <= end && scroll >= start && endScroll !== scroll) {
	            if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
	              // there's an overlapping snap! So we must figure out which one is closer and let that tween live.
	              return;
	            }

	            if (snap.inertia === false) {
	              change1 = endValue - progress;
	            }

	            tweenTo(endScroll, {
	              duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
	              ease: snap.ease || "power3",
	              data: _abs(endScroll - scroll),
	              // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
	              onInterrupt: function onInterrupt() {
	                return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
	              },
	              onComplete: function onComplete() {
	                self.update();
	                lastSnap = scrollFunc();
	                snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
	                onSnapComplete && onSnapComplete(self);
	                _onComplete && _onComplete(self);
	              }
	            }, scroll, change1 * change, endScroll - scroll - change1 * change);
	            onStart && onStart(self, tweenTo.tween);
	          }
	        } else if (self.isActive && lastSnap !== scroll) {
	          snapDelayedCall.restart(true);
	        }
	      }).pause();
	    }

	    id && (_ids[id] = self);
	    trigger = self.trigger = _getTarget(trigger || pin); // if a trigger has some kind of scroll-related effect applied that could contaminate the "y" or "x" position (like a ScrollSmoother effect), we needed a way to temporarily revert it, so we use the stRevert property of the gsCache. It can return another function that we'll call at the end so it can return to its normal state.

	    customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
	    customRevertReturn && (customRevertReturn = customRevertReturn(self));
	    pin = pin === true ? trigger : _getTarget(pin);
	    _isString$1(toggleClass) && (toggleClass = {
	      targets: trigger,
	      className: toggleClass
	    });

	    if (pin) {
	      pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding); // if the parent is display: flex, don't apply pinSpacing by default.

	      self.pin = pin;
	      vars.force3D !== false && gsap$2.set(pin, {
	        force3D: true
	      });
	      pinCache = gsap$2.core.getCache(pin);

	      if (!pinCache.spacer) {
	        // record the spacer and pinOriginalState on the cache in case someone tries pinning the same element with MULTIPLE ScrollTriggers - we don't want to have multiple spacers or record the "original" pin state after it has already been affected by another ScrollTrigger.
	        if (pinSpacer) {
	          pinSpacer = _getTarget(pinSpacer);
	          pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement); // for React & Angular

	          pinCache.spacerIsNative = !!pinSpacer;
	          pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
	        }

	        pinCache.spacer = spacer = pinSpacer || _doc$3.createElement("div");
	        spacer.classList.add("pin-spacer");
	        id && spacer.classList.add("pin-spacer-" + id);
	        pinCache.pinState = pinOriginalState = _getState(pin);
	      } else {
	        pinOriginalState = pinCache.pinState;
	      }

	      self.spacer = spacer = pinCache.spacer;
	      cs = _getComputedStyle(pin);
	      spacingStart = cs[pinSpacing + direction.os2];
	      pinGetter = gsap$2.getProperty(pin);
	      pinSetter = gsap$2.quickSetter(pin, direction.a, _px); // pin.firstChild && !_maxScroll(pin, direction) && (pin.style.overflow = "hidden"); // protects from collapsing margins, but can have unintended consequences as demonstrated here: https://codepen.io/GreenSock/pen/1e42c7a73bfa409d2cf1e184e7a4248d so it was removed in favor of just telling people to set up their CSS to avoid the collapsing margins (overflow: hidden | auto is just one option. Another is border-top: 1px solid transparent).

	      _swapPinIn(pin, spacer, cs);

	      pinState = _getState(pin);
	    }

	    if (markers) {
	      markerVars = _isObject$1(markers) ? _setDefaults$1(markers, _markerDefaults) : _markerDefaults;
	      markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
	      markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
	      offset = markerStartTrigger["offset" + direction.op.d2];

	      var content = _getTarget(_getProxyProp(scroller, "content") || scroller);

	      markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
	      markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
	      containerAnimation && (caMarkerSetter = gsap$2.quickSetter([markerStart, markerEnd], direction.a, _px));

	      if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
	        _makePositionable(isViewport ? _body$1 : scroller);

	        gsap$2.set([markerStartTrigger, markerEndTrigger], {
	          force3D: true
	        });
	        markerStartSetter = gsap$2.quickSetter(markerStartTrigger, direction.a, _px);
	        markerEndSetter = gsap$2.quickSetter(markerEndTrigger, direction.a, _px);
	      }
	    }

	    if (containerAnimation) {
	      var oldOnUpdate = containerAnimation.vars.onUpdate,
	          oldParams = containerAnimation.vars.onUpdateParams;
	      containerAnimation.eventCallback("onUpdate", function () {
	        self.update(0, 0, 1);
	        oldOnUpdate && oldOnUpdate.apply(oldParams || []);
	      });
	    }

	    self.previous = function () {
	      return _triggers[_triggers.indexOf(self) - 1];
	    };

	    self.next = function () {
	      return _triggers[_triggers.indexOf(self) + 1];
	    };

	    self.revert = function (revert) {
	      var r = revert !== false || !self.enabled,
	          prevRefreshing = _refreshing;

	      if (r !== self.isReverted) {
	        if (r) {
	          self.scroll.rec || !_refreshing || !_refreshingAll || (self.scroll.rec = scrollFunc());
	          prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0); // record the scroll so we can revert later (repositioning/pinning things can affect scroll position). In the static refresh() method, we first record all the scroll positions as a reference.

	          prevProgress = self.progress;
	          prevAnimProgress = animation && animation.progress();
	        }

	        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
	          return m.style.display = r ? "none" : "block";
	        });
	        r && (_refreshing = 1);
	        self.update(r); // make sure the pin is back in its original position so that all the measurements are correct.

	        _refreshing = prevRefreshing;
	        pin && (r ? _swapPinOut(pin, spacer, pinOriginalState) : (!pinReparent || !self.isActive) && _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState));
	        self.isReverted = r;
	      }
	    };

	    self.refresh = function (soft, force) {
	      if ((_refreshing || !self.enabled) && !force) {
	        return;
	      }

	      if (pin && soft && _lastScrollTime) {
	        _addListener$1(ScrollTrigger, "scrollEnd", _softRefresh);

	        return;
	      }

	      !_refreshingAll && onRefreshInit && onRefreshInit(self);
	      _refreshing = 1;
	      lastRefresh = _getTime$1();

	      if (tweenTo.tween) {
	        tweenTo.tween.kill();
	        tweenTo.tween = 0;
	      }

	      scrubTween && scrubTween.pause();
	      invalidateOnRefresh && animation && animation.time(-0.01, true).invalidate();
	      self.isReverted || self.revert();

	      var size = getScrollerSize(),
	          scrollerBounds = getScrollerOffsets(),
	          max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction),
	          offset = 0,
	          otherPinOffset = 0,
	          parsedEnd = vars.end,
	          parsedEndTrigger = vars.endTrigger || trigger,
	          parsedStart = vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"),
	          pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer),
	          triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0,
	          i = triggerIndex,
	          cs,
	          bounds,
	          scroll,
	          isVertical,
	          override,
	          curTrigger,
	          curPin,
	          oppositeScroll,
	          initted,
	          revertedPins;

	      while (i--) {
	        // user might try to pin the same element more than once, so we must find any prior triggers with the same pin, revert them, and determine how long they're pinning so that we can offset things appropriately. Make sure we revert from last to first so that things "rewind" properly.
	        curTrigger = _triggers[i];
	        curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = 1); // if it's a timeline-based trigger that hasn't been fully initialized yet because it's waiting for 1 tick, just force the refresh() here, otherwise if it contains a pin that's supposed to affect other ScrollTriggers further down the page, they won't be adjusted properly.

	        curPin = curTrigger.pin;

	        if (curPin && (curPin === trigger || curPin === pin) && !curTrigger.isReverted) {
	          revertedPins || (revertedPins = []);
	          revertedPins.unshift(curTrigger); // we'll revert from first to last to make sure things reach their end state properly

	          curTrigger.revert();
	        }

	        if (curTrigger !== _triggers[i]) {
	          // in case it got removed.
	          triggerIndex--;
	          i--;
	        }
	      }

	      _isFunction$1(parsedStart) && (parsedStart = parsedStart(self));
	      start = _parsePosition$1(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation) || (pin ? -0.001 : 0);
	      _isFunction$1(parsedEnd) && (parsedEnd = parsedEnd(self));

	      if (_isString$1(parsedEnd) && !parsedEnd.indexOf("+=")) {
	        if (~parsedEnd.indexOf(" ")) {
	          parsedEnd = (_isString$1(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
	        } else {
	          offset = _offsetToPx(parsedEnd.substr(2), size);
	          parsedEnd = _isString$1(parsedStart) ? parsedStart : start + offset; // _parsePosition won't factor in the offset if the start is a number, so do it here.

	          parsedEndTrigger = trigger;
	        }
	      }

	      end = Math.max(start, _parsePosition$1(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation)) || -0.001;
	      change = end - start || (start -= 0.01) && 0.001;
	      offset = 0;
	      i = triggerIndex;

	      while (i--) {
	        curTrigger = _triggers[i];
	        curPin = curTrigger.pin;

	        if (curPin && curTrigger.start - curTrigger._pinPush < start && !containerAnimation && curTrigger.end > 0) {
	          cs = curTrigger.end - curTrigger.start;

	          if ((curPin === trigger || curPin === pinnedContainer) && !_isNumber$1(parsedStart)) {
	            // numeric start values shouldn't be offset at all - treat them as absolute
	            offset += cs * (1 - curTrigger.progress);
	          }

	          curPin === pin && (otherPinOffset += cs);
	        }
	      }

	      start += offset;
	      end += offset;
	      self._pinPush = otherPinOffset;

	      if (markerStart && offset) {
	        // offset the markers if necessary
	        cs = {};
	        cs[direction.a] = "+=" + offset;
	        pinnedContainer && (cs[direction.p] = "-=" + scrollFunc());
	        gsap$2.set([markerStart, markerEnd], cs);
	      }

	      if (pin) {
	        cs = _getComputedStyle(pin);
	        isVertical = direction === _vertical;
	        scroll = scrollFunc(); // recalculate because the triggers can affect the scroll

	        pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
	        !max && end > 1 && ((isViewport ? _body$1 : scroller).style["overflow-" + direction.a] = "scroll"); // makes sure the scroller has a scrollbar, otherwise if something has width: 100%, for example, it would be too big (exclude the scrollbar). See https://greensock.com/forums/topic/25182-scrolltrigger-width-of-page-increase-where-markers-are-set-to-false/

	        _swapPinIn(pin, spacer, cs);

	        pinState = _getState(pin); // transforms will interfere with the top/left/right/bottom placement, so remove them temporarily. getBoundingClientRect() factors in transforms.

	        bounds = _getBounds(pin, true);
	        oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();

	        if (pinSpacing) {
	          spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
	          spacerState.t = spacer;
	          i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
	          i && spacerState.push(direction.d, i + _px); // for box-sizing: border-box (must include padding).

	          _setState(spacerState);

	          useFixedPosition && scrollFunc(prevScroll);
	        }

	        if (useFixedPosition) {
	          override = {
	            top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
	            left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
	            boxSizing: "border-box",
	            position: "fixed"
	          };
	          override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
	          override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
	          override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
	          override[_padding] = cs[_padding];
	          override[_padding + _Top] = cs[_padding + _Top];
	          override[_padding + _Right] = cs[_padding + _Right];
	          override[_padding + _Bottom] = cs[_padding + _Bottom];
	          override[_padding + _Left] = cs[_padding + _Left];
	          pinActiveState = _copyState(pinOriginalState, override, pinReparent);
	        }

	        if (animation) {
	          // the animation might be affecting the transform, so we must jump to the end, check the value, and compensate accordingly. Otherwise, when it becomes unpinned, the pinSetter() will get set to a value that doesn't include whatever the animation did.
	          initted = animation._initted; // if not, we must invalidate() after this step, otherwise it could lock in starting values prematurely.

	          _suppressOverwrites$1(1);

	          animation.render(animation.duration(), true, true);
	          pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
	          change !== pinChange && useFixedPosition && pinActiveState.splice(pinActiveState.length - 2, 2); // transform is the last property/value set in the state Array. Since the animation is controlling that, we should omit it.

	          animation.render(0, true, true);
	          initted || animation.invalidate();

	          _suppressOverwrites$1(0);
	        } else {
	          pinChange = change;
	        }
	      } else if (trigger && scrollFunc() && !containerAnimation) {
	        // it may be INSIDE a pinned element, so walk up the tree and look for any elements with _pinOffset to compensate because anything with pinSpacing that's already scrolled would throw off the measurements in getBoundingClientRect()
	        bounds = trigger.parentNode;

	        while (bounds && bounds !== _body$1) {
	          if (bounds._pinOffset) {
	            start -= bounds._pinOffset;
	            end -= bounds._pinOffset;
	          }

	          bounds = bounds.parentNode;
	        }
	      }

	      revertedPins && revertedPins.forEach(function (t) {
	        return t.revert(false);
	      });
	      self.start = start;
	      self.end = end;
	      scroll1 = scroll2 = scrollFunc(); // reset velocity

	      if (!containerAnimation) {
	        scroll1 < prevScroll && scrollFunc(prevScroll);
	        self.scroll.rec = 0;
	      }

	      self.revert(false);

	      if (snapDelayedCall) {
	        lastSnap = -1;
	        self.isActive && scrollFunc(start + change * prevProgress); // just so snapping gets re-enabled, clear out any recorded last value

	        snapDelayedCall.restart(true);
	      }

	      _refreshing = 0;
	      animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress, true).render(animation.time(), true, true); // must force a re-render because if saveStyles() was used on the target(s), the styles could have been wiped out during the refresh().

	      if (prevProgress !== self.progress || containerAnimation) {
	        // ensures that the direction is set properly (when refreshing, progress is set back to 0 initially, then back again to wherever it needs to be) and that callbacks are triggered.
	        animation && !isToggle && animation.totalProgress(prevProgress, true); // to avoid issues where animation callbacks like onStart aren't triggered.

	        self.progress = prevProgress;
	        self.update(0, 0, 1);
	      }

	      pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange)); //			scrubTween && scrubTween.invalidate();

	      onRefresh && onRefresh(self);
	    };

	    self.getVelocity = function () {
	      return (scrollFunc() - scroll2) / (_getTime$1() - _time2) * 1000 || 0;
	    };

	    self.endAnimation = function () {
	      _endAnimation(self.callbackAnimation);

	      if (animation) {
	        scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
	      }
	    };

	    self.labelToScroll = function (label) {
	      return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
	    };

	    self.getTrailing = function (name) {
	      var i = _triggers.indexOf(self),
	          a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);

	      return (_isString$1(name) ? a.filter(function (t) {
	        return t.vars.preventOverlaps === name;
	      }) : a).filter(function (t) {
	        return self.direction > 0 ? t.end <= start : t.start >= end;
	      });
	    };

	    self.update = function (reset, recordVelocity, forceFake) {
	      if (containerAnimation && !forceFake && !reset) {
	        return;
	      }

	      var scroll = self.scroll(),
	          p = reset ? 0 : (scroll - start) / change,
	          clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0,
	          prevProgress = self.progress,
	          isActive,
	          wasActive,
	          toggleState,
	          action,
	          stateChanged,
	          toggled,
	          isAtMax,
	          isTakingAction;

	      if (recordVelocity) {
	        scroll2 = scroll1;
	        scroll1 = containerAnimation ? scrollFunc() : scroll;

	        if (snap) {
	          snap2 = snap1;
	          snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
	        }
	      } // anticipate the pinning a few ticks ahead of time based on velocity to avoid a visual glitch due to the fact that most browsers do scrolling on a separate thread (not synced with requestAnimationFrame).


	      anticipatePin && !clipped && pin && !_refreshing && !_startup$1 && _lastScrollTime && start < scroll + (scroll - scroll2) / (_getTime$1() - _time2) * anticipatePin && (clipped = 0.0001);

	      if (clipped !== prevProgress && self.enabled) {
	        isActive = self.isActive = !!clipped && clipped < 1;
	        wasActive = !!prevProgress && prevProgress < 1;
	        toggled = isActive !== wasActive;
	        stateChanged = toggled || !!clipped !== !!prevProgress; // could go from start all the way to end, thus it didn't toggle but it did change state in a sense (may need to fire a callback)

	        self.direction = clipped > prevProgress ? 1 : -1;
	        self.progress = clipped;

	        if (stateChanged && !_refreshing) {
	          toggleState = clipped && !prevProgress ? 0 : clipped === 1 ? 1 : prevProgress === 1 ? 2 : 3; // 0 = enter, 1 = leave, 2 = enterBack, 3 = leaveBack (we prioritize the FIRST encounter, thus if you scroll really fast past the onEnter and onLeave in one tick, it'd prioritize onEnter.

	          if (isToggle) {
	            action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState]; // if it didn't toggle, that means it shot right past and since we prioritize the "enter" action, we should switch to the "leave" in this case (but only if one is defined)

	            isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
	          }
	        }

	        preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction$1(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function (t) {
	          return t.endAnimation();
	        }));

	        if (!isToggle) {
	          if (scrubTween && !_refreshing && !_startup$1) {
	            (containerAnimation || _primary && _primary !== self) && scrubTween.render(scrubTween._dp._time - scrubTween._start); // if there's a scrub on both the container animation and this one (or a ScrollSmoother), the update order would cause this one not to have rendered yet, so it wouldn't make any progress before we .restart() it heading toward the new progress so it'd appear stuck thus we force a render here.

	            if (scrubTween.resetTo) {
	              scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
	            } else {
	              // legacy support (courtesy), before 3.10.0
	              scrubTween.vars.totalProgress = clipped;
	              scrubTween.invalidate().restart();
	            }
	          } else if (animation) {
	            animation.totalProgress(clipped, !!_refreshing);
	          }
	        }

	        if (pin) {
	          reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);

	          if (!useFixedPosition) {
	            pinSetter(_round$1(pinStart + pinChange * clipped));
	          } else if (stateChanged) {
	            isAtMax = !reset && clipped > prevProgress && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction); // if it's at the VERY end of the page, don't switch away from position: fixed because it's pointless and it could cause a brief flash when the user scrolls back up (when it gets pinned again)

	            if (pinReparent) {
	              if (!reset && (isActive || isAtMax)) {
	                var bounds = _getBounds(pin, true),
	                    _offset = scroll - start;

	                _reparent(pin, _body$1, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
	              } else {
	                _reparent(pin, spacer);
	              }
	            }

	            _setState(isActive || isAtMax ? pinActiveState : pinState);

	            pinChange !== change && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
	          }
	        }

	        snap && !tweenTo.tween && !_refreshing && !_startup$1 && snapDelayedCall.restart(true);
	        toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function (el) {
	          return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
	        }); // classes could affect positioning, so do it even if reset or refreshing is true.

	        onUpdate && !isToggle && !reset && onUpdate(self);

	        if (stateChanged && !_refreshing) {
	          if (isToggle) {
	            if (isTakingAction) {
	              if (action === "complete") {
	                animation.pause().totalProgress(1);
	              } else if (action === "reset") {
	                animation.restart(true).pause();
	              } else if (action === "restart") {
	                animation.restart(true);
	              } else {
	                animation[action]();
	              }
	            }

	            onUpdate && onUpdate(self);
	          }

	          if (toggled || !_limitCallbacks) {
	            // on startup, the page could be scrolled and we don't want to fire callbacks that didn't toggle. For example onEnter shouldn't fire if the ScrollTrigger isn't actually entered.
	            onToggle && toggled && _callback$1(self, onToggle);
	            callbacks[toggleState] && _callback$1(self, callbacks[toggleState]);
	            once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0); // a callback shouldn't be called again if once is true.

	            if (!toggled) {
	              // it's possible to go completely past, like from before the start to after the end (or vice-versa) in which case BOTH callbacks should be fired in that order
	              toggleState = clipped === 1 ? 1 : 3;
	              callbacks[toggleState] && _callback$1(self, callbacks[toggleState]);
	            }
	          }

	          if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber$1(fastScrollEnd) ? fastScrollEnd : 2500)) {
	            _endAnimation(self.callbackAnimation);

	            scrubTween ? scrubTween.progress(1) : _endAnimation(animation, !clipped, 1);
	          }
	        } else if (isToggle && onUpdate && !_refreshing) {
	          onUpdate(self);
	        }
	      } // update absolutely-positioned markers (only if the scroller isn't the viewport)


	      if (markerEndSetter) {
	        var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
	        markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
	        markerEndSetter(n);
	      }

	      caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
	    };

	    self.enable = function (reset, refresh) {
	      if (!self.enabled) {
	        self.enabled = true;

	        _addListener$1(scroller, "resize", _onResize);

	        _addListener$1(isViewport ? _doc$3 : scroller, "scroll", _onScroll$1);

	        onRefreshInit && _addListener$1(ScrollTrigger, "refreshInit", onRefreshInit);

	        if (reset !== false) {
	          self.progress = prevProgress = 0;
	          scroll1 = scroll2 = lastSnap = scrollFunc();
	        }

	        refresh !== false && self.refresh();
	      }
	    };

	    self.getTween = function (snap) {
	      return snap && tweenTo ? tweenTo.tween : scrubTween;
	    };

	    self.setPositions = function (newStart, newEnd) {
	      // doesn't persist after refresh()! Intended to be a way to override values that were set during refresh(), like you could set it in onRefresh()
	      if (pin) {
	        pinStart += newStart - start;
	        pinChange += newEnd - newStart - change;
	      }

	      self.start = start = newStart;
	      self.end = end = newEnd;
	      change = newEnd - newStart;
	      self.update();
	    };

	    self.disable = function (reset, allowAnimation) {
	      if (self.enabled) {
	        reset !== false && self.revert();
	        self.enabled = self.isActive = false;
	        allowAnimation || scrubTween && scrubTween.pause();
	        prevScroll = 0;
	        pinCache && (pinCache.uncache = 1);
	        onRefreshInit && _removeListener$1(ScrollTrigger, "refreshInit", onRefreshInit);

	        if (snapDelayedCall) {
	          snapDelayedCall.pause();
	          tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
	        }

	        if (!isViewport) {
	          var i = _triggers.length;

	          while (i--) {
	            if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
	              return; //don't remove the listeners if there are still other triggers referencing it.
	            }
	          }

	          _removeListener$1(scroller, "resize", _onResize);

	          _removeListener$1(scroller, "scroll", _onScroll$1);
	        }
	      }
	    };

	    self.kill = function (revert, allowAnimation) {
	      self.disable(revert, allowAnimation);
	      scrubTween && !allowAnimation && scrubTween.kill();
	      id && delete _ids[id];

	      var i = _triggers.indexOf(self);

	      i >= 0 && _triggers.splice(i, 1);
	      i === _i && _direction > 0 && _i--; // if we're in the middle of a refresh() or update(), splicing would cause skips in the index, so adjust...
	      // if no other ScrollTrigger instances of the same scroller are found, wipe out any recorded scroll position. Otherwise, in a single page application, for example, it could maintain scroll position when it really shouldn't.

	      i = 0;

	      _triggers.forEach(function (t) {
	        return t.scroller === self.scroller && (i = 1);
	      });

	      i || (self.scroll.rec = 0);

	      if (animation) {
	        animation.scrollTrigger = null;
	        revert && animation.render(-1);
	        allowAnimation || animation.kill();
	      }

	      markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
	        return m.parentNode && m.parentNode.removeChild(m);
	      });
	      _primary === self && (_primary = 0);

	      if (pin) {
	        pinCache && (pinCache.uncache = 1);
	        i = 0;

	        _triggers.forEach(function (t) {
	          return t.pin === pin && i++;
	        });

	        i || (pinCache.spacer = 0); // if there aren't any more ScrollTriggers with the same pin, remove the spacer, otherwise it could be contaminated with old/stale values if the user re-creates a ScrollTrigger for the same element.
	      }

	      vars.onKill && vars.onKill(self);
	    };

	    self.enable(false, false);
	    customRevertReturn && customRevertReturn(self);
	    !animation || !animation.add || change ? self.refresh() : gsap$2.delayedCall(0.01, function () {
	      return start || end || self.refresh();
	    }) && (change = 0.01) && (start = end = 0); // if the animation is a timeline, it may not have been populated yet, so it wouldn't render at the proper place on the first refresh(), thus we should schedule one for the next tick. If "change" is defined, we know it must be re-enabling, thus we can refresh() right away.
	  };

	  ScrollTrigger.register = function register(core) {
	    if (!_coreInitted$2) {
	      gsap$2 = core || _getGSAP$1();
	      _windowExists$2() && window.document && ScrollTrigger.enable();
	      _coreInitted$2 = _enabled;
	    }

	    return _coreInitted$2;
	  };

	  ScrollTrigger.defaults = function defaults(config) {
	    if (config) {
	      for (var p in config) {
	        _defaults$1[p] = config[p];
	      }
	    }

	    return _defaults$1;
	  };

	  ScrollTrigger.disable = function disable(reset, kill) {
	    _enabled = 0;

	    _triggers.forEach(function (trigger) {
	      return trigger[kill ? "kill" : "disable"](reset);
	    });

	    _removeListener$1(_win$3, "wheel", _onScroll$1);

	    _removeListener$1(_doc$3, "scroll", _onScroll$1);

	    clearInterval(_syncInterval);

	    _removeListener$1(_doc$3, "touchcancel", _passThrough$1);

	    _removeListener$1(_body$1, "touchstart", _passThrough$1);

	    _multiListener(_removeListener$1, _doc$3, "pointerdown,touchstart,mousedown", _pointerDownHandler);

	    _multiListener(_removeListener$1, _doc$3, "pointerup,touchend,mouseup", _pointerUpHandler);

	    _resizeDelay.kill();

	    _iterateAutoRefresh(_removeListener$1);

	    for (var i = 0; i < _scrollers.length; i += 3) {
	      _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 1]);

	      _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 2]);
	    }
	  };

	  ScrollTrigger.enable = function enable() {
	    _win$3 = window;
	    _doc$3 = document;
	    _docEl$1 = _doc$3.documentElement;
	    _body$1 = _doc$3.body;

	    if (gsap$2) {
	      _toArray = gsap$2.utils.toArray;
	      _clamp$1 = gsap$2.utils.clamp;
	      _suppressOverwrites$1 = gsap$2.core.suppressOverwrites || _passThrough$1;
	      gsap$2.core.globals("ScrollTrigger", ScrollTrigger); // must register the global manually because in Internet Explorer, functions (classes) don't have a "name" property.

	      if (_body$1) {
	        _enabled = 1;
	        Observer.register(gsap$2); // isTouch is 0 if no touch, 1 if ONLY touch, and 2 if it can accommodate touch but also other types like mouse/pointer.

	        ScrollTrigger.isTouch = Observer.isTouch;
	        _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent); // since 2017, iOS has had a bug that causes event.clientX/Y to be inaccurate when a scroll occurs, thus we must alternate ignoring every other touchmove event to work around it. See https://bugs.webkit.org/show_bug.cgi?id=181954 and https://codepen.io/GreenSock/pen/ExbrPNa/087cef197dc35445a0951e8935c41503

	        _addListener$1(_win$3, "wheel", _onScroll$1); // mostly for 3rd party smooth scrolling libraries.


	        _root$1 = [_win$3, _doc$3, _docEl$1, _body$1];
	        ScrollTrigger.matchMedia({
	          // when orientation changes, we should take new base measurements for the ignoreMobileResize feature.
	          "(orientation: portrait)": function orientationPortrait() {
	            _setBaseDimensions();

	            return _setBaseDimensions;
	          }
	        });

	        _addListener$1(_doc$3, "scroll", _onScroll$1); // some browsers (like Chrome), the window stops dispatching scroll events on the window if you scroll really fast, but it's consistent on the document!


	        var bodyStyle = _body$1.style,
	            border = bodyStyle.borderTopStyle,
	            bounds,
	            i;
	        bodyStyle.borderTopStyle = "solid"; // works around an issue where a margin of a child element could throw off the bounds of the _body, making it seem like there's a margin when there actually isn't. The border ensures that the bounds are accurate.

	        bounds = _getBounds(_body$1);
	        _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0; // accommodate the offset of the <body> caused by margins and/or padding

	        _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
	        border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style"); // TODO: (?) maybe move to leveraging the velocity mechanism in Observer and skip intervals.

	        _syncInterval = setInterval(_sync, 250);
	        gsap$2.delayedCall(0.5, function () {
	          return _startup$1 = 0;
	        });

	        _addListener$1(_doc$3, "touchcancel", _passThrough$1); // some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document.


	        _addListener$1(_body$1, "touchstart", _passThrough$1); //works around Safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/


	        _multiListener(_addListener$1, _doc$3, "pointerdown,touchstart,mousedown", _pointerDownHandler);

	        _multiListener(_addListener$1, _doc$3, "pointerup,touchend,mouseup", _pointerUpHandler);

	        _transformProp$1 = gsap$2.utils.checkPrefix("transform");

	        _stateProps.push(_transformProp$1);

	        _coreInitted$2 = _getTime$1();
	        _resizeDelay = gsap$2.delayedCall(0.2, _refreshAll).pause();
	        _autoRefresh = [_doc$3, "visibilitychange", function () {
	          var w = _win$3.innerWidth,
	              h = _win$3.innerHeight;

	          if (_doc$3.hidden) {
	            _prevWidth = w;
	            _prevHeight = h;
	          } else if (_prevWidth !== w || _prevHeight !== h) {
	            _onResize();
	          }
	        }, _doc$3, "DOMContentLoaded", _refreshAll, _win$3, "load", _refreshAll, _win$3, "resize", _onResize];

	        _iterateAutoRefresh(_addListener$1);

	        _triggers.forEach(function (trigger) {
	          return trigger.enable(0, 1);
	        });

	        for (i = 0; i < _scrollers.length; i += 3) {
	          _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 1]);

	          _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 2]);
	        }
	      }
	    }
	  };

	  ScrollTrigger.config = function config(vars) {
	    "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
	    var ms = vars.syncInterval;
	    ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
	    "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger.isTouch === 1 && vars.ignoreMobileResize);

	    if ("autoRefreshEvents" in vars) {
	      _iterateAutoRefresh(_removeListener$1) || _iterateAutoRefresh(_addListener$1, vars.autoRefreshEvents || "none");
	      _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
	    }
	  };

	  ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
	    var t = _getTarget(target),
	        i = _scrollers.indexOf(t),
	        isViewport = _isViewport$1(t);

	    if (~i) {
	      _scrollers.splice(i, isViewport ? 6 : 2);
	    }

	    if (vars) {
	      isViewport ? _proxies.unshift(_win$3, vars, _body$1, vars, _docEl$1, vars) : _proxies.unshift(t, vars);
	    }
	  };

	  ScrollTrigger.matchMedia = function matchMedia(vars) {
	    // _media is populated in the following order: mediaQueryString, onMatch, onUnmatch, isMatched. So if there are two media queries, the Array would have a length of 8
	    var mq, p, i, func, result;

	    for (p in vars) {
	      i = _media.indexOf(p);
	      func = vars[p];
	      _creatingMedia = p;

	      if (p === "all") {
	        func();
	      } else {
	        mq = _win$3.matchMedia(p);

	        if (mq) {
	          mq.matches && (result = func());

	          if (~i) {
	            _media[i + 1] = _combineFunc(_media[i + 1], func);
	            _media[i + 2] = _combineFunc(_media[i + 2], result);
	          } else {
	            i = _media.length;

	            _media.push(p, func, result);

	            mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
	          }

	          _media[i + 3] = mq.matches;
	        }
	      }

	      _creatingMedia = 0;
	    }

	    return _media;
	  };

	  ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
	    query || (_media.length = 0);
	    query = _media.indexOf(query);
	    query >= 0 && _media.splice(query, 4);
	  };

	  ScrollTrigger.isInViewport = function isInViewport(element, ratio, horizontal) {
	    var bounds = (_isString$1(element) ? _getTarget(element) : element).getBoundingClientRect(),
	        offset = bounds[horizontal ? _width : _height] * ratio || 0;
	    return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win$3.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win$3.innerHeight;
	  };

	  ScrollTrigger.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
	    _isString$1(element) && (element = _getTarget(element));
	    var bounds = element.getBoundingClientRect(),
	        size = bounds[horizontal ? _width : _height],
	        offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
	    return horizontal ? (bounds.left + offset) / _win$3.innerWidth : (bounds.top + offset) / _win$3.innerHeight;
	  };

	  return ScrollTrigger;
	}();
	ScrollTrigger$1.version = "3.10.4";

	ScrollTrigger$1.saveStyles = function (targets) {
	  return targets ? _toArray(targets).forEach(function (target) {
	    // saved styles are recorded in a consecutive alternating Array, like [element, cssText, transform attribute, cache, matchMedia, ...]
	    if (target && target.style) {
	      var i = _savedStyles.indexOf(target);

	      i >= 0 && _savedStyles.splice(i, 5);

	      _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap$2.core.getCache(target), _creatingMedia);
	    }
	  }) : _savedStyles;
	};

	ScrollTrigger$1.revert = function (soft, media) {
	  return _revertAll(!soft, media);
	};

	ScrollTrigger$1.create = function (vars, animation) {
	  return new ScrollTrigger$1(vars, animation);
	};

	ScrollTrigger$1.refresh = function (safe) {
	  return safe ? _onResize() : (_coreInitted$2 || ScrollTrigger$1.register()) && _refreshAll(true);
	};

	ScrollTrigger$1.update = _updateAll;
	ScrollTrigger$1.clearScrollMemory = _clearScrollMemory;

	ScrollTrigger$1.maxScroll = function (element, horizontal) {
	  return _maxScroll(element, horizontal ? _horizontal : _vertical);
	};

	ScrollTrigger$1.getScrollFunc = function (element, horizontal) {
	  return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
	};

	ScrollTrigger$1.getById = function (id) {
	  return _ids[id];
	};

	ScrollTrigger$1.getAll = function () {
	  return _triggers.filter(function (t) {
	    return t.vars.id !== "ScrollSmoother";
	  });
	}; // it's common for people to ScrollTrigger.getAll(t => t.kill()) on page routes, for example, and we don't want it to ruin smooth scrolling by killing the main ScrollSmoother one.


	ScrollTrigger$1.isScrolling = function () {
	  return !!_lastScrollTime;
	};

	ScrollTrigger$1.snapDirectional = _snapDirectional;

	ScrollTrigger$1.addEventListener = function (type, callback) {
	  var a = _listeners[type] || (_listeners[type] = []);
	  ~a.indexOf(callback) || a.push(callback);
	};

	ScrollTrigger$1.removeEventListener = function (type, callback) {
	  var a = _listeners[type],
	      i = a && a.indexOf(callback);
	  i >= 0 && a.splice(i, 1);
	};

	ScrollTrigger$1.batch = function (targets, vars) {
	  var result = [],
	      varsCopy = {},
	      interval = vars.interval || 0.016,
	      batchMax = vars.batchMax || 1e9,
	      proxyCallback = function proxyCallback(type, callback) {
	    var elements = [],
	        triggers = [],
	        delay = gsap$2.delayedCall(interval, function () {
	      callback(elements, triggers);
	      elements = [];
	      triggers = [];
	    }).pause();
	    return function (self) {
	      elements.length || delay.restart(true);
	      elements.push(self.trigger);
	      triggers.push(self);
	      batchMax <= elements.length && delay.progress(1);
	    };
	  },
	      p;

	  for (p in vars) {
	    varsCopy[p] = p.substr(0, 2) === "on" && _isFunction$1(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
	  }

	  if (_isFunction$1(batchMax)) {
	    batchMax = batchMax();

	    _addListener$1(ScrollTrigger$1, "refresh", function () {
	      return batchMax = vars.batchMax();
	    });
	  }

	  _toArray(targets).forEach(function (target) {
	    var config = {};

	    for (p in varsCopy) {
	      config[p] = varsCopy[p];
	    }

	    config.trigger = target;
	    result.push(ScrollTrigger$1.create(config));
	  });

	  return result;
	}; // to reduce file size. clamps the scroll and also returns a duration multiplier so that if the scroll gets chopped shorter, the duration gets curtailed as well (otherwise if you're very close to the top of the page, for example, and swipe up really fast, it'll suddenly slow down and take a long time to reach the top).


	var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier(scrollFunc, current, end, max) {
	  current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
	  return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
	},
	    _allowNativePanning = function _allowNativePanning(target, direction) {
	  if (direction === true) {
	    target.style.removeProperty("touch-action");
	  } else {
	    target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none"; // note: Firefox doesn't support it pinch-zoom properly, at least in addition to a pan-x or pan-y.
	  }

	  target === _docEl$1 && _allowNativePanning(_body$1, direction);
	},
	    _overflow = {
	  auto: 1,
	  scroll: 1
	},
	    _nestedScroll = function _nestedScroll(_ref5) {
	  var event = _ref5.event,
	      target = _ref5.target,
	      axis = _ref5.axis;

	  var node = (event.changedTouches ? event.changedTouches[0] : event).target,
	      cache = node._gsap || gsap$2.core.getCache(node),
	      time = _getTime$1(),
	      cs;

	  if (!cache._isScrollT || time - cache._isScrollT > 2000) {
	    // cache for 2 seconds to improve performance.
	    while (node && node.scrollHeight <= node.clientHeight) {
	      node = node.parentNode;
	    }

	    cache._isScroll = node && !_isViewport$1(node) && node !== target && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
	    cache._isScrollT = time;
	  }

	  (cache._isScroll || axis === "x") && (event._gsapAllow = true);
	},
	    // capture events on scrollable elements INSIDE the <body> and allow those by calling stopPropagation() when we find a scrollable ancestor
	_inputObserver = function _inputObserver(target, type, inputs, nested) {
	  return Observer.create({
	    target: target,
	    capture: true,
	    debounce: false,
	    lockAxis: true,
	    type: type,
	    onWheel: nested = nested && _nestedScroll,
	    onPress: nested,
	    onDrag: nested,
	    onScroll: nested,
	    onEnable: function onEnable() {
	      return inputs && _addListener$1(_doc$3, Observer.eventTypes[0], _captureInputs, false, true);
	    },
	    onDisable: function onDisable() {
	      return _removeListener$1(_doc$3, Observer.eventTypes[0], _captureInputs, true);
	    }
	  });
	},
	    _inputExp = /(input|label|select|textarea)/i,
	    _inputIsFocused,
	    _captureInputs = function _captureInputs(e) {
	  var isInput = _inputExp.test(e.target.tagName);

	  if (isInput || _inputIsFocused) {
	    e._gsapAllow = true;
	    _inputIsFocused = isInput;
	  }
	},
	    _getScrollNormalizer = function _getScrollNormalizer(vars) {
	  _isObject$1(vars) || (vars = {});
	  vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
	  vars.type || (vars.type = "wheel,touch");
	  vars.debounce = !!vars.debounce;
	  vars.id = vars.id || "normalizer";

	  var _vars2 = vars,
	      normalizeScrollX = _vars2.normalizeScrollX,
	      momentum = _vars2.momentum,
	      allowNestedScroll = _vars2.allowNestedScroll,
	      self,
	      maxY,
	      target = _getTarget(vars.target) || _docEl$1,
	      smoother = gsap$2.core.globals().ScrollSmoother,
	      content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smoother && smoother.get() && smoother.get().content()),
	      scrollFuncY = _getScrollFunc(target, _vertical),
	      scrollFuncX = _getScrollFunc(target, _horizontal),
	      scale = 1,
	      initialScale = (Observer.isTouch && _win$3.visualViewport ? _win$3.visualViewport.scale * _win$3.visualViewport.width : _win$3.outerWidth) / _win$3.innerWidth,
	      wheelRefresh = 0,
	      resolveMomentumDuration = _isFunction$1(momentum) ? function () {
	    return momentum(self);
	  } : function () {
	    return momentum || 2.8;
	  },
	      skipTouchMove,
	      lastRefreshID,
	      inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll),
	      resumeTouchMove = function resumeTouchMove() {
	    return skipTouchMove = false;
	  },
	      scrollClampX = _passThrough$1,
	      scrollClampY = _passThrough$1,
	      updateClamps = function updateClamps() {
	    maxY = _maxScroll(target, _vertical);
	    scrollClampY = _clamp$1(_fixIOSBug ? 1 : 0, maxY);
	    normalizeScrollX && (scrollClampX = _clamp$1(0, _maxScroll(target, _horizontal)));
	    lastRefreshID = _refreshID;
	  },
	      ignoreDrag = function ignoreDrag() {
	    if (skipTouchMove) {
	      requestAnimationFrame(resumeTouchMove); // we MUST wait for a requestAnimationFrame, otherwise iOS will misreport the value.

	      var offset = _round$1(self.deltaY / 2),
	          scroll = scrollClampY(scrollFuncY.v - offset);

	      if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
	        scrollFuncY.offset = scroll - scrollFuncY.v;
	        content.style.transform = "translateY(" + -scrollFuncY.offset + "px)";
	        content._gsap && (content._gsap.y = -scrollFuncY.offset + "px");
	        scrollFuncY.cacheID = _scrollers.cache;

	        _updateAll();
	      }

	      return true;
	    }

	    if (content) {
	      content.style.transform = "translateY(0px)";
	      scrollFuncY.offset = scrollFuncY.cacheID = 0;
	      content._gsap && (content._gsap.y = "0px");
	    }

	    skipTouchMove = true;
	  },
	      tween,
	      startScrollX,
	      startScrollY,
	      onStopDelayedCall,
	      onResize = function onResize() {
	    // if the window resizes, like on an iPhone which Apple FORCES the address bar to show/hide even if we event.preventDefault(), it may be scrolling too far now that the address bar is showing, so we must dynamically adjust the momentum tween.
	    updateClamps();

	    if (tween.isActive() && tween.vars.scrollY > maxY) {
	      scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
	    }
	  };

	  vars.ignoreCheck = function (e) {
	    return _fixIOSBug && e.type === "touchmove" && ignoreDrag() || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
	  };

	  vars.onPress = function () {
	    var prevScale = scale;
	    scale = _round$1((_win$3.visualViewport && _win$3.visualViewport.scale || 1) / initialScale);
	    tween.pause();
	    prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
	    skipTouchMove = false;
	    startScrollX = scrollFuncX();
	    startScrollY = scrollFuncY();
	    updateClamps();
	    lastRefreshID = _refreshID;
	  };

	  vars.onRelease = vars.onGestureStart = function (self, wasDragging) {
	    if (content) {
	      content.style.transform = "translateY(0px)";
	      scrollFuncY.offset = scrollFuncY.cacheID = 0;
	      content._gsap && (content._gsap.y = "0px");
	    }

	    if (!wasDragging) {
	      onStopDelayedCall.restart(true);
	    } else {
	      _scrollers.cache++; // make sure we're pulling the non-cached value
	      // alternate algorithm: durX = Math.min(6, Math.abs(self.velocityX / 800)),	dur = Math.max(durX, Math.min(6, Math.abs(self.velocityY / 800))); dur = dur * (0.4 + (1 - _power4In(dur / 6)) * 0.6)) * (momentumSpeed || 1)

	      var dur = resolveMomentumDuration(),
	          currentScroll,
	          endScroll;

	      if (normalizeScrollX) {
	        currentScroll = scrollFuncX();
	        endScroll = currentScroll + dur * 0.05 * -self.velocityX / 0.227; // the constant .227 is from power4(0.05). velocity is inverted because scrolling goes in the opposite direction.

	        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
	        tween.vars.scrollX = scrollClampX(endScroll);
	      }

	      currentScroll = scrollFuncY();
	      endScroll = currentScroll + dur * 0.05 * -self.velocityY / 0.227; // the constant .227 is from power4(0.05)

	      dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
	      tween.vars.scrollY = scrollClampY(endScroll);
	      tween.invalidate().duration(dur).play(0.01);

	      if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
	        // iOS bug: it'll show the address bar but NOT fire the window "resize" event until the animation is done but we must protect against overshoot so we leverage an onUpdate to do so.
	        gsap$2.to({}, {
	          onUpdate: onResize,
	          duration: dur
	        });
	      }
	    }
	  };

	  vars.onWheel = function () {
	    tween._ts && tween.pause();

	    if (_getTime$1() - wheelRefresh > 1000) {
	      // after 1 second, refresh the clamps otherwise that'll only happen when ScrollTrigger.refresh() is called or for touch-scrolling.
	      lastRefreshID = 0;
	      wheelRefresh = _getTime$1();
	    }
	  };

	  vars.onChange = function (self, dx, dy, xArray, yArray) {
	    _refreshID !== lastRefreshID && updateClamps();
	    dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self.startX - self.x) : scrollFuncX() + dx - xArray[1])); // for more precision, we track pointer/touch movement from the start, otherwise it'll drift.

	    dy && scrollFuncY(scrollClampY(yArray[2] === dy ? startScrollY + (self.startY - self.y) : scrollFuncY() + dy - yArray[1]));

	    _updateAll();
	  };

	  vars.onEnable = function () {
	    _allowNativePanning(target, normalizeScrollX ? false : "x");

	    _addListener$1(_win$3, "resize", onResize);

	    inputObserver.enable();
	  };

	  vars.onDisable = function () {
	    _allowNativePanning(target, true);

	    _removeListener$1(_win$3, "resize", onResize);

	    inputObserver.kill();
	  };

	  self = new Observer(vars);
	  self.iOS = _fixIOSBug; // used in the Observer getCachedScroll() function to work around an iOS bug that wreaks havoc with TouchEvent.clientY if we allow scroll to go all the way back to 0.

	  _fixIOSBug && !scrollFuncY() && scrollFuncY(1); // iOS bug causes event.clientY values to freak out (wildly inaccurate) if the scroll position is exactly 0.

	  onStopDelayedCall = self._dc;
	  tween = gsap$2.to(self, {
	    ease: "power4",
	    paused: true,
	    scrollX: normalizeScrollX ? "+=0.1" : "+=0",
	    scrollY: "+=0.1",
	    onComplete: onStopDelayedCall.vars.onComplete
	  });
	  return self;
	};

	ScrollTrigger$1.sort = function (func) {
	  return _triggers.sort(func || function (a, b) {
	    return (a.vars.refreshPriority || 0) * -1e6 + a.start - (b.start + (b.vars.refreshPriority || 0) * -1e6);
	  });
	};

	ScrollTrigger$1.observe = function (vars) {
	  return new Observer(vars);
	};

	ScrollTrigger$1.normalizeScroll = function (vars) {
	  if (typeof vars === "undefined") {
	    return _normalizer$1;
	  }

	  if (vars === true && _normalizer$1) {
	    return _normalizer$1.enable();
	  }

	  if (vars === false) {
	    return _normalizer$1 && _normalizer$1.kill();
	  }

	  var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
	  _normalizer$1 && _normalizer$1.target === normalizer.target && _normalizer$1.kill();
	  _isViewport$1(normalizer.target) && (_normalizer$1 = normalizer);
	  return normalizer;
	};

	ScrollTrigger$1.core = {
	  // smaller file size way to leverage in ScrollSmoother and Observer
	  _getVelocityProp: _getVelocityProp,
	  _inputObserver: _inputObserver,
	  _scrollers: _scrollers,
	  _proxies: _proxies,
	  bridge: {
	    // when normalizeScroll sets the scroll position (ss = setScroll)
	    ss: function ss() {
	      _lastScrollTime || _dispatch("scrollStart");
	      _lastScrollTime = _getTime$1();
	    },
	    // a way to get the _refreshing value in Observer
	    ref: function ref() {
	      return _refreshing;
	    }
	  }
	};
	_getGSAP$1() && gsap$2.registerPlugin(ScrollTrigger$1);

	function noop() { }
	const identity = x => x;
	function assign(tar, src) {
	    // @ts-ignore
	    for (const k in src)
	        tar[k] = src[k];
	    return tar;
	}
	function add_location(element, file, line, column, char) {
	    element.__svelte_meta = {
	        loc: { file, line, column, char }
	    };
	}
	function run(fn) {
	    return fn();
	}
	function blank_object() {
	    return Object.create(null);
	}
	function run_all(fns) {
	    fns.forEach(run);
	}
	function is_function(thing) {
	    return typeof thing === 'function';
	}
	function safe_not_equal(a, b) {
	    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}
	function not_equal(a, b) {
	    return a != a ? b == b : a !== b;
	}
	function is_empty(obj) {
	    return Object.keys(obj).length === 0;
	}
	function validate_store(store, name) {
	    if (store != null && typeof store.subscribe !== 'function') {
	        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
	    }
	}
	function subscribe(store, ...callbacks) {
	    if (store == null) {
	        return noop;
	    }
	    const unsub = store.subscribe(...callbacks);
	    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
	}
	function component_subscribe(component, store, callback) {
	    component.$$.on_destroy.push(subscribe(store, callback));
	}
	function create_slot(definition, ctx, $$scope, fn) {
	    if (definition) {
	        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
	        return definition[0](slot_ctx);
	    }
	}
	function get_slot_context(definition, ctx, $$scope, fn) {
	    return definition[1] && fn
	        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
	        : $$scope.ctx;
	}
	function get_slot_changes(definition, $$scope, dirty, fn) {
	    if (definition[2] && fn) {
	        const lets = definition[2](fn(dirty));
	        if ($$scope.dirty === undefined) {
	            return lets;
	        }
	        if (typeof lets === 'object') {
	            const merged = [];
	            const len = Math.max($$scope.dirty.length, lets.length);
	            for (let i = 0; i < len; i += 1) {
	                merged[i] = $$scope.dirty[i] | lets[i];
	            }
	            return merged;
	        }
	        return $$scope.dirty | lets;
	    }
	    return $$scope.dirty;
	}
	function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
	    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
	    if (slot_changes) {
	        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
	        slot.p(slot_context, slot_changes);
	    }
	}
	function set_store_value(store, ret, value = ret) {
	    store.set(value);
	    return ret;
	}
	function action_destroyer(action_result) {
	    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
	}

	const is_client = typeof window !== 'undefined';
	let now = is_client
	    ? () => window.performance.now()
	    : () => Date.now();
	let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

	const tasks = new Set();
	function run_tasks(now) {
	    tasks.forEach(task => {
	        if (!task.c(now)) {
	            tasks.delete(task);
	            task.f();
	        }
	    });
	    if (tasks.size !== 0)
	        raf(run_tasks);
	}
	/**
	 * Creates a new task that runs on each raf frame
	 * until it returns a falsy value or is aborted
	 */
	function loop(callback) {
	    let task;
	    if (tasks.size === 0)
	        raf(run_tasks);
	    return {
	        promise: new Promise(fulfill => {
	            tasks.add(task = { c: callback, f: fulfill });
	        }),
	        abort() {
	            tasks.delete(task);
	        }
	    };
	}

	function append(target, node) {
	    target.appendChild(node);
	}
	function insert(target, node, anchor) {
	    target.insertBefore(node, anchor || null);
	}
	function detach(node) {
	    node.parentNode.removeChild(node);
	}
	function destroy_each(iterations, detaching) {
	    for (let i = 0; i < iterations.length; i += 1) {
	        if (iterations[i])
	            iterations[i].d(detaching);
	    }
	}
	function element(name) {
	    return document.createElement(name);
	}
	function svg_element(name) {
	    return document.createElementNS('http://www.w3.org/2000/svg', name);
	}
	function text(data) {
	    return document.createTextNode(data);
	}
	function space() {
	    return text(' ');
	}
	function listen(node, event, handler, options) {
	    node.addEventListener(event, handler, options);
	    return () => node.removeEventListener(event, handler, options);
	}
	function attr(node, attribute, value) {
	    if (value == null)
	        node.removeAttribute(attribute);
	    else if (node.getAttribute(attribute) !== value)
	        node.setAttribute(attribute, value);
	}
	function children(element) {
	    return Array.from(element.childNodes);
	}
	function set_style(node, key, value, important) {
	    node.style.setProperty(key, value, important ? 'important' : '');
	}
	function toggle_class(element, name, toggle) {
	    element.classList[toggle ? 'add' : 'remove'](name);
	}
	function custom_event(type, detail) {
	    const e = document.createEvent('CustomEvent');
	    e.initCustomEvent(type, false, false, detail);
	    return e;
	}

	let current_component;
	function set_current_component(component) {
	    current_component = component;
	}
	function get_current_component() {
	    if (!current_component)
	        throw new Error('Function called outside component initialization');
	    return current_component;
	}
	function beforeUpdate(fn) {
	    get_current_component().$$.before_update.push(fn);
	}
	function onMount(fn) {
	    get_current_component().$$.on_mount.push(fn);
	}
	function afterUpdate(fn) {
	    get_current_component().$$.after_update.push(fn);
	}

	const dirty_components = [];
	const binding_callbacks = [];
	const render_callbacks = [];
	const flush_callbacks = [];
	const resolved_promise = Promise.resolve();
	let update_scheduled = false;
	function schedule_update() {
	    if (!update_scheduled) {
	        update_scheduled = true;
	        resolved_promise.then(flush);
	    }
	}
	function add_render_callback(fn) {
	    render_callbacks.push(fn);
	}
	let flushing = false;
	const seen_callbacks = new Set();
	function flush() {
	    if (flushing)
	        return;
	    flushing = true;
	    do {
	        // first, call beforeUpdate functions
	        // and update components
	        for (let i = 0; i < dirty_components.length; i += 1) {
	            const component = dirty_components[i];
	            set_current_component(component);
	            update(component.$$);
	        }
	        set_current_component(null);
	        dirty_components.length = 0;
	        while (binding_callbacks.length)
	            binding_callbacks.pop()();
	        // then, once components are updated, call
	        // afterUpdate functions. This may cause
	        // subsequent updates...
	        for (let i = 0; i < render_callbacks.length; i += 1) {
	            const callback = render_callbacks[i];
	            if (!seen_callbacks.has(callback)) {
	                // ...so guard against infinite loops
	                seen_callbacks.add(callback);
	                callback();
	            }
	        }
	        render_callbacks.length = 0;
	    } while (dirty_components.length);
	    while (flush_callbacks.length) {
	        flush_callbacks.pop()();
	    }
	    update_scheduled = false;
	    flushing = false;
	    seen_callbacks.clear();
	}
	function update($$) {
	    if ($$.fragment !== null) {
	        $$.update();
	        run_all($$.before_update);
	        const dirty = $$.dirty;
	        $$.dirty = [-1];
	        $$.fragment && $$.fragment.p($$.ctx, dirty);
	        $$.after_update.forEach(add_render_callback);
	    }
	}
	const outroing = new Set();
	let outros;
	function transition_in(block, local) {
	    if (block && block.i) {
	        outroing.delete(block);
	        block.i(local);
	    }
	}
	function transition_out(block, local, detach, callback) {
	    if (block && block.o) {
	        if (outroing.has(block))
	            return;
	        outroing.add(block);
	        outros.c.push(() => {
	            outroing.delete(block);
	            if (callback) {
	                if (detach)
	                    block.d(1);
	                callback();
	            }
	        });
	        block.o(local);
	    }
	}

	const globals = (typeof window !== 'undefined'
	    ? window
	    : typeof globalThis !== 'undefined'
	        ? globalThis
	        : global);
	function create_component(block) {
	    block && block.c();
	}
	function mount_component(component, target, anchor, customElement) {
	    const { fragment, on_mount, on_destroy, after_update } = component.$$;
	    fragment && fragment.m(target, anchor);
	    if (!customElement) {
	        // onMount happens before the initial afterUpdate
	        add_render_callback(() => {
	            const new_on_destroy = on_mount.map(run).filter(is_function);
	            if (on_destroy) {
	                on_destroy.push(...new_on_destroy);
	            }
	            else {
	                // Edge case - component was destroyed immediately,
	                // most likely as a result of a binding initialising
	                run_all(new_on_destroy);
	            }
	            component.$$.on_mount = [];
	        });
	    }
	    after_update.forEach(add_render_callback);
	}
	function destroy_component(component, detaching) {
	    const $$ = component.$$;
	    if ($$.fragment !== null) {
	        run_all($$.on_destroy);
	        $$.fragment && $$.fragment.d(detaching);
	        // TODO null out other refs, including component.$$ (but need to
	        // preserve final state?)
	        $$.on_destroy = $$.fragment = null;
	        $$.ctx = [];
	    }
	}
	function make_dirty(component, i) {
	    if (component.$$.dirty[0] === -1) {
	        dirty_components.push(component);
	        schedule_update();
	        component.$$.dirty.fill(0);
	    }
	    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
	}
	function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
	    const parent_component = current_component;
	    set_current_component(component);
	    const $$ = component.$$ = {
	        fragment: null,
	        ctx: null,
	        // state
	        props,
	        update: noop,
	        not_equal,
	        bound: blank_object(),
	        // lifecycle
	        on_mount: [],
	        on_destroy: [],
	        on_disconnect: [],
	        before_update: [],
	        after_update: [],
	        context: new Map(parent_component ? parent_component.$$.context : []),
	        // everything else
	        callbacks: blank_object(),
	        dirty,
	        skip_bound: false
	    };
	    let ready = false;
	    $$.ctx = instance
	        ? instance(component, options.props || {}, (i, ret, ...rest) => {
	            const value = rest.length ? rest[0] : ret;
	            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
	                if (!$$.skip_bound && $$.bound[i])
	                    $$.bound[i](value);
	                if (ready)
	                    make_dirty(component, i);
	            }
	            return ret;
	        })
	        : [];
	    $$.update();
	    ready = true;
	    run_all($$.before_update);
	    // `false` as a special case of no DOM component
	    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	    if (options.target) {
	        if (options.hydrate) {
	            const nodes = children(options.target);
	            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	            $$.fragment && $$.fragment.l(nodes);
	            nodes.forEach(detach);
	        }
	        else {
	            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	            $$.fragment && $$.fragment.c();
	        }
	        if (options.intro)
	            transition_in(component.$$.fragment);
	        mount_component(component, options.target, options.anchor, options.customElement);
	        flush();
	    }
	    set_current_component(parent_component);
	}
	/**
	 * Base class for Svelte components. Used when dev=false.
	 */
	class SvelteComponent {
	    $destroy() {
	        destroy_component(this, 1);
	        this.$destroy = noop;
	    }
	    $on(type, callback) {
	        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
	        callbacks.push(callback);
	        return () => {
	            const index = callbacks.indexOf(callback);
	            if (index !== -1)
	                callbacks.splice(index, 1);
	        };
	    }
	    $set($$props) {
	        if (this.$$set && !is_empty($$props)) {
	            this.$$.skip_bound = true;
	            this.$$set($$props);
	            this.$$.skip_bound = false;
	        }
	    }
	}

	function dispatch_dev(type, detail) {
	    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.33.0' }, detail)));
	}
	function append_dev(target, node) {
	    dispatch_dev('SvelteDOMInsert', { target, node });
	    append(target, node);
	}
	function insert_dev(target, node, anchor) {
	    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
	    insert(target, node, anchor);
	}
	function detach_dev(node) {
	    dispatch_dev('SvelteDOMRemove', { node });
	    detach(node);
	}
	function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
	    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
	    if (has_prevent_default)
	        modifiers.push('preventDefault');
	    if (has_stop_propagation)
	        modifiers.push('stopPropagation');
	    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
	    const dispose = listen(node, event, handler, options);
	    return () => {
	        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
	        dispose();
	    };
	}
	function attr_dev(node, attribute, value) {
	    attr(node, attribute, value);
	    if (value == null)
	        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
	    else
	        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
	}
	function set_data_dev(text, data) {
	    data = '' + data;
	    if (text.wholeText === data)
	        return;
	    dispatch_dev('SvelteDOMSetData', { node: text, data });
	    text.data = data;
	}
	function validate_each_argument(arg) {
	    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
	        let msg = '{#each} only iterates over array-like objects.';
	        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
	            msg += ' You can use a spread to convert this iterable into an array.';
	        }
	        throw new Error(msg);
	    }
	}
	function validate_slots(name, slot, keys) {
	    for (const slot_key of Object.keys(slot)) {
	        if (!~keys.indexOf(slot_key)) {
	            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
	        }
	    }
	}
	/**
	 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
	 */
	class SvelteComponentDev extends SvelteComponent {
	    constructor(options) {
	        if (!options || (!options.target && !options.$$inline)) {
	            throw new Error("'target' is a required option");
	        }
	        super();
	    }
	    $destroy() {
	        super.$destroy();
	        this.$destroy = () => {
	            console.warn('Component was already destroyed'); // eslint-disable-line no-console
	        };
	    }
	    $capture_state() { }
	    $inject_state() { }
	}

	const subscriber_queue = [];
	/**
	 * Create a `Writable` store that allows both updating and reading by subscription.
	 * @param {*=}value initial value
	 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
	 */
	function writable(value, start = noop) {
	    let stop;
	    const subscribers = [];
	    function set(new_value) {
	        if (safe_not_equal(value, new_value)) {
	            value = new_value;
	            if (stop) { // store is ready
	                const run_queue = !subscriber_queue.length;
	                for (let i = 0; i < subscribers.length; i += 1) {
	                    const s = subscribers[i];
	                    s[1]();
	                    subscriber_queue.push(s, value);
	                }
	                if (run_queue) {
	                    for (let i = 0; i < subscriber_queue.length; i += 2) {
	                        subscriber_queue[i][0](subscriber_queue[i + 1]);
	                    }
	                    subscriber_queue.length = 0;
	                }
	            }
	        }
	    }
	    function update(fn) {
	        set(fn(value));
	    }
	    function subscribe(run, invalidate = noop) {
	        const subscriber = [run, invalidate];
	        subscribers.push(subscriber);
	        if (subscribers.length === 1) {
	            stop = start(set) || noop;
	        }
	        run(value);
	        return () => {
	            const index = subscribers.indexOf(subscriber);
	            if (index !== -1) {
	                subscribers.splice(index, 1);
	            }
	            if (subscribers.length === 0) {
	                stop();
	                stop = null;
	            }
	        };
	    }
	    return { set, update, subscribe };
	}

	function cubicOut(t) {
	    const f = t - 1.0;
	    return f * f * f + 1.0;
	}

	function is_date(obj) {
	    return Object.prototype.toString.call(obj) === '[object Date]';
	}

	function get_interpolator(a, b) {
	    if (a === b || a !== a)
	        return () => a;
	    const type = typeof a;
	    if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
	        throw new Error('Cannot interpolate values of different type');
	    }
	    if (Array.isArray(a)) {
	        const arr = b.map((bi, i) => {
	            return get_interpolator(a[i], bi);
	        });
	        return t => arr.map(fn => fn(t));
	    }
	    if (type === 'object') {
	        if (!a || !b)
	            throw new Error('Object cannot be null');
	        if (is_date(a) && is_date(b)) {
	            a = a.getTime();
	            b = b.getTime();
	            const delta = b - a;
	            return t => new Date(a + t * delta);
	        }
	        const keys = Object.keys(b);
	        const interpolators = {};
	        keys.forEach(key => {
	            interpolators[key] = get_interpolator(a[key], b[key]);
	        });
	        return t => {
	            const result = {};
	            keys.forEach(key => {
	                result[key] = interpolators[key](t);
	            });
	            return result;
	        };
	    }
	    if (type === 'number') {
	        const delta = b - a;
	        return t => a + t * delta;
	    }
	    throw new Error(`Cannot interpolate ${type} values`);
	}
	function tweened(value, defaults = {}) {
	    const store = writable(value);
	    let task;
	    let target_value = value;
	    function set(new_value, opts) {
	        if (value == null) {
	            store.set(value = new_value);
	            return Promise.resolve();
	        }
	        target_value = new_value;
	        let previous_task = task;
	        let started = false;
	        let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
	        if (duration === 0) {
	            if (previous_task) {
	                previous_task.abort();
	                previous_task = null;
	            }
	            store.set(value = target_value);
	            return Promise.resolve();
	        }
	        const start = now() + delay;
	        let fn;
	        task = loop(now => {
	            if (now < start)
	                return true;
	            if (!started) {
	                fn = interpolate(value, new_value);
	                if (typeof duration === 'function')
	                    duration = duration(value, new_value);
	                started = true;
	            }
	            if (previous_task) {
	                previous_task.abort();
	                previous_task = null;
	            }
	            const elapsed = now - start;
	            if (elapsed > duration) {
	                store.set(value = new_value);
	                return false;
	            }
	            // @ts-ignore
	            store.set(value = fn(easing(elapsed / duration)));
	            return true;
	        });
	        return task.promise;
	    }
	    return {
	        set,
	        update: (fn, opts) => set(fn(target_value, value), opts),
	        subscribe: store.subscribe
	    };
	}

	let html = document.documentElement;
	let scrollbarWidth;
	let defaultOverflowStyle;
	let hidden;

	let hide = function () {
		if (hidden) {
			return
		}
		// store existing overflow style
		defaultOverflowStyle = defaultOverflowStyle || getComputedStyle(html).overflow;
		// calculate scrollbar width if any
		scrollbarWidth = window.innerWidth - html.clientWidth;
		// hide overflow
		html.style.overflow = 'hidden';
		// add padding to compensate for scrollbar and prevent shifting
		scrollbarWidth && (html.style.paddingRight = `${scrollbarWidth}px`);
		hidden = true;
	};

	let show = function () {
		html.style.overflow = defaultOverflowStyle;
		scrollbarWidth && (html.style.paddingRight = 0);
		hidden = false;
	};

	var hideShowScroll = { hide, show };

	/* node_modules/.pnpm/side-panel-menu-thing@1.0.3/node_modules/side-panel-menu-thing/src/side-panel-menu-thing.svelte generated by Svelte v3.33.0 */
	const file = "node_modules/.pnpm/side-panel-menu-thing@1.0.3/node_modules/side-panel-menu-thing/src/side-panel-menu-thing.svelte";

	function create_fragment(ctx) {
		let div2;
		let div0;
		let t;
		let div1;
		let div1_tabindex_value;
		let onMount_action;
		let mounted;
		let dispose;

		const block = {
			c: function create() {
				div2 = element("div");
				div0 = element("div");
				t = space();
				div1 = element("div");
				attr_dev(div0, "class", "spmt-overlay");
				set_style(div0, "opacity", /*overlayOpacity*/ ctx[7]);
				add_location(div0, file, 190, 1, 4460);
				attr_dev(div1, "class", "spmt");
				set_style(div1, "width", /*width*/ ctx[0] + "px");

				set_style(div1, "transform", "translateX(" + (/*left*/ ctx[2]
				? /*$menuPos*/ ctx[4] * -1
				: /*$menuPos*/ ctx[4]) + "%)");

				attr_dev(div1, "tabindex", div1_tabindex_value = /*shown*/ ctx[8] ? "0" : false);
				toggle_class(div1, "left", /*left*/ ctx[2]);
				add_location(div1, file, 191, 1, 4540);
				attr_dev(div2, "class", "spmt-wrap");
				attr_dev(div2, "data-no-panel", "true");
				toggle_class(div2, "novis", !/*shown*/ ctx[8]);
				toggle_class(div2, "fixed", /*fixed*/ ctx[1]);
				add_location(div2, file, 184, 0, 4354);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, div2, anchor);
				append_dev(div2, div0);
				append_dev(div2, t);
				append_dev(div2, div1);
				/*div1_binding*/ ctx[20](div1);
				/*div2_binding*/ ctx[22](div2);

				if (!mounted) {
					dispose = [
						listen_dev(div0, "click", /*hide*/ ctx[3], false, false, false),
						action_destroyer(onMount_action = /*onMount*/ ctx[11].call(null, div1, /*shown*/ ctx[8])),
						listen_dev(div1, "keydown", /*keydown_handler*/ ctx[21], false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*overlayOpacity*/ 128) {
					set_style(div0, "opacity", /*overlayOpacity*/ ctx[7]);
				}

				if (dirty & /*width*/ 1) {
					set_style(div1, "width", /*width*/ ctx[0] + "px");
				}

				if (dirty & /*left, $menuPos*/ 20) {
					set_style(div1, "transform", "translateX(" + (/*left*/ ctx[2]
					? /*$menuPos*/ ctx[4] * -1
					: /*$menuPos*/ ctx[4]) + "%)");
				}

				if (dirty & /*shown*/ 256 && div1_tabindex_value !== (div1_tabindex_value = /*shown*/ ctx[8] ? "0" : false)) {
					attr_dev(div1, "tabindex", div1_tabindex_value);
				}

				if (onMount_action && is_function(onMount_action.update) && dirty & /*shown*/ 256) onMount_action.update.call(null, /*shown*/ ctx[8]);

				if (dirty & /*left*/ 4) {
					toggle_class(div1, "left", /*left*/ ctx[2]);
				}

				if (dirty & /*shown*/ 256) {
					toggle_class(div2, "novis", !/*shown*/ ctx[8]);
				}

				if (dirty & /*fixed*/ 2) {
					toggle_class(div2, "fixed", /*fixed*/ ctx[1]);
				}
			},
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) detach_dev(div2);
				/*div1_binding*/ ctx[20](null);
				/*div2_binding*/ ctx[22](null);
				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function isIgnoredElement(el) {
		while (el.parentNode) {
			if (el.hasAttribute("data-no-panel")) {
				return true;
			}

			el = el.parentNode;
		}
	}

	function instance($$self, $$props, $$invalidate) {
		let overlayOpacity;
		let shown;
		let $menuPos;
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots("Side_panel_menu_thing", slots, []);
		let { target = null } = $$props;
		let { content = null } = $$props;
		let { width = 400 } = $$props;
		let { duration = 450 } = $$props;
		let { fixed = true } = $$props;
		let { left = false } = $$props;
		let { dragOpen = true } = $$props;
		let { onShow = null } = $$props;
		let { onHide = null } = $$props;
		let { preventScroll = true } = $$props;
		content.parentElement.removeChild(content);

		// starting touch points
		let startX;

		let startY;

		// stores touch data on touchmove
		let touchEventData;

		// container dom element
		let container;

		// menu dom element
		let menu;

		// dom element to restore focus to on close
		let focusTrigger;

		// 100 is closed, 0 is open (this is the x transform in percent)
		const menuPos = tweened(100, { duration, easing: cubicOut });

		validate_store(menuPos, "menuPos");
		component_subscribe($$self, menuPos, value => $$invalidate(4, $menuPos = value));

		const show = e => {
			set_store_value(menuPos, $menuPos = 0, $menuPos);

			// if event, store target as focusTrigger
			focusTrigger = e ? e.target : null;
		};

		const hide = () => {
			set_store_value(menuPos, $menuPos = 100, $menuPos);
		};

		// trap focus listener
		function trapFocus(e) {
			let isTabPressed = e.keyCode === 9;

			if (!shown || !isTabPressed) {
				return;
			}

			const containerNodes = container.querySelectorAll("*");
			const tabbable = Array.from(containerNodes).filter(n => n.tabIndex >= 0);

			if (tabbable.length) {
				e.preventDefault();
				let index = tabbable.indexOf(document.activeElement);
				index += tabbable.length + (e.shiftKey ? -1 : 1);
				index %= tabbable.length;
				tabbable[index].focus();
			}
		}

		function onMount(node) {
			if (content) {
				node.appendChild(content);
			}

			target.addEventListener(
				"touchstart",
				e => {
					let isIgnored = isIgnoredElement(e.target);
					startX = e.changedTouches[0].pageX;
					startY = e.changedTouches[0].pageY;

					if (!shown && (isIgnored || !dragOpen)) {
						touchEventData = null;
						return;
					}

					let boundingClientRect = target.getBoundingClientRect();
					let touchEnabled = shown;

					// allow drag open if touch is initiated within 30px of target edge
					if (left && startX - boundingClientRect.left < 30 || !left && boundingClientRect.right - startX < 30) {
						touchEnabled = true;
					}

					touchEventData = touchEnabled
					? { start: $menuPos, time: Date.now() }
					: null;
				},
				{ passive: true }
			);

			target.addEventListener(
				"touchmove",
				e => {
					if (!shown && !touchEventData) {
						return;
					}

					let touchobj = e.changedTouches[0];
					let distX = touchobj.pageX - startX;
					let distY = touchobj.pageY - startY;

					if (touchEventData.go !== null) {
						touchEventData.go = Math.abs(distX) > Math.abs(distY) ? true : null;
					}

					if (touchEventData.go) {
						const percentDragged = distX / menu.clientWidth;
						const newMenuPos = touchEventData.start + percentDragged * (left ? -100 : 100);

						if (newMenuPos <= 100 && newMenuPos >= 0) {
							menuPos.set(newMenuPos, { duration: 1 });
						}
					}
				},
				{ passive: true }
			);

			target.addEventListener("touchend", e => {
				if (shown) {
					let { start, time } = touchEventData;
					let swipeDuration = Date.now() - time;
					let percentMoved = start - $menuPos;

					// todo? set shorter open close duration bc we've alredy moved it a bit
					if (swipeDuration < 400 && Math.abs(percentMoved) > 5) {
						// quick swipe
						percentMoved > 0 ? show() : hide();
					} else {
						$menuPos > 70 ? hide() : show();
					}
				}
			});

			return {
				update: shown => {
					if (shown) {
						// stop background scrolling
						fixed && preventScroll && hideShowScroll.hide();

						// todo: something about this - focus is
						setTimeout(() => menu.focus(), 99);

						onShow && onShow();
					} else {
						// restore focus
						focusTrigger && focusTrigger.focus({ preventScroll: true });

						// allow background scrolling
						fixed && preventScroll && hideShowScroll.show();

						onHide && onHide();
					}
				}
			};
		}

		const writable_props = [
			"target",
			"content",
			"width",
			"duration",
			"fixed",
			"left",
			"dragOpen",
			"onShow",
			"onHide",
			"preventScroll"
		];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Side_panel_menu_thing> was created with unknown prop '${key}'`);
		});

		function div1_binding($$value) {
			binding_callbacks[$$value ? "unshift" : "push"](() => {
				menu = $$value;
				$$invalidate(6, menu);
			});
		}

		const keydown_handler = e => e.keyCode === 27 ? hide() : trapFocus(e);

		function div2_binding($$value) {
			binding_callbacks[$$value ? "unshift" : "push"](() => {
				container = $$value;
				$$invalidate(5, container);
			});
		}

		$$self.$$set = $$props => {
			if ("target" in $$props) $$invalidate(12, target = $$props.target);
			if ("content" in $$props) $$invalidate(13, content = $$props.content);
			if ("width" in $$props) $$invalidate(0, width = $$props.width);
			if ("duration" in $$props) $$invalidate(14, duration = $$props.duration);
			if ("fixed" in $$props) $$invalidate(1, fixed = $$props.fixed);
			if ("left" in $$props) $$invalidate(2, left = $$props.left);
			if ("dragOpen" in $$props) $$invalidate(15, dragOpen = $$props.dragOpen);
			if ("onShow" in $$props) $$invalidate(16, onShow = $$props.onShow);
			if ("onHide" in $$props) $$invalidate(17, onHide = $$props.onHide);
			if ("preventScroll" in $$props) $$invalidate(18, preventScroll = $$props.preventScroll);
		};

		$$self.$capture_state = () => ({
			tweened,
			cubicOut,
			hideShowScroll,
			target,
			content,
			width,
			duration,
			fixed,
			left,
			dragOpen,
			onShow,
			onHide,
			preventScroll,
			startX,
			startY,
			touchEventData,
			container,
			menu,
			focusTrigger,
			menuPos,
			show,
			hide,
			trapFocus,
			isIgnoredElement,
			onMount,
			overlayOpacity,
			$menuPos,
			shown
		});

		$$self.$inject_state = $$props => {
			if ("target" in $$props) $$invalidate(12, target = $$props.target);
			if ("content" in $$props) $$invalidate(13, content = $$props.content);
			if ("width" in $$props) $$invalidate(0, width = $$props.width);
			if ("duration" in $$props) $$invalidate(14, duration = $$props.duration);
			if ("fixed" in $$props) $$invalidate(1, fixed = $$props.fixed);
			if ("left" in $$props) $$invalidate(2, left = $$props.left);
			if ("dragOpen" in $$props) $$invalidate(15, dragOpen = $$props.dragOpen);
			if ("onShow" in $$props) $$invalidate(16, onShow = $$props.onShow);
			if ("onHide" in $$props) $$invalidate(17, onHide = $$props.onHide);
			if ("preventScroll" in $$props) $$invalidate(18, preventScroll = $$props.preventScroll);
			if ("startX" in $$props) startX = $$props.startX;
			if ("startY" in $$props) startY = $$props.startY;
			if ("touchEventData" in $$props) touchEventData = $$props.touchEventData;
			if ("container" in $$props) $$invalidate(5, container = $$props.container);
			if ("menu" in $$props) $$invalidate(6, menu = $$props.menu);
			if ("focusTrigger" in $$props) focusTrigger = $$props.focusTrigger;
			if ("overlayOpacity" in $$props) $$invalidate(7, overlayOpacity = $$props.overlayOpacity);
			if ("shown" in $$props) $$invalidate(8, shown = $$props.shown);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*$menuPos*/ 16) {
				// adjust overlay opacity automatically based on menu position
				$$invalidate(7, overlayOpacity = (100 - $menuPos) / 100);
			}

			if ($$self.$$.dirty & /*$menuPos*/ 16) {
				// whether the menu is open or in process of opening
				$$invalidate(8, shown = $menuPos < 100);
			}
		};

		return [
			width,
			fixed,
			left,
			hide,
			$menuPos,
			container,
			menu,
			overlayOpacity,
			shown,
			menuPos,
			trapFocus,
			onMount,
			target,
			content,
			duration,
			dragOpen,
			onShow,
			onHide,
			preventScroll,
			show,
			div1_binding,
			keydown_handler,
			div2_binding
		];
	}

	class Side_panel_menu_thing extends SvelteComponentDev {
		constructor(options) {
			super(options);

			init(this, options, instance, create_fragment, not_equal, {
				target: 12,
				content: 13,
				width: 0,
				duration: 14,
				fixed: 1,
				left: 2,
				dragOpen: 15,
				onShow: 16,
				onHide: 17,
				preventScroll: 18,
				show: 19,
				hide: 3
			});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Side_panel_menu_thing",
				options,
				id: create_fragment.name
			});
		}

		get target() {
			return this.$$.ctx[12];
		}

		set target(target) {
			this.$set({ target });
			flush();
		}

		get content() {
			return this.$$.ctx[13];
		}

		set content(content) {
			this.$set({ content });
			flush();
		}

		get width() {
			return this.$$.ctx[0];
		}

		set width(width) {
			this.$set({ width });
			flush();
		}

		get duration() {
			return this.$$.ctx[14];
		}

		set duration(duration) {
			this.$set({ duration });
			flush();
		}

		get fixed() {
			return this.$$.ctx[1];
		}

		set fixed(fixed) {
			this.$set({ fixed });
			flush();
		}

		get left() {
			return this.$$.ctx[2];
		}

		set left(left) {
			this.$set({ left });
			flush();
		}

		get dragOpen() {
			return this.$$.ctx[15];
		}

		set dragOpen(dragOpen) {
			this.$set({ dragOpen });
			flush();
		}

		get onShow() {
			return this.$$.ctx[16];
		}

		set onShow(onShow) {
			this.$set({ onShow });
			flush();
		}

		get onHide() {
			return this.$$.ctx[17];
		}

		set onHide(onHide) {
			this.$set({ onHide });
			flush();
		}

		get preventScroll() {
			return this.$$.ctx[18];
		}

		set preventScroll(preventScroll) {
			this.$set({ preventScroll });
			flush();
		}

		get show() {
			return this.$$.ctx[19];
		}

		set show(value) {
			throw new Error("<Side_panel_menu_thing>: Cannot set read-only property 'show'");
		}

		get hide() {
			return this.$$.ctx[3];
		}

		set hide(value) {
			throw new Error("<Side_panel_menu_thing>: Cannot set read-only property 'hide'");
		}
	}

	/* src/components/Modal.svelte generated by Svelte v3.33.0 */
	const file$1 = "src/components/Modal.svelte";

	function create_fragment$1(ctx) {
		let a;
		let t1;
		let div3;
		let div2;
		let div0;
		let svg;
		let path;
		let t2;
		let span;
		let t4;
		let div1;
		let current;
		let mounted;
		let dispose;
		const default_slot_template = /*#slots*/ ctx[2].default;
		const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

		const block = {
			c: function create() {
				a = element("a");
				a.textContent = "Modal";
				t1 = space();
				div3 = element("div");
				div2 = element("div");
				div0 = element("div");
				svg = svg_element("svg");
				path = svg_element("path");
				t2 = space();
				span = element("span");
				span.textContent = "Close";
				t4 = space();
				div1 = element("div");
				if (default_slot) default_slot.c();
				attr_dev(a, "class", "btn");
				attr_dev(a, "href", "#modal");
				attr_dev(a, "data-lity", "");
				add_location(a, file$1, 40, 0, 1245);
				attr_dev(path, "data-lity-close", "");
				attr_dev(path, "d", "M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z");
				add_location(path, file$1, 52, 12, 1659);
				attr_dev(svg, "data-lity-close", "");
				attr_dev(svg, "fill", "#FFFFFF");
				attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
				attr_dev(svg, "viewBox", "0 0 30 30");
				attr_dev(svg, "width", "60px");
				attr_dev(svg, "height", "60px");
				add_location(svg, file$1, 51, 9, 1527);
				add_location(span, file$1, 54, 9, 2480);
				attr_dev(div0, "data-lity-close", "");
				attr_dev(div0, "class", "close-btn _lity-close");
				attr_dev(div0, "aria-label", "Close (Press escape to close)");
				add_location(div0, file$1, 50, 6, 1423);
				attr_dev(div1, "class", "modal-content");
				add_location(div1, file$1, 56, 6, 2518);
				attr_dev(div2, "class", "modal");
				add_location(div2, file$1, 49, 3, 1397);
				attr_dev(div3, "id", "modal");
				attr_dev(div3, "class", "modal-wrap lity-hide");
				add_location(div3, file$1, 48, 0, 1348);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, a, anchor);
				insert_dev(target, t1, anchor);
				insert_dev(target, div3, anchor);
				append_dev(div3, div2);
				append_dev(div2, div0);
				append_dev(div0, svg);
				append_dev(svg, path);
				append_dev(div0, t2);
				append_dev(div0, span);
				append_dev(div2, t4);
				append_dev(div2, div1);

				if (default_slot) {
					default_slot.m(div1, null);
				}

				current = true;

				if (!mounted) {
					dispose = listen_dev(a, "click", /*click_handler*/ ctx[3], false, false, false);
					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (default_slot) {
					if (default_slot.p && dirty & /*$$scope*/ 2) {
						update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
					}
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(default_slot, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(default_slot, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) detach_dev(a);
				if (detaching) detach_dev(t1);
				if (detaching) detach_dev(div3);
				if (default_slot) default_slot.d(detaching);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$1.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$1($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots("Modal", slots, ['default']);
		gsapWithCSS.registerPlugin(ScrollTrigger$1);

		function animateShow() {
			const tl = gsapWithCSS.timeline({});
			var textWrapper = document.querySelector(".modal h2");
			textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>");
			gsapWithCSS.set(".modal h2 .word", { opacity: 0, y: 24, x: 0, rotateZ: 0 });
			gsapWithCSS.set(".modal h2 ~ *", { opacity: 0, y: 24 });

			tl.to(".modal h2 .word", {
				delay: 0.2,
				duration: 0.5,
				ease: "elastic.out(1,0.5)",
				opacity: 1,
				rotateZ: 0,
				stagger: 0.075,
				x: 0,
				y: 0
			}).to(
				".modal h2 ~ *",
				{
					duration: 0.3,
					ease: "power1.out",
					opacity: 1,
					y: 0
				},
				"-=0.5"
			);
		}

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Modal> was created with unknown prop '${key}'`);
		});

		const click_handler = () => animateShow();

		$$self.$$set = $$props => {
			if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
		};

		$$self.$capture_state = () => ({ gsap: gsapWithCSS, ScrollTrigger: ScrollTrigger$1, animateShow });
		return [animateShow, $$scope, slots, click_handler];
	}

	class Modal extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Modal",
				options,
				id: create_fragment$1.name
			});
		}
	}

	/* src/components/popup-get-started.svelte generated by Svelte v3.33.0 */
	const file$2 = "src/components/popup-get-started.svelte";

	// (6:0) <Modal>
	function create_default_slot(ctx) {
		let div1;
		let h2;
		let t1;
		let p;
		let t3;
		let div0;
		let a0;
		let t5;
		let a1;

		const block = {
			c: function create() {
				div1 = element("div");
				h2 = element("h2");
				h2.textContent = "Ready to Get Started?";
				t1 = space();
				p = element("p");
				p.textContent = "Let's make sure you get to the right place! Please tell us a bit more about yourself.";
				t3 = space();
				div0 = element("div");
				a0 = element("a");
				a0.textContent = "Become a Sub";
				t5 = space();
				a1 = element("a");
				a1.textContent = "Request a Sub";
				add_location(h2, file$2, 8, 6, 162);
				add_location(p, file$2, 9, 6, 199);
				attr_dev(a0, "href", "#");
				attr_dev(a0, "class", "btn");
				add_location(a0, file$2, 11, 9, 341);
				attr_dev(a1, "href", "#");
				attr_dev(a1, "class", "btn");
				add_location(a1, file$2, 12, 9, 393);
				attr_dev(div0, "class", "btns-wrap d-sm-flex");
				add_location(div0, file$2, 10, 6, 298);
				attr_dev(div1, "class", "popup-get-started-content");
				add_location(div1, file$2, 7, 3, 116);
			},
			m: function mount(target, anchor) {
				insert_dev(target, div1, anchor);
				append_dev(div1, h2);
				append_dev(div1, t1);
				append_dev(div1, p);
				append_dev(div1, t3);
				append_dev(div1, div0);
				append_dev(div0, a0);
				append_dev(div0, t5);
				append_dev(div0, a1);
			},
			d: function destroy(detaching) {
				if (detaching) detach_dev(div1);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_default_slot.name,
			type: "slot",
			source: "(6:0) <Modal>",
			ctx
		});

		return block;
	}

	function create_fragment$2(ctx) {
		let modal;
		let current;

		modal = new Modal({
				props: {
					$$slots: { default: [create_default_slot] },
					$$scope: { ctx }
				},
				$$inline: true
			});

		const block = {
			c: function create() {
				create_component(modal.$$.fragment);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				mount_component(modal, target, anchor);
				current = true;
			},
			p: function update(ctx, [dirty]) {
				const modal_changes = {};

				if (dirty & /*$$scope*/ 1) {
					modal_changes.$$scope = { dirty, ctx };
				}

				modal.$set(modal_changes);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(modal.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(modal.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				destroy_component(modal, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$2.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$2($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots("Popup_get_started", slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Popup_get_started> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({ Modal });
		return [];
	}

	class Popup_get_started extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Popup_get_started",
				options,
				id: create_fragment$2.name
			});
		}
	}

	const { $ } = window;

	const $body = $(document.body);

	var common = {
		init() {
			gsapWithCSS.registerPlugin(ScrollTrigger$1);
			const mobileMenu = new Side_panel_menu_thing({
				target: $body[0],
				props: {
					target: $body[0],
					content: document.getElementById('mobile-menu'),
					fixed: true,
					width: 320,
				},
			});
			$('#toggle_nav').on('click', mobileMenu.show);

			$(document).on(
				'click',
				'.menu-section .menu-item-has-children > a',
				function (e) {
					e.preventDefault();
					let $el = $(this);
					$el.parent().toggleClass('show-subnav');
				}
			);

			testimonialSlider();
			textCardsBlock();
			animate();
		},
		finalize() {
			// JavaScript to be fired on all pages, after page specific JS is fired
			// class to hide outlines if not using keyboard
			$body.on('mousedown', function () {
				$body.addClass('using-mouse');
			});
			$body.on('keydown', function () {
				$body.removeClass('using-mouse');
			});

			new Popup_get_started({
				target: document.body,
			});
		},
	};

	function animate() {
		animateError404();
		// animateCTA()
		// animateFooter()
	}
	function animateError404() {
		if (!$('.error404').length) {
			return
		}
		const tl = gsapWithCSS.timeline({
			defaults:{
				duration: 0.5,
				opacity: 0,
			},
			// scrollTrigger:{trigger:'.call-to-action'}
		});

		tl.from('h1', {delay: 0.5, y: -16});
		tl.from('h1 ~ p', {y: 16}, '-=0.5');
		tl.from('h1 ~ .btn', {}, '-=0.2');
	}

	/**
	 * Testimonial Slider Block
	 */
	function testimonialSlider() { //first found on for schools page
		const $testimonialSlider = $('.testimonial-slider');
		if(!$testimonialSlider.length) {
			return
		}

		$testimonialSlider.slick({
			// adaptiveHeight: true, //TODO flex? - for subs
			arrows: false,
			dots: true,
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
	}



	/**
	 * Text Cards Rotator Block
	 */
	function textCardsBlock() { //first found on for subs page under hero
		const $textCards = $('.text-cards-rotator .cards.slick');
		if(!$textCards.length) {
			return
		}

		$textCards.slick({
			//TODO adaptiveHeight: true,
			arrows: false,
			dots: false,
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
		
		let $dots = $('.slick-dots li');
		$dots.each((idx, el) => {
			$(el).click(function() {
				$dots.removeClass('slick-active');
				$dots.find('button').attr('aria-selected', false);
				$textCards.slick('slickGoTo', idx);
				el.classList.add('slick-active');
				$(el).find('button').attr('aria-selected', true);
			});
		});	
	}

	function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
	    const o = +getComputedStyle(node).opacity;
	    return {
	        delay,
	        duration,
	        easing,
	        css: t => `opacity: ${t * o}`
	    };
	}

	/* src/components/home-testimonials.svelte generated by Svelte v3.33.0 */

	const { console: console_1 } = globals;
	const file$3 = "src/components/home-testimonials.svelte";

	function get_each_context(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[6] = list[i];
		child_ctx[8] = i;
		return child_ctx;
	}

	// (50:6) {#each activeTestimonials as t, idx}
	function create_each_block(ctx) {
		let div3;
		let div0;
		let t0;
		let div2;
		let div1;
		let p;
		let t1;
		let t2_value = /*t*/ ctx[6].post_content + "";
		let t2;
		let t3;
		let t4;
		let cite;
		let t5_value = /*t*/ ctx[6].post_title + "";
		let t5;
		let t6;
		let br;
		let t7;
		let t8_value = /*t*/ ctx[6].citation_title + "";
		let t8;
		let t9;

		const block = {
			c: function create() {
				div3 = element("div");
				div0 = element("div");
				t0 = space();
				div2 = element("div");
				div1 = element("div");
				p = element("p");
				t1 = text("\"");
				t2 = text(t2_value);
				t3 = text("\"");
				t4 = space();
				cite = element("cite");
				t5 = text(t5_value);
				t6 = space();
				br = element("br");
				t7 = space();
				t8 = text(t8_value);
				t9 = space();
				attr_dev(div0, "class", "decor-img");
				set_style(div0, "background-image", "url(https://picsum.photos/800/" + (800 + /*idx*/ ctx[8]).toString() + ")");
				add_location(div0, file$3, 51, 12, 1739);
				add_location(p, file$3, 57, 18, 1991);
				add_location(br, file$3, 60, 21, 2099);
				add_location(cite, file$3, 58, 18, 2035);
				attr_dev(div1, "class", "inner-wrap");
				add_location(div1, file$3, 56, 15, 1948);
				attr_dev(div2, "class", "test-content main");
				add_location(div2, file$3, 55, 12, 1901);
				attr_dev(div3, "class", "home-testimonial");
				add_location(div3, file$3, 50, 9, 1696);
			},
			m: function mount(target, anchor) {
				insert_dev(target, div3, anchor);
				append_dev(div3, div0);
				append_dev(div3, t0);
				append_dev(div3, div2);
				append_dev(div2, div1);
				append_dev(div1, p);
				append_dev(p, t1);
				append_dev(p, t2);
				append_dev(p, t3);
				append_dev(div1, t4);
				append_dev(div1, cite);
				append_dev(cite, t5);
				append_dev(cite, t6);
				append_dev(cite, br);
				append_dev(cite, t7);
				append_dev(cite, t8);
				append_dev(div3, t9);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*activeTestimonials*/ 2 && t2_value !== (t2_value = /*t*/ ctx[6].post_content + "")) set_data_dev(t2, t2_value);
				if (dirty & /*activeTestimonials*/ 2 && t5_value !== (t5_value = /*t*/ ctx[6].post_title + "")) set_data_dev(t5, t5_value);
				if (dirty & /*activeTestimonials*/ 2 && t8_value !== (t8_value = /*t*/ ctx[6].citation_title + "")) set_data_dev(t8, t8_value);
			},
			d: function destroy(detaching) {
				if (detaching) detach_dev(div3);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block.name,
			type: "each",
			source: "(50:6) {#each activeTestimonials as t, idx}",
			ctx
		});

		return block;
	}

	function create_fragment$3(ctx) {
		let div3;
		let div1;
		let form;
		let p;
		let t1;
		let div0;
		let input0;
		let t2;
		let label0;
		let t4;
		let input1;
		let t5;
		let label1;
		let t7;
		let span;
		let t8;
		let div2;
		let mounted;
		let dispose;
		let each_value = /*activeTestimonials*/ ctx[1];
		validate_each_argument(each_value);
		let each_blocks = [];

		for (let i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
		}

		const block = {
			c: function create() {
				div3 = element("div");
				div1 = element("div");
				form = element("form");
				p = element("p");
				p.textContent = "Hear from:";
				t1 = space();
				div0 = element("div");
				input0 = element("input");
				t2 = space();
				label0 = element("label");
				label0.textContent = "From Subs";
				t4 = space();
				input1 = element("input");
				t5 = space();
				label1 = element("label");
				label1.textContent = "From Schools";
				t7 = space();
				span = element("span");
				t8 = space();
				div2 = element("div");

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				attr_dev(p, "class", "label");
				add_location(p, file$3, 38, 9, 1107);
				attr_dev(input0, "type", "radio");
				attr_dev(input0, "id", "radio-one");
				attr_dev(input0, "name", "switch-one");
				input0.value = "subs";
				input0.checked = true;
				add_location(input0, file$3, 40, 12, 1187);
				attr_dev(label0, "for", "radio-one");
				add_location(label0, file$3, 41, 12, 1317);
				attr_dev(input1, "type", "radio");
				attr_dev(input1, "id", "radio-two");
				attr_dev(input1, "name", "switch-one");
				input1.value = "schools";
				add_location(input1, file$3, 42, 12, 1370);
				attr_dev(label1, "for", "radio-two");
				add_location(label1, file$3, 43, 12, 1498);
				attr_dev(span, "class", "indicator");
				add_location(span, file$3, 44, 12, 1554);
				attr_dev(div0, "class", "switch-field");
				add_location(div0, file$3, 39, 9, 1148);
				attr_dev(form, "class", "toggle-switch");
				add_location(form, file$3, 37, 6, 1069);
				attr_dev(div1, "class", "toggle-switch-wrap d-flex justify-content-end align-items-center");
				add_location(div1, file$3, 36, 3, 984);
				attr_dev(div2, "class", "slick");
				add_location(div2, file$3, 48, 3, 1624);
				attr_dev(div3, "class", "home-hear-from section-full");
				add_location(div3, file$3, 35, 0, 939);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, div3, anchor);
				append_dev(div3, div1);
				append_dev(div1, form);
				append_dev(form, p);
				append_dev(form, t1);
				append_dev(form, div0);
				append_dev(div0, input0);
				append_dev(div0, t2);
				append_dev(div0, label0);
				append_dev(div0, t4);
				append_dev(div0, input1);
				append_dev(div0, t5);
				append_dev(div0, label1);
				append_dev(div0, t7);
				append_dev(div0, span);
				append_dev(div3, t8);
				append_dev(div3, div2);

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div2, null);
				}

				if (!mounted) {
					dispose = [
						listen_dev(input0, "change", /*change_handler*/ ctx[2], false, false, false),
						listen_dev(input1, "change", /*change_handler_1*/ ctx[3], false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*activeTestimonials*/ 2) {
					each_value = /*activeTestimonials*/ ctx[1];
					validate_each_argument(each_value);
					let i;

					for (i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
						} else {
							each_blocks[i] = create_each_block(child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(div2, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}

					each_blocks.length = each_value.length;
				}
			},
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) detach_dev(div3);
				destroy_each(each_blocks, detaching);
				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$3.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$3($$self, $$props, $$invalidate) {
		let activeTestimonials;
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots("Home_testimonials", slots, []);
		gsapWithCSS.registerPlugin(ScrollTrigger$1);
		const jq = window.$;

		//export
		let testimonials = homeTestimonials;

		let switchState = "subs";

		beforeUpdate(async () => {
			if (jq("slick").length) {
				await gsapWithCSS.to(".slick", { opacity: 0, duration: 1 });
			}

			jq(".slick").slick("unslick");
		});

		afterUpdate(() => {
			jq(".slick").slick({
				adaptiveHeight: true,
				arrows: false,
				dots: true,
				fade: true,
				slidesToShow: 1
			});

			if (jq("slick").length) {
				gsapWithCSS.set(".slick", { opacity: 0 });

				gsapWithCSS.to(".slick", {
					opacity: 1,
					duration: 1,
					ease: "power1.out"
				});
			}
		});

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Home_testimonials> was created with unknown prop '${key}'`);
		});

		const change_handler = () => $$invalidate(0, switchState = "subs");
		const change_handler_1 = () => $$invalidate(0, switchState = "schools");

		$$self.$capture_state = () => ({
			beforeUpdate,
			afterUpdate,
			onMount,
			fade,
			gsap: gsapWithCSS,
			ScrollTrigger: ScrollTrigger$1,
			jq,
			testimonials,
			switchState,
			activeTestimonials
		});

		$$self.$inject_state = $$props => {
			if ("testimonials" in $$props) $$invalidate(5, testimonials = $$props.testimonials);
			if ("switchState" in $$props) $$invalidate(0, switchState = $$props.switchState);
			if ("activeTestimonials" in $$props) $$invalidate(1, activeTestimonials = $$props.activeTestimonials);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*switchState*/ 1) {
				$$invalidate(1, activeTestimonials = testimonials[switchState]);
			}
		};

		console.log(testimonials);
		return [switchState, activeTestimonials, change_handler, change_handler_1];
	}

	class Home_testimonials extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Home_testimonials",
				options,
				id: create_fragment$3.name
			});
		}
	}

	// import anime from 'animejs/lib/anime.es.js';
	// import { Waypoint } from 'waypoints';


	const { $: $$1 } = window;


	var home = {
		init() {
			gsapWithCSS.registerPlugin(ScrollTrigger$1);

			// $('.slick').slick({
			// 	arrows: false,
			// 	dots: true,
			// 	fade: true,
			// 	slidesToShow: 1
			//  });

			// toggleSwitch()
			let $testimonialsWrap = $$1('#home-testimonials-wrap');
			if( $testimonialsWrap.length ) {
				new Home_testimonials({
					target: $testimonialsWrap[0],
					// props: $testimonialsWrap.data()
				});
			}
			animateHome();
		},
		finalize() {
			// JavaScript to be fired on the home page, after the init JS
		},
	};

	function animateHome() {
		animateHero();
		animateAbout();
	}

	function animateHero() {
		let $hero = $$1('.home .hero');
		if( !$hero.length ) return

		const tl = gsapWithCSS.timeline({
			defaults: { 
				duration: 0.35,
				opacity: 1,
				stagger: 0.1,
				x: 0,
				y: 0,
			},
			scrollTrigger: {
				trigger: '.home .hero',
				// start: 'top bottom-=250px'
			}
		});
		
		var textWrapper = $hero.find('h1')[0];
		textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>");
		gsapWithCSS.set('.hero .word', { y: -24, x: 0, rotateZ: 0 });
		gsapWithCSS.set('.home .hero .btns-wrap', { y: 16 });
		tl.to(
			'.hero .word',
			{
				rotateZ: 0,
				delay: 0.25,
				duration: 0.5,
				ease: "power1.out",//"elastic.out(1,0.5)",
			})
			.to(
				'.home h1 ~ p',
				{ },
				'-=0.35'
			)
			.to(
				'.home .hero .btns-wrap',
				{
					// duration: 0.1,
				},
				// '-=0.35'
			);
	}
	function animateAbout() {
		let $about = $$1('.home-about');
		if( !$about.length ) return

		const tl = gsapWithCSS.timeline({
			defaults: { opacity: 0, },
			scrollTrigger: {
				trigger: '.home-about',
				start: 'top bottom-=250px'
			}
		});
		
		var textWrapper = $about.find('h2 .letters')[0];
		textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>");
		gsapWithCSS.set('.home-about .word', {opacity: 0, y: 24, x: 0, rotateZ: 0});
		tl.to(
			'.home-about .word',
			{
				y:0,
				delay: 0.25,
				duration: 0.65,
				ease: "elastic.out(1,0.5)",
				stagger: 0.05,
				opacity: 1
			})
			.from(
				'.home-about h2 ~ p',
				{
					y: 16,
					duration: 0.2
				},
				'-=0.85'
			);
			$$1('.home-about .card').each((idx, el) => {
				gsapWithCSS.set(el, { opacity: 0, y: 32 });
				gsapWithCSS.set($$1(el).find('h3'), { opacity: 0, y: -16 });
				gsapWithCSS.set($$1(el).find('h3 ~ p'), { opacity: 0, y: 16 });
				gsapWithCSS.to(el, 
					{
						scrollTrigger: {
							trigger: el, 
							start: 'top center+=200px',
							onEnter: () => {
								setTimeout(() => {
									gsapWithCSS.to($$1(el).find('h3'), { opacity: 1, duration: 0.35, y: 0 });
									gsapWithCSS.to($$1(el).find('h3 ~ p'), { opacity: 1, duration: 0.35, y: 0, stagger: 0.1 });
								}, 200*idx);
							}
						},
						opacity: 1,
						y: 0,
						duration: 0.35,
						// stagger: 0.1,
						delay: 0.1*idx
					},
					// '-=0.35'
				);
			});
	}

	const { $: $$2 } = window;

	var aboutUs = {
		init() {
			aboutCardRotator();
		},
		finalize() {
			// JavaScript to be fired on the home page, after the init JS
		},
	};

	function aboutCardRotator() {
		const $aboutCardRotator = $$2('.acr-cards-wrap.slick');
		if(!$aboutCardRotator.length) {
			return
		}

		$aboutCardRotator.slick({
			// adaptiveHeight: true, //TODO flex? - for subs
			arrows: false,
			dots: true,
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
	}

	// import { gsap } from "gsap"
	// import { ScrollTrigger } from "gsap/ScrollTrigger"
	// const { $ } = window

	var singlePost = {
		init() {
		},
		finalize() {
			// JavaScript to be fired on the home page, after the init JS
		},
	};

	const { $: $$3 } = window;

	var pageTemplateTos = {
		init() {
	      gsapWithCSS.registerPlugin(ScrollTrigger$1);
			generatePageNav();

	      const tl = gsapWithCSS.timeline({
	         defaults: {
	            duration: 0.2,
	            ease:'power1.out',
	            opacity: 0,
	         },
	         // scrollTrigger: {},
	      });
	      tl.from('.update-contact', {})
	         .from('.hero-tos-content h1', {y: -16})
	         .from('.hero-tos-content h1 ~ *', {x:16}, '-=0.2')
	         .from('aside', {y:16}, '+=0.2')
	         .from('aside a', {y:16, stagger: 0.05}, '+=0.2');
	      $$3('h2').each((_idx, el) => gsapWithCSS.from(el, { delay: 0.2, opacity: 0, y: -16, scrollTrigger: { trigger: el, start: 'top 96%'}}));
	      // $('article p').each((_idx, el) => gsap.from(el, { opacity: 0, x: 16, scrollTrigger: { trigger: el, start: 'top 90%'}}))
		},
		finalize() {
			// JavaScript to be fired on the home page, after the init JS
		},
	};

	//TODO center of page intersection
	// vanilla
	// padding addition to top of scroll position
	// @see https://stackoverflow.com/questions/38069213/add-padding-top-to-scroll-when-using-href-id
	function generatePageNav() {
	   // return
	   const nav = document.querySelector('.tos-page-nav');
	   const h2s = document.querySelectorAll( '.main-content-wrap h2' );
	   h2s.forEach((h2) => {
	      let a = document.createElement('a');
	      a.innerText = h2.innerText;
	      const id = h2.innerText.toLowerCase().replace(/\s+/g, '-');
	      h2.id = id;
	      a.id = id + '-anchor';
	      a.href = `#${id}`;
	      a.classList.add('tos-nav-link');
	      nav.appendChild(a);
	   });
	   let enableScrolling = true;
	   let activeId = location.hash.substr( 1 );
	   if ( ! activeId ) {
	      activeId = h2s[ 0 ].id;
	   }
	   // console.log(activeId)
	   // let navAnchors = document.querySelectorAll('.tos-nav-link')
	   let inPageNavAnchors = Array.from(document.querySelectorAll('.tos-nav-link'));
	   let activeAnchor = document.querySelector( `a[id="${ activeId }-anchor"]` );
	   activeAnchor.classList.add( 'active' );
	   document.onscroll = () => {
	      if ( enableScrolling ) {
	         for ( const h2 of h2s ) {
	            if ( 0 < h2.getBoundingClientRect().bottom ) {
	               if ( ! activeId.includes( h2.id ) ) {
	                  inPageNavAnchors.map( ( item ) => {
	                     item.classList.remove( 'active' ); 
	                  });
	                  activeId = h2.id;
	                  activeAnchor = document.querySelector(
	                     `a[id="${ activeId }-anchor"]`
	                  );
	                  activeAnchor.classList.add( 'active' );
	               }
	               break;
	            }
	         }
	      }
	   };
	   $$3(inPageNavAnchors).click((e) => {
	      // console.log(e.target)
	      // clearInterval(t)
	      enableScrolling = false;
	      $$3(inPageNavAnchors).removeClass('active');
	      // this.classList.add('active')
	      e.target.classList.add('active');
	      setTimeout( () => {
	         enableScrolling = true;
	      }, 1000 );
	   });

	}

	/**
	 * Populate Router instance with DOM routes
	 * @type {Router} routes - An instance of our router
	 */
	const routes = new Router({
		common,
		home,
		aboutUs,
		pageTemplateTos,
		singlePost,
	});

	/** Load Events */
	routes.loadEvents();

}());
//# sourceMappingURL=bundle.js.map
