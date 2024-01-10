import {Button, Divider, Form, Input, Upload, message, Alert, Modal} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

import {ILoginResult, IRegister, IRegisterForm, IUser} from "../types.ts";
import http_common from "../../../http_common.ts";
import {jwtDecode} from "jwt-decode";
import {useDispatch} from "react-redux";
import {AuthReducerActionType} from "./AuthReducer.ts";

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errorMessage] = useState<string>("");


    const onFinish = async (values: IRegisterForm) => {

        const model : IRegister = {
            ...values,
            image: values.image?.thumbUrl
        };
        //console.log("Register model", model);
        try {
            const resp = await http_common.post<ILoginResult>("/api/login", model);
            const {data} = resp;
            localStorage.token = data.token;
            const user = jwtDecode(data.token) as IUser
            dispatch({
                type: AuthReducerActionType.LOGIN_USER,
                payload: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    lastName: user.lastName
                } as IUser
            }); //викликаю AuthReducer - щоб він змінив state в redux - глобальний state
            console.log("User new", user);
            navigate("/");
        }
        catch (ex) {
            message.error('Невірно вказано пошта або пароль!');
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const customDividerStyle = {
        borderTop: '2px solid #1890ff',
        margin: '5px 0 50px 0',
    };



    return (
        <>
            <Divider style={customDividerStyle}>Вхід</Divider>
            {errorMessage && <Alert message={errorMessage} style={{marginBottom: "20px"}} type="error" />}
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 800,
                }}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Електронна пошта"
                    name="email"
                    htmlFor="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Формати пошти не правильний!',
                        },
                        {required: true, message: 'Це поле є обов\'язковим!'},
                        {min: 2, message: 'Пошта повинна містити мінімум 2 символи!'}
                    ]}
                >
                    <Input autoComplete="email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        { required: true, message: 'Вкажіть Ваш пароль!', },
                        { min: 6, message: 'Пароль має мати мінімум 6 символів!', },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Вхід
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default LoginPage;