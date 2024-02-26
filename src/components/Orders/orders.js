import { BASE_URL_PRODUCTS } from '../../Api/api'
import { ReactComponent as Down } from '../../assests/down.svg'
import { useQuery, useIsFetching } from '@tanstack/react-query'
import { formatDate } from '../../helpers/helper_function'
import Spinner from '../Spinner'
import { Link } from 'react-router-dom'


export default function Orders() {
    const isFetching = useIsFetching()

    const { data: OrderData, isError } = useQuery({
        queryKey: ['orders'],
        queryFn: () =>
            fetch(`${BASE_URL_PRODUCTS}api/getorders`, {
                headers: {
                    'Authorization': ` Bearer ${localStorage.getItem('GROC_USER_TOKEN')}`
                }
            }).then((res) =>
                res.json()
            ),


    })

    if (isFetching) {
        return <Spinner />
    }
    if (isError) {
        return <h2>Some Error Occured whle Fetching</h2>
    }

    // console.log(OrderData)


    return (<>


        <div className=''>
            <div className='flex space-x-4 text-[#848484] text-[16px] mt-4'>
                <div>1 order placed in</div>
                <select className='bg-[#F3F3F3] outline-none px-2'>
                    <option>Past 1 months</option>
                    <option>Past 3 months</option>
                    <option>Past 6 months</option>
                </select>
            </div>

            {OrderData?.orders.map((val, ind) => {
                return (
                    <>
                        <div className='w-full text-[15px] border rounded-t-xl mt-3' key={ind}>
                            <div className="flex justify-between fontmons bg-[#D9D9D9] pt-4 rounded-t-xl px-3 text-[#848484]">
                                <div className="flex space-x-40">
                                    <div className="flex flex-col">
                                        <div className="">Order placed</div>
                                        <div className="">{formatDate(val.ordered_on)}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="">Total</div>
                                        <div className="">Rs. {val.order_price}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="">Ship To</div>
                                        <div className="">{val.shipping_address.full_name}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col ">
                                    <div>Order #16273536</div>
                                    <div className="flex space-x-5">
                                        <div>View Order Details</div>
                                        <div className='flex items-center'>Inovoice <Down className='ml-1' /></div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between items-center px-3 fontmons pt-3 text-[#848484]'>
                                <div className='flex items-center'>
                                    <div className='flex flex-col'>
                                        <div className='text-[20px]'>Arriving Today</div>
                                        <div className='text-[14px]'>Not Yet Dispatched</div>
                                        <div className='h-36 w-36 flex justify-center items-center '>
                                            <img className='h-[70px] w-auto' src={val.product.product_primary_image_url} />
                                        </div>
                                    </div>
                                    <div className='fontgob text-[14px]'>{val.product.products_title}</div>
                                </div>

                                <div className='flex flex-col space-y-10'>
                                    <Link to='/account/myOrders/track' state={val} className='bg-[#58B310] px-3 py-[2px] text-white rounded'>Track Order</Link>
                                    <button className='bg-[#58B310] px-3 py-[2px] text-white rounded'>Edit Order</button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full fontmons bg-[#D9D9D9] py-3 pl-3 rounded-b-xl'>
                            <button className='text-[#58B310]'>Archieve Order</button>
                        </div>
                    </>
                )
            })}





        </div>
    </>)
}