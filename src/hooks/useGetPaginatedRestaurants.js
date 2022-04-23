import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import api from '../api';

const LIMIT = 4;

const getRestaurants = async ({queryKey}) => {
  // eslint-disable-next-line no-unused-vars
  const [_, page] = queryKey;
  const { data, headers } = await api.get('/restaurants', {
    params: {
      _page: page,
      _limit: LIMIT,
    },
  });

  return {
    restaurants: data,
    total: headers['x-total-count'],
    pagination: {
      prev: page > 1 ? page - 1 : null,
      current: page,
      next: LIMIT * page < headers['x-total-count'] ? page + 1 : null,
      pages: Math.ceil(headers['x-total-count'] / LIMIT),
    },
  };
};

export const useGetPaginatedRestaurants = (page = 0) => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useQuery({
    queryKey: ['paginated-restautrants', page],
    queryFn: getRestaurants,
    params: {
      page,
    },
  });

  React.useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(['paginated-restautrants', page + 1], getRestaurants);
    }
  }, [data, page, queryClient]);

  return {
    data,
    ...rest,
  };
};

export default useGetPaginatedRestaurants;
