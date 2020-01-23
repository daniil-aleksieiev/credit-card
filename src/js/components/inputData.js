import flatpickr from 'flatpickr';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';

function copyText(input, output) {
  input.onkeyup = function () {
    output.innerHTML = this.value;
  };
}

const inputData = {
  copyValue() {
    const _cardHolderInput = document.getElementById('card-holder-name');
    const _cardHolderOutput = document.getElementById('holder');

    const _cardNumberInput = document.getElementById('card-number-input');
    const _cardNumberOutput = document.getElementById('card-number');

    const _cardCodeInput = document.getElementById('cvc-input');
    const _cardCodeOutput = document.getElementById('cvc');

    copyText(_cardHolderInput, _cardHolderOutput);
    copyText(_cardNumberInput, _cardNumberOutput);
    copyText(_cardCodeInput, _cardCodeOutput);

  },
  datePicker() {
    flatpickr('#card-expires', {
      dateFormat: 'Y-m',
      minDate: 'today',
      defaultDate: 'today',
      plugins: [
        new monthSelectPlugin({
          shorthand: true,
          dateFormat: "m/y",
          altFormat: "F Y",
          theme: "dark"
        })
      ],
      onReady: function(selectedDates, dateStr) {
        const _cardExpiresDate = document.getElementById('expires');
        _cardExpiresDate.innerHTML = dateStr;
      },
      onChange: function(selectedDates, dateStr) {
        const _cardExpiresDate = document.getElementById('expires');
        _cardExpiresDate.innerHTML = dateStr;
      },
    });
  },
  creditCardMask() {
    const input = document.getElementById('card-number-input');
    const regex = new RegExp(/^\d{0,16}$/g);
    let oldValue;
    let oldCursor;

    const mask = (val) => {
      const output = [];
      for (let i = 0; i < val.length; i++) {
        if (i !== 0 && i % 4 === 0) {
          output.push(' ');
        }
        output.push(val[i]);
      }
      return output.join('');
    };

    const unmask = (val) => {
      const output = val.replace(new RegExp(/[^\d]/, 'g'), ''); // Remove every non-digit character
      return output;
    };

    const checkSeparator = (position, interval) => {
      return Math.floor(position / (interval + 1));
    };

    const keydownHandler = (e) => {
      oldValue = e.target.value;
      oldCursor = e.target.selectionEnd;
    };

    const inputHandler = (e) => {
      const el = e.target;
      let newCursorPosition;
      let newValue = unmask(el.value);

      if (newValue.match(regex)) {
        newValue = mask(newValue);
        newCursorPosition = oldCursor - checkSeparator(oldCursor, 4) + checkSeparator(oldCursor + (newValue.length - oldValue.length), 4) + (unmask(newValue).length - unmask(oldValue).length);

        newValue !== '' ? el.value = newValue : el.value = '';
      } else {
        el.value = oldValue;
        newCursorPosition = oldCursor;
      }
      el.setSelectionRange(newCursorPosition, newCursorPosition);
    };

    input.addEventListener('keydown', keydownHandler );
    input.addEventListener('input', inputHandler );
  }
};

export default inputData;
