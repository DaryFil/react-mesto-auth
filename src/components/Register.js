import { Link } from "react-router-dom";
import {useState} from 'react';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({ email, password });
  };

  return (
    <main>
      <section className="authentification">
        <h2 className="authentification__title">Регистрация</h2>
        <form
          className="authentification__form"
          name="sign-up"
          onSubmit={handleSubmit}
        >
          <input
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            className="authentification__input"
            type="email"
            placeholder="Email"
            name="email"
            minLength="2"
            maxLength="30"
          />
          <input
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            className="authentification__input"
            type="password"
            placeholder="Пароль"
            name="password"
            minLength="6"
          />
          <button type="submit" className="authentification__button opacity">
            Зарегистрироваться
          </button>
        </form>

        <p className="authentification__paragraph">
          Уже зарегистрированы?{" "}
          <Link className="authentification__link opacity" to="/sign-in">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
