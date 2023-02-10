import {
  ActivityIndicator,
  FlatList, Image, Text, TouchableOpacity, View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectDuration, selectHotels, selectHotelsFetchFailed, selectIsLoading
} from '../../redux/app-data/selectors';
import { logOut } from '../../redux/user-data/user-data';
import HotelItem from '../../ui-comonents/hotel-item/hotel-item';
import SearchForm from '../../ui-comonents/search-form/search-form';
import { ScreenNames } from '../../constants/screen-names';
import { RootStackParamList } from '../../navigation/main-navigator';
import { SearchParameters } from '../../models/search-parameters';
import { setDuration } from '../../redux/app-data/app-data';

import { commonStyles } from '../../constants/common-styles';
import FetchFailedMessage from '../../ui-comonents/fetch-failed-message/fetch-failed-message';

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, ScreenNames.Search>;

const SearchScreen = ({ navigation }: SearchScreenProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(selectHotels);
  const currentDuration = useAppSelector(selectDuration);
  const isLoading = useAppSelector(selectIsLoading);
  const isFetchFailed = useAppSelector(selectHotelsFetchFailed);

  const checkIn = dayjs().format('YYYY-MM-DD');

  const handleLogoutPress = () => {
    dispatch(logOut());

    AsyncStorage.clear();
  };

  const onSearchPress = (searchParams: SearchParameters) => {
    navigation.navigate(ScreenNames.Results, searchParams);

    dispatch(setDuration(searchParams.duration));
  };

  const content = isFetchFailed
    ? <FetchFailedMessage />
    : (
      <FlatList
        data={hotels}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
        renderItem={({ item }) => <HotelItem hotel={item} checkIn={checkIn} duration={currentDuration} />}
        keyExtractor={(item) => `${item.hotelId}${checkIn}${currentDuration}`}
        showsVerticalScrollIndicator={false}
      />
    );

  return (
    <View style={[commonStyles.container, { paddingHorizontal: 16, paddingTop: 69, gap: 24 }]}>
      <View style={commonStyles.headerContainer}>
        <Text style={commonStyles.screenHeaderText}>Simple Hotel Check</Text>
        <TouchableOpacity onPress={handleLogoutPress}>
          <Image source={require('../../images/log-out.png')} />
        </TouchableOpacity>
      </View>

      <SearchForm onSearchPress={onSearchPress} />

      <View style={{
        flex: 1, gap: 16,
      }}
      >
        <Text style={commonStyles.searchBlockHeader}>Подходящие бронирования</Text>
        {isLoading
          ? <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#5AC8FA" />
          : content}

      </View>
    </View>
  );
};

export default SearchScreen;
