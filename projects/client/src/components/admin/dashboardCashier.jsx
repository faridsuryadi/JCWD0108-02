import { useState } from "react";
import { AddCashier } from "./createCashier"
import { AddCahierButton } from "./addCashierButton";
import { Box } from "@chakra-ui/react";




export const DashboardCashier = () => {

    return(
        <Box>
        <AddCahierButton/>
        </Box>
    )
}