import {  useSelector } from "react-redux";

import {  useNavigate } from "react-router-dom";
import ArticleService from "../service/articles";

const ArticalCard = ({item, getArticles}) => {
    const { loggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const deleteArticle = async(slug) => {
    try {
      await ArticleService.deleteArticle(slug)
      getArticles()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="col" key={item.id}>
            <div className="card h-100 shadow-sm">

             
              <svg
                className="bd-placeholder-img card-img-top"
                height="225"
                width="100%"
              >
                <rect width="100%" height="100%" fill="#55595c" />
              </svg>

              <div className="card-body">
                <p className="card-text fw-bold m-0">{item.title}</p>
                <p className="card-text">{item.description}</p>
              </div>

              <div className="card-footer d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => navigate(`/article/${item.slug}`)}
                  >
                    View
                  </button>
                  {loggedIn && user.username === item.author.username && (
                    <>
                  <button className="btn btn-sm btn-outline-secondary"
                  onClick={() => navigate(`/edit-article/${item.slug}`)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteArticle(item.slug)}>
                    Delete
                  </button>
                    </>
                  )}
                </div>

                <small className="fw-bold text-capitalize">
                  {item.author?.username}
                </small>
              </div>

            </div>
          </div>
  )
}

export default ArticalCard
