import { useEffect, useMemo } from "react"
import { DeleteOutline, SaveOutlined, StarOutline, UploadOutlined } from "@mui/icons-material"
import { Button, CircularProgress, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks"
import { ImageGallery } from "../components"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.all';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
});

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(active)

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString().concat(' ', newDate.toLocaleTimeString("en-US"));
    });

    // Este efecto se dispara cuando se esté modificando una nota, ya que se estaría modificando el formulario.
    // De esta manera, cuando se haga un cambio en la nota, se reflejará el cambio también en la nota activa.
    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Toast.fire({
                icon: 'success',
                title: 'Changes saved successfully.'
            });
        }
    }, [messageSaved]);


    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        // console.log('subiendo archivos');
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeletingNote());
                Toast.fire({
                    icon: 'success',
                    title: 'Your note has been deleted.'
                });
            }
        })
    }
    return (

        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>
            <Grid item>
                {
                    isSaving && <CircularProgress color="warning" />
                }

                <Button
                    color='primary'
                    disabled={isSaving}
                    component='label'
                    aria-label="Upload Images"
                >
                    <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={onFileInputChange}
                    />
                    <UploadOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Upload Image
                </Button>

                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Type a title"
                    label="Title"
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="What happened today's day?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    disabled={isSaving}
                    variant="outlined"
                    color='error'
                    sx={{ mt: 2 }}
                    onClick={onDelete}
                >
                    <DeleteOutline />
                    Delete Note
                </Button>
            </Grid>

            {/* Image Gallery */}
            <ImageGallery images={active.imageUrls} />
        </Grid>


    )
}
