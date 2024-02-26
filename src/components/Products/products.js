import React from 'react'
import Cards from '../Cards/cards'
import styles from './products.module.css'
import { Link } from 'react-router-dom'

const Products = (data) => {
    // console.log(data.data)
    return (
        <>
            <div className={styles.products_main}>
                {
                    data?.data?.map((val, ind) => {
                        return (
                            <div key={ind}>
                                {/* <Link to={'/product/new'}>  */}
                                <Cards value={val} />
                                {/* // </Link> */}
                            </div>

                        )

                    })
                }
            </div>
        </>
    )
}

export default Products