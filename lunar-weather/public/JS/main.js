var latitude;
var longitude;

const successCallback=(position)=>{
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    var loc_data={"latitude":latitude,"longitude":longitude};
    var final_loc_data=JSON.stringify(loc_data);
    console.log(final_loc_data);

        
}

const errorCallback=(error)=>{
    console.error(error);
}

navigator.geolocation.getCurrentPosition(successCallback,errorCallback);