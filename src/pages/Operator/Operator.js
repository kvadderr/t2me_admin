import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, Space, notification, Button, Tag, Badge, Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

import AddOperatorDrawer from '../../components/AddOperatorDrawer';
import DetailDrawer from '../../components/DetailDrawer';
import ReviewDrawer from '../../components/ReviewDrawer';

const Operator = () => {

  const openNotification = () => {
    notification.open({
      message: 'Уведомление',
      description:
        'Пример уведомления',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  
  const [operatorData, setOperatorData] = useState([]);
  const [singleOperatorData, setSingleOperatorData] = useState({}); 
  const [operatorId, setOperatorId] = useState(1); 

  useEffect(() => {
    openNotification();
    fetch("http://localhost:4000/operator")
      .then((res) => res.json())
      .then((data) => setOperatorData(data));
  }, []);

  const data = [];
  for (let i = 0; i < operatorData.length; i++ ){
    data.push({
      key: i,
      login: operatorData[i].user.login,
      fio: operatorData[i].user.isBanned ? <Badge status="error" text={operatorData[i].user.FIO} /> : operatorData[i].user.FIO,
      balance: operatorData[i].user.balance + ' $',
      singleData: operatorData[i],
      tags: ['ASMR', 'Психолог'],
      avatar: operatorData[i].user.avatar,
      operatorId: operatorData[i].id,
    })
  }

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <Avatar
        size={{ xs: 24 }}
        src={avatar}
      />
    },
    {
      title: 'ФИО',
      dataIndex: 'fio',
      key: 'fio',
      width: '20%',
    },
    {
      title: 'Логин',
      dataIndex: 'login',
      key: 'login',
      width: '15%',
    },
    {
      title: 'Баланс',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Аналитика',
      dataIndex: 'operatorId',
      key: 'operatorId',
      render: (operatorId) => <a onClick={() => openCallHistory(operatorId)}>Отчет</a>
    },
    {
      title: 'Услуги',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Подробнее',
      dataIndex: 'singleData',
      key: 'singleData',
      render: (singleData) => <a onClick={() => clickDetail(singleData)}>Подробнее</a>
    },
    {
      title: 'Отзывы',
      dataIndex: 'detail',
      key: 'detail',
      render: () => <a>Отзывы</a>
    },
  ];

  const [open, setOpen] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const showReviewDrawer = () => {
    setOpenReview(true);
  }

  const onCloseReviewDrawer = () => {
    setOpenReview(false);
  }

  function clickDetail(params) {
    setSingleOperatorData(params);
    showDrawer();
  } 

  function openCallHistory(operatorId){
    console.log('operatorId', operatorId)
    setOperatorId(operatorId);
    showReviewDrawer();
  }

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <DetailDrawer open={open} onClose={onClose} singleData={singleOperatorData}/>
      <ReviewDrawer open={openReview} onClose={onCloseReviewDrawer} operatorId={operatorId}/>

    </>
  )
};

export default Operator;