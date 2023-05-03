import React, { useState } from "react";
import {
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
const pages = ["Home", "About", "Product", "Contact"];


const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <React.Fragment>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                sx={{
                    width: "30%",
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: "300px",
                        boxSizing: "border-box",
                    },
                }}
            >
                <List>
                    {pages.map((page, index) => (
                        <ListItemButton
                            key={index}
                            to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                            component={Link}
                        >
                            <ListItemIcon>
                                <ListItemText>{page}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <IconButton
                sx={{ color: "white", marginLeft: "auto" }}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon color="white" />
            </IconButton>
        </React.Fragment>
    );
};

export default DrawerComp;