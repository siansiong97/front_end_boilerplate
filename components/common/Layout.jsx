

import { Spin } from 'antd';
import React from "react";


// markup
const Layout = (props) => {


    return (
        <React.Fragment>
            <Spin spinning={props.loading === true}>
                <div className="flex justify-center">
                    <div className="min-h-screen relative" style={{ minWidth: 1000, maxWidth: 1200 }}>
                        <div className="" style={{ minHeight: '90vh' }}>
                            {
                                props.children
                            }
                        </div>
                    </div>
                </div>
            </Spin>
        </React.Fragment>
    )
}

export default Layout


