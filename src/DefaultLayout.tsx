import React from 'react'
import AppFooter from './AppFooter'
import AppNavbar from './AppNavbar'

interface DefaultLayoutProps {
  children?: React.ReactNode
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <AppNavbar />
      <div className="container">
        {props.children}
        <AppFooter />
      </div>
    </>
  )
}
