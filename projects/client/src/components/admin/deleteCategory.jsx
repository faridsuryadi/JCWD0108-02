import { Box, Button, Switch, usePopoverContext } from "@chakra-ui/react";
import Axios from "axios";

export const DeleteCategory = ({categoryId}) => {
    const deleteCategory = async (id) => {
    try {
      console.log(id);
      const response = await Axios.delete(`http://localhost:8000/api/categories/${id}`);
      console.log(response);
      window.location.reload()
    }
    catch(error){

    }
  };
  

  return (
    <>
      <Button
        onClick={() => deleteCategory(categoryId)}
      >
        Yes
      </Button>
      
    </>
  );
};
