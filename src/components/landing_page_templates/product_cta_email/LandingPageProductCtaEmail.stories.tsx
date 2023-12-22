import type { Meta, StoryObj } from '@storybook/react';

import LandingPageProductCtaEmail from './LandingPageProductCtaEmail';

const meta: Meta<typeof LandingPageProductCtaEmail> = {
  component: LandingPageProductCtaEmail,
  argTypes: { onSubmit: { action: 'submit' } }
};

export default meta;
type Story = StoryObj<typeof LandingPageProductCtaEmail>;

const commonArgs = {
  data: {
    version: 1,
    productImageUrl: 'https://picsum.photos/id/25/300/300',
    pageBackgroundColor: '#440246',
    textColor: '#AC6FAE',
    title: 'This is the title',
    subtitle: 'This is the subtitle. It is **markdown** and can have all kinds of fun formatting.',
    submitButtonText: 'Subscribe',
    submitButtonBackgroundColor: '#2E6002',
    submitButtonTextColor: '#FFF6A2',
    submittedText: 'Thank you for your submission!'
  }
}

export const Primary: Story = {
  args: {
    ...commonArgs,
    submitWait: false,
    submitted: false,
    submitError: ''
  },
};

export const Wait: Story = {
  args: {
    ...commonArgs,
    submitWait: true,
    submitted: false,
    submitError: ''
  },
};

export const Error: Story = {
  args: {
    ...commonArgs,
    submitWait: false,
    submitted: false,
    submitError: 'Oopsies, something went wrong!'
  },
};

export const Submitted: Story = {
  args: {
    ...commonArgs,
    submitWait: true,
    submitted: true,
    submitError: ''
  },
};