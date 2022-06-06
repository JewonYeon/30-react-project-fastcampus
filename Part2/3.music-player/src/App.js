import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgrssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";
import React, { useCallback, useRef, useState } from "react";

function App() {
  const audioRef = useRef();
  const [showPlayList, setShowPlayList] = useState(false);

  const onPlay = useCallback(() => {
    audioRef.current.play();
  }, []);

  const onPause = useCallback(() => {
    audioRef.current.pause();
  }, []);

  const onChangeVolume =useCallback((volume) => {
    audioRef.current.changeVolume(volume);
  }, []);

  const resetDuration = useCallback(() => {
    audioRef.current.resetDuration();
  }, []);

  return (
    <div className="App">
      <div className="container" >
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          play={onPlay}
          pause={onPause}
          changeVolume={onChangeVolume}
          resetDuration={resetDuration}
          setShowPlayList={setShowPlayList}
        />
        <PlayList
          showPlayList={showPlayList}
          setShowPlayList={setShowPlayList}
        />
      </div>
    </div>
  );
}

export default App;
