import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    placeholder: 'My placeholder',
  },
};

const types = ['text', 'file', 'number'] as const;

export const Types = () => (
  <div className={'grid grid-cols-3 gap-2'}>
    {types.map((type) => (
      <Input key={type} type={type} placeholder={`${type} input`} />
    ))}
  </div>
);
