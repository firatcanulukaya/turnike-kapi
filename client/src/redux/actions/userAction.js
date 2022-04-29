import {LOGIN_USER, GET_STUDENT, GET_ALL_STUDENTS, GET_ALL_TEACHERS, GET_ALL_USERS} from "../types";
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
            switch (err.response.data.message) {
                case "STUDENT_NOT_FOUND":
                    alertify.error("Kullanıcı bulunamadı.");
                    break;
                case "INVALID_TOKEN":
                    alertify.error("Tekrardan giriş yapınız.");
                    break;
                default:
                    alertify.error("Bir hata oluştu");
                    console.log(err.response.data);
                    break;
            }
            window.location.href = "/";
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
                    alertify.error("Kullanıcı zaten mevcut");
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

            dispatch({
                type: GET_ALL_TEACHERS,
                payload: res.data.message.filter(student => student.roleId === 2)
            });
        })
        .catch(err => {
            console.log(err);
        });
}

export const getAllUsers = () => dispatch => {
    axios.get("http://localhost:3001/api/student/getAll", tokenConfig())
        .then(res => {
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data.message
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
                    alertify.error("Kullanıcı bulunamadı");
                    break;
                default:
                    alertify.error("Bir hata oluştu");
                    console.log(err.response.data);
                    break;
            }
        });
}

export const deleteStudent = id => dispatch => {
    axios.delete(`http://localhost:3001/api/student/delete/${id}`, tokenConfig())
        .then(() => {
            alertify.success("Öğrenci silindi");
            axios.get("http://localhost:3001/api/student/getAll", tokenConfig())
                .then(res => {
                    dispatch({
                        type: GET_ALL_STUDENTS,
                        payload: res.data.message.filter(student => student.roleId === 3)
                    });
                })
                .catch(err => {
                    alertify.error("Bir hata oluştu");
                    console.log(err);
                });
        })
        .catch(err => {
            switch (err.response.data.message) {
                case "STUDENT_NOT_FOUND":
                    alertify.error("Kullanıcı bulunamadı.");
                    break;
                case "NOT_AUTHORIZED":
                    alertify.error("Yetkisiz işlem.");
                    break;
                default:
                    alertify.error("Bir hata oluştu");
                    console.log(err.response.data);
                    break;
            }
        });
}

export const editStudent = data => dispatch => {
    axios.patch(`http://localhost:3001/api/student/update/${data.id}`, data, tokenConfig())
        .then(() => {
            alertify.success("Kullanıcı güncellendi");
            axios.get("http://localhost:3001/api/student/getAll", tokenConfig())
                .then(res => {
                    dispatch({
                        type: GET_ALL_STUDENTS,
                        payload: res.data.message.filter(student => student.roleId === 3)
                    });
                })
                .catch(err => {
                    alertify.error("Bir hata oluştu");
                    console.log(err);
                });
        })
        .catch(err => {
            switch (err.response.data.message) {
                case "STUDENT_NOT_FOUND":
                    alertify.error("Kullanıcı bulunamadı");
                    break;
                case "NOT_AUTHORIZED":
                    alertify.error("Yetkisiz işlem.");
                    break;
                case "RFID_EXIST":
                    alertify.error("RFID kodu zaten kullanılıyor.");
                    break;
                default:
                    alertify.error("Bir hata oluştu");
                    console.log(err.response.data);
                    break;
            }
        });
}