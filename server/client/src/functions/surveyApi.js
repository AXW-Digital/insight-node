import axios from 'axios'
export default {
    getData: () =>
    axios({
        'method':'GET',
        'url':'http://13.48.5.73:3030/api/surveys',
    })
}