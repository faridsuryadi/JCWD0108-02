import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Box,
  Heading,
  Select,
  Center,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import Axios from 'axios';
import { Form } from 'react-router-dom';
import * as Yup from'yup'
import { Field, Formik } from 'formik';

const productSchema = Yup.object().shape({
  productName: Yup.string().required('Product Name is required'),
  productPrice: Yup.number()
    .typeError('Product Price must be a number')
    .required('Product Price is required')
    .min(0, 'Product Price must be greater than or equal to 0'),
  productDescription: Yup.string().required('Product Description is required'),
  CategoryId: Yup.string().required('Please select a category'),
  // productImage:Yup.mixed().required("Product Image is required")
});
export const CreateProduct = ({ onCloseModal }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [CategoryId, setCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => setCategory(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productDescription', productDescription);
    formData.append('CategoryId', CategoryId);
    if (productImage) formData.append('productImage', productImage);

    try {
      const response = await Axios.post('http://localhost:8000/api/products', formData);
      setSuccessMessage(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to add product');
      setSuccessMessage('');
    }
  };

  const getCategories = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Center >
    <Box>
      <Heading size="lg">Add Product</Heading>
      <Formik
        initialValues={{
          productName: '',
          productPrice: '',
          productDescription: '',
          CategoryId: '',
          // productImage:''
        }}
        validationSchema={productSchema}
        onSubmit={async (values) => {
          const formData = new FormData();
          formData.append('productName', values.productName);
          formData.append('productPrice', values.productPrice);
          formData.append('productDescription', values.productDescription);
          formData.append('CategoryId', values.CategoryId);
          if (productImage) formData.append('productImage', productImage);

          try {
            const response = await Axios.post('http://localhost:8000/api/products', formData);
            setSuccessMessage(response.data);
            setErrorMessage('');
          } catch (error) {
            setErrorMessage('Failed to add product');
            setSuccessMessage('');
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit} style={{ display: 'flex' }}>
            <Box flex="1" mr={8}>
              <FormControl id="productName" mt={4} isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input type="text" value={values.productName} onChange={handleChange} onBlur={handleBlur} />
                {touched.productName && errors.productName && (
                  <Box color="red.500">{errors.productName}</Box>
                )}
              </FormControl>

              <FormControl id="productPrice" mt={4} isRequired>
                <FormLabel>Product Price</FormLabel>
                <Input type="number" value={values.productPrice} onChange={handleChange} onBlur={handleBlur} />
                {touched.productPrice && errors.productPrice && (
                  <Box color="red.500">{errors.productPrice}</Box>
                )}
              </FormControl>

              <FormControl id="productDescription" mt={4} isRequired>
                <FormLabel>Product Description</FormLabel>
                <Textarea value={values.productDescription} onChange={handleChange} onBlur={handleBlur} />
                {touched.productDescription && errors.productDescription && (
                  <Box color="red.500">{errors.productDescription}</Box>
                )}
              </FormControl>
            </Box>

            <Box flex="1">
              <FormControl id="CategoryId" mt={4} isRequired>
                <FormLabel>Category</FormLabel>
                <Field as={Select} value={values.CategoryId} onChange={handleChange} placeholder="Select category">
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.Category}</option>
                  ))}
                </Field>
                {touched.CategoryId && errors.CategoryId && (
                  <Box color="red.500">{errors.CategoryId}</Box>
                )}
              </FormControl>

              <FormControl id="productImage" mt={4} isRequired>
                <FormLabel>Product Image</FormLabel>
                <Input type="file" onChange={(e) => setProductImage(e.target.files[0])} />
              {touched.productImage && errors.productImage && (
                  <Box color="red.500">{errors.productImage}</Box>
                )}
              </FormControl>

              <Button bg={"green"} color={'white'} _hover={{ bg: 'white', color: 'green', boxShadow: 'md' }} mt={6} type="submit">
                Add Product
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {successMessage && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}

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
