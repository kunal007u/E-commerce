import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import './style.css'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer} style={{ background: "#6a3f3fcc", color: "white " }} >
      <Container maxWidth="lg"  >
        <Grid container spacing={4} justifyContent="space-evenly" >
          <Grid item xs={12} md={3} >
            <Typography variant="h6" gutterBottom  >
              About Us
            </Typography>
            <Typography variant="body2" style={{lineHeight:"25px"}} >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" style={{lineHeight:"25px"}}>
              Address: 123 Main St, New York, NY 10001<br />
              Phone: +1 (555) 123-4567<br />
              Email: info@ecommerce.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Typography variant="body2" style={{lineHeight:"25px"}} >
              Shipping Policy <br />
              Return Policy<br />
              FAQs
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Connect with Us
            </Typography>
            <ul className="wrapper">
              <li className="icon facebook">
                <span className="tooltip">Facebook</span>
                <span><FacebookIcon/></span>
              </li>
              <li className="icon twitter">
                <span className="tooltip">Twitter</span>
                <span><TwitterIcon/></span>
              </li>
              <li className="icon instagram">
                <span className="tooltip">Instagram</span>
                <span><InstagramIcon/></span>
              </li>
            </ul>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" className="CopyRightTypo"  >
          &copy; {new Date().getFullYear()} Ecommerce. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
