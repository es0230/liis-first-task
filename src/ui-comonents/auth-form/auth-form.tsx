import { Formik } from 'formik';
import {
  ImageBackground, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthInputNames } from '../../constants/auth-input-names';
import { useAppDispatch } from '../../hooks';
import { logIn } from '../../redux/user-data/user-data';
import Input from '../input/input';

import { commonStyles } from '../../constants/common-styles';

const validationSchema = yup.object().shape({
  [AuthInputNames.Email]: yup.string().email('Необходимо ввести валидный email').required('Необходимо ввести email'),
  [AuthInputNames.Password]: yup.string()
    .min(8, 'Пароль должен содержать не менее 8 символов').required('Необходимо ввести пароль')
});

const formInitialValues = {
  [AuthInputNames.Email]: '',
  [AuthInputNames.Password]: '',
};

const AuthForm = () => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = async () => {
    dispatch(logIn());

    await AsyncStorage.setItem('isAuth', 'true');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={commonStyles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require('../../images/auth-background.png')}
        >
          <View>
            <Text style={[commonStyles.text, { fontSize: 18 }]}>Добро пожаловать в</Text>
            <Text style={[commonStyles.text, commonStyles.screenHeaderText]}>Simple Hotel Check</Text>
          </View>

          <Formik initialValues={formInitialValues} onSubmit={handleFormSubmit} validationSchema={validationSchema}>
            {({
              values, dirty, errors, touched, isValid, handleBlur, handleChange, handleSubmit
            }) => (
              <View style={{ gap: 16 }}>
                <Input
                  placeholder="Логин"
                  error={errors[AuthInputNames.Email]}
                  touched={touched[AuthInputNames.Email]}
                  onChangeText={handleChange(AuthInputNames.Email)}
                  onBlur={handleBlur(AuthInputNames.Email)}
                  value={values[AuthInputNames.Email]}
                  name={AuthInputNames.Email}
                  inputMode="email"
                />

                <Input
                  placeholder="Пароль"
                  error={errors[AuthInputNames.Password]}
                  touched={touched[AuthInputNames.Password]}
                  onChangeText={handleChange(AuthInputNames.Password)}
                  onBlur={handleBlur(AuthInputNames.Password)}
                  value={values[AuthInputNames.Password]}
                  name={AuthInputNames.Password}
                />

                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={1}
                  style={[
                    commonStyles.submit,
                    (isValid && dirty) && commonStyles.submitEnabled,
                    { marginTop: 8 }
                  ]}
                >
                  <Text style={commonStyles.text}>Войти</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: '50%',
    paddingTop: '15%',
    gap: 32,
  },
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

export default AuthForm;
