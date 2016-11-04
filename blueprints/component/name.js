import angular from 'angular';
import { {{pascalCase name}}Component } from './{{kabobCase name}}.component';
import './{{kabobCase name}}.styl';

export const {{pascalCase name}}Module = angular
  .module('{{dotCase name}}', [])
  .component('{{camelCase name}}', {{pascalCase name}}Component)
  {{#if routeState}}
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider
      .state('{{dotCase routeState}}', {
        title: '',
        url: '/{{routerState routeState}}',
        component: '{{camelCase routeState}}',
      });
    $urlRouterProvider.otherwise('/');
  })
  {{/if}}
  .name;
