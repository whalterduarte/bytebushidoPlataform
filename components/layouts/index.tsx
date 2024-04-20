import React, { ReactElement } from 'react'
import NavBar from '../navBar/Navbar'
import style from './Layout.module.css'

type Props = {
  children: ReactElement
}

const Layout = ({children}: Props) => {
  return (
    <>
      <NavBar/>
      <main className={style.main}>{children}
    
      </main>
      
    </>
  )
}

export default Layout
