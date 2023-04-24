import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosArrowDown } from 'react-icons/io';

export default function BaseSortDropdown({ passvalue }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
    passvalue(value);
  };

  return (
    <div>
      <button
        type="button"
        id="basic-button"
        onClick={handleClick}
        className="!bg-[transparent] w-[2rem] justify-center items-center"
      >
        <IoIosArrowDown size={30} color="black" />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem value="Profile" onClick={() => handleClose('stars')}>
          Sort by stars
        </MenuItem>
        <MenuItem onClick={() => handleClose('forks')}>Sort by forks</MenuItem>
        <MenuItem onClick={() => handleClose('issues')}>
          Sort by help wanted issues
        </MenuItem>
        <MenuItem onClick={() => handleClose('update')}>
          Sort by update
        </MenuItem>
      </Menu>
    </div>
  );
}
