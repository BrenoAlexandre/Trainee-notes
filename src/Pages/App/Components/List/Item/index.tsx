import React from 'react';
import { TableCell, TableRow, Button, Modal, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ITask } from '../../../../../Interfaces/ITask';
import { useState } from 'react';
import { Box } from '@mui/system';

interface IProps {
  props: {
    task: ITask;
    deleteHandler: (id: string) => void;
    editHandler: (id: string, title: string, description: string, complete: boolean) => void;
  };
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fafafa',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export const Item = ({ props }: IProps) => {
  const { task, deleteHandler, editHandler } = props;
  const { id, title, description, complete } = task;

  const [titleModal, setTitleModal] = useState<string>(title);
  const [descriptionModal, setDescriptionModal] = useState<string>(description);
  const [completeModal, setCompleteModal] = useState<boolean>(complete);
  const [open, setOpen] = useState<boolean>(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  const editTask = () => {
    editHandler(id, titleModal, descriptionModal, completeModal);

    if (open) {
      modalClose();
    }
  };

  return (
    <TableRow>
      <TableCell sx={{ color: complete ? 'grey' : 'black' }}>{title}</TableCell>
      <TableCell sx={{ color: complete ? 'grey' : 'black' }}>{description}</TableCell>

      <TableCell align='center'>
        <Button
          variant={complete ? 'contained' : 'outlined'}
          onClick={() => {
            setCompleteModal(!completeModal);
            editTask();
          }}
        >
          {complete ? 'Concluída' : 'Concluir'}
        </Button>

        <Button
          variant='outlined'
          endIcon={<EditIcon />}
          style={{ marginRight: '10px', marginLeft: '10px' }}
          onClick={modalOpen}
        >
          Editar tarefa
        </Button>
        <Modal open={open} onClose={modalClose}>
          <Box sx={style}>
            <Typography variant='h6'>Editar tarefa</Typography>
            <div style={{ margin: '15px' }}>
              <TextField
                value={titleModal}
                onChange={(e) => {
                  setTitleModal(e.target.value);
                }}
                size='small'
                variant='standard'
                style={{ marginRight: '5px' }}
                placeholder='Titulo'
              />
              <TextField
                value={descriptionModal}
                onChange={(e) => {
                  setDescriptionModal(e.target.value);
                }}
                size='small'
                variant='standard'
                placeholder='Descrição'
              />
            </div>
            <Button onClick={editTask} variant='contained'>
              Salvar alterações
            </Button>
          </Box>
        </Modal>

        <Button variant='outlined' endIcon={<DeleteIcon />} onClick={() => deleteHandler(id)}>
          Deletar tarefa
        </Button>
      </TableCell>
    </TableRow>
  );
};
