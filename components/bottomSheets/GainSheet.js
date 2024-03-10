// 양도세 정보 입력 시트

import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import styled from 'styled-components';
import getFontSize from '../../utils/getFontSize';
import CloseIcon from '../../assets/icons/close_button.svg';
import DropShadow from 'react-native-drop-shadow';
import InfoIcon from '../../assets/icons/info_tooltip_ico.svg';
import Calendar from '../Calendar';
import numberToKorean from '../../utils/numToKorean';
import {useDispatch, useSelector} from 'react-redux';
import {setHouseInfo} from '../../redux/houseInfoSlice';
import {setChatDataList} from '../../redux/chatDataListSlice';
import dayjs from 'dayjs';
import {gainTax} from '../../data/chatData';

dayjs.locale('ko');

const SheetContainer = styled.View`
  flex: 1;
  background-color: #fff;
  width: ${props => props.width - 40}px;
  height: auto;
`;

const ModalTitle = styled.Text`
  font-size: ${getFontSize(17)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 26px;
  text-align: center;
`;

const ModalLabel = styled.Text`
  font-size: 15px;
  font-family: Pretendard-SemiBold;
  color: #000;
  line-height: 18px;
  margin-right: 6px;
`;

const ModalSubtitle = styled.Text`
  font-size: ${getFontSize(16)}px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 20px;
  text-align: center;
  margin: 20px 0;
`;

const ModalInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: '#C1C3C5',
}))`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: #f0f3f8;
  padding: 0 15px;
  margin-top: 10px;
  font-size: 15px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 20px;
  text-align: right;
`;

const ModalSelectButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6,
}))`
  width: 24%;
  height: 48px;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border: 1px solid #e8eaed;
`;

const ModalSelectButtonText = styled.Text`
  font-size: 15px;
  font-family: Pretendard-SemiBold;
  color: #1b1c1f;
  line-height: 20px;
`;

const ModalInputSection = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
`;

const ModalButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 48%;
  height: 50px;
  border-radius: 25px;
  background-color: #2f87ff;
  align-items: center;
  justify-content: center;
`;

const ModalButtonText = styled.Text`
  font-size: ${getFontSize(15)}px;
  font-family: Pretendard-SemiBold;
  color: #fff;
  line-height: 20px;
`;

const ModalHeader = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const ButtonSection = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-top-width: 1px;
  border-top-color: #e8eaed;
`;

const ButtonShadow = styled(DropShadow)`
  width: 48%;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 10;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4;
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

