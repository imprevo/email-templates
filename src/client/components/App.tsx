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
      {config.emails.map((email) => (
        <div key={email.title}>
          <h2>{email.title}</h2>
          {(email.data || defaultTab).map((data) => (
            <div key={data.description}>
              <h3>{data.description}</h3>
              <Email template={email.template} params={data.params} />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
