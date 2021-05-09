
console.log(JSON.parse(localStorage.getItem("likedItems")));

function likeThisItem(event){
	if(localStorage.getItem("likedItems")===null){
		localStorage.setItem("likedItems", JSON.stringify([]));
	}
	let arr = JSON.parse(localStorage.getItem("likedItems"));
	let target = event.target;
	let parent = target.parentNode;
	let id = parent.getAttribute("id");
	if(!target.classList.contains("icon")){
		return;
	}
	if(arr.includes(id)){
		target.style.cssText = "background-color: transparent";
		let index = arr.indexOf(id);
		arr.splice(index, 1);
		localStorage.setItem("likedItems", JSON.stringify(arr));
		console.log(JSON.parse(localStorage.getItem("likedItems")));
	}
	else{
		console.log(arr);
		arr.push(id);
		localStorage.setItem("likedItems", JSON.stringify(arr));
		console.log(JSON.parse(localStorage.getItem("likedItems")));
		target.style.cssText = "background-color: pink";
		console.log('clicked');
	}
	
}


const iconUrl = "html/favourite.png";


async function loadJson() {
  const response = await fetch('http://localhost:3000/menu/load'); 
  const json = await response.json();
  let menu = json;
	

	let gallery = document.querySelector("#grid-container");
	gallery.innerHTML = "";
	function addCakes() {
		if(localStorage.getItem("likedItems")===null){
		localStorage.setItem("likedItems", JSON.stringify([]));
	}
		let arr = JSON.parse(localStorage.getItem("likedItems"));
		for(let cake of menu){
			let item = document.createElement('div');
			item.classList.add('grid-item');
			item.setAttribute("id", `${cake._id}`);
			
			item.innerHTML += `<img onclick="openItem('${cake._id}')" class="photo" src="${cake.src}"><p>${cake.name}</p><p>$${cake.price}</p>`;
			
			if(arr.includes(cake._id)){
				item.innerHTML += `<img onclick="likeThisItem(event)" style="background-color: pink" class="icon" src="${iconUrl}"/>`

			}
			else{
				item.innerHTML += `<img onclick="likeThisItem(event)" class="icon" src="${iconUrl}"/>`
			}
			
			gallery.appendChild(item);
		}
		
	}

	addCakes();
	
}
loadJson();


async function loadFilter() {

	let selected = document.getElementById("category");
	let nameField = document.getElementById("productName");
	let result = selected.value;
	let nameValue = nameField.value;
	console.log(nameValue);
	console.log(result);
	
		if(nameValue === "" && result === "all"){

			loadJson();
			return;
		}
		else{
			const response = await fetch(`http://localhost:3000/menu/${result}/${nameValue}`); 
			  const json = await response.json();
			  let menu = json;
				

				let gallery = document.querySelector("#grid-container");
				gallery.innerHTML = "";
				function addCakes() {
					let arr = JSON.parse(localStorage.getItem("likedItems"));
					for(let cake of menu){
						let item = document.createElement('div');
						item.classList.add('grid-item');
						item.setAttribute("id", `${cake._id}`);
						
						item.innerHTML += `<img onclick="openItem('${cake._id}')" class="photo" src="${cake.src}"><p>${cake.name}</p><p>$${cake.price}</p>`;
						
						if(arr.includes(cake._id)){
							item.innerHTML += `<img onclick="likeThisItem(event)" style="background-color: pink" class="icon" src="${iconUrl}"/>`

						}
						else{
							item.innerHTML += `<img onclick="likeThisItem(event)" class="icon" src="${iconUrl}"/>`
						}
						gallery.appendChild(item);
					}
					
				}

				addCakes();
				return;

		}	
}
