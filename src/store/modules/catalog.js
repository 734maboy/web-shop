import services from '@/middleware/services';
const { ProductService } = services;


export const initialState = () => ({
  cartProducts: [],
  allProducts: [],
  allCategories: [],
});

export const mutations = {
  UPDATE_PRODUCT: (state, product) => {
    state.allProducts.map((item) => {
      if (item.id == product.id) {
        item.name = product.name;
        item.price = product.price;
        let cat = state.allCategories.find(item => item.categoryName == product.category);
        item.category = Object.assign({}, cat);
        return;
      }
    });
  },

  ADD_PRODUCT: (state, product) => {
    let isExists = false; 
    state.cartProducts.map((item) => {
      if (item.id == product.id) {
        item.count++;
        isExists = true;
        return;
      }
    });

    if (!isExists) state.cartProducts.push(product);
  },

  ADD_PRODUCT_TO_LIST: (state, product) => {
    state.allProducts.push(product);
  },

  REMOVE_PRODUCT: (state, id) => {
    state.cartProducts.map((item, index) => {
      if (item.id == id) {
        if (item.count == 1) {
          state.cartProducts.splice(index, 1);
        } else {
          item.count--;
        }
      }
    });
  },

  REMOVE_PRODUCT_FROM_LIST: (state, product) => {
    state.allProducts.map((prod, index) => {
      if (prod.id == product.id) {
        state.allProducts.splice(index, 1);
      }
    });
  },

  SET_PRODUCTS_LIST: (state, products) => {
    state.allProducts.push(...products);
  },

  SET_CATEGORIES_LIST: (state, categories) => {
    state.allCategories.push(...categories);
  },
};

export const actions = {

  async getAllProducts({commit}, _) {
    let products = await ProductService.getAllProducts();
     (products);
    commit('SET_PRODUCTS_LIST', products);
  },
  async getAllCategories({commit}, _) {
    let categories = await ProductService.getAllCategories();
     (categories);
    commit('SET_CATEGORIES_LIST', categories);
  },

  updateProduct({commit, state}, product) {
    commit('UPDATE_PRODUCT', product);
    let category = state.allCategories.find( item => item.categoryName == product.category);
    ProductService.updateProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: category.id,
    });
  },
  async removeProductFromList({commit}, product) {
    let resp = await ProductService.deleteProduct({id: product.id});
    if (!resp.message) {
      commit('REMOVE_PRODUCT_FROM_LIST', product);
    } else {return resp};
  },

  async createNewProduct({commit, state}, product) {
    let category = state.allCategories.find( item => item.categoryName == product.category);
    let productFromServer = await ProductService.createNewProduct({
      name: product.name,
      price: product.price,
      categoryId: category.id,
    });
     (productFromServer);
    commit('ADD_PRODUCT_TO_LIST', productFromServer);
  },
};

export const getters = {
  getCart: state => state.cartProducts,
  getProductsList: state => state.allProducts,
  getCategoriesList: state => state.allCategories,
}