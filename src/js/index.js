import inputData from './components/inputData';
import formValid from './components/formValid';

document.addEventListener('DOMContentLoaded', (event) => {

  inputData.copyValue();
  inputData.creditCardMask();
  inputData.datePicker();
  formValid.formValidate();

});
