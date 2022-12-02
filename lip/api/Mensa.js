import {BASE_URL, getJSON} from "."

const MensaAPI = {
    get(mensa) {
        try {
            return getJSON(`${BASE_URL}mensa/${mensa}`);
        } catch {
        }
    },
    getAll() {
        try {
            return getJSON(`${BASE_URL}mensas`)
        } catch  {
            
        }
    }
}

export default MensaAPI
