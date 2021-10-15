import React from 'react';
import { AppConfig } from '../types/config';

type AppProps = {
  config: AppConfig;
};

export const App = ({ config }: AppProps) => (
  <div>
    <h1>Emails2:</h1>
    <div>
      {config.emails.map((email, key) => (
        <div key={key}>{email}</div>
      ))}
    </div>
  </div>
);
