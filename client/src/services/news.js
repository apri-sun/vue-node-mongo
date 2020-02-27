import axios from 'axios'

function getNews () {
  axios.get('/news/mainList')
    .then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
}

export default getNews
