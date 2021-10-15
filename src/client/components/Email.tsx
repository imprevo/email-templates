import React from 'react';

type EmailProps = {
  template: (data?: any) => JSX.Element | string;
  params?: any;
};

export const Email = ({ template, params }: EmailProps) => (
  <div>{template(params)}</div>
);
