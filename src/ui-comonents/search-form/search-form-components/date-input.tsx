import dayjs from 'dayjs';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View
} from 'react-native';

import { SearchInputNames } from '../../../constants/search-input-names';

type DateInputProps = {
  onChangeText: ((text: string) => void),
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
  error?: string,
  touched?: boolean,
  children: JSX.Element,
  value: string,
  name: SearchInputNames.CheckIn,
};

const DateInput = ({
  onBlur, error, touched, onChangeText, children, ...additional
}: DateInputProps) => {
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

  const handleDatePickConfirm = (date: Date) => {
    setOpen(false);
    handleDateChange(date);
  };

  const handleDatePickCancel = () => {
    setOpen(false);
  };

  return (
    <View style={styles.numeralInputWrapper}>
      <TextInput
        editable={false}
        style={[
          styles.textInput,
          (error && touched && !isFocused && styles.textInputError) || {},
          styles.searchInput,
        ]}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        {...additional}
      />

      <TouchableOpacity activeOpacity={1} onPress={handleIconPress}>
        {children}
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={handleDatePickConfirm}
        onCancel={handleDatePickCancel}
      />

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

export default DateInput;
