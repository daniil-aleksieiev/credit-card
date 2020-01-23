import Pristine from 'pristinejs';

const form = document.getElementById('form');
const pristine = new Pristine(form);

const formValid = {
  formValidate() {
    function serialiseForm(form) {
      const input = form.getElementsByTagName("input");
      let formData = {};
      for (let i = 0; i < input.length; i++) {
        formData[input[i].name] = input[i].value;
      }
      return formData = JSON.stringify(formData);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const valid = pristine.validate();
      const dataToSend = serialiseForm(form);
      const _result = document.getElementById('result');

      console.log(`Form is valid: ${valid}`);
      _result.innerHTML = valid;

      valid ? console.log(dataToSend) : null;
    });
  }
};

export default formValid;
