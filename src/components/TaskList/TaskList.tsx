import React from "react";

import { Task } from "../Task/Task";
import { TaskType, TaskStatusType } from "../../store/state/state";

type TaskListPropsType = {
  tasks: TaskType[];
  changeTitle: (newTitle: string, taskId: string) => void;
  deleteTask: (taskId: string) => void;
  changeDoneStatus: (taskId: string) => void;
  changeEditMode: (taskId: string, newMode: TaskStatusType) => void;
  calculateTime: (time: Date) => string;
  stopTimer: (taskId: string) => void,
  playTimer: (taskId: string) => void,
};

export const TaskList: React.FC<TaskListPropsType> = ({
  tasks, deleteTask, changeDoneStatus, changeEditMode,
  changeTitle, calculateTime, stopTimer, playTimer
}) => {

  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return (
          <Task
            key={task.taskId + task.title}
            taskStatus={task.taskStatus}
            isDone={task.isDone}
            timestamp={task.timestamp}
            title={task.title}
            taskId={task.taskId}
            timeToDone={task.timeToDone}
            stopTimer={stopTimer}
            playTimer={playTimer}
            deleteTask={deleteTask}
            calculateTime={calculateTime}
            changeDoneStatus={changeDoneStatus}
            changeEditMode={changeEditMode}
            changeTitle={changeTitle}
          />
        );
      })}
    </ul>
  );
};
