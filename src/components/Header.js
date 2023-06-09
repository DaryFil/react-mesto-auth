import headerLogo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header({ userData, isAuth, onLogout }) {
  const [linkPath, setLinkPath] = useState("");
  const [linkText, setLinkText] = useState("");

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/sign-in":
        setLinkPath("/sign-up");
        setLinkText("Зарегистрироваться");
        break;
      case "/sign-up":
        setLinkPath("/sign-in");
        setLinkText("Войти");
        break;
    }
  }, [location.pathname]);

  return (
    <header className="header">
      <img alt="Логотип место" src={headerLogo} className="header__logo" />
      {!isAuth && (
        <Link className="header__navigation-link" to={linkPath}>
          {linkText}
        </Link>
      )}

      {isAuth && (
        <div className="header__user-info">
          <p className="header__email">{userData.email}</p>
          <button className="header__logout opacity" onClick={onLogout}>
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}
