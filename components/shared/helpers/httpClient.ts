const API_URL = process.env.NEXT_PUBLIC_BACKEND;

const getToken = () => {
  if ( typeof window !== 'undefined' ) {
    return localStorage.getItem( 'token' );
  }
  return null;
};

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${ getToken() }`
};

export const request = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  data?: unknown
): Promise<T> => {
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

    return res.status !== 204 ? await res.json() : ( {} as T );
  } catch ( error ) {
    throw new Error( error instanceof Error ? error.message : 'Network error' );
  }
};