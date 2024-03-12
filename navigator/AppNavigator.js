import {View, Text, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Login from '../screens/Auth/Login';
import Home from '../screens/Main/Home';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import CheckTerms from '../screens/Main/CheckTerms';
import Acquisition from '../screens/Main/Acquisition';
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
import {SheetProvider, registerSheet} from 'react-native-actions-sheet';

// Action Sheets

import OwnHouseSheet from '../components/bottomSheets/OwnHouseSheet';
import OwnHouseSheet2 from '../components/bottomSheets/OwnHouseSheet2';
import GainSheet from '../components/bottomSheets/GainSheet';
import DeleteHouseAlert from '../components/bottomSheets/DeleteHouseAlert';
import InfoAlert from '../components/bottomSheets/InfoAlert';
import MapViewListSheet from '../components/bottomSheets/MapViewListSheet';
import AcquisitionSheet from '../components/bottomSheets/AcquisitionSheet';
import CertSheet from '../components/bottomSheets/CertSheet';
import JointSheet from '../components/bottomSheets/JointSheet';
import ReviewSheet from '../components/bottomSheets/ReviewSheet';
import SearchHouseSheet from '../components/bottomSheets/SearchHouseSheet';
import ConfirmSheet2 from '../components/bottomSheets/ConfirmSheet2';
import ConfirmSheet from '../components/bottomSheets/ConfirmSheet';
import Third from '../screens/Main/Terms/Third';
import Cert from '../screens/Main/Terms/Cert';
import Cert2 from '../screens/Main/Terms/Cert2';
import Privacy2 from '../screens/Main/Terms/Privacy2';
import Location2 from '../screens/Main/Terms/Location2';
import HouseDetail from '../screens/Main/HouseDetail';
import SearchHouseSheet2 from '../components/bottomSheets/SearchHouseSheet2';
import MapViewListSheet2 from '../components/bottomSheets/MapViewListSheet2';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const currentUser = useSelector(state => state.currentUser?.value);

  const horizontalAnimation = {
    gestureDirection: 'horizontal',
    cardStyleInterpolator: ({current, layouts}) => {
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
    registerSheet('info', InfoAlert);
    registerSheet('joint', JointSheet);
    registerSheet('confirm', ConfirmSheet);
    registerSheet('confirm2', ConfirmSheet2);
    registerSheet('own', OwnHouseSheet);
    registerSheet('own2', OwnHouseSheet2);
    registerSheet('gain', GainSheet);
    registerSheet('review', ReviewSheet);
    registerSheet('delete', DeleteHouseAlert);
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
              <Stack.Screen name="GainsTaxChat" component={GainsTaxChat} />
              <Stack.Screen name="HouseDetail" component={HouseDetail} />
              <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Cert" component={Cert} />
                <Stack.Screen name="Privacy" component={Privacy} />
                <Stack.Screen name="Third" component={Third} />
              </Stack.Group>
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="CheckTerms" component={CheckTerms} />
              <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Cert2" component={Cert2} />
                <Stack.Screen name="Privacy2" component={Privacy2} />
                <Stack.Screen name="Location2" component={Location2} />
              </Stack.Group>
            </Stack.Group>
          )}
        </Stack.Navigator>
      </SheetProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
