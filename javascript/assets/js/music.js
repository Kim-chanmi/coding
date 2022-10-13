const allMusic = [
    {
        name : "summer solstice on the june planet",
        artist: "bail bonds",
        img: "musicCover01",
        audio: "music_audio01"
    },
    {
        name : "swimming lessons",
        artist: "bail bonds",
        img: "musicCover02",
        audio: "music_audio02"
    },
    {
        name : "GEMNI",
        artist: "halfcool",
        img: "musicCover03",
        audio: "music_audio03"
    },
    {
        name : "HEY THERE",
        artist: "halfcool",
        img: "musicCover04",
        audio: "music_audio04"
    },
    {
        name : "Keep On Movin Visualizer",
        artist: "King Canyon",
        img: "musicCover05",
        audio: "music_audio05"
    },
    {
        name : "THIS CLOSE",
        artist: "halfcool",
        img: "musicCover06",
        audio: "music_audio06"
    },
    {
        name : "Baby We Did It",
        artist: "The Whole Other",
        img: "musicCover07",
        audio: "music_audio07"
    },
    {
        name : "Breakfast Alone",
        artist: "The Whole Other",
        img: "musicCover08",
        audio: "music_audio08"
    },
    {
        name : "8Bit Dreamscape",
        artist: "The Whole Other",
        img: "musicCover09",
        audio: "music_audio09"
    },
    {
        name : "Beyond the Lows",
        artist: "The Whole Other",
        img: "musicCover10",
        audio: "music_audio10"
    },
]

const musicWrap = document.querySelector(".music__wrap");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3");
const musicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");
const musicPlay = musicWrap.querySelector("#control-play");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuration = musicWrap.querySelector(".progress .timer .duration");
const musicRepeat = musicWrap.querySelector("#control-repeat");
const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");
const musicListClose = musicWrap.querySelector(".music__list .close");
const musicListOpen = musicWrap.querySelector(".music__list .close.open");


let musicIndex = 1; // 현재 음악 인덱스

// 음악 재생
function loadMusic(num){
    musicName.innerText = allMusic[num-1].name;                          // 뮤직 이름 로드
    musicArtist.innerText = allMusic[num-1].artist;                     // 뮤직 아티스트 
    musicView.src = `../assets/img/${allMusic[num-1].img}.png`          // 뮤직 이미지
    musicView.alt = allMusic[num-1].name                                // 뮤직 이미지 alt
    musicAudio.src = `../assets/audio/${allMusic[num-1].audio}.mp3`;    // 뮤직
}

// 재생 버튼
function playMusic(){
    musicWrap.classList.add("paused")  //플레이가 되고 있는지 확인하기 위해
    musicPlay.setAttribute("title", "정지");    //속성 바꾸기
    musicPlay.setAttribute("class", "stop");
    musicAudio.play();
}

// 정지 버튼
function pauseMusic(){
    musicWrap.classList.remove("paused")
    musicPlay.setAttribute("title", "재생");
    musicPlay.setAttribute("class", "play");
    musicAudio.pause();
}

// 이전 곡 듣기 버튼
function prevMsic(){
    //musicIndex --
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;  // 첫 곡일때
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}

// 다음 곡 듣기 버튼
function nextMusic(){
    //musicIndex ++
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}




