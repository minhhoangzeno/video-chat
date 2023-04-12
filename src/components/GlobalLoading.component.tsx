import { Spin } from "antd";
import React from "react";
import { useAppSelector } from "../app/hooks";
//import { selectLoading } from '../app/reducers/loading.reducer';

const GlobalLoading = () => {
  // const loadingState = useAppSelector(selectLoading);
  // const [loading, setLoading] = React.useState(loadingState);

  // React.useEffect(() => {
  //   setLoading(loadingState);
  // }, [loadingState]);

  return (
    <>
      <Spin size="large" />
      {/* {loading && <div className="loading">
        <Spin size="large"/>
      </div>} */}
    </>
  );
};

export default GlobalLoading;
