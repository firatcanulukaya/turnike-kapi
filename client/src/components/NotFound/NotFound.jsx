import {useNavigate} from "react-router-dom";
import {Box, Heading, Text, Button, Flex} from '@chakra-ui/react';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <Box textAlign="center" py={10} px={6}>
                <Heading
                    display="inline-block"
                    as="h2"
                    size="4xl"
                    bgGradient="linear(to-r, blue.400, blue.600)"
                    backgroundClip="text">
                    404
                </Heading>
                <Text fontSize="22px" mt={3} mb={2}>
                    Sayfa Bulunamadı
                </Text>
                <Text color={'gray.500'} mb={6}>
                    Aradığınız sayfa bulunamadı.
                </Text>

                <Button
                    colorScheme="teal"
                    bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
                    color="white"
                    variant="solid" onClick={() => navigate(-1)}>
                    Önceki Sayfaya Dön
                </Button>
            </Box>
        </Flex>
    );
}

export default NotFound;