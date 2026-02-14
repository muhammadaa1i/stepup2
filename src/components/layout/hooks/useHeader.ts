import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'

export const useHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const cartItemsCount = useSelector((state: RootState) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0) ?? 0
    )

    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated ?? false
    )

    const toggleMenu = () => setMenuOpen((prev) => !prev)

    return { menuOpen, toggleMenu, cartItemsCount, isAuthenticated }
}