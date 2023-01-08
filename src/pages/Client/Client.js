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
    fetch("http://localhost:4000/client")
      .then((res) => res.json())
      .then((data) => setOperatorData(data));
  }, []);

  const data = [];
  for (let i = 0; i < operatorData.length; i++ ){
    data.push({
      key: i,
      login: operatorData[i].user.login,
      fio: operatorData[i].user.FIO,
      balance: operatorData[i].balance + ' $',
      singleData: operatorData[i],
      tags: ['ASMR', 'Психолог'],
    })
  }

  const columns = [
    {
      title: '',
      dataIndex: '',
      key: '',
      render: () => <Avatar
        size={{ xs: 24 }}
        icon={<AntDesignOutlined />}
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