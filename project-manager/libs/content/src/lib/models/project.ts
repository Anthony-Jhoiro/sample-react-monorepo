import { ProjectIconType } from '../components/projectIcon/projectIcon';

export type ProjectLink = {
  icon: ProjectIconType;
  label: string;
  href: string;
};

export type Project = {
  name: string;
  links: ProjectLink[];
};
