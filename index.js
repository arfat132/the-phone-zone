const searchResult = () => {
    const searchText = document.getElementById('search-value').value;
   
//fetch url
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhone(data.data.slice(0, 20)))
}

const displayPhone = (data) => {
    //Error handle
    if (data.length == false) {
        let errorDiv = document.getElementById('error-message');
        errorDiv.textContent = '';
        errorDiv.innerHTML = `No result found`;    
    }
    //load result
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const phoneData = data;
    const resultCount = document.getElementById("result-count");
    if (phoneData.length > 1) {
      resultCount.innerHTML = `${data.length} results found`;
    } else if (phoneData.length == 1) {
      resultCount.innerHTML = `${data.length} result found`;
    }
    //searchResult.textContent = '';
    data.forEach(phone => {
       // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card shadow phone-card h-100 ">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto pt-5 pb-3" alt="...">
        <div class="card-body text-center">
          <h2 class="card-title fw-bold">${phone.phone_name}</h2>
          <h5 class="card-title fw-bold text-muted">Brand: ${phone.brand}</h5>
          <button onclick="searchDetails('${phone.slug}')" class="btn text-white my-3 details-btn px-5 fs-5 fw-bold shadow" type="submit">Details</button>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
    })
}

//Details fetch url
const searchDetails = (id) => {
    window.scrollTo(0,0);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => phoneDetails(data.data));
}
//load details 
const phoneDetails = (phone) => {
    //console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML = `
    <div class="col-md-4">
    <img src="${phone.image}" class="img-fluid p-4 m-auto details-image" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h2 class="card-title fw-bold">${phone.name}</h2>
      <p class="card-text"><small class="text-muted">${phone.releaseDate ? phone.releaseDate: 'Release Date Not Available' }</small></p>
      <h5 class="card-title fw-bold">Main Features</h5>
              <h6 class="fw-bold">ChipSet: <span class="text-muted">${phone.mainFeatures?.chipSet}</span></h6>
              <h6 class="fw-bold">DisplaySize: <span class="text-muted">${phone.mainFeatures?.displaySize}</span></h6>
              <h6 class="fw-bold">Memory: <span class="text-muted">${phone.mainFeatures?.memory}</span></h6>
              <h6 class="fw-bold">Sensors: <span class="text-muted">${phone.mainFeatures?.sensors.join()}</span></h6>
              <h6 class="fw-bold">Storage: <span class="text-muted">${phone.mainFeatures?.storage}</span></h6>
      <h5 class="card-title fw-bold">Others</h5>
              <h6 class="fw-bold">Bluetooth: <span class="text-muted">${phone.others? phone.others.Bluetooth: 'Not available'}</span></h6>
              <h6 class="fw-bold">GPS: <span class="text-muted">${phone.others? phone.others.GPS: 'Not available'}</span></h6>
              <h6 class="fw-bold">NFC: <span class="text-muted">${phone?.others? phone.others.NFC: 'Not available'}</span></h6>
              <h6 class="fw-bold">Radio: <span class="text-muted">${phone?.others? phone.others.Radio: 'Not available'}</span></h6>
              <h6 class="fw-bold">USB: <span class="text-muted">${phone?.others? phone.others.USB: 'Not available'}</span></h6>
              <h6 class="fw-bold">WLAN: <span class="text-muted">${phone?.others? phone.others.WLAN: 'Not available'}</span></h6>
    </div>
  </div>
    `;
    phoneDetails.appendChild(div);

}

