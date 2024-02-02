import React, { useState } from 'react';

type NewTaskPropsType = {
  addNewTask: (taskId: string) => void;
  changeError: (error: boolean) => void;

  placeholder: string;
  initialvalue: string;
  isError: boolean;
  autofocus: boolean;
};

export const NewTaskForm: React.FC<NewTaskPropsType> = ({
  addNewTask,
  changeError,
  placeholder,
  initialvalue,
  isError,
  autofocus,
}) => {
  const [localValue, setLocalValue] = useState<string>(initialvalue);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value) {
      changeError(false);
    }
    setLocalValue(event.currentTarget.value);
  };

  const onKeyPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim() === '') {
      changeError(true);
      if (event.key === 'Enter') {
        setLocalValue('');
      }
      return;
    }
    if (event.key === 'Enter' && !isError) {
      addNewTask(event.currentTarget.value.trim());
      setLocalValue('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        value={localValue}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressEnter}
        className="new-todo"
        placeholder={placeholder}
        autoFocus={autofocus}
      />
    </header>
  );
};
