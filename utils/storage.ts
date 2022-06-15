import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@SoundPlayerStorage:';

export const storeSound = async (id: string, value: string) => {
  try {
    const jsonValue = value;
    await AsyncStorage.setItem(`${STORAGE_KEY}${id}`, jsonValue);
  } catch (e) {
    // saving error
    console.log('Error saving file');
  }
};

export const getSound = async (id: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`${STORAGE_KEY}${id}`);
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    // error reading value
    console.log('Error', e);
  }
};
