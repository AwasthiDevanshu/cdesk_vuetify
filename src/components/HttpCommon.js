import 'regenerator-runtime/runtime'
import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'https://backend.coprepedu.com/',
  crossDomain: true,
  headers: {},
})

export const ajaxCallMixin = {
  response: {},
  methods: {
    ajaxCall: async function (url, data, callBack = null, extraFields = []) {
      const form = new FormData()
      const params = JSON.stringify(data)
      form.append('body', params)
      for (const [key, value] of Object.entries(extraFields)) {
        form.append(key, value)
      }
      HTTP.post(url, form)
        .then((res) => {
          // do good things
          if (callBack != null) {
            return callBack(res.data)
          }
        })
        .catch((err) => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            res = err.response
            if (callBack != null) {
              return callBack(res.data)
            }
          }
          console.log(err)
        })
    },
  },
}
