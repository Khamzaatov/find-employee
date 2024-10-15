import React from "react";
import style from "./user.module.scss";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user.store";
import image from "../../assets/img.png";

const User: React.FC = observer(() => {
  const { getUsers, users, selectedUser, error } = userStore;

  React.useEffect(() => {
    getUsers();
  }, []);

  return selectedUser !== 0 ? (
    <div className={style.container}>
      {users?.map((el) => {
        return (
          <React.Fragment>
            {selectedUser === el.id && (
              <div key={el.id} className={style.user}>
                <img src={image} />
                <div className={style.info}>
                  <span>{el.name}</span>
                  <div>
                    <span>email:</span> {el.email}
                  </div>
                  <div>
                    <span>phone:</span> {el.phone}
                  </div>
                  <div>
                    <span>О себе:</span>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Temporibus, nulla amet, nemo, omnis magnam sunt excepturi
                      consequuntur sed sequi repudiandae est. Facere aliquid
                      porro eveniet libero ipsam inventore ex suscipit placeat!
                      Laborum tempora consequuntur quasi incidunt veritatis,
                      nostrum error velit? Itaque deleniti, quia ipsa corporis
                      ad quasi accusantium eveniet natus neque aspernatur
                      cupiditate quod pariatur saepe officiis, voluptatibus iure
                      impedit debitis autem explicabo praesentium facere
                      obcaecati dolorum. Dolores eveniet dolorem, sequi commodi
                      laudantium mollitia sapiente quae perferendis deleniti
                      error facilis, quam quod rem dolore.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  ) : error ? (
    <div className={style.error}>Произошла ошибка сервера!</div>
  ) : (
    <div className={style.prompt}>
      Выберите сотрудников, чтобы посмотреть его профиль
    </div>
  );
});

export default User;
