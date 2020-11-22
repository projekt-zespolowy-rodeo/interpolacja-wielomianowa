let form = document.querySelector('.form-inline')
let year = document.getElementById('rok')
let crime_number = document.getElementById('iloscPrzestepstw')
let derivative = document.getElementById('pochodna')
let list = document.getElementById('tableBody')
var data = []
let polyniomaBox = document.getElementById('polyniomial')
form.addEventListener('submit', createList);

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

}

function createList(e){
e.preventDefault();

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

        if(data.length==2)
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
    for (var i of b){
        console.log("b["+ j++ +"] = "+i)
    }
    lista_znakow=[]
    if ((b[0]-b[1]*t[0][0]+b[2]*t[0][0]*t[1][0]+b[3]*t[0][0]*t[2][0]-
        b[3]*t[0][0]*t[1][0]*t[2][0])>= 0){
        lista_znakow.push("+")
    }
    else{
        lista_znakow.push("")
    }
    if (b[1]-b[1]*t[1][0]-b[2]*t[0][0]+b[3]*t[1][0]*t[2][0] >= 0){
        lista_znakow.push("+")
    }
    else{
        lista_znakow.push("")
    }
    if (b[2]-t[2][0]*b[3]-b[3]*t[1][0]>=0){
        lista_znakow.push("+")
    }
    else{
        lista_znakow.push("")
    }

    var polynomial  = "P(x) = "+(b[3])+"(x^3) "+lista_znakow[2]+" "+(b[2]-t[2][0]*b[3]-b[3]*t[1][0]-t[0][0]*b[3])+"(x^2) "+lista_znakow[1]+
    " "+(b[1]-b[1]*t[1][0]-b[2]*t[0][0]+b[3]*t[1][0]*t[2][0])+"x "+lista_znakow[0]+" "+(b[0]-b[1]*t[0][0]+b[2]*t[0][0]*t[1][0]+b[3]*t[0][0]*t[2][0]-
    b[3]*t[0][0]*t[1][0]*t[2][0])

    printPolynomial(polynomial)


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