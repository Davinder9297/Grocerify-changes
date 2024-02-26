
import { useEffect } from 'react'
import StoreProduct from './StoreProduct'


const StoreDetails = () => {


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div  >

            <StoreProduct />
        </div>
    )
}

export default StoreDetails