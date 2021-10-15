import React from 'react';
import { AppConfig, EmailData } from '../types/config';
import { Email } from './Email';

type AppProps = {
  config: AppConfig;
};

const defaultTab: EmailData[] = [{ description: 'Default' }];

export const App = ({ config }: AppProps) => (
  <div>
    <h1>Emails:</h1>
    <div>
      {config.emails.map((email) => {
        const tabs = email.data?.length ? email.data : defaultTab;
        return (
          <div key={email.builder.title}>
            <h2>{email.builder.title}</h2>
            {tabs.map((data) => (
              <div key={data.description}>
                <h3>{data.description}</h3>
                <Email builder={email.builder} params={data.params} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  </div>
);
