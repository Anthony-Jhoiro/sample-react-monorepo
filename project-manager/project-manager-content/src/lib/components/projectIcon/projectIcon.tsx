import { Github, Link, User } from 'lucide-react';
import React from 'react';


const icons = {
  'github': Github,
  'external': Link,
  'person': User
}


export type ProjectIconType = keyof typeof icons;

export const ProjectIcon: React.FC<{ type: ProjectIconType, className: HTMLDivElement['className'] }> = ({ type, className }) => {
  const Icon = icons[type];
  return <Icon className={className} />;
};
