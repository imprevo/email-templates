import Box from '@mui/material/Box';
import React from 'react';

type TabPanelProps = React.PropsWithChildren<{
  value: number;
  index: number;
}>;

export const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {value === index && <Box sx={{ px: 0, pt: 2 }}>{children}</Box>}
  </div>
);
