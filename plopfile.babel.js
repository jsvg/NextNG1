const component = {
  description: 'Create a component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Component name (e.g. listItem):',
    },
    {
      type: 'input',
      name: 'path',
      message: 'Component directory:',
      default: 'client/app/components/',
    },
    {
      type: 'input',
      name: 'routeState',
      message: 'If component is routed, provide state (e.g. list.item), otherwise leave blank:',
      default: '',
    },
  ],
  actions: [
    {
      type: 'add',
      path: '{{path}}/{{kabobCase name}}/{{kabobCase name}}.js',
      templateFile: 'blueprints/component/name.js',
    },
    {
      type: 'add',
      path: '{{path}}/{{kabobCase name}}/{{kabobCase name}}.component.js',
      templateFile: 'blueprints/component/name.component.js',
    },
    {
      type: 'add',
      path: '{{path}}/{{kabobCase name}}/{{kabobCase name}}.spec.js',
      templateFile: 'blueprints/component/name.spec.js',
    },
    {
      type: 'add',
      path: '{{path}}/{{kabobCase name}}/{{kabobCase name}}.html',
      templateFile: 'blueprints/component/name.html',
    },
    {
      type: 'add',
      path: '{{path}}/{{kabobCase name}}/{{kabobCase name}}.scss',
      templateFile: 'blueprints/component/name.scss',
    },
  ],
};

module.exports = (plop) => {
  plop.addHelper('routerState', routerState => routerState.split('.').pop());
  plop.setGenerator('component', component);
};
