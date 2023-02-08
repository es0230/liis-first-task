/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useAppSelector } from './src/hooks';
import { selectIsAuth } from './src/redux/user-data/selectors';
import SearchScreen from './src/screens/search-screen/search-screen';
import AuthForm from './src/ui-comonents/auth-form/auth-form';


function App(): JSX.Element {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <>
      {isAuth ?
      <SearchScreen />
      : <AuthForm />}
    </>
  );
}

export default App;
