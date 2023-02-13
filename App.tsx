/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useAppSelector } from './src/hooks';
import MainNavigator from './src/navigation/main-navigator';
import { selectIsAuth } from './src/redux/user-data/selectors';
import AuthForm from './src/ui-comonents/auth-form/auth-form';

function App(): JSX.Element {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    isAuth ?
      <MainNavigator />
      : <AuthForm />
  );
}

export default App;
