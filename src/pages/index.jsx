import React, { useEffect, useState } from 'react';
import { imageCode,login } from '@/apis/login';
import { useRequest } from 'ahooks';
import { createHash } from 'crypto';
import { Form, Input, Button } from 'antd-mobile'
import styles from './index.less';

const HomePage = () => {
  const a = useRequest(imageCode,{ manual:true });
  const b = useRequest(login,{ manual:true })
  const [refresh,setRefresh] = useState(true);
  const [image,setImage] = useState('');
  useEffect(()=>{
    a.run().then(res=>{
      setImage(res)
    })
  },[refresh])

  const onFinish = (values) => {
    b.run({
      ...values,
      password: createHash('md5').update(values.password).digest('hex'),
    }).then(res=>{
      if(res && res.statusCode == 0){
        
      }
    })
  }

  const handleChangeImage = () => {
    setRefresh(x=>!x);
  }

  return (
      <div className={ styles.center }>
        <div className={ styles.content }>
          <h3>线路工程环水保核查系统</h3>
          <Form
              mode="card"
              requiredMarkStyle='text-optional'
              onFinish={onFinish}
              layout='horizontal'
              footer={
                <Button style={{ marginTop:30 }} block type='submit' color='primary' size='large'>
                  提交
                </Button>
              }
          >
            <Form.Item name='username' label='姓名' rules={[{ required: true }]}>
              <Input placeholder='请输入姓名' clearable />
            </Form.Item>
            <Form.Item name='password' label='密码' rules={[{ required: true }]}>
              <Input placeholder='请输入密码' clearable />
            </Form.Item>
            <Form.Item label='验证码' name="captcha"
                       rules={[{ required: true }]}
                       extra={<div onClick={ handleChangeImage }
                                   className={ styles.extraPart }
                                   dangerouslySetInnerHTML={ { __html: image } }/>}>
              <Input placeholder='请输入' clearable />
            </Form.Item>
          </Form>
        </div>
      </div>
  );
};

export default HomePage;
