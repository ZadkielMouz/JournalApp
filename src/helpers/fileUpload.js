
// Solo se subirá un archivo a la vez, pero se disparará de manera simultanea

export const fileUpload = async( file ) => {
    if(!file) throw new Error('No hay ningún archivo a subir.');

    // Url de Cloudinary para la carga de iamgenes
    const cloudUrl = 'https://api.cloudinary.com/v1_1/zadkielmouz/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        // Acá se obtiene la respuesta de si se cargó con éxito o no las imagenes
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('No se pudo subir la imagen');

        // Acá se obtiene la respuesta de la petición a Cloudinary de donde se obtendrá además
        // el secure_url que es el que se subirá a Firestore.
        const cloudResp = await resp.json();

        return cloudResp.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }
}