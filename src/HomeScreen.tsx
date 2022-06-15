import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Track} from '../typedefs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const play = require('../assets/images/play-icon.png');

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
  rowItem: {
    margin: 8,
  },
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  playIcon: {height: 24, width: 24},
  title: {color: '#000', padding: 16, fontWeight: '600', fontSize: 18, flex: 1},
  detailContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 8,
  },
  duration: {color: '#369'},
  size: {color: '#3A1'},
});

const tracks = [
  {
    id: '1001',
    url: 'https://www.kozco.com/tech/piano2-CoolEdit.mp3',
    title: 'Piano Wave',
    duration: 6,
    size: '102 KB',
  },
  {
    id: '1002',
    url: 'https://dl.espressif.com/dl/audio/gs-16b-2c-44100hz.mp3',
    title: 'Introduction Sound',
    duration: 15,
    size: '254 KB',
  },
  {
    id: '1003',
    url: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav',
    title: 'Cantina Band',
    duration: 3,
    size: '132 KB',
  },
  {
    id: '1004',
    url: 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav',
    title: 'Pink Panther',
    duration: 60,
    size: '1.2 MB',
  },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View>
      <FlatList
        data={tracks}
        renderItem={({item}: {item: Track}): JSX.Element => (
          <TouchableHighlight
            key={item.id}
            style={styles.rowItem}
            onPress={() => navigation.navigate('Player', {...item})}>
            <View style={styles.itemContainer}>
              <Image source={play} style={styles.playIcon} />
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.detailContainer}>
                <Text style={styles.duration}>{`${item.duration} secs`}</Text>
                <Text style={styles.size}>{item.size}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default HomeScreen;
