import React, {useEffect, useState} from 'react';
import { Table, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import http_common from "../../http_common.ts";

interface ICategoryItem {
    id: number;
    name: string;
}

const columns: ColumnsType<ICategoryItem> = [
    {
        title: '#',
        dataIndex: 'id',
    },
    {
        title: 'Назва',
        dataIndex: 'name',
    }
];

const HomePage: React.FC = () => {
    const [data, setData] = useState<ICategoryItem[]>();
    useEffect(() => {
        console.log("Show info", http_common.defaults.baseURL);
        http_common.get("/api/categories")
            .then(resp=> {
                console.log("Result = ", resp.data);
                setData(resp.data);
            });
    },[]);

    return (
        <>
            <Divider>Списко категорій</Divider>
            <Table columns={columns} rowKey="id" dataSource={data} size="middle" />
        </>
    )
}

export default HomePage;