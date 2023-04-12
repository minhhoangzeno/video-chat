import styles from "./SingleLoading.module.css";
// import { LoadingOutlined } from "@ant-design/icons";
import Spin from "antd/lib/spin";

const SingleLoading = () => {
  return (
    <div className={styles.Loading}>
      <Spin size="large" />
      {/* <LoadingOutlined style={{fontSize: "2rem", color: "#fff"}} spin/> */}
    </div>
  );
};

export default SingleLoading;
