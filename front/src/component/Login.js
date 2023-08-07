import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
import { iniciarSesionAction } from "../actions/usuarioActions";

import imagen2 from "../imagenes/fondo-inicio.jpg";
import Cookies from "universal-cookie";
const cookies = new Cookies();




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Club Impsa © "}
      <Link
        color="inherit"
        href="https://www.instagram.com/futsalimpsa/?hl=es"
      >
    instagram
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    //backgroundImage: "url(https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800)",

   // backgroundImage: "url(https://source.unsplash.com/random)",

   backgroundImage: `url(${imagen2})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide({ history }) {
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState({
    correo: "",
    password: "",
  });

  const clearForm=()=>{
    setUsuario({
    correo: "",
    password:"",
    });
  }

  useEffect(() => {
    if (cookies.get("id")) {
      history.push("/usuarios");
      dispatch(iniciarSesionAction(true, cookies.get("id")));
    }
    //eslint-disable-next-line
  }, []);
  const submit = async (e) => {
   
    e.preventDefault();

    clearForm();
    await clienteAxios
      .post("/auth", usuario)
      .then((respose) => {
        cookies.set("id", respose.data._id, { path: "/" });

        history.push("/inicio");
        dispatch(iniciarSesionAction(true, cookies.get("id")));
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: `Hola ${respose.data.nombre}`
        })
      })

      .catch((error) => {
        alert("Nombre o Contraseña son incorrectos");

       // console.log(error);
      });

  };

  const onChange = async (e) => {
    await setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
    //console.log(e.target.name, e.target.value)
  };

  const { correo, password } = usuario;

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={submit}>
            <TextField
              type="correo"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Correo"
              name="correo"
              autoComplete="correo"
              autoFocus
              value={correo}
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/usuarios/nuevo" variant="body2">
                  {"No tienes una cuenta? , crea una"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
