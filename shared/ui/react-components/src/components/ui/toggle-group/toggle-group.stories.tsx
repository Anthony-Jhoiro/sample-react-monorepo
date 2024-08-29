import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  title: 'ToggleGroup',
};
export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Primary: Story = {
  args: {
    type: 'single',
    defaultValue: 'center',
    children: (
      <>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </>
    ),
  },
};

const variants = ['default', 'outline'] as const;
const sizes = ['default', 'sm', 'lg'] as const;

export const Versions = () => (
  <div className="grid grid-cols-2 gap-6">
    {variants.map((variant) =>
      sizes.map((size) => (
        <ToggleGroup
          key={variant + size}
          type="multiple"
          variant={variant}
          size={size}
        >
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      ))
    )}
  </div>
);

export const SingleSelect: Story = {
  args: {
    ...Primary.args,
  },
};

export const MultipleSelect: Story = {
  args: {
    ...(Primary.args as Omit<typeof Primary.args, 'defaultValue'>),
    type: 'multiple',
    defaultValue: ['left', 'right'],
  },
};
