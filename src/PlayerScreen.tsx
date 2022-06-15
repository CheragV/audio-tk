import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SoundPlayer from 'react-native-sound-player';
import {storeSound, getSound} from '../utils/storage';
import RNFetchBlob from 'rn-fetch-blob';

const spotify = require('../assets/images/spotify.png');
const playIcon = require('../assets/images/play.png');
const pauseIcon = require('../assets/images/pause.png');

const fs = RNFetchBlob.fs;

type PlayerProps = {
  params: {
    id: string;
    url: string;
    title: string;
    duration: string;
    size: string;
  };
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#1B2430'},
  displayContainer: {flex: 2, justifyContent: 'center', alignItems: 'center'},
  contentContainer: {
    flex: 1,
    margin: 16,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotify: {padding: 16},
  title: {fontWeight: 'bold', fontSize: 24, color: '#fff'},
  cta: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  actionIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: '#fff',
  },
  actionIcon: {
    height: 20,
    width: 20,
  },
});

const PlayerScreen = ({route}: {route: PlayerProps}) => {
  const {params} = route;
  const {id, url, title, duration} = params;
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState<typeof SoundPlayer | null>(null);
  const [playing, setPlaying] = useState(false);

  const playsound = () => {
    track?.play();
    setPlaying(true);
  };
  const pauseSound = () => {
    track?.pause();
    setPlaying(false);
  };

  const loadSoundPlayer = async () => {
    try {
      let soundBase64 = await getSound(id);
      if (soundBase64) {
        // Load from Local storage
        SoundPlayer.loadUrl(soundBase64);
      } else {
        // or play from url
        let soundPath = url;
        RNFetchBlob.config({
          fileCache: true,
        })
          .fetch('GET', soundPath)
          .then(resp => {
            soundPath = resp.path();
            return resp.readFile('base64');
          })
          .then(base64 => {
            let formattedBase64String = `data:audio/ogg;base64,${base64}`;
            storeSound(id, formattedBase64String);
            SoundPlayer.loadUrl(formattedBase64String);
          });
      }
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  };

  useEffect(() => {
    loadSoundPlayer();

    let _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        if (success === true) {
          setPlaying(false);
        }
      },
    );
    let _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      async ({success}) => {
        if (success === true) {
          setLoading(false);
          setTrack(SoundPlayer);
          playsound();
        }
      },
    );
    return () => {
      track?.stop();
      fs.unlink(url);
      _onFinishedLoadingURLSubscription.remove();
      _onFinishedPlayingSubscription.remove();
    };
  }, [id, url, track]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.displayContainer}>
        {loading ? (
          <View>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text>Please Wait. Loading Sound ...</Text>
          </View>
        ) : (
          <Image source={spotify} style={styles.spotify} />
        )}
      </View>

      <View style={styles.contentContainer}>
        {!loading && (
          <>
            <Text style={styles.title}>{title}</Text>
            <Text>{`${duration} secs`}</Text>
            {playing ? (
              <TouchableHighlight
                underlayColor="#fff"
                style={styles.actionIconContainer}
                onPress={pauseSound}>
                <Image source={pauseIcon} style={styles.actionIcon} />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                underlayColor="#fff"
                style={styles.actionIconContainer}
                onPress={playsound}>
                <Image source={playIcon} style={styles.actionIcon} />
              </TouchableHighlight>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default PlayerScreen;
