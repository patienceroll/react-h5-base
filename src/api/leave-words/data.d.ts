type LeaveWords = {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 图片-封面
   */
  banner?: string;
  /**
   * 收藏-数值类型-返回为字符串
   */
  collected: number;
  /**
   * 创建时间-不可更改
   */
  createTime: number;
  /**
   * 热度-数值类型-返回为字符串
   */
  hotted: number;
  /**
   * 主键标识
   */
  id: number;
  /**
   * 综合体标识
   */
  integratedId: number;
  /**
   * 点赞-数值类型-返回为字符串
   */
  liked: number;
  /**
   * 后台发布-随机昵称索引
   */
  nickIndex: number;
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 自点赞 0:未自点赞 1:自点赞
   */
  selfLiked: number;
  /**
   * 分享-数值类型-返回为字符串
   */
  shared: number;
  /**
   * 内容标题
   */
  title: string;
  /**
   * 话题标识
   */
  topicId: number;
  /**
   * 话题名称
   */
  topicTitle: string;
  /**
   * 主键标识
   */
  userId: number;
  merchantName:string
  merchantId: number
};
