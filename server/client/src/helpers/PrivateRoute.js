import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute ({component: Component, auth, profile, ...rest}) {
    
  var profileExists = false
  profile === undefined || profile === null || profile === '' ? profileExists = false: profileExists = true
  console.log('profileExists', profileExists)
  return (
      <Route
        {...rest}
        render={(props) => 
          auth !== false && profileExists? 
          <Component {...props} />
          : auth === false ?
          <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
          : !profileExists ? 
          <Redirect to={{pathname: '/profile/create', state: {from: props.location}}} />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />
        
        }
      />
    )
}

