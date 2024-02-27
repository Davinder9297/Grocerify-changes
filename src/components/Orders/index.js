import { Link } from 'react-router-dom'
import { ReactComponent as Search } from '../../assests/search.svg'
import './orders.css'
import Orders from './orders'
import Slider from './slider'
import BuyAgain from './buyagain'
import NotYetShipped from './notyetshipped'
import Cancelled from './cancelled'
import { useEffect, useState } from 'react'
import { BASE_URL_PRODUCTS } from '../../Api/api'
export default function MyOrders() {

    const [ShowComponent, setShowComponent] = useState('orders')
    const [result, setresult] = useState([])
const [data, setdata] = useState([])
    useEffect(() => {
    async function FetchData(){
        const data=await fetch(`${BASE_URL_PRODUCTS}api/getorders`, {
            headers: {
                'Authorization': ` Bearer ${localStorage.getItem('GROC_USER_TOKEN')}`
            }
        })
        const response=await data.json()
        setdata(response.orders)
        // console.log(response);
    
      }
      FetchData()
    }, [])
    function Queries(e){
        let query=e.target.value;
        // console.log(query);
        if(query==''){
            setresult([])
        }
       setresult(data.filter((item)=>{
            const searchitem=query.toLowerCase()
              const title=item.product.products_title.toLocaleLowerCase()
              const slug=item.product.slug.toLocaleString()
              const description=item.product.products_description.toLocaleLowerCase()
              console.log(searchitem && (title.includes(searchitem) || slug.includes(searchitem) || description.includes(searchitem)));
            //   const price=item.price.toLocaleString()
              return searchitem && (title.includes(searchitem) || slug.includes(searchitem) || description.includes(searchitem));
        }))
        console.log(result)
    }
    return (<>
        <div className="px-20 w-full pt-3">
            <div className="flex fontmons">
                <div className='text-[#848484] fontmons font-semibold'>Your Account &gt;</div>
                <div className='text-[#58B310] fontmons'>Your Orders</div>
            </div>

            <div className='flex justify-between items-center fontmons text-[#848484] '>
                <div className='text-[32px]'>Your Orders</div>
                <div className="flex  items-center space-x-5 ">
                    <div className='relative'>
                    <Search className='absolute top-2 left-2' />
                        <input onChange={Queries} placeholder='Search all orders' className='py-[2px] w-[300px] rounded-lg outline-none pl-7 border border-1 focus-within:border-gray-50' />
                        <div className='h-auto w-full z-20 flex flex-col absolute top-7'>
                             {
                                result.map((item)=>{ 
                                    return(<>
                                        <Link to='' className='border text-center py-[2px] bg-[#c0ec9c] h-auto max-w-[300px] px-2'>{item.product.products_title}</Link>

                                    </>)

                            } )
                        }
                        </div>
                    </div>
                    <button className='bg-[#58B310] px-2 py-[2px] rounded-lg text-white' >Search Orders</button>
                </div>
                
            </div>

            <div className='fontmons flex space-x-10 text-[#848484] pl-1 font-[500px]'>
                <button onClick={() => setShowComponent('orders')} style={{ color: ShowComponent == 'orders' ? "#58B310" : "#848484" }}>Orders</button>
                <button onClick={() => setShowComponent('buyagain')} style={{ color: ShowComponent == 'buyagain' ? "#58B310" : "#848484" }}>Buy Again</button>
                <button onClick={() => setShowComponent('notyetshipped')} style={{ color: ShowComponent == 'notyetshipped' ? "#58B310" : "#848484" }}>Not Yet Shipped</button>
                <button onClick={() => setShowComponent('cancelled')} style={{ color: ShowComponent == 'cancelled' ? "#58B310" : "#848484" }}>Cancelled Orders</button>
            </div>
            <div className='h-[2px] w-full bg-[#848484] mt-1'></div>
            {
                ShowComponent == 'orders' ? <Orders /> : ShowComponent == 'buyagain' ? <BuyAgain /> : ShowComponent == 'notyetshipped' ? <NotYetShipped /> : <Cancelled />
            }
            <Slider />
        </div>
    </>)
}