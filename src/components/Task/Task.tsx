import React, { useState } from "react";

import { TaskStatusType } from "../../store/state/state";
import { Timer } from "../Timer/Timer";

type TaskPropsType = {
  taskStatus: TaskStatusType;
  isDone: boolean;
  timestamp: number;
  title: string;
  taskId: string;
  timeToDone: {
    minutes: number,
    seconds: number,
  },
  changeTitle: (newTitle: string, taskId: string) => void;
  deleteTask: (taskId: string) => void;
  changeDoneStatus: (taskId: string) => void;
  changeEditMode: (taskId: string, newMode: TaskStatusType) => void;
  calculateTime: (time: Date) => string;
  stopTimer: (taskId: string) => void,
  playTimer: (taskId: string) => void,
};

export const Task: React.FC<TaskPropsType> = ({
  taskStatus = "inprogress",
  isDone = false,
  timestamp = Date.now(),
  title = "Random title",
  taskId = "taskIdSimple",
  changeTitle,
  deleteTask,
  timeToDone,
  changeDoneStatus,
  changeEditMode,
  calculateTime, playTimer, stopTimer,
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
  };
  const onKeyPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      if (event.currentTarget.value.trim()) {
        changeTitle(taskId, event.currentTarget.value);
      }
      changeEditMode(taskId, "inprogress");
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
          <span className="title">{title}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => playTimer(taskId)}></button>
            <button className="icon icon-pause" onClick={() => stopTimer(taskId)}></button>
            <Timer
              seconds={timeToDone.seconds}
              minutes={timeToDone.minutes}
            />
          </span>
          <span className="description">
            created {calculateTime(new Date(timestamp))} ago
          </span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => changeEditMode(taskId, "editing")}
        ></button>
        <button className="icon icon-destroy" onClick={() => deleteTask(taskId)}></button>
      </div>
      {taskStatus === "editing" ? (
        <input
          onChange={onChangeHandler}
          onKeyDown={(event) => onKeyPressEnter(event)}
          type="text"
          className="edit"
          value={newTitle}
          autoFocus
        />
      ) : (
        ""
      )}
    </li>
  );
};
