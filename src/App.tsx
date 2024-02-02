import './index.css';
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { NewTaskForm } from './components/NewTaskForm/NewTaskForm';
import { Footer } from './components/Footer/Footer';
import { TaskList } from './components/TaskList/TaskList';
import {
  state,
  TaskStatusType,
  FilterOptionType,
  AppStateType,
  TaskType,
} from './store/state/state';

export const App: React.FC = () => {
  const [appState, setAppState] = useState<AppStateType>(state);

  const todoActions = {
    addNewTask: (newValue: string) => {
      const newTask: TaskType = {
        taskId: `task${appState.tasks.length}${newValue.trim()}`,
        isDone: false,
        title: newValue,
        taskStatus: 'inprogress',
        timestamp: Date.now(),
      };
      const newState = { ...appState, tasks: [...appState.tasks, newTask] };
      setAppState(newState);
    },
    deleteTask: (taskId: string) => {
      setAppState({
        ...appState,
        tasks: appState.tasks.filter((task) => task.taskId !== taskId),
      });
    },

    changeDoneStatus: (taskId: string) => {
      setAppState({
        ...appState,
        tasks: appState.tasks.map((task) => {
          if (task.taskId === taskId) {
            task.isDone = !task.isDone;
            task.taskStatus = task.isDone ? 'completed' : 'inprogress';
          }
          return task;
        }),
      });
    },

    changeEditMode: (taskId: string, newMode: TaskStatusType) => {
      const newState = {
        ...appState,
        tasks: appState.tasks.map((task) => {
          if (task.taskId === taskId) {
            task.taskStatus = newMode;
          }
          return task;
        }),
      };
      setAppState(newState);
    },

    changeTitle: (taskId: string, newTitle: string) => {
      setAppState({
        ...appState,
        tasks: appState.tasks.map((task) => {
          if (task.taskId === taskId) {
            task.title = newTitle;
          }
          return task;
        }),
      });
    },
  };

  const changeError = (isNowError: boolean) => {
    setAppState({
      ...appState,
      newTitle: {
        ...appState.newTitle,
        isError: isNowError,
        placeholder: isNowError ? 'Title is required' : 'What needs to be done?',
      },
    });
  };

  const changeFilter = (newFilter: FilterOptionType) => {
    setAppState({ ...appState, filter: { currentOption: newFilter } });
  };

  const filteredTasks = () => {
    return appState.tasks.filter((task) => {
      if (appState.filter.currentOption === 'inprogress') {
        return task.isDone === false;
      } else if (appState.filter.currentOption === 'completed') {
        return task.isDone === true;
      } else {
        return true;
      }
    });
  };

  const clearCompleted = () => {
    setAppState({ ...appState, tasks: appState.tasks.filter((task) => !task.isDone) });
  };

  const calculateTime = (timestamp: Date) => formatDistanceToNow(timestamp);

  const tasksForShow = filteredTasks();

  const testingVariable = 34;

  return (
    <>
      <NewTaskForm
        addNewTask={todoActions.addNewTask}
        changeError={changeError}
        placeholder={appState.newTitle.placeholder}
        initialvalue={appState.newTitle.initialValue}
        isError={appState.newTitle.isError}
        autofocus={appState.newTitle.autofocus}
      />

      <TaskList
        calculateTime={calculateTime}
        changeTitle={todoActions.changeTitle}
        changeEditMode={todoActions.changeEditMode}
        tasks={tasksForShow}
        deleteTask={todoActions.deleteTask}
        changeDoneStatus={todoActions.changeDoneStatus}
      />

      <Footer
        clearCompleted={clearCompleted}
        changeFilter={changeFilter}
        currentOption={appState.filter.currentOption}
        currentActive={appState.tasks.filter((task) => !task.isDone).length}
      />
    </>
  );
};
