import { useLocation, useMatch, useSearchParams } from "react-router-dom";

import "./index.less";

export default function () {
  const { search: s } = useLocation();
  const [search, setSearch] = useSearchParams(s);
  return <div className="page-pay">12313</div>;
}
