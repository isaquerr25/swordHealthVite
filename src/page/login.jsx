import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { Button, Link, TextField } from '@mui/material';
import { validation } from '../tools/managerUser';

const LoginPage = () => {
  const router = useNavigate();

  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    setError(null);

    if (validation(values) === 'success') {
      router('/discovery');
    } else {
      setError('Username or password is incorrect');
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Required username or email address'),
      password: Yup.string().required('Required password'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center w-[20rem] mx-[auto] gap-[0.4rem]"
      >
        <div className="w-[100%] flex flex-col  gap-[0.3rem]">
          <p>Username</p>
          <TextField
            size="small"
            fullWidth
            placeholder="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </div>

        <div className="w-[100%] flex flex-col  gap-[0.3rem]">
          <p>Password</p>
          <TextField
            size="small"
            fullWidth
            placeholder="*****"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="!bg-[black] pt-[1rem] !normal-case !font-bold"
        >
          Sign in
        </Button>
        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <div>
          <span>Don&apos;t have an account?</span> &nbsp;
          <Link
            href="/signup"
            className="underline !decoration-neutral-950 underline-offset-4 !text-[black]"
          >
            Click here to sign up.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
