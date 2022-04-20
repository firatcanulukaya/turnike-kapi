import {useSelector} from "react-redux";

const App = () => {
    const {test} = useSelector(state => state.utils);
    return (
        <div>
            {test}
        </div>
    );
}

export default App;
