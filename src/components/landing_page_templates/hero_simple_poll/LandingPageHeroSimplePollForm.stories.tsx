import type { Meta, StoryObj } from '@storybook/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LandingPageHeroSimplePollForm from './LandingPageHeroSimplePollForm';

const meta: Meta<typeof LandingPageHeroSimplePollForm> = {
  component: LandingPageHeroSimplePollForm,
  argTypes: { onChange: { action: 'change' } }
};

export default meta;
type Story = StoryObj<typeof LandingPageHeroSimplePollForm>;

const commonData = {
  version: 1,
  headerImageUrl: '',
  headerTitle: '',
  headerSubtitle: '',
  headerBackgroundColor: '',
  headerTextColor: '',
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

export const NoQuestions: Story = {
  args: {
    data: {
      ...commonData,
      questions: []
    }
  },
  decorators
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
  decorators
};


