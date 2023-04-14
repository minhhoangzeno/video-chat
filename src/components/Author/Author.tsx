import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import {
  GetAuthorConversation,
  UpdateAuthorConversation,
} from "../../app/reducers/Author/AuthorConversation.reducer";
import defaultPP from "../../images/avatar.png";
import { IAuthor } from "../../interface/Author.interface";
interface IAuthorProps {
  key: number;
  author: IAuthor;
}
export default function Author(props: IAuthorProps) {
  const { author } = props;
  const [form] = Form.useForm();
  const authorConservation = useAppSelector(GetAuthorConversation);
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState<IAuthor>({
    id: author.id,
    name: author.name,
    title: author.title,
    avatar: author.avatar,
  });
  const [isEditing, setIsEditting] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      id: author.id,
      name: author.name,
      title: author.title,
      avatar: author.avatar,
    });
    setFormValue({
      ...formValue,
      id: author.id,
      name: author.name,
      title: author.title,
      avatar: author.avatar,
    });
  }, [author]);

  const onValuesChange = () => {
    const getFieldsValue = form.getFieldsValue();
    setFormValue(getFieldsValue);
  };

  const onFinish = () => {
    const tempAuthorConservation = [...authorConservation];
    const index = tempAuthorConservation.findIndex((el) => el.id === author.id);
    if (index !== -1) {
      tempAuthorConservation[index] = {
        ...tempAuthorConservation[index],
        name: formValue.name,
        avatar: formValue.avatar,
      };

      dispatch(UpdateAuthorConversation(tempAuthorConservation));
    }
    setIsEditting(false);
  };

  const onFinishFailed = () => {
    message.error("Error.").then((r) => console.log(r));
  };
  const avatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormValue({
        ...formValue,
        avatar: URL.createObjectURL(event.target.files[0]),
      });
      form.setFieldsValue({
        ...form.getFieldsValue,
        avatar: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  return (
    <>
      <Form
        form={form}
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={formValue}
      >
        <Row className="items-end">
          <Col>
            <label className="font-semibold">{author.title}</label>
            <FormItem label="" className="m-0" name="name">
              <Input
                className="h-9 pl-0 rounded-tl-3xl rounded-bl-3xl mt-1"
                disabled={!isEditing}
                prefix={
                  <>
                    <div className="cursor-pointer">
                      <label htmlFor="pp" className="ppLabel">
                        <img
                          src={formValue.avatar ? formValue.avatar : defaultPP}
                          alt="ProfilePicture"
                          className="ppImage"
                          style={{ width: 34, height: 34, marginTop: 5 }}
                        />
                      </label>
                      <input
                        disabled={!isEditing}
                        id="pp"
                        type={"file"}
                        accept="image/*"
                        onChange={avatarChange}
                      />
                    </div>
                  </>
                }
                size="small"
              />
            </FormItem>
          </Col>
          {isEditing ? (
            <Row>
              <Button type="primary" className="h-9" htmlType="submit">
                <CheckOutlined />
              </Button>
              <Button onClick={() => setIsEditting(false)} className="h-9">
                <CloseOutlined />
              </Button>
            </Row>
          ) : (
            <Button onClick={() => setIsEditting(true)} className="h-9">
              <EditOutlined />
            </Button>
          )}
        </Row>
      </Form>
    </>
  );
}
