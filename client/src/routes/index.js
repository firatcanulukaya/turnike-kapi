import Login from "../components/Login/Login";
import CovidTest from "../components/CovidTest/CovidTest";

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
    }
]