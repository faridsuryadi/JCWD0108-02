// PaginationControls.js
import React from 'react';
import { Button, Text } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export const PaginationControls = ({ currentPage, totalPage, handlePageChange }) => {
  return (
    <Text fontSize="sm" display="flex" justifyContent="center" alignItems="center">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        mr={2}
        size="sm"
        bg={"green"}
      >
        <ArrowBackIcon color={"white"}></ArrowBackIcon>
      </Button>
      Page {currentPage} of {totalPage}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage >= totalPage}
        ml={2}
        size="sm"
        bg={"green"}
      >
        <ArrowForwardIcon color={"white"}></ArrowForwardIcon>
      </Button>
    </Text>
  );
};

