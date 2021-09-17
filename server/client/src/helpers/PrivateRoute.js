/* eslint-disable */
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute ({component: Component, auth, profile, ...rest}) {
    
  return (
      <Route
        {...rest}
        render={(props) => 
          auth !== false ? 
          <Component {...props} />
          :
          <Redirect to={{pathname: '/signin', state: {from: props.location}}} />        
        }
      />
    )
}

