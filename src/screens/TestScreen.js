import React, { useState } from 'react';
import { Text, View } from 'react-native';
import ModalDatePicker from '../components/timeRangeModal';
import Article from '../components/ArticleCard';
const TestScreen = () => {
  //   const [date, setDate] = useState(new Date());
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      {/* <Article />
      <ModalDatePicker getDate={(date) => console.log(date)} /> */}
      <Article
        index={1}
        image={''}
        title={'@AvaMEdwards -- Deleted after 2 hours 6 minutes ago'}
        description={`#ClimateAction QT @chilledasad100: Germany, Belgium, India, Uganda, Burundi, China? Nope this is Turkey. These climate floods are happening at 1.2c - https://t.co/AzpJu3ASH1)
It looks like this twee… [+18 chars]`}
        date={'2021-07-24T22:32:44Z'}
        name={'ProPublica'}
      />
    </View>
  );
};

export default TestScreen;

// import React, { useState } from 'react';
// import DatePicker from 'react-native-date-picker';

// const TestScreen = () => {
//   const [date, setDate] = useState(new Date());

//   return <DatePicker date={date} onDateChange={setDate} />;
// };

// export default TestScreen;
