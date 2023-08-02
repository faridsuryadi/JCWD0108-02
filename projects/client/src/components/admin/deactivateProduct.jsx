import { Box, Switch } from "@chakra-ui/react";
import Axios from "axios";

export const DeactivateProduct = ({ productId, isDeleted}) => {
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
