import {useEffect} from "react";
import {useNavigate, Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserByToken} from "../../redux/actions/userAction";
import jsCookie from "js-cookie";
import Sidebar from './Sidebar';
import StudentPanel from "../StudentPanel/StudentPanel";
import Students from "./Students";
import ViewStudent from "./ViewStudent";
import EditRFID from "./EditRFID";

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
                <Route path="/profil" element={<StudentPanel/>}/>
                <Route path="/ogrenciler" element={<Students/>}/>
                <Route path="/rfid-ekle" element={<EditRFID/>}/>
                <Route path="/ogrenci/:id" element={<ViewStudent/>}/>
            </Routes>
        </>
    )
}

export default TeacherPanel;