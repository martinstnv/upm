import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import config from '../../config';
import axios from 'axios';
import Expire from '../Expire/Expire';
import moment from 'moment';
import { Alert, Card, Button, Modal, Space } from 'antd';
import classes from './Items.module.css';
import { withTheme } from '@rjsf/core';
import { Theme as AntdTheme } from "@rjsf/antd";

const { serviceUrl } = config[process.env.REACT_APP_ENV];

const Form = withTheme(AntdTheme);

const Items = () => {

    const formRef = React.useRef(null);

    const [open, setOpen] = useState(null);
    const [items, setItems] = useState(null);
    const [schema, setSchema] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchSchema = item => {
        axios
            .get(serviceUrl + '/types', { withCredentials: true })
            .then(res => {
                const [selectedSchema] = res.data.filter(type => type.name === item.type);
                setSchema(selectedSchema);
            })
            .catch(err => {
                ReactDOM.render(<Alert message="Could not fetch schema." type="error" />,
                    document.getElementById('alert'));
                console.error(err);
            });
    }

    const onOpenModal = item => {
        setOpen(true);
        setSelectedItem(item);
        fetchSchema(item);
    }

    const onCloseModal = () => {
        setOpen(false);
        setSelectedItem(null);
    }

    React.useEffect(() => {
        axios
            .get(serviceUrl + '/items', { withCredentials: true })
            .then(res => {
                setItems(res.data);
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
        <React.Fragment>

            {/* Iterating through the items */}
            {items && items.length > 0 && items.map((item, key) => (
                <Space direction="vertical" size={16} key={key} className={classes.Space}>
                    <Card hoverable title={item.name} extra={<Button onClick={() => onOpenModal(item)}>Open</Button>} className={classes.Card}>
                        <p>{item.content.description}</p>
                    </Card>
                </Space>

            ))
            }

            {/* Modal for each selected item */}
            {
                !!open && selectedItem && <Modal
                    open={open}
                    onCancel={onCloseModal}
                    width="45%"
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <React.Fragment>
                        <div id="modal-alert"></div>
                        <div>{selectedItem.name}</div>
                        {schema && (
                            <Form
                                disabled
                                ref={formRef}
                                schema={schema}
                                formData={selectedItem.content}
                                children={true}
                            >
                            </Form>
                        )}

                    </React.Fragment>
                </Modal>
            }
        </React.Fragment>
    )
}

export default Items;