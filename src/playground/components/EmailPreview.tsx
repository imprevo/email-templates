import React from 'react';
import { EmailBuilder } from '../../libs/core';
import { IFrame } from './IFrame';

type EmailProps = {
  builder: EmailBuilder<any>;
  params?: any;
};

export const EmailPreview = ({ builder, params }: EmailProps) => (
  <IFrame>
    <div dangerouslySetInnerHTML={{ __html: builder.build(params) }} />
  </IFrame>
);
