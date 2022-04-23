import { useQuery } from 'react-query';
import api from '../api';

const getRestaurantById = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, id] = queryKey;
  const res = await api.get(`restaurants/${id}`);
  return res.data;
};

export default (id) => {
  return useQuery({
    queryKey:['restaurants', id],
    queryFn: getRestaurantById,
  });
};
