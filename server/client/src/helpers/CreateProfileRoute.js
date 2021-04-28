import { Route, Redirect } from 'react-router-dom';

export default function CreateProfileRoute ({component: Component, auth, profile, redirect, ...rest}) {
  var profileExists = false
  profile === undefined || profile === null || profile === '' ? profileExists = false: profileExists = true
    return (
      <Route
        {...rest}
        render={(props) => 
          auth !== false && !profileExists
          ? <Component {...props} />
          : auth === false ? 
          <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
          : <Redirect to={{pathname: '/home', state: {from: props.location}}} />        
        }
      />
    )
  }
