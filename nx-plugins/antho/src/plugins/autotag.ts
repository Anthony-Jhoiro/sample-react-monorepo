import { readJsonFile, CreateNodes, CreateNodesContext } from '@nx/devkit';
import { dirname } from 'node:path';
import { CreateNodesResult } from 'nx/src/project-graph/plugins/public-api';

export const createNodes: CreateNodes = [
  '**/project.json',
  (projectConfigurationFile: string): CreateNodesResult => {
    const root = dirname(projectConfigurationFile);
    const firstFolderOfProject = root.split('/')[0];

    return {
      projects: {
        [root]: {
          tags: [`scope:${firstFolderOfProject}`],
        },
      },
    };
  },
];
