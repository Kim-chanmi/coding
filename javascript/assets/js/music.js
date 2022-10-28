const allMusic = [
  {
    name: "I Am Better Off",
    artist: "Wildson feat. LaKesha Nugent",
    img: "musicCover01",
    audio: "music_audio01",
  },
  {
    name: "Out Of Control",
    artist: "Cloria Tells",
    img: "musicCover02",
    audio: "music_audio02",
  },
  {
    name: "A Little Bit of Faith",
    artist: "Malena Stark feat. Mia Niles",
    img: "musicCover03",
    audio: "music_audio03",
  },
  {
    name: "For As Long As I Remember",
    artist: "Malena Stark",
    img: "musicCover04",
    audio: "music_audio04",
  },
  {
    name: "A One Way Ticket",
    artist: "Stonekeepers feat. Ed Mills",
    img: "musicCover05",
    audio: "music_audio05",
  },
  {
    name: "A Faded Photograph",
    artist: "Stonekeepers feat. Russell Vista",
    img: "musicCover06",
    audio: "music_audio06",
  },
  {
    name: "A Splash Of Paint",
    artist: "Elias Naslin feat. Paulina Froling",
    img: "musicCover07",
    audio: "music_audio07",
  },
  {
    name: "Baby Without You",
    artist: "Loving Caliber feat. Joe Leone",
    img: "musicCover08",
    audio: "music_audio08",
  },
  {
    name: "Balcony",
    artist: "Velvet Moon",
    img: "musicCover09",
    audio: "music_audio09",
  },
  {
    name: "Friendliest Time of Year",
    artist: "Wildson feat. Easton",
    img: "musicCover10",
    audio: "music_audio10",
  },
];

const musicBtn = document.querySelector(".icon5");
const musicWrap = document.querySelector(".music__wrap");
const musicClose = document.querySelector(".music_close");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3");
const MusicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");

// 버튼
const musicPlay = musicWrap.querySelector("#control-play");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicRepeat = musicWrap.querySelector("#control-repeat");

// 뮤직 리스트
const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");
const musicListCloseBtn = musicWrap.querySelector("#control-list-close");

// 바
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(
  ".progress .timer .current"
);
const musicProgressDuration = musicWrap.querySelector(
  ".progress .timer .duration"
);

let musicIndex = 1; // 현재 음악 인덱스

// 뮤직 듣기 버튼 클릭
musicBtn.addEventListener("click", () => {
  musicWrap.style.display = "block";
});

// 뮤직 플레이어 닫기
musicClose.addEventListener("click", () => {
  musicWrap.style.display = "none";
});

// 음악 재생
function loadMusic(num) {
  musicName.innerText = allMusic[num - 1].name; // 뮤직 이름 로드
  MusicArtist.innerText = allMusic[num - 1].artist; // 아티스트 로드
  musicView.src = `../assets/img/${allMusic[num - 1].img}.png`; // 이미지 로드
  musicView.alt = allMusic[num - 1].name; // 이미지 alt 로드
  musicAudio.src = `../assets/audio/${allMusic[num - 1].audio}.mp3`; // 뮤직 로드
}

// 재생 버튼을 누르면 음악이 재생되고, 정지 버튼으로 바뀌게
function playMusic() {
  musicWrap.classList.add("paused");
  musicPlay.setAttribute("id", "control-stop");
  musicPlay.setAttribute("title", "정지");
  musicPlay.setAttribute("class", "stop");
  musicAudio.play();
}

// 정지 버튼을 누르면 음악이 정지되고, 재생 버튼으로 바뀌게
function pauseMusic() {
  musicWrap.classList.remove("paused");
  musicPlay.setAttribute("id", "control-play");
  musicPlay.setAttribute("class", "play");
  musicAudio.pause();
}

// 이전 곡 버튼
function prevMusic() {
  musicIndex == 1 ? (musicIndex = allMusic.length) : musicIndex--;
  loadMusic(musicIndex); // 매개변수 전송
  playMusic();
  playListMusic();
}

