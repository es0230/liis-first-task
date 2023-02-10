import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {
  Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

import { getNumericDeclension } from '../../helpers/get-numeric-declension';
import { useAppDispatch } from '../../hooks';
import { FavoriteHotel } from '../../models/hotel';
import { deleteFromFavorites } from '../../redux/app-data/app-data';

  type HotelItemProps = {
    hotel: FavoriteHotel,
  };

const FavoriteHotelItem = ({ hotel }: HotelItemProps): JSX.Element => {
  const {
    hotelName, stars, priceFrom, checkIn, duration
  } = hotel;

  const dispatch = useAppDispatch();

  const formattedDuration = getNumericDeclension(duration, ['ночь', 'ночи', 'ночей']);

  const handleFavoritePress = () => {
    dispatch(deleteFromFavorites({ ...hotel, checkIn, duration }));
  };

  return (
    <View style={styles.hotelBlock}>
      <View style={styles.mainInfo}>
        <Image source={require('../../images/house.png')} />

        <View style={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.importantText, { flex: 1, paddingRight: 10, height: 40 }]}>{hotelName}</Text>

            <TouchableOpacity onPress={handleFavoritePress}>
              <Image source={require('../../images/filled-heart.png')} />
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

      <View style={styles.additionalInfo}>
        <Text style={styles.secondaryText}>{dayjs(checkIn).locale('ru').format('DD MMMM YYYY')}</Text>

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
  additionalPriceInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  additionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default FavoriteHotelItem;
