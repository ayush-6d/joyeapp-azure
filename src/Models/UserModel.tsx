
import { BaseModel } from './BaseModel';
import { parseJwt, getUserData, getUserDataForSession } from 'src/utilities/generalUtils';
import { store } from 'src/store/index';

interface IUserProp {
  tenantId?: string;
  homeAccountId?: string;
  username?: string;
  name?: string;
  token?: string;
  uid?: string;
}

export class UserModel extends BaseModel<IUserProp> {
  static resource = 'user';

  constructor(props: IUserProp) {
    super(props);
  }

  static getCurrentUserUID() {
    const userIdFromLocalStorage = parseJwt((getUserData() || getUserDataForSession()).accessToken).userId;
    const userIdFromStore = store.getState().login.get('id');
    return userIdFromLocalStorage || userIdFromStore;
  }

}
