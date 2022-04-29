import {useSelector, useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {
    InfoCard,
    InfoCardBanner,
    InfoCardContainer, InfoCardContent, InfoCardContentSection, InfoCardFooter, InfoCardFooterSection,
    InfoCardTop,
    InfoCardTopLeft, InfoCardTopName,
    InfoCardTopPhoto, InfoCardUtils
} from "../../StudentPanel/style";
import React, {useEffect} from "react";
import {getStudent} from "../../../redux/actions/userAction";
import {ArrowLeftIcon, DeleteIcon, ExternalLinkIcon} from '@chakra-ui/icons'
import {
    Icon,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td, Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";

const ViewTeacher = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {student, user} = useSelector(state => state.user);

    useEffect(() => {
        const fetchData = async () => await dispatch(getStudent(id));
        fetchData();
    }, [dispatch, id]);

    const headers = ["Tür", "Tarih"];

    useEffect(() => {
        if (user?.roleId === 2) return navigate('/ogretmen');
    }, [user]);

    if (student === null) return <div>Yükleniyor...</div>;
    return (
        <>
            <InfoCardContainer>
                <InfoCard>
                    <InfoCardBanner/>
                    <InfoCardTop>
                        <InfoCardTopLeft>
                            <InfoCardTopPhoto bgColor="#059669">
                                <InfoCardTopName>{student?.nameSurname?.substr(0, 1)}</InfoCardTopName>
                            </InfoCardTopPhoto>
                            <InfoCardUtils>
                                <p>{student?.nameSurname}</p>
                            </InfoCardUtils>
                        </InfoCardTopLeft>
                    </InfoCardTop>
                    <InfoCardContent>
                        <InfoCardContentSection>
                            <p>Test Durumu:</p>
                            {
                                student?.covidTest.length > 0 ?
                                    <a href={`https://covid-19.gov.ct.tr/QRdogrula/${student?.covidTest[0]?.barcode}/${student?.idCard}`}
                                       target="_blank">Sonuç: {student?.covidTest[0]?.testResult ? "POZİTİF" : "NEGATİF"},
                                        Barkod: {student?.covidTest[0]?.barcode}, Yüklenme
                                        Tarihi: {new Date(student?.covidTest[0].updatedAt).toLocaleDateString("tr-TR")}</a>
                                    :
                                    <p>Test Yapılmamış</p>
                            }
                        </InfoCardContentSection>

                        <InfoCardFooter>
                            <InfoCardFooterSection>
                                <button onClick={() => navigate(-1)}>
                                    <Icon as={ArrowLeftIcon} color={"blue.800"}/>
                                    <p>Geri Dön</p>
                                </button>
                            </InfoCardFooterSection>
                        </InfoCardFooter>

                    </InfoCardContent>

                </InfoCard>
            </InfoCardContainer>

            <TableContainer pt={20}>
                <Table variant='simple'>
                    <TableCaption>Öğretmen Giriş Çıkış Listesi</TableCaption>
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
                            student?.entries.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item?.direction}</Td>
                                    <Td>{new Date(item?.createdAt).toLocaleDateString("tr-TR", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        second: "numeric"
                                    })}</Td>
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
    )
}

export default ViewTeacher;