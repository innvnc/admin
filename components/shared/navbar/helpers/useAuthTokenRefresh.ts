"use client";

import { useEffect, useRef, useState } from "react";

import { JwtService } from "../../services";

export const useAuthTokenRefresh = () => {
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>( false );
  const [ isClient, setIsClient ] = useState<boolean>( false );

  const intervalRef = useRef<number | undefined>( undefined );
  const isRefreshingRef = useRef<boolean>( false );

  const clearRefreshInterval = () => {
    if ( intervalRef.current !== undefined ) {
      clearInterval( intervalRef.current );
      intervalRef.current = undefined;
    }
  };

  const refreshToken = async () => {
    if ( isRefreshingRef.current ) return;

    const token = JwtService.getStoredToken();

    if ( !token ) {
      clearRefreshInterval();
      setIsAuthenticated( false );
      return;
    }

    try {
      isRefreshingRef.current = true;
      await JwtService.validateTokenWithBackend( token );
      setIsAuthenticated( true );
    } catch {
      JwtService.removeToken();
      clearRefreshInterval();
      setIsAuthenticated( false );
    } finally {
      isRefreshingRef.current = false;
    }
  };

  const startRefreshInterval = () => {
    clearRefreshInterval();
    intervalRef.current = window.setInterval( () => {
      refreshToken();
    }, 5 * 60 * 1000 );
  };

  useEffect( () => {
    setIsClient( true );

    const token = JwtService.getStoredToken();

    setIsAuthenticated( !!token );

    if ( token ) {
      refreshToken();
      startRefreshInterval();
    }

    const handleStorageChange = () => {
      const current = JwtService.getStoredToken();

      setIsAuthenticated( !!current );

      if ( current ) {
        refreshToken();
        startRefreshInterval();
      } else {
        clearRefreshInterval();
      }
    };

    const handleVisibility = () => {
      if ( document.visibilityState === "visible" ) {
        refreshToken();
      }
    };

    window.addEventListener( "storage", handleStorageChange );
    document.addEventListener( "visibilitychange", handleVisibility );

    return () => {
      window.removeEventListener( "storage", handleStorageChange );
      document.removeEventListener( "visibilitychange", handleVisibility );
      clearRefreshInterval();
    };
  }, [] );

  return {
    isAuthenticated,
    isClient,
  };
};
