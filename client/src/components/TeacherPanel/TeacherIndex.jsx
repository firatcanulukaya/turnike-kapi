import {Flex} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {Title, SubTitle} from "../../assets/styled";

const TeacherIndex = () => {
    const {user} = useSelector(state => state.user);
    return(
        <Flex alignItems={"center"} justifyContent={"center"} py={20} flexDirection={"column"}>
            <Title>Hoşgeldin {user?.nameSurname}</Title>
            <SubTitle>İşlem yapmak için lütfen yukarıdan seçiniz.</SubTitle>
        </Flex>
    )
}

export default TeacherIndex;