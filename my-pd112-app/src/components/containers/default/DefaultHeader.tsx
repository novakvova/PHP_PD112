import {Layout, Menu, MenuProps} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AuthReducerActionType, IAuthReducerState} from "../../auth/login/AuthReducer.ts";
const { Header} = Layout;

const DefaultHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items: MenuProps['items'] = [];

    items.push({
        key: '1',
        label: <Link to={"/"}>Категорії</Link>
    });

    items.push({
        key: '2',
        label: <Link to={"/products/create"}>Додати продукт</Link>
    });

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
                dispatch({type: AuthReducerActionType.LOGOUT_USER});
                localStorage.removeItem("token");
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