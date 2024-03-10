// 취득세 정보 입력 시트

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
import {acquisitionTax} from '../../data/chatData';
import {useDispatch, useSelector} from 'react-redux';
import {setHouseInfo} from '../../redux/houseInfoSlice';
import {setChatDataList} from '../../redux/chatDataListSlice';
import dayjs from 'dayjs';

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
  padding: 20px 10px;
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

const AcquisitionSheet = props => {
  const actionSheetRef = useRef(null);
  const _scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  // 계약일자
  const [selectedDate, setSelectedDate] = useState(
    houseInfo?.contractDate ? houseInfo?.contractDate : new Date(),
  );
  // 취득일자
  const [selectedDate2, setSelectedDate2] = useState(
    houseInfo?.buyDate ? houseInfo?.buyDate : new Date(),
  );

  // 취득가액
  const [acAmount, setAcAmount] = useState(
    houseInfo?.acAmount ? houseInfo?.acAmount : 550000000,
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const houseInfo = useSelector(state => state.houseInfo.value);
  const chatDataList = useSelector(state => state.chatDataList.value);

  // 취득가액 선택 리스트
  const AC_AMOUNT_LIST = [500000000, 100000000, 10000000, 1000000];

  // 수정하기로 들어온 페이지 이동
  useEffect(() => {
    if (props.payload?.currentPageIndex) {
      setCurrentPageIndex(props.payload?.currentPageIndex);
    }
  }, []);

  // 스크롤 이동
  useEffect(() => {
    _scrollViewRef.current?.scrollTo({
      x: (width - 40) * currentPageIndex,
      y: 0,
      animated: true,
    });
  }, [currentPageIndex]);

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

  // 초기 진입 시
  useEffect(() => {
    if (chatDataList.find(el => el.id === 'auiAmontSystem')) {
      return;
    }
    const chat1 = {
      id: 'auiAmontSystem',
      type: 'system',
      message: '계약일자를 선택해주세요.',
      select: [
        {
          id: 'contractDate',
          name: '계약일자 선택하기',
          openSheet: 'acquisition',
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
        height: currentPageIndex === 2 ? (isKeyboardVisible ? 230 : 400) : 620,
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
                height: 420,
              }}>
              <Calendar data={selectedDate} setSelectedDate={setSelectedDate} />
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

                  // 계약일자 업데이트
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

                  const chat3 = {
                    id: 'acquisitionDateSystem',
                    type: 'system',
                    message: '취득일자를 선택해주세요.',
                    select: [
                      {
                        id: 'acquisitionDate',
                        name: '취득일자 선택하기',
                        openSheet: 'acquisition',
                        currentPageIndex: 1,
                      },
                    ],
                    progress: 2,
                  };

                  dispatch(setChatDataList([...chatDataList, chat2, chat3]));
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
            <ModalTitle>취득일자를 선택해주세요.</ModalTitle>
            <View
              style={{
                width: '100%',
                height: 420,
              }}>
              <Calendar
                minDate={new Date()}
                selectedDate={selectedDate2}
                setSelectedDate={setSelectedDate2}
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

                  // 취득일자 업데이트
                  await dispatch(
                    setHouseInfo({
                      ...houseInfo,
                      acquisitionDate: selectedDate2,
                    }),
                  );

                  const chat4 = {
                    id: 'acquisitionDateMy',
                    type: 'my',
                    message: dayjs(houseInfo?.acquisitionDate).format(
                      'YYYY년 MM월 DD일 (ddd)',
                    ),
                  };

                  const chat1 = {
                    id: 'aquiAmountSystem',
                    type: 'system',
                    message: '취득가액을 입력해주세요.',
                    select: [
                      {
                        id: 'contractDate',
                        name: '취득가액 선택하기',
                        openSheet: 'acquisition',
                        currentPageIndex: 2,
                      },
                    ],
                    progress: 2,
                  };

                  dispatch(setChatDataList([...chatDataList, chat4, chat1]));
                }}>
                <ButtonText>다음으로</ButtonText>
              </Button>
            </ButtonShadow>
          </ButtonSection>
        </SheetContainer>

        <SheetContainer width={width}>
          <ModalInputSection>
            <ModalTitle>취득가액을 입력해주세요.</ModalTitle>
            <ModalSubtitle>{numberToKorean(acAmount)}원</ModalSubtitle>
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
                <ModalLabel>취득가액</ModalLabel>
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                  <InfoIcon />
                </TouchableOpacity>
              </View>
              <ModalInput
                placeholder="취득가액을 입력해주세요."
                keyboardType="number-pad"
                value={acAmount ? acAmount?.toLocaleString() : null}
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
                onPress={() => {
                  // 취득세 계산 할 주택 정보 업데이트
                  dispatch(
                    setHouseInfo({
                      ...houseInfo,
                      contractDate: selectedDate,
                      buyDate: selectedDate2,
                      acAmount,
                    }),
                  );

                  actionSheetRef.current?.hide();

                  const chat2 = {
                    id: 'auiAmont',
                    type: 'my',
                    message: `${acAmount.toLocaleString()}원`,
                    questionId: 'apartment',
                    data: {
                      acAmount,
                      contractDate: selectedDate,
                      buyDate: selectedDate2,
                    },
                  };
                  const chat3 = acquisitionTax.find(el => el.id === 'joint');

                  dispatch(setChatDataList([...chatDataList, chat2, chat3]));
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

export default AcquisitionSheet;
