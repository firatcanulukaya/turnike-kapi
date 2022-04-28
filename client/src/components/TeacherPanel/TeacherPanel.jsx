import {useEffect} from "react";
import {useNavigate, Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserByToken} from "../../redux/actions/userAction";
import jsCookie from "js-cookie";
import Sidebar from './Sidebar';
import StudentPanel from "../StudentPanel/StudentPanel";

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

    if(user?.roleId > 2) return navigate('/ogrenci');
    return (
        <>
            <Sidebar/>
            <Routes>
                <Route path="/profil"
                       element={<StudentPanel/>}/>
            </Routes>
        </>
    )
}

export default TeacherPanel;