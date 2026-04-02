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
    artist: "unknown",
    src: "assets/afgan.mp3",
    cover: "assets/afgan.jpg",
    liked: false
  },
  {
    title: "kota ini tak sama tanpa mu",
    artist: "unknown",
    src: "assets/kotaini.mp3",
    cover: "assets/nadhif.jpg",
    liked: false
  }, 
  {
    title: "taylor swift",
    artist: "unknown",
    src: "assets/opalite.mp3",
    cover: "assets/opalite.jpg",
    liked: false
  },
  {
    title: "tulus",
    artist: "unknown",
    src: "assets/tulus.mp3",
    cover: "assets/tulus.jpg",
    liked: false
  },
  {
    title: "teenagers mcr",
    artist: "unknown",
    src: "assets/teenagers.mp3",
    cover: "assets/teenagers.jpg",
    liked: false
  },
  {
    title: "about you",
    artist: "unknown",
    src: "assets/afgan.mp3",
    cover: "assets/aboutyou.jpg",
    liked: false
  },
];
  

let playlists = [];
let currentIndex = 0;

/* RENDER SONG */
function renderSongs(list = songs, containerId = "songList") {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  list.forEach((song, i) => {
    container.innerHTML += `
      <div class="song" onclick="playSong(${i})">
        <img src="${song.cover}">
        
        <div class="song-info">
          <div>${song.title}</div>
          <div style="font-size:12px;color:gray">${song.artist}</div>
        </div>

        <div class="actions">
          <span class="like-btn" onclick="toggleLike(event, ${i})">
            ${song.liked ? "❤️" : "🤍"}
          </span>
          <span class="add-btn" onclick="addToPlaylist(event, ${i})">➕</span>
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

/* LIKE */
function toggleLike(e, index) {
  e.stopPropagation();
  songs[index].liked = !songs[index].liked;
  renderSongs();
}

/* LIBRARY */
function renderLibrary() {
  let liked = songs.filter(s => s.liked);
  renderSongs(liked, "likedList");
  renderPlaylists();
}

/* PLAYLIST */
function createPlaylist() {
  let name = prompt("Nama playlist?");
  if (!name) return;

  playlists.push({ name: name, songs: [] });
  renderPlaylists();
}

function renderPlaylists() {
  const container = document.getElementById("playlistContainer");
  container.innerHTML = "";

  playlists.forEach((pl, i) => {
    container.innerHTML += `
      <div class="song">
        <div>${pl.name}</div>
      </div>
    `;
  });
}

function addToPlaylist(e, index) {
  e.stopPropagation();

  if (playlists.length === 0) {
    alert("Buat playlist dulu!");
    return;
  }

  let i = prompt("Pilih playlist index (0,1,2)");
  if (playlists[i]) {
    playlists[i].songs.push(songs[index]);
    alert("Ditambahkan!");
  }
}

/* NAVIGATION */
function showPage(page) {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("searchPage").classList.add("hidden");
  document.getElementById("libraryPage").classList.add("hidden");

  document.getElementById(page + "Page").classList.remove("hidden");

  if (page === "library") renderLibrary();
}

/* SEARCH */
document.getElementById("searchInput").addEventListener("input", (e) => {
  let val = e.target.value.toLowerCase();

  let filtered = songs.filter(song =>
    song.title.toLowerCase().includes(val) ||
    song.artist.toLowerCase().includes(val)
  );

  renderSongs(filtered, "searchResults");
});

/* UPLOAD */
document.getElementById("upload").addEventListener("change", function(e) {
  const file = e.target.files[0];

  if (file) {
    let url = URL.createObjectURL(file);

    songs.push({
      title: file.name,
      artist: "Local",
      src: url,
      cover: "assets/cover1.jpg",
      liked: false
    });

    renderSongs();
  }
});
