import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../api/auth';
import { getUserActiveApi } from '../../../api/user';

// Components
// ....
import ListUsers from '../../../components/Admin/Users/LsitUsers';

import './Users.scss';

export default function Users() {
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reload, setReload] = useState(false);
    const token = getAccessTokenApi();

    useEffect(()=> {
        getUserActiveApi(token, true).then(response => {
            setUsersActive(response.users);
        });
        getUserActiveApi(token, false).then(response => {
            setUsersInactive(response.users);
        });
        setReload(false);
    }, [token, reload]);

    return (
        <div className="users">
            <ListUsers
                usersActive={usersActive}
                usersInactive={usersInactive}
                setReload={setReload}
            />
        </div>
    );
}