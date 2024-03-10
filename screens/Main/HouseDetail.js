// 주택정보 상세 페이지

import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../assets/icons/back_button.svg';
import styled from 'styled-components';
import DropShadow from 'react-native-drop-shadow';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import getFontSize from '../../utils/getFontSize';
import NaverMapView, {Marker} from 'react-native-nmap';
import Switch from 'react-native-draggable-switch';
import {SheetManager} from 'react-native-actions-sheet';
import {HOUSE_TYPE} from '../../constants/colors';
import axios from 'axios';
import {useSelector} from 'react-redux';

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #f5f7fa;
`;

const HoustInfoSection = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
  border-radius: 10px;
`;

const MapContainer = styled.View`
  width: 100%;
  height: 150px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 20px;
`;

const HoustInfoTitle = styled.Text`
  width: 100%;
  font-size: ${getFontSize(20)}px;
  font-family: Pretendard-Bold;
  color: #1b1c1f;
  line-height: 24px;
  margin-bottom: 7px;
  margin-top: 4px;
`;

const HoustInfoText = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Regular;
  color: #717274;
  line-height: 20px;
`;

const HoustInfoBadge = styled.View`
  width: auto;
  height: 22px;
  padding: 0 10px;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-right: auto;
`;

const HoustInfoBadgeText = styled.Text`
  font-size: ${getFontSize(10)}px;
  font-family: Pretendard-Medium;
  color: #fff;
  line-height: 12px;
  letter-spacing: -0.5px;
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
  padding: 20px;
  border: 1px solid #e8eaed;
`;

const Label = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 16px;
  margin-bottom: 10px;
`;

const HouseSection = styled.View`
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 20px;
`;

const InfoContentSection = styled.View`
  width: 100%;
  height: auto;
  background-color: #f7f8fa;
  padding: 10px 20px;
`;
const InfoContentItem = styled.View`
  width: 100%;
  height: 56px;
  background-color: #fff;
  border-radius: 6px;
  padding: 0 18px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: #e8eaed;
`;

const InfoContentLabel = styled.Text`
  font-size: ${getFontSize(12)}px;
  font-family: Pretendard-Regular;
  color: #97989a;
  line-height: 20px;
  letter-spacing: -0.3px;
`;

const InfoContentText = styled.Text`
  font-size: ${getFontSize(14)}px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 20px;
  margin-left: auto;
  text-align: right;
`;

