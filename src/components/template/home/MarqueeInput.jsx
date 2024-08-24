import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const MarqueeInput = () => {
  const { control, register } = useForm();
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    const placeholders = [
      "7aaukTR4rZdMiTWK3kCLy3xJq61GnpY1ZicXrMhYo6JT",
      "38JmzLhSZ9yczLhW7ogoNnsbHmu5eNSEZzDP4CE3tXkK",
      "9EvotVhzGfrRt9yqMyUfC9ae9PUr2Zgabv8uQAqpump"
    ];
    
    let currentIndex = 0;
    
    const updatePlaceholder = () => {
      setPlaceholder(placeholders[currentIndex]);
      currentIndex = (currentIndex + 1) % placeholders.length;
    };
    
    updatePlaceholder(); // Set initial placeholder
    const interval = setInterval(updatePlaceholder, 500); // Update every 500ms
    
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <form className='w-full'>
      <Controller
        name="search"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            {...register('search')}
            placeholder={placeholder}
            className="animated-placeholder-input "
          />
        )}
      />
    </form>
  );
};

export default MarqueeInput;
