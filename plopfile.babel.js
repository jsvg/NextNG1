const component = {
  description: 'Create a Component Module',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'Component name (e.g. listItem):',
  }, {
    type: 'input',
    name: 'path',
    message: 'Component directory (base: client/app/components/*):',
    default: '',
  }, {
    type: 'input',
    name: 'routeState',
    message: 'If component is routed, provide state (e.g. list.item), otherwise leave blank:',
    default: '',
  }, {
    type: 'confirm',
    name: 'importNow',
    message: 'Add import statement to ComponentsModule?',
  }, {
    type: 'confirm',
    name: 'hasTemplate',
    message: 'Include html template?',
  }, {
    type: 'confirm',
    name: 'hasStyle',
    message: 'Include SCSS style?',
  }, {
    type: 'confirm',
    name: 'hasTest',
    message: 'Include test?',
  }],
  actions(data) {
    const coreFiles = [{
      type: 'add',
      path: 'client/app/components/{{path}}/{{kabobCase name}}/{{kabobCase name}}.module.js',
      templateFile: 'blueprints/component/name.module.js',
    }, {
      type: 'add',
      path: 'client/app/components/{{path}}/{{kabobCase name}}/{{kabobCase name}}.component.js',
      templateFile: 'blueprints/component/name.component.js',
    }];

    if (data.hasTemplate) {
      coreFiles.push({
        type: 'add',
        path: 'client/app/components/{{path}}/{{kabobCase name}}/{{kabobCase name}}.html',
        templateFile: 'blueprints/component/name.html',
      });
    }

    if (data.hasStyle) {
      coreFiles.push({
        type: 'add',
        path: 'client/app/components/{{path}}/{{kabobCase name}}/{{kabobCase name}}.scss',
        templateFile: 'blueprints/component/name.scss',
      });
    }

    if (data.hasTest) {
      coreFiles.push({
        type: 'add',
        path: 'client/app/components/{{path}}/{{kabobCase name}}/{{kabobCase name}}.spec.js',
        templateFile: 'blueprints/component/name.spec.js',
      });
    }

    if (data.importNow) {
      coreFiles.push({
        type: 'modify',
        path: 'client/app/components/components.module.js',
        pattern: /(\/\/ GENERATOR IMPORT WAYPOINT\n)/gi,
        template: 'import { {{pascalCase name}}Module } from \'./{{#if path}}{{path}}/{{/if}}{{kabobCase name}}/{{kabobCase name}}.module\';\n$1',
      }, {
        type: 'modify',
        path: 'client/app/components/components.module.js',
        pattern: /( {4}\/\/ GENERATOR DEPENDENCY WAYPOINT\n)/gi,
        template: '    {{pascalCase name}}Module,\n$1',
      });
    }

    return coreFiles;
  },
};

const common = {
  description: 'Create a Common Module',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'Common component name (e.g. appHeader):',
  }, {
    type: 'input',
    name: 'path',
    message: 'Component directory (base: client/app/common/*):',
    default: '',
  }, {
    type: 'confirm',
    name: 'importNow',
    message: 'Add import statement to CommonModule?',
  }, {
    type: 'confirm',
    name: 'hasTemplate',
    message: 'Include html template?',
  }, {
    type: 'confirm',
    name: 'hasStyle',
    message: 'Include SCSS style?',
  }, {
    type: 'confirm',
    name: 'hasTest',
    message: 'Include test?',
  }],
  actions(data) {
    const coreFiles = [{
      type: 'add',
      path: 'client/app/common/{{path}}/{{kabobCase name}}/{{kabobCase name}}.module.js',
      templateFile: 'blueprints/component/name.module.js',
    }, {
      type: 'add',
      path: 'client/app/common/{{path}}/{{kabobCase name}}/{{kabobCase name}}.component.js',
      templateFile: 'blueprints/component/name.component.js',
    }];

    if (data.hasTemplate) {
      coreFiles.push({
        type: 'add',
        path: 'client/app/common/{{path}}/{{kabobCase name}}/{{kabobCase name}}.html',
        templateFile: 'blueprints/component/name.html',
      });
    }

    if (data.hasStyle) {
      coreFiles.push({
        type: 'add',
        path: 'client/app/common/{{path}}/{{kabobCase name}}/{{kabobCase name}}.scss',
        templateFile: 'blueprints/component/name.scss',
      });
    }

    if (data.hasTest) {
      coreFiles.push({
        type: 'add',
        path: 'client/app/common/{{path}}/{{kabobCase name}}/{{kabobCase name}}.spec.js',
        templateFile: 'blueprints/component/name.spec.js',
      });
    }

    if (data.importNow) {
      coreFiles.push({
        type: 'modify',
        path: 'client/app/common/common.module.js',
        pattern: /(\/\/ GENERATOR IMPORT WAYPOINT\n)/gi,
        template: 'import { {{pascalCase name}}Module } from \'./{{#if path}}{{path}}/{{/if}}{{kabobCase name}}/{{kabobCase name}}.module\';\n$1',
      }, {
        type: 'modify',
        path: 'client/app/common/common.module.js',
        pattern: /( {4}\/\/ GENERATOR DEPENDENCY WAYPOINT\n)/gi,
        template: '    {{pascalCase name}}Module,\n$1',
      });
    }

    return coreFiles;
  },
};

module.exports = (plop) => {
  plop.addHelper('routerState', routerState => routerState.split('.').pop());
  plop.setGenerator('Component Module', component);
  plop.setGenerator('Common Module', common);
};
