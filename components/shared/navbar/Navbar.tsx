"use client";
import Link from 'next/link';

import {  NavbarActions } from './components';
import { LogoSvg } from '../ui/svg';
import { useNavbarScroll } from './hooks';


export const Navbar = () => {

  const isScrolled = useNavbarScroll();

  return (
    <nav className={ `navbar ${ isScrolled ? 'navbar--scrolled' : '' }` }>
      <div className="navbar__container">

        <Link href="/" className="navbar__logo">
          <LogoSvg />
        </Link>

        <NavbarActions />

      </div>
    </nav>
  );
};