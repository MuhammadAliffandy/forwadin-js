import Navbar from "@/app/(dashboard)/DashboardTemplate"
import React from "react"
import Template from "./Template"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Template>
            {children}
        </Template>
    )
}

export default Layout