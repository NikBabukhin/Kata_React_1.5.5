import './index.css';
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { NewTaskForm } from './components/NewTaskForm/NewTaskForm';
import { Footer } from './components/Footer/Footer';
import { TaskList } from './components/TaskList/TaskList';
import {
  TaskStatusType,
  FilterOptionType,
  AppStateType,
  TaskType,
  task1,
  task2,
  task3,
  task4,
} from './store/state/state';

export const appState: AppStateType = {
  tasks: [task4, task1, task2, task3],
  filter: {
    currentOption: 'all',
  },
  newTitle: {
    placeholder: 'What needs to be done?',
    autofocus: true,
    initialValue: '',
    isError: false,
  },
};

export const App: React.FC = () => {
  const [state, setState] = useState<AppStateType>(appState);

  const countTime = (timeToDone: { seconds: number; minutes: number }) => {
    if (timeToDone.seconds !== 0) {
      --timeToDone.seconds;
    } else if (timeToDone.seconds === 0 && timeToDone.minutes > 0) {
      --timeToDone.minutes;
      timeToDone.seconds = 59;
    }
    return timeToDone;
  };

  useEffect(() => {
    setInterval(() => {
      setState((state) => ({
        ...state,
        tasks: state.tasks.map((task) => {
          if (!task.isPaused) {
            task.timeToDone = countTime({
              minutes: task.timeToDone.minutes,
              seconds: task.timeToDone.seconds,
            });
          }
          return task;
        }),
      }));
    }, 1000);
  }, []);

  const todoActions = {
    addNewTask: (newTitle: string, minutes: number, seconds: number, date: number) => {
      const newTask: TaskType = {
        taskId: `task${state.tasks.length}${newTitle.trim()}`,
        isDone: false,
        title: newTitle,
        taskStatus: 'inprogress',
        timestamp: date,
        timeToDone: {
          seconds: seconds,
          minutes: minutes,
        },
        isPaused: true,
        unmountTime: Date.now(),
      };
      const newState = { ...state, tasks: [...state.tasks, newTask] };
      setState(newState);
    },
    deleteTask: (taskId: string) => {
      const newState = {
        ...state,
        tasks: state.tasks.filter((task) => task.taskId !== taskId),
      };
      setState(newState);
    },
    changeDoneStatus: (taskId: string) => {
      const newState = {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.taskId === taskId) {
            task.isDone = !task.isDone;
            task.taskStatus = task.isDone ? 'completed' : 'inprogress';
            task.isPaused = true;
          }
          return task;
        }),
      };
      setState(newState);
    },
    changeEditMode: (taskId: string, newMode: TaskStatusType) => {
      const newState = {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.taskId === taskId) {
            task.taskStatus = newMode;
          }
          return task;
        }),
      };
      setState(newState);
    },
    changeTitle: (taskId: string, newTitle: string) => {
      const newState = {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.taskId === taskId) {
            task.title = newTitle;
          }
          return task;
        }),
      };
      setState(newState);
    },
    playTimer: (taskId: string) => {
      const newState = {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.taskId === taskId) {
            task.isPaused = false;
          }
          return task;
        }),
      };
      setState(newState);
    },
    stopTimer: (taskId: string) => {
      const newState = {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.taskId === taskId) {
            task.isPaused = true;
          }
          return task;
        }),
      };
      setState(newState);
    },
  };

  const changeError = (isNowError: boolean) => {
    const newState = {
      ...state,
      newTitle: {
        ...state.newTitle,
        isError: isNowError,
        placeholder: isNowError ? 'Title is required' : 'What needs to be done?',
      },
    };
    setState(newState);
  };
  const changeFilter = (newFilter: FilterOptionType) => {
    const newState = { ...state, filter: { currentOption: newFilter } };
    setState(newState);
  };
  const filteredTasks = () => {
    return state.tasks.filter((task) => {
      if (state.filter.currentOption === 'inprogress') {
        return !task.isDone;
      } else if (state.filter.currentOption === 'completed') {
        return task.isDone;
      } else {
        return true;
      }
    });
  };
  const clearCompleted = () => {
    const newState = { ...state, tasks: state.tasks.filter((task) => !task.isDone) };
    setState(newState);
  };
  const calculateTime = (timestamp: Date) => formatDistanceToNow(timestamp);

  const tasksForShow = filteredTasks();

  return (
    <>
      <NewTaskForm
        addNewTask={todoActions.addNewTask}
        changeError={changeError}
        placeholder={state.newTitle.placeholder}
        initialvalue={state.newTitle.initialValue}
        isError={state.newTitle.isError}
        autofocus={state.newTitle.autofocus}
      />

      <TaskList
        calculateTime={calculateTime}
        changeTitle={todoActions.changeTitle}
        changeEditMode={todoActions.changeEditMode}
        stopTimer={todoActions.stopTimer}
        playTimer={todoActions.playTimer}
        tasks={tasksForShow}
        deleteTask={todoActions.deleteTask}
        changeDoneStatus={todoActions.changeDoneStatus}
      />

      <Footer
        clearCompleted={clearCompleted}
        changeFilter={changeFilter}
        currentOption={state.filter.currentOption}
        currentActive={state.tasks.filter((task) => !task.isDone).length}
      />
    </>
  );
};
