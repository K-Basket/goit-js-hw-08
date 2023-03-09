import lodashThrottle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';
const timeData = localStorage.getItem(CURRENT_TIME);

// слушаттель события timeupdate
player.on('timeupdate', lodashThrottle(onPlay, 1000));
// восстанавливает время остановки player
player.setCurrentTime(timeData);

function onPlay(data) {
  const timeData = data.seconds;

  localStorage.setItem(CURRENT_TIME, timeData);
}
