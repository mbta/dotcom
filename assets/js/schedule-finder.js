export default () => {
    let sf_interval = 0;

    window.addEventListener("load", ()=>{
        //Logic request new upcoming departures every 5s while the window is visible
       if( typeof liveSocket !== 'undefined'){
            clearInterval(sf_interval);
            sf_interval = setInterval(()=>{
                if(!document.hidden){
                    liveSocket.js().push(document.body,"refresh_departures",{})
                }
            }, 5000);
        }
       
        
    });
    //Log to sent hidden/visible state to the server so it can do smart stuff
    window.addEventListener("visibilitychange", ()=>{
        if(typeof liveSocket !== 'undefined'){
            liveSocket.js().push(document.body,"visibility_change", {value:{vis_state: document.hidden?"hidden":"visible"}})
        }
    });
    
}