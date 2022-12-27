import { TurnedInNot } from "@mui/icons-material"
import { Avatar, Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar } from "../../store/ui/uiSlice";


export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName, photoURL } = useSelector(state => state.auth);
    const { isMobileOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const drawer = (
        <>
            <Toolbar
                sx={{ gap: 1 }}
            >
                <Avatar alt={displayName} src={photoURL} imgProps={{ referrerPolicy: 'no-referrer' }} />
                <Typography variant='h6' noWrap component="div">
                    {displayName}
                </Typography>

            </Toolbar>

            <Divider />

            <List>
                {
                    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'].map(text => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={text} />
                                    <ListItemText secondary={"Lorem ipsum dolor sit amet consectetur adipisicing elit."} />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </>
    )

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            {/* El Drawer es el sidebar, así llamado en Material */}
            <Drawer
                // container={container}
                variant="temporary"
                open={isMobileOpen}
                onClose={ () => dispatch( toggleSidebar() ) }
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent" // Puede ser tempoeral, dependiendo de las necesidades
                open
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                { drawer }
            </Drawer>
        </Box>
    )
}
