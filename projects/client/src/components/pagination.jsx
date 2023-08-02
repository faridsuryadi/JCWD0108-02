import React, { useEffect, useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';

export const PaginationControls = ({ totalPage, handlePageChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentPageFromURL = () => {
    const params = new URLSearchParams(location.search);
    const currentPage = parseInt(params.get('page'), 10) || 1;
    return currentPage;
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPageFromURL());

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('page', currentPage);
    const currentPathname = location.pathname;
    const newURL = `${currentPathname}?${params.toString()}`;
    navigate(newURL, { replace: false });
  }, [currentPage, location, navigate]); 
  

  const handlePageChangeWithSync = (newPage) => {
    setCurrentPage(newPage);
    handlePageChange(newPage);
  };

  return (
    <Text fontSize="sm" display="flex" justifyContent="center" alignItems="center">
      <Button
        onClick={() => handlePageChangeWithSync(currentPage - 1)}
        isDisabled={currentPage === 1}
        mr={2}
        size="sm"
        bg={"green"}
      >
        <ArrowBackIcon color={"white"} />
      </Button>
      Page {currentPage} of {totalPage}
      <Button
        onClick={() => handlePageChangeWithSync(currentPage + 1)}
        isDisabled={currentPage >= totalPage}
        ml={2}
        size="sm"
        bg={"green"}
      >
        <ArrowForwardIcon color={"white"} />
      </Button>
    </Text>
  );
};
