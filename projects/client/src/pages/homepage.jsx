import { Box, Center, Flex, Heading, Stack,Text,useColorModeValue} from "@chakra-ui/react";
import { Product } from "../components/landingPage/cardProduct";
import { Category } from "../components/landingPage/cardCategory";

export const Homepage = () => {
  
  return (
    <Center bg={useColorModeValue("green.50","green.800")}>
    <Box py={10} zIndex={2} w={"90%"}>
      <Box>
      <Stack mt={10}>
      <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500} color={'green'}>
            Category
          </Heading>
          <Category/>
      </Stack>
        </Box>
      <Box>

      <Stack mt={10}>
      <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500} color={'green'}>
            Product
      </Heading>
      <Product/>
      </Stack>
        </Box>
    </Box>
        </Center>
  );
};
