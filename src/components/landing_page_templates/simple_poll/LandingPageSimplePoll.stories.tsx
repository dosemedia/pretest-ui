import type { Meta, StoryObj } from '@storybook/react';

import LandingPageSimplePoll from './LandingPageSimplePoll';

const meta: Meta<typeof LandingPageSimplePoll> = {
  component: LandingPageSimplePoll,
  argTypes: { onSubmit: { action: 'submit' } }
};

export default meta;
type Story = StoryObj<typeof LandingPageSimplePoll>;

const commonArgs = {
  data: {
    version: 1,
    headerImageUrl: 'https://picsum.photos/id/63/600/300',
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
      },
      {
        title: "How much do you expect the product shown to cost?",
        multipleChoice: false,
        options: [
          "$5-10",
          "$10-15",
          "$15-20",
          "$20+"
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