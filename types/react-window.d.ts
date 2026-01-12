declare module "react-window" {
  import * as React from "react";

  export interface ListChildComponentProps {
    index: number;
    style: React.CSSProperties;
  }

  export class FixedSizeList extends React.Component<any> {}
}
