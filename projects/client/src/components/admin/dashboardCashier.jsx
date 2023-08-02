import React, { useEffect, useState } from 'react';
import { AddCashierButton } from './addCashierButton';
import {Avatar,Box,Button,Flex,Table,TableContainer,
        Tbody,Td,Text,Th,Thead,Tr,} from '@chakra-ui/react';
import Axios from 'axios';
import { BanCashier } from './deactivateCashier';
import { CashierPopOver } from './deleteCashierPopOver';
import { EditCashierModal } from './editModalCashier';

export const DashboardCashier = () => {
  const [cashiers, setCashiers] = useState([]);
  const [selectedCashier, setSelectedCashier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCashiers = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/users');
      setCashiers(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCashiers();
  }, []);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleOpenModal = (cashier) => {
    setSelectedCashier(cashier);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCashier(null);
    setIsModalOpen(false);
  };

  return (
    <Box>
      <AddCashierButton />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Address</Th>
              <Th>Phone</Th>
              <Th>Edit Cashier</Th>
              <Th>Unemployed Cashier</Th>
              <Th>Ban Cashier</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cashiers?.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Flex alignItems="center">
                    <Avatar size="sm" />
                    <Box ml="10px">
                      <Text fontWeight="bold" fontSize="14px">{item.username}</Text>
                      <Text fontSize="14px">{item.email}</Text>
                    </Box>
                  </Flex>
                </Td>
                {item.isBanned ? (
                  <Td>
                    <Text color="red.500">Disabled</Text>
                  </Td>
                ) : (
                  <Td>
                    <Text color="green.500">Active</Text>
                  </Td>
                )}
                <Td>
                  <Text>{item.address}</Text>
                </Td>
                <Td>
                  <Text>{item.phone}</Text>
                </Td>
                <Td>
                  <Button colorScheme="blue" size="sm" onClick={() => handleOpenModal(item)}>
                    View Details
                  </Button>
                </Td>
                <Td>
                <CashierPopOver 
                  selectedCashier={item.id} 
                  cashierName={item.username}
                onClose={handleClosePopover}/>
                </Td>
                <Td>
                  <BanCashier cashierId={item?.id} isBanned={!item?.isBanned} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <EditCashierModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        cashier={selectedCashier}
      />
    </Box>
  );
};
