'use client';

import { useAuth as useClerkAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { JwtService } from '../services';





export const useAuth = () => {
  const { userId, isLoaded } = useClerkAuth();
  const [ isAuthenticating, setIsAuthenticating ] = useState<boolean>( false );

  useEffect( () => {
    const handleClerkAuth = async () => {
      if ( !isLoaded || isAuthenticating ) return;

      const token = JwtService.getStoredToken();

      if ( !token && userId ) {
        try {
          setIsAuthenticating( true );

          const userData = {
            id: userId,
            firstName: '',
            lastName: '',
            email: ''
          };

          const tokenData = await JwtService.createUserToken( userData );
          JwtService.storeToken( tokenData.token );
        } catch ( error ) {
          console.error( 'Authentication failed:', error );
        } finally {
          setIsAuthenticating( false );
        }
      } else if ( !userId && token ) {
        JwtService.removeToken();
      }
    };

    handleClerkAuth();
  }, [ userId, isLoaded, isAuthenticating ] );

  const isAuthenticated = !!JwtService.getStoredToken();

  return { isAuthenticated };
};