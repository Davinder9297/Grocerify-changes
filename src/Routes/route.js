import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar';
import NavList from '../components/Navbar/NavList';
import Addtocart from '../components/AddToCart';
import AddToWishlist from '../components/AddToWishlist'
import Product from '../components/Product'
import Home from '../components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../components/Register/register';
import Login from '../components/Login/login';
import ProductPage from '../components/ProductPage/productpage';
import VerifyOTP from '../components/verifyOTP/verifyOTP';
import FeaturedStore from '../components/Stores/FeaturedStore';
import ShopRegistration from '../components/shop_register/shop_register';
import Footer from '../components/Footer';
import Account from '../components/Account/Account';
import Addresses from '../components/Address/Addresss';
// import Orders from '../components/Orders/orders';
import MyOrders from '../components/Orders';
import AddAddress from '../components/Address/AddAddress';
import PaymentOptions from '../components/Account/PaymentOptions';
import ContactUs from '../components/Account/ContactUs';
import Coupons from '../components/Account/coupons';
import ShippingPolicy from '../components/policies/ShippingPolicy';
import ReturnPolicy from '../components/policies/ReturnPolicy';
import Frequency from '../components/policies/Frequency';
import MoreStore from '../components/Stores/MoreStore';
import About from '../components/About/index'
import LoginAndSecurity from '../components/Account/login&security';
import Checkout from '../components/Checkout/index'
import Editaddress from '../components/Address/EditAddress';
import ChatBot from '../components/chatbot/chatbot';
import StoreProduct from '../components/Stores/storeDetail/StoreProduct';
import StoreDetails from '../components/Stores/storeDetail';
import ScrollToTop from '../components/scrollToTop';
import Success from '../components/Success/success';
import ProductDetails from '../components/Track_order/OrderProduct';

const Router = () => {






    return (
        <div>



            <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
                <ScrollToTop />
                <Navbar />
                <NavList />
                <Routes>
                    <Route exact path={'/'} element={<Home />}>

                    </Route>
                    <Route exact path={'/register'} element={<Register />}>

                    </Route>
                    <Route exact path={'/login'} element={<Login />}>

                    </Route>
                    <Route exact path={'/products'} element={<ProductPage />}>

                    </Route>
                    <Route exact path={'/verify_otp'} element={<VerifyOTP />}>

                    </Route>
                    <Route exact path={'/cart'} element={<Addtocart />}>

                    </Route>
                    <Route exact path={'/wishlist'} element={<AddToWishlist />}>

                    </Route>
                    <Route exact path={'/product/:slug'} element={<Product />}>

                    </Route>
                    <Route exact path={'/stores'} element={<FeaturedStore />}>

                    </Route>
                    <Route exact path={'/stores/more_store'} element={<MoreStore />}>

                    </Route>
                    <Route exact path={'/shop_registration'} element={<ShopRegistration />}>

                    </Route>
                    <Route exact path={'/account'} element={<Account />}>

                    </Route>
                    <Route exact path={'/account/myOrders'} element={<MyOrders />}>

                    </Route>
                    <Route exact path={'/account/address'} element={<Addresses />}>

                    </Route>
                    <Route exact path={'/account/addresses/add_address'} element={<AddAddress />}>

                    </Route>
                    <Route exact path={'/account/addresses/edit_address'} element={<Editaddress />}>

                    </Route>
                    <Route exact path={'/account/your_information'} element={<LoginAndSecurity />}>

                    </Route>
                    <Route exact path={'/account/payment'} element={<PaymentOptions />}>

                    </Route>
                    <Route exact path={'/contact_us'} element={<ContactUs />}>

                    </Route>
                    <Route exact path={'/account/coupons'} element={<Coupons />}>

                    </Route>
                    <Route exact path={'/shipping_policy'} element={<ShippingPolicy />}>

                    </Route>
                    <Route exact path={'/return_policy'} element={<ReturnPolicy />}>

                    </Route>
                    <Route exact path={'/faq'} element={<Frequency />}>

                    </Route>
                    <Route exact path={'/about'} element={<About />}>

                    </Route>
                    <Route exact path={'/checkout'} element={<Checkout />}>

                    </Route>
                    <Route exact path={'/view_store'} element={<StoreDetails />}>

                    </Route>
                    <Route exact path={'/success'} element={<Success />}>

                    </Route>
                    <Route exact path={'/account/myOrders/track'} element={<ProductDetails/>}>

                    </Route>

                </Routes>
                <ChatBot />
                <Footer />
            </BrowserRouter >
        </div >
    )
}

export default Router