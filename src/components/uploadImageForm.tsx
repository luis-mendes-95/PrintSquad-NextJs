import { useServiceOrder } from "@/contexts/serviceOrderContext";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa";

const UploadImageForm = () => {
  const { setPage, serviceOrderInfo, setServiceOrderInfo, setCoverImage, uploadServiceOrderFiles, selectedOrderId, mockupImage, files } = useServiceOrder();

  const onDrop = useCallback((files: File[]) => {
    setCoverImage(files[0]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"]
    }
  });

  const { getRootProps, getInputProps } = dropzone;

  return (
    <div className="container w-3/4 min-w-[1393px] bg-gray-800 flex justify-center">
      <div>
        <p className="text-4xl my-6 font-semibold text-center">Upload de Mockup</p>
        <div className="flex flex-row justify-center mb-6">
          <div className=" bg-gray-400 w-5 h-5 m-1 rounded-full"></div>
          <div className=" bg-blue-400 w-5 h-5 m-1 rounded-full"></div>
        </div>
        <div className="flex flex-row w-4/5">
          <div
            {...getRootProps()}
            className=" flex flex-col min-w-[648px] min-h-[410px] bg-blue-900 rounded-lg border-dashed border-2 border-gray-400">
            <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
              <div className="flex flex-col items-center pt-5 pb-6 w-full h-full gap-2">
                <FaImage className="fill-gray-200 w-24 h-20 m-4" />
                <p className="text-3xl">Arrasta e solte o mockup aqui</p>
                <p className="text-3xl mt-4">- OU -</p>
                <button className="user-form-button w-48 my-8" onClick={(e) => e.preventDefault()}>
                  Busque aqui
                </button>
                <p className="text-lg italic font-gray-200">Formatos suportados: jpg, png e pdf</p>
              </div>
            </label>
            <input className="hidden" {...getInputProps()} />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex flex-row">
            <div className=" flex justify-center items-center mr-6">
              <button
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}>
                <span className="text-2xl">Voltar</span>
              </button>
            </div>

            <button
              className="user-form-button w-72 my-8"
              onClick={(e) => {
                e.preventDefault();
                uploadServiceOrderFiles(selectedOrderId, files!, mockupImage!);
              }}>
              Finalizar Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImageForm;