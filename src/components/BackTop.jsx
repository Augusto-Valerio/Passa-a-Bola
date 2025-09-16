import React from "react";
import { FloatButton } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const BackTop = () => (
  <FloatButton.BackTop
    icon={<ArrowUpOutlined />}
    duration={0}
    className=" hover:!bg-pink !shadow-[0px_5px_15px_rgba(0,0,0,0.35)]  z-0"
  />
);

export default BackTop;
