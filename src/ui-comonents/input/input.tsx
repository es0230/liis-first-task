import { useState } from 'react';
import {
  View, TextInput, Text, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData, ViewStyle
} from 'react-native';

import { AuthInputNames } from '../../constants/auth-input-names';
import { SearchInputNames } from '../../constants/search-input-names';

import { commonStyles } from '../../constants/common-styles';

type InputProps = {
  placeholder: string,
  onChangeText: ((text: string) => void),
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
  value: string,
  error?: string,
  touched?: boolean,
  name: AuthInputNames | SearchInputNames,
  children?: JSX.Element,
  additionalStyles?: ViewStyle,
  inputMode?: string,
  maxLength?: number,
  contextMenuHidden?: boolean,
};

const Input = ({
  onBlur, error, touched, name, children, additionalStyles, ...aditional
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur(e);
    setIsFocused(false);
  };

  return (
    <View style={name === SearchInputNames.Duration && commonStyles.numeralInputWrapper}>
      <TextInput
        editable={name !== SearchInputNames.CheckIn}
        secureTextEntry={name === AuthInputNames.Password}
        style={[
          styles.textInput,
          additionalStyles,
          (error && touched && !isFocused && styles.textInputError) || {},
        ]}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        {...aditional}
      />

      {name === SearchInputNames.Duration && children}

      {error && touched && Object.values(AuthInputNames).some((el) => el === name)
        && !isFocused && <Text style={commonStyles.inputError}>{error}</Text>}
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
  textInputError: {
    borderColor: '#ff3b30',
    borderWidth: 1,
  },
  searchInput: {
    borderColor: '#5ac8fa',
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default Input;
