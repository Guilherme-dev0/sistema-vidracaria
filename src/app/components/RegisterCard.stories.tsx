import type { Meta, StoryObj } from '@storybook/react';
import { RegisterCard } from './RegisterCard';

const meta = {
  title: 'Components/Auth/RegisterCard',
  component: RegisterCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RegisterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onRegisterSubmit: () => console.log('Register submitted'),
    onGoToLogin: () => console.log('Go to login'),
  },
};

export const FormValidation: Story = {
  args: {
    onRegisterSubmit: () => alert('Account created successfully!'),
    onGoToLogin: () => alert('Returning to login...'),
  },
};
