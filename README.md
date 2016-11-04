# NextNG Seed Project for Angular 1
Simply an Angular seed project to serve as a starting point or reference for NG1 projects developed on a **component-based architecture** using the best of **ES6**, **SCSS**, and **webpack**.

Loaded with developer creature comforts such as:
* Hot Module Reloading (instant CSS reloads)
* [Browser-Sync](browsersync.io) integration
* Testing setup with Mocha/Karma/Chai
* Command-line component generatators with [Plop](https://github.com/amwmedia/plop)
* JS / SCSS linting configured to the [AirBNB](https://www.npmjs.com/package/eslint-config-airbnb-base) and [Sass Guidelines](https://sass-guidelin.es/)
* Pagespeed testing

## Setup
1. **Clone me**: `git clone https://github.com/jsvg/NextNG1.git`
2. **Setup dependencies**: `yarn install --ignore-engines`
3. **Run**: `yarn run start`

The ignore-engines flag is consequence of ui-router issue and npm registration. Will hopefully not be needed when next ui-router is released.

See the docs folder for more details on the configuration of this project.

## Commands
**Development Server**
`yarn run start`
Hot reload server at port 3000.

**Build**
`yarn run build`

**Test**
`yarn run test`

**Lint**
`yarn run lint`

**Speed Test**
`yarn run pagespeed`

## Thanks
* [React Boilerplate](https://github.com/mxstbr/react-boilerplate) and [React Slingshot](https://github.com/coryhouse/react-slingshot) projects for insights on webpack configuration
* [Todd Motto Angular Styleguide](https://github.com/toddmotto/angular-styleguide) for the structure of the `client`
* [NG6-Starter](https://github.com/AngularClass/NG6-starter) for a strong foundation
