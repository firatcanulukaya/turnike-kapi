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
    Text,
    useColorModeValue, Select
} from "@chakra-ui/react";
import {useEffect} from "react";
import {getAllStudents, editStudent} from "../../redux/actions/userAction";

const EditRFID = () => {
    const dispatch = useDispatch();
    const {students} = useSelector(state => state.user);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        const fetchData = async () => await dispatch(getAllStudents());
        fetchData();
    }, []);

    const onSubmit = data => {
        dispatch(editStudent(data));
    };

    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'3xl'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'3xl'}>Öğrenciye RFID Ekle</Heading>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Öğrenci</FormLabel>
                                <Select placeholder="Öğrenci Seçiniz" type="number"
                                        className={errors.id ? "error" : ""}
                                        {...register("id", {
                                            required: "Lütfen gerekli yerleri doldurunuz."
                                        })}>
                                    {
                                        students.map((student, index) => (
                                            <option key={index} value={student.id}>{student.nameSurname}</option>
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