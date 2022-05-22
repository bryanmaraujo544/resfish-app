import { useState } from 'react';
import { AddCommandModal } from './components/AddCommandModal';
import { CommandsLayout } from './layout';

export const Commands = () => {
  console.log('Commands');
  const [isAddCommandModalOpen, setIsAddCommandModalOpen] = useState(false);

  function handleOpenAddCommandModal() {
    setIsAddCommandModalOpen(true);
  }

  return (
    <>
      <CommandsLayout handleOpenAddCommandModal={handleOpenAddCommandModal} />
      <AddCommandModal
        isModalOpen={isAddCommandModalOpen}
        setIsModalOpen={setIsAddCommandModalOpen}
      />
    </>
  );
};
