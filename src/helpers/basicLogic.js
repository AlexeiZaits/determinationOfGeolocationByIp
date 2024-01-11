import "leaflet";   
import { infoIp, infoLocation, infoTimezone, infoIsp, mapCite, errorIpMessage } from "./globals";
import { handleRequest } from "./asyncLogic";

map = undefined;

function initApp(){
    attachEvents()
    getCurrentIp()

}

function getCurrentIp(){
    fetch('https://ipapi.co/json/')
    .then(response=> response.json())
    .then(data => {
        getAddress(0, data.ip)
    })
}

function attachEvents(){
    document.getElementById('inputButton')
    .addEventListener('click', getAddress);
}

function getAddress(event, ip=undefined){
    
    handleRequest(getLink(ip), 'GET')
    .then( data => {
        setInfo(data)
        setMap(data)
    })
    .catch(error => {
        console.log(error)
    })
}

function getLink(ip){
    if (ip === undefined){
        ip = validateIpv4(getIp())
    }
    
    return `https://ipgeolocation.abstractapi.com/v1/?api_key=da52ab88c5cb4efcb42bcb906b394303&ip_address=${ip}`;
}

const getIp = () => document.getElementById('input').value


function setInfo({ip_address, city, timezone, connection}){
    infoIp.textContent = ip_address
    infoLocation.textContent = city
    infoTimezone.textContent = timezone.name
    infoIsp.textContent = connection.autonomous_system_organization;
}

function setMap({longitude, latitude}){
    if (map !== undefined){
        map.remove();
    }
    
    map = L.map(mapCite).setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map);
}

function validateIpv4(ip){
    let groups = ip.split('.');
    if (groups.length !== 4){
        alert(errorIpMessage)
        throw (`Failed in ip:${ip}`)
    }
    else{
        groups.forEach(el => {
            let num = parseInt(el)
            if(num>255||num<0 || num != el){
                alert(errorIpMessage)
                throw (`Failed in ip:${ip}`)
            }
        });
    }
    return ip

}

export {initApp}