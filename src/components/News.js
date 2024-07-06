import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {

  const [articles,setArticles] = useState([]);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);

 
 const capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
document.title= `NewsMonkey- ${capitalize(props.category)}`
  

  const updateNews = async ()=>{
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&apiKey=7d782e2b604f4012bd0f1a937bcb4480&pageSize=${props.pageSize}`;
    fetch(url).then((res) => {
      res.json().then((result) => {
        setArticles(result.articles)
        setTotalResults(result.totalResults)
      });
    });
  };

  const fetchMoreData=() =>{
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page+1}&apiKey=7d782e2b604f4012bd0f1a937bcb4480&pageSize=${props.pageSize}`;
    setPage(page+1);
    fetch(url).then((res) => {
      res.json().then((result) => {
        setArticles(articles.concat(result.articles))
        setTotalResults(result.totalResults)
      });
    });
  }

  useEffect(()=>{
    updateNews()
  })
  
  // const handlePrevClick = async () => {
    
  //       setPage(page - 1);
  //       updateNews();
  // };

  // const handleNextClick = async () => {
  //  setPage(page + 1 );
  //  updateNews();
  // };

  
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{marginTop:'80px'}} >NewsMonkey - Top headlines from {capitalize(props.category)}</h1>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!== totalResults}
          loader={<h4>Loading...</h4>}>
        
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
          disabled={page + 1 > Math.ceil(totalResults/props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  
}

News.defaultProps={
  country: 'in',
  pageSize: 8,
  category:'general'
}

News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News;
