import { Empty } from "react-vant/es/empty";

import './index.less'

export default function () {
  return (
    <div className="components-error-element" style={{ height: "100vh", width: "100vw", textAlign: "center" }}>
      <Empty image="error" description={<div className="components-error-element-tip">加载配置失败,请联系管理员</div>} />
    </div>
  );
}
