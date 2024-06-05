// 양도세 정보 입력 시트

import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import styled from 'styled-components';
import getFontSize from '../../utils/getFontSize';
import CloseIcon from '../../assets/icons/close_button.svg';
import DropShadow from 'react-native-drop-shadow';
import Calendar from '../Calendar';
import numberToKorean from '../../utils/numToKorean';
import { useDispatch, useSelector } from 'react-redux';
import { setHouseInfo } from '../../redux/houseInfoSlice';
import { setChatDataList, addChatDataList } from '../../redux/chatDataListSlice';
import dayjs from 'dayjs';
import { gainTax } from '../../data/chatData';
import CancelCircle from '../../assets/icons/cancel_circle.svg';
import { LogBox } from 'react-native';
import { removeLastModalList } from '../../redux/modalListSlice';

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
  line-height: 20px;
  text-align: center;
`;

const InfoMessage = styled.Text`
  font-size: ${getFontSize(15)}px;
  font-family: Pretendard-Medium;
  color: #A3A5A8;
  line-height: 23px;
  margin-top: 18px;
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

const ModalInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f0f3f8;
  border-radius: 10px;
  margin-top: 10px;
`;

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: '#C1C3C5',
})`
  flex: 1;
  height: 50px;
  padding: 0 10px;
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
  LogBox.ignoreLogs(['to contain units']);
  const actionSheetRef = useRef(null);
  const _scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  // 계약일자
  const [selectedDate, setSelectedDate] = useState(new Date(),
  );

  // 양도일자
  const [selectedDate2, setSelectedDate2] = useState(new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)),
  );

  const [currentDate, setCurrentDate] = useState();

  // 양도금액
  const [saleAmount, setAcAmount] = useState(
    houseInfo?.saleAmount ? houseInfo?.saleAmount : 0,
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const houseInfo = useSelector(state => state.houseInfo.value);
  const chatDataList = useSelector(state => state.chatDataList.value);


  // 양도금액 선택 리스트
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
    //console.log('props', props);
    if (props.payload?.currentPageIndex) {
      setCurrentPageIndex(props.payload?.currentPageIndex);
      setSelectedDate(props.payload?.selectedDate);

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
      progress: 4,
    };

    dispatch(setChatDataList([...chatDataList, chat1]));
  }, []);

  return (
    <ActionSheet
      ref={actionSheetRef}
      headerAlwaysVisible
      closeOnPressBack={false}
      CustomHeaderComponent={
        <ModalHeader>
          <Pressable
            hitSlop={20}
            onPress={() => {
              dispatch(removeLastModalList());
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
      closeOnTouchBackdrop={false}
      containerStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: currentPageIndex === 2 ? (isKeyboardVisible ? 230 : 400) : 660,
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
            <InfoMessage>
                양도하실 주택의 매매 계약일자에요.{'\n'}아직 계약 전이라면, 예정일로 선택해주세요.
            </InfoMessage>
            <View
              style={{
                width: '100%',
                height: 420,
              }}>
              <Calendar
                setSelectedDate={setSelectedDate}
                currentDate={new Date()}
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
                active={selectedDate}
                disabled={!(selectedDate)}
                onPress={async () => {
                  setCurrentPageIndex(1);
                  setCurrentDate(selectedDate);
                  dispatch(
                    setHouseInfo({
                      ...houseInfo,
                      contractDate: selectedDate,
                    }),
                  );
                  const chat2 = {
                    id: 'contractDateMy',
                    type: 'my',
                    message: dayjs(selectedDate).format(
                      'YYYY년 MM월 DD일 (ddd)',
                    ),
                  };

                  const chat3 = {
                    id: 'sellDateSystem',
                    type: 'system',
                    message: '양도일자를 선택해주세요.',
                    select: [
                      {
                        id: 'sellDate',
                        name: '양도일자 선택하기',
                        openSheet: 'gain',
                        currentPageIndex: 1,
                      },
                    ],
                    progress: 4,
                  };

                  dispatch(setChatDataList([...chatDataList, chat2, chat3]));
                  //('selectedDate', selectedDate);
                }}
                style={{
                  width: width - 80,
                  alignSelf: 'center',
                  marginBottom: 50,
                  backgroundColor: selectedDate ? '#2f87ff' : '#E8EAED',
                  borderColor: selectedDate ? '#2f87ff' : '#E8EAED',
                }}>
                <ModalButtonText active={selectedDate} style={{ color: selectedDate ? '#fff' : '#717274' }}>다음으로</ModalButtonText>
              </ModalButton>
            </DropShadow>
          </ButtonSection>
        </SheetContainer>

        <SheetContainer width={width}>
          <ModalInputSection>
            <ModalTitle>양도일자를 선택해주세요.</ModalTitle>
            <InfoMessage>
                양도하실 주택의 양도예정일자에요.{'\n'}아직 계약 전이라면, 예정일로 선택해주세요.
            </InfoMessage>
            <View
              style={{
                width: '100%',
                height: 420,
              }}>
              {currentPageIndex === 1 && (<Calendar
                minDate={new Date(selectedDate ? selectedDate : houseInfo?.contractDate)}
                currentDate={new Date(currentDate ? currentDate : houseInfo?.contractDate)}
                setSelectedDate={setSelectedDate2}
              />)}
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
                  setSelectedDate2();
                  const newChatDataList = chatDataList.filter(item => item.id !== 'sellDateSystem').filter(item => item.id !== 'contractDateMy');
                  dispatch(setChatDataList(newChatDataList));
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
                active={selectedDate2}
                disabled={!(selectedDate2)}
                onPress={async () => {
                  setCurrentPageIndex(2);

                  dispatch(
                    setHouseInfo({
                      ...houseInfo,
                      sellDate: selectedDate2,
                    }),
                  );

                  const chat4 = {
                    id: 'sellDateMy',
                    type: 'my',
                    message: dayjs(selectedDate2).format(
                      'YYYY년 MM월 DD일 (ddd)',
                    ),
                  };

                  const chat5 = {
                    id: 'saleAmountSystem',
                    type: 'system',
                    message: '양도금액을 입력해주세요.',
                    select: [
                      {
                        id: 'saleAmount',
                        name: '양도금액 입력하기',
                        openSheet: 'gain',
                        currentPageIndex: 2,
                      },
                    ],
                    progress: 4,
                  };
                  if (chatDataList.find(el => el.id === 'sellDateSystem')) {
                    dispatch(setChatDataList([...chatDataList, chat4, chat5]));
                  }
                }}

                style={{
                  backgroundColor: selectedDate2 ? '#2f87ff' : '#E8EAED',
                  borderColor: selectedDate2 ? '#2f87ff' : '#E8EAED',
                }}>
                <ButtonText active={selectedDate2} style={{ color: selectedDate2 ? '#fff' : '#717274' }}>다음으로</ButtonText>
              </Button>
            </ButtonShadow>
          </ButtonSection>
        </SheetContainer>

        <SheetContainer width={width}>
          <ModalInputSection>
            <ModalTitle>양도금액을 입력해주세요.</ModalTitle>
            <ModalSubtitle>{numberToKorean(saleAmount)}원</ModalSubtitle>
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
                <ModalLabel>양도금액</ModalLabel>
              </View>
              <ModalInputContainer>
                <StyledInput
                  placeholder="양도금액을 입력해주세요."
                  keyboardType="number-pad"
                  value={saleAmount ? saleAmount.toLocaleString() : null}
                  onChangeText={text => {
                    setAcAmount(Number(text.replace(/[^0-9]/g, '')));
                  }}
                />
                {(saleAmount !== null && saleAmount !== 0) && (
                  <TouchableOpacity onPress={() => setAcAmount(null)}>
                    <CancelCircle style={{ marginRight: 10 }} width={20} height={20} />
                  </TouchableOpacity>
                )}
              </ModalInputContainer>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                {AC_AMOUNT_LIST.map((item, index) => (
                  <ModalSelectButton
                    key={index}
                    onPress={() => {
                      setAcAmount(prev => prev + item);
                    }}>
                    <ModalSelectButtonText>
                      {item === 10000000 ? '1천만' : item === 1000000 ? '1백만' : numberToKorean(item)}
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
                  const newChatDataList = chatDataList.filter(item => item.id !== 'saleAmountSystem').filter(item => item.id !== 'sellDateMy');
                  dispatch(setChatDataList(newChatDataList));
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
                  // console.log('selectedDate', selectedDate, selectedDate2);

                  // 실거주 기간 계산
                  const livePeriod = dayjs(selectedDate2).diff(
                    dayjs(selectedDate),
                    'month',
                  );

                  dispatch(
                    setHouseInfo({
                      ...houseInfo,
                      saleAmount: saleAmount ? saleAmount : 550000000,
                      livePeriod,
                    }),
                  );
                  actionSheetRef.current?.hide();

                  //console.log('houseInfo', houseInfo);

                  const chat6 = {
                    id: 'saleAmount',
                    type: 'my',
                    message: `${saleAmount?.toLocaleString()}원`,
                    data: {
                      saleAmount,
                      contractDate: selectedDate,
                      sellDate: selectedDate2,
                    },
                  };

                  const chat7 = gainTax.find(el => el.id === 'landlord1');
                  //const chat8 = gainTax.find(el => el.id === 'landlord2');
                  // const chat9 = gainTax.find(el => el.id === 'Acquiredhouse');
                  const chat10 = gainTax.find(el => el.id === 'Acquiredhouse2');
                  //const chat11 = gainTax.find(el => el.id === 'ExpenseInquiry');
                  //const chat12 = gainTax.find(el => el.id === 'ExpenseAnswer');

                  /* const chatList =
                     chatDataList[chatDataList.length - 1].id ===
                       'saleAmountSystem'
                       ? [chat6]
                       : [chat6];*/


                  if (houseInfo.ownHouseCnt === 1) {
                    dispatch(
                      setChatDataList([
                        ...chatDataList,
                        chat6,
                        chat7
                      ])
                    );
                  } else if (houseInfo.ownHouseCnt > 1) {
                    dispatch(
                      setChatDataList([
                        ...chatDataList,
                        chat6,
                        chat10
                      ])
                    );
                  }

                  dispatch(removeLastModalList());
                }} style={{
                  backgroundColor: saleAmount ? '#2f87ff' : '#E8EAED',
                  borderColor: saleAmount ? '#2f87ff' : '#E8EAED',
                }}
                active={saleAmount}
                disabled={!(saleAmount)}>
                <ButtonText active={saleAmount} style={{ color: saleAmount ? '#fff' : '#717274' }}>다음으로</ButtonText>
              </Button>
            </ButtonShadow>
          </ButtonSection>
        </SheetContainer>
      </ScrollView>
    </ActionSheet>
  );
};

export default React.memo(GainSheet);
