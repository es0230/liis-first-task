import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#e5e5e5',
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  screenHeaderText: {
    fontWeight: '700',
    fontSize: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  submit: {
    backgroundColor: '#aaa',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitEnabled: {
    backgroundColor: '#5ac8fa',
  },
  searchBlockHeader: {
    fontWeight: '700',
    fontSize: 18,
  },
  searchBlockWrapper: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    gap: 16,
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
  },
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
  inputError: {
    color: 'red',
    position: 'absolute',
    top: 48,
  },
});
