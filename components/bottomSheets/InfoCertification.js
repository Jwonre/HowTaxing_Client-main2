// 정보 또는 경고 알림창 컴포넌트

import { useWindowDimensions, Pressable, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { Animated, Easing } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import styled from 'styled-components';
import getFontSize from '../../utils/getFontSize';
import CloseIcon from '../../assets/icons/close_button.svg';
import DropShadow from 'react-native-drop-shadow';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { setChatDataList } from '../../redux/chatDataListSlice';
import { setResend } from '../../redux/resendSlice';
import { acquisitionTax, gainTax } from '../../data/chatData';
import { setOwnHouseList } from '../../redux/ownHouseListSlice';
import axios from 'axios';
import Config from 'react-native-config'

const SheetContainer = styled.View`
  flex: 1;
  background-color: #fff;
  width: ${props => props.width - 40}px;
  height: auto;
`;

const ModalTitle = styled.Text`
  width: 80%;
  font-size: ${getFontSize(17)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 26px;
  text-align: center;
  margin-bottom: 20px;

`;

const ModalDescription = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Regular;
  color: #a3a5a8;
  line-height: 15px;
  text-align: left;
  padding: 20px;
  background-color: #F5F7FA;
  border-radius: 5px;
  border-color: #F5F7FA;
  border-width: 60px;

`;

const ModalContentSection = styled.View`
  width: 100%;
  height: auto;
  margin-top: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const ModalHeader = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const CertLogoImage = styled.Image.attrs(props => ({
  resizeMode: 'contain',
}))`
  width: 30px;
  height: 30px;
  align-self: center;
`;

const ButtonSection = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  margin-top: 10px;
`;

const Button = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background-color: #2f87ff;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #2f87ff;
`;

const ButtonText = styled.Text`
  font-size: ${getFontSize(16)}px;
  font-family: Pretendard-Bold;
  color: #fff;
  line-height: 20px;
`;




const InfoCertification = props => {
  const dispatch = useDispatch();
  const certType = props?.payload?.certType;
  const actionSheetRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const [ActiveYN, setActiveYN] = useState(false);
  const resendYN = useSelector(state => state.resend.value);
  const chatDataList = useSelector(state => state.chatDataList.value);
  const currentUser = useSelector(state => state.currentUser.value);
  const { name, phone, residentNumber, id, password, calcType } = props?.payload;
  const navigation = props?.payload?.navigation;
  const [hasNavigatedBack, setHasNavigatedBack] = useState(false);
  const hasNavigatedBackRef = useRef(hasNavigatedBack);

  const [isConnected, setIsConnected] = useState(true);

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


  useEffect(() => {
    if (resendYN) {
      // resendYN이 true일 때 수행할 동작을 여기에 작성합니다.
      // 예를 들어, 알림을 다시 보내는 함수를 호출할 수 있습니다.
      setActiveYN(resendYN);
    }
  }, [resendYN]); // 의존성 배열에 resendYN 추가

  const hypenHouseAPI = async (url, data, headers) => {
    try {
      const response = await axios.post(url, data, { headers });
      if (response.data.errYn === 'Y') {
        //////console.log('[hypenHouseAPI] An error occurred:', response.data);

        if (response.data.errCode === 'HOUSE-005') {
          await SheetManager.show('info', {
            payload: {
              type: 'error',
              message: response.data.errMsg ? response.data.errMsg : '공공기관에서 보유주택 정보를 가져오는 중 오류가 발생했어요.',
              description: response.data.errMsgDtl ? response.data.errMsgDtl : '',
              buttontext: '다시 확인하기',
            },
          });
          dispatch(setResend(false));
          setActiveYN(false);
          SheetManager.hide('infoCertification');
          setTimeout(async () => {
            const networkState = await NetInfo.fetch();
            // 네트워크가 연결되어 있을 때만 updateHouseDetailName() 함수를 실행합니다.
            if (networkState.isConnected) {
              SheetManager.show('cert', {
                payload: {
                  cert: cert,
                  index: props.payload?.index,
                  currentPageIndex,
                  name,
                  phone,
                  id,
                  password,
                  residentNumber,
                  failreturn: true,
                },
              });
            }
          }, 900);
          const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
          dispatch(setChatDataList(newChatDataList));

        } else {
          await SheetManager.show('info', {
            payload: {
              type: 'error',
              message: response.data.errMsg ? response.data.errMsg : '청약홈에서 정보를 불러오는 중 오류가 발생했어요.',
              description: response.data.errMsgDtl ? response.data.errMsgDtl : '',
              buttontext: '확인하기',
            },
          });
          dispatch(setResend(true));
          setActiveYN(true);
        }
        return false;
      } else {
        const list = response.data.data.list;
        dispatch(setOwnHouseList(list));
        return true;
      }
    } catch (error) {
      console.error('[hypenHouseAPI] An error occurred:', error);
      SheetManager.show('info', {
        payload: {
          message: '청약홈에서 정보를 불러오는 중\n오류가 발생했어요.\n인증을 다시 진행해주세요.',
          description: error?.message,
          type: 'error',
          buttontext: '인증하기',
        }
      });
      dispatch(setResend(true));
      setActiveYN(true);
      // 에러를 호출하는 함수로 전파하지 않고, 적절히 처리합니다.
      return false;
    }
  };

  const postOwnHouse = async () => {
    const url = `${Config.APP_API_URL}house/search`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.accessToken}`
    };
    //////console.log('@@@@@@@@@headers:', headers);

    const data = {
      certOrg: certType === 'KB' ? 'kb' : certType === 'naver' ? 'naver' : 'toss',
      userNm: name,
      mobileNo: phone,
      rlno: residentNumber,
      userId: id,
      userPw: password,
      calcType: calcType,
    };
    //////console.log('certdata : ', data);
    try {
      // ////console.log('[CertSheet]headers:', headers);
      // ////console.log('[CertSheet]data:', data);
      const response = await hypenHouseAPI(url, data, headers);

      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      setTimeout(async () => {
        await SheetManager.show('info', {
          payload: {
            message: '청약홈에서 정보를 불러오는 중\n오류가 발생했어요.\n인증을 다시 진행해주세요.',
            description: error?.message,
            type: 'error',
            buttontext: '인증하기',
          }
        });
        ////console.log('에러', error);
        const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
        dispatch(setChatDataList(newChatDataList));

        dispatch(setResend(true));
        setActiveYN(true);
      }, 500);

      return false;
    }
  };



  const CircularProgress = ({ size, strokeWidth, progress }) => {
    const rotation = useRef(new Animated.Value(0)).current;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = ((100 - progress) / 100) * circumference;

    useEffect(() => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }, []);

    return (
      <Animated.View style={{ transform: [{ rotate: rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }) }] }}>
        <Svg width={size} height={size}>
          <Path
            stroke="#d3d3d3"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={0} // 이 부분을 수정했습니다.
            d={`M ${size / 2} ${size / 2}
              m -${radius}, 0
              a ${radius},${radius} 0 1,0 ${radius * 2},0
              a ${radius},${radius} 0 1,0 -${radius * 2},0`}
          />
          <Path
            stroke="#A2C62B"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset} // 이 부분을 그대로 유지했습니다.
            strokeLinecap="round"
            d={`M ${size / 2} ${size / 2}
              m -${radius}, 0
              a ${radius},${radius} 0 1,0 ${radius * 2},0
              a ${radius},${radius} 0 1,0 -${radius * 2},0`}
          />
        </Svg>
      </Animated.View>
    );
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      headerAlwaysVisible
      CustomHeaderComponent={
        <ModalHeader>
          <Pressable
            hitSlop={20}
            onPress={() => {
              const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
              dispatch(setChatDataList(newChatDataList));
              actionSheetRef.current?.hide();
              dispatch(setResend(false));

            }}>
            {(ActiveYN === true) && <CloseIcon width={16} height={16} />}
          </Pressable>
        </ModalHeader>
      }
      overlayColor="#111"
      defaultOverlayOpacity={0.7}
      gestureEnabled={false}
      closeOnPressBack={false}
      closeOnTouchBackdrop={false}
      statusBarTranslucent
      containerStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: ActiveYN === false ? 380 : 340,
        width: width - 40
      }}>
      <SheetContainer width={width}>
        <ModalContentSection>
          <View style={{ width: 30, height: 50 }}>
            {(() => {
              switch (certType) {
                case 'KB':
                  return <CertLogoImage
                    source={require('../../assets/images/certLogo/kb_logo.png')}
                  />;
                case 'naver':
                  return <CertLogoImage
                    source={require('../../assets/images/certLogo/naver_logo.png')}
                  />;
                case 'kakao':
                  return <CertLogoImage
                    source={require('../../assets/images/certLogo/kakao_logo.png')}
                  />;
                case 'pass':
                  return <CertLogoImage
                    source={require('../../assets/images/certLogo/pass_logo.png')}
                  />;
                case 'payco':
                  return <CertLogoImage
                    source={require('../../assets/images/certLogo/payco_logo.png')}
                  />;
                case 'samsung':
                  return <CertLogoImage
                    source={require('../../assets/images/certLogo/samsung_logo.png')}
                  />;
                case 'toss':
                  return <CertLogoImage
                    source={require('../../assets/images/certLogo/toss_logo.png')}
                  />; // 수정된 부분
                default:
                  return null;
              }
            })()}</View>
          <ModalTitle>{props?.payload?.message}</ModalTitle>
          {(ActiveYN === false) && <CircularProgress size={50} strokeWidth={5} progress={30} />}
        </ModalContentSection>

        <ButtonSection>
          <DropShadow
            style={{
              shadowColor: 'rgba(0,0,0,0.25)',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.15,
              shadowRadius: 2,
              alignSelf: 'center',
              width: width - 120,
            }}>
            <Button
              onPress={async () => {
                const state = await NetInfo.fetch();
                const canProceed = await handleNetInfoChange(state);
                if (canProceed) {
                  dispatch(setResend(false));
                  setActiveYN(false);
                  const certresult = await postOwnHouse();
                  //////console.log('certresult', certresult)
                  if (certresult) {
                    SheetManager.hide("infoCertification");
                    const { isGainsTax } = props.payload?.isGainsTax;
                    const chatItem = isGainsTax
                      ? gainTax.find(el => el.id === 'allHouse1')
                      : acquisitionTax.find(el => el.id === 'moment1');
                    //////console.log(chatItem);
                    dispatch(setChatDataList([...chatDataList, chatItem]));

                  }
                } else {
                  const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
                  dispatch(setChatDataList(newChatDataList));
                  actionSheetRef.current?.hide();
                }
              }}
              style={{
                backgroundColor: ActiveYN ? '#2f87ff' : '#E8EAED',
                borderColor: ActiveYN ? '#2f87ff' : '#E8EAED',
              }}
              active={ActiveYN}
              disabled={!(ActiveYN)}>
              <ButtonText active={ActiveYN} style={{ color: ActiveYN ? '#fff' : '#717274' }}>알림 다시 보내기</ButtonText>
            </Button>
          </DropShadow>

        </ButtonSection>
      </SheetContainer>
    </ActionSheet >
  );
};

export default InfoCertification;
