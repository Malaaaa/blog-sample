# create-react-app JavaScript  project to TypeScript 

Add dependencies

```bash
npm add -D typescript @types/react @types/node @types/react-dom @types/jest
```

Delete node_modules and reinstall everything

```bash
npm i 
```

Use CMD change file name 

windows bat

```bat
@echo off

rem Searching...

for /f "delims=" %%i in ('dir /b /a-d /s "*.js"') do ren "%%i" "%%~ni.ts"

rem Done

@pause
```



