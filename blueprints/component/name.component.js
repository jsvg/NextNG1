import template from './{{kabobCase name}}.html';

export const {{pascalCase name}}Component = {
  template,
  restrict: 'E',
  bindings: { },
  controller: class {
    constructor() {
      // 'ngInject';
      this.name = '{{pascalCase name}} Component';
    }
  },
};
