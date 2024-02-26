import React, { useState, useEffect, useContext } from 'react'
// import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { ReactComponent as Loc } from '../../Assets/Icons/loc.svg'
import { ReactComponent as Cart } from '../../Assets/Icons/cart.svg'
import { ReactComponent as Wishlist } from '../../Assets/Icons/wishlist_green.svg'
import { ReactComponent as User } from '../../Assets/Icons/user.svg'
import { ReactComponent as Account } from '../../Assets/Icons/account.svg'
import { ReactComponent as Search } from '../../Assets/Icons/search.svg'
import logoimg from '../../Assets/Images/logo.png';
import { Link } from 'react-router-dom'
import { Globalinfo } from '../../App'

const Navbar = () => {
    const [location, setLocation] = useState("");
    const [token, settoken] = useState('')
    const { cartData, GetCart, wishListData, GetWishList, userDetail, getUserDetails } = useContext(Globalinfo)
    // console.log(cartData)
    // useEffect(() => {
    //     GetCart()
    //     GetWishList()
    //     settoken(localStorage.getItem('GROC_USER_TOKEN'))
    // }, [localStorage.getItem('GROC_USER_TOKEN')])


    const getLocationAddress = async (lati, longi) => {
        // console.log(lati, longi);
        try {
            const res = await fetch(
                `https://geocode.maps.co/reverse?lat=${lati}&lon=${longi}&api_key=65bb467db90ab669670150tzu3dcab7`
            );
            const response = await res.json();
            // console.log(response);
            setLocation(response.address.village);
        } catch (error) {
            // console.log(error);
        }
    };

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    function success(pos) {
        var crd = pos.coords;

        getLocationAddress(crd.latitude, crd.longitude);
    }

    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    // console.log(result);
                    if (result.state === "granted") {
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "prompt") {
                        //If prompt then the user will be asked to give permission
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                    }
                });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        handleLocation();
    }, []);

    // console.log(location)

    return (
        <div className={`${styles.nav_main}`}>
            <div className={styles.nav_row}>
                <div className={styles.logo_container}>

                    <a href="/">
                        <img src={logoimg} alt="Logo not found" />
                    </a>
                </div>
                <div className={styles.search}>

                    <div className={styles.search_icon}>
                        <Search />
                    </div>
                    <input type="text" name="search" id="" placeholder='search here ....' />

                </div>
                <div className={styles.location}>
                    <Loc />
                    <p>Delivery to</p><h5>{location}</h5>

                </div>
                <div className={styles.icons}>
                    <Link to={'/wishlist'}>  <span>
                        <Wishlist />
                        <span className='relative right-2 bottom-2 text-[#58B310] text-sm'>{wishListData?.length}</span>

                    </span> </Link>

                    <Link to={'/cart'}>
                        <span className='flex'>
                            <Cart />
                            <span className='relative right-2 bottom-2 text-[#58B310] text-sm'>{cartData?.length}</span>
                        </span> </Link>
                    {userDetail?._id ? < Link to="/account" style={{ cursor: "pointer" }}>  <span>
                        <Account />


                    </span> </Link> : < Link to="/login" style={{ cursor: "pointer" }}>  <span>
                        <User />
                        <h5>Sign In</h5>

                    </span> </Link>}
                </div>
            </div>
        </div >
    )
}

export default Navbar