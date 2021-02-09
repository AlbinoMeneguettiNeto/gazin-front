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
import { SettingsIcon } from "@chakra-ui/icons";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import Axios from "axios";
import IDevelopers from "pages/developers/IDeveloper";

import IFormData from "./IFormData";

import Input from "./Input";
import TextArea from "./textArea";
import DatePicker from "./datePicker";

interface Prop {
  triggerApi: any;
  developer: IDevelopers;
}

export default ({ triggerApi, developer }: Prop): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef<FormHandles>(null);

  const [datePicker, setDatePicker] = useState(new Date(developer.birthday));
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<any>(developer.gender);

  const handleSubmit: SubmitHandler<IFormData> = async (data) => {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        age: Yup.number().required().positive().integer(),
        hobby: Yup.string().required(),
      });
      await schema.validate(data, { abortEarly: false });

      await Axios.put(`http://localhost:8000/api/developers/${developer.id}`, {
        name: data.name,
        age: data.age,
        hobby: data.hobby,
        gender,
        birthday: datePicker,
      });

      triggerApi();
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
      <Button onClick={onOpen} mr="5px">
        <SettingsIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={{
                name: developer.name,
                age: developer.age,
                hobby: developer.hobby,
              }}
            >
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
