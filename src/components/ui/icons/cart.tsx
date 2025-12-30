import { ActionIcon, Indicator } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';

interface CartProps {
  itemCount?: number;
}

export default function Cart({ itemCount = 0 }: CartProps) {
  return (
    <Indicator inline label={itemCount} size={16} disabled={itemCount === 0}>
      <ActionIcon variant="light" radius="sm" size="36" color="rgba(0, 0, 0, 5)">
        <IconShoppingCart style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Indicator>
  );
}
