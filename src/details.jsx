import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchPetDetails from './fetchPetDetails';
import Carousel from './carousel';
import ErrorBoundary from './ErrorBoundry';
import { useContext, useState } from 'react';
import AdoptedPetContext from './AdoptedPetContext';
import Modal from './Modal';
const Details = () => {
  const { id } = useParams();
  const results = useQuery(['details', id], fetchPetDetails);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🔆</h2>
      </div>
    );
  }
  const pet = results.data.pets[0];
  //   throw new Error();
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        </h2>
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Adopt {pet.name}
        </button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate('/');
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};
// const DetailsErrorBoundary = (props) => {
//   return (
//     <ErrorBoundary>
//       <Details {...props} />
//     </ErrorBoundary>
//   );
// };
// export default DetailsErrorBoundary;
export default Details;
