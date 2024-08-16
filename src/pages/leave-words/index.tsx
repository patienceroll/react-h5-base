import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Swiper } from "react-vant";

import { leaveWords } from "src/api/leave-words";
import assets from "src/assets";

import "./index.less";

export default function () {
  const [search] = useSearchParams();
  const at = search.get("at")!;
  const no = search.get("no")!;
  const tt = search.get("tt")!;
  const ii = search.get("ii")!;

  const [datas, setDatas] = useState<LeaveWords[]>([]);

  function getData() {
    leaveWords({ at, no, tt, pageSize: 20, current: 1, ii }).then((res) => {
      setDatas(res.data.list);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const renderData = useMemo(() => {
    const d: LeaveWords[][] = [];
    datas.forEach((item) => {
      const lastOne = d[d.length - 1];
      if (lastOne === undefined) {
        d.push([item]);
      } else if (lastOne.length < 3) {
        lastOne.push(item);
      } else {
        d.push([item]);
      }
    });
    return d;
  }, [datas]);

  return (
    <div
      className="page-leave-words"
      style={{ backgroundImage: `url(${assets.p8})` }}
    >
      <Swiper vertical autoplay={false} loop style={{ height: "100%" }}>
        {renderData.map((items) => (
          <Swiper.Item>
            {items.map((item) => (
              <div className="item-wrapper" key={item.id}>
                <div className="item">
                  <div className="shadow-bar" />
                  <img className="p9" src={assets.p9} />
                  <div className="title">{item.title}</div>
                  {item.banner && <img className="banner" src={item.banner} />}
                  <div className="bottom">
                    <span className="topicTitle">#{item.topicTitle}</span>
                    <span>{item.title}</span>
                    {item.merchantId > 0 && (
                      <span className="merchantName">@{item.merchantName}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Swiper.Item>
        ))}
      </Swiper>
    </div>
  );
}
