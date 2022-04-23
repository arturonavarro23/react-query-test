import { useQuery } from 'react-query';
import api from '../api';

const getRestaurants = async () => {
  const res = await api.get('/restaurants');
  return res.data;
};

export default () => {
  return useQuery({
    queryKey: 'restaurants',
    queryFn: getRestaurants,
  });
};
