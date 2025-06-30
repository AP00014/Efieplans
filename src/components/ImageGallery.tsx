import { motion } from 'framer-motion';

const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <div className="image-gallery">
      {images.map((img, index) => (
        <motion.div
          key={index}
          className="gallery-item"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={img} 
            alt={`Gallery ${index + 1}`} 
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGallery;