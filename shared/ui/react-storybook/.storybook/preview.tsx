import * as React from 'react';
import './tailwind.css';
import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="dark macchiato bg-background text-foreground h-screen w-full p-5 overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export default preview;
