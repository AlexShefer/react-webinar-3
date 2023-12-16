import { useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from './profile';
import Login from './login';
import ProtectedRoutes from '../containers/protected-routes';
import useStore from '../hooks/use-store';
import InitialLayout from '../containers/initial-lauout';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore()
  const token = useSelector((state) => state.session.token)

  useEffect(() => {
    store.actions.session.isLogged()
  }, [token])
  
  
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<InitialLayout/>}>
          <Route index element={<Main/>}/>
          <Route path={'/user/login'} element={<Login/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path={'/user/profile'} element={<Profile/>}/>
          </Route>
          <Route path={'/articles/:id'} element={<Article/>}/>
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
