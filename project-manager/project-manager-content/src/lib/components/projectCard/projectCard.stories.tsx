import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from './projectCard';

const meta: Meta<typeof ProjectCard> = {
  component: ProjectCard,
  title: 'ProjectCard',
};
export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Primary: Story = {
  args: {
    project: {
      name: 'I am a project',
      links: [
        {
          icon: 'github',
          label: 'Github',
          href: 'https://github.com/anthony-jhoiro',
        },
        {
          icon: 'external',
          label: 'Website',
          href: 'https://anthonyquere.fr',
        },
        {
          icon: 'person',
          label: 'Me',
          href: 'https://github.com/anthony-jhoiro',
        }
      ],
    }
  },
};
