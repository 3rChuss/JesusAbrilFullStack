import React, { useEffect, useState} from 'react';
import { getMenuApi } from '../../../api/menu';

// Components
// ....
import MenuList from '../../../components/Admin/MenuWeb/MenuList';

export default function MenuWeb() {
    const [menus, setMenus] = useState([]);
    const [reloadMenu, setReloadMenu] = useState(false);

    useEffect(() => {
        getMenuApi().then(response => {
            setMenus(response.menus);
        })
        setReloadMenu(false);
    }, [reloadMenu]);

    return (
        <div className="menu-web">
            <MenuList menus={menus} setReloadMenu={setReloadMenu}/>
        </div>
    )
}