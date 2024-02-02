import React from 'react';

import { TasksFilter } from '../TaskFilter/TasksFilter';
import { FilterOptionType } from '../../store/state/state';

type FooterPropsType = {
  currentOption: FilterOptionType;
  currentActive: number;

  clearCompleted: () => void;
  changeFilter: (currentOption: FilterOptionType) => void;
};

export const Footer: React.FC<FooterPropsType> = ({
  currentOption,
  currentActive,
  clearCompleted,
  changeFilter,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{currentActive} items left</span>
      <TasksFilter changeFilter={changeFilter} currentOption={currentOption} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};
