import React from "react";
import "./Header.css";
import logoIcon from "../../Icons/LogoIcon.png";
import regBackground from "../../Icons/RegUnderline.png";

export function Header() {
	return (
		<header className="header">
			<button className="register-button">
				<p className="register-text">Зарегистрироваться</p>
				<img src={regBackground} className="register-back" />
			</button>
			<img src={logoIcon} alt="Логотип" className="logo" />
		</header>
	);
}
