import React from 'react';
import { EmailBuilder } from '../../libs/core';

type EmailProps = {
  builder: EmailBuilder;
  params?: any;
};

export const Email = ({ builder, params }: EmailProps) => (
  <div dangerouslySetInnerHTML={{ __html: builder.build(params) }} />
);
