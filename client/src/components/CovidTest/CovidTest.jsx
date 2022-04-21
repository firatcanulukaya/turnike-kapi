import {uploadCovid} from "../../redux/actions/covidAction";
import {useDispatch} from "react-redux";
import {
    Button,
    ColFull,
    Container,
    Divider,
    FormError,
    Input, Label,
    Row,
    Title
} from "../../assets/styled";
import {LoginContainer, LoginLogo, LoginTitle, OrButtons} from "../Login/style";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import logo from "../../assets/img/oomlLogo.png";

const CovidTest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = data => {
        uploadCovid(data);
    };

    return (
        <Container>
            <Row>
                <ColFull center>
                    <LoginLogo src={logo}/>
                </ColFull>
            </Row>
            <Row>
                <ColFull center>
                    <Title>
                        Osman Örek Meslek Lisesi Kapısına Hoşgeldiniz.
                    </Title>
                </ColFull>
            </Row>

            <Row style={{marginTop: "2rem"}}>
                <ColFull center>
                    <LoginTitle>
                        Test Sonucu Yükle
                    </LoginTitle>
                </ColFull>

                <ColFull center>
                    <LoginContainer>
                        <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                            <Label>
                                <Input placeholder="Kimlik numaranızı giriniz" type="number"
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
                                           }
                                       })}/>
                                {errors.idCard && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.idCard?.message}</p>
                                    </FormError>
                                )}
                            </Label>

                            <Label>
                                <Input placeholder="Barkod numaranızı giriniz"
                                       className={errors.barcode ? "error" : ""}
                                       {...register("barcode", {
                                           required: "Lütfen gerekli yerleri doldurunuz.",
                                           minLength: {
                                               value: 4,
                                               message: "Lütfen en az 8 karakter giriniz.",
                                           },
                                           maxLength: {
                                               value: 32,
                                               message: "Lütfen en fazla 32 karakter giriniz.",
                                           },
                                       })}
                                />

                                {errors.barcode && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.barcode?.message}
                                        </p>
                                    </FormError>
                                )}
                            </Label>
                            <Button>Yükle</Button>
                        </form>
                        <Divider/>

                        <OrButtons>
                            <Button className="small" onClick={() => navigate('/')}>
                                Girişi Yap
                            </Button>
                            <Button className="small">
                                Kayıt Ol
                            </Button>
                        </OrButtons>

                    </LoginContainer>
                </ColFull>
            </Row>

        </Container>
    )
}

export default CovidTest;