// No result found function
const ResultFound = (id, property) => {
    const noResult = document.getElementById(id)
    noResult.style.display = property;
  }
  
  // button add Event listener
  document.getElementById('button').addEventListener('click', async () => {

    // capture input value
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
  
    //Clear input field
    inputField.value = '';

    // remove no result found message 
    ResultFound('result', 'none')

    // remove total search value
    ResultFound('total-search-value', 'none')

    // remove displayBook content
    const displayContainer = document.getElementById('displaybook')
    displayContainer.textContent = '';
  
    // condition
    if (inputText === '') {
      alert('Plz Write a book name...')
      return;
    }

    // Add spiners
    ResultFound('spiners', 'block')
  
    // hand clients site error
    try {

      // Call API
      const url = `http://openlibrary.org/search.json?q=${inputText}`;
      const res = await fetch(url);
      const data = await res.json();
  
      // Call function
      displayInformation(data.docs)
  
    } catch (er) {
      console.log(er)
      ResultFound('result', 'block');

      // remove spiners
      ResultFound('spiners', 'none')
    }
  })
  
  // displayInformation function
  const displayInformation = (data) => {
  
    if (data.length === 0) {

      //add  No result found Message
      ResultFound('result', 'block');

      // remove spiners
      ResultFound('spiners', 'none')
  
    } else {

      // remove No result found Message
      ResultFound('result', 'none')
    }

    // get total Array length
    const len = data.length;
  
    // set total books found result
    const totallen = document.getElementById('total');
    totallen.innerText = len;
  
    // show total search value
    ResultFound('total-search-value', 'block')
  
    // select displayBook tag 
    const displayContainer = document.getElementById('displaybook')
    displayContainer.textContent = '';
  
    // Arrray ForEaching
    data.slice(0, 9).forEach(singleData => {
  
      //Create a div tag
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
        <div class=" h-100 d-flex">
        <div>
        <img src="https://covers.openlibrary.org/b/id/${singleData.cover_i ? singleData.cover_i : 'No picture founded'}-M.jpg" class="card-img-top" alt="Book image" style = "width: 150px; height: 200px;">
        </div>
        <div class="card-body">
          <h5 class="card-title">BookName: ${singleData.title}</h5>
          <h5 class="card-title"> lekhok : ${singleData.author_name ? singleData.author_name[0]: 'Unknown author'}</h5>
          <p class="card-text"> firstPublishData ${singleData.first_publish_year ? singleData.first_publish_year: 'Unknown Year'}</p>
        </div>
      </div>`
      displayContainer.appendChild(div);

      // Remove spiners
      ResultFound('spiners', 'none')
    })
  }