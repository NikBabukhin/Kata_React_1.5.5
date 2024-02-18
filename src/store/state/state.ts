export type TaskStatusType = 'completed' | 'inprogress' | 'editing';
export type TaskType = {
  taskId: string;
  isDone: boolean;
  title: string;
  taskStatus: TaskStatusType;
  timestamp: number;
  timeToDone: {
    seconds: number
    minutes: number,
  }
  isPaused: boolean,
  unmountTime: number,
};

export type FilterOptionType = 'all' | 'completed' | 'inprogress';
export type NewTitleType = {
  placeholder: string;
  autofocus: boolean;
  initialValue: string;
  isError: boolean;
};
export type AppStateType = {
  tasks: TaskType[];
  filter: { currentOption: FilterOptionType };
  newTitle: NewTitleType;
};

export const task1: TaskType = {
  taskId: 'task1CompletedTask',
  isDone: true,
  title: 'Completed task',
  taskStatus: 'completed',
  timestamp: 1706706014175,
  timeToDone: {
    minutes: 12,
    seconds: 25
  },
  isPaused: true,
  unmountTime: Date.now()
};

export const task2: TaskType = {
  taskId: 'task2Editingtask',
  isDone: false,
  title: 'Editing task',
  taskStatus: 'inprogress',
  timestamp: 1706586001705,
  timeToDone: {
    minutes: 10,
    seconds: 40
  },
  isPaused: false,
  unmountTime: Date.now()
};

export const task3: TaskType = {
  taskId: 'task3Activetask',
  isDone: false,
  title: 'Active task',
  taskStatus: 'inprogress',
  timestamp: 1706506001705,
  timeToDone: {
    minutes: 6,
    seconds: 13
  },
  isPaused: false,
  unmountTime: Date.now()
};

export const task4: TaskType = {
  taskId: 'task4TimerTask',
  isDone: false,
  title: 'TimerTask',
  taskStatus: 'inprogress',
  timestamp: 1706506445673,
  timeToDone: {
    minutes: 3,
    seconds: 30
  },
  isPaused: false,
  unmountTime: Date.now()
}


