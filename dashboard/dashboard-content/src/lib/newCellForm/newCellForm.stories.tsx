import type { Meta, StoryObj } from '@storybook/react';
import { NewCellForm } from './newCellForm';

const meta: Meta<typeof NewCellForm> = {
  component: NewCellForm,
  title: 'NewCellForm',
};
export default meta;
type Story = StoryObj<typeof NewCellForm>;

export const Primary: Story = {
  args: {
    t: {
      title: 'New cell',
      submitButton: 'Create',
      fields: {
        name: {
          label: 'Name',
          placeholder: 'Name placeholder',
        },
        type: {
          label: 'Type',
        },
        href: {
          label: 'Url',
          placeholder: 'https://anthonyquere.fr',
        },
        label: {
          label: 'Label',
          placeholder: 'Label placeholder',
        },
        dimensionsHeight: {
          label: 'Height',
          placeholder: '1',
        },
        dimensionsWidth: {
          label: 'Width',
          placeholder: '1',
        },
      },
    },
    onSubmit: (values) => {
      console.log(values);
    },
  },
};
