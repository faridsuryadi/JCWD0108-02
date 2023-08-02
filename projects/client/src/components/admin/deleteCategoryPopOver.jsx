import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from "@chakra-ui/react"
import React from "react"
import { DeleteCategory } from "./deleteCategory"
import {DeleteIcon } from "@chakra-ui/icons"



export const CategoryPopOver = ({selectedCategory,categoryName}) => {
    const initRef = React.useRef()

    return (
        <Popover initialFocusRef={initRef}>
            {({onClose})=>(
                <>
  <PopoverTrigger>
    <Button bg={"transparent"}>
    <DeleteIcon color="red"></DeleteIcon>
    </Button>
  </PopoverTrigger>
  <Portal>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>
        {`Are you sure want to delete ${categoryName} ?`}
      </PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        <DeleteCategory
        categoryId={selectedCategory}/>
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