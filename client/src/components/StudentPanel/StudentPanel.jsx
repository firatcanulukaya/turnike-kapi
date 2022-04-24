import Navbar from "./Navbar/Navbar";

const StudentPanel = () => {
    return (
        <>
            <Navbar/>
            <div className="infoCard">
                <div className="infoCardBanner"/>

                <div className="infoCardTop">
                    <div className="infoCardTopLeft">
                        <InfoCardTopPhoto bgColor="#059669">
                            <p className="infoCardTopName">F</p>
                        </InfoCardTopPhoto>
                        <div className="infoCardUtils">
                            <p>asdsadasd</p>
                            <span>age: 123</span>
                        </div>
                    </div>
                </div>

                <div className="infoCardContent">

                    <div className="infoCardContent-section">
                        <p>Class:</p>
                        <a style={{
                            color: "#011F3B",
                            cursor: "pointer"
                        }}>asdasd</a>
                    </div>

                </div>

                <div className="infoCardFooter">
                    <div className="infoCardFooterButtons">
                        <InfoButtons bgColor="#F1F1F1" textcolor="#23262F">Edit</InfoButtons>
                        <InfoButtons bgColor="#E53535" textColor="#FCFCFD" isHover={true}>Delete</InfoButtons>
                    </div>

                </div>

            </div>

        </>
    )
}

export default StudentPanel;