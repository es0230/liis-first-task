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
  screenHeader: {
    fontWeight: '700', fontSize: 24
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
  }
});
