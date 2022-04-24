import Login from "../components/Login/Login";
import CovidTest from "../components/CovidTest/CovidTest";
import StudentPanel from "../components/StudentPanel/StudentPanel";

export const routes = [
    {
        path: '/',
        component: Login,
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
    }
]