// 뮤직 진행바
musicAudio.addEventListener("timeupdate", e => {
    // console.log(e)

    const currentTime = e.target.currentTime;   // 현재 재생되는 시간 가져오기
    // console.log(currentTime)  플레이버튼 눌러서 시간 점점 증가하는거 확인 => 초단위
    const duration = e.target.duration; //오디오의 총 길이
    let progressWidth = (currentTime/duration) * 100;   //전체 길이에서 현재 진행되는 시간을 백분위로 나눔

    musicProgressBar.style.width = `${progressWidth}%`;

    //전체시간
    musicAudio.addEventListener("loadeddata", () => {
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration/60);    //전체 시간/60 => 전체시간이 초단위로 나온 것을 분단위로
        let totalSec = Math.floor(audioDuration % 60);  //남은 초 저장
        if(totalSec < 10 ) totalSec = `0${totalSec}`;   //초가 한자리 수일때, 십단위까지 나오게. 01초, 02초 ...
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`;    //완성된 시간 문자열 출력
    })

    // 진행시간
    let currentMin = Math.floor(currentTime / 60 );
    let currentSec = Math.floor(currentTime % 60 ); //초
    if(currentSec < 10) currentSec = `0${currentSec}`;  
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;

});

// 진행버튼 클릭(진행바 특정 부분 클릭하면 음악 구간 이동)
musicProgress.addEventListener("click", (e) => {
    let progressWidth = musicProgress.clientWidth;  //진행바 전체 길이
    let clickedOffsetX = e.offsetX; //진행바 기준으로 측정되는 X좌표 => offsetX는 부모기준
    let songDuration = musicAudio.duration; //오디오 전체 길이

    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;   //백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 재생값으로 바꾸어줌
})



// 반복 버튼 클릭
musicRepeat.addEventListener("click", () => {
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" :     
            musicRepeat.setAttribute("class", "repeat_one");    // 전체 반복일 때 클릭하면 한 곡 반복으로 바뀌고
            musicRepeat.setAttribute("title", "한 곡 반복");
        break;
        case "repeat_one":
            musicRepeat.setAttribute("class", "shuffle");       // 한 곡 반복일 때 클릭하면 랜덤 반복으로 바뀌고
            musicRepeat.setAttribute("title", "랜덤 반복");
        break;
        case "shuffle" :
            musicRepeat.setAttribute("class", "repeat");        // 랜덤 반복일 때 클릭하면 전체 반복으로 바꾸기
            musicRepeat.setAttribute("title", "전체 반복");
        break;
    }
});

// 오디오가 끝나면
musicAudio.addEventListener("ended", () => {
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" : // 전체 반복에서는 다음 음악으로
            nextMusic();
        break;

        case "repeat_one" : // 한 곡 반복은 한 곡만 반복되게
            playMusic();
        break;

        case "shuffle" :    // 랜덤 재생 오디오가 끝나면 다음 곡은 랜덤으로 재생
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1)  // 랜덤 인덱스 생성

            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1)
            } while (musicIndex == randomIndex)
            musicIndex = randomIndex;   // 현재 인덱스를 랜덤 인덱스로 변경
            loadMusic(musicIndex);      // 랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드
            playMusic();                // 로드한 음악을 재생
        break;
    }
    playListMusic();    // 재생목록 업데이트
})

// 플레이 버튼 클릭
musicPlay.addEventListener("click", () => {
    const isMusicPaused = musicWrap.classList.contains("paused");   // 변수에게 paused 클래스가 있는지 확인 -> 있으면 음악이 재생중이라는 뜻
    isMusicPaused ? pauseMusic() : playMusic();
});

// 이전 버튼 클릭
musicPrevBtn.addEventListener("click", () => {
    prevMsic();
});

// 다음곡 버튼 클릭
musicNextBtn.addEventListener("click", () => {
    nextMusic();
});

// 뮤직 리스트 버튼 클릭
musicListBtn.addEventListener("click", () => {
    // musicList.classList.add("show");
    musicList.style.display = "block";
});

// 뮤직 리스트 닫기
musicListClose.addEventListener("click", e => {
    musicList.style.display = "none";
})


// 뮤직 리스트 구현하기
for(let i=0; i<allMusic.length; i++){
    let li = `
    <li data-index="${i+1}">
        <strong>${allMusic[i].name}</strong>
        <em>${allMusic[i].artist}</em>
        <audio class="${allMusic[i].audio}" src="../assets/audio/${allMusic[i].audio}.mp3"></audio>
        <span class="audio-duration" id="${allMusic[i].audio}">재생시간</span>
    </li>
    `;

    // musicListUl.innerHTML += li; // 한 번에 넣음
    musicListUl.insertAdjacentHTML("beforeend", li);    // 로딩 후 마지막에 인식


    // 리스트에 음악 시간 불러오기
    let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`);   // 리스트에서 시간을 표시할 선택자 가져오기
    let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);       // 리스트에서 오디오 가져오기
    liAudio.addEventListener("loadeddata", () => {
        let audioDuration = liAudio.duration;   // 오디오 전체 길이
        let totalMin = Math.floor(audioDuration / 60);  // 전체 길이를 분 단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60);  // 초 계산
      if(totalSec < 10) totalSec = `0${totalSec}`;       // 앞자리에 0 추가
      liAudioDuration.innerText = `${totalMin}:${totalSec}`;    // 문자열 출력
      liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`); // 속성에 오디오 길이 기록
    });
}

// 뮤직 리스트 클릭하면 재생
function playListMusic(){
    const musicListAll = musicListUl.querySelectorAll("li");    // 뮤직 리스트

    for(let i=0; i<musicListAll.length; i++){
        let audioTag = musicListAll[i].querySelector(".audio-duration");    // 작동 시간

        if(musicListAll[i].classList.contains("playing")){
            musicListAll[i].classList.remove("playing");        // 클래스가 존재하면 삭제
            let adDuration = audioTag.getAttribute("data-duration");    // 오디오 길이 값 가져오기
            audioTag.innerText = adDuration;        // 오디오 길이 값 출력
        }

        if(musicListAll[i].getAttribute("data-index") == musicIndex){   //data-index와 musicindex가 같으면 현재 재생되고 있다는 뜻
            musicListAll[i].classList.add("playing");   // 클래스 playing 추가
            audioTag.innerText = "재생중";      // 재생중일 경우 재생중이라고 표시
        }

        musicListAll[i].setAttribute("onclick",  "clicked(this)");  // this는 첫 번째 자기 자신을 인식
    }
}
   

// 뮤직 리스트를 클릭하면
function clicked(el){
    let getLiIndex = el.getAttribute("data-index"); // 클릭한 리스트의 인덱스값을 저장
    musicIndex = getLiIndex;                        // 클릭한 인덱스 값을 뮤직 인덱스에 저장
    loadMusic(musicIndex);                          // 해당 인덱스 뮤직으로 로드
    playMusic();                                    // 음악 재생
    playListMusic();                                // 음악 리스트 업데이트
}


window.addEventListener("load", () => {
loadMusic(musicIndex);      // 음악 재생
    playListMusic();        // 리스트 초기화
    playMusic();    
    musicList.style.display = "none";
});
