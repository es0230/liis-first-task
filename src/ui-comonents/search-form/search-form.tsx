import { Formik } from 'formik';
import {
  Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { SearchInputNames } from '../../constants/search-input-names';
import { useAppDispatch } from '../../hooks';
import { SearchParameters } from '../../models/search-parameters';
import { fetchHotels } from '../../redux/actions';
import Input from '../input/input';
import DateInput from './search-form-components/date-input';

import { commonStyles } from '../../constants/common-styles';

const initialDate = dayjs();

const formInitialValues = {
  [SearchInputNames.City]: 'Москва',
  [SearchInputNames.CheckIn]: initialDate.format('DD.MM.YYYY'),
  [SearchInputNames.Duration]: 1,
};

const validationSchema = yup.object().shape({
  [SearchInputNames.City]: yup.string().required('Необходимо ввести название города'),
  [SearchInputNames.CheckIn]: yup.string().required('Необходимо выбрать дату заезда'),
  [SearchInputNames.Duration]: yup.number().min(1).max(31),
});

type FormikProps = {
  city: string,
  checkIn: string,
  duration: number,
};

const SearchForm = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const getHotels = (payload: SearchParameters) => {
    dispatch(fetchHotels(payload));
  };

  useEffect(() => {
    getHotels({ ...formInitialValues, checkIn: initialDate.format('YYYY-MM-DD') });
  }, []);

  const handleFormSubmit = ({ city, duration }: FormikProps) => {
    getHotels({ city, checkIn: initialDate.format('YYYY-MM-DD'), duration });
  };

  return (
    <View style={commonStyles.searchBlockWrapper}>
      <Text style={commonStyles.searchBlockHeader}>Куда едем?</Text>

      <Formik initialValues={formInitialValues} onSubmit={handleFormSubmit} validationSchema={validationSchema}>
        {({
          values, errors, touched, isValid, handleBlur, handleChange, handleSubmit
        }) => (
          <View style={{ gap: 16 }}>
            <Input
              placeholder="Город"
              error={errors[SearchInputNames.City]}
              touched={touched[SearchInputNames.City]}
              onChangeText={handleChange(SearchInputNames.City)}
              onBlur={handleBlur(SearchInputNames.City)}
              value={values[SearchInputNames.City]}
              name={SearchInputNames.City}
            />

            <View style={styles.inputContainer}>
              <DateInput
                error={errors[SearchInputNames.CheckIn]}
                touched={touched[SearchInputNames.CheckIn]}
                onChangeText={handleChange(SearchInputNames.CheckIn)}
                onBlur={handleBlur(SearchInputNames.CheckIn)}
                value={values[SearchInputNames.CheckIn]}
                name={SearchInputNames.CheckIn}
              >
                <Image
                  style={commonStyles.numeralInputImage}
                  source={require('../../images/calendar.png')}
                />
              </DateInput>

              <Input
                placeholder="Длительность"
                error={errors[SearchInputNames.Duration]}
                touched={touched[SearchInputNames.Duration]}
                onChangeText={handleChange(SearchInputNames.Duration)}
                onBlur={handleBlur(SearchInputNames.Duration)}
                value={`${values[SearchInputNames.Duration]}`}
                name={SearchInputNames.Duration}
              >
                <Image
                  style={commonStyles.numeralInputImage}
                  source={require('../../images/clock.png')}
                />
              </Input>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={1}
              style={[commonStyles.submit,
                (isValid && Object.values(touched).reduce((a, b) => a && b, true) && commonStyles.submitEnabled) || {}]}
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
