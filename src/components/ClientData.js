import React, { useState } from 'react';
import { Col, Row, Space, Divider, InputNumber, Button } from 'antd';

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
);

const ClientData = (
    singleData
) => {
    
    return (
        <Row>
          <Col span={12}>
            <DescriptionItem title="Текущий баланс" content={singleData.singleData.balance + "$"} />
          </Col>
        </Row>
    )

} 

export default ClientData;