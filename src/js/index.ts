import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface ISensor{
    dates : string,
    CO: string,
    NOx : string,
    ParticleLevel : string
}

//url for the rest webservice at Azure
let URI: string = "https://sensorewebapi20191117112306.azurewebsites.net/api/SensorDatas";

//create a click eventlistener at "Add" button
let GetBidButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");
GetBidButton.addEventListener('click',getAllData);




function EmptyRow():void
{
    var table:HTMLTableElement = <HTMLTableElement>document.getElementById("table")
    let row1 = table.insertRow(1)
    let celly = row1.insertCell(0)
        let celly1 = row1.insertCell(1)
        let celly2 = row1.insertCell(2)
        let celly3 = row1.insertCell(3)
                
        celly.innerHTML = "--------"
        celly1.innerHTML = "----------------------"
        celly2.innerHTML = "---------"
        celly3.innerHTML = "------------------------";

}


function PopulateTable(date:string, CO:string, NOx:string, ParticleLevel:string):void
    {
        var table:HTMLTableElement = <HTMLTableElement>document.getElementById("table")
        
        let row1 = table.insertRow(1)
    
        let celly = row1.insertCell(0)
        let celly1 = row1.insertCell(1)
        let celly2 = row1.insertCell(2)
        let celly3 = row1.insertCell(3)
                
        celly.innerHTML = date
        celly1.innerHTML = CO
        celly2.innerHTML = NOx
        celly3.innerHTML = ParticleLevel
       
    }

    function getAllData():void
    { 
          
             
                EmptyRow(); 
                axios.get<ISensor[]>(URI)
                .then(function(response:AxiosResponse<ISensor[]>){
                    response.data.forEach((eachData:ISensor) => {
                    PopulateTable(eachData.dates,eachData.CO,eachData.NOx,eachData.ParticleLevel)
                    });
                })
                .catch(function(error:AxiosError){
                    console.log(error)
                }) 
                
            
   
                    
            
    }


    