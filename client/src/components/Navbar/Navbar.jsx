import {Nav, NavLogo, NavText, NavUser} from "./style";
import userIcon from "../../assets/img/user.svg";
import logo from "../../assets/img/oomlLogo.png";

const Navbar = () => {
    return (
        <Nav>
            <NavLogo src={logo} alt="Logo"/>
            <NavText>Öğrenci Paneli</NavText>
            <NavUser src={userIcon} alt="user"/>
        </Nav>
    )
}

export default Navbar;