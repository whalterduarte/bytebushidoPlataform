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
      <span className={style.cop}> Direitos reservados</span>
      </main>
      
    </>
  )
}

export default Layout
