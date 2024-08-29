import * as React from 'react';
import { FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@home-dashboard/react-components';
import { Project } from '@home-dashboard/project-manager/project-manager-content';
import { ProjectIcon } from '../projectIcon/projectIcon';

type Props = {
  project: Project
}

export const ProjectCard: FC<Props> = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-text">{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {
          project.links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              className="flex items-center justify-center p-2 rounded-md bg-surface0 text-text hover:bg-surface1 transition-colors"
            >
              <ProjectIcon type={link.icon} className="w-5 h-5 mr-2" />
              {link.label}
            </a>
          ))
        }
      </CardContent>
    </Card>
  );
};
