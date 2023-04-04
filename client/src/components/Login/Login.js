import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Modal, Button, Alert } from 'antd';
import { withTheme } from '@rjsf/core';
import { Theme as AntdTheme } from "@rjsf/antd";
import config from '../../config';
import Expire from '../Expire/Expire';

const { serviceUrl } = config[process.env.REACT_APP_ENV];

const Form = withTheme(AntdTheme);

const Login = () => {

    const handleSubmit = ({ formData: { username, password } }) => {

        axios.post(serviceUrl + '/login', {
            username,
            password
        }, {
            crossDomain: true,
            withCredentials: true
        })
        .then(() => {
            window.location.reload();
        })
        .catch(err => {
            ReactDOM.render(<Expire delay={5000}>
                <Alert message={err?.response?.data?.error || 'Грешка: Неуспешмна заявка!' } type="error" />
            </Expire>, document.getElementById('modal-alert'));
        });
    }

    return <Modal
        visible={true}
        width={45}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        closable={false}
    >
        <div id="modal-alert"></div>
        <Form
            schema={{
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        title: "Username"
                    },
                    password: {
                        type: "string",
                        title: "Password"
                    }
                },
                required: ["username", "password"]
            }}
            uiSchema={{
                password: {
                    "ui:widget": "password",
                }
            }}
            onSubmit={handleSubmit}
        >
            <Button type="primary" htmlType="submit">Вход</Button>
        </Form>
    </Modal>
}

export default Login;