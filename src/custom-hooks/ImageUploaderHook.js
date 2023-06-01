import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../ServerConfigs';
import { useSelector } from 'react-redux';


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export const useImageUploader = (folderName = '') => {
  const seller = useSelector((state) => state.seller);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  // const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const generateUniqueName = (imageName) => {
    const uniqueSuffix = Date.now().toString(36);
    const extension = imageName.split('.').pop();
    return `${imageName}_${uniqueSuffix}.${extension}`;
  };

  const removeFromPreview = (image) => {
    setSelectedImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const uploadImage = async (image) => {
    try {
      const sellerEmail = seller?.user?.email;
      if (!sellerEmail) {
        throw new Error('User not identified');
      }
  
      setUploading(true);
      setError(null);
      let imagePath = '';
  
      imagePath = `images/${sellerEmail}`;
  
      const fileExtension = image.name.split('.').pop(); // Extract the file extension
      const imageName = `myAvatar.${fileExtension}`; // Add the file extension to the name
  
      const imageRef = ref(storage, `${imagePath}/${imageName}`);
      await uploadBytes(imageRef, image);
  
      const downloadURL = await getDownloadURL(imageRef);
  
      setUploading(false);
      return downloadURL;
    } catch (error) {
      console.error(error);
      setError(error);
      setUploading(false);
      throw error;
    }
  };
  


  const uploadImages = async () => {
    try {
      if (selectedImages.length === 0) {
        return;
      }

      setUploading(true);
      setError(null);
      let imagePath = '';

      if (seller && seller.user && seller.user.email) {
        if (folderName) {
          imagePath = `images/${seller.user.email}/${folderName}`;
        } else {
          imagePath = `images/${seller.user.email}`;
        }
        const uploadPromises = selectedImages.map((image) => {
          const uniqueName = generateUniqueName(image.name);
          const imageRef = ref(storage, `${imagePath}/${uniqueName}`);
          return uploadBytes(imageRef, image);
        });

        const uploadedNames = await Promise.all(uploadPromises);

        const downloadURLPromises = uploadedNames.map((uniqueName) => {
          return getDownloadURL(uniqueName.ref);
        });

        const downloadURLs = await Promise.all(downloadURLPromises);

        // setUploadedImages((prevImages) => [...prevImages, ...downloadURLs]);
        setSelectedImages([]);
        setUploading(false);
        return downloadURLs
      } else {
        setUploading(false);
        throw new Error('User not Identified');
      }
    } catch (error) {
      console.error(error);
      setError(error);
      setUploading(false);
      throw error

    }
  };

  const deleteImage = async (imageURL) => {
    try {
      const imageRef = ref(storage, imageURL);
      if (imageRef) {
        await deleteObject(imageRef);
      }

      // setUploadedImages((prevImages) =>
      //   prevImages.filter((image) => image !== imageURL)
      // );
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up any created object URLs to avoid memory leaks
      selectedImages.forEach((image) => URL.revokeObjectURL(image));
    };
  }, [selectedImages]);

  return {
    uploadImage,
    removeFromPreview,
    error,
    selectedImages,
    uploading,
    handleFileChange,
    uploadImages,
    deleteImage,
    // uploadedImages
  };
};
