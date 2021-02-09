/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Stack,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import Axios from "axios";

import IFormData from "./IFormData";

import Input from "./Input";
import TextArea from "./textArea";
import DatePicker from "./datePicker";

interface Prop {
  setRender: any;
}

export default ({ setRender }: Prop): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef<FormHandles>(null);

  const [datePicker, setDatePicker] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<any>("M");

  const handleSubmit: SubmitHandler<IFormData> = async (data) => {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        age: Yup.number().required().positive().integer(),
        hobby: Yup.string().required(),
      });
      await schema.validate(data, { abortEarly: false });

      await Axios.post("http://localhost:8000/api/developers", {
        name: data.name,
        age: data.age,
        hobby: data.hobby,
        gender,
        birthday: datePicker,
      });

      setRender();
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        if (formRef.current) {
          formRef.current.setErrors({
            name: "O nome é obrigatório",
            age: "A idade é obrigatória",
            hobby: "O hobby é obrigatório",
          });
        }
      }
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Criar desenvolvedor</Button>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input name="name" />
              </FormControl>
              <FormControl>
                <FormLabel>Idade</FormLabel>
                <Input name="age" />
              </FormControl>
              <FormControl>
                <FormLabel as="legend">Sexo</FormLabel>
                <RadioGroup
                  defaultValue="M"
                  onChange={setGender}
                  value={gender}
                >
                  <HStack spacing="15px">
                    <Radio value="M">Masculino</Radio>
                    <Radio value="F">Feminino</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Aniversário</FormLabel>
                <DatePicker
                  name="birthday"
                  onChange={(d: any) => {
                    setDatePicker(d);
                  }}
                  selectedDate={datePicker}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Hobby</FormLabel>
                <TextArea name="hobby" />
              </FormControl>
              <Stack direction="row" spacing={1} mt={5} justify="flex-end">
                <Button
                  variant="outline"
                  colorScheme="teal"
                  mr={3}
                  type="submit"
                  isLoading={loading}
                  loadingText="Enviando"
                >
                  Cadastrar
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Fechar
                </Button>
              </Stack>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
