import React, {useEffect, useState} from 'react';
// import ReactDOM from 'react-dom';
import { Formik, Form, ErrorMessage, FieldArray } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactCardFlip from 'react-card-flip';
import './form.css';
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

const GenerateSantas = () => {
  const [distribution, setDistribution] = useState({});

  function flipClick(key) {
    const new_distr = {};
    Object.assign(new_distr, distribution);
    new_distr[key][1] = !new_distr[key][1];
    setDistribution(new_distr);
  }
  function deleteMember(key) {
    const new_distr = {};
    Object.assign(new_distr, distribution);
    if (window.confirm('Did you remember your partner?')) {
      delete new_distr[key];
      setDistribution(new_distr);
    }
  }
  if(Object.keys(distribution).length === 0) {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2));
          setDistribution(distributeMembers(values['members']));

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
                          <IconButton aria-label="delete" onClick={() => {if(values.members.length > 2) remove(index)}}>
                              <DeleteIcon />
                            </IconButton>
                          <ErrorMessage
                            name={`members.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
          
                            
                        </div>
                      </div>
                    ))}
                  <div className='form-buttons-container'>
                    
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => push({ name: ''})}
                    >
                      Add Member
                    </Button>

                    <Button type="submit" variant="contained">Generate</Button>
                   </div>

                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  )
  }
  else {
    return(
      <div className="cards">
        {Object.entries(distribution).map((pair, index) => {
          return(
            <ReactCardFlip isFlipped={pair[1][1]} flipDirection="vertical" key={pair[0]}>
              <div className="member-card-front">
                <p className="member-name">{pair[0]}</p>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={()=>flipClick(pair[0])}
                  >
                    Click to flip
                </Button>
              </div>
      
              <div className="member-card-back">
              <p className="member-name">{pair[1][0]}</p>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => deleteMember(pair[0])}
                >
                  OK
                </Button>
              </div>
            </ReactCardFlip>
          )
        })}
      </div>
    )
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
const distributeMembers = (members) => {
  const result = {};
  let from = [...members];
  let destiny = [...members];

  for(let i = 0; i < members.length; i++) {
    if(destiny.length === 2) {
      if(destiny.indexOf(from[0]) >= 0) {
        result[from[0].name] = [destiny[destiny.indexOf(from[0]) ? 0 : 1 ].name, false];
        destiny.splice(destiny.indexOf(from[0]) ? 0 : 1 , 1);
        result[from[1].name] = [destiny[0].name, false];
      }
      else if(destiny.indexOf(from[1]) >= 0) {
        result[from[1].name] = [destiny[destiny.indexOf(from[1]) ? 0 : 1 ].name, false];
        destiny.splice(destiny.indexOf(from[1]) ? 0 : 1 , 1);
        result[from[0].name] = [destiny[0].name, false];
      }
      else {
        result[from[0].name] = [destiny[0].name, false];
        destiny.splice(0, 1);
        result[from[1].name] = [destiny[0].name, false];
      }
      return result;
    }
    let rd_index = getRandomInt(0, destiny.length);
    while(from[0] === destiny[rd_index]) {
      rd_index = getRandomInt(0, destiny.length);
    }
    result[from[0].name] = [destiny[rd_index].name, false];
    from.splice(0, 1);
    destiny.splice(rd_index, 1);
  }
  return result;
}
export default GenerateSantas;