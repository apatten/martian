import Plug from 'lib/plug';
import userModel from 'models/user.model';
let userPlug = new Plug().at('@api', 'deki', 'users');
export default class User {
    static getCurrentUser() {
        return userPlug.at('current').get().then(userModel.parse);
    }
}
