'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import { useAuth } from '@/components/shared/hooks/useAuth';



export const AuthButtons = () => {
  const { isAuthenticated } = useAuth();
  const [ isClient, setIsClient ] = useState( false );

  useEffect( () => {
    setIsClient( true );
  }, [] );

  if ( !isClient ) {
    return null;
  }

  return (
    <div>
      <SignedOut>
        <SignInButton>
          <button className="navbar__courses-link">
            INICIAR SESIÓN
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
};