import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, useState } from "react";
import { View, TextInput, Text, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

type InputProps = {
    placeholder: string,
    onChangeText: (e: string | ChangeEvent<any>) => void ,
    onBlur: (e: any) => void,
    value: string,
    error: string | undefined,
    touched: boolean | undefined,
    name: string
};

const Input = ({ placeholder, onChangeText, onBlur, value, error, touched, name }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur(e);
        setIsFocused(false);
    };
    
    return (
        <View>
            <TextInput
                secureTextEntry={name === 'password'}
                placeholder={placeholder}
                style={[styles.textInput, error && touched && !isFocused ? styles.textInputError : {}]} 
                onChangeText={onChangeText}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                value={value}
            />

            {error && touched && !isFocused ?                                
            <Text style={styles.error}>{error}</Text> :  
            null}
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
        marginBottom: 16,
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
});

export default Input;
