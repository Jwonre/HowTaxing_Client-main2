import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import StartPage from '../screens/Auth/StartPage';
import Login from '../screens/Auth/Login';
import Home from '../screens/Main/Home';
import LoginWebview from '../screens/Auth/LoginWebview';

// Redux
import { useSelector, useDispatch } from 'react-redux';

import Acquisition from '../screens/Main/Acquisition';
import CheckTerms from '../screens/Main/CheckTerms';
import GainsTax from '../screens/Main/GainsTax';
import AcquisitionChat from '../screens/Main/AcquisitionChat';
import FamilyHouse from '../screens/Main/FamilyHouse';
import RegisterFamilyHouse from '../screens/Main/RegisterFamilyHouse';
import DoneResisterFamilyHouse from '../screens/Main/DoneResisterFamilyHouse';
import DirectRegister from '../screens/Main/DirectRegister';
import RegisterDirectHouse from '../screens/Main/RegisterDirectHouse';
import OwnedHouseDetail from '../screens/Main/OwnedHouseDetail';
import OwnedFamilyHouse from '../screens/Main/OwnedFamilyHouse';
import DoneSendFamilyHouse from '../screens/Main/DoneSendFamilyHouse';
import GainsTaxChat from '../screens/Main/GainsTaxChat';
import Privacy from '../screens/Main/Terms/Privacy';
import NetworkAlert from '../screens/Main/NetworkAlert';
import { SheetProvider, registerSheet } from 'react-native-actions-sheet';

// Action Sheets

