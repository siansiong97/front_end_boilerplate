import _ from 'lodash'
import { withRouter } from 'next/dist/client/router'
import React from 'react'
import { connect } from 'react-redux'
import HomePage from '../components/home/pages/HomePage'


const Index = (props) => {

    return (
        <React.Fragment>
            <HomePage />
        </React.Fragment>
    )
}


export async function getStaticProps(context) {

    return {
        props: {
            cookie: _.get(context, ['req', 'headers', 'cookie']) || null,
        }
    }
}

const mapStateToProps = state => ({
    app: state.app,
});


const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index))