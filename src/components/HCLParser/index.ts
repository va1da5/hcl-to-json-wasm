import "./wasm_exec.js";
import init from "./parser.wasm?init";

// @ts-ignore
const go = new Go(); //Defined in wasm_exec.js

export var parseToObject: (hcl: string) => any = () => ({});
export var parseToString: (hcl: string) => string = () => "";

init(go.importObject).then((instance) => {
  go.run(instance);

  // @ts-ignore
  parseToObject = window.wasmParseToObject;
  // @ts-ignore
  parseToString = window.wasmParseToString;
});
