import {
  View,
  StyleSheet,
  ImageBackground,
  BackHandler,
  Image,
  TouchableHighlight,
  Text,
  Alert,
} from 'react-native';
import React from 'react';

import {Track} from '../typedefs';
import AnimatedIcon from './AnimatedIcon';

const cloud = require('../assets/images/cloud.png');
const piano = require('../assets/images/piano.png');
const guitar = require('../assets/images/guitar.png');
const cougar = require('../assets/images/cougar.png');
const wave = require('../assets/images/wave.png');
const cross = require('../assets/images/cross.png');

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#495EBD'},
  top: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middle: {flex: 1},
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  crossButton: {
    height: 25,
    width: 25,
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIcon: {
    height: 22,
    width: 22,
  },
  instructions: {height: 30},
  instructionsText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#fff',
  },
});

const tracks: Array<Track> = [
  {
    id: '1001',
    url: 'https://www.kozco.com/tech/piano2-CoolEdit.mp3',
    title: 'Piano',
    duration: 6,
    size: '102 KB',
    icon: piano,
  },
  {
    id: '1002',
    url: 'https://dl.espressif.com/dl/audio/gs-16b-2c-44100hz.mp3',
    title: 'Introduction Sound',
    duration: 15,
    size: '254 KB',
    icon: cloud,
  },
  {
    id: '1003',
    url: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav',
    title: 'Cantina Band',
    duration: 3,
    size: '132 KB',
    icon: guitar,
  },
  {
    id: '1004',
    url: 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav',
    title: 'Pink Panther',
    duration: 60,
    size: '1.2 MB',
    icon: cougar,
  },
];

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View key="top" style={styles.top}>
        <TouchableHighlight
          underlayColor="#495EBD"
          style={styles.crossButton}
          onPress={() => BackHandler.exitApp()}>
          <Image source={cross} style={styles.crossIcon} />
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#495EBD"
          style={styles.instructions}
          onPress={() => Alert.alert('Instructions')}>
          <Text style={styles.instructionsText}>Instructions</Text>
        </TouchableHighlight>
      </View>
      <View key="middle" style={styles.middle}>
        <ImageBackground
          source={wave}
          resizeMode="cover"
          style={styles.backgroundImage}
        />
      </View>
      <View key="bottom" style={styles.bottom}>
        {tracks.map(track => (
          <AnimatedIcon key={track.id} track={track} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;
