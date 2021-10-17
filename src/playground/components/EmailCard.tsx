import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { Email, EmailData } from '../types/config';
import { EmailPreview } from './EmailPreview';
import { TabPanel } from './TabPanel';

const defaultTab: EmailData[] = [{ description: 'Default example' }];

export const EmailCard = ({ email }: { email: Email }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = email.data?.length ? email.data : defaultTab;

  return (
    <Paper
      sx={{
        p: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable auto tabs example"
      >
        {tabs.map((tab) => (
          <Tab key={tab.description} label={tab.description} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          <EmailPreview builder={email.builder} params={tab.params} />
        </TabPanel>
      ))}
    </Paper>
  );
};
