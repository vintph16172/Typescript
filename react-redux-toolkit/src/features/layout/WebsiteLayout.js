import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../compoments/Header'
import Footer from '../../compoments/Footer'

const WebsiteLayout = () => {
  return (
    <div>

        <header>
            <Header/>

        </header>

        <main>
            <Outlet />

        </main>
        <footer>
            <Footer />
        </footer>

    </div>
  )
}

export default WebsiteLayout