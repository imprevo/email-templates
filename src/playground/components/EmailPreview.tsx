import React from 'react';
import { EmailBuilder } from '../../libs/core';

type EmailProps = {
  builder: EmailBuilder<any>;
  params?: any;
};

export const EmailPreview = ({ builder, params }: EmailProps) => (
  <div dangerouslySetInnerHTML={{ __html: builder.build(params) }} />
);
