import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './newCellForm.stories';

const { Primary } = composeStories(stories);

describe('NewCellForm', () => {
  it('renders the form with correct title and fields', () => {
    render(<Primary />);

    expect(
      screen.getByRole('heading', { name: 'New cell' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Label')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const onSubmitMock = vi.fn();
    render(<Primary onSubmit={onSubmitMock} />);

    await userEvent.type(screen.getByLabelText('Name'), 'Test Cell');
    await userEvent.type(screen.getByLabelText('Label'), 'Test Label');

    await userEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(onSubmitMock).toHaveBeenCalled();

    expect(onSubmitMock).toHaveBeenCalledWith({
      name: 'Test Cell',
      meta: {
        type: 'text',
        label: 'Test Label',
      },
    });
  });

  it('displays validation error for name field when exceeding max length', async () => {
    render(<Primary />);

    await userEvent.type(screen.getByLabelText('Name'), 'a'.repeat(51));
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      await screen.findByText('String must contain at most 50 character(s)')
    ).toBeInTheDocument();
  });

  it('displays validation error for label field when exceeding max length', async () => {
    render(<Primary />);

    await userEvent.type(screen.getByLabelText('Label'), 'a'.repeat(129));
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      await screen.findByText('String must contain at most 128 character(s)')
    ).toBeInTheDocument();
  });
});
