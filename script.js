function cambiarEstilo(estilo) {
    var elemento = document.getElementById("elemento");
  
    elemento.classList.remove("estilo1");
    elemento.classList.remove("estilo2");
    elemento.classList.remove("estilo3");
  
    if (estilo === 1) {
      elemento.classList.add("estilo1");
    } else if (estilo === 2) {
      elemento.classList.add("estilo2");
    } else if (estilo === 3) {
      elemento.classList.add("estilo3");
    }
  }
  

  
  
  
  
  
  
  