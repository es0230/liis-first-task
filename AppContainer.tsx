import { Provider } from "react-redux";

import App from "./App";
import { store } from "./src/redux";

const AppContainer = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default AppContainer;
