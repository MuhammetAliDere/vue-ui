import { configure } from '@storybook/vue';

// import Vue from 'vue';
// import Vuex from 'vuex'; // Vue plugins
// import axios from 'axios';
// Import your custom components.
// import Mybutton from '../src/stories/Button.vue';

// // Install Vue plugins.
// Vue.use(Vuex, axios);

// Register custom components.
// Vue.component('my-button', Mybutton);

function loadStories() {
    // You can require as many stories as you need.
    require('../src/stories');
}

configure(loadStories, module);
