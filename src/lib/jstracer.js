import Interpreter from "js-interpreter";
import * as acorn from "acorn";

export function runAndTrace(codeString, customInput = "") {
  const snapshots = [];
  const MAX_STEPS = 1000;
  let stdoutBuffer = "";

  const ast = acorn.parse(codeString, {
    ecmaVersion: 2020,
    locations: true,
  });

  function safeRepr(val) {
    if (val === undefined) return "undefined";
    if (val === null) return "null";
    if (typeof val === "string") return `'${val}'`;
    if (typeof val !== "object") return String(val);

    if (val.class === "Array") {
      const items = val.properties.length > 10
        ? Object.values(val.properties).slice(0, 10).map(safeRepr).concat(["..."])
        : Object.values(val.properties).map(safeRepr);
      return `[${items.join(", ")}]`;
    }

    if (val.class === "Function") return `ƒ ${val.name || ''}()`;
    if (val.class === "Object") return `{...}`;

    return String(val);
  }

  const tokens = customInput.split(/\s+/);
  let inputIndex = 0;

  const initFunc = (interpreter, globalObject) => {
    const consoleObj = interpreter.createObject(interpreter.OBJECT);

    interpreter.setProperty(globalObject, "console", consoleObj);

    interpreter.setProperty(
      consoleObj,
      "log",
      interpreter.createNativeFunction((...args) => {
        const text = args.map(arg =>
          (arg && typeof arg === "object" && arg.data !== undefined)
            ? arg.data
            : arg
        ).join(" ");

        stdoutBuffer += text + "\n";
      })
    );

    interpreter.setProperty(
      globalObject,
      "input",
      interpreter.createNativeFunction(() => {
        return tokens[inputIndex++] || "";
      })
    );
  };

  const interpreter = new Interpreter(ast, initFunc);

  function getScopeVariables(scope, globalScope) {
    const locals = {};
    const globals = {};
    let currentScope = scope;

    while (currentScope) {
      const isGlobal = (currentScope === globalScope);
      const target = isGlobal ? globals : locals;

      const scopeObject = currentScope.object;

      if (scopeObject && scopeObject.properties) {
        for (const key in scopeObject.properties) {
          if (
            key === "arguments" ||
            key === "this" ||
            key === "window" ||
            key === "console" ||
            key === "self" ||
            key === "input" ||
            key.startsWith("__")
          ) continue;

          if (!(key in locals) && !(key in globals)) {
            target[key] = safeRepr(scopeObject.properties[key]);
          }
        }
      }

      currentScope = currentScope.parent;
    }

    return { locals, globals };
  }

  let lastLine = -1;
  let steps = 0;

  try {
    while (interpreter.step()) {
      steps++;

      if (steps > MAX_STEPS) break;

      const stack = interpreter.stateStack;
      if (!stack.length) continue;

      const node = stack[stack.length - 1].node;
      if (!node || !node.loc) continue;

      const currentLine = node.loc.start.line;

      if (currentLine === lastLine) continue;
      lastLine = currentLine;

      const currentScope = stack[stack.length - 1].scope;
      const { locals, globals } = getScopeVariables(currentScope, interpreter.globalScope);

      snapshots.push({
        line: currentLine,
        event: "step",
        func: "module",
        locals,
        globals,
        stdout: stdoutBuffer,
      });
    }
  } catch (err) {
    snapshots.push({ error: err.message });
  }

  return snapshots;
}