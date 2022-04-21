import axios from "axios";
import alertify from "alertifyjs";

export const uploadCovid = (data) => {
    axios.post("http://localhost:3001/api/covid/create", data)
        .then(() => alertify.success("Test sonucu başarı ile yüklendi."))
        .catch(err => {
            switch (err.response.data.message) {
                case "BARCODE_ALREADY_EXIST":
                    alertify.error("Bu barkod numarasına sahip test sonucu zaten yüklendi.");
                    break;
                case "STUDENT_NOT_FOUND":
                    alertify.error("Bu kimlik numarasına sahip öğrenci bulunamadı.");
                    break;
                case "BARCODE_NOT_VALID":
                    alertify.error("Barkod numarası geçersiz.");
                    break;
                default:
                    alertify.error("Test sonucu yüklenirken bir hata oluştu.");
                    break;
            }
        })
}