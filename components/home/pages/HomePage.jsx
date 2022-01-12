

import { Button, Form, Input } from "antd";
import { get } from "lodash";
import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "../../../locales/useTranslation";
import { updateActiveMenuKey } from '../../../redux/actions/app-actions';
import { getFormatedDate } from "../../../utility";
import { getDummyDataAPI } from "../../../utility/dummy";
import Layout from "../../common/Layout";
import FlexiTable from "../../utilities/FlexiTable";

// markup
const PAGE_SIZE = 10;
const HomePage = (props) => {

    const { t } = useTranslation()
    const [dataSource, setDataSource] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getData((page - 1) * PAGE_SIZE)
    }, [page])

    function getData(skip) {
        if (isNaN(parseInt(skip))) {
            skip = 0;
        } else {
            skip = parseInt(skip)
        }

        getDummyDataAPI(null, {
            objConfig: [
                {
                    name: 'id',
                    type: 'int'
                },
                {
                    name: 'name',
                    type: 'name'
                },
                {
                    name: 'age',
                    type: 'int'
                },
                {
                    name: 'birthday',
                    type: 'date'
                },
                {
                    name: 'amount',
                    type: 'int'
                },
            ],
            limit: PAGE_SIZE
        }).then(res => {
            setDataSource(get(res, 'data') || []);
            setTotal(get(res, 'total') || 0);
        }).catch(err => {
        });
    }

    const columns = [
        {
            dataIndex: 'id',
            title: 'Id',
            display: false,
            filterable: false,
            editable: false,
            creatable: false,
        },
        {
            dataIndex: 'name',
            title: 'Name',
            sortable: false,
            creatable : false,
            form: {
                render: (editMode, value) => {
                    return (<Form.Item name="name" ><Input type="number" placeholder={t('test')} /></Form.Item>)
                }
            },
            filter: {
                title: t('test'),
                render: () => {
                    return (<Form.Item name="name" ><Input type="number" placeholder={t('test')} /></Form.Item>)
                },
            }
        },
        {
            dataIndex: 'age',
            title: 'Age',
            form : {
            }
        },
        {
            dataIndex: 'birthday',
            title: 'Birthday',
            render: (value) => getFormatedDate(value)
        },
        {
            dataIndex: 'amount',
            title: 'Amount'
        },
    ]


    return (
        <React.Fragment>
            <Layout>
                <div className="flex justify-center items-center">
                    <span className=" inline-block p-5">
                        <FlexiTable
                            columns={columns}
                            dataSource={dataSource}
                            formProps={
                                {
                                    manualControl: true,
                                    service: 'users',
                                    title : (editMode) => {
                                        return editMode ? t('test') : t('create')
                                    },
                                    onSubmit: (editMode, values) => {
                                        console.log(editMode);
                                        console.log(values);
                                    }
                                }
                            }
                            
                            tableProps={
                                {
                                    pagination: {
                                        total: total,
                                        current: page,
                                        onChange: (val) => {
                                            setPage(val)
                                        }
                                    }
                                }
                            }
                            onFilter={(filterValues) => {
                                console.log(filterValues);
                            }}
                            onSort={(sortedValues) => {
                                console.log('sortedValues', sortedValues);
                            }}
                        />
                    </span>
                </div>
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