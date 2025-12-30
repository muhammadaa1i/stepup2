import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function SignInBtn() {
  return (
    <Button size="sm" variant="filled" component={Link} to="/login">
      Sign in
    </Button>
  );
}