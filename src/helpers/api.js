import axios from 'axios'
let token = localStorage.getItem('token')
let apiKey = 'RoWuPbXiBwGnHCy49ko10vuswezEYoCpRl5IQism'

const instance = axios.create({
    baseURL: 'https://api.currencyapi.com/v3'
})

instance.defaults.headers.common['Accept'] = 'application/json';
instance.defaults.headers.common['Cache-Control'] = 'no-cache';
instance.defaults.headers.common['Content-Type'] = 'text/plain';
instance.interceptors.request.use(config => {
  config.params =  {
    apikey:  apiKey,
   ...config.params,
  }
   return config;
})



const get = makeActionDecorator(function (url) {
    return instance({
        method: 'GET',
        url,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
});


const post = makeActionDecorator(function (url, payload) {
    return instance({
        method: 'POST',
        url,
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
});

const put = makeActionDecorator(function (url, payload) {
    return instance({
        method: 'PUT',
        url,
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
});


const del = makeActionDecorator(function (url) {
    return instance({
        method: 'DELETE',
        url,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
});


function makeActionDecorator(fTargetFunction) {
    return function () {
        return fTargetFunction.apply(this, arguments);
    }
}

export {
    get,
    post,
    del,
    put,
}