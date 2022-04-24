import {useSelector, useDispatch} from "react-redux";
import {getUserByToken} from "../../redux/actions/userAction";
import {useNavigate} from "react-router-dom";
import jsCookie from "js-cookie";
import Navbar from "../Navbar/Navbar";
import {
    InfoButtons,
    InfoCard,
    InfoCardBanner,
    InfoCardContainer, InfoCardContent, InfoCardContentSection, InfoCardFooter, InfoCardFooterSection,
    InfoCardTop,
    InfoCardTopLeft, InfoCardTopName,
    InfoCardTopPhoto, InfoCardUtils
} from "./style";
import {useEffect} from "react";

const StudentPanel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const authToken = jsCookie.get("ooml-auth-token");

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
            <Navbar/>
            <InfoCardContainer>
                <InfoCard>
                    <InfoCardBanner/>
                    <InfoCardTop>
                        <InfoCardTopLeft>
                            <InfoCardTopPhoto bgColor="#059669">
                                <InfoCardTopName>F</InfoCardTopName>
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
                            <a href={`https://covid-19.gov.ct.tr/QRdogrula/${user?.covidTest[0]?.barcode}/${user?.idCard}`}
                               target="_blank">Sonuç: {user?.covidTest[0]?.testResult ? "POZİTİF" : "NEGATİF"},
                                Barkod: {user?.covidTest[0]?.barcode}, Yüklenme
                                Tarihi: {new Date(user?.covidTest[0].createdAt).toLocaleDateString("tr-TR")}</a>
                        </InfoCardContentSection>
                    </InfoCardContent>
                    <InfoCardFooter>
                        <InfoCardFooterSection>
                            <InfoButtons bgColor="#F1F1F1" textcolor="#23262F" onClick={() => navigate("/test-yukle")}>Test
                                Yükle</InfoButtons>
                            <InfoButtons bgColor="#E53535" textColor="#FCFCFD" isHover={true} onClick={getLogout}>Çıkış
                                Yap</InfoButtons>
                        </InfoCardFooterSection>
                    </InfoCardFooter>
                </InfoCard>
            </InfoCardContainer>
        </>
    )
}

export default StudentPanel;