export default () => {
    const scrollem = (elem, dir) => {
        if(!elem){return}
        let newDir=dir;
        if(dir>0){
            if(elem.scrollTop < elem.scrollHeight - elem.clientHeight-1){
                elem.scrollBy(0,1)
            }else{
                newDir=-1
            }
        }else{
            if(elem.scrollTop > 0){
                elem.scrollBy(0,-1)
            }else{
                newDir=1
            }
        }
        setTimeout(()=>scrollem(elem, newDir), 30);

      }
    
      document.addEventListener("DOMContentLoaded", ()=>{
        scrollem(document.getElementById("bus_list"));
        scrollem(document.getElementById("rail_list"));
        saySomething("Your current local conditions")
      });

      const saySomething = (text) => {
        const tsm = document.getElementById("transitstar-music");
        tsm.volume = 0.15;
        const utterThis = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterThis);
        utterThis.pitch = 0.5;
        utterThis.rate = 0.5;
        utterThis.onend = (event) => {
            tsm.volume = 1.0;
        }
      }

      console.log("HI!");
    }

    