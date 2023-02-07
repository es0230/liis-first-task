import { FlatList, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../../constants/common-styles";
import { useAppSelector } from "../../hooks";
import { Hotel } from "../../models/hotel";
import { selectHotels } from "../../redux/app-data/selectors";
import HotelItem from "../../ui-comonents/hotel-item/hotel-item";
import SearchForm from "../../ui-comonents/search-form/search-form";

// const mockHotels: Hotel[] = [
//     {
//         title: 'FFFFFFFffdfsdfsdfa',
//         isFavorite: false,
//         rating: 3,
//         roomsLeft: 2,
//         price: 10201,
//         id: 1,
//     },
//     {
//         title: 'Parks inn',
//         isFavorite: false,
//         rating: 4,
//         roomsLeft: 2,
//         price: 10221,
//         id: 2,
//     },
//     {
//         title: 'Moskva',
//         isFavorite: false,
//         rating: 2,
//         roomsLeft: 2,
//         price: 20001,
//         id: 3,
//     },
//     {
//         title: 'Mariott',
//         isFavorite: false,
//         rating: 1,
//         roomsLeft: 2,
//         price: 11001,
//         id: 4,
//     },
//     {
//         title: 'a',
//         isFavorite: false,
//         rating: 3,
//         roomsLeft: 2,
//         price: 10001,
//         id: 5,
//     },
// ];

const SearchScreen = (): JSX.Element => {
    const hotels = useAppSelector(selectHotels);

    return (
        <View style={[commonStyles.container, {paddingHorizontal: 16, paddingTop: 69, gap: 24}]}>
            <View style={styles.header}>
                <Text style={commonStyles.screenHeader}>Simple Hotel Check</Text>
                <Text style={commonStyles.screenHeader}>E</Text>
            </View>

            <SearchForm />
                
            <View style={{flex: 1, gap: 16}}>
                <Text style={commonStyles.searchBlockHeader}>Подходящие бронирования</Text>
                <FlatList
                    data={hotels}
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={({ item }) => <HotelItem hotel={item} />}
                    keyExtractor={(item) => `${item.hotelId}`}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default SearchScreen;
