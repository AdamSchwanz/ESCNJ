import "./ContactInformation.css";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import MainContact from "./components/MainContact/MainContact";

const ContactInformation = () => {
    const isAuth = Cookies.get("escnj-jwt-token") ? true : false;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth]);

    return (
        <div className="contact-information">
            {isAuth &&
                <>
                    <Header />
                    <MainContact />
                </>
            }
        </div>
    )
};

export default ContactInformation;
