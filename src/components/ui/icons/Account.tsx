import { Avatar } from '@mantine/core';

type Props = {
  isVisible: boolean
  onToggle: () => void
}

export default function Account({ isVisible, onToggle }: Props) {
  return (
    <div onClick={onToggle}>
      <Avatar
        variant="light"
        radius="sm"
        size={36}
        color="rgba(0, 0, 0, 1)" />;
    </div>
  )

}