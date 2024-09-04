import React from 'react';
import { BsFillPencilFill } from 'react-icons/bs';

import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
// import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="p-2 flex justify-between border-b border-gray-300">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products" style={{ textDecoration: 'none', color: 'black' }}>
          Products
        </Link>
        {user && (
          <Link to="/carts">
            <CartStatus />
          </Link>
        )}
        {/*  admin user */}
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}

        {user && <User user={user} />}
        {!user && <Button onClick={login} text={'Login'} />}
        {user && <Button onClick={logout} text={'Logout'} />}
      </nav>
    </header>
  );
}
