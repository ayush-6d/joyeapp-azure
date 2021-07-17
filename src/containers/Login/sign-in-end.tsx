import * as React from 'react';
import { AuthHelper } from '../../helpers';

export default function SignInEnd() {
    AuthHelper.EndSignIn();
    return <h1>Ending sign in...</h1>
}
// import * as React from 'react';
// import { AuthHelper } from '../../helpers';

// export interface ISignInEndProps {
// }

// export const SignInEnd = () => {
// // class SignInEnd extends React.PureComponent<ISignInEndProps, {}> {
//   // constructor(props: ISignInEndProps) {
//   //   super(props);
//   // }
//   // render() {
//     AuthHelper.EndSignIn();
//     return (<h1>Ending sign in...</h1>)
//   // }
// // export default function SignInEnd() {
// }

// export default SignInEnd