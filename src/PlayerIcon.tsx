import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import {calculateNewVolume, loadSoundPlayer} from '../utils/sound';
import {Track} from '../typedefs';

const styles = StyleSheet.create({
  iconContainer: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaded: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 30,
  },
  playing: {
    backgroundColor: '#fafafa',
  },
  icon: {height: 28, width: 28, position: 'absolute'},
});

const PlayerScreen = ({
  track,
  playing,
  loading,
  setLoading,
  setPlaying,
  yAxis,
}: {
  track: Track;
  playing: boolean;
  loading: boolean;
  setLoading: any;
  setPlaying: any;
  yAxis: number;
}) => {
  const {id, url, title} = track;
  const [DING, setDING] = useState<Sound | undefined>();
  const [volume, setVolume] = useState(0.5);

  const playsound = () => {
    DING?.setVolume(volume);
    DING?.play(() => {
      setPlaying(false);
      DING?.stop();
    });
    setPlaying(true);
  };
  const pauseSound = () => {
    DING?.pause();
    setPlaying(false);
  };

  useEffect(() => {
    loadSoundPlayer({DING, title, setLoading, setDING, url, id});
  }, [id, url]);

  useEffect(() => {
    let newVolume = calculateNewVolume(yAxis);
    setVolume(newVolume);
    DING?.setVolume(newVolume);
  }, [DING, yAxis]);

  return (
    <>
      <TouchableHighlight
        disabled={playing}
        onPress={() => (playing ? pauseSound() : playsound())}
        style={[
          styles.iconContainer,
          !loading ? styles.loaded : {},
          playing ? styles.playing : {},
        ]}>
        <>
          <Image source={track.icon} style={styles.icon} />
          {loading && <ActivityIndicator size={60} color="#fff" />}
        </>
      </TouchableHighlight>
    </>
  );
};

export default PlayerScreen;
