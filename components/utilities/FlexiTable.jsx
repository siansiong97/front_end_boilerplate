import { ArrowDownOutlined, ArrowUpOutlined, CaretUpFilled, DeleteFilled, DiffOutlined, DownloadOutlined, EditFilled, EyeOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons/lib/icons';
import { Button, Col, Collapse, Dropdown, Empty, Form, Input, Menu, message, Modal, Popconfirm, Popover, Row, Table } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { useForm } from 'antd/lib/form/Form';
import { cloneDeep, compact, concat, filter, get, indexOf, isArray, isEmpty, isEqual, isNil, isString, map, mapValues, omit, omitBy, pull, set, uniq, values } from 'lodash';
import React, { useEffect, useState } from 'react';
import client from '../../feathers';
import { useTranslation } from '../../locales/useTranslation';
import FlexiForm from './FlexiForm';


const ICON_SIZE = 18

//Able to filter, display, sort, custom action
function FlexiTable(props) {

    const { columns, dataSource, tableProps, filterable, sortable, formProps } = props;
    const { t } = useTranslation();
    const [filterForm] = useForm()
    const [inited, setInited] = useState(false)
    const [tableColumns, setTableColumns] = useState([])
    const [tableDataSource, setTableDataSource] = useState([])

    const [formColumns, setFormColumns] = useState([])
    const [formVisible, setFormVisible] = useState(false)
    const [formEditMode, setFormEditMode] = useState(false)
    const [selectedData, setSelectedData] = useState({})

    const [filterColumns, setFilterColumns] = useState([])

    const [displayableColumns, setDisplayableColumns] = useState([])
    const [displayableColumnsVisible, setDisplayableColumnsVisible] = useState(false)
    const [selectedDisplayColumns, setSelectedDisplayColumns] = useState([])

    const [sortedFields, setSortedFields] = useState({})

    const actions = {
        edit: {
            recordBased: true,
            render: (value, record, action) => {
                return (
                    <EditFilled className="m-2" style={{ color: 'green' }} onClick={(e) => {
                        if (typeof (get(action, 'exec')) === 'function') {
                            action.exec(value, record)
                        }
                    }} />
                )
            },
            exec: (value, record) => {
                setFormEditMode(true);
                setSelectedData(record)
                setFormVisible(true);
            }
        },
        delete: {
            title: t('delete'),
            recordBased: true,
            render: (value, record, action) => {
                return (
                    <Popconfirm title={t('confirmation')} onConfirm={(e) => {
                        if (typeof (get(action, 'exec')) === 'function') {
                            action.exec(value, record)
                        }
                    }}>
                        <DeleteFilled className="m-2" style={{ color: 'red' }} />
                    </Popconfirm>
                )
            },
            exec: (value, record) => {
                if (props.onClickDelete) {
                    props.onClickDelete(record)
                }
            }
        },
    }

    useEffect(() => {
        setInited(false)
        processTableColumns();
        processFilterColumns();
    }, [columns])

    useEffect(() => {
        processFormColumns();
    }, [columns, formEditMode])

    useEffect(() => {
        if (!formVisible) {
            setFormEditMode(false);
            setSelectedData({})
        }
    }, [formVisible])

    useEffect(() => {
        setTableDataSource(isArray(dataSource) ? dataSource : [])
    }, [dataSource])

    useEffect(() => {
        if (props.onSort && inited) {
            props.onSort(sortedFields)
        }
    }, [sortedFields])


    function processTableColumns() {
        if (isArray(columns)) {
            //
            let validTableColumns = filter(columns, (column) => {
                return get(column, 'display') !== false && isString(get(column, 'dataIndex'))
            })

            validTableColumns = map(validTableColumns, (column) => {
                if (!get(column, 'title')) {
                    set(column, 'title', get(column, 'dataIndex'))
                }
                return column;

            })

            setTableColumns(validTableColumns)
            setDisplayableColumns(validTableColumns)
            setSelectedDisplayColumns(map(validTableColumns, 'dataIndex'))
        } else {
            setTableColumns([])
        }
        setInited(true)
    }

    function processFilterColumns() {

        if (isArray(columns)) {
            //
            if (filterable !== false) {

                let filterableFields = compact(map(columns, (column) => {
                    if (get(column, 'filterable') === false || !isString(get(column, 'dataIndex'))) {
                        return null
                    }

                    let name = get(column, 'filter.name') || get(column, 'name') || get(column, 'dataIndex');
                    let title = get(column, 'filter.title') || get(column, 'title') || get(column, 'dataIndex');
                    let filterObj = {
                        name: name,
                        title: title,
                        render: typeof (get(column, 'filter.render')) != 'function' ? defaultForm(name, title, get(column, 'filter.filterType')) : get(column, 'filter.render'),
                        layout: get(column, 'filter.layout')
                    }

                    return filterObj;
                }))

                setFilterColumns(filterableFields)
            }
        } else {
            setFilterColumns([])
        }
    }

    function processFormColumns() {

        if (isArray(columns)) {
            //
            let formFields = compact(map(columns, (column) => {
                if ((!formEditMode && get(column, 'creatable') === false) || (formEditMode && get(column, 'editable') === false) || !isString(get(column, 'dataIndex'))) {
                    return null
                }

                let name = get(column, 'form.name') || get(column, 'name') || get(column, 'dataIndex');
                let title = get(column, 'form.title') || get(column, 'title') || get(column, 'dataIndex');
                let formObj = {
                    name: name,
                    title: title,
                    render: get(column, 'form.render'),
                    layout: get(column, 'form.layout'),
                    formItemProps: get(column, 'form.formItemProps')
                }

                return formObj;
            }))

            setFormColumns(formFields)
        } else {
            setFormColumns([])
        }
    }

    function defaultForm(name, title, filterType = 'input') {
        switch (filterType) {
            case 'input':
                return (
                    () => <Form.Item name={name}><Input placeholder={title} /></Form.Item>
                )
                break;

            default:
                return null;
                break;
        }
    }

    function handleFilterFormSubmit() {
        filterForm.validateFields().then(values => {
            values = omitBy(values, isNil)
            if (props.onFilter) {
                props.onFilter(values)
            }
        }).catch(err => {
            message.error(t('invalidForm'))
        });
    }

    function handleFormSubmit(editMode, values) {
        if (get(formProps, 'onSubmit')) {
            formProps.onSubmit(editMode, values)
        }
    }

    let reprocessTableColumns = compact(map(cloneDeep(tableColumns), (column) => {

        if (get(column, 'sortable') !== false && sortable !== false) {
            column.title = (
                <React.Fragment>
                    <div className="flex items-center cursor-pointer" onClick={(e) => {
                        if (get(sortedFields, get(column, 'dataIndex')) == 1) {
                            setSortedFields({
                                ...sortedFields,
                                [get(column, 'dataIndex')]: -1
                            })
                        } else if (get(sortedFields, get(column, 'dataIndex')) == -1) {
                            setSortedFields(omit(sortedFields, [get(column, 'dataIndex')]))
                        } else {
                            setSortedFields({
                                ...sortedFields,
                                [get(column, 'dataIndex')]: 1
                            })
                        }
                    }}>
                        <span className='inline-block select-none' >
                            {get(column, 'title')}
                        </span>
                        {
                            get(sortedFields, get(column, 'dataIndex')) == 1
                            &&
                            <ArrowUpOutlined style={{ color: 'green' }} className="ml-2" />
                        }
                        {
                            get(sortedFields, get(column, 'dataIndex')) == -1
                            &&
                            <ArrowDownOutlined style={{ color: 'red' }} className="ml-2" />
                        }
                    </div>
                </React.Fragment>
            )
        }
        return indexOf(selectedDisplayColumns, get(column, 'dataIndex')) != -1 ? column : null;
    }))

    reprocessTableColumns.push(
        {
            dataIndex: 'flexiTableAction',
            title: t('action'),
            render: (v, record) => {
                return (
                    <div className="flex items-center flex-wrap justify-start">
                        {
                            compact(values(mapValues(actions, (value, key) => {
                                return (
                                    get(value, 'recordBased') === true ?
                                        typeof (get(value, 'render')) === 'function' ?
                                            value.render(v, record, value)
                                            :
                                            <Button className="m-2 shrink-0" onClick={(e) => {
                                                if (typeof (get(value, 'exec')) === 'function') {
                                                    value.exec(v, record, value)
                                                }
                                            }} >{t(get(value, 'title'))}</Button>
                                        :
                                        null
                                )
                            })))
                        }
                    </div>
                )
            }
        },
    )

    const displayableColumnsMenu = <Menu>
        {map(displayableColumns, (column) => {
            return (
                <Menu.Item>
                    <div className="flex items-center">
                        <Checkbox checked={indexOf(selectedDisplayColumns, get(column, 'dataIndex')) != -1} onChange={(e) => {
                            let newSelectedDisplayColumns = cloneDeep(selectedDisplayColumns)
                            if (e.target.checked) {
                                newSelectedDisplayColumns = uniq(compact(concat(newSelectedDisplayColumns, get(column, 'dataIndex'))))
                            } else {
                                newSelectedDisplayColumns = pull(newSelectedDisplayColumns, get(column, 'dataIndex'))
                            }
                            if (!isEqual(newSelectedDisplayColumns, selectedDisplayColumns)) {
                                setSelectedDisplayColumns(newSelectedDisplayColumns)
                            }
                        }} />
                        <span className='inline-block ml-2' >
                            {get(column, 'title')}
                        </span>
                    </div>
                </Menu.Item>
            )
        })
        }
    </Menu>

    return (
        <React.Fragment>
            <div className=" border-2 ">
                <div className="px-5 py-3 flex justify-between items-center">
                    <span className='inline-block ' >

                    </span>
                    <span className='inline-block ' >
                        <DownloadOutlined className="mx-2 cursor-pointer" style={{ fontSize: ICON_SIZE }} />
                        <PlusOutlined className="mx-2 cursor-pointer" style={{ fontSize: ICON_SIZE }} onClick={(e) => {
                            setFormEditMode(false);
                            setSelectedData({});
                            setFormVisible(true)
                        }} />
                        <DiffOutlined className="mx-2 cursor-pointer" style={{ fontSize: ICON_SIZE }} />

                        <Dropdown overlay={displayableColumnsMenu} visible={displayableColumnsVisible} onVisibleChange={(v) => {
                            setDisplayableColumnsVisible(v)
                        }}>
                            <EyeOutlined className="mx-2 cursor-pointer" style={{ fontSize: ICON_SIZE }} />
                        </Dropdown>
                    </span>
                </div>
                {
                    isArray(filterColumns) && !isEmpty(filterColumns) && filterable !== false &&
                    <Collapse
                        defaultActiveKey={['1']}
                        expandIconPosition='right'
                        expandIcon={({ isActive }) => <CaretUpFilled rotate={isActive ? 180 : 0} />}
                    >
                        <Collapse.Panel key="1" extra={<FilterOutlined style={{ fontSize: ICON_SIZE }} />}>
                            <Form form={filterForm}>
                                <Row gutter={20}>

                                    {
                                        map(filterColumns, (field, index) => {
                                            return (<Col
                                                xs={get(field, 'layout.xs') || get(field, 'layout.span') || 24}
                                                sm={get(field, 'layout.sm') || get(field, 'layout.span') || 12}
                                                md={get(field, 'layout.md') || get(field, 'layout.span') || 12}
                                                lg={get(field, 'layout.lg') || get(field, 'layout.span') || 12}
                                                xl={get(field, 'layout.xl') || get(field, 'layout.span') || 8}
                                                key={index}>
                                                {
                                                    typeof (get(field, 'render')) === 'function' && field.render()
                                                }
                                            </Col>)
                                        })
                                    }
                                </Row>
                                <div className="flex justify-end items-center">
                                    <Button className="mr-2" onClick={(e) => {
                                        filterForm.resetFields()
                                    }} >{t('reset')}</Button>
                                    <Button className="mr-2" type='primary' onClick={(e) => {
                                        handleFilterFormSubmit();
                                    }} >{t('submit')}</Button>
                                </div>
                            </Form>
                        </Collapse.Panel>
                    </Collapse>
                }
                {
                    isEmpty(reprocessTableColumns) ?
                        <Empty className="p-5" description={t('columnNotFound')} />
                        :
                        <Table
                            columns={reprocessTableColumns}
                            dataSource={tableDataSource}
                            {...tableProps}
                        ></Table>
                }
            </div>

            <Modal
                visible={formVisible}
                onCancel={() => {
                    setFormVisible(false)
                }}
                title={
                    typeof (get(formProps, 'title')) === 'function' ?
                        formProps.title(formEditMode)
                        :
                        get(formProps, 'title')
                        ||
                        (
                            formEditMode ?
                                t('edit')
                                :
                                t('create')
                        )
                }
                width="80%"
                footer={null}
            >
                <FlexiForm
                    {
                    ...formProps
                    }
                    columns={formColumns}
                    data={selectedData}
                    editMode={formEditMode}
                    onSubmit={(editMode, values) => {
                        handleFormSubmit(editMode, values)
                    }}
                    onCancel={() => {
                        setFormVisible(false);
                    }}
                    onCreate={(values) => {
                        if (get(formProps, 'onCreate')) {
                            formProps.onCreate(values)
                        }
                    }}
                    onUpdate={(values) => {
                        if (get(formProps, 'onUpdate')) {
                            formProps.onUpdate(values)
                        }
                    }}
                ></FlexiForm>
            </Modal>
        </React.Fragment>
    );
}

export default FlexiTable;