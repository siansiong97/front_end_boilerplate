

import React from "react"
import Helmet from "react-helmet"



// markup
const SharedHeader = () => {


    return (
        <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>My Awesome Website</title>
        <meta name="title" content="My Awesome Website" />
        <meta name="description" content="This website is so awesome that I really don't think you can handle how much awesome that is happening here." />
        {/* <!-- Open Graph / Facebook --> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    </Helmet>
    )
}

export default SharedHeader
