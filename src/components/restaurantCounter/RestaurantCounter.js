import React from 'react';
import { Heading } from '@chakra-ui/core';

import { useQueryParams } from '../../hooks/useQueryParams';
import { useGetPaginatedRestaurants } from '../../hooks/useGetPaginatedRestaurants';

const RestaurantCounter = () => {
  const { page = 1 } = useQueryParams();
  const { resolvedData } = useGetPaginatedRestaurants(page);
  return (
    <Heading as="h6" textAlign="center" fontSize="1.2em">
      Total Restaurants: {resolvedData?.total || 0}
    </Heading>
  );
};

export default RestaurantCounter;
