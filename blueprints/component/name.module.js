import angular from 'angular';
{{#if routeState}}import uiRouter from 'angular-ui-router';{{/if}}
import { {{camelCase name}}Component } from './{{kabobCase name}}.component';

export const {{pascalCase name}}Module = angular
  .module('{{dotCase name}}', [{{#if routeState}}uiRouter{{/if}}])
  {{#if routeState}}
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('{{dotCase routeState}}', {
        url: '/{{routerState routeState}}',
        component: '{{camelCase name}}',
      });
  })
  {{/if}}
  .component('{{camelCase name}}', {{camelCase name}}Component)
  .name;
