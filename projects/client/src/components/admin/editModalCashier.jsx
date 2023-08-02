import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { EditCashier } from './editCashier'; 

export const EditCashierModal = ({ cashier, onSave, isOpen, onClose }) => {
  const handleSave = (updatedCashier) => {
    onSave(updatedCashier);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Cashier</ModalHeader>
        <ModalBody>
          <EditCashier cashier={cashier} onSave={handleSave} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

