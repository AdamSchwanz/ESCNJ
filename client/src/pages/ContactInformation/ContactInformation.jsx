import "./ContactInformation.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import MainContact from "./components/MainContact/MainContact";
import Tabs from "./components/Tabs/Tabs";
import ContactTab from "./components/ContactTab/ContactTab";
import AddressTab from "./components/AddressTab/AddressTab";

const ContactInformation = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("contact");
    const [refetchMainInfo, setRefetchMainInfo] = useState(false);
    const isAuth = Cookies.get("escnj-jwt-token") ? true : false;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth]);

    const handleCloseClick = () => {
        navigate("/");
    }

    return (
        <div className="contact-information">
            {isAuth &&
                <>
                    <Header />
                    <MainContact refetchMainInfo={refetchMainInfo} setRefetchMainInfo={setRefetchMainInfo} />
                    <div className="change-name-container">
                        <div className="change-name">
                            <label className="tab-label">Name of Person Making Changes - Require this to edit/add/delete</label>
                            <input
                                type="text"
                                placeholder="Please Enter Name"
                                className="tab-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {error && <div>{error}</div>}
                        </div>
                    </div>
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    {activeTab === "contact" ?
                        <ContactTab name={name} setRefetchMainInfo={setRefetchMainInfo} />
                        : activeTab === "address" ?
                            <AddressTab name={name} setRefetchMainInfo={setRefetchMainInfo} />
                            : activeTab === "phone" ?
                                <div>Phone Tab</div>
                                :
                                <></>
                    }
                    <div className="close-button-container">
                        <button className="close-button" onClick={handleCloseClick}>Close/Return to Contracts</button>
                    </div>
                </>
            }
        </div>
    )
};

export default ContactInformation;
