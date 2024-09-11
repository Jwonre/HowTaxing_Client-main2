// 양도소득세 홈페이지

import { TouchableOpacity, useWindowDimensions, BackHandler, View, ScrollView, Animated, Text, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { useRef, useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BackIcon from '../../assets/icons/back_button.svg';
import CloseIcon from '../../assets/icons/close_button.svg';
import styled from 'styled-components';
import { SheetManager } from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';
import DropShadow from 'react-native-drop-shadow';
import NetInfo from "@react-native-community/netinfo";
import Calendar from '../../components/ReservationCalendar';
import Config from 'react-native-config'
import axios from 'axios';

const Container = styled.View`
  flex: 1.0;
  background-color: #fff;
`;

const IntroSection = styled.View`
  width: 100%;
  height: 52%;
`;

const IntroSection2 = styled.View`
  width: 100%;
  padding: 20px;
`;

const IntroSection3 = styled.View`
  width: 100%;
  padding: 10px;
`;

const ProfileAvatar = styled(FastImage).attrs(props => ({
  resizeMode: 'stretch',
}))`
  width: 110%;
  height: 100%;
  background-color: #F0F3F8;
  align-self: center;
`;

const ProgressSection = styled.View`
  flex-direction: row;
  width: 100%;
  height: 5px;
  background-color: #e8eaed;
`;


const ModalInputSection = styled.View`
  width: 100%;
  background-color: #fff;
`;

const ModalInputContainer = styled.View`
  width: 100%;
  padding: 0 20px;
`;

const ModalInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: '#C1C3C5',
  autoCapitalize: 'none',
  autoCorrect: false,
}))`
  width: 100%;
  height: 45px;
  border-radius: 10px;
  background-color: #f0f3f8;
  padding: 0 15px;
  margin-top: 6px;
  font-size: 15px;
  font-family: Pretendard-Regular;
  color: #1b1c1f;
  line-height: 20px;
  text-align: left;
`;

const ModalLabel = styled.Text`
  font-size: 15px;
  font-family: Pretendard-SemiBold;
  color: #000;
  line-height: 18px;
  margin-right: 5px;
`;


const ProfileSection = styled.View`
  width: 100%;
  padding: 20px;
  justify-content: flex-end;
`;

const Title = styled.Text`
  font-size: 20px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 30px;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

const SubTitle = styled.Text`
  font-size: 12px;
  font-family: Pretendard-Regular;
  color: #a3a5a8;
  line-height: 15px;
  margin-top: 10px;
`;

const SubTitle2 = styled.Text`
  font-size: 12px;
  font-family: Pretendard-Regular;
  color: #a3a5a8;
  line-height: 14px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
`;


const SubTitle3 = styled.Text`
  font-size: 12px;
  font-family: Pretendard-Regular;
  color: #FF7401;
  line-height: 15px;
  margin-top: 10px;
`;

const SubTitle4 = styled.Text`
  font-size: 16px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TimeTitle = styled.Text`
  font-size: 16px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 30px;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;


const ReservationtimeSection = styled.View`
  width: 100%;
  padding: 20px;
  justify-content: flex-end;
`;

const TimeContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

`;

const TimeBox = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 73px;
  height: 35px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${props => (props?.active ? '#2F87FF' : '#E8EAED')};
  margin-bottom: 15px;
  margin-right: 3px;
`;

const TimeText = styled.Text`
  font-size: 12px;
  font-family: Pretendard-Regular;
`;

const ProfileAvatar2 = styled(FastImage).attrs(props => ({
  resizeMode: 'cover',
}))`
  width: 40px;
  height: 40px;
  border-radius: 55px;
  background-color: '#F0F3F8';
  align-self: left;
  margin-right: 12px;
`;

const ProfileName = styled.Text`
  font-size: 20px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 40px;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  margin-right: 12px;
`;

const ConsultingTime = styled.Text`
  font-size: 10px;
  font-family: Pretendard-Bold;
  color: #2F87FF;
  line-height: 40px;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

const Tag = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  flex-direction: row;
  margin-right: auto;
  width: 67px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  border-width: 1px;
  border-color: #CFD1D5;
  padding: 0 10px;
  margin-bottom: 20px;
  align-self: flex-start;
