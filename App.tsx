import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './app/redux/store';
import Main from './app/screens/main';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Main></Main>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
