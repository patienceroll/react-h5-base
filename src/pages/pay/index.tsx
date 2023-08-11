import { useLocation } from "react-router-dom";

import './index.less'

export default function () {
  const p = useLocation();
  console.log()
  console.log(p);
  return <div className="page-pay">12313</div>;
}
