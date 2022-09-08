import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const debounce = require('lodash.debounce');

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimeUpdate, 1000));
player.on('ended', debounce(videoEnd, 1000));

const savedTime = localStorage.getItem(STORAGE_KEY);

if (savedTime) {
  player.setCurrentTime(savedTime);
}

function onTimeUpdate(event) {
  const currentTime = event.seconds;
  localStorage.setItem(STORAGE_KEY, currentTime);
}

function videoEnd() {
  localStorage.removeItem(STORAGE_KEY);
  console.log('Storage is deleted!');
}
