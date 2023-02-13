import { Text, View } from 'react-native';

const FetchFailedMessage = (): JSX.Element => (
  <View style={{ alignItems: 'center', marginTop: 40 }}>
    <Text style={{ fontSize: 16 }}>Запрос не удался, попробуйте позже</Text>
  </View>
);

export default FetchFailedMessage;
