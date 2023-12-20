import React, {useEffect, useState} from 'react';
import {Table, Divider, Button, Popconfirm} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import http_common from "../../http_common.ts";
import {APP_ENV} from "../../env";
import {useNavigate} from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';

interface ICategoryItem {
    id: number;
    name: string;
    image: string;
}
const url_image = `${APP_ENV.BASE_URL}/upload/150_`;


const HomePage: React.FC = () => {
    const navigator = useNavigate();
    const [data, setData] = useState<ICategoryItem[]>([]);
    useEffect(() => {
        //console.log("Show info", http_common.defaults.baseURL);
        http_common.get("/api/categories")
            .then(resp=> {
                console.log("Result = ", resp.data);
                setData(resp.data);
            });
    },[]);


    const columns: ColumnsType<ICategoryItem> = [

        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: "Фото",
            dataIndex: "image",
            render: (imageName: string) => {
                return (
                    <img src={`${url_image}${imageName}`} width={100} alt={"Ковбаса"} />
                );
            }
        },
        {
            title: 'Назва',
            dataIndex: 'name'

        },
        {
            title: 'Видалить',
            dataIndex: 'delete',
            render: (_, record) => (
                // <Button type="danger" onClick={() => handleDelete(record.id)}>
                //     Delete
                // </Button>

                <Popconfirm
                    title="Are you sure to delete this category?"
                    onConfirm={async () => {
                        try {
                            await http_common.delete(`/api/categories/${record.id}`);
                            setData(data.filter(x=>x.id!=record.id));

                        } catch (error) {
                            console.error('Error fetching category details:', error);
                            throw error;
                        }
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<DeleteOutlined />}>
                        Delete
                    </Button>
                </Popconfirm>

            ),
        },
    ];

    return (
        <>
            <Divider>Списко категорій</Divider>
            <Button type="primary" onClick={() => navigator("/categories/create")}>Додати +</Button>
            <Table columns={columns} rowKey="id" dataSource={data} size="middle" />
        </>
    )
}

export default HomePage;