import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const SCROLL_OFFSET = 20;

type IFrameProps = React.PropsWithChildren<any>;

export const IFrame = ({ children, ...props }: IFrameProps) => {
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement>();
  const mountNode = iframeRef?.contentWindow?.document?.body;

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef && mountNode) {
        iframeRef.height = `${mountNode.scrollHeight + SCROLL_OFFSET}px`;
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
