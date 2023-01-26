import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, Space, notification, Button, Tag, Avatar } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons';
import AddOperatorDrawer from '../../components/AddOperatorDrawer';
import DetailDrawer from '../../components/DetailDrawer';

const Client = () => {

  const [operatorData, setOperatorData] = useState([]);
  const [singleOperatorData, setSingleOperatorData] = useState({}); 

  useEffect(() => {
    fetch("http://82.202.194.12:4000/client")
      .then((res) => res.json())
      .then((data) => setOperatorData(data));
  }, []);

  const data = [];
  for (let i = 0; i < operatorData.length; i++ ){
    data.push({
      key: i,
      login: operatorData[i].user.login,
      fio: operatorData[i].user.FIO,
      balance: operatorData[i].user.balance + ' $',
      singleData: operatorData[i],
      avatar: operatorData[i].user.avatar,
      tags: ['ASMR', 'Психолог'],
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
      dataIndex: 'detail',
      key: 'detail',
      render: () => <a>Отчет</a>
    },
    {
      title: 'Подробнее',
      dataIndex: 'singleData',
      key: 'singleData',
      render: (singleData) => <a onClick={() => clickDetail(singleData)}>Подробнее</a>
    },
  ];

  const [open, setOpen] = useState(false);

  function clickDetail(params) {
    setSingleOperatorData(params);
    showDrawer();
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
    </>
  )
};

export default Client;