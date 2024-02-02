import React from 'react';

import { FilterOptionType } from '../../store/state/state';

type TaskFilterPropsType = {
  currentOption: FilterOptionType;

  changeFilter: (filterOptions: FilterOptionType) => void;
};

export const TasksFilter: React.FC<TaskFilterPropsType> = ({
  currentOption,
  changeFilter,
}) => {
  return (
    <ul className="filters">
      <li>
        <button
          className={currentOption === 'all' ? 'selected' : ''}
          onClick={() => changeFilter('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={currentOption === 'inprogress' ? 'selected' : ''}
          onClick={() => changeFilter('inprogress')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={currentOption === 'completed' ? 'selected' : ''}
          onClick={() => changeFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};
