import React from 'react';
import { FloatButton } from 'antd';
import { ArrowUpOutlined } from "@ant-design/icons";

const BackTop = () => <FloatButton.BackTop icon={<ArrowUpOutlined />} className="!text-white hover:!bg-pink"/>;

export default BackTop;
