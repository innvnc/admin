const API_URL = process.env.NEXT_PUBLIC_BACKEND;

const getToken = () => {
  if ( typeof window !== 'undefined' ) {
    return localStorage.getItem( 'token' );
  }
  return null;
};

export const request = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  data?: unknown
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ getToken() }`
  };

  try {
    const res = await fetch( `${ API_URL }${ endpoint }`, {
      body: data ? JSON.stringify( data ) : undefined,
      headers,
      method
    } );

    if ( !res.ok ) {
      const errorData = await res.text();
      throw new Error( errorData || 'Request error' );
    }

    if ( res.status === 204 ) {
      return {} as T;
    }

    const textResponse = await res.text();

    return textResponse ? JSON.parse( textResponse ) : ( {} as T );
  } catch ( error ) {
    throw new Error( error instanceof Error ? error.message : 'Network error' );
  }
};