'use client';

import { useState, ChangeEvent } from 'react';
import { Textarea, Input, Button, Spinner, useDisclosure } from '@chakra-ui/react';
import CustomAlertDialog from '@/components/CustomAlertDialog';

export default function FormatPlaces () {
  const [places, setPlaces] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangecity = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleChangePlaces = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPlaces(event.target.value);
  };

  const handleSubmit = () => {
    if (!localStorage.getItem('places')) {
      setIsLoading(true);
      fetchPlaces();
    } else {
      onOpen();
    }
  };

  const handleDelete = () => {
    onClose();
    fetchPlaces();
  };

  const fetchPlaces = () => {
    fetch('http://localhost:4000/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: 'Málaga', places })
    })
      .then(res => res.json())
      .then(res => {
        setIsLoading(false);
        localStorage.setItem('places', JSON.stringify(res));
      });
  };

  return (
    <>
      {
        !isLoading
          ? (
              <>
                <label htmlFor="format-city">Write the city where the places where you want to eat are located</label>
                <Input
                  id="format-city"
                  value={city}
                  onChange={handleChangecity}
                  width={300}
                  style={{ display: 'block' }}
                />

                <label htmlFor="format-places">Write all places you visited and want to visit. Separated by &quot;enter&quot;</label>
                <Textarea
                  id="format-places"
                  height={300}
                  value={places}
                  onChange={handleChangePlaces}
                />
                <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
              </>
            )
          : <Spinner />
      }
      <CustomAlertDialog
        isOpen={isOpen}
        warningTitle='You have already saved places.'
        warningButtonText='Delete'
        warningText='If you click on delete, you will delete all the places you have saved'
        onClose={onClose}
        onDelete={handleDelete}
      />
    </>
  );
}