const GainSheet = props => {
  const actionSheetRef = useRef(null);
  const _scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  // 계약일자
  const [selectedDate, setSelectedDate] = useState(
    houseInfo?.contractDate ? houseInfo?.contractDate : new Date(),
  );
  // 양도일자
  const [selectedDate2, setSelectedDate2] = useState(
    houseInfo?.saleDate ? houseInfo?.saleDate : new Date(),
  );

  // 양도가액
  const [saleAmount, setAcAmount] = useState(
    houseInfo?.saleAmount ? houseInfo?.saleAmount : 550000000,
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const houseInfo = useSelector(state => state.houseInfo.value);
  const chatDataList = useSelector(state => state.chatDataList.value);

  // 양도가액 선택 리스트
  const AC_AMOUNT_LIST = [500000000, 100000000, 10000000, 1000000];

  // 페이지 이동
  useEffect(() => {
    _scrollViewRef.current?.scrollTo({
      x: (width - 40) * currentPageIndex,
      y: 0,
      animated: true,
    });
  }, [currentPageIndex]);

  // 수정하기 버튼으로 들어온 페이지 이동
  useEffect(() => {
    if (props.payload?.currentPageIndex) {
      setCurrentPageIndex(props.payload?.currentPageIndex);
    }
  }, []);

  // 키보드 이벤트
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // 초기 세팅
  useEffect(() => {
    if (chatDataList.find(el => el.id === 'contractDateSystem')) {
      return;
    }
    const chat1 = {
      id: 'contractDateSystem',
      type: 'system',
      message: '계약일자를 선택해주세요.',
      select: [
        {
          id: 'contractDate',
          name: '계약일자 선택하기',
          openSheet: 'gain',
          currentPageIndex: 0,
        },
      ],
      progress: 2,
    };

    dispatch(setChatDataList([...chatDataList, chat1]));
  }, []);

  return (
    <ActionSheet
      ref={actionSheetRef}
      headerAlwaysVisible
      CustomHeaderComponent={
        <ModalHeader>
          <Pressable
            hitSlop={20}
            onPress={() => {
              actionSheetRef.current?.hide();
            }}>
            <CloseIcon width={16} height={16} />
          </Pressable>
        </ModalHeader>
      }
      overlayColor="#111"
      defaultOverlayOpacity={0.7}
      gestureEnabled={false}
      statusBarTranslucent
      containerStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: currentPageIndex === 2 ? (isKeyboardVisible ? 230 : 400) : 600,
        width: width - 40,
      }}>
      <ScrollView
        ref={_scrollViewRef}
        pagingEnabled
        style={{
          width: width - 40,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        scrollEventThrottle={16}>
        <SheetContainer width={width}>
          <ModalInputSection>
            <ModalTitle>계약일자를 선택해주세요.</ModalTitle>
            <View
              style={{
                width: '100%',
                height: 410,
              }}>
              <Calendar
                data={selectedDate}
                setSelectedDate={date => {
                  console.log('setSelectedDate', date);
                  setSelectedDate(date);
                }}
              />
            </View>
          </ModalInputSection>
          <ButtonSection
            style={{
              justifyContent: 'center',
            }}>
            <DropShadow
              style={{
                shadowColor: 'rgba(0,0,0,0.25)',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                alignSelf: 'center',
              }}>
              <ModalButton
                onPress={async () => {
                  setCurrentPageIndex(1);

                  await dispatch(
                    setHouseInfo({
                      ...houseInfo,
                      contractDate: selectedDate,
                    }),
                  );
                  const chat2 = {
                    id: 'contractDateMy',
                    type: 'my',
                    message: dayjs(houseInfo?.contractDate).format(
                      'YYYY년 MM월 DD일 (ddd)',
                    ),
                  };

                  dispatch(setChatDataList([...chatDataList, chat2]));
                }}
                style={{
                  width: width - 80,
                  alignSelf: 'center',
                  marginBottom: 50,
                }}>
                <ModalButtonText>다음으로</ModalButtonText>
              </ModalButton>
            </DropShadow>
          </ButtonSection>
        </SheetContainer>

        <SheetContainer width={width}>
          <ModalInputSection>
            <ModalTitle>양도일자를 선택해주세요.</ModalTitle>
            <View
              style={{
                width: '100%',
                height: 410,
              }}>
              <Calendar
                minDate={new Date()}
                selectedDate={selectedDate2}
                setSelectedDate={date => setSelectedDate2(date)}
              />
            </View>
          </ModalInputSection>

          <ButtonSection>
            <ButtonShadow
              style={{
                shadowColor: '#fff',
              }}>
              <Button
                onPress={() => {
                  setCurrentPageIndex(0);
                }}
                style={{
                  backgroundColor: '#fff',
                  borderColor: '#E8EAED',
                }}>
                <ButtonText
                  style={{
                    color: '#717274',
                  }}>
                  이전으로
                </ButtonText>
              </Button>
            </ButtonShadow>
            <ButtonShadow>
              <Button
                onPress={async () => {
                  setCurrentPageIndex(2);

                  await dispatch(
                    setHouseInfo({
                      ...houseInfo,
                      saleDate: selectedDate2,
                    }),
                  );
                  const chat3 = {
                    id: 'saleDateSystem',
                    type: 'system',
                    message: '양도일자를 선택해주세요.',
                    select: [
                      {
                        id: 'saleDate',
                        name: '양도일자 선택하기',
                        openSheet: 'gain',
                        currentPageIndex: 1,
                      },
                    ],
                    progress: 2,
                  };
                  const chat4 = {
                    id: 'saleDateMy',
                    type: 'my',
                    message: dayjs(houseInfo?.saleDate).format(
                      'YYYY년 MM월 DD일 (ddd)',
                    ),
                  };
                  if (chatDataList.find(el => el.id === 'saleDateSystem')) {
                    dispatch(setChatDataList([...chatDataList, chat4]));
                  } else {
                    dispatch(setChatDataList([...chatDataList, chat3, chat4]));
                  }
                }}>
                <ButtonText>다음으로</ButtonText>
              </Button>
            </ButtonShadow>
          </ButtonSection>
        </SheetContainer>

        <SheetContainer width={width}>
          <ModalInputSection>
            <ModalTitle>양도가액을 입력해주세요.</ModalTitle>
            <ModalSubtitle>{numberToKorean(saleAmount)}</ModalSubtitle>
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <ModalLabel>양도가액</ModalLabel>
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                  <InfoIcon />
                </TouchableOpacity>
              </View>
              <ModalInput
                placeholder="양도가액을 입력해주세요."
                keyboardType="number-pad"
                value={saleAmount?.toLocaleString()}
                onChangeText={text => {
                  setAcAmount(Number(text.replace(/[^0-9]/g, '')));
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                {AC_AMOUNT_LIST.map((item, index) => (
                  <ModalSelectButton
                    onPress={() => {
                      setAcAmount(prev => prev + item);
                    }}>
                    <ModalSelectButtonText>
                      {numberToKorean(item)}
                    </ModalSelectButtonText>
                  </ModalSelectButton>
                ))}
              </View>
            </View>
          </ModalInputSection>
          <ButtonSection
            style={{
              borderTopWidth: 0,
            }}>
            <ButtonShadow
              style={{
                shadowColor: '#fff',
              }}>
              <Button
                onPress={() => {
                  setCurrentPageIndex(1);
                }}
                style={{
                  backgroundColor: '#fff',
                  borderColor: '#E8EAED',
                }}>
                <ButtonText
                  style={{
                    color: '#717274',
                  }}>
                  이전으로
                </ButtonText>
              </Button>
            </ButtonShadow>
            <ButtonShadow>
              <Button
                onPress={async () => {
                  console.log('selectedDate', selectedDate, selectedDate2);

                  // 실거주 기간 계산
                  const livePeriod = dayjs(selectedDate2).diff(
                    dayjs(selectedDate),
                    'month',
                  );

                  await dispatch(
                    setHouseInfo({
                      ...houseInfo,
                      saleAmount: saleAmount ? saleAmount : 550000000,
                      livePeriod,
                    }),
                  );
                  actionSheetRef.current?.hide();

                  const chat5 = {
                    id: 'saleAmountSystem',
                    type: 'system',
                    message: '양도가액을 입력해주세요.',
                    select: [
                      {
                        id: 'contractDate',
                        name: '양도가액 선택하기',
                        openSheet: 'gain',
                        currentPageIndex: 2,
                      },
                    ],
                    progress: 2,
                  };

                  console.log('houseInfo', houseInfo);

                  const chat6 = {
                    id: 'saleAmount',
                    type: 'my',
                    message: `${saleAmount?.toLocaleString()}원`,
                    data: {
                      saleAmount,
                      contractDate: selectedDate,
                      saleDate: selectedDate2,
                    },
                  };

                  const chat7 = {
                    id: 'over12',
                    type: 'system',
                    progress: 3,
                    message:
                      '매도하실 주택의 양도가액이 12억을 초과하는군요. 정확한 양도소득세 계산을 위해서 실거주 기간이 추가로 필요해요. 지금 본인인증을 한 번 더 해야해요.',
                  };

                  const chat8 = {
                    id: 'getInfoDone',
                    type: 'system',
                    progress: 3,
                    message:
                      '양도소득세 계산에 필요한 정보들을 모두 수집했어요.',
                  };

                  const chat9 = {
                    id: 'getInfoConfirm',
                    type: 'system',
                    progress: 4,
                    message:
                      '잘못된 정보들로 양도소득세를 계산하면 정확한 결과가 나오지 않을 수 있어요. 모든 정보들이 맞는지 확인해볼까요?',
                  };

                  const chat10 = gainTax.find(item => item.id === 'cert');

                  const chatList =
                    chatDataList[chatDataList.length - 1].id ===
                    'saleAmountSystem'
                      ? [chat6]
                      : [chat5, chat6];

                  if (saleAmount > 1200000000) {
                    dispatch(
                      setChatDataList([
                        ...chatDataList,
                        ...chatList,
                        chat7,
                        chat10,
                      ]),
                    );
                  } else {
                    dispatch(
                      setChatDataList([
                        ...chatDataList,
                        ...chatList,
                        chat8,
                        chat9,
                      ]),
                    );
                  }
                }}>
                <ButtonText>다음으로</ButtonText>
              </Button>
            </ButtonShadow>
          </ButtonSection>
        </SheetContainer>
      </ScrollView>
    </ActionSheet>
  );
};

export default GainSheet;
