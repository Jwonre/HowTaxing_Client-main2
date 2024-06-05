import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getFontSize from '../utils/getFontSize';
import dayjs from 'dayjs';
import ArrowIcon from '../assets/icons/previous_arrow_ico.svg';
import WheelPicker from 'react-native-wheely';

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
  height: 300;
  background-color: #f5f7fa;
  border-radius: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;
const Calendar = props => {
  // console.log('props.currentDate', props.currentDate);
  //console.log('props.currentDate', props.currentDate);
  //console.log('props.selectedDate', props.selectedDate);
  const [currentDate, setCurrentDate] = useState(props.currentDate !== undefined ? new Date(props.currentDate) : new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(props.selectedDate !== undefined ? new Date(props.selectedDate) : null);
  const [selectedYear, setSelectedYear] = useState(props.selectedDate !== undefined ? new Date(props.selectedDate).getFullYear() : null);
  const [selectedMonth, setSelectedMonth] = useState(props.selectedDate !== undefined ? new Date(props.selectedDate).getMonth() : null);
  const currentyear = currentDate.getFullYear();
  const years = [];
  for (let i = currentyear - 50; i <= currentyear + 50; i++) {
    years.push(i);
  }
  const currentmonth = currentDate.getMonth();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const getDaysInMonth = (month, year) => {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  };
  const [daysInMonth, setDaysInMonth] =  useState(selectedMonth ? getDaysInMonth(selectedMonth, selectedYear ? selectedYear : currentyear) : getDaysInMonth(currentmonth, selectedYear ? selectedYear : currentyear));

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  //const [viewMode, setViewMode] = useState('day');
  console.log('currentDate', currentDate);
  console.log('currentyear', currentyear);
  console.log('currentmonth', currentmonth);
  console.log('SelectedYear', selectedYear);
  console.log('SelectedMonth', selectedMonth);
  console.log('daysInMonths', daysInMonth);
  useEffect(() => {
    //console.log('currentDate', currentDate);
    setCurrentPageIndex(0);
    generateDatesInRange();
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
  const generateDatesInRange = () => {
    const dates = [];
    for (
      let date = new Date(firstSunday);
      date <= lastSaturday;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date));
    }

    setCalendarData(dates);
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <ModalSubtitle>
        {dayjs(selectedDate !== null ? selectedDate : new Date()).format('YYYY년 MM월 DD일')}
      </ModalSubtitle>
      {currentPageIndex === 0 && (<><View
        style={{
          width: '100%',
          borderTopWidth: 1,
          borderTopColor: '#E8EAED',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            width: 200,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
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
          </TouchableOpacity>
          <ModalSubtitle onPress={() => { setCurrentPageIndex(1) }}>{dayjs(currentDate).format('YYYY.MM')}</ModalSubtitle>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      </View>

        <CalendarHeader />
        <CalendarSection>
          <FlatList
            key={currentDate.getMonth()}
            scrollEnabled={false}
            data={calendarData}
            numColumns={7}
            keyExtractor={item => item.toISOString()}
            renderItem={renderDay}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
          />
        </CalendarSection></>)}
      {currentPageIndex === 1 && (<><View
        style={{
          width: '100%',
          borderTopWidth: 1,
          borderTopColor: '#E8EAED',
          paddingHorizontal: 10,
        }}>
        <SelectGroup>
          <View style={{ width: '40%', marginRight: 10 }}>
            <SelectLabel>연도 선택</SelectLabel>
            <PickerContainer>
              <WheelPicker
                selectedIndex={
                  selectedDate !== null ? years.indexOf(selectedDate.getFullYear()) : years.indexOf(currentDate.getFullYear())
                }
                containerStyle={{
                  width: 120,
                  height: 440,
                  borderRadius: 10,
                }}
                itemTextStyle={{
                  fontFamily: 'Pretendard-Regular',
                  fontSize: getFontSize(18),
                  color: '#1B1C1F',
                }}
                selectedIndicatorStyle={{
                  backgroundColor: 'transparent',
                }}
                itemHeight={40}
                options={years}
                onChange={index => {
                  setSelectedYear(years[index]);
                  setSelectedDate(new Date(years[index] , selectedMonth !== null ? selectedMonth : currentmonth, selectedDate !== null ? selectedDate.getDate() : currentDate.getDate()) );
                }}
                visibleRest={5}
              />

            </PickerContainer>
          </View>
          <View style={{ width: '27%', marginRight: 10 }}>
            <SelectLabel>월 선택</SelectLabel>
            <PickerContainer>
              <WheelPicker
                selectedIndex={
                  selectedDate !== null ? months.indexOf(selectedDate.getMonth()+1) : months.indexOf(currentDate.getMonth()+1)
                }
                containerStyle={{
                  width: 120,
                  height: 440,
                  borderRadius: 10,
                }}
                itemTextStyle={{
                  fontFamily: 'Pretendard-Regular',
                  fontSize: getFontSize(18),
                  color: '#1B1C1F',
                }}
                selectedIndicatorStyle={{
                  backgroundColor: 'transparent',
                }}
                itemHeight={40}
                options={months}
                onChange={index => {
                  const monthIndex = months[index]-1;
                  setSelectedMonth(monthIndex);
                  setDaysInMonth(getDaysInMonth(monthIndex, selectedYear ? selectedYear : currentyear));
                  setSelectedDate( new Date(selectedYear !== null ? selectedYear : currentyear , monthIndex, selectedDate !== null ? selectedDate.getDate() : currentDate.getDate()) );
                }}
                visibleRest={5}
              />

            </PickerContainer>
          </View>
          <View style={{ width: '27%', marginRight: 10 }}>
            <SelectLabel>일 선택</SelectLabel>
            <PickerContainer>
              <WheelPicker
                key={daysInMonth}
                selectedIndex={
                  selectedDate !== null ? daysInMonth.indexOf(selectedDate.getDate()) : daysInMonth.indexOf(currentDate.getDate())
                }
                containerStyle={{
                  width: 120,
                  height: 440,
                  borderRadius: 10,
                }}
                itemTextStyle={{
                  fontFamily: 'Pretendard-Regular',
                  fontSize: getFontSize(18),
                  color: '#1B1C1F',
                }}
                selectedIndicatorStyle={{
                  backgroundColor: 'transparent',
                }}
                itemHeight={40}
                options={daysInMonth}
                onChange={index => {
                  setSelectedDate( new Date(selectedYear !== null ? selectedYear : currentyear , selectedMonth !== null ? selectedMonth : currentmonth, daysInMonth[index]) );
                }}
                visibleRest={5}
              />

            </PickerContainer>
          </View>
        </SelectGroup>
      </View>

      </>)}
    </View>
  );
};

export default Calendar;