`;

const TagText = styled.Text`
  font-size: 10px;
  font-family: Pretendard-Medium;
  color: #CFD1D5;
  line-height: 20px;
`;

const ConsultingItem = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  align-items: left;
  justify-content: space-between;

`;  // 세미콜론 추가

const ConsultingInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: '#C1C3C5',
  autoCapitalize: 'none',
  autoCorrect: false,
  verticalAlign: 'top',
}))`
  width: auto; 
  height: 260px;
  background-color: #f5f7fa;
  padding: 15px; 
  font-size: 13px;
  font-family: Pretendard-Regular;
  color: #1b1c1f;
  line-height: 20px;
  text-align: left;
  align-self: center;
  text-align-vertical: top;
  overflow: hidden; 
`;


const TextLength = styled.Text`
  font-size: 9px;
  font-family: Pretendard-Bold;
  color: #717274;
  text-align: right;
  margin-right: 10px;
`;


const ButtonSection = styled.View`
  flex: 1;
  padding: 0 20px;
  align-items: center;
  justify-content: flex-end;  
  margin-top: 10px;
  bottom: 10px;
  width: 100%;
`;


const ButtonSection2 = styled.View`
  flex: 1;
  padding: 0 20px;
  align-items: center;
  justify-content: flex-end;  
  width: 100%;
`;


const ShadowContainer = styled(DropShadow)`
  shadow-color: rgba(0, 0, 0, 0.25);
  shadow-offset: 2px 3px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
`;

const Button = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6,
}))`
  width: ${props => props.width - 40}px;
  height: 50px;
  border-radius: 30px;
  background-color: #2f87ff;
  align-items: center;
  justify-content: center;
  align-self: center;
  position: absolute;
  bottom: 0px;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-family: Pretendard-Bold;
  color: #fff;
  line-height: 20px;
`;


