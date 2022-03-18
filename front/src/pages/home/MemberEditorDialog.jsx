import React, { useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Dialog, Button, Grid, Typography, MenuItem } from "@mui/material";
import { Box, styled } from "@mui/system";
import { api } from "../../service/api";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const FormHandlerBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const MemberEditorDialog = ({ open, handleClose, user }) => {
  console.log(user, "vazio");
  const [state, setState] = useState(
    user?.name
      ? user
      : {
          name: "",
          birthday: "",
          street: "",
          adress: "",
          city: "",
          uf: "",
          phone: "",
          email: "",
          gender: "",
        }
  );

  const handleChange = (event, source) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async () => {
    let { _id } = state;
    if (_id) {
      await api.put(`/patient/${_id}`, state);
    } else {
      await api.post(`/patient/`, state);
    }
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom component="div">
          {console.log(state)}
          {state?._id ? "Editar " : "Salvar "}paciente
        </Typography>
        <ValidatorForm onSubmit={handleFormSubmit}>
          <Grid sx={{ mb: "16px" }} container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextField
                label="Nome"
                type="text"
                name="name"
                value={state?.name}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Data nascimento"
                type="text"
                name="birthday"
                value={state?.birthday}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />

              <TextField
                label="Rua"
                type="text"
                name="street"
                value={state?.street}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />

              <TextField
                label="Bairro"
                onChange={handleChange}
                type="text"
                name="adress"
                value={state?.adress}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                label="Cidade"
                onChange={handleChange}
                type="text"
                name="city"
                value={state?.city}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Estado"
                onChange={handleChange}
                type="text"
                name="uf"
                value={state?.uf}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Telefone"
                onChange={handleChange}
                type="text"
                name="phone"
                value={state?.phone}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="E-mail"
                onChange={handleChange}
                type="text"
                name="email"
                value={state?.email}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
              />
              <TextField
                label="Sexo"
                onChange={handleChange}
                name="gender"
                value={state?.gender}
                validators={["required"]}
                errorMessages={["campo obrigatório"]}
                select
              >
                <MenuItem value={"Masculino"}>Masculino</MenuItem>
                <MenuItem value={"Feminino"}>Feminino</MenuItem>
                <MenuItem value={"Não responder"}>Não responder</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <FormHandlerBox>
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
          </FormHandlerBox>
        </ValidatorForm>
      </Box>
    </Dialog>
  );
};

export default MemberEditorDialog;
