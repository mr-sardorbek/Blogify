import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ArticleService from "../service/articles";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import moment from "moment";
import { Loader } from "../ui";

const ArticleDetail = () => {
  const dispatch = useDispatch();
  const { articleDetail, isLoading } = useSelector((state) => state.article);
  const { slug } = useParams();

  const fetchArticleDetail = useCallback(async () => {
    dispatch(getArticleDetailStart());
    try {
      const response = await ArticleService.getArticleDetail(slug);
      dispatch(getArticleDetailSuccess(response.article));
    } catch (error) {
      dispatch(getArticleDetailFailure());
    }
  }, [dispatch, slug]);

  useEffect(() => {
    fetchArticleDetail();
  }, [fetchArticleDetail]);

  return isLoading ? (
    <Loader />
  ) : (
    articleDetail !== null && (
      <div className="p-5 mb-4 rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
          <p className="col-md-8 fs-4">{articleDetail.description}</p>
          <p className="text-muted">
            <span className="fw-bold">Created at: </span>
            {moment(articleDetail.createdAt).format("MMMM Do YYYY")}
          </p>

          <div className="col-md-8">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="d-inline-blok mb-2 text-primary text-capitalize">
                  {articleDetail.author.username}
                </h3>
                <p className="card-text mb-auto">
                  {articleDetail.author.bio}
                </p>
              </div>

              <div className="col-auto d-none d-lg-block">
                <svg
                  aria-label="Placeholder: Thumbnail"
                  className="bd-placeholder-img"
                  height="250"
                  preserveAspectRatio="xMidYMid slice"
                  role="img"
                  width="200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <text
                    x="50%"
                    y="50%"
                    fill="#eceeef"
                    dy=".3em"
                    className="fs-1 m-0 p-0 text-capitalize"
                  >
                    {articleDetail.author.username[0]}
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div>{articleDetail.body}</div>
        </div>
      </div>
    )
  );
};

export default ArticleDetail;
