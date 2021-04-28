import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute ({component: Component, auth, profile, redirect, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => 
          auth !== false && profile !== undefined
          ? <Component {...props} />
          : auth === false?
          <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
          : profile === undefined? 
          <Redirect to={{pathname: '/profile/create', state: {from: props.location}}} />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />
        
        }
      />
    )
  }

