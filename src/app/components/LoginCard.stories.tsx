import type { Meta, StoryObj } from '@storybook/react';
import { LoginCard } from './LoginCard';

const meta = {
  title: 'Components/Auth/LoginCard',
  component: LoginCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onRegisterClick: () => console.log('Go to register'),
    onLoginClick: () => console.log('Login clicked'),
  },
};

export const WithCallbacks: Story = {
  args: {
    onRegisterClick: () => alert('Navigating to register...'),
    onLoginClick: () => alert('Login attempt'),
  },
};
