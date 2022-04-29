import {useEffect} from "react";
import {useNavigate, Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserByToken} from "../../redux/actions/userAction";
import jsCookie from "js-cookie";
import Sidebar from './Sidebar';
import Profile from "./Profile";
import Students from "./Student/Students";
import ViewStudent from "./Student/ViewStudent";
import EditRFID from "./EditRFID";
import ViewTeacher from "./Teacher/ViewTeacher";
import Teachers from "./Teacher/Teachers";
import TeacherIndex from "./TeacherIndex";

const TeacherPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authToken = jsCookie.get("ooml-auth-token");
    const {user} = useSelector(state => state.user);

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

    if (user?.roleId > 2) return navigate('/ogrenci');
    return (
        <>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<TeacherIndex/>}/>
                <Route path="/profil" element={<Profile/>}/>
                <Route path="/ogrenciler" element={<Students/>}/>
                <Route path="/rfid-ekle" element={<EditRFID/>}/>
                <Route path="/ogrenci/:id" element={<ViewStudent/>}/>
                <Route path="/ogretmenler" element={<Teachers/>}/>
                <Route path="/ogretmen/:id" element={<ViewTeacher/>}/>
            </Routes>
        </>
    )
}

export default TeacherPanel;