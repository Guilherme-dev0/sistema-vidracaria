import type { Meta, StoryObj } from '@storybook/react';
import { EntradaMaterialContent } from './EntradaMaterialContent';

const meta = {
  title: 'Components/Stock/EntradaMaterialContent',
  component: EntradaMaterialContent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EntradaMaterialContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <EntradaMaterialContent />,
};

export const WithData: Story = {
  render: () => <EntradaMaterialContent />,
};
