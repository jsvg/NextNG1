// main dependencies
import angular from 'angular';
import uiRouter from 'angular-ui-router';

// global styles
import 'normalize.css';
import './styles/global.scss';

// module setup
import { CommonModule } from './common/common.module';
import { ComponentsModule } from './components/components.module';

// root configuration
import { RootConfig } from './root.config';
import { RootRun } from './root.run';
import { RootComponent } from './root.component';

angular
  .module('root', [
    uiRouter,
    CommonModule,
    ComponentsModule,
  ])
  .config(RootConfig)
  .run(RootRun)
  .component('root', RootComponent);
