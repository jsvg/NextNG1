export function RootConfig($locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');
}
