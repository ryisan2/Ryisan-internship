<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
=======
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
>>>>>>> 09662e0f0f972710205154ec6013dabddbc0698b
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";

<<<<<<< HEAD
const BestSellers = () => {
=======
const TopSellers = () => {
>>>>>>> 09662e0f0f972710205154ec6013dabddbc0698b
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
<<<<<<< HEAD
  }, []);
=======
    Aos.init(); // Initialize AOS animation
  }, []); // Empty dependency array to run on component mount
>>>>>>> 09662e0f0f972710205154ec6013dabddbc0698b

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
<<<<<<< HEAD
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
=======
                        <Skeleton width={50} height={50} borderRadius={99} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={60} height={20} />
>>>>>>> 09662e0f0f972710205154ec6013dabddbc0698b
                      </div>
                    </li>
                  ))
                : items.map((item, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
<<<<<<< HEAD
                            src={item.authorImage } // Use placeholder if authorImage is missing
                            alt={item.authorName }
=======
                            src={item.authorImage || AuthorImage}
                            alt={item.authorName || "Author"}
>>>>>>> 09662e0f0f972710205154ec6013dabddbc0698b
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>
<<<<<<< HEAD
                          {item.authorName}
                        </Link>
                        <span>{item.price} ETH</span>
=======
                          {item.authorName || "Unknown Author"}
                        </Link>
                        <span>{item.totalSales} ETH</span>
>>>>>>> 09662e0f0f972710205154ec6013dabddbc0698b
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
