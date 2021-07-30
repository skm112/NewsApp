import AsyncStorage from '@react-native-async-storage/async-storage';
import { getType } from './getType';
export const storeDataByKey = async (key, value) => {
  try {
    const parsedValue =
      typeof value === 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, parsedValue);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const readDataByKey = async (key, type) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null
      ? type === 'object'
        ? JSON.parse(jsonValue)
        : jsonValue
      : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
