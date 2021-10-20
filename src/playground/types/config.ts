import { EmailBuilder } from '../../libs/core';

export type EmailData = {
  description: string;
  params?: any;
};

export type Email = {
  builder: EmailBuilder<any>;
  data?: EmailData[];
};

export type AppConfig = {
  emails: Email[];
};
