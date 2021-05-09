async function loadJson(){
	const response = await fetch('http://localhost:3000/admin/load');
	const json = await response.json();
	let menu = json;
	let list = document.querySelector("#menu");
	list.innerHTML = "";
	function addCakes() {

		for(let cake of menu){
			let item = document.createElement('div');
			item.classList.add('menu-item');
			if(cake.isShown === false){
				item.style.opacity = "0.3";
			}
			item.innerHTML += `<img class="menu-photo" src="${cake.src}"><div class="menu-name">${cake.name}</div>`;
			item.innerHTML += `<button onclick="updateItem('${cake._id}')" class="update">Update</button>
								<button onclick="deleteItem('${cake._id}')" class="delete">Delete</button>
								<button onclick="retriveItem('${cake._id}')"class="retrive">Retrive</button>`;
			list.appendChild(item);
		}
		
	}

	addCakes();
}
 loadJson();

let modal = document.getElementById("my_modal");
let btn = document.getElementById("btn_modal_window");
//let upd_modal = document.getElementById("update_modal");

function updateItem(id){
	modal.style.display = "block";
	
	fetch('http://localhost:3000/admin').then((response) => {return response.json();}).then((data) => {
    let menu = data;
    
	  for(let cake of menu){
	  	if(cake._id===id){
	  		
	  		document.getElementById("name").value = `${cake.name}`;
	  		document.getElementById("price").value = `${cake.price}`;
	  		document.getElementById("src").value = `${cake.src}`;
	  		document.getElementById("description").value = `${cake.description}`;
	  		document.getElementById("category").value = `${cake.category}`;
	  	}
	  }
	  console.log(id);
	    let parent = document.querySelector(".modal_content");
		
	  if(!document.getElementById("updButton")){
		parent.removeChild(document.getElementById("createButton"));
		let updBt = document.createElement('button');
		updBt.setAttribute("type", "button");
		updBt.setAttribute("id", "updButton");
		updBt.setAttribute("onclick", `updateButton('${id}')`);
		updBt.innerHTML = "Update";
		parent.appendChild(updBt);
	  }
	  else if(document.getElementById("updButton")){
	  	parent.removeChild(document.getElementById("updButton"));
		let updBt = document.createElement('button');
		updBt.setAttribute("type", "button");
		updBt.setAttribute("id", "updButton");
		updBt.setAttribute("onclick", `updateButton('${id}')`);
		updBt.innerHTML = "Update";
		parent.appendChild(updBt);
	  }
	  	
	
	
});
}

 btn.onclick = function () {
    modal.style.display = "block";
    let parent = document.querySelector(".modal_content");
    if(!document.getElementById("createButton")){
    	parent.removeChild(document.getElementById("updButton"));
    	let crBt = document.createElement('button');
    	crBt.setAttribute("onclick", "createItem()");
	crBt.setAttribute("type", "button");
	crBt.setAttribute("id", "createButton");
	
	crBt.innerHTML = "Submit";
	parent.appendChild(crBt);
    }
 }

 window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function createItem(){
			 		  		
	let name = document.getElementById("name");
	let price = document.getElementById("price");
	let src = document.getElementById("src");
	let description = document.getElementById("description");
	let category = document.getElementById("category");

	const data = {
		name: name.value,
		price: price.value,
		src: src.value,
		description: description.value,
		category: category.value,
	};

	
	$.ajax({
	  type: "POST",
	  url: `http://localhost:3000/admin`,
	  data: JSON.stringify(data),
	  success: function(result) {
	  	console.log(data);
        loadJson();
    }, 
      error: function(error){
      	console.log(error);
      },
	  contentType: 'application/json'
	});
	
}

function deleteItem(id){
	
	$.ajax({
    url: `http://localhost:3000/admin/${id}`,
    crossDomain: true,
    type: 'DELETE',
    success: function(result) {
        loadJson();
    }
});
}

function retriveItem(id){
	
	$.ajax({
    url: `http://localhost:3000/admin/retrive/${id}`,
    crossDomain: true,
    type: 'PUT',
    success: function(result) {
        loadJson();
    }
});
}

function updateButton(id){
	let name = document.getElementById("name");
	let price = document.getElementById("price");
	let src = document.getElementById("src");
	let description = document.getElementById("description");
	let category = document.getElementById("category");

	const data = {
		name: name.value,
		price: price.value,
		src: src.value,
		description: description.value,
		category: category.value,
	};

	
	$.ajax({
	  type: "PUT",
	  url: `http://localhost:3000/admin/update/${id}`,
	  data: JSON.stringify(data),
	  success: function(result) {
	  	console.log(data);
        loadJson();
    }, 
      error: function(error){
      	console.log(error);
      },
	  contentType: 'application/json'
	});
	
	
}
