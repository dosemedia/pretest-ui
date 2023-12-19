import type { Meta, StoryObj } from '@storybook/react';

import LandingPageSimplePoll from './LandingPageSimplePoll';

const meta: Meta<typeof LandingPageSimplePoll> = {
  component: LandingPageSimplePoll,
  argTypes: { onSubmit: { action: 'submit' } }
};

export default meta;
type Story = StoryObj<typeof LandingPageSimplePoll>;

const commonArgs = {
  headerImageUrl: 'https://picsum.photos/id/56/600/300',
  pageBackgroundColor: '#C3D8F9',
  textColor: '#000000',
  questions: [
    {
      title: "Which of the products shown are you most interested in trying?\n\n(Select all that apply)",
      multipleChoice: true,
      options: [
        "Clear Deodorant Stick",
        "Skin Tone Matching Deodorant Stick",
        "Cream",
        "Underarm Patch",
        "Serum"
      ]
    },
    {
      title: "How much do you expect the deodorant shown to cost?",
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
  submitButtonTextColor: '#ffffff'
}

export const Primary: Story = {
  args: {
    ...commonArgs,
    submitWait: false,
    submitted: false,
    submitError: '',
    submittedText: 'Thank you for your feedback!'
  },
};

export const Wait: Story = {
  args: {
    ...commonArgs,
    submitWait: true,
    submitted: false,
    submitError: '',
    submittedText: 'Thank you for your feedback!'
  },
};

export const Error: Story = {
  args: {
    ...commonArgs,
    submitWait: false,
    submitted: false,
    submitError: 'Oopsies, something went wrong!',
    submittedText: 'Thank you for your feedback!'
  },
};

export const Submitted: Story = {
  args: {
    ...commonArgs,
    submitWait: true,
    submitted: true,
    submitError: '',
    submittedText: 'Thank you for your feedback!'
  },
};