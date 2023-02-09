import {
  FlatList, Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectHotels } from '../../redux/app-data/selectors';
import { logOut } from '../../redux/user-data/user-data';
import HotelItem from '../../ui-comonents/hotel-item/hotel-item';
import { ScreenNames } from '../../constants/screen-names';
import { RootStackParamList } from '../../navigation/main-navigator';
import { getNumericDeclension } from '../../helpers/get-numeric-declension';

import { commonStyles } from '../../constants/common-styles';

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, ScreenNames.Results>;

const ResultsScreen = ({ route, navigation }: ResultsScreenProps) => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(selectHotels);

  const { city, checkIn, duration } = route.params;
  const formattedCheckIn = dayjs(checkIn).locale('ru').format('DD MMMM YYYY');
  const formattedDuration = getNumericDeclension(duration, ['ночь', 'ночи', 'ночей']);

  const handleLogoutPress = () => {
    dispatch(logOut());
    AsyncStorage.clear();
  };

  const handleBackIconPress = () => {
    navigation.navigate(ScreenNames.Search);
  };

  return (
    <View style={[commonStyles.container, { gap: 24 }]}>
      <View style={styles.navigatorContainer}>
        <View style={commonStyles.headerContainer}>
          <TouchableOpacity onPress={handleBackIconPress}>
            <Image style={styles.backIcon} source={require('../../images/back.png')} />
          </TouchableOpacity>

          <Text style={commonStyles.screenHeaderText}>Simple Hotel Check</Text>

          <TouchableOpacity onPress={handleLogoutPress}>
            <Image source={require('../../images/log-out.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchParams}>
          <Image source={require('../../images/search-normal.png')} />

          <Text>
            {`${city}, ${formattedCheckIn}, ${formattedDuration}`}
          </Text>
        </View>

        <View style={styles.resultsTabsContainer}>
          <View style={[styles.resultsTab, styles.activeResultsTab]}>
            <Text style={styles.resultsTabText}>Поиск</Text>
          </View>

          <View style={styles.resultsTab}>
            <Text>Избранное</Text>
          </View>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={hotels}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => <HotelItem hotel={item} duration={duration} />}
          keyExtractor={(item) => `${item.hotelId}`}
        />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  searchParams: {
    height: 50,
    borderRadius: 10,
    color: '#424242',
    paddingVertical: 15,
    paddingLeft: 15,
    borderColor: '#5ac8fa',
    borderWidth: 1,
    flexDirection: 'row',
    gap: 16,
  },
  listContainer: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 16,
  },
  resultsTabsContainer: {
    flexDirection: 'row'
  },
  resultsTab: {
    alignItems: 'center',
    flex: 1,
  },
  resultsTabText: {
    marginBottom: 4,
  },
  backIcon: {
    width: 14,
    height: 24,
    marginHorizontal: 5
  },
  activeResultsTab: {
    borderBottomColor: '#5ac8fa',
    borderBottomWidth: 3,
  },
  navigatorContainer: {
    paddingTop: 69,
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 16,
    borderRadius: 16,
    paddingBottom: 16,
    gap: 24,
  },
});

export default ResultsScreen;
