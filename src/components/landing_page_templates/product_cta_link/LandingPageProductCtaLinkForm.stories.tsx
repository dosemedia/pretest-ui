import type { Meta, StoryObj } from '@storybook/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LandingPageProductCtaLinkForm from './LandingPageProductCtaLinkForm';

const meta: Meta<typeof LandingPageProductCtaLinkForm> = {
  component: LandingPageProductCtaLinkForm,
  argTypes: { onChange: { action: 'change' } }
};

export default meta;
type Story = StoryObj<typeof LandingPageProductCtaLinkForm>;

const commonData = {
  version: 1,
  productImageUrl: '',
  pageBackgroundColor: '',
  title: '',
  subtitle: '',
  textColor: '',
  linkButtonText: '',
  linkButtonUrl: '',
  linkButtonBackgroundColor: '',
  linkButtonTextColor: ''
}

const queryClient = new QueryClient()
const decorators = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Story: any) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
];

export const Default: Story = {
  args: {
    data: commonData
  },
  decorators
};
