import { StatusBar, useWindowDimensions, View, Linking } from 'react-native';
import React, { useRef, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { useRoute, useNavigation } from '@react-navigation/native';
import getFontSize from '../../utils/getFontSize';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../redux/currentUserSlice';
import axios from 'axios';
import { SheetManager } from 'react-native-actions-sheet';
import NetInfo from '@react-native-community/netinfo';
import KakaoSDK from '@actbase/react-kakaosdk';

const Container = styled.ImageBackground.attrs(props => ({
  source: require('../../assets/images/loginBG.png'),
  resizeMode: 'cover',
}))`
  flex: 1;
  background-color: #fff;
`;

const IntroSection = styled.View`
  flex: 1;
  width: 100%;
  padding: 25px;
  justify-content: center;
`;

const SansText = styled.Text`
  font-size: ${getFontSize(23)}px;
  color: #fff;
  text-align: center;
  font-family: GmarketSansTTFMedium;
  font-style: normal;
  line-height: 25px; 
  margin-top: 20px;
`;

const SocialButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.9,
}))`
  width: ${props => props.width - 40}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: 30px;
  padding: 10px;
  margin: 5px;
  margin-top: 8px;
  line-heght: 20px;
`;

const SocialButtonText = styled.Text`
  width: auto;
  font-size: ${getFontSize(15)}px;
  font-family: Pretendard-Regular;
  line-height: 20px;
  letter-spacing: -0.3px;
`
const SocialButtonIcon = styled.Image.attrs(props => ({
  resizeMode: 'contain',
}))`
  width: 20px;
  height: 50px;
  margin-right: 10px;
`;

const ButtonSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 50px;
`;

const LogoGroup = styled.View`
  width: 260px;
  height: 50px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.Image.attrs(props => ({
  resizeMode: 'contain',
}))`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(27, 28, 31, 0.73);
`;

