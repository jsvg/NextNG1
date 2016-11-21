{{#if hasTemplate}}
import template from './{{kabobCase name}}.html';
{{/if}}
{{#if hasStyle}}
import './{{kabobCase name}}.scss';
{{/if}}

export const {{camelCase name}}Component = {
  {{#if hasTemplate}}
  template,
  {{else}}
  template: `
    <p class="{{kabobCase name}}">\{{$ctrl.name}}</p>
  `,
  {{/if}}
  restrict: 'E',
  bindings: { },
  controller: class {
    constructor() {
      this.name = '{{pascalCase name}} Component';
    }
  },
};
