import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import config from '../../config';
import axios from 'axios';
import Expire from '../Expire/Expire';
import moment from 'moment';
import { Alert, Button, Col, Empty, Input, Row, Select } from 'antd';
import classes from './Create.module.css';
import { withTheme } from '@rjsf/core';
import { Theme as AntdTheme } from "@rjsf/antd";

const { serviceUrl } = config[process.env.REACT_APP_ENV];

const Form = withTheme(AntdTheme);

const Create = () => {

    let schema = null;

    const formRef = React.useRef(null);

    const [types, setTypes] = useState(null);
    const [itemName, setItemName] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const handleChange = typename => {
        let [chosenType] = types.filter(type => type.name === typename);
        if (chosenType) setSelectedType(chosenType);
    }

    if (selectedType)
        schema = {
            title: selectedType.name,
            type: "object",
            properties: selectedType.properties
        }

    const onNameChange = ({target: {value}}) => {
        setItemName(value)
    }

    const onSubmit = ({ formData }) => {

        if (!itemName) {
            alert("Item name is required.")
            return;
        }

        if (!selectedType) {
            alert("Item type is required.")
            return;
        }

        const postData = {
            name: itemName,
            type: selectedType.name,
            content: JSON.stringify(formData)
        }

        axios.post(serviceUrl + '/create', postData, {
            withCredentials: true
        })
            .then(() => {
                ReactDOM.render(<Expire delay={5000}>
                    <Alert message={'Success'} type="success" />
                </Expire>, document.getElementById('alert'));
            })
            .catch(err => {
                ReactDOM.render(<Alert message="Could not submit data." type="error" />,
                    document.getElementById('alert'));
                console.error(err);
            });
    }

    React.useEffect(() => {
        axios
            .get(serviceUrl + '/types', { withCredentials: true })
            .then(res => {

                setTypes(res.data);
                // const [defaultSelectedType] = res.data.filter(type => type.name === 'note');
                // if (defaultSelectedType) setSelectedType(defaultSelectedType);

                ReactDOM.render(<Expire delay={5000}>
                    <Alert message={`[${moment().format('YYYY-MM-DD HH:mm')}] - Up to date.`} type="success" />
                </Expire>, document.getElementById('alert'));
            })
            .catch(err => {
                ReactDOM.render(<Alert message="Could not sync data." type="error" />,
                    document.getElementById('alert'));
                console.error(err);
            });
    }, []);

    return (
        <div className={classes.Outer}>
            <div className={classes.Inner}>

                {types && types.length > 0 && (
                    <Row>
                        <Col span={16}>
                            <Input
                                type="text"
                                placeholder="Enter a name"
                                onChange={onNameChange}
                            />
                        </Col>
                        <Col span={8}>
                            <Select
                                className={classes.Select}
                                placeholder="Select a type"
                                onChange={handleChange}
                                options={types.map(type => ({ value: type.name }))}
                            />
                        </Col>
                    </Row>
                )}

                {schema ?
                    <Form
                        className={classes.Form}
                        ref={formRef}
                        schema={schema}
                        // uiSchema={uiSchema}
                        onSubmit={onSubmit}
                        // onError={onFinishFailed}
                        showErrorList={false}
                    >
                        <Button style={{ width: '50%' }} type="primary" htmlType="submit"> Create </Button>
                    </Form>
                    : <Empty description="Please choose a type"></Empty>
                }

            </div>
        </div>
    )
}

export default Create;