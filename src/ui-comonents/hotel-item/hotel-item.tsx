import {
  Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { getNumericDeclension } from '../../helpers/get-numeric-declension';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FavoriteHotel } from '../../models/hotel';
import { addToFavoriteHotels, deleteFromFavorites, sortHotels } from '../../redux/app-data/app-data';
import { selectIsFavoriteHotel } from '../../redux/app-data/selectors';

type HotelItemProps = {
  hotel: FavoriteHotel,
  isInFavoritesList: boolean,
};

const HotelItem = ({
  hotel, isInFavoritesList
}: HotelItemProps): JSX.Element => {
  const {
    hotelName, stars, priceFrom, checkIn, duration
  } = hotel;

  const isFavorite = isInFavoritesList || useAppSelector(selectIsFavoriteHotel({ ...hotel, checkIn, duration }));

  const dispatch = useAppDispatch();

  const formattedDuration = getNumericDeclension(duration, ['ночь', 'ночи', 'ночей']);

  const handleFavoritePress = () => {
    if (isFavorite) {
      dispatch(deleteFromFavorites({ ...hotel, checkIn, duration }));
    } else {
      dispatch(addToFavoriteHotels({ ...hotel, checkIn, duration }));
      dispatch(sortHotels());
    }
  };

  return (
    <View style={styles.hotelBlock}>
      <View style={styles.mainInfo}>
        <Image source={require('../../images/house.png')} />

        <View style={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.importantText, { flex: 1, paddingRight: 10, height: 40 }]}>{hotelName}</Text>

            <TouchableOpacity onPress={handleFavoritePress}>
              <Image source={isFavorite
                ? require('../../images/filled-heart.png')
                : require('../../images/empty-heart.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {Array.from({ length: 5 }, (v, i) => i)
                .map(
                  (el, i) => (
                    <Image
                      key={i}
                      source={stars > el
                        ? require('../../images/filled-star.png')
                        : require('../../images/empty-star.png')}
                    />
                  )
                )}
            </View>

            <Text style={styles.secondaryText}>
              {`Осталось ${getNumericDeclension(1, ['комната', 'комнаты', 'комнат'])}`}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.additionalInfo, !isInFavoritesList && { justifyContent: 'flex-end', }]}>
        {isInFavoritesList
          && (
          <Text
            style={styles.secondaryText}
          >
            {dayjs(hotel.checkIn).locale('ru').format('DD MMMM YYYY')}
          </Text>
          )}

        <View style={styles.additionalPriceInfo}>
          <Text style={styles.secondaryText}>{`Цена за ${formattedDuration}: `}</Text>

          <Text style={styles.importantText}>{`${priceFrom} ₽`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hotelBlock: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  importantText: {
    fontSize: 17,
  },
  secondaryText: {
    color: '#878787',
    fontSize: 13,
  },
  mainInfo: {
    flexDirection: 'row',
    gap: 12,
    borderBottomWidth: 1,
    borderColor: '#f4f4f4',
    paddingBottom: 8,
    marginBottom: 8
  },
  additionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  additionalPriceInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});

export default HotelItem;
