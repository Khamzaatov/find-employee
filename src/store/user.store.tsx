import { makeAutoObservable, runInAction } from "mobx";
import User from "../types/UserType";

class UserStore {
  users: User[] = [];
  loading = false;
  error = false;
  value = "";
  selectedUser = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setValue = (text: string) => {
    this.value = text;
    if (!this.value) {
      this.selectedUser = 0;
    }
  };

  setSelectedUser = (id: number) => {
    this.selectedUser = id;
  };

  getUsers = async () => {
    this.loading = true;
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();

      if (!response.ok) {
        this.error = true;
        throw new Error("Ошибка сервера!");
      }
      runInAction(() => {
        this.users = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.error = true;
        this.loading = false;
      });
    }
  };
}

export default new UserStore();
