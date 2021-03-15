let globalNames = ['Um', 'Dois', 'Tres', 'Quatro', 'Cinco'];
let inputName = null;
let currentIndex = null;
let isEditing = false;

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
});

function activateInput() {
  function addName(newName) {
    // globalNames.push(newName);
    globalNames = [...globalNames, newName];
    render();
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
    render();
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        addName(event.target.value);
      }

      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      // globalNames.splice(index, 1);
      // globalNames = globalNames.filter((name, i) => {
      // if (i === index ){
      //   return false;
      // }
      // return true;
      //   return i !== index;
      // });
      globalNames = globalNames.filter((_, i) => i !== index);
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;

    span.addEventListener('click', editItem);
    return span;
  }

  var divName = document.querySelector('#names');
  divName.innerHTML = '';
  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divName.appendChild(ul);
  clearInput();
}

// function clearInput() {
//   inputName.value = '';
//   inputName.focus();
// }

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
};
