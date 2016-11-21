import angular from 'angular';
import { AppModule } from './app/app.module';
import { AppHeaderModule } from './app-header/app-header.module';
// GENERATOR IMPORT WAYPOINT

export const CommonModule = angular
  .module('app.common', [
    AppModule,
    AppHeaderModule,
    // GENERATOR DEPENDENCY WAYPOINT
  ]).name;
