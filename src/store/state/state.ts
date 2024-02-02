export type TaskStatusType = 'completed' | 'inprogress' | 'editing';
export type TaskType = {
  taskId: string;
  isDone: boolean;
  title: string;
  taskStatus: TaskStatusType;
  timestamp: number;
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

const task1: TaskType = {
  taskId: 'task1CompletedTask',
  isDone: true,
  title: 'Completed task',
  taskStatus: 'completed',
  timestamp: 1706706014175,
};

const task2: TaskType = {
  taskId: 'task2Editingtask',
  isDone: false,
  title: 'Editing task',
  taskStatus: 'inprogress',
  timestamp: 1706586001705,
};

const task3: TaskType = {
  taskId: 'task3Activetask',
  isDone: false,
  title: 'Active task',
  taskStatus: 'inprogress',
  timestamp: 1706506001705,
};

export const state: AppStateType = {
  tasks: [task1, task2, task3],
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
