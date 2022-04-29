import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getUserByToken} from "../../redux/actions/userAction";
import jsCookie from "js-cookie";
import {
    InfoButtons,
    InfoCard,
    InfoCardBanner,
    InfoCardContainer, InfoCardContent, InfoCardContentSection, InfoCardFooter, InfoCardFooterSection,
    InfoCardTop,
    InfoCardTopLeft, InfoCardTopName,
    InfoCardTopPhoto, InfoCardUtils
} from "../StudentPanel/style";
import {Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const authToken = jsCookie.get("ooml-auth-token");

    const headers = ["Tür", "Tarih"];

    useEffect(() => {
        const fetchData = async () => {
            if (authToken) {
                await dispatch(getUserByToken());
            } else {
                navigate('/')
            }
        }
        fetchData();
    }, [authToken]);

    const getLogout = () => {
        jsCookie.remove("ooml-auth-token");
        navigate('/');
    };

    if (user === null) return "Yükleniyor...";
    return (
        <>
            <InfoCardContainer>
                <InfoCard>
                    <InfoCardBanner/>
                    <InfoCardTop>
                        <InfoCardTopLeft>
                            <InfoCardTopPhoto bgColor="#059669">
                                <InfoCardTopName>{user?.nameSurname?.substr(0, 1)}</InfoCardTopName>
                            </InfoCardTopPhoto>
                            <InfoCardUtils>
                                <p>{user?.nameSurname}</p>
                                <span>Okul Numarası: {user?.studentId}</span>
                            </InfoCardUtils>
                        </InfoCardTopLeft>
                    </InfoCardTop>
                    <InfoCardContent>
                        <InfoCardContentSection>
                            <p>Sınıf:</p>
                            <p style={{color: "black"}}>{user?.className} {user?.department}</p>
                        </InfoCardContentSection>
                        <InfoCardContentSection>
                            <p>Test Durumu:</p>
                            {
                                user?.covidTest.length > 0 ?
                                    <a href={`https://covid-19.gov.ct.tr/QRdogrula/${user?.covidTest[0]?.barcode}/${user?.idCard}`}
                                       target="_blank">Sonuç: {user?.covidTest[0]?.testResult ? "POZİTİF" : "NEGATİF"},
                                        Barkod: {user?.covidTest[0]?.barcode}, Yüklenme
                                        Tarihi: {new Date(user?.covidTest[0].updatedAt).toLocaleDateString("tr-TR")}</a>
                                    :
                                    <p>Test Yapılmamış</p>
                            }
                        </InfoCardContentSection>
                    </InfoCardContent>
                    <InfoCardFooter>
                        <InfoCardFooterSection>
                            <InfoButtons bgColor="#F1F1F1" textColor="#23262F" onClick={() => navigate("/test-yukle")}>Test
                                Yükle</InfoButtons>
                            <InfoButtons bgColor="#E53535" textColor="#FCFCFD" isHover={true} onClick={getLogout}>Çıkış
                                Yap</InfoButtons>
                        </InfoCardFooterSection>
                    </InfoCardFooter>
                </InfoCard>
            </InfoCardContainer>


            <TableContainer pt={20}>
                <Table variant='simple'>
                    <TableCaption>Giriş Çıkış Kaydın</TableCaption>
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
                            user?.entries.map((item, index) => (
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

export default Profile;