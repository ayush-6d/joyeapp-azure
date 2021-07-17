import * as React from 'react';
import { AuthHelper } from '../../helpers';

export default function SignInStart() {
    AuthHelper.StartSignIn();
    return <h1>Starting sign in...</h1>
}
// import * as React from 'react';
// import { AuthHelper } from '../../helpers';

// export interface ISignInStartProps {
// }

// export const SignInStart = () => {
//     // constructor(props: ISignInStartProps) {
//     //   super(props);
//     // }
//     // render() {
//         AuthHelper.StartSignIn();
//         return (<h1>Starting sign in...</h1>)
//     }
//   // export default function SignInEnd() {
//   // }

//   export default SignInStart