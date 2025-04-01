import { useQuery } from '@tanstack/react-query';

import { getCategories } from '../services';


export const useGetCategories = () => {

  const { isLoading, isFetching, isError, error, data: categories, } = useQuery( {
    queryKey: [ 'categories' ],
    queryFn: () => getCategories()
  } );

  return {
    isLoading,
    isFetching,
    isError,
    error,
    categories
  };
};
