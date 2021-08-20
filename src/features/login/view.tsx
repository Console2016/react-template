import React, {FC} from 'react';
import {Spin, Input, Button, Form} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './styles.scss';
import Logo from './images/logo.svg';

const Component: FC<any> = ({isLogining = false}) => {
  const {push, location} = useHistory<any>();

  return (
    <div className={styles.view}>
      <div className={styles.bg}>
        <div className={styles.logo}>
          <Logo height={100} width={100} />
          <span>AAPP</span>
        </div>
        <div className={styles.mainBg}>
          <div className={styles.mainImg}>
            <div className={styles.title}>AAPP</div>
          </div>
        </div>
      </div>
      <div className={styles.tabsContain}>
        <div className={styles.tabsContext}>
          <Spin spinning={isLogining}>
            <h1>登录</h1>
            <Form
              name="login"
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              initialValues={{remember: true}}
              onFinish={(values: any) => {
                Cookies.set('bigdataplat_token', '123456');
                push(location.state.from || '/');
              }}
              onFinishFailed={(errorInfo: any) => {
                console.log('Failed:', errorInfo);
              }}>
              <Form.Item label="Username" name="username" rules={[{required: true, message: 'Please input your username!'}]}>
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item label="Password" name="password" rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Component;