const HouseDetail = props => {
  const {item, prevSheet} = props.route.params;
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const [isMovingInRight, setIsMovingInRight] = useState(false);
  const houseInfo = useSelector(state => state.houseInfo.value);

  console.log(item);
  const [location, setLocation] = useState({
    latitude: 37.5326,
    longitude: 127.024612,
  });
  const [data, setData] = useState(item);

  useEffect(() => {
    getHouseDetailInfo();
  }, []);

  const getHouseDetailInfo = async () => {
    const url = 'http://13.125.194.154:8080/house/detail';

    await axios
      .get(url, {
        params: {
          houseId: item?.houseId ? item.houseId : '25',
        },
      })
      .then(function (result) {
        if (result.isError) {
          Alert.alert('주택 정보가 없습니다.');
          return;
        }
        getAPTLocation(result.data.data.roadnmAdr);
        setData(result.data.data);
        setIsMovingInRight(result.data.data.isMovingInRight);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAPTLocation = async address => {
    const API_KEY = 'e094e49e35c61a9da896785b6fee020a';
    const config = {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    }; // 헤더 설정
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      address,
    )}`;

    await axios
      .get(url, config)
      .then(function (result) {
        setLocation({
          latitude: Number(result.data.documents[0].y),
          longitude: Number(result.data.documents[0].x),
        });
      })
      .catch(function (error) {
        console.log(error);
        SheetManager.show('info', {
          payload: {
            message: '주소를 찾을 수 없습니다.',
            type: 'error',
          },
        });
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          onPress={() => {
            navigation.goBack();
            if (!props.route.params?.prevSheet) {
              return;
            } else {
              SheetManager.show(props.route.params?.prevSheet, {
                payload: {
                  navigation,
                },
              });
            }
          }}>
          <BackIcon />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
      title: '주택 상세 정보',
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
  }, [props.route.params?.prevSheet]);

  return (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}>
        <>
          <HouseSection>
            <HoustInfoSection>
              <HoustInfoBadge
                style={{
                  backgroundColor: HOUSE_TYPE.find(
                    color => color.id === data?.houseType,
                  ).color,
                }}>
                <HoustInfoBadgeText>
                  {HOUSE_TYPE.find(color => color.id === data?.houseType).name}
                </HoustInfoBadgeText>
              </HoustInfoBadge>
              <HoustInfoTitle>{data?.houseName}</HoustInfoTitle>
              <HoustInfoText>{data?.houseDetailName}</HoustInfoText>
            </HoustInfoSection>
            <MapContainer>
              <NaverMapView
                style={{
                  flex: 1,
                  width: width - 40,
                  height: 150,
                  borderRadius: 20,
                }}
                showsMyLocationButton={false}
                center={{...location, zoom: 16}}
                zoomControl={false}
                rotateGesturesEnabled={false}
                scrollGesturesEnabled={false}
                pitchEnabled={false}
                zoomEnabled={false}
                isHideCollidedSymbols
                isForceShowIcon
                isHideCollidedCaptions>
                <Marker
                  coordinate={location}
                  width={50}
                  height={50}
                  onClick={() => console.warn('onClick! p2')}>
                  <View>
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
                      <Image
                        source={require('../../assets/images/map_area_ico.png')}
                        style={{
                          width: 50,
                          height: 50,
                        }}
                      />
                    </DropShadow>
                  </View>
                </Marker>
              </NaverMapView>
            </MapContainer>
          </HouseSection>
          <InfoContentSection>
            <InfoContentItem>
              <InfoContentLabel>주택유형</InfoContentLabel>
              <InfoContentText>
                {HOUSE_TYPE.find(color => color.id === data.houseType).name}
              </InfoContentText>
            </InfoContentItem>
            <InfoContentItem>
              <InfoContentLabel>주소</InfoContentLabel>
              <InfoContentText>{data?.roadnmAdr}</InfoContentText>
            </InfoContentItem>
            <InfoContentItem>
              <InfoContentLabel>상세주소</InfoContentLabel>
              <InfoContentText>{data?.detailAdr}</InfoContentText>
            </InfoContentItem>
            <InfoContentItem>
              <InfoContentLabel>동호수</InfoContentLabel>
              <InfoContentText>{data?.houseDetailName}</InfoContentText>
            </InfoContentItem>
            <InfoContentItem>
              <InfoContentLabel>공시지가</InfoContentLabel>
              <InfoContentText>
                {Number(data?.pubLandPrice)?.toLocaleString()} 원
              </InfoContentText>
            </InfoContentItem>
            <InfoContentItem>
              <InfoContentLabel>KB시세</InfoContentLabel>
              <InfoContentText>
                {Number(data?.kbMktPrice)?.toLocaleString()} 원
              </InfoContentText>
            </InfoContentItem>
            <InfoContentItem>
              <InfoContentLabel>전용면적</InfoContentLabel>
              <View
                style={{
                  marginLeft: 'auto',
                }}>
                <InfoContentText>{data?.areaPyung}평형</InfoContentText>
                <InfoContentText
                  style={{
                    fontSize: 10,
                    color: '#A3A5A8',
                  }}>
                  {data?.areaMeter}m2
                </InfoContentText>
              </View>
            </InfoContentItem>
          </InfoContentSection>
          <InputSection>
            <Paper>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                  justifyContent: 'space-between',
                }}>
                <Label
                  style={{
                    marginBottom: 0,
                  }}>
                  소유자
                </Label>
              </View>

              <InfoContentItem>
                <InfoContentLabel
                  style={{
                    color: '#1B1C1F',
                    fontSize: getFontSize(14),
                  }}>
                  본인
                </InfoContentLabel>
                <InfoContentText>
                  {Number(data?.ownerCnt) > 1 && (
                    <Text
                      style={{
                        color: '#B5283B',
                      }}>
                      공동명의{'  '}
                    </Text>
                  )}
                  {data?.userProportion}%
                </InfoContentText>
              </InfoContentItem>
              {Number(data?.ownerCnt) > 1 &&
                new Array(Number(data?.ownerCnt) - 1)
                  .fill(0)
                  .map((item, index) => (
                    <InfoContentItem>
                      <InfoContentLabel
                        style={{
                          color: '#1B1C1F',
                          fontSize: getFontSize(14),
                        }}>
                        소유자{index + 1}
                      </InfoContentLabel>
                      <InfoContentText>
                        <Text
                          style={{
                            color: '#B5283B',
                          }}>
                          공동명의{'  '}
                        </Text>
                        {data[`owner${index + 1}Proportion`]}%
                      </InfoContentText>
                    </InfoContentItem>
                  ))}
            </Paper>
            <InfoContentItem>
              <InfoContentLabel>입주권 여부</InfoContentLabel>

              <Switch
                width={50}
                height={28}
                value={isMovingInRight}
                circleStyle={{
                  width: 20,
                  height: 20,
                  borderRadius: 12,
                  backgroundColor: '#fff',
                }}
                onValueChange={isSwitchOn => {
                  setIsMovingInRight(isSwitchOn);
                }}
                activeColor="#2F87FF"
                disabledColor="#E8EAED"
              />
            </InfoContentItem>
          </InputSection>
        </>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default HouseDetail;
