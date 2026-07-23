import { readFileSync, writeFileSync } from "node:fs";

const handlerPath = ".open-next/server-functions/default/handler.mjs";
const shimMarker = "/* EZ Law OpenNext require shim */";
const source = readFileSync(handlerPath, "utf8");

if (!source.includes(shimMarker)) {
  const shim = `${shimMarker}
var require = globalThis.require || ((id) => {
  const normalized = id.startsWith("node:") ? id.slice(5) : id;
  const builtin = globalThis.process?.getBuiltinModule?.(normalized);
  if (builtin) return builtin;
  throw new Error(\`Dynamic require of "\${id}" is not supported\`);
});
`;

  writeFileSync(handlerPath, `${shim}${source}`);
}
