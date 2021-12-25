

import { useLocation } from "@reach/router"
import React from "react"



// markup
const Layout = (props) => {

    const location = useLocation();
    const currentPath = location.pathname[location.pathname.length - 1] == '/' && location.pathname.length > 1 ? location.pathname.slice(0, -1) : location.pathname;
    console.log(currentPath);

    return (
        <React.Fragment>
            <div className="flex justify-center">
                <div className="min-h-screen relative" style={{ minWidth: 300, maxWidth: 667 }}>

                    <div className="" style={{ minHeight: '90vh' }}>
                        {
                            props.children
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout
