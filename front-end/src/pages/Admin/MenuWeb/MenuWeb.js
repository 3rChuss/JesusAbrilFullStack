import React, { useEffect, useState} from 'react';
import { getMenuApi } from '../../../api/menu';

// Components
// ....
import MenuList from '../../../components/Admin/MenuWeb/MenuList';

export default function MenuWeb() {
    const [menu, setMenu] = useState([]);
    const [reloadMenu, setReloadMenu] = useState(false);

    useEffect(() => {
        getMenuApi().then(response => {
            setMenu(response.menu)
        })
        setReloadMenu(false);
    }, [reloadMenu]);

    return (
        <div className="menu-web">
            <MenuList menu={menu} setReloadMenu={setReloadMenu}/>
        </div>
    )
}