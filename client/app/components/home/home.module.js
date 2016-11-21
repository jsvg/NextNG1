import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { homeComponent } from './home.component';

export const HomeModule = angular
  .module('home', [uiRouter])
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('app.home', {
        url: '/',
        component: 'home',
      });
  })
  .component('home', homeComponent)
  .name;
