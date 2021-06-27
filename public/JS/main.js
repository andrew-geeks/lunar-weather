var latitude;
var longitude;
var load_number=0;

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
    if(sessionStorage.getItem("load_number")==null){
        setTimeout(() => {
            location.reload();
            load_number++;
            sessionStorage.setItem("load_number",load_number);
        }, 800);
        
    }
    else{

    }
              
}

const errorCallback=(error)=>{
    console.error(error);
}


navigator.geolocation.getCurrentPosition(successCallback,errorCallback);


window.addEventListener('beforeunload', function (e) {
    this.sessionStorage.removeItem("load_number");
});