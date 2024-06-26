// Data First
const title = document.getElementById('title');
const count = document.getElementById('count');
const category = document.getElementById('category');
// Data Take After Function
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount  =  document.getElementById('discount');
const total = document.getElementById('total');
// Btn Create Data In Element HTML
const create = document.getElementById('submit');
// This Search
const inpSearch = document.getElementById('search');
const btnSearchTitle = document.getElementById('searchTiltle');
const btnSearchCategory = document.getElementById('searchCategory');
// Btn Delete This Make By Function
const DeleteAll = document.getElementById('deleteAll');
// TBody
const tbody = document.getElementById('tbody');
// Massage
const messege = document.querySelector('.message-content');

// catch element
const localSize = document.getElementById('localsize');
const localSizeContainer = document.getElementById("localSizeContainer")
// make 3 values

let SizeLocalFi = 0; // This Size

let checkLocalStorage; // This Use To Check Local Storage To Give Me Size

let TakeResultSize; // This Value Work To Take Result From CheckLocalStorage And Make Opration About It



// data array
let database = [];
// check data if is exist in local or no
if(localStorage.database != null){
    database = JSON.parse(localStorage.database);
}

// change values 
let indexi = '';
let modeBTN = 'create';



// make Function Check Size

function checkSize() {

    // make loop for local storage
    for(checkLocalStorage in localStorage){

        // Check If not Local has own property for checkLocalStorage 
        if(!localStorage.hasOwnProperty(checkLocalStorage)){
            continue;
        }

        // Use TakeResultSize 
        
        TakeResultSize = ((localStorage[checkLocalStorage].length + checkLocalStorage.length) * 2);

        SizeLocalFi += TakeResultSize;
        
        ResLocal()

    }

    
}

// make Result

function ResLocal() {
      // this size fixed
      let sizeFixed = (SizeLocalFi/1024).toFixed(2)
      let MBSIZE = (sizeFixed/1024).toFixed(2);
  
      if(sizeFixed >= 1024){
          localSize.innerHTML = 'size is: ' + MBSIZE+'MB' + ' <span class="alert">Alert!!</span>';
      }
      else if(sizeFixed >= 200){
          localSize.innerHTML = 'size is: ' + sizeFixed+'KB' + ' <span class="warning">Warning!!</span>';
      }
      else{
          localSize.innerHTML = 'size is: ' + sizeFixed+'KB';
      }
  
}


// [1] Make A Calc Price Data.
function CalcNum(){
    let Num = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = Num;
}
// [2] Collection Data In Object And To Array Thin Save In Local.
function Datastr(){
    let dataObj = {
        title: title.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value
    }

   if(modeBTN == 'create'){
    database.unshift(dataObj);
    localStorage.setItem('database',    JSON.stringify(database)   );
   } else {
        database[indexi] = dataObj;
        modeBTN = 'create'
        create.innerHTML = 'create';
        localStorage.setItem('database',    JSON.stringify(database)   );
        massage('Change Successful')

   }
    
}

// clean Input
function cleanInp(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    count.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
}
// [3] Show This Data
function showdata(){
    let v = '';
    let mode = true;
    for(let i = 0;i < database.length;i++){
        if(mode){
            v += `
            <tr class="color">
                <td>${i+1}</td>
                <td>${database[i].title}</td>
                <td>${database[i].category}</td>
                <td>${database[i].count}</td>
                <td>${database[i].total}</td>
                <td>${database[i].total*database[i].count}</td>
                <td><button onclick='ChangeData(${i})'>Change</button></td>
                <td><button onclick='DeleteEl(${i})'>Delete</button></td>
                <td><button onclick='DeleteOnce(${i})'>Delete One</button></td>
            </tr>
            `;
            mode = false;
        }else{
            v += `
            <tr class="">
                <td>${i+1}</td>
                <td>${database[i].title}</td>
                <td>${database[i].category}</td>
                <td>${database[i].count}</td>
                <td>${database[i].total}</td>
                <td>${database[i].total*database[i].count}</td>
                <td><button onclick='ChangeData(${i})'>Change</button></td>
                <td><button onclick='DeleteEl(${i})'>Delete</button></td>
                <td><button onclick='DeleteOnce(${i})'>Delete One</button></td>
            </tr>
            `;
            mode = true;
        }
    }
    tbody.innerHTML = v;
    
}

// [4] Output Massage To Data Is Save Local 
function massage(text){
    let li = document.createElement('li');
    let div = document.createElement('div');
    let h5 = document.createElement('h5');
    let time = document.createElement('p');
    let span = document.createElement('span');
    let span2 = document.createElement('span');

    



    let date = new Date();
    let days = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    time.innerHTML = days+'/'+month+"/"+year+' '+hour+':'+min+':'+sec;
    h5.innerHTML = text;


    div.classList.add('cont');
    h5.classList.add('text');
    time.classList.add('time');
    span.classList.add('close');

    div.appendChild(h5);
    div.appendChild(time);
    span.appendChild(span2);
    li.appendChild(div);
    li.appendChild(span);

    messege.appendChild(li);
    li.classList.add('eff');

    setTimeout(function(){
        li.classList.remove('eff');
        setTimeout(function(){
            li.classList.add('Ceff');
            setTimeout(function(){
                li.remove()
            },800);
        },5000);
    },800);

   
  span2.onclick = function() {
    li.classList.add('Ceff');
    setTimeout(function(){
        li.remove()
    },800);
  }
}


