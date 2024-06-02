import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getFontSize from '../utils/getFontSize';
import dayjs from 'dayjs';
import ArrowIcon from '../assets/icons/previous_arrow_ico.svg';

const CalendarSection = styled.View`
  width: 100%;
  padding: 0 10px;

  padding-bottom: 20px;
`;

const CalendarWeekday = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 12px;
  font-family: 'Pretendard-Medium';
  color: #97989a;
`;

const ModalSubtitle = styled.Text`
  font-size: ${getFontSize(16)}px;
  font-family: Pretendard-Medium;
  color: #1b1c1f;
  line-height: 20px;
  text-align: center;
  margin: 20px 0;
`;

const Calendar = props => {
 // console.log('props.currentDate', props.currentDate);
  //console.log('props.currentDate', props.currentDate);
  //console.log('props.selectedDate', props.selectedDate);
  const [currentDate, setCurrentDate] = useState(props.currentDate !== undefined ? new Date(props.currentDate): new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(props.selectedDate !== undefined ? new Date(props.selectedDate): null);
  const [viewMode, setViewMode] = useState('day');
   //console.log('selectedDate', selectedDate);
  useEffect(() => {
    generateDatesInRange('day');
   //console.log('currentDate', currentDate);
  }, [currentDate]);

  useEffect(() => {
    props.setSelectedDate(selectedDate);
    //console.log('viewMode', viewMode);
   // console.log('    currentDate.getMonth()', currentDate.getMonth());

  }, [selectedDate]);

  const CalendarHeader = () => {
    const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 32,
          paddingHorizontal: 10,
          marginTop: 10,
        }}>
        {DAYS.map((day, index) => (
          <CalendarWeekday key={index}>{day}</CalendarWeekday>
        ))}
      </View>
    );
  };

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  const firstMonthOfYear = new Date(
    currentDate.getFullYear(),
    0,
    currentDate.getDate(),
  );
  const lastMonthOfYear = new Date(
    currentDate.getFullYear(),
    11,
    currentDate.getDate(),
  );

  const firstYear = new Date(
    new Date().getFullYear() - 100, 
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  const lastYear = new Date(
    new Date().getFullYear() + 50,
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  // 주의 첫 번째 일요일 찾기
  const firstSunday = new Date(firstDayOfMonth);
  firstSunday.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
  const lastSaturday = new Date(lastDayOfMonth);
  lastSaturday.setDate(
    lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()),
  );

  const renderDay = ({ item }) => {
    const isPast = item < props.minDate;
    const isSunday = item.getDay() === 0;
    const isSaturday = item.getDay() === 6;
    const isSelected = item.toDateString() === selectedDate?.toDateString();
    return (
      <Pressable
        disabled={props.minDate ? isPast : false}
        onPress={() => {
          setSelectedDate(item);
         // console.log('item', item);
        }}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          height: 42,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: isSelected ? '#1B1C1F' : '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: 16,
                fontFamily: 'Pretendard-Regular',
                color: isSelected ? '#fff' : '#CFD1D5',
                textAlign: 'center',
              },
              !isPast
                ? {
                  color: isSelected
                    ? '#fff'
                    : isSaturday
                      ? '#4E63FF'
                      : isSunday
                        ? '#FF2C65'
                        : '#545463',
                }
                : null,
            ]}>
            {item.getDate()}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderMonth = ({ item }) => {
    const isSelected = item.toDateString() === selectedDate?.toDateString();
    return (
      <Pressable
        onPress={() => {
          setCurrentDate(item);
          generateDatesInRange('day');
          setViewMode('day');
        }}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          height: 90,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: isSelected ? '#1B1C1F' : '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: 18,
                fontFamily: 'Pretendard-Regular',
                color: isSelected ? '#fff' : '#CFD1D5',
                textAlign: 'center',
              },
              {
                color: isSelected
                  ? '#fff'
                  : '#545463',
              }

            ]}>
            {item.getMonth() + 1 + '월'}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderYear = ({ item }) => {
    const isSelected = item.toDateString() === selectedDate?.toDateString();
    return (
      <Pressable
        //  disabled={props.minDate ? isPast : false}
        onPress={() => {
        //  setCurrentDate(item);
        //  console.log('year->month item',item);
          setViewMode('month');
          generateDatesInRange('month');

        }}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          height: 42,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: isSelected ? '#1B1C1F' : '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: 16,
                fontFamily: 'Pretendard-Regular',
                color: isSelected ? '#fff' : '#CFD1D5',
                textAlign: 'center',
              },
              {
                color: isSelected
                  ? '#fff'
                  : '#545463',
              }
            ]}>
            {item.getFullYear()}
          </Text>
        </View>
      </Pressable>
    );
  };
  const generateDatesInRange = (viewMode) => {
    const dates = [];
    if (viewMode === 'day') {
      for (
        let date = new Date(firstSunday);
        date <= lastSaturday;
        date.setDate(date.getDate() + 1)
      ) {
        dates.push(new Date(date));
      }
    } else if (viewMode === 'month') {
      for (
        let Months = new Date(firstMonthOfYear);
        Months <= lastMonthOfYear;
        Months.setMonth(Months.getMonth() + 1)
      ) {
        dates.push(new Date(Months));
      }
    } else if (viewMode === 'year') {
      for (
        let year = new Date(firstYear);
        year <= lastYear;
        year.setFullYear(year.getFullYear() + 1)
      ) {
        dates.push(new Date(year));
      }


    };
    //console.log('firstMonthOfYear', firstMonthOfYear);
   //console.log('lastMonthOfYear', lastMonthOfYear);
    //console.log('dates', dates);
    setCalendarData(dates);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <ModalSubtitle>
      {(viewMode === 'day') && (  dayjs(selectedDate !== null ? selectedDate : new Date()).format('YYYY년 MM월 DD일'))}
      </ModalSubtitle>
      <View
        style={{
          width: '100%',
          borderTopWidth: 1,
          borderTopColor: '#E8EAED',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            width: viewMode === 'day' ? 200 : null,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          {(viewMode === 'day') && (<TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            }}
            onPress={() => {
              (setCurrentDate(dayjs(currentDate).subtract(1, 'M').toDate()));
            }}>
            <ArrowIcon />
          </TouchableOpacity>)}
          {(viewMode === 'day') && (<ModalSubtitle onPress={() => { setViewMode('month'); generateDatesInRange('month'); }}>{dayjs(currentDate).format('YYYY.MM')}</ModalSubtitle>)}
          {(viewMode === 'month') && (<ModalSubtitle onPress={() => { setViewMode('year'); generateDatesInRange('year'); }}>{dayjs(currentDate).format('YYYY')}</ModalSubtitle>)}
          {(viewMode === 'day') && (<TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            }}
            onPress={() => {
              setCurrentDate(dayjs(currentDate).add(1, 'M').toDate());
            }}>
            <ArrowIcon
              style={{
                transform: [{ rotate: '180deg' }],
              }}
            />
          </TouchableOpacity>)}
        </View>
      </View>
      {(viewMode === 'day') && (<CalendarHeader />)}
      <CalendarSection>
        {(viewMode === 'day') && (<FlatList
          key={currentDate.getDate()}
          scrollEnabled={false}
          data={calendarData}
          numColumns={7}
          keyExtractor={item => item.toISOString()}
          renderItem={renderDay}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />)}
        {(viewMode === 'month') && (<FlatList
          scrollEnabled={false}
          data={calendarData}
          numColumns={4}
          keyExtractor={item => item.toISOString()}
          renderItem={renderMonth}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />)}
        {(viewMode === 'year') && (<FlatList
          scrollEnabled={true}
          data={calendarData}
          numColumns={4}
          keyExtractor={item => item.toISOString()}
          renderItem={renderYear}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />)}
      </CalendarSection>
    </View>
  );
};

export default Calendar;
