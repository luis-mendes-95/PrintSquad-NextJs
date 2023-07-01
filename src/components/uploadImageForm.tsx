import { useServiceOrder } from "@/contexts/serviceOrderContext";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa";

const UploadImageForm = () => {
  const {
    setPage,
    serviceOrderInfo,
    setServiceOrderInfo,
    setCoverImage,
    uploadServiceOrderFiles,
    selectedOrderId,
    mockupImage,
    files,
  } = useServiceOrder();

  const onDrop = useCallback((files: any) => {
    setCoverImage(files[0]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
  });

  const { getRootProps, getInputProps } = dropzone;

  return (
    <div>
      <p>Upload de Mockup</p>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div {...getRootProps()}>
          <div>
            <label htmlFor="dropzone-file">
              <div>
                <FaImage />
                <p>Arrasta e solte o mockup aqui</p>
                <p>- OU -</p>
                <button onClick={(e) => e.preventDefault()}>Busque aqui</button>
                <p>Formatos suportados: jpg, png e pdf</p>
              </div>
            </label>
            <input className="hidden" {...getInputProps()} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <button
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            <span>Voltar</span>
          </button>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            uploadServiceOrderFiles(selectedOrderId, files!, mockupImage!);
          }}
        >
          Finalizar Cadastro
        </button>
      </div>
    </div>
  );
};

export default UploadImageForm;
