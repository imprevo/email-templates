import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { EmailBuilder } from '../../libs/core';
import { IFrame } from './IFrame';

type EmailProps = {
  builder: EmailBuilder<any>;
  params?: any;
};

const useBuildEmail = ({ builder, params }: EmailProps) => {
  const [html, setHtml] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;
    builder.build(params).then((result) => {
      if (mounted) {
        setHtml(result);
      }
    });
    return () => {
      mounted = false;
    };
  }, [builder, params]);
  return html;
};

export const EmailPreview = ({ builder, params }: EmailProps) => {
  const html = useBuildEmail({ builder, params });
  if (!html)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  return (
    <IFrame>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </IFrame>
  );
};
