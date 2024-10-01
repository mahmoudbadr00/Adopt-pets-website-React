import Pet from './pet';
export default function Results({ pets }) {
  return (
    <div className="search">
      {pets.length == 0 ? (
        <h1>No pets found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            key={pet.id}
            id={pet.id}
          />
        ))
      )}
      ;
    </div>
  );
}
