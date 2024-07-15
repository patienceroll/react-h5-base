import { Button } from "react-vant";
import assets from "src/assets";
import sdk from "src/sdk";

import "./index.less";

export default function () {
  return (
    <div className="page-phone-number-bind-success">
      <div className="body">
        <div className="content">
          <img className="icon" src={assets.p6} />
          <div className="text">绑定成功</div>
        </div>
        <div className="back">请返回小程序~</div>
      </div>
      <div className="bottom">
        <Button
          className="button"
          type="primary"
          block
          round
          onClick={() => {
            sdk.wx.closeWindow()
          }}
        >
          关闭
        </Button>
      </div>
    </div>
  );
}
