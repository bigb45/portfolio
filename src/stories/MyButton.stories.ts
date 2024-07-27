import { Meta, StoryObj } from "@storybook/react";
import Button from "../app/desktop/components/Button";

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    state: "enabled",
    label: "what",
  },
};
