import React from "react"
import Template from "./Template"

const Layout = ({ children }) => {
    return (
        <Template>
            {children}
        </Template>
    )
}

export default Layout