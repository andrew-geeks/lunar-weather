var latitude;
var longitude;

const successCallback=(position)=>{
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    const loc_data={latitude,longitude};
    const options={
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(loc_data)
    };
    fetch("/",options);
           
}

const errorCallback=(error)=>{
    console.error(error);
}

navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
