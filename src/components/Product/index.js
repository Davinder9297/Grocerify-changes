import { ReactComponent as Star } from '../../Assets/Icons/star.svg'
import { ReactComponent as Down } from '../../Assets/Icons/down.svg'
import { ReactComponent as Box } from '../../Assets/Icons/chatbox.svg'
import { ReactComponent as Emptystar } from '../../Assets/Icons/emptystar.svg'
import { FaPlus } from "react-icons/fa6";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './product.css'
import { useEffect, useRef, useState } from 'react'

import { BASE_URL_PRODUCTS } from '../../Api/api';
import { Link } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';


export default function Product() {
    const params = useParams();
    // console.log(params)
    // console.log(window.location)
    // console.log(props)
    const [image, setimage] = useState('/mobile.png')
    const [show, setshow] = useState('h-28')
    const [reportshow, setreportshow] = useState('hidden')
    const [reportValue, setreportValue] = useState('')
    const [showdelivery, setshowdelivery] = useState('hidden')
    const [Data, setData] = useState([])
    const [actualprice, setactualprice] = useState()
    const [images, setimages] = useState([])
    const [video, setvideo] = useState([])
const [store, setstore] = useState([])
    // const [showvideo, setshowvideo] = useState(false)

    const primaryRef = useRef(null);
    const secondaryRef = useRef(null);

    const slug = params.slug
    // const slug = window.location.pathname;

    let price = 0
    useEffect(() => {
        async function Fetchdata() {
            try {
                let url = BASE_URL_PRODUCTS + 'api/product/' + slug
                const data = await fetch(url)
                const response = await data.json()
                // console.log(response)
                price = response[0].variants1_mrp_price - (response[0].variants1_mrp_price * (response[0]["variants1_discount%"] / 100))
                setstore(response[0].stores)
                setactualprice(price)
                setimage(response[0].product_primary_image_url)
                setData(response[0])
                setimages(response[0].product_images_url)
                // console.log(response[0].product_videos_url[0])
                setvideo(response[0].product_videos_url[0])
                if (primaryRef.current) {
                    // @ts-ignore
                    primaryRef.current.sync(secondaryRef.current.splide);
                }
            } catch (error) {
                console.log(error)
            }

            // setitems([...Data])
        }
        


        Fetchdata()
    }, [primaryRef, secondaryRef])

    function Showmore() {
        // console.log('hello')
        setshow('h-auto')
    }
    function ShowDeliveryContent() {
        if (showdelivery == 'hidden') {
            setshowdelivery('')
        }
        else {
            setshowdelivery('hidden')
        }
    }

    return (<>
        {/* <Extra /> */}

        <div className="flex  pb-5  justify-center px-16">
            <div className="w-1/2    ">
                <div className="flex  border-r-2 border-b-2 py-5 pr-4 h-[519px] ">
                    <div className=" w-1/4 space-y-3 ">
                        <Splide className='h-full'
                            ref={(slider) => (primaryRef.current = slider)}
                            options={{
                                pagination: false,
                                isNavigation: true,
                                autoWidth: true,
                                perPage: 4,
                                // gap: "10px",
                                direction: "ttb",
                                height: "100%",
                            }}
                        >
                            {
                                // console.log(Data.product_images_url)
                                images.map((item, index) => {
                                    // console.log(item)
                                    return (<>
                                        <SplideSlide key={index}>
                                            <div className="w-32 h-24 flex justify-center items-center bg-[#f3f3f3] mb-2">
                                                <img className='h-[80px]  mix-blend-multiply' src={item} />
                                            </div>
                                        </SplideSlide>
                                    </>)
                                })
                            }


                            <SplideSlide >
                                <div className="w-32 h-24 flex justify-center items-center bg-[#f3f3f3] mb-2">
                                    <ReactPlayer playing={false} muted height={70} width={150} url={video} />
                                </div>
                            </SplideSlide>
                        </Splide>

                    </div>
                    <div className="w-3/4  bg-[#f3f3f3] flex justify-center items-center max-h-full mix-blend-multiply">

                        <Splide
                            ref={(slider) => (secondaryRef.current = slider)}
                            options={{
                                perPage: 1,
                                pagination: false,
                                arrows: false,
                                width: "100%",
                            }}
                        >
                            <SplideSlide className='flex justify-center items-center  bg-[#f3f3f3]'>
                                <img className='max-h-full mix-blend-multiply max-w-full' src={image} />
                            </SplideSlide>
                            {
                                images.map((item) => {
                                    // console.log()
                                    return (<>
                                        <SplideSlide id={`#${item}`} className='flex justify-center items-center bg-[#f3f3f3]'>
                                            <ReactImageMagnify
                                                {...{
                                                    smallImage: {
                                                        alt: "Wristwatch by Ted Baker London",
                                                        isFluidWidth: true,
                                                        src: item,
                                                        borderRadius: 15,
                                                        objectFit: "cover",
                                                        // height:"45vh"
                                                    },
                                                    largeImage: {
                                                        src: item,
                                                        width: 500,
                                                        borderRadius: 15,
                                                        height: 600,
                                                        objectFit: "cover",
                                                    },
                                                    enlargedImagePosition: "over"
                                                }}
                                            />

                                        </SplideSlide>
                                    </>)

                                })
                            }
                            <SplideSlide className='flex justify-center items-center  bg-[#f3f3f3]'>
                                <ReactPlayer loop controls={false} url={video} />

                            </SplideSlide>
                        </Splide>

                    </div>
                </div>

                <div className='text-[#848484] text-[20px] space-y-2 mt-2 fontmont'>
                    <div className='text-[#848484] text-[20px]'>
                        {
                            Data.products_title
                        }
                    </div>
                    <div className="flex space-x-2">
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </div>
                    <div >
                        ₹{actualprice}
                    </div>
                    <div className='text-[14px] '>
                        incl. of taxes (Also includes all applicable duties)
                    </div>
                    <div className='flex w-full justify-between '>
                        <button className='bg-[#58B310] px-4 py-1 rounded text-white text-[16px]'>Add To Cart</button>
                        <button className='bg-[#58B310] px-4 py-1 rounded text-white text-[16px]'>Buy Now</button>
                    </div>
                </div>

                <div className='border-t-2 pt-3 mt-4 space-y-2 fontmont'>
                    <div className='text-[#848484] text-[16px] '>Colour - Midnight Grey</div>
                    <div className='flex space-x-3'>
                        <button className='h-5 w-5 bg-black rounded-full'></button>
                        <button className='h-5 w-5 bg-[#FEE4FF] rounded-full'></button>
                        <button className='h-5 w-5 bg-[#F9EDCE] rounded-full'></button>
                        <button className='h-5 w-5 bg-[#E70000] rounded-full'></button>
                    </div>
                    <div className='flex space-x-8 mt-4 text-[#848484]'>
                        <div>Size : </div>
                        <div className='flex space-x-4 text-[#848484]'>
                            <button className='bg-[#f3f3f3] px-2 rounded'>512 GB</button>
                            <button className='bg-[#f3f3f3] px-2 rounded'>258 GB</button>
                            <button className='bg-[#f3f3f3] px-2 rounded'>128 GB</button>
                        </div>
                    </div>
                </div>

                <div className='w-[85%] fontmont text-[#848484] space-y-1 mt-5'>
                    <div className='flex justify-between'>
                        <div>Brand</div>
                        <div>Apple</div>
                    </div>
                    <div className='flex justify-between'>
                        <div>Model</div>
                        <div>iPhone 7</div>
                    </div>
                    <div className='flex justify-between'>
                        <div>Network Service Provider</div>
                        <div>Unlocked For All Carriers</div>
                    </div>
                    <div className='flex justify-between'>
                        <div>Operating System</div>
                        <div>iOS</div>
                    </div>
                    <div className='flex justify-between'>
                        <div>Cellular Technology</div>
                        <div>5G</div>
                    </div>
                </div>

                <div className='fontmont text-[#848484] mt-4 py-2 border-t-2'>
                    <div className='font-semibold'>About this item</div>
                    <ul className={`pl-8 space-y-1  overflow-y-hidden ${show}`} >
                        <li className="list-disc"> {
                            Data.products_description
                        }</li>

                    </ul>
                    <button className='flex items-center space-x-1' onClick={Showmore}>
                        <Down />
                        <div className='font-semibold'>Show more</div>
                    </button>

                </div>

                <div className='flex items-center space-x-1 mt-4 cursor-pointer' onClick={() => setreportshow('')}>
                    <Box />
                    <div className='text-[#58B310]' >Reporting an issue with this product</div>
                </div>

                <div className={`flex items-center pl-4 mt-2  ${reportshow}`}>
                    <input value={reportValue} onChange={(e) => setreportValue(e.target.value)} className='w-[45%] py-1  border-1 border-[#c6f79b] outline-none rounded-r-lg focus-within:border-[#abeb74] focus-within:shadow-lg pl-1' />
                    <button onClick={() => console.log(reportValue)} className='bg-[#58B310] text-white h-full relative right-16 rounded-r-lg px-2 py-1 '>Report</button>
                </div>

                <div onClick={ShowDeliveryContent} className='flex w-full justify-between py-4 border-t-2 mt-4 fontmont  text-[#848484] text-[16px] cursor-pointer'>
                    <div>Delivery & Returns</div>
                    <Down />
                </div>

                <div className={`fontmont text-[#848484] pl-5 ${showdelivery}`}>
                    <div className='font-semibold'>This product will delivered to you</div>
                    <ul className='pl-8'>
                        <li className='list-disc'>By 22 Feburary</li>
                    </ul>
                    <div>
                        <div className='font-semibold'>This product is not refundable</div>
                        <ul className='pl-8'>
                            <li className='list-disc'>Only replaceable</li>
                            <li className='list-disc'>Not refundable</li>
                        </ul>
                    </div>
                </div>

                <div className='flex w-full justify-between py-4  border-t-2 fontmont  text-[#848484] text-[16px]'>
                    <div>Reviews</div>
                    <div className='flex'>
                        <Emptystar />
                        <Emptystar />
                        <Emptystar />
                        <Emptystar />
                        <Emptystar />
                    </div>
                </div>

                <div className='flex mt-2 w-full '>
                    <div className='flex flex-col'>
                        <div className='flex w-[170px] justify-between   '>
                            <div className='w-20 h-16 border' data-bs-toggle="modal" href="#exampleModalToggle" role="button"><img className='w-full h-full' src='/apple.png' /></div>
                            <div className='w-20 h-16 border' data-bs-toggle="modal" href="#exampleModalToggle" role="button"><img className='w-full h-full' src='/apple.png' /></div>
                        </div>
                        <div className='flex w-[170px] justify-between  items-center  mt-2'>
                            <div className='w-20 h-16 border' data-bs-toggle="modal" href="#exampleModalToggle" role="button"><img className='w-full h-full' src='/apple.png' /></div>
                            <div className='w-20 h-16 flex justify-center items-center bg-gray-400' data-bs-toggle="modal" href="#exampleModalToggle" role="button"><FaPlus /></div>
                        </div>
                    </div>

                    <div className='w-full ml-3 fontmont'>
                        <div className='flex justify-between'>
                            <div className='flex space-x-3 items-center'>
                                <div className='rounded-full h-8 w-8 border bg-slate-400 flex justify-center items-center'>
                                    <img src='/logo192.png' />
                                </div>
                                <div>Davinder Kumar</div>
                            </div>
                            <div className='flex '>
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>
                        </div>

                        <div className='text-center mt-2'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…”</div>
                    </div>
                </div>


            </div>
            <div className='w-1/2 pl-8 pt-4'>
                <div className='text-[#848484] text-[20px] fontgo'>Nearest Stores</div>
                <div className='w-full space-y-5'>
                   
                    {
                        store.length>0 && store.map((item)=>{
                            console.log(item)
                            return(<>
                            <div className='flex rounded-lg w-full border bg-[#FAFAF5] py-4 space-x-5 px-3 mt-4'>
                        <div className=' flex items-center justify-center relative'>
                            <div className='absolute bg-[#58B310] h-8 w-8 rounded-full -top-2 -left-2  text-center fontgo text-white flex flex-col pt-[2px]'>
                                <div className='text-[10px]'>20%</div>
                                <div className='text-[8px]'>off</div>
                            </div>
                            <img className='max-h-52 max-w-32' src={item.product_primary_image_url} />

                        </div>
                        <div className='flex flex-col w-full fontmont text-[#848484]'>
                            <div className='flex justify-between  font-bold fontmont text-[16px] text-[#848484]'>
                                <div>{item.shopName}</div>
                                <div className='flex '>
                                    <div>₹2000</div>
                                    <div className='txtc text-[10px]'>₹3000</div>
                                </div>
                            </div>
                            <div>{item.ShopAddress}</div>
                            <div>Delivery by Sun, 12 Feb</div>
                            <div>2.1km</div>
                            <div className='flex justify-between items-center'>
                                <div className='text-[14px] text-[#58B310] font-semibold'>Open now  - {item.openingHours.from}am - {item.openingHours.to}pm</div>
                                <button>Buy Now</button>

                            </div>
                        </div>
                    </div>
                            </>)
                        })
                        
                    }
                    {/* <div className='flex rounded-lg w-full border bg-[#FAFAF5] py-4 space-x-5 px-3 mt-4'>
                        <div className=' flex items-center justify-center relative'>
                            <div className='absolute bg-[#58B310] h-8 w-8 rounded-full -top-2 -left-2  text-center fontgo text-white flex flex-col pt-[2px]'>
                                <div className='text-[10px]'>20%</div>
                                <div className='text-[8px]'>off</div>
                            </div>
                            <img className='h-full w-full ' src='/target.png' />

                        </div>
                        <div className='flex flex-col w-full fontmont text-[#848484]'>
                            <div className='flex justify-between  font-bold fontmont text-[16px] text-[#848484]'>
                                <div>The Target</div>
                                <div className='flex '>
                                    <div>₹2000</div>
                                    <div className='txtc text-[10px]'>₹3000</div>
                                </div>
                            </div>
                            <div>Sector 22C , Chandigarh (Electronics)</div>
                            <div>Delivery by Sun, 12 Feb</div>
                            <div>2.1km</div>
                            <div className='flex justify-between items-center'>
                                <div className='text-[14px] text-[#58B310] font-semibold'>Open now  - 11noon - 9:30pm</div>
                                <button>Buy Now</button>

                            </div>
                        </div>
                    </div>
                    <div className='flex rounded-lg w-full border bg-[#FAFAF5] py-4 space-x-5 px-3 mt-4'>
                        <div className=' flex items-center justify-center relative'>
                            <div className='absolute bg-[#58B310] h-8 w-8 rounded-full -top-2 -left-2  text-center fontgo text-white flex flex-col pt-[2px]'>
                                <div className='text-[10px]'>20%</div>
                                <div className='text-[8px]'>off</div>
                            </div>
                            <img className='h-full w-full ' src='/target.png' />

                        </div>
                        <div className='flex flex-col w-full fontmont text-[#848484]'>
                            <div className='flex justify-between  font-bold fontmont text-[16px] text-[#848484]'>
                                <div>The Target</div>
                                <div className='flex '>
                                    <div>₹2000</div>
                                    <div className='txtc text-[10px]'>₹3000</div>
                                </div>
                            </div>
                            <div>Sector 22C , Chandigarh (Electronics)</div>
                            <div>Delivery by Sun, 12 Feb</div>
                            <div>2.1km</div>
                            <div className='flex justify-between items-center'>
                                <div className='text-[14px] text-[#58B310] font-semibold'>Open now  - 11noon - 9:30pm</div>
                                <button>Buy Now</button>

                            </div>
                        </div>
                    </div>
                    <div className='flex rounded-lg w-full border bg-[#FAFAF5] py-4 space-x-5 px-3 mt-4'>
                        <div className=' flex items-center justify-center relative'>
                            <div className='absolute bg-[#58B310] h-8 w-8 rounded-full -top-2 -left-2  text-center fontgo text-white flex flex-col pt-[2px]'>
                                <div className='text-[10px]'>20%</div>
                                <div className='text-[8px]'>off</div>
                            </div>
                            <img className='h-full w-full ' src='/target.png' />

                        </div>
                        <div className='flex flex-col w-full fontmont text-[#848484]'>
                            <div className='flex justify-between  font-bold fontmont text-[16px] text-[#848484]'>
                                <div>The Target</div>
                                <div className='flex '>
                                    <div>₹2000</div>
                                    <div className='txtc text-[10px]'>₹3000</div>
                                </div>
                            </div>
                            <div>Sector 22C , Chandigarh (Electronics)</div>
                            <div>Delivery by Sun, 12 Feb</div>
                            <div>2.1km</div>
                            <div className='flex justify-between items-center'>
                                <div className='text-[14px] text-[#58B310] font-semibold'>Open now  - 11noon - 9:30pm</div>
                                <button>Buy Now</button>

                            </div>
                        </div>
                    </div>
                    <div className='flex rounded-lg w-full border bg-[#FAFAF5] py-4 space-x-5 px-3 mt-4'>
                        <div className=' flex items-center justify-center relative'>
                            <div className='absolute bg-[#58B310] h-8 w-8 rounded-full -top-2 -left-2  text-center fontgo text-white flex flex-col pt-[2px]'>
                                <div className='text-[10px]'>20%</div>
                                <div className='text-[8px]'>off</div>
                            </div>
                            <img className='h-full w-full ' src='/target.png' />

                        </div>
                        <div className='flex flex-col w-full fontmont text-[#848484]'>
                            <div className='flex justify-between  font-bold fontmont text-[16px] text-[#848484]'>
                                <div>The Target</div>
                                <div className='flex '>
                                    <div>₹2000</div>
                                    <div className='txtc text-[10px]'>₹3000</div>
                                </div>
                            </div>
                            <div>Sector 22C , Chandigarh (Electronics)</div>
                            <div>Delivery by Sun, 12 Feb</div>
                            <div>2.1km</div>
                            <div className='flex justify-between items-center'>
                                <div className='text-[14px] text-[#58B310] font-semibold'>Open now  - 11noon - 9:30pm</div>
                                <button>Buy Now</button>

                            </div>
                        </div>
                    </div>
                    <div className='flex rounded-lg w-full border bg-[#FAFAF5] py-4 space-x-5 px-3 mt-4'>
                        <div className=' flex items-center justify-center relative'>
                            <div className='absolute bg-[#58B310] h-8 w-8 rounded-full -top-2 -left-2  text-center fontgo text-white flex flex-col pt-[2px]'>
                                <div className='text-[10px]'>20%</div>
                                <div className='text-[8px]'>off</div>
                            </div>
                            <img className='h-full w-full ' src='/target.png' />

                        </div>
                        <div className='flex flex-col w-full fontmont text-[#848484]'>
                            <div className='flex justify-between  font-bold fontmont text-[16px] text-[#848484]'>
                                <div>The Target</div>
                                <div className='flex '>
                                    <div>₹2000</div>
                                    <div className='txtc text-[10px]'>₹3000</div>
                                </div>
                            </div>
                            <div>Sector 22C , Chandigarh (Electronics)</div>
                            <div>Delivery by Sun, 12 Feb</div>
                            <div>2.1km</div>
                            <div className='flex justify-between items-center'>
                                <div className='text-[14px] text-[#58B310] font-semibold'>Open now  - 11noon - 9:30pm</div>
                                <button>Buy Now</button>

                            </div>
                        </div>
                    </div> */}


                </div>

            </div>
        </div>
    </>)
}