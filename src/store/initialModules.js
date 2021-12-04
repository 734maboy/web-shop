
export default (modules) => {
  Object.keys(modules).forEach(m => {
    let module = modules[m];

    if (!module.mutations) module.mutations = {};

    // Установка начального состояния
    if (!module.state) module.state = module.initialState();
    // Установка module.namespaced
    if (module.namespaced === undefined) module.namespaced = true;

    module.mutations['UNSET_DATA'] = state => UNSET_DATA(state, module.initialState());
  });

  return modules;
};