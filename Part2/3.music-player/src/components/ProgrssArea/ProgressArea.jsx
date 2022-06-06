import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from "react";
import "./ProgressArea.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { nextMusic, playMusic, stopMusic } from "../../store/musicPlayerReducer";

function ProgressArea(props, ref) {
  const audio = useRef();
  const progressBar = useRef();
  const dispatch = useDispatch();

  const { playList, currentIndex, repeat } = useSelector(state => ({
    playList: state.playList,
    currentIndex: state.currentIndex,
    repeat: state.repeat,
  }), shallowEqual);

  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
    changeVolume: (volume) => {
      audio.current.volume = volume;
    },
    resetDuration: () => {
      audio.current.currentTime = 0;
    },
  }));

  const onPlay = useCallback(() => {
    dispatch(playMusic());
  }, [dispatch]);

  const onPause = useCallback(() => {
    dispatch(stopMusic());
  }, [dispatch]);

  const onClickProgress = useCallback((event) => {
    const progressBarWidth = event.currentTarget.clientWidth;
    const offsetX = event.nativeEvent.offsetX;

    const duration = audio.current.duration;
    audio.current.currentTime = (offsetX / progressBarWidth) * duration;
  }, [])

  const getTime = useCallback((time) => {
    const minute = `0${parseInt(time / 60, 10)}`;
    const seconds = `0${parseInt(time % 60)}`;

    return `${minute}:${seconds.slice(-2)}`
  }, []);

  const onTimeUpdate = useCallback((event) => {
    if (event.target.readyState === 0) return;

    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    const progressBarWidth = (currentTime / duration) * 100;
    progressBar.current.style.width = `${progressBarWidth}%`;
    setCurrentTime(getTime(currentTime));
    setDuration(getTime(duration));
  }, [getTime]);

  const onEnded = useCallback(() => {
    if (repeat === 'ONE') {
      audio.current.currentTime = 0;
      audio.current.play();
    } else {
      dispatch(nextMusic());
    }
  }, [repeat, dispatch]);

  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio
          autoPlay
          ref={audio}
          src={playList[currentIndex].src}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        />
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default memo(forwardRef(ProgressArea));
