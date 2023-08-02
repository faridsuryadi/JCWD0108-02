import { Box, Button, Switch, usePopoverContext } from "@chakra-ui/react";
import Axios from "axios";
import { useContext } from "react";

export const DeleteCashier = ({ cashierId}) => {
    const deleteCashier = async (id) => {
    try {
      console.log(id);
      const response = await Axios.put(`http://localhost:8000/api/users/${id}`);
      console.log(response);
    }
    catch(error){

    }
  };
  

  return (
    <>
      <Button
        onClick={() => deleteCashier(cashierId)}
      >
        Yes
      </Button>
      
    </>
  );
};
