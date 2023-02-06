import { FlatList, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../../constants/common-styles";
import { Hotel } from "../../models/hotel";
import HotelItem from "../../ui-comonents/hotel-item/hotel-item";
import SearchForm from "../../ui-comonents/search-form/search-form";

const mockHotels: Hotel[] = [
    {
        title: 'a',
        isFavorite: false,
        rating: 3,
        roomsLeft: 2,
        price: 10001,
        id: 1,
    },
    {
        title: 'a',
        isFavorite: false,
        rating: 3,
        roomsLeft: 2,
        price: 10001,
        id: 2,
    },
    {
        title: 'a',
        isFavorite: false,
        rating: 3,
        roomsLeft: 2,
        price: 10001,
        id: 3,
    },
    {
        title: 'a',
        isFavorite: false,
        rating: 3,
        roomsLeft: 2,
        price: 10001,
        id: 4,
    },
    {
        title: 'a',
        isFavorite: false,
        rating: 3,
        roomsLeft: 2,
        price: 10001,
        id: 5,
    },
]

const SearchScreen = ():JSX.Element => {
    return (
        <View style={[commonStyles.container, {paddingHorizontal: 16, paddingTop: 69, gap: 24}]}>
            <View style={styles.header}>
                <Text style={commonStyles.screenHeader}>Simple Hotel Check</Text>
                <Text style={commonStyles.screenHeader}>E</Text>
            </View>

            <SearchForm />
                
            <View style={{gap: 16}}>
                <Text style={commonStyles.searchBlockHeader}>Подходящие бронирования</Text>
                <FlatList
                    data={mockHotels}
                    renderItem={({ item }) => <HotelItem hotel={item} />}
                    keyExtractor={(item) => item.id}
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
    searchResults: {

    },
});

export default SearchScreen;
