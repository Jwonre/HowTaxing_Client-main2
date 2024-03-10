import {numToKorean} from 'num-to-korean';

const numberToKorean = num => {
  const korean = numToKorean(num);
  const koreanDigit = ['일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const digit = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // korean은 string이므로, split으로 배열로 만들어준다.
  const koreanArray = korean.split('');

  // koreanArray의 요소가 KoreanDigit과 일치하면 같은 인덱스의 digit으로 바꾼다.
  const koreanNumberArray = koreanArray.map(item => {
    // if (num > 10000 && item === '십') return '0';
    const index = koreanDigit.indexOf(item);
    if (index > -1) {
      return digit[index];
    }

    return item;
  });

  // koreanNumberStringArray를 다시 합쳐준다.
  const koreanNumberString = koreanNumberArray.join('');

  return koreanNumberString;
};

export default numberToKorean;
