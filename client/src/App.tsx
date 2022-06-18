import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

function App() {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  })

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (error) {
      
    }
  }

  if (!store.isAuth) {
    return (
      <LoginForm />
    )
  }

  return (
    <div className="App">
     <h1>{store.isAuth ? `Пользователь авторизован` : 'Авторизуйтесь'}</h1>
     <h1>{store.user.isActivated ? `Аккаунт подтвержден по почте` : 'Подтвердите аккаунт'}</h1>
     <button onClick={() => store.logout()}>Выйти</button>
     <div>
       <button onClick={getUsers}>Получить пользователей</button>
     </div>
    </div>
  );
}

export default observer(App);
