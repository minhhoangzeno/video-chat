import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const NotFoundLoading = (props: { count: number; loading: boolean; message?: string }) => {
  const { count, loading, message } = props;
  return (
    <div style={{ padding: '20px 0 0', textAlign: 'center', margin: 'auto' }}>
      {
        loading ?
          <LoadingOutlined/>
          : !count && message ? message : 'Not Found'
      }
    </div>
  );
};

export default NotFoundLoading;
