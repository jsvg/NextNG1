import './home.scss';

export const homeComponent = {
  template: `
    <p class="home">Hello from {{$ctrl.name}}</p>
  `,
  restrict: 'E',
  bindings: { },
  controller: class {
    constructor() {
      this.name = 'home component';
    }
  },
};
