const express=require("express");
const body_parser=require("body-parser");
const https=require("https");
var latitude;
var longitude;
var location="";
var temp="";
var img_url="",description="",windspeed=0;
const app=express();

app.set("view engine","ejs");
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index",{Location:location,Temp:temp,Img_url:img_url,Description:description,WindSpeed:windspeed});
})

app.post("/",(req,res)=>{ 
    latitude=req.body.latitude;
    longitude=req.body.longitude;
    console.log(req.body.latitude);
    console.log(req.body.longitude);
    const apikey="6ec36b52be3e1347f1cf9bf07a73c37d";
    const units="metric";
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


app.listen(process.env.PORT || 5000,()=>{
    console.log("running @ 3000");
})