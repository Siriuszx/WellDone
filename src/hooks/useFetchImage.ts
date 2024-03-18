/* eslint-disable react-hooks/rules-of-hooks */
import { useAppFetch } from '@/lib/useAppFetch';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const ImageDataSchema = z.object({ size: z.number(), type: z.string() });

const useFetchImage = (imageId?: string) => {
  const [imageURL, setImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<number | null>();

  useEffect(() => {
    const fetch = () => {
      useAppFetch(`/api/images/${imageId}`, {}, undefined, true)
        .then(({ data, responseState }) => {
          if (!responseState.ok) setError(responseState.statusCode);

          return data;
        })
        .then((data) => {
          const validationResult = ImageDataSchema.safeParse(data);

          if (!validationResult.success) {
            throw new Error('Invalid image format');
          } else {
            const src = URL.createObjectURL(data as Blob);

            setImage(src);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (imageId) {
      setIsLoading(true);
      setError(null);
      fetch();
    } else {
      setIsLoading(false);
      setError(404);
    }
  }, [imageId]);

  return { imageURL, isLoading, error };
};

export default useFetchImage;