const ConsultingReservation = () => {
  const _scrollViewRef = useRef(null);
  const _scrollViewRef2 = useRef(null);
  // const data = [{ key: 'dummy' }]; // FlatList에 필요한 데이터
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPageIndexList = [0, 1, 2, 3, 4];
  const currentUser = useSelector(state => state.currentUser.value);


  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hasNavigatedBack, setHasNavigatedBack] = useState(false);
  const hasNavigatedBackRef = useRef(hasNavigatedBack);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedList, setSelectedList] = useState([]);
  const ConsultingList = ['취득세', '양도소득세', '상속세', '증여세'];
  const morningTimes = [];
  const afternoonTimes = [];
  const [text, setText] = useState('');
  const [dataList, setDataList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [taxTypeList, setTaxTypeList] = useState([]);

  for (let i = 9; i <= 11; i++) {
    morningTimes.push(`${i}:00`);
    morningTimes.push(`${i}:30`);
  }
  for (let i = 12; i <= 18; i++) {
    afternoonTimes.push(`${i}:00`);
    if (i < 18) afternoonTimes.push(`${i}:30`);
  }
  const handleBackPress = () => {
    if (currentPageIndex === 0) {
      navigation.goBack();
    } else {
      setCurrentPageIndex(currentPageIndex - 1);
    }

    return true;
  }
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [handleBackPress])
  );

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    _scrollViewRef.current?.scrollTo({
      x: (width) * currentPageIndex,
      y: 0,
      animated: true,
    });
  }, [currentPageIndex]);

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
    getDateTimelist('1', '');
    // console.log('dataList', dataList);
  }, []);


  useEffect(() => {
    if (selectedDate && currentPageIndex === 3) {
      console.log('selectedDate', selectedDate);
      getDateTimelist('2', selectedDate);
    }
    //console.log('timeList', timeList);
  }, [selectedDate, currentPageIndex]);

  const getDateTimelist = async (searchType, selectedDate) => {
    var consultantId = 1;
    const url = searchType === '1' ? `${Config.APP_API_URL}consulting/availableSchedule?consultantId=${consultantId}&searchType=${searchType}` : `${Config.APP_API_URL}consulting/availableSchedule?consultantId=${consultantId}&searchType=${searchType}&searchDate=${selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()}-${(selectedDate ? selectedDate.getMonth() + 1 : new Date().getMonth() + 1).toString().padStart(2, '0')}-${(selectedDate ? selectedDate : new Date()).getDate().toString().padStart(2, '0')}`;
    //const url = `https://devapp.how-taxing.com/consulting/availableSchedule?consultantId=${consultantId}&searchType="${searchType}"`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.accessToken}`
    };
    /*
    const params = {
      consultantId: consultantId,
      searchType: searchType,
    }*/
    console.log('url', url);
    // console.log('params', params);
    console.log('headers', headers);
    await axios
      .get(url,
        { headers: headers }
      )
      .then(response => {
        console.log('response.data', response.data);
        if (response.data.errYn === 'Y') {
          SheetManager.show('info', {
            payload: {
              type: 'error',
              message: response.data.errMsg ? response.data.errMsg : '상담 가능 일정을 불러오는데 문제가 발생했어요.',
              description: response.data.errMsgDtl ? response.data.errMsgDtl : '',
              buttontext: '확인하기',
            },
          });
        } else {
          if (searchType === "1") {
            //console.log('response.data', response.data.data);
            //console.log('response.data.dateList', response.data.data.dateList);
            const result = response === undefined ? [] : response.data.data.dateList;
            if (result.length > 0) {
              const list = result
                .filter(item => item.isReservationAvailable)
                .map(item => item.consultingDate);

              console.log('list:', list);
              console.log('new Date(list[0]):', new Date(list[0]));
              setDataList([...list]);
            } else {
              SheetManager.show('info', {
                payload: {
                  type: 'info',
                  message: '앗, 현재 예약가능한 날짜가 없어요.\n나중에 다시 시도해주세요.',
                  buttontext: '확인하기',
                },
              });
              navigation.navigate('Home');
            }

          } else if (searchType === "2") {
            const result = response === undefined ? [] : response.data.data.timeList;
            const list = result
              .filter(item => item.reservationStatus === "1")
              .map(item => item.consultingTime);

            //console.log('list:', list);
            setTimeList([...list]);

          }
        }

      })
      .catch(function (error) {
        SheetManager.show('info', {
          payload: {
            message: '상담 가능 일정을 불러오는데 문제가 발생했어요.',
            description: error?.message ? error?.message : '오류가 발생했습니다.',
            type: 'error',
            buttontext: '확인하기',
          }
        });
        ////console.log(error ? error : 'error');
      });
  };

  const requestReservation = async () => {
    console.log('selectedDate', selectedDate);
    var NumTaxTypeList = taxTypeList.map(taxType => {
      switch (taxType) {
        case "취득세":
          return "01";
        case "양도소득세":
          return "02";
        case "상속세":
          return "03";
        case "증여세":
          return "04";
        default:
          return "";
      }
    });
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const accessToken = currentUser.accessToken;
    // 요청 헤더
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // 요청 바디
    const data = {
      consultantId: '1',
      customerName: name ? name : '',
      customerPhone: phone ? phone : '',
      reservationDate: selectedDate ? `${year}-${month}-${day}` : '',
      reservationTime: selectedList ? selectedList[0] : '',
      consultingType: NumTaxTypeList ? NumTaxTypeList.sort().join(",") : '',
      consultingInflowPath: '00',
      calcHistoryId: '',
      consultingRequestContent: text ? text : '',
    };
    console.log('data', data);
    console.log('headers', headers);
    try {
      const response = await axios.post(`${Config.APP_API_URL}consulting/reservationApply`, data, { headers: headers });
      if (response.data.errYn === 'Y') {
        SheetManager.show('info', {
          payload: {
            type: 'error',
            message: response.data.errMsg ? response.data.errMsg : '상담 예약 중 오류가 발생했어요.',
            description: response.data.errMsgDtl ? response.data.errMsgDtl : '',
            buttontext: '확인하기',
          },
        });
        if (response.data.errCode === 'CONSULTING-013') {
          setCurrentPageIndex(3);
          setTimeout(async () => {
            await getDateTimelist('1', '');
            if (dataList.length === 0) {
              SheetManager.show('info', {
                payload: {
                  type: 'info',
                  message: '앗, 현재 예약가능한 날짜가 없어요.\n나중에 다시 시도해주세요.',
                  buttontext: '확인하기',
                },
              });
              navigation.navigate('Home');
            } else {
              await getDateTimelist('2', selectedDate);
              setSelectedList([]);
            }
          }, 300);
        }
        return false;
      } else {
        if (response.data.data && response.data.data.isApplyComplete === true) {
          const result = response.data.data;
          await SheetManager.show('InfoConsulting', {
            payload: {
              message: '상담 예약이 확정되었어요.',
              description: '요청하신 ' + result.reservationDate + ' 일자에\n주택세금 상담 예약이 확정되었어요.\n세무사님이 예약된 시간이 되면\n연락을 드릴 예정이에요.\n하우택싱을 이용해주셔서 감사해요.',
              buttontext: '처음으로 돌아가기',
            },
          });
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      SheetManager.show('info', {
        type: 'error',
        message: error?.errMsg ? error?.errMsg : '상담 예약 중 오류가 발생했어요.',
        errorMessage: error?.errCode ? error?.errCode : 'error',
        buttontext: '확인하기',
      });
      console.error(error ? error : 'error');
      return false;
    }
  };



  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => {
            console.log('currentPageIndex', currentPageIndex);
            if (currentPageIndex === 0) {
              navigation.goBack();
            } else {
              setCurrentPageIndex(currentPageIndex - 1);
            }
          }}>
          {currentPageIndex === 0 ? <CloseIcon /> : <BackIcon />}
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
      title: '상담 예약하기',
      headerShadowVisible: false,
      contentStyle: {
        borderTopColor: '#F7F7F7',
        borderTopWidth: 1,
      },
      headerTitleStyle: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
        color: '#333',
        letterSpacing: -0.8,
      },
    });
  }, [currentPageIndex]);

  return (
    <ScrollView
      ref={_scrollViewRef}
      pagingEnabled
      style={{
        width: width,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      scrollEventThrottle={16}>
      <Container style={{ width: width }}>
        <ProgressSection>
        </ProgressSection>

        <><IntroSection>
          <ProfileAvatar
            source={require('../../assets/images/Minjungum_Lee_consulting.png')} />
        </IntroSection>
          <ProfileSection>
            <Title>이민정음 세무사</Title>
            <SubTitle>안녕하세요. 이민정음 세무사입니다.{'\n'}1,000건 이상의 양도소득세, 증여세, 상속세 경험을 바탕으로{'\n'}
              전문적인 상담 및 컨설팅 진행 도와드리겠습니다.</SubTitle>
            <SubTitle2>· 2023년 JS세무회계{'\n'}
              · 2021년 신승세무법인{'\n'}
              · 2020년 택스온세무법인{'\n'}
              · 2019년 세무사{'\n'}
              · 2014년 공인중개사</SubTitle2>
          </ProfileSection>
          <ButtonSection>
            <ShadowContainer>
              <Button
                width={width}
                onPress={async () => {
                  const state = await NetInfo.fetch();
                  const canProceed = await handleNetInfoChange(state);
                  if (canProceed) {
                    setCurrentPageIndex(1);
                  }
                }}>
                <ButtonText >다음으로</ButtonText>
              </Button>
            </ShadowContainer>
            <View
              style={{
                marginTop: 5,
                marginBottom: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                zIndex: 2,
              }}>
              {currentPageIndexList?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  style={{
                    width: 0 === index ? 20 : 8, // Elongate the dot
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 0 === index ? '#2F87FF' : '#1b1c1f',
                    borderWidth: 1,
                    borderColor: 0 === index ? '#2F87FF' : '#1b1c1f',
                    marginRight: 4,
                  }}
                />
              ))}
            </View>
          </ButtonSection></>
      </Container>

      <Container style={{ width: width }}>
        <ProgressSection>
        </ProgressSection>


        <><IntroSection2 style={{ width: width }}>
          <Title>고객님의 이름을 알려주세요.</Title>
          <SubTitle>이름을 밝히고 싶지않다면 닉네임도 괜찮아요.</SubTitle>
        </IntroSection2>
          <ModalInputSection>
            <ModalInputContainer>
              <ModalInput
                ref={input1}
                //  onSubmitEditing={() => input2.current.focus()}
                placeholder="이름을 입력해주세요."
                value={name}
                onChangeText={setName}
                maxLength={20}
                autoCompleteType="name"
                autoCapitalize="none"
                onSubmitEditing={async () => {
                  const state = await NetInfo.fetch();
                  const canProceed = await handleNetInfoChange(state);
                  if (canProceed) {
                    setCurrentPageIndex(2);
                  }
                }}
              />
            </ModalInputContainer>
          </ModalInputSection>
          <ButtonSection>
            <ShadowContainer>
              <Button
                style={{
                  backgroundColor: name.length < 1 ? '#E8EAED' : '#2F87FF',
                  color: name.length < 1 ? '#1b1c1f' : '#FFFFFF',
                }}
                disabled={name.length < 1}
                active={name.length > 0}
                width={width}
                onPress={async () => {
                  const state = await NetInfo.fetch();
                  const canProceed = await handleNetInfoChange(state);
                  if (canProceed) {
                    setCurrentPageIndex(2);
                  }
                }}>
                <ButtonText >다음으로</ButtonText>
              </Button>
            </ShadowContainer>
            <View
              style={{
                marginTop: 5,
                marginBottom: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                zIndex: 2,
              }}>
              {currentPageIndexList?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  style={{
                    width: 1 === index ? 20 : 8, // Elongate the dot
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 1 === index ? '#2F87FF' : '#1b1c1f',
                    borderWidth: 1,
                    borderColor: 1 === index ? '#2F87FF' : '#1b1c1f',
                    marginRight: 4,
                  }}
                />
              ))}
            </View>
          </ButtonSection></>

      </Container>
      <Container style={{ width: width }}>
        <ProgressSection>
        </ProgressSection>
        <><IntroSection2 style={{ width: width }}>
          <Title>고객님의 전화번호를 알려주세요.</Title>
          <SubTitle>세무사님께서 고객님에게 직접 연락을 드릴 예정이예요.</SubTitle>
        </IntroSection2>
          <ModalInputSection>
            <ModalInputContainer>
              <ModalInput
                ref={input2}
                //  onSubmitEditing={() => input2.current.focus()}
                placeholder="전화번호를 입력해주세요."
                value={phone}
                onChangeText={setPhone}
                maxLength={11}
                keyboardType="phone-pad"
                autoCompleteType="tel"
                onSubmitEditing={async () => {
                  const state = await NetInfo.fetch();
                  const canProceed = await handleNetInfoChange(state);
                  if (canProceed) {
                    setCurrentPageIndex(3);
                  }
                }}
              />
            </ModalInputContainer>
          </ModalInputSection>
          <ButtonSection>
            <ShadowContainer>
              <Button
                style={{
                  backgroundColor: phone.length < 1 ? '#E8EAED' : '#2F87FF',
                  color: phone.length < 1 ? '#1b1c1f' : '#FFFFFF',
                }}
                disabled={phone.length < 1}
                active={phone.length > 0}
                width={width}
                onPress={async () => {
                  const state = await NetInfo.fetch();
                  const canProceed = await handleNetInfoChange(state);
                  if (canProceed) {
                    setCurrentPageIndex(3);
                  }
                }}>
                <ButtonText >다음으로</ButtonText>
              </Button>
            </ShadowContainer>
            <View
              style={{
                marginTop: 5,
                marginBottom: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                zIndex: 2,
              }}>
              {currentPageIndexList?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  style={{
                    width: 2 === index ? 20 : 8, // Elongate the dot
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 2 === index ? '#2F87FF' : '#1b1c1f',
                    borderWidth: 1,
                    borderColor: 2 === index ? '#2F87FF' : '#1b1c1f',
                    marginRight: 4,
                  }}
                />
              ))}
            </View>
          </ButtonSection></>

      </Container>
      <Container style={{ width: width }}>
        <ProgressSection>
        </ProgressSection>
        <><FlatList
          ref={_scrollViewRef2}
          scrollEnabled={true}
          scrollEventThrottle={16}
          data={[]}
          renderItem={() => null} // 실제로 렌더링할 항목이 없으므로 null 반환
          showsVerticalScrollIndicator={false}
          overScrollMode="never" // 이 줄을 추가하세요
          ListHeaderComponent={
            <>
              <IntroSection2>
                <Title>날짜와 시간을 선택해주세요.</Title>
                <SubTitle3>예약과 동시에 일정이 확정되니, 신중하게 선택해 주세요.{'\n'}그리고 상담예약은 하루 한 번, 15분 동안 가능해요.</SubTitle3>
              </IntroSection2>
              <View
                style={{
                  width: '100%',
                  height: 350,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E8EAED',
                  marginBottom: 20,
                }}>
                <Calendar
                  setSelectedDate={setSelectedDate}
                  selectedDate={new Date(selectedDate ? new Date(selectedDate).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0))}
                  currentDate={new Date(selectedDate ? new Date(selectedDate).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0))}
                  dateList={dataList}
                />

              </View>
              <ReservationtimeSection>
                <TimeTitle>오전</TimeTitle>
                <TimeContainer>
                  {morningTimes.map((item, index) => (
                    <TimeBox
                      disabled={timeList.indexOf(item) < 0}
                      active={selectedList.indexOf(item) > -1}
                      onPress={() => {
                        if (selectedList.indexOf(item) > -1) {
                          setSelectedList(
                            selectedList.filter(selectedItem => selectedItem !== item),
                          );
                        } else {
                          setSelectedList([item]);
                        }
                      }}
                      key={index}>
                      <TimeText style={{ color: timeList.indexOf(item) < 0 ? '#E8EAED' : '#1b1c1f' }}>{item}</TimeText>
                    </TimeBox>
                  ))}
                </TimeContainer>
                <TimeTitle>오후</TimeTitle>
                <TimeContainer style={{ marginBottom: 60 }}>
                  {afternoonTimes.map((item, index) => (
                    <TimeBox
                      disabled={timeList.indexOf(item) < 0}
                      active={selectedList.indexOf(item) > -1}
                      onPress={() => {
                        if (selectedList.indexOf(item) > -1) {
                          setSelectedList(
                            selectedList.filter(selectedItem => selectedItem !== item),
                          );
                        } else {
                          setSelectedList([item]);
                        }
                      }}
                      key={index}>
                      <TimeText style={{ color: timeList.indexOf(item) < 0 ? '#E8EAED' : '#1b1c1f' }}>{item}</TimeText>
                    </TimeBox>
                  ))}
                </TimeContainer>
              </ReservationtimeSection>
            </>
          }
          ListFooterComponent={
            <><ButtonSection>
              <ShadowContainer>
                <Button
                  style={{
                    backgroundColor: selectedList.length < 1 ? '#E8EAED' : '#2F87FF',
                    color: selectedList.length < 1 ? '#1b1c1f' : '#FFFFFF',
                  }}
                  disabled={selectedList.length < 1}
                  active={selectedList.length > 0}
                  width={width}
                  onPress={async () => {
                    const state = await NetInfo.fetch();
                    const canProceed = await handleNetInfoChange(state);
                    if (canProceed) {
                      setCurrentPageIndex(4);
                    }
                  }}>
                  <ButtonText>다음으로</ButtonText>
                </Button>
              </ShadowContainer>
              <View
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  zIndex: 2,
                }}>
                {currentPageIndexList?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.6}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    style={{
                      width: 3 === index ? 20 : 8, // Elongate the dot
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 3 === index ? '#2F87FF' : '#1b1c1f',
                      borderWidth: 1,
                      borderColor: 3 === index ? '#2F87FF' : '#1b1c1f',
                      marginRight: 4,
                    }}
                  />
                ))}
              </View>
            </ButtonSection></>
          }
        /></>
      </Container>

      <Container style={{ width: width }}>
        <ProgressSection>
        </ProgressSection>
        <>
          <IntroSection2>
            <View style={{ flexDirection: 'row', alignItems: 'left', marginBottom: 10 }}>
              <ProfileAvatar2 source={require('../../assets/images/Minjungum_Lee_consulting.png')}></ProfileAvatar2>
              <ProfileName>이민정음 세무사</ProfileName>
              <ConsultingTime>{selectedDate ? new Date(selectedDate).getFullYear() + '년 ' + (new Date(selectedDate).getMonth() + 1) + '월 ' + new Date(selectedDate).getDate() + '일 ' + selectedList : ''}</ConsultingTime>
            </View>
            <View style={{
              flexDirection: 'column', alignItems: 'left', borderBottomWidth: 1,
              borderBottomColor: '#E8EAED', borderTopWidth: 1,
              borderTopColor: '#E8EAED',
            }}>
              <Title style={{ marginBottom: 10, marginTop: 10 }}>상세 내용을 알려주세요.</Title>
              <SubTitle4>세금종류</SubTitle4>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                {ConsultingList.map((item, index) => (
                  <Tag
                    style={{
                      borderColor: taxTypeList.indexOf(item) < 0 ? '#E8EAED'
                        : item === '취득세'
                          ? '#2F87FF'
                          : item === '양도소득세'
                            ? '#2F87FF'
                            : item === '상속세'
                              ? '#2F87FF'
                              : item === '증여세'
                                ? '#2F87FF'
                                : '#E8EAED'
                    }}
                    //disabled={taxTypeList.indexOf(item) < 0}
                    active={taxTypeList.indexOf(item) > -1}
                    onPress={() => {
                      if (taxTypeList.indexOf(item) > -1) {
                        setTaxTypeList(
                          taxTypeList.filter(selectedItem => selectedItem !== item),
                        );
                      } else {
                        setTaxTypeList([...taxTypeList, item]);
                      }
                    }}
                    key={index}>
                    <TagText style={{
                      color: taxTypeList.indexOf(item) < 0 ? '#E8EAED'
                        : item === '취득세'
                          ? '#2F87FF'
                          : item === '양도소득세'
                            ? '#2F87FF'
                            : item === '상속세'
                              ? '#2F87FF'
                              : item === '증여세'
                                ? '#2F87FF'
                                : '#E8EAED'
                    }}>
                      {item}
                    </TagText>
                  </Tag>
                ))}
              </View>
            </View>
            <SubTitle4 style={{ marginTop: 20, marginBottom: 20 }}>상세 내용</SubTitle4>
            <ConsultingItem>
              <ScrollView>
                <ConsultingInput
                  ref={input3}
                  multiline={true}
                  width={width}
                  placeholder="정확한 상담을 위해 사실 관계 및 문의사항을 자세하게 입력해주세요."
                  onChangeText={(input) => {
                    let byteCount = encodeURI(input).split(/%..|./).length - 1;
                    if (byteCount <= 1000) {
                      setText(input);
                    }
                  }}
                  value={text.slice(0, 1000)}
                  style={{ flexWrap: 'wrap' }}
                  blurOnSubmit={true}
                />
              </ScrollView>
            </ConsultingItem>
          </IntroSection2>
          <ButtonSection2>
            <ShadowContainer>
              <Button
                style={{
                  backgroundColor: text === '' ? '#E8EAED' : '#2F87FF',
                  color: text === '' ? '#1b1c1f' : '#FFFFFF',
                }}
                disabled={!text}
                active={text}
                width={width}
                onPress={async () => {
                  const state = await NetInfo.fetch();
                  const canProceed = await handleNetInfoChange(state);
                  if (canProceed) {
                    const result = await requestReservation();
                    console.log('result', result);;
                    if (result) {
                      navigation.navigate('Home');
                    }
                  }
                }}>
                <ButtonText>상담 예약하기</ButtonText>
              </Button>
            </ShadowContainer>
            <View
              style={{
                marginTop: 5,
                marginBottom: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                zIndex: 2,
              }}>
              {currentPageIndexList?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  style={{
                    width: 4 === index ? 20 : 8, // Elongate the dot
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 4 === index ? '#2F87FF' : '#1b1c1f',
                    borderWidth: 1,
                    borderColor: 4 === index ? '#2F87FF' : '#1b1c1f',
                    marginRight: 4,
                  }}
                />
              ))}
            </View>
          </ButtonSection2>
        </>
      </Container>



    </ScrollView>
  )
};

export default ConsultingReservation;
