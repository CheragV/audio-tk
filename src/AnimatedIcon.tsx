import {Animated} from 'react-native';
import {Track} from '../typedefs';
import React, {useState} from 'react';
import PlayerIcon from './PlayerIcon';

import usePanResponder from '../utils/usePanResponder';

const maxBand = 50;

const Player = ({track}: {track: Track}) => {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [state, panHandlers] = usePanResponder();
  let yAxis = 0;

  const {initialY, offsetY} = state;

  yAxis = initialY + offsetY;

  const style = {
    transform: [{translateY: playing ? yAxis : 0}],
    top: playing ? -maxBand : 0,
  };

  return (
    <Animated.View style={[style]} {...panHandlers}>
      <PlayerIcon
        track={track}
        loading={loading}
        setLoading={setLoading}
        playing={playing}
        setPlaying={setPlaying}
        yAxis={yAxis}
      />
    </Animated.View>
  );
};

export default Player;
