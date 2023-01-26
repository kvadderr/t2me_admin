import React, { useState } from 'react';
import { Col, Row, Space, Divider, InputNumber, Button, Typography } from 'antd';
const { Paragraph, Text } = Typography;

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
);

const OperatorData = (
    singleData
) => {
    console.log('singleData', singleData);
    const lorem = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
    const onChange = (value: number) => {
        singleData.singleData.percent = value;
    };
    return (
        <>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Текущий баланс" content={singleData.singleData.user.balance + "$"} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Процент" content={<InputNumber min={1} max={20} value={singleData.singleData.percent} onChange={onChange} />} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Стоимость 1 минуты" content={singleData.singleData.price + "$"} />
          </Col>
          <Col span={12}>
            <Button type="dashed">Сохранить</Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Специалист о себе: "/>
            <Paragraph>
                {singleData.singleData.brief}
            </Paragraph>
          </Col>
        </Row>
        </>
    )

} 

export default OperatorData;