import React, { useState } from 'react'
import styles from './shop_register.module.css';
import registerimage from '../../Assets/Images/registration.png'
import Checkbox from '../Custom/checkbox';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL_PRODUCTS } from '../../Api/api';
import CircularProgress from '@mui/joy/CircularProgress';

const ShopRegistration = () => {

    /* ed-o-neil-AvvdZlhDowA-unsplash 1 */




    const [btnLoader, setBtnLoader] = useState(false);
    const [shopDetails, setShopDetails] = useState({
        shopName: "",
        OwnerName: "",
        OwnerNumber: 12342567,
        OwnerEmail: "",
        OwnerAdd: "",




    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShopDetails({
            ...shopDetails,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        setBtnLoader(true);

        console.log(shopDetails)

        if (shopDetails.shopName === "" ||
            shopDetails.OwnerName === "" ||
            shopDetails.OwnerNumber === "" ||
            shopDetails.OwnerEmail === "" ||
            shopDetails.OwnerAdd === ""
        ) {
            toast.error("Enter valid Credentials")
            setBtnLoader(false)

        }
        else {
            try {
                const res = await axios.post(`${BASE_URL_PRODUCTS}api/addshop`, {
                    ...shopDetails
                })
                const response = res.json();
                console.log(response)
                toast.success('Shop Registered Successfully')
                setBtnLoader(false)
            } catch (error) {
                console.log(error)
                toast.error("Some Error Occured")
                setBtnLoader(false)
            }
        }
    }

    return (

        <>

            <div>
                <div className={styles.shop_register_main}>
                    <div className={styles.bg_image}>
                        <img src={registerimage} alt="not found" />

                    </div>
                    <div className={styles.form_main}>
                        <div className={styles.form_top}>
                            <h2>SELLER REGISTRATION FORM</h2>
                        </div>
                        <div className={styles.scrollable_form}>
                            <span className={styles.inputs}>
                                <div className="Form-inputs">
                                    <label for="Shop-name">Shop Name</label>
                                    <input type="text" id="Shop-name" />
                                </div>
                                <div className="Form-inputs">
                                    <label for="Shop-name">Owner/Manager Name: Name</label>
                                    <input type="text" id="Shop-name" />
                                </div>
                                <div className="Form-inputs">
                                    <label for="Shop-name">Owner/Manager Contact Number:</label>
                                    <input type="text" id="Shop-name" />
                                </div>
                                <div className="Form-inputs">
                                    <label for="Shop-name">Owner/Manager Email Address:</label>
                                    <input type="text" id="Shop-name" />
                                </div>
                                <div className="Form-inputs">
                                    <label for="Shop-name">Owner/Manager Birth Date:</label>
                                    <input type="date" id="Shop-name" />
                                </div>
                                <div className="Form-inputs">
                                    <label for="Shop-name">Owner/Manager Physical Address:</label>
                                    <input type="text" id="Shop-name" />
                                </div>
                                <div className="Form-inputs">
                                    <label for="Shop-name">Adhar Number:</label>
                                    <input type="text" id="Shop-name" />
                                </div>
                                <div className="Form-inputs">
                                    <label for="Shop-name">PAN Card:</label>
                                    <input type="text" id="Shop-name" />
                                </div>

                            </span>
                            <div className={styles.submit}>
                                <button onClick={handleSubmit}>{btnLoader ? <CircularProgress size="sm" color="success" /> : "Register "}</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <Toaster />

        </>
    )
}

export default ShopRegistration