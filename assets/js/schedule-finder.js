export default () => {
    let sf_interval = 0;

    window.addEventListener("load", ()=>{
       if(sfhack){
            clearInterval(sf_interval);
            sf_interval = setInterval(()=>{
                if(!document.hidden){
                    sfhack.dispatchEvent(
                        new Event("change", {bubbles:true})
                    );
                }
            }, 5000);
        }
    });
}