import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex } from "@chakra-ui/react";
import { CreateCategory } from './createCategory';

export const AddCategoryButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex justifyContent={'flex-end'} >
      <Button bg={"green"} color={'white'} _hover={{ bg: 'white', color: 'green', boxShadow: 'md' }} onClick={handleOpenModal}> Add Category
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <CreateCategory onCloseModal={handleCloseModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};