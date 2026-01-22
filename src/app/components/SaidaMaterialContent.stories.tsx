import type { Meta, StoryObj } from '@storybook/react';
import { SaidaMaterialContent } from './SaidaMaterialContent';

const meta = {
  title: 'Components/Stock/SaidaMaterialContent',
  component: SaidaMaterialContent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SaidaMaterialContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SaidaMaterialContent />,
};

export const WithMotivo: Story = {
  render: () => <SaidaMaterialContent />,
};
