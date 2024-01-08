import {Button, Divider, Form, Input, Upload, message, Alert, Modal} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {PlusOutlined} from '@ant-design/icons';

import type {RcFile, UploadFile, UploadProps} from 'antd/es/upload/interface';
import {IRegister, IRegisterForm} from "../types.ts";
import http_common from "../../../http_common.ts";
import {imageConverter} from "../../../interfaces/forms";

const RegisterPage = () => {

    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [file, setFile] = useState<UploadFile | null>();
    const [errorMessage] = useState<string>("");


    const onFinish = async (values: IRegisterForm) => {

        const model : IRegister = {
            ...values,
            image: values.image?.thumbUrl
        };
        console.log("Register model", model);
        try {
            const user = await http_common.post("/api/register", model);
            console.log("User new", user);
            navigate("/");

        }
        catch (ex) {
            message.error('Помилка при реєстрації!');
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        name?: string;
    };

    const customDividerStyle = {
        borderTop: '2px solid #1890ff',
        margin: '5px 0 50px 0',
    };


    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = URL.createObjectURL(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({fileList: newFile}) => {
        const newFileList = newFile.slice(-1);
        setFile(newFileList[0]);
    };

    return (
        <>
            <Divider style={customDividerStyle}>Реєстрація</Divider>
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
                <Form.Item<FieldType>
                    label="Ім'я"
                    name="name"
                    rules={[
                        {required: true, message: 'Це поле є обов\'язковим!'},
                        {min: 2, message: 'Ім\'я повинна містити мінімум 2 символи!'}
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Прізвище"
                    name="lastName"
                    htmlFor="lastName"
                    rules={[
                        {required: true, message: 'Це поле є обов\'язковим!'},
                        {min: 2, message: 'Прізвище повинна містити мінімум 2 символи!'}
                    ]}
                >
                    <Input autoComplete="lastName"/>
                </Form.Item>

                <Form.Item
                    label="Телефон"
                    name="phone"
                    htmlFor="phone"
                    rules={[
                        {required: true, message: 'Це поле є обов\'язковим!'},
                        {min: 11, message: 'Телефон повинна містити мінімум 11 символи!'}
                    ]}
                >
                    <Input autoComplete="phone"/>
                </Form.Item>

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
                    label="Фото"
                    name={"image"}
                    getValueFromEvent={imageConverter}
                >
                    <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture-card"
                        onChange={handleChange}
                        onPreview={handlePreview}
                        accept="image/*"
                    >
                        {file ? null :
                            (
                                <div>
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Upload</div>
                                </div>)
                        }
                    </Upload>
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

                <Form.Item
                    name="confirm"
                    label="Повторіть Пароль"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Будь-ласка підтвердіть пароль!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароль не співпадають!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Реєструватися
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default RegisterPage;