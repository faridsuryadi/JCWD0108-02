import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Icon,
  Link
} from "@chakra-ui/react";
import { FaLock, FaPlus } from "react-icons/fa";
import * as Yup from "yup";
import Axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";

export const AddCashier = ({ onCloseModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const regisSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/users",
        {
          username: values.username,
          password: values.password,
          email: values.email,
        }
      );
      console.log(response);
      setIsSuccess(true);    
    } catch (error) {
      console.log(error);
    }
    

  };

  return (
    <Box>
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
        }}
        validationSchema={regisSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(props) => {
          return (
            <Flex
              as={Form}
              minH={"100vh"}
              align={"center"}
              justify={"center"}
              // bg={"green.50"}
            >
              <Stack
                spacing={8}
                mx={"auto"}
                maxW={"lg"}
                py={12}
                px={6}
                textAlign="center"
                transition="opacity 0.5s, transform 0.5s"
              >
                <Heading fontSize={"4xl"} color={"green.500"}>
                 Add a new cashier
                </Heading>
                {isSuccess && (
                <Text mt={4} color={"green"}>
                  Cashier added successfully!
                </Text>
                  )}
                <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                  <Stack spacing={4}>
                    <FormControl id="username" isRequired>
                      <FormLabel>Username</FormLabel>
                      <Field as={Input} name="username" type="text" placeholder="Enter your username" />
                    </FormControl>
                    <ErrorMessage style={{ color: "red" }} name="username" component="div" />

                    <FormControl id="email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Field as={Input} name="email" type="email" placeholder="Enter your email" />
                    </FormControl>
                    <ErrorMessage style={{ color: "red" }} name="email" component="div" />

                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <Field
                        as={Input}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <ErrorMessage style={{ color: "red" }} name="password" component="div" />

                    <Stack spacing={4} direction="row" align="center">
                      <Checkbox
                        colorScheme="green"
                        isChecked={showPassword}
                        onChange={handleShowPassword}
                      >
                        Show Password
                      </Checkbox>
                    </Stack>
                    <Button
                      bg={"green.400"}
                      color={"white"}
                      _hover={{
                        bg: "green.500",
                      }}
                      isDisabled={!props.dirty}
                      type="submit"
                    >
                      Add Cashier
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          );
        }}
      </Formik>
    </Box>
  );
};
