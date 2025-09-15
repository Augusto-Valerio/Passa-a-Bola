import React from 'react';
import { FloatButton } from 'antd';
import { ArrowUpOutlined } from "@ant-design/icons";

const BackTop = () => <FloatButton.BackTop icon={<ArrowUpOutlined />} className=" hover:!bg-pink !shadow-[0px_5px_15px_rgba(0,0,0,0.35)]"/>;

export default BackTop;
