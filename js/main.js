const APIKey = 'e498f5fcc919103ad775d5f465bb11cb'
const clientID = 'OxxenqGp-v17-ZAng4I8X3kUpqrFnG2gLKxWFAtRjas'
let form = document.querySelector('#inform')

const getWeather = async () => {
    let city = document.querySelector('#city').value
    let zip = document.querySelector('#zip').value
    console.log(city)
    console.log(zip)

    /**
     * 
     * @param {*} loc -- Given input for the image search
     * @returns Random regular sized image returned by Unsplash based on the city name 
     */
    let locPhoto = async (loc) => {
        
        let locR = new Request (`https://api.unsplash.com/photos/random?query=${loc}&orientation=landscape&client_id=${clientID}`)
        console.log(locR)
        var resp = await fetch(locR)
        if (resp.status == 200){
            let respo = await resp.json()
            console.log(respo)
            let pUrl = respo.urls.regular
            console.log(pUrl)
            return pUrl
        } else{
            console.log(`Unsplash Error: ${resp.status}`)
        }
        
    }
    if ((city=="") && (zip=="")){
        const getLoc = async () => {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(getCurrPos)
            } else {
                alert("Geolocation not supported!")
            }
        }
        const getCurrPos = async (pos) => {
            let lat = pos.coords.latitude;
            let long = pos.coords.longitude;
            console.log(lat)
            console.log(long)
            let r = new Request(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}`)
            console.log(r)          
            var res = await fetch(r)
            console.log(res)

            if (res.status == 200){
    
            
                let response = await res.json()
                console.log(response)
                
                let fCurrent = Math.floor((response.main.temp - 273.15) * (9/5) + 32) 
                let fHigh = Math.floor((response.main.temp_max - 273.15) * (9/5) + 32 )
                let fLow = Math.floor((response.main.temp_min - 273.15) * (9/5) + 32 )
                let fFeel = Math.floor((response.main.feels_like - 273.15) * (9/5) + 32 )
                let fhumidity = response.main.humidity
                let fFore = response.weather[0].main
                let fCity = response.name
                let fIcon = response.weather[0].icon

                let photo = await locPhoto(fCity)
                console.log(photo)
                document.querySelector('#top').style.backgroundImage = `url('${photo}')`

                console.log(fIcon)
                document.querySelector('#high').innerHTML = `High: ${fHigh}°F`
                document.querySelector('#low').innerHTML = `Low: ${fLow}°F`
                document.querySelector('#current').innerHTML = `Current: ${fCurrent}°F`
                document.querySelector('#fore').innerHTML = `Forecasts: ${fFore}`
                document.querySelector('#humid').innerHTML = `Humidity: ${fhumidity}%`
                document.querySelector('#city-name').innerHTML = `City: ${fCity}`
                document.querySelector('#feel').innerHTML = `Feels Like: ${fFeel}°F`
        
                document.querySelector('.InfoBox').style.backgroundColor = "#2a69dc"
                document.querySelector('.InfoBox').style.backgroundImage = `url('http://openweathermap.org/img/w/${fIcon}.png')`
            } else {
                alert(` Error Code: ${res.status}`)
            }
        };
        getLoc()
    } else {
        if ((city != "") && (zip == "")){
            var r = new Request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
    
        } else if ((zip != "") && (city == "")){
            var r = new Request(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${APIKey}`)
    
        } else if ((zip != "") && (city !="")){
            var r = new Request(`https://api.openweathermap.org/data/2.5/weather?q=${city},zip=${zip}&appid=${APIKey}`)
            
        } else {
            
        }
        var res = await fetch(r)
        console.log(res)
        if (res.status == 200){
    
            
            let response = await res.json()
            console.log(response)
    
            let fCurrent = Math.floor((response.main.temp - 273.15) * (9/5) + 32) 
            let fHigh = Math.floor((response.main.temp_max - 273.15) * (9/5) + 32 )
            let fLow = Math.floor((response.main.temp_min - 273.15) * (9/5) + 32 )
            let fFeel = Math.floor((response.main.feels_like - 273.15) * (9/5) + 32 )
            let fhumidity = response.main.humidity
            let fFore = response.weather[0].main
            let fCity = response.name
            let fIcon = response.weather[0].icon
            let photo = await locPhoto(fCity)
            console.log(photo)
            console.log(fIcon)
            
            document.querySelector('#top').style.backgroundImage = `url('${photo}')`        
            document.querySelector('#high').innerHTML = `High: ${fHigh}°F`
            document.querySelector('#low').innerHTML = `Low: ${fLow}°F`
            document.querySelector('#current').innerHTML = `Current: ${fCurrent}°F`
            document.querySelector('#fore').innerHTML = `Forecasts: ${fFore}`
            document.querySelector('#humid').innerHTML = `Humidity: ${fhumidity}%`
            document.querySelector('#city-name').innerHTML = `City: ${fCity}`
            document.querySelector('#feel').innerHTML = `Feels Like: ${fFeel}°F`
    
            document.querySelector('.InfoBox').style.backgroundColor = "#2a69dc"
            document.querySelector('.InfoBox').style.backgroundImage = `url('http://openweathermap.org/img/w/${fIcon}.png')`
        } else {
            alert(` Error Code: ${res.status}`)
        }
    }  
} 