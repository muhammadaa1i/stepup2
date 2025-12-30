import { Avatar, Menu } from '@mantine/core';

type Props = {
  menuOpen: boolean
  toggleMenu: () => void
}

export default function AccountMenu({ menuOpen, toggleMenu }: Props) {
  return (
    <Menu opened={menuOpen} onChange={toggleMenu} position="bottom-end">
      <Menu.Target>
        <Avatar
          variant="light"
          radius="sm"
          size={36}
          style={{ cursor: 'pointer' }}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Orders</Menu.Item>
        <Menu.Item color="red">Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
