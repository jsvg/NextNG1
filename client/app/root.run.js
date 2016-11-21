export function RootRun($transitions, $state) {
  'ngInject';

  // redirect logic - necessary for authentication firewalling
  $transitions.onStart({ to: '*' }, () => $state.target('app'));
}
