import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar } from "../../store/ui/uiSlice";
import { Avatar, Box, Divider, Drawer, List, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import { SideBarItem } from "./SideBarItem";


export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName, photoURL } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);
    const { isMobileOpen } = useSelector(state => state.ui);

    // useMediaQuery
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up('sm'));

    const dispatch = useDispatch();

    const drawer = (
        <>
            <Toolbar
                sx={{ gap: 2 }}
            >
                <Avatar alt={displayName} src={photoURL} imgProps={{ referrerPolicy: 'no-referrer' }} />
                <Typography variant='h6' noWrap component="div">
                    {displayName}
                </Typography>

            </Toolbar>

            <Divider />

            <List>
                {
                    notes.map((note, index) => (
                        <SideBarItem key={note.id} note={note} index={index} />
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
            {
                isMobile
                    ?
                    <Drawer
                        variant="permanent" // Puede ser temporal, dependiendo de las necesidades
                        open
                        sx={{
                            // display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                        }}
                    >
                        {drawer}
                    </Drawer>
                    :
                    <Drawer
                        variant="temporary"
                        open={isMobileOpen}
                        onClose={() => dispatch(toggleSidebar())}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            // display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>


            }
        </Box>
    )
}
