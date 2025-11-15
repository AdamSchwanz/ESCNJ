import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Contracts from "./components/Contracts/Contracts";
import Header from "../../components/Header/Header";

const Home = () => {
  const isAuth = Cookies.get("escnj-jwt-token") ? true : false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <>
      {isAuth && (
        <div className="home">
          <Header />
          <Contracts />
        </div>
      )}
    </>
  );
};

export default Home;
