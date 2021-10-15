export type EmailData = {
  description: string;
  params?: any;
};

export type Email = {
  title: string;
  template: (data?: any) => JSX.Element | string;
  data?: EmailData[];
};

export type AppConfig = {
  emails: Email[];
};
