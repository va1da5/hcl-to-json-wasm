wasm_component_path=src/components/HCLParser

.PHONY: build
build:
	GOOS=js GOARCH=wasm go build -o $(wasm_component_path)/parser.wasm wasm/main.go

.PHONY: wasm_js
wasm_js:
	cp "$$(go env GOROOT)/misc/wasm/wasm_exec.js" $(wasm_component_path)
