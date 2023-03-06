import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginCall } from '../features/auth/authActions';
import { loginValidation } from '../helpers/formSchemas/loginSchema';

const Login = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  return (
    <main
      className="auth-container flex flex-column justify-center align-center"
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + '/img/auth-bg-group.svg'
        })`,
      }}
    >
      <div className="container">
        <div className="auth-box flex flex-column w-lg-50 mx-auto">
          <img
            src={`${process.env.PUBLIC_URL + '/img/logo.svg'}`}
            width="200"
            className="mb-20"
            alt=""
          />
          <Formik
            initialValues={{ username: 'ozgunmustafa', password: '123456' }}
            validationSchema={loginValidation}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              dispatch(loginCall(values));
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex flex-column gap-2">
                  <div className="flex flex-column mb-10 gap-1">
                    <Field
                      type="text"
                      name="username"
                      className="form-input"
                      placeholder="Username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="form-error-message"
                    />
                  </div>
                  <div className="flex flex-column mb-10 gap-1">
                    <Field
                      type="password"
                      name="password"
                      className="form-input"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="form-error-message"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default Login;
