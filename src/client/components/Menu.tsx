import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

export const Menu = ({
  menuList,
  activeIndex,
  setActive,
}: {
  menuList: string[];
  activeIndex: number;
  setActive: (index: number) => void;
}) => {
  return (
    <List>
      {menuList.map((menu, index) => (
        <ListItem
          selected={index === activeIndex}
          button
          key={index}
          onClick={() => setActive(index)}
        >
          <ListItemText primary={menu} />
        </ListItem>
      ))}
    </List>
  );
};
