import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute ({component: Component, auth, profile, ...rest}) {
    
  var profileExists = profile
  console.log('profileExists', profileExists)
  return (
      <Route
        {...rest}
        render={(props) => 
          auth !== false && profileExists !== false? 
          <Component {...props} />
          : auth === false ?
          <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
          : profileExists === false ? 
          <Redirect to={{pathname: '/profile/create', state: {from: props.location}}} />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />
        
        }
      />
    )
}

