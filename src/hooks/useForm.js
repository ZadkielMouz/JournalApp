import { useEffect, useMemo, useState } from "react";


export const useForm = ( initialForm = {}, formValidations = {} ) => {

    const [formState, setFormState] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    // Cada vez que el formulario cambie, se va a hacer las validaciones
    useEffect(() => {
      createValidators();    
    }, [ formState ]);

    // Si el formulario inicial cambia, debe actualizar las referencias
    useEffect(() => {
        setFormState( initialForm );
    }, [initialForm]);
    

    // Se usa para evitar que se reprocese el valor cuando no sea necesario
    const isFormValid = useMemo( () => {
        
        for (const formValue of Object.keys(formValidation)) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;

    }, [ formValidation ]);
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState(
            {
                ...formState,
                [name]: value
            }
        )
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {

        const formCheckedValues = {};



        // Object.keys() devuelve un array con los nombres de las propiedades que están
        // en el objeto que se pasa como argumento a la función Object.keys()
        for (const formField of Object.keys( formValidations )) {
            // Se accede a la propiedad del objeto mediante su nombre el cual es obentido
            // de formField y se desestructura la función de validación y el mensaje de error

            const [ fn, errorMessage ] = formValidations[formField];

            // Se ejecuta la función de evaluación (obtenida de fn). Si no hay error, se guarda un null
            // en formCheckedValues. Si hay un error, se guarda el mensaje de error (obtenido de errorMessage)
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid

    }
}