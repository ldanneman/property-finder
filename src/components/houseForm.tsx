import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useMutation, gql } from '@apollo/client';
// import { Router, useRouter } from 'next/router';
import Link from 'next/link';
// import { Image } from 'cloudinary-react';
import SearchBox from './searchBox';
import { CreateSignatureMutation } from 'src/generated/CreateSignatureMutation';
// import {
//   CreateHouseMutation,
//   CreateHouseMutationVariables,
// } from 'src/generated/CreateHouseMutation';
// import {
//   UpdateHouseMutation,
//   UpdateHouseMutationVariables,
// } from 'src/generated/UpdateHouseMutation';
// import { CreateSignatureMutation } from 'src/generated/CreateSignatureMutation';

const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;

type UploadImageResponse = {
  secure_url: string;
};
async function uploadImage(
  image: File,
  signature: string,
  timestamp: number
): Promise<UploadImageResponse> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append('file', image);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? '');

  const response = await fetch(url, {
    method: 'post',
    body: formData,
  });
  return response.json();
}

type Props = {
  address: string;
  latitude: string;
  longitude: string;
  bedrooms: string;
  image: FileList;
};
export default function HouseForm({}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Props>({ defaultValues: {} });
  const address = watch('address');
  const [createSignnature] =
    useMutation<CreateSignatureMutation>(SIGNATURE_MUTATION);

  useEffect(() => {
    register('address', { required: 'Please enter your address' });
    register('latitude', { required: true, min: -90, max: 90 });
    register('latitude', { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: Props) => {
    const { data: signatureData } = await createSignnature();
    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature;
      const imageData = await uploadImage(data.image[0], signature, timestamp);
      // const imageUrl = imageData?.secure_url;
    }
  };

  const onSubmit = (data: Props) => {
    setSubmitting(true);
    handleCreate(data);
  };
  return (
    <>
      <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl"> Add a new House</h1>
        <div className="mt-4">
          <label htmlFor="search" className="block">
            Search for your address
          </label>
          <SearchBox
            onSelectAddress={(address, latitude, longitude) => {
              setValue('address', address);
              setValue('latitude', latitude);
              setValue('longitude', longitude);
            }}
            defaultValue=""
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
        {address && (
          <>
            <div className="mt-4">
              <label
                htmlFor="image"
                className="p-4 border-dashed border-4 border-gray-600 block cursor-pointer"
              >
                Click to add image (16:9)
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                {...register('image', {
                  validate: (fileList: FileList) => {
                    if (fileList.length === 1) return true;
                    return 'Please upload an image';
                  },
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    if (e?.target?.files?.[0]) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  },
                })}
              />
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="Picture of the author"
                  width="576px"
                  height={`${(9 / 16) * 576}px`}
                />
              )}
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="bedrooms" className="block">
                Beds
              </label>
              <input
                id="bedrooms"
                type="number"
                className="p-2"
                {...register('bedrooms', {
                  required: 'Please enter the number of bedrooms',
                  max: { value: 10, message: 'House is too large' },
                  min: { value: 1, message: 'Must have at least one bedroom' },
                })}
              />
              {errors.bedrooms && (
                <p className="text-red-500">{errors.bedrooms.message}</p>
              )}
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
                type="submit"
                disabled={submitting}
              >
                Save
              </button>{' '}
              <Link href="/">
                <a>Cancel</a>
              </Link>
            </div>
          </>
        )}
      </form>
    </>
  );
}
