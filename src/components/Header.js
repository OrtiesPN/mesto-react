import logo from '../images/logo-mesto.svg';

export default function Header() {
    return(
        <header className="header">
          <img
            src={logo}
            alt="логотип Место"
            className="header__logo"
          />
        </header>
    )
}