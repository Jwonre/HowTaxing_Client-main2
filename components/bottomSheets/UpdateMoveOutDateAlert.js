// 보유 주택 목록에서 공시가격 수정 선택시 뜨는 팝업

import {
  View,
  useWindowDimensions,
  Pressable,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import styled from 'styled-components';
import getFontSize from '../../utils/getFontSize';
import CloseIcon from '../../assets/icons/close_button.svg';
import DropShadow from 'react-native-drop-shadow';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from '../Calendar';
import { removeLastModalList } from '../../redux/modalListSlice';


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
  margin-bottom: 20px;
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



const UpdateMoveOutDateAlert = props => {

  const { handleHouseChange, data, navigation, prevSheet } = props.payload;

  const dispatch = useDispatch();
  const actionSheetRef = useRef(null);
  const { width, height } = useWindowDimensions();

  const _scrollViewRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date(),
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // 공시가격


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

  const nextHandler = async () => {

    var p = data;
    p.moveOutDate = selectedDate;
   // console.log('[UpdatePubLandPriceAlert]nextHandler p:', p);
    await handleHouseChange(p, p?.isMoveInRight);
    dispatch(removeLastModalList());
    actionSheetRef.current?.hide();
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
      closeOnTouchBackdrop={false}
      statusBarTranslucent
      containerStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
            <ModalTitle>전출일자를 선택해주세요.</ModalTitle>
            <View
              style={{
                width: '100%',
                height: 420,
              }}>
              <Calendar
                minDate={data?.moveInDate ? new Date(data?.moveInDate) : new Date(data?.balanceDate) ? new Date(data?.balanceDate) : new Date(data?.constractDate) ? new Date(data?.constractDate) : new Date()}
                value={data?.moveOutDate}
                setSelectedDate={setSelectedDate}
                currentDate={data?.moveInDate ? new Date(data?.moveInDate) : new Date(data?.balanceDate) ? new Date(data?.balanceDate) : new Date(data?.constractDate) ? new Date(data?.constractDate) : new Date()}
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
            </ButtonShadow>
            <ButtonShadow>
              <Button
                active={selectedDate}
                disabled={!(selectedDate)}
                onPress={() => {
                  // 주택 정보 업데이트
                  nextHandler();
                }}
                style={{
                  alignSelf: 'center',
                  backgroundColor: selectedDate ? '#2f87ff' : '#E8EAED',
                  borderColor: selectedDate ? '#2f87ff' : '#E8EAED',
                }}>
                <ButtonText active={selectedDate} style={{ color: selectedDate ? '#fff' : '#717274' }}>다음으로</ButtonText>
              </Button>
            </ButtonShadow>
          </ButtonSection>

        </SheetContainer>
      </ScrollView>
    </ActionSheet >
  );
};

export default UpdateMoveOutDateAlert;
