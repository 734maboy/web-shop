import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.shades.black, // #000000
        secondary: colors.grey.darken3, // #424242
        accent: colors.pink.darken2, // #B2EBF2
      },
    },
  },
});
