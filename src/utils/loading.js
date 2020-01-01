/* eslint-disable react/prop-types */
import React from 'react';
import Loadable from 'react-loadable';

import { Skeleton } from 'antd';
// 按需加载组件
export default function withLoadable(comp) {
  return Loadable({
    loader: comp,
    loading: props=>{
      if (props.error) {
        return <Skeleton />;
      } else if (props.timedOut) {
        return <Skeleton />;
      } else if (props.pastDelay) {
        return <Skeleton />;
      }
      return null;
    },
    timeout: 10000,
  });
}
