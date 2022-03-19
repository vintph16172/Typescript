import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const AdminLayout = (props: Props) => {
  return (
    <div>
        <header>Admin Header</header>
        <aside>
            Aside
        </aside>
        <main>
            <Outlet />
        </main>
    </div>
  )
}
export default AdminLayout