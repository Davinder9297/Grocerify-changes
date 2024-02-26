import React from "react";
import "./ProductDetails.css";


import { useLocation } from "react-router-dom";
import Stepper from "./Stepper";

const ProductDetails = () => {
  // console.log(props)
  const location=useLocation()
  const data=location.state
  let price=data.product.variants1_mrp_price-(data.product.variants1_mrp_price*(data.product["variants1_discount%"]/100))
  // console.log(data);
  // const { product.product_primary_image_url } = data;

  return (<>
    <div className="product-container">
      <img src={data.product.product_primary_image_url} alt={data.product.products_title} className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{data.product.products_title}</h2>
        {/* <p className="product-author">{author}</p> */}
        <div className="product-seller-price">
          {/* <p className="product-seller">Seller: {seller}</p> */}
          <p className="product-price">₹{price}</p>
        </div>
        <div className="product-offer-coupon">
          <p>1 Offer & 1 Coupon Applied</p>
        </div>
      </div>
    </div>
    <Stepper/>
    </>);
};

export default ProductDetails;
