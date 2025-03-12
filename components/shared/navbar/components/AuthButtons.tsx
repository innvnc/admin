'use client';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

import { useAuth } from '../../hooks';


export const AuthButtons = () => {

  useAuth();

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
        <UserButton />
      </SignedIn>
    </div>
  );
};