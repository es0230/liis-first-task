import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectIsAuth } from "../../redux/user-data/selectors";
import { logIn } from "../../redux/user-data/user-data";
import Input from "../input/input";

const validationSchema = yup.object().shape({
    email: yup.string().email('Необходимо ввести валидный email').required('Необходимо ввести email'),
    password: yup.string().min(8, 'Пароль должен содержать не менее 8 символов').required('Необходимо ввести пароль')
});

const formInitialValues = {
    email: '',
    password: '',
};

const AuthForm = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);

    const handleFormSubmit = () => {
        dispatch(logIn);
    };

    return(
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} resizeMode='cover' source={require('../../images/auth-background.png')}>
                <View style={styles.headerContainer}>
                    <Text style={header}>Добро пожаловать в</Text>
                    <Text style={headerBold}>Simple Hotel Check</Text>
                </View>

                <Formik initialValues={formInitialValues} onSubmit={handleFormSubmit} validationSchema={validationSchema}>
                    {({values, errors, touched, isValid, handleBlur, handleChange, handleSubmit}) => (
                        <View>
                            <Input
                                placeholder="Логин"
                                error={errors.email}
                                touched={touched.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                name="email"
                            />
                            
                            <Input
                                placeholder="Пароль"
                                error={errors.password}
                                touched={touched.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                name="password"
                            />
                            
                            <TouchableOpacity 
                                onPress={handleSubmit} 
                                activeOpacity={0.7} 
                                style={[styles.submit, isValid && touched.email && touched.password ? styles.submitEnabled : {}, isAuth ? { backgroundColor: 'red' } : {}]} disabled={!(isValid && touched.email && touched.password)}>
                                <Text style={styles.text}>{isAuth ? 'Уже зашел' : 'Войти'}</Text>
                            </TouchableOpacity>
                        </View>                        
                    )}
                </Formik>


            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: '50%',
        paddingTop: '15%',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
    submit: {
        backgroundColor: '#aaa',
        height: 50,
        borderRadius: 10,
        marginTop: 8,
        justifyContent: 'center',
        alignItems :'center',
    },
    headerContainer: {
        marginBottom: 32,
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
    submitEnabled: {
        backgroundColor: '#5ac8fa',
    },
});

const header = StyleSheet.compose(styles.text, {fontSize: 18});
const headerBold = StyleSheet.compose(header, {fontWeight: '700', fontSize: 24});

export default AuthForm;