/* eslint-disable */
 
import { Route, Redirect } from 'react-router-dom';

export default function CreateProfileRoute ({component: Component, auth, profile, redirect, ...rest}) {

    return (
      <Route
        {...rest}
        render={(props) => 
          profile === false?
          <Component {...props} />
          : auth === false ? 
          <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
          : <Redirect to={{pathname: '/home', state: {from: props.location}}} />        
        }
      />
    )
  }
