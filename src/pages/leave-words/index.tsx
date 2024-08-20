import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperInstance } from "react-vant";

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
  const swiper = useRef<SwiperInstance>(null);

  function getData() {
    leaveWords({ at, no, tt, pageSize: 20, current: 1, ii }).then((res) => {
      setDatas(res.data.list);
    });
  }

  useEffect(() => {
    getData();
    setInterval(() => {
      getData();
    }, 1000 * 60 * 3);
    setInterval(() => {
      swiper.current?.swipeNext();
    }, 1000 * 10);
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
      <Swiper ref={swiper} className="swiper" vertical autoplay={false} loop>
        {renderData.map((items) => (
          <Swiper.Item key={items[0].id}>
            {items.map((item) => (
              <div className="item-wrapper" key={item.id}>
                <div className="item">
                  <div className="shadow-bar" />
                  <img className="p9" src={assets.p9} />
                  <div className="title">{item.title}</div>
                  {item.banner && <img className="banner" src={item.banner} />}
                  <div className="bottom">
                    <span className="topicTitle">#{item.topicTitle}</span>
                    <span>{item.content.slice(0,30)}{item.content.length > 31 && '...'}</span>
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
