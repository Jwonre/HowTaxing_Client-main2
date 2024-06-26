// 홈 페이지

import { useWindowDimensions, StatusBar, StyleSheet, BackHandler } from 'react-native';
import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import HomeIcon from '../../assets/images/home_home.svg';
import SignTagIcon from '../../assets/images/home_signtag.svg';
import ConSultingIcon from '../../assets/images/home_consulting.svg';
import getFontSize from '../../utils/getFontSize';
import { SheetManager } from 'react-native-actions-sheet';
import ChanelTalkIcon from '../../assets/icons/chaneltalk.svg';
import AppInformationIcon from '../../assets/icons/appinformaion_circle.svg'
import LogOutIcon from '../../assets/icons/logout_circle.svg';
import { ChannelIO } from 'react-native-channel-plugin';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { setChatDataList } from '../../redux/chatDataListSlice';
import { setHouseInfo } from '../../redux/houseInfoSlice';
import { setOwnHouseList } from '../../redux/ownHouseListSlice';
import { setCert } from '../../redux/certSlice';
import { setCurrentUser } from '../../redux/currentUserSlice';

import { setResend } from '../../redux/resendSlice';
import axios from 'axios';


const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const HelloSection = styled.View`
  flex: 0.5;
  padding: 25px;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 40px;
`;

const HelloText = styled.Text`
  font-size: ${getFontSize(19)}px;
  font-family: Pretendard-Bold;
  color: #222;
  letter-spacing: -0.5px;
  line-height: 30px;
`;

const MessageTitle = styled.Text`
  font-size: ${getFontSize(22)}px;
  font-family: Pretendard-Bold;
  color: #222;
  letter-spacing: -0.5px;
  line-height: 34px;
`;

const Card = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.9,
}))`
  width: ${props => props.width - 40}px;
  height: auto;
  background-color: #fff;
  border-radius: 12px;
  margin: 8px;
  padding: 25px;
  justify-content: center;
  align-self: center;
`;

const Tag = styled.View`
  width: 57px;
  height: 22px;
  padding: 0 10px;
  background-color: #2f87ff;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
`;

const TagText = styled.Text`
  font-size: ${getFontSize(9)}px;
  font-family: Pretendard-Medium;
  color: #fff;
  line-height: 12px;
  letter-spacing: -0.5px;
`;

const CardTitle = styled.Text`
  font-size: ${getFontSize(15)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 20px;
  margin-bottom: 8px;
  margin-top: 10px;
`;

const HashTagGroup = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
`;

const HashTagText = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Regular;
  color: #a3a5a8;
  line-height: 16px;
  margin-right: 9px;
  margin-top: 5px;
`;

const IconView = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 25px;
  right: 25px;
  border: 1px solid #e8eaed;
`;

const ChanelTalkIconFloatContainer = styled.View`
  position: absolute;
  bottom: 25px;
  right: 25px;

`;

const LogOutIconFloatContainer = styled.View`
  position: absolute;
  bottom: 25px;
  right: 110px;

`;

const AppInformationIconFloatContainer = styled.View`
  position: absolute;
  bottom: 25px;
  right: 195px;

`;

const ChanelTalkIconFloatButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 55px;
  height: 55px;
  border-radius: 30px;
  background-color: #2f87ff;
  align-items: center;
  justify-content: center;
`;
const LogOutIconFloatButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 55px;
  height: 55px;
  border-radius: 30px;
`;

const AppInformationIconFloatButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 55px;
  height: 55px;
  border-radius: 30px;
`;

const ShadowContainer = styled(DropShadow)`
  shadow-color: #ececef;
  shadow-offset: 0px 9px;
  shadow-opacity: 1;
  shadow-radius: 8px;
`;

const style = StyleSheet.create({
  LogOutIcon: {
    marginRight: 85,
  },
  AppInformationIcon: {
    marginRight: 55,
  },

});


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

