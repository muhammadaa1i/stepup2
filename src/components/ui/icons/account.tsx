import { ActionIcon, Menu } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

type Props = {
  menuOpen: boolean
  toggleMenu: () => void
}

export default function AccountMenu({ menuOpen, toggleMenu }: Props) {
  return (
    <Menu opened={menuOpen} onChange={toggleMenu} position="bottom-end">
      <Menu.Target>
        <ActionIcon
          variant="light"
          radius="sm"
          size={36}
          color="#000"
          style={{ cursor: 'pointer' }}
          aria-label="Account menu"
        >
          <IconUser style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Orders</Menu.Item>
        <Menu.Item color="red">Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
