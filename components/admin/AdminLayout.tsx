'use client';

import { useEffect, useState } from 'react';
import { JwtService } from '../shared/services';




export const AdminLayout = () => {
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>( false );
  const [ isLoading, setIsLoading ] = useState<boolean>( true );

  useEffect( () => {
    const checkToken = () => {
      const token = JwtService.getStoredToken();
      setIsAuthenticated( !!token );
      setIsLoading( false );
    };

    checkToken();

    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener( 'storage', handleStorageChange );

    return () => {
      window.removeEventListener( 'storage', handleStorageChange );
    };
  }, [] );

  if ( isLoading ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-2xl">Cargando...</div>
      </div>
    );
  }

  if ( !isAuthenticated ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-red-100 p-8 text-center shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-red-700">Acceso Denegado</h2>
          <p className="text-lg text-red-600">Debe iniciar sesión para acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  return (
    <div>AdminLayout</div>
  );
};