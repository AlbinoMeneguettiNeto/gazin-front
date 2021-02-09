/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Axios from "axios";

interface IProp {
  id: number;
  triggerApi: any;
}

export default ({ id, triggerApi }: IProp): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await Axios.delete(`http://localhost:8000/api/developers/${id}`);
    triggerApi();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>
        <DeleteIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Você tem certeza que deseja excluir esse usuário?
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              variant="outline"
              isLoading={loading}
              loadingText="Deletando"
              onClick={handleDelete}
            >
              Deletar
            </Button>
            <Button ml={3} onClick={onClose} variant="outline">
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
