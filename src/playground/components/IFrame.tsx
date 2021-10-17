import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type IFrameProps = React.PropsWithChildren<any>;

export const IFrame = ({ children, ...props }: IFrameProps) => {
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement>();
  const mountNode = iframeRef?.contentWindow?.document?.body;

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef && mountNode) {
        iframeRef.height = mountNode.scrollHeight.toString();
      }
    };
    handleResize();
    document.addEventListener('resize', handleResize);
    return () => document.removeEventListener('resize', handleResize);
  }, [mountNode]);

  return (
    <iframe
      style={{ width: '100%', minHeight: '50px', border: 0 }}
      ref={setIframeRef}
      {...props}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
