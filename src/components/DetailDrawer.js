import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, List, Input, Row, Select, Space, Divider, Popconfirm } from 'antd';
import OperatorData from './OperatorData';
import ClientData from './ClientData';

const { Option } = Select;

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
);

type Props = {
    onClose: void, 
    open: Boolean,
    singleData: {}
}

const DetailDrawer = ({
    onClose,
    open,
    singleData
}: Props ) => {
    console.log('singleData',singleData)
    const singleUser = singleData.user;
    if (!singleUser){
      return;
    }
    
    const confirm = () =>
      new Promise((resolve) => {
        singleUser.isBanned = !singleUser.isBanned;
        setTimeout(() => resolve(null), 3000);
    });

    return(
        <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          Данные пользователя
        </p>
        <p className="site-description-item-profile-p">Общие</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Логин" content= { singleUser.login } />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Пароль" content= { singleUser.password } />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="ФИО" content= { singleUser.FIO } />
          </Col>
          <Col span={12}>
            {singleUser.isBanned ? 
              <Popconfirm
                title="Разблокировать пользователя"
                description="Уверены что желаете разблокировать пользователя?"
                onConfirm={confirm}
              >
                <Button type="dashed">Разбанить</Button>
              </Popconfirm>
              :
              <Popconfirm
                title="Блокировка"
                description="Уверены что желаете заблокировать пользователя?"
                onConfirm={confirm}
              >
                <Button type="dashed">Забанить</Button>
              </Popconfirm>
              }
          </Col>
        </Row>
        {singleUser.isBanned ? 
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Причина бана"
              content= "Заблокирован главным администратором"
            />
          </Col>
        </Row>
        : null }
        <Divider />
        <p className="site-description-item-profile-p">Специфичные данные</p>
        {
          singleUser.role === 'OPERATOR'?
          <OperatorData singleData={singleData}/>:
          <ClientData singleData={singleData}/>
        }
        <Divider />
        <p className="site-description-item-profile-p">Движение финансов</p>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Дата/время"
              content=" движение такое-то"
            />
          </Col>
        </Row>
        
      </Drawer>
    )
}


export default DetailDrawer;