import {
  FlatList,
  StyleSheet,
  Text, View
} from 'react-native';

import { SortOrders, SortTypes } from '../../constants/sort';
import { useAppDispatch } from '../../hooks';
import { Hotel } from '../../models/hotel';
import { setFavoriteHotels, setSortOrder, setSortType } from '../../redux/app-data/app-data';
import HotelItem from '../hotel-item/hotel-item';
import SortOption from './sort-option';

type FavoriteSortProps = {
  hotels: Hotel[],
  duration: number,
};

enum SortTypesToHotelKeys {
  rating = 'stars',
  price = 'priceFrom',
}

const FavoriteSort = ({ hotels, duration }: FavoriteSortProps) => {
  const dispatch = useAppDispatch();

  const onSortOptionPress = (sortType: SortTypes, sortOrder: SortOrders) => {
    dispatch(setSortOrder(sortOrder));
    dispatch(setSortType(sortType));

    if (sortOrder === SortOrders.Asc) {
      dispatch(
        setFavoriteHotels(
          [...hotels].sort((a, b) => a[SortTypesToHotelKeys[sortType]] - b[SortTypesToHotelKeys[sortType]])
        )
      );
    } else {
      dispatch(
        setFavoriteHotels(
          [...hotels].sort((a, b) => b[SortTypesToHotelKeys[sortType]] - a[SortTypesToHotelKeys[sortType]])
        )
      );
    }
  };

  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 16,
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
        data={hotels}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => <HotelItem hotel={item} duration={duration} />}
        keyExtractor={(item) => `${item.hotelId}`}
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
