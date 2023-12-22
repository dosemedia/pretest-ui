import type { Meta, StoryObj } from '@storybook/react';

import LandingPageProductCtaLink from './LandingPageProductCtaLink';

const meta: Meta<typeof LandingPageProductCtaLink> = {
  component: LandingPageProductCtaLink,
  argTypes: { onClick: { action: 'click' } }
};

export default meta;
type Story = StoryObj<typeof LandingPageProductCtaLink>;

const commonArgs = {
  data: {
    version: 1,
    productImageUrl: 'https://picsum.photos/id/25/300/300',
    pageBackgroundColor: '#440246',
    textColor: '#AC6FAE',
    title: 'This is the title',
    subtitle: 'This is the subtitle. It is **markdown** and can have all kinds of fun formatting.',
    linkButtonText: 'Buy Now',
    linkButtonUrl: 'https://orchard-insights.com',
    linkButtonBackgroundColor: '#2E6002',
    linkButtonTextColor: '#FFF6A2'
  }
}

export const Primary: Story = {
  args: {
    ...commonArgs,
  },
};
