import template from './{{kabobCase name}}.html';

export const {{pascalCase name}}Component = {
  template,
  bindings: { },
  restrict: 'E',
  controller: class {{pascalCase name}}Component {
    constructor() {
      // 'ngInject';
      this.name = '{{pascalCase name}} Component';
    }
  },
};
