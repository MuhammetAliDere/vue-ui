//todo: component renkleri değişkenden alınmalı
//todo: lodash componentlerini tek tek çekilmeli
String.prototype.turkishToUpper = function () {
    var string = this;
    var letters = {"i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I"};
    string = string.replace(/(([iışğüçö]))+/g, function (letter) {
        return letters[letter];
    });
    return string.toUpperCase();
};

String.prototype.turkishToLower = function () {
    var string = this;
    var letters = {"İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç"};
    string = string.replace(/(([İIŞĞÜÇÖ]))+/g, function (letter) {
        return letters[letter];
    });
    return string.toLowerCase();
};

import vButton from './components/buttons/Button.vue'
import EditButton from './components/buttons/EditButton.vue';
import DeleteButton from './components/buttons/DeleteButton.vue';
import DataTable from './components/DataTable/index.vue';
import vInput from './components/inputs/Input.vue'
import Checkbox from './components/inputs/Checkbox.vue'
import RadioButton from './components/inputs/RadioButton.vue'
import SwitchButton from './components/inputs/SwitchButton.vue'
import DatePicker from './components/inputs/DatePickerComp'
import MultiSelect from './components/inputs/MultiSelect'
import Select2 from './components/inputs/Select2.vue'
import TextArea from './components/inputs/TextArea.vue'
import vLabel from './components/Label.vue'
import Tooltip from './components/Tooltip.vue'
import FirmaOrtakYapisi from './components/FirmaOrtakYapisi.vue'
import FirmaOrtakYapisiEdit from './components/FirmaOrtakYapısıEdit.vue'
import RoleEdit from './components/RoleEdit.vue'
import CreditRotary from './components/CreditRotary'
import Modal from './components/Modal.vue'
import InputMask from './components/inputs/InputMask.vue'
import CreditDeposit from './components/CreditDeposit'
import AlinanCekler from './components/AlinanCekler/AlinanCekler.vue'
import NumberInput from './components/inputs/NumberInput.vue'
import StringInput from './components/inputs/StringInput.vue'
import AmountInput from './components/inputs/AmountInput.vue'
import FinancialPortfolio from './components/FinancialPortfolio'
import CreditDiscount from './components/CreditDiscount'

import Loading from 'vue-loading-overlay'
export {
    vButton,
    EditButton,
    DeleteButton,
    DataTable,
    vInput,
    Checkbox,
    RadioButton,
    SwitchButton,
    DatePicker,
    MultiSelect,
    Select2,
    TextArea,
    vLabel,
    Tooltip,
    FirmaOrtakYapisi,
    RoleEdit,
    FirmaOrtakYapisiEdit,
    CreditRotary,
    Modal,
    InputMask,
    CreditDeposit,
    AlinanCekler,
    NumberInput,
    StringInput,
    AmountInput,
    FinancialPortfolio,
    Loading,
    CreditDiscount
};
