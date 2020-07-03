//Layouts
// ....
import LayoutAdmin from '../layouts/LayoutAdmin';
import AdminHome from '../pages/Admin';
import AdminSingIn from '../pages/Admin/SignIn';
import LayoutBasic from '../layouts/LayoutBasic';

import { Layout } from 'antd';

// Pages
// ....
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Error404 from '../pages/Error404';

//Routes
// ....
const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false, 
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSingIn,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            }, 
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
]

export default routes;