var baseUrl = 'http://47.93.38.180:8080/';

axios.interceptors.request.use(
    config => {
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = localStorage.getItem('token');
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    });
axios.interceptors.response.use(
    function(response) {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    function(error) {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    setTimeout(() => {
                        window.location.href = '../html/login.html';
                    }, 1000);
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 跳转登录页面
                case 403:
                    alert( '登录过期，请重新登录');
                    // 清除token
                    localStorage.removeItem('token');
                    setTimeout(() => {
                        window.location.href = '../html/login.html';

                    }, 1000);
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    alert( error.response.data.message);
            }
            return Promise.reject(error.response);
        }
    }
);