// 다음 곡 버튼
function nextMusic() {
  musicIndex == allMusic.length ? (musicIndex = 1) : musicIndex++;
  loadMusic(musicIndex); // 매개변수 전송
  playMusic();
  playListMusic();
}

// 볼륨 조절
const audio = document.querySelector(".volume");
const audioVolume = document.querySelector(".volumeControl");

audioVolume.addEventListener("change", function (e) {
  musicAudio.volume = this.value / 100;
});

// 뮤직 진행바
musicAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime; // 음악 진행시간
  const duration = e.target.duration; // 오디오의 총 길이

  let progressWidth = (currentTime / duration) * 100; // 전체 길이에서 현재 진행되는 시간을 백분위로 나눔

  musicProgressBar.style.width = `${progressWidth}%`;

  // 전체 시간 : 오디오 이벤트 : 미디어의 현재 재생 위치에 있는 프레임이 로드를 완료하면 발생한다.
  musicAudio.addEventListener("loadeddata", () => {
    let audioDuration = musicAudio.duration;
    let totalMin = Math.floor(audioDuration / 60); // 전체 시간을 분 단위로 쪼갬
    let totalSec = Math.floor(audioDuration % 60); // 남은 초 저장
    if (totalSec < 10) totalSec = `0${totalSec}`; // 초가 10보다 작으면 0을 붙여서 두 자리수로 만들어줌 ex) 01, 02...
    musicProgressDuration.innerText = `${totalMin}:${totalSec}`; // 완성된 시간 문자열을 출력
  });

  // 진행 시간
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) currentSec = `0${currentSec}`;
  musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;
});

// 진행바 클릭
musicProgress.addEventListener("click", (e) => {
  // 보통 자기 자신을 가리킬 때 this.를 쓰지만 화살표 함수는 안됑
  let progressWidth = musicProgress.clientWidth; // 진행바 전체 길이
  let clickedOffsetX = e.offsetX; // 진행바 기준 측정되는 x 좌표값
  let songDuration = musicAudio.duration; // 오디오 전체 길이

  musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration; // 백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 재생값으로 바꿈
});

// 반복 버튼 클릭
musicRepeat.addEventListener("click", () => {
  let getAttr = musicRepeat.getAttribute("class");

  switch (getAttr) {
    case "repeat":
      musicRepeat.setAttribute("class", "repeat_one");
      musicRepeat.setAttribute("title", "한곡 반복");
      break;

    case "repeat_one":
      musicRepeat.setAttribute("class", "shuffle");
      musicRepeat.setAttribute("title", "랜덤 반복");
      break;

    case "shuffle":
      musicRepeat.setAttribute("class", "repeat");
      musicRepeat.setAttribute("title", "전체 반복");
      break;
  }
});

// 오디오가 끝났을 때의 이벤트 : ended
musicAudio.addEventListener("ended", () => {
  let getAttr = musicRepeat.getAttribute("class");

  switch (getAttr) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      playMusic();
      break;
    case "shuffle":
      let randomIndex = Math.floor(Math.random() * allMusic.length + 1); // 랜덤 인덱스 생성

      // while: 무조건 한 번은 실행 , do while: 조건에 맞을 때만 실행
      do {
        randomIndex = Math.floor(Math.random() * allMusic.length + 1);
      } while (musicIndex == randomIndex);
      musicIndex = randomIndex; // 현재 인덱스를 랜덤 인덱스로 변경
      loadMusic(musicIndex); // 랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드
      playMusic(); // 로드한 음악을 재생
      break;
  }
  playListMusic(); // 재생목록 업데이트
});

// 플레이 버튼 클릭
musicPlay.addEventListener("click", () => {
  const isMusicPaused = musicWrap.classList.contains("paused"); // 음악이 재생 중
  isMusicPaused ? pauseMusic() : playMusic();
  // 버튼을 클릭했을 때 musicWrap에 paused(멈춰있다) 클래스가 있는지 확인하고,
  // 있으면(멈춰있으면) 음악을 재생시키고, 없으면(재생중이면) 음악을 정지시킴
});

