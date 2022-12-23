import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"


export const SideBar = ({ drawerWidth = 240 }) => {
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            {/* El Drawer es el sidebar, así llamado en Material */}
            <Drawer
                variant="permanent" // Puede ser tempoeral, dependiendo de las necesidades
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component="div">
                        Your Name
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

            </Drawer>
        </Box>
    )
}
