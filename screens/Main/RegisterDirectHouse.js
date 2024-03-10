// 직접 등록하기 화면

import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BackIcon from '../../assets/icons/back_button.svg';
import styled from 'styled-components';
import DropShadow from 'react-native-drop-shadow';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Icons
import BuildingIcon1 from '../../assets/icons/house/building_type1_ico.svg';
import BuildingIcon2 from '../../assets/icons/house/building_type2_ico.svg';
import HouseIcon from '../../assets/icons/house/house.svg';
import VillaIcon from '../../assets/icons/house/villa.svg';
import SearchIcon from '../../assets/icons/search_ico.svg';
import KeyIcon from '../../assets/images/family_key.svg';
import {useDispatch, useSelector} from 'react-redux';
import {SheetManager} from 'react-native-actions-sheet';
import {setOwnHouseList} from '../../redux/ownHouseListSlice';
import {setDirectRegister} from '../../redux/directRegisterSlice';

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #f5f7fa;
`;

const IntroSection = styled.View`
  padding: 25px;
  height: 220px;
  width: 100%;
  background-color: #fff;
`;

const IconView = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8eaed;
`;

const Title = styled.Text`
  font-size: 20px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 30px;
  margin-bottom: 8px;
  margin-top: 20px;
  letter-spacing: -0.5px;
`;

const SubTitle = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Regular;
  color: #a3a5a8;
  line-height: 25px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const InputSection = styled.View`
  flex: 1;
  background-color: #f7f8fa;
  padding: 20px;
`;

const Paper = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 20px 0;
  border: 1px solid #e8eaed;
`;

const Label = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 16px;
  margin-bottom: 10px;
  margin-left: 20px;
`;

const DescText = styled.Text`
  font-size: 10px;
  font-family: Pretendard-Regular;
  color: #a3a5a8;
  line-height: 16px;
  margin-bottom: 15px;
  margin-left: 20px;
`;

const Button = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6,
}))`
  width: ${props => props.width - 40}px;
  height: 60px;
  border-radius: 30px;
  background-color: ${props => (props.active ? '#2f87ff' : '#e8eaed')};
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  align-self: center;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-family: Pretendard-Bold;
  color: ${props => (props.active ? '#fff' : '#a3a5a8')};
  line-height: 20px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  width: ${props => props.width - 80}px;
  height: 45px;
  background-color: #f5f7fa;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  align-self: center;
`;

const SelectButton = styled.Pressable`
  width: 140px;
  height: 70px;
  border-radius: 10px;
  background-color: #fff;
  border: ${props =>
    props.active ? '1px solid #2f87ff' : '1px solid #e8eaed'};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const SelectButtonText = styled.Text`
  font-size: 15px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 16px;
  margin-top: 8px;
