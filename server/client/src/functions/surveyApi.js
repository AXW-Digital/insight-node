import axios from 'axios'
export default {
    getData: () =>
    axios({
        'method':'GET',
        'url':'http://localhost:3030/api/surveys',
    })
}