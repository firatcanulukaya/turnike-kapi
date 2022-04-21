import {LOGIN_USER} from "../types";
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