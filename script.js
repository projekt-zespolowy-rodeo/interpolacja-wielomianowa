let form = document.querySelector('.form-inline')
let year = document.getElementById('rok')
let crime_number = document.getElementById('iloscPrzestepstw')
let derivative = document.getElementById('pochodna')
let list = document.getElementById('tableBody')
var data = []
let polyniomaBox = document.getElementById('polyniomial')
form.addEventListener('submit', createList);
let input = document.querySelector('fileselector')

function readSingleFile(e) {
    document.getElementById("add").disabled = true;
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e){
        var content = e.target.result;
        displayContents(content);
    };

    reader.readAsText(file);

  }

  function displayContents(content){
    var lines = content.split(/\r\n|\n/);

    for (i=0; i<lines.length;i++){
        var number = lines[i].split(" ");
        var year = number[0];
        var crime_number = number[1];
        var deriv = number[2];
        //console.log(number[2]);
        //console.log(number[2].split(",").length)
        //var numOfDiv = number[2].split(",").length;
        //console.log(number[2].split(",")[1]);
        //var deriv = [];
        /*for(var each of number[2].split(",")){
            deriv.push(each);
        }*/
        createListFromFile(year, crime_number, deriv);
    }


  }
  
document.getElementById('file-selector').addEventListener('change', readSingleFile, false);

function deleteRow(o){

    var p = o.parentNode.parentNode;
    var year = p.childNodes[0].firstChild.nodeValue
    var crime_number = p.childNodes[1].firstChild.nodeValue
    var derivative = p.childNodes[2].firstChild.nodeValue
    for(i=0; i<data.length; i++){
        if(data[i][0]==year && data[i][1]==crime_number && data[i][2]==derivative){
            data.splice(i,1)
            console.log("Deleted values: ["+year+", "+crime_number+derivative+"]")
        } 
    }

    p.parentNode.removeChild(p);
    console.log("Array after deletion: "+data) 
    if (data.length == 0){
        document.getElementById("add").disabled = false;
    }
    polyniomaBox.innerHTML="<h1>"+""+"</h1>"
    interpolation(data)
}

function createListFromFile(year, crime_number, derivative){

     if(year != '' && crime_number !=''){
         let list_row = document.createElement('tr')
         list_row.innerHTML="<td>"+year+"</td>"+"<td>"+crime_number+"</td>"+"<td>"+derivative+"</td>"+"<td>"+"<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteRow(this);\">Usuń</button>"+"</td>"
         list.appendChild(list_row)
         var temp_table =[]
         if (derivative != ""){
            temp_table=derivative.split(",")
         }
         var temp = []
         if (temp_table.length != 0){   
         for(var element of temp_table){
         temp.push(parseInt(element))
         }
         data.push([parseInt(year), parseInt(crime_number), temp])
         }
         else{
             data.push([parseInt(year), parseInt(crime_number)])
         }
 
         console.log("Added values: ["+year+", "+crime_number+", "+derivative+"]")
         console.log("Array after addition: "+data);
         interpolation(data)
         
     }
 
     
 
 
}

function createList(e){
    e.preventDefault()

   // console.log(typeof year.value)
    if(year != '' && crime_number !=''){
        let list_row = document.createElement('tr')
        list_row.innerHTML="<td>"+year.value+"</td>"+"<td>"+crime_number.value+"</td>"+"<td>"+derivative.value+"</td>"+"<td>"+"<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteRow(this)\">Usuń</button>"+"</td>"
        list.appendChild(list_row)
        var temp_table =[]
        if (derivative.value != ""){
           temp_table=derivative.value.split(" ")
        }
        var temp = []
        if (temp_table.length != 0){
        for(var element of temp_table){
        temp.push(parseInt(element))
        }
        data.push([parseInt(year.value), parseInt(crime_number.value), temp])
        }
        else{
            data.push([parseInt(year.value), parseInt(crime_number.value)])
        }

        console.log("Added values: ["+year.value+", "+crime_number.value+", "+derivative.value+"]")
        console.log("Array after addition: "+data);

        interpolation(data)
        
    }

        

}

function interpolation(data){
    var data_cloning = []
    for (var ele of data){
        var j=0
        if (ele.length==3){
        j = ele.length-1+(ele[2].length-1)
        }
        else{
        j = ele.length-1
        }
        while(j>0){
            data_cloning.push(ele)
            j--

        }
    }
    for (var ele of data_cloning){
        console.log(ele)
    }
    b=[]
    var i=data_cloning.length-1
    var len=0
    while(i >= len){
        b.push(iloraz_roznicowa(data_cloning.slice(0,data_cloning.length-i)))
        i--
    }
    display_status(b,data_cloning)

}

function display_status(b,t){
    j=0
    napis=""
    for (var i of b){
        napis=napis+"b["+ j +"] = "+i+", "
        console.log("b["+ j++ +"] = "+i)
    }

    printPolynomial(napis)
}


function iloraz_roznicowa(data){
    if (data.length >=2 ){
        if(data[0][0]==data[data.length-1][0]){
            return(data[0][2][data.length-2]/factorial(data.length-1))
        }
        else{
            return iloraz_roznicowy_rozny(data)
        }
    }
    else{
        return data[0][1]
    }
}
function iloraz_roznicowy_rozny(data){
    return (iloraz_roznicowa(data.slice(1)) - iloraz_roznicowa(data.slice(0,data.length-1)))/(data[data.length-1][0]-data[0][0])
}

function factorial(n){
    if(n==0){
        return 1
    }
    else{
        return n * factorial(n-1)
    }
}

function printPolynomial(polyniomial){
    polyniomaBox.innerHTML="<h1>"+polyniomial+"</h1>"
}