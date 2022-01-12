import { Button, Col, Form, Input, message, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { filter, get, isArray, isNil, isString, map, omitBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import client from '../../feathers';
import { useTranslation } from '../../locales/useTranslation';


const ICON_SIZE = 18
//Able to filter, display, sort, custom action
function FlexiForm(props) {

    const { columns, data, editMode, manualControl, service } = props;
    const { t } = useTranslation();
    const [form] = useForm()

    useEffect(() => {
        if (editMode) {
            form.setFieldsValue(data)
        }
    }, [data, editMode])

    function processColumns(columns) {
        if (isArray(columns)) {
            //
            let newFormColumns = filter(columns, (column) => {
                return isString(get(column, 'name')) && get(column, 'name') != null;
            })

            newFormColumns = map(newFormColumns, (column) => {

                let name = get(column, 'name');
                let title = get(column, 'title') || name;
                let formObj = {
                    name: name,
                    title: title,
                    render: typeof (get(column, 'render')) != 'function' ? defaultForm(name, title, get(column, 'filterType'), get(column, 'formItemProps')) : get(column, 'render'),
                    layout: get(column, 'layout')
                }

                return formObj
            })

            return newFormColumns


        } else {
            return []
        }
    }

    function defaultForm(name, title, filterType = 'input', formItemProps, data) {
        switch (filterType) {
            case 'input':
                console.log('new Form Item');
                return (
                    () => <Form.Item name={name} label={title} labelCol={{ xs: 12, sm: 12, md: 8, lg: 6, xl: 6 }} {...formItemProps} ><Input placeholder={title} /></Form.Item>
                )
                break;

            default:
                return null;
                break;
        }
    }

    function handleSubmit() {
        form.validateFields().then(values => {
            values = omitBy(values, isNil)
            if (props.onSubmit) {
                props.onSubmit(editMode, values)
            }
            if (!manualControl && isString(service)) {
                if (editMode && get(data, '_id')) {
                    client.service(service).patch(data._id, values).then(res => {
                        if (props.onUpdate) {
                            props.onUpdate(res)
                        }
                        handleCancel()
                    }).catch(err => {
                    });
                } else {
                    client.service(service).create(values).then(res => {
                        if (props.onCreate) {
                            props.onCreate(res)
                        }
                        handleCancel()
                    }).catch(err => {
                    });
                }
            }
        }).catch(err => {
            message.error(t('invalidForm'))
        });
    }

    function handleCancel() {
        form.resetFields();
        if (props.onCancel) {
            props.onCancel();
        }
    }

    let formColumns = processColumns(columns)
    return (
        <React.Fragment>
            <Form form={form}>
                <Row gutter={20}>

                    {
                        map(formColumns, (column, index) => {
                            return (<Col
                                xs={get(column, 'layout.xs') || get(column, 'layout.span') || 24}
                                sm={get(column, 'layout.sm') || get(column, 'layout.span') || 24}
                                md={get(column, 'layout.md') || get(column, 'layout.span') || 24}
                                lg={get(column, 'layout.lg') || get(column, 'layout.span') || 24}
                                xl={get(column, 'layout.xl') || get(column, 'layout.span') || 24}
                                key={`${index}`}>
                                {
                                    typeof (get(column, 'render')) === 'function' && column.render()
                                }
                            </Col>)
                        })
                    }
                </Row>
                <div className="flex justify-end items-center">
                    <Button className="mr-2" onClick={(e) => {
                        handleCancel()
                    }} >{t('cancel')}</Button>
                    <Button className="mr-2" type='primary' onClick={(e) => {
                        handleSubmit();
                    }} >{t('submit')}</Button>
                </div>
            </Form>
        </React.Fragment>
    );
}

export default FlexiForm;