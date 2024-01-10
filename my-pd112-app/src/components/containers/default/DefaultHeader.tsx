import {Layout, Menu, MenuProps} from "antd";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {IAuthReducerState} from "../../auth/login/AuthReducer.ts";
const { Header} = Layout;



const DefaultHeader = () => {
    const navigate = useNavigate();
    const items: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,

    }));

    const {isAuth, user} = useSelector((redux: any)=>redux.auth as IAuthReducerState)

    if(isAuth)
    {
        items.push({
            key: '100',
            label: user?.lastName+" "+user?.name,
            onClick: () => {
                navigate("/profile");
            }
        });
        items.push({
            key: '100',
            label: "Вихід",
            onClick: () => {
                navigate("/");
            }
        });
    }
    else {
        items.push({
            key: '4',
            label: "Вхід",
            onClick: () => {
                console.log("Вихід користувача");
                navigate("/login");
            }
        });
    }

    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
            />
        </Header>
    );
}

export default DefaultHeader;