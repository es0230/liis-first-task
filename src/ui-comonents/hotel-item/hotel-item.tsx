import { Text, View } from "react-native";
import { commonStyles } from "../../constants/common-styles";
import { getNumberedString } from "../../helpers/get-numbered-string";
import { Hotel } from "../../models/hotel";

type HotelItemProps = {
    hotel: Hotel
}

const HotelItem = ({ hotel }: HotelItemProps): JSX.Element => {
    const { title, isFavorite, rating, roomsLeft, price} = hotel;

    return (
        <View style={commonStyles.searchBlockWrapper}>
            <View>
                <View></View>
                <View>
                    <View>
                        <Text>{title}</Text>
                        {/* иконка избранного тут */}
                    </View>
                    <View style={{
                        justifyContent: 'space-between',
                    }}>
                        {/* рейтинг тут */}
                        <Text>Осталось {getNumberedString(roomsLeft, ['комната', 'комнаты', 'комнат'])}</Text>
                    </View>
                </View>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>
                <Text>Цена за 1 ночь: </Text>
                <Text>{price}</Text>
            </View>
        </View>
    );
};

export default HotelItem;
