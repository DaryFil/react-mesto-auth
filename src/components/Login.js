import {useState} from 'react';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({ email, password });
  };

  return (
    <main>
      <section className="authentification">
        <h2 className="authentification__title">Вход</h2>
        <form
          className="authentification__form"
          name="sign-in"
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
            Войти
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
