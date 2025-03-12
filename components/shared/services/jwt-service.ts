import { JwtUserPayload, JwtResponse, AuthError } from '@/interfaces';


export class JwtService {

  private static readonly TOKEN_KEY = 'token';

  static async createUserToken( userData: JwtUserPayload ): Promise<JwtResponse> {
    try {
      const response = await fetch( '/es/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( userData )
      } );

      if ( !response.ok ) {
        throw new Error( 'Token creation failed' );
      }

      const tokenData = await response.json();

      await this.validateTokenWithBackend( tokenData.token );

      return tokenData;
    } catch ( error ) {
      throw {
        message: 'Failed to create authentication token',
        statusCode: 500
      } as AuthError;
    }
  }

  static async validateTokenWithBackend( token: string ): Promise<void> {
    try {
      const backendUrl = `${ process.env.NEXT_PUBLIC_BACKEND }/api/auth/validate-token`;

      const response = await fetch( backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( { token } )
      } );

      if ( !response.ok ) {
        throw new Error( 'Token validation failed' );
      }
    } catch ( error ) {
      throw {
        message: 'Failed to validate token with backend',
        statusCode: 500
      } as AuthError;
    }
  }

  static getStoredToken(): string | null {
    if ( typeof window === 'undefined' ) return null;
    return localStorage.getItem( this.TOKEN_KEY );
  }

  static storeToken( token: string ): void {
    localStorage.setItem( this.TOKEN_KEY, token );
  }

  static removeToken(): void {
    localStorage.removeItem( this.TOKEN_KEY );
  }
}