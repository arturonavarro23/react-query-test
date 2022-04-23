import { useMutation, useQueryClient } from 'react-query';
import api from '../api';

const updateRestaurant = async (restaurant) => {
  const res = await api.put(`/restaurants/${restaurant.id}`, restaurant);
  return res.data;
};

export default () => {
  const queryClient = useQueryClient();

  return useMutation(updateRestaurant, {
    onMutate: (newRestaurant) => {
      queryClient.cancelQueries(['restaurants', newRestaurant.id.toString()]);

      const previousRestaurant = queryClient.getQueryData([
        'restaurants',
        newRestaurant?.id?.toString(),
      ]);

      queryClient.setQueryData(['restaurants', newRestaurant?.id?.toString()], newRestaurant);

      return () => {
        queryClient.setQueryData(
          ['restaurants', newRestaurant?.id?.toString()],
          previousRestaurant
        );
      };
    },
    onError: (err, newRestaurant, rollback) => rollback(),
    onSettled: (newRestaurant) => {
      queryClient.invalidateQueries(['restaurants', newRestaurant?.id?.toString()]);
    },
  });
};
