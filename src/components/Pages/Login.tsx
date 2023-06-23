import { useContext, useEffect, useState } from "react";
import Header from "../molecules/Header";
import { LoginUsernameContext } from "../../App";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { loginUsername, setLoginUsername } = useContext(LoginUsernameContext);
  const [emptyAlert, setEmptyAlert] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    if (!username) {
      setEmptyAlert(true);
      return;
    }
    setLoginUsername(username);
    localStorage.setItem("username", username);
    navigate("/");
  };

  useEffect(() => {
    if (loginUsername) {
      navigate("/");
    }
  }, [loginUsername, navigate]);

  return (
    <>
      <Header loginUsername={loginUsername} />
      <Typography component="h1" variant="h5" align="center" sx={{ mt: 2 }}>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "80%", mx: "auto" }}
      >
        {emptyAlert && <Alert severity="error">Empty username</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </>
  );
};

export default Login;
