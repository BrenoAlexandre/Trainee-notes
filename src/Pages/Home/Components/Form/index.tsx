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
  createTask: (data: ITask) => void;
}

export const Form = ({ createTask }: IForm) => {
  const submitHandler = async (values: { title: string; description: string }) => {
    const { title, description } = values;

    const localDesc: string = description.trim() === '' ? 'Sem descrição' : description;

    const user = '3fb282fd-32df-4322-b6bd-404a165ba4b0';
    //TODO Usuário temporário

    const data: ITask = await TasksService.create(title, localDesc, user);

    createTask(data);
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
