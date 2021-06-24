# ray-serve
A server development library for ray-net and ray-userland. Based on ExpressJS!

# Installation
To install ray-serve as a dependency for your project use:
```javascript
npm i ray-serve --save
```

# Usage
Use the ray-serve libray like this:
```javascript
const serve = require('ray-serve');

serve
  .getIPV4((err,add,fam)=>{ console.log(`hostname ${add}`) })
  .showRoot("Bright Org", "v1.2.4")
  .serveJSON({name: "bella", age: 15}, "/dusk")
  .serveFile("anyfile", "/dawn", "../anyDirectory/")
  .listen();

```

1. `.app`: This is a prop that holds `express()`.

2. `.port`: This is a prop that holds the port number.

3. `.latency`: This is a prop that hold the server delay faked if mimicking download times, or other server-client delay is required.

4. `.hostname`: This is a prop that holds the hostname.

5. `.getIPV4(callback)`: This method is used to get the IPV4 address (like 192.168.1.109` and call a callback function in response.

6. `.showRoot(softwareName, versionName)`: This methods shows a JSON object at the root "/" node with props showing the value of `softwareName` and `versionName` arguments.

7. `.serveJSON(object, /node)`: This method shows the provided object at the given node. For example, `192.168.1.109:4040/node`. The node name always begins with a "/" (forward slash). The order of arguments dosen't affect the method thanks to the `ray-taken` library.

8. `.serveFile(fileName, fileDirectory/, /node)`: This methods sends the provided file from the given directory (relative to the __dirname) to the assigned /node. The order of the arguments dosen't affect the method thanks to the `ray-taken` library. The /node name always begins with "/". The dirName/ always ends with "/". The file name must not have any "/".

9. `.listen(callback)`: This method is used to listen at the configured port, and the provided callback is called. If no callback is given then a default callback is executed which just logs the hostanme and port.

10. More stuff comming soon!

# LICENSE

MIT License

Copyright (c) 2021 Ray Voice

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

