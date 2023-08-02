import React, { useState, useEffect } from 'react';
import { Button, Stack, Input, Text, Alert, AlertIcon } from '@chakra-ui/react';
import Axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ChangeProfilePicture } from '../imgProfle';

const editCashierSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phone: Yup.string().required('Phone is required'),
  address: Yup.string().required('Address is required'),
});

export const EditCashier = ({ cashier, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    formik.setValues({
      username: cashier.username,
      email: cashier.email,
      firstName: cashier.firstName,
      lastName: cashier.lastName,
      phone: cashier.phone,
      address: cashier.address,
    });
  }, [cashier]);

  const handleToggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const handleSave = async () => {
    if (!formik.dirty) {
      setEditMode(false);
      return;
    }

    try {
      const updatedCashier = { ...formik.values };

      await Axios.patch(`http://localhost:8000/api/users/${cashier.id}`, updatedCashier);

      setEditMode(false);
      setShowSuccessAlert(true); // Show the success alert
      // Hide the success alert after a few seconds
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (error) {
        console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
    },
    validationSchema: editCashierSchema,
    onSubmit: handleSave,
  });

  return (
    <Stack spacing={4} borderWidth="1px" borderRadius="md" p={4}>
      {showSuccessAlert && (
        <Alert status="success" variant="solid">
          <AlertIcon />
          Cashier updated successfully!
        </Alert>
      )}

      <Input
        type="text"
        name="username"
        value={formik.values.username}
        placeholder="Username"
        disabled={!editMode}
        onChange={formik.handleChange}
      />
      {formik.touched.username && formik.errors.username ? (
        <Text color="red.500">{formik.errors.username}</Text>
      ) : null}

      <Input
        type="email"
        name="email"
        value={formik.values.email}
        placeholder="Email"
        disabled={!editMode}
        onChange={formik.handleChange}
      />
      {formik.touched.email && formik.errors.email ? (
        <Text color="red.500">{formik.errors.email}</Text>
      ) : null}

      <Input
        type="text"
        name="firstName"
        value={formik.values.firstName}
        placeholder="First Name"
        disabled={!editMode}
        onChange={formik.handleChange}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <Text color="red.500">{formik.errors.firstName}</Text>
      ) : null}

      <Input
        type="text"
        name="lastName"
        value={formik.values.lastName}
        placeholder="Last Name"
        disabled={!editMode}
        onChange={formik.handleChange}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <Text color="red.500">{formik.errors.lastName}</Text>
      ) : null}

      <Input
        type="text"
        name="phone"
        value={formik.values.phone}
        placeholder="Phone"
        disabled={!editMode}
        onChange={formik.handleChange}
      />
      {formik.touched.phone && formik.errors.phone ? (
        <Text color="red.500">{formik.errors.phone}</Text>
      ) : null}

      <Input
        type="text"
        name="address"
        value={formik.values.address}
        placeholder="Address"
        disabled={!editMode}
        onChange={formik.handleChange}
      />
      {formik.touched.address && formik.errors.address ? (
        <Text color="red.500">{formik.errors.address}</Text>
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
        <ChangeProfilePicture/>
    </Stack>
  );
};