const Home = () => {
  const currentUser = useSelector(state => state.currentUser.value);

  const [hasNavigatedBack, setHasNavigatedBack] = useState(false);
  const hasNavigatedBackRef = useRef(hasNavigatedBack);
  const handleBackPress = () => {
    console.log('LogOut!');
    goLogin();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }

  }, [handleBackPress]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { width, height } = useWindowDimensions();

  useLayoutEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
    StatusBar.setTranslucent(false);
  }, [navigation]);

  useEffect(() => {
    // 채널톡 초기화
    const settings = {
      pluginKey: 'fbfbfeaa-8f4c-41ef-af7a-7521ae67e9f6',
    };

    ChannelIO.boot(settings).then(result => {
      // console.log('ChannelIO.boot', result);
    });

    // 기본 채널톡 버튼 숨기기
    ChannelIO.hideChannelButton();

    return () => {
      ChannelIO.shutdown();
    };
  }, []);

  const handleWithDraw = (accessToken) => {
    // 요청 헤더
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // 요청 바디

    axios
      .post('http://devapp.how-taxing.com/user/withdraw', { headers: headers })
      .then(response => {
        if (response.data.errYn === 'Y') {
          SheetManager.show('info', {
            payload: {
              type: 'error',
              message: response.data.errMsg ? response.data.errMsg : '회원탈퇴에 문제가 발생했어요.',
              description: response.data.errMsgDtl ? response.data.errMsgDtl : null,
              buttontext: '확인하기',
            },
          });
          return;
        } else {
          SheetManager.show('info', {
            payload: {
              type: 'info',
              message: '회원탈퇴에 성공했습니다.',
              buttontext: '확인하기',
            },
          });
          // 성공적인 응답 처리
          // const { id } = response.data;
          //    console.log("1111111", response);
        }
      })
      .catch(error => {
        // 오류 처리
        SheetManager.show('info', {
          payload: {
            message: '회원탈퇴에 실패했습니다.',
            description: error?.message,
            type: 'error',
            buttontext: '확인하기',
          }
        });
        console.error(error);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setChatDataList([]));
      dispatch(setHouseInfo(null));
      dispatch(setOwnHouseList([]));
      dispatch(setResend(false));
      dispatch(
        setCert({
          agreeCert: false,
          agreePrivacy: false,
          agreeThird: false,
          agreeAge: false,
          agreeLocation: false,
          agreeMarketing: false,
          agreeCopyright: false,
          agreeGov24: false
        }),
      );
      // 화면이 포커스를 얻을 때 실행됩니다.
      return () => { };
    }, [])
  );
  const handleNetInfoChange = (state) => {
    return new Promise((resolve, reject) => {
      if (!state.isConnected) {
         
        navigation.push('NetworkAlert', navigation);
        resolve(false);
      } else if (state.isConnected) {
          
        if (!hasNavigatedBackRef.current) {
          setHasNavigatedBack(true);
        }
        resolve(true);
      } else {
        resolve(true);
      }
    });
  };

  const AC_HASHTAG_LIST = [
    '취득세 계산',
    '주택 매수',
    '조정 지역',
    '입주권',
    '분양권',
  ];

  const GAIN_HASHTAG_LIST = [
    '양도소득세 계산',
    '일시적 2주택',
    '다주택자',
    '조정지역',
    '장기보유특별공제',
  ];


  const CONSULTING_HASHTAG_LIST = [
    '상속세',
    '증여세',
    '재산세',
    '다주택자',
    '양도소득세 컨설팅',
    '기타 주택세금',
  ];

  const goAcquisigion = async () => {
    const state = await NetInfo.fetch();
    const canProceed = await handleNetInfoChange(state);
    if (canProceed) {
      navigation.push('Acquisition');
    }
  };

  const goGainsTax = async () => {
    const state = await NetInfo.fetch();
    const canProceed = await handleNetInfoChange(state);
    if (canProceed) {
      navigation.push('GainsTax');
    }
  };

  const goConSulting = async () => {
    const state = await NetInfo.fetch();
    const canProceed = await handleNetInfoChange(state);
    if (canProceed) {
      SheetManager.show('Consulting', {payload: {navigation}});
    }
  };

  const goLogin = () => {
    SheetManager.show('logout', {
      payload: {
        type: 'error',
        message: '로그아웃을 하시겠어요?',
        onPress: { handlePress },
      },
    });

    return;
  };

  const goAppInformation = () => {
    SheetManager.show('InfoAppinformation');
    return;
  };

  const handlePress = buttonIndex => {
    if (buttonIndex === 'YES') {
      dispatch(setCurrentUser(null));
    }
  };


  return (
    <Container>
      <HelloSection>
        <HelloText>안녕하세요.</HelloText>
        <MessageTitle>어떤 세금을 계산하시겠어요?</MessageTitle>
      </HelloSection>
      <ShadowContainer>
        <Card width={width} onPress={goAcquisigion}>
          <Tag>
            <TagText>주택 매수</TagText>
          </Tag>
          <CardTitle>취득세 계산하기</CardTitle>
          <HashTagGroup
            style={{
              width: '70%',
            }}>
            {AC_HASHTAG_LIST.map((item, index) => (
              <HashTagText key={index}>#{item}</HashTagText>
            ))}
          </HashTagGroup>
          <IconView>
            <HomeIcon />
          </IconView>
        </Card>
      </ShadowContainer>
      <ShadowContainer>
        <Card width={width} onPress={goGainsTax}>
          <Tag>
            <TagText>주택 매도</TagText>
          </Tag>
          <CardTitle>양도소득세 계산하기</CardTitle>
          <HashTagGroup>
            {GAIN_HASHTAG_LIST.map((item, index) => (
              <HashTagText key={index}>#{item}</HashTagText>
            ))}
          </HashTagGroup>
          <IconView>
            <SignTagIcon />
          </IconView>
        </Card>
      </ShadowContainer>

      <ShadowContainer>
        <Card width={width} onPress={goConSulting}>
          <Tag>
            <TagText>세금 상담</TagText>
          </Tag>
          <CardTitle>세금 상담받기</CardTitle>
          <HashTagGroup
            style={{
              width: '80%',
            }}>
            {CONSULTING_HASHTAG_LIST.map((item, index) => (
              <HashTagText key={index}>#{item}</HashTagText>
            ))}
          </HashTagGroup>
          <IconView>
            <ConSultingIcon />
          </IconView>
        </Card>
      </ShadowContainer>


      <ChanelTalkIconFloatContainer>
        <DropShadow
          style={{
            shadowColor: '#2F87FF',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.8,
            shadowRadius: 10,
          }}>
          <ChanelTalkIconFloatButton
            onPress={() => {
              console.log('currentUser',currentUser.accessToken);
              //handleWithDraw(currentUser.accessToken);
              //dispatch(setCurrentUser(null));
            }}>
            <ChanelTalkIcon />
          </ChanelTalkIconFloatButton>
        </DropShadow>
      </ChanelTalkIconFloatContainer>
      <LogOutIconFloatContainer>
        <DropShadow
          style={{
            shadowColor: '#A3A3A3',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.80,
            shadowRadius: 10,
          }}>

          <LogOutIconFloatButton
            onPress={() => {
              console.log('LogOut!');
              goLogin();
            }}>
            <LogOutIcon style={style.LogOutIcon} />
          </LogOutIconFloatButton>
        </DropShadow>
      </LogOutIconFloatContainer>

      <AppInformationIconFloatContainer>
        <DropShadow
          style={{
            shadowColor: '#A3A3A3',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.80,
            shadowRadius: 10,
          }}>

          <AppInformationIconFloatButton
            onPress={() => {
              console.log('AppInformation');
              goAppInformation();
            }}>
            <AppInformationIcon style={style.AppInformationIcon} />
          </AppInformationIconFloatButton>
        </DropShadow>
      </AppInformationIconFloatContainer>
    </Container>
  );
};

export default Home;
