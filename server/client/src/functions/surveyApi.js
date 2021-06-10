import axios from 'axios'
export default {
    getData: () =>
    axios({
        'method':'GET',
        'url':'https://vaikuttava-admin.ngrok.io/api/surveys',
    })
}