import { useMutation, useQueryClient } from 'react-query';
import api from '../api';

const createRestaurant = async (restaurant) => {
  const res = await api.post('/restaurants', restaurant);
  return res.data;
};

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation(createRestaurant, {
    onSuccess: () => {
      queryClient.invalidateQueries('restaurants');
      queryClient.invalidateQueries('paginated-restautrants');
    },
  });
};

export default useCreateRestaurant;
