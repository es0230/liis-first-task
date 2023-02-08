import dayjs from 'dayjs';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
} from 'react-native';

import { SearchInputNames } from '../../../constants/search-input-names';
import { commonStyles } from '../../../constants/common-styles';

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
  const [isOpen, setIsOpen] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur(e);
    setIsFocused(false);
  };

  const handleDateFieldPress = () => {
    setIsOpen(true);
  };

  const handleDateChange = (date: Date) => {
    onChangeText(dayjs(date).format('DD.MM.YYYY'));
    setDate(date);
  };

  const handleDatePickConfirm = (date: Date) => {
    setIsOpen(false);
    handleDateChange(date);
  };

  const handleDatePickCancel = () => {
    setIsOpen(false);
  };

  return (
    <TouchableOpacity style={styles.numeralInputWrapper} activeOpacity={1} onPress={handleDateFieldPress}>
      <TextInput
        editable={false}
        style={[
          commonStyles.textInput,
          (error && touched && !isFocused && commonStyles.textInputError) || {},
          commonStyles.searchInput,
        ]}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onPressOut={handleDateFieldPress}
        {...additional}
      />

      {children}

      <DatePicker
        modal
        open={isOpen}
        date={date}
        minimumDate={date}
        mode="date"
        locale="ru"
        onConfirm={handleDatePickConfirm}
        onCancel={handleDatePickCancel}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
