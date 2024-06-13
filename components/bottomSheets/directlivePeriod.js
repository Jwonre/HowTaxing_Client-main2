// 챗 스크린에서 주택 검색 시트

import {
  View,
  useWindowDimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import styled from 'styled-components';
import getFontSize from '../../utils/getFontSize';
import CloseIcon from '../../assets/icons/close_button.svg';
import DropShadow from 'react-native-drop-shadow';
import WheelPicker from 'react-native-wheely';
import { useDispatch, useSelector } from 'react-redux';
import { setChatDataList } from '../../redux/chatDataListSlice';
import { setHouseInfo } from '../../redux/houseInfoSlice';
import { gainTax } from '../../data/chatData';
  



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

const ModalHeader = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const ApartmentInfoGroup = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const ApartmentInfoTitle = styled.Text`
  width: 60%;
  font-size: ${getFontSize(16)}px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 30px;
  text-align: center;
  margin-bottom: auto;
`;

const ButtonSection = styled.View`
  width: ${props => props.width - 40}px;
  height: auto;
  background-color: #fff;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin-top: 10px;
`;

const SelectGroup = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px 20px;
`;

const SelectLabel = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 20px;
`;

const PickerContainer = styled.View`
  width: 100%;
  height: 187px;
  background-color: #f5f7fa;
  border-radius: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
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


const directlivePeriod = props => {
  const actionSheetRef = useRef(null);
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const chatDataList = useSelector(state => state.chatDataList.value);
  const houseInfo = useSelector(state => state.houseInfo.value);
  const YearList = Array.from({ length: 101 }, (_, i) => `${i}년`);
  const MonthList = Array.from({ length: 12 }, (_, i) => `${i}개월`);

  // 다음으로 버튼 핸들러
  const nextHandler = async () => {
    actionSheetRef.current?.hide();
    const chat1 = {
      id: 'livePeriodMy',
      type: 'my',
      message:
        (selectedDate.year ? selectedDate.year === '0년' ? '' : selectedDate.year : '0년')
        +
        (selectedDate.month ? selectedDate.month === '0개월' ? selectedDate.year === '0년' ? '거주기간 없음' : '' : selectedDate.month : '0개월')
      ,
      questionId: 'livePeriod',
    };
    const chat2 = gainTax.find(el => el.id === 'ExpenseInquiry');
    const chat3 = gainTax.find(el => el.id === 'ExpenseAnswer');
    dispatch(setChatDataList([...chatDataList, chat1, chat2, chat3]));
    dispatch(
      setHouseInfo(
        {
          ...houseInfo,
          livePeriodYear: Math.floor(selectedDate.year ? selectedDate.year.replace('년', '') : 0),
          livePeriodMonth: Math.floor(selectedDate.month ? selectedDate.month.replace('개월', '') : 0)
        },
      )
    );
     
    // console.log('selectedYear :', Math.floor(selectedYear.replace('년', '')));
    // console.log('selectedMonth :', selectedMonth.replace('개월', ''));


  };

  const WheelPickerConfig = {
    containerStyle: {
      width: 120,
      height: 180,
      borderRadius: 10,
    },
    itemTextStyle: {
      fontFamily: 'Pretendard-Regular',
      fontSize: getFontSize(18),
      color: '#1B1C1F',
    },
    selectedIndicatorStyle: {
      backgroundColor: 'transparent',
    },
    itemHeight: 40,
  };

  const [selectedDate, setSelectedDate] = useState({ year: YearList[0], month: MonthList[0] });


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
              const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
              dispatch(setChatDataList(newChatDataList));
               
              actionSheetRef.current?.hide();
            }}>
            <CloseIcon width={16} height={16} />
          </Pressable>
        </ModalHeader>
      }
      overlayColor="#111"
      defaultOverlayOpacity={0.7}
      gestureEnabled={false}
      closeOnTouchBackdrop={false}
      statusBarTranslucent
      containerStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 420,
        width: width - 40,
      }}>

      <SheetContainer>
        <ModalTitle
          style={{
            marginBottom: 10,
          }}>
          실거주 기간을 입력해 주세요.
        </ModalTitle>

        <SelectGroup>
          <View style={{ width: '48%' }}>
            <PickerContainer>
              <WheelPicker
                selectedIndex={YearList.indexOf(selectedDate.year)}
                {...WheelPickerConfig}
                options={YearList}
                onChange={index => {
                  setSelectedDate({ ...selectedDate, year: YearList[index] });
                }}
              />
            </PickerContainer>
          </View>
          <View style={{ width: '48%' }}>
            <PickerContainer>
              <WheelPicker
                selectedIndex={MonthList.indexOf(selectedDate.month)}
                {...WheelPickerConfig}
                options={MonthList}
                onChange={index => {
                  setSelectedDate({ ...selectedDate, month: MonthList[index] });
                }}
              />
            </PickerContainer>
          </View>
        </SelectGroup>
        <ButtonSection
          style={{
            marginTop: 0,
          }}>
          <DropShadow
            style={{
              shadowColor: '#fff',
              width: '48%',
            }}>
            <Button
              onPress={() => {
                const newChatDataList = chatDataList.slice(0, props.payload?.index + 1);
                dispatch(setChatDataList(newChatDataList));
                actionSheetRef.current?.hide();
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
          </DropShadow>

          <DropShadow style={styles.dropshadow}>
            <Button onPress={nextHandler}>
              <ButtonText>다음으로</ButtonText>
            </Button>
          </DropShadow>
        </ButtonSection>
      </SheetContainer>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  dropdownStyle: {
    width: '37%',
    height: 300,
    borderRadius: 10,
    marginTop: -20,
  },
  buttonStyle: {
    width: '100%',
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8EAED',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontSize: getFontSize(13),
    fontFamily: 'Pretendard-SemiBold',
    color: '#A3A5A8',
    letterSpacing: -0.3,
    lineHeight: 16,
    marginRight: 15,
  },
  rowStyle: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: '#E8EAED',
  },
  rowTextStyle: {
    fontSize: getFontSize(13),
    fontFamily: 'Pretendard-Regular',
    color: '#1B1C1F',
    letterSpacing: -0.3,
    lineHeight: 16,
  },
  dropshadow: {
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
});

export default directlivePeriod;
