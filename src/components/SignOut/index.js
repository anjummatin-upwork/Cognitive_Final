import React from 'react';
 
import { withFirebase } from '../Firebase';
import Button  from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const SignOutButton = ({ firebase }) => (
  <Button variant="danger" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);
 
export default withFirebase(SignOutButton);