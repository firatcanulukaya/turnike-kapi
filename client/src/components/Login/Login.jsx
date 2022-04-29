import {loginUser} from "../../redux/actions/userAction";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {
    FormError,
    Input
} from "../../assets/styled";
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Button,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = data => {
        dispatch(loginUser(data));
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
                        İşleme devam edebilmek için giriş yapınız.
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
                                <FormLabel>Şifre</FormLabel>
                                <Input placeholder="Şifrenizi giriniz"
                                       className={errors.password ? "error" : ""}
                                       type="password"
                                       {...register("password", {
                                           required: "Lütfen gerekli yerleri doldurunuz.",
                                           minLength: {
                                               value: 8,
                                               message: "Lütfen en az 8 karakter giriniz.",
                                           },
                                           maxLength: {
                                               value: 32,
                                               message: "Lütfen en fazla 32 karakter giriniz.",
                                           },
                                       })}
                                />


                                {errors.password && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.password?.message}
                                        </p>
                                    </FormError>
                                )}
                            </FormControl>
                            <Stack spacing={10}>
                                <Button type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Giriş Yap
                                </Button>
                            </Stack>

                            <Flex align={'center'}
                                  justify={'space-evenly'}>
                                <Button bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }} onClick={() => navigate('/test-yukle')}>
                                    Test Girişi Yap
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

export default Login;