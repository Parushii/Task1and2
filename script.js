let sections=document.querySelectorAll('section');
let navlinks=document.querySelectorAll('.nav-list li a');
  window.onscroll=()=>{
	sections.forEach(sec=>{
		let top=window.scrollY;
		let offset=sec.offsetTop;
		let height=sec.offsetHeight;
		let id=sec.getAttribute('id'); 

		if(top>=offset && top<offset+height){
			navlinks.forEach(links=>{
				links.classList.remove('active');
			});
			document.querySelector('.nav-list li a[href*='+id+']').classList.add('active');
		};
	});
  };

  document.querySelector('.login').addEventListener('click',()=>{
	document.querySelector('.wrapper').style.display='flex';
	window.scrollTo(0,0);
  })
  document.querySelector('.close i').addEventListener('click',()=>{
	document.querySelector('.wrapper').style.display='none';
  })



menu=document.querySelector('.menu');
navbar=document.querySelector('.navbar');
navlist=document.querySelector('.nav-list');
nav2=document.querySelector('.nav2');

menu.addEventListener('click',()=>{
	nav2.classList.toggle('vis');
	navlist.classList.toggle('vis');
	document.querySelector('.login').classList.toggle('vis');
	navbar.classList.toggle('h-nav');
})


let previewContainer=document.querySelector('.events-preview');
let previewBox=previewContainer.querySelectorAll('.preview');
let buttons=document.querySelectorAll('.buttons');
let priceBook=0;
let eventBook="";
let venue;
let date;
let selectedSeats;
let selectedSeatsCount=0;
document.querySelectorAll('.events').forEach(event=>{
	event.onclick=()=>{
		previewContainer.style.display='flex'; 
		let name=event.getAttribute('data-name')
		previewBox.forEach(preview=>{
		let target=preview.getAttribute('data-target');
		if(name==target){
			preview.classList.add('active');

			buttons.forEach(b=>{
				b.onclick=()=>{
					venue=document.querySelector('.venue').textContent;
					date=document.querySelector('.date').textContent;
					 eventBook=event.querySelector('h3').textContent;
					// console.log(eventBook);
					 priceBook=Number(event.querySelector('.price').textContent.trim().substring(2));
					priceBook=+priceBook;
					// console.log(priceBook);
					preview.classList.remove('active');
					previewContainer.style.display='none';
				}
			})

		}
		})
	}
})
previewBox.forEach(close=>{

	close.querySelector('.fa-xmark').onclick=()=>{
		close.classList.remove('active');
		previewContainer.style.display='none'; 
	}

})

let bookingContainer=document.querySelector('.bookingContainer');
let seats=document.querySelectorAll('.row .seat:not(.occupied)');
let count=document.getElementById('count');
let total=document.getElementById('total');
let eventname=document.getElementById('event-name');

function updateCount(){
	selectedSeats=document.querySelectorAll('.row .seat.selected');
	selectedSeatsCount=selectedSeats.length;

	count.innerText=selectedSeatsCount;
	total.innerText=selectedSeatsCount*priceBook;
	eventname.innerText=eventBook;
	if(selectedSeatsCount!=0){
		document.querySelector('a .book').style.display='block';
		document.querySelector('.warning').style.display='none';
	}
	else{
		document.querySelector('a .book').style.display='none';
		document.querySelector('.warning').style.display='block';
	}
}
bookingContainer.addEventListener('click',(e)=>{
	if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied')){
		e.target.classList.toggle('selected');
	}
	updateCount();
})

let book=document.querySelector('.book');
let table=document.querySelector('table');
let i=1;

book.addEventListener('click',()=>{
	table.innerHTML+=`<tr class="table-row-inside">
	<td>${i}</td>
	<td>${eventBook}</td>
	<td>${count.innerText}</td>
	<td>${venue}</td>
	<td>${date}</td></tr>`;
	i++;
	document.querySelector('.zero').style.display='none';
})
let search=document.querySelector('#search');
let eventSearch=document.querySelectorAll('.events');
let searchButton=document.querySelector('.btn.search');
searchButton.addEventListener('click',()=>{
	document.querySelector('.title3').style.display='block';
	eventSearch.forEach(e=>{
		e.style.display='none'
		if(e.querySelector('h3').textContent==search.value){
			document.querySelector('.title3').style.display='none';
			e.style.display='block';
		}
	})
})

let field=document.querySelector('.events-container');
let li=Array.from(field.children);
let select=document.getElementById('select');
let ar=[];
for(let i of li){
	const last=i.lastElementChild;
	const x=last.textContent.trim();
	const y=Number(x.substring(2));
	i.setAttribute('data-price',y);
	ar.push(i);
}
function sortingValue(){
	if(this.value=='Default'){
		while(field.firstChild){
			field.removeChild(field.firstChild);
		}
		field.append(...ar);
	}
	if(this.value==='LowToHigh'){
		sortElem(field,li,true);
	}
	if(this.value==='HighToLow'){
		sortElem(field,li,false);
	}
}
select.onchange=sortingValue;
function sortElem(field ,li,asc){
	let dm,sortLi;
	dm=asc? 1:-1;
	sortLi=li.sort((a,b)=>{
		const ax=Number(a.getAttribute('data-price'));
		const bx=Number(b.getAttribute('data-price'));
		return ax> bx ? (1*dm) : (-1*dm);
	})
	while(field.firstChild){
		field.removeChild(field.firstChild);
	}
	field.append(...sortLi);
}


