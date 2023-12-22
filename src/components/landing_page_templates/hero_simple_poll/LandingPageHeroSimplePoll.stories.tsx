import type { Meta, StoryObj } from '@storybook/react';

import LandingPageHeroSimplePoll from './LandingPageHeroSimplePoll';

const meta: Meta<typeof LandingPageHeroSimplePoll> = {
  component: LandingPageHeroSimplePoll,
  argTypes: { onSubmit: { action: 'submit' } }
};

export default meta;
type Story = StoryObj<typeof LandingPageHeroSimplePoll>;

const commonArgs = {
  data: {
    version: 1,
    headerImageUrl: 'https://picsum.photos/id/63/600/400',
    headerTitle: 'This is the header',
    headerSubtitle: 'You can type all kinds of stuff down here (**in markdown format!**). Isn\'t that cool? Just type all day long. I wonder how long this can go on for. I guess we\'ll find out.',
    headerBackgroundColor: '#ea202c',
    headerTextColor: '#ffffff',
    pageBackgroundColor: '#ffd6ca',
    textColor: '#000000',
    questions: [
      {
        title: "Which of the products shown are you most interested in trying?\n\n(Select all that apply)",
        multipleChoice: true,
        options: [
          "Widget Blaster",
          "Super Thingy",
          "That Stuff",
          "Mystery Item",
          "Hidden Gem"
        ]
      }
    ],
    submitButtonText: 'Submit',
    submitButtonBackgroundColor: '#000000',
    submitButtonTextColor: '#ffffff',
    submittedText: 'Thank you for your feedback!'
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