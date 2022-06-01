import React, { useState } from 'react';
import { Button } from '@mui/material';

export const Filter = ({ filterHandler }: { filterHandler: (filter: number) => void }) => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div>
      <h3>Filtros:</h3>
      <Button
        data-testid='allTasksFilter'
        variant={selected === 0 ? 'contained' : 'outlined'}
        onClick={() => {
          setSelected(0);
          filterHandler(0);
        }}
      >
        Buscar todas tarefas
      </Button>
      <Button
        data-testid='pendingTasksFilter'
        variant={selected === 1 ? 'contained' : 'outlined'}
        style={{ margin: '0 5px 0 5px' }}
        onClick={() => {
          setSelected(1);
          filterHandler(1);
        }}
      >
        Filtrar tarefas pendentes
      </Button>
      <Button
        data-testid='completeTasksFilter'
        variant={selected === 2 ? 'contained' : 'outlined'}
        onClick={() => {
          setSelected(2);
          filterHandler(2);
        }}
      >
        Filtrar tarefas concluídas
      </Button>
    </div>
  );
};
