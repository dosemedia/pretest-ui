import type { Meta, StoryObj } from '@storybook/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LandingPageProductCtaEmailForm from './LandingPageProductCtaEmailForm';

const meta: Meta<typeof LandingPageProductCtaEmailForm> = {
  component: LandingPageProductCtaEmailForm,
  argTypes: { onChange: { action: 'change' } }
};

export default meta;
type Story = StoryObj<typeof LandingPageProductCtaEmailForm>;

const commonData = {
  version: 1,
  productImageUrl: '',
  pageBackgroundColor: '',
  title: '',
  subtitle: '',
  textColor: '',
  submitButtonText: '',
  submitButtonBackgroundColor: '',
  submitButtonTextColor: '',
  submittedText: ''
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
