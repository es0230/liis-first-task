import {
  FlatList,
  StyleSheet,
  Text, View
} from 'react-native';

import { SortOrders, SortTypes } from '../../constants/sort';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setSortOrder, setSortType, sortHotels
} from '../../redux/app-data/app-data';
import { selectFavoriteHotels } from '../../redux/app-data/selectors';
import FavoriteHotelItem from '../favorite-hotel-item/favorite-hotel-item';
import SortOption from './sort-option';

const FavoriteSort = () => {
  const dispatch = useAppDispatch();

  const favoriteHotels = useAppSelector(selectFavoriteHotels);

  const onSortOptionPress = (sortType: SortTypes, sortOrder: SortOrders) => {
    dispatch(setSortOrder(sortOrder));
    dispatch(setSortType(sortType));
    dispatch(sortHotels());
  };

  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 16,
    }}
    >
      <View style={styles.sortWrapper}>
        <Text>Cортировать по: </Text>

        <View style={styles.sortOptionsWrapper}>
          <SortOption
            text="Рейтинг"
            sortType={SortTypes.Rating}
            onSortOptionPress={onSortOptionPress}
          />

          <SortOption
            text="Цена"
            sortType={SortTypes.Price}
            onSortOptionPress={onSortOptionPress}
          />
        </View>
      </View>

      <FlatList
        style={{
          marginTop: 24
        }}
        data={favoriteHotels}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => <FavoriteHotelItem hotel={item} />}
        keyExtractor={(item) => `${item.hotelId}${item.checkIn}${item.duration}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sortWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sortOptionsWrapper: {
    flexDirection: 'row', justifyContent: 'space-between', gap: 8,
  }
});

export default FavoriteSort;
