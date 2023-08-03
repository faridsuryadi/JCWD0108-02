import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Box, Flex, Heading, Image, Stack, Text, useColorModeValue, Select, SimpleGrid } from '@chakra-ui/react';
import { Counter } from '../counter';
import { PaginationControls } from '../pagination';
import { useNavigate } from 'react-router-dom';

export const Product = ({ selectedCategory, searchQuery, reload, setReload }) => {
  const getCurrentPageFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(searchParams.get('page'), 10) || 1;
    return currentPage;
  };
  const showCounterComponent = products && products.length > 0


  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(getCurrentPageFromURL());
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [sortOption, setSortOption] = useState('productName');
  const navigate = useNavigate();

  const getProducts = async (page, limit, category, sortField, query) => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/products?page=${page}&limit=${limit}&catId=${category}&sortField=${sortField}&search=${query}`
      );
      const { result, totalPage: totalPages } = response.data;
      setProducts(result);
      setTotalPage(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    setSortOption(sortValue);

    navigate(`/?sort=${sortValue}`, { replace: true });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage && newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    getProducts(currentPage, itemsPerPage, selectedCategory, sortOption, searchQuery);
  }, [currentPage, itemsPerPage, selectedCategory, sortOption, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <>
      <Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb="4"
        >
          <Select
            value={sortOption}
            onChange={(event) => {
              const sortValue = event.target.value;
              setSortOption(sortValue);
              navigate(`/?sort=${sortValue}`, { replace: true });
            }}
          >
            <option value="productName">Sort by Name (A-Z)</option>
            <option value="productNameDESC">Sort by Name (Z-A)</option>
            <option value="productPrice">Sort by Price (Low to High)</option>
            <option value="productPriceDESC">Sort by Price (High to Low)</option>
          </Select>
        </Flex>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap="4">
          {products?.map((item) => {
            const cardClassName = item.isDeleted ? 'off' : '';

            return (
              <Box
                key={item.id}
                role="group"
                p="4"
                bg="white"
                boxShadow="2xl"
                rounded="lg"
                justifyContent="center"
                transition="transform .2s"
                zIndex={1}
                className={cardClassName}
                _hover={!item.isDeleted ? { transform: 'scale(1.05)', cursor: 'pointer'} : {}}
              >
                <Box rounded="lg" height="140px" overflow="hidden">
                  <Image
                    rounded="lg"
                    height={140}
                    width={140}
                    mx="auto"
                    objectFit="cover"
                    src={`http://localhost:8000/${item?.productImage}`}
                    alt="#"
                    transition="transform 0.2s ease-in-out"
                    _groupHover={!item.isDeleted ? { transform: 'scale(1.1)' } : {}}
                  />
                </Box>
                <Stack pt="4" align="center">
                  <Heading fontSize="sm" fontFamily="body" fontWeight={500} mt="2">
                    {item.productName}
                  </Heading>
                  <Heading fontSize="sm" fontFamily="body" fontWeight={500} color="green">
                    {item.productPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                  </Heading>
                  {showCounterComponent && <Counter id={item.id} reload={reload} setReload={setReload} />}
                </Stack>
              </Box>
            );
          })}
        </SimpleGrid>
        <Box mt="5" display="flex" justifyContent="center" alignItems="center">
          <PaginationControls currentPage={currentPage} totalPage={totalPage} handlePageChange={handlePageChange} />
        </Box>
        <style jsx>{`
          .off {
            opacity: 0.5;
          }
        `}</style>
      </Box>
    </>
  );
};
