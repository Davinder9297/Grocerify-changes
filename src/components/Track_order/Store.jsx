import React from 'react'
import styled from "styled-components"

const Store = () => {
  return (
   <Wrapper>
    <div className="sidebar">
    sidebar
    </div>
    <div className="main-section">
    <div className="container">
        <div className="image">
            <img src="/store.jpg" alt="store" />
        </div>
        <div className="selction">
          <p>Select Merchants</p>
          <select name="merchant" id="merchant">
            <option value="none">None</option>
            <option value="starbucks">Starbucks</option>
            <option value="sephora">Sephora</option>
            <option value="target">Target</option>
          </select>
          <button>submit</button>
        </div>
    </div>
    </div>
   </Wrapper>
  )
}
const Wrapper= styled.div`
    display: flex;
    .sidebar{
        width: 20%;
        background-color: grey;
        height:100vh;
    }
    .main-section{
        width: 80%; 
    }
    .container{
        display: flex;
        flex-direction:column;
        align-items: center;
    }
    .selection{
        display: flex;
    }
`

export default Store