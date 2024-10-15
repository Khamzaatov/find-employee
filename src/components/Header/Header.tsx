import React from "react";
import style from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.one}>Жилфонд</div>
      <div className={style.two}>Пользователь</div>
    </div>
  );
};

export default Header;
