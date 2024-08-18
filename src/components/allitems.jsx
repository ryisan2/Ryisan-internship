import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./UI/Countdown";

const AllItems = ({ item }) => {
  return (
    <div className="nft__item mb-5 h-full" data-aos="fade-in">
      <div className="flex items-start author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${item.authorName}`}
        >
          <img
            className="lazy h-8 w-12 rounded-full"
            src={item.authorImage}
            alt=""
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      <div className="mb-5">
        {item.expiryDate && (
          <div className="flex align-center pt-5">
            <Countdown key={item.id} expiryDate={item.expiryDate} />
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <Link to={`/item-details/${item.nftId}`}>
          <img
            src={item.nftImage}
            className="lazy h-48 w-full object-cover"
            alt=""
          />
        </Link>
      </div>

      <div className="nft__item_info min-h-[100px] mt-4">
        <Link to={`/item-details/${item.nftId}`}>
          <h4 className="text-center">{item.title || "Untitled"}</h4>
        </Link>
        <div className="nft__item_price text-center">
          {item.price} ETH
        </div>
        <div className="nft__item_like text-center">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default AllItems;
