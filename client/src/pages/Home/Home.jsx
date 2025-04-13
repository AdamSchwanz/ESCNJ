import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Contracts from "./components/Contracts/Contracts";

const Home = () => {
    const isAuth = Cookies.get('escnj-jwt-token') ? true : false;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            {isAuth &&
                <div className="home">
                    <Contracts />
                </div>
            }
        </>
    )
};

export default Home;
