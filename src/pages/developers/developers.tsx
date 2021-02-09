import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import Axios from "axios";
import { format } from "date-fns";

import IDeveloper from "./IDeveloper";
import Modal, { Delete, Update } from "./components";

const Login = (): JSX.Element => {
  const [developers, setDevelopers] = useState<IDeveloper[]>([]);

  const getAllDevelopers = async () => {
    const response = await Axios.get<IDeveloper[]>(
      `http://localhost:8000/api/developers`
    );
    setDevelopers(response.data);
  };

  useEffect(() => {
    getAllDevelopers();
  });

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="full"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Desenvolvedores</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Modal setRender={getAllDevelopers} />

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Sexo</Th>
                <Th>Idade</Th>
                <Th>Data de nascimento</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {developers.map((developer) => (
                <Tr key={developer.id}>
                  <Td>{developer.name}</Td>
                  <Td>{developer.gender}</Td>
                  <Td>{developer.age}</Td>
                  <Td>{format(new Date(developer.birthday), "dd/MM/yyyy")}</Td>
                  <Td>
                    <Update
                      developer={developer}
                      triggerApi={getAllDevelopers}
                    />
                    <Delete
                      id={(developer.id as unknown) as number}
                      triggerApi={getAllDevelopers}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
