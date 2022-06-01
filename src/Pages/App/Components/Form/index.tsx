import React from 'react';
import * as yup from 'yup';
import { Typography } from '@mui/material';
import { Formik, Form as FormikForm, Field } from 'formik';
import { ITask } from '../../../../Interfaces/ITask';
import TasksService from '../../../../services/tasks.service';

const taskSchema = yup.object().shape({
  title: yup.string().max(30, 'Máximo 30 caracteres').required('Título obrigatório'),
  description: yup.string(),
});

interface IForm {
  appSetTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export const Form = ({ appSetTasks }: IForm) => {
  const submitHandler = async (values: { title: string; description: string }) => {
    let localDesc: string = values.description.trim();
    if (localDesc === '') localDesc = 'Sem descrição';

    const user = { id: 'ea0474bd-e70f-407c-83d7-17234685cc08', email: 'temp@mail.com' };
    //TODO Usuário temporário

    const data: ITask = await TasksService.create(values.title, localDesc, user);

    appSetTasks((tasks) => {
      return [...tasks, data];
    });
  };

  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      validationSchema={taskSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        submitHandler(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <FormikForm>
          <Typography variant='h4'>Adicione uma tarefa:</Typography>
          <div style={{ margin: '5px' }}>
            <Field
              id='title'
              name='title'
              type='text'
              placeholder='Titulo'
              style={{ marginRight: '15px' }}
              value={values.title}
            />
            <Field
              id='description'
              name='description'
              type='text'
              placeholder='Descrição'
              value={values.description}
            />
          </div>
          {errors.title && <span>{errors.title}</span>}
          {isSubmitting && <div>Salvando...</div>}
          <button type='submit' disabled={isSubmitting}>
            Adicionar nota
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};
