/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Provider } from 'react-redux';
import { store } from './src/redux';
import SearchScreen from './src/screens/search-screen/search-screen';
import AuthForm from './src/ui-comonents/auth-form/auth-form';


function App(): JSX.Element {
  return (
    <Provider store={store}>
        {/* <AuthForm /> */}
        <SearchScreen />
    </Provider>
    
  );
}

export default App;
