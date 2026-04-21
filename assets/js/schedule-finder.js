export default () => {
    let sf_interval = 0;

    window.addEventListener("load", ()=>{
        //Logic request new upcoming departures every 5s while the window is visible
       if(typeof refresh_input !== 'undefined'){
            clearInterval(sf_interval);
            sf_interval = setInterval(()=>{
                if(!document.hidden){
                    refresh_input.dispatchEvent(
                        new Event("change", {bubbles:true})
                    );
                }
            }, 5000);
        }
       
        
    });
    //Log to sent hidden/visible state to the server so it can do smart stuff
    window.addEventListener("visibilitychange", ()=>{
        if(typeof vis_state !== 'undefined'){
            vis_state.value = document.hidden?"hidden":"visible"
            vis_state.dispatchEvent(
                new Event("change", {bubbles:true})
            );
        }
    });
    
}