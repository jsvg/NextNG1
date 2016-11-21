import angular from 'angular';
import { HomeModule } from './home/home.module';
// GENERATOR IMPORT WAYPOINT

export const ComponentsModule = angular
  .module('app.components', [
    HomeModule,
    // GENERATOR DEPENDENCY WAYPOINT
  ]).name;
