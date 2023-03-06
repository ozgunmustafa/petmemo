import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import NoContent from '../components/NoContent';
import { createPetCall, getPetById } from '../features/pet/petActions';
import { createPetValidation } from '../helpers/formSchemas/createPetSchema';
import { BsFillTrashFill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, loading, error } = useSelector((state) => state.pet);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  useEffect(() => {
    console.log(pets);
    Modal.setAppElement('body');
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const [pets, setPets] = useState(() => {
    const createdPets = localStorage.getItem('createdPets');
    if (createdPets) {
      return JSON.parse(createdPets);
    } else {
      return [];
    }
  });

  useEffect(() => {
    const createdPets = localStorage.getItem('createdPets');
  }, [pets]);

  const showModalAndSetModalType = (type) => {
    setIsOpen(true);
    setModalType(type);
  };
  const closeModalAndSetModalType = () => {
    setIsOpen(false);
    setModalType('');
  };

  const splitText = (text) => {
    let tempArr = text.split(',');
    let textSplitArr = [];

    tempArr.forEach((item, index) => {
      textSplitArr.push({
        id: index,
        name: item.trim(),
      });
    });

    return textSplitArr;
  };
  // function openModal() {
  //   setIsOpen(true);
  // }

  // function closeModal() {
  //   setIsOpen(false);
  // }

  return (
    <Layout>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModalAndSetModalType}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <Formik
          initialValues={{ category: '', name: '', tags: '' }}
          validationSchema={createPetValidation}
          onSubmit={(values, { setSubmitting }) => {
            let valData = {
              category: values.category,
              name: values.name,
              tags: splitText(values.tags),
            };
            dispatch(createPetCall(valData));
            setSubmitting(false);
            setPets([...pets, valData]);
            closeModalAndSetModalType();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-column gap-2">
                <div className="flex flex-column mb-10 gap-1">
                  <Field
                    type="text"
                    name="category"
                    className="form-input"
                    placeholder="Category"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="form-error-message"
                  />
                </div>
                <div className="flex flex-column mb-10 gap-1">
                  <Field
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="form-error-message"
                  />
                </div>
                <div className="flex flex-column mb-10 gap-1">
                  <Field
                    type="text"
                    name="tags"
                    className="form-input"
                    placeholder="Tags"
                  />
                  <ErrorMessage
                    name="tags"
                    component="div"
                    className="form-error-message"
                  />
                  <small className="text-muted">seperate with ','</small>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Create
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      <div className="container py-40">
        {pets?.length <= 0 ? (
          <>
            <NoContent />
          </>
        ) : (
          <div className="pet-list">
            {pets.map((item, index) => (
              <div className="pet-list-item" key={'pet' + index}>
                <div className="flex flex-column">
                  <div className="flex gap-2 mb-5">
                    <span className="pet-name">{item.name}</span>
                    <small className="badge">{item.category}</small>
                  </div>
                  <div className="flex gap-2">
                    {item.tags?.map((tag, index) => (
                      <small
                        className="text-muted"
                        style={{ fontSize: '0.8rem' }}
                        key={tag.name + index}
                      >
                        {tag.name}
                      </small>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-muted"
                    onClick={() => dispatch(getPetById(item.id))}
                  >
                    <BsFillTrashFill size="1.2rem" />
                  </button>
                  <button className="text-muted">
                    <FiEdit size="1.2rem" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center py-20">
          <button
            className="btn btn-primary rounded-pill px-30"
            onClick={() => showModalAndSetModalType('create')}
          >
            Add New One
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
