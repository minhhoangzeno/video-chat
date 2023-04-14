import React, { useState } from "react";
import {
  Avatar,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography,
} from "antd";
import styles from "./MessageList.module.css";
import { useAppSelector } from "../../app/hooks";
import {
  GetMessageList,
  UpdateMessageList,
} from "../../app/reducers/Message/MessageList.reducer";
import { ISubtitle } from "../../interface/Subtitle.interface";
import { GetAuthorConversation } from "../../app/reducers/Author/AuthorConversation.reducer";
import { IAuthor } from "../../interface/Author.interface";
import defaultPP from "../../images/avatar.png";
import { useDispatch } from "react-redux";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: ISubtitle;
  index: number;
  children: React.ReactNode;
}

const { Option } = Select;

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const MessageList: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | undefined>("");
  const messageList = useAppSelector(GetMessageList);
  const authorConservation = useAppSelector(GetAuthorConversation);
  const isEditing = (record: ISubtitle) => record.id === editingKey;

  const edit = (record: Partial<ISubtitle>) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const deleteRecord = (record: ISubtitle) => {
    const tempMessageList = [...messageList];
    let temp = tempMessageList.filter((el) => el.id !== record.id);
    dispatch(UpdateMessageList(temp));
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as ISubtitle;

      const newData = [...messageList];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        dispatch(UpdateMessageList(newData));
        setEditingKey("");
      } else {
        newData.push(row);
        dispatch(UpdateMessageList(newData));
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const changeAuthor = (record: ISubtitle, authorId: string) => {
    const tempMessageList = [...messageList];
    const index = tempMessageList.findIndex((el) => el.id === record.id);
    const author = authorConservation.filter((el) => el.id === authorId)[0];
    if (index > -1) {
      tempMessageList[index] = { ...tempMessageList[index], authorId, author };
      dispatch(UpdateMessageList(tempMessageList));
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      width: "5%",
    },
    {
      title: "Giây bắt đầu",
      dataIndex: "startSeconds",
      width: "15%",
      editable: true,
    },
    {
      title: "Giây kết thúc",
      dataIndex: "endSeconds",
      width: "15%",
      editable: true,
    },
    {
      title: "Tin nhắn",
      dataIndex: "text",
      width: "40%",
      editable: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      render: (_: any, record: ISubtitle) => {
        return (
          <>
            <Select
              defaultValue={record.authorId}
              style={{ width: 150 }}
              onChange={(e) => changeAuthor(record, e)}
            >
              {authorConservation.length > 0 &&
                authorConservation.map((author: IAuthor, index: number) => {
                  return (
                    <Option
                      key={index}
                      value={author.id}
                      className={styles.optionAuthor}
                    >
                      <Avatar
                        src={author?.avatar ? author.avatar : defaultPP}
                        size="small"
                      />{" "}
                      {author.name}
                    </Option>
                  );
                })}
            </Select>
          </>
        );
      },
    },
    {
      title: "Thiết lập",
      dataIndex: "operation",
      render: (_: null, record: ISubtitle) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn chắc chắn muốn đóng?" onConfirm={cancel}>
              <Typography.Link>Đóng</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Sửa
            </Typography.Link>
            <Popconfirm
              title="Bạn chắc chắn muốn xóa?"
              onConfirm={() => deleteRecord(record)}
            >
              <Typography.Link>Xóa</Typography.Link>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ISubtitle) => ({
        record: record,
        inputType: col.dataIndex === "text" ? "text" : "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        className="w-full"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={messageList}
        columns={mergedColumns}
        rowClassName={styles.editTableRow}
        pagination={{
          onChange: cancel,
        }}
        rowKey="id"
      />
    </Form>
  );
};

export default MessageList;
