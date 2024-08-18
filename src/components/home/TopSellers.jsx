import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";

const BestSellers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      );
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <img
                          className="lazy pp-author"
                          src={AuthorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">Loading...</Link>
                        <span>Loading...</span>
                      </div>
                    </li>
                  ))
                : items.map((item, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage } // Use placeholder if authorImage is missing
                            alt={item.authorName }
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>
                          {item.authorName}
                        </Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
