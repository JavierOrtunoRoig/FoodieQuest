import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';

interface CustomAlertDialogProps {
  isOpen: boolean;
  warningTitle: string;
  warningText: string;
  warningButtonText: string;
  onClose: () => void;
  onDelete: () => void;
}

export default function CustomAlertDialog (props: CustomAlertDialogProps) {
  const { isOpen, warningTitle, warningButtonText, warningText, onClose, onDelete } = props;
  const cancelRef = React.useRef<any>();
  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {warningTitle}
            </AlertDialogHeader>

            <AlertDialogBody>
              {warningText}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                {warningButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  );
}
