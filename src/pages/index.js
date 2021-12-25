import * as React from "react"
import SharedHeader from "../components/general/components/SharedHeader"
import HomePage from "../components/homepage/pages/HomePage"


// markup
const Index = (props) => {
  return (
    <React.Fragment>
      <SharedHeader />
      <HomePage {...props} />
    </React.Fragment>
  )
}

export default Index