`;

const RegisterDirectHouse = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {width, height} = useWindowDimensions();
  const addressInputRef = useRef(null);
  const addressDetailInputRef = useRef(null);
  const [selectedHouseType, setSelectedHouseType] = useState('1');

  const [data, setData] = useState(null);
  const ownHouseList = useSelector(state => state.ownHouseList.value);
  const currentUser = useSelector(state => state.currentUser.value);
  const [prevChat, setPrevChat] = useState(null);
  const [prevSheet, setPrevSheet] = useState(null);
  const {houseName, address, addressDetail} = useSelector(
    state => state.directRegister.value,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          onPress={() => {
            navigation.goBack();
            dispatch(
              setDirectRegister({
                houseName: '',
                address: '',
                addressDetail: '',
              }),
            );
          }}>
          <BackIcon />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
      title: '직접 등록하기',
      headerShadowVisible: false,
      contentStyle: {
        borderTopWidth: 0,
      },
      headerTitleStyle: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 17,
        color: '#333',
        letterSpacing: -0.8,
      },
    });
  }, []);

  useEffect(() => {
    if (props.route.params?.prevChat) {
      setPrevChat(props.route.params?.prevChat);
    }
    if (props.route.params?.prevSheet) {
      setPrevSheet(props.route.params?.prevSheet);
    }
  }, []);

  useEffect(() => {
    // 하드웨어 백 버튼 핸들러 정의
    const handleBackPress = () => {
      navigation.goBack();
      dispatch(
        setDirectRegister({
          houseName: '',
          address: '',
          addressDetail: '',
        }),
      );
      return true;
    };

    // 이벤트 리스너 추가
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation, props.route.params]); // 의존성 배열에 navigation과 params 추가

  const HOUSE_TYPE = [
    {
      id: '1',
      name: '아파트',
      icon: <BuildingIcon1 />,
    },
    {
      id: '4',
      name: '단독주택 · 다가구',
      icon: <HouseIcon />,
    },
    {
      id: '2',
      name: '연립 · 다세대',
      icon: <VillaIcon />,
    },
    {
      id: '3',
      name: '입주권',
      icon: <BuildingIcon2 />,
    },
  ];

  return (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: 60,
        }}>
        <View>
          <InputSection>
            <IconView>
              <KeyIcon />
            </IconView>
            <Title>
              일부 주택은 불러오지 못할 수도 있어요{'\n'}빠진 주택이 있으시다면
              직접 등록해주세요
            </Title>
            <SubTitle>
              요청받은 가족의 휴대폰에 주세박이 설치되어있지 않다면{'\n'}
              카카오톡으로 설치 안내 메시지가 동시에 전달됩니다
            </SubTitle>
            <Paper>
              <Label>주택 형태</Label>
              <DescText>
                등록하실 주택이 아파트인지, 그 외 주택 형태인지 선택해주세요.
              </DescText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 20,
                }}>
                {HOUSE_TYPE.map((item, index) => (
                  <SelectButton
                    key={item.id}
                    active={selectedHouseType === item.id}
                    onPress={() => {
                      setSelectedHouseType(item.id);
                    }}>
                    {item.icon}
                    <SelectButtonText>{item.name}</SelectButtonText>
                  </SelectButton>
                ))}
              </ScrollView>
            </Paper>
            <Paper
              style={{
                paddingHorizontal: 20,
              }}>
              <Label>주소 정보</Label>
              <DescText>
                등록하려는 주택의 주소를 검색하여 선택해주세요.
              </DescText>
              <InputContainer width={width}>
                <TextInput
                  ref={addressInputRef}
                  placeholder="주소를 검색해주세요"
                  placeholderTextColor={'#A3A5A8'}
                  style={{
                    width: '90%',
                    height: '100%',
                    fontFamily: 'Pretendard-Regular',
                    fontSize: 13,
                    color: '#1B1C1F',
                  }}
                  value={address}
                  onChangeText={text => {
                    dispatch(
                      setDirectRegister({
                        houseName,
                        address: text,
                        addressDetail,
                      }),
                    );
                  }}
                  underlineColorAndroid={'transparent'}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    addressDetailInputRef.current.focus();
                  }}
                  onFocus={() => {
                    console.log('focus', selectedHouseType);
                    if (selectedHouseType === '1') {
                      SheetManager.show('mapViewList2', {
                        payload: {
                          prevScreen: 'RegisterDirectHouse',
                          prevChat: props.route.params?.prevChat,
                          prevSheet: props.route.params?.prevSheet,
                          navigation: navigation,
                        },
                      });
                    } else {
                      SheetManager.show('searchHouse2', {
                        payload: {
                          prevScreen: 'RegisterDirectHouse',
                          prevChat: props.route.params?.prevChat,
                          prevSheet: props.route.params?.prevSheet,
                          navigation: navigation,
                        },
                      });
                    }
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{
                    top: 20,
                    bottom: 20,
                    left: 20,
                    right: 20,
                  }}
                  onPress={() => {
                    if (selectedHouseType === '1') {
                      SheetManager.show('mapViewList2', {
                        payload: {
                          prevScreen: 'RegisterDirectHouse',
                          prevChat: props.route.params?.prevChat,
                          prevSheet: props.route.params?.prevSheet,
                          navigation: navigation,
                        },
                      });
                    } else {
                      SheetManager.show('searchHouse2', {
                        payload: {
                          prevScreen: 'RegisterDirectHouse',
                          prevChat: props.route.params?.prevChat,
                          prevSheet: props.route.params?.prevSheet,
                          navigation: navigation,
                        },
                      });
                    }
                  }}>
                  <SearchIcon />
                </TouchableOpacity>
              </InputContainer>
              <InputContainer
                width={width}
                style={{
                  marginTop: 10,
                }}>
                <TextInput
                  ref={addressDetailInputRef}
                  placeholderTextColor={'#A3A5A8'}
                  placeholder="상세주소"
                  style={{
                    width: '100%',
                    height: '100%',
                    fontFamily: 'Pretendard-Regular',
                    fontSize: 13,
                    color: '#1B1C1F',
                  }}
                  value={addressDetail}
                  onChangeText={text => {
                    dispatch(
                      setDirectRegister({
                        houseName,
                        address,
                        addressDetail: text,
                      }),
                    );
                  }}
                  underlineColorAndroid={'transparent'}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </InputContainer>
            </Paper>
          </InputSection>
          <DropShadow
            style={{
              shadowColor: 'rgba(0,0,0,0.25)',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.15,
              shadowRadius: 4,
            }}>
            <Button
              active={selectedHouseType && address && addressDetail}
              width={width}
              onPress={async () => {
                await dispatch(
                  setOwnHouseList([
                    ...ownHouseList,
                    {
                      houseId: '222',
                      userId: currentUser?.userId,
                      houseType: HOUSE_TYPE.find(
                        el => el.id === selectedHouseType,
                      ).id,
                      houseName: houseName,
                      houseDetailName: addressDetail,
                    },
                  ]),
                );

                navigation.navigate(prevChat);
                setTimeout(() => {
                  SheetManager.show(
                    prevSheet ? prevSheet : props.route.params?.prevSheet,
                    {
                      payload: {
                        navigation,
                      },
                    },
                  );
                }, 300);
                dispatch(
                  setDirectRegister({
                    houseName: '',
                    address: '',
                    addressDetail: '',
                  }),
                );
              }}>
              <ButtonText
                disabled={!selectedHouseType || !address || !addressDetail}
                active={selectedHouseType && address && addressDetail}>
                등록하기
              </ButtonText>
            </Button>
          </DropShadow>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default RegisterDirectHouse;
