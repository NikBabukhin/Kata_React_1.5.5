import React, { useState } from 'react';

type NewTaskPropsType = {
  addNewTask: (taskId: string, minutes: number, seconds: number, date: number) => void;
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
  const [minutesValue, setMinutesValue] = useState<string>('00');
  const [secondsValue, setSecondsValue] = useState<string>('00');

  const onChangeMinutesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim()) {
      const value = event.currentTarget.value.trim().replace(/\D/g, '');
      changeError(false);
      setMinutesValue(Number(value) > 59 ? '00' : value);
    }
  };
  const onChangeSecondsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim()) {
      const value = event.currentTarget.value.trim().replace(/\D/g, '');
      changeError(false);
      setSecondsValue(Number(value) > 59 ? '00' : value);
    }
  };
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value) {
      changeError(false);
    }
    setLocalValue(event.currentTarget.value);
  };
  const onKeyPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (localValue.trim() === '' || (+minutesValue === 0 && +secondsValue === 0)) {
      changeError(true);
      if (event.key === 'Enter') {
        setLocalValue('');
        setMinutesValue('00');
        setSecondsValue('00');
      }
      return;
    }
    if (event.key === 'Enter' && !isError) {
      addNewTask(
        localValue.trim(),
        Number(minutesValue),
        Number(secondsValue),
        Date.now()
      );
      setLocalValue('');
      setMinutesValue('');
      setSecondsValue('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          value={localValue}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressEnter}
          className="new-todo"
          placeholder={placeholder}
          autoFocus={autofocus}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={minutesValue}
          onChange={onChangeMinutesHandler}
          onKeyDown={onKeyPressEnter}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={secondsValue}
          onChange={onChangeSecondsHandler}
          onKeyDown={onKeyPressEnter}
        />
      </form>
    </header>
  );
};
