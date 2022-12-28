import { useDispatch, useSelector } from 'react-redux'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { setActiveNote } from '../../store/journal';
import { toggleSidebar } from '../../store/ui';


export const SideBarItem = ({ note, index }) => {

    const { active, notes } = useSelector(state => state.journal);
    const dispatch = useDispatch();

    const onActiveNote = () => {

        dispatch( toggleSidebar() );

        if(!active) {
            dispatch(setActiveNote(note));
            return; 
        }

        if (active.id !== notes[index].id)
            dispatch(setActiveNote(note));

        
    };

    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={onActiveNote}
            >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText
                        primary={note.title}
                        primaryTypographyProps={{
                            variant: 'subtitle1',
                            style: {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }
                        }}
                        sx={{ maxWidth: 180 }}
                    />
                    <ListItemText
                        secondary={note.body}
                        secondaryTypographyProps={{
                            variant: 'subtitle1',
                            style: {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }
                        }}
                        sx={{ maxWidth: 180 }}
                    />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
