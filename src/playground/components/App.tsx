import React from 'react';
import Grid from '@mui/material/Grid';
import { AppConfig } from '../types/config';
import { Shell } from './Shell';
import { Menu } from './Menu';
import { EmailCard } from './EmailCard';

type AppProps = {
  config: AppConfig;
};

export const App = ({ config }: AppProps) => {
  const [activeMenuIndex, setActiveMenuIndex] = React.useState(0);
  const menuList = config.emails.map((email) => email.builder.title);
  const activeEmail = config.emails[activeMenuIndex];

  return (
    <Shell
      menu={
        <Menu
          menuList={menuList}
          activeIndex={activeMenuIndex}
          setActive={setActiveMenuIndex}
        />
      }
    >
      <Grid item xs={12}>
        {activeEmail && (
          <EmailCard key={activeEmail.builder.title} email={activeEmail} />
        )}
      </Grid>
    </Shell>
  );
};
