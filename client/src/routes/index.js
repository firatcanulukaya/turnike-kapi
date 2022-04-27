import Login from "../components/Login/Login";
import CovidTest from "../components/CovidTest/CovidTest";
import StudentPanel from "../components/StudentPanel/StudentPanel";
import Register from "../components/Register/Register";
import NotFound from "../components/NotFound/NotFound";

export const routes = [
    {
        path: '/',
        component: Login,
        exact: true,
    },
    {
        path: '/kayit',
        component: Register,
        exact: true,
    },
    {
        path: '/test-yukle',
        component: CovidTest,
        exact: true,
    },
    {
        path: '/ogrenci',
        component: StudentPanel,
        exact: true,
    },
    {
        path: '*',
        component: NotFound,
        exact: true,
    }
]