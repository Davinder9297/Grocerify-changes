import './addtocart.css'
import { ReactComponent as Arrow } from '../../Assets/Icons/arrow.svg'
import { ReactComponent as Delete } from '../../Assets/Icons/delete.svg'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { BASE_URL_PRODUCTS } from '../../Api/api'
import { useContext } from 'react';
import { Globalinfo } from '../../App';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
export default function Addtocart() {

    const [Data, setData] = useState([])
    const [items, setitems] = useState([])
    const [quantities, setquantities] = useState([{}])
    const [subtotal, setsubtotal] = useState()
    const [totalitems, settotalitems] = useState()
    const [total, settotal] = useState()
    const [deliverycharges, setdeliverycharges] = useState()
    const [show, setshow] = useState(false)
    const [orderData, setorderData] = useState([])
    // const [final, setfinal] = useState([])
    const { cartData, GetCart, wishListData, GetWishList, userDetail, getUserDetails } = useContext(Globalinfo)
    // console.log(cartData)
   let token=localStorage.getItem('GROC_USER_TOKEN');
   let decode=jwtDecode(token)
    async function OrderSummery() {

        try {
            let url = BASE_URL_PRODUCTS+`api/getcart?mobile=${decode.mobile}`
            const data = await fetch(url)
            const response = await data.json()
            let final =response.cart;
            let subttotal_amount = 0
            let total_items = 0

            final.forEach((item) => {
                if (item.product) {
// console.log(item)
                    let price = item.product.variants1_mrp_price - (item.product.variants1_mrp_price * (item.product["variants1_discount%"] / 100))

                    subttotal_amount += price * item.quantity;
                    total_items += item.quantity;
                }
            })
            setsubtotal(subttotal_amount)
            settotalitems(total_items)
        } catch (error) {
            return (<h1> Error</h1>)
            console.log(error)
        }



        // console.log(subttotal_amount,total_items)
    }
    useEffect(() => {
        OrderSummery()
    }, [])



    // console.log(cartData)
 




    async function NegativeButtonhandle(id) {
        setshow(true)

        let url2 = BASE_URL_PRODUCTS + 'api/removefromcart'
        let bodydata2 = { mobile: userDetail?.mobile, productid: id, operation: "removeOne" }

        const data2 = await fetch(url2, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodydata2)
        });
        const response = await data2.json()

        setData(response.data)
        GetCart()
        OrderSummery()

        setshow(false)

        // console.log(response)
        // setData(response)
    }
    // It is used to apply operation on increasing the quantity of items

    async function PositiveButtonhandle(id) {
        setshow(true)
        let url2 = BASE_URL_PRODUCTS + 'api/addtocart'
        let bodydata2 = { mobile: userDetail?.mobile, productid: id }

        const data2 = await fetch(url2, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodydata2)
        });
        const response = await data2.json()
        setData(response.data)
        GetCart()
        OrderSummery()
        setshow(false)

        // console.log(response)

    }
    async function DeleteItem(id) {
        setshow(true)

        let url2 = BASE_URL_PRODUCTS + 'api/removefromcart'
        let bodydata2 = { mobile: userDetail?.mobile, productid: id, operation: "removeAll" }

        const data2 = await fetch(url2, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodydata2)
        });
        const response = await data2.json()
        OrderSummery()

        GetCart()
        setshow(false)

    }

    return (<>
        <div className="w-full px-14 text-[#848484] space-y-4 py-5">
            <div className="text-[24px] fontcart">YOUR CART ({cartData?.length} Items)</div>
            <div className='h-[2px] w-full bg-[#848484] '></div>
            <div className='flex justify-between '>

                <div className="leftside w-3/5    space-y-5">

                    {
                        cartData.map((item) => {
                            // console.log(item)
                            // setquantities({...quantities,id:item.product._id})
                            if (item?.product) {

                                var price = item?.product?.variants1_mrp_price - (item?.product?.variants1_mrp_price * (item?.product["variants1_discount%"] / 100))
                            }
                            return (<>
                                <div className='flex rounded-lg w-full border bg-[#FAFAF5] space-x-3 pl-2 items-center '>
                                    <div className='w-28 h-28  flex justify-center items-center '>
                                        <img className='max-h-full max-w-full mix-blend-multiply' src={item?.product?.product_primary_image_url} />
                                    </div>
                                    <div className='flex flex-col w-full fontorder max-h-auto'>
                                        <div className='flex justify-between pr-5 font-semibold text-[16px]'>
                                            <div>{item?.product?.products_title} </div>
                                            <div >₹{price}</div>
                                        </div>
                                        <div className='text-[#426B1F] fontcart text-[14px] mt-2'>₹{price}</div>
                                        <div className='flex justify-between pr-5  items-center mt-4'>
                                            <div className='flex  items-center space-x-2  w-fit mb-2'>
                                                <button value="minus" onClick={() => NegativeButtonhandle(item.product._id)} className={`flex items-center ${items[0]?.disable}`}><FaMinus /></button>
                                                <div className='min-w-7 min-h-6 bg-white border border-[rgb(175,175,175)] text-center'>{item.quantity}</div>
                                                <button name="plus" onClick={() => PositiveButtonhandle(item.product._id)}><FaPlus /></button>
                                            </div>
                                            <button onClick={() => DeleteItem(item.product._id)}><Delete /></button>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        })
                    }

                </div>
                <div className='ordersummery w-[30%] bg-[#FAFAF5] rounded-lg border px-4 space-y-3 py-4 h-fit'>
                    <div className='fontcart font-bold'>Order Summery</div>
                    <div className='flex justify-between fontorder'>
                        <div>Subtotal</div>
                        <div>₹{subtotal}</div>
                    </div>
                    <div className='flex justify-between fontorder'>
                        <div>Total items</div>
                        <div>{totalitems}</div>
                    </div>
                    {/* <div className='flex justify-between fontorder'>
                        <div>Tax</div>
                        <div>₹0</div>
                    </div> */}
                    <div className='flex justify-between fontorder'>
                        <div>Cupon code</div>
                        <div>F5SFDI65</div>
                    </div>
                    <div className='flex justify-between fontorder'>
                        <div>Delivery charges</div>
                        <div className='flex space-x-1'>
                            <div className='txt'>₹40</div>
                            <div>Free</div>
                        </div>
                    </div>
                    <div className='flex justify-between fontorder font-bold'>
                        <div>Total</div>
                        <div>₹{subtotal}</div>
                    </div>
                    <Link to={'/checkout'}> <button className=' flex fontorder bg-[#426B1F] text-white items-center w-full  rounded-lg justify-around h-10 font-semibold '>
                        <div >
                            Continue to payments
                        </div>
                        <Arrow />
                    </button>
                    </Link>
                </div>
            </div>
            {show ? <div className='w-full h-screen fixed -top-4 left-0 bg-[#b4cca1] opacity-80'>
                <Spinner className='' />

            </div> : ''}
        </div>

    </>)
}