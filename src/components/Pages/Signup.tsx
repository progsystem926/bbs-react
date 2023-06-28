import { useContext, useEffect, useState } from "react";
import Header from "../molecules/Header";
import { LoginUsernameContext } from "../../App";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const { loginUsername, setLoginUsername } = useContext(LoginUsernameContext);
  const [emptyUsernameAlert, setEmptyUsernameAlert] = useState(false);
  const [emptyPasswordAlert, setEmptyPasswordAlert] = useState(false);
  const [existUsernameAlert, setExistUsernameAlert] = useState(false);

  const usersRef = collection(db, "users");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmptyUsernameAlert(false);
    setEmptyPasswordAlert(false);
    setExistUsernameAlert(false);
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const password = data.get("password") as string;
    if (!username) {
      setEmptyUsernameAlert(true);
    }
    if (!password) {
      setEmptyPasswordAlert(true);
    }
    if (!username || !password) {
      return;
    }
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size !== 0) {
      setExistUsernameAlert(true);
      return;
    }
    await addDoc(usersRef, {
      username: username,
      password: password,
    });
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
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "80%", mx: "auto" }}
      >
        {emptyUsernameAlert && <Alert severity="error">Empty username</Alert>}
        {emptyPasswordAlert && (
          <Alert sx={{ mt: 1 }} severity="error">
            Empty password
          </Alert>
        )}
        {existUsernameAlert && (
          <Alert severity="error">The username is already in use</Alert>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>
      </Box>
    </>
  );
};

export default Signup;
