// 리뷰 작성 시트

import { useWindowDimensions, Pressable, Keyboard, ScrollView } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import styled from 'styled-components';
import getFontSize from '../../utils/getFontSize';
import CloseIcon from '../../assets/icons/close_button.svg';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
const SheetContainer = styled.View`
  flex: 1;
  background-color: #fff;
  width: ${props => props.width - 40}px;
  height: auto;
`;

const ModalTitle = styled.Text`
  font-size: ${getFontSize(15)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 26px;
  text-align: center;
`;

const ModalInputSection = styled.View`
  width: 100%;
  height: auto;
  margin-top: 10px;
  background-color: #fff;
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
  padding: 20px;
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

const StarSection = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e8eaed;
`;

const StarButton = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8,
}))`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f9cc26;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  border-width: 1px;
  border-color: #f9cc26;
`;

const ReviewItem = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e8eaed;
`;  // 세미콜론 추가

const ReviewInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: '#C1C3C5',
  verticalAlign: 'top',
}))`
  width: ${props => props.width - 80}px;  
  height: 120px;
  border-radius: 10px;
  background-color: #f5f7fa;
  padding: 15px; 
  font-size: 15px;
  font-family: Pretendard-Regular;
  color: #1b1c1f;
  line-height: 20px;
  text-align: left;
  align-self: center;
  text-align-vertical: top;
  overflow: hidden; 
`;

const ReviewSheet = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const [score, setScore] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShow(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShow(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const uploadReview = async () => {
    const data = {
      reviewType: 'service',
      score,
      reviewText,
    };
    const url = 'http://13.125.194.154:8080/review/registReview';

    await axios
      .post(url, data)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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
              actionSheetRef.current?.hide();
            }}>
            <CloseIcon width={16} height={16} />
          </Pressable>
        </ModalHeader>
      }
      overlayColor="#111"
      defaultOverlayOpacity={0.7}
      closeOnTouchBackdrop={false}
      gestureEnabled={false}
      statusBarTranslucent
      containerStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: keyboardShow ? 500 : 460,
        width: width - 40,
      }}>
      <SheetContainer width={width}>
        <ModalInputSection>
          <ModalTitle>
            전반적인 서비스 사용 경험에 대한{'\n'}만족도를 평점으로 남겨주세요
          </ModalTitle>
          <StarSection>
            {new Array(5).fill(0).map((_, index) => (
              <StarButton
                key={index}
                onPress={() => {
                  setScore(index + 1);
                }}
                style={{
                  backgroundColor: score >= index + 1 ? '#F9CC26' : '#fff',
                }}
              />
            ))}
          </StarSection>
          <ReviewItem>
            <ScrollView>
              <ReviewInput multiline={true} width={width} placeholder="리뷰를 작성해주세요" />
            </ScrollView>
          </ReviewItem>
        </ModalInputSection>

        <ButtonSection>
          <Button
            onPress={() => {
              actionSheetRef.current?.hide();
              navigation.navigate('Home');
            }}
            style={{
              width: '49%',
              backgroundColor: '#fff',
              borderColor: '#E8EAED',
            }}>
            <ButtonText
              style={{
                color: '#717274',
              }}>
              다음에
            </ButtonText>
          </Button>
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
              width: '49%',
            }}>
            <Button
              onPress={() => {
                uploadReview();
                actionSheetRef.current?.hide();
                setTimeout(() => {
                  navigation.navigate('Home');
                }, 200);
              }}>
              <ButtonText>제출하기</ButtonText>
            </Button>
          </DropShadow>
        </ButtonSection>
      </SheetContainer>
    </ActionSheet >
  );
};

export default ReviewSheet;
