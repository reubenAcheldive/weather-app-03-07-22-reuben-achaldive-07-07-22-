import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './../Home/Home';




const Pages = () => {
  return (
    < >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

        </Routes>
      </BrowserRouter>


    </>
  )
}

export default Pages