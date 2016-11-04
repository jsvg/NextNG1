import template from './home.html';
import './home.scss';

export const homeComponent = {
  template,
  restrict: 'E',
  bindings: {},
  controller: class {
    constructor() {
      this.name = 'home';
      this.generatorVal = 0;
      this.generator = false;

      function* idMaker() {
        let index = 0;
        while (true) { // eslint-disable-line no-constant-condition
          yield index += 10;
        }
      }

      this.gen = idMaker();
      this.babelTest = () => {
        this.generatorVal = this.gen.next().value;
        if (this.generatorVal >= 0) {
          console.log('generator test success'); // eslint-disable-line no-console
          this.generator = true;
        }
      };
    }
  },
};
