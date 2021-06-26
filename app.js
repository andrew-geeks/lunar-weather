const express=require("express");
const body_parser=require("body-parser");
const https=require("https");
const http=require("http");
var latitude;
var longitude;
var location="",location1="Hong Kong",location3="London";
var temp="",temp1="",temp3="";
var img_url="",img_url1="",img_url3="";
var description="",description1="",description3="";
var windspeed=0,windspeed1=0,windspeed3=0;
const apikey="6ec36b52be3e1347f1cf9bf07a73c37d";
const units="metric";
const url1="http://api.openweathermap.org/data/2.5/weather?q="+location1+"&appid="+apikey+"&units="+units;
const url3="http://api.openweathermap.org/data/2.5/weather?q="+location3+"&appid="+apikey+"&units="+units;

const app=express();

app.set("view engine","ejs");
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(express.static("public"));



app.get("/",(req,res)=>{
    const url1="http://api.openweathermap.org/data/2.5/weather?q="+location1+"&appid="+apikey+"&units="+units;
    http.get(url1,function(response){
        //console.log(response);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            temp1=weatherData.main.temp;
            description1=weatherData.weather[0].description;
            location1=weatherData.name;
            const icon=weatherData.weather[0].icon;
            windspeed1=parseInt(weatherData.wind.speed)*3.6;
            img_url1="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log("BOX1:",temp1,description1,location1);
            
        })   
    })


    res.render("index",{Location:location,Temp:temp,Img_url:img_url,Description:description,WindSpeed:windspeed,Location1:location1,Temp1:temp1,Img_url1:img_url1,Description1:description1,WindSpeed1:windspeed1});
})

app.post("/",(req,res)=>{ 
    latitude=req.body.latitude;
    longitude=req.body.longitude;
    console.log(req.body.latitude);
    console.log(req.body.longitude);
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+apikey+"&units="+units;
    https.get(url,function(response){
        //console.log(response);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            temp=weatherData.main.temp;
            description=weatherData.weather[0].description;
            location=weatherData.name;
            const icon=weatherData.weather[0].icon;
            windspeed=parseInt(weatherData.wind.speed)*3.6;
            img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(temp,description,location);
            
        })   
    })
    res.send({ redirectTo: '/' });
    


})


app.listen(process.env.PORT || 3000,()=>{
    console.log("running @ 3000");
})