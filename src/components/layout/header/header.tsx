import SignInBtn from '@/components/ui/buttons/signInBtn';
import './header.scss'
import Account from '@/components/ui/icons/account';
import Cart from '@/components/ui/icons/cart';
import { useHeader } from '../hooks/useHeader';

export default function Header() {
  const { menuOpen, toggleMenu, cartItemsCount, isAuthenticated } = useHeader()

  return (
    <header>
      <h2 className='name'>StepUp</h2>
      <input className='search' type="text" placeholder='Search for products' />

      <div className="box">
        <Cart itemCount={cartItemsCount} />
        {isAuthenticated ? (
          <Account menuOpen={menuOpen} toggleMenu={toggleMenu} />
        ) : (
          <SignInBtn />
        )}
      </div>
    </header>
  )
}