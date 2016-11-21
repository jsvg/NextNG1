import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { appComponent } from './app.component';

export const AppModule = angular
  .module('app', [uiRouter])
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('app', {
        url: '',
        redirectTo: 'app.home',
        component: 'app',
      });
  })
  .component('app', appComponent)
  .name;
