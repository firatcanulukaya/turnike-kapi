import {uploadCovid} from "../../redux/actions/covidAction";
import {
    FormError,
    Input
} from "../../assets/styled";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Box, Flex, FormControl, Button, FormLabel, Heading, Stack, Text, useColorModeValue} from "@chakra-ui/react";

const CovidTest = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = data => {
        uploadCovid(data);
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'3xl'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'3xl'}>Osman Örek Meslek Lisesi Kapısına Hoşgeldiniz</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Test Sonucu Yükle
                    </Text>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Kimlik Numarası</FormLabel>
                                <Input placeholder="Kimlik Numaranızı giriniz" type="number"
                                       className={errors.idCard ? "error" : ""}
                                       {...register("idCard", {
                                           required: "Lütfen gerekli yerleri doldurunuz.",
                                           minLength: {
                                               value: 6,
                                               message: "Lütfen en az 6 karakter giriniz.",
                                           },
                                           maxLength: {
                                               value: 11,
                                               message: "Lütfen en fazla 11 karakter giriniz."
                                           },
                                           validate: value => {
                                               if (Number(value) < 0) {
                                                   return "Lütfen geçerli bir değer giriniz.";
                                               }
                                           }
                                       })}/>

                                {errors.idCard && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.idCard?.message}</p>
                                    </FormError>
                                )}
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Barkod</FormLabel>
                                <Input placeholder="Barkod numaranızı giriniz"
                                       className={errors.barcode ? "error" : ""}
                                       {...register("barcode", {
                                           required: "Lütfen gerekli yerleri doldurunuz.",
                                           minLength: {
                                               value: 4,
                                               message: "Lütfen en az 8 karakter giriniz.",
                                           },
                                           maxLength: {
                                               value: 32,
                                               message: "Lütfen en fazla 32 karakter giriniz.",
                                           },
                                       })}
                                />


                                {errors.barcode && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.barcode?.message}
                                        </p>
                                    </FormError>
                                )}
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Yükle
                                </Button>
                            </Stack>

                            <Flex align={'center'}
                                  justify={'space-evenly'}>
                                <Button bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }} onClick={() => navigate('/')}>
                                    Giriş Yap
                                </Button>
                                <Button bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }} onClick={() => navigate('/kayit')}>
                                    Kayıt Ol
                                </Button>
                            </Flex>

                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    )
}

export default CovidTest;