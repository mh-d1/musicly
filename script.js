const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("playBtn");

let songs = [
  {
    title: "afgan",
    artist: "Pixabay",
    src: "afgan.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "opalite",
    artist: "Pixabay",
    src: "opalite.mp3",
    cover: "cover2.jpg"
  },
  {
    title: "tulus",
    artist: "Pixabay",
    src: "tulus.mp3",
    cover: "cover2.jpg"
  },  
  {
    title: "kota ini",
    artist: "Pixabay",
    src: "kotaini.mp3",
    cover: "cover2.jpg" 
  },
  }
];

let currentIndex = 0;

/* RENDER */
function renderSongs(list = songs) {
  const container = document.getElementById("songList");
  container.innerHTML = "";

  list.forEach((song, i) => {
    container.innerHTML += `
      <div class="song" onclick="playSong(${i})">
        <img src="${song.cover}">
        <div>
          <div>${song.title}</div>
          <div>${song.artist}</div>
        </div>
      </div>
    `;
  });
}

renderSongs();

/* PLAY */
function playSong(index) {
  const song = songs[index];

  audio.src = song.src;
  audio.play();

  title.innerText = song.title;
  artist.innerText = song.artist;
  cover.src = song.cover;

  currentIndex = index;

  playBtn.innerHTML = '<i class="fa fa-pause"></i>';

  highlightActive(index);
}

/* HIGHLIGHT */
function highlightActive(index) {
  document.querySelectorAll(".song").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

/* CONTROL */
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
  }
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}

/* AUTO NEXT */
audio.addEventListener("ended", nextSong);

/* PROGRESS */
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* VOLUME */
volume.value = 0.5;
audio.volume = 0.5;

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

/* NAVIGATION */
function showPage(page) {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("searchPage").classList.add("hidden");
  document.getElementById("libraryPage").classList.add("hidden");

  document.getElementById(page + "Page").classList.remove("hidden");
}

/* SEARCH */
document.getElementById("searchInput").addEventListener("input", (e) => {
  let val = e.target.value.toLowerCase();

  let filtered = songs.filter(song =>
    song.title.toLowerCase().includes(val)
  );

  const container = document.getElementById("searchResults");
  container.innerHTML = "";

  filtered.forEach((song, i) => {
    container.innerHTML += `
      <div class="song" onclick="playSong(${i})">
        <img src="${song.cover}">
        <div>${song.title}</div>
      </div>
    `;
  });
});
