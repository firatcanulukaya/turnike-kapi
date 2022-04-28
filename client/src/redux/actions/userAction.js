import {LOGIN_USER, GET_STUDENT, GET_ALL_STUDENTS} from "../types";
import axios from "axios";
import Cookies from "js-cookie";
import alertify from "alertifyjs";
import {tokenConfig} from "../../services/tokenConfig";

export const loginUser = (userData) => dispatch => {
    axios.post("http://localhost:3001/api/auth/login", userData)
        .then(res => {
            Cookies.set("ooml-auth-token", res.data.message);
            axios.get("http://localhost:3001/api/student/getByJWTToken", tokenConfig())
                .then(res => {
                    dispatch({
                        type: LOGIN_USER,
                        payload: res.data.message
                    });

                    if (res.data.message.roleId === 2 || res.data.message.roleId === 1) {
                        window.location.href = "/ogretmen";
                    } else {
                        window.location.href = "/ogrenci";
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            switch (err.response.data.message) {
                case "USER_NOT_FOUND":
                    alertify.error("Kullanıcı bulunamadı");
                    break;
                case "INVALID_PASSWORD":
                    alertify.error("Şifre hatalı");
                    break;
                default:
                    alertify.error("Bir hata oluştu");
                    console.log(err.response.data);
                    break;
            }
        });
}

export const getUserByToken = () => dispatch => {
    axios.get("http://localhost:3001/api/student/getByJWTToken", tokenConfig())
        .then(res => {
            dispatch({
                type: LOGIN_USER,
                payload: res.data.message
            });
        })
        .catch(err => {
            console.log(err);
        });
}

export const registerUser = data => dispatch => {
    axios.post("http://localhost:3001/api/auth/register", data)
        .then(() => {
            alertify.success("Kayıt başarılı");
            window.location.href = "/";
        })
        .catch(err => {
            switch (err.response.data.message) {
                case "STUDENT_ALREADY_EXISTS":
                    alertify.error("Öğrenci zaten mevcut");
                    break;
                default:
                    alertify.error("Bir hata oluştu");
                    console.log(err.response.data);
                    break;
            }
        });
}

export const getAllStudents = () => dispatch => {
    axios.get("http://localhost:3001/api/student/getAll", tokenConfig())
        .then(res => {
            dispatch({
                type: GET_ALL_STUDENTS,
                payload: res.data.message.filter(student => student.roleId === 3)
            });
        })
        .catch(err => {
            console.log(err);
        });
}

export const getStudent = id => dispatch => {
    axios.get(`http://localhost:3001/api/student/get/${id}`, tokenConfig())
        .then(res => {
            dispatch({
                type: GET_STUDENT,
                payload: res.data.message
            });
        })
        .catch(err => {
            switch (err.response.data.message) {
                case "STUDENT_NOT_FOUND":
                    alertify.error("Öğrenci bulunamadı");
                    break;
                default:
                    alertify.error("Bir hata oluştu");
                    console.log(err.response.data);
                    break;
            }
        });
}