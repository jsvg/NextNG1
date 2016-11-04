import template from './home.html';
import './home.scss';

export const homeComponent = {
  template,
  restrict: 'E',
  bindings: {},
  controller: class {
    constructor() {
      this.name = 'home';

      function* idMaker() {
        let index = 0;
        while (true) { // eslint-disable-line no-constant-condition
          yield index += 1;
        }
      }

      this.generator = false;
      this.gen = idMaker();

      this.babel = () => {
        if (this.gen.next().value >= 0) {
          this.generator = true;
        }
      };
    }
  },
};
