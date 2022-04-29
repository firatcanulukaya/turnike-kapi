import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
    ButtonGroup,
    IconButton,
    Table,
    Tbody,
    Td,
    Thead,
    Tr,
    Th,
    Tfoot, TableCaption, TableContainer
} from "@chakra-ui/react";
import {ExternalLinkIcon, DeleteIcon} from "@chakra-ui/icons";
import {getAllTeachers, deleteStudent} from "../../../redux/actions/userAction";
import {useDispatch, useSelector} from "react-redux";

const Teachers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {teachers} = useSelector(state => state.user);

    const headers = ["İsim Soyisim", "Kimlik Numarası", "RFID", "İşlemler"]

    useEffect(() => {
        const fetchData = async () => await dispatch(getAllTeachers());
        fetchData();
    }, []);

    const deleteStudentHandler = async (id) => {
        await dispatch(deleteStudent(id));
    }

    if (teachers === null) return <div>Yükleniyor...</div>;
    return (

        <>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Öğrenci Listesi</TableCaption>
                    <Thead>
                        <Tr>
                            {
                                headers.map((header, index) => (
                                    <Th key={index}>{header}</Th>
                                ))
                            }
                        </Tr>
                    </Thead>
                    <Tbody>

                        {
                            teachers.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item?.nameSurname}</Td>
                                    <Td>{item?.idCard}</Td>
                                    <Td>{item?.rfid}</Td>

                                    <Td>
                                        <ButtonGroup variant="solid" size="sm" spacing={3}>
                                            <IconButton
                                                colorScheme="blue"
                                                icon={<ExternalLinkIcon/>}
                                                aria-label={"external"}
                                                onClick={() => navigate(`/ogretmen/ogretmen/${item?.id}`)}
                                            />

                                            <IconButton
                                                colorScheme="red"
                                                variant="outline"
                                                icon={<DeleteIcon/>}
                                                aria-label={"delete"}
                                                onClick={() => deleteStudentHandler(item?.id)}
                                            />
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            ))
                        }

                    </Tbody>
                    <Tfoot>
                        <Tr>
                            {
                                headers.map((header, index) => (
                                    <Th key={index}>{header}</Th>
                                ))
                            }
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>

    );
}

export default Teachers;