import { Image, StyleSheet, Text, View } from "react-native";

import { getNumberedString } from "../../helpers/get-numbered-string";
import { Hotel } from "../../models/hotel";

type HotelItemProps = {
    hotel: Hotel
}

const HotelItem = ({ hotel }: HotelItemProps): JSX.Element => {
    const { hotelName, isFavorite, stars, priceFrom} = hotel;

    return (
        <View style={styles.hotelBlock}>
            <View style={styles.mainInfo}>
                <View>
                    <Image source={require('../../images/house.png')} />
                </View>

                <View style={{ flexGrow: 1, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.importantText}>{hotelName}</Text>
                        <Image source={require('../../images/empty-heart.png')}/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', gap: 6}}>
                            {Array.from({ length: 5 }, (v, i) => i)
                                .map(
                                    (el) => <Image source={stars > el ?
                                        require('../../images/filled-star.png') :
                                        require('../../images/empty-star.png')} />
                            )}
                        </View>
                        
                        <Text style={styles.secondaryText}>Осталось {getNumberedString(1, ['комната', 'комнаты', 'комнат'])}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.additionalInfo}>
                <Text style={styles.secondaryText}>Цена за 1 ночь: </Text>
                <Text style={styles.importantText}>{priceFrom} ₽</Text>
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
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
})

export default HotelItem;
