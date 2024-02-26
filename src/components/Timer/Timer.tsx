import React from 'react';

type TimerPropsType = {
  minutes: number;
  seconds: number;
};

export const Timer: React.FC<TimerPropsType> = ({ minutes, seconds }) => {
  const showWithNull = (value: number) => (value < 10 ? `0${value}` : value);

  return <>{` ${showWithNull(minutes)}:${showWithNull(seconds)}`}</>;
};
