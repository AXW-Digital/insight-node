import { Route, Redirect } from 'react-router-dom';

export default function CreateProfileRoute ({component: Component, auth, profile, redirect, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => 
          auth !== false
          ? <Component {...props} />
          : 
          <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
        
        }
      />
    )
  }
