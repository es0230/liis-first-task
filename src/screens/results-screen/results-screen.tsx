import {
  FlatList, Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import PagerView from 'react-native-pager-view';
import { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectHotels } from '../../redux/app-data/selectors';
import { logOut } from '../../redux/user-data/user-data';
import HotelItem from '../../ui-comonents/hotel-item/hotel-item';
import { ScreenNames } from '../../constants/screen-names';
import { RootStackParamList } from '../../navigation/main-navigator';
import { getNumericDeclension } from '../../helpers/get-numeric-declension';
import { ResultTabs } from '../../constants/result-tabs';
import FavoriteSort from '../../ui-comonents/favorite-sort/favorite-sort';

import { commonStyles } from '../../constants/common-styles';

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, ScreenNames.Results>;

const ResultsScreen = ({ route, navigation }: ResultsScreenProps) => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(selectHotels);
  const [currentTab, setCurrentTab] = useState(ResultTabs.Search);

  const pagerViewRef = useRef<PagerView | null>(null);
  const firstInitRef = useRef(true);

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

  const handlePageScroll = () => {
    if (firstInitRef.current) {
      firstInitRef.current = false;
      return;
    }

    setCurrentTab(currentTab === ResultTabs.Search
      ? ResultTabs.Favorites
      : ResultTabs.Search);
  };

  const handleTabPress = (type: ResultTabs) => {
    const page = +(type !== ResultTabs.Search);

    pagerViewRef.current?.setPage(page);
  };

  return (
    <View style={[commonStyles.container]}>
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
          <TouchableOpacity
            onPress={() => handleTabPress(ResultTabs.Search)}
            style={[styles.resultsTab, currentTab === ResultTabs.Search && styles.activeResultsTab]}
          >
            <Text style={styles.resultsTabText}>Поиск</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTabPress(ResultTabs.Favorites)}
            style={[styles.resultsTab, currentTab === ResultTabs.Favorites && styles.activeResultsTab]}
          >
            <Text style={styles.resultsTabText}>Избранное</Text>
          </TouchableOpacity>
        </View>
      </View>

      <PagerView
        style={styles.pagerView}
        ref={pagerViewRef}
        initialPage={0}
        onPageSelected={handlePageScroll}
      >
        <View style={[styles.listContainer, { paddingBottom: 16 }]} key={1}>
          <FlatList
            style={styles.hotelList}
            data={hotels}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item }) => <HotelItem checkIn={checkIn} hotel={item} duration={duration} />}
            keyExtractor={(item) => `${item.hotelId}`}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <FavoriteSort key={2} />
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
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
  hotelList: {
    marginTop: 24
  },
  listContainer: {
    flex: 1,
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
