type Sight = {
  /**
   * 访问令牌
   */
  at: string;
  /**
   * 景点简介
   */
  brief?: string;
  /**
   * 景点详细描述
   */
  description?: string;
  /**
   * 主键标识==spotId
   */
  id: string;
  /**
   * 综合体标识
   */
  integratedId: number;
  /**
   * 主图
   */
  masterImage: string;
  /**
   * 随机数
   */
  no: string;
  /**
   * 景区标识
   */
  parentId: number;
  /**
   * 景点票价
   */
  price: number;
  /**
   * 景点名称
   */
  title: string;
  /**
   * 时间戳
   */
  tt: number;
};

type SightDetail = {
  /**
   * 景点简介
   */
  brief?: string;
  /**
   * 景点详细描述
   */
  description?: string;
  /**
   * 景点详情图
   */
  detailsImages: {
    /**
     * 附件名称
     */
    fileName: string;
    /**
     * 附件大小
     */
    fileSize: number;
    /**
     * 附件后缀
     */
    fileSuffix: string;
    /**
     * 附件地址
     */
    fileUrl: string;
    /**
     * 主键标识
     */
    id: number;
  }[];
  /**
   * 主键标识
   */
  id: number;
  /**
   * 综合体标识
   */
  integratedId: number;
  /**
   * 景点宣传图
   */
  masterImages: {
    /**
     * 附件名称
     */
    fileName: string;
    /**
     * 附件大小
     */
    fileSize: number;
    /**
     * 附件后缀
     */
    fileSuffix: string;
    /**
     * 附件地址
     */
    fileUrl: string;
    /**
     * 主键标识
     */
    id: number;
  }[];
  /**
   * 景区标识
   */
  parentId: number;
  /**
   * 景点票价
   */
  price?: number;
  /**
   * 景点名称
   */
  title?: string;
};
