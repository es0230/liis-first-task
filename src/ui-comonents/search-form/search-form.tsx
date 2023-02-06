import { Formik } from "formik";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from 'yup';
import { commonStyles } from "../../constants/common-styles";
import { SearchInputNames } from "../../constants/search-input-names";
import Input from "../input/input";
import DatePicker from 'react-native-date-picker'
import { useState } from "react";

const formInitialValues = {
    city: 'Москва',
    checkIn: '03.02.2023',
    duration: '1',
};

const validationSchema = yup.object().shape({
    city: yup.string().required('Необходимо ввести название города'),
    checkIn: yup.date().required('Необходимо выбрать дату заезда'),
    duration: yup.number().min(1).max(31),
});



const SearchForm = (): JSX.Element => {

    const handleFormSubmit = () => {
    
    };

    // const [date, setDate] = useState(new Date());
    // const [open, setOpen] = useState(false);

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

                        {/* <View style={styles.inputContainer}>
                            <View style={styles.test1}>
                                <Input
                                    placeholder='Дата заезда'
                                    error={errors[SearchInputNames.CheckIn]}
                                    touched={touched[SearchInputNames.CheckIn]}
                                    onChangeText={handleChange(SearchInputNames.CheckIn)}
                                    onBlur={handleBlur(SearchInputNames.CheckIn)}
                                    value={values[SearchInputNames.CheckIn]}
                                    name={SearchInputNames.CheckIn}
                                />
                            </View>

                            <View style={styles.test1}>
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
                        </View> */}

                        <View style={styles.inputContainer}>
                            {/* <View style={styles.test1}> */}
                                <Input
                                    placeholder='Дата заезда'
                                    error={errors[SearchInputNames.CheckIn]}
                                    touched={touched[SearchInputNames.CheckIn]}
                                    onChangeText={handleChange(SearchInputNames.CheckIn)}
                                    onBlur={handleBlur(SearchInputNames.CheckIn)}
                                    value={values[SearchInputNames.CheckIn]}
                                    name={SearchInputNames.CheckIn}
                                />
                            {/* </View> */}

                            {/* <View style={styles.test1}> */}
                                <Input
                                    placeholder='Длительность'
                                    error={errors[SearchInputNames.Duration]}
                                    touched={touched[SearchInputNames.Duration]}
                                    onChangeText={handleChange(SearchInputNames.Duration)}
                                    onBlur={handleBlur(SearchInputNames.Duration)}
                                    value={values[SearchInputNames.Duration]}
                                    name={SearchInputNames.Duration}
                                />
                            {/* </View> */}
                        </View>
                            
                        <TouchableOpacity 
                            onPress={handleSubmit} 
                            activeOpacity={0.7} 
                            
                            style={[commonStyles.submit, isValid && Object.values(touched).reduce((a, b) => a && b, true) ? commonStyles.submitEnabled : {}]} disabled={!(isValid && Object.values(touched).reduce((a, b) => a && b, true))}>
                            <Text style={commonStyles.text}>Найти</Text>
                        </TouchableOpacity>

                        {/* <DatePicker
                                modal
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            /> */}
                    </View>                        
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row', gap: 13
    },
    test1: { height: 50, width: '100%', flex: 1},
});

export default SearchForm;
