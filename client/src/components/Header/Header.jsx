import "./Header.css";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import userService from "../../services/userService";

const Header = () => {
    const isAuth = Cookies.get("escnj-jwt-token") ? true : false;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth]);

    const handleLogout = async () => {
        try {
            dispatch(ShowLoading());
            const response = await userService.logoutUser({});
            // console.log("Response: ", response);
            Cookies.remove("escnj-jwt-token");
            navigate("/login");
        } catch (error) {
            console.log(
                "Error: ",
                error?.response?.data?.error || "Something Went Wrong!"
            );
        } finally {
            dispatch(HideLoading());
        }
    };

    return (
        <div className="header">
            {isAuth &&
                <div className="logout">
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            }
        </div>
    )
};

export default Header;
