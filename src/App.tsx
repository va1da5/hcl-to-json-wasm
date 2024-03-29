import { useEffect, useRef, useState } from "react";

import CodeMirror from "@uiw/react-codemirror";

import { useWindowHeight } from "@react-hook/window-size";
import { parseToObject } from "./components/HCLParser";
import { init_wasm } from "./components/HCLParser";

const initialValue = `resource "foo" "bar" {
  value = "⚠️ awesome ⚠️"
}
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [hclContent, setHclContent] = useState("");
  const [height, setHeight] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const windowHeight = useWindowHeight();

  useEffect(() => {
    init_wasm(() => {
      setHclContent(initialValue);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!divRef.current) return;
    setHeight(divRef.current.clientHeight);
  }, [windowHeight]);

  const parse = (hclContent: string) => {
    return parseToObject(hclContent);
  };

  return (
    <div className="container relative mx-auto h-full">
      {loading && (
        <div className="absolute w-full text-center top-10 text-gray-600">
          Loading WASM binary...
        </div>
      )}
      <div className="py-5">
        <h1 className=" text-2xl">HCL v2 to JSON</h1>
        <p className="text-gray-600">
          Easily convert your HCL/TF data to JSON right in your browser!
        </p>
      </div>
      <div className="grid h-[calc(100%-150px)] grid-cols-2 gap-4">
        <div className="h-full border" ref={divRef}>
          <CodeMirror
            value={hclContent}
            height={`${height}px`}
            extensions={[]}
            onChange={setHclContent}
            autoFocus={true}
          />
        </div>
        <div className="border">
          <textarea
            className="h-full w-full p-4 font-mono text-sm"
            readOnly
            value={
              !hclContent.length
                ? ""
                : JSON.stringify(parse(hclContent), null, 2)
            }
            placeholder="JSON output"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
