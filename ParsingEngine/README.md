# RuleEvaluator

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Modifying the parser

The parser is compiled with [jison](http://zaa.ch/jison/)
The .jison grammar specification file can be found at `parser/parser.jison`

The grammar file is based on flex/bison notation (see [here](https://www.gnu.org/software/bison/))

If the grammar file is edited, it will need to be recompiled with `npm run build:parser`

`npm start` has a pre-run trigger that automatically compiles the parser before running the app server.