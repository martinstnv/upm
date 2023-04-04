import Items from '../components/Items/Items';
import Create from '../components/Create/Create';
import { FileOutlined, FileAddOutlined } from '@ant-design/icons';

const menuItems = [
    {
        icon: FileOutlined,
        label: "Items",
        key: "items",
        component: Items
    },
    {
        icon: FileAddOutlined,
        label: "Create an item",
        key: "create",
        component: Create
    }
]

export default menuItems;