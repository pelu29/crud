import { render } from 'ejs';
import express from 'express';
import mysql2 from 'mysql2';
const app = express();
const puerto = 3000;

app.set('view engine','ejs');
app.set('views','views');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const conexion = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'heckchicacha',
    database:'crud',
})

conexion.connect((error)=>{
    if(error){
        console.log("ocurrio un error al conectarse a la base de datos",error);
    }
    console.log("la conexion a la base de datos fue exitosa");
})

app.get("/inicio",(req,res)=>{
    const mensaje = "hola como andas pepito";
    res.render("index",{mensaje})
})

app.post("/verificacion",(req,res)=>{
    const {nombre,contraseña} = req.body
    consulta = 'select * from usuarios where nombre = ? and constraseña = ?';
    conexion.query(consulta,[nombre,contraseña],(error,resultado)=>{
        if(error){
            console.log("ocurrio un error en la consulta",error);
            res.status(500);
        }else{
            console.log("la consulta fue exitosa");
            res.status(200).render("index",{resultado});
        }
    })
})

app.listen(puerto, '0.0.0.0' ,()=>{
    console.log("servidor escuchando en el puerto",puerto)
})