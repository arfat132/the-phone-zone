const searchResult = () => {
    const searchValue = document.getElementById('search-value').value;
    //  console.log('clicked')

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    fetch(url)
        .then(response => response.json())
        .then(data =>displayPhone(data.data))
    
}

const displayPhone = (data) => {
    console.log(data);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    data.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card shadow phone-card ">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto py-5" alt="...">
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <h5 class="card-title">Brand: ${phone.brand}</h5>
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
    })
}