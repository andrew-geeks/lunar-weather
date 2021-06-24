const express=require("express");
const body_parser=require("body-parser");
const https=require("https");
var latitude;
var longitude;

const app=express();

app.set("view engine","ejs");
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index");
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
            const Temp=weatherData.main.temp;
            const description=weatherData.weather[0].description;
            const location=weatherData.name;
            const icon=weatherData.weather[0].icon;
            const img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(Temp,description,location);
            //console.log(icon);
            //res.write("<h1>Temperature at "+query+": "+Temp+" degree celsius</h1>");
            //res.write("<h2>Weather Description: "+description+"</h2>");
            //res.write("<img src="+img_url+">");
            
            
        })
    })

})


app.listen(3000,()=>{
    console.log("running @ 3000");
})