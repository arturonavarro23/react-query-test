import React, { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import { resolver } from './validations';

const Form = ({ onSubmit, isLoading, clearValues, defaultValues = {} }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver,
    mode: 'all',
    shouldFocusError: false,
    defaultValues,
  });

  useEffect(() => {
    if (clearValues) {
      reset();
    }
  }, [clearValues, reset]);

  const onSubmitForm = (values) => {
    onSubmit(values);
  };

  return (
    <Box
      width={{ sm: '100%', md: '70%', lg: '50%' }}
      m={{ sm: '0 20px', lg: 0 }}
    >
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <FormControl isInvalid={Boolean(errors.name?.message)}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" name="name" type="text" ref={register} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={6} isInvalid={Boolean(errors.img?.message)}>
          <FormLabel htmlFor="image">Image Url</FormLabel>
          <Input id="image" name="img" type="text" ref={register} />
          <FormErrorMessage>{errors.img?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={6} isInvalid={Boolean(errors.address?.message)}>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input id="address" name="address" type="text" ref={register} />
          <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={6} isInvalid={Boolean(errors.raiting?.message)}>
          <FormLabel htmlFor="raiting">Raiting</FormLabel>
          <Input id="raiting" name="raiting" type="text" ref={register} />
          <FormErrorMessage>{errors.raiting?.message}</FormErrorMessage>
        </FormControl>
        <Button
          width={{ xs: 'full', lg: '200px' }}
          mt={4}
          type="submit"
          isDisabled={isLoading}
        >
          {Object.keys(defaultValues).length > 0 ? 'Update restaurant' : 'Add a Restaurant'}
        </Button>
      </form>
    </Box>
  );
};

export default Form;
