
import { createContext, useState, useEffect } from 'react';
import { BASE_URL_PRODUCTS } from './Api/api';
import './App.css';
import Router from './Routes/route';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export const Globalinfo = createContext()

const queryClient = new QueryClient()

function App() {
  const [cartData, setCartData] = useState([])
  const [wishListData, setWishListData] = useState([])
  const [userDetail, setUserDetail] = useState();


  useEffect(() => {
    // console.log(cartData)
    getUserDetails();
    GetCart()
    GetWishList()
  }, [localStorage.getItem('GROC_USER_TOKEN'), userDetail?._id])


  async function GetCart() {

    if (userDetail?._id) {
      try {
        let url = BASE_URL_PRODUCTS+`api/getcart?mobile=${userDetail?.mobile}`
        const data = await fetch(url)
        const response = await data.json()
        // console.log(response.cart[0])
        setCartData(response?.cart || [])
        
      } catch (error) {
        console.log(error)
      }
    }


  }
  async function GetWishList() {
    try {
      let url = BASE_URL_PRODUCTS + `api/getwishlist?mobile=${userDetail?.mobile}`
      const data = await fetch(url)
      const response = await data.json()
      // console.log(response)
      setWishListData(response?.wishlist || [])
    } catch (error) {
      console.log(error)
    }
  }

  const getUserDetails = async () => {
    // console.log(localStorage.getItem('GROC_USER_TOKEN'))
    const token = localStorage.getItem('GROC_USER_TOKEN')
    // console.log(token)
    if (token) {
      const decoded = jwtDecode(token);
      // console.log(decoded.email)
      try {
        const res = await axios.get(`${BASE_URL_PRODUCTS}api/user?email=${decoded.email}`)
        // console.log(res.data.data)
        setUserDetail(res.data.data)

      } catch (error) {
        console.log(error)
      }

    }
    else {
      setUserDetail({})
    }


  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <>
      <Globalinfo.Provider value={{ cartData, GetCart, wishListData, GetWishList, userDetail, getUserDetails }}>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <Router />
          </div >
        </QueryClientProvider>
      </Globalinfo.Provider>
    </>
  );
}

export default App;
