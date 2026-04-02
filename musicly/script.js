const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const nowPlaying = document.getElementById("nowPlaying");
const artistName = document.getElementById("artistName");
const playerCover = document.getElementById("playerCover");
const playBtn = document.getElementById("playBtn");
const songList = document.getElementById("songList");

let songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "song1.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "song2.mp3",
    cover: "cover2.jpg"
  }
];

let currentIndex = 0;

/* Render list */
function renderSongs() {
  songList.innerHTML = "";

  songs.forEach((song, index) => {
    songList.innerHTML += `
      <div class="song" onclick="playSong(${index})">
        <img src="${song.cover}" class="cover">
        <div>
          <div class="title">${song.title}</div>
          <div class="artist">${song.artist}</div>
        </div>
      </div>
    `;
  });
}

renderSongs();

/* Play song */
function playSong(index) {
  const song = songs[index];

  audio.src = song.src;
  audio.play();

  nowPlaying.innerText = song.title;
  artistName.innerText = song.artist;
  playerCover.src = song.cover;

  currentIndex = index;

  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
}

/* Toggle */
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
  }
}

/* Next */
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
}

/* Prev */
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}

/* Auto next */
audio.addEventListener("ended", nextSong);

/* Progress update */
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

/* Seek */
progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});