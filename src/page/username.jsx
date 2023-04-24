import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, TextField } from '@mui/material';
import Menu from '../elements/menu';
import { alterUserInfo, isValid } from '../tools/managerUser';

const Username = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleSubmit = async (values) => {
    if (values.username && values.email.trim() !== '') {
      if (alterUserInfo({ username: values.username, email: values.email })) {
        setSuccess('Alter success');
        setError(null);
      } else {
        setError('Error changing try later');
      }
    } else if (values.username) {
      if (alterUserInfo({ username: values.username })) {
        setSuccess('Alter success');
        setError(null);
      } else {
        setError('Error changing try later ');
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Required username or email address'),
      email: Yup.string().email('Need Correct Type Email'),
    }),
    onSubmit: handleSubmit,
  });

  isValid();

  return (
    <div className="w-[100%]">
      <Menu />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-start items-start w-[20rem]  gap-[0.4rem] mr-[auto] ml-[4rem]"
      >
        <h2 className="mb-[2rem]"> My Account</h2>
        <div className="w-[100%] flex flex-col  gap-[0.3rem]">
          <p>Username*</p>
          <TextField
            size="small"
            fullWidth
            data-test="username"
            placeholder="Placeholder"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </div>

        <div className="w-[100%] flex flex-col  gap-[0.3rem]">
          <p>Email</p>
          <TextField
            size="small"
            fullWidth
            placeholder="Placeholder"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className=" mt-[1rem]">
          <Button
            data-test="submit"
            type="submit"
            variant="contained"
            className="!bg-[black] pt-[1rem] !normal-case !font-bold !mt-[1rem]"
          >
            Save
          </Button>
        </div>
        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}
        {!error && success && (
          <div>
            <p className="text-green-600">{success}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Username;
