import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from "@chakra-ui/react"
import { DeleteCashier } from "./deleteCashier"
import React from "react"


export const CashierPopOver = ({selectedCashier,cashierName}) => {
    const initRef = React.useRef()

    return (
        <Popover initialFocusRef={initRef}>
            {({onClose})=>(
                <>
  <PopoverTrigger>
    <Button 
    bg={"red"}
    color={"white"}>Layoff</Button>
  </PopoverTrigger>
  <Portal>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>
        {`Are you sure want to layoff ${cashierName} ?`}
      </PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        <DeleteCashier
        cashierId={selectedCashier}/>
        <Button
        ref={initRef}
        onClick={onClose}>
            No
        </Button>
      </PopoverBody>
    </PopoverContent>
  </Portal>
    </>
    )}
</Popover>
    )
}