import OwnHouseSheet from '../components/bottomSheets/OwnHouseSheet';
import OwnHouseSheet2 from '../components/bottomSheets/OwnHouseSheet2';
import GainSheet from '../components/bottomSheets/GainSheet';
import ExpenseSheet from '../components/bottomSheets/ExpenseSheet';
import ConsultingSheet from '../components/bottomSheets/ConsultingSheet';
import DeleteHouseAlert from '../components/bottomSheets/DeleteHouseAlert';
import InfoAlert from '../components/bottomSheets/InfoAlert';
import InfoCertification from '../components/bottomSheets/InfoCertification';
import InfoAppinformation from '../components/bottomSheets/InfoAppinformation';
import InfoExpense from '../components/bottomSheets/InfoExpense';
import LogOutSheet from '../components/bottomSheets/LogOutSheet';
import MapViewListSheet from '../components/bottomSheets/MapViewListSheet';
import AcquisitionSheet from '../components/bottomSheets/AcquisitionSheet';
import CertSheet from '../components/bottomSheets/CertSheet';
import CertSheet2 from '../components/bottomSheets/CertSheet2';
import JointSheet from '../components/bottomSheets/JointSheet';
import OwnHouseCountSheet from '../components/bottomSheets/OwnHouseCountSheet';
import ReviewSheet from '../components/bottomSheets/ReviewSheet';
import directlivePeriod from '../components/bottomSheets/directlivePeriod';
import SearchHouseSheet from '../components/bottomSheets/SearchHouseSheet';
import ConfirmSheet2 from '../components/bottomSheets/ConfirmSheet2';
import ConfirmSheet from '../components/bottomSheets/ConfirmSheet';
//import Third from '../screens/Main/Terms/Third';
import Cert from '../screens/Main/Terms/Cert';
import Cert2 from '../screens/Main/Terms/Cert2';
import Cert3 from '../screens/Main/Terms/Cert3';
import Privacy2 from '../screens/Main/Terms/Privacy2';
import Privacy3 from '../screens/Main/Terms/Privacy3';
import Location2 from '../screens/Main/Terms/Location2';
import Copyright3 from '../screens/Main/Terms/Copyright3';
import Gov24 from '../screens/Main/Terms/Gov24';
import HouseDetail from '../screens/Main/HouseDetail';
import SearchHouseSheet2 from '../components/bottomSheets/SearchHouseSheet2';
import MapViewListSheet2 from '../components/bottomSheets/MapViewListSheet2';
import QuestionMarkDefinition from '../components/bottomSheets/QuestionMarkDefinition';
import ChooseHouseTypeAlert from '../components/bottomSheets/ChooseHouseTypeAlert';
import ChooseHouseDongHoAlert from '../components/bottomSheets/ChooseHouseDongHoAlert';
import UpdateAddressAlert from '../components/bottomSheets/UpdateAddressAlert';
import UpdateHouseDetailNameAlert from '../components/bottomSheets/UpdateHouseDetailNameAlert';
import UpdateHouseNameAlert from '../components/bottomSheets/UpdateHouseNameAlert';
import UpdatePubLandPriceAlert from '../components/bottomSheets/UpdatePubLandPriceAlert';
import UpdateBuyPriceAlert from '../components/bottomSheets/UpdateBuyPriceAlert';
import UpdateAreaMeterAlert from '../components/bottomSheets/UpdateAreaMeterAlert';
import UpdateUserProportionAlert from '../components/bottomSheets/UpdateUserProportionAlert';
import UpdateBuyDateAlert from '../components/bottomSheets/UpdateBuyDateAlert';
import UpdateContractDateAlert from '../components/bottomSheets/UpdateContractDateAlert';
//import UpdateBalanceDateAlert from '../components/bottomSheets/UpdateBalanceDateAlert';
//import UpdateMoveInDateAlert from '../components/bottomSheets/UpdateMoveInDateAlert';
//import UpdateMoveOutDateAlert from '../components/bottomSheets/UpdateMoveOutDateAlert';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const currentUser = useSelector(state => state.currentUser?.value);
  const [firstLaunch, setFirstLaunch] = useState(true);
  const horizontalAnimation = {
    gestureDirection: 'horizontal',
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };

  useEffect(() => {
    registerSheet('mapViewList', MapViewListSheet);
    registerSheet('mapViewList2', MapViewListSheet2);
    registerSheet('searchHouse', SearchHouseSheet);
    registerSheet('searchHouse2', SearchHouseSheet2);
    registerSheet('acquisition', AcquisitionSheet);
    registerSheet('cert', CertSheet);
    registerSheet('cert2', CertSheet2);
    registerSheet('infoExpense', InfoExpense);
    registerSheet('info', InfoAlert);
    registerSheet('infoCertification', InfoCertification);
    registerSheet('InfoAppinformation', InfoAppinformation);
    registerSheet('joint', JointSheet);
    registerSheet('ownHouseCount', OwnHouseCountSheet);
    registerSheet('confirm', ConfirmSheet);
    registerSheet('confirm2', ConfirmSheet2);
    registerSheet('own', OwnHouseSheet);
    registerSheet('own2', OwnHouseSheet2);
    registerSheet('gain', GainSheet);
    registerSheet('Expense', ExpenseSheet);
    registerSheet('Consulting', ConsultingSheet);
    registerSheet('directlivePeriod', directlivePeriod);
    registerSheet('review', ReviewSheet);
    registerSheet('logout', LogOutSheet);
    registerSheet('delete', DeleteHouseAlert);
    registerSheet('questionMarkDefinition', QuestionMarkDefinition);
    registerSheet('chooseHouseTypeAlert', ChooseHouseTypeAlert);
    registerSheet('chooseHouseDongHoAlert', ChooseHouseDongHoAlert);
    registerSheet('updateAddressAlert', UpdateAddressAlert);
    registerSheet('updateHouseDetailNameAlert', UpdateHouseDetailNameAlert);
    registerSheet('updateHouseNameAlert', UpdateHouseNameAlert);
    registerSheet('updatePubLandPriceAlert', UpdatePubLandPriceAlert);
    registerSheet('updateBuyPriceAlert', UpdateBuyPriceAlert);
    registerSheet('updateAreaMeterAlert', UpdateAreaMeterAlert);
    registerSheet('updateUserProportionAlert', UpdateUserProportionAlert);
    // registerSheet('updateMoveOutDateAlert', UpdateMoveOutDateAlert);
    // registerSheet('updateMoveInDateAlert', UpdateMoveInDateAlert);
    //registerSheet('updateBalanceDateAlert', UpdateBalanceDateAlert);
    registerSheet('updateBuyDateAlert', UpdateBuyDateAlert);
    registerSheet('updateContractDateAlert', UpdateContractDateAlert);


  }, []);

  return (
    <NavigationContainer>
      <SheetProvider>
        <Stack.Navigator screenOptions={horizontalAnimation}>
          {currentUser ? (
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                  headerheaderTitleStyle: {
                    fontFamily: 'Pretendard-Bold',
                    fontSize: 18,
                    color: '#222',
                  },
                }}
              />
              <Stack.Screen name="Acquisition" component={Acquisition} />
              <Stack.Screen name="GainsTax" component={GainsTax} />
              <Stack.Screen name="FamilyHouse" component={FamilyHouse} />
              <Stack.Screen
                name="RegisterFamilyHouse"
                component={RegisterFamilyHouse}
              />
              <Stack.Screen
                name="DoneResisterFamilyHouse"
                component={DoneResisterFamilyHouse}
              />
              <Stack.Screen name="DirectRegister" component={DirectRegister} />
              <Stack.Screen
                name="RegisterDirectHouse"
                component={RegisterDirectHouse}
              />
              <Stack.Screen
                name="OwnedHouseDetail"
                component={OwnedHouseDetail}
              />
              <Stack.Screen
                name="OwnedFamilyHouse"
                component={OwnedFamilyHouse}
              />
              <Stack.Screen
                name="DoneSendFamilyHouse"
                component={DoneSendFamilyHouse}
              />
              <Stack.Screen
                name="AcquisitionChat"
                component={AcquisitionChat}
              />
              <Stack.Screen
                name="NetworkAlert"
                component={NetworkAlert}
              />
              <Stack.Screen name="GainsTaxChat" component={GainsTaxChat} />
              <Stack.Screen name="HouseDetail" component={HouseDetail} />
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Cert" component={Cert} />
                <Stack.Screen name="Privacy" component={Privacy} />
              </Stack.Group>
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Cert3" component={Cert3} />
                <Stack.Screen name="Privacy3" component={Privacy3} />
                <Stack.Screen name="Copyright3" component={Copyright3} />
                <Stack.Screen name="Gov24" component={Gov24} />
              </Stack.Group>
            </Stack.Group>
          ) : (
            <Stack.Group>
              {firstLaunch ? (
                <Stack.Screen
                  name="StartPage"
                  component={StartPage}
                  listeners={{
                    transitionEnd: () => {
                      // StartPage로의 이동이 끝나면 일정 시간 후에 firstLaunch를 false로 설정
                      setTimeout(() => {
                        setFirstLaunch(false);
                      }, 6800);  // 1000ms = 1초 딜레이
                    },
                  }}
                />
              ) : null}
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="CheckTerms" component={CheckTerms} />
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Cert2" component={Cert2} />
                <Stack.Screen name="Privacy2" component={Privacy2} />
                <Stack.Screen name="Location2" component={Location2} />
              </Stack.Group>
              <Stack.Screen
                name="NetworkAlert"
                component={NetworkAlert}
              />
              <Stack.Screen name="LoginWebview" component={LoginWebview}
                options={{ headerShown: false }} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </SheetProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
