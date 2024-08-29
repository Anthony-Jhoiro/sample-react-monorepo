import { ProjectCard } from '../../../project-manager-content/src/lib/components/projectCard/projectCard';
import { Project } from '@home-dashboard/project-manager/project-manager-content';

type Props = {
  projects: Project[];
};

export const OverviewPage: React.FC<Props> = ({ projects }) => {
  return (
    <div className={'container mx-auto py-16'}>
      <div className={'grid grid-cols-3 gap-5'}>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
};
