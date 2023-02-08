import { useState } from 'react';
import {
  View, TextInput, Text, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData
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
};

const Input = ({
  onBlur, error, touched, name, children, ...aditional
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur(e);
    setIsFocused(false);
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

  return (
    <View style={(name === SearchInputNames.Duration && commonStyles.numeralInputWrapper) || {}}>
      <TextInput
        editable={name !== SearchInputNames.CheckIn}
                // @ts-ignore
        inputMode={getInputModeByFieldName(name)}
        secureTextEntry={name === AuthInputNames.Password}
        style={[
          styles.textInput,
          (error && touched && !isFocused && styles.textInputError) || {},
          isSearchInput ? styles.searchInput : {},
        ]}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        {...aditional}
      />

      {name === SearchInputNames.Duration && children}

      {error && touched && !isFocused
            && <Text style={styles.error}>{error}</Text>}
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
});

export default Input;
