export const fillFormData = (formData, data) => {
  Object.keys(data).forEach(key => formData.append(key, data[key]));
};