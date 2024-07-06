import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
          {source}
        </span>
        <img src={imageUrl ? imageUrl : "https://images.indianexpress.com/2023/06/Curiosity-postcard-featured-20230616.jpg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-truncate-2">{title}</h5>
          <p className="card-text text-truncate-3">{description}</p>
          <p className="card-text"><small className="text-danger">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
