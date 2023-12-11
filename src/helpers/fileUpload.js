import { getEnvironments } from './getEnvironments';

const { VITE_CLOUD_URL } = getEnvironments();

export const fileUpload = async (file) => {
  // if ( !file ) throw new Error('No tenemos ningúna archivo a subir');
  if (!file) return null;

  const cloudUrl = VITE_CLOUD_URL;

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pudo subir imagen");
    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    // console.log(error);
    // throw new Error( error.message );
    return null;
  }
};
