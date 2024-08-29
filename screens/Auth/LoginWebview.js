import React, { useRef, useEffect, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import Config from 'react-native-config'

const LoginWebview = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const webViewRef = useRef(null);
    const socialType = props.route.params.socialType;
    const { width, height } = Dimensions.get('window');
    const [webViewStyle, setWebViewStyle] = useState({ width: width, height: height });
    const onWebViewMessage = route.params?.onWebViewMessage;
    const uri = { uri: `${Config.APP_API_URL}oauth2/authorization/${socialType}` };
   // const uri = { uri: `http://devapp.how-taxing.com/oauth2/authorization/${socialType}` };
   
    //onsole.log('uri', uri);
    const sendWebMessage = () => {
        webViewRef.current.injectJavaScript(`
        const url = document?.URL === null ? null : document?.URL;
        if ((url.indexOf('http://') === -1) || (url === null)) {
            window.ReactNativeWebView.postMessage('url');
        } else {
            const preElement = document.getElementsByTagName("pre")[0];
            const data = preElement.innerText; // 결과 
            if (data !== null) {
                window.ReactNativeWebView.postMessage(data);
            }
        }
        `);
    };
    const handleWebViewMessage = event => {
        //console.log('event.nativeEvent',event.nativeEvent);
        const message = event.nativeEvent.data;
        if (message === 'url') {
            setWebViewStyle({
                flex: 1,
                width: width,
                height: height,
                //display: 'none' 
            });

        } else {
            setWebViewStyle({
                flex: 1,
                width: width,
                height: width,
                // display: 'none' 
            });
            //console.log('message', message)
            //console.log('JSON.parse(message)', JSON.parse(message))
            //console.log('JSON.parse(message).status', JSON.parse(message).status)
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.errYn === 'Y') {
                /*   if (parsedMessage.status !== undefined || null) {
                        SheetManager.show('info', {
                            payload: {
                                type: 'error',
                                message: response.data.errMsg ? response.data.errMsg : '로그인 중 parsedError가 발생했어요.',
                                description: response.data.errMsgDtl ? response.data.errMsgDtl : null,
                                buttontext: '확인하기',
                            },
                        });
                    } else {*/
                SheetManager.show('info', {
                    payload: {
                        type: 'error',
                        message: '로그인에 실패했습니다.',
                        buttontext: '확인하기',
                    },
                });


                /*   Alert.alert(
                       'error',
                       '로그인 중 error 발생',
                       [
                           {
                               text: '확인',
                               style: 'destructive',
                           },
                       ],
                       {
                           onDismiss: () => { },
                       },
                   );*/
            }
            else if (parsedMessage.errYn === 'N') {
                //로그인화면으로 데이터 보냄
                const data = parsedMessage.data;
                //console.log('data', data);
                onWebViewMessage({ nativeEvent: { data: data } });
            }
            //  navigation.goBack();
        }


    };



    return (
        <WebView
            style={webViewStyle} // 초기 크기 설정
            ref={webViewRef}
            source={uri}
            onLoad={sendWebMessage}
            onMessage={handleWebViewMessage}
            option={{ tarBarVisible: false }}
            mixedContentMode="always"
        />
    );
};

export default LoginWebview;