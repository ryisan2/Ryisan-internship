import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AllItems from "../allitems";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemDisplay, setItemDisplay] = useState(8);

  async function fetchItems(filter) {
    setLoading(true);
    try {
      const response = await axios.get(
        filter
          ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
          : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function skeleton(index) {
    return (
      <div
        key={index}
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12 pb-4"
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <Skeleton width="100%" height={440} borderRadius={15} />
      </div>
    );
  }

  function loadMore() {
    setItemDisplay((prevDisplay) => prevDisplay + 8);
  }

  function loadLess() {
    setItemDisplay((prevDisplay) => Math.max(prevDisplay - 8, 8));
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => fetchItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        <>
          {new Array(8).fill(0).map((_, index) => skeleton(index))}
        </>
      ) : (
        <div className="row">
          {items.slice(0, itemDisplay).map((item, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12 pb-4"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <AllItems item={item} />
            </div>
          ))}
        </div>
      )}

      <div className="col-md-12 text-center mt-3">
        {itemDisplay > 8 && (
          <button onClick={loadLess} id="loadless" className="btn-main lead mr-2">
            Load Less
          </button>
        )}
        {itemDisplay < items.length && (
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
