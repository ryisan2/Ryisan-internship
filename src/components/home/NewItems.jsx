import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import "aos/dist/aos.css";
import Aos from "aos";
import AllItems from "../allitems";


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
//using this just to change up and commmit 

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
              className="flex justify-center align-items"
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
                  <AllItems item={item} loading={loading} />
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
