import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

/* COMPONENTE LOGIN */
import Login from './components/login/Login';

/* COMPONENTES FIJOS */
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';

/* COMPONENTES DINAMICOS */
import Administradores from './components/contents/administradores/Administradores';
import Slide from './components/contents/slide/Slide';
import Galeria from './components/contents/galeria/Galeria';
import Articulos from './components/contents/articulos/Articulos';
import Usuarios from './components/contents/usuarios/Usuarios';
import Error404 from './components/contents/error404/Error404';

export default function App() {

          const auth = getAccessToken();

          if(!auth){

            return <Login/>

          }

  return (

      <div className="sidebar-mini">
      <div className="wrapper">

        <Header/>
          <Sidebar/>
           <BrowserRouter>

            <Switch>
              <Route exact path="/" component={Administradores} />
              <Route exact path="/slide" component={Slide} />
              <Route exact path="/galeria" component={Galeria} />
              <Route exact path="/articulos" component={Articulos} />
              <Route exact path="/usuarios" component={Usuarios} />
              <Route component={Error404} />
            </Switch>  

          </BrowserRouter>        
        <Footer/>

      </div>      
    </div>
  );
}


/* FUNCION PARA TENER ACCESO AL TOKEN */
 
const getAccessToken = () =>{

  const accessToken = localStorage.getItem("ACCESS_TOKEN"); 
  const id = localStorage.getItem("ID");  
  const usuario = localStorage.getItem("USUARIO");
  


  if(!accessToken || accessToken === null || !id || id === null || !usuario || usuario === null ){

    /* return false; */ /* lo cambie a true para entrar al sistema */
    return true;
  }

  const metaToken = jwtDecode(accessToken);
console.log("metaToken", metaToken);

      if( !metaToken.data ){

        return false;
      }

  
  if(tokenExpira(accessToken, metaToken) || metaToken.data._id !== id || metaToken.data.usuario !== usuario){

    return false;

  }else{

    return true;
  }

}

/* FUNCION PARA VERIFICAR FECHA DE EXPIRACION DEL TOKEN */

const tokenExpira = ( accessToken, metaToken ) =>{

  const seconds = 60;  
  const { exp } = metaToken;
 // console.log("Expiracion", exp );
  const now = (Date.now()+seconds)/1000;
 // console.log("Hoy", now);

return exp < now;

}