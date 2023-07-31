import { Box, Button, Switch } from "@chakra-ui/react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

export const DeactivateProduct = ({ productId, isDeleted}) => {
  const checkDeletedStatus = async (id) => {
    try {
      const response = await Axios.get(`http://localhost:8000/api/products/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isDeleted);
  const deactiveProduct = async (id) => {
    try {
      console.log(id);
      const response = await Axios.delete(`http://localhost:8000/api/products/${id}`);
      console.log(response);
    window.location.reload()
    }
    catch(error){

    }
  };

  return (
    <Box>
      <Switch
        isChecked={!isDeleted}
        defaultChecked 
        colorScheme={isDeleted ? "red" : "green"}
        onChange={() => deactiveProduct(productId)}
      />
    </Box>
  );
};
