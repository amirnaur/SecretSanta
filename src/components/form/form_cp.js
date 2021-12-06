import React, { useState } from "react";
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const MembersForm = () => {
    const [membersList, setMembersList] = useState([{"name" : ""}, {"name" : ""}, {"name" : ""}])
    const formik = useFormik({
        initialValues: membersList,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
      });
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...membersList];
        list[index][name] = value;
        console.log(list[index][name]);
        setMembersList(list);
    };
    // handle click event of the Add button
    const handleAddClick = () => {
        setMembersList([...membersList, { name: ""}]);
    };
    return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            {membersList.map((member, i) => {
            return(
                <TextField
                    key={i}
                    fullWidth
                    id="name"
                    name="name"
                    label="Email"
                    placeholder={"Name " + (+i+1)}
                    value={member['name']}
                    onChange={e => handleInputChange(e, i)}
                    //   error={formik.touched.email && Boolean(formik.errors.email)}
                    //   helperText={formik.touched.email && formik.errors.email}
                />
            )})
            }
        <Button color="primary" variant="contained" onClick={handleAddClick}>
            Add
        </Button>
        <Button color="primary" variant="contained" type="submit">
            Submit
        </Button>
        </form>
        <div style={{ marginTop: 20 }}>{JSON.stringify(membersList)}</div>
    </div>
    );
            
};
export default MembersForm;