import type { Meta, StoryObj } from '@storybook/react';

import LandingPageSimplePollForm from './LandingPageSimplePollForm';

const meta: Meta<typeof LandingPageSimplePollForm> = {
  component: LandingPageSimplePollForm,
  argTypes: { onChange: { action: 'change' } }
};

export default meta;
type Story = StoryObj<typeof LandingPageSimplePollForm>;

const commonData = {
  version: 1,
  headerImageUrl: '',
  pageBackgroundColor: '',
  textColor: '',
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
  ],
  submitButtonText: '',
  submitButtonBackgroundColor: '',
  submitButtonTextColor: '',
  submittedText: ''
}

export const Default: Story = {
  args: {
    data: commonData
  },
};

export const NoQuestions: Story = {
  args: {
    data: {
      ...commonData,
      questions: []
    }
  },
};

export const NoOptions: Story = {
  args: {
    data: {
      ...commonData,
      questions: [
        {
          title: "Which of the products shown are you most interested in trying?\n\n(Select all that apply)",
          multipleChoice: true,
          options: []
        },
      ],
    }
  },
};
