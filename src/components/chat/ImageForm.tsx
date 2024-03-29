import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { IconEmbed } from '../Icons';

const ModalComponent = () => {
  const { register, handleSubmit } = useForm();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  Modal.setAppElement('#root');
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      backgroundColor: 'rgb(31 41 55)',
      border: 'none',
      borderRadius: '20px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
    },
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event: any) => {
    const files = event.target.files;
    const imagesData: any = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await convertToBase64(file);
      imagesData.push(base64);
    }
    console.log(imagesData)
    setPreviewImages(imagesData);
  };

  const onSubmit = handleSubmit(async (data, event) => {
    event.preventDefault();
    if (previewImages.length === 0) {
      console.error('Nenhuma imagem selecionada.');
      return;
    }
  
    const imagesBase64: string[] = [];
  
    for (let i = 0; i < previewImages.length; i++) {
      const base64 = previewImages[i];
      imagesBase64.push(base64);
    }
  
    console.log('Imagens em base64:', imagesBase64[0]);
    setModalIsOpen(false);
  });
  

  return (
    <div className="flex items-center justify-center ml-2">
      <button
        className="text-white font-bold rounded py-2"
        onClick={() => setModalIsOpen(true)}>
        {IconEmbed()}
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Upload Images">
        <h1 className="text-xl font-bold mb-2">Imagens:</h1>
        <div className="flex flex-wrap">
          {previewImages.map((imageData, index) => (
            <img
              key={index}
              src={imageData}
              className="mb-4 mr-4 object-contain h-40 w-auto"
              alt={`Imagem ${index}`}
            />
          ))}
        </div>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <div className="mb-4 self-center">
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded inline-block">
              Escolher Imagens
            </label>
            <input
              {...register('images')}
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold mx-5 py-2 px-4 rounded"
              type="button"
              onClick={() => setModalIsOpen(false)}>
              Fechar
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-5 py-2 px-4 rounded"
              type="submit">
              Enviar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalComponent;
