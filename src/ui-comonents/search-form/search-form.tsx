import { Formik } from "formik";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from 'yup';
import dayjs from "dayjs";


import { SearchInputNames } from "../../constants/search-input-names";
import Input from "../input/input";

import { commonStyles } from "../../constants/common-styles";

const formInitialValues = {
    [SearchInputNames.City]: 'Москва',
    [SearchInputNames.CheckIn]: dayjs().format('DD.MM.YYYY'),
    [SearchInputNames.Duration]: '1',
};

const validationSchema = yup.object().shape({
    [SearchInputNames.City]: yup.string().required('Необходимо ввести название города'),
    [SearchInputNames.CheckIn]: yup.string().required('Необходимо выбрать дату заезда'),
    [SearchInputNames.Duration]: yup.number().min(1).max(31),
});



const SearchForm = (): JSX.Element => {
    const handleFormSubmit = () => {
    
    };

    return (
        <View style={commonStyles.searchBlockWrapper}>
            <Text style={commonStyles.searchBlockHeader}>Куда едем?</Text>
            
            <Formik initialValues={formInitialValues} onSubmit={handleFormSubmit} validationSchema={validationSchema}>
                {({values, errors, touched, isValid, handleBlur, handleChange, handleSubmit}) => (
                    <View style={{gap: 16}}>
                        <Input
                            placeholder='Город'
                            error={errors[SearchInputNames.City]}
                            touched={touched[SearchInputNames.City]}
                            onChangeText={handleChange(SearchInputNames.City)}
                            onBlur={handleBlur(SearchInputNames.City)}
                            value={values[SearchInputNames.City]}
                            name={SearchInputNames.City}
                        />

                        <View style={styles.inputContainer}>
                            <Input
                                placeholder='Дата заезда'
                                error={errors[SearchInputNames.CheckIn]}
                                touched={touched[SearchInputNames.CheckIn]}
                                onChangeText={handleChange(SearchInputNames.CheckIn)}
                                onBlur={handleBlur(SearchInputNames.CheckIn)}
                                value={values[SearchInputNames.CheckIn]}
                                name={SearchInputNames.CheckIn}
                            />

                            <Input
                                placeholder='Длительность'
                                error={errors[SearchInputNames.Duration]}
                                touched={touched[SearchInputNames.Duration]}
                                onChangeText={handleChange(SearchInputNames.Duration)}
                                onBlur={handleBlur(SearchInputNames.Duration)}
                                value={values[SearchInputNames.Duration]}
                                name={SearchInputNames.Duration}
                            />
                        </View>
                            
                        <TouchableOpacity 
                            onPress={handleSubmit} 
                            activeOpacity={1} 
                            style={[commonStyles.submit, isValid && Object.values(touched).reduce((a, b) => a && b, true) && commonStyles.submitEnabled || {}]}
                            disabled={!isValid}
                        >
                            <Text style={commonStyles.text}>Найти</Text>
                        </TouchableOpacity>
                    </View>                        
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        gap: 13
    },
});

export default SearchForm;
