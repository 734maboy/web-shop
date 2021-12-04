import axios from 'axios';


/**
 * Класс для работы c API
 */
class WebClient {
  /**
   * Конструктор класс
   * @param {String} baseURL Базовый url бекэнда
   */
  constructor(baseURL) {
    this.baseURL = baseURL;

    this.store = null;
    this.router = null;

    this.axios = axios.create({
      baseURL,
      headers: {
				'Content-Type': 'multipart/form-data;',
      },
    });

    this.setInterceptors();
  }

  /**
   * Установка обработчиков 
   */
  setInterceptors() {
    this.axios.interceptors.response.use(res => {
			/// Постобработка усппешных запросов
			return res;
    }, error => {
      /// Постобработка не усппешных запросов

      // if ([401, 403].includes(error.data.status)) {
      //   this.store.dispatch('unsetUserData');
      //   setTimeout(() => {
      //     this.router.replace({ name: "login" });
      //   }, 0);
			// }
			
      return error.response;
    });
	}
  /**
	 * Метод установки заголовка авторизации после входа пользователем в приложение
	 * @param {String} token Токен авторизации
   */
	login(token) {
		this.axios.defaults.baseURL = this.baseURL;
		this.axios.defaults.headers.common['authorization'] = 'Bearer ' + token;
	
  }
  /**
   * Метод очистки заголовка авторизации при выходе пользователя из приложения
   */
  logout() {
		this.axios.defaults.baseURL = this.baseURL;
    delete this.axios.defaults.headers.common['authorization'];
  }

  get(url, params) {
    return this.axios.get(url, {
      params,
    })
  }
  post(url, data, params) {
    return this.axios.post(url, data, {
      params,
    })
  }
  put(url, data, params) {
    return this.axios.put(url, data, {
      params,
    })
  }
  delete(url, data, params) {
    return this.axios.delete(url, {
      params,
      data,
    })
  }
  request(url, config) {
    return this.axios.request({
      url,
      ...config
    });
  }
};

/**
 * URL API
 */
const url = 'http://localhost:24048/';
// const url = 'http://localhost:5001/';
export default new WebClient(url);
