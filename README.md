# HCL v2 to JSON

Hey there! This project lets you easily switch up your [HCL/TF](https://github.com/hashicorp/hcl) to JSON data, all without breaking a sweat! We're using a super cool WebAssembly package that's been compiled from [tmccombs/hcl2json](https://github.com/tmccombs/hcl2json) go module to make it happen.

## WebAssembly

In order to compile to WebAssembly (WASM), it is necessary to add the command `GOOS=js GOARCH=wasm` to the build command. This specifies to the Go compiler to generate a `.wasm` file.

```bash
# compile go module to WebAssembly
GOOS=js GOARCH=wasm go build -o src/components/HCLParser/parser.wasm wasm/main.go
```

Go provides the `wasm_exec.js` file to enable fetching and execution of Go's `parser.wasm` code within the browser environment.

To obtain the JavaScript file, navigate to the `GOROOT` folder. You can copy it to your static directory using the following command:

```bash
# update/replace wasm_exec.js
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" src/components/HCLParser
```

## References

- [tmccombs/hcl2json](https://github.com/tmccombs/hcl2json)
- [HCL v2 parser for JS](https://github.com/benc-uk/hcl2-parser)
- [Go syscall/js](https://pkg.go.dev/syscall/js)
- [Golang WebAssembly](https://binx.io/2022/04/22/golang-webassembly/)
