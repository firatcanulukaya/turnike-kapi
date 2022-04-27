import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Select,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    HStack,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import {useState} from 'react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {
    FormError,
    Input
} from "../../assets/styled";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import passwordCheck from "../../services/passwordCheck";
import {registerUser} from "../../redux/actions/userAction";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

    const onSubmit = data => {
        const newData = {
            rfid: "",
            ...data,
        }
        dispatch(registerUser(newData));
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'3xl'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Osman Örek Meslek Lisesi Kapısına Hoşgeldiniz
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        İşleme devam etmek için lütfen kayıt olunuz.
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <FormControl id="nameSurname" isRequired>
                                <FormLabel>Adın Soyadın</FormLabel>
                                <Input placeholder="Ad Soyad giriniz" type="text"
                                       className={errors.nameSurname ? "error" : ""}
                                       {...register("nameSurname", {
                                           required: "Lütfen gerekli yerleri doldurunuz.",
                                       })}/>

                                {errors.nameSurname && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.nameSurname?.message}
                                        </p>
                                    </FormError>
                                )}
                            </FormControl>

                            <FormControl id="idCard" isRequired>
                                <FormLabel>Kimlik Numaran</FormLabel>
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
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.idCard?.message}
                                        </p>
                                    </FormError>
                                )}
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel>Şifre</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'}
                                           {...register("password", {
                                               required: "Lütfen gerekli yerleri doldurunuz.",
                                               minLength: {
                                                   value: 8,
                                                   message: "Lütfen en az 8 karakter giriniz.",
                                               },
                                               maxLength: {
                                                   value: 255,
                                                   message: "Lütfen en fazla 255 karakter giriniz.",
                                               },
                                               validate: (value) => {
                                                   if (!passwordCheck(value)) {
                                                       return "Şifre minimum 8 karakter, en az bir sayı, en az bir özel karakter ve büyük küçük harf içermelidir.";
                                                   }
                                               },
                                           })}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                                {errors.password && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.password?.message}
                                        </p>
                                    </FormError>
                                )}
                            </FormControl>

                            <FormControl id="passwordConfirm" isRequired>
                                <FormLabel>Şifre Tekrarı</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'}
                                           {...register("passwordConfirm", {
                                               required: "Lütfen gerekli yerleri doldurunuz.",
                                               validate: (value) => {
                                                   if (value !== watch("password")) {
                                                       return "Şifreler eşleşmiyor.";
                                                   }
                                               },
                                           })}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                                {errors.passwordConfirm && (
                                    <FormError>
                                        <p><i
                                            className="fa-solid fa-circle-exclamation"/> {errors.passwordConfirm?.message}
                                        </p>
                                    </FormError>
                                )}
                            </FormControl>
                            <Stack spacing={4}>
                                <HStack>
                                    <Box>
                                        <FormControl id="className" isRequired>
                                            <FormLabel>Sınıf</FormLabel>
                                            <Select placeholder='Sınıf Seçiniz'
                                                    {...register("className", {
                                                        required: "Lütfen gerekli yerleri doldurunuz.",
                                                    })}>
                                                <option value='9'>9</option>
                                                <option value='10'>10</option>
                                                <option value='11'>11</option>
                                                <option value='12'>12</option>
                                            </Select>


                                            {errors.className && (
                                                <FormError>
                                                    <p><i
                                                        className="fa-solid fa-circle-exclamation"/> {errors.className?.message}
                                                    </p>
                                                </FormError>
                                            )}
                                        </FormControl>
                                    </Box>

                                    <Box>
                                        <FormControl id="className" isRequired>
                                            <FormLabel>Bölüm</FormLabel>
                                            <Select placeholder='Bölüm Seçiniz'
                                                    {...register("department", {
                                                        required: "Lütfen gerekli yerleri doldurunuz.",
                                                    })}>
                                                <option value='Bilişim'>Bilişim</option>
                                                <option value='Elektrik'>Elektrik</option>
                                                <option value='Tesisat'>Tesisat</option>
                                            </Select>


                                            {errors.department && (
                                                <FormError>
                                                    <p><i
                                                        className="fa-solid fa-circle-exclamation"/> {errors.department?.message}
                                                    </p>
                                                </FormError>
                                            )}
                                        </FormControl>
                                    </Box>

                                    <Box>
                                        <FormControl id="passwordConfirm" isRequired>
                                            <FormLabel>Okul Numarası</FormLabel>
                                            <Input type="number"
                                                   {...register("studentId", {
                                                       required: "Lütfen gerekli yerleri doldurunuz.",
                                                       maxLength: {
                                                           value: 4,
                                                           message: "Lütfen en fazla 4 karakter giriniz."
                                                       },
                                                       validate: value => {
                                                           if (Number(value) < 0) {
                                                               return "Lütfen geçerli bir değer giriniz.";
                                                           }
                                                       }
                                                   })}
                                            />

                                            {errors.studentId && (
                                                <FormError>
                                                    <p><i
                                                        className="fa-solid fa-circle-exclamation"/> {errors.studentId?.message}
                                                    </p>
                                                </FormError>
                                            )}
                                        </FormControl>
                                    </Box>
                                </HStack>
                            </Stack>

                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type={'submit'}>
                                    Kayıt Ol
                                </Button>
                            </Stack>

                        </form>

                        <Stack pt={6}>
                            <Text align={'center'}>
                                Zaten hesabın var mı? <Link color={'blue.400'} onClick={() => navigate('/')}>Giriş
                                yap.</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Register;