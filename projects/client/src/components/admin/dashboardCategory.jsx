import React, { useEffect, useState } from 'react';
import { Box, Center, useColorModeValue, Heading, Text, Stack, Image, Button, Flex } from '@chakra-ui/react';
import { Counter } from '../counter';
import Axios from 'axios';
import { PaginationControls } from '../pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryPopOver } from './deleteCategoryPopOver';

export const DashboardCategory = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [totalPage, setTotalPage] = useState(1);
    const [selectedCardId, setSelectedCardId] = useState(null); 
    const location = useLocation();
    const navigate = useNavigate();
  
    
    const getCategories = async (page, limit) => {
      try {
        const response = await Axios.get(`http://localhost:8000/api/categories?page=${page}&limit=${limit}`);
        const { result, totalPage: totalPages } = response.data;
        setCategories(result);
        setTotalPage(totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };
  
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
        setCurrentPage(newPage);
      }
    };
    
    const handleClearFilter = () => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete('catId');
      navigate(`/dashboard?${queryParams.toString()}`);
      setSelectedCardId(null); 
    };
  
    useEffect(() => {
      getCategories(currentPage,itemsPerPage)
      // const queryParams = new URLSearchParams(location.search);
      // const pageParam = queryParams.get('page');
      // setCurrentPage(pageParam ? parseInt(pageParam) : 1);
    }, [currentPage, itemsPerPage]);
    return (
      <Box>
        <Flex direction="row" justifyContent="center" flexWrap="wrap">
          <Box mt={4} onClick={handleClearFilter} colorScheme="gray"p={4}
              m={3}
              maxW="180px"
              w="100px"
              bg={'white'}
              boxShadow="md"
              rounded="lg"
              justifyContent="center"
              _hover={{
                boxShadow: 'xl',
               
              }}>
             <Text color={'green'} fontSize="sm" fontWeight="bold" textAlign="center">
                All
              </Text>
          </Box>
          {categories?.map((item) => (
            <Box
              key={item.id}
              p={4}
              m={3}
              maxW="180px"
              w="100px"
              bg={item.id === selectedCardId ? 'green' : 'white'} 
              boxShadow="md"
              rounded="lg"
              justifyContent="center"
              _hover={{
                boxShadow: 'xl',
              }}
              cursor={"pointer"}
              onClick={() => {
                onSelectCategory(item.id);
                setSelectedCardId(item.id); 
              }}
            >
              <Text color={item.id === selectedCardId ? 'white' : 'green'} fontSize="sm" fontWeight="bold" textAlign="center">
                {item.Category}
              </Text>
              <CategoryPopOver
            selectedCategory={item.id}
            categoryName={item.Category}
            onClose={handleClosePopover}/>
            </Box>
          ))}
        </Flex>
      </Box>
    );
};
