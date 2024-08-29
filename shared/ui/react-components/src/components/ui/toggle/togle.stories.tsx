import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './toggle';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'Toggle',
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Primary: Story = {
  args: {
    onClick: () => alert('Toggle clicked!'),
    children: 'Toggle me',
  },
};

const variants = ['default', 'outline'] as const;
const sizes = ['default', 'sm', 'lg'] as const;

export const Versions = () => (
  <div className="grid grid-cols-2 grid-rows-3 gap-3">
    {sizes.map((size) =>
      variants.map((variant) => (
        <Toggle key={variant + size} variant={variant} size={size}>
          {variant} toggle, {size} size
        </Toggle>
      ))
    )}
  </div>
);

export const Pressed: Story = {
  args: {
    ...Primary.args,
    pressed: true,
  },
};