// 이전 곡 버튼 클릭
musicPrevBtn.addEventListener("click", () => {
  prevMusic();
});

// 다음 곡 버튼 클릭
musicNextBtn.addEventListener("click", () => {
  nextMusic();
});

// 뮤직 리스트 버튼 클릭
musicListBtn.addEventListener("click", () => {
  musicList.classList.add("show");
});

musicListCloseBtn.addEventListener("click", () => {
  musicList.classList.remove("show");
});

// 뮤직 리스트 구현하기
for (let i = 0; i < allMusic.length; i++) {
  let li = `
        <li data-index="${i + 1}">
            <strong>${allMusic[i].name}</strong>
            <em>${allMusic[i].artist}</em>
            <audio class="${allMusic[i].audio}" src="../assets/audio/${
    allMusic[i].audio
  }.mp3"></audio>
            <span class="audio-duration" id="${
              allMusic[i].audio
            }">재생시간</span>
        </li>
    `;

  // 해석하는 방법에 차이가 있음
  // musicListUl.innerHTML += li; 이렇게 하면 마지막곡만 재생시간 나옴
  // +를 쓰면 값을 하나로 인식해서 마지막 값만 알아먹음
  musicListUl.insertAdjacentHTML("beforeend", li); // 이렇게 해야 다 나옴!! 누적됨!!
  // insertAdjacentHTML
  // beforeend : element 안에 가장 마지막 child

  // 리스트에 재생 시간 불러오기
  let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`); // 리스트에서 시간을 표시할 선택자를 가져옴
  let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`); // 리스트에서 오디오를 가져옴
  liAudio.addEventListener("loadeddata", () => {
    let audioDuration = liAudio.duration; // 오디오 전체 길이
    let totalMin = Math.floor(audioDuration / 60); // 전체 길이를 분 단위로 쪼갬
    let totalSec = Math.floor(audioDuration % 60); // 초
    if (totalSec < 10) totalSec = `0${totalSec}`; // 초 앞 자리에 0 추가
    liAudioDuration.innerText = `${totalMin}:${totalSec}`; // 문자열 출력
    liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`); // 속성에 오디오 길이 기록
  });
}

// 리스트를 클릭하면 음악 재생 : 을 위한 준비(클릭하면 clicked함수가 실행되게끔)
function playListMusic() {
  const musicListAll = musicListUl.querySelectorAll("li"); // 뮤직 리스트 목록
  for (let i = 0; i < musicListAll.length; i++) {
    let audioTag = musicListAll[i].querySelector(".audio-duration");

    // 클릭하면 playing
    if (musicListAll[i].classList.contains("playing")) {
      musicListAll[i].classList.remove("playing"); // 클래스가 존재하면 삭제
      let adDuration = audioTag.getAttribute("data-duration"); // 오디오 길이값 가져오기
      audioTag.innerText = adDuration; // 오디오 길이값 출력
    }

    if (musicListAll[i].getAttribute("data-index") == musicIndex) {
      // 현재 뮤직 인덱스와 리스트 인덱스 값이 같으면
      musicListAll[i].classList.add("playing"); // 클래스 playing 추가
      audioTag.innerText = "Playing"; // 재생중인 음악에 멘트 추가
    }

    musicListAll[i].setAttribute("onclick", "clicked(this)");
  }
}

// 리스트를 클릭하면 음악 재생
function clicked(el) {
  let getLiIndex = el.getAttribute("data-index"); // 클릭한 리스트의 인덱스값 저장
  musicIndex = getLiIndex; // 클릭한 인덱스값을 뮤직 인덱스에 저장
  loadMusic(musicIndex); // 해당 인덱스 뮤직을 로드
  playMusic(); // 음악 재생
  playListMusic(); // 음악 리스트 업데이트
}

window.addEventListener("load", () => {
  loadMusic(musicIndex); // 음악 재생
  playListMusic(); // 리스트 초기화(리스트를 클릭하면 음악 재생)
});
