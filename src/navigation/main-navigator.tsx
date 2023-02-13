import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ScreenNames } from '../constants/screen-names';
import { SearchInputNames } from '../constants/search-input-names';
import ResultsScreen from '../screens/results-screen/results-screen';
import SearchScreen from '../screens/search-screen/search-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={ScreenNames.Search} component={SearchScreen} options={{ headerShown: false }} />

      <Stack.Screen name={ScreenNames.Results} component={ResultsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export type RootStackParamList = {
  [ScreenNames.Search]: undefined;
  [ScreenNames.Results]: {
    [SearchInputNames.City]: string,
    [SearchInputNames.CheckIn]: string,
    [SearchInputNames.Duration]: number,
  };
};

export default MainNavigator;
