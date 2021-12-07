import React from 'react';
// import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray, useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { withTheme } from '@emotion/react';
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
        distributeMembers(values['members']);
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
                          required
                          autoComplete="off"
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
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
const distributeMembers = (members) => {
  const result = {};
  let from = [...members];
  let destiny = [...members];
  // console.log(destiny[2]);

  for(let i = 0; i < members.length; i++) {
    console.log(from[0].name)
    console.log("from[1]", from[1].name)
    if(from.length === 2 && destiny.indexOf(from[0] >= 0)) {
      console.log("i= ", i)
      result[from[0].name] = destiny[0 ? destiny.indexOf(from[0]): 1].name;
      from.splice(0, 1);
      destiny.splice(destiny.indexOf(from[1]), 1);
      result[from[0].name] = destiny[0].name;
      break;
    }
    let rd_index = getRandomInt(0, from.length);
    while(destiny[rd_index] === from[0]) {
      rd_index = getRandomInt(0, from.length);
    }
    result[from[0].name] = destiny[rd_index].name;
    from.splice(0, 1);
    destiny.splice(rd_index, 1);
  }
  console.log(result)
  return result;
  

}
export default GenerateSantas;