import angular from 'angular';

import { appHeaderComponent } from './app-header.component';

export const AppHeaderModule = angular
  .module('app.header', [])
  .component('appHeader', appHeaderComponent)
  .name;
