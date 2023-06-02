// Colocar esto al inicio de su archivo script.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'
import {getDatabase, ref, onValue, update, push,child}  from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIzX-fbCglMVcFyx73U8zkKDPityzEzg8",
  authDomain: "mexico2023a-cfdd9.firebaseapp.com",
  projectId: "mexico2023a-cfdd9",
  storageBucket: "mexico2023a-cfdd9.appspot.com",
  messagingSenderId: "267563407373",
  appId: "1:267563407373:web:1458d05d094d3ec216dd44",
  measurementId: "G-SWNVS0KVWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  var nombreus = document.getElementById("nombreus");
  var btniniciar = document.getElementById("btniniciar");
  var btnsalir = document.getElementById("btnsalir");
  var textomensaje = document.getElementById("textomensaje");
  var mensajesChat= document.getElementById("mensajesChat")
  var  usuarioconectado = "";
 

 btniniciar.onclick = async function () {
    var auth = getAuth();
    var providor = new GoogleAuthProvider();
    auth.languageCode = 'es';
    var response = await signInWithPopup(auth, providor);
    nombreus.innerText = response.user.email;
    btniniciar.style.display = "none";
    btnsalir.style.display = "flex";
    usuarioconectado =response.user.email;
    escucharYDibujarMensajes();

  }

btnsalir.onclick = async function () {
    var auth = getAuth();
    await auth.signOut();
    btniniciar.style.display = "flex";
    btnsalir.style.display = "none";
    nombreus.innerText = "No autenticado";
    usuarioconectado = ""

}


textomensaje.onkeydown = async function (evento){
    if (evento.key == "Enter") {
        if (usuarioconectado == ""){
          alert ("El usurio necesita iniciar secion");  
          return;
        }  
        var db =getDatabase();
        var referenciaAMensajes =ref(db, "mensajes");
        var nuevaLlave =push(child(ref(db),"mensajes")).key;
        var nuevosDatos = {
            [nuevaLlave]: {
                usuario: usuarioconectado,
                mensaje: textomensaje.value,
                fecha: new Date().toLocaleDateString() 
            }
        } 
        textomensaje.value = "";
        update(referenciaAMensajes, nuevosDatos);
    }
}

function escucharYDibujarMensajes (){
    var db = getDatabase();
    var referenciaAMensajes = ref(db, "mensajes");
    onValue(referenciaAMensajes, function (datos){
      var valoresObtenidos = datos.val();
      mensajesChat.innerHTML = "";
      Object.keys(valoresObtenidos).forEach(llave=> {
        var mensajeDescargado = valoresObtenidos[llave];8
        var mensaje = ""
        mensaje += "<div class='usuario'>"+ mensajeDescargado.usuario + "</div>";
        mensaje+= "<div class='mensajechats'>"+ mensajeDescargado.mensaje + "</div>";
        mensaje += "<div class='fecha'>"+ mensajeDescargado.fecha + "</div><hr>";
        mensajesChat.innerHTML += mensaje;

      })
   })
      
 }


