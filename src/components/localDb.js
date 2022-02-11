import 'regenerator-runtime/runtime'
import _ from 'lodash'

export const localDb = {
  response: {},
  methods: {
    save: async function (key, data, type) {
      const store = type === 'session' ? sessionStorage : localStorage
      const parsed = JSON.stringify(data)
      store.setItem(key, parsed)
    },
    get: function (key, type) {
      const store = type === 'session' ? sessionStorage : localStorage
      if (store.getItem(key)) {
        try {
          return JSON.parse(store.getItem(key))
        } catch (e) {
          store.removeItem(key)
        }
      }
    },
    remove: async function (key, callBack = null) {
      localStorage.removeItem(key)
    },
    getToken: function () {
      if (localStorage.getItem('token')) {
        try {
          const token = this.get('token')
          const tokenExpiry = this.get('tokenExpiry')
          const expiryTime = tokenExpiry
          const currentTimeStamp = Math.round(new Date().getTime() / 1000)
          if (expiryTime > currentTimeStamp) {
            return token
          }
        } catch (e) {
          this.remove('token')
        }
      }
      //  this.$router.push("/");
    },
    handleFileUpload (files, name) {
      this.fields[name] = files[0]
    },
    getSelectedValues (event, field, callBack = null) {
      let value = []
      if (!event.target) {
        value = ''
      } else if (event.target.multiple) {
        const { options } = event.target
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value)
          }
        }
      } else {
        value = event.target.value
      }
      this[field] = value
      if (callBack != null) {
        callBack(value)
      }
      return value
    },
    arrayKeys (obj) {
      return Object.keys(obj)
    },
    arrayColumn (obj, column, key = null) {
      let returnValue = _.chain(obj)
      if (key != null) {
        returnValue = returnValue.keyBy(key)
      }
      if (column != null) {
        returnValue = returnValue.mapValues(column)
      }
      return returnValue.value()
    },
    arrayFilter (mapObject, callBack = null) {
      const returnVar = {}
      if (callBack != null) {
        for (const [key, value] of Object.entries(mapObject)) {
          if (callBack(value)) {
            returnVar[key] = value
          }
        }
      } else {
        for (const [key, value] of Object.entries(mapObject)) {
          if (
            !(
              value == null ||
              value === false ||
              value === undefined ||
              value === ''
            )
          ) {
            returnVar[key] = value
          }
        }
      }
      return returnVar
    },
    changeMapToSelect (mapObject) {
      const selectList = []
      for (const [key, value] of Object.entries(mapObject)) {
        selectList.push({ value: key, label: value })
      }
      return selectList
    },
    changeListToSelect (listObject, valueObj, label) {
      const selectList = []
      if (Array.isArray(valueObj)) {
        for (const [key, obj] of Object.entries(listObject)) {
          let val = {}
          valueObj.forEach(function (value) {
            val[value] = obj[value]
          })
          val = JSON.stringify(val)
          selectList.push({ value: val, label: obj[label] })
        }
      } else {
        for (const [key, obj] of Object.entries(listObject)) {
          selectList.push({ value: obj[valueObj], label: obj[label] })
        }
      }
      return selectList
    },
    printDocument (documentId) {
      const doc = document.getElementById(documentId)
      // Wait until PDF is ready to print
      if (typeof doc.print === 'undefined') {
        setTimeout(function () {
          printDocument(documentId)
        }, 1000)
      } else {
        doc.print()
      }
    },
  },
}
