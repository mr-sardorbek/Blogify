import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../ui";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ArticleService from "../service/articles";
import { getArticleFailure, getArticleStart, getArticleSuccess } from "../slice/article";
import ArticalCard from "./artical-card";

const Main = () => {
  const { articles, isLoading } = useSelector((state) => state.article);
  const { loggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const getArticles = async() => {
    dispatch(getArticleStart())
     try {
      const response = await ArticleService.getArticles()
      dispatch(getArticleSuccess(response.articles))
      console.log(response)
     } catch (error) {
      dispatch(getArticleFailure())
     }
  }

  const deleteArticle = async(slug) => {
    try {
      await ArticleService.deleteArticle(slug)
      getArticles()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    
    getArticles()
  },[])

 
  

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="album py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {articles?.map((item) => (
          <ArticalCard item={item} getArticles={getArticles}/>
        ))}
      </div>
    </div>
  );
};

export default Main;

