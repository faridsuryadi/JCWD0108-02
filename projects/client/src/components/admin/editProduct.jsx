import React, { useState, useEffect } from 'react';
import { Button, Stack, Select, Input, Text } from '@chakra-ui/react';
import Axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const editProductSchema = Yup.object().shape({
  productName: Yup.string().required('Product Name is required'),
  productPrice: Yup.number().typeError('Product Price must be a number').required('Product Price is required').min(0, 'Product Price must be greater than or equal to 0'),
  productDescription: Yup.string().required('Product Description is required'),
  selectedCategory: Yup.string().required('Please select a category'),
});

export const EditProduct = ({ product, onSave, categories }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    
    formik.setValues({
      productName: product.productName,
      productPrice: product.productPrice,
      productDescription: product.productDescription,
      selectedCategory: product.selectedCategory || product.CategoryId, 
    });
  }, [product, categories]);

  const handleToggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const handleFieldChange = (e, field) => {
    if (field === 'productImage') {
      setSelectedImage(e.target.files[0]);
    } else {
      formik.handleChange(e);
    }
  };

  const handleSave = async () => {
    if (!formik.dirty) {
      setEditMode(false);
      return;
    }

    try {
      const updatedProduct = {
        ...formik.values,
        productPrice: parseFloat(formik.values.productPrice),
        CategoryId: formik.values.selectedCategory,
      };

      if (selectedImage) {
        const formData = new FormData();
        formData.append('productImage', selectedImage);

        await Axios.patch(`http://localhost:8000/api/products/${product.id}`, formData);
      }

      await Axios.patch(`http://localhost:8000/api/products/${product.id}`, updatedProduct);
      onSave(updatedProduct);

      setEditMode(false);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      productDescription: '',
      selectedCategory: '',
    },
    validationSchema: editProductSchema,
    onSubmit: handleSave,
  });

  return (
    <Stack spacing={4} borderWidth="1px" borderRadius="md" p={4}>
      <Input
        type="text"
        name="productName"
        value={formik.values.productName}
        placeholder="Product Name"
        disabled={!editMode}
        onChange={(e) => handleFieldChange(e, 'productName')}
      />
      {formik.touched.productName && formik.errors.productName ? (
        <Text color="red.500">{formik.errors.productName}</Text>
      ) : null}

      <Input
        type="text"
        name="productPrice"
        value={formik.values.productPrice}
        placeholder="Product Price"
        disabled={!editMode}
        onChange={(e) => handleFieldChange(e, 'productPrice')}
      />
      {formik.touched.productPrice && formik.errors.productPrice ? (
        <Text color="red.500">{formik.errors.productPrice}</Text>
      ) : null}

      <Input
        name="productDescription"
        value={formik.values.productDescription}
        placeholder="Product Description"
        disabled={!editMode}
        onChange={(e) => handleFieldChange(e, 'productDescription')}
      />
      {formik.touched.productDescription && formik.errors.productDescription ? (
        <Text color="red.500">{formik.errors.productDescription}</Text>
      ) : null}

      <Input
        type="file"
        name="productImage"
        onChange={(e) => handleFieldChange(e, 'productImage')}
        disabled={!editMode}
      />

      <Select
        name="selectedCategory"
        value={formik.values.selectedCategory}
        defaultValue={categories[0].id}
        onChange={(e) => handleFieldChange(e, 'selectedCategory')}
        disabled={!editMode}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.Category}
          </option>
        ))}
      </Select>
      {formik.touched.selectedCategory && formik.errors.selectedCategory ? (
        <Text color="red.500">{formik.errors.selectedCategory}</Text>
      ) : null}

      {editMode ? (
        <Button colorScheme="blue" onClick={formik.handleSubmit}>
          Save Changes
        </Button>
      ) : (
        <Button colorScheme="green" onClick={handleToggleEditMode}>
          Edit
        </Button>
      )}
    </Stack>
  );
};
