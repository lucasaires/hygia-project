import React, { useState, useEffect } from "react";
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
  Card,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import MemberEditorDialog from "./MemberEditorDialog";
import { api } from "../../service/api";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: {
    margin: "16px",
  },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "16px",
    },
  },
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 750,
  whiteSpace: "pre",
  "& thead": {
    "& th:first-child": {
      paddingLeft: 16,
    },
  },
  "& td": {
    borderBottom: "none",
  },
  "& td:first-child": {
    paddingLeft: "16px !important",
  },
}));

const ButtonStyle = styled(Button)(() => ({
  background: "#272727",
  margin: "0 auto",
  "&:hover": {
    background: "#272727",
    filter: "brightness(0.9)",
  },
}));

export function Schedule() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState();
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
    updatePageData();
    setUser();
  };

  const handleDeleteUser = async (user) => {
    const response = await api.delete(`/schedule/${user._id}`);
    if (response.status === 200) {
      setUserList(userList.filter((u) => u._id !== user._id));
    }
    setUser();
  };

  const updatePageData = async () => {
    const response = await api.get("/schedule");
    setUserList(response.data);
  };

  useEffect(() => {
    updatePageData();
  }, []);

  useEffect(() => {
    async function handleAgenda() {
      const response = await api.get("/schedule");
      setUserList(response.data);
      console.log(response.data);
    }

    if (!userList) {
      handleAgenda();
    }
  }, [userList]);

  return (
    <Container>
      <Box sx={{ float: "right" }}>
        <ButtonStyle
          sx={{ mb: 2 }}
          variant="contained"
          onClick={() => setShouldOpenEditorDialog(true)}
        >
          Adicionar nova consulta
        </ButtonStyle>
      </Box>
      <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Paciente</strong>
              </TableCell>
              <TableCell>
                <strong>Data do agendamento</strong>
              </TableCell>
              <TableCell>
                <strong>Horario</strong>
              </TableCell>
              <TableCell>
                <strong>Especialidade</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow hover key={user.id}>
                  <TableCell sx={{ px: 0 }} align="left">
                    {user?.patient?.name}
                  </TableCell>
                  <TableCell sx={{ px: 2 }} align="left">
                    {user?.dateAppointment}
                  </TableCell>
                  <TableCell sx={{ px: 2 }} align="left">
                    {user?.appointment}
                  </TableCell>
                  <TableCell sx={{ px: 2 }}>{user?.specialty}</TableCell>
                  <TableCell sx={{ px: 2 }}>{user?.status}</TableCell>

                  <TableCell sx={{ px: 0 }}>
                    <IconButton
                      onClick={() => {
                        setUser(user);
                        setShouldOpenEditorDialog(true);
                      }}
                    >
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user)}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </ProductTable>

        <TablePagination
          sx={{ px: 2 }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={({ target: { value } }) => setRowsPerPage(value)}
        />

        {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialog}
            user={user}
          />
        )}
      </Card>
    </Container>
  );
}
