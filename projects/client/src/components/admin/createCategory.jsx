import React, { useState } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Heading,
  Center,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import Axios from 'axios';
import * as Yup from 'yup';
import { Form } from 'react-router-dom';
import { Formik } from 'formik';

const categorySchema = Yup.object().shape({
  Category: Yup.string().required('Category is required'),
});

export const CreateCategory = ({ onCloseModal }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/categories",
        {
          Category: values.Category,
        }
      );
      setSuccessMessage('Category added successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to add category');
      setSuccessMessage('');
    }
    // onCloseModal();
  };

  return (
    <Center>
      <Box>
        <Heading size="lg">Add Category</Heading>
        {successMessage && (
          <Box color="green" mt={2}>
            'Category added successfully!'
          </Box>
        )}
        <Formik
          initialValues={{
            Category: '',
          }}
          validationSchema={categorySchema}
          onSubmit={async (values) => {
            handleSubmit(values);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit} style={{ display: 'flex' }}>
              <Box flex="1" mr={8}>
                <FormControl id="Category" mt={4} isRequired>
                  <FormLabel>Category</FormLabel>
                  <Input type="text" name="Category" value={values.Category} onChange={handleChange} onBlur={handleBlur} />
                  {touched.Category && errors.Category && (
                    <Box color="red.500">{errors.Category}</Box>
                  )}
                </FormControl>

                <Button bg={"green"} color={'white'} _hover={{ bg: 'white', color: 'green', boxShadow: 'md' }} mt={6} type="submit">
                  Add Category
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        {errorMessage && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
      </Box>
    </Center>
  );
};

