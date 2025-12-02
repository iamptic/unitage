var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../.wrangler/tmp/bundle-78ilIE/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
__name(PerformanceEntry, "PerformanceEntry");
var PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
}, "PerformanceMark");
var PerformanceMeasure = class extends PerformanceEntry {
  entryType = "measure";
};
__name(PerformanceMeasure, "PerformanceMeasure");
var PerformanceResourceTiming = class extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
__name(PerformanceResourceTiming, "PerformanceResourceTiming");
var PerformanceObserverEntryList = class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
__name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
var Performance = class {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
__name(Performance, "Performance");
var PerformanceObserver = class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
__name(PerformanceObserver, "PerformanceObserver");
__publicField(PerformanceObserver, "supportedEntryTypes", []);
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream = class extends Socket {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  isRaw = false;
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
};
__name(ReadStream, "ReadStream");

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream = class extends Socket2 {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = false;
};
__name(WriteStream, "WriteStream");

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return "";
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
__name(Process, "Process");

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js
var yt = Object.defineProperty;
var Te = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "Te");
var Rt = /* @__PURE__ */ __name((e, t, r) => t in e ? yt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "Rt");
var d = /* @__PURE__ */ __name((e, t, r) => Rt(e, typeof t != "symbol" ? t + "" : t, r), "d");
var He = /* @__PURE__ */ __name((e, t, r) => t.has(e) || Te("Cannot " + r), "He");
var i = /* @__PURE__ */ __name((e, t, r) => (He(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "i");
var g = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? Te("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "g");
var f = /* @__PURE__ */ __name((e, t, r, s) => (He(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r), "f");
var w = /* @__PURE__ */ __name((e, t, r) => (He(e, t, "access private method"), r), "w");
var Me = /* @__PURE__ */ __name((e, t, r, s) => ({ set _(n) {
  f(e, t, n, r);
}, get _() {
  return i(e, t, s);
} }), "Me");
var Fe = /* @__PURE__ */ __name((e, t, r) => (s, n) => {
  let o = -1;
  return c(0);
  async function c(l) {
    if (l <= o)
      throw new Error("next() called multiple times");
    o = l;
    let a, h = false, u;
    if (e[l] ? (u = e[l][0][0], s.req.routeIndex = l) : u = l === e.length && n || void 0, u)
      try {
        a = await u(s, () => c(l + 1));
      } catch (p) {
        if (p instanceof Error && t)
          s.error = p, a = await t(p, s), h = true;
        else
          throw p;
      }
    else
      s.finalized === false && r && (a = await r(s));
    return a && (s.finalized === false || h) && (s.res = a), s;
  }
  __name(c, "c");
}, "Fe");
var Et = Symbol();
var xt = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: s = false } = t, o = (e instanceof st ? e.raw.headers : e.headers).get("Content-Type");
  return o != null && o.startsWith("multipart/form-data") || o != null && o.startsWith("application/x-www-form-urlencoded") ? Ot(e, { all: r, dot: s }) : {};
}, "xt");
async function Ot(e, t) {
  const r = await e.formData();
  return r ? bt(r, t) : {};
}
__name(Ot, "Ot");
function bt(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((s, n) => {
    t.all || n.endsWith("[]") ? mt(r, n, s) : r[n] = s;
  }), t.dot && Object.entries(r).forEach(([s, n]) => {
    s.includes(".") && (jt(r, s, n), delete r[s]);
  }), r;
}
__name(bt, "bt");
var mt = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "mt");
var jt = /* @__PURE__ */ __name((e, t, r) => {
  let s = e;
  const n = t.split(".");
  n.forEach((o, c) => {
    c === n.length - 1 ? s[o] = r : ((!s[o] || typeof s[o] != "object" || Array.isArray(s[o]) || s[o] instanceof File) && (s[o] = /* @__PURE__ */ Object.create(null)), s = s[o]);
  });
}, "jt");
var Ye = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "Ye");
var Pt = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: r } = St(e), s = Ye(r);
  return At(s, t);
}, "Pt");
var St = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, s) => {
    const n = `@${s}`;
    return t.push([n, r]), n;
  }), { groups: t, path: e };
}, "St");
var At = /* @__PURE__ */ __name((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [s] = t[r];
    for (let n = e.length - 1; n >= 0; n--)
      if (e[n].includes(s)) {
        e[n] = e[n].replace(s, t[r][1]);
        break;
      }
  }
  return e;
}, "At");
var Ee = {};
var Ht = /* @__PURE__ */ __name((e, t) => {
  if (e === "*")
    return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const s = `${e}#${t}`;
    return Ee[s] || (r[2] ? Ee[s] = t && t[0] !== ":" && t[0] !== "*" ? [s, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : Ee[s] = [e, r[1], true]), Ee[s];
  }
  return null;
}, "Ht");
var Ie = /* @__PURE__ */ __name((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return t(r);
      } catch {
        return r;
      }
    });
  }
}, "Ie");
var $t = /* @__PURE__ */ __name((e) => Ie(e, decodeURI), "$t");
var Ze = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let s = r;
  for (; s < t.length; s++) {
    const n = t.charCodeAt(s);
    if (n === 37) {
      const o = t.indexOf("?", s), c = t.slice(r, o === -1 ? void 0 : o);
      return $t(c.includes("%25") ? c.replace(/%25/g, "%2525") : c);
    } else if (n === 63)
      break;
  }
  return t.slice(r, s);
}, "Ze");
var Ct = /* @__PURE__ */ __name((e) => {
  const t = Ze(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "Ct");
var te = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = te(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "te");
var et = /* @__PURE__ */ __name((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":"))
    return null;
  const t = e.split("/"), r = [];
  let s = "";
  return t.forEach((n) => {
    if (n !== "" && !/\:/.test(n))
      s += "/" + n;
    else if (/\:/.test(n))
      if (/\?/.test(n)) {
        r.length === 0 && s === "" ? r.push("/") : r.push(s);
        const o = n.replace("?", "");
        s += "/" + o, r.push(s);
      } else
        s += "/" + n;
  }), r.filter((n, o, c) => c.indexOf(n) === o);
}, "et");
var $e = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? Ie(e, rt) : e) : e, "$e");
var tt = /* @__PURE__ */ __name((e, t, r) => {
  let s;
  if (!r && t && !/[%+]/.test(t)) {
    let c = e.indexOf("?", 8);
    if (c === -1)
      return;
    for (e.startsWith(t, c + 1) || (c = e.indexOf(`&${t}`, c + 1)); c !== -1; ) {
      const l = e.charCodeAt(c + t.length + 1);
      if (l === 61) {
        const a = c + t.length + 2, h = e.indexOf("&", a);
        return $e(e.slice(a, h === -1 ? void 0 : h));
      } else if (l == 38 || isNaN(l))
        return "";
      c = e.indexOf(`&${t}`, c + 1);
    }
    if (s = /[%+]/.test(e), !s)
      return;
  }
  const n = {};
  s ?? (s = /[%+]/.test(e));
  let o = e.indexOf("?", 8);
  for (; o !== -1; ) {
    const c = e.indexOf("&", o + 1);
    let l = e.indexOf("=", o);
    l > c && c !== -1 && (l = -1);
    let a = e.slice(o + 1, l === -1 ? c === -1 ? void 0 : c : l);
    if (s && (a = $e(a)), o = c, a === "")
      continue;
    let h;
    l === -1 ? h = "" : (h = e.slice(l + 1, c === -1 ? void 0 : c), s && (h = $e(h))), r ? (n[a] && Array.isArray(n[a]) || (n[a] = []), n[a].push(h)) : n[a] ?? (n[a] = h);
  }
  return t ? n[t] : n;
}, "tt");
var Dt = tt;
var _t = /* @__PURE__ */ __name((e, t) => tt(e, t, true), "_t");
var rt = decodeURIComponent;
var ke = /* @__PURE__ */ __name((e) => Ie(e, rt), "ke");
var ne;
var S;
var M;
var nt;
var it;
var De;
var k;
var Ke;
var st = (Ke = /* @__PURE__ */ __name(class {
  constructor(e, t = "/", r = [[]]) {
    g(this, M);
    d(this, "raw");
    g(this, ne);
    g(this, S);
    d(this, "routeIndex", 0);
    d(this, "path");
    d(this, "bodyCache", {});
    g(this, k, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, s = t2[e2];
      if (s)
        return s;
      const n = Object.keys(t2)[0];
      return n ? t2[n].then((o) => (n === "json" && (o = JSON.stringify(o)), new Response(o)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, f(this, S, r), f(this, ne, {});
  }
  param(e) {
    return e ? w(this, M, nt).call(this, e) : w(this, M, it).call(this);
  }
  query(e) {
    return Dt(this.url, e);
  }
  queries(e) {
    return _t(this.url, e);
  }
  header(e) {
    if (e)
      return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((r, s) => {
      t[s] = r;
    }), t;
  }
  async parseBody(e) {
    var t;
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await xt(this, e));
  }
  json() {
    return i(this, k).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return i(this, k).call(this, "text");
  }
  arrayBuffer() {
    return i(this, k).call(this, "arrayBuffer");
  }
  blob() {
    return i(this, k).call(this, "blob");
  }
  formData() {
    return i(this, k).call(this, "formData");
  }
  addValidatedData(e, t) {
    i(this, ne)[e] = t;
  }
  valid(e) {
    return i(this, ne)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Et]() {
    return i(this, S);
  }
  get matchedRoutes() {
    return i(this, S)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return i(this, S)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, "Ke"), ne = /* @__PURE__ */ new WeakMap(), S = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakSet(), nt = /* @__PURE__ */ __name(function(e) {
  const t = i(this, S)[0][this.routeIndex][1][e], r = w(this, M, De).call(this, t);
  return r && /\%/.test(r) ? ke(r) : r;
}, "nt"), it = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(i(this, S)[0][this.routeIndex][1]);
  for (const r of t) {
    const s = w(this, M, De).call(this, i(this, S)[0][this.routeIndex][1][r]);
    s !== void 0 && (e[r] = /\%/.test(s) ? ke(s) : s);
  }
  return e;
}, "it"), De = /* @__PURE__ */ __name(function(e) {
  return i(this, S)[1] ? i(this, S)[1][e] : e;
}, "De"), k = /* @__PURE__ */ new WeakMap(), Ke);
var It = { Stringify: 1 };
var ot = /* @__PURE__ */ __name(async (e, t, r, s, n) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const o = e.callbacks;
  return o != null && o.length ? (n ? n[0] += e : n = [e], Promise.all(o.map((l) => l({ phase: t, buffer: n, context: s }))).then((l) => Promise.all(l.filter(Boolean).map((a) => ot(a, t, false, s, n))).then(() => n[0]))) : Promise.resolve(e);
}, "ot");
var Lt = "text/plain; charset=UTF-8";
var Ce = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "Ce");
var pe;
var ge;
var I;
var ie;
var L;
var b;
var we;
var oe;
var ae;
var V;
var ve;
var ye;
var U;
var re;
var qe;
var Nt = (qe = /* @__PURE__ */ __name(class {
  constructor(e, t) {
    g(this, U);
    g(this, pe);
    g(this, ge);
    d(this, "env", {});
    g(this, I);
    d(this, "finalized", false);
    d(this, "error");
    g(this, ie);
    g(this, L);
    g(this, b);
    g(this, we);
    g(this, oe);
    g(this, ae);
    g(this, V);
    g(this, ve);
    g(this, ye);
    d(this, "render", (...e2) => (i(this, oe) ?? f(this, oe, (t2) => this.html(t2)), i(this, oe).call(this, ...e2)));
    d(this, "setLayout", (e2) => f(this, we, e2));
    d(this, "getLayout", () => i(this, we));
    d(this, "setRenderer", (e2) => {
      f(this, oe, e2);
    });
    d(this, "header", (e2, t2, r) => {
      this.finalized && f(this, b, new Response(i(this, b).body, i(this, b)));
      const s = i(this, b) ? i(this, b).headers : i(this, V) ?? f(this, V, new Headers());
      t2 === void 0 ? s.delete(e2) : r != null && r.append ? s.append(e2, t2) : s.set(e2, t2);
    });
    d(this, "status", (e2) => {
      f(this, ie, e2);
    });
    d(this, "set", (e2, t2) => {
      i(this, I) ?? f(this, I, /* @__PURE__ */ new Map()), i(this, I).set(e2, t2);
    });
    d(this, "get", (e2) => i(this, I) ? i(this, I).get(e2) : void 0);
    d(this, "newResponse", (...e2) => w(this, U, re).call(this, ...e2));
    d(this, "body", (e2, t2, r) => w(this, U, re).call(this, e2, t2, r));
    d(this, "text", (e2, t2, r) => !i(this, V) && !i(this, ie) && !t2 && !r && !this.finalized ? new Response(e2) : w(this, U, re).call(this, e2, t2, Ce(Lt, r)));
    d(this, "json", (e2, t2, r) => w(this, U, re).call(this, JSON.stringify(e2), t2, Ce("application/json", r)));
    d(this, "html", (e2, t2, r) => {
      const s = /* @__PURE__ */ __name((n) => w(this, U, re).call(this, n, t2, Ce("text/html; charset=UTF-8", r)), "s");
      return typeof e2 == "object" ? ot(e2, It.Stringify, false, {}).then(s) : s(e2);
    });
    d(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    d(this, "notFound", () => (i(this, ae) ?? f(this, ae, () => new Response()), i(this, ae).call(this, this)));
    f(this, pe, e), t && (f(this, L, t.executionCtx), this.env = t.env, f(this, ae, t.notFoundHandler), f(this, ye, t.path), f(this, ve, t.matchResult));
  }
  get req() {
    return i(this, ge) ?? f(this, ge, new st(i(this, pe), i(this, ye), i(this, ve))), i(this, ge);
  }
  get event() {
    if (i(this, L) && "respondWith" in i(this, L))
      return i(this, L);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (i(this, L))
      return i(this, L);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return i(this, b) || f(this, b, new Response(null, { headers: i(this, V) ?? f(this, V, new Headers()) }));
  }
  set res(e) {
    if (i(this, b) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of i(this, b).headers.entries())
        if (t !== "content-type")
          if (t === "set-cookie") {
            const s = i(this, b).headers.getSetCookie();
            e.headers.delete("set-cookie");
            for (const n of s)
              e.headers.append("set-cookie", n);
          } else
            e.headers.set(t, r);
    }
    f(this, b, e), this.finalized = true;
  }
  get var() {
    return i(this, I) ? Object.fromEntries(i(this, I)) : {};
  }
}, "qe"), pe = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), b = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakSet(), re = /* @__PURE__ */ __name(function(e, t, r) {
  const s = i(this, b) ? new Headers(i(this, b).headers) : i(this, V) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const o = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [c, l] of o)
      c.toLowerCase() === "set-cookie" ? s.append(c, l) : s.set(c, l);
  }
  if (r)
    for (const [o, c] of Object.entries(r))
      if (typeof c == "string")
        s.set(o, c);
      else {
        s.delete(o);
        for (const l of c)
          s.append(o, l);
      }
  const n = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? i(this, ie);
  return new Response(e, { status: n, headers: s });
}, "re"), qe);
var R = "ALL";
var Tt = "all";
var Mt = ["get", "post", "put", "delete", "options", "patch"];
var at = "Can not add a route since the matcher is already built.";
var ct = /* @__PURE__ */ __name(class extends Error {
}, "ct");
var Ft = "__COMPOSED_HANDLER";
var kt = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "kt");
var Ue = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Ue");
var A;
var E;
var lt;
var H;
var z;
var xe;
var Oe;
var Be;
var ht = (Be = /* @__PURE__ */ __name(class {
  constructor(t = {}) {
    g(this, E);
    d(this, "get");
    d(this, "post");
    d(this, "put");
    d(this, "delete");
    d(this, "options");
    d(this, "patch");
    d(this, "all");
    d(this, "on");
    d(this, "use");
    d(this, "router");
    d(this, "getPath");
    d(this, "_basePath", "/");
    g(this, A, "/");
    d(this, "routes", []);
    g(this, H, kt);
    d(this, "errorHandler", Ue);
    d(this, "onError", (t2) => (this.errorHandler = t2, this));
    d(this, "notFound", (t2) => (f(this, H, t2), this));
    d(this, "fetch", (t2, ...r) => w(this, E, Oe).call(this, t2, r[1], r[0], t2.method));
    d(this, "request", (t2, r, s2, n2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, s2, n2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${te("/", t2)}`, r), s2, n2)));
    d(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(w(this, E, Oe).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...Mt, Tt].forEach((o) => {
      this[o] = (c, ...l) => (typeof c == "string" ? f(this, A, c) : w(this, E, z).call(this, o, i(this, A), c), l.forEach((a) => {
        w(this, E, z).call(this, o, i(this, A), a);
      }), this);
    }), this.on = (o, c, ...l) => {
      for (const a of [c].flat()) {
        f(this, A, a);
        for (const h of [o].flat())
          l.map((u) => {
            w(this, E, z).call(this, h.toUpperCase(), i(this, A), u);
          });
      }
      return this;
    }, this.use = (o, ...c) => (typeof o == "string" ? f(this, A, o) : (f(this, A, "*"), c.unshift(o)), c.forEach((l) => {
      w(this, E, z).call(this, R, i(this, A), l);
    }), this);
    const { strict: s, ...n } = t;
    Object.assign(this, n), this.getPath = s ?? true ? t.getPath ?? Ze : Ct;
  }
  route(t, r) {
    const s = this.basePath(t);
    return r.routes.map((n) => {
      var c;
      let o;
      r.errorHandler === Ue ? o = n.handler : (o = /* @__PURE__ */ __name(async (l, a) => (await Fe([], r.errorHandler)(l, () => n.handler(l, a))).res, "o"), o[Ft] = n.handler), w(c = s, E, z).call(c, n.method, n.path, o);
    }), this;
  }
  basePath(t) {
    const r = w(this, E, lt).call(this);
    return r._basePath = te(this._basePath, t), r;
  }
  mount(t, r, s) {
    let n, o;
    s && (typeof s == "function" ? o = s : (o = s.optionHandler, s.replaceRequest === false ? n = /* @__PURE__ */ __name((a) => a, "n") : n = s.replaceRequest));
    const c = o ? (a) => {
      const h = o(a);
      return Array.isArray(h) ? h : [h];
    } : (a) => {
      let h;
      try {
        h = a.executionCtx;
      } catch {
      }
      return [a.env, h];
    };
    n || (n = (() => {
      const a = te(this._basePath, t), h = a === "/" ? 0 : a.length;
      return (u) => {
        const p = new URL(u.url);
        return p.pathname = p.pathname.slice(h) || "/", new Request(p, u);
      };
    })());
    const l = /* @__PURE__ */ __name(async (a, h) => {
      const u = await r(n(a.req.raw), ...c(a));
      if (u)
        return u;
      await h();
    }, "l");
    return w(this, E, z).call(this, R, te(t, "*"), l), this;
  }
}, "Be"), A = /* @__PURE__ */ new WeakMap(), E = /* @__PURE__ */ new WeakSet(), lt = /* @__PURE__ */ __name(function() {
  const t = new ht({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, f(t, H, i(this, H)), t.routes = this.routes, t;
}, "lt"), H = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ __name(function(t, r, s) {
  t = t.toUpperCase(), r = te(this._basePath, r);
  const n = { basePath: this._basePath, path: r, method: t, handler: s };
  this.router.add(t, r, [s, n]), this.routes.push(n);
}, "z"), xe = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error)
    return this.errorHandler(t, r);
  throw t;
}, "xe"), Oe = /* @__PURE__ */ __name(function(t, r, s, n) {
  if (n === "HEAD")
    return (async () => new Response(null, await w(this, E, Oe).call(this, t, r, s, "GET")))();
  const o = this.getPath(t, { env: s }), c = this.router.match(n, o), l = new Nt(t, { path: o, matchResult: c, env: s, executionCtx: r, notFoundHandler: i(this, H) });
  if (c[0].length === 1) {
    let h;
    try {
      h = c[0][0][0][0](l, async () => {
        l.res = await i(this, H).call(this, l);
      });
    } catch (u) {
      return w(this, E, xe).call(this, u, l);
    }
    return h instanceof Promise ? h.then((u) => u || (l.finalized ? l.res : i(this, H).call(this, l))).catch((u) => w(this, E, xe).call(this, u, l)) : h ?? i(this, H).call(this, l);
  }
  const a = Fe(c[0], this.errorHandler, i(this, H));
  return (async () => {
    try {
      const h = await a(l);
      if (!h.finalized)
        throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return h.res;
    } catch (h) {
      return w(this, E, xe).call(this, h, l);
    }
  })();
}, "Oe"), Be);
var ut = [];
function Ut(e, t) {
  const r = this.buildAllMatchers(), s = /* @__PURE__ */ __name((n, o) => {
    const c = r[n] || r[R], l = c[2][o];
    if (l)
      return l;
    const a = o.match(c[0]);
    if (!a)
      return [[], ut];
    const h = a.indexOf("", 1);
    return [c[1][h], a];
  }, "s");
  return this.match = s, s(e, t);
}
__name(Ut, "Ut");
var me = "[^/]+";
var fe = ".*";
var de = "(?:|/.*)";
var se = Symbol();
var Wt = new Set(".\\+*[^]$()");
function Kt(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === fe || e === de ? 1 : t === fe || t === de ? -1 : e === me ? 1 : t === me ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(Kt, "Kt");
var X;
var J;
var $;
var ze;
var _e = (ze = /* @__PURE__ */ __name(class {
  constructor() {
    g(this, X);
    g(this, J);
    g(this, $, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, s, n, o) {
    if (t.length === 0) {
      if (i(this, X) !== void 0)
        throw se;
      if (o)
        return;
      f(this, X, r);
      return;
    }
    const [c, ...l] = t, a = c === "*" ? l.length === 0 ? ["", "", fe] : ["", "", me] : c === "/*" ? ["", "", de] : c.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let h;
    if (a) {
      const u = a[1];
      let p = a[2] || me;
      if (u && a[2] && (p === ".*" || (p = p.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(p))))
        throw se;
      if (h = i(this, $)[p], !h) {
        if (Object.keys(i(this, $)).some((v) => v !== fe && v !== de))
          throw se;
        if (o)
          return;
        h = i(this, $)[p] = new _e(), u !== "" && f(h, J, n.varIndex++);
      }
      !o && u !== "" && s.push([u, i(h, J)]);
    } else if (h = i(this, $)[c], !h) {
      if (Object.keys(i(this, $)).some((u) => u.length > 1 && u !== fe && u !== de))
        throw se;
      if (o)
        return;
      h = i(this, $)[c] = new _e();
    }
    h.insert(l, r, s, n, o);
  }
  buildRegExpStr() {
    const r = Object.keys(i(this, $)).sort(Kt).map((s) => {
      const n = i(this, $)[s];
      return (typeof i(n, J) == "number" ? `(${s})@${i(n, J)}` : Wt.has(s) ? `\\${s}` : s) + n.buildRegExpStr();
    });
    return typeof i(this, X) == "number" && r.unshift(`#${i(this, X)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, "ze"), X = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), ze);
var je;
var Re;
var Ge;
var qt = (Ge = /* @__PURE__ */ __name(class {
  constructor() {
    g(this, je, { varIndex: 0 });
    g(this, Re, new _e());
  }
  insert(e, t, r) {
    const s = [], n = [];
    for (let c = 0; ; ) {
      let l = false;
      if (e = e.replace(/\{[^}]+\}/g, (a) => {
        const h = `@\\${c}`;
        return n[c] = [h, a], c++, l = true, h;
      }), !l)
        break;
    }
    const o = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let c = n.length - 1; c >= 0; c--) {
      const [l] = n[c];
      for (let a = o.length - 1; a >= 0; a--)
        if (o[a].indexOf(l) !== -1) {
          o[a] = o[a].replace(l, n[c][1]);
          break;
        }
    }
    return i(this, Re).insert(o, t, s, i(this, je), r), s;
  }
  buildRegExp() {
    let e = i(this, Re).buildRegExpStr();
    if (e === "")
      return [/^$/, [], []];
    let t = 0;
    const r = [], s = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, o, c) => o !== void 0 ? (r[++t] = Number(o), "$()") : (c !== void 0 && (s[Number(c)] = ++t), "")), [new RegExp(`^${e}`), r, s];
  }
}, "Ge"), je = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), Ge);
var Bt = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var be = /* @__PURE__ */ Object.create(null);
function ft(e) {
  return be[e] ?? (be[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(ft, "ft");
function zt() {
  be = /* @__PURE__ */ Object.create(null);
}
__name(zt, "zt");
function Gt(e) {
  var h;
  const t = new qt(), r = [];
  if (e.length === 0)
    return Bt;
  const s = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, p], [v, j]) => u ? 1 : v ? -1 : p.length - j.length), n = /* @__PURE__ */ Object.create(null);
  for (let u = 0, p = -1, v = s.length; u < v; u++) {
    const [j, C, y] = s[u];
    j ? n[C] = [y.map(([P]) => [P, /* @__PURE__ */ Object.create(null)]), ut] : p++;
    let m;
    try {
      m = t.insert(C, p, j);
    } catch (P) {
      throw P === se ? new ct(C) : P;
    }
    j || (r[p] = y.map(([P, Z]) => {
      const he = /* @__PURE__ */ Object.create(null);
      for (Z -= 1; Z >= 0; Z--) {
        const [D, Se] = m[Z];
        he[D] = Se;
      }
      return [P, he];
    }));
  }
  const [o, c, l] = t.buildRegExp();
  for (let u = 0, p = r.length; u < p; u++)
    for (let v = 0, j = r[u].length; v < j; v++) {
      const C = (h = r[u][v]) == null ? void 0 : h[1];
      if (!C)
        continue;
      const y = Object.keys(C);
      for (let m = 0, P = y.length; m < P; m++)
        C[y[m]] = l[C[y[m]]];
    }
  const a = [];
  for (const u in c)
    a[u] = r[c[u]];
  return [o, a, n];
}
__name(Gt, "Gt");
function ee(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((s, n) => n.length - s.length))
      if (ft(r).test(t))
        return [...e[r]];
  }
}
__name(ee, "ee");
var W;
var K;
var Pe;
var dt;
var Ve;
var Vt = (Ve = /* @__PURE__ */ __name(class {
  constructor() {
    g(this, Pe);
    d(this, "name", "RegExpRouter");
    g(this, W);
    g(this, K);
    d(this, "match", Ut);
    f(this, W, { [R]: /* @__PURE__ */ Object.create(null) }), f(this, K, { [R]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const s = i(this, W), n = i(this, K);
    if (!s || !n)
      throw new Error(at);
    s[e] || [s, n].forEach((a) => {
      a[e] = /* @__PURE__ */ Object.create(null), Object.keys(a[R]).forEach((h) => {
        a[e][h] = [...a[R][h]];
      });
    }), t === "/*" && (t = "*");
    const o = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const a = ft(t);
      e === R ? Object.keys(s).forEach((h) => {
        var u;
        (u = s[h])[t] || (u[t] = ee(s[h], t) || ee(s[R], t) || []);
      }) : (l = s[e])[t] || (l[t] = ee(s[e], t) || ee(s[R], t) || []), Object.keys(s).forEach((h) => {
        (e === R || e === h) && Object.keys(s[h]).forEach((u) => {
          a.test(u) && s[h][u].push([r, o]);
        });
      }), Object.keys(n).forEach((h) => {
        (e === R || e === h) && Object.keys(n[h]).forEach((u) => a.test(u) && n[h][u].push([r, o]));
      });
      return;
    }
    const c = et(t) || [t];
    for (let a = 0, h = c.length; a < h; a++) {
      const u = c[a];
      Object.keys(n).forEach((p) => {
        var v;
        (e === R || e === p) && ((v = n[p])[u] || (v[u] = [...ee(s[p], u) || ee(s[R], u) || []]), n[p][u].push([r, o - h + a + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(i(this, K)).concat(Object.keys(i(this, W))).forEach((t) => {
      e[t] || (e[t] = w(this, Pe, dt).call(this, t));
    }), f(this, W, f(this, K, void 0)), zt(), e;
  }
}, "Ve"), W = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakSet(), dt = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === R;
  return [i(this, W), i(this, K)].forEach((s) => {
    const n = s[e] ? Object.keys(s[e]).map((o) => [o, s[e][o]]) : [];
    n.length !== 0 ? (r || (r = true), t.push(...n)) : e !== R && t.push(...Object.keys(s[R]).map((o) => [o, s[R][o]]));
  }), r ? Gt(t) : null;
}, "dt"), Ve);
var q;
var N;
var Xe;
var Xt = (Xe = /* @__PURE__ */ __name(class {
  constructor(e) {
    d(this, "name", "SmartRouter");
    g(this, q, []);
    g(this, N, []);
    f(this, q, e.routers);
  }
  add(e, t, r) {
    if (!i(this, N))
      throw new Error(at);
    i(this, N).push([e, t, r]);
  }
  match(e, t) {
    if (!i(this, N))
      throw new Error("Fatal error");
    const r = i(this, q), s = i(this, N), n = r.length;
    let o = 0, c;
    for (; o < n; o++) {
      const l = r[o];
      try {
        for (let a = 0, h = s.length; a < h; a++)
          l.add(...s[a]);
        c = l.match(e, t);
      } catch (a) {
        if (a instanceof ct)
          continue;
        throw a;
      }
      this.match = l.match.bind(l), f(this, q, [l]), f(this, N, void 0);
      break;
    }
    if (o === n)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, c;
  }
  get activeRouter() {
    if (i(this, N) || i(this, q).length !== 1)
      throw new Error("No active router has been determined yet.");
    return i(this, q)[0];
  }
}, "Xe"), q = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakMap(), Xe);
var ue = /* @__PURE__ */ Object.create(null);
var B;
var O;
var Q;
var ce;
var x;
var T;
var G;
var Je;
var pt = (Je = /* @__PURE__ */ __name(class {
  constructor(e, t, r) {
    g(this, T);
    g(this, B);
    g(this, O);
    g(this, Q);
    g(this, ce, 0);
    g(this, x, ue);
    if (f(this, O, r || /* @__PURE__ */ Object.create(null)), f(this, B, []), e && t) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: t, possibleKeys: [], score: 0 }, f(this, B, [s]);
    }
    f(this, Q, []);
  }
  insert(e, t, r) {
    f(this, ce, ++Me(this, ce)._);
    let s = this;
    const n = Pt(t), o = [];
    for (let c = 0, l = n.length; c < l; c++) {
      const a = n[c], h = n[c + 1], u = Ht(a, h), p = Array.isArray(u) ? u[0] : a;
      if (p in i(s, O)) {
        s = i(s, O)[p], u && o.push(u[1]);
        continue;
      }
      i(s, O)[p] = new pt(), u && (i(s, Q).push(u), o.push(u[1])), s = i(s, O)[p];
    }
    return i(s, B).push({ [e]: { handler: r, possibleKeys: o.filter((c, l, a) => a.indexOf(c) === l), score: i(this, ce) } }), s;
  }
  search(e, t) {
    var l;
    const r = [];
    f(this, x, ue);
    let n = [this];
    const o = Ye(t), c = [];
    for (let a = 0, h = o.length; a < h; a++) {
      const u = o[a], p = a === h - 1, v = [];
      for (let j = 0, C = n.length; j < C; j++) {
        const y = n[j], m = i(y, O)[u];
        m && (f(m, x, i(y, x)), p ? (i(m, O)["*"] && r.push(...w(this, T, G).call(this, i(m, O)["*"], e, i(y, x))), r.push(...w(this, T, G).call(this, m, e, i(y, x)))) : v.push(m));
        for (let P = 0, Z = i(y, Q).length; P < Z; P++) {
          const he = i(y, Q)[P], D = i(y, x) === ue ? {} : { ...i(y, x) };
          if (he === "*") {
            const F = i(y, O)["*"];
            F && (r.push(...w(this, T, G).call(this, F, e, i(y, x))), f(F, x, D), v.push(F));
            continue;
          }
          const [Se, Ne, le] = he;
          if (!u && !(le instanceof RegExp))
            continue;
          const _ = i(y, O)[Se], vt = o.slice(a).join("/");
          if (le instanceof RegExp) {
            const F = le.exec(vt);
            if (F) {
              if (D[Ne] = F[0], r.push(...w(this, T, G).call(this, _, e, i(y, x), D)), Object.keys(i(_, O)).length) {
                f(_, x, D);
                const Ae = ((l = F[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (c[Ae] || (c[Ae] = [])).push(_);
              }
              continue;
            }
          }
          (le === true || le.test(u)) && (D[Ne] = u, p ? (r.push(...w(this, T, G).call(this, _, e, D, i(y, x))), i(_, O)["*"] && r.push(...w(this, T, G).call(this, i(_, O)["*"], e, D, i(y, x)))) : (f(_, x, D), v.push(_)));
        }
      }
      n = v.concat(c.shift() ?? []);
    }
    return r.length > 1 && r.sort((a, h) => a.score - h.score), [r.map(({ handler: a, params: h }) => [a, h])];
  }
}, "Je"), B = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), x = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakSet(), G = /* @__PURE__ */ __name(function(e, t, r, s) {
  const n = [];
  for (let o = 0, c = i(e, B).length; o < c; o++) {
    const l = i(e, B)[o], a = l[t] || l[R], h = {};
    if (a !== void 0 && (a.params = /* @__PURE__ */ Object.create(null), n.push(a), r !== ue || s && s !== ue))
      for (let u = 0, p = a.possibleKeys.length; u < p; u++) {
        const v = a.possibleKeys[u], j = h[a.score];
        a.params[v] = s != null && s[v] && !j ? s[v] : r[v] ?? (s == null ? void 0 : s[v]), h[a.score] = true;
      }
  }
  return n;
}, "G"), Je);
var Y;
var Qe;
var Jt = (Qe = /* @__PURE__ */ __name(class {
  constructor() {
    d(this, "name", "TrieRouter");
    g(this, Y);
    f(this, Y, new pt());
  }
  add(e, t, r) {
    const s = et(t);
    if (s) {
      for (let n = 0, o = s.length; n < o; n++)
        i(this, Y).insert(e, s[n], r);
      return;
    }
    i(this, Y).insert(e, t, r);
  }
  match(e, t) {
    return i(this, Y).search(e, t);
  }
}, "Qe"), Y = /* @__PURE__ */ new WeakMap(), Qe);
var gt = /* @__PURE__ */ __name(class extends ht {
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Xt({ routers: [new Vt(), new Jt()] });
  }
}, "gt");
var Le = new gt();
Le.get("/api/status", (e) => e.json({ status: "ok", version: "v1" }));
Le.get("/*", async (e) => e.env.ASSETS.fetch(e.req.raw));
var We = new gt();
var Qt = Object.assign({ "/src/index.tsx": Le });
var wt = false;
for (const [, e] of Object.entries(Qt))
  e && (We.route("/", e), We.notFound(e.notFoundHandler), wt = true);
if (!wt)
  throw new Error("Can't import modules from ['/src/index.tsx']");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-78ilIE/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = We;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-78ilIE/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=bundledWorker-0.48605306621922906.mjs.map