const Login = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  //const [isConnected, setIsConnected] = useState(true);
  const agreeMarketing = route.params;
  const accessToken = null;
  const [isConnected, setIsConnected] = useState(true);
  const [hasNavigatedBack, setHasNavigatedBack] = useState(false);
  const hasNavigatedBackRef = useRef(hasNavigatedBack);

   const handleNetInfoChange = (state) => {
    return new Promise((resolve, reject) => {
      if (!state.isConnected && isConnected) {
        setIsConnected(false);
        navigation.push('NetworkAlert', navigation);
        resolve(false);
      } else if (state.isConnected && !isConnected) {
        setIsConnected(true);
        if (!hasNavigatedBackRef.current) {
          setHasNavigatedBack(true);
        }
        resolve(true);
      } else {
        resolve(true);
      }
    });
  };


  const handleWebViewMessage = async (event) => {
    const tokens = temp(event);
    // console.log('Login:', event.nativeEvent.data);
    if (event.nativeEvent.data.role === 'GUEST') {
      //약관확인 화면으로 이동 후 약관 동의 완료시 handleSignUp 진행
      await navigation.push('CheckTerms');
      handleSignUp(event.nativeEvent.data.accessToken);
    } else {
      //   console.log('Login token:', tokens[0]);
      const tokenObject = { 'accessToken': tokens[0], 'refreshToken': tokens[1] };
      //   console.log('Login tokenObject:', tokenObject);
      dispatch(setCurrentUser(tokenObject));
    }
  };

  const temp = (event) => {
    const accessToken = event.nativeEvent.data.accessToken;
    const refreshToken = event.nativeEvent.data.refreshToken;
    return [accessToken, refreshToken];
  }

  const handleSignUp = (accessToken) => {
    // 요청 헤더
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // 요청 바디
    const data = {
      mktAgr: agreeMarketing,

    };

    axios
      .post('http://13.125.194.154:8080/user/signUp', data, { headers: headers })
      .then(response => {
        if (response.data.errYn === 'Y') {
          SheetManager.show('info', {
            payload: {
              type: 'error',
              message: response.data.errMsg,
              description: response.data.errMsgDtl,
              buttontext: '확인하기',
            },
          });
          return;
        } else {
         /* SheetManager.show('info', {
            payload: {
              type: 'info',
              message: '회원가입에 성공했습니다.',
            },
          });*/
          // 성공적인 응답 처리
          // const { id } = response.data;
          //    console.log("1111111", response);
        }
      })
      .catch(error => {
        // 오류 처리
        SheetManager.show('info', {
          payload: {
            message: '회원가입에 실패했습니다.',
            description: error?.message,
            type: 'error',
            buttontext: '확인하기',
          }
        });
        console.error(error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);



  // 카카오 로그인
  const onKakaoLogin = async () => {
    /*const { accessToken } = await login();
   
    if (accessToken) {
      socialLogin(0, accessToken);
    }
  */
    const state = await NetInfo.fetch();
    const canProceed = await handleNetInfoChange(state);
    if (canProceed) {
    navigation.navigate('LoginWebview', { onWebViewMessage: handleWebViewMessage, 'socialType': 'kakao', });
    }

  };

  // 네이버 로그인
  const onNaverLogin = async () => {
    /*
    await NaverLogin.login({
      appName: '하우택싱',
      consumerKey: 'orG8AAE8iHfRSoiySAbv',
      consumerSecret: 'DEn_pJGqup',
      serviceUrlScheme: 'howtaxing',
    }).then(async res => {
      const { accessToken } = res?.successResponse;
   
      console.log('accessToken', accessToken);
   
      if (accessToken) {
        socialLogin(1, accessToken);
      }
    });
    */
    const state = await NetInfo.fetch();
    const canProceed = await handleNetInfoChange(state);
    if (canProceed) {
    navigation.navigate('LoginWebview', { onWebViewMessage: handleWebViewMessage, 'socialType': 'naver', });
    }
  };
  /*
    // 구글 로그인
    const onGoogleLogin = async () => {
      /*
      await GoogleSignin.hasPlayServices();
     
      const GOOGLE_CLIENT_ID =
        '797361358853-j9mpkpnq9bgrnmahi46dgkb5loufk5bg.apps.googleusercontent.com';
      GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_ID,
        offlineAccess: true,
      });
      try {
        await GoogleSignin.signIn();
        const user = await GoogleSignin.getTokens();
     
        const accessToken = user.accessToken;
        console.log('accessToken', accessToken);
     
        socialLogin(2, accessToken);
      } catch (error) {
        console.log('error', error);
      }
  
      NetInfo.addEventListener(state => {
        if (!state.isConnected) {
        }
      });
      navigation.navigate('LoginWebview', { onWebViewMessage: handleWebViewMessage, 'socialType': 'google', });
    };
  
    // 애플 로그인
    const onAppleLogin = async () => {
      // if (appleAuthAndroid.isSupported) {
      //   const appleAuthRequestResponse = await appleAuth.performRequest({
      //     requestedOperation: appleAuth.Operation.LOGIN,
      //     // Note: it appears putting FULL_NAME first is important, see issue #293
      //     requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      //   });
      //   // Ensure Apple returned a user identityToken
      //   if (!appleAuthRequestResponse.identityToken) {
      //     throw 'Apple Sign-In failed - no identify token returned';
      //   }
      //   // get current authentication state for user
      //   // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      //   const credentialState = await appleAuth.getCredentialStateForUser(
      //     appleAuthRequestResponse.user,
      //   );
      //   // Create a Firebase credential from the response
      //   const {identityToken, nonce} = appleAuthRequestResponse;
  
      //   // use credentialState response to ensure the user is authenticated
      //   if (credentialState === appleAuth.State.AUTHORIZED) {
      //     // user is authenticated
      //     console.log('user is authenticated', credentialState);
      //   }
      // } else {
      //   console.log('ios only');
      // }
      //    dispatch(
      //      setCurrentUser({
      //        name: '김하우',
      //        email: '',
      //      }),
      //    );
      /*
       <SocialButton
                onPress={onGoogleLogin}
                width={width}
                style={{
                  backgroundColor: '#fff',
                }}>
                <SocialButtonIcon
                  source={require('../../assets/images/socialIcon/google_ico_color.png')}
                />
                <SocialButtonText
                  style={{
                    color: '#3B1F1E',
                  }}>
                  구글로 로그인
                </SocialButtonText>
              </SocialButton>
              <SocialButton
                onPress={onAppleLogin}
                width={width}
                style={{
                  backgroundColor: '#161617',
                }}>
                <SocialButtonIcon
                  style={{
                    width: 16,
                    height: 20,
                  }}
                  source={require('../../assets/images/socialIcon/apple_ico.png')}
                />
                <SocialButtonText
                  style={{
                    color: '#fff',
                  }}>
                  애플로 로그인
                </SocialButtonText>
              </SocialButton>
      
      dispatch(setCurrentUser(null));
      navigation.push('CheckTerms');
    };
    */
  // 소셜 로그인
  const socialLogin = async (userType, accessToken) => {
    const data = {
      userType,
      accessToken,
    };

    axios
      .post('http://13.125.194.154:8080/user/socialLogin', data)
      .then(response => {
        if (response.data.errYn === 'Y') {
          SheetManager.show('info', {
            payload: {
              type: 'error',
              message: response.data.errMsg,
              description: response.data.errMsgDtl,
              buttontext: '확인하기',
            },
          });
          return;
        } else {
          const { id } = response.data;
          getUserData(id);
        }
        // 성공적인 응답 처리

      })
      .catch(error => {
        // 오류 처리
        SheetManager.show('info', {
          payload: {
            message: '로그인에 실패했습니다.',
            description: error?.message,
            type: 'error',
            buttontext: '확인하기',
          }
        });
        console.error(error);
      });
  };

  // 유저 정보 가져오기
  const getUserData = async id => {
    await axios
      .get(`http://13.125.194.154:8080/user/${id}`)
      .then(response => {
        // 성공적인 응답 처리
        // console.log(response.data);
        const userData = response.data;
        dispatch(setCurrentUser(userData));
      })
      .catch(error => {
        // 오류 처리
        console.error(error);
      });
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Overlay />
      <ButtonSection>
        <IntroSection>
          <LogoGroup>
            <LogoImage source={require('../../assets/images/logo.png')} />
          </LogoGroup>
          <View styled={{height: 'auto', minHeight: 40}}>
            <SansText>어렵지 않은 주택세금</SansText>
          </View>
        </IntroSection>
        <SocialButton
          onPress={onKakaoLogin}
          width={width}
          height={60}
          style={{
            backgroundColor: '#FBE54D',
          }}>
          <SocialButtonText
            style={{
              color: '#3B1F1E',
              height: 20,
            }}>
            <SocialButtonIcon
              source={require('../../assets/images/socialIcon/kakao_ico.png')}
            />
            {'  '}
            카카오톡으로 시작하기
          </SocialButtonText>
        </SocialButton>
        <SocialButton
          onPress={onNaverLogin}
          width={width}
          style={{
            backgroundColor: '#3BAC37',
          }}>
          <SocialButtonIcon
            source={require('../../assets/images/socialIcon/naver_ico.png')}
          />
          <SocialButtonText
            style={{
              color: '#fff',
            }}>
            네이버로 시작하기
          </SocialButtonText>
        </SocialButton>
      </ButtonSection>
    </Container>
  );
};

export default Login;
