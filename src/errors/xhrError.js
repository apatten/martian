import MTError from './mtError';
export default class XhrError extends MTError {
    constructor(xhr) {
        let response = {};
        if('responseText' in xhr) {
            try {
                response = JSON.parse(xhr.responseText);
            } catch(e) {
                response.message = xhr.responseText;
            }
        }
        let message = ('message' in response && response.message !== '') ? response.message : `Status ${xhr.status} from request`;
        super(message);
        this.errorCode = xhr.status;
    }
}
