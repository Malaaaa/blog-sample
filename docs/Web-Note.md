# Web notes

Writing folder and file names lowercase with no spaces and with words separated by hyphens

- [x] Internet work?

Protocol Layer:
Application Protocols Layer: WWW, e-mail, FTP, etc.
Transmission Control Protocol Layer: TCP derict to [port] (some application)
Internet Protocol Layer: IP
Hardware Layer: Converts binary packet data to network signals and back. (telecomunacation)

- [x] HTTP?

A typical HTTP request contains:

- HTTP version type
- a URL
- an HTTP method
- HTTP request headers
- Optional HTTP body

HTTP status code

- 1xx Informational
- 2xx Success
- 3xx Redirection
- 4xx Client Error
- 5xx Server Error

HTTP is stateless, but not sessionless

Chrome run multiple instances of the rendering engine: one for each tab. Each tab runs in a separate process.

- **The user interface**: this includes the address bar, back/forward button, bookmarking menu, etc. Every part of the browser display except the window where you see the requested page.
- **The browser engine**: marshals actions between the UI and the rendering engine.
- **The rendering engine** : responsible for displaying requested content. For example if the requested content is HTML, the rendering engine parses HTML and CSS, and displays the parsed content on the screen.
- **Networking**: for network calls such as HTTP requests, using different implementations for different platform behind a platform-independent interface.
- **UI backend**: used for drawing basic widgets like combo boxes and windows. This backend exposes a generic interface that is not platform specific. Underneath it uses operating system user interface methods.
- **JavaScript interpreter**: Used to parse and execute JavaScript code.
- **Data storage**: This is a persistence layer. The browser may need to save all sorts of data locally, such as cookies. Browsers also support storage mechanisms such as localStorage, IndexedDB, WebSQL and FileSystem.
