'use client';

import { JwtUserPayload } from '../../../interfaces/auth-types';



export class JwtService {
  private static readonly TOKEN_KEY = 'token';

  static async createUserToken( userData: JwtUserPayload ): Promise<{ token: string; expiresIn: number; }> {
    try {
      const response = await fetch( '/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( userData ),
      } );

      if ( !response.ok ) {
        throw new Error( 'Failed to generate token' );
      }

      return await response.json();
    } catch ( error ) {
      console.error( 'Error creating user token:', error );
      throw error;
    }
  }

  static storeToken( token: string ): void {
    if ( typeof window !== 'undefined' ) {
      localStorage.setItem( this.TOKEN_KEY, token );
      window.dispatchEvent( new Event( 'storage' ) );
    }
  }

  static getStoredToken(): string | null {
    if ( typeof window !== 'undefined' ) {
      return localStorage.getItem( this.TOKEN_KEY );
    }
    return null;
  }

  static removeToken(): void {
    if ( typeof window !== 'undefined' ) {
      localStorage.removeItem( this.TOKEN_KEY );
      window.dispatchEvent( new Event( 'storage' ) );
    }
  }

  static isTokenValid(): boolean {
    return !!this.getStoredToken();
  }
}