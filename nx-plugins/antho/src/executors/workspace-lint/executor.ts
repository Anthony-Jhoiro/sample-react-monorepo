import { WorkspaceLintExecutorSchema } from './schema';
import { ExecutorContext, ProjectConfiguration } from '@nx/devkit';
import * as fs from 'node:fs';

type GlobalRule = {
  run: (context: ExecutorContext) =>
    | {
        status: 'ok';
        result: string;
      }
    | { status: 'fail'; result: string };
  fix?: (context: ExecutorContext) => Promise<void>;
};

type ProjectRule = {
  run: (
    project: ProjectConfiguration,
    context: ExecutorContext
  ) =>
    | {
        status: 'ok';
        result: string;
      }
    | { status: 'fail'; result: string };
  fix?: (
    project: ProjectConfiguration,
    context: ExecutorContext
  ) => Promise<void>;
};

const getAllReactProjectsLibs = (context: ExecutorContext) => {
  return Object.entries(context.projectGraph.nodes)
    .filter(([key, data]) => data.type === 'lib')
    .filter(([key, data]) => {
      const deps = context.projectGraph.dependencies[key];
      return deps.findIndex((value) => value.target === 'npm:react') !== -1;
    })
    .map(([key]) => key)
    .filter(
      (key) => !['@home-dashboard/source', 'react-storybook'].includes(key)
    );
};

const projectShouldBeTaggedByScope: ProjectRule = {
  run: (project, context) => {
    if (project.name === '@home-dashboard/source') {
      return { status: 'ok', result: 'root project is ignored' };
    }
    const firstFolderOfProject = project.root.split('/')[0];
    console.log(firstFolderOfProject + ' ' + project.name);
    if (project.tags.includes('scope:' + firstFolderOfProject)) {
      return { status: 'ok', result: 'project is tagged by scope' };
    }
    return { status: 'fail', result: 'project is not tagged by scope' };
  },
};

const OnReactStorybookAllDepAreExternals: GlobalRule = {
  fix: async (context) => {
    const storybookProject = context.projectGraph.nodes['react-storybook'];

    if (!storybookProject) {
      throw new Error('Storybook project not found');
    }

    const allReactProjects = getAllReactProjectsLibs(context);

    const projectJson = fs.readFileSync(
      storybookProject.data.root + '/project.json',
      'utf-8'
    );
    const project = JSON.parse(projectJson);
    project.implicitDependencies = allReactProjects;
    fs.writeFileSync(
      storybookProject.data.root + '/project.json',
      JSON.stringify(project, null, 2)
    );

    return;
  },

  run: (context) => {
    const storybookProject = context.projectGraph.nodes['react-storybook'];

    if (!storybookProject) {
      return { status: 'fail', result: 'Storybook project not found' };
    }
    const externalDeps = storybookProject.data.implicitDependencies;

    const allReactProjects = getAllReactProjectsLibs(context);

    if (
      allReactProjects.length === externalDeps.length &&
      allReactProjects.every((key) => externalDeps.includes(key))
    ) {
      return { status: 'ok', result: 'All react projects are external deps' };
    }

    return {
      status: 'fail',
      result: `Some react projects are not external deps. Expected ${JSON.stringify(
        allReactProjects
      )}, found ${JSON.stringify(externalDeps)}`,
    };
  },
};

const rules: Array<GlobalRule> = [OnReactStorybookAllDepAreExternals];

const projectRules: Array<ProjectRule> = [projectShouldBeTaggedByScope];

export default async function runExecutor(
  options: WorkspaceLintExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for WorkspaceLint', options);

  for (const rule of rules) {
    const result = rule.run(context);
    if (result.status === 'fail') {
      if (rule.fix) {
        await rule.fix(context);
        const newResult = rule.run(context);
        if (newResult.status !== 'fail') {
          console.log('WorkspaceLint fixed', result.result);
          return {
            success: false,
          };
        }
      } else {
        console.error('WorkspaceLint failed', result.result);
        return {
          success: false,
        };
      }
    }
  }

  for (const node of Object.values(context.projectGraph.nodes)) {
    console.log('   => Running on project ' + node.name);
    for (const projectRule of projectRules) {
      const result = projectRule.run(node.data, context);
      if (result.status === 'fail') {
        if (projectRule.fix) {
          await projectRule.fix(node.data, context);
          const newResult = projectRule.run(node.data, context);
          if (newResult.status !== 'fail') {
            console.log('WorkspaceLint fixed', result.result);
            return {
              success: false,
            };
          }
        } else {
          console.error('WorkspaceLint failed', result.result);
          return {
            success: false,
          };
        }
      }
    }
  }

  // console.log(context.projectGraph.dependencies['react-storybook']);
  return {
    success: true,
  };
}
