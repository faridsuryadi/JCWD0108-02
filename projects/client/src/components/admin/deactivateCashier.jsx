import { Box, Switch } from "@chakra-ui/react";
import Axios from "axios";

export const BanCashier = ({ cashierId, isBanned}) => {
    const banCashier = async (id) => {
    try {
      console.log(id);
      const response = await Axios.delete(`http://localhost:8000/api/users/${id}`);
      console.log(response);
      window.location.reload()
    }
    catch(error){

    }
  };

  return (
    <Box>
      <Switch
        isChecked={!isBanned}
        colorScheme={!isBanned ? "red" : "green"}
        onChange={() => banCashier(cashierId)}
      />
    </Box>
  );
};
