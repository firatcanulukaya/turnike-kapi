import {useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";
import {routes} from "./routes";
import "./assets/style/style.css";

const App = () => {
    const {test} = useSelector(state => state.utils);
    return (
        <div>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} exact={route.exact} path={route.path}
                           element={<route.component/>}/>
                ))}
            </Routes>
        </div>
    );
}

export default App;
