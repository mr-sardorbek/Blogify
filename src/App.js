import { Routes, Route } from "react-router-dom";
import { Main, Login, Register, Navbar, ArticleDetail, CreateArticle, EditArticle } from './components/index';
import { useEffect, useCallback } from "react";
import AuthService from "./service/auth";
import { useDispatch } from "react-redux";
import { loginUserSuccess } from "./slice/auth";
import { getItem } from "./helpers/persistance-storage";

const App = () => {
  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    try {
      const response = await AuthService.getUser();
      dispatch(loginUserSuccess(response.user));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    const token = getItem('token');
    if (token) {
      getUser();
    }
  }, [getUser]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article/:slug" element={<ArticleDetail />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/edit-article/:slug" element={<EditArticle />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

