import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import {
    Button, Box, TextField, Typography, FormControl,
    InputLabel, Select, MenuItem
} from "@mui/material";
import { useStoreActions } from "easy-peasy";
import Logo from "../../components/Logo/Deliverar.png";

const LoginPage = () => {
    const navigate = useNavigate();

    const [docType, setDocType] = useState("DNI");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const login = useStoreActions(actions => actions.login);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        const resp = await login({ docType, user, password });
        if (resp.error) {
            setError(resp.message);
        } else {
            navigate(`/payments`);
        }
    };

    return (
        <div className={'section-container'}>
            <Box sx={{ width: "100%", backgroundColor: "#1976d2", margin: "0 0 30px", textAlign: "center" }}>
                <img src={Logo} alt="logo" width="200px" />
            </Box>
            <div className={styles['form-container']}>
                <p><b>Iniciar sesión</b></p>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="doctype-select-label">Tipo documento</InputLabel>
                        <Select
                            labelId="doctype-select-label"
                            id="doctype-select"
                            value={docType}
                            label="Tipo documento"
                            onChange={e => setDocType(e.target.value)}
                        >
                            <MenuItem value={"CUIL"}>CUIL</MenuItem>
                            <MenuItem value={"CUIT"}>CUIT</MenuItem>
                            <MenuItem value={"DNI"}>DNI</MenuItem>
                            <MenuItem value={"LC"}>LC</MenuItem>
                            <MenuItem value={"LE"}>LE</MenuItem>
                            <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    id="outlined-basic"
                    label="Usuario"
                    value={user}
                    variant="outlined"
                    size="small"
                    margin="dense"
                    onChange={(e) => setUser(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                />
                <TextField
                    id="outlined-basic"
                    label="Contraseña"
                    value={password}
                    type="password"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                />
                {error && (
                    <Typography sx={{ color: "red", alignSelf: "center", mb: 1 }}>
                        {error}
                    </Typography>
                )}
                <Box display="flex" justifyContent="center">
                    <Button variant="contained" sx={{ margin: "16px 8px 0" }} onClick={handleLogin}>
                        Entrar
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default LoginPage;
