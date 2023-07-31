import React, { useState, useEffect } from 'react';
import {
  Box,Button,Center,Heading,Text,Stack,Image,Flex,HStack} from '@chakra-ui/react';
import Axios from 'axios';
import { DeactivateProduct } from './deactivateProduct';
import { EditIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { EditModal } from './editModal';
import { PaginationControls } from '../pagination';
import { AddProductButton } from './addProductButton';
import { AddCategoryButton } from './addCategoryButton';

export const DashboardProduct = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = async (page, limit) => {
    try {
      const response = await Axios.get(`http://localhost:8000/api/products?page=${page}&limit=${limit}&=${id}`);
      const { result, totalPage: totalPages } = response.data;
      setProducts(result);
      setTotalPage(totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts(currentPage, itemsPerPage)
    getCategories();
  }, [currentPage, itemsPerPage]);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  };
  const handleItemsPerPageChange = (newLimit) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };
  const handleProductEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleProductSave = (updatedProduct) => {
    const updatedProducts = products.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
    setIsModalOpen(false);
  };
  return (
    <Center bg={'green.50'}>

    <Box  w={'90%'} py={10}>
      
    <Text size={'2xl'}>Category</Text>
    <AddCategoryButton/>
    <Text size={'2xl'}>Product</Text>
        <AddProductButton/>
      <Flex direction={{ base: 'column', sm: 'row', md: 'row', lg: 'row' }} justifyContent={'center'} flexWrap={'wrap'} gap={5} mx={'auto'}>
        {products?.map((item) => (
          <Box
            key={item.id} mx={"auto"} mt={5} role={'group'} p={4} maxW={'200px'}
            w={'full'} bg={'white'} boxShadow={'2xl'} rounded={'lg'} justifyContent={'center'}
            transition={'transform .2s'} zIndex={1}
            _hover={{
              transform: 'scale(1.05)',
              cursor: 'pointer'
            }}
            >
            <Box rounded={'lg'} height={'140px'} overflow="hidden">
              <Image
                rounded={'lg'}
                height={140}
                width={140}
                mx={'auto'}
                objectFit={'cover'}
                src={`http://localhost:8000/${item?.productImage}`}
                alt={'#'}
                transition="transform 0.2s ease-in-out"
                _groupHover={{
                  transform: 'scale(1.1)',
                }}
                />
            </Box>
            <Stack pt={4} align={'center'}>
              <Heading fontSize={'sm'} fontFamily={'body'} fontWeight={500} mt={2}>
                {item.productName}
              </Heading>
              <HStack>
                <Button onClick={() => handleProductEdit(item)} bg={"transparent"} size="sm">
                  <EditIcon color={"green"}/>
                </Button>
                <DeactivateProduct
                  productId={item?.id}
                  isDeleted={item?.isDeleted}
                  />
              </HStack>
            </Stack>
          </Box>
        ))}
      </Flex>
      <Box mt={5} display="flex" justifyContent="center" alignItems="center">
      <PaginationControls
        currentPage={currentPage}
        totalPage={totalPage}
        handlePageChange={handlePageChange}
        />
      </Box>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={selectedProduct}
        onSave={handleProductSave}
        categories={categories}
        />
    </Box>
        </Center>
  );
};
