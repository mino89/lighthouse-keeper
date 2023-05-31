# LighthouseKeeper

## Getting started
### Install depenencies 

First you need to install project dependencies

`npm install` or `yarn install`

### Configure environments 
you can use angular cli command `ng generante environments` or if you want to create your files manually, just add `environment.ts and environment.development.ts` in `./src/environments` folder

you can find a configuration example
```ts
export const environment = {
  production: true,
  PAGESPEED_API_KEY: 'your_api_key',
  PAGESPEED_API_ROOT: 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
  API_ROOT: 'http://localhost:3000',
};
```
## Development and Mock server 

Run `npm run dev` to start both development server and mock api server
## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
