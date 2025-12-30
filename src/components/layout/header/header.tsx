import SignInBtn from '@/components/ui/buttons/signInBtn';
import './header.scss'
import Account from '@/components/ui/icons/account';
import Cart from '@/components/ui/icons/cart';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export default function Header() { 
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  )

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <header>
      <h2 className='name'>StepUp</h2>
      <input className='search' type="text" placeholder='Search' />

      <div className="box">
        <Cart itemCount={cartItemsCount} />
        {isAuthenticated ? (
          <Account menuOpen={menuOpen} toggleMenu={toggleMenu} />
        ) : (
          <SignInBtn  />
        )}
      </div>
    </header>
  );
}