import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, useState } from "react";
import { View, TextInput, Text, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { SearchInputNames } from "../../constants/search-input-names";

type InputProps = {
    placeholder: string,
    onChangeText: (e: string | ChangeEvent<any>) => void ,
    onBlur: (e: any) => void,
    value: string,
    error: string | undefined,
    touched: boolean | undefined,
    name: string
};

const Input = ({ onBlur, error, touched, name, ...aditional }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur(e);
        setIsFocused(false);
    };

    const isSearchInput = Object.values<string>(SearchInputNames).includes(name);
    
    return (
        <View style={
            name === SearchInputNames.CheckIn || name === SearchInputNames.Duration ?
            styles.inputWrapper :
            {}}
        > 
            <TextInput
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
    inputWrapper: {
        height: 50,
        width: '100%',
        flex: 1
    }
});

export default Input;
