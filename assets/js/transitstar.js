export default () => {
    const scrollem = (elem, dir) => {
        if(!elem){return}
        let newDir=dir;
        if(dir>0){
            if(elem.scrollTop < elem.scrollHeight - elem.clientHeight){
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
        scrollem(document.getElementById("bus_list"))
        scrollem(document.getElementById("rail_list"))
      });

      console.log("HI!");
    }