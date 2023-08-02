import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter, Button
} from '@chakra-ui/react';
import { EditProduct } from './editProduct';
import { ChangeProfilePicture } from './imgProfle';

export const EditModal = ({ isOpen, onClose, selectedProduct, onSave, categories }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedProduct && (
            <EditProduct product={selectedProduct} onSave={onSave} categories={categories} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

