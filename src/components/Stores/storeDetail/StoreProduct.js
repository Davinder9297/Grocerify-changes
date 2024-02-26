import React, { useState, useEffect } from "react";
import { BASE_URL_PRODUCTS } from "../../../Api/api";
import Products from "../../Products/products";

const StoreProduct = () => {

  const [productData, setProductData] = useState([]);
  // console.log(process.env.BASE_URL_PRODUCTS)

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL_PRODUCTS}api/products`);
      const response = await res.json();
      // console.log(response);
      setProductData(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="flex flex-row ">

      <div className="flex flex-col gap-4 pt-4 pb-6 pl-8 pr-8 bg-[#F3F3F3] w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row gap-2 w-full">
            <img src="../assests/images/foood.png" className="w-3/5 h-auto" />
            <div className="flex flex-col gap-2 w-1/5 h-auto">
              <img src="../assests/images/storeimg.png" className="" />
              <img src="../assests/images/storeimg2.png" className="" />
            </div>
            <img src="../assests/images/storeimg3.png" className="w-1/5" />
          </div>
          <div className="flex flex-col">
            <p className="text-[#000000] text-[40px] font-Gorditas">
              WOODEN LIFE STORE{" "}
            </p>
            <p className="text-[#222222] text-[20px] font-Montserrat w-[400px]">
              Shop No, 2284/3, Mariwala Town
            </p>
            <p className="text-[#222222] text-[20px] font-Montserrat w-[400px]">
              Sector 7, Chandigarh
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-[#58B310] text-[14px] font-Montserrat">
              Open now -
            </p>
            <p className="text-[#222222] text-[14px] font-Montserrat">
              9:30 am - 11pm(Today)
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center bg-[#D9D9D9] font-semibold text-[#000000] text-[14px] font-Montserrat rounded-md pl-2 pr-2 pt-1 pb-1 gap-1">
              {" "}
              <span>
                {" "}
                <img src="../assests/icons/direction.svg" />{" "}
              </span>{" "}
              Direction
            </button>
            <button className="flex flex-row items-center bg-[#D9D9D9] font-semibold text-[#000000] text-[14px] font-Montserrat rounded-md pl-2 pr-2 pt-1 pb-1 gap-1">
              {" "}
              <span>
                {" "}
                <img src="../assests/icons/bookmark.svg" />{" "}
              </span>{" "}
              Bookmark
            </button>
            <button className="flex flex-row items-center bg-[#D9D9D9] font-semibold text-[#000000] text-[14px] font-Montserrat rounded-md pl-2 pr-2 pt-1 pb-1 gap-1">
              {" "}
              <span>
                {" "}
                <img src="../assests/icons/share.svg" />{" "}
              </span>{" "}
              Share
            </button>
          </div>
        </div>
        <div>
          {" "}
          <hr className="border border-[#000000] border-[1px]" />{" "}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4 items-center">
            <p className="text-[#000000] text-[40px] font-Gorditas">
              Product Online
            </p>
            <div className="flex flex-row rounded-full gap-2 h-[26px] w-[286px] bg-[#58B310] items-center justify-between pl-2 pr-[1px]">
              <img
                src="../assests/icons/searchwhite.svg"
                className="w-[16px] h-[16px]"
              />
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 text-[#888888] font-Montserrat text-[16px] px-2 py-1 rounded-tr-full rounded-br-full h-[22px] w-[286px]"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-[200px] bg-[#58B310] text-[#FFFFFF] text-[16px] pl-2 pt-1 pb-1 pr-2 rounded-md font-semibold font-Montserrat">
              30% OFF up to ₹75 use code FEAST
            </div>
            <div className="w-[200px] bg-[#58B310] text-[#FFFFFF] text-[16px] pl-2 pt-1 pb-1 pr-2 rounded-md font-semibold font-Montserrat">
              30% OFF up to ₹75 use code FEAST
            </div>
            <div className="w-[200px] bg-[#58B310] text-[#FFFFFF] text-[16px] pl-2 pt-1 pb-1 pr-2 rounded-md font-semibold font-Montserrat">
              30% OFF up to ₹75 use code FEAST
            </div>
            <div className="w-[200px] bg-[#58B310] text-[#FFFFFF] text-[16px] pl-2 pt-1 pb-1 pr-2 rounded-md font-semibold font-Montserrat">
              30% OFF up to ₹75 use code FEAST
            </div>
          </div>
        </div>

        {/* products */}
        {/* <div className="bg-[#FFFFFF] grid grid-cols-4 gap-10 p-8 border"> */}

        <Products data={productData} />


        {/* </div> */}

        {/* ratings */}
        <div className="bg-[#FFFFFF] flex flex-col gap-2">
          <div className="flex flex-row justify-between font-Gorditas text-[#848484] text-lg pt-1 pb-1 pl-10 pr-10 hover:bg-[#58B310] hover:text-[#FFFFFF]">
            <p className="font-Gorditas text-[20px]">Rating</p>
            <p className="font-Gorditas text-[20px]">
              Show More <span className="cursor-pointer">&#9660;</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 hover:bg-[#f3f3f3] space-y-1 transform transition-transform duration-300 ease-in-out hover:scale-105">
              <img src="../assests/images/ratingimg1.svg" className="w-full" />
              <div className="flex flex-row justify-between text-xl">
                <h4 className="font-Gorditas text-[#000000]">Nemo enim</h4>
                <span className="text-[#FFB800]">
                  &#9733;&#9733;&#9733;&#9733;&#9734;
                </span>
              </div>
              <p className="font-andika text-sm pb-4">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis…”
              </p>
            </div>
            <div className="p-4 hover:bg-[#f3f3f3] space-y-1 transform transition-transform duration-300 ease-in-out hover:scale-105">
              <img src="../assests/images/ratingimg2.svg" className="w-full" />
              <div className="flex flex-row justify-between text-xl">
                <h4 className="font-Gorditas text-[#000000]">Amlo Sinha</h4>
                <span className="text-[#FFB800]">
                  &#9733;&#9733;&#9733;&#9733;&#9734;
                </span>
              </div>
              <p className="font-andika text-sm">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis…”
              </p>
            </div>
            <div className="p-4 hover:bg-[#f3f3f3] space-y-1 transform transition-transform duration-300 ease-in-out hover:scale-105">
              <img src="../assests/images/ratingimg3.svg" className="w-full" />
              <div className="flex flex-row justify-between text-xl">
                <h4 className="font-Gorditas text-[#000000]">Mauscosf</h4>
                <span className="text-[#FFB800]">
                  &#9733;&#9733;&#9733;&#9733;&#9734;
                </span>
              </div>
              <p className="font-andika text-sm">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis…”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProduct;
