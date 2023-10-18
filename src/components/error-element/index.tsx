import { Empty } from "react-vant/es/empty";

export default function () {
  return (
    <div style={{ height: "100vh", width: "100vw", textAlign: "center" }}>
      <Empty image="error" description="加载页面失败,请联系管理员" />
    </div>
  );
}
