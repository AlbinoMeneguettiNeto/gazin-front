import React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";

import Developers from "pages/developers";

export default (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid p={3}>
        <Developers />
      </Grid>
    </Box>
  </ChakraProvider>
);
