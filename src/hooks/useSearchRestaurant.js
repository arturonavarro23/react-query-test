import { useQuery } from 'react-query';
import api from '../api';

const getRestaurants = async ({queryKey}) => {
  // eslint-disable-next-line no-unused-vars
  const [_ , searchTerm] = queryKey;
  const res = await api.get('/restaurants', {
    params: {
      name_like: searchTerm,
    },
  });
  return res.data;
};

export default (searchTerm) => {
  return useQuery({
    queryKey: ['searchRestaurant', searchTerm],
    queryFn: getRestaurants,
    enabled: !!searchTerm,
  });
};
