import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { commonStyles } from "../../constants/common-styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Hotel } from "../../models/hotel";
import { selectHotels } from "../../redux/app-data/selectors";
import { selectIsAuth } from "../../redux/user-data/selectors";
import { logOut } from "../../redux/user-data/user-data";
import HotelItem from "../../ui-comonents/hotel-item/hotel-item";
import SearchForm from "../../ui-comonents/search-form/search-form";

const SearchScreen = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const hotels = useAppSelector(selectHotels);

    const handleLogoutPress = () => {
        dispatch(logOut());
    };

    return (
        <View style={[commonStyles.container, {paddingHorizontal: 16, paddingTop: 69, gap: 24}]}>
            <View style={styles.header}>
                <Text style={commonStyles.screenHeader}>Simple Hotel Check</Text>
                <TouchableOpacity onPress={handleLogoutPress}>
                    <Image source={require('../../images/log-out.png')} />
                </TouchableOpacity>
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
        alignItems: 'center'
    },
});

export default SearchScreen;
