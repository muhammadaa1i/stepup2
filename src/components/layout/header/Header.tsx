import SignInBtn from '@/components/ui/buttons/SignInBtn';
import './Header.scss'
import Account from '@/components/ui/icons/Account';
import Cart from '@/components/ui/icons/Cart';
import { useState } from 'react';

export default function Header() {
  // This comes from Redux store
  const cartItemsCount = 3;
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <header>
      <h2 className='name'>StepUp</h2>
      <input className='search' type="text" placeholder='Search' />

      <div className="box">
        <Cart itemCount={cartItemsCount} />
        {isAuthenticated && (
          <Account
            isVisible={isVisible}
            onToggle={() => setIsVisible(!isVisible)}
          />
        )}

        {!isAuthenticated && <SignInBtn />}
      </div>
    </header>
  );
}