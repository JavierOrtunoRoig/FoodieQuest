'use client';

import { useState, ChangeEvent } from 'react';
import { Textarea, Input, Button, Spinner, useDisclosure } from '@chakra-ui/react';
import CustomAlertDialog from '@/components/CustomAlertDialog';
import { fetchPlaces } from './utils';

export default function FormatPlaces () {
  const [places, setPlaces] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleChangePlaces = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPlaces(event.target.value);
  };

  const handleSubmit = () => {
    if (!localStorage.getItem('places')) {
      setIsLoading(true);
      fetchPlaces(city, places, setIsLoading);
    } else {
      onOpen();
    }
  };

  const handleDelete = () => {
    onClose();
    fetchPlaces(city, places, setIsLoading);
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
                  onChange={handleChangeCity}
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
