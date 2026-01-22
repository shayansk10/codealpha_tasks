const songs = [
  { title: "Sapphire", artist: "Ed Sheeran", src: "songs/song1.mp3", cover: "images/cover1.jpg" },
  { title: "Baby", artist: "Justin Bieber", src: "songs/song2.mp3", cover: "images/cover2.jpg" },
  { title: "Blinding Lights", artist: "The Weeknd", src: "songs/song3.mp3", cover: "images/cover3.jpg" }
];

let index = 0;
let isPlay = false;

const audio = new Audio();

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const coverImg = document.getElementById("coverImg");
const fill = document.getElementById("fill");
const bar = document.getElementById("bar");
const current = document.getElementById("current");
const total = document.getElementById("total");

const playBtn = document.getElementById("play");
const icon = document.getElementById("icon");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const volBar = document.getElementById("volBar");
const volFill = document.getElementById("volFill");

const playlist = document.getElementById("playlist");

function loadSong(i) {
  audio.src = songs[i].src;
  title.innerText = songs[i].title;
  artist.innerText = songs[i].artist;
  coverImg.src = songs[i].cover;
  fill.style.width = "0%";
  current.innerText = "0:00";
  total.innerText = "0:00";
}

function playSong() {
  audio.play();
  isPlay = true;
  icon.className = "fa fa-pause";
  cover.classList.add("playing");
}
function pauseSong() {
  audio.pause();
  isPlay = false;
  icon.className = "fa fa-play";
  cover.classList.remove("playing");
}

playBtn.onclick = () => { isPlay ? pauseSong() : playSong() }

next.onclick = () => {
  index = (index + 1) % songs.length;
  loadSong(index); playSong(); setActive();
}
prev.onclick = () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index); playSong(); setActive();
}

audio.addEventListener("timeupdate", () => {
  const p = (audio.currentTime / audio.duration) * 100;
  fill.style.width = p + "%";
  current.innerText = format(audio.currentTime);
  total.innerText = format(audio.duration);
});

audio.addEventListener("ended", () => {
  index = (index + 1) % songs.length;
  loadSong(index);
  playSong();
  setActive();
});


function format(t) {
  if (!t) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return m + ":" + (s < 10 ? "0" + s : s);
}

function showPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((s, i) => {
    const d = document.createElement("div");
    d.className = "song" + (i === index ? " active" : "");
    d.innerHTML = `<img src="${s.cover}"><div>${s.title}<br><small>${s.artist}</small></div>`;
    d.onclick = () => { index = i; loadSong(i); playSong(); setActive(); }
    playlist.appendChild(d);
  });
}
function setActive() {
  document.querySelectorAll(".song").forEach((s, i) => {
    s.classList.toggle("active", i === index);
  });
}

loadSong(index);
showPlaylist();
audio.volume = 0.7;
volFill.style.width = "70%";

let draggingVol = false;

function setVolume(e){
  const rect = volBar.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let v = (clientX - rect.left) / rect.width;
  v = Math.max(0, Math.min(1, v));
  audio.volume = v;
  volFill.style.width = (v * 100) + "%";
}

volBar.addEventListener("mousedown", e => { draggingVol = true; setVolume(e); });
document.addEventListener("mousemove", e => draggingVol && setVolume(e));
document.addEventListener("mouseup", () => draggingVol = false);

volBar.addEventListener("touchstart", e => { draggingVol = true; setVolume(e); });
document.addEventListener("touchmove", e => draggingVol && setVolume(e));
document.addEventListener("touchend", () => draggingVol = false);

let draggingSeek = false;

function setSeek(e){
  const rect = bar.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let p = (clientX - rect.left) / rect.width;
  p = Math.max(0, Math.min(1, p));
  audio.currentTime = p * audio.duration;
}

bar.addEventListener("mousedown", e => { draggingSeek = true; setSeek(e); });
document.addEventListener("mousemove", e => draggingSeek && setSeek(e));
document.addEventListener("mouseup", () => draggingSeek = false);

bar.addEventListener("touchstart", e => { draggingSeek = true; setSeek(e); });
document.addEventListener("touchmove", e => draggingSeek && setSeek(e));
document.addEventListener("touchend", () => draggingSeek = false);
