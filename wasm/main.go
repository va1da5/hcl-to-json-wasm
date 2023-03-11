package main

import (
	"fmt"
	"syscall/js"

	"github.com/tmccombs/hcl2json/convert"
)

func main() {
	done := make(chan struct{})
	js.Global().Set("wasmParseToString", js.FuncOf(parseToString))
	js.Global().Set("wasmParseToObject", js.FuncOf(parseToObject))
	<-done
}

// Parse a HCL string into a JSON string
func parseToString(this js.Value, args []js.Value) interface{} {
	convertedBytes, err := convert.Bytes([]byte(args[0].String()), "", convert.Options{})
	if err != nil {
		return ""
	}
	return string(convertedBytes)
}

// Parse a HCL string into a JSON object
func parseToObject(this js.Value, args []js.Value) interface{} {
	jsonString := fmt.Sprintf("%v", parseToString(this, args))
	if len(jsonString) == 0 {
		return nil
	}

	obj := js.Global().Get("JSON").Call("parse", string(jsonString))
	return obj
}
