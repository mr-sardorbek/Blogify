import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../ui";
import { useEffect, useCallback } from "react";
import ArticleService from "../service/articles";
import { getArticleFailure, getArticleStart, getArticleSuccess } from "../slice/article";
import ArticalCard from "./artical-card";

const Main = () => {
  const { articles, isLoading } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  const getArticles = useCallback(async () => {
    dispatch(getArticleStart());
    try {
      const response = await ArticleService.getArticles();
      dispatch(getArticleSuccess(response.articles));
    } catch (error) {
      dispatch(getArticleFailure());
    }
  }, [dispatch]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="album py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {articles?.map((item) => (
          <ArticalCard key={item.slug} item={item} getArticles={getArticles} />
        ))}
      </div>
    </div>
  );
};

export default Main;