// [5] Change Data 
function ChangeData(index){
    title.value = database[index].title;
    price.value = database[index].price;
    taxes.value = database[index].taxes;
    ads.value = database[index].ads;
    discount.value = database[index].discount;
    total.innerHTML = database[index].total;
    count.value = database[index].count;
    category.value = database[index].category;
    create.innerHTML = 'change';
    indexi = index;
    modeBTN = 'change';
    massage('Change Is Ready For Col '+(index+1));
}
// [6] Delete Data
function DeleteEl(index){
    database.splice(index,1);
    localStorage.database = JSON.stringify(database);
    showdata();
    massage('Delete Element SuccessFul');
    checkDelete();
    massage("Size local Storage Is : "+(SizeLocalFi/1024).toFixed(2)+"KB");
}

function DeleteOnce(i){
    if(database[i].count > 1){
        database[i].count--;
        localStorage.database = JSON.stringify(database);
        showdata()
        massage('Delete One Count SuccessFul');
    }else {
        DeleteEl(i);
    }
}

function checkDelete(){
    if(database.length > 1){
        DeleteAll.innerHTML = `
        <button onclick='DeleteAllFun()'>delete all</button>
        `;
    } else { DeleteAll.innerHTML = '';}
}

function DeleteAllFun(){    
    database.splice(0);
    localStorage.database = JSON.stringify(database);
    showdata();
    massage('Delete All Is Successful..');
    checkDelete();
    checkSize();
    massage("Size local Storage Is : "+(SizeLocalFi/1024).toFixed(2)+"KB");
    location.reload();
}



// [7] Search In Table Or Array

let ModeSearchNow = 'Title';

function modeSearch(c){
    inpSearch.placeholder = 'Search About Product '+c;


    if(c == 'Title'){
        ModeSearchNow = 'Title';
    } else {
        ModeSearchNow = 'Category';
    }

}

function Search(v){
    let Result = '';
    let mode = true;
    if(ModeSearchNow == 'Title'){
        for(let i = 0;i < database.length;i++){
            if(database[i].title.toLowerCase().includes(v.toLowerCase())){
                if(mode){
                    Result += `
                    <tr class="color">
                        <td>${i+1}</td>
                        <td>${database[i].title}</td>
                        <td>${database[i].category}</td>
                        <td>${database[i].count}</td>
                        <td>${database[i].total}</td>
                        <td>${database[i].total*database[i].count}</td>
                        <td><button onclick='ChangeData(${i})'>Change</button></td>
                        <td><button onclick='DeleteEl(${i})'>Delete</button></td>
                        <td><button onclick='DeleteOnce(${i})'>Delete One</button></td>
                    </tr>
                    `;
                    three = database;
                    mode = false;
                }else{
                    Result += `
                    <tr class="">
                        <td>${i+1}</td>
                        <td>${database[i].title}</td>
                        <td>${database[i].category}</td>
                        <td>${database[i].count}</td>
                        <td>${database[i].total}</td>
                        <td>${database[i].total*database[i].count}</td>
                        <td><button onclick='ChangeData(${i})'>Change</button></td>
                        <td><button onclick='DeleteEl(${i})'>Delete</button></td>
                        <td><button onclick='DeleteOnce(${i})'>Delete One</button></td>
                    </tr>
                    `;
                   
                    mode = true;
                }
            } else {
               
                showdata();
            }
        } 
        tbody.innerHTML = Result;
    } else {
        for(let i = 0;i < database.length;i++){
            if(database[i].category.toLowerCase().includes(v.toLowerCase())){
                if(mode){
                    
                    Result += `
                    <tr class="color">
                        <td>${i+1}</td>
                        <td>${database[i].title}</td>
                        <td>${database[i].category}</td>
                        <td>${database[i].count}</td>
                        <td>${database[i].total}</td>
                        <td>${database[i].total*database[i].count}</td>
                        <td><button onclick='ChangeData(${i})'>Change</button></td>
                        <td><button onclick='DeleteEl(${i})'>Delete</button></td>
                        <td><button onclick='DeleteOnce(${i})'>Delete One</button></td>
                    </tr>
                    `;
                    mode = false;
                }else{
                    Result += `
                    <tr class="">
                        <td>${i+1}</td>
                        <td>${database[i].title}</td>
                        <td>${database[i].category}</td>
                        <td>${database[i].count}</td>
                        <td>${database[i].total}</td>
                        <td>${database[i].total*database[i].count}</td>
                        <td><button onclick='ChangeData(${i})'>Change</button></td>
                        <td><button onclick='DeleteEl(${i})'>Delete</button></td>
                        <td><button onclick='DeleteOnce(${i})'>Delete One</button></td>
                    </tr>
                    `;
                    mode = true;
                }
            } else {
                showdata();
            }
        } 
        tbody.innerHTML = Result;
    }
}


// Events

price.onkeyup = function(){
    CalcNum();
}

taxes.onkeyup = function(){
    CalcNum();
}

ads.onkeyup = function(){
    CalcNum();
}

discount.onkeyup = function(){
    CalcNum();
}

create.onclick = ()=>{
    Datastr();
    cleanInp();
    showdata();
    if(modeBTN == 'create'){
        massage('Create Successful');
    }
    checkDelete();
    massage("Size local Storage Is : "+(SizeLocalFi/1024).toFixed(2)+"KB");
}

btnSearchTitle.onclick = function(){
    modeSearch('Title');
}

btnSearchCategory.onclick = function(){
    modeSearch('Category')
}



window.onload = function(){
    checkDelete();
    showdata();
    checkSize();
    massage("Size local Storage Is : "+(SizeLocalFi/1024).toFixed(2)+"KB");
}

