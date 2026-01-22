import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';
import { DashboardContent } from './DashboardContent';

const meta = {
  title: 'Components/Layout/DashboardLayout',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLogout: () => console.log('Logged out'),
    onMenuChange: (menuId) => console.log('Menu changed to:', menuId),
    children: <DashboardContent onNavigate={() => {}} />,
  },
};

export const WithChildren: Story = {
  args: {
    onLogout: () => alert('User logged out'),
    onMenuChange: (menuId) => alert(`Navigating to ${menuId}`),
    children: <div className="p-8">Conteúdo customizado aqui</div>,
  },
};
