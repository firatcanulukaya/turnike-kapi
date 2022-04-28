import {useSelector, useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {
    InfoButtons,
    InfoCard,
    InfoCardBanner,
    InfoCardContainer, InfoCardContent, InfoCardContentSection, InfoCardFooter, InfoCardFooterSection,
    InfoCardTop,
    InfoCardTopLeft, InfoCardTopName,
    InfoCardTopPhoto, InfoCardUtils
} from "../StudentPanel/style";
import {useEffect} from "react";
import {getStudent} from "../../redux/actions/userAction";

const ViewStudent = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {student} = useSelector(state => state.user);

    useEffect(() => {
        const fetchData = async () => await dispatch(getStudent(id));
        fetchData();
    }, [dispatch, id]);


    return (
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
                            <span>Okul Numarası: {student?.studentId}</span>
                        </InfoCardUtils>
                    </InfoCardTopLeft>
                </InfoCardTop>
                <InfoCardContent>
                    <InfoCardContentSection>
                        <p>Sınıf:</p>
                        <p style={{color: "black"}}>{student?.className} {student?.department}</p>
                    </InfoCardContentSection>
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
                </InfoCardContent>

            </InfoCard>
        </InfoCardContainer>
    )
}

export default ViewStudent;