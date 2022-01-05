

import { Button } from "antd";
import { withRouter } from "next/router";
import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "../../../locales/useTranslation";
import { updateActiveMenuKey } from '../../../redux/actions/app-actions';
import Layout from "../../common/Layout";

// markup
const HomePage = (props) => {

    const { t } = useTranslation()
    return (
        <React.Fragment>
            <Layout>
                <Button type="primary">{t('test')}</Button>
            </Layout>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    app: state.app,
});


const mapDispatchToProps = {
    updateActiveMenuKey
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage))