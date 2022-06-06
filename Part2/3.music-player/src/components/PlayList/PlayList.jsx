import React, { memo, useCallback } from 'react';
import QueueMusic from '@mui/icons-material/QueueMusic';
import Close from '@mui/icons-material/Close';
import PlayListItem from './PlayListItem';
import classNames from 'classnames';
import './PlayList.scss';
import SortableList from '@jewon-yeon/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIndex, updatePlayList } from '../../store/musicPlayerReducer';

const PlayList = ({ showPlayList, setShowPlayList }) => {
  const playList = useSelector(state => state.playList);
  const dispatch = useDispatch();

  const onClickClosePlayList = useCallback(() => {
    setShowPlayList(false);
  }, [setShowPlayList]);

  const renderItem = useCallback((item, index) => (
    <PlayListItem item={item} index={index} />
  ), []);

  const onClickItem = useCallback((index) => {
    dispatch(setCurrentIndex(index));
  }, [dispatch]);

  const onDropItem = useCallback((newPlayList) => {
    dispatch(updatePlayList(newPlayList));
  }, [dispatch]);

  return (
    <div className={classNames('play-list', { 'show': showPlayList })}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: 'pointer' }}
          onClick={onClickClosePlayList}
        />
      </div>
      <SortableList
        data={playList}
        renderItem={renderItem}
        onClickItem={onClickItem}
        onDropItem={onDropItem}
      />
    </div>
  );
};

export default memo(PlayList);
