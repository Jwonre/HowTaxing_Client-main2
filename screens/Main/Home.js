// 홈 페이지

import {useWindowDimensions, StatusBar} from 'react-native';
import React, {useLayoutEffect, useEffect} from 'react';
import styled from 'styled-components';
import DropShadow from 'react-native-drop-shadow';
import {useNavigation} from '@react-navigation/native';
import HomeIcon from '../../assets/images/home_home.svg';
import SignTagIcon from '../../assets/images/home_signtag.svg';
import getFontSize from '../../utils/getFontSize';
import {SheetManager} from 'react-native-actions-sheet';
import ChanelTalkIcon from '../../assets/icons/chaneltalk.svg';
import {ChannelIO} from 'react-native-channel-plugin';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {setChatDataList} from '../../redux/chatDataListSlice';
import {setHouseInfo} from '../../redux/houseInfoSlice';
import {setOwnHouseList} from '../../redux/ownHouseListSlice';
import {setCert} from '../../redux/certSlice';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const HelloSection = styled.View`
  flex: 0.5;
  padding: 25px;
  justify-content: flex-end;
  align-items: flex-start;
`;

const HelloText = styled.Text`
  font-size: ${getFontSize(20)}px;
  font-family: Pretendard-Bold;
  color: #222;
  letter-spacing: -0.5px;
  line-height: 30px;
`;

const MessageTitle = styled.Text`
  font-size: ${getFontSize(24)}px;
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
  margin: 10px;
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
  font-size: ${getFontSize(10)}px;
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

const FloatContainer = styled.View`
  position: absolute;
  bottom: 25px;
  right: 25px;
`;

const FloatButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 55px;
  height: 55px;
  border-radius: 30px;
  background-color: #2f87ff;
  align-items: center;
  justify-content: center;
`;

const ShadowContainer = styled(DropShadow)`
  shadow-color: #ececef;
  shadow-offset: 0px 8px;
  shadow-opacity: 1;
  shadow-radius: 10px;
`;

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {width, height} = useWindowDimensions();

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
      console.log('ChannelIO.boot', result);
    });

    // 기본 채널톡 버튼 숨기기
    ChannelIO.hideChannelButton();

    return () => {
      ChannelIO.shutdown();
    };
  }, []);

  useEffect(() => {
    // 네트워크 연결 확인
    NetInfo.fetch().then(state => {
      if (!state?.isConnected) {
        SheetManager.show('info', {
          payload: {
            type: 'info',
            message:
              '서버와의 연결이 원활하지 않아요.\n잠시 후 다시 시도해주세요.',
          },
        });
      }
    });
  }, []);

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

  const stateInit = () => {
    dispatch(setChatDataList([]));
    dispatch(setHouseInfo(null));
    dispatch(setOwnHouseList([]));
    dispatch(
      setCert({
        agreeCert: false,
        agreePrivacy: false,
        agreeThird: false,
      }),
      
    );
  };

  const goAcquisigion = () => {
    stateInit();
    navigation.push('Acquisition');
  };

  const goGainsTax = () => {
    stateInit();
    navigation.push('GainsTax');
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
      <FloatContainer>
        <DropShadow
          style={{
            shadowColor: '#2F87FF',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.35,
            shadowRadius: 10,
          }}>
          <FloatButton
            onPress={() => {
              ChannelIO.showMessenger();
            }}>
            <ChanelTalkIcon />
          </FloatButton>
        </DropShadow>
      </FloatContainer>
    </Container>
  );
};

export default Home;
