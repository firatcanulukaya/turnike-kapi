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
import {ExternalLinkIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {getAllStudents, deleteStudent, editStudent} from "../../../redux/actions/userAction";
import {useDispatch, useSelector} from "react-redux";

const Students = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {students, user} = useSelector(state => state.user);

    const headers = ["İsim Soyisim", "Kimlik Numarası", "Sınıf", "RFID", "İşlemler"]

    useEffect(() => {
        const fetchData = async () => await dispatch(getAllStudents());
        fetchData();
    }, []);

    const deleteStudentHandler = async (id) => {
        await dispatch(deleteStudent(id));
    }

    const updateStudentToTeacher = async (data, id) => {
        await dispatch(editStudent(data, id));
    }

    if (students === null) return <div>Yükleniyor...</div>;
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
                            students.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item?.nameSurname}</Td>
                                    <Td>{item?.idCard}</Td>
                                    <Td>{item?.className} {item?.department}</Td>
                                    <Td>{item?.rfid}</Td>

                                    <Td>
                                        <ButtonGroup variant="solid" size="sm" spacing={3}>
                                            <IconButton
                                                colorScheme="blue"
                                                icon={<ExternalLinkIcon/>}
                                                aria-label={"external"}
                                                onClick={() => navigate(`/ogretmen/ogrenci/${item?.id}`)}
                                            />

                                            {user?.roleId === 1 && <IconButton
                                                colorScheme="red"
                                                variant="outline"
                                                icon={<DeleteIcon/>}
                                                aria-label={"delete"}
                                                onClick={() => deleteStudentHandler(item?.id)}
                                            />}

                                            {user?.roleId === 1 && <IconButton
                                                colorScheme="green"
                                                icon={<EditIcon/>}
                                                aria-label={"delete"}
                                                onClick={() => updateStudentToTeacher({roleId: 2}, item?.id)}
                                            />}
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

export default Students;