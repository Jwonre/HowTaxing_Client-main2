import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigator/AppNavigator';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './redux/store';
import dayjs from 'dayjs';
import CodePush from 'react-native-code-push';
import 'dayjs/locale/ko';


dayjs.locale('ko');

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle={'dark-content'}
          translucent={true}
        />
        <AppNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: { 
    title: '새로운 업데이트', 
    optionalUpdateMessage: '업데이트가 존재합니다. 진행할까요?', 
    optionalInstallButtonLabel: '예', 
    optionalIgnoreButtonLabel: '아니요.' 
  },
  installMode: CodePush.InstallMode.IMMEDIATE 
}

export default CodePush(codePushOptions)(App);
