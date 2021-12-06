import React from 'react';
// import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray, useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const initialValues = {
  members: [
    {
      name: '',
    },
    {
      name: '',
    },
    {
      name: '',
    },
  ],
};

const GenerateSantas = () => (
  <div>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FieldArray name="members">
            {({ insert, remove, push }) => (
              <div>
                {values.members.length > 0 &&
                  values.members.map((member, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <TextField
                          name={`members.${index}.name`}
                          label="Name"
                          placeholder="Jane Doe"
                          type="text"
                          onChange={e => setFieldValue(`members.${index}.name`, e.target.value)}
                        />
                        <IconButton aria-label="delete" onClick={() => remove(index)}>
                            <DeleteIcon />
                          </IconButton>
                        <ErrorMessage
                          name={`members.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      {/* <div className="col">
                        <label htmlFor={`friends.${index}.email`}>Email</label>
                        <Field
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div> */}
                      <div className="col">
        
                          
                      </div>
                    </div>
                  ))}
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => push({ name: ''})}
                >
                  Add Member
                </Button>
              </div>
            )}
          </FieldArray>
          <Button type="submit" variant="contained">Generate</Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default GenerateSantas;