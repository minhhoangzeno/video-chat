import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useDispatch } from "react-redux";
import { UpdateMessageList } from "../../app/reducers/Message/MessageList.reducer";
import { ParseSrt } from "../../helper/ParseSrt.helper";

export default function ImportFile() {
  const dispatch = useDispatch();
  const handleParseFile = (file: RcFile) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        const subs = ParseSrt(e.target.result);
        dispatch(UpdateMessageList(subs));
      }
    };
    reader.readAsText(file);

    // Prevent upload
    return false;
  };

  return (
    <>
      <Upload
        multiple={false}
        customRequest={(options) => {
          if (options.onSuccess) {
            options.onSuccess("ok");
          }
        }}
        beforeUpload={handleParseFile}
      >
        <Button icon={<UploadOutlined />}>Upload file srt</Button>
      </Upload>
    </>
  );
}
