import React from "react";
import style from "./sidebar.module.scss";
import { observer } from "mobx-react-lite";
import userStore from "../../store/user.store";
import useDebounce from "../../hooks/hook";
import image from "../../assets/img.png";

const SideBar: React.FC = observer(() => {
  const { getUsers, users, value, setValue, setSelectedUser } =
    userStore;

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
 
  const debounceValue = useDebounce(value, 1000);

  React.useEffect(() => {
    getUsers();
  }, [debounceValue]);

  const changeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const userClickHandler = (id: number) => {
    setSelectedUser(id);
  };

  const searchUsers = React.useMemo(() => {
    return users?.filter((user) => {
      return value?.split(", ").find((el) => {
        if (
          user.username.toLowerCase() === el.toLowerCase() ||
          user.id.toString() === el
        ) {
          setIsLoading(true)
          return user;
        }
      });
    });
  }, [debounceValue]);

  if (!value) {
    searchUsers.length = 0;
  }

  return (
    <div className={style.container}>
      <span>Поиск сотрудников</span>
      <div className={style.search}>
        <input
          type="text"
          value={value}
          onChange={changeTextHandler}
          placeholder="Введите id или имя"
        />
      </div>
      <span>Результаты</span>
      {!searchUsers?.length && value ? (
        <span className={style.prompt}>{!isLoading ? "Ищем пользователя..." : 'Ничего не найдено!'}</span>
      ) : (
        searchUsers?.map((item) => {
          return (
            <div
              key={item.id}
              className={style.user}
              onClick={() => userClickHandler(item.id)}
            >
              <img src={image} alt="" />
              <div className={style.info}>
                <ul>
                  <li>{item.username}</li>
                  <li>
                    {item.email.length > 17
                      ? `${item.email.substring(0, 17)}...`
                      : item.email}
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
});

export default SideBar;
