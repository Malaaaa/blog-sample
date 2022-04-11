# Architecture

![Architecture](./image/2022-04-10-19-08-53.png)

argc：argument counter
argv：argument vector (an array)

## global objects

![Global objects](./image/2022-04-10-19-12-16.png)

### Special global objects

`__dirname、__filename、exports、module、require()` not available in cli

### Common global objects

- process `.argv .env` Operating environment, parameter information, etc.
- console
- Timer functions `setTimeout` `setInterval` `setImmediate` `process.nextTick`

JavaScript code executed in the browser, if we define a property in the top-level scope via var, it will be added to the window by default object.But in node, we define a variable by var, which is only a variable in the current module and is not put into the global.

![browser](./image/2022-04-10-19-28-43.png) Top level var add to GO, const dont add to GO as an attribute.const is a module.
![node](./image/2022-04-10-19-31-56.png) REPL var a add to GO. In script is module. so don't add.
![nodeModule](./image/2022-04-10-19-36-40.png)
