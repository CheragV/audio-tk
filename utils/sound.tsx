import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import {storeSound, getSound} from './storage';

const fs = RNFetchBlob.fs;

export const loadSound = ({
  title,
  setLoading,
}: {
  title: string;
  setLoading: any;
}) =>
  new Sound(`${fs.dirs.DownloadDir}/${title}.mp3`, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    setLoading(false);
  });

export const calculateNewVolume = (yAxis: number) => {
  /** sound range from 0 - 1.0 */
  let newVolume = 1 - Math.ceil((yAxis + 50) / 10) / 10;
  if (newVolume > 1) {
    newVolume = 1;
  } else if (newVolume < 0) {
    newVolume = 0;
  }
  return newVolume;
};

export const loadSoundPlayer = async ({
  title,
  setLoading,
  setDING,
  url,
  id,
}: {
  title: string;
  setLoading: any;
  setDING: any;
  url: string;
  id: string;
}) => {
  try {
    let soundBase64 = await getSound(id);
    let isExist = await fs.exists(`${fs.dirs.DownloadDir}/${title}.mp3`);

    if (isExist) {
      /** song is alreacy downloaded in files */
      setDING(loadSound({title, setLoading}));
    } else if (!soundBase64) {
      /** song is not downloaded and we don't have the base64 string, we down from url */
      let soundPath = url;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', soundPath)
        .then(resp => resp.readFile('base64'))
        .then(base64 => {
          let formattedBase64String = base64;
          storeSound(id, formattedBase64String);

          fs.writeFile(
            `${fs.dirs.DownloadDir}/${title}.mp3`,
            formattedBase64String,
            'base64',
          ).then(() => {
            setDING(loadSound({title, setLoading}));
          });
        });
    } else {
      /** song is not downloaded and but we have the base64 string, we make a temp file and play from it */
      fs.writeFile(
        `${fs.dirs.DownloadDir}/${title}.mp3`,
        soundBase64,
        'base64',
      ).then(() => {
        setDING(loadSound({title, setLoading}));
      });
    }
  } catch (e) {
    console.log('cannot play the sound file 2', e);
  }
};
