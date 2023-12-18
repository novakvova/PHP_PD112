import {Button, Divider, Form, Input, Upload, message} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const CategoryCreatePage = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState<File|null>(null);

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        console.log('fileList:', file as File);
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        name?: string;
        image?: any;
        description?: string;
    };

    const customDividerStyle = {
        borderTop: '2px solid #1890ff',
        margin: '5px 0 50px 0',
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const file = info.file.originFileObj as File;
            setLoading(false);
            setImageUrl(URL.createObjectURL(file));
            setFile(file);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Divider style={customDividerStyle}>Додати категорію</Divider>
            <Form
                name="basic"
                style={{maxWidth: 1000}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Назва"
                    name="name"
                    rules={[{required: true, message: 'Вкажіть назву категорії!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Фото"
                    name="image"
                    rules={[{required: true, message: 'Оберіть фото!'}]}
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Опис"
                    name="description"
                    rules={[{required: true, message: 'Please input description!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Додати
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CategoryCreatePage;