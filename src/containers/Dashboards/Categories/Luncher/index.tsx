import * as React from "react";
import Logo from "src/resources/icons/LOGO_Square white_border.png";
import Cup from "src/resources/icons/cup.png";
import { PageImage } from "src/components";
export interface ILuncherProps {}
export class Luncher extends React.PureComponent<ILuncherProps, {}> {
  constructor(props: ILuncherProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="check-arrow">
        <div className="joye-logo" style={{ marginBottom: "15px" }}>
          <PageImage height="87px" width="86px" logo={Logo} />
        </div>
          <PageImage height="110.6px" width="70px" marginTop="60px" logo={Cup} />
         </div>
          <div style={{ color: '#1E00A3', fontSize:'17px', margin:'10px auto', textAlign:'center',fontWeight:'bold' }}>Daily Brew</div>
      </div>
    );
  }
}
