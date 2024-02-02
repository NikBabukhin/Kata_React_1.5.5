import React, { useState } from 'react';

import { TaskStatusType } from '../../store/state/state';

type TaskPropsType = {
  taskStatus: TaskStatusType;
  isDone: boolean;
  timestamp: number;
  title: string;
  taskId: string;
  changeTitle: (newTitle: string, taskId: string) => void;
  deleteTask: (taskId: string) => void;
  changeDoneStatus: (taskId: string) => void;
  changeEditMode: (taskId: string, newMode: TaskStatusType) => void;
  calculateTime: (time: Date) => string;
};

export const Task: React.FC<TaskPropsType> = ({
  taskStatus = 'inprogress',
  isDone = false,
  timestamp = Date.now(),
  title = 'Random title',
  taskId = 'taskIdSimple',
  changeTitle,
  deleteTask,
  changeDoneStatus,
  changeEditMode,
  calculateTime,
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
  };

  const onKeyPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      if (event.currentTarget.value.trim()) {
        changeTitle(taskId, event.currentTarget.value);
      }
      changeEditMode(taskId, 'inprogress');
      setNewTitle(title);
    }
  };

  const onChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeDoneStatus(taskId);
    setIsChecked(event.currentTarget.checked);
  };

  const [isChecked, setIsChecked] = useState<boolean>(isDone);
  const [newTitle, setNewTitle] = useState<string>(title);

  return (
    <li className={taskStatus}>
      <div className="view">
        <input
          onChange={onChangeCheck}
          checked={isChecked}
          className="toggle"
          type="checkbox"
        />
        <label>
          <span className="description">{title}</span>
          <span className="created">
            created {calculateTime(new Date(timestamp))} ago
          </span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => changeEditMode(taskId, 'editing')}
        ></button>
        <button className="icon icon-destroy" onClick={() => deleteTask(taskId)}></button>
      </div>
      {taskStatus === 'editing' ? (
        <input
          onChange={onChangeHandler}
          onKeyDown={(event) => onKeyPressEnter(event)}
          type="text"
          className="edit"
          value={newTitle}
          autoFocus
        />
      ) : (
        ''
      )}
    </li>
  );
};
