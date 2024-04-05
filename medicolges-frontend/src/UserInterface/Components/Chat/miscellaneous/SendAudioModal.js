import { useDisclosure } from '@chakra-ui/hooks';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button
} from '@chakra-ui/react';
import RecorderControls from '../audioMessage/components/recorder-controls';
import RecordingsList from '../audioMessage/components/recordings-list';
import useRecorder from '../audioMessage/hooks/useRecorder';

const SendAudioModal = ({ children }) => {
   const { isOpen, onClose, onOpen } = useDisclosure();
   const { recorderState, ...handlers } = useRecorder();
   const { audio } = recorderState;
   
   return (
      <>
         <span onClick={onOpen}>{children}</span>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Send audio messages</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <RecorderControls recorderState={recorderState} handlers={handlers} />
                  <RecordingsList audio={audio} />
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                     Cancel
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}

export default SendAudioModal;