import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary = {
  args: {
    onClick: () => alert('you clicked me!'),
  },
};

const variants = ['default', 'secondary', 'outline', 'ghost', 'link'] as const;
const sizes = ['default', 'sm', 'lg'] as const;

export const Versions = () => (
  <div className="grid grid-cols-5 grid-rows-3 gap-3">
    {sizes.map((size) =>
      variants.map((variant) => (
        <Button key={variant + size} variant={variant} size={size}>
          {variant} button, {size} size
        </Button>
      ))
    )}
  </div>
);
