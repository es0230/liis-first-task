import dayjs from "dayjs";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, useState } from "react";
import { View, TextInput, Text, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData, Image, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { AuthInputNames } from "../../constants/auth-input-names";
import { SearchInputNames } from "../../constants/search-input-names";

type InputProps = {
    placeholder: string,
    onChangeText: (e: string | ChangeEvent<any>) => void ,
    onBlur: (e: any) => void,
    value: string,
    error: string | undefined,
    touched: boolean | undefined,
    name: AuthInputNames | SearchInputNames
};

const Input = ({ onBlur, error, touched, name, ...aditional }: InputProps) => {
    const { onChangeText } = aditional;

    const [isFocused, setIsFocused] = useState(false);

    const [date, setDate] = useState(dayjs().toDate());
    const [open, setOpen] = useState(false);

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur(e);
        setIsFocused(false);
    };

    const handleIconPress = () => {
        setOpen(true);
    };

    const handleDateChange = (date: Date) => {
        onChangeText(dayjs(date).format('DD.MM.YYYY'));
        setDate(date);
    };
    
    const getInputModeByFieldName = (name: AuthInputNames | SearchInputNames) => {
        switch (name) {
            case SearchInputNames.Duration:
                return 'numeric';
            case AuthInputNames.Email:
                return 'email';
            default:
                return 'text';
        }
    };

    const isSearchInput = Object.values<string>(SearchInputNames).includes(name);
    const isNumeralInput = name === SearchInputNames.CheckIn || name === SearchInputNames.Duration;
    
    return (
        <View style={isNumeralInput && styles.numeralInputWrapper || {}}> 
            <TextInput
                editable={name !== SearchInputNames.CheckIn}
                // @ts-ignore
                inputMode={getInputModeByFieldName(name)}
                secureTextEntry={name === 'password'}
                style={[
                    styles.textInput,
                    error && touched && !isFocused && styles.textInputError || {},
                    isSearchInput ? styles.searchInput : {},
                ]} 
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                {...aditional}
            />

            {isNumeralInput &&
                <>
                    <TouchableOpacity activeOpacity={1} onPress={handleIconPress}>
                        <Image
                            style={styles.numeralInputImage}
                            source={name === SearchInputNames.CheckIn ?
                                require('../../images/calendar.png') :
                                require('../../images/clock.png')}
                        />
                    </TouchableOpacity>
                    {name === SearchInputNames.CheckIn && 
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false);
                                handleDateChange(date);
                            }}
                            onCancel={() => {
                                setOpen(false);
                            }}
                        />
                    }
                    
                </>
            }

            {error && touched && !isFocused &&                                
            <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10, 
        color: '#424242',
        paddingVertical: 15,
        paddingLeft: 15,
    },
    error: {
        color: 'white',
        position: 'absolute',
        top: 48,
    },
    textInputError: {
        borderColor: '#ff3b30',
        borderWidth: 1,
    },
    searchInput: {
        borderColor: '#5ac8fa',
        borderWidth: 1,
        paddingLeft: 10,
    },
    numeralInputWrapper: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    numeralInputImage: {
        position: 'relative',
        right: 33,
    }
});

export default Input;
