import React from 'react';
import { FormLabel, FormControl, Input, Box, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

import useSearchRestaurant from '../../hooks/useSearchRestaurant';
import { useDebouncedTerm } from '../../hooks/useDebouncedTerm';

const SearchByName = () => {
  const [term, debouncedTerm, setTerm] = useDebouncedTerm();
  const { data } = useSearchRestaurant(debouncedTerm);

  return (
    <>
      <FormControl mt="20px">
        <FormLabel>Search by name:</FormLabel>
        <Input
          name="name"
          type="text"
          onChange={(e) => setTerm(e.target.value)}
          autoComplete="off"
          value={term}
        />
      </FormControl>
      {data &&
        data.map((r) => (
          <Box key={r.id} mt="5px">
            <Text as={Link} to={`/restaurants/${r.id}`}>
              {r.name}
            </Text>
          </Box>
        ))}
    </>
  );
};

export default SearchByName;
