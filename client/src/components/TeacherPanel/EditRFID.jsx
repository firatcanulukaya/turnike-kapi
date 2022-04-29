import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
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
    useColorModeValue, Select
} from "@chakra-ui/react";
import {useEffect} from "react";
import {editStudent, getAllUsers} from "../../redux/actions/userAction";
import {useNavigate} from "react-router-dom";

const EditRFID = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {users, user} = useSelector(state => state.user);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        const fetchData = async () => await dispatch(getAllUsers());
        fetchData();
    }, []);

    useEffect(() => {
        if (user?.roleId === 2) return navigate('/ogretmen');
    }, [user]);

    const onSubmit = data => {
        dispatch(editStudent(data));
    };

    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'3xl'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'3xl'}>Kullanıcıya RFID Ekle</Heading>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Kullanıcı</FormLabel>
                                <Select placeholder="Kullanıcı Seçiniz" type="number"
                                        className={errors.id ? "error" : ""}
                                        {...register("id", {
                                            required: "Lütfen gerekli yerleri doldurunuz."
                                        })}>
                                    {
                                        users?.map((item, index) => (
                                            <option key={index} value={item.id}>{item.nameSurname}</option>
                                        ))
                                    }
                                </Select>

                                {errors.id && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.id?.message}</p>
                                    </FormError>
                                )}
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>RFID</FormLabel>
                                <Input placeholder="RFID giriniz"
                                       className={errors.rfid ? "error" : ""}
                                       {...register("rfid", {
                                           required: "Lütfen gerekli yerleri doldurunuz."
                                       })}
                                />


                                {errors.rfid && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.rfid?.message}
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
                                    Ekle
                                </Button>
                            </Stack>

                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    )
}

export default EditRFID;