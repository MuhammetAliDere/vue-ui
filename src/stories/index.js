//todo: storybook çalışır durumda kalmalı
import { storiesOf } from '@storybook/vue';
import Buttons from './Buttons.story.vue';
import DataTable from './DataTable.story.vue'
import Input from './Input.story.vue'
import CheckboxRadioToggle from './CheckboxRadioToggle.story.vue'
import Selectbox from './Selectbox.story.vue'
import TextArea from './TextArea.story.vue'
import Label from './Label.story.vue'
import Tooltip from './Tooltip.story.vue'
import DatePicker from './DatePicker.story.vue'
import MultiSelect from '../components/inputs/MultiSelect.vue'
import Alert from './Alert.story.vue'
import Select2 from './Select2.story.vue'

import Vue from 'vue';
// generic libs
import VueSweetalert2 from 'vue-sweetalert2';


Vue.config.productionTip = false;
Vue.use(VueSweetalert2);

storiesOf('Components', module)
    .add('Button', () => ({
        components: { Buttons },
        template: '<Buttons />'
    }))
    .add('Input', () => ({
        components: { Input },
        template: '<Input />'
    }))
    .add('DataTable', () => ({
        components: { DataTable },
        template: '<DataTable />'
    }))
    .add('Checkbox & Radio & Toggle', () => ({
        components: { CheckboxRadioToggle },
        template: '<CheckboxRadioToggle />'
    }))
    .add('Selectbox', () => ({
        components: { Selectbox },
        template: '<Selectbox />'
    }))
    .add('Textarea', () => ({
        components: { TextArea },
        template: '<TextArea />'
    }))
    .add('Label', () => ({
        components: { Label },
        template: '<Label />'
    }))
    .add('Tooltip', () => ({
        components: { Tooltip },
        template: '<Tooltip />'
    }))
    .add('DatePicker', () => ({
        components: { DatePicker },
        template: '<DatePicker />'
    }))
    .add('Alert', () => ({
        components: { Alert },
        template: '<alert />'
    }))
    .add('MultiSelect', () => ({
        components: { MultiSelect },
        template: '<MultiSelect />'
    }))
    .add('Select2', () => ({
        components: { Select2 },
        template: '<select2 />'
    }));