import {loginUser} from "../../redux/actions/userAction";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {
    Button,
    ColFull,
    Container,
    Divider,
    FormError,
    Input, Label,
    Row,
    SubTitle,
    Title
} from "../../assets/styled";
import {LoginContainer, LoginLogo, LoginTitle, OrButtons} from "./style";
import logo from "../../assets/img/oomlLogo.png";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = data => {
        dispatch(loginUser(data));
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
                        Giriş Yap
                    </LoginTitle>
                </ColFull>
                <ColFull center>
                    <SubTitle>
                        İşleme devam edebilmek için lütfen giriş yapınız.
                    </SubTitle>
                </ColFull>

                <ColFull center>
                    <LoginContainer>
                        <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                            <Label>
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
                                           }
                                       })}/>
                                {errors.idCard && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.idCard?.message}</p>
                                    </FormError>
                                )}
                            </Label>

                            <Label>
                                <Input placeholder="Şifrenizi giriniz"
                                       className={errors.password ? "error" : ""}
                                       {...register("password", {
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

                                {errors.password && (
                                    <FormError>
                                        <p><i className="fa-solid fa-circle-exclamation"/> {errors.password?.message}
                                        </p>
                                    </FormError>
                                )}
                            </Label>
                            <Button>Giriş Yap</Button>
                        </form>
                        <Divider/>

                        <OrButtons>
                            <Button className="small" onClick={() => navigate('/test-yukle')}>
                                Test Girişi Yap
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

export default Login;