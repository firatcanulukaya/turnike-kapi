import {useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";
import {routes} from "./routes";
import "./assets/style/style.css";

const App = () => {
    const {test} = useSelector(state => state.utils);
    return (
        <>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} exact={route.exact} path={route.path}
                           element={<route.component/>}/>
                ))}
            </Routes>
        </>
    );
}

export default App;
