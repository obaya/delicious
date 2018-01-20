
import axios from 'axios';
import qs from 'qs';
var baseUrl = 'http://10.3.136.27:88';
var fliterUrl = function (url) {
    if (url.startsWith('http')) {
        return url;
    }
    return baseUrl + url;
}
export default {
    get: (opt) => {
        return new Promise((resolve, reject) => {
            axios.get(fliterUrl(opt.url), { params: opt.params }).then((response) => {
                // console.log(response)
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    },
    post: (opt) => {
        return new Promise((reslove, reject) => {
            axios({
                url: fliterUrl(opt.url),
                data: qs.stringify(opt.parmas),
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                reslove(response);
            })
                .catch((error) => {
                    reject(error);
                }
                );

        })
    }
}
