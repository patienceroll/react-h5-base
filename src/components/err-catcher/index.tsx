import React, { ReactNode } from "react";
import { Empty } from "react-vant";

type ErrorCatcherProps = {
  errorNode?: React.ReactNode;
  errorNodeRender?: (
    errMsg: NonNullable<ErrorCatcherState["errorMsg"]>
  ) => React.ReactNode;
};

type ErrorCatcherState = {
  error: boolean;
  errorMsg?: any;
};

export default class Index extends React.Component<
  React.PropsWithChildren<ErrorCatcherProps>,
  ErrorCatcherState
> {
  state: Readonly<ErrorCatcherState> = { error: false };

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    props:
      | React.PropsWithChildren<ErrorCatcherProps>
      | Readonly<React.PropsWithChildren<ErrorCatcherProps>>
  ) {
    super(props);
  }

  componentDidCatch(err: any) {
    this.setState({ error: true, errorMsg: err });
  }

  render(): ReactNode {
    const { error, errorMsg } = this.state;
    const { errorNode, errorNodeRender } = this.props;
    return error
      ? errorNode || errorNodeRender?.(errorMsg) || (
          <div style={{ height: "100vh", width: "100vw", textAlign: "center" }}>
            <Empty image="error" description="加载页面失败,请联系管理员" />
          </div>
        )
      : this.props.children;
  }
}
