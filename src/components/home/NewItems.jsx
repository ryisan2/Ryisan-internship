import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import "aos/dist/aos.css";
import Aos from "aos";

import Countdown from "../UI/Countdown";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
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
    Aos.init();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section id="section-collections" className="">
      <div className="container">
        <div className="row">
          <div className="text-center">
            <h2 data-aos="fade-in">New Items</h2>
            <div className=" bg-color-2"></div>
          </div>
        </div>
        <div className="row justify-center align-center">
          <div>
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={true}
              responsive={responsive}
              infinite={true}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div className="p-2" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width={500} height={270} />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width={50} height={50} borderRadius={99} />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <h4>
                            <Skeleton height={20} width="40%" />
                          </h4>
                          <span>
                            <Skeleton height={20} width="20%" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((item, index) => (
                    <div className="p-2" key={index}>
                      <div className="nft__item" data-aos="fade-in">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate && (
                          <div>
                            <Countdown
                              key={item.id}
                              expiryDate={item.expiryDate}
                            />
                          </div>
                        )}
                        <div className="flex justify-center align-items">

                        <div className="flex justify-center items-center">
                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview w-[300px] h-[300px] object-cover" // Adjust width and height with Tailwind classes
                              alt=""
                            />
                          </Link>
                        </div>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
